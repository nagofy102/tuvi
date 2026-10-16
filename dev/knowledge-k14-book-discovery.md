# HV-K14 — Book-driven knowledge discovery

Status: **CHECKPOINT 3 BATCH 1 COMPLETE — PO REVIEW REQUIRED** (research-only).
Checkpoint 1 inventoried three PDFs, Checkpoint 2 piloted 23 pages, and the first
controlled Checkpoint 3 batch processed 40 additional pages from the two primary
books. The acquisition ledger and retained candidates are stored in
`knowledge-k14-acquisition.json`. No profile claim or production rule was created.

## Book inventory

Discovery was performed on the three PDFs present in `book/` at commit
`9cf5668`. The hashes identify these exact files; they do not authenticate an
edition or establish reuse rights.

| Book ID                | File and SHA-256                                                                                                                      | Evidence visible in file                                                                                                                             |                                                             PDF / printed pages | Text and visual quality                                                                                                             | Rights / edition status                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `book-k14-tan-bien`    | `Tử Vi Đầu Số Tân Biên - Vân Đằng Thái Thứ Lang - thienco.vn.pdf`; `a075aaa01d34f04fafb494912341745bfad30d30ca61e61ec13e6892b121dbf2` | Cover names Vân Đằng Thái Thứ Lang and “Sài Gòn - 1956”; footer carries `thienco.vn`; final page credits ebook creation to `nguyenbahuy`, 03/11/2014 | 277 / page numbering aligns from printed page 4; covers/front matter unnumbered | Unicode text layer on all 277 pages; five embedded images; clean visual sampling                                                    | Publisher, edition chain and permission to process/redistribute remain unverified. The 1956 cover claim is not by itself edition authentication.          |
| `book-k14-tu-xem-2009` | `Tự Xem Tử Vi 2009 - Nhiều Tác Giả, 303 Trang.pdf`; `093b43681ec474e875ad4c75a90c62f3949b5f1651e80c2f4f737de5097500a7`                | Opens directly with annual readings by age/sex for year Kỷ Sửu; no title, copyright, contents or author page was found in the front/final sample     |                                303 / no reliable printed-page system identified | Unicode text layer on 302 pages; one blank/sparse page; no embedded raster image                                                    | Title and “Nhiều Tác Giả” exist only in filename and are not verified bibliographic facts. Rights, authorship, publisher and textual lineage are unknown. |
| `book-k14-tong-hop`    | `tu vi tong hop-nguyen-phat-loc.pdf`; `82f242d44a1173c7c9963b88adde529f57c20bbbb3b6267159e86f3204378a37`                              | Running title and opening identify Nguyễn Phát Lộc / _Tử Vi Tổng Hợp_; preface is dated Vĩnh Long, 18/09/1974; pages carry `dantocking.com`          |                              442 / visible printed numbers align with PDF pages | Text layer on all 442 pages, but much Vietnamese is extracted as legacy VNI mojibake; visual pages are readable; 50 embedded images | Publisher, edition, conversion lineage and licence remain unverified. The preface date is not treated as a verified publication date.                     |

Total discovered volume: **3 PDFs / 1,022 PDF pages**. All pages were counted and
text-layer coverage was measured. Only representative title, contents, opening,
middle/final and boundary pages were visually reviewed; this is document mapping,
not a claim that 1,022 pages were substantively read.

## Document structure and reading coverage

Every range below is currently `unread` for knowledge extraction. `mapped` means
the range was located from the actual contents/pages, not that its claims were
accepted.

### `book-k14-tan-bien` — 277 pages

| PDF pages | Mapped unit                                       | Initial relevance                                                                                      |
| --------: | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
|       1–4 | Cover, contents and preface                       | Bibliography, author framing, cited classical verses                                                   |
|      5–30 | Part I — chart construction                       | Palaces, Can Chi, yin–yang, Mệnh/Thân, Cục, star placement, aspects and periods; calculation-sensitive |
|     31–51 | Part II opening, naming and star characteristics  | Methodology, vocabulary, stars and states                                                              |
|    52–123 | Mệnh and Thân                                     | Palace/star contextual knowledge and conditions                                                        |
|   124–224 | The remaining eleven palace sections              | Twelve-palace meanings, star–palace combinations and exceptions                                        |
|   225–247 | Birth season/hour, Mệnh/Thân and other appendices | Contextual/conditional candidates; requires careful scope control                                      |
|   248–271 | Part III — fortune-period interpretation          | Period methodology, entering-period and moving-star context                                            |
|   272–275 | Four sample charts                                | Worked-example evidence only; never generalize directly into rules                                     |
|   276–277 | Ebook credit and end page                         | Provenance clue, no domain extraction                                                                  |

The contents and section starts align at PDF/printed pages 5, 31, 52, 124, 132,
149, 158, 168, 174, 181, 190, 198, 208, 217 and 248. This provides the strongest
initial navigation of the three PDFs.

### `book-k14-tu-xem-2009` — 303 pages

The file has no discoverable table of contents or front matter. It is a sequence
of 2009 annual readings organized by birth year/sex, with repeated headings such
as general assessment, career, relationships, health, seasonal developments and
future age ranges. The first pages cover Tý profiles and the final pages cover
Hợi profiles, but automated heading matching is not yet reliable enough to claim
complete zodiac boundaries.

This is primarily personalized-output material, not a documented foundational
method. It is `review`/low priority until authorship, source basis, range boundaries
and rights are established. Its predictions, health/event claims and ritual advice
must not enter the Knowledge Base as sourced rules merely because they appear in
the PDF.

### `book-k14-tong-hop` — 442 pages

| PDF pages | Mapped unit                                            | Initial relevance                                                                                                                                                        |
| --------: | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|       1–4 | Opening, preface and Volume I title                    | Bibliography, declared scope and author framing                                                                                                                          |
|      5–20 | Volume I, chapter 1 — object/scope                     | Methodology, limits and historical framing                                                                                                                               |
|     21–32 | Chapter 2 — analytic, synthetic and dynamic method     | High-value methodology with explicit limitations                                                                                                                         |
|     33–60 | Chapters 3–4 — philosophy and Chinese cultural context | Yin–yang, Ngũ hành, context; internal boundary needs visual recheck                                                                                                      |
|     61–69 | Chapter 5 — palaces                                    | Palace dynamics and inter-palace relations                                                                                                                               |
|    70–101 | Chapter 6 — stars                                      | Star meanings, states/strength and special cases                                                                                                                         |
|   102–103 | Volume II transition and overview                      | Scope/navigation                                                                                                                                                         |
|   104–128 | Volume II, chapter 1 — interpretation method           | High-value interpretation conditions and common errors                                                                                                                   |
|   129–421 | Chapters 2–24                                          | Thematic configurations: chart quality, stars/palaces, education, career, wealth, adversity, family and worked charts; sensitive historical claims require narrow review |
|   422–435 | Concluding chapter                                     | Author position on fate/change; methodology/context rather than production guidance                                                                                      |
|   436–442 | Full contents                                          | Navigation and completeness reconciliation                                                                                                                               |

