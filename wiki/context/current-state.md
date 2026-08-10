---
type: current-state
title: Current State
description: Completed harness migration and active resume master v1 state; this file is a derived snapshot.
timestamp: 2026-08-09
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
- **공개 배포 완료** (2026-08-08): **marinkim.xyz 라이브**. Vercel(개인 계정 `marinbackend-1819`, Root Directory `app/fe`) + 가비아 DNS + Let's Encrypt(apex·www). 전 라우트 200, `git push origin main` -> 자동 배포. repo 는 **PRIVATE 전환**(evidence·연락처 보호), 사이트만 공개. 비용 최적화로 `commandForIgnoringBuildStep` 설정 — wiki 만 바뀐 커밋은 빌드 스킵.
- **플랫폼 프로필 감사 완료** (2026-08-08~09): 채용 플랫폼 7곳(링크드인·리멤버·원티드·로켓펀치·사람인·그룹바이·oopy)을 직접 수집·대조. 시간순 화석층 확인 — 로켓펀치(~2021 학부생 톤) / 리멤버(~2023 "백엔드가 되고싶은") / 링크드인·원티드(~2025 서사 없음) / 그룹바이·oopy(최신·최상세). [sync-spec](../backlog/platform-profile-consolidation/sync-spec.md) 으로 수정 사양 확정, **플랫폼 실제 수정은 미착수**.
- **규칙 2건 신설** (2026-08-08~09): [client masking](../rules/public-safety.md)(내부 실명 / 공개 마스킹 이원화), [recency weighting](../rules/recency-weighting.md)(현재 소속이 경력 서술의 절반 이상, 과거 정량은 검증 여부 무관 미사용).
- **연차 기준 확정** (2026-08-09): 인턴 제외 실무 47개월 = **4년차**. 이전에는 "6년째"·"5년차"·"BE 5년차"가 혼재했다. 산정 표 owner 는 [career.md#tenure](../profile/career.md#tenure), claim 은 `career.tenure`.
- **claim registry 24 -> 39건** (2026-08-08~09): thready quality lab 4건, medisolve-admin 3건(self-reported 근거로 `low`/`public:false` 강등), credentials 인증 1건, career.tenure 1건 등. Codex(gpt-5.6-sol) 교차 리뷰로 연차 오류·강도 과다를 정정했다.
- **[canonical-baseline](../profile/canonical-baseline.md) 신설** (2026-08-09): 확정값 통합 인덱스. canonical 은 각 owner 문서가 갖고 이 문서는 derived view 다.
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

**작업 목록은 [todo.md](todo.md)가 소유한다.** 6개 문서에 흩어져 있던 것을 통합했다.

현재 우선순위:

1. **플랫폼 프로필 sync** — 미착수 49건. 1순위는 사람인 `인증 경력 불러오기`(버튼 하나로 "2년 2개월" 정정), 2순위 리멤버 소개글 교체
2. **포트폴리오 Thready 케이스에 품질 판정 축 추가**
3. **근거 확보로 claim 상향** — medisolve-admin 3건, KCL 인증서

⚠️ 선행: [platform-copy.md](../backlog/platform-profile-consolidation/platform-copy.md)가 v3 기준이라 v4 3축·연차 4년차를 반영해 갱신해야 한다.
