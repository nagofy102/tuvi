# Tử Vi

Huyền Vi — ứng dụng Tử Vi tiếng Việt với Next.js App Router, React, Tailwind CSS và TypeScript strict.

## Trạng thái

Bước 2–4 đã có mã ứng dụng: landing page responsive, biểu mẫu ngày sinh, chuyển lịch Việt Nam,
lá số 12 cung tương tác, trang năm tuổi 2026–2027 và ảnh OpenGraph PNG tự sinh.
Ứng dụng tính lá số trên thiết bị, không gửi tên/ngày sinh lên máy chủ.

Bộ an sao là bản tham khảo iztro 2.6.2, chưa được chuyên gia thẩm định theo từng trường phái
Tử Vi Việt Nam. Một số ngày/tháng nhuận Việt Nam mà thư viện không biểu diễn được bị từ chối
rõ ràng, không tự đổi ngày sinh. Trang năm tuổi trình bày thông tin tuổi/nạp âm, không dự báo vận hạn.

## Chạy ứng dụng

Node.js 22 trở lên; đã kiểm tra với Node.js 24.19.0. Từ thư mục repository:

```sh
npm ci
npm run dev
```

Để chạy bản production:

```sh
npm run build
npm run start
```

Đặt `SITE_URL` thành domain thật trước khi build triển khai để canonical, sitemap và OpenGraph
có đúng địa chỉ. Xem `.env.example`. Không cần DB hoặc API key cho các tính năng hiện tại.
Nếu npm cache mặc định không ghi được trong cloud, dùng `npm --cache /tmp/tuvi-npm-cache ci`.

## Kiểm tra

```sh
npm run typecheck
npm test
npm run build
npm run test:e2e
npm run format:check
```

Playwright tự mở bản production ở port 3000; dừng server đang dùng port này trước khi chạy.
Chromium mặc định ở `/usr/bin/chromium`; đặt `CHROMIUM_PATH` để đổi executable.
Kết quả và giới hạn kiểm chứng được ghi trong `test/README.md`.

## Điểm bắt đầu cho AI và người phát triển

1. Mỗi phiên làm việc, đọc `AGENTS.md`, toàn bộ `RULE_BASE.md` hiện tại và trạng thái Git.
2. Đọc `design/README.md` cho trải nghiệm và quyết định thiết kế.
3. Đọc `dev/README.md` cho kiến trúc, dữ liệu và tiến độ triển khai.
4. Đọc `test/README.md` cho tiêu chí nghiệm thu và kết quả kiểm tra.

Các thư mục này lưu ngữ cảnh dài hạn; mã ứng dụng sẽ nằm trong `src/`.
Bước tiếp theo: thẩm định quy tắc Tử Vi với chuyên gia, rồi phát triển lưu lá số, AI, PWA
và cơ sở dữ liệu nếu được đưa vào phạm vi triển khai. Các tính năng này hiện chưa có.
