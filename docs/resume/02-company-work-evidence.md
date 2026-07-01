---
type: evidence-note
title: Company Work Evidence
description: Local repository evidence for MediSolve AI company work and resume-ready claims.
timestamp: 2026-07-02
tags: [resume, company-work, medisolve-ai, backend, infra]
---

# Company Work Evidence

## Scope

이 문서는 회사에서 진행한 업무를 public resume/homepage claim으로 전환하기 위한 내부 근거 정리다. 주로 `/Users/marin/workspace` 아래 로컬 repo를 확인했다.

Checked repositories:

- `/Users/marin/workspace/CENTURION_DAY`
- `/Users/marin/workspace/SSO-BE-API`
- `/Users/marin/workspace/BAY-BE-API`
- `/Users/marin/workspace/RAY-BE-API`
- `/Users/marin/workspace/MEDISOLVEAI-INFRA`

Not fully inspected yet:

- Frontend repos: `DAYBEAU-ADMIN-FE`, `CERAMIQUE-FE`, `CERAMIQUE-HOMEPAGE-FE`, `MEDI-HOMEPAGE-RENEWAL-FE`
- Older/current related services: `SAY-BE-API`, `PCS-BE-API`, `NEXUS`, `NEXUS-infra`, `MEDISOLVEAI-B2C-INFRA`
- Git history, PR history, production metrics, incident logs

## High-Level Resume Claim

Source-backed version:

> MediSolve AI에서 피부과/성형외과 멀티 브랜드 병원 운영 플랫폼의 backend, authentication, async messaging, realtime notification, Azure infra/deploy flow를 설계하고 운영했다. FastAPI/NestJS 기반 서비스와 Terraform/Azure 기반 인프라, project-level agent workflow를 함께 다뤘다.

Risk:

- "단독", "완전 해결", "성능 N배 개선", "30개 도메인" 같은 표현은 repo 문서나 Git history로 추가 확인 전까지 `Unverified`다.
- 고객사/병원명은 public disclosure 가능 범위를 별도 확인해야 한다.

## CENTURION_DAY / NEXUS

### Evidence

Code-backed evidence:

- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md:3` says the project is a multi-brand hospital management system for dermatology/plastic surgery and uses an agent-team-based development workflow.
- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md:7` through `:30` describes the repo structure: FastAPI backend monorepo with `api-gateway`, `admin-api`, `homepage-api`, `shared`, plus frontend admin/homepage/crm.
- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md:33` through `:40` lists the stack: FastAPI, Python 3.12, Tortoise ORM async, PostgreSQL 16, React 19, Next.js 15, TypeScript 5, TailwindCSS 3, UV, pnpm/Turborepo, GitHub Actions, ACR, Docker, Vercel.
- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md:42` through `:91` defines backend, frontend, design, and planning agent teams.
- `/Users/marin/workspace/CENTURION_DAY/AGENTS.md:100` through `:106` lists operating brands: Ceramique, Vellicell, Daybeau.
- `/Users/marin/workspace/CENTURION_DAY/README.md:22` through `:35` documents shared MCP settings for Playwright and Docker.
- `/Users/marin/workspace/CENTURION_DAY/backend/README.md:5` through `:13` states the project goal: one codebase, independent deployment per brand, HQ/Branch permission separation, i18n.
- `/Users/marin/workspace/CENTURION_DAY/backend/README.md:15` through `:23` lists major functions: reservation, procedure products, customer management, closure-table categories, content.
- `/Users/marin/workspace/CENTURION_DAY/backend/README.md:27` through `:35` states backend stack and deployment/infra: FastAPI, Python 3.12, Tortoise ORM, PostgreSQL 16, UV monorepo, GitOps, Terraform Azure.
- `/Users/marin/workspace/CENTURION_DAY/backend/README.md:183` through `:224` documents layer conventions: Router -> Schema -> Service -> Validator -> Repository -> Model, with Validator owning business exceptions.
- `/Users/marin/workspace/CENTURION_DAY/backend/README.md:228` through `:257` records known limitations and technical debt.

### What This Means

이 프로젝트는 단순 API 서버가 아니라 병원 브랜드별 독립 운영, 본사/지점 권한, 홈페이지/어드민/CRM을 다루는 multi-brand B2B healthcare SaaS 계열 시스템이다.

