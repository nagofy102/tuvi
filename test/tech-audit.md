# RUN_TECH_AUDIT — Milestone 2 technical investigation

## Scope and execution

Authorized task: implement and run the technical audit first. This does not authorize an
unverified golden dataset, production calculation patches or expert sign-off.

- Full daily range: 1950-01-01 through 2026-12-31, inclusive (28,124 dates).
- Daily probes: Vietnamese solar/lunar round trip and the actual upstream converter's ability
  to represent the Vietnamese lunar tuple without normalization.
- Every actual lunar month end (day 29 or 30), upstream converter failure, Tết edge and leap
  day 15/16 gets a noon/male/default-policy chart probe.
- Expanded representatives per civil year and every date in Vietnamese leap month 2 of 1985
  exercise 00:00, 00:59, 01:00, 22:59, 23:00 and 23:59, both genders, both late-Tý policies,
  and both leap-month policies when the birth date is in a leap month.
- Structural checks: 12 unique palaces/branch indices, one Thân and 14 unique major stars.
- Metamorphic checks: late Tý with civil-midnight equals early Tý on the same day;
  advancing at 23:00 equals midnight of the next complete civil date.

This is NOT all dates × all hours × all genders × all policies. Metamorphic/structure tests
are not expert-reviewed star-placement ground truth. Round trips cannot establish calendar
correctness independently. These distinctions must remain visible in future reports.

## How to reproduce

```sh
npm ci
npm run audit:tech
```

Focused subset, useful for diagnosis:

```sh
AUDIT_START_YEAR=1985 AUDIT_END_YEAR=1985 npm run audit:tech
```

Strict release-style gate:

```sh
AUDIT_STRICT=1 npm run audit:tech
```

Normal exit 0 means the report was generated, not that every case passed. Strict mode fails
on non-informational findings. Do not equate the single Vitest audit test passing with all
chart attempts passing. Do not run two audits concurrently into the same output directory.

Outputs under ignored `test-results/tech-audit/`:

- `report.json`: counts, input-level findings, versions and Git revision/dirty status.
- `report.md`: readable report plus the complete executable TypeScript source in Markdown fences,
  captured when the runner starts.
- `progress.json`: live, timestamped progress. This is not a completed result.

Sources: `../scripts/tech-audit.ts`, `../scripts/tech-audit.test.ts`,
`../vitest.audit.config.ts`; regression tests: `../tests/unit/tech-audit.test.ts`.
The audit uses already-installed dependencies; no new packages or paid services are required.

## Root causes confirmed by source inspection and focused reproduction

### 1. Incompatible leap-month model

`iztro@2.6.2` lunar input is validated using `lunar-typescript`, converted via `lunar-lite`
to a solar date and processed by the solar-chart path. It is not calendar-independent
calculation directly from the supplied Vietnamese lunar tuple.

In 1985, the upstream Chinese calendar has no matching leap month 2. `lunar-lite@0.2.8`
can ignore that leap flag and return the regular month. The project adapter's raw lunar
guard detects this and rejects the result. This is calendar-model incompatibility,
not evidence that star-placement formulas are wrong.

### 2. Regular-month preconstruction before leap-month conversion

`lunar-lite/lib/convertor.js` constructs `Lunar.fromYmd(year, +month, day)` before deciding
whether it should construct the negative leap-month number. A leap month with 30 days can
therefore be rejected because the corresponding regular month has only 29 days.

| Civil date | Vietnamese lunar date | Observed upstream exception |
| --- | --- | --- |
| 1952-07-21 | Day 30, leap month 5, 1952 | `only 29 days in lunar year 1952 month 5` |
| 1955-05-21 | Day 30, leap month 3, 1955 | `only 29 days in lunar year 1955 month 3` |
| 2017-08-21 | Day 30, leap month 6, 2017 | `only 29 days in lunar year 2017 month 6` |

Diagnostics require successful signed-month construction AND failed unsigned construction
before assigning this cause. Unknown converter errors are not assigned this category.
The direct signed-month check is an isolation probe using the same upstream library,
not an independent calendar oracle.

