import type { RolePortfolio } from "./types";

/**
 * 하이퍼노바 · [헤이링] Product Engineer 포트폴리오.
 * 문안 owner: wiki/products/resume/tailored/hypernova/2026-09-03_groupby_product-engineer/content-draft.md (2026-09-04 승인).
 * 케이스 본문은 lib/cases 의 공통 dossier 가 렌더한다. 회사별로 바꾸는 것은 label·focus·scope·designs 뿐이다.
 * 실시간 상담(archive `say-realtime`)은 cases 타입이 받지 않아 `centurion-platform` dossier 안의 보조 선택으로 둔다.
 */
export const HYPERNOVA_PORTFOLIO = {
  slug: "hypernova",
  label: "하이퍼노바 · [헤이링] Product Engineer",
  shortLabel: "하이퍼노바",
  signals: [
    "AI 코드 검증 체계 · 팀 표준",
    "하네스 기반 backend 재구축",
    "planner-executor Agent 설계",
    "실시간 음성 AI 순서 정합",
  ],
  description:
    "AI 코드 검증 체계와 팀 표준, 하네스 기반 재구축, Agent 설계, 실시간 음성 AI를 하이퍼노바 JD 순서로",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-09-04",
  heroVariant: "light",
  // hero: 브랜딩 한 줄이 메인. 보조 줄·상태 라벨·중복 목차는 두지 않는다.
  brandLine: "",
  headline: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
  // hero 문단은 두 문장까지 (게이트 16).
  introduction:
    "기획자로 시작해 백엔드로 왔고, 지금은 아이디어를 제안한 AI 콘텐츠 제품의 백엔드·AI 실행부를 직접 만들고 핵심 화면은 coding agent로 완성해 월 1천만원 수준의 구독 매출이 발생하는 제품으로 운영합니다. 팀이 coding agent로 만들어도 같은 기준이 되도록 FastAPI 조직 표준과 evidence로 닫는 QA 판정 규칙을 세웠고, 제품 기능을 대화로 제어하는 Agent를 설계·검증했습니다.",
  proofAxes: [
    {
      title: "팀이 같은 기준으로 만드는 AI 코드 검증 체계",
      description:
        "자주 틀리는 경계를 기본값으로 제공하는 FastAPI 조직 표준 template과, 요구사항을 REQ로 쪼개 evidence로 닫는 QA 판정 규칙(PASS/FAIL/UNKNOWN)을 세웠습니다. 실행 성공과 품질 통과를 분리하고 LLM judge 단독 승인은 금지했습니다.",
    },
    {
      title: "하네스를 먼저 세운 배포",
      description:
        "패턴·계층·검증 하네스를 먼저 세우고 그 위에서 coding agent와 새 backend를 나란히 만들어 응답을 비교한 뒤 전환했습니다. 운영 중인 제품을 멈추지 않고 backend를 교체해 결함 재발을 약 94% 줄였습니다.",
    },
    {
      title: "Agent 설계와 컨텍스트 실측",
      description:
        "판정 위치를 planner로 옮기고, 생성 파이프라인은 15노드 legacy 그래프를 단일 파이프라인으로 축소한 뒤 단일 agent 엔진과 실행 시간을 비교했습니다. 대화형 제어는 하나의 planner-executor로 두고 컨텍스트 압축·멱등 receipt·사람 승인 경계를 실측으로 검증했습니다.",
    },
    {
      title: "실시간 음성 AI의 순서 정합",
      description:
        "부분·완성·보정 전사를 같은 sequence로 묶어 늦게 도착한 보정이 다른 발화를 덮지 않게 했고, 중복 event는 task cancellation·debounce·retry·turn-state guard로 제어했습니다.",
    },
  ],
  cases: [
    {
      kind: "dossier",
      slug: "be-template",
      label: "조직 표준 Template · QA 판정 규칙 · AI가 만든 코드를 팀이 같은 기준으로 검증",
      variant: "backend-template",
      focus:
        "팀이 coding agent로 기능을 만들기 시작하면서 백엔드 경험이 적은 담당자도 구현에 참여했고, QA와 운영 준비 단계에서 사용량이나 동시 요청 조건에 따라 구조적인 문제가 자주 드러났습니다. 기능마다 완벽한 구조를 요구하는 대신 자주 틀리는 경계를 기본값으로 제공한 판단, Service가 transaction 정책을 선언하고 Repository는 현재 session만 resolve하게 한 구조, 그리고 요구사항을 REQ로 쪼개 evidence로 닫는 QA 판정 규칙을 QA 팀원의 서포트를 받아 세우고 실행 성공과 품질 통과를 분리한 과정을 봅니다. propagation·isolation·CancelledError rollback·connection cleanup을 integration test로 고정한 template 위에서 신규 프로그램의 STG QA에서 같은 유형의 session·connection 문제가 재관측되지 않았습니다.",
      scope: "FastAPI Template·agent 작업 맥락 직접 구축 · QA 판정 규칙은 QA 팀원의 서포트를 받아 설계",
      designs: ["transaction-template", "quality-layers"],
    },
    {
      kind: "dossier",
      slug: "thready-rebuild",
      label: "운영 중인 제품을 멈추지 않는 backend 교체 · 결함 재발 약 94% 감소",
      focus:
        "부분 수정과 backend 병렬 재구축을 비교해 재구축을 택하되 기존 frontend와 릴리스 흐름은 유지한 판단, 패턴·계층·검증 하네스를 먼저 세우고 coding agent와 새 backend를 나란히 만들어 응답을 비교한 뒤 전환한 과정, 그리고 재오픈 비율 37% → 11%·재발 발생 일평균 약 94% 감소(하루 4.5건 → 0.3건)의 결과를 봅니다. 재구축 범위·architecture·검증·전환 판단은 직접 소유하고, coding agent는 codebase 파악·기능 inventory·반복 구현에 썼습니다.",
      scope: "FastAPI Backend 재구축·운영 전담",
      designs: ["rebuild-decision"],
    },
    {
      kind: "supporting",
      slug: "thready-agent-prototype",
      label: "제품 기능을 대화로 제어하는 Agent · planner-executor 설계와 실측",
      focus:
        "생성 파이프라인에서 글 유형 분기 판정을 writer에 뒀을 때 18건 전부 미발동한 문제를 판정 위치를 planner로 옮겨 풀었고, 15노드 legacy 그래프를 publishable 단일 파이프라인으로 축소한 뒤 SDK 기반 단일 agent 엔진을 같은 guard·repair 코드로 병존시켜 실 파이프라인에서 실행 시간을 비교했습니다(agent 엔진 43초 vs 그래프 294초). 대화형 제어는 multi-agent 대신 하나의 planner-executor로 두고, planner는 typed plan만 만들고 실행 권한은 capability registry가 확인한 뒤 dispatch합니다. 예약·발행·삭제 같은 변경은 다음 turn의 typed confirmation을 통과할 때만 실행되고, receipt 기반 idempotency로 중복 실행을 막았습니다.",
      scope: "Planner·Capability Registry·상태 원장 직접 구현 · 독립 prototype (test 679 passed) · 외부 상태 변경은 Mock gateway에서만 검증",
      designs: ["agent-prototype", "thready-ax-roles"],
    },
    {
      kind: "dossier",
      slug: "thready",
      label: "아이디어를 고객이 구독하는 제품으로 · 생성 품질 3층",
      focus:
        "Threads 글 제작의 반복을 제품 흐름으로 바꾸고, AI는 자료 정리·초안·1차 검수를 맡고 최종 수정·예약·발행 판단은 사람이 하도록 설계한 판단, 그리고 품질 판정을 자동 게이트·실측 분포·사람 판정 3층으로 나눈 체계를 봅니다. 프롬프트 기준값이 자사 출력을 되먹이던 순환을 재실측으로 발견해 기준을 교정했습니다.",
      scope: "제품 운영 리드 · FastAPI 백엔드·AI 생성/평가 직접 구현 · 핵심 화면은 coding agent로 완성",
      designs: ["thready-ax-pipeline"],
    },
    {
      kind: "dossier",
      slug: "centurion-platform",
      label: "실시간 음성 AI 상담 · 세션과 전사 순서 경계 공동 안정화",
      focus:
        "이 사례에서는 실시간 상담 backend를 봅니다. 실시간 STT가 내보내는 부분 전사와 완성 전사, 비동기로 뒤늦게 도착하는 보정 결과가 같은 WebSocket 세션 안에서 섞여 늦은 보정이 다른 turn을 덮거나 중복 event가 상태를 흔들었습니다. 부분 전사는 domain keyword 우선 판정에, 완성 전사는 문맥 판단·저장에 쓰도록 역할을 나누고 부분·완성·보정을 같은 sequence로 묶어 순서로 정합을 보장한 판단, 중복 event를 task cancellation·debounce·retry·turn-state guard로 제어한 구현, 그리고 외부 모델 세션이 끊겨도 발화 순서가 유지되는 경계와 provider 후보 비교용 WER·CER·keyword retention·latency benchmark를 봅니다.",
      scope: "실시간 상담 Backend 공동 주 기여 · 보조 사례",
      designs: ["say-overlap-sessions", "sequence-fence"],
    },
  ],
} satisfies RolePortfolio<"hypernova">;
