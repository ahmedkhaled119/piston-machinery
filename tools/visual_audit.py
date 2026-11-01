"""Visual DoD audit: render each mockup's demo page at the mockup's scale, score similarity, save side-by-side sheets.

Usage: python visual_audit.py [filter]   -> sheets in %TEMP%/piston-audit, scores printed worst-first.
"""
import os
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageOps, ImageStat

ROOT = Path(__file__).resolve().parents[3]
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUT = Path(os.environ["TEMP"]) / "piston-audit"

CS = "case-study.html?id=cairo-cabinets#"
MAP = {
    "05.15.17": "index.html", "05.21.01": "products.html", "05.27.35": "product.html?id=r32",
    "05.36.38": "machine-finder.html", "05.59.15": "viewer.html", "06.04.46": "viewer.html?part=1", "06.04.48": "viewer.html#exploded",
    "06.22.10": "support.html", "06.22.10_1": "support.html", "06.25.05": "spare-parts.html",
    "06.27.33": "industries.html", "06.30.19": "industry.html?slug=cabinet", "06.31.33": "industry.html?slug=door",
    "06.32.57": "industry.html?slug=interior", "06.34.19": "industry.html?slug=workshops", "06.35.36": "industry.html?slug=industrial",
    "06.37.47": "about.html", "06.39.59": "contact.html", "06.41.54": "search.html?q=Edge+Banding+Machine",
    "06.44.21": "hub.html", "06.48.01": "case-studies.html", "06.50.22": "projects.html", "06.51.53": "news.html", "06.53.33": "videos.html",
    "06.55.13": CS + "overview", "06.58.47": CS + "challenge", "07.00.29": CS + "solution", "07.03.05": CS + "installation",
    "07.05.00": CS + "results", "07.06.21": CS + "feedback", "07.07.48": CS + "gallery", "07.09.12": CS + "documents",
    "07.12.15": "news-article.html", "07.14.01": "event.html#overview", "07.15.21": "event.html#expect", "07.22.00": "event.html#solutions",
    "07.25.41": "event.html#details", "07.27.03": "event.html#location", "07.28.53": "event.html#contact",
    "07.48.42": "talk-to-engineer.html", "07.56.36": "industries.html", "07.58.14": "industry.html?slug=furniture",
    "08.05.02": "admin/login.html", "08.05.48": "admin/forgot.html", "08.10.19": "admin/reset.html?demo=1", "08.10.24": "admin/dashboard.html?demo=1",
}


def url(page):
    path, sep, rest = page.partition("?")
    frag = ""
    if "#" in path:
        path, _, frag = path.partition("#")
    elif "#" in rest:
        rest, _, frag = rest.partition("#")
    return (ROOT / "src/demo" / path).as_uri() + (f"?{rest}" if rest else "") + (f"#{frag}" if frag else "")


def audit(item):
    i, (key, page) = item
    mock = Image.open(ROOT / f"docs/UI/Piston/2026-08-20 {key}.png").convert("RGB")
    width = 1536 if mock.width >= 1500 else 1440
    height = round(mock.height * width / mock.width)
    shot = OUT / f"r-{key}.png"
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                    f"--user-data-dir={OUT / f'prof{i % 4}'}", f"--window-size={width},{height}", "--virtual-time-budget=5000",
                    f"--screenshot={shot}", url(page)], capture_output=True, timeout=180)
    render = Image.open(shot).convert("RGB").resize(mock.size, Image.LANCZOS)
    # Score on blurred low-res grayscale so anti-aliasing and font hinting don't dominate.
    small = lambda im: ImageOps.grayscale(im).resize((240, max(1, round(240 * im.height / im.width))), Image.BOX)
    diff = ImageChops.difference(small(mock), small(render))
    score = 100 - ImageStat.Stat(diff).mean[0] / 2.55
    w = 700
    h = round(mock.height * w / mock.width)
    sheet = Image.new("RGB", (w * 2 + 10, h + 22), "white")
    sheet.paste(mock.resize((w, h), Image.LANCZOS), (0, 22))
    sheet.paste(render.resize((w, h), Image.LANCZOS), (w + 10, 22))
    ImageDraw.Draw(sheet).text((6, 5), f"MOCKUP {key}   |   DEMO {page}   |   similarity {score:.1f}", fill="red")
    sheet.save(OUT / f"s-{key}.png")
    return score, key, page, mock.size


def main():
    OUT.mkdir(exist_ok=True)
    flt = sys.argv[1] if len(sys.argv) > 1 else ""
    items = [kv for kv in MAP.items() if flt in kv[0] or flt in kv[1]]
    with ThreadPoolExecutor(4) as ex:
        res = list(ex.map(audit, enumerate(items)))
    for score, key, page, size in sorted(res):
        print(f"{score:5.1f}  {key:<11} {page:<40} {size[0]}x{size[1]}")
    print("DONE", len(res))


if __name__ == "__main__":
    main()
