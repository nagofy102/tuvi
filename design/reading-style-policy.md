# Chuẩn biên tập bản đọc theo chủ đề

## Phạm vi đã triển khai

Bản v4 bổ sung mở đầu từ dữ kiện thật của từng nhóm cung và bản đọc ngắn trước biểu đồ;
chi tiết xem `../dev/pm-priorities.md`. Giờ chưa biết không tạo bản đọc cá nhân theo sao.

Bản đọc sinh cục bộ bằng quy tắc cố định, không gọi AI trực tuyến. Ba mạch công việc,
tiền bạc và đồng hành kết nối nhiều cung trước phần tra cứu 12 cung. Chọn mối quan tâm
chỉ đổi thứ tự mạch đọc; không đổi sao, nguồn hoặc kết quả an sao.

Cung được chọn làm góc nhìn biên tập, không mặc nhiên có quan hệ tam hợp. Mỗi mạch
có dữ kiện cung thật và nguồn; nhóm Tả–Hữu/Xương–Khúc chỉ xuất hiện khi điều kiện
nhóm thực sự khớp. Có/không có nhóm làm thay đổi bài tập, câu tự kiểm tra và cách
điều chỉnh. Mệnh–Thân dùng trong mạch công việc và mạch chứa cung an Thân thực tế.
Đây là hướng dẫn tự đối chiếu, không biến vị trí sao chưa thẩm định thành đặc điểm
tính cách đã được xác nhận.

## Hợp đồng nội dung / prompt cho giai đoạn AI sau này

Đặc tả sau là chuẩn biên tập, chưa có provider hoặc prompt chạy qua API:

> Bạn biên soạn bản đọc tiếng Việt để người đọc tự đối chiếu, xưng hô “bạn”.
> Chỉ dùng dữ kiện đã cung cấp; không bịa sao, vị trí, độ sáng, tổ hợp hay vận hạn.
> Tổ chức 2–3 mạch đời sống, mỗi mạch dẫn về ít nhất hai cung thực tế. Không gọi
> nhóm cung biên tập là tam hợp nếu dữ liệu không xác nhận quan hệ hình học.
> Mỗi nhận định phải có dữ kiện và nguồn; phân biệt trích đoạn sách, diễn đạt riêng
> và bài tập biên tập. Đừng biến bài tập ứng dụng thành kết luận sách.
> Trong mỗi đoạn thân bài, tối đa một câu nói tên/vị trí sao; đặt bảng sao và
> trích đoạn trong phần “Vì sao luận như vậy”. Sau câu dữ kiện, dùng tình huống
> quan sát được: việc gì, khi nào, kiểm tra bằng ghi chép nào, hành động tiếp theo.
> Viết thẳng các sự kiện đã xác nhận và hướng dẫn thao tác. Không khẳng định
> “bạn hay…” chỉ vì sao; dùng “Nếu tình huống này đã xảy ra…” và yêu cầu tự kiểm tra.
> Mỗi cảnh báo hành vi phải kèm cách chỉnh cụ thể. Không dùng “thường”, “có thể”
> để che thiếu căn cứ; khi thiếu căn cứ, bỏ kết luận.
> Với Phu Thê, dùng “người bạn đời”, không gán vai trò theo giới tính. Thuật ngữ
> cần thiết phải có nghĩa dễ hiểu ở lần đầu xuất hiện; không bật Tứ Hóa, Phi Hóa
> hoặc cách cục chỉ để làm nội dung có vẻ sâu hơn.
> Không đoán tuổi thọ, bệnh nặng, tai nạn chết người, tù tội, không viết “số khổ”,
> không phán phẩm chất theo tửu sắc/cờ bạc. Không tạo điểm số vận may.
> Chỉ một dòng giới hạn ở đầu bản đọc và một dòng ở footer; chi tiết phạm vi
> đặt trong phần phương pháp/căn cứ, không chèn lời miễn trừ giữa các đoạn.
> Nội dung ứng dụng phải tự viết; không sao chép từ website tử vi khác.

## Cấu trúc client

`InterpretationReport.themes` chứa ba `ThematicReading`, gồm `concern`, `title`,
`paragraphs`, `selfCheck`, `adjustment`, `palaceNames`, `insights`. Các insight giữ
nguyên `ruleId`, `passageIds`, `why`, và bằng chứng sao/cung/địa chi. `sortThemes`
là hàm thuần, không sửa mảng đầu vào.

Phần hiện tại chỉ được nêu dữ kiện tuổi mụ, khoảng đại hạn theo engine và năm đang
xem; không suy ra dự báo năm hay đại hạn khi chưa có quy tắc đối chiếu. Phi Hóa
mở rộng chưa kích hoạt, tránh trộn trường phái.

## Nghiệm thu nội dung

- Dữ kiện nhóm thay đổi phải làm thay đổi bài tập phù hợp; thiếu một thành viên
  không được giữ kết luận/bài tập đặc thù của cặp đó.
- Mỗi mạch có ít nhất hai cung thật, “Vì sao”, nguồn giải được; quan hệ nguyên gốc
  không bị đổi để kể chuyện.
- Đoạn cung tối đa một câu tên sao; hành vi tự kiểm tra và hành động sửa rõ ràng.
- Không đánh đồng test phần mềm với xác nhận tính cách hoặc khả năng dự báo.

Kiểm tra tự động nằm ở `../tests/unit/reading-upgrade.test.ts`; báo cáo UI/tổng thể
được lưu riêng sau khi chạy thực tế.
