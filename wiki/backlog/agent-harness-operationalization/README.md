---
type: idea
title: Dae-Jeong Operational Agent Harness
description: 기존 knowledge harness에 실행 루프·센서·권한·관측·래칫을 최소 구성으로 보강한다.
status: idea
registered: 2026-09-03
tags: [backlog, agent-workflow, harness]
---

# Dae-Jeong Operational Agent Harness

## 한 줄

이미 운영 중인 profile·evidence·products knowledge harness를 유지하면서, agent 작업의 실행·검증·복구 과정을 반복 가능하고 관측 가능한 운영 하네스로 확장한다.

## 메모

- OMO 같은 범용 orchestration 도구의 즉시 설치를 전제로 하지 않는다. 현재 Codex·global wiki·project skill과 겹치는 기능 및 추가 상태의 운영 비용을 먼저 비교한다.
- 첫 후보는 변경 범위에 따라 workspace validator, frontend lint/build, renderer·visual check를 선택 실행하는 단일 verification entrypoint다.
- active source만 검색·주입하고 `archive/`가 작업 근거로 섞이지 않도록 retrieval 경계를 검증한다.
- 실패가 반복되면 guide 문구에만 남기지 않고 재현 → 원인 분류 → rule/sensor/permission 수정 → 회귀 검증으로 닫는 ratchet 계약을 둔다.
- 작업 기록은 raw conversation이나 credential을 남기지 않고 task id, 변경 경로, 검증 결과, 시도 횟수, 중단 사유처럼 진단에 필요한 최소 구조화 정보만 다룬다.
- 자동화의 목적은 무인 실행 자체가 아니라 사람이 판단해야 하는 지점과 agent가 증거로 닫을 수 있는 지점을 분명히 하는 것이다.

## 설계

- [design-v1.md](design-v1.md) — 2026-09-03 문안 작업 루프 실측 → 6계층 갭 → verify 단일 진입·게이트 11/13/14/15/16·skill 2개·래칫 계약. P0 착수 결정 대기.

## 연결

- [Repository agent rules](../../../AGENTS.md)
- [Agent workflow](../../profile/agent-workflow.md)
- [Agent workflow evidence](../../evidence/agent-workflow.md)
- [Resume knowledge harness design](../../docs/superpowers/specs/2026-07-11-resume-knowledge-harness-design.md)
- [Workspace validator](../../../tools/validate_workspace.py)

## 승격

6계층 gap audit와 OMO 도입 여부 비교 후, 구현 범위가 확정되면 spec/task로 승격한다.
