// Builds side-by-side review images (frame1 | frame2) in the scratchpad rev folder. Usage: node _pairs.js out_dir name1 name2 ...
const {PNG}=require('pngjs');const fs=require('fs');const path=require('path');
const out=process.argv[2];fs.mkdirSync(out,{recursive:true});
for(const n of process.argv.slice(3)){try{
const a=PNG.sync.read(fs.readFileSync(path.join(__dirname,'..','..','assets','exercises',n+'.png')));const b=PNG.sync.read(fs.readFileSync(path.join(__dirname,'..','..','assets','exercises',n+'.b.png')));
const o=new PNG({width:640,height:320});for(let y=0;y<320;y++)for(let x=0;x<320;x++){for(let k=0;k<4;k++){o.data[(y*640+x)*4+k]=a.data[(y*320+x)*4+k];o.data[(y*640+320+x)*4+k]=b.data[(y*320+x)*4+k];}}
fs.writeFileSync(path.join(out,n.replace(/[^a-z0-9]/gi,'_')+'.png'),PNG.sync.write(o));}catch(e){console.log('ERR',n,e.message)}}
console.log('ok');
