---
name: analyze-jd-fit
description: Automatically analyze a job description when the user sends a job-posting URL or JD text, even with only a vague request such as "해줘" or "봐줘". Compare it with Kim Daejeong's verified profile and evidence to decide fit, strengths, gaps, and positioning. Do not use for non-job links or for producing resume or portfolio artifacts.
---

# Analyze JD Fit

JD 하나를 보고 지원 여부를 판단하는 local-only workflow다. 사용자가 링크만 보내도 분석 요청으로 간주한다. 외부 LLM 서비스는 호출하지 않고, 현재 Codex의 추론과 이 repo의 canonical source만 사용한다.

전체 실행 구조는 [flow diagram](references/flow.md)에서 확인할 수 있다.

## 입력 수집

- URL이면 현재 원문을 browser/fetch 수단으로 읽고 URL과 확인 시점을 남긴다. 검색 snippet만으로 판정하지 않는다.
- URL의 page title과 본문으로 채용공고임이 확인되면 `해줘`, `봐줘`처럼 짧은 요청에도 추가 질문 없이 분석을 시작한다.
- 일반 문서·상품·프로필 등 채용공고가 아닌 링크에는 이 skill을 사용하지 않는다.
- 본문이나 파일을 받으면 제공된 내용을 원문으로 사용한다.
- URL과 본문을 함께 받으면 현재 URL 원문을 우선하고, 접근 실패 시 제공 본문을 fallback으로 사용한다.
- 로그인·만료·anti-bot 때문에 핵심 요건을 읽지 못하면 추측하지 말고 본문을 요청한다.

## Source contract

분석 전에 필요한 범위만 읽는다.

1. `wiki/profile/canonical-baseline.md`로 owner를 찾는다.
2. `wiki/profile/identity.md`, `career.md`, `capabilities.md`, `credentials.md`에서 JD와 관련된 사실을 확인한다.
3. `wiki/evidence/claims/*.yaml`에서 stable claim ID, strength, allowed/forbidden copy를 확인한다.
4. `wiki/products/jd/profile-skills.json`에서 기술별 `strong`, `partial`, `none` 상태를 확인한다.
5. `wiki/rules/evidence-policy.md`와 `wiki/rules/public-safety.md`의 표현 상한을 지킨다.
6. 더 깊은 근거가 필요한 claim만 `wiki/evidence/projects/`에서 따라간다.

`canonical-baseline.md`는 인덱스일 뿐이다. 값이 owner와 다르면 owner를 따른다. archive, 기존 resume 문구, 홈페이지 문구를 사실 source로 사용하지 않는다.

## 분석

### 1. JD 구조화

회사·포지션과 함께 주요 업무, 필수 요건, 우대 요건, 기술, 연차, 학력, 언어, 근무 조건을 분리한다. JD 문장을 그대로 나열하기보다 회사가 이 역할에 기대하는 핵심 결과 축을 먼저 찾는다.

### 2. Eligibility gate

연차, 학력, 언어, 근무지, 자격증처럼 실력 매칭 전에 탈락을 만들 수 있는 조건을 먼저 판정한다. 명시된 hard requirement와 preference를 섞지 않는다.

### 3. Claim mapping

각 요구를 아래 상태 중 하나로 분류하고 근거 claim ID를 연결한다.

| 상태 | 기준 |
| --- | --- |
| `strong` | verified claim이 요구를 직접 뒷받침한다 |
| `partial` | 인접 경험은 있지만 범위·깊이·근거가 요구보다 제한적이다 |
| `gap` | 대응 claim이 없거나 `profile-skills.json`이 `none`이다 |
| `check` | JD 또는 profile 정보가 모호해 사용자 확인이 필요하다 |

기술명 일치만으로 `strong`을 주지 않는다. 실제로 맡길 결과와 ownership, 운영 범위, 검증 강도를 함께 본다. 대응 근거가 없으면 경험을 만들지 않고 gap으로 남긴다.

### 4. 지원 판단

전체 점수나 적합도 퍼센트는 만들지 않는다. 다음 기준으로 한 줄 결론을 낸다.

- `지원 권장`: hard blocker가 없고 핵심 결과를 강한 claim으로 설명할 수 있다.
- `조건부 지원`: 중요한 partial/check가 있지만 지원 포지셔닝이나 확인으로 해소 가능하다.
- `비추천`: 명시적 hard blocker가 있거나 역할의 핵심 대부분이 검증된 경험 밖이다.

## 기본 응답

사용자가 별도 형식을 지정하지 않으면 채팅에 아래 순서로 간결하게 답한다.

1. `결론` — 지원 권장/조건부 지원/비추천과 가장 큰 이유
2. `Eligibility gate` — 통과, 위험, 확인 필요
3. `핵심 매칭` — JD 결과 축별 strong/partial과 claim ID
4. `실제 공백` — gap과 그 영향
5. `포지셔닝` — 지원한다면 앞세울 성과 축과 피해야 할 과장
6. `확인 질문` — 판단을 바꿀 수 있는 것만

근거 없는 긍정 표현보다 탈락 위험과 gap을 먼저 선명하게 보여준다. public-safe claim wording을 사용하고 private source의 원문·고객사 실명·내부 수치는 노출하지 않는다.

## 변경 경계

- 기본 실행은 분석 응답만 제공하며 repo 파일을 만들거나 수정하지 않는다.
- public homepage, `/chat`, API route를 만들거나 배포하지 않는다.
- JD 원문이나 지원 기록을 저장하지 않는다. 사용자가 저장을 요청한 경우에만 `wiki/products/jd/`의 계약에 맞는 위치를 정한다.
- 이력서·포트폴리오 문안이나 PDF를 만들지 않는다. 사용자가 지원 패키지 제작을 요청하면 분석 결과를 입력으로 삼아 `$tailor-resume` 단계로 전환한다.
