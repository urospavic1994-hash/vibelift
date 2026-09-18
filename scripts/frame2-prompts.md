# Frame 2 prompts (end position per exercise)

Used with docs/HANDOFF-motion-frames.md section 4. One line per exercise: `Name | END POSITION`.
Frame 2 is saved as `assets/exercises/<Name>.b.png`. Holds and carries are skipped (they stay static).

EDIT PROMPT template (replace <END POSITION>):

> Edit this image. Keep exactly the same person, same clothes, same hair, same equipment, same camera angle, same flat
> vector art style and the same pure white background. Change ONLY the pose to show the other end of the movement:
> <END POSITION>. Do not add or remove any object. Everything else identical. Square 1:1.

Note: the template says "person", not "man". About a third of the pictures show a woman in a yellow top.

## Slice 1 — most used (written 17 Sep 2026 after looking at every frame 1)

Barbell Bench Press | the barbell lowered all the way down until it touches the middle of the chest, elbows bent and pointing down and out below the bar; the rack and the bench do not move
Barbell Back Squat | standing fully upright inside the rack, legs straight, hips and knees locked out, barbell still resting on the upper back, hands still on the bar
Deadlift | standing fully upright, legs and back straight, shoulders back, arms hanging straight down, the barbell held against the front of the thighs, plates lifted off the floor
Barbell Row | same bent-over torso angle, elbows pulled up and back high behind the body, the barbell pulled up until it touches the lower belly
Pull-Up | hanging from the bar at the bottom with both arms fully straight, body lowered so the head is well below the bar, legs hanging down; the pull-up frame does not move
Lat Pulldown | both arms stretched fully straight up overhead holding the bar high above the head, the cable shorter, still seated with the thighs under the pad; the machine does not move
Barbell Overhead Press | the barbell pressed straight up overhead, both arms fully extended and locked out, the bar directly above the head
Dumbbell Lateral Raise | both arms hanging straight down at the sides, the dumbbells resting next to the thighs
Barbell Bicep Curl | the barbell curled all the way up to shoulder height in front of the chest, elbows fully bent and still tucked at the sides of the body, upper arms vertical
Cable Tricep Pushdown | elbows bent so the forearms point upward, the bar raised up to chest height, elbows still tucked at the sides of the body, the cable shorter; the machine does not move
Leg Press | both legs pushed out almost straight, the foot platform and its weight plates pushed far away up along the rails, the back still flat on the seat
Romanian Deadlift | standing fully upright, legs straight, shoulders back, arms hanging straight down, the barbell held against the front of the thighs
Hip Thrust | hips pushed all the way up so the torso and thighs form one straight horizontal line like a table top, shins vertical, the barbell lifted on the hips, upper back still on the bench
Push-Up | pushed all the way up, both arms fully straight, the body one straight line from head to heels, high plank position, feet on the toes
Cable Crunch | kneeling upright with the torso tall and straight, hands still holding the rope beside the head, the cable longer and running up to the pulley; the machine does not move

# Groups (written 17 Sep 2026 night; every frame 1 was looked at by Claude)

Lines reading `SKIP hold` are holds and carries: no second position, they stay static, never generate them.
Review watch-list per group is in scripts/frame2/prompts-<group>.md under NOTES (calf raises and wrist curls move only a few pixels: accept frame 2 only if the change is clearly visible).

## Chest

