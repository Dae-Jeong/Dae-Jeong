---
type: idea
title: Resume Assembly Kit
description: 검증된 이력서·포트폴리오 문안을 재사용 블록과 직군 preset으로 조립해 회사별 작성 시간을 줄인다.
status: spec
registered: 2026-08-31
tags: [backlog, resume, portfolio, workflow]
---

# Resume Assembly Kit

## 한 줄

매 지원마다 긴 문서를 다시 쓰지 않고, 검증된 성과·경력·기술 블록을 직군 preset에 끼운 뒤 JD 연결 문장과 순서만 조정한다.

## 메모

- 확정된 Common 구성: 이력서·경력기술서·포트폴리오·CV 네 문서를 모두 유지한다.
- 확정된 회사별 구성: 이력서·경력기술서·포트폴리오를 기본으로 조립하고 CV는 지원처의
  요구에 따라 선택한다.
- `비한국 회사이면 CV` 같은 단일 조건은 쓰지 않는다. 회사 국적·JD·지원 채널을 함께
  보고 회사별 CV를 선택하되, Common CV 자체는 항상 관리한다.
- 현재 `claim registry`, 공통 이력서, 직군별 draft, portfolio case library는 있지만 재사용 단위가 stable block ID로 묶여 있지 않아 회사별 `content-draft.md`와 typed content에 긴 문안이 반복된다.
- 고정 블록: header, career facts, credentials, public-safety·claim boundary.
- 선택 블록: 성과 case의 resume-depth 문안, portfolio-depth proof, skill lane.
- preset: Backend, AI Product Backend, Product Ownership, AX/FDE. 각 preset은 기본 블록 집합과 순서만 소유한다.
- 회사별 변경 범위: eligibility·gap 판정, 성과 축 선택과 순서, 소개의 JD bridge, 회사가 맡길 일과 case의 연결 문장.
- 회사별로 다시 만들지 않는 범위: 경력 사실, 수치, ownership verb, 기술 mechanism, case의 검증·한계.
- 최소 조립 형태 후보: `preset + selected block IDs + order + short overrides -> content draft / typed route / PDF`.
- 범용 CMS·DB·별도 backend는 두지 않는다. 우선 기존 TypeScript content registry와 Markdown review gate 안에서 해결한다.
- 착수 전에는 실제 지원본 여러 개에서 반복 문장과 매번 달라진 문장을 비교해 block 경계를 확정한다.

## 연결

- [Initial case inventory](initial-case-inventory.md)
- [Common 4-Document Package implementation plan](../../docs/superpowers/plans/2026-09-01-common-document-package-implementation.md)
- [Resume product](../../products/resume/README.md)
- [Role variants](../../products/resume/role-variants.md)
- [Tailored Application Lifecycle](../../products/resume/application-lifecycle.md)
- [Resume Document Package Contract](../../products/resume/document-package-contract.md)
- [Portfolio case library](../../products/portfolio/cases/README.md)
- [Tailor Resume skill](../../../skills/tailor-resume/SKILL.md)

## 승격

2026-09-02: 재사용 블록의 문안 원형(제목 + 문제·판단·구현 경계·결과)·강도·허용 수치·preset 순서는
[Resume Block Library](../../products/resume/resume-block-library.md)로 승격했다. 고정 층·포장 범위·제출 게이트는
[Application Copy Standard](../../rules/application-copy-standard.md)가 소유한다. 이 backlog에는 typed block schema와
`preset + block IDs + order + overrides -> draft` 자동 조립만 남는다.

문서 패키지 범위와 선택 규칙은
[Resume Document Package Contract](../../products/resume/document-package-contract.md)로 승격했다.
구현 task와 의존관계는
[Common 4-Document Package implementation plan](../../docs/superpowers/plans/2026-09-01-common-document-package-implementation.md)이
소유한다. Common 경력기술서·CV의 문안 owner와 block schema를 만든 뒤 기존 회사별
지원본을 한 번에 옮기지 않고 JYP·피처링부터 적용한다.
