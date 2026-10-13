'use client';

import { useMemo, useRef, useState } from 'react';
import { LazyMotion, m, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  Clock3,
  Compass,
  Heart,
  LockKeyhole,
  Printer,
  Share2,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { normalizeDate, formatDate } from '@/domain/calendar/convert';
import { MAX_YEAR, MIN_YEAR, type CalendarInput } from '@/domain/calendar/types';
import type { BirthInput, ChartResult } from '@/domain/astrology/types';
import { ChartWidget } from './horoscope/chart-widget';
import { CelestialWheel } from './ui/celestial-wheel';

const loadMotionFeatures = () => import('./ui/motion-features').then((module) => module.default);
const InterpretationPanel = dynamic(
  () => import('./horoscope/interpretation-panel').then((module) => module.InterpretationPanel),
  {
    ssr: false,
    loading: () => <p aria-live="polite">Đang chuẩn bị bản đọc tham khảo trên thiết bị…</p>,
  },
);

export function LandingExperience({ example }: { example: ChartResult }) {
  const [name, setName] = useState('');
  const [calendar, setCalendar] = useState<'solar' | 'lunar'>('solar');
  const [day, setDay] = useState(17);
  const [month, setMonth] = useState(5);
  const [year, setYear] = useState(1990);
  const [leap, setLeap] = useState(false);
  const [time, setTime] = useState('09:30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [leapPolicy, setLeapPolicy] = useState<BirthInput['leapPolicy']>('split_at_15');
  const [ziPolicy, setZiPolicy] = useState<BirthInput['ziPolicy']>('civil_midnight');
  const [chart, setChart] = useState(example);
  const [chartName, setChartName] = useState('');
  const [isExample, setIsExample] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [readingAvailable, setReadingAvailable] = useState(true);
  const [showExampleReading, setShowExampleReading] = useState(false);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const input = useMemo<CalendarInput>(
    () =>
      calendar === 'solar'
        ? { calendar, date: { day, month, year } }
        : { calendar, date: { day, month, year, isLeapMonth: leap } },
    [calendar, day, month, year, leap],
  );
  const converted = useMemo(() => {
    try {
      return { dates: normalizeDate(input), error: '' };
    } catch (cause) {
      return {
        dates: null,
        error: cause instanceof Error ? cause.message : 'Ngày sinh chưa hợp lệ.',
      };
    }
  }, [input]);
  function switchCalendar(next: 'solar' | 'lunar') {
    if (next === calendar) return;
    if (converted.dates) {
      const date = next === 'solar' ? converted.dates.solar : converted.dates.lunar;
      setDay(date.day);
      setMonth(date.month);
      setYear(date.year);
      setLeap(next === 'lunar' && converted.dates.lunar.isLeapMonth);
    }
    setCalendar(next);
    setError('');
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setNotice('');
    setReadingAvailable(false);
    if (converted.error) {
      setError(converted.error);
      return;
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
      setError('Vui lòng nhập giờ sinh đầy đủ.');
      return;
    }
    const [hour, minute] = time.split(':').map(Number);
    setLoading(true);
    try {
      const { calculateChart } = await import('@/domain/astrology/calculate');
      const result = calculateChart({ ...input, hour, minute, gender, leapPolicy, ziPolicy });
      setChart(result);
      setChartName(name.trim());
      setIsExample(false);
      setReadingAvailable(true);
      setNotice('Đã lập lá số. Thông tin sinh chỉ được xử lý trên thiết bị của bạn.');
      requestAnimationFrame(() => {
        resultHeading.current?.focus({ preventScroll: true });
        resultHeading.current?.scrollIntoView({
          behavior: reducedMotion ? 'instant' : 'smooth',
          block: 'start',
        });
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Không thể lập lá số. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }
  async function shareSite() {
    const url = new URL('/', window.location.origin).href;
    try {
      if (navigator.share) await navigator.share({ title: 'Huyền Vi — Tinh hoa Tử Vi Việt', url });
      else {
        await navigator.clipboard.writeText(url);
        setNotice('Đã sao chép liên kết trang Huyền Vi. Liên kết không chứa dữ liệu sinh.');
      }
    } catch (cause) {
      if (!(cause instanceof DOMException && cause.name === 'AbortError'))
        setNotice('Không thể chia sẻ tự động. Bạn có thể sao chép địa chỉ trang trên trình duyệt.');
    }
  }
  return (
    <>
      <section className="hero page-width" id="lap-la-so" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            TRÍ TUỆ CỔ XƯA · GÓC NHÌN MỚI
          </div>
          <h1 id="hero-title">
            Hiểu vận mệnh.
            <br />
            <em>Sống an nhiên.</em>
          </h1>
          <p className="hero-description">
            Mỗi người là một vũ trụ riêng.
            <br />
            Khám phá lá số của bạn, thấu hiểu bản thân và
            <br className="desktop-break" /> tìm một hướng đi bình tâm hơn.
          </p>
          <a href="#birth-name" className="text-link">
            Bắt đầu hành trình của bạn <ArrowUpRight size={20} />
          </a>
          <div className="hero-trust">
            <span>
              <ShieldCheck size={17} />
              Dữ liệu riêng tư
            </span>
            <span>
              <Sparkles size={17} />
              Lá số tức thì
            </span>
            <span>
              <BadgeCheck size={17} />
              Quy tắc minh bạch
            </span>
          </div>
          <CelestialWheel className="hero-wheel" />
          <div className="hero-caption">
            <span>THẤU HIỂU BẢN THÂN</span>
            <span>THUẬN TỰ NHIÊN · AN TÂM SỐNG</span>
          </div>
        </div>
        <LazyMotion features={loadMotionFeatures}>
          <m.div
            className="birth-card"
            initial={reducedMotion ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="card-heading">
              <span className="form-icon">
                <Compass size={24} strokeWidth={1.3} />
              </span>
              <div>
                <h2>Lập lá số của bạn</h2>
                <p>Một khởi đầu nhỏ, một góc nhìn mới.</p>
              </div>
              <span className="free-tag">MIỄN PHÍ</span>
            </div>
            <form
              onSubmit={submit}
              aria-describedby={error ? 'form-error' : 'calendar-confirmation'}
            >
              <label className="field">
                Họ và tên <span className="optional">(không bắt buộc)</span>
                <input
                  id="birth-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bạn muốn được gọi là gì?"
                  autoComplete="name"
                  maxLength={80}
                />
              </label>
              <div className="field-heading">
                <span>Ngày tháng năm sinh</span>
                <div className="calendar-switch" role="group" aria-label="Loại lịch">
                  <button
                    type="button"
                    aria-pressed={calendar === 'solar'}
                    onClick={() => switchCalendar('solar')}
                  >
                    Dương lịch
                  </button>
                  <button
                    type="button"
                    aria-pressed={calendar === 'lunar'}
                    onClick={() => switchCalendar('lunar')}
                  >
                    Âm lịch
                  </button>
                </div>
              </div>
              <div className="date-fields">
                <label className="field">
                  <span className="sr-only">Ngày sinh</span>
                  <input
                    type="number"
                    aria-label="Ngày sinh"
                    min={1}
                    max={31}
                    value={day || ''}
                    onChange={(e) => setDay(Number(e.target.value))}
                    required
                    inputMode="numeric"
                  />
                </label>
                <label className="field">
                  <span className="sr-only">Tháng sinh</span>
                  <select
                    aria-label="Tháng sinh"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option value={i + 1} key={i}>
                        Tháng {i + 1}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="sr-only">Năm sinh</span>
                  <input
                    aria-label="Năm sinh"
                    type="number"
                    min={MIN_YEAR}
                    max={MAX_YEAR}
                    required
                    value={year || ''}
                    onChange={(e) => setYear(Number(e.target.value))}
                    inputMode="numeric"
                  />
                </label>
              </div>
              {calendar === 'lunar' && (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={leap}
                    onChange={(e) => setLeap(e.target.checked)}
                  />
                  Sinh trong tháng nhuận
                </label>
              )}
              <p
                className={`calendar-confirmation ${converted.error ? 'date-warning' : ''}`}
                id="calendar-confirmation"
              >
                <CalendarDays size={15} />
                {converted.dates
                  ? `${calendar === 'solar' ? 'Âm lịch' : 'Dương lịch'}: ${formatDate(calendar === 'solar' ? converted.dates.lunar : converted.dates.solar)}${calendar === 'solar' && converted.dates.lunar.isLeapMonth ? ' · tháng nhuận' : ''}`
                  : converted.error}
              </p>
              <div className="form-two-column">
                <label className="field">
                  Giờ sinh{' '}
                  <span className="input-icon">
                    <Clock3 size={17} />
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      aria-label="Giờ sinh"
                    />
                  </span>
                </label>
                <label className="field">
                  Giới tính an lá số
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                    aria-label="Giới tính an lá số"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </label>
              </div>
              <details className="calculation-settings">
                <summary>
                  Quy ước lịch & an sao <ChevronDown size={15} />
                </summary>
                <p>
                  Lịch Việt Nam UTC+7. Giờ nhập là giờ địa phương trên giấy khai sinh. Giới tính
                  được dùng cho quy tắc đại hạn truyền thống, không suy luận từ tên.
                </p>
                <label className="field">
                  Tháng nhuận
                  <select
                    value={leapPolicy}
                    onChange={(e) => setLeapPolicy(e.target.value as BirthInput['leapPolicy'])}
                  >
                    <option value="split_at_15">Ngày 1–15: cùng tháng; từ 16: tháng kế</option>
                    <option value="same_month">Giữ nguyên tháng âm lịch</option>
                  </select>
                </label>
                <label className="field">
                  Giờ Tý từ 23:00
                  <select
                    value={ziPolicy}
                    onChange={(e) => setZiPolicy(e.target.value as BirthInput['ziPolicy'])}
                  >
                    <option value="civil_midnight">Giữ ngày đến 00:00</option>
                    <option value="next_day_at_23">Chuyển ngày từ 23:00</option>
                  </select>
                </label>
                <p>
                  Đây là cấu hình Tử Vi tham khảo, chưa được chuyên gia thẩm định riêng theo trường
                  phái Việt Nam. Không hỗ trợ điều chỉnh múi giờ lịch sử hoặc giờ mặt trời thực.
                </p>
              </details>
              {error && (
                <p className="form-error" role="alert" id="form-error">
                  {error}
                </p>
              )}
              <button type="submit" className="primary-button generate-button" disabled={loading}>
                {loading ? 'Đang an lá số…' : 'Khám phá lá số của tôi'}
                <ArrowRight size={19} />
              </button>
              <p className="privacy-note">
                <LockKeyhole size={13} />
                Không cần tài khoản. Không gửi thông tin sinh lên máy chủ.
              </p>
            </form>
          </m.div>
        </LazyMotion>
      </section>
      <div className="principles-strip">
        <div className="page-width">
          <span>
            <span className="small-ornament">✦</span> Tinh hoa phương Đông
          </span>
          <span>
            <span className="small-ornament">✦</span> Hiểu mình, không định kiến
          </span>
          <span>
            <span className="small-ornament">✦</span> Tri thức để suy ngẫm
          </span>
        </div>
      </div>
      <section id="la-so" className="chart-section page-width" aria-labelledby="chart-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">BẢN ĐỒ CUỘC ĐỜI</span>
            <h2 ref={resultHeading} tabIndex={-1} id="chart-heading">
              Mười hai cung. <em>Một bản thể.</em>
            </h2>
            <p>
              {isExample
                ? 'Khám phá một lá số minh họa, hoặc nhập ngày sinh để xem lá số của bạn.'
                : `${chartName ? `${chartName} · ` : ''}${chart.yearName} · ${chart.napAm.name}. Chọn từng cung để đọc chi tiết.`}
            </p>
          </div>
          <div className="chart-actions">
            <button type="button" onClick={() => window.print()}>
              <Printer size={17} />
              In / PDF
            </button>
            <button type="button" onClick={shareSite}>
              <Share2 size={17} />
              Chia sẻ trang
            </button>
          </div>
        </div>
        <p className="status-note" role="status" aria-live="polite">
          {notice}
        </p>
        {!isExample && (
          <div className="result-badges">
            <div>
              <span>NGŨ HÀNH NẠP ÂM</span>
              <strong>{chart.napAm.element}</strong>
              <p>{chart.napAm.name}</p>
            </div>
            <div>
              <span>MỆNH CHỦ</span>
              <strong>{chart.soul}</strong>
              <p>Thân chủ: {chart.body}</p>
            </div>
            <div>
              <span>NGŨ HÀNH CỤC</span>
              <strong>{chart.cuc}</strong>
              <p>
                {chart.yearName} · {chart.timeLabel}
              </p>
            </div>
          </div>
        )}
        <ChartWidget chart={chart} displayName={chartName} isExample={isExample} />
        {readingAvailable && isExample && !showExampleReading ? (
          <div className="source-note">
            <h3>Luận giải tổng quát &amp; chi tiết</h3>
            <p>Lập lá số để nhận bản đọc tham khảo, hoặc mở bản minh họa để khám phá cách đọc.</p>
            <button
              type="button"
              className="primary-button"
              onClick={() => setShowExampleReading(true)}
            >
              Đọc luận giải lá số minh họa
            </button>
          </div>
        ) : readingAvailable ? (
          <InterpretationPanel chart={chart} isExample={isExample} />
        ) : (
          <p className="source-note">
            Chưa tạo luận giải cho lần nhập hiện tại. Lá số phía trên là kết quả trước đó hoặc lá số
            minh họa, không phải kết quả của lần nhập chưa thành công.
          </p>
        )}
        <details className="source-note">
          <summary>
            <ShieldCheck size={15} />
            Nguồn và quy tắc của lá số <ChevronDown size={15} />
          </summary>
          <p>
            Lịch Việt Nam; cấu hình an sao tham khảo. Tháng nhuận:{' '}
            {chart.provenance.leapPolicy === 'split_at_15'
              ? 'chia theo ngày 15'
              : 'giữ nguyên tháng'}
            . Giờ Tý:{' '}
            {chart.provenance.ziPolicy === 'civil_midnight'
              ? 'đổi ngày lúc 00:00'
              : 'đổi ngày lúc 23:00'}
            .
          </p>
          <a href="/phuong-phap">
            Đọc phương pháp và giới hạn <ArrowUpRight size={14} />
          </a>
        </details>
      </section>
      <section className="explore-section">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <span className="eyebrow">TỪ THẤU HIỂU ĐẾN HÀNH ĐỘNG</span>
              <h2>
                Điều bạn đang <em>quan tâm.</em>
              </h2>
              <p>Ba góc nhìn thân thuộc, bắt đầu từ các cung trên lá số.</p>
            </div>
            <Link href="/tu-vi-nam-2026" className="text-link">
              Khám phá năm 2026 <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="interest-grid">
            {[
              {
                name: 'Tài lộc',
                palace: 'Tài Bạch',
                text: 'Hiểu cách nhìn nhận và sử dụng nguồn lực, để mỗi quyết định thêm chủ động.',
                icon: Wallet,
                className: 'wealth',
              },
              {
                name: 'Sự nghiệp',
                palace: 'Quan Lộc',
                text: 'Suy ngẫm về thế mạnh, định hướng và con đường phát triển của riêng bạn.',
                icon: Compass,
                className: 'career',
              },
              {
                name: 'Tình duyên',
                palace: 'Phu Thê',
                text: 'Lắng nghe bản thân, vun đắp kết nối và nuôi dưỡng những mối quan hệ.',
                icon: Heart,
                className: 'love',
              },
            ].map((item) => (
              <article key={item.name} className={`interest-card ${item.className}`}>
                <item.icon size={25} strokeWidth={1.3} />
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                <span className="interest-fact">
                  Cung {item.palace} ·{' '}
                  {chart.palaces
                    .find((p) => p.name === item.palace)
                    ?.stars.filter((s) => s.group === 'major')
                    .map((s) => s.name)
                    .join(', ') || 'Vô chính diệu'}
                  {isExample ? ' (minh họa)' : ''}
                </span>
                <a href="#la-so">
                  Xem trong lá số <ArrowUpRight size={18} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="philosophy-section page-width">
        <div>
          <span className="eyebrow">GÓC NHÌN HUYỀN VI</span>
          <h2>
            Lá số là một góc nhìn.
            <br />
            <em>Bạn là người chọn đường.</em>
          </h2>
        </div>
        <div>
          <p>
            Chúng tôi tin rằng tri thức cổ xưa có ý nghĩa khi giúp bạn hiểu mình hơn — không phải
            khi khiến bạn lo lắng về tương lai.
          </p>
          <p>
            Tử vi là một hệ thống diễn giải văn hóa. Hãy đón nhận với sự cởi mở, đối chiếu với trải
            nghiệm và luôn giữ quyền quyết định của mình.
          </p>
          <Link href="/phuong-phap" className="text-link">
            Tìm hiểu phương pháp <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="faq-section page-width" aria-labelledby="faq-title">
        <div>
          <span className="eyebrow">GIẢI ĐÁP NHẸ NHÀNG</span>
          <h2 id="faq-title">
            Bạn có thể đang <em>băn khoăn.</em>
          </h2>
        </div>
        <div className="faq-list">
          {[
            [
              'Tôi nên nhập ngày sinh âm lịch hay dương lịch?',
              'Bạn có thể chọn cả hai. Hệ thống chuyển đổi theo lịch Việt Nam và hiển thị ngày đối chiếu ngay trong biểu mẫu. Nếu nhập âm lịch, hãy đánh dấu tháng nhuận khi đúng với ngày sinh.',
            ],
            [
              'Nếu tôi không biết chính xác giờ sinh thì sao?',
              'Giờ sinh ảnh hưởng đến vị trí Mệnh, Thân và sao. Bạn nên kiểm tra giấy khai sinh hoặc hỏi người thân trước khi lập lá số; hệ thống không tự đoán giờ sinh.',
            ],
            [
              'Thông tin của tôi có được lưu lại không?',
              'Ứng dụng xử lý ngày sinh trên thiết bị của bạn, không gửi thông tin sinh lên máy chủ và không tự lưu lá số. Nút chia sẻ chỉ chia sẻ liên kết trang, không chứa tên hay ngày sinh.',
            ],
            [
              'Vì sao không có phần trăm vận hạn?',
              'Chúng tôi không tạo số dự đoán khi chưa có mô hình chấm điểm được kiểm chứng. Bạn có thể xem các sao và cung thực tế, nhưng không nên coi chúng là xác suất của sự kiện tương lai.',
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="mobile-start">
        <a href="#lap-la-so">
          Lập lá số của bạn <ArrowRight size={17} />
        </a>
      </div>
    </>
  );
}
