---
type: report
title: 이력서 구조 리서치 — 프로젝트 인벤토리 vs 인물 서사
description: 이력서가 인물 서사인가 프로젝트 인벤토리인가 — 외부 리서치와 현 구조 진단.
timestamp: 2026-08-09
tags: [resume, research, structure, narrative]
---

# 이력서 구조 리서치 — 프로젝트 인벤토리 vs 인물 서사

**출발 질문 (2026-08-09)**: 현재 이력서가 프로젝트를 기준으로 매핑돼 있다. 그런데 이력서는 나를 소개하는 문서지 내 프로젝트를 소개하는 문서가 아니다.

리서치 결과 **이 지적이 맞다.** 다만 "프로젝트를 빼라"가 아니라 **"프로젝트의 역할을 바꿔라"**가 정확한 처방이다.

---

## 1. 핵심 원리 — 프로젝트는 주제가 아니라 증거다

> "Projects are proof — a skills list tells a hiring manager you know Python; a project entry shows you used Python to cut a data pipeline's runtime by 40%."

프로젝트 자체가 이력서의 뼈대가 되면 안 되고, **주장을 뒷받침하는 증거**로 배치돼야 한다. 순서가 뒤집히면 독자는 "이 사람이 무엇을 할 수 있는가"가 아니라 "이 사람이 어디에 있었는가"를 읽게 된다.

> "Rather than listing projects in isolation, **you are building a case for your next position**. A separate projects section cluttered with weekend experiments dilutes the story you are trying to tell."

**이력서는 인벤토리가 아니라 주장(argument)이다.** 한국 자료도 같은 진단이다 — *"경험한 프로젝트를 전부 나열하면 오히려 핵심 역량이 흐려질 수 있습니다."*

## 2. 서사의 관통선(through-line)

> "The key themes that have defined your work — problem-solving, innovation, leadership, or service — should be woven **throughout** your resume to create that consistent narrative thread."

역할마다 따로 노는 게 아니라 **모든 역할을 관통하는 주제**가 있어야 한다. 엔지니어링 매니저 이력서 연구에서 제시된 3-pillar 구조가 참고가 된다 — People(팀을 어떻게 키웠나) / Delivery(무엇을 냈나) / Technical direction(기술 판단을 어떻게 이끌었나)를 **모든 역할에 관통**시키는 방식이다.

핵심은 pillar 자체가 아니라 **"역할별로 다른 이야기를 하지 않는다"**는 원칙이다.

## 3. Summary가 서사를 프레이밍한다

> "The summary is prime real estate — the first thing a recruiter reads. A strong three-line summary can frame your entire narrative: your level of experience, the type of teams you work with, your core strengths, and a headline achievement."

> "The professional summary is your opening argument and determines whether hiring managers invest another 30 seconds scanning the rest."

읽기 시간은 **초기 스캔 6~7초, 이어 읽어도 30초** 수준이다. 한국 자료도 *"실무자는 평균 30초 이내로 이력서를 판단"*으로 일치한다.

## 4. 흔한 실패 — 과업 나열

> "Engineering resumes frequently fail by **emphasizing tasks over outcomes**, which makes hiring managers question your business impact."

프로젝트 중심 구조는 자연히 과업 나열로 흐른다. "무엇을 했다"가 프로젝트 단위로 반복되면 "무엇이 바뀌었다"가 묻힌다.

한국 자료: *"백엔드 이력서의 핵심은 많은 기술을 나열하는 것이 아니라 **문제 해결 능력을 읽히게 만드는 것**입니다. 프로젝트 수를 줄이더라도 문제 해결 과정과 기여도를 구체적으로 보여주는 편이 훨씬 설득력 있어요."*

프로젝트 개수는 **최대 5개**가 권장 상한으로 반복 언급된다.

## 5. 결론적 구조 — 혼합형

> "The most effective approach combines both formats: reverse-chronological work experience, a targeted skills section, and **strategically added project details that demonstrate applied skills with measurable outcomes**."

즉 프로젝트를 없애는 게 아니라 **경력 서사에 종속**시킨다. 스킬 섹션은 10~16개로 압축하고, 프로젝트는 주장을 증명하는 자리에만 배치한다.

> "In a strong narrative resume, **your skills validate the story you've already told** in your experience section."

---

## 현 구조 진단

### 무엇이 프로젝트 중심으로 굳어 있나

1. **claim ID 체계 자체가 프로젝트 네임스페이스다** — `thready.*`, `centurion.*`, `nexus.*`, `mediness.*`, `be-template.*`, `medisolve-admin.*`. 사실을 프로젝트 단위로 소유하다 보니 산출물도 그 축을 따라간다.
2. **`Selected Projects` 독립 섹션** — 리서치가 지적한 "separate projects section"에 정확히 해당한다.
3. **`Capabilities` 6개 카드가 프로젝트 claim의 재배열** — AI Product Systems, Product Backend Ownership, Async & Realtime, Infra-Aware Delivery, Engineering Standard, Agent-Readable Operations. 역량처럼 보이지만 각 항목이 특정 프로젝트에 1:1 대응한다.
4. **archive의 기존 리서치에 「Per-Project Bullet 규칙」 섹션 존재** — 프로젝트 중심이 처음부터 설계 전제였다.

### 그런데 이미 잘하고 있는 것

