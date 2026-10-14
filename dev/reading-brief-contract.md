# HV-R02 — Reading Brief v1 specification

## Authority and scope

2026-10-14; baseline `17ac24329b7b8657353450e97a8c51134ed9aaa3`.
Specification only, prepared with BA/Tử Vi specialist AI review. No independent
practitioner certification. Product direction is approved; sample quality and
implementation remain unapproved. This document supersedes the R01 proposed Brief
and matrix definitions, not the existing `InterpretationReport` runtime contract.
Do not rename or mutate that runtime contract during adaptation.

MVP: local deterministic Công việc only. Other topic values are reserved and
return unavailable (`topic-not-admitted`); no cross-topic top-three, API, AI,
embeddings, storage or model selection is authorized by this specification.

## Transport contract

The following TypeScript is documentation, not an implemented schema. All fields
are required unless marked `?`; arrays must be present, never null. Unknown keys
are rejected. Non-null strings must be nonempty after trim. All IDs are opaque
strings; rule/passage/source IDs must resolve, not merely satisfy string shape.

```ts
type Topic = 'overview' | 'career' | 'finance' | 'relationship';
type Status = 'ready' | 'insufficient-evidence' | 'unavailable';
type Origin = 'user-chart' | 'demonstration' | 'structural-mock';
type Verification =
  'structure-validated' | 'independently-verified' | 'unverified' | 'not-applicable';
type Reason =
  | 'unsupported-profile'
  | 'invalid-chart'
  | 'incomplete-catalog'
  | 'unknown-birth-time'
  | 'topic-not-admitted'
  | 'missing-source'
  | 'unreviewed-rule'
  | 'insufficient-context'
  | 'unresolved-conflict'
  | 'mock-only';
type Claim = {
  claimId: string;
  plainText: string;
  evidenceIds: string[];
  scope: 'editorial-symbolic';
};
type Insight = Claim & {
  id: string;
  title: string;
  deduplicationKey: string;
  priority: 'primary' | 'secondary' | 'supporting';
  rankingReasons: Array<'topic-match' | 'approved-primary-rule' | 'distinct-evidence'>;
  exclusionIds: string[];
  nextStep?: string;
};
type SourceRevision = {
  repositoryCommit: string;
  catalogPath: 'src/domain/interpretation/catalog.ts';
  passagesPath: 'src/domain/interpretation/knowledge.ts';
  sources: Array<{ sourceId: string; revision: string; url: string }>;
};
type Evidence = {
  id: string;
  signalIds: string[];
  rule: { id: string; version: string; status: 'text-reviewed' | 'editorial' };
  passageIds: string[];
  sourceIds: string[];
  origin: 'chart-backed' | 'structural-mock';
  explanation: string;
  limitations: string[];
};
type ReadingBriefV1 = {
  schemaVersion: 'reading-brief-v1';
  readingId: string;
  topic: Topic;
  status: Status;
  dataOrigin: Origin;
  verificationStatus: Verification;
  calculationProfile: string | null;
  calendarRuleVersion: string | null;
  engineVersion: string | null;
  ruleSetVersion: string;
  sourceRevision: SourceRevision;
  conclusion: Claim | null;
  insights: Insight[];
  topicReading: null | {
    topic: 'career' | 'finance' | 'relationship';
    state: 'supported';
    paragraphs: Claim[];
    nextStep?: string;
  };
  evidence: Evidence[];
  exclusions: Array<{ id: string; reason: Reason; relatedRuleId?: string }>;
  validation: {
    reasons: Reason[];
    message: string | null;
    schema: 'not-run' | 'passed';
    grounding: 'not-run' | 'passed' | 'demonstration-only';
    contradictionReview: 'not-evaluated-domain-gap';
    independentVerificationRef: string | null;
  };
};
```

`readingId` is the explicit transport equivalent of R01's proposed `reading.id`;
`topic/status` move to the root to avoid competing truth locations. R01 was never
implemented. Retain existing runtime `status`, `profile`, `knowledgeProfile`,
`version`, and evidence `scopePalace/palace/branch/relation/stars` in the adapter
input. `calculationProfile` maps chart profile, not report version. `calendarRuleVersion`
maps chart version.calendar; `engineVersion` maps version.engine. `ruleSetVersion`
identifies knowledge profile plus immutable repository revision, not a made-up
historical per-rule version. Report `reference-reading-v7` remains an input adapter
compatibility check, not a replacement engine or calendar version.

