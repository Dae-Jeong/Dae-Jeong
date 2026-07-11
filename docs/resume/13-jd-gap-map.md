---
type: jd-gap-map
title: JD Gap Map
description: 주력 직군 JD 수요 대비 profile 스킬 gap 리포트 (scripts/jd/build_report.py 자동 생성).
timestamp: 2026-07-05
tags: [jd, gap-map, auto-generated]
---

# JD Gap Map

- 생성일: 2026-07-05 / 주력 직군(backend-python, ai-backend-llm, ai-agent-ax) 고유 JD 60건 기준
- 수요 점수 = 자격요건 언급 x2 + 우대 언급 x1
- 스킬 보유 판정 근거: `scripts/jd/profile_skills.json` (capabilities.md + claim strength 표)

## 1. Gap — 수요는 있는데 근거 없는 스킬 (보완 우선순위)

| Skill | 수요 점수 |
| --- | --- |
| Kubernetes | 21 |
| Vector DB | 18 |
| 파인튜닝 | 11 |
| GCP | 8 |
| Django | 8 |
| Flask | 6 |
| Kafka | 4 |
| gRPC | 4 |
| MongoDB | 4 |
| Go | 3 |
| Kotlin | 3 |
| Airflow | 3 |
| Elasticsearch | 1 |

## 2. Partial — 경험은 있으나 깊이/근거 보강 필요

| Skill | 수요 점수 |
| --- | --- |
| RAG | 39 |
| AWS | 23 |
| TypeScript | 18 |
| LangGraph | 15 |
| Java/Spring | 14 |
| LangChain | 13 |
| Node.js | 10 |
| Observability 도구 | 7 |
| MySQL | 7 |
| MSA | 2 |
| Celery | 1 |

## 3. Strong — 수요와 겹치는 강점 (이력서 강조 순서)

| Skill | 수요 점수 |
| --- | --- |
| LLM 연동 | 89 |
| Python | 73 |
| AI Agent | 55 |
| Docker | 23 |
| 프롬프트 엔지니어링 | 21 |
| CI/CD | 16 |
| LLM 평가 | 14 |
| FastAPI | 12 |
| MCP | 11 |
| PostgreSQL | 8 |
| Azure | 8 |
| NestJS | 5 |
| SSE | 4 |
| Redis | 4 |
| WebSocket | 3 |
| RabbitMQ | 2 |
| Terraform | 2 |
| IaC | 1 |
| STT/음성 | 1 |

## 4. capabilities.md 가정 검증

| 가정 (JD scraping 전) | 실측 결과 |
| --- | --- |
| Kubernetes가 platform/infra 직군 gap일 것 | 수요 점수 21 — 실측 확인됨 (보완 필요) |
| Observability 깊이 보강 필요할 것 | 수요 점수 7 — 중간 수요 |
| LLM evaluation/RAG가 AI 직군 gap일 것 | RAG 수요 점수 39 — 실측 확인됨 (보완 필요) / LLM 평가 수요 점수 14 — 실측 확인됨 (보완 필요) / Vector DB 수요 점수 18 — 실측 확인됨 (보완 필요) |
| public case-study 부재 | JD로 검증 불가 — 홈페이지/블로그로 해소 (별도 트랙) |

## 5. 부족한 정보 (스킬 외 — 수동 관리 항목)

- [ ] 학력/자격 정보 — 현재 profile 문서에 없음
- [ ] STUDIO LAB 수상/특허 public source 검증
- [ ] 공개 포트폴리오/GitHub 링크 (BE Template은 org private — 대체 증빙 필요)
- [ ] provider 실명(Gemini 등) 공개 여부 확정

## 6. 표본 한계

- 원티드 단일 플랫폼 표본 — 사람인/로켓펀치/그룹바이 추가 시 재실행.
- 키워드 매칭 기반 — 문맥(예: '우대'인지 '필수'인지 모호한 서술)은 반영 한계.