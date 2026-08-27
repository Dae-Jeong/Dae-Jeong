---
type: index
title: Case Library
description: 포트폴리오 케이스 스터디 마스터 라이브러리 — 회사별 페이지는 여기서 선별·조립만 한다.
timestamp: 2026-08-23
tags: [portfolio, cases, library]
---

# Case Library

제품 계약: [../decisions.md](../decisions.md). 회사별 포트폴리오는 이 라이브러리에서 **선별·조립만** 한다. 회사별로 케이스를 새로 쓰지 않는다.

## 케이스 목록

| 파일 | resume_tag | 유형 | claim strength |
| --- | --- | --- | --- |
| [thready-rebuild.md](thready-rebuild.md) | THREADY | 유료 제품 운영 + full-stack system | 제품·팀 outcome 기여 / 제품 운영·frontend 주도 / backend 전담 |
| [centurion-platform.md](centurion-platform.md) | CENTURION | 의료 MSA failure boundary | service별 `led/co-led/contributed` |
| [infrastructure-delivery.md](infrastructure-delivery.md) | INFRASTRUCTURE DELIVERY | 내부 근거로 보존한 회사 배포·Azure 운영 기록 | archive · public master 미선택 |
| [memento-payment.md](memento-payment.md) | MEMENTO PAYMENT | supporting 외부 결제 보상·상태 정합성 | `led/contributed` |
| [be-template.md](be-template.md) | COMPANY AX | primary 회사 AX 실행 체계 — MEDINESS 운영 plane + 직접 구축한 backend/agent execution | 회사 업무 설계 `contributed` · 제품 운영 `led` · engineering system `owned` |
| [mediness-ops.md](mediness-ops.md) | MEDINESS | Company AX 사례의 product/work control plane 근거 | 설계 `contributed` · 제품별 운영 `led` |
| [bay-async.md](bay-async.md) | BAY | backend 비동기 아키텍처 | 구축·설계 주도 |
| [say-realtime.md](say-realtime.md) | SAY | realtime AI backend | cluster 단위 주도 |
| [thready-ai-system.md](thready-ai-system.md) | THREADY AI SYSTEM | AI service boundary·durable delivery | 설계·구현 전담 |
| [operating-policy-delivery.md](operating-policy-delivery.md) | OPERATING POLICY DELIVERY | 운영 요청을 규칙·실행으로 연결한 cross-project pattern | 프로젝트별 `led` 상한 |
| [nexus-operations.md](nexus-operations.md) | NEXUS OPERATIONS | 외부 운영·예약 요구를 backend·권한 경계로 구현한 FDE supporting case | backend `led` · product outcome `contributed` |
| [sellercanvas-poc.md](sellercanvas-poc.md) | SELLERCANVAS POC | 생성형 AI 제품과 외부 기업 PoC의 product·technical delivery | product/PoC `led` · outcome `contributed` |

## Common Resume Selected Impact Coverage

| Resume selected proof | Portfolio case | Claim coverage |
| --- | --- | --- |
| Thready 제품 운영·매출·생성 품질 | [thready-rebuild.md](thready-rebuild.md) | 고객 문제의 제품화, 팀의 유료 운영·매출 outcome, 핵심 frontend 직접 구현, typed prompt builder·LLM judge·평가 루프, QA·release |
| FastAPI 병렬 재구축 | [thready-rebuild.md](thready-rebuild.md) | validation harness, frontend contract 유지, cutover, QA reopen 26%p 감소 |
| Centurion 주문·재고 비동기 복구 | [centurion-platform.md](centurion-platform.md) | API와 후속 작업 분리, TaskIQ·RabbitMQ, 상태·retry·terminal failure·수동 재처리, test/CI 기반 |
| AI application·DB migration·Outbox | [thready-ai-system.md](thready-ai-system.md) | AI service boundary, STG migration 검증, transactional Outbox, lease·attempt token·retry·version fence·멱등 consumer·terminal failure 보존 |
| Backend Template·agent 기준 | [be-template.md](be-template.md) | backend standard, team leverage, agent context |

## Common Portfolio Placement

| Tier | Case order |
| --- | --- |
| Primary | [Thready](thready-rebuild.md) → [Company AX](be-template.md) → [Centurion](centurion-platform.md) |
| Supporting | [Memento Payment](memento-payment.md) |

직군별 local draft에서는 supporting tier를 추가로 선택할 수 있다. AX/FDE는 [NEXUS Operations](nexus-operations.md)와 [SellerCanvas PoC](sellercanvas-poc.md)를 field delivery 근거로 먼저 읽고, [Company AX](be-template.md)를 그 방식을 반복 가능한 실행 체계로 확장한 후속 사례로 읽는다.

`Company AX`는 서로 다른 contribution strength를 하나로 뭉개지 않는다. MEDINESS의 제품·회사 업무 구조는 설계 참여와 제품별 적용·운영 근거를, Backend Template은 직접 설계·구축한 engineering execution 근거를 유지한다. Azure/Vercel은 배포 목적지 이상으로 확대하지 않는다.

Centurion·NEXUS·Stripe의 세부 근거는 common resume의 Career 또는 common portfolio의 supporting/context proof로 남을 수 있다. 이를 대표 성과에 넣기 위해 다른 사례와 합성하거나 ownership을 높이지 않는다.

## 작성 규칙

- 구조 고정: `Executive Summary -> My Scope -> Problem And Constraints -> Decision And Alternatives -> System Design And Implementation -> Failure Modes And Operation -> Evidence, Result, And Limits -> Stack`.
- `Executive Summary`는 recruiter도 이해할 수 있는 2~3문장으로 problem, decision, contribution strength를 요약한다.
- 기술담당자를 위해 constraints, 실제 대안, trade-off, failure mode, operating evidence, limits를 본문에서 분리한다.
- frontmatter의 `claim_ids`가 [claim registry](../../../evidence/claims/README.md)를 직접 가리킨다. 케이스 본문은 해당 claim의 strength와 allowed copy 상한을 넘지 못한다.
- 공개 가드레일 상속: provider 실명 X, 고객사/브랜드명 X, 팀원 실명 X, 커밋 수 X, 미검증 수치 X.
- **전임자/기존 코드 폄하 금지** — "빠른 검증에 맞춘 초기 구조" 같은 중립 서술.
- **AI와 사람의 역할 분리** — AI는 코드 분석·반복 구현에 활용하되 아키텍처·검증 기준·cutover 판단은 직접 수행한 범위로 쓴다.
- **결과 주장은 확인된 사실만** — 적용/효과를 확인 안 했으면 "~하도록 설계"까지만.
- `diagram:` 라인 컨벤션 — `->`로 노드 구분, `[soft]` 접두는 보조 노드. 조립 시 CSS 다이어그램으로 변환.
- stack 항목도 검증 대상 (repo 의존성/설정으로 확인).

## 갱신 규칙

새 케이스 재료가 생기면: evidence record -> claim registry -> 여기 case -> resume/portfolio 선별 순서로 갱신한다. 순서 역행 금지.
