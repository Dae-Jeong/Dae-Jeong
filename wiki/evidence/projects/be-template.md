---
type: project-evidence
title: Backend Template Evidence
description: Organization FastAPI standard and agent context system evidence.
timestamp: 2026-08-31
source_roots: [workspace]
tags: [backend-template, architecture, agent-context, evidence]
---

# Backend Template Evidence

Source locator: `workspace:MEDISOLVEAI-BE-TEMPLATE`

## Backend Standard

- Code-backed: layered architecture, dependency injection, response/error conventions, type safety, ADR, runbook, option boundaries가 확인됐다.
- Code-backed: repository 대부분의 설계·구축 변경이 직접 기여 범위로 확인됐다.
- Contribution boundary: template 설계·구축 전담. 조직의 모든 backend 결정을 단독 소유했다는 의미는 아니다.

## FastAPI SQLAlchemy Standard

- Code-backed: FastAPI와 SQLAlchemy 2.0 async를 baseline으로 사용하고 Router → Service → Validator → Repository → Model 계층을 조직 표준 template에 구현했다.
- Code-backed: PEP 695 generic `BaseRepository`로 공통 CRUD 경계를 만들고, Repository는 SQL·flush만 담당하며 commit·rollback은 Service의 transaction decorator가 소유하도록 책임을 분리했다.
- Code-backed: Service의 `@transactional`이 `REQUIRED`의 기존 transaction 참여, `REQUIRES_NEW`의 새 connection·`AsyncSession`, `NESTED`의 같은 connection 내 SAVEPOINT를 분기하고 commit·rollback·cleanup을 소유한다.
- Code-backed: `ContextVar`에 현재 `AsyncSession`과 `TxState`를 bind하고 무상태 `SessionProxy`가 이를 resolve하게 해, Service·Repository signature에서 반복되는 session 인자를 제거했다.
- User-confirmed (2026-08-28): 시작점은 Router의 `Depends(get_session)` 자체에 대한 부정이 아니라, session 인자를 Service·Validator·Repository까지 계속 전달하면서 업무와 무관한 parameter가 모든 signature를 통과하고 transaction을 짧게 끊거나 중첩할 위치도 호출부에 흩어지는 불편이었다. session plumbing을 제거하고 Service method가 필요한 transaction policy를 선언하도록 바꿨다.
- Code-backed: owner-task guard로 child task가 상속받은 session 접근을 차단하고, propagation·isolation·read-only·`CancelledError` rollback·connection cleanup을 integration test로 검증했다.
- Design decision: 동일 transaction 내부에서는 하나의 asyncio task가 하나의 `AsyncSession`을 소유하게 했다. 병렬 DB 처리가 필요하면 task별 transaction 분리, 데이터 가시성, 실패 복구, 추가 connection·pool 비용을 먼저 결정하도록 ADR·runbook에 명시했다.
- Code-backed: ORM entity와 raw query 결과의 경계를 typed DTO로 분리하고, SQLAlchemy model·naming convention·timezone·soft delete·cursor pagination 규칙을 ADR와 database convention으로 문서화했다.
- Provenance: `workspace:MEDISOLVEAI-BE-TEMPLATE@aa1296c`에서 transaction/session 표준과 전용 integration test를 직접 설계·구현했고, 동일 구조가 운영 제품 backend에 적용된 이력을 확인했다.
- Contribution boundary: FastAPI·SQLAlchemy 조직 template의 설계·구축을 소유한다. 모든 사내 service가 동일 version·구조로 전환됐거나 조직의 모든 backend 결정을 단독 소유했다는 의미는 아니다.

## Agent Context

- Code-backed: 계층형 agent context, Hub-and-Spoke document routing, domain/setup automation skills가 template에 포함됐다.
- Public-safe summary: backend standard에 agent context system과 반복 작업 automation skill 내장.

## Team Leverage Context

