---
type: project-audit
title: Workspace Project Audit
description: First-pass audit of ~/workspace projects for contribution evidence, backend/infra capability, and agent/AX positioning.
timestamp: 2026-07-02
tags: [workspace, contribution, backend, infra, ax, evidence]
---

# Workspace Project Audit

## Scope

이 문서는 `/Users/marin/workspace`에 있는 프로젝트들을 이력서/홈페이지/profile 관점에서 1차 분석한 결과다.

Purpose:

- BE/Infra 구축 경험을 repo evidence로 정리한다.
- AI/Agent/AX positioning에 실제 근거가 되는 프로젝트를 선별한다.
- 이후 JD 분석 전에 "내가 가진 evidence"를 정리한다.

Checked date: 2026-07-02

Evidence commands used:

- `git shortlog -sne --all`
- `git log --author='KimMarin\|marin'`
- author path distribution from `git log --name-only`
- top-level README/AGENTS/pyproject/package inspection
- full workspace sweep with author aliases:
  `KimMarin`, `marin@medisolveai`, `Dae-Jeong`, `v4chelsea`, `MementoAI-Daejeong`, `김대정`, `marin@mement`

Important caveat:

- commit count는 기여도의 절대값이 아니다. 다만 직접 구축/운영/문서화에 대한 strong signal로 사용할 수 있다.
- dirty worktree 상태는 분석에 사용하지 않는다.
- README에 secret-like 값이 포함된 repo가 있어, 이 문서에는 secret, URL credential, password를 옮기지 않는다.
- 병원/헬스케어 도메인 표현은 프로젝트 evidence로만 사용한다. 공개 포지셔닝에서는 특정 산업 특화가 아니라 AI product, product backend, infra, agent-readable workflow 역량으로 설명한다.

## High-Signal Project Map

| Project | Domain | Author Signal | Main Evidence | Profile Value |
| --- | --- | ---: | --- | --- |
| `thready` | Threads content ops, full-stack + AI generation | KimMarin 1180 commits | `README.md`, `AGENTS.md`, `backend/`, `frontend/`, `docs/`, `tasks/` | 메인 프로젝트, 최상위 AI product + agent/document workflow 근거 |
| `BAY-BE-API` | inventory/order/alimtalk backend | KimMarin 856 commits | `README.md`, `pyproject.toml`, `src/`, `tests/`, `docs/` | FastAPI backend ownership, async worker/TaskIQ/RabbitMQ 근거 |
| `NEXUS` | multi-brand product backend monorepo | KimMarin 755 commits | `README.md`, `AGENTS.md`, `packages/`, `docs/`, `tasks/` | 현재 BE/Product/Agent architecture 근거 |
| `SAY-BE-API` / `PROTON` | AI consultation backend cluster | KimMarin 430 + 418 commits | `README.md`, `pyproject.toml`, `apps/`, `src/`, `app/`, `docs/` | SAY 프로젝트군의 AI infra/provider/STT/realtime consultation 근거 |
| `SSO-BE-API` | centralized auth/session | KimMarin 90 commits | `AGENTS.md`, `package.json`, `src/`, `test/` | Redis/JTI/session policy 근거 |
| `MEDISOLVEAI-INFRA` | B2B Azure Terraform infra | KimMarin 96 commits | `README.md`, `AGENTS.md`, `azure/`, `docs/` | B2B infra/IaC/운영 문서화 근거 |
| `MEDISOLVEAI-B2C-INFRA` | B2C Azure Terraform infra | KimMarin 25 commits | `AGENTS.md`, `azure/` | Thready/Selly B2C infra separation and slot-swap 근거 |
| `NEXUS-infra` | NEXUS Azure Terraform infra | KimMarin 19 commits | `terraform/`, `scripts/`, `docs/` | tenant/service infra 확장/remote backend/ACR/App Service 근거 |
| `CENTURION-BE-API` | legacy NestJS multi-module backend | KimMarin 381 commits | `README.md`, `apps/`, `libs/`, `prisma/` | legacy-to-current platform history, reservation/domain fixes |
| `CENTURION_DAY` | FastAPI/Next product backend monorepo | KimMarin 203 commits | `README.md`, `AGENTS.md`, `backend/`, `frontend/`, `docs/`, `planning/` | NEXUS 이전/병행 full-stack platform and planning 근거 |
| `CENTURION-API-GATEWAY` | Express API Gateway | KimMarin 44 commits | `README.md`, `src/`, `routes.json`, `docs/` | service routing/auth/CORS/WebSocket proxy 근거 |
| `CENTURION-CHARTY` | consultation/chart AI assistant surface | KimMarin 38 commits | `frontend/`, `ai/`, `backend/`, `.github/` | AI/FE/BE integration and Azure CD supporting evidence |
| `PROTON-BACKOFFICE` | serverless consultation analysis backoffice | KimMarin 36 commits | `README.md`, `pyproject.toml`, `shared/`, `tests/`, `scripts/` | Azure Functions + LangChain + Blob Storage supporting evidence |
| `centurion-linky` | medical messenger / AI workflow backend | KimMarin 9 commits | `CLAUDE.md`, `backend/`, `docs/`, `.github/` | backend convention, TaskIQ/DI, CD pipeline supporting evidence |
| `centurion_mso` | MSO planning/docs | KimMarin 22 commits | `docs/` | BAY/admin DB unification planning evidence |
| `Selly` | lightweight commerce/service app | KimMarin 11 commits | `backend/`, `.github/`, `docs/` | STG/Prod deploy workflow and runbook evidence |
| `thedaylabs-infra` | Thedaylabs Terraform infra | KimMarin 8 commits | `README.md`, `projects/`, `.github/` | Azure Terraform state/deploy infra supporting evidence |
| `thedaylabs-mso` | sales/operations dashboard + AI chat | marin 72 commits | `README.md`, `AGENTS.md`, `apps/`, `infra/`, `docs/qa/` | AX/AI chat + infra + QA gates 근거 |
| `feynman_api` | Memento reservation/payment backend | 김대정/MementoAI-Daejeong 48 commits | `README.md`, `feynman_api/`, `tests/`, `alembic/` | Stripe/refund/payment/happy-call 과거 경력 보강 |

