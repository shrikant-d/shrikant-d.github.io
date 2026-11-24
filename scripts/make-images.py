"""Crop the source photo into the hero, ID-card portrait and share images. Usage: python scripts/make-images.py photo.jpg"""
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB")
def crop(box, size, out, **kw):
    im.crop(box).resize(size, Image.LANCZOS).save(out, **kw)
crop((455, 1110, 975, 1760), (480, 600), "public/portrait-bust.webp", quality=88)   # head to shirt, 4:5
crop((150, 700, 1350, 2000), (900, 975), "public/hero-photo.webp", quality=86)       # full body with bridge, 12:13
crop((0, 900, 1500, 1845), (1200, 630), "public/og.jpg", quality=86)
