import type { ReactNode } from "react";
import career from "@/content/common/career-description.json";
import portfolio from "@/content/common/portfolio.json";
import type { ContentBlock, ContentDocument, ContentSection, TextBlock } from "@/content/common/parse-review";
import { ResumePageShell } from "../resume/resume-page-shell";
import { CommonNav } from "./common-nav";
import { Inline } from "./inline";
import styles from "./common.module.css";

type Kind = "career" | "portfolio";
const documents = { career, portfolio } as Record<Kind, ContentDocument>;

function Blocks({ blocks, kind }: { blocks: ContentBlock[]; kind: Kind }) {
  const output: ReactNode[] = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    if (block.kind === "bullet") {
      const items = [block];
      while (blocks[index + 1]?.kind === "bullet") items.push(blocks[++index] as typeof block);
      output.push(<ul key={index} className={styles.bullets}>{items.map((item, itemIndex) => <li key={itemIndex} data-copy data-claim={item.claims.join(" ")}><Inline text={item.text} /></li>)}</ul>);
    } else if (block.kind === "table") {
      if (kind === "portfolio" && block.columns[0] === "처리 단계") {
        output.push(<ol key={index} className={styles.flow} aria-label="소재부터 고객 결정까지의 처리 단계" data-claim={block.claims.join(" ")}>
          {block.rows.map((row, rowIndex) => <li key={row[0]}><span className={styles.stepNumber} aria-hidden="true">{String(rowIndex + 1).padStart(2, "0")}</span><strong data-copy>{row[0]}</strong><p data-copy><Inline text={row[1]} /></p></li>)}
        </ol>);
      } else output.push(<div key={index} className={styles.tableWrap} role="region" aria-label={block.columns.join(" · ")} tabIndex={0} data-claim={block.claims.join(" ")}>
        <table><caption className="sr-only">{block.columns.join(" · ")}</caption><thead><tr>{block.columns.map((column) => <th key={column} scope="col" data-copy>{column}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row" data-copy><Inline text={cell} /></th> : <td key={cellIndex} data-copy><Inline text={cell} /></td>)}</tr>)}</tbody>
        </table>
      </div>);
    } else output.push(<p key={index} data-copy data-claim={block.claims.join(" ")} className={block.text.startsWith("기술:") ? styles.techLine : undefined}><Inline text={block.text} /></p>);
  }
  return output;
}

function DeliveryBoundary() {
  return <figure className={styles.boundary} aria-label="제품 원장의 트랜잭션과 AI 수신 측 적용 경계">
    <div className={styles.boundaryOwner}><span className={styles.eyebrow}>PRODUCT · ONE TRANSACTION</span><strong>원장 변경 + Outbox 기록</strong><span>같은 트랜잭션으로 저장</span></div>
    <div className={styles.boundaryRelay}><strong>전달 워커</strong><span>점유 기한 · 시도별 토큰</span><span className={styles.deliveryArrow} aria-hidden="true">→</span><span>인증 HTTP</span></div>
    <div className={styles.boundaryOwner}><span className={styles.eyebrow}>AI · APPLY BOUNDARY</span><strong>전달 버전 + 멱등 처리</strong><span>중복·역순 전달 통제</span></div>
    <figcaption>저장의 원자성, 전달 시도의 소유권, 수신 측 적용 순서를 나눠 다뤘습니다.</figcaption>
  </figure>;
}

function Section({ section, kind, id }: { section: ContentSection; kind: Kind; id: string }) {
  const Heading = `h${section.level}` as "h2" | "h3" | "h4";
  const title = kind === "portfolio" ? section.title.replace(/^\d+\. /, "") : section.title;
  return <section id={id} className={styles.section} data-level={section.level}>
    <Heading data-copy>{title}</Heading>
    <div className={styles.sectionBody}>
      <div className={styles.prose}><Blocks blocks={section.blocks} kind={kind} /></div>
      {kind === "portfolio" && title === "제품 원장과 AI 실행의 분리" && <DeliveryBoundary />}
      {section.children.map((child, index) => <Section key={index} section={child} kind={kind} id={`${id}-${index + 1}`} />)}
    </div>
  </section>;
}

export function CommonDocumentPage({ kind }: { kind: Kind }) {
  const document = documents[kind];
  const headerText = document.header.filter((block): block is TextBlock => block.kind === "paragraph");
  const identity = headerText.find((block) => block.text.startsWith("김대정 ·"));
  const contacts = headerText.find((block) => block.text.includes("mailto:"));
  const brand = headerText.find((block) => block.text.startsWith("가능성을 기회로"));
  const introduction = headerText.filter((block) => block !== identity && block !== contacts && block !== brand);
  return <ResumePageShell crumb={document.title} tag={kind === "portfolio" ? undefined : "LOCAL REVIEW"}>
    <CommonNav active={`/${kind}`} />
    <main className={styles.document} data-common-document={kind} data-professional-document={kind === "career" ? "career-description" : undefined} data-portfolio-document={kind === "portfolio" ? "" : undefined} data-portfolio-slug={kind === "portfolio" ? "common" : undefined}>
      <header className={styles.header}>
        <div className={styles.identityRow}><h1>{document.title}</h1><p data-copy>{identity?.text}</p></div>
        {brand && <p className={styles.brand} data-copy>{brand.text}</p>}
        {contacts && <p className={styles.contacts} data-copy><Inline text={contacts.text} /></p>}
        {!!introduction.length && <div className={styles.introduction}><Blocks blocks={introduction} kind={kind} /></div>}
      </header>
      <nav className={styles.contents} aria-label={`${document.title} 목차`}>
        {document.sections.map((section, index) => <a key={index} href={`#${kind}-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.title.replace(/^\d+\. /, "")}</a>)}
      </nav>
      {document.sections.map((section, index) => <Section key={index} section={section} kind={kind} id={`${kind}-${index + 1}`} />)}
    </main>
  </ResumePageShell>;
}
