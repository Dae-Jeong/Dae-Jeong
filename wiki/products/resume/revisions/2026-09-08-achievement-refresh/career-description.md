---
type: content-draft
title: Common Career Description Achievement Refresh
description: 프로젝트별 문제·책임·기술 판단·검증을 담은 공용 경력기술서 내용 검토 초안.
timestamp: 2026-09-08
status: content-review
approved: false
canonical: false
tags: [career-description, common, achievement-refresh, content-review]
---

# 경력기술서

가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.

김대정 · Tech Lead · Backend Engineer · AI Product Systems

[marin.backend@gmail.com](mailto:marin.backend@gmail.com) · [github.com/Dae-Jeong](https://github.com/Dae-Jeong) · [marinkim.xyz](https://marinkim.xyz)

<!-- claims: career.ai-pm-backend-continuity thready.creator-adoption-context thready.product-zero-to-one-contribution thready.frontend-product-delivery career.coding-agent-usage be-template.backend-standard be-template.team-leverage -->
기획자로 시작해 백엔드로 왔고, 크리에이터의 Threads 운영을 돕는 Thready의 아이디어를 제안해 백엔드·AI를 직접 만들고 핵심 화면은 coding agent로 완성했습니다. 제품 출시·운영을 리드하며, 팀원들도 coding agent와 제품을 만들 수 있도록 백엔드 구현·검증 기준을 조직 표준 템플릿으로 구축했습니다.

## MediSolve AI · 2025.04 — 재직 중

<!-- claims: career.medisolve-role-evolution career.memento-to-medisolve-early-member career.thedaylabs-freelance -->
Tech Lead · Backend Engineer — 초기 멤버 영입 · 법인 설립 전 더데이랩스 프리랜서 선행 개발(2025.02 — 2025.04)

Memento AI에서의 개발 성과를 인정받아 초기 멤버로 영입됐습니다. 더데이랩스 프리랜서 기간에 피부과 운영 제품군의 초기 백엔드와 저장소·환경·문서·개발 기준을 선행 구축하고, 2025.04 법인 설립과 함께 정규 합류했습니다.

### 크리에이터의 새로운 채널 운영을 제품으로

#### Thready · 고객의 기존 콘텐츠를 Threads 운영으로 연결

<!-- claims: thready.creator-adoption-context thready.product-zero-to-one-contribution thready.threads-content-workflow-automation -->
Instagram·YouTube·블로그를 운영하는 크리에이터도 Threads를 시작하려면 새로운 글쓰기 문화에 적응하고 소재 탐색·작성·수정·발행 시간을 따로 내야 했습니다. 기존 콘텐츠 자산을 활용하면서 운영을 이어갈 수 있도록 Thready를 제안하고, 초기 프로토타입 이후 제품화를 주도했습니다. 기획·QA·마케팅과 고객 문제를 기능 우선순위·생성 품질 기준으로 구체화하고 출시·운영을 리드했습니다.

<!-- claims: thready.frontend-product-delivery thready.generation-quality-system career.coding-agent-usage -->
백엔드와 AI 생성·평가 시스템을 직접 구축하고, 콘텐츠 가져오기·생성·수정·예약·발행·대시보드·관리 화면은 coding agent로 완성했습니다. 구현에 앞서 요구와 API 계약을 정하고, 실제 사용자 흐름을 검수해 배포하는 책임까지 맡았습니다.

<!-- claims: thready.customer-follower-growth thready.subscription-revenue-band -->
팀과 운영한 제품의 이용 고객 중 한 명은 꾸준히 운영하며 팔로워가 기존 대비 10배 이상 늘었습니다. Thready에서는 2026년 8월 기준 월 1천만원 수준의 구독 매출이 발생했습니다.

<!-- claims: thready.youtube-source-reuse -->
최근 구현에서는 기존 YouTube 채널의 소재를 정기 동기화해 Threads 제작에 활용했습니다. 외부 채널 조회는 DB 트랜잭션 밖에서 수행하고 반영만 짧게 처리해, 채널 하나의 실패가 다른 채널 동기화를 막지 않도록 나눴습니다. 계정별로 성공적으로 사용한 소재를 제외하며, 소재가 고갈되면 이미 쓴 소재로 다시 채우지 않도록 했습니다.

<!-- claims: thready.auto-generation-approval-flow thready.approval-command-consistency -->
시간표에 따른 생성 실행과 고객 알림 시각을 분리했습니다. 슬롯별 생성 원장으로 중복 편성을 통제하고, 생성된 초안을 고객이 알림에서 열어 수정·예약·발행을 결정하게 했습니다. 수정본·승인 결정·발행 작업은 한 트랜잭션으로 저장하며, 같은 명령이 재전송되면 기존 결과를 반환하도록 구현했습니다.

<!-- claims: thready.auto-generation-approval-flow thready.youtube-source-reuse thready.approval-command-consistency -->
동시 호출의 중복 승인·알림, 목표 시각 전 알림 편성, 사용한 소재 재선택, 승인 명령 재전송과 잘못된 수정의 롤백을 테스트로 다뤘습니다. 로컬 실제 모델 실행에서는 생성 이력·초안·승인·알림의 연결과 소재 고갈 시 후속 작업이 늘어나지 않는 것을 확인했습니다.

#### AI가 글을 생성하고 사람이 판단할 수 있는 품질 기준

<!-- claims: thready.generation-quality-system thready.agent-pipeline-design thready.quality-criteria-system -->
콘텐츠 품질을 프롬프트 한 번의 성공 여부로 판단하지 않도록 생성과 평가 역할을 나눴습니다. 글의 유형을 정하는 판정이 작성 단계에서 작동하지 않는 것을 확인해 기획 단계로 옮겼고, 자동 규칙 검사·실측 분포 대조·사람 판정을 서로 다른 층으로 구성했습니다. AI 검수 결과는 점수·사유·개선안으로 남겨 수정과 품질 실험의 근거로 썼습니다.

<!-- claims: thready.labeling-corpus-workbench thready.threads-market-outcome-design thready.measurement-correction -->
게시물의 최신 상태와 시계열 관측을 나누고, 사람의 평가를 적재 데이터와 별도로 보존하는 검수 도구를 직접 구축했습니다. 재적재는 원본 식별자를 기준으로 갱신하되 기존 평가를 유지하도록 구현하고, 반복 적재 후 행 수와 평가 보존을 확인했습니다. 품질 기준값이 자사 출력을 다시 근거로 쓰던 순환도 재실측에서 찾아 기준을 교정했습니다.

<!-- claims: thready.langgraph-generation-graph -->
생성 그래프는 복잡한 기존 구성을 단일 파이프라인으로 줄이고, 단일 agent 엔진과 같은 검수·보정 코드를 공유하게 했습니다. 두 엔진을 실제 생성 흐름에서 비교할 수 있게 유지하고, 도구와 외부 모델처럼 교체가 필요한 경계에만 어댑터를 뒀습니다.

#### 기능 확장을 위한 백엔드 전환

<!-- claims: thready.rebuild-decision-execution thready.backend-rebuild thready.qa-reopen-reduction -->
초기 백엔드를 인계받았을 때 도메인 의존성이 얽혀 회원 기능 변경이 AI 생성 중단으로 이어지고, 해결된 이슈가 같은 영역에서 다시 발생했습니다. 부분 수정과 백엔드 병렬 재구축을 비교한 뒤, 서비스가 작고 AI 모듈 확장을 준비하던 시점에 백엔드만 교체하는 범위를 정했습니다.

기존 화면의 API 계약을 유지하고 패턴·계층·검증 하네스를 먼저 구성했습니다. coding agent를 코드 분석·기능 정리·구현에 활용하되 구조·검증·전환 기준은 직접 정했습니다. 새 백엔드와 기존 응답을 비교해 전환하고 이후 개발·운영을 전담했습니다.

같은 기준의 Jira 집계에서 해결된 QA 이슈의 재오픈 비율은 2026년 4월 37%에서 7월 11%로 낮아졌습니다. 재구축과 검증은 제품을 계속 개발·운영하기 위한 기반으로 이어졌습니다.

#### Thready · 발행 결과가 불명인 작업의 복구

<!-- claims: thready.publish-recovery-boundary -->
외부 발행 요청을 보낸 뒤 응답이 끊기면 실제 게시 여부를 즉시 알 수 없습니다. 호출 전 확정 실패와 호출 후 결과 불명을 구별하고, 결과가 불명인 작업은 새 게시를 시작하기 전에 기존 발행 시도에서 상태를 회수하도록 구현했습니다.

발행 중 생성한 외부 컨테이너와 이어쓰기 실행 이력을 저장해 재개할 때 사용하고, 이미 발행된 이어쓰기는 건너뛰었습니다. 점유 기한과 시도별 토큰으로 워커 재점유와 오래된 실행의 상태 덮어쓰기를 통제했습니다. 실패가 확정되면 작업·콘텐츠·시도 이력·실패 알림을 같은 트랜잭션으로 닫도록 구성했습니다.

호출 후 예외가 발생하고 점유 기한이 만료된 다음, 같은 외부 컨테이너에서 복구하는 시나리오를 회귀 테스트로 고정했습니다.

#### Thready · 제품 원장과 AI 실행의 분리

<!-- claims: thready.ai-service-boundary thready.ai-replica-outbox -->
제품 정책·원장과 AI 생성 상태가 같은 백엔드·DB에 있으면 AI 기능의 변화와 실패가 제품 데이터에 결합됩니다. 제품 정책·원장은 백엔드가, 생성 수명주기·실행 상태는 별도 AI 애플리케이션이 소유하도록 직접 분리해 인증된 HTTP 계약으로 연결하고 STG·Prod에서 운영했습니다.

DB 변경만 성공한 뒤 전달이 사라지는 경우를 다루기 위해 원장 변경과 Outbox 기록을 같은 트랜잭션으로 묶었습니다. 전달부는 점유 기한·시도 토큰·재시도를 관리하고, 수신부는 전달 버전으로 중복과 역순 요청을 판정했습니다. 재시도 상한을 넘긴 실패도 보존해 운영자가 남은 상태를 확인할 수 있게 했습니다.

<!-- claims: thready.ai-service-migration -->
STG 실데이터를 로컬에 복원해 이관을 먼저 연습한 뒤, 부모 생성 이력에서 자식 품질·실행 기록 순으로 복사했습니다. 행 수뿐 아니라 주요 값의 MD5 지문과 외래키 참조를 대조했습니다. 배포·상태 점검은 성공해도 실제 생성이 실패한 사례를 계기로, 배포 후 생성 API의 실제 동작을 별도 통과 조건으로 추가했습니다.

<!-- claims: thready.generation-aggregate-optimistic-lock thready.generation-quota-admission -->
생성 원장에는 상태 전이 규칙을 복원하고 버전 기반 낙관적 잠금으로 여러 워커의 경합을 중재했습니다. 생성 한도는 확정 사용량과 진행 중 예약을 함께 계산해 판단하고, 실패 시 예약을 해제하도록 구현했습니다.

### 업무 정책을 실행 가능한 백엔드로

#### 공유 인증 · 사용자·서비스·기기별 세션과 로그아웃

<!-- claims: centurion.sso-session -->
여러 제품이 공통 인증을 사용하면서 같은 제품의 중복 로그인, 같은 브라우저의 계정 전환, 서비스 그룹별 로그아웃을 서로 다르게 처리해야 했습니다. 기존 SSO의 Redis 세션을 재설계·구현해 사용자·서비스별 세션과 사용자·기기별 인덱스를 나누고 정책에 따른 충돌 분기를 연결했습니다.

토큰을 갱신할 때 관련 세션과 기기 인덱스의 만료도 함께 갱신했습니다. 로그아웃에서는 요청의 토큰 식별자가 현재 저장된 세션과 일치하는지 확인한 뒤 그룹 세션을 삭제해, 오래된 토큰이 교체된 유효 세션을 지우지 않도록 구성했습니다.

세션이 없거나 토큰 소유권이 다르면 그룹 삭제를 호출하지 않는 조건, 서비스 그룹·기기별 분기, 만료 갱신을 단위 테스트에 반영했습니다.

#### 피부과 주문·재고 · 후속 작업의 실패 상태와 재처리

<!-- claims: centurion.bay-async-backend centurion.async-migration -->
주문 저장이 성공해도 외부 알림과 재고 처리는 별도로 실패할 수 있어, 제품 시작 시점부터 요청과 후속 작업을 워커 경계로 나눴습니다. 이후 백엔드의 비동기 실행 방식과 맞추기 위해 기존 작업 큐를 전환하고 알림의 상태·실패 기록·수동 재처리 경계를 재구성했습니다.

외부 알림은 발송 대기·진행·성공·실패를 기록하고, 실패한 주문은 전용 API에서 조건을 확인한 뒤 수동 재발송하도록 구현했습니다. API와 워커 이미지를 분리해 배포 단위를 나누고, 실패한 후속 작업을 운영자가 다시 찾을 수 있게 했습니다.

<!-- claims: centurion.test-ci-foundation -->
API 테스트와 Docker 기반 CI, 로컬 실행·온보딩 문서를 함께 정비해 API·브로커·워커를 같은 환경에서 재현할 수 있는 개발 기반을 구축했습니다.

#### 실시간 상담 · 같은 발화를 수정하고 종료된 세션은 닫기

<!-- claims: centurion.say-realtime-ai -->
실시간 상담 백엔드의 세션 수명과 전사 처리에 공동 주 기여자로 참여했습니다. 전사 완료와 늦게 도착하는 보정이 서로 다른 순서로 올 수 있어, 중간 전사·완료·보정을 같은 발화 순서 번호로 묶었습니다. 같은 문장이 반복돼도 보정이 해당 발화만 바꾸도록 구현했습니다.

종료된 세션이 남은 타이머 때문에 다시 연결되는 경로를 재현하고, 재연결 진입 전과 대기 후 종료 상태를 확인하도록 보강했습니다. 일시정지·완료·시간초과·자원 회수·서버 종료의 정리 책임을 나눠 회귀 테스트로 고정했습니다.

발화 감지 간격별 E2E 실측에서는 주 병목이 모델 추론임을 확인했습니다. 감지 간격 조정에 집중하기보다 중간 전사의 조기 판정과 외부 모델 경계 분리를 우선했고, 상담 E2E에서 발화 순서의 누락·중복을 대조했습니다.

#### 여러 피부과 운영·예약 · 서버가 결정하는 지점 접근 범위

<!-- claims: nexus.backend-architecture nexus.admin-backend-ownership nexus.branch-access-boundary nexus.quality-automation -->
외부 피부과 여러 곳의 홈페이지·관리·예약을 지원하는 백엔드의 구조와 API 구축을 주도하고 있습니다. 관리와 홈페이지 API를 게이트웨이 뒤 독립 모듈로 나누고, 지점별 데이터와 삭제된 데이터의 조회 경계를 공통 계층에 구성했습니다.

관리 API에서는 클라이언트가 보내는 지점 값 대신 로그인 시 서버가 확정한 지점을 사용하도록 전환하고 있습니다. 지점 변경은 권한 검증을 거친 전용 API로만 수행하며, 본사 사용자의 지점 미선택과 권한 밖 접근을 서로 다른 응답으로 구분했습니다. 홈페이지의 기존 계약을 유지하는 범위로 변경을 나누고 코드·API·DB 설계 기준을 함께 정비했습니다.

<!-- claims: nexus.terraform-infra nexus.hospital-operations-revenue-contribution -->
해당 시스템의 배포 구성을 코드로 관리하는 작업도 전담했습니다. 기존 운영 제품은 예약률 개선과 고객사 매출 성과에 기여했습니다.

#### 시술 정보 지식 검색 · 검색 결과와 안전 판정의 분리

<!-- claims: procedure-hub.hybrid-retrieval-design procedure-hub.canonical-data-platform -->
시술·고민·금기·간격처럼 관계가 명확한 지식을 자연어로 찾을 수 있도록 검색 API와 데이터 전환을 구현했습니다. 질의를 기준 엔티티로 확정하고 구조화 조회로 판단한 뒤 문헌 검색으로 근거를 보강했습니다. 출처를 포함한 근거 묶음을 반환하되, 등록된 안전 규칙이 없다는 사실을 안전하다는 판정으로 바꾸지 않도록 구성했습니다.

전환 과정에서는 기존 API 계약을 테스트로 고정하고 재실행해도 결과가 바뀌지 않는 가져오기를 구현했습니다. 현재는 검수 승인과 검증된 출처를 확인하고, 미해결 데이터 연결이나 검증 문제가 있으면 공개를 차단하도록 구성했습니다. 공개된 데이터 묶음이 없으면 초안 데이터를 검색 결과에 사용하지 않으며, 이전에 공개된 개정 집합으로 복구하는 경계도 구현했습니다.

<!-- claims: procedure-hub.retrieval-evaluation-gate -->
임상 검수를 준비하면서, 검수 승인이 없는 평가 자료를 거부하고 검색 결과·안전 규칙·응답 시간을 측정하는 평가 실행기를 구현했습니다. 검색 API와 평가 도구의 구현을 바탕으로 임상 검수와 공개 연결을 준비하고 있습니다.

### 팀이 같은 기준으로 제품을 만드는 기반

#### 조직 표준 백엔드 템플릿

<!-- claims: be-template.backend-standard be-template.team-leverage be-template.agent-context -->
기획·QA·디자인 담당자까지 coding agent와 제품을 구현하는 팀에서, DB 세션 사용과 로직 배치가 담당자마다 달라졌습니다. STG QA에서 반복된 세션 미반납·연결 풀 고갈을 확인하고, 기능 담당자가 제품 정책에 집중할 수 있도록 공통 계층·API 계약·검증 기준을 조직 표준 템플릿으로 직접 구축했습니다.

<!-- claims: be-template.fastapi-sqlalchemy-standard -->
라우터의 세션 인자를 모든 계층에 전달하던 구조를 바꿔, 서비스가 트랜잭션 정책을 선언하고 공통 계층이 세션을 관리하도록 했습니다. 데이터 접근 계층은 SQL 실행을, 서비스의 트랜잭션 경계는 커밋·롤백·반납을 책임집니다. 같은 트랜잭션 참여·독립 트랜잭션·저장점을 구분하고, 하위 작업이 상속된 세션에 접근하면 즉시 차단했습니다. 작업 취소 시 롤백·연결 반환은 통합 테스트로 검증했습니다.

<!-- claims: be-template.team-leverage be-template.agent-context -->
공통 안전장치는 기본값으로 제공하되, 일반 기능과 도구 교체가 잦은 AI 기능은 각기 맞는 구조를 선택하도록 안내했습니다. 구조·호출 규칙·운영 문서·agent 작업 맥락을 함께 배포하고 팀 피드백을 구현에 반영했습니다. 신규 프로그램은 템플릿 전체로 시작하고 기존 제품은 세션 관리부터 점진적으로 적용했습니다.

템플릿 전체를 적용한 신규 사내 프로그램의 STG QA에서 같은 유형의 세션·연결 풀 문제가 재관측되지 않았습니다. 기능 담당자가 직접 구현하고 백엔드는 결과 피드백과 배포를 지원하는 수준으로 개입 범위를 줄였습니다.

#### 제품 개발에서 얻은 판단을 다음 작업에 남기기

<!-- claims: mediness.product-operations mediness.product-development-coordination-leverage mediness.company-work-ax-design mediness.product-system-design-participation -->
제품별 일정·이슈·릴리스 운영을 리드하며 결정·명세·작업·검증 기록을 하나의 실행 맥락으로 연결했습니다. 백엔드·화면·QA 담당과 승인 단계를 연결하고 실제 릴리스 시점에 변경 이력이 남게 했습니다. 담당자가 바뀌어도 기록을 읽고 업무를 이어갈 수 있어 인수인계와 맥락 재설명의 비용을 낮췄습니다.

제품 요구와 운영 흐름 설계에 참여한 경험을 바탕으로 회의·의사결정·업무 배정·승인을 같은 맥락에 연결하는 회사 AX 구조 설계에도 참여했습니다. agent가 맥락과 실행안을 준비하고 우선순위·승인·릴리스 판단은 사람이 확정하도록 역할을 나눴습니다.

<!-- claims: mediness.quality-evidence-harness mediness.ai-qa-team-operation career.weekly-role-based-agent-retrospective -->
제품 구현을 뒷받침하는 작업으로 QA 팀원의 서포트를 받아 요구사항별 근거로 통과 여부를 판단하는 공통 QA 규칙을 설계하고 AI QA 팀 운영에 참여했습니다. 주간 agent 활용 회고에서는 만들어야 할 기능과 구현 중 병목, 다른 작업에 재사용할 방법을 함께 검토했습니다.

<!-- claims: infra.company-azure-ownership -->
여러 사내 서비스의 배포 환경을 구성하고 기본 운영도 맡아, 구현 결과가 실제 실행 환경까지 이어지도록 지원했습니다.

## Memento AI · 2024.10 — 2025.01

Backend Engineer — 인턴 합류 후 정규직 전환 · 회사 폐업으로 종료

### 예약·결제 · 외부 결제와 내부 자산의 보상 처리

<!-- claims: career.memento-fastapi-backend career.memento-stripe-prepayment career.memento-payment -->
예약 처리가 실패해도 외부 결제나 내부 마일리지·이용권 상태는 이미 바뀌어 있을 수 있었습니다. 예약·결제 API 개발을 맡아 예약 확정 전 결제를 보류하는 선결제 영역을 구축하고, 내부 결제 식별자로 결제 이력과 외부 결제 이벤트를 연결했습니다.

예약 실패 시 결제가 매입 대기이면 취소하고, 이미 결제가 완료됐으면 환불하는 보상 처리를 구현했습니다. 환불 요청과 완료를 구분해 마일리지 복원과 이용권 삭제는 환불 완료 시점으로 옮겼습니다. 현금·외부 결제·0원·전액 마일리지 경로의 상태 변경 순서를 정리해 실패 뒤 확인할 처리 단계를 분명히 했습니다.

### 고객 알림 · 예약 변경과 발송 이력

<!-- claims: career.memento-happycall-survey -->
기존 다국어 해피콜을 알림톡·이메일의 즉시·예약 발송으로 확장했습니다. 예약 작업의 식별자를 저장하고, 일정 변경 때 기존 작업을 취소한 뒤 다시 등록하며 발송 이력을 조회할 수 있게 했습니다. 예약·취소·재등록·이력 조회의 단위 테스트와 함께 설문 당첨 결과의 조회·요약·검색 기능을 구현했습니다.

## STUDIO LAB · 2021.12 — 2024.01

<!-- claims: career.ai-pm-backend-continuity -->
AI Engineer(2021.12 — 2022.09) → Product Manager(2022.10 — 2023.09, 주 역할) → Backend Engineer(2023.10 — 2024.01)

### SellerCanvas · 프로토타입을 제품과 기업 PoC로 연결

<!-- claims: career.sellercanvas-product-system career.sellercanvas-enterprise-poc -->
AI 커머스 콘텐츠 제품의 프로토타입을 실제 업무에 사용할 수 있도록 제품 흐름·기능 범위·출시 우선순위를 정했습니다. PM으로 v1.0 제품화를 이끌고, 외부 패션 브랜드의 요구를 기능과 기술 검증 범위로 구체화해 기업 PoC를 진행했습니다.

<!-- claims: credentials.page-output-patent credentials.ces-2024 career.sellercanvas-vision-model-development -->
이 과정에서 상세페이지 제작 흐름을 재설계했고 관련 방식은 특허 「페이지 출력 방법」으로 등록됐습니다. 제품은 CES 2024 Best of Innovation AI 부문을 수상했습니다. 앞선 AI Engineer 기간에는 Vision AI 기반 의류 이미지 분석 모델 개발에 참여했습니다.

## 아이즈솔 · 2020.08 — 2021.06

Vision AI Engineer · 인턴

<!-- claims: career.ai-pm-backend-continuity -->
안면 인식 기반 자동 출결 시스템 개발에 참여하며 제품 개발 경력을 시작했습니다.

## 개인 프로젝트

### TellingMe · 2024.01 — 2024.12

<!-- claims: career.tellingme-backend-infra -->
Backend Lead · Infra

Spring Boot 백엔드와 AWS 배포·모니터링을 리드했습니다. API와 데이터 모델, 인증과 서비스 배포 환경을 함께 구축했습니다.

## 기술

<!-- claims: thready.backend-rebuild thready.langgraph-generation-graph thready.generation-quality-system thready.frontend-product-delivery centurion.msa-platform-context centurion.async-migration centurion.say-realtime-ai be-template.fastapi-sqlalchemy-standard career.coding-agent-usage career.memento-stripe-prepayment nexus.quality-automation infra.company-azure-ownership -->
| 분야 | 사용 기술 |
| --- | --- |
| Backend | Python · FastAPI · SQLAlchemy 2.0 async · PostgreSQL · MySQL · Redis · TypeScript · NestJS · RabbitMQ · TaskIQ · Celery · Stripe |
| AI·LLM | LangGraph · LLM 연동·평가 · STT · WebSocket · SSE |
| Frontend | Next.js — 핵심 사용자·관리 화면 구현 |
| Engineering Tools | Claude Code · Codex · pytest · Ruff · Pyright · Docker · GitHub Actions · Sentry · Jira |

<!-- claims: career.java-spring-side-projects infra.company-azure-ownership career.tellingme-backend-infra -->
추가 기술: Java · Spring · Spring Boot — 사이드 프로젝트 3개에서 활용. Azure · AWS · Terraform · Vercel — 서비스 배포·환경 구성·기본 운영.

## 외부 활동·수상·특허·자격·학력

<!-- claims: career.orcarouter-oss-developer-partnership career.product-ux-practice -->
- OSS 개발자 파트너십 · 공개 GitHub 프로젝트를 계기로 외부 LLM API 플랫폼의 개발자 파트너 프로그램 제안을 받아 2026.09 수락
- UX 컨설팅·스터디 · 운영 서비스의 보상·재방문 흐름 개선안 제안, Speak 추천 흐름 분석·발표 및 IPS 12기 MVP 선정

<!-- claims: credentials.page-output-patent credentials.ces-2024 credentials.ai-accuracy-certification credentials.adsp credentials.education -->
- 특허 「페이지 출력 방법」 · 등록 10-2898273 · 상세페이지 제작 방식 설계 기여
- CES 2024 Best of Innovation · AI 부문 수상 제품 참여
- 한국건설생활환경시험연구원(KCL) AI 정확도 부문 인증 통과 제품 참여
- ADsP · 데이터분석 준전문가 · 2021.09
- 우송대학교 게임멀티미디어 전공 · 2016.03 — 2021.08 · 졸업
