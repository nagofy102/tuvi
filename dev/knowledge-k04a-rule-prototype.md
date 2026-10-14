# HV-K04A — Bounded methodology-rule evaluator prototype

Ngày nghiên cứu: 14/10/2026. Trạng thái: **RESEARCH PROTOTYPE; FAIL-CLOSED**.
Artifact này thử biểu diễn và đánh giá hai candidate rule K03A trên ontology K03B.
Nó không phải runtime, không tạo claim luận giải và không thay đổi production.

## Phạm vi và dependency

Chỉ dùng hai rule đã có:

- `k03a-career-context-order-001`: thứ tự ngữ cảnh Mệnh–Thân, sau đó
  Thiên Di–Tài Bạch–Quan Lộc;
- `k03a-empty-menh-tai-quan-001`: khi Mệnh không có chính diệu trực tiếp, yêu cầu
  có ngữ cảnh Tài Bạch và Quan Lộc trước khi tiếp tục.

Hai rule cùng dựa trên quyển ba, revision `2268626`, cùng một textual family chưa
được xác định hệ phái. K04A không dùng kết quả chưa tích hợp của K02B/K03A2 và không
tạo quan hệ Tử Vi mới.

## Kiểm tra vocabulary và profile

Tên năm cung cần dùng đã xác định được như entity. Bốn thành phần vẫn chưa đủ chuẩn:

1. catalogue `principal-star` và ý nghĩa “an trực tiếp tại cung” chưa có version;
2. miếu/vượng và phân loại cát/hung chưa có vocabulary/profile đã review;
3. tam phương, hình/xung/khắc/phá chưa có geometry/version đã review;
4. `profile-unresolved` của nguồn chưa ánh xạ được với
   `nam-phai-chinese-lunar-v1`.

Do đó, một tập fact có đủ hình dạng vẫn không được admit. `fired-for-research-review`
chỉ có nghĩa predicate cấu trúc đã khớp; evaluator vẫn từ chối bởi profile và vòng
đời rule. Với rule Mệnh vô chính diệu, thiếu vocabulary `principal-star` khiến phủ
định “không tồn tại” mang trạng thái `missing`, tuyệt đối không được coi là `matched`.

## Mô hình evaluator

Evaluator thuần xác định đi qua các gate theo thứ tự:

1. chọn đúng candidate và pin version;
2. resolve toàn bộ fact/vocabulary cần thiết;
3. đánh giá conditions và exclusions (`matched`, `not-matched`, `missing`);
4. resolve source/passage/revision;
5. kiểm tra calculation/rule profile;
6. kiểm tra lifecycle admission;
7. kiểm tra conflict.

Unknown hoặc đánh giá một phần đều fail-closed. Condition thiếu fact tạo
`insufficient-evidence`; exclusion bị vi phạm tạo `blocked`; profile chưa ánh xạ tạo
`unsupported-profile`; candidate chưa được duyệt luôn thêm `unapproved-rule`.
Không outcome nào của K04A được chứa `allowedClaimIds`.

```text
candidate
  -> predicates missing/failed -> rejected -> fail-closed trace
  -> predicates structurally matched -> fired-for-research-review
       -> profile unresolved or lifecycle unapproved -> rejected
       -> no reader-facing claim
```

`knowledge-k04a-rule-prototype.json` lưu rule shape, evidence và gate policy.
`../test/knowledge-k04a-rule-cases.json` có sáu input tổng hợp, gồm positive-shape,
negative, missing-vocabulary và forbidden-substitution cases. Chúng chỉ kiểm tra
evaluator semantics, không phải oracle Tử Vi.

## Mức tri thức đạt được

- **Passage traceability:** đạt trong phạm vi hai passage đã pin revision.
- **Ontology fit:** đủ để mô hình conditions, exclusions, evidence và trace outcome.
- **Executable domain rule:** chưa đạt vì predicate vocabulary/profile chưa resolve.
- **Production admission / claim:** không được phép và không có đường phát sinh.

Prototype phát hiện một giới hạn contract: ontology K03B yêu cầu
`allowedClaimKinds` có ít nhất một phần tử, trong khi rule phương pháp không được tạo
claim. K04A giữ artifact riêng thay vì sửa schema dùng chung. K03B cần PO/Architect
quyết định bổ sung loại `methodology-rule` hoặc tách rule điều phối khỏi claim rule.

## Blocker và điều kiện tiếp tục

1. K03A2 phải cung cấp vocabulary versioned cho chính tinh trực tiếp, trạng thái và
   hình học liên cung, kèm locator/profile; không được suy từ tên trường engine.
2. BA phải định nghĩa quan hệ giữa source rule profile và calculation profile; chưa
   ánh xạ thì giữ `profile-mismatch`.
3. Cần quyết định schema cho methodology rule không phát claim.
4. Không triển khai evaluator production trước khi rule lifecycle được PO duyệt.

Stop state: **WAITING FOR K03A2 VOCABULARY/PROFILE AND PO ONTOLOGY DECISION**.
