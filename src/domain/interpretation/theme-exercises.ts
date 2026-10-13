import type { ReadingConcern } from './types';

/** Editorial exercises selected by admitted groups, not inferred personal traits. */
type Exercise = { title: string; selfCheck: string; adjustment: string };
type GroupMode = 'support' | 'literacy' | 'combined';

const EXERCISES: Record<ReadingConcern, Record<GroupMode, Exercise>> = {
  career: {
    support: {
      title: 'Công việc: giao rõ phần, báo vướng đúng lúc',
      selfCheck:
        'Nếu một đầu việc gần đây phải làm thay hoặc giao lại, xem thỏa thuận ban đầu: ai nhận phần nào, kết quả cần đạt và hạn hoàn thành đã được xác nhận chưa? Nếu chưa gặp tình huống này, bỏ qua bài tập.',
      adjustment:
        'Nếu yêu cầu chưa rõ, ghi kết quả cần đạt, người phụ trách và mốc báo vướng mắc; để người nhận việc xác nhận trước khi bắt đầu.',
    },
    literacy: {
      title: 'Công việc: kiểm tra yêu cầu trước khi làm',
      selfCheck:
        'Nếu một việc phải sửa vì hiểu khác yêu cầu, mở lại tin nhắn hoặc tài liệu từ nguồn đầu tiên: điểm nào chưa được xác nhận, ai có quyền chốt? Nếu chưa gặp tình huống này, bỏ qua bài tập.',
      adjustment:
        'Nếu yêu cầu còn khác nhau, chốt ba dòng: kết quả cần làm, dữ kiện đã xác nhận và điều còn phải hỏi; gửi người giao việc xác nhận trước khi tiếp tục.',
    },
    combined: {
      title: 'Công việc: thống nhất yêu cầu và người nhận',
      selfCheck:
        'Nếu một việc chung bị chậm hoặc làm lại, đối chiếu bản giao việc với trao đổi gần nhất: mỗi phần đã có người nhận và tiêu chí hoàn thành chưa, yêu cầu nào đã đổi mà chưa được xác nhận? Nếu chưa gặp tình huống này, bỏ qua bài tập.',
      adjustment:
        'Nếu trách nhiệm hoặc yêu cầu chưa rõ, ghi chung kết quả cần đạt, người phụ trách, hạn hoàn thành và thay đổi đã xác nhận; hẹn mốc báo vướng mắc với người nhận việc.',
    },
  },
  finance: {
    support: {
      title: 'Tiền bạc: làm rõ phần đóng góp chung',
      selfCheck:
        'Nếu bạn đang cùng người khác chi trả một khoản chung, xem lại thỏa thuận: mỗi người góp bao nhiêu, ngày nào và ai giữ chứng từ? Nếu không có khoản chung, bỏ qua bài tập.',
      adjustment:
        'Nếu phần đóng góp chưa rõ, ghi số tiền, người phụ trách thanh toán và ngày xác nhận; thống nhất lại trước khi ứng thêm tiền.',
    },
    literacy: {
      title: 'Tiền bạc: đối chiếu con số trước khi trả',
      selfCheck:
        'Nếu bạn đang xem một khoản mua hoặc hợp đồng, đối chiếu báo giá với điều khoản: tổng tiền đã gồm phí nào, hạn trả và điều kiện hoàn tiền nằm ở đâu? Nếu chưa có giao dịch, bỏ qua bài tập.',
      adjustment:
        'Nếu số tiền hoặc điều khoản chưa khớp, ghi từng điểm khác nhau và yêu cầu bên cung cấp xác nhận bằng văn bản trước khi thanh toán.',
    },
    combined: {
      title: 'Tiền bạc: thống nhất khoản chi và người trả',
      selfCheck:
        'Nếu đang dự tính một khoản chi chung, đặt báo giá cạnh thỏa thuận đóng góp: tổng tiền và phí đã khớp chưa, ai trả phần nào và ai kiểm tra chứng từ? Nếu không có khoản chung, bỏ qua bài tập.',
      adjustment:
        'Nếu còn lệch số tiền hoặc trách nhiệm, lập một bảng khoản chi gồm tổng phí, phần mỗi người, hạn trả và chứng từ cần giữ; cùng xác nhận trước khi chuyển tiền.',
    },
  },
  relationship: {
    support: {
      title: 'Đồng hành: chia việc theo thời gian thực tế',
      selfCheck:
        'Nếu bạn và người bạn đời có việc chung chưa xong, nhìn lại tuần vừa qua: mỗi người đã nhận việc gì và có bao nhiêu thời gian thực hiện? Nếu tình huống không phù hợp, bỏ qua bài tập.',
      adjustment:
        'Nếu một người đang nhận quá nhiều việc chung, cùng chọn một việc để chia lại theo thời gian thực tế và hẹn lúc hỏi lại tiến độ, không suy đoán sự quan tâm từ việc chưa xong.',
    },
    literacy: {
      title: 'Đồng hành: xác nhận điều đã nghe',
      selfCheck:
        'Nếu một cuộc trao đổi với người bạn đời kết thúc mà hai người hiểu khác nhau, nhớ lại câu đã nói: đâu là yêu cầu cụ thể, đâu là phần bạn tự suy diễn? Nếu tình huống không phù hợp, bỏ qua bài tập.',
      adjustment:
        'Nếu chưa hiểu nhu cầu của người bạn đời, nhắc lại bằng lời của bạn và hỏi đã đúng chưa; thống nhất một việc nhỏ sau khi cả hai xác nhận.',
    },
    combined: {
      title: 'Đồng hành: hiểu nhu cầu rồi chia việc',
      selfCheck:
        'Nếu một kế hoạch chung gây bất đồng, bạn và người bạn đời hãy nhắc lại nhu cầu của nhau rồi đối chiếu phần việc đã nhận: vướng ở điều chưa hiểu hay thời gian không đủ? Nếu tình huống không phù hợp, bỏ qua bài tập.',
      adjustment:
        'Nếu nhu cầu hoặc phần việc chưa thống nhất, mỗi người nói một nhu cầu, xác nhận điều đã nghe và nhận một việc vừa sức; hẹn lúc trao đổi lại thay vì nhắc lỗi cũ.',
    },
  },
};

export function selectThemeExercise(
  concern: ReadingConcern,
  support: boolean,
  literacy: boolean,
): Exercise | undefined {
  if (!support && !literacy) return undefined;
  return EXERCISES[concern][support && literacy ? 'combined' : support ? 'support' : 'literacy'];
}