- User-confirmed (2026-07-19 인터뷰): 조직 맥락 — 엔지니어 8명(BE 3·FE 5)이 제품 12개를 담당했고, BE 1명이 외부 프로젝트 차출로 **실질 BE 2명이 12개 제품을 관리**. 통일된 패턴·구성이 생존 조건이었다.
- User-confirmed (2026-07-19): 효과 3종 — ① 어떤 프로젝트든 제품 정책만 파악하면 대응 가능(컨텍스트 전환 비용 최소화) ② logging·모니터링 등 횡단 관심사를 전 제품에 일괄 반영 ③ 온보딩·FE 엔지니어도 패턴·규약·하네스 아래에서 BE 로직 구현 가능(고민 시간 감소).
- User-confirmed (2026-08-28): FE·BE를 포함한 여러 직군이 coding agent로 구현 범위를 넓히는 환경에서, Python의 자유도를 사람·프로젝트마다 다시 해석하지 않도록 Java/Spring에서 익숙한 명시적 계층·의존성·transaction 규칙을 FastAPI template의 기본값으로 제안했다. 공통 판단은 template에 흡수하고 팀원은 제품 정책과 예외에 집중하게 하려는 선택이었다.
- User-confirmed (2026-08-28): 기획·QA·디자인 담당자가 coding agent로 구현한 사내 프로그램 4개에는 template 전체를 적용했고, 그 밖의 제품은 필요한 계층·규칙을 선택적으로 가져갔다. 김대정이 담당한 제품은 full template을 기준으로 사용했다.
- User-confirmed (2026-08-31): 백엔드 경험이 적은 담당자도 빠르게 운영 제품을 맡아 구현해야 하는 환경에서, 먼저 FastAPI template과 검증 기준을 제공해 프로젝트마다 backend 구조를 다시 결정하는 부담을 줄였다.
- User-confirmed adoption boundary (2026-08-31): 기능 구현은 각 담당자가 coding agent와 template을 기반으로 수행했다. 김대정은 구현 결과에 대한 피드백과 인프라 담당자로서의 배포를 지원했으며, 개별 기능을 대신 구현하지 않았다.
- User-confirmed qualitative outcome (2026-08-31): 공통 template을 적용한 뒤 담당자가 달라도 제품 개발 속도와 결과물 품질을 일정 수준으로 유지할 수 있었다. 정확한 개발 시간·결함 수·품질 점수는 측정하지 않았다.
- User-confirmed team review (2026-08-31): 정기 개발팀 회의에서 template의 설계 구조를 함께 검토하고 팀원 피드백을 받아 실제 구현에 반영했다. 이는 전사 승인이나 회사 전체 적용 완료가 아니라 개발팀 단위의 review·feedback loop다.
- User-confirmed learning surface (2026-08-31): 백엔드 경험이 적은 담당자가 transaction·DB session lifecycle, 책임별 folder 구조, API request·response의 기본 개념을 이해하고 구현하는 기준으로 template을 사용했다. Template이 이들을 backend 전문가로 만들었다는 의미가 아니라, 자주 틀리는 경계를 기본값으로 제공했다는 의미다.
- User-confirmed pre-template failure modes (2026-08-31): DB session의 수명주기를 이해하지 못해 session을 반납하지 않거나 session·transaction 범위를 과도하게 길게 잡으면서 connection pool이 고갈되고 반복 500 오류가 발생하는 사례가 있었다. 이는 DB가 탐지한 `deadlock`이 아니었다.
- User-confirmed post-template outcome (2026-08-31): Template이 session 관리와 transaction 경계를 기본 구조로 제공한 뒤 위와 같은 DB session 관련 오류가 발생할 가능성이 현저히 낮아졌고, 적용 제품에서 반복되던 문제가 해소됐다. 정확한 오류 건수와 감소율은 측정하지 않았다.
- User-confirmed agent usage (2026-08-31): 기능 구현 담당자와 coding agent는 Service method에 `@transactional`을 선언하고, Repository에서는 반복적인 session parameter 전달 없이 ContextVar에 bind된 현재 `AsyncSession`을 resolve하는 실제 template interface를 사용했다. session 생성·참여·commit·rollback·cleanup은 decorator와 session layer가 담당했다.
- User-confirmed environment boundary (2026-08-31): connection pool 고갈과 반복 500은 대부분 STG에서 발견·수정됐으며 production incident로 이어지지 않았다. 따라서 공개 문구는 production 안정성이나 운영 장애 감소가 아니라 STG failure mode와 배포 전 검증 범위로 한정한다.
- User-confirmed support outcome (2026-08-31): Template 적용 전에는 backend 담당자가 기능 구현 과정에 계속 개입해 session·transaction 사용을 설명하고 코드를 보완해야 했다. 적용 후에는 기능 담당자가 coding agent와 template으로 구현하고 backend 담당자는 결과 피드백과 배포를 지원하는 수준으로 개입 범위가 줄었다. 정확한 지원 시간·질문 건수는 측정하지 않았다.
- User-confirmed discovery path (2026-08-31): coding agent가 기능을 구현한 local 환경에서는 문제가 명확히 드러나지 않았고, 주로 STG QA에서 다른 기능 이슈로 ticket이 열린 뒤 원인을 추적하면서 session lifecycle·connection pool 문제로 확인됐다. 자동 탐지나 local 단계 차단으로 표현하지 않는다.
- User-confirmed rollout (2026-08-31): Template 구축 이후 시작한 사내 프로그램 약 4개는 처음부터 full template을 기준으로 개발했다. 기존 제품은 일괄 전환하지 않고 DB session 관리 영역부터 순차적으로 도입 중이다. 공개 문구에서는 정확한 프로그램 수와 제품명을 제외하고 `신규 사내 프로그램`과 `기존 제품의 점진 도입`으로 표현한다.
- User-confirmed design-review decision (2026-08-31): 정기 개발팀 미팅에서 케이스마다 적합한 design pattern이 다른데 이를 template이 미리 구조화하는 것이 실제로 도움이 되는지 검토했다. session·transaction·API contract 같은 공통 안전장치는 기본값으로 두고, AI Agent를 사용하는 기능은 Hexagonal Architecture, 나머지는 MVC를 기본 구조로 선택하도록 guide했다. AI Agent에 Hexagonal Architecture를 적용한 구체적인 기술적 이유와 adapter 경계는 추가 인터뷰 후 확정한다.
- User-confirmed Agent architecture rationale (2026-08-31): AI Agent 기능은 tool을 추가하며 capability를 확장하는 경우가 많다고 보고, application logic이 개별 tool 구현을 직접 참조하기보다 port를 통해 호출하고 tool·provider를 adapter로 교체할 수 있도록 Hexagonal Architecture를 기본값으로 선택했다. MVC 형태에서도 구현은 가능하지만 tool별 Service·Repository 연계가 늘 때 Facade 추가와 service 간 참조·순환 의존을 별도로 관리해야 하는 결합 위험을 피하려는 판단이었다.
- Technical boundary: 이 선택은 MVC가 본질적으로 순환 참조를 만든다거나 Hexagonal Architecture가 자동으로 결합 문제를 제거한다는 주장이 아니다. Agent application의 orchestration·port와 외부 tool·provider adapter의 의존 방향을 명시적으로 제한하기 위한 project convention이다.
- User-confirmed product-engineering tradeoff (2026-08-31): 초기 제품에 완벽한 architecture를 강제하기보다 운영 가능한 수준의 구조·가독성·안전성을 먼저 확보하고, 제품이 성공하면 architecture를 추가 고도화한다는 원칙을 두었다. 다만 해당 기준으로 성공 후 architecture를 고도화한 실제 사례는 아직 없으므로 완료 성과로 사용하지 않는다. 인터뷰에서 사용한 `70~80점`은 정량 품질 점수가 아니라 이 tradeoff를 설명하는 비유이므로 공개 claim의 수치로 사용하지 않는다.
- User-confirmed recurrence observation (2026-08-31): Full template으로 시작한 신규 사내 프로그램의 STG QA에서는 이전과 같은 session 미반납·connection pool 고갈 문제가 다시 관측되지 않았다. 관측 범위는 해당 신규 프로그램의 STG QA이며, 모든 DB 오류 방지나 production 무장애를 의미하지 않는다.
- User-confirmed code-structure problem (2026-08-31): 초기에는 coding agent의 제안을 연속해서 반영하면서 로직 위치가 여러 영역에 흩어지고, 중복 logging과 local import가 반복돼 가독성과 문제 추적성이 낮아졌다.
- User-confirmed code-structure outcome (2026-08-31): 책임별 folder·layer·호출 규칙과 convention을 template에 고정한 뒤 로직의 위치가 예측 가능해졌고, 문제가 생긴 영역을 더 빠르게 찾고 수정할 수 있었다. 정확한 디버깅 시간 감소는 측정하지 않았다.
- Claim boundary: Java/Spring으로 해당 backend를 구현했다는 의미가 아니며, defect·개발 시간의 정량 개선을 주장하지 않는다.
- Public-safe scale (2026-08-13 user-confirmed): 정확한 내부 제품 수는 공개하지 않고 **"10명 안팎의 엔지니어 조직에서 2~3명의 백엔드 엔지니어가 다수 제품을 담당"**까지 표현한다.

