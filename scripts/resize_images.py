"""
VibeLift Image Resizer
Run: python resize_images.py
Requires Pillow: pip install Pillow
"""

from PIL import Image
import os

# ── folder where your images live (same folder as this script) ──────────────
BASE = os.path.dirname(os.path.abspath(__file__))
OUT  = os.path.join(BASE, "resized")
os.makedirs(OUT, exist_ok=True)

def resize(src_name, dest_name, width, height, fmt, quality=None):
    src = os.path.join(BASE, src_name)
    dst = os.path.join(OUT,  dest_name)

    if not os.path.exists(src):
        print(f"  ⚠  Not found, skipping: {src_name}")
        return

    img = Image.open(src).convert("RGB")

    if width and height:
        img = img.resize((width, height), Image.LANCZOS)
    elif width:
        # scale height proportionally
        ratio = width / img.width
        img = img.resize((width, int(img.height * ratio)), Image.LANCZOS)

    save_kwargs = {"format": fmt}
    if quality:
        save_kwargs["quality"] = quality
    if fmt == "PNG":
        save_kwargs["optimize"] = True
    if fmt == "JPEG":
        save_kwargs["optimize"] = True

    img.save(dst, **save_kwargs)
    size_kb = os.path.getsize(dst) / 1024
    print(f"  ✓  {dest_name}  ({size_kb:.0f} KB)")


print("\n=== VibeLift Image Resizer ===\n")

# ── Logo ────────────────────────────────────────────────────────────────────
print("Logo:")
resize("Logo resized.png", "Logo resized.png", width=400, height=None, fmt="PNG")

# ── Hero background ─────────────────────────────────────────────────────────
print("\nHero background:")
resize("Main page hero image.png", "Main page hero image.jpg",
       width=900, height=1800, fmt="JPEG", quality=80)

# ── Muscle group cards ──────────────────────────────────────────────────────
print("\nMuscle group cards:")
for name in ["Chest.png", "Back.png", "Sholder.png", "Legs.png", "Arms.png", "Core.png"]:
    stem = os.path.splitext(name)[0]
    resize(name, f"{stem}.jpg", width=800, height=300, fmt="JPEG", quality=80)

# ── welcome.jpg — skip ──────────────────────────────────────────────────────
print("\nwelcome.jpg → skipped (already fine at 118 KB)")

print("\n=== Done! Resized files are in the 'resized' subfolder ===\n")
