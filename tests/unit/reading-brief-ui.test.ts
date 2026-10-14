import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ReadingBriefView } from '@/components/horoscope/interpretation-panel';
import type { ReadingBriefV1 } from '@/domain/interpretation/reading-brief-schema';

const conclusion = {
  claimId: 'career-a1-conclusion:approved-1',
  templateId: 'career-a1-conclusion',
  templateVersion: 'approved-1',
  plainText:
    'Trong lá số của bạn, công việc nổi bật ở mối liên hệ giữa trách nhiệm công khai, cách làm rõ thông tin và sự phối hợp giữa các bên.',
  evidenceIds: ['career-a1-evidence'],
  scope: 'editorial-symbolic' as const,
};

const readyBrief: ReadingBriefV1 = {
  schemaVersion: 'reading-brief-v1',
  readingId: 'ui-ready',
  topic: 'career',
  status: 'ready',
  dataOrigin: 'user-chart',
  verificationStatus: 'structure-validated',
  calculationProfile: 'nam-phai-chinese-lunar-v1',
  calendarRuleVersion: 'chinese-lunar-typescript-1.8.6-v1',
  engineVersion: 'iztro-2.6.2-nam-phai-v1',
  ruleSetVersion: 'huyenvi-nam-phai-source-bounded-v3@test',
  sourceRevision: {
    repositoryCommit: 'test-revision',
    catalogPath: 'src/domain/interpretation/catalog.ts',
    passagesPath: 'src/domain/interpretation/knowledge.ts',
    sources: [
      {
        sourceId: 'classical-stars-vol1',
        revision: '7913704',
        url: 'https://example.invalid/source?oldid=7913704',
      },
    ],
  },
  conclusion,
  insights: [
    {
      ...conclusion,
      claimId: 'career-a1-insight:approved-1',
      templateId: 'career-a1-insight',
      id: 'career-a1-insight',
      title: 'Trách nhiệm, diễn đạt và phối hợp',
      plainText:
        'Với bạn, nét riêng của chủ đề công việc nằm ở chỗ trách nhiệm gắn với cách diễn đạt cho rõ; sự phối hợp là lớp nghĩa đi cùng, không thay thế trọng tâm ấy.',
      deduplicationKey: 'career:responsibility-clarity-cooperation',
      priority: 'primary',
      rankingReasons: ['topic-match', 'approved-primary-rule', 'distinct-evidence'],
      exclusionIds: [],
    },
  ],
  topicReading: { topic: 'career', state: 'supported', paragraphs: [conclusion] },
  evidence: [
    {
      id: 'career-a1-evidence',
      signalIds: ['quan-thai-duong'],
      rule: { id: 'career-a1-composite', version: 'approved-1', status: 'editorial' },
      passageIds: ['principal-3'],
      sourceIds: ['classical-stars-vol1'],
      origin: 'chart-backed',
      explanation: 'Kết nối các tín hiệu đã được nhận vào bản đọc.',
      limitations: ['Không khẳng định nghề nghiệp hoặc kết quả thực tế.'],
    },
  ],
  exclusions: [],
  validation: {
    reasons: [],
    message: null,
    schema: 'passed',
    grounding: 'passed',
    contradictionReview: 'not-evaluated-domain-gap',
    independentVerificationRef: null,
  },
};

function render(brief: ReadingBriefV1) {
  return renderToStaticMarkup(createElement(ReadingBriefView, { brief }));
}

describe('ReadingBriefView', () => {
  it('renders the approved A1 conclusion first and exposes evidence with native disclosure', () => {
    const html = render(readyBrief);
    expect(html.indexOf(conclusion.plainText)).toBeLessThan(
      html.indexOf('Trách nhiệm, diễn đạt và phối hợp'),
    );
    expect(html).toContain('<details class="reading-brief-evidence');
    expect(html).toContain('<summary>Căn cứ cho kết luận</summary>');
    expect(html).toContain('Không khẳng định nghề nghiệp hoặc kết quả thực tế.');
    expect(html.match(new RegExp(conclusion.plainText, 'g'))).toHaveLength(1);
  });

  it('renders one to three distinct insights without requiring optional next steps', () => {
    const second = {
      ...readyBrief.insights[0],
      id: 'career-second',
      claimId: 'career-second:approved-1',
      title: 'Một nét riêng khác',
      plainText: 'Một nhận định riêng đã được adapter chấp nhận.',
      deduplicationKey: 'career:second',
    };
    const third = {
      ...second,
      id: 'career-third',
      claimId: 'career-third:approved-1',
      title: 'Nét riêng thứ ba',
      plainText: 'Nhận định thứ ba có căn cứ tách biệt.',
      deduplicationKey: 'career:third',
    };
    const html = render({ ...readyBrief, insights: [...readyBrief.insights, second, third] });
    expect((html.match(/class="reading-brief-insight"/g) ?? []).length).toBe(3);
    expect(html).not.toContain('Gợi ý thực hành');
  });

  it('keeps demonstration labeling visible beside otherwise ready content', () => {
    const html = render({
      ...readyBrief,
      dataOrigin: 'demonstration',
      verificationStatus: 'unverified',
      validation: {
        ...readyBrief.validation,
        reasons: ['mock-only'],
        message: 'Bản minh họa.',
        schema: 'not-run',
        grounding: 'demonstration-only',
      },
    });
    expect(html).toContain('Bản minh họa — không phải luận giải cá nhân đã xác minh.');
    expect(html).toContain('data-reading-origin="demonstration"');

    const mockHtml = render({
      ...readyBrief,
      dataOrigin: 'structural-mock',
      verificationStatus: 'not-applicable',
      calculationProfile: null,
      calendarRuleVersion: null,
      engineVersion: null,
      evidence: readyBrief.evidence.map((item) => ({
        ...item,
        signalIds: [],
        origin: 'structural-mock',
      })),
      validation: {
        ...readyBrief.validation,
        reasons: ['mock-only'],
        message: 'Mẫu cấu trúc.',
        schema: 'not-run',
        grounding: 'demonstration-only',
      },
    });
    expect(mockHtml).toContain('Mẫu cấu trúc để duyệt cách viết — không phải luận giải cá nhân.');
    expect(mockHtml).toContain('data-reading-origin="structural-mock"');
  });

  it.each([
    ['insufficient-evidence', 'Chưa có kết luận riêng cho phần này'],
    ['unavailable', 'Chưa thể tạo bản đọc'],
  ] as const)('renders an honest %s state without claims', (status, heading) => {
    const html = render({
      ...readyBrief,
      status,
      conclusion: null,
      insights: [],
      topicReading: null,
      evidence: [],
      validation: {
        ...readyBrief.validation,
        reasons: ['insufficient-context'],
        message: 'Chưa đủ căn cứ đã duyệt để tạo phần luận giải này.',
        schema: 'not-run',
        grounding: 'not-run',
      },
    });
    expect(html).toContain(heading);
    expect(html).toContain('không tạo nhận định hoặc lời khuyên thay thế');
    expect(html).not.toContain(conclusion.plainText);
  });
});
