# Nghiệm thu luận Công việc — bản đọc v7

Ngày: 14/10/2026 (Asia/Saigon). Baseline `61b1dc6`. QA và BA là các vai trò AI;
kiểm thử này không chứng nhận dự báo hoặc thẩm định chuyên gia độc lập.

## Phạm vi kiểm tra

- Công việc đọc theo chính tinh trực tiếp tại Quan Lộc, Mệnh và Nô Bộc trước;
  nhóm Tả–Hữu/Xương–Khúc là bổ sung, không quyết định toàn bộ tiêu đề.
- Ít nhất hai cung khác nhau có ít nhất hai biểu tượng chính tinh được duyệt;
  hai sao cùng cung hoặc một biểu tượng lặp ở hai cung không đủ.
- Cung vô chính diệu không bị luận thành yếu kém; sao không chuyển khỏi cung gốc.
  Sao thực có nhưng nguồn/quy tắc không đủ điều kiện không bị gọi là vắng mặt.
- Mệnh–Thân cùng/khác vị trí được giữ đúng trong căn cứ; không dự đoán hậu vận.
- Mỗi biểu tượng dùng có đoạn nguồn hợp lệ. Nguồn không biết, trích đoạn/tiêu đề/
  cách diễn giải trống, đoạn mất hoặc quy tắc hoãn/bất đồng đều chặn thành phần đó.
- Thân bài không có bài tập quản lý công việc; phần căn cứ và thực hành tùy chọn
  mở riêng, mặc định đóng. Không render lại claim/bài tập cũ cho Công việc.
- Tài chính và Tình cảm giữ phạm vi cũ; kiểm thử hành động theo nhóm của hai chủ
  đề này được bảo toàn, không coi đã đạt nâng cấp Công việc v7.

`tests/unit/career-reading.test.ts` dùng các biến đổi cấu trúc tổng hợp để kiểm tra
chọn nội dung/truy nguồn; **không** dùng đầu ra engine làm đáp án an sao. Ca thay
chính tinh nhưng giữ phụ tinh phải thay luận điểm thực chất, không chỉ tên sao;
ca đổi chính tinh thứ hai ở Nô Bộc phải thay diễn giải, không âm thầm bỏ sao đó.

## Mẫu đọc thực tế để rà văn phong

Bốn input giả lập không tên bên dưới chạy qua engine Nam phái hiện tại; chỉ là
mẫu kiểm thử đầu ra, không phải lá số chuẩn/corpus độc lập. Đều dùng dương lịch,
nam, chính sách tháng nhuận chia ngày 15 và từ 23:00 sang ngày kế.

| Input giả lập     | Trọng tâm thực tế                         | Đoạn nối được kiểm tra                                                                                                                                  |
| ----------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 29/08/2000, 09:30 | Trách nhiệm, cách trao đổi và sự phối hợp | Trách nhiệm và thông tin nối với phần việc, cách hiểu nhau và trách nhiệm mỗi bên; không còn “chốt ba dòng”                                             |
| 02/02/1984, 00:30 | Đóng góp và trách nhiệm công khai         | Góc phối hợp về gìn giữ/phân bổ nối việc thực hiện với sắp xếp nguồn lực                                                                                |
| 15/05/1990, 14:00 | Quy tắc và ranh giới                      | “Góc nhìn về điều phối mở thêm câu chuyện giữ nhịp chung và phân rõ trách nhiệm. Góc nhìn về phối hợp nối phần việc của mỗi bên với trách nhiệm chung.” |
| 31/01/1960, 06:00 | Gìn giữ và phân bổ nguồn lực              | Góc phối hợp về nền tảng đời sống riêng đặt công việc cạnh những điều cần chăm chút ngoài công việc                                                     |

QA nhận thấy khác biệt về nội dung biểu tượng/cách kết nối, không chỉ tên sao.
Gợi ý chung không mặc định sếp, người giao việc, khách hàng, nghỉ hưu hoặc bất đồng.
Giới hạn: mới bốn mẫu đọc thực tế và các nhánh tổng hợp; không khảo sát người dùng
thật, không chấm cả bản đọc/12 cung hay khẳng định vượt đối thủ.

## Kết quả thực tế