Resume-ready bullets:

- FastAPI/Python 기반 multi-brand hospital management backend monorepo를 운영하며 `api-gateway`, `admin-api`, `homepage-api`, shared module 경계를 다뤘다.
- HQ/Branch 권한 분리, 브랜드별 독립 배포, i18n, reservation/product/customer/content domain을 포함한 병원 운영 플랫폼 구조를 설계/정리했다.
- Router-Schema-Service-Validator-Repository-Model 계층 규칙을 문서화하고, business validation과 exception ownership을 분리했다.
- Playwright/Docker MCP와 project `AGENTS.md`를 통해 browser/debug/container 작업을 agent workflow에 연결했다.

Case-study candidate:

- `NEXUS: multi-brand hospital SaaS backend monorepo and agent-team operating model`

## SSO-BE-API

### Evidence

Code-backed evidence:

- `/Users/marin/workspace/SSO-BE-API/AGENTS.md:33` through `:47` describes a centralized SSO system for Centurion, Bay, and PCS with NestJS, TypeScript, MySQL, Prisma, Redis, JWT.
- `/Users/marin/workspace/SSO-BE-API/AGENTS.md:140` through `:160` documents a domain-driven module structure.
- `/Users/marin/workspace/SSO-BE-API/AGENTS.md:162` through `:172` lists key patterns: API versioning, response transformer, JWT guard, Redis session guard, validation pipe, exception filters, device middleware.
- `/Users/marin/workspace/SSO-BE-API/AGENTS.md:174` through `:179` documents authentication flow: login, token verification, refresh rotation, group logout.
- `/Users/marin/workspace/SSO-BE-API/AGENTS.md:181` through `:204` documents duplicate-login prevention through Redis session/device tracking and service-group policy.
- `/Users/marin/workspace/SSO-BE-API/AGENTS.md:206` through `:222` documents data hierarchy and JWT payload.
- `/Users/marin/workspace/SSO-BE-API/AGENTS.md:224` through `:231` documents environment guard behavior across local/test/dev/stg/prod.

### What This Means

SSO는 단순 JWT 발급기가 아니라 여러 서비스의 구독/권한/세션 정책을 중앙화하는 인증 도메인이다. 특히 Redis session/JTI/device/session group 정책은 "멀티서비스 인증의 운영 문제"를 해결하는 case-study로 적합하다.

Resume-ready bullets:

- NestJS/Prisma/Redis 기반 centralized SSO를 통해 Centurion/Bay/PCS 계열 서비스 인증과 권한을 통합했다.
- JWT access/refresh token rotation, Redis session/JTI validation, service-group logout 정책을 설계/운영했다.
- 동일 사용자/서비스/디바이스 조건에 따른 duplicate session policy를 정의하고 guard/filter/interceptor 계층에 연결했다.

Case-study candidate:

- `SSO: Redis/JTI 기반 멀티서비스 중복 로그인 방지와 session group logout`

## BAY-BE-API

### Evidence

Code-backed evidence:

- `/Users/marin/workspace/BAY-BE-API/README.md:3` through `:12` describes BAY backend as a FastAPI/MySQL backend with Python 3.13+, SQLAlchemy, Alembic, and uv.
- `/Users/marin/workspace/BAY-BE-API/README.md:14` through `:56` documents project structure: API, core, DB, models, schemas, services, utils, tests, migrations.
- Code search found TaskIQ/RabbitMQ infrastructure in `pyproject.toml`, `src/core/config.py`, `src/core/taskiq/*`, and workers.
- Code search found `polars[calamine,xlsx2csv]` dependency in `/Users/marin/workspace/BAY-BE-API/pyproject.toml`.
- Code search found `TaskIQ` and separate `alimtalk`/`inventory` brokers in `/Users/marin/workspace/BAY-BE-API/src/core/taskiq/alimtalk.py`, `/Users/marin/workspace/BAY-BE-API/src/core/taskiq/inventory.py`, and `/Users/marin/workspace/BAY-BE-API/src/core/taskiq/multi_worker.py`.
- Code search found RabbitMQ/TaskIQ settings in `/Users/marin/workspace/BAY-BE-API/src/core/config.py`, including separate exchange/queue names for alimtalk and inventory integration.
- Code search found async 알림톡 handling in `/Users/marin/workspace/BAY-BE-API/src/workers/alimtalk_worker.py` and service flow references in `/Users/marin/workspace/BAY-BE-API/src/service/order.py`.
- `/Users/marin/workspace/BAY-BE-API/docs/policy/v1.0.0.md` search result shows policy entries for TaskIQ, RabbitMQ, inventory integration, and async 알림톡.

