---
type: product-contract
title: Resume Content Contract
description: Active web resume의 구조, claim, public safety, derived-output 계약.
timestamp: 2026-08-13
tags: [resume, contract, content]
---

# Resume Content Contract

## Ownership

- 사실·연차·경력 원장: `profile/`
- 주장·강도·공개 범위: `evidence/claims/`
- 이력서 구조·선별·claim mapping: `products/resume/`
- KO 웹 이력서의 문장·순서·강조: `app/fe/app/resume/resume-view.tsx`
- EN·PDF·JD 맞춤본: active KO expression과 claim registry에서 만드는 파생 산출물

## Outcome

헤더와 경력만 읽어도 다음을 판단할 수 있어야 한다.

1. Primary category: Backend Engineer
2. Specialty: AI Product Systems
3. Career facts: 어느 회사에서 어떤 직함·기간·담당 범위였는지
4. Ownership: 어떤 시스템을 전담·주도·공동 기여했는지
5. Differentiator: agent-readable workflow로 실행과 운영을 구조화한 방식

Canonical positioning은 [profile/identity.md](../../profile/identity.md)를, 지면의 역할은 [surface-roles.md](../site/surface-roles.md)를 따른다.

## Audience And Handoff

- Primary reader: recruiter. Secondary reader: engineering manager.
- Resume는 인터뷰 여부를 판단할 수 있는 career facts, category, specialty, ownership, selected proof를 전달한다.
- 문제 배경, 제약, 대안, trade-off, failure mode의 깊은 설명은 portfolio case로 보낸다.
- 프로젝트명은 주어가 아니라 career·capability claim의 근거로 둔다.
- 직무와 강점을 자기 설명으로 반복하지 않는다. 독자가 경력·성과에 반복해서 나타나는 행동과 결과만으로 맡길 수 있는 일을 판정하게 한다.

## Active Frame

| # | Section | Contract |
| --- | --- | --- |
| - | Header | 이름·category·현재/이전 주요 경력·연락처. 회사·직함·기간이 즉시 보여야 함 |
| 01 | 소개 | 이 사람을 어떤 관점으로 읽어야 하는지 category·specialty·경력 궤적으로 프레이밍. 뒤 섹션을 반복 요약하지 않음 |
| 02 | 핵심 성과 | 성과·소유 범위가 주어이고 여러 프로젝트는 이를 증명하는 근거 라벨 |
| 03 | 경력 | 최신순. 좌측 metadata column에 조직명과 기간을 세로로 쌓고, 우측에 직함·프로젝트·담당 범위를 배치. 앞선 성과의 시간축과 역할을 검증 |
| 04 | 일하는 방식 | 선택 섹션. 경력·성과에서 같은 행동이 이미 증명되면 삭제하고 이후 번호를 당김 |
| 05 | 기술 | 스택 나열이 아니라 실제 사용 맥락과 같이 표기 |
| 06 | Credentials | 학력·수상·특허·자격·인증의 검증된 고정 사실만 사용 |

## Typography Contract

Daejeong Design의 Profile 프로젝트와 `app/design/resume-page-prototype.html`이 시각 판단의 근거다. 런타임 semantic class의 단일 owner는 `app/fe/app/resume/resume-typography.ts`이며, 마스터와 회사별 이력서가 함께 소비한다.

| Role | Size | Weight | Font | Use |
| --- | --- | --- | --- | --- |
| Identity | 40px | 600 | IBM Plex Mono | 이름 |
| Section | 28px | 600 | IBM Plex Mono | 문서 섹션 제목 |
| Achievement | 22px | 600 | Pretendard | 핵심 성과 제목 |
| Description | 16px | 400 / 500 | Pretendard | 성과 제목 아래의 연속된 설명 |
| Description bullet | 14px | 400 | Pretendard | 설명 안에서 스캔이 필요한 사실·수치 |
| Body / Item | 16px | 400 / 600 | Pretendard | 본문 / 행 제목 |

