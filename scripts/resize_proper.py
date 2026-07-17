from PIL import Image
import os

BASE = r'C:\Users\UrosPcSoba\Desktop\Claude\VibeLift'

images = [
    ("Chest.png",   "Chest.jpg",   800),
    ("Back.png",    "Back.jpg",    800),
    ("Sholder.png", "Sholder.jpg", 800),
    ("Legs.png",    "Legs.jpg",    800),
    ("Arms.png",    "Arms.jpg",    800),
    ("Core.png",    "Core.jpg",    800),
]

for src_name, dst_name, max_width in images:
    src = os.path.join(BASE, src_name)
    dst = os.path.join(BASE, dst_name)
    img = Image.open(src).convert("RGB")
    ratio = max_width / img.width
    new_size = (max_width, int(img.height * ratio))
    img = img.resize(new_size, Image.LANCZOS)
    img.save(dst, "JPEG", quality=80, optimize=True)
    kb = os.path.getsize(dst) / 1024
    print(f"  Done: {dst_name}  {new_size}  ({kb:.0f} KB)")

print("\nAll done!")
