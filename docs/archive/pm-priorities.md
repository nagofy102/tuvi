# Nghiệm thu ba ưu tiên PM

Ngày 13/10/2026, nền `241c2c8`, thay đổi chưa commit. Node 24.19.0, Next.js production,
Chromium hệ thống. Đây là kiểm tra phần mềm và hồ sơ giả lập, không phải người dùng
thật hoặc chứng nhận chuyên môn độc lập.

## Kết quả đã chạy

- Typecheck/build qua; build giữ kiểm tra tái tạo engine và 35 tài nguyên prerender.
- Unit: **166/166**, 11 file. Gồm consent bắt buộc, chỉ lưu input, giờ null, giờ sai,
  ngày tương lai/không tồn tại, JSON/version/hồ sơ lỗi, quá kích thước, quá 10 hồ sơ,
  trùng ID; bảo toàn tháng nhuận và lựa chọn giờ Tý.
- E2E production: **20/20**, 33,9 giây. Lưu phải có đồng ý; reload không tự mở thông
  tin cá nhân; mở lại tính đúng luồng; xóa bỏ key lưu trữ; không POST dữ liệu sinh.
  Giờ chưa biết không có chart/theme, lưu null, mở lại vẫn chưa biết, nhập giờ thật
  mới sinh lá số. Ngày tương lai ẩn bản đọc cũ và không có nút lưu; storage bị chặn
  không báo lưu thành công. Mobile 320px/chữ cực lớn không tràn ngang.
  Hai hồ sơ giữ ngày sinh riêng; dữ liệu JSON hỏng xóa được rồi tra cứu/lưu lại.
  Luồng chưa biết giờ rồi nhập sai không gắn tên mới cho lá số cũ.
- Hồi quy popup/Escape/focus, nguồn, nhóm chưa kích hoạt, lịch tháng nhuận 1985,
  axe A/AA và chữ AAA, SEO/JSON-LD/PNG/sitemap/404 đều giữ assertion và qua.
- Auto-diff: **24/24 ca từng phần, 146 trường, 0 sai lệch**; không sửa oracle/engine.
- Format và whitespace qua. Không chạy lại audit lịch dài 1950–2026 vì engine không đổi.

E2E đầu bị chặn vì server trải nghiệm cũ còn tiến trình con trên port 3000. Đã xác
minh PID/start time thuộc server do AI khởi động ở lượt trước, dừng đúng tiến trình
đó và chạy lại trên build mới; không bật reuseExistingServer hoặc bỏ assertion.

## Trải nghiệm lại cùng 8 hồ sơ

Raw JSON/ảnh nằm trong `test-results/pm-priorities-persona-review/` (ignored).
Tám cấu hình dùng cùng ngày sinh/giới tính/giờ/chính sách và viewport như lượt đánh
giá trước: người trẻ, trung niên, lớn tuổi, tháng nhuận và giờ Tý.

- 8/8 tạo bản đọc; không pageerror/POST được ghi nhận trong các session.
- Đoạn đầu mỗi chủ đề có **7 biến thể/8 cấu hình** thay vì 1. Hai đoạn đầu có 8/7/8
  biến thể cho công việc/tài chính/đồng hành. Không ép các lá số có dữ kiện giống nhau
  phải khác nội dung; không coi số biến thể là xác nhận độ đúng dự báo.
- Với cùng hồ sơ 1961 nữ, 320px và chữ cực lớn: chiều cao bản đọc mặc định từ khoảng
  **22.596px xuống 4.874px** (giảm khoảng 78%); vị trí bắt đầu trên tài liệu từ 6.037px
  xuống 3.503px. Đo trước khi mở thêm nguồn/bài tập/12 cung, không phải chiều dài bản
  in đầy đủ, không áp dụng cho mọi cấu hình. Bản đọc đứng trước lá số.
- 390px: khoảng 9.857–10.437px trước thành 2.516–2.549px; không document overflow.
- Reload không lưu vẫn về demo là hành vi riêng tư chủ ý. E2E riêng đã xác nhận
  reload sau đồng ý lưu cho phép mở hồ sơ lại. Script persona giữ ca thiếu giờ trống
  theo luồng giờ bắt buộc; luồng checkbox “Chưa biết giờ sinh” được kiểm tra trong E2E.

## Giới hạn và bước tiếp theo

Chưa thử người dùng thật, mọi trình duyệt/screen reader, xung đột hai tab đồng thời
hay khôi phục sau xóa dữ liệu website. Chưa đo Lighthouse; Performance >90 vẫn mở.
Lưu cục bộ không mã hóa/không sync; chưa có xác định giờ sinh hoặc luận hạn.
Nội dung riêng hóa vẫn là dữ kiện lá số và kết nối biên tập có nguồn, không phải
chứng nhận tính cách hay dự đoán sự kiện. Các kết quả trên được ghi trước commit/push.