### What This Means

BAY는 inventory/order/alimtalk domain을 가진 FastAPI backend이며, TaskIQ/RabbitMQ 기반 async worker 구조와 Excel/data processing이 중요한 claim 후보이다.

Resume-ready bullets:

- FastAPI/SQLAlchemy/MySQL 기반 BAY backend에서 order, inventory, alimtalk domain을 다뤘다.
- TaskIQ + RabbitMQ 기반 async worker를 통해 알림톡 발송과 inventory integration 작업을 API 처리 흐름에서 분리했다.
- Polars 기반 Excel parsing/data processing 의존성을 도입해 대량 업로드/정규화 계열 작업의 기반을 마련했다.

Risk:

- "Celery -> TaskIQ migration"은 기존 resume claim에는 있지만, 이번 근거 조사에서는 현재 TaskIQ 구조만 확인했다. migration history는 Git history나 이전 commit/문서 확인 전까지 `Unverified`.
- "성능 개선" 수치는 benchmark나 운영 지표 확인 전까지 쓰지 않는다.

Case-study candidate:

- `BAY: TaskIQ/RabbitMQ로 알림톡과 재고 비동기 작업 분리`

## RAY-BE-API

### Evidence

Code-backed evidence:

- `/Users/marin/workspace/RAY-BE-API/README.md:1` through `:14` describes RAY as a FastAPI backend with Python 3.13+, MySQL, SQLAlchemy 2.0, Alembic, UV, dependency-injector, pytest, Ruff/Pyright, Docker/Gunicorn.
- `/Users/marin/workspace/RAY-BE-API/README.md:146` through `:151` documents API docs path.
- `/Users/marin/workspace/RAY-BE-API/README.md:190` through `:192` states GitHub Actions based Azure auto-deploy on `dev`, `stg`, and `prod`.
- `/Users/marin/workspace/RAY-BE-API/docs/sse-design-starlette.md:1` through `:12` documents an SSE-based realtime procedure status/notification system using `sse-starlette`.
- `/Users/marin/workspace/RAY-BE-API/docs/sse-design-starlette.md:16` through `:35` explains heartbeat, send timeout, disconnect detection, EventManager + asyncio.Queue, and proxy buffering concerns.
- `/Users/marin/workspace/RAY-BE-API/docs/sse-design-starlette.md:107` through `:123` explains connection setup, user registration, event publish, and multi-connection delivery.
- `/Users/marin/workspace/RAY-BE-API/docs/sse-design-starlette.md:184` through `:202` documents Gunicorn/Uvicorn and Nginx operational settings for SSE.
- `/Users/marin/workspace/RAY-BE-API/docs/sse-design-starlette.md:213` through `:239` lists implementation features and files.
- Code search found RabbitMQ publisher integration in `/Users/marin/workspace/RAY-BE-API/src/integration/rabbitmq_publisher.py` and procedure-session trigger references in `/Users/marin/workspace/RAY-BE-API/src/service/procedure_session.py`.

### What This Means

RAY는 procedure workflow에서 realtime status/notification과 BAY inventory deduction event를 다루는 서비스다.

Resume-ready bullets:

- RAY procedure workflow에 SSE 기반 realtime status/notification channel을 설계했다.
- `sse-starlette`, `EventManager`, per-user queue, heartbeat, disconnect cleanup, proxy buffering control을 고려해 운영 가능한 SSE 구조를 만들었다.
- RabbitMQ publisher를 통해 procedure session completion 이후 BAY inventory deduction event를 비동기로 연동했다.

Risk:

- SSE 구현 범위와 production traffic 안정성은 code/test/운영 로그로 추가 확인 필요.

Case-study candidate:

- `RAY: SSE 기반 실시간 시술 현황 알림과 RAY-BAY inventory event 연동`

## MEDISOLVEAI-INFRA

### Evidence

Code-backed evidence:

