---
type: product-contract
title: Resume Role Positioning Standard
description: 김대정의 역할을 직함이 아니라 반복된 판단·기술 경계·운영 결과로 전달하는 이력서 기준.
timestamp: 2026-08-26
derived_from:
  - profile/identity.md
  - evidence/claims/
  - products/resume/research/2026-08-18-engineer-self-positioning.md
tags: [resume, positioning, role, backend]
---

# Resume Role Positioning Standard

## 브랜드 소개와 채용 역할

> 아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.

이 문장은 브랜드 소개다. 채용 역할 label은 `Tech Lead · Backend Engineer`, specialty는 `AI Product Systems`다. `Maker`를 직함처럼 사용하지 않고, 아이디어를 실제 제품과 가치로 만든 범위는 경력과 대표 사례가 증명한다. `Product Owner` 역시 슬래시로 병기할 별도 정체성이 아니라 무엇을 만들지 판단하고 그 판단을 실행 가능한 backend contract로 바꾼 경험으로 증명한다.

## 역할 전달식

```text
역할 전달력
= 인식 가능한 기본 직군
× 반복해서 소유한 문제
× 직접 내린 판단의 범위
× 구체적인 backend mechanism
× 출시·운영 결과
```

한 항이 0이면 역할이 흐려진다.

- 직군만 있으면 평범한 직함이다.
- 문제만 있으면 회사·제품 소개다.
- 판단만 있으면 기획 서사다.
- mechanism이 없으면 기술 전문성을 판정할 수 없다.
- 결과·운영이 없으면 실제로 닫힌 일인지 알 수 없다.

## 세 층의 정체성

| 층 | 값 | 이력서에서의 역할 |
| --- | --- | --- |
| 브랜드 정체성 | `Maker` | 공통 소개 한 문장으로 제시하고 아래 사례가 증명 |
| 주 역할 | `Tech Lead` | 제품 범위·품질 기준·실행 정렬 책임을 먼저 전달 |
| 기술 기반 | `Backend Engineer` | API·data·transaction·async/realtime·infra 전문성을 증명 |
| 전문 영역 | `AI Product Systems` | AI runtime·quality·서비스 경계와 운영 범위 |
| 차별화되는 작동 방식 | 고객이 돈을 내는 이유를 찾고 실제 매출이 발생하는 제품으로 만든 뒤, 운영에 필요한 backend 경계를 직접 설계 | 제품 운영·직접 구현·재구축·비동기 복구·AI 데이터 경계·Backend Template 사례가 반복해서 증명 |

금지:

- `Backend Engineer / PO / PM / AI Engineer` 슬래시 나열
- `제품도 알고 기술도 압니다` 같은 추상적인 자기평가
- Product Owner를 primary category와 경쟁시키기
- 과거 PM 경험을 별도 PM 자기소개 섹션으로 분리하기

## 대표 사례의 6문답

주요 case는 아래 여섯 질문에 답한다.

1. 어떤 사용자·사업·운영 문제였는가.
2. 어떤 제약과 failure mode가 있었는가.
3. 내가 직접 정한 기준·범위·대안은 무엇인가.
4. 어떤 데이터·transaction·API·worker·service·infra 경계로 구현했는가.
5. 배포·운영·장애 대응·품질 판정 중 어디까지 책임졌는가.
6. 수치·운영 상태·외부 검증·code/document artifact 중 무엇이 이를 증명하는가.

### 상단 배치 gate

- 3번 `판단 범위`와 4번 `backend mechanism`은 필수다.
- 둘을 포함해 여섯 항목 중 최소 다섯 항목이 검증돼야 대표 case로 상단에 둔다.
- 네 항목 이하는 supporting evidence로 경력에 남긴다.
- 결과 수치가 없다는 이유만으로 탈락시키지 않는다. 이때는 failure boundary, 운영 상태, 재사용 효과, 검증 artifact가 6번을 대신할 수 있다.
- evidence가 없는 대안·인과·규모는 빈칸으로 두며 만들어내지 않는다.

