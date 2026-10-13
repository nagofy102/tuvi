/** Original behavioral exercises, not inferred personality or predictive statements. */
export const PALACE_ACTIONS: Readonly<Record<string, { overview: string; reflection: string }>> = {
  Mệnh: {
    overview:
      'Chọn một quyết định gần đây và ghi điều bạn muốn đạt trước khi quyết định. Đối chiếu với việc bạn thực sự làm để tìm một chỗ cần điều chỉnh.',
    reflection:
      'Nếu bạn nhận việc vì ngại từ chối rồi bỏ dở việc quan trọng của mình, hãy nói rõ phần bạn nhận và phần bạn không nhận ngay từ đầu.',
  },
  'Phụ Mẫu': {
    overview:
      'Nhớ lại một lần bạn trao đổi với cha mẹ hoặc người dìu dắt về một lựa chọn riêng. Tách lời khuyên bạn đã nghe khỏi quyết định cuối cùng bạn tự chịu trách nhiệm.',
    reflection:
      'Nếu cuộc trao đổi bị ngắt bởi việc giải thích ai đúng, hãy nhắc lại một điều bạn đã hiểu rồi nói một nhu cầu cụ thể của bạn.',
  },
  'Phúc Đức': {
    overview:
      'Ghi lại ba buổi tối gần nhất: bạn nghỉ ngơi bằng việc gì và sáng hôm sau cảm thấy ra sao. Chọn một thói quen có kết quả thực tế tốt để duy trì trong tuần.',
    reflection:
      'Nếu thời gian nghỉ bị lấp bằng việc nhà hoặc điện thoại, dành một khoảng ngắn không nhận việc và báo trước cho người cùng sống.',
  },
  'Điền Trạch': {
    overview:
      'Chọn một góc nhà làm sinh hoạt bất tiện và ghi hai việc cần sửa trước. Đặt chi phí dự kiến cạnh khoản tiền bạn thực sự dành được.',
    reflection:
      'Nếu bạn muốn sửa nhiều chỗ cùng lúc, chốt một hạng mục thiết yếu trước và xác nhận tổng chi phí bằng văn bản.',
  },
  'Quan Lộc': {
    overview:
      'Chọn một đầu việc đang chậm và ghi điểm đang chờ: kỹ năng, thông tin hay người quyết định. Hẹn một hành động cụ thể để giải quyết đúng điểm chờ đó.',
    reflection:
      'Nếu bạn làm bù ngoài giờ vì yêu cầu thay đổi, ghi lại phần thay đổi và thống nhất lại hạn hoàn thành trước khi nhận thêm.',
  },
  'Nô Bộc': {
    overview:
      'Nhìn lại một việc chung với bạn bè hoặc đồng nghiệp: ai nhận phần nào và ai thực sự hoàn thành. Kiểm tra thỏa thuận thay vì suy đoán động cơ.',
    reflection:
      'Nếu bạn phải nhắc việc nhiều lần, chốt lại một người phụ trách, một hạn cụ thể và một mốc báo khó khăn.',
  },
  'Thiên Di': {
    overview:
      'Trước khi bước vào môi trường mới, ghi điều đã biết, điều chưa rõ và người bạn cần hỏi. Thử một bước nhỏ rồi xem lại phản hồi thực tế.',
    reflection:
      'Nếu bạn trì hoãn vì chưa nắm hết thông tin, đặt một thời hạn cho việc hỏi và chọn bước thử đảo ngược được.',
  },
  'Tật Ách': {
    overview:
      'Ghi giờ đi ngủ, thời gian vận động và khoảng nghỉ của ba ngày gần nhất. Chọn một việc nhỏ bạn chủ động sắp xếp lại trong lịch tuần này.',
    reflection:
      'Nếu bạn liên tục bỏ giờ nghỉ để hoàn tất việc, chặn một khoảng nghỉ trong lịch và trao đổi lại khối lượng; khi có vấn đề sức khỏe, tìm hỗ trợ chuyên môn.',
  },
  'Tài Bạch': {
    overview:
      'Chia các khoản chi gần nhất thành thiết yếu và chưa cấp thiết. Đối chiếu với tiền thực nhận để biết khoản nào đang làm kế hoạch lệch đi.',
    reflection:
      'Nếu một khoản mua theo cảm xúc làm thiếu tiền cần thiết, tách khoản thiết yếu trước và hẹn xem lại món muốn mua sau một ngày.',
  },
  'Tử Tức': {
    overview:
      'Chọn một việc chăm sóc hoặc hướng dẫn người nhỏ tuổi hơn: bạn đang làm thay hay đang giúp tự làm. Ghi một bước người đó tự thực hiện được với hỗ trợ phù hợp.',
    reflection:
      'Nếu bạn sửa giúp ngay khi thấy chậm, hỏi phần nào cần hỗ trợ và để người đó hoàn tất một bước vừa sức trước.',
  },
  'Phu Thê': {
    overview:
      'Chọn một chuyện chưa thống nhất với người bạn đời, nói rõ tình huống và một nhu cầu của bạn. Hỏi nhu cầu của người bạn đời rồi nhắc lại để kiểm tra bạn đã hiểu đúng.',
    reflection:
      'Nếu bạn chuyển ngay sang giải pháp khi người bạn đời đang chia sẻ, dừng lại và hỏi người bạn đời muốn được lắng nghe hay cùng tìm cách xử lý.',
  },
  'Huynh Đệ': {
    overview:
      'Nhớ lại một lần chia việc với anh chị em hoặc người thân ngang hàng. Ghi ai nhận việc gì và điều nào chưa được nói rõ.',
    reflection:
      'Nếu trách nhiệm dồn về một người, hỏi lại khả năng của từng người rồi chia một việc cụ thể theo thời gian thực tế.',
  },
};