- `/Users/marin/workspace/MEDISOLVEAI-INFRA/README.md:1` through `:8` states that this repo manages Centurion SaaS Azure infra with Terraform, that B2B and B2C infra are separated except for one shared ACR.
- `/Users/marin/workspace/MEDISOLVEAI-INFRA/README.md:73` through `:96` documents Terraform structure: shared, dev-stg, prod, modules, docs.
- `/Users/marin/workspace/MEDISOLVEAI-INFRA/README.md:100` through `:115` documents Terraform management strategy for `.tf`, `.auto.tfvars`, `tfstate`, and generated DB password variables.
- `/Users/marin/workspace/MEDISOLVEAI-INFRA/README.md:119` through `:135` documents shared/dev/stg/demo/prod resources and VM list.
- `/Users/marin/workspace/MEDISOLVEAI-INFRA/README.md:139` through `:156` lists service deployment structure: sso-api, say-api, bay-api, proton-api, stargate-api, charty-api.
- `/Users/marin/workspace/MEDISOLVEAI-INFRA/README.md:160` through `:190` documents deploy script, ACR image build/push, and GitHub Actions deploy path for API Gateway.
- `/Users/marin/workspace/MEDISOLVEAI-INFRA/README.md:194` through `:204` documents hospital expansion by independent VNet, DB, and VM per hospital.
- `/Users/marin/workspace/MEDISOLVEAI-INFRA/README.md:216` through `:222` documents roadmap: hospital module, CI/CD, K8s.

### What This Means

Infra는 "서비스를 만들었다" 수준을 넘어 hospital/onboarding scale과 tenant isolation을 고민한 근거다.

Resume-ready bullets:

- Terraform으로 Centurion B2B Azure infra를 관리하고, B2B/B2C 경계와 shared ACR 외 리소스 분리 원칙을 문서화했다.
- Dev/STG/Demo/Prod VM, service deploy script, ACR image build/push, GitHub Actions deploy flow를 운영 문서화했다.
- 병원별 독립 VNet/DB/VM 확장 구조와 이후 CI/CD/K8s 확장 로드맵을 정리했다.

Case-study candidate:

- `Infra: 병원별 독립 Azure infra와 Terraform 기반 확장 전략`

## Public Resume Claims By Confidence

### High Confidence

- Multi-brand hospital management system backend work
- FastAPI/Python and NestJS/TypeScript backend work
- SSO with JWT/Redis/JTI/session guard concepts
- SSE realtime notification design in RAY
- TaskIQ/RabbitMQ async worker architecture in BAY
- Terraform/Azure infra documentation and deployment flow
- Agent-team/project `AGENTS.md` workflow around backend/frontend/design/planning

### Medium Confidence

- Celery to TaskIQ migration: current TaskIQ is confirmed, migration path not yet confirmed.
- Polars performance improvement: dependency and use are confirmed, measured improvement not yet confirmed.
- "Tech Lead" scope: existing resume says Tech Lead; repo evidence shows broad architecture/docs, but org/role source should be confirmed before making it headline.

### Keep As Unknown Or Unverified

- Exact numerical impact: performance, deployment time, error reduction, user growth.
- "단독 구축", "완전 해결", "N개 도메인" unless Git history/project issue evidence is added.
- Any client/hospital disclosure that could be confidential.

## Suggested Company Work Narrative

Short version:

> MediSolve AI에서 병원 운영 SaaS의 backend and infra layer를 맡아 multi-brand architecture, centralized SSO, async messaging, realtime notification, and Azure deployment workflow를 구축했다. 동시에 project-level AGENTS, MCP, design/planning agent roles를 정리해 AI agent가 실제 개발 조직의 문서/설계/구현 흐름에 들어오도록 운영했다.

Long version:

> 피부과/성형외과 병원 운영 플랫폼에서 backend service boundary, authentication/session policy, async worker, realtime event delivery, and Azure deployment architecture를 다뤘다. FastAPI/Python 기반 BAY/RAY/NEXUS와 NestJS/Prisma 기반 SSO를 연결했고, RabbitMQ/TaskIQ/SSE/Terraform/GitHub Actions를 이용해 서비스 간 결합도를 낮추고 운영 흐름을 문서화했다. 이 과정에서 `AGENTS.md`, MCP, role-based planning/design/backend agents를 활용해 요구사항-화면기획-와이어프레임-구현으로 이어지는 agentic workflow를 실험하고 정리했다.

