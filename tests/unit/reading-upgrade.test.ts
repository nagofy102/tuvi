import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import type { ChartResult, ChartStar } from '@/domain/astrology/types';
import { calculateInterpretation } from '@/domain/interpretation/calculate';
import { INTERPRETATION_SOURCES, STAR_CATALOG } from '@/domain/interpretation/catalog';
import { fourPalaces } from '@/domain/interpretation/context';
import { resolvePassage, resolveRule } from '@/domain/interpretation/knowledge';
import { readThemes, sortThemes } from '@/domain/interpretation/themes';
import type { InterpretationReport } from '@/domain/interpretation/types';

function chart(hour = 0): ChartResult {
  return calculateChart({
    calendar: 'lunar',
    date: { year: 1984, month: 1, day: 1, isLeapMonth: false },
    gender: 'male',
    hour,
    minute: 30,
    leapPolicy: 'same_month',
    ziPolicy: 'civil_midnight',
  });
}

function report(input = chart()): InterpretationReport {
  const value = calculateInterpretation(input);
  if (value.status !== 'ready') throw new Error(value.message);
  return value;
}

function minor(name: string): ChartStar {
  return { name, group: 'minor', brightness: '', transformation: '' };
}

describe('thematic behavioral reading (not personality or prediction validation)', () => {
  it('starts from three cross-palace themes with actual provenance', () => {
    const input = chart();
    const value = report(input);
    expect(value.themes).toHaveLength(3);
    expect(new Set(value.themes.map((theme) => theme.concern)).size).toBe(3);
    for (const theme of value.themes) {
      expect(theme.palaceNames.length).toBeGreaterThanOrEqual(2);
      expect(theme.paragraphs.length).toBeGreaterThanOrEqual(2);
      expect(theme.selfCheck.length).toBeGreaterThan(30);
      expect(theme.adjustment).toMatch(/^Nếu /u);
      for (const insight of theme.insights) {
        expect(resolveRule(insight.ruleId).status).toBe('editorial');
        expect(insight.passageIds.every((id) => Boolean(resolvePassage(id)))).toBe(true);
        expect(insight.evidence.length).toBeGreaterThanOrEqual(2);
        for (const evidence of insight.evidence) {
          const palace = input.palaces.find((item) => item.name === evidence.palace)!;
          expect(evidence.branch).toBe(palace.branch);
          for (const star of evidence.stars)
            expect(palace.stars.some((actual) => actual.name === star.name)).toBe(true);
        }
      }
    }
  });

  it('changes only theme order when a concern is selected', () => {
    const themes = report().themes;
    const before = structuredClone(themes);
    for (const concern of ['career', 'finance', 'relationship'] as const) {
      const ordered = sortThemes(themes, concern);
      expect(ordered[0].concern).toBe(concern);
      expect(ordered).toEqual(expect.arrayContaining(themes));
    }
    expect(themes).toEqual(before);
  });

  it('conditions narrative, self-check and adjustment on complete groups only', () => {
    // Constructed edits validate content dispatch, not placement accuracy.
    const input = chart();
    for (const palace of input.palaces)
      palace.stars = palace.stars.filter((star) => star.group === 'major');
    const baseline = readThemes(input.palaces)[0];
    const menh = input.palaces.find((palace) => palace.name === 'Mệnh')!;
    const scope = fourPalaces(menh, input.palaces);
    scope[0].stars.push(minor('Tả Phù'));
    expect(readThemes(input.palaces)[0]).toEqual(baseline);
    scope[1].stars.push(minor('Hữu Bật'));
    const matched = readThemes(input.palaces)[0];
    expect(matched.insights.some((insight) => insight.ruleId === 'pair-support')).toBe(true);
    expect(matched.paragraphs).not.toEqual(baseline.paragraphs);
    expect(matched.selfCheck).not.toBe(baseline.selfCheck);
    expect(matched.adjustment).not.toBe(baseline.adjustment);
    expect(matched.adjustment).toContain('người phụ trách');
    scope[1].stars = scope[1].stars.filter((star) => star.name !== 'Hữu Bật');
    expect(readThemes(input.palaces)[0]).toEqual(baseline);
  });

  it('uses distinct literacy exercises when only that complete group is present', () => {
    const input = chart();
    for (const palace of input.palaces)
      palace.stars = palace.stars.filter((star) => star.group === 'major');
    const menh = input.palaces.find((palace) => palace.name === 'Mệnh')!;
    menh.stars.push(minor('Văn Xương'), minor('Văn Khúc'));
    const theme = readThemes(input.palaces)[0];
    expect(theme.insights.some((insight) => insight.ruleId === 'pair-literacy')).toBe(true);
    expect(theme.selfCheck).toContain('nguồn đầu tiên');
    expect(theme.adjustment).toContain('chốt ba dòng');
  });

  it('changes source-scoped narratives for actual different birth-hour charts', () => {
    const themes = [0, 2, 6, 10, 14, 18, 22].map((hour) => report(chart(hour)).themes);
    const texts = themes.map((items) =>
      JSON.stringify(
        items.map(({ paragraphs, selfCheck, adjustment }) => ({
          paragraphs,
          selfCheck,
          adjustment,
        })),
      ),
    );
    expect(new Set(texts).size).toBeGreaterThan(1);
  });

  it('keeps Mệnh–Thân synthesis relevant instead of repeating in every theme', () => {
    const input = chart(2);
    const body = input.palaces.find((palace) => palace.isBodyPalace)!;
    for (const theme of report(input).themes) {
      const expected = theme.concern === 'career' || theme.palaceNames.includes(body.name);
      expect(theme.insights.some((insight) => insight.ruleId === 'menh-than-context')).toBe(
        expected,
      );
    }
  });

  it('keeps at most one star-name sentence in each palace overview', () => {
    for (const palace of report().palaces) {
      const sentences = palace.overview.split(/[.!?]+/u);
      expect(
        sentences.filter((sentence) =>
          Object.keys(STAR_CATALOG).some((name) => sentence.includes(name)),
        ).length,
      ).toBeLessThanOrEqual(1);
      expect(palace.reflection).toMatch(/^Nếu /u);
    }
  });

  it('uses gender-neutral partner language and excludes banned claims from reading bodies', () => {
    const value = report();
    const partner = value.palaces.find((palace) => palace.name === 'Phu Thê')!;
    expect(partner.overview).toContain('người bạn đời');
    const texts = [
      ...value.themes.flatMap((theme) => [...theme.paragraphs, theme.selfCheck, theme.adjustment]),
      ...value.palaces.flatMap((palace) => [
        palace.overview,
        palace.reflection,
        ...palace.insights.map((insight) => insight.text),
        ...palace.directStars.flatMap((star) => [star.theme, star.reflection]),
      ]),
    ].join(' ');
    expect(texts).not.toMatch(
      /số khổ|tuổi thọ|bệnh nặng|chết người|tù tội|hình ngục|tửu sắc|cờ bạc|\d+(?:[.,]\d+)?\s*%/iu,
    );
    expect(texts).not.toMatch(/chắc chắn|bạn hay|bạn thường|Vũ Khúc vượng nên/iu);
    expect(texts).not.toMatch(/có thể|tránh bệnh|tai họa/iu);
  });

  it('keeps source revisions in provenance URLs, not user-facing source descriptions', () => {
    for (const source of INTERPRETATION_SOURCES)
      expect(source.description).not.toMatch(/revision|\bengine\b|7913704|1963110/iu);
    expect(
      INTERPRETATION_SOURCES.filter((source) => source.url?.includes('oldid=')).length,
    ).toBeGreaterThanOrEqual(3);
  });
});
