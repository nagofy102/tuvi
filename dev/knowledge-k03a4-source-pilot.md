# HV-K03A4 — Source acquisition and substantive-rule extraction pilot

Ngày: 15/10/2026 (Asia/Bangkok). Owner/integration: PM with BA review. Branch:
`work`. Allowed artifacts: this report and `../test/knowledge-k03a4-rule-cases.json`.
No `src/`, calculation profile, ontology, evaluator, UI, AI Writer or registry lifecycle
was changed.

## Why the prior Knowledge Yield was zero

1. K01 Vietnamese records were catalogue metadata, not lawful page-level text.
2. The accessible _紫微斗數全書_ records are one unresolved textual lineage; earlier
   extraction intentionally retained only methodology rules because vocabulary,
   profile and conflict precedence were absent.
3. The Archive facsimile has unresolved rights and bibliographic identity; its OCR is
   not a source text. No source had both independent lineage and a reviewable,
   normalizable substantive passage.

## Deep checks (maximum three)

| Source                                                     | Evidence actually accessed                                                                                                       | Independence/school                                                    | Result                                  |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------- |
| _紫微斗數全書/卷三_, Chinese Wikisource revision `2268626` | MediaWiki parse API returned 13,416 characters; `談星要論` includes a bounded Mệnh vô chính diệu / Tài–Quan / tam phương passage | Same unresolved `zwds-quanshu` lineage; Nam phái claim unverified      | **SUCCESS — candidate extraction only** |
| 紫雲書籍理論討論區, ShoutWiki                              | Live MediaWiki `siteinfo` returned CC BY-SA 3.0, but `allpages` returned `[]` and searches for 紫微/官祿/四化/天相 returned 0    | School/profile cannot be established from site name; no content corpus | **ACCESS BLOCKED**                      |
| Google Books title query for Vietnamese Tử Vi books        | API returned HTTP 429 `RESOURCE_EXHAUSTED`; no result, preview, price or rights page was inspected                               | Not assessable                                                         | **ACCESS BLOCKED**                      |

No paid source with a verifiable product page, price and research licence was found.
No purchase was made. The existing restricted 2004/2012 Vietnamese catalogue entries
remain leads only: their sellers/availability, price and reuse terms were not verified,
so they are not a PO purchase recommendation.

## One substantive candidate extracted

`k03a4-empty-menh-finance-career-support-001` is a **source classification candidate**,
not a personalized interpretation. It is normalized from the bounded passage at
`卷三 → 談星要論`, beginning “若命宫无正曜者，财官二宫有吉星拱照”. The retained
quotation is intentionally minimal; the pinned locator and revision are the authority.

| Field                   | Candidate value                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Inputs / eligibility    | Versioned facts must establish: Mệnh has no principal star; Tài Bạch and Quan Lộc each have a source-profile-defined favourable star; the applicable support/chiếu relation is resolved.                                                   |
| Source relation         | The passage treats Tài–Quan favourable support as relevant context for an empty Mệnh.                                                                                                                                                      |
| Allowed conclusion      | Only a non-rendered `historical-source-classification` trace: the source condition matched. It cannot state prosperity, ability, occupation, personality, event or outcome to a user.                                                      |
| Exceptions / exclusions | A conflicting adverse trine/chiếu condition in the same passage selects no conclusion; unknown “favourable”, star placement, geometry, profile or source scope blocks evaluation. Do not substitute Nô Bộc or infer opposite-palace stars. |
| Conflicts               | No precedence/weight exists in the source material available; retain every conflict and return `unresolved-conflict`.                                                                                                                      |
| Provenance              | `zwds-quanshu-vol3-wikisource-r2268626`, revision `2268626`, `談星要論`; same-family warning and underlying-edition/rights limitations remain.                                                                                             |

The text describes a substantive star–palace relationship, but it does not supply the
versioned vocabulary, exact geometry, independent corroboration or conflict resolver
required for admission. Its historical language is not normalized into a modern claim.

## Result and next step

Classification: **SUCCESS** for one traceable substantive candidate; **KNOWLEDGE GAP**
for an admissible reasoning slice; **ACCESS BLOCKED** for two new-source routes.

Do not start K04B. The next useful action is PO approval for a specific lawful library
or rights-holder acquisition after the edition, price, licence and target pages are
verified. A BA/textual review must then map terms such as 吉星 and 拱照 to a declared
school/profile before this candidate can be considered for a non-production prototype.

## Checks actually run

- Bounded MediaWiki, ShoutWiki and Google Books requests as recorded above.
- JSON parse and candidate invariant check for the companion case artifact.
- `npm run typecheck`, `npm run format:check` and `git diff --check` after changes.
