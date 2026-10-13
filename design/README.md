# Design context

## Mục đích

Lưu yêu cầu sản phẩm, hành trình sử dụng, hệ thống thiết kế và quyết định UI/UX.
AI tiếp tục công việc cần đọc file này trước, rồi đọc tài liệu được liên kết.

## Trạng thái

- Bước 1: yêu cầu và ranh giới tính năng đã được ghi nhận trong `product-spec.md`.
- Bước 2: landing page và widget 12 cung đã có component React chạy được.
- Có biểu mẫu đổi lịch, chế độ biểu đồ/danh sách, giải thích sao qua dialog,
  đổi cỡ chữ, reduced motion, CTA mobile và in qua trình duyệt.
- Thiết kế giấy lụa, xanh đậm, vàng trầm; bộ font Việt hóa phục vụ từ cùng website.
- Kiểm tra tương phản và Lighthouse được ghi ở `../test/README.md`.
- Lộ trình giữ chân đã lưu; phần lớn vẫn là đề xuất. Người dùng đã cho phép nghiên cứu AI
  và triển khai bản luận giải tham khảo tổng quát/chi tiết, chưa thẩm định độc lập.
- Sau khi lập lá số thành công có bản đọc theo dữ kiện thật, 12 cung mở rộng và nguồn.
  Lần nhập thất bại ẩn luận giải cũ; bản đọc minh họa có nhãn rõ và mở theo yêu cầu,
  module luận giải được tải riêng để giảm chi phí lần vào trang đầu.

## Tài liệu

- `competitor-mobile-review.md`: khảo sát AItuvi/HOROS/Mèo Béo (tuvi.dev trả 403),
  quyết định UI mobile đã triển khai, key SEO và khoảng trống luận giải chưa code.

- `../dev/pm-priorities.md`: bản đọc ngắn trước lá số, mở đầu theo dữ kiện riêng, giờ chưa biết và hồ sơ cục bộ có đồng ý; xem nghiệm thu tại `../test/pm-priorities.md`.

- `reading-style-policy.md`: ba mạch đọc xuyên cung, chuẩn hành vi tự kiểm chứng và prompt biên tập cục bộ; lá số nay dùng navy/vàng theo yêu cầu mới.

- `interpretation-milestones.md`: mốc 2–3 có giới hạn, hồ sơ nguồn và nhóm chờ kích hoạt.

- `product-spec.md`: trải nghiệm, màu sắc, khả năng tiếp cận và tiêu chí sản phẩm.
- `retention-roadmap.md`: ưu tiên chức năng, yêu cầu BA, chỉ số và lộ trình đề xuất; chưa triển khai.
- `chart-validation-plan.md`: kế hoạch thẩm định gốc; seam lịch hiện đã triển khai,
  các mốc kiểm chứng chuyên môn còn mở.
- `../dev/ai-interpretation-research.md`: lựa chọn AI/mã nguồn mở và điều kiện chất lượng cho luận giải.
- `../dev/interpretation-implementation.md`: phạm vi luận giải đã triển khai và kiểm chứng thực tế.
- `../dev/interpretation-sources.md`: tài liệu cổ đã đọc, chủ đề sao và khác biệt quy tắc.
- `../dev/architecture.md`: cấu trúc ứng dụng và trách nhiệm từng module.

## Bước tiếp theo

Mốc 2–3 có hồ sơ truy nguồn và 24 ca đối chiếu từng phần. Đã mở nhóm Tả–Hữu/Xương–Khúc,
Tử Vi với hỗ trợ, Mệnh–Thân và tam phương tứ chính có “Vì sao”. Khôi–Việt/cách cục/vận hạn
chưa kích hoạt; chưa có chứng nhận độc lập. Xem `interpretation-milestones.md` và
`../test/knowledge-validation.md`.

Mốc 1 kỹ thuật của lộ trình PM mới nhất đã sửa tích hợp lịch Việt Nam và qua audit; xem
`../dev/calendar-remediation.md` và `../test/calendar-remediation.md`.
Việc này không mở rộng luận giải hoặc xác nhận trường phái bởi chuyên gia.

Kiểm tra thêm với người dùng 35–65+ tuổi và thiết bị thực. Lá số ban đầu có nhãn minh họa;
sau khi gửi biểu mẫu, giao diện hiển thị kết quả thật theo cấu hình iztro đã công bố,
cùng giới hạn thẩm định chuyên môn. Không có điểm phần trăm hoặc lời phán hạn giả.

## Component chính

- `../src/components/landing-experience.tsx`: hành trình, form và trạng thái kết quả.
- `../src/components/horoscope/chart-widget.tsx`: 12 cung, danh sách, sao và dialog.
- `../src/components/calendar-converter.tsx`: công cụ chuyển lịch độc lập.
- `../src/app/globals.css`: tokens, responsive, contrast, print và reduced motion.
