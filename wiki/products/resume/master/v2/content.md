---
type: resume-content
title: Resume Master v2 Content (DRAFT)
description: Interview-harvested, screening-research-driven rewrite — XYZ-lite bullets, trajectory narrative, third-party proof promotion.
timestamp: 2026-07-19
tags: [resume, v2, content, korean, draft]
---

# Resume Master v2 Content — DRAFT

개선 근거: 경력직 서류 평가 리서치(로컬 위키 korean-dev-resume 2026-07-19) + 인터뷰 수확(evidence 2026-07-19).
v1 대비 변경 원칙: ① 결과·전후 변화 선행(XYZ-lite) ② 기술 선택 근거 명시 ③ 궤적 서사 ④ 제3자 검증(CES·특허) 상단 승격.
모든 문장은 claim registry allowed_copy 범위 내. ⚠️ 표기는 확정 전 항목.

## Header

- Role: `Backend Engineer · AI Product Systems`
- Name: 김대정
- Positioning: AI 제품을 운영 가능한 시스템으로 만드는 백엔드 엔지니어
- Contact: email, phone(PDF only), GitHub, 경기 안양시

## Summary (v2 — 향로 패턴: 연차·축 → 수치 → 제3자 검증 → 리드 → 차별점)

- Vision AI로 시작해 **6년째 AI 제품을 만들어온** 백엔드 엔지니어 — AI 엔지니어·PM을 거쳐, 제품을 끝까지 책임지는 층으로 백엔드를 선택 (`career.ai-pm-backend-continuity`)
- AI 도구로 빠르게 구축된 생성 backend를 **전면 재구축해 QA 버그 재발률을 37%에서 11%로** 낮추고, 월 수만 건 규모 요청을 **HTTP 5xx 0.3% 수준**으로 운영 (`thready.rebuild-decision-execution`, `thready.qa-reopen-reduction`, `thready.production-operation-quality`)
- **CES 2024 Best of Innovation 수상 제품**(SellerCanvas)의 PM 메인 역할 · **특허 등록 1건** (`career.sellercanvas-product-system`, `credentials.ces-2024`, `credentials.page-output-patent`)
- Backend Engineer 합류 후 **Tech Lead·PO 역할 병행** (`career.medisolve-role-evolution`)
- 스펙·이슈·릴리스 게이트를 **agent가 읽고 실행하는 workflow**를 설계·리드 (`mediness.product-operations`)

## Capabilities (v1 유지 + 표현 미세 조정)

### AI Product Systems

- typed prompt builder, LLM judge, 평가 루프, 관측 로깅 기반 생성 품질 시스템 구축 (`thready.generation-quality-system`)
- realtime AI 상담 backend의 세션 lifecycle과 provider 경계 안정화 공동 주 기여 (`centurion.say-realtime-ai`)

### Product Backend Ownership

- 주문·재고 API와 RabbitMQ·TaskIQ worker, retry, test·CI·onboarding 구축 주도 (`centurion.bay-async-backend`)
- 병원 product backend monorepo의 service boundary와 migration·domain audit 주도 (`nexus.backend-architecture`)

### Async And Realtime

- 실패 가능한 작업을 API 경계 밖 worker로 분리하고 retry 가능한 비동기 흐름 구축 주도 (`centurion.bay-async-backend`)
- realtime session lifecycle과 provider boundary 안정화 공동 주 기여 (`centurion.say-realtime-ai`)

### Infra-Aware Delivery

- 회사 Azure/Terraform infra 전반을 담당하며 B2B/B2C·제품·환경별 resource boundary, 배포, runbook 관리 (`infra.company-azure-ownership`)
- 외부 product Terraform IaC 구축 전담 (`nexus.terraform-infra`)

### Engineering Standard

- layered architecture·DI·ADR·convention·runbook 기반 조직 표준 FastAPI template 설계·구축 전담 (`be-template.backend-standard`)
- agent context system과 반복 작업 automation skill 내장 (`be-template.agent-context`)

### Agent-Readable Operations

- pipeline registry와 release gate 기반 제품팀 일정·이슈·릴리스 운영 리드 — 릴리스 노트 자동화로 버전 관리 (`mediness.product-operations`)
- 협업 도구 활동 집계와 blocker triage를 지원하는 daily briefing agent 구축·운영 (`mediness.daily-briefing`)

## Skills (v1 동일)

- Language / Framework: Python, FastAPI, TypeScript, NestJS, Java, Spring Boot
- Data / Messaging: PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ
- Infra / Delivery: Azure, AWS, Terraform, Docker, GitHub Actions
- AI Product: LLM integration/evaluation, typed prompt, structured output, WebSocket, SSE, STT

## Selected Projects (v2 — XYZ-lite: 문제·전후 변화 선행 + 선택 근거)

### Thready · AI 콘텐츠 생성 제품

