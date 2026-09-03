---
type: inventory
title: Initial Resume And Portfolio Case Inventory
description: 검증된 작업을 JD별로 재사용할 flagship dossier와 supporting proof block 후보로 나눈 초안.
status: draft
timestamp: 2026-08-31
tags: [backlog, resume, portfolio, cases, visualization]
---

# Initial Resume And Portfolio Case Inventory

이 문서는 선택·조립 구조를 검토하기 위한 backlog 초안이다. 사실과 공개 표현 강도는
`profile/`과 `evidence/claims/`가 소유하며, 현재 portfolio case의 canonical 문안은
[Case Library](../../products/portfolio/cases/README.md)가 소유한다.

## Case Unit

하나의 case는 기능 하나가 아니라 아래 질문에 독립적으로 답할 수 있는 작업 단위다.

1. 무엇이 문제였는가.
2. 어떤 제약과 대안을 비교했는가.
3. 김대정이 어디까지 판단·구현·검증·운영했는가.
4. 어디서 실패할 수 있고 어떻게 복구하는가.
5. 무엇이 달라졌으며 어디까지 주장할 수 있는가.

각 case는 `resume_summary`, `portfolio_detail`, `claim_ids`, `role_tags`,
`visual_contract`를 함께 가져야 한다. 시각화는 장식이 아니라 문제·판단·책임·실패·검증 중
최소 하나를 문장보다 빠르게 증명해야 한다.

## Flagship Dossier Candidates

| ID | Case | 채용사가 판정할 능력 | 핵심 시각화 |
| --- | --- | --- | --- |
| `THR-PRODUCT` | Thready 아이디어 제안 → 제품화 → 유료 운영·직접 구현 | 고객 문제를 기능 우선순위와 backend·AI·핵심 frontend로 바꾸고 cross-functional release·운영까지 닫는다 | `고객 문제 → 제품 판단 → 구현 범위 → QA/release → 유료 운영` product operating loop + 담당 범위 overlay |
| `THR-REBUILD` | 초기 prototype backend의 FastAPI 병렬 재구축·cutover | 돌아가는 제품을 멈추지 않고 구조 전환 기준을 세우고 검증하며 production으로 옮긴다 | 기존/전환 architecture 비교 + validation harness·cutover timeline + QA reopen 변화 |
| `THR-DATA-QUALITY` | SNS data outcome 설계·corpus 이관·labeling·품질 판정 | 모호한 콘텐츠 품질을 data identity·history·rubric·human evaluation으로 계량 가능한 운영 체계로 바꾼다 | source → latest/history → outcome 후보 → corpus → human label → judge의 data lineage와 feedback loop |
| `THR-AI-BOUNDARY` | AI application·DB 분리, migration, transactional Outbox | 서비스·데이터 책임을 분리하고 migration과 비동기 전달의 정합성·복구 경계를 설계한다 | product BE transaction → Outbox → lease/attempt → AI replica sequence + retry·terminal failure state machine |
| `THR-AGENT` | 생성 planner/writer 재배치와 대화형 editorial agent prototype | agent가 실행할 수 있는 capability와 사람이 승인할 decision right를 분리한다 | conversation → planner → typed capability registry → confirmation gate → operation → state ledger |
| `CEN-ASYNC` | 주문·재고 backend와 RabbitMQ·TaskIQ worker 복구 경계 | API transaction과 실패 가능한 후속 작업을 분리하고 retry·최종 실패·수동 재처리를 제품 상태로 만든다 | order transaction → queue → worker → notification sequence + PENDING/FAILED/retry/manual state machine |
| `CEN-REALTIME` | 실시간 AI 상담 session·STT event·provider evaluation | WebSocket session lifecycle과 지연·중복·순서 역전 가능한 realtime event를 운영 가능한 상태로 다룬다 | session lifecycle timeline + DELTA/COMPLETE/CORRECTED event ordering + early trigger/provider boundary |
| `NEX-OPS` | 여러 피부과의 운영·예약 backend와 권한 경계 | 현장 운영 요구를 multi-brand service boundary·migration·server-owned authorization contract로 바꾼다 | Admin/Homepage service map + working branch auth state transition + migration boundary |
| `BET-STANDARD` | 조직 표준 FastAPI template·transaction/session·agent context | 사람과 coding agent가 같은 계층·의존성·transaction·검증 규칙에서 개발하도록 실행 가능한 기본값을 만든다 | layered dependency map + transaction propagation/SAVEPOINT·owner-task guard + team adoption flow |
| `MED-OPS` | Decision→SPEC→Work→Release 제품 운영과 회사 AX 구조 | 제품 판단과 회사 업무를 source of truth·human gate·agent-readable context로 연결한다 | decision → spec → work package → approval/release → evidence feedback control plane + human/agent swimlane |
| `MEM-PAYMENT` | manual-capture 선결제·provider 보상·환불 완료 상태 | 외부 결제와 local transaction의 불일치를 상태 전이와 보상 처리로 통제한다 | 예약/결제 sequence + local/provider state matrix + cancel/refund compensation branch |
| `SEL-PRODUCT` | 생성형 AI 제품 prototype → v1.0 → 기업 PoC·특허 | 고객·비즈니스 요구를 제품 범위와 기술 검증 항목으로 바꿔 0→1 delivery를 이끈다 | prototype → v1.0 → enterprise PoC → patent/CES timeline + 요구→제품·기술 spec translation |

