---
type: index
title: TODO — 통합 작업 목록
description: 여러 문서에 흩어진 남은 작업의 단일 진입점. 상세는 각 owner 문서가 소유한다.
timestamp: 2026-08-23
canonical: false
derived_from: [context/current-state.md, products/site/content-sot.md, products/resume/content-contract.md, backlog/platform-profile-consolidation/2026-08-22-live-verification.md, backlog/platform-profile-consolidation/2026-08-22-platform-paste-package.md, backlog/README.md]
tags: [context, todo, routing]
---

# TODO — 통합 작업 목록

이 문서는 **현재 남은 작업과 판단 대기만** 모은다. 완료 이력과 상세 근거는 각 owner 문서와 Git history가 소유한다.

상태 표기: `[ ]` 미착수 · `[~]` 진행 중

---

## A. 지금 할 것

### A1. 플랫폼 프로필 sync

owner: [Live 적용 검증](../backlog/platform-profile-consolidation/2026-08-22-live-verification.md) · 목표 문안: [Platform Paste Package](../backlog/platform-profile-consolidation/2026-08-22-platform-paste-package.md)

- [ ] **LinkedIn EN secondary** — 영문 resume의 `allowed_copy_en` 검수가 끝난 뒤에만 선택적으로 입력
- [ ] **플랫폼 infra 문구 재동기화** — 홈페이지·resume에서 infra를 supporting delivery 경험으로 낮춘 기준에 맞춰 LinkedIn·Wanted·Remember·Groupby·RocketPunch의 회사 Azure topology·6 state·400+ object·monitoring 강조를 제거하고 reload/public 값을 검증
- [ ] **Oopy** — 다른 플랫폼 링크를 marinkim.xyz로 교체하고 공개 종료 여부 판단
- [ ] **플랫폼 UI 잔여값** — Wanted의 더데이랩스 row·credentials, RocketPunch 자동 생성 AI 요약·HTML title, LinkedIn Featured URL 검증의 안전한 수정 경로 확인

### A2. claim 근거 보강

- [ ] Thready production 안정성 최신화 — 최근 30/90일 request·5xx를 endpoint와 user-impact incident 단위로 재집계하고, 동일 Jira 정의로 resolve 대비 reopen 비율을 2026-08-19 현재까지 갱신. 재측정 전에는 `HTTP 5xx 0.3%`를 active resume 성과로 사용하지 않음
- [ ] `nexus.pool-stabilization`을 공개 성과로 쓸 필요가 생기면 전후 모니터링 지표를 먼저 확보
- [ ] `mediness.daily-briefing`의 non-code 운영 ownership과 직접 구축 범위를 PR review·운영 기록으로 재검증 — 확인 전 active resume에서 제외

---

## B. 이후

### B1. 산출물 파이프라인

- [ ] active KO expression 기준 PDF 재생성 및 첫 장 scanability·페이지별 technical signal·A4 visual [Acceptance Gate 6](../products/resume/content-contract.md#acceptance-gates) 검증
- [ ] sitemap 갱신

### B2. 콘텐츠

- [ ] `/blog`·`/labs` COMING SOON 해소, blog MDX 파이프라인 — [blog setup](../backlog/blog-setup/README.md)

### B3. 이력서 후속

- [ ] Career bullet의 3축 정렬 여부 판단 — 현행 유지가 기본값
- [ ] `nexus.pool-stabilization`을 역량 축 2에 넣을지 근거 강도 확인 후 판단

---

## 갱신 규칙

- 완료 항목은 이 문서에서 제거하고 owner 문서에 결과를 반영한다.
- 새 작업은 owner 문서에 먼저 등록하고 여기에 링크만 둔다.
- [current-state.md](current-state.md)는 현재 상태를, 이 문서는 남은 작업만 담당한다.
