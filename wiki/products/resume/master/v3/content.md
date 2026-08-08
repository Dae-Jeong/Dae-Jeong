---
type: resume-content
title: Resume Master v3 Content (DRAFT)
description: recency weighting 적용 — 현재 소속 비중 확대, 초기 경력 압축, 검증 자산 분리. 연차 기준을 BE 5년차로 통일.
timestamp: 2026-08-08
tags: [resume, v3, content, korean, draft]
---

# Resume Master v3 Content — DRAFT

v2 대비 변경 축 4개:

1. **recency weighting 적용** ([rules/recency-weighting.md](../../../../rules/recency-weighting.md)) — MediSolve를 1 bullet → 4 bullet, 아이즈솔은 궤적 문장만
2. **연차 기준 통일** — "6년째 AI 제품"(혼용) → **BE 5년차**. 궤적은 연차가 아니라 서술로
3. **검증 자산 분리** — CES·특허를 경력 본문에서 Credentials로 승격, 경력 본문은 축약
4. **최신 실적 반영** — M 피부과 어드민, quality lab 체계 (registry 공백이던 영역)

⚠️ 표기는 확정 전. `[미검증]` 표기는 근거 확보 전까지 사용 금지 항목이다.

## Header

- Role: `Backend Engineer · AI Product Systems`
- Name: 김대정
- Positioning: AI 제품을 운영 가능한 시스템으로 만드는 백엔드 엔지니어
- Contact: email, phone(PDF only), GitHub, 경기 안양시

## Summary

연차 표기를 5년차로 바꾸되, 궤적은 "Vision AI로 시작"이라는 서술로 유지한다.

- Vision AI에서 시작해 AI 엔지니어·PM을 거쳐 **제품을 끝까지 책임지는 층으로 백엔드를 선택한 5년차 백엔드 엔지니어** (`career.ai-pm-backend-continuity`)
- AI 도구로 빠르게 구축된 생성 backend를 **전면 재구축해 QA 버그 재발률을 37%에서 11%로** 낮추고, 월 수만 건 규모 요청을 **HTTP 5xx 0.3% 수준**으로 운영 (`thready.rebuild-decision-execution`, `thready.qa-reopen-reduction`, `thready.production-operation-quality`)
- **CES 2024 Best of Innovation 수상 제품**의 PM 메인 역할 · **특허 등록 1건** (`career.sellercanvas-product-system`, `credentials.ces-2024`, `credentials.page-output-patent`)
- Backend Engineer 합류 후 **기업부설연구소장·Tech Lead·PO 역할 병행** (`career.medisolve-role-evolution`)
- 스펙·이슈·릴리스 게이트를 **agent가 읽고 실행하는 workflow**로 설계·리드 (`mediness.product-operations`)

## Capabilities

v2에서 한 항목만 교체한다 — AI Product Systems의 첫 bullet.

### AI Product Systems

- **AI 생성 품질을 자동 게이트·실측 분포·사람 판정 3층으로 나눠 계량**하고, 자동화가 닿는 층과 닿지 않는 층을 갈라 설계 (`thready.quality-criteria-system` ⚠️신규)
- typed prompt builder, LLM judge, 평가 루프, 관측 로깅 기반 생성 품질 시스템 구축 (`thready.generation-quality-system`)
- realtime AI 상담 backend의 세션 lifecycle과 provider 경계 안정화 공동 주 기여 (`centurion.say-realtime-ai`)

### Product Backend Ownership

- 주문·재고 API와 RabbitMQ·TaskIQ worker, retry, test·CI·onboarding 구축 주도 (`centurion.bay-async-backend`)
- **통합 관리 시스템 backend를 Clean Architecture 4계층으로 단독 설계·구축** (`muse-admin.backend-ownership` ⚠️신규)
- 병원 product backend monorepo의 service boundary와 migration·domain audit 주도 (`nexus.backend-architecture`)

### Async And Realtime / Infra-Aware Delivery / Engineering Standard / Agent-Readable Operations

