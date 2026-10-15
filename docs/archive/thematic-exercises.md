# Nghiệm thu bài tập theo chủ đề — mốc B

Ngày: 13/10/2026. Baseline `0958a68`; nội dung v6. BA/QA kiểm tra biên tập bằng
AI và kiểm thử phần mềm; không có thẩm định chuyên gia độc lập.

## Phạm vi

Ba chủ đề × bốn trạng thái: chưa có cặp, Tả–Hữu, Xương–Khúc, cả hai cặp.
Các biến đổi lá số có chủ ý chỉ kiểm tra chọn nội dung; không phải đáp án an sao.
Nguồn hiện hữu được giữ trong insight/claim, bài tập là phần tự viết của dự án.

- Công việc: yêu cầu, người nhận, tiêu chí, thay đổi và hạn giao.
- Tiền bạc: báo giá, phí, khoản góp, người trả và chứng từ.
- Đồng hành: nhu cầu đã nói, phần việc, thời gian và xác nhận với người bạn đời.
- Thiếu cặp không phát bài tập đặc thù; hai cặp đủ điều kiện có cả thao tác chia
  trách nhiệm và xác nhận thông tin. Chọn mối quan tâm chỉ đổi thứ tự.
- Nhánh có cặp cho phép bỏ bài tập nếu tình huống không xảy ra; không mặc định
  người đọc đã gặp vấn đề.
- Hành động hiện ở đoạn thứ hai trước khi mở “Đọc sâu”; không lặp lại hành động
  trong phần sâu hoặc nguyên bài tập cung trong phần liên hệ.

## Rubric và giới hạn

Đợt này rà soát tính riêng theo **chủ đề/trạng thái nhóm**, điều kiện, tình huống
tự kiểm tra và hành động. Đường nguồn/predicate vẫn dựa trên hai nhóm đã duyệt.
Chưa chấm toàn bộ bản đọc theo ngưỡng 10/12: bài tập cung cố định và nhánh không
có cặp chưa đạt tính riêng của một nhận định cá nhân. Không dùng điểm biên tập
để quảng cáo độ đúng dự báo.

Kiểm tra chéo BA trên 9 nhánh mới: tính riêng đạt ở mức chọn bài tập theo nhóm
và chủ đề; nhánh kết hợp giữ cả hai thao tác; điều kiện/tự kiểm tra/hành động có
tình huống và dấu vết cụ thể. Truy nguồn giữ đường tới insight/claim hiện hữu,
nhưng ứng dụng đời sống là phần biên tập, không phải kết luận trực tiếp trong sách.
Ba nhánh chưa có nhóm được gắn “Bài tập chung” và nêu chưa đủ điều kiện ở phần
hiển thị đầu. Review chưa bao phủ toàn bộ các đoạn chính tinh và 12 cung.

## Kiểm tra thực tế

- `npm test`: bản cuối 249/249, 13 file, bắt đầu 16:35:49 UTC (10.36 giây); gồm bốn kiểm tra
  parametrized, mỗi kiểm tra chạy cả ba chủ đề (12 tổ hợp).
- `npm run typecheck`: qua.
- `npm run build`: qua, 35 tài nguyên prerender; engine reproducibility qua.
- `npm run test:e2e`: 25/25 qua trên production, 51.5 giây; sau bổ sung nhãn
  fallback chạy lại `reading-synthesis.spec.ts` và `reading-upgrade.spec.ts`
  trên build mới: 4/4 qua, 15.5 giây. Mobile 320px/chữ cực lớn, bàn phím,
  axe A/AA, nguồn, giờ chưa biết/lỗi nhập và không gửi dữ liệu sinh đều qua.
- `npm run format:check`: qua.
- Không chạy audit lịch hoặc đo Lighthouse trong đợt nội dung này. Gate mobile
  Performance >90 ổn định vẫn chưa đạt theo báo cáo trước.
