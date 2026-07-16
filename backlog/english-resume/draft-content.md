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
- Positioning: Backend Engineer for AI Product Systems — turns AI products into reliable production systems.
- Contact: email, GitHub, Anyang-si, Gyeonggi-do (phone: PDF only)

## Summary

- Rebuilt an AI content generation backend end to end; own development and operations since cutover (`thready.backend-rebuild`)
- Operate a production backend serving tens of thousands of monthly requests with a ~0.3% HTTP 5xx rate (99.7%+ success) (`thready.production-operation-quality`)
- Joined as a Backend Engineer, while also serving as Tech Lead and Product Owner (`career.medisolve-role-evolution`)
- Built and run a release workflow where AI agents read specs, track issues, and gate releases (`mediness.product-operations`)

## Capabilities

- AI Product Systems — Built a generation quality system: typed prompt builder, LLM judge, evaluation loop, observability logging (`thready.generation-quality-system`)
- Product Backend Ownership — Led order/inventory APIs and async workers; led service boundaries and migrations in a hospital product monorepo (`centurion.bay-async-backend`, `nexus.backend-architecture`)
- Async & Realtime — Designed retry-safe async pipelines that offload failure-prone operations to background workers; co-led realtime session lifecycle stabilization (`centurion.bay-async-backend`, `centurion.say-realtime-ai`)
- Infra-Aware Delivery — Own company-wide Azure/Terraform infrastructure: per-environment resource boundaries, deployment, runbooks; built external product IaC as the sole engineer (`infra.company-azure-ownership`, `nexus.terraform-infra`)
- Engineering Standards — Designed and built the org-standard FastAPI template as the sole engineer: layered architecture, DI, ADR, conventions, runbooks (`be-template.backend-standard`)
- Agent-Readable Operations — Run product operations on a pipeline registry and release gates; built and operate a daily briefing agent (`mediness.product-operations`, `mediness.daily-briefing`)

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

### BE Template · Engineering standards

- Designed and built the org-standard FastAPI template as the sole engineer — layered architecture, DI, ADR, conventions, runbooks (`be-template.backend-standard`)
- Embedded an agent context system and automation skills for repetitive work (`be-template.agent-context`)

## Career

- MediSolve AI · Backend Engineer · Apr 2025 – Present: AI product backend, product operations, engineering standards; also serving as Tech Lead and Product Owner (`career.medisolve-role-evolution`)
- TheDayLabs · Freelance · Feb 2025 – Apr 2025: Freelance engagement between Memento's closure and joining MediSolve (`career.thedaylabs-freelance`) — ⚠️ 공식 영문 사명 미확인 (더데이랩스)
- Memento AI · Backend Engineer · Oct 2024 – Jan 2025: Fixed correctness bugs in prepayment, refund, mileage, and ticket rollback flows for a reservation/payment backend; role ended when the company ceased operations (`career.memento-payment`)
- TellingMe · Side Project · Jan 2024 – Dec 2024: Led the Spring Boot backend and AWS deployment/monitoring; run concurrently with the Memento role (`career.tellingme-backend-infra`) — 이력서에서는 Projects 섹션으로 분리 표기
- STUDIO LAB · AI Engineer → PM → Backend Engineer · Dec 2021 – Jan 2024: Product-system experience connecting Vision AI, PM, and backend (`career.ai-pm-backend-continuity`)
- 아이즈솔 · Vision AI Engineer · Aug 2020 – Jun 2021: Started in AI product engineering with Vision AI (`career.ai-pm-backend-continuity`) — ⚠️ 공식 영문 사명 미확인, 확정 전까지 한글 표기 유지

## Agent Workflow

- Use AI agents as an engineering operating layer, not code autocomplete
- Compose project rules and source-of-truth routing that humans and agents read together (`be-template.agent-context`)
- Track product execution and releases through decision/spec/work/release gates (`mediness.product-operations`)
- Built a daily briefing agent that aggregates collaboration-tool activity for blocker triage (`mediness.daily-briefing`)

## Education & Credentials

- Woosong University, Game Multimedia major (`credentials.education`) — ⚠️ 학위 명칭(B.S. 여부) 확인 필요
- CES 2024 Best of Innovation — contributed to the awarded AI product (`credentials.ces-2024`)
- Patent registered: "Page Output Method" · KR 10-2898273 (`credentials.page-output-patent`) — ⚠️ 특허 영문 제목은 직역, 공식 영문 명칭 확인 필요
- ADsP · Advanced Data Analytics Semi-Professional (`credentials.adsp`)

## 미확정 항목 (등록 전 해소)

1. 아이즈솔 공식 영문 사명
2. 더데이랩스 공식 영문 사명 (임시: TheDayLabs)
3. 특허 공식 영문 제목
4. 학위 명칭 (B.S. 여부)
5. 전체 영문 표현의 registry 승인 (allowed_copy_en 등록)

2026-07-16 개정: persona review(글로벌 EN 리뷰어) 지적 반영 — implied first person, "serving as", "as the sole engineer", "Fixed correctness bugs", 날짜 포맷(Mon YYYY), Engineering Standards 복수형, 지표 재밴딩(~0.3%), TheDayLabs 추가, TellingMe side-project 분리, Memento 폐업 사유.
