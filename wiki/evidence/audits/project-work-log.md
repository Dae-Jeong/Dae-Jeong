---
type: project-work-log
title: Project Work Log
description: Git-evidence backed list of work streams before converting them into resume contribution statements.
timestamp: 2026-07-02
tags: [workspace, work-log, contribution, evidence, resume]
source_roots: [workspace, agentspace]
---

# Project Work Log

## Purpose

이 문서는 기여도 문장을 쓰기 전에, 프로젝트별로 실제로 수행한 작업들을 먼저 펼쳐 놓는 작업 원장이다.

Use this as input for the next step:

1. 작업 목록을 검토한다.
2. 유사한 작업을 묶는다.
3. `문제 -> 내가 한 일 -> 근거 -> 공개 가능한 성과/효과` 형식의 contribution bullet로 압축한다.

## Scope

Included:

- Core: `thready`, `BAY-BE-API`, `NEXUS`, `SAY-BE-API / PROTON`
- Infra: `MEDISOLVEAI-INFRA`, `MEDISOLVEAI-B2C-INFRA`, `NEXUS-infra`
- Supporting: `CENTURION_DAY`, `SSO-BE-API`, `CENTURION-BE-API`, `CENTURION-API-GATEWAY`, `PROTON-BACKOFFICE`, `thedaylabs-mso`, `thedaylabs-infra`, `feynman_api`
- Minor supporting: `CENTURION-CHARTY`, `centurion-linky`, `centurion_mso`, `Selly`

Excluded from resume/homepage prioritization per user correction:

- `RAY-BE-API`
- `PCS-BE-API`
- `say-game-be`

## Evidence Method

Commands used:

- `git log --all --author=<user-aliases> --name-only --format=''`
- `git log --all --author=<user-aliases> --no-merges --date=short --format='- %ad %s'`
- keyword filters for backend, AI, infra, testing, docs, deployment, and migration terms

Author aliases:

- `KimMarin`
- `marin@medisolveai`
- `Dae-Jeong`
- `v4chelsea`
- `MementoAI-Daejeong`
- `김대정`
- `marin@mement`

Caveat:

- This is Git-evidence backed, but still not a final contribution claim.
- Commit subjects can over/under-represent work because of squash, WIP commits, pair work, and review/planning work outside Git.
- Do not publish this raw document. Convert to public-safe contribution statements first.

## Project Priority

| Priority | Project / Cluster | Reason |
| --- | --- | --- |
| 1 | `thready` | Main project; highest author signal; backend/frontend/docs/tasks breadth; AI product runtime evidence |
| 2 | `BAY-BE-API` | Strong backend ownership; domain/API/worker/test/docs evidence |
| 3 | `NEXUS` | Backend architecture, migration, infra control-plane, agent-readable governance |
| 4 | `SAY-BE-API / PROTON` | Same SAY project cluster; realtime AI consultation/provider/STT/LLM lifecycle |
| 5 | Infra cluster | Azure/Terraform, B2B/B2C separation, deployment, remote state, runbooks |
| 6 | Supporting projects | SSO, CENTURION_DAY, legacy/gateway, backoffice, Thedaylabs, Memento |

## thready

Evidence snapshot:

- User commits: 1180 / 1458
- Main touched paths: `backend`, `frontend`, `frontend-react`, `tasks`, `docs`, `scripts`, `.github`, `wiki`

Work streams:

- AI content generation runtime
  - critique -> revise improvement layer
  - 2-step AI generation pipeline
  - single generation runtime cleanup
  - naturalize node after generation
  - first draft model fixed to GPT
  - default AI generation model changed to GPT

- Prompt and writer pipeline
  - writer prompt assembly split into typed build module
  - writer prompt rendered through a single path
  - `source_context` typed cleanup
  - replies definition duplication removed
  - prompt text unified and naturalized
  - purpose/naturalness contract encoded into writer prompt
  - viral hook 8-dimension rubric reflected into writer prompt

- AI quality measurement and evaluation
  - LLM judge for generation quality
  - local prompt evaluation sweep script
  - benchmark local-api mode repaired against current contract
  - baseline benchmark and quality diagnosis docs
  - generation quality observation data persisted

- Model routing and product runtime behavior
  - AI generation model selection routing cleanup
  - model dropdown order changed to GPT-first
  - draft length cap and body/reply flow constraints
  - identity-intro opening avoided; hook/tension opening improved

