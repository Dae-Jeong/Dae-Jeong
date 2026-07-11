---
type: homepage-content-draft
title: Profile Homepage Public Content Draft
description: Public-facing draft content for the profile homepage and Visitor Profile Chat before moving into the web app.
timestamp: 2026-07-04
tags: [homepage, profile, resume, strengths, visitor-profile-chat, public-draft]
---

# Profile Homepage Public Content Draft

## Purpose

이 문서는 김대정 profile homepage에 옮기기 전, 공개 페이지에 들어갈 이력/강점/프로젝트/agent 활용 내용을 한 번 압축한 초안이다.

이 문서는 아직 최종 공개 문구가 아니다. 아래 내용을 `apps/profile-homepage/content/profile/`로 옮기기 전에는 공개 가능 범위와 claim 강도를 다시 확인한다.

## Source Basis

| Source | Use |
| --- | --- |
| [../../profile/identity.md](../../profile/identity.md) | headline, bio, positioning |
| [../../profile/career.md](../../profile/career.md) | career timeline, project anchors |
| [../../profile/capabilities.md](../../profile/capabilities.md) | capability map and strengths |
| [../../profile/contribution.md](../../profile/contribution.md) | project contribution framing and confidence |
| [../../profile/agent-workflow.md](../../profile/agent-workflow.md) | agent/AX narrative |
| [../../profile/writing.md](../../profile/writing.md) | writing categories and article backlog |
| [06-strengths-and-traits.md](06-strengths-and-traits.md) | synthesized strengths and public positioning guardrails |
| [06-impact-case-candidates.md](06-impact-case-candidates.md) | project case candidates |

## Public Positioning

### One-Line

> 제품의 복잡한 운영 문제를 backend architecture와 agent-readable workflow로 풀어내는 엔지니어.

### Slightly Stronger Version

> AI product와 product backend의 복잡한 운영 문제를 backend/infra system으로 풀고, 그 실행 과정을 agent-readable workflow로 구조화하는 엔지니어.

### English

> Backend and AI systems engineer who turns complex product operations into reliable backend/infra systems and agent-readable workflows.

## Hero Copy

```text
김대정
Backend Architect for Product Systems and Agentic Workflows

AI product와 product backend를 운영 가능한 시스템으로 만드는 엔지니어입니다.
FastAPI/NestJS 기반 backend, AI product runtime, async worker, realtime event, Azure/Terraform infra를 다뤄왔고,
최근에는 AI agent를 코드 생성 도구가 아니라 조직의 지식과 실행을 연결하는 AX layer로 확장하는 데 집중하고 있습니다.
```

## Short Bio

저는 FastAPI/NestJS 기반 backend, AI product runtime, Azure/Terraform infra를 다뤄온 backend/AI systems engineer입니다.

SSO, RabbitMQ/TaskIQ, WebSocket/SSE, STT/LLM provider lifecycle, Terraform, GitHub Actions 같은 시스템을 다루며 기술 문제뿐 아니라 요구사항, 문서, QA, 운영 절차가 어긋날 때 생기는 조직 병목을 자주 봤습니다.

그래서 AI agent를 단순 coding assistant가 아니라, 제품 문서와 코드, 디자인 handoff, 테스트/운영 명령을 이어주는 AX layer로 보고 있습니다.

## Career Summary

| Period | Organization | Public Role | Public Summary |
| --- | --- | --- | --- |
| 2025.04 ~ 현재 | MediSolve AI | Backend Engineer -> Tech Lead / PO & AI Agent Engineer | 외주 프로젝트 NEXUS(병원 backend)와 자사 제품 Thready(AI 콘텐츠 생성)·Centurion(CRM & ERP)의 backend/AI backend/infra를 담당. AI 전환에 따라 PO & AI agent engineer 역할을 병행하며 제품팀의 일정/이슈/릴리스 운영을 리드하고 제품 기획 결정에 참여 |
| 2024.11 ~ 2025.01 | Memento AI | Backend Engineer | payment/refund/reservation correctness와 backend migration work 수행 |
| 2024.10 ~ 2024.11 | Memento AI | Backend Engineer & PM Intern | backend execution과 PM/product context를 함께 경험 |
| 2021.12 ~ 2023.12 | STUDIO LAB | AI Engineer -> PM -> Backend Engineer | AI/product/PM/backend 흐름을 거치며 product-system 관점 형성 |
| 2024.01 ~ 2024.12 | Personal Project | Backend Lead / Infra Owner | backend와 infra ownership 기반 개인 프로젝트 수행 |

Role evolution note (2026-07-04 user 확인):

