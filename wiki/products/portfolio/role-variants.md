---
type: product
title: Role Portfolio Variants
description: 동일한 case library를 직군별 읽기 순서와 강조점으로 재조립하는 local portfolio contract.
timestamp: 2026-08-24
tags: [portfolio, role, draft, backend, ai, ax, platform]
---

# Role Portfolio Variants

직군별 포트폴리오는 새로운 사례나 성과를 만드는 문서가 아니다. [case library](cases/README.md)의 사실·수치·기여 범위는 그대로 두고, 직군마다 먼저 확인할 사례의 순서와 각 사례에서 읽을 기술 판단만 바꾼다.

## Local Drafts

| Local route | 지원 관점 | 먼저 보여주는 범위 |
| --- | --- | --- |
| `/portfolio/role/tech-lead-product` | Product-led Tech Lead · Product Engineer | 고객 문제·제품 판단·매출 outcome·직접 구현 |
| `/portfolio/role/backend` | Backend Engineer | 재구축·migration·비동기 복구·결제 보상 |
| `/portfolio/role/ai-product-backend` | AI Product Backend | AI 실행 경계·데이터 이전·생성 품질·realtime lifecycle |
| `/portfolio/role/ax-fde` | AX / Forward Deployed Engineer | 고객 문제·제품 규칙·agent-readable execution |
| `/portfolio/role/backend-platform` | Backend Platform Engineer | 공통 backend 기반·데이터 경계·비동기 복구 |

모든 route는 `draft`·`local`이며 production에서는 404와 `noindex`를 유지한다. 기본 `/portfolio`는 `Thready → Company AX → Centurion`을 primary, `Memento Payment`를 supporting으로 두는 공개용 master다.

## Assembly Contract

- 모든 variant는 공통 `Maker` brand line을 유지한다. Thready에서는 고객 문제를 실제 매출이 발생하는 제품으로 만든 경험을 먼저 보여주고, 지원 직군별로 그 뒤의 기술 근거·proof axis·case 순서만 바꾼다.
- `app/fe/content/role-catalog.ts`가 resume와 portfolio가 공유하는 5개 role slug·label을 소유한다.
- role pack은 headline·소개·proof axis·case slug·focus만 소유한다.
- 프로젝트 설명·수치·claim ID는 `app/fe/lib/cases.ts`, `app/fe/app/portfolio/case-dossier.tsx`, [case library](cases/README.md)를 재사용한다.
- `focus`는 같은 사실에서 이번 직군이 먼저 볼 판단을 가리키는 편집 문장이다. 새로운 결과나 더 강한 ownership을 추가할 수 없다.
- 모든 variant의 Thready 설명은 실제 고객이 결제하는 유료 제품 운영을 제품·팀 outcome으로 두고, 직접 책임진 Next.js·FastAPI·AI 구현, backend 재구축, BE–AI 경계를 실행 근거로 분리한다. 정확한 매출 band는 공개하지 않고 광고 적용은 성과가 없는 `NEXT`로만 유지한다. Backend variant는 AI 활용과 사람의 아키텍처·검증·cutover 판단을 함께 보여주고, AI·Platform variant는 STG 검증 범위를 Prod 완료로 확대하지 않는다.
- 기본 읽기와 PDF 변환은 개별 상세 route가 아니라 선택된 사례를 모두 펼친 하나의 긴 document route를 기준으로 한다.
- 사례 번호는 canonical case 번호가 아니라 각 role page의 읽기 순서로 다시 매긴다. case slug와 claim 연결은 바꾸지 않는다.

## Selection

| Variant | Case order |
| --- | --- |
| Tech Lead | Thready → Company AX → Centurion |
| Backend | Thready → Centurion → Company AX → Memento Payment |
| AI Backend | Thready → Centurion → Company AX |
| AX / FDE | Thready → Company AX → Centurion |
| Platform | Company AX → Thready → Centurion |

Company AX는 기존 `be-template` slug를 route compatibility를 위해 유지하는 primary dossier다. MEDINESS Product Operations는 별도 compact case로 반복하지 않고 Company AX 안에서 설계 참여·운영 리드·플랫폼 구현팀 경계를 나눠 보여준다. Backend Template은 같은 case의 직접 구축한 engineering execution plane이다. Memento Payment는 공통 master에서는 supporting이지만 Backend variant에서는 결제 상태 전이의 깊이를 보여주는 dossier로 승격할 수 있다. NEXUS·SellerCanvas는 현재 독립 V3 dossier가 없어서 다른 사례에 합성하지 않는다.

## Update Flow

1. 사실·성과 변경은 evidence와 stable claim에서 먼저 검증한다.
2. case library와 현재 portfolio 표현을 갱신한다.
3. 직군별로 case 순서와 focus만 다시 선택한다.
4. resume와 portfolio가 같은 role slug를 공유하는지 type check한다.
5. workspace validator·lint·build·browser·print를 검증한다.

현재 구현:

- pack: `app/fe/content/portfolios/role-variants.ts`
- renderer: `app/fe/app/portfolio/role/role-portfolio-view.tsx`
- route: `app/fe/app/portfolio/role/[role]/page.tsx`
- local switcher: `app/fe/components/site/review-launcher.tsx`
