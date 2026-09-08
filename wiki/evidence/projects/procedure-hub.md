---
type: evidence
title: Procedure Hub — Canonical Clinical Data Platform And Hybrid Retrieval (RAG)
description: MediSolve AI 시술 정보 지식 플랫폼의 canonical 데이터 전환, hybrid retrieval(RAG) API, 임상 평가 게이트에 대한 Git·문서 근거.
timestamp: 2026-09-08
tags: [evidence, procedure-hub, rag, retrieval, canonical-data, mediness]
---

# Procedure Hub — Canonical Clinical Data Platform And Hybrid Retrieval

2026-09-08 재검증의 선택·보류와 검토 범위는 [성과 코드 조사 audit](../audits/2026-09-08-achievement-code-discovery.md)에 둔다.

내부 제품명 `Procedure Hub`(repo `MediSolveAIDev/PROCEDURE-HUB`)는 공개 문안에서 **시술 정보 지식 플랫폼** 또는 **의료 시술 지식 검색 API**로 쓴다 ([public-safety Internal Product Names](../../rules/public-safety.md)). 2026-07 audit의 `Procedure-Hub · other author signal · Skip`은 이 시점(2026-09-03) 이전 기록이며 아래 근거로 대체한다.

## Authorship

- Git-backed (2026-09-03 local clone): 저장소 author 분포 KimMarin 93 · JongJin Lee 83 · kknaksss 67 · medisolve-yeseul 33. Frontend(Next.js)는 다른 author가 주로 맡는다.
- Historical Git-backed (2026-09-03): 당시 `backend/app/modules/retrieval/` 5개 파일(domain·application·persistence·generation·shadow)의 변경에서 KimMarin 기여를 확인했다. 이 파일 목록은 현재 구조가 아니다. `af3afbb`가 generation·shadow를 삭제했으며 현재 범위는 아래 2026-09-08 재검증을 따른다.
- Git-backed: 2026-09-02~03 KimMarin 커밋 40건 이상 — `feat: add canonical clinical data platform`, `refactor: consolidate canonical release migration`, `feat: add local canonical retrieval cli`, `refactor: isolate retrieval api contract`, `feat: add deployed rag answer generator`, `feat: connect canonical rag to insight query`, `test: add clinician retrieval evaluation gate`, `fix: restore canonical safety shadow gate`, `feat: add clinical claim review workflow`, `fix: bind generated claims to atomic sources`, `fix: reject unverified literature identifiers`, `test: freeze public api contract baseline`, `ci: preserve immutable runtime rollback images`, `build: separate database provision from runtime`.
- User-confirmed (2026-09-03): "RAG는 지금 하고 있다. Elasticsearch 같은 검색 엔진 운영은 경험이 없다."
- Current source / Git-backed (2026-09-08): `workspace:PROCEDURE-HUB`, clean `refactor/frontend@5b9af030`. KimMarin commits `bd8e414`(claim review), `af3afbb`(knowledge retrieval로 표면 교체·generation/shadow 삭제), `f713216`(release-scoped 검색·index), `ce588cd`(검색 confidence 경계)를 선택한 변경 목록·현재 코드로 대조했다. 기존 `owned` 상한을 유지하되 frontend·임상 검수·플랫폼 전체 ownership으로 확장하지 않는다.

## Hybrid Retrieval Design

