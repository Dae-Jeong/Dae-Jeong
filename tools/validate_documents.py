"""Local company drafts: public claims, owner parity and review-only routing."""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

import yaml


def claim_ids(value):
    if isinstance(value, list):
        return set().union(*(claim_ids(item) for item in value))
    if isinstance(value, dict):
        return set(value.get("claims", [])) | set().union(*(claim_ids(item) for item in value.values()))
    return set()


def copy_strings(value):
    if isinstance(value, str):
        return [value]
    if isinstance(value, list):
        return [text for item in value for text in copy_strings(item)]
    if isinstance(value, dict):
        return [text for key, item in value.items() if key not in {"claims", "kind", "presentation", "emphasis"} for text in copy_strings(item)]
    return []


def is_superseded_review(data: dict, attempt: dict) -> bool:
    """A dated local draft may precede the verified, frozen submission revision."""
    snapshot = attempt.get("snapshot", {})
    revision = data.get("revision", "")
    routes = [item.get("route", "") for item in attempt.get("artifacts", {}).values()]
    submitted = [re.search(r"[?&]revision=(\d{8}-R\d+)(?:&|$)", route) for route in routes]
    versions = [match.group(1) for match in submitted if match]
    def version(value):
        date, number = value.split("-R")
        return int(date), int(number)
    return (
        data.get("visibility") == "local"
        and data.get("approved") is False
        and attempt.get("artifact_state") == "frozen"
        and snapshot.get("verification") == "verified"
        and bool(re.fullmatch(r"\d{8}-R\d+", revision))
        and bool(versions)
        and all(version(revision) < version(item) for item in versions)
    )


def validate_documents(root: Path, claims: list[dict], gates: dict, attempts: list[dict]) -> list[str]:
    errors = []
    public = {claim["id"] for claim in claims if claim.get("public") is True and claim.get("confidence") in {"high", "medium"}}
    base = root / "app/fe/content/documents/companies"
    sources = []
    for slug in ("miridih", "featuring", "toss-place"):
        paths = {kind: base / slug / f"{kind}.json" for kind in ("resume", "career", "portfolio")}
        if any(not path.is_file() for path in paths.values()):
            errors.extend(f"company document: missing {path.relative_to(root)}" for path in paths.values() if not path.is_file())
            continue
        parts = {kind: json.loads(path.read_text()) for kind, path in paths.items()}
        data = {key: value for key, value in parts["resume"].items() if key not in {"content", "document"}}
        for kind, part in parts.items():
            if part.get("document") != kind or {key: value for key, value in part.items() if key not in {"content", "document"}} != data:
                errors.append(f"company document: {slug}/{kind} metadata drift")
        data.update({kind: part["content"] for kind, part in parts.items()})
        attempt = next((item for item in attempts if item.get("id") == data.get("applicationId")), None)
        if not attempt or not isinstance(attempt.get("source_path"), str):
            errors.append(f"company document: {slug} missing application registry source")
            continue
        source = root / Path(attempt["source_path"]).with_name("content-draft.md")
        sources.append(source)
        missing = [item for item in (source, source.with_name("claim-map.yaml")) if not item.is_file()]
        if missing:
            errors.extend(f"company review: required source missing: {item.relative_to(root)}" for item in missing)
            continue
        if data.get("slug") != slug or data.get("status") != "draft" or data.get("visibility") != "local" or data.get("approved") is not False:
            errors.append(f"company review: {slug} must be local/draft/approved:false")
        superseded = is_superseded_review(data, attempt)
        if not superseded and (attempt.get("artifact_state") != "mutable" or attempt.get("status") != "pre-apply"):
            errors.append(f"company review: {slug} missing mutable pre-apply registry connection")
        elif not superseded and not data["resume"]["role"].startswith(attempt.get("header_role", "")):
            errors.append(f"company review: {slug} header role drift")
        skills = "\n".join(copy_strings([section for section in data["resume"]["sections"] if section.get("title") == "기술"]))
        for term in ("Claude Code", "Codex", "SQLAlchemy 2.0 async", "Sentry", "Jira"):
            if term not in skills:
                errors.append(f"company review: {slug} gate 6 missing skill {term}")
        for name in ("resume", "career", "portfolio"):
            document = data[name]
            used = claim_ids(document)
            if not document.get("sections") or not used or used - public:
                errors.append(f"company review: {slug}/{name} empty or unknown/non-public/low claims {sorted(used - public)}")
            text = "\n".join(copy_strings(document))
            for rule in gates.get("banned_terms", []):
                if re.search(rule["pattern"], text):
                    errors.append(f"company review: {slug}/{name} banned {rule['label']}")
            for rule in gates.get("copy_selection", []):
                if rule.get("gate") in {32, 33} and any(re.search(pattern, text) for pattern in rule["patterns"]):
                    errors.append(f"company review: {slug}/{name} selection gate {rule['gate']}")
            if re.search(r"/Users/|(?:검색 정확도 수치나 벡터 DB 운영 경험으로 표현하지|이 검증은 운영 처리량 개선율)", text):
                errors.append(f"company review: {slug}/{name} private path or editorial defense")
            brand = gates.get("hero", {}).get("brand_line", "")
            if brand and text.count(brand) != 1:
                errors.append(f"company review: {slug}/{name} brand line drift")
            key = "career-description" if name == "career" else name
            if not superseded and attempt.get("artifacts", {}).get(key) != {"mode": "tailored", "route": f"/{name}/{slug}?revision={data['revision']}"}:
                errors.append(f"company review: {slug}/{name} registry route drift")
            if source.exists():
                mapping = yaml.safe_load(source.with_name("claim-map.yaml").read_text())
                if mapping.get("content_owners", {}).get(name) != str(paths[name].relative_to(root)):
                    errors.append(f"company document: {slug}/{name} app copy owner drift")
                if used != set(mapping.get("sections", {}).get(key, [])):
                    errors.append(f"company review: {slug}/{name} claim map drift")
        if source.exists():
            metadata = yaml.safe_load(source.read_text().split("---", 2)[1])
            mapping = yaml.safe_load(source.with_name("claim-map.yaml").read_text())
            if metadata.get("approved") is not False or metadata.get("revision") != data["revision"] or mapping.get("approved") is not False:
                errors.append(f"company review: {slug} source approval/revision drift")
            for name in ("resume", "portfolio"):
                order = [entry["title"] for entry in data[name]["sections"][1]["entries"]] if name == "resume" else [re.sub(r"^\d+\. ", "", section["title"]) for section in data[name]["sections"]]
                if order != mapping.get("document_order", {}).get(name):
                    errors.append(f"company review: {slug}/{name} outcome order drift")
    # App documents own current prose. Canonical facts/claims and approval still gate it.
    if len(sources) == 4 and all(source.is_file() and source.with_name("claim-map.yaml").is_file() for source in sources):
        result = subprocess.run(["node", "--experimental-strip-types", "tools/check_documents.mjs", "--check"], cwd=root, capture_output=True, text=True, timeout=60)
        if result.returncode:
            errors.append(f"company documents: content contract failed\n{result.stderr}")
    return errors