- backend engineer로 합류했지만, AI 발전에 따라 PO & AI agent engineer 역할을 병행하게 됐다.
- 서비스 방향성과 제품 기획 기여를 public copy에 포함한다. STUDIO LAB의 `AI engineer -> PM -> backend engineer` 흐름이 우회가 아니라 현재 역할로 다시 연결되는 서사로 쓴다.
- 공개 표기는 "PO입니다"가 아니라 "PO & AI agent engineer 역할을 병행"으로 쓴다 (공식 직함과의 충돌 방지).
- 근거 확보됨 (2026-07-04, `~/agentspace/mediness*` 확인): 7~8개 제품의 파이프라인 registry(6단계 stage, 배포/출시 예정일, 담당자), daily briefing(Slack/Jira/Confluence/GitHub 자동 집계, 2026-05~07 40여 건), 제품별 decision log(제품당 25~49건, 결정일 명시), SPEC/Work Package/Release Gate/version cut 체계, 당일 블로커 해결 사례(생성 품질 이슈 -> 당일 수정 배포 결정·확인).
- 표현 가드레일: 기획 전담자(PO/기획)와 CEO가 별도로 존재하므로 "제품 기획 주도"가 아니라 "제품 운영(일정·이슈·릴리스) 리드 + 기획 결정 참여"로 쓴다. 팀원 실명/고객사명/내부 수치는 공개 카피에 넣지 않는다.

## Strengths

### 1. AI Product Engineering Beyond Prompt Usage

AI를 단순히 prompt layer에만 두지 않고 backend runtime, provider lifecycle, evaluation, observability, quality workflow로 다룬다.

Evidence:

- AI content generation runtime, prompt builder, LLM judge, evaluation loop, observability work.
- STT/LLM provider lifecycle, realtime consultation session, translation/audio pipeline work.
- Serverless AI analysis and internal AX tooling experience.

Public angle:

> AI product behavior를 prompt 감각이 아니라 backend/runtime/quality problem으로 다룬다.

### 2. Backend Systems Ownership

CRUD 기능 구현을 넘어 domain boundary, auth/session, async worker, realtime event, gateway integration, test/documentation layer를 함께 다룬다.

Evidence:

- FastAPI/NestJS services.
- SSO/JWT/Redis/JTI session policy.
- RabbitMQ/TaskIQ worker separation.
- WebSocket/SSE event flow.
- API Gateway / service integration.
- 조직 표준 FastAPI backend template 설계·구축 (계층형 아키텍처/DI/ADR 27건/컨벤션/runbook).

Public angle:

> domain API, async worker, auth/session, realtime/gateway integration, and test/documentation layers를 함께 설계하고 정리한다.

### 3. Infra-Aware Backend Execution

backend 구현에서 멈추지 않고, 배포/운영 가능한 형태까지 연결한다.

Evidence:

- Azure App Service / ACR / Docker / GitHub Actions.
- Terraform root/import/remote state, resource separation, runbook.
- STG/Prod deploy workflow and service addition guide.

Public angle:

> backend system을 배포/운영 가능한 형태로 연결하는 infra literacy가 있다.

### 4. Product-System Thinking

모호한 제품/운영 정책을 backend, frontend, QA, release, docs artifact로 구체화한다.

Evidence:

- Reservation policy -> backend judgment -> frontend display -> QA seed/test -> release docs.
- Migration/domain audit -> runbook -> implementation handoff.
- AI product quality -> generation runtime/evaluation/observability.

Public angle:

> ambiguous product/operation policies를 backend, docs, QA, and handoff artifacts로 구체화한다.

### 5. Agent-Readable Workflow / AX Orientation

AI agent를 개인 생산성 도구가 아니라 조직의 context와 실행 절차를 읽고 이어받는 layer로 본다.

Evidence:

- `AGENTS.md` routing.
- source-of-truth docs.
- confidence labels.
- task/report structure.
- mediness product operations: 파이프라인 registry, daily briefing agent, decision/spec/work/release-gate 운영.
- BE template 내장 agent context system: 계층적 CLAUDE.md, skill 자동화, Hub-and-Spoke 문서 라우팅.
- OpenDesign/spec-to-prototype handoff direction.

Public angle:

> 조직의 context와 실행 절차를 agent가 읽고 이어받을 수 있는 형태로 구조화한다.

### 6. Evidence-First Execution

강한 claim을 만들기 전에 source, confidence, public safety를 먼저 확인한다.

Evidence:

- workspace audit, project work log, impact case candidates.
- project priority and ignored/deprioritized evidence list.
- public resume guardrails.

Public angle:

> 근거 기반으로 claim을 세우고, 모호한 기여를 과장하지 않는 스타일.

## Project Highlights

Narrative (2026-07-04 확정):

- 기여 제품은 크게 3개로 표기한다: NEXUS(외주), Centurion(자사 CRM & ERP), Thready(자사 AI 콘텐츠 생성). Infra cluster는 별도 제품이 아니라 세 제품을 받치는 기반으로 설명한다.
- NEXUS(외부 피부과 병원 외주)가 먼저 진행됐고, 이후 자사 CRM & ERP 제품 Centurion이 구축됐다.
- 공개 페이지에서는 `외주로 병원 도메인 검증 -> 자사 제품 구축` 순서를 서사로 쓴다.

