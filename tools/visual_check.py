"""/design living specimen 시각 회귀 검사.

specimen 라우트에 전 컴포넌트가 렌더되므로 스크린샷 diff 로 전체 회귀를 커버한다.
개발 서버(localhost:3000)가 떠 있어야 한다.

사용법:
  uv run --project tools python tools/visual_check.py --update   # baseline 갱신
  uv run --project tools python tools/visual_check.py            # 현재 vs baseline
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

BASELINE_DIR = Path(__file__).parent / ".visual-baseline"  # 로컬 전용 (gitignore)
VIEWPORTS = [("desktop", 1440), ("mobile", 720)]
PIXEL_TOLERANCE = 16  # 채널 차이 허용치 (안티앨리어싱 노이즈)
DEFAULT_THRESHOLD = 0.001  # 상이 픽셀 비율 상한 (0.1%)


def capture(url: str, out_dir: Path, suffix: str = "") -> list[Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    shots: list[Path] = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for name, width in VIEWPORTS:
            page = browser.new_page(viewport={"width": width, "height": 1000})
            page.emulate_media(reduced_motion="reduce")  # 모션 비활성 — 결정적 렌더
            page.goto(url)
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(1200)  # 토큰 실값 등 클라이언트 마운트 대기
            path = out_dir / f"design-{name}{suffix}.png"
            page.screenshot(path=str(path), full_page=True)
            page.close()
            shots.append(path)
        browser.close()
    return shots


def diff_ratio(a: Image.Image, b: Image.Image) -> float:
    delta = ImageChops.difference(a.convert("RGB"), b.convert("RGB")).convert("L")
    histogram = delta.histogram()
    changed = sum(histogram[PIXEL_TOLERANCE + 1 :])
    return changed / (a.width * a.height)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", default="http://localhost:3000/design")
    parser.add_argument("--update", action="store_true", help="baseline 갱신")
    parser.add_argument("--threshold", type=float, default=DEFAULT_THRESHOLD)
    args = parser.parse_args()

    if args.update:
        shots = capture(args.url, BASELINE_DIR)
        for s in shots:
            print(f"baseline 갱신: {s}")
        return 0

    failures = 0
    for name, _ in VIEWPORTS:
        baseline_path = BASELINE_DIR / f"design-{name}.png"
        if not baseline_path.exists():
            print(f"baseline 없음: {baseline_path} — --update 로 먼저 생성")
            return 2

    current = capture(args.url, BASELINE_DIR, suffix="-current")
    for (name, _), current_path in zip(VIEWPORTS, current):
        baseline = Image.open(BASELINE_DIR / f"design-{name}.png")
        now = Image.open(current_path)
        if baseline.size != now.size:
            print(f"FAIL [{name}] 크기 변경 {baseline.size} → {now.size}")
            failures += 1
            continue
        ratio = diff_ratio(baseline, now)
        if ratio > args.threshold:
            diff_img = ImageChops.difference(
                baseline.convert("RGB"), now.convert("RGB")
            )
            diff_path = BASELINE_DIR / f"design-{name}-diff.png"
            diff_img.save(diff_path)
            print(f"FAIL [{name}] 상이 픽셀 {ratio:.4%} > {args.threshold:.2%} — {diff_path}")
            failures += 1
        else:
            print(f"PASS [{name}] 상이 픽셀 {ratio:.4%}")
            current_path.unlink()  # 통과 시 현재 캡처 정리

    print("visual check:", "FAIL" if failures else "PASS")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
