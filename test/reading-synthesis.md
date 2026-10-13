# Conditional reading quality checks

## Phạm vi

Nghiệm thu phần tổng hợp có điều kiện và bằng chứng; không xác nhận khả năng dự báo.
Ca UI dùng ngày sinh để thao tác thật, không lấy đầu ra engine làm đáp án an sao.
Những ca sửa cấu trúc lá số ở unit test chỉ là kiểm tra điều kiện, không là corpus chuẩn.

## Acceptance gates

- Mỗi mạch đọc có phần điều kiện thu gọn; trạng thái cho biết khả năng áp dụng quy tắc
  biên tập, không phải độ chính xác, điểm vận may hoặc phân loại con người.
- Mỗi nhận định truy về đoạn sách ghim phiên bản, điều kiện và dữ kiện phạm vi.
  Thiếu nhóm hỗ trợ không được đổi thành kết luận bất lợi.
- Đổi mối quan tâm chỉ đổi thứ tự; không làm thay dữ kiện lá số.
- Giờ chưa biết hoặc ngày không hợp lệ không giữ nhận định sao của lượt trước.
- Không truyền dữ liệu sinh ra dịch vụ ngoài, không tự lưu hồ sơ, không đưa vào URL.
- 320px/cỡ chữ cực lớn: không tràn ngang; phần điều kiện/nguồn mở bằng bàn phím;
  chiều cao bản đọc mặc định dưới 6000px để giữ hành trình đọc ngắn.

## New production-browser checks

`tests/e2e/reading-synthesis.spec.ts` adds three checks:

1. Three thematic applicability disclosures, status labels, pinned source links,
   chart invariance, same-origin GET-only traffic and no profile autosave.
2. Mobile extra-large text, native details keyboard control and axe WCAG A/AA.
3. Unknown birth time and future input remove stale star claims.

## Kết quả thực tế — 13/10/2026

Nền `3c9cc79`, thay đổi v5 chưa commit. Node 24.19.0, Next 16.4.0,
Chromium hệ thống; không thay dependencies hoặc engine. PM/root tiếp quản tích hợp
và chạy kiểm thử khi các luồng agent dừng do giới hạn phiên.

| Kiểm tra | Kết quả |
| --- | --- |
| `npm test` | 177/177 ca, 12 file; bắt đầu 15:21:12 UTC, 16.65 giây |
| `npm run typecheck` | Qua |
| `npm run build` | Qua, kiểm tra tái lập engine và 35 tài nguyên prerender |
| `npm run audit:reference` | 24/24 ca từng phần, 146 trường; 0 mismatch/unavailable; 0 lá số chuẩn hoàn chỉnh |
| `npm run test:e2e` | 25/25 ca qua trên production mới, 1.1 phút |
| `npm run format:check`, `git diff --check` | Qua |
| Axe | A/AA phần điều kiện mở ở 320px/chữ cực lớn qua; regression tương phản chữ AAA bản đọc mở qua |

Unit mới bao gồm trạng thái quy tắc chưa duyệt, dependency Tử Vi/Tả–Hữu, thiếu
chính tinh, trùng/thành viên thiếu, sao lưu động, phạm vi cung không được gộp sai,
hai nhóm cùng hoạt động, bảo toàn input và hình học theo cung xuất phát. Ca sửa
lá số chỉ kiểm tra dispatch; không được coi là corpus an sao độc lập.

Lần E2E đầu: 24/25 qua. Assertion `.interpretation-panel` đòi không có khung nào
khi thiếu giờ, trong khi khung thông tin không cần giờ sinh cố ý dùng cùng class.
Sửa selector thành `#ban-doc`, giữ assertion không có theme/claim và còn khung
thông tin ngày sinh. Không bỏ kiểm tra an toàn. Sau điều chỉnh padding mobile,
rebuild và chạy lại **toàn bộ** được 25/25.

Ảnh ignored: `test-results/reading-synthesis-mobile.png` và các ảnh regression
mobile/desktop hiện hữu. Đã xem ảnh 320px/cỡ chữ cực lớn và nới vùng chữ trong
phần căn cứ; không tràn ngang, có focus bàn phím. Chưa kiểm tra thiết bị thật.

### Hiệu năng: chưa đạt ổn định

Hai lần Lighthouse mobile mặc định trên production cục bộ, không chạy đồng thời
với test suite; Accessibility/SEO đều 100, CLS 0:

| Lần / thời điểm UTC | Performance | LCP | TBT |
| --- | --- | --- | --- |
| 1 — 15:22:34 | 92 | 2.744 giây | 217.5 ms |
| 2 — 15:22:46 | 88 | 3.484 giây | 172 ms |

Reports: `/tmp/tuvi-synthesis-lighthouse-{1,2}.json`. Đo với Chromium hệ thống,
Lighthouse CLI, mobile/network/CPU throttling mặc định; helper
`/tmp/tuvi-synthesis-measure.mjs` khởi động và dừng server của chính nó ở 3001.
Không dùng điểm 92 để công bố đạt >90 ổn định. LCP còn vượt ngưỡng tốt 2.5 giây;
kiểm tra production domain, thiết bị thật và tối ưu tải ban đầu vẫn là việc mở.

## Remaining checks and limits

Full regression above covers unit predicate mutation tests, reference diff,
typecheck, production build, existing E2E and formatting. The 24 partial source
cases remain partial; adding UI assertions does not create independent golden charts.
Automated axe does not replace screen-reader, real-device or older-user testing.
`mixed` must remain absent unless a reviewed rule supplies an actual contradiction;
different symbols or missing pairs are not proof of opposing outcomes.

Rubric 10/12 là tiêu chí biên tập đề xuất, **chưa chấm toàn bộ nội dung**; pass
unit/E2E không tự đóng gate rubric hoặc chứng minh dự báo. Chưa đọc thêm ấn bản
độc lập, chưa mở nhóm sao mới, cách cục/vận hạn/AI. Không chạy lại audit lịch
1950–2026 vì không sửa calendar/engine; bằng chứng lịch nằm ở báo cáo riêng.
