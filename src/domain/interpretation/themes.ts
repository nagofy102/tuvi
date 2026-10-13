import type { ChartPalace } from '../astrology/types';
import { readContextualGroups, readMenhThan } from './context';
import { resolveRule } from './knowledge';
import type { ContextualInsight, ReadingConcern, ThematicReading } from './types';

const TOPICS = [
  {
    concern: 'career',
    title: 'Làm việc rõ trách nhiệm, giữ sức cho đường dài',
    names: ['Mệnh', 'Quan Lộc', 'Nô Bộc'],
    paragraphs: [
      'Chọn một việc đang chậm tiến độ: ghi riêng phần bạn trực tiếp làm, phần cần người khác phối hợp và người chốt quyết định. Đặt ba danh sách cạnh nhau để tìm chỗ một người đang phải nhận quá nhiều vai.',
      'Trong buổi trao đổi tiếp theo, chốt người phụ trách, hạn hoàn thành và một mốc báo vướng mắc trước hạn. Sau một tuần, đối chiếu số đầu việc hoàn tất với số buổi bạn phải làm bù ngoài giờ.',
    ],
    selfCheck:
      'Trong ba việc gần nhất, bạn nhận làm thay bao nhiêu lần khi người khác chưa kịp hoàn thành? Ghi lại việc cụ thể thay vì tự gắn nhãn mình là người giỏi hay yếu.',
    adjustment:
      'Nếu bạn đang nhận phần khó rồi làm luôn phần của người khác, hãy giao lại một đầu việc có tiêu chí nghiệm thu rõ và đặt lịch kiểm tra giữa chặng; giữ một khoảng nghỉ không nhận việc mới.',
  },
  {
    concern: 'finance',
    title: 'Nối công sức với cách giữ và dùng tiền',
    names: ['Tài Bạch', 'Quan Lộc', 'Điền Trạch'],
    paragraphs: [
      'Mở bảng chi của 30 ngày vừa qua, tách khoản thiết yếu, khoản phục vụ công việc và khoản mua ngay khi thấy hứng thú. Đối chiếu từng nhóm với thu nhập thực nhận, không dùng thu nhập dự kiến để cân đối.',
      'Trước một khoản mua lớn, viết tổng chi phí sau phí phát sinh, phần tiền còn lại và việc cần hoãn nếu mua ngay. Hẹn một thời điểm xem lại bảng trước khi đặt cọc hoặc chuyển tiền.',
    ],
    selfCheck:
      'Ba khoản mua gần nhất có khoản nào bạn quyết định trong ngày rồi phải cắt một chi phí thiết yếu? Ghi số tiền và thời điểm quyết định để kiểm tra chính hành vi đó.',
    adjustment:
      'Nếu chi tiêu theo cảm xúc làm hụt khoản cần thiết, tách tiền thiết yếu ngay khi nhận thu nhập và cho khoản mua chưa cấp thiết một ngày chờ; hỏi người có chuyên môn khi điều khoản chưa rõ.',
  },
  {
    concern: 'relationship',
    title: 'Nói rõ nhu cầu, chăm sóc sự đồng hành',
    names: ['Phu Thê', 'Phúc Đức', 'Thiên Di'],
    paragraphs: [
      'Khi có chuyện chưa thống nhất với người bạn đời, kể lại một tình huống cụ thể, nói bạn cần điều gì và hỏi nhu cầu của người bạn đời. Nhắc lại điều vừa nghe trước khi đề xuất cách giải quyết.',
      'Chọn một việc chung trong tuần, thống nhất ai làm phần nào và lúc nào cùng xem lại. Nếu chưa có người bạn đời, dùng bài tập này cho một quan hệ gắn bó bạn đang xây dựng.',
    ],
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
    const distinctGroups = relevantGroups.filter(
      (insight, index) =>
        relevantGroups.findIndex((item) => item.ruleId === insight.ruleId) === index,
    );
    const groupActions = distinctGroups.map((insight) => insight.text);
    const support = distinctGroups.some((insight) => insight.ruleId === 'pair-support');
    const literacy = distinctGroups.some((insight) => insight.ruleId === 'pair-literacy');
    const selfCheck = support
      ? `Trong chủ đề ${topic.concern === 'career' ? 'công việc' : topic.concern === 'finance' ? 'tiền bạc' : 'đồng hành'}, chọn một việc bạn vừa tự làm thay phần đã giao cho người khác: thỏa thuận ban đầu có ghi rõ kết quả cần đạt và thời điểm hoàn thành không?`
      : literacy
        ? 'Chọn một lần bạn quyết định dựa trên lời nói hoặc tin nhắn: dữ kiện nào đã được ghi lại và kiểm tra từ nguồn đầu tiên? Ghi một điểm hai người đã hiểu khác nhau.'
        : topic.selfCheck;
    const adjustment = support
      ? 'Nếu bạn nhận làm thay vì yêu cầu chưa rõ, viết lại kết quả cần đạt, người phụ trách và mốc báo vướng mắc; để người nhận việc xác nhận trước khi bắt đầu.'
      : literacy
        ? 'Nếu trao đổi thiếu ghi chép dẫn đến làm lại, chốt ba dòng: việc cần làm, dữ kiện đã xác nhận và điều còn phải hỏi; gửi người liên quan xác nhận trước khi quyết định.'
        : topic.adjustment;
    return {
      id: `theme-${topic.concern}`,
      concern: topic.concern,
      title: topic.title,
      paragraphs: [...topic.paragraphs, ...groupActions],
      selfCheck,
      adjustment,
      palaceNames: [...topic.names],
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