### 1. Thready: AI Content Generation Quality System

Public framing:

> AI 콘텐츠 생성 품질을 감각적인 prompt 수정이 아니라 pipeline, typed prompt builder, LLM judge, evaluation loop, observability로 다룬 사례.

What to say:

- AI generation runtime and prompt architecture.
- critique/revise style generation improvement.
- typed prompt builder and `source_context` contract.
- LLM judge, local evaluation sweep, benchmark/quality diagnosis.
- generation quality observation and release/QA workflow.

Draft copy:

> Thready에서 backend를 FastAPI 기반으로 전면 재구축(v1.1.0 cutover)하고 이후 개발·운영을 전담했습니다. AI 콘텐츠 생성 품질을 위해 generation pipeline, typed prompt builder, LLM judge, prompt evaluation loop, observability logging을 구축했습니다.

Confidence:

- High — Git 확인 완료 (2026-07-05): 1482 커밋 중 1204 (81%). 나머지 커밋 구성 확인: AYA 167커밋은 같은 repo에서 운영된 Studio(별도 제품) 몫이 대부분(113건 studio 명시, studio 경로 변경 612건), 최원 105커밋은 초기 v1.0.0 시기(2026-03~04)에 한정.
- 재구축 확인: 합류 첫 커밋(2026-04-14)부터 monorepo 전환 + FastAPI 스캐폴딩(layered 구조), 2026-05-14 `v1.1.0 — backend-new cutover + DDD architecture`로 backend 전면 재구축 cutover. 초기 v1.0.0 앱(루트 src/ + Supabase)은 이 과정에서 대체됨.
- 허용 표현: "backend를 FastAPI 기반으로 전면 재구축(v1.1.0 cutover)하고 이후 개발·운영을 전담". frontend는 v1.0.0 코드 이관분이 있으므로 "제품 전체 단독 구축"은 쓰지 않는다.
- 제품명(Thready) 공개는 확정 (2026-07-04). 세부 수치/고객 정보는 비노출 유지.

Use:

- Main homepage case.
- Visitor Profile Chat answer for `AI product를 어떻게 다뤘나요?`.

### 2. Centurion: CRM & ERP Product Backend

Public framing:

> MediSolve AI의 자사 CRM & ERP 제품 Centurion에서 CRM(DAY), 재고 관리(BAY), 스케줄·공간 관리(RAY), 상담 관리(SAY) feature backend와 인증/게이트웨이 platform 작업을 담당한 사례.

Product structure (public):

| Feature | Name | Public Description |
| --- | --- | --- |
| CRM | DAY | 예약/고객 관리 CRM backend와 BE/FE/QA 연결 |
| 재고 관리 | BAY | 주문/상품/재고 backend와 Alimtalk/비동기 worker flow |
| 스케줄·공간 관리 | RAY | 스케줄·공간 관리 backend, 시설 현황/긴급 호출 처리 |
| 상담 관리 | SAY | realtime AI 상담 backend와 STT/LLM provider lifecycle |

Notes:

- DAY/BAY/RAY/SAY는 별도 제품이 아니라 Centurion 하나의 제품을 구성하는 feature로 표기한다.
- 네 feature 모두 직접 기여 영역이다 (2026-07-04 user 확인). DAY/BAY/SAY는 work-log evidence가 정리돼 있고, RAY도 Git 확인 완료 (2026-07-04): 전체 193 커밋 중 128 커밋 주 기여자 — 시설 현황 조회 성능 최적화, 긴급 호출 정렬, BAY 연동, RabbitMQ/migration 작업. flagship은 아니지만 한 줄 claim은 근거 있음.
- SSO 인증/세션, API Gateway 작업은 Centurion platform supporting evidence로 쓴다. SSO는 Git 확인 결과 90/189 공동 기여(2위) — "구축" 대신 "session 정책/duplicate login/E2E 담당" 수준으로 쓴다.

#### 2-1. BAY (재고 관리): Order/Inventory/Async Worker Ownership

Public framing:

> Centurion 재고 관리 feature에서 API 처리와 실패 가능성이 큰 비동기 작업을 분리하고, worker/test/docs/onboarding까지 정리한 backend ownership 사례.

What to say:

- order/product/inventory APIs.
- TaskIQ/RabbitMQ async worker flow.
- retry handling for inventory deduction.
- API test infra and Docker CI.
- local onboarding docs and one-command Docker Compose setup.

Draft copy:

