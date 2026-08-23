---
type: product-spec
title: Portfolio V3 Content Specification
description: 제품 0→1, 회사 AX 전환 설계, MSA failure boundary를 한 문서에서 검증하는 구현 명세.
timestamp: 2026-08-23
status: implemented
depends_on:
  - products/portfolio/README.md
  - products/portfolio/cases/README.md
  - evidence/claims/
tags: [portfolio, content, tech-lead, company-ax, backend, implemented]
---

# Portfolio V3 Content Specification

> Implemented in `app/fe/app/portfolio/` and `app/fe/lib/cases.ts`. 이 문서는 구현된 정보 구조와 copy boundary의 설계 기록이며, 현재 공개 문장·순서·강조의 SoT는 앱 코드다.

## 1. 한 줄 결정

`/portfolio` 한 route에서 세 대표 사례와 Memento Payment supporting case를 모두 펼친다. 같은 dossier 문법을 반복하지 않고, 사례마다 독자가 확인해야 할 판단과 책임 경계를 다른 시각화로 보여준다.

```text
10초  Maker 정체성 · Tech Lead/Backend 역할 · 세 대표 범위
30초  제품 0→1 · 회사 AX · MSA의 기여와 결과
정독  선택 이유 · ownership · failure/human gate · 검증 방식
```

## 2. 공개 정보 구조

### Hero

- Eyeline: `Tech Lead · Backend Engineer · 실무 4년차`
- Headline: `아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.`
- Introduction: 고객 문제를 제품으로 만들고 backend·AI·핵심 frontend·배포·운영까지 맡아온 범위, 그리고 결정·작업·검증을 회사 업무까지 잇는 AX 구조 설계 참여를 연결한다.

### First proof lines

```text
제품          기획·QA·마케팅과 제품 운영 리드 · backend/AI/핵심 frontend 직접 구현
백엔드·AI    병렬 재구축 · migration · Outbox · worker · realtime failure boundary
회사 AX      제품 흐름 운영 · 의사결정/회의/업무 배정/승인/후속 작업 확장 설계 참여
```

### Primary order

| No | Case | 먼저 읽힐 판단 | 대표 proof |
| --- | --- | --- | --- |
| 01 | Thready | 고객 문제를 제품·기술·운영으로 닫은 방식 | 제품 운영 리드·직접 구현·구독료 매출 |
| 02 | Company AX | 제품 개발과 회사 업무를 같은 실행 맥락으로 잇되 사람의 판단을 남긴 방식 | 제품 workflow 운영·회사 업무 AX 설계 참여·Backend Template 직접 구축 |
| 03 | Centurion | sync·async·realtime workload를 같은 방식으로 다루지 않은 판단 | service별 기여·비동기 복구·실시간 session |

### Supporting

- Memento Payment: Stripe 선결제부터 Webhook·취소·환불까지 외부 결제 상태 전이
- Product Operations는 별도 supporting case로 반복하지 않고 Company AX primary case 안에서 현재 운영 근거로 사용한다.
- 외부 UX 활동은 common resume의 독립 섹션이 소유한다.

## 3. Case 01 — Thready

### 공개 제목

> 고객 문제를 팀과 함께 유료 제품으로 만들고, 계속 운영할 백엔드는 직접 다시 설계했습니다.

### 책임과 결과

| 구분 | 범위 |
| --- | --- |
| 리드 | cross-functional 제품 운영·관리, 기능·실험 우선순위, 품질·QA·release 기준 |
| 직접 담당 | FastAPI backend, Next.js 핵심 workflow, data·AI boundary, 배포·운영 |
| 협업 | 기획, QA, 마케팅, design |
| 결과 | 2026년 8월 기준 제품의 월 약 800만~1,000만원 구독료 매출 |

### 본문 순서와 고유 시각화

- 고객 문제 → 기획·QA·마케팅과 유료 제품 운영 → 실제 product/runtime/delivery architecture
- 빠른 기능 검증 중심의 초기 backend 인계 → validation harness → FastAPI 병렬 재구축·cutover
- product backend·AI application/DB·Transactional Outbox의 ownership과 전달 경계는 4단계 ruled flow로 확대 → STG 데이터 이전 검증

