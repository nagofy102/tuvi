# HV-K14 — Book-driven knowledge discovery

Status: **CHECKPOINT 2 COMPLETE — PO REVIEW REQUIRED** (research-only).
Checkpoint 1 inventoried three PDFs. The approved controlled pilot has now read
and visually checked 23 representative pages, retained research candidates and
stopped before library-scale extraction. No profile claim or production rule was
created.

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

## Verification

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
