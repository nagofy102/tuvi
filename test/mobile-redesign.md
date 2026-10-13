# Mobile-first UI acceptance evidence

Date: 13/10/2026 (Asia/Saigon). Base commit `8da6ed0`, uncommitted UI refinement.
Environment: Node 24 / Next 16.4 / system Chromium. No engine or knowledge changes.

## Executed checks

| Check                                      | Actual result                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------------- |
| `npm test`                                 | 166/166 unit tests, 11 files                                                           |
| `npm run typecheck`                        | Pass                                                                                   |
| `npm run build`                            | Pass, engine reproducibility check and 35 prerendered resources                        |
| `npm run test:e2e`                         | Final production build: 22/22, 45.4s                                                   |
| `npm run format:check`, `git diff --check` | Pass                                                                                   |
| `npm run audit:reference`                  | 24/24 partial fixtures, 146 fields, 0 mismatches/unavailable; 0 complete golden charts |

Two additional E2E cases cover:

- 390×844: first name input begins within the initial viewport; reading/12-palace/
  local-profile links work. Palace link opens full-chart details; Phu Thê selection
  changes the aside, focuses it and brings it into the viewport. All actual stars
  are available on demand; symbolic glossary opens. Consent remains unchecked.
- 320×800/extra-large text: twelve selectable palace buttons, keyboard Enter,
  matching pressed state/aside, all twelve palaces preserved, no document horizontal
  overflow; all chooser button heights >=48px; axe WCAG A/AA has no detected violations.

Existing regressions still cover engine/date conversion, unknown time, invalid/future
input, consented persistence/restoration/deletion, storage errors, no personal POST,
thematic selection not changing the chart, source evidence, star dialog centering,
Escape/focus return, public metadata/404/sitemap/OG. The existing enhanced text-contrast
test passes with reading details open. Automated axe is not full accessibility certification.

Screenshots (ignored generated evidence, not product assets):

- `test-results/redesign-mobile-first-screen.png`
- `test-results/redesign-mobile-reading.png`
- `test-results/redesign-mobile-palace.png`
- `test-results/redesign-mobile-large-text.png`
- Existing desktop/result/chart screenshots are refreshed by the regression suite.

## Lighthouse — final production UI

Two fresh default mobile-emulated runs on localhost port 3001, Lighthouse 13.5 with
system Chromium, headless/no-sandbox, default simulated network/CPU throttling.
Owned measurement server was stopped afterward. Report paths `/tmp/tuvi-redesign-lighthouse-{1,2}.json`.

| Run (Vietnam time)  | Performance | Accessibility | SEO | FCP    | LCP    | TBT     | CLS |
| ------------------- | ----------- | ------------- | --- | ------ | ------ | ------- | --- |
| 13/10/2026 21:19:12 | 91          | 100           | 100 | 1.070s | 3.347s | 108ms   | 0   |
| 13/10/2026 21:19:23 | 91          | 100           | 100 | 1.063s | 3.344s | 118.5ms | 0   |

These two local samples exceed the score target, **not** proof of stable >90 on real
devices/deployed infrastructure. LCP remains above the 2.5s good threshold and is
an explicit performance follow-up. No field Core Web Vitals or Search Console data.
Do not claim a measured 30-second retention lift or verified <1s calculation across
devices from these audits. No real-person experiment or paid competitor report review.

## Scope and remaining gates

Knowledge depth remains unchanged: two active auxiliary pairs, bounded contextual
readings, no annual/decade forecast/Phi Hóa/formation recognition. Source traceability
and partial engine checks do not validate predictions. Expand independently sourced
fixtures and rule conditions before new personal claims; see
`../design/competitor-mobile-review.md`.

No new SEO route, public deployment, analytics, live AI, account/cloud storage or
personal share payload. User/device/Safari review, actual retention measurement,
public crawl/content-quality and LCP work remain open. No test is disabled or oracle
replaced with engine output in this task.
