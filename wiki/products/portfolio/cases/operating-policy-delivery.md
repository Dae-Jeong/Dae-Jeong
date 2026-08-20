---
type: portfolio-case
case: operating-policy-delivery
title: 운영 요청을 제품 규칙으로 바꾸는 전달 패턴
description: NEXUS 관리 backend, Centurion DAY, Product Operations의 독립 근거에서 반복된 운영 정책 전달 패턴.
timestamp: 2026-08-17
tags: [portfolio, backend, product-operations, ax, cross-project-pattern]
resume_tag: OPERATING POLICY DELIVERY
origin: NEXUS 관리 backend · Centurion DAY · MediSolve AI Product Operations
claim_ids:
  - nexus.hospital-operations-revenue-contribution
  - nexus.backend-architecture
  - nexus.admin-backend-ownership
  - centurion.day-product-integration
  - mediness.product-system-design-participation
  - mediness.product-operations
  - be-template.agent-context
  - nexus.quality-automation
claim_strength: mixed (MEDINESS design contributed · other lanes led/owned)
---

## Executive Summary

운영 요청을 곧바로 화면 기능으로 옮기기보다, 먼저 조회·변경 주체와 상태·데이터 규칙을 정의하고 각 작업의 실행 범위에 전달해 왔습니다. 이 케이스는 NEXUS 관리 backend, Centurion DAY 예약 정책, MediSolve AI 제품 운영이라는 서로 독립적으로 검증된 세 작업 맥락에서 반복된 패턴을 정리한 것이며, 하나의 통합 시스템이나 단일 end-to-end 구축 사례가 아닙니다.

## AX Extension

이 케이스에서 AX는 AI에 제품 판단을 넘기는 것을 뜻하지 않습니다. 사람이 운영 맥락을 해석하고 권한·상태 전이·데이터 규칙·서비스 경계를 결정한 뒤, 이를 ADR·SPEC·Work Package·Agent Context 같은 작업 계약으로 남기는 방식입니다. AI는 이 경계 안에서 codebase 탐색과 초안·반복 구현을 보조합니다.

AI가 만든 변경은 Ruff·Pyright·pre-commit과 static·type·test, QA·release evidence로 검증합니다. Architecture와 release의 최종 판단·승인은 사람이 담당합니다. AI의 end-to-end 수행, 완전 자동화, 생산성·품질의 정량 향상은 주장하지 않습니다.

근거의 시간과 역할도 분리합니다.

- **제품 규칙 전달 근거:** NEXUS backend boundary, DAY 제품 전달, Product Operations gate는 서로 독립된 프로젝트에서 확인된 설계·운영 근거입니다.
- **AX 실행 방식 근거:** BE Template의 계층적 Agent Context와 반복 작업 automation skill은 `owned·verified`, NEXUS의 Ruff·Pyright·pre-commit 품질 자동화는 `led·in-progress` 근거입니다.
- 현재 방법론을 DAY·Product Operations의 과거 적용 성과로 소급하거나, 다섯 근거를 하나의 시스템으로 합성하지 않습니다.

## My Scope

- NEXUS에서는 외부 피부과 여러 곳의 홈페이지·관리·예약 backend monorepo의 service boundary와 migration flow, admin/homepage API를 독립 모듈로 둔 설계·구축을 리드하고 있습니다. 현재 repository의 재구축은 2026년 8월 기준 진행 중이며 제품 전체나 단독 구축으로 표현하지 않습니다.
- Centurion DAY에서는 예약 정책의 backend 판단, frontend 표시, QA seed/test, release 문서 연결을 리드했습니다. DAY 제품 전체 구축은 담당 범위가 아닙니다.
- MEDINESS 서비스는 구현 담당자와 제품 요구·운영 흐름을 구체화하는 설계에 참여했습니다. `contributed` 상한이며 서비스 구현이나 architecture·시스템 구조 설계 주도·전담은 주장하지 않습니다.
- MediSolve AI Product Operations에서는 제품 결정을 decision·SPEC·Work Package와 BE·FE·QA·release gate 실행으로 연결하는 운영을 리드했습니다. 제품 기획 전담이나 조직 전체 운영 총괄로 표현하지 않습니다.
- 세 근거를 공통 설계 패턴으로 해석하는 범위까지만 소유하며, 한 프로젝트의 빈 근거를 다른 프로젝트의 사실로 보완하지 않습니다.

## Problem Constraints

- 운영 요청은 화면이나 기능의 형태로 들어오지만, 구현 전에 누가 어떤 상태에서 무엇을 조회·변경할 수 있는지와 데이터 규칙을 정해야 합니다.
- 정책 변경은 backend 판단에만 머물지 않고, 프로젝트별로 검증된 frontend 표시·QA·release 또는 migration·운영 gate까지 전달되어야 합니다.
- 세 작업 맥락은 코드베이스, 전달 범위, ownership이 서로 다릅니다. 공통점은 판단 패턴이며 시스템 구성이나 결과를 합산할 수 없습니다.
- NEXUS backend 재구축은 진행 중이므로 현재 branch의 production 안정화 효과를 주장할 수 없습니다. 기존 운영 제품의 예약률·매출 outcome과 현재 재구축 상태를 분리합니다.

## Decision And Alternatives

