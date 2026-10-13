# Lộ trình tăng giá trị sử dụng và người dùng quay lại

Ngày ghi nhận: 13/10/2026.

## Trạng thái và quyết định

- Đây là đề xuất PM/BA được lưu theo yêu cầu người dùng, chưa phải phạm vi triển khai được phê duyệt.
- Người dùng sẽ quyết định việc code sau; không triển khai tính năng từ tài liệu này khi chưa có yêu cầu mới.
- Người dùng muốn đầu tư chất lượng cao cho luận giải. Đây là hướng nghiên cứu ưu tiên,
  không đồng nghĩa đã chọn nhà cung cấp AI hoặc phê duyệt chi phí.
- Nghiên cứu AI và mã nguồn mở: `../dev/ai-interpretation-research.md`.

## Mục tiêu sản phẩm

Chuyển từ công cụ xem lá số một lần thành không gian tìm hiểu bản thân và tra cứu lịch định kỳ.
Tăng giá trị thật, không tối ưu thời gian ở trang bằng thao tác rườm rà, gây lo sợ hoặc ép thông báo.
Các nhận định tác động giữ chân dưới đây là giả thuyết cần thử nghiệm, không phải kết quả đã đo.

## Nền tảng hiện có

Ứng dụng có lập lá số theo cấu hình tham khảo, chuyển âm/dương lịch, widget 12 cung,
giải thích sao, đổi cỡ chữ, in bằng trình duyệt và trang SEO/ảnh OpenGraph công khai.
Lá số cá nhân chỉ ở bộ nhớ trình duyệt và mất khi tải lại trang. Chưa có tài khoản,
lưu hồ sơ, AI, PWA, nhắc lịch hoặc luận giải cá nhân được chuyên gia thẩm định.
Giải thích thuật ngữ hiện có không tương đương bản luận giải đầy đủ.

Bộ an sao chưa được thẩm định đầy đủ theo trường phái Việt Nam; còn ngày âm lịch Việt Nam
không biểu diễn được trong lịch của engine. Không tăng cá nhân hóa sâu khi nền tảng tính chưa tin cậy.

## Danh mục ưu tiên

| Ưu tiên | Chức năng đề xuất | Giá trị | Giả thuyết giữ chân |
| --- | --- | --- | --- |
| Nền tảng | Thẩm định quy tắc, sửa giới hạn lịch, đo hành trình | Kết quả nhất quán, biết điểm người dùng gặp khó | Giảm mất niềm tin và tối ưu sai |
| P1 | Lưu lá số và mở lại nhanh | Không nhập lại dữ liệu | Giảm trở ngại khi quay lại |
| P1 | Tóm tắt lá số dễ hiểu | Biết đọc gì trước | Giảm thoát vì biểu đồ khó hiểu |
| P1 | Trang “Hôm nay của bạn” | Lịch và giá trị mới theo ngày | Tạo nhu cầu định kỳ |
| P1 | Khám phá theo chủ đề | Đọc theo mục đích cụ thể | Tăng chiều sâu sử dụng |
| P2 | Thư viện lá số gia đình | Quản lý nhiều hồ sơ với sự đồng ý | Mở rộng giá trị trong hộ gia đình |
| P2 | Lưu nội dung và đọc tiếp | Đánh dấu cung, sao, bài viết | Quay lại hoàn thành nhu cầu |
| P2 | Chia sẻ có kiểm soát riêng tư | Gửi nội dung hữu ích | Giới thiệu người dùng mới |
| P2 | Nhắc lịch tự chọn và PWA | Truy cập nhanh, nhắc đúng nhu cầu | Hỗ trợ thói quen tự nguyện |
| P3 trong lộ trình giữ chân ban đầu | Trợ lý AI có căn cứ | Hỏi bằng tiếng Việt, hiểu luận giải | Tương tác sâu; hiện được người dùng ưu tiên nghiên cứu chất lượng |

## Yêu cầu BA và tiêu chí nghiệm thu đề xuất

### 1. Lưu lá số và mở lại nhanh

- Cho phép chọn “Lưu trên thiết bị này”; không bắt buộc đăng ký để lập lá số.
- Đặt tên, sửa, mở lại và xóa hồ sơ; cảnh báo khi dùng máy chung.
- Tài khoản và đồng bộ nhiều thiết bị là bước riêng, cần thiết kế bảo mật và chính sách lưu trữ.
- Lưu phiên bản dữ liệu đầu vào và quy tắc; thông báo trước khi tính lại bằng phiên bản mới.
- Nghiệm thu: mở lại trình duyệt vẫn lấy được hồ sơ đã chọn lưu; xóa được; không tự gửi
  ngày giờ sinh lên máy chủ. Làm rõ trường hợp trình duyệt xóa dữ liệu hoặc chế độ riêng tư.

### 2. Tóm tắt dễ hiểu

- Cho chọn mục đích: hiểu bản thân, tìm hiểu công việc, tìm hiểu quan hệ.
- Đưa đến cung/chủ đề liên quan, giải thích thuật ngữ và hiển thị căn cứ.
- Nội dung cá nhân phải dựa trên quy tắc và tài liệu được duyệt, không chỉ diễn giải tên sao.
- Không hiện phần trăm tài lộc/may mắn hay xác suất biến cố khi chưa có mô hình được thẩm định.
- Nghiệm thu: người dùng mới biết bước đọc tiếp; mô tả phân biệt dữ kiện và diễn giải;
  thiếu căn cứ phải nói rõ, không tự lấp chỗ trống.

