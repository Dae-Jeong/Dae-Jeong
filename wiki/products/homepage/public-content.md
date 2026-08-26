---
type: product-content
title: Homepage Public Content
description: Homepage hero, bio, and section-level public-safe canonical copy.
timestamp: 2026-08-24
tags: [homepage, public, branding]
claim_ids: [thready.product-zero-to-one-contribution, thready.frontend-product-delivery, thready.subscription-revenue-band, thready.backend-rebuild, thready.qa-reopen-reduction, thready.generation-quality-system, centurion.bay-async-backend, centurion.say-realtime-ai, be-template.backend-standard, be-template.agent-context, mediness.company-work-ax-design, mediness.product-operations]
---

# Homepage Public Content

## Hero

Tech Lead · Backend Engineer · AI Product Systems

> 아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.

`Maker`는 브랜드 정체성이고, 검색·채용 역할은 `Tech Lead · Backend Engineer`다. 첫 근거는 고객 문제를 실제 매출이 발생하는 제품으로 만들고 운영한 경험이며, backend·AI·핵심 frontend는 그 제품을 직접 완성한 실행 범위로 증명한다.

## Navigation Order

site IA([2026-07-15 설계](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md)) 기준.

1. Home(`/`): category와 대표 ownership
2. Resume(`/resume`): A4 master + PDF
3. Portfolio(`/portfolio`): 문제·접근·구현·운영 깊이
4. Blog(`/blog`): 판단 과정·운영 경험 — 글 0으로 시작 가능, evidence·public-safety gate 통과한 글만 게시
5. Labs(`/labs`): 기능·서비스 관문

Agent Workflow는 별도 nav가 아니라 Home/case 서술의 differentiator로 녹인다.

## Proof Order

1. 고객 문제를 실제 매출이 발생하는 제품으로 만든 경험
2. 제품 운영과 backend·AI·핵심 frontend 직접 구현
3. Backend 재구축과 AI product runtime·quality system
4. Product·company AX work design과 async/realtime 실행

## Selected Proof

- Thready: 고객 문제 정의부터 기능 우선순위·출시·운영까지 리드하고, 제품에 필요한 backend·AI·핵심 frontend 직접 구현 — 팀과 함께 실제 고객이 결제하는 유료 제품으로 운영
- Thready backend: 기존 frontend를 유지한 병렬 재구축·validation harness·cutover — 같은 기준의 QA 이슈 재오픈 비율 26%p 감소
- Centurion(피부과 운영 AI 메디컬 플랫폼): 제품 시작 시점부터 구축 — 주문·재고 async backend 구축 주도와 realtime AI backend 공동 주 기여
- BE Template: 조직 표준 FastAPI template 설계·구축 전담과 agent context system
- Company AX: 제품 개발 흐름과 의사결정·회의·업무 배정·승인·후속 작업을 agent-readable context와 human gate로 연결하는 구조 설계 참여; 제품별 Decision→release 적용·운영 리드

대표 proof의 문구와 강도는 [claim registry](../../evidence/claims/README.md)에서 선택한다. case 상세는 [portfolio library](../portfolio/cases/README.md)를 연결하고 이 문서에 복제하지 않는다.

## Public Guardrails

- primary title을 `Backend Architect`, `AX Engineer`, `AI Agent Engineer`로 교체하지 않는다.
- provider, 고객사, 팀원 실명과 private system detail을 공개하지 않는다.
- 검증되지 않은 수치나 business outcome을 추가하지 않는다.
- fake online status, 가짜 링크, 내부 설계 메모를 public UI에 노출하지 않는다.

Source: [identity](../../profile/identity.md), [capabilities](../../profile/capabilities.md), [public safety](../../rules/public-safety.md)

Resume expression SoT: `app/fe/app/resume/resume-view.tsx` · contract: [resume README](../resume/README.md)
