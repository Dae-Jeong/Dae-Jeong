---
type: content-brief
title: Resume Homepage Content Brief
description: Synthesized content direction for the new personal resume homepage.
timestamp: 2026-07-02
tags: [resume, homepage, portfolio, agent-workflow, writing]
---

# Resume Homepage Content Brief

## Target Positioning

### One-Line

Korean:

> 제품의 복잡한 운영 문제를 backend architecture와 agentic workflow로 풀어내는 엔지니어.

English:

> Backend architect who turns product complexity into reliable systems and agent-readable workflows.

### Longer Bio

> 저는 병원 운영 SaaS, SSO, 비동기 메시징, 실시간 알림, Azure infra를 다뤄온 backend engineer입니다. FastAPI, NestJS, Spring Boot 기반으로 service boundary와 transaction/session/workflow 문제를 풀어왔고, 최근에는 `AGENTS.md`, MCP, task/report 구조, OpenDesign 기반 design handoff를 활용해 AI agent가 실제 개발 흐름에 들어올 수 있는 운영 체계를 만들고 있습니다.

## Homepage Information Architecture

Priority: `Resume > Agent > Writing`

| Section | Purpose | Primary Evidence |
| --- | --- | --- |
| Home | "나는 어떤 사람인가"를 10초 안에 전달 | headline, current role, 3 proof cards |
| Resume | 경력/기술/성과를 전통적 이력서 형식으로 정리 | Oopy resume + company evidence |
| Case Studies | claim을 신뢰 가능한 문제 해결 기록으로 전환 | NEXUS, SSO, BAY, RAY, infra, TellingMe, SellerCanvas |
| Agent | AI agent를 실제 업무 운영 계층으로 쓰는 방식 설명 | `agentspace`, project `AGENTS.md`, MCP, Codex orchestration, OpenDesign |
| Writing | 기술/제품/agent 운영에 관한 글 목록 | internal docs를 public essay로 변환 |
| About | PM/AI/backend/UX 활동을 연결한 개인 서사 | Oopy intro + activities |

## First-Viewport Content

Recommended hero copy:

```text
김대정
Backend Architect for Product Systems and Agentic Workflows

병원 운영 SaaS, SSO, 비동기 메시징, 실시간 알림, Azure infra를 설계하고 운영합니다.
요즘은 AI agent가 제품 문서, 코드, 디자인 handoff를 함께 읽고 실행할 수 있는 구조를 만들고 있습니다.
```

Proof cards:

| Card | Copy |
| --- | --- |
| Backend Systems | FastAPI/NestJS/Spring Boot 기반으로 인증, 비동기 작업, 실시간 이벤트, infra 배포 흐름을 다룹니다. |
| Product Context | AI engineer, PM, backend engineer를 거치며 비즈니스 요구를 기술 계약으로 바꾸는 일을 해왔습니다. |
| Agent Workflow | `AGENTS.md`, source-of-truth docs, MCP, task/report 구조, OpenDesign으로 agent-readable 개발 흐름을 만듭니다. |

## Resume Section Draft

### MediSolve AI

Role:

- Tech Lead / Backend Engineer
- 2025.04.02 ~ 현재

Recommended bullets:

- 피부과/성형외과 multi-brand hospital management platform에서 backend service boundary, authentication, async messaging, realtime notification, infra/deploy workflow를 설계하고 운영.
- FastAPI/Python 기반 BAY/RAY/NEXUS 계열 서비스와 NestJS/Prisma 기반 SSO를 연결해 병원 운영 SaaS의 인증, 재고, 시술, 알림 흐름을 구성.
- Redis/JTI 기반 SSO session validation, duplicate login policy, service-group logout 등 multi-service authentication 문제를 구조화.
- TaskIQ/RabbitMQ 기반 async worker로 알림톡 발송과 inventory integration을 API request flow에서 분리.
- `sse-starlette` 기반 SSE realtime channel로 procedure status/notification event를 client에 전달하는 구조 설계.
- Terraform/Azure/GitHub Actions/ACR 기반 deploy and infra documentation을 정리하고, 병원별 독립 infra 확장 방향을 설계.
- Project `AGENTS.md`, MCP, planning/design/backend agent roles를 통해 요구사항-스펙-와이어프레임-구현의 agent workflow를 문서화.

Avoid until verified:

- "30개 도메인 단독 구축"
- "500 에러 완전 해결"
- "Pandas 대비 N배 성능 개선"
- "무중단 배포 구현" unless deployment logs or scripts confirm it.

### Memento AI

