// The supported chart profile uses Vietnamese lunar months, not solar terms.
// Keep Chinese day/hour pillars for the actual civil day; never shift the birth date.
import { normalizeDateStr } from 'lunar-lite/lib/convertor';
import { getHeavenlyStemAndEarthlyBranchBySolarDate as upstreamPillars } from 'lunar-lite/lib/ganzhi';
import { getSign, getZodiac } from 'lunar-lite/lib/misc';
import { HEAVENLY_STEMS, EARTHLY_BRANCHES } from 'lunar-lite/lib/constants';
import type { Options } from 'lunar-lite/lib/types';
import { dateString, lunarToSolar, solarToLunar } from './legacy-vietnamese';

export { normalizeDateStr, getSign, getZodiac };

function civil(date: string | Date) {
  const [year, month, day] = normalizeDateStr(date);
  return { year, month, day };
}

export function solar2lunar(date: string | Date) {
  const lunar = solarToLunar(civil(date));
  return {
    lunarYear: lunar.year,
    lunarMonth: lunar.month,
    lunarDay: lunar.day,
    isLeap: lunar.isLeapMonth,
    toString: () => dateString(lunar),
  };
}

export function lunar2solar(date: string, isLeapMonth = false) {
  const solar = lunarToSolar({ ...civil(date), isLeapMonth });
  return {
    solarYear: solar.year,
    solarMonth: solar.month,
    solarDay: solar.day,
    toString: () => dateString(solar),
  };
}

export function getTotalDaysOfLunarMonth(date: string) {
  const lunar = solarToLunar(civil(date));
  // Check the real Vietnamese month rather than a corresponding Chinese month.
  try {
    lunarToSolar({ ...lunar, day: 30 });
    return 30;
  } catch {
    lunarToSolar({ ...lunar, day: 29 });
    return 29;
  }
}

export function getHeavenlyStemAndEarthlyBranchBySolarDate(
  date: string | Date,
  timeIndex: number,
  options?: Options,
) {
  if (options?.year !== 'normal') {
    throw new Error('Vietnamese engine supports only normal lunar year boundaries.');
  }
  const result = upstreamPillars(date, timeIndex, options);
  const lunar = solarToLunar(civil(date));
  const stem = (((lunar.year - 4) % 10) + 10) % 10;
  const branch = (((lunar.year - 4) % 12) + 12) % 12;
  result.yearly = [HEAVENLY_STEMS[stem], EARTHLY_BRANCHES[branch]];
  // Preserve iztro's normal-month pillar convention; chart leap policy is applied
  // separately by its palace/star functions. This is not a new school rule.
  const month = lunar.month - 1 + (lunar.isLeapMonth && lunar.day > 15 ? 1 : 0);
  if (options.month === 'normal') {
    result.monthly = [
      HEAVENLY_STEMS[((stem % 5) * 2 + 2 + month) % 10],
      EARTHLY_BRANCHES[(month + 2) % 12],
    ];
  }
  result.toString = () =>
    [result.yearly, result.monthly, result.daily, result.hourly].map((p) => p.join('')).join(' ');
  return result;
}

export function getHeavenlyStemAndEarthlyBranchByLunarDate(
  date: string,
  timeIndex: number,
  isLeap = false,
  options?: Options,
) {
  return getHeavenlyStemAndEarthlyBranchBySolarDate(
    lunar2solar(date, isLeap).toString(),
    timeIndex,
    options,
  );
}
