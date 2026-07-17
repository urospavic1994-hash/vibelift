from PIL import Image

img = Image.open(r'C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\Main page hero image.png')
img.thumbnail((1200, 9999))
img.convert('RGB').save(r'C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\Main page hero image.jpg', 'JPEG', quality=80)
print('Done:', img.size)
