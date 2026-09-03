---
type: project-evidence
title: Company Deployment And Azure Operations Evidence
description: Service deployment environment, basic Azure operations, and internal technical evidence boundaries.
timestamp: 2026-08-23
source_roots: [workspace]
tags: [azure, terraform, infrastructure, operations, evidence]
---

# Company Deployment And Azure Operations Evidence

Source locators: `workspace:MEDISOLVEAI-INFRA`, `workspace:MEDISOLVEAI-B2C-INFRA`, `workspace:NEXUS-infra`, `workspace:thedaylabs-infra`

## Company Azure Ownership

- User-confirmed correction (2026-08-23): 여러 사내 서비스가 동작하도록 Azure·Vercel 배포 환경을 구성하고 기본 운영을 맡았지만, 회사 infrastructure architecture를 깊이 이해해 처음부터 설계한 전문 영역으로 포지셔닝하지 않는다.
- Code-backed: B2B/B2C/NEXUS Terraform roots, remote state, App Service/ACR deployment, environment/resource separation, runbook 변경이 repo와 Git history에서 확인됐다.
- Tool-backed: 2026-07-11 Azure CLI read-only snapshot에서 product/environment resource group, App Service, VM, PostgreSQL, Cognitive Services, monitoring alert가 실제 운영 중임을 확인했다.
- Contribution boundary: 서비스 배포 환경 구성과 기본 운영은 `owned`로 표현할 수 있다. 현재 topology·state·monitoring 수치는 내부 검증 근거이며, 회사 전체 infrastructure architecture의 단독 설계·전문성이나 개별 resource의 최초 생성 주체로 확대하지 않는다.
- Selection boundary: 공통 이력서·포트폴리오의 대표 성과로 사용하지 않는다. 기술 스택 또는 경력의 보조 경험으로만 짧게 표현한다.

## Current Operating Snapshot

아래 수치는 내부 검증용이며 시점에 따라 변한다. 기본 공개 문구에는 사용하지 않는다.

- 22 resource groups, 327 resources.
- 13 App Services: all running, Terraform-tagged, HTTPS-only, TLS 1.2+, FTPS disabled.
- 231 resources tagged as Terraform-managed.
- 8 PostgreSQL Flexible Servers ready and 8 metric alerts enabled.
- Thready production App Service: trailing 30-day platform metric showed about 41k requests and about 0.32% HTTP 5xx.
- SAY Application Insights HTTP sample was queryable, but it does not prove full realtime/WebSocket workload coverage.

## Workload-Aligned Runtime Topology

