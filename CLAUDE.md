
## Mission Control sync rule
This project is card `p1` on Uroš's Control Room dashboard
(`C:\Users\UrosPcSoba\Desktop\Uros admin view\control-room.html`).
Whenever next steps / plans for this project change during a session, update this project's
entry (`p1`) in `C:\Users\UrosPcSoba\Desktop\Uros admin view\claude-data.js`:
refresh `nextSteps` (max 5, short plain-language sentences for a non-coder),
set `stepsUpdated` and top-level `dataPulled` to today's date (e.g. "22 Jul 2026").
Uroš can also say "update mission control" to trigger a full sweep of all project folders.

## Connector rule (standing rule from Uroš, 17 Sep 2026)
VibeLift is a big app. Every new part must attach through a small OPTIONAL connection point so the app behaves
exactly as before when that part is missing, half-finished, or removed:
1. New data = optional field with a fallback in code, never a required one.
2. Only a script writes that field, and only after checking the real file/data exists.
3. Missing or broken piece degrades silently to the previous behaviour.
4. Ship in slices, never a big-bang switch.
5. Before every push: compile-check the JSX, bump CACHE_VERSION in sw.js, verify live after deploy.
Build the connector first, the content second. Worked example: `img2` + `scripts/attach_frames.js`
(see docs/HANDOFF-motion-frames.md).
