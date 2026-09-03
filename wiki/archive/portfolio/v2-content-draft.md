---
type: product-draft
title: Portfolio V2 Content Specification
description: 제품 성과와 backend·infra 전문성을 system dossier로 보여주는 portfolio v2 명세.
timestamp: 2026-08-19
status: superseded
depends_on:
  - products/portfolio/README.md
  - products/portfolio/cases/README.md
  - evidence/claims/
tags: [portfolio, content, system-dossier, superseded]
---

# Portfolio V2 Content Specification

> Superseded by [Portfolio V3](../../products/portfolio/v3-content-draft.md). 현재 primary/supporting tier와 route slug는 `app/fe/lib/cases.ts`가 소유하며 이 문서의 case 순서·route mapping을 active contract로 사용하지 않는다.

## 1. 목적

이 포트폴리오는 기술 스택이나 프로젝트 수를 나열하지 않는다. 다음 네 가지 역량을 실제 사례로 증명한다.

1. 기획 경험을 바탕으로 고객·운영 문제를 정의하는 능력
2. 문제를 제품 기능과 backend contract로 번역하는 능력
3. 분산 상태·외부 provider·인프라 변경의 failure boundary를 설계하는 능력
4. AI를 구현 속도에 활용하면서 판단·검증 책임을 engineering harness로 남기는 능력

대표 독자는 Engineering Manager와 Senior Backend Engineer다. Recruiter는 단일 문서 안에서 각 케이스의 `Executive Summary`, `Role`, `Proof`만 훑어도 역할과 결과를 이해할 수 있어야 한다.

## 2. 전체 서사

### Positioning

> 기획자로 일하며 고객의 불편을 찾는 법을 배웠고, 지금은 그 문제를 backend와 인프라 시스템으로 직접 해결합니다. AI를 구현 속도에 적극 활용하되, architecture·검증·release 책임은 사람이 확인할 수 있는 기준으로 남깁니다.

### Portfolio Thesis

> 고객과 운영의 문제를 찾고, 제품 기능·backend contract·인프라 운영 체계로 구체화합니다.

### 보여줄 증거

| 역량 | 대표 케이스 | 증거 방식 |
| --- | --- | --- |
| 제품 0→1과 사업 기여 | Thready | 실제 사용자 운영, 구독료 매출, 역할 지도 |
| 분산 backend 설계 | Centurion | workload별 상태·실패·복구 경계 |
| 회사 인프라 운영 | Azure/Terraform | state boundary, change gate, observability |
| 외부 transaction 정합성 | Memento | manual capture, provider compensation, refund transition |
| 조직·AI 실행 체계 | Backend Template + Product Operations | engineering contract, agent context, release gate |
| 제품 문제 정의 배경 | Product/UX | consulting, product study, 공동 product outcome |

## 3. 단일 페이지 정보 구조

### Header

```text
Portfolio

고객과 운영의 문제를 찾고,
backend와 인프라 시스템으로 해결합니다.

기획 경험을 바탕으로 제품 요구를 정의하고, 이를 domain·API·worker·data·infra contract로
구체화해 production까지 책임져 왔습니다.

PRIMARY ROLE  Tech Lead / Backend Engineer
FOCUS         Product 0→1 · State · Failure · Delivery
CASES         4 System Dossiers
```

### Case Order

1. Thready — 제품 0→1과 매출 기여
2. Centurion — 의료 MSA의 failure boundary
3. Company Infrastructure — 전체 서비스의 Azure 운영 체계
4. Memento — 결제 provider와 로컬 상태 정합성

### Supporting Background

- Engineering System — FastAPI 표준 template + agent-readable development/release
- Product/UX Background — 고객 문제 정의와 개선안 설계 경험

### 문서 표현 원칙

- 네 대표 사례는 같은 페이지에 전문을 펼치고, 첫 목차에서 원하는 사례로 바로 이동하게 한다.
- 개별 상세 route는 기존 링크 호환용으로만 유지하며 공개 문서의 기본 동선으로 사용하지 않는다.
- 제목은 광고 문구가 아니라 `무엇을 어떤 범위에서 했는가`를 요약한 한 문장으로 쓴다.
- 임팩트는 제목이 아니라 `Role`, `Scope`, `Proof`, 상세 failure walkthrough에서 만든다.
- 내부 claim ID, 표현 상한, 검증 상태와 제작 상태는 공개 DOM에 노출하지 않는다.
- 인쇄할 때 각 대표 사례는 새 A4 페이지에서 시작하고, navigation·footer·launcher는 숨긴다.

