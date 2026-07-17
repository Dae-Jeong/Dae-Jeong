#!/usr/bin/env python3
"""Local JD corpus를 집계해 feature map과 gap map을 생성한다.

사용법: uv run python scripts/jd/build_report.py
"""
import json
import re
from collections import Counter
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PRODUCT = ROOT / "wiki" / "products" / "jd"
CORPUS = PRODUCT / "corpus"
PROFILE = json.loads((PRODUCT / "profile-skills.json").read_text(encoding="utf-8"))
FEATURE_MAP = PRODUCT / "reports" / "feature-map.md"
GAP_MAP = PRODUCT / "reports" / "gap-map.md"

CORE_ROLES = {"backend-python", "ai-backend-llm", "ai-agent-ax"}

SKILL_PATTERNS = {
    "Python": r"python|파이썬",
    "FastAPI": r"fastapi",
    "Django": r"django|장고",
    "Flask": r"flask",
    "NestJS": r"nest\.?js",
    "Node.js": r"node\.?js",
    "TypeScript": r"typescript|타입스크립트",
    "Java/Spring": r"\bjava\b|spring|스프링",
    "Kotlin": r"kotlin|코틀린",
    "Go": r"\bgolang\b|\bgo 언어|\bgo\b(?= ?[,/)])",
    "PostgreSQL": r"postgre",
    "MySQL": r"mysql",
    "MongoDB": r"mongo",
    "Redis": r"redis",
    "Elasticsearch": r"elasticsearch|opensearch",
    "RabbitMQ": r"rabbitmq",
    "Kafka": r"kafka|카프카",
    "Celery": r"celery",
    "Docker": r"docker|도커",
    "Kubernetes": r"kubernetes|k8s|쿠버네티스|\beks\b|\bgke\b|\baks\b",
    "Terraform": r"terraform|테라폼",
    "IaC": r"\biac\b|infrastructure as code",
    "AWS": r"\baws\b|amazon web",
    "GCP": r"\bgcp\b|google cloud",
    "Azure": r"azure",
    "CI/CD": r"ci/?cd|github actions|jenkins|argocd",
    "MSA": r"\bmsa\b|마이크로서비스|microservice",
    "DDD": r"\bddd\b|도메인 주도|domain[- ]driven",
    "gRPC": r"grpc",
    "GraphQL": r"graphql",
    "WebSocket": r"websocket|웹소켓",
    "SSE": r"\bsse\b|server[- ]sent",
    "LLM 연동": r"\bllm\b|large language|거대 ?언어|생성형 ?ai|genai|\bgpt\b|claude|gemini|openai",
    "RAG": r"\brag\b|retrieval[- ]augmented|검색 ?증강",
    "LangChain": r"langchain",
    "LangGraph": r"langgraph",
    "MCP": r"\bmcp\b|model context protocol",
    "AI Agent": r"\bagent\b|에이전트|agentic",
    "프롬프트 엔지니어링": r"프롬프트|prompt",
    "LLM 평가": r"llm ?평가|모델 ?평가|eval(uation)? ?(pipeline|system)?|벤치마크|benchmark",
    "파인튜닝": r"파인 ?튜닝|fine[- ]?tun|\bsft\b|\blora\b",
    "Vector DB": r"vector ?(db|store|search)|벡터|임베딩|embedding|pinecone|qdrant|milvus|pgvector",
    "STT/음성": r"\bstt\b|\btts\b|음성 ?(인식|합성)|speech",
    "Observability 도구": r"datadog|grafana|prometheus|sentry|opentelemetry|observability|관측 ?가능성",
    "Airflow": r"airflow",
    "Spark": r"spark",
}
COMPILED = {k: re.compile(v, re.I) for k, v in SKILL_PATTERNS.items()}
AI_SIGNAL = re.compile(
    r"llm|rag|\bagent\b|에이전트|agentic|생성형|genai|프롬프트|prompt|langchain|langgraph"
    r"|\bmcp\b|파인 ?튜닝|fine-?tun|sllm|벡터|vector db|임베딩|embedding",
    re.I,
)


