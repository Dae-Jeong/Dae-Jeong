#!/usr/bin/env python3
"""Validate portable knowledge-harness metadata, paths, links, and claims."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import Any

import yaml


CONCEPT_DIRS = ("context", "profile", "evidence", "products", "rules")
SCAN_DIRS = CONCEPT_DIRS + ("skills", "scripts")
TEXT_SUFFIXES = {".md", ".yaml", ".yml", ".json", ".py", ".html"}
FORBIDDEN_PATH_PATTERNS = (
    "/Users/marin",
    "~/workspace",
    "~/agentspace",
    "Desktop/Wiki",
    "Desktop/wiki",
)
REQUIRED_CLAIM_FIELDS = {
    "id",
    "statement",
    "strength",
    "confidence",
    "public",
    "evidence",
    "allowed_copy",
    "forbidden_copy",
    "verified_at",
}
ALLOWED_STRENGTHS = {"owned", "led", "co-led", "contributed"}
ALLOWED_CONFIDENCE = {"high", "medium", "low", "unknown"}
MARKDOWN_LINK = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
HEADING = re.compile(r"^#{1,6}\s+(.+?)\s*$", re.MULTILINE)


def _frontmatter(text: str) -> dict[str, Any] | None:
    if not text.startswith("---\n"):
        return None
    end = text.find("\n---\n", 4)
    if end == -1:
        return None
    value = yaml.safe_load(text[4:end])
    return value if isinstance(value, dict) else None


def _slug(value: str) -> str:
    value = re.sub(r"[`*_]", "", value.strip().lower())
    value = re.sub(r"[^\w\s-]", "", value, flags=re.UNICODE)
    return re.sub(r"[\s-]+", "-", value).strip("-")


def _iter_files(root: Path, directories: tuple[str, ...]):
    for directory in directories:
        base = root / directory
        if not base.exists():
            continue
        for path in sorted(base.rglob("*")):
            if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
                yield path


def _validate_metadata(root: Path) -> list[str]:
    errors: list[str] = []
    for path in _iter_files(root, CONCEPT_DIRS):
        if path.suffix != ".md":
            continue
        text = path.read_text(encoding="utf-8")
        meta = _frontmatter(text)
        rel = path.relative_to(root)
        if meta is None:
            errors.append(f"metadata: {rel} has no parseable frontmatter")
        elif not meta.get("type"):
            errors.append(f"metadata: {rel} has no non-empty type")
    return errors


def _validate_paths(root: Path) -> list[str]:
    errors: list[str] = []
    for path in _iter_files(root, SCAN_DIRS):
        if path.resolve() == Path(__file__).resolve():
            continue
        text = path.read_text(encoding="utf-8")
        for pattern in FORBIDDEN_PATH_PATTERNS:
            if pattern in text:
                errors.append(f"absolute path: {path.relative_to(root)} contains {pattern}")
    return errors


def _validate_links(root: Path) -> list[str]:
    errors: list[str] = []
    for path in _iter_files(root, CONCEPT_DIRS):
        if path.suffix != ".md":
            continue
        text = path.read_text(encoding="utf-8")
        for raw in MARKDOWN_LINK.findall(text):
            target = raw.split("#", 1)[0].strip()
            if not target or target.startswith(("http://", "https://", "mailto:")):
                continue
            resolved = (path.parent / target).resolve()
            if not resolved.exists():
                errors.append(f"link: {path.relative_to(root)} -> {raw} does not exist")
    return errors


def _anchor_exists(path: Path, anchor: str) -> bool:
    headings = {_slug(value) for value in HEADING.findall(path.read_text(encoding="utf-8"))}
    return anchor in headings


def _load_claims(root: Path) -> tuple[list[dict[str, Any]], list[str]]:
    claims: list[dict[str, Any]] = []
    errors: list[str] = []
    base = root / "evidence" / "claims"
    if not base.exists():
        return claims, errors
    for path in sorted(base.glob("*.yaml")):
        try:
            data = yaml.safe_load(path.read_text(encoding="utf-8"))
        except yaml.YAMLError as exc:
            errors.append(f"claim yaml: {path.relative_to(root)} cannot parse: {exc}")
            continue
        if not isinstance(data, dict) or data.get("schema_version") != 1:
            errors.append(f"claim schema: {path.relative_to(root)} must use schema_version 1")
            continue
        values = data.get("claims")
        if not isinstance(values, list):
            errors.append(f"claim schema: {path.relative_to(root)} claims must be a list")
            continue
        for claim in values:
            if not isinstance(claim, dict):
                errors.append(f"claim schema: {path.relative_to(root)} contains non-object claim")
                continue
            claim = dict(claim)
            claim["__file"] = path
            claims.append(claim)
    return claims, errors


def _validate_claims(root: Path) -> list[str]:
    claims, errors = _load_claims(root)
    seen: dict[str, Path] = {}
    for claim in claims:
        source = claim.pop("__file")
        missing = sorted(REQUIRED_CLAIM_FIELDS - claim.keys())
        claim_id = str(claim.get("id", "<missing>"))
        if missing:
            errors.append(f"claim schema: {source.relative_to(root)} {claim_id} missing {missing}")
        if claim_id in seen:
            errors.append(
                f"duplicate claim: {claim_id} in {source.relative_to(root)} and {seen[claim_id].relative_to(root)}"
            )
        else:
            seen[claim_id] = source
        if claim.get("strength") not in ALLOWED_STRENGTHS:
            errors.append(f"claim strength: {claim_id} has invalid value {claim.get('strength')}")
        if claim.get("confidence") not in ALLOWED_CONFIDENCE:
            errors.append(f"claim confidence: {claim_id} has invalid value {claim.get('confidence')}")
        if not isinstance(claim.get("public"), bool):
            errors.append(f"claim public: {claim_id} must be boolean")
        for ref in claim.get("evidence", []):
            target, _, anchor = str(ref).partition("#")
            target_path = root / target
            if not target_path.exists():
                errors.append(f"claim evidence: {claim_id} -> {ref} does not exist")
            elif anchor and not _anchor_exists(target_path, anchor):
                errors.append(f"claim evidence: {claim_id} -> {ref} anchor does not exist")
    return errors


def _validate_claim_map(root: Path) -> list[str]:
    path = root / "products" / "resume" / "claim-map.yaml"
    if not path.exists():
        return []
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    claims, _ = _load_claims(root)
    known = {claim.get("id") for claim in claims}
    errors: list[str] = []
    for section, ids in (data.get("sections") or {}).items():
        if not isinstance(ids, list):
            errors.append(f"claim map: section {section} must be a list")
            continue
        for claim_id in ids:
            if claim_id not in known:
                errors.append(f"claim map: section {section} references unknown claim {claim_id}")
    return errors


def _validate_product_claim_refs(root: Path) -> list[str]:
    claims, _ = _load_claims(root)
    known = {claim.get("id") for claim in claims}
    errors: list[str] = []
    base = root / "products"
    if not base.exists():
        return errors
    for path in sorted(base.rglob("*.md")):
        meta = _frontmatter(path.read_text(encoding="utf-8")) or {}
        claim_ids = meta.get("claim_ids", [])
        if not isinstance(claim_ids, list):
            errors.append(f"product claim: {path.relative_to(root)} claim_ids must be a list")
            continue
        for claim_id in claim_ids:
            if claim_id not in known:
                errors.append(
                    f"product claim: {path.relative_to(root)} references unknown claim {claim_id}"
                )
    return errors


def validate(root: Path) -> list[str]:
    """Return stable validation failures; an empty list means pass."""
    root = root.resolve()
    return (
        _validate_metadata(root)
        + _validate_paths(root)
        + _validate_claims(root)
        + _validate_links(root)
        + _validate_claim_map(root)
        + _validate_product_claim_refs(root)
    )


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    errors = validate(root)
    if errors:
        for error in errors:
            print(error)
        print(f"workspace validation: FAIL ({len(errors)} errors)")
        return 1
    print("workspace validation: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
