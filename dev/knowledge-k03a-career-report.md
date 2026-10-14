# HV-K03A — Career domain extraction

Ngày nghiên cứu: 14/10/2026. Trạng thái: **DOMAIN PASSAGE/RULE REVIEW REQUIRED**.

## Kết quả

K03A mở trực tiếp hai revision Wikisource và ghi nhận năm passage giới hạn. Bốn
passage đủ locator để tạo ba rule candidate nghiên cứu; passage Nô Bộc còn lại bị
loại khỏi extraction. Không rule nào được duyệt cho production hoặc bản đọc người
dùng.

| Candidate                       | Nội dung nguồn cho phép giữ                                                | Trạng thái                                              |
| ------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------- |
| `k03a-career-context-order-001` | Xét Mệnh, Thân rồi Thiên Di–Tài Bạch–Quan Lộc và quan hệ xung/khắc         | Candidate, chưa có family độc lập và vocabulary/profile |
| `k03a-empty-menh-tai-quan-001`  | Mệnh vô chính diệu cần xét Tài–Quan và hội chiếu                           | Candidate, chưa đủ định nghĩa để chạy                   |
| `k03a-tianxiang-quan-001`       | Thiên Tướng có biểu tượng Quan Lộc/ấn; kết quả đổi theo điều kiện phối hợp | Blocked cho reader-facing output                        |

Kết quả quan trọng là nguồn hiện đọc **không** hỗ trợ trục Mệnh–Quan–Nô mà sản phẩm
đang dùng như một phép tổng hợp biên tập. `談星要論` nêu Mệnh–Thân rồi bộ
Thiên Di–Tài Bạch–Quan Lộc. Nô Bộc chỉ xuất hiện trong mảnh luận riêng theo sao,
không đủ để tạo cạnh liên cung hoặc luận Công việc. K03A vì vậy giữ gap này ở
`blocked`, không nối các mô tả sao để bù.

## Nguồn và kiểm tra thực tế

- `紫微斗數全書/卷一`, revision `7913704`: MediaWiki API trả HTTP 200; các locator
  thuộc `諸星問答論`, mục Tử Vi và Thiên Tướng.
- `紫微斗數全書/卷三`, revision `2268626`: MediaWiki API trả HTTP 200; locator
  `談星要論`. Đây là record mới ở artifact K03A, chưa được nhập registry dùng chung.
- API `siteinfo.rightsinfo` trả CC BY-SA 4.0. Artifact chỉ giữ trích dẫn ngắn;
  tình trạng văn bản nền và identity ấn bản vẫn theo caveat K01.
- Hai volume thuộc cùng `zwds-quanshu-textual-lineage-unresolved`, vì vậy không
  được tính là hai family độc lập và không chứng nhận Nam Phái.

## Giới hạn suy luận

- Câu cổ về quan tước, phú quý hoặc kết quả đời sống không được chuyển thành năng
  lực, hành vi, nghề nghiệp hay kết quả hiện đại của người đọc.
- Các khái niệm miếu/vượng, hóa cát/kỵ, hình/xung/khắc/phá và “tam phương” chưa có
  vocabulary/profile được duyệt trong slice này. Thiếu trường tương ứng phải fail closed.
- Passage Tử Vi có cụm “三宮” cần đối chiếu văn bản học; paraphrase hiện chỉ là ghi
  chú nghiên cứu, không phải bản dịch authoritative.
- Không có nguồn family độc lập, worked chart hay test oracle. Các case JSON chỉ
  kiểm tra shape/gate dự kiến, không kiểm chứng Tử Vi.

## Truy vấn và nguồn đã kiểm tra nhưng chưa giải blocker

Đã tìm giới hạn qua MediaWiki API với các cụm `官祿宮 命宮 奴僕 紫微斗數`,
`官祿 命 奴僕 紫微斗數` và dạng giản thể. Kết quả hữu quan chủ yếu quay về cùng
`紫微斗數全書`; các kết quả `星學大成`, `星命溯源`, `張果星宗` và
`古今圖書集成` thuộc hệ thống tinh mệnh khác, không được nhập làm Tử Vi Đẩu Số.
Các biểu ghi Open Library K01 chỉ có metadata, không có page-level access hợp pháp,
nên không được dùng làm passage. Internet Archive facsimile vẫn blocked về rights
và bibliographic identity.

## Điều kiện để tiếp tục K04

1. PM review việc bổ sung revision quyển ba vào Source Registry; chưa ingest tự động.
2. BA khóa vocabulary/profile cho trạng thái cung, hội chiếu và quan hệ tam phương.
3. Tìm ít nhất một family độc lập có passage page-level cho phương pháp Quan Lộc;
   nếu không có, giữ `not-independently-confirmed`.
4. Muốn dùng Nô Bộc trong luận Công việc phải có passage nêu rõ quan hệ, điều kiện,
   ngoại lệ và phạm vi; không dùng mảnh biểu tượng riêng lẻ.
5. Chỉ sau review mới chọn tối đa rule units cho K04A; K03A không approve rule.

Không phát hiện nhu cầu mua một nguồn cụ thể đủ căn cứ ở vòng này. Chỉ nên trình PO
khi xác định được ấn bản, mục lục/trang Quan Lộc, quyền nghiên cứu và không có bản
hợp pháp miễn phí tương đương.
