import type { StarMeaning } from './types';

export interface InterpretationSource {
  id: string;
  title: string;
  url?: string;
  section: string;
  description: string;
}

export const INTERPRETATION_SOURCES: InterpretationSource[] = [
  {
    id: 'classical-stars-vol1',
    title: 'Tử Vi Đẩu Số Toàn Thư · 紫微斗數全書',
    url: 'https://zh.wikisource.org/w/index.php?title=紫微斗數全書/卷一&oldid=7913704#諸星問答論',
    section: 'Quyển I · Chư tinh vấn đáp luận',
    description:
      'Bản chép Wikisource. Chủ đề tiếng Việt được dự án biên soạn từ các mục về chính tinh và phụ tinh. Văn bản cổ thuộc phạm vi công cộng; phần biên tập website có điều khoản riêng. Chưa đối chiếu bản chụp sách.',
  },
  {
    id: 'classical-context-vol1',
    title: 'Tử Vi Đẩu Số Toàn Thư · ngữ cảnh',
    url: 'https://zh.wikisource.org/w/index.php?title=紫微斗數全書/卷一&oldid=7913704#太微賦',
    section: 'Quyển I · Thái vi phú / Tăng bổ Thái vi phú',
    description:
      'Đoạn tham chiếu về việc không luận đồng loạt và không coi cát/hung là tuyệt đối; không phải bằng chứng dự báo.',
  },
  {
    id: 'classical-layout-vol2',
    title: 'Tử Vi Đẩu Số Toàn Thư · bố cục',
    url: 'https://zh.wikisource.org/w/index.php?title=紫微斗數全書/卷二&oldid=1963110',
    section: 'Quyển II · An Thân Mệnh / An thập nhị cung',
    description:
      'Bản chép Wikisource; công thức và ví dụ dùng cho đối chiếu từng dữ kiện có nguồn. Các quy tắc an sao khác vẫn cần đối chiếu riêng.',
  },
  {
    id: 'editorial-palace-context',
    title: 'Ngữ cảnh 12 cung · biên soạn Huyền Vi',
    url: '/phuong-phap#luan-giai',
    section: 'Chủ đề và câu hỏi tự đối chiếu',
    description:
      'Lời hướng dẫn hiện đại do dự án biên soạn, không phải trích dẫn sách. Tên và thứ tự cung được đối chiếu mục An thập nhị cung, Quyển II; không suy ra kết quả sức khỏe, tài chính hoặc quan hệ.',
  },
  {
    id: 'structure-reference',
    title: 'Dữ kiện và hình học địa chi',
    url: '/phuong-phap#luan-giai',
    section: 'Tọa thủ, tam hợp và đối cung',
    description:
      'Vị trí cung và sao lấy nguyên từ kết quả an sao. Các địa chi cách 4 hoặc 8 vị trí là hai cung tam hợp (cung liên hệ theo nhóm địa chi), cách 6 là đối cung (cung đối diện). Đây là cách xác định quan hệ vị trí, không quy đổi thành tốt hoặc xấu.',
  },
];

export const PALACE_SOURCE_IDS = ['editorial-palace-context'];

