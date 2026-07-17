---
type: source-analysis
title: Oopy Resume Source Analysis
description: Existing Oopy/Notion resume content inventory and reusable resume claims.
resource: https://daejeongkim.oopy.io/
timestamp: 2026-07-02
tags: [resume, oopy, notion, source-analysis]
source_roots: []
---

# Oopy Resume Source Analysis

## Source

- Source URL: `https://daejeongkim.oopy.io/`
- Original Notion URL from user: `https://v4chelsea.notion.site/10c1a3427113808a94f3ffe6db797783`
- Checked date: 2026-07-02 Asia/Seoul
- Extraction method: Oopy page `__NEXT_DATA__` + Notion public `loadPageChunk` expansion
- Local extraction artifacts were temporary and are not required by the portable workspace.
- Tool-backed snapshot: expanded extraction had 454 markdown lines and an expanded record map.

## Existing Positioning

현재 이력서의 핵심 headline은 다음이다.

> 비즈니스의 가치를 코드로써 실현하는 엔지니어

자기소개는 세 가지 주장으로 구성되어 있다.

| 주장 | 현재 의미 | 새 홈페이지에서의 재사용 방식 |
| --- | --- | --- |
| 좋은 설계가 좋은 서비스를 만든다 | FastAPI/NestJS microservice, Spring Boot DDD, CI/CD, 인증, 비동기 작업 등 설계 중심 백엔드 역량 | `Resume` 첫 화면의 backend architecture narrative로 유지 |
| PM과 AI 엔지니어 경험으로 제품을 이해한다 | Tech Lead, PM, AI engineer 경험을 하나의 제품 이해력으로 연결 | `About`과 case-study 도입부에서 product/engineering bridge로 사용 |
| 문제 본질을 파악하고 빠르게 실행한다 | RabbitMQ, SSE, Azure 배포 자동화, 장애/개선 대응 | `Case Studies`에서 문제-판단-해결-결과 구조로 재작성 |

## Education

| 형태 | 과정/전공 | 기관 | 기간 |
| --- | --- | --- | --- |
| 부트캠프 | OZ 코딩스쿨 - 백엔드 웹개발 초격차 캠프 | 넥스트 러너스 | 2024.06.20 ~ 2024.10.20 |
| 부트캠프 | 쏘카 실전 데이터로 배우는 AI 엔지니어 육성 부트캠프 | 멋쟁이사자처럼 | 2021.10.01 ~ 2022.01.31 |
| 부트캠프 | 비트 프로그래밍 기본반/고급반 | 비트컴퓨터 | 2019.08.01 ~ 2020.03.01 |
| 대학교 | 게임멀티미디어 전공 | 우송대학교 | 2016.03.01 ~ 2021.08.31 |
| 고등학교 | - | 양명고등학교 | 2014.03.01 ~ 2016.02.29 |

## Work Inventory From Existing Resume

### MediSolve AI

- Employment: 정규직
- Role: Tech Lead
- Service: Centurion / 데이뷰 & 세라미크 어드민 시스템
- Period: 2025.04.02 ~ 근무중

Existing resume claims:

- Centurion 플랫폼 3개 microservice 운영 및 개발: BAY, RAY, SSO
- BAY/RAY/SAY stack: Python 3.13, FastAPI, SQLAlchemy 2.0, MySQL
- SSO stack: TypeScript, NestJS, Prisma, MySQL
- Common stack: RabbitMQ, Docker, Azure, GitHub Actions
- Celery to TaskIQ migration
- JWT based multi-service SSO
- SSE realtime procedure notification
- RabbitMQ based RAY-BAY inventory integration
- Centralized validation system
- Polars based Excel parsing performance improvement
- Azure CI/CD and infra automation

Evidence status: the company work evidence document cross-checks these claims against local repos.

### A 피부과 Admin System

- Period in existing resume: 2025.10 ~ 진행중
- Service: A 피부과 어드민 시스템
- Stack: Python 3.13, FastAPI, SQLAlchemy 2.0, MySQL, Docker, Nginx, Azure

Existing resume claims:

- Multi-module clean architecture backend single-handed build
- 30 domain APIs for reservation, CMS, product, customer management
- Homepage/Admin API modules and Nginx reverse proxy
- Generic `BaseRepository`
- Multi-tenancy, soft delete, closure table category/procedure hierarchy
- SQLAlchemy connection pool issue resolution
- GitHub Actions + Docker + Azure VM deploy automation
- Ruff, Pyright, pre-commit, Swagger/API/DB guide documentation

Evidence status: partially supported by `CENTURION_DAY`/NEXUS docs, but exact "30 domains" and "single-handed" should stay `Unverified` until code/repo history is checked.

### Memento AI

| Role | Service | Period |
| --- | --- | --- |
| Backend Engineer | Feynman | 2024.11.21 ~ 2025.01.10 |
| Backend Engineer & PM Intern | Check | 2024.10.20 ~ 2024.11.20 |

