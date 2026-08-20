---
type: portfolio-case
case: memento-payment
title: 예약·결제 사이의 보상 흐름과 환불 완료 상태 설계
resume_tag: MEMENTO PAYMENT
origin: Memento AI · Feynman API
claim_ids:
  - career.memento-stripe-prepayment
  - career.memento-payment
claim_strength: mixed (Stripe slice led · shared payment domain contributed)
---

## Executive Summary

예약이 만들어지기 전에 시작되는 선결제와 비동기 환불을 하나의 DB transaction처럼 보이게 하지 않았습니다. local transaction ID로 결제 이력과 provider event를 연결하고, 예약 실패에는 provider-side cancel/refund 보상을, 환불에는 요청과 완료를 분리한 상태 전이를 적용했습니다.

## My Scope

- Stripe Checkout 기반 manual-capture 선결제 영역 구축 주도
- local PaymentHistory·PaymentMethod와 Checkout·Webhook event 연결
- 환불 유형별 마일리지 복원·티켓 삭제 순서 보완
- 결제 domain 전체 ownership이나 production 운영 전담은 주장하지 않음

## Problem And Constraints

결제는 예약 생성 전에 시작되므로 외부 PaymentIntent와 로컬 결제 이력을 예약 객체 없이 연결해야 했습니다. 또 외부 결제와 DB는 하나의 원자 transaction이 아니며, 환불 provider의 완료가 비동기로 도착하기 때문에 요청 시점에 티켓과 마일리지를 먼저 바꾸면 상태가 앞서갈 수 있었습니다.

## Decision And Alternatives

- local transaction ID와 payment type을 provider metadata에 넣어 Checkout·Webhook을 로컬 결제 이력과 매핑했습니다.
- manual capture와 PaymentIntent 상태 검증을 사용하고 예약 처리 실패 시 상태에 따라 cancel 또는 refund하는 provider-side 보상 경계를 뒀습니다.
- 환불 요청과 완료를 분리하고 마일리지 복원·티켓 삭제는 환불 완료 transition으로 이동했습니다.

## System Design And Implementation

diagram: local transaction 생성 -> Checkout metadata -> PaymentIntent 확인 -> 예약 처리 -> capture / cancel·refund compensation

diagram: refund request -> provider 처리 -> webhook completion -> PaymentHistory 환불 -> mileage 복원 -> ticket 삭제

- 현금·Stripe·0원·전액 마일리지 경로를 분기
- 원 결제 환불과 마일리지 환불을 metadata로 구분
- 예약 실패 시 provider 결제 상태를 확인하고 가능한 보상 동작을 수행

## Failure Modes And Operation

- DB와 provider 결제의 atomic rollback은 보장하지 않음
- webhook event dedup·reconciliation이 없어 exactly-once나 완전한 멱등성을 주장하지 않음
- provider 접수 후 local commit 실패를 자동 수렴시키는 별도 상태 머신은 확인되지 않음

## Evidence, Result, And Limits

- Stripe package는 main 기준 해당 slice의 직접 구현 근거가 확인됨
- 결제·예약 전체가 아니라 Stripe 선결제 영역은 `led`, 공유 payment domain 정합성은 `contributed`
- 운영 장애율·결제 불일치 감소 같은 정량 결과는 측정 근거가 없어 주장하지 않음

## Stack

FastAPI · PostgreSQL · Stripe Checkout · Webhook · Celery
