import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const AZURE_ICONS = {
  alerts: "/azure/alerts.svg",
  appService: "/azure/app-service.svg",
  browser: "/azure/browser.svg",
  containerRegistry: "/azure/container-registry.svg",
  logAnalytics: "/azure/log-analytics.svg",
  monitor: "/azure/monitor.svg",
  mysql: "/azure/mysql.svg",
  postgresql: "/azure/postgresql.svg",
  storage: "/azure/storage-account.svg",
  virtualMachine: "/azure/virtual-machine.svg",
  virtualNetwork: "/azure/virtual-network.svg",
} as const;

type AzureIconName = keyof typeof AZURE_ICONS;

const STATE_BOUNDARIES = [
  ["Shared", "Shared ACR · root"],
  ["B2B STG", "runtime · data"],
  ["B2B Prod", "runtime · data"],
  ["B2C Shared", "state storage"],
  ["B2C STG", "product runtime"],
  ["B2C Prod", "product runtime"],
] as const;

function AzureIcon({ name, compact = false }: { name: AzureIconName; compact?: boolean }) {
  return (
    <Image
      aria-hidden
      alt=""
      className={cn("shrink-0", compact ? "size-6" : "size-8")}
      height={32}
      src={AZURE_ICONS[name]}
      unoptimized
      width={32}
    />
  );
}

function ServiceNode({
  icons,
  title,
  detail,
  className,
}: {
  icons: AzureIconName | readonly AzureIconName[];
  title: string;
  detail?: ReactNode;
  className?: string;
}) {
  const iconNames: readonly AzureIconName[] = typeof icons === "string" ? [icons] : icons;

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-3 border border-[#b7d7f0] bg-white p-3",
        className,
      )}
    >
      <span className="flex shrink-0 items-center gap-1">
        {iconNames.map((icon) => (
          <AzureIcon key={icon} name={icon} />
        ))}
      </span>
      <span className="min-w-0">
        <strong className="block text-xs leading-[1.35] text-[#183b56]">{title}</strong>
        {detail ? (
          <span className="mt-1 block text-xs leading-[1.4] text-[#526778]">{detail}</span>
        ) : null}
      </span>
    </div>
  );
}

function DownConnector({ label, dashed = false }: { label: string; dashed?: boolean }) {
  return (
    <div className="flex h-9 items-center gap-2 pl-4" aria-hidden>
      <span
        className={cn(
          "h-full border-l-2 border-[#0078d4]",
          dashed ? "border-dashed" : "border-solid",
        )}
      />
      <span className="font-mono text-xs text-[#47677f] max-sm:hidden">{label}</span>
      <span className="text-sm leading-none text-[#0078d4]">↓</span>
    </div>
  );
}

function BoundaryHeader({
  eyebrow,
  title,
  environments,
}: {
  eyebrow: string;
  title: string;
  environments: string;
}) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-[#cfe5f6] bg-[#edf7ff] px-4 py-3">
      <span className="min-w-0">
        <span className="block font-mono text-xs font-semibold tracking-[0.04em] text-[#0067b8]">
          {eyebrow}
        </span>
        <strong className="mt-1 block text-sm text-[#183b56]">{title}</strong>
      </span>
      <span className="shrink-0 border border-[#8fc4eb] bg-white px-2 py-1 font-mono text-xs text-[#47677f]">
        {environments}
      </span>
    </header>
  );
}

function TrafficEntry({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      <span className="flex items-center gap-2 border border-[#9cc9eb] bg-white px-2 py-1 text-xs text-[#47677f]">
        <AzureIcon name="browser" />
        Browser · HTTPS
      </span>
      <span className="h-px min-w-5 flex-1 bg-[#0078d4]" />
      <span className="text-base leading-none text-[#0078d4]">→</span>
      <span className="font-mono text-xs text-[#47677f]">{label}</span>
    </div>
  );
}

