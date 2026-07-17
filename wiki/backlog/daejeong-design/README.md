---
type: idea
title: Daejeong Design (D2)
description: open-design 독립 포크 — 로컬 코딩 에이전트를 디자인 엔진으로 쓰는 디자인 워크스페이스. 도구는 별도 repo, 여기서는 harness 접점 기획을 추적.
status: wip
registered: 2026-07-15
tags: [backlog, daejeong-design, design, agent-workflow]
---

# Daejeong Design (D2)

## 한 줄

`nexu-io/open-design`의 독립 포크. 로컬 코딩 에이전트(Claude Code 등)를 디자인 엔진으로 쓰는 로컬 디자인 워크스페이스를 이력서·포트폴리오 디자인 생성 용도로 특화한다.

## 메모

- 도구 개발 자체는 별도 repo(daejeong-design)가 소유하고 현재 진행 중 — 이 entry는 **이 harness와의 접점 기획만** 추적한다.
- 작업 경계 (2026-07-16 확정): 이력서·포트폴리오 페이지 디자인 작업은 **D2의 "Profile" 프로젝트 내부에서만** 진행한다. 디자인 버전 분리도 그 프로젝트 안에서 한다.
- 승격 모델 (2026-07-18 개정): "이 repo에 산출물을 두지 않는다"를 개정 — **확정본은 `app/design/`(제품별 design 폴더)으로 승격(복사)**한다. monorepo가 self-contained해야 Phase 1 구현이 D2 없이도 기준물을 갖기 때문. 작업은 여전히 D2에서만, 이 폴더 직접 수정 금지.
- 접점 기획 3가지:
  1. **디자인 파이프라인** — resume/portfolio/site 디자인 산출을 D2로 생성 (harness는 content source, D2는 design consumer — 기존 경계 결정 유지).
  2. **노출 후보** — 자기 도구를 `/labs` 상세 페이지로 소개하거나 서비스로 노출.
  3. **증거 승격 후보** — "코딩 에이전트를 디자인 엔진으로 쓰는 도구를 직접 포크·특화·운영"은 agent-readable workflow 차별화의 개인 증거. 사용·운영 기록이 쌓이면 claim 승격 검토.

## 연결

- `wiki:daejeong-design` — 사용법, d2 CLI, od↔d2 네이밍 계약
- 알려진 버그 (2026-07-16): 후속 run의 `--message`가 spawned agent에 빈 입력으로 전달 — 리포트는 D2 repo `docs/bug-report-run-message-relay.md`. 해소 전까지 반복 수정은 파일 직접 편집으로 우회 중. dogfooding claim 승격의 선행 조건.
- [Personal Site Architecture Design](../../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md) — labs 노출 시

## 승격

노출·claim 기획이 구체화되면 spec으로. 도구 개발 진행 상태는 해당 repo가 추적.
