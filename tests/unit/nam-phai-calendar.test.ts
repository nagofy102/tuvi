import { describe, expect, it } from 'vitest';
import { calculateChart } from '@/domain/astrology/calculate';
import { solarToLunar, lunarToSolar } from '@/domain/calendar/convert';
import { presentContext } from '@/domain/interpretation/present';
import type { BirthInput } from '@/domain/astrology/types';

const base: BirthInput = {
  calendar: 'solar',
  date: { year: 1985, month: 1, day: 21 },
  gender: 'male',
  hour: 0,
  minute: 0,
  leapPolicy: 'split_at_15',
  ziPolicy: 'next_day_at_23',
};

describe('active Chinese calendar and fixed Southern application boundaries', () => {
  it('supports advertised civil-year endpoints even when converted lunar year is adjacent', () => {
    for (const date of [
      { year: 1900, month: 1, day: 1 },
      { year: 2099, month: 12, day: 31 },
    ]) {
      const chart = calculateChart({ ...base, date });
      expect(chart.solar).toEqual(date);
      expect(chart.provenance.profile).toBe('nam-phai-chinese-lunar-v1');
      expect(chart.palaces).toHaveLength(12);
    }
  });
  // Ordered Lộc–Quyền–Khoa–Kỵ, independently transcribed from reviewed iztro §18.
  // https://iztro.com/learn/setup.html: explicitly labelled 南派四化.
  it.each([
    [1984, ['Liêm Trinh', 'Phá Quân', 'Vũ Khúc', 'Thái Dương']],
    [1985, ['Thiên Cơ', 'Thiên Lương', 'Tử Vi', 'Thái Âm']],
    [1986, ['Thiên Đồng', 'Thiên Cơ', 'Văn Xương', 'Liêm Trinh']],
    [1987, ['Thái Âm', 'Thiên Đồng', 'Thiên Cơ', 'Cự Môn']],
    [1988, ['Tham Lang', 'Thái Âm', 'Hữu Bật', 'Thiên Cơ']],
    [1989, ['Vũ Khúc', 'Tham Lang', 'Thiên Lương', 'Văn Khúc']],
    [1990, ['Thái Dương', 'Vũ Khúc', 'Thái Âm', 'Thiên Đồng']],
    [1991, ['Cự Môn', 'Thái Dương', 'Văn Khúc', 'Văn Xương']],
    [1992, ['Thiên Lương', 'Tử Vi', 'Tả Phụ', 'Vũ Khúc']],
    [1993, ['Phá Quân', 'Cự Môn', 'Thái Âm', 'Tham Lang']],
  ] as const)(
    'applies the source-defined Southern transformations for lunar year %i',
    (year, names) => {
      const chart = calculateChart({
        ...base,
        calendar: 'lunar',
        date: { year, month: 1, day: 1, isLeapMonth: false },
      });
      const stars = chart.palaces.flatMap((palace) => palace.stars);
      for (const [index, transformation] of [
        'Hóa Lộc',
        'Hóa Quyền',
        'Hóa Khoa',
        'Hóa Kỵ',
      ].entries()) {
        expect(
          stars
            .filter((star) => star.transformation === transformation)
            .map((star) => (star.name === 'Tả Phù' ? 'Tả Phụ' : star.name)),
        ).toEqual([names[index]]);
      }
    },
  );
  // Independently read HKO official year tables; these expectations predate engine runs.
  // https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/1985e.pdf
  // https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/2023e.pdf
  // https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/2017e.pdf
  it.each([
    [1985, 1, 21, 1984, 12, 1, false],
    [1985, 2, 20, 1985, 1, 1, false],
    [1985, 3, 21, 1985, 2, 1, false],
    [1985, 4, 20, 1985, 3, 1, false],
    [2023, 2, 20, 2023, 2, 1, false],
    [2023, 3, 22, 2023, 2, 1, true],
    [2023, 4, 20, 2023, 3, 1, false],
    [2017, 7, 23, 2017, 6, 1, true],
    [2017, 8, 21, 2017, 6, 30, true],
    [2017, 8, 22, 2017, 7, 1, false],
  ] as const)(
    'matches HKO %i-%i-%i',
    (year, month, day, lunarYear, lunarMonth, lunarDay, isLeapMonth) => {
      const solar = { year, month, day };
      const lunar = { year: lunarYear, month: lunarMonth, day: lunarDay, isLeapMonth };
      expect(solarToLunar(solar)).toEqual(lunar);
      expect(lunarToSolar(lunar)).toEqual(solar);
    },
  );
  it.each([
    { year: 1985, month: 2, day: 1, isLeapMonth: true },
    { year: 2024, month: 2, day: 1, isLeapMonth: true },
    { year: 2024, month: 1, day: 30, isLeapMonth: false },
    { year: 2023, month: 2, day: 30, isLeapMonth: true },
  ])('rejects impossible Chinese lunar input %j', (date) => {
    expect(() => lunarToSolar(date)).toThrow();
  });
  it.each([
    { year: 2024, month: 2, day: 9 },
    { year: 2023, month: 4, day: 5 }, // leap day 15 -> 16
    { year: 2023, month: 4, day: 19 }, // leap month end -> regular month
    { year: 2023, month: 12, day: 31 },
  ])('moves exactly one civil day at late Ty boundary %j', (date) => {
    const at22 = calculateChart({ ...base, date, hour: 22, minute: 59 });
    const nextDate = new Date(Date.UTC(date.year, date.month - 1, date.day + 1));
    const next = {
      year: nextDate.getUTCFullYear(),
      month: nextDate.getUTCMonth() + 1,
      day: nextDate.getUTCDate(),
    };
    for (const minute of [0, 59]) {
      const late = calculateChart({ ...base, date, hour: 23, minute });
      expect(late.solar).toEqual(date);
      expect(late.lunar).toEqual(solarToLunar(date));
      expect(late.effectiveLunar).toEqual(solarToLunar(next));
      expect(late.palaces).toEqual(calculateChart({ ...base, date: next }).palaces);
    }
    expect(at22.effectiveLunar).toEqual(at22.lunar);
  });
  it('anchors age to the original Chinese birth year before the current Chinese New Year', () => {
    const value = calculateChart(base);
    expect(presentContext(value, { year: 2026, month: 2, day: 16 }).age).toBe(42);
    expect(presentContext(value, { year: 2026, month: 2, day: 17 }).age).toBe(43);
    const late = calculateChart({ ...base, date: { year: 2024, month: 2, day: 9 }, hour: 23 });
    expect(late.lunar.year).toBe(2023);
    expect(late.effectiveLunar.year).toBe(2024);
    expect(presentContext(late, { year: 2026, month: 2, day: 17 }).age).toBe(4);
  });
});
