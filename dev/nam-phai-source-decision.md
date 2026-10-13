# Nam phái — source decision and implementation contract

## Decision scope

Reviewed on 2026-10-13 by the designated **AI Tử Vi specialist** in consultation
with the BA role. The user chooses one Southern-school product profile and the
Chinese lunar calendar. This is a product/domain decision with traceable evidence,
not a claim of human practitioner certification or unanimous Southern-school rules.

Recommended profile ID: `nam-phai-chinese-lunar-v1`. Product description:
**“Nam phái — quy ước ứng dụng”**. This document is a specification; implementation
and verification must be recorded separately by DEV/QA.

## Sources actually read in this review

HTTPS retrieval used normal TLS, without paid access, authentication, external
uploads or personal birth inputs. Modern documentation pages are live references;
their local SHA-256 captures the retrieved artifact, not an immutable edition.
Temporary documents are not redistributed in the repository.

| Reference                                                                                      | Actual read and usable scope                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [iztro 安星诀](https://iztro.com/learn/setup.html), §18 安四化星诀                             | Explicitly says `四化各派有所不同，以上为南派四化` (the schools differ; the table above is Southern-school Tứ Hóa). This directly supports the specified ten-stem Tứ Hóa table below, not every boundary convention. Also read §2 Mệnh/Thân, §13 Tả/Hữu–Xương/Khúc, §14 Khôi/Việt and §28 Khốc/Hư. |
| [iztro configuration](https://iztro.com/posts/config-n-plugin.html)                            | `default 为通行版本，zhongzhou 为中州派版本`; `forward 归入次日，current 归入当日`. Read the default configuration: normal lunar-year boundary, normal horoscope boundary, natural-year age convention, forward late Tý, default placement algorithm.                                              |
| [iztro chart API](https://iztro.com/posts/astrolabe.html)                                      | `fixLeap` true: `闰月的前半个月算上个月，后半个月算下个月`. Local installed source `lib/utils/index.js` makes the split exact: leap days 1–15 use the numbered month; day 16 onward uses the following month. The late-index-12 exception is described below.                                      |
| Installed iztro 2.6.2                                                                          | `lib/data/heavenlyStems.js` has the same ordered Tứ Hóa table as §18; `lib/astro/config.js` and `lib/data/types/astro.d.ts` confirm documented defaults. This is implementation corroboration, not an independent chart oracle.                                                                    |
| [Hong Kong Observatory conversion index](https://www.hko.gov.hk/en/gts/time/conversion.htm)    | Read public year-table links; the 1985 and 2023 PDFs were successfully retrieved and extracted with `pdftotext -layout`. Official calendar reference, not a star-placement source.                                                                                                                 |
| [HKO 1985 PDF](https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/1985e.pdf)                | Read the table: 1985-02-20 is lunar month 1 day 1; 1985-03-21 is month 2 day 1; 1985-04-20 is month 3 day 1. The 1985 Chinese table has no leap month 2. This is a material difference from the previous Vietnamese-calendar profile.                                                              |
| [HKO 2023 PDF](https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/2023e.pdf)                | Extracted year table and read the March/April rows. The text extractor does not preserve every leap-marker graphic; do not turn ambiguous extracted labels into a complete fixture without inspecting the PDF rendering.                                                                           |
| Existing [book review](knowledge-source-review.md) and [scan crosscheck](source-crosscheck.md) | Read existing source records: classical `紫微斗數全書` volume 2 pinned revision 1963110 and facsimile leaf 72 use all-leap-following-month for Mệnh/Thân. Retain this historical variant with provenance; it is not the active split-at-15 convention.                                             |

The initial `/config.html` and `/learn.html` guesses returned branded 404 content
and supplied no evidence. The correct linked pages above were read instead.

### Retrieval digests

| Artifact                 | SHA-256                                                            |
| ------------------------ | ------------------------------------------------------------------ |
| iztro setup HTML         | `773e984dcd18a1fa4a27ab2d6f7b0fa8b0e2ebbc35fbbcb0878891cc2a61f6c9` |
| iztro configuration HTML | `9e954fd52cbd91b16c9e3685f55aa743ffc3a259cfff8d16a01baa995435541f` |
| iztro chart API HTML     | `b5550e699052c7d592e13d3bd8c53e2cafbc2dfcf480ac69394171b9e15ca275` |
| HKO 1985 PDF             | `fd8c0c6a978ac9429533908f6a3b6ed32cb72fb5bdef9f5fbaa4617e02f41eb6` |
| HKO 2023 PDF             | `57245f05e454de6d4b18d6f20d868e497b37c40a01b8d9890936a7c5e7911ac5` |

## Exact recommended fixed profile

| Choice              | Decision and reason                                                                                                                                                                                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calendar            | Chinese lunar conversion, fixed modern GMT+8 civil-date calendar, with valid month/day/leap validation. Use one converter for input, display, form toggle, age calculation and engine. Historical time-zone/DST or true-solar-time correction is outside this profile.                                                      |
| Placement algorithm | iztro `algorithm: 'default'`, explicitly pinned to 2.6.2. The documentation calls it the common version. Do not select `zhongzhou` merely because the product selects Southern-school Tử Vi.                                                                                                                                |
| Tứ Hóa              | Explicit ten-stem table below, fixed ordered Lộc–Quyền–Khoa–Kỵ. It matches the documentation's Southern-school label and the installed default table. Preserve explicit table/version even if upstream default later changes.                                                                                               |
| Year boundary       | `yearDivide: 'normal'`: lunar New Year, not Lập Xuân.                                                                                                                                                                                                                                                                       |
| Leap placement      | `split_at_15`: leap days 1–15 use month m; days 16–end use m+1 cyclically for month-based placement. This is the selected documented implementation convention. It is distinct from how the Chinese calendar determines whether a leap month exists.                                                                        |
| Late Tý             | Fixed `next_day_at_23` application convention: advance the calculation date by one real civil day at 23:00–23:59, then calculate at early-Tý index 0. Preserve the actual civil birth date/time separately. Source documentation supports a next-day choice; the complete date rollover is our explicit adapter convention. |
| Time unknown        | Continue date-only output; no fabricated hour or personalized star chart.                                                                                                                                                                                                                                                   |
| UI                  | One profile; remove school, leap-policy and late-Tý selection controls. Give a short explanation when a supplied lunar date differs from a previously Vietnamese-calendar record.                                                                                                                                           |

### Ordered Southern-school Tứ Hóa table

The source mnemonic is `甲廉破武阳，乙机梁紫阴，丙同机昌廉，丁阴同机巨，戊贪阴右机，己武贪梁曲，庚阳武阴同，辛巨阳曲昌，壬梁紫左武，癸破巨阴贪`.

| Year stem | Hóa Lộc     | Hóa Quyền   | Hóa Khoa    | Hóa Kỵ     |
| --------- | ----------- | ----------- | ----------- | ---------- |
| Giáp      | Liêm Trinh  | Phá Quân    | Vũ Khúc     | Thái Dương |
| Ất        | Thiên Cơ    | Thiên Lương | Tử Vi       | Thái Âm    |
| Bính      | Thiên Đồng  | Thiên Cơ    | Văn Xương   | Liêm Trinh |
| Đinh      | Thái Âm     | Thiên Đồng  | Thiên Cơ    | Cự Môn     |
| Mậu       | Tham Lang   | Thái Âm     | Hữu Bật     | Thiên Cơ   |
| Kỷ        | Vũ Khúc     | Tham Lang   | Thiên Lương | Văn Khúc   |
| Canh      | Thái Dương  | Vũ Khúc     | Thái Âm     | Thiên Đồng |
| Tân       | Cự Môn      | Thái Dương  | Văn Khúc    | Văn Xương  |
| Nhâm      | Thiên Lương | Tử Vi       | Tả Phụ      | Vũ Khúc    |
| Quý       | Phá Quân    | Cự Môn      | Thái Âm     | Tham Lang  |

Setting these calculation facts does not activate deeper Tứ Hóa interpretation,
Phi Hóa, named formations or annual predictions.

## Boundary detail DEV must preserve

The installed upstream raw late-Tý index 12 is **not** equivalent to complete
date rollover: `fixLunarMonthIndex` excludes its day-16+ leap adjustment when
`timeIndex === 12`, and the principal-star routine increments the lunar day
without rebuilding the complete month/year tuple. Keep the application's explicit
advance-date-then-index-0 strategy and document it. Test lunar day 15→16,
month end, year end and Gregorian year end. Do not apply a second day advance in
the engine after the adapter has already advanced the date.

Chinese lunar dates must keep the true leap flag and actual day. An adjusted
astrological month is separate from the calendar month; never overwrite the
displayed birth month or convert an adjusted month as if it were a civil date.

The app's old Vietnamese-calendar input data cannot be silently reinterpreted.
Old solar birth records have a stable civil date and can be recalculated under
the new profile with a clear profile-change notice. Old lunar birth records need
the old converter to resolve the old civil date or explicit re-entry; they must
not silently become Chinese lunar dates with the same numbers.

## A2 conclusion and remaining scope

BA and specialist can settle the product choices above now. The classical
all-leap-next rule and Khôi/Việt manuscript variants remain historical differences
with their original records; they do not create a user-selectable second school.
Modern iztro §14 lists branches `辛年午寅` and `丙丁之年亥酉`, aligning with the
clearer scanned mnemonic, but the poem alone does not authorize arbitrary new
ordered fixtures or activation of Khôi/Việt interpretation. A separate ordered
placement review is still needed when expanding that group's reading rules.

No requirement to authenticate two independent classical editions is imposed as
a universal blocker for this explicitly sourced application profile. The Southern
label is supported narrowly by the reviewed Tứ Hóa table; full historical-school
certification remains a different claim. Existing source passages and corpus
remain valuable within their declared partial scope.

Competitor chart outputs should enter a **cross-engine comparison corpus** with
site/date/settings, input and actual observed result. A disagreeing site does not
automatically override the selected profile; identify its calendar and conventions.
Separate this comparison from published book-derived answers, record shared
underlying libraries when discovered, and preserve unknown fields as unknown.
No competitor chart was fetched or generated by this specialist-only review.

## Handoff

PM/DEV: implement the versioned profile, synchronized Chinese calendar paths,
fixed choices, saved-record migration behavior and explicit configuration.
QA: verify official calendar anchors, ten Tứ Hóa rows, invalid leap inputs,
late-Tý date rollovers, profile isolation, and current non-leap partial source
fixtures under their unchanged per-field provenance. Record the actual production
profile and results; this source review itself ran no engine/test suite.
