# Reference interpretation implementation

Current status: this file records the original v1 reading release below. The running
feature is now `reference-reading-v3` on chart profile v2, with thematic behavioral
reading and refreshed UI; see `ui-content-upgrade.md`. The preceding v2 knowledge,
two active auxiliary pairs and contextual why/evidence are recorded in
`knowledge-implementation.md` and `../test/knowledge-validation.md`. Old limitations
and measurements below are historical, not a claim that the newer groups are absent.

## Authorization and status

On 2026-10-13 the user authorized AI-assisted domain research and implementation of general
and detailed readings after chart calculation. No human expert participates. AI research,
software review and source transcription checks must not be presented as independent human
expert approval or scientific predictive validation. The broader premium/forecast roadmap
is not fulfilled by this bounded reference-reading release.

Implemented: deterministic, client-local `reference-reading-v1` for the existing
`iztro-default-vietnamese-lunar-v1` profile. No paid provider, inference API, chat service,
personal storage or knowledge database was installed. Do not label it live AI inference.

## Actual experience

- A general and detailed interpretation panel appears below a successfully calculated chart.
  The initial example reading opens only on request via “Đọc luận giải lá số minh họa”.
  The module is dynamically loaded without SSR of the reading, keeping the first landing load light.
- Summary exposes actual Mệnh and Thân positions, Cục, nạp âm, Mệnh chủ and Thân chủ.
- Twelve collapsible palace sections expose topic context, actual major stars, engine brightness
  and transformations, bounded symbolic themes, reflection prompts and references.
- Two trine palaces (+4/+8 branches) and the opposite palace (+6) are computed position facts.
  Stars there are not moved into the palace being read or treated as a sourced forecast rule.
- Missing, duplicate, incoherent or unknown-profile charts and incomplete source catalogs fail
  closed. Failed input hides the old interpretation; changing input alone does not create a new chart.
- Warnings identify unreviewed status, excluded techniques and classical/engine leap-policy differences.
  Both rejected Vietnamese calendar cases and unsuccessful chart inputs get no new interpretation.
- Content, inputs and result stay on the device. Clicking a source link navigates to that source;
  no birth information is placed in its URL. No automatic source/provider fetch occurs per reading.

## Modules

- `src/domain/interpretation/types.ts`: discriminated available/unavailable result and evidence contracts.
- `catalog.ts`: fourteen original Vietnamese star-theme paraphrases and resolvable source registry.
- `calculate.ts`: validated chart-to-reading transformation, direct/related placements and limitations.
- `src/domain/astrology/profile.ts`: shared profile constant without importing the heavy an-sao engine.
  `astrology/calculate.ts` re-exports it for compatibility; no placement/calendar algorithm changed.
- `src/components/horoscope/interpretation-panel.tsx` and `.css`: accessible, responsive, printable display.
- `src/components/landing-experience.tsx`: successful-result integration and stale-reading suppression.
  Its dynamic import loads the reading UI only after calculation or an explicit example-preview request.
- `/phuong-phap#luan-giai`: public source, method, rights and discrepancy explanation.

## Source boundaries

See `interpretation-sources.md` for passages actually read and bibliographic caveats.
Primary source: **紫微斗數全書**, Volume I revision 7913704, star question/answer sections;
Volume II revision 1963110, palace sequence and layout context. The source is a historical
text, not a contemporary accredited textbook. The transcription was not collated against
a print facsimile. Public-domain original text does not grant rights to modern translations.

Code source registry uses `classical-stars-vol1` for the fourteen themes;
`editorial-palace-context` identifies original modern prose;
`structure-reference` identifies code-derived geometry, not a classical predictive assertion.
Research-document IDs are bibliographic labels and do not replace these code IDs.

Modern symbolic themes and reflection questions are clearly separated from chart facts and
literal quotations. Historical discriminatory, death/illness/crime/fertility and deterministic
fortune claims are excluded, not softened into personal judgments.

