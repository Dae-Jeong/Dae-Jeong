import type { ContentBlock, ContentDocument, ContentSection, TextBlock } from "./parse-markdown";
import type { CareerDescriptionDocument, CareerProject } from "./types";

/**
 * Converts a typed career description (content/documents/*.ts) into the content shape of the single career renderer
 * (app/_components/documents/career/career-document.tsx, portrait A4 sheet). The TypeScript source stays the owner of its copy, claims and
 * visibility; this adapter only re-shapes it (2026-09-29 single-renderer contract). Every string is passed through
 * unchanged, the former field labels (담당 범위 · 문제 · 선택 · 구현 · 검증 · 결과 · 범위) become case labels, and project
 * ids stay as section anchors so existing `#project-id` links still resolve.
 */

const paragraph = (text: string, claims: readonly string[], presentation?: TextBlock["presentation"]): TextBlock =>
  ({ kind: "paragraph", text, claims: [...claims], ...(presentation ? { presentation } : {}) });
const bullet = (text: string, claims: readonly string[]): TextBlock => ({ kind: "bullet", text, claims: [...claims] });

function projectSection(project: CareerProject): ContentSection {
  const claims = project.claimIds;
  if ("sections" in project) {
    return {
      title: project.title, level: 3, anchor: project.id, blocks: [],
      children: project.sections.map((section): ContentSection => ({
        title: section.title, level: 4, children: [],
        blocks: [...(section.paragraphs ?? []).map((text) => paragraph(text, claims)), ...(section.bullets ?? []).map((text) => bullet(text, claims))],
      })),
    };
  }
  const labelled = (label: string, blocks: ContentBlock[]) => [paragraph(label, claims, "label"), ...blocks];
  return {
    title: project.title, level: 3, anchor: project.id, children: [],
    blocks: [
      paragraph(project.context, claims, "metadata"),
      ...labelled("담당 범위", [paragraph(project.role, claims)]),
      ...labelled("문제", [paragraph(project.problem, claims)]),
      ...labelled("선택", [paragraph(project.decision, claims)]),
      ...labelled("구현", project.implementation.map((text) => bullet(text, claims))),
      ...labelled("검증", project.verification.map((text) => bullet(text, claims))),
      ...labelled("결과", [paragraph(`**${project.result}**`, claims)]),
      ...(project.boundary ? labelled("범위", [paragraph(project.boundary, claims)]) : []),
    ],
  };
}

export function careerDescriptionToContent(document: CareerDescriptionDocument): ContentDocument {
  const narrative = document.presentation === "narrative";
  const contacts = document.contacts
    .map((contact) => (contact.href && /^(https:\/\/|mailto:)/.test(contact.href) ? `[${contact.label}](${contact.href})` : contact.label))
    .join(" · ");
  return {
    title: document.title,
    header: [
      paragraph(`${document.name} · ${document.role}`, []),
      paragraph(contacts, []),
      paragraph(document.subtitle, []),
    ],
    sections: [
      { title: narrative ? "소개" : "경력 요약", level: 2, children: [], blocks: document.summary.map((text) => paragraph(text, [])) },
      ...document.companies.map((company): ContentSection => {
        const summary = typeof company.summary === "string" ? [company.summary] : company.summary;
        return {
          title: `${company.organization} · ${company.period}`, level: 2, anchor: company.id,
          blocks: [paragraph(company.role, company.claimIds, "role"), ...summary.map((text) => paragraph(text, company.claimIds))],
          children: company.projects.map(projectSection),
        };
      }),
      ...(document.skills.length ? [{
        title: "기술", level: 2, children: [],
        blocks: document.skills.map((skill) => paragraph(`**${skill.label}** ${skill.value}`, [])),
      }] : []),
    ],
  };
}
