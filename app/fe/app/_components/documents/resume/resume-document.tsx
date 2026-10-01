import { Fragment, type ReactNode } from "react";
import { Chip } from "../../../../components/ui/chip";
import { resumeType } from "./typography";
import type {
  CopyBlock,
  CopySection,
  ResumeCopy,
} from "../../../../content/documents/resume-copy";
import type { ResumePresentation } from "../../../../content/documents/companies/presentation";
import styles from "./resume-document.module.css";
import { Inline } from "../inline";
import { DocumentFrame } from "../document-frame";
import { ResumePrintPages } from "./resume-print-pages";
import { ResumeRow } from "./resume-row";

/** Wraps the first occurrence of each preset phrase in <strong>. The text content is unchanged,
 *  so copy checks that compare rendered text with the Markdown draft still hold. */
function Emphasize({ text, phrases }: { text: string; phrases: string[] }) {
  const out: ReactNode[] = [];
  let rest = text;
  let key = 0;
  while (rest) {
    let at = -1;
    let hit = "";
    for (const phrase of phrases) {
      const index = rest.indexOf(phrase);
      if (index >= 0 && (at < 0 || index < at)) {
        at = index;
        hit = phrase;
      }
    }
    if (at < 0) {
      out.push(
        <Fragment key={key++}>
          <Inline text={rest} />
        </Fragment>,
      );
      break;
    }
    if (at > 0)
      out.push(
        <Fragment key={key++}>
          <Inline text={rest.slice(0, at)} />
        </Fragment>,
      );
    out.push(<strong key={key++}>{hit}</strong>);
    rest = rest.slice(at + hit.length);
  }
  return out;
}

function Text({ text, emphasis }: { text: string; emphasis?: string[] }) {
  return emphasis?.length ? (
    <Emphasize text={text} phrases={emphasis} />
  ) : (
    <Inline text={text} />
  );
}

function Blocks({
  blocks,
  emphasis,
}: {
  blocks: CopyBlock[];
  emphasis?: string[];
}) {
  return blocks.map((block, index) => {
    const shared = {
      "data-copy": "",
      "data-claim": block.claims.join(" "),
      ...(block.presentation
        ? { "data-presentation": block.presentation }
        : {}),
    };
    if (block.presentation === "heading") {
      return (
        <h4 key={index} className={styles.careerHeading} {...shared}>
          {block.text}
        </h4>
      );
    }
    if (
      block.presentation === "subheading" ||
      block.presentation === "service-heading"
    ) {
      return (
        <h5 key={index} className={styles.careerSubheading} {...shared}>
          {block.text}
        </h5>
      );
    }
    if (block.kind === "skill") {
      // Label and text go through Inline so a [label](https://…) link in a table cell renders as an anchor (text content unchanged).
      return (
        <div key={index} className={styles.skill} {...shared}>
          <span className={styles.skillLabel}>
            <Inline text={block.label ?? ""} />
          </span>{" "}
          <span>
            <Inline text={block.text} />
          </span>
        </div>
      );
    }
    if (block.kind === "row") {
      return (
        <ResumeRow
          key={index}
          label={block.label}
          text={block.text}
          meta={block.meta}
          classes={
            styles as {
              row: string;
              rowLabel: string;
              rowText: string;
              rowMeta: string;
            }
          }
          attributes={shared}
        />
      );
    }
    return (
      <p
        key={index}
        className={block.kind === "bullet" ? styles.bullet : styles.paragraph}
        {...shared}
      >
        <Text text={block.text} emphasis={emphasis} />
      </p>
    );
  });
}

/** Split `회사명 · 기간` into two spans so the period can sit on the right.
 *  The separator stays in the DOM (visually hidden) so the element's text is still the full title. */
function EntryTitle({ title, split }: { title: string; split: boolean }) {
  const match = split ? title.match(/^(.+?) · (\d{4}\.\s?\d{2} — .+)$/) : null;
  if (!match) return <span data-copy>{title}</span>;
  return (
    <span data-copy>
      <span data-company>{match[1]}</span>
      <span className={styles.titleSep}> · </span>
      <span className={styles.period}>{match[2]}</span>
    </span>
  );
}

/** Section kind follows the section's meaning, not its position, so a career-first document keeps the same styling. */
function sectionKind(section: CopySection) {
  return (
    section.kind ??
    (section.title === "대표 성과"
      ? "outcomes"
      : section.title === "경력"
        ? "career"
        : "other")
  );
}

