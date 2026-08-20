---
type: reference
title: 회사별 역량 축 지도
description: 각 회사 경력 설명의 축 구성·근거 claim·미사용 자산을 한 장으로 본다. 축은 회사마다 다르고 JD에 따라 재배치된다.
timestamp: 2026-08-18
derived_from: [rules/persuasive-writing.md, backlog/platform-profile-consolidation/dual-track-copy-draft.md, evidence/claims/]
tags: [resume, career, axes, reference]
---

# 회사별 역량 축 지도

user: "각 회사들별로 이 구조가 좀 변동될 수 있겠지 / 그 관점에서 이걸 md파일에 적재해놓고 볼 수 있을까?"

**축은 고정 틀이 아니다.** 그 회사에서 실제로 한 일이 축이 되고, 지원 JD에 따라 순서와 묶음이 바뀐다.
이 문서는 그 변동을 관리하기 위한 지도다. 문안 자체의 canonical은
[dual-track-copy-draft](../../backlog/platform-profile-consolidation/dual-track-copy-draft.md)
「경력 설명 — canonical v4」이며, 여기서는 **구조와 근거**만 다룬다.

## 0. 규칙 요약

```
담당 제품: 코드명(무엇을 하는 제품인지) · 코드명(…)

[역량 축]
- 수치·주제어 먼저, 결과명사로 종결 (근거는 괄호) · 코드명
```

- 제목은 **역량만**. 제품명을 제목에 넣지 않는다 — 읽는 사람은 사내 코드명을 모른다.
- 코드명 ↔ 제품 성격 매핑은 회사 맨 위 「담당 제품」 한 줄이 담당한다.
- 태그(`· 코드명`)는 **축이 여러 제품을 걸칠 때 필요한 줄에만**. 단일 제품 축은 생략.
- 축·회사별 bullet 수를 고정하지 않는다. 각 bullet은 새로운 claim·판단·구현·검증·결과 중 하나 이상의 판정 근거를 추가해야 한다.
- 최근 경력을 상대적으로 자세히 쓰되, 과거 case가 고유한 backend evidence를 더하면 압축하지 않는다. 반복·약한 claim부터 제거한다.

## 1. 두 층위 — 전역 축과 회사별 축

| 층위 | 어디에 | 축 |
| --- | --- | --- |
| **전역** | 웹 이력서 `핵심 역량` 섹션 | ① backend 구축·재구축 ② AI 출력 품질 판정·평가 ③ 어드민 시스템 구축·운영 ④ Agent 워크플로우·AX ⑤ 인프라·플랫폼 운영 ⑥ 제품 운영·결정 |
| **회사별** | 플랫폼 경력 설명 · 웹 이력서 경력 | 회사마다 다름 (아래) |

전역 축은 **여러 회사를 가로지르는 주장**이다 (예: ①은 메디솔브 + 스튜디오랩 둘 다 걸침).
회사별 축은 그 회사 안에서만 성립한다. **전역 4축을 모든 회사에 강제하지 않는다.**

## 2. 회사별 축 구성

### 메디솔브에이아이 (2025.04 —, Tech Lead · Backend Engineer)

담당 제품: Thready(AI 콘텐츠 생성) · Centurion(범용 피부과 CRM·주문·재고·실시간 상담) · 외부 피부과 운영·예약 시스템

> ⚠️ **DAY는 Centurion의 CRM 영역이고, NEXUS만 Centurion과 별도다** (2026-08-20 user-confirmed correction).
> NEXUS는 외부 피부과 여러 곳의 홈페이지·관리·예약 운영 시스템이고, DAY는 Centurion을 구성하는 범용 피부과 CRM 영역이다.
> 같은 회사의 의료 domain·infra 맥락이 일부 겹치더라도 repository·고객·성과를 합치지 않는다.
> 공개 문안에서는 고객사와 코드명을 빼고 **「여러 피부과의 운영·예약 시스템」**으로 설명한다.

