---
type: report
title: Active Application Shortlist
description: 현재 지원 가능한 backend·AI agent 공고의 활성 상태, JD fit, 지원 우선순위와 포지셔닝.
timestamp: 2026-08-31
status: active
derived_from: [profile/career.md, profile/capabilities.md, products/jd/profile-skills.json]
tags: [jd, applications, backend, ai-agent, active-jobs]
---

# Active application shortlist — 2026-08-31

## Purpose

김대정의 검증된 profile/evidence와 현재 열려 있는 채용 공고를 연결해, 맞춤 이력서 작업과 지원 순서를 결정하기 위한 운영 목록이다.

이 문서는 검색 결과에 공고 본문이 남아 있다는 이유만으로 활성 공고로 간주하지 않는다. 플랫폼의 실제 상태값 또는 현재 공고 페이지의 지원 동작을 확인한 경우만 `active_verified`로 분류한다.

## Freshness contract

- `active_verified`: 2026-08-31에 플랫폼 상태값이 `active`이거나 현재 원문에 `지원하기`/`Apply` 동작이 확인됨.
- `review_needed`: 본문은 남아 있으나 현재 지원 동작을 확인하지 못함. 지원 목록에는 노출하지 않음.
- `closed`: 플랫폼 상태값 `close`, HTTP 410, 상세 URL의 채용 목록 이탈 중 하나가 확인됨.
- 활성 공고도 7일이 지나면 재확인 전까지 `review_needed`로 취급한다.
- 경력 판정은 전체 실무 48개월과 백엔드 직무 구간 28개월을 구분한다. `백엔드 3년 이상`이라고 표현하지 않는다.

## Active verified

### A — 우선 지원

