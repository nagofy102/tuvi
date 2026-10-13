import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import { presentContext, vietnamToday } from '@/domain/interpretation/present';

const chart = () =>
  calculateChart({
    calendar: 'solar',
    date: { year: 1990, month: 5, day: 17 },
    gender: 'male',
    hour: 9,
    minute: 30,
    leapPolicy: 'split_at_15',
    ziPolicy: 'civil_midnight',
  });

describe('present anchoring is a calendar/range lookup, not a forecast', () => {
  it('uses lunar year before and after Tet, not Gregorian birthday', () => {
    const value = chart();
    expect(presentContext(value, { year: 2026, month: 1, day: 1 }).age).toBe(36);
    expect(presentContext(value, { year: 2026, month: 2, day: 16 }).age).toBe(36);
    expect(presentContext(value, { year: 2026, month: 2, day: 17 }).age).toBe(37);
  });
  it('includes both decade boundaries and rejects ambiguous overlapping ranges', () => {
    const value = chart();
    for (const palace of value.palaces) palace.decade = [100, 109];
    value.palaces[0].decade = [36, 37];
    expect(presentContext(value, { year: 2026, month: 1, day: 1 }).decade?.palace).toBe(
      value.palaces[0].name,
    );
    expect(presentContext(value, { year: 2026, month: 2, day: 17 }).decade?.palace).toBe(
      value.palaces[0].name,
    );
    value.palaces[1].decade = [36, 37];
    expect(presentContext(value, { year: 2026, month: 2, day: 17 }).decade).toBeNull();
  });
  it('does not fabricate a range or a negative age for future births', () => {
    const value = chart();
    expect(presentContext(value, { year: 1989, month: 1, day: 1 })).toMatchObject({
      age: null,
      decade: null,
    });
    expect(presentContext(value, { year: 1990, month: 5, day: 17 }).decade).toBeNull();
    for (const palace of value.palaces) palace.decade = [1, 10];
    expect(presentContext(value, { year: 2026, month: 10, day: 13 }).decade).toBeNull();
  });
  it('gets the civil date in Vietnam independently of machine timezone', () => {
    expect(vietnamToday(new Date('2026-02-16T17:00:00Z'))).toEqual({
      year: 2026,
      month: 2,
      day: 17,
    });
  });
});
