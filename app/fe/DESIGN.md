# Design

`marinkim.xyz`와 지원 문서 화면의 제품 방향과 시각 판단 기준을 소유한다. 정확한 token 값과
현재 렌더링은 `app/fe/app/globals.css`와 각 component가 소유하며, 이 문서는 그 값을 어디에
왜 사용하는지 정의한다.

## Product

- 사용자: 공개 화면은 채용 담당자·hiring manager·협업자, 로컬 작업 화면은 김대정 본인.
- 목적: 검증된 엔지니어링 근거를 공개적으로 쉽게 확인하게 하고, 같은 근거로 역할 선택과
  맞춤 지원 준비를 실무 흐름으로 만든다.
- 포지셔닝: 근거 우선의 엔지니어링 프로필. 범위와 공백을 솔직하게, 만든 시스템은 구체적으로
  보여 주며 과시보다 신중한 기술 평가에 맞춘다.
- 전환: 공개 화면은 이력서·포트폴리오 근거·직접 연락으로, 작업 화면은 공고 확인·문서 맞춤·
  제출 같은 구체적인 다음 행동으로 이어진다. 근거는 stable claim ID와 검증된 프로젝트 evidence다.
- 피할 것: 장식 지표와 교체 가능한 카드뿐인 SaaS 대시보드, 근거를 가리는 화려한 포트폴리오
  연출, 검증할 수 없는 경력 과장, 공개·비공개 정보 경계를 흐리는 화면.
- 원칙: 설득보다 근거, 장식보다 판단과 다음 행동. 운영 화면은 카드 그리드보다 compact한
  master-detail을 쓰고 출처·검증일·불확실성을 드러낸다.
- 접근성: WCAG AA 대비, 보이는 keyboard focus, 색만으로 상태를 전달하지 않기, reduced motion
  지원, mobile부터 wide desktop까지 작업 화면 사용 가능.

## Direction

- 인상: 절제됨, 기술적임, 직접적임, 차분한 자신감
- 우선순위: 근거와 내용의 탐색성 > 장식과 시각적 과시
- 색상 비율: 흰색·중립색 약 95%, 구조를 설명하는 보조색 약 4%, 핵심 판정 accent 약 1%
- 기본 서체: 한국어 본문은 Pretendard 계열. Mono는 날짜·상태·코드·짧은 metadata에만 사용
- 카드보다 여백·선·배경 전환·타이포그래피로 문서 구조를 구분

## Surface Roles

| Surface | Reader goal | Visual behavior |
| --- | --- | --- |
| Homepage | 정체성과 대표 작업 파악 | 짧은 메시지와 명확한 다음 경로 |
| Resume | 30초 안에 인터뷰 이유 판단 | 핵심 성과와 경력을 빠르게 스캔 |
| Career Description | 문제와 기술 판단 추적 | 문제·선택·구현·검증·결과를 같은 그리드에서 비교 |
| CV | 전체 기록 대조 | chronology와 credential을 조밀하게 정렬 |
| Portfolio | 주장과 근거 검토 | 사례 경계와 diagram을 명확하게 연결 |
| Application workspace | 지원 작업 진행 | 장식보다 상태와 다음 행동을 우선 |

## Typography Contract

정확한 크기는 `globals.css`의 type token이 owner다. 문서 화면에서는 다음 역할 mapping을
사용한다.

| Role | Token / size | Usage |
| --- | --- | --- |
| Document title | `text-3xl` 또는 responsive 32–42px | 문서당 하나의 `h1` |
| Section title | `text-xl` · 22px · semibold | 경력 요약, 프로젝트별 수행 같은 대분류 |
| Organization | `text-lg` · 18px · semibold | 회사 또는 조직명 |
| Project title | 17px · semibold | 회사 안의 개별 프로젝트 |
| Summary body | `text-base` · 16px | 소개와 경력 요약 |
| Detail body | 15px | 문제·선택·구현·검증·결과 |
| Label | `text-sm` · 13px | 담당 범위, 문제, 선택 등의 탐색 label |
| Metadata | `text-xs` · 12px | 기간, updated, 상태, 보조 설명 |

- 제목만 크게 두고 근거가 viewport 밖으로 밀려나지 않게 한다.
- 본문 line length는 최대 65–75ch를 기준으로 한다.
- 한국어 문장은 고정 `<br>`나 임의의 `ch`·`px` 폭으로 끊지 않는다.
- heading은 `text-wrap: balance`, 긴 본문은 `text-wrap: pretty`를 우선한다.
- display tracking은 `-0.04em`보다 좁게 잡지 않는다.