def years_bucket(annual_from):
    if annual_from in (None, 0):
        return "신입/무관"
    if annual_from <= 2:
        return "1~2년+"
    if annual_from <= 5:
        return "3~5년+"
    return "6년+"


def scan(text: str) -> set:
    return {name for name, pat in COMPILED.items() if pat.search(text)}


def analyze(jd: dict) -> dict:
    req_text = jd.get("requirements") or ""
    pref_text = jd.get("preferred") or ""
    all_text = "\n".join(
        [jd.get("title") or "", req_text, pref_text, jd.get("main_tasks") or ""]
        + [str(t) for t in (jd.get("skill_tags") or [])]
    )
    return {
        "required": scan(req_text),
        "preferred": scan(pref_text),
        "all": scan(all_text),
        "ai_signal": bool(AI_SIGNAL.search(all_text)),
        "years": years_bucket(jd.get("annual_from")),
        "industry": jd.get("industry") or "미상",
    }


def top_table(req: Counter, pref: Counter, allc: Counter, n=15) -> str:
    rows = ["| Skill | 자격요건 | 우대 | 전체 언급 |", "| --- | --- | --- | --- |"]
    for name, total in allc.most_common(n):
        rows.append(f"| {name} | {req.get(name, 0)} | {pref.get(name, 0)} | {total} |")
    return "\n".join(rows)


