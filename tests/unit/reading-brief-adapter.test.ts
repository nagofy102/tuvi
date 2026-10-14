import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import type { BirthInput } from '@/domain/astrology/types';
import { calculateInterpretation } from '@/domain/interpretation/calculate';
import {
  adaptReadingSignalSet,
  buildCareerReadingBrief,
  createCareerReadingResolvers,
} from '@/domain/interpretation/reading-brief';
import { resolveApprovedClaimTemplate } from '@/domain/interpretation/reading-claim-registry';
import { validateReadingBrief } from '@/domain/interpretation/reading-brief-schema';
import type { InterpretationReport } from '@/domain/interpretation/types';

const base = {
  calendar: 'solar',
  gender: 'male',
  leapPolicy: 'split_at_15',
  ziPolicy: 'next_day_at_23',
} as const;

const synthetic2000: BirthInput = {
  ...base,
  date: { year: 2000, month: 8, day: 29 },
  hour: 9,
  minute: 30,
};

const synthetic1990: BirthInput = {
  ...base,
  date: { year: 1990, month: 5, day: 15 },
  hour: 14,
  minute: 0,
};

function setup(input: BirthInput, readingId: string) {
  const chart = calculateChart(input);
  const interpretation = calculateInterpretation(chart);
  expect(interpretation.status).toBe('ready');
  if (interpretation.status !== 'ready') throw new Error(interpretation.message);
  return {
    chart,
    interpretation,
    brief: buildCareerReadingBrief({ chart, interpretation, readingId }),
  };
}

describe('HV-R04B deterministic career ReadingBrief adapter', () => {
  it('selects the approved A1 copy once for the exact synthetic 2000 SignalSet', () => {
    const { chart, interpretation, brief } = setup(synthetic2000, 'test-reading-2000');

    expect(brief.status).toBe('ready');
    expect(brief.verificationStatus).toBe('structure-validated');
    expect(brief.insights).toHaveLength(1);
    expect(brief.insights[0].deduplicationKey).toBe(
      'career:responsibility-clarity-cooperation:quan3-10:no11:menh-empty',
    );
    expect(brief.conclusion?.plainText).toBe(
      'Trong lá số của bạn, công việc nổi bật ở mối liên hệ giữa trách nhiệm công khai, cách làm rõ thông tin và sự phối hợp giữa các bên.',
    );
    expect(brief.topicReading?.paragraphs[0].plainText).toBe(
      'Với bạn, nét riêng của chủ đề công việc nằm ở chỗ trách nhiệm gắn với cách diễn đạt cho rõ; sự phối hợp là lớp nghĩa đi cùng, không thay thế trọng tâm ấy.',
    );
    expect(brief.insights[0]).not.toHaveProperty('nextStep');
    expect(brief.evidence.map((item) => item.rule.id)).toEqual([
      'symbol-3',
      'symbol-10',
      'symbol-11',
      'career-cross-palace',
      'palace-context',
    ]);
    expect(
      validateReadingBrief(
        brief,
        createCareerReadingResolvers(adaptReadingSignalSet(chart, interpretation), interpretation),
      ),
    ).toEqual({ ok: true, value: brief });
  });

  it('preserves exact original palace, branch and principal-star positions in the local SignalSet', () => {
    const { chart, interpretation } = setup(synthetic2000, 'test-signals');
    const signals = adaptReadingSignalSet(chart, interpretation);

    expect(signals.chartValidation).toBe('passed');
    expect(signals.signals).toHaveLength(3);
    for (const signal of signals.signals) {
      const palace = chart.palaces.find((candidate) => candidate.name === signal.palace)!;
      expect(signal.scopePalace).toBe(palace.name);
      expect(signal.branch).toBe(palace.branch);
      expect(signal.geometry).toEqual({
        scopeBranchIndex: palace.branchIndex,
        branchIndex: palace.branchIndex,
      });
      expect(signal.stars).toEqual(
        palace.stars
          .filter((star) => star.group === 'major')
          .map(({ name, brightness, transformation }) => ({ name, brightness, transformation })),
      );
    }
  });

  it('does not reuse A1 for the distinct synthetic 1990 SignalSet', () => {
    const { brief } = setup(synthetic1990, 'test-reading-1990');
    expect(brief).toMatchObject({
      status: 'insufficient-evidence',
      conclusion: null,
      insights: [],
      topicReading: null,
      evidence: [],
      validation: { reasons: ['insufficient-context'] },
    });
  });

  it('is deterministic when the caller supplies the same privacy-safe reading ID', () => {
    const first = setup(synthetic2000, 'test-deterministic').brief;
    const second = setup(synthetic2000, 'test-deterministic').brief;
    expect(second).toEqual(first);
  });

  it('fails closed when chart and InterpretationReport evidence do not match', () => {
    const current = setup(synthetic2000, 'test-mismatch');
    const other = setup(synthetic1990, 'test-other');
    const brief = buildCareerReadingBrief({
      chart: current.chart,
      interpretation: other.interpretation,
      readingId: 'test-mismatch-result',
    });
    expect(brief).toMatchObject({
      status: 'unavailable',
      conclusion: null,
      insights: [],
      validation: { reasons: ['invalid-chart'] },
    });
  });

  it('rejects an unknown template and free text through the approved registry', () => {
    const { brief } = setup(synthetic2000, 'test-unknown-template');
    expect(
      resolveApprovedClaimTemplate(
        {
          ...brief.conclusion!,
          templateId: 'career-unknown',
          plainText: 'Bạn chắc chắn sẽ thành công.',
        },
        brief,
      ),
    ).toBeNull();
  });

  it('rejects missing evidence and a mismatched template predicate during grounding validation', () => {
    const { chart, interpretation, brief } = setup(synthetic2000, 'test-grounding-reject');
    const missing = structuredClone(brief);
    missing.evidence = missing.evidence.filter((item) => item.rule.id !== 'symbol-11');
    const signalSet = adaptReadingSignalSet(chart, interpretation);
    const result = validateReadingBrief(
      missing,
      createCareerReadingResolvers(signalSet, interpretation),
    );
    expect(result).toMatchObject({ ok: false });
    if (!result.ok) {
      expect(result.issues.some((issue) => issue.includes('unresolved evidence'))).toBe(true);
      expect(result.issues.some((issue) => issue.includes('missing rule symbol-11'))).toBe(true);
    }

    const changedReport = structuredClone(interpretation) as InterpretationReport;
    const narrative = changedReport.themes.find(
      (theme) => theme.concern === 'career',
    )!.careerNarrative!;
    narrative.state = 'insufficient-context';
    const mismatched = validateReadingBrief(
      brief,
      createCareerReadingResolvers(signalSet, changedReport),
    );
    expect(mismatched).toMatchObject({ ok: false });
    if (!mismatched.ok) {
      expect(
        mismatched.issues.some((issue) => issue.includes('template not approved or mismatched')),
      ).toBe(true);
    }
  });

  it('returns unavailable for topics outside the admitted MVP matrix', () => {
    const { chart, interpretation } = setup(synthetic2000, 'test-topic-source');
    const brief = buildCareerReadingBrief({
      chart,
      interpretation,
      readingId: 'test-finance',
      topic: 'finance',
    });
    expect(brief).toMatchObject({
      topic: 'finance',
      status: 'unavailable',
      validation: { reasons: ['topic-not-admitted'] },
    });
  });
});
