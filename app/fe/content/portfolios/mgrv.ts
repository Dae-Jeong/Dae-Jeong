import type { TailoredPortfolio } from "./types";

export const MGRV_PORTFOLIO = {
  slug: "mgrv",
  companyName: "MGRV",
  position: "Backend Engineer",
  status: "approved",
  updatedAt: "2026-08-17",
  introduction: [
    "운영 요구를 backend의 권한·상태·데이터 규칙으로 구체화하고, 이를 API·비동기 작업·검증·배포까지 연결합니다.",
    "MGRV의 홈페이지·PMS·운영 어드민처럼 운영자가 매일 사용하는 제품을 실제로 운영할 수 있는 상태까지 책임지는 방식을 다섯 가지 사례로 설명합니다.",
  ],
  careerBridge: {
    title: "제품에 더 크게 기여하기 위해 책임지는 층을 넓혀 왔습니다",
    summary:
      "AI Engineer와 PM을 거쳐 Backend Engineer가 된 과정은 직무를 바꿔 온 이력이 아니라, 제품의 판단부터 구현·운영 환경까지 더 넓게 책임지기 위해 역량을 확장해 온 과정입니다.",
    stages: [
      {
        label: "제품 판단",
        text: "AI 제품을 프로토타입에서 v1.0으로 세우는 0→1 구간을 PM으로 통과하며 사용자 문제와 제품 기준을 다뤘습니다.",
        layers: ["Product", "AI"],
        claimIds: ["career.sellercanvas-product-system"],
      },
      {
        label: "백엔드 책임",
        text: "제품 판단을 API·상태·데이터·비동기 경계로 옮기고, 구축·재구축 이후 운영까지 책임지는 Backend Engineer로 역할을 확장했습니다.",
        layers: ["Product", "Backend", "Operations"],
        claimIds: ["career.ai-pm-backend-continuity", "thready.backend-rebuild"],
      },
      {
        label: "운영 환경",
        text: "백엔드 코드에서 멈추지 않고 제품·환경별 Azure·Terraform 인프라와 배포·runbook까지 직접 관리합니다.",
        layers: ["Backend", "Operations", "Infrastructure"],
        claimIds: ["infra.company-azure-ownership"],
      },
    ],
    caption:
      "각 단계는 서로 다른 시기와 프로젝트의 근거입니다. 하나의 제품을 기획부터 인프라까지 단독 구축한 end-to-end 사례로 합성하지 않습니다.",
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
        label: "NEXUS 구축 진행 중",
        tone: "in-progress",
      },
      outcomeLine:
        "운영자가 조회·변경해야 할 상태를 먼저 정의하고, 확정된 판단을 사람·AI·자동 검증이 함께 소비할 수 있는 작업 계약으로 남깁니다.",
      compositionCaption:
        "제품 규칙 근거(NEXUS·DAY·MEDINESS 설계 참여·제품 운영)와 현재 AX 실행 근거(BE Template·NEXUS 품질 자동화)를 분리합니다. 각 근거의 ownership과 시점을 하나의 시스템이나 과거 AI 성과로 합성하지 않습니다.",
      narrative: {
        context:
          "서로 다른 피부과 운영 관리 제품과 제품 운영 업무에서 반복해 온 방식입니다. NEXUS backend는 현재 구축 중입니다.",
        problem:
          "운영 요청은 보통 화면 기능으로 전달되지만, 화면부터 만들면 누가 어떤 상태에서 무엇을 조회·변경할지에 대한 기준이 API·화면·QA·배포에 서로 다르게 남을 수 있습니다.",
        actions: [
          "NEXUS 운영 어드민과 홈페이지 backend에서는 두 API의 책임을 분리하고 gateway·데이터 이전 경계를 설계·구축하고 있습니다.",
          "Centurion DAY 예약 정책에서는 backend 판단을 화면 표시, QA seed·test, release 문서까지 같은 기준으로 연결했습니다.",
          "MEDINESS 서비스 구현은 담당 개발자들이 맡았고, 저는 제품 요구와 운영 흐름을 구체화하는 설계에 참여했습니다. 이후 확정된 결정을 SPEC·Work Package·QA 승인·release gate까지 이어지게 운영했습니다.",
        ],
        resultLabel: "남은 상태",
        result:
          "NEXUS는 구축 진행 중입니다. DAY와 제품 운영에서는 정책 변경이 코드 한 곳에 머물지 않고 구현·검증·배포가 같은 기준으로 움직이는 작업 단위를 만들었습니다.",
        visualLead:
          "아래 그림은 과거 세 사례를 하나의 pipeline으로 합친 것이 아니라, 그 판단 방식을 현재의 Agent Context와 품질 자동화 근거로 확장한 AX 작업 흐름입니다.",
        axExtension: {
          title: "제품 판단을 넘기지 않고, 실행 가능한 맥락을 AI에 전달합니다",
          paragraphs: [
            "여기서 AX는 AI에 제품 판단을 넘기는 것이 아닙니다. 사람이 권한·상태·데이터·서비스 경계를 결정하고, 이를 ADR·SPEC·Work Package·Agent Context 같은 작업 계약으로 남겨 AI가 codebase 탐색·초안·반복 구현을 보조할 수 있게 합니다.",
            "AI가 만든 변경은 static·type·test와 QA·release evidence로 검증합니다. Architecture와 release의 최종 판단·승인은 사람이 맡습니다.",
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
          text: "운영 요구가 화면 기능 단위로 전달되어 판단 기준이 구현 곳곳에 흩어지는 상태",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "조회·변경 권한, 상태 전이, 데이터 규칙을 API 계약과 서비스 경계로 명시",
          tone: "decision",
        },
        {
          label: "운영 상태",
          text: "운영 어드민·API·QA·배포가 같은 정책 변경을 각자의 실행 단위에서 반영",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "운영 요청은 화면이나 기능의 형태로 들어오지만, 실제 설계 문제는 누가 어떤 상태에서 무엇을 조회하고 변경할 수 있는지를 정하는 일입니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "운영자·사용자·서비스마다 접근 범위가 다르고, 정책 변경이 backend·frontend·QA·release에 함께 전달되어야 합니다.",
            },
            {
              text: "NEXUS backend는 2026년 8월 기준 구축 진행 중이므로 완료형 표현을 사용하지 않습니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "화면보다 권한·상태·데이터 규칙을 먼저 정하고, 이를 API 계약과 service boundary에 고정했습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Implementation",
          items: [
            {
              title: "Backend boundary",
              text: "운영 어드민과 홈페이지 API를 독립된 모듈로 두고 gateway와 migration flow를 연결했습니다.",
            },
          {
            title: "Product delivery",
            text: "예약 정책을 backend 판단·화면 표시·QA seed와 test·release 문서로 묶었습니다.",
          },
          {
            title: "Product flow design",
            text: "MEDINESS 서비스 구현 담당자와 제품 요구·운영 흐름을 구체화하는 설계에 참여했습니다.",
          },
          {
            title: "Operating gate",
              text: "의사결정 기록·작업 명세·QA 승인·배포 기준을 연결했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "ax-workflow",
        title: "제품 판단을 작업 계약으로 남기고, AI 실행과 검증을 분리하는 흐름",
        stages: [
          {
            role: "human",
            label: "운영 요구",
            items: ["사용자·운영자 맥락 확인", "문제와 목표 합의"],
          },
          {
            role: "human",
            label: "사람 판단",
            items: ["권한·상태 전이 결정", "데이터·서비스 경계 결정"],
          },
          {
            role: "contract",
            label: "작업 계약",
            items: ["ADR·SPEC·Work Package", "Agent Context"],
          },
          {
            role: "ai",
            label: "AI 실행",
            items: ["codebase 탐색 보조", "초안·반복 구현 보조"],
          },
          {
            role: "system",
            label: "자동 검증",
            items: ["Ruff·Pyright·pre-commit", "static·type·test evidence"],
          },
          {
            role: "human",
            label: "사람 승인",
            items: ["QA·release evidence 확인", "architecture·release 최종 판단"],
          },
        ],
        evidenceBands: [
          {
            label: "제품 규칙 전달 근거",
            text: "NEXUS boundary·DAY 제품 전달·MEDINESS 제품 요구와 운영 흐름 설계 참여·Product Operations gate는 서로 다른 scope와 ownership의 근거입니다.",
          },
          {
            label: "AX 실행 방식 근거",
            text: "BE Template의 Agent Context·automation은 owned·verified, NEXUS 품질 자동화는 led·in-progress 근거로 구분합니다.",
          },
        ],
        caption:
          "AI는 결정된 맥락 안에서 탐색과 구현을 보조하고, 자동 검증은 evidence를 만듭니다. 제품·architecture·release의 최종 판단은 사람이 담당합니다.",
      },
      operation: [
        "정책 변경을 backend·frontend·QA·release가 함께 갱신하는 작업 단위로 관리했습니다.",
        "제품 결정과 작업·QA 승인·release evidence가 중간에서 끊기지 않게 운영했습니다.",
        "확정된 판단을 ADR·SPEC·Work Package·Agent Context로 남겨 AI가 같은 기준을 소비하게 합니다.",
        "AI output은 자동 검증과 QA·release evidence를 통과한 뒤 사람이 최종 판단합니다.",
      ],
      limits: [
        "공유주거·PMS를 직접 운영한 경험으로 확장하지 않습니다.",
      "세 작업 맥락의 근거를 하나의 end-to-end 구축 사례로 표현하지 않습니다.",
      "NEXUS는 Centurion 제품군의 repository label이며 DAY와 별도 제품으로 세지 않습니다.",
        "NEXUS backend는 진행 중이므로 완료형 결과를 주장하지 않습니다.",
        "MEDINESS 서비스 직접 구현이나 architecture·시스템 구조 설계 주도·전담을 주장하지 않습니다.",
        "운영 시간이나 오류 감소 같은 미측정 효과를 추가하지 않습니다.",
        "AI가 제품 판단·architecture·release 결정을 대신하거나 세 사례를 end-to-end로 수행한 것으로 표현하지 않습니다.",
        "완전 자동화와 생산성·품질의 정량 향상은 주장하지 않습니다.",
      ],
      evidence: [
        {
          project: "NEXUS",
          scope: "운영 어드민·홈페이지 backend boundary",
          ownership: "led",
          status: "in-progress",
          relation: "pattern-instance",
          text: "운영 어드민·홈페이지 API를 독립 모듈로 둔 backend monorepo와 gateway·migration flow를 설계·구축하고 있습니다.",
          claimIds: ["nexus.backend-architecture", "nexus.admin-backend-ownership"],
        },
        {
          project: "Centurion DAY",
          scope: "예약 정책의 제품 전달",
          ownership: "led",
          status: "verified",
          relation: "pattern-instance",
          text: "예약 정책의 backend·frontend·QA·release 연결을 리드했습니다.",
          claimIds: ["centurion.day-product-integration"],
        },
        {
          project: "MEDINESS Product Design",
          scope: "제품 요구·운영 흐름 구체화",
          ownership: "contributed",
          status: "verified",
          relation: "pattern-instance",
          text: "서비스 구현 담당자와 제품 요구·운영 흐름을 구체화하는 설계에 참여했습니다. 구현 ownership은 주장하지 않습니다.",
          claimIds: ["mediness.product-system-design-participation"],
        },
        {
          project: "MediSolve AI Product Operations",
          scope: "의사결정·작업·QA·release gate",
          ownership: "led",
          status: "verified",
          relation: "pattern-instance",
          text: "제품 결정을 BE·FE·QA·release gate 실행으로 연결하는 제품 운영을 리드했습니다.",
          claimIds: ["mediness.product-operations"],
        },
        {
          project: "BE Template",
          scope: "Agent Context·반복 작업 automation",
          ownership: "owned",
          status: "verified",
          relation: "corroborating",
          text: "계층적 Agent Context와 반복 작업 automation skill을 backend template에 내장했습니다.",
          claimIds: ["be-template.agent-context"],
        },
        {
          project: "NEXUS Quality Automation",
          scope: "정적 분석·타입 검사·pre-commit gate",
          ownership: "led",
          status: "in-progress",
          relation: "corroborating",
          text: "구축 중인 NEXUS에서 코드 컨벤션과 Ruff·Pyright·pre-commit 기반 자동 검증 체계를 구축했습니다.",
          claimIds: ["nexus.quality-automation"],
        },
      ],
      claimCeiling: {
        allowed: [
          "병원 product backend monorepo의 service boundary와 migration flow 주도",
          "예약 정책의 backend·frontend·QA·release 연결 리드",
          "MEDINESS 서비스 구현 담당자와 제품 요구·운영 흐름 설계 참여",
          "제품 결정을 BE·FE·QA·release gate 실행으로 연결",
          "결정된 권한·상태·데이터·서비스 경계를 작업 계약으로 남기고 AI 탐색·초안·반복 구현 보조에 연결",
          "BE Template에 계층적 Agent Context와 반복 작업 automation skill 내장",
          "NEXUS의 Ruff·Pyright·pre-commit 품질 자동 검증 체계 구축 리드",
        ],
        forbidden: [
          "고객사·브랜드 실명",
          "병원 SaaS 또는 제품 전체 단독 구축",
          "NEXUS 구축 완료",
          "PMS·프롭테크 직접 경험",
          "MEDINESS 서비스 직접 구현 또는 architecture·시스템 구조 설계 주도·전담",
          "AI가 제품 판단 또는 architecture·release 결정을 대체",
          "AI가 세 사례를 end-to-end로 수행",
          "AX 완전 자동화 또는 생산성·품질의 정량 향상",
          "BE Template·NEXUS 품질 자동화를 DAY·Product Operations의 과거 적용 성과로 소급",
        ],
      },
      jdFit: {
        matches: [
          "운영팀·PM·frontend·design과 요구사항 구체화",
          "PMS·운영 admin의 권한·상태·데이터 규칙",
          "REST API와 frontend-backend 연동",
          "운영자 기술 지원과 업무 자동화",
          "AI 협업을 작업 계약·자동 검증·사람 승인 경계로 운영 프로세스에 연결",
        ],
        boundary: "공유주거 도메인 경험이 아니라 유사한 운영 제품 설계 역량으로 연결합니다.",
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
        "Async FastAPI에 맞춰 TaskIQ·RabbitMQ로 전환하고, 작업 상태·재시도·실패 기록·수동 복구 경계를 함께 설계했습니다.",
      compositionCaption:
        "Centurion BAY가 primary case이고, Memento 결제 rollback은 예방 설계의 배경이 된 이전 경험입니다. 두 시스템의 구현을 하나로 합성하지 않습니다.",
      narrative: {
        context: "피부과 운영 제품의 주문·상품·재고·알림 backend입니다.",
        problem:
          "비동기 처리는 이미 Celery로 분리돼 있었지만, async FastAPI와 worker의 실행 모델이 달랐고 알림·재고 작업이 실패했을 때 상태와 복구 책임을 더 명확히 정할 필요가 있었습니다.",
        actions: [
          "async FastAPI와 worker 실행 모델의 정합성을 기준으로 TaskIQ·RabbitMQ를 선택하고 API와 worker의 책임·배포 단위를 분리했습니다.",
          "작업을 PENDING·SENDING·SUCCESS·FAILED 상태로 기록하고, 최대 3회 재시도와 최종 실패 기록을 연결했습니다.",
          "운영자가 실패 기록을 확인해 수동으로 다시 실행할 수 있는 경계를 만들고 API test·Docker CI·로컬 실행 문서까지 갖췄습니다.",
        ],
        resultLabel: "남은 상태",
        result:
          "새로운 비동기 처리를 처음 만든 것이 아니라, 이미 분리돼 있던 작업을 실패가 보이고 다시 처리할 수 있는 운영 상태로 바꿨습니다.",
        visualLead:
          "아래 그림은 기술 구성보다 작업이 실패한 뒤 어떻게 발견되고 복구되는지에 초점을 둡니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "Celery worker와 async FastAPI가 서로 다른 실행 모델로 동작",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "TaskIQ·RabbitMQ 전환과 상태·retry·실패 기록·수동 재처리 경계 재구성",
          tone: "decision",
        },
        {
          label: "운영 상태",
          text: "API와 worker 책임이 나뉘고 실패한 작업을 확인·재처리할 수 있는 경로",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "비동기 분리는 이미 존재했지만 Celery worker와 async FastAPI의 실행 모델이 달랐고, 알림·재고 작업의 상태와 복구 책임을 더 명시적으로 맞출 필요가 있었습니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "TaskIQ가 비동기 분리를 처음 만든 것이 아니므로 migration 전후를 과장하지 않습니다.",
            },
            {
              text: "성능·지연 개선 수치와 장애 감소율은 측정되지 않았습니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "Async FastAPI와 worker 실행 모델의 정합성을 기준으로 TaskIQ·RabbitMQ를 선택하고, 알림 책임과 실패 상태를 별도 domain·service·worker 경계로 옮겼습니다.",
            },
          ],
        },
        {
          kind: "alternatives",
          label: "Alternatives",
          items: [
            {
              title: "Celery 유지",
              text: "기존 비동기 분리는 유지할 수 있지만 async FastAPI와 worker 모델을 맞추려는 전환 목적을 충족하지 못해 채택하지 않았습니다.",
              verdict: "rejected",
            },
            {
              title: "TaskIQ·RabbitMQ 전환",
              text: "Async 실행 모델과의 정합성, 명시적 상태·retry·수동 재처리 경계를 기준으로 채택했습니다.",
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
              text: "주문·상품·재고 API와 RabbitMQ·TaskIQ worker를 분리하고 worker image의 배포 단위를 나눴습니다.",
            },
            {
              title: "Failure state",
              text: "PENDING·SENDING·SUCCESS·FAILED 상태와 retry·최종 실패 기록·수동 재발송 경계를 연결했습니다.",
            },
            {
              title: "Verification",
              text: "API test infrastructure, Docker CI, local onboarding 문서를 함께 구축했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "runtime-recovery",
        title: "실패를 숨기지 않는 worker runtime",
        request: "주문·재고 API",
        worker: "TaskIQ·RabbitMQ worker",
        states: ["PENDING", "SENDING", "SUCCESS"],
        failure: "FAILED 기록",
        recovery: ["최대 3회 retry", "최종 실패 확인", "수동 재처리"],
        priorLesson: "이전 예약·결제 경험에서 환불·마일리지·ticket rollback 순서를 수습한 경험",
        caption:
          "BAY의 worker 설계가 primary evidence이며, 결제 rollback 경험은 실패를 처음부터 상태와 복구 경계로 다루게 한 prior lesson입니다.",
      },
      operation: [
        "알림 상태·retry·실패 기록·수동 재발송을 운영자가 확인할 수 있는 흐름으로 연결했습니다.",
        "API test와 Docker CI, 로컬 실행·온보딩 문서로 재현 가능한 검증 환경을 구성했습니다.",
      ],
      limits: [
        "TaskIQ가 비동기 처리를 최초 도입했다는 표현을 사용하지 않습니다.",
        "Celery가 비동기 분배를 지원하지 않았다는 표현을 사용하지 않습니다.",
        "성능·지연·복잡도 감소 수치를 주장하지 않습니다.",
        "Memento 결제 시스템 전체 ownership을 주장하지 않습니다.",
      ],
      evidence: [
        {
          project: "Centurion BAY",
          scope: "주문·재고 API와 worker failure boundary",
          ownership: "led",
          status: "verified",
          relation: "primary",
          text: "주문·재고 API와 RabbitMQ·TaskIQ worker, 상태·retry·실패 기록·재처리 경계 구축을 주도했습니다.",
          claimIds: ["centurion.bay-async-backend"],
        },
        {
          project: "Centurion BAY",
          scope: "Celery→TaskIQ migration",
          ownership: "led",
          status: "verified",
          relation: "corroborating",
          text: "Async FastAPI와 worker 실행 모델의 정합성을 기준으로 TaskIQ·RabbitMQ로 전환했습니다.",
          claimIds: ["centurion.async-migration"],
        },
        {
          project: "Centurion BAY",
          scope: "Test·CI·onboarding",
          ownership: "led",
          status: "verified",
          relation: "corroborating",
          text: "API test infrastructure와 Docker CI 구축, 로컬 실행·온보딩 문서 정비를 주도했습니다.",
          claimIds: ["centurion.test-ci-foundation"],
        },
        {
          project: "Memento",
          scope: "예약·결제 보상 흐름",
          ownership: "contributed",
          status: "historical",
          relation: "prior-lesson",
          text: "선결제 이후 예약 실패에서 환불·마일리지·ticket rollback을 안정화한 경험이 예방 설계의 배경이 됐습니다.",
          claimIds: ["career.memento-payment"],
        },
      ],
      claimCeiling: {
        allowed: [
          "주문·재고 API와 RabbitMQ·TaskIQ worker, 상태·retry·실패 기록·재처리 경계 구축 주도",
          "비동기 작업 시스템을 Celery에서 TaskIQ·RabbitMQ로 전환",
          "API test infrastructure와 Docker CI 구축 주도",
          "예약·결제 rollback 안정화 기여",
        ],
        forbidden: [
          "Centurion backend 전체 단독 구축",
          "TaskIQ로 비동기 분리를 최초 도입",
          "성능·지연·결함 감소 수치",
          "결제 시스템 전체 ownership",
        ],
      },
      jdFit: {
        matches: [
          "Async FastAPI와 background worker",
          "Message queue·background 작업 처리",
          "계약·결제·예약·알림의 상태와 정합성",
          "Docker·CI와 운영 안정화",
        ],
        boundary: "Asyncio 심화 전문성이나 성능 개선 수치는 주장하지 않습니다.",
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
      title: "사용자 경로를 지키며 backend를 교체하고 운영까지 이어가다",
      caseMode: "single-system",
      layers: ["Product", "Backend", "Operations"],
      outcomeLine:
        "기존 Next.js 사용자 경로를 유지한 채 FastAPI backend를 병렬 구축·검증하고, v1.1.0 cutover 이후 개발·운영까지 이어갔습니다.",
      compositionCaption:
        "Thready 단일 시스템의 backend 전환 사례입니다. Frontend와 제품 전체 재구축으로 범위를 확장하지 않습니다.",
      narrative: {
        context: "이미 운영 중이던 AI 콘텐츠 생성 제품의 backend 전환 사례입니다.",
        problem:
          "v1.0 backend와 데이터 이전 체계를 다시 만들어야 했지만 frontend까지 함께 교체하면 변경 범위와 기존 사용자 경로의 위험이 커집니다.",
        actions: [
          "기존 Next.js 화면과 사용자 경로는 유지하고 교체 범위를 backend로 한정했습니다.",
          "새 FastAPI backend와 데이터 이전 경로를 병렬 구축하고 migration·정적 검사·테스트를 통과한 뒤 전환했습니다.",
          "검증 후 v1.1.0에서 backend 경로를 전환하고 v1.2부터 v1.5까지 개발·QA·release·운영을 이어갔습니다.",
        ],
        resultLabel: "남은 상태",
        result:
          "재구축 자체가 아니라 기존 사용자 경로를 보호한 채 필요한 부분만 바꾸고 전환 이후 운영까지 이어갔습니다. 이후 30일의 HTTP 5xx 약 0.3%는 개선율이 아닌 관측한 운영 상태입니다.",
        visualLead:
          "아래 그림은 기존 화면을 유지한 채 새 backend를 병렬 구축·검증하고 전환한 순서를 보여줍니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "v1.0.0을 운영하면서 backend 구조와 data migration 체계를 함께 정리해야 하는 상태",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "Next.js 경로는 유지하고 새 FastAPI backend와 data path를 병렬 구축·검증",
          tone: "decision",
        },
        {
          label: "운영 상태",
          text: "v1.1.0 cutover 이후 v1.2~v1.5 backend 개발·release·운영 지속",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "빠른 검증에 맞춘 초기 제품이 운영 단계로 넘어가며 backend coupling과 migration 경계를 함께 정리해야 했습니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "기존 Next.js 화면과 사용자 경로를 유지하고, v1.0.0 운영 중 새 backend를 별도로 검증해야 했습니다.",
            },
            {
              text: "전환 기준은 구현 완료가 아니라 data migration·static check·test·actual API scenario의 통과였습니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "Frontend를 유지하고 backend만 별도 FastAPI application으로 재구축해 검증 범위와 사용자 영향 범위를 분리했습니다.",
            },
          ],
        },
        {
          kind: "alternatives",
          label: "Alternatives",
          items: [
            {
              title: "기존 backend 부분 수정",
              text: "즉시 변경 범위는 작지만 누적된 coupling과 migration 경계가 남아 채택하지 않았습니다.",
              verdict: "rejected",
            },
            {
              title: "Frontend 유지 + backend 병렬 교체",
              text: "사용자 표면을 보호하면서 architecture·data·API를 별도로 검증할 수 있어 채택했습니다.",
              verdict: "selected",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Implementation",
          items: [
            {
              title: "Harness first",
              text: "Architecture·component·infra validation harness를 먼저 구성했습니다.",
            },
            {
              title: "Parallel backend",
              text: "새 FastAPI backend와 data migration path를 기존 사용자 경로와 분리해 구축했습니다.",
            },
            {
              title: "Cutover gate",
              text: "Static analysis·test·actual API scenario를 통과한 뒤 v1.1.0에서 backend route를 전환했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "cutover-map",
        title: "사용자 경로와 backend 전환을 분리한 cutover map",
        phases: ["v1.0 운영", "범위 결정", "병렬 구축", "검증 gate", "전환 이후"],
        lanes: [
          {
            label: "사용자 경로",
            tone: "continuity",
            nodes: [
              {
                phase: 0,
                span: 5,
                text: "기존 Next.js 화면과 사용자 경로 유지",
              },
            ],
          },
          {
            label: "Backend · Data",
            tone: "change",
            nodes: [
              { phase: 0, text: "v1.0 backend" },
              { phase: 1, text: "Backend only", emphasis: "selected" },
              { phase: 2, text: "새 FastAPI · data migration" },
              { phase: 3, text: "v1.1.0 cutover", emphasis: "gate" },
              { phase: 4, text: "v1.2~v1.5 운영" },
            ],
          },
          {
            label: "검증 · 운영",
            tone: "verification",
            nodes: [
              { phase: 1, text: "Validation harness" },
              { phase: 2, text: "Static · test" },
              { phase: 3, text: "Actual API scenario", emphasis: "gate" },
              { phase: 4, text: "Release · QA · HTTP 5xx 약 0.3%", emphasis: "evidence" },
            ],
          },
        ],
        caption:
          "화면을 유지한 채 backend와 data path만 병렬로 바꾸고, migration·test·actual API 검증을 통과한 시점에 운영 route를 전환했습니다.",
      },
      operation: [
        "v1.1.0 cutover 이후 v1.2~v1.5의 backend 개발·release·QA·task 운영을 이어갔습니다.",
        "월 수만 건 요청 규모에서 30일 기준 HTTP 5xx 약 0.3% 수준의 운영 상태를 확인했습니다.",
      ],
      limits: [
        "Frontend 포함 제품 전체 재구축이 아닙니다.",
        "무중단 전환을 보장했다는 표현을 사용하지 않습니다.",
        "HTTP 5xx 약 0.3%는 전후 개선값이 아니라 특정 기간의 운영 상태입니다.",
        "QA reopen 감소를 backend 단독 효과로 단정하지 않습니다.",
        "36시간은 달력 기간이 아니라 작업 시간 합계이며 How I work의 보조 근거로만 사용합니다.",
      ],
      evidence: [
        {
          project: "Thready",
          scope: "FastAPI backend rebuild·cutover",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "FastAPI backend를 전면 재구축하고 v1.1.0 cutover 이후 개발·운영을 전담했습니다.",
          claimIds: ["thready.backend-rebuild"],
        },
        {
          project: "Thready",
          scope: "Scope decision·execution",
          ownership: "owned",
          status: "verified",
          relation: "corroborating",
          text: "Frontend를 Next.js로 유지하고 backend 분리 재구축을 결정·설득한 뒤 validation harness를 기반으로 실행했습니다.",
          claimIds: ["thready.rebuild-decision-execution"],
        },
        {
          project: "Thready",
          scope: "Post-cutover operation",
          ownership: "owned",
          status: "verified",
          relation: "corroborating",
          text: "Release·QA·task 구조로 backend를 운영하고 월 수만 건 요청 규모에서 HTTP 5xx 약 0.3% 수준을 확인했습니다.",
          claimIds: ["thready.release-operation", "thready.production-operation-quality"],
        },
      ],
      claimCeiling: {
        allowed: [
          "FastAPI backend 전면 재구축과 이후 개발·운영 전담",
          "Frontend는 Next.js로 유지하고 backend만 분리 도입",
          "Release·QA·task 구조 기반 backend 운영",
          "월 수만 건 요청 규모에서 HTTP 5xx 약 0.3% 수준으로 운영",
        ],
        forbidden: [
          "제품 전체 또는 frontend 포함 전면 재구축",
          "무중단 운영 보장",
          "HTTP 오류율 개선 배수",
          "36시간 만에 서비스 전체 완성",
          "QA reopen 감소의 backend 단독 귀속",
        ],
      },
      jdFit: {
        matches: [
          "Legacy refactoring과 backend 구조 개선",
          "운영 중인 홈페이지·PMS·admin의 사용자 경로 보호",
          "Data migration·test·API 검증 후 배포",
          "장애 신호·QA·release를 포함한 운영 안정화",
        ],
      },
      claimIds: [
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
        "여러 제품의 backend를 IaC·배포·runbook으로 이어, 제품과 환경별 운영 경계를 직접 관리했습니다.",
      compositionCaption:
        "회사 Azure·Terraform ownership이 primary evidence이고, TellingMe AWS는 별도 프로젝트의 supporting precedent입니다. 두 cloud 경험을 하나의 end-to-end pipeline으로 합성하지 않습니다.",
      narrative: {
        context: "여러 B2B·B2C 제품의 Azure·Terraform 운영 환경입니다.",
        problem:
          "Backend 기능은 코드가 완성됐다고 운영 가능한 상태가 되지 않습니다. 제품·환경별 resource 경계, 배포 경로, database, monitoring과 대응 기준이 함께 연결돼야 합니다.",
        actions: [
          "제품과 환경별 Terraform 구성·state·resource 경계를 관리합니다.",
          "ACR·App Service·VM의 배포 경로를 application runtime과 database에 연결합니다.",
          "monitoring alert와 deploy·runbook을 함께 관리해 배포 후 상태를 확인하고 대응할 수 있게 합니다.",
        ],
        resultLabel: "현재 책임 범위",
        result:
          "이 사례는 단일 성과가 아니라 현재 회사에서 맡고 있는 ownership 범위입니다. Backend 변경이 목표 환경에 배포되고 정상 동작을 확인할 수 있는 지점까지 책임집니다.",
        visualLead:
          "아래 그림은 기술 목록이 아니라 코드 변경에서 운영 확인까지 제가 소유하는 연결 범위를 보여줍니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "B2B·B2C·외부 제품과 환경마다 application·resource·배포 절차가 함께 움직이는 상태",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "제품·환경별 Terraform root와 remote state, delivery path, deploy·runbook 경계를 관리",
          tone: "decision",
        },
        {
          label: "운영 상태",
          text: "Backend 변경을 cloud resource와 분리하지 않고 배포·관측 가능한 운영 단위로 연결",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "Backend 기능은 코드가 완성됐다고 운영 가능한 상태가 되지 않습니다. 여러 제품과 환경에서는 application, resource, deployment path, state, runbook의 경계가 함께 관리되어야 합니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "이미 운영 중인 Azure resource를 모두 새로 만들 수 없고, 제품·환경별 경계를 유지해야 했습니다.",
            },
            {
              text: "정확한 고객·resource·cost·security detail은 공개하지 않습니다.",
            },
            {
              text: "NEXUS는 진행 중인 제품이므로 IaC 작업 사실과 전체 제품 완료 상태를 구분합니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "Infrastructure를 backend 이후의 별도 작업으로 두지 않고 제품·환경별 Terraform root, remote state, application delivery path, deploy·runbook의 한 운영 경계로 관리했습니다.",
            },
          ],
        },
        {
          kind: "alternatives",
          label: "Alternatives",
          items: [
            {
              title: "확인된 비교 기록 없음",
              text: "Manual portal 운영이나 shared infra 같은 대안을 실제로 검토·기각했다는 evidence가 없어 대안 서사를 만들지 않습니다.",
              verdict: "not-claimed",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Implementation",
          items: [
            {
              title: "IaC boundary",
              text: "B2B·B2C·NEXUS·제품 환경별 Terraform root와 remote state, resource separation을 관리했습니다.",
            },
            {
              title: "Delivery",
              text: "App Service·ACR·VM deployment path와 환경별 실행 경계를 관리했습니다.",
            },
            {
              title: "Operation",
              text: "PostgreSQL·AI service·monitoring alert와 deploy·runbook 변경을 운영 문서로 연결했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "infra-ownership",
        title: "제품·환경별 infrastructure ownership map",
        productBoundaries: ["B2B", "B2C", "외부 제품", "내부 제품"],
        layers: [
          {
            label: "IaC 경계",
            items: ["Terraform root", "Remote state", "Resource separation"],
            owned: true,
          },
          {
            label: "Delivery",
            items: ["ACR", "App Service", "VM", "Deploy path"],
            owned: true,
          },
          {
            label: "Operation",
            items: ["PostgreSQL", "AI service", "Monitoring alert", "Deploy·runbook"],
            owned: true,
          },
        ],
        supportingProof: {
          label: "별도 프로젝트 · AWS supporting precedent",
          items: ["Spring Boot backend", "AWS deploy", "Monitoring lead"],
        },
        caption:
          "회사 Azure·Terraform이 primary ownership입니다. AWS 경험은 다른 프로젝트의 supporting precedent이며 같은 pipeline으로 연결하지 않습니다.",
      },
      operation: [
        "회사 Azure/Terraform infra repository와 제품·환경별 실제 운영 환경을 관리합니다.",
        "Deploy path와 runbook을 갱신하고 application runtime·database·monitoring 상태를 확인합니다.",
      ],
      limits: [
        "모든 Azure resource를 최초부터 단독 생성했다고 주장하지 않습니다.",
        "정확한 고객·resource·cost·security detail과 resource count를 공개하지 않습니다.",
        "비용 절감·배포 시간 개선 같은 미측정 결과를 추가하지 않습니다.",
        "GCP·Kubernetes 운영 경험으로 확장하지 않습니다.",
        "SellerCanvas·Check의 0→1과 infrastructure ownership을 하나의 사례로 합성하지 않습니다.",
      ],
      evidence: [
        {
          project: "MediSolve AI Infrastructure",
          scope: "회사 Azure/Terraform infrastructure",
          ownership: "owned",
          status: "verified",
          relation: "primary",
          text: "회사 Azure/Terraform infra 전반의 설계·구축·운영과 제품·환경별 resource boundary·deploy·runbook을 담당합니다.",
          claimIds: ["infra.company-azure-ownership"],
        },
        {
          project: "NEXUS",
          scope: "외부 제품 Terraform IaC",
          ownership: "owned",
          status: "in-progress",
          relation: "corroborating",
          text: "진행 중인 외부 제품의 Terraform IaC 구축을 전담했습니다.",
          claimIds: ["nexus.terraform-infra"],
        },
        {
          project: "Centurion",
          scope: "Azure/Terraform infra·runbook",
          ownership: "owned",
          status: "verified",
          relation: "corroborating",
          text: "Centurion Azure/Terraform infra 구축·운영과 runbook·문서화를 담당했습니다.",
          claimIds: ["centurion.shared-infra"],
        },
        {
          project: "TellingMe",
          scope: "Spring Boot backend·AWS deploy·monitoring",
          ownership: "led",
          status: "historical",
          relation: "supporting-precedent",
          text: "별도 개인 프로젝트에서 Spring Boot backend와 AWS 배포·monitoring을 리드했습니다.",
          claimIds: ["career.tellingme-backend-infra"],
        },
      ],
      claimCeiling: {
        allowed: [
          "회사 Azure/Terraform infra 전반의 설계·구축·운영 담당",
          "제품·환경별 resource boundary와 deploy·runbook 관리",
          "외부 제품 Terraform IaC 구축 전담",
          "별도 프로젝트에서 Spring Boot backend와 AWS 배포·monitoring 리드",
        ],
        forbidden: [
          "모든 cloud resource를 최초부터 단독 생성",
          "정확한 resource·cost·security detail",
          "Multi-cloud platform 전체 단독 설계",
          "0→1 제품을 기획부터 infra까지 end-to-end 전담",
          "GCP·Kubernetes 운영",
        ],
      },
      jdFit: {
        matches: [
          "Docker·CI/CD·cloud 기반 배포와 운영",
          "홈페이지·PMS·admin backend의 환경별 운영 경계",
          "monitoring·runbook 기반 운영 상태 확인",
          "Backend 변경을 실제 운영 환경까지 전달하는 ownership",
        ],
        boundary: "Infra Engineer 포지셔닝이 아니라 backend delivery를 운영 상태까지 닫는 역량으로 연결합니다.",
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
        label: "AI service production cutover 전",
        tone: "pre-production",
      },
      outcomeLine:
      "제품 원장과 AI 실행 상태의 소유권을 분리하고, transactional Outbox·retry·version fence로 전달 실패에 대비하고 역순 반영을 막도록 설계·구현했습니다.",
      compositionCaption:
        "Thready 단일 제품 안의 service boundary·durable delivery 사례입니다. 구현·test 완료 범위와 production cutover 상태를 분리해 표시합니다.",
      narrative: {
        context:
          "AI 콘텐츠 생성 제품의 AI 실행부 분리 사례입니다. 구현과 회귀 테스트는 완료했고 production 전환 전입니다.",
        problem:
          "AI 실행부를 별도 서비스로 분리할 때는 API 하나를 추가하는 것보다 제품 원장의 소유권, 전달 실패 복구, 오래된 변경이 최신 상태를 덮지 않게 하는 규칙을 함께 정해야 합니다.",
        actions: [
          "제품 정책과 원장 데이터는 product backend가, 생성 작업 lifecycle과 실행 상태는 독립 AI service가 소유하도록 경계를 나눴습니다.",
          "제품 원장 변경과 전달 기록을 같은 transaction에 저장하고 worker가 인증된 HTTP 계약으로 AI service에 전달하도록 구현했습니다.",
          "실패 재시도와 version fence를 두고 backend·AI service 전체 회귀, migration round-trip, 오래된 수정·삭제 요청 차단을 검증했습니다.",
        ],
        resultLabel: "검증 상태",
        result:
          "서비스 경계와 실패 전달을 구현과 테스트로 닫았지만 아직 production 전환 전입니다. 따라서 운영 효과가 아닌 pre-production 설계·구현·검증 사례로 제시합니다.",
        visualLead:
          "아래 그림은 제품 원장 변경이 AI service까지 전달되고, 실패·지연 요청을 어떻게 걸러내는지 보여줍니다.",
      },
      frame: [
        {
          label: "출발점",
          text: "AI 실행부를 분리하며 제품 원장과 생성 lifecycle의 소유권을 명시해야 하는 상태",
          tone: "context",
        },
        {
          label: "설계 판단",
          text: "독립 FastAPI·DB, authenticated HTTP, same transaction Outbox, retry·version fence",
          tone: "decision",
        },
        {
          label: "검증 상태",
          text: "회귀·migration round-trip·stale update test 완료, production cutover 전",
          tone: "outcome",
        },
      ],
      details: [
        {
          kind: "problem",
          label: "Problem",
          items: [
            {
              text: "AI 실행부를 별도 서비스로 분리하면 제품 원장과 생성 lifecycle의 소유권, 전달 실패 시 복구 경로와 역순 반영 방지 규칙을 함께 설계해야 합니다.",
            },
          ],
        },
        {
          kind: "constraints",
          label: "Constraints",
          items: [
            {
              text: "제품 정책과 원장 데이터는 product backend가, 생성 lifecycle과 실행 상태는 AI application이 소유해야 합니다.",
            },
            {
              text: "AI 장애와 retry·역순 전달이 최신 원장 상태를 덮지 않아야 합니다.",
            },
            {
              text: "설계·구현·test는 확인됐지만 AI service production cutover는 완료 전입니다.",
            },
          ],
        },
        {
          kind: "decision",
          label: "Decision",
          items: [
            {
              text: "AI 실행부를 독립 FastAPI application과 DB로 분리하고 product backend와 authenticated HTTP 계약으로 연결했습니다.",
            },
            {
              text: "원장 변경과 Outbox 기록은 같은 transaction에 두고 전달은 retry·version fence로 분리했습니다.",
            },
          ],
        },
        {
          kind: "implementation",
          label: "Implementation",
          items: [
            {
              title: "Ownership zones",
              text: "Product backend·owner DB와 AI FastAPI·AI DB의 소유 데이터를 분리했습니다.",
            },
            {
              title: "Durable delivery",
              text: "Owner mutation과 Outbox를 같은 transaction에 기록하고 worker retry와 delivery version fence를 적용했습니다.",
            },
            {
              title: "Verification",
              text: "Backend·AI 회귀, migration round-trip, stale PUT·DELETE fence를 test했습니다.",
            },
          ],
        },
      ],
      visual: {
        kind: "ai-system",
        title: "제품 원장과 AI runtime 사이의 durable delivery",
        ownership: {
          productBackend: {
            label: "Product Backend",
            database: "Owner DB",
            owns: ["제품 정책", "원장 데이터", "권한·상태 규칙"],
          },
          aiRuntime: {
            label: "AI FastAPI Runtime",
            database: "AI DB",
            owns: ["생성 lifecycle", "실행 상태", "생성 결과"],
          },
        },
        transaction: {
          label: "Same transaction",
          items: ["Owner mutation", "Delivery intent"],
          outbox: "Outbox record",
        },
        delivery: {
          worker: "Delivery worker",
          retry: "Retry",
          transport: "HTTP",
          authentication: "Authenticated contract",
        },
        versionFence: {
          rule: "delivery_version fence",
          outcomes: ["최신 상태만 반영", "역순 PUT·DELETE 차단", "Retry 허용"],
        },
        verificationRail: [
          "Backend·AI regression",
          "Migration round-trip",
          "Stale PUT fence",
          "Stale DELETE fence",
        ],
        caption:
          "제품 원장과 AI 실행 상태를 분리하고 전달 실패는 Outbox·retry·version fence로 다룹니다. 설계·구현·test는 확인됐지만 production cutover는 완료 전입니다.",
      },
      operation: [
        "Backend·AI 전체 회귀와 migration round-trip, stale update fence test를 통과한 상태입니다.",
        "AI service production cutover는 완료 전이며 현재 문안은 설계·구현·검증 범위까지만 주장합니다.",
      ],
      limits: [
        "AI service production 전환 완료를 주장하지 않습니다.",
        "Exactly-once, data loss 0건, 무중단 운영을 주장하지 않습니다.",
        "Production 장애율 개선을 주장하지 않습니다.",
      ],
      evidence: [
        {
          project: "Thready",
          scope: "Product backend·AI service ownership boundary",
          ownership: "owned",
          status: "pre-production",
          relation: "primary",
          text: "AI 실행부를 독립 FastAPI application·DB로 분리하고 product backend와 HTTP 계약으로 연결했습니다.",
          claimIds: ["thready.ai-service-boundary"],
        },
        {
          project: "Thready",
          scope: "Outbox·retry·version fence",
          ownership: "owned",
          status: "pre-production",
          relation: "primary",
          text: "원장 변경과 Outbox를 같은 transaction에 기록하고 retry·delivery version fence로 전달 경계를 구현·test했습니다.",
          claimIds: ["thready.ai-replica-outbox"],
        },
      ],
      claimCeiling: {
        allowed: [
          "AI 실행부를 독립 FastAPI application·DB로 분리하고 backend와 HTTP 계약으로 연결",
          "원장 변경과 Outbox 기록을 같은 transaction으로 처리하고 retry·version fence로 전달 분리",
          "설계·구현·회귀·migration·stale fence test 완료",
        ],
        forbidden: [
          "AI service production 전환 완료",
          "Exactly-once·data loss 0건·무중단 운영",
          "Production 장애율 개선",
          "전체 AI platform 단독 구축",
        ],
      },
      jdFit: {
        matches: [
          "제품 정책과 backend·AI runtime의 service boundary",
          "RDBMS transaction과 background delivery 정합성",
          "Retry·failure·version guard를 포함한 운영 안정성",
        ],
        boundary: "MGRV production에 적용한 사례가 아니라 검증된 설계·구현 경험의 전이 가능성을 설명합니다.",
      },
      claimIds: [
        "thready.ai-service-boundary",
        "thready.ai-replica-outbox",
      ],
    },
  ],
  workSystem: {
    title: "판단은 사람이, 실행은 AI가, 검증은 시스템이 맡습니다",
    summary: [
      "AI의 속도는 architecture와 작업 경계가 먼저 정해져 있을 때 제품 결과로 이어집니다.",
      "문제 정의와 release decision은 사람이 소유하고, AI는 정해진 경계 안에서 실행하며, 자동 검증은 결과를 evidence로 남깁니다.",
    ],
    foundation: [
      "Layered architecture·DI·ADR·convention·runbook 기반 조직 표준 FastAPI foundation",
      "Agent context system과 반복 작업 automation skill",
      "Ruff·Pyright·pre-commit·test·CI·API documentation",
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
          items: ["Codebase 탐색", "대안 비교", "초안 작성", "반복 구현", "정해진 범위의 일괄 적용"],
      },
        {
          kind: "automated",
          label: "Automated Verification",
          items: ["Static analysis", "Type check", "Test", "CI", "API validation", "Release evidence"],
        },
      ],
      qualityLab: {
        title: "별도 Quality Lab의 품질 판단 구조",
        description:
          "Thready의 별도 quality lab에서 검증한 판단 구조이며, production delivery path와 결합된 구현으로 주장하지 않습니다.",
        automated: ["결정적 gate 12종", "형식 오류 차단"],
        measurement: ["실측 분포 대조", "문제 축 재정의"],
        human: ["제품 품질 판단", "Release decision"],
        boundary:
          "자동 검증은 최종 제품 판단을 대신하지 않으며, 이 구조는 Case 05의 Outbox delivery와 독립된 근거입니다.",
        claimIds: ["thready.quality-criteria-system", "thready.measurement-correction"],
      },
      evidence: [
      {
        project: "BE Template",
        scope: "공통 backend foundation",
        ownership: "owned",
        status: "verified",
        relation: "primary",
        text: "Layered architecture·DI·ADR·convention·runbook 기반 조직 표준 FastAPI template을 설계·구축했습니다.",
        claimIds: ["be-template.backend-standard"],
      },
      {
        project: "BE Template",
        scope: "Agent context·automation skill",
        ownership: "owned",
        status: "verified",
        relation: "primary",
        text: "Agent context system과 반복 작업 automation skill을 공통 foundation에 내장했습니다.",
        claimIds: ["be-template.agent-context"],
      },
      {
        project: "MediSolve AI Product Operations",
        scope: "Human decision·release gate",
        ownership: "led",
        status: "verified",
        relation: "corroborating",
        text: "제품 결정을 spec·work·QA·release evidence로 연결하는 운영을 리드했습니다.",
        claimIds: ["mediness.product-operations"],
      },
      {
        project: "NEXUS",
        scope: "Static analysis·pre-commit·documentation",
        ownership: "led",
        status: "in-progress",
        relation: "corroborating",
        text: "정적 분석·type check·pre-commit과 API·database 설계 문서를 진행 중인 제품에 적용했습니다.",
        claimIds: ["nexus.quality-automation"],
      },
      {
        project: "Centurion BAY",
        scope: "Test·Docker CI·onboarding",
        ownership: "led",
        status: "verified",
        relation: "corroborating",
        text: "API test infrastructure와 Docker CI, 재현 가능한 local onboarding 환경을 구축했습니다.",
        claimIds: ["centurion.test-ci-foundation"],
      },
        {
          project: "Thready",
          scope: "Harness-first AI execution",
        ownership: "owned",
        status: "verified",
        relation: "corroborating",
        text: "Architecture·component·infra validation harness를 먼저 세운 뒤 AI와 codebase 파악·기능 정의·재구축을 수행했습니다.",
          claimIds: ["thready.rebuild-decision-execution"],
        },
        {
          project: "Thready Quality System",
          scope: "자동 gate·실측 분포·사람 판단",
          ownership: "owned",
          status: "verified",
          relation: "corroborating",
          text: "별도 quality lab에서 AI 생성 품질을 세 층으로 나눠 자동화의 책임 범위를 제한했습니다.",
          claimIds: ["thready.quality-criteria-system"],
        },
        {
          project: "Thready Quality System",
          scope: "Measurement correction",
          ownership: "owned",
          status: "verified",
          relation: "corroborating",
          text: "자사 출력이 품질 기준으로 되먹임되던 순환을 재실측으로 발견하고 문제 축을 다시 정의했습니다.",
          claimIds: ["thready.measurement-correction"],
        },
      ],
      limits: [
      "AI가 제품 판단·architecture·release decision을 대신한다고 표현하지 않습니다.",
      "자동 검증 통과가 제품 정답이나 production 안전성을 보장한다고 표현하지 않습니다.",
      "Agent가 모든 작업을 즉시 수행하거나 사람의 운영을 완전히 자동화한다고 주장하지 않습니다.",
        "공통 foundation의 생산성 개선 수치는 측정되지 않았습니다.",
        "별도 quality lab을 Case 05의 production delivery path와 결합된 구현으로 표현하지 않습니다.",
        "품질을 완전히 자동 판정하거나 생성 품질 개선 배수·비율을 주장하지 않습니다.",
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
