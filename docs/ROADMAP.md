# VibeLift Roadmap — Phases 2 & 3 (Orchestrator Handoff)

Written 2026-07-17 for the next model session (Opus) to orchestrate. Read this whole file before acting. The human is Uroš Pavić — zero coding background, visual-first, cannot debug. You are the engineer AND the guide.

---

## 0. How to work with Uroš (non-negotiable)

1. **Mockup before code.** He decides from visuals, not descriptions. Publish an interactive Artifact, get approval, then build. This flow shipped every feature so far.
2. **Verify before presenting.** Test in a browser (gstack /browse, headless mode — the headed daemon crashes constantly on his PC; use headless + `file://` + single `chain` calls, and re-`goto` the URL every call because the daemon restarts between Bash invocations).
3. **Backup before risky edits.** Copy `index.html` → `index.backup.html` first. A Babel syntax error blanks the entire app.
4. **Numbered copy-paste steps** for anything he must do himself (file operations, dashboards, signups).
5. **One plain-language learning note** per task.
6. **No emoji in UI** — he calls it "AI build vibe". Typographic + SVG in brand lime (#c8f235) on dark olive (#121508).
7. **Delegate legwork to cheaper-model subagents** (Sonnet), keep decisions and main-file edits in the main thread. He asked for this explicitly.
8. Commit per feature with clear messages. Don't push without asking.
9. Memory dir has more context: `vibelift-core-vision`, `uros-visual-style-feedback`, `uros-delegation-preference`.

## 1. Product identity (locked)

VibeLift's reason to exist: **adapt to the real gym on the spot** — bench taken, machine broken, plan dies; VibeLift keeps up. Every roadmap feature must serve or at least not dilute this. Smart Swap is the identity turned into a feature; the Exercise Builder (shipped) already collects the equipment/position/movement data Smart Swap needs.

## 2. Current state (shipped, commit 6856a75)

- Single-file app: `index.html` (~3,700 lines), React 18 via CDN + in-browser Babel, no build step. All data in localStorage (`fittrack_*` keys: history, current workout, profile, custom exercises, theme).
- Features: workout logging (plate picker / free weight / bodyweight), warm-up step, partial exercise resume, set-completion spark+haptic effects, workout-done celebration, streaks, calendar, summary with PRs, 97 built-in exercises + verified MuscleWiki links (`WIKI` map), custom Exercise Builder wizard with live parametric SVG figure, light/dark themes, splash + onboarding.
- 22 exercises await illustrations — prompts in `scripts/image-prompts-22-new-exercises.md`, Uroš generates via Nano Banana on his own schedule.
- Mockups live at claude.ai artifacts (update proposal + exercise builder). Brand: lime #c8f235, dark olive #121508, cream text #f0f5d8, fonts Passion One / DM Sans.

## 3. Decisions already made by Uroš (do NOT re-ask)

| Decision | Value |
|---|---|
| Hosting | Vercel; start on free `*.vercel.app` subdomain, buy real domain before charging money |
| Pricing | **$9.99/month, single plan, no free tier** |
| Trial | 7 days, **no card required** |
| Launch gate | **Full premium set live before anyone is charged**: login + sync + Mission Control + Smart Swap + rest timer + progress charts |
| Payment rails | UNDECIDED — research task (see 5.1). Constraint: Uroš is in Serbia; Stripe does not onboard Serbian businesses. Merchant-of-record (Paddle / Lemon Squeezy / Polar) is the likely answer |
| Distribution | Web + PWA first; app stores = open question, not blocking |
| Body tracking | Optional add-on, not launch-critical |
| Programs | User imports/builds own; no prescribed plans at launch |

## 4. Phase 2 — Deploy, Accounts, Cloud Sync

Goal: the app lives at a URL, users have accounts, data survives device loss. Order matters; each milestone independently verifiable.

**2A. Deploy static app to Vercel** (smallest possible first step)
- Repo already git. Deploy `index.html` + `assets/` as static site (vercel plugin available in the toolkit).
- Verify on Uroš's phone over the real URL. PWA manifest + service worker for installability/offline — the app is offline-first by nature, keep it that way.
- Exit test: he installs it on his phone home screen, logs a workout offline, nothing lost.

**2B. Backend: recommended Supabase** (auth + Postgres + RLS, generous free tier, plain JS SDK via CDN — no build step needed, fits the single-file architecture). Alternatives (Firebase, custom) only if a real blocker appears — justify any deviation in writing.
- Auth: email magic-link first (no passwords to forget, no reset flows to build). Google sign-in second.
- Schema sketch: `profiles` (user settings), `workouts` (jsonb per workout, keyed by user+date), `custom_exercises` (jsonb). Mirror the existing localStorage shapes — do not redesign the data model, migrate it.
- RLS: user sees only own rows. Non-negotiable.

**2C. Sync layer** (the hard part — design doc + mockup of the account UI before coding)
- localStorage stays the source of truth for instant UX; cloud is the mirror. Push on save, pull on login/app-open. Last-write-wins per workout-date is acceptable at this scale — document it.
- Migration: on first login, upload existing localStorage history. His own data is the first test case.
- Exit test: log workout on phone → appears on PC browser after login. Delete browser data → login → everything back.

**2D. Account UI** — login screen, profile/account section in Settings, sign-out, delete-account (legally required). Mockup first.

Phase 2 has NO paywall. Accounts free while premium set is built (per launch gate).

## 5. Phase 3 — Payment + Premium

**5.1 RESEARCH FIRST (subagent task): merchant of record for a Serbian founder, 2026.**
Compare Paddle, Lemon Squeezy, Polar, Gumroad on: accepts Serbian individual/business, payout method to Serbia, fee %, subscription + trial-without-card support, webhook quality for entitlement sync, tax handling. Deliver comparison table → Uroš picks. Do not integrate anything before he picks.

**5.2 Entitlement model**
- `subscriptions` table updated by MoR webhooks (Vercel serverless function endpoint). App checks entitlement on login + caches; graceful 3-day offline grace so a gym session never gets blocked by a network check.
- States: trialing (7d from signup, no card) → active → past_due → canceled. Trial state lives in your DB, not the MoR (no card at trial start).

**5.3 Premium features (build behind the not-yet-enabled paywall, in this order):**
1. **Rest timer** — smallest, most-requested, pure frontend. Between-set countdown + vibration.
2. **Progress charts** — volume/PB over time from existing history. Read the `dataviz` skill before charting. Uroš loved this in mockups.
3. **Mission Control** — one overview screen: weekly volume trend, streak, strongest lift, weakest group, what's due. "Open app, know your status in 3 seconds." Mockup approval mandatory — this is his flagship.
4. **Smart Swap** — the identity feature. V1 is honest and simple: on any exercise, "swap" button → alternatives for the same muscle group filtered by equipment, using the existing DB fields + builder metadata. No AI needed for v1.
5. **Achievements** — typographic badges (no emoji), ties into celebration screen.

**5.4 Launch** — real domain purchase, paywall on, trial flow live. Full QA pass (/qa) + his phone test before announcing anything.

## 6. Known unknowns — resolve during execution, ask Uroš when they become real

| Unknown | When it bites | How to resolve |
|---|---|---|
| MoR choice + Serbian payout reality | Phase 3 start | 5.1 research, Uroš decides |
| Legal entity for the income (personal vs Kos-komerc) | Before first real charge | Uroš + his accountant — flag it early, it's outside his autonomy zone |
| Privacy policy / GDPR / data deletion | Phase 2D (accounts = personal data) | Generate standard policy, host on site; delete-account must actually delete |
| App name "VibeLift" collisions/trademark | Before domain purchase | Quick search task; rename is cheap now, expensive later |
| Supabase free-tier ceilings | If users grow | Monitor; paid tier ~$25/mo, fine at $9.99 pricing |
| Single-file architecture limits | When index.html becomes unmanageable (~5k+ lines?) | Consider splitting only when it actually hurts; do not preemptively rebuild — no build step is a feature for this user |
| App stores + their billing rules | Only if Uroš revives the topic | Parked by his decision |
| Serbian language version | Post-launch question | Ask when launch nears |
| Auth email deliverability (magic links to spam) | Phase 2B testing | Test with his Gmail; custom SMTP via Brevo (he already uses it) if needed |
| Existing-device data merge conflicts (two devices, both offline) | Phase 2C | Last-write-wins per workout-date documented; revisit only if real complaint |

## 7. Orchestration logic

- **Sequence, don't parallelize phases.** 2A→2B→2C→2D→5.1→…→5.4. Each milestone has an exit test; do not advance without passing it and showing Uroš evidence.
- Within a milestone: subagents (Sonnet) for research, QA flows, bulk verification; main thread for design, main-file edits, decisions.
- **Every user-facing surface gets a mockup gate.** Account screens, paywall screen, Mission Control, Smart Swap — Artifact first, approval, then code.
- New unknowns: add to the table in §6, ask Uroš only when the decision is actually needed (he said "don't assume, ask" — but batch questions, AskUserQuestion, max 4, with a recommended option first).
- Update this file as decisions land (edit the tables, commit). This document is the single source of truth for the grand scheme; treat drift between it and reality as a bug.
- Rough effort feel: 2A days, 2B-2D a few weeks of sessions, 5.x similar. No calendar promises to Uroš — he cares about working software per milestone, not dates.