- AI 도구로 빠르게 구축돼 **재발 이슈 통제가 어려웠던** 생성 backend를 인계받아, 서비스가 작은 시점에 **전면 재구축을 결정·설득** — 하네스를 먼저 세팅하고 AI와 협업해 파악부터 재구축까지 **총 36시간(작업 시간 기준)에 완수** (`thready.rebuild-decision-execution`)
- cutover 이후 **QA 버그 재발률(해결 대비 reopen) 37% → 11%**, 재발 발생 일평균 약 94% 감소 — 잔여 이슈도 원인 영역이 파악된 상태로 관리 (`thready.qa-reopen-reduction`)
- AI 모듈 확장을 근거로 **FastAPI 분리 도입**(FE는 Next.js 유지), cutover 이후 개발·운영 전담 — 월 수만 건 규모 요청을 **HTTP 5xx 0.3% 수준**으로 운영 (`thready.backend-rebuild`, `thready.production-operation-quality`)
- "좋은 글"의 **기준 자체가 없던 상태**에서 LLM judge를 기준을 발견하는 판단 데이터 축적 장치로 설계 — typed prompt builder·평가 루프·관측 로깅으로 생성 품질을 시스템화 (`thready.generation-quality-system`)

### Centurion · 피부과 운영 AI 메디컬 플랫폼 (제품 시작 시점부터 구축)

- 실패 가능한 주문·재고 작업을 **제품 시작 시점부터 API 경계 밖 worker**(RabbitMQ·TaskIQ)로 분리하는 예방 설계 — retry, test·CI·onboarding 구축 주도 (`centurion.bay-async-backend`)
- realtime AI 상담 backend의 세션 lifecycle과 provider 경계 안정화 공동 주 기여 (`centurion.say-realtime-ai`)

### BE Template · Engineering Standard

- **소수 백엔드 인원이 다수 제품을 담당하는 체제**에서 조직 표준 FastAPI template 설계·구축 전담 — 어떤 프로젝트든 정책 파악만으로 대응 가능, logging·모니터링 등 횡단 관심사 전 제품 일괄 반영 (`be-template.backend-standard`, `be-template.team-leverage`)
  - ⚠️ 수치 공개 결정 대기: "실질 BE 2명 · 제품 12개" 명시는 mediness 가드레일(제품 수 비공개)과 충돌 — 사용자 확정 시 교체
- **FE 엔지니어도 패턴·규약·하네스 아래에서 BE 로직 구현이 가능**해짐 — agent context system과 automation skill 내장 (`be-template.team-leverage`, `be-template.agent-context`)

## Career (v2 — Memento 상향)

- MediSolve AI · Backend Engineer · 2025.04-current: AI product backend와 제품 운영·engineering standard 담당, Tech Lead·PO 역할 병행 (`career.medisolve-role-evolution`)
- 더데이랩스 · Freelance · 2025.02-2025.04: 현 MediSolve AI 대표와 프리랜서로 협업 시작 — Centurion 초기 backend 구축과 개발팀 시스템·backend 기준 수립, 창업과 함께 합류 (`career.thedaylabs-freelance`)
- Memento AI · Backend Engineer · 2024.10-2025.01: 예약·결제 backend의 **Stripe 선결제 도입**과 환불·마일리지·티켓 rollback 안정화 — 회사 폐업으로 재직 종료 (`career.memento-payment`)
- 개인 프로젝트 · TellingMe · 2024.01-2024.12: Spring Boot backend와 AWS 배포·모니터링 리드, Memento 재직과 병행 (`career.tellingme-backend-infra`)
- STUDIO LAB · AI Engineer -> PM -> Backend Engineer · 2021.12-2024.01: SellerCanvas(생성형 AI 커머스 콘텐츠, CES 2024 최고혁신상 제품)의 PM 메인 역할로 제품 시스템 기획·구축 (`career.sellercanvas-product-system`)
- 아이즈솔 · Vision AI Engineer · 2020.08-2021.06: Vision AI에서 시작한 AI product engineering 경력 (`career.ai-pm-backend-continuity`)

## Agent Workflow (v2 — 자곤 구체화)

- AI agent를 코드 자동완성보다 **engineering operating layer**로 활용 — 하네스(패턴·규약·인프라 규칙)를 세팅하고 그 위에서 agent와 협업
- project rules와 source-of-truth routing을 사람과 agent가 함께 읽는 실행 경계로 구성 (`be-template.agent-context`)
- 스펙·이슈·릴리스 게이트를 agent가 읽고 실행 — 릴리스 노트 자동화로 버전 관리 (`mediness.product-operations`)
- daily briefing agent로 협업 도구 활동 집계와 blocker triage 지원 (`mediness.daily-briefing`)

## Education And Credentials (v1 동일)

- 우송대학교 게임멀티미디어 전공 (`credentials.education`)
- CES 2024 Best of Innovation · AI 부문 대상 제품 참여 (`credentials.ces-2024`)
- 특허 등록 `페이지 출력 방법` · 등록 10-2898273 (`credentials.page-output-patent`)
- ADsP · 데이터분석 준전문가 (`credentials.adsp`)

## Open Items (확정 전)

1. ~~QA reopen 수치~~ — **해금 완료** (2026-07-19 Jira 실측: 재발률 37%→11%, 일평균 -94.1%)
2. ⚠️ BE Template **"실질 2명 · 제품 12개"** — 제품 수 공개 여부 사용자 결정 대기
3. Summary 5행 — A4 2장 조판 계약 내 수용 여부는 조판 단계에서 검증
