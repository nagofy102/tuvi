# HV-K02B/K03A2/K04A — Integrated research report

Ngày: 14/10/2026. Baseline nghiên cứu: `origin/main@9a16b73`. Trạng thái:
**RESEARCH INTEGRATED — PRODUCTION CHANGES BLOCKED**.

## Executive summary

- K02B đã tái lập cơ chế bất đồng `1985-03-21`: xuân phân nằm ngày dân dụng
  20/03 ở UTC+7 nhưng 21/03 ở UTC+8, trong khi sóc kế tiếp vẫn là 21/03 ở cả hai.
  Đây là `profile-mismatch / timezone-civil-date-boundary`, chưa phải bằng chứng lỗi engine.
- K03A2 có 5 passage được pin locator/revision và 2 rule phương pháp candidate.
  Chúng cùng một textual family, chưa có xác nhận độc lập và không sinh claim cá nhân.
- K04A biểu diễn 2 candidate rule K03A qua evaluator nghiên cứu với 6 case; mọi
  đường chạy đều fail closed và có `allowedClaimIds=[]`.
- Revision quyển ba `2268626` được thêm vào Source Registry ở mức `source-backed`
  cho revision/locator. Không passage/rule nào được nâng thành production.

## K02B — Calculation verification

JPL Horizons DE441 với lưới 10 phút và nội suy trong bracket quan sát cho kết quả:

| Event       | UTC                 | UTC+7          | UTC+8          |
| ----------- | ------------------- | -------------- | -------------- |
| Sun 0°      | 1985-03-20 16:13:45 | 20/03 23:13:45 | 21/03 00:13:45 |
| Conjunction | 1985-03-21 11:58:42 | 21/03 18:58:42 | 21/03 19:58:42 |

AstroPixels corroborates thời điểm sóc đến phút; HKO/HND thể hiện các profile lịch
khác nhau, không phải các phiếu bầu chọn đáp án. Ba ứng viên full-chart đã rà đều
không qua gate độc lập + license + exact-profile: TuViMCP thuộc lineage lasotuvi,
Renhuai dựa iztro, `thaylinh/tuvi-api` thiếu license và trộn lineage. Kết quả:
**0 golden fixture, 0 compatible independent full-chart family**.

Blocker: cần review hợp pháp điều khoản đầy đủ GB/T 33661-2017 và một family
full-chart độc lập công bố profile. `@dqcai/vn-lunar` vẫn blocked.

## K03A2 — Domain extraction

Hai candidate phương pháp đạt mức `source-backed-not-independent`:

1. Xét Mệnh, rồi Thân, sau đó Di–Tài–Quan; không tự thay Tài bằng Nô.
2. Giữ riêng tín hiệu hỗ trợ/đối nghịch; thiếu precedence có nguồn thì defer,
   không đếm số sao, tự đặt trọng số hoặc tự hòa giải.

Chưa có vocabulary/profile versioned cho miếu/vượng, hóa cát/kỵ, tam phương/tứ
chính, đối/hợp chiếu, hình/xung/khắc/phá. Không tìm được passage nối Mệnh–Quan–Nô.
Bản dịch/paraphrase vẫn cần review văn bản học trước khi dùng ngoài nghiên cứu.

## K04A — Evaluator prototype

Prototype chỉ dùng hai rule K03A cũ:
`k03a-career-context-order-001` và `k03a-empty-menh-tai-quan-001`. Nó kiểm tra
conditions, exclusions, missing fact/vocabulary, evidence, profile, lifecycle và
conflict. Sáu case structural bao phủ matched shape, thiếu dữ kiện, exclusion và
forbidden substitution; không case nào được phép tạo claim.

Giới hạn ontology phát hiện được: K03B bắt buộc `allowedClaimKinds` không rỗng,
trong khi methodology rule phải không sinh claim. Chưa sửa contract. PO/Architect
cần chọn giữa bổ sung loại `methodology-rule` hoặc tách rule điều phối khỏi claim rule.

## Mức tri thức đạt được

| Area                  | Achieved                                   | Not achieved                                         |
| --------------------- | ------------------------------------------ | ---------------------------------------------------- |
| Calendar disagreement | Cơ chế thiên văn/timezone tái lập được     | Chưa có admitted profile clause hay golden           |
| Full-chart comparison | Lineage/license/profile screening thực tế  | Chưa có family độc lập tương thích                   |
| Career methodology    | Passage/rule candidate có trace            | Chưa độc lập, chưa profile/vocabulary, chưa approved |
| Reasoning model       | Deterministic fail-closed structural trace | Chưa production evaluator, chưa reader claim         |

## Quyết định cần Product Owner

1. Có cho phép K02C tiếp cận/review hợp pháp full text GB/T 33661-2017 để pin
   timezone/civil-day/new-moon/principal-term/leap clauses hay không.
2. Với ontology, chọn `methodology-rule` không claim hay tách orchestration rule
   khỏi claim rule; cả hai vẫn chỉ prototype cho đến review tiếp theo.
3. Có ưu tiên tìm/mượn một ấn bản family khác có page locator và quyền nghiên cứu
   cho vocabulary liên cung trước khi mở K04B hay không.

Không có đề xuất mua nguồn cụ thể ở vòng này vì chưa có sản phẩm trả phí đáp ứng đủ
identity, sample, quyền nghiên cứu và giá để PO đánh giá.

## Kiểm tra tích hợp thực chạy

- Source Registry: Draft 2020-12 + URI format + reference integrity pass, 4 source,
  3 passage, 2 review event.
- K03A2: 5 passage, 2 candidate rule và 8 case có ID/reference hợp lệ; 0 rule approved.
- K04A: 2 rule, 6 case, `productionEligible=false`, 0 allowed claim path.
- K02B: JSON parse/invariant pass; 0 admitted golden token.
- `npm run audit:sources`: pass trên legacy runtime registry; báo 0 complete golden
  chart và `independentEditionsVerified=false`.
- Prettier cho toàn bộ artifact tích hợp và `git diff --check`: pass.

Không chạy application build/test vì vòng này không thay đổi `src/`, dependency hay runtime.

Stop state: **WAITING FOR PRODUCT OWNER REVIEW**.
