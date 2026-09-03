---
type: policy
title: Application Copy Standard
description: 공통·직군별·회사별 지원 문서(이력서·경력기술서·포트폴리오·플랫폼 프로필)에서 고정하는 것, 포장이 허용되는 범위, 제출 전 게이트를 한 곳에서 정한다.
timestamp: 2026-09-02
tags: [policy, resume, tailored, packaging, gate]
---

# Application Copy Standard

**이 문서는 두 가지를 막는다.** 포지셔닝이 지원본마다 흔들리는 것, 그리고 대화에서 내린 결정이 문안까지 도달하지 못하는 것.

2026-07-01~09-02 Codex 세션 304개를 검토한 결과, 정체성은 두 달간 다섯 번 바뀌었고
("Director" → Backend primary → Maker → "Tech Lead 빼자" → Maker 문장 확정),
`AI스러운 문구`·`한 줄 max 제한 금지`·`경계 문구는 구두로` 같은 결정은 각각 여러 번 반복 지시됐다.
규칙이 없어서가 아니라 규칙이 여러 문서에 흩어져 있고 문안 생성 시점에 대조되지 않았기 때문이다.

문장을 어떻게 쓰는가는 [persuasive-writing](persuasive-writing.md)이, 사실·강도는
[evidence-policy](evidence-policy.md)가, 공개 범위는 [public-safety](public-safety.md)가 계속 소유한다.
이 문서는 그 위에서 **무엇을 고정하고, 무엇을 회사별로 바꾸고, 제출 전에 무엇을 대조하는가**만 소유한다.

---

## 1. 고정 — 회사별 작업에서 건드리지 않는 것

아래 네 가지를 바꾸려면 공통 이력서에서 먼저 바꾸고, 분기에 한 번만 검토한다.
회사별 지원본을 만드는 도중에 이 층을 고치지 않는다.

### 1-1. 정체성 층

| 층 | 값 | 어디에 쓰는가 |
| --- | --- | --- |
| 브랜드 문장 | `가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.` | 홈 hero, 공통 이력서·포트폴리오 소개 |
| **회사별 소개 첫 줄** | `가능성을 제품으로 만들고, 끝까지 책임지는 Product Engineer 김대정입니다.` + `기획자로 시작해 백엔드로 왔고, 지금은 고객이 구독하는 AI 제품을 만들고 운영합니다.` | 회사별 포트폴리오 hero **헤드라인(메인)** · 이력서 소개 첫 블록 (2026-09-03). 기존 헤드라인은 hero 위 보조 줄로 내린다. 브랜드 문장은 바꾸지 않는다 |
| 채용 역할 (공통) | `Tech Lead · Backend Engineer` | 공통 이력서 헤더 |
| 채용 역할 (회사별) | **공고의 직무명을 그대로** + 병행 역할 | 회사별 헤더. 예: `Backend Engineer · Tech Lead 역할 병행`, `Software Engineer / AI · Backend Engineer` |
| 전문 영역 | `AI Product Systems` | 공통·회사별 동일 |

