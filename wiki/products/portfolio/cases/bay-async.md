---
type: portfolio-case
case: bay-async
title: 주문·재고 backend의 비동기 아키텍처 — 실패 가능한 작업을 API에서 분리
resume_tag: BAY
origin: MediSolve AI · Centurion 재고 관리
claim_ids: [centurion.bay-async-backend]
claim_strength: led
---

## Executive Summary

주문·재고 API에서 외부 알림과 재고 연동처럼 실패 가능한 작업을 RabbitMQ·TaskIQ worker로 분리했습니다. 해당 backend 영역의 설계·구축을 주도하고 retry, API test, Docker CI, onboarding까지 운영 가능한 경계로 연결했습니다.

## My Scope

- order·product·inventory API와 async worker flow 설계·구축 주도
- 재고 연동 retry, API test infrastructure, Docker CI, local setup·onboarding 구축
- Centurion 전체 backend ownership이 아니라 BAY 주문·재고 backend 영역의 `led` 범위

## Problem And Constraints

주문·재고 처리 흐름에 외부 알림과 재고 차감처럼 네트워크·외부 상태 때문에 실패 가능한 작업이 섞여 있었습니다. 이 작업을 API 요청 안에서 끝까지 기다리면 응답 지연과 외부 실패가 사용자 요청 경계까지 전파됩니다.

API 응답과 실제 외부 작업 완료 시점이 달라질 수 있으므로, 단순 분리뿐 아니라 retry와 회귀 검증, 로컬에서 worker까지 재현할 수 있는 개발 환경이 함께 필요했습니다.

## Decision And Alternatives

- API는 주문·상품·재고 판정과 저장에 집중하고, 실패 가능한 외부 작업은 message queue 뒤의 worker로 분리했습니다.
- 동기 처리를 유지하면 구현은 단순하지만 외부 지연과 실패가 API latency와 성공 여부를 함께 흔듭니다.
- Trade-off: worker 분리는 API를 보호하는 대신 작업 완료가 지연될 수 있고, retry 상태를 별도로 운영해야 합니다. 현재 근거만으로 exactly-once 처리를 주장하지 않습니다.

## System Design And Implementation

diagram: API (주문·상품·재고 판정) -> RabbitMQ -> TaskIQ worker (알림톡 발송 · 재고 연동) -> [soft] retry (재고 차감 실패 복구)

- TaskIQ staged 설정, worker context 주입, RabbitMQ exchange·queue 연결 옵션 정리
- 주문 취소·pending 조회 최적화, 상품 목록·필터 API, cursor pagination
- Object Mother 패턴 API test infrastructure와 Docker 기반 CI 구성

## Failure Modes And Operation

- 재고 차감 실패를 API 재요청과 섞지 않고 worker retry 경계에서 복구
- 주문 취소·pending 상태 조회와 상품 filter/pagination 경로를 API test로 고정
- Docker CI에서 API 회귀를 검증하고, one-command Docker Compose로 API·worker local setup 제공
- FE onboarding guide에 실행·연동 절차를 분리해 협업자가 비동기 흐름을 재현할 수 있게 함

## Evidence, Result, And Limits

- Code-backed: order·product·inventory API, TaskIQ/RabbitMQ worker, retry, test, Docker CI 변경이 확인됨
- Documentation-backed: local setup과 FE onboarding guide가 확인됨
- Limits: API latency, job success rate, retry recovery rate의 before/after 수치는 없으며 exactly-once delivery는 claim하지 않음

## Stack

FastAPI · TaskIQ · RabbitMQ · MySQL · pytest (Object Mother) · Docker CI
