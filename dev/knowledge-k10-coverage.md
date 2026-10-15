# HV-K10 — Multi-Book Knowledge Extraction

Status: **ACCESS BLOCKED (research-only)**. K10 directly checked all five
Product Owner-provided URLs at page/preview level and did not download a book,
open a reader, bypass access controls or process full text. The result is a
rights/access update, not a successful substantive extraction.

## Access and rights evidence

| Book / URL family                        | Content actually read                                                 | Access classification        | Rights conclusion                                                                                   | Dataset action                         |
| ---------------------------------------- | --------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------- |
| A — _Tử Vi Hàm Số_, Mê Tải Sách          | Title, attributed author, introduction and table of contents          | ACCESSIBLE_RIGHTS_UNVERIFIED | `robots.txt` permits crawling, but the checked listing supplies no licence or book-text permission  | blocked source record only             |
| A — _Tử Vi Hàm Số_, Thư Viện PDF         | Title, attributed author, introduction and matching table of contents | ACCESSIBLE_RIGHTS_UNVERIFIED | Download/online labels are not a licence; linked terms returned HTTP 404 during this check          | blocked possible duplicate-host record |
| B — _Tử Vi Đẩu Số Tân Biên_, Thiên Cơ    | Public editorial overview and its three section headings              | PREVIEW_ONLY                 | Terms prohibit unapproved automated collection and creating an AI training dataset without approval | blocked source record only             |
| B — _Tử Vi Đẩu Số Tân Biên_, Mê Tải Sách | Title, attributed author and short introduction                       | ACCESSIBLE_RIGHTS_UNVERIFIED | No licence or book-text permission found; reader route was not opened                               | blocked source record only             |
| C — _Tử Vi Tổng Hợp_, Mê Tải Sách        | Title, attributed author and short introduction                       | ACCESSIBLE_RIGHTS_UNVERIFIED | No licence or book-text permission found; reader route was not opened                               | blocked source record only             |

The two Book A listings have matching visible title, author attribution and table
of contents, but this does not prove their editions or copying relationship. The
two Book B URLs name the same work, but their editions/text relationship are also
unverified. None identifies a Nam Phái profile.

## Knowledge yield and coverage

| Measure                                       | Before K10 |                      After K10 |
| --------------------------------------------- | ---------: | -----------------------------: |
| Active foundation concepts/entities/relations |  unchanged |                      unchanged |
| Substantive candidate rules                   |  unchanged |                      unchanged |
| New source records                            |          0 | 5 blocked access/right records |
| Newly read lawful substantive book passages   |          0 |                              0 |
| Proven independent source families            |          0 |                              0 |

The public descriptions indicate that the books may cover chart construction,
palaces/stars, foundational vocabulary and fortune periods. They do **not** supply
licensed, edition-pinned substantive passages, so no description was normalized
as an entity, relation, alias or rule. This avoids treating host marketing text or
a table of contents as Tử Vi knowledge.

## PO input needed

Provide one of: (1) an edition/page-level excerpt together with permission to
store its short locator and normalized facts, (2) written permission/licence from
the rightsholder or host for the specified research use, or (3) a lawful licensed
edition with page/chapter metadata. Until then, do not process the advertised
reader/download routes. A permission should state whether limited quotation,
fact normalization, provenance storage and internal AI-research use are allowed.

## Checks

- PASS — HTTP/page access review for all five URLs; robots and the accessible
  linked terms were checked without opening book files.
- PASS — Source Registry JSON/schema, source ID and family/reference invariants;
  no K10 passage or knowledge record was added. The available Ajv setup did not
  load optional URI/date format handlers, so those annotations were not separately
  format-validated.
- PASS — Prettier and `git diff --check` for K10 files.
- BLOCKED — `npm run audit:sources`: known sandbox failure `spawnSync git EPERM`
  during its Git provenance phase. No further environment investigation was done.
- NOT RUN BY SCOPE — `npm test`, typecheck, production build and E2E: no runtime,
  runtime contract or production-consumed data changed.