v2 유지. 단 Engineering Standard에 계보 한 줄 추가:

- layered architecture·DI·ADR·convention·runbook 기반 조직 표준 FastAPI template 설계·구축 전담 (`be-template.backend-standard`)
- agent context system과 반복 작업 automation skill 내장 (`be-template.agent-context`)
- *(선택)* 조직 표준 template 설계는 이전 소속의 Nest.js 개발 템플릿 제작에서 이어진 두 번째 사례 — **과거를 단독 서술하지 않고 현재 항목의 계보로 붙인다** ([recency weighting](../../../../rules/recency-weighting.md) 예외 3)

## Career — recency weighting 적용

**변경 핵심**: MediSolve 1 bullet → 4 bullet. 나머지는 축약하거나 유지.

### MediSolve AI · Backend Engineer · 2025.04 — 현재

기업부설연구소장 · Tech Lead · PO 역할 병행 (`career.medisolve-role-evolution`)

- AI 콘텐츠 생성 backend **전면 재구축**과 cutover 이후 개발·운영 전담 — QA 버그 재발률 **37% → 11%**, 월 수만 건 규모를 **HTTP 5xx 0.3% 수준**으로 운영 (`thready.backend-rebuild`, `thready.qa-reopen-reduction`, `thready.production-operation-quality`)
- 피부과 운영 플랫폼의 **주문·재고 backend와 비동기 worker 흐름** 구축 주도, 실패 가능한 작업을 API 경계 밖으로 분리 (`centurion.bay-async-backend`)
- **통합 관리 시스템 backend 단독 구축** — Clean Architecture 4계층, Generic Repository, 커넥션 풀 원인 분석으로 5xx 해소 (`muse-admin.backend-ownership`, `muse-admin.pool-stabilization` ⚠️신규)
- **조직 표준 FastAPI template 설계·구축**과 agent context 내장, 릴리스 게이트 기반 제품 운영 리드 (`be-template.backend-standard`, `mediness.product-operations`)

### 더데이랩스 · Backend Engineer (프리랜서) · 2025.02 — 2025.04

- 현 MediSolve AI 대표와 협업 시작 — 초기 backend 구축과 개발팀 시스템·기준 수립, 창업과 함께 합류 (`career.thedaylabs-freelance`)

### Memento AI · Backend Engineer · 2024.10 — 2025.01

인턴 1개월 → 정규직 전환

- 예약·결제 backend의 **Stripe 선결제 도입**과 환불·마일리지·티켓 rollback 안정화 — 회사 폐업으로 재직 종료 (`career.memento-payment`)

### STUDIO LAB · AI Engineer → PM → Backend Engineer · 2021.12 — 2023.12

- SellerCanvas(생성형 AI 커머스 콘텐츠)의 **PM 메인 역할**로 제품 시스템 기획·구축 (`career.sellercanvas-product-system`)

> CES 수상·특허는 이 줄에서 빼고 **Credentials로 승격**한다. 경력 본문이 과거로 무거워지는 것을 막고, 검증 자산은 시점과 무관하게 보이게 하는 분리다.

### 아이즈솔 · AI Engineer (인턴) · 2020.08 — 2021.06

- Vision AI에서 시작한 AI product engineering 경력 (`career.ai-pm-backend-continuity`)

> 궤적을 잇는 최소 문장만. 성과·수치를 쓰지 않는다 ([recency weighting](../../../../rules/recency-weighting.md) 초기 경력 규칙).

## Personal Project

경력란에서 분리한다.

### TellingMe · 2024.01 — 2024.12

- Spring Boot backend와 AWS 배포·모니터링 리드 — **10명 팀의 백엔드 2명 중 주도**, iOS 정식 출시 (`career.tellingme-backend-infra`)

> v2는 경력란에 두되 "개인 프로젝트"로 표기했다. v3는 **섹션 자체를 분리**해 경력 타임라인에서 빼고, 2024.01~2024.10 구간을 설명하는 근거로 배치한다.

