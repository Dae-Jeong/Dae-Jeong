import type { RolePortfolio } from "./types";

export const JYP_PORTFOLIO = {
  slug: "jyp",
  label: "JYP ENTERTAINMENT · Software Engineer / AI",
  shortLabel: "JYP",
  signals: [
    "Coding Agent용 Backend 기준",
    "유료 AI 제품 운영",
    "제품 개발 체계·AX",
    "Agent Prototype",
  ],
  description:
    "업무 방식에서 문제를 찾고 AI를 실제로 쓰이는 제품과 사내 도구로 만든 경험을 JYP Software Engineer / AI JD에 맞춰 정리한 포트폴리오",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-09-03",
  // hero: Product Engineer 한 줄이 메인. 보조 줄·상태 라벨·중복 목차는 두지 않는다 (2026-09-03).
  brandLine: "",
  headline: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
  // hero 문단은 두 문장까지. 세부는 오른쪽 목차와 케이스가 맡는다 (2026-09-03).
  introduction:
    "기획자로 시작해 백엔드로 왔고, 지금은 아이디어를 제안한 AI 콘텐츠 제품을 월 1천만원 수준의 구독 매출이 발생하는 제품으로 만들고 운영합니다. AI 활용이 본격화되면서 모두가 메이커로 제품을 만들고 운영하는 팀에서, 백엔드 경험이 적은 팀원도 같은 기준으로 만들 수 있는 백엔드 기준을 직접 세웠습니다.",
  proofAxes: [
    {
      title: "Coding Agent를 위한 Backend 기본값",
      description:
        "백엔드 경험이 적은 팀원도 Coding Agent로도 같은 구조로 운영 제품을 만들 수 있게 FastAPI 기준을 template로 만들었습니다.",
    },
    {
      title: "고객이 구독하는 AI 제품",
      description:
        "자료 정리·초안·검수·예약·발행을 하나의 흐름으로 만들고 실제 고객에게 운영했습니다.",
    },
    {
      title: "대화형 제품 인터페이스",
      description:
        "여러 제품 기능을 대화 하나로 제어하고 변경 작업은 사용자가 확인하는 방식을 검증했습니다.",
    },
  ],
  cases: [
    {
      kind: "supporting",
      slug: "mediness-ops",
      label: "백엔드 경험이 적은 팀원도 Coding Agent로 운영 제품을 만드는 Backend 기준",
      focus:
        "QA·운영 준비 단계에서 드러나던 session·connection 문제를 계기로, @transactional·ContextVar session과 MVC·Hexagonal guide를 FastAPI Template으로 직접 구축했습니다.",
      scope: "Backend Template 직접 구축 · 구현 피드백·배포 지원 · 제품 운영 주도 · 회사 AX 설계 참여",
      // JYP: 회사 업무 AX·개발 체계를 앞에.
      designs: ["mediness-work-division", "transaction-template"],
    },
    {
      kind: "dossier",
      slug: "thready",
      label: "Threads 글쓰기의 반복을 고객이 구독하는 제품으로",
      focus:
        "사람이 반복하던 콘텐츠 제작 흐름을 재설계하고 FastAPI 백엔드·별도 AI 서비스를 직접 구현하고 핵심 화면은 coding agent로 완성해 유료 제품으로 운영한 경험입니다.",
      scope: "제품 운영 리드 · Backend·AI 직접 구현 · 화면은 coding agent로 완성",
      // JYP: AX 설계 2장 → 재구축 판단 → 구현 agent. Outbox는 백엔드 세부라 제외.
      designs: ["thready-ax-pipeline", "thready-ax-roles", "rebuild-decision", "thready-agent"],
    },
    {
      kind: "supporting",
      slug: "thready-agent-prototype",
      label: "여러 화면의 기능을 대화 하나로 다루는 방식",
      focus:
        "사용자가 기능의 위치와 순서를 외우는 대신 원하는 작업을 말하면 Agent가 등록된 Thready 기능을 선택하는 흐름을 구현했습니다. 외부 상태 변경은 Mock gateway에서만 검증했습니다.",
      scope: "Planner·Capability Registry·상태 원장 직접 구현",
      designs: ["agent-prototype"],
    },
  ],
} satisfies RolePortfolio<"jyp">;
