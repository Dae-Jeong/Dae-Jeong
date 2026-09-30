#!/usr/bin/env python3
"""Resume page → A4 PDF via the print composition of the single resume renderer.

The document page itself composes its A4 pages off screen (`[data-paged-done]`) and prints them; there is no
separate view mode (2026-09-29).
Usage: uv run --project tools python tools/export_resume_pdf.py <resume-url> <output.pdf>
Reads the running dev server; does not restart it, does not publish anything.
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    url, out = sys.argv[1], Path(sys.argv[2]).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1000, "height": 1400})
        page.goto(url, wait_until="networkidle")
        page.wait_for_selector("[data-paged-done]", state="attached", timeout=30_000)
        count = page.get_attribute("[data-paged-done]", "data-paged-done")
        overflow = page.evaluate("document.querySelectorAll('[data-paged-root] > article').length")
        page.emulate_media(media="print")
        page.pdf(path=str(out), format="A4", print_background=True, prefer_css_page_size=True,
                 margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
        browser.close()
    print(f"pages={count} articles={overflow} out={out}")


if __name__ == "__main__":
    main()
