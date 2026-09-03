---
type: implementation-plan
title: Common Document Visual Refresh
description: 확정된 A안의 절제된 문서형 디자인을 기준으로 Common 이력서·경력기술서·CV·포트폴리오의 화면 위계와 A4 출력을 문서 역할별로 개편한다.
status: in-progress
timestamp: 2026-09-02
tags: [resume, career-description, cv, portfolio, design, frontend, print]
---

# Common Document Visual Refresh

## Progress

- `DOCUI-01`: current component boundary와 기존 visual output audit 완료. Orca 브라우저에서
  1440×900·1920×1080 desktop, 390×844 mobile, A4 baseline을 기록함.
- `DOCUI-02`: Common Resume 구현·visual 검토 완료. 사진·반복 section 번호를 제거하고
  소개를 header에 흡수했으며, Common 전용 header token으로 tailored resume 회귀를 차단함.
  인쇄 시 경력 section을 새 A4 페이지에서 시작하도록 정리함.
- `DOCUI-03`: Common Career Description 구현·visual 검토 완료. project 번호 장식을
  제거하고 문제·선택·구현·검증·결과의 읽기 구조를 분리함. 인쇄에서는 한 project의
  판단 흐름이 페이지 사이에서 갈라지지 않도록 page-break 규칙을 적용함.
- `DOCUI-04`: Common CV 구현·visual 검토 완료. chronology와
  project·skills·education·credential 대조 구조를 Career Description과 분리함.
- `DOCUI-05`: Common Portfolio 구현·visual 검토 완료. light hero, compact case header,
  sticky case boundary를 적용하고 common route에만 scope함. diagram clipping과 case 경계를
  desktop·mobile·A4에서 확인함.
- `DOCUI-06`: shared shell은 유지하고 Common 전용 variant만 추가함. 520px 이하에서 긴
  crumb를 숨기고 local review control이 mobile 본문을 가리지 않게 함. frozen application
  content 변경 없음.
- `DOCUI-07`: Orca screenshot과 A4 PDF 검토 완료. Resume 5p, Career Description 9p,
  CV 3p, Portfolio 5p이며 빈 페이지·clipping이 없고 text extraction과 문서 link를 확인함.
  lint·production build·TypeScript·workspace validator·scoped diff check pass. JYP·Pinokiolab
  대표 tailored route도 HTTP 200 회귀 확인함.
- `DOCUI-08`: 사용자 visual review와 공개 범위 결정 대기.
- `DOCUI-09` (2026-09-02): 사용자 결정에 따라 JYP·피처링 tailored route를 A안(UI revision 3)으로 올림. `TailoredResume.uiRevision=3`이면 사진·섹션 번호 없는 Common header token과 `소개(header 흡수) → 핵심 성과 → 경력` 순서를 쓰고, `RolePortfolio.heroVariant="light"`이면 두 열 light hero를 쓴다. 피처링 case 제목 스케일과 영문 eyebrow를 A안 기준으로 정리. registry `current.artifact_revisions`를 3으로 기록.

## Goal

Common 이력서·경력기술서·CV·포트폴리오가 같은 사람의 문서라는 인상은 유지하되,
네 문서를 같은 레이아웃으로 복제하지 않는다. 채용담당자와 실무리더가 각 문서의
목적에 맞는 속도로 내용을 읽고, desktop과 A4 PDF 어디에서도 폭·정렬·줄바꿈 때문에
판단이 끊기지 않게 한다.

콘텐츠 역할과 artifact 선택은
[Resume Document Package Contract](../../../products/resume/document-package-contract.md)가
소유한다. 이 계획은 검증된 내용의 선택이나 claim 강도를 바꾸지 않고, 현재 표현을
읽기 좋은 화면과 출력물로 옮기는 frontend 작업만 소유한다.

## Locked Direction

- 사용자가 선택한 A안의 절제된 문서형 방향을 사용한다. 새 시안 경쟁을 다시 열지 않는다.
- 화면은 흰색·중립색 약 95%, 구조를 설명하는 보조색 약 4%, 핵심 판정 accent 약 1%의
  비율을 기준으로 한다.
- 본문은 Pretendard 계열을 우선하고 mono는 기간·코드·짧은 metadata에만 제한한다.
- 제목은 혼자 화면을 점유할 만큼 키우지 않고, 본문과 다음 판단 근거가 같은 viewport에
  함께 보이게 한다.
