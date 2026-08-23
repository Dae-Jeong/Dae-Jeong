---
type: profile
title: Capabilities
description: Canonical capability groups, evidence anchors, and confidence.
timestamp: 2026-08-23
tags: [capabilities, backend, ai-product, infra, agent-workflow, product, ux]
---

# Capabilities

| Capability | Can do | Evidence | Confidence |
| --- | --- | --- | --- |
| Product Backend | domain API, auth/session, worker, integration, test/documentation layer 설계·구축 | Centurion, NEXUS | High |
| AI Product Backend | generation runtime, prompt contract, LLM evaluation, realtime provider/session lifecycle 운영 | Thready, SAY | High |
| Async And Realtime | RabbitMQ/TaskIQ worker, retry, WebSocket/SSE, session lifecycle 처리 | BAY, SAY | High |
| Cloud/Delivery Support | Docker, GitHub Actions, Azure/AWS, Terraform을 활용한 서비스 배포·환경 설정·기본 운영 | Company deployment environment, NEXUS, Centurion, TellingMe | High for hands-on delivery; not positioned as infrastructure architecture expertise |
| Engineering Standard | layered architecture, DI, ADR, convention, runbook, project bootstrap 설계 | BE Template | High |
| Company AX Work Design | 제품 개발과 의사결정·회의·업무 배정·승인·후속 작업을 agent-readable context·tool·human gate로 연결 | MEDINESS, BE Template | Medium for company-work design; High for product operation and engineering execution |
| Agent-Readable Workflow | source-of-truth routing, decision/spec/work/release gate, agent context, evidence gate 운영 | MEDINESS, BE Template | High for product application and engineering execution |
| Product And UX Reasoning | 사용자 흐름의 pain point를 개선 가설·요구사항·prototype artifact로 구체화 | SellerCanvas, MoneyWalk UX consulting, Speak analysis | Medium |

## Working Stack

- Language/Framework: Python, FastAPI, TypeScript, NestJS; Java/Spring Boot in personal project
- Data/Messaging: PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ
- Runtime/Integration: WebSocket, SSE, STT/LLM integration
- Cloud/Delivery: Docker, GitHub Actions, Azure, Terraform, AWS — service deployment and basic operations
- AI Product: typed prompt builder, LLM judge/evaluation, structured output, observability logging
- Product/UX: user flow analysis, problem framing, requirement design, Figma artifact

## Boundaries

- Kubernetes, Kafka, vector database, fine-tuning은 strong claim으로 사용하지 않는다.
- RAG, LangChain/LangGraph, observability tooling은 실제 범위 이상으로 platform expertise를 주장하지 않는다.
- Infra는 대표 전문성으로 선택하지 않는다. 서비스 배포와 기본 운영을 해본 보조 경험으로만 설명하고, cloud/network/security architecture 전문성으로 확대하지 않는다.

Evidence: [Centurion](../evidence/projects/centurion.md), [Thready](../evidence/projects/thready.md), [BE Template](../evidence/projects/be-template.md), [Agent Workflow](../evidence/agent-workflow.md)
