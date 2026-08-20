---
type: product
title: Role Resume Variants
description: 공통 이력서 틀에서 직군별로 성과·근거·기술 순서를 바꾸는 local draft contract.
timestamp: 2026-08-21
tags: [resume, role, draft, backend, ai, ax, platform]
---

# Role Resume Variants

직군별 이력서는 새로운 경력을 만드는 문서가 아니다. 동일한 public claim 중 채용사가 먼저 확인할 성과를 골라 소개·경력 bullet·대표 사례·기술 순서를 바꾼다.

## Current Drafts

| Local route | 지원 관점 | 첫 번째로 증명할 결과 |
| --- | --- | --- |
| `/resume/tech-lead-product` | Backend-first Tech Lead · Product Engineer | 고객 문제 정의, 제품 운영, 직접 구현, 유료 제품 outcome |
| `/resume/backend` | Backend Engineer | transaction·migration·async failure·authorization 경계 |
| `/resume/ai-product-backend` | AI Product Backend | 제품 원장과 AI 실행 상태 분리, 실데이터 migration, 품질 평가 |
| `/resume/ax-fde` | AX / Forward Deployed Engineer | 고객 문제를 실행 가능한 제품·기술 계약으로 전환 |
| `/resume/backend-platform` | Backend Platform · Cloud Operations | IaC 변경 안전성, 관측, 공통 backend 운영 기반 |

모든 route는 `draft`·`local`이다. 기본 `/resume`은 변경하지 않으며, 문안 승인 전에는 직군별 PDF와 public link를 만들지 않는다.

## Shared Contract

- 모든 variant는 `아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.`를 같은 소개 문장으로 사용한다. 지원 직군에 따라 바꾸는 것은 뒤의 기술 근거와 사례 순서다.
- 공개 정체성은 `Tech Lead · Backend Engineer` 순서를 유지한다. 지원 관점은 실제 과거 직함으로 표현하지 않는다.
- 연락처·프로필 사진·법적 경력 timeline·외부 활동·credentials는 공통으로 유지한다.
- 더데이랩스 프리랜서 선행 개발은 MediSolve AI 경력 row의 stage로 묶되 명칭·기간·고용형태를 숨기지 않는다.
- `36시간`, `5xx 0.3%`, Kubernetes, SLO·MTTR·가용성 개선과 개인 프로젝트는 role draft의 대표 근거에서 제외한다.
- Thready 구독료는 제품·팀 outcome으로, NEXUS 예약률·고객사 매출은 기여 결과로 분리한다.
- AI migration 수치는 STG 범위이고, Outbox는 exactly-once가 아니라 retry·version fence를 통한 수렴 경계로 설명한다.
- Platform draft는 순수 SRE 경력을 주장하지 않고 `Backend Platform · Cloud Operations` 범위로 제한한다.

## Selection Order

| Variant | 대표 claim 묶음 순서 |
| --- | --- |
| Tech Lead | `thready.product-zero-to-one-contribution` → `thready.ai-service-boundary` → `centurion.bay-async-backend` → `be-template.backend-standard` → `infra.terraform-state-safety` |
| Backend | `thready.backend-rebuild` → `thready.ai-service-migration` → `centurion.bay-async-backend` → `nexus.branch-access-boundary` → `career.memento-stripe-prepayment` |
| AI Backend | `thready.product-zero-to-one-contribution` → `thready.ai-service-migration` → `thready.threads-market-outcome-design` → `centurion.say-realtime-ai` → `thready.backend-rebuild` |
| AX / FDE | `thready.product-zero-to-one-contribution` → `mediness.product-operations` → `be-template.agent-context` → `nexus.hospital-operations-revenue-contribution` → `career.sellercanvas-product-system` |
| Platform | `infra.terraform-state-safety` → `infra.azure-observability` → `infra.ai-assisted-change-harness` → `be-template.backend-standard` → `thready.ai-replica-outbox` |

## Implementation And Update Flow

- 현재 화면 문안: `app/fe/content/resumes/role-variants.ts`
- 공통 renderer: `app/fe/app/resume/tailored-resume-view.tsx`
- stable facts and boundaries: `wiki/evidence/claims/*.yaml`
- 시장 요구 변화: `wiki/products/jd/reports/`

갱신 순서는 `시장/JD 변화 확인 → claim 검증·승격 → 직군별 선택 순서와 문안 수정 → workspace validator → build·browser A4 확인`이다.