Generated timestamps are omitted: not needed for local MVP, avoid unnecessary
identifying metadata. Reading IDs are random, memory-only and regenerated per
explicit calculation; never deterministic hashes of name/birth/chart. IDs do not
make a reading anonymous: linking an ID to a chart makes it personal data.

## Invariants and failure behavior

1. Every substantive sentence belongs to a stable semantic `claimId`, scoped to
   topic/role/symbol set. IDs do not contain birth input. Each paragraph is one
   coherent claim; split independent assertions into separate paragraph claims.
   Reusing a claim across conclusion/insight/paragraph requires identical text,
   scope and evidence. A different formulation receives a different ID with the
   same semantic deduplication identity. A title cannot add an ungrounded claim.
2. Each Claim requires at least one resolvable evidence ID. Evidence carries
   required dictionary premises AND the editorial connecting rule; a symbol-only
   citation does not license a personal interpretation. Every rule and all its
   required passages must resolve at the pinned revision and allowed status.
   Each source ID must be the actual sourceId of a cited passage. Preserve precise
   input evidence origin; never relocate a star or call thematic Nô selection a trine.
3. `insights.length` is 0–3, keys unique. Do not split one idea into three by naming
   separate stars. Priority orders content, never probability/fortune/confidence.
4. `nextStep` is absent when not warranted; null and empty string are invalid.
   Advice is not evidence and must not contain a new factual/predictive claim.
5. Status combinations:

   | status                | conclusion | insights | topicReading             | evidence                             |
   | --------------------- | ---------- | -------- | ------------------------ | ------------------------------------ |
   | ready                 | non-null   | 1–3      | supported, >=1 paragraph | nonempty, all claims resolve         |
   | insufficient-evidence | null       | []       | null                     | [] or valid diagnostic evidence only |
   | unavailable           | null       | []       | null                     | []                                   |

   Zero-insight results use insufficient or unavailable, never a filler conclusion.
   Ready requires reasons=[] and message=null for user-chart. Demo/mock allows
   reasons=[mock-only] and requires a visible nonempty label in message.
   Non-ready requires >=1 reason and a plain-language message (not a
   substantive astrology claim). An unsupported topic/profile is unavailable;
   valid chart with missing reading evidence is insufficient. No `mixed` output
   in v1: no admitted resolver exists. Suppress affected claims and retain only
   independently supported non-conflicting content; if no conclusion remains,
   return insufficient. Absence of a counter-rule is not proof of no opposition.

6. `user-chart` ready requires verificationStatus=structure-validated or
   independently-verified, schema=passed, grounding=passed, and chart-backed
   evidence with nonempty signalIds resolvable against the local SignalSet.
   Ready still means a supported symbolic reading, not a factual prediction.
   `independently-verified` additionally requires a real immutable independent
   review artifact scoped to matching full chart/profile/input; currently none
   exists, so the adapter must never emit this status now.
7. `demonstration` always verificationStatus=unverified; known illustrative chart
   facts may be chart-backed but not upgraded to independent verification. A
   documentation-only partial excerpt may use structural-mock evidence, null
   calculation metadata and demonstration-only grounding; never in production.
   `structural-mock` always not-applicable, grounding=demonstration-only; missing
   chart signals may only occur in structural mocks or the labelled partial-demo
   exception above. These origins are never production personal
   results. Show a persistent visible label before any copy and preserve it across
   topic changes, export and cached UI state. Never silently swap a mock for an
   unavailable user reading.
8. Ready chart-backed results require all calculation versions non-null and equal
   actual chart metadata. Structural mocks use null for all three, even when a
   target profile is known. Non-ready chart-backed results retain versions actually
   known; unknown ones null, not guessed. Source/rule revision remains required.
9. Only an actually run validator can set schema/grounding passed. Invalid payloads
   do not render partial prose: produce a separate unavailable error view, with
   no original text or personal values in logs. No silent repair/padding.

## Revision resolution

