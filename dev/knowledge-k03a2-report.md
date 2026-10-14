# HV-K03A2 — Deep career-domain extraction

Ngày nghiên cứu: 14/10/2026. Trạng thái: **RESEARCH COMPLETE; RULE ADMISSION BLOCKED**.

## Kết quả ngắn

K03A2 xác minh lại hai revision đã ghim của `紫微斗數全書` và trích năm passage
phục vụ **phương pháp luận**, không phục vụ luận cá nhân. Hai rule candidate có thể
được dùng để thử cơ chế evaluator/inference trace ở K04A, nhưng chưa đủ điều kiện
đưa vào production:

1. Xét Mệnh, rồi Thân, sau đó Di–Tài–Quan; không tự thay Tài bằng Nô.
2. Giữ tín hiệu hỗ trợ và đối nghịch; khi thiếu vocabulary hoặc chưa có quy tắc
   phân xử thì fail closed, không đếm số sao và không tự tạo điểm trung bình.

Không tìm thấy nguồn family độc lập có passage hợp pháp ở mức trang/đoạn. Vì vậy
`source-backed-not-independent` là mức cao nhất đạt được. Không rule nào được nâng
thành `approved-for-implementation`, và không có claim reader-facing mới.

## Bằng chứng thực tế

| Nguồn               | Revision / locator                                                | Kiểm tra                                          | Giá trị và giới hạn                                                                                                             |
| ------------------- | ----------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `紫微斗數全書/卷三` | `2268626`, `談星要論` dòng 7–23; `論男女命同異` dòng 78           | MediaWiki API HTTP 200; SHA-256 wikitext được lưu | Nêu thứ tự Mệnh–Thân → Di–Tài–Quan và yêu cầu xét bối cảnh; phần dòng 78 mang giới tính lịch sử nên chỉ là corroboration nội bộ |
| `紫微斗數全書/卷一` | `7913704`, `斗數發微論` dòng 127–132; `重補斗數彀率` dòng 153–155 | MediaWiki API HTTP 200; SHA-256 wikitext được lưu | Nêu tam phương/tứ chính, đối/hợp chiếu và không đọc polarity đơn lẻ; không định nghĩa geometry, precedence hoặc trọng số        |

API `siteinfo.rightsinfo` trả CC BY-SA 4.0 cho Wikisource. Artifact chỉ giữ trích
dẫn tối thiểu và attribution/revision. Quyền của văn bản nền cùng identity ấn bản
vẫn chưa được giải quyết. Hai volume cùng
`zwds-quanshu-textual-lineage-unresolved`, nên không được tính là độc lập.

## Passage bị loại và truy vấn không giải được blocker

- Trang Wikisource `紫微斗數`, revision `8061095`, có cụm “tam phương tứ chính”
  nhưng trộn thuật ngữ Bát Tự và một hệ sao khác. Profile/lineage không tương thích
  nên không được dùng làm family độc lập.
- Các record sách Việt ở Open Library chỉ có metadata, không có full text/page
  locator hợp pháp; không được biến mục lục hoặc nhan đề thành rule.
- Facsimile Internet Archive vẫn thiếu rights và bibliographic identity; OCR không
  phải nguyên văn chuẩn và không được tính là family khác.
- Tìm kiếm MediaWiki giới hạn với `命身 財帛 官祿 遷移`, `三方 官祿 命宮` và
  `命宮 身宮 官祿宮` chủ yếu quay lại cùng `紫微斗數全書`. Kết quả thuộc
  `星學大成`, `張果星宗` hoặc `古今圖書集成` không được nhập vì là hệ tinh mệnh
  khác, chưa chứng minh tương thích với Tử Vi Đẩu Số đang xét.

## Rule candidate và giới hạn thực thi

### `k03a2-method-context-order-001`

- Chỉ sinh trace về nhóm fact đã xét/thiếu.
- Bắt buộc Mệnh, Thân, Thiên Di, Tài Bạch, Quan Lộc cùng profile và vocabulary.
- Không thêm Nô Bộc, không sinh hành vi/năng lực/nghề nghiệp/kết quả.
- Thiếu fact hoặc lệch profile phải từ chối rõ ràng.

### `k03a2-method-context-conflict-001`

- Không cho tín hiệu thuận ở một cung tự động vượt qua tín hiệu đối nghịch liên cung.
- Lưu cả accepted/opposing signals trong trace.
- Khi không có precedence có nguồn, trả `deferred-conflict`; không dùng số đông,
  trọng số hoặc tự hòa giải.

Hai rule này là specification nghiên cứu cho K04A. K04A có thể thử evaluator shape,
quan hệ, rejection và trace, nhưng không được gọi chúng là rule luận giải đã duyệt.

## Blocker

1. Chưa có family độc lập cho cùng phương pháp.
2. Chưa có vocabulary/profile versioned cho miếu/vượng, hóa cát/kỵ, hình/xung/
   khắc/phá, tam phương/tứ chính, đối/hợp chiếu.
3. Chưa có passage nối Mệnh–Quan Lộc–Nô Bộc; quan hệ này tiếp tục `blocked`.
4. Chưa có quy tắc có nguồn để phân xử tín hiệu trái chiều; chỉ được phép defer.
5. Bản dịch/paraphrase cần review văn bản học trước khi dùng ngoài nghiên cứu.

## Artifact và khả năng tái lập

- `knowledge-k03a2-passages.json`: source, digest, locator, passage, điều kiện và
  giới hạn.
- `knowledge-k03a2-rules-candidate.json`: hai rule phương pháp và explicit gaps.
- `../test/knowledge-k03a2-rule-cases.json`: tám structural cases; không phải oracle
  Tử Vi.

Kiểm tra artifact phải xác nhận source/passage/rule/case reference, ID duy nhất,
không có rule approved, mọi case chỉ kỳ vọng method-state và không sinh claim.

## Điểm dừng

K03A2 dừng ở mức **source-backed method candidates, not independently confirmed**.
PO cần quyết định vocabulary/profile hoặc hướng tìm/mượn ấn bản có page locator từ
family khác trước khi rule có thể được xem xét admission. Không có đề xuất mua một
nguồn cụ thể ở vòng này vì chưa xác định được ấn bản trả phí với mục lục, quyền
nghiên cứu và passage phù hợp đủ rõ.