- Code-/document-backed (2026-08-20): 회사 Azure의 현재 운영 구조는 공통 산출물과 제품 runtime을 분리한다. `Shared` root는 Terraform state storage와 admin credential을 비활성화한 공통 Azure Container Registry를 소유하고, B2B·B2C root는 remote state output으로 이 registry만 참조한다 (`workspace:MEDISOLVEAI-INFRA/azure/shared/main.tf`, `workspace:MEDISOLVEAI-INFRA/azure/b2b/dev-stg/data.tf`, `workspace:MEDISOLVEAI-INFRA/azure/b2c/stg/data.tf`).
- Code-backed: B2B/Centurion은 STG와 Prod를 별도 VNet·state로 운영한다. VNet-integrated Azure App Service API Gateway 뒤에 Docker service workload를 두고, managed MySQL·PostgreSQL·Storage와 관리 접근·outbound 경계를 환경 안에서 구성한다 (`workspace:MEDISOLVEAI-INFRA/azure/b2b/dev-stg/shared.tf`, `workspace:MEDISOLVEAI-INFRA/azure/b2b/prod/main.tf`).
- Code-backed: B2C에서 Thready API·AI runtime은 managed App Service로 분리하고, 다른 B2C workload는 App Service 또는 VM runtime으로 운영하며 managed PostgreSQL·media storage를 연결한다 (`workspace:MEDISOLVEAI-INFRA/azure/b2c/stg`, `workspace:MEDISOLVEAI-INFRA/azure/b2c/prod`). 공개 문안에서는 Thready 외 내부 제품명과 정확한 network·resource 설정을 노출하지 않는다.
- Code-backed: App Service diagnostics와 VM container log·metric은 제품군·환경별 Azure Monitor·Log Analytics workspace에서 같은 방식으로 수집·운영한다. 회사 전체가 하나의 workspace를 공유한다는 뜻은 아니다. 10대 VM log와 8개 Production alert의 정확한 공개 범위는 [Production Observability](#production-observability)가 소유한다.
- Design boundary: 현재 구조는 workload와 운영 인력에 맞춘 App Service+VM hybrid topology다. Hub-Spoke, Azure Container Apps, Tailscale, Key Vault consolidation, GitHub OIDC, VM-zero는 제안/검토 중인 target이며 현재 구조로 표현하지 않는다.
- Contribution boundary: 김대정의 Git 이력은 기존 Shared·B2B·B2C resource의 monorepo/root/state 통합, B2C 편입·reconciliation과 운영 참여를 증명한다. 현재 topology 전체의 설계 ownership이나 infrastructure 전문성으로 확대하지 않는다. 별도 project IaC는 core 6-root monorepo와 분리해 관리한다.

## Terraform State And Drift Safety

- Code-/document-backed (2026-08-18): 회사 Azure Terraform을 하나의 monorepo에서 관리하되 Shared·B2B STG·B2B Prod·B2C Shared·B2C STG·B2C Prod **6개 root와 remote state**로 분리해 apply와 blast radius 경계를 고정했다 (`workspace:MEDISOLVEAI-INFRA/azure/ROOTS.md`).
- Tool-backed (2026-08-18 read-only `terraform state list`): 6개 root의 state address는 합계 **426개**다. 공개 문구에서는 snapshot 변동성과 resource/state 차이를 고려해 `400+ state object`로 범위화한다. 같은 snapshot에서 VM 21대·App Service 9개가 확인됐지만 기본 이력서에는 별도 노출하지 않는다.
- Process-backed: state snapshot·`terraform plan`·Azure CLI live inventory를 교차 검증하고, 의도하지 않은 destroy/replace가 있으면 apply를 중단하는 gate를 운영한다.
- Operation-backed: NEXUS root에서 collation/charset drift로 PostgreSQL replacement가 포함된 plan을 apply하지 않았고, B2C live reconciliation에서는 STG/Prod 각각 `2 import, 0 add, 2 change, 0 destroy` 조건으로 기존 plan 편입을 준비했다. live App Service logging 설정을 코드에 보존해 부수적인 logging 제거도 plan 단계에서 제외했다.
- Contribution boundary: monorepo/state 경계와 drift audit·apply gate의 구축·운영은 `owned`. 모든 Azure resource의 최초 생성, drift 0건, 전 변경 자동 apply로 확대하지 않는다.

## AI-Assisted Infrastructure Harness

- User-confirmed (2026-08-19): 회사 전체 서비스의 Azure infrastructure를 전담하면서 resource inventory 파악과 Terraform 구현에 AI를 적극 활용했다.
- Process-backed: 사람이 직접 작성했는지 AI가 보조했는지와 무관하게 모든 변경은 대상 제품·환경 식별, state snapshot, fmt/validate, Terraform plan, Azure CLI live inventory 대조, destructive change 판정, apply 후 health·log·alert 확인 순서를 통과한다.
- User-confirmed design rationale: 현재 workload와 기술 복잡도에 맞춰 Azure managed application runtime을 우선 활용하고, 불필요한 platform 운영 복잡도를 먼저 만들지 않는 방향을 선택했다.
- Contribution boundary: AI-assisted inventory·Terraform 초안과 change checklist에는 참여했지만, 이를 company infrastructure architecture의 단독 설계나 전문 영역으로 공개하지 않는다. AI가 독립적으로 architecture나 apply 결정을 수행했다는 뜻도 아니다.
- Public wording: 공통 이력서·포트폴리오에는 사용하지 않는다. 필요할 때만 `서비스 배포 환경 구성과 기본 운영 경험`의 내부 근거로 소비한다.

## Production Observability

- Code-/state-backed (2026-08-18): Azure Monitor·Log Analytics와 AMA/DCR association으로 **10대 VM**의 container log 수집 경계를 중앙화했다.
- Code-/state-backed: Production에 CPU·memory·disk와 API health·5xx, DB availability·storage·failed connection을 포함한 **8개 metric alert**와 email action group을 Terraform으로 관리한다.
- Measurement boundary: 수집·alert 구성을 증명하지만 MTTR·가용성·장애 감소의 전후 수치는 없다.
- Contribution boundary: 기존 구성을 포함한 현재 관측·alert infrastructure의 구성 관리와 운영 범위는 `owned`. 10대 VM log·8개 alert 전체를 최초부터 단독 구축했다고 확대하지 않는다.

## Company Kubernetes Cluster (Design Review)

- Repo-backed (2026-09-03, `github:MediSolveAIDev/k8s_infra_mac`, private): 회사는 Mac Studio(M2 Ultra, arm64) 1대 위에 Lima + kubeadm으로 3노드 vanilla Kubernetes 클러스터(control-plane 1 · worker 2)를 세우고, Calico·MetalLB·ingress-nginx·local-path-provisioner, Helm + ArgoCD GitOps, Cloudflare Tunnel 외부 노출, ARC self-hosted runner로 mediness 앱을 dev/prod namespace로 운영한다. PRD는 단일 클러스터 namespace 분리, in-cluster postgres(VM 재생성에도 생존하는 데이터 디스크), HA 비목표, arm64 전용을 확정 설계로 적는다.
- Git boundary: PRD·구축·운영 commit은 모두 다른 계정(설계 문서 author 1명, Mac Studio 로컬 계정, CI 봇)이며 김대정 author commit은 없다. mediness의 k8s 관련 문서에도 김대정 author 기록이 없다.
- User-confirmed (2026-09-03): 설계는 구두 미팅으로 함께 검토했다. 문서·commit 근거가 없으므로 `contributed / confidence: low`로만 등록하고, 공개 문안은 `회사 k8s 클러스터(kubeadm·GitOps) 설계 검토에 참여`를 넘지 않는다. `Kubernetes`를 기술 stack에 hands-on처럼 올리지 않는다.
- Lab-backed (2026-09-03, `workspace:k8s-lab-mac`, 전 commit 본인 author, 회사 코드 미복사): 같은 설계를 개인 Mac(arm64·12코어·24GB)에서 직접 재구축했다. Lima(vz) + kubeadm v1.33 3노드(control-plane 1·worker 2), Calico, MetalLB L2, ingress-nginx(LoadBalancer IP 할당), local-path-provisioner(worker별 Lima 데이터 디스크), Helm 샘플 앱으로 ingress → service → pod → PVC 전 경로 검증, ArgoCD 설치. `docs/design-decisions.md`에 회사 설계 결정을 본인 말로 옮기고 개인 Mac에서 바꾼 결정을 적었다.
- Lab-backed 판단 기록(`docs/lab-log.md`): ① Lima `vzNAT`는 호스트↔VM만 통하고 VM 간 통신이 안 돼 worker join 실패 → 다중 노드는 VM 간 L2/L3가 전제임을 확인. ② `shared`(socket_vmnet)는 root 소유 바이너리·sudoers가 필요해 세션에서 sudo를 쓰지 않기로 하고 `user-v2`(root 불필요, VM 간 통신 가능)를 선택, 호스트 접근은 Lima 포워딩(127.0.0.1:6443)과 apiserver certSANs로 해결. 트레이드오프: 호스트에서 MetalLB LB IP 직접 접근 불가(VM 내부에서 검증). ③ 호스트 스크립트가 VM 마운트 경로를 참조한 실수를 실행 위치 기준 경로로 수정.
- Boundary: 회사 설계 대비 Cloudflare Tunnel과 kube-prometheus-stack은 생략했고, GitOps 동기화는 repo push 뒤 확인 예정이다. 회사 클러스터 구축·운영 경험으로 확대하지 않는다.

## Measurement Boundary

- 현재 snapshot은 운영 범위와 현재 상태를 증명한다.
- 안정성·비용·배포 속도 "개선" claim에는 변경 전후 기간과 변경 commit/PR 연결이 추가로 필요하다.
- Azure Activity Log는 사용자·CI·Terraform activity가 섞이고 retention/window 제한이 있어 개인 성과의 단독 근거로 사용하지 않는다.

## Public Disclosure

- 기본 공개: 여러 사내 서비스의 Azure·Vercel 배포 환경 구성과 기본 운영 경험, Docker·GitHub Actions·Azure·Terraform 사용 경험.
- 기본 비선택: 회사 topology, 6개 root·400+ state object, 10대 VM log·8개 alert, AI-assisted Terraform harness. 사실 근거는 보존하지만 지원 직군과 사용자의 별도 확인 없이는 대표 성과로 쓰지 않는다.
- Source-backed (2026-07-17): 회사가 한국마이크로소프트 협약과 Azure 기반 인프라를 공개 보도함 (매일신문 2026-04-22) — 이력서에서 Azure 기반 언급은 회사 기밀이 아님이 확인됨.
- 비공개: subscription/resource/customer 이름, 정확한 resource 수, traffic, cost, security configuration.
