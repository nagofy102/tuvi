import type { ChartPalace } from '../astrology/types';
import { readContextualGroups, readMenhThan } from './context';
import { resolveRule } from './knowledge';
import { buildReadingClaims, mergeContextualInsights } from './claims';
import { selectThemeExercise } from './theme-exercises';
import { readCareerNarrative } from './career-reading';
import type { ContextualInsight, ReadingConcern, ThematicReading } from './types';

const TOPICS = [
  {
    concern: 'career',
    title: 'Làm việc rõ trách nhiệm, giữ sức cho đường dài',
    names: ['Mệnh', 'Quan Lộc', 'Nô Bộc'],
    selfCheck:
      'Trong ba việc gần nhất, bạn nhận làm thay bao nhiêu lần khi người khác chưa kịp hoàn thành? Ghi lại việc cụ thể thay vì tự gắn nhãn mình là người giỏi hay yếu.',
    adjustment:
      'Nếu bạn đang nhận phần khó rồi làm luôn phần của người khác, hãy giao lại một đầu việc có tiêu chí nghiệm thu rõ và đặt lịch kiểm tra giữa chặng; giữ một khoảng nghỉ không nhận việc mới.',
  },
  {
    concern: 'finance',
    title: 'Nối công sức với cách giữ và dùng tiền',
    names: ['Tài Bạch', 'Quan Lộc', 'Điền Trạch'],
    selfCheck:
      'Ba khoản mua gần nhất có khoản nào bạn quyết định trong ngày rồi phải cắt một chi phí thiết yếu? Ghi số tiền và thời điểm quyết định để kiểm tra chính hành vi đó.',
    adjustment:
      'Nếu chi tiêu theo cảm xúc làm hụt khoản cần thiết, tách tiền thiết yếu ngay khi nhận thu nhập và cho khoản mua chưa cấp thiết một ngày chờ; hỏi người có chuyên môn khi điều khoản chưa rõ.',
  },
  {
    concern: 'relationship',
    title: 'Nói rõ nhu cầu, chăm sóc sự đồng hành',
    names: ['Phu Thê', 'Phúc Đức', 'Thiên Di'],
    selfCheck:
      'Trong lần trao đổi gần nhất, bạn đã hỏi một câu để hiểu người bạn đời hay chuyển ngay sang giải pháp? Ghi lại câu hỏi và câu trả lời, không đoán ý từ sự im lặng.',
    adjustment:
      'Nếu cuộc nói chuyện chuyển thành nhắc lỗi cũ, dừng lại, hẹn giờ trao đổi tiếp và chỉ chọn một tình huống cần giải quyết; mỗi người nói một nhu cầu và một việc mình nhận làm.',
  },
] as const;

function themeContext(palaces: ChartPalace[], names: readonly string[]): ContextualInsight {
  const scope = names.map((name) => palaces.find((palace) => palace.name === name)!);
  return {
    ruleId: 'palace-context',
    title: 'Căn cứ chọn các góc nhìn cho chủ đề',
    text: `Chủ đề nối ${names.join(' – ')} để bạn đối chiếu hành vi trong một tình huống thực tế.`,
    why: `Các cung ${scope.map((p) => `${p.name} tại ${p.branch}`).join('; ')} là những vị trí thực trong lá số. Việc chọn các cung cùng chủ đề là biên tập, không khẳng định chúng đồng cung hay đều tam hợp. Bài tập ứng dụng được dự án tự viết, không phải lời dự báo trong sách.`,
    passageIds: [...resolveRule('palace-context').passageIds],
    evidence: scope.map((palace) => ({
      palace: palace.name,
      branch: palace.branch,
      relation: 'direct',
      stars: palace.stars
        .filter((star) => star.group === 'major')
        .map(({ name, brightness, transformation }) => ({ name, brightness, transformation })),
    })),
  };
}

/** Editorial self-checks, never claims inferred personal traits from star positions. */
export function readThemes(palaces: ChartPalace[]): ThematicReading[] {
  const menh = palaces.find((palace) => palace.name === 'Mệnh')!;
  const than = palaces.find((palace) => palace.isBodyPalace)!;
  return TOPICS.map((topic) => {
    const relevantGroups = topic.names.flatMap((name) =>
      readContextualGroups(
        palaces.find((palace) => palace.name === name)!,
        palaces,
      ).filter(
        (insight) =>
          insight.ruleId.startsWith('pair-') || insight.ruleId === 'ziwei-support-context',
      ),
    );
    const distinctGroups = mergeContextualInsights(relevantGroups);
    const support = distinctGroups.some((insight) => insight.ruleId === 'pair-support');
    const literacy = distinctGroups.some((insight) => insight.ruleId === 'pair-literacy');
    const exercise = selectThemeExercise(topic.concern, support, literacy);
    const selfCheck = exercise?.selfCheck ?? topic.selfCheck;
    const adjustment = exercise?.adjustment ?? topic.adjustment;
    const careerReading =
      topic.concern === 'career' ? readCareerNarrative(palaces, distinctGroups) : undefined;
    return {
      id: `theme-${topic.concern}`,
      concern: topic.concern,
      title: careerReading?.title ?? exercise?.title ?? `Bài tập chung: ${topic.title}`,
      paragraphs: careerReading?.paragraphs ?? [
        `${exercise ? '' : 'Chưa có nhóm đủ điều kiện; đây là bài tập chung theo chủ đề. '}Trong mạch ${topic.concern === 'career' ? 'công việc' : topic.concern === 'finance' ? 'nguồn lực' : 'đồng hành'}, lá số của bạn có ${topic.names
          .map((name) => {
            const palace = palaces.find((item) => item.name === name)!;
            const stars = palace.stars
              .filter((star) => star.group === 'major')
              .map((star) => star.name);
            return `${name} tại ${palace.branch} (${stars.length ? stars.join(', ') : 'không có chính tinh riêng'})`;
          })
          .join('; ')}.`,
        adjustment,
      ],
      selfCheck: careerReading?.narrative.practice.prompt ?? selfCheck,
      adjustment: careerReading?.narrative.practice.action ?? adjustment,
      ...(careerReading ? { careerNarrative: careerReading.narrative } : {}),
      palaceNames: [...topic.names],
      claims: buildReadingClaims(palaces, topic.names),
      insights: [
        themeContext(palaces, topic.names),
        ...(topic.concern === 'career' || topic.names.some((name) => name === than.name)
          ? [readMenhThan(menh, than)]
          : []),
        ...distinctGroups,
      ],
    };
  });
}

/** Prioritization changes the reading order, never the chart or source evidence. */
export function sortThemes(themes: ThematicReading[], concern: ReadingConcern): ThematicReading[] {
  return [...themes].sort((a, b) => Number(b.concern === concern) - Number(a.concern === concern));
}
