# HV-R06 Lite — Reading Coverage Baseline

Ngày audit: 14/10/2026 (UTC). Baseline: `e7313d20bb2c41ef9a6aacbb056c90d7d5bc7bd7`
(`origin/main`). Vai trò: PM/QA. Đây là audit phần mềm trên dữ liệu tổng hợp,
không phải thẩm định lá số hoặc xác minh độc lập quy tắc Tử Vi.

## Kết luận

- Luồng deterministic hiện chỉ trả `ready` cho đúng cấu trúc A1 đã duyệt:
  **12/960 ca hợp lệ (1,25%)**.
- **948/960 ca (98,75%)** trả `insufficient-evidence`; không sinh nội dung thay thế.
- Không có đầu vào nào bị loại khỏi mẫu số và không có `unavailable` trong phép đo
  Công việc với chart/report đồng bộ. `unavailable` được kiểm tra riêng bằng topic
  chưa duyệt và chart/report không khớp.
- Swap Test **chưa đạt/không đủ điều kiện đánh giá**: SignalSet A1 có một bản luận
  được duyệt, SignalSet khác chỉ có trạng thái thiếu căn cứ. Chưa có hai bản luận
  khác nhau, cùng có nguồn và cùng được duyệt để hoán đổi.

## Baseline và phương pháp coverage

Git sạch trước audit; `HEAD`, `origin/main` và `origin/HEAD` cùng trỏ tới
`e7313d2`. GitHub read check bằng `git ls-remote origin HEAD` trả đúng full SHA nêu
trên.

Tập tổng hợp cố định gồm 960 đầu vào:

- 20 năm: 1950, 1954, ..., 2022, 2026;
- 12 tháng, luôn dùng ngày dương 15;
- hai giờ 00:00 và 12:00;
- hai giá trị giới tính mà engine hiện hỗ trợ;
- lịch dương, `split_at_15`, `next_day_at_23`, không có tên hoặc dữ liệu người thật.

Công thức: `20 × 12 × 2 × 2 = 960`. Mỗi ca chạy tuần tự qua
`calculateChart` → `calculateInterpretation` → `buildCareerReadingBrief`; mẫu số
coverage là số ca tạo được chart và `InterpretationReport` ở trạng thái `ready`.
Script audit tạm thời được xóa sau khi chạy; ma trận trên là đặc tả tái lập. Không
dùng output engine làm đáp án đúng chuyên môn.

| Kết quả                     | Số ca | Tỷ lệ trên 960 |
| --------------------------- | ----: | -------------: |
| Đã thử                      |   960 |           100% |
| Đủ điều kiện đưa vào mẫu số |   960 |           100% |
| Bị loại trước ReadingBrief  |     0 |             0% |
| `ready`                     |    12 |          1,25% |
| `insufficient-evidence`     |   948 |         98,75% |
| `unavailable`               |     0 |             0% |

Mẫu có 72 chữ ký khác nhau khi chỉ xét chính tinh trực tiếp tại Mệnh, Quan Lộc và
Nô Bộc. Số ca không có chính tinh trực tiếp: Mệnh 160 (16,67%), Quan Lộc 158
(16,46%), Nô Bộc 152 (15,83%). Các mẫu Quan Lộc gặp nhiều nhất là: không có chính
tinh 158; Thiên Đồng 52; Thiên Tướng 48; Thiên Cơ 48; Phá Quân 44; Thiên Lương
44; Thiên Phủ 42; Thái Âm 40. Đây là phân bố của lưới lấy mẫu, không phải phân bố
dân số.

## Smoke test và cổng an toàn

| Phạm vi                                          | Kết quả thực chạy                                                                               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Nhập dữ liệu → lá số → Brief `ready` → UI mobile | Qua; A1 hiện đúng một insight, kết luận trước, evidence mở bằng bàn phím                        |
| `insufficient-evidence`                          | Qua; ca tổng hợp 1990 không có claim/insight thay thế                                           |
| `unavailable`                                    | Qua ở unit: topic chưa duyệt và chart/report không khớp fail-closed; view không render claim cũ |
| Demo                                             | Qua; nhãn minh họa vẫn hiển thị và origin không bị đổi thành user-chart                         |
| Không giữ dữ liệu cũ                             | Qua; chuyển từ demo sang ca 1990 xóa nội dung demo và hiện trạng thái thiếu căn cứ              |
| Truyền dữ liệu                                   | E2E ghi nhận không có request khác GET trong luồng A1                                           |

