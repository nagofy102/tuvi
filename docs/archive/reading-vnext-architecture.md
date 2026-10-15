# HV-R01 — Reading UX vNext architecture and execution plan

Ngày: 14/10/2026. Trạng thái: **planned / approval required**. Đây là đặc tả
architecture draft, không xác nhận rằng API, AI, cache, embeddings hay Reading
Brief đang tồn tại.

HV-R02: canonical fields, invariants, career matrix and exclusive ownership are
in the active `dev/reading-brief-contract.md`. R01 type sketches and
ownership below are historical, superseded proposals. Samples require user
approval; no implementation/worktree assignment is authorized. R04 is a local
deterministic adapter first, not an approved API. No independently verified full
Nam chart exists in the current corpus.

HV-R02C adds Style A and a proposed controlled template registry at
the former controlled-claim registry. Sample A1 is a candidate,
not an approved personal claim. R04 owns the one future schema plus deterministic
template selector; R03 consumes that contract only after sample approval.

## Target topology

```text
Calculated Chart (existing, validated profile only)
  -> Verified Signals (deterministic facts and relations)
  -> Versioned Rule Matrix (approved rules only)
  -> Prioritization + deduplication (deterministic)
  -> Reading Brief v1 (JSON contract)
  -> MVP deterministic schema + evidence/claim validation
  -> [future, opt-in] LLM editorial writer
  -> [future] additional AI prose grounding / claim validator
  -> conclusion-first UI
```

The first four stages preserve calculated facts and sourced symbolic readings, not predictive truth. The UI must
render a valid Brief without an LLM. An LLM may only transform locked, approved
brief fields into Vietnamese prose; it may not calculate, retrieve unrestricted
sources, infer a star relationship, select a rule, or upgrade an evidence status.

## Existing modules and migration seam

- `src/domain/interpretation/calculate.ts` validates chart structure and creates
  `InterpretationReport`; retain its fail-closed `unavailable` behavior.
- `src/domain/interpretation/knowledge.ts` is the source/rule registry. Its
  `KnowledgeRule.status`, passage IDs and limitations are the seed of the matrix,
  but it lacks topic, conflict and priority fields.
- `src/domain/interpretation/claims.ts` preserves evidence origin and conditions;
  reuse its evidence model and never collapse two origin scopes into a score.
- `src/domain/interpretation/themes.ts` and `career-reading.ts` are current
  editorial synthesis. Move no rule merely for architecture cleanliness; wrap them
  behind a Brief adapter until BA has approved a replacement rule matrix.
- `src/components/horoscope/interpretation-panel.tsx` is the sole reading UI seam.
  It should consume a Brief view model, not call an LLM or expose rule internals in
  the primary view.

## Rule Matrix specification (R01 sketch, superseded)

One record is a versioned, source-bounded rule application specification. It is not
a numerical fate model. `editorialPriority` is only a deterministic ordering aid;
it must not be rendered as confidence or probability.

```ts
type RuleMatrixEntry = {
  id: string;
  version: string;
  status: 'text-reviewed' | 'editorial' | 'disputed' | 'deferred';
  topics: Array<'career' | 'finance' | 'relationship' | 'overview'>;
  profileScope: { chartProfile: string; knowledgeProfile: string };
  requiredSignals: SignalPredicate[];
  excludedSignals: SignalPredicate[];
  conflictKeys: string[];
  editorialPriority: 'primary' | 'secondary' | 'supporting';
  deduplicationKey: string;
  allowedClaimIds: string[];
  forbiddenClaimKinds: Array<'prediction' | 'percentage' | 'health' | 'legal' | 'financial-advice'>;
  passageIds: string[];
  sourceLimitations: string[];
};
```

`SignalPredicate` must refer only to facts calculated from the chart: palace,
star identity, actual relation, applicable profile, or explicit missing data. It
cannot encode a newly invented Tử Vi relationship. A rule with `disputed` or
`deferred` status never yields an insight. A matching exclusion suppresses its own
entry; it does not manufacture an adverse conclusion. A conflict may be emitted
only when both reviewed sides and the resolution rule are present; otherwise emit
an insufficient-evidence state.

## Reading Brief v1 contract (R01 sketch, superseded)

This transport contract is frontend/backend independent, PII-minimized, and
serializable. It deliberately contains stable IDs, not birth name/date/time.

```ts
type ReadingBriefV1 = {
  schemaVersion: 'reading-brief-v1';
  reading: {
    id: string; // random request/report ID; no encoded PII
    topic: 'overview' | 'career' | 'finance' | 'relationship';
    generatedAt: string; // ISO timestamp
    mode: 'deterministic' | 'editorial-pending';
  };
  provenance: {
    chartProfile: string;
    calculationVersion: string;
    knowledgeProfile: string;
    ruleMatrixVersion: string;
    sourceRegistryVersion: string;
  };
  validation: {
    status: 'ready' | 'insufficient-evidence' | 'unavailable';
    reasons: string[];
    checkedAt: string;
  };
  conclusion: BriefConclusion | null;
  insights: BriefInsight[]; // 0..3, unique deduplicationKey
  topicReading: BriefTopicReading | null;
  evidence: BriefEvidence[];
  exclusions: BriefExclusion[];
};

type BriefConclusion = {
  claimId: string;
  plainText: string;
  evidenceIds: string[];
  scope: 'editorial-symbolic';
};
type BriefInsight = {
  id: string;
  title: string;
  plainText: string;
  priority: 'primary' | 'secondary' | 'supporting';
  rankingReasons: Array<'topic-match' | 'approved-primary-rule' | 'distinct-evidence'>;
  evidenceIds: string[];
  exclusionIds: string[];
  nextStep: string | null;
};
type BriefTopicReading = {
  topic: 'career' | 'finance' | 'relationship';
  paragraphs: string[];
  nextStep: string | null;
  evidenceIds: string[];
  state: 'supported' | 'mixed' | 'insufficient';
};
type BriefEvidence = {
  id: string;
  signal: { palace: string; relation: string; stars: string[] };
  rule: { id: string; version: string; status: string };
  passageIds: string[];
  limitations: string[];
};
type BriefExclusion = { id: string; reason: string; relatedRuleId?: string };
```

