# HV-K02C — calculation verification report

Ngày kiểm tra: 15/10/2026 (Asia/Bangkok). Trạng thái: **BLOCKED BEFORE CLAUSE-LEVEL
ANALYSIS**.

## What was verified

The official National Public Service Platform for Standards (SAMR/SAC) returned a
current record for `GB/T 33661-2017`, _农历的编算和颁行_ / “Calculation and
promulgation of the Chinese calendar”: published 2017-05-12, implemented 2017-09-01,
ICS 07.040, administered and centralized by the Chinese Academy of Sciences.

Stable observed locators:

- search result: `https://std.samr.gov.cn/search/stdPage?q=GB%2FT%2033661-2017&tid=`;
- official detail record:
  `https://std.samr.gov.cn/gb/search/gbDetailed?id=71F772D817FDD3A7E05397BE0A0AB82A`;
- official public-standard record:
  `https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=E107EA4DE9725EDF819F33C60A44B296`.

The public-standard page exposes preview/download controls, but the observed download
request redirected back to its information page rather than providing the document. No
unofficial mirror, OCR or paywall bypass was used, and no standard text was stored.

## Verification matrix

| Calculation concern                              | Status              | Evidence/result                                                              |
| ------------------------------------------------ | ------------------- | ---------------------------------------------------------------------------- |
| Chinese-standard identity/status                 | verified-metadata   | Official SAMR/SAC record above                                               |
| Chinese new moon/principal-term/timezone clauses | blocked             | Full text was not obtained/read                                              |
| Chinese leap-month algorithm                     | blocked             | Full text was not obtained/read                                              |
| Vietnamese lunar-calendar convention             | disputed/unverified | GB/T is Chinese-calendar scope; it cannot be assumed Vietnamese policy       |
| Product late-Tý / 23:00 policy                   | unresolved          | Requires an explicit product/profile clause, not standard title metadata     |
| `1985-03-21` UTC+7/UTC+8 disagreement            | unresolved          | Existing K02B event reproduction remains explanatory, not a profile decision |
| Golden fixture                                   | none admitted       | No clause-level, compatible independent evidence                             |

## Independent-component assessment

HKO calendar tables remain a candidate conversion comparison source and USNO remains a
method overview, as documented in K01A. Neither establishes a Chinese standard clause,
Vietnamese convention, Tử Vi late-Tý rule, or full-chart oracle. Existing iztro and
6tail-family implementations are not independent from the production lineage;
`lasotuvi` is a different codebase but its exact full-chart profile remains unverified.

## Cost and next action

No purchase was made and no price was inferred. If the official online preview cannot
be accessed through a lawful human-readable channel, request PO approval before any
purchase or library/document-delivery request, including supplier, total cost, licence,
copying limits and the specific clauses needed (timezone/civil day, new moon,
principal term and leap-month placement). Only then may K02C prepare a clause-derived
candidate fixture. The calculation profile remains unchanged.
