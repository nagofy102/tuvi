# Test context and acceptance plan

## Mục đích

Lưu tiêu chí nghiệm thu, dữ liệu tham chiếu, kết quả kiểm tra và lỗi còn mở.
Không đánh dấu “pass” cho kiểm tra chưa chạy. Mã kiểm thử sẽ nằm trong `tests/`.

Kế hoạch kiểm thử cho Reading UX vNext (chưa chạy/triển khai) nằm tại
`reading-vnext-test-plan.md`.

HV-R02 bổ sung review tài liệu/fixture và các gate chưa đạt trong cùng tài liệu;
không dùng review để khẳng định schema runtime hoặc chất lượng người dùng.
HV-R02C bổ sung rubric Style A và Swap Test dự kiến trên hai SignalSet do engine
sinh từ input tổng hợp; không coi chúng là đáp án an sao độc lập.
Xem `reading-style-a-review.md` cho tiêu chí, các tín hiệu quan sát và trạng thái
nghiệm thu tài liệu.

## Trạng thái hiện tại

Khung kiểm chứng Knowledge-First mới nằm tại `knowledge-first-validation.md`:
calculation yêu cầu 100% trên required fields cùng exact profile; interpretation
đặt mục tiêu đồng thuận thử nghiệm ≥80% trên structured comparable claims. Đây là
protocol đề xuất, chưa phải kết quả chạy hoặc bằng chứng dự báo.

Bước 2–4 đã có ứng dụng, bộ chuyển lịch, adapter an sao, trang SEO và ảnh OpenGraph thật.
`dev/schema.sql` chưa được thực thi trên PostgreSQL; kiểm tra SQL và migration ở giai đoạn tích hợp DB.
Các kiểm tra bên dưới xác nhận phần mềm và cấu hình tham khảo; không xác nhận khả năng
dự đoán hoặc độ chính xác theo mọi trường phái Tử Vi Việt Nam.

## Kết quả Bước 2–4 — 2026-10-13

Môi trường: Node.js 24.19.0, Next.js 16.4.0, TypeScript 7.0.2, Chromium hệ thống.
Checkout nền `f1eccda`; các kết quả này được ghi nhận trước khi tạo commit triển khai Bước 2–4.

| Lệnh/kiểm tra                                | Kết quả thực tế                                                   |
| -------------------------------------------- | ----------------------------------------------------------------- |
| `npm --cache /tmp/tuvi-npm-cache ci`         | Cài lại 213 package từ lockfile thành công                        |
| `npm run typecheck`                          | Pass                                                              |
| `npm test`                                   | 59/59 ca qua, 3 file test                                         |
| `npm run build`                              | Pass; 35 trang/tài nguyên prerender, route còn lại render khi cần |
| `npm run test:e2e`                           | 8/8 ca qua trên bản production mới                                |
| `npm run format:check` và `git diff --check` | Pass                                                              |
| Axe WCAG A/AA landing page                   | Không có vi phạm tự động phát hiện                                |
| Axe enhanced color contrast landing page     | Không có vi phạm ngưỡng tương phản chữ AAA tự động phát hiện      |
| Lighthouse mobile giả lập                    | Performance 95, Accessibility 100, SEO 100                        |

Lighthouse 13.5.0 đo ngày 13/10/2026 lúc 12:27 (Asia/Bangkok) trên server production cục bộ,
cấu hình mobile/network/CPU throttling mặc định. FCP 1.0s, LCP 2.6s, TBT 150ms, CLS 0.
Đây là một lần đo của môi trường này, không cam kết mọi thiết bị hoặc domain triển khai đạt cùng điểm.
Kiểm tra tự động tương phản không thay thế đánh giá khả năng tiếp cận thủ công đầy đủ.
Kiểm tra lần gửi biểu mẫu đầu tiên trong Chromium cục bộ (không throttling) đo từ click
đến thông báo kết quả: 366ms. Chưa xác nhận mục tiêu <1 giây trên mọi mạng/thiết bị thực.

## Bằng chứng và cách chạy lại

- Fixture lịch độc lập gồm 11 ngày Tết (1968, 1985, 2007 và 2020–2027), ngày trước Tết,
  tháng nhuận 2023 và Gregorian leap-year edge cases.
