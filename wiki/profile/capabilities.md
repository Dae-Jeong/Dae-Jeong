---
type: profile
title: Capabilities
description: Canonical capability groups, evidence anchors, and confidence.
timestamp: 2026-07-11
tags: [capabilities, backend, ai-product, infra, agent-workflow]
---

# Capabilities

| Capability | Can do | Evidence | Confidence |
| --- | --- | --- | --- |
| Product Backend | domain API, auth/session, worker, integration, test/documentation layer 설계·구축 | Centurion, NEXUS | High |
| AI Product Backend | generation runtime, prompt contract, LLM evaluation, realtime provider/session lifecycle 운영 | Thready, SAY | High |
| Async And Realtime | RabbitMQ/TaskIQ worker, retry, WebSocket/SSE, session lifecycle 처리 | BAY, SAY | High |
| Infra-Aware Delivery | Terraform, Azure/AWS, Docker, GitHub Actions, deploy/runbook 연결 | Company Azure infra, NEXUS, Centurion, TellingMe | High |
| Engineering Standard | layered architecture, DI, ADR, convention, runbook, project bootstrap 설계 | BE Template | High |
| Agent-Readable Workflow | source-of-truth routing, decision/spec/work/release gate, daily briefing, evidence gate 운영 | mediness, BE Template | High for evidence; emerging public category |

## Working Stack

- Language/Framework: Python, FastAPI, TypeScript, NestJS; Java/Spring Boot in personal project
- Data/Messaging: PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ
- Runtime/Integration: WebSocket, SSE, STT/LLM integration
- Infra: Azure, AWS, Terraform, Docker, GitHub Actions
- AI Product: typed prompt builder, LLM judge/evaluation, structured output, observability logging

## Boundaries

- Kubernetes, Kafka, vector database, fine-tuning은 strong claim으로 사용하지 않는다.
- RAG, LangChain/LangGraph, observability tooling은 실제 범위 이상으로 platform expertise를 주장하지 않는다.
- Infra는 cloud-specific expert보다 deployable product backend 역량으로 설명한다.

Evidence: [Centurion](../evidence/projects/centurion.md), [Thready](../evidence/projects/thready.md), [BE Template](../evidence/projects/be-template.md), [Agent Workflow](../evidence/agent-workflow.md)
