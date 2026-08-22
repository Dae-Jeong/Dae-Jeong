---
type: portfolio-case
case: mediness-ops
title: 제품 운영 흐름 — Decision에서 release까지
resume_tag: MEDINESS
origin: MediSolve AI · 제품 운영
claim_ids:
  - mediness.product-system-design-participation
  - mediness.product-operations
  - mediness.company-work-ax-design
claim_strength: mixed (design contributed · operations led)
---

## Executive Summary

서비스 구현은 담당 개발자들이 맡았고, 김대정은 제품 요구와 운영 흐름을 구체화하는 설계에 참여했습니다. 이후 여러 제품의 일정·이슈·릴리스 상태를 Decision -> SPEC -> Work Package -> release gate로 연결해 운영했습니다. 제품 개발에서 생기는 결정·작업·검증 기록을 의사결정·회의·업무 배정·승인·후속 작업으로 넓히는 회사 AX 구조 설계에도 참여했습니다. 설계 참여는 `contributed`, 제품 운영은 `led`로 구분합니다.

## My Scope

- MEDINESS 제품 요구와 운영 흐름을 구체화하는 설계 참여

- 제품팀 일정·이슈·release operation 리드
- decision/SPEC/WP pipeline, registry, release gate workflow 구축·운영
- 회사 업무 AX 확장 구조 설계 참여
- product·business 최종 결정은 human owner의 범위이며 agent의 자율 의사결정으로 claim하지 않음
- 서비스 코드 구현, 공통 architecture 최초 설계, 시스템 구조 설계 주도는 claim하지 않음

## Problem And Constraints

여러 제품의 상태가 회의, 개인의 기억, Slack·Jira·GitHub·Confluence에 나뉘어 있었습니다. 어떤 결정이 어떤 SPEC과 실행 작업으로 이어졌는지, release를 막는 blocker가 남아 있는지 확인하는 비용이 매일 반복됐습니다.

협업 도구의 activity는 최신 상태를 추정하는 재료일 뿐 완전한 source-of-truth가 아닙니다. 누락·지연되거나 서로 충돌할 수 있어 agent summary가 사람의 product decision을 대신해서는 안 됐습니다.

## Decision And Alternatives

- 수동 status 문서를 하나 더 유지하는 대신 decision, SPEC, Work Package, release evidence가 한 방향으로 연결되는 pipeline을 만들었습니다. 수동 문서는 작성 시점 이후 다시 동기화해야 해 기존 확인 비용을 그대로 남깁니다.
- 회사 업무 AX 확장에서는 agent가 맥락 탐색·초안·반복·근거 준비를 맡고, product decision·architecture·assignment·QA/release 승인은 사람이 확인하도록 역할을 분리했습니다.
- Trade-off: 문서 pipeline은 추적 가능성을 높이지만 registry와 coverage를 지속 갱신하는 운영 비용이 생깁니다. release gate와 version cut을 실제 완료 시점에 연결해 구조가 기록용 문서로만 남지 않게 했습니다.

## System Design And Implementation

diagram: [current/solid] Decision -> SPEC -> Work Package -> BE·FE·QA -> release gate -> Git·CI/CD -> Azure·Vercel; [extension/dashed] meeting·request -> decision -> assignment -> approval -> follow-up action

- product별 decision log에 결정일·owner를 기록하고 SPEC-WP coverage를 매핑
- PR 단위 변경 이력과 release evidence를 연결하고 완료 시 version snapshot으로 동결(cut)
- 회사 업무 확장에서는 agent가 맥락과 작업안·검증 근거를 준비하고 사람이 담당·승인·release를 판단

## Failure Modes And Operation

- agent가 준비한 맥락·초안을 확정 사실이나 최종 판단으로 취급하지 않고 human gate의 입력으로 제한
- decision과 실행 작업의 연결 누락을 SPEC-WP coverage로 확인
- release evidence가 없는 완료 선언을 release gate에서 차단하고 완료 문서를 version snapshot으로 고정
- 생성 품질 blocker를 당일 decision·수정 배포로 연결한 운영 사례를 유지

## Evidence, Result, And Limits

- User-confirmed: 서비스 구현 담당자와 제품 요구·운영 흐름을 구체화하는 설계에 참여함. `contributed` 상한.

- Workflow-backed: decision/SPEC/WP pipeline, registry, release gate, version cut 운영이 확인됨
- User-confirmed: 의사결정·회의·업무 배정·승인·후속 작업을 잇는 회사 AX 구조 설계 참여 범위가 확인됨
- Operating evidence: 생성 품질 blocker를 당일 판단·수정 배포로 연결한 사례가 확인됨
- Limits: 서비스 직접 구현과 architecture·시스템 구조 설계 주도·전담을 주장하지 않음. status 확인 시간 절감과 구성원 adoption rate는 측정되지 않았으며, agent가 product decision을 자율 수행했다는 claim도 하지 않음

## Stack

source-of-truth docs · agent activity aggregation · decision/SPEC/WP pipeline · release gate
