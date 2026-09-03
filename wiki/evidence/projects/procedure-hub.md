---
type: evidence
title: Procedure Hub — Canonical Clinical Data Platform And Hybrid Retrieval (RAG)
description: MediSolve AI 시술 정보 지식 플랫폼의 canonical 데이터 전환, hybrid retrieval(RAG) API, 임상 평가 게이트에 대한 Git·문서 근거.
timestamp: 2026-09-03
tags: [evidence, procedure-hub, rag, retrieval, canonical-data, mediness]
---

# Procedure Hub — Canonical Clinical Data Platform And Hybrid Retrieval

내부 제품명 `Procedure Hub`(repo `MediSolveAIDev/PROCEDURE-HUB`)는 공개 문안에서 **시술 정보 지식 플랫폼** 또는 **의료 시술 지식 검색 API**로 쓴다 ([public-safety Internal Product Names](../../rules/public-safety.md)). 2026-07 audit의 `Procedure-Hub · other author signal · Skip`은 이 시점(2026-09-03) 이전 기록이며 아래 근거로 대체한다.

## Authorship

- Git-backed (2026-09-03 local clone): 저장소 author 분포 KimMarin 93 · JongJin Lee 83 · kknaksss 67 · medisolve-yeseul 33. Frontend(Next.js)는 다른 author가 주로 맡는다.
- Git-backed: `backend/app/modules/retrieval/` 5개 파일(domain·application·persistence·generation·shadow)은 **전부 KimMarin 커밋**이다.
- Git-backed: 2026-09-02~03 KimMarin 커밋 40건 이상 — `feat: add canonical clinical data platform`, `refactor: consolidate canonical release migration`, `feat: add local canonical retrieval cli`, `refactor: isolate retrieval api contract`, `feat: add deployed rag answer generator`, `feat: connect canonical rag to insight query`, `test: add clinician retrieval evaluation gate`, `fix: restore canonical safety shadow gate`, `feat: add clinical claim review workflow`, `fix: bind generated claims to atomic sources`, `fix: reject unverified literature identifiers`, `test: freeze public api contract baseline`, `ci: preserve immutable runtime rollback images`, `build: separate database provision from runtime`.
- User-confirmed (2026-09-03): "RAG는 지금 하고 있다. Elasticsearch 같은 검색 엔진 운영은 경험이 없다."

## Hybrid Retrieval Design

- Doc-backed (`docs/query-retrieval-rag-design.md`, 2026-09-03): 대상은 자연어 질의를 받아 관련 시술·고민·제품·안전 규칙·문헌 근거를 반환하는 API. **문서를 전부 벡터화한 뒤 가까운 문장을 반환하는 형태로 시작하지 않는다.** 지식의 대부분이 시술 코드·제품·금기·간격·추천 패키지처럼 관계가 명확한 구조화 데이터라, **구조화 조회가 판단하고 의미 검색은 근거를 보강하는 hybrid retrieval**로 확정.
- Doc-backed: pipeline `자연어 질의 → 의도·엔티티 후보 해석 → Master/alias로 canonical ID 확정 → 의도별 SQL 조회 → 안전 규칙 우선 판정 → 검증된 문헌·설명 근거 보강 → 출처 포함 Context Pack 반환 → 선택적으로 Context Pack만 사용해 설명 생성`.
- Doc-backed 경계: API 주산출물은 최종 상담 문장이 아니라 **재현 가능한 Context Pack**. identity는 Master·alias가 확정. 금기·순서·최소 간격·추천 가능 여부는 구조화 규칙만 판정. LLM은 미확정 표현의 후보 제안과 Context Pack 문장화만 담당. 문헌 검색 결과만으로 안전·추천 상태를 만들지 않음. 모든 claim은 stable source ID와 content revision을 가짐.
- Doc-backed 판단 근거 (2026-09-02 로컬 적재 실측): 시술군 17 · 고민 14 · 제품 60 · 금기 규칙 27 · 시너지 115 · 추천 패키지 24 · 문헌 statement 774(평균 84~107자, 최대 283자) · citation 788. 이 규모에서는 chunking·vector DB·reranker를 첫 단계에 운영할 이유가 없고, DB 이미지에 `vector` extension이 없음. 1차 검색 순서: code/exact alias → 정규화 alias → bounded fuzzy match → canonical entity 관계형 SQL → 문헌은 entity/topic filter 후 lexical rank → **평가셋에서 recall 부족이 증명될 때만 embedding 추가**.
- Code-backed: `retrieval/domain.py` alias overshadow 처리, `application.py` resolver·planner·release-scoped 조회·safety/evidence gate, `persistence.py` canonical read model, `generation.py` "Context Pack만 사용해 설명" system prompt의 로컬·배포 answer adapter, `shadow.py` legacy 대비 safety parity 비교 모델.
- Status (2026-09-03): 구조화 Context Pack API·로컬 CLI·평가 실행기 구현 완료. 생성형 answer는 로컬·배포 adapter 구현 완료, **임상 평가·공개 연결 대기**. published release가 없으면 draft projection을 읽지 않고 `unavailable` 반환. STG 자동 배포 파이프라인(`docs/deployment.md`)은 있으나 최초 content release는 mapping 3개·blocking validation 78개로 publish 차단 상태.

