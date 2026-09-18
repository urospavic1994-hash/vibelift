const fs=require('fs');const groups=['chest','back','shoulders','legs','arms','core'];
let out='',tot=0,skip=0,bad=[];
for(const g of groups){
  const list=fs.readFileSync(`scripts/frame2/list-${g}.txt`,'utf8').split(/\r?\n/).filter(Boolean);
  const raw=fs.readFileSync(`scripts/frame2/prompts-${g}.md`,'utf8');
  const body=raw.split(/^#*\s*NOTES/m)[0];
  const lines=body.split(/\r?\n/).filter(l=>l.includes(' | '));
  const map=new Map(lines.map(l=>{const i=l.indexOf(' | ');return [l.slice(0,i).trim(),l.slice(i+3).trim()];}));
  out+=`\n## ${g[0].toUpperCase()+g.slice(1)}\n\n`;
  for(const n of list){
    const t=map.get(n);
    if(!t){bad.push(g+': missing '+n);continue;}
    if(/["|]/.test(t))bad.push(g+': bad char in '+n);
    if(!fs.existsSync('assets/exercises/'+n+'.png'))bad.push(g+': no png '+n);
    if(/^SKIP/.test(t))skip++;
    out+=`${n} | ${t.replace(/\.$/,'')}\n`;tot++;
  }
  for(const k of map.keys())if(!list.includes(k))bad.push(g+': extra '+k);
}
fs.writeFileSync('scripts/frame2/_merged.md',out);
console.log('total',tot,'skip',skip,'to generate',tot-skip);console.log(bad.join('\n')||'no problems');
