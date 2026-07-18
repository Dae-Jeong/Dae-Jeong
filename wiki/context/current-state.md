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
- repo는 완전한 프로젝트 monorepo다 (2026-07-18, spec 8차 개정): `wiki/`(지식) · `app/`(fe→Vercel·be→Render·design 승격 스냅샷) · `labs/`(k8s 서비스) · `infra/` · `tools/`(자체 env) — [설계 spec](../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md).
- **Phase 1 착수됨** (2026-07-18): `app/fe` scaffold 완료 — Next 16.2.10 + Tailwind v4 + Mono 토큰 + 폰트, hello world 빌드·렌더 검증 완료.
- **디자인 시스템 구현됨** (2026-07-18): 토큰 계약 전체를 `globals.css` @theme으로 이식(type scale 11~56px 포함), `components/site·ui` 11개 컴포넌트 + `cn()` 병합 계약(tailwind-merge), `/design` living specimen 라우트 — 빌드·렌더·computed style 검증 완료. Storybook 패키지는 도입하지 않음(라우트가 겸함 — 업계 레퍼런스 조사로 검증, 로컬 위키 design-systems 항목).
- **오버레이 5종 완료** (2026-07-18): D2 협업 2차 시트 확정(디자이너 결정 3건이 Carbon·Primer·GOV.UK 패턴과 교차 일치) → React 구현(시각부/행동부 분리, focus·dismiss 계약) → `/design`에 00 Tokens(runtime 실값)·오버레이 specimen 10~14 → `tools/visual_check.py` 시각 회귀(baseline diff, 음성 대조 검증) 까지 완료. 모바일 nav 구멍(≤720px) 해소됨.

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

1. **전 라우트 + 새 타이포 계약 완성** (2026-07-18): root(v3 다이어트형 관문 — PR 축, 페르소나 2인 "통과·콜" 검증) · /resume · /portfolio(목록+thready) · /blog · /labs · /chat · /design. **type scale base 16 개정**(40+ 독자 + 업계 실측 근거, 하한 12px) 전 화면 반영, 넘침 0건 검증. 남은 콘텐츠 작업: 케이스 상세 4건(bay-async·say-realtime·be-template·mediness-ops) · blog MDX 파이프라인(발생 시)
2. export 스크립트 (tools): wiki → `app/fe/content` + resume.pdf 파생
3. 실제 JD 1건으로 `tailor-resume` 지원 패키지 생성
4. **인프라 세팅은 맨 마지막** (2026-07-18 결정): Vercel 연결 (repo → Root Directory `app/fe`) + marinkim.xyz 도메인 — 로컬에서 완성 후 한 번에 공개
5. 공개 URL 확정 후 homepage 카피에 resume link·portfolio deep link 반영