- 공통 판단 순서를 `운영 맥락 -> 조회·변경 주체·상태·데이터 규칙 -> backend 계약 -> 프로젝트별 실행 범위`로 두었습니다.
- 화면별 요구를 곧바로 구현하는 방식은 초기 전달은 빠를 수 있지만 판단 기준이 구현 위치마다 달라질 수 있습니다. 이는 세 근거에서 도출한 설계 해석이며, 공식 대안 검토 기록으로 주장하지 않습니다.
- 세 작업 맥락을 하나의 공통 pipeline으로 합성하는 대신, 각 근거의 검증된 전달 경계와 ownership을 독립적으로 유지했습니다. 이 선택은 공통 성과를 부풀리지 않는 대신 각 lane의 근거와 한계를 따로 설명해야 하는 비용이 있습니다.
- Product Operations의 decision·SPEC·Work Package·release gate는 제품 판단을 대신하지 않고, 확인된 판단을 실행과 검증에 연결하는 장치로만 사용했습니다.

## System Design Implementation

diagram: NEXUS 운영 맥락 -> admin/homepage API module -> gateway·migration flow

diagram: DAY 예약 정책 -> backend 판단 -> frontend 표시 -> QA seed/test -> release docs

diagram: 제품 결정 -> decision·SPEC -> Work Package -> BE·FE·QA·release gate

### AX extension diagram

```text
운영 요구
  -> 사람 판단: 권한·상태 전이·데이터·서비스 경계
  -> 작업 계약: ADR·SPEC·Work Package·Agent Context
  -> AI 실행: codebase 탐색·초안·반복 구현 보조
  -> 자동 검증: Ruff·Pyright·pre-commit·static·type·test evidence
  -> 사람 승인: QA·release evidence 확인·architecture/release 최종 판단
```

이 흐름은 기존 세 사례를 하나의 pipeline으로 합친 구현도가 아니라, 그 판단 방식을 BE Template과 NEXUS 품질 자동화 근거로 확장한 현재 작업 방식입니다.

- NEXUS에서는 admin/homepage API를 독립 모듈로 두고 gateway와 migration flow로 연결하는 backend boundary를 설계·구축하고 있습니다.
- DAY에서는 하나의 예약 정책을 backend 판단, frontend 표시, QA seed/test, release 문서가 같은 기준으로 소비하도록 연결했습니다.
- Product Operations에서는 decision에서 시작한 제품 변경을 SPEC·Work Package와 owner lane, QA 승인, release gate로 이어지게 운영했습니다.
- 위 세 diagram은 독립된 구현·운영 lane입니다. 서로 순차 호출하거나 하나의 runtime을 구성하지 않습니다.

## Failure Modes Operation

- 정책 기준이 화면·API·QA 문서에 따로 남으면 변경 시 서로 다른 해석이 생길 수 있어, 프로젝트별 기준점과 전달 대상을 함께 갱신합니다.
- 한 실행 lane만 바뀌고 검증·release 근거가 뒤따르지 않는 변경은 Product Operations의 Work Package·QA·release gate에서 연결 상태를 확인합니다.
- NEXUS처럼 진행 중인 작업은 구현 사실과 현재 상태를 분리해 기록하고, 완료·안정화·운영 효과 표현을 사용하지 않습니다.
- 서로 다른 프로젝트의 근거를 합쳐 단일 end-to-end 사례처럼 보이지 않도록 evidence lane과 limits를 함께 공개합니다.

## Evidence, Result, Limits

- Code-backed · NEXUS: backend monorepo service boundary와 migration flow 주도, admin/homepage API 독립 모듈과 gateway 구성이 확인됨. `led`, 진행 중.
- User-confirmed · NEXUS Product Outcome: 기존 운영 제품은 예약률 개선을 통해 고객사 매출 성과에 기여함. `contributed/medium`; 정확한 증가율·매출 증분·backend 단독 인과는 claim하지 않음.
- Code-backed · Centurion DAY: 예약 정책을 backend 판단, frontend 표시, QA seed/test, release 문서로 연결한 변경이 확인됨. `led`, 검증 완료.
- User-confirmed · MEDINESS Product Design: 서비스 구현 담당자와 제품 요구·운영 흐름을 구체화하는 설계에 참여함. `contributed`; 서비스 구현 및 architecture·시스템 구조 설계 주도는 claim하지 않음.
- Source-backed · Product Operations: pipeline registry와 decision·SPEC·Work Package·owner lane·QA approval·release gate 구조가 확인됨. `led`, 제품 운영 범위.
- Code-backed · BE Template: 계층적 Agent Context와 반복 작업 automation skill을 backend template에 내장. `owned`, 검증 완료.
- Code-backed · NEXUS Quality Automation: Ruff·Pyright·pre-commit 기반 자동 검증 체계 구축을 리드. NEXUS가 진행 중이므로 현재 방법론 근거로만 사용.
- Inference: 세 독립 근거에서 운영 요청을 실행 가능한 규칙으로 바꾸고 제품 전달 범위까지 연결하는 반복 패턴을 도출함.
- Result: 세 근거의 검증된 범위 안에서 제품 판단과 backend·검증·release 실행 사이의 연결을 설명할 수 있음.
- Limits: 하나의 통합 시스템, 세 작업 맥락 전체의 단독 구축, 공유주거·PMS 직접 경험, 제품 기획 전담, 운영 시간·오류 감소 같은 미측정 효과를 주장하지 않음.
- AX Limits: AI가 제품 판단·architecture·release 결정을 대체했다거나 세 사례를 end-to-end로 수행했다고 주장하지 않음. 완전 자동화와 생산성·품질 정량 향상도 주장하지 않음.
- DAY는 Centurion의 범용 피부과 CRM 영역이고, NEXUS는 Centurion과 별도의 외부 피부과 운영·예약 시스템입니다. 이 케이스의 세 lane은 서로 독립적으로 검증된 프로젝트·작업 맥락을 뜻합니다.

## Stack

FastAPI · SQLAlchemy 2.0 · API Gateway · migration flow · backend policy · frontend display · QA seed/test · decision · SPEC · Work Package · release gate