## 4. 공통 dossier 구조

각 사례는 단일 문서 안에서 아래 순서를 유지한다.

1. `Executive Summary` — 문제, 역할, 결과를 2~3문장으로 요약
2. `Role And Scope` — 직접 소유, 주도, 공동 기여, 제외 범위
3. `System Invariant` — 반드시 지켜야 했던 상태·운영 조건 한 문장
4. `Problem And Constraints` — 요청, 사용자 문제, 기술·조직 제약
5. `Failure Walkthrough` — trigger, 깨지는 상태, control
6. `Decision Ledger` — 선택한 구조, 기각한 대안, trade-off
7. `Architecture And Mechanism` — 실제 책임·data flow 시각화
8. `Verification And Outcome` — code/test/tool/product 근거
9. 검증 상한과 보장하지 않는 속성은 내부 evidence·case library에만 보존하고 공개 문서에는 노출하지 않는다.

## 5. Case 01 — Thready

### 제목

> Thready의 0→1 제품화와 backend 구축·운영을 주도했습니다.

### Executive Summary

기획 경험을 바탕으로 Threads 콘텐츠 제작 과정의 불편을 제품 요구로 구체화하고, 시장 데이터를 분석해 생성·평가 기준을 만들었습니다. 초기 prototype 이후 FastAPI backend 재구축, AI 생성 pipeline, QA·release·production 운영까지 맡아 실제 사용자가 구독하는 제품으로 연결했습니다.

제품은 2026년 8월 기준 월 약 800만~1,000만원의 구독료 매출이 발생합니다. 이는 제품·팀 outcome이며, 개인 단독 인과가 아니라 문제 정의부터 backend·품질·운영까지 상당 부분을 맡아 기여한 결과로 표현합니다.

### Role And Scope

| 단계 | 역할 초안 |
| --- | --- |
| 고객 문제 정의 | 콘텐츠 작성·성과 판단 과정의 불편을 제품 문제로 구체화 |
| 시장·콘텐츠 분석 | Threads data 수집·분석, 성과 기준 후보 설계 |
| 제품 설계 | 생성·평가 workflow와 요구사항 구체화 |
| Backend | FastAPI backend 재구축, AI pipeline, service/data boundary 직접 소유 |
| Quality | validation harness, labeling workbench, 실험용 rubric·judge 구축 |
| Delivery | QA·release·production 운영 주도 |
| Business Outcome | 실제 사용자 운영과 구독료 매출 발생에 상당 부분 기여 |

`거의 혼자 했다`는 형용사보다 위 responsibility map으로 범위를 보여준다. Frontend·design·acquisition에서 다른 기여가 있었던 범위는 최종 공개 전 별도 표기한다.

### System Invariant

> 구현 속도를 높여도 기존 사용자 흐름과 데이터 정합성을 검증 없이 바꾸지 않는다.

### Product Flow 시각화

```text
고객의 콘텐츠 제작 문제
        ↓
시장 data·콘텐츠 pattern 분석
        ↓
생성·평가 기준과 제품 요구 정의
        ↓
FastAPI backend·AI pipeline 구현
        ↓
QA·release·production 운영
        ↓
실제 사용자 구독
        ↓
월 800만~1,000만원 구독료 매출
```

### Engineering Deep Dive

#### A. AI-assisted Backend Rebuild

- 초기 prototype의 기존 동작과 API contract를 validation harness로 먼저 고정
- Frontend는 유지하고 backend만 parallel rebuild
- AI를 codebase 파악·기능 inventory·반복 구현에 적극 활용
- 범위·architecture·검증·cutover 판단은 직접 소유
- codebase 파악부터 backend 재구축까지 총 36시간, 작업 시간 기준
- cutover 전후 해결된 QA issue의 reopen 비율 26%p 감소

#### B. BE–AI Application And Data Boundary

- 제품 정책·원장은 product backend가 소유
- 생성 lifecycle·실행 상태는 독립 AI application·DB가 소유
- owner mutation과 Outbox를 같은 transaction에 기록
- relay retry와 delivery version fence로 stale delivery 제한
- STG 생성 이력 2,616건·품질 snapshot 795건·trace 7,111건을 각각 migration
- local rehearsal, row count, MD5 fingerprint, FK orphan, post-deploy API E2E로 검증

#### C. Data-driven Generation Quality

