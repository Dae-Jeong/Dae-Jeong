import type { ReactNode } from "react";

export type SystemCaseDetail = {
  eyebrow: string;
  summary: ReactNode;
  kv: { k: string; v: string }[];
  invariant: ReactNode;
  problem: ReactNode[];
  failures: { trigger: string; risk: string; boundary: string }[];
  decisions: { k: string; t: ReactNode }[];
  flow: { label: string; title: string; desc: string }[];
  evidence: { label: string; value: string; note: string; claimIds: string[] }[];
};

export const SYSTEM_DETAILS: Record<string, SystemCaseDetail> = {
  thready: {
    eyebrow: "AI Content Product · Zero-to-One / Operation",
    summary: (
      <>
        고객이 돈을 내는 이유를 기획·QA·마케팅과 함께 구체화하고,
        기능·실험 우선순위부터 구현·출시·운영까지 연결했습니다.
        <strong> 아이디어를 실제 고객이 구독하는 제품으로 만들고</strong>
        운영하는 데 필요한 frontend·backend·data·AI를 직접 구축했습니다.
      </>
    ),
    kv: [
      { k: "Role", v: "제품 운영 리드 · 핵심 제품 시스템 직접 구현" },
      { k: "Responsibility", v: "문제 정의·우선순위·출시·운영 · Backend/AI/핵심 FE" },
      { k: "Stack", v: "Next.js · FastAPI · PostgreSQL · LLM" },
      { k: "Status", v: "Production" },
    ],
    invariant: (
      <>제품 판단은 사용자의 문제와 실측 데이터에서 시작하고, AI가 만든 변경은 test·QA·release evidence를 통과해야 운영에 들어갑니다.</>
    ),
    problem: [
      <>콘텐츠를 꾸준히 만들고도 무엇이 잘된 글인지 판단하기 어려운 고객 문제를 <strong>market data와 생성·평가 기능</strong>으로 구체화해야 했습니다.</>,
      <>빠른 검증에 맞춘 초기 backend는 기능이 늘수록 domain 의존성과 회귀 위험이 커졌습니다. 서비스를 멈추지 않은 채 backend를 교체하고, AI 실행부와 제품 원장의 책임도 분리해야 했습니다.</>,
    ],
    failures: [
      { trigger: "backend 재구축", risk: "새 구조가 오히려 QA 회귀를 늘림", boundary: "validation harness 선행 · backend 범위만 parallel rebuild · cutover gate" },
      { trigger: "AI service 분리", risk: "두 DB 사이 전달 유실·중복·역순 도착", boundary: "Transactional Outbox · retry · version/attempt fence · terminal failure 보존" },
      { trigger: "콘텐츠 기준 적용", risk: "관측되지 않은 감각을 제품 규칙으로 고정", boundary: "market snapshot · labeling workflow · 실험 rubric을 서로 다른 근거로 분리" },
    ],
    decisions: [
      { k: "Problem to Product", t: <>고객의 콘텐츠 제작·성과 판단 문제를 market data outcome과 생성·평가 workflow로 번역하고, 기능·실험 우선순위를 정한 뒤 frontend·backend·AI로 구현했습니다.</> },
      { k: "Harness First", t: <>AI 코딩을 적극 활용하되 architecture와 검증 harness를 먼저 세우고, 사람이 scope·cutover·release를 소유했습니다.</> },
      { k: "Separate Ownership", t: <>제품 정책·원장은 product backend가, 생성 lifecycle·실행 상태는 AI application이 소유하도록 application·DB를 분리했습니다.</> },
    ],
    flow: [
      { label: "01", title: "고객 문제·시장 관측", desc: "콘텐츠 제작과 성과 판단의 불편을 outcome 후보와 제품 요구로 구조화" },
      { label: "02", title: "제품·구현 contract", desc: "Next.js workflow, FastAPI domain, typed prompt, labeling·evaluation 경계 고정" },
      { label: "03", title: "AI execution boundary", desc: "제품 원장과 생성 lifecycle을 분리하고 Outbox로 변경 전달" },
      { label: "04", title: "QA·release·operation", desc: "migration rehearsal, API E2E, release gate를 거쳐 실제 사용자 운영" },
    ],
    evidence: [
      { label: "Product outcome", value: "실제 고객 결제", note: "유료 제품 운영 · 제품·팀 outcome", claimIds: ["thready.subscription-revenue-band"] },
      { label: "Next revenue model", value: "광고 적용 시작", note: "운영 데이터 수집 중 · 성과 미집계", claimIds: ["thready.ad-revenue-experiment"] },
      { label: "Data basis", value: "최근 1년 중심", note: "공개 게시글 / 반응 추이", claimIds: ["thready.threads-market-outcome-design"] },
      { label: "Migration", value: "2,616 / 795 / 7,111", note: "생성 이력 / 품질 snapshot / 실행 추적 · STG", claimIds: ["thready.ai-service-migration"] },
      { label: "Backend 전환", value: "API 계약 유지", note: "응답 비교·검증 후 FastAPI backend로 전환, 이후 개발·운영 전담", claimIds: ["thready.rebuild-decision-execution", "thready.backend-rebuild"] },
    ],
  },
  "centurion-platform": {
    eyebrow: "Medical Platform · Multi-service Backend",
    summary: (
      <>Gateway·SSO를 공유하는 의료 MSA에서 주문·재고는 실패한 후속 작업만 다시 실행하게 만들고, 실시간 상담은 <strong>발화 감지·중간 전사·확정 판단·세션 종료</strong>를 서로 다른 경계로 나눴습니다.</>
    ),
    kv: [
      { k: "Role", v: "주문·재고 주도 · 실시간 상담 공동 기여" },
      { k: "Scope", v: "Async · Realtime · Domain" },
      { k: "Stack", v: "FastAPI · RabbitMQ · WebSocket" },
      { k: "Context", v: "Express Gateway · NestJS SSO" },
    ],
    invariant: <>외부 연동이나 실시간 session의 실패가 핵심 병원 업무 transaction 전체를 중단시키지 않게 합니다.</>,
    problem: [
      <>병원 운영에는 즉시 응답해야 하는 업무, 실패 후 재처리가 필요한 작업, 연결 상태가 계속 변하는 실시간 session이 동시에 존재했습니다.</>,
      <>모든 workload를 같은 runtime과 transaction에 묶지 않으면서도 인증·지점·권한 context는 service 사이에서 일관되게 전달해야 했습니다.</>,
    ],
    failures: [
      { trigger: "외부 알림·재고 연동 실패", risk: "API 요청과 핵심 업무가 함께 실패", boundary: "RabbitMQ·TaskIQ worker · 상태·retry·terminal failure·수동 재처리" },
      { trigger: "WebSocket reconnect·중복 event", risk: "zombie session·잘못된 turn 연결", boundary: "cancellation·debounce·retry·turn-state guard·GC" },
      { trigger: "중간·확정·보정 전사 도착", risk: "늦은 결과가 다른 발화를 덮어씀", boundary: "DELTA·COMPLETE·optional CORRECTED를 같은 sequence로 연결" },
      { trigger: "시설→재고 publish 실패", risk: "시술 완료 transaction 중단", boundary: "핵심 업무 완료와 외부 event publish의 실행 경계 분리" },
    ],
    decisions: [
      { k: "Service Boundary", t: <>공통 Gateway·SSO와 product backend를 분리하고, 각 service가 자신의 업무 상태를 소유하게 했습니다.</> },
      { k: "Async Runtime", t: <>async FastAPI 실행 모델에 맞춰 Celery 처리를 TaskIQ·RabbitMQ로 전환했습니다.</> },
      { k: "Realtime Signals", t: <>realtime STT가 내보내는 VAD·DELTA·COMPLETE를 분기해, DELTA는 도메인 키워드 기반의 빠른 조언에, COMPLETE는 문맥 판단과 저장에 사용했습니다.</> },
      { k: "Realtime Lifecycle", t: <>session 생성·유지·종료와 provider adapter를 분리하고, 종료 뒤 남은 reconnect timer가 세션을 다시 살리지 않도록 stop guard와 GC 경계를 보강했습니다.</> },
    ],
    flow: [
      { label: "ENTRY", title: "API Gateway · SSO", desc: "공통 진입점과 인증 context 전달" },
      { label: "SYNC", title: "FastAPI product services", desc: "예약·주문·재고·병원 운영의 업무 상태 소유" },
      { label: "ASYNC", title: "RabbitMQ · TaskIQ", desc: "실패 가능한 외부 작업의 상태·retry·재처리" },
      { label: "LIVE", title: "WebSocket runtime", desc: "상담 session과 STT/LLM provider lifecycle" },
    ],
    evidence: [
      { label: "Order / Inventory", value: "구축 주도", note: "API·worker flow·retry boundary", claimIds: ["centurion.bay-async-backend"] },
      { label: "Realtime E2E", value: "586 / 25 / 14", note: "4분 37초 replay의 DELTA / COMPLETE / ADVICE · seq 1—25 무결성", claimIds: ["centurion.say-realtime-ai"] },
      { label: "Session regression", value: "13 scenarios", note: "reconnect race 8개 · GC TTL 5개", claimIds: ["centurion.say-realtime-ai"] },
      { label: "Provider benchmark", value: "383 domain terms", note: "WER·CER·용어 보존율·latency 비교 환경", claimIds: ["centurion.say-realtime-ai"] },
      { label: "VAD trade-off", value: "P50 3.0~3.2초", note: "무음 200·350·500ms 비교 · 모델 추론 약 80%", claimIds: ["centurion.say-realtime-ai"] },
      { label: "Facility / SSO", value: "주요 기능 기여", note: "재고 연동·multi-service session policy", claimIds: ["centurion.ray-backend", "centurion.sso-session"] },
    ],
  },
  "infrastructure-delivery": {
    eyebrow: "Company Infrastructure · Azure Runtime / Terraform",
    summary: (
      <>기존 Shared·B2B·B2C 리소스를 제품군·환경별 root/state로 통합했습니다. <strong>workload별 runtime·data 경계와 환경별 공통 관측 방식</strong>을 운영하고, 변경 범위는 Terraform state와 human gate로 통제합니다.</>
    ),
    kv: [
      { k: "Role", v: "Infrastructure Owner" },
      { k: "Scope", v: "B2B · B2C · Shared · STG · Prod" },
      { k: "Stack", v: "Azure · Terraform · Log Analytics" },
      { k: "Operation", v: "Design · Build · Run" },
    ],
    invariant: <>AI가 Terraform을 만들 수는 있지만, state와 live resource를 대조하지 않은 변경은 production에 적용하지 않습니다.</>,
    problem: [
      <>여러 제품·환경의 인프라를 혼자 관리하면서도 기존 운영 resource를 실수로 replace하거나 한 환경의 변경을 다른 환경으로 전파해서는 안 됐습니다.</>,
      <>resource inventory, Terraform state, Azure live configuration, runbook이 서로 다른 진실을 말하지 않도록 변경 절차 자체를 시스템화해야 했습니다.</>,
    ],
    failures: [
      { trigger: "기존 resource를 Terraform에 편입", risk: "주소·region 차이로 destroy/replace plan", boundary: "state snapshot · import/reconcile · plan/live inventory 교차 검증" },
      { trigger: "AI-assisted Terraform 변경", risk: "그럴듯하지만 실제 state와 불일치", boundary: "fmt·validate·plan · Azure CLI 확인 · human apply decision" },
      { trigger: "배포 뒤 runtime 이상", risk: "변경 성공과 서비스 정상 동작을 혼동", boundary: "health·log·alert 확인을 post-apply 단계로 분리" },
    ],
    decisions: [
      { k: "Runtime Boundary", t: <>B2B는 App Service Gateway와 환경별 VNet의 Docker workload로, B2C는 Thready API·AI App Service와 다른 App Service·VM workload로 실행 책임을 나눴습니다.</> },
      { k: "Blast Radius", t: <>Shared·STG·Prod 기준 6개 독립 root·remote state로 변경 범위를 분리했습니다.</> },
      { k: "AI with Evidence", t: <>AI는 resource 탐색과 구현에 사용하고, architecture·destructive change·apply는 사람이 근거를 보고 결정합니다.</> },
    ],
    flow: [
      { label: "SHARED", title: "Azure Container Registry", desc: "B2B·B2C에 공통 container image 공급" },
      { label: "B2B", title: "Gateway · VM workloads", desc: "환경별 VNet·managed data 경계" },
      { label: "B2C", title: "Thready API · AI / Product workloads", desc: "App Services·VM workload·managed data" },
      { label: "OPS", title: "Monitor · Log Analytics", desc: "App diagnostics·VM logs·Production alerts" },
    ],
    evidence: [
      { label: "Terraform scope", value: "6 state · 400+ object", note: "독립 root·remote state", claimIds: ["infra.terraform-state-safety"] },
      { label: "Central logs", value: "10 VM", note: "Azure Monitor·Log Analytics·AMA/DCR", claimIds: ["infra.azure-observability"] },
      { label: "Production alerts", value: "8", note: "health·5xx·DB·storage·system metric", claimIds: ["infra.azure-observability"] },
    ],
  },
  "memento-payment": {
    eyebrow: "Booking / Payment · Consistency",
    summary: (
      <>외부 결제와 DB를 하나의 transaction처럼 포장하지 않고, <strong>예약 실패의 보상 흐름과 환불 완료 시점</strong>을 분리해 상태 정합성을 보완했습니다.</>
    ),
    kv: [
      { k: "Role", v: "Stripe 선결제 구축 주도 · 결제 도메인 기여" },
      { k: "Scope", v: "Prepayment · Refund" },
      { k: "Stack", v: "FastAPI · PostgreSQL · Stripe" },
      { k: "Period", v: "2024.11 — 2025.01" },
    ],
    invariant: <>외부 provider의 접수·완료 상태가 확인되기 전에 로컬 업무 상태를 성공으로 앞서 보내지 않습니다.</>,
    problem: [
      <>선결제는 예약 생성 전에 시작되므로 PaymentIntent와 로컬 결제 이력을 아직 없는 예약 객체 없이 연결해야 했습니다.</>,
      <>환불은 provider에서 비동기로 완료됩니다. 요청 시점에 mileage와 ticket을 먼저 바꾸면 provider 실패 때 로컬 상태만 앞서갈 수 있었습니다.</>,
    ],
    failures: [
      { trigger: "예약 처리 실패", risk: "외부 결제만 남음", boundary: "PaymentIntent 상태 확인 후 requires_capture는 cancel, succeeded는 refund" },
      { trigger: "비동기 환불 진행 중", risk: "ticket 삭제·mileage 복원이 먼저 발생", boundary: "refund request와 completion transition 분리" },
      { trigger: "Webhook 재전달·local commit 실패", risk: "중복 처리·provider/local 불일치", boundary: "provider 상태와 local payment history를 대조하는 운영 확인 대상으로 분리" },
    ],
    decisions: [
      { k: "Correlation", t: <>local transaction ID와 payment type을 Checkout·Webhook metadata에 넣어 외부 event를 로컬 이력과 연결했습니다.</> },
      { k: "Compensation", t: <>manual capture 전후 상태에 따라 cancel/refund를 선택하는 provider-side 보상 경계를 뒀습니다.</> },
      { k: "Completion State", t: <>mileage 복원과 ticket 삭제를 환불 요청이 아니라 완료 transition 뒤로 이동했습니다.</> },
    ],
    flow: [
      { label: "LOCAL", title: "Payment history", desc: "예약 전 local transaction과 payment method 생성" },
      { label: "PROVIDER", title: "Checkout · PaymentIntent", desc: "metadata로 correlation하고 manual capture 대기" },
      { label: "BOOKING", title: "예약 처리", desc: "성공 시 capture, 실패 시 상태별 cancel/refund" },
      { label: "REFUND", title: "Webhook completion", desc: "완료 확인 뒤 payment·mileage·ticket 상태 전이" },
    ],
    evidence: [
      { label: "Stripe slice", value: "구축 주도", note: "Checkout·manual capture·provider compensation", claimIds: ["career.memento-stripe-prepayment"] },
      { label: "Payment domain", value: "정합성 보완", note: "refund·mileage·ticket transition", claimIds: ["career.memento-payment"] },
    ],
  },
};