## Priority Groups

### Group A: Resume/Core Case Study Candidates

These should become public case studies or strong resume bullets first.

1. `thready`
   - Why: user's main project and highest author signal across `~/workspace`.
   - Evidence: KimMarin 1180 commits; touched `backend`, `frontend`, `frontend-react`, `tasks`, `docs`, `scripts`, `.github`, `wiki`.
   - Claim angle: AI generation quality, model/runtime routing, observability, release QA, full-stack product operation, agent workflow.

2. `BAY-BE-API`
   - Why: highest backend ownership signal.
   - Evidence: KimMarin is top author; changed `src`, `tests`, `docs`, `migrations`, `.github`, `docker`.
   - Claim angle: FastAPI backend, order/inventory/alimtalk, TaskIQ/RabbitMQ, CI/test/docs.

3. `NEXUS`
   - Why: current architecture and agent-readable project structure are strongest.
   - Evidence: KimMarin is top author; changed `packages`, `docs`, `tests`, `plans`, `scripts`, `wiki`.
   - Claim angle: multi-brand product backend monorepo + docs/tasks/harness governance.

4. `SAY-BE-API` + `PROTON`
   - Why: AI backend, realtime consultation, STT/LLM provider orchestration.
   - Evidence: same SAY project cluster; KimMarin high author signal in both repos; commit subjects include provider migration, STT provider, Gemini session lifecycle, Azure resource separation, realtime trigger system.
   - Claim angle: AI backend systems beyond generic LLM usage.

5. `MEDISOLVEAI-INFRA`, `MEDISOLVEAI-B2C-INFRA`, `NEXUS-infra`
   - Why: infra credibility for Azure/Terraform/deployment/tenant separation.
   - Evidence: Terraform/docs commits, B2B/B2C separation, App Service, storage, remote backend, deployment slot, tenant/service infra.
   - Claim angle: backend engineer who can also structure cloud operations.

### Group B: Supporting Evidence

Use these to support specific bullets, not first-screen positioning.

