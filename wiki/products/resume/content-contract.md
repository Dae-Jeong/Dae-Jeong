---
type: product-contract
title: Resume Content Contract
description: Active web resume의 구조, claim, public safety, derived-output 계약.
timestamp: 2026-08-13
tags: [resume, contract, content]
---

# Resume Content Contract

## Ownership

- 사실·연차·경력 원장: `profile/`
- 주장·강도·공개 범위: `evidence/claims/`
- 이력서 구조·선별·claim mapping: `products/resume/`
- KO 웹 이력서의 문장·순서·강조: `app/fe/app/resume/resume-view.tsx`
- EN·PDF·JD 맞춤본: active KO expression과 claim registry에서 만드는 파생 산출물

## Outcome

헤더와 경력만 읽어도 다음을 판단할 수 있어야 한다.

1. Primary category: Backend Engineer
2. Specialty: AI Product Systems
3. Career facts: 어느 회사에서 어떤 직함·기간·담당 범위였는지
4. Ownership: 어떤 시스템을 전담·주도·공동 기여했는지
5. Differentiator: agent-readable workflow로 실행과 운영을 구조화한 방식

Canonical positioning은 [profile/identity.md](../../profile/identity.md)를, 지면의 역할은 [surface-roles.md](../site/surface-roles.md)를 따른다.

## Audience And Handoff

- Primary reader: recruiter. Secondary reader: engineering manager.
- Resume는 인터뷰 여부를 판단할 수 있는 career facts, category, specialty, ownership, selected proof를 전달한다.
- 문제 배경, 제약, 대안, trade-off, failure mode의 깊은 설명은 portfolio case로 보낸다.
- 프로젝트명은 주어가 아니라 career·capability claim의 근거로 둔다.

## Active Frame

| # | Section | Contract |
| --- | --- | --- |
| - | Header | 이름·category·현재/이전 주요 경력·연락처. 회사·직함·기간이 즉시 보여야 함 |
| 01 | 요약 | category·specialty·경력 궤적을 두 단락 안에 압축. 뒤 섹션을 반복 요약하지 않음 |
| 02 | 경력 | 최신순. 조직·직함·기간·담당 범위·대표 결과. 사실을 claim보다 먼저 배치 |
| 03 | 핵심 역량 | 현재 6개 capability 축. 성과·소유 범위가 주어이고 프로젝트는 근거 라벨 |
| 04 | 일하는 방식 | 문제 재정의·측정과 게이트·표준화·예방 실행을 보여줌 |
| 05 | 기술 | 스택 나열이 아니라 실제 사용 맥락과 같이 표기 |
| 06 | Credentials | 학력·수상·특허·자격·인증의 검증된 고정 사실만 사용 |

## Claim Contract

- 수치, 강한 역할 표현, 대표 성과는 stable claim ID에 연결한다.
- `전담`, `주도`, `공동`, `참여`는 [evidence policy](../../rules/evidence-policy.md)와 registry의 `allowed_copy`·`forbidden_copy`를 따른다.
- 공개 시 [public safety](../../rules/public-safety.md)를 적용한다.
- active artifact의 claim ID는 [claim-map.yaml](claim-map.yaml)과 JSX `data-claim`에서 일치해야 한다.
- `data-claim`은 섹션 전체가 아니라 근거가 적용되는 가장 좁은 의미 단위(문단·경력 행·역량 축·credential 행)에 둔다.
- 사람용 출처 라벨(`[AI 콘텐츠 생성 제품]` 등)은 stable claim ID를 대체하지 않는다.

## Selection Contract

- JD 맞춤은 섹션을 새로 발명하는 작업이 아니라 검증된 claim의 선택과 순서 조정이다.
- JD가 이력서 작성 기준을 직접 제시하면 해당 지원본의 평가 축과 상세도 기준으로 사용한다. 한 공고의 요구를 범용 writing rule이나 새 사실로 승격하지 않는다.
- 시기별 서술 분량은 [recency weighting](../../rules/recency-weighting.md)을 따른다.
- 더 자세히 설명하고 싶은 문장이 생기면 이력서가 아니라 연결된 portfolio case를 보강한다.

## Acceptance Gates

1. Career-first: 회사·직함·기간·담당 범위가 claim보다 먼저 읽힌다.
2. Evidence: 모든 수치·강한 역할·대표 성과가 stable claim ID에 연결된다.
3. Strength: `allowed_copy`보다 강한 역할 표현이 없다.
4. Public: provider·고객사·팀원·private path·미검증 수치가 없다.
5. Surface split: 이력서는 경력 판단을, portfolio는 깊은 증명을 소유한다.
6. Derived output: PDF를 만들 때만 A4 2장, 100% scale, 잘림·겹침 없음을 별도로 검증한다.
