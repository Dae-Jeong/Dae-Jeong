import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companyDocumentHref } from "@/features/company-documents/urls";
import { getRepresentative } from "@/features/company-documents/policy";
import {
  companyKinds,
  type Representative,
} from "@/features/company-documents/types";
import { ResumeDocument } from "./resume/resume-document";
import navStyles from "./career/career.module.css";
import { CareerDocument } from "./career/career-document";
import { CvDocument } from "./cv/cv-document";
import { DocumentShell } from "./document-shell";

/** Links between the kinds that exist for this company (representative documents only; no version links). */
function CompanyNavigation({ document }: { document: Representative }) {
  const kinds = companyKinds.filter((item) =>
    getRepresentative(document.company, item.slug),
  );
  return (
    <div className="print:hidden">
      <nav
        className={navStyles.nav}
        aria-label={`${document.companyName} 문서 전환`}
      >
        <Link
          href={document.public ? ROUTES.home : ROUTES.admin.map}
          className={navStyles.navHome}
        >
          {document.public ? "홈" : "문서 지도"}
        </Link>
        {kinds.map((item) => (
          <Link
            key={item.slug}
            href={companyDocumentHref(document.company, item.slug)}
            aria-current={item.slug === document.kind ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <p className="mx-auto max-w-5xl px-6 py-2 text-sm text-muted">
        {[document.companyName, document.position].filter(Boolean).join(" · ")}
        {document.public ? "" : " · DRAFT · LOCAL · 승인 전"}
      </p>
    </div>
  );
}

/** The company document page for /{company}/{kind}: the representative document rendered with the common renderer
 *  of that kind. Unknown company/kind, reserved segments and drafts outside dev/test are not found. */
export function CompanyDocumentPage({
  company,
  kind,
}: {
  company: string;
  kind: string;
}) {
  const document = getRepresentative(company, kind);
  if (!document) notFound();
  const navigation = <CompanyNavigation document={document} />;
  if (document.kind === "career")
    return (
      <CareerDocument
        kind="career"
        document={document.content}
        navigation={navigation}
        slug={company}
        crumb={`${document.companyName} · 경력기술서`}
        tag={document.public ? undefined : (document.tag ?? "DRAFT · LOCAL")}
      />
    );
  if (document.kind === "cv")
    return (
      <CvDocument
        document={document.content}
        crumb={`${document.companyName} · CV`}
        tag={document.public ? "ENGLISH" : "DRAFT · LOCAL"}
        navigation={navigation}
      />
    );
  return (
    <DocumentShell
      crumb={`${document.companyName} · 이력서`}
      tag={document.public ? document.tag : (document.tag ?? "DRAFT · LOCAL")}
    >
      {navigation}
      {document.pdfHref && (
        // The submitted A4 PDF of this document stays downloadable from the same page.
        <p className="mx-auto flex max-w-[794px] justify-end py-3 print:hidden">
          <a
            href={document.pdfHref}
            download
            className="focus-ring inline-flex min-h-11 items-center border border-accent bg-accent px-3.5 font-mono text-xs font-medium tracking-[0.04em] text-accent-on transition-colors duration-100 hover:bg-accent-hover"
          >
            ↓ PDF 다운로드 (A4)
          </a>
        </p>
      )}
      <ResumeDocument
        copy={document.copy}
        prefix={`${company}-resume`}
        presentation={document.presentation}
        footerRole={document.position}
        scope="company"
      />
    </DocumentShell>
  );
}
