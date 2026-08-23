---
type: portfolio-case
case: be-template
title: 회사 AX 전환 — 제품과 회사 업무를 잇는 실행 체계
resume_tag: COMPANY AX
origin: MediSolve AI · 제품 운영·engineering system
claim_ids:
  - mediness.company-work-ax-design
  - mediness.product-system-design-participation
  - mediness.product-operations
  - be-template.backend-standard
  - be-template.team-leverage
  - be-template.agent-context
claim_strength: mixed (company AX design contributed · product operations led · backend system owned)
---

## Executive Summary

제품의 Decision·SPEC·Work Package·QA·release 흐름을 실제 제품에 적용해 운영하고, 여기서 쌓이는 결정·작업·검증 기록을 의사결정·회의·업무 배정·승인·후속 작업으로 넓히는 회사 AX 전환 구조 설계에 참여했습니다. MEDINESS 앱·데이터·도구는 담당 개발팀이 구현했고, 김대정은 제품 요구·운영 구조 설계에 참여하면서 제품별 적용·운영을 리드했습니다. Backend Template과 agent context는 직접 설계·구축했습니다.

## My Scope

- MEDINESS 제품 요구와 운영 흐름을 구체화하는 설계 참여 — `contributed`
- Decision·SPEC·Work Package·QA·release를 제품별로 적용하고 일정·이슈·릴리스를 운영 — `led`
- 의사결정·회의·업무 배정·승인·후속 작업을 agent-readable context와 human gate로 연결하는 회사 업무 AX 구조 설계 참여 — `contributed`
- 조직 표준 FastAPI template, ADR·runbook·agent context, automation skill 설계·구축 — `owned`
- 제품별 Git·CI/CD와 Azure·Vercel 배포 목적지 연결 — 서비스 배포 경험
- MEDINESS 서비스 앱·DB·도구 구현 — 담당 개발팀

## Problem And Constraints

제품 개발은 기획 문서, 작업 티켓, 코드, QA, 릴리스 기록에 나뉘고 회사 업무는 회의, 결정, 담당 배정, 승인, 후속 작업에 나뉩니다. 기록을 더 만드는 것만으로는 어떤 결정이 어떤 실행과 검증으로 이어졌는지 되짚기 어렵습니다.

Agent가 이 맥락을 읽는다고 해서 제품 판단과 사람의 책임까지 넘길 수는 없습니다. 제품 우선순위·아키텍처·업무 담당·QA·release 승인은 사람이 계속 소유하면서, agent는 탐색·초안·반복·근거 준비를 맡는 경계가 필요했습니다.

## Current Operation And AX Extension

```text
현재 제품 운영 — 실선
요청·기획·디자인 → Decision·SPEC → Work Package → BE·FE·QA
                 → Release Gate → Git·CI/CD → Azure·Vercel

회사 업무 AX 확장 설계 — 점선
회의·요청 ⇢ 의사결정 ⇢ 업무 배정 ⇢ 승인 ⇢ 후속 작업
```

- 제품의 Decision→release 흐름은 현재 실제 적용·운영 범위다.
- 회사 업무의 의사결정→후속 작업 흐름은 AX 확장 설계 범위다.
- 전사 AX 완료, 모든 회사 업무 통합, agent의 자율 의사결정·업무 배정·승인은 주장하지 않는다.

## Responsibility Boundary

| 영역 | 김대정의 역할 | 구현·운영 경계 |
| --- | --- | --- |
| MEDINESS 제품 요구·운영 구조 | 설계 참여 | 제품 요구와 운영 흐름을 구체화 |
| 제품별 실행 | 운영 리드 | Decision·SPEC·WP·QA·release 상태를 실제 제품에 적용 |
| 회사 업무 AX 확장 | 설계 참여 | 의사결정·회의·업무 배정·승인·후속 작업을 같은 맥락으로 연결 |
| Backend Template·agent context | 직접 설계·구축 | 아키텍처·계약·runbook·automation을 실행 가능한 기준으로 구현 |
| MEDINESS 앱·데이터·도구 | 담당 개발팀 | 플랫폼 서비스 구현은 담당 개발자들이 수행 |

## Engineering Execution Plane

새 backend project마다 architecture·DI·transaction·error contract와 agent context를 다시 정하지 않도록 반복되는 core를 FastAPI template로 고정했습니다. multi-tenancy·ID·authentication·storage처럼 제품마다 다른 선택은 generic framework에 숨기지 않고 명시적 option으로 분리했습니다.

```text
Stable Core
Router → Service → Repository
DI · transaction · error contract · contract test · Pyright
             ↓
Explicit Options
tenancy · ID · authentication · storage
             ↓
Shared Execution
ADR · convention · runbook · agent context · automation skill
```

사람과 agent는 같은 ADR·convention·runbook을 읽고 contract test·Pyright·automation skill로 같은 기준을 검증합니다. 이 기준을 통과한 변경은 Git·CI/CD를 거쳐 제품별 Azure·Vercel 실행 환경으로 전달됩니다. 배포 목적지는 실행 흐름의 끝점이며 이 case의 전문성 주장은 Backend Template과 agent context다.

## Evidence, Result, And Limits

- User-confirmed: 회사 업무 AX 구조 설계 참여와 제품별 적용·운영 리드의 역할 경계가 확인됨
- Source-backed: MEDINESS의 제품·조직·결정·회의·작업·배포·도구·human authority surface가 확인됨
- Code-backed: Backend Template의 layered architecture, DI, transaction, option matrix, contract test, automation skill이 확인됨
- Documentation-backed: ADR, convention, runbook, Hub-and-Spoke context routing이 확인됨
- Limits: MEDINESS 플랫폼 직접 구현·회사 AX 단독 설계·전사 전환 완료·agent 자율 의사결정·정량 생산성 개선은 주장하지 않음

## Stack

MEDINESS product workflow · FastAPI · SQLAlchemy 2.0 · dependency-injector · Alembic · Pyright · ADR · agent context · Git · CI/CD · Azure · Vercel