Cable Crossover | both arms opened wide out to the sides at shoulder height, elbows slightly bent, hands far apart holding the handles, chest stretched, cables running from the high pulleys to the hands; same split stance, the machine does not move
Chest Dip | pushed all the way up on the parallel bars, both arms fully straight and locked out, body lifted higher, torso still leaning slightly forward, knees still bent behind; the dip bars do not move
Decline Barbell Bench Press | the barbell pressed straight up above the lower chest, both arms fully extended and locked out; legs still hooked under the foot pads, the decline bench does not move
Dumbbell Bench Press | both dumbbells pressed straight up above the chest, arms fully extended and locked out, dumbbells close together; back still flat on the bench
Dumbbell Chest Fly | both dumbbells brought together directly above the chest, arms almost straight with a slight elbow bend, palms facing each other; back still flat on the bench
Dumbbell Pullover | the dumbbell brought up and over until it is directly above the chest, both arms almost straight and vertical, both hands still holding the one dumbbell; back still flat on the bench
Incline Barbell Bench Press | the barbell lowered all the way down until it touches the upper chest, elbows bent and pointing down and out below the bar; the rack and the bench do not move
Incline Cable Fly | both hands brought together above the chest, arms almost straight with a slight elbow bend, the cables longer and running from the low pulleys up to the hands; back still on the incline bench, the machines do not move
Incline Dumbbell Press | both dumbbells pressed straight up above the upper chest, arms fully extended and locked out, dumbbells close together; back still on the incline bench
Landmine Press | the end of the barbell pressed up and forward away from the shoulder, the pressing arm fully extended, the bar at a steeper angle; same staggered stance, the floor anchor does not move
Machine Chest Press | both handles pushed straight forward, arms fully extended in front of the chest, the machine arms moved forward with the hands, the weight stack lifted; back still against the pad, the machine frame does not move
Pec Deck Machine | both arms brought together in front of the chest, the two machine arms swung inward until the handles almost touch, elbows slightly bent; back still against the pad, the machine frame does not move
Smith Machine Bench Press | the bar lowered straight down the rails until it touches the middle of the chest, elbows bent and pointing down and out below the bar; the Smith machine frame and the bench do not move
Incline Dumbbell Fly | both dumbbells brought together above the upper chest, arms almost straight with a slight elbow bend, palms facing each other; back still on the incline bench
Low-to-High Cable Fly | both arms lowered down and out to the sides, hands beside the hips and slightly behind the body, arms almost straight, the cables shorter and running from the low pulleys to the hands; same stance, the machine does not move
Incline Machine Chest Press | both handles pushed forward and upward, arms fully extended, the machine arms moved with the hands, the weight stack lifted; back still against the pad, the machine frame does not move
Decline Dumbbell Press | both dumbbells lowered down to the sides of the chest, elbows bent and pointing out below the dumbbells; legs still hooked under the foot pads, the decline bench does not move
Decline Dumbbell Fly | both dumbbells brought together directly above the chest, arms almost straight with a slight elbow bend, palms facing each other; legs still hooked under the foot pads, the decline bench does not move
Decline Push-Up | lowered all the way down, elbows bent, chest and face almost touching the floor, body still one straight line; feet still up on the bench, the bench does not move
Wide Push-Up | pushed all the way up, both arms fully straight with the hands still placed wide apart, body one straight line from head to heels, feet on the toes
Knee Push-Up | lowered all the way down, elbows bent, chest almost touching the mat, body one straight line from head to knees; knees still on the mat, feet still raised
Plyometric Push-Up | lowered all the way down, elbows deeply bent, chest almost touching the floor, body one straight line from head to heels, ready to explode upward
Archer Push-Up | pushed all the way up, both arms fully straight with the hands still very wide apart, chest high above the floor, body one straight line from head to heels
High-to-Low Cable Fly | both hands brought down and together in front of the hips, arms almost straight and pointing down, the cables longer and running down to the hands; same split stance, the machine does not move
Single-Arm Cable Fly | the working arm opened out to the side toward the machine at chest height, elbow slightly bent, hand far from the body, the cable shorter; the other hand and the stance do not change, the machine does not move
Cable Pullover | both arms raised straight up and forward toward the pulley, the bar at about head height, arms almost straight, the cable shorter; same hip hinge and torso angle, the machine does not move
Barbell Pullover | the barbell brought up and over until it is directly above the chest, both arms almost straight and vertical; back still on the bench
Reverse-Grip Bench Press | the barbell lowered all the way down until it touches the lower chest, elbows bent and tucked close to the sides of the body, palms still facing the face; the rack and the bench do not move
Dumbbell Floor Press | both dumbbells lowered until the upper arms rest flat on the floor, elbows bent at a right angle, forearms vertical, dumbbells above the elbows; still lying on the floor with the knees bent
Single-Arm Dumbbell Bench Press | the dumbbell lowered down beside the chest, elbow bent and pointing out below the dumbbell; the other hand still resting on the belly, back still flat on the bench
Alternating Dumbbell Bench Press | the arms swapped: the arm that was pressed up is now lowered with the dumbbell beside the chest and the elbow bent, and the arm that was down is now pressed straight up and locked out; back still flat on the bench
Neutral-Grip Dumbbell Press | both dumbbells lowered down beside the chest, palms still facing each other, elbows bent and tucked close to the sides of the body; back still flat on the bench
Dumbbell Squeeze Press | both dumbbells still pressed tightly together and pushed straight up above the chest, arms fully extended and locked out; back still flat on the bench
Incline Smith Machine Press | the bar pressed straight up the rails, both arms fully extended and locked out above the upper chest; back still on the incline bench, the Smith machine frame does not move
Decline Machine Chest Press | both handles pushed forward and slightly downward, arms fully extended, the machine arms and their weight plates moved forward with the hands; back still against the pad, the machine frame does not move
Plate-Loaded Chest Press | both handles pushed straight forward, arms fully extended in front of the chest, the machine arms and their weight plates moved forward with the hands; back still against the pad, the machine frame does not move
Assisted Chest Dip Machine | pushed all the way up, both arms fully straight and locked out, body lifted higher, the knee pad risen with the knees still on it; the machine frame and the weight stack housing do not move
Weighted Chest Dip | pushed all the way up on the parallel bars, both arms fully straight and locked out, body lifted higher, the weight plate still hanging from the belt between the legs; the dip bars do not move
Kneeling Landmine Press | the end of the barbell pressed up and forward away from the shoulder, the pressing arm fully extended, the bar at a steeper angle; same half-kneeling position, the floor anchor does not move
Svend Press | the plate pulled back in until it touches the middle of the chest, elbows bent and pointing out to the sides, the plate still squeezed between both palms; standing tall, same stance
Incline Dumbbell Pullover | the dumbbell brought up and over until it is directly above the chest, both arms almost straight, both hands still holding the one dumbbell; back still on the incline bench
Incline Push-Up | lowered all the way down, elbows bent, chest almost touching the edge of the bench, body still one straight line from head to heels; hands still on the bench, the bench does not move
Flat Bench Cable Fly | both arms opened wide out to the sides level with the bench, elbows slightly bent, hands far apart, the cables shorter and running from the low pulleys to the hands; back still flat on the bench, the machines do not move
Wide-Grip Bench Press | the barbell pressed straight up above the chest, both arms fully extended and locked out with the hands still very wide apart on the bar; the rack and the bench do not move
Standing Cable Chest Press | both handles pressed straight forward at chest height, both arms fully extended in front of the body, the cables longer; same stance, the machine does not move
Barbell Floor Press | the barbell lowered until the upper arms rest flat on the floor, elbows bent at a right angle, forearms vertical, the bar just above the chest; still lying on the floor with the knees bent
Decline Smith Machine Press | the bar lowered straight down the rails until it touches the lower chest, elbows bent and pointing down and out below the bar; legs still hooked over the foot pad, the bench and the Smith machine frame do not move

## Back

