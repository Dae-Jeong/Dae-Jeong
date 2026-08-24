---
type: portfolio-case
case: thready
title: 고객 문제에서 유료 운영까지 이끈 Thready와 backend 재구축
resume_tag: THREADY
origin: MediSolve AI · 2025.04 —
claim_ids:
  - thready.product-zero-to-one-contribution
  - thready.frontend-product-delivery
  - thready.prototype-to-user-operation
  - thready.subscription-revenue-band
  - thready.ad-revenue-experiment
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

고객이 Threads 콘텐츠를 만들고 성과를 판단할 때 겪는 문제를 기능·품질 기준으로 바꾸고, 기획·QA·마케팅과 실제 고객이 결제하는 유료 제품으로 만들었습니다. 제품 판단부터 구현·출시·운영까지 연결하기 위해 Next.js 핵심 workflow를 직접 만들고, 빠른 기능 검증 중심의 초기 backend를 인계받아 팀이 운영할 수 있는 FastAPI 구조로 재구축한 뒤 제품 원장과 AI 실행 상태의 소유권을 분리했습니다. 고객 결제는 팀·제품의 결과이며 정확한 매출 band는 공개하지 않습니다.

public_visuals:
  - `app/fe/app/portfolio/thready-runtime-diagram.tsx`

visual_language: 기존 Azure topology와 같은 code-native reference architecture. 한국어 책임명과 영문 기술명을 함께 쓰며 product backend와 독립 AI application·DB를 하나의 current STG·Prod runtime으로 표시하고, migration rehearsal만 STG 검증 범위로 분리

## My Scope

- 고객 문제와 market data를 제품 기능·backend contract로 구체화
- 신규 FastAPI backend architecture·구현, cutover 이후 개발·운영 전담
- Next.js 콘텐츠 생성·가져오기·예약·발행·dashboard·관리 workflow 직접 구현·운영
- 생성 품질 기준, AI service boundary, data migration, release·QA 운영
- 초기 prototype frontend·frontend 전체·design·acquisition의 단독 ownership은 주장하지 않음

## Problem And Constraints

인계받은 초기 backend는 빠른 기능 검증 중심으로 만들어져, 기능이 늘수록 domain 의존성과 회귀 위험이 커졌습니다. 콘텐츠 품질 역시 프롬프트 감각에 의존해 무엇을 개선했는지 반복 검증하기 어려웠습니다. 제품을 멈추지 않은 채 backend를 교체하고, 실측 데이터를 기능과 평가 기준으로 바꾸며, AI 실행부를 제품 원장과 분리해야 했습니다.

## Decision And Alternatives

- 기존 backend를 계속 부분 수정하기보다 backend 범위만 parallel rebuild하고 검증 harness를 먼저 구성했습니다.
- AI는 기존 코드 분석과 반복 구현에 활용하고, 아키텍처·검증 기준·작업 범위·cutover 시점은 직접 판단했습니다.
- 최근 1년 내 게시된 Threads 공개 콘텐츠를 중심으로 반응 추이를 분석해 콘텐츠 outcome 후보를 설계했습니다.
- 정제 corpus와 작성자 이어쓰기를 독립 labeling boundary로 이관하고, hook-quality 분석에서 정리한 rubric은 실험용 writer prompt·LLM judge에 반영했습니다.
- 제품 정책·원장은 product backend가, 생성 lifecycle·실행 상태는 AI application이 소유하도록 application·DB를 분리했습니다.

## System Design And Implementation

diagram: Browser -> Next.js on Vercel -> FastAPI product API on Azure App Service -> product PostgreSQL·Object Storage -> external content API

diagram: product backend (policy·owner) -> authenticated HTTP -> AI application·AI DB; owner mutation + Outbox -> relay retry -> delivery version fence

diagram: GitHub -> GitHub Actions -> Vercel / Container Registry -> Azure App Service -> observability

