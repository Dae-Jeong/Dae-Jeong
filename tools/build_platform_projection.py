"""Build the platform-profile projection used by the local `/_platforms` simulation page.

Reads:
  wiki/products/platform-profiles/platform-registry.yaml   (platforms, automation, live state)
  wiki/products/platform-profiles/{platform}.md            (canonical fields: `### name · N자` + ```text block)
  wiki/products/platform-profiles/live/{platform}.md       (before-snapshot in the same field structure)
  wiki/rules/copy-gates.yaml                               (banned terms, skip pattern)

Writes:
  output/platform-profiles/platforms.json

Usage: uv run --project tools python tools/build_platform_projection.py
"""

from __future__ import annotations

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
PP = ROOT / "wiki" / "products" / "platform-profiles"
GATES = ROOT / "wiki" / "rules" / "copy-gates.yaml"
OUT = ROOT / "output" / "platform-profiles" / "platforms.json"
FIELD = re.compile(r"^### (?P<name>.+?) · (?P<limit>\d+자|제한 없음)\s*\n\s*\n```text\n(?P<body>.*?)\n```", re.M | re.S)


def parse_fields(path: Path) -> dict[str, dict]:
    if not path.exists():
        return {}
    fields: dict[str, dict] = {}
    for m in FIELD.finditer(path.read_text(encoding="utf-8")):
        limit = None if m.group("limit") == "제한 없음" else int(m.group("limit").rstrip("자"))
        fields[m.group("name")] = {"text": m.group("body"), "limit": limit}
    return fields


def banned_patterns() -> list[tuple[str, re.Pattern[str]]]:
    gates = yaml.safe_load(GATES.read_text(encoding="utf-8")) or {}
    out = []
    for item in gates.get("banned_terms") or []:
        try:
            out.append((str(item["label"]), re.compile(str(item["pattern"]))))
        except (KeyError, re.error):
            continue
    return out


def hits(text: str, patterns: list[tuple[str, re.Pattern[str]]]) -> list[str]:
    return [label for label, pat in patterns if pat.search(text)]


def main() -> int:
    registry = yaml.safe_load((PP / "platform-registry.yaml").read_text(encoding="utf-8")) or {}
    patterns = banned_patterns()
    platforms = []
    for p in registry.get("platforms") or []:
        pid = p.get("id")
        canonical = parse_fields(PP / f"{pid}.md")
        live = parse_fields(PP / "live" / f"{pid}.md")
        fields = []
        for name, after in canonical.items():
            before = live.get(name, {}).get("text")
            after_len = len(after["text"].replace("\n", ""))
            fields.append(
                {
                    "name": name,
                    "limit": after["limit"],
                    "before": before,
                    "before_banned": hits(before or "", patterns),
                    "after": after["text"],
                    "after_len": after_len,
                    "after_banned": hits(after["text"], patterns),
                    "over_limit": bool(after["limit"] and after_len > after["limit"]),
                    "changed": (before or "").strip() != after["text"].strip(),
                }
            )
        platforms.append(
            {
                "id": pid,
                "name": p.get("name"),
                "url": p.get("url"),
                "status": p.get("status"),
                "live_version": p.get("live_version"),
                "live_verified_at": p.get("live_verified_at"),
                "live_checked_at": p.get("live_checked_at"),
                "drift": p.get("drift"),
                "automation": p.get("automation"),
                "fields": fields,
            }
        )
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps(
            {
                "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
                "canonical_version": registry.get("canonical_version"),
                "platforms": platforms,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    active = [p for p in platforms if p["status"] == "active"]
    n_fields = sum(len(p["fields"]) for p in active)
    n_over = sum(f["over_limit"] for p in active for f in p["fields"])
    n_after_banned = sum(bool(f["after_banned"]) for p in active for f in p["fields"])
    print(f"platform projection: wrote {OUT.relative_to(ROOT)} · active {len(active)} · fields {n_fields} · over-limit {n_over} · banned-after {n_after_banned}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