Chin-Up | hanging from the bar at the bottom with both arms fully straight, underhand grip unchanged, body lowered so the head is well below the bar, legs hanging down; the pull-up frame does not move
Dumbbell Single Arm Row | the working arm hanging fully straight down below the shoulder, the dumbbell lowered close to the floor beside the bench, torso angle unchanged, the other hand and the knee still on the bench; the bench does not move
Face Pull | both arms stretched straight out in front at face height toward the pulley, the rope ends together in front, the cable shorter, standing in the same spot; the machine does not move
Meadows Row | the working arm hanging fully straight down, the loaded end of the barbell lowered close to the floor, torso angle and staggered stance unchanged, the other hand still on the knee; the landmine pivot does not move
Rack Pull | standing fully upright, hips and knees locked out, shoulders back, arms hanging straight down, the barbell lifted off the rack pins and held against the front of the upper thighs; the rack does not move
Seated Cable Row | both arms stretched fully straight out in front, the handle moved forward toward the machine above the shins, the visible cable shorter, torso upright, feet still on the foot plates; the machine does not move
Seated Machine Row | both arms stretched fully straight out in front, the handles moved forward away from the body, chest still against the chest pad; the seat and the frame do not move
Straight Arm Pulldown | both arms still straight but raised up in front to about eye level, the bar held high in front of the face, the cable shorter, torso leaning slightly forward, feet in the same spot; the machine does not move
T-Bar Row using a T-bar row machine | both arms hanging fully straight down, the handles and the weight plate lowered toward the floor, same bent-over torso angle, feet on the same foot platform; the machine frame does not move
Pendlay Row | the barbell resting on the floor with the plates touching the ground, both arms fully straight reaching down to the bar, torso flat and parallel to the floor, knees slightly bent
Chest-Supported Row | both arms hanging fully straight down toward the floor, the dumbbells lowered below the bench, chest still pressed against the incline bench; the bench does not move
Close-Grip Lat Pulldown | both arms stretched fully straight up overhead, the close-grip handle held high above the head, the cable shorter, still seated with the thighs under the pad; the machine does not move
Dumbbell Deadlift | standing fully upright, legs and back straight, shoulders back, arms hanging straight down, the dumbbells held at the sides of the thighs
Wide-Grip Lat Pulldown | both arms stretched fully straight up and out in a wide V holding the bar high above the head, the cable shorter, still seated with the thighs under the pad; the machine does not move
Reverse-Grip Lat Pulldown | both arms stretched fully straight up overhead holding the bar high above the head with the same underhand grip, the cable shorter, still seated with the thighs under the pad; the machine does not move
Single-Arm Lat Pulldown | the working arm stretched fully straight up toward the pulley, the handle held high above the head, the cable shorter, the other hand still resting on the thigh, still seated; the machine does not move
Plate-Loaded Lat Pulldown | both arms stretched fully straight up overhead, the handles and the lever arms raised to their highest point, the weight plates lowered, still seated; the machine frame does not move
Wide-Grip Pull-Up | hanging from the bar at the bottom with both arms fully straight in a wide grip, body lowered so the head is well below the bar, legs hanging down; the bar and its frame do not move
Neutral-Grip Pull-Up | hanging from the parallel handles at the bottom with both arms fully straight, body lowered so the head is well below the handles, legs hanging down; the station does not move
Weighted Pull-Up | hanging from the bar at the bottom with both arms fully straight, body lowered so the head is well below the bar, the weight plate still hanging from the belt between the legs; the bar does not move
Assisted Pull-Up Machine | pulled all the way up, both elbows bent and pulled down to the sides, chin above the handles, the knee pad risen higher with the knees still on it; the machine frame does not move
Negative Pull-Up | lowered to the bottom, hanging from the bar with both arms fully straight, head well below the bar, legs hanging down; the pull-up station does not move
Scapular Pull-Up | both arms still completely straight, shoulder blades pulled down and back so the shoulders drop away from the ears and the chest lifts, the whole body raised slightly higher toward the bar; the bar does not move
Underhand Barbell Row | both arms hanging fully straight down, the barbell lowered to just below the knees with the same underhand grip, same bent-over torso angle; the rack behind does not move
Smith Machine Row | both arms hanging fully straight down, the bar lowered along the rails to just below the knees, same bent-over torso angle; the Smith machine frame does not move
Dumbbell Bent-Over Row | both arms hanging fully straight down below the shoulders, the dumbbells lowered to just below knee height, same bent-over torso angle, knees slightly bent
Seal Row | the barbell pulled all the way up until it touches the underside of the bench, elbows bent and pointing high above the back, the plates lifted well off the floor, chest and legs still flat on the bench; the bench does not move
Renegade Row | both dumbbells on the floor, both arms fully straight, high plank position with the body one straight line from head to heels, feet in the same spot
Landmine Row | both arms hanging fully straight down, the handle and the loaded end of the barbell lowered close to the floor, same bent-over torso angle, straddling the bar in the same spot; the landmine pivot does not move
Single-Arm Cable Row | the handle pulled all the way back to the side of the waist, the elbow bent and drawn behind the body, the cable longer and straight to the pulley, torso upright, the other hand still on the thigh; the machine does not move
Wide-Grip Seated Cable Row | both arms stretched fully straight out in front with the same wide grip, the bar moved forward toward the machine, the visible cable shorter, torso upright, feet still on the foot plates; the machine does not move
Machine High Row | both arms stretched fully straight up and forward, the handles moved to their highest and farthest point, the lever arms tilted forward and the weight plates lowered, chest still against the pad; the machine frame does not move
Plate-Loaded Low Row | both arms stretched fully straight out in front, the handles moved forward away from the body, the weight plate lowered, chest still against the pad; the machine frame does not move
Chest-Supported T-Bar Row | both arms hanging fully straight down, the handles and the weight plate lowered toward the floor, chest still pressed against the pad; the machine frame does not move
Trap Bar Deadlift | the bottom of the lift, hips pushed back and knees deeply bent, torso leaning forward with a flat back, arms straight, the plates resting on the floor, still standing inside the trap bar
Deficit Deadlift | standing fully upright on the same platform, legs and back straight, shoulders back, arms hanging straight down, the barbell held against the front of the thighs, plates lifted high off the floor
Stiff-Leg Deadlift | standing fully upright, legs straight, shoulders back, arms hanging straight down, the barbell held against the front of the thighs; the rack behind does not move
Good Morning | hips pushed far back and the torso hinged forward until it is almost parallel to the floor, back flat, knees only slightly bent, the barbell still resting on the upper back with the hands on the bar
Back Extension | the torso bent forward and down over the front of the pad, head lowered toward the floor, arms still crossed on the chest, legs and feet locked in the same spot; the bench does not move
Reverse Hyperextension | both legs lowered and hanging straight down toward the floor below the end of the bench, torso still flat on the pad, hands still holding the handles; the machine does not move
Farmers Carry | SKIP hold
Snatch-Grip Deadlift | standing fully upright, legs and back straight, shoulders back, arms straight in the same very wide grip, the barbell held against the hips, plates lifted off the floor; the rack behind does not move
Superman | both arms, the chest and both legs lifted clearly off the mat at the same time, back arched, arms still reaching straight forward, only the belly and hips touching the mat; the mat does not move

## Shoulders

