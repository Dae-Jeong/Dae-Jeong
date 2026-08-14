---
type: current-state
title: Current State
description: Current source-of-truth routing and deployed site state; this file is a derived snapshot.
timestamp: 2026-08-14
canonical: false
derived_from: [profile/, evidence/claims/, products/, app/fe/]
tags: [current-state, migration, resume]
---

# Current State

## Current Baseline

- `Profile -> Evidence -> Products` knowledge harness migration 완료.
- `master/v0`–`master/v4`는 baseline·superseded draft로 보존한다. 현재 KO 웹 이력서의 표현 SoT는 `app/fe/app/resume/resume-view.tsx`다.
- 사실·경력은 `profile/`, 공개 claim·강도는 `evidence/claims/`, 제품 계약·mapping은 `products/`, 현재 공개 표현은 `app/fe`가 소유한다.
- primary brand는 [profile identity](../profile/identity.md)가 소유하며 `Backend Engineer` / `AI Product Systems` / `Agent-readable Engineering Workflow` 순서다.
- Daejeong Design은 별도 repo에서 도구 개발을 진행하며 이 repo는 profile/evidence/resume content source를 소유한다.
- repo는 완전한 프로젝트 monorepo다 (2026-07-18, spec 8차 개정): `wiki/`(지식) · `app/`(fe→Vercel·be→Render·design 승격 스냅샷) · `labs/`(k8s 서비스) · `infra/` · `tools/`(자체 env) — [설계 spec](../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md).
- **Phase 1 착수됨** (2026-07-18): `app/fe` scaffold 완료 — Next 16.2.10 + Tailwind v4 + Mono 토큰 + 폰트, hello world 빌드·렌더 검증 완료.
- **디자인 시스템 구현됨** (2026-07-18): 토큰 계약 전체를 `globals.css` @theme으로 이식(type scale 11~56px 포함), `components/site·ui` 11개 컴포넌트 + `cn()` 병합 계약(tailwind-merge), `/design` living specimen 라우트 — 빌드·렌더·computed style 검증 완료. Storybook 패키지는 도입하지 않음(라우트가 겸함 — 업계 레퍼런스 조사로 검증, 로컬 위키 design-systems 항목).
- **공개 배포 완료** (2026-08-08): **marinkim.xyz 라이브**. Vercel(개인 계정 `marinbackend-1819`, Root Directory `app/fe`) + 가비아 DNS + Let's Encrypt(apex·www). 전 라우트 200, `git push origin main` -> 자동 배포. repo 는 **PRIVATE 전환**(evidence·연락처 보호), 사이트만 공개. 비용 최적화로 `commandForIgnoringBuildStep` 설정 — wiki 만 바뀐 커밋은 빌드 스킵.
- **플랫폼 프로필 감사 및 부분 sync** (2026-08-08~13): 채용 플랫폼 7곳을 직접 수집·대조했다. 리멤버·그룹바이·로켓펀치는 반영 완료, 원티드·링크드인은 부분 반영, 사람인·oopy는 남은 판단·작업이 있다. 정확한 현황은 [todo](todo.md)와 [sync matrix](../backlog/platform-profile-consolidation/2026-08-13-sync-matrix.md)가 소유한다.
- **포트폴리오 공개 표현 정렬** (2026-08-14): 성과 축 4개·상세 케이스 5개가 배포됐다. Thready 케이스의 3층 품질 판정·QA reopen·운영 지표·실측 corpus 근거까지 노출하며, case library의 stable claim ID와 연결한다.
- **규칙 2건 신설** (2026-08-08~09): [client masking](../rules/public-safety.md)(내부 실명 / 공개 마스킹 이원화), [recency weighting](../rules/recency-weighting.md)(현재 소속이 경력 서술의 절반 이상, 과거 정량은 검증 여부 무관 미사용).
- **연차 기준 확정** (2026-08-13 재산정): 인턴 제외 실무 48개월 = **4년차**. 이전에는 "6년째"·"5년차"·"BE 5년차"가 혼재했다. 산정 표 owner는 [career.md#tenure](../profile/career.md#tenure), claim은 `career.tenure`.
- claim registry는 active public expression의 수치·역할 강도를 소유하고, resume claim map과 validator가 사용 여부를 대조한다.
- **[canonical-baseline](../profile/canonical-baseline.md) 신설** (2026-08-09): 확정값 통합 인덱스. canonical 은 각 owner 문서가 갖고 이 문서는 derived view 다.
- **오버레이 5종 완료** (2026-07-18): D2 협업 2차 시트 확정(디자이너 결정 3건이 Carbon·Primer·GOV.UK 패턴과 교차 일치) → React 구현(시각부/행동부 분리, focus·dismiss 계약) → `/design`에 00 Tokens(runtime 실값)·오버레이 specimen 10~14 → `tools/visual_check.py` 시각 회귀(baseline diff, 음성 대조 검증) 까지 완료. 모바일 nav 구멍(≤720px) 해소됨.

## Migration Status

| Layer | Status |
| --- | --- |
| portable runtime | complete |
| root routing hubs | complete |
| evidence/claim registry | complete |
| profile normalization | complete |
| resume/portfolio/homepage/JD products | active; resume SoT aligned (2026-08-13) |
| skill adapters | complete |
| temporary clean-clone verification | complete (2026-07-11) |

## Verification Baseline

- `uv sync --locked`: pass
- workspace metadata/link/path/claim validation: pass
- tracked symlink and local-only path check: pass
- superseded v1 PDF smoke render: A4, 2 pages. active expression의 PDF 파생본은 미생성
- `git clone --no-local` temporary clone verifier: pass

## Next

**작업 목록은 [todo.md](todo.md)가 소유한다.** 6개 문서에 흩어져 있던 것을 통합했다.

현재 우선순위:

1. **플랫폼 프로필 sync 마무리** — 사람인 인증 경력, 원티드 텍스트 필드, 링크드인 잔여 항목, oopy 링크 정리
2. **근거 확보로 claim 상향** — KCL 인증서, NEXUS pool 안정화 지표
3. **active 이력서 파생 산출물 정리** — PDF 재생성 및 sitemap 갱신

세부 작업과 판단 대기는 [todo.md](todo.md)만 갱신한다.
