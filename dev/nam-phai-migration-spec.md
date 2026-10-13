# Single Southern profile migration

## Vai trò và trạng thái

BA lập yêu cầu; luồng chuyên môn `namphai_expert` cung cấp đánh giá nguồn;
PM chốt phạm vi và DEV triển khai. Các vai trò này là tác nhân AI theo định nghĩa
của dự án, không phải chứng nhận bởi chuyên gia con người. Tài liệu là đặc tả
chuyển đổi; phải xem báo cáo triển khai để biết phần nào đã chạy.

Yêu cầu người dùng mới nhất thay lựa chọn nhiều trường phái bằng **một hồ sơ
Nam phái**, dùng âm lịch Trung Quốc. Không coi nhãn Nam phái là đủ để quyết định
mọi dị bản: từng quy tắc phải có giá trị và nguồn cụ thể.

## Decision record

| Hạng mục                    | Yêu cầu/đề nghị                                                                                                 | Căn cứ và giới hạn                                                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Trường phái                 | Một hồ sơ Nam phái, không cho đổi Bắc phái/Trung Châu                                                           | Quyết định sản phẩm của người dùng                                                                                                                                                   |
| Lịch                        | Âm lịch Trung Quốc, quy ước UTC+8 của bộ lịch; áp dụng đồng nhất trong biểu mẫu, chuyển lịch, engine và tuổi mụ | Không chỉ thay tên lịch hoặc offset chuỗi thời gian                                                                                                                                  |
| An sao                      | `algorithm: default`, không `zhongzhou`                                                                         | iztro gọi `default` là bản phổ thông; tài liệu an Tứ Hóa mục 18 nhận diện bảng đang nêu là Nam phái. Điều này chưa chứng minh mọi chi tiết của engine thuộc mọi truyền thừa Nam phái |
| Tháng nhuận khi an cung/sao | Đề nghị cố định `split_at_15`: ngày 1–15 giữ tháng, từ 16 dùng tháng kế                                         | Quy ước phần mềm iztro được ghi rõ; khác đoạn cổ tính toàn tháng nhuận sang tháng kế. Ghi khác biệt trong hồ sơ, không dùng đoạn cổ đó làm oracle tháng nhuận cho hồ sơ mới          |
| Giờ Tý                      | Cố định đổi toàn ngày dương từ 23:00, sau đó tính theo giờ Tý chỉ số 0                                          | Chuyên môn đề nghị quy ước ứng dụng này; khác `timeIndex: 12` upstream tại biên tháng/năm. Giữ ngày sinh dân sự nguyên gốc và giải thích ngày dùng tính khi có chuyển ngày           |
| Giờ người dùng nhập         | Giữ giờ địa phương được nhập; lịch Trung Quốc không đồng nghĩa tự cộng 1 giờ vào giờ sinh Việt Nam              | Chuyển thời điểm tuyệt đối cần địa điểm/múi giờ sinh; form hiện không có dữ kiện đó                                                                                                  |
| Bảng miếu/vượng, sao khác   | Giữ dữ kiện từ phiên bản engine đã ghim, truy nguồn và kiểm tra riêng                                           | Không mở quy tắc luận giải mới chỉ vì đổi nhãn trường phái                                                                                                                           |

