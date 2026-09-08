---
type: project-evidence
title: Centurion Evidence
description: CRM and ERP product backend evidence across BAY, SAY, DAY, RAY, SSO, and shared infra.
timestamp: 2026-09-08
source_roots: [workspace]
tags: [centurion, backend, realtime, async, infra, evidence]
---

# Centurion Evidence

Source locators: `workspace:BAY-BE-API`, `workspace:SAY-BE-API`, `workspace:PROTON`, `workspace:CENTURION_DAY`, `workspace:RAY-BE-API`, `workspace:SSO-BE-API`, `workspace:MEDISOLVEAI-INFRA`

2026-09-08 재검증의 선택·보류와 검토 범위는 [성과 코드 조사 audit](../audits/2026-09-08-achievement-code-discovery.md)에 둔다.

DAY, BAY, RAY, SAY는 별도 제품이 아니라 Centurion CRM & ERP 제품을 구성하는 feature다.

## Product Boundary With NEXUS

- User-confirmed correction (2026-08-20): DAY는 별도 제품이 아니라 Centurion을 구성하는 범용 피부과 CRM 영역이다.
- NEXUS는 Centurion과 별개로, 외부 피부과 여러 곳의 홈페이지·관리·예약 운영을 지원하는 multi-brand system이다.
- 같은 회사의 의료 domain·Gateway·SSO·infra 맥락이 일부 겹치더라도 NEXUS의 Admin/Homepage backend, 지점 권한, 예약률·매출 outcome을 Centurion 또는 DAY의 성과로 합치지 않는다.
- 금지: NEXUS를 DAY의 기반·이전 버전·repository label로 설명, NEXUS 통합 관리 backend를 Centurion MSA 내부 service로 설명.

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
- Contribution-backed: 김대정은 BAY 주문·재고 backend와 worker flow를 `led`, DAY 예약 정책의 backend·frontend·QA·release 연결을 `led`, SAY realtime session/provider boundary를 `co-led`, RAY 시설·재고 연동을 `contributed`, SSO Redis 세션 v2 재설계·구현을 `led`, 공통 Azure·Terraform infra를 `owned` 범위로 담당했다. SSO의 기존 일반 참여 기록은 2026-09-08 검증한 세션 v2 하위 영역으로 좁혀 보강했다.
- Public wording: `API Gateway·SSO 기반 의료 MSA에서 서비스별 backend 경계와 연동을 담당` 또는 각 하위 claim의 기여 강도를 함께 밝힌 표현까지 허용한다.
- Contribution boundary: Centurion 전체 MSA를 단독 설계·구축하거나 모든 service를 직접 만들었다고 표현하지 않는다. API Gateway와 SSO 전체 ownership도 주장하지 않으며, service별 stack과 기여 범위를 하나의 단일 stack·단일 ownership으로 합치지 않는다.

## Company Public Coverage (2026-07-17 확인)

- Source-backed: 메디솔브에이아이가 2026-03-25 "AI 메디컬 플랫폼 '센츄리온(centurion)' 시리즈" 공식 론칭 행사를 개최했다 — 도메인은 피부과 운영, `say`는 "상담 실장 옆에서 실시간 AI 어드바이스를 제공하는 솔루션", `centurion watch`는 "AI 기반 리뷰 모니터링 솔루션"으로 공개됨. https://www.mdtoday.co.kr/news/view/1065601112133242
- Source-backed: 한국마이크로소프트와 업무협약 — Azure 기반 클라우드 인프라·AI 기술로 병원 운영 통합 솔루션 고도화·글로벌 진출 (매일신문 2026-04-22). https://www.imaeil.com/page/view/2026042213570957581
- Source-backed: BAY 공개 서비스 URL 존재 — https://bay.centurion.ai.kr/
- 공개 표현 허용 범위 확장: 회사 공식 표현인 "AI 메디컬 플랫폼 센츄리온", "피부과 운영", "병원 운영 통합 솔루션"은 개인 산출물에서 사용 가능하다.
- 유지되는 경계: 고객사명(보도에 등장하더라도 개인 산출물에서는 비공개 유지), 보도에 없는 전략 서술.

