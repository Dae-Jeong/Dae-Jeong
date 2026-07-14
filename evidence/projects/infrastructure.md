---
type: project-evidence
title: Company Azure Infrastructure Evidence
description: Company-wide Azure/Terraform infrastructure ownership, current operating scope, and public claim boundaries.
timestamp: 2026-07-11
source_roots: [workspace]
tags: [azure, terraform, infrastructure, operations, evidence]
---

# Company Azure Infrastructure Evidence

Source locators: `workspace:MEDISOLVEAI-INFRA`, `workspace:MEDISOLVEAI-B2C-INFRA`, `workspace:NEXUS-infra`, `workspace:thedaylabs-infra`

## Company Azure Ownership

- User-confirmed: 회사 infra repository 전체와 Azure infra 운영·관리를 김대정이 담당한다.
- Code-backed: B2B/B2C/NEXUS Terraform roots, remote state, App Service/ACR deployment, environment/resource separation, runbook 변경이 repo와 Git history에서 확인됐다.
- Tool-backed: 2026-07-11 Azure CLI read-only snapshot에서 product/environment resource group, App Service, VM, PostgreSQL, Cognitive Services, monitoring alert가 실제 운영 중임을 확인했다.
- Contribution boundary: 회사 Azure/Terraform infra 전반의 담당·운영은 `owned`로 표현할 수 있다. 개별 resource의 최초 생성 주체까지 일괄 단독으로 표현하지 않는다.

## Current Operating Snapshot

아래 수치는 내부 검증용이며 시점에 따라 변한다. 기본 공개 문구에는 사용하지 않는다.

- 22 resource groups, 327 resources.
- 13 App Services: all running, Terraform-tagged, HTTPS-only, TLS 1.2+, FTPS disabled.
- 231 resources tagged as Terraform-managed.
- 8 PostgreSQL Flexible Servers ready and 8 metric alerts enabled.
- Thready production App Service: trailing 30-day platform metric showed about 41k requests and about 0.32% HTTP 5xx.
- SAY Application Insights HTTP sample was queryable, but it does not prove full realtime/WebSocket workload coverage.

## Measurement Boundary

- 현재 snapshot은 운영 범위와 현재 상태를 증명한다.
- 안정성·비용·배포 속도 "개선" claim에는 변경 전후 기간과 변경 commit/PR 연결이 추가로 필요하다.
- Azure Activity Log는 사용자·CI·Terraform activity가 섞이고 retention/window 제한이 있어 개인 성과의 단독 근거로 사용하지 않는다.

## Public Disclosure

- 공개 가능: 회사 Azure/Terraform infra 전반 담당, B2B/B2C·제품·환경 boundary, deploy/runbook 운영.
- 기본 비공개: subscription/resource/customer 이름, 정확한 resource 수, traffic, cost, security configuration.