- **Summary가 서사를 프레이밍한다** — 궤적(Vision AI → PM → Backend), 수치, 제3자 검증, 역할, 차별점 순서. 리서치의 "opening argument" 권고와 정확히 일치한다.
- **recency weighting 적용** — 현재 소속이 절반 이상. "building a case for your next position"과 정합한다.
- **과거 정량 미사용 규칙** — 오래된 프로젝트 수치가 최신 실적과 경쟁하지 않게 한다.
- **XYZ-lite 불릿** — 과업이 아니라 결과 선행.

### 진짜 문제는 관통선의 부재

관통 주제가 **Summary에만 있고 이후 섹션에서 사라진다.** Summary는 "제품을 끝까지 책임지는 층으로 백엔드를 선택한 엔지니어"라고 선언하는데, Capabilities·Selected Projects·Career는 그 주장을 이어받지 않고 각자 프로젝트를 설명한다.

독자 입장에서는 **첫 문단의 주장과 이후 본문이 따로 논다.**

---

## 개선 방향 (제안)

### A. 관통 주제를 먼저 정한다

현 evidence에서 반복적으로 드러나는 축은 셋이다.

1. **문제의 경계를 다시 잡는다** — 재구축 결정·설득, 문제 축 재정의("짧게 만들기"→"정보당 줄 수"), 판정 자리 이동(writer→planner)
2. **측정과 게이트로 판정 가능하게 만든다** — 3층 판정 체계, 실측 근거로 규칙 검증, 반증 로그, 자기 되먹임 오류 발견·교정
3. **해결을 표준과 자동화로 확장한다** — 조직 표준 template, agent context 내장, 릴리스 게이트, daily briefing

⚠️ **축 이름은 [v4 초안](../../resume/master/v4/content.md)에서 한 차례 조정됐다.** 초안 1차의 "문제를 다시 정의한다"는 범위가 넓어 아키텍처 변경 대부분을 흡수했고, "팀이 쓰게 만든다"는 IaC 소유까지 끌어들였다. 위 이름이 확정본이다.

⚠️ **축 2는 evidence 검증에서 2개 프로젝트만 교차**하는 것으로 확인됐다(thready·mediness). 관통선으로 쓰려면 [근거 보강](../../resume/master/v4/claim-expansion-draft.md)이 선행돼야 한다.

### B. Capabilities를 역량 축으로 재구성

지금은 프로젝트 1:1 대응이다. 위 3축으로 묶고 **각 축마다 서로 다른 프로젝트의 근거를 배치**하면, 같은 claim을 쓰면서도 "이 사람의 일하는 방식"이 읽힌다.

### C. Selected Projects의 역할 축소

리서치가 지적한 "separate projects section dilutes the story"에 해당한다. 선택지:
- 경력 bullet에 흡수하고 섹션 제거
- 또는 **1~2건만 남기고 "왜 이 프로젝트가 나를 설명하는가"를 명시**

### D. 검증 방법

리서치의 6~7초 / 30초 기준으로 자체 테스트:
- **6초 테스트**: 헤더+Summary만 읽고 "이 사람이 어떤 엔지니어인가" 한 문장으로 답할 수 있나
- **30초 테스트**: Capabilities까지 읽고 그 답이 **더 선명해지는가, 아니면 프로젝트 목록으로 흩어지는가**

현재는 30초 테스트에서 흩어질 가능성이 높다.

---

## 유의점 — 과교정 경계

claim ID 체계를 인물 축으로 바꾸는 것은 **권장하지 않는다.** evidence는 프로젝트 단위로 검증되는 것이 자연스럽고(코드·커밋·운영 지표가 프로젝트에 붙어 있다), 근거 추적성이 registry의 핵심 가치다.

**바꿀 것은 evidence 레이어가 아니라 산출물 레이어다.** 같은 claim을 인물 서사 축으로 재배열하는 것이지, 사실의 소유 구조를 바꾸는 게 아니다.

## Sources

- [Practical guide to writing FAANG-ready software engineer resumes — Tech Interview Handbook](https://www.techinterviewhandbook.org/resume/)
- [How to Structure Your Software Engineering Resume in 2026 — Interview Kickstart](https://interviewkickstart.com/blogs/articles/how-to-structure-your-software-engineering-resume)
- [Software Engineer Resume Projects: How to List Them and When to Include Them — SWE Resume](https://www.sweresume.app/articles/software-engineer-resume-projects/)
- [The Perfect Resume Format for Senior and Staff Engineers — betopten](https://betopten.com/blog/perfect-resume-format-senior-and-staff-engineers)
- [Engineering Manager Resume: Examples & Template (2026) — EM Tools](https://www.em-tools.io/engineering-manager-resume)
- [9 Steps to Writing a Resume That Tells Your Story — Employment Enterprises](https://eeihr.com/employment-expert/9-steps-to-writing-a-resume-that-tells-your-story/)
- [Storytelling in Your Resume: Why and How — LiveCareer](https://www.livecareer.com/resources/resumes/how-to/write/storytelling-resume)
- [백엔드 개발자 이력서, 기술 나열보다 중요한 문제 해결 경험 정리법 — iBat Studio](https://www.ibatstudio.com/%EB%B0%B1%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B4%EB%A0%A5%EC%84%9C-%EA%B8%B0%EC%88%A0-%EB%82%98%EC%97%B4%EB%B3%B4%EB%8B%A4-%EC%A4%91%EC%9A%94%ED%95%9C-%EB%AC%B8%EC%A0%9C-%ED%95%B4/)
- [개발자 경력기술서 예시(2026) — SearchRight](https://blog.searchright.net/developer-career-description-examples/)
- [면접관이 꽂히는 경력직 개발자 이력서의 비밀 — 잡코리아](https://www.jobkorea.co.kr/recruit/careers/articles/developer-resume-guide)
