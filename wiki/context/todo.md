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
| 1 | **사람인** | 🔒 **로그인 만료** — 브라우저에서 로그인만 해주면 나머지는 자동 처리 | **로그인 1회** |
| ~~2~~ | ~~**리멤버**~~ | **✅ 2026-08-10 완료** — 소개글·연차·직무·경력·스킬·링크·특허 전부 | — |
| ~~3~~ | ~~그룹바이~~ | **✅ 2026-08-10 완료** — 표기 정정 + 근거 없는 정량 3건·claim 위반 13건 제거 | — |
| 4 | 원티드 (부분) | ✅ 중복 삭제·재직형태·졸업·스킬 9건·AX / ⬜ **텍스트 필드 전부** — 자동화 불가, 붙여넣기 필요 | 붙여넣기 |
| 5 | **링크드인** (진행 중) | ✅ 헤드라인·소개(4문장) / ⬜ 경력 4건 정정·설명·자격증·URL·**영어 프로필** | CSP로 자동화 제약 |
| ~~6~~ | ~~로켓펀치~~ | **✅ 2026-08-10 완료** — 레벨·학력·소개글·경력 5건·링크·CES·특허 | — |
| 7 | oopy | **레거시** — 링크만 marinkim.xyz로 교체 + 공개 해제 검토 | 판단 필요 |

⚠️ **원티드는 텍스트 필드에 자동 입력이 저장되지 않는다** (실측 3가지 방법 모두 실패,
`browser_type`은 한글 미지원). 문안은 [sync-spec §2.6](../backlog/platform-profile-consolidation/sync-spec.md)에
확정돼 있으니 **사람이 붙여넣기만 하면 된다.**

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
확정 문안: [dual-track-copy](../backlog/platform-profile-consolidation/dual-track-copy-draft.md) (검토 3건 답변 완료)

- [x] `identity.md` — Brand Hierarchy에 Dual role 추가, Canonical One-Line 개정, Guardrail 개정
- [x] 링크드인 헤드라인·소개
- [x] 전 플랫폼 문안 **확정** (2026-08-10) — 검토 3건 답변 반영
- [x] **웹 이력서** — Summary에서 수치 제거 + dual track, 실패담을 Thready 상세로 이관 (KO/EN)
- [x] 링크드인 소개를 확정본으로 재교체 (실패담 제거 + 4년차)
- [x] **리멤버** — 소개 교체 (커넥트용·채용 서비스용 두 탭 모두, 1,279자 → 306자 3문단)
- [x] **그룹바이** — 자기소개 교체 (1,534자 → 561자, 수상·자격·특허 목록 유지)
- [x] **로켓펀치** — 소개 교체 + 경력 5건 설명 전면 작성 → **v3로 재작성 완료**
- [ ] **원티드** — 문안 확정, 반영만 남음 (자동화 불가 → 붙여넣기)
- [ ] **사람인** — 로그인 후 착수. 처음부터 dual track으로

### E-0. 문안 구조 감사 → 수정 순서 (2026-08-10 심야 신설)

owner: [copy-structure-audit](../evidence/audits/2026-08-10-copy-structure-audit.md) — 계층 모델(L0~L3)과 자산 9종 판정

- [ ] **1. canonical 확정** — dual-track-copy-draft에 로켓펀치 v5+ 경력 설명 역흡수, platform-copy(v3) 이중 소유 해소
- [ ] **2. 웹 이력서** — Summary 재작성(L1 기준), Career에 측정 정의 보강, EN 동기화
- [~] **3. 리멤버·그룹바이·링크드인 재전파** (v2 → v5.1)
  - [x] **리멤버 완료** (2026-08-11) — 소개 2탭 + 경력 3건(메디솔브·더데이랩스·메멘토) v5.1, 전 항목 reload 검증
    - 메멘토는 Luna 실패 → 부모가 복구 (설명 + 비어 있던 직책 `Backend Engineer` 복원)
    - **스튜디오랩·아이즈솔은 유지 확정** — 직무별 기간 분리 서비스별 설명이 canonical보다 구조가 좋다
  - [x] **그룹바이 완료** (2026-08-11) — 자기소개 v5.1 교체, 수상·자격·특허 목록 보존, 부모 교차 검증 통과
    - **그룹바이 경력 설명은 유지 확정** — 기술 상세(마이크로서비스·TaskIQ·SSO·NEXUS)가 canonical보다 풍부
  - [x] **링크드인 소개 v5.1 완료** (2026-08-11) — 부모가 직접 처리 (fill+저장+reload 검증). 경력 설명·영어 프로필은 잔여
