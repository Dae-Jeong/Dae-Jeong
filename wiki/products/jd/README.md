---
type: product-contract
title: JD Product
description: 채용 JD를 수집·집계하고 profile evidence와 대조하는 local-corpus product contract.
timestamp: 2026-07-11
tags: [jd, recruiting, gap-analysis, product]
---

# JD Product

## Purpose

채용 플랫폼의 현재 JD에서 대상 직군의 요구 특징을 추출하고 [profile capabilities](../../profile/capabilities.md)와 대조한다. raw corpus는 시점 의존적이고 회사 정보가 포함되므로 local input으로만 유지한다.

최종 산출물은 두 개다:

1. **JD feature map** — 직군별 요구 특징 집계
2. **Gap map** — 내 profile 대비 강점/공백, 이력서 강조점 조정안

시점별 cross-platform 정성 분석은 [reports/2026-07-11-market-talent-signals.md](reports/2026-07-11-market-talent-signals.md)에 별도로 보존한다.

개별 공고 적용 검토:

- [토스페이먼츠 Server Developer 이력서 적합성 검토](reports/2026-08-13-toss-payments-resume-fit.md) — 공고의 문제 해결·리팩터링·비즈니스 해결 기준을 active claim에 매핑하고 경력 상한 gate를 분리했다.

## 대상 직군 (5개)

| # | 직군 쿼리 | 내 포지셔닝과의 관계 |
| --- | --- | --- |
| 1 | Backend Engineer (Python/FastAPI) | 주력 — backend credibility |
| 2 | AI Backend / LLM Engineer | 주력 — Thready/SAY 근거 |
| 3 | AI Agent Engineer / AX Engineer | 차별화 — mediness/BE Template 근거 |
| 4 | Product Engineer / Platform Engineer | 탐색 — product-system thinking 적합성 확인 |
| 5 | Tech Lead (Backend) | 선택 — 연차 요구 확인 후 판단 |

## 플랫폼 접근 방식 (2026-07-05 단순화)

우선순위 티어와 플랫폼별 크롤러 개발은 폐기한다. 두 가지 모드만 쓴다.

| 모드 | 언제 | 방법 |
| --- | --- | --- |
| 대량 통계 (feature/gap map 갱신) | 가끔 (분기 1회 수준) | `scripts/jd/collect_wanted.py` + `build_report.py` — 원티드 API, 구축 완료. 직군당 20~30건이면 충분 |
| 그때그때 인사이트 / 특정 회사 JD | 필요할 때 | Playwright MCP 등 브라우저 도구로 플랫폼 직접 탐색 — 크롤러 만들지 않는다 |

플랫폼 풀: 원티드, 점핏, 랠릿, 사람인, 로켓펀치, 그룹바이, 잡코리아, 캐치, 링크드인.

- 링크드인은 자동 수집 금지 유지 — 브라우저로 보는 것까지만.

## Flow

```text
1. 수집     플랫폼별로 직군 쿼리 검색 -> raw JD 저장 (HTML/JSON/텍스트)
2. 정규화   공통 스키마로 변환 (agent 활용)
3. 추출     JD별 특징 추출 (agent 활용)
4. 집계     직군별 빈도/패턴 집계 -> JD feature map
5. 대조     profile capabilities와 대조 -> gap map
6. 반영     resume content contract 안에서 claim 선택·순서 조정
```

## 공통 스키마 (정규화)

```yaml
platform:        # wanted | saramin | rocketpunch | groupby | linkedin
company:
title:
role_category:   # 대상 직군 1~5
tech_stack: []   # 명시된 기술
requirements: [] # 자격 요건
preferred: []    # 우대 사항
years:           # 요구 연차 (범위)
domain:          # 회사 도메인 (핀테크/헬스케어/커머스/...)
ai_agent_signals: [] # LLM/RAG/agent/MCP/AX 등 언급
posted_at:
collected_at:    # 수집 시점 기록 필수
url:
```

## 추출 축 (JD feature map)

1. **기술 스택 빈도** — 직군별 top 스택 (FastAPI/Django/Spring 비율, K8s 요구 여부 등)
2. **요구 연차 분포** — Tech Lead 지원 가능선 확인
3. **AI/agent 요구 빈도** — backend JD에서 LLM/agent 경험 우대가 얼마나 표준화됐는지
4. **우대사항 패턴** — infra/IaC, 리드 경험, 문서화, 제품 감각
5. **도메인 분포** — 헬스케어 도메인 수요 확인 (병원 SaaS 경험의 시장 가치)

각 축의 결과가 capabilities.md의 gap 가정 4개(K8s, observability 깊이, LLM evaluation/RAG, public case-study)를 검증하거나 기각한다.

## 산출물 위치

| 산출물 | 위치 |
| --- | --- |
| raw JD | `products/jd/corpus/` (플랫폼별 하위 폴더, gitignore, 로컬 전용) |
| profile skill classification | [profile-skills.json](profile-skills.json) |
| JD feature map | [reports/feature-map.md](reports/feature-map.md) |
| gap map + 이력서 조정안 | [reports/gap-map.md](reports/gap-map.md) |

## 구현 (2026-07-05)

| 구성 요소 | 위치 | 상태 |
| --- | --- | --- |
| 원티드 수집기 | `scripts/jd/collect_wanted.py` | 완료 — 직군당 20건, tag/키워드 검색 병행 |
| profile 스킬 데이터 | `products/jd/profile-skills.json` | 완료 — profile capabilities + evidence claims 기반 |
| 리포트 생성기 | `scripts/jd/build_report.py` | 완료 — reports 자동 생성 |

실행: `uv run python scripts/jd/collect_wanted.py 20 && uv run python scripts/jd/build_report.py`

구현 노트:

- 원티드 검색 API는 다단어 한글 쿼리에서 0건 반환 — 단일 키워드 또는 tag 검색(`tag:899` = 파이썬 개발자)을 쓴다.
- 추출은 키워드 regex 매칭 (결정적, 재실행 가능). LLM 정규화는 필요해지면 추가 — 미리 짓지 않는다.

## 실행 단계

1. **Phase 1 — 수집**: 원티드 완료. 추가 플랫폼 크롤러는 만들지 않는다 — 필요하면 브라우저로 직접 본다.
2. **Phase 2 — 추출/집계**: `build_report.py`로 자동화 완료.
3. **Phase 3 — gap map**: [reports/gap-map.md](reports/gap-map.md) 생성 완료. 결과는 [resume content contract](../resume/content-contract.md)를 변경하지 않고 claim 선택과 강조 순서에만 반영.

## 원칙

- 수집 시점을 기록한다 (JD는 휘발성).
- 링크드인은 자동 수집하지 않는다.
- 특징 추출은 실측 빈도 기반으로만 말한다 — "요즘 트렌드" 같은 인상 서술 금지.
- 외부 seed가 필요하면 local source root를 통해 corpus에 넣고 개인 PC 절대경로를 active 문서에 기록하지 않는다.
