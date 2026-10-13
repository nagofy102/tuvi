import type { ChartPalace, ChartStar } from '../astrology/types';
import { mod } from '../astrology/sexagenary';
import { resolveRule } from './knowledge';
import { PALACE_ACTIONS } from './palace-actions';
import type { ContextualInsight, ReadingEvidence } from './types';

// The upstream Vietnamese label for 左輔 is Tả Phù. Preserve it in evidence.
export function canonicalStarName(name: string): string {
  return name === 'Tả Phù' ? 'Tả Phụ' : name;
}

export const AUXILIARY_GROUPS = [
  {
    ruleId: 'pair-support',
    names: ['Tả Phụ', 'Hữu Bật'],
    title: 'Phối hợp và phân chia trách nhiệm',
    question:
      'Chọn một việc chung tuần này, ghi tên người nhận từng phần và hỏi lại hạn hoàn thành trước khi bắt đầu.',
  },
  {
    ruleId: 'pair-literacy',
    names: ['Văn Xương', 'Văn Khúc'],
    title: 'Học hỏi và diễn đạt',
    question:
      'Trước khi chốt một việc, ghi ba dữ kiện đang dùng và nguồn kiểm tra; nhờ người liên quan nhắc lại yêu cầu để phát hiện chỗ hiểu khác nhau.',
  },
  {
    ruleId: 'pair-assistance',
    names: ['Thiên Khôi', 'Thiên Việt'],
    title: 'Tìm và đánh giá sự hỗ trợ',
    question:
      'Ai có chuyên môn phù hợp để bạn tham khảo, và bạn sẽ kiểm tra chất lượng lời khuyên ra sao?',
  },
] as const;

function evidence(
  palace: ChartPalace,
  relation: ReadingEvidence['relation'],
  stars = palace.stars,
): ReadingEvidence {
  return {
    palace: palace.name,
    branch: palace.branch,
    relation,
    stars: stars.map(({ name, brightness, transformation }) => ({
      name,
      brightness,
      transformation,
    })),
  };
}

export function fourPalaces(origin: ChartPalace, palaces: ChartPalace[]): ChartPalace[] {
  return [0, 4, 8, 6].map((offset) =>
    palaces.find((p) => p.branchIndex === mod(origin.branchIndex + offset, 12))!,
  );
}

function relationship(index: number): ReadingEvidence['relation'] {
  return index === 0 ? 'direct' : index === 3 ? 'opposition' : 'trine';
}

function scopedEvidence(scope: ChartPalace[], required: readonly string[]): ReadingEvidence[] {
  return scope.map((palace, index) =>
    evidence(
      palace,
      relationship(index),
      palace.stars.filter(
        (star) => star.group === 'major' || required.includes(canonicalStarName(star.name)),
      ),
    ),
  );
}

function hasOneOfEach(scope: ChartPalace[], names: readonly string[]): boolean {
  const candidates = scope
    .flatMap((palace) => palace.stars)
    .filter((star) => star.group !== 'major');
  return names.every(
    (name) => candidates.filter((star) => canonicalStarName(star.name) === name).length === 1,
  );
}

