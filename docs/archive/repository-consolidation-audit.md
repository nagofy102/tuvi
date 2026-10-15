# HV-M01 — Repository consolidation and code-quality audit

Status: **Phase A proposal — awaiting Product Owner approval**

Audit revision: `2627bfca0d25f44b3ba714cb235b6f6cc2ddee79` (`work`)

Scope: repository inventory, documentation consolidation proposal and behavior-preserving code-quality findings only. No Phase B/C cleanup or domain change is included.

## Executive summary

- The repository has 236 tracked files and 44,692 lines. It contains 90 Markdown files with 9,422 lines / 669,229 bytes: 3 at root, 19 in `design/`, 47 in `dev/`, 20 in `test/` and one vendor notice.
- The main maintenance cost is not missing documentation but competing status/history layers. `design/README.md`, `dev/README.md` and `test/README.md` mix navigation, current decisions and dated handoffs; the fixed session-start set is five documents before task-specific reading.
- The proposal classifies all 90 pre-audit Markdown files as 12 `KEEP`, 57 `MERGE`, 16 `ARCHIVE` and 5 `DELETE`. Phase A adds this one approval record. With one new canonical calculation specification and this report archived after execution, the target is 30 Markdown files: 13 active and 17 historical, a reduction of 60 files (66.7%) from the pre-audit baseline without deleting fixtures, schemas, IDs or source evidence.
- No broken relative Markdown link was found in 42 checked links. The strongest documentation defect is semantic: `test/README.md` still calls Reading UX vNext “chưa chạy/triển khai” while the same file and runtime record the implemented HV-R05 path.
- Code is healthy at the behavior baseline (321/321 unit and 31/31 E2E passed; webpack production build passed), but there are three unused-symbol diagnostics, one unreferenced animation module, two likely removable direct dependencies, large UI/CSS modules and duplicated legacy/current calendar-chart adapters. The last item is explicitly excluded from generic cleanup because it crosses protected Tử Vi behavior.

## Baseline inventory

| Area       | Files | Current role                                                     | Proposed handling                                         | Risk   |
| ---------- | ----: | ---------------------------------------------------------------- | --------------------------------------------------------- | ------ |
| Root       |    16 | Governance, package/config and entry documentation               | Keep governance/config; simplify navigation               | Medium |
| `.idea/`   |     8 | Personal IDE metadata, already ignored for new files             | Delete tracked copies after approval                      | Low    |
| `design/`  |    19 | Product specifications, plans and integrated reports             | Retain two active SSoTs; merge/archive the rest           | Medium |
| `dev/`     |    59 | Architecture, contracts, research, schemas and execution reports | Retain machine artifacts; consolidate Markdown by subject | High   |
| `test/`    |    31 | 20 Markdown evidence/plans and 11 JSON fixtures/cases            | Keep every JSON fixture; consolidate test documentation   | High   |
| `src/`     |    64 | Runtime application, domain code, fonts and generated engine     | Small scoped refactors only; protect domain behavior      | High   |
| `scripts/` |     9 | Engine build and reproducible audits                             | Keep; harden Git metadata acquisition separately          | Medium |
| `tests/`   |    29 | 18 unit, 9 E2E and 2 fixture files                               | Keep; no coverage reduction                               | High   |
| `public/`  |     1 | Site icon                                                        | Keep                                                      | Low    |

Non-Markdown artifacts are not candidates for bulk deletion. In particular, all JSON schemas, source registries, observation vectors, candidate-rule cases, chart fixtures, source/passages/rule IDs and the generated Vietnamese engine remain in place unless a later, separately reviewed migration preserves exact identity and validation behavior.

