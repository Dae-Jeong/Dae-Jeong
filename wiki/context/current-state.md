---
type: current-state
title: Current State
description: Completed harness migration and active resume master v1 state; this file is a derived snapshot.
timestamp: 2026-07-15
canonical: false
derived_from: [profile/, evidence/claims/, products/]
tags: [current-state, migration, resume]
---

# Current State

## Current Baseline

- `Profile -> Evidence -> Products` knowledge harness migration 완료.
- 기존 A4 이력서 초안은 [v0 baseline](../products/resume/master/v0/README.md)으로 보존하고, [v1](../products/resume/master/v1/README.md)을 active general master로 사용한다.
- primary brand는 [profile identity](../profile/identity.md)가 소유하며 `Backend Engineer` / `AI Product Systems` / `Agent-readable Engineering Workflow` 순서다.
- Daejeong Design은 별도 repo에서 도구 개발을 진행하며 이 repo는 profile/evidence/resume content source를 소유한다.
- 개인 사이트(이력서·포트폴리오·블로그)는 이 repo `site/`에 Next.js 앱으로 둔다 — [2026-07-15 설계 확정](../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md), 구현 착수는 보류.

## Migration Status

| Layer | Status |
| --- | --- |
| portable runtime | complete |
| root routing hubs | complete |
| evidence/claim registry | complete |
| profile normalization | complete |
| resume/portfolio/homepage/JD products | complete |
| skill adapters | complete |
| temporary clean-clone verification | complete (2026-07-11) |

## Verification Baseline

- `uv sync --locked`: pass
- workspace metadata/link/path/claim validation: pass
- tracked symlink and local-only path check: pass
- Playwright PDF smoke render: A4, 2 pages
- `git clone --no-local` temporary clone verifier: pass

## Next

1. site Phase 1 착수: scaffold, `/resume`(+PDF)·`/portfolio`·`/blog` hub, Vercel·도메인 연결로 공개 URL 확정
2. 실제 JD 1건으로 `tailor-resume` 지원 패키지 생성
3. 공개 URL 확정 후 homepage consumer에 v1 selected proof·resume link·portfolio deep link 반영
