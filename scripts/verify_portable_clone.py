#!/usr/bin/env python3
"""Verify that a clean clone can restore and validate the active workspace."""

from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCAL_ONLY_PREFIXES = (
    ".agents/",
    ".local/",
    ".playwright-mcp/",
    ".tmp/",
    ".venv/",
    "products/jd/corpus/",
    "products/resume/tailored/",
    "tmp/",
)
LOCAL_ONLY_PATHS = {"skills-lock.json"}


def tracked_path_errors(entries: list[tuple[str, str]]) -> list[str]:
    """Return portability violations for `(git mode, path)` entries."""
    errors: list[str] = []
    for mode, path in entries:
        if mode == "120000":
            errors.append(f"tracked symlink: {path}")
        if path in LOCAL_ONLY_PATHS or path.startswith(LOCAL_ONLY_PREFIXES):
            errors.append(f"tracked local-only path: {path}")
        if "__pycache__" in Path(path).parts or path.endswith((".pyc", ".pyo")):
            errors.append(f"tracked runtime artifact: {path}")
    return errors


def run(*args: str, capture: bool = False) -> subprocess.CompletedProcess[str]:
    print("+", " ".join(args), flush=True)
    return subprocess.run(
        args,
        cwd=ROOT,
        check=True,
        text=True,
        capture_output=capture,
    )


def tracked_entries() -> list[tuple[str, str]]:
    result = run("git", "ls-files", "-s", "-z", capture=True)
    entries: list[tuple[str, str]] = []
    for record in result.stdout.split("\0"):
        if not record:
            continue
        metadata, path = record.split("\t", 1)
        mode = metadata.split(" ", 1)[0]
        entries.append((mode, path))
    return entries


def ensure_clean_tracked_worktree() -> None:
    result = run(
        "git",
        "status",
        "--porcelain",
        "--untracked-files=no",
        capture=True,
    )
    if result.stdout.strip():
        raise SystemExit("portable clone verification requires a clean tracked worktree")


def verify_pdf(path: Path) -> None:
    content = path.read_bytes()
    if not content.startswith(b"%PDF-") or len(content) < 10_000:
        raise SystemExit(f"PDF smoke render is invalid: {path}")


def main() -> int:
    ensure_clean_tracked_worktree()

    errors = tracked_path_errors(tracked_entries())
    if errors:
        raise SystemExit("\n".join(errors))

    run("uv", "sync", "--locked")
    run("uv", "run", "python", "scripts/validate_workspace.py")
    run("uv", "run", "playwright", "install", "chromium")

    with tempfile.TemporaryDirectory(prefix="daejeong-portable-") as tmp:
        output = Path(tmp) / "resume-v1.pdf"
        run(
            "uv",
            "run",
            "python",
            "skills/tailor-resume/scripts/html_to_pdf.py",
            "products/resume/master/v1/resume.html",
            str(output),
        )
        verify_pdf(output)

    run("git", "diff", "--exit-code")
    print("portable clone verification: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
