---
type: reference
title: 회사별 역량 축 지도
description: 각 회사 경력 설명의 축 구성·근거 claim·미사용 자산을 한 장으로 본다. 축은 회사마다 다르고 JD에 따라 재배치된다.
timestamp: 2026-08-12
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
- 축당 bullet 3~5. **회사당 축 3~5, 현재 회사만 최대 6.**
- 분량이 넘치면 **현재 회사를 자르지 않고 과거 회사를 압축한다.** 목표 비율 = 현재 : 나머지 ≈ 2 : 1.

## 1. 두 층위 — 전역 축과 회사별 축

| 층위 | 어디에 | 축 |
| --- | --- | --- |
| **전역** | 웹 이력서 `할 수 있는 일` 섹션 | ① backend 구축·재구축 ② AI 출력 품질 판정·평가 ③ 어드민 시스템 구축·운영 ④ Agent 워크플로우·AX ⑤ 인프라·플랫폼 운영 ⑥ 제품 운영·결정 |
| **회사별** | 플랫폼 경력 설명 · 웹 이력서 경력 | 회사마다 다름 (아래) |

전역 축은 **여러 회사를 가로지르는 주장**이다 (예: ①은 메디솔브 + 스튜디오랩 둘 다 걸침).
회사별 축은 그 회사 안에서만 성립한다. **전역 4축을 모든 회사에 강제하지 않는다.**

## 2. 회사별 축 구성

### 메디솔브에이아이 (2025.04 —, Backend Engineer · 기업부설연구소장)

담당 제품: Thready(AI 콘텐츠 생성) · Centurion(AI 메디컬 플랫폼 — 피부과 운영 CRM·통합 관리 시스템)

> ⚠️ **NEXUS는 별도 제품이 아니다** (2026-08-12 user-confirmed: "centurion & nexus 사실 거의 동일하거든").
> Centurion 제품군의 저장소 라벨이며, `clients.md`도 어드민을 "Centurion 데이뷰 & 세라미크 어드민 시스템"으로
> 기록한다. 공개 문안에서 Centurion과 나란히 병기하면 담당 제품이 하나 더 있는 것처럼 읽혀 범위가 부풀려진다.
> `nexus.*` claim namespace는 저장소 추적용으로 유지하되, **표기는 「어드민/통합 관리 시스템」 기능명으로 푼다.**

| # | 축 | 근거 제품 | claim ID | 강도 | bullet |
| --- | --- | --- | --- | --- | --- |
| 1 | AI 제품 backend 구축·재구축 | Thready · Centurion | `thready.backend-rebuild` `thready.rebuild-decision-execution` `thready.qa-reopen-reduction` `thready.production-operation-quality` `centurion.bay-async-backend` | owned / owned / owned / owned / led | 5 |
| 2 | AI 출력 품질 판정·평가 | Thready | `thready.quality-criteria-system` `thready.corpus-measurement` `thready.measurement-correction` `thready.falsification-log` | owned ×4 | 5 |
| 3 | 어드민 시스템 구축·운영 | Centurion 통합 관리 시스템 | `nexus.admin-backend-ownership` `nexus.backend-architecture` `nexus.quality-automation` | led ×3 | 5 |
| 4 | Agent 워크플로우·AX | Thready · 조직 표준 템플릿 | `thready.agent-pipeline-design` `be-template.backend-standard` `be-template.agent-context` `be-template.team-leverage` | owned ×4 | 5 |
| 5 | 인프라·플랫폼 운영 | 회사 Azure · Centurion | `infra.company-azure-ownership` `nexus.terraform-infra` `centurion.shared-infra` | **owned ×3** | 4 |
| 6 | 제품 운영·결정 | 제품팀 · Centurion | `career.medisolve-role-evolution` `mediness.product-operations` `centurion.say-realtime-ai` | led / led / **co-led** | 4 |

**⚠️ 축 3은 `led`이고 진행 중이다** — "단독 구축"(Git 커밋 83%, 100% 아님)·완료형·도메인 개수 단정·
Closure Table(repo에 없는 자기보고 오류)·고객사 실명 전부 금지. 고객사는 `D·C 피부과` 마스킹.