| Artifact group             | Inventory                                                                                                                            | Phase A decision                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Runtime source             | 64 files: 14 interpretation modules, 10 astrology, 4 calendar, 13 app routes/assets, 12 components, data/profile/SEO and font assets | Keep; only candidates in C-01–C-05 may enter an approved Phase C                                  |
| Development data/contracts | 11 JSON schema/example/passages/rules/registry artifacts plus proposed `schema.sql`                                                  | Keep; these carry IDs, provenance, prototype state or a dormant DB design                         |
| Test research fixtures     | 11 JSON observation/rule/ontology/source-status artifacts under `test/`                                                              | Keep byte-for-byte unless a separate reviewed migration is approved                               |
| Executable tests           | 18 unit files, 9 E2E files and 2 JSON fixtures under `tests/`                                                                        | Keep; no coverage reduction proposed                                                              |
| Scripts                    | 9 engine/audit/diff files                                                                                                            | Keep; harden metadata coupling in C-06 only after approval                                        |
| Generated/vendor           | `iztro-vietnam.cjs`, declaration and notice                                                                                          | Keep; generated output is checked by `engine:check`                                               |
| Dependencies               | 14 direct runtime and 9 development dependencies                                                                                     | Review only `framer-motion` and `@fontsource/cormorant-garamond`; keep pinned domain dependencies |
| Configuration              | Next, TypeScript, Vitest, Playwright, PostCSS, Prettier and environment example                                                      | Keep; extend checks without adding a framework by default                                         |

## Target active documentation

The proposed active set is intentionally small:

1. `AGENTS.md` — session bootstrap only.
2. `RULE_BASE.md` — canonical repository governance.
3. `README.md` — human entry point, current commands and navigation.
4. `design/product-spec.md` — product vision, boundaries and current roadmap.
5. `design/pm-milestone-status.md` — current accepted/blocked/planned state.
6. `dev/architecture.md` — implemented system architecture and module boundaries.
7. `dev/calculation-spec.md` — new consolidation target for profile, calendar, leap/Tý policy, unresolved disputes and verification limits.
8. `dev/knowledge-ontology.md` — Knowledge Base architecture, rule kinds and inference boundary.
9. `dev/source-registry.md` — authoritative admission/provenance contract and distinction between runtime/research registries.
10. `dev/reading-brief-contract.md` — ReadingBrief, interpretation and controlled-claim contract.
11. `dev/font-assets.md` — required asset provenance and reproduction instructions.
12. `test/README.md` — current testing strategy, commands, acceptance gates and latest baseline only.
13. `src/domain/astrology/vendor/NOTICE.md` — generated-engine licence/provenance notice.

After consolidation, only `AGENTS.md` and `RULE_BASE.md` should be unconditional session-start reads. `README.md`, the current milestone and one or two task-specific SSoTs are selected by scope. This reduces the fixed set from five files to two without hiding active constraints.

## Markdown inventory and proposal

`Current` means active and substantially accurate; `mixed` combines current material with history; `historical` is evidence rather than current instruction; `superseded` has a newer contract or implementation. `MERGE` means preserve the listed unique content in its target, repair references and then remove the source file. No merge/archive/delete occurs before PO approval.

