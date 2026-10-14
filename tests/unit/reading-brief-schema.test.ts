import { describe, expect, it } from 'vitest';
import {
  validateReadingBrief,
  type BriefClaim,
  type BriefEvidence,
  type ReadingBriefResolvers,
  type ReadingBriefV1,
} from '@/domain/interpretation/reading-brief-schema';

const claim: BriefClaim = {
  claimId: 'career-a1-conclusion:draft-1',
  templateId: 'career-a1-conclusion',
  templateVersion: 'draft-1',
  plainText:
    'Trong lá số của bạn, công việc nổi bật ở mối liên hệ giữa trách nhiệm công khai, cách làm rõ thông tin và sự phối hợp giữa các bên.',
  evidenceIds: ['career-a1-evidence'],
  scope: 'editorial-symbolic',
};

const evidence: BriefEvidence = {
  id: 'career-a1-evidence',
  signalIds: ['quan-thai-duong', 'quan-cu-mon', 'no-thien-tuong', 'menh-no-principal'],
  rule: {
    id: 'career-a1-composite',
    version: 'git:24feea1:career-a1-composite',
    status: 'editorial',
  },
  passageIds: ['principal-3', 'principal-10', 'principal-11', 'layout-palaces'],
  sourceIds: ['classical-stars-vol1', 'classical-layout-vol2'],
  origin: 'chart-backed',
  explanation: 'Đối chiếu đúng các tín hiệu cung và chính tinh của SignalSet.',
  limitations: ['Diễn giải biểu tượng; không khẳng định nghề nghiệp hay kết quả thực tế.'],
};

const sourceRevision: ReadingBriefV1['sourceRevision'] = {
  repositoryCommit: '24feea1e7ddb799a32f7a646a5923d7b66c0d423',
  catalogPath: 'src/domain/interpretation/catalog.ts',
  passagesPath: 'src/domain/interpretation/knowledge.ts',
  sources: [
    {
      sourceId: 'classical-stars-vol1',
      revision: '7913704',
      url: 'https://example.invalid/classical-stars-vol1?oldid=7913704',
    },
    {
      sourceId: 'classical-layout-vol2',
      revision: '1963110',
      url: 'https://example.invalid/classical-layout-vol2?oldid=1963110',
    },
  ],
};

