#!/usr/bin/env python3
"""Validate portable knowledge-harness metadata, paths, links, and claims."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import Any

import yaml

from build_application_projection import (
    PROJECTION_RELATIVE_PATH,
    expected_projection,
    load_registry,
)


WIKI = "wiki"
CONCEPT_DIRS = tuple(
    f"{WIKI}/{name}" for name in ("context", "profile", "evidence", "products", "rules", "backlog")
)
SCAN_DIRS = CONCEPT_DIRS + ("skills", "tools")
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
COMMON_DOCUMENT_ARTIFACTS = {"resume", "career-description", "portfolio", "cv"}
COMMON_CONTENT_USE = {"include", "primary", "supporting", "summary", "context", "exclude"}
MARKDOWN_LINK = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
HEADING = re.compile(r"^#{1,6}\s+(.+?)\s*$", re.MULTILINE)
DATA_CLAIM = re.compile(r'(?:data-claim=|"data-claim":\s*)"([^"]+)"')
CLAIM_IDS_BLOCK = re.compile(r"claimIds:\s*\[(.*?)\]", re.DOTALL)
TAILORED_CLAIM_IDS_BLOCK = re.compile(
    r"(?:claimIds|currentClaimIds):\s*\[(.*?)\]", re.DOTALL
)
STRING_LITERAL = re.compile(r'"([a-z0-9][a-z0-9.-]+)"')


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
    base = root / WIKI / "evidence" / "claims"
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
            # Claim evidence paths are wiki-relative (e.g. evidence/projects/x.md).
            target, _, anchor = str(ref).partition("#")
            target_path = root / WIKI / target
            if not target_path.exists():
                errors.append(f"claim evidence: {claim_id} -> {ref} does not exist")
            elif anchor and not _anchor_exists(target_path, anchor):
                errors.append(f"claim evidence: {claim_id} -> {ref} anchor does not exist")
    return errors


def _validate_claim_map(root: Path) -> list[str]:
    path = root / WIKI / "products" / "resume" / "claim-map.yaml"
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


def _validate_common_content_inventory(root: Path) -> list[str]:
    path = root / WIKI / "products" / "resume" / "common-content-inventory.yaml"
    if not path.exists():
        return []
    try:
        data = yaml.safe_load(path.read_text(encoding="utf-8"))
    except yaml.YAMLError as exc:
        return [f"common content inventory: {path.relative_to(root)} cannot parse: {exc}"]
    if not isinstance(data, dict) or data.get("schema_version") != 1:
        return [f"common content inventory: {path.relative_to(root)} must use schema_version 1"]

    blocks = data.get("blocks")
    if not isinstance(blocks, list):
        return [f"common content inventory: {path.relative_to(root)} blocks must be a list"]

    claims, _ = _load_claims(root)
    public_claims = {
        str(claim.get("id")) for claim in claims if claim.get("public") is True
    }
    errors: list[str] = []
    seen: set[str] = set()
    for index, block in enumerate(blocks):
        label = f"common content inventory: blocks[{index}]"
        if not isinstance(block, dict):
            errors.append(f"{label} must be an object")
            continue
        block_id = block.get("id")
        if not isinstance(block_id, str) or not block_id.strip():
            errors.append(f"{label}.id must be a non-empty string")
        elif block_id in seen:
            errors.append(f"{label}.id duplicates {block_id}")
        else:
            seen.add(block_id)

        for field in ("project", "focus"):
            if not isinstance(block.get(field), str) or not block[field].strip():
                errors.append(f"{label}.{field} must be a non-empty string")

        claim_ids = block.get("claim_ids")
        if not isinstance(claim_ids, list) or not claim_ids:
            errors.append(f"{label}.claim_ids must be a non-empty list")
        else:
            for claim_id in claim_ids:
                if claim_id not in public_claims:
                    errors.append(f"{label} references unknown or non-public claim {claim_id}")

        use = block.get("use")
        if not isinstance(use, dict):
            errors.append(f"{label}.use must be an object")
            continue
        if set(use) != COMMON_DOCUMENT_ARTIFACTS:
            errors.append(
                f"{label}.use must contain exactly {sorted(COMMON_DOCUMENT_ARTIFACTS)}"
            )
        for artifact, mode in use.items():
            if mode not in COMMON_CONTENT_USE:
                errors.append(
                    f"{label}.use.{artifact} must be one of {sorted(COMMON_CONTENT_USE)}"
                )
    return errors


def _validate_product_claim_refs(root: Path) -> list[str]:
    claims, _ = _load_claims(root)
    known = {claim.get("id") for claim in claims}
    errors: list[str] = []
    base = root / WIKI / "products"
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


def _validate_resume_artifact_claims(root: Path) -> list[str]:
    claim_map = root / WIKI / "products" / "resume" / "claim-map.yaml"
    if not claim_map.exists():
        return []

    mapped_data = yaml.safe_load(claim_map.read_text(encoding="utf-8")) or {}
    artifact_ref = mapped_data.get("artifact")
    if not isinstance(artifact_ref, str) or not artifact_ref.strip():
        return ["resume artifact: claim map has no artifact path"]
    artifact = root / artifact_ref
    if not artifact.exists():
        return [f"resume artifact: {artifact_ref} does not exist"]

    claims, _ = _load_claims(root)
    known = {str(claim.get("id")) for claim in claims}
    public = {str(claim.get("id")) for claim in claims if claim.get("public") is True}
    mapped = {
        str(claim_id)
        for ids in (mapped_data.get("sections") or {}).values()
        if isinstance(ids, list)
        for claim_id in ids
    }
    used = {
        claim_id
        for value in DATA_CLAIM.findall(artifact.read_text(encoding="utf-8"))
        for claim_id in value.split()
    }

    errors: list[str] = []
    for claim_id in sorted(used - known):
        errors.append(f"resume artifact: unknown data-claim {claim_id}")
    for claim_id in sorted(used - public):
        errors.append(f"resume artifact: data-claim {claim_id} is not public")
    for claim_id in sorted(used - mapped):
        errors.append(f"resume artifact: data-claim {claim_id} missing from claim map")
    for claim_id in sorted(mapped - used):
        errors.append(f"resume artifact: mapped claim {claim_id} is unused")
    return errors


def _validate_tailored_resume_claims(root: Path) -> list[str]:
    base = root / "app" / "fe" / "content" / "resumes"
    if not base.exists():
        return []

    claims, _ = _load_claims(root)
    known = {str(claim.get("id")) for claim in claims}
    public = {str(claim.get("id")) for claim in claims if claim.get("public") is True}
    errors: list[str] = []

    for artifact in sorted(base.glob("*.ts")):
        text = artifact.read_text(encoding="utf-8")
        used = {
            claim_id
            for block in TAILORED_CLAIM_IDS_BLOCK.findall(text)
            for claim_id in STRING_LITERAL.findall(block)
        }
        for claim_id in sorted(used - known):
            errors.append(
                f"tailored resume: {artifact.relative_to(root)} has unknown claimIds value {claim_id}"
            )
        for claim_id in sorted(used - public):
            errors.append(
                f"tailored resume: {artifact.relative_to(root)} claimIds value {claim_id} is not public"
            )
    return errors


def _validate_professional_document_claims(root: Path) -> list[str]:
    base = root / "app" / "fe" / "content" / "documents"
    if not base.exists():
        return []

    claims, _ = _load_claims(root)
    known = {str(claim.get("id")) for claim in claims}
    public = {str(claim.get("id")) for claim in claims if claim.get("public") is True}
    errors: list[str] = []

    for artifact in sorted(base.glob("*.ts")):
        text = artifact.read_text(encoding="utf-8")
        used = {
            claim_id
            for block in TAILORED_CLAIM_IDS_BLOCK.findall(text)
            for claim_id in STRING_LITERAL.findall(block)
        }
        for claim_id in sorted(used - known):
            errors.append(
                f"professional document: {artifact.relative_to(root)} has unknown claimIds value {claim_id}"
            )
        for claim_id in sorted(used - public):
            errors.append(
                f"professional document: {artifact.relative_to(root)} claimIds value {claim_id} is not public"
            )
    return errors


def _validate_portfolio_artifact_claims(root: Path) -> list[str]:
    artifacts = (
        root / "app" / "fe" / "lib" / "cases.ts",
        root / "app" / "fe" / "app" / "portfolio" / "[case]" / "case-details.tsx",
        root / "app" / "fe" / "app" / "portfolio" / "[case]" / "system-details.tsx",
    )
    claims, _ = _load_claims(root)
    known = {str(claim.get("id")) for claim in claims}
    public = {str(claim.get("id")) for claim in claims if claim.get("public") is True}
    errors: list[str] = []
    case_claims: set[str] = set()
    case_dir = root / WIKI / "products" / "portfolio" / "cases"
    for path in sorted(case_dir.glob("*.md")):
        meta = _frontmatter(path.read_text(encoding="utf-8")) or {}
        case_claims.update(str(claim_id) for claim_id in meta.get("claim_ids", []))

    for artifact in artifacts:
        if not artifact.exists():
            errors.append(f"portfolio artifact: {artifact.relative_to(root)} does not exist")
            continue
        text = artifact.read_text(encoding="utf-8")
        used = {
            claim_id
            for block in CLAIM_IDS_BLOCK.findall(text)
            for claim_id in STRING_LITERAL.findall(block)
        }
        if not used:
            errors.append(f"portfolio artifact: {artifact.relative_to(root)} has no claimIds values")
        for claim_id in sorted(used - known):
            errors.append(
                f"portfolio artifact: {artifact.relative_to(root)} has unknown claimIds value {claim_id}"
            )
        for claim_id in sorted(used - public):
            errors.append(
                f"portfolio artifact: {artifact.relative_to(root)} claimIds value {claim_id} is not public"
            )

        if artifact.name == "cases.ts":
            catalog_text = text.split("export type Achievement", 1)[0]
            catalog_claims = {
                claim_id
                for block in CLAIM_IDS_BLOCK.findall(catalog_text)
                for claim_id in STRING_LITERAL.findall(block)
            }
            for claim_id in sorted(case_claims - catalog_claims):
                errors.append(f"portfolio artifact: cases.ts is missing case-library claim {claim_id}")
            for claim_id in sorted(catalog_claims - case_claims):
                errors.append(f"portfolio artifact: cases.ts has claim absent from case library {claim_id}")
    return errors


def _validate_application_registry(root: Path) -> list[str]:
    """Validate the tracked registry without requiring ignored local artifacts."""
    registry = root / "wiki" / "products" / "resume" / "application-registry.yaml"
    if not registry.exists():
        return []
    _, errors = load_registry(registry, root)
    return errors


def _validate_application_projection_drift(root: Path) -> list[str]:
    """Check a generated projection only when it is present in this workspace."""
    output = root / PROJECTION_RELATIVE_PATH
    if not output.exists():
        return []
    expected, errors = expected_projection(root)
    if errors:
        return errors
    assert expected is not None
    try:
        actual = output.read_text(encoding="utf-8")
    except OSError as exc:
        return [f"application projection: {output.relative_to(root)} cannot read: {exc}"]
    if actual != expected:
        return [f"application projection: {output.relative_to(root)} is out of date"]
    return []


COPY_GATES_PATH = "wiki/rules/copy-gates.yaml"
COPY_SURFACES_PATH = "wiki/products/site/copy-surfaces.yaml"
REGISTRY_PATH = "wiki/products/resume/application-registry.yaml"


def _load_yaml_file(root: Path, rel: str) -> dict[str, Any]:
    path = root / rel
    if not path.exists():
        return {}
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    return data if isinstance(data, dict) else {}


def _registry_attempts(root: Path) -> list[dict[str, Any]]:
    data = _load_yaml_file(root, REGISTRY_PATH)
    return [a for a in (data.get("attempts") or []) if isinstance(a, dict)]


def _surface_files(root: Path, surfaces_cfg: dict[str, Any], attempt: dict[str, Any]) -> dict[str, Path]:
    """Map surface id -> file for one registry attempt, via its artifact routes."""
    found: dict[str, Path] = {}
    surfaces = [s for s in (surfaces_cfg.get("surfaces") or []) if s.get("per_company")]
    for artifact in (attempt.get("artifacts") or {}).values():
        route = artifact.get("route") if isinstance(artifact, dict) else None
        if not isinstance(route, str):
            continue
        for surface in surfaces:
            template = str(surface.get("route", ""))
            prefix = template.split("{company}")[0]
            if not route.startswith(prefix) or "{company}" not in template:
                continue
            company = route[len(prefix):].strip("/")
            if not company or "/" in company:
                continue
            path = root / str(surface["path"]).format(company=company)
            if path.exists():
                found[str(surface["id"])] = path
    return found


def _common_surface_files(root: Path, surfaces_cfg: dict[str, Any]) -> list[Path]:
    paths = [root / str(s["path"]) for s in (surfaces_cfg.get("surfaces") or []) if not s.get("per_company")]
    return [p for p in paths if p.exists()]


def _is_active(attempt: dict[str, Any], surfaces_cfg: dict[str, Any]) -> bool:
    active = surfaces_cfg.get("active") or {}
    statuses = set(active.get("statuses") or [])
    excluded = set(active.get("exclude_artifact_states") or [])
    return attempt.get("status") in statuses and attempt.get("artifact_state") not in excluded


def _active_attempts(root: Path, surfaces_cfg: dict[str, Any]) -> list[dict[str, Any]]:
    return [a for a in _registry_attempts(root) if _is_active(a, surfaces_cfg)]


def _bracket_block(source: str, key: str) -> str:
    """Return the text of `key: [ ... ]` (first occurrence), or '' if absent."""
    match = re.search(rf"\b{re.escape(key)}:\s*\[", source)
    if not match:
        return ""
    depth, i = 0, match.end() - 1
    for j in range(i, len(source)):
        if source[j] == "[":
            depth += 1
        elif source[j] == "]":
            depth -= 1
            if depth == 0:
                return source[i : j + 1]
    return source[i:]


def _brace_block(source: str, start: int) -> str:
    depth = 0
    for j in range(start, len(source)):
        if source[j] == "{":
            depth += 1
        elif source[j] == "}":
            depth -= 1
            if depth == 0:
                return source[start : j + 1]
    return source[start:]


def _sentence_count(text: str) -> int:
    count = len(re.findall(r"[.!?。](?=\s|$)", text.strip()))
    return count or (1 if text.strip() else 0)


def _validate_public_copy_terms(root: Path) -> list[str]:
    """Gate 12 (application-copy-standard §4): banned public terms on active + common surfaces."""
    gates = _load_yaml_file(root, COPY_GATES_PATH)
    surfaces_cfg = _load_yaml_file(root, COPY_SURFACES_PATH)
    if not gates or not surfaces_cfg:
        return []
    banned = []
    for item in gates.get("banned_terms") or []:
        try:
            banned.append((str(item["label"]), re.compile(str(item["pattern"]))))
        except (KeyError, re.error) as exc:
            return [f"copy gates: banned_terms entry {item!r} invalid: {exc}"]
    skip = re.compile(str(gates.get("skip_line_pattern") or "$^"))

    files: list[Path] = list(_common_surface_files(root, surfaces_cfg))
    for attempt in _active_attempts(root, surfaces_cfg):
        files.extend(_surface_files(root, surfaces_cfg, attempt).values())
    seen: set[Path] = set()
    errors: list[str] = []
    for path in files:
        if path in seen:
            continue
        seen.add(path)
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
            if skip.search(line):
                continue
            for label, pattern in banned:
                if pattern.search(line):
                    errors.append(f"public copy: {path.relative_to(root)}:{number} contains banned term '{label}'")
    return errors


def _validate_outcome_axes(root: Path) -> list[str]:
    """Gate 11: resume outcome titles carry >= N distinct axis words."""
    gates = _load_yaml_file(root, COPY_GATES_PATH)
    surfaces_cfg = _load_yaml_file(root, COPY_SURFACES_PATH)
    axes = gates.get("axes") or {}
    words = [str(w) for w in (axes.get("words") or [])]
    minimum = int(axes.get("min_distinct") or 0)
    if not words or not minimum:
        return []
    errors: list[str] = []
    for attempt in _active_attempts(root, surfaces_cfg):
        resume = _surface_files(root, surfaces_cfg, attempt).get("resume.tailored")
        if resume is None:
            continue
        block = _bracket_block(resume.read_text(encoding="utf-8"), "outcomes")
        titles = re.findall(r'\btitle:\s*"([^"]*)"', block)
        if not titles:
            continue
        joined = " ".join(titles)
        present = [w for w in words if w in joined]
        if len(present) < minimum:
            errors.append(
                f"outcome axes: {resume.relative_to(root)} titles carry {len(present)}/{minimum} axis words "
                f"({'·'.join(present) or 'none'})"
            )
    return errors


def _git_changed(root: Path, path: Path) -> bool:
    import subprocess

    rel = str(path.relative_to(root))
    try:
        diff = subprocess.run(["git", "diff", "--quiet", "HEAD", "--", rel], cwd=root, capture_output=True)
        status = subprocess.run(["git", "status", "--porcelain", "--", rel], cwd=root, capture_output=True, text=True)
    except (OSError, FileNotFoundError):
        return False
    return diff.returncode == 1 or bool(status.stdout.strip())


def _validate_frozen_surfaces(root: Path) -> list[str]:
    """Gate 13: surfaces of frozen attempts must not change (override: COPY_ALLOW_FROZEN=1)."""
    import os

    gates = _load_yaml_file(root, COPY_GATES_PATH)
    surfaces_cfg = _load_yaml_file(root, COPY_SURFACES_PATH)
    if (gates.get("frozen") or {}).get("enforce") != "fail":
        return []
    if os.environ.get("COPY_ALLOW_FROZEN") == "1" or not (root / ".git").exists():
        return []
    errors: list[str] = []
    for attempt in _registry_attempts(root):
        if attempt.get("artifact_state") != "frozen":
            continue
        for path in _surface_files(root, surfaces_cfg, attempt).values():
            if _git_changed(root, path):
                errors.append(
                    f"frozen surface: {path.relative_to(root)} changed but attempt {attempt.get('id')} is frozen "
                    f"(set COPY_ALLOW_FROZEN=1 only with the user's explicit decision)"
                )
    return errors


def _validate_header_role(root: Path) -> list[str]:
    """Gate 14: resume header.role starts with the registry attempt's header_role."""
    gates = _load_yaml_file(root, COPY_GATES_PATH)
    surfaces_cfg = _load_yaml_file(root, COPY_SURFACES_PATH)
    require = bool((gates.get("header_role") or {}).get("require_for_active"))
    errors: list[str] = []
    for attempt in _active_attempts(root, surfaces_cfg):
        resume = _surface_files(root, surfaces_cfg, attempt).get("resume.tailored")
        if resume is None:
            continue
        expected = attempt.get("header_role")
        if not isinstance(expected, str) or not expected.strip():
            if require:
                errors.append(f"header role: attempt {attempt.get('id')} has no header_role (registry owns the header title)")
            continue
        source = resume.read_text(encoding="utf-8")
        header = re.search(r"\bheader:\s*\{", source)
        block = _brace_block(source, header.end() - 1) if header else ""
        role = re.search(r'\brole:\s*"([^"]*)"', block)
        actual = role.group(1) if role else ""
        if not actual.startswith(expected.strip()):
            errors.append(
                f"header role: {resume.relative_to(root)} header.role '{actual}' must start with '{expected}' (registry)"
            )
    return errors