> Centurion의 재고 관리 feature(BAY) backend에서 order/product/inventory 도메인을 다루며 Alimtalk/TaskIQ/RabbitMQ 기반 worker flow, retry handling, API test infra, Docker CI, onboarding docs를 구축/정리했습니다.

Confidence:

- High — Git 확인 완료 (2026-07-04): 1136 커밋 중 856 (75%) 주 기여자. 주장 영역별 커밋: order 115, test 66(tests 경로 130), Alimtalk 38, Docker/CI 경로 81, docs/onboarding 37, TaskIQ/RabbitMQ 10, retry/재고 8.
- ownership 표현(구축/설계 주도) 사용 가능.

Use:

- Backend resume case.
- Visitor Profile Chat answer for `Backend 강점은 무엇인가요?`.

#### 2-2. SAY (상담 관리): Realtime AI Consultation Provider Lifecycle

Public framing:

> Centurion 상담 관리 feature에서 STT/LLM provider lifecycle, session stability, translation/audio pipeline, dashboard AI analysis, migration docs를 다룬 AI backend 사례.

What to say:

- STT/LLM provider lifecycle.
- realtime LLM session lifecycle/stability — zombie session 방지, reconnect race 해결 (내부 근거: Gemini Live, 공개 표기 금지).
- realtime audio/translation pipeline.
- dashboard AI analysis with structured output/fallback.
- AI infra migration docs and operational hardening.

Draft copy:

> Centurion의 상담 관리 feature(SAY)에서 realtime AI consultation backend의 STT/LLM provider lifecycle, realtime LLM 세션 안정화(zombie session/reconnect 방지), translation/audio pipeline, dashboard AI analysis, AI infra migration docs를 다뤘습니다.

Confidence:

- High — Git 확인 완료 (2026-07-04): SAY-BE-API 430/973 (taewoo 415와 공동 주 기여), PROTON 418/645 (65% 주 기여자). 영역별 커밋: PROTON에서 provider/STT 74, session 50, translation 21, Gemini 17, audio 12 / SAY-BE-API에서 dashboard 분석 42, session 19.
- 표현 가드레일: SAY-BE-API 단독으로는 "공동 주 기여" — provider lifecycle/translation/audio 주장은 PROTON 근거가 중심이므로 cluster 단위로 쓴다.
- Domain 표기는 Centurion feature로 확정 (2026-07-04). provider 실명은 비공개 확정 (2026-07-05) — 일반화 표현만 사용.

Use:

- AI backend case.
- Visitor Profile Chat answer for `AI backend 경험이 있나요?`.

#### 2-3. DAY (CRM): Reservation Policy To BE/FE/QA Execution

Public framing:

> Centurion CRM feature에서 예약 마감/운영중지/상태 필터 같은 운영 정책을 backend 판단, frontend 표시, QA seed/test, release docs로 연결한 product-system 사례.

What to say:

- reservation close/full-slot judgment on backend.
- reservation filter/status/staff consistency and cancel-release behavior.
- FE calendar/CRM detail integration and gateway routing.
- reservation domain E2E test infra, QA seed definitions, user journey scenarios.
- policy/release docs and docs-code sync.

Draft copy:

> Centurion의 CRM feature(DAY)에서 예약 마감/운영중지/상태 필터 정책을 backend 판단, frontend 표시, QA seed/test, release docs로 연결해 product policy를 실행 가능한 시스템으로 정리했습니다.

Confidence:

- Medium-High — Git 확인 완료 (2026-07-04): 465 커밋 중 203 (44%) 최다 기여자 (과반은 아님). backend 92 / frontend 86 / docs·planning 62 분포가 "BE/FE/QA 연결" claim과 일치. 예약 관련 54, QA/seed 21, release 8.

Use:

- Product-system thinking case.
- Visitor Profile Chat answer for `제품 정책을 어떻게 시스템으로 만드나요?`.

### 3. NEXUS: Product Backend Architecture And Migration Control

Public framing:

> 외부 피부과 병원 대상 외주 프로젝트에서 multi-brand product backend monorepo의 service boundary, migration/domain audit, infra control-plane, docs governance를 정리한 architecture 사례.

What to say:

- API gateway/admin/homepage API package boundaries.
- migration/domain audit and contaminated data analysis.
- runbook, reverse-engineering audit, screen/step coverage.
- IaC pipeline and Terraform drift/state docs.
- docs governance and agent-readable execution structure.

Draft copy:

> 외주 프로젝트 NEXUS에서 병원 대상 product backend monorepo의 service boundary, migration/domain audit, infra control-plane, docs governance를 정리해 backend architecture와 agent-readable execution structure를 함께 구축했습니다.

Confidence:

- High — Git 확인 완료 (2026-07-04): 965 커밋 중 755 (78%) 주 기여자.
- 성격 확정 (2026-07-04): 외부 피부과 병원 외주 프로젝트. Centurion(자사 제품)보다 먼저 진행 — 공개 서사는 `외주 경험 -> 자사 제품 구축` 순서로 쓴다.
- 고객사/브랜드명은 비공개 유지. `피부과` 도메인 명시 여부는 최종 검토 시 결정.

