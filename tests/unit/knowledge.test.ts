import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import type { ChartResult, ChartStar } from '@/domain/astrology/types';
import { calculateInterpretation } from '@/domain/interpretation/calculate';
import { INTERPRETATION_SOURCES, STAR_CATALOG } from '@/domain/interpretation/catalog';
import {
  AUXILIARY_GROUPS,
  canonicalStarName,
  fourPalaces,
  readContextualGroups,
  readMenhThan,
} from '@/domain/interpretation/context';
import {
  KNOWLEDGE_PASSAGES,
  KNOWLEDGE_PROFILE,
  KNOWLEDGE_RULES,
  resolvePassage,
  resolveRule,
  STAR_PASSAGE_IDS,
} from '@/domain/interpretation/knowledge';

// Constructed chart edits below test matching only, never star-placement accuracy.
function base(): ChartResult {
  return calculateChart({
    calendar: 'lunar',
    date: { year: 1984, month: 1, day: 1, isLeapMonth: false },
    gender: 'male',
    hour: 0,
    minute: 30,
    leapPolicy: 'split_at_15',
    ziPolicy: 'next_day_at_23',
  });
}
function clean(): ChartResult {
  const chart = base();
  for (const palace of chart.palaces)
    palace.stars = palace.stars.filter((s) => s.group === 'major');
  return chart;
}
function minor(name: string): ChartStar {
  return { name, group: 'minor', brightness: 'Đắc', transformation: '' };
}

describe('versioned knowledge traceability', () => {
  it('resolves every rule to nonempty exact passages and a registered source', () => {
    expect(new Set(KNOWLEDGE_RULES.map((r) => r.id)).size).toBe(KNOWLEDGE_RULES.length);
    expect(new Set(KNOWLEDGE_PASSAGES.map((p) => p.id)).size).toBe(KNOWLEDGE_PASSAGES.length);
    for (const rule of KNOWLEDGE_RULES) {
      expect(rule.passageIds.length).toBeGreaterThan(0);
      expect(rule.interpretation.length).toBeGreaterThan(0);
      expect(rule.limits.length).toBeGreaterThan(0);
      for (const id of rule.passageIds) {
        const passage = resolvePassage(id);
        expect(passage.excerpt.length).toBeGreaterThan(0);
        expect(passage.heading.length).toBeGreaterThan(0);
        const source = INTERPRETATION_SOURCES.find((s) => s.id === passage.sourceId)!;
        expect(source.url).toMatch(/oldid=\d+/u);
      }
    }
    for (const name of Object.keys(STAR_CATALOG))
      expect(resolvePassage(STAR_PASSAGE_IDS[name]).sourceId).toBe('classical-stars-vol1');
  });
  it('rejects unresolvable rule and passage IDs rather than substituting sources', () => {
    expect(() => resolveRule('made-up')).toThrow();
    expect(() => resolvePassage('made-up')).toThrow();
  });
  it('separates knowledge version from chart profile and keeps disagreements explicit', () => {
    const chart = base();
    const report = calculateInterpretation(chart);
    expect(report.status).toBe('ready');
    if (report.status !== 'ready') throw new Error(report.message);
    expect(report.knowledgeProfile).toBe(KNOWLEDGE_PROFILE.id);
    expect(report.profile).not.toBe(report.knowledgeProfile);
    expect(KNOWLEDGE_PROFILE.school).toContain('Nam phái');
    expect(resolveRule('leap-policy-conflict').status).toBe('disputed');
    expect(resolveRule('formations-gate').status).toBe('deferred');
  });
  it('emits only active editorial contextual rules with why, facts and passages', () => {
    const report = calculateInterpretation(base());
    if (report.status !== 'ready') throw new Error(report.message);
    const insights = [...report.summary.insights, ...report.palaces.flatMap((p) => p.insights)];
    for (const insight of insights) {
      expect(resolveRule(insight.ruleId).status).toBe('editorial');
      expect(insight.why.length).toBeGreaterThan(20);
      expect(insight.evidence.length).toBeGreaterThan(1);
      expect(insight.passageIds.length).toBeGreaterThan(0);
      expect(insight.passageIds.every((id) => Boolean(resolvePassage(id)))).toBe(true);
    }
    expect(JSON.stringify(report)).not.toMatch(/\d+\s*%/u);
    expect(
      insights.some((i) => i.ruleId === 'formations-gate' || i.ruleId === 'leap-policy-conflict'),
    ).toBe(false);
  });
});

