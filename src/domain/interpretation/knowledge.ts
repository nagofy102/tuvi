import { RULE_PROFILE } from '../astrology/profile';

export type KnowledgeStatus = 'text-reviewed' | 'editorial' | 'disputed' | 'deferred';

export interface KnowledgePassage {
  id: string;
  sourceId: string;
  heading: string;
  excerpt: string;
  reading: string;
}

export interface KnowledgeRule {
  id: string;
  status: KnowledgeStatus;
  passageIds: string[];
  interpretation: string;
  limits: string;
}

// Pinned textual evidence; Vietnamese readings are our own bounded paraphrases.
const principalPassages = [
  ['Tử Vi', '問紫微所主若何？', '帝座', 'Vai trò điều phối, không phải lời hứa địa vị.'],
  ['Thiên Cơ', '問天機所主如何？', '有靈機應變之志', 'Suy xét và thích nghi.'],
  ['Thái Dương', '問太陽所主若何？', '官祿之樞機', 'Đóng góp và trách nhiệm công khai.'],
  ['Vũ Khúc', '問武曲星所主為何？', '財帛宮主', 'Quản lý nguồn lực, không suy ra thu nhập.'],
  ['Thiên Đồng', '問天同星所主若何？', '稟性溫和', 'Chủ đề hài hòa và nghỉ ngơi.'],
  ['Liêm Trinh', '問廉貞所主若何？', '司品秩', 'Quy tắc và ranh giới, không phán đạo đức.'],
  ['Thiên Phủ', '問天府所主若何？', '天府為祿庫', 'Gìn giữ và phân bổ nguồn lực.'],
  ['Thái Âm', '問太陰星所主若何？', '為田宅主', 'Chăm chút nền tảng đời sống riêng.'],
  [
    'Tham Lang',
    '問貪狼所主若何？',
    '化氣為桃花',
    'Trải nghiệm và giao tiếp, không phán chung thủy.',
  ],
  ['Cự Môn', '問巨門所主若何？', '口舌', 'Lời nói và làm rõ thông tin.'],
  ['Thiên Tướng', '問天相星所主若何？', '化氣曰印', 'Phối hợp và trách nhiệm.'],
  [
    'Thiên Lương',
    '問天梁星所主若何？',
    '化氣為蔭',
    'Bảo trợ và kinh nghiệm, không hứa tránh tai họa.',
  ],
  ['Thất Sát', '問七殺星所主若何？', '斗中之上將', 'Tự chủ và cân nhắc trước hành động.'],
  ['Phá Quân', '問破軍所主若何？', '化氣曰耗', 'Thay đổi và quản lý hao phí.'],
] as const;

export const STAR_PASSAGE_IDS: Readonly<Record<string, string>> = Object.fromEntries(
  principalPassages.map(([name], index) => [name, `principal-${index + 1}`]),
);

