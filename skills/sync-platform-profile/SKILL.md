---
name: sync-platform-profile
description: Sync the recruiting-platform profiles (Wanted, LinkedIn, Remember, Groupby, RocketPunch) to the canonical platform copy — derive field text from the app/fe surfaces and rules, verify with make verify, apply through the browser only where automation is known to persist, confirm by reload, and record live state in the platform registry. Use when the user asks to update, check, or sync platform profiles. Never invent copy on a platform.
---

# Sync Platform Profile

플랫폼 프로필은 표현 SoT(`app/fe` 공개 surface)에서 **파생**한다. 플랫폼에서 문안을 새로 쓰지 않는다. canonical 문안·registry·제약은 [wiki/products/platform-profiles](../../wiki/products/platform-profiles/README.md)가 소유한다.

## 입력

- 플랫폼 목록(기본: registry `status: active` 5곳) 또는 특정 필드.
- 최근 결정: [copy-standard §1-6](../../wiki/rules/application-copy-standard.md)의 새 행. 회사별 이력서에 반영된 결정은 플랫폼에도 같은 작업에서 반영한다.

## 절차

1. **파생.** `app/fe/app/resume/resume-view.tsx`·최신 회사별 이력서·[resume-block-library](../../wiki/products/resume/resume-block-library.md)에서 문장을 가져와 `wiki/products/platform-profiles/{platform}.md`의 필드를 갱신한다. 글자 수 상한에 맞춰 **자르기만** 하고 새 사실·수치를 만들지 않는다. claim `allowed_copy` 밖이면 삭제.
2. **검사.** `make verify` — 게이트 12(금지어)·17(글자 수)이 platform 표면에서 돈다. FAIL이면 문안을 고친다. 2회 넘게 안 닫히면 "결정 필요"로 사용자에게.
3. **적용.** [platform-registry.yaml](../../wiki/products/platform-profiles/platform-registry.yaml)의 `automation`을 따른다.
   - `text_input: auto`(리멤버·그룹바이·로켓펀치): 브라우저로 넣는다. 한글은 `execCommand('insertText')`, `browser_type` 금지(IME).
   - `text_input: manual`(원티드·링크드인 장문): **사람이 붙여넣는다.** 붙여넣기용 본문은 `{platform}.md`의 코드 블록 그대로. agent는 클릭 기반 필드(직무·스킬)만 만진다.
   - **채우기 전에 폼의 대상을 확인한다.** 경력 편집 모달처럼 여러 항목이 한 폼을 공유하면, 회사명 textbox 값이 목표 항목과 일치할 때만 채운다. 불일치면 중단한다 (2026-09-03 로켓펀치: 목록 항목 클릭이 빗나가 MediSolve 본문을 더데이랩스 텍스트로 덮어썼다가 복구).
   - 지정 필드 외에는 아무것도 바꾸지 않는다 — 공개 범위·구직 상태·희망 조건·인증 경력.
   - 같은 조작 3회 실패면 중단하고 보고한다. 우회를 창작하지 않는다.
4. **검증.** 저장 → 새로고침 → 필드 `value`(innerText 아님) 재확인. 링크드인은 비로그인 공개 화면까지. "화면에 보인다 ≠ 저장됐다."
5. **기록.** registry의 `live_version`, `live_verified_at`, `drift`를 갱신하고, 미적용 필드는 `note`에 남긴다.
6. **보고.** 플랫폼별 적용/미적용 필드, verify 결과, 사람이 붙여넣어야 할 항목 목록.

## 금지

- 플랫폼 AI 리뷰 점수로 문안을 고치지 않는다. 점수는 선택한 포지션 기준이라 포지션 불일치를 문안 문제로 오독하기 쉽다.
- 내부 제품명·고객사·provider·정확한 매출·수치는 회사별 이력서와 같은 기준으로 금지 (게이트 12).
- 문서 제목·headline에 `○○ 지원` 표현을 쓰지 않는다.
- 사용자가 머신을 쓰는 동안 OS 키 입력 자동화(osascript keystroke) 금지.
