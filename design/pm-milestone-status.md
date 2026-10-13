# Trạng thái mốc A–D

Baseline: `9831010`, ngày 13/10/2026. Đây là bảng bàn giao hiện tại, không phải
chứng nhận chuyên môn. Kế hoạch gốc: [reading-synthesis-plan.md](reading-synthesis-plan.md).

| Mốc                       | Trạng thái thực tế                           | Điều kiện còn mở                                                                                          |
| ------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| A — Hồ sơ và kiểm kê      | Đang củng cố nguồn, corpus và cổng tiếp nhận | Xác minh catalogue/ấn bản; corpus lá số công bố độc lập; chưa có lá số chuẩn hoàn chỉnh                   |
| B — Tổng hợp có điều kiện | Đã có bản chạy giới hạn với hai cặp hiện hữu | Chưa có bộ quy tắc đối nghịch được duyệt; chưa chấm toàn bộ rubric chống Barnum                           |
| C — Mở nhóm kiến thức     | Chưa kích hoạt nhóm mới                      | Khôi–Việt còn dị bản và thiếu phép gán sao được đối chiếu; các nhóm khác cần nguồn và ca kiểm chứng riêng |
| D1 — Cách cục             | Chưa triển khai                              | Cần điều kiện nhận diện, phá cách và ca gần đúng bị loại                                                  |
| D2 — Luận vận             | Chưa triển khai                              | Cần đối chiếu thuật toán thời gian và quy tắc luận; khoảng tuổi Đại hạn không phải dự báo                 |
| D3 — Hỏi tiếp AI          | Chưa triển khai                              | Cần kho nguồn duyệt, kiểm thử từ chối/truy nguồn và đồng ý riêng nếu gửi dữ liệu ra ngoài                 |

## Đợt hiện tại — tiếp tục A

- Xác minh nguồn sách từ trang nhan đề và catalogue công khai; chỉ nâng trạng thái
  khi có bằng chứng đủ, không lấy lời uploader làm xác nhận thư mục.
- Sổ nguồn machine-readable tách nguồn dùng cho corpus từng phần, nguồn chỉ tham
  khảo nội dung và bản scan chỉ đối chiếu. Trích đoạn/URL/revision phải khớp hồ sơ
  đã duyệt trước khi engine được phép so sánh.
- Đợt kỹ thuật đã qua 245 unit tests, build/typecheck và diff 36/36 ca từng phần;
  kiểm tra mã 4 ảnh khớp. Những kết quả này không đóng gate xuất xứ hay corpus
  hoàn chỉnh; xem `../test/source-registry.md`.
- Không nhân thêm ca cùng công thức để gọi là pilot lá số độc lập. Giữ 36 ca từng
  phần / 218 trường; đợt này không thêm đáp án từ engine hoặc mở sao mới.
- Bộ kiểm tra có thể phát hiện hồ sơ bị thay đổi; không xác minh độ đúng dự báo,
  nguồn lịch sử hay tính trung thực của người viết metadata bằng thuật toán.

## Bước tiếp theo và ranh giới nghiệm thu

Đợt kế tiếp trên baseline `0958a68` củng cố B bằng nội dung v6: bài tập riêng theo
ba chủ đề và trạng thái hai cặp hiện hữu, hành động ở đoạn đọc đầu trên mobile.
Không mở C/D; chưa đóng gate rubric toàn bản đọc. Xem
`../dev/thematic-exercises.md` và `../test/thematic-exercises.md`.

Ưu tiên nguồn/corpus A để mở từng nhóm C có điều kiện; tiếp tục hoàn thiện B bằng
tri thức đã duyệt. Không chuyển sang D chỉ vì test kỹ thuật qua. Hồ sơ ứng viên lá
số công bố phải đi qua [hợp đồng tiếp nhận](../dev/published-chart-intake.md).

Mobile >90 ổn định vẫn là đầu việc chất lượng song song, chưa đạt. Không đo lại
để thay số lịch sử khi đợt này không sửa UI/bundle. Bằng chứng đợt A được lưu trong
`../test/source-registry.md`; mọi thay đổi hoàn tất phải commit/push theo RULE_BASE.
