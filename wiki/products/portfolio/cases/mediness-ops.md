---
type: portfolio-case
case: mediness-ops
title: agent 기반 제품 운영 시스템 — 리드 업무를 회의가 아니라 시스템으로
resume_tag: MEDINESS
origin: MediSolve AI · 제품 운영
claim_ids: [mediness.product-operations, mediness.daily-briefing]
claim_strength: led
---

## Executive Summary

여러 제품의 일정·이슈·릴리스 상태를 decision -> SPEC -> Work Package -> release gate로 연결하고, 협업 도구 활동을 daily briefing agent가 집계하도록 만들었습니다. 제품 운영을 리드하면서 human decision과 agent aggregation의 경계를 유지한 운영 시스템입니다.

## My Scope

- 제품팀 일정·이슈·release operation 리드
- decision/SPEC/WP pipeline, registry, release gate workflow 구축·운영
- daily briefing agent와 blocker triage flow 구축·운영
- product·business 최종 결정은 human owner의 범위이며 agent의 자율 의사결정으로 claim하지 않음

## Problem And Constraints

여러 제품의 상태가 회의, 개인의 기억, Slack·Jira·GitHub·Confluence에 나뉘어 있었습니다. 어떤 결정이 어떤 SPEC과 실행 작업으로 이어졌는지, release를 막는 blocker가 남아 있는지 확인하는 비용이 매일 반복됐습니다.

협업 도구의 activity는 최신 상태를 추정하는 재료일 뿐 완전한 source-of-truth가 아닙니다. 누락·지연되거나 서로 충돌할 수 있어 agent summary가 사람의 product decision을 대신해서는 안 됐습니다.

## Decision And Alternatives

- 수동 status 문서를 하나 더 유지하는 대신 decision, SPEC, Work Package, release evidence가 한 방향으로 연결되는 pipeline을 만들었습니다. 수동 문서는 작성 시점 이후 다시 동기화해야 해 기존 확인 비용을 그대로 남깁니다.
- activity 수집·요약은 agent에 맡기고, blocker 해석과 product decision은 owner가 확인하도록 역할을 분리했습니다.
- Trade-off: 문서 pipeline은 추적 가능성을 높이지만 registry와 coverage를 지속 갱신하는 운영 비용이 생깁니다. release gate와 version cut을 실제 완료 시점에 연결해 구조가 기록용 문서로만 남지 않게 했습니다.

## System Design And Implementation

diagram: [soft] Slack · Jira · GitHub · Confluence 활동 -> daily briefing agent (자동 집계·요약) -> pipeline registry 갱신 · blocker triage -> release gate · version cut

- product별 decision log에 결정일·owner를 기록하고 SPEC-WP coverage를 매핑
- PR 단위 변경 이력과 release evidence를 연결하고 완료 시 version snapshot으로 동결(cut)
- daily briefing이 활동과 blocker candidate를 모으고 pipeline registry 갱신·triage 입력으로 전달

## Failure Modes And Operation

- stale·누락·충돌 activity를 agent summary의 확정 사실로 취급하지 않고 human triage 입력으로 제한
- decision과 실행 작업의 연결 누락을 SPEC-WP coverage로 확인
- release evidence가 없는 완료 선언을 release gate에서 차단하고 완료 문서를 version snapshot으로 고정
- 생성 품질 blocker를 briefing에서 확인해 당일 decision·수정 배포로 연결한 운영 사례를 유지

## Evidence, Result, And Limits

- Workflow-backed: decision/SPEC/WP pipeline, registry, release gate, version cut 운영이 확인됨
- Tool-backed: daily briefing 자동 집계와 blocker triage flow가 확인됨
- Operating evidence: 생성 품질 blocker를 당일 판단·수정 배포로 연결한 사례가 확인됨
- Limits: status 확인 시간 절감과 구성원 adoption rate는 측정되지 않았으며, agent가 product decision을 자율 수행했다는 claim은 하지 않음

## Stack

source-of-truth docs · agent activity aggregation · decision/SPEC/WP pipeline · release gate
