# Conditional editorial synthesis — v5

Baseline: `3c9cc79`. The user authorized PM-led product development after the
analysis-only discussion. This increment improves the existing source-bounded
reading; it does not replace the chart engine, activate new stars or certify predictions.

## Implemented

- `claims.ts`: typed applicability assessments for Tả–Hữu, Xương–Khúc and the
  existing Tử Vi-with-support context. Every prerequisite must match within one
  actual four-palace scope; unrelated scopes cannot be unioned into a match.
- Explicit editorial rule-status gates, including the supporting pair dependency
  for Tử Vi. Text-reviewed, disputed or deferred rules cannot emit supported claims.
- Each assessment preserves conditions, unmet prerequisites, raw star evidence,
  originating palace, passage IDs, limits and conditional self-check/actions.
- Scope-aware merging retains all origin-relative relations and source reasons
  instead of discarding all but the first match for a rule ID. Repeated evidence
  does not become a confidence score.
- `themes.ts`: both active pairs contribute to the combined exercise when both
  qualify. Titles now select an editorial focus from matched groups; fallback
  exercises remain explicitly conditional and are not inferred personality traits.
- `interpretation-panel.tsx`: each theme has a collapsed “Điều kiện của mạch luận”
  disclosure, with human-readable states, conditions and sourced explanations.
  This preserves the short default mobile journey. Print includes the disclosures.
- Report version is `reference-reading-v5`; calculation and knowledge profiles
  remain unchanged. No dependency, storage, privacy consent or network API changed.

## State semantics

`supported` means prerequisites of an existing editorial rule match, not that a
personality claim or prediction is proven. `insufficient` means prerequisites do
not match; absent support is never adverse evidence. `mixed` is reserved in the
contract but **not emitted**: the current catalog contains no admitted opposing
rules. This release does not claim to resolve astrological contradictions.

Raw evidence retains the engine's Tả Phù label; matching uses the existing Tả Phụ
alias. Annual/monthly suffixes are not silently treated as natal members. Brightness
and Tứ Hóa are not weights. Unknown-hour inputs still cannot create star readings.

## Quality gates and handoff

See [PM plan](../design/reading-synthesis-plan.md) for rule-admission contracts,
corpus and rubric proposals, and [actual checks](../test/reading-synthesis.md).
Synthetic chart mutations test applicability only, not star-placement accuracy.
The independent comparison corpus remains 24 partial cases / 146 fields, with
zero complete golden charts. No new independent edition has been validated.

Next: source/edition comparison and an independent corpus pilot, then admit each
additional auxiliary group separately. Cách cục, timed forecasts and RAG require
their own sources, tests and release gates. AI-assisted reviews are not independent
human-expert certification; a rubric score is not predictive accuracy.