Nguồn đã thực sự đọc trong lượt BA: [iztro, 安星诀](https://iztro.com/learn/setup.html),
mục 13 về Tả–Hữu/Xương–Khúc và mục 18 có câu nhận diện bảng Tứ Hóa Nam phái.
Bản tải phục vụ đọc ở `/tmp/tuvi-setup-ba.html`, không phải tài sản nguồn bền vững.
Chi tiết nguồn về giờ Tý và tháng nhuận do luồng chuyên môn bổ sung trong hồ sơ
chuyên môn; không dùng bản chép sách chung làm xác nhận cho mọi lựa chọn mới.
Luồng chuyên môn đã xác nhận phương án tăng toàn ngày dương nêu trên trong lượt
này; đây là quyết định hồ sơ ứng dụng, không khẳng định mọi nhánh Nam phái dùng
chung cách xử lý giờ Tý.

## Implementation contract

1. Tạo mã hồ sơ mới và phiên bản lịch/engine mới. Chặn input có quy tắc trái hồ
   sơ cố định; không chỉ ẩn selector nhưng vẫn nhận lựa chọn cũ qua local storage.
2. Chuyển `calendar/convert.ts` đồng nhất cho lịch Trung Quốc, giữ kiểm tra
   ngày hợp lệ, năm hỗ trợ, cờ nhuận và đối chiếu ngược chính xác. `lunar-lite`
   hiện bỏ qua cờ nhuận không tồn tại; facade phải tiếp tục từ chối thay vì sửa ngầm.
3. Engine phải đọc đúng tuple âm lịch facade trả về. Sửa alias/bundle và NOTICE
   theo phương án được chọn; kiểm tra tái tạo artifact. Không sửa `node_modules`.
4. Màn kết quả và biểu mẫu nói rõ âm lịch Trung Quốc; bỏ lựa chọn quy tắc tháng
   nhuận và giờ Tý thay bằng giải thích ngắn. Cờ “sinh trong tháng nhuận” vẫn là
   dữ kiện đầu vào, cần giữ. Giờ chưa biết tiếp tục chỉ hiện dữ kiện lịch/năm.
5. Rà toàn bộ phương pháp, FAQ, lịch âm dương, metadata, privacy copy và bản đọc;
   không để lời giới thiệu lịch Việt Nam đi cùng kết quả lịch Trung Quốc.
6. Cập nhật hồ sơ kiến thức và cổng kiểm tra đầu vào bản đọc. Nguồn cổ đã duyệt
   chỉ được dùng cho các trường còn tương thích; phiên bản mới không tự cấp quyền
   cho quy tắc đang chờ duyệt. Corpus v2 giữ nguồn gốc; chuyển hồ sơ phải đánh giá
   lại tính tương thích, không lấy actual engine ghi đè expected.

## Saved profiles

Hồ sơ v1 chỉ lưu input và quy ước, **không lưu mã lịch**. Ngày âm lịch v1 có nghĩa
lịch Việt Nam; cùng tuple khi đọc theo lịch Trung Quốc có thể thành ngày dương khác.

- Giữ nguyên dữ liệu v1; không tự xóa hoặc gắn mã lịch mới rồi tính lại.
- Input dương lịch cũ giữ được ngày dân sự, nhưng lá số mới có thể khác lịch/quy
  tắc Tý; chỉ chuyển khi người dùng chủ động mở và được thông báo.
- Input âm lịch cũ cần người dùng xác nhận lại ngày dương hoặc nhập lại theo lịch
  mới. Lối đi đơn giản nhất là từ chối mở bằng engine mới với thông báo rõ; hồ sơ
  vẫn có thể xóa theo cơ chế có xác nhận hiện hành.
- Bản lưu mới cần phiên bản hồ sơ tính và mã lịch để lần nâng cấp sau không phải
  đoán. Lưu cục bộ vẫn cần đồng ý riêng; không tự tải dữ liệu sinh lên đối thủ.

## Present context and public SEO

Ngày dân sự hiện tại có thể tiếp tục lấy theo `Asia/Ho_Chi_Minh` cho người dùng
Việt Nam. Chuyển ngày đó sang âm lịch bằng cùng lịch Trung Quốc dùng cho lá số;
tuổi mụ dùng năm âm sinh nguyên gốc, không năm hiệu lực đã tăng do Tý.
Ghi rõ nếu chọn timezone hiện tại khác. Khoảng tuổi Đại hạn vẫn là dữ kiện tuổi,
không biến thành dự báo. Trang năm×tuổi chỉ chứa can chi/nạp âm không cần đổi slug
do migration; cập nhật mô tả phương pháp/lịch và JSON-LD khi chúng đang nói lịch
Việt Nam. Không đưa dữ kiện sinh cá nhân vào URL/OG/sitemap.

## Quick external comparison corpus

Người dùng đã cho phép dùng trang đối thủ để lấy lá số đối chiếu. Đổi mục tiêu
trước mắt sang **corpus so sánh liên hệ thống**, có ảnh/field nhìn thấy thực tế;
không đợi tự tạo 200–300 lá số hoặc diễn giải output đối thủ thành chân lý sách.

| Trang                  | Hướng tiếp nhận nhanh                                                                  | Giới hạn đã biết từ khảo sát trước                                    |
| ---------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| aituvi.com             | Ưu tiên lá số minh họa công khai, sau đó ca sinh giả danh qua form nếu truy cập được   | Chưa xác định lịch/quy tắc và quan hệ thư viện bên dưới               |
| meobeostudio.com/tu-vi | Form công khai và ví dụ có đủ ngày/giờ/giới tính cùng 12 cung                          | Chưa chứng minh engine độc lập với iztro                              |
| horos.vn               | Chỉ nhận trường sao/cung thực sự hiện; teaser hoặc lời luận không đủ làm oracle an sao | Nội dung trả phí chưa được truy cập; không suy input/placements bị ẩn |
| tuvi.dev               | Thử lại truy cập bình thường; nếu còn 403 ghi blocked                                  | Không bypass chống truy cập hoặc giả rằng đã thu được dữ liệu         |

Mỗi ca phải giữ: nguồn URL, thời điểm truy cập, input giả danh, loại lịch/cờ
nhuận, quy ước hiện trên trang hoặc `unknown`, các trường đọc được, checksum bằng
chứng cục bộ và lịch sử review. Thiếu sao/Thân/Cục chỉ so các trường có bằng chứng.
Không sao chép văn luận giải, tài sản web hoặc giả người thật. Các engine có cùng
phụ thuộc có thể cho cùng đáp án sai; ghi `dependencyIndependence: unknown` cho
đến khi kiểm tra. Ca khác trường phái/lịch giữ làm khác biệt cấu hình, không báo
sai thuật toán trước khi chốt profile compatibility.

Quy trình tiết kiệm thời gian: lấy ví dụ công khai trước; transcribe expected từ
web trước khi chạy engine dự án; QA kiểm tra các trường đã lấy, chạy diff rồi
phân loại `match / mismatch / incompatible / unavailable`. Không yêu cầu tự
thiết kế thêm tập điều kiện lớn để bắt đầu. Chỉ bổ sung ca biên migration nhỏ
cần thiết để tránh hồi quy lịch và giờ Tý.

## Acceptance

- Một hồ sơ thực sự được áp dụng trong UI và API nội bộ; cấu hình trái hồ sơ bị
  từ chối. Provenance thể hiện mã lịch/hồ sơ/engine mới.
- Ca lịch Trung Quốc độc lập gồm mốc lịch Việt Nam/Trung Quốc khác nhau, nhuận,
  ngày 29/30 và Tết; kỳ vọng lấy từ lịch công bố, không sinh từ engine.
- Kiểm tra giờ 22:59/23:00/23:59/00:00/01:00 ở ngày thường và biên tháng/năm
  theo phương án đã ghi rõ; lỗi input không giữ kết quả cũ.
- Hồ sơ âm lịch v1 không bị diễn giải âm thầm theo lịch mới; lưu mới có provenance.
- Corpus đối thủ được báo riêng với corpus nguồn sách; số ca đạt chỉ tính các
  trường thực sự nhìn thấy và tương thích. Một trang không truy cập được ghi
  blocked, không tạo expected giả.
- Kiểm tra typecheck/build và regression phù hợp; PM báo A1 đã nghiệm thu phạm
  vi nào, A2 chốt quy ước nào và corpus thực tế thu được bao nhiêu trường.
