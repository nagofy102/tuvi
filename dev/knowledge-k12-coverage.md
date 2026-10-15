# HV-K12 — Knowledge Coverage & Gap Closure

Status: **PARTIAL SUCCESS — PROFILE GAP REMAINS (research-only)**. K12 adds
eleven bounded statements to the existing meaning dataset. It closes the explicit
research-meaning gaps for six concepts and four relations, while retaining the
Phụ Mẫu/`相貌` question as unresolved. No statement is production-eligible.

## Coverage at three levels

| Group                            | Research before | Research after | Profile-compatible after | Production-eligible after |
| -------------------------------- | --------------: | -------------: | -----------------------: | ------------------------: |
| Major stars                      |         14 / 14 |        14 / 14 |                   0 / 14 |                    0 / 14 |
| Auxiliary stars                  |         14 / 14 |        14 / 14 |                   0 / 14 |                    0 / 14 |
| Palaces with substantive meaning |         11 / 12 |        11 / 12 |                   0 / 12 |                    0 / 12 |
| Foundational concepts            |          7 / 13 |        13 / 13 |                   0 / 13 |                    0 / 13 |
| Relations                        |           4 / 8 |          8 / 8 |                    0 / 8 |                     0 / 8 |
| Fortune-period concepts          |           4 / 4 |          4 / 4 |                    0 / 4 |                     0 / 4 |
| Knowledge statements             |              54 |             65 |                        0 |                         0 |

Research coverage means a bounded statement has an evidence reference. It does
not imply that the source belongs to the target profile. Profile-compatible
coverage requires affirmative profile evidence, not a similar label. Production
eligibility additionally requires the existing approval gates; K12 changes none.

## New knowledge

- Four spatial concepts now have explicit source-attributed meanings: Tam phương,
  Tứ chính, Đối chiếu and Hợp chiếu. Their geometry remains unresolved.
- Âm dương gains a general relational definition, explicitly outside a Tử Vi
  profile. Nạp âm gains a bounded definition connecting tones/pitch standards,
  Ngũ hành, Can Chi and traditional calendrical study; no mapping is admitted.
- The remaining relations now have bounded descriptions: source use of đồng vị,
  star–branch–state variants, source examples of giáp, and paired period review.
  The đồng-vị item remains `candidate`; the others remain source-qualified.
- No substantive rule candidate, score, calculation fact or personal claim was
  created.

## Phụ Mẫu / `相貌`

Chinese Wikipedia revision `93649961` reports the current twelve-palace sequence
ending in `父母` and gives `相貌宮` as an alternate name. The same revision also
states that the 1607 Daozang text differs from modern circulating Tử Vi in star
names and chart construction, and labels the Three-Harmony system as Southern.

This is useful secondary terminology evidence, but the page's exact school/alias
claims are insufficiently cited. It therefore does **not** prove that the Daozang
`相貌` section matches the target profile, nor does it provide a substantive Phụ
Mẫu meaning. The K11 Daozang variants remain `disputed`; profile-compatible palace
coverage remains 0/12.

## Sources and remaining gaps

- Vietnamese Wikipedia `Âm dương`, revision `74871160`: accessible under Wikimedia
  terms, but visibly flagged as lacking sources; general concept only.
- Chinese Wikipedia `納音`, revision `85992144`: accessible, cited general
  terminology; not a Tử Vi profile source.
- Chinese Wikipedia `紫微斗数`, revision `93649961`: accessible secondary overview;
  lineage status is `related`, not independent confirmation.
- Existing pinned Quanshu passages support the four spatial concepts and four
  relations. Reuse closes research-description gaps without expanding their
  unresolved profile scope.

The main unresolved gaps are a lawful substantive twelve-palace source tied to
the target profile, primary evidence for the Southern/Three-Harmony lineage claim,
active-profile geometry and mapping, and independent school-classified evidence.
The broader survey did not add another catalog category because the currently
accessible passages did not justify one without duplicating existing vocabulary.

## Verification

Research-only checks run on 2026-10-15:

- PASS: JSON parse and `knowledge-source-registry.schema.json` validation.
- PASS: 65 unique statement IDs, 11 K12 statements, subject/passage references,
  source provenance, and exact-content duplicate check.
- PASS: the three pinned source anchors were found in the retrieved revisions.
- PASS: Prettier, `git diff --check`, and `npm run audit:sources`.
- NOT RUN BY SCOPE: runtime unit/integration tests, typecheck, production build and
  E2E; K12 changes no runtime or production-consumed data.
