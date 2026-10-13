import { describe, expect, it } from 'vitest';
import {
  lunarToSolar,
  normalizeDate,
  parseDate,
  solarToLunar,
} from '@/domain/calendar/legacy-vietnamese';

// Independent civil-date fixtures: Vietnamese New Year / Vietnamese calendar references.
// https://en.wikipedia.org/wiki/Vietnamese_calendar (1968, 1985, 2007 differences)
// https://en.wikipedia.org/wiki/T%E1%BA%BFt (recent New Year dates)
const TET_DATES = [
  [1968, 1, 29],
  [1985, 1, 21],
  [2007, 2, 17],
  [2020, 1, 25],
  [2021, 2, 12],
  [2022, 2, 1],
  [2023, 1, 22],
  [2024, 2, 10],
  [2025, 1, 29],
  [2026, 2, 17],
  [2027, 2, 6],
] as const;

describe('Vietnamese calendar conversion', () => {
  it.each(TET_DATES)('matches independently recorded Tết %i-%i-%i', (year, month, day) => {
    expect(solarToLunar({ year, month, day })).toEqual({
      year,
      month: 1,
      day: 1,
      isLeapMonth: false,
    });
    expect(lunarToSolar({ year, month: 1, day: 1, isLeapMonth: false })).toEqual({
      year,
      month,
      day,
    });
  });
  it('distinguishes the 2023 leap second month from the regular second month', () => {
    expect(solarToLunar({ year: 2023, month: 3, day: 22 })).toEqual({
      year: 2023,
      month: 2,
      day: 1,
      isLeapMonth: true,
    });
    expect(lunarToSolar({ year: 2023, month: 2, day: 1, isLeapMonth: true })).toEqual({
      year: 2023,
      month: 3,
      day: 22,
    });
    expect(lunarToSolar({ year: 2023, month: 2, day: 1, isLeapMonth: false })).toEqual({
      year: 2023,
      month: 2,
      day: 20,
    });
  });
  it('keeps the prior lunar year before Tết', () => {
    expect(solarToLunar({ year: 2024, month: 2, day: 9 })).toEqual({
      year: 2023,
      month: 12,
      day: 30,
      isLeapMonth: false,
    });
  });
  it.each([
    { year: 2025, month: 2, day: 29 },
    { year: 1900, month: 2, day: 29 },
    { year: 2024, month: 13, day: 1 },
    { year: 2024, month: 4, day: 31 },
    { year: 2024, month: 2, day: 1.5 },
  ])('rejects impossible civil date %j', (date) => {
    expect(() => solarToLunar(date)).toThrow();
  });
  it('accepts Gregorian leap day 2000', () => {
    const input = { year: 2000, month: 2, day: 29 };
    expect(lunarToSolar(solarToLunar(input))).toEqual(input);
  });
  it('rejects leap flags in non-leap years instead of normalizing them', () => {
    expect(() => lunarToSolar({ year: 2024, month: 2, day: 1, isLeapMonth: true })).toThrow(
      /nhuận/,
    );
  });
  it('rejects day 30 in a 29-day lunar month', () => {
    expect(() => lunarToSolar({ year: 2024, month: 1, day: 30, isLeapMonth: false })).toThrow();
  });
  it('round-trips representative dates across the product range as an additional consistency check', () => {
    for (const year of [1901, 1920, 1950, 1968, 1985, 2007, 2023, 2050, 2098]) {
      for (let month = 1; month <= 12; month++) {
        const solar = { year, month, day: 17 };
        expect(lunarToSolar(solarToLunar(solar))).toEqual(solar);
      }
    }
  });
  it('rejects unsupported range and malformed date strings', () => {
    expect(() =>
      normalizeDate({ calendar: 'solar', date: { year: 2200, month: 1, day: 1 } }),
    ).toThrow(/1900/);
    expect(() => parseDate('2024-2-1')).toThrow();
  });
});
