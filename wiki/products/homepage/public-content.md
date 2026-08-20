---
type: product-content
title: Homepage Public Content
description: Homepage hero, bio, and section-level public-safe canonical copy.
timestamp: 2026-08-21
tags: [homepage, public, branding]
claim_ids: [thready.product-zero-to-one-contribution, thready.frontend-product-delivery, thready.subscription-revenue-band, thready.backend-rebuild, thready.qa-reopen-reduction, thready.generation-quality-system, centurion.bay-async-backend, centurion.say-realtime-ai, be-template.backend-standard, be-template.agent-context, mediness.product-operations]
---

# Homepage Public Content

## Hero

Tech Lead · Backend Engineer · AI Product Systems

> 아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.

`Maker`는 브랜드 정체성이고, 검색·채용 역할은 `Tech Lead · Backend Engineer`다. 실제 전문성은 FastAPI 기반 product backend, AI generation quality, async/realtime processing, Azure/Terraform 운영 사례로 증명한다.

## Navigation Order

site IA([2026-07-15 설계](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md)) 기준.

1. Home(`/`): category와 대표 ownership
2. Resume(`/resume`): A4 master + PDF
3. Portfolio(`/portfolio`): 문제·접근·구현·운영 깊이
4. Blog(`/blog`): 판단 과정·운영 경험 — 글 0으로 시작 가능, evidence·public-safety gate 통과한 글만 게시
5. Labs(`/labs`): 기능·서비스 관문

Agent Workflow는 별도 nav가 아니라 Home/case 서술의 differentiator로 녹인다.

## Proof Order

1. Backend systems ownership
2. AI product runtime and quality system
3. Async/realtime and infra-aware execution
4. Agent-readable engineering workflow

## Selected Proof

- Thready: 제품 운영 리드와 backend·AI·핵심 frontend 직접 구현 — 제품은 2026.08 기준 월 약 800만~1,000만원의 구독료 매출 발생
- Thready backend: 기존 frontend를 유지한 병렬 재구축·validation harness·cutover — 같은 기준의 QA 이슈 재오픈 비율 26%p 감소
- Centurion(피부과 운영 AI 메디컬 플랫폼): 제품 시작 시점부터 구축 — 주문·재고 async backend 구축 주도와 realtime AI backend 공동 주 기여
- BE Template: 조직 표준 FastAPI template 설계·구축 전담과 agent context system
- Agent Workflow: 제품 운영 pipeline·release gate와 daily briefing agent

대표 proof의 문구와 강도는 [claim registry](../../evidence/claims/README.md)에서 선택한다. case 상세는 [portfolio library](../portfolio/cases/README.md)를 연결하고 이 문서에 복제하지 않는다.

## Public Guardrails

- primary title을 `Backend Architect`, `AX Engineer`, `AI Agent Engineer`로 교체하지 않는다.
- provider, 고객사, 팀원 실명과 private system detail을 공개하지 않는다.
- 검증되지 않은 수치나 business outcome을 추가하지 않는다.
- fake online status, 가짜 링크, 내부 설계 메모를 public UI에 노출하지 않는다.

Source: [identity](../../profile/identity.md), [capabilities](../../profile/capabilities.md), [public safety](../../rules/public-safety.md)

Resume expression SoT: `app/fe/app/resume/resume-view.tsx` · contract: [resume README](../resume/README.md)