| # | 축 | 근거 제품 | claim ID | 강도 | 현재 copy inventory (quota 아님) |
| --- | --- | --- | --- | --- | --- |
| 1 | AI 제품 full-stack 구축·backend 재구축 | Thready · Centurion | `thready.frontend-product-delivery` `thready.backend-rebuild` `thready.rebuild-decision-execution` `thready.ai-service-migration` `thready.ai-replica-outbox` `centurion.bay-async-backend` | led / owned / owned / owned / owned / led | 6 |
| 2 | 시장 데이터 제품화·AI 출력 평가 | Thready | `thready.threads-market-outcome-design` `thready.labeling-corpus-workbench` `thready.hook-rubric-experiment` `thready.generation-quality-system` | owned ×4 | 4 |
| 3 | 피부과 운영·예약 시스템 구축 | 외부 피부과 운영·예약 시스템 | `nexus.admin-backend-ownership` `nexus.backend-architecture` `nexus.quality-automation` `nexus.hospital-operations-revenue-contribution` | led ×3 / contributed ×1 | 6 |
| 4 | Agent 워크플로우·AX | Thready · 조직 표준 템플릿 | `thready.agent-pipeline-design` `be-template.backend-standard` `be-template.agent-context` `be-template.team-leverage` | owned ×4 | 5 |
| 5 | 인프라·플랫폼 운영 | 회사 Azure · Centurion | `infra.company-azure-ownership` `infra.terraform-state-safety` `infra.azure-observability` `nexus.terraform-infra` `centurion.shared-infra` | **owned ×5** | 4 |
| 6 | 제품 운영·결정 | Thready · 제품팀 · Centurion | `thready.product-zero-to-one-contribution` `career.medisolve-role-evolution` `mediness.product-operations` `centurion.say-realtime-ai` | led / led / led / **co-led** | 5 |

**⚠️ 축 3의 backend 재구축은 `led`이고 진행 중이다** — "단독 구축"(Git 커밋 83%, 100% 아님)·완료형·도메인 개수 단정·
Closure Table(repo에 없는 자기보고 오류)·고객사 실명 전부 금지. 예약률·매출은 기존 제품의 `contributed/medium` outcome이며 정확한 수치·개인 단독 인과를 쓰지 않는다.

**⚠️ 축 4의 SAY는 co-led다** — "공동 주 기여"를 반드시 유지한다. 강도 상향 금지.

### 더데이랩스 (2025.02 — 2025.04, 프리랜서 Backend Engineer)

담당 제품: Centurion — MediSolve AI 법인 설립 전 backend 선행 착수 구간

| # | 축 | claim ID | 강도 | 현재 copy inventory (quota 아님) |
| --- | --- | --- | --- | --- |
| 1 | 법인 설립 전 초기 backend·개발 기준 수립 | `career.thedaylabs-freelance` | led | 4 |

현재는 단일 축으로 정리돼 있으나 quota가 아니다. 고유한 backend 판단·구현·검증 근거가 추가되면 확장한다.

### 메멘토에이아이 (2024.10 — 2025.01, Backend Engineer)

담당 제품: 피부과 통합 관리 시스템의 예약·결제 backend

| # | 축 | claim ID | 강도 | 현재 copy inventory (quota 아님) |
| --- | --- | --- | --- | --- |
| 1 | Stripe manual-capture 선결제·provider 보상 처리 | `career.memento-stripe-prepayment` | led | 3 |
| 2 | 환불 완료의 mileage·ticket 상태 전이 | `career.memento-payment` | contributed | 2 |
| 3 | 다국어 Happy Call 예약 발송 lifecycle | `career.memento-happycall-survey` | led | 2 |

현재는 supporting case다. provider-side compensation까지는 검증됐지만 DB/provider atomic rollback, webhook idempotency·reconciliation, production 운영 결과로 확대하지 않는다.

