/* 케이스 상세 콘텐츠 — canonical 은 app/design/portfolio-case-prototype.html.
   ⚠️ 창작 수치 금지 — 미확정 값은 [TBD] 유지 (rail note 계약) */

export type CaseDetail = {
  eyebrow: string;
  positioning: string;
  kv: { k: string; v: string }[];
  problem: React.ReactNode[];
  decisionIntro: React.ReactNode;
  decisions: { k: string; t: React.ReactNode }[];
  systemIntro: React.ReactNode;
  system: { title: string; desc: string }[];
  opsIntro: React.ReactNode;
  evidence: {
    index: string;
    label: string;
    claim: string;
    source: string;
  }[];
};

export const DETAILS: Record<string, CaseDetail> = {
  thready: {
    eyebrow: "Case 01 / 05 · AI Content Generation",
    positioning:
      "AI 콘텐츠 생성 backend를 전면 재구축하고, cutover 이후 개발·운영을 전담한 케이스.",
    kv: [
      { k: "Role", v: "Rebuild · Ownership" },
      { k: "Scope", v: "Generation Quality" },
      { k: "Stack", v: "FastAPI · LLM" },
      { k: "Status", v: "운영 중" },
    ],
    problem: [
      <>
        AI 콘텐츠 생성 제품 Thready의 backend를 인계받았을 때, 도메인 간 의존성이
        얽혀 있어 <strong>회원 로직 수정이 AI 생성 중단으로 전파</strong>됐다. QA
        티켓을 닫아도 같은 영역에서 재발이 반복됐다.
      </>,
      <>
        생성 품질도 프롬프트·모델 호출에 흩어져 있어{" "}
        <strong>무엇이 좋은 출력인지 판정하고 회귀를 잡을 기준</strong>이 없었다.
        &ldquo;품질이 나쁘다&rdquo;는 말로는 무엇을 고쳐야 할지 정할 수 없었다.
      </>,
      <>
        부분 수정으로는 의존성 구조가 그대로 남는다고 봤다.{" "}
        <strong>서비스가 아직 작을 때 전면 재구축</strong>하는 편이 비용이 낮다고
        판단하고, &ldquo;돌아가는 기능을 왜 다시 만드나&rdquo;라는 반대를 문제
        누적·AI 모듈 확장 계획·하네스 기반 이관 속도로 설득했다.
      </>,
    ],
    decisionIntro: (
      <>
        품질을 &ldquo;감&rdquo;이 아니라 <strong>판정 가능한 대상</strong>으로 만들기
        위해 네 가지를 결정했다.
      </>
    ),
    decisions: [
      {
        k: "Rebuild First",
        t: (
          <>
            디자인 패턴과 인프라 하네스를 <strong>먼저</strong> 세운 뒤 AI 코딩
            에이전트와 협업 — 파악부터 재구축까지 작업 시간 기준 36시간.
          </>
        ),
      },
      {
        k: "Typed Prompt",
        t: (
          <>
            프롬프트를 문자열이 아닌 <strong>typed prompt builder</strong>로 구성 —
            입력 계약을 타입으로 고정하고 재사용 가능하게 만든다.
          </>
        ),
      },
      {
        k: "3-Layer Judgement",
        t: (
          <>
            품질 판정을{" "}
            <strong>자동 게이트 · 실측 분포 대조 · 사람 판정</strong> 세 층으로 분리
            — 코드가 거를 수 있는 것부터 걸러내고, 사람은 자동화가 닿지 않는 층만
            본다.
          </>
        ),
      },
      {
        k: "Agent Roles",
        t: (
          <>
            생성 파이프라인을 <strong>planner·writer 역할로 분리</strong> — 어떤
            판단을 어느 역할에 둘 것인가를 설계의 축으로 삼는다.
          </>
        ),
      },
    ],
    systemIntro: (
      <>
        결정을 실제 backend 구조로 옮긴 결과, 생성 품질이{" "}
        <strong>재구축된 FastAPI backend 위의 시스템</strong>으로 자리 잡았다.
      </>
    ),
    system: [
      {
        title: "Typed Prompt Builder",
        desc: "프롬프트 조립을 타입으로 계약화 — 입력 누락·형 오류를 호출 전에 차단하고 재사용을 표준화.",
      },
      {
        title: "3층 판정 체계",
        desc: "자동 게이트 12종으로 틀린 출력을 코드가 먼저 걸러내고, 직접 수집한 실측 코퍼스(n=19→4,039)와의 분포 대조로 '플랫폼다운 글'인지 판정하며, 남는 층만 사람이 본다.",
      },
      {
        title: "planner · writer 파이프라인",
        desc: "유형 분기 판정을 writer에 뒀을 때 18건 전부 미발동 — writer는 원본 유형을 알 수 없는 자리였다. 판정을 planner로 옮겨 해결했다.",
      },
      {
        title: "반증 로그",
        desc: "반증된 프롬프트 규칙을 기록으로 남겨 같은 시도의 반복을 차단 — 실패도 자산으로 축적한다.",
      },
      {
        title: "Rebuild + Cutover",
        desc: "부분 패치가 아닌 전면 재구축 후 cutover — 이후 개발·운영을 전담하는 단일 오너십.",
      },
    ],
    opsIntro: (
      <>
        재구축 이후 이 backend는 <strong>월 수만 건 규모의 요청</strong>을 처리하는
        production으로 운영되고 있다. 아래 근거 chip을 눌러 claim 요약을 확인할 수
        있다.
      </>
    ),
    evidence: [
      {
        index: "근거 1",
        label: "QA reopen 37% → 11%",
        claim:
          "재구축 cutover 전후로 QA 티켓 reopen 비율(해결 대비 reopen)이 37%에서 11%로 감소",
        source: "Jira 집계 · cutover 전후 비교",
      },
      {
        index: "근거 2",
        label: "HTTP 5xx 0.3% 수준 운영",
        claim:
          "월 수만 건 규모 요청을 처리하는 production backend를 HTTP 5xx 0.3% 수준으로 운영 (30일 기준)",
        source: "Thready 운영 지표 · 운영 시점 기준",
      },
      {
        index: "근거 3",
        label: "품질 기준값의 자기 되먹임 발견",
        claim:
          "측정값으로 신뢰하던 품질 기준값이 자사 출력을 되먹이고 있었음을 발견 — 순환을 끊고 기준을 다시 세우는 과정에서 문제 정의 자체의 오류도 드러남",
        source: "실측 코퍼스 재수집 (n=19 → 4,039)",
      },
    ],
  },
  "bay-async": {
    eyebrow: "Case 02 / 05 · Async Backend",
    positioning:
      "실패 가능한 주문·재고 작업을 API에서 분리하고, worker 경계와 운영 검증을 연결한 케이스.",
    kv: [
      { k: "Role", v: "Lead" },
      { k: "Scope", v: "Async Backend" },
      { k: "Stack", v: "FastAPI · TaskIQ" },
      { k: "Status", v: "구축·운영" },
    ],
    problem: [
      <>
        주문·재고 처리 흐름에 외부 알림과 재고 연동처럼{" "}
        <strong>실패 가능한 작업</strong>이 섞여 있었다. 이 작업을 API 요청 안에서
        끝까지 기다리면 외부 지연과 실패가 사용자 요청의 응답 경계까지 전파될 수
        있었다.
      </>,
      <>
        작업을 API 밖으로 분리하는 것만으로는 충분하지 않았다. retry, 회귀 검증,
        worker까지 로컬에서 재현할 수 있는 개발 환경을 함께 만들어야 했다.
      </>,
    ],
    decisionIntro: (
      <>
        API의 응답 책임과 외부 작업의 완료 책임을 분리하고, 실패를{" "}
        <strong>worker 경계에서 다룰 수 있는 흐름</strong>으로 만들었다.
      </>
    ),
    decisions: [
      {
        k: "API Boundary",
        t: (
          <>
            API는 주문·상품·재고의 판정과 저장에 집중하고, 외부 상태를 기다리는 작업은
            요청 처리 경계 밖으로 보낸다.
          </>
        ),
      },
      {
        k: "Worker Flow",
        t: (
          <>
            <strong>RabbitMQ·TaskIQ worker</strong>로 알림과 재고 연동을 분리해,
            API와 외부 작업의 실패 경계를 나눈다.
          </>
        ),
      },
      {
        k: "Regression Loop",
        t: (
          <>
            재고 retry와 API test, Docker CI, local setup을 함께 구성해 비동기 흐름을
            반복 검증하고 협업자가 재현할 수 있게 한다.
          </>
        ),
      },
    ],
    systemIntro: (
      <>
        주문·상품·재고 API에서 판단과 저장을 수행한 뒤, 외부 알림과 재고 연동은{" "}
        <strong>queue 뒤의 worker</strong>로 넘기는 구조다.
      </>
    ),
    system: [
      {
        title: "Order · Product · Inventory API",
        desc: "주문·상품·재고의 판정과 저장을 API 경계에 두고 외부 작업과 분리.",
      },
      {
        title: "RabbitMQ · TaskIQ Worker",
        desc: "알림과 재고 연동처럼 실패 가능한 작업을 message queue 뒤에서 처리.",
      },
      {
        title: "Retry Boundary",
        desc: "재고 차감 실패를 API 재요청과 섞지 않고 worker retry 경계에서 복구.",
      },
      {
        title: "Test · CI · Onboarding",
        desc: "API test, Docker CI, one-command local setup과 FE onboarding으로 흐름을 재현.",
      },
    ],
    opsIntro: (
      <>
        비동기 경계는 retry와 회귀 검증, 로컬 재현 절차까지 연결해 운영 가능한 형태로
        구성했다. 성능이나 작업 성공률의 정량 결과는 확인된 근거가 없어 별도로 주장하지
        않는다.
      </>
    ),
    evidence: [
      {
        index: "근거 1",
        label: "주문·재고 API와 worker flow",
        claim:
          "BAY 주문·재고 API와 RabbitMQ·TaskIQ 비동기 worker flow 구축을 주도",
        source: "Centurion BAY 개발 기록",
      },
      {
        index: "근거 2",
        label: "retry·test·CI·onboarding",
        claim:
          "재고 연동 retry, API test infrastructure, Docker CI, local setup·onboarding 구축을 주도",
        source: "Centurion BAY 개발 기록",
      },
    ],
  },
  "say-realtime": {
    eyebrow: "Case 03 / 05 · Realtime AI",
    positioning:
      "실시간 AI 상담의 session lifecycle과 provider 경계를 안정화하고, translation·audio pipeline을 연결한 케이스.",
    kv: [
      { k: "Role", v: "Co-Lead" },
      { k: "Scope", v: "Session Lifecycle" },
      { k: "Stack", v: "FastAPI · WebSocket" },
      { k: "Status", v: "공동 주 기여" },
    ],
    problem: [
      <>
        실시간 상담 session이 종료되지 않으면 zombie session이 남고 resource와 cost를
        계속 사용할 수 있었다. reconnect가 기존 session 정리와 겹치면 race가 생기고,
        audio event 순서가 어긋나면 비동기 결과가 다른 turn에 연결될 위험도 있었다.
      </>,
      <>
        STT·LLM provider마다 인증, 언어 코드, 종료 조건이 달랐기 때문에 provider
        차이를 runtime 전체로 퍼뜨리지 않으면서 WebSocket의 실시간성과
        translation·audio 순서를 유지해야 했다.
      </>,
    ],
    decisionIntro: (
      <>
        연결 하나를 오래 유지하는 문제를 개별 예외 처리로 덮지 않고,{" "}
        <strong>session lifecycle과 provider boundary</strong>를 명시적인 runtime
        경계로 만들었다.
      </>
    ),
    decisions: [
      {
        k: "Lifecycle",
        t: (
          <>
            session의 생성·전환·종료·GC를 lifecycle로 관리하고, reconnect race는 기존
            session과 신규 연결의 경쟁을 이 경계에서 제한한다.
          </>
        ),
      },
      {
        k: "Provider Boundary",
        t: (
          <>
            provider별 인증과 종료 semantics는 adapter가 소유하고, 상담 runtime은
            공통 lifecycle 계약을 사용하도록 분리한다.
          </>
        ),
      },
      {
        k: "Sequence Control",
        t: (
          <>
            staggered translation·audio pipeline과 sequence matching으로 비동기 결과가
            다른 turn에 연결되지 않도록 흐름을 관리한다.
          </>
        ),
      },
    ],
    systemIntro: (
      <>
        WebSocket runtime이 session lifecycle을 소유하고, provider adapter와
        translation·audio pipeline이 그 아래에서 순서를 관리하는 구조다.
      </>
    ),
    system: [
      {
        title: "WebSocket Session Runtime",
        desc: "생성·전환·종료·GC와 reconnect race를 명시적인 session lifecycle로 관리.",
      },
      {
        title: "Provider Adapter",
        desc: "STT·LLM provider별 인증과 종료 차이를 adapter 경계 뒤로 격리.",
      },
      {
        title: "Translation · Audio",
        desc: "staggered pipeline과 audio sequence matching으로 turn 순서를 관리.",
      },
      {
        title: "Dashboard Boundary",
        desc: "structured output schema와 fallback, dashboard boundary test로 분석 연계를 고정.",
      },
    ],
    opsIntro: (
      <>
        lifecycle·reconnect·provider adapter·translation/audio 변경과 structured output
        fallback, migration procedure, dashboard boundary test가 운영 근거로 남아 있다.
        public traffic·latency·availability 수치는 확인되지 않아 주장하지 않는다.
      </>
    ),
    evidence: [
      {
        index: "근거 1",
        label: "session lifecycle·provider 경계",
        claim:
          "realtime AI 상담 backend의 세션 lifecycle과 STT/LLM provider 경계 안정화에 공동 주 기여",
        source: "Centurion SAY 개발 기록",
      },
      {
        index: "근거 2",
        label: "translation·audio pipeline",
        claim:
          "zombie session cleanup, reconnect race 처리, translation/audio pipeline 변경이 확인됨",
        source: "Centurion Evidence · SAY Realtime AI",
      },
      {
        index: "근거 3",
        label: "structured output·fallback",
        claim:
          "dashboard AI analysis의 structured output·fallback과 boundary test가 확인됨",
        source: "Centurion Evidence · SAY Realtime AI",
      },
    ],
  },
  "be-template": {
    eyebrow: "Case 04 / 05 · Backend Standard",
    positioning:
      "반복되는 backend 구조와 agent context 구성을 조직 표준 FastAPI template으로 묶은 케이스.",
    kv: [
      { k: "Role", v: "Owner" },
      { k: "Scope", v: "Backend Standard" },
      { k: "Stack", v: "FastAPI · Pyright" },
      { k: "Status", v: "설계·구축 전담" },
    ],
    problem: [
      <>
        새 backend project마다 directory structure, DI, transaction, error response와
        local setup을 다시 결정하고 있었다. agent도 project context와 작업 절차를
        매번 새로 읽고 추론해야 해, 반복되는 판단이 구현마다 흩어졌다.
      </>,
      <>
        동시에 multi-tenancy, ID type, authentication, storage는 project마다 달랐다.
        표준을 만들되 product-specific 선택을 숨기지 않는 경계가 필요했다.
      </>,
    ],
    decisionIntro: (
      <>
        모든 차이를 generic framework에 넣는 대신, 반복되는 core는 고정하고 제품별
        선택은 <strong>명시적인 option과 생성 workflow</strong>로 분리했다.
      </>
    ),
    decisions: [
      {
        k: "Stable Core",
        t: (
          <>
            Router → Service → Repository, DI, transaction, error contract를 stable
            layered core로 고정한다.
          </>
        ),
      },
      {
        k: "Explicit Options",
        t: (
          <>
            multi-tenancy, ID type, authentication, local·managed storage는
            option으로 분리해 product-specific 차이를 생성 후 확장한다.
          </>
        ),
      },
      {
        k: "Shared Context",
        t: (
          <>
            사람과 agent가 같은 ADR·convention·runbook과 계층형 context routing을
            바라보도록 반복 작업 automation skill을 template에 내장한다.
          </>
        ),
      },
    ],
    systemIntro: (
      <>
        backend의 안정적인 구조 계약과 project별 선택, agent 작업 context를{" "}
        <strong>하나의 생성·운영 표준</strong>으로 연결했다.
      </>
    ),
    system: [
      {
        title: "Layered Core",
        desc: "Router → Service → Repository, DI, transaction boundary를 stable core로 표준화.",
      },
      {
        title: "Option Matrix",
        desc: "tenancy·ID·authentication·storage 차이를 명시적인 option으로 분리.",
      },
      {
        title: "Contract Guard",
        desc: "response wrapper matrix, ErrorCode domain prefix, contract test와 Pyright로 회귀를 제한.",
      },
      {
        title: "Agent Context",
        desc: "Hub-and-Spoke routing과 init-project·add-domain·db-reset·local-setup skill을 내장.",
      },
    ],
    opsIntro: (
      <>
        layered architecture, DI, transaction, option matrix, contract test와 automation
        skill이 코드 근거로 확인되고, ADR·convention·runbook과 Hub-and-Spoke context
        routing이 문서 근거로 연결되어 있다. adoption과 setup 시간의 before/after는
        측정되지 않아 정량 효과는 주장하지 않는다.
      </>
    ),
    evidence: [
      {
        index: "근거 1",
        label: "backend standard",
        claim:
          "layered architecture·DI·ADR·convention·runbook 기반 조직 표준 FastAPI template 설계·구축 전담",
        source: "Backend Template 도입 기록",
      },
      {
        index: "근거 2",
        label: "agent context system",
        claim: "계층적 agent context와 반복 작업 automation skill을 backend template에 내장",
        source: "Backend Template agent context 기록",
      },
    ],
  },
  "mediness-ops": {
    eyebrow: "Case 05 / 05 · Product Operations",
    positioning:
      "제품의 decision·SPEC·Work Package·release gate를 연결하고, daily briefing으로 운영 입력을 모은 케이스.",
    kv: [
      { k: "Role", v: "Lead" },
      { k: "Scope", v: "Product Operations" },
      { k: "Stack", v: "Registry · Agent" },
      { k: "Status", v: "구축·운영" },
    ],
    problem: [
      <>
        여러 제품의 일정·이슈·릴리스 상태가 회의, 개인의 기억, 협업 도구에 나뉘어
        있었다. 어떤 결정이 어떤 SPEC과 실행 작업으로 이어졌는지, release를 막는
        blocker가 남아 있는지 확인하는 비용이 반복됐다.
      </>,
      <>
        협업 도구 activity는 최신 상태를 추정하는 재료일 뿐 완전한 source-of-truth가
        아니었다. 누락·지연·충돌 가능성이 있으므로 agent summary가 사람의 product
        decision을 대신해서는 안 됐다.
      </>,
    ],
    decisionIntro: (
      <>
        상태를 다시 요약하는 문서를 하나 더 만드는 대신, 결정을 실행과 release evidence로
        잇고 agent의 역할은 <strong>집계와 triage 입력</strong>으로 제한했다.
      </>
    ),
    decisions: [
      {
        k: "One-Way Pipeline",
        t: (
          <>
            decision → SPEC → Work Package → release evidence가 한 방향으로 연결되도록
            pipeline registry를 구성한다.
          </>
        ),
      },
      {
        k: "Human Boundary",
        t: (
          <>
            daily briefing agent는 activity와 blocker candidate를 모으고, blocker 해석과
            product decision은 human owner가 확인한다.
          </>
        ),
      },
      {
        k: "Release Gate",
        t: (
          <>
            SPEC·Work Package coverage와 release evidence를 version snapshot에 연결해
            완료 시점의 상태를 고정한다.
          </>
        ),
      },
    ],
    systemIntro: (
      <>
        협업 도구의 활동을 daily briefing으로 모으되, 최종 상태와 결정은 registry·문서·{" "}
        <strong>release gate</strong>가 확인하는 구조다.
      </>
    ),
    system: [
      {
        title: "Decision → SPEC → WP",
        desc: "결정일·owner를 기록하고 SPEC과 Work Package coverage를 한 방향으로 매핑.",
      },
      {
        title: "Daily Briefing",
        desc: "협업 도구 activity와 blocker candidate를 집계해 triage 입력으로 전달.",
      },
      {
        title: "Registry Coverage",
        desc: "PR 변경 이력과 release evidence를 pipeline registry에 연결.",
      },
      {
        title: "Release Gate",
        desc: "evidence가 있는 완료만 version snapshot과 version cut으로 고정.",
      },
    ],
    opsIntro: (
      <>
        decision·SPEC·Work Package pipeline, registry, release gate와 version cut 운영이
        문서 근거로 확인되고, daily briefing과 blocker triage flow가 도구 근거로 남아
        있다. status 확인 시간과 adoption의 정량 변화, agent의 자율 의사결정은 주장하지
        않는다.
      </>
    ),
    evidence: [
      {
        index: "근거 1",
        label: "제품 운영 pipeline",
        claim:
          "pipeline registry와 release gate 기반 제품팀 일정·이슈·릴리스 운영을 리드",
        source: "제품 운영 workflow 기록",
      },
      {
        index: "근거 2",
        label: "daily briefing agent",
        claim:
          "협업 도구 활동 집계와 blocker triage를 지원하는 daily briefing agent 구축·운영",
        source: "일일 브리핑 운영 기록",
      },
    ],
  },
};
