---
type: report
title: bullet을 어떻게 써야 impact가 가장 큰가 — 실증 근거 분석
description: 아이트래킹·채용 가이드 실증으로 bullet 하이브리드 포맷을 재설계. 라벨 접두("문제:/판단:")가 스캔 가치를 파괴한다는 발견.
timestamp: 2026-08-12
derived_from: [rules/persuasive-writing.md, backlog/platform-profile-consolidation/dual-track-copy-draft.md]
tags: [copy, format, bullet, research, eye-tracking]
---

# bullet impact 분석 (2026-08-12)

> **2026-08-18 policy update:** 이 보고서의 `block당 3~5개`, `1~2줄` 같은 수치 cap은 superseded다.
> 라벨 반복을 피하고 한 bullet에 한 판정 단위를 두는 가독성 발견만 유지한다. active 분량·case 깊이 기준은
> [Resume Content Contract](../content-contract.md)와 [Persuasive Writing Policy](../../../rules/persuasive-writing.md)가 소유한다.

user 요청: "그 bullet을 어떻게 활용해야 가장 impact가 좋을지는 한번 분석을 하면 좋을것 같아".

## 1. 실증 데이터

| 항목 | 수치·내용 | 출처 |
| --- | --- | --- |
| 1차 스캔 시간 | **6초** — "recruiters spend only 6 seconds reviewing an individual resume" | **TheLadders 원문 확인** |
| 국내 경력기술서 | 30~60초 스캔 | 잡코리아·서치라이트 |
| **80%의 실제 의미** | 리뷰 시간의 80%가 **6개 데이터 포인트**에 쓰인다 — 이름 · 현 직함/회사 · 전 직함/회사 · 현직 기간 · 전직 기간 · 학력 | **TheLadders 원문 확인** |
| 나머지 본문의 취급 | "detail and explanatory copy became **filler** and had little to no impact on the initial decision making" — 6개 밖은 키워드 패턴 매칭에 그침 | **TheLadders 원문 확인** |
| 시선 패턴 | F자·좌측 수직 하강 — **2차 출처만**, 원문 미확인 (참고 수준) | 블로그 |
| 문단 vs bullet | 밀집 문단 무시·짧은 bullet 고정 — **2차 출처만**, 원문 미확인 | 블로그 |
| 보장 가시 범위 | 각 줄 첫 2~3단어 — **2차 출처만, 원문에 없음. hard rule로 쓰지 않는다** | 블로그 |
| bullet 개수 | 직무당 3~5개 최적 / 최신 직무 5~7 / 7~8은 천장 | 채용 가이드 종합 |
| bullet 길이 | 1~2줄 | 채용 가이드 종합 |
| 라벨 접두 | **비권장** — STAR·CAR·PAR는 *사고 도구*지 문장 템플릿이 아니다 | 채용 가이드 종합 |
| 국내 구성 단위 | **프로젝트 단위** 작성, 건당 5~10줄 | 잡코리아·HAIJOB |
| 수치가 없을 때 | 업무 범위·처리량·협업 규모 등 확인 가능한 숫자로 대체 | 서치라이트 |

## 1-b. ⚠️ 원문 대조로 정정한 것 (2026-08-12, Codex 리뷰 반영)

