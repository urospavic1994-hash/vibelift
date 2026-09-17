# HANDOFF — two-frame motion for every exercise (start position ↔ end position)

Written 17 Sep 2026 for a fresh chat. Read this whole file before doing anything. Then read the project tree
`TREE — VibeLift exercise library expansion.md` (Google Drive, folder Project Trees) and the memory file
`vibelift-exercise-library-expansion`.

## 1. What Uroš wants (his words, tidied)

In the info sheet (the "i" button) each exercise should show the MOVEMENT for people who do not know it:
picture of the start position, picture of the end position, switching every 0.75 s (Uroš asked for 0.5 s + 0.25 s for a premium feel). First, second, first,
second. Hard switch, no fade. Small and light on resources. Not a GIF file (his phone showed the GIF preview as a
still image) and not the old generic stick figure (it was wrong for most exercises).

## 2. What already exists (do not rebuild)

- 300 exercises live, 295 with a verified 320px PNG in `assets/exercises/<Name>.png`.
- The info sheet (`WikiSheet` in index.html) shows that PNG. If the catalog line has `img2`, it stacks the second
  PNG on top and switches it on/off every 0.75 s with CSS (`wikiFlip 1.5s`) (`.wiki-frames .wiki-f2`, keyframes `wikiFlip`,
  `steps(1)`, respects reduced-motion). No `img2` → static picture, exactly as before.
- One working example is live: **Skull Crusher** (`Skull Crusher.png` + `Skull Crusher.b.png`). Open it on the
  phone to see the target behaviour.
- `scripts/attach_frames.js` is the only thing that writes `img2` into the catalog. It attaches when
  `<Name>.b.png` exists and detaches when it does not. Idempotent.

## 3. THE CONNECTOR RULE (standing rule for this project, from Uroš)

Every new part must plug into the app through a small OPTIONAL connection point, so the app behaves exactly as
before when the part is missing, half-finished, or removed. Concretely:

1. New data is an optional field (`img2`), never a required one. Code reads it with a fallback.
2. Only a script writes the field, and only after checking the real file exists (`attach_frames.js`).
3. A broken or missing file must degrade silently (`onError` hides frame 2 → static picture).
4. Ship in slices: any number of exercises can have frame 2; the rest stay static. Never a big-bang switch.
5. Before every push: compile-check the JSX (section 6), bump `CACHE_VERSION` in sw.js, verify live after deploy.
6. Anything that cannot meet 1–5 is redesigned until it can. Write the connector first, the content second.

## 4. How frame 2 is made (proven on Skull Crusher)

Gemini EDITS the existing picture, so the man, equipment, angle and style stay identical. Never generate frame 2
from text alone: it comes out as a different scene and the switch looks like two unrelated images.

Preconditions: Uroš's Chrome with the Gemini tab in its own window, visible, foreground
(`scripts/wake_display.ps1` wakes the monitor and brings it forward). Tools: claude-in-chrome
(`browser_batch`, `javascript_tool`, `computer`, `find`, `navigate`).

Per exercise:
1. PowerShell: `powershell -NoProfile -STA -File scripts/clip_set_image.ps1 "<Name>"` → picture on clipboard.
2. browser: navigate `https://gemini.google.com/app`, wait 2 s, `find` "prompt text input box", `left_click` its ref.
3. PowerShell: `powershell -NoProfile -STA -File scripts/paste_into_gemini.ps1` → thumbnail appears in the prompt box.
   (Chrome must be the OS foreground window or the paste goes nowhere. Run wake_display.ps1 first if unsure.)
4. browser `javascript_tool`: put the EDIT PROMPT into `div.ql-editor`, dispatch input, click the Send button
   (same JS as in `scripts/gemini-icon-recipe.md`, CALL 1, third action).
5. wait 50 s, then `javascript_tool`: take the LAST `<img>` with naturalWidth > 300 (the first one is the upload),
   `scrollIntoView({block:'center'})`, return its screen centre (cx, cy).
6. PowerShell: `powershell -NoProfile -STA -File scripts/copy_gemini_image.ps1 "<Name>.b" cx cy`
   → saves `assets/exercises/<Name>.b.png` (320px) and the full-size original in `New lustrations/_gemini_v2/`.
7. Claude (the strong model, never haiku) LOOKS at both PNGs side by side and accepts or rejects.

