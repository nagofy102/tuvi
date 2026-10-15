# HV-K08 — Broad Knowledge Expansion

Status: **SUCCESS (research dataset, non-production)**. K08 directly reread three
bounded passages in the already registered, pinned public _紫微斗數全書_ volume-two
and volume-three revisions. It expands foundational vocabulary only; it does not
execute a placement method, change a calculation profile, or add a reader-facing
claim path.

## Coverage before / after

| Group               | Before K08                     | After K08                                          | Use now                             |
| ------------------- | ------------------------------ | -------------------------------------------------- | ----------------------------------- |
| Cyclical vocabulary | Tứ Hóa mentions a birth stem   | 10 named Can + 12 named Chi as stable nodes        | graph/catalog vocabulary            |
| Foundational terms  | state, aspect and Tứ Hóa terms | adds âm dương, ngũ hành and nạp âm                 | source-backed term explanation only |
| Fortune periods     | absent from foundation catalog | Đại hạn, Tiểu hạn, Lưu niên, Thái tuế              | graph nodes, no active facts        |
| Period relations    | absent                         | `REVIEWED_IN_PERIOD_PAIR` and one methodology gate | future DSL gate only                |

All new entities inherit `profile-unresolved`. The two new volume-two passages
and one volume-three passage are registered with exact pinned-revision line
locators and minimal reviewed quotations. They belong to the same unresolved
textual lineage already in the registry, so they are neither independent support
nor Nam Phái certification.

## Graph / DSL readiness and deferred depth

The added Can, Chi and period entities are graph-node-ready. The period-pair edge
is source-backed but blocked from evaluation: the source names separate and paired
review, not an executable placement, weight, precedence rule or modern outcome.

The source also contains detailed period outcomes and direction/placement wording.
K08 deliberately did **not** convert them into candidate rules. The deferred
research queue is: one school-classified source for period placement, a reviewed
profile mapping for direction and calendar inputs, and an independently supported
set of exceptions/precedence before any substantive period candidate is considered.

## Remaining breadth gaps

- Complete, source-classified auxiliary-star taxonomy beyond the bounded families.
- Explicit source-backed aliases/variants for palace and star terminology.
- Independently identified school profiles for Can–Chi, five-phase and fortune-period
  mappings.
- Provenance-backed vocabulary for remaining temporal terms without importing a
  calculation rule.

## Checks

- PASS — JSON parse; Source Registry structural schema validation; unique IDs;
  source/passage references; provenance/locator integrity; and a direct bounded
  source-content reread. Schema validation did not load optional format handlers,
  so URI/date _format_ annotations were not independently validated by Ajv.
- PASS — Prettier and `git diff --check` for the changed files.
- NOT RUN BY SCOPE: `npm test`, typecheck, production build and E2E. K08 changes no
  runtime code, runtime contract or production-consumed dataset.
- `npm run audit:sources` remains required because the research registry changed;
  BLOCKED in this environment: its Node Git provenance phase fails at `spawnSync
git EPERM`. Partial command output is not treated as a pass.