- `SSO-BE-API`: auth/session/JWT/Redis/JTI policy.
- `CENTURION-BE-API`: legacy multi-module NestJS backend and reservation/domain fixes.
- `CENTURION_DAY`: FastAPI/Next full-stack product backend monorepo, planning/docs/memory workflow.
- `CENTURION-API-GATEWAY`: routing/auth/CORS/WebSocket proxy operations.
- `CENTURION-CHARTY`: AI/FE/BE integration and Azure CD workflow.
- `PROTON-BACKOFFICE`: Azure Functions/LangChain consultation analysis backoffice.
- `centurion-linky`: backend convention, TaskIQ/DI, CD pipeline, messaging/AI workflow surface.
- `centurion_mso`: BAY/admin DB unification and migration planning docs.
- `Selly`: backend STG/Prod deploy workflow and runbook.
- `thedaylabs-infra`: Azure Terraform state/deploy infra.
- `thedaylabs-mso`: AI chat, dashboard, infra, QA gate, handover/runbook pattern.
- `feynman_api`: Memento payment/refund/Stripe/happy-call work.

### Group C: Parked Or Low Direct Signal

Do not lead with these unless a JD asks for them.

- FE repos with 1-3 KimMarin commits: `DAYBEAU-ADMIN-FE`, `CERAMIQUE-HOMEPAGE-FE`, `SAY-ADMIN-FE`, `THEDAYLABS-ADMIN-FE`, `THEDAYLABS-HOMEPAGE-FE`, `MEDI-HOMEPAGE-RENEWAL-FE`.
- Repos with no user commit signal: `Bay-FE`, `CERAMIQUE-FE`, `SAY-FE`, `SAY-REC-FE`, `CENTURION-WATCH`, `Procedure-Hub`, `STARGATE`, `STUDIO`, `dev-docs`, `medikit`, `MEDISOLVEAI-MONITORING`, `medisolveai-homepage-be`.
- Assignment repos: `medisolveai-ai-assignment`, `medisolveai-be-assignment`.
- User-deprioritized despite commit signal: `RAY-BE-API`, `PCS-BE-API`, `say-game-be`.
- Crawlers or local experiments: `trend-crawler`, `holy-crawlly`, `nexus-audit-staging` unless later needed.

User grouping corrections:

- Treat `PROTON` as part of the same SAY project cluster, not as a separate resume pillar.
- Ignore `say-game-be`, `PCS-BE-API`, and `RAY-BE-API` for resume/homepage prioritization unless a future JD specifically asks for similar evidence.

## Full Workspace Sweep Result

The second sweep checked every git repo directly under `/Users/marin/workspace`.

Summary:

- Total git entries checked: 47
- Entries with user commit signal: 35
- Deduplicated committed project histories: 31
- Repos skipped because user commit signal was 0: 12

Deduplicated worktree/history notes:

| Directory | Treatment |
| --- | --- |
| `NEXUS-migration` | Same commit history as `NEXUS`; do not count separately. |
| `MEDISOLVEAI-INFRA-monorepo-migration` | Same commit history as `MEDISOLVEAI-INFRA`; do not count separately. |
| `thready-v1.4.0-ai-quality-lab` | Same commit history as `thready`; use only as worktree/context note. |
| `thready-v120-migfix` | Same commit history as `thready`; use only as worktree/context note. |

Skipped because no user commit signal:

| Repo | Dominant Ownership Signal | Resume Treatment |
| --- | --- | --- |
| `Bay-FE` | FE authors other than user | Skip for contribution claims |
| `CERAMIQUE-FE` | FE authors other than user | Skip for contribution claims |
| `SAY-FE` | FE authors other than user | Skip for contribution claims |
| `SAY-REC-FE` | FE authors other than user | Skip for contribution claims |
| `CENTURION-WATCH` | other backend/AI owner signal | Skip unless cross-service integration is later proven |
| `Procedure-Hub` | other author signal | Skip |
| `STARGATE` | other author signal | Skip |
| `STUDIO` | other author signal | Skip |
| `dev-docs` | other author signal | Skip |
| `medikit` | FE/design-system authors other than user | Skip for direct contribution claims |
| `MEDISOLVEAI-MONITORING` | no user commit signal found | Skip |
| `medisolveai-homepage-be` | no user commit signal found | Skip |

Low-signal but user-touched repos:

