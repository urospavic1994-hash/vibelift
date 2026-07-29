/* Rest-alarm push server.
   iOS kills a PWA's service worker when the phone locks, so the app cannot be
   trusted to fire its own "rest over" notification. Instead the page asks this
   function to hold the alarm: `schedule` sleeps until rest ends (Fluid Compute,
   maxDuration 300s in vercel.json) and then sends a real Web Push, which iOS
   delivers on the lock screen with sound.

   Cancel/extend safety: every timer carries an alarm_id. schedule stamps its id
   on the device row before sleeping and re-reads the row after waking — if the
   id changed (a +30s issued a new one) or was cleared (cancel), it stays silent.

   Env (Vercel project settings): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT. */
const webpush = require('web-push');

const SUPA_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function db(path, opts = {}) {
  const res = await fetch(`${SUPA_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      ...(opts.headers || {})
    }
  });
  if (!res.ok) throw new Error(`db ${res.status}: ${await res.text()}`);
  return res;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const rowFilter = id => `push_subscriptions?device_id=eq.${encodeURIComponent(id)}`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!SUPA_URL || !SERVICE_KEY || !process.env.VAPID_PRIVATE_KEY) {
    return res.status(503).json({ error: 'push not configured' });
  }
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  const { action, device_id } = req.body || {};
  if (!action || typeof device_id !== 'string' || !device_id || device_id.length > 100) {
    return res.status(400).json({ error: 'bad request' });
  }

  try {
    if (action === 'subscribe') {
      const { subscription } = req.body;
      if (!subscription || !subscription.endpoint) return res.status(400).json({ error: 'no subscription' });
      await db('push_subscriptions', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify({ device_id, subscription, updated_at: new Date().toISOString() })
      });
      return res.status(200).json({ ok: true });
    }

    if (action === 'cancel') {
      await db(rowFilter(device_id), { method: 'PATCH', body: JSON.stringify({ alarm_id: null }) });
      return res.status(200).json({ ok: true });
    }

    if (action === 'schedule') {
      const { alarm_id, fire_at, body } = req.body;
      if (typeof alarm_id !== 'string' || !alarm_id || alarm_id.length > 60 || !Number.isFinite(fire_at)) {
        return res.status(400).json({ error: 'bad request' });
      }

      // Claim the row. A device that never subscribed matches nothing — the
      // re-read below then finds no current alarm and we exit quietly.
      await db(rowFilter(device_id), {
        method: 'PATCH',
        body: JSON.stringify({ alarm_id, updated_at: new Date().toISOString() })
      });

      // Cap under maxDuration: stacking +30s past ~4.5 min fires early rather
      // than not at all.
      const delay = Math.min(Math.max(0, fire_at - Date.now()), 280000);
      if (delay > 0) await sleep(delay);

      const rows = await (await db(`${rowFilter(device_id)}&select=alarm_id,subscription`)).json();
      const row = rows[0];
      if (!row || row.alarm_id !== alarm_id) return res.status(200).json({ ok: true, stale: true });

      try {
        await webpush.sendNotification(
          row.subscription,
          JSON.stringify({ title: 'Rest over — GO', body: String(body || 'Next set').slice(0, 120) }),
          { TTL: 90, urgency: 'high' }
        );
      } catch (e) {
        // Endpoint gone (app deleted / permission revoked) — drop the row so
        // we stop paying 3+ minutes of sleep for a dead subscription.
        if (e.statusCode === 404 || e.statusCode === 410) {
          await db(rowFilter(device_id), { method: 'DELETE' }).catch(() => {});
        }
        return res.status(200).json({ ok: false, push: e.statusCode || String(e) });
      }

      await db(rowFilter(device_id), { method: 'PATCH', body: JSON.stringify({ alarm_id: null }) });
      return res.status(200).json({ ok: true, fired: true });
    }

    return res.status(400).json({ error: 'unknown action' });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
};