- Test adapter kiểm tra công thức đếm Mệnh/Thân ở 12 tháng × 12 giờ, 14 chính tinh,
  cấu trúc 12 cung, một Thân, mốc giờ Tý, chính sách tháng nhuận và đầu năm âm lịch.
- Ca Tử Vi cục/ngày áp dụng công thức đã ghi nguồn; không phải corpus được chuyên gia thẩm định.
- Ca tháng nhuận 2 năm 1985 xác nhận bộ an sao từ chối rõ ràng ngày lịch Việt Nam mà
  thư viện không biểu diễn được, thay vì làm sai lệch dữ liệu.
- E2E kiểm tra sinh lá số không POST thông tin cá nhân, đổi lịch giữ ngày, dialog/Escape,
  mobile 320px với cỡ chữ lớn, lỗi ngày sinh, SEO/JSON-LD, route 404, sitemap và ảnh PNG 1200×630.
- Ảnh kiểm tra được tạo trong `test-results/` (ignored): desktop, mobile, trang năm tuổi và OG.

Để đo lại Lighthouse, chạy `npm run build` và `npm run start`, rồi ở terminal khác:

```sh
CHROME_PATH=/usr/bin/chromium npx --no-install lighthouse http://127.0.0.1:3000 \
  --chrome-flags='--headless --no-sandbox' \
  --only-categories=performance,accessibility,seo \
  --output=json --output-path=/tmp/tuvi-lighthouse.json
```

Playwright tự chạy server production và yêu cầu port 3000 trống. Đã sửa cấu hình để không
tái sử dụng server cũ: server còn chạy sau rebuild có thể trỏ đến chunk JavaScript đã thay đổi,
khiến hydration thất bại dù code build mới đúng. Dừng/restart server do mình khởi chạy trước khi test.

## Giới hạn chưa nghiệm thu

- Chưa thẩm định trường phái Tử Vi bởi chuyên gia. Seam lịch Việt Nam hiện đã được triển khai;
  phạm vi kiểm tra được ghi riêng tại `calendar-remediation.md`, không xác nhận mọi trường phái.
- Chưa kiểm chứng toàn bộ ngày 1900–2099 bằng một bộ fixture độc lập đầy đủ.
- Chưa kiểm thử trên thiết bị thật, screen reader thực hoặc mọi trình duyệt.
- Chưa có DB, AI, tài khoản, PWA, HD PNG export hoặc triển khai công khai để nghiệm thu.

## Kết quả kiểm tra Bước 1 — 2026-10-13

Trên checkout nền `f1eccda` với thay đổi Bước 1 chưa commit:

- `git diff --check`: pass cho diff tracked.
- Kiểm tra bằng Node.js: 9 file tài liệu/schema tồn tại, không có trailing whitespace,
  có newline cuối file, code fence Markdown cân bằng.
- So sánh mô hình với schema: đủ 12 mã cung duy nhất, thứ tự/mã khớp nhau.
- Kiểm tra tham chiếu tên bảng dạng văn bản: 14 bảng, không có tên bảng tham chiếu bị thiếu.

Đây là kiểm tra tài liệu, không xác nhận SQL hợp lệ khi chạy, migration thành công
hoặc đúng thuật toán Tử Vi. Chưa chạy test ứng dụng, lịch âm, build hay Lighthouse.

## Ma trận nghiệm thu

| Giai đoạn   | Kiểm tra bắt buộc                                                      | Bằng chứng cần lưu                                           |
| ----------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| Bước 1      | Liên kết tài liệu, mô hình sao/cung/phiên bản, phạm vi đã làm/chưa làm | Kiểm tra file và diff                                        |
| Bước 2      | Build/typecheck, form, 12 cung, tooltip bàn phím, mobile, cỡ chữ       | Lệnh thực tế, kết quả tương tác và viewport                  |
| Bước 3      | Solar/lunar đối chiếu nguồn độc lập, lá số được chuyên gia duyệt       | Fixture có nguồn, số ca pass/fail, profile và engine version |
| Bước 4      | Route SEO, canonical, robots, JSON-LD, OG tiếng Việt                   | Response thật và kiểm tra ảnh                                |
| Persistence | Migration, FK/uniqueness/cascade, giao dịch đủ 12 cung, phân quyền     | PostgreSQL integration tests, rollback và migration replay   |
| Production  | PWA/export/AI, rate limit, riêng tư, backup, Lighthouse >90            | Kết quả thực đo trên bản build production                    |

