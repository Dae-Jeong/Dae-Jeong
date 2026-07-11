---
type: impact-case-candidates
title: Impact Case Candidates
description: Fact-first shortlist of high-impact project cases before writing final resume and homepage contribution copy.
timestamp: 2026-07-02
tags: [workspace, impact, case-study, contribution, resume, evidence]
---

# Impact Case Candidates

## Purpose

이 문서는 [06-project-work-log.md](06-project-work-log.md)의 작업 목록에서 이력서/홈페이지에 쓸 만한 임팩트 사례를 뽑기 위한 중간 산출물이다.

아직 최종 이력서 문장이 아니다. 현재 목표는 아래 두 가지다.

1. 최대한 사실 기반으로 "내가 무엇을 했는지"를 남긴다.
2. 그중에서 homepage case study나 resume bullet로 키울 만한 후보를 고른다.

## Selection Criteria

| Criteria | Meaning |
| --- | --- |
| Evidence Strength | Git commit, touched path, docs/tasks/tests/infra evidence가 있는가 |
| Scope | 단일 버그 수정이 아니라 runtime, domain, infra, workflow처럼 넓은 단위인가 |
| Role Signal | backend/AI backend/infra/agent workflow 역량을 보여주는가 |
| Differentiation | 흔한 CRUD보다 "AI product + backend + 운영/문서화" 차별점이 있는가 |
| Public Safety | 회사/고객/credential/수치 없이도 설명 가능한가 |
| Story Potential | `문제 -> 접근 -> 구현 -> 운영/검증` 구조로 풀 수 있는가 |

## Priority Summary

| Priority | Case Candidate | Project / Cluster | Current Confidence | Use |
| --- | --- | --- | --- | --- |
| 1 | AI content generation quality system | `thready` | High | main homepage case |
| 2 | Full-stack AI product operation workflow | `thready` | High | Agent/AX section |
| 3 | Async backend ownership for order/inventory/alimtalk | `BAY-BE-API` | High | backend resume case |
| 4 | Agent-readable product backend architecture and migration control-plane | `NEXUS` | High | backend/AX case |
| 5 | Realtime AI consultation provider lifecycle | `SAY-BE-API / PROTON` | Medium-High | AI backend case |
| 6 | Azure/Terraform infra separation and deployment runbooks | Infra cluster | Medium-High | infra credibility |
| 7 | Multi-service auth/session and admin E2E system | `SSO-BE-API` | Medium-High | backend depth |
| 8 | Reservation policy to BE/FE/QA execution | `CENTURION_DAY` | Medium | product-system depth |
| 9 | Internal AI chat/AX tooling | `thedaylabs-mso` | Medium | AX supporting case |
| 10 | Payment/refund correctness in reservation/payment backend | `feynman_api` | Medium | prior company case |

## Case 1: thready AI Content Generation Quality System

Impact hypothesis:

> AI 콘텐츠 생성 품질을 감각적인 프롬프트 수정이 아니라, pipeline, typed prompt builder, LLM judge, benchmark/evaluation loop, observability로 다룬 사례.

Facts:

- User commit signal is the highest in workspace: 1180 / 1458.
- Main touched paths include `backend`, `frontend`, `frontend-react`, `tasks`, `docs`, `scripts`, `.github`, `wiki`.
- Work log shows AI generation runtime work:
  - critique -> revise improvement layer
  - 2-step AI generation pipeline
  - single generation runtime cleanup
  - naturalize node after generation
  - first draft model fixed to GPT
  - default AI generation model changed to GPT
- Work log shows prompt and writer pipeline work:
  - typed writer prompt build module
  - single prompt rendering path
  - typed `source_context`
  - prompt text unification and naturalization
  - purpose/naturalness contract encoded into writer prompt
  - viral hook 8-dimension rubric reflected into writer prompt
- Work log shows quality/evaluation work:
  - LLM judge for generation quality
  - local prompt evaluation sweep script
  - benchmark local-api mode repaired against current contract
  - baseline benchmark and quality diagnosis docs
  - generation quality observation data persisted
- Work log shows product/runtime work:
  - model selection routing cleanup
  - GPT-first model dropdown ordering
  - draft length cap and body/reply flow constraints
  - opening hook/tension improvement

Why this is impactful:

- Shows AI product engineering beyond "using LLM API".
- Combines backend runtime, prompt architecture, evaluation, observability, and product UX.
- Strong fit for "AI backend / AI product engineer" and "agentic workflow" positioning.

Potential contribution copy:

