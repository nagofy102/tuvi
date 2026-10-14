# HV-R02C — Controlled claim template registry specification

Date 2026-10-14. Specification only. No runtime registry exists. Baseline source
snapshot: `7064dae4173d0e3c99ef6a600f8cf8920c666ac6`; the referenced
knowledge/catalog source text is unchanged from `17ac24329b7b8657353450e97a8c51134ed9aaa3`.
The repository snapshot identifies text, not independent specialist approval.

## Registry record

```ts
type ClaimTemplate = {
  templateId: string;
  templateVersion: string;
  topic: 'career';
  claimKind: 'symbolic-synthesis' | 'symbolic-explanation';
  requiredRuleIds: string[];
  requiredSignalPredicates: Array<
    | { kind: 'direct-principal'; palace: 'Quan Lộc' | 'Mệnh' | 'Nô Bộc'; star: string }
    | { kind: 'no-direct-principal'; palace: 'Mệnh' | 'Quan Lộc' }
    | { kind: 'career-synthesis-gate'; value: true }
  >;
  evidenceResolution: 'all-required-rules-and-passages-plus-matched-signals';
  allowedVariables: Array<{ name: string; type: 'literal-choice'; values: string[] }>;
  approvedText: string;
  deduplicationKey: string;
  approvalStatus: 'draft' | 'source-reviewed' | 'user-approved' | 'rejected' | 'retired';
  sourceRevision: {
    repositoryCommit: string;
    passageIds: string[];
    sourceIds: string[];
  };
  limitations: string[];
};
```

`templateVersion` is an immutable revision of the proposed template's wording
and conditions. `draft-1` denotes a new proposal, not a claim that a past
approved version existed. Approval is per exact `(templateId, templateVersion,
sourceRevision)` tuple. Changing text, variables, predicates, semantic identity
or source requires a new version and another review. An approval record must
include reviewer role, review date, evidence scope and the user-approved sample;
no such approval record exists for the Style A candidates yet.

The template registry is an output control, not a new astrology rule. A
`source-reviewed` template means BA verified traceability and scope; a personal
claim still requires an admitted connecting rule and actual chart signals. The
runtime accepts only `user-approved` templates for `dataOrigin=user-chart`, with
the exact chart profile and source revision pinned. Demo/mock may show draft text
under persistent labeling. `rejected` and `retired` never render as personal copy.

## Candidate A1 templates — not approved for runtime

The following two templates express **one** semantic point, for distinct UI
surfaces. A reader should not see both identical ideas repeated in one viewport.
Both are `draft`, `templateVersion=draft-1`, topic `career`, claimKind
`symbolic-synthesis`, no runtime interpolation (`allowedVariables=[]`).

| Field                    | Conclusion                                                                                                                            | One insight                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| templateId               | `career-a1-conclusion`                                                                                                                | `career-a1-insight`                                                                                                                                          |
| requiredRuleIds          | `symbol-3`, `symbol-10`, `symbol-11`, `career-cross-palace`, `palace-context`                                                         | same                                                                                                                                                         |
| requiredSignalPredicates | direct Quan Thái Dương; direct Quan Cự Môn; direct Nô Thiên Tướng; actual Mệnh no direct principal; career synthesis gate true        | same                                                                                                                                                         |
| evidenceResolution       | all required rule passages and matched original palace signals                                                                        | same                                                                                                                                                         |
| sourceRevision           | `principal-3`, `principal-10`, `principal-11`, `layout-palaces`, `context-not-uniform` at pinned knowledge/catalog commit             | same                                                                                                                                                         |
| deduplicationKey         | `career:responsibility-clarity-cooperation:quan3-10:no11:menh-empty`                                                                  | same                                                                                                                                                         |
| approvedText             | “Trong lá số của bạn, công việc nổi bật ở mối liên hệ giữa trách nhiệm công khai, cách làm rõ thông tin và sự phối hợp giữa các bên.” | “Với bạn, nét riêng của chủ đề công việc nằm ở chỗ trách nhiệm gắn với cách diễn đạt cho rõ; sự phối hợp là lớp nghĩa đi cùng, không thay thế trọng tâm ấy.” |

