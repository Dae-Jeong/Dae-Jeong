---
type: project-evidence
title: Centurion Evidence
description: CRM and ERP product backend evidence across BAY, SAY, DAY, RAY, SSO, and shared infra.
timestamp: 2026-08-19
source_roots: [workspace]
tags: [centurion, backend, realtime, async, infra, evidence]
---

# Centurion Evidence

Source locators: `workspace:BAY-BE-API`, `workspace:SAY-BE-API`, `workspace:PROTON`, `workspace:CENTURION_DAY`, `workspace:RAY-BE-API`, `workspace:SSO-BE-API`, `workspace:MEDISOLVEAI-INFRA`

DAY, BAY, RAY, SAY는 별도 제품이 아니라 Centurion CRM & ERP 제품을 구성하는 feature다.

## Origin

- User-confirmed (2026-07-17): Centurion은 더데이랩스의 첫 제품으로 시작해 MediSolve AI 창업과 함께 그대로 이관됐다. 피부과 도메인의 CRM으로 출발했다.
- Code-backed: 제품 시작 시점(더데이랩스 프리랜서 기간)부터 backend를 구축했다 — `workspace:BAY-BE-API` 2025-03-18 first initialize와 정합 ([previous-career](previous-career.md#career-gaps-and-freelance)).
- Public wording: "피부과 CRM으로 시작한 Centurion을 제품 시작 시점부터 구축"까지 허용. ⚠️ "피부과 생태계를 관장하는 시스템" 표현은 보도에서 미확인 — 공개 표기 보류 유지.

## Stack Boundary (2026-08-18 source recheck)

> Historical user report: "지금 api gateway랑 centurion은 NestJS였어" / "메디솔브에서도 NestJS는 사용했었어"

현재 source 기준으로 Centurion product family는 단일 stack이 아니다.

- Code-backed: `workspace:CENTURION-API-GATEWAY`는 Express package이며 route config 기반 gateway다. API Gateway를 NestJS로 표기하지 않는다.
- Code-backed: `workspace:SSO-BE-API`의 `package.json`에서 NestJS·JWT·Prisma·TypeScript가 확인된다 ([workspace-project-audit](../audits/workspace-project-audit.md#sso-be-api)).
- Code-backed: `BAY-BE-API`의 API·TaskIQ/Celery worker와 DAY/RAY/SAY 계열 일부는 Python·FastAPI다.
- 공개 표현: `TypeScript·Express API Gateway`, `TypeScript·NestJS SSO`, `Python·FastAPI product backend`처럼 검증된 service boundary를 분리해 쓴다.
- 금지: Centurion 전체를 단일 언어·프레임워크로 단정, 서비스별 비중 수치화.

## Multi-Service / MSA Context

- Code-backed: Centurion은 route-config 기반 Express API Gateway와 NestJS SSO를 공유하고, 기능별 Python·FastAPI backend, RabbitMQ·TaskIQ worker, WebSocket realtime AI service가 application·runtime·deployment boundary로 분리된 multi-service 환경이다.
- Contribution-backed: 김대정은 BAY 주문·재고 backend와 worker flow를 `led`, 통합 관리 Admin·Homepage backend를 `led`, SAY realtime session/provider boundary를 `co-led`, RAY 시설·재고 연동과 SSO session policy를 `contributed`, 공통 Azure·Terraform infra를 `owned` 범위로 담당했다.
- Public wording: `API Gateway·SSO 기반 의료 MSA에서 서비스별 backend 경계와 연동을 담당` 또는 각 하위 claim의 기여 강도를 함께 밝힌 표현까지 허용한다.
- Contribution boundary: Centurion 전체 MSA를 단독 설계·구축하거나 모든 service를 직접 만들었다고 표현하지 않는다. API Gateway와 SSO 전체 ownership도 주장하지 않으며, service별 stack과 기여 범위를 하나의 단일 stack·단일 ownership으로 합치지 않는다.

## Company Public Coverage (2026-07-17 확인)

- Source-backed: 메디솔브에이아이가 2026-03-25 "AI 메디컬 플랫폼 '센츄리온(centurion)' 시리즈" 공식 론칭 행사를 개최했다 — 도메인은 피부과 운영, `say`는 "상담 실장 옆에서 실시간 AI 어드바이스를 제공하는 솔루션", `centurion watch`는 "AI 기반 리뷰 모니터링 솔루션"으로 공개됨. https://www.mdtoday.co.kr/news/view/1065601112133242
- Source-backed: 한국마이크로소프트와 업무협약 — Azure 기반 클라우드 인프라·AI 기술로 병원 운영 통합 솔루션 고도화·글로벌 진출 (매일신문 2026-04-22). https://www.imaeil.com/page/view/2026042213570957581
- Source-backed: BAY 공개 서비스 URL 존재 — https://bay.centurion.ai.kr/
- 공개 표현 허용 범위 확장: 회사 공식 표현인 "AI 메디컬 플랫폼 센츄리온", "피부과 운영", "병원 운영 통합 솔루션"은 개인 산출물에서 사용 가능하다.
- 유지되는 경계: 고객사명(보도에 등장하더라도 개인 산출물에서는 비공개 유지), 보도에 없는 전략 서술.

## BAY Async Backend

- Code-backed: order, product, inventory API와 TaskIQ/RabbitMQ worker, inventory retry, API test infrastructure, Docker CI, onboarding documents가 확인됐다.
- Code-backed (2026-08-16 재검증): TaskIQ 도입 직전 revision에도 Celery 기반 `notification.send_alimtalk` task와 API의 queue 호출이 존재했다. 따라서 **"TaskIQ를 도입하며 동기 API에서 비동기 작업을 처음 분리했다"는 판정은 superseded**다.
- Code-backed (2026-08-16 재검증): 현재 알림 worker는 `PENDING → SENDING → SUCCESS/FAILED` 상태를 기록하고 최대 3회·10초 간격 retry, 최종 실패 이력, 수동 재발송 경로를 제공한다. 재고 worker도 RabbitMQ/TaskIQ 경계와 최대 3회 retry를 갖는다.
- User-confirmed (2026-08-16): 전환 당시 FastAPI backend를 async로 운용하고 있었고, Celery가 asyncio task를 공식 실행 모델로 제공하지 않아 async-native worker 조합으로 평가한 TaskIQ를 선택했다.
- Code-backed (2026-08-16): TaskIQ 도입 직전 dependency는 FastAPI `>=0.115.11,<0.116.0`, Celery `>=5.3.6,<6.0.0`이었고, 전환 뒤 TaskIQ `>=0.11.18,<0.12.0`과 `taskiq-aio-pika`를 사용한다.
- Source-backed: Celery 5.3.6 공식 CLI의 worker pool 선택지는 prefork·eventlet·gevent·solo·processes·threads·custom이며 asyncio pool을 제공하지 않는다. TaskIQ 공식 문서는 sync/async function 실행과 FastAPI 통합을 명시한다. ([Celery 5.3.6 CLI](https://docs.celeryq.dev/en/v5.3.6/reference/cli.html), [TaskIQ](https://taskiq-python.github.io/guide/))
- Current public framing: TaskIQ의 성과는 비동기 분리 자체의 최초 도입이 아니라, 기존 Celery 기반 처리를 TaskIQ/RabbitMQ로 전환하면서 상태·retry·실패 기록·재처리 경계를 운영 가능한 형태로 재구성한 것이다.
- User-confirmed (2026-07-19 인터뷰): worker 분리는 실패를 겪은 뒤의 사후 대응이 아니라 **제품 시작 시점부터의 예방 설계** — 실패 가능한 작업(주문·결제)을 처음부터 API 경계 밖 worker로 분리했다. 배경: Memento에서 결제 실패 실사례(롤백·환불 순서·티켓 정합성)를 직접 수습한 경험의 전이 ([previous-career](previous-career.md#memento-payment)).
- Contribution boundary: 해당 backend 영역의 구축·설계 주도. Centurion 전체 backend ownership은 아니다.
- **Code-backed (2026-08-09 실측, Unverified 해제)**: `Celery -> TaskIQ migration` 이 `workspace:BAY-BE-API` Git history 로 확인됐다 — "feat: 대규모 시스템 리팩토링 - Notification/Celery 제거 및 Alimtalk/TaskIQ 마이그레이션"(2025-09-14), "Remove/notification celery (#304)"(2025-09-15), TaskIQ 1~3차 구성(2025-09-08~09), "fix: taskIQ 재고 차감 처리 오류 시, retry 로직 추가"(2025-10-01). 전부 KimMarin 명의이며 플랫폼 기재 문구와 일치한다. → `centurion.async-migration` 으로 승격.
- Measurement boundary: 전환 사실은 확인됐으나 **성능·지연 개선이나 "복잡도 감소" 정량은 측정값이 없다.** 전환과 도메인 분리까지만 말한다.
- 분리 기록 (2026-08-09): 기존 `centurion.bay-async-backend` 한 claim 에 묶여 있던 test·CI·onboarding 을 `centurion.test-ci-foundation` 으로 분리했다. 근거 anchor 는 동일하며, 각 사실을 하나의 claim 만 소유하도록 기존 statement 를 축소했다.

## SAY Realtime AI

- Code-backed: WebSocket consultation runtime, STT/LLM provider lifecycle, zombie session cleanup, reconnect race 처리, translation/audio pipeline, dashboard AI analysis가 SAY/PROTON cluster에서 확인됐다.
- Code-backed (2026-08-15): `workspace:SAY-BE-API`의 WebSocket session 처리에서 중복 event를 debounce하고 기존 task를 cancel한 뒤 재생성하는 흐름, `CancelledError` 처리, STT 결과 retry, turn-state guard가 확인됐다. Git history와 blame에서 해당 lifecycle 변경의 KimMarin 기여가 확인된다.
- Contribution boundary: SAY 공동 주 기여와 연계 영역 주도를 합친 `co-led` claim. provider 실명은 공개하지 않는다.

## DAY Product Integration

- Code-backed: reservation policy를 backend judgment, frontend display, QA seed/test, release documents로 연결한 변경이 확인됐다.
- Contribution boundary: BE/FE/QA 연결 리드. DAY 제품 전체 단독 구축은 아니다.

## RAY Backend

- Code-backed: facility status query, emergency call ordering, BAY integration, messaging/migration work가 확인됐다.
- Contribution boundary: 주 기여를 한 줄로 설명할 수 있으며 전담 구축 표현은 사용하지 않는다.

## SSO Session

- Code-backed: Redis/JTI session, duplicate login, E2E 관련 변경이 확인됐다.
- Contribution boundary: 담당·참여. SSO 전체 구축 표현은 금지한다.

## Shared Infra

- Code-backed: Azure/Terraform resource와 deploy/runbook documentation의 구축·운영 범위가 확인됐다.
- User-confirmed: 회사 infra repository 전체와 Azure infra 운영·관리를 담당한다.
- Contribution boundary: Centurion infra 구축·운영은 `owned`로 표현할 수 있다. 회사 전체 범위는 [Company Azure Infrastructure Evidence](infrastructure.md)를 따른다.

## Public Disclosure

- MediSolve AI, Centurion, DAY/BAY/RAY/SAY 명칭은 공개 가능하다.
- 고객사, provider, resource/security/cost detail은 공개하지 않는다.

## Rejected Or Unverified Claims

- Centurion 제품 전체 단독 구축
- SSO 전체 구축
- TaskIQ 도입으로 동기 API에서 비동기 처리를 처음 분리했다는 서술
- TaskIQ 전환 이전에는 외부 연동 실패가 API 응답과 주문 상태에 직접 결합돼 있었다는 서술
- production traffic과 안정성 수치
