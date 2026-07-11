---
case: bay-async
title: 주문·재고 backend의 비동기 아키텍처 — 실패 가능한 작업을 API에서 분리
resume_tag: BAY
origin: MediSolve AI · Centurion 재고 관리
claim_strength: 구축·설계 주도 (Git 검증 — 영역별 커밋 확인, 09 표 참조)
---

## 문제

주문·재고 처리 흐름에 외부 연동(알림톡 발송)과 재고 차감처럼 실패 가능성이 있는 작업이 섞여 있었습니다. 이런 작업이 API 요청 흐름 안에서 실패하면 응답 지연과 부분 실패가 사용자 흐름을 그대로 깨뜨립니다.

## 접근

- API는 판정과 저장까지만 책임지고, 실패 가능성이 있는 작업은 worker로 분리
- 재고 차감 실패는 재시도로 복구 — 기존 Celery 기반 구조를 정리하고 TaskIQ로 전환

## 구현

diagram: API (주문·상품·재고 판정) -> RabbitMQ -> TaskIQ worker (알림톡 발송 · 재고 연동) -> [soft] retry (재고 차감 실패 복구)

- 알림톡/Celery 제거 후 TaskIQ 전환 — staged 설정, worker context 주입, RabbitMQ 연결 옵션 정리
- 주문 취소·pending 조회 최적화, 상품 목록/필터 API, cursor pagination
- Object Mother 패턴 API 테스트 인프라 + Docker 기반 CI — 비동기 흐름의 회귀를 테스트로 방지

## 운영/결과

- 테스트 인프라와 Docker CI로 배포 전 회귀 검증 체계 확립
- one-command Docker Compose 로컬 셋업과 FE 온보딩 가이드 — 협업 진입 비용 축소

## Stack

FastAPI · TaskIQ · RabbitMQ · MySQL · pytest (Object Mother) · Docker CI
