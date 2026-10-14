'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Compass, Heart, Wallet } from 'lucide-react';
import type { ChartResult } from '@/domain/astrology/types';
import { calculateInterpretation } from '@/domain/interpretation/calculate';
import { INTERPRETATION_SOURCES } from '@/domain/interpretation/catalog';
import type {
  ContextualInsight,
  CareerNarrative,
  PalaceReading,
  ReadingClaim,
  StarReading,
} from '@/domain/interpretation/types';
import type { ReadingConcern } from '@/domain/interpretation/types';
import type {
  BriefClaim,
  BriefEvidence,
  ReadingBriefV1,
} from '@/domain/interpretation/reading-brief-schema';
import { presentContext, vietnamToday } from '@/domain/interpretation/present';
import { sortThemes } from '@/domain/interpretation/themes';
import { KNOWLEDGE_PROFILE, resolvePassage, resolveRule } from '@/domain/interpretation/knowledge';
import './interpretation-panel.css';

const BRIEF_TOPIC_LABELS: Record<ReadingBriefV1['topic'], string> = {
  overview: 'Tổng quan',
  career: 'Công việc',
  finance: 'Tài lộc',
  relationship: 'Tình duyên',
};

function ReadingBriefOriginLabel({ brief }: { brief: ReadingBriefV1 }) {
  if (brief.dataOrigin === 'demonstration') {
    return (
      <p className="reading-brief-origin" role="note">
        Bản minh họa — không phải luận giải cá nhân đã xác minh.
      </p>
    );
  }
  if (brief.dataOrigin === 'structural-mock') {
    return (
      <p className="reading-brief-origin" role="note">
        Mẫu cấu trúc để duyệt cách viết — không phải luận giải cá nhân.
      </p>
    );
  }
  return <p className="reading-brief-reference">Bản đọc tham khảo theo dữ kiện lá số</p>;
}

