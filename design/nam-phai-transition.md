# Quyết định PM — một hồ sơ Nam phái

Ngày 13/10/2026; baseline `49512a2`. Quyết định sản phẩm mới thay thế mục tiêu
hòa giải mọi trường phái trước khi tiến tiếp.

## Quyết định và phân công

- Website hướng tới **một hồ sơ Nam phái**; sách, an sao và luận giải đi theo
  hồ sơ do BA và vai trò chuyên môn Tử Vi thống nhất từ tài liệu đọc được.
- Người dùng yêu cầu dùng cách tính Trung Quốc cho nhuận. Đặc tả phân biệt
  bộ lịch chuyển đổi ngày và cách an sao khi sinh tháng nhuận.
- Thread chính là PM. BA và chuyên môn là hai vai trò agent theo xác nhận của
  người dùng, không phải chat riêng hoặc chuyên gia con người. DEV triển khai
  đặc tả, QA đối chiếu kết quả; PM không tự đặt quy tắc chuyên môn.
- Ưu tiên lấy lá số đối thủ làm corpus so sánh bên ngoài, giảm thời gian đếm
  đáp án thủ công; thu kết quả trước khi chạy engine dự án, giữ nguồn và cấu hình.

Trước đợt này engine đang chạy `iztro-default-vietnamese-lunar-v2`, nội dung v6.
Kiểm tra cũ chỉ có giá trị theo hồ sơ đó; chuyển hướng sản phẩm chưa tự thay
đổi phép tính hoặc xác nhận trường phái của engine đang chạy.

## A1 — nghiệm thu riêng phần đã có

PM nghiệm thu **hồ sơ sử dụng nguồn và cổng truy nguồn**, trong phạm vi sau:

| Hạng mục          | Kết quả và giới hạn                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Sổ nguồn          | 4 mục nguồn, không phải 4 sách độc lập; tách nguồn đối chiếu từng phần, tham khảo luận giải và scan đối chiếu |
| Truy nguồn        | 6 đoạn ghim revision, heading/text và trường expected được phép; sai metadata bị chặn trước so sánh engine    |
| Corpus hiện hữu   | 36 ca từng phần/218 trường; giữ nguyên nhãn/hồ sơ, không nghiệm thu thành lá số chuẩn hoàn chỉnh              |
| Bằng chứng scan   | URL/digest và quan sát đã lưu; 4 ảnh đã kiểm tra trong đợt `0958a68`; đợt hiện tại chỉ kiểm tra lại metadata  |
| Kiểm tra hiện tại | `npm run audit:sources` qua trên baseline `49512a2`; 0 ảnh được cung cấp, 0 lá số hoàn chỉnh                  |

**A1 đóng trong phạm vi quản trị/truy nguồn này.** Không bao gồm xác nhận tác
giả, niên đại, ấn bản độc lập hoặc chứng nhận Nam phái. Thiếu sót thư mục giữ tại
`../dev/catalogue-verification.md`, chỉ chặn việc dùng nguồn đó cho quy tắc cần
xác minh; không giữ toàn bộ A1 mở hoặc bắt xác minh mọi ấn bản mới tiến tiếp.

## A2 — giao BA và chuyên môn

**Quyết định hồ sơ đã được BA và chuyên môn AI thống nhất**, PM đưa vào triển
khai với mã `nam-phai-chinese-lunar-v1`. Hồ sơ nguồn tại
`../dev/nam-phai-source-decision.md`, đặc tả tại
`../dev/nam-phai-migration-spec.md`:

- Âm lịch Trung Quốc hiện đại UTC+8; không tự cộng một giờ vào giờ sinh nhập.
- Thuật toán `default` iztro 2.6.2, bảng Tứ Hóa Nam phái đủ 10 can đặt rõ giá trị.
- Tháng nhuận: ngày 1–15 giữ tháng, từ 16 dùng tháng kế khi an sao.
- Từ 23:00 tăng toàn ngày tính sang hôm sau; ngày sinh gốc vẫn giữ nguyên.
- Một hồ sơ duy nhất; hai quy tắc biên là quy ước ứng dụng được ghi rõ, không
  tuyên bố mọi truyền thừa Nam phái đồng nhất. Nguồn cổ khác quy ước giữ lịch sử.

