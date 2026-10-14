# HV-K01B — Competitor and open-source calculation survey

Ngày truy cập: 14/10/2026 (Asia/Bangkok). Trạng thái:
**WAITING FOR INDEPENDENCE REVIEW**.

## Mục tiêu và phương pháp

Khảo sát này nhận diện implementation family, profile công bố và vector có thể tái
lập cho K02. Nó không chọn oracle, không xác nhận Nam phái và không biến đồng thuận
giữa các website thành bằng chứng đúng. Các request website chỉ đọc trang công khai,
`robots.txt` và điều khoản; không đăng nhập, không POST dữ liệu, không scrape hàng
loạt và không lưu nội dung luận giải.

Input chạy thử đều là dữ liệu tổng hợp không gắn với cá nhân:

- `2000-08-29`, giờ Tỵ/index 5, nam;
- `1985-03-21`, đầu giờ Tý/index 0, nam — probe bất đồng tháng 2
  thường/nhuận;
- `2023-03-22`, giờ Tỵ/index 5, nam — quan sát tháng nhuận 2.

Output thực đã chạy được ghi nguyên trạng có chọn lọc trong
`../test/calculation-observation-vectors.json`. Output chỉ là observation của đúng
version/options, chưa phải expected golden.

## Open-source implementations

| ID / family                                                  | Phiên bản đã quan sát                                                                                                            | Phạm vi và defaults công bố/quan sát                                                                                                                                                    | License và khả năng tái lập                                                                                                                              | Compatibility / giới hạn kiểm chứng                                                                                                                                                         |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oss.iztro` / `impl.iztro-6tail`                             | npm `iztro@2.6.2`; tag `v2.6.2`, commit `7b0a0e1d85edff436b3b8bd03e88b5bd31c9f0d7`                                               | API `astro.bySolar(date,timeIndex,gender,fixLeap,language)` tạo 12 cung, Mệnh/Thân, Cục, chính/phụ tinh. Lần chạy pin `fixLeap=true`, `zh-CN`; README không khai báo timezone argument. | MIT; package/repo công khai. Chạy cục bộ từ dependency đã pin của dự án.                                                                                 | Đây là engine hiện Huyền Vi đang dùng nên **không độc lập** với engine cần kiểm tra. Không tự suy ra Nam phái.                                                                              |
| `oss.lunar-lite` / `impl.iztro-6tail`                        | npm `lunar-lite@0.2.8`; repo `SylarLong/lunar-lite`, HEAD quan sát `1d104ff...`; package pin phụ thuộc `lunar-typescript@^1.8.6` | Solar↔Chinese lunar conversion; leap flag. API không nhận timezone trong lần chạy.                                                                                                      | MIT; package/repo công khai.                                                                                                                             | Là dependency trực tiếp của iztro và wrapper quanh 6tail; không tính thành family độc lập với iztro hoặc `lunar-typescript`.                                                                |
| `oss.lunar-typescript` / `impl.6tail-lunar`                  | npm `1.8.6`; tag `v1.8.6`, commit `0f3e95d15e31f1a7c7b93d624542649347328a20`                                                     | Chinese solar/lunar calendar; tháng nhuận biểu diễn bằng month âm. Không phải engine an sao Tử Vi.                                                                                      | MIT; package/repo công khai, không dependency runtime theo package metadata.                                                                             | Cùng lineage với `lunar-lite` trong luồng hiện tại; chỉ quan sát conversion, không đối chiếu cung/sao.                                                                                      |
| `oss.lasotuvi` / `impl.doanguyen-lasotuvi-hnd`               | repo `doanguyen/lasotuvi`, commit `ace8379a3ea033674e8a9096f5b98a9e2041eace`, package version `0.1.2`                            | Python an sao; `Lich_HND.S2L` nhận timezone, lần chạy dùng `+7`. Code ghi nguồn thuật toán Hồ Ngọc Đức/Meeus. Test calendar hiện có assertion thực bị comment; dependencies rất cũ.     | MIT; clone commit và chạy trực tiếp hàm thuần Python thành công, không cài dependency.                                                                   | Family khác codebase iztro, nhưng calendar lineage HND không đồng nghĩa độc lập học thuật. Chưa chạy full chart do dependency `ephem==3.7.6.0`/toolchain cũ; chưa xác định profile Nam/Bắc. |
| `oss.dqcai-vn-lunar` / `impl.dqcai-vn-lunar-unknown-lineage` | npm `@dqcai/vn-lunar@1.0.1`; npm trỏ repo commit HEAD quan sát `3fdcb4f...` nhưng release-to-commit chưa pin được                | Vietnamese solar/lunar conversion, leap flag; README nói 1200–2199. API không nhận timezone; output package đã chạy cục bộ.                                                             | npm metadata/README nói MIT, nhưng GitHub API không nhận diện license và URL `/LICENSE` trả 404. Chỉ được coi là **license discrepancy** cho đến review. | Implementation family gốc chưa công bố/đối chiếu; không được tính độc lập. Output 1985/2023 trùng hai implementation khác trên ba vector nhỏ, nhưng đó không chứng minh đúng.               |

### Dependency and independence finding

`iztro@2.6.2 → lunar-lite@0.2.8 → lunar-typescript@1.8.6`, đồng thời iztro còn
phụ thuộc trực tiếp `lunar-typescript`. Vì vậy ba package này không tạo ba family
đối chiếu. `lasotuvi` là codebase khác nhưng tự ghi dùng thuật toán Hồ Ngọc Đức dựa
trên Meeus cho lịch. `@dqcai/vn-lunar` không công bố lineage đủ rõ và bundle phát
hành bị obfuscate, nên trạng thái độc lập là `unknown`, không phải independent.

Kết luận gate: đã phân loại ít nhất ba family/lineage candidate, nhưng mới có một
family an sao đầy đủ chạy được (`iztro`) và một family an sao khác chỉ chạy được
conversion (`lasotuvi`). Chưa đủ hai oracle độc lập cho các trường chart trọng yếu.

## Website observations

| Site               | Access/robots/terms thực tế                                                                                                                         | Input/options/output công khai quan sát                                                                                                                                     | Profile/default công bố                                                                                                  | Trạng thái dùng cho K02                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `aituvi.com`       | `/` và `/robots.txt` HTTP 200. Robots disallow `/horoscope`; Terms `/terms-of-use` cấm sao chép/tái sử dụng và reverse engineering.                 | Homepage nhắc nhập dữ liệu và âm lịch; không gọi route bị disallow, không lấy chart.                                                                                        | Timezone, nhuận, giờ Tý, engine lineage không xác định từ trang được phép đọc.                                           | Metadata candidate; **không có vector**, non-comparable.                   |
| `tuvi.dev`         | `/` và robots HTTP 200; robots chặn GPTBot/ChatGPT-User và nhiều AI agents. Điều khoản cấm sao chép/reverse engineering.                            | Không tiếp tục tự động hóa route sản phẩm sau khi đọc robots; không lấy chart.                                                                                              | Homepage có nhắc âm lịch/giờ Tý nhưng không đủ pin calculation profile.                                                  | Rights/automation-blocked cho task này; **không có vector**.               |
| `horos.vn`         | `/` HTTP 200; robots disallow `/teaser/personal`, `/app/zwds` và các route preview liên quan.                                                       | Không gọi URL teaser có query, không lấy chart.                                                                                                                             | Không xác định engine, timezone hoặc leap/Tý từ trang chủ.                                                               | Metadata candidate; **không có vector**, non-comparable.                   |
| `meobeostudio.com` | `/`, `/tu-vi`, robots và Terms HTTP 200. Robots cho phép `/tu-vi`, disallow action khác; Terms cấm truy cập tự động trái phép và sao chép nội dung. | Form công khai cho dương/âm, cờ tháng nhuận, 13 canh giờ; không POST. Trang ghi Tý 23:00–23:59 chuyển ngày sau, 00:00–00:59 giữ ngày; form chứa bảng tháng nhuận 1900–2099. | Site tự khai báo Đẩu Số Toàn Thư/Bắc phái phổ biến tại Việt Nam và lịch Hồ Ngọc Đức. Đây là self-claim, chưa kiểm chứng. | Candidate profile observation; chưa có output chart nên không phải oracle. |
| `tuvi.vn`          | `/`, `/lap-la-so-tu-vi`, robots và privacy HTTP 200; robots `Allow: /`.                                                                             | Form POST `/la-so` nhận dương/âm, GMT+7, giờ/phút, giới tính và năm/tháng xem. Không POST, không lưu chart từ URL chứa dữ liệu cá nhân.                                     | Form default quan sát GMT+7; leap/Tý/school/engine lineage chưa được công bố đủ tại locator này.                         | Candidate interface observation; **không có vector**, non-comparable.      |

HTTP 200 chỉ chứng minh tài nguyên truy cập được ngày khảo sát, không chứng minh nội
dung đúng, quyền tái sử dụng rộng hơn hay hai site độc lập. Terms/robots có thể đổi;
K02 phải kiểm tra lại trước mỗi hoạt động tự động.

## Quan sát tái lập và bất đồng

Ba converter cùng trả `1/8/2000` cho `2000-08-29` và cùng đánh dấu `2023-03-22`
là `1/2 nhuận/2023`. Riêng `1985-03-21` tạo bất đồng có thể tái lập:

- `lunar-lite/lunar-typescript` trả `1/2/1985`, **không nhuận**;
- `lasotuvi.Lich_HND` với timezone `+7` và `@dqcai/vn-lunar` trả
  `1/2 nhuận/1985`;
- iztro hiển thị `二月初一`, không có ký hiệu nhuận, phù hợp dependency 6tail trong
  quan sát này.

Đây là profile/implementation disagreement cần K02 phân tích, không phải bằng chứng
bên nào đúng. Hai implementation trả nhuận chưa được chứng minh độc lập về lineage.
Vector iztro còn ghi output Mệnh/Thân/Cục và vị trí chính tinh; đó là snapshot của
engine hiện tại, tuyệt đối không dùng làm expected khi kiểm tra chính engine đó.

Các defaults còn thiếu hoặc khác profile:

- iztro dùng Chinese lunar dependencies; không có timezone argument ở API đã chạy;
- lasotuvi calendar nhận timezone `+7`, nhưng full chart chưa chạy được;
- Mèo Béo công bố Bắc phái/Hồ Ngọc Đức và late-Tý rollover, khác mục tiêu profile
  Nam phái của Huyền Vi nên chỉ so khi field/profile tương thích;
- các site còn lại không công bố đủ timezone, leap placement, late-Tý và lineage.

Không mismatch nào được phân loại là lỗi engine trong K01B. Bất đồng 1985 chưa có
expected được admit và chưa có hai implementation family độc lập, compatible cùng
profile.

## Nguồn và locator đã truy cập

- npm registry metadata: `iztro`, `lunar-lite`, `lunar-typescript`,
  `@dqcai/vn-lunar`, phiên bản latest tại 14/10/2026.
- GitHub API/raw/repository: `SylarLong/iztro`, `SylarLong/lunar-lite`,
  `6tail/lunar-typescript`, `6tail/lunar-javascript`,
  `cuongdqpayment/dqcai-vn-lunar`, `doanguyen/lasotuvi`; commit/tag nêu trong bảng.
- Package README/metadata cục bộ của đúng versions trong lockfile Huyền Vi.
- Website locators: `/robots.txt`, trang chủ, policy/terms nêu trong bảng;
  riêng Mèo Béo đọc `/tu-vi`, TuVi.vn đọc `/lap-la-so-tu-vi`.

Không dùng search snippet làm evidence, không sao chép prose luận giải và không ghi
nhận nội dung trả phí.

## Blockers và đề xuất review

1. Tìm implementation an sao thứ hai có license rõ, profile pin được và chạy được
   trên vector tổng hợp; `lasotuvi` cần sandbox dependency/toolchain trước khi chạy
   full chart.
2. Xác minh lineage và license thực của `@dqcai/vn-lunar`; trước đó không dùng làm
   family độc lập hoặc tái sử dụng source.
3. Yêu cầu từng website cấp API/export hoặc cho phép test thủ công nếu PO muốn chart
   comparison; không bypass robots/Terms.
4. K02 chỉ nâng vector thành expected sau khi K01C admit source, exact profile và
   derivation; giữ `observed-not-golden` cho toàn bộ file hiện tại.
