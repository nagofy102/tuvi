import { describe, expect, it } from 'vitest';
import {
  chartSignature,
  inspectUpstream,
  nextDate,
  runAudit,
  validStructure,
} from '../../scripts/tech-audit';
import { calculateChart } from '@/domain/astrology/calculate';
import { lunarToSolar, solarToLunar } from '@/domain/calendar/convert';
import type { BirthInput } from '@/domain/astrology/types';
import type { LunarDate } from '@/domain/calendar/types';
import { createRequire } from 'node:module';

const upstream = createRequire(import.meta.url)('lunar-lite') as typeof import('lunar-lite');

describe('technical audit diagnostics, not expert golden charts', () => {
  it('preserves civil month, year and leap-day rollovers', () => {
    expect(nextDate({ year: 2024, month: 2, day: 28 })).toEqual({ year: 2024, month: 2, day: 29 });
    expect(nextDate({ year: 2024, month: 2, day: 29 })).toEqual({ year: 2024, month: 3, day: 1 });
    expect(nextDate({ year: 2023, month: 12, day: 31 })).toEqual({ year: 2024, month: 1, day: 1 });
  });
  it('detects upstream loss of the Vietnamese 1985 leap flag', () => {
    const result = inspectUpstream({ year: 1985, month: 2, day: 1, isLeapMonth: true });
    expect(result.category).toBe('upstream_leap_flag_loss');
  });
  it.each([
    { year: 1952, month: 7, day: 21 },
    { year: 1955, month: 5, day: 21 },
    { year: 2017, month: 8, day: 21 },
  ])('isolates the upstream regular-month preconstruction defect at %j', (solar) => {
    const lunar = solarToLunar(solar);
    expect(lunar.day).toBe(30);
    expect(lunar.isLeapMonth).toBe(true);
    expect(lunarToSolar(lunar)).toEqual(solar);
    expect(inspectUpstream(lunar).category).toBe('upstream_regular_month_preconstruction');
  });
  it('does not blame the adapter for an upstream unrepresentable day', () => {
    expect(inspectUpstream({ year: 2024, month: 1, day: 30, isLeapMonth: false }).category).toBe(
      'upstream_calendar_rejection',
    );
  });
  it('preserves a representable lunar tuple', () => {
    const result = inspectUpstream({ year: 2024, month: 1, day: 1, isLeapMonth: false });
    expect(result.category).toBeUndefined();
    expect(result.solar).toEqual({ year: 2024, month: 2, day: 10 });
  });
  it('does not label a changed lunar day as lost leap flag', () => {
    const altered = {
      ...upstream,
      solar2lunar: (date: string | Date) => {
        const value = upstream.solar2lunar(date);
        return { ...value, lunarDay: value.lunarDay + 1 };
      },
    };
    expect(
      inspectUpstream({ year: 2024, month: 1, day: 1, isLeapMonth: false }, altered).category,
    ).toBe('upstream_lunar_tuple_mismatch');
  });
  it('does not blame regular-month preconstruction for an unrelated converter exception', () => {
    const broken = {
      ...upstream,
      lunar2solar: () => {
        throw new Error('unrelated fault');
      },
    };
    expect(
      inspectUpstream({ year: 2023, month: 2, day: 1, isLeapMonth: true }, broken).category,
    ).toBe('upstream_other_error');
  });
  it('retains a full scan and failure counts after injected converter faults', async () => {
    const template = calculateChart({
      calendar: 'solar',
      date: { year: 2024, month: 2, day: 10 },
      gender: 'male',
      hour: 0,
      minute: 0,
      leapPolicy: 'split_at_15',
      ziPolicy: 'civil_midnight',
    });
    let effectiveProbeBroken = false;
    const toLunar = (date: { year: number; month: number; day: number }) => {
      if (
        (date.month === 1 && date.day === 2) ||
        (effectiveProbeBroken && date.month === 2 && date.day === 10)
      ) {
        throw new Error('injected calendar fault');
      }
      return solarToLunar(date);
    };
    const report = await runAudit(
      { startYear: 2024, endYear: 2024 },
      {
        toLunar,
        toSolar: (date: LunarDate) => {
          try {
            return lunarToSolar(date);
          } catch {
            if (date.day === 30) return lunarToSolar({ ...date, day: 29 });
            throw new Error('unexpected input');
          }
        },
        chart: (input) => {
          if (
            input.date.month === 2 &&
            input.date.day === 9 &&
            input.hour === 23 &&
            input.ziPolicy === 'next_day_at_23'
          ) {
            effectiveProbeBroken = true;
            throw new Error('injected chart/effective date fault');
          }
          const lunar = toLunar(input.date);
          return {
            ...template,
            solar: input.date,
            lunar,
            effectiveLunar: toLunar(
              input.hour === 23 && input.ziPolicy === 'next_day_at_23'
                ? nextDate(input.date)
                : input.date,
            ),
          };
        },
      },
    );
    expect(report.calendar.days).toBe(366);
    expect(report.calendar.projectFailed).toBe(1);
    expect(report.calendar.continuationErrors).toBe(1);
    expect(report.calendar.invalidDay30Accepted).toBeGreaterThan(0);
    expect(report.calendar.invalidDay30Attempted).toBe(
      report.calendar.invalidDay30Accepted + report.calendar.invalidDay30Rejected,
    );
    expect(
      report.findings.some((f) => f.stage === 'chart' && f.category === 'project_calendar_error'),
    ).toBe(true);
    expect(report.charts.attempts).toBe(report.charts.passed + report.charts.failed);
  });
  it('rejects noninteger, reversed or out-of-scope audit ranges', async () => {
    for (const [startYear, endYear] of [
      [1949, 1950],
      [2026, 2027],
      [1985, 1984],
      [1950.5, 1951],
    ]) {
      await expect(runAudit({ startYear, endYear })).rejects.toThrow('Audit range');
    }
  });
  it('checks duplicate branches/stars and ignores presentation ordering in signatures', () => {
    const input: BirthInput = {
      calendar: 'solar',
      date: { year: 2024, month: 2, day: 10 },
      gender: 'male',
      hour: 0,
      minute: 0,
      leapPolicy: 'split_at_15',
      ziPolicy: 'civil_midnight',
    };
    const chart = calculateChart(input);
    expect(validStructure(chart)).toBe(true);
    expect(
      validStructure({ ...chart, palaces: [chart.palaces[0], ...chart.palaces.slice(0, 11)] }),
    ).toBe(false);
    expect(chartSignature({ ...chart, palaces: [...chart.palaces].reverse() })).toBe(
      chartSignature(chart),
    );
    const palaces = chart.palaces.map((p) => ({
      ...p,
      stars: p.stars.map((s) => (s.group === 'major' ? { ...s, name: 'duplicate' } : s)),
    }));
    expect(validStructure({ ...chart, palaces })).toBe(false);
  });
});
