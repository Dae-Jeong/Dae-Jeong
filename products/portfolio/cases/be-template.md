---
type: portfolio-case
case: be-template
title: 조직 표준 backend 템플릿 — 아키텍처 표준과 agent 컨텍스트 시스템을 한 번에
resume_tag: BE TEMPLATE
origin: MediSolve AI · 조직 표준
claim_ids: [be-template.backend-standard, be-template.agent-context]
claim_strength: owned
---

## Executive Summary

새 backend를 시작할 때 반복되던 architecture·convention·setup과 agent context 구성을 하나의 조직 표준 FastAPI template로 만들었습니다. stable layered core와 project별 option을 분리하고, 사람과 agent가 같은 source-of-truth와 automation skill을 사용하도록 설계·구축했습니다.

## My Scope

- organization FastAPI template architecture, convention, runbook 설계·구축 전담
- project-local agent context routing과 반복 작업 automation skill 구축 전담
- template의 조직 전체 adoption이나 절감 시간을 정량 성과로 claim하지 않음

## Problem And Constraints

새 backend project마다 directory structure, DI, transaction, error response, local setup을 다시 결정하고 있었습니다. AI agent도 project context와 작업 절차를 매번 새로 읽고 추론해야 했습니다.

반면 project마다 multi-tenancy 여부, ID type, authentication, storage가 달라 하나의 고정 scaffold로 모든 선택을 강제할 수 없었습니다. 표준을 만들되 실제 product 차이를 숨기지 않는 경계가 필요했습니다.

## Decision And Alternatives

- Router -> Service -> Repository, DI, transaction, error contract는 stable core로 고정하고 tenancy·ID·auth·storage는 명시적인 option으로 분리했습니다.
- project별 copy-and-modify는 처음에는 빠르지만 convention과 문서가 서로 drift합니다.
- Trade-off: 모든 차이를 흡수하는 generic framework는 유연하지만 이해·도입 비용과 option 조합 복잡도가 커집니다. template은 반복되는 core만 표준화하고 product-specific domain은 생성 후 확장하도록 제한했습니다.

## System Design And Implementation

diagram: layered architecture (Router -> Service -> Repository) -> DI · @transactional · type safety (Pyright) -> ADR · convention · runbook -> [soft] agent context system (hierarchical context · skills)

- response wrapper matrix, ErrorCode domain prefix, contract test 구성
- multi-tenancy / ID type / authentication(JWT·SSO) / storage(local·S3·Azure) option 설계
- 영역별 context routing과 `init-project`·`add-domain`·`db-reset`·`local-setup` automation skill 내장

## Failure Modes And Operation

- option 조합이 core architecture를 분기시키지 않도록 변경 지점을 명시적인 설정과 생성 workflow로 제한
- response·error contract가 project마다 달라지는 문제를 matrix와 contract test로 고정
- type·transaction boundary 회귀를 Pyright, DI, `@transactional` convention으로 제한
- 문서가 여러 진입점에서 갈라지는 문제를 Hub-and-Spoke 단방향 routing과 ADR로 관리

## Evidence, Result, And Limits

- Code-backed: layered architecture, DI, transaction, option matrix, contract test, automation skill이 확인됨
- Documentation-backed: ADR, convention, runbook, Hub-and-Spoke context routing이 확인됨
- Limits: template adoption project 수, 초기 setup 시간, context cost 절감의 before/after는 측정되지 않아 설계·구축 범위까지만 표현함

## Stack

FastAPI · SQLAlchemy 2.0 · dependency-injector · Alembic · Pyright · ADR · agent context system