| Path                                           | Role                                | State                 | Action  | Unique information / target and reference work                                                 | Risk   |
| ---------------------------------------------- | ----------------------------------- | --------------------- | ------- | ---------------------------------------------------------------------------------------------- | ------ |
| `AGENTS.md`                                    | Agent bootstrap                     | Current               | KEEP    | Remove unconditional folder-README reads only after new navigation exists                      | Medium |
| `README.md`                                    | Repository entry point              | Current               | KEEP    | Point to active SSoTs and exact commands                                                       | Low    |
| `RULE_BASE.md`                                 | Governance                          | Current               | KEEP    | Remains canonical; remove duplicated operational status elsewhere                              | High   |
| `design/README.md`                             | Design index + status               | Mixed                 | MERGE   | Current status to product/milestone; links to root navigation                                  | Medium |
| `design/career-reading-upgrade.md`             | Product requirement                 | Implemented           | MERGE   | Preserve five reading criteria in product/ReadingBrief contract                                | Medium |
| `design/chart-validation-plan.md`              | Calculation validation plan         | Mixed                 | MERGE   | Preserve expert gates and non-oracle constraints in calculation spec/test strategy             | High   |
| `design/competitor-mobile-review.md`           | Competitor/UI research              | Historical            | ARCHIVE | Preserve observed URLs, access limits and measured findings                                    | Low    |
| `design/interpretation-milestones.md`          | Reading milestone status            | Superseded            | MERGE   | Current limitations to milestone/ReadingBrief contract                                         | Medium |
| `design/knowledge-first-strategy.md`           | PO strategy/roadmap                 | Mixed                 | MERGE   | Preserve PO decisions, three-layer model and stop gates in product/milestone/ontology          | High   |
| `design/knowledge-k01-report.md`               | Integrated research report          | Historical            | ARCHIVE | Preserve K01 decision and evidence pointers                                                    | Low    |
| `design/knowledge-k02-k03-report.md`           | Integrated research report          | Historical            | ARCHIVE | Preserve zero-golden/rule status and checks                                                    | Low    |
| `design/knowledge-k02b-k04a-report.md`         | Integrated research report          | Historical            | ARCHIVE | Preserve unresolved 1985/K04A boundary                                                         | Low    |
| `design/nam-phai-transition.md`                | PO profile decision                 | Implemented           | MERGE   | Preserve approval scope and limits in calculation spec/milestone                               | High   |
| `design/pm-milestone-status.md`                | Current decision status             | Current               | KEEP    | Become sole accepted/blocked/planned status                                                    | High   |
| `design/product-spec.md`                       | Product specification               | Current               | KEEP    | Absorb current roadmap and behavior boundaries                                                 | Medium |
| `design/reading-brief-samples.md`              | Approved/rejected copy evidence     | Mixed                 | MERGE   | Preserve exact approved text, semantic key and rejection reasons in ReadingBrief contract      | High   |
| `design/reading-r07a-career-rule-expansion.md` | Deferred design                     | Historical            | ARCHIVE | Preserve candidate provenance and blocked branch; never promote status                         | Medium |
| `design/reading-r07b-copy-approval.md`         | Paused copy proposal                | Historical            | ARCHIVE | Preserve candidate text and PO pause                                                           | Medium |
| `design/reading-style-policy.md`               | Editorial policy                    | Current               | MERGE   | Preserve anti-Barnum and structure rules in ReadingBrief contract                              | High   |
| `design/reading-synthesis-plan.md`             | Implementation plan                 | Implemented/mixed     | MERGE   | Preserve admission and conflict gates in ontology/ReadingBrief contract                        | High   |
| `design/reading-ux-vnext.md`                   | Product/architecture audit          | Superseded            | ARCHIVE | Preserve R02 decisions; active behavior moves to product spec                                  | Low    |
| `design/retention-roadmap.md`                  | Proposed roadmap                    | Mixed                 | MERGE   | Preserve unimplemented status and metrics in product/milestone                                 | Medium |
| `dev/README.md`                                | Development index + status          | Mixed                 | MERGE   | Move current decisions to architecture/milestone; root README becomes index                    | Medium |
| `dev/ai-interpretation-research.md`            | AI/provider research                | Deferred              | ARCHIVE | Preserve provider/cost/privacy research; no implementation authority                           | Low    |
| `dev/architecture.md`                          | System architecture                 | Current/mixed         | KEEP    | Update planned-vs-implemented tree and module ownership                                        | Medium |
| `dev/calculation-implementation-survey.md`     | OSS/competitor research             | Evidence              | MERGE   | Preserve lineage, licence and locators in calculation spec                                     | High   |
| `dev/calculation-k02-sandbox-report.md`        | Sandbox findings                    | Historical evidence   | MERGE   | Preserve HKO/lasotuvi blockers and observation status                                          | High   |
| `dev/calculation-k02b-disagreement-report.md`  | 1985 disagreement                   | Active evidence       | MERGE   | Preserve exact timezone/mismatch taxonomy and unresolved status                                | High   |
| `dev/calculation-k02c-verification-report.md`  | Standard verification               | Active evidence       | MERGE   | Preserve official locators, metadata-only scope and purchase gate                              | High   |
| `dev/calendar-remediation.md`                  | Legacy implementation handoff       | Historical            | MERGE   | Preserve v2 audit scope; label legacy in calculation spec                                      | High   |
| `dev/career-reading-contract.md`               | Domain/editorial contract           | Current               | MERGE   | Preserve allowed knowledge and copy boundaries in ReadingBrief contract                        | High   |
| `dev/career-reading-implementation.md`         | Implementation handoff              | Historical            | MERGE   | Current module map to architecture; results to test strategy                                   | Medium |
| `dev/catalogue-verification.md`                | Bibliographic evidence              | Evidence              | MERGE   | Preserve every locator, rights/access result and identity blocker in source registry           | High   |
| `dev/competitor-chart-intake.md`               | External observation intake         | Evidence              | MERGE   | Preserve observation provenance/profile compatibility in calculation spec                      | High   |
| `dev/data-models.md`                           | Planned contracts/DB model          | Mixed                 | MERGE   | Implemented contracts to architecture; dormant persistence to `schema.sql` note                | Medium |
| `dev/font-assets.md`                           | Asset provenance                    | Current               | KEEP    | Required licences/rebuild process                                                              | Low    |
| `dev/implementation.md`                        | Steps 2–4 handoff                   | Superseded            | MERGE   | Current facts to architecture; historical results to Git/test archive                          | Medium |
| `dev/interpretation-implementation.md`         | Reading implementation handoff      | Mixed                 | MERGE   | Module boundaries to architecture; limits to ReadingBrief/test strategy                        | Medium |
| `dev/interpretation-sources.md`                | Interpretation source research      | Evidence              | MERGE   | Preserve source locators, rights and conflicts in source registry                              | High   |
| `dev/knowledge-enrichment-prompts.md`          | Old execution prompts               | Superseded            | DELETE  | Completed/superseded prompts; retain PO decisions and future gates in milestone/ontology first | Medium |
| `dev/knowledge-implementation.md`              | Knowledge implementation handoff    | Mixed                 | MERGE   | Current runtime facts to architecture/ontology                                                 | Medium |
| `dev/knowledge-k01-execution.md`               | Temporary ownership plan            | Superseded            | DELETE  | Commit history + integrated K01 report retain scope/checks                                     | Low    |
| `dev/knowledge-k02-k03-execution.md`           | Temporary ownership plan            | Superseded            | DELETE  | Preserve acceptance/stop gates in consolidated SSoTs first                                     | Low    |
| `dev/knowledge-k02b-k04a-execution.md`         | Temporary ownership plan            | Superseded            | DELETE  | Preserve no-claim/no-profile-change gates first                                                | Low    |
| `dev/knowledge-k02c-k03a3-execution.md`        | Temporary ownership plan            | Superseded            | DELETE  | Preserve approved research scope in milestone/evidence                                         | Low    |
| `dev/knowledge-k03a-career-report.md`          | Rule extraction evidence            | Historical evidence   | MERGE   | Preserve passage/rule IDs, locators and blocked claims in source registry/ontology             | High   |
| `dev/knowledge-k03a2-report.md`                | Method extraction evidence          | Historical evidence   | MERGE   | Preserve five passages/two method candidates/conflicts                                         | High   |
| `dev/knowledge-k03a3-yield-report.md`          | Zero-yield finding                  | Active evidence       | MERGE   | Preserve gap classification and lawful acquisition options                                     | High   |
| `dev/knowledge-k03a4-source-pilot.md`          | Source/rule pilot                   | Active evidence       | MERGE   | Preserve pinned revision, candidate ID and trace-only boundary                                 | High   |
| `dev/knowledge-k04a-rule-prototype.md`         | Prototype explanation               | Research prototype    | MERGE   | Preserve methodology-only semantics beside ontology/JSON prototype                             | High   |
| `dev/knowledge-ontology.md`                    | Knowledge contract                  | Current               | KEEP    | Absorb rule-kind, conflict and registry boundary; schemas stay untouched                       | High   |
| `dev/knowledge-source-inventory.md`            | Source inventory narrative          | Evidence              | MERGE   | Preserve every locator/access/licence state; JSON remains canonical data                       | High   |
| `dev/knowledge-source-registry.md`             | Research registry contract          | Current but parallel  | MERGE   | Explain relationship to reviewed runtime registry; retain JSON/schema unchanged                | High   |
| `dev/knowledge-source-review.md`               | Passage/source review               | Evidence              | MERGE   | Preserve quotations allowed to retain, locators and derivation limits                          | High   |
| `dev/mobile-redesign.md`                       | UI implementation handoff           | Historical            | MERGE   | Current boundaries to architecture/product; tests remain executable                            | Low    |
| `dev/nam-phai-implementation.md`               | Profile implementation              | Current/mixed         | MERGE   | Preserve exact engine/profile versions and legacy isolation in calculation spec                | High   |
| `dev/nam-phai-migration-spec.md`               | Calculation contract                | Current               | MERGE   | Primary input to new calculation spec; do not alter policy                                     | High   |
| `dev/nam-phai-source-decision.md`              | Source-backed profile decision      | Current               | MERGE   | Preserve sources, reviewed clauses and remaining gaps verbatim in calculation spec             | High   |
| `dev/pm-priorities.md`                         | Feature implementation handoff      | Historical            | MERGE   | Privacy/current behavior to product/architecture; results to test strategy                     | Medium |
| `dev/published-chart-intake.md`                | External fixture admission contract | Current               | MERGE   | Preserve complete/partial and no-promotion rules in calculation spec/source registry           | High   |
| `dev/reading-brief-contract.md`                | ReadingBrief contract               | Current               | KEEP    | Absorb approved copy/claim/editorial invariants                                                | High   |
| `dev/reading-claim-registry.md`                | Controlled claim specification      | Current               | MERGE   | Preserve template identity/status/provenance in ReadingBrief contract                          | High   |
| `dev/reading-synthesis.md`                     | Implementation handoff              | Historical            | MERGE   | Current semantics to ReadingBrief contract; checks to test strategy                            | Medium |
| `dev/reading-vnext-architecture.md`            | R01 plan                            | Explicitly superseded | ARCHIVE | Preserve design history; remove from active navigation                                         | Low    |
| `dev/source-corpus-intake.md`                  | Source/corpus evidence              | Evidence              | MERGE   | Preserve corpus counts, admission limits and mobile measurement                                | High   |
| `dev/source-crosscheck.md`                     | Facsimile/source evidence           | Evidence              | MERGE   | Preserve artifact hash/rights/edition conflict and unresolved fields                           | High   |
| `dev/source-registry.md`                       | Reviewed source contract            | Current               | KEEP    | Become single narrative entry; JSON and validator remain authoritative                         | High   |
| `dev/thematic-exercises.md`                    | Implementation handoff              | Historical            | MERGE   | Current behavior to product/ReadingBrief; test remains                                         | Low    |
| `dev/ui-content-upgrade.md`                    | UI/content handoff                  | Historical            | MERGE   | Current behavior to product/architecture; checks to test strategy                              | Low    |
| `src/domain/astrology/vendor/NOTICE.md`        | Licence/provenance                  | Current               | KEEP    | Must remain beside generated artifact                                                          | High   |
| `test/README.md`                               | Test plan + history                 | Mixed/contradictory   | KEEP    | Rewrite as current strategy/latest baseline; move dated handoffs to archive/Git                | High   |
| `test/calculation-k02b-reproduction.md`        | Reproduction evidence               | Evidence              | MERGE   | Preserve commands, JPL locator and mismatch output in calculation spec/test strategy           | High   |
| `test/calculation-reference-plan.md`           | Admission/test protocol             | Current               | MERGE   | Preserve exact profile/required-field/golden gates in test strategy                            | High   |
| `test/calendar-remediation.md`                 | Legacy QA report                    | Historical            | MERGE   | Preserve numeric baseline and non-certification boundary                                       | High   |
| `test/career-reading.md`                       | Acceptance evidence                 | Historical            | ARCHIVE | Preserve editorial samples and executed results                                                | Medium |
| `test/knowledge-first-validation.md`           | Validation framework                | Current               | MERGE   | Preserve separate calculation/interpretation scorecards in test strategy                       | High   |
| `test/knowledge-source-registry-test-plan.md`  | Registry acceptance plan            | Current               | MERGE   | Preserve mutation/gate cases in test strategy                                                  | High   |
| `test/knowledge-validation.md`                 | Milestone QA report                 | Historical/mixed      | MERGE   | Latest active limits to strategy; detailed result retained via Git/archive mapping             | High   |
| `test/mobile-redesign.md`                      | UI acceptance evidence              | Historical            | ARCHIVE | Preserve Lighthouse variability and executed checks                                            | Low    |
| `test/nam-phai-migration.md`                   | Profile QA evidence                 | Current/mixed         | MERGE   | Preserve exact assertions and limits in calculation/test SSoT                                  | High   |
| `test/pm-priorities.md`                        | Feature QA evidence                 | Historical            | ARCHIVE | Preserve consent/storage and viewport observations                                             | Medium |
| `test/reading-r06-coverage-report.md`          | Coverage baseline                   | Historical/orphan     | ARCHIVE | Preserve measured 1-of-24 coverage and prioritization                                          | Medium |
| `test/reading-style-a-review.md`               | Editorial acceptance                | Current/mixed         | MERGE   | Preserve rubric and exact approval scope in ReadingBrief/test strategy                         | High   |
| `test/reading-synthesis.md`                    | QA evidence                         | Historical            | ARCHIVE | Preserve conditional-reading checks and limits                                                 | Medium |
| `test/reading-vnext-test-plan.md`              | Test plan + handoffs                | Mixed                 | MERGE   | Current release gates to test strategy; historical R01/R02 handoffs removed                    | Medium |
| `test/source-corpus-intake.md`                 | Source/mobile evidence              | Historical            | MERGE   | Preserve corpus admission and repeat measurements in source/test SSoT                          | Medium |
| `test/source-registry.md`                      | Registry QA evidence                | Mixed                 | MERGE   | Preserve commands, artifact limits and not-rerun states                                        | High   |
| `test/tech-audit.md`                           | Legacy technical audit              | Evidence              | MERGE   | Preserve reproduction, counts and root causes in calculation/test SSoT                         | High   |
| `test/thematic-exercises.md`                   | Feature QA evidence                 | Historical            | ARCHIVE | Preserve rubric and executed checks                                                            | Low    |
| `test/ui-content-upgrade.md`                   | Feature QA evidence                 | Historical            | ARCHIVE | Preserve found/fixed issues and final limits                                                   | Low    |

