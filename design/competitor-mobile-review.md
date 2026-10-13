# Đối chiếu sản phẩm và nâng cấp mobile

Ngày khảo sát: 13/10/2026 (Việt Nam). Nền code: `8da6ed0`.
Phạm vi được phép: sửa UI/UX; phân tích mở rộng luận giải, **chưa code kiến thức mới**.

## Bằng chứng và giới hạn

Quan sát trang công khai bằng Chromium ở 390×844, đọc nội dung và chụp ảnh.
Chromium ban đầu không nhận CA proxy; tài nguyên GET được tải bằng curl với kiểm tra
TLS vẫn bật rồi chuyển vào browser. Không đăng nhập, không thanh toán, không gửi dữ
liệu sinh đến đối thủ. Một số tài nguyên bên thứ ba/dynamic có thể không tải đầy đủ;
đây không phải phép đo tốc độ, bài test luận giải trả phí hoặc thẩm định thuật toán.
Ảnh khảo sát ở `/tmp/competitor-*.png` là bằng chứng cục bộ, không phải tài sản được
đưa vào sản phẩm. Không sao chép hình ảnh, code hoặc lời luận của đối thủ.

| Trang / nguồn                                                                   | Quan sát công khai                                                                                                         | Điều học được / giới hạn                                                                                                                                       |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AItuvi](https://aituvi.com/)                                                   | Form tra cứu nổi bật, link lá số minh họa; trình bày biểu đồ, chuyên đề, miễn phí/chuyên sâu, bài viết và FAQ              | Cho thấy giá trị trước khi yêu cầu đọc dài. Các biểu đồ/điểm vận và lời quảng cáo độ chính xác chưa được kiểm chứng trong khảo sát này; không sao chép điểm số |
| [HOROS](https://horos.vn/)                                                      | Form cá nhân/tương hợp ở đầu mobile; đường dẫn sản phẩm cá nhân/tình yêu, chính tinh, Q&A và app                           | Tổ chức theo câu hỏi đời sống, màu và phân cấp có bản sắc. “100% thủ công” là tuyên bố của trang, không được xác minh; chưa đọc báo cáo trả phí                |
| [Mèo Béo](https://meobeostudio.com/) và [Tử Vi](https://meobeostudio.com/tu-vi) | Trang Tử Vi có form, tổng quan/chuyên sâu, hướng dẫn đọc, câu hỏi thực tế, liên kết chủ đề và bài kiến thức; giọng gần gũi | Đưa người mới từ câu hỏi đến nội dung phù hợp. Hệ sinh thái trò chơi/photobooth không phải hướng mở rộng mặc định cho sản phẩm 35–65+                          |
| [tuvi.dev](https://tuvi.dev/)                                                   | HTTP 403, body “Forbidden”                                                                                                 | Không đủ bằng chứng để nhận xét UI, 12 cung hoặc chiều sâu luận giải                                                                                           |

Không khẳng định sản phẩm hiện tại đẹp hơn/hay hơn đối thủ dựa trên khảo sát này.
Cần thử người dùng thật, thiết bị thật và nội dung đối chiếu có quyền sử dụng.

## Quyết định UI/UX đã triển khai

- Mobile: thu gọn hero, bỏ vòng trang trí và CTA trùng ở hero, đưa form lên sớm;
  vẫn giữ tên không bắt buộc, lịch âm/dương, giờ chưa biết và quy tắc nâng cao.
- Menu mobile có Lập lá số / Tử vi 2026 / Đổi lịch âm; không giấu mọi công cụ
  như nav desktop trước đó. Menu giữ target 48px và cỡ chữ tùy chọn.
- Kết quả: lối tắt Bản đọc / 12 cung / Lưu hồ sơ; chọn 12 cung mở đúng container.
  Badge dữ kiện thật được gom gọn trên nền navy, không thêm phần trăm vận may.
- Bản đọc: đầu navy/vàng, nội dung giấy sáng, neo Mệnh/Thân thật, chủ đề có icon
  và số thứ tự; tuổi mụ/mốc năm/Đại hạn nằm trong khối ngắn có chi tiết mở thêm.
  Giữ “Vì sao”, nguồn, bài tập, nội dung chưa đủ điều kiện và nhãn tham khảo.
- 12 cung: bộ chọn 12 nút; trên mobile đưa giải thích cung lên trước danh sách.
  Chọn cung chuyển focus/scroll đến giải thích thay vì để nó cuối 12 thẻ.
  390px có thẻ hai cột, 320px một cột; mặc định mobile vẫn là danh sách.
  Phụ tinh không liệt kê dày ở thẻ mobile; toàn bộ sao vẫn mở được ở cung đã chọn.
  Giữ biểu đồ truyền thống, popup, bàn phím và bản in. Thêm giải thích nhãn Lợi,
  vòng Trường Sinh/Bệnh/Tử; không coi các tên này là dự đoán sức khỏe.

## Hành trình 30 giây — mục tiêu, chưa phải retention đã đo

| Thời điểm mong muốn | Người dùng nhận được gì                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------- |
| 0–5 giây            | Biết đây là lập lá số miễn phí; thấy form/đường vào form trên màn đầu                     |
| 5–20 giây           | Nhập ngày, giờ, giới tính; tên tùy chọn, không ép tài khoản                               |
| 20–30 giây          | Dữ kiện thật, Mệnh/Thân và mạch quan tâm; một hành động tiếp theo: đọc sâu hoặc chọn cung |

Không cam kết mọi người nhập xong trong 30 giây hoặc engine trên mọi thiết bị <1s.
Đề xuất đo anonymous events sau khi chốt chính sách: mở form → submit thành công →
mở chủ đề/cung trong 30s, abandon input, return D1/D7. Không kèm tên/ngày/giờ sinh,
không tự triển khai analytics hoặc gửi dữ liệu trong lượt này. Tăng tỷ lệ hiểu kết quả
và hành động hữu ích, không dùng thời gian ở trang đơn thuần để thưởng bài đọc dài.

## Key SEO và phần còn thiếu

**Key acquisition: công cụ lập lá số tử vi miễn phí + đổi lịch âm/dương.**
Đáp ứng truy vấn có ý định sử dụng ngay, không chỉ giới thiệu thương hiệu.
**Key nội dung mở rộng: thư viện sao/cung/cách đọc có nguồn + trang năm/tuổi có
nội dung riêng đủ chất lượng**, nối về công cụ và chủ đề liên quan.

Hiện có trang năm 2026/2027, canonical, JSON-LD Article/FAQ/Breadcrumb, sitemap,
OG và bộ chuyển lịch. Lượt này cải thiện copy/khám phá các công cụ trên mobile,
không thêm route SEO mới hoặc giả có luận vận năm. Trang cá nhân không được index.

Đề xuất tiếp theo (chưa code):

1. Landing chuyên biệt `/lap-la-so-tu-vi`, bài hướng dẫn 12 cung, thuật ngữ và
   từng chính tinh sau review nguồn; canonical rõ, tránh route trùng nội dung.
2. Rà soát trang năm×tuổi trước tăng số lượng: không nhân bản template gần như
   giống nhau. Chỉ index nội dung thực sự đáp ứng truy vấn; không quảng cáo luận
   vận khi chỉ có can chi/nạp âm và bài tham khảo.
3. Schema đúng nội dung đang hiển thị; không bịa rating/review, không hứa rich
   result FAQ hay dùng type “Horoscope” không được Schema.org hỗ trợ.
4. Domain thật, Search Console, crawl/index và Core Web Vitals thực; Lighthouse
   chưa thay cho dữ liệu hiện trường. Trang cá nhân/OG không lộ birth input.

## Thiếu gì để bản luận giải thực sự sâu hơn — chưa triển khai

| Khoảng trống hiện tại                                                         | Giải pháp và điều kiện mở                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mở đầu riêng chủ yếu ở dữ kiện cung/sao; tiêu đề và một số bài tập vẫn chung  | Hồ sơ bằng chứng → 2–3 kết luận có điều kiện, ví dụ hành vi kiểm chứng được, tín hiệu hỗ trợ/phản bác; không đổi lời khuyên chung thành “tính cách của bạn”                                                                           |
| Chỉ hai cặp phụ tinh đang hoạt động; chính tinh chủ yếu giải nghĩa biểu tượng | Ma trận chính tinh × cung × đồng cung/tam hợp/đối cung; mở từng nhóm phụ tinh có nguồn và fixture độc lập, không luận bằng sự có mặt của một sao                                                                                      |
| Chưa xử lý tổng hợp tín hiệu trái chiều                                       | Định nghĩa phạm vi/trọng tâm/ngoại lệ từng quy tắc, lưu bất đồng trường phái; khi không đủ điều kiện phải nói thiếu gì thay vì cộng điểm tốt/xấu                                                                                      |
| Chưa có cách cục, luận Đại hạn/Lưu niên hoặc Phi Hóa                          | Chốt profile, thuật toán riêng, nguồn và case biên; không coi khoảng tuổi Đại hạn/mốc 2026 hiện tại là dự báo vận; Phi Hóa tách phần chính                                                                                            |
| Chưa có corpus lá số chuẩn hoàn chỉnh                                         | Xây 200–300 case có quyền sử dụng và nguồn gốc, tách tập chọn quy tắc khỏi tập đánh giá. Hiện 24 case chỉ đối chiếu từng phần/146 trường, không đủ chứng nhận toàn bộ engine                                                          |
| Chưa có hội thoại hỏi tiếp/RAG                                                | Retrieval từ kho nguồn được duyệt → bản evidence có cấu trúc → AI chỉ biên tập, dẫn nguồn/từ chối thiếu dữ kiện; test ảo giác, riêng tư, chi phí trước chọn provider                                                                  |
| Chưa có đánh giá chất lượng bài đọc ngoài phần mềm                            | Bộ rubric: tính riêng, lập luận đa yếu tố, mâu thuẫn, cụ thể, hành động, an toàn, nguồn; so bài cùng lá số và các lá số khác nhau. AI review không thay kiểm định độc lập; người dùng xác nhận “đúng với tôi” không chứng minh dự báo |

Ưu tiên tiếp theo: corpus/ma trận kiến thức → tổng hợp bản mệnh có điều kiện →
biên tập theo chủ đề → hội thoại kiểm soát → luận vận khi đủ gate. Không lấy bản
trả phí hoặc thuật toán đối thủ làm Ground Truth không có quyền sử dụng/nguồn.

## Nghiệm thu

Xem `../test/mobile-redesign.md` cho kiểm tra thực tế. Tiêu chí sản phẩm tiếp theo:
form xuất hiện trong màn đầu 390×844, ba lối tắt hoạt động, chọn cung không phải
cuộn hết 12 thẻ, target ≥48px, 320px/chữ cực lớn không tràn, nguồn/bàn phím/consent
không hồi quy. Kiểm tra người dùng 35–65+, Safari/Android thật và retention thực
vẫn chưa thực hiện. Không suy ra chất lượng chuyên môn từ UI hoặc số test pass.
