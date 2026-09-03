import {
  ROLE_CATALOG,
  ROLE_VARIANT_SLUGS,
  type RoleVariantSlug,
} from "@/content/role-catalog";
import type { RolePortfolio } from "./types";

const UPDATED_AT = "2026-08-26";
const MAKER_HOOK = "가능성을 기회로 바꾸고, 제품으로 가치를 전하는 메이커 김대정입니다.";

const ROLE_PORTFOLIOS_BY_SLUG = {
  "tech-lead-product": {
    ...ROLE_CATALOG["tech-lead-product"],
    description: "고객 문제·매출 outcome·직접 구현·회사 AX 실행 체계를 함께 보여주는 포트폴리오",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    brandLine: MAKER_HOOK,
    headline: "고객 문제를 실제 매출이 발생하는 제품으로 만들고, 회사가 반복해서 실행할 방식도 설계했습니다.",
    introduction:
      "Thready에서는 고객이 돈을 내는 이유를 기능·품질 기준으로 바꾸고 기획·QA·마케팅과 실제 매출이 발생하는 제품으로 운영했습니다. 제품에 필요한 Next.js 핵심 흐름과 FastAPI 백엔드·AI 생성·평가 영역을 직접 구현하고, 초기 백엔드를 팀이 운영할 수 있는 구조로 재구축했습니다. 이후 제품 개발에서 쌓인 결정·작업·검증을 회사 업무까지 이어갈 수 있도록 AX 전환 구조 설계에 참여했습니다.",
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
        title: "회사 AX 실행 체계",
        description: "제품 개발과 의사결정·회의·업무 배정·승인·후속 작업을 같은 맥락으로 잇습니다.",
      },
    ],
    cases: [
      {
        kind: "dossier",
        slug: "thready",
        focus:
          "고객이 돈을 내는 이유를 찾고 팀과 매출이 발생하는 제품으로 운영한 뒤, Next.js 핵심 흐름과 FastAPI·AI를 직접 구현하고 BE–AI 경계를 나눈 과정을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "be-template",
        focus:
          "MEDINESS 설계 참여·제품 적용 운영 리드·Backend Template 직접 구축을 구분하면서 회사 AX 전환 구조를 만든 방식을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "centurion-platform",
        focus:
          "서비스별 기여 범위를 구분하면서 주문·재고 작업과 예약 정책을 개발·QA·릴리스까지 이끈 방식을 봅니다.",
      },
    ],
  },
  "product-owner": {
    ...ROLE_CATALOG["product-owner"],
    description: "고객 문제·우선순위·유료 운영과 이를 직접 닫은 기술 실행을 보여주는 포트폴리오",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    brandLine: MAKER_HOOK,
    headline: "고객의 불편을 제품 우선순위로 바꾸고, 실제 고객이 결제하는 제품까지 운영했습니다.",
    introduction:
      "Thready에서는 고객이 돈을 내는 이유를 찾아 기능·실험·생성 품질 기준으로 구체화하고, 기획·QA·마케팅과 제품 운영을 리드했습니다. 판단을 문서로 넘기는 데서 끝내지 않고 FastAPI backend·AI 생성/평가·Next.js 핵심 흐름을 직접 구현했습니다. 이 경험을 바탕으로 제품 결정이 담당·QA·release까지 같은 기준으로 이어지는 운영 체계도 적용했습니다.",
    proofAxes: [
      {
        title: "고객 문제·우선순위",
        description: "요청이 아니라 사용자가 막히는 지점과 돈을 내는 이유에서 제품 범위를 정합니다.",
      },
      {
        title: "직접 구현·출시",
        description: "기술 제약을 직접 확인하고 backend·AI·핵심 화면을 출시 가능한 흐름으로 연결합니다.",
      },
      {
        title: "운영·제품 결과",
        description: "기획·QA·마케팅과 판단부터 release·유료 운영까지 하나의 제품 흐름으로 책임집니다.",
      },
    ],
    cases: [
      {
        kind: "dossier",
        slug: "thready",
        focus:
          "고객 문제를 기능·실험·품질 기준으로 바꾸고 팀과 유료 제품을 운영한 뒤, backend·AI·핵심 frontend를 직접 구현한 범위를 봅니다.",
      },
      {
        kind: "dossier",
        slug: "centurion-platform",
        focus:
          "예약 정책을 backend contract에서 화면·QA·release까지 연결하고 실시간 상담 제품의 구조 설계·통합에 기여한 방식을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "be-template",
        focus:
          "제품 판단과 작업 상태를 Decision·SPEC·Work Package·owner·QA approval·release gate로 이어 실제 운영한 방식을 봅니다.",
      },
    ],
  },
  backend: {
    ...ROLE_CATALOG.backend,
    description: "기술 범위와 전환 기준을 리드하고 직접 재구축·안정화한 backend 사례",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    brandLine: MAKER_HOOK,
    headline:
      "운영 중인 백엔드를 재구축하고, 어긋난 데이터와 실패한 작업을 복구할 수 있게 만들었습니다.",
    introduction:
      "Tech Lead 역할로 제품 운영과 기술 위험을 함께 보고 변화 범위·검증 기준·전환 시점을 정했습니다. Thready에서는 빠른 기능 검증 중심으로 만들어진 초기 백엔드를 기존 프런트엔드와 출시 흐름을 유지한 채 FastAPI로 병렬 재구축했습니다. AI는 코드 분석과 반복 구현에 활용했습니다. 이어 STG 데이터 이전과 Outbox 전달 경계를 검증했으며, Centurion과 Memento에서는 비동기 작업과 외부 결제의 실패 상태와 보상 흐름을 설계했습니다.",
    proofAxes: [
      {
        title: "재구축과 전환",
        description: "기존 사용자 흐름을 유지하면서 백엔드만 검증하고 교체합니다.",
      },
      {
        title: "데이터 이전 검증",
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
          "FastAPI 병렬 재구축부터 STG 데이터 이전, 중복·지연·역순 전달에도 최신 상태를 지키는 Outbox·version fence까지 이어진 과정을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "centurion-platform",
        focus:
          "주문·재고 작업을 API 요청에서 분리하고 재시도 소진 뒤에도 실패 기록과 수동 복구 경로를 남긴 설계를 봅니다.",
      },
      {
        kind: "dossier",
        slug: "be-template",
        focus:
          "제품별 차이를 숨기지 않으면서 layered core·contract·agent context를 조직의 실행 가능한 백엔드 기준으로 만든 경험을 봅니다.",
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
    brandLine: MAKER_HOOK,
    headline:
      "AI 실행부를 제품 원장과 나누고, 데이터 전달과 생성 품질을 검증 가능한 구조로 만들었습니다.",
    introduction:
      "Thready에서는 제품 정책·원장과 생성 실행 상태의 소유권을 분리하고, STG 데이터 이전과 중복·지연·역순 전달에도 최신 상태로 수렴하는 Outbox 경계를 검증했습니다. 시장 데이터·labeling workbench·생성 평가 실험은 근거 범위를 구분해 제품 품질 판단에 사용했고, Centurion에서는 실시간 상담 세션과 외부 AI 연동 경계에 공동 주 기여했습니다.",
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
      {
        kind: "dossier",
        slug: "be-template",
        focus:
          "agent가 맥락을 찾고 초안·반복·검증 근거를 준비하되 제품·아키텍처·QA·release 판단은 사람이 소유하도록 나눈 실행 구조를 봅니다.",
      },
    ],
  },
  "ax-fde": {
    ...ROLE_CATALOG["ax-fde"],
    description: "고객·현장 문제를 production system으로 바꾸고 적용·운영까지 이어간 포트폴리오",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    brandLine: MAKER_HOOK,
    headline:
      "현장의 문제를 제품으로 만들고, 실제 사용과 운영까지 이어갔습니다.",
    introduction:
      "Thready에서는 고객의 콘텐츠 제작 문제를 기능·품질 기준으로 바꾸고, 기획·QA·마케팅과 실제 고객이 결제하는 제품으로 운영했습니다. 여러 피부과의 운영·예약 요구는 multi-brand backend와 권한 경계로 구현했고, 이전에는 생성형 AI 커머스 제품을 prototype에서 외부 기업 PoC까지 구체화했습니다. 이렇게 현장에서 반복해 온 판단과 검증 방식을 제품 운영 체계와 회사 AX 구조로 확장했습니다.",
    proofAxes: [
      {
        title: "고객과 현장 이해",
        description: "요청 목록보다 실제 업무 흐름과 사용자가 막히는 지점에서 문제를 정의합니다.",
      },
      {
        title: "끝까지 직접 닫는 실행",
        description: "기술 범위를 정하고 backend·AI·핵심 화면을 구현해 출시와 운영까지 연결합니다.",
      },
      {
        title: "반복 가능한 운영 방식",
        description: "현장에서 확인한 판단과 검증 기준을 사람·agent가 다시 사용할 수 있는 실행 구조로 남깁니다.",
      },
    ],
    cases: [
      {
        kind: "dossier",
        slug: "thready",
        focus:
          "고객의 콘텐츠 제작 문제를 기능·품질 기준으로 바꾸고, 직접 구현과 팀의 유료 제품 운영까지 이어간 과정을 봅니다.",
      },
      {
        kind: "supporting",
        slug: "nexus-operations",
        focus:
          "여러 피부과의 운영·예약 요구를 service boundary·migration·지점 권한 상태로 구현하고 현장 성과에 기여한 범위를 봅니다.",
      },
      {
        kind: "supporting",
        slug: "sellercanvas-poc",
        focus:
          "외부 기업의 비즈니스 요구를 제품 범위와 기술 검증 항목으로 바꿔 prototype에서 PoC까지 전달한 경험을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "be-template",
        focus:
          "제품 운영에서 반복된 판단·작업·검증 방식을 회사 AX 구조와 agent-readable FastAPI 기반으로 확장한 과정을 봅니다.",
      },
    ],
  },
  "backend-platform": {
    ...ROLE_CATALOG["backend-platform"],
    description: "공통 백엔드 기반·데이터 경계·비동기 복구를 전면에 둔 포트폴리오",
    status: "draft",
    visibility: "local",
    updatedAt: UPDATED_AT,
    brandLine: MAKER_HOOK,
    headline:
      "여러 제품의 백엔드 기반을, 다시 사용할 수 있고 운영 가능한 구조로 만들었습니다.",
    introduction:
      "제품마다 구조와 작업 규칙을 다시 만들지 않도록 공통 FastAPI 기반과 agent context를 구축했습니다. Thready에서는 애플리케이션·DB의 소유권을 나누고 데이터 이전과 Outbox 전달을 검증했으며, Centurion에서는 API와 worker를 분리해 재시도 뒤에도 운영자가 복구할 수 있는 상태를 남겼습니다.",
    proofAxes: [
      {
        title: "공통 백엔드 기반",
        description: "반복되는 아키텍처·계약·운영 규칙을 재사용 가능한 시작점으로 만듭니다.",
      },
      {
        title: "데이터 소유권과 이전",
        description: "서비스와 DB의 책임을 나누고 이전 전후의 데이터를 검증합니다.",
      },
      {
        title: "작업 상태와 복구",
        description: "재시도·최종 실패·수동 재처리 경계를 운영 가능한 상태로 남깁니다.",
      },
    ],
    cases: [
      {
        kind: "dossier",
        slug: "be-template",
        focus:
          "layered core·ADR·runbook·agent context를 여러 제품에서 다시 쓸 수 있는 실행 기반으로 만든 경험을 봅니다.",
      },
      {
        kind: "dossier",
        slug: "thready",
        focus:
          "애플리케이션·DB 분리 과정에서 STG 데이터 이전과 중복·지연·역순 전달에도 최신 상태를 지키는 구조를 함께 다룬 경험을 봅니다.",
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
