---
type: profile
title: Capabilities
description: Canonical capability groups, evidence anchors, and confidence.
timestamp: 2026-08-21
tags: [capabilities, backend, ai-product, infra, agent-workflow, product, ux]
---

# Capabilities

| Capability | Can do | Evidence | Confidence |
| --- | --- | --- | --- |
| Product Backend | domain API, auth/session, worker, integration, test/documentation layer 설계·구축 | Centurion, NEXUS | High |
| AI Product Backend | generation runtime, prompt contract, LLM evaluation, realtime provider/session lifecycle 운영 | Thready, SAY | High |
| Async And Realtime | RabbitMQ/TaskIQ worker, retry, WebSocket/SSE, session lifecycle 처리 | BAY, SAY | High |
| Infra-Aware Delivery | Terraform, Azure/AWS, Docker, GitHub Actions, deploy/runbook 연결 | Company Azure infra, NEXUS, Centurion, TellingMe | High |
| Engineering Standard | layered architecture, DI, ADR, convention, runbook, project bootstrap 설계 | BE Template | High |
| Company AX Work Design | 제품 개발과 의사결정·회의·업무 배정·승인·후속 작업을 agent-readable context·tool·human gate로 연결 | MEDINESS, BE Template | Medium for company-work design; High for product operation and engineering execution |
| Agent-Readable Workflow | source-of-truth routing, decision/spec/work/release gate, agent context, evidence gate 운영 | MEDINESS, BE Template | High for product application and engineering execution |
| Product And UX Reasoning | 사용자 흐름의 pain point를 개선 가설·요구사항·prototype artifact로 구체화 | SellerCanvas, MoneyWalk UX consulting, Speak analysis | Medium |

## Working Stack

- Language/Framework: Python, FastAPI, TypeScript, NestJS; Java/Spring Boot in personal project
- Data/Messaging: PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ
- Runtime/Integration: WebSocket, SSE, STT/LLM integration
- Infra: Azure, AWS, Terraform, Docker, GitHub Actions
- AI Product: typed prompt builder, LLM judge/evaluation, structured output, observability logging
- Product/UX: user flow analysis, problem framing, requirement design, Figma artifact

## Boundaries

- Kubernetes, Kafka, vector database, fine-tuning은 strong claim으로 사용하지 않는다.
- RAG, LangChain/LangGraph, observability tooling은 실제 범위 이상으로 platform expertise를 주장하지 않는다.
- Infra는 독립된 cloud-specific expert 정체성보다, 제품과 회사의 실행 설계를 production까지 닫는 기술 근거로 설명한다.

Evidence: [Centurion](../evidence/projects/centurion.md), [Thready](../evidence/projects/thready.md), [BE Template](../evidence/projects/be-template.md), [Agent Workflow](../evidence/agent-workflow.md)
