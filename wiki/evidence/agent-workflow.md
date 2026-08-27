---
type: workflow-evidence
title: Agent Workflow Evidence
description: Global wiki, project rules, product harness, MCP, and design handoff evidence.
timestamp: 2026-07-11
source_roots: [wiki, agentspace, workspace]
tags: [agent-workflow, ax, harness, evidence]
---

# Agent Workflow Evidence

## Verified Components

| Logical source | Evidence |
| --- | --- |
| `wiki:agents/README.md` | cross-project agent behavior source of truth |
| `wiki:agents/_map.md` | minimal context routing and progressive disclosure |
| `wiki:agents/hallucination-control.md` | evidence labels and uncertainty control |
| `agentspace:mediness` | decision, spec, work, QA, release workflow |
| `workspace:MEDISOLVEAI-BE-TEMPLATE` | project-local agent context and automation skill |
| `personal-workspace:paperthin` | 기존 codebase보다 real-surface evidence·lesson·anti-pattern·quality gate가 다음 cycle을 결정하는 open-source agent workflow |

## Public Claim

AI agent를 단순 coding assistant가 아니라 project rules, source-of-truth documents, tasks, tools, and verification gates를 연결하는 engineering workflow로 사용한다.

Paperthin에서는 이 경계를 iteration 판단까지 확장했다. 이미 만든 code와 architecture를 진척도의 대리값으로 삼지 않고, 실제 surface 검증에서 추출한 lesson·anti-pattern·quality gate만 다음 v0의 입력으로 넘긴다. Stable public claim은 `paperthin.evidence-first-agent-cycle`이 소유한다.

## Coding Agent Use

- User-confirmed (2026-08-27): Claude Code와 Codex를 실제 codebase 분석, 기능 inventory, 반복 구현, test·validation 작업에 지속적으로 사용한다.
- Artifact-backed: project-local agent context, global routing wiki, Decision·SPEC·Work Package, ADR·runbook, verification command가 Claude Code와 Codex가 읽을 수 있는 source-of-truth 구조로 존재한다.
- Decision boundary: architecture, scope, evidence 기준, test acceptance, cutover·release 판단은 사람이 소유한다. coding agent가 제품 판단이나 release를 자율 결정한다고 표현하지 않는다.

## Maturity Boundary

- Global wiki와 mediness/BE Template harness는 구축·운영 근거가 있다.
- Daejeong Design/Open Design custom design harness는 별도 repository에서 개발 중이다.
- Design harness가 완료되기 전에는 `building/adapting` 표현을 사용한다.

## Public Safety

Private paths, raw conversations, credentials, customer content, internal product status를 공개하지 않는다.
