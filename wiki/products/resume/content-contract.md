---
type: product-contract
title: Resume Content Contract
description: A4 resume의 고정 섹션, 문체, claim, public safety 계약.
timestamp: 2026-07-11
tags: [resume, contract, content]
---

# Resume Content Contract

## Outcome

헤더와 요약만 읽어도 다음이 보여야 한다.

1. Primary category: Backend Engineer
2. Specialty: AI Product Systems
3. Ownership: 어떤 시스템을 전담·주도·공동 기여했는지
4. Differentiator: agent-readable workflow로 실행과 운영을 구조화한 방식

Canonical positioning은 [profile/identity.md](../../profile/identity.md)를 따른다.

## Audience And Handoff

- Primary reader: recruiter. Secondary reader: engineering manager.
- Resume는 인터뷰 여부를 판단할 수 있는 category, specialty, ownership, selected proof만 전달한다.
- 문제 배경, 제약, 대안, trade-off, failure mode는 portfolio case로 보낸다.
- flagship claim은 동일 claim ID를 사용하는 portfolio case 또는 명시된 backlog와 연결한다.

## Static Frame

| Zone | # | Section | Contract |
| --- | --- | --- | --- |
| - | - | Header | 이름·연락처 고정. role-line만 JD에 맞게 좁힐 수 있음 |
| A | 01 | 요약 | 개조식 3~4줄. category, specialty, 대표 ownership 포함 |
| A | 02 | 핵심 역량 | 기술/역량 기준 5~6그룹. 선언 1줄 + claim 근거 1줄 |
| A | 03 | 기술 | Language/FW, Data/Messaging, Infra, AI의 4행 |
| A | 04 | 대표 프로젝트 | 자체로 어필되는 최대 3개. 프로젝트당 1~2개 bullet |
| A | 05 | 경력 | 최신순 compact timeline. 조직·역할·기간 + 한 줄, 상세 bullet 금지 |
| B | 06 | 일하는 방식 | Agent Workflow 전체 유지 또는 전체 제거 |
| B | 07 | 학력·교육 | 고정 사실만 사용 |
| B | 08 | 수상·특허·자격 | 검증된 고정 사실만 사용 |

## Bullet Contract

`[시스템/도메인] + [행위와 역할 강도] + [핵심 기술 1~3개]`

- 개조식·명사형 종결을 사용한다.
- 한 bullet은 인쇄 기준 한 줄을 우선하고, 최대 두 줄을 넘기지 않는다.
- 배경, 문제 정의, 선택 이유, 트레이드오프는 [portfolio cases](../portfolio/cases/README.md)로 보낸다.
- `전담`, `주도`, `공동`, `참여`는 [evidence policy](../../rules/evidence-policy.md)와 claim registry의 상한을 따른다.
- 수치는 claim registry에 검증 근거가 있을 때만 사용한다.

## Selection Contract

- JD 맞춤은 섹션을 재설계하는 작업이 아니라 claim 선택과 순서 조정이다.
- 시기별 서술 분량은 [recency weighting](../../rules/recency-weighting.md)을 따른다 — 현재 소속이 경력 서술의 절반 이상, 초기 경력은 궤적을 잇는 최소 문장만.
- 선택한 모든 public claim은 [claim-map.yaml](claim-map.yaml)에 기록한다.
- public-safe claim만 사용하고 [public safety](../../rules/public-safety.md)를 적용한다.
- 더 자세히 설명하고 싶은 문장이 생기면 이력서가 아니라 연결된 portfolio case를 보강한다.

## Acceptance Gates

1. 15초 테스트: 헤더·요약에서 category, specialty, ownership이 읽힘
2. Evidence test: 모든 성과 bullet이 stable claim ID에 연결됨
3. Strength test: allowed copy보다 강한 역할 표현이 없음
4. Public test: provider·고객사·팀원·private path·미검증 수치가 없음
5. Layout test: A4 2장 이내, 요약·핵심 역량은 1장 안, 100% scale에서 잘림·겹침 없음
6. Portfolio split: scope·decision·trade-off·failure mode·limits가 이력서에 중복되지 않고 portfolio case로 연결됨