Reusable claims:

- Feynman: FastAPI, SQLAlchemy, MySQL, AWS, Stripe Hong Kong, Notifly 알림톡
- Check: hospital staff schedule admin, PM + backend, auth/domain/schema/API from zero to one

Evidence status: existing resume only. Local repo inspection for `feynman_api` can be added later if this section becomes a homepage case study.

### STUDIO LAB

| Role | Service | Period |
| --- | --- | --- |
| Backend Engineer | SellerCanvas | 2023.10.01 ~ 2023.12.31 |
| Project Manager | SellerCanvas | 2022.10.01 ~ 2023.09.30 |
| AI Engineer (Vision) | SellerCanvas / DeepScan | 2021.12.01 ~ 2022.09.30 |

Reusable claims:

- SellerCanvas/Gency, ecommerce detail-page AI generation service
- CES 2024 AI 최고 혁신상
- Patent application: 페이지 출력 방법, application number `10-2022-0130234`
- AI engineer to PM to backend engineer career progression
- Fashion enterprise POC management
- YOLO v8 based clothing image analysis model
- NodeJS legacy to NestJS migration

Evidence status: existing resume only. Award/patent can be externally verified before public homepage publishing.

## Skill Inventory

Strong/immediate:

- Languages: Java, Python, TypeScript
- Frameworks: Spring Boot, FastAPI, NestJS
- Databases: MySQL, PostgreSQL
- Cloud: AWS, Azure
- Tools: Docker, Git, GitHub Actions

Light exposure:

- Languages: C#, Kotlin
- Frameworks: ASP.Net, Celery
- Databases: MongoDB, Redis
- Tools: Grafana, Prometheus, NGINX

Homepage treatment:

- Do not present as a flat keyword cloud only.
- Group by "backend architecture", "distributed workflow", "infra/deploy", "agent/design/documentation workflow".

## Personal Project

### 나를 깨닫는 시간: 텔링미

- Period: 2024.01 ~ 2024.12
- Team: 10 people
- Role: backend lead and infra manager
- Stack: Java 11, Spring Boot 2.7.7, Spring Security, Spring Data JPA, MySQL 8.0.33, JWT, OAuth2 Kakao/Apple, AWS EC2/S3/CodeDeploy, GitHub Actions, Gradle, Swagger/OpenAPI, Prometheus, Spring Actuator, Firebase FCM, Python microservice

Reusable claims:

- OAuth2 social login and JWT auth
- Gamification domains: level, badge, mission, currency, streak, inventory
- Java-Python microservice integration
- DDD/layered architecture: 38 domain packages, 42 entities, 22 controllers, 89 REST endpoints
- GitHub Actions + AWS CodeDeploy CI/CD
- FCM push notification and Prometheus/Actuator monitoring

Evidence status: existing resume only. This is a strong case-study candidate if local code or public repo can be linked.

## Activities

Reusable activity themes:

- Memoir: weekly retrospective habit, networked learning, reflection as engineering operating habit
- Bootcamp study operation: daily assignment study, daily retrospective, one-week deployment class, code review/communication study
- UX psychology: YouTube Music UX presentation, MoneyWalk UX consulting
- IPS: Speak analysis presentation, 20-minute presentation, IPS 12 MVP
- PSE: Delivery Hero APAC analysis, platform vs solution analysis

Public homepage treatment:

- These are useful for the `Writing` or `Thinking` section, not the first resume screen.
- The best narrative is "developer who has practiced product, UX, communication, and reflection outside pure coding".

Unknown:

- 12 activity collection pages were returned as `Unknown page ...` during extraction. They should not be summarized until accessible content is recovered.
- MoneyWalk performance claim, Google Play ranking, and presentation audience counts are `Unverified` unless source material is linked.

## Awards And Credentials

- 2023.12 CES 2024 AI 부문 최고 혁신상
- 2021.02 전국 SW 중심대학 공동 해커톤 우수상
- 2020.10 SW 창업 아이디어 경진대회 아이디어 부문 2등
- 2019.11 SW 창업 아이디어 경진대회 개발 및 구현 부문 2등
- 2021.09 ADsP
- 2022.10 Patent application: 페이지 출력 방법, application number `10-2022-0130234`

Evidence status:

- Existing resume source-backed.
- Public homepage should verify award and patent externally before presenting them as headline proof.

## Gaps For The New Homepage

The current Oopy resume is conventional and backend-focused. The new homepage needs to add:

- `Agent` as a first-class section: how Codex/Claude/subagents/MCP/project AGENTS are used in real development.
- OpenDesign design harness: how design artifacts, wireframes, UI specs, and agent-driven design can be part of the engineering workflow.
- Writing system: technical writing, postmortems, design notes, case-study logs, and working memos.
- Evidence depth: each strong claim should link to a case-study page or internal evidence snippet.
