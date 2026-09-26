"""Read normalized JD observations; count postings, not keyword occurrences."""

import argparse
import json
from collections import defaultdict
from datetime import datetime
from pathlib import Path

SECTIONS = {"required", "preferred", "responsibility", "stack", "unspecified"}
KINDS = {"technology", "responsibility"}
ROLES = {"backend", "ai-backend", "product-engineer", "platform", "tech-lead", "other", "unknown"}


def summarize(records, role=None):
    by_id = {}
    for record in records:
        if record["schema_version"] != 1:
            raise ValueError("Unsupported observation schema")
        if record["id"] in by_id:
            raise ValueError(f"Duplicate observation ID: {record['id']}")
        if record["role_category"] not in ROLES:
            raise ValueError("Invalid role_category")
        observed = datetime.fromisoformat(record["observed_at"])
        if observed.tzinfo is None:
            raise ValueError("observed_at requires a timezone")
        for field in ("id", "company", "title"):
            if not isinstance(record[field], str) or not record[field].strip():
                raise ValueError(f"Missing {field}")
        for keyword in record["keywords"]:
            if keyword["section"] not in SECTIONS or keyword["kind"] not in KINDS:
                raise ValueError("Invalid keyword section/kind")
            if not keyword["term"].strip() or not keyword["evidence"].strip():
                raise ValueError("Keyword requires term and evidence")
        by_id[record["id"]] = record

    for record in records:
        duplicate = record.get("duplicate_of")
        if duplicate and (duplicate == record["id"] or duplicate not in by_id
                          or by_id[duplicate].get("duplicate_of")):
            raise ValueError("duplicate_of must reference an existing representative")

    scope = [r for r in records if role is None or r["role_category"] == role]
    included = [r for r in scope if not r.get("duplicate_of")]
    counts = defaultdict(lambda: {"postings": set(), "sections": defaultdict(set)})
    for record in included:
        for keyword in record["keywords"]:
            item = counts[(keyword["kind"], keyword["term"])]
            item["postings"].add(record["id"])
            item["sections"][keyword["section"]].add(record["id"])
    keywords = [
        {"kind": kind, "term": term, "count": len(item["postings"]),
         "posting_ids": sorted(item["postings"]),
         "sections": {s: len(item["sections"][s]) for s in sorted(SECTIONS)}}
        for (kind, term), item in counts.items()
    ]
    return {
        "role": role, "total_postings": len(included),
        "duplicates_excluded": len(scope) - len(included),
        "sources": [{key: r.get(key) for key in (
            "id", "url", "company", "title", "role_category", "seniority",
            "selection", "observed_at")} for r in sorted(included, key=lambda r: r["id"])],
        "keywords": sorted(keywords, key=lambda k: (-k["count"], k["kind"], k["term"])),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("observations", type=Path)
    parser.add_argument("--role", choices=sorted(ROLES))
    args = parser.parse_args()
    try:
        if args.observations.exists() and not args.observations.is_dir():
            raise ValueError("observations must be a directory")
        records = [json.loads(p.read_text()) for p in sorted(args.observations.glob("*.json"))]
        roles = [args.role] if args.role else sorted({r["role_category"] for r in records})
        result = {"overall": summarize(records, args.role),
                  "by_role": [summarize(records, role) for role in roles]}
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except (KeyError, TypeError, ValueError, OSError) as error:
        parser.exit(1, f"Invalid observation: {error}\n")


if __name__ == "__main__":
    main()