Nguồn an sao hiện đại được đọc trực tiếp và bảng lịch HKO 1985 cung cấp các mốc
lịch Trung Quốc độc lập. Nguồn sách cổ hiện hữu chỉ giữ các đoạn tương thích;
việc chọn trường phái không tự biến mọi đoạn sách thành chứng nhận Nam phái.
DEV đã triển khai đồng bộ hồ sơ theo
`../dev/nam-phai-implementation.md`; kết quả nghiệm thu tại
`../test/nam-phai-migration.md`.

BA và chuyên môn đối chiếu tài liệu để bàn giao một hồ sơ cụ thể:

1. Nhánh Nam phái và nguồn sách/ấn bản/đoạn dùng làm chuẩn; quyết định dị bản
   áp dụng theo hồ sơ. Khác biệt ngoài hồ sơ chỉ lưu tham chiếu.
2. Bộ lịch Trung Quốc, múi giờ, ngày/năm âm lịch và biểu diễn tháng nhuận;
   phân biệt năm nhuận dương lịch với quy tắc an sao tháng nhuận.
3. Một chính sách tháng nhuận và giờ Tý; Mệnh–Thân–Cục, 14 chính tinh, phụ tinh,
   Khôi–Việt, miếu/vượng, Tứ Hóa: mục có căn cứ được dùng, mục chưa đủ ghi rõ.
4. Website đối chiếu phù hợp, cấu hình cần chọn, cách xử lý trang không công bố
   quy tắc hoặc dùng chung thư viện với dự án.

DEV đánh giá ảnh hưởng đến engine, tuổi mụ/SEO, biểu mẫu, luận giải và hồ sơ
lưu cũ. Giữ dấu phiên bản khi kết quả thay đổi; không âm thầm coi kiểm tra hồ sơ
cũ là kiểm chứng cấu hình mới. A2 không còn yêu cầu hòa giải mọi trường phái.

## A3 — đối chiếu từ đối thủ

GET công khai đợt này: AItuvi 200, tuvi.dev 403, HOROS 200, Mèo Béo `/tu-vi` 200. HTTP thành công chỉ xác nhận truy cập; kết quả thu lá số được ghi riêng
tại `../dev/competitor-chart-intake.md` khi có bàn giao.

Phiếu kết quả: mã, website/URL, thời điểm, input âm/dương/giờ/giới tính, cấu hình
lịch/nhuận/Tý, quy tắc trang công bố, trường đọc được/chưa biết, bằng chứng. Dùng
input giả lập không định danh. Thu dữ liệu trực tiếp trước khi mở output dự án.

QA kiểm tra tương thích hồ sơ và có chung engine hay không. Số trang đồng thuận
không tự chứng minh độc lập hoặc đúng Nam phái. BA/chuyên môn chọn trường được
dùng làm đáp án, phân loại khác biệt lịch/hồ sơ/thuật toán. Không lấy lời luận
đối thủ hoặc bịa output khi bị chặn. Không yêu cầu tự tạo thủ công 200–300 ca;
giữ bộ hiện hữu làm hồi quy, bổ sung bằng kết quả đối thủ và so sánh tự động.

## Bàn giao đợt này

- A1 đóng phạm vi hồ sơ/truy nguồn nêu trên.
- A2 có hồ sơ được BA/chuyên môn thống nhất và engine/UI đã chuyển; giữ nguồn
  cổ khác biệt như lịch sử ngoài hồ sơ, không đòi hòa giải mọi truyền thừa.
- A3 đã thu **4 lá số từ 2 website**, 140 trường quan sát; 139 khớp, 1 khác cờ
  tháng nhuận Việt Nam/Trung Quốc 1985. Mèo Béo tự công bố Bắc phái/lịch Việt Nam,
  AItuvi chưa xác định hồ sơ: chưa có golden Nam phái được tiếp nhận.
- Bộ sách cũ 36 ca/218 trường vẫn so bằng engine Việt Nam lưu trữ, không dùng
  lần pass đó làm kiểm chứng bản Nam phái mới. QA giữ tách hai loại báo cáo.
