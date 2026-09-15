import type { ReactNode } from "react";
import cv from "@/content/common/cv.json";
import type { ContentBlock, ContentDocument, ContentSection, TextBlock } from "@/content/documents/parse-markdown";
import { CommonNav } from "../common/common-nav";
import { Inline } from "../common/inline";
import { ResumePageShell } from "../resume/resume-page-shell";
import styles from "./jake.module.css";

const document = cv as ContentDocument;

function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  const nodes: ReactNode[] = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    if (block.kind === "table" || block.kind === "flow" || block.kind === "figure" || block.kind === "image") throw new Error("Jake CV expects paragraph and bullet records, not tables or figures");
    if (block.kind === "bullet") {
      const items: TextBlock[] = [block];
      while (blocks[index + 1]?.kind === "bullet") items.push(blocks[++index] as TextBlock);
      nodes.push(<ul key={index}>{items.map((item, i) => <li key={i} data-copy data-claim={item.claims.join(" ")}><Inline text={item.text} /></li>)}</ul>);
    } else nodes.push(<p key={index} data-copy data-claim={block.claims.join(" ")}><Inline text={block.text} /></p>);
  }
  return nodes;
}

function Section({ section, id }: { section: ContentSection; id: string }) {
  const Heading = section.level === 2 ? "h2" : "h3";
  return <section className={section.level === 2 ? styles.section : styles.entry} id={id}>
    <div className={styles.headingRow}>
      <Heading data-copy>{section.title}</Heading>
      {section.period && <span className={styles.period} data-copy>{section.period}</span>}
    </div>
    <Blocks blocks={section.blocks} />
    {section.children.map((child, i) => <Section key={child.title} section={child} id={`${id}-${i + 1}`} />)}
  </section>;
}

/** Web adaptation of Jake Gutierrez's MIT-licensed template; see tools/templates/jake-cv/. */
export function JakeCv() {
  return <ResumePageShell crumb="CV" tag="ENGLISH">
    <CommonNav active="/cv" />
    <main lang="en" className={styles.document} data-common-document="cv" data-professional-document="cv" data-cv-template="jake">
      <header className={styles.header}>
        <h1 data-copy>{document.title}</h1>
        <Blocks blocks={document.header} />
      </header>
      {document.sections.map((section, i) => <Section key={section.title} section={section} id={`cv-${i + 1}`} />)}
    </main>
  </ResumePageShell>;
}
