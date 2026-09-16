# Image prompts v2 — FIX the 24 broken icons (Nano Banana / Gemini)

**Why v2:** the 22 icons made from `image-prompts-22-new-exercises.md` came out with stray barbells and plates
scattered on a grey floor, and several show the wrong movement. The old base style said "all weight plates and
dumbbells are blue", which the model read as "put many blue plates in the picture". The new base style forbids that.

**How to use:** paste the BASE STYLE block + ONE exercise line into Gemini per image. Save as PNG, square (1024x1024),
named EXACTLY as shown (spaces included), into `assets/exercises/` so it overwrites the old file. Nothing in the code
changes. Then run `scripts/resize_illustrations.bat` if the file is bigger than 320 px.

## BASE STYLE v2 (paste first, every time)

Flat vector isometric illustration, pure white background, no floor, no ground shadow, no platform, no mat unless the
exercise line says so. ONE faceless muscular man with short brown hair, red tank top, black shorts, dark grey socks,
grey sneakers. EXACTLY ONE piece of gym equipment in the whole picture, the one named in the exercise line. No extra
barbells, no extra dumbbells, no loose plates, no racks, nothing else on the floor. Equipment frame is white and light
grey with blue accents; the plates or dumbbell heads he is holding are blue with a grey steel bar. Clean minimal style,
soft flat shading, no outlines, no text, 3/4 isometric camera, subject centered with white space around. Consistent
fitness-app icon set.

> If Uroš picks the yellow-tank figure instead: replace "faceless muscular man with short brown hair, red tank top"
> with "athletic person with short brown hair and a simple calm face, yellow tank top". Everything else stays.

## The 24 fixes (one per generation)

### WRONG movement (12)
1. `Side Plank.png` — On a thin grey exercise mat he lies on his SIDE, propped on his left forearm, body a straight rigid diagonal line from head to feet, feet stacked, right arm resting along his top hip. No weights anywhere.
2. `Spider Curl.png` — He lies CHEST-DOWN on the steep back pad of an incline bench, chest against the pad, both arms hanging straight down toward the floor holding a blue dumbbell in each hand, forearms curling the dumbbells up toward his shoulders.
3. `Chest-Supported Row.png` — He lies CHEST-DOWN on an incline bench set at about 45 degrees, chest pressed to the pad, feet on the floor behind him, rowing a blue dumbbell in each hand up toward his ribs, elbows driving back and up past his torso.
4. `Cable Bicep Curl.png` — He stands upright facing a single cable tower, a straight bar attached to the LOWEST pulley near the floor, elbows pinned to his sides, curling the bar up to chest height with palms facing up. The cable runs from the floor up to his hands.
5. `Cable Glute Kickback.png` — He faces a single cable tower, hands holding its frame, an ankle cuff on his right ankle attached to the low pulley, kicking that leg straight BACKWARD and up behind him, standing leg straight, torso leaning slightly forward.
6. `Close-Grip Lat Pulldown.png` — He sits at a lat pulldown machine, thighs under the pads, gripping a small V-shaped double handle with both hands close together and palms facing each other, pulling it down to his upper chest, leaning back slightly.
7. `Low-to-High Cable Fly.png` — He stands between two cable towers, D-handles attached at the LOWEST pulleys, arms starting down by his hips and sweeping up and inward, hands meeting in front of his upper chest, slight bend in elbows.
8. `Machine Lateral Raise.png` — He sits upright in a lateral raise MACHINE: a seat with a chest pad and two padded arm levers on the outside of his upper arms, elbows bent 90 degrees pressing against the pads, raising both arms out to shoulder height. No dumbbells.
9. `Dead Bug.png` — On a thin grey exercise mat he lies on his back, right arm extended straight up and back overhead, left leg extended straight out low above the floor, left arm pointing at the ceiling, right knee bent 90 degrees over his hip. No weights anywhere.
10. `Dumbbell Deadlift.png` — Hip hinge: hips pushed back, knees slightly bent, flat back tilted about 45 degrees, a blue dumbbell in each hand hanging straight down at shin height, arms straight, looking forward. Only two dumbbells.
11. `Pendlay Row.png` — Torso bent fully parallel to the floor, flat back, knees slightly bent, gripping ONE barbell with blue plates that is about to lift off the floor, pulling it explosively toward his lower chest. Only one barbell, nothing else on the floor.
12. `Reverse Barbell Curl.png` — Standing upright holding ONE barbell with small blue plates in front of his thighs with an OVERHAND grip (palms facing down and back), elbows at his sides, curling the bar up to chest height. The bar is in his hands, not on his shoulders.

