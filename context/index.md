---
type: index
title: Context Index
description: Routing map for Dae-Jeong personal profile and resume workspace.
timestamp: 2026-07-02
tags: [context, routing, profile, resume]
---

# Context Index

이 문서는 이 repo에서 어떤 정보를 어디서 읽고 어디에 적재할지 정하는 라우터다.

## 읽는 순서

| 상황 | 읽을 문서 |
| --- | --- |
| 어떤 작업이든 시작할 때 | `context/manifest.yaml`, `context/current-state.md`, `profile/README.md` |
| 김대정에 대한 짧은 canonical profile이 필요할 때 | `context/profile.md` |
| 자기소개, bio, headline을 작성할 때 | `profile/identity.md`, `docs/resume/04-resume-content-brief.md`, `docs/resume/05-contribution-ax-positioning-draft.md` |
| 경력과 회사 프로젝트를 정리할 때 | `profile/career.md`, `profile/contribution.md`, `docs/resume/02-company-work-evidence.md`, `docs/resume/06-workspace-project-audit.md` |
| BE/Infra/Agent/AX 역량을 정리할 때 | `profile/capabilities.md`, `profile/agent-workflow.md`, `docs/resume/06-workspace-project-audit.md` |
| JD 분석을 할 때 | `profile/capabilities.md`, `profile/contribution.md`, `docs/resume/05-contribution-ax-positioning-draft.md`, `docs/resume/06-workspace-project-audit.md` |
| 새 문서 위치를 판단할 때 | `rules/document-routing.md` |

## Source Of Truth 규칙

- 김대정의 안정적인 profile 정보는 `profile/`에 둔다.
- 짧은 소개와 현재 positioning snapshot은 `context/profile.md`에 둔다.
- resume homepage, JD, case-study, claim 검증 산출물은 `docs/resume/`에 둔다.
- routing, evidence, 문서 위치 기준은 `rules/`에 둔다.
- 오래될 수 있는 정보는 `context/current-state.md`에 snapshot으로 둔다.

## 디렉토리 역할

| 경로 | 역할 | 비고 |
| --- | --- | --- |
| `context/` | agent와 작업자가 처음 읽는 라우팅/현재 상태 | 짧게 유지 |
| `profile/` | 김대정 개인 profile 원장 | 공개 페이지와 resume의 재료 |
| `docs/resume/` | 분석, 초안, JD map, case-study draft | 작업 산출물 |
| `rules/` | 문서 라우팅과 evidence 기준 | 새 문서 생성 전 확인 |
| `docs/superpowers/` | skill 기반 plan/spec 기록 | 실행 흔적 |

## 현재 주요 결론

김대정의 현재 public positioning은 "backend engineer who uses AI"보다 "BE/AI backend/Infra를 직접 구축해본 엔지니어가 agentic workflow와 AX로 조직 병목을 해결하려는 사람"에 가깝다.