Role:

- Backend Engineer / PM Intern
- 2024.10 ~ 2025.01

Recommended bullets:

- FastAPI/SQLAlchemy/MySQL 기반 병원 운영 backend에서 결제, 알림톡, 직원 일정 관리 도메인을 개발.
- Stripe Hong Kong API와 Notifly 기반 알림톡 workflow를 연동해 결제/예약/마케팅 운영 흐름을 backend로 구현.
- Check 서비스에서 직원 일정 관리 admin을 기획부터 API/schema/auth 구현까지 0->1로 구축.

### STUDIO LAB

Role:

- AI Engineer -> Project Manager -> Backend Engineer
- 2021.12 ~ 2023.12

Recommended bullets:

- SellerCanvas/Gency에서 AI image analysis, ecommerce detail-page generation, PM, backend migration을 경험.
- CES 2024 AI 최고 혁신상 및 patent application으로 이어진 AI commerce product development에 참여.
- YOLO v8 기반 의류 이미지 분석, fashion enterprise POC, NodeJS legacy to NestJS migration을 수행.

Verification needed:

- Award/patent external source.
- Accuracy metric source for AI model.

### Personal Project: TellingMe

Recommended bullets:

- 10인 팀에서 Spring Boot backend lead and infra owner로 OAuth2, JWT, gamification, FCM, CI/CD, monitoring을 구축.
- 38 domain packages, 42 entities, 22 controllers, 89 REST endpoints로 wellbeing/self-development app backend를 구조화.
- Java backend와 Python microservice를 연동해 mission/payment/gamification workflow를 확장.

Verification needed:

- Public repo or code evidence before public case-study deep dive.

## Case Study Backlog

### 1. NEXUS: Multi-Brand Hospital SaaS Architecture

Problem:

- 여러 병원 브랜드를 하나의 codebase로 관리하면서 브랜드별 독립 운영, HQ/Branch 권한, homepage/admin/crm 경계를 나눠야 했다.

Key points:

- FastAPI backend monorepo
- `api-gateway`, `admin-api`, `homepage-api`, `shared`
- brand-level infra/deploy direction
- layer contract and validator ownership
- agent team workflow

Proof:

- `CENTURION_DAY/AGENTS.md`
- `CENTURION_DAY/backend/README.md`

### 2. SSO: Redis/JTI Session Policy For Multi-Service Login

Problem:

- 여러 서비스에서 JWT 인증을 공유하면서 duplicate login, device conflict, service group logout을 처리해야 했다.

Key points:

- NestJS, Prisma, MySQL, Redis
- JWT access/refresh rotation
- SessionGuard and JTI match
- service-group session removal

Proof:

- `SSO-BE-API/AGENTS.md`

### 3. BAY: Async Work Separation With TaskIQ/RabbitMQ

Problem:

- 알림톡과 inventory integration 같은 작업을 API request lifecycle에서 분리해야 했다.

Key points:

- FastAPI, SQLAlchemy, MySQL
- TaskIQ/RabbitMQ
- separate brokers for alimtalk and inventory
- worker retry/status update model

Proof:

- `BAY-BE-API/src/core/taskiq/*`
- `BAY-BE-API/src/workers/alimtalk_worker.py`
- `BAY-BE-API/docs/policy/v1.0.0.md`

### 4. RAY: SSE Realtime Procedure Notification

Problem:

- 시술 상태와 개인 알림을 client에 realtime으로 안정적으로 전달해야 했다.

Key points:

- `sse-starlette`
- EventManager + per-user queue
- heartbeat/disconnect/proxy buffering
- graceful shutdown
- future Redis Pub/Sub scale path

Proof:

- `RAY-BE-API/docs/sse-design-starlette.md`

### 5. Infra: Terraform-Based Azure Hospital Expansion

Problem:

- 병원별 infra isolation과 service deployment path를 관리해야 했다.

Key points:

- Terraform
- B2B/B2C separation
- shared ACR only
- dev/stg/prod VM and deployment docs
- future hospital module/CI/CD/K8s roadmap

Proof:

- `MEDISOLVEAI-INFRA/README.md`

### 6. Agent OS: From Product Documents To Executable Work

Problem:

- AI agent가 채팅 맥락에만 의존하면 제품 상태, 정책, 작업 상태를 안정적으로 다루기 어렵다.

Key points:

- global agent wiki
- project `AGENTS.md`
- `agentspace/mediness-nexus`
- baseline -> decision -> spec -> work -> QA/PR evidence
- skill source and Claude adapter sync
- Codex orchestration workspace