- Unit trung gian: 294/294, 15 file, 08:30:19 ngày 14/10/2026 Asia/Saigon,
  15.07 giây; trước bổ sung gate chi tiết nguồn và chính tinh thứ hai Nô Bộc.
- Gate nguồn chi tiết trung gian: 18/18 ca Công việc qua, 08:31:17 Asia/Saigon.
- Unit trước lượt chỉnh tiêu đề trùng khái niệm cuối: **299/299**, 15 file,
  08:33:04 Asia/Saigon, 21.17 giây; gồm 19 ca Công việc riêng.
- PM chạy `npm run typecheck`, `npm run build` và `npm run format:check`: qua;
  build production mới có 35 tài nguyên prerender, engine reproducibility qua.
- `audit:sources`: metadata qua, 4 nguồn/6 đoạn dùng đối chiếu, **0 ảnh được
  băm lại**. Không phải kiểm tra mới nội dung nguồn bên ngoài.
- `audit:reference`: 36/36 ca từng phần, 218 trường, 0 sai khác; chỉ là corpus
  lịch Việt Nam cũ đã lưu, không xác nhận hồ sơ Nam phái hiện tại.
- E2E production lần đầu: 28/29 qua, một assertion cũ focus phần Tài chính khi
  chủ đề đó vẫn đóng. Đã sửa test chọn Tài chính và xác nhận summary hiển thị
  trước focus/Enter, không thay code ứng dụng hoặc tự mở phần bằng JavaScript.
  Chạy lại **đầy đủ 29/29 qua**, 52.2 giây trên cùng build production mới, trước
  lượt chỉnh tiêu đề trùng khái niệm cuối.
- Sau thêm ảnh chụp thân bài mặc định, chạy lại riêng `career-reading.spec.ts`:
  **2/2 qua**, 7.0 giây. Đã xem `test-results/career-reading-mobile-initial.png`
  và `test-results/career-reading-mobile.png`: chữ/phần mở được giữ trong card
  mobile 320px, nguồn chữ Hán xuống dòng và focus outline rõ. E2E có kiểm tra
  cỡ chữ cực lớn, không tràn ngang, Why/Practice mặc định đóng và mở độc lập
  bằng bàn phím, axe A/AA, không lộ nhãn kỹ thuật, không gửi thông tin sinh hoặc
  lưu hồ sơ mặc định. Không thay thế kiểm tra thiết bị thật/screen reader thực.
- Không đo Lighthouse ở gói nội dung này; gate Performance >90 ổn định còn mở.
- Không thay lịch, an sao, corpus chuẩn, mở phụ tinh mới/cách cục/luận vận/AI.

## Chỉnh biên tập cuối sau review ảnh mobile

PM không nghiệm thu tiêu đề Tử Vi/Thiên Tướng lặp “trách nhiệm”. BA/DEV xử lý
khái niệm chồng nhau: tiêu đề thành “Công việc: điều phối, trách nhiệm và phối
hợp”, không bỏ sao hoặc nguồn. QA bổ sung ca riêng kiểm tra tiêu đề/đoạn đầu
không lặp từ này, vẫn giữ cả hai ý điều phối/phối hợp, nguồn và dữ kiện sao.

- Unit **cuối sau chỉnh tiêu đề**: **300/300**, 15 file, bắt đầu 08:38:33
  Asia/Saigon, 11.17 giây; 20 ca Công việc riêng.
- PM chạy lại typecheck và build production sau chỉnh: qua, 35 tài nguyên
  prerender và engine reproducibility qua. Không thay source ứng dụng sau build.
- Full E2E **cuối sau chỉnh tiêu đề**: **29/29 qua**, Playwright ghi 1.2 phút,
  trên build production mới sau chỉnh. Ảnh mobile mặc định được tạo lại và QA
  xem trực tiếp: tiêu đề/đoạn đầu không lặp “trách nhiệm”, Why/Practice đóng,
  nội dung xuống dòng trong card. Ảnh scoped dài có header/CTA fixed xuất hiện
  trong vùng chụp, không dùng nó thay kiểm tra cuộn viewport trên thiết bị thật.
- Các kết quả unit/build/E2E cuối này mới là bằng chứng kiểm tra bản phát hành;
  các lượt trước giữ riêng để truy lại lỗi assertion và lượt polish cuối.
