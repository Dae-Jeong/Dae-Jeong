---
type: product-contract
title: Resume Content Contract
description: Active web resume의 구조, claim, public safety, derived-output 계약.
timestamp: 2026-08-22
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

1. Primary category: Tech Lead
2. Supporting category: Backend Engineer
3. Brand identity: Maker
4. Specialty: AI Product Systems
5. Career facts: 어느 회사에서 어떤 직함·기간·담당 범위였는지
6. Ownership: 어떤 시스템을 전담·주도·공동 기여했는지
7. Differentiator: 고객 문제를 팀과 실제 유료 제품으로 운영하고, 인계받은 초기 backend를 production 운영 단계에 맞게 재구축한 경험
8. Role: 제품 판단을 backend 경계로 바꾸고 직접 구현·배포·운영까지 닫는 Tech Lead · Backend Engineer

Canonical positioning은 [profile/identity.md](../../profile/identity.md)를, 역할 전달 방식은
[role-positioning-standard.md](role-positioning-standard.md)를, 지면의 역할은
[surface-roles.md](../site/surface-roles.md)를 따른다.

## Audience And Handoff

- First-page reader: recruiter. Full-document reader: engineering manager·founder·CTO.
- 첫 장은 career facts, category, specialty, ownership, strongest proof를 빠르게 스캔하게 한다.
- 소개 다음에는 경력을 둔다. 사실과 시간축을 보여준 뒤 대표 기술 사례로 역할 주장을 검증한다.
- Resume 전체는 portfolio를 열지 않아도 인터뷰 여부와 기술 역량을 판단할 수 있는 self-contained proof여야 한다.
- 대표 기술 사례는 문제·규모, 제약·failure mode, 실제 대안과 선택, 구현 경계, 검증·배포·운영, 결과를 claim 근거가 허용하는 만큼 연결한다.
- Portfolio는 architecture diagram, 상세 evidence, 추가 failure analysis로 검증 깊이를 확장하며 resume의 필수 전제 지면으로 사용하지 않는다.
- 프로젝트명은 주어가 아니라 career·capability claim의 근거로 둔다.
- 직무와 강점을 자기 설명으로 반복하지 않는다. 독자가 경력·성과에 반복해서 나타나는 행동과 결과만으로 맡길 수 있는 일을 판정하게 한다.

## Active Frame

| # | Section | Contract |
| --- | --- | --- |
| - | Header | 이름·category·현재/이전 주요 경력·연락처. 회사·직함·기간이 즉시 보여야 함 |
| 01 | 소개 | 공통 Maker 문장 한 문장만 둔다. 역할·기술 전문성은 헤더·경력·대표 성과가 증명하며 소개에서 다시 요약하지 않음 |
| 02 | 경력 | 최신순. 좌측 metadata column에 조직명과 기간을 세로로 쌓고, 우측에 직함·제품 성격·담당 범위를 배치. MediSolve AI row는 Thready 제품 운영·매출을 먼저 보여주고 합류 경로는 마지막에 짧게 둔다. |
| 03 | 대표 성과 | 여섯 사례를 한 섹션에서 연결: `Thready 유료 제품 운영·직접 구현 → 인계받은 backend 병렬 재구축·QA reopen 관측 → Centurion 주문·재고 비동기 복구 → Thready 제품 원장/AI 실행 분리·STG migration·Outbox → 직접 구축한 Backend Template·agent 기준 → Azure 변경 gate`. 회사 AX는 경력·기술과 AX/FDE 등 직군별 지원본에서 contribution strength를 분리해 사용한다. |
| 04 | 기술 | `Backend Core → Data/Async → AI Runtime → Product Execution/AX → Cloud/Delivery`의 5개 capability lane으로 구성. 스택보다 다룬 mechanism과 적용 맥락을 먼저 찾는 index 역할 |
| 05 | 외부 활동 | 제품·UX 외부 활동을 경력·기술·자격과 분리하고 `UX 컨설팅`과 `UX 스터디` 두 행으로 구성. 각 행은 활동명 뒤에 문제·판단·산출물을 한 문장으로 설명하며 상세 근거는 evidence 문서가 소유 |
| 06 | Credentials | 특허·수상·외부 인증·자격·학력을 배치하고 검증된 고정 사실만 사용 |

`일하는 방식`은 active frame에서 제거한다. 대표 기술 사례가 같은 행동을 반복해서 증명하므로 별도 선언은 중복이다.

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

- 헤더는 `이름 → 직무 → 경력 → 연락처`만 둔다. Maker 문장은 별도 `소개` 섹션에만 두고 헤더에는 반복하지 않는다.
- 간격은 이름–직무 6px, 직무–경력 16px, 경력–연락처 12px, 헤더 하단 24px, 다음 섹션 시작 40px(모바일 32px), 섹션 제목–본문 28px을 기준으로 한다.
- 섹션 내부는 정보 밀도에 따라 `경력 16px / 대표 기술 사례 20px / Credentials 8px`의 세로 여백을 사용한다. 대표 기술 사례는 title과 description 사이에 6px을 두고, description 내부의 문장과 bullet은 본문 흐름에 따라 배치한다.
- 이력서의 제목·설명·본문에는 `ch`나 임의의 `px` 기반 `max-width`로 줄 길이를 제한하지 않는다. 문서 컨테이너의 가용 폭을 사용하고 화면 폭에 따라 자연스럽게 줄바꿈한다.
- 경력·Credentials의 record형 행은 좌측 metadata column을 150px로 유지한다. 기술 index는 짧은 capability label을 사용하므로 128px compact column을 사용한다. 경력의 기간은 우측 trailing column을 만들지 않고 회사명 아래에 둔다.
- 기간·출처·스킬 라벨·조직 라벨 같은 supporting metadata만 12–13px IBM Plex Mono를 사용한다. 12px 아래로 내리지 않는다.
- 구조 제목은 600, claim과 inline emphasis·metric은 500, 본문은 400을 사용한다. 본문 한 문단의 inline emphasis는 1–2개를 상한으로 한다.
- 회사별 이력서는 문안·섹션 선택만 바꾼다. 헤더 순서, semantic role, 16px 본문 하한은 바꾸지 않는다.
- 모바일에서는 크기를 축소하지 않고 자연스러운 줄바꿈을 허용한다. A4에서는 글자 크기 대신 블록 내부 여백으로 분량을 조정한다.

