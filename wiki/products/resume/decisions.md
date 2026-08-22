---
type: decision-log
title: Resume Decisions
description: General A4 resume의 positioning, scope, and version decisions.
timestamp: 2026-08-22
tags: [resume, decisions, positioning]
---

# Resume Decisions

## Active Decisions

| Decision | Rationale |
| --- | --- |
| `Maker`는 브랜드 정체성, `Tech Lead · Backend Engineer`는 채용 역할 label | 소개에서는 `아이디어를 새로운 가치로 실현하는 메이커, 김대정입니다.`를 사용하되 경력·metadata·검색 직군은 시장에서 인식 가능한 역할로 유지한다. |
| Primary headline은 `Tech Lead`, supporting role은 `Backend Engineer` | 현재 맡은 판단·실행 책임을 먼저 제시하고, backend 사례와 메커니즘으로 전문성을 증명한다. |
| Specialty는 `AI Product Systems` | prompt 사용이 아니라 runtime, quality, async/realtime 운영 경험을 묶는다. |
| Agent workflow는 differentiator | 별도 직군 주장보다 engineering execution 방식으로 제시할 때 신뢰도가 높다. |
| 첫 장은 scan layer, resume 전체는 self-contained technical proof | 첫 장에서 category·경력·최강 근거를 빠르게 판정하게 하되, portfolio를 열지 않아도 기술적 판단·구현·운영 역량을 검증할 수 있어야 한다. |
| General master 먼저, JD tailoring은 선별 | 회사별 문서를 새로 쓰지 않고 검증된 master에서 재배열한다. |
| 기존 `14-resume-draft-v1`은 v0로 재분류 | 구조 inventory는 유효하지만 evidence mapping과 공개 검증이 완료되지 않았다. |
| 고정 page cap을 두지 않는다 | 분량은 verified technical signal이 결정한다. 첫 장의 scanability는 유지하고, 이후 페이지는 완결된 기술 사례나 검증 근거로만 확장한다. |
| 소개·기술 case·경력 bullet 수를 고정하지 않는다 | 소개는 선택적 orientation이고, case와 bullet의 수·길이는 새로운 기술 판정 근거가 있는지가 결정한다. |
| 역할은 `기본 직군 × 문제 소유 × 판단 범위 × backend mechanism × 운영 결과`로 전달 | 직함 병기보다 독자가 반복된 사례에서 맡길 일을 복원하게 한다. 세부 기준은 [role-positioning-standard.md](role-positioning-standard.md)가 소유한다. |
| 소개 다음에는 경력을, 그 뒤에 대표 기술 사례를 둔다 | 회사·직함·기간·담당 범위라는 사실을 먼저 보여준 뒤 기술적 주장을 검증한다. |
| 별도 `일하는 방식` 섹션을 사용하지 않는다 | 재구축·품질 판정·표준화 사례와 같은 claim을 반복해 밀도만 낮췄다. 성향은 사례의 반복된 모양으로 전달한다. |
| Product Owner 성격은 별도 직함이 아니라 제품 판단→backend contract 연결로 증명 | `Backend Engineer / PO` 병렬 표기를 피하고 domain·API·transaction·QA·release에 반영된 실제 판단을 쓴다. |
| 공통 이력서는 유료 제품 운영에서 반복 가능한 backend 전문성으로 전개 | Thready 제품·팀 outcome을 먼저 보여준 뒤, 인계받은 backend 재구축, Centurion 비동기 복구, Thready AI 데이터 경계, 조직 표준, Azure 변경 안전성 순으로 재현 가능한 기술 판단을 증명한다. |
| `AX`는 primary title이 아니라 회사 업무 설계 경험을 보여주는 전문 사례 축으로 둔다 | 제품 개발뿐 아니라 의사결정·회의·업무 배정·승인·후속 작업을 사람·agent의 실행 맥락과 human gate로 연결한 범위를 구체적으로 쓴다. |
| 회사 AX·제품 운영·Backend Template·인프라는 한 ownership으로 합치지 않는다 | 회사 AX 구조는 `설계 참여`, 제품별 Decision→release 적용·운영은 `리드`, Backend Template과 Azure/Terraform 운영은 `직접 구축/담당`으로 기여 강도가 다르다. 회사 AX는 공통 경력·기술과 직군별 지원본에 남기며, 공통 대표 성과에서는 직접 구축한 backend 사례를 우선한다. |
| 직접 application code가 없는 설계·운영 기여도 검증되면 포함한다 | code commit만 경력의 기준으로 삼지 않는다. 대신 `참여`·`적용/운영 리드`·`구축`을 contribution strength에 맞게 분리한다. |
| 하나의 case는 하나의 문제·판단·mechanism을 소유한다 | 시간대와 기여 강도가 다른 DAY·Mediness·BE Template·SellerCanvas를 한 사례에 합치면 각 전문성이 희석된다. |
| 법인 설립 전 선행 개발과 설립 후 재직은 resume에서 한 CareerRow의 stage timeline으로 그룹화할 수 있다 | 더데이랩스 프리랜서와 MediSolve AI 정규직은 법적 timeline·tenure에서 분리 유지하되, 같은 제품군을 선행 개발한 맥락은 한 row에서 읽히게 한다. 더데이랩스 명칭·기간·고용형태는 숨기지 않는다. |
| Memento→MediSolve 합류 경로는 성과 인정과 초기 멤버 영입으로 설명하되 법인 연속성은 주장하지 않는다 | Memento AI, 더데이랩스 계약, MediSolve AI는 별도 법적 관계다. `법인 전환`·`사업 승계`·`승진`·`공동창업자` 표현은 금지한다. |
| 화면 이력서는 A4/PDF-first 폭을 사용하고 모바일은 safe fallback으로 둔다 | 주요 제출·검토 artifact인 A4 PDF와 화면의 줄바꿈 차이를 줄인다. 모바일 전용 조판보다 잘림·겹침·가로 스크롤 방지를 보장한다. |
| 기업부설연구소장 직함은 공개 이력서에 표기하지 않는다 | 등재 사실은 evidence에만 보존하고, 공개 positioning은 Tech Lead와 Backend Engineer 역할 및 실제 성과로 전달한다. |

## Non-Goals

- `Backend Architect`, `AX Engineer`, `AI Agent Engineer`를 단독 primary title로 사용
- 확인되지 않은 business impact나 성능 수치 생성
- 검증에 필요한 제약·대안·failure mode·구현·운영 근거를 짧게 보이기 위해 portfolio에만 격리
- 특정 회사용 맞춤 문구를 general profile source로 역수입

Historical exploration은 [archive/resume-research](../../archive/resume-research/README.md)에 보존한다.

## Superseded Decisions

| Decision | Superseded | Reason |
| --- | --- | --- |
| Resume는 15초 hooking, portfolio는 depth | 2026-08-18 | 지원 피드백에서 resume만으로 기술 역량을 판정하기 어렵다는 문제가 확인됐다. portfolio는 검증을 확장하는 지면이지 resume의 결손을 보완하는 필수 경로가 아니다. |
| 목표 분량은 A4 2장 이내 | 2026-08-18 | page 수를 먼저 고정하면서 기술 사례의 제약·선택·구현·failure mode가 분절됐다. 이후에는 첫 장 scanability와 페이지별 signal density를 검증한다. |
| 요약 3줄·성과 최대 3개·경력 상세 bullet 금지 | 2026-08-18 | 항목 수를 미리 고정하면서 판단·trade-off·검증·운영 맥락이 proof에서 탈락했다. 이후에는 중복을 제거하되 기술 설명 자체를 압축 대상으로 삼지 않는다. |