## Public Disclosure

- architecture pattern, ADR, runbook, agent context 구조는 일반화해 공개 가능하다.
- 팀 규모는 `10명 안팎`, 백엔드 규모는 `2~3명`, 담당 범위는 `다수 제품`처럼 근사치로만 공개한다.
- 기획·QA·디자인 직군의 적용 사실은 공개할 수 있으나 정확한 사내 프로그램 수와 제품명은 공개하지 않는다.
- 백엔드 경험이 적은 담당자가 template을 기반으로 기능을 구현하고 운영 제품까지 만든 사실, 김대정이 구현 피드백과 배포를 지원한 역할 경계는 공개할 수 있다.
- 정기 개발팀 회의에서 설계 구조를 검토하고 피드백을 구현에 반영한 사실은 공개할 수 있다. 이를 전사 승인이나 회사 전체 적용 완료로 확대하지 않는다.
- session 수명주기·transaction 경계·folder 구조·API contract를 template의 기본값으로 제공해 session 미반납에 따른 connection pool 고갈과 반복 500 오류의 발생 가능성을 낮춘 사실은 정성적으로 공개할 수 있다.
- Service method가 `@transactional`로 정책을 선언하고 Repository가 현재 session을 resolve하도록 해 기능 구현 담당자와 coding agent가 session lifecycle을 매번 직접 관리하지 않게 한 구조는 공개할 수 있다.
- STG에서 반복되던 session·pool 오류와 backend 담당자의 상시 개입을 줄이고, 기능 담당자가 구현한 결과를 피드백한 뒤 배포하는 역할로 지원 범위를 좁힌 사실은 정성적으로 공개할 수 있다.
- local에서 드러나지 않던 session·connection 문제가 STG QA ticket의 원인 분석에서 확인됐고 이를 template의 기본 session 경계로 보완한 사실은 공개할 수 있다.
- 신규 사내 프로그램은 full template으로 시작하고 기존 제품은 DB session 관리부터 점진적으로 도입한 rollout 방식은 정확한 제품 수·이름 없이 공개할 수 있다.
- 공통 session·transaction·API contract는 기본값으로 두고, AI Agent 기능은 Hexagonal Architecture, 나머지는 MVC를 기본 구조로 guide한 설계 판단은 공개할 수 있다.
- Tool이 늘어나는 AI Agent 기능에서 application logic과 tool·provider 구현을 port·adapter로 분리해 capability 확장과 adapter 교체에 대응하도록 Hexagonal Architecture를 선택한 판단은 공개할 수 있다.
- 초기에는 운영 가능한 구조·안전성을 우선하고 제품 성공 이후 추가 고도화한다는 원칙은 미실행 계획임을 분명히 할 때만 공개할 수 있다.
- Full template으로 시작한 신규 사내 프로그램의 STG QA에서 이전과 같은 session 미반납·connection pool 고갈 문제가 재관측되지 않은 사실은 적용 범위를 함께 밝혀 공개할 수 있다.
- 책임별 구조를 고정해 coding agent가 만든 로직·logging·import가 흩어지는 문제를 줄이고 문제 영역을 찾기 쉽게 만든 사실은 정성적으로 공개할 수 있다.
- private repository path와 내부 convention detail은 필요 이상 공개하지 않는다.