Use:

- Backend architecture case.
- AX/workflow bridge case.

### 4. Infra Cluster: Azure/Terraform Deployment Flow

Public framing:

> backend engineer지만 Azure/Terraform infra, B2B/B2C resource separation, deployment, remote state, runbook까지 다룬 infra-aware backend 사례.

What to say:

- Terraform roots/import/remote state.
- Azure App Service / ACR / Docker deployment flow.
- B2B/B2C resource separation.
- service addition guide and infra runbooks.
- STG/Prod deployment checklist.
- cloud-agnostic 배경: STUDIO LAB에서 AWS EC2/RDS(MySQL) 기반 서버 운용(인턴 시기) + 현 회사 AWS -> Azure 전환기 경험 (`aws branch 분리` 커밋 2025-07). IaC/컨테이너 중심이라 특정 클라우드 종속 없음.

Draft copy:

> Azure/Terraform infra repos에서 resource separation, Terraform root/import/remote state, App Service/ACR deployment flow, service addition guide, infra runbooks를 정리했습니다. AWS 경험(STUDIO LAB 구성, 현 회사 AWS -> Azure 전환기)이 있고 IaC와 컨테이너 기반으로 일하기 때문에 특정 클라우드에 종속되지 않습니다.

Confidence:

- High — Git 확인 완료 (2026-07-04): B2C-INFRA 25/25, NEXUS-infra 19/19 단독 구축. MEDISOLVEAI-INFRA는 96/223 공동 기여 (2위, runbook/docs 42 중심, Terraform 직접 작업 7).
- AWS 경험: user 확인 (2026-07-05) + `aws branch 분리` 커밋(2025-07) 근거. 전환 주도 claim은 하지 않는다 (레거시 제거/이전 계획은 동료 커밋). STUDIO LAB은 인턴 시기 EC2/RDS(MySQL) 서버 운용 (user 확인, repo 근거 없음) — "간단한 운용 경험" 수준 표현 유지.
- 표현 가드레일: "단독 구축"은 B2C/NEXUS infra에만 사용. 메인 infra monorepo는 "공동 구축 + runbook/문서화 리드"로 쓴다.
- Exact resource name 공개 범위는 여전히 확인 필요.

Use:

- Infra credibility section.
- Visitor Profile Chat answer for `Infra도 할 수 있나요?`.

### 5. MEDISOLVEAI-BE-TEMPLATE: 조직 표준 FastAPI Backend Template

Public framing:

> 회사 backend 프로젝트의 표준 FastAPI 템플릿을 설계·구축한 사례. 계층형 아키텍처, DI, 타입 안전성 같은 backend 표준에 agent 친화 컨텍스트 시스템(계층적 CLAUDE.md, skill 자동화, Hub-and-Spoke 문서 라우팅)을 내장했다.

What to say:

- Router -> Service -> Repository 계층형 아키텍처, DI 컨테이너, 제네릭 Repository, `@transactional` 데코레이터, Pyright 타입 안전성.
- ADR 27건, naming/DB 컨벤션, 응답 wrapper 4-케이스 매트릭스, ErrorCode 도메인 prefix 체계.
- 옵션화 설계: 멀티테넌트, ID 타입(UUID/Int), 인증 방식(JWT/SSO/패스스루), 스토리지(local/S3/Azure).
- migration/health-check runbook, contract test 31건 (Given-When-Then).
- agent 친화 컨텍스트 시스템: 4-tier 계층적 컨텍스트, 영역별 CLAUDE.md 자동 발동, init-project/add-domain/db-reset/local-setup skill 자동화.

Draft copy:

> 회사 backend 프로젝트의 표준이 되는 FastAPI 템플릿을 설계·구축했습니다. 계층형 아키텍처, DI, 타입 안전성, ADR/컨벤션/runbook 같은 엔지니어링 표준과 함께, 새 프로젝트에서 agent가 바로 작업할 수 있는 계층적 컨텍스트 시스템과 자동화 skill을 템플릿에 내장했습니다.

Confidence:

- High — Git 확인 완료 (2026-07-04): 97 커밋 중 96 커밋, 사실상 전담 구축.
- repo가 org private이므로 공개 증빙은 구조 설명/블로그 글로 대체.

Use:

- Backend governance + Agent/AX bridge case.
- Visitor Profile Chat answer for `조직 차원의 엔지니어링 기여가 있나요?`.

## Agent / AX Section Draft

