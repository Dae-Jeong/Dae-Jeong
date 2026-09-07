---
type: report
title: 이력서 첫 페이지 설득 구조 — 수용 원칙 분석
description: 사용자 제공 PDF에서 타당성이 높은 원칙만 선별해 현재 resume contract와 연결한 분석 기록.
timestamp: 2026-09-05
derived_from: [products/resume/content-contract.md, products/resume/decisions.md, rules/application-copy-standard.md, rules/evidence-policy.md]
tags: [resume, first-page, scanability, persuasion, information-hierarchy]
---

# 이력서 첫 페이지 설득 구조 — 수용 원칙 분석

## Source And Scope

- Source: user-provided PDF `합격하는 이력서의 비밀`, 2026-09-05 검토.
- Method: 19쪽 전체 text extraction과 page render를 대조하고, 현재 공통 이력서 첫 장·resume contract·claim policy와 비교했다.
- Scope: 원문의 모든 주장을 요약하지 않는다. 타당성이 높고 현재 문서 체계에 수용할 가치가 있다고 판정한 원칙만 보존한다.
- Boundary: 원문의 template·사진·색상·기술 logo 같은 구현 취향은 이 문서의 채택 대상이 아니다. 이 문서는 정보 위계와 설득 순서만 다룬다.

## Accepted Principles

### 1. 첫 장은 빠른 판정 지면이다

첫 장의 목적은 전체 기술력을 설명하는 것이 아니라 독자가 다음 질문에 빠르게 답하게 하는 것이다.

1. 어떤 역할의 사람인가.
2. 현재와 직전의 주요 경력은 무엇인가.
3. 가장 강한 제품·기술 성과는 무엇인가.
4. 더 확인하거나 연락하려면 어디로 가야 하는가.

`정확히 N초` 같은 수치를 hard rule로 사용하지 않고, 짧은 scan에서 위 네 답이 보이는지를 검증 기준으로 삼는다.