## Rejected Or Unverified Claims

- agent가 context 없이 모든 작업 가능
- 새 프로젝트 비용이 정량적으로 감소했다는 주장
- 기능 구현에 별도 피드백이나 배포 지원이 전혀 필요하지 않았다는 주장
- 전사 승인 또는 회사 전체 backend 전환 완료
- 제품 개발 속도·품질·결함 수의 정확한 개선 수치
- connection pool 고갈을 DB deadlock으로 표현
- DB session·500 오류를 완전히 제거하거나 이후 한 번도 발생하지 않았다는 주장
- production incident·운영 장애를 줄였다는 주장
- Backend 지원이 완전히 필요 없어졌다는 주장
- Backend 지원 시간·질문 건수의 정확한 감소 수치
- QA ticket을 자동으로 분류하거나 local 단계에서 connection 문제를 자동 탐지했다는 주장
- 모든 기존 제품이 full template 전환을 완료했다는 주장
- 모든 제품에 하나의 architecture pattern을 강제했다는 주장
- MVC가 본질적으로 Agent 구현에 부적합하거나 순환 참조를 만든다는 주장
- Hexagonal Architecture가 결합·순환 의존 문제를 자동으로 제거한다는 주장
- `70~80점`을 측정된 품질 점수로 사용
- Template이 모든 DB 오류나 production incident를 방지한다는 주장
- 성공한 제품의 architecture를 실제로 고도화했다는 주장
- 디버깅 시간의 정확한 감소 수치
- `Depends(get_session)`이 잘못된 방식이거나 FastAPI의 한계라는 주장
- `ContextVar`에 raw DB connection을 저장했다는 주장
- `NESTED`가 독립 transaction이라는 주장
- child task가 같은 `AsyncSession`을 안전하게 공유한다는 주장
- 요청 간 동시성이나 transaction 밖의 외부 I/O까지 포기했다는 주장

## Team Context (2026-09-03)

- User-confirmed (2026-09-03): 현재 팀은 AI 활용이 본격화되면서 기획·QA·디자인을 포함한 모두가 메이커 역할로 제품 개발·운영에 참여하는 구조다. 공개 문안에서 조직 표준 template의 이유는 `백엔드 2~3명이 다수 제품을 맡는` 인원 부족이 아니라, 이 팀 구조에서 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있게 하는 것으로 쓴다. 팀 규모 수치는 evidence로만 보존한다.
