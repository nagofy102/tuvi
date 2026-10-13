import { PALACE_CONTENT } from '../../data/palace-content';
import { RULE_PROFILE } from '../astrology/profile';
import { BRANCHES, mod } from '../astrology/sexagenary';
import type { ChartPalace, ChartResult, ChartStar } from '../astrology/types';
import { solarToLunar, validateSolarDate } from '../calendar/convert';
import { MAX_YEAR, MIN_YEAR, type LunarDate } from '../calendar/types';
import { INTERPRETATION_SOURCES, PALACE_SOURCE_IDS, STAR_CATALOG } from './catalog';
import { canonicalStarName, readContextualGroups, readMenhThan, AUXILIARY_GROUPS } from './context';
import { KNOWLEDGE_PROFILE, resolvePassage, STAR_PASSAGE_IDS } from './knowledge';
import { readThemes } from './themes';
import { PALACE_ACTIONS } from './palace-actions';
import type {
  InterpretationResult,
  PalaceReading,
  RelatedPalaceReading,
  StarMeaning,
  StarReading,
} from './types';

export const INTERPRETATION_VERSION = 'reference-reading-v6';

const MAJOR_STAR_NAMES = [
  'Tử Vi',
  'Thiên Cơ',
  'Thái Dương',
  'Vũ Khúc',
  'Thiên Đồng',
  'Liêm Trinh',
  'Thiên Phủ',
  'Thái Âm',
  'Tham Lang',
  'Cự Môn',
  'Thiên Tướng',
  'Thiên Lương',
  'Thất Sát',
  'Phá Quân',
] as const;

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function isStructurallyValid(chart: ChartResult): boolean {
  try {
    validateSolarDate(chart.solar);
    const converted = solarToLunar(chart.solar);
    if (
      converted.year !== chart.lunar.year ||
      converted.month !== chart.lunar.month ||
      converted.day !== chart.lunar.day ||
      converted.isLeapMonth !== chart.lunar.isLeapMonth
    ) {
      return false;
    }
    let effective = converted;
    if (chart.provenance.ziPolicy === 'next_day_at_23' && chart.timeLabel.startsWith('23:')) {
      const next = new Date(Date.UTC(chart.solar.year, chart.solar.month - 1, chart.solar.day + 1));
      effective = solarToLunar({
        year: next.getUTCFullYear(),
        month: next.getUTCMonth() + 1,
        day: next.getUTCDate(),
      });
    }
    if (
      effective.year !== chart.effectiveLunar.year ||
      effective.month !== chart.effectiveLunar.month ||
      effective.day !== chart.effectiveLunar.day ||
      effective.isLeapMonth !== chart.effectiveLunar.isLeapMonth
    ) {
      return false;
    }
  } catch {
    return false;
  }
  const validLunar = (date: LunarDate) =>
    date &&
    Number.isInteger(date.year) &&
    date.year >= MIN_YEAR - 1 &&
    date.year <= MAX_YEAR &&
    Number.isInteger(date.month) &&
    date.month >= 1 &&
    date.month <= 12 &&
    Number.isInteger(date.day) &&
    date.day >= 1 &&
    date.day <= 30 &&
    typeof date.isLeapMonth === 'boolean';
  if (
    !validLunar(chart.lunar) ||
    !validLunar(chart.effectiveLunar) ||
    !Array.isArray(chart.palaces) ||
    chart.palaces.length !== 12 ||
    new Set(chart.palaces.map((palace) => palace.name)).size !== 12 ||
    new Set(chart.palaces.map((palace) => palace.branchIndex)).size !== 12 ||
    chart.palaces.filter((palace) => palace.isBodyPalace).length !== 1 ||
    !['Thủy Nhị Cục', 'Mộc Tam Cục', 'Kim Tứ Cục', 'Thổ Ngũ Cục', 'Hỏa Lục Cục'].includes(
      chart.cuc,
    ) ||
    !chart.napAm?.name ||
    !['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'].includes(chart.napAm.element) ||
    !['split_at_15', 'same_month'].includes(chart.provenance.leapPolicy) ||
    !['civil_midnight', 'next_day_at_23'].includes(chart.provenance.ziPolicy)
  ) {
    return false;
  }
  const stars: ChartStar[] = [];
  const auxiliaryNames: string[] = [];
  for (const palace of chart.palaces) {
    if (
      !Object.hasOwn(PALACE_CONTENT, palace.name) ||
      !Number.isInteger(palace.branchIndex) ||
      palace.branchIndex < 0 ||
      palace.branchIndex > 11 ||
      palace.branch !== BRANCHES[palace.branchIndex] ||
      !Array.isArray(palace.stars)
    ) {
      return false;
    }
    for (const star of palace.stars) {
      if (
        typeof star.name !== 'string' ||
        typeof star.brightness !== 'string' ||
        typeof star.transformation !== 'string' ||
        !['major', 'minor', 'auxiliary'].includes(star.group)
      ) {
        return false;
      }
      if (star.group === 'major') stars.push(star);
      else if (
        AUXILIARY_GROUPS.some((group) =>
          group.names.some((name) => name === canonicalStarName(star.name)),
        )
      )
        auxiliaryNames.push(canonicalStarName(star.name));
    }
  }
  return (
    stars.length === 14 &&
    new Set(stars.map((star) => star.name)).size === 14 &&
    MAJOR_STAR_NAMES.every((name) => stars.some((star) => star.name === name)) &&
    new Set(auxiliaryNames).size === auxiliaryNames.length
  );
}

