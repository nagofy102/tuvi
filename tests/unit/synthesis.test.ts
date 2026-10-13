import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import type { ChartPalace, ChartStar } from '@/domain/astrology/types';
import { buildReadingClaims, mergeContextualInsights } from '@/domain/interpretation/claims';
import { fourPalaces, readContextualGroups } from '@/domain/interpretation/context';
import { resolvePassage, resolveRule } from '@/domain/interpretation/knowledge';
import { readThemes } from '@/domain/interpretation/themes';

// Synthetic mutations exercise editorial dispatch only, not independent astrology truth.
function palaces(): ChartPalace[] {
  return calculateChart({
    calendar: 'lunar',
    date: { year: 1984, month: 1, day: 1, isLeapMonth: false },
    gender: 'male',
    hour: 0,
    minute: 30,
    leapPolicy: 'same_month',
    ziPolicy: 'civil_midnight',
  }).palaces.map((palace) => ({
    ...palace,
    stars: palace.stars.filter((star) => star.group === 'major'),
  }));
}
const minor = (name: string): ChartStar => ({
  name,
  group: 'minor',
  brightness: '',
  transformation: '',
});

describe('source-bounded conditional synthesis', () => {
  it('gates Tử Vi context independently without suppressing an admitted supporting pair', () => {
    const input = palaces();
    const menh = input.find((palace) => palace.name === 'Mệnh')!;
    menh.stars.push(minor('Tả Phù'), minor('Hữu Bật'));
    if (!menh.stars.some((star) => star.name === 'Tử Vi'))
      menh.stars.push({ ...minor('Tử Vi'), group: 'major' });
    const rule = resolveRule('ziwei-support-context');
    const previous = rule.status;
    try {
      rule.status = 'deferred';
      const claims = buildReadingClaims(input, ['Mệnh']);
      expect(claims[0].state).toBe('supported');
      expect(claims[2].state).toBe('insufficient');
      expect(readContextualGroups(menh, input).map((insight) => insight.ruleId)).not.toContain(
        'ziwei-support-context',
      );
    } finally {
      rule.status = previous;
    }
  });

  it('preserves the input and every origin-relative geometric relation', () => {
    const input = palaces();
    const before = structuredClone(input);
    const claims = buildReadingClaims(input, ['Mệnh', 'Quan Lộc', 'Nô Bộc']);
    for (const claim of claims) {
      for (const proof of claim.evidence) {
        const origin = input.find((palace) => palace.name === proof.scopePalace)!;
        const actual = input.find((palace) => palace.name === proof.palace)!;
        const distance = (actual.branchIndex - origin.branchIndex + 12) % 12;
        expect([0, 4, 8, 6]).toContain(distance);
        expect(proof.relation).toBe(
          distance === 0 ? 'direct' : distance === 6 ? 'opposition' : 'trine',
        );
        expect(proof.branch).toBe(actual.branch);
        proof.stars.forEach((star) =>
          expect(actual.stars).toEqual(expect.arrayContaining([expect.objectContaining(star)])),
        );
      }
    }
    expect(input).toEqual(before);
  });

  it.each(['deferred', 'disputed', 'text-reviewed'] as const)(
    'rejects inactive %s rules even when all placements match',
    (status) => {
      const input = palaces();
      const menh = input.find((palace) => palace.name === 'Mệnh')!;
      menh.stars.push(minor('Tả Phù'), minor('Hữu Bật'));
      if (!menh.stars.some((star) => star.name === 'Tử Vi'))
        menh.stars.push({ ...minor('Tử Vi'), group: 'major' });
      const rule = resolveRule('pair-support');
      const previous = rule.status;
      try {
        rule.status = status;
        const claims = buildReadingClaims(input, ['Mệnh']);
        expect(claims[0].state).toBe('insufficient');
        expect(claims[2].state).toBe('insufficient');
        expect(claims[0].conditions.find((condition) => condition.id === 'rule-active')?.met).toBe(
          false,
        );
        expect(
          readContextualGroups(menh, input).some(
            (insight) => insight.ruleId === 'ziwei-support-context',
          ),
        ).toBe(false);
      } finally {
        rule.status = previous;
      }
    },
  );

  it('requires every prerequisite within one origin scope, never a union of unrelated scopes', () => {
    const input = palaces();
    input.forEach((palace) => {
      palace.stars = [];
    });
    const menh = input.find((palace) => palace.name === 'Mệnh')!;
    const outside = input.find((palace) => !fourPalaces(menh, input).includes(palace))!;
    menh.stars.push(minor('Tả Phù'), { ...minor('Tử Vi'), group: 'major' });
    outside.stars.push(minor('Hữu Bật'));
    const claim = buildReadingClaims(input, [menh.name, outside.name])[0];
    expect(claim.state).toBe('insufficient');
    expect(claim.missingPrerequisites.length).toBeGreaterThan(0);
    expect(claim.text).toContain('không suy ra một điểm yếu');
    expect(claim.selfCheck).toBe('');
  });

  it('reports missing principal context and duplicate members as unmet conditions', () => {
    const input = palaces();
    input.forEach((palace) => {
      palace.stars = [];
    });
    const menh = input.find((palace) => palace.name === 'Mệnh')!;
    menh.stars.push(minor('Tả Phù'), minor('Hữu Bật'));
    expect(buildReadingClaims(input, ['Mệnh'])[0].missingPrerequisites.join(' ')).toContain(
      'chính tinh',
    );
    menh.stars.push({ ...minor('Tử Vi'), group: 'major' }, minor('Tả Phụ'));
    expect(
      buildReadingClaims(input, ['Mệnh'])[0].conditions.find(
        (condition) => condition.id === 'member-Tả Phụ',
      )?.met,
    ).toBe(false);
  });

  it('supports only complete gates and keeps raw alias evidence and source links', () => {
    const input = palaces();
    const menh = input.find((palace) => palace.name === 'Mệnh')!;
    const scope = fourPalaces(menh, input);
    menh.stars.push(minor('Tả Phù'));
    scope[1].stars.push(minor('Hữu Bật'));
    const claim = buildReadingClaims(input, ['Mệnh'])[0];
    expect(claim.state).toBe('supported');
    expect(claim.conditions.every((condition) => condition.met)).toBe(true);
    expect(claim.missingPrerequisites).toEqual([]);
    expect(
      claim.evidence.flatMap((proof) => proof.stars).some((star) => star.name === 'Tả Phù'),
    ).toBe(true);
    claim.passageIds.forEach((id) => expect(resolvePassage(id)).toBeDefined());
    expect(claim.adjustment).toMatch(/^Nếu /u);
  });

  it('merges duplicate rule scopes without discarding any originating palace or relation', () => {
    const input = palaces();
    input.find((palace) => palace.name === 'Mệnh')!.stars.push(minor('Tả Phù'), minor('Hữu Bật'));
    const relevant = ['Mệnh', 'Quan Lộc'].flatMap((name) =>
      readContextualGroups(
        input.find((palace) => palace.name === name)!,
        input,
      ).filter((item) => item.ruleId === 'pair-support'),
    );
    expect(relevant).toHaveLength(2);
    const merged = mergeContextualInsights(relevant)[0];
    expect(new Set(merged.evidence.map((proof) => proof.scopePalace))).toEqual(
      new Set(['Mệnh', 'Quan Lộc']),
    );
    for (const insight of relevant)
      for (const proof of insight.evidence) expect(merged.evidence).toContainEqual(proof);
    expect(mergeContextualInsights([...relevant, ...relevant])).toEqual([merged]);
  });

  it('combines both active group actions and never labels complementary groups mixed', () => {
    const input = palaces();
    const menh = input.find((palace) => palace.name === 'Mệnh')!;
    menh.stars.push(minor('Tả Phù'), minor('Hữu Bật'), minor('Văn Xương'), minor('Văn Khúc'));
    const theme = readThemes(input)[0];
    expect(theme.selfCheck).toContain('ai nhận từng phần');
    expect(theme.selfCheck).toContain('nguồn kiểm tra');
    expect(theme.adjustment).toContain('người phụ trách');
    expect(theme.adjustment).toContain('dữ kiện đã kiểm tra');
    expect(theme.claims.some((claim) => claim.state === 'mixed')).toBe(false);
    expect(theme.claims.map((claim) => claim.ruleId)).not.toContain('pair-assistance');
  });

  it('does not activate single-member, suffix, deferred or brightness-only interpretations', () => {
    const input = palaces();
    const menh = input.find((palace) => palace.name === 'Mệnh')!;
    menh.stars.push(
      minor('Tả Phù'),
      minor('Hữu Bật (Lưu niên)'),
      minor('Thiên Khôi'),
      minor('Thiên Việt'),
    );
    const claims = buildReadingClaims(input, ['Mệnh']);
    expect(claims[0].state).toBe('insufficient');
    expect(claims.map((claim) => claim.ruleId)).not.toContain('pair-assistance');
    const before = claims.map(({ state }) => state);
    menh.stars.forEach((star) => {
      star.brightness = 'Hãm';
      star.transformation = 'Hóa Kỵ';
    });
    expect(buildReadingClaims(input, ['Mệnh']).map(({ state }) => state)).toEqual(before);
  });
});
