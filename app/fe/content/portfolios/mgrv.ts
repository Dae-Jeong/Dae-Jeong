import type { TailoredPortfolio } from "./types";

export const MGRV_PORTFOLIO = {
  slug: "mgrv",
  companyName: "MGRV",
  position: "Backend Engineer",
  status: "closed",
  visibility: "local",
  updatedAt: "2026-08-18",
  introduction: [
    "운영 요구를 backend의 권한·상태·데이터 규칙으로 구체화하고, 이를 API·비동기 작업·검증·배포까지 연결합니다.",
    "MGRV의 홈페이지·PMS·운영 어드민처럼 운영자가 매일 사용하는 제품을 실제로 운영할 수 있는 상태까지 책임지는 방식을 다섯 가지 사례로 설명합니다.",
  ],
  careerBridge: {
    title: "제품에 더 크게 기여하기 위해 책임지는 층을 넓혀 왔습니다",
    summary:
      "AI Engineer와 Product Manager를 거쳐 Backend Engineer가 된 과정은 직무를 바꾼 기록이 아니라, 제품의 판단부터 구현·운영 환경까지 더 넓게 책임지기 위해 역량을 확장해 온 과정입니다.",
    stages: [
      {
        label: "제품 판단",
        text: "AI 제품을 프로토타입에서 초기 제품으로 발전시키는 0→1 구간을 PM으로 통과하며 사용자 문제와 제품 기준을 다뤘습니다.",
        layers: ["Product", "AI"],
        claimIds: ["career.sellercanvas-product-system"],
      },
      {
        label: "백엔드 책임",
        text: "제품 판단을 API·상태·데이터·비동기 경계로 옮기고, 구축과 전환 이후 운영까지 책임지는 Backend Engineer로 역할을 확장했습니다.",
        layers: ["Product", "Backend", "Operations"],
        claimIds: ["career.ai-pm-backend-continuity", "thready.backend-rebuild"],
      },
      {
        label: "운영 환경",
        text: "백엔드 코드에서 멈추지 않고 제품·환경별 Azure·Terraform 인프라와 배포·runbook까지 관리합니다.",
        layers: ["Backend", "Operations", "Infrastructure"],
        claimIds: ["infra.company-azure-ownership"],
      },
    ],
    caption:
      "각 단계는 서로 다른 시기와 프로젝트의 근거입니다. 하나의 제품을 기획부터 인프라까지 단독 구축한 사례로 합성하지 않습니다.",
    claimIds: [
      "career.sellercanvas-product-system",
      "career.ai-pm-backend-continuity",
      "thready.backend-rebuild",
      "infra.company-azure-ownership",
    ],
  },
  outcomes: [
    {
      no: "01",
      title: "운영 요청을 제품 규칙으로 바꾸다",
      caseMode: "cross-project-pattern",
      layers: ["Product", "Backend", "Operations", "AI"],
      status: {
        label: "운영 관리 backend 구축 중",
        tone: "in-progress",
      },
      outcomeLine:
        "운영자가 조회·변경해야 할 상태를 먼저 정의하고, 같은 기준이 구현·검증·배포까지 이어지게 합니다.",
      compositionCaption:
        "서로 다른 제품과 운영 업무에서 반복해 온 판단 방식을 묶었습니다. 각 근거의 역할과 시점은 합산하지 않습니다.",
      narrative: {
        context:
          "운영 어드민과 예약 정책, 제품 운영 업무에서 반복해 온 방식입니다. 현재 진행 중인 작업은 완료형 성과와 구분합니다.",
        problem:
          "운영 요청을 화면 기능으로만 받으면 누가 어떤 상태에서 무엇을 조회·변경할지에 대한 기준이 API·화면·QA·배포에 서로 다르게 남을 수 있습니다.",
        actions: [
          "운영 관리 backend에서는 API의 책임과 데이터 전환 경계를 먼저 정의했습니다.",
          "예약 정책은 backend 판단과 화면 표시, QA, release가 같은 기준을 사용하도록 연결했습니다.",
          "제품 요구와 운영 흐름을 구체화하고, 확정된 결정을 구현·검증·배포 조건으로 바꿨습니다.",
        ],
        resultLabel: "현재 책임 범위",
        result:
          "정책 변경이 코드 한 곳에 머물지 않고, 구현·검증·배포가 같은 기준으로 움직이는 작업 단위를 만들었습니다. 진행 중인 backend도 같은 원칙으로 책임과 데이터 경계를 설계하고 있습니다.",
        visualLead:
          "아래 그림은 특정 시스템의 구조도가 아니라, 제품 판단을 AI 보조와 자동 검증까지 전달하는 현재의 작업 방식입니다.",
        axExtension: {
          title: "제품 판단은 사람이 소유하고, AI에는 실행 가능한 맥락을 전달합니다",
          paragraphs: [
            "사람이 권한·상태·데이터·서비스 경계를 결정하고, 이를 작업 계약과 검증 조건으로 남깁니다.",
            "AI는 정해진 경계 안에서 탐색과 초안·반복 구현을 보조하며, 결과는 자동 검증과 QA를 거쳐 사람이 최종 판단합니다.",
          ],
          claimIds: [
            "be-template.agent-context",
            "nexus.quality-automation",
            "mediness.product-operations",
          ],
        },
      },
      frame: [
        {
          label: "출발점",
          text: "운영 요구가 기능 단위로 전달되어 판단 기준이 구현 곳곳에 흩어진 상태",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "권한·상태·데이터 규칙을 API 책임과 작업 기준으로 명시",
          tone: "decision",
        },
        {
          label: "변화",
          text: "구현·검증·배포가 같은 제품 규칙을 사용",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "화면보다 먼저 조회·변경 주체와 상태, 데이터 규칙을 합의해야 했습니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "운영자·사용자·서비스의 접근 범위가 다르고, 정책 변경이 여러 실행 단계에 함께 전달되어야 했습니다.",
            },
            {
              text: "진행 중인 backend는 구현 사실과 완료 상태를 구분합니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "권한·상태·데이터 규칙을 먼저 정하고 API 책임과 검증 조건에 고정했습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Implementation",
          items: [
            {
              title: "Backend boundary",
              text: "운영 기능의 API 책임과 데이터 전환 경계를 분리했습니다.",
            },
            {
              title: "Product delivery",
              text: "정책 판단을 화면·QA·release 기준까지 연결했습니다.",
            },
            {
              title: "AI-assisted execution",
              text: "확정된 판단을 AI가 소비할 작업 맥락과 자동 검증 조건으로 남겼습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "ax-workflow",
        title: "판단을 실행과 검증으로 전달하는 AX 흐름",
        stages: [
          {
            role: "human",
            label: "Human Judgment",
            items: ["운영 맥락", "권한·상태", "데이터 규칙"],
          },
          {
            role: "contract",
            label: "Work Contract",
            items: ["API 책임", "작업 기준", "검증 조건"],
          },
          {
            role: "ai",
            label: "AI Execution",
            items: ["탐색", "초안", "반복 구현"],
          },
          {
            role: "system",
            label: "Verification",
            items: ["Static·Type", "Test", "QA evidence"],
          },
        ],
        evidenceBands: [
          {
            label: "제품 규칙",
            text: "운영 요구를 권한·상태·데이터와 전달 조건으로 구체화합니다.",
          },
          {
            label: "AX 실행",
            text: "AI의 실행 범위를 정하고 자동 검증 결과를 evidence로 남깁니다.",
          },
        ],
        caption:
          "AI는 결정된 맥락 안에서 구현을 보조하고, 제품·architecture·release의 최종 판단은 사람이 담당합니다.",
      },
      operation: [
        "정책 변경을 구현·검증·배포가 함께 갱신하는 단위로 관리했습니다.",
        "AI가 만든 변경도 자동 검증과 QA evidence를 확인한 뒤 사람이 승인합니다.",
      ],
      limits: [
        "진행 중인 backend를 완료된 제품으로 표현하지 않습니다.",
        "서로 다른 사례를 하나의 end-to-end 시스템으로 합성하지 않습니다.",
      ],
      evidence: [
        {
          project: "운영 관리 backend",
          scope: "API 책임·데이터 전환 경계",
          ownership: "led",
          status: "in-progress",
          relation: "pattern-instance",
          text: "운영 기능의 backend 책임과 데이터 전환 경계를 설계·구축하고 있습니다.",
          claimIds: ["nexus.backend-architecture", "nexus.admin-backend-ownership"],
        },
        {
          project: "제품 전달·운영",
          scope: "정책·작업·검증·release 연결",
          ownership: "led",
          status: "verified",
          relation: "pattern-instance",
          text: "제품 요구를 구현·검증·배포가 함께 사용할 기준으로 구체화하고 운영했습니다.",
          claimIds: [
            "centurion.day-product-integration",
            "mediness.product-system-design-participation",
            "mediness.product-operations",
            "be-template.agent-context",
            "nexus.quality-automation",
          ],
        },
      ],
      claimCeiling: {
        allowed: [
          "운영 기능의 API 책임과 데이터 전환 경계 설계",
          "제품 정책을 구현·검증·배포 기준으로 연결",
          "AI 보조와 자동 검증을 결합한 작업 방식",
        ],
        forbidden: [
          "진행 중인 backend 구축 완료",
          "제품 전체 단독 구축",
          "AI가 제품 판단과 release 결정을 대체",
        ],
      },
      jdFit: {
        matches: [
          "운영팀·PM·frontend·design과 요구사항 구체화",
          "운영 제품의 권한·상태·데이터 규칙 설계",
          "제품 변경을 QA·배포까지 연결하는 backend 역할",
        ],
        boundary: "공유주거·PMS 직접 경험이 아니라 운영 제품에 적용해 온 설계 방식을 설명합니다.",
      },
      claimIds: [
        "nexus.backend-architecture",
        "nexus.admin-backend-ownership",
        "centurion.day-product-integration",
        "mediness.product-system-design-participation",
        "mediness.product-operations",
        "be-template.agent-context",
        "nexus.quality-automation",
      ],
    },
    {
      no: "02",
      title: "비동기 작업의 실패를 복구 가능한 상태로 만들다",
      caseMode: "primary-with-prior-lesson",
      layers: ["Backend", "Operations"],
      outcomeLine:
        "Async FastAPI와 실행 모델을 맞추고, 비동기 작업의 상태·재시도·운영자 복구 경계를 함께 설계했습니다.",
      compositionCaption:
        "주문·재고 backend가 중심 사례이고, 이전 결제 보상 경험은 예방 설계의 배경으로만 사용합니다.",
      narrative: {
        context: "피부과 운영 제품의 주문·상품·재고·알림 backend입니다.",
        problem:
          "비동기 처리는 이미 분리돼 있었지만 FastAPI와 worker의 실행 모델이 달랐고, 작업 실패를 확인하고 복구할 책임도 더 명확히 정해야 했습니다.",
        actions: [
          "async FastAPI와 worker 실행 모델의 정합성을 기준으로 TaskIQ·RabbitMQ를 선택했습니다.",
          "작업 상태와 재시도, 최종 실패 기록, 운영자 재처리 경계를 하나의 운영 흐름으로 설계했습니다.",
          "API와 worker 흐름을 test·CI·local setup에서 함께 재현하도록 검증 기반을 만들었습니다.",
        ],
        resultLabel: "현재 책임 범위",
        result:
          "API 요청과 후속 작업의 책임이 분리됐고, 실패한 작업은 기록에서 사라지지 않은 채 자동 재시도와 운영자 복구 경로로 이어지게 됐습니다.",
        visualLead:
          "아래 그림은 API가 작업을 접수한 뒤 worker가 실행하고, 실패를 기록·복구하는 운영 경계를 보여줍니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "API와 worker의 실행 모델과 실패 책임이 분리되지 않은 상태",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "Async 실행 모델과 상태 기반 복구를 함께 설계",
          tone: "decision",
        },
        {
          label: "변화",
          text: "실패를 확인하고 다시 처리할 수 있는 운영 경계",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "비동기 분리 자체보다 FastAPI와 worker의 실행 모델, 실패 이후의 책임을 맞추는 것이 문제였습니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "기존 broker를 유지하면서 async 함수와 application dependency를 자연스럽게 다뤄야 했습니다.",
            },
            {
              text: "재시도 이후에도 실패한 작업을 운영자가 확인하고 다시 처리할 수 있어야 했습니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "Async FastAPI와의 정합성을 기준으로 TaskIQ·RabbitMQ를 선택하고, 상태와 복구 책임을 worker 경계에 뒀습니다.",
            },
          ],
        },
        {
          kind: "alternatives",
          label: "Alternatives",
          items: [
            {
              title: "기존 worker 유지",
              text: "기존 비동기 분리는 유지할 수 있지만 실행 모델을 맞추려는 목적에 적합하지 않아 채택하지 않았습니다.",
              verdict: "rejected",
            },
            {
              title: "TaskIQ·RabbitMQ 전환",
              text: "Async 함수와 application dependency를 같은 실행 모델에서 다룰 수 있어 채택했습니다.",
              verdict: "selected",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Implementation",
          items: [
            {
              title: "Runtime boundary",
              text: "API와 후속 작업의 실행 책임을 분리했습니다.",
            },
            {
              title: "Failure recovery",
              text: "작업 상태·재시도·실패 기록·운영자 재처리를 연결했습니다.",
            },
            {
              title: "Verification",
              text: "API·broker·worker 흐름을 test와 CI에서 반복 검증했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "runtime-recovery",
        title: "실패를 숨기지 않는 worker runtime",
        request: "API · 작업 접수",
        worker: "TaskIQ·RabbitMQ worker",
        states: ["접수", "처리 중", "완료"],
        failure: "실패 상태 기록",
        recovery: ["자동 재시도", "운영자 확인", "재처리"],
        priorLesson: "이전 결제 보상 경험을 예방 설계 기준으로 활용",
        caption:
          "TaskIQ 전환의 핵심은 비동기를 처음 도입한 것이 아니라, 실행 모델과 실패 복구 책임을 운영 가능한 형태로 다시 정한 데 있습니다.",
      },
      operation: [
        "실패한 작업은 상태와 이력을 남기고 자동 재시도와 운영자 재처리로 이어집니다.",
        "API·broker·worker를 test·CI·local setup에서 함께 재현합니다.",
      ],
      limits: [
        "Exactly-once나 성능 개선 수치를 주장하지 않습니다.",
        "이전 worker가 비동기 처리를 지원하지 않았다고 표현하지 않습니다.",
      ],
      evidence: [
        {
          project: "주문·재고 backend",
          scope: "Async 실행 모델·실패 복구",
          ownership: "led",
          status: "verified",
          relation: "primary",
          text: "TaskIQ·RabbitMQ 전환과 작업 상태·재시도·실패 기록·재처리 경계 구축을 주도했습니다.",
          claimIds: ["centurion.bay-async-backend", "centurion.async-migration"],
        },
        {
          project: "검증 기반·이전 경험",
          scope: "Test·CI·보상 흐름",
          ownership: "led",
          status: "verified",
          relation: "corroborating",
          text: "API test·CI·onboarding을 구축했고, 이전 결제 보상 경험을 예방 설계 기준으로 활용했습니다.",
          claimIds: ["centurion.test-ci-foundation", "career.memento-payment"],
        },
      ],
      claimCeiling: {
        allowed: [
          "Async FastAPI에 맞춘 TaskIQ·RabbitMQ 전환",
          "상태·재시도·실패 기록·운영자 재처리 경계 구축",
          "API·worker test와 CI 구축",
        ],
        forbidden: [
          "Exactly-once 보장",
          "성능·장애 개선 수치",
          "비동기 처리를 처음 도입했다는 표현",
        ],
      },
      jdFit: {
        matches: [
          "Python async backend와 background worker",
          "상태·재시도·실패 기록을 포함한 운영 안정성",
          "Test·CI·local setup을 통한 재현 가능한 검증",
        ],
      },
      claimIds: [
        "centurion.bay-async-backend",
        "centurion.async-migration",
        "centurion.test-ci-foundation",
        "career.memento-payment",
      ],
    },
    {
      no: "03",
      title: "기존 사용자 경로를 보호하며 backend를 전환하다",
      caseMode: "single-system",
      layers: ["Product", "Backend", "Operations", "AI"],
      outcomeLine:
        "초기 프로토타입의 기존 화면을 유지하면서 FastAPI backend를 병렬 구축·검증하고, 실제 사용자 운영까지 이어갔습니다.",
      compositionCaption:
        "한 AI 콘텐츠 제품의 backend 전환과 이후 운영 사례입니다. Frontend 포함 제품 전체 구축으로 확대하지 않습니다.",
      narrative: {
        context:
          "초기 프로토타입 이후 합류해 backend 전환과 release·QA·운영을 맡은 AI 콘텐츠 제품입니다.",
        problem:
          "Backend 구조를 바꿔야 했지만 이미 동작하는 사용자 경로까지 한꺼번에 교체하면 변경 범위와 검증 부담이 커질 수 있었습니다.",
        actions: [
          "Frontend와 사용자 경로는 유지하고 새 FastAPI backend와 데이터 전환 경로를 병렬로 구축했습니다.",
          "Architecture·component·infra validation harness를 먼저 세워 변경 범위와 완료 조건을 고정했습니다.",
          "정적 검사·test·실제 API scenario를 통과한 뒤 backend 경로를 전환하고 release·QA·운영을 이어갔습니다.",
        ],
        resultLabel: "현재 책임 범위",
        result:
          "기존 사용자 경로를 보호한 채 backend를 전환했고, 이후 실제 사용자가 쓰는 제품의 release·QA·backend 운영까지 지속했습니다.",
        visualLead:
          "아래 그림은 사용자 경로와 backend 변경을 분리해 병렬로 검증한 뒤 운영으로 전환한 순서입니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "동작하는 사용자 경로를 유지하며 backend 구조를 바꿔야 하는 상태",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "Frontend는 유지하고 backend와 데이터 전환만 병렬 구축",
          tone: "decision",
        },
        {
          label: "변화",
          text: "검증 후 전환하고 실제 사용자 운영까지 지속",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "제품의 기존 사용자 경로를 보호하면서 backend 책임과 데이터 구조를 다시 세워야 했습니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "Frontend까지 동시에 교체하면 변경 범위와 QA 부담이 함께 커질 수 있었습니다.",
            },
            {
              text: "Backend와 데이터 전환은 실제 API scenario까지 검증한 뒤 운영 경로에 반영해야 했습니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "기존 화면을 유지하고 backend만 별도 경로에서 구축·검증한 뒤 단계적으로 전환했습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Implementation",
          items: [
            {
              title: "Harness first",
              text: "Architecture·component·infra validation harness로 완료 조건을 먼저 고정했습니다.",
            },
            {
              title: "Parallel backend",
              text: "새 FastAPI backend와 데이터 전환 경로를 기존 사용자 흐름과 분리해 구축했습니다.",
            },
            {
              title: "Cutover gate",
              text: "정적 검사·test·actual API scenario를 통과한 뒤 운영 backend를 전환했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "cutover-map",
        title: "사용자 경로와 backend 변경을 분리한 cutover map",
        phases: ["기존 운영", "범위 결정", "병렬 구축", "검증 gate", "운영 전환"],
        lanes: [
          {
            label: "사용자 경로",
            tone: "continuity",
            nodes: [
              {
                phase: 0,
                span: 5,
                text: "기존 화면과 사용자 경로 유지",
              },
            ],
          },
          {
            label: "Backend · Data",
            tone: "change",
            nodes: [
              { phase: 0, text: "기존 backend" },
              { phase: 1, text: "Backend only", emphasis: "selected" },
              { phase: 2, text: "FastAPI · data transition" },
              { phase: 3, text: "Backend cutover", emphasis: "gate" },
              { phase: 4, text: "운영 지속" },
            ],
          },
          {
            label: "검증 · 운영",
            tone: "verification",
            nodes: [
              { phase: 1, text: "Validation harness" },
              { phase: 2, text: "Static · test" },
              { phase: 3, text: "Actual API scenario", emphasis: "gate" },
              { phase: 4, text: "Release · QA · operation", emphasis: "evidence" },
            ],
          },
        ],
        caption:
          "기존 화면을 유지한 채 backend를 병렬로 바꾸고, 검증을 통과한 시점에 운영 경로를 전환했습니다.",
      },
      operation: [
        "Backend 전환 이후 release·QA·운영을 이어가며 실제 사용자 경로를 유지했습니다.",
        "운영 신호는 개선율로 과장하지 않고 관측 가능한 evidence로 확인합니다.",
      ],
      limits: [
        "Frontend 포함 제품 전체 재구축으로 표현하지 않습니다.",
        "무중단 전환이나 정량 개선을 주장하지 않습니다.",
      ],
      evidence: [
        {
          project: "AI 콘텐츠 제품",
          scope: "Prototype 이후 backend 전환",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "초기 프로토타입 이후 FastAPI backend를 구축·전환하고 실제 사용자 운영까지 연결했습니다.",
          claimIds: ["thready.prototype-to-user-operation", "thready.backend-rebuild"],
        },
        {
          project: "AI 콘텐츠 제품",
          scope: "Release·QA·backend 운영",
          ownership: "owned",
          status: "verified",
          relation: "corroborating",
          text: "검증 후 backend 경로를 전환하고 release·QA·운영을 지속했습니다.",
          claimIds: ["thready.rebuild-decision-execution", "thready.release-operation"],
        },
      ],
      claimCeiling: {
        allowed: [
          "기존 사용자 경로를 유지한 FastAPI backend 병렬 구축·전환",
          "실제 사용자 운영까지 backend release·QA·운영 지속",
        ],
        forbidden: [
          "Frontend 포함 제품 전체 단독 구축",
          "무중단 전환 보장",
          "측정되지 않은 정량 개선",
        ],
      },
      jdFit: {
        matches: [
          "Legacy refactoring과 backend 구조 개선",
          "운영 중인 사용자 경로 보호",
          "Data transition·test·API 검증 후 배포",
          "QA·release를 포함한 운영 안정화",
        ],
      },
      claimIds: [
        "thready.prototype-to-user-operation",
        "thready.backend-rebuild",
        "thready.rebuild-decision-execution",
        "thready.release-operation",
        "thready.production-operation-quality",
      ],
    },
    {
      no: "04",
      title: "제품 코드를 배포·운영 환경까지 연결하다",
      caseMode: "primary-with-prior-lesson",
      layers: ["Backend", "Operations", "Infrastructure"],
      outcomeLine:
        "Azure·Terraform 인프라를 제품·환경별로 관리하며 backend 변경을 배포·관측·runbook까지 연결했습니다.",
      compositionCaption:
        "회사 Azure·Terraform 운영이 중심 근거이고, 이전 cloud 경험은 별도 사례의 선행 경험으로만 사용합니다.",
      narrative: {
        context:
          "여러 제품의 backend와 Azure·Terraform 인프라를 함께 운영하며 delivery 책임을 맡고 있습니다.",
        problem:
          "Backend 변경이 코드 배포에서 끝나면 환경 차이와 운영 절차가 별도 지식으로 남아 재현성과 대응 속도가 떨어질 수 있습니다.",
        actions: [
          "제품과 환경별 IaC 경계를 유지하고 변경 이력과 검토 기준을 코드에 남겼습니다.",
          "Backend 변경을 배포 경로와 검증, 관측 가능한 운영 상태까지 연결했습니다.",
          "반복되는 배포·대응 절차를 runbook으로 관리해 코드와 운영 절차가 함께 바뀌게 했습니다.",
        ],
        resultLabel: "현재 책임 범위",
        result:
          "제품별 변경 범위를 분리하면서도 backend 변경이 IaC·배포·관측·runbook에서 끊기지 않는 delivery 경계를 유지하고 있습니다.",
        visualLead:
          "아래 그림은 개별 resource topology가 아니라, 제품·환경별 변경을 운영 상태까지 닫는 책임 범위를 보여줍니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "Backend 코드와 배포·운영 절차가 서로 다른 기준으로 관리될 수 있는 상태",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "제품·환경별 IaC와 delivery 경계를 함께 관리",
          tone: "decision",
        },
        {
          label: "변화",
          text: "코드 변경을 배포·관측·runbook까지 연결",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "여러 제품의 backend 변경을 각 환경의 배포·운영 절차와 일관되게 연결해야 했습니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "이미 운영 중인 환경을 유지하면서 제품·환경별 변경 범위를 분리해야 했습니다.",
            },
            {
              text: "구체적인 resource·cost·security 정보는 공개 범위에서 제외합니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "Infrastructure를 사후 작업으로 두지 않고 backend delivery와 같은 운영 책임 안에서 관리했습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Implementation",
          items: [
            {
              title: "IaC boundary",
              text: "제품·환경별 변경 경계와 검토 기준을 Terraform에 유지했습니다.",
            },
            {
              title: "Delivery",
              text: "배포 경로와 검증 절차를 backend 변경과 함께 관리했습니다.",
            },
            {
              title: "Operation",
              text: "관측 가능한 상태와 반복 대응 절차를 runbook으로 연결했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "infra-ownership",
        title: "제품 변경을 운영 상태까지 연결하는 infrastructure ownership",
        productBoundaries: ["제품별", "환경별"],
        layers: [
          {
            label: "IaC",
            items: ["변경 이력", "환경 분리", "검토 기준"],
            owned: true,
          },
          {
            label: "Delivery",
            items: ["배포 경로", "검증 절차", "변경 관리"],
            owned: true,
          },
          {
            label: "Operation",
            items: ["상태 확인", "관측", "Runbook"],
            owned: true,
          },
        ],
        caption:
          "개별 resource topology가 아니라, Azure·Terraform으로 제품·환경별 변경을 배포와 운영까지 연결한 책임 범위입니다.",
      },
      operation: [
        "제품·환경별 Azure·Terraform 변경과 실제 운영 환경을 관리합니다.",
        "배포·관측·runbook을 backend 변경과 함께 갱신합니다.",
      ],
      limits: [
        "구체적인 resource topology와 security detail을 공개하지 않습니다.",
        "비용·배포 시간의 정량 개선을 주장하지 않습니다.",
      ],
      evidence: [
        {
          project: "회사 Cloud Infrastructure",
          scope: "Azure·Terraform 운영",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "회사 Azure·Terraform 인프라의 설계·구축·운영과 제품·환경별 delivery를 담당합니다.",
          claimIds: ["infra.company-azure-ownership"],
        },
        {
          project: "제품별 delivery 경험",
          scope: "IaC·배포·runbook",
          ownership: "owned",
          status: "verified",
          relation: "corroborating",
          text: "서로 다른 제품에서 IaC·배포·운영 문서를 backend delivery와 연결했습니다.",
          claimIds: [
            "nexus.terraform-infra",
            "centurion.shared-infra",
            "career.tellingme-backend-infra",
          ],
        },
      ],
      claimCeiling: {
        allowed: [
          "회사 Azure·Terraform 인프라 설계·구축·운영 담당",
          "제품·환경별 IaC·배포·runbook 연결",
        ],
        forbidden: [
          "구체적인 resource topology·security detail",
          "비용·배포 시간 정량 개선",
          "모든 인프라를 최초부터 단독 구축",
        ],
      },
      jdFit: {
        matches: [
          "Docker·CI/CD·cloud 기반 배포와 운영",
          "Backend 변경을 인프라·배포·관측까지 연결",
          "운영 안정화와 장애 대응 절차",
        ],
        boundary: "Infra Engineer 포지셔닝이 아니라 backend delivery를 운영 상태까지 닫는 역량으로 설명합니다.",
      },
      claimIds: [
        "infra.company-azure-ownership",
        "nexus.terraform-infra",
        "centurion.shared-infra",
        "career.tellingme-backend-infra",
      ],
    },
    {
      no: "05",
      title: "제품 원장과 AI 실행의 책임을 분리하다",
      caseMode: "single-system",
      layers: ["Product", "Backend", "Operations", "AI"],
      status: {
        label: "검증 환경에서 구현·테스트",
        tone: "pre-production",
      },
      outcomeLine:
        "제품 원장과 AI 실행의 책임을 분리하고, Outbox·retry·version guard로 전달 실패와 역순 반영을 다루도록 설계했습니다.",
      compositionCaption:
        "한 AI 콘텐츠 제품의 service boundary와 durable delivery 사례입니다. 검증 환경의 구현·테스트 범위까지만 설명합니다.",
      narrative: {
        context:
          "AI 기능을 독립된 실행 경계로 분리하며 제품 데이터와 생성 실행의 책임을 다시 정한 사례입니다.",
        problem:
          "서비스를 분리하면 API 호출만 추가하는 것이 아니라 데이터 소유권, 일시적 전달 실패, 재시도와 역순 반영을 함께 다뤄야 합니다.",
        actions: [
          "제품 정책·원장과 AI 생성 lifecycle·실행 상태의 소유권을 서비스 경계로 분리했습니다.",
          "원장 변경과 Outbox 기록을 같은 transaction에 두고 실제 전달은 retry 가능한 흐름으로 분리했습니다.",
          "Version guard로 역순 전달이 최신 상태를 덮지 않게 하고, 검증 환경에서 경계·실패·재시도 시나리오를 테스트했습니다.",
        ],
        resultLabel: "검증 상태",
        result:
          "검증 환경에서 서비스 책임과 durable delivery 경계를 구현·테스트해, 전달 실패와 재시도·역순 반영을 코드와 검증 조건으로 다룰 수 있게 했습니다.",
        visualLead:
          "아래 그림은 제품 원장과 AI 실행을 분리하고, 그 사이의 전달을 durable record와 version guard로 보호하는 개념도입니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "제품 정책과 AI 실행의 데이터·실패 책임을 분리해야 하는 상태",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "원장과 AI 실행을 나누고 durable delivery 경계를 설계",
          tone: "decision",
        },
        {
          label: "검증 상태",
          text: "실패·재시도·역순 반영을 검증 환경에서 테스트",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "제품 원장과 AI 실행을 분리하면서도 상태 전달의 일관성을 지켜야 했습니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "일시적 장애·재시도·역순 전달이 최신 원장 상태를 훼손하지 않아야 했습니다.",
            },
            {
              text: "현재 공개 범위는 검증 환경의 설계·구현·테스트입니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "제품 원장과 AI 실행의 소유권을 분리하고 Outbox·retry·version guard로 전달 경계를 보호했습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Implementation",
          items: [
            {
              title: "Ownership boundary",
              text: "제품 정책·원장과 AI 생성 lifecycle·실행 상태의 책임을 나눴습니다.",
            },
            {
              title: "Durable delivery",
              text: "원장 변경과 전달 의도를 같은 transaction에 기록하고 전달은 재시도 가능하게 분리했습니다.",
            },
            {
              title: "Version guard",
              text: "역순 전달이 최신 상태를 덮지 않도록 version 기준을 적용하고 테스트했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "ai-system",
        title: "제품 원장과 AI 실행 사이의 durable delivery",
        ownership: {
          productBackend: {
            label: "Product Core",
            database: "Source of truth",
            owns: ["제품 정책", "원장 데이터", "권한·상태 규칙"],
          },
          aiRuntime: {
            label: "AI Execution",
            database: "Execution state",
            owns: ["생성 lifecycle", "실행 상태", "생성 결과"],
          },
        },
        transaction: {
          label: "Same transaction",
          items: ["State change", "Delivery intent"],
          outbox: "Durable delivery record",
        },
        delivery: {
          worker: "Delivery process",
          retry: "Retry policy",
          transport: "Service boundary",
          authentication: "Protected contract",
        },
        versionFence: {
          rule: "Version guard",
          outcomes: ["최신 상태 보호", "역순 반영 차단", "재시도 허용"],
        },
        verificationRail: ["경계 회귀", "전달 실패", "재시도", "역순 반영"],
        caption:
          "제품 원장과 AI 실행을 분리하고 전달 실패는 durable record·retry·version guard로 다룹니다. 검증 환경의 구현·테스트 범위입니다.",
      },
      operation: [
        "검증 환경에서 서비스 경계와 전달 실패·재시도·역순 반영 시나리오를 테스트했습니다.",
        "현재 문안은 설계·구현·검증 범위까지만 주장합니다.",
      ],
      limits: [
        "검증 환경 밖의 운영 결과로 확대하지 않습니다.",
        "Exactly-once·data loss 0건·무중단 운영을 주장하지 않습니다.",
      ],
      evidence: [
        {
          project: "AI 콘텐츠 제품",
          scope: "Product core·AI execution boundary",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "제품 원장과 AI 실행의 책임을 분리하고 서비스 경계를 구현·테스트했습니다.",
          claimIds: ["thready.ai-service-boundary"],
        },
        {
          project: "AI 콘텐츠 제품",
          scope: "Outbox·retry·version guard",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "원장 변경과 durable record를 함께 남기고 retry·version guard로 전달 경계를 검증했습니다.",
          claimIds: ["thready.ai-replica-outbox"],
        },
      ],
      claimCeiling: {
        allowed: [
          "제품 원장과 AI 실행의 책임 분리",
          "Outbox·retry·version guard 설계·구현",
          "검증 환경에서 실패·재시도·역순 반영 테스트",
        ],
        forbidden: [
          "검증 환경 밖의 운영 성과",
          "Exactly-once·data loss 0건·무중단 운영",
          "전체 AI platform 단독 구축",
        ],
      },
      jdFit: {
        matches: [
          "제품 정책과 AI 실행의 service boundary",
          "RDBMS transaction과 background delivery 정합성",
          "Retry·failure·version guard를 포함한 운영 안정성",
        ],
        boundary: "MGRV에 직접 적용한 사례가 아니라 검증된 설계·구현 경험의 전이 가능성을 설명합니다.",
      },
      claimIds: ["thready.ai-service-boundary", "thready.ai-replica-outbox"],
    },
  ],
  workSystem: {
    title: "판단은 사람이, 실행은 AI가, 검증은 시스템이 맡습니다",
    summary: [
      "AI의 속도는 architecture와 작업 경계가 먼저 정해져 있을 때 제품 결과로 이어집니다.",
      "문제 정의와 release decision은 사람이 소유하고, AI는 정해진 범위의 실행을 보조하며, 자동 검증은 결과를 evidence로 남깁니다.",
    ],
    foundation: [
      "Layered architecture·DI·ADR·convention·runbook 기반 FastAPI foundation",
      "AI가 소비할 수 있는 계층적 context와 반복 작업 automation",
      "Static analysis·type check·test·CI·API documentation",
    ],
    lanes: [
      {
        kind: "human",
        label: "Human Judgment",
        items: ["문제 정의", "제약 판단", "상태 규칙", "Architecture", "Release decision"],
      },
      {
        kind: "ai",
        label: "AI Execution",
        items: ["Codebase 탐색", "대안 비교", "초안 작성", "반복 구현"],
      },
      {
        kind: "automated",
        label: "Automated Verification",
        items: ["Static analysis", "Type check", "Test", "CI", "Release evidence"],
      },
    ],
    qualityLab: {
      title: "AI 결과를 세 단계로 검증합니다",
      description:
        "자동 검사는 반복 가능한 조건을 확인하고, 측정은 실제 결과를 대조하며, 최종 제품 판단은 사람이 맡습니다.",
      automated: ["규칙 기반 검사", "형식 오류 차단"],
      measurement: ["실측 데이터 대조", "기준 재점검"],
      human: ["제품 품질 판단", "Release decision"],
      boundary:
        "자동 검증은 제품의 정답을 대신하지 않으며, 별도 품질 검증 경험을 일반 작업 원칙으로 정리한 것입니다.",
      claimIds: ["thready.quality-criteria-system", "thready.measurement-correction"],
    },
    evidence: [
      {
        project: "공통 backend foundation",
        scope: "Architecture·AI context·automation",
        ownership: "owned",
        status: "verified",
        relation: "primary",
        text: "공통 backend 구조와 AI 작업 맥락, 반복 작업 자동화를 설계·구축했습니다.",
        claimIds: [
          "be-template.backend-standard",
          "be-template.team-leverage",
          "be-template.agent-context",
        ],
      },
      {
        project: "제품별 검증·운영",
        scope: "Static·type·test·QA·release evidence",
        ownership: "led",
        status: "verified",
        relation: "corroborating",
        text: "제품별로 자동 검증과 QA·release 근거를 연결하고, 사람의 최종 판단 범위를 유지했습니다.",
        claimIds: [
          "mediness.product-operations",
          "nexus.quality-automation",
          "centurion.test-ci-foundation",
          "thready.rebuild-decision-execution",
          "thready.quality-criteria-system",
          "thready.measurement-correction",
        ],
      },
    ],
    limits: [
      "AI가 제품 판단·architecture·release decision을 대신한다고 표현하지 않습니다.",
      "자동 검증 통과를 실서비스 안전성이나 정량 생산성 향상으로 확대하지 않습니다.",
    ],
    claimIds: [
      "be-template.backend-standard",
      "be-template.team-leverage",
      "be-template.agent-context",
      "mediness.product-operations",
      "nexus.quality-automation",
      "centurion.test-ci-foundation",
      "thready.rebuild-decision-execution",
      "thready.quality-criteria-system",
      "thready.measurement-correction",
    ],
  },
} satisfies TailoredPortfolio;
