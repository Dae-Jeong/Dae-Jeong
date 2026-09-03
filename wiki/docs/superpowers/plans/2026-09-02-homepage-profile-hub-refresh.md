---
type: implementation-plan
title: Homepage Profile Hub Refresh
description: 공통 이력서·포트폴리오·경력기술서·CV를 연결하는 실제 홈페이지 IA와 전역 탐색을 새 Profile Hub 시안 기준으로 개편한다.
status: in-progress
timestamp: 2026-09-02
tags: [homepage, profile-hub, navigation, design, frontend]
---

# Homepage Profile Hub Refresh

## Progress

- `HOME-01`–`HOME-04`: local implementation complete (2026-09-02).
- Local `/`, `/resume`, `/portfolio`, `/career`, `/cv`, `/design`: HTTP 200 확인.
- Production build에서는 review 상태인 Career·CV navigation을 제외하고 기존 noindex를 유지한다.
- Lint·production build·workspace validator·scoped diff check: pass.
- `HOME-05`: 브라우저 연결이 없어 실제 screenshot 검증 대기.
- `HOME-06`: Career·CV 공개 승인과 commit·deploy 대기.

## Goal

홈 첫 화면에서 김대정의 Maker 정체성과 채용 역할을 분명히 보여주고, 방문자가 설명을
읽지 않아도 이력서·포트폴리오·경력기술서·CV 중 원하는 문서로 바로 이동하게 한다.
홈은 각 문서를 다시 설명하는 곳이 아니라, 15초 안에 더 볼 근거와 다음 경로를 고르는
Profile Hub로 유지한다.

표현 SoT는 `app/fe/app/page.tsx`, 사실·강도는 `wiki/profile/`과 `wiki/evidence/`가 소유한다.
Open Design 시안은 레이아웃 참고이며 canonical content가 아니다.

## Locked Decisions

- Hero의 canonical 문장은 `가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.`다.
- 검색·채용 역할은 `Tech Lead · Backend Engineer`, 전문 영역은 `AI Product Systems`다.
- 상단 메뉴와 문서 허브는 실제 `/resume`, `/portfolio`, `/career`, `/cv` route로 이동한다.
- 문서 허브에는 `Open when`, 사용 시점, 문서 목적 설명을 넣지 않는다.
- 문서 항목은 번호·영문명·한국어명·화살표만 사용하고 행 전체를 클릭 가능하게 한다.
- 기존의 검증된 대표 사례는 유지하되, Summary와 문서 안내에서 반복하던 설명은 줄인다.
- Chat은 문서 종류가 아니므로 문서 허브에서 제외하고 기존 Ask 진입점으로 유지한다.
- `/career`와 `/cv`의 `LOCAL REVIEW/noindex` 해제는 구현과 분리된 사용자 승인 게이트다.

## Target IA

```text
Global navigation
  Home · Resume · Portfolio · Career · CV
  Blog · Labs (secondary)

Home
  1. Hero — identity, role, one evidence line
  2. Documents — four compact navigation rows
  3. Selected Proof — verified representative cases
  4. Contact / Footer
```

현재 `Summary → Selected Proof → Explore` 구조는 아래처럼 정리한다.

- Summary의 역할·성과 반복은 Hero evidence와 Selected Proof로 흡수한다.
- Explore 카드 세 개는 Documents 행 네 개로 교체한다.
- Selected Proof는 새 claim을 만들지 않고 기존 `HOME_CASES`와 public-safe 문구를 소비한다.

## Task Map

| ID | Task | Depends on | 완료 산출물 |
| --- | --- | --- | --- |
| `HOME-01` | homepage contract와 route visibility 정합화 | 없음 | navigation order·문서 공개 게이트 확정 |
| `HOME-02` | desktop/mobile/footer navigation 개편 | `HOME-01` | 실제 route로 이동하는 일관된 navigation |
| `HOME-03` | Hero와 Documents gateway 구현 | `HOME-01` | 설명 없는 compact 4-document gateway |
| `HOME-04` | Summary·Explore 중복 제거와 Selected Proof 재배치 | `HOME-03` | 15초 scan이 가능한 homepage body |
| `HOME-05` | desktop 우선 visual·interaction 검증 | `HOME-02`–`HOME-04` | screenshot과 route·keyboard QA 결과 |
| `HOME-06` | release readiness와 공개 승인 확인 | `HOME-05` | lint/build/workspace 검증, publish decision |

## HOME-01 — Contract And Visibility

### Changes

- homepage navigation contract에 Career Description과 CV를 추가한다.
- public navigation과 route 존재를 구분한다.
- local에서는 네 문서를 모두 연결하되, production에서 `/career`와 `/cv`를 노출하기 전
  사용자에게 본문과 `noindex` 해제 여부를 확인한다.
- 문서 이름은 화면과 route에서 아래처럼 고정한다.

| Label | Korean label | Route |
| --- | --- | --- |
| Resume | 이력서 | `/resume` |
| Portfolio | 포트폴리오 | `/portfolio` |
| Career Description | 경력기술서 | `/career` |
| CV | CV | `/cv` |

### Files

- `wiki/products/homepage/public-content.md`
- `wiki/products/site/surface-roles.md`
- Read only: `wiki/profile/identity.md`, `wiki/evidence/claims/*.yaml`

## HOME-02 — Navigation

### Changes

- desktop navigation에 Home·Resume·Portfolio·Career·CV를 배치한다.
- Blog·Labs는 secondary link로 유지하고 핵심 문서와 같은 위계로 강조하지 않는다.
- mobile navigation은 같은 route와 순서를 사용한다. Footer 동기화는 Career·CV 공개 승인
  이후로 미룬다.