2차 출처(블로그)를 1차 실증처럼 인용한 오류가 있었다.
[TheLadders 원 보고서](https://www.bu.edu/com/files/2018/10/TheLadders-EyeTracking-StudyC2.pdf) PDF를 직접 열어 확인:

| 우리가 썼던 것 | 원문 사실 |
| --- | --- |
| "7.4초" | 원문은 **6초**다. 7.4초는 후속 2차 인용 수치 |
| "상단 1/3 hot zone이 주목의 80%" | **틀렸다.** 80%는 **6개 데이터 포인트**(이름·현 직함/회사·전 직함/회사·현직 기간·전직 기간·학력)에 쓴 시간이다 |
| "각 줄 첫 2~3단어만 읽힘이 보장" | 원문에 **없다.** 2차 출처 진술 |

### 이 정정이 바꾸는 결론

**6초 판정을 좌우하는 것은 bullet 문장이 아니라 직함·회사·기간·학력이다.**
원문은 그 밖의 본문을 "filler, little to no impact on the initial decision"이라고 말한다.

→ **bullet 최적화보다 우선하는 것**: 현재 직함·회사·재직 기간과 직전 직함·회사·기간이
문서 최상단에서 **즉시** 보여야 한다. 웹 이력서 헤더에는 이 정보가 없었다(이름·직군·한 줄만).
2026-08-12 헤더에 현직/전직·기간을 추가했다.

→ bullet 규칙(v3)은 **6초를 통과한 뒤의 2차 정독**을 위한 것이다. 폐기하지 않되,
"6초 안에 읽힌다"는 근거로 정당화하지 않는다.

## 2. 우리 포맷의 치명적 결함

2026-08-12에 확정한 포맷:

```
[Thready — AI 콘텐츠 생성 제품 backend 전면 재구축]
- 문제: 도메인 간 의존성 — 회원 로직을 수정하면 …
- 판단: 부분 수정으로는 의존성 구조가 남아 …
- 실행: 디자인 패턴과 인프라 하네스를 먼저 세운 뒤 …
- 성과: QA 티켓 reopen 비율 37% → 11% …
```

**F자 패턴에서 좌측 여백을 수직으로 훑을 때 읽히는 것:**

```
문제  판단  실행  성과   문제  판단  실행  성과   문제  판단  실행 …
```

경력 5건 × 블록 4~5개 × 라벨 4종 = **같은 단어 20~30개가 가장 비싼 좌측 열을 점거한다.**
"각 줄의 첫 2~3단어만 보장된다"는 실증과 겹치면, 우리는 **보장된 가시 영역 전부를
정보량 0인 라벨에 쓰고 있다.** 채용 담당자가 6초에 얻는 정보가 사실상 없다.

라벨 접두 자체도 비권장 항목이다 — PAR/STAR/CAR는 *무엇을 쓸지 정하는 사고 도구*이고,
결과물에 라벨을 그대로 노출하는 건 권장되지 않는다.

**즉 bullet 전환은 옳았고, 라벨 접두는 틀렸다.**

## 3. 그렇다고 판단을 버리면 안 된다

해외 가이드의 표준 처방은 XYZ 공식(`X를 달성 · Y로 측정 · Z를 해서`)이다.
결과 중심으로 압축하고 상황·판단은 암시로 남기라고 한다.

우리는 이걸 그대로 따르면 안 된다:

- 국내 시장은 **과정과 판단 근거**를 본다 (persuasive-writing §6, 국내 기준).
- 최상위 프레임 — 이력서가 파는 것은 성과가 아니라 **재현 가능성**이다.
  성과는 전 회사에 두고 오고, 판단력만 이식된다.
- 판단 서사는 우리의 유일한 차별화다. 수치만 남기면 경쟁자와 구별되지 않는다.

## 4. 결론 — 이중 구조 (v2 포맷)

**첫 2~3어절은 스캔용, em dash 뒤는 정독용.** 라벨을 지우고 그 자리에 정보를 넣는다.

```
[소제목 — 프로젝트·구간 단위]
- <스캔 토큰> — <판단·맥락 문장>
```

스캔 토큰 선택 규칙 (첫 2~3어절에 무엇을 놓는가):

| bullet 성격 | 앞에 놓을 것 | 예 |
| --- | --- | --- |
| 성과 | **숫자 먼저** | `QA 티켓 reopen 37% → 11%` — 해결 대비 reopen, cutover 전후 Jira 집계 |
| 판단 | **결정 동사 먼저** | `전면 재구축을 결정하고 반대를 설득` — 부분 수정으로는 의존성 구조가 남아… |
| 실행 | **산출물 명사 먼저** | `자동 게이트 12종` — 틀린 출력은 코드가 먼저 거른다 |
| 문제 | **증상 먼저** | `회원 로직 수정이 AI 생성 중단으로 전파` — QA 티켓을 닫아도 재발이 반복 |

추가 규칙:

- **블록당 bullet 3~5개.** 현재 일부 블록이 6개 — 초과분은 병합하거나 소제목을 나눈다.
- **bullet 1~2줄.** 2줄을 넘으면 문단이다.
- **hot zone 우선순위** — (근거 강등: "상단 1/3 80%"는 원문에 없다. 다만 6초 판정이
  상단에서 끝난다는 점은 원문과 정합) 최신 경력 첫 줄에 가장 강한 수치를 놓는다.
- 수치가 없는 구간은 **범위·처리량·협업 규모**로 대체한다 (국내 가이드 처방).
  없는 수치를 만들지 않는다.
- `[소제목]`은 국내 가이드의 **프로젝트 단위 작성** 권고와 일치 — 유지한다.
  F자 패턴의 수직 스캔에 걸리는 앵커 역할도 겸한다.

## 5. 적용 결과

- `rules/persuasive-writing.md` §10을 v2로 개정 (라벨 접두 금지 명문화)
- `dual-track-copy-draft.md` 「bullet 하이브리드 canonical」 전 건 재작성
- 원티드·링크드인 패키지 동기화

## Sources

- [TheLadders 7.4-Second Resume Eye-Tracking Study](https://resumeheatmap.com/eye-tracking-study)
- [How Long Do Recruiters Look at Resumes? The Real Data (2026)](https://resumeheatmap.com/how-long-recruiters-look-at-resumes)
- [The 7-Second Resume Scan: What Recruiters See](https://www.resumefast.io/blog/7-second-resume-scan-eye-tracking)
- [Eye tracking study shows recruiters look at resumes for 7 seconds — HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)
- [STAR vs XYZ vs PAR Resume Bullets (2026)](https://atsverification.com/blog/star-vs-xyz-resume-bullets/)
- [How to Create a CAR Method Resume — Teal](https://www.tealhq.com/post/car-method-resume)
- [How Many Bullet Points per Job on Resume — Kickresume](https://www.kickresume.com/en/blog/how-many-bullet-points-per-job-on-resume/)
- [How Many Bullet Points Per Job on a Resume — Teal](https://www.tealhq.com/post/how-many-bullet-points-per-job-on-resume)
- [XYZ Resume Format 2026 — StylingCV](https://stylingcv.com/blog/xyz-resume-format-2026-the-google-formula-that-turns-job-duties-into-interview-winning-achievements/)
- [경력기술서 예시 총정리(2026) — 서치라이트](https://blog.searchright.net/career-description-examples-2026/)
- [인사담당자가 끝까지 읽는 경력기술서 — 잡코리아](https://www.jobkorea.co.kr/goodjob/tip/view?News_No=13228)
- [경력기술서 작성법 총정리 — HAIJOB](https://www.haijob.co.kr/blog/career-description-guide/)

---

# 부록 — 한국 레퍼런스 재검증 (2026-08-12)

user: "외국애들껄 한국어로 그대로 차용하기보다는 한국 레퍼런스를 찾아서 해보는것도 좋은 방법".

**타당한 지적이었다.** 영어권 처방을 그대로 옮기면 한국어에서 깨지는 지점이 있다.

## A. 한국어는 문장 끝에 힘이 실린다

영어는 SVO라 동사를 문두에 놓는 front-loading이 문법적으로 자연스럽다
(`Reduced reopen rate from 37% to 11%`). 한국어는 서술어가 문장 끝에 오므로
"동사 먼저"를 강제하면 **번역투가 된다** (§9 위반).

국내 가이드의 해법은 다르다 — **개조식 + 명사형 종결**:

> "명사형 종결 어투(**~기여, ~단축**)로 짧게 끊고, 3~5줄로 넘버링하여 작성하세요"
> — 서치라이트

합격 예시의 실제 형태:

```
팔로워 200% 증대 (1.2만 → 3.6만)
온보딩 플로우 재설계로 회원가입 완료율 31% 개선
```

수치와 주제어가 앞에, **결과명사(-개선/-단축/-증대/-구축)가 끝에** 온다.
좌측 스캔 가치와 한국어 어순이 동시에 만족된다. `~했습니다` 서술형은 이 자리에 쓰지 않는다.

## B. 국내 채용담당자의 직접 증언

원티드 인터뷰 (인사담당자 Lee·Kim):

> "작문하듯이 **나열하듯이 줄글로 쓰지 말고, 꼭지를 달아서 간결하게** 써라" — Lee
> "하루에도 **몇백 개의 이력서**를 보고 있다" / "이력서가 **세 장을 넘으면 보고 싶은 생각이 안 든다**" — Kim
> "인사담당자는 자신이 맘에 드는 **한 문단 정도** 읽는다" — Kim

"꼭지를 달아라"는 우리 `[소제목]`과 정확히 같은 처방이다. 국내 실제 사례도
`1. [생산성] … 2. [문제 해결] … 3. [의사소통] …` 형태의 **대괄호 꼭지**를 쓴다.

→ **v1의 실패는 "라벨을 썼다"가 아니라 "내용 없는 라벨을 매 줄 반복했다"였다.**
국내 관행의 꼭지는 줄마다 다른 *내용어*다. `문제:/판단:/실행:` 같은 *공정 라벨*이 아니다.

## C. 판단 서사는 국내에서 오히려 요구된다

영어권 표준(XYZ)은 판단을 암시로 남기라 하지만, 국내 개발자 채용 가이드는 4요소를 요구한다:

> **문제 상황**(어떤 비효율·장애·품질 문제가 있었는가) · **자신의 역할**(직접 발견했는가,
> 구현했는가, 기준을 만들었는가) · **해결 방식**(어떤 기술·구조·프로세스를 선택했는가) ·
> **결과 변화**

시니어일수록 **"왜 그 기술을 선택했는지, 어떤 대안을 왜 배제했는지"**를 쓰라고 명시한다.
persuasive-writing §6(국내 기준 = 대안 검토)과 일치하며, **판단 줄 유지 결정은 국내 근거로도 옳다.**

## D. 국내 가이드가 명시한 나쁜 예 — 자가 점검용

- 정성 표현만: "훨씬 많은", "긍정적 평가"
- 과정만 제시하고 결과 없음: "전면적으로 수정"
- 도구명 나열: "Figma를 활용한 UI 디자인"

## E. 결론 — v3 (한국어 네이티브)

v2의 `<스캔 토큰> — <판단 문장>` 이중 구조는 영어식 도치의 잔재다. 한국어에서는:

```
[프로젝트·구간 꼭지]
- 주제어·수치를 앞에, 결과명사로 종결 (근거는 괄호)
```

- **명사형 종결** — `~개선`, `~단축`, `~구축`, `~결정`, `~전환`. bullet에 `~했습니다`를 쓰지 않는다.
- **성과는 핵심 결과만 1줄.** 근거·측정 정의는 괄호로 뒤에 붙인다.
- **블록당 3~5줄** (국내 가이드도 동일 수치, 영어권과 일치).
- **판단 줄 유지** — 국내 기준상 오히려 필수. 단 명사형으로 압축한다.
- 소개(L1)와 마무리 한 줄은 **존댓말 문단 유지** (읽는 글이지 스캔하는 글이 아니다).
- 전체 분량: 이력서 2장 · 경력기술서 포함 4장, **3장 넘으면 읽기를 포기한다**는 증언 준수.

## 한국 Sources

- [인사담당자가 직접 말하는, 서류 통과가 잘 되는 이력서 — 원티드](https://www.wanted.co.kr/events/article_23_01_06)
- [채용 담당자를 사로잡는 경력직 이력서 쓰는 법 — 원티드](https://www.wanted.co.kr/events/article_23_01_09)
- [경력기술서 예시 총정리(2026): 탈락 vs 합격 — 서치라이트](https://blog.searchright.net/career-description-examples-2026/)
- [경력기술서 양식 3종 + 항목별 작성 가이드 — 서치라이트](https://blog.searchright.net/career-description-form-free-download/)
- [첫 이직 성공을 위한 이력서(경력기술서) 작성 방법 — 스펙터](https://brunch.co.kr/@specterofficial/256)
- [면접관이 꽂히는 경력직 개발자 이력서의 비밀 — 잡코리아](https://www.jobkorea.co.kr/recruit/careers/articles/developer-resume-guide)
- [개발자의 합격 이력서는 '이게' 달라요 — 잡플래닛](https://www.jobplanet.co.kr/contents/news-6299)
- [인사담당자가 끝까지 읽는 경력기술서 — 잡코리아](https://www.jobkorea.co.kr/goodjob/tip/view?News_No=13228)
