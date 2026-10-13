# Nam Phai implementation

## Implemented scope

DEV follows the BA contract in `nam-phai-migration-spec.md` and the specialist's
review in `nam-phai-source-decision.md`. Production calculation now uses the
single `nam-phai-chinese-lunar-v1` profile. `split_at_15` and
`next_day_at_23` are fixed and conflicting values are rejected by both chart and
saved-input validation. These are the application's declared conventions.

- `src/domain/calendar/convert.ts`: Chinese conversion shared by the form,
  calendar tool, unknown-hour output, chart input validation and present age.
  Gregorian dates are parsed explicitly, without browser timezone parsing.
  Signed lunar-month construction preserves leap dates and rejects normalization
  by checking the exact round trip. This bypasses lunar-lite's regular-month
  preconstruction failure for valid leap day 30. `lunar-typescript` 1.8.6 is now
  a direct exact dependency; it was already installed transitively, with no upgrade.
- Calendar input remains 1900–2099. Gregorian dates early in 1900 can output
  lunar year 1899; that converted output is supported. Direct lunar inputs still
  require 1900–2099 and the resulting civil date must be within that range.
- `src/domain/astrology/calculate.ts`: unmodified pinned iztro 2.6.2 with Chinese
  solar input, `algorithm: default`, normal lunar-year boundary and explicit
  Southern Tứ Hóa table from `nam-phai.ts`. At 23:00–23:59, advance one full civil
  day before calculation, use index 0, and keep original birth dates in the result.
  Tuple/12-palace/one-body/14-principal checks remain mandatory. Provenance is
  `iztro-2.6.2-nam-phai-v1` / `chinese-lunar-typescript-1.8.6-v1` / new profile ID.
- Form choices for alternative leap/Tý rules are removed. Leap-month checkbox
  remains an actual birth-date input. Method page, calendar page/metadata, FAQ,
  result source note and unknown-hour labels consistently describe the Chinese
  calendar. The late-Tý result explains the calculation lunar date separately.
- Reading knowledge uses `huyenvi-nam-phai-source-bounded-v2` and rejects charts
  with other profiles or policies. Existing bounded interpretation remains;
  this migration does not activate further stars, formations or annual forecasts.

## Saved records

New opt-in records use `huyenvi:consented-profiles:v2`, envelope version 2 with
calculation profile and calendar version. Opening incompatible envelopes fails.
The old v1 key is left untouched. Its presence displays a re-entry explanation
and a separate confirmed-delete action, including when the v2 envelope is corrupt.
Old lunar tuples are never silently reinterpreted as Chinese dates. The user can
enter the stable civil date or confirm the lunar date under the current calendar,
then explicitly consent to a new save. No external upload is involved.

## Historical audit isolation

`astrology/legacy-profile.ts`, `astrology/legacy-vietnamese.ts` and
`calendar/legacy-vietnamese.ts` preserve the archived v2 profile. The Vietnamese
vendor engine still uses that archived converter through `engine-bridge.ts`;
its regenerated artifact changes only internal source-path labels. `engine:check`
continues verifying reproducibility. Historical reference and technical audit
scripts use the archived modules. Their 36 partial cases/218 source fields keep
their original values and profile; their pass is not a validation of the new profile.
No legacy calculator is imported by the application UI or public route.

## Verification and limits

DEV observed typecheck and engine reproducibility pass. The intermediate full
unit run passed 279 tests in 14 files at 2026-10-13 17:00:26 UTC, before the final
1900 boundary clarification. QA owns final migration edge tests and E2E; final
results are recorded in `../test/nam-phai-migration.md` rather than inferred here.

The Southern designation is directly sourced for the explicit Tứ Hóa table;
the other conventions are the reviewed application choices. School-wide human
certification, historical birthplace/timezone correction and true solar time are
not supplied. Current civil date uses Asia/Ho_Chi_Minh, then converts by the same
Chinese calendar; age uses original lunar birth year. Age bands remain facts,
not forecasts. Competitor comparisons are separately admitted with their actual
visible fields and compatibility; modern documentation is not an independent
full-chart oracle.
