// Prints how much of the picture changed between frame 1 and frame 2 (share of pixels that differ clearly).
// Usage: node scripts/frame_diff.js "Barbell Bench Press" [more names...]   or  --all
const {PNG}=require('pngjs');const fs=require('fs');const path=require('path');
const dir=path.join(__dirname,'..','assets','exercises');
let names=process.argv.slice(2);
if(names[0]==='--all')names=fs.readdirSync(dir).filter(f=>f.endsWith('.b.png')).map(f=>f.slice(0,-6));
for(const n of names){
  try{
    const a=PNG.sync.read(fs.readFileSync(path.join(dir,n+'.png')));
    const b=PNG.sync.read(fs.readFileSync(path.join(dir,n+'.b.png')));
    let d=0;for(let i=0;i<a.data.length;i+=4){if(Math.abs(a.data[i]-b.data[i])+Math.abs(a.data[i+1]-b.data[i+1])+Math.abs(a.data[i+2]-b.data[i+2])>60)d++;}
    console.log((100*d/(a.width*a.height)).toFixed(1).padStart(5)+'%  '+n);
  }catch(e){console.log('  ERR  '+n+' '+e.message);}
}