| Repo | User Signal | Treatment |
| --- | ---: | --- |
| `DAYBEAU-ADMIN-FE` | 3 commits | FE fix/deploy trigger only; do not claim FE ownership. |
| `CERAMIQUE-HOMEPAGE-FE` | 2 commits | homepage integration fixes only. |
| `SAY-ADMIN-FE` | 2 commits | dashboard display fix only. |
| `THEDAYLABS-ADMIN-FE` | 2 commits | FE bugfix only. |
| `THEDAYLABS-HOMEPAGE-FE` | 2 commits | homepage config/style fixes only. |
| `MEDI-HOMEPAGE-RENEWAL-FE` | 1 commit | footer contact update only. |
| `RAY-BE-API` | 128 commits | User-deprioritized; do not use in resume priority set. |
| `PCS-BE-API` | 98 commits | User-deprioritized; do not use in resume priority set. |
| `say-game-be` | 125 commits | User-deprioritized; do not use in resume priority set. |
| `medisolveai-ai-assignment` | 2 commits | assignment/public-maintenance only. |
| `medisolveai-be-assignment` | 5 commits | assignment evidence only; not company contribution. |

## Project Notes

### NEXUS

Verified facts:

- README describes NEXUS as a FastAPI monorepo for multi-brand hospital management with `api-gateway`, `admin-api`, `homepage-api`, and `shared`.
- README points to `wiki/`, `docs/`, `tasks/`, `plans/`, `insights`, and `scripts` as evidence/routing layers.
- AGENTS routes agents through `wiki/_map.md`, `docs/`, `tasks/`, and architecture/design-pattern gates.
- Stack evidence: FastAPI, Python 3.13, Tortoise ORM, PostgreSQL, uv workspace, pytest, Docker PostgreSQL test DB.
- Author/path evidence: KimMarin touched `packages`, `docs`, `tests`, `plans`, `scripts`, `wiki`.

Contribution interpretation:

- This is the strongest evidence for "backend architecture + agent-readable project governance".
- It is also the best source for future homepage "Agent/AX" section because it shows AGENTS/wiki/docs/tasks structure in a real product repo.

Public-safe draft:

> FastAPI 기반 multi-brand product backend monorepo에서 service boundary, test harness, docs/tasks evidence layer, and agent routing structure를 구축/정리했습니다.

Needs verification:

- Exact direct implementation scope by domain and PR.
- Public-safe brand/client naming.

### BAY-BE-API

Verified facts:

- README identifies FastAPI/MySQL backend with Python 3.13, SQLAlchemy, Alembic, uv.
- `pyproject.toml` includes FastAPI, SQLAlchemy, Alembic, TaskIQ, taskiq-aio-pika, pytest, Ruff, Pyright.
- Author/path evidence: KimMarin touched `src`, `tests`, `docs`, `migrations`, `.github`, `docker`.
- Commit subjects include Docker CI test infra, handover docs, branch setup API, product pagination, order cancellation, Excel hotfixes, operating deployment.

Contribution interpretation:

- Strongest backend ownership signal.
- Good case study for API/worker/test/docs/ops across a production-ish backend.

Public-safe draft:

> BAY backend에서 order, inventory, alimtalk 도메인을 다루며 TaskIQ/RabbitMQ 기반 비동기 worker, CI/test infra, handover docs, migration/operation flow를 구축했습니다.

Needs verification:

- Celery -> TaskIQ migration history.
- Performance claims for Polars/Excel.

### thready

Verified facts:

- README describes Threads(Meta) account content operation system with `frontend` Next.js and `backend` FastAPI/PostgreSQL.
- AGENTS describes mediness as product spec/work source of truth and thready as implementation/operation/release/verification source.
- Author/path evidence: KimMarin touched `backend`, `frontend`, `docs`, `tasks`, `wiki`, `.agents`.
- Commit subjects include AI generation quality contract, typed writer prompt build module, AI generation observation data, model routing, observability logging, release notes, QA fixes, CI deploy restart.

Contribution interpretation:

- This is the strongest "AI product engineering" evidence in `~/workspace`.
- It shows not only backend, but also quality contract, observability, release, QA, docs/tasks, and agent workflow.

Public-safe draft:

> Thready에서 AI content generation runtime, model routing, quality/observability logging, full-stack release QA, and task/docs workflow를 구축하며 AI product 운영 문제를 다뤘습니다.

Needs verification:

- Public-safe product/company description.
- Which AI quality metrics can be disclosed.

### SAY-BE-API

Verified facts:

- README describes Centurion AI Backend with FastAPI, PostgreSQL, SSO auth, AWS S3/ECS/Fargate/GitHub Actions.
- `pyproject.toml` confirms Python 3.13, pytest, Ruff.
- Author/path evidence: KimMarin touched `apps`, `src`, `docs`, `libs`, `alembic`, `tests`, `scripts`.
- Commit subjects include AI resource dev/prod separation, provider migration docs, Gemini reconnect/zombie session fixes, Azure Speech SDK STT provider, event seed validation/test schemas.

