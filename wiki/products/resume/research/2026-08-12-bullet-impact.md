---
type: report
title: bullet을 어떻게 써야 impact가 가장 큰가 — 실증 근거 분석
description: 아이트래킹·채용 가이드 실증으로 bullet 하이브리드 포맷을 재설계. 라벨 접두("문제:/판단:")가 스캔 가치를 파괴한다는 발견.
timestamp: 2026-08-12
derived_from: [rules/persuasive-writing.md, backlog/platform-profile-consolidation/dual-track-copy-draft.md]
tags: [copy, format, bullet, research, eye-tracking]
---

# bullet impact 분석 (2026-08-12)

user 요청: "그 bullet을 어떻게 활용해야 가장 impact가 좋을지는 한번 분석을 하면 좋을것 같아".

## 1. 실증 데이터

| 항목 | 수치·내용 | 출처 |
| --- | --- | --- |
| 1차 스캔 시간 | 7.4초 (Ladders 2018) / 6초 (U.Michigan 2023) | 아이트래킹 |
| 국내 경력기술서 | 30~60초 스캔 | 잡코리아·서치라이트 |
| 시선 패턴 | **F자** — 상단 가로 1회, 이후 **좌측 여백 수직 하강** | 아이트래킹 히트맵 |
| 주목도 분포 | 상단 1/3 "hot zone"이 1차 스캔 주목의 **80%** | 아이트래킹 |
| 문단 vs bullet | **밀집 문단은 사실상 무시됨**, 짧은 bullet은 고정(fixation) 발생 | 아이트래킹 |
| 보장 가시 범위 | **각 줄의 첫 2~3단어만** 수직 스캔에서 읽힘이 보장됨 | 아이트래킹 |
| bullet 개수 | 직무당 3~5개 최적 / 최신 직무 5~7 / 7~8은 천장 | 채용 가이드 종합 |
| bullet 길이 | 1~2줄 | 채용 가이드 종합 |
| 라벨 접두 | **비권장** — STAR·CAR·PAR는 *사고 도구*지 문장 템플릿이 아니다 | 채용 가이드 종합 |
| 국내 구성 단위 | **프로젝트 단위** 작성, 건당 5~10줄 | 잡코리아·HAIJOB |
| 수치가 없을 때 | 업무 범위·처리량·협업 규모 등 확인 가능한 숫자로 대체 | 서치라이트 |

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
- **hot zone 우선순위** — 상단 1/3이 주목의 80%다. 메디솔브 첫 블록의 첫 bullet이
  전체 문서에서 가장 비싼 한 줄이다. 여기에 가장 강한 수치를 놓는다.
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