### Required preservation before any source file removal

- Calculation: exact profile IDs, engine/calendar versions, leap/Tý/timezone policies, `1985-03-21` disagreement, GB/T locators/access status, non-golden labels and external observation settings.
- Knowledge: all Source/Artifact/Passage/Rule IDs, revision locators, quotations legally retained, rights/licence state, lineage/school uncertainty, candidate/blocked/source-backed/approved state and conflict/exception semantics.
- Reading: exact approved text, semantic/template IDs, fail-closed eligibility, prohibited claims, provenance and privacy boundaries.
- QA: commands actually run, environment/revision, numeric results, `NOT TESTED` states, known failures and scope disclaimers. JSON fixtures remain byte-for-byte unless separately reviewed.
- Deleted execution prompts/plans: only temporary branch/worktree ownership and completed prompts may disappear; any durable PO decision or stop gate must first be represented in an active SSoT.

## Documentation findings

| ID   | Severity | Evidence                                                                                                                                      | Consequence                                                              | Proposed response                                              |
| ---- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------- |
| D-01 | High     | `test/README.md` says Reading UX vNext is not implemented, then later records HV-R05 implementation and 31 E2E tests                          | A new session can follow a false current state                           | Rewrite test SSoT; retain old plan as history only             |
| D-02 | High     | Three folder READMEs expose multiple “latest/next action” sections from different milestones; current HV-M01 is absent                        | Stale work can be restarted despite newer PO direction                   | One current milestone document; no task history in READMEs     |
| D-03 | Medium   | Shingle comparison found 16.5% overlap between ReadingBrief samples/claim registry and 13.2% between R07A/R07B; K03 report pairs also overlap | Copy and status drift                                                    | Merge contract text once; archive decision evidence            |
| D-04 | High     | `source-registry.*` and `knowledge-source-registry.*` are both valid but represent different admission layers                                 | Cleanup could conflate research candidates with reviewed runtime sources | One narrative boundary; retain both machine registries and IDs |
| D-05 | Medium   | 57 Markdown files are implementation/research handoffs linked mainly through index files                                                      | Search results surface historical statements as instructions             | Archive evidence; merge only durable facts                     |
| D-06 | Low      | 42 relative Markdown links checked; zero broken                                                                                               | Link integrity is currently good                                         | Add deterministic link/reference check before Phase B moves    |

