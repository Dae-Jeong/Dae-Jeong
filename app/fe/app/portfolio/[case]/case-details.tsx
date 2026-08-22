/* 공개 문장·순서·강조의 표현 SoT. 사실·claim 강도는 evidence registry,
케이스 계약·범위는 wiki/products/portfolio/cases를 따른다. 창작 수치 금지. */

export type CaseDetail = {
  eyebrow: string;
  positioning: string;
  kv: { k: string; v: string }[];
  problem: React.ReactNode[];
  /* 검토(Analyze) — 선택 섹션. 근거 없는 케이스는 생략한다 (§6·§7) */
  review?: {
    intro?: React.ReactNode;
    groups: {
      title: string;
      options: { name: string; verdict: "기각" | "채택"; reason: React.ReactNode }[];
      note?: React.ReactNode;
    }[];
  };
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
    claimIds: string[];
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
        재구축의 가장 큰 위험은 새 결함이므로, 결정보다 <strong>통제 장치를 먼저</strong>{" "}
        놓았다 — 범위를 <strong>backend로 한정</strong>(FE는 Next.js 유지)하고, 하네스를
        세운 뒤에 작업을 시작했다. 위험이 현실화되지 않았는지는 아래 근거 chip의 reopen
        지표로 확인할 수 있다.
      </>,
    ],
    review: {
      intro: (
        <>
          무엇을 고칠지보다 <strong>어디까지 고칠지</strong>를 먼저 정해야 했다. 검토한
          선택지와 버린 이유다.
        </>
      ),
      groups: [
        {
          title: "재구축 범위",
          options: [
            { name: "부분 수정", verdict: "기각", reason: <>의존성 구조가 그대로 남는다 — QA 티켓을 닫아도 같은 영역에서 재발하던 패턴이 근거였다</> },
            { name: "전면 교체 — FE 포함", verdict: "기각", reason: <>blast radius가 필요 이상으로 커진다</> },
            { name: "backend만 분리 교체", verdict: "채택", reason: <>FE(Next.js)는 유지. AI 모듈 확장이 예정돼 있었고, 서비스가 작은 지금이 가장 싸다고 판단했다</> },
          ],
          note: (
            <>
              &ldquo;돌아가는 기능을 왜 다시 만드나&rdquo;라는 반대는 문제 누적·AI 모듈
              확장 계획·하네스 기반 이관 속도로 설득했다.
            </>
          ),
        },
        {
          title: "생성 품질을 무엇으로 판정하나",
          options: [
            { name: "감으로 판정", verdict: "기각", reason: <>&ldquo;좋은 글&rdquo;의 기준 자체가 없었다 — 성공 사례도 n=1이라 일반화할 수 없었다</> },
            { name: "LLM judge를 품질 게이트로", verdict: "기각", reason: <>기준이 없는 상태에서 게이트를 세우면 무엇을 막는지 알 수 없다</> },
            { name: "judge를 기준을 발견하는 장치로", verdict: "채택", reason: <>가설을 정량 판단으로 바꿔 데이터를 쌓고, 기준을 증명해가는 루프로 설계했다</> },
          ],
        },
      ],
    },
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
            기존 기능과 API 동작을 검사하는 하네스를 <strong>먼저</strong> 세운 뒤,
            AI를 활용해 기능 파악과 반복 구현을 진행하고 backend를 재구축했습니다.
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
        desc: "자동 게이트로 틀린 출력을 코드가 먼저 걸러내고, 최근 1년 게시물이 중심인 실측 코퍼스와의 분포 대조로 '플랫폼다운 글'인지 판정하며, 남는 층만 사람이 본다.",
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
      claimIds: ["thready.qa-reopen-reduction"],
      },
      {
        index: "근거 2",
        label: "HTTP 5xx 0.3% 수준 운영",
      claim:
        "월 수만 건 규모 요청을 처리하는 production backend를 HTTP 5xx 0.3% 수준으로 운영 (30일 기준)",
      source: "Thready 운영 지표 · 운영 시점 기준",
      claimIds: ["thready.production-operation-quality"],
      },
      {
        index: "근거 3",
        label: "품질 기준값의 자기 되먹임 발견",
      claim:
        "측정값으로 신뢰하던 품질 기준값이 자사 출력을 되먹이고 있었음을 발견 — 순환을 끊고 기준을 다시 세우는 과정에서 문제 정의 자체의 오류도 드러남",
      source: "최근 1년 게시물 중심의 실측 코퍼스 재수집",
      claimIds: ["thready.measurement-correction", "thready.corpus-measurement"],
      },
    ],
  },
  "bay-async": {
    eyebrow: "Case 02 / 05 · Async Backend",
    positioning:
      "async FastAPI와 worker 실행 모델을 맞추고, 비동기 작업의 실패 상태와 복구 경계를 운영 가능한 흐름으로 재구성한 케이스.",
    kv: [
      { k: "Role", v: "Lead" },
      { k: "Scope", v: "Async Backend" },
      { k: "Stack", v: "FastAPI · TaskIQ" },
      { k: "Status", v: "구축·운영" },
    ],
    problem: [
      <>
        기존에도 Celery가 외부 알림을 비동기로 처리하고 있었다. 문제는{" "}
        <strong>비동기 처리의 유무가 아니라 실행 모델의 정합성</strong>이었다.
        asyncio를 중심으로 구성한 FastAPI backend와 당시 Celery worker의 실행
        방식이 달랐다.
      </>,
      <>
        worker를 교체하는 것만으로는 충분하지 않았다. 작업 상태와 retry, 최종
        실패 기록, 수동 재처리, API·worker를 함께 검증하는 환경까지 하나의 운영
        경계로 만들어야 했다.
      </>,
    ],
    review: {
      groups: [
        {
          title: "기존 Celery 실행 모델을 유지할 것인가",
          options: [
            {
              name: "Celery 유지",
              verdict: "기각",
              reason: (
                <>
                  당시 사용한 Celery 5.3.6은 asyncio worker pool을 공식 실행
                  모델로 제공하지 않아 async FastAPI 코드베이스와 별도 방식으로
                  운용해야 했다.
                </>
              ),
            },
            {
              name: "TaskIQ로 전환",
              verdict: "채택",
              reason: (
                <>
                  async function과 FastAPI 의존성 구조를 직접 지원하고 기존
                  RabbitMQ를 계속 사용할 수 있어 실행 모델을 맞출 수 있었다.
                </>
              ),
            },
          ],
          note: (
            <>
              TaskIQ가 비동기 처리를 처음 도입한 것은 아니다. 기존 Celery 기반
              경계를 옮기면서 실패 상태와 복구 책임을 다시 설계한 전환이다.
            </>
          ),
        },
      ],
    },
    decisionIntro: (
      <>
        전환의 기준은 새로운 기술 도입 자체가 아니라{" "}
        <strong>async 실행 모델과 실패 복구의 운영 가능성</strong>이었다.
      </>
    ),
    decisions: [
      {
        k: "Execution Model",
        t: (
          <>
            Celery 기반 처리를 <strong>TaskIQ·RabbitMQ</strong>로 전환해 async
            FastAPI 코드베이스와 worker 실행 모델을 맞췄다.
          </>
        ),
      },
      {
        k: "Failure State",
        t: (
          <>
            알림 작업을 <strong>PENDING · SENDING · SUCCESS · FAILED</strong>{" "}
            상태로 기록하고 retry와 최종 실패 이력을 남겼다.
          </>
        ),
      },
      {
        k: "Recovery Boundary",
        t: (
          <>
            자동 retry 이후에도 실패한 작업은 수동 재발송으로 복구하고, 재고
            연동은 별도 worker retry 경계에서 다시 처리하게 했다.
          </>
        ),
      },
    ],
    systemIntro: (
      <>
        API는 판정과 작업 상태 생성을 담당하고, 외부 연동과 복구는 broker 뒤의
        worker가 담당한다.
      </>
    ),
    system: [
      {
        title: "API · State",
        desc: "주문·상품·재고 판정과 알림 작업 상태를 생성.",
      },
      {
        title: "RabbitMQ · TaskIQ",
        desc: "알림·재고 작업을 각 worker로 전달하고 async dependency context를 연결.",
      },
      {
        title: "Worker · External",
        desc: "외부 연동을 수행하고 성공·실패 상태와 retry 이력을 기록.",
      },
      {
        title: "Retry · Manual Recovery",
        desc: "자동 retry와 수동 재발송 경로로 실패한 작업을 다시 처리.",
      },
    ],
    opsIntro: (
      <>
        알림 작업은 최대 3회·10초 간격으로 retry하고, 재고 worker도 최대 3회
        retry한다. API test, Docker CI와 local setup으로 API·broker·worker 흐름을
        함께 재현한다. exactly-once나 전환 전후 성능 개선 수치는 주장하지 않는다.
      </>
    ),
    evidence: [
      {
        index: "근거 1",
        label: "Celery → TaskIQ 전환",
        claim:
          "async FastAPI 실행 모델과의 정합성을 기준으로 Celery 기반 처리를 TaskIQ·RabbitMQ로 전환",
        source: "Centurion 주문·재고 backend Git history·dependency",
        claimIds: ["centurion.async-migration"],
      },
      {
        index: "근거 2",
        label: "상태·retry·재처리 경계",
        claim:
          "알림 상태·retry·최종 실패 기록·수동 재발송과 재고 worker retry 경계 구축 주도",
        source: "Centurion 주문·재고 backend code·test",
        claimIds: ["centurion.bay-async-backend"],
      },
      {
        index: "근거 3",
        label: "test·CI·onboarding",
        claim:
          "API test infrastructure, Docker CI, local setup·onboarding 구축 주도",
        source: "Centurion 주문·재고 backend 개발 기록",
        claimIds: ["centurion.test-ci-foundation"],
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
      source: "Centurion 실시간 상담 AI 개발 기록",
      claimIds: ["centurion.say-realtime-ai"],
      },
      {
        index: "근거 2",
      label: "translation·audio pipeline",
      claim:
        "zombie session cleanup, reconnect race 처리, translation/audio pipeline 변경이 확인됨",
      source: "Centurion Evidence · 실시간 상담 AI",
      claimIds: ["centurion.say-realtime-ai"],
      },
      {
        index: "근거 3",
      label: "structured output·fallback",
      claim:
        "dashboard AI analysis의 structured output·fallback과 boundary test가 확인됨",
      source: "Centurion Evidence · 실시간 상담 AI",
      claimIds: ["centurion.say-realtime-ai"],
      },
    ],
  },
  "be-template": {
    eyebrow: "Company AX · Product / Work System",
    positioning:
      "제품의 Decision→release 흐름을 운영하고, 의사결정·회의·업무 배정·승인·후속 작업까지 같은 맥락으로 잇는 회사 AX 구조 설계에 참여한 케이스. Backend Template과 agent context는 직접 구축했다.",
    kv: [
      { k: "Role", v: "Design Contributor · Product Operations Lead · Backend System Owner" },
      { k: "Scope", v: "Product · Work System · Agent Context · Human Gate" },
      { k: "Stack", v: "MEDINESS · FastAPI · Git · Azure/Vercel" },
      { k: "Status", v: "제품 운영 · 회사 AX 확장 설계" },
    ],
    problem: [
      <>
        제품 개발의 결정·스펙·작업·QA·릴리스는 서로 다른 도구와 문서에, 회사 업무의
        회의·의사결정·담당 배정·승인·후속 작업은 사람의 기억과 대화에 흩어져 있었다.
        기록을 더 만드는 것만으로는 결정이 어떤 실행과 검증으로 이어졌는지 보기 어려웠다.
      </>,
      <>
        서비스 앱·데이터·도구는 담당 개발팀이 구현했다. 저는 제품 요구·운영 구조
        설계에 참여하고 제품별 Decision→release 적용·운영을 리드했다. 회사 AX 구조도
        설계 참여 범위이며, Backend Template·agent context는 직접 설계·구축한 범위다.
      </>,
      <>
        Agent가 이 맥락을 읽는다고 해서 제품 판단과 사람의 책임까지 넘길 수는 없었다.
        제품 우선순위·아키텍처·업무 담당·QA·release 승인은 사람이 계속 소유해야 했다.
      </>,
    ],
    review: {
      groups: [
        {
          title: "제품과 회사 업무를 어떻게 연결하나",
          options: [
            { name: "상태 요약 문서 추가", verdict: "기각", reason: <>기존 기록과 다시 동기화해야 해 확인 비용과 책임 공백이 남는다</> },
            { name: "Agent에게 판단 위임", verdict: "기각", reason: <>제품·아키텍처·업무 담당·승인의 책임이 흐려진다</> },
            { name: "공통 맥락 + Human Gate", verdict: "채택", reason: <>Agent는 탐색·초안·반복·근거를 준비하고 사람은 판단과 승인을 소유한다</> },
          ],
        },
      ],
    },
    decisionIntro: (
      <>
        먼저 제품의 Decision→release 흐름을 실제 운영했다. 그 위에서 회사 업무를
        연결할 범위의 설계에 참여하고, 반복되는 backend 판단은 <strong>실행 가능한
        template과 agent context</strong>로 직접 만들었다.
      </>
    ),
    decisions: [
      {
        k: "Current Product Flow",
        t: (
          <>
            Decision·SPEC·Work Package를 BE·FE·QA owner와 release gate로 연결해 실제
            제품에 적용·운영한다.
          </>
        ),
      },
      {
        k: "Company Work Extension",
        t: (
          <>
            의사결정·회의·업무 배정·승인·후속 작업을 같은 맥락으로 잇는 범위는 현재
            제품 운영과 구분된 <strong>AX 확장 설계</strong>로 둔다.
          </>
        ),
      },
      {
        k: "Agent / Human Boundary",
        t: (
          <>
            Agent는 필요한 맥락과 작업안·반복 실행·검증 근거를 준비하고, 제품 판단·
            architecture·assignment·QA·release 승인은 사람이 맡는다.
          </>
        ),
      },
      {
        k: "Engineering Execution",
        t: (
          <>
            Router→Service→Repository·DI·transaction·error contract는 stable core로,
            제품 차이는 명시적 option으로 분리하고 ADR·runbook·agent context를 함께 둔다.
          </>
        ),
      },
    ],
    systemIntro: (
      <>
        현재 제품 운영은 실선, 회사 업무 AX 확장 설계는 점선으로 구분하고, 양쪽 모두
        <strong>사람의 판단과 승인</strong>을 마지막 경계로 둔다.
      </>
    ),
    system: [
      {
        title: "제품 개발 · 현재 운영",
        desc: "요청·기획·디자인 → Decision·SPEC → Work Package → BE·FE·QA → release gate.",
      },
      {
        title: "회사 업무 · 확장 설계",
        desc: "회의·요청 → 의사결정 → 업무 배정 → 승인 → 후속 작업.",
      },
      {
        title: "Agent Preparation",
        desc: "맥락 탐색, 작업안 초안, 반복 실행, 검증 근거 준비.",
      },
      {
        title: "Human Gate",
        desc: "제품·아키텍처·업무 담당 판단, QA·release 최종 승인.",
      },
      {
        title: "Backend Execution",
        desc: "Stable core·explicit option·contract test·Pyright·ADR·runbook·automation skill.",
      },
      {
        title: "Production Runtime",
        desc: "Git·CI/CD를 거쳐 제품별 Azure·Vercel 실행 환경으로 전달.",
      },
    ],
    opsIntro: (
      <>
        제품별 Decision→release는 현재 운영 범위, 회사 업무 AX는 확장 설계 범위다.
        Backend Template·agent context는 직접 구축했다. <strong>전사 AX 완료·MEDINESS
        플랫폼 직접 구현·agent 자율 의사결정·정량 생산성 개선은 주장하지 않는다.</strong>
      </>
    ),
    evidence: [
      {
        index: "근거 1",
        label: "회사 업무 AX 설계",
        claim:
          "의사결정·회의·업무 배정·승인·후속 작업을 agent-readable context와 human gate로 잇는 구조 설계에 참여",
        source: "사용자 확정 contribution boundary",
        claimIds: ["mediness.company-work-ax-design"],
      },
      {
        index: "근거 2",
        label: "제품 운영",
        claim: "Decision·SPEC·Work Package와 QA·release gate 기반 제품별 운영을 리드",
        source: "MEDINESS 제품 운영 workflow 기록",
        claimIds: ["mediness.product-operations"],
      },
      {
        index: "근거 3",
        label: "backend standard",
        claim:
          "layered architecture·DI·ADR·runbook·agent context 기반 조직 표준 FastAPI template 설계·구축 전담",
        source: "Backend Template 도입 기록",
        claimIds: ["be-template.backend-standard", "be-template.agent-context"],
      },
    ],
  },
  "mediness-ops": {
    eyebrow: "Product Operations · Delivery",
    positioning:
      "서비스 구현 담당자와 제품 요구·운영 흐름을 구체화하는 설계에 참여하고, 확정된 결정을 스펙·작업·릴리스로 이어지게 운영한 케이스.",
    kv: [
      { k: "Role", v: "Design Contributor · Operations Lead" },
      { k: "Scope", v: "Product Design · Product Operations" },
      { k: "Stack", v: "Registry · Human Gate" },
      { k: "Status", v: "설계 참여·운영" },
    ],
    problem: [
      <>
        서비스 구현은 담당 개발자들이 맡았고, 저는{" "}
        <strong>제품 요구와 운영 흐름을 구체화하는 설계에 참여</strong>했다.
        서비스 직접 구현이나 전체 설계 주도는 이 케이스의 ownership으로 주장하지
        않는다.
      </>,
      <>
        여러 제품의 일정·이슈·릴리스 상태가 회의, 개인의 기억, 협업 도구에 나뉘어
        있었다. 어떤 결정이 어떤 SPEC과 실행 작업으로 이어졌는지, release를 막는
        blocker가 남아 있는지 확인하는 비용이 반복됐다.
      </>,
      <>
        제품 개발에서 쌓이는 기록을 회사 업무로 넓힐 때에도 의사결정·회의·업무
        배정·승인·후속 작업의 소유자가 흐려져서는 안 됐다. Agent가 맥락을 찾고
        초안을 준비하더라도 product decision은 사람이 맡아야 했다.
      </>,
    ],
    decisionIntro: (
      <>
        상태를 다시 요약하는 문서를 하나 더 만드는 대신, 결정을 실행과 release evidence로
        이었다. 회사 업무로 확장하는 설계에서는 agent의 역할을 <strong>탐색·초안·반복·근거
        준비</strong>로 제한했다.
      </>
    ),
    decisions: [
      {
        k: "One-Way Pipeline",
        t: (
          <>
            제품 결정 → 스펙 → 작업 → 릴리스 근거가 한 방향으로 이어지도록 등록 구조를
            만든다. 어디서 끊겼는지 되짚을 수 있어야 다음 릴리스에서 같은 자리가 다시
            막히지 않는다.
          </>
        ),
      },
      {
        k: "Human Boundary",
        t: (
          <>
            Agent는 필요한 맥락을 찾고 회의·요청을 작업안으로 정리한다. 제품 우선순위,
            아키텍처, 업무 담당, QA·release 승인은 사람이 판단한다.
          </>
        ),
      },
      {
        k: "Release Gate",
        t: (
          <>
            스펙과 작업이 어디까지 덮였는지, 릴리스 근거가 무엇인지를 버전 단위로 묶어
            <strong>완료 시점의 상태를 고정</strong>한다. 나중에 되짚을 수 있어야 한다.
          </>
        ),
      },
    ],
    systemIntro: (
      <>
        현재 운영하는 제품 pipeline과 회사 업무로 넓힐 AX 설계를 구분한다. 어느 쪽도
        <strong>자동화가 사람의 판단과 승인을 대신하지 않는다.</strong>
      </>
    ),
    system: [
      {
        title: "결정 → 스펙 → 작업",
        desc: "결정한 날과 담당자를 남기고, 그 결정이 어느 스펙·작업으로 이어졌는지 한 방향으로 잇는다.",
      },
      {
        title: "회사 업무 AX 확장",
        desc: "의사결정·회의·업무 배정·승인·후속 작업을 같은 맥락에서 잇도록 설계.",
      },
      {
        title: "근거 연결",
        desc: "PR 변경 이력과 릴리스 근거를 운영 기록에 연결해 빠진 구간이 보이게 한다.",
      },
      {
        title: "릴리스 게이트",
        desc: "근거가 있는 완료만 버전으로 고정한다 — 근거 없는 \"완료\"는 통과시키지 않는다.",
      },
    ],
    opsIntro: (
      <>
        결정·스펙·작업·릴리스로 이어지는 제품 흐름은 실제 운영 범위이고, 회사 업무 AX는
        확장 설계 범위다. <strong>조직 전체 전환 완료나 에이전트의 자율 의사결정은
        주장하지 않는다.</strong>
      </>
    ),
    evidence: [
      {
        index: "설계 근거",
        label: "제품 설계 참여",
        claim:
          "서비스 구현 담당자와 제품 요구·운영 흐름을 구체화하는 설계에 참여",
        source: "사용자 확정 contribution boundary",
        claimIds: ["mediness.product-system-design-participation"],
      },
      {
        index: "근거 1",
        label: "제품 운영 pipeline",
      claim:
        "pipeline registry와 release gate 기반 제품팀 일정·이슈·릴리스 운영을 리드",
      source: "제품 운영 workflow 기록",
      claimIds: ["mediness.product-operations"],
      },
      {
        index: "근거 2",
        label: "회사 업무 AX 설계",
        claim:
          "의사결정·회의·업무 배정·승인·후속 작업을 agent-readable context와 human gate로 연결하는 구조 설계에 참여",
        source: "사용자 확정 contribution boundary",
        claimIds: ["mediness.company-work-ax-design"],
      },
    ],
  },
};
