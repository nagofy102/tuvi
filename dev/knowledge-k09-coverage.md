# HV-K09 — Multi-Source Foundational Knowledge Expansion

Status: **SUCCESS (research dataset, non-production)**. K09 directly read two
bounded passages in the publicly accessible pinned `紫微斗數` revision `8061095`.
Its page header labels the text as `萬曆續道藏`, whereas the existing foundation
uses the `紫微斗數全書` transcription family. The bibliographic relationship has
not been collated, so the source is registered as a distinct **candidate** family
with `independenceStatus: unknown`, not as independent confirmation.

## Coverage before / after

| Group                   | Before K09                                   | After K09                                                       | Admission                     |
| ----------------------- | -------------------------------------------- | --------------------------------------------------------------- | ----------------------------- |
| Source-family diversity | 1 unresolved textual family                  | 1 existing family + 1 separately accessed candidate family      | 0 proven independent families |
| Source variants         | state and bracket variants inside one family | adds a source-specific review sequence and palace-label variant | source-node-only              |
| Palace vocabulary       | one canonical source-specific list           | divergent, ambiguous Daozang-labelled list recorded separately  | `disputed`, not aliased       |
| Period terminology      | K08 terms only                               | source-specific `大運` term added as provenance                 | no placement or runtime use   |

The variant `variant:daozang-review-sequence` records only an ordered source
vocabulary. `variant:daozang-palace-label-vocabulary` is explicitly disputed: the
transcription's “十二宮分” line differs from, and visibly does not safely normalize
to, the existing twelve-palace catalog. Neither creates a new active concept,
alias, graph edge or reasoning rule.

## Source diversity and gaps

- Accessed source families: **2** (`紫微斗數全書` and the Daozang-labelled
  `紫微斗數` candidate).
- Families established as textually independent: **0**.
- No substantive candidate was added: the newly read passages are methodology/
  vocabulary variants and breadth-first scope defers their detailed claims.
- Next breadth gap: lawful bibliographic collation or a school-classified source
  family for the same foundational vocabulary; do not count hosts, translations
  or uncollated transcriptions as independent evidence.

## Checks

- PASS — JSON parse, Source Registry structural schema, unique stable IDs,
  source/passage references and direct raw-source anchors.
- PASS — Prettier and `git diff --check` for changed files.
- BLOCKED — `npm run audit:sources`: known sandbox failure `spawnSync git EPERM`.
  No repeat investigation was performed and partial output is not a pass.
- NOT RUN BY SCOPE — `npm test`, typecheck, build and E2E; K09 changes no runtime
  code, runtime contract or production-consumed dataset.
