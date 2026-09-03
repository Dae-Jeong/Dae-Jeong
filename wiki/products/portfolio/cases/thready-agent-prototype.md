---
type: portfolio-case
case: thready-agent-prototype
title: Thready 기능을 대화로 제어하는 Agent 인터페이스
resume_tag: THREADY AGENT PROTOTYPE
origin: MediSolve AI · Thready Quality Lab
claim_ids:
  - thready.agent-pipeline-design
  - thready.conversational-editorial-agent-prototype
claim_strength: owned (prototype)
---

## Executive Summary

Thready의 글감 탐색·기획·작성·수정과 계정·게시물 관리 기능을 화면별로 조작하는 대신, 사용자가 대화로 요청하고 결과를 이어서 확인하는 독립 프로토타입을 만들었습니다. Agent는 요청을 실행 가능한 기능으로 바꾸되 등록된 capability만 호출하며, 예약·발행·삭제 같은 변경은 사람의 확인을 거쳐야 Mock 상태가 바뀝니다.

## My Scope

- Thready 기능을 대화로 제어하는 사용자 흐름과 action 체계 설계·구현
- planner와 capability 실행 경계 설계·구현
- 대화·turn·tool result·versioned artifact 원장 설계·구현
- typed confirmation과 idempotency를 적용한 Mock operation gate 구현
- 프로토타입 테스트와 브라우저·DB 복원 흐름 검증
- 운영 Thready 배포, 실제 외부 서비스 변경, durable worker는 범위에서 제외

## Problem And Constraints

Thready에서 글감을 찾고 초안을 만들고 수정한 뒤 저장·예약·발행하기까지 여러 기능과 화면을 오가야 합니다. 이를 대화 하나로 제어하려면 사용자의 자연어를 정확한 제품 action으로 바꾸고, 조회와 글 생성, 외부 상태 변경처럼 위험도가 다른 요청을 구분해야 했습니다. 대화가 길어져도 어떤 요청으로 어떤 기능이 실행됐고 어느 결과물이 최신인지 다시 확인할 수 있어야 했습니다.

## Decision And Alternatives

- planner는 typed plan만 만들고 실행 권한은 갖지 않도록 했습니다.
- 등록된 `ToolCapability`만 domain tool로 dispatch하도록 action allowlist를 뒀습니다.
- 글감 탐색·기획·작성·검토·수정과 계정·게시물 조회·저장·예약·발행·성과 조회를 하나의 action 체계로 묶었습니다.
- 읽기·좁은 명령은 deterministic fast lane에서 처리하고, 모호한 mutation 요청은 planner fallback으로 실행하지 않았습니다.
- 최근 message를 단순 절단하지 않고 typed memory와 append-only compaction snapshot으로 완료 action·선택 소재·artifact reference·미해결 요청을 남겼습니다.

## System Design And Implementation

diagram: 사용자 대화 -> 의도와 작업 계획 -> 등록된 Thready 기능 선택 -> 조회·글 제작·운영 명령 -> 실행 결과와 최신 결과물 회수

diagram: mutation 요청 -> confirmation_required -> 다음 turn의 typed confirmation -> Mock state transition -> idempotent receipt

- 대화방마다 active turn을 하나로 제한하고 실행 중 들어온 발화는 queue에 남겨 앞 turn 종료 뒤 승격했습니다.
- message와 별도로 append-only activity event를 기록하고 `after_seq` 이후 event만 증분 조회했습니다.
- prompt·tool argument·provider response·내부 오류는 public projection에서 제거했습니다.
- 글 생성·수정은 parent chain을 가진 artifact version으로 남겨 새로고침 뒤에도 최신 결과를 복원했습니다.

## Failure Modes And Operation

- 등록되지 않은 action은 capability registry에서 거부합니다.
- profile·conversation·confirmation ID가 맞지 않으면 변경 요청을 실행하지 않습니다.
- 같은 confirmation을 다시 보내도 receipt idempotency로 중복 상태 변경을 막습니다.
- process-local background task는 재시작 복구를 보장하지 않으므로 production 승격 전에 lease·heartbeat·retry를 가진 durable execution으로 교체해야 합니다.

## Evidence, Result, And Limits

- Code-backed: 7개 편집 action과 13개 운영 action, single-agent planner-executor, typed capability registry, 대화·turn·tool result·artifact 원장이 확인됨
- Test-backed: queue, artifact, activity, capability, Mock operation 계약과 전체 prototype test가 통과함
- Browser/DB-backed: activity polling, queue 승격, typed confirmation, 새로고침 뒤 activity·artifact 복원을 확인함
- Limits: production Agent, multi-agent orchestration, 실제 외부 서비스 예약·발행·삭제, durable worker 운영은 주장하지 않음

## Stack

Python · FastAPI · typed capability registry · SQLite · structured output · pytest
