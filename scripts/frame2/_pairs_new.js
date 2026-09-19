const {PNG}=require('pngjs');const fs=require('fs');const path=require('path');
const out=process.argv[2];fs.mkdirSync(out,{recursive:true});
for(const n of process.argv.slice(3)){try{
const dir='assets/exercises/';
const a=PNG.sync.read(fs.readFileSync(dir+n+'.png'));
const b=PNG.sync.read(fs.readFileSync(dir+n+'.new.png'));
const o=new PNG({width:640,height:320});
for(let y=0;y<320;y++)for(let x=0;x<320;x++)for(let k=0;k<4;k++){
o.data[(y*640+x)*4+k]=a.data[(y*320+x)*4+k];
o.data[(y*640+320+x)*4+k]=b.data[(y*320+x)*4+k];}
fs.writeFileSync(path.join(out,n.replace(/[^a-z0-9]/gi,'_')+'.png'),PNG.sync.write(o));
}catch(e){console.log('ERR',n,e.message)}}
console.log('ok');