| Company | Role | Why now | Primary positioning | Main gap/check | Source |
| --- | --- | --- | --- | --- | --- |
| Upstage | Applied AI Engineer - Agent GYM | 경력 무관, agent 품질·평가·복구·제품화가 직접 겹침 | 프로덕션 AI 기능을 평가·회귀·복구 가능한 시스템으로 만든 엔지니어 | 연구팀 협업 깊이와 observability 도구 구체화 | [official](https://careers.upstage.ai/ko/o/194880) |
| Elice Group | Backend Engineer (Python) | Python, PostgreSQL, Redis, RabbitMQ, CI/CD와 제품 운영 경험이 직접 겹침 | AI 제품을 받치는 비동기 백엔드와 엔지니어링 표준화 | Kubernetes와 대규모 트래픽 수치 | [Groupby](https://groupby.kr/positions/8969) |
| Draph | AI image platform Backend Engineer | 원티드 API `active`; FastAPI, PostgreSQL, Redis, 비동기 처리 중심 | 생성형 AI 제품의 안정적 API·비동기 작업·운영 기반 | Celery/AWS/Prometheus 직접 경험 범위 | [Wanted](https://www.wanted.co.kr/wd/370975) |
| ATCI | Software Engineer, AI Agent | 원티드 API `active`; FastAPI와 tool calling, state/context 설계가 겹침 | 에이전트를 실제 제품 워크플로우로 연결한 backend/product engineer | 공고의 백엔드 3년 문구는 전체 4년+역할 구간으로 설명 | [Wanted](https://www.wanted.co.kr/wd/349626) |
| PIX | AI Agent Developer | 콘텐츠 품질 가설·블라인드 테스트·운영 개선이 기존 경험과 직접 겹침 | 정답 없는 생성 품질을 기준·실험·운영 루프로 개선 | 로컬 모델 튜닝은 우대사항 gap | [Groupby](https://groupby.kr/positions/10118) |
| GroupbyHR | AI Engineer / Problem Solver | agent 제품과 AI coding workflow, 전 과정 ownership을 함께 평가 | 문제 정의부터 제품 출시까지 AI-native하게 수행하는 builder | 과장된 ‘상위 1%’ 표현 대신 실제 workflow와 산출물 제시 | [Groupby](https://groupby.kr/positions/6576) |
| TeamSparta | AI Agent Engineer | MCP, context, eval, demo→deployment 요구가 강하게 일치 | 데모에서 멈추지 않고 agent를 배포·측정·개선한 엔지니어 | 최근 MCP 산출물 링크와 본인 기여 범위 명확화 | [RocketPunch](https://www.rocketpunch.com/jobs/157279) |
| TNH | AI Development Engineer | 2년+, Python/FastAPI/Node/RDB/Agent/MCP 요구가 직접 겹침 | 의료 서비스에 AI 기능을 연결하고 운영 품질을 책임질 backend engineer | RAG와 GPU 최적화는 partial/gap으로 명시 | [Groupby](https://groupby.kr/positions/9671) |
| ZET | AI Agent Engineer | 2년+, 0→1 자동화·외부 API·성과 데이터 개선이 일치 | 고객 문제를 빠르게 자동화 파이프라인으로 만들고 제품 신호를 검증 | 광고 도메인과 AWS 세부 경험 확인 | [Groupby](https://groupby.kr/positions/7751) |
| MuseBlossom | Backend Engineer (FastAPI · AWS) | 2–4년, FastAPI/SQLAlchemy/RabbitMQ/Terraform/CI/CD가 높은 직접도 | typed FastAPI와 비동기 처리, IaC를 함께 다루는 product backend | AWS ECS 실운영 범위와 Celery 명시 필요 | [Groupby](https://groupby.kr/positions/8807) |
| Trinio | FullStack Engineer / AI Engineer | 1–5년, FastAPI/LLM/제품 ownership/AI coding이 직접 겹침 | AI application을 frontend부터 backend·운영까지 연결하는 product engineer | Kubernetes 직접 운영과 제조 도메인 학습 | [Groupby](https://groupby.kr/positions/9471) |

### B — 조건부 지원

| Company | Role | Why conditional | Positioning | Main gap/check | Source |
| --- | --- | --- | --- | --- | --- |
| MakinaRocks | Forward Deployed Software Engineer | 고객 현장 AI backend와 2년+는 적합, Kubernetes 배포는 gap | enterprise PoC를 실제 서비스 구조로 전환한 FDE형 engineer | Kubernetes와 ML lifecycle 깊이 | [official](https://makinarocks.career.greetinghr.com/ko/o/202057) |
| Wrtn | Internal Agent Developer | MCP·orchestration·RabbitMQ가 맞지만 상위 인재 신호와 3년+ 기준이 높음 | 내부 업무 agent를 설계하고 실패 복구 가능한 파이프라인으로 운영 | text-to-SQL/RAG와 경력 구간 설명 | [official](https://wrtn.career.greetinghr.com/ko/o/158349) |
| Toss | AI Engineer (Brain, AIOC) | agent 품질·음성·평가 경험은 강점, ML 시스템 면접과 multimodal 깊이는 stretch | 제약→가설→평가→개선으로 AI 품질을 끌어올린 경험 | ML 기초, RAG, multimodal 실험 깊이 | [official](https://toss.im/career/job-detail?job_id=7503655003) |
| Toss | AI Engineer (Platform) | agent/eval/platform 관점은 적합, vector search/RAG platform 경험 부족 | 여러 제품에서 재사용할 수 있는 AI service boundary와 품질 기반 | vector DB, retrieval 운영, ML system design | [official](https://toss.im/career/job-detail?job_id=7646941003) |
| Cheiron | Backend Engineer, Applied Agents | Python/FastAPI/Postgres/agent harness는 적합, RAG/vector/영어가 핵심 필수 | 검증 가능한 결과·복구·관측성을 갖춘 agent backend | production RAG/vector DB와 영어 협업 | [Ashby](https://jobs.ashbyhq.com/Cheiron/5465945c-953b-4f0d-8d23-eaa06adf377a) |
| Elice Group | AI Engineer (Platform) | 생성 품질 eval과 신뢰성은 강점, RAG가 필수 | 생성 품질 기준과 regression/guardrail을 제품 운영으로 연결 | RAG 정확도 개선, Kubernetes/LLMOps 도구 | [Groupby](https://groupby.kr/positions/10900) |
| Closer Labs | Software Engineer (Back-end, Data) | FastAPI·B2B·problem-to-delivery는 적합, 3년+와 데이터 파이프라인이 경계 | 고객 문제를 구조화해 backend 기능과 검증 결과까지 소유 | 백엔드 3년 표현 금지, 2주 유급 스프린트 조건 확인 | [Groupby](https://groupby.kr/positions/8624) |
| HyperEasy | Forward Deploy Engineer | 경력 무관과 고객 문제·prototype→scale은 적합, RAG는 필수 | 엔터프라이즈 문제를 제품 가능한 agent workflow로 전환 | RAG/vector DB와 고객 대면 사례 구체화 | [Groupby](https://groupby.kr/positions/9998) |
| FutureWorkLab | AI/ML Developer (lead preferred) | 전체 4년/백엔드 2년+ 대체 조건은 통과, ML·RAG 팀장 기대가 큼 | FastAPI·agent·DevOps를 한 제품 흐름으로 연결하는 hands-on lead 후보 | ML/DL 학습·fine-tuning·graph DB와 리딩 범위 | [Groupby](https://groupby.kr/positions/6783) |
| Jemi Studio | AI Agent web service developer | agent/SSE/WebSocket/0→1은 적합, TypeScript 풀스택 2년과 대전 근무가 조건 | 실시간 agent 제품을 backend와 frontend까지 완결한 경험 | TypeScript 연차와 대전 상주 가능 여부 | [Groupby](https://groupby.kr/positions/9983) |

### C — 도전 또는 실사 우선

| Company | Role | Why lower | Primary check | Source |
| --- | --- | --- | --- | --- |
| Kakao Mobility | AI Engineer | 관련 3년+, Kubernetes/GCP/MLOps/data pipeline이 사실상 핵심 | 경력 gate와 MLOps 운영 증거 | [official](https://kakaomobility.career.greetinghr.com/ko/o/167192) |
| Wishist | Backend Developer | FastAPI/RabbitMQ는 강점이나 Kubernetes, vector DB, GPU infra가 핵심 업무 | 즉시 투입 가능한 infra 범위 | [Groupby](https://groupby.kr/positions/10226) |
| AIM Intelligence | Backend Engineer | 최근 활성이나 Python production backend 3년+와 NoSQL이 명시 필수 | 경력 gate, NoSQL, 3개월 계약 후 전환 | [LinkedIn](https://kr.linkedin.com/jobs/view/backend-engineer-at-aim-intelligence-4454488738) |
| Bjak | Backend Engineer, AI (Agent Systems) | 서울 hybrid agent role은 적합하나 영어와 조직의 장시간 몰입 기대를 먼저 확인 | 영어 인터뷰, 근무 방식, 실제 team/location | [Ashby](https://jobs.ashbyhq.com/bjakcareer/af28163e-2f68-4312-81b7-df78e95cd1b1/) |

## Removed from the active list

### Closed

| Company | Role | Evidence on 2026-08-31 |
| --- | --- | --- |
| Allganize | Back-end Engineer (Python) | Wanted API `status=close` |
| D.Share | GenAI/backend automation developer | Wanted API `status=close` |
| FinderGap | AI Agent Engineer | Wanted API `status=close` |
| AX | Backend Developer (AI) | Wanted API `status=close` |
| OnVacation | Backend Developer | Wanted API `status=close` |
| LiveData | AI Backend Engineer | Wanted API `status=close` |
| Persley | Backend Engineer (LLM, RAG) | Wanted API `status=close` |
| WWBW | Backend Developer | Wanted API `status=close`; HTML의 `상시채용` 문구는 stale |
| PersonaAI | Python Developer | HTTP 410 Gone |
| TwoHands | AI Engineer (Backend) | HTTP 410 Gone |
| Cigro | Data Pipeline Engineer | HTTP 410 Gone |
| Madwang | Python Backend Developer | HTTP 410 Gone |

### Review needed — not eligible for the active workspace yet

| Company | Role | Reason |
| --- | --- | --- |
| Hyperconnect | ML Software Engineer, Backend | 상세 URL이 회사 소개 화면으로 이탈 |
| Prismoverse | Backend Developer | 검색 캐시에는 본문이 있으나 현재 페이지에서 지원 동작을 확인하지 못함 |

## Explicit exclusions despite being active

| Company | Role | Reason |
| --- | --- | --- |
| Modusign | Kotlin/Java backend roles | Kotlin/Java 실무 경험이 핵심 gate라 현재 포지셔닝과 불일치 |
| Molyturn | Backend Developer | 공고가 주 80시간 몰입과 사무실 취침 환경을 명시 |
| GenerativeLab | Backend Engineer | 역할 요건이 불명확하고 ‘미친듯한 몰입’을 핵심 문화로 명시 |

## Reusable positioning tracks

### Applied AI / agent product

핵심 문장: “LLM 기능을 붙이는 데서 끝내지 않고, 품질 기준·평가·회귀·실패 복구를 포함해 실제 사용자가 반복해서 쓸 수 있는 제품으로 운영해 왔습니다.”

주요 claim: `thready.generation-quality-system`, `thready.agent-pipeline-design`, `thready.quality-criteria-system`, `thready.measurement-correction`, `thready.provider-failure-continuity`.

### AI backend / reliability

핵심 문장: “FastAPI·PostgreSQL·Redis·RabbitMQ 기반에서 비동기 경계, 재시도, outbox, 배포 품질을 설계하고 운영한 백엔드 엔지니어입니다.”

주요 claim: `thready.backend-rebuild`, `thready.ai-replica-outbox`, `thready.production-operation-quality`, `be-template.fastapi-sqlalchemy-standard`, `nexus.backend-architecture`.

### Forward deployed / 0→1 product

핵심 문장: “모호한 고객 문제를 빠르게 프로토타입으로 검증하고, 반복 가능한 제품 구조와 운영 기준으로 전환해 왔습니다.”

주요 claim: `career.sellercanvas-enterprise-poc`, `career.sellercanvas-product-system`, `thready.product-zero-to-one-contribution`, `thready.prototype-to-user-operation`.

## Claims to avoid

- “백엔드 경력 3년 이상” 또는 “백엔드 4년차”
- production RAG/vector DB, Kubernetes, GCP, fine-tuning 직접 운영 경험 암시
- 팀 성과를 개인 단독 성과로 표현
- 회사·고객·provider 실명이나 private path 노출