### 스튜디오랩 (2021.12 — 2024.01, AI Engineer → PM → Backend Engineer)

담당 제품: SellerCanvas(Vision AI 상세페이지 자동 생성) · Deep Scan(의류 분석)

| # | 축 | claim ID | 강도 | 현재 copy inventory (quota 아님) |
| --- | --- | --- | --- | --- |
| 1 | **제품 시스템 기획·구축 (PM 메인 롤)** | `career.sellercanvas-product-system` `credentials.page-output-patent` | **led** / contributed | **6** |
| 2 | Vision AI 모델 개발 | `career.sellercanvas-product-system` `credentials.ai-accuracy-certification` | contributed / — | 2 |
| 3 | Backend 표준화 | `career.sellercanvas-product-system` | contributed | 2 |
| — | 수상 | `credentials.ces-2024` | — | 1줄 |

**축 1은 JD relevance 예외다** (2026-08-12 user-confirmed: "스튜디오랩에서는 PM으로서의 성과가 강해").

오래된 경력이라서 줄 수를 제한하지 않는다. 제품 시스템·0→1 POC·외부 검증이 현재 JD에 고유한 판정 근거를 제공할 때 필요한 깊이로 쓴다.
PM 축은 `0→1 구간 통과 → 대기업 POC → 상세페이지 제작 flow 재설계 → 특허 출원·등록`의 연결된 판단 서사로 설명한다.

신규 반영한 재료:
- **0→1 경험** (user-confirmed: "셀러캔버스라는 시스템을 내가 처음부터 기획했고 zero to one을 경험")
  — `career.yaml`에 `프로토타입 단계에서 v1.0 제품까지 0→1 구간을 PM으로 통과` allowed_copy 추가.
  ⚠️ 금지 유지·추가: 제품 전체 단독 기획·총괄 / **창업자·설립 시점부터 참여** / **0에서 혼자 만들었다**
  (합류는 2021.12 AI Engineer, 프로토타입 선행, PM 전환은 2022.10)
- **"제품이 원활하게 돌아가는 시스템을 기획·구축"** — 개발 시스템이 아니라는 구분.
  현재의 제품 운영(decision·spec·release gate) 리드와 **같은 근육의 이전 형태**라는 연결이 핵심이다
- **"LLM 붐 이전(2021~22)부터 Vision AI 기반 생성 제품"** — allowed_copy에 있었으나 미사용이던 문장
- Backend 축에 "PM 경험으로 레거시 문제점 파악·개선 방향 설계"를 복원 (역할 간 연결)

미반영 유지: 정량(제작 시간 95% 단축, 정확도 99% 등)은 self-reported·공개 미사용 확정.
확정 POC 고객사도 마스킹 대상이라 "패션 대기업 브랜드"로만 쓴다. 브랜드 개수는 못박지 않는다.

축 2가 **dual track의 원형**이다 — AI 시기 모델 개발과 PM 재직 중 색상 분류 모델이 한 축으로 묶인다
(2026-08-12 user-confirmed: Deep Scan은 두 시기 모두).

### 아이즈솔 (2020.08 — 2021.06, Vision AI Engineer 인턴)

담당 제품: Kidsly(유아 안면 인식 기반 비접촉 자동 출결)

| # | 축 | 강도 | 현재 copy inventory (quota 아님) |
| --- | --- | --- | --- |
| 1 | Vision AI 모델·백엔드 개발 | contributed | 4 |

99.8%·초당 30건은 오래돼서가 아니라 stable claim·측정 정의·비교 맥락이 부족해 현재 사용하지 않는다
([recency-weighting](../../rules/recency-weighting.md)). 검증되고 JD 판정에 고유한 근거가 되면 recency만으로 금지하지 않는다.
`led`·`owned` 금지. 판단 줄을 억지로 넣지 않는다 (대안 검토 evidence 없음).
백엔드는 **Python·FastAPI** — "C#"은 2026-08-12 user-refuted.

