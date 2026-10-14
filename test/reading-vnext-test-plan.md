# HV-R01 — Reading UX vNext verification plan

Ngày: 14/10/2026. Trạng thái: **runtime tests planned; HV-R02 documentation checks recorded below**. Tài liệu này
không thay thế các bằng chứng hiện hữu tại `knowledge-validation.md`,
`reading-synthesis.md` và `career-reading.md`.

## Required test layers

| Layer                          | Required assertions                                                                                                                                                                                           | Evidence                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Contract                       | Brief validates schema/version; visible text maps to evidence/rule/passage; max three distinct insights; profile and version provenance survive serialization                                                 | Unit fixtures for ready, insufficient and unavailable only             |
| Rule matrix                    | Required predicate enables; exclusion suppresses; deferred/disputed cannot emit; duplicate evidence does not boost a claim; conflict needs two approved sides plus resolver                                   | Synthetic chart-signal fixtures, not golden charts                     |
| Prioritization                 | Topic selection changes order/brief topic only; no repeated semantic claim; ranking reason is present; no invented score                                                                                      | Deterministic unit tests                                               |
| Grounding (future AI)          | Output has only supplied claim IDs/facts; blocks new stars/palaces/sources, predictions, percentages and banned harms; invalid output falls back clearly                                                      | Adversarial fixed outputs and provider-mocked integration tests        |
| Privacy/cache (future backend) | No name/exact birth fields in writer payload/logs/cache key; no public cache/URL/OG; opt-out sends no request; version changes invalidate private result                                                      | Request inspection and integration tests                               |
| UX/accessibility               | Conclusion precedes evidence; topic control works by keyboard; evidence uses native accessible disclosure; 320px + largest text no horizontal overflow; contrast, focus, reduced motion, screen-reader labels | Playwright + axe; manual screen-reader/device session remains required |
| Regression                     | Existing chart calculation, invalid/unknown-time clearing, example label, local profile consent, no POST in deterministic mode, 12-cung/SEO routes unaffected                                                 | Existing unit/E2E suites plus targeted new cases                       |

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

## HV-R02 — Contract acceptance specification

Canonical: [reading-brief-contract.md](../dev/reading-brief-contract.md).
Samples: [reading-brief-samples.md](../design/reading-brief-samples.md).
R01 sketches above are historical intentions. No runtime v1 validator, UI,
adapter, AI or backend tests have executed. Required future mutation cases:

| Case                                                                   | Expected behavior                                             |
| ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| ready with two/one admitted distinct insights                          | accept after actual schema/grounding validation               |
| valid chart but insufficient premises                                  | null conclusion/topicReading, zero insights, explicit message |
| unsupported topic/profile, invalid/unknown-time chart                  | unavailable, no claims                                        |
| fourth insight, duplicate semantic key, empty key                      | reject, never silently truncate                               |
| paragraph/insight missing claimId, dangling evidence, ungrounded title | reject                                                        |
| same claimId with different text/evidence                              | reject                                                        |
| missing required passage, unknown source or mismatched revision        | reject                                                        |
| disputed/deferred rule, source-unavailable Quan principal              | suppress; never call a physically present star absent         |
| null/empty nextStep                                                    | reject; absent nextStep valid                                 |
| ready with zero insights/null conclusion; non-ready with claims        | reject                                                        |
| user-chart with mock evidence/not-run validator/null versions          | reject                                                        |
| structure-valid labeled independently-verified without artifact        | reject                                                        |
| demo changed to user-chart without genuine validation/signals          | reject                                                        |
| mixed/opposing assertion without admitted resolver                     | reject                                                        |
| topic switch/serialization                                             | preserve claim IDs, revisions and visible demo label          |
| network/log/cache operation in deterministic MVP                       | fail privacy acceptance                                       |

### Editorial rubric (1–5 each)

1 = absent/poor, 3 = bounded but incomplete, 5 = clear and demonstrably strong.
Score specificity, synthesis depth, traceability, natural Vietnamese, and chart
discrimination separately. These are editorial scores, not predictive accuracy.
Pending user scores must not be filled with AI certainty.

- Swap Test needs different documented chart structures; these four examples reuse
  one excerpt, so **not evaluable**, not pass.
- Generic Test: “phần việc chung”, “trách nhiệm” remain broad if detached from their
  exact premises. A citation does not make a sentence personally distinctive.
- Advice Removal: no advice in these samples; interpretive content remains, but
  this does not prove superior reader value.
- Evidence Test: each claim needs dictionary premises AND the editorial connecting
  rule; source anchor and original prose must stay distinct.
- Repetition Test: insight and topicReading can reuse one claim but must not display
  the same paragraph twice on the primary screen. Sample 1 may overlap; sample 2
  offers one synthesis rather than forcing two.

### Review status and open gates

BA advisory confirmed actual rule IDs/statuses and source revisions. No new
astrology rule admitted. Samples are structural mocks / partial-excerpt demo,
not chart verification cases. All four need user quality approval.
No independent Nam full-chart corpus or approved opposing resolver exists.
Historical HV-R02 documentation checks on baseline `17ac243` plus its
eight-document diff (before HV-R02C rewrote the samples):

- Node read-only check: eight documents, twelve relative links resolve; balanced
  code fences and final newline; six JSON blocks parse; four expanded documentation
  examples with then-current insight counts 2/1/0/1. Checked claim ID consistency, evidence
  references, dedup keys, status combinations and mock labels. Pass.
- Scoped `prettier --check`: all eight documents pass after formatting.
- `git diff --check`: pass. No source, test code, dependency or rules-file edits.
- QA checked baseline commit, actual source/rule IDs/statuses and source revisions;
  all five evidence-pool records map existing admitted text/editorial entries.

These are documentation checks, not an implemented JSON schema, runtime grounding
validator, chart correctness, fresh source authenticity check or user quality pass.
No build/unit/E2E/Lighthouse run is needed or claimed for documentation-only work.
R03/R04 BLOCKED pending sample approval and explicit implementation authorization.

### QA documentation integration decision

QA agent read-only review: **ACCEPT documentation-only integration** after PM
clarified explicit principal absence versus unavailable source, exact Mệnh–Thân
admission, local signal resolver, separate deterministic versus AI validators,
and exclusive future file ownership. QA independently parsed/composed four examples
and re-ran `git diff --check` successfully. No application/dependency/rules edits.
User sample-quality approval and multiple-chart Swap Test remain OPEN. This accepts
the documentation handoff only, not implementation, predictive claims or production
readiness. PM is the sole integration/main push owner for this single-session task.

## HV-R02C handoff

Current Style A rubric, two observed synthetic SignalSets, proposed expected
template selection and current four-payload review are at
[reading-style-a-review.md](reading-style-a-review.md). The historical HV-R02
counts above must not be reused as current results. Current examples have insight
counts 1/1/0/1; schema/grounding runtime checks remain unimplemented.