```text
저는 AI agent를 단순히 코드 자동완성이나 질문 답변 도구로 쓰지 않습니다.
제품 문서, 코드베이스, 디자인 handoff, 테스트/운영 명령을 agent가 읽고 실행할 수 있게 구조화합니다.

Global wiki는 협업 원칙과 evidence rule을 담고, project AGENTS.md는 repo별 ownership과 실행 규칙을 담습니다.
제품 문서는 Baseline, Decision, Spec, Work Package, QA/PR evidence로 나누고,
MCP와 OpenDesign을 통해 browser, Docker, UI prototype, design artifact를 작업 흐름에 연결합니다.
```

Short version:

> AI agent를 coding assistant가 아니라 조직의 요구사항, 문서, 코드, 디자인 handoff, 운영 절차를 연결하는 AX layer로 봅니다.

Concrete artifacts to show:

- `AGENTS.md` as project operating contract.
- source-of-truth docs and current-state maps.
- task/report/work-package structure.
- evidence/confidence labels.
- mediness product operations workspace: pipeline registry, daily briefings, decision/spec/work packages, release gates.
- mediness-app style Library/Search + Visitor Profile Chat.
- OpenDesign/spec-to-prototype handoff direction.

### Product Operations Evidence (mediness)

제품팀 리드 역할(일정관리, 이슈 해결, 릴리스 관리)을 agent-readable 시스템으로 수행한 근거. Agent/AX 섹션의 핵심 실물 사례로 쓴다.

What to say:

- 7~8개 제품의 기획 -> 개발 -> QA -> 배포 -> 출시 파이프라인을 단일 registry로 관제.
- Slack/Jira/Confluence/GitHub 활동을 agent가 매일 수집·요약하는 daily briefing으로 blocker triage.
- 제품별 decision log, SPEC, Work Package, Release Gate, version cut 체계 설계·운영.
- WP 단위 owner/기간/blocker 추적과 병렬 작업 분리 설계.
- 당일 블로커 해결: 품질 이슈 감지 -> 당일 수정 배포 결정·확인.

Draft copy:

> 제품팀 리드로서 여러 제품의 일정, 이슈, 릴리스를 관리했습니다. 이 리드 업무를 회의와 기억에 의존하는 방식이 아니라, agent가 매일 Slack/Jira/GitHub 활동을 수집·요약하는 briefing과 제품별 decision/spec/work 문서 파이프라인으로 시스템화해서 운영했습니다.

Confidence:

- High for workspace evidence (`~/agentspace/mediness*`).
- 공개 시 팀원 실명, 고객사명, 내부 수치는 제외.

Use:

- Agent/AX 섹션의 대표 사례.
- Visitor Profile Chat answer for `팀 리드 경험이 있나요?`.

## Writing Section Draft

Writing is not a generic blog. It is a public proof layer for backend, product systems, agent workflow, and AX.

Categories:

| Category | Public Description |
| --- | --- |
| Backend Architecture | auth, async messaging, realtime events, infra-aware backend |
| AI Product Engineering | provider lifecycle, generation quality, evaluation, observability |
| Agent Workflow | project `AGENTS.md`, source-of-truth docs, evidence gates, agent-readable execution |
| Product Engineering | PM/AI/backend experience as product-system thinking |
| Design Harness | OpenDesign and spec-to-prototype handoff experiments |

Article candidates:

1. `AGENTS.md는 prompt가 아니라 project operating contract다`
2. `AI agent가 헛똑똑해지는 이유: source-of-truth 없이 chat memory만 믿을 때`
3. `Redis/JTI로 multi-service duplicate login을 다루는 법`
4. `FastAPI에서 SSE를 단순하게 시작하는 방법`
5. `TaskIQ와 RabbitMQ로 API와 worker 책임 분리하기`
6. `multi-tenant product backend에서 HQ/Branch 권한 경계를 설계하는 법`
7. `OpenDesign으로 spec과 prototype 사이를 줄이는 실험`
8. `PM에서 backend engineer로 돌아왔을 때 더 잘 보이게 된 것들`
9. `백엔드 템플릿에 agent 컨텍스트 시스템을 내장한 이유`

## Visitor Profile Chat Seed Answers

These are initial public-safe answers for the profile chat. They can become deterministic fallback answers or retrieval test fixtures.

### Q1. 김대정은 어떤 엔지니어인가요?

김대정은 AI product와 product backend의 복잡한 운영 문제를 backend/infra system으로 풀고, 그 실행 과정을 agent-readable workflow로 구조화하는 엔지니어입니다.

FastAPI/NestJS 기반 backend, AI product runtime, async worker, realtime event, Azure/Terraform infra를 다뤄왔고, 최근에는 AI agent를 개인 생산성 도구가 아니라 조직의 요구사항, 문서, 코드, QA, 운영 절차를 이어주는 AX layer로 확장하는 데 집중하고 있습니다.

