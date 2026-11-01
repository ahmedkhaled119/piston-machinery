"""Furniture hero: crop the mockup photo incl. its faded left edge and erase the baked "Tailored" stat text.

Usage: python src/demo/tools/industry-furniture-hero.py   (run after crop_assets.py industry-furniture.json)
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
src = Image.open(ROOT / "docs/UI/Piston/2026-08-20 07.58.14.png").convert("RGB")
l, t, r, b = 375, 49, 1024, 265
img = src.crop((l, t, r, b))
px = img.load()
# Stat text occupies x 385-447, y 216-252 (mockup px); the photo behind it is faded, so blend rows vertically.
y0, y1 = 214 - t, 254 - t
for x in range(385 - l, 448 - l):
    top, bot = px[x, y0], px[x, y1]
    for y in range(y0 + 1, y1):
        k = (y - y0) / (y1 - y0)
        px[x, y] = tuple(round(top[c] * (1 - k) + bot[c] * k) for c in range(3))
img.save(ROOT / "src/demo/assets/img/industry/furniture/hero.png", optimize=True)
print(img.size)