Arnold Press | both dumbbells pressed straight up overhead, arms fully extended and locked out, palms facing forward, the dumbbells above the head; still seated with the back against the pad, the bench does not move
Barbell Shrug | both shoulders shrugged straight up as high as possible toward the ears, arms still straight, the barbell lifted a few centimetres higher against the thighs, standing tall
Cable Lateral Raise | the working arm raised straight out to the side away from the machine up to shoulder height, elbow almost straight, the handle level with the shoulder, the cable longer and running diagonally across the front of the body; the machine does not move
Dumbbell Front Raise | both arms lowered straight down, the dumbbells resting against the front of the thighs, standing tall
Dumbbell Rear Delt Fly | same bent-over torso angle and bent knees, both arms hanging straight down below the chest, the dumbbells close together under the shoulders
Face Pull | both arms stretched out almost straight in front of the face toward the pulley, hands together holding the rope, the cable shorter, torso still upright; the machine does not move
Landmine Lateral Raise | the working arm lowered so the loaded end of the bar is held in front of the hips near the opposite thigh, arm straight and hanging down across the body; the floor end of the bar stays in the same spot
Machine Shoulder Press | both handles pressed all the way up overhead, arms fully extended and locked out, the machine arms raised with them, still seated with the back against the pad; the machine frame does not move
Plate Front Raise | both arms lowered straight down, the plate held with both hands in front of the thighs, standing tall
Push Press | standing fully upright with legs straight and locked, the barbell pressed straight up overhead, both arms fully extended and locked out, the bar directly above the head
Seated Dumbbell Overhead Press | both dumbbells pressed straight up overhead, arms fully extended and locked out, the dumbbells close together above the head; still seated with the back against the pad, the bench does not move
Upright Row | both arms lowered and fully straight, the barbell hanging against the front of the thighs, elbows down at the sides, standing tall
Dumbbell Shrug | both shoulders shrugged straight up as high as possible toward the ears, arms still straight at the sides, the dumbbells lifted a few centimetres higher beside the thighs
Machine Lateral Raise | both arms lowered down at the sides of the torso, elbows next to the ribs, the machine arm pads lowered with them; still seated, the machine frame does not move
Cable Rear Delt Fly | both arms brought forward and crossed in front of the chest at shoulder height, each hand still holding its own cable, the cables shorter; the machine does not move
Standing Dumbbell Overhead Press | both dumbbells lowered to shoulder height, elbows bent and pointing down and out, the dumbbells level with the ears, standing tall
Seated Barbell Overhead Press | the barbell lowered down to the top of the chest just under the chin, elbows bent and pointing down in front of the bar; still seated with the back against the pad, the bench and the rack do not move
Smith Machine Shoulder Press | the bar lowered along the rails down to the top of the chest just under the chin, elbows bent and pointing down; still seated with the back against the pad, the Smith machine and the bench do not move
Z Press | the barbell lowered down to the top of the chest just under the chin, elbows bent and pointing down in front of the bar; still sitting on the floor with the legs straight out in front, the rack does not move
Single-Arm Dumbbell Press | the working arm lowered so the dumbbell is at shoulder height beside the ear, elbow bent and pointing down; the other arm stays at the side, standing tall
Dumbbell Push Press | standing fully upright with legs straight and locked, both dumbbells pressed straight up overhead, arms fully extended and locked out
Cable Front Raise | both arms lowered straight down, the bar held against the front of the thighs, the cable shorter, standing tall; the machine does not move
Leaning Dumbbell Lateral Raise | same leaning body angle, the hand still holding the post, the working arm lowered and hanging straight down toward the floor with the dumbbell below the shoulder; the post does not move
Seated Dumbbell Lateral Raise | both arms lowered and hanging straight down at the sides, the dumbbells beside the bench below the hips; still seated, the bench does not move
Seated Rear Delt Fly | same forward-leaning torso, both arms hanging straight down, the dumbbells close together below the knees next to the lower legs; still seated on the end of the bench, the bench does not move
Single-Arm Cable Rear Delt Fly | the working arm brought across the front of the chest toward the machine at shoulder height, arm almost straight, the hand in front of the opposite shoulder, the cable shorter; the machine does not move
Cable Upright Row | both arms lowered and fully straight, the bar hanging in front of the thighs, elbows down at the sides, the cable shorter, standing tall; the machine does not move
Dumbbell Upright Row | both arms lowered and fully straight, the dumbbells hanging in front of the thighs, elbows down at the sides, standing tall
Cable Shrug | both shoulders shrugged straight up as high as possible toward the ears, arms still straight, the bar lifted a few centimetres higher in front of the thighs, the cable slightly longer; the machine does not move
Smith Machine Shrug | both shoulders shrugged straight up as high as possible toward the ears, arms still straight, the bar lifted a few centimetres higher along the rails; the Smith machine does not move
Dumbbell Cuban Press | upper arms still held out to the sides at shoulder height with elbows bent at ninety degrees, the forearms rotated down so they point toward the floor, the dumbbells hanging below the elbows in front of the chest
Cable External Rotation | the elbow still pinned against the side of the ribs and bent at ninety degrees, the forearm rotated outward away from the machine so the handle is out to the side of the body, the cable longer; the machine does not move
Cable Internal Rotation | the elbow still pinned against the side of the ribs and bent at ninety degrees, the forearm rotated outward toward the machine so the handle is out to the side of the body, the cable shorter; the machine does not move
Side-Lying External Rotation | same side-leaning body position on the bench, the top elbow still pinned against the side of the ribs and bent at ninety degrees, the forearm rotated upward so the dumbbell is raised and points toward the ceiling; the bench does not move
Barbell High Pull | both arms lowered and fully straight, the barbell hanging against the front of the thighs, elbows down at the sides, standing tall; the rack behind does not move
Plate Halo | the plate brought around to the front and held with both hands in front of the upper chest just below the chin, elbows bent and tucked, standing tall
Handstand Push-Up | pushed all the way up, both arms fully straight and locked out, the head lifted well above the handles, the body one straight vertical line with the feet still against the wall; the handles and the wall do not move
Dumbbell Scaption | both arms lowered and hanging straight down at the sides, the dumbbells beside the thighs, standing tall
Dumbbell Lu Raise | both arms lowered and hanging straight down at the sides, the dumbbells beside the thighs, standing tall
Overhead Dumbbell Carry | SKIP hold
Cable Y Raise | both arms lowered and crossed low in front of the hips, hands in front of the opposite thighs, arms straight, the cables shorter, standing tall; the machine does not move
Dumbbell Rear Delt Row | same bent-over torso angle and bent knees, both arms hanging straight down below the chest, elbows straight, the dumbbells close together under the shoulders
Barbell Front Raise | both arms lowered straight down, the barbell held against the front of the thighs, standing tall; the rack behind does not move
Incline Y Raise | chest still lying on the incline bench, both arms lowered and hanging straight down toward the floor on either side of the bench, the dumbbells below the shoulders; the bench does not move
Incline Rear Delt Fly | chest still against the incline pad, both arms lowered and hanging straight down toward the floor, the dumbbells close together below the chest; the bench does not move
Behind-the-Back Barbell Shrug | both shoulders shrugged straight up as high as possible toward the ears, arms still straight behind the body, the barbell lifted a few centimetres higher behind the thighs; the rack does not move
Pike Push-Up | pushed all the way up, both arms fully straight, hips still high in the air in an upside-down V shape, the head lifted off the floor between the arms, feet in the same spot

