import type { Metadata } from 'next';
import { CalendarConverter } from '@/components/calendar-converter';
export const metadata: Metadata = {
  title: 'Chuyển đổi âm lịch Trung Quốc và dương lịch',
  description:
    'Chuyển ngày dương sang âm và ngược lại, kiểm tra tháng nhuận theo âm lịch Trung Quốc. Phạm vi 1900–2099.',
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
        Một ngày, hai cách gọi. Chuyển đổi âm lịch Trung Quốc, kiểm tra tháng nhuận và tìm lại ngày
        sinh của bạn.
      </p>
      <CalendarConverter />
      <p className="converter-note">
        Âm lịch Trung Quốc theo quy ước UTC+8. Phạm vi nhập 1900–2099; ngày dương đầu năm 1900 có
        thể hiển thị năm âm 1899. Nếu ngày âm trên giấy tờ theo lịch Việt Nam, hãy nhập ngày dương
        để đối chiếu. Công cụ không chọn ngày tốt xấu.
      </p>
    </section>
  );
}
