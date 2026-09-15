import Link from "next/link";
import { notFound } from "next/navigation";
import { canViewDraft, documentHref, documentKinds, findCompanyDocument, hasExtraRevisions, listDocumentRevisions, type DocumentKind } from "@/content/documents/companies";
import type { ResumeCopy } from "@/content/documents/resume-copy";
import type { ContentDocument } from "@/content/documents/parse-markdown";
import { getCareerPresentation, getResumePresentation } from "@/content/documents/companies/presentation";
import { ComparisonDocument } from "./classic-resume";
import { PagedResume } from "./paged-resume";
import styles from "./classic-resume.module.css";
import navStyles from "../common/common.module.css";
import { CommonDocumentPage } from "../common/common-document";
import { ResumePageShell } from "../resume/resume-page-shell";

export type DocumentSearch = Promise<{ revision?: string; paged?: string }>;
/** Links to the other local draft revisions of the same document. Rendered only in dev/test and only
 *  for companies that have extra review revisions, so the 12 existing document screens stay unchanged. */
export function LocalRevisionLinks({ company, kind, current }: { company: string; kind: DocumentKind; current?: string }) {
  if (!canViewDraft(process.env.NODE_ENV) || !hasExtraRevisions(company, kind)) return null;
  const others = listDocumentRevisions(company, kind).filter((document) => document.revision !== current);
  if (!others.length) return null;
  return <p className="mx-auto max-w-5xl px-6 py-2 text-sm text-muted print:hidden" data-local-revisions>
    로컬 검토 revision:{" "}
    {others.map((document, index) => <span key={document.revision}>{index > 0 ? " · " : ""}<Link href={documentHref(document)} className="underline underline-offset-4">{document.revision}{index === 0 && !current ? " (최신)" : ""}</Link></span>)}
  </p>;
}
export function CompanyDocumentPage({ company, kind, revision, paged = false }: { company: string; kind: DocumentKind; revision?: string; paged?: boolean }) {
  const document = findCompanyDocument(company, kind, revision);
  if (!canViewDraft(process.env.NODE_ENV) || !document || document.revision !== revision || document.approved !== false || document.visibility !== "local" || document.status !== "draft") notFound();
  // Only link to document kinds that exist for this exact revision (no invented portfolio links).
  const kinds = documentKinds.filter((item) => findCompanyDocument(company, item.slug, document.revision));
  const navigation = <div className="print:hidden">
    <nav className={navStyles.nav} aria-label={`${document.companyName} 문서 전환`}>
      <Link href="/_map" className={navStyles.navHome}>문서 지도</Link>
      {kinds.map((item) => <Link key={item.slug} href={documentHref(document, item.slug)} aria-current={item.slug === kind ? "page" : undefined}>{item.label}</Link>)}
    </nav>
    <p className="mx-auto max-w-5xl px-6 py-2 text-sm text-muted">{document.companyName} · {document.position} · DRAFT · LOCAL · 승인 전 · {document.revision}</p>
    <LocalRevisionLinks company={company} kind={kind} current={document.revision} />
  </div>;
  if (kind !== "resume") return <CommonDocumentPage kind={kind} document={document.content as ContentDocument} navigation={navigation} slug={company} layout={kind === "career" ? getCareerPresentation(company, document.revision)?.layout : undefined} />;
  const copy = document.content as ResumeCopy;
  // Presentation preset is opt-in per revision; every other resume keeps the classic template.
  const presentation = getResumePresentation(company, document.revision);
  const template = presentation?.template ?? "classic";
  if (paged && template === "editorial") {
    // A4 review view for PDF export: no site chrome, pages sized by the paged client component.
    return <main className={`${styles.pane} ${styles.standalone}`} data-template={template} data-company-document="resume" data-paged="true">
      <style>{"@page{size:A4;margin:0}"}</style>
      <ComparisonDocument copy={copy} prefix={`${company}-resume`} presentation={presentation} />
      <PagedResume author={copy.name} role={document.position} />
    </main>;
  }
  return <ResumePageShell crumb={`${document.companyName} · 이력서`} tag="DRAFT · LOCAL">
    {navigation}
    <main className={`${styles.pane} ${styles.standalone}`} data-template={template} data-company-document="resume">
      <ComparisonDocument copy={copy} prefix={`${company}-resume`} presentation={presentation} />
    </main>
  </ResumePageShell>;
}