## Legs

Barbell Lunge | standing fully upright with both feet together side by side, both legs straight, the barbell still resting on the upper back, hands still on the bar
Bulgarian Split Squat | the front leg pushed up almost straight so the body is high, torso upright, the rear foot still resting on the bench behind, dumbbells hanging straight down at the sides; the bench does not move
Front Squat | standing fully upright, legs straight, hips and knees locked out, the barbell still resting on the front of the shoulders with the elbows held high
Goblet Squat | standing fully upright, legs straight, the dumbbell still held vertically against the chest with both hands
Hack Squat | both legs pushed out almost straight so the body and the shoulder pads have slid far up along the rails, back still flat against the back pad, hands still on the handles, feet still on the platform; the machine frame does not move
Leg Extension | both legs kicked up and fully straight, shins horizontal and pointing forward, the shin pad lifted up with the feet, still seated with the back against the pad and hands on the side handles; the machine does not move
Lying Leg Curl | both knees fully bent so the heels and the roller pad are pulled all the way up to the glutes, shins pointing straight up and past vertical, still lying face down with hips flat on the pad and hands on the handles; the machine does not move
Seated Calf Raise | both heels lifted as high as possible so the person is up on the toes on the foot bar, knees and the thigh pad raised visibly higher, still seated with hands on the pad; the machine does not move
Standing Calf Raise | raised high up on the toes with both heels lifted as far as possible above the edge of the platform, legs straight, the whole body visibly higher, hands still on the handles; the machine does not move
Step Up | standing fully upright on top of the box with both feet on it side by side, both legs straight, dumbbells hanging straight down at the sides; the box does not move
Sumo Deadlift | standing fully upright with the same wide stance, legs and back straight, shoulders back, arms hanging straight down between the thighs, the barbell held against the front of the thighs, plates lifted off the floor
Walking Lunge | standing fully upright with both feet together side by side, both legs straight, torso upright, dumbbells hanging straight down at the sides
Hip Abduction Machine | both knees brought together in front of the body, thighs parallel and pointing straight forward, the two leg pads closed against each other, still seated with the back against the pad and hands on the handles; the machine does not move
Cable Glute Kickback | the working leg brought back down and forward so its knee is bent and lifted slightly in front of the body under the hips, the foot just off the floor next to the standing foot, the cable shorter, torso still leaning forward with hands on the machine; the machine does not move
Smith Machine Squat | standing fully upright inside the Smith machine, legs straight, hips and knees locked out, the bar still resting on the upper back and raised higher on the guide rails, hands still on the bar; the machine frame does not move
Dumbbell Squat | standing fully upright, legs straight, torso upright, dumbbells hanging straight down at the sides
Box Squat | standing fully upright in front of the box, legs straight, hips and knees locked out, the barbell still resting on the upper back, hands still on the bar; the box stays behind the person and does not move
Zercher Squat | standing fully upright, legs straight, the barbell still held in the crooks of the bent elbows in front of the belly
Pendulum Squat | both legs pushed out almost straight so the body and the shoulder pads have swung far up and back, back still flat against the back pad, hands still on the handles, feet still on the platform, the weight arm swung to match; the machine base does not move
Belt Squat | standing fully upright on the platform, legs straight, the belt still around the hips with the strap and plates lifted higher, arms still stretched out to the sides for balance; the machine does not move
Pistol Squat | standing fully upright on the one supporting leg, that leg straight, the other leg held straight out in front just above the floor, arms still stretched forward holding the dumbbell
Bodyweight Squat | standing fully upright, legs straight, torso upright, arms still stretched straight out in front at shoulder height
Box Jump | standing on the floor directly in front of the box in a quarter squat ready to jump, knees slightly bent, torso leaning slightly forward, both arms swung back behind the hips; the box does not move and nobody is on top of it
Reverse Lunge | standing fully upright with both feet together side by side, both legs straight, torso upright, dumbbells hanging straight down at the sides; nothing else changes
Curtsy Lunge | standing fully upright with both feet side by side hip-width apart, both legs straight, torso upright, dumbbells hanging straight down at the sides; nothing else changes
Split Squat | the same staggered stance with one foot forward and one foot back, but both legs pushed up almost straight so the body is high, torso upright, dumbbells hanging straight down at the sides
Leg Press Calf Raise | both legs still straight, the toes pushed forward and the ankles fully extended so the feet point like a ballerina and the sled is pushed slightly further away, only the balls of the feet on the bottom edge of the platform; the machine does not move
Donkey Calf Raise | raised high up on the toes with both heels lifted as far as possible above the edge of the platform, legs straight, the hips and the hip pad visibly higher, torso still bent forward with forearms on the support; the machine does not move
Single-Leg Calf Raise | raised high up on the toes of the standing foot with the heel lifted as far as possible above the edge of the step, the standing leg straight, the whole body visibly higher, the other foot still tucked behind, dumbbell still hanging at the side; the step does not move
Smith Machine Calf Raise | raised high up on the toes with both heels lifted as far as possible above the edge of the step block, legs straight, the whole body and the bar visibly higher on the guide rails, the bar still on the upper back; the machine frame and the block do not move
Dumbbell Romanian Deadlift | standing fully upright, legs straight, shoulders back, arms hanging straight down, the dumbbells held against the front of the thighs
Single-Leg Romanian Deadlift | standing fully upright on the same supporting leg, torso vertical, the rear leg brought down so its foot is next to the standing foot just touching the floor, the dumbbell hanging straight down at the side of the thigh
Nordic Hamstring Curl | the body lowered far forward in one straight line from knees to head, almost down to the mat, hands ready in front of the chest just above the mat to catch the fall, knees still on the mat and ankles still locked under the roller pads; the anchor frame and the mat do not move
Machine Hip Thrust | hips pushed all the way up so the torso and thighs form one straight line like a table top, shins vertical, the belt pad lifted with the hips and the weight arm raised to match, upper back still on the back pad, hands still on the handles; the machine frame does not move
Hip Adduction Machine | both legs spread wide apart, knees pointing out to the sides, the two leg pads opened wide with the thighs, still seated with the back against the pad and hands on the handles; the machine does not move
Single-Leg Leg Press | the working leg pushed out almost straight against the foot platform, the platform pushed far away, the other foot still resting on the floor, back still against the seat and hands on the handles; the machine frame does not move
Sled Push | the same forward lean with both hands still on the sled poles and arms straight, but the legs switched to the opposite stride: the leg that was back is now driven forward with the knee bent under the hips, and the leg that was forward is now stretched out straight behind; the sled does not change
Jump Squat | at the top of the jump in the air, the body fully stretched and vertical, both legs straight with toes pointing down, feet clearly off the ground, arms swung down and back behind the hips
Lateral Lunge | standing fully upright with both feet close together side by side, both legs straight, torso upright, the dumbbell still held against the chest with both hands
Cable Pull-Through | standing fully upright, hips pushed forward, legs straight, torso vertical, shoulders back, arms straight down with the rope handle held in front of the hips, the cable longer; the machine does not move
Glute Bridge | hips lowered all the way down so the lower back and glutes rest flat on the mat, knees still bent with feet flat on the mat, arms still flat at the sides; the mat does not move
Single-Leg Hip Thrust | hips dropped down toward the floor so the glutes hang just above the ground, the torso angled down from the bench, the supporting knee bent sharply, the other leg still held off the floor, upper back and arms still on the bench; the bench does not move
Cable Hip Abduction | the working leg brought back in so it hangs straight down next to the standing leg, the foot just off the floor beside the standing foot, the cable shorter, torso upright with hands still on the machine; the machine does not move

