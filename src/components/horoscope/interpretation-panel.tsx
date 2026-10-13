'use client';

import { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import type { ChartResult } from '@/domain/astrology/types';
import { calculateInterpretation } from '@/domain/interpretation/calculate';
import { INTERPRETATION_SOURCES } from '@/domain/interpretation/catalog';
import type { PalaceReading, StarReading } from '@/domain/interpretation/types';
import './interpretation-panel.css';

function SourceLinks({ sourceIds }: { sourceIds: string[] }) {
  const sources = INTERPRETATION_SOURCES.filter((source) => sourceIds.includes(source.id));
  if (!sources.length) return null;
  return (
    <ul>
      {sources.map((source) => (
        <li key={source.id}>
          {source.url ? (
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title} — {source.section} (mở tab mới)
            </a>
          ) : (
            <span>
              {source.title} — {source.section}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function StarEntry({ star }: { star: StarReading }) {
  return (
    <article className="interpretation-entry">
      <h4>{star.name}</h4>
      <p>
        <span className="interpretation-label">Dữ kiện engine: </span>
        {star.brightness ? `Trạng thái ${star.brightness}` : 'Chưa ghi trạng thái'}
        {star.transformation ? ` · ${star.transformation}` : ''}.
      </p>
      <p>
        <span className="interpretation-label">Ý nghĩa biểu tượng tham khảo: </span>
        {star.theme}
      </p>
      <p>
        <span className="interpretation-label">Gợi ý tự đối chiếu: </span>
        {star.reflection}
      </p>
      <div className="interpretation-evidence">
        <p className="interpretation-label">Căn cứ nội dung</p>
        <SourceLinks sourceIds={star.sourceIds} />
      </div>
    </article>
  );
}

function PalaceDetail({ palace }: { palace: PalaceReading }) {
  return (
    <details className="interpretation-palace">
      <summary>
        {palace.name} · {palace.branch}
        <span className="interpretation-palace-meta">{palace.title}</span>
      </summary>
      <div className="interpretation-palace-body">
        <p>{palace.overview}</p>
        <p>
          <span className="interpretation-label">Câu hỏi suy ngẫm: </span>
          {palace.reflection}
        </p>
        {palace.directStars.map((star) => (
          <StarEntry key={star.name} star={star} />
        ))}
        {palace.uninterpretedStars.length > 0 && (
          <p>
            <span className="interpretation-label">Chưa có nội dung luận giải: </span>
            {palace.uninterpretedStars.join(', ')}. Các sao này vẫn có trong lá số, nhưng bản đọc
            hiện tại chưa diễn giải ý nghĩa của chúng.
          </p>
        )}
        <div className="interpretation-evidence">
          <h4>Vì sao có các cung liên hệ?</h4>
          <p>
            Đối chiếu vị trí địa chi trong lá số. Các sao dưới đây ở cung gốc, không phải sao tọa
            thủ của cung {palace.name}; không dùng danh sách này để chấm điểm tốt/xấu.
          </p>
          <ul>
            {palace.relatedPalaces.map((related) => (
              <li key={`${related.relation}-${related.branch}`}>
                <span className="interpretation-label">
                  {related.relation === 'trine' ? 'Tam hợp' : 'Đối cung'}:
                </span>{' '}
                {related.name} tại {related.branch} —{' '}
                {related.stars.length
                  ? related.stars.map((star) => star.name).join(', ')
                  : 'không có chính tinh tọa thủ'}
                .
              </li>
            ))}
          </ul>
          <SourceLinks sourceIds={palace.sourceIds} />
        </div>
      </div>
    </details>
  );
}

export function InterpretationPanel({
  chart,
  isExample,
}: {
  chart: ChartResult;
  isExample: boolean;
}) {
  const report = useMemo(() => calculateInterpretation(chart), [chart]);
  return (
    <section className="interpretation-panel" aria-labelledby="interpretation-heading">
      <header className="interpretation-header">
        <p className="interpretation-kicker">
          <BookOpen size={20} aria-hidden="true" />
          ĐỌC VÀ HIỂU LÁ SỐ
        </p>
        <h3 id="interpretation-heading">Luận giải tổng quát &amp; chi tiết</h3>
        {isExample && <p className="interpretation-example">Bản đọc lá số minh họa</p>}
        <p>Luận giải tham khảo · nghiên cứu AI, chưa thẩm định độc lập</p>
        <p>
          {isExample
            ? 'Nội dung dưới đây thuộc lá số minh họa. Lập lá số của bạn để xem bản đọc theo dữ kiện đã nhập.'
            : 'Nội dung dưới đây dựa trên cung và chính tinh trong lá số vừa lập của bạn.'}
        </p>
      </header>
      <div className="interpretation-content">
        {report.status === 'unavailable' ? (
          <div className="interpretation-notice">
            <h4>Chưa thể tạo bản đọc</h4>
            <p>{report.message}</p>
            <p>Lá số vẫn hiển thị phía trên; không tạo nội dung thay thế khi thiếu căn cứ.</p>
          </div>
        ) : (
          <>
            <div className="interpretation-notice">
              <p>
                Bản đọc tham khảo theo biểu tượng của 14 chính tinh, chưa thẩm định độc lập. Không
                dự báo vận hạn hoặc thay thế tư vấn chuyên môn.
              </p>
              <details>
                <summary>Phạm vi và khác biệt quy tắc</summary>
                {report.warnings.map((warning) => (
                  <p key={warning}>{warning}</p>
                ))}
              </details>
            </div>
            <section className="interpretation-section" aria-label="Tổng quan lá số">
              <h4>Tổng quan của {isExample ? 'lá số minh họa' : 'lá số vừa lập'}</h4>
              <dl className="interpretation-facts">
                {report.summary.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label} · dữ kiện</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {report.summary.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            <section className="interpretation-section" aria-label="Chi tiết 12 cung">
              <h4>Khám phá 12 cung</h4>
              <p>
                Chọn một cung để đọc dữ kiện, ý nghĩa biểu tượng và căn cứ. Có thể bắt đầu với cung
                Mệnh và cung {report.summary.focusPalace}, nơi an Thân.
              </p>
              {report.palaces.map((palace) => (
                <PalaceDetail key={palace.name} palace={palace} />
              ))}
            </section>
            <section className="interpretation-sources" aria-label="Nguồn và phương pháp">
              <h4>Nguồn &amp; phương pháp</h4>
              <p>
                Dữ kiện lấy từ engine an sao; lời diễn giải là nội dung biên soạn cố định theo từng
                chính tinh và ngữ cảnh cung. Nguồn cổ điển dùng để tham khảo biểu tượng, không chứng
                nhận toàn bộ thuật toán hay mọi quy tắc giờ Tý và tháng nhuận.
              </p>
              <SourceLinks sourceIds={report.sourceIds} />
              <ul>
                {INTERPRETATION_SOURCES.filter((source) =>
                  report.sourceIds.includes(source.id),
                ).map((source) => (
                  <li key={source.id}>{source.description}</li>
                ))}
              </ul>
              <p className="interpretation-method">
                Phiên bản nội dung: {report.version}. Cấu hình an sao: {report.profile}. Bản đọc tạo
                trên thiết bị, không gửi ngày sinh đến dịch vụ AI.
              </p>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
