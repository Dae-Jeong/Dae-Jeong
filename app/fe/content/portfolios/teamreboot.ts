import type { RolePortfolio } from "./types";

export const TEAMREBOOT_PORTFOLIO = {
  slug: "teamreboot",
  label: "팀리부뜨 · AI-Native Engineer (Backend)",
  shortLabel: "팀리부뜨",
  signals: [
    "유료 AI 제품 출시·운영",
    "비동기 작업·실시간 상태·복구",
    "FastAPI·SQLAlchemy async",
    "coding agent 기반 개발·검증",
  ],
  description:
    "운영 중인 AI 제품, 비동기·실시간 처리, FastAPI 기준과 coding agent 활용을 팀리부뜨 JD 순서로 보여주는 포트폴리오",
  status: "draft",
  visibility: "local",
  updatedAt: "2026-09-01",
  brandLine: "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.",
  headline:
    "고객이 돈을 내고 쓰는 AI 제품을 출시하고, 실패한 작업을 찾아 다시 처리할 수 있게 만들었습니다.",
  introduction:
    "구독료를 내는 고객이 쓰는 AI 콘텐츠 제품의 문제 정의부터 FastAPI 백엔드·별도 AI 서비스·핵심 사용자 흐름의 구현과 운영까지 연결했습니다. AI·실시간·비동기 작업이 실패하면 상태를 확인하고 다시 처리할 수 있게 만들었으며, Coding Agent는 분석과 반복 구현에 쓰고 설계·테스트·배포 기준은 직접 정했습니다.",
  proofAxes: [
    {
      title: "AI 제품 출시·운영",
      description:
        "생성 기능에 그치지 않고 고객의 전체 사용 흐름과 유료 운영까지 연결합니다.",
    },
    {
      title: "비동기 실행·실시간 상태",
      description:
        "중복·지연·역순·worker 중단이 발생해도 실패한 작업을 확인하고 다시 처리합니다.",
    },
    {
      title: "FastAPI·Coding Agent 개발 기준",
      description:
        "트랜잭션·세션·검증 규칙을 코드와 문서에 남기고 사람의 검토 뒤 배포합니다.",
    },
  ],
  cases: [
    {
      kind: "dossier",
      slug: "thready",
      label: "유료 AI 제품 출시·운영",
      focus:
        "고객의 콘텐츠 제작 문제를 구독 매출이 발생하는 AI 제품으로 만들고, FastAPI 제품 백엔드·별도 AI 서비스·외부 모델 장애 대응까지 운영한 범위를 봅니다.",
    },
    {
      kind: "dossier",
      slug: "centurion-platform",
      label: "비동기 작업·실시간 상태·복구",
      focus:
        "Celery에서 RabbitMQ·TaskIQ로 전환한 이유와 작업 상태·재시도·수동 복구, WebSocket 상담의 sequence 기반 실시간 처리를 봅니다.",
    },
    {
      kind: "dossier",
      slug: "be-template",
      label: "FastAPI 백엔드 개발 기준",
      variant: "backend-template",
      focus:
        "session 인자 반복에서 시작해 FastAPI·SQLAlchemy async의 트랜잭션·세션 경계와 Coding Agent가 따르는 검증 기준을 직접 구축한 경험을 봅니다.",
    },
    {
      kind: "supporting",
      slug: "memento-payment",
      label: "결제·인증 데이터 정합성",
      focus:
        "외부 결제와 로컬 DB를 하나의 트랜잭션으로 가정하지 않고 취소·환불과 내부 자산 변경 시점을 분리한 경험을 봅니다.",
    },
  ],
} satisfies RolePortfolio<"teamreboot">;