## Arms

Cable Overhead Tricep Extension | both elbows bent fully so the hands and the rope are pulled back behind the head, elbows pointing forward next to the ears, upper arms in the same place, the cable shorter; same split stance facing away from the machine, the machine does not move
Cable Rope Hammer Curl | both arms lowered and hanging straight down, hands holding the rope ends in front of the thighs, elbows still tucked at the sides of the body, the cable shorter; the machine does not move
Concentration Curl | the dumbbell curled all the way up to the front of the shoulder, elbow fully bent and still braced against the inner thigh, upper arm in the same place, torso still leaning forward, other hand still on the other knee; the bench does not move
Diamond Push-Up | pushed all the way up, both arms fully straight, hands still together on the floor under the chest forming a diamond, the body one straight line from head to heels, feet on the toes
Dumbbell Hammer Curl | both dumbbells curled all the way up to the front of the shoulders, palms still facing each other, elbows fully bent and still tucked at the sides of the body, upper arms vertical
EZ Bar Curl | the EZ bar curled all the way up to shoulder height in front of the upper chest, elbows fully bent and still tucked at the sides of the body, upper arms vertical
Incline Dumbbell Curl | both dumbbells curled all the way up to the front of the shoulders, elbows fully bent and still pointing down behind the torso, upper arms in the same place, back still flat against the inclined bench; the bench does not move
Machine Bicep Curl | both arms stretched out almost straight and lying down along the sloped arm pad, the handles lowered far forward and down, the cable shorter, upper arms still resting on the pad, still seated; the machine does not move
Overhead Tricep Extension | both arms pressed fully straight up, the dumbbell held high directly above the head with both hands, elbows locked out and close to the ears, torso upright
Preacher Curl | the EZ bar curled all the way up toward the shoulders, elbows fully bent, forearms almost vertical, upper arms still resting flat on the sloped pad, still seated; the preacher bench does not move
Tricep Dip | pushed all the way up, both arms fully straight and locked out, shoulders high above the handles, the whole body raised higher, legs still hanging in front; the dip station does not move
Tricep Rope Pushdown | elbows bent so the forearms point upward, the rope ends raised up to chest height, elbows still tucked at the sides of the body, upper arms vertical, the cable shorter; the machine does not move
Close-Grip Bench Press | the barbell pressed straight up above the chest, both arms fully extended and locked out, hands still close together on the bar, back still flat on the bench; the rack and the bench do not move
Spider Curl | both arms hanging fully straight down toward the floor in front of the bench, the dumbbells low below the top of the bench, chest still lying on the inclined pad; the bench does not move
Cable Bicep Curl | both arms lowered and fully straight, the bar held down against the front of the thighs, elbows still tucked at the sides of the body, the cable shorter; the machine does not move
Reverse Barbell Curl | the barbell curled all the way up to shoulder height in front of the upper chest with the palms still facing down and the knuckles on top, elbows fully bent and still tucked at the sides of the body, upper arms vertical
Dumbbell Bicep Curl | the curled arm lowered all the way down, both arms now hanging straight at the sides, both dumbbells resting next to the thighs
Seated Dumbbell Curl | both arms hanging fully straight down at the sides of the bench, the dumbbells low beside the hips, back still against the upright pad, still seated; the bench does not move
Zottman Curl | both arms lowered and hanging straight down, the dumbbells held in front of the thighs with the palms facing backward and the knuckles forward, elbows still tucked at the sides of the body
Cross-Body Hammer Curl | the working arm lowered all the way down and hanging straight at the side, the dumbbell resting next to the outer thigh, the other arm unchanged
Dumbbell Preacher Curl | the working arm stretched out almost straight and lying down along the sloped pad, the dumbbell lowered far forward and down near the bottom of the pad, upper arm still resting on the pad, still seated; the preacher bench does not move
Machine Preacher Curl | both arms stretched out almost straight and lying down along the sloped pad, the handles and the lever arm of the machine lowered forward and down, upper arms still resting on the pad, still seated; the machine does not move
Bayesian Cable Curl | the working elbow fully bent, the handle curled up to the front of the shoulder, the upper arm still slightly behind the body, the cable longer and running from the hand back down to the low pulley; same stance facing away from the machine, the machine does not move
High Cable Curl | both elbows fully bent, both handles curled in toward the ears beside the head, upper arms still held out horizontal at shoulder height, the cables longer; both machines do not move
Single-Arm Cable Curl | the working arm lowered and fully straight, the handle held down next to the front of the thigh, elbow still tucked at the side of the body, the cable shorter; the machine does not move
Drag Curl | both arms lowered and fully straight, the barbell held down against the front of the thighs, elbows at the sides of the body; the stand behind the person does not move
Wide-Grip Barbell Curl | both arms lowered and fully straight, the barbell held down against the front of the thighs with the hands still wide apart on the bar, elbows at the sides of the body
Cable Reverse Curl | both arms lowered and fully straight, the bar held down against the front of the thighs with the palms still facing down and the knuckles forward, elbows still tucked at the sides of the body, the cable shorter; the machine does not move
Barbell Wrist Curl | only the wrists move: both wrists curled fully upward so the knuckles point up and the barbell is lifted higher above the knees, forearms still resting flat on the thighs, still seated leaning forward; the bench does not move
Reverse Wrist Curl | only the wrists move: both wrists bent fully downward so the knuckles point toward the floor and the barbell hangs lower in front of the knees, palms still facing down, forearms still resting flat on the thighs, still seated; the bench does not move
Plate Pinch Hold | SKIP hold
Dumbbell Wrist Curl | only the wrist moves: the wrist curled fully upward so the knuckles point up and the dumbbell is lifted higher above the knee, forearm still resting flat on the thigh, same seated posture leaning forward
Tricep Kickback | the working elbow bent to a right angle, the forearm hanging straight down with the dumbbell below the elbow, the upper arm still held back along the side of the torso, same bent-over torso angle, other hand still on the bench; the bench does not move
Cable Tricep Kickback | the working arm extended fully straight back behind the hip, the handle pulled back and up behind the body, the upper arm in line with the torso, the cable longer, same bent-over torso angle, the other arm unchanged; the machine does not move
Single-Arm Overhead Dumbbell Extension | the working elbow fully bent so the dumbbell is lowered behind the head and neck, the elbow pointing straight up next to the ear, upper arm still vertical, the other arm unchanged, torso upright
Single-Arm Cable Pushdown | the working elbow bent so the forearm points upward, the handle raised up to chest height, elbow still tucked at the side of the body, upper arm vertical, the cable shorter; the machine does not move
Reverse-Grip Tricep Pushdown | elbows bent so the forearms point upward, the bar raised up to chest height with the palms still facing up, elbows still tucked at the sides of the body, upper arms vertical, the cable shorter; the machine does not move
V-Bar Tricep Pushdown | elbows bent so the forearms point upward, the V-bar raised up to chest height, elbows still tucked at the sides of the body, upper arms vertical, the cable shorter; the machine does not move
EZ Bar Overhead Extension | both elbows fully bent so the EZ bar is lowered behind the head and neck, elbows pointing straight up next to the ears, upper arms still vertical, back still against the upright pad, still seated; the bench does not move
Machine Tricep Extension | both elbows fully bent so the handles and the lever arm of the machine are raised up close to the shoulders, forearms pointing up, elbows and upper arms still resting on the pad, still seated; the machine does not move
Machine Tricep Dip | both handles pushed all the way down beside the hips, both arms fully straight and locked out, shoulders down, the weight stack lifted higher, still seated upright; the machine frame does not move
Assisted Tricep Dip | pushed all the way up, both arms fully straight and locked out, shoulders high above the handles, the whole body and the knee pad raised higher, still kneeling on the pad; the machine frame does not move
Bench Dip | pushed all the way up, both arms fully straight and locked out, hands still on the edge of the bench behind the body, hips raised to the height of the bench seat, legs still stretched out in front with the heels on the floor; the bench does not move
JM Press | the barbell pressed straight up, both arms fully extended and locked out, the bar directly above the upper chest, hands still close together, back still flat on the bench; the bench does not move
Weighted Tricep Dip | pushed all the way up, both arms fully straight and locked out, shoulders high above the bars, the whole body raised so the feet hang clearly off the floor, the weight plate still hanging from the belt between the legs; the dip station does not move
Smith Machine Close-Grip Bench | the bar pressed straight up along the rails, both arms fully extended and locked out, the bar and its plates much higher above the chest, hands still close together, back still flat on the bench; the Smith machine frame and the bench do not move
Lying Dumbbell Tricep Extension | both elbows fully bent so the dumbbells are lowered down beside the ears on each side of the head, elbows pointing straight up, upper arms still vertical, back still flat on the bench; the bench does not move