Contribution interpretation:

- Strong evidence for AI backend infra/provider operations.
- Use with PROTON as a combined AI/realtime consultation case study.

Public-safe draft:

> SAY backend에서 AI resource separation, STT provider migration, LLM provider lifecycle, event data validation, and deployment workflow를 다뤘습니다.

Needs verification:

- Remove or sanitize any secret-like README material before public use.
- Clarify relationship with PROTON and SAY frontend/admin.

### PROTON

Verified facts:

- README describes realtime consultation backend with FastAPI, WebSocket, Azure OpenAI, STT providers, RAG-based advice, upsell recommendations, Azure Blob storage.
- `pyproject.toml` includes FastAPI, SQLAlchemy async, Alembic, LangChain/OpenAI packages, pytest, Ruff.
- Author/path evidence: KimMarin touched `app`, `docs`, `benchmark`, `frontend`, `config`, `prompts`, `scripts`.
- Commit subjects include LLM 3-layer trigger system, Gemini translation provider, audio response, Azure content filter handling, upsell prompt accuracy, Slack deploy notification.

Contribution interpretation:

- Strongest realtime AI backend evidence.
- Good for "AI agent/AI backend beyond CRUD" positioning.

Public-safe draft:

> PROTON에서 WebSocket 기반 realtime consultation backend, STT/translation/LLM provider, RAG advice/upsell trigger flow, and AI response quality fixes를 다뤘습니다.

Needs verification:

- Public-safe description of consultation domain.
- Whether "RAG" and provider details are safe to disclose.

### SSO-BE-API

Verified facts:

- Existing `02-company-work-evidence.md` already documents NestJS/Prisma/MySQL/Redis/JWT.
- `package.json` confirms NestJS, JWT, Prisma, TypeScript.
- Author/path evidence: KimMarin touched `src`, `test`, `prisma`, `.claude`, `docs`.
- Commit subjects include duplicate/session fixes, dynamic service group cache, logout JTI ownership, CEN-553 tests and docs.

Contribution interpretation:

- High-value backend architecture evidence despite lower commit count than BAY/NEXUS.

Public-safe draft:

> SSO에서 Redis/JTI 기반 session validation, duplicate login policy, service group cache, logout ownership, and E2E/unit test scenarios를 다뤘습니다.

### Infra Repos

Verified facts:

- `MEDISOLVEAI-INFRA`: B2B Azure Terraform infra, B2B/B2C boundary, service deployment, tenant/service expansion roadmap.
- `MEDISOLVEAI-B2C-INFRA`: B2C Azure Terraform infra, App Service phase, B2B impact zero, slot swap, Thready/Selly infra.
- `NEXUS-infra`: Terraform product infra, custom domain/SSL, collation, storage, remote backend migration, GitHub Actions deploy workflow.

Contribution interpretation:

- Together these support the claim that the user can bridge backend work to deployment/infra operations.

Public-safe draft:

> Terraform/Azure 기반 B2B/B2C/NEXUS infra에서 resource separation, App Service/ACR/deployment workflow, remote backend, custom domain/SSL, and tenant/product expansion paths를 정리했습니다.

Needs verification:

- Which resources were directly applied by the user.
- Public-safe cost/resource naming.

### thedaylabs-mso

Verified facts:

- README describes Daybeau sales/operations dashboard with React, FastAPI, SQLAlchemy async, PostgreSQL, Alembic, Docker Compose.
- AGENTS emphasizes evidence-first, consensus-first, destructive command ban, and test gates.
- Author/path evidence: marin touched `apps`, `docs`, `infra`, `scripts`, `packages`, `data`.
- Commit subjects include AI chat drawer/citation UI, hierarchical tools, web search, token streaming, session cache, Ollama memory controls, infra STG Terraform/Docker/Caddy.

Contribution interpretation:

- Strong supporting evidence for AX/AI internal tooling and evidence-first QA operations.

Public-safe draft:

> Daybeau dashboard/MSO 영역에서 AI chat tooling, citation UI, streaming/cache performance, STG infra, and evidence-first QA gates를 다뤘습니다.

### feynman_api

Verified facts:

- Author aliases `MementoAI-Daejeong <marin@mement.ai>` and `김대정 <marin@mement.ai>` total 48 commits.
- Commit subjects include Stripe/prepayment logic, refund/mileage/ticket handling, CODEOWNERS, happy-call query/template/migration work.