const DEFAULT_PHOTO = {
  src: "/profile/daejeong-profile-v2.png",
  alt: "김대정",
  width: 1122,
  height: 1402,
};

/** The resume article: one semantic document shared by every resume. */
function ResumeArticle({
  copy,
  prefix,
  presentation,
}: {
  copy: ResumeCopy;
  prefix: string;
  presentation?: ResumePresentation;
}) {
  const profile = copy.sections[0];
  const emphasis = presentation?.emphasis;
  const photo = presentation?.photo ?? DEFAULT_PHOTO;
  return (
    <article
      className={styles.document}
      aria-label="김대정 이력서"
      data-resume-copy
    >
      <header
        className={`${resumeType.commonDocumentHeader} ${styles.documentHeader}`}
        data-section="0"
        id={`${prefix}-section-0`}
      >
        <div className={`${resumeType.commonIdentityBlock} ${styles.identity}`}>
          <h1 className={resumeType.commonIdentity} data-copy>
            {copy.name}
          </h1>
          <p className={resumeType.commonRoleMeta} data-copy>
            {copy.role}
          </p>
        </div>
        <div className={`${resumeType.commonMetaBlock} ${styles.meta}`}>
          <p className={resumeType.careerMeta} data-copy>
            <Inline text={copy.careerLine} />
          </p>
          {copy.specialtyLine && (
            <p className={resumeType.careerMeta} data-copy>
              {copy.specialtyLine}
            </p>
          )}
          <div className={`${resumeType.commonContactRow} ${styles.contacts}`}>
            {copy.contacts.map((contact) => (
              <Chip
                key={contact.href}
                href={contact.href}
                external={contact.href.startsWith("https:")}
              >
                <span data-copy>{contact.label}</span>
              </Chip>
            ))}
          </div>
        </div>
        {photo && (
          // Plain <img> with intrinsic size so the print projection measures the header before the file loads. Decorative: no text, no copy.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.photo}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            data-presentation="photo"
          />
        )}
        <div className={`${resumeType.summaryStack} ${styles.summary}`}>
          <h2 className="sr-only">{profile.title}</h2>
          {profile.entries[0].blocks.map((block, index) => (
            <p
              key={index}
              data-copy
              data-claim={block.claims.join(" ")}
              className={
                index === 0
                  ? resumeType.profileTitle
                  : resumeType.profileDescription
              }
            >
              <Text
                text={block.text}
                emphasis={index === 0 ? undefined : emphasis}
              />
            </p>
          ))}
        </div>
      </header>
      {copy.sections.slice(1).map((section, index) => {
        const kind = sectionKind(section);
        return (
          <section
            key={section.title}
            className={styles.section}
            data-section={index + 1}
            id={`${prefix}-section-${index + 1}`}
            data-kind={kind}
            data-title={section.title}
          >
            <h2 className={styles.sectionTitle} data-copy>
              {section.title}
            </h2>
            {section.entries.map((entry, entryIndex) => (
              <div key={entryIndex} className={styles.entry}>
                {entry.title && (
                  <h3 className={styles.entryTitle}>
                    {kind === "outcomes" && (
                      <span className={styles.entryNumber} aria-hidden="true">
                        {String(entryIndex + 1).padStart(2, "0")}
                      </span>
                    )}
                    <EntryTitle title={entry.title} split={kind === "career"} />
                  </h3>
                )}
                <div className={styles.blocks}>
                  <Blocks blocks={entry.blocks} emphasis={emphasis} />
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </article>
  );
}

/** The only resume renderer (2026-09-29). Common, company-revision and legacy-source resumes all render here;
 *  they differ only by the copy and presentation data passed in. Print/PDF uses the A4 projection of this same page
 *  with one print policy for every resume. */
export function ResumeDocument({
  copy,
  prefix,
  presentation,
  footerRole,
  scope,
}: {
  copy: ResumeCopy;
  prefix: string;
  presentation?: ResumePresentation;
  /** Right side of the printed page footer (`name · role`). */
  footerRole: string;
  /** data attribute naming the source family, kept for existing checks: common | company. */
  scope: "common" | "company";
}) {
  return (
    <DocumentFrame
      className={styles.pane}
      data-resume-document=""
      {...(scope === "common"
        ? { "data-common-document": "resume" }
        : { "data-company-document": "resume" })}
    >
      <style>{"@media print{@page{size:A4;margin:0}}"}</style>
      <ResumeArticle copy={copy} prefix={prefix} presentation={presentation} />
      <ResumePrintPages author={copy.name} role={footerRole} />
    </DocumentFrame>
  );
}