## Core

Hanging Leg Raise | hanging from the bar with both legs lowered straight down under the body, legs together and vertical, arms still fully straight; the pull-up frame does not move
Dead Bug | the opposite arm and leg switched: the arm that was pointing up is now reaching back overhead just above the mat, the other arm now points straight up, the leg that was stretched out is now bent with the knee above the hip, and the leg that was bent is now stretched out straight just above the mat; back still flat on the mat
Side Plank | SKIP hold
Decline Crunch | lying all the way back with the whole back and the head resting on the decline bench, hands still behind the head, feet still hooked at the top; the bench does not move
Weighted Crunch | lying flat on the back on the mat, shoulders and head down on the mat, the weight plate still held against the chest with both hands, knees still bent and feet flat on the mat
Machine Crunch | torso crunched forward and down, chest curled toward the thighs, the handles and the upper pad pulled down and forward with the hands still gripping them beside the head, hips still on the seat, the weight stack lifted; the machine frame does not move
Hanging Knee Raise | hanging from the bar with both legs lowered straight down under the body, legs together and vertical, arms still fully straight; the frame does not move
Captains Chair Knee Raise | both knees lifted high up to chest height, thighs above horizontal, knees bent, feet together, back still against the pad and forearms still on the arm pads; the station does not move
Toes to Bar | hanging from the bar with both legs lowered straight down under the body, legs together and vertical, arms still fully straight; the bar does not move
Windshield Wipers | both legs still straight and together and lifted high, but swung over to the opposite side of the body, feet now pointing to the other side, arms and grip on the bar unchanged; the bar does not move
Mountain Climber | the legs switched: the knee that was forward is now stretched back straight with the toes on the floor, and the leg that was back is now driven forward with the knee under the chest; hands stay planted on the floor, arms straight
Plank Shoulder Tap | both hands planted on the floor under the shoulders, both arms straight, high plank position, body one straight line from head to heels
Plank Up-Down | pushed up into a high plank, both hands flat on the floor under the shoulders, both arms fully straight, body one straight line from head to heels, feet on the toes
Side Plank Hip Dip | the hips dipped down until they almost touch the mat, the body sagging sideways in a shallow curve, the supporting forearm and the feet in the same place, the top arm still raised
Bird Dog | on all fours, both hands and both knees on the mat, the raised arm brought back down under the shoulder and the raised leg brought back down with the knee under the hip, back flat
Body Saw | the whole body slid backward on the sliders, the shoulders now well behind the elbows, arms reaching forward at a long angle, forearms in the same place on the mat, body still one straight line
Pallof Press | the handle pulled in against the middle of the chest with both hands, elbows bent and tucked at the sides, torso still square and not rotated, the cable shorter; the machine does not move
Cable Woodchop High-to-Low | the handle held with both hands high up above the shoulder on the machine side, arms reaching up toward the top pulley, torso and shoulders rotated toward the machine, the cable shorter; the machine does not move
Cable Woodchop Low-to-High | the handle swung diagonally up and across the body, held with both arms extended high above the shoulder on the side away from the machine, torso rotated away from the machine, the cable longer and running diagonally up from the low pulley; the machine does not move
Standing Cable Crunch | the torso curled deeply forward and down, the back rounded, the elbows pulled down toward the thighs, hands still holding the rope beside the head, legs and feet in the same place, the cable longer; the machine does not move
Cable Side Bend | the torso bent sideways in the opposite direction, toward the cable machine, the hand holding the handle lowered down along the leg toward the knee, the cable shorter, feet in the same place; the machine does not move
Dumbbell Side Bend | the torso bent sideways in the opposite direction, toward the dumbbell side, the dumbbell lowered down along the outside of the leg toward the knee, the other hand still behind the head, feet in the same place
Landmine Rotation | the end of the barbell swung in an arc across the body to the opposite side, held with both arms extended down beside the opposite hip, torso and shoulders rotated to that side, feet in the same place; the landmine base on the floor does not move
Suitcase Carry | SKIP hold
Weighted Plank | SKIP hold
Plank Leg Lift | both feet down on the mat, toes on the mat, legs together, a plain forearm plank with the body one straight line from head to heels
Reverse Plank | SKIP hold
L-Sit | SKIP hold
Hanging Oblique Knee Raise | hanging from the bar with both legs lowered straight down under the body, legs together and vertical, hips square, arms still fully straight; the bar does not move
Barbell Rollout | the barbell rolled far forward away from the knees, the body stretched out long and low just above the mat, arms fully extended in front of the head, hips dropped in line with the shoulders and knees, knees still on the mat
Jackknife Sit-Up | lying flat on the back on the mat, both arms stretched straight back overhead just above the mat, both legs straight and together just above the mat
Heel Touch | the torso bent sideways to the opposite side, the other hand now reaching down to touch the other heel, the first arm back alongside the body, shoulders still slightly lifted off the mat, knees still bent and feet flat
Weighted Russian Twist | the torso and shoulders rotated to the opposite side, the weight plate carried across and held beside the opposite hip just above the mat, same seated lean-back position, legs in the same place
Sit-Up | lying flat on the back on the mat, shoulders and head down on the mat, hands still behind the head, knees still bent and feet flat on the mat
Decline Sit-Up | lying all the way back with the whole back resting on the bench, head toward the far end of the bench, arms still crossed on the chest, feet still hooked under the roller pads; the bench does not move
Bicycle Crunch | the legs switched: the knee that was pulled in is now stretched out straight just above the mat, and the leg that was straight is now bent with the knee pulled in toward the chest, the torso twisted the other way so the opposite elbow points at that knee, hands still behind the head
Reverse Crunch | the hips and lower back curled up off the mat, the bent knees pulled in toward the chest and face, the feet lifted higher, shoulders, head and arms still flat on the mat
Oblique Crunch | lying flat on the back on the mat, shoulders and head down on the mat, hands still behind the head, knees still bent and feet flat on the mat
Toe Touch | the shoulders and upper back lifted higher off the mat, both arms reaching all the way up so the fingertips touch the toes, legs still straight and vertical
Flutter Kicks | the legs switched: the leg that was raised high is now lowered to just above the mat, and the leg that was low is now raised high, both legs straight, torso and arms unchanged
Hollow Body Hold | SKIP hold
V-Up | lying flat on the back on the mat, both arms stretched straight back overhead just above the mat, both legs straight and together just above the mat
Scissor Kicks | both legs straight and lifted a little off the mat, crossed one over the other at the shins like closed scissors, torso and arms unchanged