> thready에서 AI 콘텐츠 생성 품질을 개선하기 위해 critique/revise pipeline, typed prompt builder, LLM judge, prompt evaluation loop, and observability logging을 구축/정리했습니다.

Evidence to verify next:

- Which files implement pipeline/judge/prompt builder.
- Whether quality metrics or before/after examples can be public-safe.
- Whether product name/Threads relation can be disclosed.

## Case 2: thready Full-Stack AI Product Operation Workflow

Impact hypothesis:

> AI product를 코드만 만든 것이 아니라 release, QA, docs/tasks, background job planning까지 운영 가능한 구조로 만든 사례.

Facts:

- Work log shows release/operations:
  - version bump and release candidate alignment
  - BE/FE/env drift resolved for release candidates
  - backend observability logging hardened
  - Studio runtime removed and decommission plan recorded
  - Claude CLI payload contract test reflected
- Work log shows docs/tasks workflow:
  - `tasks/` work packages maintained
  - release/QA task structure maintained
  - v1.4/v1.5 background work plans documented
  - implementation/operation/release/verification source-of-truth routing maintained
- Paths touched include `backend`, `frontend`, `tasks`, `docs`, `.github`, `scripts`, and `wiki`.

Why this is impactful:

- Shows the user's preferred working style: agent-readable execution, not one-off coding.
- Good bridge between Resume and Agent sections of the homepage.
- Strong evidence for AX narrative: context, execution, QA, release, and docs are structured for agents and teammates.

Potential contribution copy:

> thready에서 AI product runtime뿐 아니라 release/QA task, background job planning, observability, and docs/tasks source-of-truth를 정리해 제품 운영 흐름을 agent-readable하게 만들었습니다.

Evidence to verify next:

- Exact `AGENTS.md`, `tasks/`, `docs/` routing files.
- Public-safe screenshots or sanitized workflow diagram.

## Case 3: BAY Async Backend Ownership

Impact hypothesis:

> order/inventory/alimtalk backend에서 API 처리와 실패 가능성이 큰 비동기 작업을 분리하고, worker/test/docs/onboarding까지 정리한 사례.

Facts:

- User commit signal: 856 / 1136.
- Main touched paths: `src`, `tests`, `docs`, `migrations`, `tests_v2`, `.claude`, `scripts`, `.github`, `docker`.
- Work log shows backend domain/API work:
  - order cancellation behavior for `CREATED` orders and `OrderProduct`
  - pending order query optimization
  - order rule and branch connection changes
  - product simple/list/detail APIs
  - product filter APIs and product filter integration
  - cursor pagination and infinite scroll support
- Work log shows async/messaging work:
  - Notification/Celery removal and Alimtalk/TaskIQ migration
  - TaskIQ staged configuration
  - TaskIQ context injection fixes
  - retry handling for inventory deduction errors
  - RabbitMQ duration option sync
  - inventory TaskIQ env/settings integration
- Work log shows test/dev/ops work:
  - API test infra with Object Mother pattern
  - Docker-based CI test infra
  - Docker Compose local automation and initial data
  - FE onboarding guide and one-command Docker Compose setup
  - handover docs and Claude/TDD workflow docs

Why this is impactful:

- Strongest pure backend ownership story.
- Shows domain/API, async worker, tests, CI, docs, and onboarding in one project.
- Good resume bullet for backend/platform roles.

Potential contribution copy:

> BAY backend에서 order/product/inventory 도메인을 다루며 Alimtalk/TaskIQ/RabbitMQ 기반 worker flow, retry handling, API test infra, Docker CI, and onboarding docs를 구축/정리했습니다.

Evidence to verify next:

- Direct files for TaskIQ worker and retry behavior.
- Whether Celery -> TaskIQ migration can be claimed as direct ownership.
- Whether there are reliability or operation metrics.

## Case 4: NEXUS Agent-Readable Product Backend Architecture

Impact hypothesis:

> multi-brand product backend monorepo에서 backend architecture, migration/domain audit, infra control-plane, and docs governance를 하나의 구조로 정리한 사례.

Facts:

- User commit signal: 755 / 965.
- Main touched paths: `packages`, `docs`, `infra`, `plans`, `.github`, `.claude`, `tests`, `envs`, `scripts`.
- Work log shows backend monorepo architecture:
  - `api-gateway`, `admin-api`, `homepage-api`, shared package boundaries
  - FastAPI-free shared harness import cleanup
  - admin/homepage API fixes and schema/test improvements
  - reservation, homepage, i18n, catalog, product/excel flows
- Work log shows migration/domain audit:
  - Daybeau legacy migration analysis
  - contaminated data analysis
  - customer/reservation migration analysis
  - migration handoff artifacts
  - remigration drift guard and runbook
  - reverse-engineering audit with screen/step coverage