- 문장은 고정 `<br>`나 임의의 `ch`·`px` max-width로 끊지 않는다. 문서 grid와 실제
  가용 폭이 자연스러운 줄바꿈을 결정한다.
- desktop을 먼저 완성한다. 기준 viewport는 1440×900과 1920×1080이며, 이후 390px
  mobile에서 기능과 위계가 보존되는지만 회귀 검증한다.
- Resume·Career Description·CV는 A4 210mm를 기준으로 읽기 폭을 공유한다.
  Portfolio는 diagram과 비교 구조를 위해 최대 1180px canvas를 사용할 수 있지만,
  hero·case header·본문의 시작선은 일관되게 맞춘다.
- section 번호·영문 eyebrow·색상은 의미가 있을 때만 쓴다. 모든 section에 같은 장식을
  반복하지 않는다.
- 카드 grid와 panel 반복으로 구분하지 않는다. 여백·선·배경 전환·타이포그래피로
  문서와 case 경계를 만든다.
- 기존 local/draft/noindex 상태를 유지한다. 이 작업만으로 공개 승인·commit·배포를
  수행하지 않는다.

## Reader And Page Roles

| Route | Primary reader | 첫 판단 | 화면 역할 |
| --- | --- | --- | --- |
| `/resume` | 채용담당자, 실무리더 | 인터뷰할 이유가 있는가 | 정체성·핵심 성과·경력·기술을 빠르게 스캔 |
| `/career` | 실무리더, 면접관 | 실제로 어떤 문제를 어떻게 풀었는가 | 프로젝트별 문제·역할·선택·구현·검증·결과를 추적 |
| `/cv` | 채용담당자, 운영 담당자 | 전체 이력과 자격에 누락이 없는가 | chronology와 credential을 조밀하고 정확하게 대조 |
| `/portfolio` | 실무리더, senior engineer | 주장과 기술 판단을 신뢰할 수 있는가 | 선별한 사례와 시각 근거를 60초 안에 훑고 상세로 이동 |

## Current Implementation Boundary

| Concern | Current owner | Refresh implication |
| --- | --- | --- |
| 공통 document shell | `app/fe/app/resume/resume-page-shell.tsx` | navigation·footer는 공유하되 본문 layout을 강제하지 않음 |
| Resume canvas·navigator | `app/fe/app/resume/resume-layout.tsx` | A4 폭과 보조 navigation의 비침범 원칙 유지 |
| Resume expression | `app/fe/app/resume/resume-view.tsx` | 첫 화면 scanability와 bullet·section rhythm 개편 |
| Career·CV renderer | `app/fe/app/documents/professional-document.tsx` | 공용 primitive는 유지하고 두 문서의 layout variant를 분리 |
| Career·CV print rules | `app/fe/app/documents/professional-document.module.css` | project·chronology별 page-break 규칙 분리 |
| Portfolio summary | `app/fe/app/portfolio/page.tsx` | hero 축소, case 경계와 diagram canvas 정렬 개편 |
| Portfolio detail·variant | `app/fe/app/portfolio/**` | 공용 변경의 회귀 대상이며 1차 개편 범위에는 포함하지 않음 |
| Global tokens | `app/fe/app/globals.css` | 전역 토큰 교체보다 document-scoped token을 우선 |

## Task Map

| ID | Task | Depends on | Completion output |
| --- | --- | --- | --- |
| `DOCUI-01` | 현행 visual baseline과 문서 디자인 계약 확정 | 없음 | desktop·A4 baseline, width·type·color·spacing contract |
| `DOCUI-02` | Common Resume 개편 | `DOCUI-01` | 30초 scan이 가능한 `/resume`와 A4 |
| `DOCUI-03` | Common Career Description 개편 | `DOCUI-01` | 프로젝트 판단 흐름이 분명한 `/career`와 A4 |
| `DOCUI-04` | Common CV 개편 | `DOCUI-01` | chronology·credential 대조가 쉬운 `/cv`와 A4 |
| `DOCUI-05` | Common Portfolio 개편 | `DOCUI-01` | case 경계와 대표 visual이 분명한 `/portfolio`와 A4 |
| `DOCUI-06` | 공용 shell·document primitive 정합화 | `DOCUI-02`–`DOCUI-05` | 중복 없는 shared contract와 route별 variant |
| `DOCUI-07` | desktop·mobile·A4·PDF 회귀 검증 | `DOCUI-06` | screenshot, PDF, automated validation 결과 |
| `DOCUI-08` | 사용자 승인과 공개 범위 전환 판단 | `DOCUI-07` | 승인된 revision 또는 local review 유지 결정 |

