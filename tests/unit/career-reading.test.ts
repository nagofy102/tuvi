import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import type { ChartPalace, ChartStar } from '@/domain/astrology/types';
import { KNOWLEDGE_PASSAGES, resolvePassage, resolveRule } from '@/domain/interpretation/knowledge';
import { readThemes } from '@/domain/interpretation/themes';

// These synthetic layouts test editorial selection and provenance, not an astrology oracle.
function layout(): ChartPalace[] {
  const result = calculateChart({
    calendar: 'lunar',
    date: { year: 1984, month: 1, day: 1, isLeapMonth: false },
    gender: 'male',
    hour: 0,
    minute: 0,
    leapPolicy: 'split_at_15',
    ziPolicy: 'next_day_at_23',
  }).palaces;
  result.forEach((palace) => {
    palace.stars = [];
  });
  return result;
}
function star(name: string, group: ChartStar['group'] = 'major'): ChartStar {
  return { name, group, brightness: '', transformation: '' };
}
function place(palaces: ChartPalace[], name: string, stars: ChartStar[]) {
  palaces.find((palace) => palace.name === name)!.stars = stars;
}
function career(palaces: ChartPalace[]) {
  return readThemes(palaces).find((theme) => theme.concern === 'career')!;
}
function sample(): ChartPalace[] {
  const result = layout();
  place(result, 'Quan Lộc', [star('Thái Dương'), star('Cự Môn')]);
  place(result, 'Nô Bộc', [star('Thiên Tướng')]);
  return result;
}