Source IDs: `classical-stars-vol1`, `classical-context-vol1`,
`classical-layout-vol2`; pinned upstream revisions `7913704` and `1963110`.
Required passage sets are the union of each existing rule's passageIds, not just
the five unique IDs above. In particular each `symbol-*` rule also requires
`context-not-uniform`. Full source resolution follows `reading-brief-contract.md`.
Exact excerpt provenance is in `../dev/career-reading-contract.md`; it is not a
complete validated chart. A1 templates therefore remain drafts. No separate A2
template exists because its proposed second insight has no distinct admitted
inference. No automatic generalized template for other star sets is authorized.

Sample 2's alternate wording uses `career-a1-alt-conclusion` and
`career-a1-alt-insight`, both `draft-1` with exactly the same predicates, five
required rules, evidence policy, source revision and deduplication key as A1.
Their `approvedText` is the exact sample 2 conclusion and insight in
`../design/reading-brief-samples.md`. Only one pair of alternatives may ever be
approved for the same semantic key; runtime must not select both.

| Alternate templateId       | Exact candidate approvedText (still draft)                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `career-a1-alt-conclusion` | Trong lá số của bạn, trách nhiệm ở công việc gắn với cách nói cho rõ; nét phối hợp xuất hiện như phần bổ sung.                 |
| `career-a1-alt-insight`    | Với bạn, chủ đề công việc nhấn vào mối liên hệ giữa phần trách nhiệm và việc làm rõ thông tin; góc cộng tác thêm nét phối hợp. |

## Deterministic selection and validation

1. Validate chart profile, complete chart structure, calendar/engine versions and
   local SignalSet. Record whether the source of each signal is a chart or mock.
2. Resolve every required predicate against ORIGINAL palace, relation, star and
   explicit no-principal fact. Missing/unreviewed direct Quan principal fails
   the career gate. No substring matching of Vietnamese prose or inferred star.
3. Resolve the exact rule status, every rule passage, sourceId and source revision.
   If any mandatory citation is absent, suppress the template. Editorial rules
   authorize only symbolic synthesis, not behavior/ability/outcome assertions.
4. Permit only enumerated literal choices from `allowedVariables`; reject extra
   placeholders, runtime free text, unsafe interpolation and new facts. Current
   A1 candidates contain **zero variables**. The fixed text itself must be
   approved before runtime; lexical filtering alone cannot detect overclaims.
5. Reject unknown, nonapproved or revision-mismatched templates, missing evidence,
   predicates that do not match the actual chart, duplicate semantic identities,
   and stronger claims than admitted rules. Stable `claimId` resolves to template
   identity + version + semantic role; it cannot encode birth data.
6. Deterministically choose one approved semantic key at most once in insights.
   A conclusion and an insight may share a semantic key because they are two
   display surfaces for one inference; UI must not present them as two distinct
   discoveries. A different star/cung pattern needs its own reviewed template or
   an enumerated approved variable mapping; otherwise insufficient-evidence.
7. On failure, return a typed insufficient/unavailable result and no personal
   claim text. Never fall back to generic advice or a demo sample.

The adapter wraps the existing `InterpretationReport` and local signal evidence.
It does not mutate `InterpretationReport`, `KnowledgeRule`, the astrology engine,
calendar, or source registry. R04 owns a single runtime schema/registry/adapter
implementation if authorized; R03 consumes it. The present document freezes
field semantics and rejection conditions, not approved text for production.

## Evidence required for stronger personalization

The current classical principal passages provide symbolic themes. To say “bạn
hay gánh việc”, “bạn giỏi giải thích” or “bạn dễ mâu thuẫn”, BA must supply a
named rule whose exact multi-palace/star predicates, role of each factor,
exclusions, opposing conditions, scope of inference and source passages are
reviewed. QA then needs at least two different genuine SignalSets and independently
derived comparison evidence for their rule applicability. Behavioral validity
cannot be established by rephrasing the source or matching engine output to itself.
