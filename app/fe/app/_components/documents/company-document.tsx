import { notFound } from "next/navigation";
import { getRepresentative } from "@/features/company-documents/policy";
import { ResumeDocument } from "./resume/resume-document";
import { CareerDocument } from "./career/career-document";
import { CvDocument } from "./cv/cv-document";
import { DocumentShell } from "./document-shell";
import frameStyles from "./document-frame.module.css";

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
  if (document.kind === "career")
    return (
      <CareerDocument
        document={document.content}
        slug={company}
      />
    );
  if (document.kind === "cv")
    return (
      <CvDocument
        document={document.content}
      />
    );
  return (
    <DocumentShell>
      {document.pdfHref && (
        // The submitted A4 PDF of this document stays downloadable from the same page.
        <p className={`${frameStyles.downloadSlot} mx-auto flex justify-end py-3 print:hidden`}>
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

