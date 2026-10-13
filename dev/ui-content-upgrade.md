# UI and thematic reading upgrade

## Implemented scope

Based on `66b144e`, in the existing checkout; no calendar/placement engine changes,
dependency changes, API/provider calls, new personal persistence or oracle rewrites.
The content artifact is internally versioned `reference-reading-v3`; chart and
source-knowledge profiles stay unchanged. The version is not displayed publicly.

- Native star dialog explicitly centered (`position: fixed; inset: 0; margin: auto`)
  to override the CSS reset that removed browser-default margins. Blurred backdrop,
  scrollable height, 48px close control, Escape/outside-click dismissal, body scroll
  restoration and return focus remain supported.
- Chart, selected-palace details and dialog use scoped navy/obsidian/gold tokens.
  Major/minor stars have distinct hierarchy. Print overrides retain white paper.
- Public text no longer displays engine/library versions, rule/passage IDs or profile
  tags. Internal provenance, source URLs pinned to revisions and test identifiers
  remain intact; removing display tags does not remove auditability.
- `InterpretationReport.themes`: three original behavioral reading streams, before
  the optional 12-palace reference. A local concern selector reorders the streams,
  without changing the chart or the evidence. Actual matched auxiliary groups change
  the exercises, self-checks and adjustments; incomplete groups do not activate them.
- Each stream exposes “Vì sao luận như vậy?” with actual palace/star evidence and
  pinned source passages. Editorial cross-palace topic selection is explicitly not
  claimed to be a classical trine or a forecast. Single-star text is a glossary.
- `present.ts`: current Vietnamese civil/lunar date, nominal lunar age and a unique
  containing decade range. Age uses the original lunar birth year, not a next-day
  chart-effective date. Future births and missing/ambiguous ranges do not get a
  guessed age/range. 2026/Bính Ngọ is an explicit reference year only.
- One disclaimer at the reading header; existing site footer supplies the second.
  Detailed methodological limits stay in expandable scope/source sections.

## Content contract

See `../design/reading-style-policy.md`. This is an implemented local composition
policy plus a prompt specification for a future AI provider, **not** an API integration.
Assertions about observable chart facts are direct; behavioral questions are concrete
self-checks, not invented personality claims. Warnings carry an adjustment. Partner
copy is gender-neutral; feared outcomes and luck percentages are not generated.

## Deliberately deferred

No annual or decade predictions, flying transformations (Phi Hóa), formations,
additional unverified star groups, premium accuracy claim or independent practitioner
certification. Yearly star placements are not present in `ChartResult`; displaying a
calendar year does not imply those placements were calculated. No new performance
measurement; stable Lighthouse Performance >90 remains open.

## Verification

Actual results and browser evidence are recorded in `../test/ui-content-upgrade.md`.
Screenshots are generated under ignored `test-results/`; no personal chart URLs or
remote analytics are introduced.
