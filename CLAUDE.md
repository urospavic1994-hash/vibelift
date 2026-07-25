
## Mission Control sync rule
This project is card `p1` on Uroš's Control Room dashboard
(`C:\Users\UrosPcSoba\Desktop\Uros admin view\control-room.html`).
Whenever next steps / plans for this project change during a session, update this project's
entry (`p1`) in `C:\Users\UrosPcSoba\Desktop\Uros admin view\claude-data.js`:
refresh `nextSteps` (max 5, short plain-language sentences for a non-coder),
set `stepsUpdated` and top-level `dataPulled` to today's date (e.g. "22 Jul 2026").
Uroš can also say "update mission control" to trigger a full sweep of all project folders.