function BriefEvidenceList({
  claim,
  evidence,
  brief,
}: {
  claim: BriefClaim;
  evidence: Map<string, BriefEvidence>;
  brief: ReadingBriefV1;
}) {
  const items = claim.evidenceIds.flatMap((id) => {
    const item = evidence.get(id);
    return item ? [item] : [];
  });

  return (
    <ul className="reading-brief-evidence-list">
      {items.map((item) => (
        <li key={item.id}>
          <p>{item.explanation}</p>
          {item.limitations.length > 0 && (
            <ul>
              {item.limitations.map((limit) => (
                <li key={limit}>{limit}</li>
              ))}
            </ul>
          )}
          <p className="reading-brief-evidence-meta">
            Quy tắc {item.rule.id} · phiên bản {item.rule.version}
          </p>
          <ul className="reading-brief-source-links">
            {item.sourceIds.flatMap((sourceId) => {
              const source = brief.sourceRevision.sources.find(
                (candidate) => candidate.sourceId === sourceId,
              );
              return source
                ? [
                    <li key={source.sourceId}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        Mở đoạn nguồn {source.sourceId} (tab mới)
                      </a>
                    </li>,
                  ]
                : [];
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/**
 * Pure Reading Brief v1 presentation boundary. The deterministic adapter owns
 * validation and grounding; this component never infers or repairs content.
 */
export function ReadingBriefView({ brief }: { brief: ReadingBriefV1 }) {
  const headingId = `reading-brief-${brief.readingId}`;
  const evidenceById = new Map(brief.evidence.map((item) => [item.id, item]));

  if (brief.status !== 'ready') {
    const unavailable = brief.status === 'unavailable';
    return (
      <section
        className="reading-brief reading-brief-state"
        data-reading-origin={brief.dataOrigin}
        data-reading-status={brief.status}
        aria-labelledby={headingId}
      >
        <ReadingBriefOriginLabel brief={brief} />
        <h3 id={headingId}>
          {unavailable ? 'Chưa thể tạo bản đọc' : 'Chưa có kết luận riêng cho phần này'}
        </h3>
        <p role="status">
          {brief.validation.message ??
            (unavailable
              ? 'Dữ kiện hiện tại chưa thể dùng để tạo bản đọc.'
              : 'Chưa đủ căn cứ đã duyệt để tạo phần luận giải này.')}
        </p>
        <p>Hệ thống không tạo nhận định hoặc lời khuyên thay thế khi thiếu căn cứ.</p>
      </section>
    );
  }

  const conclusion = brief.conclusion;
  if (!conclusion) return null;

  const primaryClaimIds = new Set([
    conclusion.claimId,
    ...brief.insights.map((insight) => insight.claimId),
  ]);
  const additionalParagraphs =
    brief.topicReading?.paragraphs.filter((paragraph) => !primaryClaimIds.has(paragraph.claimId)) ??
    [];

  return (
    <section
      className="reading-brief"
      data-reading-origin={brief.dataOrigin}
      data-reading-status={brief.status}
      aria-labelledby={headingId}
    >
      <header className="reading-brief-header">
        <ReadingBriefOriginLabel brief={brief} />
        <p className="reading-brief-topic">{BRIEF_TOPIC_LABELS[brief.topic]}</p>
        <h3 id={headingId}>{conclusion.plainText}</h3>
      </header>

      <details className="reading-brief-evidence reading-brief-conclusion-evidence">
        <summary>Căn cứ cho kết luận</summary>
        <BriefEvidenceList claim={conclusion} evidence={evidenceById} brief={brief} />
      </details>

      <div className="reading-brief-insights" aria-label="Những điểm nổi bật">
        {brief.insights.map((insight) => (
          <article className="reading-brief-insight" key={insight.id}>
            <h4>{insight.title}</h4>
            <p>{insight.plainText}</p>
            {insight.nextStep && (
              <div className="reading-brief-next-step">
                <h5>Gợi ý thực hành</h5>
                <p>{insight.nextStep}</p>
              </div>
            )}
            <details className="reading-brief-evidence">
              <summary>Căn cứ của nhận định</summary>
              <BriefEvidenceList claim={insight} evidence={evidenceById} brief={brief} />
            </details>
          </article>
        ))}
      </div>

      {additionalParagraphs.length > 0 && (
        <div className="reading-brief-topic-reading" aria-label="Đọc theo chủ đề">
          {additionalParagraphs.map((paragraph) => (
            <p key={paragraph.claimId}>{paragraph.plainText}</p>
          ))}
        </div>
      )}

      {brief.topicReading?.nextStep && (
        <aside className="reading-brief-next-step" aria-label="Gợi ý thực hành tùy chọn">
          <h4>Gợi ý thực hành</h4>
          <p>{brief.topicReading.nextStep}</p>
        </aside>
      )}
    </section>
  );
}

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

function PassageEvidence({ ids }: { ids: string[] }) {
  return (
    <ul>
      {[...new Set(ids)].map((id) => {
        const passage = resolvePassage(id);
        return (
          <li key={id}>
            <p>{passage.heading}</p>
            <blockquote lang="zh">{passage.excerpt}</blockquote>
            <p>{passage.reading}</p>
            <SourceLinks sourceIds={[passage.sourceId]} />
          </li>
        );
      })}
    </ul>
  );
}

function InsightEntry({
  insight,
  expanded = false,
}: {
  insight: ContextualInsight;
  expanded?: boolean;
}) {
  const rule = resolveRule(insight.ruleId);
  const Evidence = expanded ? 'div' : 'details';
  return (
    <article className="interpretation-entry interpretation-insight" data-rule-id={rule.id}>
      <h4>{insight.title}</h4>
      <p>{insight.text}</p>
      <Evidence className="interpretation-evidence interpretation-reason">
        {!expanded && <summary>Vì sao luận như vậy?</summary>}
        <p>{insight.why}</p>
        <ul>
          {insight.evidence.map((item, index) => (
            <li key={`${item.branch}-${index}`}>
              {item.scopePalace && `Xét từ ${item.scopePalace}: `}
              {item.palace} tại {item.branch} ·{' '}
              {item.relation === 'direct'
                ? 'tọa thủ (nằm ngay tại cung)'
                : item.relation === 'body'
                  ? 'cung an Thân'
                  : item.relation === 'trine'
                    ? 'tam hợp (hai cung cùng nhóm liên hệ)'
                    : 'đối cung (cung đối diện)'}
              :{' '}
              {item.stars.length
                ? item.stars
                    .map(
                      (s) =>
                        `${s.name}${s.brightness ? ` (${s.brightness})` : ''}${s.transformation ? ` · ${s.transformation}` : ''}`,
                    )
                    .join('; ')
                : 'không có chính tinh trong dữ kiện đang xét'}
              .
            </li>
          ))}
        </ul>
        <p>
          Căn cứ:{' '}
          {rule.status === 'editorial'
            ? 'kết nối biên tập có nguồn tham chiếu, chưa kiểm chứng dự báo'
            : 'tham khảo văn bản'}
          .
        </p>
        <PassageEvidence ids={insight.passageIds} />
      </Evidence>
    </article>
  );
}

function ClaimEntry({ claim }: { claim: ReadingClaim }) {
  return (
    <article className="reading-claim" data-claim-state={claim.state}>
      <h4>{claim.title}</h4>
      <p className="claim-status">
        {claim.state === 'supported'
          ? 'Đủ điều kiện biên tập'
          : claim.state === 'mixed'
            ? 'Cần đối chiếu tín hiệu trái chiều'
            : 'Chưa đủ điều kiện'}
      </p>
      <p>{claim.text}</p>
      {claim.state !== 'insufficient' && (
        <>
          <p>
            <strong>Tự kiểm chứng: </strong>
            {claim.selfCheck}
          </p>
          <p>
            <strong>Điều chỉnh: </strong>
            {claim.adjustment}
          </p>
        </>
      )}
      <details className="interpretation-evidence interpretation-reason">
        <summary>Vì sao có đánh giá này?</summary>
        <p>{claim.why}</p>
        <h4>Điều kiện đã đối chiếu</h4>
        <ul>
          {claim.conditions.map((condition, index) => (
            <li key={`${condition.id}-${condition.scopePalace}-${index}`}>
              Xét từ {condition.scopePalace}: {condition.label} —{' '}
              {condition.met ? 'đã khớp' : 'chưa khớp'}.
            </li>
          ))}
        </ul>
        {claim.missingPrerequisites.length > 0 && (
          <>
            <h4>Điều kiện chưa khớp trong phạm vi đang xét</h4>
            <ul>
              {claim.missingPrerequisites.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
        {claim.evidence.length > 0 && (
          <>
            <h4>Dữ kiện làm căn cứ</h4>
            <ul>
              {claim.evidence.map((item, index) => (
                <li key={`${item.scopePalace}-${item.branch}-${index}`}>
                  {item.scopePalace && `Xét từ ${item.scopePalace}: `}
                  {item.palace} tại {item.branch} ·{' '}
                  {item.relation === 'direct'
                    ? 'tọa thủ (ngay tại cung)'
                    : item.relation === 'trine'
                      ? 'tam hợp (cung cùng nhóm liên hệ)'
                      : item.relation === 'body'
                        ? 'cung an Thân'
                        : 'đối cung (cung đối diện)'}
                  {' — '}
                  {item.stars.map((star) => star.name).join('; ')}.
                </li>
              ))}
            </ul>
          </>
        )}
        <h4>Giới hạn của nhận định</h4>
        <ul>
          {claim.limitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <PassageEvidence ids={claim.passageIds} />
      </details>
    </article>
  );
}

function StarEntry({ star }: { star: StarReading }) {
  return (
    <article className="interpretation-entry">
      <h4>{star.name} · từ điển biểu tượng</h4>
      <p>
        <span className="interpretation-label">Dữ kiện lá số: </span>
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
      <details className="interpretation-evidence interpretation-reason">
        <summary>Vì sao có chủ đề này?</summary>
        <p>
          Đoạn dưới là căn cứ giải nghĩa thuật ngữ, không đủ để kết luận về bạn từ một sao. Câu hỏi
          tự đối chiếu là biên tập hiện đại.
        </p>
        <PassageEvidence ids={star.passageIds} />
      </details>
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
        {palace.insights.map((insight) => (
          <InsightEntry key={insight.ruleId} insight={insight} />
        ))}
        {palace.directStars.map((star) => (
          <StarEntry key={star.name} star={star} />
        ))}
        {palace.uninterpretedStars.length > 0 && (
          <p>
            <span className="interpretation-label">Chưa có nội dung luận giải: </span>
            {palace.uninterpretedStars.join(', ')}. Các sao này vẫn có trong lá số, nhưng bản đọc
            hiện tại chưa đủ quy tắc hoặc ngữ cảnh nhóm để diễn giải chúng.
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

function CareerReason({ narrative }: { narrative: CareerNarrative }) {
  return (
    <details className="interpretation-reason career-reason">
      <summary>Vì sao luận như vậy?</summary>
      <p>{narrative.why}</p>
      <h4>Dữ kiện được dùng</h4>
      <ul className="interpretation-evidence">
        {narrative.evidence.map((item, index) => (
          <li key={`${item.scopePalace}-${item.palace}-${index}`}>
            {item.scopePalace && `Xét từ ${item.scopePalace}: `}
            {item.palace} tại {item.branch} ·{' '}
            {item.relation === 'direct'
              ? 'tọa thủ (ngay tại cung)'
              : item.relation === 'body'
                ? 'cung an Thân'
                : item.relation === 'trine'
                  ? 'tam hợp (cùng nhóm địa chi)'
                  : 'đối cung (cung đối diện)'}
            {' — '}
            {item.stars.length
              ? item.stars.map((star) => star.name).join('; ')
              : 'không có chính tinh được dùng trực tiếp'}
            .
          </li>
        ))}
      </ul>
      <h4>Phạm vi của cách đọc</h4>
      <ul>
        {narrative.limitations.map((limit) => (
          <li key={limit}>{limit}</li>
        ))}
      </ul>
      <PassageEvidence ids={narrative.passageIds} />
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
  const [concern, setConcern] = useState<ReadingConcern>('career');
  const present = presentContext(chart, vietnamToday());
  return (
    <section id="ban-doc" className="interpretation-panel" aria-labelledby="interpretation-heading">
      <header className="interpretation-header">
        <p className="interpretation-kicker">
          <BookOpen size={20} aria-hidden="true" />
          ĐỌC VÀ HIỂU LÁ SỐ
        </p>
        <h3 id="interpretation-heading">Bản đọc dành cho bạn</h3>
        <p className="reading-subtitle">Ngắn gọn trước, chi tiết sau.</p>
        {report.status === 'ready' && (
          <p className="reading-chart-anchor">
            Mệnh tại {chart.palaces.find((palace) => palace.name === 'Mệnh')?.branch}
            {' · '}Thân cư {report.summary.focusPalace}
          </p>
        )}
        {isExample && <p className="interpretation-example">Bản đọc lá số minh họa</p>}
        <p className="reading-disclaimer">
          Bản đọc văn hóa tham khảo, chưa thẩm định độc lập; không thay thế tư vấn chuyên môn.
        </p>
        {isExample && (
          <p>
            Nội dung thuộc lá số minh họa. Lập lá số của bạn để xem bản đọc theo dữ kiện đã nhập.
          </p>
        )}
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
              <details>
                <summary>Phạm vi và khác biệt quy tắc</summary>
                <p>
                  Nội dung được biên soạn tại dự án, không phải phản hồi từ AI trực tuyến. Chỉ diễn
                  giải các nhóm có nguồn; chưa mở cách cục, Phi Hóa hoặc dự báo theo năm.
                </p>
                <p>
                  Quy ước đang dùng: giờ Tý{' '}
                  {chart.provenance.ziPolicy === 'civil_midnight'
                    ? 'đổi ngày lúc 00:00'
                    : 'đổi ngày lúc 23:00'}
                  ; tháng nhuận{' '}
                  {chart.provenance.leapPolicy === 'split_at_15'
                    ? 'chia ở ngày 15'
                    : 'giữ nguyên tháng'}
                  .
                </p>
                {KNOWLEDGE_PROFILE.differences.map((item) => (
                  <p key={item.id}>
                    {item.status === 'disputed' ? 'Chưa thống nhất' : 'Chưa chốt chuyên môn'}:{' '}
                    {item.detail.replace('iztro', 'bộ an sao')}
                  </p>
                ))}
              </details>
            </div>
            <section
              className="interpretation-section reading-present"
              aria-label="Bối cảnh hiện tại"
            >
              <h4>Điểm bắt đầu của bạn</h4>
              <details className="present-detail">
                <summary>
                  {present.age === null ? 'Chưa xác định tuổi mụ' : `${present.age} tuổi mụ`}
                  {' · '}Mốc đối chiếu 2026
                  <span>
                    {present.decade
                      ? `Đại hạn ${present.decade.range.join('–')} tuổi · ${present.decade.palace}`
                      : 'Chưa có khoảng Đại hạn tương ứng'}
                  </span>
                </summary>
                <dl className="present-facts">
                  <div>
                    <dt>Tuổi mụ (đếm theo năm âm lịch)</dt>
                    <dd>
                      {present.age === null
                        ? 'Ngày sinh ở tương lai'
                        : `${present.age} tuổi · năm âm lịch ${present.lunarYear}`}
                    </dd>
                  </div>
                  <div>
                    <dt>Đại hạn (khoảng tuổi mười năm trong lá số)</dt>
                    <dd>
                      {present.decade
                        ? `${present.decade.range.join('–')} tuổi · cung ${present.decade.palace} tại ${present.decade.branch}`
                        : 'Chưa có khoảng tuổi tương ứng'}
                    </dd>
                  </div>
                  <div>
                    <dt>Lưu niên (năm dùng để đối chiếu)</dt>
                    <dd>2026 · Bính Ngọ</dd>
                  </div>
                </dl>
                <p>
                  Khoảng Đại hạn chỉ xác định vị trí theo tuổi, chưa luận tốt/xấu; năm 2026 là mốc
                  đối chiếu, chưa an sao Lưu niên.
                </p>
              </details>
              <label className="reading-concern">
                Bạn muốn bắt đầu từ điều gì?
                <select
                  value={concern}
                  onChange={(event) => setConcern(event.target.value as ReadingConcern)}
                >
                  <option value="career">Sự nghiệp</option>
                  <option value="finance">Tài lộc</option>
                  <option value="relationship">Tình duyên</option>
                </select>
              </label>
            </section>
            <section
              className="interpretation-section reading-themes"
              aria-label="Chủ đề xuyên cung"
            >
              <h4>Ba mạch đọc xuyên cung</h4>
              {sortThemes(report.themes, concern).map((theme, index) => (
                <article
                  className="reading-theme"
                  key={theme.id}
                  data-concern={theme.concern}
                  data-career-reading-state={theme.careerNarrative?.state}
                >
                  <div className="theme-caption">
                    <span>
                      {theme.concern === 'career' ? (
                        <Compass size={18} aria-hidden="true" />
                      ) : theme.concern === 'finance' ? (
                        <Wallet size={18} aria-hidden="true" />
                      ) : (
                        <Heart size={18} aria-hidden="true" />
                      )}
                      {theme.concern === 'career'
                        ? 'Sự nghiệp'
                        : theme.concern === 'finance'
                          ? 'Tài lộc'
                          : 'Tình duyên'}
                    </span>
                    <span aria-hidden="true">0{index + 1}</span>
                  </div>
                  <details className="theme-deep" open={theme.concern === concern}>
                    <summary>{theme.title}</summary>
                    {theme.careerNarrative ? (
                      <>
                        <div className="career-narrative">
                          {theme.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                        <CareerReason narrative={theme.careerNarrative} />
                        <details className="reading-exercise career-practice">
                          <summary>Gợi ý thực hành (tùy chọn)</summary>
                          <p>{theme.careerNarrative.practice.prompt}</p>
                          <p>{theme.careerNarrative.practice.action}</p>
                        </details>
                      </>
                    ) : (
                      <>
                        {theme.paragraphs.slice(0, 2).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        <details className="reading-exercise">
                          <summary>Đọc sâu: tự kiểm chứng và điều chỉnh</summary>
                          <p>
                            <strong>Tự kiểm chứng: </strong>
                            {theme.selfCheck}
                          </p>
                        </details>
                        <details className="interpretation-reason">
                          <summary>Vì sao luận như vậy?</summary>
                          <p>
                            Các cung đối chiếu: {theme.palaceNames.join(' – ')}. Chỉ những nhóm đủ
                            điều kiện trong lá số này mới xuất hiện dưới đây.
                          </p>
                          {theme.insights.map((insight, index) => (
                            <InsightEntry
                              key={`${insight.ruleId}-${index}`}
                              insight={insight}
                              expanded
                            />
                          ))}
                        </details>
                        <details className="reading-claims">
                          <summary>Điều kiện của mạch luận</summary>
                          <p>
                            Đối chiếu từng nhóm với dữ kiện thực của các cung liên hệ. Nhiều nhóm
                            cùng xuất hiện không tự tạo thành tín hiệu trái chiều; nhóm chưa đủ điều
                            kiện không có nghĩa là bất lợi.
                          </p>
                          {theme.claims.map((claim) => (
                            <ClaimEntry key={claim.id} claim={claim} />
                          ))}
                        </details>
                      </>
                    )}
                  </details>
                </article>
              ))}
            </section>
            <details className="reading-more reading-palace-directory">
              <summary>Tra cứu dữ kiện và chi tiết 12 cung</summary>
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
                {report.summary.insights.map((insight) => (
                  <InsightEntry key={insight.ruleId} insight={insight} />
                ))}
              </section>
              <section className="interpretation-section" aria-label="Chi tiết 12 cung">
                <h4>Khám phá 12 cung</h4>
                <p>
                  Chính tinh (nhóm sao chính), phụ tinh (nhóm sao bổ trợ) và trạng thái
                  Miếu/Vượng/Đắc/Bình/Hãm (mức phân loại biểu tượng trong bảng an sao) được giữ làm
                  dữ kiện. Tứ Hóa (bốn biến hóa biểu tượng) gồm Hóa Lộc (nguồn lực), Hóa Quyền
                  (quyền chủ động), Hóa Khoa (học hỏi, danh tiếng) và Hóa Kỵ (điểm cần rà soát);
                  chưa dùng chúng để phán kết quả.
                </p>
                <p>
                  Chọn một cung để xem thêm bằng chứng. Bắt đầu với cung Mệnh và cung{' '}
                  {report.summary.focusPalace}, nơi an Thân.
                </p>
                {report.palaces.map((palace) => (
                  <PalaceDetail key={palace.name} palace={palace} />
                ))}
              </section>
            </details>
            <section className="interpretation-sources" aria-label="Nguồn và phương pháp">
              <details className="reading-more">
                <summary>Nguồn và phương pháp</summary>
                <h4>Nguồn &amp; phương pháp</h4>
                <p>
                  Dữ kiện lấy từ lá số; lời diễn giải là nội dung biên soạn theo từng chính tinh,
                  nhóm phụ tinh và ngữ cảnh cung. Mỗi kết nối công bố dữ kiện, đoạn nguồn và phần
                  biên tập. Nguồn cổ điển dùng để tham khảo biểu tượng, không chứng nhận toàn bộ
                  thuật toán hay mọi quy tắc giờ Tý và tháng nhuận.
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
                  Bản đọc tạo trên thiết bị; ngày sinh không được gửi đến dịch vụ AI.
                </p>
              </details>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
