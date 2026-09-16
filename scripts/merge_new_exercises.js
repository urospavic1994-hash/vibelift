// Merge approved new exercises into index.html (catalog + WIKI_DATA), but ONLY those whose icon PNG exists.
// Usage:  node scripts/merge_new_exercises.js            (dry run: prints what would be added)
//         node scripts/merge_new_exercises.js --write    (edits index.html, backs it up first)
// Safe to re-run: skips ids already present. Bump the sw.js cache version yourself afterwards.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const ALL = [...require('./new-exercises-draft-1.js'), ...require('./new-exercises-draft-2.js')];
const WRITE = process.argv.includes('--write');

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const have = new Set([...html.matchAll(/id:'([a-z0-9_]+)'/g)].map(m => m[1]));

const ready = [], noIcon = [], already = [];
for (const e of ALL) {
  if (have.has(e.id)) { already.push(e.id); continue; }
  if (!fs.existsSync(path.join(ROOT, 'assets', 'exercises', e.img))) { noIcon.push(e.name); continue; }
  ready.push(e);
}
console.log(`ready to add: ${ready.length}   waiting for icon: ${noIcon.length}   already in app: ${already.length}`);
if (noIcon.length) console.log('no icon yet: ' + noIcon.join(', '));
if (!ready.length) process.exit(0);

const q = s => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const catLine = e => `  { group:${q(e.group)}, gl:${q(e.gl)}, eq:${q(e.eq)}, id:${q(e.id)}, name:${q(e.name)}, img:${q(e.img)} },`;
const wikiLine = e => `  ${e.id}: { f:[${e.f.map(q).join(',')}], t:[${e.t.map(q).join(',')}], s:[${e.s.map(q).join(',')}] },`;

// 1) catalog: insert before the closing of the array that holds the last existing catalog entry
const lastCat = html.lastIndexOf("img:'");
const catEnd = html.indexOf('\n', html.indexOf('},', lastCat)) + 1;
if (lastCat < 0 || catEnd <= 0) throw new Error('catalog anchor not found');
// 2) WIKI_DATA: insert before its closing "};"
const wikiStart = html.indexOf('const WIKI_DATA = {');
const wikiEnd = html.indexOf('\n};', wikiStart);
if (wikiStart < 0 || wikiEnd < 0) throw new Error('WIKI_DATA anchor not found');
if (catEnd > wikiStart) throw new Error('unexpected layout: catalog after WIKI_DATA');

const catBlock = '\n  // ── added ' + new Date().toISOString().slice(0, 10) + ' (library expansion) ──\n' + ready.map(catLine).join('\n') + '\n';
const wikiBlock = '\n  // ── added ' + new Date().toISOString().slice(0, 10) + ' (library expansion) ──\n' + ready.map(wikiLine).join('\n');

const out = html.slice(0, catEnd) + catBlock + html.slice(catEnd, wikiEnd) + wikiBlock + html.slice(wikiEnd);

console.log(ready.map(e => `  + ${e.group.padEnd(9)} ${e.name}`).join('\n'));
if (WRITE) {
  const bak = path.join(ROOT, `index.backup.${Date.now()}.html`);
  fs.copyFileSync(path.join(ROOT, 'index.html'), bak);
  fs.writeFileSync(path.join(ROOT, 'index.html'), out);
  console.log(`\nWRITTEN. Backup: ${path.basename(bak)}. Now bump CACHE version in sw.js and test.`);
} else {
  console.log('\nDry run only. Add --write to apply.');
}