Detected chapter starts in Volume II are PDF pages 104, 129, 138, 142, 153, 155,
159, 165, 174, 188, 221, 238, 255, 265, 289, 335, 346, 359, 362, 370, 379, 385,
397 and 422. The absent chapter 6 in the printed contents and the exact starts of
Volume I chapter 4 and Volume II chapter 15 are document anomalies to mark
`reread`, not silently repair.

## Preliminary Coverage Map

`Strong` means an actual contents section or sampled passage directly covers the
group. `Present` means the topic is visible but needs section-level review.
`Weak` means incidental use without a documented method. This is reading priority,
not evidence quality or source independence.

| Knowledge group                       | Tân Biên    | Tự Xem 2009                 | Tổng Hợp                | K12/K13 comparison need                                                      |
| ------------------------------------- | ----------- | --------------------------- | ----------------------- | ---------------------------------------------------------------------------- |
| Twelve palaces / Mệnh–Thân            | Strong      | Weak                        | Strong                  | Resolve Phụ Mẫu/`相貌`; seek target-profile evidence                         |
| Major/auxiliary stars and groups      | Strong      | Weak                        | Strong                  | Add Vietnamese provenance/variants without duplicating entities              |
| Yin–yang, Ngũ hành, Can Chi, Cục      | Strong      | Present                     | Strong                  | Separate general concepts from calculation mappings                          |
| Star states and strength              | Strong      | Weak                        | Strong                  | Preserve tables, scope and conflicts; no universal lookup by inference       |
| Star–palace / star–star context       | Strong      | Weak                        | Strong                  | Broaden K13 while retaining every simultaneous condition                     |
| Palace–palace / spatial relations     | Present     | Weak                        | Strong                  | Verify geometry/profile rather than assuming shared labels                   |
| Tứ Hóa                                | Present     | Weak                        | Present                 | Locate exact variants and Can mapping before any rule candidate              |
| Fortune periods and time rules        | Strong      | Present                     | Present                 | Placement/direction/precedence remain calculation-sensitive                  |
| Interpretation methodology/exceptions | Strong      | Weak                        | Strong                  | Best opportunity to supplement K13 with explicit limits/errors               |
| Worked examples                       | Four charts | Personalized annual outputs | Multiple chart examples | Store as example/observed evidence; never turn outcome into a golden fixture |

The two named authors may cite or reuse earlier material. Different authors/titles
do not establish independent lineages. Tân Biên explicitly says it compiles the
author's knowledge/experience and explains verses attributed to older masters;
Tổng Hợp refers to the author's earlier _Tử Vi Hàm Số_ and other works. Lineage
must be checked passage by passage before claiming corroboration.

## Proposed controlled acquisition plan

### Checkpoint 2 pilot — requires PO approval

Use narrow, representative sections from more than one book:

1. **Methodology:** Tân Biên pages 31–32 and Tổng Hợp pages 21–32 plus 104–128.
   Test preservation of preconditions, analytical/synthetic sequencing, author
   commentary and limitations.
2. **Palace relations:** Tân Biên pages 158–167 (Quan Lộc) and Tổng Hợp pages
   61–69. Test subject/relation mapping, deduplication against K12/K13 and
   profile-unresolved variants.
3. **Star/state context:** select one complete subsection within Tân Biên 33–51
   and one within Tổng Hợp 70–101 after section-boundary review. Test conditions,
   exceptions and legacy-VNI locator handling.
4. **Negative-control source:** inspect only the bibliographic/range structure of
   Tự Xem 2009. Do not extract its personalized predictions as rules unless a
   specific passage exposes a traceable method and passes rights/provenance review.

Pilot outputs should classify candidates as `ACCEPT AS RESEARCH`, `MERGE`,
`REVIEW` or `REJECT`, but must not change production eligibility.

### Later batch queue — not authorized yet

- **Batch A:** foundation/calculation-sensitive vocabulary (Tân Biên 5–30;
  Tổng Hợp 33–101), with calculation facts kept out of runtime.
- **Batch B:** breadth-first palace meanings and contexts (Tân Biên 52–224),
  cross-read against Tổng Hợp palace/method sections.
- **Batch C:** interpretation themes and common conditions (Tổng Hợp 104–264),
  prioritizing career/wealth only after broad methodological coverage.
- **Batch D:** fortune-period methods and examples (Tân Biên 225–275 and relevant
  Tổng Hợp sections), with examples separated from general rules.
- **Batch E:** remaining Tổng Hợp 265–435 after a safety/language review; retain
  historical wording as context and do not modernize health, gender, legal or
  event claims into personal predictions.
- **Deferred:** Tự Xem 2009 content until bibliographic basis, rights and method
  provenance are materially improved.

Workload is reported as **1,022 mapped PDF pages**: 719 pages in the two structured
books and 303 pages in the low-priority annual-reading compilation. No duration or
knowledge-yield percentage is estimated before the pilot measures section-level
review and legacy-text handling.

## QA against omission and duplication

### Document QA

- Pin book ID, SHA-256, PDF page, printed page, chapter/section and rights state.
- Reconcile every page once as `unread`, `read`, `reread`, `not-relevant` or
  `blocked`; reject gaps and overlapping range assignments.
- Visually check title/copyright/contents and every text-extraction defect. For
  Tổng Hợp, keep the PDF locator authoritative; OCR/transcoding remains review aid.
- Record missing chapter numbers/boundaries as anomalies rather than correcting
  the source silently.

### Knowledge QA

- Verify each candidate against surrounding pages; distinguish author rule,
  quotation, example, historical claim and researcher paraphrase.
