---
type: profile
title: Agent Workflow
description: Canonical draft for how Kim Daejeong uses AI agents and AX workflow.
timestamp: 2026-07-02
tags: [agent-workflow, ax, opendesign, mcp]
---

# Agent Workflow

## Core Claim

저는 AI agent를 단순 coding assistant가 아니라, 조직의 요구사항, 문서, 코드, 디자인 handoff, 운영 절차를 연결하는 AX layer로 봅니다.

## Public Homepage Draft

```text
저는 AI agent를 단순히 코드 자동완성이나 질문 답변 도구로 쓰지 않습니다.
제품 문서, 코드베이스, 디자인 handoff, 테스트/운영 명령을 agent가 읽고 실행할 수 있게 구조화합니다.

Global wiki는 협업 원칙과 evidence rule을 담고, project AGENTS.md는 repo별 ownership과 실행 규칙을 담습니다.
제품 문서는 Baseline, Decision, Spec, Work Package, QA/PR evidence로 나누고,
MCP와 OpenDesign을 통해 browser, Docker, UI prototype, design artifact를 작업 흐름에 연결합니다.
```

## Operating Pattern

```text
Source Of Truth
→ Context Routing
→ Task / Spec / Work Package
→ Agent Execution
→ Evidence / Report
→ Resume, Writing, or Product Artifact
```

## Artifacts

| Artifact | Purpose |
| --- | --- |
| Global agent wiki | cross-project collaboration rules and hallucination control |
| Project `AGENTS.md` | repo-specific ownership and execution routing |
| `agentspace/mediness-nexus` | baseline, decision, spec, work, QA/PR evidence workflow |
| Codex orchestration workspace | task queue, worker reports, health checks, dashboard experiment |
| MCP | browser automation, Docker/container operations, future tool integrations |
| OpenDesign | spec-to-prototype/design handoff direction |

## AX Problem Framing

| Problem | Agent/AX Direction |
| --- | --- |
| 요구사항이 구현까지 정확히 전달되지 않음 | policy -> spec -> wireframe -> implementation artifact chain |
| 문서와 코드가 어긋남 | source-of-truth routing, evidence-gated reviews |
| context 복원 비용이 큼 | `AGENTS.md`, repo map, current-state docs, task/report |
| 운영 지식이 사람에게 묶임 | runbook, MCP, deploy docs, reproducible commands |
| design/FE/BE handoff 비용이 큼 | OpenDesign/Pencil/spec-to-prototype workflow |

## Guardrails

- 아직 custom OpenDesign harness가 완성된 것은 아니므로 "building/adapting" 표현을 쓴다.
- 회사 내부 자료를 공개 예시로 쓸 때는 민감 정보 제거가 필요하다.
- agent 활용을 과장하지 말고, 실제 산출물과 workflow 중심으로 설명한다.

