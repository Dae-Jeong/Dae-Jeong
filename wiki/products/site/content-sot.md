---
type: reference
title: 콘텐츠 SoT — 공개 site surface 기준선
description: 2026-08-13부터 app/fe의 각 public surface가 자신의 표현 SoT다. 플랫폼 프로필은 관련 surface에서 파생된다. 사실·강도는 claim registry가 계속 소유한다.
timestamp: 2026-08-22
tags: [sot, content, site, platform]
---

# 콘텐츠 SoT — 공개 site surface 기준선 (2026-08-13)

> user: "우리 홈페이지를 SoT로 둔 다음에 플랫폼들에 sync를 맞추자"

## 층 분리 — 무엇을 어디가 소유하는가

| 층 | 소유 | 내용 |
| --- | --- | --- |
| **사실·강도** | `wiki/evidence/` + `wiki/evidence/claims/*.yaml` | 무엇이 사실인가, owned/led/co-led/contributed, `allowed_copy`·`forbidden_copy` |
| **브랜드 정체성** | `wiki/profile/identity.md` | 공통 Maker 문장과 채용 역할 hierarchy |
| **표현 (SoT)** | **`app/fe`** — `app/page.tsx` · `app/resume/resume-view.tsx` | 각 surface에서 어떻게 말하는가. 문장·순서·강조 |
| **파생** | 원티드 · 링크드인 · 리멤버 · 로켓펀치 · 그룹바이 · 사람인 | 플랫폼 제약(글자 수·필드·줄바꿈)에 맞춘 변환본 |
| **디자인** | D2 → `app/design` | 타입 스케일·컴포넌트 문법·레이아웃 |

**핵심**: "무엇을 말할 수 있는가"는 claim registry가, "해당 지면에서 어떻게 말하는가"는 `app/fe`의 각 surface가 소유한다. `/`와 `/resume`는 사실·claim을 서로에서 복사하지 않는다.
홈페이지가 SoT라고 해서 claim 계약을 넘어설 수 없다 — 문안을 바꿀 때도 `allowed_copy` 안에서 쓴다.

## 뒤바뀐 것

이전에는 `backlog/platform-profile-consolidation/dual-track-copy-draft.md`가 canonical이고
홈페이지가 "임시 수동 사본"이었다. 실제로는 홈페이지에서 문안을 다듬고 그걸 canonical로
역흡수하는 흐름이 반복됐으므로, **실제 작업 방식에 맞게 방향을 뒤집는다.**

- `dual-track-copy-draft.md` → **플랫폼 변환 작업본**으로 역할 변경.
  홈페이지 문안을 플랫폼 제약(원티드 글자 수, 링크드인 줄바꿈 등)에 맞춰 옮기는 곳이다.
- 새 문장·새 서사는 **홈페이지에서 먼저 확정**한 뒤 파생한다.

## 지면별 역할

각 지면이 무엇을 담고 무엇을 담지 않는지는 [surface-roles](surface-roles.md)가 소유한다.
이 문서는 **어디가 기준인가**(SoT)를, 그 문서는 **각 지면이 무슨 일을 하는가**를 다룬다.

## 동기화 규칙

1. **관련 public surface를 먼저 고친다.** 홈 문안은 `/`, 경력·이력서 문안은 `/resume`에서 먼저 확정한다. 플랫폼부터 고치지 않는다.
2. 고친 뒤 `claim registry` 대조 — `allowed_copy` 밖 표현이 없는지 확인한다.
3. 플랫폼 변환본을 갱신한다 ([Platform Profile Paste Package](../../backlog/platform-profile-consolidation/2026-08-22-platform-paste-package.md)).
4. 플랫폼에 반영하고 **실측으로 검증**한다 (폼은 `innerText`가 아니라 필드 `value`로 읽는다).
5. 결과를 [동기화 매트릭스](../../backlog/platform-profile-consolidation/2026-08-13-sync-matrix.md)에 기록한다.

## 현재 SoT 스냅샷 (2026-08-22)

- 공통 소개: `아이디어를 고객이 돈을 내는 제품으로 만드는 메이커, 김대정입니다.`
- 채용 역할: `Tech Lead · Backend Engineer`; 전문 영역: `AI Product Systems`
- resume 순서: `소개 → 경력 → 대표 성과 → 기술 → 외부 활동 → credentials`
- portfolio 순서: `Thready → Company AX → Centurion`, supporting `Memento Payment`; Infrastructure는 archive evidence
- 플랫폼 프로필은 이 기준선의 문장·경력·대표 성과를 각 필드와 글자 수에 맞게 축약하며 새 사실을 만들지 않는다.
