---
type: idea
title: Platform Profile Consolidation
description: 링크드인·리멤버·원티드·점핏에 산개된 프로필을 wiki canonical claim 기준으로 정합화하고 marinkim.xyz를 허브로 세운다.
status: idea
registered: 2026-08-08
tags: [backlog, profile, platform, distribution]
---

# Platform Profile Consolidation

## 한 줄

여러 채용 플랫폼에 각자 다른 버전으로 흩어진 이력을, `profile/` + `evidence/`가 소유한 claim 기준으로 정합화하고 marinkim.xyz를 단일 허브로 세운다.

## 메모

- 현재 산개 지점: 링크드인, 리멤버, 원티드, 점핏. 각 플랫폼이 언제 어떤 버전으로 작성됐는지 기록이 없다.
- 이 repo에는 **플랫폼별 프로필을 관리하는 owner 문서가 없다.** `products/`는 resume·portfolio·homepage·jd만 소유하며, 플랫폼 언급은 `products/jd/corpus/wanted/` (JD 수집원)뿐이다.
- "하나로 몬다"는 두 축으로 갈린다. 둘은 배타적이지 않고 순서 문제다.
  1. **정합성 축** — wiki가 canonical, 각 플랫폼은 파생본. 수치·서사·직무 포지셔닝이 서로 어긋나지 않게 한다. resume v2에서 해금된 수치(QA 재발률 37%→11% 등)가 플랫폼엔 반영돼 있지 않을 가능성이 높다.
  2. **허브 축** — marinkim.xyz로 트래픽을 모으고, 플랫폼은 요약 + 링크로 축소한다. 상세는 허브에서만 유지해 갱신 지점을 하나로 줄인다.
- 플랫폼별 제약이 서로 달라 그대로 복제할 수 없다: 글자 수 상한, 섹션 구조, 검색 노출 방식(리멤버·점핏은 헤드헌팅 노출 로직이 다름), 공개 범위 설정.
- **public-safety 재검토가 필요하다.** 플랫폼은 이 repo보다 노출 범위가 넓고 스크래핑 대상이다. 전화번호·상세 소속처럼 웹 이력서에서 뺀 항목이 플랫폼엔 남아 있을 수 있다.
- 선행 작업: 각 플랫폼 현재 상태 수집(스크린샷 또는 PDF export) → claim registry와 대조표 작성 → 어긋난 항목 목록화.
- 갱신 비용이 핵심 리스크다. 4곳을 수동 동기화하면 반드시 다시 어긋난다. 허브 축으로 기울여 플랫폼 본문을 얇게 만드는 편이 유지보수상 유리하다.

## 연결

- [2026-08-21 Maker platform draft](2026-08-21-maker-profile-draft.md) — 현재 홈페이지·이력서 SoT에서 파생한 플랫폼별 게시 문안 검토본
- [products/resume/master/v2/content.md](../../products/resume/master/v2/content.md) — 최신 서사·수치 기준
- [rules/public-safety.md](../../rules/public-safety.md) — 공개 범위 게이트
- [evidence/claims/](../../evidence/claims/) — allowed_copy 상한
- [products/homepage/public-content.md](../../products/homepage/public-content.md) — 허브 카피
- [english-resume](../english-resume/README.md) — 링크드인 영문 표기와 트랙이 겹친다

## 승격

각 플랫폼 현재 상태를 수집해 대조표를 만든 뒤, 정합성/허브 축의 비중을 정하고 spec으로 승격한다.
