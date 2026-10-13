export interface CivilDate {
  year: number;
  month: number;
  day: number;
}
export interface LunarDate extends CivilDate {
  isLeapMonth: boolean;
}
export type CalendarInput =
  { calendar: 'solar'; date: CivilDate } | { calendar: 'lunar'; date: LunarDate };
export const MIN_YEAR = 1900;
export const MAX_YEAR = 2099;
export const CALENDAR_VERSION = 'vn-lunar-1.0.1';
export const CALENDAR_ZONE = 'Lịch Việt Nam (UTC+7)';
