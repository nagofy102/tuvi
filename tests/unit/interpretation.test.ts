import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import { BRANCHES, mod } from '@/domain/astrology/sexagenary';
import type { BirthInput, ChartResult } from '@/domain/astrology/types';
import { calculateInterpretation } from '@/domain/interpretation/calculate';
import { INTERPRETATION_SOURCES, STAR_CATALOG } from '@/domain/interpretation/catalog';
import type { InterpretationReport } from '@/domain/interpretation/types';

const INPUT: BirthInput = {
  calendar: 'lunar',
  date: { year: 2000, month: 1, day: 1, isLeapMonth: false },
  gender: 'male',
  hour: 0,
  minute: 0,
  leapPolicy: 'split_at_15',
  ziPolicy: 'civil_midnight',
};

function chart(): ChartResult {
  return calculateChart(INPUT);
}

function ready(value: ChartResult = chart()): InterpretationReport {
  const report = calculateInterpretation(value);
  expect(report.status).toBe('ready');
  if (report.status !== 'ready') throw new Error(report.message);
  return report;
}

describe('reference interpretation integrity (not predictive validation)', () => {
  it('is deterministic, local and does not mutate its chart', () => {
    const input = chart();
    const original = structuredClone(input);
    expect(calculateInterpretation(input)).toEqual(calculateInterpretation(input));
    expect(input).toEqual(original);
    expect(input).not.toHaveProperty('fullName');
  });

  it('does not condition its reading on an extraneous user name', () => {
    const input = chart();
    expect(calculateInterpretation({ ...input, ...{ fullName: 'Một tên giả lập' } })).toEqual(
      calculateInterpretation(input),
    );
  });

  it('retains reference-unvalidated status and upstream warnings', () => {
    const input = chart();
    const report = ready(input);
    expect(report.reviewStatus).toBe('reference-unvalidated');
    expect(report.profile).toBe(input.provenance.profile);
    expect(report.warnings).toEqual(expect.arrayContaining(input.warnings));
    expect(report.warnings.join(' ')).toMatch(/không phải|chưa được/iu);
  });

  it('uses the actual Mệnh and Thân positions rather than soul/body star names', () => {
    const input = chart();
    const report = ready(input);
    const menh = input.palaces.find((palace) => palace.name === 'Mệnh')!;
    const than = input.palaces.find((palace) => palace.isBodyPalace)!;
    expect(report.summary.facts).toContainEqual({
      label: 'Mệnh',
      value: `Mệnh tại ${menh.branch}`,
    });
    expect(report.summary.facts).toContainEqual({
      label: 'Thân cư',
      value: `${than.name} tại ${than.branch}`,
    });
    expect(report.summary.focusPalace).toBe(than.name);
    expect(report.summary.paragraphs[0]).toContain(`Mệnh an tại ${menh.branch}`);
  });

  it('provides twelve unique palace readings with fourteen unique direct major stars', () => {
    const report = ready();
    expect(report.palaces).toHaveLength(12);
    expect(new Set(report.palaces.map((palace) => palace.name)).size).toBe(12);
    const stars = report.palaces.flatMap((palace) => palace.directStars);
    expect(stars).toHaveLength(14);
    expect(new Set(stars.map((star) => star.name)).size).toBe(14);
  });

  it('derives trines and opposition geometrically and keeps related stars in their original palaces', () => {
    const input = chart();
    const report = ready(input);
    for (const palace of report.palaces) {
      const origin = input.palaces.find((item) => item.name === palace.name)!;
      expect(palace.relatedPalaces).toHaveLength(3);
      for (const [index, related] of palace.relatedPalaces.entries()) {
        const offset = [4, 8, 6][index];
        const branch = BRANCHES[mod(origin.branchIndex + offset, 12)];
        const actual = input.palaces.find((item) => item.branch === branch)!;
        expect(related.branch).toBe(branch);
        expect(related.name).toBe(actual.name);
        expect(related.relation).toBe(offset === 6 ? 'opposition' : 'trine');
        expect(related.stars.map((star) => star.name)).toEqual(
          actual.stars.filter((star) => star.group === 'major').map((star) => star.name),
        );
      }
      expect(palace.directStars.map((star) => star.name)).toEqual(
        origin.stars.filter((star) => star.group === 'major').map((star) => star.name),
      );
    }
  });

  it('explains an empty major-star palace without relocating opposite stars', () => {
    const report = ready();
    const empty = report.palaces.find((palace) => palace.directStars.length === 0);
    expect(empty).toBeDefined();
    expect(empty?.overview).toContain('vô chính diệu');
    expect(empty?.overview).toContain('không được chuyển');
  });

  it('preserves star brightness and transformation as evidence, not scores', () => {
    const input = chart();
    const report = ready(input);
    for (const palace of report.palaces) {
      const actual = input.palaces.find((item) => item.name === palace.name)!;
      for (const star of palace.directStars) {
        const expected = actual.stars.find((item) => item.name === star.name)!;
        expect(star.brightness).toBe(expected.brightness);
        expect(star.transformation).toBe(expected.transformation);
        expect(star.sourceIds.length).toBeGreaterThan(0);
      }
    }
    expect(JSON.stringify(report)).not.toMatch(/\d+(?:[.,]\d+)?\s*%/u);
    expect(report).not.toHaveProperty('confidence');
    expect(report).not.toHaveProperty('fortuneScore');
  });

  it('regenerates placement evidence after the birth hour changes', () => {
    const first = ready();
    const changed = ready(calculateChart({ ...INPUT, hour: 2 }));
    expect(changed.summary.facts).not.toEqual(first.summary.facts);
    expect(changed.palaces).not.toEqual(first.palaces);
  });

  it('rejects unsupported rule profiles without producing a partial personal reading', () => {
    const input = chart();
    input.provenance.profile = 'unapproved-profile';
    expect(calculateInterpretation(input)).toMatchObject({
      status: 'unavailable',
      reason: 'unsupported-profile',
    });
  });

  it.each([
    'missing-palace',
    'duplicate-name',
    'duplicate-branch',
    'mismatched-branch',
    'no-body',
    'two-bodies',
    'unknown-major',
    'duplicate-major',
  ])('rejects malformed chart: %s', (kind) => {
    const input = chart();
    if (kind === 'missing-palace') input.palaces.pop();
    if (kind === 'duplicate-name') input.palaces[1].name = input.palaces[0].name;
    if (kind === 'duplicate-branch') input.palaces[1].branchIndex = input.palaces[0].branchIndex;
    if (kind === 'mismatched-branch') input.palaces[0].branch = 'Không có địa chi này';
    if (kind === 'no-body') input.palaces.forEach((palace) => (palace.isBodyPalace = false));
    if (kind === 'two-bodies')
      input.palaces.forEach((palace, index) => (palace.isBodyPalace = index < 2));
    const stars = input.palaces
      .flatMap((palace) => palace.stars)
      .filter((star) => star.group === 'major');
    if (kind === 'unknown-major') stars[0].name = 'Sao không có căn cứ';
    if (kind === 'duplicate-major') stars[0].name = stars[1].name;
    expect(calculateInterpretation(input)).toMatchObject({
      status: 'unavailable',
      reason: 'invalid-chart',
    });
  });

  it('fails closed when the requested major-star catalogue is incomplete', () => {
    const incomplete = { ...STAR_CATALOG };
    delete incomplete['Tử Vi'];
    expect(calculateInterpretation(chart(), incomplete)).toMatchObject({
      status: 'unavailable',
      reason: 'incomplete-catalog',
    });
  });

  it('resolves every emitted source ID and distinguishes structural/editorial references', () => {
    const report = ready();
    const availableIds = new Set(INTERPRETATION_SOURCES.map((source) => source.id));
    expect(report.sourceIds).toEqual(
      expect.arrayContaining(['structure-reference', 'editorial-palace-context']),
    );
    const referenced = [
      ...report.sourceIds,
      ...report.palaces.flatMap((palace) => [
        ...palace.sourceIds,
        ...palace.directStars.flatMap((star) => star.sourceIds),
        ...palace.relatedPalaces.flatMap((related) =>
          related.stars.flatMap((star) => star.sourceIds),
        ),
      ]),
    ];
    expect(referenced.length).toBeGreaterThan(0);
    expect(referenced.every((id) => availableIds.has(id))).toBe(true);
  });

  it('rejects a catalogue with fabricated/unresolvable source IDs', () => {
    const invalid = {
      ...STAR_CATALOG,
      'Tử Vi': { ...STAR_CATALOG['Tử Vi'], sourceIds: ['nonexistent-book'] },
    };
    expect(calculateInterpretation(chart(), invalid)).toMatchObject({
      status: 'unavailable',
      reason: 'incomplete-catalog',
    });
  });

  it('flags unknown auxiliary stars as uninterpreted instead of inventing their meaning', () => {
    const input = chart();
    input.palaces[0].stars.push({
      name: 'Sao chưa có trong kho tham khảo',
      group: 'auxiliary',
      brightness: '',
      transformation: '',
    });
    const report = ready(input);
    const palace = report.palaces.find((item) => item.name === input.palaces[0].name)!;
    expect(palace.uninterpretedStars).toContain('Sao chưa có trong kho tham khảo');
    expect(palace.directStars.some((star) => star.name === 'Sao chưa có trong kho tham khảo')).toBe(
      false,
    );
  });

  it.each([
    'invalid-cuc',
    'invalid-element',
    'invalid-solar',
    'mismatched-lunar',
    'mismatched-effective-lunar',
  ])('rejects incoherent calculation evidence: %s', (kind) => {
    const input = chart();
    if (kind === 'invalid-cuc') input.cuc = 'Cục tự bịa';
    if (kind === 'invalid-element') input.napAm.element = 'Nguyên tố không hợp lệ';
    if (kind === 'invalid-solar') input.solar.day = 32;
    if (kind === 'mismatched-lunar') input.lunar.day = 2;
    if (kind === 'mismatched-effective-lunar') input.effectiveLunar.day = 2;
    expect(calculateInterpretation(input)).toMatchObject({
      status: 'unavailable',
      reason: 'invalid-chart',
    });
  });

  it('accepts coherent late Tý next-day evidence across the lunar-year boundary', () => {
    const input = calculateChart({
      ...INPUT,
      calendar: 'solar',
      date: { year: 2024, month: 2, day: 9 },
      hour: 23,
      ziPolicy: 'next_day_at_23',
    });
    expect(ready(input).status).toBe('ready');
  });

  it.each(['split_at_15', 'same_month'] as const)(
    'retains explicit source/engine uncertainty for leap policy %s',
    (leapPolicy) => {
      const input = calculateChart({
        ...INPUT,
        date: { year: 2023, month: 2, day: 16, isLeapMonth: true },
        leapPolicy,
      });
      const report = ready(input);
      expect(report.warnings.join(' ')).toContain('Ngày sinh dùng tháng nhuận');
      expect(report.warnings.join(' ')).toContain('không xác nhận cách an tháng nhuận');
      expect(report.reviewStatus).toBe('reference-unvalidated');
    },
  );

  it('does not imply auxiliary stars, dignities, combinations or annual forecasts were interpreted', () => {
    const input = chart();
    const report = ready(input);
    for (const palace of report.palaces) {
      const original = input.palaces.find((item) => item.name === palace.name)!;
      expect(palace.uninterpretedStars).toEqual(
        original.stars.filter((star) => star.group !== 'major').map((star) => star.name),
      );
    }
    expect(report.warnings.join(' ')).toContain('Chưa luận phụ tinh');
    expect(report.warnings.join(' ')).toContain('đại hạn hay lưu niên');
  });
});