사례는 기술적으로 가장 깊은 BE–AI 경계와 STG migration 검증으로 끝낸다. AI는 코드 분석·반복 구현에 활용하고, 아키텍처·검증 기준·작업 범위·cutover 시점은 직접 판단한 범위로 쓴다.

### 표현 상한

매출은 제품·팀 outcome이다. 개인 단독 매출 인과, 36시간, HTTP 5xx 0.3%, Prod migration 완료, exactly-once는 주장하지 않는다.

## 4. Case 02 — Company AX

Route compatibility를 위해 slug는 `be-template`을 유지하지만, 공개 case는 Backend Template 단독 설명보다 상위인 회사 AX 전환 이야기다.

### 공개 제목

> 제품 개발과 회사 업무를 같은 실행 맥락으로 잇는 AX 전환 구조 설계에 참여했습니다.

### 현재와 확장 설계

```text
현재 제품 운영 — 실선
요청·기획·디자인 → Decision·SPEC → Work Package → BE·FE·QA
                 → Release Gate → Git·CI/CD → Azure·Vercel

회사 업무 AX 확장 설계 — 점선
회의·요청 ⇢ 의사결정 ⇢ 업무 배정 ⇢ 승인 ⇢ 후속 작업
```

- 실선: 제품별 Decision→release 적용·운영은 현재 범위다.
- 점선: 의사결정·회의·업무 배정·승인·후속 작업은 회사 업무 AX 확장 설계 범위다.
- Agent: 필요한 맥락 탐색, 회의·요청의 작업안 초안, 반복 실행, 검증 근거 준비.
- Human gate: 제품 우선순위, architecture, assignment, QA, release 승인.

### Responsibility map

| 영역 | 역할 | 표현 상한 |
| --- | --- | --- |
| MEDINESS 제품 요구·운영 구조 | 설계 참여 | `contributed` |
| 제품별 Decision→release | 적용·운영 리드 | `led` |
| 회사 업무 AX 확장 | 설계 참여 | `contributed` |
| Backend Template·agent context | 직접 설계·구축 | `owned` |
| MEDINESS 앱·데이터·도구 | 담당 개발팀 | 직접 구현으로 표현하지 않음 |
| Azure·Terraform operation | 직접 담당 | 상세 topology·change proof는 Infrastructure case가 소유 |

### Engineering execution plane

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

Backend Template은 조직 표준을 주장하기 위한 장식이 아니라, 사람과 agent가 같은 architecture·contract·runbook을 읽고 실행하기 위한 직접 구현 근거다.

### 표현 상한

전사 AX 전환 완료, 모든 회사 업무 통합, MEDINESS 플랫폼 직접 구현, 회사 AX 단독 설계, agent의 자율 의사결정·업무 배정·승인·release, 정량 생산성 개선은 주장하지 않는다. daily briefing 직접 구축도 사용하지 않는다.

## 5. Case 03 — Centurion

### 공개 제목

> 실패한 작업은 다시 돌리고, 실시간 상담은 빠르게 반응하면서도 엉뚱한 발화를 덮지 않게 만들었습니다.

### Contribution map

| Service context | 기여 | 대표 판단 |
| --- | --- | --- |
| 주문·재고 | 구축 주도 | API 응답과 실패 가능한 작업 분리, 상태·retry·terminal failure·수동 재처리 |
| 실시간 AI 상담 | 공동 주 기여 | session lifecycle·provider adapter 분리, duplicate event·reconnect guard |
| DAY 예약 정책 | 연결 주도 | backend 판단을 frontend·QA·release가 같은 기준으로 소비 |
| 시설·재고·공통 인증 | 주요 기능 기여 | 외부 publish 실패를 핵심 업무 transaction과 분리 |

### 고유 시각화

```text
API transaction → commit → RabbitMQ → TaskIQ
                                  ├─ success
                                  ├─ retryable failure → retry
                                  └─ terminal failure → 기록 · 수동 재처리
```

Centurion 전체 단독 구축이나 모든 service ownership으로 확대하지 않는다.

## 6. Archived Evidence — Company Infrastructure

