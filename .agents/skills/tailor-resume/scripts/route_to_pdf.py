"""local dev server의 회사별 route(/resume, /career, /portfolio)를 A4 PDF로 렌더한다.

사용법: uv run --project tools python .agents/skills/tailor-resume/scripts/route_to_pdf.py <slug> [<slug> ...] [--base http://127.0.0.1:4000]
출력: output/pdf/<slug>/{resume,career-description,portfolio}.pdf
승인된 문안에만 사용한다 (content-draft.md approved: true).
"""
import sys, json
from pathlib import Path
from playwright.sync_api import sync_playwright
args=[a for a in sys.argv[1:] if not a.startswith("--")]
BASE=next((a.split("=",1)[1] for a in sys.argv[1:] if a.startswith("--base=")),"http://127.0.0.1:4000")
if not args: raise SystemExit(__doc__)
jobs=[(slug,name,f"/{path}/{slug}") for slug in args for name,path in (("resume","resume"),("career-description","career"),("portfolio","portfolio"))]
out={}
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":1280,"height":900})
    for slug,name,route in jobs:
        pg=ctx.new_page(); pg.goto(BASE+route, wait_until="networkidle", timeout=90000)
        try: pg.wait_for_function("document.fonts.status === 'loaded'", timeout=8000)
        except Exception: pass
        pg.emulate_media(media="print")
        dest=Path(f"output/pdf/{slug}/{name}.pdf"); dest.parent.mkdir(parents=True, exist_ok=True)
        pg.pdf(path=str(dest), format="A4", print_background=True, prefer_css_page_size=True)
        txt=pg.inner_text("body")[:300].replace("\n"," ")
        out[f"{slug}/{name}"]={"bytes":dest.stat().st_size,"head":txt[:120]}
        pg.close()
    b.close()
print(json.dumps(out,ensure_ascii=False,indent=1))
