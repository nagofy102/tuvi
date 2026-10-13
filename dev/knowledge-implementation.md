# Source-bounded knowledge and contextual readings

This records the v2 milestone. The running content is now v5 with the same source
profile and placement gates; see `reading-synthesis.md` for conditional applicability
and evidence merging, and `pm-priorities.md` for the opening/short flow
and `ui-content-upgrade.md` for the preceding v3 UI.

## Implemented artifacts

- `src/domain/interpretation/knowledge.ts`: knowledge profile, exact excerpts, per-rule
  passage IDs, own readings, limits and review states. `text-reviewed` is textual review,
  not predictive or practitioner approval.
- `context.ts`: distinct pair members in four actual palaces with principal context,
  Tử Vi with support and Mệnh–Thân synthesis. Only `editorial` active pair rules run.
  Deferred Khôi–Việt never emits, even with the literal Khôi-at-Mệnh / Việt-at-Thân
  arrangement. Formations remain disabled.
- `calculate.ts`: retains chart/profile integrity gates, rejects duplicate recognized
  auxiliary stars and generates v2 evidence. Brightness/Tứ Hóa remain engine attributes,
  not forecasts or weights.
- `interpretation-panel.tsx`: overview, twelve palaces, symbolic glossary and insights.
  Every synthesis has expandable why/facts/passage/limits; Tý/leap choices and unresolved
  rules are visible. Native keyboard details; why expands for print. No provider,
  network birth-data export or persistence added.
- `/phuong-phap#ho-so-quy-tac`: public rule/profile register and disputed/deferred states.
- `tests/fixtures/reference-charts.json`: 24 synthetic lunar-input partial fixtures.
  Static expectations hand-counted from pinned external passages, not engine snapshots.
  No names or fabricated solar dates; one literal Cục/Tử Vi example. Solar conversion
  is NOT independently validated by this corpus.
- `scripts/reference-diff.ts`: rejects unresolved provenance, engine-derived flags,
  snapshot-oracle policy and unknown expected keys. Compares only present fields;
  duplicate star occurrences fail, even in the correct palace.
- `scripts/run-reference-diff.mjs`: `npm run audit:reference` writes ignored JSON/Markdown
  reports with timestamp, revision/dirty flag, fixture SHA-256, actual/expected,
  diagnostic categories and unverified fields. Nonzero on mismatch/unavailable;
  never writes fixtures. Admission metadata checks are not proof of source accuracy.

No dependency, star-placement algorithm or engine artifact changes were needed.
The Node diff bundles the calendar package's valid ESM entry: upstream's require
condition points at CJS in a `type:module` `.js` file. This matches the engine builder;
Next/Vitest already handle the ESM entry.

## Version and naming

Chart profile `iztro-default-vietnamese-lunar-v2`; knowledge profile
`huyenvi-source-bounded-v1`; report `reference-reading-v2`.
Actual selected Tý/leap policies are disclosed; no certified Nam/Bắc label or hidden
mixing of Tứ Hóa tables. Locale spells 左輔 `Tả Phù`; the explicit lookup alias
`Tả Phù -> Tả Phụ` preserves raw evidence. Monthly/daily/hourly suffix stars are
never silently merged into natal stars.

## Remaining limits

See `knowledge-source-review.md` for excerpts/rights. The full leap sentence generalizes
from leap first month to others; it conflicts with split/same-month choices, stays
disputed and never changes birth data. Khôi–Việt ordering needs more comparison.
Single-star glossary explains vocabulary only. Pair predicates are editorial filters,
not identified classical cách cục or empirical predictive validation.

The diff checks 146 known fields of 24 partial cases, not 24 complete charts or the whole
calendar. The earlier 1950–2026 audit is separate; not rerun for these non-engine changes.
The older 200–300 complete-chart gate remains open. Actual verification is recorded in
`../test/knowledge-validation.md`; next work is independent edition/fixture sourcing
and disagreement resolution before enabling more rules.
