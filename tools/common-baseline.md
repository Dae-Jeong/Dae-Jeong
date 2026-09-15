# Common resume and career baseline

The common `/resume` and `/career` pages use the copy and presentation promoted from the approved Miridih revision on 2026-09-15. Company revisions remain independent snapshots.

## Edit and regenerate

Connect the local Wiki using [knowledge setup](knowledge-setup.md) first. Source Markdown and private application records are intentionally not part of this repository.

- Resume source: `wiki/products/resume/common-baseline/content-draft.md`
- Career source: `wiki/products/resume/common-baseline/career-draft.md`
- Presentation: `app/fe/content/common/presentation.ts` and `emphasis.json`
- Generated copy: `app/fe/content/common/resume.json` and `career-description.json`

```sh
node --experimental-strip-types tools/build_revision_documents.mjs wiki/products/resume/common-baseline/content-draft.md app/fe/content/common --common --career-source=wiki/products/resume/common-baseline/career-draft.md
```

Append `--check` to verify source parity without rewriting files. `--only=resume` permits a resume-only update. Career export requires its explicit source to prevent accidental use of a placeholder.

Run `node tools/check_documents.mjs` for document contracts and `pnpm --dir app/fe build` for the production build. Full workspace validation additionally requires local evidence, policy and application records; report outstanding failures rather than treating a successful build as a complete content review.

## Review surfaces

- `/resume`: common editorial resume
- `/resume?paged=1`: A4 pagination for printing
- `/career`: portrait career description with diagrams

Export the paginated resume from a running local server:

```sh
uv run --project tools python tools/export_resume_pdf.py 'http://localhost:4000/resume?paged=1' output/resume.pdf
```

The exporter requires Playwright and its Chromium browser. It waits for pagination before printing; inspect the resulting PDF before delivery.

Do not overwrite company submissions or Desktop PDFs when editing the baseline. Private evidence probes, intermediate diagrams and review screenshots belong in ignored local storage, not in `public/` or a routine commit.