describe('career-first source-bounded synthesis (editorial, not predictive validation)', () => {
  it('connects distinct principal perspectives before any optional exercise', () => {
    const input = sample();
    const before = structuredClone(input);
    const theme = career(input);
    expect(theme.careerNarrative?.state).toBe('direct-career');
    expect(theme.paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(theme.paragraphs).not.toContain(theme.adjustment);
    expect(theme.paragraphs.join(' ')).not.toMatch(
      /chốt ba dòng|bỏ qua bài tập|người giao việc|Tự kiểm chứng:/u,
    );
    expect(theme.careerNarrative?.passageIds).toEqual(
      expect.arrayContaining([
        'principal-3',
        'principal-10',
        'principal-11',
        'context-not-uniform',
        'layout-palaces',
      ]),
    );
    expect(input).toEqual(before);
    expect(theme.careerNarrative?.why).not.toMatch(/\.\.|\.\s*;/u);
  });

  it('uses the second reviewed cooperation principal instead of silently dropping it', () => {
    const input = sample();
    place(input, 'Nô Bộc', [star('Thiên Phủ'), star('Thái Âm')]);
    const first = career(input);
    place(input, 'Nô Bộc', [star('Thiên Phủ'), star('Thiên Lương')]);
    const second = career(input);
    expect(first.paragraphs).not.toEqual(second.paragraphs);
    expect(first.careerNarrative?.passageIds).toContain('principal-8');
    expect(second.careerNarrative?.passageIds).toContain('principal-12');
    expect(
      first.careerNarrative?.evidence
        .find((item) => item.palace === 'Nô Bộc')
        ?.stars.map((item) => item.name),
    ).toEqual(['Thiên Phủ', 'Thái Âm']);
    expect(
      second.careerNarrative?.evidence
        .find((item) => item.palace === 'Nô Bộc')
        ?.stars.map((item) => item.name),
    ).toEqual(['Thiên Phủ', 'Thiên Lương']);
  });

  it('does not repeat overlapping responsibility concepts in the headline or opening', () => {
    const input = sample();
    place(input, 'Quan Lộc', [star('Tử Vi'), star('Thiên Tướng')]);
    const theme = career(input);
    expect((theme.title.match(/trách nhiệm/gu) ?? []).length).toBeLessThanOrEqual(1);
    expect(theme.title).toContain('điều phối');
    expect(theme.title).toContain('phối hợp');
    expect((theme.paragraphs[0].match(/trách nhiệm/gu) ?? []).length).toBeLessThanOrEqual(1);
    expect(theme.careerNarrative?.passageIds).toEqual(
      expect.arrayContaining(['principal-1', 'principal-11']),
    );
    expect(
      theme.careerNarrative?.evidence
        .find((item) => item.palace === 'Quan Lộc')
        ?.stars.map((item) => item.name),
    ).toEqual(['Tử Vi', 'Thiên Tướng']);
  });

  it('changes the actual symbolic thesis for different principals with the same auxiliaries', () => {
    const first = sample();
    const second = sample();
    place(second, 'Quan Lộc', [star('Vũ Khúc'), star('Thiên Phủ')]);
    for (const input of [first, second])
      place(input, 'Mệnh', [star('Tả Phù', 'minor'), star('Hữu Bật', 'minor')]);
    const a = career(first);
    const b = career(second);
    expect(a.title).not.toBe(b.title);
    expect(a.paragraphs[0]).not.toBe(b.paragraphs[0]);
    expect(a.careerNarrative?.passageIds).toEqual(
      expect.arrayContaining(['principal-3', 'principal-10']),
    );
    expect(b.careerNarrative?.passageIds).toEqual(
      expect.arrayContaining(['principal-4', 'principal-7']),
    );
    // Removing names cannot erase the difference: the substantive theme changes.
    const removeNames = (value: string) =>
      value.replace(/Thái Dương|Cự Môn|Vũ Khúc|Thiên Phủ/gu, '');
    expect(removeNames(a.paragraphs.join(' '))).not.toBe(removeNames(b.paragraphs.join(' ')));
  });

  it('requires two different principal-bearing palaces, not two stars at one location', () => {
    const input = layout();
    place(input, 'Quan Lộc', [star('Thái Dương'), star('Cự Môn')]);
    expect(career(input).careerNarrative?.state).toBe('insufficient-context');
    place(input, 'Nô Bộc', [star('Thiên Tướng')]);
    expect(career(input).careerNarrative?.state).toBe('direct-career');
  });

  it('requires different reviewed symbols rather than counting duplicate symbols in two palaces', () => {
    const input = layout();
    place(input, 'Quan Lộc', [star('Thái Dương')]);
    place(input, 'Mệnh', [star('Thái Dương')]);
    expect(career(input).careerNarrative?.state).toBe('insufficient-context');
  });

  it('blocks synthesis when its own connecting rule loses a required source passage', () => {
    const input = sample();
    const rule = resolveRule('career-cross-palace');
    const original = rule.passageIds;
    try {
      rule.passageIds = [...original, 'unreviewed-career-passage'];
      const result = career(input);
      expect(result.careerNarrative?.state).toBe('insufficient-context');
      expect(result.paragraphs.join(' ')).not.toContain('Trục công việc của lá số đặt cạnh nhau');
      result.careerNarrative?.passageIds.forEach((id) => expect(resolvePassage(id)).toBeDefined());
    } finally {
      rule.passageIds = original;
    }
  });

  it('does not call a present principal absent when its symbolic source is unavailable', () => {
    const input = sample();
    const rule = resolveRule('symbol-3');
    const original = rule.passageIds;
    try {
      rule.passageIds = ['missing-principal-passage'];
      const result = career(input);
      expect(result.careerNarrative?.passageIds).not.toContain('principal-3');
      expect(result.careerNarrative?.why).not.toMatch(/Thái Dương →/u);
      expect(result.careerNarrative?.why).toMatch(/chưa|không.*dùng|nguồn/iu);
      place(input, 'Quan Lộc', [star('Thái Dương')]);
      place(input, 'Mệnh', [star('Thiên Cơ')]);
      const gated = career(input);
      expect(gated.careerNarrative?.why).not.toContain(
        'Quan Lộc tại Ngọ: không có chính tinh riêng',
      );
      expect(gated.paragraphs.join(' ')).not.toContain('Cung công việc không có chính tinh riêng');
    } finally {
      rule.passageIds = original;
    }
  });

  it('suppresses a component when its passage record is actually missing', () => {
    const input = sample();
    const passages = KNOWLEDGE_PASSAGES as (typeof KNOWLEDGE_PASSAGES)[number][];
    const index = passages.findIndex((passage) => passage.id === 'principal-3');
    const [original] = passages.splice(index, 1);
    try {
      const result = career(input);
      expect(result.careerNarrative?.passageIds).not.toContain('principal-3');
      expect(result.careerNarrative?.why).not.toContain('Thái Dương →');
    } finally {
      passages.splice(index, 0, original);
    }
  });

  it.each(['sourceId', 'excerpt', 'heading', 'reading'] as const)(
    'suppresses a principal whose passage has invalid %s instead of showing unsupported prose',
    (field) => {
      const input = sample();
      const passage = resolvePassage('principal-3');
      const original = passage[field];
      try {
        passage[field] = field === 'sourceId' ? 'unreviewed-source' : '';
        const result = career(input);
        expect(result.careerNarrative?.passageIds).not.toContain('principal-3');
        expect(result.careerNarrative?.why).not.toContain('Thái Dương →');
        expect(
          result.careerNarrative?.evidence.flatMap((item) => item.stars).map((item) => item.name),
        ).not.toContain('Thái Dương');
      } finally {
        passage[field] = original;
      }
    },
  );

  it('retains empty Mệnh and empty career scopes as limits, never adverse evidence or borrowed stars', () => {
    const input = sample();
    const first = career(input);
    expect(first.careerNarrative?.why).toContain('Mệnh');
    expect(first.careerNarrative?.evidence.find((item) => item.palace === 'Mệnh')?.stars).toEqual(
      [],
    );
    place(input, 'Quan Lộc', []);
    place(input, 'Mệnh', [star('Thiên Cơ')]);
    const second = career(input);
    expect(second.careerNarrative?.state).toBe('no-direct-career');
    expect(
      second.careerNarrative?.evidence.find((item) => item.palace === 'Quan Lộc')?.stars,
    ).toEqual([]);
    expect(second.careerNarrative?.why).toContain('Quan Lộc');
    expect(second.paragraphs.join(' ')).not.toMatch(
      /kém năng lực|thiếu khả năng|khó thành công|số khổ|thất bại/iu,
    );
  });

  it('records each used principal and body perspective in its actual palace', () => {
    const input = sample();
    input.forEach((palace) => {
      palace.isBodyPalace = palace.name === 'Tài Bạch';
    });
    place(input, 'Tài Bạch', [star('Thiên Phủ')]);
    const narrative = career(input).careerNarrative!;
    expect(
      narrative.evidence.some((item) => item.palace === 'Tài Bạch' && item.relation === 'body'),
    ).toBe(true);
    for (const evidence of narrative.evidence) {
      const source = input.find((palace) => palace.name === evidence.palace)!;
      expect(evidence.branch).toBe(source.branch);
      for (const actual of evidence.stars)
        expect(source.stars).toEqual(expect.arrayContaining([expect.objectContaining(actual)]));
    }
    narrative.passageIds.forEach((id) => expect(resolvePassage(id).sourceId).toBeTruthy());
  });

  it('changes the body explanation without forecasting later life or inventing occupational status', () => {
    const input = sample();
    input.forEach((palace) => {
      palace.isBodyPalace = palace.name === 'Mệnh';
    });
    const same = career(input);
    input.forEach((palace) => {
      palace.isBodyPalace = palace.name === 'Quan Lộc';
    });
    const atCareer = career(input);
    expect(same.careerNarrative?.why).not.toBe(atCareer.careerNarrative?.why);
    expect(atCareer.careerNarrative?.why).toContain('Quan Lộc');
    const copy = atCareer.paragraphs.join(' ');
    expect(copy).not.toMatch(
      /hậu vận|sau tuổi|công việc chi phối|chắc chắn|bạn hay|bạn thường|người giao việc|sếp|khách hàng|\d+(?:[.,]\d+)?\s*%/iu,
    );
  });

  it.each(['deferred', 'disputed', 'editorial'] as const)(
    'suppresses a principal interpretation when its symbol rule is %s',
    (status) => {
      const input = sample();
      const rule = resolveRule('symbol-3');
      const before = rule.status;
      try {
        rule.status = status;
        const result = career(input);
        expect(result.careerNarrative?.passageIds).not.toContain('principal-3');
        expect(
          result.careerNarrative?.evidence.flatMap((item) => item.stars).map((item) => item.name),
        ).not.toContain('Thái Dương');
      } finally {
        rule.status = before;
      }
    },
  );

  it('keeps auxiliaries secondary and does not turn their absence into an adverse conclusion', () => {
    const input = sample();
    const before = career(input);
    place(input, 'Mệnh', [
      star('Tả Phù', 'minor'),
      star('Hữu Bật', 'minor'),
      star('Văn Xương', 'minor'),
      star('Văn Khúc', 'minor'),
    ]);
    const after = career(input);
    expect(after.title).toBe(before.title);
    expect(after.paragraphs[0]).toBe(before.paragraphs[0]);
    expect(after.paragraphs).not.toEqual(before.paragraphs);
    expect(before.paragraphs.join(' ')).not.toMatch(
      /thiếu hỗ trợ|không có người giúp|kém giao tiếp|thiếu tài năng/iu,
    );
  });
});