export const KNOWLEDGE_PASSAGES: readonly KnowledgePassage[] = [
  ...principalPassages.map(([, heading, excerpt, reading], index) => ({
    id: `principal-${index + 1}`,
    sourceId: 'classical-stars-vol1',
    heading,
    excerpt,
    reading,
  })),
  {
    id: 'support-left',
    sourceId: 'classical-stars-vol1',
    heading: '问左辅所主若何？',
    excerpt: '紫府禄权若得三合冲照',
    reading:
      'Nguồn xét Tả Phụ trong ngữ cảnh hội chiếu; chỉ giữ chủ đề hỗ trợ, bỏ kết luận địa vị.',
  },
  {
    id: 'support-right',
    sourceId: 'classical-stars-vol1',
    heading: '问右弼所主若何？',
    excerpt: '辅弼为上相，辅佐紫微星',
    reading: 'Chủ đề phụ trợ và phối hợp trong hệ biểu tượng; không hứa thành công.',
  },
  {
    id: 'literacy-chang',
    sourceId: 'classical-stars-vol1',
    heading: '問文昌星所主若何？',
    excerpt: '博文廣記',
    reading: 'Văn Xương gợi học hỏi và ghi nhớ; không suy ra bằng cấp hoặc trí tuệ.',
  },
  {
    id: 'literacy-qu',
    sourceId: 'classical-stars-vol1',
    heading: '问文曲星所主若何？',
    excerpt: '与文昌同协',
    reading: 'Văn Khúc có ngữ cảnh phối hợp với Văn Xương; diễn đạt hiện đại về học và trình bày.',
  },
  {
    id: 'assistance-kui-yue',
    sourceId: 'classical-stars-vol1',
    heading: '问天魁天钺星所主若何？',
    excerpt: '若魁临命，钺守身，更迭相守',
    reading:
      'Nguồn có điều kiện vị trí riêng cho Khôi/Việt; bản đọc chỉ đặt câu hỏi về hỗ trợ, không mở rộng thành lời hứa quý nhân.',
  },
  {
    id: 'ziwei-support',
    sourceId: 'classical-stars-vol1',
    heading: '問紫微所主若何？',
    excerpt: '以左輔右弼為相，以天相昌曲為從，以魁鉞為傳令',
    reading: 'Vai trò Tử Vi có ngữ cảnh các sao phụ trợ; không áp dụng kết luận địa vị trong sách.',
  },
  {
    id: 'context-not-uniform',
    sourceId: 'classical-context-vol1',
    heading: '太微賦',
    excerpt: '不可一概論議',
    reading: 'Không luận mọi trường hợp như nhau; không kết luận từ một sao riêng lẻ.',
  },
  {
    id: 'context-not-binary',
    sourceId: 'classical-context-vol1',
    heading: '增補太微賦',
    excerpt: '凶不皆凶，吉無純吉',
    reading: 'Không chuyển biểu tượng cát/hung thành nhãn tốt/xấu tuyệt đối.',
  },
  {
    id: 'layout-palaces',
    sourceId: 'classical-layout-vol2',
    heading: '安十二宫例',
    excerpt: '命、兄弟、妻妾、子女、财帛、疾厄、迁移、奴仆、官禄、田宅、福德、父母',
    reading: 'Chuỗi tên cung; tên hiện đại và câu hỏi tự đối chiếu là biên tập của dự án.',
  },
  {
    id: 'leap-first-month',
    sourceId: 'classical-layout-vol2',
    heading: '安身命例',
    excerpt: '又若闰月正月生者要在二月内起安身命，凡有闰月具要依此为例',
    reading:
      'Nguồn nêu tháng giêng nhuận an trong tháng hai và yêu cầu các tháng nhuận theo ví dụ này; khác chính sách chia ngày 15/giữ tháng.',
  },
];

export const KNOWLEDGE_RULES: readonly KnowledgeRule[] = [
  ...principalPassages.map(([name], index) => ({
    id: `symbol-${index + 1}`,
    status: 'text-reviewed' as const,
    passageIds: [`principal-${index + 1}`, 'context-not-uniform'],
    interpretation: `Từ điển biểu tượng ${name}; không phải nhận định cá nhân.`,
    limits: 'Chỉ giải nghĩa thuật ngữ; không nhận diện tính cách hoặc kết quả đời sống từ một sao.',
  })),
  {
    id: 'pair-support',
    status: 'editorial',
    passageIds: ['support-left', 'support-right', 'context-not-uniform'],
    interpretation:
      'Đối chiếu cả Tả Phụ và Hữu Bật trong tam phương tứ chính với chính tinh và chủ đề cung: câu hỏi về phối hợp, phân chia trách nhiệm.',
    limits:
      'Cần cả hai sao và ít nhất một chính tinh trong bốn cung. Điều kiện ứng dụng là bộ lọc biên tập, không phải cách cục cổ hoặc dự báo.',
  },
  {
    id: 'pair-literacy',
    status: 'editorial',
    passageIds: ['literacy-chang', 'literacy-qu', 'context-not-uniform'],
    interpretation:
      'Đối chiếu cả Văn Xương và Văn Khúc cùng ngữ cảnh cung và chính tinh: câu hỏi về học, ghi chép, trình bày.',
    limits: 'Không suy ra tài năng, điểm thi, bằng cấp. Không gọi hội chiếu là đồng cung.',
  },
  {
    id: 'pair-assistance',
    status: 'deferred',
    passageIds: ['assistance-kui-yue', 'context-not-uniform'],
    interpretation:
      'Chỉ xét Khôi tọa Mệnh và Việt tại cung an Thân, cùng trong bốn cung và có chính tinh: đặt câu hỏi tìm hỗ trợ.',
    limits:
      'Không mở rộng điều kiện Khôi Mệnh/Việt Thân; chưa đối chiếu đủ cách an cặp sao. Không hứa quý nhân hay thành tựu.',
  },
  {
    id: 'ziwei-support-context',
    status: 'editorial',
    passageIds: ['ziwei-support', 'support-left', 'support-right', 'context-not-uniform'],
    interpretation:
      'Tử Vi tọa thủ, cả Tả Phụ/Hữu Bật trong bốn cung: đặt vai trò điều phối bên cạnh cách tổ chức hỗ trợ.',
    limits: 'Không nhận diện cách cục, không dự đoán chức vị; không dùng một sao để kết luận.',
  },
  {
    id: 'palace-context',
    status: 'editorial',
    passageIds: ['layout-palaces', 'context-not-uniform'],
    interpretation: 'Chọn câu hỏi theo chủ đề cung; hiện đại hóa thuật ngữ và loại bỏ định kiến.',
    limits: 'Nội dung biên tập, không giả làm nguyên văn sách.',
  },
  {
    id: 'menh-than-context',
    status: 'editorial',
    passageIds: ['layout-palaces', 'context-not-uniform'],
    interpretation:
      'Đối chiếu dữ kiện Mệnh và cung an Thân như hai ngữ cảnh đọc, không áp đặt tuổi chuyển vận.',
    limits: 'Không khẳng định Thân quyết định hậu vận hoặc gộp sao ở hai cung thành đồng cung.',
  },
  {
    id: 'four-directions-context',
    status: 'editorial',
    passageIds: ['context-not-uniform', 'context-not-binary'],
    interpretation:
      'Đọc tọa thủ và các cung cách 4, 8, 6 địa chi như ngữ cảnh; không chuyển sao khỏi cung gốc.',
    limits: 'Hình học tính từ lá số, không phải công thức tổng hợp cát/hung được chứng nhận.',
  },
  {
    id: 'leap-policy-conflict',
    status: 'disputed',
    passageIds: ['leap-first-month'],
    interpretation: 'Giữ lựa chọn của biểu mẫu và hiển thị bất đồng nguồn, không tự đổi hồ sơ.',
    limits:
      'Nguồn khái quát theo ví dụ tháng giêng nhuận, nhưng chưa hòa giải cách tính ngày/an sao đầy đủ hoặc đối chiếu trường phái Bắc/Nam.',
  },
  {
    id: 'formations-gate',
    status: 'deferred',
    passageIds: ['context-not-uniform', 'context-not-binary'],
    interpretation: 'Chưa nhận diện cách cục hoặc luận vận hạn.',
    limits:
      'Cần định nghĩa vị trí, trạng thái, hội chiếu, loại trừ và fixture độc lập trước khi kích hoạt.',
  },
];

