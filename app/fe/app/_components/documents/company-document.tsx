import type { DocumentRecord } from "@/lib/documents/repository";
import { readOptionalDocumentJson } from "@/content/documents/storage";
import { ResumeDocument } from "./resume/resume-document";
import { CareerDocument } from "./career/career-document";
import { DocumentShell } from "./document-shell";
import frameStyles from "./document-frame.module.css";

/** The company document page for /{company}/{kind}: the representative document rendered with the common renderer
 *  of that kind. Unknown company/kind, reserved segments and drafts outside dev/test are not found. */
export function CompanyDocumentPage({
  document,
}: {
  document: DocumentRecord & { kind: "resume" | "career" };
}) {
  const company = document.slug;
  const postings = readOptionalDocumentJson<Record<string, string>>(
    "documents",
    "companies",
    "job-postings.json",
  );
  const jdUrl = postings?.[company];

  return (
    <DocumentShell>
      {(jdUrl || (document.kind === "resume" && document.pdfHref)) && (
        <div
          className={`${frameStyles.downloadSlot} mx-auto flex justify-end gap-2 py-3 print:hidden`}
        >
          {jdUrl && (
            <a
              href={jdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-11 items-center border border-border bg-surface px-3.5 font-mono text-xs font-medium tracking-[0.04em] text-fg transition-colors duration-100 hover:bg-surface-warm"
            >
              채용 공고 (JD) ↗
            </a>
          )}
          {document.kind === "resume" && document.pdfHref && (
            // The submitted A4 PDF of this document stays downloadable from the same page.
            <a
              href={document.pdfHref}
              download
              className="focus-ring inline-flex min-h-11 items-center border border-accent bg-accent px-3.5 font-mono text-xs font-medium tracking-[0.04em] text-accent-on transition-colors duration-100 hover:bg-accent-hover"
            >
              ↓ PDF 다운로드 (A4)
            </a>
          )}
        </div>
      )}
      {document.kind === "career" ? (
        <CareerDocument
          document={document.content}
          slug={company}
        />
      ) : (
        <ResumeDocument
          copy={document.content}
          prefix={`${company}-resume`}
          presentation={document.presentation}
          footerRole={document.position}
          scope="company"
        />
      )}
    </DocumentShell>
  );
}

