---
type: portfolio-case
case: nexus-operations
title: 여러 피부과의 운영·예약 요구를 backend와 권한 경계로 구현
description: 외부 운영 현장의 요구를 multi-brand backend, migration, authorization contract로 구체화한 FDE supporting case.
timestamp: 2026-08-26
tags: [portfolio, fde, backend, customer-operations, authorization]
resume_tag: NEXUS OPERATIONS
origin: MediSolve AI · NEXUS
claim_ids:
  - nexus.hospital-operations-revenue-contribution
  - nexus.backend-architecture
  - nexus.admin-backend-ownership
  - nexus.branch-access-boundary
claim_strength: mixed (backend architecture led · product outcome contributed)
---

## Executive Summary

여러 피부과의 홈페이지·관리·예약 흐름을 지원하는 multi-brand backend의 service boundary와 migration을 주도했습니다. 운영자의 소속 지점과 현재 작업 지점을 분리해 접근 범위를 서버가 결정하도록 만들었고, 제품은 예약률 개선을 통해 고객사 매출 성과에 기여했습니다.

## My Scope

- Homepage API와 Admin API를 독립 모듈로 둔 backend monorepo의 service boundary와 migration flow 주도
- 통합 관리 backend의 Clean Architecture 계층과 gateway 연결 설계·구축 주도
- Admin API의 working branch를 server auth state로 소유하는 접근 경계 설계·구현 주도
- 제품 전체 또는 고객사 business outcome의 단독 ownership은 주장하지 않음

## Problem And Constraints

하나의 운영 제품이 여러 피부과의 홈페이지·관리·예약 흐름을 지원해야 했습니다. 공개 사용자 요청과 운영자 요청은 인증·권한·데이터 접근 규칙이 달랐고, 운영자가 소속된 지점과 현재 작업 중인 지점도 같은 값으로 취급할 수 없었습니다.

현재 repository의 backend 재구축은 진행 중이므로, 구현 사실과 기존 운영 제품의 business outcome을 분리해야 합니다. 진행 중인 구조 변경이 예약률이나 매출 성과를 만들었다고 소급하지 않습니다.

## Decision And Alternatives

- Homepage API와 Admin API를 독립 모듈로 두고 gateway에서 외부 endpoint를 통합했습니다.
- 운영자의 소속 지점은 identity·permission의 근거로, 현재 작업 지점은 변경 가능한 server auth state로 분리했습니다.
- 요청 header가 working branch를 임의로 바꾸는 방식 대신 권한 검증 전용 API만 상태를 전환하도록 했습니다.
- 본사 운영자의 미선택 상태와 권한 밖 지점 접근을 각각 409와 403으로 구분했습니다.

## System Design And Implementation

diagram: 외부 사용자 -> gateway -> Homepage API -> 공개 홈페이지·예약 흐름

diagram: 운영자 -> gateway -> Admin API -> identity·membership 확인 -> working branch 전환 -> 지점별 관리 데이터

- Clean Architecture 계층과 shared domain을 유지하면서 Homepage/Admin API의 실행 경계를 분리했습니다.
- migration 과정에서 고객·예약 데이터의 mapping과 데이터 계약을 점검했습니다.
- Admin API의 접근 경계를 바꾸면서 shared auth middleware와 Homepage API의 기존 지점 식별 계약은 유지했습니다.

## Failure Modes And Operation

- 권한이 없는 지점 전환은 403으로 차단하고, 본사 계정이 작업 지점을 선택하지 않은 상태는 409로 구분합니다.
- client 입력이 현재 작업 지점을 직접 결정하지 못하게 해, 요청마다 다른 지점으로 접근 범위가 흔들리는 경로를 막습니다.
- 일부 연관 test가 skip·xfail 상태이므로 전체 branch 접근 회귀 검증 완료나 production 안정화 완료는 주장하지 않습니다.

## Evidence, Result, And Limits

- Code-backed: backend monorepo의 service boundary와 migration flow 주도, Homepage/Admin API 독립 모듈과 gateway 구성이 확인됨. `led`.
- Code-backed: Admin working branch의 server-owned 결정과 권한 검증 전용 전환, 409·403 구분이 확인됨. `led`, 진행 중.
- User-confirmed: 기존 운영 제품은 예약률 개선을 통해 고객사 매출 성과에 기여함. `contributed/medium`.
- Limits: 고객사 실명, 예약률·매출 증가 수치, backend와 business outcome의 직접 인과, 제품 전체 단독 구축은 주장하지 않음.

## Stack

Python · FastAPI · SQLAlchemy · PostgreSQL/MySQL · API Gateway · Clean Architecture · migration · authorization
