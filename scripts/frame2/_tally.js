const fs=require('fs');
const s=fs.readFileSync('index.html','utf8');
const withImg2=new Set();
const allImg=new Set();
const re=/name:\s*'([^']+)'([^}]*)/g;
let m;
while((m=re.exec(s))){
  const name=m[1], rest=m[2];
  if(/\bimg:/.test(rest)) allImg.add(name);
  if(/\bimg2:/.test(rest)) withImg2.add(name);
}
const stat=[...allImg].filter(n=>!withImg2.has(n)).sort();
console.log('with picture:',allImg.size,'| animated:',withImg2.size,'| still:',stat.length);
fs.writeFileSync('scripts/frame2/_static_now.txt',stat.join('\n')+'\n');