Existing values: `nam-phai-chinese-lunar-v1`,
`chinese-lunar-typescript-1.8.6-v1`, `iztro-2.6.2-nam-phai-v1`,
`huyenvi-nam-phai-source-bounded-v3`, `reference-reading-v7`.
Existing KnowledgeRule has NO per-rule version. Resolve `rule.version` as
`git:<full commit>:src/domain/interpretation/knowledge.ts#<ruleId>` and
ruleSetVersion as `<knowledgeProfile>@<full commit>` until separately authorized
versioned registry implementation. This labels repository identity, not new rule
approval. The baseline commit above actually exists.

`sourceRevision.repositoryCommit` pins catalog and passage text. Classical source
revisions: classical-stars-vol1 and classical-context-vol1 = `7913704`;
classical-layout-vol2 = `1963110`, with exact oldid URLs in the catalog.
Resolve each passage's heading/excerpt/reading at that commit and its source URL,
not mutable latest web text. Keep original paraphrase versus historical anchor
distinct. The separate `source-admission-2026-10-13-v1` registry governs partial
an-sao oracle admission; it is NOT proof of interpretation rule validation.
Source revisions identify a transcription, not authorship, independent edition or
empirical accuracy. No fresh source authenticity verification is claimed here.

## SignalSet and minimal career matrix

SignalSet is a private local adapter input, NOT the reader transport:
`{ calculationProfile, calendarRuleVersion, engineVersion, verificationStatus,
chartValidation: 'passed'|'failed', signals: Signal[] }`.
Signal = `{ id, scopePalace, palace, branch, relation, stars, kind }`, preserving
existing ReadingEvidence field names; kind is `principal-context`, `body-location`
or `admitted-auxiliary-context`. stars reuse name/brightness/transformation; branch
and scope must match actual chart. BranchIndex remains private geometry input.
No name/date/time, profession, gender stereotype or life event signal. Absence of
principal is an explicit actual structure fact, separate from unavailable source.
Unknown birth time does not supply an estimated signal set.

Matrix record: `{ ruleId, version, status, topic:'career', requiredSignals,
excludedSignals, passageIds, sourceIds, editorialPriority, deduplicationKey,
allowedClaimKinds, conflictResolution:null, limitations }`. Predicate vocabulary
is limited to actual palace/principal presence, exact relation, source admission,
distinct count and profile equality; no newly invented star relationship.

| Reused rule                          | Condition / source                                                                                                                                                 | Editorial use                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| symbol-1..14                         | text-reviewed; matching principal-* plus context-not-uniform                                                                                                       | dictionary premise only, never standalone personal insight                                                |
| career-cross-palace + palace-context | editorial; layout-palaces/context-not-uniform; >=2 of Quan/Mệnh/Nô with admitted principals; >=2 distinct symbols; ALL physically present Quan principals admitted | primary direct Quan focus, secondary distinct Mệnh/Nô comparison; no-direct Quan branch expressly limited |
| menh-than-context                    | actual Thân and Mệnh positions; context gates and source complete                                                                                                  | supporting; co-location counts once, no hậu vận claim                                                     |
| pair-support / pair-literacy         | existing evaluator's full pair and actual four-palace scope with admitted principal; required support-left/right or literacy-chang/qu plus context-not-uniform     | supporting only after main synthesis; absence is not adverse                                              |

All required passages must exist with nonempty heading/excerpt/reading and resolvable
source. Missing source, deferred/disputed status, unsupported profile, insufficient
distinct context or missing direct-Quan symbol suppress the corresponding rule.
No `pair-assistance`, formations, dignity weighting, Tứ Hóa reading, Phi Hóa or
forecast. `ziwei-support-context` stays in existing report but is not added to this
minimal Brief matrix; no parallel duplicate coordination insight.

Deduplication identity = topic + semantic claim kind + canonical original
palace/relation/symbol-set identities. Sort canonical IDs, not source display order.
Different rule IDs covering the SAME semantic point share one identity. Distinct
source IDs alone never create distinct insights. Select primary Quan synthesis,
then genuinely distinct role comparison, then an admitted modifier if nonduplicate;
tie-break stable semantic key lexical order, not a fate score. Never output an
auxiliary-only reading. No reviewed opposing-rule/resolver pair currently exists;
contradictionReview remains not-evaluated-domain-gap. Structural exclusions do not
manufacture adverse astrology interpretations.

## Privacy and future processing gates