Existing owner: [Resume Content Contract](../content-contract.md#outcome), [Resume Decisions](../decisions.md).

### 2. 기술 목록보다 결과와 책임 범위를 먼저 보여준다

기술명은 구현 수단이며 단독으로 역량을 증명하지 못한다. 첫 장에서는 어떤 제품·문제를 맡았고 무엇을 바꿨는지 먼저 보여주고, stack은 그 결과를 만든 방법을 검증하는 supporting layer로 둔다.

대정님의 첫 장에서는 다음 순서를 유지한다.

```text
역할·경력 사실
  -> 짧은 포지셔닝
  -> 대표 제품·성과
  -> 구현 기전과 검증
  -> 기술 index
```

Existing owner: [Resume Product](../README.md#product-contract), [Resume Content Contract](../content-contract.md#active-frame).

### 3. 포지셔닝은 짧게 선언하고 바로 증명한다

포지셔닝 문장은 독자가 어떤 관점으로 아래 경력과 성과를 읽을지 정하는 장치다. 길게 자기 설명을 반복하지 않고, 선언 직후의 경력·대표 성과가 같은 역할을 반복해서 증명해야 한다.

- 브랜드 정체성은 한 문장으로 둔다.
- 채용 역할은 직함과 경력에서 즉시 확인되게 한다.
- 차별점은 형용사가 아니라 제품 outcome·판단·구현 책임의 반복으로 증명한다.
- 자기소개 분량은 고정 글자 수가 아니라 첫 장의 핵심 경력과 성과를 밀어내지 않는지로 판정한다.

Existing owner: [Application Copy Standard](../../../rules/application-copy-standard.md#1-2-15초-문장--세-사실), [Resume Role Positioning Standard](../role-positioning-standard.md).

### 4. 첫 장에는 2-3개의 강한 판정 신호를 둔다

독자가 기억할 수 있는 소수의 강한 신호로 첫 장을 구성한다. `반드시 세 가지`처럼 개수를 고정하지 않고, 지원 역할과 JD에 따라 가장 강한 2-3개를 선택한다.

대정님의 공통 기준 신호는 다음 세 범주에서 고른다.

- 고객이 구독하는 제품을 팀과 만들고 직접 구현·운영한 경험
- production 전환·복구·정합성처럼 backend reliability를 만든 경험
- 판단과 구현 기준을 template·agent context·검증 gate로 반복 가능하게 만든 경험

같은 내용을 별도 강점 card와 대표 성과에서 중복하지 않는다. 대표 성과 자체가 판정 신호를 맡는다.

Existing owner: [Application Copy Standard](../../../rules/application-copy-standard.md#2-포장--허용되는-범위), [Resume Block Library](../resume-block-library.md).

### 5. 수치는 맥락이 있을 때 강한 시각 신호가 된다

전후 변화·분모·측정 범위가 있는 수치는 긴 설명 없이 결과를 이해시키므로 적극 사용한다. 다만 숫자를 만들기 위해 범위·책임·구조를 억지로 백분율로 바꾸지 않는다.

수치 사용 조건:

1. stable claim ID와 evidence anchor가 있다.
2. 무엇을 어떤 기준으로 비교했는지 설명할 수 있다.
3. 팀 outcome과 개인 contribution을 구분한다.
4. 면접에서 집계 정의와 한계를 설명할 수 있다.

수치가 없으면 실제 담당 범위, 선택한 경계, 버린 대안, 실패 복구 방식, 운영 책임으로 재현 가능성을 증명한다.

Existing owner: [Application Copy Standard](../../../rules/application-copy-standard.md#1-4-수치-정책), [Evidence Policy](../../../rules/evidence-policy.md).

### 6. 시각화의 목적은 장식이 아니라 읽는 순서를 만드는 것이다

고정 PDF와 명확한 시각 위계는 제출 환경에서 레이아웃을 보존하고 첫 장의 읽는 순서를 안정시킨다. 이를 `image-only resume`로 해석하지 않는다.

- 제목·본문·metadata의 크기와 간격으로 위계를 만든다.
- 중요한 정보는 selectable text로 유지한다.
- 사진·logo·색상 없이도 역할과 성과가 판정돼야 한다.
- 색상은 의미 보조로만 사용하며 정보의 유일한 전달 수단으로 쓰지 않는다.
- 포트폴리오의 diagram은 구조 이해를 돕지만 이력서의 핵심 경력 사실을 대체하지 않는다.

Existing owner: [Resume Content Contract](../content-contract.md#typography-contract), [Design Diagram Library](../../portfolio/design-diagram-library.md).

### 7. 설득 흐름은 관심보다 신뢰로 닫는다

원문의 설득 단계를 이력서 정보 구조로 번역해 수용한다.

| Reader state | Resume function | Daejeong surface |
| --- | --- | --- |
| 무엇을 하는 사람인가 | 역할과 category 판정 | header·소개 |
| 어떤 결과를 만들었나 | strongest proof 제시 | 대표 성과 |
| 다시 할 수 있는 사람인가 | 판단·구현·검증으로 신뢰 형성 | 경력·성과 상세·기술 |
| 어떻게 더 확인하나 | 다음 검증 경로 제공 | 연락처·GitHub·portfolio |

행동 유도는 광고성 CTA 문구가 아니라, 독자가 충분한 evidence를 확인하고 바로 연락할 수 있는 상태를 만드는 것이다.

Existing owner: [Resume Content Contract](../content-contract.md#audience-and-handoff), [Site Surface Roles](../../site/surface-roles.md).

## Adoption Decision

현재 공통 이력서는 위 원칙을 이미 대부분 충족한다. 이 분석으로 별도의 template이나 새 section을 추가하지 않는다.

향후 이력서 수정에서 다음 네 항목을 human review 질문으로 사용한다.

1. 첫 장만 보고 역할·현재 경력·가장 강한 성과·연락 경로를 답할 수 있는가.
2. 기술 목록보다 제품·운영 결과와 contribution이 먼저 보이는가.
3. 첫 장의 2-3개 판정 신호가 서로 다른 역량을 증명하며 중복되지 않는가.
4. 시각적 강조를 제거해도 text와 evidence만으로 같은 판단이 가능한가.

기계 gate를 새로 추가하지 않는다. 이미 존재하는 15초 문장·첫 장 scanability·claim·수치·public-safety gate가 이 원칙의 실행 owner다.
