# Mốc 1 hiện tại — Sửa lịch và bảo đảm dữ kiện lá số

The user's latest authorization prioritizes calendar remediation, the first milestone
in the latest PM roadmap. This is not the differently numbered original expert-validation
plan. No human expert certification is implied.

## Cause and decision

The original adapter passed Vietnamese lunar input through the Chinese calendar. The
prior audit found 85 affected dates: leap flag loss, unrepresentable day 30, and regular
month construction before leap month. Changing the birth date or leap flag is not a fix.

Choose option B of the validation plan: isolate the pinned engine and replace its
calendar seam, preserving the upstream npm installation for comparison.

## Implementation

- `src/domain/calendar/engine-bridge.ts`: supplies Vietnamese solar/lunar tuples,
  actual month lengths and lunar-year pillars throughout chart construction.
- Normal monthly pillars retain the existing five-tiger/post-day-15 convention.
  Day/hour pillars use upstream calculations for the real civil day, never a synthetic
  Chinese solar date. Exact solar-term year configuration is outside this profile.
- `scripts/build-vietnamese-engine.mjs`: reproducible pinned iztro integration with
  the calendar seam. The Vietnamese converter's ESM is bundled because its require
  export is incorrectly labeled type:module. Generated CJS works in Node and Next.
- `npm run engine:build` regenerates; `npm run engine:check` detects stale output.
  `npm run build` includes the check. Preserve the lockfile and dependency pins.
- Chart input is the real effective solar date. Raw lunar equality and chart structure
  guards remain. Only the explicitly selected 23:00 policy advances the effective day;
  original birth data remains intact.
- The application uses only the solar entry with its explicit supported config. Do not
  use the generated engine's lunar entry: upstream lunar-input validation still checks
  Chinese month existence. Do not expose the full upstream horoscope API as a supported
  Vietnamese almanac or forecast service without separate validation.
- Provenance: `iztro-2.6.2-vn-bridge-v1`, profile `iztro-default-vietnamese-lunar-v2`.
  Reference readings accept this current profile; no stored personal charts need migration.
- Upstream star tables and placement functions are unchanged. Generated MIT header and
  `src/domain/astrology/vendor/NOTICE.md` retain license/attribution notices.

## Checks

See `../test/calendar-remediation.md` for completed checks and counts.
`AUDIT_PROJECT_STRICT=1 npm run audit:tech` gates project calendar, bridge, chart and
Tý failures. Legacy `AUDIT_STRICT=1` intentionally still includes upstream findings.
Upstream defects remain diagnostic comparison evidence, not production failures.

An ESM build with external CJS requires failed production prerender; replaced with CJS.
The calendar's malformed require entry was fixed by bundling its valid ESM entry.
Playwright's default cleanup interrupted an audit's progress writer. Its output is now
isolated under `test-results/playwright/`; the interrupted run is not acceptance evidence.

## Boundaries and next action

- Acceptance sweep is 1950–2026. The UI converter retains 1900–2099, without claiming
  every chart/date outside the audited interval has been verified.
- Tabular Vietnamese calendar, not historical offsets, birth-place time zones, DST
  resolution or apparent solar time.
- Round trips and structure checks do not establish independent calendar or expert
  star-placement correctness; sourced Tết fixtures remain in the calendar unit suite.
- No new star table, forecast, human sign-off or interpretation knowledge expansion.
  The classical leap convention conflict remains visible; engine defaults are not certified.
- Performance >90 remains unresolved and is not inferred from build/test success.

Next: inventory/version rule sources and expand independently sourced fixtures, per the
latest PM milestone 2. Never label engine-derived outputs as independent golden answers.
