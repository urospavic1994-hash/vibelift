// CONNECTOR for the two-frame motion feature.
// Rule: an exercise animates in the info sheet only if its catalog line has img2, and img2 is only ever
// written by this script, and only when the file really exists. Missing frame = static picture, nothing breaks.
//
// Usage:  node scripts/attach_frames.js            dry run: shows what would change
//         node scripts/attach_frames.js --write    edits index.html (backup first)
// Convention: second frame of "Skull Crusher.png" is "Skull Crusher.b.png" in assets/exercises/.
// Idempotent: run it as often as you like. It also REMOVES img2 when the .b file is gone.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const WRITE = process.argv.includes('--write');
const file = path.join(ROOT, 'index.html');
let html = fs.readFileSync(file, 'utf8');

let added = [], removed = [], kept = 0, waiting = 0;
const out = html.replace(/^(\s*\{ group:'[a-z]+',[^\n]*?img:'([^']+)\.png')(, img2:'[^']+')?( \},?)$/gm, (line, head, base, cur, tail) => {
  const b = base + '.b.png';
  const exists = fs.existsSync(path.join(ROOT, 'assets', 'exercises', b));
  if (exists && !cur) { added.push(base); return `${head}, img2:'${b.replace(/'/g, "\\'")}'${tail}`; }
  if (!exists && cur) { removed.push(base); return `${head}${tail}`; }
  if (exists) kept++; else waiting++;
  return line;
});

console.log(`already attached: ${kept}   to attach: ${added.length}   to detach (file missing): ${removed.length}   still single-frame: ${waiting}`);
if (added.length) console.log('attach: ' + added.join(', '));
if (removed.length) console.log('detach: ' + removed.join(', '));
if (!added.length && !removed.length) { console.log('nothing to change'); process.exit(0); }
if (WRITE) {
  fs.copyFileSync(file, path.join(ROOT, `index.backup.${Date.now()}.html`));
  fs.writeFileSync(file, out);
  console.log('WRITTEN. Bump CACHE_VERSION in sw.js, compile-check, commit.');
} else {
  console.log('Dry run only. Add --write to apply.');
}