- [ ] **4. 원티드 붙여넣기 패키지 · 사람인** (로그인 대기)
- [ ] **결정 대기**: 소개 첫 문장 A(현행)/B(판단 서사 선행)/C(결합) — audit §5

### E-1. 문안 v5 전파 (2026-08-10 야간 신설)

**Codex 교차 리뷰 반영 (2026-08-10).** 지적 12건 중 반영한 것:

| 지적 | 조치 |
| --- | --- |
| `4년차 백엔드 엔지니어`가 BE 4년으로 오독 (실제 BE 27개월) | `AI 제품을 만드는 일만 4년째`로 교체 |
| 판단 구조를 전 경력에 강제해 오히려 AI 문체 강화 | 비자명한 결정에만 적용, 나머지는 사실 서술 |
| 재구축 근거가 일반론 — evidence의 실제 근거를 버림 | 회원 로직 수정 → AI 생성 중단 전파, FE 유지·BE만 교체, 36시간 |
| worker 분리를 사후 대응처럼 서술 | **실제로는 Memento 결제 실패 수습 경험이 전이된 예방 설계** |
| 수치에 측정 정의 없음 | `cutover 전후 Jira 집계, resolve 대비 reopen`, `30일 기준` 명시 |
| template `한 곳에서 반영`은 기술적으로 부정확 | `제품마다 동일한 방식으로 반영`으로 수정 |
| 역할 병행 정당화 문단이 자기평가 | 삭제하고 실제 책임만 |
| 아이즈솔에 현재 철학 역투영 (evidence 없음) | 실제 담당 업무로 교체, 직함도 canonical `Vision AI Engineer`로 |
| 스튜디오랩 직무 구간이 뭉쳐 있음 | AI Engineer / PM / Backend 기간 분리 표기 |

미반영: CES를 수상 섹션으로 이동(이미 활동에 별도 등록됨), 소개 분량 축소(후킹 우선).

### E-2. v4 이전 이력

[문안을 v4로 재작성](../backlog/platform-profile-consolidation/dual-track-copy-draft.md)했다.
**서술 구조가 규칙이다 — `예상한 문제 → 판단 근거 → 결정 → (결과)`.**
결과만 나열한 문장은 누가 써도 나온다. 판단 근거가 있어야 그 자리에 있던 사람의 글이 된다.

⚠️ **v3는 폐기했다.** "AI 같다"를 문체 문제로 오독해 구어체로 낮췄고, 전문성만 깎였다.
격식은 유지하고 사고 과정을 드러내는 것이 맞다.

- [x] 로켓펀치 — 소개 + 경력 5건 전부 v5 (Codex 리뷰 반영본)
- [ ] **리멤버** — v2 소개가 두 탭(커넥트용·채용 서비스용)에 나가 있다
- [ ] **그룹바이** — v2 자기소개
- [ ] **링크드인** — v2 소개(About) + 경력 설명
- [ ] **웹 이력서** `resume-view.tsx` — Summary와 Career bullet이 전부 결과 나열형이다 (KO/EN 양쪽)
- [ ] 원티드 — 아직 v2도 안 들어갔으니 처음부터 v5로

⚠️ **정량은 소개가 아니라 상세가 소유한다** — 전 플랫폼 원칙. 리멤버·그룹바이의 `37%→11%`·`HTTP 5xx 0.3%`는 2026-08-10 제거 완료.