- Observability, release, and operations
  - backend observability logging hardened
  - version bump and rc release alignment
  - BE/FE/env drift resolved for release candidates
  - background job master and staged work packages documented
  - Studio runtime removed and decommission plan recorded
  - Claude CLI payload contract test reflected

- Agent-readable docs/tasks workflow
  - `tasks/` work packages and release/QA task structure maintained
  - v1.4/v1.5 background work plans documented
  - implementation/operation/release/verification source-of-truth routing maintained

Likely contribution directions:

- AI generation quality system
- Full-stack AI product runtime ownership
- Release/QA and operational documentation workflow
- Agent-readable product execution system

## BAY-BE-API

Evidence snapshot:

- User commits: 856 / 1136
- Main touched paths: `src`, `tests`, `docs`, `migrations`, `tests_v2`, `.claude`, `scripts`, `.github`, `docker`

Work streams:

- Backend domain/API work
  - order cancellation behavior for `CREATED` orders and `OrderProduct`
  - pending order query optimization
  - order rule and branch connection changes
  - product simple/list/detail APIs
  - product filter APIs and product filter integration
  - product order preservation
  - cursor pagination and infinite scroll support
  - product filter `all` parameter handling

- Async worker and messaging
  - Notification/Celery removal and Alimtalk/TaskIQ migration
  - TaskIQ 1st/2nd/3rd stage configuration
  - TaskIQ context injection fixes
  - TaskIQ retry handling for inventory deduction errors
  - RabbitMQ duration option sync
  - inventory TaskIQ env/settings integration

- Inventory and Excel/data workflows
  - inventory refactor guide from aggregate to commit-style accounting
  - Excel product registration docs
  - Excel duplicate handling fixes
  - Excel response camel-case adjustment
  - Swagger updates for modified Excel behavior
  - template filename and QA fixes

- Test infrastructure and coverage
  - API test infrastructure with Object Mother pattern
  - test environment configuration
  - API coverage expansion
  - domain spec docs and test supplements
  - receipt confirmation validation tests
  - Docker-based CI test infra

- Local/dev/ops workflow
  - Docker Compose local automation and initial data
  - FE onboarding guide and one-command Docker Compose setup
  - env structure normalization and pydantic-settings cleanup
  - handover docs and project improvement docs
  - Claude/TDD workflow docs

Likely contribution directions:

- Backend ownership across order/product/inventory domains
- Async worker migration and reliability
- Test/CI/local onboarding system
- Handover-ready backend documentation

## NEXUS

Evidence snapshot:

- User commits: 755 / 965
- Main touched paths: `packages`, `docs`, `infra`, `plans`, `.github`, `.claude`, `tests`, `envs`, `scripts`

Work streams:

- Backend monorepo architecture
  - FastAPI-free shared harness import cleanup
  - `api-gateway`, `admin-api`, `homepage-api`, shared package boundaries
  - admin/homepage API fixes and schema/test improvements
  - reservation, homepage, i18n, catalog, product/excel flows

- Product/catalog/excel workflows
  - multilingual bundle grouping and normalization
  - `product_code` allocation by bundle code
  - duplicate language validation and destructive QA cases
  - upload error log persistence
  - branch/product mapping fixes
  - homepage category ordering and OAuth config cleanup

- Migration and domain audit
  - Daybeau legacy migration analysis
  - domain folder separation and contaminated data analysis
  - customer/reservation migration analysis
  - migration handoff artifacts
  - remigration drift guard and runbook
  - current v2.0.3 reverse-engineering audit with screen/step coverage

- Infra/control-plane work
  - NEXUS-infra imported into `infra/`
  - IaC pipeline improvement
  - Terraform state restoration and plan drift tracking
  - DB collation and subnet drift fixes
  - OIDC setup and Terraform version constraint relaxation
  - staging environment retirement cleanup

- Agent-readable governance
  - backend harness and docs governance alignment
  - project control-plane and design gate docs
  - local full-stack runbook
  - docs review skill and document quality verification
  - migration policy and domain policy docs

Likely contribution directions:

- Multi-brand hospital SaaS monorepo architecture
- Migration/data/domain audit system
- Infra-aware backend platform work
- Agent-readable project governance

## SAY Cluster: SAY-BE-API / PROTON

