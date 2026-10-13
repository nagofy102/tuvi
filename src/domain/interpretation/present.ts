import { solarToLunar, validateSolarDate } from '../calendar/convert';
import type { CivilDate } from '../calendar/types';
import type { ChartResult } from '../astrology/types';

export function vietnamToday(now = new Date()): CivilDate {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(now);
  const part = (type: string) => Number(parts.find((item) => item.type === type)?.value);
  return { year: part('year'), month: part('month'), day: part('day') };
}

/** Calendar/range lookup only: no yearly star placements or forecasts are inferred. */
export function presentContext(chart: ChartResult, asOf: CivilDate) {
  validateSolarDate(asOf);
  const lunarYear = solarToLunar(asOf).year;
  const birth = Date.UTC(chart.solar.year, chart.solar.month - 1, chart.solar.day);
  const reference = Date.UTC(asOf.year, asOf.month - 1, asOf.day);
  if (birth > reference) return { lunarYear, age: null, decade: null };
  const age = lunarYear - chart.lunar.year + 1;
  const matching = chart.palaces.filter(
    (palace) =>
      palace.decade.every(Number.isInteger) && age >= palace.decade[0] && age <= palace.decade[1],
  );
  return {
    lunarYear,
    age,
    decade:
      matching.length === 1
        ? {
            palace: matching[0].name,
            branch: matching[0].branch,
            range: matching[0].decade,
          }
        : null,
  };
}
