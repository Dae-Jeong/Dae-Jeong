---
type: project-evidence
title: Centurion Evidence
description: CRM and ERP product backend evidence across BAY, SAY, DAY, RAY, SSO, and shared infra.
timestamp: 2026-07-11
source_roots: [workspace]
tags: [centurion, backend, realtime, async, infra, evidence]
---

# Centurion Evidence

Source locators: `workspace:BAY-BE-API`, `workspace:SAY-BE-API`, `workspace:PROTON`, `workspace:CENTURION_DAY`, `workspace:RAY-BE-API`, `workspace:SSO-BE-API`, `workspace:MEDISOLVEAI-INFRA`

DAY, BAY, RAY, SAY는 별도 제품이 아니라 Centurion CRM & ERP 제품을 구성하는 feature다.

## BAY Async Backend

- Code-backed: order, product, inventory API와 TaskIQ/RabbitMQ worker, inventory retry, API test infrastructure, Docker CI, onboarding documents가 확인됐다.
- Contribution boundary: 해당 backend 영역의 구축·설계 주도. Centurion 전체 backend ownership은 아니다.
- Unverified: 기존 이력서의 `Celery -> TaskIQ migration` 서사는 Git history 추가 검증 전 사용하지 않는다.

## SAY Realtime AI

- Code-backed: WebSocket consultation runtime, STT/LLM provider lifecycle, zombie session cleanup, reconnect race 처리, translation/audio pipeline, dashboard AI analysis가 SAY/PROTON cluster에서 확인됐다.
- Contribution boundary: SAY 공동 주 기여와 연계 영역 주도를 합친 `co-led` claim. provider 실명은 공개하지 않는다.

## DAY Product Integration

- Code-backed: reservation policy를 backend judgment, frontend display, QA seed/test, release documents로 연결한 변경이 확인됐다.
- Contribution boundary: BE/FE/QA 연결 리드. DAY 제품 전체 단독 구축은 아니다.

## RAY Backend

- Code-backed: facility status query, emergency call ordering, BAY integration, messaging/migration work가 확인됐다.
- Contribution boundary: 주 기여를 한 줄로 설명할 수 있으며 전담 구축 표현은 사용하지 않는다.

## SSO Session

- Code-backed: Redis/JTI session, duplicate login, E2E 관련 변경이 확인됐다.
- Contribution boundary: 담당·참여. SSO 전체 구축 표현은 금지한다.

## Shared Infra

- Code-backed: Azure/Terraform resource와 deploy/runbook documentation의 구축·운영 범위가 확인됐다.
- User-confirmed: 회사 infra repository 전체와 Azure infra 운영·관리를 담당한다.
- Contribution boundary: Centurion infra 구축·운영은 `owned`로 표현할 수 있다. 회사 전체 범위는 [Company Azure Infrastructure Evidence](infrastructure.md)를 따른다.

## Public Disclosure

- MediSolve AI, Centurion, DAY/BAY/RAY/SAY 명칭은 공개 가능하다.
- 고객사, provider, resource/security/cost detail은 공개하지 않는다.

## Rejected Or Unverified Claims

- Centurion 제품 전체 단독 구축
- SSO 전체 구축
- Celery에서 TaskIQ로 migration 완료
- production traffic과 안정성 수치
