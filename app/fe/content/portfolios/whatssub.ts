import type { PortfolioOutcome, TailoredPortfolio } from "./types";

export const WHATSSUB_PORTFOLIO = {
  slug: "whatssub",
  companyName: "Whatssub",
  position: "AI-Native Product Engineer · Backend 중심",
  status: "approved",
  visibility: "public",
  updatedAt: "2026-08-26",
  introduction: [
    "고객의 불편에서 시작해 우선순위를 정하고, backend·AI·핵심 frontend를 직접 구현해 실제 고객이 결제하는 제품을 만들었습니다.",
    "제품 출시·AI 작업 전달·결제 상태·실시간 상담에서 직접 설계·구현한 범위와 팀과 함께한 범위를 네 사례로 나눴습니다.",
  ],
  careerBridge: {
    title: "PM으로 제품의 방향을 정했고, 엔지니어로 고객이 결제하는 제품을 만들었습니다",
    summary:
      "Vision AI와 Product Manager 경험을 제품 판단의 기반으로 삼고, Backend Engineer로 역할을 확장해 제품의 상태·데이터·실패 경계를 직접 구현하고 운영해 왔습니다.",
    stages: [
      {
        label: "제품 방향",
        text: "생성형 AI 커머스 제품의 프로토타입에서 v1.0까지 기능 범위와 출시 우선순위를 정하고 첫 정식 버전 출시를 PM으로 이끌었습니다.",
        layers: ["Product", "AI"],
        claimIds: ["career.sellercanvas-product-system"],
      },
      {
        label: "직접 구현",
        text: "AI 콘텐츠 제품에서 backend·AI·핵심 frontend를 직접 만들고 기획·QA·마케팅과 제품 운영을 리드했습니다.",
        layers: ["Product", "Backend", "AI"],
        claimIds: [
          "thready.product-zero-to-one-contribution",
          "thready.frontend-product-delivery",
        ],
      },
      {
        label: "유료 운영",
        text: "제품 판단과 구현을 출시 이후의 운영까지 연결해 팀과 실제 고객이 결제하는 제품으로 전환했습니다.",
        layers: ["Product", "Backend", "Operations"],
        claimIds: [
          "thready.product-zero-to-one-contribution",
          "thready.subscription-revenue-band",
        ],
      },
    ],
    caption:
      "SellerCanvas와 Thready는 서로 다른 시기와 역할의 사례입니다. 두 제품의 결과를 하나의 프로젝트나 개인 단독 성과로 합치지 않습니다.",
    claimIds: [
      "career.sellercanvas-product-system",
      "thready.product-zero-to-one-contribution",
      "thready.frontend-product-delivery",
      "thready.subscription-revenue-band",
    ],
  },
  outcomes: ([
    {
      no: "01",
      title: "고객의 불편을 찾아 유료 제품으로 만들었습니다",
      caseMode: "single-system",
      layers: ["Product", "Backend", "AI", "Operations"],
      status: { label: "운영 중", tone: "verified" },
      outcomeLine:
        "고객 문제와 제품 우선순위를 정하고, 필요한 backend·AI·핵심 frontend를 직접 구현해 팀과 유료 제품으로 운영했습니다.",
      compositionCaption:
        "제품·팀 outcome과 직접 구현 범위를 분리합니다. 제품 운영은 리드했고 backend·AI·핵심 frontend를 직접 구현했지만 제품 전체를 혼자 만들었다고 주장하지 않습니다.",
      narrative: {
        context:
          "Threads 콘텐츠 제작과 성과 판단을 돕는 AI 콘텐츠 제품 Thready의 초기 제품화와 운영 사례입니다.",
        problem:
          "고객에게는 글을 생성하는 기능만이 아니라 어떤 콘텐츠가 반응을 얻는지 판단하고 반복할 기준이 필요했습니다. 초기 prototype은 빠른 검증에는 적합했지만 실제 사용자 운영을 이어갈 backend 구조와 생성 품질 기준이 충분히 분리되지 않았습니다.",
        actions: [
          "고객 불편을 기능·실험·품질 기준으로 나누고 기획·QA·마케팅과 제품 우선순위를 정했습니다.",
          "기존 사용자 흐름을 유지하면서 FastAPI backend를 재구축하고 생성·가져오기·예약·발행·관리 화면을 직접 구현했습니다.",
          "생성 품질을 typed prompt·평가 loop·관측 logging으로 비교 가능한 대상으로 만들었습니다.",
        ],
        resultLabel: "결과",
        result:
          "팀과 실제 고객이 결제하는 제품으로 전환해 운영하고 있습니다. 정확한 매출액이나 단일 기능과 매출 사이의 직접 인과는 공개하지 않습니다.",
        visualLead:
          "고객 문제를 제품 판단으로 바꾸고, 구현부터 출시·운영까지 실제로 책임진 흐름을 한 줄로 정리했습니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "생성 기능은 있지만 고객의 반복 사용과 품질 판단 기준이 부족한 prototype",
          tone: "context",
        },
        {
          label: "제품 판단",
          text: "고객 문제를 기능·실험·품질 기준으로 나누고 직접 구현 범위를 결정",
          tone: "decision",
        },
        {
          label: "변화",
          text: "실제 사용자가 쓰고 결제하는 제품으로 출시·운영",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "제품 문제",
          items: [
            {
              text: "고객의 문제를 prompt 개선 하나로 축소하지 않고 제품 흐름·품질 기준·운영 구조로 함께 다뤄야 했습니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "제품 판단",
          items: [
            {
              text: "콘텐츠 제작과 반응 판단의 불편을 기능·실험·품질 기준으로 분리해 출시 우선순위를 정했습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "직접 구현",
          items: [
            {
              title: "Product backend",
              text: "FastAPI API·domain·transaction·migration과 release 이후 운영을 맡았습니다.",
            },
            {
              title: "AI product system",
              text: "생성 pipeline·typed prompt·평가 loop·관측 logging을 구현했습니다.",
            },
            {
              title: "Product surface",
              text: "Next.js 생성·가져오기·예약·발행·dashboard·admin 핵심 workflow를 구현했습니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "협업 범위",
          items: [
            {
              text: "제품 운영과 직접 구현 범위는 리드했지만 기획·QA·마케팅의 팀 기여와 제품·매출 outcome을 개인 단독 성과로 귀속하지 않습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "compact-flow",
        title: "고객 문제에서 유료 운영까지",
        lanes: [
          {
            label: "고객 문제 → 유료 운영",
            note: "PRODUCT FLOW",
            tone: "context",
            stages: [
              { label: "고객 불편", detail: "반복 사용의 이유 탐색" },
              { label: "제품 판단", detail: "기능·실험·품질 기준" },
              { label: "직접 구현", detail: "Backend·AI·핵심 FE", emphasis: "strong" },
              { label: "출시·운영", detail: "QA·release·사용자 운영" },
              { label: "고객 결제", detail: "유료 제품으로 전환", emphasis: "outcome" },
            ],
          },
        ],
        caption:
          "고객 문제를 제품 판단으로 바꾸고 필요한 기술 경계를 직접 구현한 뒤, 팀과 출시·운영해 실제 고객 결제까지 연결한 흐름입니다.",
      },
      operation: [
        "기획·QA·마케팅과 release·운영 우선순위를 계속 조정합니다.",
        "backend·AI·핵심 frontend의 변경과 품질 기준을 같은 제품 흐름에서 운영합니다.",
      ],
      limits: [
        "정확한 매출 band와 내부 운영 수치는 공개하지 않습니다.",
        "제품 전체를 혼자 만들었거나 매출을 개인이 단독 창출했다고 표현하지 않습니다.",
      ],
      evidence: [
        {
          project: "Thready",
          scope: "출시부터 유료 운영까지",
          ownership: "led",
          status: "verified",
          relation: "primary",
          text: "기획·QA·마케팅과 제품 운영을 리드하고 팀과 실제 고객이 결제하는 제품으로 전환했습니다.",
          claimIds: [
            "thready.product-zero-to-one-contribution",
            "thready.subscription-revenue-band",
          ],
        },
        {
          project: "Thready",
          scope: "Backend·AI·핵심 frontend",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "제품을 완성하는 데 필요한 backend·AI·핵심 frontend 사용자·관리 workflow를 직접 구현했습니다.",
          claimIds: [
            "thready.frontend-product-delivery",
            "thready.backend-rebuild",
            "thready.generation-quality-system",
          ],
        },
      ],
      claimCeiling: {
        allowed: [
          "기획·QA·마케팅과 신규 제품의 출시·운영 리드",
          "Backend·AI·핵심 frontend 직접 구현",
          "팀과 실제 고객이 결제하는 제품으로 전환",
        ],
        forbidden: [
          "제품 전체 단독 구축",
          "매출 개인 단독 기여",
          "정확한 매출·사용자 내부 수치",
        ],
      },
      jdFit: {
        matches: [
          "아이디어와 요구사항의 빠른 prototype·출시",
          "Backend뿐 아니라 제품에 필요한 web·data 기능 구현",
          "설계부터 출시·운영까지 제품 전체 흐름을 책임진 경험",
        ],
      boundary:
          "마이데이터 경험을 대신할 수는 없지만, 새로운 제품을 고객이 쓰고 결제하는 서비스로 만든 경험은 왓섭의 신규 제품 출시와 맞닿아 있습니다.",
      },
      claimIds: [
        "thready.product-zero-to-one-contribution",
        "thready.subscription-revenue-band",
        "thready.frontend-product-delivery",
        "thready.backend-rebuild",
        "thready.generation-quality-system",
      ],
    },
    {
      no: "03",
      title: "Stripe 선결제부터 취소·환불까지 상태 흐름을 만들었습니다",
      caseMode: "single-system",
      layers: ["Product", "Backend", "Operations"],
      status: { label: "실제 구현 + 미구현 후속 설계", tone: "verified" },
      outcomeLine:
        "실제로 구현한 Checkout·Webhook·취소·환불을 먼저 보여주고, 이후 보완할 복구 구조는 별도 설계안으로 뒀습니다.",
      compositionCaption:
        "IMPLEMENTED는 실제 경력이고 PROPOSED는 현재 관점의 미구현 후속 설계안입니다. 두 범위를 하나의 성과로 합치지 않습니다.",
      narrative: {
        context:
          "예약 생성 전에 외부 결제가 시작되고 환불 완료는 비동기 event로 도착하는 Memento AI 예약·결제 backend 사례입니다.",
        problem:
          "결제 요청과 예약 처리가 서로 다른 시스템에서 진행돼 일부 단계만 성공할 수 있었습니다. 환불 요청 시 내부 자산을 먼저 바꾸면 외부 결제가 완료되기 전에 내부 상태가 앞서는 문제도 있었습니다.",
        actions: [
          "local transaction ID를 provider metadata에 넣어 내부 결제 이력과 Checkout·Webhook event를 연결했습니다.",
          "예약 처리 실패 시 PaymentIntent 상태에 따라 cancel 또는 refund하는 provider-side 보상 흐름을 구성했습니다.",
          "환불 요청과 완료를 분리하고 마일리지·이용권 변경을 완료 transition 뒤로 옮겼습니다.",
        ],
        resultLabel: "결과",
        result:
          "선결제 slice는 구축을 주도했고 공유 결제 domain의 상태 정합성은 담당 범위에서 보완했습니다. Inbox·Outbox·reconciliation은 이 경험을 바탕으로 정리한 미구현 후속 설계안입니다.",
        visualLead:
          "아래 그림은 실제 구현을 과장하지 않고, 동일한 금융 결제 문제를 다시 맡을 때 추가할 상태·복구 경계를 보여주는 PROPOSED 구조입니다.",
      },
      frame: [
        {
          label: "구현",
          text: "Checkout·Webhook·cancel/refund와 내부 결제 이력 연결",
          tone: "context",
        },
        {
          label: "확인한 제약",
          text: "외부 결제와 내부 DB는 하나의 transaction으로 묶을 수 없음",
          tone: "decision",
        },
        {
          label: "후속 설계",
          text: "Inbox·Outbox·transition guard·reconciliation·운영자 복구",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "implementation",
          label: "IMPLEMENTED · 실제 구현",
          items: [
            {
              title: "Payment correlation",
              text: "local transaction ID로 PaymentHistory·PaymentMethod와 Checkout·Webhook event를 연결했습니다.",
              verdict: "selected",
            },
            {
              title: "Provider compensation",
              text: "예약 처리 실패 시 PaymentIntent 상태에 따라 cancel/refund하는 보상 흐름을 구성했습니다.",
              verdict: "selected",
            },
            {
              title: "Refund transition",
              text: "환불 요청과 완료를 분리하고 내부 자산 변경을 완료 event 이후로 옮겼습니다.",
              verdict: "selected",
            },
          ],
        },
        {
          kind: "constraints",
          label: "OBSERVED · 확인한 제약",
          items: [
            {
              text: "내부 DB와 외부 결제 시스템은 하나의 atomic transaction으로 묶을 수 없습니다.",
            },
            {
              text: "Webhook은 중복·지연·역순 도착할 수 있고 API 성공 응답이 최종 결제 완료를 뜻하지 않습니다.",
            },
          ],
        },
        {
          kind: "proposal",
          label: "PROPOSED · 후속 설계안",
          items: [
            {
              title: "Webhook Inbox",
              text: "provider event ID를 unique key로 저장해 중복 처리를 막고 처리 결과와 실패 원인을 남깁니다.",
              verdict: "proposed",
            },
            {
              title: "Transition guard",
              text: "현재 state·version을 확인해 늦게 도착한 event가 완료된 결제 상태를 되돌리지 못하게 합니다.",
              verdict: "proposed",
            },
            {
              title: "Outbox·reconciliation",
              text: "내부 상태 변경과 후속 처리 의도를 함께 기록하고 provider 상태와 내부 원장을 주기적으로 대조합니다.",
              verdict: "proposed",
            },
          ],
        },
        {
          kind: "alternatives",
          label: "TRADE-OFF · 도입 조건",
          items: [
            {
              text: "Inbox·Outbox와 대조 작업은 운영 복잡도를 늘립니다. 결제량·불일치 빈도·수동 복구 비용이 단순 상태 처리보다 커질 때 단계적으로 도입합니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "compact-flow",
        title: "결제 상태 흐름과 후속 복구 설계",
        chart: `flowchart TB
  subgraph implemented["IMPLEMENTED · 실제 구현"]
    direction LR
    checkout["Checkout<br/>Manual capture"] --> transaction["Transaction ID<br/>내부 이력 연결"]
    transaction --> reservation{"예약 처리"}
    reservation -->|성공| confirm["결제 확정"]
    reservation -->|실패| paymentState{"PaymentIntent 상태"}
    paymentState -->|미확정| cancel["Cancel"]
    paymentState -->|결제 완료| refund["Refund"]
    confirm --> webhook["Webhook 완료"]
    cancel --> webhook
    refund --> webhook
    webhook --> asset["내부 자산 변경<br/>완료 event 이후"]
  end

  subgraph proposed["PROPOSED · 후속 복구"]
    direction LR
    inbox["Webhook Inbox<br/>event 기록"] --> unique{"event ID unique"}
    unique -->|신규| guard["Transition guard<br/>현재 state·version 확인"]
    unique -->|중복| noop["No-op"]
    guard --> outbox["Outbox<br/>후속 처리 의도"]
    outbox --> reconcile["Reconciliation<br/>provider·원장 대조"]
    reconcile -. 불일치 .-> operator["운영자 복구"]
  end

  implemented ~~~ proposed

  classDef base fill:#ffffff,stroke:#9ca3af,color:#111827
  classDef decision fill:#ffffff,stroke:#111827,stroke-width:2px,color:#111827
  classDef outcome fill:#f0fdf4,stroke:#15803d,stroke-width:2px,color:#111827
  classDef proposedNode fill:#f8fafc,stroke:#64748b,stroke-dasharray:5 4,color:#111827
  class checkout,transaction,confirm,paymentState,cancel,refund,webhook base
  class reservation decision
  class asset outcome
  class inbox,unique,guard,outbox,reconcile,noop,operator proposedNode`,
        lanes: [
          {
            label: "실제 구현",
            note: "IMPLEMENTED",
            tone: "decision",
            stages: [
              { label: "Checkout", detail: "Manual capture" },
              { label: "Transaction ID", detail: "내부 이력과 event 연결" },
              { label: "예약 처리", detail: "성공·실패 분기" },
              { label: "Cancel·Refund", detail: "Provider 보상" },
              { label: "완료 반영", detail: "내부 자산 변경", emphasis: "outcome" },
            ],
          },
          {
            label: "후속 설계",
            note: "PROPOSED",
            tone: "proposed",
            stages: [
              { label: "Webhook Inbox", detail: "Event 기록" },
              { label: "Idempotency", detail: "중복 처리 차단" },
              { label: "Transition Guard", detail: "역순 상태 방지", emphasis: "strong" },
              { label: "Reconciliation", detail: "불일치 대조·복구" },
            ],
          },
        ],
        caption:
          "위쪽은 실제 구현 범위이며, 아래쪽은 외부 결제와 내부 DB의 불일치를 더 체계적으로 복구하기 위한 미구현 후속 설계입니다.",
      },
      operation: [
        "실제 구현에서는 Checkout·Webhook·cancel/refund와 환불 완료 이후 내부 상태 변경을 다뤘습니다.",
        "후속 설계에서는 terminal failure와 대조 결과를 운영자가 확인하고 다시 처리하는 경로를 둡니다.",
      ],
      limits: [
        "Webhook idempotency·Inbox·Outbox·reconciliation을 실제 구현했다고 주장하지 않습니다.",
        "DB와 provider 사이의 atomic rollback·exactly-once·불일치 0건을 주장하지 않습니다.",
      ],
      evidence: [
        {
          project: "Memento AI",
          scope: "Stripe manual-capture 선결제",
          ownership: "led",
          status: "historical",
          relation: "primary",
          text: "Stripe Checkout 선결제 영역을 구축하고 local transaction ID로 내부 이력과 provider event를 연결했습니다.",
          claimIds: ["career.memento-stripe-prepayment"],
        },
        {
          project: "Memento AI",
          scope: "취소·환불 상태 전이",
          ownership: "contributed",
          status: "historical",
          relation: "primary",
          text: "예약 실패 보상과 환불 요청·완료 분리, 내부 자산 변경 순서를 담당 범위에서 보완했습니다.",
          claimIds: ["career.memento-payment"],
        },
      ],
      claimCeiling: {
        allowed: [
          "Stripe Checkout manual-capture 선결제 구축",
          "local transaction ID와 Checkout·Webhook event 연결",
          "cancel/refund 보상과 환불 완료 이후 내부 자산 변경",
          "미구현 후속 설계안으로 Inbox·Outbox·reconciliation 제안",
        ],
        forbidden: [
          "Webhook idempotency·exactly-once 구현",
          "결제 시스템 전체 ownership",
          "DB와 provider의 atomic rollback",
          "후속 설계안을 실제 운영 성과로 표현",
        ],
      },
      jdFit: {
        matches: [
          "금융·결제 data를 API와 상태 흐름으로 연결",
          "외부 provider와 내부 transaction 사이의 부분 실패 처리",
          "구현 경험을 바탕으로 복구 가능한 구조를 설계",
        ],
        boundary:
          "실제 구현은 Checkout·Webhook·취소·환불이며, Inbox·Outbox·reconciliation은 후속 설계안입니다.",
      },
      claimIds: [
        "career.memento-stripe-prepayment",
        "career.memento-payment",
      ],
    },
    {
      no: "02",
      title: "AI 작업이 중복되거나 늦어져도 최신 결과만 반영했습니다",
      caseMode: "single-system",
      layers: ["Product", "Backend", "AI", "Operations"],
      status: { label: "STG·Prod 운영", tone: "verified" },
      outcomeLine:
        "제품 원장과 AI 실행을 분리하고, 전달 실패와 worker 중단을 복구할 수 있는 상태로 다뤘습니다.",
      compositionCaption:
        "제품 데이터와 AI 실행을 분리한 뒤, 두 application 사이에서 작업이 누락·중복되지 않도록 전달 규칙을 만들었습니다. exactly-once나 무유실을 주장하지는 않습니다.",
      narrative: {
        context:
          "제품 정책·원장과 AI 생성 lifecycle·실행 상태를 독립 FastAPI application·DB로 분리해 STG·Prod에서 운영한 Thready 사례입니다.",
        problem:
          "application을 분리하면 product backend의 변경은 성공했지만 전달 기록이 사라지거나, worker 중단 뒤 같은 event가 다시 실행되거나, 늦게 도착한 이전 event가 최신 상태를 덮는 failure mode가 생깁니다.",
        actions: [
          "제품 상태 변경과 Outbox 기록만 같은 transaction으로 묶고, 시간이 오래 걸리는 AI 실행은 transaction 밖으로 분리했습니다.",
          "relay worker는 lease와 attempt token으로 실행 권한을 확인하고, 중단된 작업은 lease 만료 뒤 다시 점유하게 했습니다.",
          "delivery version fence·멱등 consumer·제한된 retry·terminal failure 보존으로 지연·중복·역순 event를 통제했습니다.",
        ],
        resultLabel: "결과",
        result:
          "AI 장애와 worker 중단을 특별한 예외가 아니라 관측·재시도·재점유 가능한 운영 상태로 남기고, 늦은 event가 최신 원장 상태를 되돌리지 못하게 했습니다.",
        visualLead:
          "요청 transaction이 끝나는 지점과 Outbox 적체·worker 재점유·최신 결과 반영 경계를 한 흐름으로 정리했습니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "원장 변경과 AI 실행이 서로 다른 application·DB에 걸쳐 진행",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "Same-transaction Outbox와 재점유 가능한 delivery protocol",
          tone: "decision",
        },
        {
          label: "변화",
          text: "중단·중복·지연·역순 event를 재처리 가능한 상태로 남김",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "상황",
          items: [
            {
              text: "두 DB를 하나의 transaction으로 묶을 수 없으므로 전달 실패를 숨기지 않고 복구 가능한 상태로 남겨야 했습니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Transaction 경계",
          items: [
            {
              text: "제품 상태와 전달 의도까지만 같은 transaction으로 commit하고, 생성 lifecycle·실행 상태는 AI application이 별도로 소유하게 했습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "대처 방법",
          items: [
            {
              title: "짧은 원장 transaction",
              text: "제품 상태 변경과 Outbox 기록을 함께 commit하고, AI 실행이 API transaction을 오래 잡지 않도록 분리했습니다.",
            },
            {
              title: "실행권 회수",
              text: "lease·attempt token으로 작업 실행 권한을 확인하고 중단된 작업을 재점유할 수 있게 했습니다.",
            },
            {
              title: "최신 결과 보호",
              text: "delivery version fence·멱등 consumer·terminal failure 보존으로 늦거나 중복된 event를 흡수했습니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "운영 한계",
          items: [
            {
              text: "Exactly-once·무중단·무유실은 주장하지 않습니다. 최대 재시도 뒤 실패를 보존하고 운영자가 확인하는 at-least-once delivery입니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "compact-flow",
        title: "Transaction은 제품 상태와 전달 의도까지만 묶었습니다",
        chart: `flowchart TB
  subgraph requestPath["REQUEST PATH · 짧은 transaction"]
    direction LR
    spike["동시 요청"] --> tx["제품 상태 + Outbox<br/>BEGIN → COMMIT"] --> backlog["Outbox backlog<br/>AI 실행 대기"]
  end

  subgraph executionPath["ASYNC EXECUTION · transaction 밖"]
    direction LR
    claim{"Lease claim"} --> execution["AI execution<br/>attempt token"] --> fence{"Version fence"}
    fence -->|current| replica["최신 결과 반영"]
    fence -. stale .-> discard["이전 결과 폐기"]
  end

  subgraph recoveryPath["RECOVERY · 실행권 회수"]
    direction LR
    stop["Worker 중단"] --> expiry["Lease expiry"] --> reclaim["Attempt token 갱신<br/>재점유"]
    expiry -. retry limit .-> terminal["Terminal failure<br/>실패 보존"]
  end

  requestPath ~~~ executionPath ~~~ recoveryPath

  classDef base fill:#ffffff,stroke:#9ca3af,color:#111827
  classDef decision fill:#ffffff,stroke:#111827,stroke-width:2px,color:#111827
  classDef outcome fill:#f0fdf4,stroke:#15803d,stroke-width:2px,color:#111827
  classDef recovery fill:#f8fafc,stroke:#64748b,stroke-dasharray:5 4,color:#111827
  class spike,tx,backlog,execution base
  class claim,fence decision
  class replica outcome
  class discard,stop,expiry,reclaim,terminal recovery`,
        lanes: [
          {
            label: "정상 전달",
            note: "AT-LEAST-ONCE",
            tone: "decision",
            stages: [
              { label: "Request Transaction", detail: "제품 상태+전달 의도" },
              { label: "Outbox", detail: "AI 실행 대기" },
              { label: "Lease Worker", detail: "실행 권한 점유" },
              { label: "AI Execution", detail: "독립 application" },
              { label: "Version Fence", detail: "최신 결과만 반영", emphasis: "outcome" },
            ],
          },
          {
            label: "실패 복구",
            note: "RECOVERY",
            tone: "failure",
            stages: [
              { label: "Worker 중단", detail: "Lease 미완료" },
              { label: "Lease 만료", detail: "재점유 가능" },
              { label: "Retry", detail: "Attempt token 확인", emphasis: "strong" },
              { label: "Terminal Failure", detail: "실패 보존·운영 확인" },
            ],
          },
        ],
        loadBehavior: {
          title: "트래픽이 늘어날 때",
          description:
            "현재 구현으로 설명할 수 있는 동작과, 요청량이 커질 때 별도 부하 검증이 필요한 지점을 나눴습니다.",
          rows: [
            {
              situation: "요청 급증",
              behavior:
                "요청마다 제품 상태와 Outbox 기록까지만 commit하고, AI 실행은 API transaction 밖에서 처리합니다.",
              watch: "Outbox backlog age · commit latency",
            },
            {
              situation: "Worker 경합",
              behavior:
                "lease와 attempt token으로 현재 실행권을 구분해 같은 작업의 이전 실행이 완료 상태를 덮지 못하게 합니다.",
              watch: "claim latency · DB lock wait",
            },
            {
              situation: "Worker 중단",
              behavior:
                "완료되지 않은 lease가 만료되면 실행권을 회수하고 새 attempt token으로 작업을 다시 점유합니다.",
              watch: "lease expiry · retry rate",
            },
            {
              situation: "이전 결과 지연",
              behavior:
                "delivery version fence와 멱등 consumer가 현재 version을 확인해 늦거나 중복된 결과를 반영하지 않습니다.",
              watch: "stale event · terminal failure",
            },
          ],
        },
        caption:
          "API transaction은 제품 상태와 전달 의도를 기록한 뒤 끝나고, AI 실행과 재시도는 transaction 밖에서 이어집니다.",
      },
      operation: [
        "STG 실데이터 migration rehearsal과 row count·fingerprint·FK 검증 뒤 분리된 application·DB를 Prod에서 운영합니다.",
        "최대 retry 이후 terminal failure를 보존해 운영자가 실패 상태와 재처리 대상을 확인할 수 있게 했습니다.",
      ],
      limits: [
        "Exactly-once·무중단·production 데이터 유실 0건을 주장하지 않습니다.",
        "AI application 분리 자체가 가용성이나 성능을 개선했다는 수치를 주장하지 않습니다.",
      ],
      evidence: [
        {
          project: "Thready",
          scope: "AI application·data ownership",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "제품 원장과 AI 생성 lifecycle·실행 상태를 독립 application·DB로 분리해 운영했습니다.",
          claimIds: ["thready.ai-service-boundary"],
        },
        {
          project: "Thready",
          scope: "Durable delivery protocol",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "Transactional Outbox·lease·attempt token·retry·version fence·멱등 consumer·terminal failure를 구현했습니다.",
          claimIds: ["thready.ai-replica-outbox"],
        },
      ],
      claimCeiling: {
        allowed: [
          "제품 원장과 AI 실행 ownership 분리",
          "Outbox·lease·attempt token·retry·delivery version fence·멱등 consumer 구현·운영",
        ],
        forbidden: [
          "Exactly-once·무중단·무유실",
          "Application 분리로 인한 availability·성능 개선 수치",
        ],
      },
      jdFit: {
        matches: [
          "Product core와 AI execution의 service·data ownership",
          "분산 transaction 대신 durable intent와 at-least-once delivery를 선택한 판단",
          "Worker 중단·중복·지연·역순 event를 복구 가능한 상태로 운영",
        ],
        boundary:
          "금융 데이터 경험은 아니지만, 서로 다른 application·DB 사이의 정합성과 복구를 직접 설계한 경험입니다.",
      },
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-replica-outbox",
      ],
    },
    {
      no: "04",
      title: "중간 전사와 확정 문맥이 충돌하지 않도록 상담 backend를 설계했습니다",
      caseMode: "single-system",
      layers: ["Backend", "AI", "Operations"],
      status: { label: "운영 중 · 핵심 설계·통합 공동 수행", tone: "verified" },
      outcomeLine:
        "STT partial·final·보정 event의 순서와 WebSocket session·비동기 task lifecycle을 함께 설계했습니다.",
      compositionCaption:
        "실시간 상담 backend 전체를 단독 구축한 것은 아니며, 다른 개발자와 함께 session lifecycle·transcript event·provider 평가 경계의 핵심 설계·통합을 맡았습니다.",
      narrative: {
        context:
          "상담 음성을 실시간 전사하고 대화 중 조언을 제공한 뒤, 상담 종료 후 문맥을 분석하는 AI 상담 backend 사례입니다.",
        problem:
          "partial transcript는 빠르지만 뒤늦게 보정될 수 있고, final transcript와 다른 순서로 도착할 수 있습니다. 중복 event와 재연결 timer가 남으면 이전 turn의 작업이 새 문맥을 덮거나 종료된 session이 되살아날 수 있었습니다.",
        actions: [
          "DELTA·COMPLETE·optional CORRECTED를 같은 sequence에 묶어 늦은 보정 결과가 다른 turn을 덮지 않게 했습니다.",
          "DELTA는 domain keyword 조기 판단, COMPLETE는 확정 context·저장·LLM 판단으로 책임을 분리했습니다.",
          "중복 event는 debounce하고 기존 task를 cancel·재생성하며 retry·turn-state guard로 비동기 충돌을 제어했습니다.",
          "stop guard와 timer·timeout·GC·shutdown 정리 경계를 보강해 종료된 session의 재연결을 차단했습니다.",
        ],
        resultLabel: "결과",
        result:
          "실제 상담 E2E에서 transcript sequence의 누락·중복 여부와 advice trigger를 확인하고, 종료·재연결 경계는 focused regression scenario로 고정했습니다.",
        visualLead:
          "DELTA·COMPLETE·CORRECTED가 한 session에서 같은 turn을 가리키도록 sequence 기준을 정리했습니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "빠르지만 바뀔 수 있는 partial transcript와 비동기 advice task",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "Sequence·turn-state·session lifecycle을 명시적인 contract로 분리",
          tone: "decision",
        },
        {
          label: "변화",
          text: "조기 응답과 확정 문맥, 종료·재연결 경계가 충돌하지 않는 runtime",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Event Ordering",
          items: [
            {
              text: "DELTA·COMPLETE·CORRECTED를 같은 sequence로 묶어 늦은 보정이 다른 turn을 덮지 않게 했습니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Fast·Confirmed Paths",
          items: [
            {
              text: "DELTA는 domain keyword 기반 조기 advice trigger, COMPLETE는 확정 context·저장·LLM 판단에 사용했습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Task Coordination",
          items: [
            {
              text: "중복 event를 debounce하고 기존 task를 cancel·재생성하며 retry·turn-state guard로 이전 작업의 stale write를 막았습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Session Cleanup",
          items: [
            {
              text: "stop guard·timeout·GC·shutdown에서 timer와 연결을 정리해 종료된 session의 재연결을 차단했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "compact-flow",
        title: "Realtime transcript·session lifecycle",
        chart: `flowchart TB
  input["Audio · WebSocket<br/>실시간 입력"] --> vad["VAD<br/>발화 경계"] --> event{"STT event"}

  subgraph realtime["REALTIME PATH · 빠른 응답"]
    direction LR
    delta["DELTA<br/>중간 전사"] --> keyword{"Domain keyword"}
    keyword -->|hit| advice["Early advice<br/>조기 응답"]
    keyword -->|miss| wait["다음 event 대기"]
  end

  subgraph confirmed["CONFIRMED PATH · 확정 문맥"]
    direction LR
    complete["COMPLETE<br/>확정 전사"] --> sequence{"Sequence guard"}
    corrected["CORRECTED<br/>동일 turn 보정"] --> sequence
    sequence --> context["Context store<br/>문맥·문장 저장"] --> judgment["LLM 판단<br/>상담 후속 처리"]
  end

  subgraph lifecycle["SESSION LIFECYCLE · 종료 경계"]
    direction LR
    stop["Session stop"] --> stopGuard["Stop guard"] --> cleanup["Timer · task cleanup"] --> closed["Closed<br/>재연결 차단"]
  end

  event -->|DELTA| delta
  event -->|COMPLETE| complete
  event -. CORRECTED .-> corrected
  event -. session stop .-> stop
  delta -. newer event .-> cancelTask["Stale task cancel"]
  cancelTask -. 정리 .-> cleanup

  classDef base fill:#ffffff,stroke:#9ca3af,color:#111827
  classDef decision fill:#ffffff,stroke:#111827,stroke-width:2px,color:#111827
  classDef outcome fill:#f0fdf4,stroke:#15803d,stroke-width:2px,color:#111827
  classDef recovery fill:#f8fafc,stroke:#64748b,stroke-dasharray:5 4,color:#111827
  class input,vad,delta,complete,context,judgment base
  class event,keyword,sequence,stopGuard decision
  class advice,closed outcome
  class wait,corrected,stop,cleanup,cancelTask recovery`,
        lanes: [
          {
            label: "빠른 응답",
            note: "REALTIME PATH",
            tone: "decision",
            stages: [
              { label: "Audio·WebSocket", detail: "실시간 입력" },
              { label: "DELTA", detail: "중간 전사" },
              { label: "Keyword Trigger", detail: "조기 판단" },
              { label: "Early Advice", detail: "사용자 응답", emphasis: "outcome" },
            ],
          },
          {
            label: "확정 문맥",
            note: "CONFIRMED PATH",
            tone: "context",
            stages: [
              { label: "COMPLETE", detail: "확정 전사" },
              { label: "Sequence Guard", detail: "같은 turn 확인", emphasis: "strong" },
              { label: "Context Store", detail: "문맥·문장 저장" },
              { label: "LLM 판단", detail: "상담 후속 처리" },
            ],
          },
          {
            label: "보정·종료",
            note: "LIFECYCLE",
            tone: "failure",
            stages: [
              { label: "CORRECTED", detail: "동일 sequence 보정" },
              { label: "Task Cancel", detail: "Stale 작업 정리" },
              { label: "Stop Guard", detail: "재연결·timer 차단", emphasis: "outcome" },
            ],
          },
        ],
        caption:
          "중간·확정·보정 전사를 서로 다른 경로로 처리하고, sequence와 session 상태를 확인해 이전 결과가 새 문맥을 덮지 않게 했습니다.",
      },
      operation: [
        "Provider 후보를 WER·CER·keyword retention·latency로 비교하고 domain keyword hint를 적용했습니다.",
        "상담 E2E와 focused regression scenario로 sequence 무결성·재연결 차단·shutdown 정리를 확인했습니다.",
      ],
      limits: [
        "상담 backend 전체를 단독 구축했다고 표현하지 않습니다.",
        "VAD·keyword hint가 STT 정확도나 전체 latency를 개선했다는 인과 수치를 주장하지 않습니다.",
      ],
      evidence: [
        {
          project: "Realtime AI consultation",
          scope: "Session lifecycle·transcript event",
          ownership: "contributed",
          status: "verified",
          relation: "primary",
          text: "WebSocket session의 event ordering·task coordination·cleanup 경계를 설계·통합하고 provider evaluation과 regression을 함께 수행했습니다.",
          claimIds: ["centurion.say-realtime-ai"],
        },
      ],
      claimCeiling: {
        allowed: [
          "Realtime AI 상담 backend session lifecycle·provider 경계 핵심 설계·통합 공동 수행",
          "DELTA·COMPLETE·CORRECTED sequence와 task cancellation·turn-state guard",
          "Stop guard·timer·GC·shutdown cleanup과 focused regression",
        ],
        forbidden: [
          "상담 backend 전체 단독 구축",
          "VAD·keyword hint에 따른 STT 정확도·latency 개선 단정",
          "Provider 실명 또는 production 전환하지 않은 adapter의 운영 주장",
        ],
      },
      jdFit: {
        matches: [
          "실시간 AI 기능을 session·event·비동기 task 경계가 있는 backend로 구현",
          "Partial·final·corrected data의 ordering과 stale write 제어",
          "Provider 평가와 회귀 scenario를 포함한 production 검증",
        ],
        boundary:
          "금융 도메인은 아니지만, 실시간 데이터와 비동기 AI 작업의 순서·복구를 운영 환경에서 다뤘습니다.",
      },
      claimIds: ["centurion.say-realtime-ai"],
    },
  ] satisfies PortfolioOutcome[]).sort((left, right) => left.no.localeCompare(right.no)),
  workSystem: {
    title: "AI를 개인 도구가 아닌 팀의 제품 개발 체계로 확장했습니다",
    summary: [
      "기획·디자인·개발·QA·release의 결정과 진행 상태를 하나의 실행 맥락에 쌓아, 사람과 AI가 같은 제품·architecture 기준에서 일하도록 했습니다.",
      "공통 FastAPI template·agent context·자동 검증·release gate를 연결해 반복 설명과 인수인계에 드는 비용을 낮추고, 유사 기능과 후속 변경이 같은 기준에서 출발하게 했습니다.",
    ],
    foundation: [
      "Decision·SPEC",
      "Work Package·owner lane",
      "FastAPI template·ADR·runbook",
      "Test·QA evidence·release gate",
    ],
    lanes: [
      {
        kind: "human",
        label: "Human Judgment",
        items: ["고객 문제 정의", "우선순위·담당", "Data ownership", "Architecture", "QA·release 승인"],
      },
      {
        kind: "ai",
        label: "AI Execution",
        items: ["Codebase·문서 탐색", "요구사항 작업안", "대안·영향 범위 비교", "반복 구현·문서 갱신"],
      },
      {
        kind: "automated",
        label: "Automated Verification",
        items: ["Contract·schema", "Static·type", "Test·CI", "QA evidence", "Release note"],
      },
    ],
    qualityLab: {
      title: "AI가 만든 결과를 contract·test·실측 evidence로 걸러냈습니다",
      description:
        "형식과 회귀 조건은 자동으로 확인하고, 실측 결과와 로그를 대조한 뒤 제품 품질과 release 여부는 사람이 판단합니다.",
      automated: ["형식·schema", "정적 규칙", "회귀 조건"],
      measurement: ["실측 결과 대조", "분포·로그 확인", "기준 재점검"],
      human: ["제품 품질", "예외 판단", "Release decision"],
      boundary:
        "자동 검증은 제품의 정답이 아닙니다. 최종 release 여부는 사람이 판단합니다.",
      claimIds: [
        "thready.quality-criteria-system",
        "thready.measurement-correction",
      ],
    },
    evidence: [
      {
        project: "제품 개발 운영",
        scope: "Decision→release context",
        ownership: "led",
        status: "verified",
        relation: "primary",
        text: "기획·디자인·개발·QA·release에서 나온 결정과 상태를 실행 맥락으로 누적하고 제품별 운영에 적용했습니다.",
        claimIds: [
          "mediness.product-operations",
          "mediness.product-development-coordination-leverage",
        ],
      },
      {
        project: "Thready",
        scope: "AI-assisted rebuild·quality system",
        ownership: "owned",
        status: "verified",
        relation: "corroborating",
        text: "backend 재구축과 생성 품질 system에서 architecture·검증 기준·cutover 판단과 AI의 실행 범위를 분리했습니다.",
        claimIds: [
          "thready.rebuild-decision-execution",
          "thready.quality-criteria-system",
          "thready.measurement-correction",
        ],
      },
      {
        project: "Backend Template",
        scope: "Shared architecture·agent context",
        ownership: "owned",
        status: "verified",
        relation: "corroborating",
        text: "팀과 agent가 같은 architecture·작업·검증 기준을 읽도록 공통 backend foundation과 context를 구축했습니다.",
        claimIds: [
          "be-template.backend-standard",
          "be-template.team-leverage",
          "be-template.agent-context",
        ],
      },
    ],
    limits: [
      "AI가 제품·architecture·release 판단을 대신한다고 표현하지 않습니다.",
      "AI 도입으로 인한 조직 생산성 배수나 정량 성과를 주장하지 않습니다.",
    ],
    claimIds: [
      "thready.rebuild-decision-execution",
      "thready.quality-criteria-system",
      "thready.measurement-correction",
      "mediness.product-operations",
      "mediness.product-development-coordination-leverage",
      "be-template.backend-standard",
      "be-template.team-leverage",
      "be-template.agent-context",
    ],
  },
} satisfies TailoredPortfolio;
