---
type: audit
title: Achievement Code Discovery — 2026-09-08
description: 원본 코드·Git·테스트 소스와 기존 claim을 대조한 신규 근거, 현재 구현 정정, 공개 보류 및 조사 범위.
timestamp: 2026-09-08
tags: [evidence, audit, achievements, thready, centurion, procedure-hub, nexus]
---

# Achievement Code Discovery — 2026-09-08

## Method And Boundary

- 목적: 기존 이력서 문장을 반복 검증하는 데 그치지 않고 기능·실패 처리·판단 근거를 원본에서 찾은 뒤 기존 claim과 대조했다. 아래 표는 선택·보류 원장이며 공개 사실의 canonical owner는 연결한 project evidence와 stable claim이다.
- Source-only: 원본 repository의 현재 branch·HEAD·dirty 상태, 코드, 선택한 Git log/show/blame, 테스트 source, release·검증 보고서를 읽었다. 원본 코드·DB·배포·외부 API·테스트 runtime은 변경하거나 실행하지 않았다. `.env`·credential·고객 raw data·private 대화 원문은 근거 수집 대상으로 열지 않았다.
- Recorded verification과 이번 실행을 구분한다. release 문서의 PASS는 그 날짜·환경의 기록이지 이번 재실행이나 현재 production 성공 증거가 아니다. branch 이름 `prod`도 배포 확인을 대신하지 않는다.
- 기여는 기존 원장에서 본인으로 확인된 KimMarin identity와 선택한 구현 변경을 대조했다. commit 비중·blame 비율로 단독 ownership을 추론하지 않고, coding agent 사용과 손코딩도 동일시하지 않는다. 기획 문서의 별도 작성자, 초기 prototype, 과거 구현 삭제를 구분했다.
- `run-application-team`의 evidence → claim → 문안 순서를 적용했다. graphify의 기존 graph query는 탐색 routing 보조로만 사용했고 graph 재구축·저장은 하지 않았다.
- 쓰기는 이 audit 및 Thready·Centurion·Procedure Hub의 evidence/claims로 제한했다. 기존 dirty Thready의 구독 매출 공개 범위 문구는 보존했다. NEXUS는 최신 이관 후보를 이 audit에만 보류하며 새 public claim을 만들지 않았다.

## Selected Claims And Corrections