- 한국어 본문 111,091건과 작성자 이어쓰기 185,475건을 독립 labeling schema로 이관
- typed batch validation, source-key upsert, continuation replace 기반 멱등 importer
- API/UI labeling workbench
- 별도 20,256건 hook-quality 분석을 8축 rubric과 실험 writer·LLM judge에 반영
- corpus productization과 rubric experiment를 같은 production 적용으로 합치지 않음

### Architecture 시각화

```text
[Product Backend]
 policy · owner data
        │
        ├─ owner mutation + Outbox ── same transaction
        │                              ↓
        │                         relay · retry
        │                         version fence
        │                              ↓
        └──────────────────────> [AI Application / DB]
                                  generation lifecycle · trace
```

### Proof

| 구분 | 공개 초안 |
| --- | --- |
| Product | 실제 사용자 구독 제품, 2026.08 월 약 800만~1,000만원 구독료 매출 |
| Execution | AI-assisted backend rebuild 36시간, 작업 시간 기준 |
| QA Signal | validation harness를 먼저 세운 cutover 전후 QA reopen 비율 26%p 감소 |
| Migration | STG 2,616 / 795 / 7,111건 개별 정합성 검증 |
| Data Workflow | 본문 111,091건·continuation 185,475건 labeling workflow |

### Internal Guardrails (public 미노출)

- 매출은 제품·팀 outcome이며 특정 backend 기능의 단독 인과로 표현하지 않는다.
- QA reopen 변화는 BE/FE가 함께 포함된 cutover signal이며 harness만의 단독 효과가 아니다.
- AI application·DB migration은 STG 검증 범위이며 Prod 완료·무중단 전환을 주장하지 않는다.
- 111,091건 전체를 LLM으로 분석하거나 labeling 완료했다는 뜻이 아니다.

### Claim 상태

- 기존 사용 가능: `thready.backend-rebuild`, `thready.prototype-to-user-operation`, `thready.subscription-revenue-band`, `thready.rebuild-decision-execution`, `thready.qa-reopen-reduction`, `thready.ai-service-boundary`, `thready.ai-service-migration`, `thready.ai-replica-outbox`, `thready.labeling-corpus-workbench`, `thready.hook-rubric-experiment`
- 승격 필요: `제품 0→1 전반 주도`, `고객 문제 정의부터 매출까지 상당 부분 기여`의 정확한 ownership 범위

## 6. Case 02 — Centurion

### 제목

> 의료 MSA에서 주문·재고, 실시간 상담, 지점 접근의 실패·복구 경계를 설계했습니다.

### Executive Summary

Express API Gateway와 NestJS SSO를 공유하고 FastAPI product backend, RabbitMQ·TaskIQ worker, WebSocket realtime service가 분리된 의료 MSA 환경에서 서비스별 backend 구축·연동을 수행했습니다. MSA 자체보다 workload마다 실패했을 때 어떤 상태를 남기고 어디서 복구할지를 기준으로 경계를 설계했습니다.

### Role And Scope

| 영역 | 기여 강도 | 공개 범위 |
| --- | --- | --- |
| 주문·재고 backend | Lead | API, TaskIQ·RabbitMQ worker, 상태·retry·실패·재처리 |
| 실시간 AI 상담 | Co-lead | session lifecycle, provider boundary, duplicate event guard |
| 통합 관리 backend | Lead, 진행 중 | Homepage/Admin API 구조, server-owned working branch |
| 예약 정책 | Lead | backend·frontend·QA·release 연결 |
| 시설·재고 연동 | Contributor | 시설 현황·긴급 호출·재고 연동 backend |
| Gateway·SSO | Shared context | 전체 구축 ownership 주장 금지 |

### System Invariant

> 한 서비스의 실패나 사용자의 입력이 다른 업무의 완료 상태와 권한 경계를 임의로 바꾸면 안 된다.

### Failure Walkthrough

| Trigger | 깨질 수 있는 상태 | Control |
| --- | --- | --- |
| Worker failure | API 응답 뒤 알림·재고 작업이 사라짐 | explicit state, retry, terminal failure, manual recovery |
| Duplicate WebSocket event | 늦은 task가 현재 turn을 덮음 | cancellation, debounce, retry, turn-state guard |
| Client branch header 변경 | 권한 밖 지점 데이터 접근 | server auth state, permission API, 409/403 |
| Platform ownership 혼동 | 전체 MSA를 단독 구축한 것처럼 보임 | shared context와 service별 contribution 분리 |

### Architecture 시각화

