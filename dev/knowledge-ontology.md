# HV-K03B — File-based knowledge ontology prototype

## Current knowledge state

The ontology remains a file-based prototype. Methodology/orchestration rules are
not substantive interpretation rules and cannot directly create a personalized
claim. Existing structural mocks, candidate rules and methodology candidates stay
at their original status. No K04B reasoning expansion is authorized until lawful,
profile-scoped, independently traceable substantive evidence supports it.

Required trace for any future candidate is source locator and lawful retained
text, school/profile, inputs and eligibility, relation, permitted conclusion,
exceptions/conflicts, provenance and planned test cases. AI/BA interpretation is
labelled separately from source-described content; absence of evidence is a
knowledge gap, not a rule.

Status: **structural prototype; ontology review required**. This document defines a
technology-neutral contract. It does not admit a Tử Vi rule, choose a graph database,
or authorize any example for production use.

## Boundary and dependency

The ontology keeps three layers separate:

1. `chartFacts`: immutable observations produced for one chart by a named calculation
   profile and engine version. A chart fact is not an interpretation rule.
2. `domainRules` and `knowledgeEdges`: sourced domain statements, predicates,
   exceptions and disputes. They cannot be activated unless their passages and rule
   profile resolve and their lifecycle state permits implementation.
3. `inferenceTraces`: replayable records of candidates, predicate results, rejected
   rules, conflicts and the final allow/fail-closed decision. A trace never creates
   new facts or knowledge.

K03A has not supplied an integrated, reviewed rule artifact at this baseline.
Therefore all records in `knowledge-ontology-examples.json` use
`dataOrigin: structural-mock`, `productionEligible: false`, and deliberately generic
mock identities. Its `exampleGraphs` index exposes three separate views: chart-fact
shape, domain-knowledge shape and fail-closed inference-trace shape. They demonstrate
graph structure only.

## Identity, revision and provenance

- IDs are stable, lowercase namespaced strings. Revisions create a new
  `ontologyVersion`, rule `version`, or source/passage revision reference; they do not
  silently mutate a prior evaluation.
- A chart fact records `calculationProfile`, calendar/engine versions and verification
  status. `structurally-valid` is not independently verified.
- A rule records `ruleProfileRefs`, exact passage references, lifecycle status,
  conditions, exclusions, exceptions and counter-evidence predicates.
- A passage reference is a compound `{ sourceId, passageId, sourceRevision }`. All
  three values must resolve against an admitted registry snapshot before the rule can
  move beyond a research artifact.
- `source-backed` means traceable to a source, not independently verified. A rule may
  be production-eligible only after a separate approval event; this prototype does
  not contain such an event.

JSON Schema rejects unknown fields and constrains edge endpoint kinds. Referential,
revision and lifecycle checks require a deterministic semantic validator because
JSON Schema cannot prove that an arbitrary ID occurs exactly once in another array.
Required semantic error codes are defined below and exercised by the test cases.

## Nodes and relations

### Entity nodes

`entities` contains typed identities such as `Palace`, `Star`, `Topic`,
`CalculationProfile`, `RuleProfile`, `Source` and `Passage`. Domain identities do not
assert that a relation exists.

### Chart facts

Allowed initial fact kinds are `star-location`, `body-location`,
`transformation-location`, `palace-relation` and `attribute`. Each fact has a
subject/object typed reference, provenance and verification state. Relations such as
`LOCATED_IN`, `BODY_ATTACHED_TO`, `TRANSFORMS_TO`, `OPPOSES`, `TRINES_WITH` and
`SAME_AXIS_AS` remain chart facts under an exact calculation profile; they do not
imply a reading.

### Domain knowledge

Rules contain structured predicates rather than prose-only conclusions. Every rule
declares one of two kinds: `substantive-interpretation` describes a sourced
interpretive conclusion and must declare at least one permitted claim kind;
`methodology-orchestration` only orders, gates or defers evaluation and must declare
an empty `allowedClaimKinds` array and `productionEligible=false`. A methodology rule
cannot directly, or through a later status change, emit a personalized claim.
Knowledge edges may express `REQUIRES`, `EXCLUDES`, `MODIFIES`, `CONFLICTS_WITH`,
`SUPPORTS_CLAIM_KIND`, `SOURCED_BY` and `APPLIES_UNDER_PROFILE`. No numeric weight or
probability field exists. A `CONFLICTS_WITH` edge records disagreement; it does not
resolve it.

### Inference trace

Each trace pins the input fact IDs and candidate rule versions. Predicate results are
`matched`, `not-matched`, `missing` or `not-evaluated`. Conflicts are explicit.
Allowed outcomes are:

- `claim-allowed`: only when all required evidence resolves, the selected rule is
  approved for implementation, profiles match, and no unresolved conflict remains;
- `insufficient-evidence`: required facts or passages are missing;
- `unresolved-conflict`: contradictory applicable rules lack a sourced resolver;
- `unsupported-profile`: calculation/rule profiles are incompatible;
- `blocked`: rights, status, revision or approval gate blocks use.

