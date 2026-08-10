---
type: index
title: TODO — 통합 작업 목록
description: 여러 문서에 흩어진 남은 작업의 단일 진입점. 상세는 각 owner 문서가 소유한다.
timestamp: 2026-08-09
canonical: false
derived_from: [context/current-state.md, backlog/platform-profile-consolidation/sync-spec.md, products/resume/master/v4/content.md, backlog/README.md]
tags: [context, todo, routing]
---

# TODO — 통합 작업 목록

작업이 6개 문서에 흩어져 있어 전체가 안 보였다. **이 문서는 진입점이고, 상세와 판단 근거는 각 owner 문서가 소유한다.**

상태 표기: `[ ]` 미착수 · `[~]` 진행 중 · `[x]` 완료

---

## A. 지금 할 것 (효과 대비 비용 순)

### A1. 플랫폼 프로필 sync — **미착수 49건**

owner: [sync-spec](../backlog/platform-profile-consolidation/sync-spec.md) · 문안: [platform-copy](../backlog/platform-profile-consolidation/platform-copy.md)

| 순위 | 플랫폼 | 핵심 작업 | 비용 |
| --- | --- | --- | --- |
| 1 | **사람인** | `인증 경력 불러오기` 실행 — 총 경력 "2년 2개월" 정정 | **버튼 하나** |
| ~~2~~ | ~~**리멤버**~~ | **✅ 2026-08-10 완료** — 소개글·연차·직무·경력·스킬·링크·특허 전부 | — |
| ~~3~~ | ~~그룹바이~~ | **✅ 2026-08-10 완료** — 표기 정정 + 근거 없는 정량 3건·claim 위반 13건 제거 | — |
| 4 | 원티드 | 중복 경력 2건 삭제 · 학력 오타 · **AX 항목 신설** | 5분 + 붙여넣기 |
| 5 | **링크드인** (진행 중) | ✅ 헤드라인·소개(4문장) / ⬜ 경력 4건 정정·설명·자격증·URL·**영어 프로필** | CSP로 자동화 제약 |
| 6 | 로켓펀치 | 레벨 `주니어` · 학력 `재학` · 소개글 | 표기 정정 |
| 7 | oopy | **레거시** — 링크만 marinkim.xyz로 교체 + 공개 해제 검토 | 판단 필요 |

⚠️ **선행**: `platform-copy.md`가 v3 기준이다. **v4 3축 서사와 연차 4년차를 반영해 갱신해야 한다.**

### A2. 포트폴리오 케이스 보강

owner: [quality-lab-copy-draft](../backlog/platform-profile-consolidation/quality-lab-copy-draft.md)

- [ ] Thready 케이스에 「품질을 판정 가능한 대상으로」 섹션 추가 (`thready.quality-criteria-system`)
- [ ] 문안 초안은 이미 작성됨 — v4 3축 반영해 다듬은 뒤 `case-details.tsx`에 반영

### A3. 근거 확보로 claim 상향

owner: [claim-expansion-draft](../products/resume/master/v4/claim-expansion-draft.md) §C

- [x] ~~`medisolve-admin.*` 3건 — Git history 대조~~ → **2026-08-10 완료.** NEXUS와 동일 저장소로 확인돼 `nexus.*`로 흡수, `public: true` 복원 (KimMarin 734/881 커밋). 강도는 `led`, "500 에러 해결"은 지표 없어 계속 금지
- [x] ~~`nexus.domain-audit-governance` Git 주도권 확인~~ → `docs/audit` 단독 작성이나 **1커밋이라 근거 불충분**. `contributed` 유지 (2026-08-10)
- [ ] KCL 인증서 실물 확인 → `credentials.ai-accuracy-certification` confidence `medium` → `high`
- [ ] `nexus.pool-stabilization` 모니터링 지표 확보 → `medium` → `high` + 결과 표현 해금 (현재 "500 에러 해결" 금지)

---

## B. 이후

### B1. 산출물 파이프라인

- [ ] **export 스크립트** — wiki → `app/fe/content` 파생. 현재 `resume-view.tsx`가 수동 사본이라 canonical과 어긋날 위험이 상시 존재한다
- [ ] **PDF 재생성** — 파이프라인이 v0·v1 시절 것이다. A4 2장([Acceptance Gate 5](../products/resume/content-contract.md)) 검증은 그 뒤에
- [ ] sitemap 갱신 (케이스 추가 반영)

### B2. 콘텐츠

- [ ] `/blog`·`/labs` COMING SOON 해소, blog MDX 파이프라인 ([blog-setup](../backlog/blog-setup/README.md))
- [ ] 포트폴리오 케이스 4건 상세 (bay-async·say-realtime·be-template·mediness-ops)
- [ ] 실제 JD 1건으로 `tailor-resume` 지원 패키지 생성

### B3. v4 후속

