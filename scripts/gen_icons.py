"""Generate exercise icons straight from the Gemini API (no browser).

Usage:
  python scripts/gen_icons.py fixes  "Side Plank" "Dead Bug"     # named items from image-prompts-v2-fixes.md
  python scripts/gen_icons.py fixes  --all                        # every item in the fixes file (1-24 + optional 25-27)
  python scripts/gen_icons.py new    --group chest [--limit 10]   # from image-prompts-v3-new-exercises.md, skips PNGs that exist
  python scripts/gen_icons.py new    "Svend Press"
Options: --force (overwrite existing PNG), --model gemini-3.1-flash-image

Key: GEMINI_API_KEY in .env.local (repo root, git-ignored) or the environment.
Output: assets/exercises/<Name>.png (320x320, white bg) + full-size original in New lustrations/_gemini_api/<Name>.png
Log: scripts/gen_icons.log (one line per attempt).
"""
import sys, os, re, io, json, time, base64, urllib.request, urllib.error
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'exercises')
ARCH = os.path.join(ROOT, 'New lustrations', '_gemini_api')
LOG = os.path.join(ROOT, 'scripts', 'gen_icons.log')
os.makedirs(ARCH, exist_ok=True)

BASE = ("Flat vector isometric illustration, pure white background, no floor, no ground shadow, no platform, no mat unless "
        "the exercise line says so. ONE faceless muscular man with short brown hair, red tank top, black shorts, dark grey "
        "socks, grey sneakers. EXACTLY ONE piece of gym equipment in the whole picture, the one named in the exercise line. "
        "No extra barbells, no extra dumbbells, no loose plates, no racks, nothing else on the floor. Equipment frame is white "
        "and light grey with blue accents; the plates or dumbbell heads he is holding are blue with a grey steel bar. Clean "
        "minimal style, soft flat shading, no outlines, no text, 3/4 isometric camera, subject centered with white space "
        "around. Consistent fitness-app icon set.")


def load_key():
    k = os.environ.get('GEMINI_API_KEY')
    if k:
        return k
    p = os.path.join(ROOT, '.env.local')
    if os.path.exists(p):
        for line in open(p, encoding='utf-8'):
            if line.startswith('GEMINI_API_KEY='):
                return line.split('=', 1)[1].strip()
    sys.exit('ERROR: GEMINI_API_KEY not found (put it in .env.local as GEMINI_API_KEY=...)')


def parse_prompts(path):
    """Return list of dicts {name, prompt, group} from a prompt markdown file."""
    items, group = [], ''
    for line in open(path, encoding='utf-8'):
        h = re.match(r'^## (CHEST|BACK|SHOULDERS|LEGS|ARMS|CORE)', line)
        if h:
            group = h.group(1).lower()
        m = re.match(r'^\d+\. `([^`]+)`(?: \[\w+\])? — (.+)$', line.rstrip('\n'))
        if m:
            items.append({'name': m.group(1).removesuffix('.png'), 'prompt': m.group(2).strip(), 'group': group})
    return items


def generate(key, model, name, line):
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}'
    body = {
        'contents': [{'parts': [{'text': f'{BASE} Exercise: {name}. {line}'}]}],
        'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': '1:1'}},
    }
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'})
    for attempt in range(1, 5):
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                data = json.load(r)
            for part in data.get('candidates', [{}])[0].get('content', {}).get('parts', []):
                if 'inlineData' in part:
                    return base64.b64decode(part['inlineData']['data']), None
            fr = data.get('candidates', [{}])[0].get('finishReason', '?')
            txt = ' '.join(p.get('text', '') for p in data.get('candidates', [{}])[0].get('content', {}).get('parts', []))[:160]
            return None, f'no image (finishReason={fr}) {txt}'
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors='replace')[:300]
            if e.code in (429, 500, 503) and attempt < 4:
                wait = 20 * attempt
                print(f'   {e.code} on attempt {attempt}, waiting {wait}s', flush=True)
                time.sleep(wait)
                continue
            return None, f'HTTP {e.code}: {msg}'
        except Exception as e:  # network hiccup
            if attempt < 4:
                time.sleep(10)
                continue
            return None, f'error: {e}'
    return None, 'gave up after retries'


def save(name, raw):
    img = Image.open(io.BytesIO(raw)).convert('RGBA')
    w, h = img.size
    side = max(w, h)
    canvas = Image.new('RGBA', (side, side), (255, 255, 255, 255))
    canvas.paste(img, ((side - w) // 2, (side - h) // 2), img)
    canvas.convert('RGB').save(os.path.join(ARCH, name + '.png'), 'PNG')
    small = canvas.convert('RGB').resize((320, 320), Image.LANCZOS)
    dst = os.path.join(OUT, name + '.png')
    small.save(dst, 'PNG', optimize=True)
    return f'{os.path.getsize(dst)//1024}KB from {w}x{h}'


def main():
    args = sys.argv[1:]
    if not args or args[0] not in ('fixes', 'new'):
        sys.exit(__doc__)
    mode = args.pop(0)
    force = '--force' in args
    model = 'gemini-3.1-flash-image'
    group = None
    limit = None
    names = []
    i = 0
    while i < len(args):
        a = args[i]
        if a == '--force':
            pass
        elif a == '--all':
            names = ['*']
        elif a == '--model':
            i += 1; model = args[i]
        elif a == '--group':
            i += 1; group = args[i].lower()
        elif a == '--limit':
            i += 1; limit = int(args[i])
        else:
            names.append(a.removesuffix('.png'))
        i += 1

    path = os.path.join(ROOT, 'scripts', 'image-prompts-v2-fixes.md' if mode == 'fixes' else 'image-prompts-v3-new-exercises.md')
    items = parse_prompts(path)
    if group:
        items = [x for x in items if x['group'] == group]
    if names and names != ['*']:
        wanted = set(n.lower() for n in names)
        items = [x for x in items if x['name'].lower() in wanted]
        missing = wanted - set(x['name'].lower() for x in items)
        if missing:
            sys.exit('ERROR: not in prompt file: ' + ', '.join(sorted(missing)))
    if mode == 'new' and not force:
        items = [x for x in items if not os.path.exists(os.path.join(OUT, x['name'] + '.png'))]
    if mode == 'fixes' and not names:
        sys.exit('ERROR: for fixes give names or --all')
    if limit:
        items = items[:limit]
    if not items:
        print('nothing to do'); return

    key = load_key()
    print(f'{len(items)} icon(s) with {model}', flush=True)
    ok = fail = 0
    for n, it in enumerate(items, 1):
        t0 = time.time()
        raw, err = generate(key, model, it['name'], it['prompt'])
        if raw:
            info = save(it['name'], raw)
            line = f"OK   {it['name']}  {info}  {time.time()-t0:.0f}s"
            ok += 1
        else:
            line = f"FAIL {it['name']}  {err}"
            fail += 1
        print(f'[{n}/{len(items)}] {line}', flush=True)
        with open(LOG, 'a', encoding='utf-8') as f:
            f.write(time.strftime('%Y-%m-%d %H:%M ') + line + '\n')
        if n < len(items):
            time.sleep(2)
    print(f'done: {ok} ok, {fail} failed')


if __name__ == '__main__':
    main()