## HOLD — frame 1 is wrong for the name. Redo frame 1 first (recipe v5), only then make frame 2

Seated Cable Chest Press | both handles pulled back beside the chest, elbows bent and pointing back behind the body, hands next to the ribs; still seated upright, the machine does not move
   PROBLEM: frame 1 faces the weight stack and reads as a seated row
Inverted Row | body lowered with both arms fully straight, hanging under the bar, chest well below the bar, body still one straight line from head to heels, heels on the floor in the same spot; the rack and the bar do not move
   PROBLEM: frame 1 has a grey checkerboard background instead of white
Machine Back Extension | the torso leaned far forward over the thighs, the back pad and its lever arm moved forward with the back, the weight plates lowered, feet still on the foot plate; the machine frame does not move
   PROBLEM: frame 1 shows a seated plate-loaded machine with a bar at the chest, not a back extension
Reverse Pec Deck | both arms brought together straight out in front of the chest at shoulder height, hands close together, the two machine arms swung forward with them; still seated, the machine frame does not move
   PROBLEM: frame 1 faces away from the pad like a normal pec deck fly; reverse pec deck faces the pad
Seated Leg Curl | both legs stretched out straight in front, shins horizontal, the roller pad lifted up with the ankles, still seated with the back against the pad and hands on the side handles; the machine does not move
   PROBLEM: frame 1 has the pad on the front of the shins = leg extension; curl pad goes behind the ankles
Sissy Squat | standing upright and tall on the sissy squat bench, legs straight, torso vertical, shins still against the pad and feet still locked under the roller, arms relaxed in front; the bench does not move
   PROBLEM: frame 1 is a person leaning back on a small bench, not a sissy squat
Glute Ham Raise | the torso lowered all the way down over the front of the pad so the upper body hangs toward the floor with the head low, hips bent over the pad, dumbbells still held against the chest, legs and ankles still locked in place; the bench does not move
   PROBLEM: frame 1 is a 45 degree back extension bench with dumbbells, not a glute ham raise
Dragon Flag | the whole body lifted off the floor as one rigid straight line from the shoulders to the feet, pointing diagonally up, only the upper back and shoulders resting on the bench, hands gripping the bench beside the head; the bench does not move
   PROBLEM: frame 1 has shoulders on the bench end and feet on the floor; dragon flag = lying on the bench, body straight and lifted
