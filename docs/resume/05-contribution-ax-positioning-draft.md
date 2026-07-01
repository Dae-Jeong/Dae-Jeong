---
type: positioning-draft
title: Contribution And AX Positioning Draft
description: First-pass framing for company project contribution, backend/infra capability, and AX-oriented agent workflow positioning.
timestamp: 2026-07-02
tags: [resume, contribution, backend, infra, ax, agent-workflow]
---

# Contribution And AX Positioning Draft

## Purpose

이 문서는 회사 프로젝트 기여도를 "내가 무엇을 만들었는가"에서 끝내지 않고, 새 이력서 홈페이지에서 아래 인상을 만들기 위한 1차 초벌이다.

> BE/Infra를 직접 구축해본 엔지니어가, AI agent를 개인 생산성 도구를 넘어 조직의 AX 문제 해결 방식으로 확장하고 있다.

이 포지셔닝은 단순히 "AI agent를 잘 쓴다"보다 강하다. backend, infra, product system을 직접 다뤄본 사람이 조직의 반복 병목을 이해하고, 그 병목을 agent-readable workflow로 바꾸려는 사람이라는 메시지를 만든다.

## Core Narrative

### Short Version

> 저는 병원 SaaS의 backend와 infra를 직접 구축하며 인증, 비동기 작업, 실시간 알림, 배포, 운영 문서화의 병목을 경험했습니다. 최근에는 이 경험을 바탕으로 AI agent를 단순 코딩 보조가 아니라, 조직의 요구사항, 문서, 코드, 디자인 handoff, 운영 절차를 연결하는 AX layer로 활용하는 데 관심을 두고 있습니다.

### Stronger Homepage Version

> 저는 FastAPI/NestJS 기반 병원 운영 SaaS와 Azure infra를 구축해온 backend engineer입니다. SSO, RabbitMQ/TaskIQ, SSE, Terraform, GitHub Actions 같은 시스템을 다루며 기술 문제보다 더 자주 반복되는 조직 문제를 봤습니다. 요구사항이 코드까지 정확히 전달되지 않고, 문서와 구현이 어긋나며, 팀원이 매번 context를 다시 복원하는 문제입니다. 그래서 AI agent를 코드 생성 도구가 아니라, 조직의 지식과 실행을 연결하는 AX layer로 보고 있습니다.

### English Version

> I build backend and infrastructure systems, then turn the operational lessons into agent-readable workflows. My interest in AI agents is not limited to coding assistance; I see them as an AX layer that connects requirements, documentation, code, design handoff, and operational procedures.

## Contribution Model

기여도는 code line count로 보지 않는다. 현재 포지셔닝에서는 아래 4축으로 판단한다.

| Axis | What It Proves | Evidence Examples | Resume Use |
| --- | --- | --- | --- |
| Backend Capability | 복잡한 domain/service boundary를 구현할 수 있음 | API, SSO, validation, repository/service layer, async worker, SSE | BE 실력의 기본 신뢰 |
| Infra Capability | 만든 시스템을 배포/운영 가능한 형태로 가져갈 수 있음 | Terraform, Azure, Docker, ACR, GitHub Actions, deploy docs | production 감각 |
| Product/System Thinking | 기술을 제품 운영 문제와 연결할 수 있음 | multi-brand, HQ/Branch, 병원 workflow, service isolation | senior/lead 인상 |
| Agent/AX Capability | 반복 병목을 agent-readable process로 바꿀 수 있음 | `AGENTS.md`, MCP, source-of-truth docs, task/report, OpenDesign | 차별점 |

## Project Contribution Draft

### 1. NEXUS / CENTURION_DAY

Contribution framing:

> Multi-brand hospital SaaS를 하나의 codebase와 독립 운영 구조로 다루는 backend/product system 구축 경험.

What I can claim now:

- FastAPI 기반 backend monorepo에서 `api-gateway`, `admin-api`, `homepage-api`, `shared` 경계를 다뤘다.
- 병원 브랜드별 독립 운영, HQ/Branch 권한 분리, 예약/상품/고객/콘텐츠 domain을 다루는 platform 구조를 정리했다.
- Router -> Schema -> Service -> Validator -> Repository -> Model 계층 규칙과 business validation ownership을 문서화했다.
- project `AGENTS.md`를 통해 backend/frontend/design/planning agent 역할과 ownership을 정리했다.

