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
      'Bản chép Wikisource, revision 7913704. Chủ đề tiếng Việt là diễn đạt biểu tượng hiện đại từ các mục về chính tinh và phụ tinh, không phải bản dịch nguyên văn hay dự báo. Văn bản cổ được Wikisource ghi thuộc phạm vi công cộng; phần biên tập website có điều khoản riêng. Chưa đối chiếu bản chụp sách.',
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
      'Bản chép revision 1963110; công thức và ví dụ dùng cho đối chiếu từng trường có nguồn, không chứng nhận mọi quy tắc của engine.',
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
      'Vị trí cung/sao lấy nguyên từ engine. Các địa chi cách 4/8 vị trí là hai cung tam hợp, cách 6 là đối cung. Đây là phép xác định quan hệ vị trí, không phải quy tắc kết luận tốt/xấu hoặc xác nhận an sao.',
  },
];

export const PALACE_SOURCE_IDS = ['editorial-palace-context'];

// Original, bounded Vietnamese paraphrases of the verified classical star sections.
// Source-specific combinations and deterministic forecasts are deliberately not encoded.
export const STAR_CATALOG: Record<string, StarMeaning> = {
  'Tử Vi': {
    theme:
      'Trong hệ biểu tượng truyền thống, Tử Vi gợi vai trò điều phối, trách nhiệm và giá trị của sự hỗ trợ; không đồng nghĩa bạn chắc chắn có địa vị.',
    reflection:
      'Bạn đang nhận trách nhiệm nào, và có thể tìm sự hỗ trợ từ ai thay vì tự gánh mọi việc?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Cơ': {
    theme: 'Thiên Cơ gợi cách suy xét, tìm phương án và thích nghi khi hoàn cảnh thay đổi.',
    reflection: 'Bạn có thể thử một phương án nhỏ nào trước khi đổi toàn bộ kế hoạch?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thái Dương': {
    theme:
      'Thái Dương gợi sự hiện diện, đóng góp và trách nhiệm công khai; không dùng sao này để gán vai trò theo giới tính.',
    reflection:
      'Bạn muốn đóng góp điều gì, và cần ranh giới nào để không nhận quá nhiều trách nhiệm?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Vũ Khúc': {
    theme:
      'Vũ Khúc gợi quản lý nguồn lực, sự quyết đoán và chú trọng thực hành; không dự đoán thu nhập hay lợi nhuận.',
    reflection:
      'Quyết định nào cần số liệu, kế hoạch dự phòng và thời gian cân nhắc trước khi thực hiện?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Đồng': {
    theme:
      'Thiên Đồng gợi sự hài hòa, an ổn và nhu cầu nghỉ ngơi; đây không phải kết luận về tính cách cố định.',
    reflection: 'Bạn có thể cân bằng sự dễ chịu trước mắt với trách nhiệm dài hạn như thế nào?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Liêm Trinh': {
    theme:
      'Liêm Trinh được đọc ở đây như biểu tượng của quy tắc, trách nhiệm và ranh giới; không dùng để phán phẩm chất đạo đức.',
    reflection: 'Ranh giới hoặc thỏa thuận nào cần được nói rõ và áp dụng công bằng?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Phủ': {
    theme:
      'Thiên Phủ gợi gìn giữ, tổ chức và phân bổ nguồn lực; không cam kết sở hữu tài sản hoặc sự sung túc.',
    reflection: 'Nguồn lực nào cần bảo toàn, và phần nào nên dành cho nhu cầu thực tế trước mắt?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thái Âm': {
    theme:
      'Thái Âm gợi sự chăm chút, đời sống riêng và nền tảng ổn định; không suy luận về người thân hoặc giới tính.',
    reflection: 'Điều gì giúp không gian sống và đời sống riêng của bạn trở nên ổn định hơn?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Tham Lang': {
    theme:
      'Tham Lang gợi giao tiếp và mong muốn trải nghiệm, đi cùng câu hỏi về giới hạn; không kết luận về chung thủy hay hành vi của một người.',
    reflection: 'Trải nghiệm nào phù hợp với giá trị của bạn, và đâu là giới hạn bạn muốn giữ?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Cự Môn': {
    theme:
      'Cự Môn gợi lời nói, phân tích vấn đề và việc làm rõ hiểu lầm; không dự đoán tranh chấp hay gán người khác là xấu.',
    reflection:
      'Bạn có thể kiểm tra thông tin và diễn đạt nhu cầu rõ hơn trước khi phản hồi không?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Tướng': {
    theme: 'Thiên Tướng gợi sự hỗ trợ, công bằng và phối hợp trong quan hệ với người khác.',
    reflection: 'Trong việc chung, trách nhiệm và kỳ vọng đã được phân chia rõ ràng chưa?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thiên Lương': {
    theme:
      'Thiên Lương gợi sự bảo trợ, nguyên tắc và kinh nghiệm; không dùng để hứa hẹn tránh bệnh hoặc tai họa.',
    reflection: 'Bạn có thể học từ kinh nghiệm nào, và cần tìm hỗ trợ chuyên môn ở đâu?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Thất Sát': {
    theme:
      'Thất Sát gợi tính quyết liệt và tự chủ trong hệ biểu tượng; không phải dấu hiệu bạo lực hoặc bất hạnh.',
    reflection:
      'Trước quyết định lớn, bạn đã cân nhắc lựa chọn thay thế và khả năng đảo ngược chưa?',
    sourceIds: ['classical-stars-vol1'],
  },
  'Phá Quân': {
    theme:
      'Phá Quân gợi thay đổi và hao phí nguồn lực. “Tái cấu trúc” là cách diễn đạt hiện đại của dự án, không phải lời dự báo đổ vỡ.',
    reflection:
      'Điều gì thực sự cần thay đổi, và chi phí của thay đổi đó có nằm trong khả năng của bạn?',
    sourceIds: ['classical-stars-vol1'],
  },
};
