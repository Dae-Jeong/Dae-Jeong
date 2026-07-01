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
| Backend API / Domain Architecture | FastAPI, NestJS, Spring Boot, service/repository/validator layers | High | backend systems를 직접 구축 |
| Authentication / Authorization | SSO, JWT, Redis session/JTI, duplicate login policy | High | multi-service auth/session 문제 해결 |
| Async Messaging / Workers | RabbitMQ, TaskIQ, alimtalk, inventory integration | High for current structure, Medium for migration claim | API와 worker 책임 분리 |
| Realtime Events | SSE, `sse-starlette`, EventManager, per-user queue | High for design evidence | realtime procedure notification 설계 |
| Infra / Deployment | Azure, Terraform, Docker, ACR, GitHub Actions | High for repo evidence, Medium for direct scope | 서비스를 배포/운영 가능한 구조로 연결 |
| Product/System Thinking | multi-brand hospital SaaS, HQ/Branch, service boundary | High | 기술을 제품 운영 문제와 연결 |
| Agent/AX Workflow | `AGENTS.md`, source-of-truth docs, MCP, task/report, OpenDesign plan | High for evidence, Medium for public maturity | 조직 context와 실행을 agent-readable하게 구조화 |
| Writing / Documentation | specs, evidence docs, contribution framing, writing backlog | High | 기술과 조직 문제를 글로 구조화 |

## Backend Strengths

- API and service boundary design
- Authentication/session policy
- Async worker separation
- Realtime event delivery
- Domain validation ownership
- Documentation-backed architecture

## Infra Strengths

- Azure deployment flow
- Terraform-based infra documentation
- Docker/ACR/GitHub Actions deployment patterns
- Environment separation and service map
- Hospital/tenant expansion framing

## Agent / AX Strengths

- Project-local `AGENTS.md` routing
- Source-of-truth document design
- Evidence gating and confidence labeling
- MCP-enabled browser/container operations
- OpenDesign-based design handoff direction
- Task/report/document workflow thinking

## Gap Candidates For JD Analysis

Assumption until JD scraping:

- Kubernetes and production-grade orchestration may be a gap for platform/infra roles.
- Observability depth may need strengthening if JD requires logs/metrics/tracing ownership.
- LLM evaluation, RAG, governance, and agent security may be gaps for AI platform/AX roles.
- Public case-study artifacts are not yet complete.