Contribution type:

- Backend Capability: High
- Product/System Thinking: High
- Agent/AX Capability: High
- Infra Capability: Medium, unless NEXUS-infra details are added

Resume copy:

> Multi-brand hospital SaaS의 backend monorepo와 service boundary를 설계/운영하며, 브랜드별 독립 운영과 HQ/Branch 권한 분리를 지원하는 platform 구조를 정리했습니다.

AX copy:

> 정책서와 제품 요구사항이 실제 화면/백엔드 구현까지 이어지도록 planning, design, backend agent의 역할과 산출물 경로를 `AGENTS.md`에 명시했습니다.

Needs verification:

- 내가 직접 구현한 domain/API 범위.
- NEXUS와 기존 `CENTURION_DAY`/DAYBEAU admin 사이의 정확한 관계.
- 공개 가능한 병원/브랜드명 범위.

### 2. SSO-BE-API

Contribution framing:

> 여러 서비스가 공유하는 인증/세션 정책을 중앙화한 backend architecture 경험.

What I can claim now:

- NestJS/Prisma/MySQL/Redis 기반 centralized SSO 구조를 다뤘다.
- JWT access/refresh rotation, Redis session/JTI validation, SessionGuard 흐름을 정리했다.
- duplicate login, device conflict, service group logout 정책을 설계/운영 맥락으로 설명할 수 있다.

Contribution type:

- Backend Capability: High
- Product/System Thinking: Medium-High
- Infra Capability: Medium
- Agent/AX Capability: Low-Medium, if limited to repo docs

Resume copy:

> NestJS/Prisma/Redis 기반 SSO에서 JWT rotation, Redis/JTI session validation, duplicate login policy를 통해 multi-service authentication 문제를 구조화했습니다.

AX copy:

> 인증 정책을 guard, interceptor, exception filter, session key 규칙으로 분해해 agent와 팀원이 같은 구조로 이해할 수 있게 문서화했습니다.

Needs verification:

- PR/commit 기준 직접 구현 범위.
- API Gateway 연동 범위.
- 운영 장애나 보안 이슈 개선 사례.

### 3. BAY-BE-API

Contribution framing:

> API request lifecycle에서 오래 걸리거나 실패 가능한 작업을 분리한 async backend 운영 경험.

What I can claim now:

- FastAPI/SQLAlchemy/MySQL 기반 BAY backend 구조를 다뤘다.
- TaskIQ/RabbitMQ 기반 async worker 구조가 확인된다.
- 알림톡과 inventory integration에 대해 separate broker/queue 구조를 설명할 수 있다.
- Polars 기반 Excel/data processing 의존성과 활용 흔적이 있다.

Contribution type:

- Backend Capability: High
- Infra Capability: Medium
- Product/System Thinking: Medium
- Agent/AX Capability: Medium, if docs/policy/onboarding flow is tied in

Resume copy:

> TaskIQ/RabbitMQ 기반 async worker로 알림톡 발송과 inventory integration을 API 처리 흐름에서 분리했습니다.

AX copy:

> 알림, 재고, 주문 정책을 backend policy/spec/onboarding 문서와 worker 구조로 연결해 팀원이 domain flow를 빠르게 복원할 수 있게 했습니다.

Needs verification:

- Celery -> TaskIQ migration의 실제 Git history.
- Polars 도입 전후 수치.
- 내가 작성한 worker/policy/spec 문서 범위.

### 4. RAY-BE-API

Contribution framing:

> 시술 workflow의 realtime 상태 전달과 타 서비스 재고 연동을 다룬 event-driven backend 경험.

What I can claim now:

- FastAPI/Python 3.13/SQLAlchemy 기반 RAY backend 구조를 다뤘다.
- `sse-starlette` 기반 SSE 설계 문서가 확인된다.
- EventManager, per-user queue, heartbeat, disconnect cleanup, proxy buffering, graceful shutdown 등 운영 요소를 설명할 수 있다.
- RabbitMQ publisher를 통한 RAY-BAY inventory deduction trigger 흔적이 있다.

Contribution type:

- Backend Capability: High
- Product/System Thinking: Medium
- Infra Capability: Medium
- Agent/AX Capability: Low-Medium

Resume copy:

> `sse-starlette` 기반 SSE channel로 procedure status와 notification event를 realtime으로 전달하는 구조를 설계했습니다.

