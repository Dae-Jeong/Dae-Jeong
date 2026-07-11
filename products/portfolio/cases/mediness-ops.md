---
type: portfolio-case
case: mediness-ops
title: agent 기반 제품 운영 시스템 — 리드 업무를 회의가 아니라 시스템으로
resume_tag: MEDINESS
origin: MediSolve AI · 제품 운영
claim_ids: [mediness.product-operations, mediness.daily-briefing]
claim_strength: led
---

## 문제

여러 제품의 일정·이슈·릴리스 상태가 회의와 개인의 기억에 의존했습니다. 어떤 제품이 어느 단계인지, 어떤 블로커가 살아있는지를 확인하는 비용이 매일 반복됐습니다.

## 접근

- 제품 상태의 single source of truth를 문서 파이프라인으로 — 결정(decision) -> 기능 계약(SPEC) -> 실행(Work Package) -> 릴리스 게이트
- 상태 수집을 사람이 아니라 agent가 — 협업 도구 활동을 매일 자동 집계

## 구현

diagram: [soft] Slack · Jira · GitHub · Confluence 활동 -> daily briefing agent (자동 집계·요약) -> pipeline registry 갱신 · blocker triage -> release gate · version cut

- 제품별 decision log(결정일·owner 추적), SPEC-WP coverage 매핑, 변경 이력은 PR 단위 기록
- 릴리스 완료 시 결정·스펙·실행 문서를 버전 스냅샷으로 동결(cut)

## 운영/결과

- 매일 자동 생성되는 briefing으로 제품 전체 상태 가시화 — 생성 품질 블로커를 당일 결정·수정 배포로 연결한 운영 사례
- 기획 전담·경영진과의 결정은 문서로 남고, 실행·릴리스 추적은 시스템이 담당하는 분업 확립

## Stack

source-of-truth docs · agent 자동 집계 · decision/SPEC/WP 파이프라인 · release gate