def _validate_hero_sentences(root: Path) -> list[str]:
    """Gate 16: portfolio introduction and resume summary[0] are at most N sentences."""
    gates = _load_yaml_file(root, COPY_GATES_PATH)
    surfaces_cfg = _load_yaml_file(root, COPY_SURFACES_PATH)
    limit = int((gates.get("hero") or {}).get("max_sentences") or 0)
    if not limit:
        return []
    errors: list[str] = []
    for attempt in _active_attempts(root, surfaces_cfg):
        files = _surface_files(root, surfaces_cfg, attempt)
        portfolio = files.get("portfolio.tailored")
        if portfolio is not None:
            source = portfolio.read_text(encoding="utf-8")
            intro = re.search(r'\bintroduction:\s*"((?:[^"\\]|\\.)*)"', source)
            if intro:
                n = _sentence_count(intro.group(1))
                if n > limit:
                    errors.append(f"hero sentences: {portfolio.relative_to(root)} introduction has {n} sentences (max {limit})")
        resume = files.get("resume.tailored")
        if resume is not None:
            source = resume.read_text(encoding="utf-8")
            block = _bracket_block(source, "summary")
            first = block.find("{")
            if first != -1:
                obj = _brace_block(block, first)
                text = " ".join(re.findall(r'\btext:\s*"((?:[^"\\]|\\.)*)"', obj))
                n = _sentence_count(text)
                if n > limit:
                    errors.append(f"hero sentences: {resume.relative_to(root)} summary[0] has {n} sentences (max {limit})")
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
        + _validate_common_content_inventory(root)
        + _validate_product_claim_refs(root)
        + _validate_resume_artifact_claims(root)
        + _validate_tailored_resume_claims(root)
        + _validate_professional_document_claims(root)
        + _validate_portfolio_artifact_claims(root)
        + _validate_application_registry(root)
        + _validate_application_projection_drift(root)
        + _validate_public_copy_terms(root)
        + _validate_outcome_axes(root)
        + _validate_frozen_surfaces(root)
        + _validate_header_role(root)
        + _validate_hero_sentences(root)
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