export function readContextualGroups(
  origin: ChartPalace,
  palaces: ChartPalace[],
): ContextualInsight[] {
  const scope = fourPalaces(origin, palaces);
  const principals = scope.flatMap((p) => p.stars.filter((star) => star.group === 'major'));
  const contextual: ContextualInsight = {
    ruleId: 'four-directions-context',
    title: 'Đối chiếu các góc nhìn liên hệ',
    text: `${PALACE_ACTIONS[origin.name].overview} Đối chiếu tình huống đó với các góc nhìn từ ${scope
      .slice(1)
      .map((p) => p.name)
      .join(', ')}; chọn một việc bạn sẽ làm khác trong lần tiếp theo.`,
    why: `Cung ${origin.name} tại ${origin.branch} là điểm đọc; hai cung cách 4/8 địa chi là tam hợp, cung cách 6 là đối cung. Đây là liên hệ vị trí thực tế và câu hỏi biên tập, không phải lời phán trong sách.`,
    passageIds: [
      ...resolveRule('four-directions-context').passageIds,
      ...resolveRule('palace-context').passageIds,
    ],
    evidence: scopedEvidence(scope, []),
  };
  const insights = [contextual];
  if (!principals.length) return insights;
  for (const group of AUXILIARY_GROUPS) {
    if (resolveRule(group.ruleId).status !== 'editorial') continue;
    if (!hasOneOfEach(scope, group.names)) continue;
    // Do not generalize the source's explicit Khôi-at-Mệnh / Việt-at-Thân condition.
    if (group.ruleId === 'pair-assistance') {
      const body = palaces.find((palace) => palace.isBodyPalace)!;
      if (
        origin.name !== 'Mệnh' ||
        !origin.stars.some((s) => s.name === 'Thiên Khôi' && s.group !== 'major') ||
        !body.stars.some((s) => s.name === 'Thiên Việt' && s.group !== 'major')
      )
        continue;
    }
    const proof = scopedEvidence(scope, group.names);
    const placements = proof.flatMap((p) =>
      p.stars
        .filter((star) => group.names.some((name) => name === canonicalStarName(star.name)))
        .map((star) => `${star.name} ở ${p.palace} (${p.branch})`),
    );
    insights.push({
      ruleId: group.ruleId,
      title: group.title,
      text: group.question,
      why: `Có đủ hai thành viên: ${placements.join('; ')}; cùng ngữ cảnh các chính tinh ${principals.map((s) => s.name).join(', ')} trong bốn cung. ${group.ruleId === 'pair-assistance' ? 'Khôi tọa Mệnh và Việt ở cung an Thân đúng điều kiện đoạn trích; chưa đối chiếu đầy đủ thuật toán an Khôi/Việt.' : 'Bộ lọc này do dự án biên tập để tránh luận từ một sao.'} Không đồng nhất hội chiếu với đồng cung hay cách cục cổ.`,
      passageIds: [...resolveRule(group.ruleId).passageIds, 'layout-palaces'],
      evidence: proof,
    });
  }
  if (
    origin.stars.some((star) => star.name === 'Tử Vi' && star.group === 'major') &&
    hasOneOfEach(scope, ['Tả Phụ', 'Hữu Bật'])
  ) {
    insights.push({
      ruleId: 'ziwei-support-context',
      title: 'Vai trò điều phối đặt cạnh nguồn hỗ trợ',
      text: 'Trước khi nhận việc điều phối, liệt kê phần cần bạn quyết định và phần giao cho người khác. Nếu bạn đang tự làm hết để tránh chậm tiến độ, giao lại một phần có tiêu chí hoàn tất rõ rồi đặt một mốc kiểm tra giữa chặng.',
      why: `Tử Vi thực sự tọa thủ tại ${origin.name} (${origin.branch}); cả Tả Phụ và Hữu Bật nằm trong bốn cung đang xét. Đoạn nguồn nêu các vai trò phụ trợ cho Tử Vi; câu hỏi ứng dụng là diễn đạt hiện đại, không giữ lời phán cát/hung.`,
      passageIds: [...resolveRule('ziwei-support-context').passageIds],
      evidence: scopedEvidence(scope, ['Tả Phụ', 'Hữu Bật']),
    });
  }
  return insights;
}

export function readMenhThan(menh: ChartPalace, than: ChartPalace): ContextualInsight {
  const principalNames = (palace: ChartPalace) =>
    palace.stars
      .filter((s: ChartStar) => s.group === 'major')
      .map((s) => s.name)
      .join(', ') || 'vô chính diệu';
  return {
    ruleId: 'menh-than-context',
    title: 'Đối chiếu Mệnh và cung an Thân',
    text:
      menh.branchIndex === than.branchIndex
        ? `Mệnh và Thân cùng tại ${menh.branch}. Chọn một quyết định gần đây: ghi điều bạn muốn, việc bạn đã làm và điểm hai điều đó chưa khớp; chọn một thay đổi nhỏ cho tuần tới.`
        : `Mệnh tại ${menh.branch} và Thân cư ${than.name} tại ${than.branch} là hai ngữ cảnh riêng, không gộp. Ghi một việc bạn dành nhiều thời gian trong tuần và lý do nhận việc; đối chiếu với điều bạn coi trọng để quyết định giữ, giao lại hay từ chối một phần.`,
    why: `Dữ kiện Mệnh: ${principalNames(menh)}; dữ kiện cung an Thân: ${principalNames(than)}. Hai vị trí và chủ đề cung được dùng cùng nhau; câu hỏi kết nối là biên tập, không phải quy tắc phán hậu vận hoặc đổi vận ở một tuổi nhất định.`,
    passageIds: [...resolveRule('menh-than-context').passageIds],
    evidence: [
      evidence(
        menh,
        'direct',
        menh.stars.filter((s) => s.group === 'major'),
      ),
      evidence(
        than,
        'body',
        than.stars.filter((s) => s.group === 'major'),
      ),
    ],
  };
}
