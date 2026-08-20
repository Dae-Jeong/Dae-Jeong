---
type: portfolio-case
case: thready
title: Thready의 0→1 제품화와 full-stack 구축·운영
resume_tag: THREADY
origin: MediSolve AI · 2025.04 —
claim_ids:
  - thready.product-zero-to-one-contribution
  - thready.frontend-product-delivery
  - thready.prototype-to-user-operation
  - thready.subscription-revenue-band
  - thready.backend-rebuild
  - thready.rebuild-decision-execution
  - thready.qa-reopen-reduction
  - thready.generation-quality-system
  - thready.agent-pipeline-design
  - thready.threads-market-outcome-design
  - thready.labeling-corpus-workbench
  - thready.hook-rubric-experiment
  - thready.ai-service-boundary
  - thready.ai-service-migration
  - thready.ai-replica-outbox
  - thready.release-operation
claim_strength: mixed (product/frontend led · backend/rebuild/system owned · revenue contributed)
---

## Executive Summary

고객이 Threads 콘텐츠를 만들고 성과를 판단할 때 겪는 문제를 제품 요구로 구체화하고, market data·생성 평가·backend·frontend·QA·release·operation을 실제 사용자 운영까지 연결했습니다. 초기 prototype 이후 Thready의 0→1 제품화와 FastAPI backend 전환을 주도하고 Next.js의 핵심 사용자·관리 workflow도 직접 개발했으며, 제품은 2026년 8월 기준 월 약 800만~1,000만원의 구독료 매출이 발생하고 있습니다. 매출은 팀·제품의 결과이며 개인의 단독 인과로 주장하지 않습니다.

## My Scope

- 고객 문제와 market data를 제품 기능·backend contract로 구체화
- 신규 FastAPI backend architecture·구현, cutover 이후 개발·운영 전담
- Next.js 콘텐츠 생성·가져오기·예약·발행·dashboard·관리 workflow 직접 구현·운영
- 생성 품질 기준, AI service boundary, data migration, release·QA 운영
- 초기 prototype frontend·frontend 전체·design·acquisition의 단독 ownership은 주장하지 않음

## Problem And Constraints

초기 제품은 빠른 검증에는 충분했지만, 기능이 늘수록 domain 의존성과 회귀 위험이 커졌습니다. 콘텐츠 품질 역시 프롬프트 감각에 의존해 무엇을 개선했는지 반복 검증하기 어려웠습니다. 제품을 멈추지 않은 채 backend를 교체하고, 실측 데이터를 기능과 평가 기준으로 바꾸며, AI 실행부를 제품 원장과 분리해야 했습니다.

## Decision And Alternatives

- 기존 backend를 계속 부분 수정하기보다 backend 범위만 parallel rebuild하고 검증 harness를 먼저 구성했습니다.
- Threads URL 기준 게시물 최신 상태 13.1만 행과 시계열 관측 318만 행을 분석해 콘텐츠 outcome 후보를 설계했습니다.
- 정제 corpus 약 11.1만 게시글과 18.5만 작성자 이어쓰기를 독립 labeling boundary로 이관하고, 20,256건 hook-quality 분석의 8축 rubric은 실험용 writer prompt·LLM judge에 반영했습니다.
- 제품 정책·원장은 product backend가, 생성 lifecycle·실행 상태는 AI application이 소유하도록 application·DB를 분리했습니다.

## System Design And Implementation

diagram: 고객 문제·시장 관측 -> 제품 판단 -> Next.js frontend -> FastAPI backend -> 생성·평가 pipeline -> QA·release -> 실제 사용자 운영

diagram: product backend (policy·owner) -> owner mutation + Outbox -> relay retry -> authenticated HTTP -> AI application (generation lifecycle) -> AI DB

- typed prompt builder·evaluation loop·관측 logging으로 생성 품질을 비교 가능한 대상으로 구성
- planner·writer 역할 분리와 falsification 기록으로 잘못된 규칙의 반복을 제한
- AI application 분리 과정에서 생성 이력 2,616건·품질 snapshot 795건·실행 추적 7,111건을 migration하고 count·MD5 fingerprint·FK·API E2E로 검증
- Transactional Outbox, lease 재점유, delivery version·attempt fencing, idempotent consumer, terminal failure 보존으로 전달 실패와 중복 실행의 수렴 경계 구현

## Failure Modes And Operation

- 재구축 자체가 새 결함을 만들 수 있어 validation harness를 먼저 두고 cutover 전후 QA reopen 비율이 26%p 낮아진 것을 확인했습니다. 단일 원인으로 과장하지 않습니다.
- AI application 전달은 exactly-once가 아니라 retry·version fence·멱등 consumer로 수렴시키며, 최대 재시도 뒤 실패를 보존합니다.
- corpus 전체를 LLM으로 분석하거나 모델을 학습했다는 주장은 하지 않습니다. 11.1만 corpus productization과 20,256건 rubric 실험은 별도 근거입니다.
- 월 구독료 매출은 제품·팀 outcome이며 backend 재구축이나 특정 기능 하나의 직접 성과로 귀속하지 않습니다.

## Evidence, Result, And Limits

- 초기 prototype 이후 실제 사용자 운영까지 backend 전환·release·QA·운영 주도
- Next.js 핵심 사용자·관리 workflow 직접 구현·운영
- 2026.08 기준 월 약 800만~1,000만원 구독료 매출이 발생하는 유료 제품
- backend rebuild 작업 36시간, QA reopen 비율 26%p 감소
- STG data migration 2,616 / 795 / 7,111건과 count·MD5·FK·API E2E 검증
- local corpus workflow 111,091 posts / 185,475 continuations, 20,256건 8축 rubric 실험

## Stack

Next.js · TypeScript · FastAPI · PostgreSQL · Redis · LLM · Transactional Outbox · Terraform · Azure
