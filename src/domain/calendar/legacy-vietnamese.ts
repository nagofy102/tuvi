import { getLunarDate, getSolarDate } from '@dqcai/vn-lunar';
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
  const lunar = getLunarDate(date.day, date.month, date.year);
  if (!lunar.isValid()) throw new CalendarError('Ngày này nằm ngoài phạm vi lịch được hỗ trợ.');
  return { day: lunar.day, month: lunar.month, year: lunar.year, isLeapMonth: lunar.leap };
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
  const raw = getSolarDate(date.day, date.month, date.year, date.isLeapMonth);
  const solar = { year: raw.year, month: raw.month, day: raw.day };
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