## 3. ⚠️ 미사용 자산 — 축 신설 후보

`public: true`인데 **경력 설명 어디에도 안 쓰이는 claim**이다. stable evidence와 JD relevance가 있고 새로운 판정 근거를 더하면 축을 신설한다.

### ~~메디솔브 — 「인프라·플랫폼」 축이 통째로 비어 있다~~ → **해소 (2026-08-12)**

축 5로 신설했다. `owned` 3건 — 메디솔브에서 가장 강도 높은 축이다. 아래가 그 근거다.

| claim ID | statement | 강도 |
| --- | --- | --- |
| `infra.company-azure-ownership` | 회사 Azure infra repository와 운영을 B2B·B2C·NEXUS·제품 환경 전반에서 담당 | **owned** |
| `nexus.terraform-infra` | NEXUS Terraform IaC 구축 전담 | **owned** |
| `centurion.shared-infra` | Centurion Azure/Terraform infra 구축·운영과 runbook·문서화 | **owned** |

수치(App Service 13대·Terraform 관리 231 resource)는 `forbidden_copy`의 "정확한 resource detail"에 걸린다 — 쓰지 않는다.

### ~~메디솔브 — 외부 피부과 운영·예약 시스템이 경력 설명에 없다~~ → **해소 (2026-08-20 정정)**

「어드민 시스템 구축·운영」 축으로 신설해 반영했다. 아래는 그때 사용한 근거다.

| claim ID | statement | 강도 |
| --- | --- | --- |
| `nexus.backend-architecture` | 외부 병원 product backend monorepo의 service boundary와 migration flow 주도 | led |
| `nexus.admin-backend-ownership` | admin/homepage API를 독립 모듈로 둔 monorepo를 Clean Architecture 계층 구조로 설계·구축 주도 (진행 중) | led |
| `nexus.pool-stabilization` | 커넥션 풀 타임아웃 원인 분석과 풀 설정·세션 생명주기 재조정 | led |
| `nexus.quality-automation` | 코드 컨벤션 정립과 Ruff·Pyright·pre-commit 기반 품질 자동 검증 체계 구축 | led |
| `nexus.domain-audit-governance` | multi-brand backend monorepo의 domain audit과 documentation governance | contributed |
| `nexus.hospital-operations-revenue-contribution` | 여러 피부과의 운영·예약 시스템 backend 구축과 예약률·매출 성과 기여 | contributed |

잔여: `nexus.pool-stabilization`(커넥션 풀 설정·세션 생명주기 재조정)은 **작업까지만 claim 가능**하다 —
전후 모니터링 지표가 없어 효과를 쓸 수 없고 `confidence: medium`이다. 지면이 남을 때만 쓴다.
`nexus.domain-audit-governance`는 `contributed`라 현재 축에서 제외했다.
고객사는 기본적으로 생략하고 `여러 피부과의 운영·예약 시스템`으로 쓴다 ([clients.md](../../evidence/clients.md)) — 그룹바이·oopy의 `A 피부과`는 오기.

### Centurion — 미사용 4건

`centurion.test-ci-foundation`(API test infra·Docker CI) · `centurion.async-migration`(Celery→TaskIQ, 일부 사용) ·
`centurion.day-product-integration`(예약 정책을 BE 판단→FE 표시→QA seed→release docs로 연결) ·
`centurion.ray-backend` · `centurion.sso-session`(multi-service SSO·중복 로그인·E2E)

→ `day-product-integration`은 **제품 운영·결정 축의 실무 근거**로 쓸 수 있다
(현재 그 축은 추상적인 게이트 서술뿐이다).

## 3-b. 상대적 강조 (2026-08-18 개정)

기존 회사별 축·bullet 예산과 `현재 : 나머지` 수치 목표는 superseded다. recency는 기본 정렬 신호이지 지면 quota가 아니다.

