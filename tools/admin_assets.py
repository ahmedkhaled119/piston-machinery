"""Admin portal assets that need more than a crop: text-free login photo and a transparent logo.

Usage: python admin_assets.py
"""
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter

ROOT = Path(__file__).resolve().parents[3]
SRC = ROOT / "docs/UI/Piston"
OUT = ROOT / "src/demo/assets/img/admin"


def inpaint(img, boxes, radii=(6, 16, 40, 90)):
    """Remove overlay text (incl. its drop shadow) by filling whole boxes with normalized convolution."""
    mask = Image.new("L", img.size, 0)
    for box in boxes:
        mask.paste(255, box)
    mp = mask.load()
    keep = ImageChops.invert(mask)
    bands = img.split()
    fills = []
    for r in radii:
        kb = list(keep.filter(ImageFilter.GaussianBlur(r)).get_flattened_data())
        ab = [list(ImageChops.multiply(band, keep).filter(ImageFilter.GaussianBlur(r)).get_flattened_data()) for band in bands]
        fills.append((kb, ab))
    out = img.copy()
    op, w = out.load(), img.width
    for y in range(img.height):
        for x in range(w):
            if not mp[x, y]:
                continue
            i = y * w + x
            for kb, ab in fills:
                if kb[i] > 40:
                    break
            k = max(kb[i], 1) / 255
            op[x, y] = tuple(min(255, round(a[i] / k)) for a in ab)
    return out


def unblend(img, floor=22):
    """Turn a light-on-dark crop into RGBA (alpha from brightness, colour un-premultiplied)."""
    rgba = Image.new("RGBA", img.size)
    src, dst = img.load(), rgba.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b = src[x, y]
            m = max(r, g, b)
            a = max(0.0, min(1.0, (m - floor) / (235 - floor)))
            if a <= 0:
                dst[x, y] = (0, 0, 0, 0)
            else:
                dst[x, y] = tuple(min(255, round(c / a)) for c in (r, g, b)) + (round(a * 255),)
    return rgba


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    login = Image.open(SRC / "2026-08-20 08.05.02.png").convert("RGB")
    photo = login.crop((0, 0, 760, 1024))
    clean = inpaint(photo, [(44, 36, 290, 120), (42, 524, 340, 568), (42, 570, 326, 616), (42, 617, 360, 666), (44, 676, 110, 692),
                            (42, 698, 478, 790), (42, 806, 664, 872), (42, 950, 336, 982)])
    clean.save(OUT / "auth-photo.jpg", quality=88)
    logo = unblend(login.crop((48, 40, 283, 98)))
    logo.resize((logo.width * 2, logo.height * 2), Image.LANCZOS).save(OUT / "logo.png", optimize=True)
    reset = Image.open(SRC / "2026-08-20 08.10.19.png").convert("RGB")
    inpaint(reset.crop((3, 3, 288, 560)), [(22, 34, 188, 104)]).save(OUT / "auth-photo-sm.jpg", quality=90)
    dash = Image.open(SRC / "2026-08-20 08.10.24.png").convert("RGB")
    side = unblend(dash.crop((16, 16, 150, 60)), floor=34)
    side.resize((side.width * 2, side.height * 2), Image.LANCZOS).save(OUT / "logo-side.png", optimize=True)
    print("ok", clean.size, logo.size, side.size)


if __name__ == "__main__":
    main()
