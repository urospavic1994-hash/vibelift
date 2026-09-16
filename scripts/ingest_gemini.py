"""Move the newest Gemini download into the app as a 320x320 PNG icon.

Usage:  python scripts/ingest_gemini.py "Side Plank"
Takes the newest Gemini_Generated_Image_*.jfif/png/jpg in Downloads, resizes to 320x320
on a white background, saves assets/exercises/<Name>.png and archives the original in
New lustrations/_gemini_v2/<Name>.<ext>. Run with --clean before generating to delete stale downloads; ingest deletes any other leftover Gemini files.
"""
import sys, os, glob, shutil
from PIL import Image

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DL = os.path.join(os.path.expanduser('~'), 'Downloads')
OUT = os.path.join(BASE, 'assets', 'exercises')
ARCH = os.path.join(BASE, 'New lustrations', '_gemini_v2')
os.makedirs(ARCH, exist_ok=True)

if len(sys.argv) < 2:
    sys.exit('ERROR: give the exercise name, e.g. python scripts/ingest_gemini.py "Side Plank"')
name = sys.argv[1].strip().removesuffix('.png')

if name == '--clean':
    n = 0
    for ext in ('jfif', 'png', 'jpg', 'jpeg', 'webp'):
        for p in glob.glob(os.path.join(DL, f'Gemini_Generated_Image_*.{ext}')):
            os.remove(p); n += 1
    print(f'CLEAN removed {n} stale Gemini download(s)')
    sys.exit(0)

cands = [p for ext in ('jfif', 'png', 'jpg', 'jpeg', 'webp')
         for p in glob.glob(os.path.join(DL, f'Gemini_Generated_Image_*.{ext}'))]
if not cands:
    sys.exit('ERROR: no Gemini_Generated_Image_* file in Downloads. Click "Download full size image" in Gemini first.')
src = max(cands, key=os.path.getmtime)
age = __import__('time').time() - os.path.getmtime(src)
if age > 240:
    sys.exit(f'ERROR: newest Gemini file is {int(age)}s old ({os.path.basename(src)}). Download the new image first.')

img = Image.open(src).convert('RGBA')
w, h = img.size
side = max(w, h)
canvas = Image.new('RGBA', (side, side), (255, 255, 255, 255))
canvas.paste(img, ((side - w) // 2, (side - h) // 2), img)
canvas = canvas.convert('RGB').resize((320, 320), Image.LANCZOS)
dst = os.path.join(OUT, name + '.png')
canvas.save(dst, 'PNG', optimize=True)

ext = os.path.splitext(src)[1]
shutil.move(src, os.path.join(ARCH, name + ext))
for other in cands:
    if other != src and os.path.exists(other):
        os.remove(other)
print(f'OK  {name}.png  {os.path.getsize(dst)//1024} KB  (source {w}x{h}, archived)')
