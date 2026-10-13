import { normalizeDate } from '../calendar/convert';
import type { CalendarInput, CivilDate } from '../calendar/types';
import type { BirthInput } from '../astrology/types';
import { RULE_PROFILE, FIXED_LEAP_POLICY, FIXED_ZI_POLICY } from '../astrology/profile';
import { CALENDAR_VERSION } from '../calendar/types';
import { vietnamToday } from '../interpretation/present';

export const LEGACY_PROFILE_STORAGE_KEY = 'huyenvi:consented-profiles:v1';
export const PROFILE_STORAGE_KEY = 'huyenvi:consented-profiles:v2';
export const MAX_PROFILES = 10;
export type ProfileInput = CalendarInput & {
  gender: BirthInput['gender'];
  leapPolicy: BirthInput['leapPolicy'];
  ziPolicy: BirthInput['ziPolicy'];
  time: string | null;
};
export interface LocalProfile {
  id: string;
  name: string;
  input: ProfileInput;
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function validateProfileInput(
  value: unknown,
  asOf: CivilDate = vietnamToday(),
): ProfileInput {
  if (!record(value) || !record(value.date)) throw new Error('Thông tin hồ sơ chưa hợp lệ.');
  const { day, month, year } = value.date;
  if (typeof day !== 'number' || typeof month !== 'number' || typeof year !== 'number')
    throw new Error('Ngày sinh trong hồ sơ chưa hợp lệ.');
  let calendarInput: CalendarInput;
  if (value.calendar === 'solar') calendarInput = { calendar: 'solar', date: { day, month, year } };
  else if (value.calendar === 'lunar' && typeof value.date.isLeapMonth === 'boolean')
    calendarInput = {
      calendar: 'lunar',
      date: { day, month, year, isLeapMonth: value.date.isLeapMonth },
    };
  else throw new Error('Loại lịch trong hồ sơ chưa hợp lệ.');
  const { solar } = normalizeDate(calendarInput);
  if (
    Date.UTC(solar.year, solar.month - 1, solar.day) > Date.UTC(asOf.year, asOf.month - 1, asOf.day)
  )
    throw new Error('Ngày sinh không được nằm trong tương lai. Vui lòng kiểm tra lại.');
  if (value.gender !== 'male' && value.gender !== 'female')
    throw new Error('Giới tính an lá số chưa hợp lệ.');
  if (value.leapPolicy !== FIXED_LEAP_POLICY) throw new Error('Quy ước tháng nhuận chưa hợp lệ.');
  if (value.ziPolicy !== FIXED_ZI_POLICY) throw new Error('Quy ước giờ Tý chưa hợp lệ.');
  if (
    value.time !== null &&
    (typeof value.time !== 'string' || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value.time))
  )
    throw new Error('Vui lòng nhập giờ sinh đầy đủ hoặc chọn chưa biết giờ sinh.');
  return {
    ...calendarInput,
    gender: value.gender,
    leapPolicy: value.leapPolicy,
    ziPolicy: value.ziPolicy,
    time: value.time,
  };
}

export function decodeProfiles(raw: string | null): LocalProfile[] {
  if (raw === null) return [];
  if (raw.length > 100_000) throw new Error('Dữ liệu hồ sơ quá lớn.');
  const data: unknown = JSON.parse(raw);
  if (
    !record(data) ||
    data.version !== 2 ||
    data.calculationProfile !== RULE_PROFILE ||
    data.calendarVersion !== CALENDAR_VERSION ||
    !Array.isArray(data.profiles) ||
    data.profiles.length > MAX_PROFILES
  )
    throw new Error('Không thể đọc hồ sơ đã lưu.');
  const profiles = data.profiles.map((item: unknown): LocalProfile => {
    if (
      !record(item) ||
      typeof item.id !== 'string' ||
      !/^[a-zA-Z0-9-]{1,80}$/.test(item.id) ||
      typeof item.name !== 'string' ||
      item.name.length > 80
    )
      throw new Error('Hồ sơ đã lưu chưa hợp lệ.');
    return { id: item.id, name: item.name, input: validateProfileInput(item.input) };
  });
  if (new Set(profiles.map((profile) => profile.id)).size !== profiles.length)
    throw new Error('Hồ sơ trùng định danh.');
  return profiles;
}
export function encodeProfiles(profiles: LocalProfile[], consent: boolean): string {
  if (!consent) throw new Error('Bạn cần đồng ý trước khi lưu hồ sơ.');
  const encoded = JSON.stringify({
    version: 2,
    calculationProfile: RULE_PROFILE,
    calendarVersion: CALENDAR_VERSION,
    profiles,
  });
  decodeProfiles(encoded);
  return encoded;
}
