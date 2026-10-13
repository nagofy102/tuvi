# Kế hoạch PM — luận giải tổng hợp có điều kiện

Ngày lập: 13/10/2026. Baseline: `3c9cc79`. Đây là đặc tả quản trị chất lượng và
cổng phát hành, không phải chứng nhận chuyên môn hoặc dự báo đã được kiểm chứng.
Trạng thái triển khai mới nhất ở [pm-milestone-status.md](pm-milestone-status.md);
các số liệu baseline dưới đây là lịch sử, không phải độ phủ hiện tại.
Người dùng cho phép PM điều phối triển khai; quyền đó không thay thế nguồn tài liệu,
không cho phép bịa đáp án chuẩn hoặc gửi dữ liệu sinh ra dịch vụ ngoài mặc định.

## 1. Hiện trạng đã kiểm tra trong mã nguồn

- Bản đọc cục bộ có ba chủ đề, Mệnh–Thân, bốn cung liên hệ và phần “Vì sao”.
  Nhóm cung biên tập không mặc nhiên là tam hợp; quan hệ phải lấy từ địa chi thật.
- Hai cặp phụ tinh được kích hoạt: Tả Phụ–Hữu Bật và Văn Xương–Văn Khúc; thêm
  ngữ cảnh Tử Vi có Tả–Hữu. Đây là bài tập biên tập dựa trên biểu tượng trong sách,
  không phải bằng chứng về tính cách hoặc kết quả đời sống của người dùng.
- Khôi–Việt, cách cục, luận vận và Phi Hóa chưa được kích hoạt. Khoảng tuổi Đại hạn
  là dữ kiện engine, không phải dự báo tốt/xấu. Độ sáng và Tứ Hóa chưa đủ đối chiếu
  để trở thành trọng số luận hoặc điểm vận may.
- Baseline `themes.ts` gộp nhóm bằng `ruleId`, có thể bỏ ngữ cảnh cung khác;
  nhánh bài tập ưu tiên Tả–Hữu làm mất bài tập Xương–Khúc khi cả hai đủ điều kiện.
  Nâng cấp phải sửa vấn đề tổng hợp, không chỉ tăng số câu.
- Có 24 ca đối chiếu **từng phần**, 146 trường; chưa có lá số golden hoàn chỉnh.
  Fixture từ đếm thủ công theo nguồn không dùng output engine làm expected.

Nguồn hiện hữu: [hồ sơ trích đoạn](../dev/knowledge-source-review.md),
[giới hạn kiểm chứng](../test/knowledge-validation.md),
[chuẩn biên tập](reading-style-policy.md). Hồ sơ đọc đang dùng
`huyenvi-source-bounded-v1`, tách biệt hồ sơ an sao
`iztro-default-vietnamese-lunar-v2`.

Nguồn 紫微斗數全書 trên Wikisource là bản chép văn bản cổ ghim revision
`7913704`/`1963110`; chưa đối chiếu facsimile hoặc ấn bản thứ hai. Không gọi đó là
sách giáo khoa được chứng nhận, nguồn khoa học dự báo, hoặc chứng nhận chuyên gia.

## 2. Hợp đồng tiếp nhận nguồn và quy tắc

Mỗi quy tắc mới cần hồ sơ độc lập trước khi bật. Các tên trường dưới đây là hợp đồng
đề xuất, không khẳng định đã có đủ trường trong runtime:

| Field                                | Nội dung bắt buộc                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `id`, `version`, `status`            | Mã ổn định; phiên bản; `text-reviewed`, `editorial`, `disputed` hoặc `deferred`                        |
| `sourceIds`, `passageIds`            | Sách/ấn bản/revision/URL, quyền sử dụng, mục hoặc trang thật, trích đoạn kiểm tra được                 |
| `sourceLimitations`                  | Bản chép hay facsimile, lỗi khả nghi, chưa đối chiếu ấn bản; không suy độ tin cậy dự báo từ tuổi sách  |
| `profileScope`                       | Hồ sơ an sao/trường phái được đối chiếu; không tự gán Nam Phái/Bắc Phái khi chưa có nguồn so sánh      |
| `literalScope`, `editorialExtension` | Ý văn bản nói trực tiếp; phần liên kết/ứng dụng tự viết phải ghi riêng                                 |
| `required`, `excluded`, `exceptions` | Sao, vị trí, hình học cung, điều kiện loại trừ và ngoại lệ cụ thể                                      |
| `allowedClaims`, `forbiddenClaims`   | Điều được diễn giải và điều không được suy ra: chức vị, tiền bạc chắc chắn, bệnh/tử vong, điểm may mắn |
| `disagreementIds`, `reviewRecord`    | Liên kết bất đồng, ngày/người hoặc vai trò AI kiểm tra; không ghi thành chuyên gia con người           |
| `fixtureIds`                         | Ca đối chiếu vị trí và ca kiểm tra điều kiện; phân biệt hai loại chứng cứ                              |

