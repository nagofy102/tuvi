# HV-R02 — Mẫu bản đọc và payload để người dùng duyệt

Ngày 14/10/2026. **Chưa được người dùng duyệt; chưa triển khai.**
BA/chuyên môn AI kiểm tra phạm vi nguồn; không phải thẩm định độc lập.
Hợp đồng: [reading-brief-contract.md](../dev/reading-brief-contract.md).

## Dữ liệu và giới hạn mẫu

Không có lá số Nam phái hoàn chỉnh được thẩm định độc lập trong corpus hiện tại.
Không tạo thêm vị trí sao, ngày âm, cách cục hoặc dữ kiện đời sống.
Mẫu 1/2/4 chỉ dùng ví dụ biên tập đã ghi tại
[career-reading-contract.md](../dev/career-reading-contract.md#exact-copy-boundaries-and-example):
Quan Lộc Thái Dương/Cự Môn, Nô Bộc Thiên Tướng, Mệnh không chính tinh.
Đây là excerpt để duyệt văn, không phải full chart hợp lệ để chạy engine.
Không suy rằng tất cả điều kiện full-chart đã qua kiểm tra. Mẫu 3 là mock tình
huống thiếu căn cứ, không phải một người thật. Bốn mẫu KHÔNG đại diện bốn lá số
khác nhau và không chứng minh khả năng phân biệt lá số.

## Mẫu 1 — Hai ý có nguồn, không ép ba ý

Nhãn luôn hiện: **Mẫu cấu trúc để duyệt cách viết — không phải luận giải cá nhân.**

**Kết luận:** Công việc được đọc qua mối liên hệ giữa trách nhiệm, cách làm rõ
thông tin và sự phối hợp.

**Ý 1 — Trách nhiệm đi cùng sự rõ ràng**

Điểm đáng chú ý là trách nhiệm được đặt cạnh việc diễn đạt và làm rõ thông tin.
Phần luận không chỉ xét điều cần hoàn thành, mà còn xét cách phần việc ấy được hiểu.

**Ý 2 — Phần việc riêng trong trách nhiệm chung**

Khi đọc thêm quan hệ cộng tác, sự phối hợp bổ sung cho trọng tâm công việc:
phần việc của mỗi bên được đặt trong trách nhiệm chung, thay vì chỉ được xem riêng lẻ.

Không có gợi ý thực hành. Người đọc không cần một bài tập để nhận được nội dung.

**Căn cứ lá số** (đề xuất mở theo yêu cầu):

- C1/P1: symbol-3 → principal-3 (trách nhiệm công khai), symbol-10 → principal-10
  (lời nói/làm rõ thông tin); career-cross-palace và palace-context → layout-palaces,
  context-not-uniform. Kết nối câu văn là biên tập, không tổ hợp cổ được xác nhận.
- C2/P2: thêm symbol-11 → principal-11 (phối hợp/trách nhiệm), giữ tiền đề C1.
  Nô Bộc là góc nhìn theo chủ đề, không tự gọi tam hợp Quan Lộc.
- Kết luận C0 tổng hợp C1/C2, không tạo nhận định mới. Mệnh không chính tinh không
  được diễn giải là yếu kém. Chưa xét miếu/vượng, Tứ Hóa, đối nghịch, cách cục hay vận.

Ý 1 ưu tiên vì đến từ trọng tâm Quan; ý 2 đứng sau vì bổ sung vai trò quan hệ cộng
tác. Hai ý là hai phạm vi đọc trong cùng tổng hợp, không phải hai bằng chứng độc
lập về hành vi. Nếu người dùng thấy hai ý còn trùng, chọn mẫu 2; không cố giữ hai.

## Mẫu 2 — Chỉ một ý được duyệt

Nhãn như mẫu 1. Cùng excerpt, không bịa một lá số mới để minh họa cardinality.

**Kết luận:** Trách nhiệm và cách hiểu phần việc là trọng tâm của phần đọc Công việc.

**Một ý — Trách nhiệm, thông tin và cộng tác**

Phần đọc đặt việc đảm nhận trách nhiệm cạnh cách thông tin được trình bày và hiểu
rõ. Sự phối hợp bổ sung vào đó cách mỗi bên tham gia phần việc chung.

Căn cứ mở rộng: cùng C1/C2 của mẫu 1. Không kết luận bạn đang có bất đồng,
giữ chức vụ hoặc làm một nghề nhất định. Không có nextStep. Một ý tổng hợp được
giữ lại; không biến mỗi tên sao thành một insight.

## Mẫu 3 — Chưa đủ căn cứ

Nhãn: **Mẫu cấu trúc — tình huống thiếu căn cứ.**

Thông báo: **Chưa đủ căn cứ để luận giải Công việc. Phần này không tạo kết luận
riêng hoặc lời khuyên thay thế.**

Không có kết luận, insight hoặc bài đọc. Căn cứ mở rộng giải thích thiếu điều kiện
kết nối từ các cung khác nhau; không gán vị trí sao và không suy bất lợi từ phần
thiếu. Đây là thông báo hệ thống, không phải substantive claim về lá số.

## Mẫu 4 — Dữ liệu minh họa

Nhãn: **Bản minh họa để duyệt cách viết, không phải luận giải cá nhân đã xác minh.**

Nội dung một ý như mẫu 2; dataOrigin=demonstration, verificationStatus=unverified.
Excerpt đã có trong tài liệu chỉ phục vụ nội dung minh họa; chưa có SignalSet
full-chart để grounding. Không đưa payload này vào production user-chart.

## Example payloads — composition notation, not a live API

Các block JSON dưới là fixture documentation. Expand: lấy envelope E; thay toàn bộ
trường trùng bởi mẫu S1/S2/S3/S4 (shallow merge). Evidence pool B chỉ được chọn theo
evidenceIds của từng mẫu, không tự thêm vào mẫu thiếu căn cứ. Các `schema:not-run`
được giữ vì chưa có runtime validator; không coi JSON parse là grounding pass.
Không gửi notation này cho frontend: transport thật phải là object đã expand.
Không có random ID thật ở đây; readingId là nhãn fixture, phải thay bằng random
memory ID khi adapter được triển khai. Không có dữ kiện sinh cá nhân trong fixture.

Envelope E:

```json
{
  "schemaVersion": "reading-brief-v1",
  "readingId": "r02-sample-1",
  "topic": "career",
  "status": "ready",
  "dataOrigin": "structural-mock",
  "verificationStatus": "not-applicable",
  "calculationProfile": null,
  "calendarRuleVersion": null,
  "engineVersion": null,
  "ruleSetVersion": "huyenvi-nam-phai-source-bounded-v3@17ac24329b7b8657353450e97a8c51134ed9aaa3",
  "sourceRevision": {
    "repositoryCommit": "17ac24329b7b8657353450e97a8c51134ed9aaa3",
    "catalogPath": "src/domain/interpretation/catalog.ts",
    "passagesPath": "src/domain/interpretation/knowledge.ts",
    "sources": [
      {
        "sourceId": "classical-stars-vol1",
        "revision": "7913704",
        "url": "https://zh.wikisource.org/w/index.php?title=紫微斗數全書/卷一&oldid=7913704#諸星問答論"
      },
      {
        "sourceId": "classical-context-vol1",
        "revision": "7913704",
        "url": "https://zh.wikisource.org/w/index.php?title=紫微斗數全書/卷一&oldid=7913704#太微賦"
      },
      {
        "sourceId": "classical-layout-vol2",
        "revision": "1963110",
        "url": "https://zh.wikisource.org/w/index.php?title=紫微斗數全書/卷二&oldid=1963110"
      }
    ]
  },
  "conclusion": null,
  "insights": [],
  "topicReading": null,
  "evidence": [],
  "exclusions": [],
  "validation": {
    "reasons": ["mock-only"],
    "message": "Mẫu cấu trúc để duyệt cách viết — không phải luận giải cá nhân.",
    "schema": "not-run",
    "grounding": "demonstration-only",
    "contradictionReview": "not-evaluated-domain-gap",
    "independentVerificationRef": null
  }
}
```

Evidence pool B (real source anchors, no claimed calculated signal):

```json
[
  {
    "id": "e3",
    "signalIds": [],
    "rule": {
      "id": "symbol-3",
      "version": "git:17ac24329b7b8657353450e97a8c51134ed9aaa3:src/domain/interpretation/knowledge.ts#symbol-3",
      "status": "text-reviewed"
    },
    "passageIds": ["principal-3", "context-not-uniform"],
    "sourceIds": ["classical-stars-vol1", "classical-context-vol1"],
    "origin": "structural-mock",
    "explanation": "Tiền đề biểu tượng Thái Dương trong excerpt đã ghi; không xác nhận chart hoàn chỉnh.",
    "limitations": ["Không suy hành vi từ một sao."]
  },
  {
    "id": "e10",
    "signalIds": [],
    "rule": {
      "id": "symbol-10",
      "version": "git:17ac24329b7b8657353450e97a8c51134ed9aaa3:src/domain/interpretation/knowledge.ts#symbol-10",
      "status": "text-reviewed"
    },
    "passageIds": ["principal-10", "context-not-uniform"],
    "sourceIds": ["classical-stars-vol1", "classical-context-vol1"],
    "origin": "structural-mock",
    "explanation": "Tiền đề biểu tượng Cự Môn: diễn đạt/làm rõ thông tin.",
    "limitations": ["Không suy bất đồng hoặc tranh chấp."]
  },
  {
    "id": "e11",
    "signalIds": [],
    "rule": {
      "id": "symbol-11",
      "version": "git:17ac24329b7b8657353450e97a8c51134ed9aaa3:src/domain/interpretation/knowledge.ts#symbol-11",
      "status": "text-reviewed"
    },
    "passageIds": ["principal-11", "context-not-uniform"],
    "sourceIds": ["classical-stars-vol1", "classical-context-vol1"],
    "origin": "structural-mock",
    "explanation": "Tiền đề biểu tượng Thiên Tướng: phối hợp/trách nhiệm.",
    "limitations": ["Không suy nghề nghiệp hoặc chức vụ."]
  },
  {
    "id": "ec",
    "signalIds": [],
    "rule": {
      "id": "career-cross-palace",
      "version": "git:17ac24329b7b8657353450e97a8c51134ed9aaa3:src/domain/interpretation/knowledge.ts#career-cross-palace",
      "status": "editorial"
    },
    "passageIds": ["layout-palaces", "context-not-uniform"],
    "sourceIds": ["classical-layout-vol2", "classical-context-vol1"],
    "origin": "structural-mock",
    "explanation": "So sánh biên tập Quan và Nô trong excerpt, không phải tổ hợp cổ.",
    "limitations": ["Chưa kiểm tra SignalSet full-chart; không dùng production."]
  },
  {
    "id": "ep",
    "signalIds": [],
    "rule": {
      "id": "palace-context",
      "version": "git:17ac24329b7b8657353450e97a8c51134ed9aaa3:src/domain/interpretation/knowledge.ts#palace-context",
      "status": "editorial"
    },
    "passageIds": ["layout-palaces", "context-not-uniform"],
    "sourceIds": ["classical-layout-vol2", "classical-context-vol1"],
    "origin": "structural-mock",
    "explanation": "Chủ đề cung là hiện đại hóa biên tập; giữ vị trí gốc.",
    "limitations": ["Không coi Nô Bộc mặc nhiên là tam hợp Quan."]
  }
]
```

S1 (attach all B as evidence):

```json
{
  "readingId": "r02-sample-1",
  "conclusion": {
    "claimId": "career-summary-responsibility-information-cooperation",
    "plainText": "Công việc được đọc qua mối liên hệ giữa trách nhiệm, cách làm rõ thông tin và sự phối hợp.",
    "evidenceIds": ["e3", "e10", "e11", "ec", "ep"],
    "scope": "editorial-symbolic"
  },
  "insights": [
    {
      "id": "i1",
      "claimId": "career-responsibility-information",
      "title": "Trách nhiệm đi cùng sự rõ ràng",
      "plainText": "Điểm đáng chú ý là trách nhiệm được đặt cạnh việc diễn đạt và làm rõ thông tin. Phần luận không chỉ xét điều cần hoàn thành, mà còn xét cách phần việc ấy được hiểu.",
      "evidenceIds": ["e3", "e10", "ec", "ep"],
      "scope": "editorial-symbolic",
      "deduplicationKey": "career:responsibility-information:Quan:Thái Dương+Cự Môn:Nô:Thiên Tướng",
      "priority": "primary",
      "rankingReasons": ["topic-match", "approved-primary-rule"],
      "exclusionIds": []
    },
    {
      "id": "i2",
      "claimId": "career-cooperation-shared-responsibility",
      "title": "Phần việc riêng trong trách nhiệm chung",
      "plainText": "Khi đọc thêm quan hệ cộng tác, sự phối hợp bổ sung cho trọng tâm công việc: phần việc của mỗi bên được đặt trong trách nhiệm chung, thay vì chỉ được xem riêng lẻ.",
      "evidenceIds": ["e3", "e10", "e11", "ec", "ep"],
      "scope": "editorial-symbolic",
      "deduplicationKey": "career:cooperation-shared-responsibility:Quan:Thái Dương+Cự Môn:Nô:Thiên Tướng",
      "priority": "secondary",
      "rankingReasons": ["topic-match", "distinct-evidence"],
      "exclusionIds": []
    }
  ],
  "topicReading": {
    "topic": "career",
    "state": "supported",
    "paragraphs": [
      {
        "claimId": "career-responsibility-information",
        "plainText": "Điểm đáng chú ý là trách nhiệm được đặt cạnh việc diễn đạt và làm rõ thông tin. Phần luận không chỉ xét điều cần hoàn thành, mà còn xét cách phần việc ấy được hiểu.",
        "evidenceIds": ["e3", "e10", "ec", "ep"],
        "scope": "editorial-symbolic"
      },
      {
        "claimId": "career-cooperation-shared-responsibility",
        "plainText": "Khi đọc thêm quan hệ cộng tác, sự phối hợp bổ sung cho trọng tâm công việc: phần việc của mỗi bên được đặt trong trách nhiệm chung, thay vì chỉ được xem riêng lẻ.",
        "evidenceIds": ["e3", "e10", "e11", "ec", "ep"],
        "scope": "editorial-symbolic"
      }
    ]
  }
}
```

S2 (attach all B; one approved editorial selection, not a new chart):

```json
{
  "readingId": "r02-sample-2",
  "conclusion": {
    "claimId": "career-summary-one",
    "plainText": "Trách nhiệm và cách hiểu phần việc là trọng tâm của phần đọc Công việc.",
    "evidenceIds": ["e3", "e10", "e11", "ec", "ep"],
    "scope": "editorial-symbolic"
  },
  "insights": [
    {
      "id": "i1",
      "claimId": "career-combined-one",
      "title": "Trách nhiệm, thông tin và cộng tác",
      "plainText": "Phần đọc đặt việc đảm nhận trách nhiệm cạnh cách thông tin được trình bày và hiểu rõ. Sự phối hợp bổ sung vào đó cách mỗi bên tham gia phần việc chung.",
      "evidenceIds": ["e3", "e10", "e11", "ec", "ep"],
      "scope": "editorial-symbolic",
      "deduplicationKey": "career:combined:Quan:Thái Dương+Cự Môn:Nô:Thiên Tướng",
      "priority": "primary",
      "rankingReasons": ["topic-match", "approved-primary-rule"],
      "exclusionIds": []
    }
  ],
  "topicReading": {
    "topic": "career",
    "state": "supported",
    "paragraphs": [
      {
        "claimId": "career-combined-one",
        "plainText": "Phần đọc đặt việc đảm nhận trách nhiệm cạnh cách thông tin được trình bày và hiểu rõ. Sự phối hợp bổ sung vào đó cách mỗi bên tham gia phần việc chung.",
        "evidenceIds": ["e3", "e10", "e11", "ec", "ep"],
        "scope": "editorial-symbolic"
      }
    ]
  }
}
```

S3 (E + S3; no evidence pool, no fabricated reading):

```json
{
  "readingId": "r02-sample-3",
  "status": "insufficient-evidence",
  "validation": {
    "reasons": ["insufficient-context", "mock-only"],
    "message": "Chưa đủ căn cứ để luận giải Công việc. Phần này không tạo kết luận riêng hoặc lời khuyên thay thế.",
    "schema": "not-run",
    "grounding": "demonstration-only",
    "contradictionReview": "not-evaluated-domain-gap",
    "independentVerificationRef": null
  }
}
```

S4 (E + S2 + S4; same B, excerpt demonstration with no full-chart verification):

```json
{
  "readingId": "r02-sample-4",
  "dataOrigin": "demonstration",
  "verificationStatus": "unverified",
  "validation": {
    "reasons": ["mock-only"],
    "message": "Bản minh họa để duyệt cách viết, không phải luận giải cá nhân đã xác minh.",
    "schema": "not-run",
    "grounding": "demonstration-only",
    "contradictionReview": "not-evaluated-domain-gap",
    "independentVerificationRef": null
  }
}
```

Demonstration excerpt is allowed to carry structural-mock evidence ONLY in
documentation/demo validation mode, with null calculation metadata and
grounding=demonstration-only. Production validation rejects it. A future fully
calculated demonstration must carry real metadata/signals, remain unverified and
still keep its visible demo label. No sample is an executable production ready fixture.

## Cần người dùng duyệt

1. Cách viết mẫu 1 có đủ rõ và khác robot không, hay vẫn chỉ là diễn đạt biểu tượng?
2. Giữ hai insight hay một insight như mẫu 2 để tránh lặp?
3. Có chấp nhận sự ngắn gọn và trạng thái thiếu căn cứ như mẫu 3?
4. Nhãn minh họa và mục căn cứ có làm rõ giới hạn không?

Chưa tuyên bố chất lượng cải thiện. Thiếu mẫu đối chiếu từ các chart khác nhau để
nghiệm thu Swap Test/phân biệt lá số; cần bổ sung dữ liệu có provenance đúng profile
hoặc các output engine minh họa được gắn nhãn riêng, không làm oracle cho engine.