describe('context matching, not chart-oracle generation', () => {
  it.each(AUXILIARY_GROUPS.slice(0, 2))(
    'requires both members of $ruleId and keeps original locations',
    (group) => {
      const chart = clean();
      const origin = chart.palaces.find((p) => p.name === 'Mệnh')!;
      const scope = fourPalaces(origin, chart.palaces);
      scope[0].stars.push(minor(group.names[0]));
      expect(
        readContextualGroups(origin, chart.palaces).some((i) => i.ruleId === group.ruleId),
      ).toBe(false);
      scope[1].stars.push(minor(group.names[1]));
      const matched = readContextualGroups(origin, chart.palaces).find(
        (i) => i.ruleId === group.ruleId,
      )!;
      expect(matched).toBeDefined();
      expect(matched.evidence[1].relation).toBe('trine');
      expect(matched.evidence[1].stars.some((s) => s.name === group.names[1])).toBe(true);
      expect(matched.evidence[0].stars.some((s) => s.name === group.names[1])).toBe(false);
      scope[1].stars = scope[1].stars.filter((s) => s.name !== group.names[1]);
      const outside = chart.palaces.find((p) => !scope.includes(p))!;
      outside.stars.push(minor(group.names[1]));
      expect(
        readContextualGroups(origin, chart.palaces).some((i) => i.ruleId === group.ruleId),
      ).toBe(false);
    },
  );
  it('recognizes Tả Phù as a spelling alias without changing engine evidence', () => {
    const chart = clean();
    const origin = chart.palaces[0];
    origin.stars.push(minor('Tả Phù'), minor('Hữu Bật'));
    const reading = readContextualGroups(origin, chart.palaces).find(
      (i) => i.ruleId === 'pair-support',
    )!;
    expect(reading.evidence[0].stars.some((s) => s.name === 'Tả Phù')).toBe(true);
    expect(canonicalStarName('Tả Phù')).toBe('Tả Phụ');
    expect(canonicalStarName('Văn Xương(M)')).toBe('Văn Xương(M)');
  });
  it('suppresses duplicate members and rejects duplicate recognized auxiliary stars', () => {
    const chart = clean();
    const origin = chart.palaces[0];
    origin.stars.push(minor('Tả Phù'), minor('Tả Phụ'), minor('Hữu Bật'));
    expect(
      readContextualGroups(origin, chart.palaces).some((i) => i.ruleId === 'pair-support'),
    ).toBe(false);
    expect(calculateInterpretation(chart)).toMatchObject({
      status: 'unavailable',
      reason: 'invalid-chart',
    });
  });
  it('does not emit a pair synthesis without any principal context', () => {
    const chart = clean();
    const origin = chart.palaces[0];
    for (const palace of fourPalaces(origin, chart.palaces)) palace.stars = [];
    origin.stars.push(minor('Văn Xương'), minor('Văn Khúc'));
    expect(readContextualGroups(origin, chart.palaces).map((i) => i.ruleId)).toEqual([
      'four-directions-context',
    ]);
  });
  it('defers Khôi–Việt even with the literal Mệnh/Thân condition until placement is reconciled', () => {
    const chart = clean();
    const menh = chart.palaces.find((p) => p.name === 'Mệnh')!;
    const scope = fourPalaces(menh, chart.palaces);
    for (const p of chart.palaces) p.isBodyPalace = false;
    scope[1].isBodyPalace = true;
    menh.stars.push(minor('Thiên Khôi'));
    scope[1].stars.push(minor('Thiên Việt'));
    expect(
      readContextualGroups(menh, chart.palaces).some((i) => i.ruleId === 'pair-assistance'),
    ).toBe(false);
    scope[1].isBodyPalace = false;
    scope[2].isBodyPalace = true;
    expect(
      readContextualGroups(menh, chart.palaces).some((i) => i.ruleId === 'pair-assistance'),
    ).toBe(false);
    expect(
      readContextualGroups(scope[1], chart.palaces).some((i) => i.ruleId === 'pair-assistance'),
    ).toBe(false);
  });
  it('requires Tử Vi actually tọa thủ with the full support pair', () => {
    const chart = clean();
    const ziwei = chart.palaces.find((p) => p.stars.some((s) => s.name === 'Tử Vi'))!;
    const scope = fourPalaces(ziwei, chart.palaces);
    scope[1].stars.push(minor('Tả Phụ'));
    scope[3].stars.push(minor('Hữu Bật'));
    expect(
      readContextualGroups(ziwei, chart.palaces).some((i) => i.ruleId === 'ziwei-support-context'),
    ).toBe(true);
    expect(
      readContextualGroups(scope[1], chart.palaces).some(
        (i) => i.ruleId === 'ziwei-support-context',
      ),
    ).toBe(false);
    scope[3].stars = scope[3].stars.filter((s) => s.name !== 'Hữu Bật');
    expect(
      readContextualGroups(ziwei, chart.palaces).some((i) => i.ruleId === 'ziwei-support-context'),
    ).toBe(false);
  });
  it('distinguishes same-palace Mệnh–Thân from two contexts without relocating stars', () => {
    const chart = clean();
    const menh = chart.palaces.find((p) => p.name === 'Mệnh')!;
    const same = readMenhThan(menh, menh);
    expect(same.text).toContain('cùng tại');
    const other = chart.palaces.find((p) => p.branchIndex !== menh.branchIndex)!;
    expect(readMenhThan(menh, other).text).toContain('không gộp');
    expect(readMenhThan(menh, other).evidence[1].branch).toBe(other.branch);
  });
});
