import type { RolePortfolio } from "./types";

/**
 * 미리디 · [미리캔버스] Product Engineer 포트폴리오.
 * 문안 owner: wiki/products/resume/tailored/miridih/2026-09-03_wanted_product-engineer/content-draft.md (2026-09-03 승인).
 * 케이스 본문은 lib/cases 의 공통 dossier 가 렌더한다. 회사별로 바꾸는 것은 label·focus·scope·designs 뿐이다.
 */
export const MIRIDIH_PORTFOLIO = {
  slug: "miridih",
  label: "미리디 · [미리캔버스] Product Engineer",
  shortLabel: "미리디",
  signals: [
    "구독 AI 제품 직접 구현·운영",
    "검수 가능한 데이터 운영 체계",
    "AI 기능 PoC · 품질 게이트",
    "hybrid retrieval",
  ],
  description:
    "아이디어를 고객이 구독하는 제품으로 만든 경험, 검수 가능한 데이터 운영 체계, AI 기능 PoC와 품질·실험 흐름을 미리디 JD 순서로",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-09-03",
  heroVariant: "light",
  // hero: Product Engineer 한 줄이 메인. 보조 줄·상태 라벨·중복 목차는 두지 않는다 (2026-09-03).
  brandLine: "",
  headline: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
  // hero 문단은 두 문장까지 (게이트 16).
  introduction:
    "기획자로 시작해 백엔드로 왔고, 지금은 아이디어를 제안한 AI 콘텐츠 제품의 백엔드·AI 실행부를 직접 만들고 핵심 화면은 coding agent로 완성해 월 1천만원 수준의 구독 매출이 발생하는 제품으로 운영합니다. 대규모 콘텐츠 데이터를 검수 가능한 구조와 평가 워크벤치로 바꿨고, 시술 지식의 hybrid retrieval API와 제품 기능을 대화로 제어하는 Agent PoC를 설계·검증했습니다.",
  proofAxes: [
    {
      title: "아이디어를 고객이 구독하는 AI 제품으로",
      description:
        "기획·QA·마케팅과 고객 불편을 기능 우선순위와 생성 품질 기준으로 구체화하고, FastAPI 백엔드와 생성 품질 시스템을 직접 만들어 구독 제품으로 출시·운영했습니다.",
    },
    {
      title: "검수 가능한 데이터 운영 체계",
      description:
        "SNS 관측 데이터를 독립 schema·멱등 importer·사람 평가 워크벤치로 바꿨고, 시술·제품·안전 규칙·문헌 지식은 canonical 데이터와 release 단위 publication gate로 등록·검수·공개를 통제했습니다.",
    },
    {
      title: "AI 기능 PoC와 품질·실험 흐름",
      description:
        "제품 기능을 대화로 제어하는 planner-executor Agent PoC와, 구조화 조회가 판단하고 문헌 검색이 근거를 보강하는 hybrid retrieval API를 설계했습니다. 대표 예시 몇 개가 아니라 검수된 fixture로 recall·안전 규칙·응답 시간을 자동 측정하는 평가 게이트를 두었습니다.",
    },
    {
      title: "빠른 배포와 품질 보장",
      description:
        "운영 중인 제품을 멈추지 않고 backend를 교체해 결함 재발을 약 94% 줄였고, 실제 사용자가 쓰는 제품의 배포·QA·운영을 계속 전담하고 있습니다.",
    },
  ],
  cases: [
    {
      kind: "dossier",
      slug: "thready",
      label: "아이디어를 고객이 구독하는 제품으로 · 생성 품질 기준과 데이터 검수 워크벤치",
      focus:
        "Threads 글 제작의 반복을 제품 흐름으로 바꾸고 품질 판정을 자동 게이트·실측 분포·사람 판정 3층으로 나눈 판단, 그리고 SNS 관측 데이터를 독립 labeling schema·멱등 importer·super-admin 평가 워크벤치로 바꾼 데이터 운영 체계를 봅니다.",
      scope: "제품 운영 리드 · FastAPI 백엔드·AI 생성/평가 직접 구현 · 핵심 화면은 coding agent로 완성 · 멱등 importer·평가 워크벤치 직접 구축",
      designs: ["quality-layers", "idempotent-importer"],
    },
    {
      kind: "supporting",
      slug: "thready-agent-prototype",
      label: "제품 기능을 대화로 제어하는 Agent PoC",
      focus:
        "multi-agent 대신 하나의 planner-executor로 두고, planner는 typed plan만 만들고 실행 권한은 capability registry가 확인한 뒤 dispatch합니다. 예약·발행·삭제 같은 변경은 다음 turn의 typed confirmation을 통과할 때만 실행되고, receipt 기반 idempotency로 중복 실행을 막았습니다. 외부 상태 변경은 Mock gateway에서만 검증했습니다.",
      scope: "Planner·Capability Registry·상태 원장 직접 구현 · 독립 prototype (test 679 passed)",
      designs: ["agent-prototype"],
    },
    {
      kind: "dossier",
      slug: "thready-rebuild",
      label: "운영 중인 제품을 멈추지 않는 backend 교체 · 결함 재발 약 94% 감소",
      focus:
        "부분 수정과 backend 병렬 재구축을 비교해 재구축을 택하되 기존 frontend와 릴리스 흐름은 유지한 판단, 패턴·계층·검증 하네스를 먼저 세우고 응답을 비교한 뒤 전환한 과정, 그리고 재오픈 비율 37% → 11%·재발 발생 일평균 약 94% 감소(하루 4.5건 → 0.3건)의 결과를 봅니다.",
      scope: "FastAPI Backend 재구축·운영 전담",
      designs: ["rebuild-decision"],
    },
  ],
} satisfies RolePortfolio<"miridih">;
