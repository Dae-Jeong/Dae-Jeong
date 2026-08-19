---
type: research
title: Engineer Self-Positioning Benchmarks
description: 국내외 엔지니어 공개 이력서와 채용 책임자 자료에서 역할 PR 구조를 비교한 조사.
timestamp: 2026-08-18
checked_at: 2026-08-18
tags: [resume, positioning, backend, research]
---

# Engineer Self-Positioning Benchmarks

## 질문

강한 엔지니어는 이력서에서 직함·기술 목록을 넘어 자신이 어떤 역할을 하는 사람인지 어떻게 전달하는가.

이 조사는 문장을 베끼기 위한 자료가 아니다. 공개 이력서·career page의 표현 방식과 채용 책임자가 요구하는 판정 근거를 비교해, 김대정의 active resume가 따라야 할 구조를 도출한다.

## 결론

공통 패턴은 다음 한 문장으로 압축된다.

> 역할은 직함이 아니라 반복해서 책임진 문제, 스스로 내린 판단, 구현한 기술 경계, 출시·운영 결과의 조합으로 전달된다.

유명 엔지니어의 짧은 소개는 이미 널리 알려진 제품·표준·공개 작업물이 뒤에서 증명하고 있다. 일반 지원자가 길이만 모방하면 증거가 사라진다. 채용용 이력서는 첫 화면에서 인식 가능한 직군을 고정하고, 이후 경력과 대표 사례로 그 직군의 범위와 깊이를 직접 증명해야 한다.

## 실제 엔지니어의 자기 PR 방식

