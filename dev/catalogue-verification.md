# Catalogue verification — milestone A

## Status and admission boundary

Read-only research on **2026-10-13**, completed by **16:10 UTC**, on base
`9831010`. This is AI-assisted bibliographic intake, not historical-authorship
verification, practitioner review, or predictive validation.

**New evidence:** the Archive scan's first title leaf visibly contains
`陳希夷先生著`, `紫微斗數全書`, and an imprint containing `南陽堂`.
This supports that publisher name for that photographed title leaf; it does
**not** verify the uploader's date `1600`, identify the exact institutional
copy, or reconcile the other publisher description `葆和堂葉梓行`.

**Still unresolved:** no retrieved institutional record was matched to the
cover's `内閣文庫 / 漢 15856`. No complete worked chart was admitted, no new
fixture or star group was added, and the existing sources are not relabelled
as two independent editions. Khôi–Việt remains deferred.

## Title-page observation

- Exact image: [Archive leaf 1](https://archive.org/download/20260506_20260506_1217/page/n1.jpg),
  HTTP **200**, downloaded with normal HTTPS certificate verification and
  visually inspected. This is Archive image index 1, not a printed page number.
- Local SHA-256:
  `4881bc6855ae3a1f3260d5458da59055e38e35d36917e94502b9c9fcb3b7f1d3`.
- Temporary image: `/tmp/tuvi-ia-title.jpg`; no scan is redistributed in Git.
- Right-hand page: attribution `陳希夷先生著`, title `紫微斗數全書`.
  The clearly read imprint substring is `南陽堂`; the final two glyphs are
  deliberately not normalized or used to determine a printing date.
- An attribution printed in a book is evidence of that book's attribution,
  not proof of the historical author's identity.
- This leaf is from the **same Archive artifact** previously inspected in
  `source-crosscheck.md`, not another witness or independent authority.

## Official catalogue retrievals

All requests used ordinary curl HTTPS with TLS verification intact, no
`--insecure`, credentials, paid access or private birth-data submission.
HTTP success alone is not content authentication.

| Retrieval                                                                                                                         | Actual result                                        | Interpretation                                                             |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| [National Archives Japan](https://www.archives.go.jp/)                                                                            | HTTP 200                                             | Institutional homepage accessible.                                         |
| [Official search guidance](https://www.archives.go.jp/guide/howtosearch.html)                                                     | HTTP 200                                             | Links to the Digital Archives search service; does not identify this book. |
| [Digital Archives home](https://www.digital.archives.go.jp/)                                                                      | HTTP 403                                             | Catalogue not readable from this environment.                              |
| [Digital Archives search](https://www.digital.archives.go.jp/search)                                                              | HTTP 403                                             | No search result or book identity established.                             |
| `https://digital.archives.go.jp/`                                                                                                 | CONNECT tunnel failed, response 403; curl status 000 | No retrieved catalogue response; not a negative catalogue finding.         |
| [Legacy NIJL entry](https://kotenseki.nijl.ac.jp/) and [current NIJL entry](https://kokusho.nijl.ac.jp/)                          | HTTP 200                                             | Search application accessible.                                             |
| [NDL title query](https://ndlsearch.ndl.go.jp/api/opensearch?title=%E7%B4%AB%E5%BE%AE%E6%96%97%E6%95%B0%E5%85%A8%E6%9B%B8&cnt=20) | HTTP 200; 5 results                                  | Identifies modern catalogue candidates, not the scanned copy.              |

### NIJL bounded searches

The public application JavaScript exposed the read-only GET search endpoint
`/api/biblioSimpleSearch`. Queries used `searchtarget=opBiblio`,
`searchkbn=simple`, `page=1`; the returned JSON was inspected rather than
assuming an empty client-side HTML shell meant no results.

| Keyword / exact query                                                                                                                                                          | HTTP / returned count | Actual finding                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------------------------------------------------------------------------- |
| [紫微斗數全書](https://kokusho.nijl.ac.jp/api/biblioSimpleSearch?keyword=%E7%B4%AB%E5%BE%AE%E6%96%97%E6%95%B8%E5%85%A8%E6%9B%B8&searchtarget=opBiblio&searchkbn=simple&page=1) | 200 / 0               | No exact-title result in this queried service.                                |
| [紫微](https://kokusho.nijl.ac.jp/api/biblioSimpleSearch?keyword=%E7%B4%AB%E5%BE%AE&searchtarget=opBiblio&searchkbn=simple&page=1)                                             | 200 / 53              | Includes unrelated texts and author names; no returned title containing `斗`. |
| [斗数](https://kokusho.nijl.ac.jp/api/biblioSimpleSearch?keyword=%E6%96%97%E6%95%B0&searchtarget=opBiblio&searchkbn=simple&page=1)                                             | 200 / 1               | `斗数のめし`, bid 2882215, unrelated.                                         |
| [斗數](https://kokusho.nijl.ac.jp/api/biblioSimpleSearch?keyword=%E6%96%97%E6%95%B8&searchtarget=opBiblio&searchkbn=simple&page=1)                                             | 200 / 1               | Same unrelated record.                                                        |

These are narrow keyword searches, not exhaustive proof that an institution
does not hold the book. Search normalization, union-catalogue coverage and
alternative titles remain possible limitations.

### NDL records actually opened

All three detailed records below returned **HTTP 200**, and their rendered
textual bibliographic fields were inspected. None matches the historic scan's
cover number. The five search hits include repeated records supplied by
different partner catalogues; do not count them as five independent editions.

| Official record                                                                                       | Observed catalogue fields                                                                            | Safe use                                                                                            |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [NDL 025581126](https://ndlsearch.ndl.go.jp/books/R100000002-I025581126)                              | `紫微斗數全書`; 陳希夷 著; 台北・宏業書局; 1982.9; 208 pages, 19 cm; shelf mark HR511-C72            | A dated modern edition candidate with identifiable NDL holdings. Content not read.                  |
| [CiNii-supplied record BA73215996](https://ndlsearch.ndl.go.jp/books/R100000136-I1970304959857874991) | 陳希夷原著; 南北山人編註; publisher unknown; 1975.8; 20 cm; note 校梓: 童彭年, 南北山人 本名: 童彭年 | An annotated modern edition candidate. NDL aggregates partner metadata; not a facsimile of 漢15856. |
| [CiNii-supplied record BA73215453](https://ndlsearch.ndl.go.jp/books/R100000136-I1970586434836993428) | 陳希夷著; 竹林書局; 5th edition; 1971.3; 19 cm                                                       | Another modern bibliographic candidate. No passages or rule differences verified.                   |

Catalogue records do not grant reuse rights to modern annotations,
translations, scans or tables. No copyrighted book was obtained, copied or
used to generate expected answers in this task.

## Complete worked-chart intake — bounded outcome

[NDL broader title search](https://ndlsearch.ndl.go.jp/api/opensearch?title=%E7%B4%AB%E5%BE%AE%E6%96%97%E6%95%B0&cnt=30)
returned **HTTP 200**, total **64**, with the first **30** records retrieved.
Candidates include `完全マスター紫微斗数占い` (説話社, 2017.1,
[NDL 027818363](https://ndlsearch.ndl.go.jp/books/R100000002-I027818363))
and `紫微斗数源流探微` (华龄出版社, 2024.2,
[partner record](https://ndlsearch.ndl.go.jp/books/R100000136-I1970586922262210993)).
These are **bibliographic leads only**: the search metadata does not establish
that either supplies suitable complete worked charts, compatible rule profiles,
or permission to reuse them. Those detailed records and book contents were
not read in this task.

No lawfully accessible complete worked chart with all required input/profile,
placements and source locators was established by this bounded research.
Do not turn a promising book title, a partial classical rule, an engine
snapshot or a generated sample into an independently published golden chart.

## PM next action and evidence required

1. Read the official Digital Archives catalogue when it is accessible, search
   the exact shelf number `漢15856` as well as title variants, and record a
   stable institution-issued item ID. Current HTTP 403 is an access limitation,
   not evidence the item is absent.
2. Match cover, title leaf, volumes, colophon, pagination and ownership marks
   against that record before admitting edition/date claims. Reconcile
   南陽堂 versus 葆和堂 rather than deleting either observation.
3. Identify the Wikisource transcription's actual source edition. Its
   relationship to this scan still determines whether there are genuinely
   independent textual witnesses.
4. Pursue modern books only through lawful public previews, library access or
   explicit rights-approved acquisition. Record a complete published example's
   original lunar input, declared school and exact page before any engine run;
   keep modern commentary permissions separate from classical text rights.
5. Keep this intake out of production rule activation and expected-value
   changes. It adds **zero complete charts, zero fixtures, zero activated
   star groups**; remaining Khôi–Việt, leap-policy, opposing-rule and vận gates
   are unchanged.
