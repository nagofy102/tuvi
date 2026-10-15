# HV-K05 — Quan Lộc deep acquisition

Status: **SUCCESS (research-only candidate acquisition)**. This bounded pass read
the pinned public Wikisource revisions directly and retained only three minimal
quotations in the source registry. It did not change the calculation profile,
runtime rules, ontology, evaluator or reader-facing output.

## What was read

1. _紫微斗數全書/卷一_, pinned Wikisource revision `7913704`: the _太微賦_
   statements on Thái Dương–Văn Xương and Hình/Sát–Liêm Trinh at Quan Lộc, plus
   the full Thiên Tướng answer. The raw revision was retrieved on 2026-10-15
   (SHA-256 `9beb8038a8b82154d15d81c8ff822423d4f0c7c006f536a86552adeaa594818a`).
2. _紫微斗數全書/卷三_, pinned revision `2268626`: the already-known
   _談星要論_ context order and the later formation notes were reread to check
   whether they define a priority for the extracted cases. They do not. The raw
   revision retrieved on 2026-10-15 hashes to
   `ed327a68253a89a6e8b2962932a16f75546826ffcdd2e9e4ac419ad0f389b03b`.
3. AItuvi and TuVi.me public pages: both were reachable (HTTP 200). Neither
   bounded inspection disclosed a calculation profile or a reproducible Quan
   Lộc condition/exception. They are recorded as observations only, not sources
   of rules. Their public content remains copyright-restricted; no text was
   copied into the dataset.

All book passages are from one unresolved textual family. Wikisource's CC BY-SA
status covers editorial contributions; the underlying-text caveat already in the
registry remains. This pass retains minimal quotations and locators only.

## Research Knowledge Yield

Three substantive candidates are in
`knowledge-k05-quan-loc-candidates.json`:

- `k05-taiyang-wenchang-quanloc-001`: direct two-star Quan Lộc configuration;
  direct claim but no defined geometry or exception.
- `k05-xingsha-lianzhen-quanloc-001`: direct adverse historical configuration;
  **BLOCKED** because the key source terms are not mapped to profile facts.
- `k05-tianxiang-conditioned-quanloc-001`: source gives both support and adverse
  condition sets, but no precedence for a mixed case.

They add three Quan Lộc/star relations and one explicit source-level conflict
pair. Two candidates are `source-backed`; one is `blocked`. All three retain
source locator, source-family, conditions, exclusions, opposing signals, a
positive research-trace example and a non-application example. The dataset
labels source text, BA normalization and unsupported hypotheses separately.

## Production Knowledge Yield

**0 rules proposed for implementation.** No candidate is production eligible:
there is no independent family, verified school/profile compatibility, vocabulary
mapping or source-defined conflict precedence. Methodology observations from
competitor pages were not counted as substantive knowledge.

The next narrowly scoped verification should acquire (with PO approval if paid)
one independent, bibliographically identified Nam-phái or explicitly classified
source that defines the same Quan Lộc conditions and exceptions. Only after a
profile mapping and an independent comparison should PO decide whether any
candidate advances to a verification fixture. Do not start K04B from this pass.

## Checks and handoff

- PASS — JSON/provenance check: three candidates, all source and passage
  references resolve in `knowledge-source-registry.json`; all remain
  `productionEligible: false`.
- PASS — `npm test`: 18 files / 321 tests.
- PASS — `npm run typecheck:strict`, `npm run format:check`, `git diff --check`.
- BLOCKED — `npm run audit:sources`: its Node process receives `spawnSync git
EPERM` at the provenance-revision call despite Git itself returning the current
  SHA. No audit PASS is claimed.

Repository state and commit SHA are supplied with the PM handoff after the
research-only changes are committed. No paid source was found or acquired in this
bounded pass.
