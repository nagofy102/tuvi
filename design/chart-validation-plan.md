# Kế hoạch chuẩn hóa và nghiệm thu bộ lập lá số

Ngày ghi nhận: 13/10/2026.
Trạng thái: đề xuất PM/BA đã trao đổi, chưa phê duyệt triển khai, ngân sách hoặc thuê chuyên gia.
Việc lưu và commit tài liệu không đồng nghĩa phê duyệt code hoặc phát hành luận giải cao cấp.

## Mục tiêu và bằng chứng hiện có

Đúng theo bộ quy tắc đã công bố, trong phạm vi hỗ trợ rõ ràng, có bằng chứng kiểm chứng
và người chịu trách nhiệm duyệt. Không cam kết đúng mọi trường phái hoặc chứng minh khả năng dự đoán tương lai.

Theo `../dev/implementation.md` và `../test/README.md`, dự án có hai vấn đề riêng:

| Vấn đề | Hiện trạng | Hướng xử lý |
| --- | --- | --- |
| Tương thích lịch | Bộ chuyển lịch Việt Nam và engine không biểu diễn cùng mọi tháng âm; đã có ca tháng nhuận 2 năm 1985 bị từ chối | Kiểm tra và sửa adapter, tách phần lịch hoặc thay phần engine không tương thích |
| Thẩm định quy tắc | Có kiểm thử phần mềm, chưa có bộ lá số chuẩn được chuyên gia duyệt đầy đủ | Chốt trường phái, đặc tả quy tắc và dữ liệu đối chiếu độc lập |

Ngày hợp lệ không tính được là giới hạn kỹ thuật. Hai trường phái cho kết quả khác nhau
chưa chắc là lỗi. Giữ cơ chế từ chối rõ ràng khi chưa hỗ trợ; không âm thầm đổi ngày sinh.

## Phương án kỹ thuật cần khảo sát

| Phương án | Lợi ích | Rủi ro | Điều kiện chọn |
| --- | --- | --- | --- |
| A. Giữ engine, sửa cấu hình/adapter | Ít thay đổi, tận dụng code hiện có | Có thể không xử lý được giới hạn sâu trong thư viện | Thử nghiệm chứng minh engine nhận đúng dữ liệu Việt Nam mà không thay ý nghĩa đầu vào |
| B. Tách hoặc sửa phần engine liên quan | Kiểm soát lịch/quy tắc, tái sử dụng phần phù hợp | Phải bảo trì bản sửa và kiểm thử khi cập nhật | Giới hạn thuộc xử lý lịch hoặc một nhóm quy tắc có thể tách |
| C. Thay engine hoặc xây riêng | Chủ động theo đặc tả chuyên gia | Công sức lớn, phải thẩm định từ đầu | A/B không đáp ứng bộ quy tắc đã chọn |

Khảo sát A trước, chuyển B nếu cần; chọn C bằng bằng chứng, không mặc định viết lại toàn bộ.
Không bỏ cờ nhuận, đổi tháng nhuận thành thường hoặc chọn ngày lịch Trung Quốc gần giống để ép engine chạy.

## Năm mốc đề xuất

### Mốc 1 — Chốt phạm vi và chuẩn chuyên môn

- Chọn trường phái, nguồn chính, quy tắc giờ Tý/tháng nhuận/ranh giới năm và các bảng an sao.
- Chốt phạm vi ngày sinh, lịch và múi giờ; phân biệt quy ước lịch đã chọn với lịch hộ tịch lịch sử.
- Chốt sao, trạng thái sao và đại hạn thuộc phiên bản đầu; công bố phần ngoài phạm vi.
- Đầu ra: đặc tả có phiên bản, danh mục hỗ trợ/chưa hỗ trợ và người phụ trách chuyên môn ký duyệt.

### Mốc 2 — Kiểm kê sai khác và thử phương án sửa

- Tái hiện lỗi đã biết bằng ca kiểm thử cố định.
- Quét phạm vi dự kiến để tìm ngày hợp lệ bị từ chối, đổi ngày hoặc có kết quả không nhất quán.
- Phân loại nguyên nhân: lịch, đầu vào, engine, khác quy tắc hoặc hiển thị.
- Đầu ra: danh sách lỗi có mức độ/phạm vi ảnh hưởng và báo cáo chọn A/B/C.

Hai thư viện cùng nguồn thuật toán/dữ liệu không phải bằng chứng đối chiếu độc lập.
Round-trip âm/dương lịch chỉ bổ sung, không thay thế nguồn tham chiếu độc lập.

