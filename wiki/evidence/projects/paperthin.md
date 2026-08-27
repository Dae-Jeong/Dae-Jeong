---
type: project-evidence
title: Paperthin Evidence
description: 기존 codebase를 다음 판단의 권위로 삼지 않고 실제 검증과 학습을 다음 cycle의 입력으로 바꾸는 agentic design pattern 근거.
timestamp: 2026-08-27
source_roots: [personal-workspace]
tags: [paperthin, coding-agent, agentic-design, decision-boundary, open-source]
---

# Paperthin Evidence

Source locator: `personal-workspace:paperthin` · public repository `github:LilMGenius/paperthin`

## Project Boundary

- Source-backed: Paperthin은 Claude Code·Codex 등 여러 coding agent에서 사용할 수 있는 agent-agnostic Markdown skill library다.
- Code-backed: 2026-08-27 기준 package version은 `0.17.4`, catalog에는 28개 skill이 등록돼 있다.
- Git-backed: local repository의 전체 49개 commit 중 `LilMGenius`가 41개를 작성했고 `package.json`도 `LilMGenius`를 author로 명시한다. 아래 구조의 설계·구현 ownership은 `owned`로 분류한다.
- Boundary: Paperthin은 coding agent의 작업·판단 workflow를 설계한 개인 open-source project다. 기초 모델의 가중치나 추론 algorithm을 변경한 프로젝트가 아니다.

## Evidence-First Decision Cycle

User-confirmed (2026-08-27): 기존 code가 많이 쌓였거나 이미 architecture가 존재한다는 이유만으로 coding agent가 그 codebase에 가중치를 두고 다음 결정을 정당화하는 문제를 줄이기 위해 다른 cycle 구조를 설계했다.

Repository가 구현한 해법은 `codebase -> next decision`의 직접 연결을 끊고, 다음 네 단계를 판단 근거로 삼는 것이다.

```text
one vertical build
  -> real-surface QA
  -> lesson · anti-pattern · quality gate
  -> keep / iterate / clean-v0 restart
```

- Code-backed (`re0-loop`): progress를 hours·files·panels·features가 아니라 **quality-cleared template, reusable module, later cycle에서 제거된 anti-pattern**으로 정의한다. test만으로 끝내지 않고 web·HTTP·CLI 등 artifact의 실제 surface를 검증한다.
- Code-backed (`re0-memo`): 완료·실패 cycle에서 changelog 대신 portable lesson, anti-pattern, quality gate, negative corpus를 추출한다. 개별 사용자 불만은 그대로 규칙화하지 않고 같은 class를 막는 root pattern으로 올린다.
- Code-backed (`re0-work`): 다음 pass는 기존 architecture를 복사하지 않고 clean v0에서 시작한다. QA를 통과한 contract·schema·test·gate·vocabulary·negative corpus만 보존하며, code는 존재한다는 이유만으로 이월하지 않는다.
- Code-backed (`nba`): 다음 행동은 repo 규모나 눈에 띄는 task가 아니라 live cycle의 gate·evidence·phase에서 binding constraint를 찾아 하나만 제안한다. 실행과 최종 선택 권한은 갖지 않는다.
- Code-backed (`macrothink`, `prism`, `modelchk`): 기존 framing을 제거한 fresh read, 서로 다른 failure-mode lens, capability tier와 reasoning effort의 분리를 통해 하나의 codebase signal이나 첫 framing이 전체 판단으로 확대되는 것을 막는다. 같은 모델의 합의는 proof가 아니라 reassurance로만 취급한다.

## Decision Boundary

- 사람 또는 main executor가 architecture·keep/restart·release 판단을 소유한다.
- skill은 state와 evidence를 읽고 제안하거나 검증한다. autonomous routing, model switching, release authority를 갖지 않는다.
- 더 강한 모델이나 더 높은 reasoning effort가 test·review·manual QA를 대체하지 않는다.
- outside truth가 들어오지 않는 내부 반복은 중단하고 실제 surface evidence를 먼저 추가한다.

## Verification

- Tool-backed (2026-08-27): `validate-skills.sh` 통과 — `28 skills`.
- Tool-backed (2026-08-27): `check-catalog-sync.cjs` 통과 — README·plugin·runtime catalog의 28개 entry가 일치.
- Environment limitation: local macOS 기본 Bash 3.2에는 `mapfile`과 associative array가 없어 `check-skill-refs.sh`, `check-links.sh`를 이 환경에서 완주하지 못했다. 이는 통과 근거로 사용하지 않는다.
- Git-backed: `re0-loop`, `re0-memo`, `re0-work`, `nba`, `macrothink`, `prism`, `modelchk`의 현재 spec과 release history를 대조했다.

## Public Wording

- 공개 가능: 개인 open-source Paperthin, evidence-first agent cycle, real-surface QA, lesson·anti-pattern·quality gate, clean-v0 restart, human decision boundary.
- 공개 금지: AI model 자체를 개선·학습·fine-tuning했다는 표현, coding agent 의사결정 정확도 향상 수치, 회사 AX 성과로 귀속, autonomous engineering team·인력 대체 표현.
- 강도: Paperthin의 구조 설계·구현·공개는 `owned`. 실제 생산성·비용·정확도 개선은 측정 근거가 없어 claim하지 않는다.

## Claim Candidate

| ID | Statement | Strength |
| --- | --- | --- |
| `paperthin.evidence-first-agent-cycle` | 기존 codebase를 다음 판단의 권위로 삼지 않고 real-surface evidence에서 lesson·anti-pattern·quality gate를 추출해 다음 v0의 입력으로 쓰는 agent cycle 설계·공개 | owned |
