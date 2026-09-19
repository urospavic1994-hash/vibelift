// One-off connector: add the optional `img` field to the 5 old core catalog lines that have none,
// and ONLY when the real PNG exists on disk.
// Same rule as attach_frames.js: a script is the only writer, a missing file changes nothing, and the
// app keeps its old drawn figure whenever `img` is absent. Idempotent: a line that already has img is skipped.
// Usage: node scripts/attach_frame1_oldcore.js [--write]
const fs = require('fs');

const NAMES = ['Plank', 'Crunches', 'Leg Raise', 'Russian Twist', 'Ab Wheel'];
const write = process.argv.includes('--write');

let src = fs.readFileSync('index.html', 'utf8');
let attached = 0, skipped = 0;

for (const name of NAMES) {
  const png = 'assets/exercises/' + name + '.png';
  if (!fs.existsSync(png)) { console.log('no picture on disk, skipped:', name); skipped++; continue; }

  const needle = "name:'" + name + "'";
  const at = src.indexOf(needle);
  if (at === -1) { console.log('catalog line not found:', name); skipped++; continue; }

  // The catalog entry is a single { ... } object. Find its braces around this name.
  const open = src.lastIndexOf('{', at);
  const close = src.indexOf('}', at);
  if (open === -1 || close === -1) { console.log('braces not found:', name); skipped++; continue; }

  const entry = src.slice(open, close + 1);
  if (entry.includes('img:')) { console.log('already has a picture:', name); skipped++; continue; }

  // Insert ", img:'<Name>.png'" right after the name field, before the closing brace.
  const insertAt = at + needle.length;
  src = src.slice(0, insertAt) + ", img:'" + name + ".png'" + src.slice(insertAt);
  attached++;
}

console.log('to attach:', attached, '| skipped:', skipped);
if (write && attached) { fs.writeFileSync('index.html', src); console.log('WRITTEN. Bump CACHE_VERSION in sw.js, compile-check, commit.'); }
else if (!write) console.log('(dry run, pass --write to apply)');
