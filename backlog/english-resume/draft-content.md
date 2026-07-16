---
type: draft
title: English Resume Draft Content
description: claim 기반 영문 이력서 초안 — 영문 표현 상한(allowed_copy_en)이 registry에 등록되기 전의 draft.
timestamp: 2026-07-16
tags: [backlog, resume, english, draft]
---

# English Resume Draft Content

> ⚠️ **Draft** — 아래 영문 표현은 claim registry의 KO allowed_copy에서 강도 매핑으로 재작성한 초안이다. 영문 상한(allowed_copy_en)으로 registry에 등록되기 전까지 public 배포에 사용하지 않는다.

강도 매핑 계약: `owned` → owned / solely built · `led` → led · `co-led` → co-led · `contributed` → contributed to.

## Header

- Name: Daejeong Kim
- Role: `Backend Engineer · AI Product Systems`
- Positioning: Backend Engineer for AI Product Systems — builds AI products into operable systems.
- Contact: email, GitHub, Anyang-si, Gyeonggi-do (phone: PDF only)

## Summary

- Rebuilt an AI content generation backend end to end; owned development and operations since cutover (`thready.backend-rebuild`)
- Operates a production backend serving tens of thousands of monthly requests at under 1% HTTP 5xx (`thready.production-operation-quality`)
- Joined as a Backend Engineer; concurrently serving Tech Lead, PO, and AI-agent roles (`career.medisolve-role-evolution`)
- Structured and leads product schedule/issue/release operations as an agent-readable workflow (`mediness.product-operations`)

## Capabilities

- AI Product Systems — Built a generation quality system: typed prompt builder, LLM judge, evaluation loop, observability logging (`thready.generation-quality-system`)
- Product Backend Ownership — Led order/inventory APIs and async workers; led service boundaries and migrations in a hospital product monorepo (`centurion.bay-async-backend`, `nexus.backend-architecture`)
- Async & Realtime — Led retry-safe async flows isolating failure-prone work into workers; co-led realtime session lifecycle stabilization (`centurion.bay-async-backend`, `centurion.say-realtime-ai`)
- Infra-Aware Delivery — Owns company-wide Azure/Terraform infrastructure: per-environment resource boundaries, deployment, runbooks; solely built external product IaC (`infra.company-azure-ownership`, `nexus.terraform-infra`)
- Engineering Standard — Solely designed and built the org-standard FastAPI template: layered architecture, DI, ADR, conventions, runbooks (`be-template.backend-standard`)
- Agent-Readable Operations — Leads operations on a pipeline registry and release gates; built and operates a daily briefing agent (`mediness.product-operations`, `mediness.daily-briefing`)

## Skills

- Language / FW: Python, FastAPI, TypeScript, NestJS, Java, Spring Boot
- Data / Messaging: PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ
- Infra / Delivery: Azure, AWS, Terraform, Docker, GitHub Actions
- AI Product: LLM integration/evaluation, typed prompt, structured output, WebSocket, SSE, STT

## Selected Projects

### Thready · AI content generation product

- Rebuilt the FastAPI backend end to end; owned development and operations after cutover (`thready.backend-rebuild`, `thready.release-operation`)
- Built the generation quality system — typed prompt builder, LLM judge, evaluation loop, observability logging (`thready.generation-quality-system`)

### Centurion · Product backend

- Led order/inventory APIs, RabbitMQ/TaskIQ async workers, retry, and test/CI/onboarding setup (`centurion.bay-async-backend`)
- Co-led session lifecycle and provider-boundary stabilization for a realtime AI consultation backend (`centurion.say-realtime-ai`)

### BE Template · Engineering standard

- Solely designed and built the org-standard FastAPI template — layered architecture, DI, ADR, conventions, runbooks (`be-template.backend-standard`)
- Embedded an agent context system and automation skills for repetitive work (`be-template.agent-context`)

## Career

- MediSolve AI · Backend Engineer · 2025.04 — present: AI product backend, product operations, engineering standards; concurrent Tech Lead/PO/AI-agent roles (`career.medisolve-role-evolution`)
- Memento AI · Backend Engineer · 2024.10 — 2025.01: Stabilized prepayment and refund/mileage/ticket rollback correctness in a reservation/payment backend (`career.memento-payment`)
- TellingMe · Backend Lead & Infra · 2024.01 — 2024.12: Led the Spring Boot backend and AWS deployment/monitoring (personal project) (`career.tellingme-backend-infra`)
- STUDIO LAB · AI Engineer → PM → Backend Engineer · 2021.12 — 2024.01: Product-system experience connecting Vision AI, PM, and backend (`career.ai-pm-backend-continuity`)
- 아이즈솔 · Vision AI Engineer · 2020.08 — 2021.06: Started in AI product engineering with Vision AI (`career.ai-pm-backend-continuity`) — ⚠️ 공식 영문 사명 미확인, 확정 전까지 한글 표기 유지

## Agent Workflow

- Uses AI agents as an engineering operating layer, not code autocomplete
- Composes project rules and source-of-truth routing that humans and agents read together (`be-template.agent-context`)
- Tracks product execution and releases through decision/spec/work/release gates (`mediness.product-operations`)
- Built a daily briefing agent that aggregates collaboration-tool activity for blocker triage (`mediness.daily-briefing`)

## Education & Credentials

- Woosong University, Game Multimedia major (`credentials.education`)
- CES 2024 Best of Innovation — contributed to the awarded AI product (`credentials.ces-2024`)
- Patent registered: "Page Output Method" · KR 10-2898273 (`credentials.page-output-patent`) — ⚠️ 특허 영문 제목은 직역, 공식 영문 명칭 확인 필요
- ADsP · Advanced Data Analytics Semi-Professional (`credentials.adsp`)

## 미확정 항목 (등록 전 해소)

1. 아이즈솔 공식 영문 사명
2. 특허 공식 영문 제목
3. 전체 영문 표현의 registry 승인 (allowed_copy_en 등록)
