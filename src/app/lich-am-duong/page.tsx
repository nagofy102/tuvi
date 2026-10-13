import type { Metadata } from 'next';
import { CalendarConverter } from '@/components/calendar-converter';
export const metadata: Metadata = {
  title: 'Chuyển đổi lịch âm dương Việt Nam',
  description:
    'Chuyển ngày dương sang âm và ngược lại, kiểm tra tháng nhuận theo lịch Việt Nam. Phạm vi 1900–2099.',
  alternates: { canonical: '/lich-am-duong' },
};
export default function CalendarPage() {
  return (
    <section className="page-width converter-page">
      <span className="eyebrow">THEO NHỊP TỰ NHIÊN</span>
      <h1>
        Ngày dương.
        <br />
        <em>Tháng âm.</em>
      </h1>
      <p className="page-intro">
        Một ngày, hai cách gọi. Chuyển đổi lịch Việt Nam, kiểm tra tháng nhuận và tìm lại ngày sinh
        của bạn.
      </p>
      <CalendarConverter />
      <p className="converter-note">
        Lịch Việt Nam theo bảng dữ liệu của @dqcai/vn-lunar 1.0.1. Phạm vi nhập 1900–2099; ngày
        âm/dương ở biên phải cùng nằm trong phạm vi hỗ trợ. Không phải lịch Trung Quốc hay công cụ
        chọn ngày tốt xấu.
      </p>
    </section>
  );
}