- 헤더는 `이름 → 직무 → 경력 → 연락처`만 둔다. 개인 브랜드 문장과 서사는 홈페이지·포트폴리오가 소유하며 이력서 헤더에는 반복하지 않는다.
- 간격은 이름–직무 6px, 직무–경력 16px, 경력–연락처 12px, 헤더 하단 24px, 다음 섹션 시작 40px(모바일 32px), 섹션 제목–본문 28px을 기준으로 한다.
- 섹션 내부는 정보 밀도에 따라 `경력 16px / 핵심 성과 20px / 일하는 방식 16px / Credentials 8px`의 세로 여백을 사용한다. 핵심 성과는 title과 description 사이에 6px을 두고, description 내부의 문장과 bullet은 본문 흐름에 따라 배치한다.
- 직무·경력 metadata에는 임의의 좁은 `max-width`를 두지 않는다. 데스크톱 공간을 우선 사용하고 모바일에서만 자연스럽게 줄바꿈한다. 장문 본문과 성과 설명의 `70ch` 상한은 가독성을 위해 유지한다.
- 경력·기술·Credentials의 record형 행은 좌측 metadata column을 150px로 통일한다. 경력의 기간은 우측 trailing column을 만들지 않고 회사명 아래에 둔다.
- 기간·출처·스킬 라벨·조직 라벨 같은 supporting metadata만 12–13px IBM Plex Mono를 사용한다. 12px 아래로 내리지 않는다.
- 구조 제목은 600, claim과 inline emphasis·metric은 500, 본문은 400을 사용한다. 본문 한 문단의 inline emphasis는 1–2개를 상한으로 한다.
- 회사별 이력서는 문안·섹션 선택만 바꾼다. 헤더 순서, semantic role, 16px 본문 하한은 바꾸지 않는다.
- 모바일에서는 크기를 축소하지 않고 자연스러운 줄바꿈을 허용한다. A4에서는 글자 크기 대신 블록 내부 여백으로 분량을 조정한다.

## Web Layout Contract

공통 `/resume`와 회사별 `/resume/{company}`는 [Resume Floating Navigator](../../docs/superpowers/specs/2026-08-16-resume-floating-navigator-design.md)의 shared layout을 사용한다.

- 이력서 document는 navigator와 독립적으로 최대 920px을 사용한다.
- `xl` 이상에서만 56px floating rail을 document 바깥 viewport gutter에 표시한다.
- `xl` 미만에서는 rail을 제거하고, 실제로 사용할 수 있는 PDF·언어 action만 document 앞에 static row로 표시한다.
- 준비되지 않은 PDF·언어 control, Contents 제목, DRAFT 설명을 위한 고정 sidebar 공간을 만들지 않는다.
- 공통·회사별 화면이 별도의 sidebar markup과 breakpoint를 소유하지 않는다.

## Claim Contract

- 수치, 강한 역할 표현, 대표 성과는 stable claim ID에 연결한다.
- `전담`, `주도`, `공동`, `참여`는 [evidence policy](../../rules/evidence-policy.md)와 registry의 `allowed_copy`·`forbidden_copy`를 따른다.
- 공개 시 [public safety](../../rules/public-safety.md)를 적용한다.
- active artifact의 claim ID는 [claim-map.yaml](claim-map.yaml)과 JSX `data-claim`에서 일치해야 한다.
- `data-claim`은 섹션 전체가 아니라 근거가 적용되는 가장 좁은 의미 단위(문단·경력 행·역량 축·credential 행)에 둔다.
- 사람용 출처 라벨(`[AI 콘텐츠 생성 제품]` 등)은 stable claim ID를 대체하지 않는다.

## Selection Contract

- JD 맞춤은 섹션을 새로 발명하는 작업이 아니라 검증된 claim의 선택과 순서 조정이다.
- JD가 이력서 작성 기준을 직접 제시하면 해당 지원본의 평가 축과 상세도 기준으로 사용한다. 한 공고의 요구를 범용 writing rule이나 새 사실로 승격하지 않는다.
- 시기별 서술 분량은 [recency weighting](../../rules/recency-weighting.md)을 따른다.
- 더 자세히 설명하고 싶은 문장이 생기면 이력서가 아니라 연결된 portfolio case를 보강한다.

## Acceptance Gates

1. Career-first: 회사·직함·기간·담당 범위가 claim보다 먼저 읽힌다.
2. Evidence: 모든 수치·강한 역할·대표 성과가 stable claim ID에 연결된다.
3. Strength: `allowed_copy`보다 강한 역할 표현이 없다.
4. Public: provider·고객사·팀원·private path·미검증 수치가 없다.
5. Surface split: 이력서는 경력 판단을, portfolio는 깊은 증명을 소유한다.
6. Derived output: PDF를 만들 때만 A4 2장, 100% scale, 잘림·겹침 없음을 별도로 검증한다.
