# HV-R01 — Reading UX vNext verification plan

Ngày: 14/10/2026. Trạng thái: **planned; no checks run for vNext**. Tài liệu này
không thay thế các bằng chứng hiện hữu tại `knowledge-validation.md`,
`reading-synthesis.md` và `career-reading.md`.

## Required test layers

| Layer | Required assertions | Evidence |
| --- | --- | --- |
| Contract | Brief validates schema/version; visible text maps to evidence/rule/passage; max three distinct insights; profile and version provenance survive serialization | Unit fixtures for ready, insufficient and unavailable only |
| Rule matrix | Required predicate enables; exclusion suppresses; deferred/disputed cannot emit; duplicate evidence does not boost a claim; conflict needs two approved sides plus resolver | Synthetic chart-signal fixtures, not golden charts |
| Prioritization | Topic selection changes order/brief topic only; no repeated semantic claim; ranking reason is present; no invented score | Deterministic unit tests |
| Grounding (future AI) | Output has only supplied claim IDs/facts; blocks new stars/palaces/sources, predictions, percentages and banned harms; invalid output falls back clearly | Adversarial fixed outputs and provider-mocked integration tests |
| Privacy/cache (future backend) | No name/exact birth fields in writer payload/logs/cache key; no public cache/URL/OG; opt-out sends no request; version changes invalidate private result | Request inspection and integration tests |
| UX/accessibility | Conclusion precedes evidence; topic control works by keyboard; evidence uses native accessible disclosure; 320px + largest text no horizontal overflow; contrast, focus, reduced motion, screen-reader labels | Playwright + axe; manual screen-reader/device session remains required |
| Regression | Existing chart calculation, invalid/unknown-time clearing, example label, local profile consent, no POST in deterministic mode, 12-cung/SEO routes unaffected | Existing unit/E2E suites plus targeted new cases |

## Domain edge states

- Unsupported chart profile, invalid structure, unknown birth time and incomplete
  catalog must yield no personal Brief claims.
- A rule with missing passage, unreviewed status, missing prerequisite or excluded
  signal must yield `insufficient-evidence`/suppression, never a generic replacement.
- Existing leap-month and late-Tý limitation states must preserve their provenance;
  these tests do not certify calendar correctness.
- `mixed` requires the future BA-approved counter-rule and resolver fixture. Until
  then it is invalid output, not a UX choice.

## Release gate

Run exact applicable commands after implementation: `npm run typecheck`, `npm test`,
`npm run build`, `npm run test:e2e`, `npm run format:check`, and `git diff --check`
when Git is available. Record command, date, revision, environment, pass/fail and
known gaps here; do not copy historical counts. Before any AI release, add provider
failure/timeout, consent, redaction, cache isolation and cost-limit evidence.

## Manual acceptance to schedule

One moderated reading test with 35–65+ users and one real-device/screen-reader pass
are required before presenting the experience as accessible or more understandable.
Measure comprehension of the conclusion and ability to find evidence, not belief in
predictions. Neither test validates astrological truth.

## Next action

QA can prepare contract fixtures only after BA freezes `ReadingBriefV1`; final QA
starts after HV-R03 and the deterministic part of HV-R04 are integrated.
