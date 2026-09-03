---
type: profile
title: Engineering Keywords
description: 엔지니어링에서 반복해서 지키는 여섯 축(성능·보장·신뢰·멱등·정합·설계)의 canonical 정의와 근거, 표면별 표현 규칙.
timestamp: 2026-09-03
tags: [identity, engineering, keywords, sot]
---

# Engineering Keywords — 기술 주장의 축 (2026-09-03, user-confirmed)

이력서·경력기술서·포트폴리오·면접에서 기술적으로 어필하는 축은 아래 여섯 개다. 기전만 쓰고 단어를 빼면 리뷰어가 키워드로 훑을 때 놓친다. **성과 제목이나 문장 머리에 이 단어가 드러나야 한다.** 새 사례를 추가할 때는 어느 축인지 먼저 정한다.

## 여섯 축

| 축 | 한 문장 정의 | 대표 근거 (claim) | 문장 머리 표현 |
| --- | --- | --- | --- |
| **설계** | 경계·책임·전이 규칙을 먼저 정하고 그 위에서 구현한다 | `be-template.backend-standard` (계층·ADR·Hexagonal 판단) · `thready.rebuild-decision-execution` (규칙 먼저 세팅) · `thready.ai-service-boundary` | `경계를 먼저 정하고`, `~을 entity/service가 소유하게` |
| **보장** | 실패·지연·순서가 어긋나도 약속한 결과가 유지된다 | `thready.ai-replica-outbox` (전달 보장) · `centurion.say-realtime-ai` (세션 풀 순서 보장, sequence fence) · `centurion.bay-async-backend` (실패 승격) | `전달 보장`, `순서 보장`, `실패를 숨기지 않고 상태로` |
| **멱등** | 같은 입력을 몇 번 넣어도 같은 상태로 수렴한다 | `thready.ai-replica-outbox` (멱등 consumer) · `thready.labeling-corpus-workbench` (재적재 멱등 importer) · `thready.conversational-editorial-agent-prototype` (receipt idempotency) · `thready.generation-aggregate-optimistic-lock` (멱등 replay 판별) | `재적재 멱등`, `멱등 소비`, `같은 confirmation 재실행 차단` |
| **정합** | 원장·복제본·결제·상태가 서로 어긋나지 않는다 | `thready.ai-service-migration` (지문 대조 · FK orphan 0) · `career.memento-payment` (환불 순서·티켓) · `thready.generation-quota-admission` (동시 요청 초과 실행 차단) | `정합 검증`, `상태 정합성`, `이중 과금 차단` |
| **신뢰** | 측정과 검증으로 판단한다. 기준 자체도 다시 잰다 | `thready.measurement-correction` (기준값 되먹임 재실측) · `thready.falsification-log` · `centurion.say-realtime-ai` (13개 focused regression) · post-deploy E2E gate · `mediness.quality-evidence-harness` (실행 성공≠품질 통과, PASS/FAIL/UNKNOWN) | `실측으로 확인`, `회귀로 고정`, `기준을 다시 재서` |
| **성능** | 병목을 실측으로 찾고, 체감 지연을 줄이는 지점에만 손댄다 | `centurion.say-realtime-ai` (VAD P50 실측 → 모델 추론 약 80% → DELTA 조기 trigger) · staggered 세션 풀의 첫 응답 판단 | `지연 병목 실측`, `체감 지연을 앞당겨` |

## 사용 규칙

- 회사별 지원본의 대표 성과 제목 4개 안에 **최소 4개 축의 단어**가 드러나야 한다 (게이트 11). 백엔드 공고는 보장·멱등·정합·설계, AI 공고는 설계·신뢰·멱등·보장이 기본.
- 수치는 claim의 `allowed_copy` 범위 안에서만 붙인다. 성능 축은 "개선 %"가 없으면 **실측으로 병목을 가려낸 판단**으로 쓴다. `HTTP 5xx 0.3%`는 재측정 전까지 쓰지 않는다 (thready.md Resume selection decision).
- 강도는 claim을 따른다. SAY 실시간(순서 보장·성능·13개 회귀)은 `공동 주 기여`를 문장 안에 둔다.
- 여섯 축에 걸리지 않는 사례는 대표 성과가 아니라 supporting이다.

## 표면별 현황 (2026-09-03 보강 반영)

| 표면 | 설계 | 보장 | 멱등 | 정합 | 신뢰 | 성능 |
| --- | --- | --- | --- | --- | --- | --- |
| 피처링 이력서 | 03·04 | 03 제목 `순서를 보장`, 04 제목 `전달 보장` | 01 importer, 04 `멱등 소비` | 04 `정합 검증`·지문·FK | 03 13개 회귀, 04 E2E gate | 03 VAD P50 실측 |
| JYP 이력서 | 01·03 | 03 confirmation | 02 importer 멱등 | 02 판단 데이터 | 02 재실측·반증 로그 | — (AI 공고, 미요구) |
| 경력기술서 | template·rebuild | Outbox 전달 보장, SAY 순서 보장 | Outbox·이관 | 지문·FK·quota | 13개 회귀·E2E gate·VAD 실측 | VAD 실측 |

## 등록 대기 (evidence는 있고 표면에 없는 것)

- 없음 (2026-09-03 보강으로 소진). 새 사례가 생기면 이 표에 먼저 넣고 표면에 뿌린다.

## 관련

- [identity.md](identity.md) · [branding-product-engineer.md](branding-product-engineer.md) — "끝까지 책임진다"의 실체가 이 여섯 축이다
- [Design Diagram Library](../products/portfolio/design-diagram-library.md) — 반복 습관 표 (도식 층)
- [Application Copy Standard §1-5 · 게이트 11](../rules/application-copy-standard.md)
- [Claim Registry](../evidence/claims/README.md)
