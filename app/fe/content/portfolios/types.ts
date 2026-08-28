import type { RoleVariantSlug } from "@/content/role-catalog";
import type { DossierCaseSlug, SupportingCaseSlug } from "@/lib/cases";

export type RolePortfolioCaseSelection =
  | {
      kind: "dossier";
      slug: DossierCaseSlug;
      focus: string;
    }
  | {
      kind: "supporting";
      slug: SupportingCaseSlug;
      focus: string;
    };

export type RolePortfolio = {
  slug: RoleVariantSlug;
  label: string;
  shortLabel: string;
  signals: readonly string[];
  description: string;
  status: "draft";
  visibility: "local";
  updatedAt: string;
  brandLine: string;
  headline: string;
  introduction: string;
  proofAxes: readonly {
    title: string;
    description: string;
  }[];
  cases: readonly RolePortfolioCaseSelection[];
};

export type PortfolioLayer =
  | "Product"
  | "Backend"
  | "Operations"
  | "Infrastructure"
  | "AI";

export type PortfolioCaseMode =
  | "single-system"
  | "cross-project-pattern"
  | "primary-with-prior-lesson";

export type PortfolioStatus = {
  label: string;
  tone: "verified" | "in-progress" | "pre-production";
};

export type PortfolioFrame = {
  label: string;
  text: string;
  tone: "context" | "decision" | "outcome";
};

export type PortfolioDetailItem = {
  title?: string;
  text: string;
  verdict?: "selected" | "rejected" | "not-claimed" | "proposed";
};

export type PortfolioDetailSection = {
  kind:
    | "problem"
    | "constraints"
    | "decision"
    | "alternatives"
    | "implementation"
    | "proposal";
  label: string;
  items: PortfolioDetailItem[];
};

export type PortfolioEvidence = {
  project: string;
  scope: string;
  ownership: "owned" | "led" | "contributed" | "supporting";
  status: "verified" | "in-progress" | "pre-production" | "historical";
  relation: "primary" | "pattern-instance" | "corroborating" | "prior-lesson" | "supporting-precedent";
  text: string;
  claimIds: string[];
};

export type PortfolioClaimCeiling = {
  allowed: string[];
  forbidden: string[];
};

export type PortfolioJdFit = {
  matches: string[];
  boundary?: string;
};

export type PortfolioNarrative = {
  context: string;
  problem: string;
  actions: string[];
  resultLabel:
    | "남은 상태"
    | "현재 진행"
    | "현재 책임 범위"
    | "검증 상태"
    | "결과";
  result: string;
  visualLead: string;
  axExtension?: {
    title: string;
    paragraphs: string[];
    claimIds: string[];
  };
};

export type IndependentLanesVisual = {
  kind: "independent-lanes";
  title: string;
  lanes: {
    label: string;
    items: string[];
    tone: "context" | "contract" | "delivery";
  }[];
  caption: string;
};

export type AxWorkflowVisual = {
  kind: "ax-workflow";
  title: string;
  stages: {
    role: "human" | "contract" | "ai" | "system";
    label: string;
    items: string[];
  }[];
  evidenceBands: {
    label: string;
    text: string;
  }[];
  caption: string;
};

export type RuntimeRecoveryVisual = {
  kind: "runtime-recovery";
  title: string;
  request: string;
  worker: string;
  states: string[];
  failure: string;
  recovery: string[];
  priorLesson: string;
  caption: string;
};

export type CutoverMapVisual = {
  kind: "cutover-map";
  title: string;
  phases: string[];
  lanes: {
    label: string;
    tone: "continuity" | "change" | "verification";
    nodes: {
      phase: number;
      text: string;
      span?: number;
      emphasis?: "selected" | "gate" | "evidence";
    }[];
  }[];
  caption: string;
};

export type InfraOwnershipVisual = {
  kind: "infra-ownership";
  title: string;
  productBoundaries: string[];
  layers: {
    label: string;
    items: string[];
    owned: boolean;
  }[];
  supportingProof?: {
    label: string;
    items: string[];
  };
  caption: string;
};

export type AiSystemVisual = {
  kind: "ai-system";
  title: string;
  ownership: {
    productBackend: {
      label: string;
      database: string;
      owns: string[];
    };
    aiRuntime: {
      label: string;
      database: string;
      owns: string[];
    };
  };
  transaction: {
    label: string;
    items: string[];
    outbox: string;
  };
  delivery: {
    worker: string;
    retry: string;
    transport: string;
    authentication: string;
  };
  versionFence: {
    rule: string;
    outcomes: string[];
  };
  verificationRail: string[];
  caption: string;
};

export type CompactFlowVisual = {
  kind: "compact-flow";
  title: string;
  chart?: string;
  lanes: {
    label: string;
    note?: string;
    tone: "context" | "decision" | "delivery" | "failure" | "proposed";
    stages: {
      label: string;
      detail?: string;
      emphasis?: "strong" | "outcome";
    }[];
  }[];
  loadBehavior?: {
    title: string;
    description: string;
    headers?: {
      situation: string;
      behavior: string;
      watch: string;
    };
    rows: {
      situation: string;
      behavior: string;
      watch: string;
    }[];
  };
  caption: string;
};

export type PortfolioQualityLab = {
  title: string;
  description: string;
  automated: string[];
  measurement: string[];
  human: string[];
  boundary: string;
  claimIds: string[];
};

export type PortfolioVisual =
  | IndependentLanesVisual
  | AxWorkflowVisual
  | RuntimeRecoveryVisual
  | CutoverMapVisual
  | InfraOwnershipVisual
  | AiSystemVisual
  | CompactFlowVisual;

export type PortfolioOutcome = {
  no: string;
  title: string;
  caseMode: PortfolioCaseMode;
  layers: PortfolioLayer[];
  status?: PortfolioStatus;
  outcomeLine: string;
  compositionCaption: string;
  narrative: PortfolioNarrative;
  frame: PortfolioFrame[];
  details: PortfolioDetailSection[];
  visual: PortfolioVisual;
  operation: string[];
  limits: string[];
  evidence: PortfolioEvidence[];
  claimCeiling: PortfolioClaimCeiling;
  jdFit: PortfolioJdFit;
  claimIds: string[];
};

export type PortfolioCareerBridge = {
  eyebrow?: string;
  numbered?: boolean;
  title: string;
  summary: string;
  stages: {
    label: string;
    text: string;
    layers: PortfolioLayer[];
    claimIds: string[];
  }[];
  caption: string;
  claimIds: string[];
};

export type PortfolioWorkSystem = {
  title: string;
  summary: string[];
  caption?: string;
  foundation: string[];
  lanes: {
    kind: "human" | "ai" | "automated";
    label: "Human Judgment" | "AI Execution" | "Agent Usage" | "Automated Verification";
    meta?: {
      role: string;
      owner: string;
      description: string;
    };
    items: string[];
  }[];
  qualityLab?: PortfolioQualityLab;
  evidence: PortfolioEvidence[];
  limits: string[];
  claimIds: string[];
};

export type TailoredPortfolio = {
  slug: string;
  companyName: string;
  position: string;
  status: "draft" | "approved" | "closed";
  visibility: "local" | "public";
  updatedAt: string;
  introduction: string[];
  careerBridge: PortfolioCareerBridge;
  outcomes: PortfolioOutcome[];
  workSystem: PortfolioWorkSystem;
};
