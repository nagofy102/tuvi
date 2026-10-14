# HV-K01C-Lite — Source Registry acceptance plan

Đây là kế hoạch nghiệm thu schema/tài liệu, chưa phải validator production.

## Acceptance criteria

1. JSON của registry parse được và khai báo đúng schema version.
2. Source IDs, Passage IDs và Review IDs không trùng.
3. Mọi `passage.sourceId` resolve đến source có thật.
4. Mọi source có scope, school claim state, access, rights, provenance, family,
   status và limitation; không có paid source được admit thiếu PO review.
5. `approved-for-implementation` phải có review event tương ứng; initial registry
   không có record ở trạng thái này.
6. `blocked`/`disputed` không được dùng làm independent oracle hoặc production rule.
7. Hai record cùng source/implementation family không được đếm là độc lập.
8. Rights `unknown`/`restricted` không cho `full-text-open` passage.
9. Schema chặn unknown fields; URL nguồn phải dùng HTTPS.
10. Mapping không mở rộng phạm vi admission của legacy `source-registry.json`.

## Negative/mutation cases for a future validator

| Mutation                                                | Expected result            |
| ------------------------------------------------------- | -------------------------- |
| Passage trỏ source không tồn tại                        | reject dangling reference  |
| Xóa rights hoặc independence                            | schema reject              |
| Gắn facsimile blocked thành independent oracle          | grounding/policy reject    |
| Đếm n72 và n74 thành hai source family                  | independence review reject |
| `full-text-open` với rights unknown                     | policy reject              |
| Tự gắn `approved-for-implementation` không review event | lifecycle reject           |
| Thêm field lạ                                           | schema reject              |
| Đổi revision mà giữ nguyên review                       | provenance review reject   |

## K01 exit gate

K01C-Lite đạt mức **contract baseline** khi JSON parse, formatting/diff checks qua và
review thủ công xác nhận mapping không mở admission. Nó không đạt mức runtime
validation cho đến khi validator riêng được PO cho phép triển khai.