Schema/adapter/UI tests kiểm tra template phải được duyệt, predicate phải khớp,
evidence/claim phải resolve, unknown field bị từ chối và semantic key không được
trùng. Registry hiện có đúng hai template văn bản cho cùng một ý A1 (conclusion và
insight), không có biến nội suy. A1 tạo năm evidence cho `symbol-3`, `symbol-10`,
`symbol-11`, `career-cross-palace`, `palace-context`; SignalSet khác không được tái
dùng văn bản này. Không phát hiện claim ngoài phạm vi trong các kiểm tra đã chạy.

## Nguyên nhân thiếu coverage

1. Eligibility runtime bị khóa vào đúng bộ: Mệnh không chính tinh; Quan Lộc chỉ có
   Cự Môn + Thái Dương; Nô Bộc chỉ có Thiên Tướng; report phải qua cổng
   `direct-career` và metadata/evidence phải khớp chart.
2. Registry chưa có template được Product Owner duyệt cho 71 chữ ký còn lại.
3. Các mô tả `symbol-1..14` chỉ là tiền đề biểu tượng; riêng chúng không cho phép
   suy ra năng lực, thói quen, nghề nghiệp hay kết quả thực tế.
4. Chưa có resolver được duyệt cho tín hiệu đối nghịch, cách cục, vận hạn hoặc các
   tổ hợp ngoài A1. Sự vắng mặt của quy tắc đối nghịch không được hiểu là không có
   đối nghịch.

## Ưu tiên đề xuất cho HV-R07

1. **Nhánh Quan Lộc vô chính diệu:** 158/960 ca (16,46%), là nhóm lớn nhất. BA/Tử
   Vi specialist cần duyệt quy tắc tổng hợp từ các cung liên hệ và giới hạn rõ rằng
   “không có chính tinh trực tiếp” không đồng nghĩa thiếu sao hay một kết luận bất
   lợi. Chỉ mở template sau khi passage và connecting rule đều được duyệt.
2. **Nhóm một chính tinh tại Quan Lộc:** ưu tiên Thiên Đồng (52), Thiên Tướng (48),
   Thiên Cơ (48), Phá Quân (44), Thiên Lương (44), Thiên Phủ (42), Thái Âm (40).
   Kho hiện có các rule biểu tượng `symbol-1..14` và quy tắc ngữ cảnh, nhưng cần
   claim tích hợp theo Mệnh–Quan–Nô; không phát hành câu luận chỉ từ một sao.
3. **Hai cấu trúc đầy đủ phổ biến để mở Swap Test:** chọn tối thiểu hai chữ ký khác
   A1 từ nhóm tần suất cao, lập evidence-backed brief và duyệt văn độc lập trước khi
   code. Mục tiêu là có hai kết luận thực sự khác về luận điểm, không chỉ đổi tên sao.
4. **Sau đó mới mở nhóm hai chính tinh tại Quan:** đo riêng độ phủ tăng thêm theo
   template đã duyệt; giữ deduplication identity theo ý nghĩa, không theo số lượng
   sao. Không cộng dồn coverage dự kiến trước khi chạy lại audit.

R07 cần giữ nguyên fail-closed, kiểm thử mỗi template bằng positive/negative
predicate, missing evidence, duplicate semantic key và hai SignalSet phân biệt.
Audit này không tự khởi động R07.

## Kiểm tra thực tế và giới hạn

- `npx vitest run tests/unit/reading-brief-schema.test.ts tests/unit/reading-brief-adapter.test.ts tests/unit/reading-brief-ui.test.ts`: 21/21 test qua trong 1,71 giây.
- Audit coverage cuối: 1/1 test qua, 960/960 ca hoàn tất trong 59,477 giây với timeout 120 giây.
- `npx playwright test tests/e2e/reading-brief-integration.spec.ts --reporter=line`: 2/2 qua trong 14,0 giây.
- Hai lần hiệu chỉnh audit trước kết quả cuối vượt timeout 5 giây và 60 giây; không
  dùng trạng thái pass của các lần này. Timeout 120 giây sau đó qua với cùng ma trận.

Không chạy toàn bộ unit/E2E suite, build, Lighthouse, thiết bị thật hay screen
reader trong audit Lite này. Synthetic inputs không phải golden charts; tỷ lệ
coverage không đo độ đúng dự báo, chất lượng văn phong với người dùng thật hoặc độ
phủ dân số. Trạng thái R07: **chưa được khởi động, chờ Product Owner duyệt ưu tiên**.
