"""Save a Gemini image pulled from the page (data URL) as assets/exercises/<Name>.png.

Usage:  python scripts/save_b64.py "Cable Glute Kickback" path/to/dataurl.txt
The text file holds one data URL (data:image/jpeg;base64,....) as returned by the page script.
Writes a 320x320 PNG with a white background. Prints OK + size, or ERROR + reason.
"""
import sys, os, base64, io
from PIL import Image

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, 'assets', 'exercises')

if len(sys.argv) < 3:
    sys.exit('ERROR: usage: save_b64.py "<Name>" <dataurl.txt>')
name = sys.argv[1].strip().removesuffix('.png')
txt = open(sys.argv[2], encoding='utf-8').read().strip().strip('"')
if not txt.startswith('data:image'):
    sys.exit('ERROR: file does not contain a data:image URL')
raw = base64.b64decode(txt.split(',', 1)[1])
img = Image.open(io.BytesIO(raw)).convert('RGB')
if img.size != (320, 320):
    img = img.resize((320, 320), Image.LANCZOS)
dst = os.path.join(OUT, name + '.png')
img.save(dst, 'PNG', optimize=True)
print(f'OK  {name}.png  {os.path.getsize(dst)//1024} KB  (from {len(raw)//1024} KB jpeg)')
