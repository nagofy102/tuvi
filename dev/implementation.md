# Steps 2–4 implementation and handoff

## Runtime and layout

Next.js 16.4.0 / React 19.3.0 / Tailwind 4.3.3 / TypeScript 7.0.2, pinned in the lockfile.
Node.js >=22, validated on 24.19.0. No external service is required for the implemented features.
Run `npm ci`, `npm run dev`; production uses `npm run build` then `npm run start`.
When the cloud home npm cache is not writable, pass `--cache /tmp/tuvi-npm-cache` to npm install/ci.

`src/app` owns routes and metadata. `src/components` owns interactive UI. `src/domain` has
framework-independent calculation wrappers/types; `src/data` has cultural explanatory copy,
annual content and catalog-derived constants. `src/lib/seo` owns canonical/JSON-LD/OG helpers.
`src/fonts` contains licensed merged font derivatives served by `next/font/local`.

## Step 2

- Parchment landing page with an anonymous solar/lunar birth form and immediate date confirmation.
- Calendar toggle preserves the same birth date; lunar mode exposes the leap-month checkbox.
- Gender and time are explicit inputs; leap and late Tý rules are selectable under advanced settings.
- Initial example is computed for 17 May 1990, 09:30, male and visibly labeled as an example.
- Submission dynamically loads the star engine and keeps user details in browser memory.
- 12-palace perimeter uses a deterministic branch→CSS-grid coordinate map; mobile can scroll
  the chart or switch to a single-column list with larger readable text.
- Palace/star buttons reveal descriptions and catalog classifications. Native dialogs trap focus,
  close on Escape and restore the triggering control. All stars are available in the detail panel.
- Text-size setting is the only localStorage value. Reduced motion, print/PDF and nonpersonal
  site sharing work without a backend.

## Step 3 reference profile

Calendar: `@dqcai/vn-lunar` 1.0.1, MIT, Vietnamese table data. Range 1900–2099 for user input.
Call the named ESM conversion functions; do not use the package's `LunarCalendar.fromLunar`
convenience method for leap births (its implementation does not apply the leap flag to conversion).
The dependency normalizes invalid dates/leap flags; the wrapper validates civil dates and
round-trips lunar input to reject normalization. Round-trip checks supplement independent fixtures.

Star engine: iztro 2.6.2, MIT, profile `iztro-default-vietnamese-lunar-v1`. Its default Zi Wei
rules, brightness and Vietnamese labels provide Mệnh/Thân, 14 major stars, supporting stars,
life stages and decade age ranges. A separate reviewed interpretation/scoring model is not present.

Pass the already converted Vietnamese lunar date explicitly; do not call `bySolar` on a Vietnamese
birth and assume the library's Chinese calendar is equivalent. Verify its returned raw lunar date
matches the intended effective date. Dates unrepresentable by that calendar (e.g. Vietnamese leap
month 2 in 1985) fail clearly in Vietnamese; the independent converter remains usable.

Defaults: normal lunar-year boundary, common/default Zi Wei algorithm, leap day 1–15 uses the
current month and day 16+ the following month; late Tý retains the civil date until midnight.
The alternate late Tý policy advances the full solar day and recalculates the lunar date before
calling the engine, including month/year changes. Original dates are preserved in the result.
Minute precision determines validation/display; hour branch determines placement.

Nạp âm uses an explicit 30-pair table over the sexagenary cycle, with source conventions exposed
on `/phuong-phap`. Return structural validation checks: 12 unique palace names, one Thân, 14 major stars.
The profile is a reference implementation, not expert-validated for all Vietnamese schools. Do not
equate adapter tests or upstream library output with an expert-reviewed fixture corpus.

## Step 4

`[annualPath]/[slug]` accepts exact `tu-vi-nam-2026`/`tu-vi-nam-2027` paths and canonical
year-name/year/gender slugs. Birth-year range 1900 through the target year gives 510 valid
combinations. Twenty-four featured records are pre-rendered; other valid records render/cache
on demand. Invalid years, mismatched can chi or gender slugs return 404.

The content is factual nạp âm, can chi, tuổi mụ and a guide to full-chart calculation, not invented
annual fortune predictions. It states the lunar-year basis and the need to check births before Tết.
Article/BreadcrumbList/FAQPage JSON-LD is safely escaped; no invented Schema.org Horoscope type.
`sitemap.ts` lists valid public pages, and `robots.ts` excludes future personal/API paths.

`next/og` generates a real 1200×630 PNG with Vietnamese fonts for home and annual pages.
SVG ornaments avoid fetching emoji/CDN assets at build/runtime. Original pinned Fontsource WOFF
files are read server-side; preserve these dependencies in deployment output. Set the real
`SITE_URL` before production build. The default origin is local development only.

## Verification and remaining phases

See `../test/README.md` for actual command results and Lighthouse evidence. Playwright uses
system Chromium or `CHROMIUM_PATH`, starts its own production server and requires port 3000 free.
Restart a manually started server after rebuilding; an old server can reference stale JS chunk names.

Not implemented: expert school validation, arbitrary historical timezone/solar-time correction,
verified annual scoring, AI, auth/saved charts, HD image exports, database persistence, installable PWA
or deployment. The SQL model is still a proposal. None of these is simulated as a working feature.