- Work log shows infra/control-plane:
  - NEXUS-infra imported into `infra/`
  - IaC pipeline improvement
  - Terraform state restoration and drift tracking
  - DB collation and subnet drift fixes
  - OIDC setup and staging retirement cleanup
- Work log shows governance:
  - backend harness and docs governance alignment
  - project control-plane and design gate docs
  - local full-stack runbook
  - docs review skill and document quality verification
  - migration/domain policy docs
- Domain note: NEXUS의 실제 domain은 healthcare/hospital work와 연결되어 있지만, public positioning에서는 특정 산업 특화가 아니라 product backend architecture 사례로 설명한다.

Why this is impactful:

- Strong fit for "backend architect for product systems and agentic workflows".
- Shows architecture, migration, infra, docs, and agent governance together.
- Good second flagship case after thready.

Potential contribution copy:

> NEXUS에서 multi-brand product backend monorepo의 service boundary, migration/domain audit, infra control-plane, and docs governance를 정리해 backend architecture와 agent-readable execution structure를 함께 구축했습니다.

Evidence to verify next:

- Exact package/service boundaries.
- Public-safe naming for hospital/brand/domain.
- Whether "control-plane" is understandable enough for non-internal readers.

## Case 5: SAY Cluster Realtime AI Consultation Provider Lifecycle

Impact hypothesis:

> realtime AI consultation system에서 STT/LLM provider, Gemini Live session lifecycle, translation/audio pipeline, dashboard AI analysis, and operational docs를 다룬 사례.

Facts:

- User commit signal:
  - `SAY-BE-API`: 430 / 973
  - `PROTON`: 418 / 645
- User correction: treat `PROTON` as same SAY project cluster, not a separate resume pillar.
- Work log shows provider/infra lifecycle:
  - AI resource dev/prod separation
  - direct endpoint support
  - provider migration docs
  - Azure OpenAI API version alignment
  - LLM provider adjustments
  - provider auth mode split
  - provider-specific language code handling
- Work log shows realtime/Gemini lifecycle:
  - Gemini Live zombie session prevention
  - reconnect race-condition fixes
  - GC TTL and orchestrator requirements
  - pause/resume behavior
  - turn-complete session switching
  - punctuation-based sentence splitting
  - spacing and response-format fixes
- Work log shows STT/translation/audio:
  - Azure Speech SDK STT provider
  - Gemini Live STT provider and staggered pipeline
  - Gemini Translation provider
  - dual-to-single translation session refactor
  - realtime audio response delivery
  - audio sequence matching
- Work log shows AI analysis/dashboard:
  - dashboard AI analysis v2 with 5-axis insight aggregation
  - LLM structured output schema handling
  - fallback guarantee
  - prompt tuning
  - skip Stargate analysis when no SUCCESS consultation exists
  - statistic-based LLM analysis integration
- Work log shows seed/test/docs:
  - event data setup design/plan docs
  - validation schemas and cross-validation
  - payment integer overflow and dashboard boundary tests
  - AI infra migration As-Is/To-Be docs
  - zombie session and infra change docs

Why this is impactful:

- Shows AI backend depth beyond content generation.
- Strong evidence for realtime, provider lifecycle, STT/audio, and operational hardening.
- Useful for AI platform/backend roles.

Potential contribution copy:

> SAY cluster에서 realtime AI consultation backend의 STT/LLM provider lifecycle, Gemini Live session stability, translation/audio pipeline, dashboard AI analysis, and AI infra migration docs를 다뤘습니다.

Evidence to verify next:

- Public-safe description of SAY/consultation domain.
- Which provider names can be disclosed.
- Whether "dashboard AI analysis" can be connected to product outcome.

## Case 6: Azure/Terraform Infra Separation And Deployment Runbooks

Impact hypothesis:

> backend engineer지만 Azure/Terraform infra, B2B/B2C separation, deployment, remote state, runbook까지 다룬 사례.

Facts:

- Included repos:
  - `MEDISOLVEAI-INFRA`
  - `MEDISOLVEAI-B2C-INFRA`
  - `NEXUS-infra`
- Work log shows company infra monorepo:
  - B2B Terraform roots moved under `azure/b2b`
  - B2C Terraform roots imported
  - NEXUS Terraform roots imported
  - monorepo migration plan and validation docs
  - final infra architecture diagram and handover docs
- Work log shows B2B/B2C separation:
  - boundaries documented
  - B2C deployment slot/current state documented
  - prod deployment checklist and DB migration guide
  - Thready prod monitoring alert import
  - Selly VM infra and CI/CD/migration state reflected
