---
type: portfolio-case
case: centurion-platform
title: 의료 MSA의 작업 복구와 실시간 상담 설계
resume_tag: CENTURION
origin: MediSolve AI · Centurion
claim_ids:
  - centurion.msa-platform-context
  - centurion.bay-async-backend
  - centurion.async-migration
  - centurion.test-ci-foundation
  - centurion.say-realtime-ai
  - centurion.day-product-integration
  - centurion.ray-backend
  - centurion.sso-session
claim_strength: mixed (service led/co-led/contributed)
---

## Executive Summary

API Gateway·SSO를 공유하고 예약 CRM, 주문·재고, 실시간 상담 서비스가 분리된 의료 MSA에서 서비스별 backend를 구축·연동했습니다. 주문·재고는 요청 처리와 외부 연동의 실패 경계를 나누고 명시적인 작업 상태를 남겨 실패한 후속 작업만 다시 실행할 수 있게 했습니다. 실시간 상담은 빠른 중간 전사와 확정 판단·세션 종료를 서로 다른 경계로 나눴습니다. 전체 플랫폼을 단독 구축한 것이 아니라, 주문·재고 worker와 예약 정책 연결은 주도하고 실시간 상담·시설 연동·공통 인증은 기여 범위를 구분해 맡았습니다.

## My Scope

- 주문·재고 API와 RabbitMQ·TaskIQ worker 구축 주도
- DAY 예약 정책의 backend·frontend·QA·release 연결 주도
- realtime AI session lifecycle·provider boundary 공동 주 기여
- 시설 현황·긴급 호출·재고 연동, multi-service SSO session 정책 기여

## Problem And Constraints

병원 운영 workload는 요청-응답으로 끝나는 기능, 실패 후 재처리가 필요한 작업, 연결 상태가 계속 변하는 실시간 session이 섞여 있습니다. 모든 기능을 같은 transaction이나 같은 runtime에 넣으면 외부 연동 실패가 핵심 업무를 막고, session 장애가 다른 서비스까지 번질 수 있었습니다.

## Decision And Alternatives

- Express API Gateway와 NestJS SSO가 공통 진입·인증을 담당하고, FastAPI product backend는 각 업무 경계를 소유합니다.
- 주문·재고의 외부 연동은 RabbitMQ·TaskIQ worker로 분리하고 상태·retry·terminal failure·수동 재처리 경계를 둡니다.
- realtime 상담은 WebSocket session lifecycle과 STT/LLM provider adapter를 분리해 reconnect·중복 event·종료 흐름을 통제합니다.
- realtime STT가 내보내는 VAD speech event·DELTA·COMPLETE를 분기합니다. DELTA는 domain keyword 우선 trigger에, COMPLETE는 context 판단·저장에 사용하며, optional CORRECTED는 같은 sequence의 원래 발화만 교체합니다.
- provider 후보 비교에서는 383개 domain keyword hint와 WER·CER·keyword retention·latency benchmark를 구성했습니다. keyword별 numeric weight나 accuracy 개선 결과로 표현하지 않습니다.
- VAD silence 200·350·500ms E2E에서 전체 지연 차이가 작고 모델 추론이 약 80%를 차지함을 확인해, VAD 미세 조정보다 DELTA 조기 trigger와 provider 경계 분리를 우선했습니다.

## System Design And Implementation

diagram: Client -> Express API Gateway -> NestJS SSO -> FastAPI product services

diagram: 주문·재고 API -> RabbitMQ -> TaskIQ worker -> SUCCESS / FAILED -> retry·수동 재처리

invariant: 사용자 요청과 외부 연동의 실패 경계를 분리하고, 작업 상태·실패 이력을 기록해 실패한 후속 작업만 재처리한다. exactly-once나 DB·broker의 원자적 transaction은 이 사례의 claim 범위에 포함하지 않는다.

diagram: 상담 화면 -> Express API Gateway -> NestJS SSO -> WebSocket session orchestrator -> STT adapter -> transcript event -> advice·upsell·process pipeline -> client event

diagram inset: Audio -> VAD(speech boundary) + same-utterance DELTA -> keyword match -> start generation / COMPLETE -> context·store; optional CORRECTED -> replace same sequence; session end -> stop guard -> reconnect blocked

visual_components:
- `app/fe/app/portfolio/centurion-contribution-diagram.tsx` — 공통 Gateway·SSO 아래의 DAY·BAY·SAY 세 service flow와 역할 강도, cross-service 기여를 한 장에 구분한다.
- `app/fe/app/portfolio/say-realtime-diagram.tsx` — SAY의 access·session·STT·판단·외부 provider runtime과 benchmark·E2E replay·regression test 경계를 한 장에 배치한다. DELTA·COMPLETE·optional CORRECTED와 stop guard는 같은 component의 확대 영역으로 설명한다.

- async FastAPI 실행 모델에 맞춰 Celery 처리를 TaskIQ·RabbitMQ로 전환
- API test infrastructure·Docker CI·local onboarding 구성
- 중복 WebSocket event를 cancellation·debounce·retry·turn-state guard로 제한
- 4분 37초 상담 E2E에서 DELTA 586건·COMPLETE 25건·ADVICE 14건과 sequence 1–25의 event integrity 확인
- 종료 뒤 reconnect timer가 남는 session failure를 재현하고 lifecycle/race 8개·GC TTL 5개, 총 13개 focused regression scenario로 회귀 고정
- 시설·재고 연동에서 외부 publish 실패가 핵심 업무 transaction을 중단하지 않도록 실행 경계 분리

## Failure Modes And Operation

- worker 작업은 상태·retry·최종 실패 기록을 남기고 수동 재처리 가능
- realtime session은 reconnect race·zombie session·out-of-order event를 lifecycle guard에서 제한
- VAD는 발화 경계 조정이며 STT recognition accuracy 향상을 뜻하지 않음
- current SAY에는 keyword별 numeric weight가 없으며 domain keyword hint와 DELTA keyword priority를 구분
- 시설·재고 연동은 fire-and-forget 경계이므로 exactly-once를 주장하지 않음
- Centurion 전체 MSA, Gateway, SSO, 모든 service를 단독 설계·구축했다고 주장하지 않음

## Evidence, Result, And Limits

- 주문·재고 backend·worker flow `led`
- realtime AI session cluster `co-led`
- 시설·재고·SSO `contributed`
- 제품별 기여 강도를 분리해 MSA 전체 경험을 하나의 단독 ownership으로 부풀리지 않음

## Stack

FastAPI · Express · NestJS · PostgreSQL · RabbitMQ · TaskIQ · WebSocket · Terraform