Evidence snapshot:

- User commits: `SAY-BE-API` 430 / 973, `PROTON` 418 / 645
- Main touched paths:
  - `SAY-BE-API`: `apps`, `src`, `docs`, `.claude`, `frontend`, `libs`, `alembic`, `tests`, `envs`
  - `PROTON`: `app`, `docs`, `benchmark`, `.claude`, `frontend`, `config`, `scripts`, `prompts`

Work streams:

- AI provider and infrastructure lifecycle
  - AI resource dev/prod separation
  - direct endpoint support
  - provider migration docs
  - Azure OpenAI API version alignment
  - LLM provider switched/adjusted for guide analysis
  - provider auth modes split for Vertex/API key-style setups
  - provider-specific language code handling

- Realtime session and Gemini Live lifecycle
  - Gemini Live zombie session prevention
  - reconnect race-condition fixes
  - GC state TTL and orchestrator requirements
  - session timeout API
  - pause/resume behavior
  - turn-complete session switching to prevent utterance cutoff
  - punctuation-based sentence splitting
  - spacing and response-format fixes

- STT, translation, and audio pipeline
  - Azure Speech SDK STT provider implementation and environment migration
  - Gemini Live STT provider and staggered pipeline
  - Gemini Translation provider
  - dual-to-single translation session refactor
  - realtime audio response delivery
  - audio sequence matching

- AI analysis and dashboard/stargate work
  - dashboard AI analysis v2 with 5-axis insight aggregation
  - LLM structured output schema handling
  - fallback guarantee for analysis items
  - prompt tuning for dashboard analysis
  - SUCCESS consultation absence -> skip Stargate analysis
  - statistic-based LLM analysis integration
  - recommendation keyword seed and quality seed work

- Event seed, validation, and tests
  - event data setup design/plan docs
  - validation schemas and cross-validation
  - tests around event seed, payment integer overflow, dashboard permissions/staff/stargate/boundary cases
  - E2E seed guide and Swagger docs

- CI, docs, handover, and operations
  - GitHub Actions runner migration
  - AI infra migration As-Is/To-Be docs
  - zombie session and infra change docs
  - handover docs and Gemini research report
  - Swagger docs for dashboard/payment/mock APIs
  - production/staging config restoration and defensive scheduler logic

Likely contribution directions:

- Realtime AI consultation backend
- STT/LLM provider orchestration
- AI analysis/dashboard pipeline
- Provider lifecycle and operational hardening

## Infra Cluster

Included:

- `MEDISOLVEAI-INFRA`
- `MEDISOLVEAI-B2C-INFRA`
- `NEXUS-infra`

Work streams:

- Company infra monorepo and Terraform roots
  - B2B Terraform roots moved under `azure/b2b`
  - B2C Terraform roots imported
  - NEXUS hospital Terraform roots imported
  - company infra monorepo roots declared
  - monorepo migration plan and validation documented
  - final infra architecture diagram and handover docs

- B2B/B2C boundary and resource separation
  - B2B/B2C repo and resource boundaries documented
  - B2C deployment slot/current state documented
  - Prod deployment checklist and DB migration guide
  - Thready prod monitoring alert import and out-of-Terraform resource notes
  - Selly VM infra reflected and CI/CD/migration state documented

- Azure/Terraform operations
  - NEXUS Terraform state container added
  - remote backend migration for NEXUS hospital state
  - App Service custom domain and SSL support
  - DB collation variable and Korean collation default
  - Azure Storage module and hospital application
  - App Service/VM deployment separation
  - ACR auth and latest image pull fixes
  - health check failure workflow handling
  - Bastion/SSH deploy simplification

- Service deploy and operational docs
  - service addition guide and deployment wiki flow
  - infra visualization dashboard
  - infra cost analysis docs
  - operations issue diagnosis and resolution docs
  - Azure resource wiki and onboarding guide
  - Procedure Hub/Charty/Linky examples reflected in docs and deploy scripts

Likely contribution directions:

- Azure/Terraform infra ownership
- B2B/B2C environment separation
- deployment/runbook/documentation system
- backend engineer with infra execution capability

## CENTURION_DAY

Evidence snapshot:

- User commits: 203 / 465
- Main touched paths: `backend`, `frontend`, `docs`, `memories`, `planning`, `plan`, `.claude`

Work streams:

