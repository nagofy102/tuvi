# HV-K10 — Foundational Meaning Expansion

Status: **SUCCESS (research-only)**. K10 directly read bounded passages in the
already registered pinned transcription `紫微斗數全書/卷一` (revision `7913704`).
It adds neutral, source-attributed traditional meanings; it does not add a
calculation mapping, a reasoning rule, a score, or reader-facing interpretation.

## Coverage

| Group                                                | Before |   After | Boundary                                          |
| ---------------------------------------------------- | -----: | ------: | ------------------------------------------------- |
| Major stars with a substantive meaning statement     | 0 / 14 | 14 / 14 | Traditional source association only               |
| Auxiliary stars with a substantive meaning statement | 0 / 14 | 10 / 14 | Four remain without bounded meaning evidence      |
| Palaces with substantive meaning statement           | 0 / 12 |  0 / 12 | Existing list is vocabulary, not meaning evidence |
| New knowledge statements                             |      0 |      16 | All `source-backed`, `profile-unresolved`         |
| New reasoning candidates / production approvals      |      0 |       0 | No change                                         |

The dataset is [knowledge-k10-foundational-meanings.json](knowledge-k10-foundational-meanings.json).
The three newly registered passage locators are in
[knowledge-source-registry.json](knowledge-source-registry.json): major stars,
the Văn Xương/Văn Khúc entries, and selected auxiliary-star entries. No source
quotation longer than a short passage description is retained in the dataset.

## Knowledge yield and limits

- The 14 primary-star statements preserve the source's symbolic associations
  (for example, traditional palace or image vocabulary) in neutral language.
- All statements carry an explicit prohibition on converting historical status,
  health, gendered, moral, legal or event language into a personalised claim.
- The source repeatedly relies on palace, state, star-combination and period
  conditions. Those maps and conflict rules are not resolved, so none of these
  statements is an eligible Rule DSL candidate.
- This is one unresolved textual lineage, not evidence for Nam Phái and not an
  independent corroboration.

## Next knowledge gaps

1. Obtain lawful, profile-aware passages defining the foundational roles of the
   twelve palaces.
2. Cover the remaining four catalogued auxiliary stars with similarly bounded
   source meanings.
3. Add an independent, school-classified source before evaluating any shared
   statement as a reasoning input.

## Verification

Research-only checks are recorded after final formatting and validation. Runtime
tests, typecheck, build and E2E are outside scope because no production-consumed
runtime file or contract changed.
