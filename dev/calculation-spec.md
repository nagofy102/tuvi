# Calculation specification and verification boundary

## Authority and scope

This is the single active calculation specification. It records the implemented
profile and its verification limits; it is not a certification of calculation
accuracy or of Nam Phai interpretation. Runtime behaviour may change only through
a separately approved domain task with reviewed source clauses and regression
evidence.

The current runtime profile is `nam-phai-chinese-lunar-v1` with calendar rule
`chinese-lunar-typescript-1.8.6-v1` and engine
`iztro-2.6.2-nam-phai-v1`. It uses Chinese lunar conversion, the fixed
leap-month and late-Ty policies recorded in the profile, and the ordered Southern
Tứ Hóa mapping implemented at the cited revision. The legacy Vietnamese v2
profile remains isolated solely for its historical corpus and audit evidence; its
results must not certify or override the active profile.

## Non-negotiable verification boundary

- `1985-03-21` remains **unresolved**. The UTC+7/UTC+8 mismatch is reproducible,
  but no admitted profile clause or independent full-chart reference selects one
  output.
- GB/T 33661-2017 official metadata was verified in K02C; its full clauses were
  not lawfully accessed. Do not derive a fixture, profile decision, or Vietnamese
  calendar equivalence from metadata alone. Obtain lawful full text first; submit
  price/licence to PO before purchase.
- Chinese calendar handling is not automatically a Vietnamese-calendar standard.
  Conversion, timezone, leap-month placement, late-Ty treatment, an-cung/an-sao
  and Tứ Hóa each require independently traceable support.
- Observation vectors, partial corpora and competitor outputs are evidence with
  their original settings. They are neither golden fixtures nor an oracle. A
  complete independently published chart must pass the intake contract before it
  can be promoted; no automatic promotion exists.

## Evidence and admission model

`dev/source-registry.json` is the reviewed runtime admission registry;
`dev/knowledge-source-registry.json` is a distinct research registry. Their IDs,
rights/access state, profile boundaries and revision locators remain authoritative
machine data and must never be conflated. Fixtures under `test/` remain immutable
observation/golden evidence according to their current labels.

External comparison records preserve source URL, input, visible settings, actual
output, retrieval date, profile-compatibility assessment and any missing fields.
Engine output can never be its own expected answer. The published-chart intake
requires provenance and full-field coverage before a golden candidate is even
considered.

## Required gates

| Gate | Requirement | Current state |
| --- | --- | --- |
| Profile clause | Specialist-reviewed source clause for each behavioural policy | Partial; no accuracy certification |
| Calendar independence | Independent, lawfully accessible component evidence | Incomplete |
| Full chart comparison | Immutable external full chart with settings and provenance | Not admitted |
| Golden fixture | Complete fixture plus profile/field/trace review | None |
| Runtime change | PO-approved domain task, protected regression suite | Not authorized by HV-M01 |

Existing historical numeric audit scope (28,124 calendar-day tuples and 10,900
selected charts) covers the old remediation boundary only. It is useful regression
evidence, not Nam Phai validation.

## Consolidated provenance map

The following historical documents were consolidated in HV-M01. Their durable
facts are summarized above; their commit history retains full reproduction detail.

| Former document | Preserved subject |
| --- | --- |
| `calculation-implementation-survey.md` | OSS lineage, licence, site observations and independence limits |
| `calculation-k02-sandbox-report.md` | HKO/lasotuvi access and profile blockers |
| `calculation-k02b-disagreement-report.md` | 1985 timezone taxonomy and unresolved result |
| `calculation-k02c-verification-report.md` | GB/T metadata-only result and purchase gate |
| `calendar-remediation.md`, `test/calendar-remediation.md` | legacy seam, numeric regression scope and non-certification |
| `nam-phai-source-decision.md`, `nam-phai-migration-spec.md`, `nam-phai-implementation.md`, `test/nam-phai-migration.md` | implemented profile, source boundary, isolation and exact QA limits |
| `competitor-chart-intake.md`, `published-chart-intake.md` | external-observation and publication-admission contract |
| `test/calculation-reference-plan.md`, `test/calculation-k02b-reproduction.md` | golden-admission protocol and reproducible mismatch procedure |
| `chart-validation-plan.md` | expert review, release and change-management gates |

## Reproduction

Run `npm run engine:check`, `npm run audit:tech`, and the applicable source,
reference and competitor audits. These audits are fail-closed: a result is valid
only when every invariant and provenance step completes. In restricted runners
where Node cannot spawn `git`, report the run as blocked; do not suppress the Git
metadata check or infer PASS from partial output.