### Mốc 3 — Xây bộ lá số chuẩn

- Đề xuất khởi đầu 200–300 lá số theo độ phủ quy tắc và rủi ro, không chỉ chọn ngẫu nhiên.
- Bao gồm tháng nhuận, trước/sau Tết, ngày 29/30, các mốc giờ Tý, giới tính và tổ hợp an sao.
- Lưu đáp án có cấu trúc: ngày âm, Mệnh/Thân, Cục, vị trí/trạng thái sao và đại hạn trong phạm vi.
- Chuyên gia lập hoặc duyệt độc lập; không lấy đầu ra engine đang kiểm tra làm đáp án chuẩn.

Số lượng trên là đề xuất ban đầu, không bảo đảm bao phủ mọi trường hợp; tăng dữ liệu khi
còn quy tắc chưa được kiểm tra. Dữ liệu cần nguồn, quyền sử dụng, phiên bản và người duyệt.
Bộ kiểm tra luận giải 100–200 tình huống trong tài liệu AI là một tập đánh giá khác,
không thay thế bộ chuẩn an sao này.

### Mốc 4 — Sửa, kiểm thử và nghiệm thu

- Triển khai theo đặc tả đã duyệt, phiên bản hóa thay đổi quy tắc.
- Đối chiếu tự động từng nhóm quy tắc với bộ chuẩn, không chỉ đếm sao/cung.
- QA chạy hồi quy; chuyên gia giải quyết sai khác chuyên môn còn lại.
- Đầu ra: báo cáo nghiệm thu gồm revision code, phiên bản quy tắc/dữ liệu chuẩn, lỗi còn mở và phạm vi phát hành.

### Mốc 5 — Phát hành giới hạn và quản lý thay đổi

- Chỉ mở luận giải cao cấp cho đầu vào thuộc phạm vi đã nghiệm thu.
- Giải thích rõ trường hợp thiếu giờ sinh, ngày chưa hỗ trợ hoặc cấu hình chưa duyệt.
- Tiếp nhận báo lỗi bằng dữ liệu tối thiểu, có sự đồng ý phù hợp; không đưa ngày giờ sinh vào analytics.
- Có thể tắt luận giải/quay về phiên bản đã duyệt khi có lỗi nghiêm trọng; không âm thầm sửa lá số đã lưu.

## Trách nhiệm

| Vai trò | Trách nhiệm |
| --- | --- |
| Chủ sản phẩm | Duyệt phạm vi, ngân sách, đối tác và quyết định phát hành |
| PM | Quản lý mốc, phụ thuộc, rủi ro và bằng chứng nghiệm thu |
| BA + chuyên gia chính | Đặc tả quy tắc và đáp án chuẩn |
| Chuyên gia đối soát | Kiểm tra độc lập, giải quyết bất đồng trong trường phái đã chọn |
| Developer | Phân tích engine, triển khai và kiểm thử kỹ thuật |
| QA | Độ phủ, hồi quy và báo cáo sai khác |

Khi thuê chuyên gia, thỏa thuận đầu ra, quyền sử dụng tài liệu và trách nhiệm sửa sai.
Xác nhận bằng mắt rằng một lá số có vẻ đúng không đủ làm bằng chứng nghiệm thu.

## Điều kiện mở luận giải cao cấp

- Không còn lỗi nghiêm trọng đổi ngày sinh, Mệnh/Thân, Cục hoặc vị trí sao trong phạm vi cam kết.
- Toàn bộ ca chuẩn của phiên bản phát hành đạt yêu cầu; sai khác được giải quyết hoặc loại rõ khỏi phạm vi.
- Quy tắc, nguồn, phiên bản và giới hạn được người phụ trách chuyên môn ký duyệt.
- Đầu vào chưa kiểm chứng không được chuyển sang AI như thể lá số đã chính xác.
- Có quy trình tiếp nhận, điều tra, sửa kết quả và kiểm tra hồi quy sau phát hành.

Các điều kiện trên chưa được nghiệm thu. Pass bộ kiểm thử không bảo đảm không có lỗi tương lai.

## Quyết định kế tiếp

Đề xuất duyệt đợt khảo sát: chốt chuẩn chuyên môn + kiểm kê sai khác + chọn phương án sửa.
Ngân sách và lịch triển khai chính thức chỉ chốt sau khảo sát, khi biết phạm vi sửa và nguồn lực.
Chưa tuyển chuyên gia, gọi dịch vụ trả phí hoặc bắt đầu triển khai từ tài liệu này.
