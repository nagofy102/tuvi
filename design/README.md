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
- Lộ trình giữ chân đã lưu; chưa được phê duyệt triển khai. Người dùng sẽ quyết định code sau
  và muốn ưu tiên nghiên cứu luận giải chất lượng cao.

## Tài liệu

- `product-spec.md`: trải nghiệm, màu sắc, khả năng tiếp cận và tiêu chí sản phẩm.
- `retention-roadmap.md`: ưu tiên chức năng, yêu cầu BA, chỉ số và lộ trình đề xuất; chưa triển khai.
- `chart-validation-plan.md`: phương án xử lý giới hạn lịch, 5 mốc thẩm định an sao và điều kiện nghiệm thu; chưa triển khai.
- `../dev/ai-interpretation-research.md`: lựa chọn AI/mã nguồn mở và điều kiện chất lượng cho luận giải.
- `../dev/architecture.md`: cấu trúc ứng dụng và trách nhiệm từng module.

## Bước tiếp theo

Kiểm tra thêm với người dùng 35–65+ tuổi và thiết bị thực. Lá số ban đầu có nhãn minh họa;
sau khi gửi biểu mẫu, giao diện hiển thị kết quả thật theo cấu hình iztro đã công bố,
cùng giới hạn thẩm định chuyên môn. Không có điểm phần trăm hoặc lời phán hạn giả.

## Component chính

- `../src/components/landing-experience.tsx`: hành trình, form và trạng thái kết quả.
- `../src/components/horoscope/chart-widget.tsx`: 12 cung, danh sách, sao và dialog.
- `../src/components/calendar-converter.tsx`: công cụ chuyển lịch độc lập.
- `../src/app/globals.css`: tokens, responsive, contrast, print và reduced motion.
