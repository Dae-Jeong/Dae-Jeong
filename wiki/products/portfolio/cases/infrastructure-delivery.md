---
type: portfolio-case
case: infrastructure-delivery
title: 회사 Azure/Terraform 인프라의 제품·환경 경계와 배포 운영
resume_tag: INFRASTRUCTURE DELIVERY
origin: MediSolve AI · 회사 인프라
claim_ids:
  - infra.company-azure-ownership
  - centurion.shared-infra
claim_strength: owned
---

## Executive Summary

회사 Azure/Terraform 인프라 전반의 설계·구축·운영을 담당하고 있습니다. B2B/B2C·제품·환경별 resource boundary와 deploy/runbook을 관리해, 제품 백엔드의 변경을 인프라 배포와 운영 절차까지 연결합니다.

## My Scope

- 회사 Azure/Terraform 인프라 repository와 지속적인 운영·관리 전담
- B2B/B2C·제품·환경별 resource boundary와 deploy/runbook 관리
- Centurion 인프라 구축·운영과 runbook·문서화 담당
- 모든 Azure resource의 최초 생성 주체나 고객·resource·cost·security 세부 정보는 이 범위에 포함하지 않음

## Problem And Constraints

- 여러 제품과 환경의 인프라 변경을 하나의 운영 책임 안에서 다루되, 제품·환경별 변경 경계를 유지해야 했습니다.
- 애플리케이션 배포와 Terraform 변경, 운영 runbook이 서로 다른 기준으로 움직이지 않도록 관리해야 했습니다.
- 실제 resource 수와 비용·보안 설정은 시점에 따라 바뀌며 공개 범위가 아니므로, 구조와 운영 책임만 설명합니다.

## Decision And Alternatives

- 제품·환경별 resource boundary를 유지하고, 변경과 배포 절차를 Terraform과 runbook에 남기는 방식을 선택했습니다.
- 모든 제품·환경을 하나의 공용 경계로 묶는 대안은 변경 범위와 운영 책임을 분리하기 어렵게 만듭니다. 다만 공식 대안 검토 기록은 확인되지 않아, 이 문서에서는 현재 채택한 구조와 trade-off만 설명합니다.
- 분리된 경계는 변경 범위를 나눌 수 있는 대신 repository·state·runbook을 지속해서 관리해야 하는 운영 비용이 있습니다.

## System Design And Implementation

diagram: 제품·환경별 Terraform boundary -> Azure resource -> deploy/runbook -> 제품 운영

- B2B/B2C와 제품·환경 단위로 Terraform root와 resource boundary를 관리합니다.
- 원격 상태와 배포 구성을 코드로 추적하고, 제품 배포 절차를 runbook과 함께 유지합니다.
- Centurion 범위에서는 Azure/Terraform 인프라 구축·운영과 runbook·문서화를 담당했습니다.

## Failure Modes And Operation

- 제품·환경 경계를 넘어가는 변경은 영향 범위를 키울 수 있어 boundary 단위로 변경을 구분합니다.
- 코드와 실제 운영 절차가 어긋나지 않도록 deploy/runbook을 인프라 변경과 함께 관리합니다.
- 인프라 운영은 일회성 구축으로 끝내지 않고, 제품 배포와 환경 변경에 맞춰 지속적으로 갱신합니다.

## Evidence, Result, Limits

- Code-backed: B2B/B2C·제품·환경별 Terraform root, remote state, 배포 구성과 runbook 변경이 확인됨
- Tool-backed: Azure 환경이 실제 운영 중인 상태를 read-only snapshot으로 확인함
- Result: 회사 Azure/Terraform 인프라 전반의 설계·구축·운영과 제품·환경별 배포 경계를 담당
- Limits: 모든 Azure resource를 최초부터 단독 생성했다고 주장하지 않으며, 정확한 고객·resource·cost·security detail과 운영 규모 수치는 공개하지 않음

## Stack

Azure · Terraform · App Service · Container Registry · PostgreSQL · monitoring · deploy/runbook
