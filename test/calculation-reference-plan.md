# HV-K02A — Calculation reference and differential test plan

Ngày kiểm tra: 14/10/2026. Trạng thái: **CALCULATION REFERENCE REVIEW REQUIRED**.

## Mục tiêu và ranh giới

K02A thiết kế cách đưa một observation thành reference fixture có thể kiểm toán.
Mục tiêu `100%` chỉ áp dụng cho toàn bộ required fields của các ca có **cùng exact
calculation profile** và expected độc lập đã được admit. Hiện chưa có ca nào đạt
điều kiện đó; `calculation-k02-observations.json` không phải golden dataset.

Không dùng output Huyền Vi làm expected cho chính Huyền Vi. Không chọn kết quả theo
đa số website/package. Không thay calculation profile production trong task này.

## Profile phải được pin trước khi so sánh

Một fixture chỉ được xét admit khi có đủ:

| Nhóm       | Trường bắt buộc                                                                             |
| ---------- | ------------------------------------------------------------------------------------------- |
| Input      | calendar input type, civil date/time, gender convention, location nếu có                    |
| Time       | IANA timezone hoặc fixed offset, DST/history policy, late-Tý rollover                       |
| Calendar   | Chinese/Vietnamese convention, new-moon/solar-term basis, leap-month identity and placement |
| Tử Vi      | school/profile ID, Mệnh–Thân rules, palace order, star catalogue/version, Tứ Hóa table      |
| Provenance | source/revision/family, derivation, rights, reviewer, artifact digest                       |

`nam-phai-chinese-lunar-v1` hiện là production label nhưng không được xem là đã
được HKO hay `lasotuvi` xác nhận. Profile compatibility vẫn phải chứng minh theo
từng field family.

## Required fields và mẫu số

### Calendar slice

- Gregorian date ↔ lunar year/month/day.
- `isLeapMonth`, độ dài tháng 29/30.
- Timezone and day-boundary metadata.
- Late-Tý rule cho 23:00, 00:00 và 01:00.

### Full-chart slice

- Cung Mệnh, cung Thân và tên 12 cung theo địa chi.
- 14 chính tinh theo cung; sau đó mới đến phụ tinh/Tứ Hóa khi profile đã pin.
- Cục và metadata thực sự được downstream reading sử dụng.

Mẫu số không được bỏ field mismatch cùng profile. `different-profile`, `missing`
và `non-comparable` báo riêng; partial fixture không được tính như complete chart.

## Lưới ca tối thiểu đề xuất

| Family            | Vector                                                       | Mục đích                                  | Trạng thái hiện tại                                           |
| ----------------- | ------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------- |
| Leap start/end    | 2023-03-21, 03-22, 04-19, 04-20                              | tháng thường 30 ngày, tháng nhuận 29 ngày | HKO observation, chưa admit                                   |
| Disputed leap     | 1985-03-21 at UTC+7/+8                                       | tách bất đồng do timezone/convention      | unresolved                                                    |
| Month length      | ngày âm 29/30 và ngày kế tiếp                                | phát hiện off-by-one                      | mới có partial 2023                                           |
| Late Tý           | cùng civil date tại 22:59, 23:00, 23:59, 00:00, 00:59, 01:00 | rollover ngày và can-chi                  | blocked: `lasotuvi` chỉ nhận hour-branch integer              |
| Timezone boundary | cùng instant ở Asia/Ho_Chi_Minh và Asia/Hong_Kong            | tách civil date/new moon boundary         | cần profile + astronomical derivation                         |
| Full chart        | một input synthetic, exact same profile, hai family độc lập  | Mệnh–Thân/12 cung/14 chính tinh           | chỉ có `lasotuvi` observation không tương thích đã chứng minh |

Mỗi ca mới phải dùng input tổng hợp, không có tên/ngày sinh người thật.

## Mismatch taxonomy

| Category                     | Ví dụ                                    | Xử lý                            |
| ---------------------------- | ---------------------------------------- | -------------------------------- |
| `implementation-defect`      | code lệch admitted expected cùng profile | DEV sửa sau PO approval          |
| `source-variant`             | hai bảng rule khác nhau                  | giữ theo rule profile riêng      |
| `profile-mismatch`           | UTC+7 so với convention UTC+8            | non-comparable; không vote       |
| `extraction-defect`          | đọc sai hàng/cột PDF                     | sửa artifact kèm review record   |
| `insufficient-evidence`      | thiếu timezone/late-Tý rule              | fail-closed                      |
| `rights-blocked`             | không được lưu/reuse dữ liệu             | chỉ giữ citation/metadata hợp lệ |
| `unresolved-domain-conflict` | nhiều kết quả nhưng chưa rõ rule gốc     | không tạo expected               |

Mỗi mismatch record cần ID, field, canonical input, exact profiles, expected và
observed (nếu có), family/revision, category, owner, status và resolution evidence.

## Cổng nâng observation thành admitted expected

1. Rights cho phép giữ dữ liệu cần thiết và attribution được ghi.
2. Exact source revision/locator và derivation tái lập được.
3. Calculation profile tương thích ở đúng field family.
4. Expected không do system under test hoặc cùng implementation lineage sinh.
5. Phép tính trọng yếu có hai source/implementation family độc lập khi khả thi;
   thiếu family thứ hai phải mang trạng thái chưa xác minh và không tự admit.
6. Bất đồng đã được phân loại; không còn unresolved mismatch trong required fields.
7. PO duyệt admission và change record; QA khóa digest.

## Kiểm tra validator/schema

- JSON Schema từ chối field lạ ở contract/profile/provenance/observation.
- `observationId` duy nhất; source/profile/family không rỗng giả tạo.
- `admitted-expected` phải có exact profile, revision, digest và derivation (gate
  nghiệp vụ cần validator sau; schema hiện chỉ mô tả shape).
- Mutation timezone, leap flag, source family hoặc digest phải làm comparison gate
  fail, không được tự cập nhật expected để làm test qua.
- Fixture cùng lineage không được đếm là independent votes.

## Kết luận hiện tại

HKO phù hợp làm **calendar candidate** và cho phép reuse Data theo DATA.GOV.HK
Terms v1.2 với attribution/điều kiện kèm theo. Tuy nhiên tài liệu đã xem không khóa
timezone và complete rule profile, nên chưa thể làm oracle cho
`nam-phai-chinese-lunar-v1`. `lasotuvi` chạy full-chart trong sandbox nhưng profile
không công bố, API giờ sinh không đủ late-Tý, và bỏ cờ nhuận ở downstream chart.
K02 chưa có golden fixture nào.
