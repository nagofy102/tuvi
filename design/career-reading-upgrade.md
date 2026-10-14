# Nâng cấp bản đọc Công việc — luận trước, khuyên sau

Ngày: 14/10/2026 (Asia/Saigon). Baseline: `61b1dc6`.

## Phạm vi được giao

Người dùng chốt năm tiêu chí: luận trước lời khuyên; tổng hợp có căn cứ; tách
bản đọc/căn cứ/thực hành; không mặc định hoàn cảnh nghề nghiệp; nghiệm thu bằng
sự khác biệt có ý nghĩa giữa các cấu trúc lá số. Triển khai Công việc trước,
không tự mở rộng luận sâu Tài chính/Tình cảm khi gói này chưa được kiểm tra.

PM điều phối; BA/chuyên môn chịu trách nhiệm hợp đồng tri thức; DEV triển khai;
QA đối chiếu văn bản, điều kiện và giao diện. Đây là các vai trò AI, không phải
chứng nhận từ chuyên gia độc lập.

## Vấn đề cần sửa

Bản v6 ghép danh sách chính tinh ở Mệnh/Quan Lộc/Nô Bộc với bài tập chọn từ hai
boolean nhóm phụ tinh. Người đọc không thấy cầu nối giữa dữ kiện và lời khuyên.
Tiêu đề và thân bài vì vậy giống checklist công việc, mặc định có người giao việc
và không thể hiện rõ khác biệt chính tinh. Đối thủ tuvi.vn gợi ý cách tổ chức tổng
quan/mục lục/cung/nguồn; không lấy lời luận hoặc quy tắc pha trộn của họ làm nguồn
Nam phái. Không lưu thông tin cá nhân trong URL khảo sát vào tài liệu.

## Tiêu chí phát hành

- Luận điểm chính bắt đầu từ chính tinh và vai trò các cung; hai cặp phụ tinh
  hiện hữu chỉ bổ sung góc đọc, không quyết định toàn bộ chủ đề.
- Phân biệt dữ kiện vị trí, nghĩa biểu tượng đã đọc và phần kết nối do dự án
  biên tập. Không gọi phép nối biểu tượng là tổ hợp cổ được kiểm chứng.
- Mỗi luận điểm có nguồn, điều kiện và giải thích; thiếu nguồn/điều kiện thì
  không phát nhận định. Không suy nghề nghiệp, năng lực, tính cách chắc chắn từ
  sao riêng lẻ, độ sáng hoặc Tứ Hóa.
- Thân bài không chứa bài tập, câu hỏi ghi chép hoặc lời khuyên quản lý dự án.
  Hai mục “Vì sao luận như vậy?” và “Gợi ý thực hành” mặc định thu gọn.
- Cùng nhóm phụ tinh nhưng chính tinh/ngữ cảnh khác phải đổi nội dung diễn giải
  và lý do, không chỉ thay tên sao. Không có phụ tinh không đồng nghĩa bất lợi.
- Giữ quy tắc an sao/lịch, quyền riêng tư, giờ sinh chưa biết và nguồn corpus.
  Không kích hoạt cách cục, luận vận, Phi Hóa, AI trực tuyến hoặc nhóm sao mới.

## Bàn giao

BA đã nghiệm thu biên tập trong phạm vi diễn giải biểu tượng Công việc qua mã
nguồn sửa và bốn mẫu đầu ra giả lập. Kiểm thử kỹ thuật cuối được ghi trong báo
cáo QA, không dùng kết quả trung gian để tuyên bố toàn bộ sản phẩm đạt chuẩn.

PM nghiệm thu gói Công việc sau bản sửa tiêu đề trùng ý: 300/300 unit và 29/29
E2E production qua; build/typecheck/format qua. Đã xem ảnh mobile 320px/chữ cực
lớn, hai mục căn cứ/thực hành đóng mặc định. Không nghiệm thu khả năng dự báo,
rubric toàn bản đọc, hai chủ đề còn lại hoặc Performance >90 ổn định.

Hợp đồng BA: [career-reading-contract.md](../dev/career-reading-contract.md).
Triển khai: [career-reading-implementation.md](../dev/career-reading-implementation.md).
Kiểm tra thực tế: [career-reading.md](../test/career-reading.md).

Nghiệm thu chỉ trong phạm vi nâng cấp cấu trúc và biên tập Công việc. Corpus
Nam phái độc lập, quy tắc đối nghịch, kiến thức tổ hợp cổ và hiệu năng mobile
ổn định vẫn có cổng riêng; không tự đóng vì test phần mềm qua.
