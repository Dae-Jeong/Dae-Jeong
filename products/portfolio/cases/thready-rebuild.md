---
type: portfolio-case
case: thready-rebuild
title: 운영 중인 AI 콘텐츠 생성 제품의 backend 전면 재구축과 생성 품질의 시스템화
resume_tag: THREADY
origin: MediSolve AI · 2025.04 —
claim_ids: [thready.backend-rebuild, thready.generation-quality-system, thready.release-operation]
claim_strength: owned
---

## Executive Summary

운영 중인 초기 버전을 유지하면서 신규 FastAPI backend를 parallel rebuild하고, 준비 완료 시점에 cutover했습니다. 이후 v1.2~v1.5 개발·운영과 typed prompt, LLM judge, 평가 루프 기반 생성 품질 시스템을 전담했습니다.

## My Scope

- 신규 backend architecture·구현, `v1.1.0 — backend-new cutover`, 이후 버전 개발·운영 전담
- typed prompt builder, critique/revise pipeline, LLM judge, 품질 데이터·평가 도구 구축
- 초기 `v1.0.0` 구축은 담당 범위가 아니며, 제품 전체 business outcome은 claim하지 않음

## Problem And Constraints

초기 `v1.0.0`은 빠른 제품 검증에 맞춘 구조였습니다. 제품화 단계에서는 backend 재설계가 필요했지만, 기존 버전의 릴리스와 운영을 멈추지 않은 채 신규 구조를 준비해야 했습니다.

콘텐츠 생성 품질도 프롬프트 수정 감각에 의존했습니다. 입력 조건과 판정 기준이 code-level contract가 아니어서 변경 결과를 반복 비교하기 어렵고, 좋아졌는지를 판단할 공통 신호가 부족했습니다.

## Decision And Alternatives

- 기존 backend를 계속 부분 수정하는 대신 신규 backend를 별도로 구축하는 parallel rebuild를 선택했습니다.
- Trade-off: 두 버전을 한시적으로 함께 다루는 운영 비용은 늘지만, 신규 architecture와 migration risk를 기존 release 흐름에서 분리할 수 있었습니다.
- 프롬프트 입력을 typed contract로 만들고 생성 결과를 LLM judge와 로컬 평가 sweep으로 판정했습니다. judge는 절대적인 정답이 아니라 변경 간 품질 차이를 반복 관찰하기 위한 신호로 제한했습니다.

## System Design And Implementation

diagram: typed prompt builder (source_context 계약) -> generation pipeline (critique -> revise) -> LLM judge -> [soft] 관측 로깅 · 로컬 평가 sweep

- FastAPI 기반 DDD layered 구조로 신규 backend 구축, `v1.1.0 — backend-new cutover`로 전환
- 프롬프트 렌더링 경로 단일화와 `source_context` 입력 계약 적용
- 생성 결과와 품질 판정 데이터 영속화, 로컬 프롬프트 평가 sweep 구성

## Failure Modes And Operation

- 프롬프트 렌더링 경로가 나뉘며 입력 조건이 달라지는 문제를 단일 builder 경계로 제한
- 생성 품질 변경을 사람의 인상만으로 승인하지 않도록 judge·평가 루프와 관측 로깅으로 회귀 신호 확보
- cutover 이후 v1.2~v1.5를 release/QA task 구조로 운영하고, 생성 품질 blocker를 당일 판단·수정 배포로 연결
- LLM judge의 오판 가능성을 인정하고 개별 점수를 사용자 품질이나 business 성과로 해석하지 않음

## Evidence, Result, And Limits

- Code/release-backed: 신규 backend cutover 완료와 이후 version cycle 운영이 확인됨
- Tool/workflow-backed: typed prompt, judge, 평가 sweep, 품질 데이터와 release/QA 운영 구조가 확인됨
- Limits: public traffic·latency·cost와 생성 품질의 정량적 before/after 근거는 아직 없어, 재구축·운영 범위와 품질 workflow 구축까지만 표현함

## Stack

FastAPI · SQLAlchemy · PostgreSQL(psycopg — 검증 2026-07-06) · DDD layered · LLM pipeline · observability logging
