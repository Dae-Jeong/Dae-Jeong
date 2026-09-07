import type { DocumentContact } from "@/content/documents/types";

/** Ordered, reviewed prose exported without adding a case-template narrative. */
export type NarrativePortfolio = {
  slug: string;
  label: string;
  visibility: "local" | "public";
  updatedAt: string;
  name: string;
  role: string;
  contacts: readonly DocumentContact[];
  headline: string;
  introduction: string;
  cases: readonly {
    id: string;
    title: string;
    scope: string;
    claimIds: readonly string[];
    sections: readonly {
      title: string;
      paragraphs: readonly string[];
      table?: {
        columns: readonly string[];
        rows: readonly (readonly string[])[];
      };
      afterTable?: readonly string[];
    }[];
  }[];
};
