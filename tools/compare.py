"""Render a demo page with headless Edge and save it side by side with its mockup.

Usage: python compare.py <page.html[?query]> <mockup.png> <out.png>
"""
import os
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[3]
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"


def main(page, mockup, out):
    mock = Image.open(ROOT / "docs/UI/Piston" / mockup).convert("RGB")
    # Render at a width that maps the mockup's width onto a desktop viewport.
    width = 1536 if mock.width >= 1500 else 1440
    height = round(mock.height * width / mock.width)
    shot = Path(os.environ["TEMP"]) / "piston-render.png"
    url = (ROOT / "src/demo").as_uri() + "/" + page
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--window-size={width},{height}",
                    "--virtual-time-budget=4000", f"--screenshot={shot}", url], capture_output=True, check=False)
    render = Image.open(shot).convert("RGB").resize(mock.size, Image.LANCZOS)
    sheet = Image.new("RGB", (mock.width * 2 + 12, mock.height + 28), "white")
    sheet.paste(mock, (0, 28))
    sheet.paste(render, (mock.width + 12, 28))
    d = ImageDraw.Draw(sheet)
    d.text((8, 8), f"MOCKUP {mockup}", fill="red")
    d.text((mock.width + 20, 8), f"RENDER {page}", fill="red")
    sheet.save(out)
    print(out, sheet.size)


if __name__ == "__main__":
    main(*sys.argv[1:4])