function readStars(
  palace: ChartPalace,
  catalog: Readonly<Record<string, StarMeaning>>,
): StarReading[] {
  // Preserve engine attributes as evidence; do not turn dignity into numerical scores.
  return palace.stars
    .filter((star) => star.group === 'major')
    .map((star) => ({
      name: star.name,
      brightness: star.brightness,
      transformation: star.transformation,
      theme: catalog[star.name].theme,
      reflection: catalog[star.name].reflection,
      sourceIds: [...catalog[star.name].sourceIds],
      passageIds: [STAR_PASSAGE_IDS[star.name], 'context-not-uniform'],
    }));
}

function starDescription(stars: StarReading[]): string {
  return stars.length
    ? stars.map((star) => star.name).join(', ')
    : 'không có chính tinh tọa thủ (vô chính diệu)';
}

function readPalace(
  palace: ChartPalace,
  palaces: ChartPalace[],
  catalog: Readonly<Record<string, StarMeaning>>,
): PalaceReading {
  const content = PALACE_CONTENT[palace.name];
  const directStars = readStars(palace, catalog);
  const relatedPalaces: RelatedPalaceReading[] = [4, 8, 6].map((offset) => {
    const related = palaces.find(
      (candidate) => candidate.branchIndex === mod(palace.branchIndex + offset, 12),
    )!;
    return {
      relation: offset === 6 ? 'opposition' : 'trine',
      name: related.name,
      branch: related.branch,
      stars: readStars(related, catalog),
    };
  });
  const placement = directStars.length
    ? `Chính tinh tọa thủ tại ${palace.branch}: ${starDescription(directStars)}.`
    : `Cung tại ${palace.branch} không có chính tinh tọa thủ (vô chính diệu: cung không có chính tinh riêng), các sao ở cung liên hệ vẫn ở cung gốc, không được chuyển thành sao tọa thủ.`;
  const insights = readContextualGroups(palace, palaces);
  const consideredNames = new Set(
    insights
      .filter((insight) => insight.ruleId.startsWith('pair-'))
      .flatMap((insight) =>
        insight.evidence.flatMap((item) => item.stars.map((star) => star.name)),
      ),
  );
  return {
    name: palace.name,
    branch: palace.branch,
    title: content.title,
    overview: `${placement} ${PALACE_ACTIONS[palace.name].overview}`,
    reflection: PALACE_ACTIONS[palace.name].reflection,
    directStars,
    uninterpretedStars: palace.stars
      .filter((star) => star.group !== 'major' && !consideredNames.has(star.name))
      .map((star) => star.name),
    relatedPalaces,
    sourceIds: unique([
      ...PALACE_SOURCE_IDS,
      'structure-reference',
      ...directStars.flatMap((star) => star.sourceIds),
      ...relatedPalaces.flatMap((related) => related.stars.flatMap((star) => star.sourceIds)),
      ...insights.flatMap((insight) => insight.passageIds.map((id) => resolvePassage(id).sourceId)),
    ]),
    insights,
  };
}