Contribution interpretation:

- Supports earlier Memento resume claims around payment/refund/domain fixes.

Public-safe draft:

> Memento Feynman에서 Stripe/prepayment, mileage refund, payment history rollback, happy-call templates/query/migration work를 수행했습니다.

Needs verification:

- Exact public-safe service description.

### CENTURION_DAY

Verified facts:

- User author signal: KimMarin 203 commits.
- README/AGENTS describe a FastAPI backend monorepo with React/Next frontend surfaces.
- Stack evidence includes FastAPI, Python, Tortoise ORM, PostgreSQL, React, Next.js, Docker, GitHub Actions.
- Author/path evidence: `backend`, `frontend`, `docs`, `planning`, `memories`.
- Commit subjects include reservation-close policy, FE calendar display, BE slot close judgment, release/integration planning.

Contribution interpretation:

- Strong supporting evidence for full-stack product-system work before or alongside NEXUS.
- Good evidence for turning product policy into BE/FE implementation plus docs/planning artifacts.
- NEXUS remains the cleaner first-screen case study; CENTURION_DAY is useful for historical depth.

Public-safe draft:

> CENTURION_DAY에서 FastAPI/Next 기반 product backend의 예약 정책, BE/FE integration, release planning, and agent-readable docs/memory workflow를 다뤘습니다.

### PROTON-BACKOFFICE

Verified facts:

- User author signal: KimMarin 36 commits.
- README/pyproject describe an Azure Functions + LangChain consultation analysis backoffice.
- Stack evidence: Python 3.13, Azure Functions, Azure Blob Storage, LangChain/OpenAI, SQLAlchemy, tests.
- Commit subjects include env validation, Function structure pattern, daily summary backfill, deployment/resource separation, docs cleanup.

Contribution interpretation:

- Good supporting evidence for serverless AI operations and post-processing workflows.
- Use as a bridge between realtime AI backend and operational analytics/backoffice automation.

Public-safe draft:

> PROTON-BACKOFFICE에서 Azure Functions/LangChain 기반 상담 분석 backoffice, storage integration, env validation, daily summary backfill, and deployment docs를 정리했습니다.

### CENTURION-CHARTY

Verified facts:

- User author signal: KimMarin 38 commits.
- Tracked structure includes `frontend`, `ai`, `backend`, `docs`, `.github`.
- Author/path evidence: `frontend`, `ai`, `backend`.
- Commit subjects include Azure CD workflow, pricing search, cart total, backend DB initialization, Docker filename encoding fix.

Contribution interpretation:

- Supporting evidence for cross-surface AI/FE/BE integration.
- Do not lead with it because repo-level public description and direct scope need more verification.

Public-safe draft:

> CENTURION-CHARTY에서 AI/FE/BE가 연결된 상담/차트 보조 surface의 pricing/search, Docker/runtime fixes, and Azure CD workflow를 다뤘습니다.

### centurion-linky

Verified facts:

- User author signal: KimMarin 9 commits.
- CLAUDE.md describes FastAPI backend, Next.js frontend, PostgreSQL/pgvector, Redis, RabbitMQ, TaskIQ/Celery-like worker, and multi-provider AI stack.
- Author/path evidence is concentrated in `backend`, `.claude`, `.github`, `docs`.
- Commit subjects include backend environment restructuring, CD pipeline, backend CLAUDE.md/convention docs, dependency-injector, TaskIQ DI, E2E tests.

Contribution interpretation:

- Low commit count but useful signal for backend convention, agent-readable docs, DI, worker, and CD setup.
- Use only as supporting evidence unless PR/direct scope is further verified.

Public-safe draft:

> centurion-linky에서 backend 개발 환경, CD pipeline, dependency injection, TaskIQ worker conventions, and agent-readable backend docs를 정리했습니다.

### Selly

Verified facts:

- User author signal: KimMarin 11 commits.
- README describes Vite/React frontend and FastAPI/SQLAlchemy/PostgreSQL/Alembic backend.
- Author/path evidence: `backend`, `.github`, `docs`.
- Commit subjects include backend deploy workflow prod extension, prod runbook, STG VM deployment, CI deploy triggers.

Contribution interpretation:

- Useful supporting evidence for deployment/runbook work, not product/backend ownership.

Public-safe draft:

