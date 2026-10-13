# Milestone A source-registry checks

2026-10-13 UTC, baseline `9831010`, before the increment's commit.

## What this increment checks

- Canonical reviewed documents and passages cannot be replaced using fixture
  declarations alone. Wrong URL/revision/heading/quote is rejected before engine.
- Expected field permission is checked independently of source ID existence.
- Reading-only documents and scan-only artifacts are not placement oracles.
- Registry metadata cannot claim new complete charts or certified independent
  editions within this deliberately bounded version.
- Artifact hashes compare only explicit local files; mismatches fail, but matching
  bytes do not validate bibliographic identity or interpretation accuracy.

## Actual checks so far

- Targeted Vitest: **78/78** across source admission and existing corpus test files,
  start 16:13:51 UTC, 2.46 seconds; typecheck passed.
- Offline source audit: **4/4 supplied images match** recorded digests (cover,
  title leaf, leaves 72/74). Root also viewed the title leaf independently of BA.
- Deliberate mismatch: supplied title-leaf image for `scan-leaf-72`; exit 1 and
  `passed:false`, `matches:false` recorded. Then ran the complete valid four-image
  audit again; exit 0. It did not alter any corpus expectations.
- Full unit suite: **245/245 passed**, 13 files, start 16:16:20 UTC,
  18.69 seconds; includes 16 new source-admission checks.
- `npm run typecheck`: passed after final source-gate changes.
- `npm run audit:reference`: **36/36 partial cases**, **218 fields**,
  zero mismatch/unavailable and zero complete golden charts.
- `npm run format:check`, `git diff --check`: passed; management Markdown/JSON
  formatting also checked separately.
- `npm run build`: passed, engine reproducibility check and 35 prerender resources.

Four-image audit completed at 16:14:48 UTC with registry SHA-256
`74a1f11f2238e842ccc2d44fccf25303b8d666952589c1cf791389cf717ec3e3` and
unchanged corpus SHA-256
`c82c4466c4e34881360a61c6ceb6248888768574a08331441567d4855788b28b`.
No expected fields or interpretations were added by this increment.

Generated audit evidence: `test-results/source-registry/report.json` (ignored).
No book images or OCR dumps are committed. Registry data remain explicitly
AI-reviewed, catalogue identity pending, zero independently certified complete charts.

## Not rerun / not completed

UI, routes, reading rules and calculation engine are unchanged. Do not claim a
new E2E, Lighthouse or 1950–2026 calendar result for this increment; those actual
checks remain in earlier reports. Mobile >90 still fails the latest recorded
gate. Catalogue HTTP 403 is an access limitation, not proof the book is absent.
No full published chart, new auxiliary group, opposing-rule synthesis, cách cục,
vận forecast or external AI provider is admitted here.
