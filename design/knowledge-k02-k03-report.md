# HV-K02/K03 — Knowledge development report

Ngày 14/10/2026 (Asia/Saigon). Trạng thái: **WAITING FOR PRODUCT OWNER REVIEW**.
K02A, K03A và K03B đã hoàn thành ở mức nghiên cứu/prototype; không sửa production,
không admit golden fixture, rule production hoặc thay calculation profile.

## Executive summary

- K02A tạo reference plan/schema và 5 observation có provenance; số expected/golden
  được admit là **0**. HKO và `lasotuvi` giúp khoanh vùng bất đồng lịch nhưng chưa
  tương thích profile đủ để làm oracle.
- K03A truy cập hai revision cùng textual lineage, trích 5 passage giới hạn và tạo
  3 candidate rule. Nguồn hỗ trợ thứ tự Mệnh–Thân rồi Di–Tài–Quan, không hỗ trợ
  việc tự ghép trục Mệnh–Quan–Nô.
- K03B tạo ontology file-based tách chart facts, domain knowledge và inference
  trace. Ba graph view đều là `structural-mock`, `productionEligible=false`.
- Không có đề xuất nguồn trả phí đủ điều kiện ở vòng này. R07B, UI, AI Writer và
  reasoning runtime tiếp tục tạm dừng.

## K02 — Calculation Verification

### HKO

DATA.GOV.HK Terms v1.2 cho phép reuse data có attribution, nhưng tài liệu HKO đã
đọc không pin timezone basis hoặc toàn bộ astronomical/profile convention. Bảng
1985 quan sát `1985-03-21 → 1/2 thường`; đây vẫn chỉ là candidate observation,
không phải expected cho `nam-phai-chinese-lunar-v1` và không hỗ trợ an sao.

### `doanguyen/lasotuvi@0.1.2`

Repository MIT được pin tại commit `ace8379a3ea033674e8a9096f5b98a9e2041eace`.
Dependency rất cũ nên không được cài. Static scan giới hạn không thấy pattern thực
thi lệnh/network nguy hiểm; direct Python 3.12 conversion và full-chart smoke chạy
được trong sandbox. Tuy nhiên:

- metadata version nội bộ không nhất quán;
- profile/trường phái không xác định;
- `lapDiaBan` không dùng cờ `thangNhuan`;
- giờ sinh chỉ là index địa chi, không kiểm tra civil rollover giờ Tý;
- HND cho `1985-03-21` là tháng 2 nhuận ở UTC+7 nhưng tháng 2 thường ở UTC+8.

Do đó implementation này chỉ dùng phát hiện sai khác, không phải oracle. Upstream
pytest bị chặn vì môi trường không có `pytest`; dự án không cài dependency cũ.
`@dqcai/vn-lunar` tiếp tục blocked theo quyết định PO.

### Reference gate

Schema fixture đã định nghĩa provenance, profile, field scope, derivation,
independence và admission state. Target 100% chỉ có nghĩa 0 mismatch trên required
fields đã được admit trong cùng exact profile. Hiện chưa có record đạt gate golden.

## K03A — Domain Knowledge Extraction

Hai revision Wikisource thực truy cập thuộc cùng dòng `紫微斗數全書`, không phải hai
family độc lập và không chứng nhận Nam Phái:

- 5 passage có locator, trong đó 4 passage tạo được 3 rule nghiên cứu;
- `k03a-career-context-order-001`: candidate cho thứ tự xét Mệnh–Thân rồi
  Thiên Di–Tài Bạch–Quan Lộc;
- `k03a-empty-menh-tai-quan-001`: candidate cho Mệnh vô chính diệu cần xét
  Tài–Quan/hội chiếu, nhưng vocabulary/profile còn thiếu;
- `k03a-tianxiang-quan-001`: blocked cho reader-facing output vì điều kiện phối hợp
  và ngôn ngữ kết quả đời sống chưa đủ để chuyển thành claim hiện đại.

Không passage nào đủ căn cứ cho liên kết Mệnh–Quan–Nô. Nô Bộc chỉ xuất hiện trong
mảnh star-specific và bị loại khỏi extraction. Ba rule chưa được approve; sáu test
case chỉ mô tả gate/fail-closed dự kiến, không phải oracle Tử Vi.

## K03B — Ontology Prototype

Ontology và JSON Schema biểu diễn:

1. `ChartFact`: fact có calculation profile/version và verification state;
2. `DomainKnowledge`: rule, predicate, exception, dispute, passage/profile refs;
3. `InferenceTrace`: candidate, predicate result, rejection, conflict và outcome.

Schema từ chối unknown fields và endpoint edge sai loại. Semantic contract yêu cầu
reference/revision/profile/admission/conflict checks; unknown hoặc unresolved phải
fail closed. Không có numeric weight, automatic conflict resolution hoặc vendor
graph database. Vì K03A chưa được PO review/admit, mọi example vẫn là structural mock.

## Kiểm tra tích hợp thực chạy

- Parse 8 JSON artifact; validate 2 Draft 2020-12 JSON Schema: pass.
- Ontology base fixture: schema pass; schema expectation của 11/11 mutation case: pass.
- K02: 5 observation ID duy nhất, 0 golden: pass.
- K03A: 2 source, 5 passage, 3 rule, 6 case; source/passage/rule refs resolve: pass.
- Ontology examples đều `structural-mock` và `productionEligible=false`: pass.
- Prettier cho 12 artifact: pass; `git diff --check`: pass.
- `npm run audit:sources`: pass; legacy registry vẫn 0 complete golden chart,
  bibliographic identity pending và independent editions chưa verified.
- Không chạy application test/build vì không sửa `src/`. Upstream `lasotuvi` pytest
  không chạy do thiếu pytest; direct smoke là observation riêng, không thay thế test.

## Blocker và quyết định cần Product Owner

1. Có cho phép nhập revision `紫微斗數全書/卷三@2268626` vào Source Registry ở
   trạng thái source-backed/candidate, không phải independent family hay rule approved?
2. Có chấp nhận ontology K03B làm contract prototype để bước sau import **candidate**
   K03A, trong khi toàn bộ graph example tiếp tục bị cấm production?
3. K04A có được mở chỉ cho hai candidate phương pháp đầu tiên sau khi BA khóa
   vocabulary tam phương/hội chiếu và profile, hay phải chờ family độc lập?
4. K02 tiếp theo nên ưu tiên phân tích thiên văn/timezone cho `1985-03-21` và tìm
   full-chart family thứ hai; chưa đề xuất đổi production profile.

Không có nguồn trả phí cụ thể để xin duyệt. Chỉ đề xuất mua khi xác định được ấn bản,
trang/mục Quan Lộc, quyền nghiên cứu và giá trị khác biệt với nguồn miễn phí hợp pháp.

## Artifacts

- K02: `../test/calculation-reference-plan.md`, fixture schema, observations và
  `../dev/calculation-k02-sandbox-report.md`.
- K03A: `../dev/knowledge-k03a-career-report.md`, passage/rule JSON và test cases.
- K03B: `../dev/knowledge-ontology.md`, schema/examples và ontology test cases.
- Điều phối/prompt: `../dev/knowledge-k02-k03-execution.md` và
  `../dev/knowledge-enrichment-prompts.md`.
