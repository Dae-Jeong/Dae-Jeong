---
type: library
title: Design Diagram Library
description: 경험별 시각화 자산의 SoT. 도식 한 장이 포트폴리오·경력기술서·이력서 세 층의 문안으로 내려간다.
timestamp: 2026-09-03
tags: [portfolio, diagram, sot, copy]
---

# Design Diagram Library — 도식 자산 SoT

최신 비교 초안: [내부 동작 24항목](prototypes/visual-library-2026-09/details.html#transaction). 기존 요약본을 보존한 채 책임 경계·처리 규칙·실패 분기를 구체화한 로컬 검토본이며, 회사별 제출본에 일괄 반영하지 않는다.

경험 하나를 **패턴 수준의 도식** 한 장으로 고정하고, 그 도식에서 세 층의 문안을 뽑는다. 회사별 지원본은 여기서 고르고 순서만 바꾼다.

- 규칙 owner: [Application Copy Standard §2-1 도식 공개 수준](../../rules/application-copy-standard.md#2-1-도식-공개-수준-2026-09-03)
- 코드: `app/fe/app/portfolio/diagrams/` — 문법 `design-grammar.tsx`(표·비교·상태 체인·topology·시간축) + `flow.tsx`(swimlane 흐름: 열 = 서비스 경계, 노드 격자 고정, SVG 직각 화살표), 도식 `design-diagrams*.tsx`, 검토 라우트 `/portfolio/design-lab` (local)
- 형태 규칙 (2026-09-03): **백엔드 처리 흐름 사례는 swimlane 흐름형**(실선 정상 · 점선 실패 · 마름모 판단 · 짙은 박스 사람 · 원통 저장소). 시간이 구조인 사례는 Timeline, 판단 비교는 Compare, 절차·승격은 StateMachine. 포트폴리오의 이 흐름 자산에서 mermaid는 GitHub README용으로 쓴다(자동 배치라 A4에서 글자가 작아짐). 서버·배치 topology는 처리 흐름과 구분하며 [render-server-architecture](../../../skills/render-server-architecture/SKILL.md)를 통해 글로벌 표현 정본을 따른다. 공개 범위 규칙은 계속 적용한다.
- **대상 매체 (2026-09-03 user-confirmed): 데스크톱 화면과 A4 PDF 둘뿐.** 모바일은 점검·수정 대상이 아니다. 리뷰어는 데스크톱이나 PDF로 읽는다. 이미 있는 반응형 코드는 걷어내지 않되 더 손대지 않는다.
- 사실 범위: 각 항목의 claim과 evidence 문서. 도식은 claim의 `allowed_copy`를 넘지 않는다.
- 블록 대응: [Resume Block Library](../resume/resume-block-library.md)의 A~Q

## 항목 형식

```
### <key> · <패턴 이름>
블록 · claim · 강도 · 문법 · 구현/설계 표식 여부
- 보여주는 것  불변 조건 / 실패 분기 / 버린 대안
- 포트폴리오   어느 case의 설계 섹션에, 어떤 표와 함께
- 경력기술서   도식 없이 구조를 말로 (3~4문장)
- 이력서       bullet 한 줄
- 숨긴 것      도식에서 뺀 내부 식별자·수치 (면접에서 구두로)
```

세 층은 같은 사실의 해상도 차이다. 포트폴리오는 구조와 실패 분기, 경력기술서는 판단과 결과, 이력서는 한 줄 결과다. 층이 내려갈수록 수치는 claim의 허용 범위 안에서만 다시 붙는다.

## 반복되는 습관 — 도식 여러 장이 같은 문장을 말할 때

| 습관 | 도식 |
| --- | --- |
| 늦게 도착한 것이 최신을 덮지 않는다 | ① Outbox version fence · ⑪ 전사 sequence fence |
| 실패를 숨기지 않고 상태로 승격한다 | ② 주문·알림 worker · ⑨ generation FAILED · ⑩ 세션 풀 |
| 판정은 그 입력을 아는 자리에 둔다 | ⑨ scout/writer guard · ⑭ writer → planner 이동 |
| 자동화는 바닥에만, 판단은 사람에게 | ⑥⑦ AX 사람 게이트 · ⑧ AI 추천·사람 확정 · ⑭ 3층 |
| 검증되지 않은 것으로 전환하지 않는다 | ⑤ plan gate · ⑫ 지문 대조 · cutover |

첫 페이지 요약에 쓰는 문장은 이 표에서 나온다. "규모가 다른 트러블슈팅"(조직·팀·제품·시스템)은 ⑧·③·①②·⑩⑪의 순서로 붙인다.

---

## 1. 백엔드 경계·전달

### outbox-delivery · Outbox durable delivery
D · `thready.ai-boundary` · owned · **Flow**(원장/전달자/소비 3열) + StateTable · 표식 없음
- 보여주는 것  원장과 outbox row는 함께 commit되거나 함께 실패 / lease 만료·재점유·terminal FAILED·역순 도착 no-op / DB 공유·dual-write
- 포트폴리오   피처링 Case 02 첫 번째, JYP Case 02 네 번째. outbox row 상태 4행 + consumer fence 판정 2행
- 경력기술서   제품 원장과 AI 실행 상태를 서비스와 DB 단위로 분리하고, 원장 변경과 전달 기록을 같은 transaction에 두는 Outbox를 구현했다. 전달자는 짧은 lease로 row를 점유하고 version과 시도 횟수를 fencing token으로 붙이며, 소비 쪽은 더 높은 version만 반영해 역순 도착이 최신 상태를 덮지 않는다. 최대 시도를 넘긴 전달은 terminal 상태로 보존해 운영자가 원장 쪽에서 확인한다. 양쪽 서비스 전체 회귀와 stale PUT/DELETE fence test로 검증했다.
- 이력서       제품 원장과 AI 실행 상태를 분리하고 Outbox·version fence로 전달 정합성을 검증
- 숨긴 것      실제 서비스 이름(lane은 원장/전달자/소비), lease 길이, 최대 시도 횟수

### bay-worker · 실패를 주문 상태로 승격하는 worker
C · `centurion.bay-async` · led · **Flow**(주문 API/worker/외부 채널 3열, job·주문 상태를 한 흐름에) + StateTable · 표식 없음
- 보여주는 것  API 응답은 알림 완료를 뜻하지 않는다 / 고정 간격 재시도 소진 → FAILED → 수동 재발송 / 동기 처리·기존 task queue 유지
- 포트폴리오   피처링 Case 03. 알림 job 상태 4행 + 주문 상태 3행
- 경력기술서   주문 생성 transaction을 먼저 끝낸 뒤 알림을 worker로 보내, API 응답과 외부 작업 완료를 분리했다. 알림 job은 대기·발송·성공·실패 상태를 기록하고 고정 간격으로 상한까지 재시도하며, 공급사 알림이 모두 성공해야 주문이 다음 상태로, 하나라도 최종 실패면 실패 상태로 승격된다. 실패 주문은 전용 API에서 조건을 검증한 뒤 수동 재발송한다. 기존 task queue가 asyncio 실행 모델과 맞지 않아 교체하면서 이 경계를 다시 세웠다.
- 이력서       주문·재고 API와 실패 가능한 후속 작업을 worker로 분리하고 상태·재시도·수동 재처리 경계 구축
- 숨긴 것      큐·worker 제품명, 외부 채널명, 재시도 횟수·간격 (claim allowed_copy에는 있음)

### transaction-template · 정책 선언 + 현재 session resolve
E · `be-template.standard` · owned · Compare · 표식 없음
- 보여주는 것  commit·rollback·cleanup은 Service의 decorator와 session layer만 소유 / STG에서 반복된 pool 고갈 / 모든 계층에 session을 흘려보내는 방식
- 포트폴리오   피처링 Case 04, JYP Case 01 두 번째
- 경력기술서   인계받은 코드에서 session 인자가 모든 계층을 통과하며 반납 누락으로 pool이 고갈되던 문제를, Service가 transaction 정책을 선언하고 Repository는 현재 session만 resolve하는 template로 바꿨다. 전파 정책 세 가지와 owner-task guard를 두고 propagation·isolation·cancel rollback·connection cleanup을 integration test로 고정했다. 이 template로 시작한 신규 프로그램의 STG QA에서 같은 문제가 재관측되지 않았다.
- 이력서       백엔드 경험이 적은 팀원도 coding agent와 함께 운영 제품을 만들 수 있게 FastAPI 조직 표준 template 구축
- 숨긴 것      없음 (패턴 수준이 원래 형태)

### tenant-boundary · 접근 범위는 서버 상태가 정한다
F · `nexus.multi-tenant` · led(진행 중) · Compare · 표식 없음
- 보여주는 것  데이터 접근 범위는 client 입력이 아니라 서버가 소유한 상태에서 나온다 / header만 바꾸면 다른 지점 접근 / Homepage API까지 한 번에 전환
- 포트폴리오   lab에만. NEXUS case를 쓰는 지원본에서 연결
- 경력기술서   지점 데이터 범위를 client 헤더로 정하던 Admin API를, 로그인 시 서버가 저장한 작업 지점으로 필터하도록 바꾸고 지점 전환은 권한 검증을 거치는 전용 API로만 허용했다. 변경 범위를 Admin API로 한정해 공용 인증 middleware와 Homepage API의 기존 계약은 유지했다.
- 이력서       여러 지점의 운영·예약 backend를 multi-tenant monorepo로 구축 주도하고 지점 접근 범위를 server-owned로 전환
- 숨긴 것      헤더명, API 경로, commit 수. 일부 test skip·xfail은 footer에 남김

## 2. 인프라

### azure-topology · 공통 root / 제품군 root × N / 변경 gate
N · `infra.deployment` · owned(운영 범위) · Topology + StateMachine · 표식 없음
- 보여주는 것  제품 root는 공통 registry를 remote state output으로만 참조 / plan에 destroy·replace가 있으면 apply 중단 / 단일 root·hub-spoke 선제 도입
- 포트폴리오   lab에만. 인프라 직군 지원 시 "운영 환경" 절로
- 경력기술서   여러 사내 서비스의 클라우드 배포 환경을 하나의 IaC monorepo에서 공통 root와 제품군·환경별 root로 나눠 운영했다. 제품 root는 공통 registry를 remote state output으로만 참조해 서로의 state를 건드리지 않고, 모든 변경은 state snapshot → plan → live inventory 대조 → destroy/replace 판정 → apply 후 health·log·alert 확인을 거친다. topology 전체를 처음부터 설계한 것은 아니며 기존 resource의 통합과 운영이 범위다.
- 이력서       여러 사내 서비스의 Azure·Vercel 배포 환경 구성과 IaC 기반 기본 운영
- 숨긴 것      제품군 구성(B2B/B2C), root 수, 리소스 목록·수, VM 수, alert 수, state object 수

## 3. AX · 업무 체계 · agent

### thready-ax-pipeline · raw는 wiki에 바로 쓰지 않는다
A/H · `thready.threads-workflow`(설계 owned) · Topology + StateMachine + StateTable · **구현/설계 표식**
- 보여주는 것  wiki에는 승인된 version만, policy는 LLM이 못 바꾼다 / 권한 철회·정정 시 영향 범위 / 모든 자료를 prompt에, Drive를 유일한 Raw Store로
- 포트폴리오   JYP Case 02 첫 번째, 피처링 Case 02 세 번째
- 경력기술서   개인 계정 콘텐츠 운영 AX를 설계하며 외부 raw 원문을 출처·수집 시점과 함께 보관하고, 추출·LLM 제안·운영자 승인을 거친 지식만 역할별 wiki projection으로 노출하는 파이프라인을 정의했다. 운영 제품에는 콘텐츠 가져오기·URL preview·source ownership 검증이 구현돼 있고, curation·승인·projection은 설계 단계로 구분한다.
- 이력서       콘텐츠 제작의 반복 작업을 자료 수집·정체성·초안·검수 역할로 나눈 AX 설계와 제작·검수 workflow 직접 구현
- 숨긴 것      설계 문서 번호, persona, 파일럿 대상

### thready-ax-roles · agent는 gateway를 통해서만 읽는다
A/H · 위와 같음 · Sequence + StateTable · **구현/설계 표식**
- 보여주는 것  gateway가 돌려주는 승인 version만, 평가는 wiki를 직접 덮지 않음, 발행은 사용자가 / 학습 루프 / production Scouter 선제 구현·자동 발행
- 포트폴리오   JYP Case 02 두 번째, 피처링 Case 02 네 번째
- 경력기술서   Scout·Friend·Creator·Guard 네 역할이 계정 범위·권한·승인 version을 거르는 gateway에서 작은 context pack만 받아 쓰도록 계약을 정했다. Friend(정체성 제안)·Creator(writer)·Guard(judge·prompt check)·발행 시점 제안은 운영 구현이고, 자동 소재화 Scout와 장기 memory 승격은 설계로 남겼다. 사람 게이트는 운영자 승인, 개인화 confirm, 발행 선택 세 곳이다.
- 이력서       (위 항목과 한 줄 공유)
- 숨긴 것      tool 이름은 자체 설계 용어라 유지. provider 없음

### mediness-work-division · 판단은 사람이, 맥락과 추천은 agent가
J · `product-operations.ax` · led(제품 단위)·contributed(회사 AX) · Topology + StateMachine + StateTable ×2 · 표식 없음
- 보여주는 것  판단 단계는 사람이 확정, 역할→사람은 조직 서비스가 해소 / 원장 9상태 / 전결표 DB화·단일 장문 문서
- 포트폴리오   JYP Case 01 첫 번째. 백엔드 지원본에는 쓰지 않음
- 경력기술서   제품별 결정·명세·작업·QA·릴리스 기록을 한 흐름으로 운영해 사람과 agent가 같은 맥락을 읽게 했고, 회사 업무의 의사결정 흐름(결정 요청·실행 요청·공유)에서 agent가 맥락을 찾아 수신자를 추천하되 확정은 사람이 하는 구조 설계에 참여했다. 전사 규칙 정의는 다른 저자가 주도했고, 제품 단위 적용·운영을 리드했다.
- 이력서       결정·명세·작업·릴리스 기록을 사람과 AI가 같은 맥락으로 읽는 제품 개발 체계 운영, 회사 AX 설계 참여
- 숨긴 것      사람 이름, 제품 수·이름, 전결 매트릭스, 경영 4축 상세, spec 번호

### thready-agent · 생성 1건이 graph·역할 객체·harness를 지나는 순서
A/D · `thready.generation-quality` + 2026-09-02 등록 사실 · owned · **Flow**(backend/실행 계층/graph/harness 4열, guard 종료·보정 턴·재시도 분기) + StateTable · 표식 없음
- 보여주는 것  역할은 LLM 지능만, 판정은 입력을 아는 자리에, 재시도는 실행 계층이 / 일시 장애만 재시도·상한 소진 FAILED·수동 재시도 / 구 3노드 엔진·map/reduce 압축·자동 failover
- 포트폴리오   JYP Case 02 세 번째, 피처링 Case 02 두 번째
- 경력기술서   AI 생성 파이프라인을 소재 유무 판정·요청 적대성 판정·소스 정규화·생성 위임 네 노드로 두고, writer 역할 객체가 prompt 조립·실행·출구 검증·judge·보정 턴을 소유하게 했다. provider 실패는 값 객체로만 보고하고 재시도 여부는 실행 계층이 판정하며, 상한을 넘기면 정규화된 사유와 함께 FAILED로 남겨 사용자가 수동 재시도한다. friend·referee·scheduler 역할 객체도 같은 규칙으로 구현했다.
- 이력서       AI 생성 파이프라인의 역할 객체·재시도·terminal 실패 경계 설계·구현
- 숨긴 것      노드·함수 이름, 시도 횟수, provider·harness 구현체 이름, DB table명

## 4. 실시간 · 데이터 · 품질

### say-overlap-sessions · 세션 하나가 죽어도 전사가 멈추지 않는다
G · `centurion.say-realtime-ai` · led(이 하위) / co-led(SAY 전체) · Timeline + StateTable · 표식 없음
- 보여주는 것  겹침은 window > stagger에서, 순서는 sequence가 / 세션 종료·timeout은 그 window만 / 단일 세션 + 재연결·기능 정지
- 포트폴리오   피처링 Case 03 옆 "외부 의존성 실패" 사례, JYP Case 02 뒤 (배치 미정)
- 경력기술서   외부 실시간 음성 모델의 세션이 발화 중간에 끊겨 전사가 멈추던 문제를, 겹치는 window로 여러 세션을 시간차로 열고 세션별 버퍼와 sequence로 병합해 기능이 끝까지 동작하게 했다. 동시 세션 수만큼 비용이 늘고 첫 응답이 늦어지는 손실은 문서로 명시했고, 모델 교체 뒤 우회 코드를 걷어냈다. 약 1분 시점 응답 중단의 원인 하나가 자체 재연결 타이머 경합이었음도 찾아 제거했다.
- 이력서       외부 모델 세션 끊김을 겹치는 세션 풀과 순서 보장으로 흡수해 실시간 상담 기능 유지
- 숨긴 것      window·stagger 초, 풀 크기, 성공률, 첫 응답 시간, 모델·provider 실명

### sequence-fence · 늦은 보정이 다른 turn을 덮지 않는다
G · 위와 같음 · Sequence · 표식 없음
- 보여주는 것  보정은 자기 sequence만 바꾼다 / 오래된 seq의 보정이 늦게 도착 / 도착 순서로 최신 판정·보정 대기
- 포트폴리오   ①과 나란히 "같은 습관" 근거. 지원본에는 ⑩과 함께
- 경력기술서   실시간 전사의 DELTA·COMPLETE·CORRECTED를 같은 sequence로 묶어, COMPLETE 뒤 비동기로 늦게 오는 보정이 자기 turn만 교체하고 이후 turn을 덮지 않게 했다. DELTA는 교체형 buffer와 domain keyword trigger로 조언 판단을 발화 중에 먼저 시작하고, COMPLETE는 확정 문장으로 승격해 판단·저장에 쓴다.
- 이력서       (⑩과 한 줄 공유)
- 숨긴 것      E2E 건수, 상담 길이

### split-migration · 리허설 → FK 순서 copy → 지문 대조 → 기능 E2E gate
D · `thready.ai-boundary`(migration) · owned · **Flow**(원본 DB/절차/독립 DB 3열, gate마다 중단 노드) · 표식 없음
- 보여주는 것  검증되지 않은 replica로 cutover하지 않는다, health 2xx는 기능 증명이 아니다 / 영구 cross-DB link·count만 검증·무중단 주장
- 포트폴리오   ① 옆 보조. 데이터 직군 지원 시 앞으로
- 경력기술서   AI 실행 데이터를 제품 DB에서 독립 DB로 옮기며 STG dump를 local에 복원해 migration을 먼저 리허설하고, FK 순서로 streaming copy한 뒤 건수와 상태·사유를 결합한 hash를 양쪽에서 대조하고 orphan을 검사했다. 배포 뒤 health가 정상인데 실제 생성이 실패한 사례를 겪고, 대표 생성 경로 E2E를 post-deploy 조건으로 명시했다.
- 이력서       STG 이관을 FK 순서 copy와 지문 대조로 검증하고 기능 E2E를 배포 gate로 추가
- 숨긴 것      table별 건수(claim allowed_copy에는 있음), Prod 이관 여부

### rebuild-decision · 돌아가는 기능을 왜 다시 만드는가
B · `thready.rebuild-decision-execution` + `thready.qa-reopen-reduction` · owned · Compare(부분 수정 vs 병렬 재구축) + StateMachine(실행 순서) · 표식 없음
- 보여주는 것  돌아가는 서비스를 멈추지 않는다, 규칙(패턴·계층·하네스)을 먼저 세운다 / 재발 누적·회귀 범위 확대·규칙 없는 AI 생성 / 관측: reopen 37% → 11%
- 포트폴리오   피처링·JYP Case 02 첫 번째 후보 (가장 센 후킹인데 아직 미연결)
- 경력기술서   인계받은 초기 제품이 수정할수록 같은 영역에서 다른 형태로 재발하고 AI 확장 지점이 없어, 서비스가 작을 때 backend만 FastAPI로 병렬 재구축하고 frontend는 유지하기로 판단하고 팀을 설득했다. 디자인 패턴·컴포넌트 설계·하네스를 먼저 세팅한 뒤 그 규칙 위에서 파악·기능 정의·재구축·FE 호출 전환을 진행했고, cutover 뒤 같은 정의로 QA reopen을 계속 측정했다.
- 이력서       인계받은 prototype backend를 프런트엔드를 유지한 채 FastAPI로 병렬 재구축·전환, QA reopen 37%→11%
- 숨긴 것      작업 시간(36시간, 달력 기간 오독 방지), commit 수. 전임 폄하 표현 금지

### stripe-prepayment · local 확정 뒤 provider capture, 실패하면 provider를 되돌린다
K · `career.memento-stripe-prepayment`(led) + `career.memento-payment`(contributed) · Flow(예약 API/local 원장/provider 3열) + StateMachine(환불 순서) · 표식 없음
- 보여주는 것  local 원장이 먼저, provider는 따라가고 어긋나면 provider를 되돌린다, 티켓은 환불 완료 뒤에만 / requires_capture → cancel · succeeded → refund / 즉시 capture·요청 시점 티켓 삭제
- 포트폴리오   백엔드 지원본의 supporting. Centurion worker 설계의 배경으로 연결
- 경력기술서   예약·결제 backend에서 manual capture 선결제 slice를 구축해 local transaction id를 provider metadata에 실어 결제 이력과 event를 연결했고, 예약 처리 실패 시 provider 상태에 따라 cancel 또는 refund하는 보상 처리를 두었다. 환불은 결제 수단 확인 → 이력 환불 → 마일리지 복원 → 티켓 삭제 순서로 정리하고 티켓 삭제를 환불 완료 시점으로 옮겼다. webhook 중복 제거와 DB·provider atomic transaction은 검증 범위 밖이라 완전한 rollback으로 표현하지 않는다.
- 이력서       Stripe 선결제와 provider 보상 처리로 예약·결제 상태 정합성 보완
- 숨긴 것      고객사, 회사 결제 시스템 전체 ownership 표현

### agent-prototype · planner는 계획만, 실행은 등록된 capability만
I · `thready.conversational-editorial-agent-prototype` · owned · Flow(사용자/agent/registry·tool/원장 4열) · 표식(Mock gateway = 설계)
- 보여주는 것  planner는 실행 권한이 없다, 미등록 action은 실행되지 않는다, 외부 상태 변경은 typed confirmation + receipt를 통과할 때만 / 모호한 mutation 미실행 / multi-agent·message 개수 절단
- 포트폴리오   JYP Case 03 (손으로 그린 상자를 이 도식으로 교체)
- 경력기술서   Thready 기능을 대화로 제어하는 prototype에서 single-agent planner-executor를 구성했다. planner는 typed plan만 만들고 capability registry가 등록·일치를 확인한 뒤 domain tool을 dispatch하며, 예약·발행·삭제 같은 상태 변경은 다음 turn의 typed confirmation과 receipt idempotency를 통과할 때만 Mock 상태를 전이한다. 대화·turn·tool result·artifact version을 분리한 원장과 token-aware compaction으로 새로고침 뒤에도 복원된다.
- 이력서       Thready 기능을 대화로 제어하는 Agent prototype 설계·구현·검증
- 숨긴 것      action 이름 목록, test 건수, SQLite 등 저장소 구현

### idempotent-importer · 같은 파일을 두 번 넣어도 결과가 같다
H · `thready.data-quality` · owned · Compare · 표식 없음
- 보여주는 것  적재는 몇 번을 돌려도 같은 상태로, 사람 평가는 지워지지 않는다 / malformed batch rollback / append 후 중복 제거·실패 row 건너뛰기
- 포트폴리오   피처링 Case 01 설계 섹션 후보 (현재 미연결)
- 경력기술서   대량 corpus를 사람 평가 workflow에 넣는 importer를 typed batch 검증, (source, source_key) upsert, source post 단위 continuation replace, 평가자별 최신 라벨 보존으로 구성해 재적재와 증분 병합이 멱등하도록 했다. local 격리 DB에서 전체 corpus를 두 번 적재해 건수 불변과 라벨 보존을 확인했다.
- 이력서       SNS 관측 데이터를 성과 기준과 재적재 가능한 사람 평가 workflow로 전환
- 숨긴 것      corpus 건수, 이어쓰기 건수, STG·Prod 적재 완료 여부

### quality-layers · 프롬프트와 게이트는 바닥만 높인다
I/H · `thready.quality-criteria-system`(후보) · owned · 층 Boundary + StateTable · 표식 없음
- 보여주는 것  아래층 못 넘으면 위층을 묻지 않는다, 자동화는 바닥에만 / 자사 출력 되먹임 기준 / 글자 수 상한 지시
- 포트폴리오   JYP Case 02·03 사이 후보. AI 품질 직군 지원 시 앞으로
- 경력기술서   AI 글 품질을 틀리지 않았는가(결정적 게이트)·플랫폼다운가(실측 분포 대조)·통하는가(사람 합의) 세 층으로 나눠 아래층을 통과해야 위층을 묻게 했다. 축을 먼저 정하고 근거를 붙여 채점하며, 기준값이 자사 출력의 되먹임이었음을 재실측으로 발견해 교정했고 반증된 접근은 지우지 않고 남겼다.
- 이력서       AI 글 품질을 자동 게이트·분포 대조·사람 판정 3층으로 계량화하고 측정 기준을 재실측으로 교정
- 숨긴 것      6축 점수 값, 표본 수, 제3자 계정·게시물

---

## 회사별 배치 현황 (2026-09-03)

| 지원본 | Case | designs 순서 |
| --- | --- | --- |
| 피처링 | 01 SNS 데이터 | idempotent-importer → quality-layers |
| 피처링 | 02 Thready 재구축 | rebuild-decision → outbox-delivery → thready-agent → thready-ax-roles |
| 피처링 | 03 주문·알림 | bay-worker → say-overlap-sessions |
| 피처링 | 04 template | transaction-template |
| JYP | 01 Backend 기준 | mediness-work-division → transaction-template |
| JYP | 02 Thready | thready-ax-pipeline → thready-ax-roles → rebuild-decision → thready-agent |
| JYP | 03 agent prototype | agent-prototype (TO-BE 자리, 손그림 대체) |
| lab only | — | tenant-boundary · azure-topology · sequence-fence · split-migration · stripe-prepayment · thready-ax-pipeline(피처링 미사용) · outbox-delivery(JYP 미사용) |

배치 원칙(2026-09-03): 케이스당 2장이 기본, 핵심 케이스(Thready 02)만 4장. 피처링은 백엔드 판단·정합성 먼저, AX는 역할 그래프 한 장만 끝에. JYP는 AX 2장 먼저, Outbox 같은 백엔드 세부는 제외.

## 항목별 시각화 검토 모음 (2026-09-07)

[Portfolio Visual Library](prototypes/visual-library-2026-09/README.md)는 24개 항목을 한 장씩 검토하는 별도 HTML·SVG 초안이다. 제품화·백엔드·실시간 AI·검색·인프라·개인 구축을 포괄하며, claim별 근거와 구현 범위는 모음의 mapping에서 연결한다. 기존 회사별 제출본과 공개 route에는 아직 적용하지 않는다. 전체 모음에서 JD에 맞는 그림만 선별하며, 기존 배치표를 일괄 교체하지 않는다.

## 관련

- [Application Copy Standard](../../rules/application-copy-standard.md) — §2-1 도식 공개 수준
- [Resume Block Library](../resume/resume-block-library.md) — 블록 문안
- [Claim Registry](../../evidence/claims/README.md)
- [Portfolio README](README.md)
