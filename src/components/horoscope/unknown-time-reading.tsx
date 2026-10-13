import { normalizeDate, formatDate } from '@/domain/calendar/convert';
import { napAm, yearName } from '@/domain/astrology/sexagenary';
import type { ProfileInput } from '@/domain/profiles/local';

export function UnknownTimeReading({ input }: { input: ProfileInput }) {
  const dates = normalizeDate(input);
  const element = napAm(dates.lunar.year);
  return (
    <section
      className="interpretation-panel unknown-time-reading"
      aria-labelledby="unknown-time-heading"
    >
      <header className="interpretation-header">
        <h3 id="unknown-time-heading">Thông tin không cần giờ sinh</h3>
        <p>Bản đọc văn hóa tham khảo; chưa đủ dữ kiện lập lá số cá nhân.</p>
      </header>
      <div className="interpretation-content">
        <dl className="present-facts">
          <div>
            <dt>Dương lịch</dt>
            <dd>{formatDate(dates.solar)}</dd>
          </div>
          <div>
            <dt>Âm lịch Việt Nam</dt>
            <dd>
              {formatDate(dates.lunar)}
              {dates.lunar.isLeapMonth ? ' · tháng nhuận' : ''}
            </dd>
          </div>
          <div>
            <dt>Năm âm lịch</dt>
            <dd>{yearName(dates.lunar.year)}</dd>
          </div>
          <div>
            <dt>Nạp âm năm sinh (phân loại chu kỳ 60 năm)</dt>
            <dd>
              {element.name} · {element.element}
            </dd>
          </div>
        </dl>
        <p>
          Chưa biết giờ sinh nên không xác định Mệnh, Thân, Cục, vị trí sao hoặc Đại hạn. Nạp âm năm
          sinh không phải Mệnh cung hay kết luận về tính cách, tài lộc hoặc tình duyên.
        </p>
        <h4>Bạn nên làm gì tiếp?</h4>
        <p>
          Tìm giờ trên giấy khai sinh hoặc hỏi người thân về mốc thời gian. Khi có giờ đáng tin cậy,
          bỏ chọn “Chưa biết giờ sinh” và lập lại lá số. Không chọn một giờ tùy ý để khớp lời luận.
        </p>
        <a className="text-link" href="#lap-la-so">
          Bổ sung giờ sinh
        </a>
      </div>
    </section>
  );
}
