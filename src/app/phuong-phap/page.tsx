import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Phương pháp và nguồn tham khảo',
  alternates: { canonical: '/phuong-phap' },
};
export default function MethodsPage() {
  return (
    <article className="page-width prose-page">
      <span className="eyebrow">MINH BẠCH ĐỂ AN TÂM</span>
      <h1>
        Phương pháp
        <br />
        <em>và nguồn.</em>
      </h1>
      <h2>Chuyển đổi lịch Việt Nam</h2>
      <p>
        Hệ thống dùng bảng lịch trong{' '}
        <a href="https://github.com/cuongdqpayment/dqcai-vn-lunar">@dqcai/vn-lunar 1.0.1</a> (MIT).
        Chúng tôi đối chiếu các ngày Tết và các mốc khác biệt Việt–Trung, đồng thời kiểm tra lại
        ngày khi chuyển ngược để không âm thầm sửa ngày sai hoặc cờ tháng nhuận.
      </p>
      <p>
        Phạm vi công cụ là 1900–2099. Đây là lịch Việt Nam; không tự đổi sang múi giờ nơi ở của
        người dùng và không thực hiện điều chỉnh giờ lịch sử hoặc giờ mặt trời thực.
      </p>
      <h2>An sao và bố cục 12 cung</h2>
      <p>
        Bộ tính dùng <a href="https://github.com/SylarLong/iztro">iztro 2.6.2</a> (MIT), cấu hình Zi
        Wei phổ thông, nhãn tiếng Việt và năm tính từ đầu năm âm lịch. Ngày âm Việt Nam được truyền
        rõ ràng; nếu thư viện không biểu diễn đúng ngày đó, ứng dụng từ chối lập lá số thay vì đổi
        ngày sinh.
      </p>
      <p>
        Mặc định tháng nhuận chia ở ngày 15: ngày 1–15 giữ tháng, từ ngày 16 dùng tháng kế để an
        cung. Giờ Tý mặc định đổi ngày lúc 00:00. Biểu mẫu cho phép đổi cả hai quy ước. Nếu chọn đổi
        ngày từ 23:00, hệ thống chuyển đầy đủ sang ngày kế trước khi an sao, kể cả khi qua
        tháng/năm.
      </p>
      <p>
        Vị trí Mệnh, Thân, 14 chính tinh, phụ tinh và đại hạn được tính bằng thư viện. Nạp âm được
        tra theo chu kỳ 60 năm. Miếu/Vượng/Đắc/Bình/Hãm là phân loại theo bảng của thư viện, không
        phải điểm tốt xấu của cuộc đời.
      </p>
      <h2>Giới hạn kiểm chứng</h2>
      <p>
        Bộ an sao là bản triển khai tham khảo theo cấu hình thư viện, chưa được chuyên gia thẩm định
        cho từng trường phái Tử Vi Việt Nam. Kiểm thử phần mềm và đối chiếu lịch không xác nhận khả
        năng dự đoán sự kiện.
      </p>
      <p>
        Nếu tháng nhuận Việt Nam khác tháng nhuận mà thư viện an sao hỗ trợ, lá số có thể bị từ
        chối; công cụ chuyển lịch vẫn cho kết quả riêng. Luận hạn, điểm phần trăm và dự báo AI chưa
        được cung cấp.
      </p>
      <h2>Nội dung năm tuổi và quyền quyết định</h2>
      <p>
        Trang năm tuổi trình bày can chi, nạp âm và tuổi mụ, không phải lá số đầy đủ hoặc lời phán
        vận hạn. Các giải thích về cung là nội dung văn hóa tham khảo; quyết định sức khỏe, tài
        chính và đời sống cần dựa trên thực tế và chuyên môn phù hợp.
      </p>
    </article>
  );
}
