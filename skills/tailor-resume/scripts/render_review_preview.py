#!/usr/bin/env python3
"""Render a local-only review screen from a tailored application package."""

from __future__ import annotations

import argparse
import html
import re
import shutil
import subprocess
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import yaml


SEOUL = ZoneInfo("Asia/Seoul")
FRONTMATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.DOTALL)
FIRST_HEADING = re.compile(r"^#\s+(.+)$", re.MULTILINE)
RESUME_SECTION = re.compile(r"^##\s+이력서 초안\s*$", re.MULTILINE)
NEXT_LEVEL_TWO = re.compile(r"^##\s+", re.MULTILINE)


def parse_document(path: Path) -> tuple[dict[str, object], str]:
    source = path.read_text(encoding="utf-8")
    match = FRONTMATTER.match(source)
    if not match:
        return {}, source

    metadata = yaml.safe_load(match.group(1)) or {}
    if not isinstance(metadata, dict):
        metadata = {}
    return metadata, source[match.end() :]


def render_markdown(markdown: str) -> str:
    if shutil.which("pandoc") is None:
        raise SystemExit("pandoc가 필요합니다. `brew install pandoc` 후 다시 실행하세요.")

    result = subprocess.run(
        ["pandoc", "--from=gfm-raw_html", "--to=html5", "--wrap=none"],
        input=markdown,
        text=True,
        capture_output=True,
        check=True,
    )
    return result.stdout.replace(
        "[확인 필요]", '<mark class="needs-check">[확인 필요]</mark>'
    )


def first_heading(markdown: str, fallback: str) -> str:
    match = FIRST_HEADING.search(markdown)
    return match.group(1).strip() if match else fallback


def split_resume_draft(markdown: str) -> tuple[str, str]:
    """Separate the resume canvas from review-only notes.

    The canonical Markdown keeps review context around the resume.  The preview
    must not let that chrome alter the document hierarchy, so only the content
    under ``## 이력서 초안`` is rendered on the resume canvas.  Heading levels
    are lifted by two to match the public ``/resume`` document hierarchy.
    """

    start = RESUME_SECTION.search(markdown)
    if not start:
        return markdown, ""

    end = NEXT_LEVEL_TWO.search(markdown, start.end())
    end_at = end.start() if end else len(markdown)
    resume_markdown = markdown[start.end() : end_at].strip()
    review_markdown = (markdown[: start.start()] + markdown[end_at:]).strip()

    first_heading_seen = False

    def lift_heading(match: re.Match[str]) -> str:
        nonlocal first_heading_seen
        hashes = match.group(1)
        if not first_heading_seen:
            first_heading_seen = True
            return "# "
        return hashes[1:] + " "

    resume_markdown = re.sub(r"^(#{3,6})\s+", lift_heading, resume_markdown, flags=re.MULTILINE)
    return resume_markdown, review_markdown


def main() -> None:
    parser = argparse.ArgumentParser(
        description="회사별 Markdown 지원 문안을 local review HTML로 렌더링합니다."
    )
    parser.add_argument("application_dir", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    application_dir = args.application_dir.resolve()
    output = (args.output or application_dir / "preview" / "index.html").resolve()
    template = (
        Path(__file__).resolve().parent.parent
        / "assets"
        / "review-preview-template.html"
    )

    documents = {
        "draft": application_dir / "content-draft.md",
        "research": application_dir / "company-research.md",
        "match": application_dir / "match-report.md",
    }
    missing = [str(path) for path in documents.values() if not path.exists()]
    if missing:
        raise SystemExit("필수 문서가 없습니다:\n- " + "\n- ".join(missing))
    if not template.exists():
        raise SystemExit(f"preview template이 없습니다: {template}")

    parsed = {key: parse_document(path) for key, path in documents.items()}
    draft_meta, draft_markdown = parsed["draft"]
    title = first_heading(draft_markdown, application_dir.name)
    approved = bool(draft_meta.get("approved", False))
    status_text = "문안 승인 완료" if approved else "내용 검토 중"
    status_tone = "approved" if approved else "review"
    latest_mtime = max(path.stat().st_mtime for path in documents.values())
    updated_at = datetime.fromtimestamp(latest_mtime, tz=SEOUL).strftime(
        "%Y.%m.%d %H:%M"
    )

    resume_markdown, review_markdown = split_resume_draft(draft_markdown)
    rendered = {
        "draft": render_markdown(resume_markdown),
        "review": render_markdown(review_markdown),
        "research": render_markdown(parsed["research"][1]),
        "match": render_markdown(parsed["match"][1]),
    }
    page = template.read_text(encoding="utf-8")
    replacements = {
        "[[PAGE_TITLE]]": html.escape(title),
        "[[STATUS_TEXT]]": html.escape(status_text),
        "[[STATUS_TONE]]": status_tone,
        "[[UPDATED_AT]]": html.escape(updated_at),
        "[[APPLICATION_DIR]]": html.escape(application_dir.name),
        "[[DRAFT_HTML]]": rendered["draft"],
        "[[REVIEW_HTML]]": rendered["review"],
        "[[RESEARCH_HTML]]": rendered["research"],
        "[[MATCH_HTML]]": rendered["match"],
    }
    for placeholder, value in replacements.items():
        page = page.replace(placeholder, value)

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(page, encoding="utf-8")
    print(output)

if __name__ == "__main__":
    main()
