import type { CopyBlock, CopySection, ResumeCopy } from "../documents/resume-copy";
import type { ResumePresentation } from "../documents/companies/presentation";
import type { ResumeOutcomeDescriptionItem, ResumeSectionKey, ResumeText, TailoredResume } from "./types";

/**
 * Converts a typed tailored resume (content/resumes/*.ts) into the copy shape of the single resume renderer.
 * The TypeScript source stays the owner of its copy, claims, visibility and submission state; this adapter only
 * re-shapes it (2026-09-29 single-renderer contract). Every string is passed through unchanged: emphasised
 * segments become `**…**` (rendered as <strong>), evidence sources keep their `[source]` suffix, multi-line
 * periods are joined with a space, and a skill's stack and usage stay on two lines of one row.
 */

const DEFAULT_SECTION_ORDER: readonly ResumeSectionKey[] = ["profile", "outcomes", "career", "workStyles", "skills", "credentials"];

// Same titles the former tailored view rendered for each section key.
const SECTION_TITLES: Record<Exclude<ResumeSectionKey, "profile">, string> = {
  outcomes: "핵심 성과",
  career: "경력",
  workStyles: "일하는 방식",
  skills: "기술",
  externalActivities: "외부 활동",
  credentials: "학력·교육 / 수상·특허·자격",
};

function text(value: ResumeText): string {
  if (typeof value === "string") return value;
  return value.map((segment) => (segment.tone ? `**${segment.text}**` : segment.text)).join("");
}

const claims = (ids?: readonly string[]) => [...(ids ?? [])];

function isEvidence(item: ResumeOutcomeDescriptionItem): item is { text: ResumeText; source?: string } {
  return typeof item === "object" && !Array.isArray(item) && "text" in item;
}

function section(resume: TailoredResume, key: Exclude<ResumeSectionKey, "profile">): CopySection | undefined {
  const title = SECTION_TITLES[key];
  if (key === "outcomes") {
    return {
      title, kind: "outcomes",
      entries: resume.outcomes.map((outcome) => ({
        title: outcome.title,
        blocks: outcome.description.map((item): CopyBlock => isEvidence(item)
          ? { kind: "bullet", text: item.source ? `${text(item.text)} [${item.source}]` : text(item.text), claims: claims(outcome.claimIds) }
          : { kind: "paragraph", text: text(item), claims: claims(outcome.claimIds) }),
      })),
    };
  }
  if (key === "career") {
    return {
      title, kind: "career",
      entries: resume.careers.map((career) => ({
        // The former view showed an open period as "start - 재직중"; keep that wording in the title.
        title: `${career.org} · ${career.period}${career.now && /—\s*$/.test(career.period) ? " 재직중" : ""}`,
        blocks: [
          { kind: "paragraph", text: text(career.role), claims: claims(career.claimIds), presentation: "role" },
          ...career.details.map((detail): CopyBlock => ({ kind: "bullet", text: text(detail), claims: claims(career.claimIds) })),
        ],
      })),
    };
  }
  if (key === "workStyles") {
    if (!resume.workStyles.length) return undefined;
    return {
      title, kind: "other",
      entries: resume.workStyles.map((style) => ({
        blocks: [{ kind: "skill", label: style.title, text: text(style.body), claims: claims(style.claimIds) }],
      })),
    };
  }
  if (key === "skills") {
    const skills = [...resume.skills, ...(resume.additionalSkills ?? [])];
    return {
      title, kind: "other",
      // Stack and usage stay two lines of one row, as in the former view ("\n" renders as a line break).
      entries: [{ blocks: skills.map((skill): CopyBlock => ({ kind: "skill", label: skill.label, text: skill.via ? `${skill.stack}\n${skill.via}` : skill.stack, claims: claims(skill.claimIds) })) }],
    };
  }
  if (key === "externalActivities") {
    if (!resume.externalActivities?.length) return undefined;
    return {
      title, kind: "other",
      entries: [{ blocks: resume.externalActivities.map((activity): CopyBlock => ({
        kind: "skill", label: activity.label,
        text: `**${activity.title}** ${activity.description} 성과 · ${activity.outcome}`,
        claims: claims(activity.claimIds),
      })) }],
    };
  }
  return {
    title, kind: "other",
    entries: [{ blocks: resume.credentials.map((credential): CopyBlock => ({
      kind: "row", label: "", text: credential.text, meta: credential.period.replace(/\s*\n\s*/g, " "), claims: claims(credential.claimIds),
    })) }],
  };
}

export function tailoredResumeToCopy(resume: TailoredResume): { copy: ResumeCopy; presentation: ResumePresentation } {
  const order = resume.sectionOrder ?? DEFAULT_SECTION_ORDER;
  const sections: CopySection[] = [{
    title: "소개",
    entries: [{ blocks: resume.summary.map((paragraph): CopyBlock => ({ kind: "paragraph", text: text(paragraph.text), claims: claims(paragraph.claimIds) })) }],
  }];
  for (const key of order) {
    if (key === "profile") continue;
    const next = section(resume, key);
    if (next) sections.push(next);
  }
  return {
    copy: {
      name: resume.header.name,
      role: resume.header.role,
      careerLine: text(resume.header.careerLine),
      // Submission-only metadata (read from the environment by the source) keeps its former place under the career line.
      specialtyLine: resume.header.submissionMeta,
      contacts: resume.header.contacts.filter((contact): contact is typeof contact & { href: string } => Boolean(contact.href)).map((contact) => ({ label: contact.label, href: contact.href })),
      sections,
    },
    presentation: {
      emphasis: [],
      ...(resume.header.photoSrc ? { photo: { src: resume.header.photoSrc, alt: "", width: 1122, height: 1402 } } : {}),
    },
  };
}