## Code-quality findings

| ID   | Severity | Evidence                                                                                                                                    | Recommendation                                                                                                                | Domain risk     |
| ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------- |
| C-01 | Medium   | Diagnostic `tsc --noUnusedLocals --noUnusedParameters` reports unused `BirthInput`, `STAR_PASSAGE_IDS` and `majorStars`                     | Remove the three unused symbols; then consider enabling the gate                                                              | Low             |
| C-02 | Medium   | `src/components/ui/motion-features.ts` has no inbound import; `framer-motion` is referenced only there                                      | Delete module and direct dependency after build/E2E regression                                                                | Low             |
| C-03 | Low      | `@fontsource/cormorant-garamond` has no code/config consumer; checked-in derivative WOFF2 + licence are used instead                        | Remove or move to an explicit asset-refresh toolchain; keep licence/provenance                                                | Low             |
| C-04 | Medium   | `globals.css` 2,592 lines; `interpretation-panel.tsx` 802; `landing-experience.tsx` 669; ReadingBrief schema 543                            | Split by existing product/domain boundaries in reviewable commits                                                             | Medium          |
| C-05 | High     | Current/legacy astrology adapters share 88 of 101 significant lines; calendar adapters share 48 of 73                                       | Do not deduplicate in generic cleanup. Characterize shared structural helpers in a separate approved domain task              | High            |
| C-06 | Medium   | `audit:sources`, `audit:reference`, `audit:competitors` fail after their checks when Node calls Git in this sandbox (`spawnSync git EPERM`) | Decouple invariant evaluation from provenance metadata or allow explicit verified revision injection; keep fail-closed output | Medium          |
| C-07 | Low      | Eight `.idea` files are tracked although `.gitignore` excludes `.idea`                                                                      | Remove tracked IDE metadata after approval                                                                                    | Low             |
| C-08 | Medium   | No lint script; normal typecheck does not enable unused checks; format scope excludes Markdown, fixture JSON and several configs            | Add deterministic no-unused, Markdown/reference and config formatting gates without a new framework if possible               | Low             |
| C-09 | Low      | `npm ls --depth=0` succeeds but local `node_modules` contains two extraneous optional packages; manifest/lock remain pinned                 | Treat as environment residue; `npm ci` is the reproducible baseline                                                           | None            |
| C-10 | Info     | Local profiles validate parsed storage and fail closed; no runtime network send of birth data was found; privacy E2E passed                 | Keep current privacy boundary and tests                                                                                       | High if changed |