## AX·Engineering System 사례의 6문답

AX 사례는 application code 유무가 아니라 제품과 회사 업무를 어떻게 다시 설계하고 실제 운영에 적용했는지로 판정한다.

1. 제품 개발과 의사결정·회의·업무 배정·승인·후속 작업 중 무엇이 끊기거나 반복됐는가.
2. 어떤 기록과 상태를 source of truth로 삼았는가.
3. 제품의 Decision·SPEC·Work Package·QA·release와 회사 업무의 decision·assignment·approval·follow-up을 어떻게 연결했는가.
4. agent가 맥락을 읽고 준비할 일과 사람이 판단·승인할 일의 경계는 무엇인가.
5. 본인이 설계 참여·적용/운영 리드·직접 구축 중 어디까지 했는가.
6. 실제 운영 artifact, version trace, release 결과, 재사용 효과 중 무엇이 남았는가.

`AX`라는 단어만으로는 대표 사례가 되지 않는다. 위 여섯 항목 중 다섯 개 이상을 검증하고,
기여 동사를 claim strength에 맞게 나눠야 한다. 직접 service code를 작성하지 않았더라도 실행 가능한
contract·state·gate를 세팅하고 실제 운영을 책임했다면 이력으로 사용한다.

현재 공통 이력서에서는 회사 AX 구조 설계 참여와 제품별 적용·운영 리드를 경력·기술에 남기고,
직접 구축한 backend 사례를 대표 성과에서 우선한다. AX/FDE 등 직군별 지원본에서 AX를 대표 사례로
올리더라도 `참여`·`리드`·`owned`를 하나의 동사로 압축하지 않는다.

## 김대정에게 반복되는 역할 패턴

| 반복된 역할 | 대표 근거 | 독자가 내려야 할 결론 |
| --- | --- | --- |
| 제품 단계에 맞는 backend 변화 범위 결정 | Thready 재구축 시점·범위·하네스·cutover | 무조건 재작성하는 사람이 아니라 부채와 위험을 계산하는 engineer |
| 실패 가능한 상태의 정합성·복구 경계 설계 | Memento rollback, Centurion worker·retry | 정상 경로보다 실패 경로를 먼저 설계하는 backend engineer |
| AI 실행과 품질을 운영 가능한 system으로 구체화 | AI service boundary·Outbox·3층 품질 판정 | prompt 사용자가 아니라 AI product runtime과 quality를 다루는 engineer |
| 제품 정책을 여러 실행 주체의 계약으로 번역 | 예약 정책의 BE·FE·QA·release 연결, 제품 운영 gate | 기획을 구현으로 넘기는 사람이 아니라 실행 기준까지 닫는 engineer |
| 해결을 팀의 반복 가능한 기반으로 확장 | FastAPI template·runbook·agent context | 개인 생산성에 머물지 않고 team leverage를 만드는 engineer |
| 제품과 회사 업무를 AX 관점에서 다시 설계 | 제품별 Decision·SPEC·Work Package·owner lane·release gate 적용·운영, 의사결정·회의·업무 배정·승인·후속 작업의 human gate 설계 참여 | AI 기능만 붙이는 사람이 아니라 조직이 일하는 흐름과 사람·agent의 책임 경계를 설계하는 engineer |
| application의 출시와 기본 운영까지 책임 | product backend 운영, Azure·Vercel 배포 환경 구성 | 배포 목적지까지 다뤄본 backend engineer; infrastructure specialist로 포지셔닝하지 않음 |

## 섹션별 역할

### Header

- `Tech Lead · Backend Engineer` 순서를 고정한다.
- 현재·이전 주요 회사, 직함, 기간을 즉시 보여준다.
- 브랜드 문장·PO 병기는 넣지 않는다.

### 소개