## Evaluation And Shadow Gates

- Doc-backed (§11 평가 gate): "대표 예시 몇 개가 동작하는 것으로 RAG 품질을 승인하지 않는다." 피부과 의사가 검수한 query fixture로 retrieval recall(expected source/claim이 top-k에 있는지)·안전 fixture 100% 통과·false-clear 0·응답 시간을 자동 측정. 일반 retrieval의 수치 기준은 labelled set baseline을 얻은 뒤 고정.
- Code-backed: `scripts/evaluate_canonical_retrieval.py` + `tests/test_retrieval_evaluation.py` — fixture는 `review.status`가 clinician approved가 아니면 거부(`ValueError: approved by a clinician`), unsafe drift(safety needs_confirmation, unverified evidence, 근거 없는 답변, latency 초과) 탐지.
- Code-backed: `retrieval/shadow.py` `SafetyShadowObservation/Report` — canonical read path 승격 전 legacy status와 canonical status·rule id·source coverage의 parity를 비교, mismatch_count 보고. `tests/test_retrieval_shadow.py`.
- Code-backed: retrieval 관련 테스트 파일 5개 (`test_retrieval_domain` 6, `test_canonical_retrieval` 3, `test_rag_query_application` 2, `test_retrieval_evaluation` 1, `test_retrieval_shadow` 1).
- Boundary: 임상 fixture 검수는 **대기** 상태. recall 등 실측 수치는 아직 없다.

## Canonical Data Platform

- Doc-backed (`docs/domain-driven-db-migration.md`, `docs/task-canonical-data-rag-delivery.md`, ADR 0002 "Canonical 데이터 strangler와 publication gate"): 현행 JSON 지식을 관계형 canonical 데이터로 옮기되 **기존 API 계약(URL·method·body·status·필드·enum)은 변경하지 않는** strangler 전환. Master·Rule·Document·Release aggregate와 ORM, Alembic 단일 baseline revision, **결정적 importer(재실행 무변경)**, release-scoped publication gate. DDD는 변경 규칙과 불변조건이 있는 객체만 aggregate로, 조회 전용 master·통계·RAG projection은 read model로. `Retrieval`은 별도 도메인이 아니라 Context를 읽어 Context Pack을 조립하는 application/query 계층이며 검색 결과가 안전·추천 판정을 새로 만들 수 없음.
- Code-backed: `test: freeze public api contract baseline`, `refactor: load insight query facts from canonical db`, `refactor: serve clinical references from database`, `ci: publish explicit canonical data init image`, `build: separate database provision from runtime`, `feat: add clinical claim review workflow`, `feat: expose canonical clinical review queue`.
- Boundary: 전환은 진행 중(Task 1/5 임상 검토 gate). "cutover 완료"로 쓰지 않는다. 정확한 revision 수·건수는 공개하지 않는다.

## Public Boundary

- 쓴다: 시술 정보 지식 플랫폼 / 의료 시술 지식 검색 API, hybrid retrieval 설계·구현, Context Pack, 평가·shadow 게이트, canonical 데이터 전환과 publication gate, "구현 완료 · 임상 검수 대기".
- 쓰지 않는다: 제품명 Procedure Hub, 벡터 DB·embedding·Elasticsearch/OpenSearch 운영 경험, production RAG 운영 완료, 임상 검수 완료, recall 수치, 시술·제품·고객사 실명, 정확 건수(17·60·774 등), 의사 실명.