AX copy:

> realtime 기능을 단순 구현이 아니라 운영 제약, proxy 설정, future Redis Pub/Sub 확장 경로까지 문서화해 재사용 가능한 설계 자산으로 만들었습니다.

Needs verification:

- production 적용 여부와 안정성.
- 내가 작성한 코드/문서의 직접 범위.
- RAY-BAY 연동의 장애 처리/재시도 정책.

### 5. MEDISOLVEAI-INFRA

Contribution framing:

> backend 서비스를 실제 배포/확장 가능한 Azure infra 구조로 연결한 infra-as-code 경험.

What I can claim now:

- Terraform 기반 Centurion B2B Azure infra repo가 확인된다.
- B2B/B2C infra separation과 shared ACR boundary가 문서화되어 있다.
- dev/stg/demo/prod VM, service deploy script, ACR image build/push, GitHub Actions deploy path가 정리되어 있다.
- 병원별 independent VNet/DB/VM 확장 구조와 future CI/CD/K8s roadmap이 문서화되어 있다.

Contribution type:

- Infra Capability: High
- Product/System Thinking: High
- Backend Capability: Medium
- Agent/AX Capability: Medium, if docs/html/md and agent doc generation flow are included

Resume copy:

> Terraform/Azure 기반 infra 문서와 deploy flow를 정리하고, 병원별 독립 VNet/DB/VM 구조로 B2B SaaS 확장 전략을 설계했습니다.

AX copy:

> 인프라 지식을 개인 머릿속이 아니라 문서, deploy script, service map, expansion roadmap으로 구조화해 agent와 팀원이 운영 절차를 재현할 수 있게 했습니다.

Needs verification:

- 직접 작성한 Terraform module/resource 범위.
- 실제 배포 자동화에서 내가 담당한 GitHub Actions/ACR/VM 작업.
- 운영 비용/안정성 수치 공개 가능 여부.

## AX Problem Framing

회사 프로젝트 경험에서 AX로 연결할 수 있는 문제는 다음이다.

| Organizational Problem | Observed In | AX Direction |
| --- | --- | --- |
| 요구사항이 구현까지 정확히 전달되지 않음 | multi-domain hospital SaaS, FE/BE/design handoff | policy -> spec -> wireframe -> implementation artifact chain |
| 문서와 코드가 어긋남 | backend policies, infra docs, service flows | source-of-truth routing, doc-to-code review, agent checklist |
| context 복원 비용이 큼 | 여러 repo, 여러 서비스, onboarding docs | `AGENTS.md`, repo map, task/report, briefing |
| 운영 지식이 사람에게 묶임 | deploy, infra, DB tunnel, worker restart | runbook, MCP, Docker/Playwright operations |
| agent가 맥락 없이 코드를 생성함 | chat-only prompting risk | evidence-gated agent workflow, small context routing |
| design/FE/BE 사이 handoff 비용이 큼 | design team workflow, OpenDesign plan | OpenDesign/Pencil/spec-to-prototype handoff |

## Homepage Messaging Ladder

### Level 1: Recruiter-Friendly

> FastAPI/NestJS/Spring Boot 기반 backend engineer로 SSO, 비동기 작업, 실시간 알림, Azure infra 배포 경험이 있습니다.

### Level 2: Engineering Leader

> multi-brand hospital SaaS에서 service boundary, auth/session policy, async worker, realtime event, infra isolation을 다뤘고, 이를 문서/운영 규칙으로 정리해 팀이 유지보수 가능한 구조를 만들었습니다.

### Level 3: AX/Agent Differentiation

> 저는 이 backend/infra 경험을 바탕으로 AI agent를 조직의 AX layer로 확장하는 데 관심이 있습니다. 요구사항, 문서, 코드, 디자인 handoff, 운영 절차를 agent가 읽고 실행 가능한 구조로 바꾸는 것이 다음 관심사입니다.

## Resume Summary Candidates

### Option A: Balanced

> Backend engineer with experience building hospital SaaS systems across SSO, async messaging, realtime notification, and Azure infra. I am now extending that experience into agentic workflows that help teams turn product context, documentation, code, and operations into executable organizational knowledge.

### Option B: Korean Public Profile

