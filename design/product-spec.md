# Product and design specification

## Phạm vi và hành trình 30 giây

Đối tượng chính: người dùng 35–65+ tuổi; hỗ trợ người dùng 20–34 tuổi.
Phong cách huyền học sang trọng, điềm tĩnh, dễ đọc, tránh gây sợ hãi bằng lời phán vận hạn.

1. Trang đầu giải thích ngắn gọn giá trị và hiển thị ngay biểu mẫu.
2. Người dùng nhập tên tùy chọn, ngày sinh, loại lịch, giờ sinh và giới tính dùng cho quy tắc truyền thống.
3. Xác nhận ngày âm/dương, múi giờ và tháng nhuận trước khi lập lá số.
4. Hiển thị huy hiệu ngũ hành, mệnh chủ và lá số trước phần giải thích dài.
5. Cho phép mở từng cung, đọc thêm, lưu, xuất hoặc chia sẻ với lựa chọn rõ ràng.

Mục tiêu <1 giây áp dụng từ lúc gửi dữ liệu hợp lệ đến kết quả xác định bằng bộ tính
sau khi tài nguyên đã tải; đo trên thiết bị và cấu hình mạng đại diện ở Bước 3.
Không phụ thuộc phản hồi AI để hiển thị kết quả đầu tiên.

## Hệ thống thiết kế

| Token | Giá trị | Mục đích |
| --- | --- | --- |
| dark-background | `#0F172A` | Nền tối chính |
| light-background | `#FDFBF7` | Nền sáng giấy lụa |
| gold | `#D4AF37` | Viền, họa tiết, nhấn |
| vermilion | `#DC2626` | Nhấn phụ |
| jade | `#059669` | Nhấn phụ |

Không mặc định các màu nhấn đạt tương phản khi dùng làm chữ. Kiểm tra từng cặp màu;
chọn biến thể chữ riêng để đạt AAA cho văn bản thường (7:1), chữ lớn (4.5:1).
Điều khiển và focus đạt ít nhất 3:1. Không dùng màu làm dấu hiệu duy nhất.

- Font: Be Vietnam Pro hoặc Inter, 18px mặc định; tùy chọn Normal/Large/Extra Large.
- Mục tiêu chạm ít nhất 48×48px; focus rõ, label luôn hiện, thông báo lỗi gắn với input.
- CTA mobile gần đáy, có safe-area, không che nội dung hoặc bàn phím.
- Biểu đồ có thứ tự đọc và bảng văn bản tương đương cho trình đọc màn hình.
- Tooltip phải mở được bằng chạm và bàn phím; Escape đóng; hover chỉ là bổ sung.
- Framer Motion tôn trọng `prefers-reduced-motion`; không trì hoãn kết quả để chạy animation.
- Điều khiển đổi cỡ chữ dễ tìm; thử ở zoom 200% và màn hình 320px.

## Giới hạn nội dung và tính năng

- Ba thẻ Tài lộc/Sự nghiệp/Tình duyên: chỉ hiện phần trăm khi có mô hình chấm điểm
  được công bố và phiên bản hóa. Đây là chỉ số diễn giải, không phải xác suất dự đoán.
  Trong lúc chưa có mô hình, hiện “Chưa có đánh giá”; không tạo số ngẫu nhiên.
- Lời khuyên tháng dựa trên nguồn và quy tắc đã duyệt, trình bày bình tĩnh, không cam kết tương lai.
- AI phải dựa trên lá số đã tính, ghi rõ nội dung tham khảo; tích hợp thực ở giai đoạn sau.
- Export PNG/PDF và PWA là yêu cầu đã ghi nhận, chưa được triển khai trong Bước 1.
- SEO theo năm sinh × giới tính dùng nội dung biên tập riêng; lá số cá nhân mặc định riêng tư.

## Nghiệm thu UI ở Bước 2

Landing page và widget 12 cung hoạt động ở mobile/tablet/desktop; tương tác bàn phím,
cỡ chữ và reduced motion được kiểm tra. Dữ liệu mẫu có nhãn rõ; không giả lập bộ tính như đã hoàn thành.
Lighthouse >90 cho Performance/SEO/Accessibility là mục tiêu nghiệm thu bản production,
chưa phải kết quả hiện tại.
