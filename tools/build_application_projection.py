#!/usr/bin/env python3
"""Build the local, UI-safe projection of the application registry.

The registry is the canonical source.  This tool deliberately never reads the
ignored tailored folders: those can contain private notes and submission
artifacts that must not flow into the local UI projection.
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path
from typing import Any

import yaml


REGISTRY_RELATIVE_PATH = Path("wiki/products/resume/application-registry.yaml")
COMMON_PACKAGE_RELATIVE_PATH = Path("wiki/products/resume/common-package.yaml")
PROJECTION_RELATIVE_PATH = Path("output/application-workspace/application-attempts.json")
SCHEMA_VERSION = 2
COMMON_PACKAGE_SCHEMA_VERSION = 1
APPLICATION_STATUSES = {
    "pre-apply",
    "in-progress",
    "accepted",
    "declined",
    "rejected",
    "unknown",
}
TERMINAL_STATUSES = {"accepted", "declined", "rejected"}
ARTIFACT_STATES = {"mutable", "approved", "frozen", "unknown"}
CHECKPOINT_KINDS = {"checkpoint", "legacy-import"}
SNAPSHOT_VERIFICATIONS = {"unknown", "partial", "verified"}
WORK_SESSION_STATES = {"active", "waiting-review", "paused", "complete", "unknown"}
ARTIFACT_KEYS = {"resume", "career-description", "portfolio", "cv"}
ARTIFACT_MODES = {"common", "tailored", "omitted"}
COMMON_ARTIFACT_STATES = {"drafting", "review-ready", "active"}
ARTIFACT_VISIBILITIES = {"local", "public"}


def _relative(path: Path, root: Path) -> str:
    try:
        return str(path.relative_to(root))
    except ValueError:
        return str(path)


def _is_nonempty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def _validate_date(value: Any, label: str, errors: list[str], *, allow_none: bool) -> None:
    if value is None and allow_none:
        return
    if isinstance(value, date):
        return
    if not _is_nonempty_string(value):
        errors.append(f"application registry: {label} must be a YYYY-MM-DD string")
        return
    try:
        date.fromisoformat(value)
    except ValueError:
        errors.append(f"application registry: {label} must be a YYYY-MM-DD string")


def _validate_nullable_string(value: Any, label: str, errors: list[str]) -> None:
    if value is not None and not _is_nonempty_string(value):
        errors.append(f"application registry: {label} must be a non-empty string or null")


def _validate_nullable_revision(value: Any, label: str, errors: list[str]) -> None:
    if value is None:
        return
    if not isinstance(value, int) or isinstance(value, bool) or value < 1:
        errors.append(f"application registry: {label} must be a positive integer or null")


def _validate_source_path(value: Any, label: str, errors: list[str]) -> None:
    if not _is_nonempty_string(value):
        errors.append(f"application registry: {label} must be a non-empty logical path")
        return
    path = Path(value)
    if path.is_absolute() or ".." in path.parts:
        errors.append(f"application registry: {label} must be a logical repo-relative path")


def _validate_route(value: Any, label: str, errors: list[str]) -> None:
    if not _is_nonempty_string(value) or not value.startswith("/"):
        errors.append(f"application registry: {label} must be an absolute site route")


def _validate_revision_map(value: Any, label: str, errors: list[str]) -> None:
    if value is None:
        return
    if not isinstance(value, dict):
        errors.append(f"application registry: {label} must be an object or null")
        return
    unknown = set(value) - ARTIFACT_KEYS
    if unknown:
        errors.append(f"application registry: {label} has unknown artifact keys {sorted(unknown)}")
    for artifact, revision in value.items():
        _validate_nullable_revision(revision, f"{label}.{artifact}", errors)


def _validate_artifacts(attempt: dict[str, Any], index: int, errors: list[str]) -> None:
    artifacts = attempt.get("artifacts")
    label = f"attempts[{index}].artifacts"
    if artifacts is None:
        return
    if not isinstance(artifacts, dict):
        errors.append(f"application registry: {label} must be an object or null")
        return

    unknown = set(artifacts) - ARTIFACT_KEYS
    if unknown:
        errors.append(f"application registry: {label} has unknown artifact keys {sorted(unknown)}")

    for artifact, config in artifacts.items():
        item_label = f"{label}.{artifact}"
        if not isinstance(config, dict):
            errors.append(f"application registry: {item_label} must be an object")
            continue
        unknown_fields = set(config) - {"mode", "route"}
        if unknown_fields:
            errors.append(
                f"application registry: {item_label} has unknown fields {sorted(unknown_fields)}"
            )
        mode = config.get("mode")
        if mode not in ARTIFACT_MODES:
            errors.append(
                f"application registry: {item_label}.mode must be one of {sorted(ARTIFACT_MODES)}"
            )
        route = config.get("route")
        if route is not None:
            _validate_route(route, f"{item_label}.route", errors)
        if mode == "omitted" and route is not None:
            errors.append(f"application registry: {item_label} omitted artifact cannot have route")


def _validate_current(attempt: dict[str, Any], index: int, errors: list[str]) -> None:
    current = attempt.get("current")
    label = f"attempts[{index}].current"
    if current is None:
        return
    if not isinstance(current, dict):
        errors.append(f"application registry: {label} must be an object or null")
        return

    kind = current.get("kind")
    if kind not in CHECKPOINT_KINDS:
        errors.append(
            f"application registry: {label}.kind must be one of {sorted(CHECKPOINT_KINDS)}"
        )
    _validate_nullable_revision(current.get("package_revision"), f"{label}.package_revision", errors)
    _validate_revision_map(current.get("artifact_revisions"), f"{label}.artifact_revisions", errors)
    _validate_date(current.get("checkpoint_at"), f"{label}.checkpoint_at", errors, allow_none=True)

    # A terminal outcome cannot keep a checkpoint as its active content source.
    if attempt.get("status") in TERMINAL_STATUSES and kind == "checkpoint":
        errors.append(
            f"application registry: attempts[{index}] terminal status cannot use current.kind checkpoint"
        )


def _validate_snapshot(attempt: dict[str, Any], index: int, errors: list[str]) -> None:
    snapshot = attempt.get("snapshot")
    label = f"attempts[{index}].snapshot"
    artifact_state = attempt.get("artifact_state")
    if snapshot is None:
        if artifact_state == "frozen":
            errors.append(f"application registry: attempts[{index}] frozen artifact_state requires snapshot")
        return
    if not isinstance(snapshot, dict):
        errors.append(f"application registry: {label} must be an object or null")
        return
    if artifact_state != "frozen":
        errors.append(f"application registry: {label} requires frozen artifact_state")

    _validate_nullable_string(snapshot.get("id"), f"{label}.id", errors)
    verification = snapshot.get("verification")
    if verification not in SNAPSHOT_VERIFICATIONS:
        errors.append(
            f"application registry: {label}.verification must be one of {sorted(SNAPSHOT_VERIFICATIONS)}"
        )
    _validate_date(snapshot.get("captured_at"), f"{label}.captured_at", errors, allow_none=True)
    _validate_date(snapshot.get("submitted_at"), f"{label}.submitted_at", errors, allow_none=True)
    _validate_nullable_revision(snapshot.get("package_revision"), f"{label}.package_revision", errors)
    _validate_revision_map(snapshot.get("artifact_revisions"), f"{label}.artifact_revisions", errors)

    refs = snapshot.get("artifact_refs")
    if refs is not None:
        if not isinstance(refs, dict):
            errors.append(f"application registry: {label}.artifact_refs must be an object or null")
        else:
            unknown = set(refs) - ARTIFACT_KEYS
            if unknown:
                errors.append(
                    f"application registry: {label}.artifact_refs has unknown artifact keys {sorted(unknown)}"
                )
            for artifact, ref in refs.items():
                if not _is_nonempty_string(ref):
                    errors.append(
                        f"application registry: {label}.artifact_refs.{artifact} must be a non-empty string"
                    )

    # Identified snapshots must have a capture point.  Legacy imports can retain
    # null evidence fields, so the validator does not fabricate missing history.
    if snapshot.get("id") is not None and snapshot.get("captured_at") is None:
        errors.append(f"application registry: {label}.id requires captured_at")
    if verification == "verified" and (
        snapshot.get("id") is None
        or snapshot.get("captured_at") is None
        or not snapshot.get("artifact_refs")
    ):
        errors.append(
            f"application registry: {label}.verification verified requires id, captured_at, and artifact_refs"
        )


def _validate_work_session(attempt: dict[str, Any], index: int, errors: list[str]) -> None:
    work_session = attempt.get("work_session")
    label = f"attempts[{index}].work_session"
    if work_session is None:
        return
    if not isinstance(work_session, dict):
        errors.append(f"application registry: {label} must be an object or null")
        return

    unknown_fields = set(work_session) - {"state", "scope", "last_synced", "next_action"}
    if unknown_fields:
        errors.append(f"application registry: {label} has unknown fields {sorted(unknown_fields)}")
    if work_session.get("state") not in WORK_SESSION_STATES:
        errors.append(
            f"application registry: {label}.state must be one of {sorted(WORK_SESSION_STATES)}"
        )
    if not _is_nonempty_string(work_session.get("scope")):
        errors.append(f"application registry: {label}.scope must be a non-empty string")
    _validate_date(work_session.get("last_synced"), f"{label}.last_synced", errors, allow_none=True)
    _validate_nullable_string(work_session.get("next_action"), f"{label}.next_action", errors)


def validate_registry_data(data: Any) -> list[str]:
    """Validate canonical registry content without reading local attempt folders."""
    errors: list[str] = []
    if not isinstance(data, dict):
        return ["application registry: root must be an object"]
    if data.get("schema_version") != SCHEMA_VERSION:
        errors.append(f"application registry: schema_version must be {SCHEMA_VERSION}")
    _validate_date(data.get("updated_at"), "updated_at", errors, allow_none=False)

    attempts = data.get("attempts")
    if not isinstance(attempts, list):
        return errors + ["application registry: attempts must be a list"]

    seen_ids: set[str] = set()
    for index, attempt in enumerate(attempts):
        label = f"attempts[{index}]"
        if not isinstance(attempt, dict):
            errors.append(f"application registry: {label} must be an object")
            continue

        for field in ("id", "company", "role"):
            if not _is_nonempty_string(attempt.get(field)):
                errors.append(f"application registry: {label}.{field} must be a non-empty string")
        attempt_id = attempt.get("id")
        if _is_nonempty_string(attempt_id):
            if attempt_id in seen_ids:
                errors.append(f"application registry: duplicate attempt id {attempt_id}")
            seen_ids.add(attempt_id)

        status = attempt.get("status")
        if status not in APPLICATION_STATUSES:
            errors.append(
                f"application registry: {label}.status must be one of {sorted(APPLICATION_STATUSES)}"
            )
        artifact_state = attempt.get("artifact_state")
        if artifact_state not in ARTIFACT_STATES:
            errors.append(
                f"application registry: {label}.artifact_state must be one of {sorted(ARTIFACT_STATES)}"
            )
        _validate_nullable_string(attempt.get("tracking"), f"{label}.tracking", errors)
        _validate_date(attempt.get("last_confirmed"), f"{label}.last_confirmed", errors, allow_none=True)
        _validate_source_path(attempt.get("source_path"), f"{label}.source_path", errors)
        if "posting_id" in attempt:
            _validate_nullable_string(attempt.get("posting_id"), f"{label}.posting_id", errors)

        _validate_artifacts(attempt, index, errors)
        _validate_current(attempt, index, errors)
        _validate_snapshot(attempt, index, errors)
        _validate_work_session(attempt, index, errors)
    return errors


def load_registry(path: Path, root: Path | None = None) -> tuple[dict[str, Any] | None, list[str]]:
    """Load and validate a registry file, returning stable human-readable errors."""
    display_path = _relative(path, root) if root else str(path)
    if not path.exists():
        return None, [f"application registry: {display_path} does not exist"]
    try:
        data = yaml.safe_load(path.read_text(encoding="utf-8"))
    except yaml.YAMLError as exc:
        return None, [f"application registry: {display_path} cannot parse: {exc}"]
    return data if isinstance(data, dict) else None, validate_registry_data(data)


def validate_common_package_data(data: Any) -> list[str]:
    errors: list[str] = []
    if not isinstance(data, dict):
        return ["common package: root must be an object"]
    if data.get("schema_version") != COMMON_PACKAGE_SCHEMA_VERSION:
        errors.append(
            f"common package: schema_version must be {COMMON_PACKAGE_SCHEMA_VERSION}"
        )
    _validate_date(data.get("updated_at"), "common package.updated_at", errors, allow_none=False)
    package = data.get("package")
    if not isinstance(package, dict):
        return errors + ["common package: package must be an object"]
    if package.get("id") != "common":
        errors.append("common package: package.id must be common")
    artifacts = package.get("artifacts")
    if not isinstance(artifacts, dict):
        return errors + ["common package: package.artifacts must be an object"]
    if set(artifacts) != ARTIFACT_KEYS:
        errors.append(
            f"common package: package.artifacts must contain exactly {sorted(ARTIFACT_KEYS)}"
        )
    for artifact, config in artifacts.items():
        label = f"common package: package.artifacts.{artifact}"
        if not isinstance(config, dict):
            errors.append(f"{label} must be an object")
            continue
        unknown_fields = set(config) - {"required", "state", "route", "visibility"}
        if unknown_fields:
            errors.append(f"{label} has unknown fields {sorted(unknown_fields)}")
        if config.get("required") is not True:
            errors.append(f"{label}.required must be true")
        if config.get("state") not in COMMON_ARTIFACT_STATES:
            errors.append(
                f"{label}.state must be one of {sorted(COMMON_ARTIFACT_STATES)}"
            )
        if config.get("visibility") not in ARTIFACT_VISIBILITIES:
            errors.append(
                f"{label}.visibility must be one of {sorted(ARTIFACT_VISIBILITIES)}"
            )
        route = config.get("route")
        if not _is_nonempty_string(route) or not route.startswith("/"):
            errors.append(f"{label}.route must be an absolute site route")
    return errors


def load_common_package(path: Path, root: Path | None = None) -> tuple[dict[str, Any] | None, list[str]]:
    display_path = _relative(path, root) if root else str(path)
    if not path.exists():
        return None, [f"common package: {display_path} does not exist"]
    try:
        data = yaml.safe_load(path.read_text(encoding="utf-8"))
    except yaml.YAMLError as exc:
        return None, [f"common package: {display_path} cannot parse: {exc}"]
    return data if isinstance(data, dict) else None, validate_common_package_data(data)


def _projection_value(value: Any) -> Any:
    """Keep YAML date scalars JSON-safe without changing their semantic value."""
    return value.isoformat() if isinstance(value, date) else value


def build_projection(data: dict[str, Any]) -> dict[str, Any]:
    """Return the client-safe fields described by the application projection contract."""
    attempts: list[dict[str, Any]] = []
    for source in data["attempts"]:
        attempt: dict[str, Any] = {
            "id": source["id"],
            "company": source["company"],
            "role": source["role"],
            "status": source["status"],
            "artifactState": source["artifact_state"],
            "sourcePath": source["source_path"],
        }
        for source_name, target_name in (
            ("posting_id", "postingId"),
            ("tracking", "tracking"),
            ("last_confirmed", "lastConfirmed"),
        ):
            value = source.get(source_name)
            if value is not None:
                attempt[target_name] = _projection_value(value)

        artifacts = source.get("artifacts")
        if isinstance(artifacts, dict):
            attempt["artifacts"] = {
                artifact: {
                    **{"mode": config["mode"]},
                    **({"route": config["route"]} if config.get("route") is not None else {}),
                }
                for artifact, config in artifacts.items()
                if isinstance(config, dict)
            }

        current = source.get("current")
        if isinstance(current, dict):
            current_projection: dict[str, Any] = {"kind": current["kind"]}
            for source_name, target_name in (
                ("package_revision", "packageRevision"),
                ("artifact_revisions", "artifactRevisions"),
                ("checkpoint_at", "checkpointAt"),
            ):
                value = current.get(source_name)
                if value is not None:
                    current_projection[target_name] = _projection_value(value)
            attempt["current"] = current_projection

        snapshot = source.get("snapshot")
        if isinstance(snapshot, dict):
            snapshot_projection: dict[str, Any] = {"verification": snapshot["verification"]}
            for source_name, target_name in (
                ("id", "id"),
                ("captured_at", "capturedAt"),
                ("submitted_at", "submittedAt"),
                ("package_revision", "packageRevision"),
                ("artifact_revisions", "artifactRevisions"),
                ("artifact_refs", "artifactRefs"),
            ):
                value = snapshot.get(source_name)
                if value is not None:
                    snapshot_projection[target_name] = _projection_value(value)
            attempt["snapshot"] = snapshot_projection

        work_session = source.get("work_session")
        if isinstance(work_session, dict):
            work_session_projection: dict[str, Any] = {
                "state": work_session["state"],
                "scope": work_session["scope"],
            }
            for source_name, target_name in (
                ("last_synced", "lastSynced"),
                ("next_action", "nextAction"),
            ):
                value = work_session.get(source_name)
                if value is not None:
                    work_session_projection[target_name] = _projection_value(value)
            attempt["workSession"] = work_session_projection

        attempts.append(attempt)
    return {"schemaVersion": SCHEMA_VERSION, "attempts": attempts}


def build_common_package_projection(data: dict[str, Any]) -> dict[str, Any]:
    package = data["package"]
    return {
        "id": package["id"],
        "artifacts": {
            artifact: {
                "required": config["required"],
                "state": config["state"],
                "route": config["route"],
                "visibility": config["visibility"],
            }
            for artifact, config in package["artifacts"].items()
        },
    }


def serialize_projection(projection: dict[str, Any]) -> str:
    return json.dumps(projection, ensure_ascii=False, indent=2) + "\n"


def expected_projection(root: Path) -> tuple[str | None, list[str]]:
    registry = root / REGISTRY_RELATIVE_PATH
    data, errors = load_registry(registry, root)
    common_package = root / COMMON_PACKAGE_RELATIVE_PATH
    common_data, common_errors = load_common_package(common_package, root)
    errors.extend(common_errors)
    if errors or data is None or common_data is None:
        return None, errors
    projection = build_projection(data)
    projection["commonPackage"] = build_common_package_projection(common_data)
    return serialize_projection(projection), []


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output", type=Path, default=None)
    parser.add_argument("--check", action="store_true", help="fail if an existing projection differs")
    args = parser.parse_args()

    root = args.root.resolve()
    output = (args.output or root / PROJECTION_RELATIVE_PATH).resolve()
    projection, errors = expected_projection(root)
    if errors:
        for error in errors:
            print(error)
        return 1
    assert projection is not None

    if args.check:
        if not output.exists() or output.read_text(encoding="utf-8") != projection:
            print(f"application projection: {_relative(output, root)} is out of date")
            return 1
        print("application projection: PASS")
        return 0

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(projection, encoding="utf-8")
    print(f"application projection: wrote {_relative(output, root)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