- Work log shows Terraform/Azure operations:
  - Terraform state container
  - remote backend migration
  - App Service custom domain and SSL
  - DB collation defaults
  - Azure Storage module
  - App Service/VM deployment split
  - ACR auth and latest image pull fixes
  - Bastion/SSH deploy simplification
- Work log shows runbook/docs:
  - service addition guide
  - infra visualization dashboard
  - cost analysis docs
  - operational issue diagnosis/resolution docs
  - Azure resource wiki and onboarding guide

Why this is impactful:

- Helps position the user as backend engineer with infra execution capability.
- Supports platform/backend roles that require cloud deployment experience.
- Good supporting case, not necessarily first flagship.

Potential contribution copy:

> Azure/Terraform infra repos에서 B2B/B2C resource separation, Terraform root/import/remote state, App Service/ACR deployment flow, service addition guide, and infra runbooks를 정리했습니다.

Evidence to verify next:

- Which Terraform resources were directly applied.
- Public-safe resource naming.
- Whether cost or reliability claims can be made.

## Case 7: SSO Multi-Service Auth/Session System

Impact hypothesis:

> multi-service 환경에서 auth/session policy, Redis/JTI validation, E2E tests, admin/service management를 구축/정리한 backend depth 사례.

Facts:

- User commit signal: 90 / 189.
- Main touched paths: `apps`, `src`, `test`, `docs`, `.github`, `.claude`, `prisma`.
- Work log shows auth/session:
  - Redis session management
  - duplicate login prevention tests
  - JWT payload/deviceId changes
  - expired cookie re-login behavior
  - logout JTI ownership verification
  - revoked-token/session-missing error handling
  - token/info subscription validation refactor
- Work log shows tests:
  - E2E infra with Docker/cookie-parser/error filter
  - CEN-553 unit/E2E scenarios
  - auth-session E2E fixes
  - Admin Saga/CRUD/Sync/Subscriptions/Services/Dashboard E2E
- Work log shows DB/architecture:
  - monorepo restructure
  - local SSO MySQL -> PostgreSQL transition
  - SAY PG sharing and schema separation
  - Prisma baseline migration squash
  - Bay/SAY sync upsert behavior
- Work log shows admin/service slices:
  - branches
  - master services
  - staff
  - subscriptions
  - dashboard summary

Why this is impactful:

- Strong backend architecture evidence.
- Supports auth/session, test discipline, service integration.
- Good supporting case for backend roles.

Potential contribution copy:

> SSO에서 Redis/JTI 기반 session policy, duplicate-login handling, JWT/device session flow, Bay/SAY sync behavior, and admin E2E test suites를 정리했습니다.

Evidence to verify next:

- Public-safe security language.
- Whether "auth architecture" vs "auth maintenance" is the accurate phrasing.

## Case 8: CENTURION_DAY Reservation Policy To BE/FE/QA

Impact hypothesis:

> 예약 정책을 문서, backend 판단, frontend 표시, QA seed/test까지 연결한 product-system 사례.

Facts:

- User commit signal: 203 / 465.
- Main touched paths: `backend`, `frontend`, `docs`, `memories`, `planning`, `plan`, `.claude`.
- Work log shows reservation policy:
  - calendar reservation-close status
  - full-slot close judgment on backend
  - stopped/closed slot display in reservation time dropdown
  - reservation filter/status/staff/platform consistency
  - reservation cancel -> full-state release
  - reservation edit current value handling
  - customer -> patient terminology change
- Work log shows BE/FE integration:
  - FE calendar display
  - CRM reservation detail button behavior
  - management dashboard query behavior
  - admin/auth middleware and CORS preflight fixes
  - API Gateway CRM routing
- Work log shows QA/test/data:
  - CRM API destructive tests
  - reservation domain E2E test infra
  - local seed scenarios
  - QA seed definitions
  - user journey scenarios
- Work log shows release/docs:
  - policy docs
  - release docs and TC set
  - docs-code sync
  - Docker Compose/Caddy/deploy script setup

Why this is impactful:

- Shows product-system thinking, not just backend coding.
- Good proof of PM/backend bridge.
- Useful supporting case under NEXUS/CENTURION family.

Potential contribution copy:

> CENTURION_DAY에서 예약 마감/운영중지/상태 필터 정책을 backend 판단, frontend 표시, QA seed/test, and release docs로 연결해 product policy를 실행 가능한 시스템으로 정리했습니다.

Evidence to verify next:

