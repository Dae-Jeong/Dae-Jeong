---
type: index
title: Platform Profiles — 채용 플랫폼 프로필
description: 원티드·링크드인·리멤버·그룹바이·로켓펀치 프로필의 canonical 문안, live 상태, 적용 절차와 자동화 제약. Application Copy Harness의 platform 표면.
timestamp: 2026-09-03
tags: [platform, profile, harness, surface]
---

# Platform Profiles — 채용 플랫폼 프로필

플랫폼 프로필은 **찾게 하는 곳**이다([surface-roles §9](../site/surface-roles.md)). 깊이는 marinkim.xyz로 보내고, 플랫폼에는 검색에 걸릴 역할·기술·짧은 근거와 링크만 둔다. 플랫폼에서 문안을 새로 쓰지 않는다.

2026-09-03부터 이 폴더가 플랫폼 문안의 canonical이다. `backlog/platform-profile-consolidation/`의 붙여넣기 패키지들은 실행 기록으로만 남는다.

## 층

| 층 | owner |
| --- | --- |
| 사실·강도 | `evidence/claims/*.yaml` |
| 표현 규칙 | [copy-standard §1-6](../../rules/application-copy-standard.md) · [public-safety](../../rules/public-safety.md) |
| 표현 SoT | `app/fe` 공개 surface (`/`, `/resume`, 회사별 이력서) — 플랫폼 문안은 여기서 **파생**한다 |
| 플랫폼 canonical 문안 | 이 폴더의 `{platform}.md` — 필드별 붙여넣기 본문, 글자 수 상한 |
| 플랫폼·필드·live 상태 | [platform-registry.yaml](platform-registry.yaml) |
| 적용 절차 | skill [sync-platform-profile](../../../skills/sync-platform-profile/SKILL.md) |

## 검사

- `{platform}.md`는 [copy-surfaces.yaml](../site/copy-surfaces.yaml)의 `kind: platform` 표면이다. **게이트 12(공개 금지어)**가 `make verify`에서 자동으로 돈다.
- **게이트 17(글자 수)**: 필드 제목 `### 이름 · N자` 바로 아래 코드 블록의 길이(줄바꿈 제외)가 N을 넘으면 FAIL.
- 회사별 이력서에 적용된 결정(§1-6 행)은 플랫폼 문안에도 같은 작업에서 반영한다. 반영 전까지 registry의 `drift: true`다.

## 절차 (요약)

```text
표현 SoT 변경 (app/fe · §1-6)
  → {platform}.md 갱신 (필드·글자 수에 맞춰 축약, 새 사실 없음)
  → make verify (게이트 12·17)
  → 플랫폼 적용: 자동 가능한 필드만 자동, 나머지는 사람이 붙여넣기
  → 저장 → 새로고침 → 필드 value 재확인 (화면에 보인다 ≠ 저장됐다)
  → registry live_version · live_verified_at · drift 갱신
```

## 자동화 제약 (2026-09-03 Orca 내장 브라우저 실측 — 이전 paseo 기록을 대체)

| 플랫폼 | 결과 | 비고 |
| --- | --- | --- |
| 로켓펀치 | 자동 | `fill`로 소개·경력 본문 저장(줄바꿈 보존). 경력 편집 모달은 항목 목록이 한 폼을 공유 → 회사명 확인 후 채운다 |
| 리멤버 | 자동 | 소개 2탭·경력 본문 `fill` + `완료` 저장. 경력 항목은 clickable 컨테이너를 눌러 인라인 폼 |
| 링크드인 | 자동 | headline·About(줄바꿈 보존)·경력 description `fill` + `저장`. `/edit/about/` URL은 404 — 프로필의 `정보 변경` 링크로 진입 |
| 원티드 | **부분** | 프로필 소개(150자)는 `/my/profile/edit` 페이지에서 `fill` + `저장`으로 저장됨. 기본 이력서의 경력 본문 textarea도 `fill` + `작성 완료`로 저장됨. **이력서 간단 소개·성과 제목**은 fill / Tab blur / inserttext / type / native setter+input 5회 모두 미저장 → 사람이 붙여넣기 |
| 그룹바이 | **부분** | 자기소개 편집기는 JS 클릭으로 열림. 경력 카드 연필 아이콘(ref 없는 svg)은 3회 모두 안 열림 → 사람이 붙여넣기 |

### 이전 기록 (2026-08, paseo 브라우저)

| 플랫폼 | 텍스트 입력 | 비고 |
| --- | --- | --- |
| 로켓펀치 | 자동 (`insertText`) | 클릭 안 먹는 컴포넌트는 React props onClick 직접 호출로 우회한 전례 |
| 리멤버 · 그룹바이 | 자동 | 정상 |
| 원티드 | **수동** | React state와 DOM value가 분리돼 자동 입력이 저장되지 않음. 클릭 기반(직무·스킬)만 자동 |
| 링크드인 | **수동 (장문)** | CSP가 evaluate 차단, `fill`은 줄바꿈을 공백으로. typeahead·URL 필드는 저장 시 되돌아감 |

공통: `browser_type`은 한글 입력 불가(IME) → `execCommand('insertText')`. 인증 경력(건강보험공단)은 날짜 수정 불가. OS 키 입력 자동화는 사용자가 머신을 쓰는 동안 금지.

## 현재 상태 (2026-09-03)

live는 2026-08-24 적용한 **Maker v2**이고 canonical은 **Product Engineer v3**다. 다섯 플랫폼 모두 `drift: true` — live에 `돈을 내는`·`결제하는`·내부 제품명이 남아 있다. 다음 작업은 v3 적용이며, 원티드·링크드인은 사람이 붙여넣어야 한다.
