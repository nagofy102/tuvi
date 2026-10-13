# Đối chiếu lá số công khai từ website khác

## Phạm vi và quyết định

Ngày 13/10/2026, theo yêu cầu PM sử dụng website đối thủ để có dữ liệu nhanh,
đã lập ba lá số tổng hợp không gắn với người thật tại Mèo Béo và mở một lá số
tổng hợp tại AItuvi. Đã đọc trực tiếp kết quả hiển thị bằng Chromium/Playwright,
ghi lại dữ kiện trước khi chạy engine dự án. Không tạo tài khoản, mua luận giải,
chép nội dung trả phí hoặc đưa ngày sinh của người dùng dự án ra ngoài.

Fixture: `../tests/fixtures/competitor-chart-candidates.json`.
Trạng thái: `external-comparison-only`; **0 lá số golden được duyệt**.
Cả bốn trang hiển thị đủ 12 cung và 14 chính tinh; fixture chỉ lưu các trường
được tuyên bố: lịch, Mệnh, Thân, Cục, vị trí 14 chính tinh, Tả–Hữu/Xương–Khúc
và tên cung theo địa chi. Miếu/vượng/đắc/hãm, các phụ tinh khác, vận hạn và lời
luận không được ngầm coi là đã đối chiếu.

## Nguồn và cấu hình thực tế

### Mèo Béo Studio

- Biểu mẫu: <https://meobeostudio.com/tu-vi>.
- Kết quả qua POST biểu mẫu công khai: <https://meobeostudio.com/tu-vi/lap-la-so>.
- Họ tên tổng hợp: `Mẫu đối chiếu`; không đại diện cho một người thật.
- Bỏ chọn vòng Tướng Tinh và xem vận hạn; không bật checkbox tháng nhuận đầu vào.
- Form chọn giờ theo khoảng, không nhập phút; fixture biểu diễn bằng phút đầu
  của khoảng và ghi rõ độ phân giải này.
- Form ghi 23h–23h59 tính sang ngày hôm sau, 0h–0h59 giữ ngày nhập.
- FAQ đã đọc trực tiếp tuyên bố Đẩu Số Toàn Thư là “trường phái Bắc phái phổ biến
  tại Việt Nam”, quy đổi lịch bằng thuật toán Hồ Ngọc Đức. Đây là **tuyên bố của
  website**, không phải quyết định phân loại trường phái của đội dự án.
- Quy tắc an sao tháng nhuận không được công bố trong biểu mẫu đã khảo sát;
  engine phía server và quan hệ với iztro chưa xác minh được.

Vì dự án chuyển sang hồ sơ Nam phái/lịch Trung Quốc, các ca này giữ nhãn
`incompatible-declared-school-and-calendar`. Kết quả vẫn hữu ích để phát hiện
sai khác giữa cấu hình, nhưng không tự trở thành đáp án chuẩn Nam phái.

### AItuvi

- Trang công khai: <https://aituvi.com/>.
- Đã mở CTA trải nghiệm và liên kết lá số minh họa để xác định route công khai.
  Lá số minh họa gắn tên người công chúng **không được đưa vào fixture**.
- Sau đó mở route bằng tên/ngày sinh tổng hợp:
  <https://aituvi.com/horoscope?name=Mau%20doi%20chieu&gender=Nam&date=%2B1984-02-02&time=0&viewedYear=2026>.
- Tham số `+1984-02-02` được xác nhận trên kết quả là ngày dương 2/2/1984,
  âm 1/1/1984; `time=0` hiển thị 0h–0h59; nam, năm xem 2026.
- Không bật an lưu đại vận/tiểu vận, không mua phần luận, không đăng nhập.
- Trường phái, bộ lịch, tháng nhuận, giờ Tý muộn và engine nền chưa xác minh;
  giữ `unresolved`. Không dùng câu quảng bá về độ chính xác làm bằng chứng.

Chưa xác minh hai website dùng hai engine độc lập. Các kết quả giống nhau không
đủ xác nhận độc lập thuật toán hoặc nguồn sách. Quyền sao chép nội dung luận
giải/ảnh/layout không được suy ra từ việc trang cho xem công khai; fixture chỉ
ghi dữ kiện tính toán của các đầu vào tổng hợp do đội nhập.

## Dữ liệu đã tiếp nhận

