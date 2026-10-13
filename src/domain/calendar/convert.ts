import { solar2lunar } from 'lunar-lite';
import { Lunar } from 'lunar-typescript';
import { MAX_YEAR, MIN_YEAR, type CalendarInput, type CivilDate, type LunarDate } from './types';

export class CalendarError extends Error {}

function assertYear(year: number) {
  if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) {
    throw new CalendarError(`Vui lòng chọn năm từ ${MIN_YEAR} đến ${MAX_YEAR}.`);
  }
}

export function validateSolarDate(date: CivilDate): void {
  assertYear(date.year);
  if (![date.day, date.month].every(Number.isInteger))
    throw new CalendarError('Ngày và tháng phải là số nguyên.');
  const parsed = new Date(Date.UTC(date.year, date.month - 1, date.day));
  if (
    parsed.getUTCFullYear() !== date.year ||
    parsed.getUTCMonth() + 1 !== date.month ||
    parsed.getUTCDate() !== date.day
  ) {
    throw new CalendarError('Ngày dương lịch không tồn tại. Vui lòng kiểm tra lại.');
  }
}

export function solarToLunar(date: CivilDate): LunarDate {
  validateSolarDate(date);
  const lunar = solar2lunar(dateString(date));
  // Early supported Gregorian dates can belong to the preceding lunar year.
  if (
    !Number.isInteger(lunar.lunarYear) ||
    lunar.lunarYear < MIN_YEAR - 1 ||
    lunar.lunarYear > MAX_YEAR
  ) {
    throw new CalendarError('Ngày này nằm ngoài phạm vi lịch được hỗ trợ.');
  }
  return {
    day: lunar.lunarDay,
    month: lunar.lunarMonth,
    year: lunar.lunarYear,
    isLeapMonth: lunar.isLeap,
  };
}

export function lunarToSolar(date: LunarDate): CivilDate {
  assertYear(date.year);
  if (
    !Number.isInteger(date.day) ||
    date.day < 1 ||
    date.day > 30 ||
    !Number.isInteger(date.month) ||
    date.month < 1 ||
    date.month > 12 ||
    typeof date.isLeapMonth !== 'boolean'
  ) {
    throw new CalendarError('Ngày âm lịch không hợp lệ.');
  }
  let solar: CivilDate;
  try {
    // Construct the requested signed month directly: lunar-lite first constructs
    // the regular month, which rejects a valid leap day 30 if that month has 29 days.
    const raw = Lunar.fromYmd(
      date.year,
      date.isLeapMonth ? -date.month : date.month,
      date.day,
    ).getSolar();
    solar = { year: raw.getYear(), month: raw.getMonth(), day: raw.getDay() };
  } catch (cause) {
    throw new CalendarError('Ngày hoặc tháng nhuận không tồn tại trong năm âm lịch đã chọn.', {
      cause,
    });
  }
  validateSolarDate(solar);
  // The dependency normalizes invalid leap flags and days: reject instead of silently correcting.
  const back = solarToLunar(solar);
  if (
    back.year !== date.year ||
    back.month !== date.month ||
    back.day !== date.day ||
    back.isLeapMonth !== date.isLeapMonth
  ) {
    throw new CalendarError('Ngày hoặc tháng nhuận không tồn tại trong năm âm lịch đã chọn.');
  }
  return solar;
}

export function normalizeDate(input: CalendarInput): { solar: CivilDate; lunar: LunarDate } {
  if (input.calendar === 'solar')
    return { solar: { ...input.date }, lunar: solarToLunar(input.date) };
  return { solar: lunarToSolar(input.date), lunar: { ...input.date } };
}

export function dateString(date: CivilDate): string {
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
}

export function formatDate(date: CivilDate): string {
  return `${String(date.day).padStart(2, '0')}/${String(date.month).padStart(2, '0')}/${date.year}`;
}

export function parseDate(value: string): CivilDate {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
    throw new CalendarError('Vui lòng nhập ngày sinh đầy đủ.');
  const [year, month, day] = value.split('-').map(Number);
  return { year, month, day };
}