> Selly에서 backend STG/Prod deployment workflow, runbook, and CI trigger setup을 정리했습니다.

### thedaylabs-infra

Verified facts:

- User author signal: KimMarin 8 commits.
- README describes Thedaylabs infra managed with Terraform.
- Stack evidence: Azure Container Registry, VM/Docker deployment, MySQL Flexible Server, Azure Storage-backed Terraform state.
- Commit subjects include Azure Blob Storage infra, VM deploy script, Managed Identity login, Docker Compose healthcheck, NSG SSH rule.

Contribution interpretation:

- Useful supporting evidence for infra operations outside MediSolve AI repos.
- Lower commit count, but high topical relevance for Terraform/Azure deployment claims.

Public-safe draft:

> thedaylabs-infra에서 Terraform/Azure 기반 Blob Storage, VM/Docker deployment, Managed Identity, and network rule setup을 다뤘습니다.

### centurion_mso

Verified facts:

- User author signal: KimMarin 22 commits.
- Author/path evidence is mostly `docs`.
- Commit subjects focus on BAY/admin DB unification, impact scope, sprint calendar, category/product/user/branch migration planning.

Contribution interpretation:

- Strong documentation/planning evidence rather than implementation evidence.
- Useful for showing product-system thinking and migration impact analysis.

Public-safe draft:

> centurion_mso에서 BAY/admin DB unification 영향 범위, migration planning, and stakeholder-facing docs를 정리했습니다.

## Updated Positioning From Workspace Audit

Before audit:

> BE/Infra를 직접 구축해본 엔지니어가, AI agent를 개인 생산성 도구를 넘어 조직의 AX 문제 해결 방식으로 확장하고 있다.

After audit:

> 여러 production-adjacent backend/infra/AI product repo에서 직접 구축·운영·문서화 흔적이 확인된다. 특히 thready/BAY/NEXUS/SAY cluster/infra repos는 "AI product + backend systems + infra + agent-readable workflow" 포지셔닝을 동시에 지지한다. 이 중 thready는 commit signal과 작업 범위 기준 메인 프로젝트다. PROTON은 SAY와 같은 프로젝트군으로 묶고, RAY/PCS/say-game-be는 이력서 우선순위에서 제외한다.

## Resume/Homepage Claim Candidates

### High Confidence

- Multi-brand product backend monorepo and evidence/document/task routing.
- FastAPI backend ownership across thready/BAY/NEXUS/SAY cluster.
- Async worker and event-driven backend experience: TaskIQ/RabbitMQ/SSE/WebSocket.
- AI backend experience: STT provider, LLM provider lifecycle, realtime consultation, AI generation quality/observability.
- AI supporting systems: counseling-practice backend, Azure Functions/LangChain analysis backoffice, and AI/FE/BE integration surfaces.
- Azure/Terraform infra experience across B2B/B2C/NEXUS.
- Agent-readable workflow: `AGENTS.md`, wiki/docs/tasks, mediness source-of-truth, evidence gates.

### Medium Confidence

- Direct "Tech Lead" scope across all repos.
- Production impact metrics.
- OpenDesign custom harness completion.
- Exact client/product names public-safe disclosure.

### Avoid Until Verified

- "단독 구축"
- "성능 N배 개선"
- "무중단 배포 구현"
- "production 장애 완전 해결"
- exact cost/resource/security details

## Profile Updates To Apply

Update `profile/contribution.md`:

- Promote `thready`, `SAY-BE-API`, `PROTON`, `NEXUS-infra`, `CENTURION-BE-API`, `CENTURION-API-GATEWAY`, `feynman_api` from implicit/omitted to explicit supporting projects.
- Mark `thready`, `BAY`, `NEXUS`, `SAY/PROTON`, `infra repos` as top evidence clusters.
- Add `CENTURION_DAY`, `PROTON-BACKOFFICE`, `CENTURION-CHARTY`, `centurion-linky`, `Selly`, `thedaylabs-infra`, `centurion_mso` as supporting evidence with careful confidence labels.
- Move `RAY-BE-API`, `PCS-BE-API`, and `say-game-be` to ignored/deprioritized evidence per user correction.

Update `profile/capabilities.md`:

- Add AI backend capability separate from generic Agent/AX.
- Add gateway/integration capability.
- Add evidence-first docs/task governance capability.

Update `context/current-state.md`:

- Next major step becomes JD market map after workspace audit.