- 회사별 헤더의 직함은 그 공고가 필요로 하는 직군 명칭에 맞춘다 (2026-09-02 user-confirmed). `Tech Lead`를 앞에 두는 것은 리드 포지션 공고뿐이다. 2~5년 백엔드 공고에서 Tech Lead가 앞에 오면 28개월 backend 경력과 대조돼 부풀리기로 읽힌다.
- 브랜드 문장은 회사별 지원본 소개의 **첫 줄에 두지 않는다.** 회사별 첫 줄은 확장형 한 문장(Product Engineer)이고, 그 뒤에 1-2의 15초 문장이 온다. 브랜드 문장은 공통에 남긴다. owner: [identity.md 확장형 한 문장](../profile/identity.md#확장형-한-문장-2026-09-03-신설-user-confirmed).
- 정체성의 canonical owner는 [profile/identity.md](../profile/identity.md), 역할 전달 방식은 [role-positioning-standard](../products/resume/role-positioning-standard.md)다. 이 표는 회사별 적용 규칙만 더한다.

### 1-2. 15초 문장 — 세 사실

어느 지원본이든 소개에 아래 세 사실이 **순서만 바뀌어** 들어간다. 하나라도 빠지면 게이트 2 위반이다.

1. **기획자 출신 백엔드 엔지니어** — PM을 실제로 1년 했고, 그 경험이 backend 판단에 쓰인다. 확장형 한 문장 뒤에서는 `기획자로 시작해 백엔드로 왔고, 지금은 고객이 구독하는 AI 제품을 만들고 운영합니다.` 한 문장으로 잇는다.
2. **아이디어를 제안해 실제 결제 고객이 있는 AI 제품으로 만들고 직접 구현·운영** — backend·AI·핵심 frontend 직접 구현.
3. **AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀에서, 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있는 조직 표준과 agent 작업 기준을 직접 구축** — Template 효과까지. 2026-09-03 user-confirmed: `백엔드 2~3명이 다수 제품을 맡는` 인원 부족 서사는 쓰지 않는다. 표준의 이유는 인원 수가 아니라 모두가 메이커가 된 팀 구조다.

세 사실의 문안 원형은 [resume-block-library](../products/resume/resume-block-library.md)의 `intro.*` 블록이 소유한다.

### 1-5. 기술 주장의 축 (2026-09-03)

기술적으로 어필하는 축은 **성능·보장·신뢰·멱등·정합·설계** 여섯 개다. owner는 [profile/engineering-keywords.md](../profile/engineering-keywords.md). 기전을 설명하면서 단어를 빼면 리뷰어가 놓치므로, 대표 성과 제목 4개 안에 최소 4개 축의 단어가 드러나야 한다. 새 사례는 어느 축인지 먼저 정한 뒤 표면에 뿌린다.

### 1-3. 대표 성과 풀

회사별로는 이 풀에서 3~5개를 고르고 순서만 바꾼다. **회사별 작업 중에 새 성과를 만들지 않는다.**
새 성과가 필요하면 evidence → claim → block library 순서로 먼저 올린다.

| ID | 성과 | 결과 문장의 핵심 |
| --- | --- | --- |
| A | Thready 제품화·유료 운영 | 결제 고객이 있는 제품, backend·AI·핵심 frontend 직접 구현 |
| B | 인계 backend 병렬 재구축 | 대안 비교 → 검증 하네스 → cutover, reopen 37%→11% |
| C | BAY 비동기 실패 복구 | Celery→TaskIQ 판단, 상태·retry·수동 재처리 경계 |
| D | AI 서비스 분리·Outbox | 원장/실행 분리, STG 이관 검증, delivery fence |
| E | Backend Template 효과 | STG session·pool 오류 재발 없음, 비개발 직군이 제품 구현, BE 개입 축소 |
| F | NEXUS multi-tenant backend | gateway·admin·homepage 분리, server-owned 지점 권한 |

블록 문안·강도·허용 수치는 [resume-block-library](../products/resume/resume-block-library.md)가, 문서별 포함 깊이는 [common-content-inventory.yaml](../products/resume/common-content-inventory.yaml)이 소유한다.

### 1-4. 수치 정책

수치는 claim의 `allowed_copy`가 상한이다. 이 표는 그중 **공개 지원본에서 실제로 쓰는 것과 쓰지 않는 것**을 한 곳에 모은다.

| 구분 | 항목 | 규칙 |
| --- | --- | --- |
| 쓴다 | QA reopen `37% → 11%` (또는 `26%p`) | 재구축 판단·검증 하네스와 **같은 자리**에 둔다. 단독으로 두면 "원래 37%였나"로 읽힌다 |
| 쓴다 | STG 이관 `2,616 · 795 · 7,111` | 규모가 아니라 **검증 절차**의 근거다. 강조(bold·metric)하지 않는다 |
| 쓴다 | 팀 성격 `AI 활용이 본격화되며 모두가 메이커로 제품 개발·운영에 참여` | Template 효과의 맥락으로만. 인원 수(`백엔드 2~3명`)로 표준의 이유를 설명하지 않는다 (2026-09-03) |
| 쓴다 | 특허 등록 `10-2898273`, CES 2024, KCL 통과 | Credentials 섹션. 출원번호는 쓰지 않는다 |
| 조건부 | corpus `13.1만 행 · 318만 관측` | 데이터 JD일 때 **두 개까지**. 11.1만·18.5만·4,039·20,256을 같이 나열하지 않는다 |
| 조건부 | 작업 시간 `36시간` | 검증 하네스와 병기할 때만. 단독 사용 금지. AI 시대에 속도 자체는 신호가 약하다 |
| 쓰지 않는다 | HTTP 5xx 0.3%, 월 수만 건 | baseline이 없고 규모가 작게 읽힌다. 재측정 전 제외 |
| 쓰지 않는다 | 매출액·band·MRR | 마스킹. `실제 고객이 결제하는`까지 |
| 쓰지 않는다 | UX 컨설팅 DAU 200%·순위 9→5 | confidence medium, 공유받은 수치. `순위·DAU 상승에 기여`까지 |
| 쓰지 않는다 | 커밋 수·blame 비율 | 내부 근거. 공개 문안에서는 강도 동사로만 |
| 쓰지 않는다 | 6축 점수, Yolo 정확도, TellingMe 규모 | 기존 금지 유지 |

---

## 2. 포장 — 허용되는 범위

**포장은 선택·순서·프레임이지 사실의 변경이 아니다.** 아래는 허용되는 포장이다.

- **회사가 묻는 질문 순서대로 배치한다.** JD에서 실제로 묻는 질문 세 개를 뽑고, 질문 하나당 성과 풀에서 하나를 골라 첫 페이지 순서를 정한다.
- **회사가 걱정할 것 하나에 선제 답한다.** 재직 기간, 도메인, 조직 규모 중 하나다. 답은 헤더나 소개 첫 문장에 둔다. 예: 엔터 회사라면 "커머스→피부과→SNS 콘텐츠 세 도메인에서 현업 흐름을 파악해 제품으로 만든" 프레임이 도메인 우려를 지운다. 이 프레임은 evidence로 뒷받침되는 사실이다.
- **강도를 낮춰 쓰지 않는다.** `owned`인 일을 "참여했습니다"로 쓰는 것도 부정확이다 ([persuasive-writing §4](persuasive-writing.md)). 회사 AX 설계 `참여`와 Template `직접 구축`은 같은 문장에서 동사를 분리한다.
- **결과 또는 판단으로 문장을 끝낸다.** 범위 한정은 문장 **중간**에 둔다.
- **재구축은 판단 서사로 쓴다.** 행위가 아니라 대안·시점·검증·위험 미현실화의 리스크 통제 증거다 ([persuasive-writing §11](persuasive-writing.md)).
- **AI 활용은 도구명과 경계로 쓴다.** `Claude Code·Codex를 codebase 분석·기능 inventory·반복 구현·검증에 활용, architecture·test·release 판단은 직접 소유`가 허용 문안이다. "AI로 폭발적 퍼포먼스" 같은 형용사는 쓰지 않고, 1년 6개월 동안 맡은 제품·시스템의 **목록**이 그 말을 대신한다.

### 2-1. 도식 공개 수준 (2026-09-03)

도식은 **패턴 수준**까지 공개한다. 역할·경계·순서·실패 분기·불변 조건·버린 대안·검증 방법은 그린다. 다음은 그리지 않는다.

- 내부 식별자: 함수·노드·헤더·API 경로·큐 제품·외부 채널·provider·모델 실명. `input_guard`는 `소재 유무 판정`으로, `X-Branch-Id`는 `지점 id 헤더`로 쓴다.
- 정확한 수치: 재시도 횟수·간격·초·건수·성공률. 구조를 설명하는 데 필요하면 `상한 N회`, `고정 간격`처럼 관계만 남긴다. 검증 근거 줄에는 "무엇으로 정했다"까지만 쓴다.
- 실제 topology 구성: 어느 root에 무엇이 몇 개, 제품군 구성, 전결 매트릭스. `공통 root / 제품군 root × N / 환경별 state`처럼 경계 구조만 남긴다.

추상화·강조는 허용이고 변형은 위반이다. 없던 구조를 있는 것처럼, 팀 결정을 내 결정처럼, 우회책을 근본 해결처럼 그리지 않는다. 도식은 면접 질문의 출발점이라 한 단계 파고들면 드러난다. 구현/설계가 섞인 도식은 요소마다 `구현`·`설계` 표식을 둔다. 도식 자산의 SoT는 [Design Diagram Library](../products/portfolio/design-diagram-library.md)다.

아래는 포장이 아니라 위반이다.

- 포트폴리오 hero에 보조 줄·헤드라인·문단 3단을 두는 것, 목차를 hero 오른쪽과 본문에 두 번 두는 것, 케이스·목차에 `local 적재 검증`·`STG 검증`·`Prototype` 같은 상태 라벨과 `A → B`식 화살표 제목·mono 글꼴 메모 말투를 쓰는 것 (2026-09-03 user-confirmed). 정직함은 케이스 본문의 담당 범위·검증 범위 문단이 맡는다.
- 경계 문구를 이력서 본문에 남기는 것. `범위 밖`, `미측정`, `production 배포 아님`은 claim과 면접 답변에 둔다. 2026-08-31 user-confirmed: "이력서에서 이 내용은 제거하자, 이거는 내가 구두로 전달할게".
- 내부 용어를 외부 독자에게 그대로 노출하는 것. `Decision·SPEC·Work Package·human gate·agent-readable`은 `결정·명세·작업 기록`, `사람 승인 경계`로 바꾼다.
- 영문 명사를 조합한 번역투. `SNS data·AI 품질 system`, `release·production operation` → 한국어로 바로 읽히게 ([persuasive-writing §9](persuasive-writing.md)).
- 프레임워크명을 전문성처럼 반복하는 것. `Next.js`는 기술 섹션 stack 줄에만 두고 산문에서는 `핵심 화면 직접 구현`으로 쓴다 (2026-09-03 user-confirmed — 화면을 만든 사실은 맞지만 FE 전문가로 읽히면 부정확).
- 사실을 바꾸거나, 금지 수치를 쓰거나, 동사 강도 상한을 넘는 것. 하드 제약은 이 셋뿐이다. 후킹·제목·첫 문장·칸의 순서와 길이는 자유이며, 블록은 기본값이지 원형 강제가 아니다.

---

## 3. 회사별 조립 절차

[tailor-resume skill](../../skills/tailor-resume/SKILL.md)의 workflow 안에서, 문안 단계는 아래 순서로만 진행한다.

1. JD에서 회사가 실제로 묻는 질문 **세 개**를 뽑는다 (`match-report.md`).
2. 질문 하나당 성과 풀(1-3)에서 블록 하나를 고르고 첫 페이지 순서를 정한다.
3. 회사가 걱정할 것 **하나**를 정하고 헤더·소개 첫 문장에 답을 둔다.
4. 헤더 직함을 공고 직무명으로 맞춘다 (1-1).
5. 소개에 15초 문장 세 사실을 JD 순서로 배치한다 (1-2).
6. 나머지 경력·기술·Credentials는 block library의 공통 블록을 그대로 쓴다.
7. 제출 전 게이트(4)를 대조한다.

회사별로 바꾸는 것은 **2·3·4·5와 연결 문장**뿐이다.

---

## 4. 제출 전 게이트

문안 승인 전에 아래 열 개를 대조한다. **하나라도 걸리면 `approved: true`로 바꾸지 않는다.**
`content-contract`의 Acceptance Gates와 `persuasive-writing §7`은 그대로 유효하며, 이 목록은 회사별 지원본에서 반복 위반된 항목만 추가한다.

| # | 게이트 | 위반 예 (2026-09-02 JYP·피처링 초안) |
| --- | --- | --- |
| 1 | 헤더 직함이 공고 직무명과 같다 | 피처링(백엔드 공고) 헤더 `Tech Lead · Backend Engineer` |
| 2 | 소개에 15초 문장 세 사실이 다 있다 | JYP 소개에 `기획자 출신` 누락 |
| 3 | 회사 행마다 제목줄에 재직 사유가 있다 (폐업 · 초기 멤버 영입 · 설립 전 프리랜서) | JYP Memento 행에 `회사 폐업으로 종료` 누락 |
| 4 | `범위 밖·미측정·참여·일부`로 **끝나는** 문장이 0건이다 | 피처링 01 `production crawler 운영은 범위 밖`, JYP 02 `정확한 수치는 미측정` |
| 5 | 내부 용어와 영문 조합 번역투가 0건이다 | 공통 기술 섹션 `Decision · SPEC · Work Package · human gate` |
| 6 | 도구명이 명시돼 있다 (Claude Code · Codex · SQLAlchemy 2.0 async · Sentry · Jira) | JYP `Coding Agent`로만 표기 |
| 7 | 1-4 금지 수치가 0건이고, 선택한 블록의 허용 수치가 빠지지 않았다 | 피처링 02에서 reopen 37→11 누락, corpus 수치 5개 나열 |
| 8 | 특허는 등록번호만, KCL은 통과 사실만이다 | 피처링 credentials에 출원번호 병기 |
| 9 | 성과마다 `문제 → 판단 → 구현 경계 → 결과` 네 칸이 다 있다 | JYP 01 evidence 첫 줄 "우선순위·기준을 조율" (판단·결과 없음) |
| 10 | 이력서의 모든 기술 문장을 30초 안에 구두로 설명할 수 있다 | `async 실행 모델 정합성으로 TaskIQ 선택` ← 이벤트 루프를 설명할 수 있어야 낸다 |

| 11 | 대표 성과 제목 4개 안에 성능·보장·신뢰·멱등·정합·설계 중 **4개 이상**의 단어가 드러난다 (1-5) | 2026-09-03 이전 피처링·JYP: 기전은 있으나 `보장·신뢰·성능` 단어 0회 |

게이트 10은 학습 갭에 대한 규칙이다. 설명할 수 없는 문장은 **빼지 않고** 면접 전까지 학습 진도를 맞춘다.
문장을 빼면 근거 있는 성과를 버리는 것이고, 설명 없이 내면 면접에서 무너진다.

---

## 5. 변경 주기와 owner

| 변경 대상 | 주기 | 어디서 |
| --- | --- | --- |
| 브랜드 문장·채용 역할·전문 영역 | 분기 1회 | [profile/identity.md](../profile/identity.md) → 공통 이력서 |
| 15초 문장 세 사실 | 분기 1회 | block library `intro.*` |
| 성과 풀 구성 | 새 claim 승격 시 | evidence → claim → block library |
| 수치 정책 | 재측정 시 | 이 문서 1-4 + claim `allowed_copy` |
| 게이트 목록 | 위반이 두 지원본에서 반복될 때 | 이 문서 4 |

회사별 지원본 작업 중에 위 층을 고쳐야 한다고 느끼면, 그 지원본을 멈추지 말고 `[확인 필요]`로 남긴 뒤 공통에서 따로 처리한다.

---

## 관련

- [Persuasive Writing Policy](persuasive-writing.md) — 문장 규칙
- [Evidence Policy](evidence-policy.md) — 강도·confidence
- [Public Safety](public-safety.md) — 공개 범위
- [Resume Role Positioning Standard](../products/resume/role-positioning-standard.md) — 역할 전달
- [Resume Block Library](../products/resume/resume-block-library.md) — 블록 문안 SoT
- [Design Diagram Library](../products/portfolio/design-diagram-library.md) — 도식 자산 SoT (포트폴리오 → 경력기술서 → 이력서 3층 문안)
- [Common Content Inventory](../products/resume/common-content-inventory.yaml) — 문서별 포함 깊이
- [Tailor Resume skill](../../skills/tailor-resume/SKILL.md) — 회사별 workflow
