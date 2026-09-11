#!/usr/bin/env python3
"""Connect an existing local LLM Wiki without moving or replacing user files."""

from __future__ import annotations

import argparse
from pathlib import Path


LAYER_SENTINELS = {
    "context": "index.md",
    "products": "resume/README.md",
    "rules": "document-routing.md",
    "backlog": "README.md",
    "docs": "superpowers/specs/2026-07-11-resume-knowledge-harness-design.md",
    "archive": "README.md",
    "profile": "identity.md",
    "evidence": "claims/README.md",
}
REQUIRED_INPUTS = (
    "context/manifest.yaml",
    "products/site/copy-surfaces.yaml",
    "products/resume/application-registry.yaml",
    "products/resume/common-package.yaml",
    "products/resume/claim-map.yaml",
    "rules/copy-gates.yaml",
)


def knowledge_errors(wiki: Path) -> list[str]:
    """Check every physical layer before consumers can silently skip missing inputs."""
    errors = []
    for layer, sentinel in LAYER_SENTINELS.items():
        directory = wiki / layer
        if directory.is_symlink():
            errors.append(f"knowledge layer must be a real directory: {directory}")
        if not directory.is_dir():
            errors.append(f"knowledge root missing: {directory}")
        if not (directory / sentinel).is_file():
            errors.append(f"knowledge root missing: {directory / sentinel} (layer {layer} sentinel)")
    for relative in REQUIRED_INPUTS:
        if not (wiki / relative).is_file():
            errors.append(f"knowledge root missing: {wiki / relative} (required validation input)")
    return errors


def connect(repo: Path, vault: Path) -> list[Path]:
    repo, vault = repo.resolve(), vault.resolve()
    link = repo / "wiki"
    target = vault / "Wiki" / "sources" / "Dae-Jeong" / "wiki"
    if link.is_symlink():
        try:
            same_target = link.resolve(strict=True) == target.resolve(strict=True)
        except (OSError, RuntimeError):
            same_target = False
        if not same_target:
            raise ValueError(f"refusing to retarget existing link: {link}")
    elif link.exists():
        raise ValueError(f"refusing to replace existing path: {link}")
    if target.is_symlink():
        raise ValueError(f"canonical wiki must be a real directory: {target}")
    errors = knowledge_errors(target)
    if errors:
        raise ValueError("; ".join(errors) + "; restore the canonical vault first")
    if not link.is_symlink():
        link.symlink_to(target, target_is_directory=True)
    return [link]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--vault", required=True, type=Path, help="Existing Obsidian vault directory")
    args = parser.parse_args()
    try:
        links = connect(Path(__file__).resolve().parents[1], args.vault)
    except (ValueError, OSError, RuntimeError) as exc:
        parser.exit(1, f"knowledge bootstrap: FAIL: {exc}\n")
    print(f"knowledge bootstrap: PASS ({len(links)} local links; canonical files unchanged)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