```text
[Express Gateway] ──> [NestJS SSO]
       shared              shared
                           │
              ┌────────────┼─────────────┐
              ↓            ↓             ↓
       [Admin/CRM]   [Order/Stock]   [Realtime AI]
       FastAPI       FastAPI         FastAPI/WebSocket
       auth state    Rabbit/TaskIQ   turn-state guard
```

### Proof

- 주문·재고 API와 worker의 상태·retry·최종 실패·수동 재처리 경계
- Celery에서 TaskIQ·RabbitMQ로 실행 모델 전환
- WebSocket duplicate event의 cancellation·debounce·retry·turn-state guard
- working branch를 server auth state가 소유하고 permission API로만 전환
- API test infrastructure, Docker CI, local setup·onboarding

### Internal Guardrails (public 미노출)

- Centurion 전체 MSA·모든 service·Gateway·SSO 전체를 단독 설계·구축했다고 주장하지 않는다.
- 통합 관리 backend와 working branch 변경은 진행 중이다.
- availability·traffic·latency·MTTR 전후 수치는 없다.

### Claim 상태

- 사용 가능: `centurion.msa-platform-context`, `centurion.bay-async-backend`, `centurion.async-migration`, `centurion.test-ci-foundation`, `centurion.say-realtime-ai`, `centurion.day-product-integration`, `centurion.ray-backend`, `nexus.admin-backend-ownership`, `nexus.branch-access-boundary`

## 7. Case 03 — Company Infrastructure

### 제목

> 회사 전체 Azure 인프라를 설계하고 Terraform 기반 변경·운영 검증 체계로 관리했습니다.

### Executive Summary

회사 전체 서비스의 Azure 인프라를 전담하며 제품·환경별 resource와 state boundary를 설계했습니다. AI를 resource inventory와 Terraform 구현에 활용하되, 사람이 작성했든 AI가 작성했든 state·plan·live inventory를 교차 검증한 변경만 apply하도록 회사 infrastructure harness를 구성했습니다.

현재 workload와 조직 규모에 맞춰 Azure managed application runtime을 우선 사용했습니다. platform 운영 복잡도를 불필요하게 늘리지 않되, application의 실행·설정·상태 경계는 분리해 이후 runtime 선택이 제품 코드 전체를 흔들지 않도록 운영합니다.

### Role And Scope

- 회사 전체 서비스 Azure infrastructure의 설계·구축·운영 전담
- B2B/B2C·Shared/STG/Prod resource boundary와 deploy/runbook 관리
- Terraform root·remote state·drift audit·apply gate 운영
- VM log collection과 Production alert를 포함한 observability 구성
- 모든 Azure resource를 최초부터 단독 생성했다는 의미는 아님

### System Invariant

> 한 사람이 관리하더라도 특정 사람의 기억이 아니라 state, plan, live inventory, runbook으로 변경 이유와 영향 범위를 복원할 수 있어야 한다.

### Infrastructure Landscape 시각화

```text
Company Azure
├─ Shared                       ─┐
├─ B2B                           │
│  ├─ STG                        ├─ 6 Terraform roots
│  └─ Prod                       │  6 remote states
└─ B2C                           │  400+ state objects
   ├─ Shared                     │
   ├─ STG                        │
   └─ Prod                      ─┘
```

### Change Harness 시각화

```text
변경 요청
   ↓
대상 제품·환경·blast radius 식별
   ↓
AI-assisted inventory · Terraform implementation
   ↓
state snapshot → fmt/validate → Terraform plan
   ↓
Azure CLI live inventory 대조
   ↓
destroy · replace · logging/health removal 판정
   ↓
Human apply gate
   ↓
health · log · alert 확인
   ↓
runbook · code · state 갱신
```

### Managed Runtime Decision

| 판단 기준 | 현재 선택 | 재검토 trigger 초안 |
| --- | --- | --- |
| Workload complexity | App Service·VM·managed service로 충족 | scheduling·network policy·workload control 요구 증가 |
| 운영 인력 | managed platform으로 부담 최소화 | 전담 platform 운영 역량 확보 |
| 배포 경계 | 제품별 독립 배포 | cluster 단위 배포 정책의 필요 증가 |
| 확장 | Azure managed scaling | 세밀한 scheduling·resource control 필요 |
| runtime 선택 | 실행·설정·상태 경계 분리 | 현재 managed runtime의 제약이 제품 요구를 막을 때 재검토 |

특정 platform을 쓰지 않는 사실을 전문성 부족이나 기술 배제로 표현하지 않는다. 현재 복잡도에 맞는 managed runtime 선택이며, 공식 대안 검토 기록과 portability 근거가 확인된 범위까지만 공개한다.

