# Gym feedback batch 2 — design spec (2026-07-29)

Approved by Uroš 2026-07-29. Five features from real gym use.

## 1. Lock-screen rest alarm via server push

**Problem.** Rest-over notification is scheduled with `setTimeout` inside the
service worker (sw.js). iOS kills the service worker shortly after the phone
locks, so the notification fires only when the worker happens to survive
(app backgrounded but phone unlocked). On a locked phone it usually never
fires. This is an iOS platform limit, not a bug.

**Fix.** Real Web Push, sent from a server at rest-end time. iOS ≥16.4
delivers push to installed home-screen PWAs even when the phone is locked,
with system sound and vibration, without touching the music session.

**Architecture.**
- Supabase table `push_subscriptions`:
  `device_id text primary key, subscription jsonb, alarm_id text,
   updated_at timestamptz`. No auth link — login is optional in this app, so
  rows are keyed by a random per-device id stored in localStorage.
  RLS on; all access goes through the edge function (service role), the anon
  key gets no direct table access.
- Supabase Edge Function `rest-push` (Deno), actions:
  - `subscribe` — upsert `{device_id, subscription}`.
  - `schedule` — `{device_id, alarm_id, fire_at, body}`. Writes `alarm_id`
    to the row, sleeps until `fire_at` (rest is 60–210 s, far below the
    400 s edge wall-clock cap), re-reads the row, and sends push via
    VAPID-signed Web Push only if `alarm_id` is still current.
  - `cancel` — clears `alarm_id`.
- Stale-alarm guard: finishing rest early or tapping +30 s issues a new
  `alarm_id` (extend) or a `cancel`; the sleeping invocation sees the changed
  id and stays silent. No duplicate or ghost alarms.
- Client: on first rest-timer use (user gesture), request notification
  permission, `pushManager.subscribe` with the VAPID public key, send
  `subscribe`. Every rest start → `schedule`; +30 s → `schedule` with a new
  id; early finish / app closes rest → `cancel`.
- sw.js: add `push` event handler → `showNotification('Rest over — GO', …)`.
  Existing local best-effort notification stays as offline fallback (the SW
  skips it if a push already showed — same `tag`).
- VAPID keypair: generated once; public key in the client, private key as an
  edge-function secret.
- Fallback: permission denied or no network → current behavior (in-app beep
  + best-effort SW notification), no errors surfaced.

## 2. Louder in-app beep

Current: three 880 Hz pulses at gain 0.3 on an ambient audio session.
New: six pulses alternating 880/1320 Hz, gain 0.9, slightly longer envelope,
plus a stronger vibration pattern. Ambient session unchanged — music mixes,
never pauses. Applies when the app is on screen.

## 3. Resume active workout on reopen

On boot, if a started-but-unfinished workout exists in storage and its
`startedAt` is under 12 hours old, land directly on the live workout screen
(rest state included, since the timer is wall-clock `endAt` based).
Older than 12 h → treated as abandoned, normal home screen. No new UI.

## 4. Plan ahead

- Home screen button **Plan next workout** → the existing muscle-group →
  exercise picker flow, but the result is saved as `plannedWorkout` (same
  shape as a workout draft: exercises, order) instead of starting live.
- Home shows one plan card: title (muscle groups), exercise count, **Start**,
  edit and delete affordances. Starting loads it as the live workout; Smart
  Swap and all mid-workout behavior unchanged.
- Exactly one pending plan (new plan overwrites after confirm). Stored in
  profile/local storage and cloud-synced like other profile data.
- Named reusable templates: out of scope (future).

## 5. New-signup email

`AFTER INSERT` trigger on `public.profiles` → `pg_net` HTTP call to the Brevo
transactional API → email to uros.pavic1994@gmail.com:
subject "New VibeLift signup", body = new user's email + timestamp.
Brevo API key stored in Supabase Vault, read by the trigger function.
Delivered as a SQL block appended to docs/supabase-schema.sql with exact
paste-into-SQL-Editor steps for Uroš. Trigger failure must never block the
signup itself (wrapped, exception-safe).

## Build order

2 + 3 (quick wins) → 1 (push) → 4 (plan ahead) → 5 (signup email).
Each lands as its own commit; deploy is auto on push to main.

## Testing

- Headless browser QA per feature (beep call path, boot-resume routing,
  plan create/start flow).
- Push: end-to-end requires Uroš's phone — checklist given after deploy
  (allow notifications → start rest → lock phone → alarm on lock screen).
- Signup email: test insert into profiles from SQL editor → email arrives.
