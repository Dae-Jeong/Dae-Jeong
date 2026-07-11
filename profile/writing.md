---
type: profile
title: Writing
description: Writing direction and article backlog for Kim Daejeong.
timestamp: 2026-07-02
tags: [writing, blog, homepage]
---

# Writing

## Writing Positioning

Writing은 단순 블로그가 아니라 backend, product system, agent workflow, AX를 설명하는 public proof layer다.

## Categories

| Category | Purpose |
| --- | --- |
| Backend Architecture | 인증, 비동기 메시징, 실시간 이벤트, infra를 구조적으로 설명 |
| Agent Workflow | AI agent를 개발 조직의 운영 계층으로 쓰는 법 |
| Product Engineering | PM/AI/backend 경험을 연결한 제품 개발 관점 |
| Design Harness | OpenDesign과 spec-to-prototype handoff 실험 |

## Article Backlog

1. `AGENTS.md는 prompt가 아니라 project operating contract다`
2. `AI agent가 헛똑똑해지는 이유: source-of-truth 없이 chat memory만 믿을 때`
3. `Redis/JTI로 multi-service duplicate login을 다루는 법`
4. `FastAPI에서 SSE를 단순하게 시작하는 방법`
5. `TaskIQ와 RabbitMQ로 API와 worker 책임 분리하기`
6. `multi-tenant product backend에서 HQ/Branch 권한 경계를 설계하는 법`
7. `OpenDesign으로 spec과 prototype 사이를 줄이는 실험`
8. `PM에서 backend engineer로 돌아왔을 때 더 잘 보이게 된 것들`

## Publishing Rule

- 내부 프로젝트를 글감으로 쓸 때는 회사명, 고객사명, 운영 수치, 민감 도메인을 제거한다.
- 기술 글은 "문제 -> 설계 선택 -> trade-off -> 운영 기준 -> 다음 확장" 순서로 쓴다.
- agent 글은 도구 나열이 아니라 workflow와 evidence를 중심으로 쓴다.
