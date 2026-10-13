# Mốc 2–3 — kiến thức và luận giải có căn cứ

## Phạm vi được phép

Triển khai tiếp sau bản sửa lịch `45a3884`. Người dùng ủy quyền nghiên cứu AI,
không có chuyên gia con người. Không gọi review AI là thẩm định độc lập hoặc bằng
chứng dự báo. Không mở dịch vụ AI trả phí, luận hạn hoặc thay bộ an sao.

## Mốc 2 — hồ sơ kiến thức

- Hồ sơ đọc **`huyenvi-source-bounded-v1`**, nội dung **`reference-reading-v2`**;
  tách khỏi hồ sơ an sao **`iztro-default-vietnamese-lunar-v2`**.
- Nguồn: Tử Vi Đẩu Số Toàn Thư, Wikisource Quyển I revision 7913704,
  Quyển II revision 1963110. Mỗi quy tắc có mục, trích đoạn, diễn đạt riêng và giới hạn.
  Chưa đối chiếu bản chụp hoặc một ấn bản độc lập thứ hai.
- Chốt cách chạy: lịch Việt Nam; Tý mặc định 00:00, nhuận mặc định chia ngày 15;
  giữ và công bố lựa chọn 23:00/giữ tháng của người nhập. Không gán Nam/Bắc Phái
  khi chưa có nguồn so sánh đáng tin; không tự đổi quy ước vì một đoạn sách.
- `text-reviewed` chỉ nghĩa là đã đối chiếu văn bản; `editorial` là kết nối biên tập;
  `disputed` là bất đồng; `deferred` là chưa kích hoạt.
- JSON 24 ca đối chiếu **từng phần**, phủ 12 tháng, 12 giờ, 12 vị trí Mệnh/Thân;
  146 trường biết trước từ đếm thủ công theo sách. Một ví dụ có Cục/Tử Vi;
  không sinh expected từ engine, không điền trường chưa biết.

Chưa có bộ 200–300 lá số chuẩn hoàn chỉnh đối chiếu độc lập. Bảng miếu/vượng,
Tứ Hóa, tháng nhuận, giờ Tý và khác biệt trường phái chưa hòa giải toàn bộ.

## Mốc 3 — phạm vi đã triển khai

| Nhóm                           | Điều kiện và cách dùng                                                          | Trạng thái                                                         |
| ------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Tả Phụ–Hữu Bật                 | Cả hai sao ở bốn cung, có chính tinh làm ngữ cảnh; câu hỏi phối hợp/trách nhiệm | Kết nối biên tập có nguồn; vị trí đối chiếu trong corpus từng phần |
| Văn Xương–Văn Khúc             | Cả hai sao ở bốn cung, có chính tinh; câu hỏi học/ghi chép/trình bày            | Kết nối biên tập có nguồn; vị trí đối chiếu trong corpus từng phần |
| Tử Vi với Tả–Hữu               | Tử Vi tọa thủ, đủ cặp phụ trợ ở bốn cung; vai trò đặt cạnh hỗ trợ               | Không gọi là cách cục; không phán chức vị                          |
| Mệnh–Thân                      | Vị trí và chính tinh ở hai ngữ cảnh, phân biệt đồng cung/khác cung              | Biên tập, không phán hậu vận theo tuổi                             |
| Tam phương tứ chính            | Tọa thủ + cách 4/8/6 địa chi; giữ sao ở cung gốc                                | Ngữ cảnh hình học, không tự tổng hợp cát/hung                      |
| Khôi–Việt                      | Có đoạn Khôi Mệnh/Việt Thân nhưng khẩu quyết an sao chưa hòa giải               | Chưa kích hoạt                                                     |
| Cách cục/vận hạn/phụ tinh khác | Thiếu định nghĩa, loại trừ, bảng và đối chiếu độc lập                           | Chưa kích hoạt                                                     |

Mỗi kết nối có “Vì sao luận như vậy”: sao/cung/địa chi/quan hệ, mã quy tắc,
trích đoạn và giới hạn. Từ điển 14 sao ghi rõ **không phải kết luận cá nhân**.
Không điểm vận may, phán bệnh tật/tài sản chắc chắn/quan hệ từ một sao.
Điều kiện nhóm là bộ lọc biên tập, không giả làm tổ hợp dự báo đã nghiệm chứng.

## Nghiệm thu và bước kế tiếp

- Nghiệm thu kỹ thuật/truy nguồn trong phạm vi tham khảo: `../test/knowledge-validation.md`.
  Không nâng thành bản cao cấp thẩm định độc lập.
- Đáp án JSON giữ nguyên nguồn; auto-diff chỉ đọc. Snapshot engine chỉ phục vụ hồi quy,
  không làm oracle. Metadata xuất xứ không thay thế kiểm tra nguồn.
- Đối chiếu thêm ấn bản và lá số công bố có quyền sử dụng; mở rộng nhuận/Tý/14 chính tinh.
  Giải quyết Khôi–Việt trước khi bật nhóm; cách cục cần predicate/ngoại lệ/fixture riêng.
- Performance >90 ổn định vẫn chưa nghiệm thu; không suy ra từ build/unit/E2E.

Xem `../dev/knowledge-source-review.md`, `../dev/knowledge-implementation.md`,
`../tests/fixtures/reference-charts.json`.