No evidence-backed runtime performance regression was found in this audit. The large CSS/UI modules are maintainability findings, not a claim of user-visible slowness. The generated 6,428-line vendor engine is intentionally generated, licence-pinned and protected by `engine:check`; it is not a refactor target.

## Proposed change order

1. **Phase B0 — safety tooling, low risk:** add/check the documentation reference map and a manifest of files/actions; no content moves yet.
2. **Phase B1 — navigation/governance, medium risk:** make milestone status authoritative, trim the three folder READMEs, update `AGENTS.md` read set and create `calculation-spec.md`.
3. **Phase B2 — evidence consolidation, high review risk:** merge calculation/source/knowledge documents with ID/locator/status preservation; validate all JSON/schema/fixture references before source removal.
4. **Phase B3 — history cleanup, low-to-medium risk:** archive the 16 existing evidence reports and retain this audit as the seventeenth archive record, delete the five approved prompt/ownership files and tracked `.idea` metadata, then run link/search checks.
5. **Phase C1 — mechanical code cleanup, low risk:** remove three unused symbols, the dead animation module and approved unused dependencies; enable the corresponding check.
6. **Phase C2 — maintainability refactor, medium risk:** split UI components/CSS in small behavior-preserving commits with unit/E2E/build checks.
7. **Separate future task only:** any extraction across current/legacy calendar, an-sao, profile or interpretation modules. It requires dedicated domain regression scope and is not part of HV-M01 cleanup by default.

