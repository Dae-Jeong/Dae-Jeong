---
type: design-spec
title: Resume Floating Navigator
description: 공통 이력서와 회사별 맞춤 이력서가 공유하는 문서 폭, floating navigation, action, responsive contract.
timestamp: 2026-08-16
tags: [resume, frontend, layout, navigation, responsive]
---

# Resume Floating Navigator

## 목적

`/resume`와 `/resume/{company}`에서 오른쪽 보조 영역이 이력서 본문의 폭을 줄이지 않게 한다. 문서가 일차 정보이고 목차·PDF·언어 전환은 필요할 때만 사용하는 보조 기능이라는 우선순위를 화면 구조에 반영한다.

이 변경은 MGRV 전용 조정이 아니다. 공통 이력서와 모든 회사별 이력서가 같은 layout contract와 component를 사용하고, 회사별 화면은 내용과 사용 가능한 action만 전달한다.

## 현재 문제

- 공통 이력서와 회사별 이력서가 각각 `minmax(0, 1fr) + 240px` grid와 `48px` gap을 중복 구현한다.
- 보조 영역이 총 288px을 점유해 경력의 프로젝트 문장과 성과 description이 필요 이상으로 줄바꿈된다.
- PDF, 언어, 목차, DRAFT 설명이 같은 시각 무게로 쌓여 문서보다 보조 기능이 먼저 보인다.
- 공통 화면과 회사별 화면을 따로 수정해야 하므로 spacing과 responsive behavior가 다시 갈라질 수 있다.
- 우하단의 `AskLauncher`도 fixed element이므로 새로운 navigator가 같은 영역을 쓰면 충돌할 수 있다.

## 디자인 원칙

1. 이력서 본문은 navigator의 존재와 관계없이 같은 폭을 유지한다.
2. navigator는 본문 위에 겹치지 않고 viewport의 문서 바깥 여백에만 놓인다.
3. 목차는 항상 펼친 정보판이 아니라 현재 위치를 보여주는 minimap이다.
4. 사용 불가능한 action은 비활성 상태로 공간을 차지하지 않는다.
5. 모바일에서는 floating UI를 유지하지 않는다. 문서 위에 놓이는 compact action row로 변환한다.
6. 공통·회사별 이력서는 하나의 shell과 navigator를 사용한다.

## 정보 구조

### Document

- 최대 폭: 920px
- 정렬: viewport 중앙
- navigator가 없는 것처럼 독립적으로 폭을 계산한다.
- 장문 description은 기존 `70ch` measure를 유지한다.

### Floating rail

- 목적: PDF action, 현재 섹션 표시, section jump, 선택적 언어 전환
- 위치: viewport 오른쪽 고정. 본문 오른쪽 경계와 최소 16px 안전 간격을 확보할 수 있을 때만 표시한다.
- 폭: 44px
- 표시 조건: 기존 Tailwind `xl` breakpoint 이상에서만 표시한다. 별도의 중간 폭 rail은 만들지 않는다.
- 세로 범위: 상단 page chrome 아래에서 시작하고, 하단 `AskLauncher` 위에서 끝난다.
- 배경: 별도 패널을 두지 않는다. 흰 문서 위에 중립색 marker만 떠 있게 해 본문보다 시각적 우선순위를 낮춘다.

### Section minimap

- 실제 이력서 section 수만큼 marker를 만든다. 장식용 가짜 marker는 만들지 않는다.
- inactive marker: 짧고 낮은 대비의 선
- active marker: 더 길고 높은 대비의 선
- click 또는 keyboard activation으로 section anchor에 이동한다.
- active item에 `aria-current="location"`을 사용한다.
- hover·focus 시 문서와 겹치지 않는 outer gutter 안에 section label을 표시한다.

### Actions

- PDF: `pdfHref`가 있을 때만 download action을 표시한다. 준비 중인 PDF를 disabled button으로 노출하지 않는다.
- Language: 실제로 선택 가능한 언어가 두 개 이상일 때만 표시한다. 회사별 KO-only 이력서에는 언어 UI를 만들지 않는다.
- DRAFT: 회사별 route의 기존 topbar tag가 소유한다. navigator에서 상태 설명을 반복하지 않는다.
- `CONTENTS` 제목과 장문의 sidebar 설명은 제거한다.

## Responsive contract

| Viewport | Document | Navigator |
| --- | --- | --- |
| Tailwind `xl` 이상 | 최대 920px, 중앙 정렬 | 44px floating rail |
| `xl` 미만 | 가용 폭 안에서 최대 920px | floating rail 제거, 문서 앞의 static compact actions만 표시 |
| print | A4 문서 규칙 | 모든 navigation/action 숨김 |

