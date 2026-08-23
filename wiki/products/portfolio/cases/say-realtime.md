---
type: portfolio-case
case: say-realtime
title: 실시간 AI 상담 backend — 세션 lifecycle 안정화와 provider 추상화
resume_tag: SAY
origin: MediSolve AI · Centurion 상담 관리
claim_ids: [centurion.say-realtime-ai]
claim_strength: co-led
---

## Executive Summary

실시간 AI 상담 backend에서 zombie session, reconnect race, provider 전환 경계를 안정화했습니다. session lifecycle과 STT/LLM provider abstraction, translation/audio pipeline을 다룬 cluster의 공동 주 기여 범위입니다.

## My Scope

- WebSocket session lifecycle, reconnect·GC, provider boundary 안정화 공동 주 기여
- realtime STT 복수 지원, translation/audio pipeline과 dashboard AI analysis 연계
- SAY 상담 제품 전체 또는 realtime backend 전체의 단독 구축이 아닌 `co-led` 범위

## Problem And Constraints

실시간 상담 session이 종료되지 않으면 zombie session이 남아 resource와 cost를 계속 사용합니다. 동일 사용자의 reconnect가 기존 session 정리와 겹치면 race가 발생하고, audio event의 순서가 어긋나면 잘못된 응답이 연결될 수 있습니다.

STT/LLM provider마다 인증, 언어 코드, session 종료 조건이 다르지만, provider 전환이 상담 runtime 전체를 흔들어서는 안 됐습니다. 동시에 WebSocket 연결의 실시간성과 translation/audio 처리 순서를 유지해야 했습니다.

## Decision And Alternatives

- session의 생성·전환·종료·GC를 runtime의 명시적인 lifecycle로 관리하고 reconnect race를 이 경계에서 제한했습니다.
- provider별 차이는 abstraction layer 뒤로 격리하되, 공통화할 수 없는 종료·인증 semantics는 adapter가 소유하도록 했습니다.
- Trade-off: abstraction은 provider 교체 범위를 줄이지만 차이를 완전히 제거하지 못합니다. staggered audio/translation pipeline도 provider 호출 시점을 나누는 대신 sequence 관리 복잡도를 높입니다.

## System Design And Implementation

diagram: 상담 화면 -> Express API Gateway -> NestJS SSO -> WebSocket API -> session orchestrator -> STT adapter -> transcript event -> advice·upsell·process pipeline -> client event

diagram inset: Audio -> VAD(speech boundary) + DELTA(domain keyword fast path) / COMPLETE(context·store) + optional same-sequence correction; session end -> stop guard -> reconnect blocked

visual_component: `app/fe/app/portfolio/say-realtime-diagram.tsx` — runtime, transcript event detail, session lifecycle, provider benchmark·E2E replay·regression test를 실제 텍스트로 렌더링하는 code-native reference architecture다. 공통 portfolio의 Azure 도식과 같은 얇은 rule·절제된 blue/green·3단 정보 위계를 사용한다.

- zombie session 방지, GC TTL, reconnect race 처리, turn-complete 기반 session 전환
- realtime STT 복수 지원과 staggered pipeline, audio sequence matching, 이중->단일 translation session refactoring
- dashboard AI analysis에 structured output schema와 fallback을 두고 5축 insight 집계

## Failure Modes And Operation

- 종료되지 않은 session은 GC TTL로 회수하고 reconnect 시 기존 session과 신규 연결의 경쟁 조건을 제한
- audio sequence matching으로 비동기 결과가 다른 turn에 연결되는 위험을 방지
- structured output 파싱 실패 시 fallback을 보장하고 dashboard boundary test로 회귀 고정
- dev/prod AI resource를 분리하고 provider migration을 As-Is/To-Be 문서로 관리

## Evidence, Result, And Limits

- Code-backed: lifecycle, reconnect, provider adapter, translation/audio, structured output·fallback 변경이 확인됨
- Documentation/test-backed: resource separation, migration procedure, dashboard boundary case가 확인됨
- Limits: public realtime traffic·latency·availability 수치는 없으며, Application Insights의 HTTP sample은 전체 WebSocket workload를 대표하지 않음

## Stack

FastAPI · WebSocket · realtime STT/LLM providers · audio/translation pipeline · structured output