**⚠️ 축 4의 SAY는 co-led다** — "공동 주 기여"를 반드시 유지한다. 강도 상향 금지.

### 더데이랩스 (2025.02 — 2025.04, 프리랜서 Backend Engineer)

담당 제품: Centurion — backend 저장소 착수 구간

| # | 축 | claim ID | 강도 | bullet |
| --- | --- | --- | --- | --- |
| 1 | 개발 기준 수립 | `career.thedaylabs-freelance` | contributed | 4 |

단일 축. recency 기준상 이 구간은 확장하지 않는다.

### 메멘토에이아이 (2024.10 — 2025.01, Backend Engineer)

담당 제품: 피부과 통합 관리 시스템의 예약·결제 backend

| # | 축 | claim ID | 강도 | bullet |
| --- | --- | --- | --- | --- |
| 1 | 결제 트랜잭션 안정화 | `career.memento-payment` | owned | 3 |
| 2 | 결제 도메인 구축 | `career.memento-payment` | owned | 2 |

축 1이 **Centurion 예방 설계의 근거**다 — 두 회사를 잇는 서사이므로 지우지 않는다.

### 스튜디오랩 (2021.12 — 2023.12, AI Engineer → PM → Backend Engineer)

담당 제품: SellerCanvas(Vision AI 상세페이지 자동 생성) · Deep Scan(의류 분석)

| # | 축 | claim ID | 강도 | bullet |
| --- | --- | --- | --- | --- |
| 1 | **제품 시스템 기획·구축 (PM 메인 롤)** | `career.sellercanvas-product-system` `credentials.page-output-patent` | **led** / owned | **6** |
| 2 | Vision AI 모델 개발 | `career.sellercanvas-product-system` `credentials.ai-accuracy-certification` | contributed / — | 2 |
| 3 | Backend 표준화 | `career.sellercanvas-product-system` | contributed | 2 |
| — | 수상 | `credentials.ces-2024` | — | 1줄 |

**축 1은 배분 예외다** (2026-08-12 user-confirmed: "스튜디오랩에서는 PM으로서의 성과가 강해").
목표 포지션(PO & AI 에이전트)의 "정하는 일" 쪽 최강 근거이자 특허·CES의 출처이므로,
과거 시기임에도 6줄을 준다. PM 축은 **나열이 아니라 서사**다 (2026-08-12): `0→1 구간 통과 → 패션 대기업 POC → 상세페이지
제작 Flow 재설계 → 특허 출원·등록`. 세 사실이 각각 떨어져 있던 것을 하나의 흐름으로 이었다.

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
SPAO는 마스킹 대상이라 "패션 대기업 브랜드"로만 쓴다. 브랜드 개수는 못박지 않는다.

축 2가 **dual track의 원형**이다 — AI 시기 모델 개발과 PM 재직 중 색상 분류 모델이 한 축으로 묶인다
(2026-08-12 user-confirmed: Deep Scan은 두 시기 모두).

### 아이즈솔 (2020.08 — 2021.06, Vision AI Engineer 인턴)

담당 제품: Kidsly(유아 안면 인식 기반 비접촉 자동 출결)

| # | 축 | 강도 | bullet |
| --- | --- | --- | --- |
| 1 | Vision AI 모델·백엔드 개발 | contributed | 4 |

**정량 공개 금지** (99.8%·초당 30건 등 — [recency-weighting](../../rules/recency-weighting.md)).
`led`·`owned` 금지. 판단 줄을 억지로 넣지 않는다 (대안 검토 evidence 없음).
백엔드는 **Python·FastAPI** — "C#"은 2026-08-12 user-refuted.

## 3. ⚠️ 미사용 자산 — 축 신설 후보

`public: true`인데 **경력 설명 어디에도 안 쓰이는 claim**이다. 지면이 허락하면 축을 신설한다.

### ~~메디솔브 — 「인프라·플랫폼」 축이 통째로 비어 있다~~ → **해소 (2026-08-12)**

