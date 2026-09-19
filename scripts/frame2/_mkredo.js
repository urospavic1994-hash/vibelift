// Builds scripts/frame2/prompts-redo.md: original END POSITION + stronger wording + the fix for the specific fault seen in review.
const fs=require('fs'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'..','frame2-prompts.md'),'utf8').split(/\r?\n/);
const redo1=fs.readFileSync(path.join(__dirname,'redo-1.md'),'utf8').split(/\r?\n/);
const find=(n)=>{const l=redo1.find(x=>x.startsWith(n+' | '))||src.find(x=>x.startsWith(n+' | '));return l?l.slice(n.length+3):null;};
const PRE='the pose must be CLEARLY and OBVIOUSLY different from the picture, a big visible change: ';
const fix={
'Meadows Row':'the single weight plate stays on the same free end of the bar, far from the pivot, exactly one plate',
'Seated Machine Row':'BOTH hands stay on BOTH handles, both arms straight, the chest pad stays in place',
'Pendlay Row':'exactly one plate on each end of the bar, two plates in total, no extra plates',
'Dumbbell Single Arm Row':'only ONE dumbbell in the whole picture, nothing lying on the bench, the arm hangs a full arm length down',
'Neutral-Grip Pull-Up':'the body hangs a full arm length lower, the head far below the handles',
'Weighted Pull-Up':'the body hangs a full arm length lower, the head far below the bar',
'Underhand Barbell Row':'the bar hangs at knee height at the end of completely straight arms, far away from the belly',
'Smith Machine Row':'the bar hangs at knee height at the end of completely straight arms, far away from the belly',
'Seal Row':'BOTH hands keep holding the bar, the bar is lifted off the floor all the way up to the underside of the bench',
'Machine High Row':'the machine frame and both weight plates stay exactly where they are, only the handles and the arms move',
'Standing Dumbbell Overhead Press':'BOTH dumbbells at shoulder height, both elbows bent the same, symmetrical',
'Z Press':'exactly two plates in the picture, both on the bar, nothing on the rack',
'Single-Arm Cable Rear Delt Fly':'the cable stays attached to the same pulley at the same height',
'Barbell High Pull':'only ONE barbell in the picture, the rack behind is empty',
'Cable Internal Rotation':'only ONE handle and ONE cable in the picture',
'Handstand Push-Up':'the head is thirty centimetres above the handles, no mat, nothing added on the floor',
'Hack Squat':'the knees are almost straight and the body has slid at least thirty centimetres up the rails',
'Bulgarian Split Squat':'the hips are thirty centimetres higher than in the picture',
'Lying Leg Curl':'the roller pad touches the glutes, the shins point straight up',
'Glute Bridge':'the hips rest flat ON the mat, no gap under the lower back',
'Single-Leg Hip Thrust':'the hips hang low, only a few centimetres above the floor',
'Machine Hip Thrust':'the hips are thirty centimetres higher than in the picture, the belly is the highest point of the body',
'Pendulum Squat':'the machine frame, the arm and the plate keep exactly the same shape and colours, only their swing angle changes',
'Box Jump':'the person stands on the FLOOR, both feet on the ground in front of the box, the top of the box is empty',
'Diamond Push-Up':'the chest is thirty centimetres above the floor, arms locked',
'Preacher Curl':'the bar is right in front of the chin',
'Tricep Dip':'the shoulders are thirty centimetres higher than in the picture, elbows locked',
'Tricep Rope Pushdown':'the hands are at chest height, forearms pointing up',
'Close-Grip Bench Press':'the bar is a full arm length above the chest, elbows locked',
'Reverse Barbell Curl':'the bar is right in front of the collarbones',
'Single-Arm Cable Curl':'the hand hangs down beside the thigh, the arm completely straight',
'Cable Tricep Kickback':'the working hand is behind the hip, higher than the back',
'Single-Arm Overhead Dumbbell Extension':'the dumbbell is hidden behind the head, the forearm points down behind the back',
'Zottman Curl':'two separate dumbbells, one in each hand, NO barbell anywhere',
'JM Press':'the bar is a full arm length above the chest, elbows locked',
'Weighted Tricep Dip':'the shoulders are thirty centimetres higher than in the picture, feet clearly off the floor',
'Machine Tricep Extension':'same machine, same white pad colour, same handles, only the forearms and the lever arm move',
'Assisted Tricep Dip':'the shoulders and the knee pad are thirty centimetres higher than in the picture, elbows locked',
'Chest Dip':'the shoulders are thirty centimetres higher than in the picture, elbows locked',
'Decline Barbell Bench Press':'the bar is a full arm length above the chest, elbows locked',
'Smith Machine Bench Press':'the bar rests on the chest, elbows deeply bent',
'Incline Machine Chest Press':'the hands are a full arm length in front of the shoulders, elbows locked',
'Wide Push-Up':'the chest is thirty centimetres above the floor, arms locked',
'Archer Push-Up':'the chest is thirty centimetres above the floor, both arms locked',
'Barbell Row':'the bar touches the belly',
};
const out=['# Redo prompts (19 Sep 2026). Same recipe, END POSITION = text after " | ". Built by _mkredo.js',''];
for(const n of Object.keys(fix)){const e=find(n);if(!e){console.log('NO LINE',n);continue;}out.push(n+' | '+PRE+e.replace(/"/g,'')+'. IMPORTANT: '+fix[n]);}
fs.writeFileSync(path.join(__dirname,'prompts-redo.md'),out.join('\n')+'\n');console.log('lines',out.length-2);
