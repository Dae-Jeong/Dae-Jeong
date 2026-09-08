---
type: prototype
title: Portfolio Visual Library Review
description: 검증된 경험을 항목별로 검토하기 위한 로컬 HTML·SVG 시각화 라이브러리.
timestamp: 2026-09-07
tags: [portfolio, visualization, review]
---

# Portfolio Visual Library

[시각화 모음 열기](index.html) — 선택 메뉴 또는 좌우 버튼으로 24개 도식을 한 장씩 검토한다.

[제품화 도형 표현 비교](product-shapes.html) — 동일 제품화 claim을 셰브런 업무 흐름·방사형 구현 범위·독립된 매출 강조로 표현한 비교 시안. 도형의 크기는 비율·측정값을 뜻하지 않으며, 서버 topology가 아닌 제품과 기여의 관계다. 아래 1번의 claim mapping을 그대로 소비한다. 기존 도식·스킬은 교체하지 않는다.

[내부 동작 모음 열기](details.html#transaction) — 승인된 Outbox의 책임 경계·판정행 정렬을 다른 사례로 확장했다. 22개 상세 도식과 기존 Outbox·Azure 구성도 2개를 같은 메뉴에서 검토한다. 상단 링크로 같은 항목의 요약 구성도와 비교할 수 있다. 상태·실패 처리는 흐름으로, 전사는 시간축으로, 재적재·품질·개발 기본값은 책임 비교표로 표현한다. 사실·claim·진행 상태는 아래와 동일하며 기존 요약본은 보존한다.

[Outbox 내부 동작 상세](outbox-detail.html) — 기존 구성도를 보존한 비교 초안. 원장·Outbox 트랜잭션, Relay 점유·토큰 확인, 수신 버전 판정과 중단·늦은 완료·재전송 분기를 한 장에 담았다. 사실 근거는 `thready.ai-replica-outbox` 및 [전달 경계 evidence](../../../../evidence/projects/thready.md#ai-service-boundary-and-durable-delivery). 마지막 허용 시도의 worker 중단은 lease 만료 뒤 최종 실패로 보존한다. 응답 유실은 구현된 멱등 경계를 설명하는 시나리오이며 운영 사고 이력을 주장하지 않는다. PC 1440×1000 렌더·라벨 겹침 검사를 통과했고 PDF는 별도 검증 전이다.

공개 사이트나 제출 패키지를 변경하지 않는 검토용 표현이다. 모든 도식을 한 지원서에 넣기 위한 구성이 아니다. 현재 portfolio diagram library의 핵심 기술 사례와 신규 verified claim을 모아 회사·직군별로 선택할 수 있게 했다. 프로필의 모든 사실을 도식으로 바꾸지는 않는다.

- 표현 원본: `index.html`, `style.css`, `diagrams.js`, `infrastructure.html`, `outbox-detail.html`; 상세 모음은 `details.html`, `details.css`, `details.js`. 항목 메타데이터는 `diagrams.js`를 공유한다.
- 사실 원본: 아래 claim registry. 이 파일과 그림은 사실의 canonical owner가 아니다.
- 서버 구성도: `render-server-architecture` workflow. 나머지는 관계에 맞는 흐름·시간축·상태·계층 표현.
- Azure 자산: `app/fe/public/azure`에서 동일 SVG를 복사. [공식 출처](https://learn.microsoft.com/en-us/azure/architecture/icons/). 다른 cloud resource를 추가하지 않았다.
- 인프라 배치는 앞서 검토한 Thready v3를 재사용했다. 그룹은 논리적 소유권이며 사설 네트워크·복제 수를 주장하지 않는다.
- 화면 목표: PC 1440×1000. A4 landscape CSS는 있으나 실제 PDF 출력은 별도 검증 전이다.
- 상세 모음 검증: 24항목 PC 1440×1000 실제 렌더와 스크린샷 확인, 본문 높이 957px 이내(Outbox 993px 이내), 신규 SVG 텍스트 간 겹침 없음. 트랜잭션의 소유권 검사 이후 SQL 경로와 모든 전사 세션의 버퍼 연결을 추가 점검했다. JavaScript 구문 검사·로컬 HTTP 200·workspace verify PASS. PDF와 회사별 공개 route 적용은 범위 밖이다.

## 항목과 근거

| # | 화면 | Canonical claim | 표현·검증 범위 |
| --- | --- | --- | --- |
| 1 | [유료 제품화](index.html#product) | `thready.product-zero-to-one-contribution`, `thready.threads-content-workflow-automation`, `thready.subscription-revenue-band`, `thready.frontend-product-delivery` | 초기 시제품 이후 제품화. 월 매출은 2026.08 제품·팀 성과 |
| 2 | [서비스 소유권](index.html#boundary) | `thready.ai-service-boundary` | 직접 구현, STG·Prod 운영 |
| 3 | [Outbox 전달](index.html#outbox) | `thready.ai-replica-outbox` | transaction·retry·version fence. exactly-once 주장 없음 |
| 4 | [트랜잭션·세션](index.html#transaction) | `be-template.fastapi-sqlalchemy-standard` | propagation·owner-task·cleanup 구현 |
| 5 | [상태와 동시성](index.html#concurrency) | `thready.generation-aggregate-optimistic-lock` | 생성 aggregate 한정 |
| 6 | [사용량 예약](index.html#quota) | `thready.generation-quota-admission` | 예약 및 확정/해제 규칙 |
| 7 | [비동기 주문 알림](index.html#worker) | `centurion.bay-async-backend`, `centurion.async-migration` | 구축 주도. 큐 제품·외부 채널 비노출 |
| 8 | [결제 보상](index.html#payment) | `career.memento-stripe-prepayment` | manual capture 및 상태별 보상. DB·외부 원자성 주장 없음 |
| 9 | [중첩 전사 세션](index.html#speech) | `centurion.say-realtime-ai` | 우회책 및 제거 판단. 모델·시간 파라미터 비노출 |
| 10 | [전사 보정 순서](index.html#sequence) | `centurion.say-realtime-ai` | sequence 기반 정확한 발화 교체 |
| 11 | [이관 검증](index.html#migration) | `thready.ai-service-migration` | STG. Prod migration 완료 아님 |
| 12 | [작업 지점 권한](index.html#tenant) | `nexus.branch-access-boundary` | Admin 경계 진행 중, Homepage 기존 계약 유지 |
| 13 | [생성 엔진 경계](index.html#generation) | `thready.langgraph-generation-graph` | graph 구현·운영, 공통 검증 및 엔진 비교 |
| 14 | [평가 보존 importer](index.html#labeling) | `thready.labeling-corpus-workbench` | 독립 schema·관리 화면, 로컬 반복 적재 검증 |
| 15 | [품질 판단 층](index.html#quality) | `thready.quality-criteria-system`, `thready.measurement-correction` | 제품화의 보조 실험. 매출과 직접 인과 없음 |
| 16 | [백엔드 재구축](index.html#rebuild) | `thready.rebuild-decision-execution`, `thready.backend-rebuild` | 병렬 재구축·기능 전환 |
| 17 | [개발 기본값](index.html#template) | `be-template.team-leverage`, `be-template.agent-context` | template 직접 구축, 기능 담당자 지원 |
| 18 | [검색·판정 경계](index.html#rag) | `procedure-hub.hybrid-retrieval-design` | 진행 중. answer adapter 임상 검수 대기 |
| 19 | [지식 공개 경계](index.html#publication) | `procedure-hub.canonical-data-platform` | 진행 중, cutover 완료 아님 |
| 20 | [대화형 편집 Agent](index.html#agent) | `thready.conversational-editorial-agent-prototype` | 독립 prototype, 운영 명령은 Mock |
| 21 | [개인 Kubernetes](index.html#kubernetes) | `infra.k8s-lab-rebuild` | 개인 Mac 직접 구축. 회사 production 경험 아님 |
| 22 | [서버 인프라](index.html#infrastructure) | `thready.ai-service-boundary`, `infra.company-azure-ownership`, `infra.workload-runtime-topology`, `infra.azure-observability` | 기존 운영 근거의 공개 참조 구성 |
| 23 | [인프라 변경 통제](index.html#infra-change) | `infra.terraform-state-safety`, `infra.ai-assisted-change-harness` | state·plan·live 대조, 무인 apply 아님 |
| 24 | [제품 운영·AX 설계](index.html#operations) | `mediness.product-operations`, `mediness.product-development-coordination-leverage`, `mediness.company-work-ax-design` | 제품 운영 리드와 회사 AX 설계 참여를 분리 |

Claim 파일은 [claims 원장](../../../../evidence/claims/)에서 찾는다. 원장의 public·ownership·forbidden copy가 그림보다 우선한다.

## 합치거나 별도로 그리지 않은 항목

- 기존 `azure-topology`의 runtime 및 변경 경계를 22·23으로 분리했다.
- `mediness-work-division`은 24, `quality-layers`는 15에 대응한다.
- 기존 `thready-ax-pipeline`·`thready-ax-roles`는 현재 claim과 구현·설계 상태가 섞여 있어 별도 운영 아키텍처로 재출력하지 않았다. 구현된 제품 흐름은 1, 검증된 prototype의 명령 경계는 20으로 보여준다. 원래 설계 전체를 구현한 것으로 합치지 않는다.
- 자격·수상·파트너십·Java 학습 이력은 경력 항목이며, 연결 구조를 추가로 지어내 도식화하지 않는다.
- 별도 시스템 구조 근거가 충분하지 않은 개별 제품 연동·이전 경력은 기존 문안의 근거 범위를 유지한다.

## 검토 방법

이 디렉터리를 정적 HTTP 서버로 열고 `index.html`에서 선택한다. 외부 데이터 요청·새 라이브러리·게시 작업은 없다. 화면의 scope 줄은 검토 시 구현 상태와 역할을 확인하는 용도이며 최종 지원 문서의 제목·목차로 자동 복사하지 않는다.

## 검증 기록

- 2026-09-07 요약 보강: 24개 상단 설명에 해당 경험의 문제·판단·구현 기전을 복원했다. 도식 배치는 유지하고 Outbox·상태 전이·주문 알림·생성 엔진 라벨을 구체화했다. 24개 PC 레이아웃 검사와 대표 6개 화면 재촬영·시각 검수를 수행했으며, 텍스트 겹침·viewBox 이탈·한 화면 높이 초과는 없었다. 근거의 역할·구현 상태는 변경하지 않았다.
- 2026-09-07: Orca PC 1440×1000에서 24개 항목을 렌더·촬영하고 구성, 연결선, 라벨, 경계 여백을 검토했다.
- 공통 flow의 아이콘 관통, 결제 분기의 라벨 겹침, importer의 좌우 선 높이, 인프라 iframe의 하단 잘림을 수정했다.
- 최종 브라우저 검사: 24개 항목의 SVG 텍스트 겹침·viewBox 이탈·페이지 높이 초과 0건. 인프라는 별도 iframe 내부 렌더도 확인했다.
- `node --check diagrams.js` 통과. `make verify`의 wiki scope 통과.
- 공개 페이지·기존 회사별 제출본 변경 없음. 실제 PDF 검증과 회사별 최종 선택은 아직 수행하지 않았다.