## Các ca biên Bước 3

- Ngày dương không tồn tại; 29/02 năm nhuận và năm thế kỷ không nhuận.
- Âm lịch tháng 29/30 ngày; tháng nhuận thật và cờ nhuận sai.
- Giao thừa, ngày đầu/cuối tháng, âm lịch thuộc năm khác năm dương lịch.
- 22:59, 23:00, 23:59, 00:00, 00:59, 01:00; kiểm tra từng chính sách giờ Tý.
- Múi giờ khác Việt Nam, thay đổi offset lịch sử và giờ DST trùng/không tồn tại.
- Thiếu giờ sinh, ngoài khoảng hỗ trợ, input không hợp lệ và profile chưa duyệt.
- Cùng input/quy tắc cho cùng kết quả; đổi tên không đổi sao; chuyển lịch giữ nguyên ngày sinh.
- Đủ 12 cung duy nhất, đúng một Thân, sao hợp catalog; đại hạn/tiểu hạn theo profile.

Round-trip solar→lunar→solar là kiểm tra bổ sung, không thay thế đối chiếu độc lập:
hai chiều cùng sai vẫn có thể round-trip thành công.

## Các ca UI, SEO và riêng tư

- Toàn bộ tác vụ bằng bàn phím; focus/tooltip, trình đọc màn hình, zoom 200%, reduced motion.
- Không tràn ở 320px; CTA không che nội dung; tăng font không làm mất hành động.
- Kiểm tra tương phản từng cặp màu, không kết luận AAA từ bảng màu đơn thuần.
- Dữ liệu mẫu được gắn nhãn; thiếu điểm vận hạn không hiện phần trăm bịa đặt.
- Route năm/slug không hợp lệ trả 404; trang cá nhân không lọt sitemap hoặc cache công khai.
- Không truy cập được lá số người khác; share hết hạn/thu hồi không truy cập được.
- AI lỗi/timeout không làm hỏng lá số; thiếu provider không giả phản hồi từ AI.

## Handoff

### Bản đọc Công việc — luận trước, khuyên sau

Xem `career-reading.md` cho kiểm tra nội dung, nguồn/điều kiện và hai mục thu
gọn căn cứ/thực hành trên mobile. Chỉ nghiệm thu gói Công việc, không coi kiểm
tra nhánh văn bản là xác nhận nghề nghiệp/tính cách hoặc đóng corpus Nam phái.

### A1 nghiệm thu riêng; A2/A3 đổi hướng

Xem `../design/nam-phai-transition.md`: A1 đóng trong phạm vi hồ sơ/truy nguồn.
Audit metadata đợt này qua, không kiểm tra lại ảnh. Kiểm tra cũ giữ phạm vi hồ sơ
cũ; kết quả đối thủ cần nguồn và cấu hình tương thích trước nhận làm đáp án.

### Mốc B — bài tập theo chủ đề v6

Xem `thematic-exercises.md`: phân biệt tình huống công việc/tiền bạc/đồng hành,
cho phép bỏ qua bài tập không phù hợp và hiện hành động trước phần đọc sâu.
Không mở nhóm sao mới hoặc đóng gate toàn bộ rubric.

### Mốc A — sổ nguồn được duyệt

Xem `source-registry.md`: chặn thay trích đoạn/URL/revision bằng metadata fixture,
quyền dùng từng trường expected và audit mã ảnh cục bộ. Không thêm ca, không lấy
scan hay catalogue làm đáp án an sao; không mở C/D. Bảng PM tại
`../design/pm-milestone-status.md`.

### Đối chiếu scan và mở corpus từng phần

Xem `source-corpus-intake.md` cho bằng chứng của increment sau `24e9dfb`:
đếm đáp án trước engine, siết cổng metadata và giữ trường chưa kiểm chứng.
Không coi bản scan là ấn bản độc lập đã xác thực hoặc tự mở sao/luận vận.
Payload mobile giảm nhưng đo lặp vẫn chưa đạt >90 ổn định.

### Tổng hợp biên tập có điều kiện — v5

