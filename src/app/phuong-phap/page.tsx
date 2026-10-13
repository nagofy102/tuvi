import type { Metadata } from 'next';
import {
  KNOWLEDGE_PROFILE,
  KNOWLEDGE_RULES,
  resolvePassage,
} from '@/domain/interpretation/knowledge';
import { INTERPRETATION_SOURCES } from '@/domain/interpretation/catalog';
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
      <h2>Hồ sơ Nam phái và âm lịch Trung Quốc</h2>
      <p>
        Hệ thống dùng{' '}
        <a href="https://github.com/SylarLong/lunar-lite">
          bộ chuyển âm lịch Trung Quốc mã nguồn mở
        </a>
        . Quy ước lịch là UTC+8. Chúng tôi đối chiếu các ngày Tết và các mốc khác biệt Việt–Trung,
        đồng thời kiểm tra lại ngày khi chuyển ngược để không âm thầm sửa ngày sai hoặc cờ tháng
        nhuận.
      </p>
      <p>
        Phạm vi nhập là 1900–2099; ngày dương đầu năm 1900 có thể hiển thị năm âm 1899. Giữ nguyên
        giờ địa phương bạn nhập; không tự cộng một giờ vào giờ sinh Việt Nam. Nếu giấy tờ ghi ngày
        âm theo lịch Việt Nam, hãy nhập ngày dương để đối chiếu. Không thực hiện điều chỉnh giờ lịch
        sử hoặc giờ mặt trời thực.
      </p>
      <h2>An sao và bố cục 12 cung</h2>
      <p>
        Bộ tính dùng <a href="https://github.com/SylarLong/iztro">bộ an sao mã nguồn mở</a>, cấu
        hình thông hành, nhãn tiếng Việt và năm tính từ đầu năm âm lịch Trung Quốc. Bảng Tứ Hóa được
        ghim theo{' '}
        <a href="https://iztro.com/learn/setup.html">An tinh quyết, mục 18 — bảng Nam phái</a>. Nhãn
        này có căn cứ cho bảng Tứ Hóa; hồ sơ dự án vẫn công bố riêng từng quy ước để tránh suy rộng
        sang mọi truyền thừa Nam phái. Kết quả không khớp tuple âm lịch vẫn bị từ chối.
      </p>
      <p>
        Mặc định tháng nhuận chia ở ngày 15: ngày 1–15 giữ tháng, từ ngày 16 dùng tháng kế để an
        cung/sao. Giờ Tý cố định đổi ngày từ 23:00: hệ thống chuyển đầy đủ sang ngày dân sự kế rồi
        an sao theo giờ Tý đầu ngày, kể cả khi qua tháng/năm. Ngày sinh gốc vẫn giữ nguyên. Đây là
        lựa chọn cố định của dự án dựa trên quy ước phần mềm, không phải kết luận mọi sách Nam phái
        dùng cùng cách.
      </p>
      <p>
        Vị trí Mệnh, Thân, 14 chính tinh, phụ tinh và đại hạn được tính bằng thư viện. Nạp âm được
        tra theo chu kỳ 60 năm. Miếu/Vượng/Đắc/Bình/Hãm là phân loại theo bảng của thư viện, không
        phải điểm tốt xấu của cuộc đời.
      </p>
      <h2>Giới hạn kiểm chứng</h2>
      <p>
        Bộ an sao là bản triển khai theo hồ sơ Nam phái của dự án; BA và luồng chuyên môn AI đối
        chiếu nguồn, chưa có thẩm định độc lập bởi chuyên gia con người. Kiểm thử phần mềm và đối
        chiếu lịch không xác nhận khả năng dự đoán sự kiện.
      </p>
      <p>
        Hồ sơ lịch Việt Nam cũ chỉ giữ cho audit lịch sử, không được dùng để lập lá số mới. Hồ sơ đã
        lưu theo lịch cũ cần nhập lại; website giữ nguyên dữ liệu cũ cho đến khi bạn chủ động xóa.
        Lịch lịch sử, múi giờ nơi sinh và giờ mặt trời thực chưa được hỗ trợ. Luận hạn, điểm phần
        trăm và dự báo AI chưa được cung cấp.
      </p>
      <h2>Nội dung năm tuổi và quyền quyết định</h2>
      <p>
        Trang năm tuổi trình bày can chi, nạp âm và tuổi mụ, không phải lá số đầy đủ hoặc lời phán
        vận hạn. Các giải thích về cung là nội dung văn hóa tham khảo; quyết định sức khỏe, tài
        chính và đời sống cần dựa trên thực tế và chuyên môn phù hợp.
      </p>
      <h2 id="luan-giai">Luận giải tổng quát và chi tiết</h2>
      <p>
        Bản đọc tham khảo được tạo trên thiết bị sau khi lập lá số thành công. Tổng quan dùng vị trí
        Mệnh, Thân, Cục và nạp âm; chi tiết 12 cung giữ nguyên chính tinh, trạng thái sao và Tứ Hóa
        từ lá số. Các sao ở cung tam hợp hoặc đối cung không được chuyển thành sao tọa thủ. Chưa
        nhận diện cách cục, đại hạn hoặc lưu niên. Chỉ mở rộng các nhóm Tả Phụ–Hữu Bật và Văn
        Xương–Văn Khúc khi đủ cả cặp cùng ngữ cảnh chính tinh; Khôi–Việt chưa kích hoạt vì cách an
        sao chưa được đối chiếu đầy đủ.
      </p>
      <p>
        Chủ đề biểu tượng của 14 chính tinh được nghiên cứu từ{' '}
        <a href="https://zh.wikisource.org/w/index.php?title=紫微斗數全書/卷一&oldid=7913704#諸星問答論">
          Tử Vi Đẩu Số Toàn Thư, Quyển I — Chư tinh vấn đáp luận
        </a>
        . Tên và thứ tự 12 cung được đối chiếu{' '}
        <a href="https://zh.wikisource.org/w/index.php?title=紫微斗數全書/卷二&oldid=1963110">
          Quyển II — An thập nhị cung
        </a>
        . Đây là bản chép văn bản cổ trên Wikisource, đã đối chiếu một số đoạn với ảnh sách nhưng
        chưa xác minh đầy đủ quan hệ ấn bản; không phải giáo trình được kiểm định hiện đại. Văn bản
        cổ được website ghi thuộc phạm vi công cộng; phần biên tập website có điều khoản riêng.
      </p>
      <p>
        Diễn giải tiếng Việt là nội dung hiện đại do dự án biên soạn với hỗ trợ AI, không phải dịch
        nguyên văn hoặc phản hồi từ dịch vụ AI trực tuyến. Câu hỏi suy ngẫm là gợi ý biên tập, không
        phải lời phán có trong sách. Không sử dụng các nhận định định kiến, bệnh tật, tử vong, sinh
        sản hoặc kết luận chắc chắn về tài sản và quan hệ trong văn bản cổ.
      </p>
      <p>
        Nguồn cổ dùng tháng nhuận theo tháng kế tiếp trong mục An Thân Mệnh, khác chính sách chia
        ngày 15 cố định của công cụ hiện tại. Dị bản được lưu làm tham chiếu và không áp dụng vào hồ
        sơ hiện hành. Nguồn này không xác nhận toàn bộ cấu hình an sao; khác biệt được công bố,
        không âm thầm đổi ngày sinh. Bản đọc đang ở mức tham khảo nghiên cứu, chưa được thẩm định
        độc lập và không xác nhận khả năng dự đoán.
      </p>
      <h2 id="ho-so-quy-tac">Hồ sơ quy tắc và truy nguồn</h2>
      <p>
        Nội dung luận giải tách riêng khỏi cấu hình an sao. Website chỉ có một hồ sơ Nam phái; các
        quy tắc chưa đủ nguồn vẫn giữ trạng thái chờ duyệt.
      </p>
      <p>
        Corpus nguồn sách giữ 36 ca từng phần được đếm từ đoạn sách ghim phiên bản, 218 trường
        Mệnh/Thân, Tả–Hữu, Xương–Khúc và một ví dụ Cục/Tử Vi. Không lấy kết quả bộ tính làm đáp án.
        Những trường chưa có nguồn không được tính là đã kiểm chứng; đây là bằng chứng của hồ sơ
        lịch Việt Nam v2 đã lưu trữ, không tự xác nhận hồ sơ hiện hành hoặc tạo thành 36 lá số chuẩn
        hoàn chỉnh. Đối chiếu website bên ngoài được ghi riêng kèm lịch và quy tắc tương thích.
      </p>
      <p>
        Các bộ lọc đủ cặp, có chính tinh và quan hệ bốn cung là quyết định biên tập giới hạn của dự
        án, không phải toàn bộ điều kiện cách cục cổ. Mỗi kết nối có “Vì sao luận như vậy”, giữ vị
        trí sao thật và không tạo điểm vận may.
      </p>
      {KNOWLEDGE_PROFILE.differences.map((difference) => (
        <p key={difference.id}>
          {difference.status === 'disputed' ? 'Chưa thống nhất' : 'Chưa chốt chuyên môn'}:{' '}
          {difference.detail.replace('iztro', 'bộ an sao')}
        </p>
      ))}
      {KNOWLEDGE_RULES.map((rule) => (
        <details key={rule.id} className="knowledge-rule">
          <summary>
            {rule.interpretation} ·{' '}
            {rule.status === 'disputed'
              ? 'chưa thống nhất'
              : rule.status === 'deferred'
                ? 'chưa kích hoạt'
                : rule.status === 'editorial'
                  ? 'diễn giải biên tập'
                  : 'đã đối chiếu văn bản, không kiểm chứng dự báo'}
          </summary>
          <p>{rule.interpretation}</p>
          <p>Giới hạn: {rule.limits}</p>
          <ul>
            {rule.passageIds.map((id) => {
              const passage = resolvePassage(id);
              const source = INTERPRETATION_SOURCES.find((item) => item.id === passage.sourceId)!;
              return (
                <li key={id}>
                  <p>{passage.heading}</p>
                  <blockquote lang="zh">{passage.excerpt}</blockquote>
                  <p>{passage.reading}</p>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title} — {source.section} (mở tab mới)
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </article>
  );
}
