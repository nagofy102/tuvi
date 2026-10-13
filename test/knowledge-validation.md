# Kiểm chứng mốc 2–3 — 2026-10-13

## Phiên bản và phạm vi

Nền Git `45a3884`, thay đổi mốc 2–3 chưa commit. Node 24.19.0, Next 16.4.0,
Vitest 5.0.4, Chromium hệ thống. Hồ sơ đọc `huyenvi-source-bounded-v1`, nội dung
`reference-reading-v2`; an sao giữ `iztro-default-vietnamese-lunar-v2`.

## Kết quả thực tế

| Kiểm tra                  | Kết quả                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm test`                | 139/139 qua, 8 file, lần chạy 10:37:18 UTC                                                            |
| `npm run typecheck`       | Qua                                                                                                   |
| `npm run audit:reference` | 24/24 ca khớp trường đã biết; 146 trường, 0 sai khác, 0 không chạy được                               |
| `npm run build`           | Qua, 35 trang/tài nguyên prerender; gồm kiểm tra tái lập engine                                       |
| `npm run test:e2e`        | 11/11 qua, production Chromium, 24.1 giây                                                             |
| Nguồn/nhóm                | Kiểm tra đoạn ghim phiên bản; nhóm đủ cặp; giữ sao ở cung gốc; Khôi–Việt không kích hoạt              |
| Riêng tư/UI               | Không POST dữ liệu; lỗi nhập ẩn bản đọc cũ; bàn phím; mobile 320px/cỡ chữ lớn; phương pháp truy nguồn |
| Axe                       | A/AA landing và tương phản chữ AAA với mọi chi tiết luận giải mở qua                                  |

Hai lỗi bộ chọn E2E cũ xuất hiện khi thêm details lồng nhau: chọn nhiều summary,
và link nguồn đầu tiên nằm trong mục chưa mở. Đã nhắm summary trực tiếp và mở mục
“Vì sao” trước khi kiểm tra link; không bỏ assertion. Lần cuối 11/11 qua.
Runner Node độc lập ban đầu vướng export CJS upstream lịch; đã bundle entry ESM
như builder hiện hữu rồi chạy lại thành công. Kiểm tra tổng số trường phát hiện Cục
bị bỏ vì lệch tên khóa; sửa comparator dùng `cuc` và chặn khóa expected không nhận biết.
Review QA còn phát hiện sao trùng trong cùng cung có thể qua; đã sửa đếm occurrence
và thêm ca mutation xác nhận lỗi này không bị bỏ lọt.

## Oracle độc lập và ma trận điều kiện

Fixture: `../tests/fixtures/reference-charts.json`. Có 24 input âm lịch giả lập,
12 tháng, 12 giờ, 12 vị trí Mệnh và Thân. Đếm thủ công từ mục An Thân Mệnh,
An Tả Phụ Hữu Bật và An Văn Xương Văn Khúc. Một ca có Cục/Tử Vi theo ví dụ Giáp
trong sách. Expected được lập trước đối chiếu engine; script chỉ đọc fixture.

- Mỗi ca: nguồn/phiên bản/đoạn trích/cách suy ra; `engineUsedForExpected: false`.
- Vắng expected nghĩa là chưa kiểm chứng, không implicit pass. `completeGoldenCharts = 0`.
- Test nguồn kiểm tra tính phân giải, trích đoạn, giới hạn, trạng thái khác biệt.
- Test predicate dùng chart **giả lập sửa có chủ ý**, chỉ xác nhận bộ lọc kết nối;
  không được gọi các chart sửa đó là đáp án an sao.
- Mutation: sai Mệnh, sao trùng, nguồn/đoạn không tồn tại, thiếu suy ra, oracle engine,
  snapshot-policy và khóa expected lạ đều bị phát hiện/từ chối.
- Các nhóm cần đủ cả hai sao, chính tinh và bốn cung thật; di chuyển ra ngoài phạm vi
  không kích hoạt. Giữ nhãn gốc Tả Phù, không gộp sao có hậu tố lưu động.
- Khôi–Việt còn thiếu đối chiếu an sao, nên `deferred` và không phát nhận định ngay cả
  khi input thỏa điều kiện Khôi Mệnh/Việt Thân. Cách cục/vận hạn chưa được bật.

`npm run audit:reference` tạo `test-results/reference-diff/report.json` và `report.md`
(ignored): timestamp, SHA-256 fixture, Git/dirty flag, expected/actual, nhóm lỗi,
trường chưa kiểm chứng. Các nhóm lỗi là phân loại chẩn đoán, chưa tự xác nhận RCA.
Metadata chống oracle tự sinh không tự chứng minh nguồn đúng; vẫn cần đọc nguồn.

## Giới hạn nghiệm thu

Không có chuyên gia con người, bản chụp đối chiếu hoặc nguồn thứ hai. Đây là bộ
đối chiếu từng phần theo văn bản độc lập với engine, không phải 24 lá số hoàn chỉnh,
không đóng gate 200–300 lá số. Chưa golden cho nhuận/Tý/14 chính tinh/Tứ Hóa/Khôi–Việt.
Fixture bắt đầu bằng âm lịch: không kiểm chứng chuyển lịch dương/âm.
Audit lịch đầy đủ không chạy lại vì không sửa engine/calendar; bằng chứng mốc 1 riêng.
Không đo lại Lighthouse: Performance >90 ổn định vẫn chưa nghiệm thu.