Xem `reading-synthesis.md` cho tiêu chí và kết quả chạy gói nâng cấp trên nền
`3c9cc79`. Kế hoạch PM tại `../design/reading-synthesis-plan.md`; triển khai tại
`../dev/reading-synthesis.md`. Giữ nguyên corpus từng phần, chưa thêm đáp án an sao
hoàn chỉnh hoặc quy tắc tín hiệu đối nghịch được thẩm định.

### Mobile-first redesign theo khảo sát đối thủ

Xem `mobile-redesign.md` cho kết quả kiểm tra giao diện và regression của bản này;
nghiên cứu, giới hạn khảo sát và đề xuất kiến thức nằm ở
`../design/competitor-mobile-review.md`. Không coi khảo sát trang công khai là
thẩm định nội dung trả phí, hiệu quả giữ chân hoặc độ chính xác thuật toán.

### Ba ưu tiên PM sau trải nghiệm giả lập

Xem `pm-priorities.md`: 166 unit, 20 E2E qua; mở đầu theo dữ kiện thật, đọc ngắn trước
biểu đồ, giờ chưa biết không gán giờ và lưu hồ sơ cục bộ có đồng ý/mở lại/xóa.
Đo lại 8 cấu hình; cùng ca mobile 320px/chữ cực lớn giảm chiều cao mặc định khoảng
78%. Đây không phải kiểm chứng dự báo; dữ liệu lưu không mã hóa và không đồng bộ.

### Nâng cấp UI và văn phong theo chủ đề

Xem `ui-content-upgrade.md` cho bằng chứng popup căn giữa, theme navy/vàng,
ẩn nhãn kỹ thuật, ba mạch đọc và lựa chọn mối quan tâm. Giữ giới hạn luận hạn/Phi Hóa
và thẩm định độc lập; không thay engine hoặc dùng output engine làm oracle.
Kết quả cuối: unit 152/152, E2E production 14/14, build/typecheck/format qua;
auto-diff 24/24 ca từng phần, 146 trường. Chưa đo lại Lighthouse.

### Mốc 2–3 — kiến thức và luận giải nhóm có căn cứ

Xem `knowledge-validation.md`: 24 ca JSON từng phần với 146 trường có nguồn độc lập
với engine; không có lá số golden hoàn chỉnh. Unit 139/139 và E2E production 11/11 qua;
build/typecheck/auto-diff qua. Tả–Hữu/Xương–Khúc và Tử Vi với hỗ trợ có bộ lọc ngữ cảnh,
Mệnh–Thân/tam phương tứ chính có “Vì sao”. Khôi–Việt và cách cục/vận hạn chưa kích hoạt.
Mọi nguồn truy về bản sách ghim phiên bản; bất đồng vẫn mở, không coi AI review là thẩm
định độc lập hoặc khả năng dự báo đã được kiểm chứng. Chưa đo lại Performance.

### Mốc 1 theo lộ trình PM mới — sửa lịch Việt Nam

Bản tích hợp engine có seam lịch Việt Nam và profile v2 đã triển khai. Xem
`calendar-remediation.md` cho lệnh, kết quả và phạm vi; các kết quả phía dưới là
lịch sử trước bản sửa. Không suy ra thẩm định chuyên môn từ kết quả kiểm thử kỹ thuật.

- Audit 1950–2026 đã hoàn tất: 28.124 round-trip và tuple bridge qua; 447 ngày 30 sai bị từ chối.
- Lá số có chọn lọc: 10.900/10.900 lượt qua trên 1.144 ngày đầu vào.
- Quan hệ giờ Tý: 5.420/5.420 qua, không còn ca thiếu lá số trong ma trận.
- Unit 117/117, E2E production 10/10; build, typecheck, engine reproducibility và format qua.
- 85 ca lỗi vẫn thấy ở converter upstream nguyên bản nhưng không còn làm hỏng các
  ca lập lá số được kiểm tra qua seam mới. Chưa xác nhận chuyên môn độc lập hoặc Performance >90.

### Luận giải tham khảo — 2026-10-13

