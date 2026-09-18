const fs=require('fs');const s=fs.readFileSync('index.html','utf8');
const re=/\{ group:'([a-z]+)',[^\n]*?img:'([^']+)\.png'/g;let m;const g={};
const done=new Set(['Skull Crusher','Barbell Bench Press','Barbell Back Squat','Deadlift','Barbell Row','Pull-Up','Lat Pulldown','Barbell Overhead Press','Dumbbell Lateral Raise','Barbell Bicep Curl','Cable Tricep Pushdown','Leg Press','Romanian Deadlift','Hip Thrust','Push-Up','Cable Crunch']);
while(m=re.exec(s)){const f=m[2];if(done.has(f))continue;if(!fs.existsSync('assets/exercises/'+f+'.png')){console.log('MISSING',f);continue;}(g[m[1]]=g[m[1]]||[]).push(f);}
for(const k in g){fs.writeFileSync('scripts/frame2/list-'+k+'.txt',g[k].join('\n')+'\n');console.log(k,g[k].length);}