Nguồn tồn tại là điều kiện cần, không đủ. Đoạn nói **đồng cung** không tự cho phép
luận như vậy khi chỉ **hội chiếu**. Mở rộng hội chiếu phải có quy tắc và nhãn biên tập
riêng. Nguồn có lời phán gây sợ hãi không buộc sản phẩm tái sử dụng lời phán đó.

Sổ bất đồng giữ mở: tháng nhuận (sách nêu tháng kế tiếp, app có tách ngày 15/cùng
tháng), giờ Tý, thứ tự an Khôi–Việt, độ sáng và Tứ Hóa. Không trộn các hồ sơ để ép
ra một đáp án. Trường chưa thống nhất không được sử dụng âm thầm trong luận mới.

## 3. Hợp đồng nhận định tổng hợp

Mỗi nhận định phải nối ít nhất hai yếu tố liên quan theo quy tắc đã tiếp nhận,
không phải ghép hai tên sao bất kỳ để đạt số lượng. Cấu trúc đề xuất:

```text
Claim
  id / ruleIds / concern / status
  statement / applicability
  supportingEvidence[] / counterEvidence[] / missingPrerequisites[]
  limitations[] / why / passageIds[]
  selfCheck / adjustment
```

`status` biểu thị tình trạng căn cứ, không phải xác suất tương lai:

- **Đủ điều kiện trong phạm vi quy tắc:** đủ dữ kiện để đưa góc tự đối chiếu đã duyệt.
- **Tín hiệu trái chiều:** có cả quy tắc hỗ trợ và quy tắc hạn chế đã duyệt cùng
  áp dụng cho một nhận định; giữ hai phía, nêu điều kiện phân biệt, không lấy trung bình.
- **Chưa đủ căn cứ:** thiếu điều kiện hoặc chưa có kiến thức được duyệt; không luận bù.

Sự vắng mặt của Tả–Hữu **không** chứng minh thiếu người giúp; không có Xương–Khúc
**không** chứng minh học kém. Hai bài tập phối hợp và ghi chép không phải hai tín hiệu
đối nghịch. Catalog hiện tại chưa có bộ quy tắc hạn chế đủ nguồn để tuyên bố đã giải
quyết xung đột cát–hung; danh sách counterevidence có thể rỗng và phải đúng thực tế.

Giữ bằng chứng theo **rule + cung gốc + quan hệ + sao thực tế**; chỉ gộp hai áp dụng
nếu vẫn bảo toàn mọi ngữ cảnh và đường truy nguồn. Không cộng Mệnh và Thân cùng
cung thành hai phiếu tăng sức mạnh. Không biến nhiều lần lặp lại một bằng chứng
thành độ chắc chắn cao hơn.

Khi cả hai cặp đang hoạt động cùng khớp, bài tập nối chúng thành hành động có điều
kiện: ghi yêu cầu/kết quả cần đạt, xác nhận người nhận việc, kiểm tra dữ kiện và mốc
báo vướng mắc. Đây là hướng dẫn tự đối chiếu, không khẳng định người dùng vốn có
những hành vi đó. Thiếu nhóm nào phải bỏ phần bài tập đặc thù của nhóm đó.

## 4. Chuẩn chống Barnum và an toàn

QA/DS chấm từng nhận định 0–2 điểm theo sáu mục; ngưỡng biên tập đề xuất ít nhất
10/12, không mục nào bằng 0. Đây không phải điểm chính xác Tử Vi hoặc điểm may mắn.

| Mục         | Mức 2 cần đạt                                                                           |
| ----------- | --------------------------------------------------------------------------------------- |
| Tính riêng  | Dữ kiện liên quan thay đổi làm đổi nhận định/bài tập, không chỉ đổi tên sao             |
| Tổng hợp    | Kết nối yếu tố có quan hệ được duyệt, giữ riêng phạm vi hình học/biên tập               |
| Điều kiện   | Có điều kiện áp dụng, ngoại lệ hoặc thiếu dữ kiện; không đổi thiếu hỗ trợ thành bất lợi |
| Tự kiểm tra | Một tình huống, hành vi và dấu vết đời sống cụ thể để người đọc kiểm tra                |
| Hành động   | Mỗi cảnh báo hành vi đi kèm cách điều chỉnh thực hiện được                              |
| Truy nguồn  | Dữ kiện thật → quy tắc → đoạn nguồn; tách ý sách khỏi hướng dẫn tự viết                 |