Birth input/chart may be processed in memory locally; existing explicit-consent
profile storage is unchanged. Brief persistence is not introduced. Never put name,
birth date/time, chart/signal set, prose, evidence, IDs linked to profiles or input
hashes in analytics, logs, public URLs, OG, shared cache or crash payloads. Allow
only aggregate non-identifying operational errors, not raw Brief JSON.

Demo/mock routes and memory state are isolated from personal results and saved
profiles. UI failure clears stale personal prose. No production demo fallback.
Future server/cache/provider requires a separate approved purpose, consent,
minimum payload, access isolation, retention/deletion policy, region/provider,
security/rate/cost controls, revision invalidation and privacy tests. No server or
third-party request in MVP. An endpoint is not authorized just because JSON is
transport-compatible; R04 first means a pure deterministic adapter, not an API.

### Signal serialization clarification

Each signal also requires `principalPresence: 'present' | 'absent' | 'not-applicable'`
and `sourceAdmission: 'admitted' | 'unavailable' | 'not-applicable'`. A physically
present principal with unavailable source stays present. An actual no-principal
fact has kind `principal-context`, stars=[], presence=absent, admission=not-applicable;
never fabricate an empty star list when the chart actually contains unreviewed stars.
`geometry: { scopeBranchIndex: number; branchIndex: number }` is private SignalSet
metadata, integer 0..11, tied to original palace; required for trine/opposition
and checked modulo 12. It is not sent in Brief. Body co-location uses actual branch
indices, not matching prose labels. Unknown/missing positions fail chart validation.

Exact menh-than-context admission: status=editorial, passages layout-palaces and
context-not-uniform, source IDs classical-layout-vol2/classical-context-vol1;
career-cross-palace/palace-context synthesis gates must already pass. It never
becomes an independent personality claim.

## Shared boundary and implementation readiness

Evidence disclosure uses a read-only LOCAL SignalSet resolver keyed by signalIds
alongside the Brief; IDs alone do not transport palace facts. The resolver must
match the same calculation and source snapshot, never recalculate from prose.
Mocks show declared source explanations and a missing-signal notice.
Brief v1 is serializable but NOT a complete future backend-response contract:
any backend needs separately approved fact transport and access/privacy design.
No birth input is sent merely to resolve an ID.

PM owns contract approval and integration. R02 docs are the shared specification;
future runtime schema has ONE R04 owner and requires PM approval for changes.
R03 imports it read-only; no independent local schema fork. Proposed allocation
(not task assignment or worktree authorization):

| Task                      | Exclusive ownership                                                                                                                                       | Gate                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| R03 UI                    | src/components/horoscope/interpretation-panel.tsx and interpretation-panel.css; tests/unit/reading-brief-ui.test.tsx; tests/e2e/reading-brief-ui.spec.ts  | user sample approval; PM schema freeze; R04 schema artifact           |
| R04 deterministic adapter | future src/domain/interpretation/reading-brief.ts and reading-brief-schema.ts; tests/unit/reading-brief-adapter.test.ts                                   | user sample approval, PM contract approval; no API/engine changes     |
| R05 QA                    | test/reading-vnext-test-plan.md; tests/unit/reading-brief-contract.test.ts; tests/e2e/reading-brief-integration.spec.ts; tests/fixtures/reading-brief-v1/ | contract freeze for test authoring; integrated R03/R04 for acceptance |
| PM                        | shared docs/README/status; review existing shared test changes                                                                                            | integration QA acceptance before main push                            |

No ownership of generic 'test files' overlap. Any existing file outside these
paths requires explicit reassignment. Branch/worktree paths are deliberately
unassigned: no implementation approved. Before concurrency PM issues exact task
branches/worktrees/dependencies/checks/integration owner. R04 schema slice must
land before independent R03/R04 editing; R05 can review the frozen contract but
cannot declare runtime pass before implementation.

Gaps: no independently verified full Nam chart; no admitted contrary-resolution
rule; limited symbolic corpus; no empirical validation; no v1 schema/adapter or
runtime tests. Examples and editorial acceptance are in
[reading-brief-samples.md](../design/reading-brief-samples.md); QA specification in
[reading-vnext-test-plan.md](../test/reading-vnext-test-plan.md). R03/R04 BLOCKED
until the user approves samples and explicitly authorizes implementation.