def main():
    jds = [json.loads(p.read_text(encoding="utf-8")) for p in sorted(CORPUS.rglob("*.json"))]
    if not jds:
        raise SystemExit("jd-corpus가 비어 있음 — collect_wanted.py 먼저 실행")
    today = date.today().isoformat()
    collected = sorted({jd.get("collected_at", "")[:10] for jd in jds if jd.get("collected_at")})

    roles: dict[str, list] = {}
    for jd in jds:
        roles.setdefault(jd["role_category"], []).append(jd)

    # ---- 12: feature map ----
    out = [
        "---",
        "type: jd-feature-map",
        "title: JD Feature Map",
        "description: 채용 플랫폼 JD의 직군별 요구 특징 집계 (scripts/jd/build_report.py 자동 생성).",
        f"timestamp: {today}",
        "tags: [jd, feature-map, auto-generated]",
        "---",
        "",
        "# JD Feature Map",
        "",
        f"- 생성일: {today} / 수집일: {', '.join(collected)}",
        f"- 표본: 총 {len(jds)}건 ({', '.join(f'{r} {len(v)}건' for r, v in sorted(roles.items()))})",
        "- 재생성: `uv run python scripts/jd/build_report.py`",
        "- ⚠️ 특정 시점 표본 기반 — 트렌드 일반화 주의.",
        "",
    ]
    core_analyzed = {}
    for role, items in sorted(roles.items()):
        req, pref, allc, years, industries = Counter(), Counter(), Counter(), Counter(), Counter()
        ai_n = 0
        for jd in items:
            a = analyze(jd)
            if role in CORE_ROLES:
                core_analyzed[jd["id"]] = a
            req.update(a["required"])
            pref.update(a["preferred"])
            allc.update(a["all"])
            years[a["years"]] += 1
            industries[a["industry"]] += 1
            ai_n += a["ai_signal"]
        out += [
            f"## {role} ({len(items)}건)",
            "",
            top_table(req, pref, allc),
            "",
            f"- 요구 연차 분포: {dict(years.most_common())}",
            f"- AI/LLM/agent 신호 포함 JD: {ai_n}/{len(items)} ({ai_n * 100 // len(items)}%)",
            f"- 상위 도메인: {', '.join(f'{k}({v})' for k, v in industries.most_common(5))}",
            "",
        ]
    FEATURE_MAP.write_text("\n".join(out), encoding="utf-8")

    # ---- 13: gap map (주력 직군 합산, JD id 기준 dedupe) ----
    demand = Counter()
    for a in core_analyzed.values():
        for s in a["required"]:
            demand[s] += 2
        for s in a["preferred"]:
            demand[s] += 1
    skills = PROFILE["skills"]
    buckets = {"strong": [], "partial": [], "none": []}
    for name, score in demand.most_common():
        status = skills.get(name)
        if status in buckets:
            buckets[status].append((name, score))

    gap = [
        "---",
        "type: jd-gap-map",
        "title: JD Gap Map",
        "description: 주력 직군 JD 수요 대비 profile 스킬 gap 리포트 (scripts/jd/build_report.py 자동 생성).",
        f"timestamp: {today}",
        "tags: [jd, gap-map, auto-generated]",
        "---",
        "",
        "# JD Gap Map",
        "",
        f"- 생성일: {today} / 주력 직군(backend-python, ai-backend-llm, ai-agent-ax) 고유 JD {len(core_analyzed)}건 기준",
        "- 수요 점수 = 자격요건 언급 x2 + 우대 언급 x1",
        "- 스킬 보유 판정 근거: `wiki/products/jd/profile-skills.json` (profile capabilities + evidence claims)",
        "",
        "## 1. Gap — 수요는 있는데 근거 없는 스킬 (보완 우선순위)",
        "",
        "| Skill | 수요 점수 |",
        "| --- | --- |",
    ]
    gap += [f"| {n} | {s} |" for n, s in buckets["none"]] or ["| (없음) | - |"]
    gap += [
        "",
        "## 2. Partial — 경험은 있으나 깊이/근거 보강 필요",
        "",
        "| Skill | 수요 점수 |",
        "| --- | --- |",
    ]
    gap += [f"| {n} | {s} |" for n, s in buckets["partial"]] or ["| (없음) | - |"]
    gap += [
        "",
        "## 3. Strong — 수요와 겹치는 강점 (이력서 강조 순서)",
        "",
        "| Skill | 수요 점수 |",
        "| --- | --- |",
    ]
    gap += [f"| {n} | {s} |" for n, s in buckets["strong"]] or ["| (없음) | - |"]

    def verdict(name):
        score = demand.get(name, 0)
        return f"수요 점수 {score} — {'실측 확인됨 (보완 필요)' if score >= 10 else '수요 낮음 (우선순위 하향 가능)' if score < 5 else '중간 수요'}"

    gap += [
        "",
        "## 4. capabilities.md 가정 검증",
        "",
        "| 가정 (JD scraping 전) | 실측 결과 |",
        "| --- | --- |",
        f"| Kubernetes가 platform/infra 직군 gap일 것 | {verdict('Kubernetes')} |",
        f"| Observability 깊이 보강 필요할 것 | {verdict('Observability 도구')} |",
        f"| LLM evaluation/RAG가 AI 직군 gap일 것 | RAG {verdict('RAG')} / LLM 평가 {verdict('LLM 평가')} / Vector DB {verdict('Vector DB')} |",
        "| public case-study 부재 | JD로 검증 불가 — 홈페이지/블로그로 해소 (별도 트랙) |",
        "",
        "## 5. 부족한 정보 (스킬 외 — 수동 관리 항목)",
        "",
        "- [x] 학력/자격 정보 — `wiki/profile/credentials.md`에서 관리",
        "- [x] 수상/특허 public source — credentials claim registry에서 관리",
        "- [ ] 공개 포트폴리오/GitHub 링크 (BE Template은 org private — 대체 증빙 필요)",
        "- [x] provider 실명 비공개 — public-safety rule로 고정",
        "",
        "## 6. 표본 한계",
        "",
        "- 원티드 단일 플랫폼 표본 — 사람인/로켓펀치/그룹바이 추가 시 재실행.",
        "- 키워드 매칭 기반 — 문맥(예: '우대'인지 '필수'인지 모호한 서술)은 반영 한계.",
    ]
    GAP_MAP.write_text("\n".join(gap), encoding="utf-8")
    print(f"생성 완료: {FEATURE_MAP.name}, {GAP_MAP.name} (표본 {len(jds)}건)")


if __name__ == "__main__":
    main()
