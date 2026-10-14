# HV-K01 — Initial knowledge research report

Ngày 14/10/2026 (Asia/Saigon). Trạng thái: **WAITING FOR PRODUCT OWNER REVIEW**.
K01C-Lite, K01A và K01B đã hoàn thành ở mức nghiên cứu/tài liệu. K02/K03 chưa mở.

## Executive result

- K01C-Lite tạo file-based schema, registry nghiên cứu ban đầu với 3 source, 3
  passage đại diện và 1 review event; không thay registry runtime.
- K01A kiểm tra thực tế 12 source candidates: 3 tài nguyên cùng dòng
  `紫微斗數全書`, 2 nguồn lịch pháp và 7 catalogue sách Việt. Có 9 candidate, 3
  blocked, 0 passage/rule/admission mới.
- K01B kiểm tra 5 website và 5 package/repository; lưu 6 observation vectors tổng
  hợp. Đã phân loại ít nhất ba implementation/lineage candidates nhưng chưa có hai
  family an sao đầy đủ, độc lập và cùng profile.
- Không nguồn nào mới được nâng `approved-for-implementation`; không mở R07B, UI,
  AI Writer hoặc production code.

## Initial Source Registry

Registry chung hiện chỉ giữ ba tài nguyên đã có provenance trong repository:

| Source                    | Scope hiện được phép                                | Family/độc lập                           | Trạng thái               |
| ------------------------- | --------------------------------------------------- | ---------------------------------------- | ------------------------ |
| Wikisource `卷二@1963110` | passage giới hạn về Mệnh–Thân và một số phép an sao | textual lineage chưa giải quyết          | `source-backed` giới hạn |
| Wikisource `卷一@7913704` | reading reference/symbolism                         | cùng named work, không phải vote độc lập | `source-backed` giới hạn |
| Archive facsimile item    | collation leaf giới hạn                             | quan hệ với transcription chưa xác định  | `blocked`                |

Ba URL giới hạn đã trả HTTP 200 ngày nghiên cứu. HTTP 200 không xác nhận bản quyền,
identity, nội dung hay hệ phái. Separate leaves của cùng Archive item không được
đếm như separate sources.

K01A candidates vẫn nằm trong inventory riêng, chưa tự động nhập registry:

- HKO có bảng Gregorian–Lunar 1901–2100 và là candidate mạnh cho calendar
  cross-check, nhưng timezone/convention và quyền ingest cần review.
- USNO là nguồn phương pháp lịch độc lập ở mức tổng quan, không đủ làm conversion
  oracle hay nguồn an sao.
- Bảy Open Library records tạo bibliography leads; chưa có full text/page locator,
  chưa cross-check trực tiếp catalogue nguồn và không được dùng làm rule Công việc.
- Facsimile rights/identity và các ấn bản hiện đại bị giới hạn vẫn blocked; nguồn
  trả phí không được mua hoặc truy cập khi chưa có PO approval riêng.

## Calculation/implementation findings

- `iztro@2.6.2`, `lunar-lite@0.2.8` và `lunar-typescript@1.8.6` có dependency/
  lineage liên quan; không được đếm thành ba family độc lập.
- `doanguyen/lasotuvi@0.1.2` là codebase khác, nhưng mới chạy conversion HND +7;
  full chart chưa chạy do dependency cũ và school profile chưa pin.
- `@dqcai/vn-lunar@1.0.1` có license/lineage discrepancy; không tính independent.
- Trên probe `1985-03-21`, family 6tail quan sát `1/2` thường; HND +7 và dqcai quan
  sát `1/2` nhuận. Chưa có nguồn đủ điều kiện chọn bên đúng.
- Các website PO nêu chỉ được đọc phần robots/terms/form công khai. Không POST, không
  scrape luận giải, không dùng output website làm oracle. Nhiều route bị robots/ToS
  giới hạn hoặc không công bố calculation profile.

## Knowledge gaps after K01

1. Chưa có family thứ hai đủ độc lập cho Mệnh–Thân, 12 cung, chính tinh và Tứ Hóa.
2. Chưa có passage hợp pháp, có page locator, về Quan Lộc/liên cung đủ condition và
   exclusion để tạo rule Công việc.
3. Bibliographic identity/lineage của classical transcription–facsimile chưa đóng.
4. Profile compatibility giữa Chinese lunar, HND GMT+7 và profile mặc định chưa
   được đối chiếu; bất đồng phải fail-closed.
5. Chưa có complete golden chart và không observation nào trong K01B là expected.

## Acceptance and integration review

| Gate                                                          | Kết quả                                                    |
| ------------------------------------------------------------- | ---------------------------------------------------------- |
| K01C source/passage IDs resolve, no production approval       | Pass ở contract/document level                             |
| K01A actual access + origin/scope/school/access/rights/limits | Pass cho 12 records; catalogue depth còn blocked           |
| K01B ≥3 candidate families hoặc blocker                       | Pass; chưa đủ 2 full-chart compatible families             |
| No bulk scraping/copyrighted prose/personal data              | Pass theo artifacts và reported commands                   |
| JSON parse/uniqueness/schema                                  | Pass                                                       |
| Production code unchanged                                     | Pass                                                       |
| K02/K03 readiness                                             | **BLOCKED pending PO review and unresolved evidence gaps** |

## Product Owner review choices

1. Cho phép K01 tiếp tục một vòng bibliography sâu để tìm lawful page-level source
   cho Quan Lộc/Công việc, hay dừng nhánh này vì chưa có quyền truy cập.
2. Cho phép một task sandbox riêng nghiên cứu khả năng chạy full-chart `lasotuvi`
   mà không thay production dependency; nếu không, giữ nó conversion-only.
3. Chấp thuận đưa HKO vào K02 candidate sau rights/timezone review; USNO chỉ làm
   background method.
4. Chấp thuận giữ `@dqcai/vn-lunar` ở trạng thái blocked cho tới khi license và
   lineage được xác minh.
5. Chỉ khi các quyết định trên được duyệt, PM mới soạn K02/K03 task; hiện không tự mở.

## Artifacts

- Registry: `../dev/knowledge-source-registry.{md,json}` và schema cùng thư mục.
- Books/sources: `../dev/knowledge-source-inventory.{md,json}`.
- Engines/sites: `../dev/calculation-implementation-survey.md`.
- Observations: `../test/calculation-observation-vectors.json`.
- Ownership/dependencies: `../dev/knowledge-k01-execution.md`.
