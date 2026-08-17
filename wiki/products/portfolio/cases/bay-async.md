---
type: portfolio-case
case: bay-async
title: 주문·재고 backend의 비동기 운영 경계
resume_tag: BAY
origin: MediSolve AI · Centurion 재고 관리
claim_ids: [centurion.bay-async-backend, centurion.async-migration, centurion.test-ci-foundation]
claim_strength: led
---

## Executive Summary

Celery로 이미 분리돼 있던 비동기 처리를 async FastAPI 실행 모델과 맞는 RabbitMQ·TaskIQ worker로 전환했습니다. 알림·재고 작업의 상태, retry, 실패 기록, 수동 재처리와 검증 환경까지 운영 가능한 경계로 연결했습니다.

## My Scope

- order·product·inventory API와 async worker flow 설계·구축 주도
- 재고 연동 retry, API test infrastructure, Docker CI, local setup·onboarding 구축
- Centurion 전체 backend ownership이 아니라 BAY 주문·재고 backend 영역의 `led` 범위

## Problem & Constraints

기존에도 Celery가 비동기 작업을 담당했지만, asyncio를 중심으로 구성한 FastAPI backend와 worker의 실행 모델은 달랐습니다. 전환의 목적은 비동기를 새로 도입하는 것이 아니라 async 함수·의존성·외부 연동을 같은 실행 모델에서 다루고, 실패 상태와 복구 책임을 명확히 하는 것이었습니다.

## Decision & Alternatives

- Celery를 유지하는 대신 async function과 FastAPI 의존성 구조를 직접 지원하는 TaskIQ를 선택했습니다.
- RabbitMQ broker는 유지하고 알림·재고 작업을 별도 worker 책임으로 나눴습니다.
- Trade-off: 전환 뒤에도 작업 완료는 지연될 수 있고 retry 상태를 별도로 운영해야 합니다. 현재 근거만으로 exactly-once 처리를 주장하지 않습니다.

## System Design & Implementation

diagram: API (판정·작업 상태 생성) -> RabbitMQ -> TaskIQ worker (외부 연동) -> SUCCESS/FAILED -> retry·수동 재처리

- 알림과 재고 broker·worker를 분리하고 TaskIQ dependency context로 application service를 연결
- 알림 작업은 PENDING·SENDING·SUCCESS·FAILED 상태와 최대 3회·10초 간격 retry를 기록
- 재고 작업은 별도 queue에서 최대 3회 retry
- API test infrastructure와 Docker 기반 CI, local setup·onboarding 구성

## Failure Modes & Operation

- 외부 알림 실패는 worker가 상태와 실패 이력을 남기고 retry 후에도 실패하면 수동 재발송 경로로 복구
- 재고 연동 실패는 API 재요청과 섞지 않고 worker retry 경계에서 다시 처리
- Docker CI에서 API 회귀를 검증하고, local setup에서 API·broker·worker 흐름을 재현
- exactly-once delivery와 전환 전후 성능 개선은 측정 근거가 없어 주장하지 않음

## Evidence, Result, And Limits

- Code-backed: order·product·inventory API, TaskIQ/RabbitMQ worker, retry, test, Docker CI 변경이 확인됨
- Documentation-backed: local setup과 FE onboarding guide가 확인됨
- Limits: API latency, job success rate, retry recovery rate의 before/after 수치는 없으며 exactly-once delivery는 claim하지 않음

## Stack

FastAPI · TaskIQ · RabbitMQ · MySQL · pytest (Object Mother) · Docker CI
