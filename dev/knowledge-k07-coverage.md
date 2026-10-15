# HV-K07 — Foundational Knowledge Enrichment

Status: **SUCCESS (research dataset, non-production)**. K07 directly reread two
bounded groups in the pinned public _紫微斗數全書/卷三_ revision: star-specific
state-position tables and conditional configurations using `夾`. It enriches the
existing foundation dataset and adds one candidate dataset; it does not alter a
calculation profile, runtime schema, evaluator, UI or reader-facing claim path.

## Coverage before / after

| Group                  | K06                          | K07                                                     | Use now                                       |
| ---------------------- | ---------------------------- | ------------------------------------------------------- | --------------------------------------------- |
| Auxiliary catalog      | 5 families / 14 names        | 5 families / 14 stable individual IDs                   | terminology and graph nodes                   |
| State vocabulary       | miếu, vượng, hãm             | adds đắc địa, lợi; source variants retain star + branch | source-trace attributes only                  |
| Positional relations   | terms only; geometry blocked | source-described `夾` with two exact examples           | graph edge vocabulary, not evaluable geometry |
| Substantive candidates | 3 Quan Lộc references        | 2 conditional auxiliary/Mệnh candidates, both blocked   | verification queue only                       |

The two source passages and their minimal quotations are registered in
`knowledge-source-registry.json`. Both are public pinned-revision material under
the existing rights boundary. They remain one unresolved textual lineage, not an
independent vote or a Nam Phái certification.

## Graph and DSL readiness

Graph-ready additions are individual auxiliary-star nodes,
`HAS_SOURCE_VARIANT_STATE_AT_BRANCH`, and `BRACKETS_IN_SOURCE_EXAMPLE`. Every
state edge retains its source variant and exact passage; every bracket edge retains
the source example. Neither can be evaluated against active chart facts until a
reviewed profile defines branch mapping and `夾` geometry.

`k07-changqu-bracket-menh-001` and `k07-khoiviet-bracket-menh-001` are direct
source configurations with examples and stated qualifiers. They are **blocked**:
the source does not define a general geometry, map all context vocabulary, or
resolve mixed favourable/adverse conditions. Their permitted output is a research
trace only; Production Knowledge Yield remains **0**.

## Gaps / next decision

Acquire a lawful, independently identified and school-classified source for one
auxiliary-star taxonomy/state-table family, then ask BA/specialist to map only the
matching profile and geometry. Do not make a lookup table, graph runtime, DSL
evaluation or reader-facing explanation from K07 records.

## Checks

Recorded after the K07 dataset update:

- PASS — JSON parse, schema validation for the source registry, ID uniqueness,
  source/passage references, candidate provenance and non-production invariants.
- PASS — `git diff --check`.
- NOT RUN BY SCOPE — `npm test`, typecheck, build and E2E; K07 changes no runtime
  code, runtime contract or production-consumed data.
- BLOCKED — `npm run audit:sources` is required because the research Source Registry
  changed; its Node Git provenance phase is blocked by the known `spawnSync git
EPERM` sandbox failure. Its partial output is not a PASS.
