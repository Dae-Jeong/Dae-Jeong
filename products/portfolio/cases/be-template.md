---
type: portfolio-case
case: be-template
title: 조직 표준 backend 템플릿 — 아키텍처 표준과 agent 컨텍스트 시스템을 한 번에
resume_tag: BE TEMPLATE
origin: MediSolve AI · 조직 표준
claim_ids: [be-template.backend-standard, be-template.agent-context]
claim_strength: owned
---

## 문제

새 backend 프로젝트마다 구조·컨벤션·셋업을 반복하고 있었습니다. 그리고 AI agent가 프로젝트마다 컨텍스트를 처음부터 다시 학습하는 비용이 반복됐습니다.

## 접근

- 템플릿에 코드 표준만 담지 않고, **agent가 바로 작업할 수 있는 컨텍스트 시스템을 함께 내장** — 사람과 agent 모두를 위한 표준
- 결정은 ADR로 추적 가능하게, 변경 가능한 요소는 옵션으로 분리

## 구현

diagram: layered 아키텍처 (Router -> Service -> Repo) -> DI · @transactional · 타입 안전성(Pyright) -> ADR · 컨벤션 · runbook -> [soft] agent context system (계층적 context · skills)

- 응답 wrapper matrix, ErrorCode 도메인 prefix 체계, contract test
- 옵션화 설계 — 멀티테넌트 / ID 타입 / 인증 방식(JWT·SSO) / 스토리지(local·S3·Azure)
- 영역별 컨텍스트 자동 발동 + `init-project`·`add-domain`·`db-reset`·`local-setup` 자동화 skill

## 운영/결과

- Hub-and-Spoke 단방향 문서 라우팅 — 단일 진입점(README)에서 작업 의도별 source-of-truth로 분기
- 새 프로젝트의 구조 논의·셋업 비용을 템플릿이 흡수하도록 설계 — 도메인 추가·로컬 셋업 workflow 자동화

## Stack

FastAPI · SQLAlchemy 2.0 · dependency-injector · Alembic · Pyright · ADR · agent context system