공통 Maker 문장 한 문장만 둔다. 채용하면 맡길 수 있는 backend 범위와 AI·PM 경험의 쓰임은 경력·대표 성과의 구체적인 문제, 판단, mechanism으로 증명하며 소개에서 다시 요약하지 않는다.

### 경력

- 대표 성과 다음에 둔다. 첫 화면에서 맡길 수 있는 결과를 판정한 뒤 회사별 사실과 범위로 검증한다.
- 각 회사의 첫 문장은 `제품·도메인 + 맡은 범위`다.
- 이어지는 bullet은 판단, 기술 구현, 운영 결과를 구분한다.
- 과거 PM 성과는 `요구 발견 → 범위·우선순위 결정 → 기술 실행·외부 검증`으로 연결한다.

### 대표 기술 사례

- 회사별 연대기가 아니라 위 6문답을 완결하는 case다.
- 결과를 opener에 두고, 바로 뒤에 제약·판단·mechanism·검증을 붙인다.
- 내부 코드명 대신 독자가 아는 시스템 성격으로 쓴다.
- `일하는 방식`을 별도 선언하지 않는다. 여러 case의 반복된 모양으로 읽히게 한다.

### 기술

- 앞선 case를 빠르게 찾는 index다.
- 주력·병행·개인 프로젝트를 구분하고 사용 맥락을 함께 적는다.
- 면접에서 깊게 답할 수 없거나 stable evidence가 없는 사용 범위는 확장하지 않는다.

### Credentials

- 제3자 검증을 독립 노출한다.
- 개인 단독 성과로 오독되지 않게 contribution boundary를 유지한다.

## 읽는 시간별 acceptance

### 15초

독자가 다음을 답할 수 있어야 한다.

- Tech Lead인가, 그리고 무엇을 직접 구현하는 Backend Engineer인가.
- 현재 어느 회사에서 어떤 범위를 맡는가.
- AI Product Systems가 구체적으로 무엇을 뜻하는가.

### 60초

다음 두 반복 패턴을 찾아야 한다.

- backend를 설계·구축하고 production 운영까지 닫는다.
- 제품 판단을 domain·API·transaction·QA·release 계약으로 바꾼다.

### 전체 읽기

각 대표 case에서 판단의 이유, 실제 mechanism, failure mode, 기여 강도, 검증 근거와 한계를 면접 질문으로 전환할 수 있어야 한다.

## 문장 규칙

- 제목: 문제 또는 결과가 먼저 보이는 짧은 문장. contribution strength가 다른 범위를 합칠 때는 `참여`·`리드`·`직접 구축`을 제목이나 첫 문장부터 분리한다.
- 첫 bullet: 결과·운영 상태 또는 책임 범위.
- 다음 bullet: 실제 제약과 판단.
- 다음 bullet: backend mechanism과 failure boundary.
- 마지막 bullet: 검증·운영 결과와 한계.
- `담당했다`, `참여했다`, `기여했다`만으로 끝내지 않고 무엇을 결정·설계·구현·운영했는지 밝힌다.
- 단 contribution strength가 `contributed`라면 강한 동사로 ownership을 부풀리지 않는다.

## 편집 우선순위

분량이 늘었을 때 제거 순서는 다음과 같다.

1. 같은 claim의 반복 설명
2. 형용사·철학 선언
3. 제품 소개
4. 오래된 stack 나열
5. 새로운 판정 근거가 없는 supporting bullet

기술적 판단, failure mode, mechanism, 운영 검증은 page 수를 맞추기 위한 첫 삭제 대상이 아니다.

## 관련

- [외부 benchmark 조사](research/2026-08-18-engineer-self-positioning.md)
- [Resume Content Contract](content-contract.md)
- [Backend Case Achievement Inventory](backend-case-achievements.md)
- [Product Decision Achievement Inventory](product-decision-achievements.md)
- [Evidence Policy](../../rules/evidence-policy.md)
- [Public Safety](../../rules/public-safety.md)
