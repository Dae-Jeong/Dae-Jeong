---
type: profile
title: Capabilities
description: Canonical capability groups, evidence anchors, and confidence.
timestamp: 2026-08-27
tags: [capabilities, backend, ai-product, infra, agent-workflow, product, ux]
---

# Capabilities

| Capability | Can do | Evidence | Confidence |
| --- | --- | --- | --- |
| Product Backend | domain API, auth/session, worker, integration, test/documentation layer 설계·구축 | Centurion, NEXUS | High |
| AI Product Backend | generation runtime, prompt contract, LLM evaluation, realtime provider/session lifecycle 운영 | Thready, SAY | High |
| Agentic Application Engineering | typed planner·capability registry·tool execution, conversation/turn/artifact ledger, activity projection, context compaction·confirmation gate 설계 | Thready AI independent prototype | High for verified prototype; not production operation |
| Async And Realtime | RabbitMQ/TaskIQ worker, retry, WebSocket/SSE, session lifecycle 처리 | BAY, SAY | High |
| Cloud/Delivery Support | Docker, GitHub Actions, Azure/AWS, Terraform을 활용한 서비스 배포·환경 설정·기본 운영 | Company deployment environment, NEXUS, Centurion, TellingMe | High for hands-on delivery; not positioned as infrastructure architecture expertise |
| Engineering Standard | FastAPI·SQLAlchemy 2.0 async, layered architecture, DI, repository·transaction·session 경계, ADR·runbook·project bootstrap 설계 | BE Template | High |
| Company AX Work Design | 제품 개발과 의사결정·회의·업무 배정·승인·후속 작업을 agent-readable context·tool·human gate로 연결 | MEDINESS, BE Template | Medium for company-work design; High for product operation and engineering execution |
| Agent-Readable Workflow | source-of-truth routing, decision/spec/work/release gate, agent context, evidence gate 운영 | MEDINESS, BE Template | High for product application and engineering execution |
| Evidence-Grounded Agent Workflow | 기존 codebase를 다음 판단의 권위로 삼지 않고 real-surface QA에서 lesson·anti-pattern·quality gate를 추출해 clean-v0 restart로 연결 | Paperthin | High for open-source design and implementation; no model-performance claim |
| Product And UX Reasoning | 사용자 흐름의 pain point를 개선 가설·요구사항·prototype artifact로 구체화 | SellerCanvas, MoneyWalk UX consulting, Speak analysis | Medium |

## Working Stack

- Language/Framework: Python, FastAPI, TypeScript, NestJS; Java·Spring·Spring Boot는 사이드 프로젝트 약 3개에서 활용 ([근거](../evidence/projects/previous-career.md#java-side-project-experience), `career.java-spring-side-projects`)
- Data/Messaging: PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ
- Runtime/Integration: WebSocket, SSE, STT/LLM integration
- Cloud/Delivery: Docker, GitHub Actions, Azure, Terraform, AWS — service deployment and basic operations
- AI Product: typed prompt builder, LLM judge/evaluation, structured output, observability logging, evidence-first agent iteration
- Product/UX: user flow analysis, problem framing, requirement design, Figma artifact

## Boundaries

- Kubernetes, Kafka, vector database, fine-tuning은 strong claim으로 사용하지 않는다.
- RAG, LangChain/LangGraph, observability tooling은 실제 범위 이상으로 platform expertise를 주장하지 않는다.
- Infra는 대표 전문성으로 선택하지 않는다. 서비스 배포와 기본 운영을 해본 보조 경험으로만 설명하고, cloud/network/security architecture 전문성으로 확대하지 않는다.

Evidence: [Centurion](../evidence/projects/centurion.md), [Thready](../evidence/projects/thready.md), [BE Template](../evidence/projects/be-template.md), [Paperthin](../evidence/projects/paperthin.md), [Agent Workflow](../evidence/agent-workflow.md)
