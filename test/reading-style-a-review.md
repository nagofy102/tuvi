# HV-R02C — Style A acceptance and future Swap Test

14/10/2026. Specification review only. User selected direct Vietnamese Style A;
sample quality and application behavior remain unapproved. BA/Tử Vi specialist
reviewed existing rule scope and rejected A2: splitting responsibility and
cooperation repeats one symbolic thesis. Candidate A1 has one insight.

## Editorial acceptance rubric

Each item is pass/fail for future user review. A failed item blocks that sample.
Formal grounding does not by itself prove reader value.

1. The opening addresses “bạn” and states a supported conclusion.
2. The primary view reads naturally without palace/star terminology.
3. Each substantive sentence has a claim ID, admitted connecting rule and exact
   source passages; the symbol dictionary alone does not license a personal trait.
4. Distinct SignalSets with different admitted conditions do not automatically
   receive the same personalized conclusion.
5. Specificity follows actual signals, not invented biography.
6. No unsupported prediction, job, life event, conflict or ability appears.
7. Insufficient evidence yields a clear non-personalized state.
8. Actual palace positions, rule, source and limitations remain expandable.
9. One insight is valid; additional insights need distinct semantic inferences.
10. Demo/mock labeling remains visible throughout the reading journey.

Add Generic, Advice Removal, Evidence and Repetition Tests. Flag “trách nhiệm” or
“phối hợp” when detached from exact signals. Remove optional advice and check that
the interpretation still has content. Ensure claim text is not duplicated as
both insight and paragraph in the primary view. User acceptance of naturalness
and relevance is still pending; no “quality improved” assertion is accepted yet.

## Future Swap Test — two observed SignalSets

Read-only diagnostic from the current engine on the synthetic inputs previously
used in `dev/career-reading-contract.md`; observed 2026-10-14. These are engine
regression observations, **not independent astrology answers**. Both reported
profile `nam-phai-chinese-lunar-v1`, engine
`iztro-2.6.2-nam-phai-v1`, calendar
`chinese-lunar-typescript-1.8.6-v1`.
Exact synthetic inputs: `synthetic-2000` = male, solar 2000-08-29 09:30;
`synthetic-1990` = male, solar 1990-05-15 14:00; both use
`split_at_15` and `next_day_at_23`. No names or real user records.

| Case             | Observed relevant signals                                                 | Expected proposed selection                                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `synthetic-2000` | Mệnh Thìn no principal; Quan Thân Thái Dương + Cự Môn; Nô Dậu Thiên Tướng | A1 predicates match. Current `draft` status means production insufficient. After user approval and runtime validation, select `career-a1-conclusion` + `career-a1-insight` as ONE semantic insight. |
| `synthetic-1990` | Mệnh Tuất Tử Vi + Thiên Tướng; Quan Dần Liêm Trinh; Nô Mão no principal   | A1 predicates fail; no other approved template. Expected production insufficient, not A1 copy. A later approved template requires its own revision and evidence.                                    |

Future test recalculates both synthetic inputs, checks the observed signals and
versions as regression observations, then runs selection under controlled
approval statuses. If chart output changes, investigate profile/engine drift;
do not silently update expected positions. A second supported conclusion needs
a separate BA reviewed template. Competitor fixtures with declared Bắc/Vietnamese
calendar do not serve as target Nam oracle.

## Four payload contract review

- E+S1/B = structural mock ready, one candidate A1 insight;
  E+S2/B = structural mock ready, one alternate A1 insight. A2 has no payload.
- E+S3 = insufficient mock, no evidence/claims; E+S2+S4/B = labelled
  demonstration with unverified status. All mock/demo calculation versions null.
- Every claim and reused paragraph carries an exact draft template tuple, stable
  claim ID and resolvable evidence IDs. Both A1 wordings have one semantic dedup
  identity. Unknown/unapproved templates fail a future production validator.
- All examples keep schema=not-run and grounding=demonstration-only. No runtime
  schema, source grounding, independent chart validation or UI check is claimed.

## Actual verification of this specification

On branch `work`, base `7064dae`, 2026-10-14 UTC:

- The existing current-profile calculator was bundled to `/tmp` for a read-only
  diagnostic; two synthetic cases yielded the SignalSets and version metadata
  recorded above. This did not validate the engine against an independent oracle.
- A Node documentation check read ten task documents and resolved their relative
  links, parsed six JSON blocks and composed four examples. It checked template
  IDs/versions, claim reuse consistency, evidence/source references, mock status,
  null calculation metadata and insight counts 1/1/0/1. Pass. This was NOT a
  runtime ReadingBrief schema or grounding validator.
- Scoped Prettier check and `git diff --check` pass after formatting. No app
  source, dependency, AGENTS or rule-base change. QA read-only integration review
  separately checks this documentation and reports its final decision below.

QA read-only decision: **ACCEPT documentation-only integration**. QA independently
composed E+B+S1/S2/S3/S4 with insight counts 1/1/0/1; found zero dangling evidence
IDs, stable repeated claim text, valid stated origin/status/verification pairs,
visible labels, and resolvable rule/passage/source references at the pinned commit.
QA re-ran `git diff --check` and found no documentation blocker after the old
HV-R02 count was explicitly marked historical in the test plan. This is not
runtime acceptance. User approval of Style A sample remains pending.
R03/R04 remain blocked pending user sample approval and separate authorization.