- Preserve concurrent conditions, exceptions and unresolved terminology.
- Deduplicate by meaning against K06–K13; add provenance/variant links rather than
  duplicate nodes or statements.
- Treat sample charts and annual outputs as examples/observations, not universal
  rules or golden calculation fixtures.

### Integration QA

- Reuse current stable IDs and research contracts; validate every subject,
  passage, source and duplicate/conflict reference.
- Keep `research`, `profile-compatible` and `production-eligible` coverage
  separate. Book evidence alone promotes none of them automatically.
- Run research-only parse/schema, ID/reference/provenance/locator, duplicate,
  format and diff checks. Escalate only if a production-consumed artifact changes.

## PO decisions before Checkpoint 2

1. Approve or adjust the four-part pilot above.
2. Confirm that the three PDFs may be used for internal research/paraphrased
   knowledge extraction, and provide purchase/licence/source records if available.
   No permission to republish long passages or full PDFs is assumed.
3. Decide whether copyrighted binaries should remain tracked in Git. Research
   governance recommends storing hashes/metadata/locators while restricting book
   distribution unless rights are confirmed; this report does not remove files
   added by PO.
4. Accept deferring `book-k14-tu-xem-2009` from knowledge extraction pending
   authorship, provenance, method and rights evidence.

Checkpoint 2 was subsequently approved with internal-research-only rights. The
discovery inventory above remains the baseline; the executed pilot follows.

## Checkpoint 2 — controlled extraction result

PO authorized internal reading and analysis of the local PDFs, but not long-form
quotation, republication or production use. The pilot therefore stores neutral
paraphrases and exact locators in `knowledge-k14-book-pilot.json`; no source text
or converted chapter is retained in the Knowledge Base.

### Actual reading coverage

| Book                   | Substantively read and visually checked | Pages | Purpose                                                                                             |
| ---------------------- | --------------------------------------- | ----: | --------------------------------------------------------------------------------------------------- |
| `book-k14-tan-bien`    | PDF/printed 31–33 and 158–160           |     6 | Method checklist, state vocabulary and a bounded Quan Lộc star/co-location sample                   |
| `book-k14-tong-hop`    | PDF/printed 23–32 and 104–107           |    14 | Palace scope, cross-palace method, period nesting, contextual star method and claim-quality control |
| `book-k14-tu-xem-2009` | PDF 1–3; no reliable printed pagination |     3 | Negative control for bibliography, disclosed method and personalized-claim risk                     |

Total: **23 pages** counted as substantively read. Adjacent ranges that were only
mechanically extracted while locating boundaries are explicitly marked
`not-substantively-read` in the dataset and contribute neither yield nor coverage.

### Candidate disposition and knowledge yield

| Disposition          | Count | Result                                                                                                                                        |
| -------------------- | ----: | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `ACCEPT_AS_RESEARCH` |     6 | Holistic inputs, one Tử Vi–Thiên Tướng Quan Lộc configuration, Phụ Mẫu scope, Quan–Di–Nô review, period nesting and non-isolated star meaning |
| `MERGE`              |     2 | State/relation vocabulary and twelve-palace scope overlap the current catalog; add provenance later without duplicating entities              |
| `REVIEW`             |     2 | Tử Vi–Thất Sát occupational wording and six-palace geometry need specialist/profile review                                                    |
| `REJECT`             |     2 | Unsupported 80% accuracy assertion and untraceable annual personalized predictions are not KB evidence                                        |

All **12/12 disposition records** have a book ID and page/section locator; all
**10/10 retained or reviewable records** also contain subjects, conditions,
limitations, profile status and a duplicate assessment. This is locator
traceability, not independent confirmation or production eligibility.

New material relative to K12/K13 is narrow but substantive:

- Vietnamese-book evidence for the Phụ Mẫu scope, without resolving the earlier
  `父母` / `相貌` lineage dispute or certifying the active profile;
- a Quan Lộc condition for Tử Vi with Thiên Tướng, retained only as a historical
  source claim;
- an explicit Quan Lộc–Thiên Di–Nô Bộc parallel-review group;
- an explicit constraint that short fortune periods be interpreted inside broader
  period context.

No statement is profile-compatible or production-eligible in this checkpoint.
The two named books must not be counted as independent source families until their
textual lineage is established.

### VNI conversion and extraction QA

The Tổng Hợp text layer was converted from legacy VNI with
`vietnamese-conversion@2.0.0` only in a temporary workspace. It improved search
and reading but left systematic artifacts such as `Tưû`, `ngươøi`, `đươïc` and
occasional source/extraction typos. Every retained locator was therefore checked
against rendered PDF pages; converted text was not committed and was never the
sole evidence for a candidate.

Tân Biên extraction was materially cleaner. The Tự Xem sample was readable, but
its missing front matter and method disclosure are substantive provenance
failures rather than encoding failures. Random negative checks were made on
Tổng Hợp p.104 (front matter before the method chapter), Tân Biên p.33 (star-list
opening outside the accepted checklist) and Tự Xem p.3 (continuation of annual
predictions); none was silently promoted into additional yield.

### Checkpoint 3 proposal

The process can scale, but not as a uniform full-text job. Proposed batches:

1. **Method and palace network:** process complete subsections and reconcile
   duplicate methodology before adding statements.
2. **Star/state breadth:** complete one bounded main-star subsection per book,
   with page-image QA for every Tổng Hợp locator and a shared terminology map.
3. **Palace breadth:** process remaining Tân Biên palace sections in small batches;
   keep occupational, medical, gendered and event claims review-only unless their
   conditions and safe interpretation policy are explicit.
4. **Worked examples and periods:** defer until calculation/profile dependencies
   are pinned. Keep Tự Xem 2009 as a negative-control corpus unless bibliography,
   method and rights provenance materially improve.

Clean-Unicode pages can be reviewed in section batches, while every retained
Tổng Hợp statement requires visual page-level verification. Checkpoint 3 should
therefore be planned by semantic section and encoding risk, not raw page count.

## PO decisions before Checkpoint 3

1. Approve, narrow or reorder the four proposed batches.
2. Confirm whether Phụ Mẫu evidence and the Tử Vi–Thiên Tướng Quan Lộc candidate
   should enter shared research datasets or remain isolated in the pilot.
3. Decide whether to fund manual VNI correction/OCR review for Tổng Hợp; automated
   conversion alone is insufficient for bulk admission.