- Historical design-backed (`docs/query-retrieval-rag-design.md`, 2026-09-03 당시 문서; 현재 router는 `docs/architecture/retrieval.md`): 대상은 자연어 질의를 받아 관련 시술·고민·제품·안전 규칙·문헌 근거를 반환하는 API. **문서를 전부 벡터화한 뒤 가까운 문장을 반환하는 형태로 시작하지 않는다.** 지식의 대부분이 시술 코드·제품·금기·간격·추천 패키지처럼 관계가 명확한 구조화 데이터라, **구조화 조회가 판단하고 문헌 검색은 근거를 보강하는 hybrid retrieval**로 설계했다.
- Doc-backed: pipeline `자연어 질의 → 의도·엔티티 후보 해석 → Master/alias로 canonical ID 확정 → 의도별 SQL 조회 → 안전 규칙 우선 판정 → 검증된 문헌·설명 근거 보강 → 출처 포함 Context Pack 반환 → 선택적으로 Context Pack만 사용해 설명 생성`.
- Design / current boundary: API 주산출물은 최종 상담 문장이 아니라 **구조화된 Context Pack**이다. 엔티티 후보가 모호하면 추가 확인을 요구하고, 문헌 검색 결과만으로 안전·추천 상태를 만들지 않는다. 현재 response는 source ref와 release 경계를 제공하지만 legacy literature source의 `revision_id=null` 경로도 있어 모든 source에 revision이 채워진다고 단정하지 않는다. LLM 설명 생성은 과거 별도 adapter 실험이며 현재 검색 API에서 제공하지 않는다.
- Doc-backed 판단 근거 (2026-09-02 로컬 적재 실측): 시술군 17 · 고민 14 · 제품 60 · 금기 규칙 27 · 시너지 115 · 추천 패키지 24 · 문헌 statement 774(평균 84~107자, 최대 283자) · citation 788. 이 규모에서는 chunking·vector DB·reranker를 첫 단계에 운영할 이유가 없고, DB 이미지에 `vector` extension이 없음. 1차 검색 순서: code/exact alias → 정규화 alias → bounded fuzzy match → canonical entity 관계형 SQL → 문헌은 entity/topic filter 후 lexical rank → **평가셋에서 recall 부족이 증명될 때만 embedding 추가**.
- Current code-backed (2026-09-08): `backend/app/modules/retrieval/application.py:193`은 cursor를 query와 release에 결속하고, `:360`은 published release가 없으면 draft 대신 `unavailable`을 반환한다. `:433`은 검색과 별도로 구조화 안전 규칙을 조회하고, `:517`은 규칙 부재가 병용 가능을 뜻하지 않음을 명시한다. `:529`는 모호한 entity를 `needs_clarification`으로 반환한다. 문헌·검색 적합도와 안전 판정을 혼동하지 않는 구현이다.
- Historical status (2026-09-03): 생성형 answer adapter·shadow 비교와 당시 mapping 3개·validation 78개 차단은 그 날짜의 구현·로컬 검증 이력이다. `af3afbb`에서 `generation.py`·`shadow.py`가 제거됐으므로 **현재 생성형 answer가 임상 검수만 기다리며 운영 중이라는 설명은 superseded**다.
- Verification boundary (2026-09-08): 현재 `docs/reviews/canonical-delivery.md:443`은 임상 fixture·최초 release 평가를 blocker로 유지한다. 같은 문서 `:574`·`:575`·`:576`의 2026-09-04 수동 STG 전환·test release 검증 기록은 production 임상 승인·자동 CD 검증 완료 또는 현재 branch 전체의 운영 반영 증거가 아니다. 이번 조사는 source·검증 기록 대조만 수행했고 테스트·DB·외부 API는 실행하지 않았다.

## Evaluation And Shadow Gates

