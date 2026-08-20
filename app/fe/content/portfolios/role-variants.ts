import {
  ROLE_CATALOG,
  ROLE_VARIANT_SLUGS,
  type RoleVariantSlug,
} from "@/content/role-catalog";
import type { RolePortfolio } from "./types";

const UPDATED_AT = "2026-08-20";

const ROLE_PORTFOLIOS_BY_SLUG = {
  "tech-lead-product": {
    ...ROLE_CATALOG["tech-lead-product"],
    description: "제품 판단·직접 구현·운영 체계를 전면에 둔 포트폴리오",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    headline: "무엇을 만들지 정하고, 직접 만들어 실제 운영까지 가져갔습니다.",
    introduction:
      "Thready에서는 고객 문제를 기능·실험·품질 기준으로 바꾸고 기획·QA·마케팅과 제품 운영을 이끌었습니다. FastAPI 백엔드와 AI 생성·평가, Next.js 핵심 흐름을 직접 구현했고, 여러 제품이 같은 기준으로 개발·배포되도록 실행 기반도 만들었습니다.",
    proofAxes: [
      {
        title: "문제에서 제품까지",
        description: "고객 문제와 시장 관측을 기능·품질·출시 기준으로 구체화합니다.",
      },
      {
        title: "판단 뒤에는 직접 구현",
        description: "백엔드·AI·핵심 프런트엔드를 실제 사용자 흐름으로 연결합니다.",
      },
      {
        title: "반복 가능한 실행",
        description: "비동기 복구·백엔드 표준·인프라 변경 절차를 팀의 기준으로 남깁니다.",
      },
    ],
    cases: [
      {
        kind: "dossier",
        slug: "thready",
        focus:
          "기획·QA·마케팅과 제품 운영을 이끌면서 백엔드·AI·핵심 프런트엔드를 직접 구현해 유료 제품을 운영한 범위를 봅니다.",
      },
      {
        kind: "dossier",
        slug: "centurion-platform",
        focus:
          "서비스별 기여 범위를 구분하면서 주문·재고 작업과 예약 정책을 개발·QA·릴리스까지 이끈 방식을 봅니다.",
      },
      {
        kind: "supporting",
        slug: "be-template",
        focus:
          "소수 인원이 여러 제품을 맡는 환경에서 아키텍처·개발 규칙·agent context를 공통 시작점으로 만든 경험을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "infrastructure-delivery",
        focus:
          "회사 Azure를 전담하면서 AI 활용과 사람의 적용 책임을 분리해 한 사람이 관리할 수 있는 변경 체계를 만든 경험을 봅니다.",
      },
    ],
  },
  backend: {
    ...ROLE_CATALOG.backend,
    description: "재구축·데이터 정합성·실패 복구를 전면에 둔 포트폴리오",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    headline:
      "운영 중인 백엔드를 재구축하고, 어긋난 데이터와 실패한 작업을 복구할 수 있게 만들었습니다.",
    introduction:
      "Thready에서는 기존 프런트엔드와 출시 흐름을 유지한 채 FastAPI 백엔드를 병렬 전환하고, AI 애플리케이션·DB 이전과 Outbox 전달 경계를 구현했습니다. Centurion과 Memento에서는 비동기 작업과 외부 결제가 실패했을 때 남겨야 할 상태와 보상 흐름을 설계했습니다.",
    proofAxes: [
      {
        title: "재구축과 전환",
        description: "기존 사용자 흐름을 유지하면서 백엔드만 검증하고 교체합니다.",
      },
      {
        title: "데이터 정합성",
        description: "서비스·DB의 소유권을 나누고 이전 전후의 데이터를 검증합니다.",
      },
      {
        title: "실패와 복구",
        description: "재시도·최종 실패·수동 재처리·외부 결제 보상을 명시적인 상태로 남깁니다.",
      },
    ],
    cases: [
      {
        kind: "dossier",
        slug: "thready",
        focus:
          "FastAPI 백엔드 병렬 전환, STG 데이터 이전 검증, Outbox·retry·version fence를 하나의 정합성 문제로 다룬 과정을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "centurion-platform",
        focus:
          "주문·재고 작업을 API 요청에서 분리하고 재시도 소진 뒤에도 실패 기록과 수동 복구 경로를 남긴 설계를 봅니다.",
      },
      {
        kind: "dossier",
        slug: "memento-payment",
        focus:
          "외부 결제와 로컬 DB를 하나의 트랜잭션처럼 가정하지 않고 취소·환불 보상과 환불 완료 시점을 분리한 흐름을 봅니다.",
      },
    ],
  },
  "ai-product-backend": {
    ...ROLE_CATALOG["ai-product-backend"],
    description: "AI 실행 경계·데이터 이전·생성 품질을 전면에 둔 포트폴리오",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    headline:
      "AI 실행부를 제품 원장과 나누고, 데이터 전달과 생성 품질을 검증 가능한 구조로 만들었습니다.",
    introduction:
      "Thready에서는 제품 정책·원장과 생성 실행 상태의 소유권을 분리하고, STG 데이터 이전과 Outbox 전달을 검증했습니다. 시장 데이터·labeling workbench·생성 평가 실험은 근거 범위를 구분해 제품 품질 판단에 사용했고, Centurion에서는 실시간 상담 세션과 외부 AI 연동 경계에 공동 주 기여했습니다.",
    proofAxes: [
      {
        title: "AI 실행 경계",
        description: "제품 원장과 생성 lifecycle의 소유자를 분리합니다.",
      },
      {
        title: "데이터와 평가",
        description: "시장 관측·labeling·writer/judge 실험을 구분해 비교 가능한 근거로 만듭니다.",
      },
      {
        title: "실시간 lifecycle",
        description: "중복 이벤트·재연결·외부 AI 상태를 세션 경계에서 제어합니다.",
      },
    ],
    cases: [
      {
        kind: "dossier",
        slug: "thready",
        focus:
          "AI 애플리케이션·DB 분리, STG migration·Outbox와 함께 시장 데이터·labeling·생성 평가를 제품 구조 안에 배치한 과정을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "centurion-platform",
        focus:
          "실시간 AI 상담에서 WebSocket 세션, 중복 이벤트와 외부 AI lifecycle을 분리해 다룬 공동 기여 범위를 봅니다.",
      },
    ],
  },
  "ax-fde": {
    ...ROLE_CATALOG["ax-fde"],
    description: "고객 문제 정의·제품 실행·AI-assisted delivery를 전면에 둔 포트폴리오",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    headline:
      "고객의 문제를 제품 규칙으로 바꾸고, 팀과 AI가 실행할 수 있는 상태까지 연결했습니다.",
    introduction:
      "Thready에서는 고객이 막히는 지점을 기능·실험·품질 기준으로 바꾸고 직접 제품으로 구현했습니다. 이후 제품 결정을 Decision·SPEC·Work Package·QA·release 상태로 연결하고, 사람과 AI agent가 같은 아키텍처와 작업 기준을 읽도록 실행 체계를 만들었습니다.",
    proofAxes: [
      {
        title: "문제 정의와 제품화",
        description: "요청을 그대로 구현하지 않고 고객의 막힘을 기능과 검증 기준으로 바꿉니다.",
      },
      {
        title: "결정에서 출시까지",
        description: "제품 결정을 담당자·작업 상태·QA 승인·release gate와 연결합니다.",
      },
      {
        title: "사람과 AI의 책임 분리",
        description: "반복 작업은 AI로 가속하고 제품 판단과 승인은 사람이 확인할 수 있게 남깁니다.",
      },
    ],
    cases: [
      {
        kind: "dossier",
        slug: "thready",
        focus:
          "고객의 콘텐츠 제작 문제를 기능·실험·품질 기준으로 바꾸고 제품 운영과 직접 구현을 함께 수행한 범위를 봅니다.",
      },
      {
        kind: "supporting",
        slug: "mediness-ops",
        focus:
          "제품 요구·운영 흐름의 설계 참여와 Decision·SPEC·작업·QA·release 운영 리드를 구분해 봅니다.",
      },
      {
        kind: "supporting",
        slug: "be-template",
        focus:
          "사람과 AI agent가 같은 아키텍처·개발 규칙·자동화 절차를 읽도록 만든 조직 표준을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "centurion-platform",
        focus:
          "DAY 예약 정책을 백엔드 판단에서 프런트엔드 표시·QA·릴리스까지 같은 기준으로 전달한 경험에 초점을 둡니다.",
      },
    ],
  },
  "backend-platform": {
    ...ROLE_CATALOG["backend-platform"],
    description: "IaC 변경 안전성·관측·공통 백엔드 기반을 전면에 둔 포트폴리오",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    headline:
      "여러 제품의 인프라와 백엔드 기반을, 한 사람이 안전하게 운영할 수 있는 구조로 만들었습니다.",
    introduction:
      "회사 Azure를 제품·환경별 Terraform state로 나누고, 코드·state·plan·실제 리소스를 대조한 뒤 변경하도록 운영했습니다. 애플리케이션 쪽에서는 공통 FastAPI 기반과 데이터 이전·Outbox·worker 복구 경계를 만들어 여러 제품을 적은 인원으로 운영할 수 있게 했습니다.",
    proofAxes: [
      {
        title: "변경 범위 격리",
        description: "환경·서비스·데이터 소유권별로 변경의 영향 범위를 나눕니다.",
      },
      {
        title: "관측과 복구",
        description: "로그·알림·재시도·최종 실패와 수동 복구 경로를 운영 상태로 남깁니다.",
      },
      {
        title: "공통 백엔드 기반",
        description: "반복되는 아키텍처·계약·운영 규칙을 재사용 가능한 시작점으로 만듭니다.",
      },
    ],
    cases: [
      {
        kind: "dossier",
        slug: "infrastructure-delivery",
        focus:
          "6개 Terraform state와 state·plan·실제 Azure 리소스 대조를 통해 변경 범위와 적용 책임을 통제한 운영 체계를 봅니다.",
      },
      {
        kind: "supporting",
        slug: "be-template",
        focus:
          "공통 아키텍처와 프로젝트별 선택지를 분리하고 ADR·runbook·agent context까지 묶은 백엔드 기반을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "thready",
        focus:
          "애플리케이션·DB 분리 과정에서 기존 데이터 이전과 이후의 지연·중복·역순 전달을 함께 다룬 경험을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "centurion-platform",
        focus:
          "API와 worker의 실행·배포 경계를 나누고 재시도 이후에도 운영자가 복구할 수 있는 상태를 남긴 설계를 봅니다.",
      },
    ],
  },
} satisfies Record<RoleVariantSlug, RolePortfolio>;

export const ROLE_PORTFOLIOS = ROLE_VARIANT_SLUGS.map(
  (slug) => ROLE_PORTFOLIOS_BY_SLUG[slug],
);
