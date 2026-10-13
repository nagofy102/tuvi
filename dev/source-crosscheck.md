# Source crosscheck — facsimile intake

## Status and boundary

Researched on **2026-10-13**, retrieval completed approximately
**15:49–15:51 UTC**, by the authorized AI-assisted BA stream. This document
records actual remote reads and a bounded visual collation, not practitioner
approval, verified historical authorship, or predictive accuracy.

**Result:** an accessible scanned-book artifact was located and the relevant
Mệnh/Thân, Tả/Hữu and Xương/Khúc placement passages were visually read. The
non-leap directions agree with the project's pinned transcription. The leap-month
disagreement remains. No new star group, engine profile, expected chart or reading
rule is activated by this research.

This is a facsimile artifact distinct from the Wikisource HTML transcription.
It is **not yet established as an independent textual edition**: the source
edition behind that transcription is not sufficiently identified to establish
their relationship. Do not count these as two independent authorities merely
because two websites are involved.

## Retrieved artifact and provenance

| Field                              | Observed value / reliability                                                                                                                                                                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Archive item                       | [20260506_20260506_1217](https://archive.org/details/20260506_20260506_1217)                                                                                                                                                                   |
| Metadata read                      | [Archive metadata endpoint](https://archive.org/metadata/20260506_20260506_1217), HTTP response parsed successfully                                                                                                                            |
| Uploader-supplied title            | 新鋟希夷陳先生紫微斗數全書, 七卷                                                                                                                                                                                                               |
| Uploader-supplied dating / edition | `1600`; 明代南陽堂刊本. **Not independently verified.**                                                                                                                                                                                        |
| Uploader attribution               | 宋陳搏撰 / 明潘希尹補; the PDF filename uses 陳摶. Record this spelling difference; neither establishes historical authorship.                                                                                                                 |
| Additional uploader description    | 江西負鼎子潘希尹補輯; 楊一宇恭閲; 書林葆和堂葉梓行. These statements need title-page/catalogue confirmation, not silent reconciliation with 南陽堂.                                                                                            |
| Visible cover, image leaf 0        | `紫微斗數全書`, `上`; stamp `内閣文庫`, book number `漢 15856`, volume marking `2 (1)`. A visible stamp is not a verified institutional catalogue record.                                                                                      |
| Scan size                          | `266` leaves in retrieved scandata; leaf numbers below are Archive image indices, **not printed page numbers**.                                                                                                                                |
| Archive record status              | Public upload in `opensource`; metadata's curation comment says checked for malware, **not textual authentication or expert review**.                                                                                                          |
| Archive PDF identity               | Filename 新鋟希夷陳先生紫微斗數全書.七卷.宋.陳摶撰.明.潘希尹補.明代南陽堂刊本.pdf; metadata SHA-1 `25428d9172069a67565f1667be915995a1c9e4f6`. The 853 MB original PDF was **not downloaded**; this is metadata, not a locally verified digest. |
| OCR                                | Retrieved DjVuTXT is severely garbled; metadata says Tesseract 5.3.0, `chi_sim`. OCR is not used as a quotation oracle.                                                                                                                        |

HTTPS requests used curl with normal TLS verification; no `--insecure`, login,
paid access or provider upload. Direct page images were downloaded to `/tmp` and
visually inspected. No scan/PDF is redistributed in the repository.

### Retrieval anchors and local image digests

The Archive image service may change derivatives. These SHA-256 values identify
the actual local JPEGs viewed, not a promise that future downloads have identical
bytes.

| Artifact                      | Exact retrieval link                                                        | SHA-256 of downloaded JPEG                                         |
| ----------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Cover, leaf 0                 | [n0.jpg](https://archive.org/download/20260506_20260506_1217/page/n0.jpg)   | `d48a61a316d7a3cb31995f1e689731f75b871f6a49e12aa9d1f94e725d7daa2d` |
| Mệnh/Thân, leaf 72            | [n72.jpg](https://archive.org/download/20260506_20260506_1217/page/n72.jpg) | `65140c8bcfcfa22fdfc9fe99ddd19e6f58a31449d2fb13ba75d3555aa1a326a1` |
| Auxiliary placements, leaf 74 | [n74.jpg](https://archive.org/download/20260506_20260506_1217/page/n74.jpg) | `2b815c2353c085ca906b73750aa988eabdc32cdd0335d09c0a1f2367f274e7d9` |

Temporary files: `/tmp/tuvi-source-page0.jpg`,
`/tmp/tuvi-source-page72.jpg`, `/tmp/tuvi-source-page74.jpg`. These are session
artifacts, not durable repository assets. The report records URLs/digests for
future review.

## Bounded visual collation

Read these **short excerpts directly from the images**, in traditional characters;
punctuation is editorial. Vietnamese summaries below are our own paraphrases,
not a published translation. The pre-existing source passages were also fetched
again from [Wikisource revision 1963110](https://zh.wikisource.org/w/index.php?title=紫微斗數全書/卷二&oldid=1963110),
HTTP **200**, and the corresponding text inspected.

| Topic                  | Image location / short visible excerpt                                                                                         | Own Vietnamese reading / comparison                                                                                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Section identity       | Leaf 72, left page: `新鋟希夷陳先生紫微斗數全書卷之三`, heading `安身命例`                                                     | This scanned section is explicitly **volume 3**, while the project's pinned web transcription places it in **volume 2**. Keep both source-specific locators; don't silently relabel the scan.                                                                                             |
| Mệnh / Thân directions | Leaf 72, left: `俱從寅上起正月順數至本生月止` and `逆至本生時安命順至本生時安身`                                               | Đếm tháng từ Dần; tại tháng sinh, đếm ngược giờ để an Mệnh và thuận giờ để an Thân. Direction agreement for non-leap lunar input; not a solar/lunar conversion oracle.                                                                                                                    |
| Literal example        | Leaf 72, left: `正月生子時就在寅宮安命身` and `丑時逆轉丑安命順去卯安身`                                                       | Tháng 1 giờ Tý: Mệnh/Thân Dần; giờ Sửu: Mệnh Sửu, Thân Mão. Agreement with the existing partial fixtures' literal examples, not confirmation of an entire chart.                                                                                                                          |
| Leap month             | Leaf 72, left: `又若閏正月生者要在二月內起安身命凡有閏月俱要依此為例`                                                          | Tháng 1 nhuận tính trong tháng 2; câu tiếp theo tổng quát hóa cho tháng nhuận. The scan appears to use `俱`, whereas the web transcription uses `具`, and the scan says `閏正月` where the web says `闰月正月`. Meaning still disagrees with the app's same-month / split-day-15 options. |
| Xương / Khúc           | Leaf 74, right, `安文昌文曲星訣`: `子時戌上起文昌`, `文曲數從辰上起`; prose `文昌星從戌上起子時` / `文曲星從辰上起子時`        | Xương khởi Tuất ở giờ Tý và nghịch theo giờ; Khúc khởi Thìn ở giờ Tý và thuận theo giờ. The right page's prose supplies direction and examples; agreement with the existing non-leap placement counts.                                                                                    |
| Tả / Hữu               | Leaf 74, left, continuation of `安左輔右弼星訣`: `左輔正月起於辰`, `右弼正月宮尋戌`, `左輔從辰上起正月順行` / `右弼從戌宮逆轉` | Tả khởi Thìn tháng 1, thuận tháng; Hữu khởi Tuất tháng 1, nghịch tháng. Agreement with the existing non-leap count. The heading begins on the right page and continues on the left page of the same image.                                                                                |

### Khôi/Việt differences incidentally observed — do not activate

The adjoining `安天魁天鉞訣` on **leaf 74, lower left page** was also
visually reread after a second AI reviewer flagged a difference. This is AI
visual collation, not independent human sign-off. The retrieved pinned
Wikisource HTML actually reads:

`甲戊庚牛羊，乙己鼠猴乡，六辛逢虎马，壬癸免蛇藏，丙丁猪狗位`

The scan visually reads **`六辛逢馬虎`** and **`丙丁豬雞位`**; the 馬/虎
ordering and the 雞-versus-狗 glyph difference are sufficiently clear to
record as **observed differences**, not merely an OCR suggestion. Remaining
historical print glyphs must not be silently regularized: in particular the
`六` reading and `免`/`兔` question still need bibliographic/textual review.

The two differences are algorithmically material candidates: one changes the
listed pair order for 辛, and the other changes the listed branch animal for
丙/丁. **The mnemonic alone does not establish which animal belongs to Khôi
versus Việt**; do not infer assignments, decide which edition is correct, label
the disagreement a confirmed typo, or overwrite current engine results. Keep
Khôi/Việt deferred until the ordered mapping and profile-specific variant have
explicit evidence from an identified edition and worked cases. No expected
Khôi/Việt fixture is produced from this reading.

Only excerpts and their local context are collated here. No entire-volume
transcription, complete fourteen-principal-star table, dignity table, Tứ Hóa,
formation recognition, time-period prediction or late-Tý choice was verified.
Other inspected navigation leaves were 20, 40, 50, 60, 70, 71, 73, 75, 76, 77,
80, 90 and 100; inspection for locating sections does not admit all their content
as approved sources or rules.

## Rights and admission decision

The visibly historical underlying text is a candidate public-domain classical
work. The retrieved Archive metadata did **not** provide an explicit scan licence
or authenticated source-institution catalogue link. Do not infer modern scan,
annotation or translation redistribution permission from public availability.
Retain short textual quotations with attribution and original Vietnamese
paraphrases; obtain the institutional catalogue/rights statement before embedding
scans or bulk republishing material.

Admission status: **facsimile passage crosscheck recorded; bibliographic identity
and independence pending**. This improves traceability, but does not satisfy a
two-independently-identified-editions gate or certify chart accuracy. The scan's
volume-number difference and unresolved publisher descriptions must remain in
the differences register.

## Corpus implications and next action

1. Existing non-leap manual source-derived corpus can cover the **12 lunar months
   × 12 hour branches** for Mệnh/Thân and these four auxiliary placements. Any
   expansion must be constructed from the documented counting directions before
   engine execution, with per-field derivation, no names, and explicit partial
   coverage. No solar conversion expected values or full chart answers can be
   inferred from these passages.
2. Such an expansion remains **source-derived partial fixtures**, not 144
   independently published golden charts. Matching two presentations of the same
   rule is not a second independent full-chart oracle. This document itself adds
   **zero fixtures**.
3. Retain leap cases as disputed/unadmitted for this corpus; the facsimile supports
   the disagreement, not the current engine's leap policy. Late Tý remains outside
   these passages' verified scope.
4. Verify the cover stamp/book number against an accessible institutional
   catalogue, confirm title-page publisher/date, and establish how the Wikisource
   transcription was sourced. Then separately acquire lawfully accessible
   independently published complete worked charts, including original lunar
   inputs and declared school/profile. Do not manufacture these from engine
   results or from these few passages.
5. Only after that evidence, predicate scope and explicit differences are reviewed
   may any deferred star group be admitted. No Khôi/Việt, opposing-signal rule,
   named formation or vận reading is activated in this increment.

## Actual checks

- Parsed Archive metadata and scandata via HTTPS; viewed the three cited image
  leaves and computed their SHA-256 locally.
- Retrieved pinned Wikisource revision via HTTPS with HTTP 200 and inspected the
  four corresponding placement/leap passages.
- No engine invocation, fixture generation or star activation performed by this
  research task. No predictive validation or human expert sign-off claimed.