EDIT PROMPT template:
> Edit this image. Keep exactly the same man, same clothes, same equipment, same camera angle, same flat vector art
> style and the same pure white background. Change ONLY the pose to show the other end of the movement:
> <END POSITION>. Everything else identical. Square 1:1.

END POSITION = the opposite end from what frame 1 shows. Look at frame 1 first. Examples: frame 1 bar at the
chest → "arms fully extended, bar pressed up"; frame 1 standing tall with dumbbells → "dumbbells curled up to the
shoulders, elbows still at his sides"; frame 1 deep squat → "standing tall, legs straight". For holds and carries
(Plank, Farmers Carry, Plate Pinch Hold, L-Sit, Hollow Body Hold, Suitcase Carry, Overhead Dumbbell Carry,
Weighted Plank, Reverse Plank, Side Plank) there is no second position: SKIP them, they stay static.
Write the end-position lines into `scripts/frame2-prompts.md` (one line per exercise) BEFORE generating a group,
so a cheap operator can run the batch from a file, as was done for the icons.

## 5. Delegation and checking (what worked, what did not)

- A haiku subagent can run the mechanical steps 1–6, 12–16 exercises per agent, IF the exercise names are spelled
  out in its prompt and it is told to ignore old tab titles. It once ran the wrong section and overwrote verified
  files (restored from git). Frame 2 files have a different name (`.b.png`), so frame 1 can no longer be
  overwritten — keep it that way.
- haiku must NOT judge images. Claude reads every `.b.png` next to its frame 1. Reject when: different man or
  colours, equipment changed, camera angle changed, extra objects appeared, or the pose did not actually change.
- After each batch: `md5sum assets/exercises/*.png | sort` duplicate scan (a failed Copy image saves the previous
  picture; the save script has a hash guard, the scan is the second net).
- Gemini web limit is a rolling window: roughly 45–185 images, then "I can create more images as soon as your
  limit resets", back within 2–3 h. Use `sleep N` in a background Bash as a timer, then probe with one image.
- Rejected frames go to `New lustrations/_quarantine/` and a redo list with a reworded END POSITION.

## 6. Shipping a slice

```
node scripts/attach_frames.js --write      # adds img2 only where <Name>.b.png exists
# bump CACHE_VERSION in sw.js (currently vibelift-v14 → v15 …)
node -e "const fs=require('fs');const s=fs.readFileSync('index.html','utf8');const b=require('@babel/standalone');const m=/<script type=\"text\/vibelift-jsx\" id=\"app-src\">([\s\S]*?)<\/script>/.exec(s);b.transform(m[1],{presets:['react']});console.log('JSX OK')"
git add index.html sw.js assets/exercises && git commit -m "Motion frames: <group/slice>" && git push origin main
until curl -s https://vibelift.vercel.app/sw.js | grep -q "vibelift-vNN"; do sleep 10; done   # verify live
```
(`@babel/standalone` is installed locally with `npm i --no-save @babel/standalone@7.23.5` if missing.)

## 7. Order of work

1. Most used first, so Uroš sees value early: Barbell Bench Press, Barbell Back Squat, Deadlift, Barbell Row,
   Pull-Up, Lat Pulldown, Barbell Overhead Press, Dumbbell Lateral Raise, Barbell Bicep Curl, Cable Tricep
   Pushdown, Leg Press, Romanian Deadlift, Hip Thrust, Push-Up, Crunch-type moves. Ship that slice, ask him to look.
2. Then group by group: chest, back, shoulders, legs, arms, core.
3. The 5 old core moves without any PNG (Plank, Crunches, Leg Raise, Russian Twist, Ab Wheel) need frame 1 first
   (recipe v5 in `scripts/gemini-icon-recipe.md`, with the BODYWEIGHT RULE), then frame 2.

## 8. Housekeeping rules that apply here

- Project-tree skill: update the tree in the same turn a decision is made. Mission Control card `p1` in
  `Desktop\Uros admin view\claude-data.js` when next steps change.
- Commit messages end with the attribution lines given in the session. Push = live deploy (Vercel).
- Uroš is a non-coder: plain language, exact steps, verify before saying done.

## 9. First message Uroš can paste into the new chat

> Read docs/HANDOFF-motion-frames.md in the VibeLift folder and continue the two-frame motion work from section 7.
> Follow the connector rule. Use cheap subagents for the clicking, you check every picture.