- Typecheck và build qua; unit tests 102/102, gồm 31 ca kiểm tra nội dung/cấu trúc luận giải.
- Chromium E2E 10/10: bản minh họa, đọc theo lá số mới, 12 cung, nguồn, bàn phím và không gửi POST dữ liệu.
- Đã kiểm tra không giữ luận giải cũ sau nhập lỗi hoặc ngày nhuận engine chưa hỗ trợ.
- Mobile 320px/cỡ chữ lớn, axe A/AA và tương phản chữ AAA qua; test AAA mở toàn bộ chi tiết luận giải.
- Có nghiên cứu nguồn cổ và review AI, không có chuyên gia con người hoặc bộ Ground Truth đã thẩm định.
- Các lần Lighthouse trước tối ưu chưa ổn định (Performance 43/93/72); đã tách tải module
  luận giải và chỉ mở bản đọc minh họa theo yêu cầu. Kết quả bản cuối được ghi riêng bên dưới.
- Bản cuối tách tải: Performance 57 rồi 88; Accessibility/SEO 100. Mục tiêu Performance >90
  chưa được nghiệm thu ổn định; không dùng lần đo 93 trước đó để kết luận bản cuối đạt.

Xem `../dev/interpretation-implementation.md` để biết đầy đủ lệnh, phạm vi, lỗi tương phản
đã sửa và giới hạn. Đây là kết quả trước bản sửa lịch; xem `calendar-remediation.md`
cho trạng thái sau sửa. Luận giải không xác nhận độ chính xác dự báo.

### RUN_TECH_AUDIT — 2026-10-13

- Đã chạy quét lịch hàng ngày 1950–2026: 28.124 round-trip qua; 447 ngày 30 không tồn tại bị từ chối đúng.
- Lịch bên trong engine không biểu diễn/bảo toàn được 85 đầu vào: 60 mất cờ nhuận,
  22 ngày 30 không có trong tháng tương ứng và 3 lỗi dựng tháng thường trước tháng nhuận.
- Ma trận lá số có chọn lọc: 11.046 lượt, 9.369 thành công và 1.677 bị từ chối do lịch upstream.
- Đối chiếu giờ Tý: 4.624 qua, 0 sai khác; 796 không kiểm tra được vì thiếu lá số.
- `npm test`: 71/71 qua; typecheck, format và diff whitespace qua. Chưa có xác nhận chuyên gia.

Xem `tech-audit.md` để biết phạm vi, phiên bản, phân tích nguyên nhân và cách chạy lại.
Script không kiểm tra mọi tổ hợp ngày × giờ × giới tính; tỷ lệ thành công kỹ thuật không phải
độ chính xác chuyên môn. Báo cáo đầy đủ và mã nguồn Markdown được sinh trong
`test-results/tech-audit/` (ignored); tóm tắt bằng chứng được lưu ở tài liệu này và `tech-audit.md`.

Kế hoạch thẩm định chuyên môn đề xuất được lưu tại `../design/chart-validation-plan.md`.
Bộ lá số chuẩn 200–300 ca, việc thuê chuyên gia và các mốc nghiệm thu trong kế hoạch chưa
được triển khai; không coi chúng là bằng chứng pass hiện tại.

Sau mỗi lần chạy, ghi ngày, revision Git, lệnh, môi trường, số ca và lỗi còn tồn tại.
Fixture Tử Vi phải ghi nguồn, trường phái và phiên bản quy tắc; không tự lấy output của
thuật toán làm expected output rồi coi là kiểm chứng.

### HV-R03/R04/R05 — Reading Brief v1 — 2026-10-14

- Shared schema rejects unknown fields, invalid status/origin/verification
  combinations, unresolved claim/evidence references, unapproved templates and
  duplicate semantic insights.
- Exact synthetic A1 SignalSet selects one approved insight; a distinct synthetic
  1990 SignalSet returns `insufficient-evidence`. These are regression inputs, not
  independently verified astrology oracles.
- `npm run typecheck`, production `npm run build`, 321/321 unit tests and 31/31
  Chromium E2E tests passed after integration.
- E2E covers 320px layout, expandable evidence, persistent demo label, honest
  insufficient state, no POST transfer, WCAG A/AA and existing enhanced AAA
  contrast gate.
- Scope remains one exact Công việc A1 structure. No claim is made for other star
  combinations, conflicting signals, formations, fortune periods or predictive
  validity.