### Failure Walkthrough

| Trigger | 깨질 수 있는 상태 | Control |
| --- | --- | --- |
| Wrong root/state | 다른 제품·환경 변경 전파 | 6개 root·remote state boundary |
| Forced replacement | 운영 DB·resource 비의도 재생성 | state·plan·live inventory 교차 검증, apply 중단 |
| Live drift | import 과정에서 logging·health 제거 | live setting을 code에 보존한 뒤 재검증 |
| Blind operation | 서비스는 실행되지만 장애 신호 미관측 | AMA/DCR, Log Analytics, Production alerts |

### Proof

| 구분 | 공개 초안 |
| --- | --- |
| State | 6개 독립 root·remote state, 400+ state object |
| Safety | 의도하지 않은 destroy·replace를 apply 전에 차단 |
| Reconciliation | 기존 resource 편입을 0 add / 0 destroy 조건으로 검증 |
| Observability | 10대 VM container log 중앙화, 8개 Production alert |

### Internal Guardrails (public 미노출)

- 모든 Azure resource가 Terraform으로 완전 관리되거나 drift가 0건이라고 주장하지 않는다.
- 완전 자동 apply가 아니라 human gate를 유지한다.
- observability 구축은 확인됐지만 가용성·MTTR·장애율 개선 수치는 없다.
- `실행 환경만 교체 가능`은 stateless/container/config/state/health contract가 검증된 뒤에만 사용한다.

### Claim 상태

- 기존 사용 가능: `infra.company-azure-ownership`, `infra.terraform-state-safety`, `infra.azure-observability`, `centurion.shared-infra`
- 승격 필요: `AI-assisted infrastructure harness`, managed runtime 선택의 실제 decision·implementation 범위

## 8. Case 04 — Memento Payment

### 제목

> Stripe 선결제에서 예약 실패와 비동기 환불을 보상 흐름과 완료 상태로 분리했습니다.

### Executive Summary

예약 DB와 외부 결제 provider가 하나의 transaction이 될 수 없는 조건에서 Stripe Checkout 기반 manual-capture 선결제를 구축했습니다. local transaction ID로 결제 이력과 provider event를 연결하고, 예약 처리 실패 시 PaymentIntent 상태에 따라 cancel 또는 refund하는 보상 흐름을 추가했습니다.

환불은 요청과 완료를 분리하고 마일리지 복원·티켓 삭제를 실제 환불 완료 transition으로 이동했습니다.

### Role And Scope

- Stripe Checkout·manual-capture module과 선결제 연결: Lead
- 공유 payment domain의 환불·마일리지·티켓 상태 순서 안정화: Contributor
- 결제 시스템 전체 ownership이나 production 운영 전담은 주장하지 않음

### System Invariant

> 예약 처리 실패가 이미 만들어진 provider 결제를 방치하지 않고, 환불 완료 전에는 마일리지와 티켓 상태를 먼저 확정하지 않는다.

### Payment Flow 시각화

```text
[Local PaymentHistory]
 local transaction ID
        ↓ metadata
[Stripe Checkout / PaymentIntent]
 manual capture
        ↓
[Booking]
   ├─ success ──> capture
   └─ failure
       ├─ requires_capture ──> cancel
       └─ succeeded ─────────> refund
```

### Refund Flow 시각화

```text
Refund request
      ↓
Provider async processing
      ↓ webhook
Refund completion transition
      ↓
Mileage restore · Ticket delete
```

### Failure Walkthrough

| Trigger | 깨질 수 있는 상태 | Control |
| --- | --- | --- |
| Booking failure | 예약 없이 provider 결제 상태 잔존 | state별 cancel/refund compensation |
| Refund pending | 티켓·마일리지가 provider보다 먼저 변경 | 완료 transition 뒤 업무 상태 변경 |
| Zero/full-mileage | 존재하지 않는 provider 결제 조회 | payment path 분기 |
| Webhook ambiguity | 원 결제와 mileage 결제 혼동 | transaction metadata와 payment type |

### Internal Guardrails (public 미노출)

- DB와 provider 결제의 atomic transaction·완전한 rollback을 보장하지 않는다.
- webhook event dedup·reconciliation이 확인되지 않아 exactly-once를 주장하지 않는다.
- production 장애율·중복 결제 감소 수치는 없다.

### Claim 상태

- 사용 가능: `career.memento-stripe-prepayment`, `career.memento-payment`

