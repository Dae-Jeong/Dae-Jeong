---
type: profile
title: Capabilities
description: Capability map across backend, infra, product systems, and agent/AX workflow.
timestamp: 2026-07-02
tags: [capabilities, backend, infra, ax]
---

# Capabilities

## Capability Map

| Capability | Evidence | Confidence | Public Angle |
| --- | --- | --- | --- |
| Backend API / Domain Architecture | FastAPI, NestJS, service/repository/validator layers, Tortoise/SQLAlchemy/Prisma | High | backend systems를 직접 구축 |
| Authentication / Authorization | SSO, JWT, Redis session/JTI, duplicate login policy | High | multi-service auth/session 문제 해결 |
| Async Messaging / Workers | RabbitMQ, TaskIQ, alimtalk, inventory integration | High for current structure, Medium for migration claim | API와 worker 책임 분리 |
| Realtime Events | SSE, `sse-starlette`, WebSocket, EventManager, per-user queue | High for design evidence | realtime product workflow 설계 |
| AI Backend / LLM Systems | STT provider, LLM provider lifecycle, WebSocket consultation, RAG advice, generation quality/observability, Azure Functions/LangChain analysis | High for repo evidence, Medium for public scope | AI product runtime을 backend system으로 운영 |
| Gateway / Service Integration | API Gateway routes, auth middleware, CORS, WebSocket proxy, inter-service RabbitMQ | Medium-High | 서비스 경계와 통합 흐름 관리 |
| Infra / Deployment | Azure, Terraform, Docker, ACR, GitHub Actions | High for repo evidence, Medium for direct scope | 서비스를 배포/운영 가능한 구조로 연결 |
| Product/System Thinking | AI content operations, multi-brand product backend, commerce/inventory/order, service boundary | High | 기술을 제품 운영 문제와 연결 |
| Evidence-First Docs / Agent Governance | `AGENTS.md`, wiki/docs/tasks, source-of-truth docs, confidence labels, release/QA evidence | High | agent가 읽고 실행 가능한 project context 설계 |
| Agent/AX Workflow | MCP, task/report, Codex orchestration, OpenDesign/Pencil direction | High for evidence, Medium for public maturity | 조직 context와 실행을 agent-readable하게 구조화 |
| Writing / Documentation | specs, evidence docs, contribution framing, writing backlog | High | 기술과 조직 문제를 글로 구조화 |

## Backend Strengths

- API and service boundary design
- Authentication/session policy
- Async worker separation
- Realtime event delivery
- Domain validation ownership
- Gateway and inter-service integration
- AI provider/runtime lifecycle handling
- Documentation-backed architecture

## Infra Strengths

- Azure deployment flow
- Terraform-based infra documentation
- Docker/ACR/GitHub Actions deployment patterns
- Environment separation and service map
- Tenant/service expansion framing
- AWS 경험: STUDIO LAB 인턴 시기 EC2/RDS(MySQL) 서버 운용 + MediSolve AWS -> Azure 전환기 (2025, `aws branch 분리` 커밋) — IaC/컨테이너 중심의 cloud-agnostic 역량으로 프레이밍 (user 확인 2026-07-05)

## Agent / AX Strengths

- Project-local `AGENTS.md` routing
- Source-of-truth document design
- Evidence gating and confidence labeling
- MCP-enabled browser/container operations
- OpenDesign-based design handoff direction
- Task/report/document workflow thinking

## AI Backend Strengths

- STT/LLM provider migration and lifecycle handling
- WebSocket-based realtime consultation runtime
- Generation quality contract and observability logging
- Azure Functions/LangChain-based analysis and backoffice workflow
- RAG/advice/upsell trigger flow framing
- Provider error and content-filter handling

## Gap Candidates For JD Analysis

Assumption until JD scraping:

- Kubernetes and production-grade orchestration may be a gap for platform/infra roles.
- Observability depth may need strengthening if JD requires logs/metrics/tracing ownership.
- LLM evaluation, RAG, governance, and agent security may be gaps for AI platform/AX roles.
- Public case-study artifacts are not yet complete.

## Evidence References

- Workspace audit: [../docs/resume/06-workspace-project-audit.md](../docs/resume/06-workspace-project-audit.md)
- Company work evidence: [../docs/resume/02-company-work-evidence.md](../docs/resume/02-company-work-evidence.md)
- Agent workflow evidence: [../docs/resume/03-agent-workflow-evidence.md](../docs/resume/03-agent-workflow-evidence.md)
- Strengths and traits: [../docs/resume/06-strengths-and-traits.md](../docs/resume/06-strengths-and-traits.md)