Contract invariants: every visible conclusion/insight/topic paragraph has at least
one `evidenceId`; every evidence record has an existing approved rule and passage;
no more than three insights; duplicate `deduplicationKey` values cannot survive;
`ready` needs a conclusion plus evidence; and `mixed` is prohibited without an
approved conflict-resolution rule. Version changes invalidate any private cache.

## Future AI editorial and validation boundary

Input: the locked `ReadingBriefV1`, an approved style policy and output JSON schema.
Output: prose keyed by `claimId`/`insight.id`, with no new IDs, facts, sources,
predictions, scores or claim categories. The validator must reject rather than
silently repair output that introduces new named stars/palaces, an unlisted source,
forbidden content, more claims than the Brief, or omits required limits. On reject,
show deterministic Brief copy or an explicit unavailable state; never pretend the
AI response succeeded. Keep a human-readable evidence panel independent of model
output.

Before any provider call: separate consent; minimum derived signals only; no name or
exact birth input; server-only credential; no public URL/OG/cache; bounded timeout,
rate/cost limits and redacted logs. These gates remain unimplemented.

## Embeddings decision

Embeddings are not required for the MVP and cannot establish astrological truth.
Later they may retrieve **already approved, rights-cleared** passages, group similar
claims, or flag duplicate editorial text. Deterministic rule/passage IDs remain the
authority. Do not let cosine similarity select rules, resolve conflicts, or replace
the grounding validator. A vector database is explicitly out of scope until a
licensed corpus, retrieval evaluation set and privacy decision exist.

## Parallel implementation plan (R01 sketch, superseded ownership)

| Task                      | Owner / suggested model effort | Allowed ownership                                                                                    | Dependencies                                                                | Acceptance / checks                                                                                                                                   |
| ------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| HV-R02 BA / Domain & Data | BA, `gpt-6.1-sol`, high        | `design/reading-ux-vnext.md`, new `dev/reading-brief-contract.md`, new matrix spec/fixtures metadata | User approval of scope; no code dependency                                  | Contract invariants, source/rule/exclusion vocabulary, acceptance examples for supported/insufficient/mixed; no invented rule.                        |
| HV-R03 DEV / UI           | DEV, `gpt-6.1-sol`, high       | `src/components/horoscope/interpretation-panel.*`, targeted UI tests/CSS                             | Brief v1 frozen; can begin with explicitly labelled mock adapter            | Conclusion-first screen, max 3 insights, topic control, evidence disclosure, 320px/large text/keyboard/reduced motion; `typecheck`, UI unit/E2E, axe. |
| HV-R04 DEV / Backend & AI | DEV, `gpt-6.1-sol`, xhigh      | New server/domain modules and route only; no ownership of UI or chart engine                         | R02 contract; separate user approval before LLM/provider, persistence/cache | Deterministic signal→matrix→brief tests first. AI phase additionally needs consent, schema, grounding failure fallback, no-PII/network/cache proof.   |
| HV-R05 QA                 | QA, `gpt-6.1-sol`, high        | `test/reading-vnext-test-plan.md`, test files only                                                   | R02 for contract tests; R03/R04 features for integration                    | Schema/provenance/mutation/grounding/privacy/accessibility/regression evidence; no claim of domain validation.                                        |

R02 must finish first because it owns the shared contract and acceptance semantics.
After it is frozen, R03 and the deterministic slice of R04 may run in parallel in
isolated worktrees with non-overlapping files. HV-R05 may author fixtures/checklists
in parallel after R02, but runs final integration only after R03/R04. The AI slice
of R04 must wait for explicit product/privacy/provider approval; it is not a
dependency of the conclusion-first deterministic MVP.

## Risks and efficiency controls

- **Domain:** current corpus is partial and no independent expert validation exists.
  Gate rules, retain insufficient states, and do not convert coverage into certainty.
- **UX:** confident prose can overclaim. Keep plain language in the primary view and
  technical facts in disclosure, with a blocked-phrase validator.
- **Privacy:** personal reports cannot enter shared caches or public routes.
- **Performance/cost:** generate once per explicit action; deterministic Brief first;
  cache only a consented private artifact keyed by version if later approved.
- **Tokens:** pass compact structured Brief + selected passage snippets to the writer,
  not a whole chart/corpus; use deterministic validation/retries; cap one writer pass
  and one repair pass; evaluate offline against a held-out, approved suite.

## Next action

HV-R02 direction is approved. Review the canonical contract and samples, obtain
user sample approval and explicit implementation authorization, then PM assigns
branches/worktrees and schema-first integration. R03/R04 remain blocked.
