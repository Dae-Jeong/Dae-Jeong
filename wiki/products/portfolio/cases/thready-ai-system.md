---
type: portfolio-case
case: thready-ai-system
title: AI 실행 경계와 durable delivery 설계·구현
resume_tag: THREADY AI SYSTEM
origin: MediSolve AI · AI 콘텐츠 생성 서비스
claim_ids:
  - thready.ai-service-boundary
  - thready.ai-replica-outbox
claim_strength: owned
---

## Executive Summary

AI 실행부를 독립 FastAPI application·DB로 분리하고 product backend와 authenticated HTTP 계약으로 연결했습니다. 제품 정책·원장은 backend가, 생성 lifecycle·실행 상태는 AI application이 소유하도록 경계를 설계·구현했으며, 현재 STG·Prod에서 운영하고 있습니다.

## My Scope

- product backend와 AI application의 책임·데이터 ownership 경계 설계·구현 전담
- owner mutation과 durable Outbox를 같은 transaction으로 처리하는 전달 경계 구현
- relay retry와 delivery version fence, 회귀·migration·stale delivery test 구현
- 전체 AI platform 단독 구축이나 무중단·무유실 운영은 담당 성과로 주장하지 않음

## Problem And Constraints

- 제품 정책과 원장 데이터는 backend에 남겨야 했고, AI application은 생성 lifecycle과 실행 상태를 독립적으로 소유해야 했습니다.
- 두 application과 DB 사이의 전달은 일시 장애·재시도·역순 도착을 전제로 설계해야 했습니다.
- service boundary 구현과 환경별 application·DB 전환, 운영 검증은 별도 단계였습니다.

## Decision And Alternatives

- AI 실행부를 별도 FastAPI application·DB로 분리하고, backend가 authenticated HTTP client를 통해서만 접근하도록 했습니다.
- 원장 변경과 Outbox 기록을 같은 transaction으로 처리하고, 실제 전달은 relay retry와 delivery version fence로 분리했습니다.
- 동기 전달이나 두 DB의 직접 갱신은 비교 가능한 대안이지만 공식 대안 검토 기록은 확인되지 않습니다. 따라서 이 케이스는 채택한 구조와 failure boundary만 설명하며 exactly-once를 주장하지 않습니다.

## System Design And Implementation

diagram: Product Backend(policy·owner) -> owner mutation + Outbox(same transaction) -> relay retry -> authenticated HTTP -> AI Application(lifecycle·execution) -> AI DB

diagram: [soft] delivery_version -> stale PUT/DELETE fence -> 최신 원장 상태 보호

- AI 실행부와 DB를 product backend에서 분리하고 HTTP contract로 연결했습니다.
- 제품 정책·원장과 생성 lifecycle·실행 상태의 소유권을 application boundary에 맞춰 나눴습니다.
- owner mutation과 Outbox 기록을 같은 transaction에 두고, relay는 독립적으로 retry하도록 구현했습니다.
- delivery version fence로 역순 전달이 최신 원장 상태를 덮지 않도록 구현했습니다.
- backend·AI application 전체 회귀, migration 왕복, stale PUT/DELETE fence를 test로 검증했습니다.

## Failure Modes And Operation

- AI application이 일시적으로 응답하지 않으면 owner transaction과 전달을 분리하고 relay가 retry합니다.
- 이전 delivery가 나중에 도착하면 version fence가 최신 상태를 덮는 변경을 거부합니다.
- owner mutation만 반영되고 전달 기록이 남지 않는 경계를 줄이기 위해 Outbox를 같은 transaction에 기록합니다.
- STG·Prod application·DB 운영은 확인했지만, 무중단 전환·유실 0건·availability 개선은 주장하지 않습니다.

## Evidence, Result, Limits

- Code-backed: 독립 FastAPI application·DB, authenticated HTTP client, owner/AI data boundary가 확인됨
- Code-backed: transactional Outbox, relay retry, delivery version fence가 확인됨
- Test-backed: 전체 회귀, migration 왕복, stale PUT/DELETE fence 검증이 확인됨
- Operation-backed: STG·Prod AI App Service health와 product backend의 remote AI 연결, 별도 database 사용을 확인함
- Result: service boundary와 durable delivery 경계를 설계·구현하고 STG·Prod에서 운영함
- Limits: 무중단 운영, 데이터 유실 0건, exactly-once, production 장애율 개선은 주장하지 않음

## Stack

FastAPI · transactional Outbox · authenticated HTTP · migration/test
