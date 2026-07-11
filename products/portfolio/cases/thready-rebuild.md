---
type: portfolio-case
case: thready-rebuild
title: 운영 중인 AI 콘텐츠 생성 제품의 backend 전면 재구축과 생성 품질의 시스템화
resume_tag: THREADY
origin: MediSolve AI · 2025.04 —
claim_ids: [thready.backend-rebuild, thready.generation-quality-system, thready.release-operation]
claim_strength: owned
---

## 문제

초기 버전(v1.0.0)은 빠른 검증에 맞춘 구조였고, 제품화 단계에서 backend 재설계가 필요했습니다. 콘텐츠 생성 품질은 프롬프트 수정 감각에 의존해 — 개선이 재현되지 않고, 좋아졌는지 판정할 기준도 없었습니다.

## 접근

- 부분 개선 대신 전면 재구축 결정 — 기존 버전의 릴리스 운영과 병행하며 신규 backend를 별도로 구축, 준비 완료 시점에 cutover
- 생성 품질을 "감"에서 "계약"으로 — 프롬프트 입력을 타입으로 강제하고, 품질 판정을 자동화된 judge에 위임

## 구현

diagram: typed prompt builder (source_context 계약) -> generation pipeline (critique -> revise) -> LLM judge -> [soft] 관측 로깅 · 로컬 평가 sweep

- FastAPI 기반 DDD layered 구조로 신규 backend 구축, `v1.1.0 — backend-new cutover`로 전환 완료
- 프롬프트 렌더링 경로 단일화, 생성 결과 품질 데이터 영속화, 로컬 프롬프트 평가 sweep 스크립트

## 운영/결과

- cutover 이후 개발·운영 전담 — v1.2~v1.5 버전 사이클을 release/QA task 구조로 운영
- 품질 이슈를 judge·평가 루프로 감지하고 당일 수정 배포까지 연결하는 운영 체계 확립

## Stack

FastAPI · SQLAlchemy · PostgreSQL(psycopg — 검증 2026-07-06) · DDD layered · LLM pipeline · observability logging
