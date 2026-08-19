---
type: plan
title: Resume Case Context Layer Design
description: 대표 사례의 성과 제목과 기술 근거 사이에 문제·요청·제약을 1–2문장으로 두는 검토안.
timestamp: 2026-08-18
status: review
derived_from:
  - products/resume/role-positioning-standard.md
  - products/resume/backend-case-achievements.md
  - evidence/claims/
  - evidence/projects/
tags: [resume, context, case, narrative, review]
---

# Resume Case Context Layer Design

Status: 검토안. 이 문서는 active resume 문안을 변경하지 않는다.

## 결정안

대표 사례를 다음 세 층으로 읽히게 한다.

1. `title` — 결과 또는 직접 내린 판단
2. `description` — 그 판단이 필요했던 문제·요청·제약
3. `evidence` — 선택, backend mechanism, 검증·운영 결과

별도 스토리 섹션은 만들지 않는다. 현재 `Axis.description`을 context 전용 슬롯으로 사용하고,
화면에는 `문제:`·`요청:` 같은 라벨을 노출하지 않는다. 분류값은 근거 검증과 sync를 위한 내부
metadata로만 유지한다.

## Context 작성 계약

- 두 문장 이내로 쓴다. 화면의 1–2줄은 목표이지 고정 글자 수 제한이 아니다.
- 첫 문장은 출발 상태나 failure mode, 둘째 문장은 반드시 지켜야 한 제약을 둔다.
- 해결책·성과·기술명은 가능한 한 evidence에 남겨 context와 중복하지 않는다.
- `요청`은 요청 주체와 내용이 source-backed 또는 user-confirmed일 때만 쓴다.
- 직접 발견 여부가 확인되지 않으면 `발견했다`고 쓰지 않고 `제약`으로 분류한다.
- 예방 설계를 과거 장애의 사후 대응처럼 바꾸지 않는다.
- 구현하지 않은 일은 `구축`, 참여한 일은 `주도`로 올리지 않는다.

현재 7개 대표 사례에는 검증된 직접 요청이 없다. 따라서 아래 분류는 `직접 발견 2건 + 제약
5건`이며, 요청형 서사는 추가 근거가 생기기 전까지 사용하지 않는다.

## 사례별 Context 초안

### 01. Backend 재구축·production 운영

- Type: `직접 발견 + 제약`
- Claims: `thready.rebuild-decision-execution`, `thready.backend-rebuild`
- Draft:

> 속도 우선으로 검증된 초기 제품은 도메인 의존성이 얽혀 한 영역의 변경이 AI 생성 중단으로 번지고, 같은 영역의 QA 이슈가 다른 형태로 반복됐습니다. AI 모듈 확장이 필요한 작은 서비스 단계에서 frontend와 기존 release·QA 흐름은 유지해야 했습니다.

- Edit note: 현재 두 번째 evidence의 문제 설명과 겹치는 부분은 적용 시 합치고, 대안 비교와
  backend-only scope만 evidence에 남긴다.

### 02. 제품 원장·AI 실행부 경계

- Type: `제약`
- Claims: `thready.ai-service-boundary`, `thready.ai-replica-outbox`
- Draft:

> 제품 정책·원장과 AI 생성 lifecycle·실행 상태는 책임과 변경 범위가 달랐습니다. 원장 변경과 전달 기록이 어긋나거나, 늦게 도착한 변경이 최신 상태를 덮는 failure mode까지 다뤄야 했습니다.

- Edit note: 현재 description의 `AI 실행 속도`는 검증된 성능 효과가 아니므로 제거한다.

### 03. 주문·재고 비동기 worker

- Type: `제약 — 예방 설계`
- Claims: `centurion.bay-async-backend`, `centurion.async-migration`
- Draft:

> 주문·재고처럼 실패 가능한 작업은 제품 시작부터 API 요청과 분리된 실행 경계와 운영자 복구 경로가 필요했습니다. 기존 Celery 처리를 async FastAPI 실행 모델과 정합하게 전환하면서 상태·retry·최종 실패 계약도 명시해야 했습니다.

