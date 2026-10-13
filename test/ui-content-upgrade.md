# Nghiệm thu giao diện và nội dung theo chủ đề

## Phạm vi

Ngày 13/10/2026, checkout nền `66b144e`, thay đổi chưa commit. Node 24.19.0,
Chromium hệ thống, Next.js production. Kiểm thử phần mềm/biên tập, không phải
thẩm định chuyên môn bởi con người hay xác nhận dự báo.

## Tiêu chí và bằng chứng

- Popup: đo tâm hộp lệch dưới 2px so với tâm viewport desktop; nằm trong viewport
  320px ở cỡ chữ cực lớn. Escape/click ngoài đóng; focus về nút đã mở; trạng thái
  cuộn khôi phục. Kiểm tra axe tương phản A/AA và chữ AAA trên popup/lá số tối.
- UI sạch: mở tất cả details trên landing và phương pháp, kiểm tra `innerText`
  không có tên engine, version strings, profile/rule/passage IDs hoặc revision tags.
  Metadata và địa chỉ nguồn được phép giữ để truy vết.
- Ba chủ đề: lựa chọn mối quan tâm đổi chủ đề đầu tiên, không đổi lá số. Unit kiểm
  tra thay giờ sinh làm đổi bài tập khi nhóm đổi; bỏ một thành viên thì mất bài tập
  đặc thù; bằng chứng vẫn đúng cung/sao nguồn gốc.
- Nội dung: mỗi overview cung tối đa một câu tên sao; hành vi tự kiểm chứng và cách
  điều chỉnh rõ; người bạn đời không định khuôn giới. Quét thân bài và glossary
  cho các từ/phán cấm; đây là kiểm tra hồi quy, không chứng minh loại bỏ hoàn toàn
  Barnum effect hay thay thế thử nghiệm với người dùng.
- Hiện tại: ca trước/sau Tết 2026, biên khoảng Đại hạn, khoảng trùng/không có,
  ngày sinh tương lai, timezone Việt Nam. Không sinh dự báo hay sao Lưu niên.
- Hồi quy: riêng tư, đổi lịch, tháng nhuận 1985, nhập sai ẩn bản đọc cũ, 12 cung,
  nguồn, mobile, JSON-LD, canonical, sitemap, 404 và PNG OpenGraph.

Ảnh đã kiểm tra bằng mắt: `test-results/star-dialog-luxury-desktop.png`,
`test-results/desktop-result.png`; ảnh mobile cũng được sinh bởi E2E. Kết quả
axe không thay thế kiểm tra screen reader, thiết bị thực và đánh giá thủ công đầy đủ.

## Các lỗi phát hiện trong quá trình chạy

Lượt E2E đầu: 12/14 qua. Hai lỗi thuộc locator trong test: `.interpretation-facts`
trỏ cả dữ kiện hiện tại và tổng quan; so sánh `innerText` bằng matcher `textContent`
khác dấu xuống dòng. Tách class dữ kiện hiện tại và so sánh cùng `innerText`, không
bỏ các assertion. Lượt tiếp theo: 14/14 qua.

Một lượt unit bổ sung quét “có thể” phát hiện cụm khả năng thao tác “bước thử có thể
đảo ngược”, không phải lời né tránh xác suất. Nội dung đã đổi thành “bước thử đảo
ngược được”, giữ kiểm tra nghiêm ngặt. Kết quả cuối ghi bên dưới sau chạy lại.

## Kết quả cuối

Trên bản nội dung v3 ngày 13/10/2026 lúc 11:34 UTC:

| Kiểm tra | Kết quả |
| --- | --- |
| `npm test` | 152/152 qua, 10 file |
| `npm run build` | Qua; kiểm tra tái tạo engine, TypeScript và 35 tài nguyên prerender |
| `npm run test:e2e` | 14/14 qua trên production Chromium, 27,8 giây |
| `npm run typecheck` | Qua |
| `npm run audit:reference` | 24/24 ca từng phần qua, 146 trường, 0 sai lệch |
| `npm run format:check`, `git diff --check` | Qua |
| Axe A/AA, chữ AAA, popup/lá số tối | Không có vi phạm tự động trong các vùng kiểm tra |

Auto-diff dùng fixture có nguồn đã có, không thay expected. Không sửa lịch/an sao,
dependency/lockfile hoặc bộ fixture. Không cần chạy lại audit lịch dài 1950–2026 cho
thay đổi thuần UI/nội dung; không tuyên bố lượt audit đó đã chạy lại.

## Giới hạn còn mở

Luận Đại hạn/Lưu niên, Phi Hóa, cách cục và chứng nhận độc lập chưa triển khai.
Bộ 24 ca có nguồn chỉ đối chiếu 146 trường, không phải 24 golden charts đầy đủ.
Chưa đo lại Lighthouse; không nghiệm thu Performance >90. Chưa chạy trên thiết bị
thật hoặc mọi trình duyệt. Các kết quả trên được ghi trước commit/push bản nâng cấp.
