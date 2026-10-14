# Career-first narrative implementation

## Implemented — 2026-10-14

Baseline: `61b1dc6`. BA contract is [career-reading-contract.md](career-reading-contract.md).
The career theme now has a source-bounded symbolic narrative, rather than an
inventory of stars followed by an auxiliary-selected work checklist. Finance and
relationship remain on their previous bounded exercise contract, not this new
career synthesis.

- `career-reading.ts` maps all fourteen reviewed principal meanings to original
  focus phrases and BA-reviewed role bridges. Quan Lộc supplies the anchor;
  Mệnh adds approach and Nô Bộc adds cooperation. The requested Thái Dương/Cự Môn
  with Thiên Tướng sample has a source-bounded connected paragraph, not a named
  formation. All other branches use the actual reviewed symbols.
- Shared exact concept chunks are deduplicated when joining the headline/focus;
  Tử Vi with Thiên Tướng reads “điều phối, trách nhiệm và phối hợp”, not repeated
  “trách nhiệm”. This is BA-approved copy aggregation, not semantic ranking or a
  new astrological combination.
- A synthesis requires the editorial career/context rules, two distinct
  principal-bearing palaces, and two different reviewed principal symbols. A
  disputed/deferred/missing symbolic rule or incomplete source suppresses that
  component. Partially unavailable Quan Lộc meaning suppresses the career
  synthesis rather than silently changing its anchor.
- No direct Quan Lộc principal is a distinct branch, not an adverse judgment or
  permission to borrow opposition stars. Physical presence with an unavailable
  rule is distinguished from a genuinely empty principal palace.
- Mệnh/Thân retain actual locations; co-location is not counted twice. Separate
  body locations contribute an editorial palace perspective with evidence.
  Existing eligible Tả–Hữu/Xương–Khúc only modify the reading after the principal
  focus; no auxiliary group determines its heading.
- `CareerNarrative` preserves state, why, exact-origin evidence, source passages,
  limits and optional practice. Runtime source checks require a known source ID
  and nonempty heading/excerpt/reading; emitted passage IDs remain resolvable.
  Group evidence is matched to its actual palace, not globally relocated.
- The UI displays the whole short career narrative, then collapsed **Vì sao luận
  như vậy?**, then separate collapsed **Gợi ý thực hành (tùy chọn)**. It does not
  render old insight exercises/claim actions in the career panel. Old claim data
  remains available internally; existing palace details are unchanged.
- Report version: `reference-reading-v7`; knowledge profile:
  `huyenvi-nam-phai-source-bounded-v3`. Chart/calculation/calendar/storage profiles,
  consent and network behavior are unchanged.

## Verification and limits

DEV ran TypeScript checking successfully after the implementation and initial
gate fixes. A focused intermediate run passed 50/50 cases across career,
reading-upgrade, synthesis and knowledge suites; it is not the final release run.
Final QA/release evidence belongs in [../test/career-reading.md](../test/career-reading.md).

This is original editorial comparison of reviewed traditional symbols, not
independent human validation, an occupational recommendation or evidence of
personal predictive accuracy. Existing sources are reused; no copied competitor
reading, star-placement rule, auxiliary activation, adverse rule, formation,
forecast or AI provider was added. Broader finance/relationship narrative upgrade,
full source/corpus validation and the stable mobile performance gate remain open.
