#!/usr/bin/env python3
"""이력서 HTML을 A4 PDF로 변환한다 (@page CSS 존중, 웹폰트 로드 대기).

사용법: python3 .agents/skills/application-write-docs/scripts/html_to_pdf.py <input.html> [output.pdf]
출력 생략 시 입력과 같은 위치에 .pdf 로 생성.
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright


def main():
    if len(sys.argv) < 2:
        raise SystemExit("사용법: html_to_pdf.py <input.html> [output.pdf]")
    src = Path(sys.argv[1]).resolve()
    if not src.exists():
        raise SystemExit(f"입력 파일 없음: {src}")
    out = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else src.with_suffix(".pdf")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(src.as_uri(), wait_until="domcontentloaded")
        try:
            page.wait_for_function("document.fonts.status === 'loaded'", timeout=5_000)
        except Exception:  # Font fallback is allowed by the portability contract.
            pass
        page.pdf(path=str(out), prefer_css_page_size=True, print_background=True)
        browser.close()

    print(f"생성: {out}")


if __name__ == "__main__":
    main()