## Task 1. 현행 visual baseline과 문서 디자인 계약 확정 (`DOCUI-01`)

목표:
네 Common route의 현재 화면과 A4를 같은 조건에서 기록하고, 구현 중 다시 흔들리지 않을
공통 정렬선·폭·타입·색상·spacing·print 규칙을 확정한다.

예상 결과:
- 1440×900·1920×1080 desktop과 A4 100% 기준 baseline screenshot이 존재함
- Resume·Career·CV의 210mm reading canvas와 Portfolio의 1180px visual canvas 사용 조건이
  문서화됨
- heading·body·metadata·code label의 역할과 최대 weight가 정해짐
- 95/4/1 색상 사용 위치와 semantic accent 조건이 정해짐
- 고정 줄바꿈·clipping·고아 제목·불필요한 max-width·반복 장식의 제거 목록이 존재함

Implementation notes:

- 실제 브라우저 screenshot을 기준으로 판단하고 DOM/CSS만 보고 완료 처리하지 않는다.
- 현재 route의 내용량을 줄여서 문제를 숨기지 않는다.
- 기존 `Container variant="doc"`와 A4 canvas가 만드는 두 폭의 관계를 먼저 확인한다.

## Task 2. Common Resume 개편 (`DOCUI-02`)

목표:
`/resume` 첫 화면에서 Maker 정체성, `Tech Lead · Backend Engineer`, 유료 AI 제품과
대표 backend 성과가 순서대로 읽히게 하고, 전체 문서는 경력과 기술 근거를 빠르게
스캔할 수 있는 이력서로 정리한다.

예상 결과:
- 첫 viewport에 이름·역할·소개·첫 번째 핵심 성과의 시작점이 함께 보임
- `소개 → 핵심 성과 → 경력 → 기술 → 외부 활동 → Credentials` 순서가 시각적으로
  분명함
- bullet marker·본문 시작선·기간 열·section 간격이 문서 전체에서 일관됨
- 긴 한국어 제목과 영문 기술명이 임의 줄바꿈 없이 자연스럽게 배치됨
- navigator와 PDF action이 본문 폭을 줄이거나 A4 출력에 나타나지 않음
- KO/EN 전환 시 같은 hierarchy와 page-break 안전성이 유지됨

Primary files:

- `app/fe/app/resume/resume-view.tsx`
- `app/fe/app/resume/resume-typography.ts`
- `app/fe/app/resume/resume-layout.tsx`

Regression scope:

- `/resume/{company}`와 role resume는 shared typography 변경의 영향만 확인한다.
- frozen application의 문안·Snapshot·PDF를 현재 Common 변경으로 덮어쓰지 않는다.

## Task 3. Common Career Description 개편 (`DOCUI-03`)

목표:
`/career`가 이력서 bullet의 확대판이나 포트폴리오의 복제품이 되지 않게 하고,
프로젝트별로 `문제 → 담당 범위 → 선택 → 구현 → 검증 → 결과`를 따라 읽을 수 있는
경력기술서로 만든다.

예상 결과:
- 회사·기간·역할과 개별 프로젝트의 경계가 스크롤 중에도 분명함
- 문제·선택·구현·검증·결과 label이 장식이 아니라 정보 탐색 기준으로 작동함
- project마다 반복되는 번호 eyebrow와 동일 panel 없이도 위계가 유지됨
- 긴 구현·검증 목록의 bullet과 label 열이 안정적으로 정렬됨
- 프로젝트 header와 첫 본문이 A4 페이지 사이에서 분리되지 않음
- 정량 근거가 없는 결과와 공개 경계 문구가 시각 강조 때문에 과장되지 않음

Primary files:

- `app/fe/app/documents/professional-document.tsx`
- `app/fe/app/documents/professional-document.module.css`
- `app/fe/app/career/page.tsx`

Design boundary:

- Career Description은 case diagram을 기본 문법으로 사용하지 않는다.
- 필요할 때만 Portfolio 상세 route를 보조 링크로 제공한다.

## Task 4. Common CV 개편 (`DOCUI-04`)

목표:
`/cv`를 설득형 사례 문서가 아니라 전체 경력·프로젝트·기술·학력·자격을 빠짐없이
대조할 수 있는 조밀한 기록 문서로 만든다.

