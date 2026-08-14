---
type: index
title: TODO — 통합 작업 목록
description: 여러 문서에 흩어진 남은 작업의 단일 진입점. 상세는 각 owner 문서가 소유한다.
timestamp: 2026-08-14
canonical: false
derived_from: [context/current-state.md, products/site/content-sot.md, products/resume/content-contract.md, backlog/platform-profile-consolidation/sync-spec.md, backlog/README.md]
tags: [context, todo, routing]
---

# TODO — 통합 작업 목록

이 문서는 **현재 남은 작업과 판단 대기만** 모은다. 완료 이력과 상세 근거는 각 owner 문서와 Git history가 소유한다.

상태 표기: `[ ]` 미착수 · `[~]` 진행 중

---

## A. 지금 할 것

### A1. 플랫폼 프로필 sync

owner: [sync-spec](../backlog/platform-profile-consolidation/sync-spec.md) · 현황: [sync matrix](../backlog/platform-profile-consolidation/2026-08-13-sync-matrix.md) · 문안: [dual-track copy](../backlog/platform-profile-consolidation/dual-track-copy-draft.md)

- [ ] **사람인** — 로그인 후 `인증 경력 불러오기`, 소개·경력·스킬·링크 반영
- [ ] **원티드** — 자동화할 수 없는 텍스트 필드에 확정 문안 붙여넣기
- [~] **링크드인** — 아이즈솔 종료일 2021.06 확인, 영어 프로필, CES·특허 섹션
- [ ] **oopy** — 레거시 프로필 링크를 marinkim.xyz로 교체하고 공개 범위 판단

### A2. claim 근거 보강

- [ ] `nexus.pool-stabilization`을 공개 성과로 쓸 필요가 생기면 전후 모니터링 지표를 먼저 확보

---

## B. 이후

### B1. 산출물 파이프라인

- [ ] active KO expression 기준 PDF 재생성 및 A4 2장 [Acceptance Gate 6](../products/resume/content-contract.md#acceptance-gates) 검증
- [ ] sitemap 갱신

### B2. 콘텐츠

- [ ] `/blog`·`/labs` COMING SOON 해소, blog MDX 파이프라인 — [blog setup](../backlog/blog-setup/README.md)
- [ ] 실제 JD 1건으로 `tailor-resume` 지원 패키지 생성

### B3. 이력서 후속

- [ ] Career bullet의 3축 정렬 여부 판단 — 현행 유지가 기본값
- [ ] `nexus.pool-stabilization`을 역량 축 2에 넣을지 근거 강도 확인 후 판단

---

## 갱신 규칙

- 완료 항목은 이 문서에서 제거하고 owner 문서에 결과를 반영한다.
- 새 작업은 owner 문서에 먼저 등록하고 여기에 링크만 둔다.
- [current-state.md](current-state.md)는 현재 상태를, 이 문서는 남은 작업만 담당한다.