The classical leap-month convention differs from both existing engine options. This work does
not certify or alter the current chart rules, remove raw-date guards or fix the 85 calendar inputs
identified in the prior audit. No expert-reviewed golden chart corpus was created.

## Verification — 2026-10-13

Later calendar remediation updates the supported chart profile to v2 and integrates
Vietnamese lunar data throughout chart construction. The paragraph above describes the
earlier interpretation-only delivery. See `calendar-remediation.md` for the subsequent
calendar fix and `../test/calendar-remediation.md` for verification. Reading themes and
unvalidated-reference status are unchanged.

Base revision `26b036b`, worktree includes earlier uncommitted audit changes and this feature.
Node 24.19.0; pinned dependencies unchanged.

- `npm run typecheck`: passed.
- `npm test`: 102/102 in five files, including 31 interpretation integrity tests.
- `npm run build`: passed, 35 prerendered routes/resources.
- `npm run test:e2e`: 10/10 Chromium tests on a fresh production server.
- E2E covers private calculation, example-to-personal transition, all 12 sections, keyboard
  interaction, reading refresh, source links, rejected leap dates and stale-reading suppression.
- Mobile 320px/large font test passed. Axe A/AA and enhanced AAA text contrast passed;
  enhanced contrast test opens every interpretation detail. Automated checks are not full
  manual screen-reader/device accessibility certification.
- Initial AAA test found 6.89:1 muted text contrast; new panel text color was darkened and the
  full suite rerun successfully. No acceptance threshold was lowered.
- Desktop interpretation screenshot was inspected visually; generated images are ignored test artifacts.
- Chromium print-media check rendered all 12 palace detail bodies even while their screen accordions
  were closed. This does not establish every browser/printer's pagination behavior.
- Pre-optimization standalone Lighthouse mobile measurement at 2026-10-13T08:19:32.516Z: Performance 93,
  Accessibility 100, SEO 100; FCP 1.1s, LCP 2.7s, TBT 190ms, CLS 0. Report:
  `/tmp/tuvi-interpretation-lighthouse-repeat.json`. An earlier run measured Performance 43
  while another Chromium print check was active; it was not discarded silently or described as
  a code fix. A third measurement returned Performance 72, so a single passing run was not
  accepted as proof of stable performance. The reading module was subsequently split from the
  initial landing load and the example made opt-in. Final measurements are recorded separately.
  Measurements vary and do not guarantee scores on a deployed site or all devices.
- Final split-loading build measured Performance 57 at 08:25:25 UTC and 88 at 08:28:27 UTC;
  Accessibility/SEO were 100 in both runs. The latter had FCP 1.1s, LCP 3.4s, TBT 210ms,
  CLS 0; reports are `/tmp/tuvi-interpretation-lighthouse-split.json` and
  `/tmp/tuvi-interpretation-lighthouse-split-repeat.json`. The initial document fell from
  about 133 KB to about 80 KB and contains no rendered reading panel until requested.
  The >90 Performance budget is NOT consistently met and remains an open release-quality gate;
  do not use the earlier isolated 93 to claim the final build passed this gate.

These checks validate software behavior, source integrity and bounded scope, not a person's
future, personality or every school's interpretation. The long calendar audit was not rerun:
only the profile constant was relocated, not any calendar/placement rules.

## Remaining work

1. Collate lawful facsimile/edition references and independently review interpretation quality.
2. Reconcile source/profile differences before adopting new placement rules or combinations.
3. Add individually sourced combination interpretations, supporting stars and period logic only
   after those rule dependencies are defined and tested; do not infer them from star-name lists.
4. Fix the known upstream calendar incompatibilities separately and rerun the existing audit.
5. External AI, provider terms/consent/spending caps, conversations and report persistence remain
   separate integrations. The current feature requires no API key.
6. Diagnose variable main-thread/LCP measurements on the final build and verify the performance
   budget on representative hardware. Functional completion is not production performance sign-off.