Proof:

- `~/Desktop/wiki/agents`
- `~/agentspace/mediness-nexus`
- `~/agentspace/codex_pr`
- `CENTURION_DAY/AGENTS.md`

## Agent Section Draft

### Section Title

Options:

- `Agent OS`
- `How I Work With Agents`
- `AI Agent Operating System`
- `Agentic Engineering Workflow`

Recommended:

> Agentic Engineering Workflow

### Section Copy

```text
저는 AI agent를 단순히 코드 자동완성이나 질문 답변 도구로 쓰지 않습니다.
제품 문서, 코드베이스, 디자인 handoff, 테스트/운영 명령을 agent가 읽고 실행할 수 있게 구조화합니다.

Global wiki는 협업 원칙과 evidence rule을 담고, project AGENTS.md는 repo별 ownership과 실행 규칙을 담습니다.
제품 문서는 Baseline, Decision, Spec, Work Package, QA/PR evidence로 나누고,
MCP와 OpenDesign을 통해 browser, Docker, UI prototype, design artifact를 작업 흐름에 연결합니다.
```

### Agent Artifacts To Show

| Artifact | Public Description |
| --- | --- |
| Global Agent Wiki | cross-project collaboration rules, evidence labels, source routing |
| Project AGENTS.md | repo-specific agent team map and ownership |
| Mediness source-of-truth docs | baseline, decision, spec, work, QA/PR evidence workflow |
| Codex orchestration workspace | task queue, worker report, health check, dashboard experiment |
| OpenDesign Lab | spec-to-prototype/design handoff harness planned around OpenDesign |

## Writing Section Draft

Writing should start as curated engineering notes, not generic blog posts.

### First Writing Categories

| Category | Description | First Post Candidates |
| --- | --- | --- |
| Backend Architecture | 인증, 메시징, 실시간 이벤트, infra를 구조적으로 설명 | Redis/JTI SSO, TaskIQ/RabbitMQ, SSE/FastAPI |
| Agent Workflow | AI agent를 개발 조직의 운영 계층으로 쓰는 법 | AGENTS.md, source-of-truth routing, task/report loop |
| Product Engineering | PM/AI/backend 경험을 연결한 제품 개발 글 | SellerCanvas, TellingMe, UX study |
| Design Harness | OpenDesign과 frontend/design handoff 실험 | OpenDesign 기반 spec-to-prototype flow |

### First 8 Article Titles

1. `AGENTS.md는 prompt가 아니라 project operating contract다`
2. `AI agent가 헛똑똑해지는 이유: source-of-truth 없이 chat memory만 믿을 때`
3. `Redis/JTI로 multi-service duplicate login을 다루는 법`
4. `FastAPI에서 SSE를 단순하게 시작하는 방법`
5. `TaskIQ와 RabbitMQ로 API와 worker 책임 분리하기`
6. `병원 SaaS에서 HQ/Branch 권한 경계를 설계하는 법`
7. `OpenDesign으로 spec과 prototype 사이를 줄이는 실험`
8. `PM에서 backend engineer로 돌아왔을 때 더 잘 보이게 된 것들`

## Design Direction For Future Homepage

This is not implementation yet, but useful for the next build step.

Visual tone:

- Professional, dense, readable.
- More engineering dossier than marketing landing page.
- First screen should show name, role, proof, and navigation into Resume/Agent/Writing.
- Use case-study cards only for repeated case-study items; avoid nested card-heavy layout.
- Agent section can use an operating-system style diagram: Source -> Plan -> Build -> Verify -> Write.

Information density:

- Recruiter path: Home -> Resume -> PDF/download/contact.
- Engineering leader path: Home -> Case Studies -> SSO/BAY/RAY/NEXUS.
- Agent-curious path: Home -> Agent -> Writing.

## Immediate Next Content Tasks

1. Verify award/patent public sources for STUDIO LAB.
2. Inspect Git history/PRs for strongest MediSolve AI claims if public resume needs more precision.
3. Decide what company/client names are safe to publish.
4. Choose first 3 case studies for public release.
5. Build OpenDesign harness proof page after selecting frontend stack or open-source blog engine.

## Current Residual Gaps

Unknown:

- 12 Oopy activity pages were not extracted.
- Public-safe disclosure boundaries for current company work.
- Exact production metrics and before/after improvements.
- Which old projects have public repos or screenshots.

Inference:

- The strongest new positioning is not "backend engineer who uses AI" but "backend/product engineer who turns product systems into agent-readable workflows".