## Selected Projects

v2 3건 유지 + 1건 교체 검토.

- **Thready · AI 콘텐츠 생성 제품** — v2 유지. 단 「품질을 판정 가능한 대상으로」 축을 portfolio case에 추가 (`thready.quality-criteria-system`)
- **Centurion · 피부과 운영 AI 메디컬 플랫폼** — v2 유지
- **BE Template · Engineering Standard** — v2 유지
- *(신규 후보)* **M 피부과 어드민 · 통합 관리 시스템** — 백엔드 단독 구축, 30개 도메인. 진행 중이므로 진행형 표기

## Education And Credentials

검증 자산을 여기로 모은다.

- 우송대학교 게임멀티미디어 전공 · 2016.03 — 2021.08 (`credentials.education`)
- **CES 2024 Best of Innovation · AI 부문** — 수상 제품 참여 (`credentials.ces-2024`)
- **특허 등록 「페이지 출력 방법」 · 등록 10-2898273** (`credentials.page-output-patent`)
- ADsP 데이터분석 준전문가 · 2021.09 (`credentials.adsp`)
- **한국건설환경시험연구원 · AI 정확도 부문 인증 통과** (`credentials.ai-accuracy-certification`) — 정확도 수치와 사용 모델은 쓰지 않는다

## Open Items (확정 전)

1. **연차 표기 최종 확인** — "5년차"로 통일했다. BE 기준 산정(2020.08 아이즈솔 인턴 포함 여부)에 따라 4~5년차로 갈릴 수 있다
2. ~~[미검증] 항목 처리~~ → **해소 (2026-08-08): 과거 정량은 검증 여부와 무관하게 쓰지 않는다.**
   - 아이즈솔 Yolo v5 99.8%·초당 30장 → 미사용. "안면 인식 기반 자동 출결 시스템 개발"까지
   - SellerCanvas Yolo v8 99%·VGG 85%·제작시간 95% 단축·이미지 15장→무제한 → 미사용. **"Vision AI 기반 의류 이미지 분석 모델 개발"** 수준 서술만
   - TellingMe 38/42/22/89 → 미사용. 규모는 **"10명 팀의 백엔드 2명 중 주도"**로 대체
   - **예외 확정 (2026-08-08)**: 한국건설환경시험연구원 AI 정확도 인증은 Credentials에 넣는다. **"인증 통과" 사실만** — 정확도 수치와 사용 모델(Yolo 등)은 쓰지 않는다. `credentials.ai-accuracy-certification` 신설 (confidence medium, 인증서 실물 확인 시 high)
3. **신규 claim 승격** — `thready.quality-criteria-system`, `muse-admin.backend-ownership`, `muse-admin.pool-stabilization` 등 [claim 후보](../../../../evidence/projects/thready-quality-lab.md#claim-candidates) 문안 확정 필요
4. **A4 2장 검증** — MediSolve 4 bullet 확대분을 아이즈솔 축소·TellingMe 분리·STUDIO LAB 축약으로 상쇄했다. 실제 렌더 후 재확인 필요
5. **기업부설연구소장 표기 위치** — Summary와 Career 양쪽에 넣을지, Career에만 둘지

## v2 → v3 변경 요약

| 항목 | v2 | v3 |
| --- | --- | --- |
| MediSolve 서술 | 1 bullet | **4 bullet** |
| 아이즈솔 서술 | 1 bullet (동일 비중) | 궤적 문장만, 성과 없음 |
| TellingMe | 경력란 내 개인 프로젝트 | **별도 섹션 분리** |
| STUDIO LAB | CES·특허 포함 1 bullet | 본문 축약 + **검증 자산 Credentials 승격** |
| 연차 | "6년째 AI 제품" | **BE 5년차** |
| 직급 | Tech Lead·PO | **기업부설연구소장** 추가 |
| 신규 실적 | 없음 | M 피부과 어드민, quality lab 3층 체계 |
