---
type: profile
title: Canonical Baseline
description: 여러 레이어에 흩어진 확정값을 한 화면에서 보는 통합 인덱스. canonical은 각 owner 문서가 갖는다.
timestamp: 2026-08-09
canonical: false
derived_from: [profile/career.md, profile/identity.md, evidence/claims/, evidence/clients.md, rules/recency-weighting.md, rules/public-safety.md]
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
| 1순위 직무 | **Backend Engineer** | [identity.md](identity.md) |
| 2순위 | AI Product Systems | |
| 3순위 | Agent-readable Engineering Workflow | |
| 연차 | **4년차** (인턴 제외 실무 47개월) | [career.md#tenure](career.md#tenure) · `career.tenure` |
| 거주지 표기 | 경기 안양시 (시 단위까지) | [public-safety.md](../rules/public-safety.md) |
| 공개 사이트 | https://marinkim.xyz | |
| GitHub | https://github.com/Dae-Jeong | |

**연차 규칙 (2026-08-09 확정)**: 인턴 기간을 제외한 실무 경력으로 산정하며 직군(AI Engineer·PM·Backend)은 합산한다 → **4년차**. 산정 근거는 [career.md#tenure](career.md#tenure)가 소유한다.

- **"Backend 기준 N년차"로 쓰지 않는다** — BE 구간만은 27개월(2년 3개월)이라 부풀리기로 읽힌다.
- **"6년째"·"5년차"는 쓰지 않는다** — 각각 시작 연도 기준·인턴 포함 수치다.
- AI 엔지니어·PM 경험은 배경으로 서술하되 현재 직무로 내세우지 않는다.

## 2. 경력 타임라인 (확정)

| 회사 | 기간 | 직무 | 고용형태 |
| --- | --- | --- | --- |
| MediSolve AI | 2025.04 ~ 재직중 | Backend Engineer | 정규직 |
| 더데이랩스 | 2025.02 ~ 2025.04 | Backend Engineer | 프리랜서 |
| Memento AI | 2024.10 ~ 2025.01 | Backend Engineer | 인턴 1개월 → 정규직 |
| STUDIO LAB | 2021.12 ~ **2023.12** | AI Engineer → PM → Backend Engineer | 정규직 |
| 아이즈솔 | 2020.08 ~ 2021.06 | AI Engineer (Vision) | 인턴 |

owner: [career.md](career.md) · 근거: [previous-career.md](../evidence/projects/previous-career.md)

**직급**: MediSolve에서 **기업부설연구소장 · Tech Lead · PO 역할 병행** (2026-08-08 user-confirmed).

**STUDIO LAB 직무 구간** (상세 기재 가능한 곳에서만):
AI Engineer 2021.12~2022.09 → PM 2022.10~2023.09 → Backend Engineer 2023.10~2023.12

**TellingMe(2024.01~2024.12)는 경력이 아니다.** 개인 프로젝트 섹션으로 분리 표기한다.

**2024.01~2024.10 구간**은 공백이 아니라 backend 전환 준비 기간이다 — TellingMe 개인 프로젝트 + OZ 코딩스쿨 백엔드 캠프(2024.06~10, 6개월). 두 근거 모두 공개 가능하다.

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

## 4. 대표 성과 (모든 산출물 공통)

1. AI 도구로 빠르게 구축된 생성 backend **전면 재구축** → QA 버그 재발률 **37% → 11%**, 재발 일평균 약 **94% 감소** (`thready.qa-reopen-reduction`)
2. 월 수만 건 규모 요청을 **HTTP 5xx 0.3% 수준**으로 운영 (`thready.production-operation-quality`)
3. **CES 2024 수상 제품의 PM 메인 역할** · 특허 등록 1건
4. Backend Engineer 합류 후 **기업부설연구소장·Tech Lead·PO 병행**
5. 스펙·이슈·릴리스 게이트를 **agent가 읽고 실행하는 workflow**로 설계·리드 (`mediness.product-operations`)
6. AI 생성 품질을 **자동 게이트·실측 분포·사람 판정 3층**으로 계량화 (`thready.quality-criteria-system`)

## 5. 서술 비중 (recency weighting)

| 시기 | 대상 | 경력 bullet | portfolio |
| --- | --- | --- | --- |
| 현재 (2025.04~) | MediSolve AI | **3~5** | 상세 2~3건 |
| 직전 (2024.10~2025.04) | 더데이랩스·Memento | 1~2 | 필요 시 1건 |
| 과거 (2021.12~2023.12) | STUDIO LAB | 1~2 | 1건 |
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

## 8. 미확정 (사용 금지)

| 항목 | 상태 |
| --- | --- |
| SellerCanvas POC 두 번째 브랜드 | 실명 불확실 — 산출물에서 개수를 못박지 않고 SPAO 건만 사용 |
| 채용 플랫폼 상세 주소 노출 범위 | 사람인에 동·호수까지 기재됨. 시 단위 축소 여부 미정 |
| medisolve-admin claim 3건 | **`confidence: low` · `public: false`** — self-reported 근거뿐이라 2026-08-09 강등. Git history·배포 설정 대조 시 상향하며, 그전까지 **공개 산출물에 쓰지 않는다** |
| 인증서 실물 | 미확인 — `credentials.ai-accuracy-certification` confidence medium 유지 |

## 9. 파생 산출물

| 산출물 | 상태 |
| --- | --- |
| [resume v3](../products/resume/master/v3/content.md) | DRAFT — 이 문서 기준 반영됨 |
| [resume v2](../products/resume/master/v2/content.md) | 이전 버전. v3 로 대체됐다 |
| `resume-view.tsx` (로컬) | **v3 반영 완료** (2026-08-09) — 연차 4년차 · MediSolve 3 bullet · 개인 프로젝트 분리 · CES 를 Credentials 로 · KCL 인증 추가. 규칙 위반 0건 검증 |
| marinkim.xyz `/resume` | **배포 대기** — push 시 반영된다 |
| 채용 플랫폼 7곳 | [sync-spec](../backlog/platform-profile-consolidation/sync-spec.md) 기준 미적용 |