## Supporting Proof Blocks

아래 작업은 현재도 공개 가능한 근거가 있지만, 독립 dossier보다 위 flagship의 특정 역량을
보강하거나 JD가 직접 요구할 때 선택하는 편이 강하다.

| ID | Proof block | 연결할 dossier | 핵심 시각화 |
| --- | --- | --- | --- |
| `THR-FRONTEND` | 콘텐츠 생성·가져오기·예약·발행·dashboard·admin·labeling의 Next.js workflow 직접 구현 | `THR-PRODUCT`, `THR-DATA-QUALITY` | 사용자·운영자 journey와 backend/data ownership map |
| `THR-PROVIDER` | 외부 AI model 5xx 분류·retry·최종 실패·사용자 재시도·model 일시 제외 | `THR-DATA-QUALITY`, `THR-AI-BOUNDARY` | provider failure decision tree와 continuity route |
| `CEN-DAY` | 예약 정책을 backend 판단·frontend 표시·QA seed/test·release docs로 전달 | `MED-OPS`, `NEX-OPS` | 정책 하나가 BE→FE→QA→release로 전파되는 contract trace |
| `CEN-RAY` | 시설 현황·긴급 호출·주문 연동 backend 기여 | `CEN-ASYNC` | emergency event와 product service 연동 흐름 |
| `CEN-SSO` | multi-service SSO session·duplicate login·E2E | `CEN-REALTIME`, `NEX-OPS` | login/session state와 service boundary |
| `NEX-POOL` | connection pool timeout 원인 분석과 pool·session lifecycle 재조정 | `NEX-OPS` | request→session→pool contention cause chain. 효과 수치는 재측정 전 제외 |
| `NEX-QUALITY` | Ruff·Pyright·pre-commit 품질 자동 검증과 domain audit | `NEX-OPS`, `BET-STANDARD` | local change → static checks → review/release gate pipeline |
| `NEX-IAC` | Terraform IaC와 서비스 배포 환경 구성 | `NEX-OPS` | product deployment topology. infrastructure architecture 전문성으로 확대하지 않음 |
| `MEM-HAPPYCALL` | 다국어 알림 즉시·예약 발송, Celery 취소·재등록·이력 | `MEM-PAYMENT` 또는 별도 scheduling supporting case | schedule create/change/cancel/send lifecycle |
| `DAY-FOUNDATION` | 법인 설립 전 Centurion 초기 backend·repository·환경·문서·ISSUE/PR 기준 수립 | `BET-STANDARD`, `CEN-ASYNC` | 초기 제품 code와 engineering system이 함께 생긴 foundation timeline |
| `UX-PRACTICE` | 사용자 흐름 문제를 개선 가설·요구사항·Figma artifact로 구체화 | `THR-PRODUCT`, `SEL-PRODUCT` | pain point → hypothesis → prototype → shared product outcome |
| `TELLINGME` | Spring Boot backend와 AWS 배포·monitoring | Backend/early-stage 지원본 | client→backend→AWS deployment topology. 현재 stable claim 범위만 사용 |

## Evidence Or Positioning Hold

| 후보 | 현재 상태 | 승격 조건 |
| --- | --- | --- |
| MEDINESS daily briefing 직접 구축 | public false, ownership 미확인 | Git author와 실제 구축·운영 범위 재검증 |
| SellerCanvas Node.js→NestJS backend 개선 | self-report 중심, stable backend claim 없음 | repository 근거·migration 범위·contribution boundary 확인 |
| TellingMe BFF·Mock API·domain contract | code-backed signal은 있으나 제품 판단 ownership 미분리 | 전달받은 요구와 직접 결정한 범위 분리 후 claim 신설 |
| Kidsly·EatUp의 구체 제품 기획·PM 작업 | self-report이고 전용 claim 없음 | 원 source·역할 분담·결과 확인, 인턴 기여 상한 설정 |
| 회사 Azure topology | 내부 evidence는 강하지만 primary 전문성 positioning과 불일치 | 배포·환경 구성·기본 운영 proof로만 사용. infrastructure flagship으로 승격하지 않음 |
| production scraping·지속 ETL·traffic scaling | 현재 지원 과정에서 확인된 gap | 실제 production ownership과 freshness·backfill·schema drift·성능 지표 확보 |

## Next Cut

1. flagship 12개에서 서로 겹치는 문장을 제거하고 dossier와 proof block 경계를 확정한다.
2. 각 dossier의 `resume_summary`를 3–5줄, `portfolio_detail`을 공통 8-section contract로 작성한다.
3. 시각화는 각 dossier당 hero visual 1개와 필요한 failure/state 확대도만 둔다.
4. Backend·AI Product Backend·Product Ownership·AX/FDE preset이 선택할 기본 ID와 순서를 정한다.
