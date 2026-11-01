"""Stack the panel region of a mockup (top) and the rendered page (bottom) into a small image.

Usage: python panel_cmp.py <page> <mockup.png> <out.png> [l t r b]
"""
import os
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

page, mockup, out = sys.argv[1:4]
box = tuple(int(v) for v in sys.argv[4:8]) if len(sys.argv) >= 8 else (30, 360, 1120, 800)
mock = Image.open(ROOT / "docs/UI/Piston" / mockup).convert("RGB")
width = 1536 if mock.width >= 1500 else 1440
shot = Path(os.environ["TEMP"]) / "piston-render.png"
subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--window-size={width},{round(mock.height * width / mock.width)}",
                "--virtual-time-budget=4000", f"--screenshot={shot}", (ROOT / "src/demo").as_uri() + "/" + page], capture_output=True, check=False)
render = Image.open(shot).convert("RGB").resize(mock.size, Image.LANCZOS)
a, b = mock.crop(box), render.crop(box)
sheet = Image.new("RGB", (a.width, a.height * 2 + 8), "red")
sheet.paste(a, (0, 0)); sheet.paste(b, (0, a.height + 8))
sheet.resize((900, round(sheet.height * 900 / sheet.width)), Image.LANCZOS).save(out)
print(out)
