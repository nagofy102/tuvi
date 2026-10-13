import { astro } from './vendor/iztro-vietnam.cjs';
import { CALENDAR_VERSION } from '../calendar/types';
import { normalizeDate, dateString, solarToLunar } from '../calendar/convert';
import { BRANCHES, mod, napAm, timeIndex, yearName } from './sexagenary';
import type { BirthInput, ChartResult, ChartStar } from './types';

import { RULE_PROFILE } from './profile';
export { RULE_PROFILE } from './profile';

export function calculateChart(input: BirthInput): ChartResult {
  const birth = normalizeDate(input);
  const index = timeIndex(input.hour, input.minute);
  if (!['male', 'female'].includes(input.gender))
    throw new Error('Vui lòng chọn giới tính dùng để an lá số.');
  if (
    !['split_at_15', 'same_month'].includes(input.leapPolicy) ||
    !['civil_midnight', 'next_day_at_23'].includes(input.ziPolicy)
  )
    throw new Error('Cấu hình an lá số không hợp lệ.');
  let effectiveLunar = birth.lunar;
  let effectiveSolar = birth.solar;
  if (index === 12 && input.ziPolicy === 'next_day_at_23') {
    const next = new Date(Date.UTC(birth.solar.year, birth.solar.month - 1, birth.solar.day + 1));
    effectiveSolar = {
      year: next.getUTCFullYear(),
      month: next.getUTCMonth() + 1,
      day: next.getUTCDate(),
    };
    effectiveLunar = solarToLunar(effectiveSolar);
  }
  // The isolated engine bridge reads this real civil date using Vietnam's calendar.
  const chart = (() => {
    try {
      return astro.withOptions({
        type: 'solar',
        dateStr: dateString(effectiveSolar),
        timeIndex: index % 12,
        gender: input.gender,
        isLeapMonth: effectiveLunar.isLeapMonth,
        fixLeap: input.leapPolicy === 'split_at_15',
        language: 'vi-VN',
        config: {
          algorithm: 'default',
          yearDivide: 'normal',
          horoscopeDivide: 'normal',
          dayDivide: 'current',
          ageDivide: 'normal',
        },
      });
    } catch (cause) {
      throw new Error(
        'Bộ an sao chưa hỗ trợ ngày âm lịch Việt Nam này. Vui lòng đối chiếu kết quả chuyển lịch; hệ thống không tự đổi ngày sinh.',
        { cause },
      );
    }
  })();
  const raw = chart.rawDates.lunarDate;
  if (
    raw.lunarYear !== effectiveLunar.year ||
    raw.lunarMonth !== effectiveLunar.month ||
    raw.lunarDay !== effectiveLunar.day ||
    raw.isLeap !== effectiveLunar.isLeapMonth
  ) {
    throw new Error(
      'Bộ an sao chưa hỗ trợ ngày âm lịch Việt Nam này. Vui lòng giữ kết quả chuyển lịch để đối chiếu; hệ thống không tự đổi ngày sinh.',
    );
  }
  const mapStar = (
    star: { name: string; brightness?: string; mutagen?: string },
    group: ChartStar['group'],
  ): ChartStar => ({
    name: star.name,
    brightness:
      star.brightness === 'Hạn'
        ? 'Hãm'
        : star.brightness === 'Bất'
          ? 'Bất đắc'
          : star.brightness || '',
    transformation: star.mutagen ? `Hóa ${star.mutagen}` : '',
    group,
  });
  const palaces = chart.palaces.map((p) => ({
    name: p.name === 'Tử Nữ' ? 'Tử Tức' : p.name,
    branch: p.earthlyBranch,
    branchIndex: mod(p.index + 2, 12),
    stem: p.heavenlyStem,
    isBodyPalace: p.isBodyPalace,
    stars: [
      ...p.majorStars.map((s) => mapStar(s, 'major')),
      ...p.minorStars.map((s) => mapStar(s, 'minor')),
      ...p.adjectiveStars.map((s) => mapStar(s, 'auxiliary')),
    ],
    decade: p.decadal.range,
    lifeStage: p.changsheng12,
  }));
  if (
    palaces.length !== 12 ||
    new Set(palaces.map((p) => p.name)).size !== 12 ||
    palaces.filter((p) => p.isBodyPalace).length !== 1 ||
    palaces.reduce((n, p) => n + p.stars.filter((s) => s.group === 'major').length, 0) !== 14
  ) {
    throw new Error('Kết quả an sao không đạt kiểm tra cấu trúc.');
  }
  return {
    ...birth,
    effectiveLunar,
    gender: input.gender,
    timeLabel: `${String(input.hour).padStart(2, '0')}:${String(input.minute).padStart(2, '0')} · giờ ${BRANCHES[index % 12]}`,
    yearName: yearName(effectiveLunar.year),
    napAm: napAm(effectiveLunar.year),
    soul: chart.soul,
    body: chart.body,
    cuc: chart.fiveElementsClass,
    palaces,
    provenance: {
      engine: 'iztro-2.6.2-vn-bridge-v1',
      calendar: CALENDAR_VERSION,
      profile: RULE_PROFILE,
      leapPolicy: input.leapPolicy,
      ziPolicy: input.ziPolicy,
    },
    warnings: [
      'Lá số theo cấu hình Zi Wei phổ thông của iztro; chưa được chuyên gia thẩm định theo từng trường phái Tử Vi Việt Nam.',
    ],
  };
}
