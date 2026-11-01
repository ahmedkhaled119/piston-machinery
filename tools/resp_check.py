"""Responsive overflow check for demo pages.

Usage: python resp_check.py [--w 375,768,1024,1366,1536] [--id NAME] page1.html page2.html?x=1 ...
Prints one line per page/width: "ok" or "FAIL <width> <page> +<px> :: <widest elements>".
Use a unique --id per parallel caller so Edge profiles don't clash.
"""
import argparse
import re
import subprocess
import tempfile
from html import unescape
from pathlib import Path
from urllib.parse import quote

DEMO = Path(__file__).resolve().parents[1]
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

ap = argparse.ArgumentParser()
ap.add_argument("--w", default="375,768,1024,1366,1536")
ap.add_argument("--id", default="main")
ap.add_argument("pages", nargs="+")
a = ap.parse_args()
budget = 1500 * len(a.pages) * len(a.w.split(",")) + 3000
url = (DEMO / "tools" / "rcheck.html").as_uri() + f"?w={a.w}&pages=" + quote(",".join(a.pages), safe=",?=&./")
profile = Path(tempfile.gettempdir()) / f"piston-rcheck-{a.id}"
out = subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--allow-file-access-from-files", f"--user-data-dir={profile}",
                      f"--virtual-time-budget={budget}", "--window-size=1600,1000", "--dump-dom", url],
                     capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=900)
m = re.search(r'<pre id="out">(.*?)</pre>', out.stdout, re.S)
print(unescape(m.group(1)) if m and m.group(1).strip() else "NO RESULT (increase budget?)\n" + out.stdout[:500])
