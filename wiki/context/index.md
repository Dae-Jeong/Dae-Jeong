---
type: index
title: Context Router
description: 작업 의도별로 필요한 최소 source-of-truth만 안내하는 router.
timestamp: 2026-07-11
tags: [context, routing, progressive-disclosure]
---

# Context Router

## 최소 읽기 순서

| 상황 | 읽기 |
| --- | --- |
| **무엇이 확정 사실인가** | **[../profile/canonical-baseline.md](../profile/canonical-baseline.md)** — 확정값 통합 인덱스. 산출물 작업 전 여기부터 |
| 현재 진행 상태 | [current-state.md](current-state.md) |
| **무엇이 남았나** | **[todo.md](todo.md)** — 통합 작업 목록 |
| 아이디어 등록·상태 | [../backlog/README.md](../backlog/README.md) |
| 한 줄 소개와 branding | [../profile/identity.md](../profile/identity.md) |
| 경력 timeline·연차 산정 | [../profile/career.md](../profile/career.md) |
| 역량과 기여 범위 | [../profile/capabilities.md](../profile/capabilities.md), [../profile/contribution.md](../profile/contribution.md) |
| claim 검증 | [../evidence/README.md](../evidence/README.md) |
| 이력서 | [../products/resume/README.md](../products/resume/README.md) |
| 포트폴리오 | [../products/portfolio/README.md](../products/portfolio/README.md) |
| 홈페이지 | [../products/homepage/README.md](../products/homepage/README.md) |
| JD 분석 | [../products/jd/README.md](../products/jd/README.md) |
| 문서 위치 판단 | [../rules/document-routing.md](../rules/document-routing.md) |
| 시기별 서술 비중 | [../rules/recency-weighting.md](../rules/recency-weighting.md) |
| 고객사 마스킹 | [../evidence/clients.md](../evidence/clients.md) |

## Context Budget

현재 질문에 필요한 최소 문서만 읽는다. `context/`는 지식 저장소가 아니라 router와 snapshot이며, 긴 근거·초안·산출물을 추가하지 않는다.

## Canonical And Derived

- canonical: `profile/`, `evidence/`, `products/*/decisions.md`, `products/*/content-contract.md`, `rules/`
- derived snapshot: `context/current-state.md`, `context/todo.md`, `context/profile.md`, `profile/canonical-baseline.md`
  - `canonical-baseline.md`는 여러 레이어의 확정값을 모은 **통합 인덱스**다. 값이 owner 문서와 어긋나면 **owner 쪽이 맞다**.
- non-canonical history: `archive/`
