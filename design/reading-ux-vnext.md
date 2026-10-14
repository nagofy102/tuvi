# Reading UX vNext — Product and architecture audit

Ngày: 14/10/2026. Trạng thái: **kế hoạch chờ phê duyệt**, không phải tính năng đã
triển khai. Phạm vi của tài liệu là hành trình đọc sau khi đã lập lá số hợp lệ; không
thay đổi lịch, an sao, hồ sơ Nam phái hoặc kho quy tắc đang phát hành.

## Quyết định sản phẩm đề xuất

Người đọc không cần học thuật ngữ cung/sao để nhận được giá trị đầu tiên. Màn hình
đầu tiên phải trả lời bằng tiếng Việt thường ngày: *điều gì đáng chú ý nhất*, *ba
điều cần nhìn*, *chủ đề đang quan tâm* và *một bước tiếp theo*. Cung, sao, quy tắc
và đoạn nguồn chỉ xuất hiện khi người đọc chủ động mở **Căn cứ lá số**.

Giọng văn có thể dứt khoát ở cấp biên tập (ví dụ “Điều cần ưu tiên lúc này là…”),
nhưng không được biến biểu tượng chưa được thẩm định thành sự thật về con người,
lời tiên đoán, tỷ lệ, hay ý kiến chuyên gia. Khi không đủ căn cứ, giao diện nói rõ
“Chưa có kết luận riêng cho phần này”, không lấp chỗ trống bằng câu chung chung.

Luồng MVP:

1. Một kết luận ngắn, có nhãn “Bản đọc tham khảo theo dữ kiện lá số”.
2. Ba insight độc lập, không lặp ý; mỗi insight có một bước thực hành.
3. Chọn `Công việc`, `Tình cảm` hoặc `Tài chính`.
4. Một bài đọc ngắn, liền mạch theo chủ đề đã chọn.
5. Mở tùy chọn **Căn cứ lá số** để xem facts → rule → passage → giới hạn.

Tài liệu tham chiếu hiện hữu vẫn là [reading-style-policy.md](reading-style-policy.md),
[career-reading-upgrade.md](career-reading-upgrade.md) và
[reading-synthesis-plan.md](reading-synthesis-plan.md). vNext thay thứ tự tiết lộ và
hợp đồng dữ liệu; không ngầm mở sao, cách cục, Phi Hóa hay luận vận.

## Audit hiện trạng

| Thành phần | Bằng chứng trong repo | Trạng thái vNext | Nhận định |
| --- | --- | --- | --- |
| Tính lá số | `src/domain/astrology/`, `src/domain/calendar/convert.ts`, `src/domain/astrology/profile.ts` | Reuse, không đổi | Profile hiện tại là `nam-phai-chinese-lunar-v1`; kiểm tra kỹ thuật không phải chứng nhận trường phái. |
| Chặn đầu vào trước khi luận | `src/domain/interpretation/calculate.ts` | Reuse | Chỉ đọc profile được hỗ trợ, kiểm tra ngày/lịch, 12 cung, 14 chính tinh, Tý/tháng nhuận và catalog. |
| Rule/reference governance | `src/domain/interpretation/knowledge.ts`, `dev/source-registry.json`, `dev/reading-synthesis.md` | Modify | Đã có `KnowledgeRule`, `KnowledgePassage`, trạng thái reviewed/editorial/disputed/deferred và passage ID; chưa có ma trận topic/ưu tiên/xung đột chuẩn hóa. |
| Bản đọc cục bộ | `src/domain/interpretation/types.ts`, `calculate.ts`, `themes.ts`, `claims.ts`, `career-reading.ts` | Reuse + Modify | Đã có evidence, conditions, exclusions gián tiếp và nhánh insufficient. Công việc v7 tốt hơn hai chủ đề còn lại; chưa có top-3 xuyên chủ đề. |
| UI đọc | `src/components/horoscope/interpretation-panel.tsx`, `src/components/horoscope/interpretation-panel.css`, `src/components/landing-experience.tsx` | Modify | Có bản đọc trước 12 cung, topic selector, details và nguồn; vẫn đưa người đọc qua “Ba mạch đọc xuyên cung”, ngôn ngữ kỹ thuật xuất hiện quá sớm. |
| API / AI | `dev/interpretation-implementation.md`, `package.json`, `src/app/` | Create, sau MVP mock | Không có route đọc cá nhân, provider AI, DB hay backend cache. Đọc hiện tạo trên thiết bị. |
| Cache | `src/app/[annualPath]/[slug]/page.tsx` | Create (nếu có backend) | Chỉ thấy ISR cho trang năm công khai; không có cache report cá nhân. Không được dùng cache công khai cho lá số. |
| Dữ liệu mẫu và riêng tư | `src/components/landing-experience.tsx`, `src/domain/profiles/local.ts`, `src/app/robots.ts` | Reuse + Modify | Mẫu có nhãn; dữ liệu sinh không POST, localStorage chỉ sau consent, robots chặn `/api/`. Report mới phải giữ các ranh giới này. |
| Kiểm thử | `tests/unit/interpretation.test.ts`, `tests/unit/reading-upgrade.test.ts`, `tests/unit/career-reading.test.ts`, `tests/e2e/career-reading.spec.ts` | Modify + Create | Có test điều kiện, provenance, accessibility và không POST. Chưa có schema/grounding/contract tests cho Brief hay AI. |

Các kết quả kiểm thử lịch sử và giới hạn chuyên môn nằm trong
`test/knowledge-validation.md`, `test/career-reading.md` và `test/README.md`; không
được suy diễn thành xác nhận dự báo hoặc xác nhận độc lập cho engine mới.

## MVP và phần loại trừ

MVP chỉ tạo **Reading Brief xác định được** từ chart đã qua gate hiện hữu và các
rule đã được duyệt. UI có thể dùng brief giả lập hợp đồng để triển khai trước, nhưng
phải gắn nhãn mock/demonstration và không được trộn vào kết quả cá nhân.

Không thuộc MVP: thay engine; quy tắc/sao mới; vector database; embeddings runtime;
RAG; gọi LLM thật; lưu report/server database; dự báo theo năm, điểm số, xếp hạng
may mắn; cache chung; expert-review claim; hoặc chuyển dữ liệu sinh ra bên thứ ba.

## Các quyết định cần người dùng phê duyệt

1. **MVP content:** chỉ triển khai UI + deterministic Brief trước, hay đồng thời mở
   thử nghiệm AI server-side opt-in? Khuyến nghị tách: MVP không có AI.
2. **Giọng kết luận:** phê duyệt cách viết quyết đoán có điều kiện, không phải câu
   khẳng định về hành vi/sự kiện chưa quan sát được.
3. **Nguồn và reviewer:** ai phê duyệt rule mới, bản quyền nguồn, và các rule
   xung đột/ưu tiên trước khi mở Tài chính/Tình cảm tương đương Công việc?
4. **Dữ liệu AI:** nếu bước AI được duyệt sau này, chấp thuận riêng về consent,
   provider/region/retention, ngân sách, và thời gian giữ/xóa cache.

## Handoff

Chi tiết contract, topology kỹ thuật và ownership tại
`../dev/reading-vnext-architecture.md`; chiến lược kiểm thử tại
`../test/reading-vnext-test-plan.md`. Không có source application nào được sửa trong
lần audit này.