4. Keep Tự Xem 2009 deferred unless stronger bibliography and method evidence is
   provided.

## Checkpoint 3 batch 1 — controlled acquisition result

Checkpoint 3 introduces the page-status ledger in
`knowledge-k14-acquisition.json`. It imports the completed pilot boundaries,
keeps mechanically extracted-but-unread pages pending and assigns every mapped
range in the two primary books one of `COMPLETED`, `PENDING`, `REVIEW`,
`BLOCKED` or `EXCLUDED`. The ledger is a progress control, not evidence that a
pending page lacks useful knowledge.

### Batch coverage and ledger

| Book              | New pages read | Batch ranges | Processing result                                                                                         |
| ----------------- | -------------: | ------------ | --------------------------------------------------------------------------------------------------------- |
| Tân Biên          |             18 | 34–51        | 34–41 completed; 42–51 reviewed but held for missing auxiliary entities and sensitive claims              |
| Tổng Hợp          |             22 | 61–82        | 61–68 and 71–76 completed; 69–70 and 77–82 held for demographic claims, lineage and classification review |
| **Batch 1 total** |         **40** |              | 22 `COMPLETED` pages plus 18 substantively read `REVIEW` pages                                            |

The batch does not overlap pilot pages. Cumulative substantive reading is now
**63 / 1,022 PDF pages**: 24 pages from Tân Biên, 36 from Tổng Hợp and the
three-page Tự Xem negative control. This is 63 pages read, not 63 pages admitted
to the Knowledge Base. No range is currently `BLOCKED`; automated admission of
unverified converted Tổng Hợp text remains blocked.

### Candidate result and new knowledge

