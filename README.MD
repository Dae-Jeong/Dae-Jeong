---
type: index
title: Dae-Jeong Profile Workspace
description: Personal source-of-truth workspace for resume, homepage, agent workflow, writing, and JD analysis.
timestamp: 2026-07-02
tags: [profile, resume, homepage, agent-workflow, writing]
---

# Dae-Jeong Profile Workspace

이 repo는 김대정의 이력서 홈페이지, profile source-of-truth, agent workflow, writing, JD 분석을 관리하는 개인 작업공간이다.

## 먼저 볼 문서

| 상황 | 진입점 |
| --- | --- |
| 전체 구조를 이해한다 | [context/index.md](context/index.md) |
| agent 작업 규칙을 본다 | [AGENTS.md](AGENTS.md) |
| 현재 상태와 다음 작업을 본다 | [context/current-state.md](context/current-state.md) |
| 김대정 profile 원장을 본다 | [profile/README.md](profile/README.md) |
| 이력서/홈페이지 작업물을 본다 | [docs/resume/README.md](docs/resume/README.md) |
| 문서를 어디에 둘지 판단한다 | [rules/document-routing.md](rules/document-routing.md) |

## 구조

```text
context/        작업 라우팅, 현재 상태, 짧은 profile snapshot
profile/        김대정에 대한 canonical source of truth
docs/resume/    이력서 홈페이지, JD, case-study, positioning 작업 산출물
rules/          문서 라우팅과 evidence 기준
AGENTS.md       agent 진입점
```

## 현재 포지셔닝

> BE/Infra를 직접 구축해본 엔지니어가, AI agent를 개인 생산성 도구를 넘어 조직의 AX 문제 해결 방식으로 확장하고 있다.

## 다음 큰 작업

1. JD 30~50개를 수집해 backend/platform/infra/AI automation/AX 시장 요구 역량을 분석한다.
2. `docs/resume/06-jd-market-skill-map.md`에 내 evidence와 JD 요구사항을 매핑한다.
3. `docs/resume/07-gap-closing-roadmap.md`에 부족한 역량을 채우는 계획을 만든다.
4. profile 원장을 기반으로 이력서 홈페이지의 `Resume`, `Agent`, `Writing` 섹션을 구현한다.
