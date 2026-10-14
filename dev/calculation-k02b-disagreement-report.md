# HV-K02B — Calculation disagreement report

Ngày nghiên cứu: 14/10/2026. Trạng thái: **RESEARCH COMPLETE — PRODUCTION BLOCKED**.

## Kết luận ngắn

`1985-03-21` không còn là khác biệt output vô danh: JPL DE441 cho thấy xuân phân
rơi vào **20/03 theo UTC+7** nhưng **21/03 theo UTC+8**, còn sóc kế tiếp vẫn là
21/03 ở cả hai offset. Đây là cơ chế đủ để calendar dùng ngày dân dụng tạo leap
status khác nhau. Tuy nhiên K02B chưa có điều khoản chuẩn được admit để chọn profile;
không đổi production và không tạo golden fixture.

HKO/Chinese table và HND/Vietnamese conversion đang phản ánh hai profile có thể
khác nhau, không phải cuộc bỏ phiếu implementation. AstroPixels chỉ corroborate
thời điểm sóc; không xác nhận cách đánh số tháng. Full-chart search chưa tìm được
family vừa độc lập, có quyền dùng rõ và tương thích field-level với profile Huyền Vi.

## Bằng chứng và mức đạt

| Hạng mục                  | Bằng chứng thực chạy                                            | Mức đạt                                     |
| ------------------------- | --------------------------------------------------------------- | ------------------------------------------- |
| Mốc thiên văn             | 4 Horizons queries × Sun/Moon, 10-minute grid; bracket + digest | `observed-derived`, chưa golden             |
| Sóc độc lập               | AstroPixels hiển thị 11:59/05:22 UTC, khớp JPL đến phút         | timing corroboration only                   |
| Chinese calendar          | HKO PDF + method/uncertainty pages                              | official table observation, profile chưa đủ |
| Vietnamese implementation | HND pinned commit, UTC+7/+8 output                              | limited reference, không oracle             |
| Quy tắc chuẩn             | Metadata GB/T 33661-2017 thực tế                                | full clause chưa review; blocked            |
| Full chart                | 3 OSS candidate được rà license/lineage/profile                 | 0 compatible independent family             |

Chi tiết lệnh, input, output và digest:
`../test/calculation-k02b-reproduction.md` và
`../test/calculation-k02b-observations.json`.

## Mismatch taxonomy

- `profile-mismatch / timezone-civil-date-boundary`: trạng thái hiện tại của ca
  21/03/1985; đã có cơ chế thiên văn tái lập.
- `calendar-rule-not-fully-pinned`: chưa có source passage chính thức cho cách gán
  principal term/leap month ở trường hợp sát ranh giới.
- **Không** gắn `implementation-defect`: chưa có admitted expected cùng profile.
- **Không** gắn `unresolved-by-majority`: số website/package đồng thuận không được
  dùng để chọn đáp án.

## Full-chart reference

Không ứng viên nào qua gate independence + rights + exact profile:

1. TuViMCP có license Apache-2.0 nhưng core là lineage lasotuvi/ansaotuvi; tên
   “Independent” trong README không biến nó thành implementation family độc lập.
2. Renhuai công khai MIT nhưng `algorithm.ts` dựa trên iztro; không độc lập với
   family production và hệ Ni Haixia chưa được map sang target profile.
3. `thaylinh/tuvi-api` không có license quan sát được và ghi tham khảo cả iztro,
   lasotuvi; blocked trước khi chạy.

Vì vậy K02B có **0 full-chart admitted fixture**. Probe synthetic 29/08/2000 được
giữ làm target so sánh tương lai, không phải dữ liệu người thật hay oracle.

## Blocker và bước đề xuất

1. Review thủ công hợp lệ full text GB/T 33661-2017, ghi exact clause/edition/rights
   cho timezone, civil day, new moon, principal term và leap-month placement.
2. Pin target profile ở field level: timezone chuẩn, historical offset policy,
   ngày đổi, quy tắc sóc/trung khí và leap placement. PO phải duyệt mọi thay đổi.
3. Tìm một engine/chart table không dẫn xuất iztro hoặc lasotuvi, có license và
   công bố school/profile. Nếu không có OSS, đề xuất mua/tiếp cận tài liệu chỉ sau
   khi có giá, quyền trích fixture và sample đủ rõ; K02B chưa đề xuất chi phí mơ hồ.
4. Khi có rule passage + family độc lập, tạo fixture calendar trước; full-chart chỉ
   admit sau khi Mệnh–Thân, 12 cung và 14 chính tinh cùng exact profile đều resolved.

## Không thay đổi

Không sửa `src/`, dependencies, lockfile, production calculation profile, registry
chung hoặc rule luận giải. Không chạy `@dqcai/vn-lunar`; không đưa code sandbox vào
production.
