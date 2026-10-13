# QA — chuyển một hồ sơ Nam phái

Baseline `49512a2`, ngày 13/10/2026. QA đọc hồ sơ BA
`../dev/nam-phai-migration-spec.md` và chuyên môn
`../dev/nam-phai-source-decision.md` trước kiểm tra. Các vai trò là tác nhân AI;
kết quả dưới đây kiểm tra đặc tả ứng dụng, không chứng nhận mọi truyền thừa Nam phái.

## Phạm vi và dữ liệu kỳ vọng

- Hồ sơ mới cố định `nam-phai-chinese-lunar-v1`, nhuận chia tại ngày 15 và đổi
  toàn ngày dân sự từ 23:00. Kiểm tra input trái hồ sơ bị từ chối.
- Mười mốc chuyển lịch lấy từ PDF HKO đã tải công khai HTTPS trong đợt này:
  [1985](https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/1985e.pdf),
  [2023](https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/2023e.pdf),
  [2017](https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/2017e.pdf).
  Kỳ vọng viết trước khi chạy engine. Đã đọc text layout; riêng 2023 còn render
  trang PDF và xem trực tiếp hai tháng 2 liên tiếp, tháng 3 bắt đầu 20/04.
  21/01/1985 là 01/12/1984, Tết Trung Quốc 20/02/1985; năm 1985 không có nhuận 2.
  21/08/2017 là 30/06 nhuận, ngày kế tiếp 01/07 thường: có ca ngày 30 nhuận hợp lệ.
- Bốn input âm lịch không tồn tại phải bị từ chối, gồm nhuận 2/1985, nhuận
  giả 2024 và ngày 30 của tháng chỉ có 29 ngày; không coi round-trip là oracle độc lập.
- Mười hàng Tứ Hóa phiên âm trực tiếp theo mục 18 nguồn iztro đã được chuyên môn
  đọc. So bốn biến hóa thực tế trên sao, chuẩn hóa riêng alias Tả Phù/Tả Phụ.
  Đây là kiểm tra bảng nguồn tài liệu, không lá số đối thủ hoàn chỉnh.
- Bốn ngày biên kiểm tra 22:59, 23:00, 23:59 và lá số 00:00 hôm sau: Tết,
  ngày 15→16 tháng nhuận, hết tháng nhuận, hết năm dương. Giữ nguyên ngày sinh,
  effective date tiến đúng một ngày. Tuổi mụ dùng năm âm sinh gốc, kể cả khi Tý
  chuyển ngày tính sang năm mới.
- Bộ VN cũ giữ import module legacy: lịch, bridge, corpus và audit kỹ thuật.
  Bản đọc mới từ chối hồ sơ cũ với trạng thái `unavailable`. Không gán kiểm tra
  legacy thành bằng chứng lịch Trung Quốc.
- Lưu v2 có mã lịch/mã hồ sơ; v1 không được decoder v2 nhận. E2E mới kiểm tra
  dữ liệu v1 còn nguyên, không tự lập lá số/chuyển v2, hủy/xác nhận xóa riêng;
  giờ chưa biết dùng lịch Trung Quốc và không sinh sao/cung.

## Kiểm tra thực tế

| Kiểm tra                                                     | Kết quả                                                                                                                                                     |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Focused `nam-phai-calendar`, `tech-audit`, `calendar-bridge` | **56/56 qua**, 3 file; bắt đầu 17:00:12 UTC, 9,75 giây                                                                                                      |
| Full unit / typecheck / production build                     | PM chạy **280/280 qua**, 14 file, bắt đầu 17:01:55 UTC, 20,99 giây; typecheck qua; build qua, 35 tài nguyên prerender và engine reproducibility qua         |
| E2E production lượt đầu                                      | **25/27 qua**, 1,3 phút. Hai lỗi: assertion lịch VN cũ và chữ kỹ thuật `engine` trong nội dung mới; sau sửa và rebuild, **4/4 ca ảnh hưởng qua**, 10,2 giây |

QA tự chạy `npm run audit:competitors` lúc 17:01:55.323 UTC, đọc `generatedAt`
ngay sau lệnh (lượt PM chạy lại sau đó có thể thay report ignored): 4/4 ca có output, 140 trường
đối chiếu, 139 giống và 1 khác, 0 golden. Corpus giữ SHA-256
`b2e093f353b0837f61c8b349a2f66d94deea627313be4c481e6c2076e17435c1`.
Ba ca Mèo Béo được trang công bố Bắc phái/lịch Việt Nam nên không tương thích
hồ sơ mới; ca AItuvi chưa xác định hồ sơ/quan hệ phụ thuộc. Khác biệt duy nhất
ở ngày âm 22/02/1985: Mèo Béo hiện tháng nhuận, lịch Trung Quốc tháng thường.
Không dùng tỷ lệ 139/140 làm pass-rate Nam phái; các ca vẫn comparison-only.

SHA-256 PDF HKO2017 đã đọc:
`2dbd7f1d09919a9ecce0326119ddcb2bda1123037c88dded5b2bc6a50d54ade6`.
Hai digest 1985/2023 khớp hồ sơ chuyên môn. Ảnh/PDF tạm không được đưa vào Git.

Lượt focused đầu phát hiện file legacy tạo sai checkout; DEV đã sửa. Lượt sau
phát hiện nhãn từ chối reading phải là `unavailable`, QA sửa assertion theo
hợp đồng hiện hữu. Ca Tứ Hóa Nhâm gặp phiên âm `Tả Phù`, QA giữ expected nghĩa
`Tả Phụ` và dùng alias rõ ràng. Các lần lỗi không được báo là pass.
Sau sửa assertion lịch VN cũ và DEV đổi chữ `engine` thành “bộ an sao”, PM
rebuild production thành công (35 tài nguyên, engine check/typecheck qua).
QA chạy lại bốn ca ảnh hưởng bằng
`npm run test:e2e -- --grep 'Chinese leap|thematic reading prioritizes|retains legacy|date-only lookup'`:
**4/4 qua**, 10,2 giây, khoảng 17:08 UTC. Hai ca lỗi lượt đầu đã qua;
hai ca migration mới vẫn qua. Các 23 ca khác qua ở lượt đầy đủ trước sửa copy.
Không mô tả lượt đầy đủ đầu tiên thành 27/27 và chưa chạy lại toàn suite sau sửa.

QA rà lại assertion tên hồ sơ không hợp lệ, dùng envelope v2 thật thay vì
envelope v1 để kiểm tra đúng trường tên. Chạy lại `local-profiles`:
**16/16 qua**, bắt đầu 17:06:49 UTC, 0,328 giây; chỉ thay kiểm thử.

## Giới hạn nghiệm thu

Chưa quét lại toàn bộ 1950–2026 theo lịch Trung Quốc; audit VN trước đây vẫn là
lịch sử. Ngày dương đầu 1900 có thể hiện năm âm 1899 nhưng nhập trực tiếp năm âm
vẫn bắt đầu 1900; ngày 31/12/2099 lúc 23:00 phải chuyển sang ngày ngoài phạm vi
hỗ trợ và bị từ chối. Ca endpoint hiện kiểm tra lúc 00:00, không mở rộng các biên này.
Chưa kiểm chứng mọi sao/miếu-vượng/truyền thừa, timezone sinh lịch sử,
giờ mặt trời thật hoặc hiệu năng mobile >90 ổn định. Corpus đối thủ phải báo riêng
nguồn, input, tương thích và quan hệ engine; số kết quả giống không chứng minh
độc lập. Không lấy output dự án làm kỳ vọng, không sao chép lời luận đối thủ.