예상 결과:
- organization·period·role·highlight가 chronology 기준으로 빠르게 대조됨
- Career Description과 다른 density·section rhythm이 적용됨
- Education·Awards·Certification·Patent가 한 영역에 뭉개지지 않고 종류별로 구분됨
- 두 열 layout은 내용 길이가 불균형해도 baseline과 divider가 어긋나지 않음
- 긴 영문 credential과 등록 번호가 잘리거나 인접 열을 침범하지 않음
- A4에서 한 record의 제목과 내용이 불필요하게 다른 페이지로 갈라지지 않음

Primary files:

- `app/fe/app/documents/professional-document.tsx`
- `app/fe/app/documents/professional-document.module.css`
- `app/fe/app/cv/page.tsx`

Design boundary:

- Career와 CV가 `DocumentHeader` 같은 primitive를 공유하는 것은 허용하지만,
  section renderer와 print break rule은 각각의 문서 역할에 맞게 분리한다.

## Task 5. Common Portfolio 개편 (`DOCUI-05`)

목표:
`/portfolio`에서 Thready·Company AX·Centurion 세 case와 supporting payment case가
명확히 구분되고, 각 case의 결과·핵심 판단·담당 범위·대표 visual을 60초 안에 훑을 수
있게 한다.

예상 결과:
- hero가 첫 화면을 독점하지 않고 case index 또는 첫 proof가 같은 viewport에 보임
- case 1·2·3의 시작과 끝을 스크롤 위치와 무관하게 구분할 수 있음
- 모든 case가 같은 회색 panel과 동일한 card 문법으로 평탄화되지 않음
- 대표 diagram은 해당 case의 reading column과 정렬되고 clipping·overflow가 없음
- navy·blue·green·amber는 정해진 semantic role 외에는 사용되지 않음
- supporting payment case가 primary case와 같은 위계로 오인되지 않음
- Portfolio summary의 주장과 상세 route의 ownership 강도가 일치함

Primary files:

- `app/fe/app/portfolio/page.tsx`
- `app/fe/app/portfolio/case-summary.tsx`
- `app/fe/app/portfolio/case-dossier.tsx`
- 필요한 경우에만 `app/fe/app/globals.css`의 portfolio-scoped rules

Regression scope:

- `/portfolio/[case]`, `/portfolio/role/*`, 현재 mutable tailored portfolio를 screenshot으로
  확인한다.
- frozen 지원본의 content와 제출 Snapshot은 수정하지 않는다.

## Task 6. 공용 shell·document primitive 정합화 (`DOCUI-06`)

목표:
네 페이지를 동일한 component로 강제하지 않으면서도 header·contact·document width·print
action·navigation처럼 실제로 공유되는 규칙은 한 곳에서 유지한다.

예상 결과:
- `ResumePageShell`이 navigation·footer·review control만 소유하고 본문 hierarchy를
  강제하지 않음
- Resume·Career·CV·Portfolio 각각의 page variant가 명시적으로 구분됨
- 동일한 contact·updated metadata·print action의 중복 구현이 제거됨
- route별 `data-*` hook과 print selector가 의미 있는 이름으로 정리됨
- 공용 변경이 tailored route에 미치는 범위가 regression checklist로 남음

Possible files:

- `app/fe/app/resume/resume-page-shell.tsx`
- `app/fe/app/documents/professional-document.tsx`
- `app/fe/app/documents/professional-document.module.css`
- `app/fe/components/site/container.tsx` — 기존 hub/doc 계약으로 해결되지 않을 때만
- `app/fe/app/globals.css` — shared token이 실제로 필요한 경우에만

## Task 7. desktop·mobile·A4·PDF 회귀 검증 (`DOCUI-07`)

목표:
실제 렌더링과 출력물을 기준으로 네 문서의 폭·정렬·줄바꿈·page-break·link·접근성을
검증하고, code review만으로 발견하기 어려운 시각 결함을 제거한다.

예상 결과:
- `/resume`, `/career`, `/cv`, `/portfolio`의 1440×900·1920×1080 screenshot이 존재함
- 390px mobile에서 navigation·본문·diagram의 정보와 순서가 보존됨
- A4 100% scale에서 clipping·겹침·고아 제목·빈 페이지가 없음
- PDF text extraction과 email·website·portfolio link가 정상임
- keyboard focus, landmark, heading order, WCAG AA contrast가 확인됨
- lint·production build·workspace validator·scoped diff check가 모두 통과함

