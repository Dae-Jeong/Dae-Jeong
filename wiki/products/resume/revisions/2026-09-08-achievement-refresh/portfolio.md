---
type: content-draft
title: Common Portfolio Achievement Refresh
description: 고객 문제와 제품 구현을 중심으로 재구성한 공용 포트폴리오 내용 검토 초안.
timestamp: 2026-09-08
status: content-review
approved: false
canonical: false
tags: [portfolio, common, achievement-refresh, content-review]
---

# Portfolio

김대정 · Tech Lead · Backend Engineer · AI Product Systems

[marin.backend@gmail.com](mailto:marin.backend@gmail.com) · [github.com/Dae-Jeong](https://github.com/Dae-Jeong) · [marinkim.xyz](https://marinkim.xyz)

가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.

<!-- claims: career.ai-pm-backend-continuity thready.product-zero-to-one-contribution thready.frontend-product-delivery be-template.backend-standard be-template.team-leverage -->
기획자로 시작해 백엔드로 왔고, 크리에이터의 Threads 운영을 돕는 제품의 아이디어를 제안해 백엔드·AI와 핵심 화면을 구현하고 출시·운영을 리드했습니다. 이 과정에서 고객의 결정을 시스템의 상태·권한·실패 처리로 옮기고, 팀원도 같은 기준으로 제품을 만들 수 있는 백엔드 템플릿을 구축했습니다.

## 01. 크리에이터의 새로운 채널 운영을 제품으로

Thready · MediSolve AI · 제품화·운영 리드 / 백엔드·AI 직접 구현 / 핵심 화면 구현

### 시작할 시간과 경험이 부족한 고객

<!-- claims: thready.creator-adoption-context thready.product-zero-to-one-contribution thready.threads-content-workflow-automation -->
고객은 이미 Instagram·YouTube·블로그를 운영하는 크리에이터였습니다. Threads도 잘 운영하고 싶지만 기존 채널에 쓰는 시간이 많고, 다른 문화와 알고리즘에 맞춰 무엇을 어떻게 시작할지 어려워했습니다.

Thready의 역할을 단순한 글 생성이 아니라 새로운 채널을 꾸준히 운영하도록 돕는 제품으로 잡았습니다. 아이디어를 제안하고 초기 프로토타입 이후 자료 활용·초안 생성·검수·예약·발행을 하나의 사용 흐름으로 연결했으며, 기획·QA·마케팅과 우선순위와 품질 기준을 정해 출시·운영을 리드했습니다.

<!-- claims: thready.frontend-product-delivery thready.generation-quality-system thready.agent-pipeline-design career.coding-agent-usage -->
제품 백엔드와 AI 생성·평가 시스템을 직접 구축하고 핵심 사용자·관리 화면은 coding agent로 완성했습니다. 생성 파이프라인에서는 글의 유형을 결정하는 역할과 작성 역할을 나눴습니다. AI 검수의 점수·통과 여부·사유·개선안을 이력으로 남기고, 고객이 최종 수정과 발행을 결정하도록 했습니다.

<!-- claims: thready.customer-follower-growth thready.subscription-revenue-band -->
제품을 이용하며 꾸준히 Threads를 운영한 고객 한 명은 팔로워가 기존 대비 10배 이상 늘었습니다. 팀과 출시·운영한 제품에는 2026년 8월 기준 월 1천만원 수준의 구독 매출이 발생했습니다.

### 소재 활용에서 승인까지 연결한 최근 구현

<!-- claims: thready.youtube-source-reuse thready.auto-generation-approval-flow thready.approval-command-consistency -->
기존 YouTube 채널의 소재를 정기 동기화하고 시간표에 맞춰 초안을 준비해, 고객이 알림에서 수정·예약·발행을 결정하는 흐름을 구현했습니다. 제품의 각 기능을 호출하는 것뿐 아니라 중복 편성, 소재 소비, 고객 결정이 저장되는 단위를 함께 다뤘습니다.

| 처리 단계 | 구현한 기준 |
| --- | --- |
| 소재 가져오기 | 외부 채널 조회와 짧은 DB 반영을 분리하고, 계정별로 성공적으로 쓴 소재를 제외. 사용 가능한 소재가 없으면 반복 사용하지 않고 중단 |
| 초안 편성 | 시간표 슬롯별 원장으로 중복 편성을 통제하고 생성 상태와 승인 알림 상태를 따로 관리 |
| 고객 결정 | 수정본·승인 결정·예약 또는 발행 작업을 한 트랜잭션으로 확정. 명령 ID와 내용 지문으로 같은 요청의 재전송을 기존 결과로 처리 |

동시 편성과 승인 재전송을 통합 테스트로 다뤘습니다. 로컬 실제 모델 실행에서는 생성 이력·초안·승인·알림의 연결과 소재 고갈 시 후속 작업이 늘어나지 않는 것을 확인했습니다.

### 발행 결과를 모를 때의 복구

<!-- claims: thready.publish-recovery-boundary -->
외부 발행 요청에 응답이 없다고 해서 게시되지 않았다고 볼 수는 없었습니다. 호출 전 실패와 호출 후 결과 불명을 나누고, 이미 시작한 발행을 새로 만드는 대신 기존 발행 시도와 이어쓰기 기록에서 재개하도록 구현했습니다.

| 상황 | 처리 경계 |
| --- | --- |
| 외부 발행 전에 실패 | 발행 시도 전 실패로 분류 |
| 호출 후 결과 불명 | 기존 발행 컨테이너로 재개하고 이미 발행된 이어쓰기는 건너뜀 |
| 오래된 워커가 뒤늦게 응답 | 점유 기한과 시도별 토큰을 검사해 오래된 시도의 상태 변경을 통제 |
| 작업을 실패로 종결 | 작업·콘텐츠·실패 알림 기록을 같은 트랜잭션으로 확정 |

### 제품 원장과 AI 실행의 분리

<!-- claims: thready.ai-service-boundary thready.ai-replica-outbox thready.ai-service-migration -->
AI 생성의 확장과 실패가 제품 정책·원장에 결합되지 않도록 애플리케이션과 DB를 분리하고 인증된 HTTP 계약으로 연결했습니다. 이때 원장 변경만 성공하고 전달 기록이 사라지는 문제를 피하기 위해 원장 변경과 Outbox 기록을 같은 트랜잭션으로 저장했습니다.

전달 워커는 기한이 있는 점유로 작업을 가져가고, 시도별 토큰으로 이전 워커의 갱신을 통제합니다. 수신 측에서는 전달 버전과 멱등 처리를 적용해 중복·역순 전달을 다루고, 시도 상한에 도달한 실패는 남겨 운영자가 확인할 수 있게 했습니다.

독립 AI 애플리케이션·DB를 운영하며, STG 이관에서는 부모·자식 순서의 데이터 복사 뒤 행 수·데이터 지문·참조 관계를 대조했습니다. 배포 상태 확인에 더해 실제 생성 API의 사용자 흐름을 검증했습니다.

기술: Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · LangGraph · TypeScript · Next.js

## 02. 업무 정책을 실행 가능한 백엔드로

피부과 운영 제품군 · MediSolve AI · 주문·재고 및 세션 v2 주도 / 실시간 상담 공동 기여

### 여러 서비스의 로그인 상태 구분

<!-- claims: centurion.sso-session -->
여러 제품이 공통 인증을 사용하면서 중복 로그인·계정 전환·서비스 그룹별 로그아웃을 서로 다르게 처리해야 했습니다. 기존 SSO의 Redis 세션 v2를 재설계·구현하고 사용자·서비스·기기별 세션을 구분해 각 정책의 분기를 구현했습니다.

교체되기 전의 토큰으로 로그아웃을 요청했을 때 현재 유효한 세션을 삭제하지 않도록 토큰 식별자(JTI)의 소유권을 확인했습니다. 기능별 정책과 세션 제거 대상을 맞추는 데 초점을 두었습니다.

### 주문과 외부 알림의 처리 경계

<!-- claims: centurion.bay-async-backend centurion.async-migration centurion.test-ci-foundation -->
자동 발주와 공급사·병원 알림을 연결하는 주문·재고 백엔드를 주도했습니다. 외부 알림은 별도 워커에서 실행하고 발송 결과에 따라 주문 상태를 나눴습니다. 기존 작업 큐는 애플리케이션의 비동기 실행 방식과 맞는 구성을 선택해 전환했습니다.

알림의 진행 상태와 실패 기록을 남기고, 운영자가 조건에 맞는 알림을 다시 보낼 수 있도록 수동 재발송 API의 검증 경계를 구현했습니다. API와 워커의 배포 단위를 나누고 테스트·CI·온보딩 문서로 개발 환경을 재현할 기준을 마련했습니다.

### 같은 발화에 돌아오는 실시간 전사

<!-- claims: centurion.say-realtime-ai -->
실시간 AI 상담 백엔드에서는 세션 수명과 전사 순서 처리에 공동 주 기여했습니다. 부분 전사는 빠른 도메인 키워드 판정에, 완료 전사는 맥락 판단과 저장에 사용했습니다. 뒤늦게 도착한 보정은 발화 순번으로 원래 발화에 반영해, 같은 문장이 반복되더라도 다른 발화를 덮지 않도록 구성했습니다.

세션 종료 뒤 재연결되는 문제에는 타이머·정리 작업·종료 상태 검사 경계를 보강했습니다. 테스트에서는 종료 후 재진입과 늦은 응답을 포함한 회귀 시나리오를 다뤘습니다.

기술: Python · FastAPI · TypeScript · NestJS · Redis · RabbitMQ · TaskIQ · WebSocket · STT

## 03. 팀이 같은 기준으로 제품을 만드는 기반

조직 표준 백엔드 템플릿 · MediSolve AI · 설계·구축 전담

### 기능 구현자가 반복해서 결정하지 않을 기준

<!-- claims: be-template.backend-standard be-template.team-leverage be-template.agent-context -->
기획·QA·디자인 담당자도 coding agent와 제품을 만드는 팀에서, 기능 구현마다 세션 수명과 계층별 책임을 다시 판단하게 두기는 어려웠습니다. 로컬에서 드러나지 않았던 세션 미반납·연결 풀 고갈이 STG QA에서 반복되고 백엔드 담당자가 계속 개입해야 했습니다.

책임별 계층과 API 계약, 세션·트랜잭션 경계, 검증 기준을 조직 표준 템플릿으로 직접 구축했습니다. Agent가 같은 책임·호출 규칙을 읽도록 작업 맥락과 반복 작업 기준도 함께 제공했습니다.

### 트랜잭션 정책과 세션 수명주기의 분리

<!-- claims: be-template.fastapi-sqlalchemy-standard -->
서비스 메서드가 트랜잭션 정책을 선언하면 공통 계층이 세션 생성·참여·커밋·롤백·반납을 맡도록 했습니다. Repository는 현재 세션을 찾아 사용하므로 계층마다 같은 세션 인자를 전달할 필요가 없어졌습니다.

| 판단 지점 | 템플릿의 처리 |
| --- | --- |
| 기존 트랜잭션에 참여 | REQUIRED는 현재 트랜잭션을 사용 |
| 별도 커밋 경계가 필요 | REQUIRES_NEW는 새 연결·세션 사용 |
| 기존 트랜잭션 안에서 일부 작업을 되돌림 | NESTED는 SAVEPOINT 사용 |
| 하위 작업에 세션이 상속됨 | 세션을 소유한 task를 검사해 다른 task의 동일 세션 접근을 즉시 차단 |
| 작업이 취소됨 | 취소 예외에도 롤백·연결 반환이 수행되는지 통합 테스트로 검증 |

### 적용 방식과 팀의 변화

<!-- claims: be-template.team-leverage -->
모든 기능에 같은 설계 패턴을 강제하지는 않았습니다. 세션·트랜잭션·API 계약을 공통 기본값으로 두고, 도구가 늘어나는 AI Agent 기능은 실행 로직과 도구 구현을 port·adapter로 나누도록 안내했습니다. 신규 사내 프로그램에는 전체 템플릿을 적용하고 기존 제품에는 세션 관리부터 점진적으로 도입했습니다.

전체 템플릿으로 시작한 신규 사내 프로그램의 STG QA에서는 이전과 같은 세션 미반납·연결 풀 고갈이 재관측되지 않았습니다. 기획·QA·디자인 담당자가 기능을 구현하고 백엔드는 결과 피드백과 배포를 지원하는 수준으로 개입 범위가 줄었습니다.

<!-- claims: mediness.product-operations mediness.product-development-coordination-leverage mediness.company-work-ax-design -->
제품 운영에서는 결정·명세·작업·릴리스 기록을 연결해 담당자가 바뀌어도 맥락을 이어갈 수 있게 했습니다. 이를 회사 업무의 의사결정·승인·후속 작업으로 확장하는 AX 구조 설계에도 참여했습니다.

기술: Python · FastAPI · SQLAlchemy 2.0 async · ContextVar · pytest · coding agent