### 3. Calendar disagreement versus algorithm defects

Some Vietnamese lunar tuples map to different solar dates in the upstream calendar while
their lunar fields are preserved. Record these as informational solar divergences; do not
automatically call the chart incorrect without approved school-specific fixtures.

`upstream_calendar_rejection` means the upstream calendar cannot represent the supplied
tuple. `project_adapter_error`, `chart_structure_error` and `zi_policy_mismatch` are separate
diagnostic categories; no algorithm error should be inferred solely from a calendar rejection.

## Verification status

Completed full run: 2026-10-13, 07:36:48–07:44:36 UTC, about 469 seconds.
Base revision: `26b036b35946a4b1baad3b9ebaa1660baec7718d`, with uncommitted audit changes.
Runtime: Node 24.19.0, iztro 2.6.2, lunar-lite 0.2.8, lunar-typescript 1.8.6,
Vietnamese converter 1.0.1. Profile: `iztro-default-vietnamese-lunar-v1`.

| Check | Actual result |
| --- | --- |
| Daily Vietnamese round trips | 28,124 passed, 0 failed |
| Invalid day 30 in 29-day months | 447 attempted, 447 rejected, 0 incorrectly accepted |
| Next-day converter probe errors | 0 |
| Upstream lunar tuples | 28,039 preserved, 85 not representable/preserved |
| Informational solar divergences | 755 |
| Targeted chart attempts | 11,046 over 1,144 selected base dates; 9,369 succeeded, 1,677 rejected |
| Targeted technical success rate | 84.82%; NOT population availability or expert accuracy |
| Tý equivalence checks | 4,624 passed, 0 failed; 796 unavailable due to missing charts |
| Unit regression suite | 71/71 tests passed in 4 files |
| TypeScript, Prettier, Git whitespace | Passed |

All chart rejections were attributed to upstream calendar conversion/model limitations:

| Diagnostic category | Daily lunar inputs | Chart attempts rejected |
| --- | --- | --- |
| `upstream_leap_flag_loss` | 60 | 1,396 |
| `upstream_calendar_rejection` | 22 | 158 |
| `upstream_regular_month_preconstruction` | 3 | 123 |
| Total | 85 | 1,677 |

The 60 flag-loss inputs span Vietnamese leap month 2 of 1985 and leap month 7 of 1987
(30 days each). The 22 calendar rejections concern day 30 absent from the upstream regular
month; example: 1968-02-27, Vietnamese day 30/month 1, rejected upstream as a 29-day month.
The three preconstruction dates are listed above. Repeated hour/gender/policy attempts
must not be presented as 1,677 different unsupported birth dates. The rejected chart attempts
cover 90 distinct original civil dates, including previous-day late-Tý births whose effective
date advances to an unsupported date.

No project-adapter, structure or Tý-relation failure was observed in this run. This does not
prove star-placement correctness: there was no independent expert chart corpus in the audit.
The existing raw-date guard safely rejects leap-flag loss; do not remove it to increase the pass rate.

An initial focused 1985 run completed, and an early full run was stopped for diagnostic
hardening. Counts above come only from the completed full rerun after that hardening.
Independent read-only review prompted tests for injected converter failures, incorrect day-30
acceptance, generic tuple changes and unrelated upstream exceptions; all are in the unit suite.
No production engine/calendar rule was patched; build/E2E were not rerun because application
source and dependencies did not change. Milestone 3 golden data and expert sign-off remain pending.

## Recommended next action

Prototype a calendar-independent adapter/engine seam, starting with the confirmed leap-day-30
conversion defect, and compare against approved fixtures before changing production behavior.
Do not coerce Vietnamese leap dates into nearby Chinese dates, remove the leap flag, bypass
the existing raw-date guard or label engine-generated outputs as expert ground truth.

Milestone 3 expert dataset and full auto-diff against approved charts remain separate tasks.