현 회사(MediSolve AI)에는 backend engineer로 합류했지만, AI 발전에 따라 PO & AI agent engineer 역할을 병행하며 서비스 방향성과 제품 기획에도 기여하고 있습니다.

### Q2. Backend/Infra 강점은 무엇인가요?

Backend에서는 API/domain boundary, auth/session policy, async worker separation, realtime event delivery, gateway integration, AI provider lifecycle을 다뤄왔습니다.

Infra에서는 Azure, Terraform, Docker, ACR, GitHub Actions, environment/resource separation, runbook 정리 경험이 있습니다. 순수 DevOps/SRE specialist라기보다는 backend system을 배포/운영 가능한 형태까지 연결하는 infra-aware backend engineer로 보는 것이 정확합니다.

클라우드는 AWS(STUDIO LAB, 현 회사 AWS -> Azure 전환기)와 Azure(현재)를 모두 다뤘습니다. IaC와 컨테이너 기반으로 일하기 때문에 특정 클라우드 플랫폼에 종속되지 않으며, 인프라의 기본 원리를 알면 플랫폼 간 이전 비용은 크게 낮아진다고 봅니다.

조직 차원에서는 회사 backend 프로젝트의 표준 FastAPI 템플릿을 설계·구축했습니다. 계층형 아키텍처, DI, ADR/컨벤션과 함께 agent가 바로 작업할 수 있는 컨텍스트 시스템을 템플릿에 내장했습니다.

### Q3. AI agent를 어떻게 활용하나요?

AI agent를 단순 coding assistant로 쓰기보다, agent가 프로젝트 context를 읽고 이어받을 수 있도록 source-of-truth 문서, `AGENTS.md`, task/report, evidence labels, runbook, design handoff를 구조화합니다.

목표는 사람의 기억에 의존하는 업무를 줄이고, 요구사항에서 구현/QA/운영까지 이어지는 흐름을 agent-readable하게 만드는 것입니다.

### Q4. 대표 프로젝트는 무엇인가요?

현재 public profile에서 가장 강하게 보여줄 수 있는 영역은 네 가지입니다.

1. Thready: AI 콘텐츠 생성 품질 시스템과 product operation workflow.
2. Centurion (자사 CRM & ERP 제품): CRM(DAY), 재고 관리(BAY), 스케줄·공간 관리(RAY), 상담 관리(SAY) feature로 구성. 예약 정책 시스템, async worker ownership, realtime AI consultation backend, 인증/게이트웨이 platform 작업을 수행했습니다.
3. NEXUS (외부 병원 대상 외주 프로젝트): product backend architecture, migration/domain audit, infra/docs governance. Centurion 구축 전에 먼저 진행한 프로젝트입니다.
4. Infra cluster: Azure/Terraform deployment flow와 runbooks.

회사명(MediSolve AI)과 제품명은 공개하되, exact customer/client/security details는 노출하지 않습니다.

### Q5. 병원 SaaS에 특화된 사람인가요?

병원/헬스케어 SaaS 경험은 중요한 evidence cluster지만, 김대정을 특정 산업 하나로만 정의하는 것은 좁습니다.

더 정확한 표현은 AI product, product backend, infra-aware backend, agent-readable workflow를 다루는 backend/AI systems engineer입니다. 병원/헬스케어 도메인은 그 역량이 적용된 강한 사례 중 하나로 보는 것이 맞습니다.

### Q6. 팀 리드 경험이 있나요?

네. MediSolve AI에서 제품팀 리드로서 여러 제품의 일정관리, 이슈 해결, 릴리스 관리를 담당했습니다.

특징은 이 리드 업무를 시스템으로 운영했다는 점입니다. 제품별 기획-개발-QA-출시 파이프라인을 단일 registry로 관제하고, agent가 매일 Slack/Jira/GitHub 활동을 수집·요약하는 briefing으로 blocker를 triage하며, 제품별 decision log와 work package, release gate로 실행을 추적했습니다.

제품 방향 결정은 기획 담당자, 경영진과 함께 했고, 저는 그 결정이 구현과 릴리스까지 이어지는 운영 구조를 책임졌습니다.

### Q7. 어떤 포지션에 잘 맞나요?

현재 profile 기준으로는 backend engineer, AI backend engineer, product/platform backend engineer, internal tools/AX-oriented engineer 역할에 잘 맞습니다.

특히 단순 API 구현보다 auth/session, async worker, realtime events, AI provider lifecycle, infra/deploy flow, docs/QA/runbook까지 함께 봐야 하는 팀에서 강점이 잘 드러납니다.

## Homepage Section Order

Recommended first homepage structure:

1. Hero: name, positioning, primary profile chat CTA.
2. Visitor Profile Chat: suggested prompts and grounded answer preview.
3. Capability Map: Backend, AI Backend, Infra, Product-System, Agent/AX.
4. Project Highlights: Thready, Centurion (DAY/BAY/RAY/SAY feature), NEXUS(외주), Infra, BE Template.
5. Agent Workflow: how work is structured for agents.
6. Writing: public proof layer and article backlog.
7. Contact / Links.