## 9. Supporting Case — Engineering System

### 제목

> FastAPI 표준 template과 사람·agent가 공유하는 개발·검증·release 체계를 구축했습니다.

### 역할

대표 backend case와 경쟁하지 않는 supporting case로 둔다. `코드가 시작되는 기준`과 `결정이 release되는 기준`을 한 페이지에서 연결한다.

```text
CODE START
FastAPI template
layered architecture · DI · transaction · error contract
ADR · convention · runbook · agent context
        ↓
DELIVERY
Decision → SPEC → Work Package → BE/FE/QA → Release gate
```

### Claim Boundary

- Backend Template 직접 설계·구축은 `owned`
- 제품별 decision→release 적용·운영은 `led`
- MEDINESS 제품 요구·운영 흐름 설계 참여는 `contributed`
- daily briefing 직접 구축은 재검증 전 제외

## 10. Supporting Background — Product/UX

### 제목

> UX consulting과 제품 분석을 통해 사용자 문제를 개선안과 화면 설계로 구체화했습니다.

### 역할

- primary engineering case가 아니라 문제 정의 방식의 배경으로 둔다.
- 운영 서비스 UX consulting: 사용자 흐름의 문제 정의, badge·push 중심 가설, Figma 화면안
- UX study: Speak 추천 흐름 개선안, YouTube Music UX 원리 분석
- product outcome: 복수 개선이 함께 반영된 뒤 공유받은 App Store 9위→5위, DAU 기존 대비 200% 수준 결과에 대한 공동 기여

## 11. 공개 표현 가드레일

### 사용하지 않을 표현

- `Thready를 0부터 혼자 만들었다`
- `내가 월 1,000만원 매출을 만들었다`
- `10만 건 전체를 AI로 분석했다`
- `Centurion 전체 MSA를 설계·구축했다`
- `모든 Azure resource를 처음부터 단독 구축했다`
- `어떤 실행 환경으로도 즉시 이전할 수 있다`
- `DB와 provider 결제를 atomic transaction으로 보장했다`
- `exactly-once`, `데이터 유실 0건`, `무중단`, `가용성 99.9%` 등 미검증 보장

### 선호 표현

- 역할은 `owned`, `led`, `co-led`, `contributed`에 맞춰 문장에 드러낸다.
- product outcome과 개인 기여는 같은 문단에 두되 직접 인과로 결합하지 않는다.
- 기술 선택은 `왜 필요했는가`, `무엇을 포기했는가`, `언제 다시 검토할 것인가`로 설명한다.
- 수치는 측정 단위·시점·환경을 함께 적는다.
- 성능·안정성 수치가 없으면 실제 failure state와 verification mechanism으로 깊이를 보여준다.

## 12. 당시 라우트 계획 (superseded)

V2가 제안한 route 이름과 primary/supporting 구분은 더 이상 유효하지 않다. 현재 공개 master는 `/portfolio` 단일 문서이고, 직접 링크 호환용 case slug와 navigation 범위는 `app/fe/lib/cases.ts`의 `CASES`·`NAVIGABLE_CASES`를 따른다. 새 route를 만들거나 redirect를 판단할 때 이 V2 표를 복원하지 않는다.

## 13. 구현 전 확인할 항목

1. Thready 고객 불편을 실제 사용자 표현에 가까운 한 문장으로 확정
2. Thready에서 직접 소유한 제품 판단·frontend·design·acquisition 범위 확정
3. `제품 0→1 전반 주도`와 `매출 상당 기여` stable claim 승격
4. Infrastructure에서 AI가 수행한 inventory·Terraform implementation·review·runbook 범위 확정
5. App Service 선택 당시의 실제 판단 근거와 container/stateless/config/state/health portability 검증
6. 공개 가능한 architecture abstraction과 비공개 resource detail 분리
7. 각 diagram을 실제 코드·state·runbook과 대조한 뒤 공개 구현

## 14. 완료 기준

- 홈에서 10초 안에 `제품 0→1`, `분산 backend`, `회사 infra`, `결제 정합성` 네 축이 보인다.
- 각 케이스에서 30초 안에 문제, 개인 역할, 대표 mechanism, proof, limit를 찾을 수 있다.
- 기술 스택을 지워도 engineering judgement가 남는다.
- AI 활용을 지워도 architecture와 verification ownership이 남고, AI를 추가하면 execution leverage가 설명된다.
- 공개 문구가 stable claim과 contribution boundary를 넘지 않는다.
