"""Crop real images/icons out of the UI mockup screenshots into demo assets.

Usage: python crop_assets.py <spec.json>
Spec: {"source": "<png>", "out": "<dir>", "items": [{"name": "x.png", "box": [l, t, r, b], "trim": true, "scale": 2}]}
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[3]


def trim(img, pad=2, tol=28):
    bg = Image.new(img.mode, img.size, img.getpixel((0, 0)))
    diff = ImageChops.difference(img, bg).convert("L").point(lambda v: 255 if v > tol else 0)
    box = diff.getbbox()
    if not box:
        return img
    l, t, r, b = box
    return img.crop((max(l - pad, 0), max(t - pad, 0), min(r + pad, img.width), min(b + pad, img.height)))


def main(spec_path):
    spec = json.loads(Path(spec_path).read_text(encoding="utf-8"))
    src = Image.open(ROOT / spec["source"]).convert("RGB")
    out = ROOT / spec["out"]
    out.mkdir(parents=True, exist_ok=True)
    for item in spec["items"]:
        img = src.crop(tuple(item["box"]))
        if item.get("trim"):
            img = trim(img)
        if item.get("scale", 1) != 1:
            img = img.resize((img.width * item["scale"], img.height * item["scale"]), Image.LANCZOS)
        img.save(out / item["name"], optimize=True)
        print(f'{item["name"]}: {img.size}')


if __name__ == "__main__":
    main(sys.argv[1])