축 5로 신설했다. `owned` 3건 — 메디솔브에서 가장 강도 높은 축이다. 아래가 그 근거다.

| claim ID | statement | 강도 |
| --- | --- | --- |
| `infra.company-azure-ownership` | 회사 Azure infra repository와 운영을 B2B·B2C·NEXUS·제품 환경 전반에서 담당 | **owned** |
| `nexus.terraform-infra` | NEXUS Terraform IaC 구축 전담 | **owned** |
| `centurion.shared-infra` | Centurion Azure/Terraform infra 구축·운영과 runbook·문서화 | **owned** |

수치(App Service 13대·Terraform 관리 231 resource)는 `forbidden_copy`의 "정확한 resource detail"에 걸린다 — 쓰지 않는다.

### ~~메디솔브 — NEXUS가 경력 설명에 없다~~ → **해소 (2026-08-12)**

「어드민 시스템 구축·운영」 축으로 신설해 반영했다. 아래는 그때 사용한 근거다.

| claim ID | statement | 강도 |
| --- | --- | --- |
| `nexus.backend-architecture` | 외부 병원 product backend monorepo의 service boundary와 migration flow 주도 | led |
| `nexus.admin-backend-ownership` | admin/homepage API를 독립 모듈로 둔 monorepo를 Clean Architecture 계층 구조로 설계·구축 주도 (진행 중) | led |
| `nexus.pool-stabilization` | 커넥션 풀 타임아웃 원인 분석과 풀 설정·세션 생명주기 재조정 | led |
| `nexus.quality-automation` | 코드 컨벤션 정립과 Ruff·Pyright·pre-commit 기반 품질 자동 검증 체계 구축 | led |
| `nexus.domain-audit-governance` | multi-brand backend monorepo의 domain audit과 documentation governance | contributed |

잔여: `nexus.pool-stabilization`(커넥션 풀 설정·세션 생명주기 재조정)은 **작업까지만 claim 가능**하다 —
전후 모니터링 지표가 없어 효과를 쓸 수 없고 `confidence: medium`이다. 지면이 남을 때만 쓴다.
`nexus.domain-audit-governance`는 `contributed`라 현재 축에서 제외했다.
고객사 표기는 `D·C 피부과` 마스킹 ([clients.md](../../evidence/clients.md)) — 그룹바이·oopy의 `A 피부과`는 오기.

### Centurion — 미사용 4건

`centurion.test-ci-foundation`(API test infra·Docker CI) · `centurion.async-migration`(Celery→TaskIQ, 일부 사용) ·
`centurion.day-product-integration`(예약 정책을 BE 판단→FE 표시→QA seed→release docs로 연결) ·
`centurion.ray-backend` · `centurion.sso-session`(multi-service SSO·중복 로그인·E2E)

→ `day-product-integration`은 **제품 운영·결정 축의 실무 근거**로 쓸 수 있다
(현재 그 축은 추상적인 게이트 서술뿐이다).

## 3-b. 분량 배분 (2026-08-12 재조정)

메디솔브가 6축이 되면서 전체 분량이 늘었다. **현재 회사를 줄이지 않고 과거를 압축**했다.

| 회사 | 축 | bullet | 조정 |
| --- | --- | --- | --- |
| 메디솔브 | 6 | 28 | 어드민·인프라 축 신설로 증가 |
| 더데이랩스 | 1 | 2 | 4 → 2 (기준 수립 항목 병합) |
| 메멘토 | 1 | 3 | 2축 5줄 → 1축 3줄 (결제 도메인을 안정화 축에 흡수) |
| 스튜디오랩 | 3 + 수상 | **10** | 6 → 10 (PM 축 강화 — 배분 예외) |
| 아이즈솔 | 1 | 2 | 4 → 2 |

현재 : 나머지 = 28 : 17 ≈ **1.6 : 1**. (PM 축 예외 반영 후) 국내 인사담당자 증언상 3장을 넘기면 읽기를 포기하므로
총량은 늘리지 않고 배분만 바꿨다 ([recency-weighting](../../rules/recency-weighting.md)).

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
