---
name: platform-sync-profiles
description: Sync the recruiting-platform profiles (Wanted, LinkedIn, Remember, Groupby, RocketPunch) to the canonical platform copy — derive field text from the app/fe surfaces and rules, verify with make verify, apply through the browser only where automation is known to persist, confirm by reload, and record live state in the platform registry. Use when the user asks to update, check, or sync platform profiles. Never invent copy on a platform.
---

# Platform Sync Profiles

플랫폼 프로필은 표현 SoT(`app/fe` 공개 surface)에서 **파생**한다. 플랫폼에서 문안을 새로 쓰지 않는다. canonical 문안·registry·제약은 [wiki/products/platform-profiles](../../../wiki/products/platform-profiles/README.md)가 소유한다.

## 입력

- 사용자 요청·현재 대화·기존 Task에서 승인된 플랫폼과 필드가 대상이다. registry의 `status: active`는 후보와 상태이며 모든 플랫폼 변경 허가가 아니다. 문안만 검토·갱신하는 요청은 외부 적용으로 확대하지 않는다.
- 최근 결정은 [copy-standard §1-6](../../../wiki/rules/application-copy-standard.md)과 현재 claim을 대조한다. 회사별 변경의 플랫폼 영향은 확인하되, 승인된 대상만 반영하고 범위 밖 consumer는 남은 영향으로 보고한다. 이미 승인된 범위를 다시 승인 요청하지 않는다.

## 절차

1. **파생.** `app/fe/content/common/resume.json`·최신 회사별 이력서·[resume-block-library](../../../wiki/products/resume/resume-block-library.md)에서 문장을 가져와 `wiki/products/platform-profiles/{platform}.md`의 필드를 갱신한다. 글자 수 상한에 맞춰 **자르기만** 하고 새 사실·수치를 만들지 않는다. claim `allowed_copy` 밖이면 삭제.
2. **검사.** `make verify` — 게이트 12(금지어)·17(글자 수)이 platform 표면에서 돈다. FAIL이면 문안을 고친다. 2회 넘게 안 닫히면 "결정 필요"로 사용자에게.
3. **적용.** 외부 적용이 승인된 대상에 한해 [platform-registry.yaml](../../../wiki/products/platform-profiles/platform-registry.yaml)의 날짜별 `automation` 관측과 현재 로그인 화면을 함께 확인한다. 플랫폼 이름으로 입력 방식을 고정하지 않는다.
   - `auto`, `partial`, `manual`은 이전 확인 시점의 저장 관측이다. 특히 partial은 같은 플랫폼의 필드별로 저장 방식이 다를 수 있다. 현재 대상 필드·입력 한도·저장 조작을 먼저 확인하고, 입력 뒤 저장·reload로 실제 유지 여부를 검증한다.
   - 현재 화면에서 자동 입력의 저장을 확인할 수 없으면 반복 우회를 만들지 않는다. 해당 필드는 canonical 코드 블록의 붙여넣기 대상으로 보고하고, 확인된 클릭 필드·독립 작업만 승인된 범위에서 계속한다.
   - 한글 입력은 사용 가능한 브라우저 도구의 실제 입력·저장 동작을 확인한다. 기존 환경의 IME 문제를 고려하되 특정 플랫폼 전체를 자동 또는 수동으로 단정하지 않는다.
   - **채우기 전에 폼의 대상을 확인한다.** 경력 편집 모달처럼 여러 항목이 한 폼을 공유하면, 회사명 textbox 값이 목표 항목과 일치할 때만 채운다. 불일치면 중단한다.
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
