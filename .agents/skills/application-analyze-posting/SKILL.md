---
name: application-analyze-posting
description: Analyze a job-posting URL or JD text against Kim Daejeong's verified profile — collect the posting, apply the eligibility gate, judge each requirement against claims, decide whether to apply, and accumulate source-backed keywords. Writes jd.md and match-report.md when run for an application folder. Use for 공고 검토, JD 분석, or 누적 채용 키워드 분석. Not for non-job links or writing application documents.
---

# Application Analyze Posting

JD 하나를 보고 지원 여부를 판단하는 local-only workflow다. 사용자가 링크만 보내도 분석 요청으로 간주한다. 외부 LLM 서비스는 호출하지 않고, 현재 실행 중인 agent의 추론과 이 repo의 canonical source만 사용한다.

전체 실행 구조는 [flow diagram](references/flow.md)에서 확인할 수 있다.

개별 공고 분석에는 키워드 관측 기록의 저장·집계를 포함한다 (2026-09-07 사용자 승인). 저장 위치·스키마·집계 기준은 [JD keyword contract](../../../wiki/products/jd/keyword-analysis.md)를 먼저 읽고 따른다. 사용자가 저장하지 말라고 하면 해당 실행은 읽기 전용으로 처리한다.

`누적 키워드 분석`만 요청하면 기존 관측 기록을 집계한다. 새 공고 수집이나 개인 claim 재검증을 강제하지 않는다.

## 입력 수집

- URL이면 현재 원문을 browser/fetch 수단으로 읽고 URL과 확인 시점을 남긴다. 검색 snippet만으로 판정하지 않는다.
- 원티드는 공개 API detail(`/api/v4/jobs/{id}`)을 우선할 수 있다.
- 공고 URL이 만료·리다이렉트되면 현재 원문, 캐시 여부, 확인 시점을 분리해 기록한다.
- 현재 지원 후보 추천에는 [공고 접수 상태 규칙·게이트 52](../../../wiki/rules/application-copy-standard.md)를 적용한다. 종료 공고의 역량 분석과 현재 지원 가능 추천을 구분한다.
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

### 5. 키워드 추출·누적

원문에서 기술과 엔지니어링 책임 키워드를 추출하고, 필수·우대·업무·단순 스택 언급을 구분한다. 위 contract에 따라 근거 있는 관측만 저장하고 `scripts/summarize_keywords.py`로 누적 공고 수와 키워드별 공고 수를 계산한다. 추출은 현재 LLM이, 집계는 코드가 맡는다.

현재 공고의 주요 키워드와 관련 누적 표본의 반복 요구를 짧게 설명한다. 기록이 한 건이면 첫 관측이라고 말하고 추세를 만들지 않는다. 저장 후 프로젝트 검증을 실행하고 저장 경로·집계 범위·검증 결과를 보고한다. 원문 접근 실패는 키워드 0건 공고로 저장하지 않는다.

## 출력 모드

| 모드 | 언제 | 결과물 |
| --- | --- | --- |
| 채팅 | 공고 검토·적합도 질문 (기본) | 아래 `기본 응답` 형식의 채팅 답변 |
| 지원 폴더 | [application-write-docs](../application-write-docs/SKILL.md)·[application-prepare](../application-prepare/SKILL.md)가 호출했거나 사용자가 지원 준비를 요청 | 지원 폴더의 `jd.md`(수집 시점 원문·URL·확인 시점)와 `match-report.md` |

`match-report.md`는 이 skill이 형식을 소유한다.

- frontmatter: `type: jd-match-report`, `title`, `status`, `checked_at`
- `# 판단`: 지원 권장/조건부 지원/비추천과 가장 큰 이유
- `## Eligibility gate`: 조건 · 원문 구분 · 판정 표
- `## 요구별 근거`: ID(필수 R, 우대 P, 업무 D) · 요구 · 구분 · 판정과 claim ID · 범위 표

같은 공고 ID이고 원문이 그대로면 기존 `jd.md`·`match-report.md`를 재사용한다. 다른 플랫폼에 올라온 같은 채용 건도 기존 attempt의 분석을 재사용하고, 새 폴더를 만들지 않는다. 공고 ID나 원문이 바뀌었으면 다시 분석한다. 재지원·다른 공고는 새 지원 폴더에 쓴다.

## 기본 응답

사용자가 별도 형식을 지정하지 않으면 채팅에 아래 순서로 간결하게 답한다.

1. `결론` — 지원 권장/조건부 지원/비추천과 가장 큰 이유
2. `Eligibility gate` — 통과, 위험, 확인 필요
3. `핵심 매칭` — JD 결과 축별 strong/partial과 claim ID
4. `실제 공백` — gap과 그 영향
5. `포지셔닝` — 지원한다면 앞세울 성과 축과 피해야 할 과장
6. `확인 질문` — 판단을 바꿀 수 있는 것만
7. `키워드 관측` — 이번 공고의 필수/우대 키워드, 누적 표본의 공고별 빈도와 출처, 저장 여부. 누적 분석만 요청했으면 이 항목을 중심으로 답한다.

근거 없는 긍정 표현보다 탈락 위험과 gap을 먼저 선명하게 보여준다. public-safe claim wording을 사용하고 private source의 원문·고객사 실명·내부 수치는 노출하지 않는다.

## 변경 경계

- 기본 쓰기 범위는 JD keyword contract의 정규화 관측 기록과 파생 키워드 보고서, 그리고 지원 폴더 모드의 `jd.md`·`match-report.md`뿐이다. 개인 profile/evidence나 기존 시장 리포트는 자동 변경하지 않는다.
- public homepage, `/chat`, API route를 만들거나 배포하지 않는다.
- 채팅 모드에서는 원문 전체·브라우저 로그를 저장하지 않는다. 원문은 지원 폴더 모드의 `jd.md`에만 남긴다. 공고 분석을 지원 의사로 간주하지 않으며 지원 registry는 변경하지 않는다. 과거 공고 일괄 적재·정기 수집·외부 공개는 별도 요청이 필요하다.
- 이력서·포트폴리오 문안이나 PDF를 만들지 않는다. 사용자가 지원 문서 작성을 요청하면 `match-report.md`를 입력으로 [application-write-docs](../application-write-docs/SKILL.md)로 넘긴다.
