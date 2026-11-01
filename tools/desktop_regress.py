"""Re-shoot the 1536px desktop baselines saved by the responsive agents and diff them.
Usage: python desktop_regress.py   -> prints per-page % of changed pixels + bbox."""
import os, subprocess, re
from pathlib import Path
from PIL import Image, ImageChops

T = Path(os.environ["TEMP"])
DEMO = Path(__file__).resolve().parent.parent
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUT = T / "piston-regress"
OUT.mkdir(exist_ok=True)

SUP = {"support": "support.html", "tech": "technical-support.html", "parts": "spare-parts.html", "faq": "faq.html",
       "eng": "talk-to-engineer.html", "engc": "talk-to-engineer.html?type=custom", "login": "admin/login.html",
       "forgot": "admin/forgot.html", "reset": "admin/reset.html?demo=1", "done": "admin/reset.html?done=1",
       "dash": "admin/dashboard.html?demo=1"}
CNT = {"hub": "hub.html", "cases": "case-studies.html", "projects": "projects.html", "news": "news.html",
       "article": "news-article.html", "videos": "videos.html", "story": "submit-story.html"}


def url_for(d, name):
    if d == "cat":
        n = name[len("before-1536-"):-4]
        m = re.match(r"(.+?)_html(?:_(step|id|part)_(\w+)|_(exploded))?$", n)
        u = m.group(1) + ".html"
        if m.group(2):
            u += f"?{m.group(2)}={m.group(3)}"
        if m.group(4):
            u += "#exploded"
        return u
    if d == "sup":
        return SUP[name[len("before-1536-"):-4]]
    k = name[len("before-"):-4]
    if d == "ind":
        return f"industry.html?slug={k[9:]}" if k.startswith("industry-") else k + ".html"
    if k.startswith("cs-"):
        return f"case-study.html?id=cairo-cabinets#{k[3:]}"
    if k.startswith("ev-"):
        return f"event.html#{k[3:]}"
    return CNT[k]


jobs = []
for d in ["cat", "ind", "cnt", "sup"]:
    for f in sorted((T / f"piston-resp-{d}").glob("before-*.png")):
        jobs.append((d, f, url_for(d, f.name)))

for d, base, u in jobs:
    w, h = Image.open(base).size
    p, _, rest = u.partition("?")
    q = ""
    if "#" in p:
        p, frag = p.split("#"); q = "#" + frag
    elif rest:
        q = "?" + rest
    url = (DEMO / p).as_uri() + q
    out = OUT / f"{d}-{base.name}"
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                    f"--user-data-dir={OUT / 'prof'}", f"--window-size={w},{h}", "--virtual-time-budget=5000",
                    f"--screenshot={out}", url], capture_output=True, timeout=120)
    a = Image.open(base).convert("RGB")
    b = Image.open(out).convert("RGB")
    if a.size != b.size:
        print(f"SIZE {d} {u} {a.size} vs {b.size}")
        continue
    diff = ImageChops.difference(a, b).convert("L").point(lambda v: 255 if v > 24 else 0)
    bbox = diff.getbbox()
    pct = 100 * sum(diff.histogram()[255:]) / (w * h)
    print(f"{'same' if not bbox else 'DIFF'} {pct:6.3f}% {d} {u} {bbox or ''}")
print("DONE")
