---
type: resume-content
title: Resume Master v4 Content (DRAFT)
description: 프로젝트 인벤토리에서 인물 서사로 — 관통 주제 3축으로 재구성. 프로젝트는 증거 위치로 이동.
timestamp: 2026-08-09
status: superseded
tags: [resume, v4, content, korean, draft]
---

# Resume Master v4 Content — DRAFT

## 왜 v4인가

v3까지는 **프로젝트가 뼈대**였다. Capabilities 6개 카드가 프로젝트와 1:1 대응하고, `Selected Projects`가 독립 섹션으로 있었다.

[구조 리서치](../../../jd/reports/2026-08-09-resume-structure-research.md) 결론:

> 이력서는 인벤토리가 아니라 **주장(argument)**이다. 프로젝트는 주제가 아니라 **증거**다. 관통 주제가 모든 역할을 꿰어야 한다.

v4의 변경은 하나다 — **같은 claim을 인물 서사 축으로 재배열한다.** evidence 레이어(프로젝트 네임스페이스)는 그대로 둔다. 사실의 소유 구조를 바꾸는 게 아니라 산출물의 배열을 바꾼다.

## 관통 주제 3축 (evidence 검증됨)

| 축 | 교차 프로젝트 | 상태 |
| --- | --- | --- |
| **1. 문제의 경계를 다시 잡는다** | career · centurion · nexus · thready (4개) | ✅ 성립 |
| **2. 측정과 게이트로 판정 가능하게 만든다** | centurion · mediness · nexus · thready (4개) | ✅ 성립 |
| **3. 해결을 표준과 자동화로 확장한다** | be-template · career · centurion · mediness (4개) | ✅ 성립 |

### 축 2 — 미달에서 성립까지 (2026-08-09)

초안 1차는 축 2가 3개 프로젝트를 교차한다고 적었으나, **억지 배치 2건을 걷어내니 2개로 떨어졌다.**

| 제거한 claim | 이유 |
| --- | --- |
| `centurion.say-realtime-ai` | "세션 lifecycle과 provider 경계 안정화 공동 주 기여" — **판정 장치가 아니라 안정화 작업**이다 |
| `thready.qa-reopen-reduction` | "재발률 37% → 11%" — **판정 장치가 아니라 결과**다. Summary·Career가 이미 소유한다 |

축 3에서도 `infra.company-azure-ownership`·`nexus.terraform-infra`를 뺐다. **IaC 소유 자체는 "팀이 쓰게 만들었다"는 증거가 아니다.** 대신 runbook·문서화가 명시된 `centurion.shared-infra`로 교체했다.

**→ 보강 완료 (2026-08-09).** `centurion.test-ci-foundation`과 `nexus.domain-audit-governance`를 기존 복합 claim에서 분리해 승격했고, 축 2는 **4개 프로젝트**를 교차한다. 억지로 끼워 넣은 게 아니라 **이미 있던 사실을 제자리로 옮긴 것**이다 — 두 claim 모두 Code-backed 근거를 그대로 쓴다.

함께 처리: `centurion.async-migration`(Celery→TaskIQ)을 신설했다. `centurion.bay-async-backend`의 `forbidden_copy`가 이 서술을 금지하고 있었는데, Git history 실측으로 사실이 확인돼 해제하고 별도 claim으로 올렸다.

이 지적은 Codex(gpt-5.6-sol) 교차 리뷰에서 나왔고 evidence 원문 대조로 확인했다.

