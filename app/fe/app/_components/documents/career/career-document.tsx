import type { ReactNode } from "react";
import career from "../../../../content/common/career-description.json";
import { CAREER_SECTION_IDS } from "../../../../lib/career-links";
import type {
  ContentBlock,
  ContentDocument,
  ContentSection,
  TextBlock,
} from "../../../../content/documents/parse-markdown";
import { DocumentShell } from "../document-shell";
import { DocumentFrame } from "../document-frame";
import { Inline } from "../inline";
import { FlowDiagram } from "./flow-diagram";
import { CareerFigure } from "./figures";
import styles from "./career.module.css";

function Blocks({
  blocks,
  groupCases = false,
}: {
  blocks: ContentBlock[];
  groupCases?: boolean;
}) {
  const output: ReactNode[] = [];
  /** Block kinds in output order, used by case grouping to keep a case label with what follows it in print. */
  const kinds: ("label" | "image" | "other")[] = [];
  const push = (
    node: ReactNode,
    type: "label" | "image" | "other" = "other",
  ) => {
    output.push(node);
    kinds.push(type);
  };
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    if (block.kind === "bullet") {
      const items = [block];
      while (blocks[index + 1]?.kind === "bullet")
        items.push(blocks[++index] as typeof block);
      push(
        <ul key={index} className={styles.bullets}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex} data-copy data-claim={item.claims.join(" ")}>
              <Inline text={item.text} />
            </li>
          ))}
        </ul>,
      );
    } else if (block.kind === "flow") {
      push(<FlowDiagram key={index} block={block} />);
    } else if (block.kind === "figure") {
      push(
        <CareerFigure key={index} id={block.id} claims={block.claims} />,
        "image",
      );
    } else if (block.kind === "image") {
      // Career-only rendered diagram (2026-09-14): full prose width, the image itself opens the original PNG for zooming.
      push(
        <figure
          key={index}
          className={styles.imageFigure}
          data-image={block.src}
          data-claim={block.claims.join(" ")}
        >
          <p className={styles.imageTitle} data-copy>
            {block.title}
          </p>
          <a
            href={block.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${block.title} 원본 크게 보기`}
          >
            {/* Plain <img> like the resume photo: static PNG under /public with intrinsic size, so print and the paged clone measure it. */}
            {/* Eager: a lazy image below the fold is not fetched before print/PDF and prints as an empty box (site-code-quality). */}
            <img
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              loading="eager"
              decoding="async"
            />
          </a>
          <figcaption>
            <span data-copy>{block.caption}</span>
            <a href={block.src} target="_blank" rel="noopener noreferrer">
              크게 보기 ↗
            </a>
          </figcaption>
        </figure>,
        "image",
      );
    } else if (block.kind === "table") {
      push(
        <div
          key={index}
          className={styles.tableWrap}
          role="region"
          aria-label={block.columns.join(" · ")}
          tabIndex={0}
          data-claim={block.claims.join(" ")}
        >
          <table>
            <caption className="sr-only">{block.columns.join(" · ")}</caption>
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope="col" data-copy>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={cellIndex} scope="row" data-copy>
                        <Inline text={cell} />
                      </th>
                    ) : (
                      <td key={cellIndex} data-copy>
                        <Inline text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else
      push(
        <p
          key={index}
          data-copy
          data-claim={block.claims.join(" ")}
          className={
            block.presentation === "role"
              ? styles.roleLine
              : block.presentation === "metadata"
                ? styles.metadataLine
                : block.presentation === "label"
                  ? styles.caseLabel
                  : block.text.startsWith("기술:")
                    ? styles.techLine
                    : undefined
          }
        >
          <Inline text={block.text} />
        </p>,
        block.presentation === "label" ? "label" : "other",
      );
  }
  if (!groupCases) return output;
  // Sheet layout: a case label (선택의 이유 · 구현 · 검증 …) travels with the paragraphs, lists and tables that follow it,
  // up to the next label or diagram, so print never leaves the label alone at a page end (styles.caseGroup: break-inside avoid).
  const grouped: ReactNode[] = [];
  for (let index = 0; index < output.length; index++) {
    if (kinds[index] !== "label") {
      grouped.push(output[index]);
      continue;
    }
    const members = [output[index]];
    while (index + 1 < output.length && kinds[index + 1] === "other")
      members.push(output[++index]);
    grouped.push(
      <div key={`group-${index}`} className={styles.caseGroup}>
        {members}
      </div>,
    );
  }
  return grouped;
}

function Section({
  section,
  id,
}: {
  section: ContentSection;
  id: string;
}) {
  const Heading = `h${section.level}` as "h2" | "h3" | "h4";
  const title = section.title;
  const datedTitle =
    section.level === 2
      ? title.match(/^(.*?) · (\d{4}\.\d{2}.*)$/)
      : null;
  const sectionId =
    section.anchor ?? CAREER_SECTION_IDS[section.title] ?? id;
  return (
    <section
      id={sectionId}
      className={styles.section}
      data-level={section.level}
      data-dated={datedTitle ? "" : undefined}
      data-emphasis={section.emphasis}
    >
      <Heading
        data-copy
        className={datedTitle ? styles.datedHeading : undefined}
      >
        {datedTitle ? (
          <>
            <span>{datedTitle[1]}</span>
            <span className={styles.period}>
              <span className="sr-only"> · </span>
              {datedTitle[2]}
            </span>
          </>
        ) : (
          title
        )}
      </Heading>
      <div className={styles.sectionBody}>
        <div className={styles.prose}>
          <Blocks blocks={section.blocks} groupCases />
        </div>
        {section.children.map((child, index) => (
          <Section
            key={index}
            section={child}
            id={`${id}-${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/** List projects under each dated company heading, and other sections as one entry. */
function contentsEntries(document: ContentDocument) {
  const entries: { href: string; title: string }[] = [];
  document.sections.forEach((section, index) => {
    const id = `career-${index + 1}`;
    const projects = section.children
      .map((child, childIndex) => ({ child, childIndex }))
      .filter(({ child }) => child.level === 3);
    if (projects.length)
      projects.forEach(({ child, childIndex }) =>
        entries.push({
          href: `#${child.anchor ?? CAREER_SECTION_IDS[child.title] ?? `${id}-${childIndex + 1}`}`,
          title: child.title,
        }),
      );
    else
      entries.push({
        href: `#${section.anchor ?? id}`,
        title: section.title.replace(/^\d+\. /, ""),
      });
  });
  return entries;
}

/** The only career-description renderer (2026-09-29): common, company-revision and legacy-source career descriptions
 *  all render as the approved portrait A4 sheet with one print policy and differ only by document copy.
 */
export function CareerDocument({
  document: suppliedDocument,
  slug = "common",
}: {
  document?: ContentDocument;
  slug?: string;
}) {
  const document = suppliedDocument ?? (career as ContentDocument);
  const headerText = document.header.filter(
    (block): block is TextBlock => block.kind === "paragraph",
  );
  const identity = headerText.find(
    (block) =>
      block.text.startsWith("김대정 ·") || /^\*\*[^*]+\*\*$/.test(block.text),
  );
  const contacts = headerText.find((block) => block.text.includes("mailto:"));
  const brand = headerText.find((block) =>
    block.text.startsWith("가능성을 기회로"),
  );
  const introduction = headerText.filter(
    (block) => block !== identity && block !== contacts && block !== brand,
  );
  const contents = contentsEntries(document);
  return (
    <DocumentShell>
      <DocumentFrame
        className={styles.document}
        data-common-document="career"
        data-document-layout="a4-sheet"
        data-document-slug={slug}
        data-professional-document="career-description"
      >
        <header className={styles.header}>
          <div className={styles.identityRow}>
            <h1>{document.title}</h1>
            <p data-copy>{identity && <Inline text={identity.text} />}</p>
          </div>
          {brand && (
            <p className={styles.brand} data-copy>
              {brand.text}
            </p>
          )}
          {contacts && (
            <p className={styles.contacts} data-copy>
              <Inline text={contacts.text} />
            </p>
          )}
          {!!introduction.length && (
            <div className={styles.introduction}>
              <Blocks blocks={introduction} />
            </div>
          )}
        </header>
        <nav
          className={styles.contents}
          aria-label={`${document.title} 목차`}
        >
          {contents.map((entry, index) => (
            <a key={entry.href} href={entry.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {entry.title}
            </a>
          ))}
        </nav>
        {document.sections.map((section, index) => (
          <Section
            key={index}
            section={section}
            id={`career-${index + 1}`}
          />
        ))}
      </DocumentFrame>
    </DocumentShell>
  );
}