## Divider Contract

모든 선은 1px이며, 선의 색과 위치가 정보 계층을 설명해야 한다.

| Divider | Meaning | Rule |
| --- | --- | --- |
| Compound | 문서 header 종료 | 2px 검정선 아래 4px 간격을 두고 1px 연한 회색선 사용 |
| Section | 새로운 대분류 시작 | section heading 아래 2px 검정 단선 사용 |
| Company | 새로운 회사·조직 시작 | 첫 회사에는 생략하고 이후 회사 위에 1px 검정 단선 사용 |
| Project / Result | 프로젝트·결론 경계 | 1px 중간 회색 단선 사용 |
| Row / Metadata | 행·metadata 보조 구분 | chronology와 compact record에 1px 연한 회색선 사용 |

- 두 줄 조합은 document header 종료에만 사용한다.
- section divider와 첫 회사 divider를 연속으로 배치하지 않는다.
- `결과`는 다른 label과 같은 grid를 사용하고, 연한 상단선과 문장 굵기로만 강조한다.
- 선만 늘려 section을 구분하지 않는다. 여백과 heading hierarchy를 먼저 사용한다.
- 의미가 다른 두 경계가 같은 강도의 검정선으로 경쟁하지 않게 한다.

## Lists And Bullets

- 상세 목록은 내용 열 안쪽에 `0.2rem` 크기의 muted dot을 사용한다.
- bullet을 negative offset으로 label/content 사이 gutter에 돌출시키지 않는다.
- 한 bullet에는 하나의 판단 또는 구현 사실만 둔다.
- 두세 문장짜리 설명이 필요하면 bullet을 늘리기보다 일반 본문으로 전환한다.
- 결과와 경계 문구에는 bullet을 사용하지 않는다.

## Layout

- Resume·Career Description·CV의 기준 canvas는 A4 `210mm`다.
- Career Description desktop label column은 104px, company metadata column은 200px를
  기준으로 하되 mobile에서는 한 열로 자연스럽게 쌓는다.
- Portfolio는 diagram을 위해 최대 1180px까지 허용하지만 hero·case header·본문의
  시작선은 맞춘다.
- 장식 목적의 nested card와 반복 panel을 사용하지 않는다.
- 가로 폭과 line wrapping은 grid가 결정하며, 특정 screenshot을 맞추기 위한 강제 개행은
  금지한다.

## Color And Emphasis

- Resume·Career Description·CV는 monochrome을 기본으로 한다.
- Portfolio 색상은 구조와 상태를 설명할 때만 사용한다.
- blue는 구조·선택, green은 검증된 결과, amber는 위험·제약을 나타낼 때만 쓴다.
- 색상만으로 상태를 전달하지 않고 label·문장·형태를 함께 제공한다.
- 본문 대비는 WCAG AA 4.5:1 이상을 유지한다.

## Responsive And Print

- desktop 기준 viewport는 1440×900과 1920×1080이다.
- mobile은 390×844에서 순서·위계·기능 보존과 가로 overflow 부재를 확인한다.
- floating control은 mobile 본문을 가리지 않아야 한다.
- A4에서는 제목과 첫 본문, 프로젝트의 문제·선택·검증·결과가 불필요하게 갈라지지 않게
  한다.
- print 결과에는 local review control과 navigation을 포함하지 않는다.

## Visual QA

UI 변경은 코드와 CSS 수치만 보고 완료하지 않는다.

1. Orca에서 우선 PC viewport를 실제 렌더링한다.
2. occupied width, visual center, 제목 wrapping, section boundary, information density를
   직접 확인한다.
3. 390px mobile에서 overflow와 fixed control 겹침을 확인한다.
4. PDF 산출물이 있으면 A4로 다시 생성하고 PNG로 렌더링해 page break와 clipping을
   확인한다.
5. lint, production build, workspace validator, scoped diff check를 통과한다.

## Implementation Owners

- Global color·type·motion token: `app/globals.css`
- Resume expression: `app/resume/`
- Career Description·CV: `app/documents/`
- Portfolio expression: `app/portfolio/`
- Shared site shell: `components/site/`
- Content facts and claim strength: `wiki/profile/`, `wiki/evidence/`