축별 claim 매핑은 문서 말미 [부록](#부록--축별-claim-매핑)에 둔다. 이력서 본문에는 넣지 않는다 — 산출물이 아니라 **작성자용 추적표**다.

---

## Header

- Role: `Backend Engineer · AI Product Systems`
- Name: 김대정
- Positioning: AI 제품을 운영 가능한 시스템으로 만드는 백엔드 엔지니어
- Contact: email, phone(PDF only), GitHub, marinkim.xyz, 경기 안양시

## Summary

v3 유지 + **마지막 줄에 3축 예고를 넣어** 이후 섹션과 연결한다. 지금은 Summary의 주장이 본문에서 이어지지 않는 게 문제다.

- Vision AI에서 시작해 AI 엔지니어·PM을 거쳐 제품을 끝까지 책임지는 층으로 백엔드를 선택한 **4년차** 백엔드 엔지니어 (`career.tenure`, `career.ai-pm-backend-continuity`)
- AI 도구로 빠르게 구축된 생성 backend를 **전면 재구축해 QA 버그 재발률을 37%에서 11%로** 낮추고, 월 수만 건 규모 요청을 **HTTP 5xx 0.3% 수준**으로 운영 (`thready.qa-reopen-reduction`, `thready.production-operation-quality`)
- **CES 2024 Best of Innovation 수상 제품**의 PM 메인 역할 · **특허 등록 1건** (`credentials.ces-2024`, `credentials.page-output-patent`)
- Backend Engineer 합류 후 **기업부설연구소장·Tech Lead·PO 역할 병행** (`career.medisolve-role-evolution`)
- **문제의 경계를 다시 잡고, 측정과 게이트로 판정 가능하게 만들고, 그 해결을 표준으로 확장하는 것**이 일하는 방식이다 ← *3축 예고 — 다음 섹션이 이 문장을 받는다*

## How I Work — 일하는 방식

> **v3의 `핵심 역량(Capabilities)` 6개 카드를 대체한다.** 기존 카드는 프로젝트 1:1 대응이라 "역량"이 아니라 "프로젝트 목록"이었다.
>
> ⚠️ **초안 1차는 여기에 16 bullet을 넣었다가 되돌렸다.** 프로젝트 인벤토리를 없앤다면서 같은 claim을 추상 축 아래 다시 나열한 꼴이었고, Summary·Career·Selected Projects에서 또 반복돼 **중복만 늘었다**. 이 섹션은 근거를 담는 자리가 아니라 **뒤에 올 근거를 어떻게 읽어야 하는지 알려주는 자리**다.

**세 문장으로 고정한다. 각 문장의 근거는 Career와 Selected Projects가 소유한다.**

1. **문제의 경계를 다시 잡는다** — 증상을 고치기 전에 문제 정의가 맞는지 본다. 재구축을 결정·설득했고, 품질 기준값이 자사 출력을 되먹이던 순환을 발견해 문제 축 자체를 재정의했다.
2. **측정과 게이트로 판정 가능하게 만든다** — "좋다/나쁘다"로는 무엇을 고칠지 알 수 없다. 생성 품질 판정을 자동 게이트·실측 분포·사람 판정 3층으로 나누고, 릴리스·QA를 게이트 구조로 운영한다.
3. **해결을 표준과 자동화로 확장한다** — 한 번 푼 문제를 팀이 반복해서 쓸 수 있어야 한다. 조직 표준 template에 agent context를 내장하고, 운영 집계를 자동화했다.

## Career

v3 구조 유지 ([recency weighting](../../../../rules/recency-weighting.md)). 단 **bullet을 3축 언어로 정렬**해 How I Work와 호응시킨다.

### MediSolve AI · Backend Engineer · 2025.04 — 현재

기업부설연구소장 · Tech Lead · PO 역할 병행

- AI 콘텐츠 생성 backend **전면 재구축**과 cutover 이후 개발·운영 전담 — QA 버그 재발률 **37% → 11%**, 월 수만 건 규모를 **HTTP 5xx 0.3% 수준**으로 운영
- 피부과 운영 플랫폼의 **주문·재고 backend와 비동기 worker 흐름** 구축 주도 — 실패 가능한 작업(주문·결제)을 **제품 시작 시점부터** API 경계 밖 worker로 분리한 예방 설계
- **조직 표준 FastAPI template 설계·구축**과 agent context 내장, 릴리스 게이트 기반 제품 운영 리드

### 더데이랩스 · Backend Engineer (프리랜서) · 2025.02 — 2025.04
- 현 MediSolve AI 대표와 협업 시작 — 초기 backend 구축과 개발팀 시스템·기준 수립, 창업과 함께 합류

### Memento AI · Backend Engineer · 2024.10 — 2025.01
인턴 1개월 → 정규직
- 예약·결제 backend의 **Stripe 선결제 도입**과 환불·마일리지·티켓 rollback 안정화 — 회사 폐업으로 재직 종료

### STUDIO LAB · AI Engineer → PM → Backend Engineer · 2021.12 — 2023.12
- SellerCanvas(생성형 AI 커머스 콘텐츠)의 **PM 메인 역할**로 제품 시스템 기획·구축

### 아이즈솔 · AI Engineer (인턴) · 2020.08 — 2021.06
- Vision AI에서 시작한 AI product engineering 경력

### 개인 프로젝트 · TellingMe · 2024.01 — 2024.12
- Spring Boot backend와 AWS 배포·모니터링 리드 — **10명 팀의 백엔드 2명 중 주도**, iOS 정식 출시

## Selected Projects — **2건**

> v3는 3~4건이었다. 리서치가 비판한 것은 *"weekend experiments가 가득한 별도 섹션"*이지 전문 프로젝트 섹션 자체가 아니다(권장 상한은 최대 5개). **1건까지 줄이면 "강한 프로젝트가 하나뿐"이라는 인상을 준다** — 초안 1차의 과교정을 되돌려 **2건**으로 한다.
>
> 기준: **서로 다른 축을 대표하고, "왜 이 프로젝트가 나를 설명하는가"를 답할 수 있을 것.**

### Thready · AI 콘텐츠 생성 제품

**메인 프로젝트.** 3축이 한 프로젝트 안에서 전부 관찰되는 사례다 — 문제의 경계를 다시 잡고(재구축 결정), 판정 가능하게 만들고(3층 체계·실측), 그 해결을 운영 구조로 남겼다.

- AI 도구로 빠르게 구축돼 재발 이슈 통제가 어려웠던 생성 backend를 인계받아, 서비스가 작은 시점에 **전면 재구축을 결정·설득** — 하네스를 먼저 세팅하고 AI와 협업해 파악부터 재구축까지 **총 36시간(작업 시간 기준)**에 완수
- cutover 이후 **QA 버그 재발률 37% → 11%**, 재발 일평균 **약 94% 감소**
- AI 모듈 확장을 근거로 **FastAPI 분리 도입**(FE는 Next.js 유지), cutover 이후 개발·운영 전담 — 월 수만 건 규모를 **HTTP 5xx 0.3% 수준**으로 운영
- 품질 판정을 **3층으로 분리**하고 프롬프트 규칙을 실측 근거로 검증 — 반증된 접근은 기록으로 남겨 재시도를 막음

### Centurion · 피부과 운영 AI 메디컬 플랫폼

**제품 시작 시점부터 구축한 사례.** Thready가 "망가진 것을 다시 만든" 이야기라면 이쪽은 "처음부터 실패를 예방한" 이야기다. 두 상황 모두에서 같은 판단 방식이 작동했음을 보인다.

- 주문·재고 API와 RabbitMQ·TaskIQ 비동기 worker, retry, test·CI·onboarding 구축 주도
- 실패 가능한 작업(주문·결제)을 **제품 시작 시점부터 API 경계 밖 worker로 분리** — 이전 소속에서 결제 실패를 직접 수습한 경험의 전이

## Skills

v3 유지. 리서치 권고(10~16개, 카테고리별)에 이미 부합한다.

- Language / FW: Python, FastAPI, TypeScript, NestJS, Java, Spring Boot
- Data / Messaging: PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ
- Infra / Delivery: Azure, AWS, Terraform, Docker, GitHub Actions
- AI Product: LLM integration/evaluation, typed prompt, structured output, WebSocket, SSE, STT

## Education And Credentials

v3 유지.

- 우송대학교 게임멀티미디어 전공 · 2016.03 — 2021.08
- **CES 2024 Best of Innovation · AI 부문** — 수상 제품 참여
- **특허 등록 「페이지 출력 방법」 · 등록 10-2898273**
- ADsP 데이터분석 준전문가 · 2021.09
- 한국건설생활환경시험연구원(KCL) · AI 정확도 부문 인증 통과

---

## v3 → v4 변경 요약

| 항목 | v3 | v4 |
| --- | --- | --- |
| 핵심 역량 | `Capabilities` 6개 카드 (프로젝트 1:1 대응) | **`How I Work` 3문장 thesis bar** — 근거는 Career·Selected Projects가 소유 |
| 대표 프로젝트 | 3~4건 나열 | **2건** (Thready·Centurion) + "왜 이 둘인가" 명시 |
| Summary 마지막 줄 | agent workflow 설명 | **3축 예고** — 다음 섹션이 이 문장을 받는다 |
| 일하는 방식 섹션 | 별도 존재 | How I Work에 흡수 (중복 제거) |
| claim 추적 | 섹션별 산재 | **부록에 축별 매핑** (본문에는 넣지 않음) |

### 초안 과정에서 되돌린 것

v4 초안 1차의 두 결정을 Codex 교차 리뷰 후 철회했다. **기록으로 남긴다 — 왜 되돌렸는지가 다음 판단의 재료다.**

| 1차 결정 | 철회 이유 |
| --- | --- |
| How I Work 16 bullet | 인벤토리를 없앤다면서 같은 claim을 추상 축 아래 **다시 나열**했다. Summary·Career·Selected Projects와 4중 중복 → **3문장으로 축소** |
| Selected Projects 1건 | 리서치가 비판한 건 "weekend experiments 별도 섹션"이지 섹션 자체가 아니다(상한 5개). 1건이면 **"강한 프로젝트가 하나뿐"**으로 읽힌다 → **2건 복원** |

## 남은 작업

### ✅ 선행 완료 (2026-08-09) — 축 2 성립

| 작업 | 결과 |
| --- | --- |
| `centurion.test-ci-foundation` 분리 | 승격 (`led`/`high`) |
| `nexus.domain-audit-governance` 분리 | 승격 (`contributed`/`high` — boundary 준수) |
| `centurion.async-migration` 신설 | 승격 — Git 실측으로 Unverified 해제 |
| 기존 claim statement 축소 | `bay-async-backend`·`backend-architecture` 동시 축소, 중복 없음 |

claim registry **39 → 42건**. 축 2가 2개 → **4개 프로젝트** 교차.

### 🟡 남은 것

1. **화면 반영 후 6초/30초 테스트** — 헤더+Summary로 "어떤 엔지니어인가" 답이 나오는지, How I Work까지 읽고 그 답이 **선명해지는지 흩어지는지**. 리서치가 제시한 실제 판단 시간 기준이다.
2. **`medisolve-admin.*` 복원 시 배치** — Git history 대조로 `public: true` 회복되면 축 2(커넥션 풀 원인 분석)에 넣는다. 축 2 보강 후보 중 하나다.
3. **A4 2장 (PDF 출력 시)** — [content-contract Acceptance Gate 5](../../content-contract.md). 웹은 스크롤이라 직접 제약이 아니다. PDF 파이프라인이 v0·v1 시절 것이라 재생성이 선행돼야 한다.
4. **Career bullet의 3축 정렬 확인** — 변경 요약에서 이 항목을 뺐다. 현재 Career bullet은 프로젝트 서술 그대로이며, 3축 언어로 다시 쓸지는 화면 반영 후 판단한다. **무리하게 맞추면 또 다른 억지 배치가 된다.**

### 판단 기준 — 다음에 같은 실수를 막기 위해

이번 초안에서 두 번 과교정했다. 공통 원인은 **"규칙을 지키려다 사실을 비틀었다"**는 것이다.

- 축에 맞추려고 `say-realtime-ai`(안정화 작업)를 판정 장치로 배치했다
- 인벤토리를 없애려고 프로젝트를 1건까지 줄였다
- evidence가 "예방 설계"라고 명시한 것을 "전환"으로 바꿔 썼다

**축은 사실을 설명하는 도구지 사실을 재단하는 틀이 아니다.** 축에 안 맞는 claim은 축에 넣지 않는다 — 부록의 "축에 배치하지 않는 claim" 목록이 그 자리다.

---

## 부록 — 축별 claim 매핑

**이력서 본문에 넣지 않는다.** How I Work를 3문장으로 줄이면서 claim 추적이 끊겼기 때문에, 작성자가 "이 축의 근거가 무엇인가"를 확인할 수 있도록 남긴다.

### 1. 문제의 경계를 다시 잡는다

`thready.rebuild-decision-execution` · `thready.backend-rebuild` · `thready.measurement-correction` · `centurion.bay-async-backend` · `nexus.backend-architecture` · `career.ai-pm-backend-continuity`

*보강 후보*: `centurion.async-migration` (Celery→TaskIQ, 검증 완료)

### 2. 측정과 게이트로 판정 가능하게 만든다

`thready.quality-criteria-system` · `thready.corpus-measurement` · `thready.falsification-log` · `thready.production-operation-quality` · `thready.release-operation` · `mediness.product-operations`

`centurion.test-ci-foundation` · `nexus.domain-audit-governance` ← **2026-08-09 승격**

**4개 프로젝트(centurion · mediness · nexus · thready)** — 성립.

*추가 후보*: `medisolve-admin.pool-stabilization`(Git history 대조로 복원 시)

*제거함(2026-08-09)*: `centurion.say-realtime-ai`(안정화 작업이지 판정 장치가 아님) · `thready.qa-reopen-reduction`(결과이지 장치가 아님 — Summary·Career가 소유)

### 3. 해결을 표준과 자동화로 확장한다

`be-template.backend-standard` · `be-template.team-leverage` · `be-template.agent-context` · `mediness.daily-briefing` · `career.thedaylabs-freelance` · `centurion.shared-infra`

**4개 프로젝트** — 성립.

*제거함(2026-08-09)*: `infra.company-azure-ownership` · `nexus.terraform-infra`. **IaC 소유 자체는 "팀이 쓰게 만들었다"는 증거가 아니다.** runbook·문서화가 statement에 명시된 `centurion.shared-infra`로 교체했다.

### 축에 배치하지 않는 claim

`career.tenure` · `career.medisolve-role-evolution` · `career.sellercanvas-product-system` · `career.memento-payment` · `career.tellingme-backend-infra` · `centurion.day-product-integration` · `centurion.ray-backend` · `centurion.sso-session` · `centurion.say-realtime-ai` · `infra.company-azure-ownership` · `nexus.terraform-infra` · `credentials.*`

→ Summary·Career·Credentials가 소유한다. **모든 claim을 축에 욱여넣지 않는다.**