### WEAK — key detail wrong (9)
13. `Close-Grip Bench Press.png` — Lying on a flat bench pressing ONE barbell with blue plates, hands placed NARROW, only shoulder-width apart, elbows tucked tight to his sides, bar just above his lower chest. Nothing else in the picture.
14. `Skull Crusher.png` — Lying on a flat bench, upper arms pointing straight up and staying still, elbows BENT so the EZ curl bar with small blue plates is lowered to just above his forehead. Forearms angled back, not locked out.
15. `Incline Dumbbell Fly.png` — Lying back on an incline bench at 30 degrees, arms spread WIDE out to the sides in a hugging arc, a blue dumbbell in each hand, elbows slightly bent, palms facing each other, chest open at the bottom of the fly.
16. `Incline Machine Chest Press.png` — Seated in an incline chest press MACHINE with a tall angled back pad and a weight stack behind, pushing two horizontal handles up and forward at an incline angle, feet flat on the floor. No free weights.
17. `Cable Rear Delt Fly.png` — Standing centered between two cable towers, D-handles at upper-chest height, arms crossed in front of him then pulled wide apart to the sides at shoulder height, cables crossing in front of his chest, elbows slightly bent.
18. `Hip Abduction Machine.png` — Seated in a hip abduction MACHINE: upright back pad, knees bent, two padded levers on the OUTSIDE of his knees, legs pushed apart wide against the pads. Weight stack at the side. White background.
19. `Pec Deck Machine.png` — Seated in a pec deck machine, back on the pad, forearms resting vertically on two padded arm levers at shoulder height, elbows bent 90 degrees, squeezing the two pads together in front of his chest.
20. `Straight Arm Pulldown.png` — Standing facing a single cable tower, straight bar attached at the HIGHEST pulley, arms fully STRAIGHT, pushing the bar in an arc from shoulder height down to his thighs, torso leaning slightly forward.
21. `Face Pull.png` — Standing facing a single cable tower, a ROPE attachment at head height, both hands gripping the rope ends, pulling it toward his face with elbows flared high and wide, hands finishing beside his ears.

### CLUTTER only — movement fine, redo for clean white background (3)
22. `Hanging Leg Raise.png` — Hanging from a white pull-up bar with straight arms, raising both straight legs up to hip height in front of him, toes pointed, core tight. Pure white background, no floor.
23. `Cable Crunch.png` — Kneeling facing a single cable tower, rope attachment at the top pulley held with both hands beside his head, crunching his torso down toward the floor, elbows moving toward his knees. Pure white background.
24. `Dumbbell Shrug.png` — Standing upright, a heavy blue dumbbell in each hand at his sides, arms straight, shoulders shrugged up toward his ears. Only the two dumbbells he holds, nothing on the floor.

### Optional (3) — correct now, redo only if you want zero grey floors
25. `Sumo Deadlift.png` — Very wide stance, toes pointed out, ONE barbell with blue plates gripped between his knees with a narrow grip, mid-lift, flat back. White background.
26. `Walking Lunge.png` — Stepping forward into a deep lunge, blue dumbbell in each hand at his sides, back knee near the floor, front knee at 90 degrees. White background.
27. `Push Press.png` — Standing with ONE barbell with blue plates in the front rack position on his shoulders, knees slightly BENT in a shallow dip, about to drive the bar overhead.
