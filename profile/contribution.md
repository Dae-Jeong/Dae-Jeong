---
type: profile
title: Contribution
description: Company project contribution framing and confidence levels.
timestamp: 2026-07-02
tags: [contribution, company-work, evidence]
---

# Contribution

## Contribution Model

기여도는 code line count가 아니라 5축으로 본다.

| Axis | Meaning |
| --- | --- |
| Backend Capability | API, domain, auth, async worker, realtime event를 구현/설계할 수 있음 |
| AI Backend Capability | LLM/STT/provider/runtime 품질 문제를 backend system으로 다룰 수 있음 |
| Infra Capability | 시스템을 배포/운영 가능한 형태로 가져갈 수 있음 |
| Product/System Thinking | 기술을 제품 운영 문제와 연결할 수 있음 |
| Agent/AX Capability | 반복 병목을 agent-readable process로 바꿀 수 있음 |

## Top Evidence Clusters

| Cluster | Contribution Framing | Strongest Axis | Confidence |
| --- | --- | --- | --- |
| thready | main AI content operation product with backend, frontend, generation quality, observability, release QA, docs/tasks workflow | AI Backend, Product, Agent/AX | High — Git 확인 (2026-07-05): 1204/1482 (81%), backend 전면 재구축(2026-05-14 v1.1.0 backend-new cutover, DDD) + 이후 개발·운영 전담 |
| BAY-BE-API | FastAPI backend ownership across order, inventory, alimtalk, worker, CI/test/docs flow | Backend | High — Git 확인 (2026-07-04): 856/1136 (75%), 영역별 커밋 확인 |
| NEXUS | 외부 피부과 병원 외주: multi-brand product backend monorepo, docs/tasks evidence layer, migration flow, agent routing structure | Backend, Product, Agent/AX | High — Git 확인 (2026-07-04): 755/965 (78%) |
| SAY-BE-API / PROTON | realtime AI consultation backend, STT/LLM provider lifecycle, WebSocket/RAG/quality fixes | AI Backend, Backend | High — Git 확인 (2026-07-04): SAY 430/973 공동 주 기여, PROTON 418/645 (65%). cluster 단위 서술 |
| Infra repos | Azure/Terraform B2B/B2C/NEXUS infra, resource separation, App Service/ACR/deploy docs | Infra, Product | High — Git 확인 (2026-07-04): B2C/NEXUS-infra 단독(100%), 메인 INFRA 공동(96/223, runbook 중심) |

## Supporting Projects

| Project | Contribution Framing | Use In Resume |
| --- | --- | --- |
| RAY-BE-API | Centurion 스케줄·공간 관리 feature backend — 주 기여자 (Git 확인 2026-07-04: 128/193 commits — 시설 현황 조회 성능 최적화, 긴급 호출 정렬, BAY 연동, RabbitMQ/migration) | Centurion product structure |
| SSO-BE-API | multi-service auth/session policy 참여: JWT, Redis/JTI, duplicate login, E2E (Git 확인 2026-07-04: 90/189 공동 기여 2위 — "구축" 표현 금지) | backend depth |
| CENTURION-BE-API | legacy NestJS multi-module backend and reservation/domain fixes | platform history |
| CENTURION_DAY | Centurion CRM feature(DAY): FastAPI/Next product backend monorepo, reservation policy, BE/FE integration, release planning (Git 확인 2026-07-04: 203/465 최다 기여, BE 92/FE 86/docs 62) | full-stack product-system depth |
| CENTURION-API-GATEWAY | route/auth/CORS/WebSocket proxy integration | gateway/integration |
| CENTURION-CHARTY | AI/FE/BE integration, pricing/search fixes, Azure CD workflow | AI surface integration |
| PROTON-BACKOFFICE | Azure Functions/LangChain consultation analysis, storage integration, daily summary backfill | serverless AI operations |
| centurion-linky | backend environment, DI/TaskIQ conventions, CD pipeline, agent-readable backend docs | backend governance |
| centurion_mso | BAY/admin DB unification impact analysis and migration planning docs | product-system planning |
| Selly | backend STG/Prod deploy workflow and runbook | deploy/runbook evidence |
| thedaylabs-infra | Terraform/Azure Blob/VM/Docker deployment and network rule setup | infra breadth |
| thedaylabs-mso | AI chat tooling, citation UI, streaming/cache performance, STG infra, QA gates | AX/internal tooling |
| mediness (agentspace) | 제품팀 운영 control-plane: 7~8개 제품 파이프라인 registry, daily briefing agent, decision/spec/work/release-gate 체계 구축·운영 | Agent/AX flagship, team-lead evidence |
| MEDISOLVEAI-BE-TEMPLATE | 조직 표준 FastAPI 템플릿 설계·구축 (Git 확인 2026-07-04: 96/97 commits): 계층형 아키텍처, DI, ADR 27건, 컨벤션/runbook, agent context system 내장 | backend governance + AX bridge |
| feynman_api | Stripe/prepayment, refund, mileage, payment rollback, happy-call query/template/migration | prior company evidence |

## Ignored / Deprioritized Evidence

| Project | Reason |
| --- | --- |
| PCS-BE-API | User-deprioritized for resume/homepage positioning |
| say-game-be | User-deprioritized for resume/homepage positioning |

## Public Contribution Copy

> MediSolve AI에서 product backend와 AI product의 backend/infra를 다루며 SSO, async worker, realtime event, AI provider lifecycle, Azure/Terraform deployment flow를 구축/정리했습니다. 이 경험을 바탕으로 요구사항, 문서, 코드, 디자인 handoff, 운영 절차를 agent가 읽고 실행 가능한 구조로 바꾸는 AX workflow에 관심을 두고 있습니다.

## Claim Ladder

Public resume나 홈페이지에서는 아래 순서로 claim을 확장한다.

1. Backend credibility: FastAPI/NestJS, auth, async worker, realtime event, gateway.
2. AI backend credibility: STT/LLM provider, WebSocket consultation, generation quality/observability, serverless AI analysis in the SAY cluster.
3. Infra credibility: Azure/Terraform, App Service/ACR, environment/resource separation.
4. AX differentiation: `AGENTS.md`, wiki/docs/tasks, evidence gates, design handoff, OpenDesign direction.

Avoid:

- "단독 구축"
- "성능 N배 개선"
- "무중단 배포"
- exact client, credential, cost, resource, security details

## Confidence Rules

- `High`: repo doc/code/Git/PR/운영 문서로 직접 확인됨.
- `Medium`: 구조는 확인됐지만 직접 기여 범위는 추가 확인 필요.
- `Low`: 기존 이력서나 기억 기반.
- `Unknown`: 확인되지 않음.

Public resume에는 `High`와 신중한 `Medium`만 사용한다.

## Next Verification

1. ~~Git history/PR 기준으로 직접 작성/리드 범위를 확인한다.~~ 완료 (2026-07-04) — 주요 repo 커밋 점유율/영역별 커밋 확인, 각 cluster confidence와 09 draft의 claim strength 표에 반영.
2. 회사명(MediSolve AI)과 제품명(Thready, Centurion + BAY/RAY/SAY feature 구성)은 공개 확정 (2026-07-04). 고객/브랜드명 공개 범위를 정한다.
3. 성능, 안정성, 운영 개선 수치는 로그나 benchmark가 있을 때만 쓴다.