- Edit note: 기존 외부 연동 실패가 API 응답에 결합돼 있었다는 before-state나, TaskIQ가 비동기
  분리를 처음 도입했다는 서사로 확장하지 않는다.

### 04. AI 생성 품질 판정

- Type: `직접 발견 + 제약`
- Claims: `thready.quality-criteria-system`, `thready.measurement-correction`
- Draft:

> ‘좋은 글’의 기준이 정성적 감에 머물러서는 어떤 축을 먼저 고칠지 결정할 수 없었습니다. 형식 오류·실측 분포·사람의 판단은 판정 주체가 달랐고, 재실측 중 자사 출력이 다시 기준값이 되는 순환도 확인됐습니다.

- Edit note: 해결 방식인 3층 판정, gate, corpus, 기준 재수립은 기존 evidence에 남긴다.

### 05. 멀티테넌트 어드민

- Type: `제약 — 접근 경계 migration`
- Claims: `nexus.admin-backend-ownership`, `nexus.branch-access-boundary`
- Draft:

> 멀티테넌트 어드민의 접근 범위를 client header에 맡기지 않으면서, 기존 shared auth middleware와 Homepage API 계약은 유지해야 했습니다. 운영자의 소속 지점과 현재 작업 지점도 서로 다른 상태로 다뤄야 했습니다.

- Edit note: 취약점을 직접 발견했다거나 기존 보안 문제 전체를 해결했다는 서사로 확대하지 않고,
  진행 중 표현을 유지한다.

### 06. AX 제품 운영 체계

- Type: `제약 — delivery 연결`
- Claims: `mediness.product-system-design-participation`, `mediness.product-operations`
- Draft:

> 제품 요구와 운영 판단이 BE·FE·QA·release의 서로 다른 owner와 실행 상태로 이어져야 했습니다. 서비스 구현 담당자들과 요구·운영 흐름을 맞추면서 완료·검증·승인 상태를 같은 release 기준으로 연결할 필요가 있었습니다.

- Edit note: evidence에서 `설계 참여(contributed)`와 `제품별 적용·운영 리드(led)`를 계속 다른
  문장으로 둔다. 서비스 직접 구현·architecture 주도·전사 pipeline 단독 설계와 daily briefing
  구축은 포함하지 않는다.

### 07. 조직 표준 Backend Template

- Type: `제약 — 조직·리소스`
- Claims: `be-template.backend-standard`, `be-template.team-leverage`,
  `be-template.agent-context`
- Draft:

> 10명 안팎의 엔지니어 조직에서 2~3명의 backend가 여러 제품을 지원해야 했습니다. 프로젝트마다 context를 다시 파악하거나 logging·monitoring 같은 횡단 변경을 반복하지 않는 공통 기반이 필요했습니다.

- Edit note: template·agent context라는 해결책과 재사용 효과는 기존 evidence에 남기며, 정량 개선은
  만들지 않는다.

## Sync 경계

- General resume: 승인된 Draft를 각 `Axis.description`에 반영한다.
- Evidence bullet: context와 겹치는 문제 설명만 합치고, 판단·mechanism·검증은 유지한다.
- JD tailored resume: 해당 case를 선택할 때 context도 함께 가져가되, JD가 요구한 문제와 무관하면
  새 요청 서사를 만들지 않는다.
- Platform profile: 자동 동기화하지 않는다. 사용자가 sync를 지시할 때 이 context와 가장 강한
  evidence만 표면 길이에 맞춰 파생한다.
- Portfolio: 같은 context를 출발점으로 대안·결정·failure analysis를 확장한다.

## 적용 Acceptance

1. description만 읽어도 왜 이 일이 필요했는지 알 수 있다.
2. title·description·첫 evidence가 같은 말을 반복하지 않는다.
3. 요청받은 일과 직접 발견한 문제를 바꾸어 쓰지 않는다.
4. 60초 안에 `문제 인식 → 판단 → backend mechanism → 운영 결과`가 복원된다.
5. 각 문장의 동사가 claim strength와 일치한다.
