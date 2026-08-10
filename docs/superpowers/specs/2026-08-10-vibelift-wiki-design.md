# VibeLift Wiki batch — design spec (2026-08-10)

Approved by Uroš via mockup: https://claude.ai/code/artifact/53932c5d-a72b-4997-9ec4-49ae425de53b

Motivation (friend's feedback): linking a paid app out to musclewiki.com is confusing and a
liability. Replace with our own in-app guide. Also: rest timer needs −30s, and the lb toggle
lies (50 kg shows as "50 lb" — no conversion).

## 1. VibeLift wiki (replaces MuscleWiki links)

- Delete the `WIKI` URL map + `window.open` calls (index.html:3997-3999, 4435-4437).
- "i" button opens an **in-app bottom sheet**: exercise name, animated figure, target-muscle
  chips, 3–4 original how-to steps (written by us — never copied from MuscleWiki), "Got it".
- **Animation engine = existing `builderFigureSVG`** (index.html:3831). Extend it to return
  two arm keyframes (start/end of the movement) and animate hand+elbow+equipment between them
  (SMIL or JS interval, ~2 s loop, respects prefers-reduced-motion).
- New data map `WIKI_DATA[id] = { eq, pos, move, target: [...], steps: [...] }` for all 102
  built-in exercises. eq/pos/move use the builder vocabulary (Barbell/Standing/Press …).
- Custom exercises: sheet works too — figure from stored `builder` params, generic step text
  templated from position + movement, target = muscle group.
- Placement per Uroš: sheet only. Lists and log screen keep static icons.

## 2. Rest timer −30s

- New −30s button in the floating rest pill next to +30s (index.html:4504). Pill stays
  compact — current size, no redesign (Uroš explicitly).
- left−30 ≤ 0 → end timer immediately: `stopRestAlarm()` + dismiss, no beep.
- Otherwise: left −= 30, endAt −= 30000, server push alarm rescheduled via `startRestAlarm(left)`.

## 3. Real kg ↔ lb conversion

- Canonical storage: **kg, always** (existing data is kg-entered — no migration).
- Display converts when profile unit = lb: ×2.20462, shown to nearest 0.5 lb.
- Input in lb mode converts back to kg on save (stored rounded to 2 decimals).
- Touch points: LogScreen weight input, "last time" line, PB line, logged-set rows, history
  pills, summary/celebration volume, barbell total. Volume label: kg → "t" at ≥1000 kg;
  lb → short tons at ≥2000 lb.
- Plate calculator keeps separate lb plate data; plate math runs in display units.

## 4. Custom exercise icons

- Custom exercises currently show no icon. Render static `builderFigureSVG` from stored
  `builder` params as the icon everywhere an `ExIcon` would show (list rows, log hero).
- Session-added exercises without builder params keep fallback; revisit "no icon yet" copy.

## QA gate (after all built)

Headless browse at 390×844 (iPhone 13): check spacing, element positioning, button
visibility and thumb reach on group list + wiki sheet, log screen + rest pill, settings,
history, builder. Fix findings, then commit, push, verify prod.
