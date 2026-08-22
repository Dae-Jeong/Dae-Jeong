---
type: profile
title: Canonical Baseline
description: 여러 레이어에 흩어진 확정값을 한 화면에서 보는 통합 인덱스. canonical은 각 owner 문서가 갖는다.
timestamp: 2026-08-21
canonical: false
derived_from: [profile/career.md, profile/identity.md, evidence/claims/, evidence/clients.md, rules/recency-weighting.md, rules/public-safety.md, app/fe/app/resume/resume-view.tsx]
tags: [profile, baseline, derived, index]
---

# Canonical Baseline

**이 문서는 canonical이 아니다.** 여러 레이어에 흩어진 확정값을 한 화면에서 보기 위한 **통합 인덱스**다.

각 사실의 owner는 아래 표의 링크가 가리키는 문서다. `rules/document-routing.md`의 Duplication Rule에 따라 **canonical 문장은 한 파일만 소유**하므로, 이 문서의 값과 owner 문서의 값이 어긋나면 **언제나 owner 쪽이 맞다.**

> ⚠️ 이 문서를 고쳐서 사실을 바꾸지 않는다. owner 문서를 고치고 여기에 반영한다.

## 1. 신원·포지셔닝

| 항목 | 확정값 | owner |
| --- | --- | --- |
| 이름 | 김대정 | [identity.md](identity.md) |
| 브랜드 정체성 | **Maker** | [identity.md](identity.md) |
| 공통 소개 문장 | **아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.** | [identity.md](identity.md) |
| 1순위 직무 | **Tech Lead** | [identity.md](identity.md) |
| 지원 역할 | **Backend Engineer** | [identity.md](identity.md) |
| 전문 영역 | AI Product Systems | [identity.md](identity.md) |
| 차별화 방식 | 제품과 회사 업무를 agent-readable context와 human gate로 연결하는 AX 실행 설계 | [identity.md](identity.md) |
| 연차 | **4년차** (인턴 제외 실무 48개월) | [career.md#tenure](career.md#tenure) · `career.tenure` |
| 거주지 표기 | 경기 안양시 (시 단위까지) | [public-safety.md](../rules/public-safety.md) |
| 공개 사이트 | https://marinkim.xyz | |
| GitHub | https://github.com/Dae-Jeong | |

**연차 규칙 (2026-08-09 확정)**: 인턴 기간을 제외한 실무 경력으로 산정하며 직군(AI Engineer·PM·Backend)은 합산한다 → **4년차**. 산정 근거는 [career.md#tenure](career.md#tenure)가 소유한다.

- **"Backend 기준 N년차"로 쓰지 않는다** — BE 구간만은 28개월(2년 4개월)이라 부풀리기로 읽힌다.
- **"6년째"·"5년차"는 쓰지 않는다** — 각각 시작 연도 기준·인턴 포함 수치다.
- AI 엔지니어·PM 경험은 배경으로 서술하되 현재 직무로 내세우지 않는다.

## 2. 경력 타임라인 (확정)

| 회사 | 기간 | 직무 | 고용형태 |
| --- | --- | --- | --- |
| MediSolve AI | 2025.04 ~ 재직중 | Tech Lead · Backend Engineer | 정규직 |
| 더데이랩스 | 2025.02 ~ 2025.04 | Backend Engineer | 프리랜서 |
| Memento AI | 2024.10 ~ 2025.01 | Backend Engineer | 인턴 1개월 → 정규직 |
| STUDIO LAB | 2021.12 ~ **2024.01** | AI Engineer → PM → Backend Engineer | 정규직 |
| 아이즈솔 | 2020.08 ~ 2021.06 | AI Engineer (Vision) | 인턴 |

owner: [career.md](career.md) · 근거: [previous-career.md](../evidence/projects/previous-career.md)

**공개 역할 표기**: MediSolve AI는 `Tech Lead · Backend Engineer`로 표기한다. Product Owner 성격은 제품 판단과 운영 책임으로 증명하고 별도 직함으로 병기하지 않는다. 기업부설연구소장 등재 사실은 evidence에만 보존하고 공개 산출물에는 사용하지 않는다.

**STUDIO LAB 직무 구간** (상세 기재 가능한 곳에서만):
AI Engineer 2021.12~2022.09 → PM 2022.10~2023.09 → Backend Engineer 2023.10~2024.01

**TellingMe(2024.01~2024.12)는 경력이 아니다.** 개인 프로젝트 섹션으로 분리 표기한다.

**STUDIO LAB 종료 후 Memento 시작 전(2024.02~2024.09)**은 backend 전환 준비 기간이다 — TellingMe 개인 프로젝트 + OZ 코딩스쿨 백엔드 캠프(2024.06~10). 두 근거 모두 공개 가능하다.

**표기하지 않는 공백**: 2021.06~2021.12 (서울 취업 준비). 이력서에 쓰지 않고 면접 답변으로만 사용한다.

## 3. 검증 자산 (시점 무관)

| 항목 | 확정값 | claim |
| --- | --- | --- |
| 특허 | 「페이지 출력 방법」 **등록 10-2898273** | `credentials.page-output-patent` |
| 수상 | CES 2024 Best of Innovation · AI 부문 (2023.12) | `credentials.ces-2024` |
| 인증 | 한국건설생활환경시험연구원(KCL) · AI 정확도 부문 인증 통과 | `credentials.ai-accuracy-certification` |
| 학력 | 우송대학교 게임멀티미디어 전공 2016.03–2021.08 **졸업** | `credentials.education` |
| 자격 | ADsP (2021.09) | `credentials.adsp` |

- **출원번호(10-2022-0130234)는 쓰지 않는다.** 등록번호만 사용한다.
- **인증은 "통과" 사실만.** 정확도 수치와 사용 모델(Yolo 등)은 쓰지 않는다. confidence medium — 인증서 실물 확인 시 상향.
- 검증 자산은 경력 본문에 묻지 않고 **Credentials 섹션에 독립 배치**한다 ([recency weighting](../rules/recency-weighting.md)).

## 4. Common Resume 대표 성과

1. Thready의 제품 운영을 리드하고 backend·AI·핵심 frontend와 typed prompt builder·LLM judge·평가 루프를 직접 구축. 제품·팀 outcome으로 **월 약 800만~1,000만원 구독료 매출**이 발생 (`thready.product-zero-to-one-contribution`, `thready.frontend-product-delivery`, `thready.generation-quality-system`, `thready.subscription-revenue-band`)
2. 기존 frontend contract를 유지한 채 FastAPI backend를 병렬 재구축하고 validation harness와 cutover를 운영. 동일 기준의 QA reopen 비율 **26%p 감소** (`thready.rebuild-decision-execution`, `thready.backend-rebuild`, `thready.qa-reopen-reduction`)
3. Centurion BAY에서 주문·재고 API와 실패 가능한 후속 작업을 분리하고, Celery→TaskIQ·RabbitMQ 전환, 상태·retry·terminal failure·수동 재처리 경계와 재현 가능한 test/CI 기반 구축 (`centurion.bay-async-backend`, `centurion.async-migration`, `centurion.test-ci-foundation`)
4. AI application·DB 분리, STG 실데이터 migration 검증, Transactional Outbox의 lease·attempt token·retry·delivery version fence·멱등 consumer·terminal failure 보존 기반 복구 경계 구축 (`thready.ai-service-boundary`, `thready.ai-service-migration`, `thready.ai-replica-outbox`)
5. 백엔드 2~3명이 여러 제품을 맡는 환경에서 FastAPI architecture·contract와 agent context를 조직 표준 template로 구축 (`be-template.backend-standard`, `be-template.team-leverage`, `be-template.agent-context`)
6. 회사 Azure 변경 범위를 6개 Terraform state로 분리하고 plan·live inventory·human apply gate로 파괴적 변경을 사전 차단 (`infra.company-azure-ownership`, `infra.ai-assisted-change-harness`, `infra.terraform-state-safety`)

## 5. 서술 비중 (recency weighting)

| 시기 | 대상 | 경력 bullet | portfolio |
| --- | --- | --- | --- |
| 현재 (2025.04~) | MediSolve AI | **3~5** | 상세 2~3건 |
| 직전 (2024.10~2025.04) | 더데이랩스·Memento | 1~2 | 필요 시 1건 |
| 과거 (2021.12~2024.01) | STUDIO LAB | 1~2 | 1건 |
| 초기 (2020.08~2021.06) | 아이즈솔 | **1 이하** | 없음 |

owner: [recency-weighting.md](../rules/recency-weighting.md)

**현재 소속이 경력 서술의 절반 이상**을 차지한다.

## 6. 쓰지 않는 것

### 과거 정량 (검증 여부 무관)

| 대상 | 미사용 | 대체 표현 |
| --- | --- | --- |
| 아이즈솔 모델 지표 | Yolo v5 99.8%, 초당 30장 | "안면 인식 기반 자동 출결 시스템 개발" |
| SellerCanvas 모델 | Yolo v8 99%, VGG 85% | "Vision AI 기반 의류 이미지 분석 모델 개발" |
| SellerCanvas 제품 개선 | 95% 단축, 이미지 15장→무제한 | "자동 생성 파이프라인 구축" |
| TellingMe 코드 규모 | 38/42/22/89 | "10명 팀의 백엔드 2명 중 주도" |

원칙: **과거는 "무엇을 했는가"까지, 현재는 "무엇이 바뀌었는가"까지.**

### 공개 금지

- 고객사 실명 → 마스킹 코드만 ([clients.md](../evidence/clients.md))
- STT/LLM provider 실명 (**클라우드 벤더 AWS·Azure는 명시 가능** — 회사별 사용 사실이 드러나야 한다)
- 팀원 실명, credential, private path, 내부 운영 수치, 프롬프트 원문
- 제3자 플랫폼 계정명·개별 게시물 지표
- 6축 품질 점수 수치 (자가 채점이라 외부 검증 지표로 오독됨)
- claim registry의 `forbidden_copy` 전체

owner: [public-safety.md](../rules/public-safety.md) · [evidence-policy.md](../rules/evidence-policy.md)

## 7. 고객사 마스킹 (요약)

| 시기 | 코드 |
| --- | --- |
| MediSolve (2025.04~) | `C 피부과` · `D 피부과` · `V 피부과` |
| Memento (2024.10~2025.01) | `M 피부과` |
| STUDIO LAB POC | `E 브랜드` |

실명 매핑은 [clients.md](../evidence/clients.md)가 단독 소유한다. **폐기 코드**: `A 피부과`, `M 브랜드` — 임의 문자였으며 사용 금지.

어드민 시스템(2025.10~) 대상은 **`D`·`C 피부과`**이거나 고객사를 생략한 "통합 관리 시스템"으로 서술한다.

## 8. 제한 유지

| 항목 | 상태 |
| --- | --- |
| SellerCanvas POC 두 번째 브랜드 | 사용자 기억상 이름이 S로 시작하지만 실명 미확정. 내부 단서로만 보존하고 산출물은 SPAO 한 건만 사용 |
| KCL 인증 | 인증 통과 사실만 공개. 인증서 실물 미확인 상태에서 `credentials.ai-accuracy-certification` confidence medium 유지 |

## 9. 파생 산출물

| 산출물 | 상태 |
| --- | --- |
| [resume v3](../products/resume/master/v3/content.md) | superseded draft — 현재 표현 source로 사용하지 않음 |
| [resume v2](../products/resume/master/v2/content.md) | 이전 버전. v3 로 대체됐다 |
| `app/fe/app/resume/resume-view.tsx` | **active expression SoT** (2026-08-13) — KO 웹 이력서의 문장·순서·강조를 소유 |
| marinkim.xyz `/resume` | **배포됨** — active expression SoT와 동일한 공개 표면 |
| 채용 플랫폼 7곳 | [sync-spec](../backlog/platform-profile-consolidation/sync-spec.md) 기준 미적용 |
