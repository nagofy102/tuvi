'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Grid2X2, List, Sparkles, X } from 'lucide-react';
import { PALACE_GRID } from '@/domain/astrology/sexagenary';
import { formatDate } from '@/domain/calendar/convert';
import { PALACE_CONTENT } from '@/data/palace-content';
import type { ChartResult, ChartStar } from '@/domain/astrology/types';
import { CelestialWheel } from '../ui/celestial-wheel';

export function ChartWidget({
  chart,
  displayName,
  isExample,
}: {
  chart: ChartResult;
  displayName: string;
  isExample: boolean;
}) {
  const [selected, setSelected] = useState('Mệnh');
  const [star, setStar] = useState<ChartStar | null>(null);
  const [view, setView] = useState<'chart' | 'list'>('chart');
  useEffect(() => {
    if (window.matchMedia('(max-width: 500px)').matches) setView('list');
  }, []);
  const lastStarTrigger = useRef<HTMLButtonElement | null>(null);
  const insightRef = useRef<HTMLElement | null>(null);
  function selectPalace(name: string, reveal = false) {
    setSelected(name);
    setStar(null);
    if (reveal && window.matchMedia('(max-width: 800px)').matches) {
      requestAnimationFrame(() => {
        insightRef.current?.focus({ preventScroll: true });
        insightRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    }
  }
  useEffect(() => {
    setSelected('Mệnh');
    setStar(null);
  }, [chart]);
  const palace = chart.palaces.find((p) => p.name === selected) ?? chart.palaces[0];
  const content = PALACE_CONTENT[palace.name];
  return (
    <div className="chart-layout">
      <nav className="palace-navigator" aria-label="Chọn cung để khám phá">
        <div className="palace-navigator-heading">
          <span className="eyebrow">CHẠM MỘT CUNG · HIỂU TỪNG PHẦN</span>
          <p>Chọn cung để xem dữ kiện và ý nghĩa, không cần đọc hết lá số.</p>
        </div>
        <div className="palace-chips">
          {chart.palaces.map((p) => (
            <button
              type="button"
              key={p.name}
              aria-pressed={selected === p.name}
              aria-label={`Khám phá cung ${p.name}`}
              onClick={() => selectPalace(p.name, true)}
            >
              {p.name}
              {p.isBodyPalace && <span> · Thân</span>}
            </button>
          ))}
        </div>
      </nav>
      <div className="chart-sheet">
        <div className="chart-toolbar">
          <span className="label">
            <span className="live-dot" />
            {isExample ? 'LÁ SỐ MINH HỌA · 17/05/1990' : 'LÁ SỐ CỦA BẠN'}
          </span>
          <div className="view-switch" role="group" aria-label="Cách hiển thị lá số">
            <button
              type="button"
              aria-pressed={view === 'chart'}
              onClick={() => setView('chart')}
              aria-label="Dạng biểu đồ"
            >
              <Grid2X2 size={17} />
            </button>
            <button
              type="button"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
              aria-label="Dạng danh sách dễ đọc"
            >
              <List size={18} />
            </button>
          </div>
        </div>
        <div
          className="chart-scroll"
          tabIndex={view === 'chart' ? 0 : undefined}
          role="region"
          aria-label="Lá số 12 cung, có thể cuộn ngang trên màn hình nhỏ"
        >
          <div className={`palace-grid ${view === 'list' ? 'palace-list' : ''}`}>
            {view === 'chart' && (
              <div className="chart-center">
                <CelestialWheel className="center-wheel" />
                <span className="center-eyebrow">THIÊN · ĐỊA · NHÂN</span>
                <h3>{isExample ? 'Lá số minh họa' : displayName || 'Lá số của bạn'}</h3>
                <span className="center-year">{chart.yearName}</span>
                <p>{chart.napAm.name}</p>
                <div className="center-divider" />
                <dl>
                  <div>
                    <dt>Dương lịch</dt>
                    <dd>{formatDate(chart.solar)}</dd>
                  </div>
                  <div>
                    <dt>Âm lịch</dt>
                    <dd>
                      {formatDate(chart.lunar)}
                      {chart.lunar.isLeapMonth ? ' (nhuận)' : ''}
                    </dd>
                  </div>
                  <div>
                    <dt>Giờ sinh</dt>
                    <dd>{chart.timeLabel}</dd>
                  </div>
                  <div>
                    <dt>Cục</dt>
                    <dd>{chart.cuc}</dd>
                  </div>
                </dl>
              </div>
            )}
            {chart.palaces.map((p) => {
              const position = PALACE_GRID[p.branchIndex];
              return (
                <article
                  key={p.branchIndex}
                  className={`palace-cell ${selected === p.name ? 'selected' : ''} ${p.name === 'Mệnh' ? 'destiny-cell' : ''}`}
                  style={
                    view === 'chart'
                      ? { gridRow: position.row, gridColumn: position.column }
                      : undefined
                  }
                >
                  <div className="palace-top">
                    <span>
                      {p.stem} {p.branch}
                    </span>
                    <span>
                      {p.decade[0]}–{p.decade[1]}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="palace-name"
                    aria-pressed={selected === p.name}
                    onClick={() => {
                      selectPalace(p.name, true);
                    }}
                  >
                    {p.name}
                    {p.isBodyPalace && <small>THÂN</small>}
                  </button>
                  <div className="major-stars">
                    {p.stars
                      .filter((s) => s.group === 'major')
                      .map((s) => (
                        <button
                          type="button"
                          key={s.name}
                          className="star-button"
                          onClick={(event) => {
                            lastStarTrigger.current = event.currentTarget;
                            setSelected(p.name);
                            setStar(s);
                          }}
                          aria-label={`Giải thích sao ${s.name} tại cung ${p.name}`}
                        >
                          {s.name}
                          <span>{s.brightness && `(${s.brightness})`}</span>
                          {s.transformation && <small>{s.transformation}</small>}
                        </button>
                      ))}
                    {!p.stars.some((s) => s.group === 'major') && (
                      <span className="empty-star">Vô chính diệu</span>
                    )}
                  </div>
                  <div className="minor-stars">
                    {p.stars
                      .filter((s) => s.group === 'minor')
                      .slice(0, 4)
                      .map((s) => (
                        <button
                          type="button"
                          key={s.name}
                          onClick={(event) => {
                            lastStarTrigger.current = event.currentTarget;
                            setSelected(p.name);
                            setStar(s);
                          }}
                          aria-label={`Giải thích sao ${s.name} tại cung ${p.name}`}
                        >
                          {s.name}
                          {s.transformation ? ` · ${s.transformation}` : ''}
                        </button>
                      ))}
                  </div>
                  <span className="life-stage">{p.lifeStage}</span>
                </article>
              );
            })}
          </div>
        </div>
        <p className="chart-help">
          <Sparkles size={15} />
          Chọn tên cung hoặc chính tinh để khám phá. Đại hạn hiển thị theo tuổi mụ.
        </p>
      </div>
      <aside
        ref={insightRef}
        tabIndex={-1}
        className="palace-insight"
        aria-label="Giải thích cung được chọn"
      >
        <span className="eyebrow">TỪNG CUNG TRÊN LÁ SỐ</span>
        <div className="insight-symbol">
          <Sparkles size={28} strokeWidth={1.2} />
        </div>
        <span className="insight-tag">CUNG {palace.name.toLocaleUpperCase('vi')}</span>
        <h3>{content.title}</h3>
        <p className="selected-palace-facts">
          {palace.stem} {palace.branch} · Đại hạn {palace.decade.join('–')} tuổi mụ
          {palace.isBodyPalace ? ' · Nơi an Thân' : ''}
        </p>
        <p>{content.text}</p>
        <div className="insight-stars">
          <span className="label">CHÍNH TINH TẠI CUNG</span>
          {palace.stars.some((s) => s.group === 'major') ? (
            palace.stars
              .filter((s) => s.group === 'major')
              .map((s) => (
                <div key={s.name}>
                  {s.name}
                  <span>{s.brightness || 'Chưa phân loại'}</span>
                </div>
              ))
          ) : (
            <p>Vô chính diệu · cần xét cung đối diện.</p>
          )}
        </div>
        <div className="reflection">
          <span>GỢI Ý SUY NGẪM</span>
          <p>“{content.question}”</p>
        </div>
        <details className="all-stars">
          <summary>
            Tất cả sao trong cung <ChevronRight size={15} />
          </summary>
          <ul>
            {palace.stars.map((s) => (
              <li key={`${s.group}-${s.name}`}>
                <button
                  type="button"
                  onClick={(event) => {
                    lastStarTrigger.current = event.currentTarget;
                    setStar(s);
                  }}
                  aria-label={`Giải thích sao ${s.name} tại cung ${palace.name}`}
                >
                  {s.name}
                  {s.brightness ? ` · ${s.brightness}` : ''}
                  {s.transformation ? ` · ${s.transformation}` : ''}
                </button>
              </li>
            ))}
          </ul>
        </details>
        <details className="chart-glossary">
          <summary>Hiểu các ký hiệu trong lá số</summary>
          <p>
            Vô chính diệu: cung không có chính tinh tọa thủ; cần xem các cung liên hệ, không có
            nghĩa là thiếu năng lực.
          </p>
          <p>
            Miếu, Vượng, Đắc, Lợi, Bình, Hãm là nhãn phân loại sao theo bảng an sao, không phải điểm
            tốt/xấu của bạn.
          </p>
          <p>
            Trường Sinh là vòng tên giai đoạn biểu tượng. Những tên như Bệnh hoặc Tử không phải chẩn
            đoán sức khỏe hay dự đoán tuổi thọ.
          </p>
        </details>
      </aside>
      {star && (
        <StarDialog
          star={star}
          palaceName={selected}
          onClose={() => {
            setStar(null);
            requestAnimationFrame(() => lastStarTrigger.current?.focus());
          }}
        />
      )}
    </div>
  );
}

function StarDialog({
  star,
  palaceName,
  onClose,
}: {
  star: ChartStar;
  palaceName: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="star-dialog"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      aria-labelledby="star-dialog-title"
      aria-describedby="star-dialog-description"
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onClose();
      }}
    >
      <button
        className="star-dialog-close"
        type="button"
        aria-label="Đóng cửa sổ giải thích"
        onClick={onClose}
      >
        <X size={22} aria-hidden="true" />
      </button>
      <span className="eyebrow">
        {star.group === 'major' ? 'CHÍNH TINH' : 'PHỤ TINH'} · CUNG{' '}
        {palaceName.toLocaleUpperCase('vi')}
      </span>
      <h2 id="star-dialog-title">{star.name}</h2>
      <p id="star-dialog-description">
        Trạng thái trong lá số: <strong>{star.brightness || 'Không có phân loại'}</strong>
        {star.transformation
          ? ` · ${star.transformation} (${({ 'Hóa Lộc': 'biểu tượng nguồn lực', 'Hóa Quyền': 'biểu tượng quyền chủ động', 'Hóa Khoa': 'biểu tượng học hỏi, danh tiếng', 'Hóa Kỵ': 'biểu tượng điểm cần rà soát' } as Record<string, string>)[star.transformation] ?? 'biến hóa biểu tượng'})`
          : ''}
        .
      </p>
      <p>
        Miếu, Vượng, Đắc, Bình, Hãm là các mức phân loại sao theo bộ quy tắc, không phải điểm số
        cuộc đời. Tứ Hóa (bốn dạng biến đổi của sao) gồm Hóa Lộc (nguồn lực), Hóa Quyền (quyền chủ
        động), Hóa Khoa (học hỏi, danh tiếng) và Hóa Kỵ (điểm cần rà soát); cần đọc cùng các cung
        liên hệ, không kết luận từ một sao.
      </p>
      <p className="muted">
        Đây là giải thích ký hiệu trên lá số. Bạn xem phần “Vì sao luận như vậy?” trong bản đọc để
        đối chiếu dữ kiện và nguồn tham khảo.
      </p>
      <button className="primary-button" type="button" onClick={onClose}>
        Đóng giải thích
      </button>
    </dialog>
  );
}
