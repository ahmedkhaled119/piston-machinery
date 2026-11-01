"""Crawl the static demo with headless Edge (rendered DOM) and report broken local links/assets.

Usage: python link_check.py
"""
import os
import re
import subprocess
import tempfile
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

DEMO = Path(__file__).resolve().parents[1]
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PROFILE = Path(tempfile.gettempdir()) / "piston-linkcheck-profile"


class Refs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs, self.ids = [], set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.add(a["id"])
        for k in ("href", "src", "data-img"):
            v = a.get(k)
            if v and not (tag == "link" and k == "href" and "fonts.g" in v):
                self.refs.append((tag, k, v))
        style = a.get("style") or ""
        for u in re.findall(r"url\(['\"]?([^'\")]+)", style):
            self.refs.append((tag, "style", u))


def render(url):
    out = subprocess.run([EDGE, "--headless=new", "--disable-gpu", f"--user-data-dir={PROFILE}", "--virtual-time-budget=4000",
                          "--window-size=1536,1024", "--enable-logging=stderr", "--v=0", "--dump-dom", url], capture_output=True, text=True, encoding="utf-8", errors="replace")
    errors = [ln.split("CONSOLE", 1)[-1].strip() for ln in out.stderr.splitlines() if "CONSOLE" in ln and ("Uncaught" in ln or "Error" in ln)]
    return out.stdout, errors


def main():
    queue = [p.relative_to(DEMO).as_posix() for p in sorted(DEMO.rglob("*.html"))]
    seen, broken, missing_hash, pages_ok = set(), defaultdict(set), defaultdict(set), 0
    js_errors = defaultdict(set)
    extra = []
    while queue:
        page = queue.pop(0)
        if page in seen:
            continue
        seen.add(page)
        path, _, rest = page.partition("?")
        file = DEMO / path
        if not file.exists():
            continue
        dom, errs = render(file.as_uri() + ("?" + rest if rest else ""))
        if errs:
            js_errors[page].update(errs)
        if not dom.strip():
            broken[page].add("(page did not render)")
            continue
        pages_ok += 1
        p = Refs()
        p.feed(dom)
        base = file.parent
        for tag, attr, ref in p.refs:
            if ref.startswith(("http://", "https://", "mailto:", "tel:", "data:", "javascript:", "blob:")):
                if ref.startswith(("http://", "https://")) and "wa.me" not in ref and "fonts.g" not in ref:
                    extra.append((page, ref))
                continue
            if ref == "#" or ref.startswith("#"):
                frag = ref[1:]
                if frag and frag not in p.ids and tag == "a":
                    missing_hash[page].add(ref)
                continue
            parts = urlsplit(ref)
            target = (base / unquote(parts.path)).resolve()
            if not target.exists():
                broken[page].add(f"{tag}[{attr}] -> {ref}")
            elif target.suffix == ".html" and tag == "a":
                rel = target.relative_to(DEMO).as_posix()
                q = ("?" + parts.query) if parts.query else ""
                if rel + q not in seen and rel + q not in queue and len(seen) + len(queue) < 400:
                    queue.append(rel + q)
    print(f"Rendered {pages_ok} page variants ({len(seen)} visited).")
    print("\nBROKEN LOCAL REFERENCES:" if broken else "\nNo broken local references.")
    for pg in sorted(broken):
        for r in sorted(broken[pg]):
            print(f"  {pg}: {r}")
    print("\nIN-PAGE #ANCHORS WITH NO TARGET (may be JS tabs):" if missing_hash else "\nAll #anchors have targets.")
    for pg in sorted(missing_hash):
        print(f"  {pg}: {', '.join(sorted(missing_hash[pg]))}")
    print("\nJAVASCRIPT ERRORS:" if js_errors else "\nNo JavaScript errors.")
    for pg in sorted(js_errors):
        for e in sorted(js_errors[pg]):
            print(f"  {pg}: {e[:220]}")
    print("\nVISITED:\n  " + "\n  ".join(sorted(seen)))
    ext = sorted(set(r for _, r in extra))
    print(f"\nEXTERNAL URLS ({len(ext)}):")
    for r in ext:
        print("  " + r)


if __name__ == "__main__":
    main()
