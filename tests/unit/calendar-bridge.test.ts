import { describe, expect, it } from 'vitest';
import { astro as upstream } from 'iztro';
import { astro as bridged } from '@/domain/astrology/vendor/iztro-vietnam.cjs';
import { calculateChart } from '@/domain/astrology/legacy-vietnamese';
import { calculateInterpretation } from '@/domain/interpretation/calculate';
import { dateString, solarToLunar } from '@/domain/calendar/legacy-vietnamese';
import {
  getTotalDaysOfLunarMonth,
  getHeavenlyStemAndEarthlyBranchBySolarDate,
} from '@/domain/calendar/engine-bridge';
import type { BirthInput } from '@/domain/astrology/types';
import { BRANCHES, mod } from '@/domain/astrology/sexagenary';

const base = {
  calendar: 'solar',
  hour: 0,
  minute: 0,
  gender: 'male',
  leapPolicy: 'split_at_15',
  ziPolicy: 'civil_midnight',
} as const;
const config = {
  algorithm: 'default',
  yearDivide: 'normal',
  horoscopeDivide: 'normal',
  dayDivide: 'current',
  ageDivide: 'normal',
} as const;

describe('isolated Vietnamese calendar seam, not expert star-placement certification', () => {
  it.each([1985, 1987])(
    'applies explicit leap rules at days 15/16 in Vietnamese year %i',
    (year) => {
      const month = year === 1985 ? 2 : 7;
      for (const day of [15, 16]) {
        for (const leapPolicy of ['same_month', 'split_at_15'] as const) {
          for (const gender of ['male', 'female'] as const) {
            for (let branch = 0; branch < 12; branch++) {
              const chart = calculateChart({
                ...base,
                calendar: 'lunar',
                date: { year, month, day, isLeapMonth: true },
                hour: branch * 2,
                leapPolicy,
                gender,
              });
              const effectiveMonth = month + (day > 15 && leapPolicy === 'split_at_15' ? 1 : 0);
              expect(chart.palaces.find((p) => p.name === 'Mệnh')?.branch).toBe(
                BRANCHES[mod(2 + effectiveMonth - 1 - branch, 12)],
              );
              expect(chart.palaces.find((p) => p.isBodyPalace)?.branch).toBe(
                BRANCHES[mod(2 + effectiveMonth - 1 + branch, 12)],
              );
            }
          }
        }
      }
    },
    // Each case builds 96 charts; allow time for the complete matrix under CI load.
    30_000,
  );
  it.each([
    { year: 1952, month: 7, day: 21 },
    { year: 1955, month: 5, day: 21 },
    { year: 1968, month: 2, day: 27 },
    { year: 1985, month: 4, day: 1 },
    { year: 1987, month: 8, day: 24 },
    { year: 2017, month: 8, day: 21 },
  ])('retains legacy birth dates but refuses active-profile readings for regression %j', (date) => {
    const chart = calculateChart({ ...base, date });
    expect(chart.solar).toEqual(date);
    expect(chart.lunar).toEqual(solarToLunar(date));
    expect(chart.effectiveLunar).toEqual(chart.lunar);
    expect(chart.palaces).toHaveLength(12);
    expect(calculateInterpretation(chart).status).toBe('unavailable');
  });
  it('uses the Vietnamese year at the 1985 Tết boundary', () => {
    const pillars = getHeavenlyStemAndEarthlyBranchBySolarDate('1985-01-21', 0, {
      year: 'normal',
      month: 'normal',
    });
    expect(pillars.yearly).toEqual(['乙', '丑']);
    expect(pillars.monthly).toEqual(['戊', '寅']);
    expect(getTotalDaysOfLunarMonth('1968-02-27')).toBe(30);
  });
  it('does not mutate the upstream calendar, configuration or reject guard', () => {
    expect(() =>
      upstream.withOptions({
        type: 'lunar',
        dateStr: '1985-2-1',
        isLeapMonth: true,
        timeIndex: 0,
        gender: 'male',
        language: 'vi-VN',
        config,
      }),
    ).not.toThrow();
    const original = upstream.byLunar('1985-2-1', 0, 'male', true, true, 'vi-VN');
    expect(original.rawDates.lunarDate.isLeap).toBe(false);
    calculateChart({ ...base, date: { year: 1985, month: 4, day: 1 } });
    expect(
      upstream.byLunar('1985-2-1', 0, 'male', true, true, 'vi-VN').rawDates.lunarDate.isLeap,
    ).toBe(false);
    expect(() =>
      calculateChart({
        ...base,
        calendar: 'lunar',
        date: {
          year: 1986,
          month: 2,
          day: 1,
          isLeapMonth: true,
        },
      }),
    ).toThrow(/không tồn tại/);
  });
  it.each([1950, 1985, 2000, 2023, 2026])(
    'preserves placements for compatible lunar tuples in %i',
    (year) => {
      for (const month of [1, 6, 12]) {
        const input: BirthInput = { ...base, date: { year, month, day: 15 } };
        const lunar = solarToLunar(input.date);
        const a = upstream.withOptions({
          type: 'lunar',
          dateStr: dateString(lunar),
          timeIndex: 0,
          isLeapMonth: lunar.isLeapMonth,
          fixLeap: true,
          gender: 'male',
          language: 'vi-VN',
          config,
        });
        const b = bridged.withOptions({
          type: 'solar',
          dateStr: dateString(input.date),
          timeIndex: 0,
          fixLeap: true,
          gender: 'male',
          language: 'vi-VN',
          config,
        });
        const raw = a.rawDates.lunarDate;
        if (
          raw.lunarYear !== lunar.year ||
          raw.lunarMonth !== lunar.month ||
          raw.lunarDay !== lunar.day ||
          raw.isLeap !== lunar.isLeapMonth
        )
          continue;
        const signature = (chart: typeof a) =>
          chart.palaces.map((p) => ({
            name: p.name,
            branch: p.earthlyBranch,
            stem: p.heavenlyStem,
            body: p.isBodyPalace,
            major: p.majorStars.map((s) => [s.name, s.brightness, s.mutagen]),
            minor: p.minorStars.map((s) => [s.name, s.brightness, s.mutagen]),
            auxiliary: p.adjectiveStars.map((s) => [s.name, s.brightness, s.mutagen]),
            decade: p.decadal.range,
            stage: p.changsheng12,
          }));
        expect(signature(b)).toEqual(signature(a));
        expect(b.fiveElementsClass).toBe(a.fiveElementsClass);
      }
    },
  );
});
