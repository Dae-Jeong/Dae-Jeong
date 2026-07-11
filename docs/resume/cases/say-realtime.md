---
case: say-realtime
title: 실시간 AI 상담 backend — 세션 lifecycle 안정화와 provider 추상화
resume_tag: SAY
origin: MediSolve AI · Centurion 상담 관리
claim_strength: cluster 단위 주도 (SAY 공동 주 기여 + 연계 백오피스 주도 — 09 표 참조). provider 실명 공개 금지 — "realtime LLM/STT provider"로 일반화
---

## 문제

실시간 AI 상담에서 세션이 제대로 종료되지 않으면 유령(zombie) 세션이 리소스와 비용을 계속 소모합니다. 재연결 시 경쟁 조건(race)으로 세션이 꼬이고, STT/LLM provider 전환 때마다 backend가 흔들리는 구조였습니다.

## 접근

- 세션 lifecycle을 명시적으로 관리 — 종료 판정, GC TTL, 재연결 race 방지를 runtime의 책임으로
- provider를 추상화해 교체 가능하게 — 인증 방식·언어 코드 같은 provider별 차이를 경계 뒤로 격리

## 구현

diagram: 상담 클라이언트 -> WebSocket runtime (세션 lifecycle 관리) -> STT/LLM provider 추상화 계층 -> 번역·오디오 파이프라인 -> [soft] dashboard AI 분석 (structured output · fallback)

- zombie session 방지, GC TTL, reconnect race 해결, turn-complete 기반 세션 전환
- realtime STT provider 복수 지원과 staggered 파이프라인, 오디오 시퀀스 매칭, 이중->단일 번역 세션 리팩토링
- dashboard AI 분석 — LLM structured output 스키마 + fallback 보장, 5축 인사이트 집계

## 운영/결과

- dev/prod AI 리소스 분리, provider 마이그레이션 As-Is/To-Be 문서화 — 전환을 반복 가능한 절차로
- 결제 정수 overflow·dashboard 경계 테스트 등 운영 케이스를 테스트로 고정

## Stack

FastAPI · WebSocket · realtime STT/LLM providers · 오디오/번역 파이프라인 · structured output
