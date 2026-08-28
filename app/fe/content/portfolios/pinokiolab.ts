import type { PortfolioOutcome, TailoredPortfolio } from "./types";

export const PINOKIOLAB_PORTFOLIO = {
  slug: "pinokiolab",
  companyName: "피노키오랩",
  position: "Backend Engineer (FastAPI)",
  status: "approved",
  visibility: "public",
  updatedAt: "2026-08-28",
  introduction: [
    "AI 결과를 실제 업무로 연결할 때 필요한 상태·실패·판단 경계를 FastAPI backend로 설계한 경험을 정리했습니다.",
    "FastAPI·SQLAlchemy 실행 기준, AI application 전달, 품질 검증, 결제·권한 사례를 실제 구현·진행 중·후속 설계 범위로 나눠 보여드립니다.",
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
      title: "FastAPI async 환경에서 transaction과 AsyncSession의 소유권을 명확히 했습니다",
      caseMode: "cross-project-pattern",
      layers: ["Backend", "Operations"],
      status: { label: "직접 설계·구축", tone: "verified" },
      outcomeLine:
        "Service method를 transaction boundary로 삼고, 하나의 transaction은 하나의 asyncio task와 AsyncSession이 소유하도록 실행 규칙을 구성했습니다.",
      compositionCaption:
        "조직 표준 template의 직접 구축 범위와 운영 제품에 적용한 판단을 함께 보여주되, 모든 사내 service가 전환됐다고 주장하지 않습니다.",
      narrative: {
        context:
          "2~3명의 backend engineer가 여러 제품을 담당했고, FE를 포함한 여러 직군도 coding agent로 backend 구현에 참여하기 시작했습니다.",
        problem:
          "FastAPI의 Depends(get_session) pattern은 request마다 session을 주입하기에 명료하지만, 여러 Service·Repository를 지나는 구조에서는 method마다 session 인자가 반복되고 commit 책임도 호출자가 다시 정해야 했습니다. 특히 mutable한 AsyncSession이 child task에 암묵적으로 공유되면 commit·rollback 순서와 실패 책임이 불명확해질 수 있었습니다.",
        actions: [
          "Java/Spring에서 익힌 명시적 계층·의존성·transaction boundary 원칙을 FastAPI에 적용했습니다. DI는 구현체 조립을, Service Layer는 업무 흐름과 transaction 소유권을 맡게 했습니다.",
          "@transactional에서 REQUIRED는 현재 transaction 참여, REQUIRES_NEW는 새 connection·AsyncSession 실행, NESTED는 같은 connection의 SAVEPOINT로 정의했습니다.",
          "ContextVar에 현재 AsyncSession·TxState를 bind하고, 무상태 SessionProxy가 Repository의 DB 접근을 위임하게 했습니다.",
          "ContextVar를 동시성 안전장치로 보지 않았습니다. child task가 같은 AsyncSession을 사용하면 owner-task guard가 즉시 실패시키도록 했습니다.",
          "병렬 DB 처리가 필요하면 task별 transaction·데이터 가시성·실패 복구·connection 비용을 먼저 결정하도록 ADR·runbook·agent context에 규칙을 남겼습니다.",
        ],
        resultLabel: "결과",
        result:
          "Service·Repository signature에는 업무 입력만 남기고, 중첩 호출의 transaction 동작과 session 종료 책임은 decorator 한곳에서 관리했습니다. 같은 transaction을 암묵적으로 병렬 실행하지 못하게 해 오류 가능성을 줄이고, 병렬화가 필요한 지점에서는 비용과 복구 방식을 먼저 설계하게 했습니다.",
        visualLead:
          "Service가 선언한 propagation에 따라 session을 생성·참여·분리하고 Repository가 현재 task의 session을 resolve하는 흐름입니다.",
      },
      frame: [
        { label: "상황", text: "AsyncSession의 암묵적 공유와 transaction 책임", tone: "context" },
        { label: "판단", text: "1 transaction = 1 task = 1 AsyncSession", tone: "decision" },
        { label: "기여", text: "fail-fast guard·propagation·통합 검증", tone: "outcome" },
      ],
      details: [
        {
          kind: "decision",
          label: "TRANSACTION OWNERSHIP",
          items: [
            { title: "@transactional Service", text: "업무 단위의 propagation과 commit·rollback·cleanup을 소유합니다.", verdict: "selected" },
            { title: "Repository", text: "현재 session에서 query·flush만 수행하고 transaction을 닫지 않습니다.", verdict: "selected" },
          ],
        },
        {
          kind: "implementation",
          label: "RESOURCE BINDING",
          items: [
            { title: "ContextVar", text: "transaction boundary의 AsyncSession·TxState를 현재 asyncio task에 bind하고 종료 시 reset합니다." },
            { title: "SessionProxy", text: "무상태 proxy가 현재 session을 resolve해 Service·Repository의 반복적인 session 인자를 없앴습니다." },
          ],
        },
        {
          kind: "implementation",
          label: "PROPAGATION",
          items: [
            { title: "REQUIRED", text: "기존 transaction에 참여하고, 없으면 새 root transaction을 시작합니다." },
            { title: "REQUIRES_NEW", text: "outer를 중단하고 새 connection·AsyncSession에서 독립 실행한 뒤 재개합니다." },
            { title: "NESTED", text: "같은 connection에 SAVEPOINT를 만들고 inner 영역만 rollback할 수 있게 합니다." },
          ],
        },
        {
          kind: "implementation",
          label: "SAFETY",
          items: [
            { title: "Owner-task guard", text: "ContextVar가 child task에 복제돼도 동일 transaction의 AsyncSession 접근을 fail-fast합니다." },
            { title: "Parallel DB decision", text: "병렬화 전 task별 transaction·데이터 가시성·실패 복구·connection 비용을 먼저 결정합니다." },
            { title: "Integration test", text: "CancelledError rollback·connection cleanup·propagation·read-only·isolation을 검증했습니다." },
          ],
        },
      ],
      visual: {
        kind: "compact-flow",
        title: "Transaction policy와 AsyncSession resource binding",
        chart: `flowchart TB
  router["FastAPI Router<br/>domain input"] --> service["@transactional Service<br/>transaction policy"]
  service --> required["REQUIRED<br/>join · create"]
  service --> requiresNew["REQUIRES_NEW<br/>new connection · session"]
  service --> nested["NESTED<br/>SAVEPOINT"]
  service --> context["ContextVar<br/>AsyncSession · TxState"]
  context --> proxy["SessionProxy<br/>owner-task guard"]
  proxy --> repository["Repository<br/>SQL · flush"]
  repository --> database["SQLAlchemy 2.0 async<br/>PostgreSQL / MySQL"]
  classDef base fill:#ffffff,stroke:#a9b5c6,color:#102044
  classDef strong fill:#edf3ff,stroke:#2854d7,stroke-width:2px,color:#102044
  class router,required,requiresNew,nested,context,proxy,repository,database base
  class service strong`,
        lanes: [
          {
            label: "Transaction resource binding",
            note: "SESSION 인자 반복 없음",
            tone: "context",
            stages: [
              { label: "FastAPI Router", detail: "domain input" },
              { label: "@transactional Service", detail: "create·join · commit·rollback", emphasis: "strong" },
              { label: "ContextVar → SessionProxy", detail: "1 tx · 1 task · 1 session" },
              { label: "Repository → DB", detail: "current session resolve · SQL·flush" },
            ],
          },
        ],
        loadBehavior: {
          title: "중첩 호출에서 달라지는 propagation 경계",
          description:
            "Service method는 필요한 propagation만 선언하고 decorator가 transaction 참여·분리·SAVEPOINT를 처리합니다.",
          headers: { situation: "구분", behavior: "설계한 동작", watch: "실패 경계" },
          rows: [
            { situation: "REQUIRED", behavior: "기존 transaction에 참여하고, 없으면 새 root transaction 시작", watch: "같은 session · outer와 함께 rollback" },
            { situation: "REQUIRES_NEW", behavior: "outer를 중단하고 새 connection·AsyncSession에서 실행", watch: "독립 commit/rollback · 종료 후 outer 재개" },
            { situation: "NESTED", behavior: "같은 session·connection에 SAVEPOINT 생성", watch: "inner 부분 rollback · 활성 outer 필수" },
            { situation: "TASK GUARD", behavior: "child task의 동일 AsyncSession 접근을 fail-fast", watch: "task별 boundary·가시성·복구·pool 비용 검토" },
          ],
        },
        caption:
          "Service는 session 인자를 받지 않고 transaction 정책만 선언합니다. Decorator가 transaction과 session 수명을 관리하고, 동일 transaction의 AsyncSession은 소유 task에서만 사용합니다.",
      },
      operation: [
        "tx.enter·commit·rollback·cleanup event를 구조화 로그로 남겨 실행 sequence를 확인합니다.",
        "ADR·runbook에 child task 제약과 REQUIRES_NEW의 추가 connection·pool 비용을 기록했습니다.",
      ],
      limits: [
        "모든 사내 service가 이 template으로 전환됐다고 주장하지 않습니다.",
        "Depends(get_session)을 잘못된 방식으로 평가하거나 ContextVar만으로 성능·무결성이 보장된다고 표현하지 않습니다.",
        "제한한 것은 동일 transaction 내부의 DB 병렬 실행이며, 요청 간 동시성과 transaction 밖의 외부 I/O까지 직렬화한 구조는 아닙니다.",
      ],
      evidence: [
        {
          project: "Backend Template",
          scope: "FastAPI·SQLAlchemy 실행 기준",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "@transactional·ContextVar·SessionProxy와 owner-task guard, propagation·rollback·cleanup test를 포함한 실행 기준을 직접 설계·구축했습니다.",
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
        allowed: ["조직 표준 FastAPI template 직접 구축", "@transactional·ContextVar·SessionProxy resource binding", "REQUIRED·REQUIRES_NEW·NESTED(SAVEPOINT)", "1 transaction·1 task·1 AsyncSession", "owner-task guard·rollback·cleanup integration test"],
        forbidden: ["전사 모든 service 전환 완료", "Depends(get_session)이 잘못된 방식이라는 주장", "NESTED를 독립 transaction으로 표현", "child task session 안전 공유", "성능·개발 시간 정량 개선"],
      },
      jdFit: {
        matches: ["Python·FastAPI backend 설계·운영", "SQLAlchemy transaction propagation·AsyncSession lifecycle", "작은 팀에서 반복 가능한 개발 기준 구축"],
        boundary: "공공 SI·secure coding 경험을 대신하지는 않으며, 해당 acceptance criteria는 입사 후 확인해야 할 영역입니다.",
      },
      claimIds: ["be-template.fastapi-sqlalchemy-standard", "be-template.backend-standard", "be-template.team-leverage", "be-template.agent-context", "thready.backend-rebuild"],
    },
    {
      no: "02",
      title: "원장 변경이 늦거나 중복 전달돼도 AI application이 최신 상태로 수렴하게 했습니다",
      caseMode: "single-system",
      layers: ["Backend", "AI", "Operations"],
      status: { label: "운영 구현", tone: "verified" },
      outcomeLine:
        "제품 backend의 원장 변경을 Outbox와 같은 transaction에 남기고, AI application은 중복·지연된 delivery를 version으로 판단하게 했습니다.",
      compositionCaption:
        "제품 backend와 AI application의 실제 구현 범위입니다. exactly-once나 무중단을 주장하지 않습니다.",
      narrative: {
        context: "제품 정책과 원장, AI 생성 lifecycle을 독립 application·DB로 분리한 운영 제품 사례입니다.",
        problem: "제품 원장 commit과 다른 application으로의 전달은 하나의 transaction으로 묶을 수 없습니다. worker가 중단되거나 이전 version의 event가 늦게 도착하면 AI 쪽 replica가 과거 상태로 되돌아갈 수 있었습니다.",
        actions: [
          "제품 원장 변경과 Outbox row를 같은 transaction에 기록했습니다.",
          "relay lease·attempt_count로 Outbox 전달 작업의 claim과 중단 뒤 재점유를 통제했습니다.",
          "delivery version fence와 멱등 consumer로 늦거나 중복된 원장 event의 반영 여부를 결정했습니다.",
          "retry 상한과 terminal failure를 보존해 운영자가 실패 상태를 확인하게 했습니다.",
        ],
        resultLabel: "결과",
        result: "전달이 실패해도 제품 원장을 기준으로 다시 수렴하고, 어느 event가 어디서 멈췄는지 확인해 재처리할 수 있는 상태를 남겼습니다.",
        visualLead: "원장 변경과 전달 의도를 같은 transaction에 기록한 뒤 event 전달은 복구 가능한 relay worker 경계로 분리했습니다.",
      },
      frame: [
        { label: "상황", text: "Product DB와 AI DB를 가로지르는 비동기 작업", tone: "context" },
        { label: "대처", text: "Outbox·relay lease·attempt_count·version fence", tone: "decision" },
        { label: "기여", text: "재처리 가능한 상태와 최신 원장 보호", tone: "outcome" },
      ],
      details: [
        { kind: "decision", label: "OWNERSHIP", items: [
          { title: "Product backend", text: "제품 정책·원장·사용자에게 보이는 상태를 소유합니다." },
          { title: "AI application", text: "생성 lifecycle·실행 상태와 제품 원장의 local replica를 소유합니다." },
        ] },
        { kind: "implementation", label: "DELIVERY", items: [
          { title: "Outbox", text: "원장 변경과 전달 의도를 같은 transaction에 기록했습니다." },
          { title: "Relay lease·attempt_count", text: "Outbox 전달 작업의 현재 claim과 중단 뒤 재점유를 구분했습니다." },
        ] },
        { kind: "implementation", label: "STALE WRITE", items: [
          { title: "Version fence", text: "늦게 도착한 이전 원장 event가 최신 replica를 덮지 않게 했습니다." },
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
          aiRuntime: { label: "FastAPI AI Application", database: "AI PostgreSQL", owns: ["Generation lifecycle", "Generation attempt state", "Product replica"] },
        },
        transaction: { label: "SAME TRANSACTION", items: ["Owner mutation", "Version update"], outbox: "Outbox row" },
        delivery: { worker: "Outbox relay worker", retry: "relay lease · attempt_count · retry", transport: "Authenticated HTTP", authentication: "Service credential" },
        versionFence: { rule: "incoming version > last applied", outcomes: ["newer → apply", "duplicate·stale → no-op + history"] },
        verificationRail: ["STG migration rehearsal", "Row count·MD5", "FK orphan", "Generation API E2E"],
        caption: "Product backend와 AI application은 모두 운영 중이며, 하단 검증 rail만 migration 전환 검증 범위입니다.",
      },
      operation: ["terminal failure와 retry 상태를 구조화 로그로 확인합니다.", "migration 전 STG 실데이터 rehearsal과 API E2E를 수행했습니다."],
      limits: ["Exactly-once·무중단·무유실을 주장하지 않습니다.", "AI application 전체를 단독 구축했다고 표현하지 않습니다."],
      evidence: [
        { project: "Thready", scope: "Product·AI application boundary", ownership: "owned", status: "verified", relation: "primary", text: "제품 원장과 AI 실행 상태의 ownership을 분리하고 delivery protocol을 구현했습니다.", claimIds: ["thready.ai-service-boundary", "thready.ai-replica-outbox"] },
        { project: "Thready", scope: "STG migration rehearsal", ownership: "owned", status: "verified", relation: "primary", text: "실데이터 migration을 row count·MD5·FK·API E2E로 검증했습니다.", claimIds: ["thready.ai-service-migration"] },
      ],
      claimCeiling: { allowed: ["독립 AI application·DB 운영", "Outbox·relay lease·attempt_count·version fence", "STG migration rehearsal"], forbidden: ["Exactly-once", "무중단·무유실", "AI application 전체 단독 구축"] },
      jdFit: { matches: ["제품 원장과 AI 실행 서비스 사이의 ownership 분리", "원장 event의 중복·지연·역순 delivery 통제", "운영 상태와 재처리 경로 설계"], boundary: "피노키오랩의 실제 model contract와 검토 workflow는 입사 후 domain 전문가와 함께 정의할 영역입니다." },
      claimIds: ["thready.ai-service-boundary", "thready.ai-service-migration", "thready.ai-replica-outbox"],
    },
    {
      no: "04",
      title: "외부 결제·알림의 요청과 완료를 상태·이력으로 추적했습니다",
      caseMode: "single-system",
      layers: ["Backend", "Product", "Operations"],
      status: { label: "구현 범위 + 후속 설계 분리", tone: "in-progress" },
      outcomeLine: "선결제·취소·환불과 즉시·예약 알림을 요청 성공이 아니라 완료 상태와 이력으로 관리했습니다.",
      compositionCaption: "IMPLEMENTED는 실제 경력이고 PROPOSED는 같은 문제를 다시 맡을 때 보강할 미구현 설계입니다.",
      narrative: {
        context: "외부 결제와 알림 provider의 완료 시점이 내부 예약·안내 상태와 다른 backend 사례입니다.",
        problem: "외부 요청이 성공해도 실제 결제 취소·환불이나 예약 알림이 완료됐다고 볼 수 없었고, 일부 단계만 성공한 상태를 추적해야 했습니다.",
        actions: ["local transaction ID로 내부 이력과 provider event를 연결했습니다.", "예약 실패 시 PaymentIntent 상태에 따라 cancel 또는 refund했습니다.", "환불 요청과 완료를 나누고 내부 자산 변경을 완료 transition 뒤로 옮겼습니다.", "알림톡·이메일의 즉시/예약 발송과 Celery task 취소·재등록·발송 이력을 구현했습니다."],
        resultLabel: "결과",
        result: "결제 보상과 사용자 안내가 어디까지 처리됐는지 이력으로 확인할 수 있게 했고, 미구현 복구안은 성과와 분리해 제안합니다.",
        visualLead: "결제·알림의 실제 구현과 이후 보강할 Inbox·reconciliation을 서로 다른 lane으로 표시했습니다.",
      },
      frame: [
        { label: "상황", text: "외부 결제·알림과 내부 상태의 부분 성공", tone: "context" },
        { label: "대처", text: "Transaction ID·task lifecycle·발송 이력", tone: "decision" },
        { label: "후속", text: "Inbox·dedup·reconciliation 제안", tone: "outcome" },
      ],
      details: [
        { kind: "implementation", label: "IMPLEMENTED", items: [
          { title: "Payment correlation", text: "local transaction ID로 PaymentHistory·PaymentMethod와 provider event를 연결했습니다.", verdict: "selected" },
          { title: "Compensation", text: "예약 실패 시 현재 PaymentIntent 상태에 따라 cancel/refund했습니다.", verdict: "selected" },
        ] },
        { kind: "implementation", label: "NOTIFICATION LIFECYCLE", items: [
          { title: "Immediate·scheduled send", text: "다국어 알림톡·이메일의 즉시 발송과 예약 발송을 구현했습니다.", verdict: "selected" },
          { title: "Task·history", text: "예약 변경 시 Celery task를 취소·재등록하고 발송 이력을 남겼습니다.", verdict: "selected" },
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
        title: "결제·알림의 상태 흐름과 복구 경계",
        lanes: [
          { label: "실제 구현", note: "IMPLEMENTED", tone: "decision", stages: [
            { label: "Checkout", detail: "Manual capture" }, { label: "Transaction ID", detail: "내부 이력 연결" }, { label: "예약 처리", detail: "성공·실패 분기", emphasis: "strong" }, { label: "Cancel·Refund", detail: "Provider 보상" }, { label: "완료 반영", detail: "내부 자산 변경", emphasis: "outcome" },
          ] },
          { label: "알림 구현", note: "IMPLEMENTED", tone: "delivery", stages: [
            { label: "즉시·예약 발송", detail: "알림톡·이메일" }, { label: "Task 변경", detail: "취소·재등록", emphasis: "strong" }, { label: "발송 이력", detail: "처리 상태 확인", emphasis: "outcome" },
          ] },
          { label: "후속 설계", note: "PROPOSED", tone: "proposed", stages: [
            { label: "Webhook Inbox", detail: "Event 기록" }, { label: "Idempotency", detail: "중복 차단" }, { label: "Transition Guard", detail: "역순 상태 방지", emphasis: "strong" }, { label: "Reconciliation", detail: "불일치 대조·복구" },
          ] },
        ],
        caption: "외부 요청 성공을 업무 완료로 간주하지 않고 결제 event와 알림 task의 처리 상태를 내부 이력에 연결합니다.",
      },
      operation: ["취소·환불 요청과 완료 상태를 분리했습니다.", "완료 event 이후에만 마일리지·이용권 상태를 변경했습니다.", "예약 알림 변경 시 기존 task를 취소하고 새 task와 발송 이력을 연결했습니다."],
      limits: ["Inbox·Outbox·reconciliation을 실제 구현했다고 주장하지 않습니다.", "결제 불일치 0건·exactly-once·알림 delivery 보장을 주장하지 않습니다."],
      evidence: [
        { project: "Memento AI", scope: "Stripe manual-capture 선결제", ownership: "led", status: "historical", relation: "primary", text: "Checkout 선결제를 구축하고 transaction ID로 내부 이력과 provider event를 연결했습니다.", claimIds: ["career.memento-stripe-prepayment"] },
        { project: "Memento AI", scope: "알림 lifecycle", ownership: "led", status: "historical", relation: "primary", text: "알림톡·이메일의 즉시/예약 발송과 Celery task 취소·재등록·발송 이력을 구현했습니다.", claimIds: ["career.memento-happycall-survey"] },
        { project: "Memento AI", scope: "취소·환불 상태 전이", ownership: "contributed", status: "historical", relation: "primary", text: "예약 실패 보상과 환불 완료 이후 내부 상태 변경을 담당 범위에서 보완했습니다.", claimIds: ["career.memento-payment"] },
      ],
      claimCeiling: { allowed: ["Stripe 선결제 직접 구축", "cancel·refund 상태 흐름", "알림 즉시·예약 발송과 task·이력", "미구현 후속 설계 분리 제안"], forbidden: ["Inbox·reconciliation 실제 구현", "결제 불일치 0건", "알림 delivery 보장", "공유 결제 domain 전체 단독 구축"] },
      jdFit: { matches: ["결제·알림과 내부 업무 사이의 partial failure 이해", "외부 event·task와 내부 이력 correlation", "검토·신청 상태와 결제 상태의 분리 설계"], boundary: "피노키오랩의 실제 결제·알림 정책은 확인 전이며, 위 구조를 그대로 적용해야 한다는 제안은 아닙니다." },
      claimIds: ["career.memento-stripe-prepayment", "career.memento-payment", "career.memento-happycall-survey"],
    },
    {
      no: "05",
      title: "서버 인증 상태가 데이터 접근 범위를 결정하도록 권한 경계를 재구성하고 있습니다",
      caseMode: "cross-project-pattern",
      layers: ["Backend", "Operations"],
      status: { label: "구현·진행 중 범위 분리", tone: "in-progress" },
      outcomeLine: "역할과 현재 작업 범위를 분리하고, 권한 검증을 통과한 server state만 query scope로 사용하도록 재구성하고 있습니다.",
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
  classDef base fill:#edf3ff,stroke:#2854d7,color:#102044
  classDef strong fill:#f4efff,stroke:#6d42c7,stroke-width:2px,color:#102044
  classDef failure fill:#fff3e4,stroke:#b45309,stroke-dasharray:5 4,color:#102044
  class user,session,working,query base
  class role strong
  class e409,e403 failure`,
        lanes: [{ label: "Authorization", tone: "decision", stages: [
          { label: "Identity", detail: "Authenticated user" }, { label: "Allowed Scope", detail: "Role·membership", emphasis: "strong" }, { label: "Working Scope", detail: "Server state" }, { label: "Scoped Query", detail: "Server-owned scope", emphasis: "outcome" },
        ] }],
        caption: "신원 확인 뒤에도 allowed scope와 current working scope를 따로 검증해 데이터 접근 범위를 server가 소유합니다.",
      },
      operation: ["duplicate login E2E와 session 정책을 검증했습니다.", "권한 경계 변경 시 기존 공개 API contract의 호환성을 함께 확인합니다."],
      limits: ["지점 권한의 전체 회귀 검증 완료를 주장하지 않습니다.", "전체 인증 시스템 단독 구축을 주장하지 않습니다."],
      evidence: [
        { project: "Multi-service SSO", scope: "Session policy·duplicate login", ownership: "contributed", status: "verified", relation: "primary", text: "공통 session 정책과 duplicate login E2E를 담당했습니다.", claimIds: ["centurion.sso-session"] },
        { project: "병원 운영 backend", scope: "Branch access boundary", ownership: "led", status: "in-progress", relation: "pattern-instance", text: "소속 지점과 현재 작업 지점을 분리하고 server auth state가 query scope를 결정하도록 구현 중입니다.", claimIds: ["nexus.branch-access-boundary"] },
      ],
      claimCeiling: { allowed: ["SSO session 정책·duplicate login E2E 담당", "server-owned working scope", "진행 중인 회귀 보강 명시"], forbidden: ["전체 인증 시스템 단독 구축", "모든 권한 회귀 검증 완료", "공공 인증 체계 경험으로 확대"] },
      jdFit: { matches: ["다기관·다역할 업무의 접근 범위 설계", "민감 데이터 query scope의 server ownership", "오류 contract와 변경 이력의 분리"], boundary: "공공기관·권리자 업무의 실제 role matrix와 audit requirement는 확인이 필요합니다." },
      claimIds: ["centurion.sso-session", "nexus.branch-access-boundary"],
    },
    {
      no: "03",
      title: "AI 생성 품질을 자동 점수 하나로 확정하지 않고, 검증 근거와 사람 판단을 분리했습니다",
      caseMode: "single-system",
      layers: ["AI", "Product", "Operations"],
      status: { label: "실험 하네스 직접 설계·검증", tone: "verified" },
      outcomeLine: "자동 게이트는 반복 가능한 오류를 막고, 실측 분포는 기준의 타당성을 드러내며, 최종 품질 판단은 사람이 맡게 했습니다.",
      compositionCaption: "AI 글 생성 품질을 정의하기 위한 독립 실험 하네스의 설계·검증 범위입니다. production 승인 workflow로 확대하지 않습니다.",
      narrative: {
        context: "고객에게 제공할 AI 글의 품질 기준을 정의하기 위한 독립 실험에서 형식 통과와 제품 품질을 같은 판단으로 취급할 수 없었습니다.",
        problem: "자동 규칙만 늘리면 측정 가능한 오류는 줄여도 자연스러움과 맥락 적합성까지 판정했다고 오해하기 쉽습니다. 기준값 자체가 자사 출력을 되먹임하면 잘못된 기준도 강화됩니다.",
        actions: [
          "품질 판정을 자동 게이트·실측 분포 대조·사람 판정의 세 층으로 나눴습니다.",
          "결정적 게이트 12종으로 반복 가능한 형식 오류를 차단했습니다.",
          "품질을 6개 축으로 나눠 개선 순서를 관리하고 실제 출력 분포를 기준과 대조했습니다.",
          "자사 출력이 기준값으로 되먹임되던 순환을 재실측으로 발견하고 판정 기준을 다시 세웠습니다.",
        ],
        resultLabel: "남은 상태",
        result: "자동화가 맡을 범위와 사람이 판단해야 할 범위를 분리하고, 기준 자체가 틀릴 수 있다는 전제까지 실험 흐름에 남겼습니다.",
        visualLead: "형식 오류 차단, 실측 분포 대조, 사람의 최종 판단이 서로 대체되지 않는 세 층으로 표시했습니다.",
      },
      frame: [
        { label: "상황", text: "형식 통과와 제품 품질을 같은 점수로 볼 수 없음", tone: "context" },
        { label: "대처", text: "자동 게이트·실측 분포·사람 판정 분리", tone: "decision" },
        { label: "기여", text: "자사 출력이 다시 기준값이 되는 순환을 발견하고 판정 기준 교정", tone: "outcome" },
      ],
      details: [
        { kind: "implementation", label: "AUTOMATED GATE", items: [{ text: "결정적 게이트 12종으로 형식 오류를 자동 차단했습니다." }, { text: "자동화 가능한 조건과 사람의 해석이 필요한 조건을 분리했습니다." }] },
        { kind: "implementation", label: "MEASUREMENT", items: [{ text: "실제 출력 분포를 대조해 기준값이 자사 결과를 되먹임하던 순환을 발견했습니다." }, { text: "문제 축을 다시 정의하고 이후 실험의 기준을 재수립했습니다." }] },
        { kind: "decision", label: "HUMAN JUDGMENT", items: [{ text: "6개 품질 축을 사람이 검토해 개선 우선순위를 정하고 최종 제품 품질 판단을 소유합니다." }] },
        { kind: "constraints", label: "BOUNDARY", items: [{ text: "자동 게이트 통과를 생성 품질의 자동 판정이나 품질 개선 수치로 표현하지 않습니다." }] },
      ],
      visual: {
        kind: "compact-flow",
        title: "AI 생성 품질을 판단하는 세 층",
        lanes: [
          { label: "자동 게이트", note: "반복 가능한 오류", tone: "context", stages: [
            { label: "형식·금칙", detail: "결정적 규칙" }, { label: "12개 gate", detail: "오류 차단", emphasis: "strong" }, { label: "통과 근거", detail: "검사 결과 보존", emphasis: "outcome" },
          ] },
          { label: "실측 대조", note: "기준도 검증", tone: "delivery", stages: [
            { label: "출력 분포", detail: "실제 결과" }, { label: "기준 비교", detail: "순환 기준 탐지", emphasis: "strong" }, { label: "문제 재정의", detail: "사람이 기준 재수립", emphasis: "outcome" },
          ] },
          { label: "사람 판정", note: "제품 품질", tone: "decision", stages: [
            { label: "6개 품질 축", detail: "판단 기준" }, { label: "맥락 검토", detail: "자동화 밖 영역" }, { label: "개선 순서", detail: "사람이 결정", emphasis: "outcome" },
          ] },
        ],
        caption: "자동화는 반복 가능한 오류를 줄이지만, 기준의 타당성과 최종 제품 품질까지 대신 판단하지 않습니다.",
      },
      operation: ["자동 gate 결과와 실측 분포를 분리해 확인합니다.", "기준이 결과를 되먹임하는 징후가 보이면 규칙을 더하기 전에 문제 정의를 다시 검토합니다."],
      limits: ["6개 축의 내부 점수나 구체 기준값은 공개하지 않습니다.", "생성 품질의 개선 배수·비율이나 완전 자동 판정을 주장하지 않습니다."],
      evidence: [
        { project: "Thready", scope: "AI generation quality system", ownership: "owned", status: "verified", relation: "primary", text: "AI 생성 품질을 자동 게이트·실측 분포·사람 판정으로 나누고, 자사 출력이 다시 기준값이 되는 순환을 재실측으로 발견해 교정했습니다.", claimIds: ["thready.quality-criteria-system", "thready.measurement-correction"] },
      ],
      claimCeiling: { allowed: ["자동 게이트·실측 분포·사람 판정 3층 설계", "결정적 게이트 12종", "자사 출력이 다시 기준값이 되는 순환 발견·교정"], forbidden: ["품질 자동 판정", "품질 개선 배수·비율", "내부 6축 점수 공개"] },
      jdFit: { matches: ["AI 출력의 반복 가능한 결함을 자동 검증", "사람 판정이 필요한 품질 영역의 분리", "기준값 자체를 재검증하는 실험 설계"], boundary: "이미지 판독 근거 생성이나 상표권자 승인 workflow 경험을 뜻하지 않으며, 실제 판독 기준은 domain 전문가와 함께 정의해야 합니다." },
      claimIds: ["thready.quality-criteria-system", "thready.measurement-correction"],
    },
  ] satisfies PortfolioOutcome[]).sort((left, right) => left.no.localeCompare(right.no)),
  workSystem: {
    title: "무엇을 만들지, 어떻게 더 효율적으로 만들지를 함께 검토했습니다",
    summary: [
      "1인 1제품 개발 환경에서 주 1회 Agent 활용 경험을 공유했습니다.",
      "코드 단위 리뷰보다 제품이 풀어야 할 문제를 정확히 정의하고, 구현 방향과 더 효율적인 방법을 팀과 논의하는 데 집중했습니다.",
    ],
    caption: "코드 단위 리뷰에 머물지 않고 문제 정의와 구현 방향, 더 나은 방법을 팀이 함께 검토한 주간 개발 회고입니다.",
    foundation: ["만들어야 할 것", "문제·요구사항 확인", "구현 방향 비교", "효율적인 방법 선택"],
    lanes: [
      { kind: "ai", label: "Agent Usage", meta: { role: "탐색", owner: "활용 경험 공유", description: "맥락·병목·새 방법" }, items: ["현재 작업 맥락", "막힌 지점·원인", "새로운 방법 후보"] },
      { kind: "human", label: "Human Judgment", meta: { role: "판단", owner: "팀이 검토", description: "정확성·효율" }, items: ["만들어야 할 것 확정", "구현 방향 비교", "적용 방법 결정"] },
    ],
    evidence: [
      { project: "주간 개발 회고", scope: "문제 정의·구현 방향 검토", ownership: "contributed", status: "verified", relation: "primary", text: "코드 단위 리뷰보다 만들어야 할 것을 정확히 정의하고, 구현 방향·효율적인 방법·작업 병목을 팀과 논의했습니다.", claimIds: ["career.weekly-role-based-agent-retrospective"] },
      { project: "Coding Agent 활용", scope: "탐색·구현·검증", ownership: "owned", status: "verified", relation: "corroborating", text: "Claude Code와 Codex를 codebase 분석·기능 inventory·반복 구현·검증에 사용하고 architecture·test·release 판단은 직접 소유했습니다.", claimIds: ["career.coding-agent-usage"] },
      { project: "Backend Template", scope: "Architecture·runbook·agent context", ownership: "owned", status: "verified", relation: "corroborating", text: "사람과 agent가 같은 backend 실행 규칙과 검증 명령을 읽도록 context를 직접 구축했습니다.", claimIds: ["be-template.backend-standard", "be-template.agent-context"] },
    ],
    limits: ["Agent 활용 회고를 PR·code review 자동화로 표현하지 않습니다.", "회고 전체를 단독 설계·운영했다고 하거나 정량 생산성 향상을 주장하지 않습니다."],
    claimIds: ["career.weekly-role-based-agent-retrospective", "career.coding-agent-usage", "be-template.backend-standard", "be-template.agent-context"],
  },
} satisfies TailoredPortfolio;