| Disposition          | Count | Batch 1 result                                                                                                                                     |
| -------------------- | ----: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ACCEPT_AS_RESEARCH` |     9 | Conditional mitigation, Tứ Hóa context, aspect/adjacency exceptions, symbolic-star framing, contextual factors and a preserved catalog conflict    |
| `MERGE`              |     4 | Major-star state provenance, assistant amplification, whole-chart review and period hierarchy overlap existing knowledge                           |
| `REVIEW`             |     6 | Sun/Moon dependencies, Thiên Mã configurations, twelve-stage vocabulary, nhị hợp terminology, meaning taxonomy and rank tables need further review |
| `REJECT`             |     2 | Sensitive direct auxiliary-star outcomes and demographic/health palace claims are not reusable knowledge                                           |

The strongest additions relative to K12/K13 and the pilot are:

- an explicit Thiên Phủ mitigation exception that preserves the simultaneous
  four-star condition rather than producing pairwise rules;
- a source-described qualitative palace/aspect review order, coupled with the
  author's own counterexamples showing that geometry does not guarantee equal
  semantic force;
- explicit contextual limits for adjacency and nhị hợp instead of treating all
  spatial labels as interchangeable;
- a broader star-interpretation factor set covering combination, time, placement,
  convergence, yin-yang/five-phase fit and real-world context without weights;
- a documented conflict between star counts and main-star classifications
  attributed by the author to Vietnamese and Chinese book traditions.

No candidate is profile-compatible or production-eligible. The batch adds no
entity implicitly: the twelve-stage cycle and uncataloged auxiliary stars remain
ontology-review gaps. Different titles and authors still do not prove independent
textual families.

### Extraction and page QA

Tân Biên's Unicode layer remained suitable for section reading. Tổng Hợp was
again passed through the temporary `vietnamese-conversion@2.0.0` reader, but the
result still contained systematic partial conversions such as `Tưû`, `hơïp` and
`ngươøi`. Rendered PDF pages therefore remained authoritative, and no converted
text was committed.

All 40 pages were rendered and inspected as section contact sheets. Every retained
candidate locator was checked on its page image. Random no-yield checks covered
Tân Biên pages 45 and 48 and Tổng Hợp pages 61, 69 and 82; their catalog gaps,
sensitive framing or secondary-table status were recorded instead of being
silently converted into yield. Pages 34 and 61 also confirm boundary handling:
page 34 continues the Tử Vi subsection begun on pilot page 33, while page 61 is
chapter transition/context, so neither was treated as a fresh complete section.

### Batch 2 proposal (completed under HV-K14-C)

Keep the next batch at approximately **36–44 pages**, not the maximum 60, because
Tổng Hợp requires image-level QA:

1. Tân Biên pages 52–69: the opening bounded Mệnh/Thân subsections, with direct
   personal and medical outcomes held for review.
2. Tổng Hợp pages 83–101: finish chapter 6 on star states and special cases,
   treating tables as variants and excluding any calculation/profile promotion.
3. Do not start Volume II themes or worked charts in the same batch. Reconcile
   the twelve-stage and missing auxiliary-entity gap before normalizing those
   vocabularies.

The star-catalog conflict and twelve-stage vocabulary remain isolated in the
acquisition dataset; no shared-catalog merge was performed.

## HV-K14-C batch 2 — risk-based acquisition result

### Batch coverage and ledger

| Book              | New pages read | Batch ranges | Processing result                                                                                     |
| ----------------- | -------------: | ------------ | ----------------------------------------------------------------------------------------------------- |
| Tân Biên          |             24 | 52–75        | Read and held in `REVIEW`; the section is dominated by age-, sex-, health- and outcome-framed claims. |
| Tổng Hợp          |             10 | 83–92        | 83–88 completed; 89–92 reviewed for profile-sensitive geometry and competing Tuần/Triệt accounts.     |
| **Batch 2 total** |         **34** |              | 6 `COMPLETED` pages plus 28 substantively read `REVIEW` pages.                                        |

This batch does not overlap pilot or batch-1 ranges. Cumulative substantive
reading is **97 / 1,022 PDF pages**: 48 pages from Tân Biên, 46 from Tổng Hợp
and the three-page Tự Xem negative control. The ledger still covers each page
of the two primary books exactly once. `REVIEW` means read and withheld for
domain/profile reasons; it does not mean the page was skipped.

### Candidate result and knowledge yield

| Disposition          | Count | Result                                                                                                             |
| -------------------- | ----: | ------------------------------------------------------------------------------------------------------------------ |
| `ACCEPT_AS_RESEARCH` |     2 | A source-backed limit on multi-star Âm dương–Ngũ hành reasoning and a preserved Tuần/Triệt scope/element conflict. |
| `MERGE`              |     0 | No candidate was merged into a shared dataset in this batch.                                                       |
| `REVIEW`             |     2 | Mệnh/Thân age framing and void-main-star opposition need a stable subject/geometry and profile review.             |
| `REJECT`             |     2 | Direct personal Mệnh/Thân outcomes and numeric Tuần/Triệt examples remain non-reusable.                            |

The reliable addition is negative knowledge with provenance: this source itself
states that general five-phase relations fail to determine a unique conclusion
when several stars interact. The Tuần/Triệt section is valuable as an explicit
disagreement record, not as a formula: one attributed view extends effects to
aspects, while the author restricts inversion to co-located stars and rejects a
fixed-element account. No weights, percentages, profile mapping or personal
reading is created.

### Extraction and QA

All 34 pages were rendered and inspected as contact sheets. Every retained
candidate locator was checked on the source image; dedicated image checks covered
Tổng Hợp pages 89–92, where the VNI text layer is not admissible on its own.
Random no-yield QA covered Tân Biên 54, 61 and 69 plus Tổng Hợp 83, 84 and 92.
They were retained as no-yield/rejection evidence rather than silently becoming
star meanings or numerical rules. Tân Biên's Unicode text was readable, but its
claim surface—not encoding—is the principal admission risk.

### Next bounded batch

The former Batch 3 plan was completed as the aggregate checkpoint below. No
further batch starts automatically until PO reviews the three-batch checkpoint.

## Verification

HV-K14-C batch 2:

- PASS: acquisition JSON parses; book, ledger-range and candidate IDs are unique;
  book references resolve and each primary-book page is covered once without a
  gap or overlap.
- PASS: batch ranges reconcile to 34 pages and cumulative substantive reading
  reconciles to 97 / 1,022 pages.
- PASS: all non-rejected candidate subject IDs resolve to the K06 foundation
  catalog; retained records include locator, conditions, evidence type,
  limitations, profile status, duplicate assessment and a reason on every
  `REVIEW` record.
- PASS: batch totals reconcile to 2 `ACCEPT_AS_RESEARCH`, 0 `MERGE`, 2 `REVIEW`
  and 2 `REJECT`; none is profile-compatible or production-eligible.
- PASS: PDF SHA-256 values match Checkpoint 1; all retained locators plus the six
  random no-yield pages were visually checked.
- PASS: targeted Prettier and `git diff --check`.
- NOT RUN BY SCOPE: source-registry audit (registry unchanged), runtime unit
  tests, typecheck, build and E2E (research-only data has no production consumer).

## HV-K14-C batch 3 — aggregate checkpoint

### Batch coverage and ledger

| Book              | New pages read | Batch range | Processing result                                                                                                                              |
| ----------------- | -------------: | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Tân Biên          |             18 | 76–93       | Read and held in `REVIEW`; the repeated star entries preserve contextual structure, while direct outcome claims are excluded.                  |
| Tổng Hợp          |              9 | 93–101      | Read and held in `REVIEW`; the Tuần/Triệt continuation, annual-moving-star section and Mệnh/Thân-master discussion require separate treatment. |
| **Batch 3 total** |         **27** |             | All ranges were visually checked; VNI remained navigation-only.                                                                                |

This does not overlap the pilot or Batches 1–2. Cumulative substantive reading is
**124 / 1,022 PDF pages**: 66 pages from Tân Biên, 55 from Tổng Hợp and the
three-page Tự Xem negative control. The acquisition ledger covers each page of
the two approved primary books exactly once. The remaining queue begins with
Tân Biên 94–123 and Total Hợp's untouched sections; it is intentionally paused
at this three-batch checkpoint.

### Candidate result and knowledge yield

| Disposition          | Count | Result                                                                                                                                      |
| -------------------- | ----: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `ACCEPT_AS_RESEARCH` |     1 | An attributed void-main-star Mệnh/Thân-master fallback, retained chiefly because the source itself records an unresolved placement problem. |
| `MERGE`              |     2 | Additional provenance for contextual star-entry structure and the already-preserved Tuần/Triệt numerical critique.                          |
| `REVIEW`             |     1 | The annual moving-star set has an unresolved count/membership discrepancy and lacks a profile-pinned placement method.                      |
| `REJECT`             |     1 | Direct health, longevity, gender, status, accident and personal-outcome claims across the major-star entries.                               |

The meaningful addition is constrained methodological knowledge, not a usable
prediction: the book's own presentation repeatedly requires placement, stated
state and concurrent star context, and its Mệnh/Thân-master discussion explicitly
leaves a key placement question unanswered. No candidate becomes
profile-compatible, production-eligible, a calculation input, a weight or a
personalized reading.

### QA and checkpoint outcome

All 27 pages were rendered and inspected in contact sheets. Every retained
locator was visually compared to its PDF page; Total Hợp pages 93–98 received
individual visual review because the VNI layer is not authoritative. Random
no-yield QA covered Tân Biên 79, 84 and 91 plus Tổng Hợp 93, 95 and 100. The
three Total Hợp no-yield pages were a numerical diagram/example or blank
continuation, not silently omitted content.

Across the three autonomous batches, the ledger, hashes, IDs and provenance
remain consistent. The unresolved blockers remain substantive: stable identities
for Thân, Tuần/Triệt, moving-star membership and void-main-star terminology;
target-profile geometry; and the VNI automation boundary. These prevent any
shared-catalog normalization or runtime use, but do not invalidate the reviewed
page coverage.

The checkpoint is retained as a quality and coverage review, not a stop gate. Under
the current HV-K14-C orchestrator policy, normal batches continue autonomously;
recoverable VNI and terminology issues are isolated in the ledger. PO intervention
is reserved for blocking rights, provenance, contract or runtime issues.

## HV-K14-C batch 4 — autonomous continuation

Tân Biên PDF/printed pages 94–123 were read as one clean-Unicode, section-bounded
batch (30 pages). The ledger now marks the range `REVIEW`: 4.2.13–4.2.24 continues
the Mệnh/Thân star entries from Thiên Lương through Lục Bại. It adds one `MERGE`
record for the recurring multi-factor entry structure, one `REVIEW` record for the
Khôi/Việt paired topic because neither identity nor target-profile placement is
stable, and one `REJECT` record for the range's direct historical personal outcomes.

The range was rendered and visually inspected. Candidate locators were checked
against the source pages; no-yield QA sampled pages 96, 103, 111, 118 and 122.
Those pages are outcome-heavy (including health, death, sex, gender-role, status,
legal, occupation and accident claims), so no unsupported meaning or rule was
silently admitted. Cumulative substantive reading is **154 / 1,022 PDF pages**:
96 Tân Biên, 55 Tổng Hợp and three Tự Xem control pages.

This is a `NORMAL` continuation: no provenance, hash, ledger or schema failure was
found. The next priority is a separately bounded Tổng Hợp slice beginning at
108–128, with rendered-page QA mandatory because its VNI text remains navigation
only. No candidate has become profile-compatible or production-eligible.

### Verification — HV-K14-C batch 4

- PASS: acquisition JSON parses; ledger ranges cover each primary-book page once
  with no gap or overlap; Batch 4 reconciles to 30 new pages.
- PASS: book hashes match Checkpoint 1; all non-rejected candidate subject IDs
  resolve to the existing foundation catalog; the `REVIEW` record includes reason,
  locator, conditions, evidence type, limitations, profile status and duplicate assessment.
- PASS: all retained locators and five no-yield samples were visually checked.
- PASS: targeted Prettier and `git diff --check`; no profile or production status changed.
- NOT RUN BY SCOPE: source-registry audit (registry unchanged), runtime unit tests,
  typecheck, build and E2E (research-only data has no production consumer).

## HV-K14-C batch 8 — bounded Quan Lộc check

Tân Biên PDF/printed pages 161–167 complete the remaining Quan Lộc section in a
separately bounded seven-page batch. The source again conditions its entries on
placement, co-location, state, aspect and exceptions; that structure is retained
as a `MERGE` locator for `palace:quan-loc`. The void-main-star case is `REVIEW`:
it explicitly depends on xung/hợp chiếu plus Tuần/Triệt exceptions, but active
geometry, void-main-star identity and exception handling are profile-unresolved.

The section's deterministic occupation, rank, wealth, health, lifespan and status
claims are one bounded `REJECT` record. Visual QA covered pages 161, 163 and 165.
Cumulative substantive reading is **237 / 1,022 PDF pages**: 137 Tân Biên, 97
Tổng Hợp and three Tự Xem control pages.

Knowledge-yield review identifies the unverified deterministic career catalog as
saturated for the current safety/profile boundary. The next priority is a bounded
non-career palace slice from Tân Biên 168–224, after confirming its section
boundary; no `BLOCKING` issue was found.

### Verification — HV-K14-C batch 8

- PASS: acquisition JSON parses; ledger ranges cover each primary-book page once
  with no gap or overlap; Batch 8 reconciles to seven new pages.
- PASS: hashes match Checkpoint 1; non-rejected subject IDs resolve; retained
  locators and all three no-yield samples were visually checked.
- PASS: targeted Prettier and `git diff --check`; no profile or production status changed.
- NOT RUN BY SCOPE: source-registry audit (registry unchanged), runtime unit tests,
  typecheck, build and E2E (research-only data has no production consumer).

## HV-K14-C research-effectiveness audit — after batch 8

The two primary books total 719 pages. Ledger status is 48 `COMPLETED`, 186
`REVIEW`, 474 `PENDING`, 0 `BLOCKED` and 11 `EXCLUDED`; the 237 substantively
read pages are the completed/review total, not a measure of admitted knowledge.
Across Batches 1–8, the dataset contains 13 `ACCEPT_AS_RESEARCH`, 12 `MERGE`,
13 `REVIEW` and 10 `REJECT` records. Most retained value is methodology,
source-specific provenance, catalog/conflict evidence and explicit limitations;
there is no profile-compatible or production-eligible substantive rule.

Coverage is strongest for methodology (23 records) and spatial/palace relations
(22), then palaces (16), stars (10), star-star contexts (9) and states (5).
Tứ Hóa (1) and period material (3) are sparse and profile-blocked. The direct
evidence shows saturation in deterministic personal chart grading, appearance,
sexuality and occupation/rank outcome catalogs. Gaps with higher prospective value
are bounded palace contexts outside the saturated career catalog, auxiliary-star
identity/provenance, and source-described conditions that can be reconciled only
after profile geometry/assignment work.

Two Completed-range samples were rechecked visually without rereading the books:
Tân Biên p.34 continues already catalogued major-star/state material and contains
excluded direct outcomes; Tổng Hợp p.75 supports already retained position/aspect
methodology but also profile-unresolved day/night and sensitive health claims. No
unrecorded admissible candidate or provenance failure was found. Extraction is
`RECOVERABLE`: Tổng Hợp VNI remains navigation-only under image QA. Domain blockers
are separate: school/profile, geometry, state/exception precedence, period methods
and auxiliary identities remain unresolved.

The candidate structure is graph/DSL-ready only as research data: stable IDs,
subjects, locators, conditions, limitations, provenance and dispositions exist.
It is not implementation-ready because the candidate corpus lacks admitted
profile-pinned facts, resolved eligibility/exception semantics and approved output
claims. Next priorities: (1) a bounded non-career palace slice in Tân Biên
168–224; (2) auxiliary-star identity and provenance where the source has clear
headings; (3) later Tổng Hợp sections selected for undercovered relations rather
than sequential chart-grading material.

## HV-K14-C batch 5 — autonomous continuation

Tổng Hợp PDF/printed pages 108–128 were read as a 21-page batch. Because the VNI
layer remains non-authoritative, every retained locator was checked directly in the
rendered page image. The ledger holds the range in `REVIEW`, not because coverage
is incomplete, but because period mechanics, leap-month handling, five-phase
precedence and geometry are not compatible with an approved profile.

The batch adds one `ACCEPT_AS_RESEARCH` limitation record (the author explicitly
describes the method as one viewpoint), one `MERGE` record for multi-star contextual
review, one `REVIEW` record for period nesting, and one `REJECT` record for direct
personal outcomes. Random no-yield QA covered pages 109, 112, 119, 122 and 127.
No VNI text was used as standalone evidence. Cumulative substantive reading is
**175 / 1,022 PDF pages**: 96 Tân Biên, 76 Tổng Hợp and three Tự Xem control pages.

This is `RECOVERABLE`, not blocking: visual QA controls the VNI risk and the
unresolved mechanics are isolated. The next autonomous priority is Tân Biên
124–157, a separate palace-section slice. No profile or production status changed.

### Verification — HV-K14-C batch 5

- PASS: acquisition JSON parses; ledger ranges cover each primary-book page once
  with no gap or overlap; Batch 5 reconciles to 21 new pages.
- PASS: hashes match Checkpoint 1; non-rejected subject IDs resolve; the `REVIEW`
  candidate includes its reason, locator, conditions, evidence type, limitations,
  profile status and duplicate assessment.
- PASS: all retained locators and five no-yield samples were checked against rendered PDF pages.
- PASS: targeted Prettier and `git diff --check`; no profile or production status changed.
- NOT RUN BY SCOPE: source-registry audit (registry unchanged), runtime unit tests,
  typecheck, build and E2E (research-only data has no production consumer).

## HV-K14-C batch 6 — aggregate checkpoint

Tân Biên PDF/printed pages 124–157 were read as a 34-page palace-section batch.
The section headings add `MERGE` provenance for the existing Phụ Mẫu, Phúc Đức
and Điền Trạch vocabulary. A void-main-star Phúc Đức case is held in `REVIEW`
because the source depends on unresolved aspect geometry. The range's direct parent,
family, property, health, death and ancestral-site claims are retained only as one
bounded `REJECT` record.

All pages were rendered and visually inspected. No-yield QA covered pages 125, 132,
140, 146 and 154. The ledger marks the entire range `REVIEW` because its page
coverage is complete but its contextual mechanics cannot be normalized safely.
Cumulative substantive reading is **209 / 1,022 PDF pages**: 130 Tân Biên, 76 Tổng
Hợp and three Tự Xem control pages.

### Three-batch autonomous aggregate (Batches 4–6)

The three batches processed **85 pages**. Knowledge yield is deliberately limited:
1 `ACCEPT_AS_RESEARCH`, 3 `MERGE`, 3 `REVIEW` and 3 `REJECT`. The retained value is
traceable methodology, section provenance and explicit incompleteness; no usable
substantive prediction or target-profile rule emerged. VNI is controlled through
visual QA, so it remains `RECOVERABLE`; target-profile geometry, period mechanics,
Khôi/Việt identities and void-main-star terminology remain unresolved. There is no
`BLOCKING` provenance, rights, ledger or schema failure.

The durable checkpoint directs the next batch to Tổng Hợp 129–149. Autonomous
continuation remains authorized, but this session stops here because its context
budget is no longer safe for another complete source-read/QA cycle. No profile or
production status changed.

## HV-K14-C batch 7 — knowledge-yield optimization

Tổng Hợp PDF/printed pages 129–149 were read as a 21-page batch, with the VNI
text used only to navigate and rendered pages used for every retained locator.
The chapter's broad chart-quality material overlaps existing multi-factor
methodology. Two `MERGE` records preserve its bounded provenance: a chart-quality
framework combines concurrent yin-yang, five-phase, palace, star and configuration
contexts; a second passage connects stated yin-yang/five-phase considerations to
Mệnh/Thân context. Neither record selects the source's gender, stem/branch,
precedence or outcome formulation.

The same range contains direct grading of people and charts, physical-appearance
and sexuality claims; these are one bounded `REJECT` record. No new substantive
interpretation was admitted. Random no-yield QA covered pages 129, 133, 137, 140,
143, 146 and 149. Cumulative substantive reading is **230 / 1,022 PDF pages**:
130 Tân Biên, 97 Tổng Hợp and three Tự Xem control pages.

This batch applies the Knowledge Yield Optimization policy. Its low novelty and
high overlap show saturation for this broad chart-grading material, not a reason to
inflate candidates. The next autonomous priority therefore switches breadth-first
to the pending Tân Biên Quan Lộc section; it must first be split at a verified
section boundary. VNI remains `RECOVERABLE` under visual QA; no `BLOCKING` issue
was found.

### Verification — HV-K14-C batch 7

- PASS: acquisition JSON parses; ledger ranges cover each primary-book page once
  with no gap or overlap; Batch 7 reconciles to 21 new pages.
- PASS: hashes match Checkpoint 1; non-rejected subject IDs resolve; retained
  locators and seven no-yield samples were checked against rendered PDF pages.
- PASS: targeted Prettier and `git diff --check`; no profile or production status changed.
- NOT RUN BY SCOPE: source-registry audit (registry unchanged), runtime unit tests,
  typecheck, build and E2E (research-only data has no production consumer).

### Verification — HV-K14-C batch 6

- PASS: acquisition JSON parses; ledger ranges cover each primary-book page once
  with no gap or overlap; Batch 6 reconciles to 34 new pages.
- PASS: hashes match Checkpoint 1; non-rejected subject IDs resolve; the `REVIEW`
  record has reason, locator, conditions, evidence type, limitations, profile status and duplicate assessment.
- PASS: retained locators and five no-yield samples were visually checked.
- PASS: targeted Prettier and `git diff --check`; no profile or production status changed.
- NOT RUN BY SCOPE: source-registry audit (registry unchanged), runtime unit tests,
  typecheck, build and E2E (research-only data has no production consumer).

## Verification — HV-K14-C batch 3

- PASS: acquisition JSON parses; ledger ranges cover each primary-book page once
  with no gap or overlap; the Batch 3 ranges reconcile to 27 new pages.
- PASS: book hashes match Checkpoint 1; non-rejected subject IDs resolve to the
  existing foundation catalog; every `REVIEW` candidate has a reason, locator,
  conditions, evidence type, limitations, profile status and duplicate assessment.
- PASS: all retained candidate locators and six no-yield samples were visually
  checked; VNI text was not admitted as standalone evidence.
- PASS: candidate totals reconcile to 1 `ACCEPT_AS_RESEARCH`, 2 `MERGE`, 1
  `REVIEW` and 1 `REJECT`; no profile or production status changed.
- PASS: targeted Prettier and `git diff --check`.
- NOT RUN BY SCOPE: source-registry audit (registry unchanged), runtime unit
  tests, typecheck, build and E2E (research-only data has no production consumer).

Checkpoint 3 batch 1:

- PASS: acquisition JSON parses; book, ledger-range and candidate IDs are unique;
  all book references resolve.
- PASS: the ledger covers every PDF page of both primary books exactly once with
  no gaps or overlaps; pilot and batch boundaries reconcile to 63 cumulative
  substantively read pages.
- PASS: all non-rejected candidate subject IDs resolve to the K06 foundation
  catalog; locators, conditions, evidence type, limitations, profile status and
  duplicate assessment are present.
- PASS: candidate totals reconcile to 9 `ACCEPT_AS_RESEARCH`, 4 `MERGE`, 6
  `REVIEW` and 2 `REJECT`; no candidate is profile-compatible or
  production-eligible.
- PASS: PDF SHA-256 values match Checkpoint 1; retained locators and random
  no-yield samples were visually checked, including partial VNI conversion.
- PASS: targeted Prettier and `git diff --check`.
- NOT RUN BY SCOPE: source-registry audit (registry unchanged), runtime unit tests,
  typecheck, build and E2E (research-only data has no production consumer).

Checkpoint 2:

- PASS: pilot JSON parses; three book IDs, five reviewed ranges and 12 candidate
  IDs are unique; every book reference resolves.
- PASS: all candidate subject IDs resolve to the K06 foundation catalog; 12/12
  records have locators and 10/10 non-rejected records have conditions,
  limitations, profile status and duplicate assessment.
- PASS: disposition totals reconcile to 6 ACCEPT AS RESEARCH, 2 MERGE, 2 REVIEW
  and 2 REJECT; substantively read pages reconcile to 23.
- PASS: PDF SHA-256 values still match Checkpoint 1; retained Tân Biên and Tổng
  Hợp locators were compared with rendered source pages, including VNI checks.
- PASS: targeted Prettier and `git diff --check`.
- NOT RUN BY SCOPE: source-registry audit (registry unchanged), runtime unit tests,
  typecheck, build and E2E (no production-consumed artifact changed).

Checkpoint 1 baseline:

- PASS: three PDFs discovered; SHA-256, `pdfinfo`, font and image inventories run.
- PASS: page/text-layer reconciliation — 277/277, 302/303 plus one blank page,
  and 442/442 pages contain extractable text.
- PASS: title/contents/opening/final representative pages visually checked; actual
  TOCs and chapter boundaries mapped where available.
- PASS: preliminary coverage compared with K12/K13 without modifying datasets.
- PASS: Prettier and `git diff --check`.
- NOT RUN BY SCOPE: JSON/schema/source audit (no registry/dataset change), runtime
  tests, typecheck, build and E2E (documentation-only Checkpoint 1).

## HV-K14-C batch 9 — Nô Bộc

The broad pending range was reconciled to source headings and split without
crossing palace sections: Nô Bộc 168–173, Thiên Di 174–180, Tật Ách 181–189,
Tài Bạch 190–197, Tử Tức 198–207, Thê Thiếp 208–216 and Huynh Đệ 217–224.
Pages 168–173 were then reread from the PDF and all six rendered pages were
visually inspected; no temporary note from the prior session was treated as QA.

The batch retains one `ACCEPT_AS_RESEARCH` methodology candidate: section 9.1
explicitly combines the stated Mệnh and Nô Bộc configurations/states before
auxiliary detail. Two exceptions remain `REVIEW`: p.171 treats an opposing major
star as contextual input for a stated void-main-star case, while p.173 describes
a Tuần/Triệt reversal of the section's bright/dim assessment. Active geometry,
state lookup, Tuần/Triệt identity and precedence remain profile-unresolved. One
bounded `REJECT` record covers direct claims about servants, friends, morality,
gender and sexuality. No personal conclusion or production rule was admitted.

### Verification — HV-K14-C batch 9

- PASS: acquisition JSON parses; primary-book ledger covers every page once with
  no gap or overlap; Batch 9 reconciles to six new pages.
- PASS: candidate IDs are unique; non-rejected subjects resolve; every retained
  candidate has locator, conditions, evidence type, limitations, profile status
  and duplicate assessment.
- PASS: all six source pages and retained locators were visually checked; no-yield
  samples p.169 and p.172 contained only excluded direct personal claims.
- PASS: targeted Prettier and `git diff --check`; source registry was unchanged.
- NOT RUN BY SCOPE: runtime unit tests, typecheck, build and E2E.

## HV-K14-C batch 10 — Thiên Di

Tân Biên pp.174–180 were read and all seven rendered pages visually inspected.
One `ACCEPT_AS_RESEARCH` methodology candidate preserves the source's explicit
Mệnh–Thiên Di opposition. A substantive `REVIEW` candidate records the source's
branch-sensitive Thiên Cơ–Thái Âm co-location variants at Dần and Thân; the same
pair receives different outward-mobility guidance while both variants mention
commercial benefit. A second `REVIEW` candidate preserves the p.180
void-main-star/opposition instruction.

No branch placement, state lookup, active geometry or personal conclusion is
admitted. One bounded `REJECT` record covers the section's deterministic travel,
money, accident, legal, death, gender and sexuality predictions. The next clean
boundary is Tật Ách pp.181–189, which requires strict health/death exclusion.

### Verification — HV-K14-C batch 10

- PASS: JSON, unique IDs, subject references, candidate structure, PDF hash and
  full 719-page primary ledger consistency.
- PASS: all seven source pages were visually inspected; no-yield samples p.174,
  p.178 and p.179 were checked directly.
- PASS: Prettier and `git diff --check`; source registry was unchanged.
- NOT RUN BY SCOPE: runtime tests, typecheck, build and E2E.

## HV-K14-C batch 11 — Tật Ách

Tân Biên pp.181–189 were read and all nine rendered pages visually inspected.
One `ACCEPT_AS_RESEARCH` methodology record preserves the source's requirement
to review Mệnh, Thân and Phúc Đức plus rescue/harm influences before Tật Ách
detail. One `REVIEW` exception records that the named Lộc Tồn–Hóa Lộc–Bác Sĩ
mitigation group loses, and may reverse, its role under many stated malefics.

The complete medical, disability, accident, legal, reproductive and death catalog
is one bounded `REJECT`. Thân identity, group membership, state lookup, aspect
geometry and precedence remain unresolved. Next boundary: Tài Bạch 190–197.

### Verification — HV-K14-C batch 11

- PASS: JSON, IDs/references, candidate structure, PDF hash and 719-page ledger.
- PASS: all nine pages visually inspected; no-yield samples p.183, p.186 and p.188.
- PASS: Prettier and `git diff --check`; source registry unchanged.
- NOT RUN BY SCOPE: runtime tests, typecheck, build and E2E.