- Doc-backed (§11 평가 gate): "대표 예시 몇 개가 동작하는 것으로 RAG 품질을 승인하지 않는다." 피부과 의사가 검수한 query fixture로 retrieval recall(expected source/claim이 top-k에 있는지)·안전 fixture 100% 통과·false-clear 0·응답 시간을 자동 측정. 일반 retrieval의 수치 기준은 labelled set baseline을 얻은 뒤 고정.
- Current test-source-backed (2026-09-08): `backend/scripts/evaluate_canonical_retrieval.py:24`는 승인 상태·검수자·case 식별자가 없는 fixture를 거부한다. `:38`은 expected entity·domain·item/source·safety 일치, 미검증 source·release 누락·latency를 검사한다. `backend/tests/test_retrieval_evaluation.py:6`에 미승인 fixture 거부와 unsafe drift 검사가 있다. 평가 기준의 구현이며 임상 fixture 검수 완료·실측 recall 점수를 뜻하지 않는다.
- Historical code-backed: `retrieval/shadow.py`의 legacy/canonical 안전 parity와 당시 관련 테스트는 2026-09-03 전환 검증용 구현 이력이다. `af3afbb`에서 shadow 모듈이 삭제되고 `f713216`에서 해당 테스트 경로가 정리됐다. 현재 운영 중인 shadow 게이트로 표현하지 않는다.
- Boundary: 임상 fixture 검수는 **대기** 상태. recall 등 실측 수치는 아직 없다.

## Canonical Data Platform

- Doc-backed (`docs/domain-driven-db-migration.md`, `docs/task-canonical-data-rag-delivery.md`, ADR 0002 "Canonical 데이터 strangler와 publication gate"): 현행 JSON 지식을 관계형 canonical 데이터로 옮기되 **기존 API 계약(URL·method·body·status·필드·enum)은 변경하지 않는** strangler 전환. Master·Rule·Document·Release aggregate와 ORM, Alembic 단일 baseline revision, **결정적 importer(재실행 무변경)**, release-scoped publication gate. DDD는 변경 규칙과 불변조건이 있는 객체만 aggregate로, 조회 전용 master·통계·RAG projection은 read model로. `Retrieval`은 별도 도메인이 아니라 Context를 읽어 Context Pack을 조립하는 application/query 계층이며 검색 결과가 안전·추천 판정을 새로 만들 수 없음.
- Code-backed: `test: freeze public api contract baseline`, `refactor: load insight query facts from canonical db`, `refactor: serve clinical references from database`, `ci: publish explicit canonical data init image`, `build: separate database provision from runtime`, `feat: add clinical claim review workflow`, `feat: expose canonical clinical review queue`.
- Current code-backed (2026-09-08): `backend/app/modules/knowledge/application.py:100`은 claim 검수와 근거 적격성 검사를 transaction으로 묶고 audit를 남긴다. `backend/app/modules/knowledge/domain.py:365`는 현재 statement의 승인과 사용 가능한 검증 citation 최소 1개를 요구한다. `backend/app/modules/publication/application.py:122`는 미해결 mapping·blocking validation이 있으면 publish를 거부하고, `:166`은 이전 published revision 집합을 새 release로 복구한다. 이는 게시·복구 구현이며 실제 production rollback 실행 증거가 아니다.
- Historical/current separation: 결정적 importer·runtime/data-init 분리는 2026-09-03 전환 과정의 구현 이력이다. 후속 baseline·snapshot 정리(`f1ec75f`)가 있으므로 과거 importer·data-init image가 현재 운영 경로라고 단정하지 않는다. 현재 publication·review 경계는 위 source가 소유한다.
- Boundary: 전환은 진행 중(Task 1/5 임상 검토 gate). "cutover 완료"로 쓰지 않는다. 정확한 revision 수·건수는 공개하지 않는다.

## Public Boundary

- 쓴다: 시술 정보 지식 플랫폼 / 의료 시술 지식 검색 API, hybrid retrieval 설계·구현, 구조화 Context Pack, 검수 fixture 기반 평가 실행기, canonical 데이터 전환·review·publication gate 구현. 임상 fixture·release 승인과 production 운영은 별도 미확인이다. shadow·생성 adapter는 필요할 때 과거 구현 이력으로만 설명한다.
- 쓰지 않는다: 제품명 Procedure Hub, 벡터 DB·embedding·Elasticsearch/OpenSearch 운영 경험, production RAG 운영 완료, 임상 검수 완료, recall 수치, 시술·제품·고객사 실명, 정확 건수(17·60·774 등), 의사 실명.
