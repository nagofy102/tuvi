# Trạng thái mốc A–D

Baseline nâng cấp Công việc: `61b1dc6`, ngày 14/10/2026. Đây là bảng bàn giao hiện tại, không phải
chứng nhận chuyên môn. Kế hoạch gốc: [reading-synthesis-plan.md](reading-synthesis-plan.md).

| Mốc                       | Trạng thái thực tế                                                    | Điều kiện còn mở                                                                                                 |
| ------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| A1 — Hồ sơ và truy nguồn  | PM nghiệm thu phạm vi quản trị/truy nguồn                             | Không bao gồm xác thực ấn bản hoặc chứng nhận Nam phái; xem `nam-phai-transition.md`                             |
| A2 — Chốt hồ sơ Nam phái  | Đã chốt và triển khai hồ sơ cố định                                   | Lịch Trung Quốc, Tứ Hóa Nam phái, chia nhuận ngày 15, tăng ngày từ 23:00; QA tại `../test/nam-phai-migration.md` |
| A3 — Corpus bên ngoài     | Đã thu 4 lá số/2 website, so 140 trường                               | 139 khớp, 1 khác lịch; Mèo Béo công bố Bắc phái, AItuvi chưa rõ; chưa có golden Nam phái                         |
| B — Tổng hợp có điều kiện | Công việc v7 có diễn giải chính tinh theo cung, tách căn cứ/thực hành | Hai chủ đề còn lại giữ bản cũ; chưa có quy tắc đối nghịch hoặc nghiệm thu rubric toàn bản đọc                    |
| C — Mở nhóm kiến thức     | Chưa kích hoạt nhóm mới                                               | Khôi–Việt còn dị bản và thiếu phép gán sao được đối chiếu; các nhóm khác cần nguồn và ca kiểm chứng riêng        |
| D1 — Cách cục             | Chưa triển khai                                                       | Cần điều kiện nhận diện, phá cách và ca gần đúng bị loại                                                         |
| D2 — Luận vận             | Chưa triển khai                                                       | Cần đối chiếu thuật toán thời gian và quy tắc luận; khoảng tuổi Đại hạn không phải dự báo                        |
| D3 — Hỏi tiếp AI          | Chưa triển khai                                                       | Cần kho nguồn duyệt, kiểm thử từ chối/truy nguồn và đồng ý riêng nếu gửi dữ liệu ra ngoài                        |

## PO review K02B/K03A2/K04A — 15/10/2026

PO nghiệm thu các mốc trước ở phạm vi nghiên cứu/prototype, không xác nhận độ đúng
tính toán hoặc luận giải production. K02C được mở để kiểm chứng lịch theo nguồn hợp
pháp; K03A3 được mở để thu tri thức luận đoán thực chất; K04B vẫn tạm hoãn. K02C mới
xác minh metadata chính thức của GB/T 33661-2017: chưa lấy/đọc được toàn văn hợp pháp,
nên không có clause, fixture hay thay đổi profile. K03A3 chưa có passage độc lập,
page-level đủ điều kiện, nên Knowledge Yield là 0 rule substantive và 0 claim path.
Xem `../dev/calculation-k02c-verification-report.md` và
`../dev/knowledge-k03a3-yield-report.md`.

K03A4 (15/10) chuyển từ inventory sang kiểm tra nội dung thực tế: một candidate
substantive có locator được trích xuất từ nguồn cùng lineage cũ, nhưng chỉ được tạo
trace phân loại lịch sử, không được tạo claim. Hai đường nguồn mới access-blocked;
K04B vẫn hoãn. Xem `../dev/knowledge-k03a4-source-pilot.md`.

## Đợt hiện tại — tiếp tục A

Phần dưới là lịch sử đợt `0958a68`. Quyết định mới trên baseline `49512a2`
tại [nam-phai-transition.md](nam-phai-transition.md): A1 đóng trong phạm vi đã
ghi; A2 giao BA/chuyên môn chốt Nam phái; A3 chuyển ưu tiên sang đối thủ.

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

Gói B hiện tại thay phần Công việc ghép dữ kiện với bài tập bằng kết nối biểu
tượng chính tinh theo vai trò cung, phụ tinh chỉ bổ sung. Bản đọc, căn cứ và gợi
ý thực hành được tách riêng. Phạm vi và kết quả tại
[career-reading-upgrade.md](career-reading-upgrade.md). Đây không phải quy tắc tổ
hợp cổ được kiểm chứng hoặc luận nghề nghiệp chắc chắn; hai chủ đề còn lại chưa
được nâng cấp tương đương. Không đóng A3, C hoặc D bằng thay đổi biên tập này.

Đợt kế tiếp trên baseline `0958a68` củng cố B bằng nội dung v6: bài tập riêng theo
ba chủ đề và trạng thái hai cặp hiện hữu, hành động ở đoạn đọc đầu trên mobile.
Không mở C/D; chưa đóng gate rubric toàn bản đọc. Xem
`../dev/thematic-exercises.md` và `../test/thematic-exercises.md`.

Ưu tiên nguồn/corpus A để mở từng nhóm C có điều kiện; tiếp tục hoàn thiện B bằng
tri thức đã duyệt. Không chuyển sang D chỉ vì test kỹ thuật qua. Hồ sơ ứng viên lá
số công bố phải đi qua [hợp đồng tiếp nhận](../dev/published-chart-intake.md).

Mobile >90 ổn định vẫn là đầu việc chất lượng song song, chưa đạt. Gói Công việc
có sửa giao diện/bundle nhưng chưa đo Lighthouse; không dùng số lịch sử để xác
nhận bản mới. Bằng chứng đợt A được lưu trong
`../test/source-registry.md`; mọi thay đổi hoàn tất phải commit/push theo RULE_BASE.