| 경력 | 기본 역할 | 확장 조건 |
| --- | --- | --- |
| 메디솔브·더데이랩스 선행 구간 | 현재 backend ownership과 production 운영, 초기 foundation의 주 근거 | JD와 가까운 verified technical case는 완결될 때까지 확장 |
| 메멘토 | 합류 경로와 결제·예약 messaging의 supporting evidence | 현재 경력에 없는 외부 provider 보상·상태 전이 failure mode를 증명할 때 확장 |
| 스튜디오랩 | PM·제품 시스템과 외부 검증 근거 | backend claim은 stable evidence가 생긴 뒤에만 확장 |
| 아이즈솔 | 경력 궤적의 시작점 | 현재 역할에 없는 검증된 기술 근거가 있을 때만 확장 |

고정 비율 없이 현재 역할을 가장 넓은 baseline으로 두고, 과거 경력도 새로운 기술 판정 근거를 제공하면 필요한 만큼 남긴다.
분량이 늘면 오래됐다는 이유로 자르지 않고 중복 설명·약한 claim·stack 나열을 먼저 제거한다
([recency-weighting](../../rules/recency-weighting.md)).

## 4. JD에 따른 축 재배치

축 순서는 **지원 포지션이 첫 줄에서 무엇을 찾는가**로 정한다. 문장을 바꾸는 게 아니라 순서를 바꾼다.

| JD 유형 | 메디솔브 축 순서 | 비고 |
| --- | --- | --- |
| AI Engineer (LLM·Agent) | ② 품질 판정 → ④ Agent → ① 구축 → ⑥ 운영 | eval 설계가 2026 1순위 스크린 |
| Backend Engineer | ① 구축 → ⑤ 인프라 → ③ 어드민 → ④ Agent | 인프라·어드민이 전면 |
| AI PM / AI PO | ⑥ 운영·결정 → ② 품질 판정 → ① 구축 | 스튜디오랩 축 1을 함께 올린다 |
| Platform / DevOps | ⑤ 인프라 → ① 구축 → ③ 어드민 | Azure·Terraform owned 3건이 최강 근거 |

## 5. 변경 이력

| 날짜 | 변경 |
| --- | --- |
| 2026-08-12 | v1 라벨 접두(`문제:/판단:`) → 폐기 |
| 2026-08-12 | v2 영어식 스캔 토큰 도치 → 폐기 (한국어 어순과 충돌) |
| 2026-08-12 | v3 개조식·명사형 종결 확정 (국내 레퍼런스 기반) |
| 2026-08-12 | v4 소제목을 프로젝트명 → **역량 축**으로 (주객전도 교정) |
| 2026-08-12 | v4.1 제목에서 제품명 제거, 「담당 제품」 한 줄 도입 |
| 2026-08-12 | v4.2 NEXUS ≡ Centurion 확인 → 병기 제거, 「어드민 시스템 구축·운영」 축 신설 |
| 2026-08-12 | v4.3 「인프라·플랫폼 운영」 축 신설(owned ×3), 메디솔브 6축 · 과거 회사 압축으로 총량 유지 |
| 2026-08-12 | v4.4 스튜디오랩 PM 축 강화 (배분 예외 — 목표 포지션 직결 축) |
| 2026-08-12 | v4.5 PM 축을 0→1 서사로 재구성 (0→1 → POC → Flow 재설계 → 특허) |
| 2026-08-18 | 고정 bullet·회사별 분량 quota 폐기. recency는 정렬 신호로만 사용하고 고유한 technical evidence는 필요한 깊이로 유지 |
| 2026-08-20 | 기존 NEXUS ≡ Centurion 판정을 supersede. NEXUS는 외부 피부과 운영·예약 시스템, DAY는 범용 피부과 CRM으로 분리하고 예약률·매출 기여를 제품 outcome으로 추가 |