## Public Safety Guardrails

Confirmed disclosure (2026-07-04):

- 회사명 MediSolve AI 공개 가능.
- 제품 실명 공개 가능. 실명과 풀어쓴 설명을 병기한다 (예: `Centurion — CRM & ERP 제품`, `Thready — AI 콘텐츠 생성 제품`).
- DAY/BAY/RAY/SAY는 별도 제품이 아니라 Centurion을 구성하는 feature로 표기한다: CRM(DAY), 재고 관리(BAY), 스케줄·공간 관리(RAY), 상담 관리(SAY).
- Centurion은 자사 제품, NEXUS는 외부 피부과 병원 외주 프로젝트. NEXUS가 먼저 진행됐고 Centurion 구축이 이후 — 공개 서사도 이 순서로 쓴다.
- RAY 포함 네 feature 모두 직접 기여 영역 (RAY Git 확인 완료: 128/193).
- 고객사/브랜드명은 계속 비공개.
- provider 실명(Gemini, Azure OpenAI, Azure Speech 등)은 비공개 (2026-07-05 확정) — public copy는 "복수 STT/LLM provider", "realtime LLM 세션" 등으로 일반화한다.
- 공개 GitHub 링크는 `github.com/Dae-Jeong` (개인 계정, 2026-07-05 확정). `KimMarin` 계정은 연결하지 않는다.

Claim strength — Git 검증 결과 (2026-07-04):

| Repo | 점유율 | 순위 | 허용 표현 |
| --- | --- | --- | --- |
| BE-TEMPLATE | 96/97 (99%) | 단독 | 설계·구축 전담 |
| B2C-INFRA / NEXUS-infra | 25/25, 19/19 (100%) | 단독 | 단독 구축 |
| thready | 1204/1482 (81%) | 1위 | backend 전면 재구축(v1.1.0 cutover) + 이후 개발·운영 전담 |
| NEXUS | 755/965 (78%) | 1위 | 주도적 구축/설계 |
| BAY | 856/1136 (75%) | 1위 | 구축/설계 주도 (영역별 커밋 확인) |
| RAY | 128/193 (66%) | 1위 | 주 기여 (한 줄 claim) |
| PROTON | 418/645 (65%) | 1위 | 주도 (provider/session/translation 확인) |
| SAY-BE-API | 430/973 (44%) | 공동 1위 | 공동 주 기여 — cluster 단위로 서술 |
| CENTURION_DAY | 203/465 (44%) | 최다 (과반 아님) | BE/FE/QA 연결 리드 |
| SSO | 90/189 (48%) | 2위 | 담당/참여 (구축 X) |
| MEDISOLVEAI-INFRA | 96/223 (43%) | 2위 | 공동 구축 + runbook/문서화 리드 |

⚠️ 커밋 수는 기여도의 전부가 아님 (설계/리뷰/페어 작업 미반영, squash 정책 영향 가능) — 공개 claim 강도 결정 게이트로만 사용.

Use:

- AI product runtime.
- backend systems.
- infra-aware backend.
- product-system thinking.
- agent-readable workflow.
- evidence-first execution.
- source-of-truth docs.
- release/QA/runbook workflow.

Avoid or verify before use:

- provider 실명 (Gemini, Azure OpenAI, Azure Speech 등) — 비공개 확정.
- hospital SaaS-only identity.
- "AI agent expert" without concrete artifacts.
- "platform engineer" if the target JD expects deep Kubernetes/SRE ownership.
- "solo built".
- "N배 improvement".
- exact business/security/cost/client/resource details.
- private source paths such as `~/workspace` or `~/agentspace` in visitor-facing answers.

## Move-To-App Plan

When building the prototype, split this draft into public knowledge files:

| Target File | Source Sections |
| --- | --- |
| `content/profile/identity.mdx` | Public Positioning, Hero Copy, Short Bio |
| `content/profile/career.mdx` | Career Summary |
| `content/profile/capabilities.mdx` | Strengths |
| `content/profile/projects.mdx` | Project Highlights |
| `content/profile/agent-workflow.mdx` | Agent / AX Section Draft |
| `content/profile/writing.mdx` | Writing Section Draft |
| `content/profile/chat-seeds.mdx` | Visitor Profile Chat Seed Answers |

Before moving:

1. 회사명/제품명 공개는 확정 (Confirmed disclosure 참고). 고객사/브랜드명 공개 범위는 여전히 확인 필요.
2. NEXUS 등 공개 표기가 미정인 이름만 라벨 결정 후 반영.
3. Keep confidence wording when a claim is not fully verified.
4. Do not include raw private paths or operational secrets in app content.