- 공개 구조도는 현재 운영 중인 product backend·AI application·data·delivery 경계와 STG migration rehearsal을 한 code-native component에서 구분한다.
- `Product Backend`는 제품 정책·원장과 동일 transaction의 Outbox를, `AI Application`은 generation lifecycle·실행 상태·active replica를 소유한다.
- 비동기 전달의 핵심은 같은 transaction의 Outbox, retry, delivery version fence로 요약하고 상세 복구 단계는 본문에서 설명한다.
- 하단에는 GitHub Actions 기반 FE·backend 배포와 STG migration 검증, 운영 관측 경계를 분리한다.

- typed prompt builder·evaluation loop·관측 logging으로 생성 품질을 비교 가능한 대상으로 구성
- planner·writer 역할 분리와 falsification 기록으로 잘못된 규칙의 반복을 제한
- AI application 분리 과정에서 생성 이력 2,616건·품질 snapshot 795건·실행 추적 7,111건을 migration하고 count·MD5 fingerprint·FK·API E2E로 검증
- Transactional Outbox, lease 재점유, delivery version·attempt fencing, idempotent consumer, terminal failure 보존으로 중복·지연·역순 전달에도 AI replica가 최신 원장 상태로 수렴하도록 구현

## Failure Modes And Operation

- 재구축 자체가 새 결함을 만들 수 있어 validation harness를 먼저 두고 cutover 전후 QA reopen 비율이 26%p 낮아진 것을 확인했습니다. 단일 원인으로 과장하지 않습니다.
- AI application 전달은 exactly-once가 아니라 retry·version fence·멱등 consumer로 수렴시키며, 최대 재시도 뒤 실패를 보존합니다.
- corpus 전체를 LLM으로 분석하거나 모델을 학습했다는 주장은 하지 않습니다. corpus productization과 rubric 실험은 별도 근거이며, 운영 지표가 production prompt로 자동 환류된다고 표현하지 않습니다.
- 월 구독료 매출은 제품·팀 outcome이며 backend 재구축이나 특정 기능 하나의 직접 성과로 귀속하지 않습니다.
- 광고 적용은 구독 외 수익원을 검증하는 다음 실험입니다. 아직 광고 매출·전환 성과가 없어 현재 결과와 분리해 `NEXT · 운영 데이터 수집 중`으로만 표현합니다.

## Evidence, Result, And Limits

- 초기 prototype 이후 실제 사용자 운영까지 backend 전환·release·QA·운영 주도
- Next.js 핵심 사용자·관리 workflow 직접 구현·운영
- 실제 고객이 결제하는 유료 제품 운영 · 제품·팀 outcome
- 광고 기반 수익 모델 검증 시작 · 운영 데이터 수집 중 (성과 미집계)
- backend rebuild 작업 36시간, QA reopen 비율 26%p 감소
- STG data migration 2,616 / 795 / 7,111건과 count·MD5·FK·API E2E 검증
- 최근 1년 내 게시된 공개 콘텐츠 중심의 분석과 독립 labeling workflow, rubric 기반 생성·평가 실험

## Public Disclosure Boundary

- 공개 이력서·포트폴리오·도식에는 corpus·observation·experiment의 정확 건수를 노출하지 않습니다.
- 공개 문구는 `최근 1년 내 게시된 Threads 공개 콘텐츠를 중심으로`로 고정합니다. 전체 corpus가 최근 1년으로만 구성됐거나 1년 동안 수집했다는 뜻으로 확대하지 않습니다.
- market evidence, 기술 구조, 매출 사이에 단일 직접 인과를 주장하지 않습니다. 매출은 제품·팀 outcome으로 분리합니다.
- 운영 피드백은 자동 학습이나 production prompt 자동 갱신이 아니라 사람이 다음 우선순위를 정하는 입력으로 표현합니다.

## Stack

Next.js · TypeScript · FastAPI · PostgreSQL · Redis · LLM · Transactional Outbox · Terraform · Azure