`AskLauncher`는 우하단을 계속 사용한다. floating rail은 launcher의 상단 경계보다 아래로 내려오지 않으며, 두 fixed element의 hit area가 겹치지 않아야 한다.

## Component architecture

### `ResumeLayout`

공통 문서 폭과 responsive placement를 소유한다.

```tsx
type ResumeLayoutProps = {
  children: React.ReactNode;
  sections: readonly ResumeSection[];
  pdfHref?: string;
  language?: ResumeLanguageControl;
};
```

- 기존 두 화면의 `grid-cols-[minmax(0,1fr)_240px] gap-12`를 제거한다.
- document와 navigator의 위치만 소유하며 resume content를 알지 못한다.
- desktop rail과 compact action row 중 하나만 breakpoint에 따라 노출한다.

### `ResumeNavigator`

section marker와 action interaction을 소유하는 client component다.

```tsx
type ResumeSection = {
  id: string;
  label: string;
};

type ResumeLanguageControl = {
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
};
```

- `IntersectionObserver`로 active section을 계산한다.
- hash anchor를 사용하고 section에 top offset용 `scroll-margin`을 둔다.
- hover 없이도 click·keyboard·screen reader에서 모든 기능을 사용할 수 있어야 한다.
- scroll animation을 강제하지 않는다.

### Consumers

- `ResumeView`: KO/EN state와 실제 language options를 전달한다.
- `TailoredResumeView`: 회사별 sections와 선택적 `pdfHref`만 전달한다. EN이 없으면 language prop을 전달하지 않는다.
- `ResumePageShell`: topbar·footer·AskLauncher를 계속 소유한다. 문서 내부 navigation을 소유하지 않는다.

## 제거할 중복

두 view에서 다음 구현을 삭제하고 공통 component로 이동한다.

- 240px sidebar grid
- PDF button markup
- language selector markup
- Contents heading과 ordered list
- 회사별 DRAFT 설명문
- desktop/mobile order 전환 class

회사별 차이는 section 배열, PDF 존재 여부, language options뿐이다.

## 시각 위계

1. 문서의 이름·직무·경력이 가장 먼저 보인다.
2. section title과 본문이 두 번째 흐름을 만든다.
3. navigator marker는 의도적으로 낮은 대비를 사용한다.
4. active marker와 focus state에만 높은 대비를 사용한다.
5. rail은 좁은 면적으로 존재하며 본문보다 넓거나 강한 텍스트 블록을 만들지 않는다.

## 접근성

- navigator는 `nav aria-label="이력서 목차"`를 사용한다.
- marker의 accessible name은 section label 전체를 포함한다.
- target size는 최소 44×44px을 유지하되 시각적인 선은 더 작게 표현한다.
- focus indicator를 숨기지 않는다.
- active section은 색만이 아니라 marker 길이와 `aria-current`로 함께 표현한다.
- compact action row의 PDF·언어 기능은 desktop과 동일한 accessible name을 사용한다.

## Acceptance criteria

1. `/resume`, `/resume/mgrv`, `/resume/gna-company`가 같은 `ResumeLayout`과 `ResumeNavigator`를 사용한다.
2. `xl` 이상에서 navigator 때문에 document width가 줄어들지 않는다.
3. 모바일·`xl` 직전·넓은 desktop의 대표 viewport에서 본문·navigator·AskLauncher가 겹치지 않는다.
4. 회사별 PDF나 EN이 없을 때 빈 action 또는 disabled control이 남지 않는다.
5. section marker click, keyboard focus, active section 갱신이 모두 동작한다.
6. print/PDF 출력에는 navigation과 action이 나타나지 않는다.
7. MGRV 경력의 프로젝트 한 줄과 핵심 성과 description이 기존보다 불필요하게 더 많이 줄바꿈되지 않는다.
8. layout/type detector, lint, build, workspace validator, desktop/mobile browser snapshot이 통과한다.

## 구현 순서

1. `ResumeLayout`과 `ResumeNavigator`의 shared props를 정의한다.
2. 공통 `/resume`를 shared component로 이동하고 KO/EN 전환을 연결한다.
3. 회사별 `TailoredResumeView`를 같은 component로 이동한다.
4. section active tracking과 anchor offset을 추가한다.
5. desktop rail과 `xl` 미만의 static action row를 구현한다.
6. AskLauncher 충돌과 print behavior를 검증한다.
7. 세 route를 동일 viewport matrix로 시각 검증한다.

## Non-goals

- 이력서 본문 문안이나 claim 변경
- PDF 생성 pipeline 변경
- 전역 site navigation 재설계
- AskLauncher 기능 변경
- 가짜 scroll progress나 문서 내용과 무관한 decorative marker 추가
- 중간 viewport 전용 rail이나 breakpoint별 별도 폭 최적화
