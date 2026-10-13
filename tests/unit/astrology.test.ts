import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import {
  BRANCHES,
  mod,
  napAm,
  PALACE_GRID,
  timeIndex,
  yearName,
} from '@/domain/astrology/sexagenary';
import type { BirthInput } from '@/domain/astrology/types';

const BASE: BirthInput = {
  calendar: 'lunar',
  date: { year: 2000, month: 1, day: 1, isLeapMonth: false },
  hour: 0,
  minute: 0,
  gender: 'male',
  leapPolicy: 'split_at_15',
  ziPolicy: 'civil_midnight',
};

describe('chart adapter and independently specified palace rules', () => {
  it('places Mệnh/Thân at Dần for lunar month 1, giờ Tý, and locates Tử Vi by the documented cục/day rule', () => {
    // Canh year -> Mậu Dần palace -> Thành Đầu Thổ -> Thổ Ngũ Cục.
    // Day 1: add 4 to divide by 5; quotient 1, even offset +4 from Dần -> Ngọ.
    // Formula reference: iztro/lib/star/location.js getStartIndex; palace formula: ziwei.pro.
    const chart = calculateChart(BASE);
    expect(chart.palaces.find((p) => p.name === 'Mệnh')?.branch).toBe('Dần');
    expect(chart.palaces.find((p) => p.isBodyPalace)?.branch).toBe('Dần');
    expect(chart.cuc).toBe('Thổ Ngũ Cục');
    expect(chart.palaces.find((p) => p.stars.some((s) => s.name === 'Tử Vi'))?.branch).toBe('Ngọ');
  });
  it.each(Array.from({ length: 12 }, (_, i) => i + 1))(
    'matches the Mệnh and Thân counting rules for month %i across all hours',
    (month) => {
      for (let hour = 0; hour < 23; hour += 2) {
        const chart = calculateChart({ ...BASE, date: { ...BASE.date, month }, hour });
        const hourBranch = timeIndex(hour, 0) % 12;
        expect(chart.palaces.find((p) => p.name === 'Mệnh')?.branch).toBe(
          BRANCHES[mod(2 + month - 1 - hourBranch, 12)],
        );
        expect(chart.palaces.find((p) => p.isBodyPalace)?.branch).toBe(
          BRANCHES[mod(2 + month - 1 + hourBranch, 12)],
        );
      }
    },
  );
  it('has exactly 12 unique palaces, one Thân and 14 major stars', () => {
    const result = calculateChart(BASE);
    expect(new Set(result.palaces.map((p) => p.name)).size).toBe(12);
    expect(new Set(result.palaces.map((p) => p.branchIndex)).size).toBe(12);
    expect(result.palaces.filter((p) => p.isBodyPalace)).toHaveLength(1);
    expect(result.palaces.flatMap((p) => p.stars).filter((s) => s.group === 'major')).toHaveLength(
      14,
    );
  });
  it('advances a late Tý birth across the full lunar year boundary only under the selected policy', () => {
    const beforeTet: BirthInput = {
      ...BASE,
      calendar: 'solar',
      date: { year: 2024, month: 2, day: 9 },
      hour: 23,
      minute: 59,
    };
    const current = calculateChart(beforeTet);
    const forward = calculateChart({ ...beforeTet, ziPolicy: 'next_day_at_23' });
    expect(current.effectiveLunar).toEqual({ year: 2023, month: 12, day: 30, isLeapMonth: false });
    expect(forward.effectiveLunar).toEqual({ year: 2024, month: 1, day: 1, isLeapMonth: false });
    expect(forward.lunar).toEqual(current.lunar);
    expect(forward.palaces).toEqual(
      calculateChart({ ...beforeTet, date: { year: 2024, month: 2, day: 10 }, hour: 0 }).palaces,
    );
  });
  it('uses explicit leap-month policy and splits after day 15', () => {
    const leap: BirthInput = {
      ...BASE,
      date: { year: 2023, month: 2, day: 16, isLeapMonth: true },
    };
    expect(calculateChart(leap).palaces.find((p) => p.name === 'Mệnh')?.branch).toBe('Thìn');
    expect(
      calculateChart({ ...leap, leapPolicy: 'same_month' }).palaces.find((p) => p.name === 'Mệnh')
        ?.branch,
    ).toBe('Mão');
  });
  it('returns deterministic results and equivalent solar/lunar inputs', () => {
    const solar: BirthInput = {
      ...BASE,
      calendar: 'solar',
      date: { year: 2000, month: 2, day: 5 },
    };
    expect(calculateChart(BASE)).toEqual(calculateChart(BASE));
    expect(calculateChart(solar)).toEqual(calculateChart(BASE));
  });
  it('does not silently drop the calendar distinction on Vietnamese Tết 1985', () => {
    const chart = calculateChart({
      ...BASE,
      calendar: 'solar',
      date: { year: 1985, month: 1, day: 21 },
    });
    expect(chart.lunar).toEqual({ year: 1985, month: 1, day: 1, isLeapMonth: false });
    expect(chart.yearName).toBe('Ất Sửu');
  });
  it('clearly rejects a valid Vietnamese leap month absent from the upstream chart calendar', () => {
    const input: BirthInput = {
      ...BASE,
      date: { year: 1985, month: 2, day: 1, isLeapMonth: true },
    };
    expect(() => calculateChart(input)).toThrow(/chưa hỗ trợ ngày âm lịch Việt Nam/);
  });
  it('supports gender independently without leaking global config', () => {
    const first = calculateChart(BASE);
    const female = calculateChart({ ...BASE, gender: 'female' });
    expect(calculateChart(BASE)).toEqual(first);
    expect(female.palaces.map((p) => p.decade)).not.toEqual(first.palaces.map((p) => p.decade));
  });
  it.each([
    [22, 59, 11],
    [23, 0, 12],
    [23, 59, 12],
    [0, 0, 0],
    [0, 59, 0],
    [1, 0, 1],
  ] as const)('maps %i:%i to time index %i', (hour, minute, index) => {
    expect(timeIndex(hour, minute)).toBe(index);
  });
  it('rejects invalid time and proves all perimeter positions are unique', () => {
    expect(() => timeIndex(24, 0)).toThrow();
    expect(() => timeIndex(12, 60)).toThrow();
    expect(new Set(Object.values(PALACE_GRID).map((p) => `${p.row}:${p.column}`)).size).toBe(12);
    expect(
      Object.values(PALACE_GRID).every(
        (p) => p.row === 1 || p.row === 4 || p.column === 1 || p.column === 4,
      ),
    ).toBe(true);
  });
  it('matches known sexagenary and nạp âm entries', () => {
    expect(yearName(1984)).toBe('Giáp Tý');
    expect(yearName(2026)).toBe('Bính Ngọ');
    expect(napAm(1986)).toEqual({ name: 'Lư Trung Hỏa', element: 'Hỏa' });
    expect(napAm(1990)).toEqual({ name: 'Lộ Bàng Thổ', element: 'Thổ' });
    expect(napAm(1991)).toEqual(napAm(1990));
  });
});
