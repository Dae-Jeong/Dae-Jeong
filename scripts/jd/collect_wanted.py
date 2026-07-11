#!/usr/bin/env python3
"""원티드 JD 수집기 — 직군별 쿼리로 검색하고 상세 JD를 jd-corpus에 저장한다.

사용법: python3 scripts/jd/collect_wanted.py [직군당 수집 건수, 기본 20]
"""
import json
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BASE = "https://www.wanted.co.kr/api/v4"
HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}
CORPUS = Path(__file__).resolve().parents[2] / "docs" / "resume" / "jd-corpus" / "wanted"

# 직군 정의는 docs/resume/11-jd-analysis-flow.md 를 따른다.
# 원티드 검색은 다단어 한글 쿼리에서 0건을 반환하므로 단일 키워드 또는 tag 검색(tag:<id>)을 쓴다.
# tag 899 = 파이썬 개발자 직군.
ROLE_QUERIES = {
    "backend-python": ["tag:899", "백엔드 개발자", "FastAPI"],
    "ai-backend-llm": ["LLM", "AI 엔지니어"],
    "ai-agent-ax": ["AI Agent", "AI 에이전트", "AX 엔지니어"],
    "product-platform": ["플랫폼 엔지니어", "Product Engineer"],
    "tech-lead": ["Tech Lead", "리드 개발자", "백엔드 리드"],
}


def get_json(url: str):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read().decode())


def search(query: str, limit: int):
    if query.startswith("tag:"):
        url = f"{BASE}/jobs?country=kr&tag_type_ids={query[4:]}&years=-1&limit={limit}&job_sort=job.latest_order"
    else:
        q = urllib.parse.quote(query)
        url = f"{BASE}/jobs?query={q}&country=kr&years=-1&limit={limit}&job_sort=job.latest_order"
    try:
        return get_json(url).get("data", [])
    except Exception as e:  # noqa: BLE001
        print(f"  search 실패 ({query}): {e}", file=sys.stderr)
        return []


def fetch_detail(job_id: int):
    try:
        d = get_json(f"{BASE}/jobs/{job_id}")
        return d.get("job", d)
    except Exception as e:  # noqa: BLE001
        print(f"  detail 실패 ({job_id}): {e}", file=sys.stderr)
        return None


def main():
    per_role = int(sys.argv[1]) if len(sys.argv) > 1 else 20
    collected_at = datetime.now(timezone.utc).isoformat()
    for role, queries in ROLE_QUERIES.items():
        out = CORPUS / role
        out.mkdir(parents=True, exist_ok=True)
        seen: set[int] = set()
        saved = 0
        for query in queries:
            if saved >= per_role:
                break
            for item in search(query, per_role):
                if saved >= per_role:
                    break
                jid = item["id"]
                if jid in seen:
                    continue
                seen.add(jid)
                path = out / f"{jid}.json"
                if path.exists():
                    saved += 1
                    continue
                time.sleep(0.25)
                job = fetch_detail(jid)
                if not job:
                    continue
                det = job.get("detail") or {}
                company = job.get("company") or {}
                record = {
                    "platform": "wanted",
                    "role_category": role,
                    "query": query,
                    "id": jid,
                    "url": f"https://www.wanted.co.kr/wd/{jid}",
                    "company": company.get("name"),
                    "industry": company.get("industry_name"),
                    "title": job.get("position"),
                    "annual_from": job.get("annual_from"),
                    "annual_to": job.get("annual_to"),
                    "skill_tags": [t.get("title") or t.get("text") for t in (job.get("skill_tags") or [])],
                    "requirements": det.get("requirements") or "",
                    "preferred": det.get("preferred_points") or "",
                    "main_tasks": det.get("main_tasks") or "",
                    "intro": det.get("intro") or "",
                    "collected_at": collected_at,
                }
                path.write_text(json.dumps(record, ensure_ascii=False, indent=1), encoding="utf-8")
                saved += 1
        print(f"{role}: {saved}건 저장")


if __name__ == "__main__":
    main()
