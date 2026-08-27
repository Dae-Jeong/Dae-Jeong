import type { PortfolioOutcome, TailoredPortfolio } from "./types";

export const PINOKIOLAB_PORTFOLIO = {
  slug: "pinokiolab",
  companyName: "피노키오랩",
  position: "Backend Engineer (FastAPI)",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-08-27",
  introduction: [
    "FastAPI·SQLAlchemy를 사용한 경험보다, transaction·session·failure boundary를 어떤 기준으로 정했는지 보여드립니다.",
    "아래 사례는 피노키오랩의 내부 구조를 추정한 구현안이 아니라 제가 실제로 구축한 backend·AI application·결제·권한 경계를 이 역할의 기술 질문에 맞춰 정리한 것입니다.",
  ],
  careerBridge: {
    title: "AI 모델을 제품으로 연결해 본 뒤, 제품의 상태와 실패를 다루는 backend로 확장했습니다",
    summary:
      "Vision AI Engineer와 Product Manager를 거쳐 Backend Engineer로 역할을 넓혔습니다. 모델 결과를 사용자 workflow로 바꾸는 경험은 AI application의 실행 상태·업무 원장·검토 이력을 분리하는 backend 판단으로 이어졌습니다.",
    stages: [
      {
        label: "AI 결과",
        text: "Vision AI 모델과 데이터 pipeline을 제품 기능으로 연결하고 결과 검증에 참여했습니다.",
        layers: ["AI", "Product"],
        claimIds: ["career.ai-pm-backend-continuity"],
      },
      {
        label: "제품 판단",
        text: "생성형 AI 제품의 기능 범위·우선순위·사용자 workflow를 정하고 정식 버전과 기업 PoC로 연결했습니다.",
        layers: ["Product", "AI"],
        claimIds: ["career.sellercanvas-product-system", "career.sellercanvas-enterprise-poc"],
      },
      {
        label: "Backend 경계",
        text: "FastAPI 기반 제품에서 transaction·delivery·payment·authorization 경계를 직접 구현하고 운영했습니다.",
        layers: ["Backend", "Operations", "AI"],
        claimIds: [
          "be-template.fastapi-sqlalchemy-standard",
          "thready.ai-service-boundary",
          "career.memento-payment",
        ],
      },
    ],
    caption:
      "서로 다른 시기와 프로젝트의 경험입니다. 하나의 프로젝트나 개인 단독 성과로 합치지 않습니다.",
    claimIds: [
      "career.ai-pm-backend-continuity",
      "career.sellercanvas-product-system",
      "be-template.fastapi-sqlalchemy-standard",
      "thready.ai-service-boundary",
    ],
  },
  outcomes: ([
    {
      no: "01",
      title: "FastAPI·SQLAlchemy의 실행 규칙을 팀의 backend 기준으로 만들었습니다",
      caseMode: "cross-project-pattern",
      layers: ["Backend", "Operations"],
      status: { label: "직접 설계·구축", tone: "verified" },
      outcomeLine:
        "계층을 나누는 데서 끝내지 않고 transaction ownership·AsyncSession lifecycle·검증 기준을 코드와 문서에 함께 고정했습니다.",
      compositionCaption:
        "조직 표준 template의 직접 구축 범위와 운영 제품에 적용한 판단을 함께 보여주되, 모든 사내 service가 전환됐다고 주장하지 않습니다.",
      narrative: {
        context:
          "2~3명의 backend engineer가 여러 제품을 담당하며 프로젝트마다 계층·transaction·error 처리를 다시 해석하던 환경이었습니다.",
        problem:
          "폴더 구조가 같아도 commit 위치와 session 수명이 다르면 부분 성공·rollback 누락·lazy loading 같은 오류가 반복됩니다. 새 담당자와 coding agent도 규칙을 코드 전체에서 다시 추론해야 했습니다.",
        actions: [
          "Router → Service → Validator → Repository → Model의 책임을 정의하고 DI로 조립했습니다.",
          "Repository는 SQL 실행·flush만 맡기고 commit·rollback은 Service의 transaction boundary가 소유하게 했습니다.",
          "required·requires-new·nested propagation과 isolation·read-only·rollback safety를 integration test로 검증했습니다.",
          "typed query DTO·ErrorCode·response matrix·ADR·runbook·agent context를 같은 template에 묶었습니다.",
        ],
        resultLabel: "남은 상태",
        result:
          "제품 정책을 파악하면 다른 backend에도 같은 실행 기준으로 접근하고 logging·monitoring 같은 횡단 관심사를 반복 적용할 기반을 만들었습니다.",
        visualLead:
          "HTTP 요청부터 DB commit까지 누가 책임을 소유하고 무엇을 test로 확인하는지 한 흐름으로 표시했습니다.",
      },
      frame: [
        { label: "상황", text: "제품마다 달랐던 계층·transaction·session 규칙", tone: "context" },
        { label: "판단", text: "SQL 실행과 transaction ownership을 분리", tone: "decision" },
        { label: "기여", text: "FastAPI template·integration test·ADR·agent context 직접 구축", tone: "outcome" },
      ],
      details: [
        {
          kind: "decision",
          label: "TRANSACTION OWNERSHIP",
          items: [
            { title: "Service", text: "업무 단위의 commit·rollback과 propagation을 소유합니다.", verdict: "selected" },
            { title: "Repository", text: "query·flush만 수행하고 독자적으로 transaction을 닫지 않습니다.", verdict: "selected" },
          ],
        },
        {
          kind: "implementation",
          label: "SESSION LIFECYCLE",
          items: [
            { title: "AsyncSession context", text: "요청·작업 단위의 session binding과 종료 시점을 명시했습니다." },
            { title: "Typed boundary", text: "ORM entity와 raw query 결과를 typed DTO로 분리했습니다." },
          ],
        },
        {
          kind: "implementation",
          label: "VERIFICATION",
          items: [
            { text: "Propagation·rollback·read-only·isolation·API error contract를 integration test와 CI로 확인했습니다." },
          ],
        },
        {
          kind: "constraints",
          label: "BOUNDARY",
          items: [
            { text: "template 도입 자체를 성과로 두지 않고 실제 제품 적용과 검증 가능한 실행 규칙을 기준으로 삼았습니다." },
          ],
        },
      ],
      visual: {
        kind: "compact-flow",
        title: "FastAPI request와 transaction ownership",
        chart: `flowchart LR
  request["HTTP Request"] --> router["FastAPI Router<br/>입력·응답 contract"]
  router --> service["Service<br/>Transaction owner"]
  service --> validator["Validator<br/>업무 규칙"]
  service --> repo["Repository<br/>SQL + flush"]
  validator --> repo
  repo --> orm["SQLAlchemy 2.0 async"]
  orm --> db[("PostgreSQL / MySQL")]
  di["DI Container"] -. inject .-> service
  session["AsyncSession Context"] -. bind .-> service
  tests["Propagation · Rollback<br/>Read-only tests"] -. verify .-> service
  classDef base fill:#edf3ff,stroke:#2854d7,color:#102044
  classDef strong fill:#f4efff,stroke:#6d42c7,stroke-width:2px,color:#102044
  classDef outcome fill:#eaf8f2,stroke:#087f5b,stroke-width:2px,color:#102044
  class request,router,validator,repo,orm,db,di,session base
  class service strong
  class tests outcome`,
        lanes: [
          {
            label: "Request → Commit",
            tone: "decision",
            stages: [
              { label: "Router", detail: "HTTP contract" },
              { label: "Service", detail: "Transaction owner", emphasis: "strong" },
              { label: "Repository", detail: "SQL·flush" },
              { label: "Database", detail: "Commit·rollback", emphasis: "outcome" },
            ],
          },
        ],
        loadBehavior: {
          title: "동시 요청에서 확인한 실행 경계",
          description:
            "하나의 session을 여러 요청이 공유하지 않게 하고, 실패한 업무 단위가 다른 요청의 commit에 섞이지 않도록 검증했습니다.",
          rows: [
            { situation: "동시 요청", behavior: "요청별 AsyncSession·transaction context를 분리", watch: "pool wait · session leak" },
            { situation: "부분 실패", behavior: "Service boundary 전체 rollback, terminal error로 변환", watch: "partial commit · stale entity" },
            { situation: "중첩 호출", behavior: "propagation 규칙에 따라 기존 transaction 참여 또는 분리", watch: "savepoint · lock time" },
          ],
        },
        caption:
          "폴더 구조보다 commit을 누가 소유하는지, session이 언제 만들어지고 닫히는지를 팀의 실행 계약으로 고정했습니다.",
      },
      operation: [
        "ADR·runbook·검증 명령을 template과 함께 유지합니다.",
        "새 제품 적용 시 domain 정책과 migration 차이는 별도로 검토합니다.",
      ],
      limits: [
        "모든 사내 service가 이 template으로 전환됐다고 주장하지 않습니다.",
        "template만으로 성능이나 무결성이 자동 보장된다고 표현하지 않습니다.",
      ],
      evidence: [
        {
          project: "Backend Template",
          scope: "FastAPI·SQLAlchemy 실행 기준",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "계층·DI·transaction·session·error·test 기준과 ADR·runbook·agent context를 직접 설계·구축했습니다.",
          claimIds: ["be-template.fastapi-sqlalchemy-standard", "be-template.backend-standard", "be-template.agent-context"],
        },
        {
          project: "운영 제품 backend",
          scope: "병렬 재구축·검증·전환",
          ownership: "owned",
          status: "verified",
          relation: "pattern-instance",
          text: "기존 사용자 흐름을 유지하면서 FastAPI backend를 병렬 구축하고 validation harness를 거쳐 전환했습니다.",
          claimIds: ["thready.rebuild-decision-execution", "thready.backend-rebuild"],
        },
      ],
      claimCeiling: {
        allowed: ["조직 표준 FastAPI template 직접 구축", "transaction·session lifecycle integration test", "운영 제품 backend 재구축에 같은 판단 적용"],
        forbidden: ["전사 모든 service 전환 완료", "성능·개발 시간 정량 개선", "framework만으로 안정성 보장"],
      },
      jdFit: {
        matches: ["Python·FastAPI backend 설계·운영", "SQLAlchemy 기반 transaction·session 이해", "작은 팀에서 반복 가능한 개발 기준 구축"],
        boundary: "공공 SI·secure coding 경험을 대신하지는 않으며, 해당 acceptance criteria는 입사 후 확인해야 할 영역입니다.",
      },
      claimIds: ["be-template.fastapi-sqlalchemy-standard", "be-template.backend-standard", "be-template.team-leverage", "be-template.agent-context", "thready.backend-rebuild"],
    },
    {
      no: "02",
      title: "AI 실행이 실패해도 업무 원장의 최신 상태를 지키는 전달 경계를 만들었습니다",
      caseMode: "single-system",
      layers: ["Backend", "AI", "Operations"],
      status: { label: "운영 구현", tone: "verified" },
      outcomeLine:
        "AI application을 분리하면서 생긴 commit 이후 유실·worker 중단·중복·지연·역순 전달을 복구 가능한 protocol로 다뤘습니다.",
      compositionCaption:
        "제품 backend와 AI application의 실제 구현 범위입니다. exactly-once나 무중단을 주장하지 않습니다.",
      narrative: {
        context: "제품 정책과 원장, AI 생성 lifecycle을 독립 application·DB로 분리한 운영 제품 사례입니다.",
        problem: "DB commit과 외부 AI 실행은 하나의 transaction으로 묶을 수 없습니다. worker가 중단되거나 이전 결과가 늦게 도착하면 최신 제품 상태가 되돌아갈 수 있었습니다.",
        actions: [
          "제품 원장 변경과 Outbox row를 같은 transaction에 기록했습니다.",
          "lease·attempt token으로 실행 권한과 중단 뒤 재점유를 통제했습니다.",
          "delivery version fence와 멱등 consumer로 늦거나 중복된 결과의 반영 여부를 결정했습니다.",
          "retry 상한과 terminal failure를 보존해 운영자가 실패 상태를 확인하게 했습니다.",
        ],
        resultLabel: "결과",
        result: "실패가 생겨도 최신 원장을 지키고, 어느 작업이 어디서 멈췄는지 확인해 다시 처리할 수 있는 상태를 남겼습니다.",
        visualLead: "원장 변경과 전달 의도를 같은 transaction에 기록한 뒤 AI 실행은 복구 가능한 worker 경계로 분리했습니다.",
      },
      frame: [
        { label: "상황", text: "Product DB와 AI DB를 가로지르는 비동기 작업", tone: "context" },
        { label: "대처", text: "Outbox·lease·attempt token·version fence", tone: "decision" },
        { label: "기여", text: "재처리 가능한 상태와 최신 원장 보호", tone: "outcome" },
      ],
      details: [
        { kind: "decision", label: "OWNERSHIP", items: [
          { title: "Product backend", text: "제품 정책·원장·사용자에게 보이는 상태를 소유합니다." },
          { title: "AI application", text: "생성 lifecycle·실행 상태·AI 결과를 소유합니다." },
        ] },
        { kind: "implementation", label: "DELIVERY", items: [
          { title: "Outbox", text: "원장 변경과 전달 의도를 같은 transaction에 기록했습니다." },
          { title: "Lease·attempt", text: "현재 실행권과 중단 뒤 재점유를 구분했습니다." },
        ] },
        { kind: "implementation", label: "STALE WRITE", items: [
          { title: "Version fence", text: "늦게 도착한 이전 event가 최신 상태를 덮지 않게 했습니다." },
          { title: "Terminal failure", text: "retry 소진 뒤 원인과 상태를 운영자가 확인하게 남겼습니다." },
        ] },
        { kind: "constraints", label: "BOUNDARY", items: [
          { text: "Exactly-once 대신 at-least-once 전달에서 멱등성과 최신 version 확인을 선택했습니다." },
        ] },
      ],
      visual: {
        kind: "ai-system",
        title: "Product backend와 AI application의 ownership·delivery 경계",
        ownership: {
          productBackend: { label: "FastAPI Product Backend", database: "Product PostgreSQL", owns: ["제품 정책·원장", "사용자 상태", "Delivery version"] },
          aiRuntime: { label: "FastAPI AI Application", database: "AI PostgreSQL", owns: ["Generation lifecycle", "Attempt state", "AI result"] },
        },
        transaction: { label: "SAME TRANSACTION", items: ["Owner mutation", "Version update"], outbox: "Outbox row" },
        delivery: { worker: "Delivery worker", retry: "lease · retry · terminal failure", transport: "Authenticated HTTP", authentication: "Service credential" },
        versionFence: { rule: "incoming version == current", outcomes: ["current → apply", "stale → ignore + history"] },
        verificationRail: ["STG migration rehearsal", "Row count·MD5", "FK orphan", "Generation API E2E"],
        caption: "Product backend와 AI application은 모두 운영 중이며, 하단 검증 rail만 migration 전환 검증 범위입니다.",
      },
      operation: ["terminal failure와 retry 상태를 구조화 로그로 확인합니다.", "migration 전 STG 실데이터 rehearsal과 API E2E를 수행했습니다."],
      limits: ["Exactly-once·무중단·무유실을 주장하지 않습니다.", "AI application 전체를 단독 구축했다고 표현하지 않습니다."],
      evidence: [
        { project: "Thready", scope: "Product·AI application boundary", ownership: "owned", status: "verified", relation: "primary", text: "제품 원장과 AI 실행 상태의 ownership을 분리하고 delivery protocol을 구현했습니다.", claimIds: ["thready.ai-service-boundary", "thready.ai-replica-outbox"] },
        { project: "Thready", scope: "STG migration rehearsal", ownership: "owned", status: "verified", relation: "primary", text: "실데이터 migration을 row count·MD5·FK·API E2E로 검증했습니다.", claimIds: ["thready.ai-service-migration"] },
      ],
      claimCeiling: { allowed: ["독립 AI application·DB 운영", "Outbox·lease·attempt token·version fence", "STG migration rehearsal"], forbidden: ["Exactly-once", "무중단·무유실", "AI application 전체 단독 구축"] },
      jdFit: { matches: ["AI 분석과 업무 원장 사이의 명시적 ownership", "비동기 실행의 중복·지연·역순 결과 통제", "운영 상태와 재처리 경로 설계"], boundary: "피노키오랩의 실제 model contract와 검토 workflow는 입사 후 domain 전문가와 함께 정의할 영역입니다." },
      claimIds: ["thready.ai-service-boundary", "thready.ai-service-migration", "thready.ai-replica-outbox"],
    },
    {
      no: "03",
      title: "결제 요청과 내부 업무 상태를 분리해 취소·환불 흐름을 추적했습니다",
      caseMode: "single-system",
      layers: ["Backend", "Product", "Operations"],
      status: { label: "실제 구현 + 후속 설계", tone: "verified" },
      outcomeLine: "Checkout·Webhook·cancel·refund의 실제 구현과 Inbox·reconciliation 후속 설계안을 구분했습니다.",
      compositionCaption: "IMPLEMENTED는 실제 경력이고 PROPOSED는 같은 문제를 다시 맡을 때 보강할 미구현 설계입니다.",
      narrative: {
        context: "예약 생성 전에 외부 결제가 시작되고 환불 완료가 비동기 event로 도착하는 예약·결제 backend 사례입니다.",
        problem: "결제와 예약은 서로 다른 시스템이라 일부 단계만 성공할 수 있었고, 환불 요청 시 내부 자산이 외부 완료보다 먼저 바뀔 위험이 있었습니다.",
        actions: ["local transaction ID로 내부 이력과 provider event를 연결했습니다.", "예약 실패 시 PaymentIntent 상태에 따라 cancel 또는 refund했습니다.", "환불 요청과 완료를 나누고 내부 자산 변경을 완료 transition 뒤로 옮겼습니다."],
        resultLabel: "결과",
        result: "선결제부터 보상 처리까지 상태를 추적할 수 있게 했고, 미구현 복구안은 성과와 분리해 제안합니다.",
        visualLead: "실제 구현과 이후 보강할 Inbox·transition guard·reconciliation을 서로 다른 lane으로 표시했습니다.",
      },
      frame: [
        { label: "상황", text: "외부 결제와 내부 예약의 부분 성공", tone: "context" },
        { label: "대처", text: "Transaction ID·상태별 cancel/refund", tone: "decision" },
        { label: "후속", text: "Inbox·dedup·reconciliation 제안", tone: "outcome" },
      ],
      details: [
        { kind: "implementation", label: "IMPLEMENTED", items: [
          { title: "Payment correlation", text: "local transaction ID로 PaymentHistory·PaymentMethod와 provider event를 연결했습니다.", verdict: "selected" },
          { title: "Compensation", text: "예약 실패 시 현재 PaymentIntent 상태에 따라 cancel/refund했습니다.", verdict: "selected" },
        ] },
        { kind: "constraints", label: "OBSERVED", items: [
          { text: "외부 provider와 내부 DB는 하나의 atomic transaction으로 묶을 수 없습니다." },
          { text: "Webhook은 중복·지연·역순 도착할 수 있습니다." },
        ] },
        { kind: "proposal", label: "PROPOSED", items: [
          { title: "Webhook Inbox", text: "provider event ID를 unique key로 저장하고 처리 결과를 남깁니다.", verdict: "proposed" },
          { title: "Reconciliation", text: "provider 상태와 내부 원장을 주기적으로 대조하고 운영자 복구 경로를 둡니다.", verdict: "proposed" },
        ] },
      ],
      visual: {
        kind: "compact-flow",
        title: "결제 상태 흐름과 복구 경계",
        lanes: [
          { label: "실제 구현", note: "IMPLEMENTED", tone: "decision", stages: [
            { label: "Checkout", detail: "Manual capture" }, { label: "Transaction ID", detail: "내부 이력 연결" }, { label: "예약 처리", detail: "성공·실패 분기", emphasis: "strong" }, { label: "Cancel·Refund", detail: "Provider 보상" }, { label: "완료 반영", detail: "내부 자산 변경", emphasis: "outcome" },
          ] },
          { label: "후속 설계", note: "PROPOSED", tone: "proposed", stages: [
            { label: "Webhook Inbox", detail: "Event 기록" }, { label: "Idempotency", detail: "중복 차단" }, { label: "Transition Guard", detail: "역순 상태 방지", emphasis: "strong" }, { label: "Reconciliation", detail: "불일치 대조·복구" },
          ] },
        ],
        caption: "외부 결제 성공 응답을 업무 완료로 간주하지 않고 provider event와 내부 상태의 전이를 추적합니다.",
      },
      operation: ["취소·환불 요청과 완료 상태를 분리했습니다.", "완료 event 이후에만 마일리지·이용권 상태를 변경했습니다."],
      limits: ["Inbox·Outbox·reconciliation을 실제 구현했다고 주장하지 않습니다.", "결제 불일치 0건이나 exactly-once를 주장하지 않습니다."],
      evidence: [
        { project: "Memento AI", scope: "Stripe manual-capture 선결제", ownership: "led", status: "historical", relation: "primary", text: "Checkout 선결제를 구축하고 transaction ID로 내부 이력과 provider event를 연결했습니다.", claimIds: ["career.memento-stripe-prepayment"] },
        { project: "Memento AI", scope: "취소·환불 상태 전이", ownership: "contributed", status: "historical", relation: "primary", text: "예약 실패 보상과 환불 완료 이후 내부 상태 변경을 담당 범위에서 보완했습니다.", claimIds: ["career.memento-payment"] },
      ],
      claimCeiling: { allowed: ["Stripe 선결제 직접 구축", "cancel·refund 상태 흐름", "미구현 후속 설계 분리 제안"], forbidden: ["Inbox·reconciliation 실제 구현", "결제 불일치 0건", "공유 결제 domain 전체 단독 구축"] },
      jdFit: { matches: ["결제와 내부 업무 사이의 partial failure 이해", "외부 event와 내부 이력 correlation", "검토·신청 상태와 결제 상태의 분리 설계"], boundary: "피노키오랩의 실제 결제·신청 정책은 확인 전이며, 위 구조를 그대로 적용해야 한다는 제안은 아닙니다." },
      claimIds: ["career.memento-stripe-prepayment", "career.memento-payment"],
    },
    {
      no: "04",
      title: "요청 값이 아니라 server 인증 상태가 데이터 접근 범위를 결정하게 했습니다",
      caseMode: "cross-project-pattern",
      layers: ["Backend", "Operations"],
      status: { label: "구현·진행 중 범위 분리", tone: "in-progress" },
      outcomeLine: "역할과 현재 작업 범위를 분리하고, 권한 검증을 통과한 server state만 query scope로 사용했습니다.",
      compositionCaption: "SSO session은 운영 범위이고 지점 권한 경계는 진행 중인 구현입니다. 전체 인증 시스템 단독 구축을 주장하지 않습니다.",
      narrative: {
        context: "여러 서비스의 SSO session과 지점별 데이터 접근이 함께 필요한 운영 backend 사례입니다.",
        problem: "client header만 믿고 작업 범위를 정하면 사용자가 속하지 않은 지점의 데이터를 조회하거나 잘못된 범위가 session에 남을 수 있습니다.",
        actions: ["사용자의 소속 범위와 현재 작업 범위를 분리했습니다.", "작업 범위 변경은 권한 검증 API를 통해서만 허용했습니다.", "server auth state에서 query scope를 만들고 미선택·권한 밖 접근을 409·403으로 나눴습니다."],
        resultLabel: "현재 책임 범위",
        result: "SSO session 정책과 duplicate login E2E를 담당했고, 지점 권한 경계는 구현과 회귀 시나리오 보강을 진행하고 있습니다.",
        visualLead: "인증된 사용자에게 역할만 부여하지 않고 허용 범위와 현재 작업 범위를 각각 확인합니다.",
      },
      frame: [
        { label: "상황", text: "여러 service·지점에 걸친 session과 query scope", tone: "context" },
        { label: "대처", text: "Role·allowed scope·working scope 분리", tone: "decision" },
        { label: "기여", text: "Server-owned scope와 409·403 error contract", tone: "outcome" },
      ],
      details: [
        { kind: "decision", label: "SERVER OWNERSHIP", items: [{ text: "client가 보낸 지점 ID를 직접 query 조건으로 사용하지 않고 server auth state에서 현재 작업 범위를 읽습니다." }] },
        { kind: "implementation", label: "STATE TRANSITION", items: [{ text: "작업 범위 전환은 사용자의 허용 범위를 확인한 전용 API에서만 수행합니다." }] },
        { kind: "implementation", label: "ERROR CONTRACT", items: [{ text: "범위 미선택은 409, 권한 밖 접근은 403으로 구분해 client가 복구 방식을 선택하게 합니다." }] },
        { kind: "constraints", label: "BOUNDARY", items: [{ text: "지점 권한 관련 전체 회귀 시나리오는 아직 보강 중입니다." }] },
      ],
      visual: {
        kind: "compact-flow",
        title: "Role과 current working scope를 분리한 authorization",
        chart: `flowchart TD
  user["Authenticated User"] --> session[("Server Auth State")]
  session --> role{"Role + Allowed Scope"}
  role -->|valid| working["Current Working Scope"]
  role -->|not selected| e409["409 · scope required"]
  role -->|forbidden| e403["403 · access denied"]
  working --> query["Scoped Query"]
  query --> history[("Access · Change History")]
  classDef base fill:#edf3ff,stroke:#2854d7,color:#102044
  classDef strong fill:#f4efff,stroke:#6d42c7,stroke-width:2px,color:#102044
  classDef outcome fill:#eaf8f2,stroke:#087f5b,stroke-width:2px,color:#102044
  classDef failure fill:#fff3e4,stroke:#b45309,stroke-dasharray:5 4,color:#102044
  class user,session,working,query base
  class role strong
  class history outcome
  class e409,e403 failure`,
        lanes: [{ label: "Authorization", tone: "decision", stages: [
          { label: "Identity", detail: "Authenticated user" }, { label: "Allowed Scope", detail: "Role·membership", emphasis: "strong" }, { label: "Working Scope", detail: "Server state" }, { label: "Scoped Query", detail: "History", emphasis: "outcome" },
        ] }],
        caption: "신원 확인 뒤에도 allowed scope와 current working scope를 따로 검증해 데이터 접근 범위를 server가 소유합니다.",
      },
      operation: ["duplicate login E2E와 session 정책을 검증했습니다.", "권한 경계 변경 시 기존 공개 API contract의 호환성을 함께 확인합니다."],
      limits: ["지점 권한의 전체 회귀 검증 완료를 주장하지 않습니다.", "전체 인증 시스템 단독 구축을 주장하지 않습니다."],
      evidence: [
        { project: "Multi-service SSO", scope: "Session policy·duplicate login", ownership: "contributed", status: "verified", relation: "primary", text: "공통 session 정책과 duplicate login E2E를 담당했습니다.", claimIds: ["centurion.sso-session"] },
        { project: "병원 운영 backend", scope: "Branch access boundary", ownership: "owned", status: "in-progress", relation: "pattern-instance", text: "소속 지점과 현재 작업 지점을 분리하고 server auth state가 query scope를 결정하도록 구현 중입니다.", claimIds: ["nexus.branch-access-boundary"] },
      ],
      claimCeiling: { allowed: ["SSO session 정책·duplicate login E2E 담당", "server-owned working scope", "진행 중인 회귀 보강 명시"], forbidden: ["전체 인증 시스템 단독 구축", "모든 권한 회귀 검증 완료", "공공 인증 체계 경험으로 확대"] },
      jdFit: { matches: ["다기관·다역할 업무의 접근 범위 설계", "민감 데이터 query scope의 server ownership", "오류 contract와 변경 이력의 분리"], boundary: "공공기관·권리자 업무의 실제 role matrix와 audit requirement는 확인이 필요합니다." },
      claimIds: ["centurion.sso-session", "nexus.branch-access-boundary"],
    },
    {
      no: "05",
      title: "코딩 에이전트가 아니라 검증 근거가 다음 구현을 결정하게 했습니다",
      caseMode: "cross-project-pattern",
      layers: ["Backend", "Product", "AI", "Operations"],
      status: { label: "회사 적용 + 공개 prototype", tone: "verified" },
      outcomeLine: "결정과 검증 근거를 누적하고, 통과한 contract·test·quality gate만 다음 개발 사이클에 남겼습니다.",
      compositionCaption: "제품별 운영은 리드, Backend Template은 직접 구축, 회사 AX는 설계 참여, Paperthin은 개인 open-source 직접 설계 범위입니다.",
      narrative: {
        context: "coding agent를 여러 제품 개발에 사용하면서 대화 속 판단과 검증 책임이 쉽게 사라지는 문제를 다뤘습니다.",
        problem: "이미 존재하는 codebase와 구현량을 진척도로 취급하면 잘못된 구조도 다음 pass에 관성으로 남습니다. 담당자가 바뀌면 왜 이 결정을 했는지도 다시 설명해야 했습니다.",
        actions: ["기획·디자인·개발·QA·release의 결정을 Decision·SPEC·Work Package·ADR·evidence로 연결했습니다.", "Backend Template에 source-of-truth routing·runbook·검증 명령·automation skill을 내장했습니다.", "Paperthin에서는 real-surface QA에서 얻은 lesson·anti-pattern·quality gate만 clean v0에 이월하도록 설계했습니다.", "keep·restart·release 판단은 사람에게 남기고 agent는 탐색·반복 구현·근거 정리를 맡겼습니다."],
        resultLabel: "남은 상태",
        result: "담당자가 바뀌어도 제품·architecture 결정을 복원하고, 다음 작업이 기존 코드의 양이 아니라 현재 evidence에서 출발하도록 했습니다.",
        visualLead: "회사 제품 개발의 공유 맥락과 Paperthin의 evidence-first cycle을 하나의 판단 원칙으로 묶었습니다.",
      },
      frame: [
        { label: "상황", text: "대화에 흩어지는 결정·검증·인수인계 맥락", tone: "context" },
        { label: "대처", text: "Decision→SPEC→Work Package→evidence→human gate", tone: "decision" },
        { label: "기여", text: "검증된 계약만 다음 cycle에 남기는 구조", tone: "outcome" },
      ],
      details: [
        { kind: "implementation", label: "COMPANY WORKFLOW", items: [{ text: "제품별 Decision·SPEC·Work Package·QA·release gate 적용·운영을 리드했습니다." }, { text: "Backend Template의 agent context·ADR·runbook·automation skill을 직접 구축했습니다." }] },
        { kind: "implementation", label: "PAPERTHIN", items: [{ text: "Complete vertical build를 real-surface QA에 통과시켜 lesson·anti-pattern·quality gate를 추출했습니다." }, { text: "통과한 contract·schema·test·gate와 negative corpus만 clean v0의 입력으로 넘겼습니다." }] },
        { kind: "decision", label: "HUMAN GATE", items: [{ text: "keep·restart·release와 architecture·제품 품질 판단은 사람이 소유합니다." }] },
        { kind: "constraints", label: "BOUNDARY", items: [{ text: "회사 AX 전환 완료나 AI의 자율적인 제품 판단·release를 주장하지 않습니다." }] },
      ],
      visual: {
        kind: "ax-workflow",
        title: "결정에서 검증 근거까지 이어지는 agent-assisted 개발 체계",
        stages: [
          { role: "human", label: "문제 정의", items: ["기획·디자인", "우선순위"] },
          { role: "contract", label: "Decision·SPEC", items: ["Acceptance", "Ownership"] },
          { role: "ai", label: "Human + Agent", items: ["탐색", "반복 구현"] },
          { role: "system", label: "Test·Evidence", items: ["Contract", "Real-surface QA"] },
          { role: "human", label: "Human Gate", items: ["Keep·Restart", "Release"] },
        ],
        evidenceBands: [
          { label: "회사 제품 개발", text: "Decision·SPEC·Work Package·ADR·QA·release evidence를 누적해 사람과 agent가 같은 맥락을 읽게 했습니다." },
          { label: "Paperthin", text: "기존 codebase가 아니라 QA로 얻은 lesson·anti-pattern·quality gate만 다음 clean v0에 남깁니다." },
        ],
        caption: "Agent는 필요한 맥락과 반복 실행을 준비하고, architecture·제품 품질·release 판단은 사람이 소유합니다.",
      },
      operation: ["결정·작업·검증·release 근거의 source-of-truth를 분리해 누적합니다.", "실패 경로는 버리지 않고 negative corpus로 남겨 다음 acceptance criteria에 사용합니다."],
      limits: ["회사 AX 전환 완료나 전사 자동화를 주장하지 않습니다.", "AI가 제품·architecture·release 판단을 자율 수행한다고 표현하지 않습니다."],
      evidence: [
        { project: "제품 개발 운영", scope: "Decision→release context", ownership: "led", status: "verified", relation: "primary", text: "기획·디자인·개발·QA·release의 결정과 상태를 실행 맥락에 누적해 제품별 운영에 적용했습니다.", claimIds: ["mediness.product-operations", "mediness.product-development-coordination-leverage"] },
        { project: "Paperthin", scope: "Evidence-first agent cycle", ownership: "owned", status: "verified", relation: "corroborating", text: "검증된 lesson·anti-pattern·quality gate만 다음 clean v0에 남기는 open-source agent cycle을 설계·공개했습니다.", claimIds: ["paperthin.evidence-first-agent-cycle"] },
      ],
      claimCeiling: { allowed: ["제품별 agent-assisted workflow 적용·운영 리드", "Backend Template·agent context 직접 구축", "Paperthin evidence-first cycle 직접 설계·공개"], forbidden: ["회사 AX 전환 완료", "AI의 자율 제품 판단·release", "조직 생산성 정량 배수"] },
      jdFit: { matches: ["AI 도구를 실제 개발·검증 과정에 활용", "변경 가능한 요구를 source-of-truth와 acceptance criteria로 관리", "담당자 변경에도 복원 가능한 engineering context"], boundary: "피노키오랩의 현재 개발 process를 대체하는 제안이 아니라, 팀의 실제 병목을 확인한 뒤 필요한 부분만 적용할 수 있는 경험입니다." },
      claimIds: ["career.coding-agent-usage", "mediness.product-operations", "mediness.product-development-coordination-leverage", "be-template.agent-context", "paperthin.evidence-first-agent-cycle"],
    },
  ] satisfies PortfolioOutcome[]).sort((left, right) => left.no.localeCompare(right.no)),
  workSystem: {
    title: "사람이 판단하고, agent와 자동 검증이 근거를 준비합니다",
    summary: [
      "기획·디자인·개발·QA·release의 결정과 진행 상태를 같은 실행 맥락에 쌓아 사람과 coding agent가 동일한 제품·architecture 기준에서 일하게 했습니다.",
      "구현량이 아니라 contract·test·실측 evidence를 다음 행동의 입력으로 삼고 최종 판단은 사람이 소유합니다.",
    ],
    foundation: ["Decision·SPEC", "Work Package·ADR", "Backend contract·runbook", "Test·QA evidence·release gate"],
    lanes: [
      { kind: "human", label: "Human Judgment", items: ["문제 정의", "Architecture", "Data ownership", "Keep·Restart", "QA·release 승인"] },
      { kind: "ai", label: "AI Execution", items: ["Codebase·문서 탐색", "영향 범위 정리", "대안 비교", "반복 구현", "문서 갱신"] },
      { kind: "automated", label: "Automated Verification", items: ["Contract·schema", "Static·type", "Integration test", "Real-surface QA", "Release evidence"] },
    ],
    qualityLab: {
      title: "구현량 대신 통과한 contract와 실패 근거를 남겼습니다",
      description: "형식과 회귀 조건은 자동으로 확인하고, 실제 surface의 동작과 로그를 대조한 뒤 다음 cycle과 release 여부는 사람이 판단합니다.",
      automated: ["Schema·type", "Transaction·API test", "회귀 조건"],
      measurement: ["실제 surface 확인", "상태·로그 대조", "Negative corpus"],
      human: ["문제 재정의", "Keep·Restart", "Release decision"],
      boundary: "자동 검증과 agent 제안은 제품의 정답이 아닙니다. architecture와 최종 release는 사람이 결정합니다.",
      claimIds: ["be-template.agent-context", "paperthin.evidence-first-agent-cycle"],
    },
    evidence: [
      { project: "Backend Template", scope: "Shared architecture·agent context", ownership: "owned", status: "verified", relation: "primary", text: "팀과 agent가 같은 architecture·작업·검증 기준을 읽도록 foundation과 context를 직접 구축했습니다.", claimIds: ["be-template.backend-standard", "be-template.agent-context"] },
      { project: "제품 개발 운영", scope: "Decision→release context", ownership: "led", status: "verified", relation: "corroborating", text: "기획·디자인·개발·QA·release의 결정과 상태를 실행 맥락으로 누적해 제품별 운영에 적용했습니다.", claimIds: ["mediness.product-operations", "mediness.product-development-coordination-leverage"] },
      { project: "Paperthin", scope: "Evidence-first cycle", ownership: "owned", status: "verified", relation: "corroborating", text: "검증된 계약과 실패 근거만 다음 clean v0에 남기는 open-source agent cycle을 설계·공개했습니다.", claimIds: ["paperthin.evidence-first-agent-cycle"] },
    ],
    limits: ["AI가 제품·architecture·release 판단을 대신한다고 표현하지 않습니다.", "AI 도입으로 인한 조직 생산성 배수나 정량 성과를 주장하지 않습니다."],
    claimIds: ["be-template.backend-standard", "be-template.agent-context", "mediness.product-operations", "mediness.product-development-coordination-leverage", "paperthin.evidence-first-agent-cycle"],
  },
} satisfies TailoredPortfolio;