- Reservation policy and domain behavior
  - calendar reservation-close status
  - full-slot close judgment on backend
  - stopped/closed slot display in reservation time dropdown
  - reservation filter/status/staff/platform consistency
  - reservation cancel -> full-state release
  - reservation edit current value handling
  - customer -> patient terminology changes

- BE/FE integration
  - FE calendar display for closed reservations
  - CRM reservation detail button behavior
  - management dashboard query button separation
  - admin/auth middleware and CORS preflight fixes
  - API Gateway CRM routing

- QA/test/data
  - CRM API destructive tests
  - reservation domain E2E test infra
  - local seed scenarios for slot bug reproduction
  - QA seed scenario definitions
  - user journey scenarios and QA/demo seed split

- Release, docs, and planning
  - reservation policy docs
  - planning docs from policy/spec
  - release docs and TC set
  - docs-code sync for flows/data model/spec
  - Docker Compose/Caddy/deploy script setup

Likely contribution directions:

- Product policy -> backend/frontend implementation
- reservation workflow correctness
- QA seed/test/release documentation

## SSO-BE-API

Evidence snapshot:

- User commits: 90 / 189
- Main touched paths: `apps`, `src`, `test`, `docs`, `.github`, `.claude`, `prisma`

Work streams:

- Auth/session policy
  - Redis-based session management infra
  - duplicate login prevention tests
  - JWT payload/deviceId changes
  - expired cookie re-login behavior
  - logout JTI ownership verification
  - revoked-token/session-missing error handling
  - token/info subscription validation refactor

- E2E and test infra
  - E2E infra with Docker, cookie-parser, error filter
  - CEN-553 unit/E2E scenarios
  - auth-session E2E failure fixes
  - Admin E2E common infra and wave tests
  - Admin Saga/CRUD/Sync/Subscriptions/Services/Dashboard E2E

- Database and architecture
  - monorepo restructure into backend/admin-fe apps
  - local SSO MySQL -> PostgreSQL transition
  - SAY PG sharing and `sso_local` schema separation
  - Prisma baseline migration squash
  - Bay/SAY sync upsert behavior

- Admin/service management slices
  - branches list/detail/create
  - master services CRUD
  - staff list/create/detail/status transition/sync
  - subscriptions matrix
  - dashboard summary

- Documentation
  - SSO login policy mirror
  - Postgres transition plan/type mapping
  - MySQL -> PostgreSQL migration playbook
  - admin-fe API contract docs
  - E2E planning/infra/agent instruction docs

Likely contribution directions:

- Multi-service auth/session architecture
- reliability through E2E and policy docs
- service-admin backend system

## CENTURION Legacy / Gateway

Included:

- `CENTURION-BE-API`
- `CENTURION-API-GATEWAY`

Work streams:

- Legacy backend domain work
  - reservation v2 core logic
  - reservation internal refactors
  - time-slot daily data and branch policy generation
  - weekday/weekend reservation time limits
  - reservation completion status and automatic completion
  - Vegas/external sync handling on confirmed reservation changes
  - customer reservation migration
  - product/procedure domain first implementations
  - product category, product detail, simple product, pagination/base repository patterns
  - storage logic and S3 path fixes
  - Swagger docs and auth header improvements

- Gateway/routing work
  - route config externalization
  - SSO host/target compatibility restoration
  - CORS domain patterns and service access restrictions
  - Charty/Linky/Watch/STG/Prod host additions
  - WebSocket proxy support
  - HTTP proxy middleware upgrade for WebSocket EPIPE
  - path rewrite fixes for WebSocket upgrade
  - Prometheus metrics endpoint and metrics path exclusions

Likely contribution directions:

- legacy platform stabilization
- reservation/product backend depth
- API gateway/service routing and WebSocket proxy operations

## PROTON-BACKOFFICE

Evidence snapshot:

- User commits: 36 / 40
- Main touched paths: `shared`, `tests`, `docs`, `scripts`, `envs`, `daily_summary`, `analyze_consultation`

Work streams:

- Serverless AI analysis workflow
  - Azure Functions consultation analysis backoffice
  - BaseAnalyzer abstraction
  - prompt separation
  - consultation summary/analysis fallback logic
  - Content Filter retry behavior and unit tests
  - daily summary backfill for missing historical data

