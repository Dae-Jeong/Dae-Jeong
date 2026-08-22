---
type: profile
title: Agent Workflow
description: Canonical agent-readable engineering, product operation, and company-work AX model.
timestamp: 2026-08-21
tags: [agent-workflow, ax, source-of-truth]
---

# Agent Workflow

## Canonical View

AI agent를 코드 자동완성 도구보다 engineering operating layer로 사용한다. 사람과 agent가 같은 project rules, source-of-truth, task state, tool interface, verification gate를 읽게 만들고, 제품 개발에서 쌓인 실행 맥락을 의사결정·회의·업무 배정·승인·후속 작업까지 연결하는 회사 AX 구조 설계에 참여한다.

## Operating Model

```text
제품 업무: Decision → SPEC → Work Package → QA → release
회사 업무: 회의 → 의사결정 → 업무 배정 → 승인 → 후속 작업
                              ↓
                 agent-readable context / tool
                              ↓
             사람의 판단과 승인 경계 (human gate)
                              ↓
                실행 결과 / 검증 근거 / feedback
```

## Verified Artifacts

- Global agent wiki: cross-project behavior, routing, hallucination control
- MEDINESS: 제품별 decision/spec/work/release 운영 pipeline과 회사 업무 AX 설계 surface
- BE Template: 직접 구축한 project-local agent context와 automation skill
- This repository: profile/evidence/product claim harness

## Public Position

Agent workflow는 primary job category가 아니다. Backend/AI product system과 회사 업무를 반복 가능하고 검증 가능한 실행 구조로 바꾸는 차별점이다.

## Maturity Guardrail

- MEDINESS의 제품별 Decision→release pipeline은 적용·운영 근거가 있다.
- 의사결정·회의·업무 배정·승인·후속 작업을 잇는 회사 업무 AX는 설계와 단계적 적용 범위다. 전환 완료나 전사 업무 통합 완료로 표현하지 않는다.
- MEDINESS app·DB·runtime 구현은 담당 개발팀의 범위다. 제품 요구·운영 설계 참여와 제품별 운영 리드, 직접 구축한 BE Template의 ownership을 분리한다.
- daily briefing 직접 구축·운영은 Git author 근거 재검증 전 공개 claim으로 사용하지 않는다.
- Daejeong Design 기반 design harness는 별도 project에서 개발 중이다.
- 완료되지 않은 integration은 `building/adapting`으로 표현한다.

Evidence: [Agent Workflow Evidence](../evidence/agent-workflow.md), [mediness claims](../evidence/claims/mediness.yaml), [BE Template claims](../evidence/claims/be-template.yaml)
