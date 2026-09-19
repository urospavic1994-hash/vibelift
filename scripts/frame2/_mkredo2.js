// Round-2 redo prompts for exercises rejected during the core/arms run (19 Sep 2026).
const fs=require('fs'),path=require('path');
const src=['prompts-core.md','prompts-arms.md'].flatMap(f=>fs.readFileSync(path.join(__dirname,f),'utf8').split(/\r?\n/));
const find=n=>{const l=src.find(x=>x.startsWith(n+' | '));return l?l.slice(n.length+3):null;};
const PRE='the pose must be CLEARLY and OBVIOUSLY different from the picture, a big visible change: ';
const fix={
'Dead Bug':'the swap must be unmistakable - the arm that was UP is now flat on the mat behind the head and the other arm points straight at the ceiling',
'Mountain Climber':'the swap must be unmistakable - the forward knee is now fully stretched back and the back leg is now tucked right under the chest',
'Plank Up-Down':'both palms flat on the floor, arms completely straight, the shoulders thirty centimetres higher than in the picture, no forearms on the floor',
'Lying Dumbbell Tricep Extension':'the dumbbells are beside the ears, level with the head, forearms pointing back',
'Side Plank Hip Dip':'the hip almost touches the mat, the body clearly sags into a curve',
'Cable Side Bend':'the torso leans the OTHER way, the hand is down at knee height',
'Dumbbell Side Bend':'the torso leans the OTHER way, the dumbbell is down at knee height',
'Landmine Rotation':'exactly ONE barbell in the picture, one plate on its raised end, the landmine base stays in the same spot',
'Bicycle Crunch':'the swap must be unmistakable - the tucked knee is now fully straight and the straight leg is now tucked to the chest, torso twisted the other way',
'Weighted Russian Twist':'the plate is on the OTHER side of the body, shoulders clearly turned that way',
};
const out=['# Redo prompts round 2 (19 Sep 2026). END POSITION = text after " | ". Built by _mkredo2.js',''];
for(const n of Object.keys(fix)){const e=find(n);if(!e){console.log('NO LINE',n);continue;}out.push(n+' | '+PRE+e.replace(/"/g,'')+'. IMPORTANT: '+fix[n]);}
fs.writeFileSync(path.join(__dirname,'prompts-redo2.md'),out.join('\n')+'\n');console.log('lines',out.length-2);
