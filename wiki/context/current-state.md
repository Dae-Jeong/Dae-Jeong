---
type: current-state
title: Current State
description: Current source-of-truth routing and deployed site state; this file is a derived snapshot.
timestamp: 2026-08-19
canonical: false
derived_from: [profile/, evidence/claims/, products/, app/fe/]
tags: [current-state, migration, resume]
---

# Current State

## Current Baseline

- `Profile -> Evidence -> Products` knowledge harness migration 완료.
- `master/v0`–`master/v4`는 baseline·superseded draft로 보존한다. 현재 KO 웹 이력서의 표현 SoT는 `app/fe/app/resume/resume-view.tsx`다.
- 2026-08-18부터 resume의 고정 2-page cap·요약/case 개수·경력 상세 bullet 금지와 `resume는 hooking, portfolio는 depth` 기준을 폐기했다. 첫 장 scanability를 유지하되 전체 resume는 self-contained technical proof를 제공하며, backend case 선택 기준은 [Backend Case Achievement Inventory](../products/resume/backend-case-achievements.md)가 소유한다.
- 과거 회사의 기획 경험은 [Product Decision Achievement Inventory](../products/resume/product-decision-achievements.md)에서 `제품 판단`, `제품 요구의 backend 번역`, `기술 실행 체계`로 분리하며, stable public claim과 승격 대기 후보를 함께 관리한다.
- 이력서의 역할 PR 기준은 [Resume Role Positioning Standard](../products/resume/role-positioning-standard.md)가 소유한다. `Backend Engineer`를 고정하고 제품 판단을 backend contract와 production 운영으로 닫는 반복된 사례로 Product Owner 성격을 증명한다. active frame은 `소개 → 경력 → Backend·AI Product Systems → 제품 운영·Engineering Systems → 기술 → 외부 활동 → Credentials`이며 중복된 `일하는 방식` 섹션은 제거한다.
- **AX 사례 분리** (2026-08-18): 기존 한 사례에 섞여 있던 DAY·Mediness·BE Template·SellerCanvas를 해체했다. MEDINESS는 `요구·운영 흐름 설계 참여(contributed)`와 `제품별 decision→release 적용·운영 리드(led)`로, BE Template은 직접 구축한 engineering system으로 분리했다. daily briefing 직접 구축 claim은 Git author 불일치 재검증 전 active resume에서 제외한다.
- **Thready 제품·마케팅 성과 반영** (2026-08-18): 초기 prototype 이후 backend 전환·release·QA·운영 리드와 제품의 2026년 8월 월 약 800만~1,000만원 구독료 매출을 병렬 성과로 분리했다. 별도 PC snapshot에서 URL 기준 최신 상태 131,736행·시계열 관측 3,188,563행과 outcome 후보 5개를 확인했고, 이 중 한국어 본문 111,091건·작성자 이어쓰기 185,475건을 독립 labeling bounded context와 API/UI workbench로 제품화한 claim을 active resume에 반영했다. 20,256건 기반 8축 rubric의 writer/judge 반영은 과거 실험으로 한정하며, 기존 4,039건은 별도 후속 lab snapshot으로 보존한다. unique 게시물·10만 건 전체 LLM 분석·production 자동 반영·바이럴·매출 직접 인과와 `MRR` 표현은 금지한다.
- **경력 합류 경로 정밀화** (2026-08-18): Memento AI 성과 인정 후 MediSolve AI 초기 멤버 영입, 더데이랩스 프리랜서 형태의 법인 설립 전 선행 개발, 2025.04 정규 합류·Tech Lead 역할을 별도 claim으로 기록했다. active resume는 더데이랩스를 MediSolve AI CareerRow 안의 stage로 그룹화하지만 canonical 법적 timeline·tenure는 분리한다.
- **backend·infra 기술 proof 보강** (2026-08-18): Thready AI application·DB 분리의 STG 실데이터 2,616/795/7,111건 migration과 rehearsal·MD5·FK·API E2E 검증, Azure 6개 state·400+ object의 drift gate와 10대 VM log·8개 Production alert, Memento Stripe manual-capture·provider-side cancel/refund 보상 경계를 stable claim과 resume 사례에 반영했다. Prod migration 완료·atomic rollback·가용성/MTTR 개선으로 확대하지 않는다.
- **기술 사례 재구성** (2026-08-19): general resume의 backend 사례를 `AI 활용 FastAPI 재구축·cutover`, `AI 실행부/DB 분리·migration·Outbox`, `주문·재고 worker 복구`, `Threads 데이터 기준·AI 생성 evaluation`, `server auth state 기반 멀티테넌트 권한`, `Stripe provider-side 보상`의 6개로 정리했다. Threads 데이터 제품화와 생성 품질은 같은 제품 질문 아래 결합하되 dataset·experiment 범위를 bullet로 분리하고, Centurion MSA는 전체 ownership claim이 아닌 service context와 기여 강도별 경험으로만 공개한다.
- **Thready 안정성 지표 선별** (2026-08-19): 2026-06~07의 `HTTP 5xx 0.3%`는 baseline·SLO·user-impact incident 구분이 없는 historical snapshot이라 active resume에서 제외했다. QA는 총건수 감소가 아니라 해결된 issue의 반복 결함 signal(reopen 비율 26%p 감소)로 정의하고, validation harness 선행·backend cutover와 시간 순서만 연결한다. 최신 30/90일 운영 지표와 Jira 동일 정의 재측정 전까지 단독 인과·현재 성과로 확대하지 않는다.
- **Product·UX 보조 역량 반영** (2026-08-18): 공개 Oopy·Figma에서 운영 서비스 UX 컨설팅, Speak 추천 흐름 분석, YouTube Music UX 원리 발표를 확인하고 `career.product-ux-practice`로 승격했다. resume는 이를 primary role이 아니라 제품 요구를 backend contract로 번역하는 배경과 독립 `외부 활동` 섹션의 `UX 컨설팅`·`UX 스터디` 두 행으로 사용하며, 기술 index와 Credentials에서는 분리한다. 개선안과 다른 제품 업데이트가 함께 반영된 뒤 공유받은 3개월 내 App Store 순위 9위→5위·DAU 기존 대비 200% 수준은 `career.ux-consulting-product-outcome`으로 분리하고, 복수 개선의 공동 결과에 대한 기여로만 공개한다.
- 사실·경력은 `profile/`, 공개 claim·강도는 `evidence/claims/`, 제품 계약·mapping은 `products/`, 현재 공개 표현은 `app/fe`가 소유한다.
- primary brand는 [profile identity](../profile/identity.md)가 소유하며 `Backend Engineer` / `AI Product Systems` / `Agent-readable Engineering Workflow` 순서다.
- Daejeong Design은 별도 repo에서 도구 개발을 진행하며 이 repo는 profile/evidence/resume content source를 소유한다.
- repo는 완전한 프로젝트 monorepo다 (2026-07-18, spec 8차 개정): `wiki/`(지식) · `app/`(fe→Vercel·be→Render·design 승격 스냅샷) · `labs/`(k8s 서비스) · `infra/` · `tools/`(자체 env) — [설계 spec](../docs/superpowers/specs/2026-07-15-personal-site-architecture-design.md).
- **Phase 1 착수됨** (2026-07-18): `app/fe` scaffold 완료 — Next 16.2.10 + Tailwind v4 + Mono 토큰 + 폰트, hello world 빌드·렌더 검증 완료.
- **디자인 시스템 구현됨** (2026-07-18): 토큰 계약 전체를 `globals.css` @theme으로 이식(type scale 11~56px 포함), `components/site·ui` 11개 컴포넌트 + `cn()` 병합 계약(tailwind-merge), `/design` living specimen 라우트 — 빌드·렌더·computed style 검증 완료. Storybook 패키지는 도입하지 않음(라우트가 겸함 — 업계 레퍼런스 조사로 검증, 로컬 위키 design-systems 항목).
- **공개 배포 완료** (2026-08-08): **marinkim.xyz 라이브**. Vercel(개인 계정 `marinbackend-1819`, Root Directory `app/fe`) + 가비아 DNS + Let's Encrypt(apex·www). 전 라우트 200, `git push origin main` -> 자동 배포. repo 는 **PRIVATE 전환**(evidence·연락처 보호), 사이트만 공개. 비용 최적화로 `commandForIgnoringBuildStep` 설정 — wiki 만 바뀐 커밋은 빌드 스킵.
- **플랫폼 프로필 감사 및 부분 sync** (2026-08-08~13): 채용 플랫폼 7곳을 직접 수집·대조했다. 리멤버·그룹바이·로켓펀치는 반영 완료, 원티드·링크드인은 부분 반영, 사람인·oopy는 남은 판단·작업이 있다. 정확한 현황은 [todo](todo.md)와 [sync matrix](../backlog/platform-profile-consolidation/2026-08-13-sync-matrix.md)가 소유한다.
- **포트폴리오 공개 표현 정렬** (2026-08-14): 성과 축 4개·상세 케이스 5개가 배포됐다. Thready 케이스의 3층 품질 판정·QA reopen·운영 지표·실측 corpus 근거까지 노출하며, case library의 stable claim ID와 연결한다.
- **공개·시점 규칙**: [client masking](../rules/public-safety.md)은 내부 실명/공개 마스킹을 분리한다. [recency weighting](../rules/recency-weighting.md)은 recency를 기본 정렬 신호로만 쓰며 고정 비율·quota를 두지 않고, 과거 정량도 evidence·measurement context·JD relevance로 판정한다 (2026-08-18 개정).
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
| resume/portfolio/homepage/JD products | active; MGRV application closed after document rejection, tailored resume/portfolio are local-only (2026-08-18) |
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
