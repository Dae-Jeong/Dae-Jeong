#!/usr/bin/env python3
"""Read application status and calculate deadline badges without writing files."""

from __future__ import annotations

import argparse
from collections import Counter
from datetime import datetime
import json
from pathlib import Path
import sys
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "tools"))
from build_application_projection import (  # noqa: E402
    REGISTRY_RELATIVE_PATH, load_registry, parse_deadline_value, validate_deadline,
)

KST = ZoneInfo("Asia/Seoul")
IMMINENT_DAYS = 3
STATUS_LABELS = {
    "pre-apply": "지원 전", "in-progress": "진행중", "accepted": "합격",
    "declined": "거절", "rejected": "탈락", "unknown": "상태 미확인",
}


def deadline_view(attempt: dict, now: datetime) -> dict:
    deadline = attempt.get("deadline") or {"kind": "unknown"}
    kind = deadline["kind"]
    result = {**deadline, "days_left": None, "imminent": False}
    if kind != "fixed":
        result["label"] = {
            "rolling": "상시채용", "unspecified": "마감일 미표시",
            "unknown": "마감일 미확인", "closed": "공고 마감",
        }[kind]
        return result
    end = parse_deadline_value(deadline["value"])
    if isinstance(end, datetime):
        end_date = end.astimezone(KST).date()
        expired = now >= end
    else:
        end_date = end
        expired = now.date() > end
    days_left = (end_date - now.date()).days
    imminent = attempt["status"] == "pre-apply" and not expired and 0 <= days_left <= IMMINENT_DAYS
    countdown = "D-day" if days_left == 0 else f"D-{days_left}"
    result.update(days_left=days_left, imminent=imminent)
    result["label"] = "마감 지남" if expired else f"마감 임박 · {countdown}" if imminent else countdown
    return result


def build_report(data: dict, now: datetime, overrides: dict | None = None) -> dict:
    if now.utcoffset() is None:
        raise ValueError("report time requires a timezone offset")
    now = now.astimezone(KST)
    overrides = overrides or {}
    if not isinstance(overrides, dict):
        raise ValueError("deadline overrides must be an object keyed by attempt id")
    ids = {a["id"] for a in data["attempts"]}
    if set(overrides) - ids:
        raise ValueError("deadline override contains an unknown attempt id")
    rows = []
    for saved in data["attempts"]:
        attempt = dict(saved)
        if attempt["id"] in overrides:
            attempt["deadline"] = overrides[attempt["id"]]
        errors = validate_deadline(attempt.get("deadline"), attempt["id"])
        if errors:
            raise ValueError("; ".join(errors))
        rows.append({
            **{key: attempt.get(key) for key in (
                "id", "company", "role", "status", "tracking", "artifact_state",
                "last_confirmed", "source_path",
            )},
            "status_label": STATUS_LABELS[attempt["status"]],
            "next_action": (attempt.get("work_session") or {}).get("next_action"),
            "deadline": deadline_view(attempt, now),
        })
    priority = {"pre-apply": 0, "in-progress": 1, "unknown": 2, "accepted": 3, "declined": 4, "rejected": 5}
    rows.sort(key=lambda r: (
        not r["deadline"]["imminent"], priority[r["status"]],
        r["deadline"]["days_left"] if r["deadline"]["days_left"] is not None else float("inf"),
        r["company"], r["id"],
    ))
    counts = Counter(a["status"] for a in rows)
    return {
        "as_of": now.isoformat(timespec="seconds"), "timezone": str(KST),
        "registry_updated_at": data.get("updated_at"), "total": len(rows),
        "counts": {key: counts[key] for key in STATUS_LABELS},
        "imminent_ids": [r["id"] for r in rows if r["deadline"]["imminent"]],
        "attempts": rows,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--registry", type=Path, default=ROOT / REGISTRY_RELATIVE_PATH)
    parser.add_argument("--as-of", help="ISO datetime with offset, for a historical report or testing")
    parser.add_argument("--deadline-overrides", help="JSON object of live deadline observations, keyed by attempt id")
    args = parser.parse_args()
    data, errors = load_registry(args.registry)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    try:
        now = datetime.fromisoformat(args.as_of) if args.as_of else datetime.now(KST)
        overrides = json.loads(args.deadline_overrides) if args.deadline_overrides else None
        report = build_report(data, now, overrides)
    except (ValueError, TypeError) as exc:
        print(f"application status: {exc}", file=sys.stderr)
        return 1
    print(json.dumps(report, ensure_ascii=False, indent=2, default=str))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