## Web Layout Contract

공통 `/resume`와 회사별 `/resume/{company}`는 [Resume Floating Navigator](../../docs/superpowers/specs/2026-08-16-resume-floating-navigator-design.md)의 shared layout을 사용한다.

- 이력서 document는 navigator와 독립적으로 화면에서 최대 A4 폭(`210mm`)을 사용한다. 인쇄는 `@page` A4 규칙을 따른다.
- `xl` 이상에서만 56px floating rail을 document 바깥 viewport gutter에 표시한다.
- `xl` 미만에서는 rail을 제거하고, 실제로 사용할 수 있는 PDF·언어 action만 document 앞에 static row로 표시한다.
- 모바일은 별도 조판의 우선 대상이 아니라 잘림·겹침·가로 스크롤이 없는 안전한 fallback으로 유지한다.
- 준비되지 않은 PDF·언어 control, Contents 제목, DRAFT 설명을 위한 고정 sidebar 공간을 만들지 않는다.
- 공통·회사별 화면이 별도의 sidebar markup과 breakpoint를 소유하지 않는다.

## Claim Contract

- 수치, 강한 역할 표현, 대표 성과는 stable claim ID에 연결한다.
- `전담`, `주도`, `공동`, `참여`는 [evidence policy](../../rules/evidence-policy.md)와 registry의 `allowed_copy`·`forbidden_copy`를 따른다.
- 직접 application code를 작성하지 않은 설계·운영 기여도 이력이다. 다만 실행 가능한 contract·state·gate·운영 artifact와 실제 사용 근거가 있어야 하며, `설계 참여`·`적용/운영 리드`·`직접 구축`을 한 동사로 합치지 않는다.
- 공개 시 [public safety](../../rules/public-safety.md)를 적용한다.
- active artifact의 claim ID는 [claim-map.yaml](claim-map.yaml)과 JSX `data-claim`에서 일치해야 한다.
- `data-claim`은 섹션 전체가 아니라 근거가 적용되는 가장 좁은 의미 단위(문단·경력 행·역량 축·credential 행)에 둔다.
- 사람용 출처 라벨(`[AI 콘텐츠 생성 제품]` 등)은 stable claim ID를 대체하지 않는다.

## Selection Contract

- JD 맞춤은 섹션을 새로 발명하는 작업이 아니라 검증된 claim의 선택과 순서 조정이다.
- JD가 이력서 작성 기준을 직접 제시하면 해당 지원본의 평가 축과 상세도 기준으로 사용한다. 한 공고의 요구를 범용 writing rule이나 새 사실로 승격하지 않는다.
- 시기별 서술 분량은 [recency weighting](../../rules/recency-weighting.md)을 따른다.
- 세부 정보가 기술 역량 판정에 필요하면 resume에 남긴다. 부가 diagram·원문 evidence·긴 failure analysis만 연결된 portfolio case로 보낸다.

## Acceptance Gates

1. Career-first: 회사·직함·기간·담당 범위가 claim보다 먼저 읽힌다.
2. Evidence: 모든 수치·강한 역할·대표 성과가 stable claim ID에 연결된다.
3. Strength: `allowed_copy`보다 강한 역할 표현이 없다.
4. Public: provider·고객사·팀원·private path·미검증 수치가 없다.
5. Surface split: 이력서는 경력과 대표 기술 사례의 self-contained proof를, portfolio는 diagram·상세 evidence·긴 failure analysis를 소유한다.
6. Derived output: PDF page 수는 acceptance gate가 아니다. 첫 장에서 핵심 category·경력·최강 근거가 보이는지, 이후 각 페이지가 검증 가능한 technical signal을 추가하는지, 100% scale에서 잘림·겹침이 없는지 검증한다.
7. Role reconstruction: 60초 안에 `backend 설계·운영을 닫는다`와 `제품 판단을 backend contract로 바꾼다`는 두 패턴을 경력과 사례에서 찾을 수 있다.
8. Case depth: 대표 성과는 [role positioning standard](role-positioning-standard.md)의 판단 범위와 backend mechanism을 포함하고, 해당 6문답 중 5개 이상을 충족한다.
9. Engineering-system depth: 회사 AX·제품 운영과 Backend Template은 source of truth, human·agent decision right, execution state, approval/release gate, 운영 결과와 정확한 contribution verb로 증명한다. 회사 AX 구조는 `설계 참여`, 제품별 적용·운영은 `리드`, Backend Template은 `직접 구축`의 상한을 넘지 않으며, 공통 대표 성과에 넣지 않더라도 경력·기술·직군별 지원본에서 같은 경계를 유지한다.