export const KNOWLEDGE_PROFILE = {
  id: 'huyenvi-source-bounded-v1',
  chartProfile: RULE_PROFILE,
  school: 'Cấu hình iztro + lịch Việt Nam; chưa gán nhãn Nam Phái/Bắc Phái',
  review: 'AI-assisted textual review; not independent practitioner validation',
  defaults: { ziPolicy: 'civil_midnight', leapPolicy: 'split_at_15' },
  allowedVariants: {
    ziPolicy: ['civil_midnight', 'next_day_at_23'],
    leapPolicy: ['split_at_15', 'same_month'],
  },
  differences: [
    {
      id: 'leap',
      status: 'disputed',
      ruleId: 'leap-policy-conflict',
      detail:
        'Nguồn cổ dùng tháng kế theo ví dụ tháng giêng nhuận và khái quát cho tháng nhuận khác; khác cả hai lựa chọn hiện có, chưa hòa giải an sao đầy đủ.',
    },
    {
      id: 'zi',
      status: 'deferred',
      detail:
        '00:00/23:00 là lựa chọn kỹ thuật được công bố; chưa có nguồn trong hồ sơ này chốt trường phái.',
    },
    {
      id: 'transformations',
      status: 'deferred',
      detail:
        'Tứ Hóa và miếu/vượng chỉ hiển thị theo iztro; chưa hòa giải bảng giữa các bản/trường phái.',
    },
    {
      id: 'other-stars',
      status: 'deferred',
      detail: 'Khốc/Hư, Đào/Hồng và các phụ tinh ngoài nhóm đã ghi nguồn chưa dùng để luận.',
    },
    {
      id: 'kui-yue',
      status: 'deferred',
      detail:
        'Khôi/Việt có đoạn sách về Khôi tọa Mệnh–Việt tại Thân nhưng chưa hòa giải khẩu quyết an sao; chưa kích hoạt luận nhóm này.',
    },
  ],
} as const;

export function resolvePassage(id: string): KnowledgePassage {
  const passage = KNOWLEDGE_PASSAGES.find((item) => item.id === id);
  if (!passage) throw new Error(`Unresolved knowledge passage: ${id}`);
  return passage;
}

export function resolveRule(id: string): KnowledgeRule {
  const rule = KNOWLEDGE_RULES.find((item) => item.id === id);
  if (!rule) throw new Error(`Unresolved knowledge rule: ${id}`);
  return rule;
}