## Expected maintenance benefit and risks

| Measure                       |                           Baseline |       Proposed target | Expected benefit                                               |
| ----------------------------- | ---------------------------------: | --------------------: | -------------------------------------------------------------- |
| Markdown files                | 90 pre-audit (91 with this report) |                    30 | 66.7% fewer than baseline while retaining 17 evidence archives |
| Active Markdown               |           90 discoverable as peers |      13 authoritative | Search and onboarding point to current truth                   |
| Fixed session-start documents |                                  5 |                     2 | Less context loading; task docs selected by scope              |
| Tracked IDE files             |                                  8 |                     0 | No personal editor churn                                       |
| Direct dependencies           |                 14 runtime + 9 dev | Up to 2 fewer runtime | Smaller dependency surface; exact result verified in Phase C   |
| Unused-symbol diagnostics     |                                  3 |                     0 | Stronger compiler hygiene                                      |

The main risk is loss of traceability during the 57 merges, not deletion volume. The mitigation is to consolidate by subject, preserve exact identifiers/status/locators, update references atomically and compare pre/post inventories before removing sources. Archive moves also break Git path continuity for casual readers, so the merge commit must contain an explicit old-to-new map.

## Checks actually run in Phase A

| Check                                                        | Result                                                                                                                                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Git status/branch/remote/log                                 | PASS — clean `work`, `origin` unchanged, base `2627bfc`                                                                                                                |
| Markdown relative-link scan                                  | PASS — 90 files scanned, 42 relative links, 0 broken                                                                                                                   |
| `npm ls --depth=0`                                           | PASS — declared tree resolves; two local extraneous optional packages observed                                                                                         |
| `npm run typecheck`                                          | PASS                                                                                                                                                                   |
| `npm test`                                                   | PASS — 18 files, 321 tests                                                                                                                                             |
| `npm run engine:check`                                       | PASS                                                                                                                                                                   |
| `npm run format:check`                                       | PASS                                                                                                                                                                   |
| strict unused diagnostic                                     | FAIL (expected audit finding) — three diagnostics listed in C-01                                                                                                       |
| `npm run build`                                              | NOT PASSED — Turbopack worker cannot bind an internal port in this sandbox (`EPERM`)                                                                                   |
| `npx --no-install next build --webpack` after `engine:check` | PASS — 35 static/generated routes/resources                                                                                                                            |
| `npm run test:e2e` on the webpack build                      | PASS — 31/31 Chromium tests                                                                                                                                            |
| `npm run audit:sources`                                      | FAILED — invariant path reaches Git metadata and sandbox rejects Node child `git` with `EPERM`; no PASS claimed                                                        |
| `npm run audit:reference`                                    | FAILED — same Git metadata blocker; no PASS claimed                                                                                                                    |
| `npm run audit:competitors`                                  | FAILED — same Git metadata blocker; no PASS claimed                                                                                                                    |
| `npm run audit:tech`                                         | FAILED at Git metadata step (`spawnSync git EPERM`) after executing 28,124 calendar days and 10,900 chart runs with 0 reported chart failures; no overall PASS claimed |

There is no configured lint command, so lint is **NOT TESTED**. No dependency vulnerability scan was run; it would require a network-backed advisory result and is **NOT TESTED**.

## Product Owner decisions required

1. Approve or amend the 13-file active documentation target and the proposed reduction from the 90-file baseline to 30 Markdown files.
2. Approve keeping 17 historical reports, including this audit record, inside a non-authoritative archive. Alternative: rely on Git history after merging unique evidence, which would reduce total files further but makes audits less discoverable.
3. Approve deletion of the five superseded prompt/temporary ownership files and eight tracked `.idea` files after preservation checks.
4. Approve Phase C1 only (unused code/dependencies and deterministic checks), or also approve Phase C2 UI/CSS module splitting.
5. Confirm that duplicated legacy/current calendar-chart code remains excluded from HV-M01; recommended answer is **exclude and create a separate domain-protected task if needed**.
6. Decide whether audit scripts should accept externally verified Git metadata in restricted runners, or whether those commands are required to run only in an environment where Node may spawn Git.

**Stop gate:** do not begin Phase B or Phase C, do not change any Tử Vi rule/profile/status, and do not move/delete files until the Product Owner approves the inventory and scope.