/** Local reference reading, not a prediction engine or expert-certified personal assessment. */
export function calculateInterpretation(
  chart: ChartResult,
  catalog: Readonly<Record<string, StarMeaning>> = STAR_CATALOG,
): InterpretationResult {
  if (chart.provenance?.profile !== RULE_PROFILE) {
    return {
      status: 'unavailable',
      reason: 'unsupported-profile',
      message: 'Chưa có nội dung tham khảo cho cấu hình an sao này.',
    };
  }
  if (!isStructurallyValid(chart)) {
    return {
      status: 'unavailable',
      reason: 'invalid-chart',
      message: 'Lá số chưa đạt kiểm tra cấu trúc để tạo bản đọc tham khảo.',
    };
  }
  if (
    MAJOR_STAR_NAMES.some(
      (name) =>
        !Object.hasOwn(catalog, name) ||
        !catalog[name].theme ||
        !catalog[name].reflection ||
        !catalog[name].sourceIds.length ||
        catalog[name].sourceIds.some(
          (id) => !INTERPRETATION_SOURCES.some((source) => source.id === id),
        ),
    )
  ) {
    return {
      status: 'unavailable',
      reason: 'incomplete-catalog',
      message: 'Kho nội dung chưa đủ căn cứ để tạo bản đọc tham khảo.',
    };
  }
  const menh = chart.palaces.find((palace) => palace.name === 'Mệnh')!;
  const than = chart.palaces.find((palace) => palace.isBodyPalace)!;
  const menhStars = readStars(menh, catalog);
  const thanStars = readStars(than, catalog);
  const palaces = chart.palaces.map((palace) => readPalace(palace, chart.palaces, catalog));
  const thematicReadings = readThemes(chart.palaces);
  const themes = unique(menhStars.map((star) => star.theme));
  const paragraphs = [
    `Cung Mệnh an tại ${menh.branch}, ${menhStars.length ? 'có chính tinh tọa thủ' : ''} ${starDescription(menhStars)}. ${themes.length ? `Các chủ đề biểu tượng để đối chiếu với trải nghiệm của bạn: ${themes.join('; ')}.` : 'Đọc thêm các cung tam hợp và đối cung bên dưới; không có chính tinh tọa thủ không đồng nghĩa tốt hoặc xấu.'}`,
    `Thân cư ${than.name}, tại ${than.branch}, ${thanStars.length ? 'có chính tinh tọa thủ' : ''} ${starDescription(thanStars)}. ${PALACE_CONTENT[than.name].question}`,
    `Dữ kiện nạp âm: ${chart.napAm.name} (${chart.napAm.element}); Cục: ${chart.cuc}. Đây là hai hệ phân loại riêng, không quy đổi thành mức may mắn hoặc kết luận hợp/khắc quyết định cuộc sống.`,
    'Tam hợp và đối cung bên dưới được xác định từ vị trí địa chi. Việc liệt kê các sao liên hệ không phải một công thức dự báo hay kết luận tổng hợp tốt/xấu.',
  ];
  return {
    status: 'ready',
    version: INTERPRETATION_VERSION,
    profile: chart.provenance.profile,
    knowledgeProfile: KNOWLEDGE_PROFILE.id,
    reviewStatus: 'reference-unvalidated',
    summary: {
      paragraphs,
      facts: [
        { label: 'Mệnh', value: `${menh.name} tại ${menh.branch}` },
        { label: 'Thân cư', value: `${than.name} tại ${than.branch}` },
        { label: 'Cục', value: chart.cuc },
        { label: 'Nạp âm', value: `${chart.napAm.name} · ${chart.napAm.element}` },
        { label: 'Mệnh chủ', value: chart.soul },
        { label: 'Thân chủ', value: chart.body },
      ],
      focusPalace: than.name,
      insights: [readMenhThan(menh, than)],
    },
    palaces,
    themes: thematicReadings,
    sourceIds: unique([
      ...palaces.flatMap((palace) => palace.sourceIds),
      ...readMenhThan(menh, than).passageIds.map((id) => resolvePassage(id).sourceId),
      ...thematicReadings.flatMap((theme) =>
        theme.insights.flatMap((insight) =>
          insight.passageIds.map((id) => resolvePassage(id).sourceId),
        ),
      ),
    ]),
    warnings: unique([
      ...chart.warnings,
      'Chỉ xét nhóm Tả Phụ–Hữu Bật và Văn Xương–Văn Khúc khi đủ cả cặp và ngữ cảnh chính tinh. Khôi–Việt chưa kích hoạt vì chưa đối chiếu đủ cách an sao. Các kết nối là diễn giải biên tập có nguồn biểu tượng, chưa phải quy tắc dự báo được kiểm chứng. Chưa luận cách cục, đại hạn hay lưu niên; miếu/vượng và Tứ Hóa chỉ hiển thị.',
      'Tài liệu cổ được dùng để tham khảo biểu tượng sao, không chứng nhận cấu hình an sao hiện tại. Quy tắc tháng nhuận trong nguồn cổ và engine có thể khác nhau.',
      ...(chart.effectiveLunar.isLeapMonth
        ? [
            'Ngày sinh dùng tháng nhuận: nguồn cổ nêu tháng giêng nhuận an như tháng hai và yêu cầu tháng nhuận khác theo ví dụ này; khác chính sách chia ngày 15 hoặc giữ tháng hiện tại, chưa hòa giải cách an sao đầy đủ. Bản đọc này không xác nhận cách an tháng nhuận theo nguồn đó.',
          ]
        : []),
      'Bản đọc tham khảo theo biểu tượng truyền thống, được tổng hợp bằng quy tắc và nội dung cố định; không phải phản hồi từ AI trực tuyến hoặc chứng nhận của chuyên gia con người.',
      'Không dự báo vận hạn, chẩn đoán sức khỏe, đánh giá con người hoặc thay thế quyết định tài chính và quan hệ của bạn.',
    ]),
  };
}
