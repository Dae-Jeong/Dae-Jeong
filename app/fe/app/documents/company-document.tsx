import Link from "next/link";
import { notFound } from "next/navigation";
import { canViewDraft, documentHref, documentKinds, findCompanyDocument, type DocumentKind } from "@/content/documents/companies";
import type { ResumeCopy } from "@/content/documents/resume-copy";
import type { ContentDocument } from "@/content/documents/parse-markdown";
import { ComparisonDocument } from "./classic-resume";
import styles from "./classic-resume.module.css";
import navStyles from "../common/common.module.css";
import { CommonDocumentPage } from "../common/common-document";
import { ResumePageShell } from "../resume/resume-page-shell";

export type DocumentSearch = Promise<{ revision?: string }>;
export function CompanyDocumentPage({ company, kind, revision }: { company: string; kind: DocumentKind; revision?: string }) {
  const document = findCompanyDocument(company, kind);
  if (!canViewDraft(process.env.NODE_ENV) || !document || document.revision !== revision || document.approved !== false || document.visibility !== "local" || document.status !== "draft") notFound();
  const navigation = <div className="print:hidden">
    <nav className={navStyles.nav} aria-label={`${document.companyName} 문서 전환`}>
      <Link href="/_map" className={navStyles.navHome}>문서 지도</Link>
      {documentKinds.map((item) => <Link key={item.slug} href={documentHref(document, item.slug)} aria-current={item.slug === kind ? "page" : undefined}>{item.label}</Link>)}
    </nav>
    <p className="mx-auto max-w-5xl px-6 py-2 text-sm text-muted">{document.companyName} · {document.position} · DRAFT · LOCAL · 승인 전 · {document.revision}</p>
  </div>;
  if (kind !== "resume") return <CommonDocumentPage kind={kind} document={document.content as ContentDocument} navigation={navigation} slug={company} />;
  return <ResumePageShell crumb={`${document.companyName} · 이력서`} tag="DRAFT · LOCAL">
    {navigation}
    <main className={`${styles.pane} ${styles.standalone}`} data-template="classic" data-company-document="resume">
      <ComparisonDocument copy={document.content as ResumeCopy} prefix={`${company}-resume`} />
    </main>
  </ResumePageShell>;
}
