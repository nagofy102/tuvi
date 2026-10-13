import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Quyền riêng tư',
  alternates: { canonical: '/quyen-rieng-tu' },
};
export default function PrivacyPage() {
  return (
    <article className="page-width prose-page">
      <span className="eyebrow">THÔNG TIN CỦA BẠN</span>
      <h1>
        Riêng tư.
        <br />
        <em>Ngay từ đầu.</em>
      </h1>
      <h2>Thông tin ngày giờ sinh</h2>
      <p>
        Phiên bản hiện tại tính lá số ngay trong trình duyệt. Tên và ngày giờ sinh không được gửi
        đến máy chủ, đặt trong đường dẫn hoặc tự lưu vào cơ sở dữ liệu. Tải lại trang sẽ xóa lá số
        vừa nhập nếu bạn chưa chọn lưu trên thiết bị.
      </p>
      <h2>Cài đặt và hạ tầng</h2>
      <p>
        Trình duyệt lưu lựa chọn cỡ chữ; thông tin sinh chỉ được lưu khi bạn tích ô đồng ý và bấm
        “Lưu hồ sơ đang xem”. Hồ sơ lưu cục bộ trên trình duyệt này, không đồng bộ tài khoản và
        không gửi máy chủ. Trang tải font từ cùng website, không gửi yêu cầu lấy font đến Google.
        Máy chủ/hạ tầng triển khai có thể ghi nhật ký truy cập trang như địa chỉ IP và đường dẫn;
        chính sách lưu nhật ký sẽ tùy thuộc đơn vị vận hành khi triển khai.
      </p>
      <h2>Hồ sơ trên thiết bị</h2>
      <p>
        Hồ sơ chứa tên bạn nhập, ngày sinh, loại lịch, cờ tháng nhuận, giới tính an lá số, giờ nếu
        biết và quy ước tính. Không lưu bản luận giải; khi mở, hệ thống tính lại theo cấu hình hiện
        hành. Người dùng chung trình duyệt có thể đọc dữ liệu vì không mã hóa. Không nên lưu hồ sơ
        nhạy cảm trên thiết bị công cộng.
      </p>
      <p>
        Bạn có thể mở lại, xóa từng hồ sơ hoặc xóa tất cả tại “Hồ sơ trên thiết bị của bạn”. Xóa dữ
        liệu website trong trình duyệt cũng xóa hồ sơ. Không tự phục hồi bằng cookie hay dịch vụ
        khác; chế độ riêng tư hoặc trình duyệt chặn lưu trữ có thể không giữ dữ liệu. Không có đồng
        bộ hoặc sao lưu để khôi phục hồ sơ đã xóa.
      </p>
      <h2>In và chia sẻ</h2>
      <p>
        In/PDF mở tính năng in của trình duyệt, nội dung có thể bao gồm tên và ngày sinh đã nhập.
        Hãy kiểm tra trước khi gửi bản in cho người khác. Chia sẻ trang chỉ gửi liên kết trang chủ,
        không kèm lá số cá nhân.
      </p>
      <h2>Tích hợp về sau</h2>
      <p>
        Phiên bản này không có đăng nhập, lưu tài khoản hoặc gửi dữ liệu sang dịch vụ AI. Nếu bổ
        sung những tính năng đó, cần cập nhật chính sách, giải thích mục đích và có lựa chọn rõ ràng
        trước khi gửi hay lưu thông tin.
      </p>
    </article>
  );
}
