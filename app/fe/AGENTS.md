<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Document Data Access Layer Rules

1. **No Static Document Imports**: Never statically import company document JSON/TS files in page or UI components. All document querying must use `lib/documents/repository.ts` (`getDocument`, `listDocumentEntries`).
2. **Zero TypeScript Changes for New Companies**: Adding or updating company documents is purely a data change under `content/documents/companies/`. Never reintroduce manual import lists in `companies/index.ts` or environment/visibility access gates.
3. **No Direct Policy/Storage Bypass**: Do not bypass `lib/documents/repository.ts` by directly invoking low-level `policy.ts` or `storage.ts` from UI components. See [README.md](README.md) for full guide.


4. **One Document Contract**: Select the latest revision for each company and kind. Draft/approval metadata is bookkeeping; every existing representative is queryable in every environment.