> 병원 SaaS의 backend와 infra를 구축해온 엔지니어입니다. SSO, RabbitMQ/TaskIQ, SSE, Terraform/Azure 배포를 다뤘고, 최근에는 AI agent를 활용해 제품 문서와 코드, 디자인 handoff, 운영 절차를 연결하는 AX workflow를 만드는 데 관심이 있습니다.

### Option C: More Senior

> 제품의 복잡한 운영 문제를 backend architecture와 agent-readable workflow로 풀어냅니다. 직접 시스템을 구축하고 운영하며 발견한 조직 병목을 `AGENTS.md`, source-of-truth docs, MCP, OpenDesign 기반 handoff로 구조화하고 있습니다.

Recommended:

- Homepage hero: Option C
- Resume summary: Option B
- English LinkedIn/GitHub bio: Option A

## Contribution Confidence Rubric

JD 스크래핑 이후에도 이 기준으로 claim을 관리한다.

| Confidence | Meaning | Public Use |
| --- | --- | --- |
| High | repo doc/code/Git evidence로 직접 확인됨 | 이력서 bullet 가능 |
| Medium | 현재 구조는 확인됐지만 직접 기여 범위는 추가 확인 필요 | case-study draft 가능, 강한 표현 금지 |
| Low | 기존 이력서나 기억 기반 | 내부 메모만 가능 |
| Unknown | 확인되지 않음 | 공개 금지 |

## JD Scraping Preparation

다음 단계에서는 JD를 많이 모아 "시장이 원하는 능력"과 현재 보유 evidence를 매핑한다.

### Target JD Groups

| Group | Why |
| --- | --- |
| Backend Engineer | 현재 핵심 역량과 직접 매칭 |
| Backend Platform Engineer | service boundary, infra, auth, async messaging를 더 잘 설명할 수 있음 |
| Infrastructure / DevOps Engineer | Azure, Terraform, Docker, CI/CD 보유 역량 확인 |
| AI Platform / AI Automation Engineer | agent workflow/AX 관심사와 연결 |
| Technical Product Engineer / Solutions Engineer | PM/AI/backend bridge를 살릴 수 있음 |
| AX / AI Transformation roles | 조직 문제를 agent/automation으로 해결하는 포지션 탐색 |

### Data Fields To Extract

JD를 스크래핑할 때 각 공고에서 아래 필드를 추출한다.

| Field | Example |
| --- | --- |
| Company | 회사명 |
| Role Title | Backend Platform Engineer |
| Seniority | junior/mid/senior/lead |
| Required Backend Skills | FastAPI, NestJS, Spring Boot, API design |
| Required Infra Skills | Docker, Kubernetes, Terraform, AWS/Azure, CI/CD |
| Required Data/Async Skills | Kafka, RabbitMQ, Celery, Redis, queue, event-driven |
| Required AI/Agent Skills | LLM, agent, MCP, RAG, workflow automation |
| Product/Collaboration Keywords | stakeholder, ownership, cross-functional, documentation |
| Evidence I Already Have | SSO, BAY, RAY, infra, agentspace |
| Gap To Fill | Kubernetes, observability, LLM eval, etc. |
| Resume Copy Opportunity | 어떤 문장으로 어필할지 |

### Expected Output

JD 스크래핑 후 만들 문서:

- `06-jd-market-skill-map.md`: JD별 요구역량 빈도와 내 evidence 매핑
- `07-gap-closing-roadmap.md`: 부족 역량을 2~6주 단위로 채우는 학습/프로젝트 계획

### Likely Skills To Validate

Assumption:

- Backend JD에서는 API design, DB modeling, testing, async processing, auth, cloud deployment가 반복될 가능성이 높다.
- Platform/Infra JD에서는 Kubernetes, Terraform, observability, CI/CD, incident response가 반복될 가능성이 높다.
- AI/AX JD에서는 LLM application, workflow automation, internal tools, RAG, evaluation, security/governance가 반복될 가능성이 높다.

Verification:

- 실제 JD 스크래핑 전까지 위 항목은 시장 가설이다.

## Immediate Next Step

1. Git history/PR 기준으로 `NEXUS`, `SSO`, `BAY`, `RAY`, `INFRA` 직접 기여 범위를 한 번 더 확인한다.
2. Public-safe disclosure boundary를 정한다.
3. JD 30~50개를 수집해 skill frequency를 뽑는다.
4. `내가 이미 가진 evidence`, `문장화할 것`, `보강할 것`으로 분리한다.

