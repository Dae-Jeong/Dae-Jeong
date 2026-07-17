---
type: design-spec
title: Resume And Portfolio Writing Contract
description: Recruiter-first resume and technical-reviewer-first portfolio content system linked through stable evidence claims.
timestamp: 2026-07-12
tags: [resume, portfolio, writing, content-contract, case-study]
---

# Resume And Portfolio Writing Contract

## Purpose

이 문서는 같은 경력 근거를 이력서와 포트폴리오에서 서로 다른 독자와 읽기 시간에 맞게 전달하는 계약을 정의한다.

- 이력서는 채용담당자가 인터뷰 여부를 빠르게 판단하게 한다.
- 포트폴리오는 기술담당자가 역할 범위, 기술 판단, 구현 깊이, 운영 결과를 검증하게 한다.
- 두 산출물은 같은 stable claim을 사용하지만 같은 문장을 반복하지 않는다.

Canonical positioning은 [profile identity](../../../profile/identity.md), claim strength는 [evidence policy](../../../rules/evidence-policy.md), 공개 범위는 [public safety](../../../rules/public-safety.md)를 따른다.

## Audience Priority

| Artifact | Primary reader | Secondary reader | Primary decision |
| --- | --- | --- | --- |
| Resume | Recruiter | Engineering manager | 인터뷰 대상으로 넘길 것인가 |
| Portfolio | Engineering manager / senior engineer | Recruiter | 주장과 기술 판단을 신뢰할 수 있는가 |

이 우선순위는 문서 길이뿐 아니라 정보 순서와 문장 형태를 결정한다.

## Selected Approach

`Linked Proof Ladder`를 사용한다.

```text
resume claim
    -> portfolio executive summary
    -> responsibility and constraints
    -> technical decision and trade-off
    -> implementation and failure handling
    -> operating evidence and result
    -> interview discussion
```

### Why This Approach

- 이력서와 포트폴리오의 message sync를 유지한다.
- 채용담당자에게 불필요한 구현 설명을 이력서에서 제거한다.
- 기술담당자는 portfolio case에서 claim을 빠르게 역추적할 수 있다.
- 회사별 지원 패키지는 claim과 case의 선택·순서만 바꾸고 canonical narrative를 복제하지 않는다.

### Rejected Alternatives

1. **Same-copy expansion**: 이력서 bullet을 포트폴리오에서 길게 반복하므로 두 산출물의 역할이 겹친다.
2. **Independent technical article**: 기술 깊이는 만들 수 있지만 resume claim과 contribution boundary가 쉽게 어긋난다.

## Resume Writing Contract

### Reader Flow

```text
role and positioning
    -> strongest ownership
    -> capability groups
    -> selected proof
    -> compact career timeline
```

### Sentence Formula

```text
[system/domain] + [action] + [contribution strength] + [verified result or operating scope]
```

Example:

> FastAPI 기반 AI 콘텐츠 backend 전면 재구축과 cutover 이후 개발·운영 전담

### Rules

- 한 bullet은 하나의 hiring signal만 전달한다.
- 문제 배경, 선택 이유, 대안, trade-off는 넣지 않는다.
- 기술은 claim을 식별하는 데 필요한 1~3개만 사용한다.
- `전담`, `주도`, `공동`, `참여`를 생략하지 않는다.
- 결과 수치는 stable evidence가 있을 때만 사용한다.
- project name보다 candidate capability가 먼저 읽히게 한다.
- 더 설명하고 싶은 문장은 portfolio case로 보낸다.

### Resume Acceptance

- 15초 안에 `Backend Engineer`, `AI Product Systems`, 대표 ownership이 읽힌다.
- 각 bullet이 stable claim ID에 연결된다.
- 한 bullet이 인쇄 기준 두 줄을 넘지 않는다.
- 독자가 구현 상세를 몰라도 candidate의 역할을 판단할 수 있다.

## Portfolio Writing Contract

### Reader Flow

기술담당자는 처음부터 전체 본문을 읽지 않는다. 상단에서 scope와 핵심 판단을 확인한 뒤, 관심 있는 구현과 운영 근거로 내려간다.

```text
executive summary
    -> my scope
    -> problem and constraints
    -> decision and alternatives
    -> system design
    -> failure modes and operation
    -> evidence, result, and limits
```

### Case Structure

모든 canonical case는 아래 순서를 사용한다.

#### 1. Executive Summary

- 2~3문장.
- 해결한 문제, 핵심 결정, 본인 역할 강도를 함께 제시한다.
- recruiter도 이 부분만 읽으면 resume claim과 연결할 수 있어야 한다.

#### 2. My Scope

- 직접 책임진 범위와 다른 구성원의 영역을 구분한다.
- 설계, 구현, migration, 운영 중 해당되는 범위를 명시한다.
- claim registry의 strength를 넘지 않는다.

#### 3. Problem And Constraints

- 사용자를 방해한 구체적인 product/operation 문제를 설명한다.
- 당시 유지해야 했던 호환성, 일정, 운영 중단, 데이터, 보안 제약을 기록한다.
- 전임자나 기존 코드를 평가하지 않고 당시 목적과 한계로 설명한다.

#### 4. Decision And Alternatives

- 선택한 구조와 그 선택 기준을 설명한다.
- 실제로 검토했거나 당시 가능한 대안만 기록한다.
- 선택하지 않은 대안의 장점도 인정하고, 당시 제약에서 배제한 이유를 쓴다.

#### 5. System Design And Implementation

- boundary, data flow, lifecycle, state transition을 중심으로 설명한다.
- library 목록보다 component 책임과 상호작용을 우선한다.
- diagram은 본문을 반복하지 않고 전체 흐름을 한 번에 보여준다.