Required checks:

```bash
pnpm --dir app/fe lint
pnpm --dir app/fe build
uv run --project tools python tools/validate_workspace.py
git diff --check
```

Visual matrix:

| Surface | Desktop | Mobile | A4/PDF |
| --- | --- | --- | --- |
| Common Resume | required | required | required |
| Common Career Description | required | required | required |
| Common CV | required | required | required |
| Common Portfolio | required | required | required |
| Shared tailored regression | representative routes | smoke | frozen output unchanged |

## Task 8. 사용자 승인과 공개 범위 전환 판단 (`DOCUI-08`)

목표:
검증된 화면과 PDF를 사용자에게 비교 가능한 상태로 보여주고, Common Career·CV의
local/noindex 해제와 네 문서의 release revision을 별도 승인으로 결정한다.

예상 결과:
- 네 route별 변경 전후 핵심 차이와 남은 한계가 정리됨
- Career·CV의 `review-ready → active` 전환 여부가 명시됨
- production navigation·footer·sitemap·metadata를 함께 바꿀지 결정됨
- 승인 전에는 commit·push·deploy와 public index 전환이 수행되지 않음

## Execution Order

```text
DOCUI-01  공통 baseline·contract
   ├─ DOCUI-02  Resume
   ├─ DOCUI-03  Career Description
   ├─ DOCUI-04  CV
   └─ DOCUI-05  Portfolio
          ↓
DOCUI-06  shared shell·primitive 정리
          ↓
DOCUI-07  visual·A4·PDF regression
          ↓
DOCUI-08  user approval·release decision
```

실제 구현은 Resume을 첫 기준면으로 잡는다. Career와 CV는 같은 renderer를 수정하므로
동시에 편집하지 않는다. Portfolio는 content와 visual component가 분리돼 있어 Resume
기준 확정 뒤 독립적으로 진행할 수 있다. shared primitive 정리는 각 화면에서 실제로
반복된 패턴이 확인된 뒤 수행하며, 먼저 추상화하지 않는다.

## File Boundary

### Expected modifications

- `app/fe/app/resume/resume-view.tsx`
- `app/fe/app/resume/resume-typography.ts`
- `app/fe/app/resume/resume-layout.tsx`
- `app/fe/app/documents/professional-document.tsx`
- `app/fe/app/documents/professional-document.module.css`
- `app/fe/app/career/page.tsx`
- `app/fe/app/cv/page.tsx`
- `app/fe/app/portfolio/page.tsx`
- `app/fe/app/portfolio/case-summary.tsx`

### Conditional modifications

- `app/fe/app/resume/resume-page-shell.tsx`
- `app/fe/app/portfolio/case-dossier.tsx`
- `app/fe/app/globals.css`
- `app/fe/components/site/container.tsx`

### Read-only evidence and content owners

- `wiki/profile/`
- `wiki/evidence/`
- `wiki/products/resume/common-content-inventory.yaml`
- `app/fe/content/documents/common.ts`
- `app/fe/lib/cases.ts`

문안 오류가 발견되면 이 UI task에서 임의 수정하지 않고 owner에 별도 issue로 기록한다.

## Non-goals

- 새 경력·수치·ownership·claim 생성
- 네 문서를 동일한 템플릿으로 통합
- 홈페이지 IA 재개편
- 전역 color system이나 font family 전면 교체
- 모든 tailored portfolio의 동시 redesign
- frozen application의 문안·PDF·Snapshot 갱신
- Career·CV의 자동 public 전환
- 사용자 요청 없는 commit·push·production deployment

## Completion Criteria

- 네 문서가 같은 brand family이면서 서로 다른 읽기 목적을 즉시 드러냄
- desktop에서 제목·본문·기간·label·diagram 정렬선이 안정적임
- 강제 줄바꿈과 의미 없는 max-width 때문에 문장이 어색하게 떨어지지 않음
- Resume는 30초 scan, Portfolio는 60초 proof scan, Career는 project trace, CV는 chronology
  대조 역할을 각각 수행함
- A4 PDF가 웹 hierarchy를 보존하고 문장·도표·link가 깨지지 않음
- shared 변경이 Common 밖의 active/tailored route를 깨뜨리지 않음
- 검증과 사용자 승인 전에는 공개 상태와 제출본이 바뀌지 않음
