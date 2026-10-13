# Source intake and mobile measurement evidence

Date: 2026-10-13 UTC. Baseline `24e9dfb`, uncommitted increment.

## Acceptance boundary

- Expectations must be static source-counted values, never engine-generated.
- Compare only declared fields; unverified placements do not count as passes.
- Reject inadmissible corpus metadata before engine execution.
- Research differences do not activate star rules or silently change engine profiles.
- Preserve mobile form, dialog keyboard behavior, unknown-hour handling and consent.
- Record every isolated Lighthouse run, not just the best score.

## Actual mobile measurements

Default Lighthouse mobile simulated network/CPU throttling, local production,
Chromium system executable. Accessibility/SEO 100 and CLS 0 in every listed run.

| Build / UTC      | Performance | LCP ms | TBT ms |
| ---------------- | ----------- | ------ | ------ |
| Before, 15:47:00 | 90          | 3391   | 163    |
| Before, 15:47:13 | 91          | 3361   | 138    |
| Before, 15:47:26 | 91          | 3344   | 117    |
| After, 15:49:39  | 91          | 3247   | 145    |
| After, 15:49:53  | 64          | 3774   | 1077.5 |
| After, 15:50:11  | 86          | 3372   | 258    |
| After, 15:50:26  | 76          | 3653   | 538.7  |
| After, 15:50:41  | 92          | 3201   | 132.5  |

Before: `test-results/mobile-budget/before/`; after:
`test-results/mobile-budget/after-isolated/`. All runs kept, command exit 1 for
both batches. After measurements ran only after the browser suite completed.
The shared environment is not a controlled lab: CPU variance has not been
established as the root cause. Do not excuse low scores or claim stable improvement.

Initial transferred bytes in the first reports decreased from **385,222 to
354,291** (30,931 fewer bytes, about 8%). This confirms a smaller payload, not
stable performance. Median after score is 86; **>90 gate fails**, LCP >2.5s.

An earlier after batch under `test-results/mobile-budget/after/` accidentally
overlapped E2E: scores 67/78/56/76/81. This batch is explicitly contaminated and
not used for before/after acceptance. It is retained rather than silently deleted.
The reusable runner now checks for a responding test server around each run and
refuses report-label overwrite. That guard cannot exclude every external workload.

## Application checks

- `npm run build`: passed, engine reproducibility and 35 prerender resources.
- `npm run test:e2e`: **25/25 passed**, 1.4 minutes, production after form change.
  Includes 320px/extra-large text, axe A/AA and enhanced text contrast, dialog
  focus, consent/local profiles, unknown hour, SEO/OG and reading evidence.
- `npm test`: **229/229 passed**, 12 files, start 15:58:44 UTC, 14.25 seconds.
- `npm run typecheck`: passed after final admission/test edits.
- `npm run audit:reference`: **36/36 partial cases**, **218 known fields**,
  zero mismatches/unavailable; zero complete golden charts.
- `npm run format:check`, `git diff --check`: passed.
- `node --check scripts/run-mobile-budget.mjs`: passed; direct CLI checks reject
  `--runs 1` and reuse of the existing `before` report label with exit 1.
- Root rechecked local image SHA-256 values and independently viewed scan leaves
  72/74; this is another AI review, not a human practitioner or edition certificate.

First full unit attempt: 213/214 passed; aggregate 36-case comparison took 6.386s
and exceeded its former 5-second default. Scoped that one test to 15 seconds while
retaining every comparison and assertion; the final full run above passed.
Formatting initially reported three changed corpus files; formatted them and
reran the complete unit/type/reference/format sequence successfully. Admission
mutation tests verify rejected corpora invoke the engine zero times and do not
mutate expectations; they do not certify source authenticity.

No new forecast, complete oracle, human certification or real-device test is
claimed. Calendar engine unchanged; full 1950–2026 audit not rerun.
