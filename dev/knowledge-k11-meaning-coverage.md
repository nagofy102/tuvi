# HV-K11 — Broad Meaning Coverage Completion

Status: **SUCCESS WITH DISPUTED PALACE VARIANT (research-only)**. K11 adds
neutral, source-attributed meanings to the evolving foundational meaning dataset.
It does not add calculation data, a reasoning rule, score, or reader-facing claim.

## Coverage

| Group                                     | Before K11 | After K11 | Evidence boundary                              |
| ----------------------------------------- | ---------: | --------: | ---------------------------------------------- |
| Major stars                               |    14 / 14 |   14 / 14 | Unchanged; one unresolved textual lineage      |
| Auxiliary stars                           |    10 / 14 |   14 / 14 | Four bounded entries added                     |
| Palaces with any substantive meaning      |     0 / 12 |   11 / 12 | Daozang source-system variants, all `disputed` |
| Palaces with canonical-profile meaning    |     0 / 12 |    0 / 12 | No compatible profile evidence yet             |
| Concepts with explicit meaning statement  |     0 / 13 |    7 / 13 | Tứ Hóa, five state terms, Ngũ hành             |
| Relations with explicit meaning statement |      0 / 8 |     4 / 8 | Context terms only; geometry unresolved        |
| Fortune-period concepts                   |      0 / 4 |     4 / 4 | Temporal vocabulary only; placement blocked    |
| Total knowledge statements                |         24 |        54 | 30 new research statements                     |
| New reasoning candidates / approvals      |          0 |         0 | No change                                      |

The evolving dataset remains
[knowledge-k10-foundational-meanings.json](knowledge-k10-foundational-meanings.json)
and now declares artifact version `hv-k11-foundational-meanings-v0.2`.

## Sources and provenance

- `紫微斗數全書/卷一`, pinned revision `7913704`: four missing auxiliary-star
  meanings and grouped Tứ Hóa vocabulary.
- `紫微斗數`, pinned Daozang-labelled revision `8061095`: eleven palace sections
  that can be aligned only as disputed research variants. Its twelfth section is
  `相貌`, not the current `父母`; no Phụ Mẫu meaning was created.
- Vietnamese Wikipedia `Ngũ hành`, pinned revision `75475130`: one newly accessed
  general-concept family under Wikimedia reuse terms. It is not a Tử Vi school
  source and is not independent validation of the Tử Vi textual lineage.
- Existing pinned K06–K08 passages support bounded state, spatial-relation and
  fortune-period statements without reopening calculation mappings.

## Remaining gaps

1. Compatible source evidence for all twelve palace meanings, especially Phụ Mẫu;
   current palace statements must not be merged into the active profile.
2. Meanings for âm dương, nạp âm, remaining concepts and the four uncovered
   relation types.
3. An independently identified, school-classified Tử Vi source family before
   evaluating any shared meaning as a reasoning input.

## Verification

Research-only checks are recorded after final formatting and validation. Runtime
tests, typecheck, build and E2E remain outside scope because no production-consumed
runtime file or contract changed.