// Original, bounded Vietnamese paraphrases of the verified classical star sections.
// Source-specific combinations and deterministic forecasts are deliberately not encoded.
export const STAR_CATALOG: Record<string, StarMeaning> = {
  'Tử Vi': {
    theme:
      'Tử Vi gợi vai trò điều phối, trách nhiệm và giá trị của sự hỗ trợ trong hệ biểu tượng truyền thống.',
    reflection:
      'Liệt kê một việc bạn đang tự làm hết, chọn phần cần giao lại và thống nhất tiêu chí hoàn tất với người nhận.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Cơ': {
    theme: 'Thiên Cơ gợi cách suy xét, tìm phương án và thích nghi khi hoàn cảnh thay đổi.',
    reflection:
      'Chọn một thay đổi nhỏ trong kế hoạch, thử trong một tuần rồi ghi điều gì tốt hơn và điều gì phải sửa.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thái Dương': {
    theme: 'Thái Dương gợi sự hiện diện, đóng góp và trách nhiệm công khai.',
    reflection:
      'Trước khi nhận một trách nhiệm chung, nói rõ phần bạn phụ trách và giới hạn thời gian bạn dành được.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Vũ Khúc': {
    theme: 'Vũ Khúc gợi quản lý nguồn lực, sự quyết đoán và chú trọng thực hành.',
    reflection:
      'Trước một khoản chi lớn, ghi tổng chi phí, phần tiền còn lại và một phương án giảm quy mô nếu vượt ngân sách.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Đồng': {
    theme: 'Thiên Đồng gợi sự hài hòa, an ổn và nhu cầu nghỉ ngơi.',
    reflection:
      'Xếp một khoảng nghỉ vào lịch tuần, đồng thời chốt một đầu việc cần hoàn thành trước khoảng nghỉ đó.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Liêm Trinh': {
    theme: 'Liêm Trinh gợi quy tắc, trách nhiệm và ranh giới.',
    reflection:
      'Chọn một thỏa thuận đang hiểu khác nhau, ghi lại trách nhiệm mỗi bên rồi cùng xác nhận trước khi tiếp tục.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Phủ': {
    theme: 'Thiên Phủ gợi gìn giữ, tổ chức và phân bổ nguồn lực.',
    reflection:
      'Tách khoản dành cho nhu cầu thiết yếu trước khi phân bổ phần còn lại cho một kế hoạch mới.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thái Âm': {
    theme: 'Thái Âm gợi sự chăm chút, đời sống riêng và nền tảng ổn định.',
    reflection:
      'Chọn một chỗ trong nhà đang gây bất tiện và một việc nhỏ bạn sắp xếp lại được trong tuần này.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Tham Lang': {
    theme: 'Tham Lang gợi giao tiếp, mong muốn trải nghiệm và chủ đề giới hạn.',
    reflection:
      'Trước một cuộc hẹn hoặc trải nghiệm mới, chốt thời gian, ngân sách và một giới hạn bạn muốn giữ.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Cự Môn': {
    theme: 'Cự Môn gợi lời nói, phân tích vấn đề và việc làm rõ hiểu lầm.',
    reflection:
      'Trước khi phản hồi một tin nhắn gây khó chịu, hỏi lại dữ kiện chưa rõ và viết một nhu cầu cụ thể thay vì đoán động cơ.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Tướng': {
    theme: 'Thiên Tướng gợi sự hỗ trợ, công bằng và phối hợp trong quan hệ với người khác.',
    reflection:
      'Trong việc chung, ghi rõ ai nhận từng phần, kết quả cần đạt và lúc cùng kiểm tra tiến độ.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Lương': {
    theme: 'Thiên Lương gợi sự bảo trợ, nguyên tắc và kinh nghiệm.',
    reflection:
      'Chọn một việc bạn chưa nắm rõ, hỏi người có kinh nghiệm và kiểm tra lời khuyên bằng nguồn phù hợp trước khi làm.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thất Sát': {
    theme: 'Thất Sát gợi tính quyết liệt và tự chủ trong hệ biểu tượng.',
    reflection:
      'Trước quyết định lớn, ghi một lựa chọn thay thế, chi phí đổi ý và bước thử đảo ngược được.',
    sourceIds: ['classical-stars-vol1'],
  },
  'Phá Quân': {
    theme:
      'Phá Quân gợi thay đổi và hao phí nguồn lực; “tái cấu trúc” (sắp xếp lại cách làm) là cách diễn đạt hiện đại của dự án.',
    reflection:
      'Chọn một cách làm cần thay đổi, tính thời gian và chi phí thử trước khi bỏ toàn bộ cách đang dùng.',
    sourceIds: ['classical-stars-vol1'],
  },
};