All outcomes except `claim-allowed` must have no `allowedClaimIds`. Unknown or
partially evaluated conditions fail closed.

## Semantic validation contract

After JSON Schema validation, a validator must apply these checks in order:

| Code                             | Required check                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `DUPLICATE_ID`                   | IDs are unique within and across node namespaces where a reference is ambiguous.                            |
| `DANGLING_REFERENCE`             | Every entity, fact, rule, passage, edge and trace reference resolves.                                       |
| `EDGE_ENDPOINT_KIND_MISMATCH`    | Relation endpoints match the relation matrix encoded by the schema.                                         |
| `REVISION_NOT_RESOLVED`          | Rule/passages/source revisions resolve in the selected registry snapshot.                                   |
| `PROFILE_MISMATCH`               | Chart calculation profile is allowed by every selected rule profile.                                        |
| `UNADMITTED_RULE`                | A rule not `approved-for-implementation` cannot allow a claim.                                              |
| `METHODOLOGY_RULE_CANNOT_ALLOW_CLAIM` | A methodology/orchestration rule has an empty claim surface and cannot be promoted to one.               |
| `STRUCTURAL_MOCK_PRODUCTION_USE` | Structural mock data can never be production eligible or allow claims.                                      |
| `MISSING_REQUIRED_EVIDENCE`      | Every selected rule has resolvable passage evidence.                                                        |
| `UNRESOLVED_CONFLICT`            | Applicable conflicting rules without a sourced resolver fail closed.                                        |
| `INVALID_FAIL_CLOSED_OUTCOME`    | Non-allowed outcome contains an allowed claim, or allowed outcome contains unresolved predicates/conflicts. |

Validation order is important: structural validity must not be reported as domain
approval. A consumer may store rejected traces for audit, but must not render a
personalized conclusion from them.

## Competency questions

| Question                                       | Resolution path                                                                                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Which palace contains a star in this chart?    | Filter `chartFacts` by chart, `factType=star-location`, star subject and `LOCATED_IN`; read the palace object and calculation provenance. |
| Which tam phương/tứ chính relation is present? | Read a profile-pinned `palace-relation` fact. The relation alone does not activate a reading rule.                                        |
| Which rule applies under which profile?        | Resolve the rule's `ruleProfileRefs`, evaluate every predicate against input facts, then verify passage revisions and lifecycle state.    |
| Which passage supports a rule?                 | Follow `evidenceRefs` or `SOURCED_BY` to the exact source/passage/revision tuple.                                                         |
| Which rules conflict?                          | Follow `CONFLICTS_WITH`, then inspect profile overlap and the trace's conflict set.                                                       |
| Why was a claim permitted or rejected?         | Replay `inferenceTraces`: candidates, predicate outcomes, evidence checks, conflicts, rejections and final outcome.                       |

## Mapping from current contracts

| Current artifact                       | Ontology mapping                                        | Constraint                                                                                |
| -------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `ChartResult` / private `SignalSet`    | `chartFacts` plus calculation provenance                | Preserve exact palace/star location; never promote a UI grouping to a chart relation.     |
| Source Registry `sources` / `passages` | `Source`/`Passage` entities and compound evidence refs  | K01C remains authoritative; ontology stores references, not copied source text.           |
| Candidate rule records from K03A       | `domainRules` and knowledge edges                       | Import only after schema/profile/locator review; candidate status remains non-production. |
| ReadingBrief evidence                  | selected fact/rule/passage refs from an inference trace | `claimId` is allowed only after grounding and conflict checks.                            |
| ReadingBrief validation state          | inference outcome and validation issue codes            | `insufficient-evidence` and blocked states remain explicit and non-fabricated.            |

No migration is implemented in K03B.

## Storage evaluation criteria

| Option               | Strength                                              | Risk / gate                                                                                              |
| -------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Versioned JSON files | Reviewable diffs, deterministic fixtures, simple CI   | Semantic validator and indexing needed as volume grows. Recommended prototype format.                    |
| Relational tables    | Strong constraints and transactional revisions        | Recursive graph queries and immutable snapshots need careful design. Evaluate after query corpus exists. |
| Property graph       | Natural traversal and trace exploration               | Vendor operations, constraint/version semantics and test portability must be benchmarked first.          |
| RDF/SHACL            | Explicit semantics and reusable validation vocabulary | Higher modeling/tooling cost; identity and closed-world fail-closed behavior need proof.                 |

A vendor decision requires a representative admitted corpus, query benchmark,
revision replay test, referential-integrity test and operating-cost comparison. None
exists yet.

## Integration gate and blockers

K03B can be accepted as a schema prototype after schema, semantic case and formatting
checks pass. It cannot be used for production knowledge until K03A supplies reviewed
passage/rule records, the Source Registry revisions resolve, and Product Owner approves
the relevant rule slice. Numeric weights, inferred school equivalence and automatic
conflict resolution remain prohibited.

Stop state: **ONTOLOGY REVIEW REQUIRED**.