Bịa nguồn/sao, phán từ một sao, thông tin bị cấm hoặc điểm vận may vô căn cứ chặn
phát hành dù điểm rubric cao. Một câu dữ kiện sao tối đa trong mỗi đoạn thân bài;
bằng chứng chi tiết nằm trong “Vì sao”. Xưng “bạn”, Phu Thê dùng “người bạn đời”,
không định khuôn giới tính. Một dòng giới hạn ở đầu và một dòng footer, không chen
miễn trừ giữa các đoạn. Không dùng văn quyết đoán để che giới hạn kiểm chứng.

## 5. Corpus và kiểm thử: không chạy theo số lượng

Pilot mục tiêu khoảng 50 ca có nguồn, sau đó 200–300 khi đủ tư liệu. **Chưa tạo
những ca đó trong tài liệu này**. Không nhân bản 24 ca để gọi là 50 lá số chuẩn.

- Ca an sao: input, hồ sơ, expected cho trường xác minh được, nguồn/đoạn/trang,
  cách suy ra độc lập, người/vai trò kiểm tra và trường chưa biết. Expected chưa biết
  không phải `null` đúng, không implicit pass. Nguồn phải có trước chạy diff.
- Ca predicate: chart giả lập có chủ ý để thử đủ/thiếu/trùng/ngoài phạm vi, đồng cung
  khác hội chiếu, nhóm đồng thời, Thân cùng/khác Mệnh. Chúng không phải lá số chuẩn.
- Ca biên lịch: nhuận, Tý, Tết, 29/30 ngày theo đúng hồ sơ; không trộn đáp án trường
  phái khác. Đối chiếu lịch và đối chiếu an sao là hai phạm vi riêng.
- Engine snapshot chỉ dùng hồi quy. Hai chiều chuyển lịch round-trip cũng không
  tự chứng minh lịch đúng. AI kiểm tra chéo không phải chuyên gia độc lập.
- Mutation bắt buộc: đổi tên không đổi luận; đổi mối quan tâm chỉ đổi thứ tự; bỏ/
  di chuyển thành viên phải đổi điều kiện; có hai nhóm không bị nhánh đầu che nhóm
  sau; nhiều cung gốc không mất evidence khi gộp; nguồn thiếu không phát nhận định.

## 6. Lộ trình chỉ huy và cổng phát hành

| Mốc                       | Chủ trì / phối hợp        | Bàn giao và gate                                                                                                         |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| A — Hồ sơ và kiểm kê      | BA + QA/DS; PM duyệt      | Hợp đồng trên, độ phủ thực tế, sổ bất đồng; pilot chỉ tăng theo nguồn, không quota bịa dữ liệu                           |
| B — Tổng hợp có điều kiện | DEV + BA; QA kiểm tra     | Bảo toàn evidence, bài tập kết hợp hai nhóm, trạng thái đủ/thiếu trung thực; typecheck/unit/build/E2E và kiểm tra mobile |
| C — Mở nhóm kiến thức     | BA + DEV; QA/DS đối chiếu | Mỗi nhóm có nguồn, điều kiện/ngoại lệ, ca thuận/nghịch/thiếu; Khôi–Việt vẫn chặn đến khi đối chiếu an sao                |
| D1 — Cách cục             | BA + DEV; PM gate riêng   | Nhận diện đủ điều kiện, phá cách, ca gần giống không đạt, nguồn theo hồ sơ; chưa bật từ tập con sao                      |
| D2 — Luận vận             | BA + DEV + QA             | Kiểm chứng riêng thuật toán thời gian và quy tắc diễn giải; khoảng tuổi hiển thị không được đổi nhãn thành dự báo        |
| D3 — Hỏi tiếp AI          | DEV + BA + QA/DS          | Kho nguồn duyệt, câu trả lời truy nguồn/từ chối khi thiếu, consent riêng khi gửi dữ liệu; lỗi provider không phá lá số   |

PM ưu tiên sửa chất lượng B bằng kiến thức đã có trước khi mở nhóm mới. Các mốc D
không tự được mở sau khi B đạt test kỹ thuật. Không có hạn hoàn thành bịa, không
thuê dịch vụ/triển khai công khai/thay chính sách riêng tư âm thầm. Kết quả chạy thực
tế và phiên bản triển khai được lưu riêng trong `dev/` và `test/`; kế hoạch này
không được dùng để tự đánh dấu các gate đã qua.
