---
type: project-evidence
title: Backend Template Evidence
description: Organization FastAPI standard and agent context system evidence.
timestamp: 2026-07-11
source_roots: [workspace]
tags: [backend-template, architecture, agent-context, evidence]
---

# Backend Template Evidence

Source locator: `workspace:MEDISOLVEAI-BE-TEMPLATE`

## Backend Standard

- Code-backed: layered architecture, dependency injection, response/error conventions, type safety, ADR, runbook, option boundaries가 확인됐다.
- Code-backed: repository 대부분의 설계·구축 변경이 직접 기여 범위로 확인됐다.
- Contribution boundary: template 설계·구축 전담. 조직의 모든 backend 결정을 단독 소유했다는 의미는 아니다.

## Agent Context

- Code-backed: 계층형 agent context, Hub-and-Spoke document routing, domain/setup automation skills가 template에 포함됐다.
- Public-safe summary: backend standard에 agent context system과 반복 작업 automation skill 내장.

## Team Leverage Context

- User-confirmed (2026-07-19 인터뷰): 조직 맥락 — 엔지니어 8명(BE 3·FE 5)이 제품 12개를 담당했고, BE 1명이 외부 프로젝트 차출로 **실질 BE 2명이 12개 제품을 관리**. 통일된 패턴·구성이 생존 조건이었다.
- User-confirmed (2026-07-19): 효과 3종 — ① 어떤 프로젝트든 제품 정책만 파악하면 대응 가능(컨텍스트 전환 비용 최소화) ② logging·모니터링 등 횡단 관심사를 전 제품에 일괄 반영 ③ 온보딩·FE 엔지니어도 패턴·규약·하네스 아래에서 BE 로직 구현 가능(고민 시간 감소).
- ⚠️ 공개 여부 확인 필요: 제품 수(12개)·인원 수치는 mediness 가드레일("internal product count 비공개")과 충돌 — 사용자 결정 대기. 확정 전 공개 표현은 "소수 백엔드 인원이 다수 제품을 담당하는 체제"까지.

## Public Disclosure

- architecture pattern, ADR, runbook, agent context 구조는 일반화해 공개 가능하다.
- private repository path와 내부 convention detail은 필요 이상 공개하지 않는다.

## Rejected Or Unverified Claims

- agent가 context 없이 모든 작업 가능
- 새 프로젝트 비용이 정량적으로 감소했다는 주장
