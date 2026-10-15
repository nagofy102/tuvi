# HV-K06 — Foundational Knowledge Coverage

Status: **SUCCESS (research dataset, non-production)**. The K06 sweep reads the
bounded passages of all three pinned public _紫微斗數全書_ revisions and updates a
single structured foundation dataset. It does not change the calculation engine,
active profile, UI, ontology schema, evaluator or reader-facing output.

## Coverage

| Group       | Normalized coverage                     | Evidence status                        | Product use now          |
| ----------- | --------------------------------------- | -------------------------------------- | ------------------------ |
| 12 cung     | 12 stable IDs and source labels         | source-backed, one family              | structural explainer     |
| Chính tinh  | 14 stable IDs from the source sequence  | source-backed, one family              | catalog/structure only   |
| Họ phụ tinh | 5 bounded families, 14 named members    | source-backed, incomplete              | terminology only         |
| Không gian  | tam phương, tứ chính, đối/hợp chiếu     | source-backed terms; geometry blocked  | graph edge vocabulary    |
| Trạng thái  | miếu, vượng, hãm                        | source-backed terms; lookup blocked    | terminology only         |
| Tứ Hóa      | source table and four-term vocabulary   | source-backed variant; profile blocked | terminology only         |
| Methodology | three non-claim gates                   | source-backed, one family              | future DSL normalization |
| Substantive | references to 3 K05 Quan Lộc candidates | non-production                         | verification queue       |

The dataset is [knowledge-k06-foundation.json](knowledge-k06-foundation.json).
Every stored item identifies whether its text is source-supported, BA
normalization, or an open research hypothesis. The source family is deliberately
not treated as independent evidence or Nam-phái certification.

## Graph and DSL readiness

Graph-ready nodes: the 12 palace IDs, 14 star IDs, five auxiliary families,
state terms, Tứ Hóa vocabulary, source/passage IDs and the topic/rule IDs already
in K05. Graph-ready relations: `TRINES_WITH`, `OPPOSES`, `FOUR_DIRECTIONS_CONTEXT`,
`JOINS_ASPECT`, state attributes, and source provenance edges. The relation terms
are **not evaluable geometry** until a profile defines their membership.

DSL-ready candidates are methodology only: context order, state-needs-context and
aspect-context. They can later become gates that collect/match facts, but cannot
produce an interpretation. The three K05 candidates remain the only substantive
candidate references, with `productionEligible: false`.

## Gaps and next decision

K06 increases vocabulary breadth, not prediction validity. The next PO-approved
research slice should seek one independent, explicitly school-classified source
for either (a) spatial geometry plus state vocabulary, or (b) a bounded
auxiliary-star catalogue. Do not implement a graph runtime, DSL, calculation
mapping or reader-facing explanation from unresolved items.

## Checks

- PASS — local JSON/provenance check: 12 palace IDs, 14 star IDs, all source
  references resolve, and no item is production eligible.
- PASS — `npm test`, strict typecheck, format and diff checks (recorded after the
  K06 dataset update).
- BLOCKED — `npm run audit:sources` remains blocked by the known Node
  `spawnSync git EPERM` sandbox failure; no PASS is implied.