- Test/build/deploy workflow
  - Python 3.13 + uv migration
  - pre-commit with Ruff + pytest
  - test refactor from 28 to 59 tests
  - deploy script cleanup and health check
  - dev/prod resource group separation
  - env validation scripts
  - deployment/testing/docs cleanup

Likely contribution directions:

- serverless AI operations
- AI analysis reliability
- test/deploy discipline for AI backoffice

## Thedaylabs

Included:

- `thedaylabs-mso`
- `thedaylabs-infra`

Work streams:

- Internal AI chat / AX tooling
  - AI chat scaffold
  - Ollama provider and Docker Compose
  - JWT validation
  - read-only backend client
  - LangGraph orchestrator
  - tool set and citation validator
  - SSE/streaming
  - AI chat logs audit writer
  - frontend chat drawer and citation UI
  - hierarchical tools, source blocks, web search, turn-level streaming
  - context overview session cache
  - token streaming and memory tuning

- Architecture/test/documentation
  - AI-CHAT execution plan and MVP decisions
  - architecture/unit tests and night-run gate expansion
  - convention baseline with regression/convention/architecture defenses
  - layer rule reinforcement
  - onboarding guide
  - handoff snapshot before context compaction

- Infra and data sync
  - STG Terraform + Docker Compose + Caddy + manual deploy scripts
  - sales analytics STG resource group/naming
  - STG runbook for deploy and data sync
  - backend healthcheck/admin IP fixes
  - S3 sync rowcount fix
  - Azure Blob Storage infra
  - VM deployment script with Managed Identity
  - Docker Compose v2 and health check fixes
  - NSG SSH rule and VM lifecycle policy

Likely contribution directions:

- AX/internal AI tool implementation
- evidence-first QA and architecture gates
- infra plus runbook execution

## Memento: feynman_api

Evidence snapshot:

- User commits: 48 / 2716
- Main touched paths: `feynman_api`, `tests`, `alembic`

Work streams:

- Payment/prepayment
  - Stripe integration and prepayment logic
  - payment confirmation timing changed to reservation confirmation
  - prepayment detection fixes
  - payment history save/rollback fixes

- Refund/mileage/ticket
  - prepayment failure rollback
  - mileage refund logic changes
  - full-mileage purchase refund issue
  - homepage reservation cancel refund condition
  - refund processing order
  - ticket removal timing on refund

- Happy call / template / misc
  - happy-call template memo
  - happy-call send history return restoration
  - survey and happy-call template relationship
  - CODEOWNERS for auto reviewer

Likely contribution directions:

- payment/refund domain correctness
- healthcare reservation/payment backend experience

## Minor Supporting Projects

### CENTURION-CHARTY

Work streams:

- Azure CD workflow
- pricing search and cart selected-item total
- backend DB initialization ordering
- AI Docker filename encoding issue
- backend DB path / AI host env cleanup
- Express MVC restructure
- Flask application factory and blueprint pattern
- frontend component split and project convention/docs

### centurion-linky

Work streams:

- backend development environment rebuild
- CD pipeline
- dependency-injector introduction
- TaskIQ DI
- E2E tests
- backend folder-level agent docs and convention docs
- Dockerfile and CD pipeline fixes

### centurion_mso

Work streams:

- BAY/admin DB unification planning
- migration impact scope
- sprint calendar and workstream breakdown
- infra/db/backend/external integration/data migration/verification/test/runbook categories
- meeting-ready task sheets and stakeholder docs
- review feedback preservation and response sheet

### Selly

Work streams:

- backend deploy workflow extended to production
- production runbook
- STG VM deployment configuration
- backend deploy triggers
- Thready-style backend deploy workflow
- deployment flow visualization

## Excluded / Not For Resume Priority

These may still exist in Git evidence, but are intentionally not part of resume/homepage priority.

| Project | Reason |
| --- | --- |
| `RAY-BE-API` | User explicitly deprioritized |
| `PCS-BE-API` | User explicitly deprioritized |
| `say-game-be` | User explicitly deprioritized |
| FE repos with 1-3 commits | Only small fixes/deploy triggers; do not imply frontend ownership |
| repos with 0 user commits | Skip for contribution claims |

## Next Step

Turn this work log into contribution statements using this format:

```text
Project / Cluster
- Problem:
- Work I did:
- Evidence:
- Public-safe contribution:
- Confidence:
```
