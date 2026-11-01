"""Click-through check: loads every page variant in headless Edge, clicks every visible link/button one by one
and reports dead clicks (no DOM change, navigation, scroll, focus or popup), JS errors and broken navigation targets.
Pages reached through clicks are crawled too.

Usage: python click_check.py [--w 1536] [--jobs 4] [page ...]
"""
import argparse
import html
import json
import os
import re
import subprocess
import sys
import tempfile
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import unquote, urlsplit

DEMO = Path(__file__).resolve().parents[1]
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
TMP = Path(tempfile.gettempdir()) / "piston-clickcheck"

HARNESS = r"""<!doctype html><body style="margin:0"><iframe id="f" style="border:0;width:__W__px;height:900px"></iframe><pre id="o"></pre><script>
const PAGE = __PAGE__, f = document.getElementById('f');
const R = {clicks: 0, dead: [], errors: [], navs: [], skipped: 0};
const sleep = ms => new Promise(r => setTimeout(r, ms));
let onLoad = null; f.onload = () => onLoad && onLoad();
const load = u => new Promise(r => { onLoad = r; f.src = u; });
const SEL = 'a[href], button, [onclick], [role=button], [role=tab], summary, [data-wa-quote], [data-tab]';
function label(el) {
  const c = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
  const t = (el.innerText || el.getAttribute('aria-label') || el.title || el.value || '').trim().replace(/\s+/g, ' ').slice(0, 40);
  const h = el.getAttribute('href');
  return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + c + ' "' + t + '"' + (h ? ' href=' + h : '');
}
function instrument() {
  const w = f.contentWindow;
  w.__nav = null; w.__open = 0; w.__fx = 0;
  w.addEventListener('error', e => R.errors.push(String(e.message)));
  w.addEventListener('unhandledrejection', e => R.errors.push('unhandled rejection: ' + (e.reason && e.reason.message || e.reason)));
  w.open = u => { w.__open++; R.navs.push(String(u)); return null; };
  // Effects a DOM observer cannot see: scrolling, fullscreen, file pickers, canvas redraws.
  const spy = (obj, names) => names.forEach(m => { const o = obj[m]; if (o) obj[m] = function (...a) { w.__fx++; return o.apply(this, a); }; });
  spy(w.Element.prototype, ['scrollIntoView', 'scrollBy', 'scrollTo', 'requestFullscreen']);
  spy(w, ['scrollBy', 'scrollTo']);
  spy(w.CanvasRenderingContext2D.prototype, ['drawImage', 'clearRect', 'fillRect']);
  const ic = w.HTMLInputElement.prototype.click;
  w.HTMLInputElement.prototype.click = function () { if (this.type === 'file') { w.__fx++; return; } return ic.call(this); };
  // Runs after page handlers: record link targets instead of leaving the page.
  w.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || a.getAttribute('href').startsWith('#')) return;
    e.preventDefault(); w.__nav = a.href;
  });
}
function list() {
  const d = f.contentDocument, w = f.contentWindow;
  return [...new Set(d.querySelectorAll(SEL))].filter(el => {
    const r = el.getBoundingClientRect(), cs = w.getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && !el.disabled && el.type !== 'file';
  });
}
async function fresh() { await load(PAGE); instrument(); await sleep(700); return list(); }
(async () => {
  let els = await fresh();
  const n = els.length;
  for (let i = 0; i < n; i++) {
    let el = els[i];
    if (!el || !el.isConnected) { els = await fresh(); el = els[i]; if (!el) { R.skipped++; continue; } }
    const w = f.contentWindow, d = f.contentDocument;
    const noisy = new Set(); let hits = 0, base = true;
    const mo = new w.MutationObserver(ms => ms.forEach(m => base ? noisy.add(m.target) : (!noisy.has(m.target) && hits++)));
    mo.observe(d.documentElement, {subtree: true, childList: true, attributes: true, characterData: true});
    await sleep(120); base = false;
    const vals = () => [...d.querySelectorAll('input, select, textarea')].map(x => x.value + x.checked).join('|');
    const s = {hash: w.location.hash, y: w.scrollY, focus: d.activeElement, open: w.__open, title: d.title, fx: w.__fx, vals: vals()};
    w.__nav = null; let navigated = false; onLoad = () => { navigated = true; };
    const lab = label(el);
    const form = el.closest('form');
    const invalid = form && (el.type === 'submit' || (el.tagName === 'BUTTON' && !el.type)) && !form.checkValidity();
    let submitted = false; if (form) form.addEventListener('submit', () => { submitted = true; }, {once: true});
    try { el.click(); } catch (e) { R.errors.push(lab + ': ' + e.message); }
    R.clicks++;
    await sleep(300);
    if (navigated) {
      let u = '(unreadable)'; try { u = f.contentWindow.location.href; } catch (e) {}
      R.navs.push(u); els = await fresh(); continue;
    }
    mo.disconnect();
    if (w.__nav) R.navs.push(w.__nav);
    const active = el.matches('.on, .active, [aria-selected=true], [aria-current]');
    const effect = active || hits || w.__nav || navigated || submitted || invalid || w.__open > s.open || w.location.hash !== s.hash
      || Math.abs(w.scrollY - s.y) > 2 || d.activeElement !== s.focus || d.title !== s.title || w.__fx > s.fx || vals() !== s.vals;
    if (!effect) R.dead.push(lab);
    d.dispatchEvent(new w.KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
  }
  R.total = n;
  document.getElementById('o').textContent = 'RESULT' + JSON.stringify(R) + 'END';
})();
</script>"""