export const readyFixture: ReadingBriefV1 = {
  schemaVersion: 'reading-brief-v1',
  readingId: 'reading-r04a-ready',
  topic: 'career',
  status: 'ready',
  dataOrigin: 'user-chart',
  verificationStatus: 'structure-validated',
  calculationProfile: 'nam-phai-chinese-lunar-v1',
  calendarRuleVersion: 'chinese-lunar-typescript-1.8.6-v1',
  engineVersion: 'iztro-2.6.2-nam-phai-v1',
  ruleSetVersion: 'huyenvi-nam-phai-source-bounded-v3@24feea1e7ddb799a32f7a646a5923d7b66c0d423',
  sourceRevision,
  conclusion: claim,
  insights: [
    {
      ...claim,
      claimId: 'career-a1-insight:draft-1',
      templateId: 'career-a1-insight',
      plainText:
        'Với bạn, nét riêng của chủ đề công việc nằm ở chỗ trách nhiệm gắn với cách diễn đạt cho rõ; sự phối hợp là lớp nghĩa đi cùng, không thay thế trọng tâm ấy.',
      id: 'career-a1-insight',
      title: 'Trách nhiệm, diễn đạt và phối hợp',
      deduplicationKey: 'career:responsibility-clarity-cooperation:quan3-10:no11:menh-empty',
      priority: 'primary',
      rankingReasons: ['topic-match', 'approved-primary-rule', 'distinct-evidence'],
      exclusionIds: [],
    },
  ],
  topicReading: { topic: 'career', state: 'supported', paragraphs: [claim] },
  evidence: [evidence],
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

export const insufficientFixture: ReadingBriefV1 = {
  ...readyFixture,
  readingId: 'reading-r04a-insufficient',
  status: 'insufficient-evidence',
  conclusion: null,
  insights: [],
  topicReading: null,
  evidence: [],
  validation: {
    ...readyFixture.validation,
    reasons: ['missing-source'],
    message: 'Chưa đủ căn cứ đã duyệt để tạo phần luận giải này.',
    schema: 'not-run',
    grounding: 'not-run',
  },
};

export const demonstrationFixture: ReadingBriefV1 = {
  ...readyFixture,
  readingId: 'reading-r04a-demonstration',
  dataOrigin: 'demonstration',
  verificationStatus: 'unverified',
  validation: {
    ...readyFixture.validation,
    reasons: ['mock-only'],
    message: 'Bản minh họa — không phải luận giải từ lá số đã được kiểm chứng độc lập.',
    schema: 'not-run',
    grounding: 'demonstration-only',
  },
};

const resolvers: ReadingBriefResolvers = {
  template: () => ({
    approved: true,
    exactText: true,
    predicatesMatch: true,
    deduplicationKey: 'career:responsibility-clarity-cooperation:quan3-10:no11:menh-empty',
    requiredRuleIds: ['career-a1-composite'],
  }),
  evidence: () => true,
  signal: () => true,
};

function clone<T>(value: T): T {
  return structuredClone(value);
}

describe('ReadingBrief v1 runtime boundary', () => {
  it('accepts a grounded ready user-chart only with explicit resolvers', () => {
    expect(validateReadingBrief(readyFixture)).toMatchObject({ ok: false });
    expect(validateReadingBrief(readyFixture, resolvers)).toEqual({
      ok: true,
      value: readyFixture,
    });
  });

  it.each([insufficientFixture, demonstrationFixture])(
    'accepts typed non-production/demo fixture $readingId',
    (fixture) => {
      expect(validateReadingBrief(fixture)).toEqual({ ok: true, value: fixture });
    },
  );

  it('rejects unknown fields at root and nested levels', () => {
    const root = { ...clone(insufficientFixture), surprise: true };
    const nested = clone(insufficientFixture) as ReadingBriefV1 & {
      validation: ReadingBriefV1['validation'] & { debug?: boolean };
    };
    nested.validation.debug = true;
    expect(validateReadingBrief(root)).toMatchObject({
      ok: false,
      issues: expect.arrayContaining(['brief.surprise: unknown field']),
    });
    expect(validateReadingBrief(nested)).toMatchObject({
      ok: false,
      issues: expect.arrayContaining(['validation.debug: unknown field']),
    });
  });

  it('rejects invalid status/origin/verification combinations', () => {
    const invalid = clone(demonstrationFixture);
    invalid.verificationStatus = 'structure-validated';
    expect(validateReadingBrief(invalid)).toMatchObject({
      ok: false,
      issues: expect.arrayContaining(['demonstration: invalid verification or grounding']),
    });
  });

  it('rejects unresolved claim evidence and source references', () => {
    const invalid = clone(demonstrationFixture);
    invalid.conclusion!.evidenceIds = ['missing-evidence'];
    invalid.evidence[0].sourceIds = ['missing-source'];
    const result = validateReadingBrief(invalid);
    expect(result).toMatchObject({ ok: false });
    if (!result.ok) {
      expect(result.issues).toEqual(
        expect.arrayContaining([
          'claim.career-a1-conclusion:draft-1: unresolved evidence missing-evidence',
          'evidence.career-a1-evidence: unresolved source missing-source',
        ]),
      );
    }
  });

  it('rejects unapproved templates, predicate mismatches and semantic duplicates', () => {
    const invalid = clone(readyFixture);
    invalid.insights.push({
      ...invalid.insights[0],
      id: 'career-a1-insight-copy',
      claimId: 'career-a1-insight-copy:draft-1',
    });
    const denied: ReadingBriefResolvers = {
      ...resolvers,
      template: () => ({
        approved: false,
        exactText: true,
        predicatesMatch: false,
        deduplicationKey: 'career:responsibility-clarity-cooperation:quan3-10:no11:menh-empty',
        requiredRuleIds: ['career-a1-composite'],
      }),
    };
    const result = validateReadingBrief(invalid, denied);
    expect(result).toMatchObject({ ok: false });
    if (!result.ok) {
      expect(
        result.issues.some((issue) => issue.includes('template not approved or mismatched')),
      ).toBe(true);
      expect(result.issues).toContain('insight.career-a1-insight-copy: duplicate semantic key');
    }
  });

  it('rejects independent verification without a resolved immutable review artifact', () => {
    const invalid = clone(readyFixture);
    invalid.verificationStatus = 'independently-verified';
    invalid.validation.independentVerificationRef = 'review-that-does-not-exist';
    expect(validateReadingBrief(invalid, resolvers)).toMatchObject({
      ok: false,
      issues: expect.arrayContaining(['independent verification: unresolved review artifact']),
    });
  });
});