> 2026-08-23 selection correction: 서비스 배포 환경 구성·기본 운영 경험은 사실로 보존하지만 infrastructure architecture 전문성으로 포지셔닝하지 않는다. 아래 내용은 내부 근거이며 public master와 role variant에서 선택하지 않는다.

### 공개 제목

> 여러 제품의 Azure 실행 경계를 나누고, state·plan·실제 리소스를 대조해 변경을 통제했습니다.

### Current topology

- Shared ACR과 B2B/B2C workload·data·environment 경계
- workload에 맞춘 App Service·VM 병행
- 환경별 Azure Monitor·Log Analytics와 Production alert
- Azure 밖 Terraform control plane: 6 independent roots, 400+ state objects

### Human change gate

```text
변경 범위 식별
→ AI-assisted inventory·Terraform draft
→ state snapshot·fmt·validate·plan
→ Azure live inventory 대조
→ destroy·replace·drift 판정
→ human apply
→ health·log·alert 확인
```

Infrastructure는 Company AX case의 runtime proof로 연결되지만, Azure topology·state safety·observability의 구체적 근거는 이 case가 소유한다. target architecture와 current runtime을 섞지 않는다.

## 7. Supporting — Memento Payment

> Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름을 구축했습니다.

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

Stripe Checkout·manual capture·provider-side cancel/refund 영역 구축 주도까지만 표현한다. DB와 provider의 atomic rollback이나 exactly-once는 주장하지 않는다.

## 8. 시각화 원칙

| Case | 주 시각화 | 피할 표현 |
| --- | --- | --- |
| Thready | product/runtime/delivery reference architecture + compact Outbox/version-fence flow | 제품 운영과 기술 구조를 서로 다른 두 장에 반복 |
| Company AX | current product flow 실선 + company extension 점선 + responsibility map | 전사 AX 완료나 agent 자율 판단 |
| Centurion | service map + async recovery + SAY runtime reference architecture와 event inset | 전체 MSA 단독 ownership 또는 event-only 도식 |

- 기존 ruled document 문법을 유지하고 card grid를 늘리지 않는다.
- 실선은 현재 운영, 점선은 확장 설계라는 의미를 모든 화면·인쇄에서 유지한다.
- visual은 decoration이 아니라 ownership·state transition·failure/human gate 중 하나를 설명한다.
- 웹은 한 route에서 전부 읽고, 인쇄할 때 case boundary·diagram 내부 분할을 피한다.
- 내부 claim ID·forbidden copy·limits는 공개 DOM에 노출하지 않는다.

## 9. 구현 mapping

| 구현 지점 | 현재 역할 |
| --- | --- |
| `app/fe/lib/cases.ts` | 01 Thready → 02 Company AX → 03 Centurion 순서와 archive Infrastructure metadata |
| `app/fe/app/portfolio/case-dossier.tsx` | case별 차등 composition, Company AX current/extension·responsibility visual |
| `app/fe/app/portfolio/page.tsx` | 공통 hero·primary 순서·Memento supporting 조립 |
| `app/fe/content/portfolios/role-variants.ts` | 같은 Company AX case를 직군별 focus와 순서로 재사용 |
| print style | heading·diagram 내부 분할을 피하면서 A4 document flow 유지 |

## 10. 완료 기준

- 첫 화면에서 Maker, Tech Lead·Backend Engineer, 제품 0→1, 회사 AX, backend가 10초 안에 구분됨
- 목차가 `Thready → Company AX → Centurion` 순서로 읽힘
- Company AX에서 현재 운영과 확장 설계가 실선·점선으로 구분됨
- MEDINESS 설계 참여·제품 운영 리드·Backend Template 직접 구축·플랫폼 구현팀의 책임이 한 표에서 구분됨
- Agent가 준비할 일과 사람이 판단·승인할 일이 분리됨
- Infrastructure가 대표 전문성으로 오독되지 않고 Cloud/Delivery 보조 경험으로만 남음
- Product Operations가 별도 supporting case로 중복되지 않음
- single route와 A4 PDF 변환 가능성을 유지함
- public copy가 stable claim과 ownership boundary를 넘지 않음
