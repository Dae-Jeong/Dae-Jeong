---
type: product-spec
title: Portfolio V3 Content Specification
description: 한국 경력 backend portfolio의 빠른 스캔 구조와 case별 기술 깊이를 결합한 구현 명세.
timestamp: 2026-08-20
status: implemented
depends_on:
  - products/portfolio/README.md
  - products/portfolio/v2-content-draft.md
  - products/portfolio/cases/README.md
  - evidence/claims/
tags: [portfolio, content, senior-backend, korean-reference, implemented]
---

# Portfolio V3 Content Specification

> Implemented in `app/fe/app/portfolio/` and `app/fe/lib/cases.ts` on 2026-08-20. 이 문서는 구현된 정보 구조와 copy boundary의 설계 기록으로 유지한다.

## 1. 한 줄 결정

`/portfolio` 단일 페이지와 네 대표 사례는 유지한다. 대신 모든 사례를 같은 dossier 문법으로 반복하지 않고, **결과를 먼저 보여준 뒤 사례마다 가장 강한 기술 판단 하나를 다른 시각화로 증명**한다.

```text
10초  현재 역할과 대표 결과
30초  네 사례의 범위·기여·대표 기술 판단
정독  선택 이유·실패 경계·검증 방식
```

이 개편의 목표는 내용을 더 추가하는 것이 아니다. 현재 V2에 이미 있는 근거를 독자가 판단하는 순서에 맞게 다시 배치하는 것이다.

## 2. 한국 경력자 reference에서 가져올 기준

Checked: 2026-08-20