def page_url(variant):
    path, _, rest = variant.partition("?")
    frag = ""
    if "#" in (rest or path):
        if rest:
            rest, _, frag = rest.partition("#")
        else:
            path, _, frag = path.partition("#")
    return (DEMO / path).as_uri() + ("?" + rest if rest else "") + ("#" + frag if frag else "")


def run(variant, width, slot):
    h = TMP / f"h{slot}.html"
    h.write_text(HARNESS.replace("__PAGE__", json.dumps(page_url(variant))).replace("__W__", str(width)), encoding="utf-8")
    out = subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--allow-file-access-from-files", f"--user-data-dir={TMP / f'prof{slot}'}",
                          f"--window-size={width + 40},1000", "--virtual-time-budget=400000", "--dump-dom", h.as_uri()],
                         capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=900)
    m = re.search(r"RESULT(.*?)END", html.unescape(out.stdout), re.S)
    return json.loads(m.group(1)) if m else None


def to_variant(url):
    """Local file URL -> demo-relative variant, else None."""
    if not url.startswith("file:"):
        return None
    p = urlsplit(url)
    target = Path(unquote(p.path).lstrip("/"))
    try:
        rel = target.resolve().relative_to(DEMO).as_posix()
    except ValueError:
        return "!" + str(target)
    if not target.exists():
        return "!" + rel
    return rel + ("?" + p.query if p.query else "") if rel.endswith(".html") else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--w", type=int, default=1536)
    ap.add_argument("--jobs", type=int, default=4)
    ap.add_argument("pages", nargs="*")
    a = ap.parse_args()
    TMP.mkdir(exist_ok=True)
    queue = a.pages or [p.relative_to(DEMO).as_posix() for p in sorted(DEMO.rglob("*.html")) if "tools" not in p.parts]
    seen, results, missing = set(queue), {}, defaultdict(set)
    crawl = not a.pages
    with ThreadPoolExecutor(a.jobs) as ex:
        while queue:
            batch, queue = queue, []
            for v, r in zip(batch, ex.map(run, batch, [a.w] * len(batch), [i % a.jobs for i in range(len(batch))])):
                results[v] = r
                if not r:
                    continue
                for u in r["navs"]:
                    t = to_variant(u)
                    if t and t.startswith("!"):
                        missing[t[1:]].add(v)
                    elif t and crawl and t not in seen and len(seen) < 400:
                        seen.add(t); queue.append(t)
    dead, errs = defaultdict(set), defaultdict(set)
    clicks = 0
    for v, r in results.items():
        if not r:
            errs["(harness produced no result)"].add(v); continue
        clicks += r["clicks"]
        for d in r["dead"]:
            dead[d].add(v)
        for e in r["errors"]:
            errs[e[:200]].add(v)
    print(f"Pages: {len(results)}  clicks: {clicks}  width: {a.w}")
    for title, data in (("DEAD CLICKS (no visible effect)", dead), ("JS ERRORS", errs), ("BROKEN NAVIGATION TARGETS", missing)):
        print(f"\n{title}: {len(data) or 'none'}")
        for k in sorted(data):
            pg = sorted(data[k])
            print(f"  {k}  <- {', '.join(pg[:4])}{f' (+{len(pg) - 4})' if len(pg) > 4 else ''}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