| 사례 | 역할 고정 방식 | 증명 방식 | 가져올 원칙 |
| --- | --- | --- | --- |
| [Filippo Valsorda](https://filippo.io/) · [상세 career](https://words.filippo.io/hi/) | cryptography와 Go라는 좁은 전문 영역 | 유지하는 표준 라이브러리, 보안팀 책임, 실제 트래픽·CVE·도구 | 전문성은 기술 목록보다 `무엇을 유지하고 어디까지 책임졌는가`로 증명 |
| [Mitchell Hashimoto](https://mitchellh.com/) | 기본 정체성은 `developer`로 유지 | 대표 제품과 CEO·CTO·IC 기간을 경력 사실로 제시 | 복수 역할을 슬래시 직함으로 합치지 않고 기여 범위를 구분 |
| [Simon Willison](https://simonwillison.net/about/) | 현재 만드는 데이터·웹 도구를 먼저 제시 | 현재 작업, 과거 리더십, 공동 창작물을 역순 연결 | 회사명보다 반복해서 다룬 문제와 만든 것이 남게 구성 |
| [Julia Evans](https://jvns.ca/about/) | `software developer` 뒤에 하나의 기술 관점 | 시스템을 깊게 이해한다는 관점과 방대한 공개 글·도구 | 관점은 짧게, 증거는 실제 작업물로 분리 |
| [Dan Zumwalt](https://danzumwalt.com/resume/resume.pdf) | `Principal Software Engineer` | toil 20% 제거, 연간 비용 절감, 대규모 조직 표준 확산 뒤에 판단 서사 연결 | 최강 결과를 상단에 두고, 경력에서 그 결과를 만든 역할을 설명 |
| [Nisán Haramati](https://haramati.ca/static/pdf/NisanHaramati_resume_20230816.pdf) | `Principal Distributed Systems Engineer` | 처리 규모·비용·CPU·network 감소와 제품 lifecycle 책임 | 기술 전문 영역, scale, 운영 결과를 한 묶음으로 제시 |
| [Gyedong Jeon](https://gyedongjeon.com/resume/) | backend 경력·도메인·규모를 첫 문장에 고정 | 회사별 scale과 성능·거래 무결성·조직 운영 근거 | 각 경력에서 규모와 맡은 범위를 먼저 제시하고 stack은 뒤에 둠 |

## 채용 책임자가 보는 판정 근거

### 해외

- Gergely Orosz는 경력자의 work experience를 상단에 두고, 결과·영향·기여와 지원 직무 관련성을 중심으로 쓰라고 한다. 기술도 별도 목록에만 두기보다 사용 맥락을 경력 안에서 보여주는 방식을 권한다. [The Tech Resume Inside Out sample](https://thetechresume.com/assets/downloads/Sample%20Chapters%20The%20Tech%20Resume%20Inside%20Out%201.0.pdf), [hiring-manager advice](https://stackoverflow.blog/2020/11/25/how-to-write-an-effective-developer-resume-advice-from-a-hiring-manager/)
- Jacob Kaplan-Moss는 책임과 성과를 분리한다. 책임은 맡은 범위를, 성과는 얼마나 잘했고 무엇이 달라졌는지를 보여준다. 매출 수치가 어려운 backend·SRE 작업도 SLA, 장애 시간, 처리 규모, 배포와 운영 안정성으로 증명할 수 있다. [Engineering resume accomplishments](https://jacobian.org/2020/may/8/engineering-resume-accomplishments/)
- Oxide의 공개 채용 체계는 후보자가 실제로 만든 work sample, 기술을 설명하는 writing sample, 이상 동작을 분석한 analysis sample을 분리해 본다. 스택과 결과 숫자만으로 기술 깊이를 대신할 수 없다는 근거다. [Oxide Hiring Process RFD](https://rfd.shared.oxide.computer/rfd/0003)
- Julia Evans는 성과를 `왜 중요한가 → 내가 한 일 → 직접·간접 효과`로 기록한다. 숫자로 환산하기 어려운 기술 부채, 운영 개선, 문서화와 멘토링도 후속 효과가 있으면 성과가 된다. [Brag documents](https://jvns.ca/blog/brag-documents/)

### 한국 스타트업·테크 회사

- 토스는 한 일을 전부 나열하기보다 각 경험에서 만든 impact와 배움을 쓰고, 개발 직군은 기술 스택을 명시하라고 안내한다. [토스 합류 여정](https://toss.im/career/joining-guide)
- 토스 Product Server Developer는 서버 개발자가 단순 구현을 넘어 서비스 흐름·구조·기술 방향성을 제품 조직과 함께 설계한다고 정의한다. 제품 ownership은 별도 직함이 아니라 backend 역할의 범위다. [토스 Server Developer](https://toss.im/career/job-detail?company=%ED%86%A0%EC%8A%A4&job_id=4071141003&sub_position_id=4071141003)
- 당근의 backend 공고는 비즈니스·사용자 제약을 먼저 두고 트래픽, 저지연, 데이터 pipeline, 분산 transaction, 독립 배포와 장애 격리를 연결한다. 기술은 독립된 자랑이 아니라 제품 제약을 푸는 메커니즘으로 제시된다. [당근 Backend Engineer](https://careers.daangn.com/jobs/role/6640363003/)
- 우아한형제들 공개 회고는 최근·중요 경험을 먼저 두고, 주도한 사례를 문제 정의·원인·측정·대안·해결·검증으로 깊게 보여준다. 다른 회고도 기능 목록보다 역할·책임과 결과를 STAR로 설명하고 자신 없는 기술을 제거했다. [경력 개발자 이력서 회고](https://techblog.woowahan.com/2531/), [서버 개발자 이력서 회고](https://techblog.woowahan.com/11998/)
- LINE 서버 개발자 회고는 이력서가 `무엇을 했는가`를, 포트폴리오가 그 실체와 `왜·어떻게`를 확장한다고 설명한다. 이번 resume contract는 기술 판단에 필요한 핵심 `왜·어떻게`까지 이력서 안에 남기고, 긴 근거만 portfolio로 보낸다. [LINE 서버 개발자 회고](https://engineering.linecorp.com/ko/blog/things-i-prepared-to-be-a-line-server-developer/)

## 공통 패턴

1. 첫 문장은 하나의 인식 가능한 직군을 고정한다.
2. 전문 영역은 직함을 늘리는 대신 반복해서 다룬 시스템 문제로 좁힌다.
3. 형용사보다 대표 시스템·표준·규모·운영 결과로 실력을 증명한다.
4. `created`, `led`, `co-led`, `contributed`, `part of`처럼 기여 범위를 구분한다.
5. 기술은 문제와 결과 안에서 사용 맥락을 보여준다.
6. 숫자가 없으면 판단·failure mode·운영 경계·재사용 효과로 성과를 설명한다.
7. 과거 경력은 현재 정체성을 설명하는 궤적으로 편집한다.
8. page 수보다 첫 화면의 역할 완결성과 이후 페이지의 새로운 technical signal을 본다.

## 2026 AX 표현 기준

`AX`는 한국 시장에서 `AI Transformation`의 약어로 쓰이지만, 이력서에서 단어만 붙이면 역할을
판정할 수 없다.

- LG CNS는 AX를 AI 도입으로 업무 방식·운영 효율·의사결정 체계를 바꾸는 전환으로 설명한다. [LG CNS AX 사례](https://connect.lgcns.com/kr/newsroom/press/detail.ko_0893)
- Microsoft의 agentic maturity model은 개별 task 자동화보다 end-to-end process redesign, 명시적인 human-agent decision right, telemetry와 feedback을 성숙한 전환의 기준으로 둔다. [Microsoft Agentic AI maturity model](https://learn.microsoft.com/en-us/agents/adoption-maturity-model/maturity-model-business-process)
- AWS Agentic AI Lens는 모든 일을 자동화하는 대신 risk에 따라 human approval을 두고, 승인 문맥·결정·시간을 추적 가능한 기록으로 남기라고 한다. [AWS Human-in-the-loop guidance](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp02.html)
- 실제 AX Engineer 공고도 agent architecture·workflow 구현만이 아니라 복잡한 현업 업무를 agent가 수행하고 사람이 본질적 판단에 집중하는 운영 변화와 backend 기초를 함께 본다. [PFCT AX Squad AI Engineer](https://pfct.career.greetinghr.com/ko/o/198185)

따라서 기본 이력서의 AX는 다음 다섯 항목으로만 주장한다.

1. 기존 handoff·상태 단절·반복 작업이라는 운영 문제
2. Decision·SPEC·Work Package 같은 source of truth
3. 사람·agent·도구의 실행 및 approval 경계
4. QA·release gate와 version trace
5. 본인의 설계 참여·적용/운영 리드·직접 구축 범위

Header의 primary category는 계속 `Backend Engineer · AI Product Systems`다. `AX`는 별도 전문 사례와
기술 index에서 검색 가능한 분류로 사용하고, `AX Engineer`라는 새 직함으로 만들지 않는다.

## 김대정에게 적용할 해석

Primary category는 `Backend Engineer`, specialty는 `AI Product Systems`로 유지한다. Product Owner 경험은 별도 직함 경쟁이 아니라 다음 행동으로 보여준다.

- 사용자·사업 요구를 domain model, API, transaction, worker, QA와 release 기준으로 번역
- 제품 단계와 기술 리스크를 보고 구축·부분 개선·재구축의 범위를 결정
- 구현 이후 배포·운영·품질 판정까지 lifecycle을 닫음
- 한 번 만든 해결을 template·runbook·agent context로 팀의 실행 기준으로 확장

따라서 공개 이력서가 남겨야 할 역할은 다음이다.

> 제품 판단을 운영 가능한 backend contract와 production system으로 끝까지 연결하는 Backend Engineer.

구체적인 편집 계약은 [role-positioning-standard.md](../role-positioning-standard.md)가 소유한다.

## 한계

- 공개 career page는 이력서와 목적이 다르며, 인지도가 높은 사람은 짧은 문장 뒤에 이미 큰 외부 증거가 있다.
- 공개 이력서의 수치는 작성자 자기보고일 수 있다. 이 조사는 해당 수치의 진위를 김대정의 claim 근거로 사용하지 않고 표현 구조만 참고한다.
- 회사·팀마다 선호하는 형식은 다르다. 따라서 범용 master는 역할과 증거 구조를 고정하고 JD tailoring에서는 claim 선택과 순서만 바꾼다.
