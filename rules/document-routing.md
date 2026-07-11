---
type: routing
title: Document Routing Rules
description: Rules for where profile, resume, agent workflow, and JD information should be stored.
timestamp: 2026-07-02
tags: [rules, routing, documentation]
---

# Document Routing Rules

## Purpose

문서 라우팅의 목적은 "좋은 내용이 생겼을 때 어디에 넣을지"를 빠르게 결정하는 것이다. 이 repo에서는 `profile/`이 원장이고, `docs/resume/`은 이력서/홈페이지/JD 작업장이다.

## Routing Table

| Content | Location | Reason |
| --- | --- | --- |
| 한 줄 소개, public bio, 핵심 positioning | `profile/identity.md` | 여러 페이지에서 반복 사용 |
| 경력 timeline, 회사/프로젝트 anchor | `profile/career.md` | 안정적인 profile fact |
| BE/Infra/Product/Agent 역량 map | `profile/capabilities.md` | JD/resume/homepage 공통 재료 |
| 회사 프로젝트별 기여도와 confidence | `profile/contribution.md` | claim 검증의 기준선 |
| agent 활용 방식과 AX narrative | `profile/agent-workflow.md` | homepage Agent 섹션의 원장 |
| 글감, writing 방향, article backlog | `profile/writing.md` | Writing 섹션 원장 |
| 기존 이력서/Oopy/Notion 분석 | `docs/resume/01-*` | source extraction artifact |
| 회사 프로젝트 evidence | `docs/resume/02-*` | 긴 근거와 file/path references |
| agent workflow evidence | `docs/resume/03-*` | 긴 근거와 external workspace references |
| homepage/resume content brief | `docs/resume/04-*` | public copy 초안 |
| BE/Infra/AX positioning 초벌 | `docs/resume/05-*` | positioning 작업 산출물 |
| workspace project audit | `docs/resume/06-*` | local repo 기반 기여도 분석 산출물 |
| JD skill map | `docs/resume/07-*` | 시장 분석 산출물 |
| gap closing roadmap | `docs/resume/08-*` | 실행 계획 산출물 |

## Evidence Rules

- `High`: repo doc/code/Git/PR/운영 문서로 직접 확인됨.
- `Medium`: 현재 구조는 확인됐지만 직접 기여 범위는 추가 확인 필요.
- `Low`: 기존 이력서나 기억 기반.
- `Unknown`: 확인되지 않음.

Public resume copy에는 `High`와 신중한 `Medium`만 사용한다. `Low`와 `Unknown`은 내부 메모로만 둔다.

## Duplication Rule

긴 근거는 한 곳에만 둔다.

- file/path/line 근거는 `docs/resume/02-*`, `03-*`에 둔다.
- `profile/`에는 요약과 링크만 둔다.
- public copy는 `docs/resume/04-*`, `05-*`에서 초안화한다.

## New Document Rule

새 문서를 만들기 전 아래를 확인한다.

1. 안정적인 김대정 profile fact인가? 그러면 `profile/`.
2. 특정 분석/초안/시장조사 산출물인가? 그러면 `docs/resume/`.
3. 문서 위치와 운영 규칙인가? 그러면 `rules/`.
4. 현재 상태 snapshot인가? 그러면 `context/current-state.md`.