#### 6. Failure Modes And Operation

- timeout, retry, partial failure, race, rollback, migration, monitoring 중 실제로 다룬 항목을 쓴다.
- happy path 구현보다 production에서 무엇이 깨질 수 있었고 어떻게 제한했는지를 보여준다.

#### 7. Evidence, Result, And Limits

- code/release/tool-backed 결과와 운영 상태를 구분한다.
- 개선 전후가 없으면 `개선했다` 대신 `구축했다`, `운영했다`, `확인했다`를 사용한다.
- 미해결 한계와 다음 판단을 짧게 남긴다.

#### 8. Stack And Evidence Links

- stack은 마지막에 둔다.
- public repository, architecture artifact, public metric처럼 공개 가능한 근거만 연결한다.
- private path, credential, 고객사와 provider detail은 노출하지 않는다.

### Portfolio Sentence Style

- 첫 문장에서 결론을 말하고 뒤에서 근거를 설명한다.
- `왜`, `어떤 제약에서`, `무엇과 비교해`를 포함한다.
- 추상어 뒤에는 concrete artifact나 failure mode를 붙인다.
- 기술 용어는 면접 질문을 받을 수 있는 범위에서만 사용한다.
- 자기평가보다 관측 사실과 판단 과정을 쓴다.

### Portfolio Acceptance

- 첫 화면에서 problem, decision, scope가 읽힌다.
- 핵심 설계 결정마다 당시 제약 또는 trade-off가 연결된다.
- 구현 설명에 최소 하나의 failure mode 또는 operating concern이 포함된다.
- 결과와 inference가 구분된다.
- 기술담당자가 case를 읽고 구체적인 후속 질문을 만들 수 있다.

## Claim And Content Flow

```text
profile facts
    -> evidence project record
    -> claim registry
    -> resume selection
    -> portfolio case expansion
    -> company-specific assembly
```

### Sync Rules

- Resume와 portfolio는 같은 claim ID를 사용한다.
- Portfolio는 resume보다 자세할 수 있지만 더 강한 ownership을 주장할 수 없다.
- Resume에 선택된 flagship claim은 대응하는 portfolio case를 가져야 한다.
- Portfolio case가 없으면 resume link를 만들지 않고 case backlog로 분류한다.
- 회사별 맞춤 산출물은 같은 JD 분석 결과로 resume claim과 portfolio case를 같은 순서로 선별한다.

## Example: Thready

### Resume

> FastAPI 기반 AI 콘텐츠 backend 전면 재구축과 cutover 이후 개발·운영 전담

### Portfolio Expansion

- **Executive summary**: 운영 중인 초기 backend를 유지하면서 신규 backend를 병행 구축하고 cutover했다. 이후 생성 품질을 prompt 감각이 아니라 typed input, judge, evaluation loop로 관리했다.
- **My scope**: 신규 backend 재구축, cutover 이후 release operation, generation quality system 전담.
- **Problem**: 초기 검증 구조와 재현 불가능한 prompt 수정 방식이 제품 운영 단계의 변경·품질 판단을 어렵게 했다.
- **Decision**: 운영 버전의 부분 변경 대신 신규 backend를 병행 구축했다. 생성 입력과 품질 판정을 code-level contract로 이동했다.
- **Implementation**: DDD layered backend, typed prompt builder, critique/revise pipeline, LLM judge, persisted quality data.
- **Operation**: 기존 release를 유지하면서 cutover하고 이후 version cycle과 QA task를 운영했다.
- **Limit**: 현재 traffic·latency·cost 개선 전후는 public claim 근거가 없어 운영 범위와 품질 workflow 구축까지만 표현한다.

## Failure Patterns To Prevent

| Failure | Resume response | Portfolio response |
| --- | --- | --- |
| 기술 나열 | capability와 ownership 중심으로 축소 | 선택 이유와 boundary로 전환 |
| 장황한 배경 | 삭제 | 제약을 이해하는 데 필요한 내용만 유지 |
| 과대 claim | claim strength로 낮춤 | My Scope에서 경계 명시 |
| 결과 없는 `개선` | 구축·운영 표현으로 교체 | 측정 방식 또는 현재 한계 기록 |
| 같은 문장 반복 | 한 줄 hiring signal만 유지 | decision, failure, operation으로 확장 |
| portfolio가 기술 블로그화 | resume-selected problem으로 범위 제한 | 독립 글감은 writing backlog로 이동 |

## Migration Scope

다음 구현 단계에서는 문서 구조와 문장 계약만 변경한다.

1. [resume content contract](../../../products/resume/content-contract.md)에 audience와 portfolio handoff 규칙 반영.
2. [portfolio contract](../../../products/portfolio/README.md)와 case library 작성 규칙 갱신.
3. 기존 5개 case에 `Executive Summary`, `My Scope`, `Constraints`, `Decision/Alternatives`, `Failure/Operation`, `Limits` 구조 적용.
4. Resume flagship claim과 portfolio case coverage 검증.

## Out Of Scope

- portfolio visual redesign과 frontend 구현.
- 새로운 성과 수치 생성.
- 회사별 맞춤 resume/portfolio 생성.
- 신규 RAG, Kubernetes, observability 프로젝트 구현.
- 공개 URL과 hosting 구성.

## Completion Criteria

- Resume와 portfolio의 독자·목적·문체가 문서 계약에서 명시적으로 구분된다.
- 기존 5개 case가 동일한 case structure를 사용한다.
- 모든 flagship resume claim이 portfolio case 또는 명시된 backlog로 연결된다.
- claim strength와 public-safety validator가 계속 통과한다.
- 이력서 본문은 portfolio 세부 내용 때문에 길어지지 않는다.