## BAY Async Backend

- Code-backed: order, product, inventory API와 TaskIQ/RabbitMQ worker, inventory retry 설정, API test infrastructure, Docker CI, onboarding documents가 확인됐다.
- Code-backed (2026-08-16 재검증): TaskIQ 도입 직전 revision에도 Celery 기반 `notification.send_alimtalk` task와 API의 queue 호출이 존재했다. 따라서 **"TaskIQ를 도입하며 동기 API에서 비동기 작업을 처음 분리했다"는 판정은 superseded**다.
- Code-backed correction (2026-09-08, `workspace:BAY-BE-API`, clean `dev@9810c901`): 알림 worker의 상태 기록, 실패 이력, 최종 결과에 따른 주문 상태 분기와 수동 재발송 경로는 유지된다. 다만 알림·재고 task의 `retry_on_error`·최대 횟수·delay는 label 설정이며, 현재 broker 구성에서 retry middleware 등록이 확인되지 않는다. **2026-08-16의 자동 retry 완료 보장 표현은 superseded**다.
- Code-backed correction (2026-09-08): `src/service/auto_order_engine.py:101`의 transaction 안에서 `:133` 알림 policy를 호출한다. `src/core/transaction.py:53`은 전달받은 session을 재사용하고, 새 session의 commit은 함수 반환 뒤 `:68`이다. `src/policies/alimtalk_policy.py:844`는 주문 session 없이 알림 생성을 요청하고 `src/service/alimtalk.py:147`의 별도 알림 transaction이 끝난 뒤 `:151` queue에 넣는다. **알림 record commit → queue는 확인되지만, 주문 commit → 알림 호출은 아니다. 2026-08-28의 이 순서 설명은 superseded**다.
- Code-backed boundary (2026-09-08): `src/workers/alimtalk_worker.py:193`은 `context.retry_count`를 읽지만 설치된 TaskIQ 0.11.20의 `Context`에는 이 필드가 없고 기본 retry middleware는 message label `_retries`를 사용한다. `:207`의 `SENDING` 상태 commit 뒤 실패하면 `:243`에서 실패를 기록하고 `:267`에서 다시 던지며, 다음 실행의 `:146` 검증은 `PENDING`만 받는다. 현재 source에서 `SENDING` 복구·재선점 경로도 확인되지 않아 자동 최종 수렴·완료를 보장하지 않는다. `src/core/taskiq/{alimtalk,inventory,multi_worker}.py`, 설치 source `taskiq/abc/broker.py:101`, `taskiq/receiver/receiver.py:290`, `taskiq/middlewares/simple_retry_middleware.py:57`, `taskiq/context.py:14`를 읽기 전용 대조했다.
- Code-backed maintained scope (2026-09-08): 병원 묶음·공급사 주문별 알림, `src/workers/order_status_worker.py:153` 이후 전체 결과 확인에 따른 `CREATED → PENDING/FAILED` 분기, 실패 주문 전용 API·validator의 수동 재발송 조건은 구현돼 있다. 조건 분기가 존재한다는 사실과 모든 실패가 자동으로 그 조건에 도달한다는 보장은 구분한다. 이번 확인은 source·설치 dependency 검토이며 운영 실행·DB·외부 호출·테스트 실행은 하지 않았다.
- User-confirmed (2026-08-16): 전환 당시 FastAPI backend를 async로 운용하고 있었고, Celery가 asyncio task를 공식 실행 모델로 제공하지 않아 async-native worker 조합으로 평가한 TaskIQ를 선택했다.
- Code-backed (2026-08-16): TaskIQ 도입 직전 dependency는 FastAPI `>=0.115.11,<0.116.0`, Celery `>=5.3.6,<6.0.0`이었고, 전환 뒤 TaskIQ `>=0.11.18,<0.12.0`과 `taskiq-aio-pika`를 사용한다.
- Source-backed: Celery 5.3.6 공식 CLI의 worker pool 선택지는 prefork·eventlet·gevent·solo·processes·threads·custom이며 asyncio pool을 제공하지 않는다. TaskIQ 공식 문서는 sync/async function 실행과 FastAPI 통합을 명시한다. ([Celery 5.3.6 CLI](https://docs.celeryq.dev/en/v5.3.6/reference/cli.html), [TaskIQ](https://taskiq-python.github.io/guide/))
- Current public framing: TaskIQ의 성과는 비동기 분리 자체의 최초 도입이 아니라, 기존 Celery 기반 처리를 TaskIQ/RabbitMQ로 전환하면서 domain·service·worker를 분리하고 명시적 상태·실패 기록·수동 재발송 경계를 구현한 것이다. retry 설정의 존재를 자동 완료·최종 수렴 보장으로 표현하지 않는다.
- User-confirmed (2026-07-19 인터뷰): worker 분리는 실패를 겪은 뒤의 사후 대응이 아니라 **제품 시작 시점부터의 예방 설계** — 실패 가능한 작업(주문·결제)을 처음부터 API 경계 밖 worker로 분리했다. 배경: Memento에서 결제 실패 실사례(롤백·환불 순서·티켓 정합성)를 직접 수습한 경험의 전이 ([previous-career](previous-career.md#memento-payment)).
- Contribution boundary: 해당 backend 영역의 구축·설계 주도. Centurion 전체 backend ownership은 아니다.
- **Code-backed (2026-08-09 실측, Unverified 해제)**: `Celery -> TaskIQ migration` 이 `workspace:BAY-BE-API` Git history 로 확인됐다 — "feat: 대규모 시스템 리팩토링 - Notification/Celery 제거 및 Alimtalk/TaskIQ 마이그레이션"(2025-09-14), "Remove/notification celery (#304)"(2025-09-15), TaskIQ 1~3차 구성(2025-09-08~09), "fix: taskIQ 재고 차감 처리 오류 시, retry 로직 추가"(2025-10-01). 전부 KimMarin 명의이며 플랫폼 기재 문구와 일치한다. → `centurion.async-migration` 으로 승격.
- Measurement boundary: 전환 사실은 확인됐으나 **성능·지연 개선이나 "복잡도 감소" 정량은 측정값이 없다.** 전환과 도메인 분리까지만 말한다.
- 분리 기록 (2026-08-09): 기존 `centurion.bay-async-backend` 한 claim 에 묶여 있던 test·CI·onboarding 을 `centurion.test-ci-foundation` 으로 분리했다. 근거 anchor 는 동일하며, 각 사실을 하나의 claim 만 소유하도록 기존 statement 를 축소했다.

## SAY Realtime AI

- Code-backed: WebSocket consultation runtime, STT/LLM provider lifecycle, zombie session cleanup, reconnect race 처리, translation/audio pipeline, dashboard AI analysis가 SAY/PROTON cluster에서 확인됐다.
- User-confirmed / Git-backed (2026-08-20): PROTON은 독립 실시간 상담 backend로 시작했고 김대정이 SAY 제품 cluster로 가져왔다. `workspace:PROTON`은 초기 snapshot 이후 김대정의 application 구조·배포·Blob·WebSocket·session lifecycle 작업이 이어진 정본이다. `workspace:SAY-BE-API` commit `4a46ad6`은 SAY·PROTON·STARGATE를 독립 application으로 유지한 monorepo 통합, `5a52b8a`는 공통 model·enum의 `say_core` 통합을 기록한다. 현재 문서와 코드는 SAY가 HTTP로 PROTON session lifecycle을 조율하고 상담 client가 PROTON WebSocket에 연결하는 경계를 보여준다.
- Provenance boundary: `ai-workspace:PROTON`은 `workspace:PROTON`과 동일한 최초 commit `a2ca7df`만 가진 오래된 clone이다. 이를 별도 프로젝트·별도 기여로 합산하지 않으며, 개인 기여 근거는 `workspace:PROTON`과 `workspace:SAY-BE-API`가 소유한다.
- Code-backed (2026-08-15): `workspace:SAY-BE-API`의 WebSocket session 처리에서 중복 event를 debounce하고 기존 task를 cancel한 뒤 재생성하는 흐름, `CancelledError` 처리, STT 결과 retry, turn-state guard가 확인됐다. Git history와 blame에서 해당 lifecycle 변경의 KimMarin 기여가 확인된다.
- Code-/Git-backed (2026-08-28 재검증): `workspace:SAY-BE-API`와 원형 repo `workspace:PROTON`의 realtime transcript protocol은 `DELTA → COMPLETE → optional CORRECTED`를 같은 sequence로 연결한다. COMPLETE 도착 순서를 다시 정렬하는 구조가 아니라, COMPLETE 뒤 비동기로 도착하는 CORRECTED가 같은 sequence의 발화만 교체하도록 frontend Map과 저장 metadata를 함께 맞춘 구조다. 따라서 같은 문장이 반복되거나 보정이 늦게 도착해도 다른 turn을 덮어쓰지 않는다. DELTA는 교체형 buffer와 domain keyword trigger에 들어가 조언·추천 판단을 발화 중 먼저 시작하고, COMPLETE는 확정 문장으로 승격해 context/LLM 판단과 저장에 사용한다. KimMarin commits `afda76c`, `6ca5278`, `65964bb`, `592e489`에서 early generation buffer, sequence matching·frontend replace, DELTA keyword/COMPLETE LLM trigger, punctuation 기반 문장 분리 기여가 확인된다.
- Code-/E2E-backed (2026-08-21): 대안 STT adapter E2E는 4분 37초 상담 sample에서 DELTA 586건, COMPLETE 25건, ADVICE 14건, sequence 1–25의 누락·중복 없음을 기록한다. 이 수치는 protocol event integrity 검증이며 STT 정확도 개선 수치가 아니다. 대안 adapter의 production 전환·현재 provider라고 표현하지 않는다.
- Code-/Git-backed (2026-08-21): `workspace:PROTON`에서 KimMarin commit `017f2ea`는 provider 후보에 383개 피부과 domain keyword hint를 선택적으로 전달하도록 구성했고, commits `b665f67`~`8e5798b`는 WER·CER·keyword retention·latency를 비교하는 benchmark UI와 분석 흐름을 구축했다. committed 실제 비교 결과가 없으므로 provider 우위나 정확도 개선 결과를 주장하지 않는다.
- Experiment-backed (2026-08-21): `workspace:SAY-BE-API` handover E2E는 VAD silence 200·350·500ms의 P50을 각각 약 3.0·3.17·3.23초로 기록했고, 모델 추론 P50 2.4초가 전체의 약 80%를 차지해 VAD tuning이 주 병목이 아니라고 판정했다. KimMarin commit `a63152e`가 이 분석 문서를 기록한다. 공개 문안은 provider 실명을 제외하고 `VAD를 무작정 줄이지 않고 DELTA 조기 trigger와 provider 경계 분리에 집중`한 판단으로 사용한다.
- Current architecture boundary (2026-08-21): VAD는 speech start/end와 interrupt·session 경계를 다루며 STT 인식률 자체를 높이지 않는다. 현재 production의 text COMPLETE는 VAD가 아니라 전사 buffer의 문장 분리에서 발생한다. 현재 SAY에는 keyword별 numeric weight가 없으며 DELTA의 exact keyword priority trigger와 provider 후보 실험의 domain keyword hint를 `키워드 가중치`로 합쳐 표현하지 않는다.
- Code-/review-backed (2026-08-21): 운영에서 WebSocket 종료 뒤 reconnect timer가 남아 종료된 외부 AI session이 다시 연결되는 경로를 재현하고, pause·complete·timeout·GC·shutdown의 정리 책임과 reconnect 진입 전/backoff 이후 stop guard를 보강했다. reconnect lifecycle/race 8개와 GC TTL 5개를 합친 13개 focused regression scenario로 회귀를 고정했다. 전체 test harness 최초 구축은 주장하지 않는다.
- User-confirmed (2026-09-02): 당시 사용한 외부 실시간 음성 모델의 세션이 약 1분 주기로, 발화 중간에 무작위로 강제 종료돼 STT 품질이 떨어지는 문제가 있었다. 세션 여러 개를 시간차로 열고 응답을 종합해 기능이 끝까지 동작하게 만들었고(비용 증가 감수), 이후 모델을 교체하면서 문제가 일단락됐다. 사용자 기억은 `30초 간격`이나 코드 값은 아래와 같다.
- Code-/Git-backed (2026-09-02, `workspace:PROTON`): KimMarin commit `d0b951d`(2026-01-08)는 batch 전사 모드의 제약(전사 window 약 15초, 첫 응답 10~15초)을 우회하는 Staggered Parallel Pipeline을 구현했다 — AudioBuffer → AudioSlicer(20초 window, 10초 stagger, 5초 overlap) → WorkerPool(동시 세션 3, worker timeout 60초는 SDK 제약). 277초 오디오 test에서 worker 28개·성공률 82%·첫 응답 10.5초를 기록했고 동시 3세션으로 비용이 늘어나는 제약을 문서에 명시했다(`docs/gemini-staggered-summary.md`, test report 동봉). commit `8fbdcca`(2026-01-12)는 realtime provider를 단일 세션에서 3개 세션 풀로 바꿔 `transcription 멈춤 이슈`에 대응했다 — turn_complete 기반 세션 스위칭·브로드캐스팅, 세션별 독립 버퍼로 순서 보장, 문장 종결 부호 기반 COMPLETE 분리, 재연결 시 버퍼 정리. commit `c42c2c3`(2026-01-14)로 dev/stg provider를 staggered로 전환했다.
- Code-/Git-backed (2026-09-02): 이후 다른 author의 commit `2499428`(2026-02-05)이 staggered를 포함한 레거시 STT provider 전체를 삭제하며 provider 교체가 마무리됐다. KimMarin commit `1f8c9b5`(2026-02-11)는 번역 provider의 듀얼 세션(A/B)을 싱글 세션으로 되돌리며 `60초 주기 재연결 타이머가 경합 조건으로 약 1분 시점 응답 중단의 원인`이었음을 기록했다 — 우회책 뒤에 자체 타이머 경합이라는 원인 하나를 찾아 제거한 기록이며, 외부 모델 세션 종료 문제 전체의 단일 원인으로 표현하지 않는다.
- Measurement boundary: 82%·10.5초는 개발 test 결과이며 production 품질 수치가 아니다. 우회 전후의 STT 품질·상담 완료율 비교 수치는 없다.
- Contribution boundary: staggered pipeline·멀티세션 풀·순서 보장의 설계·구현 commit은 모두 KimMarin author라 이 하위 영역은 `led`로 표현할 수 있다. SAY 전체는 `co-led`를 유지한다. provider·모델 실명은 공개하지 않는다.
- Contribution boundary: SAY 공동 주 기여와 연계 영역 주도를 합친 `co-led` claim. provider 실명은 공개하지 않는다.

## SAY Post-Consultation Evaluation

- Need / implementation boundary: 실시간 조언을 생성하는 것과 생성 이후 근거 활용·품질 저하 사례를 검토하는 경로를 분리한다. 실제 현업의 검토 사용 빈도·개선 조치·품질 상승은 이번 조사에서 확인하지 않았다.
- Code-/Git-backed (2026-09-08): `workspace:SAY-BE-API`, `infra/ai-resource-separation@ff3e2596`, 기존 dirty `scripts/create-staff.sh`는 보존·미검토했다. KimMarin commits `aaa6b47`(평가 service·outbox), `a6efccd`(정책 정합성), `9418997`(source_type 제한), `cdb11ba`(D1–D6 데이터 흐름·평가 orchestrator)를 변경 목록과 현재 source로 대조했다.
- Mechanism: `apps/stargate/app/repository/outbox_event_repository.py:17`는 `SKIP LOCKED`로 pending event를 선택하고, `apps/stargate/app/service/outbox_event_service.py:26`의 독립 transaction으로 선점한다. `apps/stargate/app/service/outbox_poller.py:43`은 선점 transaction 밖에서 orchestrator를 실행한 뒤 완료/실패를 별도 기록한다. `:81`에는 stale PROCESSING 복구 요청 경로가 있다. 이 구현을 무손실·exactly-once 또는 모든 부분 실패 재처리 보장으로 확장하지 않는다.
- Mechanism: `apps/stargate/app/service/consultation_evaluation_orchestrator.py:60`은 `GUIDE_RAG`를 faithfulness·context precision·answer relevancy 3지표 평가로, `AI_GENERATED`를 키워드 추출로 나눈다. `:99`는 평가 완료 ID를 제외하고, `:185`는 상담×guide별 저하 사례를 만든다. `:242`는 LLM 종합 분석 실패 시 템플릿으로 사례를 남긴다. `apps/say/app/service/guide_quality.py:30`·`:115`에 지점·기간별 점검 대상과 사례 조회가 연결돼 있다.
- Test-source-backed: `apps/stargate/tests/unit/service/test_consultation_evaluation_orchestrator.py:164`는 guide 기반 응답에서 키워드 추출 미호출을, `:406`은 LLM 분석 실패 시 템플릿 사례 생성을 검사한다. 이번에는 source만 검토했고 실행·운영 DB 조회는 하지 않았다.
- Contribution / public boundary: SAY 전체 `co-led`와 중복하지 않도록 이 하위 기능은 보수적으로 `contributed / high` 구현 claim으로 둔다. `centurion.say-post-consultation-evaluation`은 상담 후 평가·검토 경로의 구현을 소유하고, 기존 `centurion.say-realtime-ai`는 실시간 session·provider 흐름을 소유한다. 실제 상담 품질 개선·자동 학습·직원 평가 성과를 주장하지 않는다.

## DAY Product Integration

- Code-backed: reservation policy를 backend judgment, frontend display, QA seed/test, release documents로 연결한 변경이 확인됐다.
- Contribution boundary: BE/FE/QA 연결 리드. DAY 제품 전체 단독 구축은 아니다.

## RAY Backend

- Code-backed: facility status query, emergency call ordering, BAY integration, messaging/migration work가 확인됐다.
- Contribution boundary: 주 기여를 한 줄로 설명할 수 있으며 전담 구축 표현은 사용하지 않는다.

## SSO Session

- Need / policy-backed: 여러 제품이 공통 인증을 사용하면서 같은 제품의 중복 로그인, 같은 브라우저의 계정 전환, 서비스 그룹별 로그아웃 범위를 구분할 필요가 있었다. `workspace:SSO-BE-API/wiki/policy/centurion-sso-login-policy-v1.1.0.md:15`의 제품 정책은 별도 작성자의 기획이며, 김대정이 정책 전체를 단독 기획했다고 주장하지 않는다.
- Code-/Git-backed (2026-09-08, clean `dev@422d2112`): 기존 인증 시스템을 전제로 Redis 세션 v2를 구현했다. KimMarin commits `9d432e3`(Redis 세션·guard·기기 인덱스), `965b975`(중복 로그인 v2 business logic), `5c2b172`·`41adcdc`(대표 서비스 기준 cross-group 기기 충돌), `a1719e9`(JTI 소유권 logout), `cd18c8b`(쿠키 유실 시 같은 기기 재로그인)를 변경 파일·대표 diff·현재 source와 대조했다. 전체 commit 비율이 아니라 이 하위 영역의 구체적 변경을 기여 근거로 삼는다.
- Mechanism: `apps/backend/src/domain/auth/services/redis-session.service.ts:34`는 사용자×서비스 session hash와 사용자·기기별 index/TTL을 기록하고, `:154`는 토큰 회전 때 관련 TTL도 갱신한다. `:203`은 대표 서비스와 그룹을 기준으로 다른 기기 충돌을 판단한다. `apps/backend/src/domain/auth/services/auth.service.ts:94`는 계정·기기·서비스 조건을 분기하고 `:295`는 저장된 JTI가 요청과 일치할 때만 그룹 session을 삭제한다. 오래된 토큰의 logout이 교체된 유효 session을 삭제하지 않도록 소유권 guard를 둔 구현이다.
- Test-source-backed: `apps/backend/test/unit/auth/auth.service.spec.ts:877`·`:895`는 session 없음/JTI 불일치 시 그룹 삭제 미호출을, `apps/backend/test/unit/auth/redis-session.service.spec.ts:415`·`:439`·`:526`은 그룹·기기 분기와 TTL 갱신을 검사한다. 이번 조사는 테스트 source 검토이며 실행·운영 트래픽·사고 감소 확인은 하지 않았다. JTI 검사와 삭제 전체의 원자성 또는 모든 동시성 race 제거를 보장하지 않는다.
- Contribution boundary: 기존 사용자 확인의 인증·세션 책임과 위 구현 이력을 결합해 **Redis 세션 v2 재설계·구현 하위 영역만 `led`**로 보강한다. `centurion.sso-session`이 유일한 public claim owner다. SSO 최초 도입·전체 인증 시스템 단독 구축, 정책 단독 기획, 보안 사고 감소율은 주장하지 않는다.

## SSO Auth Foundation

- User-confirmed (2026-08-28, 2026-09-02 범위 확정): "인증 세션은 내가 전부 설계하고 구현했고, 회사 인증 로직의 기반을 만들었다"는 진술은 Thready가 아니라 **Centurion SSO**를 가리킨다.
- Historical claim boundary (2026-09-02): 당시 `centurion.sso-session`은 Redis/JTI session·duplicate login·E2E를 `contributed`로 등록했고 사용자 진술의 더 강한 ownership은 Git 검증 대기였다.
- Code-backed 단서: `workspace:SSO-BE-API`는 NestJS·JWT·Prisma·TypeScript다 ([workspace-project-audit](../audits/workspace-project-audit.md#sso-be-api)).
- Verification update (2026-09-08): [SSO Session](#sso-session)의 선택한 구현 commit·현재 source 대조로 Redis 세션 v2의 `led`를 확인했다. 원래 진술의 회사 인증 기반 전체 또는 SSO 최초 구축까지 확인한 것은 아니다.
- Claim status: public 범위는 `centurion.sso-session`으로 통합했다. `centurion.sso-auth-foundation`은 원래 더 넓은 진술의 보류 이력을 보존하는 `public: false` record이며 중복 public owner로 사용하지 않는다.

## Shared Infra

- Code-backed: Azure/Terraform resource와 deploy/runbook documentation의 구축·운영 범위가 확인됐다.
- User-confirmed: 회사 infra repository 전체와 Azure infra 운영·관리를 담당한다.
- Contribution boundary: Centurion infra 구축·운영은 `owned`로 표현할 수 있다. 회사 전체 범위는 [Company Azure Infrastructure Evidence](infrastructure.md)를 따른다.

## Public Disclosure

- 회사명 MediSolve AI는 공개 가능하다. 과거 회사 보도에서 확인한 제품 명칭의 공개 가능 판단보다 2026-09-03 [Public Safety](../../rules/public-safety.md#internal-product-names-2026-09-03)의 내부 제품명 마스킹 결정이 우선한다. Centurion·DAY/BAY/RAY/SAY는 evidence 내부 식별자로만 쓰고 공개 산출물에서는 기능 설명으로 바꾼다.
- 고객사, provider, resource/security/cost detail은 공개하지 않는다.

## Rejected Or Unverified Claims

- Centurion 제품 전체 단독 구축
- SSO 전체 구축
- TaskIQ 도입으로 동기 API에서 비동기 처리를 처음 분리했다는 서술
- TaskIQ 전환 이전에는 외부 연동 실패가 API 응답과 주문 상태에 직접 결합돼 있었다는 서술
- production traffic과 안정성 수치
- NEXUS Admin/Homepage backend·지점 권한·예약률·매출 outcome을 Centurion 또는 DAY 성과로 합산
