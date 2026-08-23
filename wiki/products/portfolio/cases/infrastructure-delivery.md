---
type: portfolio-case
case: infrastructure-delivery
title: 회사 Azure runtime topology와 1인 운영 체계
resume_tag: INFRASTRUCTURE DELIVERY
origin: MediSolve AI · 회사 인프라
status: archived-evidence
claim_ids:
  - infra.company-azure-ownership
  - infra.workload-runtime-topology
  - infra.ai-assisted-change-harness
  - infra.terraform-state-safety
  - infra.azure-observability
  - centurion.shared-infra
claim_strength: mixed internal evidence; not selected for public positioning
---

> 2026-08-23 selection correction: 서비스 배포 환경 구성·기본 운영 경험은 사실로 보존하지만 infrastructure architecture 전문성으로 포지셔닝하지 않는다. 이 case는 public master·role variant에서 선택하지 않는다.

## Executive Summary

회사 Azure 운영을 맡아 기존 Shared·B2B·B2C 리소스를 제품군·환경별 root/state로 통합하고 현재 runtime topology와 변경 체계를 관리합니다. 공통 이미지는 Shared ACR에서 공급하되 B2B와 B2C의 runtime·data·state는 분리하고, workload에 따라 App Service와 VM을 함께 사용합니다. 운영 신호는 환경별 Azure Monitor·Log Analytics에서 같은 기준으로 보고, 변경은 6개 독립 root·remote state와 사람의 apply gate로 통제합니다. 별도 project IaC는 core monorepo와 분리해 관리합니다.

## My Scope

- B2B/B2C·제품·환경별 Azure resource와 Terraform repository 운영 참여
- shared ACR, workload별 App Service·VM runtime, managed data, 환경별 observability의 현재 운영 구조 관리
- state migration, drift audit, deploy/runbook, log·alert 운영
- AI-assisted inventory·implementation과 사람이 승인하는 apply gate 설계
- 모든 Azure resource를 최초부터 만들었거나 모든 변경이 무인 자동화됐다고 주장하지 않음

## Problem And Constraints

여러 제품과 환경을 한 사람이 관리하려면 기억과 수동 명령에 의존할 수 없었습니다. 기존 resource를 코드에 편입할 때 잘못된 state 주소나 region 차이는 운영 리소스의 destroy·replace로 이어질 수 있고, 제품별 변경이 다른 환경으로 전파되지 않도록 blast radius도 분리해야 했습니다.

## Decision And Alternatives

- 공통 image artifact는 Shared ACR에서 공급하고, B2B/Centurion과 B2C 제품의 runtime·data·state ownership은 분리했습니다.
- B2B는 App Service Gateway 뒤 환경별 VNet의 Docker service·managed data로, B2C는 Thready API·AI App Service와 다른 App Service·VM workload·managed data로 구성했습니다.
- Shared·STG·Prod 기준 6개 독립 Terraform root·remote state로 변경 범위를 나눴습니다.
- AI는 live resource 탐색과 Terraform 초안에 사용하고, 사람은 state snapshot·fmt·validate·plan·Azure live inventory를 교차 검증한 뒤 apply를 승인합니다.
- 현재 workload와 조직 규모에 맞는 Azure managed application runtime을 사용해 platform 운영 부담을 제한했습니다. 특정 기술의 우열이 아니라 현재 제약에 맞춘 운영 선택입니다.

## System Design And Implementation

diagram: Shared ACR -> B2B/Centurion(App Service Gateway -> environment boundary -> VNet의 VM·managed DB + VNet 밖 Storage) | B2C(Thready API·AI App Services + other App Service/VM workloads -> managed data) | Azure Monitor 아래 환경별 Log Analytics와 metric alert를 병렬 운영

- 실제 runtime topology와 Terraform control plane을 분리해 설명한다. topology는 traffic·compute·data·observability를, core monorepo의 6개 root/state는 제품군·환경 간 변경 범위와 blast radius를 보여준다.
- runtime topology는 Microsoft 공식 Azure architecture icon을 변형 없이 사용하고 서비스명과 함께 표기한다. Terraform control plane은 Azure 실행 경계 밖에 둔다. Source: https://learn.microsoft.com/en-us/azure/architecture/icons/ (checked 2026-08-20)
- 6개 root·remote state와 400개 이상의 state object 운영
- state snapshot·plan·Azure CLI inventory를 교차 검증하는 apply gate
- Azure Monitor·환경별 Log Analytics와 AMA/DCR로 구성된 10대 VM container log 수집 범위 운영
- CPU·memory·disk·API health/5xx·DB availability/storage/failed connection을 포함한 8개 Production alert 운영

## Failure Modes And Operation

- 의도하지 않은 destroy·replace는 apply 전에 plan과 live inventory 비교로 차단
- 수동 변경은 무조건 오류로 취급하지 않고 의도된 변경과 실제 drift를 분리
- AI가 만든 Terraform은 바로 apply하지 않으며 state와 live resource를 근거로 사람이 승인
- 가용성·MTTR·실제 비용 절감처럼 아직 전후 측정이 없는 성과는 주장하지 않음

## Evidence, Result, And Limits

- 6개 Terraform state, 400+ state object
- 10대 VM log 수집 범위, 8개 Production alert 구성·운영
- region 불일치에 의한 강제 교체와 App Service log·health check 제거 위험을 apply 전에 확인한 drift audit 기록
- 서비스 배포 환경 구성·기본 운영은 말할 수 있지만 회사 전체 infrastructure architecture ownership이나 모든 resource의 최초 생성은 범위 밖
- Hub-Spoke·Azure Container Apps·Tailscale·Key Vault consolidation·GitHub OIDC 등 target proposal은 현재 구현과 분리

## Stack

Azure · Terraform · App Service · VM · Azure Monitor · Log Analytics · GitHub Actions
