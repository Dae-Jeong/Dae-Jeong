#!/usr/bin/env python3
"""Validate portable knowledge-harness metadata, paths, links, and claims."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path
from typing import Any

import yaml
from validate_documents import validate_documents

from build_application_projection import (
    PROJECTION_RELATIVE_PATH,
    expected_projection,
    load_registry,
)


WIKI = "wiki"
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

CONCEPT_DIRS = tuple(
    f"{WIKI}/{name}" for name in ("context", "profile", "evidence", "products", "rules", "backlog")
)
SCAN_DIRS = CONCEPT_DIRS + (".agents/skills", "tools")
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


def _json_copy_claims(value: Any) -> set[str]:
    """Read the same leaf-level claim arrays the common document renderer consumes."""
    if isinstance(value, list):
        return set().union(*(_json_copy_claims(item) for item in value))
    if isinstance(value, dict):
        own = {str(item) for item in value.get("claims", [])}
        return own | set().union(*(_json_copy_claims(item) for key, item in value.items() if key != "claims"))
    return set()


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
    if artifact.suffix == ".json":
        used = _json_copy_claims(yaml.safe_load(artifact.read_text(encoding="utf-8")))

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


def _validate_resume_selection(root: Path) -> list[str]:
    """Gate 38: keep the retired Thready rebuild story out of the common resume."""
    path = root / "app/fe/content/common/resume.json"
    if not path.exists():
        return []
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    excluded = {"thready.backend-rebuild", "thready.rebuild-decision-execution"}
    errors = []
    if _json_copy_claims(data) & excluded:
        errors.append("resume selection gate 38: Thready rebuild claims are not selected")
    for section in data.get("sections", []):
        for entry in section.get("entries", []):
            for block in entry.get("blocks", []):
                text = str(block.get("text", ""))
                if re.search(r"(?:Thready|백엔드|backend).{0,50}(?:재구축|병렬 재설계|병렬 재작성)", text, re.I):
                    errors.append("resume selection gate 38: Thready rebuild narrative is not selected")
    return errors


def _validate_common_document_claims(root: Path) -> list[str]:
    """Gates 31/34/35: public claims, English Jake CV, and separate military service."""
    claims, _ = _load_claims(root)
    public = {str(claim.get("id")) for claim in claims if claim.get("public") is True}
    hero = _load_yaml_file(root, COPY_GATES_PATH).get("hero") or {}
    errors: list[str] = _validate_resume_selection(root)
    for name in ("resume", "career-description", "portfolio", "cv"):
        artifact = root / "app" / "fe" / "content" / "common" / f"{name}.json"
        if not artifact.exists():
            errors.append(f"common documents: missing {name}.json")
            continue
        source = artifact.read_text(encoding="utf-8")
        try:
            data = yaml.safe_load(source)
            used = _json_copy_claims(data)
        except (yaml.YAMLError, TypeError, AttributeError) as exc:
            errors.append(f"common documents: invalid {name}.json: {exc}")
            continue
        if not isinstance(data, dict) or not data.get("sections") or not used:
            errors.append(f"common documents: {name}.json has no sections or claims")
        for claim_id in sorted(used - public):
            errors.append(f"common documents: {name}.json uses unknown/non-public claim {claim_id}")
        identities = _load_yaml_file(root, COPY_GATES_PATH).get("common_document_identity") or {}
        brand = str(identities.get(name, hero.get("brand_line_en" if name == "cv" else "brand_line", "")))
        brand_count = source.count(brand)
        if name == "resume" and isinstance(data, dict):
            # Homepage copy may omit sentence periods; the wording must still match exactly.
            brand_count = sum(
                str(block.get("text", "")).removesuffix(".") == brand.removesuffix(".")
                for section in data.get("sections", [])
                for entry in section.get("entries", [])
                for block in entry.get("blocks", [])
            )
        if brand and brand_count != 1:
            errors.append(f"common documents: {name}.json must contain exactly one brand line")
        if name == "cv" and isinstance(data, dict):
            if data.get("language") != "en" or data.get("template") != "jake":
                errors.append("common CV: gate 34 requires language=en and template=jake")
            if re.search(r"[\uac00-\ud7a3]", source):
                errors.append("common CV: gate 34 requires English headings and body copy")
            if not data.get("sections") or data["sections"][0].get("title") != "Experience":
                errors.append("common CV: gate 34 requires experience before education")
            military = [section for section in data.get("sections", []) if section.get("title") == "Military Service"]
            military_claim = "career.military-service"
            if len(military) != 1 or military_claim not in _json_copy_claims(military):
                errors.append("common CV: gate 35 requires a claim-backed Military Service section")
            headings = [section.get("title") for section in data.get("sections", [])]
            if "Military Service" not in headings or "Education" not in headings or headings.index("Military Service") + 1 != headings.index("Education"):
                errors.append("common CV: gate 35 requires Military Service immediately before Education")
            outside_military = [data.get("header", []), *[section for section in data.get("sections", []) if section.get("title") != "Military Service"]]
            if military_claim in _json_copy_claims(outside_military):
                errors.append("common CV: gate 35 keeps military service separate from employment")
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
    case_dir = root / WIKI / "products" / "portfolio" / "cases"
    for path in sorted(case_dir.glob("*.md")):
        case_text = path.read_text(encoding="utf-8")
        meta = _frontmatter(case_text) or {}
        selected = {str(claim_id) for claim_id in meta.get("claim_ids", [])}
        for claim_id in sorted(selected - known):
            errors.append(f"portfolio library: {path.name} has unknown claim {claim_id}")
        for claim_id in sorted(selected - public):
            errors.append(f"portfolio library: {path.name} claim {claim_id} is not public")
        if meta.get("library_status") == "ready":
            if not selected:
                errors.append(f"portfolio library: {path.name} has no claim_ids")
            for heading in (
                "성과와 전문성", "JD별 활용", "경력기술서 문안",
                "이력서·CV 문안", "내부 근거와 후속 확인",
            ):
                if not re.search(rf"^## {re.escape(heading)}\s*$", case_text, re.MULTILINE):
                    errors.append(f"portfolio library: {path.name} missing section {heading}")

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

        # Current library and prior/frozen artifact selections can differ. Both
        # must cite the registry; equality would force publication or retroactive
        # edits whenever a reusable case is added or a selection is retired.
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
            if "{company}" not in template:
                continue
            pattern = re.escape(template).replace(re.escape("{company}"), r"([^/]+)")
            match = re.fullmatch(pattern, route)
            if not match:
                continue
            company = match.group(1)
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
            allowed = (gates.get("approved_terms_by_path") or {}).get(str(path.relative_to(root)), [])
            for label, pattern in banned:
                if label in allowed:
                    continue
                if pattern.search(line):
                    errors.append(f"public copy: {path.relative_to(root)}:{number} contains banned term '{label}'")
    return errors


def _validate_copy_selection(root: Path) -> list[str]:
    """Gates 32–33: current copy decisions, excluding frozen and platform sources."""
    gates = _load_yaml_file(root, COPY_GATES_PATH)
    surfaces = _load_yaml_file(root, COPY_SURFACES_PATH)
    active_files = {
        path for attempt in _active_attempts(root, surfaces)
        for path in _surface_files(root, surfaces, attempt).values()
    }
    frozen_files = {
        path for attempt in _registry_attempts(root) if attempt.get("artifact_state") == "frozen"
        for path in _surface_files(root, surfaces, attempt).values()
    }
    errors: list[str] = []
    for rule in gates.get("copy_selection") or []:
        try:
            patterns = [re.compile(pattern) for pattern in rule["patterns"]]
        except (KeyError, TypeError, re.error) as exc:
            errors.append(f"copy selection: invalid rule {rule.get('gate')}: {exc}")
            continue
        files = (active_files if rule.get("include_active", True) else set()) | {
            root / surface["path"] for surface in surfaces.get("surfaces", [])
            if surface["id"] in rule.get("common_ids", [])
        } | {root / path for path in rule.get("extra_paths", [])}
        for path in sorted(files - frozen_files):
            if not path.exists():
                errors.append(f"copy selection gate {rule['gate']}: missing {path.relative_to(root)}")
                continue
            for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
                if re.match(r"\s*(//|import\b)", line):
                    continue
                for excluded in rule.get("excluded_text", []):
                    line = line.replace(excluded, "")
                if any(pattern.search(line) for pattern in patterns):
                    errors.append(f"copy selection gate {rule['gate']}: {path.relative_to(root)}:{number}: {rule['label']}")
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
                prefix = (gates.get("hero") or {}).get("introduction_prefix")
                if prefix and not intro.group(1).lstrip().startswith(str(prefix)):
                    errors.append(f"hero prefix: {portfolio.relative_to(root)} introduction must start with '{prefix}' (§1-1)")
        career = files.get("career.tailored")
        subtitle_expected = (gates.get("hero") or {}).get("career_subtitle")
        if career is not None and subtitle_expected:
            csrc = career.read_text(encoding="utf-8")
            m = re.search(r'^  subtitle:\s*"((?:[^"\\]|\\.)*)"', csrc, re.M)
            if m and m.group(1).strip() != str(subtitle_expected).strip():
                errors.append(f"career subtitle: {career.relative_to(root)} subtitle must be the brand line (§1-1), got '{m.group(1)[:40]}…'")
        brand = (gates.get("hero") or {}).get("brand_line")
        if portfolio is not None and brand:
            hsrc = portfolio.read_text(encoding="utf-8")
            hm = re.search(r'\bheadline:\s*"((?:[^"\\]|\\.)*)"', hsrc)
            if hm and hm.group(1).strip() != str(brand).strip():
                errors.append(f"brand line: {portfolio.relative_to(root)} headline must be the brand line, got '{hm.group(1)[:40]}…'")
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
                if brand and text.strip() != str(brand).strip():
                    errors.append(f"brand line: {resume.relative_to(root)} summary[0] must be the brand line, got '{text[:40]}…'")
    return errors


PLATFORM_FIELD = re.compile(r"^### (?P<name>.+?) · (?P<limit>\d+)자\s*\n\s*\n```text\n(?P<body>.*?)\n```", re.M | re.S)


def _validate_platform_fields(root: Path) -> list[str]:
    """Gate 17: platform copy fields stay within the char limit declared in their heading."""
    gates = _load_yaml_file(root, COPY_GATES_PATH)
    surfaces_cfg = _load_yaml_file(root, COPY_SURFACES_PATH)
    cfg = gates.get("platform_fields") or {}
    if not cfg.get("enforce"):
        return []
    kind = cfg.get("surface_kind") or "platform"
    errors: list[str] = []
    for surface in surfaces_cfg.get("surfaces") or []:
        if surface.get("kind") != kind:
            continue
        path = root / str(surface["path"])
        if not path.exists():
            continue
        for match in PLATFORM_FIELD.finditer(path.read_text(encoding="utf-8")):
            length = len(match.group("body").replace("\n", ""))
            limit = int(match.group("limit"))
            if length > limit:
                errors.append(
                    f"platform field: {path.relative_to(root)} '{match.group('name')}' is {length} chars (limit {limit})"
                )
    return errors


def _validate_resume_row_layout(root: Path) -> list[str]:
    """Gate 21: exercise blank and populated metadata using the actual React component."""
    frontend = root / "app/fe"
    test = frontend / "scripts/numbered-row.test.mjs"
    # A wiki-only checkout may not have frontend dependencies; copy verification installs/requires them.
    if not test.exists() or not (frontend / "node_modules/typescript").exists():
        return []
    try:
        result = subprocess.run(
            ["node", "--test", str(test)], cwd=frontend, capture_output=True, text=True, timeout=30,
        )
    except (OSError, subprocess.TimeoutExpired) as exc:
        return [f"resume row layout: gate 21 could not run: {exc}"]
    return [] if result.returncode == 0 else [f"resume row layout: gate 21 failed\n{result.stdout}\n{result.stderr}"]


def _validate_resume_comparison_copy(root: Path) -> list[str]:
    """Gate 30: the shared document reader preserves full copy and claims."""
    frontend = root / "app/fe"
    test = frontend / "content/documents/resume-copy.test.mjs"
    if not test.exists() or not (frontend / "node_modules/typescript").exists():
        return ["document copy: gate 30 required reader test or TypeScript missing"]
    try:
        result = subprocess.run(
            ["node", "--experimental-strip-types", "--test", str(test)],
            cwd=frontend, capture_output=True, text=True, timeout=30,
        )
    except (OSError, subprocess.TimeoutExpired) as exc:
        return [f"resume comparison: gate 30 could not run: {exc}"]
    return [] if result.returncode == 0 else [f"resume comparison: gate 30 failed\n{result.stdout}\n{result.stderr}"]


def validate(root: Path) -> list[str]:
    """Return stable validation failures; an empty list means pass."""
    root = root.resolve()
    missing = knowledge_errors(root / WIKI)
    if missing:
        return missing
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
        + _validate_common_document_claims(root)
        + validate_documents(root, _load_claims(root)[0], _load_yaml_file(root, COPY_GATES_PATH), _registry_attempts(root))
        + _validate_portfolio_artifact_claims(root)
        + _validate_application_registry(root)
        + _validate_application_projection_drift(root)
        + _validate_public_copy_terms(root)
        + _validate_copy_selection(root)
        + _validate_frozen_surfaces(root)
        + _validate_header_role(root)
        + _validate_hero_sentences(root)
        + _validate_platform_fields(root)
        + _validate_resume_row_layout(root)
        + _validate_resume_comparison_copy(root)
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