- homepage의 CTA와 문서 허브 화살표가 같은 route contract를 공유하게 한다.
- 현재 페이지가 아닌 링크에 active underline이나 `aria-current`를 주지 않는다.

### Files

- `app/fe/components/site/topbar.tsx`
- `app/fe/components/site/mobile-nav.tsx`

### Acceptance

- 모든 visible navigation link가 실제 페이지로 이동한다.
- keyboard focus와 mobile menu의 focus return·ESC close가 유지된다.
- 1280px 이상 desktop에서 메뉴가 눌리거나 두 줄로 깨지지 않는다.

## HOME-03 — Hero And Document Gateway

### Changes

- 기존 canonical Hero 문장과 역할 hierarchy를 유지한다.
- 역할·근거·CTA가 서로 같은 내용을 세 번 반복하지 않도록 한 줄씩만 둔다.
- Documents는 카드 설명이 아닌 compact row navigation으로 만든다.
- 행은 번호·영문 문서명·한국어명·arrow만 포함한다.
- 행 전체를 클릭할 수 있게 하고 hover·focus는 색상보다 선·배경 변화로 조용하게 표현한다.
- 고정 `<br>`로 문장 줄을 강제하지 않고 가용 폭에 따라 자연스럽게 wrap한다.

### Files

- `app/fe/app/page.tsx`
- 필요할 때만 `app/fe/app/home-document-nav.tsx` 추가

### Acceptance

- `Open when`, 문서 목적 설명, `무엇을 정리했습니다` 같은 자기 설명 문구가 없다.
- Documents 네 행이 1440px desktop 한 화면에서 과도한 세로 공간을 차지하지 않는다.
- Resume·Portfolio·Career Description·CV의 시각적 위계가 동일하다.

## HOME-04 — Selected Proof And Page Compression

### Changes

- 현재 Summary 중 아래 섹션을 반복하는 문장을 제거한다.
- Hero 다음에 Documents를 두고, 그 다음에 Selected Proof를 배치한다.
- Selected Proof는 기존 case name·role·scope·route와 verified claim만 사용한다.
- 새 수치·ownership·제품 성과를 만들지 않는다.
- AskLauncher와 GitHub 링크는 유지하되 첫 화면의 핵심 문서 탐색을 방해하지 않게 한다.

### Files

- `app/fe/app/page.tsx`
- Read only: `app/fe/lib/cases.ts`, `wiki/products/homepage/public-content.md`

## HOME-05 — Visual And Interaction Verification

### Desktop first

- 1440×900과 1920×1080에서 실제 렌더 screenshot을 확인한다.
- navigation 폭, Hero 행 길이, Documents row 높이, Selected Proof 시작점을 비교한다.
- 제목·설명에 고아 줄, 억지 줄바꿈, 오른쪽 clipping이 없는지 본다.
- 문서 row 전체 click, hover, keyboard focus를 확인한다.

### Responsive

- 390px mobile에서 navigation overlay와 네 문서 링크를 확인한다.
- Career Description처럼 긴 label이 잘리거나 arrow를 밀어내지 않는지 확인한다.
- reduced motion과 visible focus를 유지한다.

### Automated

```bash
pnpm --dir app/fe lint
pnpm --dir app/fe build
uv run --project tools python tools/validate_workspace.py
git diff --check
```

## HOME-06 — Release Gate

- `/career`와 `/cv`가 공개 품질인지 사용자 확인을 받는다.
- 승인 전에는 `LOCAL REVIEW/noindex` 상태와 production navigation 노출을 함께 끝내지 않는다.
- 승인 시 metadata·tag·navigation visibility를 같은 revision에서 전환한다.
- 사용자 요청 없이 commit·push·production deploy를 하지 않는다.

## File Boundary

### Expected modifications

- `wiki/products/homepage/public-content.md`
- `wiki/products/site/surface-roles.md`
- `app/fe/app/page.tsx`
- `app/fe/components/site/topbar.tsx`
- `app/fe/components/site/mobile-nav.tsx`

### Conditional modifications

- `app/fe/app/career/page.tsx`
- `app/fe/app/cv/page.tsx`
- `app/fe/components/site/site-footer.tsx`
- `app/fe/app/sitemap.ts`

네 conditional file은 공개 승인 시 navigation·metadata·sitemap을 함께 전환할 때만 수정한다.

## Non-goals

- Resume·Portfolio·Career Description·CV 본문 재작성
- 공용 문서 renderer·A4·PDF 디자인 개편
- 새로운 claim·수치·ownership 추가
- Blog·Labs·Chat 기능 개발
- 전역 color token이나 typography system 교체
- 기존 회사별 tailored route 수정
- 사용자 승인 없는 commit·push·production deploy

## Completion Criteria

- 첫 화면에서 Maker 정체성, 채용 역할, 다음 문서 경로가 분명하다.
- 상단·모바일·footer·문서 gateway가 같은 route contract를 사용한다.
- Documents 영역에는 독자가 이미 아는 용도를 다시 설명하는 문장이 없다.
- 홈은 이력서나 포트폴리오 내용을 복제하지 않고 대표 근거만 보여준다.
- desktop screenshot에서 폭·정렬·줄바꿈이 안정적이며 mobile에서도 기능이 보존된다.
- visible route는 404가 아니고 draft/public 상태가 서로 모순되지 않는다.
- lint, build, workspace validator, `git diff --check`가 통과한다.
- 기존 사용자 변경과 회사별 지원 문서는 보존된다.
