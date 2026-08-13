---
type: reference
title: 콘텐츠 SoT — 홈페이지 기준선
description: 2026-08-13부터 marinkim.xyz 문안이 표현의 SoT다. 플랫폼 프로필은 여기서 파생된다. 사실·강도는 claim registry가 계속 소유한다.
timestamp: 2026-08-13
tags: [sot, content, site, platform]
---

# 콘텐츠 SoT — 홈페이지 기준선 (2026-08-13)

> user: "우리 홈페이지를 SoT로 둔 다음에 플랫폼들에 sync를 맞추자"

## 층 분리 — 무엇을 어디가 소유하는가

| 층 | 소유 | 내용 |
| --- | --- | --- |
| **사실·강도** | `wiki/evidence/` + `wiki/evidence/claims/*.yaml` | 무엇이 사실인가, owned/led/co-led/contributed, `allowed_copy`·`forbidden_copy` |
| **표현 (SoT)** | **`app/fe`** — `app/page.tsx` · `app/resume/resume-view.tsx` | 어떻게 말하는가. 문장·순서·강조 |
| **파생** | 원티드 · 링크드인 · 리멤버 · 로켓펀치 · 그룹바이 · 사람인 | 플랫폼 제약(글자 수·필드·줄바꿈)에 맞춘 변환본 |
| **디자인** | D2 → `app/design` | 타입 스케일·컴포넌트 문법·레이아웃 |

**핵심**: "무엇을 말할 수 있는가"는 claim registry가, "어떻게 말하는가"는 홈페이지가 소유한다.
홈페이지가 SoT라고 해서 claim 계약을 넘어설 수 없다 — 문안을 바꿀 때도 `allowed_copy` 안에서 쓴다.

## 뒤바뀐 것

이전에는 `backlog/platform-profile-consolidation/dual-track-copy-draft.md`가 canonical이고
홈페이지가 "임시 수동 사본"이었다. 실제로는 홈페이지에서 문안을 다듬고 그걸 canonical로
역흡수하는 흐름이 반복됐으므로, **실제 작업 방식에 맞게 방향을 뒤집는다.**

- `dual-track-copy-draft.md` → **플랫폼 변환 작업본**으로 역할 변경.
  홈페이지 문안을 플랫폼 제약(원티드 글자 수, 링크드인 줄바꿈 등)에 맞춰 옮기는 곳이다.
- 새 문장·새 서사는 **홈페이지에서 먼저 확정**한 뒤 파생한다.

## 동기화 규칙

1. **홈페이지를 먼저 고친다.** 플랫폼부터 고치지 않는다.
2. 고친 뒤 `claim registry` 대조 — `allowed_copy` 밖 표현이 없는지 확인한다.
3. 플랫폼 변환본을 갱신한다 (`wanted-paste-package.md` · `linkedin-paste-package.md` 등).
4. 플랫폼에 반영하고 **실측으로 검증**한다 (폼은 `innerText`가 아니라 필드 `value`로 읽는다).
5. 결과를 [동기화 매트릭스](../../backlog/platform-profile-consolidation/2026-08-13-sync-matrix.md)에 기록한다.

## 현재 SoT 스냅샷 (2026-08-13)

- 섹션 순서: `요약 → 경력 → 할 수 있는 일 → 일하는 방식 → 기술 → credentials`
- 경력은 **회사별 역할·담당 범위** 중심. 사내 코드명 노출 금지 (§14)
- 역량 축 6종 — 구축·재구축 / 품질 판정·평가 / 어드민 시스템 / Agent 워크플로우·AX /
  인프라·플랫폼 / 제품 운영·결정
- 스택 3층 — 주력(Python·FastAPI) / 함께 씀(TypeScript·NestJS) / 개인 프로젝트(Java·Spring Boot)
