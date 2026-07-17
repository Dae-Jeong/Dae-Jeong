---
type: profile
title: Agent Workflow
description: Canonical agent-readable engineering and product operation model.
timestamp: 2026-07-11
tags: [agent-workflow, ax, source-of-truth]
---

# Agent Workflow

## Canonical View

AI agent를 코드 자동완성 도구보다 engineering operating layer로 사용한다. 사람과 agent가 같은 project rules, source-of-truth, task state, tool interface, verification gate를 읽게 만든다.

## Operating Model

```text
global collaboration rules
        ↓
project AGENTS and routing
        ↓
decision / spec / work contract
        ↓
code / design / tool execution
        ↓
test / QA / release evidence
```

## Verified Artifacts

- Global agent wiki: cross-project behavior, routing, hallucination control
- mediness: decision/spec/work/release product operation pipeline
- BE Template: project-local agent context and automation skill
- This repository: profile/evidence/product claim harness

## Public Position

Agent workflow는 primary job category가 아니다. Backend/AI product system을 반복 가능하고 검증 가능한 방식으로 운영하는 차별점이다.

## Maturity Guardrail

- mediness와 BE Template workflow는 구축·운영 근거가 있다.
- Daejeong Design 기반 design harness는 별도 project에서 개발 중이다.
- 완료되지 않은 integration은 `building/adapting`으로 표현한다.

Evidence: [Agent Workflow Evidence](../evidence/agent-workflow.md), [mediness claims](../evidence/claims/mediness.yaml), [BE Template claims](../evidence/claims/be-template.yaml)