### 3. “Hôm nay của bạn”

- Lớp lịch thực tế: ngày âm/dương, ngày lễ, sự kiện tự lưu và nhắc sinh nhật âm lịch.
- Lớp tham khảo văn hóa: giờ hoàng đạo, ngày tốt/xấu, lời khuyên chỉ sau khi duyệt nguồn/quy tắc.
- Cho chọn nhu cầu; không tự bật thông báo hoặc gửi lời nhắc gây sợ hãi.
- Nghiệm thu: chuyển ngày theo múi giờ đã chọn; phân biệt lịch với diễn giải; tắt nhắc dễ dàng.
- Phải quyết định cách nhắc sinh nhật tháng nhuận và tháng không có ngày 30 trước triển khai.

### 4. Khám phá, lưu nội dung và đọc tiếp

- Hành trình: Mệnh → Thân → cung liên quan; chủ đề công việc; kiến thức tử vi cơ bản.
- Lưu vị trí đọc và nội dung yêu thích bằng lựa chọn rõ ràng.
- Không ép chuỗi ngày truy cập, điểm thưởng hoặc thông báo để tránh mất “thành tích”.
- Nghiệm thu: đọc tiếp đúng phiên bản nội dung; hoạt động tốt với chữ lớn và điều hướng bàn phím.

### 5. Gia đình, chia sẻ và AI

- Hồ sơ người thân cần sự đồng ý phù hợp; không mặc định cho mọi thành viên xem dữ liệu nhau.
- Ảnh chia sẻ mặc định ẩn tên, ngày và giờ sinh; có xem trước trước khi gửi.
- Nếu có liên kết cá nhân: cần hết hạn, thu hồi, kiểm soát truy cập và không index.
- AI giải thích dựa trên lá số và kho nội dung được duyệt; chỉ rõ căn cứ và giới hạn.
- Không dùng AI thay quyết định y tế, đầu tư hoặc hôn nhân; không phán biến cố chắc chắn.
- Không gửi thông tin cá nhân sang nhà cung cấp AI nếu chưa có lựa chọn đồng ý phù hợp.

## Đo hiệu quả

Chưa có số liệu nền hoặc mục tiêu tăng trưởng được phê duyệt. Định nghĩa sự kiện và
mẫu số trước khi thử nghiệm; không coi thời gian ở trang dài hơn là thành công nếu người dùng bối rối.

| Chỉ số | Định nghĩa/câu hỏi |
| --- | --- |
| Hoàn thành lập lá số | Số phiên có kết quả hợp lệ / số phiên bắt đầu nhập; tách lỗi engine và lỗi nhập |
| Khám phá có ý nghĩa | Tỷ lệ người xem kết quả mở cung/chủ đề tiếp theo, kết hợp phản hồi về hiểu nội dung |
| Lưu và mở lại | Tỷ lệ chọn lưu và tỷ lệ mở hồ sơ đã lưu trong lần truy cập tiếp theo |
| Retention D7/D30 | Tỷ lệ cohort quay lại đúng ngày 7/30 theo múi giờ phân tích đã thống nhất; không trộn với quay lại bất kỳ lúc nào trong 7/30 ngày |
| Ngày hoạt động mỗi tuần | Số ngày có hành động hữu ích trên mỗi người dùng; không chỉ tính tải trang |
| Chất lượng và riêng tư | Lỗi tính, phản hồi luận giải không có căn cứ, yêu cầu xóa và lỗi quyền truy cập |

Không đưa tên, ngày giờ sinh, lá số hoặc câu chat vào analytics.
Định danh đo quay lại cần thiết kế quyền riêng tư, lựa chọn phù hợp và giới hạn lưu;
không fingerprint để nối phiên. Lập lá số vẫn hoạt động nếu người dùng từ chối đo lường.

## Lộ trình đề xuất, chưa duyệt triển khai

1. Nền tảng: chuyên gia thẩm định, xử lý giới hạn lịch và đo hành trình tối thiểu.
2. Đợt 1: lưu lá số trên thiết bị, mở lại nhanh, tóm tắt và đọc tiếp.
3. Đợt 2: “Hôm nay”, sự kiện âm lịch và nhắc lịch tự chọn.
4. Đợt 3: hồ sơ gia đình, chia sẻ riêng tư, tài khoản đồng bộ và PWA.
5. Đợt 4: AI có căn cứ và nội dung chuyên gia sau đánh giá chất lượng, chi phí và riêng tư.

Khuyến nghị ban đầu cho đợt code kế tiếp: “Lưu lá số + Mở lại nhanh + Hướng dẫn đọc dễ hiểu”.
Yêu cầu mới của người dùng: nghiên cứu đầu tư luận giải chất lượng cao trước khi quyết định code.
Không tự đổi thứ tự triển khai hoặc bắt đầu tích hợp AI từ yêu cầu nghiên cứu này.

## Quyết định còn chờ

- Trường phái, chuyên gia duyệt và tài liệu có quyền sử dụng.
- Phạm vi luận giải đầu tiên: tổng quan/chủ đề hay đại hạn, lưu niên.
- Chi phí thử nghiệm, yêu cầu riêng tư và API so với tự triển khai model.
- Phạm vi đợt code được người dùng phê duyệt sau khi xem đề xuất.