| Reference | 실제 표현 방식 | 이 포트폴리오에 적용할 점 |
| --- | --- | --- |
| [유지아 Backend Portfolio](https://jia-yoo.github.io/) | 첫 화면에 운영 규모와 개선 수치를 두고, Experience에서 기술 조치와 결과를 연결 | Hero와 case opener에서 결과·규모를 먼저 제시 |
| [최현빈 Backend Engineer Resume](https://resume.hyunbin.me/resume.pdf) | 프로젝트 맥락·역할·기술 변화·사업 결과를 짧은 단위로 연결 | 기술 이름보다 역할과 실제 변화가 먼저 보이게 구성 |
| [Jbee Brand](https://jbee.io/brand) | 이력서와 발표·글·커뮤니티 활동을 분리해 공개 output으로 전문성을 보강 | Product/UX·외부 활동은 대표 backend case와 경쟁시키지 않고 별도 증거로 배치 |
| [손지호 Backend Portfolio](https://balsohn.github.io/) | architecture·performance·data modeling을 상세히 보여주지만 한 페이지의 정보량이 큼 | 깊이는 유지하되 모든 프로젝트에 같은 상세 항목을 반복하지 않음 |

이번 공개 reference에서 경력 backend의 강한 표현은 별도의 화려한 portfolio보다 **경력기술서형 스캔 구조에 기술 판단과 사업·운영 결과를 결합하는 방식**에 가까웠다.

## 3. V2에서 유지할 것과 바꿀 것

### 유지

- `/portfolio` 한 route에서 전체 사례 확인
- `Tech Lead · Backend Engineer` 역할 순서
- Thready → Centurion → Infrastructure → Backend Template 순서
- claim registry와 case library가 표현 상한을 소유하는 구조
- PDF 변환 가능한 document layout

### 변경

- 네 case에 반복되는 `Role/Scope/Stack/Status` 4칸 표 제거
- 네 case에 반복되는 검은 `설계 원칙` block 제거
- 모든 case에 같은 `Problem / Failure / Decisions / Flow / Evidence` section을 강제하지 않음
- 기술 stack은 case의 주인공이 아니라 mechanism 설명이나 문서 하단 index로 이동
- 같은 수치를 opener·proof·evidence에서 반복하지 않음
- Thready의 제품 0→1과 business outcome을 가장 먼저, 가장 넓게 설명
- Centurion은 MSA 전체 ownership이 아니라 service별 기여 범위와 failure boundary로 설명
- Infrastructure는 Terraform 사용 경험이 아니라 한 사람이 회사 인프라를 운영한 설계·변경 process로 설명
- Backend Template은 단순 폴더 구조가 아니라 반복되는 backend 판단과 사람·agent의 실행 기준을 조직 표준으로 만든 경험으로 확장
- Memento Payment와 Product Operations는 supporting case로 압축하되 결제 상태 전이와 Decision→release 판단은 선명하게 유지

## 4. 전체 페이지 구조

### 4.1 Hero

#### Eyeline

```text
Tech Lead · Backend Engineer · 실무 4년차
```

#### Headline

> 아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.

#### Introduction

> 고객의 문제를 제품 범위와 품질 기준으로 좁히고, 백엔드·AI·핵심 화면을 직접 만들어 배포와 운영까지 맡아왔습니다.

#### First proof lines

```text
제품             기획·QA·마케팅과 제품 운영을 리드하고, backend·AI·핵심 frontend를 직접 구현
백엔드·AI        병렬 재구축·STG migration·Outbox·worker·realtime session의 실패 경계 설계
플랫폼·실행 체계  회사 Azure 변경 통제와 조직 표준 FastAPI template 설계·구축
```

`월 매출`은 제품·팀 outcome으로 표기하고, 개인 단독 인과로 연결하지 않는다.

### 4.2 Case index

목차는 프로젝트명과 기술 키워드가 아니라 독자가 얻게 될 판단 근거를 보여준다.

| Case | 한 줄 요약 | 바로 보일 proof |
| --- | --- | --- |
| 01 Thready | 기획·QA·마케팅과 제품 운영을 리드하고 핵심 제품 흐름을 직접 개발 | 구독료 매출·full-stack 구축·AI 서비스 분리 |
| 02 Centurion | 서비스마다 다른 실패 방식에 맞춰 복구 방법을 분리 | 비동기 작업·실시간 상담·기여 범위 |
| 03 Company Infrastructure | 제품·환경별 runtime을 나누고 배포·관측은 공통 운영면으로 구성 | B2B/B2C topology·6 state·log/alert |
| 04 Backend Template | 반복되는 backend 판단을 사람과 AI가 공유하는 조직 표준으로 구성 | layered core·명시적 option·agent context·automation |

## 5. Case 01 — Thready

### 공개 제목

> Thready 제품 운영을 리드하며 백엔드와 AI, 핵심 프런트엔드를 직접 개발했습니다.

### Opener

> 콘텐츠를 꾸준히 만들어도 어떤 글이 잘되는지 알기 어렵다는 고객의 말에서 시작했습니다. 기획·QA·마케팅과 함께 제품 운영을 이끌며 기능·실험 우선순위와 품질 기준을 정했습니다. 바이브 코딩으로 빠르게 만든 초기 FastAPI backend는 팀이 이해하고 운영할 수 있는 구조로 다시 만들고, Next.js의 콘텐츠 생성·가져오기·예약·발행·관리 흐름과 AI 실행 서비스까지 직접 개발했습니다. 제품은 2026년 8월 기준 월 약 800만~1,000만원의 구독료 매출이 발생하고 있습니다.

### Responsibility map

| 구분 | 범위 |
| --- | --- |
| 리드 | cross-functional 제품 운영·관리, 고객 문제 구체화, 기능·실험 우선순위, 품질·QA·release 기준 |
| 직접 담당 | backend architecture·구현, Next.js 핵심 workflow, data·AI boundary, 배포·운영 |
| 협업 | 기획, QA, 마케팅, design |
| 결과 표현 | 제품·팀 outcome에 상당 부분 기여. 개인 단독 매출 인과는 주장하지 않음 |

### 첫 번째 시각화 — 문제에서 구독까지

```text
콘텐츠 제작·성과 판단의 불편
        ↓
시장 관측과 제품 요구 정의
        ↓
생성·평가 workflow
        ↓
Next.js frontend · FastAPI backend · data · AI execution
        ↓
QA · release · production operation
        ↓
실제 사용자 구독
```

이 그림은 매출의 단독 인과를 주장하는 funnel이 아니라, 직접 책임진 범위와 팀 outcome이 만나는 지점을 보여준다.

### Deep dive A — AI로 빨리 만들되, 먼저 검증 가능하게 만들기

**상황**  초기 backend는 빠른 검증에는 충분했지만 기능이 늘수록 domain 의존성과 회귀 위험이 커짐.

**판단**  부분 수정으로 구조를 계속 연장하는 대신, 기존 API와 기능을 먼저 목록화하고 동작 검증 harness를 구성했습니다. Frontend contract는 유지한 채 backend만 parallel rebuild했고, AI는 codebase 파악과 반복 구현에 활용했습니다. Architecture·scope·cutover는 직접 결정했습니다.

**결과**  기존 동작과 API contract를 validation harness로 먼저 고정한 뒤 교체했습니다. Cutover 전후 같은 집계 기준에서 해결된 QA issue의 reopen 비율은 26%p 낮아졌고, 이후 release와 운영을 계속 맡았습니다.

**보여줄 시각화**

```text
기존 FE contract ───────────────┐
                               ├─ validation harness ── cutover gate
기존 backend → feature inventory│
신규 FastAPI backend ───────────┘
```

### Deep dive B — 제품 원장과 AI 실행 상태 분리

**상황**  생성 lifecycle이 커지면서 제품 정책·원장과 AI 실행 상태를 한 application·DB에서 계속 다루기 어려워짐.

**판단**  product backend는 정책과 owner mutation을, AI application은 생성 lifecycle과 trace를 소유. 변경 전달은 owner mutation과 같은 transaction의 Outbox로 기록.

**복구 경계**  relay retry, lease 재점유, delivery version·attempt fencing, idempotent consumer, terminal failure 보존.

**검증**  STG 생성 이력 2,616건·품질 snapshot 795건·실행 추적 7,111건 migration. local rehearsal, row count, MD5 fingerprint, FK orphan, API E2E로 확인.

### 보조 proof — 실측 데이터를 생성 기준으로 바꾸기

- 한국어 본문 111,091건·작성자 이어쓰기 185,475건의 labeling workflow 구축
- typed batch validation, `(source, source_key)` upsert, continuation replace 기반 멱등 importer
- 별도 20,256건 hook-quality 분석의 8축 rubric을 writer prompt·실험용 LLM judge에 반영
- 대규모 corpus 제품화와 rubric experiment는 서로 다른 근거로 분리

### 이 case에서 읽혀야 할 결론

> 제품을 0→1로 만드는 과정과 backend를 오래 운영할 수 있게 만드는 과정을 따로 보지 않습니다. 다만 business outcome은 팀의 결과로, architecture와 delivery는 직접 맡은 범위로 구분해 설명합니다.

## 6. Case 02 — Centurion

### 공개 제목

> 서비스마다 실패하는 방식이 달라, 복구 방식도 따로 설계했습니다.

### Opener

> 예약·주문·재고처럼 상태를 저장하는 업무, 실패 후 다시 실행해야 하는 작업, 연결 상태가 계속 바뀌는 실시간 상담이 같은 제품군 안에 있었습니다. MSA라는 이름보다 각 service가 어떤 상태를 소유하고, 실패했을 때 어디에서 멈추고 복구하는지를 기준으로 backend를 구축·연동했습니다.

### 첫 번째 시각화 — platform과 나의 기여 범위

```text
                 [Express API Gateway]
                          │
                     [NestJS SSO]
                          │
       ┌──────────────────┼──────────────────┐
       ↓                  ↓                  ↓
[DAY / CRM]        [Order / Stock]     [Realtime AI]
 Product flow           Lead              Co-lead
BE·FE·QA·release    Rabbit / TaskIQ      WebSocket
       │
       └──────── [Facility / Inventory Integration]
                         Contributor
```

### Contribution table

| Service context | 기여 | 대표 판단 |
| --- | --- | --- |
| 주문·재고 | 구축 주도 | API 응답과 실패 가능한 작업을 분리하고 상태·retry·terminal failure·수동 재처리 경계 구성 |
| 실시간 AI 상담 | 공동 주 기여 | session lifecycle과 STT/LLM provider adapter 분리, duplicate event·reconnect guard |
| DAY 예약 정책 | 연결 주도 | backend 판단을 frontend·QA·release가 같은 기준으로 소비 |
| 시설·재고·공통 인증 | 주요 기능 기여 | 외부 publish 실패를 핵심 업무 transaction과 분리, multi-service session 정책 기여 |

### 한 가지를 깊게 — 주문·재고 비동기 작업

```text
API transaction
      ↓ commit
RabbitMQ message
      ↓
TaskIQ worker
  ├─ SUCCESS
  ├─ retryable failure → retry
  └─ terminal failure  → 기록 · 수동 재처리
```

async FastAPI 실행 모델에 맞춰 Celery 기반 처리를 TaskIQ·RabbitMQ로 전환하고, 작업 상태와 복구 책임을 명시했다. 시설·재고 연동은 외부 publish 실패가 시술 완료 transaction을 되돌리지 않도록 실행 경계를 분리했다.

### 보조 판단 — 실시간 session

WebSocket의 reconnect·중복 event·늦게 끝난 task가 현재 turn을 덮지 않도록 cancellation·debounce·retry·turn-state guard를 적용했다. 전체 플랫폼 ownership이 아니라 realtime session cluster의 공동 주 기여로 표현한다.

### 이 case에서 읽혀야 할 결론

> 여러 서비스를 경험했다는 사실보다, sync·async·realtime workload를 같은 방식으로 처리하지 않았다는 판단을 보여줍니다.

## 7. Case 03 — Company Infrastructure

### 공개 제목

> 제품군·환경별 Azure 실행 경계를 통합 관리하고, 배포와 관측 기준을 공통화했습니다.

### Opener

> 회사 Azure 운영을 맡아 기존 Shared·B2B·B2C 리소스를 제품군·환경별 root/state로 통합하고 현재 운영 구조와 변경 체계를 관리합니다. 공통 이미지는 Shared ACR에서 공급하되 runtime·data·state는 나누고, 로그와 운영 신호는 환경별 Azure Monitor·Log Analytics에서 같은 기준으로 봅니다.

### 핵심 시각화 — current runtime topology

```text
Shared ACR
   ├─> B2B / Centurion
   │     App Service Gateway → environment VNet
   │     → VM Docker workloads + managed MySQL/PostgreSQL
   │     → environment boundary의 Storage (VNet 밖)
   └─> B2C Product Apps
         Thready API·AI App Services + other App Service/VM workloads
         → managed PostgreSQL/Media Storage

Azure Monitor operations boundary
   ├─ 환경별 Log Analytics workspace ← App diagnostics · 10 VM container-log sources
   └─ Production metric alerts 8개 ← App Service · VM · DB platform metrics

Azure 실행 경계 밖 Terraform control plane
   Shared | B2B STG | B2B Prod | B2C Shared | B2C STG | B2C Prod
   6 independent roots / 400+ state objects
   별도 project IaC는 core monorepo 밖에서 관리
```

이 시각화는 현재 운영 구조만 표현한다. Hub-Spoke·Azure Container Apps·Tailscale·Key Vault consolidation·GitHub OIDC 등 target proposal은 포함하지 않는다.
서비스 노드는 Microsoft 공식 Azure architecture icon을 색·비율·방향 변경 없이 사용하고 공식 제품명을 가까이 표기한다. AWS diagram은 cloud/workload/control-plane grouping 문법만 참고하며 provider icon과 색은 섞지 않는다. Source: https://learn.microsoft.com/en-us/azure/architecture/icons/ (checked 2026-08-20)

### 두 번째 시각화 — AI-assisted change harness

```text
변경 요청
   ↓
대상 제품·환경·blast radius 식별
   ↓
AI-assisted inventory · Terraform draft
   ↓
state snapshot → fmt / validate → plan
   ↓
Azure live inventory 대조
   ↓
destroy · replace · drift 판정
   ↓
human apply gate
   ↓
health · log · alert 확인
   ↓
code · state · runbook 갱신
```

### 실제 운영 proof

| 범위 | 현재 근거 |
| --- | --- |
| State boundary | 6개 독립 root·remote state, 400+ state object |
| Drift safety | region 불일치 강제 교체와 log·health setting 제거 위험을 apply 전에 확인 |
| Observability | 10대 VM container log 중앙화, 8개 Production alert |
| Runtime 판단 | 현재 workload·팀 규모에 맞는 Azure managed runtime으로 platform 운영 부담 제한 |

### 이 case에서 읽혀야 할 결론

> 폴더를 나눴다는 얘기가 아니라, workload별 runtime·data 경계와 공통 배포·관측면을 구성하고 그 전체의 변경 범위를 한 사람이 통제한 경험입니다.

특정 platform을 도입하지 않은 사실은 본문 주제로 삼지 않는다. 현재 workload와 운영 인력에 맞는 managed runtime 선택만 설명한다.

## 8. Case 04 — Backend Template

### 공개 제목

> 반복되는 백엔드 판단을 사람과 AI가 공유하는 조직 표준으로 만들었습니다.

### Opener

> 백엔드 2~3명이 여러 제품을 맡는 환경에서 새 프로젝트마다 architecture·DI·transaction·error contract와 agent context를 다시 정하고 있었습니다. 반복되는 core는 FastAPI template로 고정하고, 제품마다 다른 tenancy·ID·authentication·storage는 명시적인 option으로 남겼습니다.

### 세 가지 경계

```text
Stable Core
Router → Service → Repository
DI · transaction · error contract · contract test · Pyright
             ↓
Explicit Options
tenancy · ID · authentication · storage
             ↓
Shared Execution
ADR · convention · runbook · agent context · automation skill
```

- 반복되는 architecture와 contract는 실행 가능한 시작점으로 고정
- 제품별 차이는 generic framework 안에 숨기지 않고 option과 생성 workflow로 노출
- 사람과 agent가 같은 ADR·convention·runbook·context routing을 읽고 작업하도록 구성
- template adoption project 수와 초기 setup 시간 절감은 측정하지 않아 설계·구축 범위까지만 표현

### 이 case에서 읽혀야 할 결론

> 폴더 구조를 만든 경험이 아니라, 소수 인원이 여러 제품을 전환하며 일할 때 반복되는 backend 판단과 실행 맥락을 공유 가능한 시스템으로 만든 경험입니다.

## 9. Supporting cases

### 9.1 Memento Payment — 외부 결제 상태 전이

> Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름을 구축했습니다. 예약 결과와 provider 상태가 어긋날 수 있다는 전제에서 cancel·refund와 환불 완료 뒤 mileage 복원·ticket 삭제 순서를 분리했습니다.

```text
Checkout / PaymentIntent
        ↓
Booking result
  ├─ success → capture
  └─ failure → cancel or refund
                         ↓
              webhook completion
                         ↓
           mileage restore · ticket delete
```

- Stripe Checkout·manual capture·provider-side cancel/refund 영역 구축 주도
- DB와 provider의 atomic rollback이나 exactly-once를 보장했다고 표현하지 않음

### 9.2 Product Operations — Decision에서 release까지

> 서비스 구현 담당자와 제품 요구·운영 흐름을 구체화하고, 제품 결정을 Decision·SPEC·Work Package로 나눠 BE·FE·QA 작업과 승인 상태, release gate에 연결해 운영했습니다.

```text
Decision → SPEC → Work Package → BE · FE · QA → approval → release gate
```

- MEDINESS 제품 요구·운영 흐름 설계는 `contributed`
- 제품별 decision→release 적용·일정·이슈·릴리스 운영은 `led`
- 서비스 직접 구현이나 architecture 최초 설계 주도로 확대하지 않음

외부 UX 활동은 common resume의 독립 섹션이 소유하며, public portfolio supporting case와 섞지 않는다.

## 10. 페이지의 시각화 원칙

| Case | 주 시각화 | 피할 표현 |
| --- | --- | --- |
| Thready | problem→product loop + rebuild/AI boundary | 큰 매출 숫자만 강조한 hero metric card |
| Centurion | service map + contribution label | 전체 MSA를 단독 소유한 것처럼 보이는 통합 diagram |
| Infrastructure | current runtime topology + state/change gate | 폴더 tree나 Terraform resource 목록만 제시 |
| Backend Template | stable core·explicit option·shared execution | 폴더 tree나 추상적인 생산성 선언 |

- 네 primary case가 같은 card·table·4-step flow를 반복하지 않는다. Memento Payment와 Product Operations는 compact supporting section으로 읽힌다.
- visual은 decoration이 아니라 ownership·state change·failure boundary 중 하나를 설명해야 한다.
- 기술 stack은 각 case 하단의 짧은 line 또는 페이지 끝 index로 모은다.
- 웹은 한 route에서 전부 읽고, 인쇄할 때만 case boundary를 기준으로 자연스럽게 page break한다.
- 개별 route는 직접 링크 호환용으로 남기되 기본 탐색 경로에서는 강조하지 않는다.

## 11. 현재 V2에서 실제로 덜어낼 항목

1. 모든 case의 `설계 원칙` black band
2. 모든 case의 `Role / Scope / Stack / Status` 4-column block
3. 모든 case에 반복되는 `왜 이 문제를 풀었는가` 제목
4. 모든 case에 반복되는 3-row failure table
5. summary와 같은 사실을 다시 말하는 evidence card
6. `Lead`, `Owner`, `Production` 같은 label만 있고 실제 범위가 없는 meta
7. case마다 동일한 네 칸 system flow

대신 다음만 남긴다.

- case opener: 맥락·역할·결과
- contribution boundary
- 그 case를 대표하는 기술 판단 하나
- 그 판단을 설명하는 고유한 visual 하나
- 검증 가능한 proof

## 12. 구현 mapping

이 문서는 구현된 content·IA의 설계 기록이다. 현재 공개 문장·순서·강조의 SoT는 `app/fe/app/portfolio/`와 `app/fe/lib/cases.ts`다.

| 구현 지점 | 현재 역할 |
| --- | --- |
| `case-dossier.tsx` | Thready·Centurion·Infrastructure·Backend Template별 composition을 차등 렌더링 |
| `cases.ts` | primary/supporting/archive tier와 index용 title·blurb·proof를 소유 |
| `portfolio/page.tsx` | 공통 hero·primary 순서·Memento/Product Operations supporting section을 조립 |
| print style | case 내용 길이에 따라 break하되 heading·diagram 내부 분할 방지 |

active expression은 `app/fe/app/portfolio/`와 `app/fe/lib/cases.ts`가 소유한다. 이 문서는 그 표현의 claim boundary와 정보 구조를 설명하며 앱보다 앞서 문안을 소유하지 않는다.

## 13. 완료 기준

- 첫 화면에서 `Tech Lead · Backend Engineer`, 제품 0→1, backend, infrastructure 경험이 10초 안에 구분됨
- 목차만 읽어도 네 case가 서로 다른 역량을 증명함
- Thready에서 제품 기여와 backend 전문성이 어느 한쪽에 묻히지 않음
- Centurion에서 MSA 경험과 service별 기여 강도가 동시에 보임
- Infrastructure에서 Terraform 도구 사용보다 설계·변경 통제·1인 운영 능력이 먼저 읽힘
- Backend Template에서 폴더 구조보다 stable core·product option·shared agent context를 설계한 이유가 먼저 읽힘
- Memento Payment와 Product Operations가 primary와 경쟁하지 않으면서 결제 상태 전이와 Decision→release 운영을 보완함
- 같은 section 제목·표·card 구조가 네 번 반복되지 않음
- single route와 PDF 변환 가능성 유지
- public copy가 stable claim과 ownership boundary를 넘지 않음
