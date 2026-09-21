import type { ReactNode } from "react";
import career from "@/content/common/career-description.json";
import portfolio from "@/content/common/portfolio.json";
import type { CaseVisual, ContentBlock, ContentDocument, ContentSection, TextBlock } from "@/content/documents/parse-markdown";
import { ResumePageShell } from "../resume/resume-page-shell";
import { CommonNav } from "./common-nav";
import { Inline } from "./inline";
import { FlowDiagram } from "./flow-diagram";
import { CareerFigure } from "./career-figures";
import styles from "./common.module.css";

type Kind = "career" | "portfolio";
type Layout = "a4-sheet";
const documents = { career, portfolio } as Record<Kind, ContentDocument>;

function Blocks({ blocks, kind, layout }: { blocks: ContentBlock[]; kind: Kind; layout?: Layout }) {
  const output: ReactNode[] = [];
  /** Block kinds in output order, used by the sheet layout to keep a case label with what follows it in print. */
  const kinds: ("label" | "image" | "other")[] = [];
  const push = (node: ReactNode, type: "label" | "image" | "other" = "other") => { output.push(node); kinds.push(type); };
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    if (block.kind === "bullet") {
      const items = [block];
      while (blocks[index + 1]?.kind === "bullet") items.push(blocks[++index] as typeof block);
      push(<ul key={index} className={styles.bullets}>{items.map((item, itemIndex) => <li key={itemIndex} data-copy data-claim={item.claims.join(" ")}><Inline text={item.text} /></li>)}</ul>);
    } else if (block.kind === "flow") {
      push(<FlowDiagram key={index} block={block} />);
    } else if (block.kind === "figure") {
      if (kind === "career") push(<CareerFigure key={index} id={block.id} claims={block.claims} />, "image");
    } else if (block.kind === "image") {
      // Career-only rendered diagram (2026-09-14): full prose width, the image itself opens the original PNG for zooming.
      if (kind === "career") push(<figure key={index} className={styles.imageFigure} data-image={block.src} data-claim={block.claims.join(" ")}>
        <p className={styles.imageTitle} data-copy>{block.title}</p>
        <a href={block.src} target="_blank" rel="noopener noreferrer" aria-label={`${block.title} 원본 크게 보기`}>
          {/* Plain <img> like the resume photo: static PNG under /public with intrinsic size, so print and the paged clone measure it. */}
          <img src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" />
        </a>
        <figcaption><span data-copy>{block.caption}</span><a href={block.src} target="_blank" rel="noopener noreferrer">크게 보기 ↗</a></figcaption>
      </figure>, "image");
    } else if (block.kind === "table") {
      if (kind === "portfolio" && block.columns[0] === "처리 단계") {
        push(<ol key={index} className={styles.flow} aria-label="소재부터 고객 결정까지의 처리 단계" data-claim={block.claims.join(" ")}>
          {block.rows.map((row, rowIndex) => <li key={row[0]}><span className={styles.stepNumber} aria-hidden="true">{String(rowIndex + 1).padStart(2, "0")}</span><strong data-copy>{row[0]}</strong><p data-copy><Inline text={row[1]} /></p></li>)}
        </ol>);
      } else push(<div key={index} className={styles.tableWrap} role="region" aria-label={block.columns.join(" · ")} tabIndex={0} data-claim={block.claims.join(" ")}>
        <table><caption className="sr-only">{block.columns.join(" · ")}</caption><thead><tr>{block.columns.map((column) => <th key={column} scope="col" data-copy>{column}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row" data-copy><Inline text={cell} /></th> : <td key={cellIndex} data-copy><Inline text={cell} /></td>)}</tr>)}</tbody>
        </table>
      </div>);
    } else push(<p key={index} data-copy data-claim={block.claims.join(" ")} className={block.presentation === "role" ? styles.roleLine : block.presentation === "metadata" ? styles.metadataLine : block.presentation === "label" ? styles.caseLabel : block.text.startsWith("기술:") ? styles.techLine : undefined}><Inline text={block.text} /></p>, block.presentation === "label" ? "label" : "other");
  }
  if (layout !== "a4-sheet") return output;
  // Sheet layout: a case label (선택의 이유 · 구현 · 검증 …) travels with the paragraphs, lists and tables that follow it,
  // up to the next label or diagram, so print never leaves the label alone at a page end (styles.caseGroup: break-inside avoid).
  const grouped: ReactNode[] = [];
  for (let index = 0; index < output.length; index++) {
    if (kinds[index] !== "label") { grouped.push(output[index]); continue; }
    const members = [output[index]];
    while (index + 1 < output.length && kinds[index + 1] === "other") members.push(output[++index]);
    grouped.push(<div key={`group-${index}`} className={styles.caseGroup}>{members}</div>);
  }
  return grouped;
}

function CaseFlow({ visual }: { visual: CaseVisual }) {
  return <figure className={styles.caseVisual} aria-label={visual.label} data-claim={visual.claims.join(" ")}>
    <figcaption data-copy>{visual.label}</figcaption>
    <ol>{visual.steps.map((step, index) => <li key={step.title}>
      {index > 0 && <span className={styles.flowConnector}>{step.incoming && <span data-copy>{step.incoming}</span>}<span aria-hidden="true">→</span></span>}
      <strong data-copy>{step.title}</strong><p data-copy>{step.detail}</p>
    </li>)}</ol>
    <p className={styles.visualCaption} data-copy>{visual.caption}</p>
  </figure>;
}

function DeliveryBoundary() {
  return <figure className={styles.boundary} aria-label="제품 원장의 트랜잭션과 AI 수신 측 적용 경계">
    <div className={styles.boundaryOwner}><span className={styles.eyebrow}>PRODUCT · ONE TRANSACTION</span><strong>원장 변경 + Outbox 기록</strong><span>같은 트랜잭션으로 저장</span></div>
    <div className={styles.boundaryRelay}><strong>전달 워커</strong><span>점유 기한 · 시도별 토큰</span><span className={styles.deliveryArrow} aria-hidden="true">→</span><span>인증 HTTP</span></div>
    <div className={styles.boundaryOwner}><span className={styles.eyebrow}>AI · APPLY BOUNDARY</span><strong>전달 버전 + 멱등 처리</strong><span>중복·역순 전달 통제</span></div>
    <figcaption>저장의 원자성, 전달 시도의 소유권, 수신 측 적용 순서를 나눠 다뤘습니다.</figcaption>
  </figure>;
}

function Section({ section, kind, id, layout }: { section: ContentSection; kind: Kind; id: string; layout?: Layout }) {
  const Heading = `h${section.level}` as "h2" | "h3" | "h4";
  const title = kind === "portfolio" ? section.title.replace(/^\d+\. /, "") : section.title;
  const datedTitle = kind === "career" && section.level === 2 ? title.match(/^(.*?) · (\d{4}\.\d{2}.*)$/) : null;
  return <section id={id} className={styles.section} data-level={section.level} data-dated={datedTitle ? "" : undefined} data-emphasis={kind === "career" ? section.emphasis : undefined}>
    <Heading data-copy className={datedTitle ? styles.datedHeading : undefined}>{datedTitle ? <><span>{datedTitle[1]}</span><span className={styles.period}><span className="sr-only"> · </span>{datedTitle[2]}</span></> : title}</Heading>
    <div className={styles.sectionBody}>
      <div className={styles.prose}><Blocks blocks={section.blocks} kind={kind} layout={layout} /></div>
      {kind === "portfolio" && section.visual && <CaseFlow visual={section.visual} />}
      {kind === "portfolio" && section.visuals?.map((visual) => <CaseFlow key={visual.label} visual={visual} />)}
      {kind === "portfolio" && (title === "제품 원장과 AI 실행의 분리" || title === "승인·전달·발행의 서로 다른 실패") && <DeliveryBoundary />}
      {section.children.map((child, index) => <Section key={index} section={child} kind={kind} id={`${id}-${index + 1}`} layout={layout} />)}
    </div>
  </section>;
}

/** Contents entries. The A4 sheet layout lists the projects under each dated company heading and keeps any other
 *  section (e.g. the closing capabilities section) as one entry, as in the approved portrait draft; the default
 *  layout lists the level-2 sections. */
function contentsEntries(document: ContentDocument, kind: Kind, layout?: Layout) {
  const entries: { href: string; title: string }[] = [];
  document.sections.forEach((section, index) => {
    const id = `${kind}-${index + 1}`;
    const company = layout === "a4-sheet" && / · \d{4}\.\d{2}/.test(section.title);
    const projects = company ? section.children.map((child, childIndex) => ({ child, childIndex })).filter(({ child }) => child.level === 3) : [];
    if (projects.length) projects.forEach(({ child, childIndex }) => entries.push({ href: `#${id}-${childIndex + 1}`, title: child.title }));
    else entries.push({ href: `#${id}`, title: section.title.replace(/^\d+\. /, "") });
  });
  return entries;
}

export function CommonDocumentPage({ kind, document = documents[kind], navigation, slug = "common", layout }: { kind: Kind; document?: ContentDocument; navigation?: ReactNode; slug?: string; layout?: Layout }) {
  const headerText = document.header.filter((block): block is TextBlock => block.kind === "paragraph");
  const identity = headerText.find((block) => block.text.startsWith("김대정 ·") || /^\*\*[^*]+\*\*$/.test(block.text));
  const contacts = headerText.find((block) => block.text.includes("mailto:"));
  const brand = headerText.find((block) => block.text.startsWith("가능성을 기회로"));
  const introduction = headerText.filter((block) => block !== identity && block !== contacts && block !== brand);
  const contents = contentsEntries(document, kind, layout);
  return <ResumePageShell crumb={document.title} tag={kind === "portfolio" || layout === "a4-sheet" ? undefined : "LOCAL REVIEW"}>
    {navigation ?? <CommonNav active={`/${kind}`} />}
    <main className={styles.document} data-common-document={kind} data-document-layout={layout} data-document-slug={slug} data-professional-document={kind === "career" ? "career-description" : undefined} data-portfolio-document={kind === "portfolio" ? "" : undefined} data-portfolio-slug={kind === "portfolio" ? slug : undefined}>
      <header className={styles.header}>
        <div className={styles.identityRow}><h1>{document.title}</h1><p data-copy>{identity && <Inline text={identity.text} />}</p></div>
        {brand && <p className={styles.brand} data-copy>{brand.text}</p>}
        {contacts && <p className={styles.contacts} data-copy><Inline text={contacts.text} /></p>}
        {!!introduction.length && <div className={styles.introduction}><Blocks blocks={introduction} kind={kind} /></div>}
      </header>
      {layout !== "a4-sheet" && <nav className={styles.contents} aria-label={`${document.title} 목차`}>
        {contents.map((entry, index) => <a key={entry.href} href={entry.href}><span>{String(index + 1).padStart(2, "0")}</span>{entry.title}</a>)}
      </nav>}
      {document.sections.map((section, index) => <Section key={index} section={section} kind={kind} id={`${kind}-${index + 1}`} layout={layout} />)}
    </main>
  </ResumePageShell>;
}