| 분류 | Stable claim / 근거 owner | 반영한 성과·기여 상한 | 검증·공개 경계 / 추천 활용 |
| --- | --- | --- | --- |
| 새 근거 | `thready.creator-adoption-context` · [고객 문제](../projects/thready.md#creator-customer-problem) | 기존 채널 creator의 시간 부족·Threads 진입장벽과 지속 운영을 돕는 제품 맥락, contributed/medium | 사용자 확인. 시간 절감률·모든 고객 일반화 없음. 대표 성과의 문제 맥락 |
| 새 근거 | `thready.customer-follower-growth` · [성장 사례](../projects/thready.md#customer-follower-growth) | 꾸준히 운영한 이용 고객 1명의 기존 대비 팔로워 10배 이상 사례, contributed/medium | 기간·전후 원시 수치·사용 기능 미확인. 제품·팀 outcome이며 특정 구현 단독 인과 없음. 대표 성과의 관측 사례 |
| 새 발견 | `thready.auto-generation-approval-flow` · [생성·승인 알림](../projects/thready.md#automatic-generation-and-approval-flow) | 시간표 생성→초안 채택→목표 시각 알림의 상태·중복 편성 경계, led/high | 현재 source·로컬 release 기록. 고객의 최종 판단 유지; 새 기능 production 사용 미확인. 대표 기능·기술 상세 |
| 보강·분리 | `thready.youtube-source-reuse` · [기존 소재 활용](../projects/thready.md#youtube-source-reuse) | 정기 수집·소유권·계정별 성공 소비·소재 고갈 경계, led/high | 기존 workflow의 구체 구현 owner. YouTube 범위이며 모든 외부 채널 자동 탐색 아님. 대표 기능·면접 |
| 새 발견 | `thready.publish-recovery-boundary` · [발행 복구](../projects/thready.md#publishing-recovery-boundary) | 확정 실패와 외부 결과 불명을 구별하고 기존 시도 재개·종결 원자화, led/high | 코드·테스트 source. 외부 exactly-once·중복 게시 0·모든 완료 보장 없음. 기술 상세·면접 |
| 새 발견 | `thready.approval-command-consistency` · [승인 명령](../projects/thready.md#approval-command-consistency) | 수정본·결정·예약/발행 job의 같은 transaction, command replay·링크 만료 상속, led/high | 전체 auth ownership 아님. 코드·테스트 source이며 운영 개선 지표 없음. 기술 상세·면접 |
| 정정·유지 | `centurion.bay-async-backend`, `centurion.async-migration` · [주문 후속 작업](../projects/centurion.md#bay-async-backend) | Celery→TaskIQ 전환, domain/worker 분리·상태·실패 기록·수동 재발송 led/high 유지 | 주문 commit 이후 알림이라는 순서와 자동 retry 최종 수렴 보장은 철회. 알림 자체 commit→queue는 유지. 기술 상세 |
| 기여 보강 | `centurion.sso-session` · [세션 v2](../projects/centurion.md#sso-session) | Redis 세션 v2의 사용자·서비스·기기 경계, JTI 소유권 logout 재설계·구현 led/high | 기존 contributed를 구체 하위 영역의 led로 통합. `sso-auth-foundation`의 전체 인증 기반 주장은 비공개 보류. 대표 기술·면접 |
| 새 발견 | `centurion.say-post-consultation-evaluation` · [상담 후 평가](../projects/centurion.md#say-post-consultation-evaluation) | outbox→source 유형별 평가/키워드→저하 사례·관리 조회 구현, contributed/high | 현업 사용·상담 품질 개선·자동 학습은 미확인. 기술 상세·면접 |
| 현재 구현 정정·보강 | `procedure-hub.hybrid-retrieval-design`, `procedure-hub.retrieval-evaluation-gate`, `procedure-hub.canonical-data-platform` · [검색 플랫폼](../projects/procedure-hub.md) | 구조화 검색과 안전 판정 분리, claim 검수·citation·publication·release 복구 경계, owned/high 유지 | generation·shadow는 과거 구현 후 제거. STG 기술 검증≠임상 승인·production 운영. 검색·지식 신뢰 경계 사례 |

우선 활용은 고객 맥락을 동반한 Thready 생성·승인 흐름, 공통 인증의 SSO 세션 v2, 외부 부작용을 다루는 Thready 발행 복구다. 구독 매출은 기존 `thready.subscription-revenue-band`의 2026년 8월 기준 팀 상업 검증으로 따로 둔다. 새 구현으로 매출·팔로워 증가를 만들었다는 소급 인과는 금지한다.

## NEXUS Migration Candidate — Hold

아래는 별도 조사 담당의 R2 원본 재검토를 전달받은 근거다. 이 curation 단계에서는 원본 script를 재실행하거나 raw ledger를 읽지 않았으며 새 public claim은 만들지 않았다.

- 문서 snapshot: `workspace:NEXUS-key-doctor-prod`, clean `prod@69bd9ff4dc0030ab03ab2e68197c184d0e9c494b`. 아래 문서의 prefix는 `plans/daybeau-migration/`이다.
- Report-backed: `domains/full-cycle-dry-run-20260619-latest.md:3`·`:61`은 6월 19일 로컬 full-cycle dry-run과 FK orphan 검사 결과를 기록한다. `artifacts-manifest.md:67`·`:75`는 6월 22일 prod-load artifact를 참조하고, `domains/prod-data-qa-20260623.md:5`·`:13`·`:32`는 1차 PROD 적재 후 read-only QA와 site-config/FK 점검을 기록한다. 문서의 실행 보고와 실행자 신원은 별도다.
- Authorship-backed: KimMarin docs commits `3e4b9857`, `220fd520`, `d8d58d37`, `255a34a5`, `36f6605a`를 확인했다. 6월 19일·23일 보고서는 `36f6605a`에 문서로 적재됐다. 분석·설계·검증 보고·handoff 기여는 강하지만 이것만으로 모든 최신 script의 작성 또는 모든 실행을 본인이 했다고 확정하지 않는다.
- Code/dirty boundary: `workspace:NEXUS-migration`, `migration/v0-sync@d4c2185c82e1993d09114b79e3fa03622ae02ad6`, `.gitignore` modified와 여러 untracked 파일이 존재한다. `scripts/migration/migrate_customer_reservation.py`, `migrate_catalog.py`, `migrate_content.py`는 untracked여서 최신 작성자와 6월 실행본 동일성 미확인이다. 첫 script `:652`의 normalize→existing sync→insert→commit→validate→ledger, `:884`·`:951`의 기존 예약·항목 skip은 읽은 현재 구현일 뿐 author/실행 증명은 아니다. `--sync`는 신규 삽입이며 update/delete CDC가 아니다.
- Historical distinction: tracked `scripts/migration/migrate_daybeau.py`의 KimMarin `6594cd73`·`fbe439e2`는 1월 이력이고 clean PROD `a5b38996`에서 삭제됐다. 이를 6월 최신 이관 구현으로 합치지 않는다. `workspace:NEXUS`, dirty `codex/key-doctor@cb075b480efd76be41b5ff9fa304d578d2e43d92`의 기존 충돌 파일도 보존했다.
- Scope/time distinction: `domains/customer-reservation-report.md:4`·`:8`의 6월 11일 snapshot/12일 dry-run 대상과 19일 report의 대상 수는 다르다. `domains/prod-data-qa-20260623.md:140`은 외부 인증·연동·상품 연결 P1 잔여를 기록하고 `august-2026-gates-and-rollback.md:17`·`:39`는 P1 open을 기본 no-go로 둔다. `artifacts-manifest.md:27`의 August 실행 기록은 빈 template이며 `august-2026-runbook.md:259`의 자산 업로드 수치는 6월 회고다.
- 보류: 최신 이관 전체 `led`, 전체 지점 서비스 전환, 8월 재이관 완료, rollback 실제 실행, 완전 CDC, 내부 정확 건수의 public 공개. 다음 승격 후보는 실행자/버전 확인 뒤의 범위 제한 `contributed`이며 현재 기존 NEXUS claim 상한을 확대하지 않는다.

## Coverage

| Repo alias | 확인 snapshot / dirty | 읽은 범위 | 이번에 확인하지 않은 것 |
| --- | --- | --- | --- |
| `workspace:thready` | clean `prod@37fc328e` | 현재 backend/AI의 생성·소재·승인·발행 경로, 테스트 source, 선택한 log/show/blame와 최신 비병합 이력, v1.9.1-rc.2 기록 | production 배포·실사용·로그·DB, 전체 FE 전수, 모든 release·최초 AI 전체 ownership |
| `workspace:BAY-BE-API` | clean `dev@9810c901` | 주문 transaction→알림 policy/service→TaskIQ broker/worker→주문 상태, 설치 TaskIQ 0.11.20·aio-pika 0.4.4 source | 운영 broker 설정·DB·외부 발송, 실제 실패 재현, 현재 production 상태 |
| `workspace:SSO-BE-API` | clean `dev@422d2112` | 로그인·Redis 세션·JTI logout, 해당 테스트 source, 선택한 6개 구현 commit, 공식 정책 문서 | SSO 최초 전체 설계, 제품 정책 단독 작성, runtime E2E·보안 사고 결과 |
| `workspace:SAY-BE-API` | `infra/ai-resource-separation@ff3e2596`; 기존 script dirty | 평가 orchestrator·outbox 선점/처리·관리 조회·테스트 source와 선택한 4개 commit | dirty script 내용, 운영 평가 데이터·현업 사용·모델 개선 효과 |
| `workspace:PROCEDURE-HUB` | clean `refactor/frontend@5b9af030` | knowledge 검수·publication/rollback·retrieval source, fixture 평가 source, 선택한 4개 이상 구현 이력, STG·임상 검토 기록 | 임상 판단 검증, DB·검색 runtime 실행, 현재 branch production 반영 |
| NEXUS 3개 alias | 위 보류 절의 각 snapshot·dirty 구분 | R2 담당의 docs·Git·script 교차 검토 결과를 전달받아 보류 기록 | 이 단계의 독립 전수 재탐색·실행자 확인·untracked author 확인 |

`workspace:thready-lab`, `workspace:trend-crawler`, `agentspace:thready-llm-wiki`는 이번 새 public claim의 독립 근거로 확대하지 않았다. 기존 데이터·실험 claim은 유지하며 관련 repo의 전체 구현 ownership을 새로 승격하지 않는다.

## Other Findings Not Promoted

- Thready scheduler의 충분한 계정별 관측량을 요구하는 benchmark fallback·후보 정렬은 기존 추천 근거의 보강 후보다. 사용 효과·전후 수치가 없어 별도 대표 성과로 늘리지 않았다.
- Thready writer의 quality-only 실패 완화는 좋은 면접 후보지만, policy judge 실패도 soft-skip하는 경로가 있어 “항상 정책 검증을 통과한 초안만 반환”은 사용할 수 없다. 별도 public claim으로 승격하지 않았다.
- Memento의 main 미포함 선결제/비회원 SSO commit은 별도 담당의 보류 판단을 유지한다. 이 audit에서 원본을 교차 검토하거나 public claim을 추가하지 않았다.

## Follow-Up Questions

1. 팔로워 성장 사례의 대략적인 이용 기간·전후 수치와 실제 사용 기능을 확인할 수 있는가? 공개에는 고객을 식별하지 않는 범위만 필요하다.
2. 상담 후 품질 사례를 실제로 누가 검토했고, 가이드 수정 등 어떤 조치로 이어졌는가? 구현과 현업 사용 결과를 분리하기 위한 질문이다.
3. NEXUS 6월 이관 실행자와 당시 사용한 script revision을 연결할 수 있는가? 문서 작성·검증 기여를 전체 이관 구현·실행으로 넓히기 전에 필요하다.

## Validation

- 원본 테스트·DB·외부 API 실행 없음. source review와 과거 실행 보고서만 사용했다.
- evidence/claim 파일의 `git diff --check`와 기존 validator의 metadata·portable path·claim schema/anchor·Markdown link 검사 모두 PASS. Python bytecode 생성을 끈 읽기 전용 호출이며 결과 파일은 생성하지 않았다.
- 전체 문안 gate·활성 route·render 검증은 공용 문서 취합 담당의 별도 완료 검사다. 이 evidence 작업에서 수행한 것으로 기록하지 않는다.
