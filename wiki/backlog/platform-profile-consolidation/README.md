---
type: idea
title: Platform Profile Consolidation
description: 5개 채용 플랫폼 프로필을 홈페이지 표현 SoT와 claim registry에 맞춰 동기화하고 marinkim.xyz를 허브로 세운다.
status: wip
registered: 2026-08-08
timestamp: 2026-08-28
tags: [backlog, profile, platform, distribution]
---

# Platform Profile Consolidation

## 한 줄

여러 채용 플랫폼에 흩어진 이력을 홈페이지 표현 SoT와 claim registry에 맞추고, 상세 확인은 marinkim.xyz로 모은다.

## 메모

- **동기화 대상**: Wanted · LinkedIn · Remember · Groupby · RocketPunch.
- **제외 대상**: Saramin. 사용하지 않기로 확정해 추가 동기화하지 않는다.
- **정리 대상**: Oopy. 새 문안을 넣지 않고 다른 플랫폼의 링크를 marinkim.xyz로 바꾼 뒤 공개 종료 여부를 확인한다.
- **보류 대상**: Jumpit. live 이력서 존재 여부를 확인하기 전에는 관리 대상에 넣지 않는다.
- 사실·강도는 `profile/`과 `evidence/claims/`, 현재 문장·순서는 `app/fe`가 소유한다. 플랫폼 문안은 그 둘에서 파생한다.
- 플랫폼에는 검색에 필요한 역할·기술·짧은 근거와 허브 링크만 둔다. 상세 사례는 resume·portfolio가 맡는다.
- 홈페이지와 직군별 프로필에는 `어떤 문제를 맡길 수 있는가`가 드러나도록 FastAPI 트랜잭션·비동기 전달·권한 같은 전문성 축을 요약한다.
- LinkedIn은 실제 수행 범위를 한 문장으로 압축한다. 후보 문안: `FastAPI 기반 제품 백엔드와 AI 실행 서비스를 설계·운영했습니다.` 상세 기술 사례는 marinkim.xyz의 이력서·포트폴리오로 연결한다.
- 플랫폼 필드·글자 수·공개 범위는 바뀔 수 있으므로 실제 반영 직전에 로그인한 화면에서 다시 확인한다.

## 연결

- [2026-08-22 Live 적용 검증](2026-08-22-live-verification.md) — 현재 live 적용·reload 결과와 남은 차이의 단독 기록
- [2026-08-22 Platform Paste Package](2026-08-22-platform-paste-package.md) — 현재 붙여넣기 문안과 플랫폼별 적용 체크리스트
- [2026-08-13 sync matrix](2026-08-13-sync-matrix.md) — 과거 live 실측 snapshot. 현재 상태로 간주하지 않음
- [content SoT](../../products/site/content-sot.md) — 홈페이지 → claim 대조 → 플랫폼 파생 순서
- [active resume](../../../app/fe/app/resume/resume-view.tsx) — 경력·대표 성과 표현 SoT
- [rules/public-safety.md](../../rules/public-safety.md) — 공개 범위 게이트
- [evidence/claims/](../../evidence/claims/) — allowed_copy 상한
- [english-resume](../english-resume/README.md) — 링크드인 영문 표기와 트랙이 겹친다

## 승격

Wanted·LinkedIn·Remember·Groupby·RocketPunch는 최신 문안을 저장하고 reload 검증을 마쳤다. Saramin은 대상에서 제외했으며, Oopy 링크 교체·공개 종료 판단과 플랫폼 UI 잔여값을 닫을 때 `done`으로 전환한다.
