---
type: project-evidence
title: NEXUS Evidence
description: External hospital product backend monorepo and Terraform evidence.
timestamp: 2026-07-11
source_roots: [workspace, agentspace]
tags: [nexus, backend, terraform, evidence]
---

# NEXUS Evidence

Source locators: `workspace:NEXUS`, `workspace:NEXUS-infra`, `agentspace:mediness-nexus`

## Backend Architecture

- Code-backed: multi-brand backend monorepo의 service boundary, migration/domain audit, documentation governance가 확인됐다.
- Contribution boundary: backend architecture와 migration flow 주도. 고객 제품 전체 단독 구축은 아니다.

## Terraform Infra

- Code-backed: NEXUS Terraform repository의 구축 범위가 확인됐다.
- Contribution boundary: 해당 IaC repository 구축 전담. 고객 resource detail은 공개하지 않는다.

## Public Disclosure

- `NEXUS`는 외부 병원 product backend를 가리키는 public label로 사용한다.
- 고객사와 브랜드명은 공개하지 않는다.

## Rejected Or Unverified Claims

- 고객사명과 브랜드명
- 병원 SaaS 전체 단독 구축
- 구체 resource, cost, security configuration
