---
type: index
title: Case Library
description: 포트폴리오 케이스 스터디 마스터 라이브러리 — 회사별 페이지는 여기서 선별·조립만 한다.
timestamp: 2026-08-20
tags: [portfolio, cases, library]
---

# Case Library

제품 계약: [../decisions.md](../decisions.md). 회사별 포트폴리오는 이 라이브러리에서 **선별·조립만** 한다. 회사별로 케이스를 새로 쓰지 않는다.

## 케이스 목록

| 파일 | resume_tag | 유형 | claim strength |
| --- | --- | --- | --- |
| [thready-rebuild.md](thready-rebuild.md) | THREADY | 제품 0→1 + full-stack system | 제품화·frontend 주도 / backend 전담 |
| [centurion-platform.md](centurion-platform.md) | CENTURION | 의료 MSA failure boundary | service별 `led/co-led/contributed` |
| [infrastructure-delivery.md](infrastructure-delivery.md) | INFRASTRUCTURE DELIVERY | 회사 인프라 설계·운영 harness | 전담 |
| [memento-payment.md](memento-payment.md) | MEMENTO PAYMENT | supporting 외부 결제 보상·상태 정합성 | `led/contributed` |
| [be-template.md](be-template.md) | BE TEMPLATE | primary 엔지니어링 표준·agent execution | 전담 설계·구축 |
| [mediness-ops.md](mediness-ops.md) | MEDINESS | supporting 제품 요구·운영 흐름 설계 참여 + agent 운영 시스템 | 설계 `contributed` · 운영 `led` |
| [bay-async.md](bay-async.md) | BAY | backend 비동기 아키텍처 | 구축·설계 주도 |
| [say-realtime.md](say-realtime.md) | SAY | realtime AI backend | cluster 단위 주도 |
| [thready-ai-system.md](thready-ai-system.md) | THREADY AI SYSTEM | AI service boundary·durable delivery | 설계·구현 전담 |
| [operating-policy-delivery.md](operating-policy-delivery.md) | OPERATING POLICY DELIVERY | 운영 요청을 규칙·실행으로 연결한 cross-project pattern | 프로젝트별 `led` 상한 |

## Common Resume Selected Impact Coverage

| Resume selected proof | Portfolio case | Claim coverage |
| --- | --- | --- |
| Thready 제품 운영·매출·생성 품질 | [thready-rebuild.md](thready-rebuild.md) | 0→1 제품화, 제품·팀 매출 기여 경계, 핵심 frontend, typed prompt builder·LLM judge·평가 루프, QA·release |
| FastAPI 병렬 재구축 | [thready-rebuild.md](thready-rebuild.md) | validation harness, frontend contract 유지, cutover, QA reopen 26%p 감소 |
| AI application·DB migration·Outbox | [thready-ai-system.md](thready-ai-system.md) | AI service boundary, STG migration 검증, transactional Outbox, retry·version fence |
| Decision→release 운영 | [mediness-ops.md](mediness-ops.md) | 요구·운영 흐름 설계 참여와 제품별 실행 원장·release 운영 리드의 분리 |
| Backend Template·agent 기준 | [be-template.md](be-template.md) | backend standard, team leverage, agent context |
| Company Infrastructure | [infrastructure-delivery.md](infrastructure-delivery.md) | Azure runtime topology, AI-assisted change harness, state safety, observability |

## Common Portfolio Placement

| Tier | Case order |
| --- | --- |
| Primary | [Thready](thready-rebuild.md) → [Centurion](centurion-platform.md) → [Company Infrastructure](infrastructure-delivery.md) → [Backend Template](be-template.md) |
| Supporting | [Memento Payment](memento-payment.md) → [Product Operations](mediness-ops.md) |

Centurion·NEXUS·Stripe의 세부 근거는 common resume의 Career 또는 common portfolio의 supporting/context proof로 남을 수 있다. 이를 대표 성과에 넣기 위해 다른 사례와 합성하거나 ownership을 높이지 않는다.

## 작성 규칙

- 구조 고정: `Executive Summary -> My Scope -> Problem And Constraints -> Decision And Alternatives -> System Design And Implementation -> Failure Modes And Operation -> Evidence, Result, And Limits -> Stack`.
- `Executive Summary`는 recruiter도 이해할 수 있는 2~3문장으로 problem, decision, contribution strength를 요약한다.
- 기술담당자를 위해 constraints, 실제 대안, trade-off, failure mode, operating evidence, limits를 본문에서 분리한다.
- frontmatter의 `claim_ids`가 [claim registry](../../../evidence/claims/README.md)를 직접 가리킨다. 케이스 본문은 해당 claim의 strength와 allowed copy 상한을 넘지 못한다.
- 공개 가드레일 상속: provider 실명 X, 고객사/브랜드명 X, 팀원 실명 X, 커밋 수 X, 미검증 수치 X.
- **전임자/기존 코드 폄하 금지** — "빠른 검증에 맞춘 초기 구조" 같은 중립 서술.
- **결과 주장은 확인된 사실만** — 적용/효과를 확인 안 했으면 "~하도록 설계"까지만.
- `diagram:` 라인 컨벤션 — `->`로 노드 구분, `[soft]` 접두는 보조 노드. 조립 시 CSS 다이어그램으로 변환.
- stack 항목도 검증 대상 (repo 의존성/설정으로 확인).

## 갱신 규칙

새 케이스 재료가 생기면: evidence record -> claim registry -> 여기 case -> resume/portfolio 선별 순서로 갱신한다. 순서 역행 금지.
