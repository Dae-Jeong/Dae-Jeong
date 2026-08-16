---
type: audit
title: SoT Content Audit — First Pass
description: profile, evidence, products, current-state, platform sync, active resume의 owner·날짜·claim 정합성 전수조사 1차 결과.
timestamp: 2026-08-13
tags: [audit, sot, content, claims, resume]
---

# SoT Content Audit — First Pass

## Scope

- canonical profile facts and career timeline
- evidence records and public claim registry
- resume/homepage/site product contracts
- active web resume expression and `data-claim` mapping
- platform sync source, execution records, and observed snapshots
- current-state and todo routing

Graphify semantic graph was used to inspect cross-file relationships. The graph snapshot contains 894 nodes, 1,201 post-build edges, and 78 communities. Deterministic scans and workspace validation were used for final judgments.

## Resolved blockers

1. **STUDIO LAB end date** — active owner is `profile/career.md`, value `2024.01`. Old `2023.12` judgments are superseded history or external stale platform state.
2. **Career arithmetic** — current total is 48 months; Backend Engineer segments total 28 months. Old 47/27 values remain only in superseded drafts.
3. **Expression ownership** — active KO resume copy is `app/fe/app/resume/resume-view.tsx`; old resume masters and platform v3 copy are explicitly superseded.
4. **Platform working documents** — the old browser handoff is now superseded; current copy, facts, and pending work route to separate owners.
5. **KCL status** — public use is limited to certification-passed fact with confidence medium. Stale `사용자 확인 대기` wording was removed.
6. **SellerCanvas patent link** — the old “connection unconfirmed” instruction was removed. Public copy remains bounded to the confirmed workflow-to-patent relationship without sole-inventor wording.
7. **Client and team disclosure** — the second POC’s `S` is an internal clue only; BE template scale may use approximate organization/team sizes without exact product count.
8. **Current-state/todo** — completed snapshots and resolved user decisions were removed; only actionable work remains.
9. **Problem-solving specificity** — active resume now names the Memento Stripe prepayment and rollback scope and connects that experience to Centurion's preventive worker separation. Both expressions remain inside existing claim boundaries.

## Not blockers

- Old dates and figures inside documents marked superseded, audits, and observed platform snapshots are historical records, not competing owners.
- `nexus.pool-stabilization` supports the work performed but not a measured outcome. It stays optional and cannot be promoted to a public result without before/after evidence.
- Saramin address detail is a platform field-policy check. Use `경기 안양시` where accepted; otherwise enter only the minimum the UI requires.

## Remaining external corrections

- Some published platform profiles still show stale dates, roles, or skill tags. Their exact state and priority remain in `backlog/platform-profile-consolidation/2026-08-13-sync-matrix.md`.
- Active KO-expression-derived PDF has not yet been generated and visually checked.

## Graph health boundary

Graph diagnostics reported 70 dangling-endpoint semantic edges and 7 same-endpoint edge collapses. The graph remains useful for relationship discovery, but it is not treated as the sole correctness oracle. Canonical-file inspection, literal scans, claim validation, and workspace validation take precedence.

## Verification

- workspace validation: PASS
- `git diff --check`: PASS
- active resume lint: PASS with two pre-existing unused-symbol warnings and no errors
