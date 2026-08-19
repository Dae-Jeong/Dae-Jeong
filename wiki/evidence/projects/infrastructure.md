---
type: project-evidence
title: Company Azure Infrastructure Evidence
description: Company-wide Azure/Terraform infrastructure ownership, current operating scope, and public claim boundaries.
timestamp: 2026-08-18
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

## Terraform State And Drift Safety

- Code-/document-backed (2026-08-18): 회사 Azure Terraform을 하나의 monorepo에서 관리하되 Shared·B2B STG·B2B Prod·B2C Shared·B2C STG·B2C Prod **6개 root와 remote state**로 분리해 apply와 blast radius 경계를 고정했다 (`workspace:MEDISOLVEAI-INFRA/azure/ROOTS.md`).
- Tool-backed (2026-08-18 read-only `terraform state list`): 6개 root의 state address는 합계 **426개**다. 공개 문구에서는 snapshot 변동성과 resource/state 차이를 고려해 `400+ state object`로 범위화한다. 같은 snapshot에서 VM 21대·App Service 9개가 확인됐지만 기본 이력서에는 별도 노출하지 않는다.
- Process-backed: state snapshot·`terraform plan`·Azure CLI live inventory를 교차 검증하고, 의도하지 않은 destroy/replace가 있으면 apply를 중단하는 gate를 운영한다.
- Operation-backed: NEXUS root에서 collation/charset drift로 PostgreSQL replacement가 포함된 plan을 apply하지 않았고, B2C live reconciliation에서는 STG/Prod 각각 `2 import, 0 add, 2 change, 0 destroy` 조건으로 기존 plan 편입을 준비했다. live App Service logging 설정을 코드에 보존해 부수적인 logging 제거도 plan 단계에서 제외했다.
- Contribution boundary: monorepo/state 경계와 drift audit·apply gate의 구축·운영은 `owned`. 모든 Azure resource의 최초 생성, drift 0건, 전 변경 자동 apply로 확대하지 않는다.

## Production Observability

- Code-/state-backed (2026-08-18): Azure Monitor·Log Analytics와 AMA/DCR association으로 **10대 VM**의 container log 수집 경계를 중앙화했다.
- Code-/state-backed: Production에 CPU·memory·disk와 API health·5xx, DB availability·storage·failed connection을 포함한 **8개 metric alert**와 email action group을 Terraform으로 관리한다.
- Measurement boundary: 수집·alert 구성을 증명하지만 MTTR·가용성·장애 감소의 전후 수치는 없다.
- Contribution boundary: 위 관측·alert infrastructure의 구축·운영은 `owned`.

## Measurement Boundary

- 현재 snapshot은 운영 범위와 현재 상태를 증명한다.
- 안정성·비용·배포 속도 "개선" claim에는 변경 전후 기간과 변경 commit/PR 연결이 추가로 필요하다.
- Azure Activity Log는 사용자·CI·Terraform activity가 섞이고 retention/window 제한이 있어 개인 성과의 단독 근거로 사용하지 않는다.

## Public Disclosure

- 공개 가능: 회사 Azure/Terraform infra 전반 담당, B2B/B2C·제품·환경 boundary, deploy/runbook 운영, 6개 독립 root·400+ state object, 10대 VM log 중앙화·8개 Production alert.
- Source-backed (2026-07-17): 회사가 한국마이크로소프트 협약과 Azure 기반 인프라를 공개 보도함 (매일신문 2026-04-22) — 이력서에서 Azure 기반 언급은 회사 기밀이 아님이 확인됨.
- 기본 비공개: subscription/resource/customer 이름, 정확한 resource 수, traffic, cost, security configuration.
