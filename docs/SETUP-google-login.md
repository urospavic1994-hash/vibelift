# Switch on Google sign-in — your 15 minutes

Written 17 Sep 2026. The code is already live in VibeLift with the switch OFF, so nothing
changes for anyone until Part C passes. Menu names below come from Supabase's official
Google guide (checked 17 Sep 2026); Google sometimes renames a label slightly. If a screen
looks different, stop and tell Claude what you see instead of guessing.

**What this does, in plain words:** you register VibeLift with Google so Google agrees to
confirm "this person owns this Gmail address", and you give Supabase (the login system) the
two keys Google hands you.

Do this on the PC, in Chrome, signed in as uros.pavic1994@gmail.com.

## Part A — Google (about 10 minutes)

1. Open https://console.cloud.google.com/auth/overview
2. If asked, accept Google Cloud's terms. At the top, click the project picker → **New project** → name it `VibeLift` → **Create**. Wait, then select that project.
3. Click **Get started** (Google Auth Platform). Fill in:
   - App name: `VibeLift`
   - User support email: your Gmail
   - Audience: **External**
   - Contact email: your Gmail
   - Tick the agreement → **Create**.
4. Left menu → **Data Access** → **Add or remove scopes** → tick these three and nothing else, then **Update** → **Save**:
   - `openid`
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
5. Left menu → **Clients** → **Create client** (or "Create OAuth client ID"):
   - Application type: **Web application**
   - Name: `VibeLift web`
   - **Authorized JavaScript origins** → Add URI: `https://vibelift.vercel.app`
   - **Authorized redirect URIs** → Add URI: `https://gidxxufmlqdapmekvcpm.supabase.co/auth/v1/callback`
   - **Create**.
6. A box shows **Client ID** and **Client secret**. Leave this box open. The secret is a password: do not paste it into chat, email or any file.
7. Left menu → **Audience** → **Publish app** → **Confirm**. Status must read **In production**.
   Why: in "Testing" Google allows only 100 people and logs everyone out every 7 days.
   Because we ask only for email and name, Google needs no review.

## Part B — Supabase (about 3 minutes)

1. Open https://supabase.com/dashboard/project/gidxxufmlqdapmekvcpm/auth/providers
2. Click **Google** in the list.
3. Turn **Enable Sign in with Google** on.
4. Paste the **Client ID** from the Google box into "Client IDs".
5. Paste the **Client secret** into "Client Secret (for OAuth)".
6. **Save**. Now you can close the Google box.
7. Check: left menu **Authentication → URL Configuration**. "Site URL" and the redirect list should already contain `https://vibelift.vercel.app` (they do, from the email login). Change nothing.

## Part C — Test on your iPhone (the part only you can do)

The button is hidden from everyone. To see it on ONE device: on the login screen, tap the
VibeLift wordmark 5 times. It appears within a few seconds (only once Part B is saved).

Run these in order and tell Claude the result of each line, even just "1 ok, 2 ok, 3 failed: …".

| # | Where | Do this | Should happen |
|---|---|---|---|
| 1 | PC, Chrome, a private window | Open vibelift.vercel.app → Get Started → tap wordmark 5× → Continue with Google → pick your Gmail | "Signing you in…" then your Home with all your workouts. No setup wizard. |
| 2 | iPhone, Safari (not the icon) | Same steps | Same result |
| 3 | **iPhone, home-screen icon** — first sign out in Settings | Wordmark 5× → Continue with Google | **The big question.** Good: you end up signed in INSIDE the app. Bad: Safari opens and the app still shows the login screen. Either answer is useful. |
| 4 | Same as 3, if it failed | Use the email code instead | Signs in as always |
| 5 | Anywhere signed in with Google | Settings → Account | Same account, same workout count as before (proves no duplicate account) |
| 6 | Any | Start Google, then press Cancel on Google's page | Back on the login screen with a red note "Google sign-in didn't finish…". Email code still works. |

If 1, 2, 5, 6 pass, Claude flips the switch for everyone. If 3 fails, the button stays
hidden inside the installed iPhone app only, and everything else goes live.

## Undo

Supabase → Authentication → Providers → Google → switch off → Save. The button disappears
by itself on every device; email code is untouched.

## Later, on domain day

When the real domain replaces vercel.app, four settings move together: Google "Authorized
JavaScript origins", Supabase "Site URL", Supabase redirect list, and (unchanged) the Google
redirect URI stays the supabase.co one. Claude will walk you through it.