- Which public names can be used.
- Whether this belongs under NEXUS history or separate case.

## Case 9: Thedaylabs Internal AI Chat / AX Tooling

Impact hypothesis:

> 사내 운영/분석 도구에 AI chat, tools, citation, SSE, audit logs, architecture gates를 넣은 AX 사례.

Facts:

- Included repos: `thedaylabs-mso`, `thedaylabs-infra`.
- Work log shows internal AI chat:
  - AI chat scaffold
  - Ollama provider and Docker Compose
  - JWT validation
  - read-only backend client
  - LangGraph orchestrator
  - tools and citation validator
  - SSE/streaming
  - AI chat logs audit writer
  - frontend chat drawer and citation UI
  - web search and source blocks
  - session cache and token streaming
- Work log shows test/docs:
  - AI-CHAT execution plan
  - architecture/unit tests
  - night-run gate expansion
  - convention baseline
  - layer rule reinforcement
  - onboarding guide and handoff snapshot
- Work log shows infra:
  - STG Terraform + Docker Compose + Caddy
  - STG runbook
  - backend healthcheck/admin IP fixes
  - S3 sync rowcount fix
  - Azure Blob Storage infra
  - Managed Identity deploy script
  - NSG SSH rule and VM lifecycle policy

Why this is impactful:

- Best supporting evidence for AX interest outside resume-only narrative.
- Shows internal tool + backend + FE + infra + evidence gates.

Potential contribution copy:

> Thedaylabs MSO에서 AI chat tooling, citation UI, LangGraph/tool orchestration, SSE streaming, audit logs, architecture tests, and STG infra/runbook을 구축해 internal AX workflow를 실험했습니다.

Evidence to verify next:

- Public-safe relationship between Thedaylabs and company work.
- Whether this should be a Writing/Agent article rather than resume bullet.

## Case 10: Memento Payment/Refund Correctness

Impact hypothesis:

> 의료/예약 backend에서 Stripe/prepayment/refund/mileage/ticket correctness를 다룬 prior company case.

Facts:

- User commit signal: 48 / 2716.
- Main touched paths: `feynman_api`, `tests`, `alembic`.
- Work log shows payment/prepayment:
  - Stripe integration and prepayment logic
  - payment confirmation timing changed to reservation confirmation
  - prepayment detection fixes
  - payment history save/rollback fixes
- Work log shows refund/mileage/ticket:
  - prepayment failure rollback
  - mileage refund logic changes
  - full-mileage purchase refund issue
  - homepage reservation cancel refund condition
  - refund processing order
  - ticket removal timing on refund
- Work log shows happy call/template:
  - happy-call template memo
  - happy-call send history return restoration
  - survey and happy-call template relationship
  - CODEOWNERS

Why this is impactful:

- Strong prior backend domain correctness story.
- Good for showing career continuity before MediSolve AI.
- Not first-screen, but useful for resume history.

Potential contribution copy:

> Memento Feynman에서 Stripe/prepayment, refund/mileage/ticket rollback, and payment-history correctness를 다루며 reservation/payment backend 안정성을 개선했습니다.

Evidence to verify next:

- Exact scope around Stripe introduction.
- Public-safe service naming.

## Case Selection Recommendation

Homepage case studies should start with 3 strong cases:

1. `thready`: AI content generation quality and operation workflow
2. `BAY-BE-API`: async backend ownership for order/inventory/alimtalk
3. `NEXUS`: product backend architecture, migration, infra control-plane, docs governance

Then use 2 supporting sections:

4. `SAY cluster`: realtime AI consultation provider lifecycle
5. Infra cluster: Azure/Terraform deployment and runbook credibility

Resume bullets should be shorter:

- thready: AI generation quality/runtime/evaluation/release workflow
- BAY: FastAPI backend + TaskIQ/RabbitMQ + test/CI/docs
- NEXUS: multi-brand backend architecture + migration/domain audit + agent-readable docs
- SAY cluster: STT/LLM provider lifecycle + realtime consultation + dashboard AI analysis
- Infra: Azure/Terraform + B2B/B2C separation + App Service/ACR/runbooks
- SSO/CENTURION/Memento: supporting depth bullets

## What Not To Claim Yet

Avoid these until verified with stronger evidence:

- "단독 구축"
- "N배 성능 개선"
- "무중단 배포"
- "장애 완전 해결"
- exact cost, security, client, credential, or infrastructure details
- exact business KPI improvement

## Next Step

Create a contribution draft from the top cases:

```text
Case:
Problem:
Actions:
Evidence:
Public contribution copy:
Confidence:
Missing proof:
```