owner: [v4 content](../products/resume/master/v4/content.md) 「남은 것」

- [ ] Career bullet의 3축 정렬 여부 판단 — **무리하게 맞추면 또 억지 배치가 된다.** 현행 유지가 기본값
- [ ] 축 2에 `nexus.pool-stabilization` 추가 검토 — public은 회복됐으나 **결과 표현이 여전히 금지**라 "원인을 짚었다"까지만 쓸 수 있다. 축 2 서사에 충분한지 판단 필요

---

## C. 결정 대기 (사용자 판단 필요)

- [ ] **채용 플랫폼 상세 주소** — 사람인에 동·호수까지 기재됨. 시 단위로 줄일지 현행 유지할지 ([sync-spec §6](../backlog/platform-profile-consolidation/sync-spec.md))
- [ ] **oopy 공개 해제** — 레거시로 두면 고객사 실명("데이뷰 & 세라미크")이 계속 노출된다. Notion 공유 토글로 닫을지
- [ ] **SellerCanvas POC 두 번째 브랜드** — 실명 불확실. 현재는 SPAO 건만 사용하고 개수를 못박지 않는다

---

## D. 완료 (2026-08-08~09)

- [x] marinkim.xyz 배포 — Vercel + 가비아 DNS + SSL, 자동 배포, repo PRIVATE 전환, 빌드 스킵 최적화
- [x] 플랫폼 7곳 감사 — 실측 수집, gap 60여 항목 식별
- [x] 규칙 2건 신설 — [client masking](../rules/public-safety.md) · [recency weighting](../rules/recency-weighting.md)
- [x] 연차 기준 확정 — 인턴 제외 실무 47개월 = **4년차** (`career.tenure`)
- [x] 고객사 마스킹 매핑 정정 — 뮤즈 재분류, 임의 코드 2건 폐기
- [x] claim registry 24 → **42건** — quality lab 4 · medisolve-admin 3 · credentials 1 · tenure 1 · centurion 2 · nexus 1
- [x] [canonical-baseline](../profile/canonical-baseline.md) 신설 (derived view)
- [x] 구조 리서치 + [v4](../products/resume/master/v4/content.md) — 프로젝트 인벤토리 → 인물 서사 3축
- [x] **웹 이력서 v4 배포** — 섹션 7→6개, 6초/30초 테스트 통과, 규칙 위반 0건
- [x] **리멤버 sync 완료** (2026-08-10) — 소개글 1,279자 3축 · 4년차 · 더데이랩스 추가 · 경력 중복 정리 · STUDIO LAB 2023.12 · 스킬 15건 · 특허 등록번호 · marinkim.xyz
- [x] **그룹바이 sync 완료** (2026-08-10) — 위 항목 + **근거 없는 정량 3건 제거**(MAU 1만·긴급이슈 0%·서버비용 17%). 프로필 점수 47 → 50점
- [x] **medisolve-admin → NEXUS 통합** (2026-08-10) — Git 대조로 동일 저장소 확인, claim 3건 강등 해소(`public: true`), 강도는 `led`

---

## 갱신 규칙

- 작업이 끝나면 여기서 `[x]`로 옮기고 **owner 문서에도 반영**한다.
- 새 작업은 owner 문서에 먼저 적고 여기에 링크만 건다. **이 문서가 상세를 소유하지 않는다.**
- [current-state.md](current-state.md)는 "지금 어디까지 왔나"를, 이 문서는 "무엇이 남았나"를 담당한다.

---

## E. Dual Track 전파 (2026-08-10 신설)

[identity.md](../profile/identity.md#dual-track-근거와-경계)에 **Backend Engineer + PO 병기**를 확정했다 (user-confirmed).
링크드인만 반영됐고 나머지는 미반영이다.

문안 초안: [dual-track-copy-draft](../backlog/platform-profile-consolidation/dual-track-copy-draft.md) — **검토 대기 3건 포함**

- [x] `identity.md` — Brand Hierarchy에 Dual role 추가, Canonical One-Line 개정, Guardrail 개정
- [x] 링크드인 헤드라인·소개
- [x] 전 플랫폼 문안 초안 작성 (2026-08-10)
- [ ] **웹 이력서** — Summary·Career의 역할 표기, EN 포함
- [ ] **리멤버** — 소개글이 아직 3축 전문(수치 포함). 정성 서사 + dual track으로 재작성
- [ ] **그룹바이** — 자기소개가 아직 3축 전문(수치 포함). 동일
- [ ] 원티드·로켓펀치·사람인 — 착수 시 처음부터 dual track으로

⚠️ **정량은 소개가 아니라 경력 상세가 소유한다** — 이번에 세운 전 플랫폼 원칙이다.
리멤버·그룹바이 소개에 들어간 `37%→11%`·`HTTP 5xx 0.3%`는 이 원칙 이전에 넣은 것이라 재검토 대상이다.