function ProductBoundaries() {
  return (
    <div className="portfolio-keep border-b border-[#b7d7f0] px-5 pb-5 print:px-3 print:pb-3">
      <div className="relative hidden h-9 grid-cols-2 gap-5 lg:grid print:grid">
        <span className="absolute left-1/2 top-0 h-4 border-l-2 border-dashed border-[#5b9bd5]" />
        <span className="absolute left-1/4 right-1/4 top-4 border-t-2 border-dashed border-[#5b9bd5]" />
        <span className="mx-auto mt-4 h-5 border-l-2 border-dashed border-[#5b9bd5]" />
        <span className="mx-auto mt-4 h-5 border-l-2 border-dashed border-[#5b9bd5]" />
      </div>

      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1 print:grid-cols-2 print:gap-3">
        <section className="min-w-0 border-2 border-[#5b9bd5] bg-white">
          <BoundaryHeader
            eyebrow="B2B · CENTURION"
            environments="STG · PROD"
            title="Gateway와 서비스·데이터 경계"
          />
          <div className="p-4 print:p-3">
            <TrafficEntry label="user traffic" />
            <ServiceNode
              className="mt-3"
              detail="Azure App Service · managed ingress"
              icons="appService"
              title="B2B API Gateway workload"
            />
            <DownConnector label="VNet integration · service route" />
            <div className="border border-[#8fc4eb] bg-[#f7fbff] p-3">
              <div className="flex items-center justify-between gap-3">
                <span>
                  <span className="font-mono text-xs font-semibold text-[#0067b8]">
                    ENVIRONMENT BOUNDARY
                  </span>
                  <strong className="mt-1 block text-xs text-[#183b56]">runtime · data</strong>
                </span>
                <span className="font-mono text-xs text-[#5a7184]">separate state</span>
              </div>
              <div className="mt-3 grid grid-cols-[minmax(0,1.55fr)_minmax(0,0.8fr)] gap-3 max-sm:grid-cols-1 print:grid-cols-[minmax(0,1.55fr)_minmax(0,0.8fr)]">
                <div className="border border-dashed border-[#5b9bd5] bg-white p-3">
                  <div className="flex items-center gap-2 border-b border-[#d9ebf8] pb-2">
                    <AzureIcon name="virtualNetwork" />
                    <span>
                      <strong className="block text-xs text-[#183b56]">Azure Virtual Network</strong>
                      <span className="text-xs text-[#526778]">VM · managed DB subnets</span>
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2">
                    <ServiceNode
                      detail="Docker services"
                      icons="virtualMachine"
                      title="Azure Virtual Machines"
                    />
                    <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 print:grid-cols-2">
                      <ServiceNode icons="mysql" title="Azure Database for MySQL" />
                      <ServiceNode icons="postgresql" title="Azure Database for PostgreSQL" />
                    </div>
                  </div>
                </div>
                <ServiceNode
                  className="self-stretch max-sm:min-h-20"
                  detail="environment data"
                  icons="storage"
                  title="Azure Storage account"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="min-w-0 border-2 border-[#5b9bd5] bg-white">
          <BoundaryHeader
            eyebrow="B2C · PRODUCT APPS"
            environments="STG · PROD"
            title="제품별 managed runtime과 VM"
          />
          <div className="p-4 print:p-3">
            <TrafficEntry label="product traffic" />
            <div className="mt-3 border border-[#8fc4eb] bg-[#f7fbff] p-3">
              <div className="flex items-center justify-between gap-3">
                <span>
                  <span className="font-mono text-xs font-semibold text-[#0067b8]">
                    ENVIRONMENT BOUNDARY
                  </span>
                  <strong className="mt-1 block text-xs text-[#183b56]">product runtime · data</strong>
                </span>
                <span className="font-mono text-xs text-[#5a7184]">separate state</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 max-sm:grid-cols-1 print:grid-cols-2">
                <ServiceNode
                  detail="Azure App Service · product API"
                  icons="appService"
                  title="Thready API"
                />
                <ServiceNode
                  detail="Azure App Service · AI execution"
                  icons="appService"
                  title="Thready AI"
                />
              </div>
              <DownConnector label="application data" />
              <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 print:grid-cols-2">
                <ServiceNode icons="postgresql" title="Azure Database for PostgreSQL" />
                <ServiceNode icons="storage" title="Azure Storage account" />
              </div>
              <ServiceNode
                className="mt-2"
                detail="other B2C Azure App Service · VM boundaries"
                icons={["appService", "virtualMachine"]}
                title="Other App Service · VM workloads"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function OperationsPlane() {
  return (
    <div className="portfolio-keep border-b border-[#b7d7f0] bg-white p-5 print:p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span>
          <span className="block font-mono text-xs font-semibold tracking-[0.04em] text-[#0067b8]">
            OBSERVABILITY PLANE
          </span>
          <strong className="mt-1 block text-sm text-[#183b56]">환경은 나눠도 관측 방식은 같게</strong>
        </span>
        <span className="font-mono text-xs text-[#526778]">logs · diagnostics · platform metrics</span>
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,0.65fr)_auto_minmax(0,2fr)] items-center gap-3 max-lg:grid-cols-1 print:grid-cols-[minmax(0,0.65fr)_auto_minmax(0,2fr)] print:gap-2">
        <div className="border border-dashed border-[#8fc4eb] bg-[#f7fbff] p-3 text-xs leading-[1.45] text-[#526778]">
          <strong className="block text-[#183b56]">Telemetry sources</strong>
          VM container logs · App diagnostics · platform metrics
        </div>
        <span aria-hidden className="text-center font-mono text-[#0078d4] max-lg:rotate-90 print:rotate-0">┄→</span>
        <div className="border-2 border-[#5b9bd5] bg-[#f7fbff] p-3">
          <div className="flex items-center gap-3 border-b border-[#cfe5f6] pb-3">
            <AzureIcon name="monitor" />
            <span>
              <strong className="block text-xs text-[#183b56]">Azure Monitor</strong>
              <span className="mt-1 block text-xs text-[#526778]">environment-scoped operations boundary</span>
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 max-sm:grid-cols-1 print:grid-cols-2">
            <ServiceNode
              detail="environment-scoped workspaces · 10 VM container-log sources"
              icons="logAnalytics"
              title="Log Analytics workspace"
            />
            <ServiceNode
              detail="8 Production metric alerts"
              icons="alerts"
              title="Azure Monitor metric alerts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TerraformControlPlane() {
  return (
    <div className="portfolio-keep border border-[#b9c3cb] bg-[#f4f6f8] p-5 print:p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span>
          <span className="block font-mono text-xs font-semibold tracking-[0.04em] text-[#44515c]">
            TERRAFORM CONTROL PLANE
          </span>
          <strong className="mt-1 block text-sm text-[#1f2933]">제품군·환경별 변경 범위를 고정</strong>
        </span>
        <strong className="text-sm text-[#1f2933]">6 roots · 400+ state objects</strong>
      </div>
      <div className="mt-4 grid grid-cols-6 border border-[#c7d1d9] bg-white max-lg:grid-cols-3 max-sm:grid-cols-2 print:grid-cols-6">
        {STATE_BOUNDARIES.map(([name, scope], index) => (
          <div
            className={cn(
              "min-w-0 p-3",
              index > 0 && "border-l border-[#dce3e8]",
              index === 3 && "max-lg:border-l-0 max-lg:border-t print:border-l print:border-t-0",
              index > 1 && "max-sm:border-t",
              (index === 2 || index === 4) && "max-sm:border-l-0",
            )}
            key={name}
          >
            <strong className="block text-xs text-[#1f2933]">{name}</strong>
            <span className="mt-1 block text-xs leading-[1.4] text-[#5f6b75]">{scope}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs leading-[1.45] text-[#52606d]">
        <p className="m-0">state · plan · live inventory를 대조한 변경만 각 root에 적용</p>
        <p className="m-0 font-mono">separate project IaC is outside this map</p>
      </div>
    </div>
  );
}

function PrintServiceNode({
  icons,
  title,
}: {
  icons: AzureIconName | readonly AzureIconName[];
  title: string;
}) {
  const iconNames: readonly AzureIconName[] = typeof icons === "string" ? [icons] : icons;

  return (
    <div className="flex min-w-0 items-center gap-2 border border-[#b7d7f0] bg-white p-2">
      <span className="flex shrink-0 items-center gap-1">
        {iconNames.map((icon) => (
          <AzureIcon compact key={icon} name={icon} />
        ))}
      </span>
      <strong className="min-w-0 text-xs leading-[1.3] text-[#183b56]">{title}</strong>
    </div>
  );
}

function PrintMiniNode({
  icons,
  title,
}: {
  icons: AzureIconName | readonly AzureIconName[];
  title: string;
}) {
  const iconNames: readonly AzureIconName[] = typeof icons === "string" ? [icons] : icons;

  return (
    <div className="flex min-w-0 flex-col items-center justify-center gap-1 border border-[#b7d7f0] bg-white p-1 text-center">
      <span className="flex items-center gap-1">
        {iconNames.map((icon) => (
          <AzureIcon compact key={icon} name={icon} />
        ))}
      </span>
      <strong className="text-xs leading-[1.2] text-[#183b56]">{title}</strong>
    </div>
  );
}

function PrintAzureArchitecture() {
  return (
    <div
      className="portfolio-keep hidden border-2 border-[#5b9bd5] bg-[#f7fbff] [print-color-adjust:exact] [-webkit-print-color-adjust:exact] print:block"
      data-azure-print-architecture
    >
      <header className="flex items-center justify-between gap-4 border-b border-[#b7d7f0] bg-[#0078d4] px-3 py-2 text-white">
        <span>
          <span className="block font-mono text-xs tracking-[0.05em] text-white/75">MICROSOFT AZURE</span>
          <strong className="block text-xs">Core operating topology</strong>
        </span>
        <span className="font-mono text-xs">CURRENT · REPRESENTATIVE</span>
      </header>

      <div className="grid grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)_minmax(0,0.65fr)] items-center gap-3 border-b border-[#b7d7f0] bg-white px-3 py-2">
        <span className="font-mono text-xs font-semibold text-[#0067b8]">SHARED IMAGE SOURCE</span>
        <PrintServiceNode icons="containerRegistry" title="Azure Container Registry" />
        <span className="text-right font-mono text-xs text-[#526778]">image pull → B2B · B2C</span>
      </div>

      <div className="grid grid-cols-2 gap-3 border-b border-[#b7d7f0] p-3">
        <section className="border-2 border-[#5b9bd5] bg-white">
          <header className="flex items-center justify-between gap-2 border-b border-[#cfe5f6] bg-[#edf7ff] px-3 py-2">
            <strong className="text-xs text-[#183b56]">B2B · Centurion</strong>
            <span className="font-mono text-xs text-[#526778]">STG · PROD</span>
          </header>
          <div className="p-2">
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <span className="font-mono text-xs text-[#526778]">HTTPS →</span>
              <PrintServiceNode icons="appService" title="App Service · API Gateway" />
            </div>
            <div className="mt-2 grid grid-cols-[minmax(0,1.55fr)_minmax(0,0.65fr)] gap-2 border border-[#8fc4eb] bg-[#f7fbff] p-2">
              <div className="border border-dashed border-[#5b9bd5] bg-white p-2">
                <div className="flex items-center gap-2 border-b border-[#d9ebf8] pb-1">
                  <AzureIcon compact name="virtualNetwork" />
                  <strong className="text-xs text-[#183b56]">Azure Virtual Network</strong>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1">
                  <PrintMiniNode icons="virtualMachine" title="Virtual Machines" />
                  <PrintMiniNode icons="mysql" title="MySQL" />
                  <PrintMiniNode icons="postgresql" title="Postgres" />
                </div>
              </div>
              <PrintMiniNode icons="storage" title="Azure Storage" />
            </div>
          </div>
        </section>

        <section className="border-2 border-[#5b9bd5] bg-white">
          <header className="flex items-center justify-between gap-2 border-b border-[#cfe5f6] bg-[#edf7ff] px-3 py-2">
            <strong className="text-xs text-[#183b56]">B2C · Product apps</strong>
            <span className="font-mono text-xs text-[#526778]">STG · PROD</span>
          </header>
          <div className="p-2">
            <div className="grid grid-cols-2 gap-1">
              <PrintServiceNode icons="appService" title="App Service · Thready API" />
              <PrintServiceNode icons="appService" title="App Service · Thready AI" />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 border border-[#8fc4eb] bg-[#f7fbff] p-2">
              <PrintMiniNode icons="postgresql" title="PostgreSQL" />
              <PrintMiniNode icons="storage" title="Azure Storage" />
              <PrintMiniNode icons={["appService", "virtualMachine"]} title="Other app · VM" />
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] gap-3 border-b border-[#b7d7f0] bg-white p-3">
        <span className="border border-dashed border-[#8fc4eb] bg-[#f7fbff] p-2 text-xs leading-[1.35] text-[#526778]">
          <strong className="block text-[#183b56]">Telemetry</strong>
          logs · diagnostics · metrics →
        </span>
        <div className="border-2 border-[#5b9bd5] bg-[#f7fbff] p-2">
          <div className="flex items-center gap-2">
            <AzureIcon compact name="monitor" />
            <strong className="text-xs text-[#183b56]">Azure Monitor</strong>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <PrintServiceNode icons="logAnalytics" title="Log Analytics · 10 VM log sources" />
            <PrintServiceNode icons="alerts" title="Metric alerts · 8 Production" />
          </div>
        </div>
      </div>

      <div className="bg-[#f4f6f8] p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs font-semibold text-[#44515c]">TERRAFORM CONTROL PLANE · PLAN / APPLY</span>
          <strong className="text-xs text-[#1f2933]">6 roots · 400+ state objects</strong>
        </div>
        <div className="mt-2 grid grid-cols-6 border border-[#c7d1d9] bg-white">
          {STATE_BOUNDARIES.map(([name, scope], index) => (
            <div className={cn("min-w-0 p-2", index > 0 && "border-l border-[#dce3e8]")} key={name}>
              <strong className="block text-xs text-[#1f2933]">{name}</strong>
              <span className="block text-xs leading-[1.3] text-[#5f6b75]">{scope}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AzureArchitectureDiagram() {
  return (
    <figure className="m-0 mt-6 print:mt-1">
      <div className="print:hidden">
        <div
          className="border-2 border-[#5b9bd5] bg-[#f7fbff] [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
          data-azure-architecture
        >
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#b7d7f0] bg-[#0078d4] px-5 py-3 text-white">
            <span>
              <span className="block font-mono text-xs tracking-[0.06em] text-white/75">MICROSOFT AZURE</span>
              <strong className="mt-1 block text-sm">Core operating topology</strong>
            </span>
            <span className="border border-white/50 px-2 py-1 font-mono text-xs">CURRENT · REPRESENTATIVE SCOPE</span>
          </header>

          <div className="portfolio-keep border-b border-[#b7d7f0] bg-white px-5 py-4">
            <div className="grid grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)_minmax(0,0.82fr)] items-center gap-4 max-md:grid-cols-1">
              <div className="text-xs leading-[1.5] text-[#526778]">
                <span className="block font-mono font-semibold text-[#0067b8]">SHARED PLATFORM</span>
                공통 image source만 공유
              </div>
              <ServiceNode
                className="border-2 border-[#5b9bd5]"
                detail="Shared image source · B2B/B2C"
                icons="containerRegistry"
                title="Azure Container Registry"
              />
              <div className="text-right text-xs leading-[1.5] text-[#526778] max-md:text-left">
                <span className="block font-mono font-semibold text-[#0067b8]">IMAGE PULL</span>
                runtime과 state는 각 경계가 소유
              </div>
            </div>
          </div>

          <ProductBoundaries />
          <OperationsPlane />
        </div>

        <div className="portfolio-keep mt-3 flex items-center justify-center gap-2 font-mono text-xs text-[#44515c]" aria-hidden>
          <span>↑</span>
          <span className="border-t border-dotted border-[#44515c] px-5 pt-1">plan · apply</span>
        </div>
        <TerraformControlPlane />

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted" aria-hidden>
          <span><span className="text-[#0078d4]">──→</span> request · data</span>
          <span><span className="text-[#0078d4]">┄┄→</span> image · telemetry</span>
          <span><span className="text-[#44515c]">···→</span> Terraform plan · apply</span>
        </div>
      </div>
      <PrintAzureArchitecture />
      <figcaption className="sr-only">
        회사 공통·B2B·B2C의 현재 대표 Azure 운영 구조입니다. Shared Container Registry가
        B2B와 B2C에 이미지를 공급합니다. B2B는 App Service API Gateway와 환경별 Virtual
        Network의 VM workload, managed MySQL·PostgreSQL, Storage로 구성됩니다. B2C는
        Thready API·AI App Service와 다른 App Service·VM workload를 managed PostgreSQL과
        Storage에 연결합니다. 운영 신호는 환경별 Azure Monitor와 Log Analytics에서 같은
        방식으로 보고, Terraform core monorepo는 여섯 개 root와 state로 변경 범위를
        분리합니다.
      </figcaption>
    </figure>
  );
}