| ID                          | Đầu vào đã nhập                     | Dữ kiện hiển thị chính                                                                    | Thời điểm UTC |
| --------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------- | ------------- |
| `meobeo-1985-leap-month-vn` | Nam, dương 11/4/1985, Tỵ 9h–10h59   | Âm 22/2/1985 nhuận; Mệnh Tuất; Thân tại Thân/Phu Thê; Thổ ngũ Cục; Tử Vi Mão              | 16:53:22.688  |
| `meobeo-1984-lunar-newyear` | Nam, âm 1/1/1984 thường, Tý 0h–0h59 | Dương 2/2/1984; Mệnh/Thân Dần; Hỏa lục Cục; Tử Vi Dậu                                     | 16:53:26.060  |
| `meobeo-2000-late-ty`       | Nữ, dương 29/5/2000, Tý 23h–23h59   | Giữ dương 29/5; hiển thị âm đã chuyển ngày 27/4/2000; Mệnh/Thân Tỵ; Kim tứ Cục; Tử Vi Mùi | 16:53:29.817  |
| `aituvi-1984-solar-newyear` | Nam, dương 2/2/1984, Tý 0h–0h59     | Âm 1/1/1984; Mệnh/Thân Dần; Hỏa lục Cục; Tử Vi Dậu                                        | 16:55:24.916  |

Đã quan sát một khác biệt không đưa vào fixture expected: ca 1984 có Văn Khúc
tại Thìn ở cả hai website, nhưng Mèo Béo ghi H, AItuvi ghi Đ. Điều này cho thấy
vị trí sao khớp không có nghĩa mọi bảng trạng thái sao cùng khớp.

## Auto-diff đã chạy

Lệnh: `node scripts/run-competitor-diff.mjs`.
Script nhận duy nhất dữ liệu có policy comparison-only, đọc/kiểm tra fixture
trước khi gọi engine; chỉ ghi báo cáo ignored ở
`test-results/competitor-diff/report.json`. Kiểm tra lại SHA sau chạy để phát hiện
fixture bị thay đổi trong quá trình so sánh; không ghi expected từ engine.

Lần chạy sau khi làm rõ loại ngày âm hiển thị **2026-10-13T17:00:31.432Z**, engine
`nam-phai-chinese-lunar-v1` trên checkout nền `49512a2`, worktree đang có sửa:

- 4/4 ca có kết quả tính; 140 trường đã đối chiếu.
- 139 trường giống, 1 trường khác; không báo tỷ lệ nghiệm thu chính xác Nam phái.
- Sai khác: dương 11/4/1985, Mèo Béo hiển thị âm 22/2 **nhuận**, engine lịch
  Trung Quốc hiển thị âm 22/2 **thường**. Đây là sai khác cấu hình lịch được ghi
  nhận, không phân loại thành lỗi thuật toán an sao.
- Fixture ghi `displayedLunarBasis` cho từng ca. Ba ca không đổi ngày ghi
  `same-for-observed-input`: chỉ so sánh khi ngày sinh và ngày tính cùng giá trị;
  chưa suy rộng chính sách hiển thị của nguồn sang ca khác. Ca Tý muộn ghi
  `calculation-date`, đối chiếu ngày âm hiển thị với `effectiveLunar`.
  Báo cáo giữ riêng ngày sinh âm 26/4 và ngày tính âm 27/4 của ca này;
  ngày dương vẫn đối chiếu với ngày sinh ban đầu 29/5. Đây không phải tuyên bố
  giao diện dự án hiển thị ngày âm 27/4: giao diện có thể giữ ngày sinh 26/4.
  Nếu cơ sở hiển thị chưa rõ, runner giữ trường ở `unresolvedFields`, không tính
  khớp hoặc khác.
- Không có trường phái/cấu hình tương thích đã được chứng minh; không có ca
  nào tự được nâng cấp thành golden hoặc chứng nhận nguồn độc lập.
- SHA fixture sau định dạng và trước so sánh:
  `b2e093f353b0837f61c8b349a2f66d94deea627313be4c481e6c2076e17435c1`.

## Bước tiếp theo

BA/chuyên môn đánh giá từng cấu hình đối thủ trước khi mở rộng thu thập. Khi
có website xác định được cùng hồ sơ Nam phái/lịch Trung Quốc, tiếp nhận ca
tháng nhuận, giờ Tý, đầu năm và trạng thái sao bằng cùng hợp đồng. Chỉ dùng
nhóm phù hợp để xác nhận tương thích; bảo lưu sai khác để giải thích lựa chọn
của sản phẩm. Tuvi.dev trước đó trả 403; không tìm cách vượt chặn. Chưa tạo
dữ liệu HOROS trong đợt này và không đánh dấu phần đó đã kiểm tra.
