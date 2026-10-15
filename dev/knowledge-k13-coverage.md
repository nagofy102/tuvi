# HV-K13 — Broad Contextual Knowledge Expansion

Status: **PARTIAL SUCCESS — BROAD CONTEXT ADDED, PROFILE UNRESOLVED**
(research-only). K13 adds twelve source-bounded contextual statements across all
six requested relation groups. None is profile-compatible or production-eligible.

## Contextual coverage

Before K13, the repository contained foundational meanings and a small number of
rule candidates, but no dedicated normalized contextual-statement dataset. Those
earlier artifacts remain evidence and are not retrospectively counted as K13
coverage.

| Relation group         | Before |  After |   Distinct statement subjects | Profile-compatible | Production-eligible |
| ---------------------- | -----: | -----: | ----------------------------: | -----------------: | ------------------: |
| Star–palace            |      0 |      2 |            2 stars, 2 palaces |                  0 |                   0 |
| Star–state             |      0 |      2 |             2 stars, 3 states |                  0 |                   0 |
| Star–star              |      0 |      2 |                      11 stars |                  0 |                   0 |
| Palace–palace          |      0 |      2 |                     5 palaces |                  0 |                   0 |
| Tứ Hóa context         |      0 |      2 | 1 concept, 2 palaces, 4 stars |                  0 |                   0 |
| Fortune-period context |      0 |      2 | 3 periods, 2 spatial concepts |                  0 |                   0 |
| **Total**              |  **0** | **12** |             **31 unique IDs** |              **0** |               **0** |

Coverage means at least one directly reviewed passage supports a normalized
relation plus its conditions. It does not mean the group has exhaustive star,
palace or branch coverage. Counts overlap between rows; the total unique-ID count
deduplicates subjects across all statements.

## Knowledge added

- Star–palace: Tử Vi in Mệnh/Quan Lộc retains assistant conditions; Thái Dương in
  Quan Lộc retains period-support and Tam phương limitations.
- Star–state: Tử Vi and Thiên Cơ statements retain source state contrasts without
  creating a universal miếu/vượng/hãm lookup or inference polarity.
- Star–star: the Thiên Cơ–Thiên Lương context and Vũ Khúc with Lộc/Mã versus
  Phá Quân/Tham Lang are represented with supporting/opposing dependencies.
- Palace–palace: the source's Mệnh → Thiên Di/Tài Bạch/Quan Lộc review network and
  its Phúc Đức–Tài Bạch opposing context are recorded as methodology evidence.
- Tứ Hóa: Hóa Lộc with Khoa/Quyền and Hóa Quyền under adverse-star/void context
  show that transformation descriptions are conditional. No Can-to-Hóa mapping
  or effect is admitted.
- Vận hạn: Đại hạn, Tiểu hạn and Thái Tuế are reviewed separately and pairwise;
  annual Thái Tuế review also references Tam phương/Đối chiếu. No placement or
  prediction is admitted.

All statements use neutral independent paraphrases. Historical claims about rank,
wealth, health, gender, punishment or events were intentionally excluded rather
than modernized into personal predictions.

## Provenance, variants and unresolved dependencies

K13 directly reviewed six bounded passages in pinned revisions `7913704` (volume
one) and `2268626` (volume three). Both are volumes of `紫微斗數全書`; therefore K13
adds **one accessed textual family and zero independently confirmed families**.
No new school claim is made.

The repeated unresolved dependencies are active-profile geometry for `會`, `同`,
`相逢`, Tam phương and Đối chiếu; state-by-branch tables; Can-to-Tứ-Hóa mapping;
period placement and precedence; ambiguous identities such as `祿`, `耗使` and
`劫空`; and compatibility with the target Nam Phái profile. Source wording that
appears favourable or adverse remains a source variant, not a resolved polarity.

## Verification

Research-only checks run on 2026-10-15:

- PASS: JSON parsing and Source Registry schema validation.
- PASS: twelve unique statement IDs; category, subject, passage, provenance and
  locator references; 31 unique referenced catalog IDs; no duplicate normalized
  statement content.
- PASS: all six minimal source anchors found in the fetched pinned revisions.
- PASS: Prettier, `git diff --check` and `npm run audit:sources`.
- NOT RUN BY SCOPE: runtime unit/integration tests, typecheck, production build and
  E2E; K13 changes no runtime or production-consumed data.
