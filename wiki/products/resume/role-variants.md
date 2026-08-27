---
type: product
title: Role Resume Variants
description: 공통 이력서 틀에서 직군별로 성과·근거·기술 순서를 바꾸는 local draft contract.
timestamp: 2026-08-26
tags: [resume, role, draft, product, backend, ai, ax]
---

# Role Resume Variants

직군별 이력서는 새로운 경력을 만드는 문서가 아니다. 동일한 public claim 중 채용사가 먼저 확인할 성과를 골라 소개·경력 bullet·대표 사례·기술 순서를 바꾼다.

## Current Drafts

| Local route | 지원 관점 | 첫 번째로 증명할 결과 |
| --- | --- | --- |
| `/resume/product-owner` | Product Ownership | 고객 문제·우선순위, 유료 제품 운영, 기획→출시 연결 |
| `/resume/backend` | Backend Engineer | 기술 범위·전환 판단, transaction·migration·async failure·authorization 경계 |
| `/resume/ai-product-backend` | AI Product Backend | 제품 원장과 AI 실행 상태 분리, 실데이터 migration, 품질 평가 |
| `/resume/ax-fde` | AX / Forward Deployed Engineer | 고객·현장 문제를 제품과 production system으로 바꾸고 적용·운영까지 연결 |

모든 route는 `draft`·`local`이다. 기본 `/resume`과 같은 claim boundary를 사용하되 직군별로 근거의 순서와 비중만 바꾼다. 문안 승인 전에는 직군별 PDF와 public link를 만들지 않는다. 각 route 전환부에는 해당 버전이 먼저 증명하는 세 가지 signal을 함께 표시한다.

## Shared Contract

- 공통 이력서는 `아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.`를 대표 소개로 유지한다. 역할별 local draft는 15초 안에 지원 직군이 드러나도록 해당 직군의 증명 문장을 먼저 두고, 메이커 관점은 경력과 성과의 연결 방식으로 보여준다.
- 공개 정체성은 `Tech Lead · Backend Engineer` 순서를 유지한다. Tech Lead는 별도 지원 관점으로 나누지 않고 Backend 지원본 안에서 기술 범위·전환 기준을 정하고 직접 구현한 책임으로 증명한다.
- Product variant의 `Product Ownership`은 지원 관점이다. 공식 `Product Owner` 경력으로 쓰지 않고 고객 문제·우선순위·제품 운영·직접 구현의 evidence로 증명한다.
- 회사 AX 구조는 설계 참여, 제품별 Decision→release 적용·운영은 리드, Backend Template은 직접 구축한 범위로 나눈다. Cloud/Delivery는 서비스 배포·환경 설정·기본 운영 경험으로만 둔다.
- AX/FDE는 `고객 문제 발견 → technical scoping → 직접 구축 → 현장 적용·운영 → 반복 가능한 실행 방식`을 전면에 둔다. 회사 AX는 이 경험을 조직의 반복 실행 체계로 확장한 후속 증거이며, 고객·현장 delivery보다 먼저 놓지 않는다. Product Ownership·Backend·AI Backend·AX/FDE 네 관점은 동일한 경력과 claim을 서로 다른 읽기 순서로 보여준다.
- 연락처·프로필 사진·법적 경력 timeline·외부 활동·credentials는 공통으로 유지한다.
- 더데이랩스 프리랜서 선행 개발은 MediSolve AI 경력 row의 stage로 묶되 명칭·기간·고용형태를 숨기지 않는다.
- MediSolve AI 경력 row는 현재 제품·기술 성과를 먼저 보여주고, Memento AI 성과 인정과 더데이랩스 선행 개발을 설명하는 합류 경로는 마지막에 짧게 둔다.
- `36시간`, `5xx 0.3%`, Kubernetes, SLO·MTTR·가용성 개선과 개인 프로젝트는 role draft의 대표 근거에서 제외한다.
- Thready는 팀과 실제 고객이 결제하는 유료 제품으로 만든 경험을 제품·팀 outcome으로 먼저 보여주고, backend·AI·핵심 frontend는 그 제품을 완성한 직접 구현 범위로 설명한다. 정확한 매출 band와 광고 적용은 role resume에서 제외한다. NEXUS 예약률·고객사 매출은 기여 결과로 분리한다.
- AI migration 수치는 STG 범위이고, Outbox는 exactly-once가 아니라 retry·version fence를 통한 수렴 경계로 설명한다.

## Selection Order

| Variant | 대표 claim 묶음 순서 |
| --- | --- |
| Common | `thready.product-zero-to-one-contribution` + `thready.subscription-revenue-band` → `thready.backend-rebuild` → `centurion.bay-async-backend` → `thready.ai-service-migration` + `thready.ai-replica-outbox` → `be-template.backend-standard` |
| Product Ownership | `thready.product-zero-to-one-contribution` + `thready.subscription-revenue-band` → `mediness.product-operations` + `mediness.product-development-coordination-leverage` → `centurion.day-product-integration` → `career.sellercanvas-product-system` |
| Backend | `career.medisolve-role-evolution` → `thready.backend-rebuild` → `thready.ai-service-migration` + `thready.ai-replica-outbox` → `centurion.bay-async-backend` + `centurion.async-migration` → `career.memento-stripe-prepayment` → `be-template.backend-standard` + `be-template.team-leverage` |
| AI Backend | `thready.product-zero-to-one-contribution` + `thready.subscription-revenue-band` → `thready.ai-service-migration` → `thready.threads-market-outcome-design` → `centurion.say-realtime-ai` → `thready.backend-rebuild` |
| AX / FDE | `thready.product-zero-to-one-contribution` + `thready.subscription-revenue-band` → `nexus.hospital-operations-revenue-contribution` + `nexus.backend-architecture` → `career.sellercanvas-product-system` + `career.sellercanvas-enterprise-poc` → `mediness.company-work-ax-design` + `mediness.product-operations` → `be-template.agent-context` |

## Implementation And Update Flow

- 현재 화면 문안: `app/fe/content/resumes/role-variants.ts`
- 공통 renderer: `app/fe/app/resume/tailored-resume-view.tsx`
- stable facts and boundaries: `wiki/evidence/claims/*.yaml`
- 시장 요구 변화: `wiki/products/jd/reports/`

갱신 순서는 `시장/JD 변화 확인 → claim 검증·승격 → 직군별 선택 순서와 문안 수정 → workspace validator → build·browser A4 확인`이다.
