# Current product milestone status

This is the sole current accepted/blocked/planned status document. Historical
handoffs and research reports are evidence only and are archived or retained in
Git history after HV-M01 consolidation.

Baseline nâng cấp Công việc: `61b1dc6`, ngày 14/10/2026. Đây là bảng bàn giao hiện tại, không phải
chứng nhận chuyên môn. Ranh giới tổng hợp hiện hành nằm trong
`../dev/reading-brief-contract.md`.

| Mốc                       | Trạng thái thực tế                                                    | Điều kiện còn mở                                                                                                       |
| ------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| A1 — Hồ sơ và truy nguồn  | PM nghiệm thu phạm vi quản trị/truy nguồn                             | Không bao gồm xác thực ấn bản hoặc chứng nhận Nam phái; xem `../dev/calculation-spec.md`                               |
| A2 — Chốt hồ sơ Nam phái  | Đã chốt và triển khai hồ sơ cố định                                   | Lịch Trung Quốc, Tứ Hóa Nam phái, chia nhuận ngày 15, tăng ngày từ 23:00; giới hạn QA tại `../dev/calculation-spec.md` |
| A3 — Corpus bên ngoài     | Đã thu 4 lá số/2 website, so 140 trường                               | 139 khớp, 1 khác lịch; Mèo Béo công bố Bắc phái, AItuvi chưa rõ; chưa có golden Nam phái                               |
| B — Tổng hợp có điều kiện | Công việc v7 có diễn giải chính tinh theo cung, tách căn cứ/thực hành | Hai chủ đề còn lại giữ bản cũ; chưa có quy tắc đối nghịch hoặc nghiệm thu rubric toàn bản đọc                          |
| C — Mở nhóm kiến thức     | Chưa kích hoạt nhóm mới                                               | Khôi–Việt còn dị bản và thiếu phép gán sao được đối chiếu; các nhóm khác cần nguồn và ca kiểm chứng riêng              |
| D1 — Cách cục             | Chưa triển khai                                                       | Cần điều kiện nhận diện, phá cách và ca gần đúng bị loại                                                               |
| D2 — Luận vận             | Chưa triển khai                                                       | Cần đối chiếu thuật toán thời gian và quy tắc luận; khoảng tuổi Đại hạn không phải dự báo                              |
| D3 — Hỏi tiếp AI          | Chưa triển khai                                                       | Cần kho nguồn duyệt, kiểm thử từ chối/truy nguồn và đồng ý riêng nếu gửi dữ liệu ra ngoài                              |

## PO review K02B/K03A2/K04A — 15/10/2026

PO nghiệm thu các mốc trước ở phạm vi nghiên cứu/prototype, không xác nhận độ đúng
tính toán hoặc luận giải production. K02C được mở để kiểm chứng lịch theo nguồn hợp
pháp; K03A3 được mở để thu tri thức luận đoán thực chất; K04B vẫn tạm hoãn. K02C mới
xác minh metadata chính thức của GB/T 33661-2017: chưa lấy/đọc được toàn văn hợp pháp,
nên không có clause, fixture hay thay đổi profile. K03A3 chưa có passage độc lập,
page-level đủ điều kiện, nên Knowledge Yield là 0 rule substantive và 0 claim path.
Xem ranh giới K02C/K03A3 trong `../dev/calculation-spec.md` và
`../dev/source-registry.md`.

K03A4 (15/10) chuyển từ inventory sang kiểm tra nội dung thực tế: một candidate
substantive có locator được trích xuất từ nguồn cùng lineage cũ, nhưng chỉ được tạo
trace phân loại lịch sử, không được tạo claim. Hai đường nguồn mới access-blocked;
K04B vẫn hoãn; trạng thái K03A4 nằm trong `../dev/source-registry.md`.

HV-K05 (15/10) đọc trực tiếp các revision ghim và lưu ba candidate Quan Lộc có
passage/điều kiện cụ thể; hai là `source-backed`, một bị `blocked` do thuật ngữ
chưa map. Cả ba cùng một textual lineage chưa định danh hệ phái; Production
Knowledge Yield = 0 và K04B vẫn hoãn. Xem `../dev/knowledge-k05-research.md` và
`../dev/knowledge-k05-quan-loc-candidates.json`.

HV-K06 (15/10) chuẩn hóa nền tảng gồm 12 cung, 14 chính tinh ứng viên, năm họ
phụ tinh giới hạn, thuật ngữ trạng thái/không gian/Tứ Hóa và ba methodology gate.
Đây là catalog research cùng một textual lineage, không phải profile Nam phái
hay runtime graph/DSL. Các quan hệ hình học, state lookup và Tứ Hóa active vẫn
blocked; không có rule production mới. Xem `../dev/knowledge-k06-coverage.md`.

HV-K07 (15/10) mở rộng catalog thành 14 phụ tinh có ID, thêm hai thuật ngữ trạng
thái và hai quan hệ graph-ready theo nguồn: dị bản trạng thái-vị trí và cấu trúc
giáp có ví dụ. Hai candidate cấu trúc giáp được lưu `blocked`; source vẫn là một
textual lineage chưa xác định hệ phái, hình học/profile và ưu tiên xung đột chưa
được map. Không có rule production mới; xem `../dev/knowledge-k07-coverage.md`.

HV-K08 (15/10) mở rộng breadth-first bằng vocabulary 10 Can, 12 Chi, âm dương,
ngũ hành/nạp âm và Đại hạn/Tiểu hạn/Lưu niên/Thái tuế; đồng thời giữ quan hệ
review các hạn ở mức methodology. Tất cả mapping an hạn, chiều tính, profile và
kết luận hạn vẫn `blocked`; không có candidate production hoặc thay đổi runtime.
Xem `../dev/knowledge-k08-coverage.md`.

HV-K09 (15/10) đăng ký một văn bản `紫微斗數` có page header `萬曆續道藏`, khác
vocabulary với family `紫微斗數全書`. Quan hệ thư tịch/độc lập chưa xác định nên
chỉ thêm hai source variants (một `disputed`), không hòa trộn thuật ngữ cung hay
nâng chất lượng evidence. Số source family **được chứng minh độc lập** vẫn là 0;
xem `../dev/knowledge-k09-coverage.md`.

HV-K10 (15/10) kiểm tra năm URL do PO chỉ định cho ba sách tiếng Việt. Các trang
chỉ cho metadata/mục lục/bài giới thiệu hoặc affordance đọc/tải; không xác minh
được ấn bản hay quyền xử lý toàn văn. Điều khoản Thiên Cơ còn cấm thu thập tự động
và tạo dataset AI khi chưa được chấp thuận. Vì vậy cả năm hồ sơ ở trạng thái
`blocked`, Knowledge Yield = 0, không có entity/relation/rule mới hay thay đổi
runtime; xem `../dev/knowledge-k10-coverage.md`.

HV-K10 Foundational Meaning Expansion (15/10) đọc trực tiếp ba passage bị chặn
phạm vi trong bản chép Wikisource đã ghim của `紫微斗數全書/卷一`. Dataset mới có
24 diễn giải trung lập, truy vết được cho 14 chính tinh và 10 phụ tinh;
đây là tri thức nguồn mô tả truyền thống, không phải rule hay lời luận cá nhân.
Hệ phái/profile và độc lập lineage vẫn chưa xác định; 12 cung cùng 4 phụ tinh
còn lại chưa có meaning evidence. Không thay đổi runtime hay production approval;
xem `../dev/knowledge-k10-meaning-coverage.md`.

HV-K11 (15/10) nâng dataset meaning từ 24 lên 54 statement: hoàn tất meaning cho
14/14 phụ tinh, thêm 7 concept, 4 quan hệ và 4 lớp vận hạn ở mức research-only.
Mười một cung có meaning từ dị bản Đạo Tạng nhưng đều `disputed`; hệ này dùng
`相貌` ở mục thứ mười hai nên không tạo meaning cho Phụ Mẫu và không được hòa vào
profile hiện hành. Một source family Ngũ hành bách khoa mới được tiếp cận, nhưng
không phải nguồn hệ phái Tử Vi. Production Knowledge Yield vẫn bằng 0; xem
`../dev/knowledge-k11-meaning-coverage.md`.

## Đợt hiện tại — tiếp tục A

Phần dưới là lịch sử đợt `0958a68`. Quyết định mới trên baseline `49512a2`
tại `../dev/calculation-spec.md`: A1 đóng trong phạm vi đã
ghi; A2 giao BA/chuyên môn chốt Nam phái; A3 chuyển ưu tiên sang đối thủ.

- Xác minh nguồn sách từ trang nhan đề và catalogue công khai; chỉ nâng trạng thái
  khi có bằng chứng đủ, không lấy lời uploader làm xác nhận thư mục.
- Sổ nguồn machine-readable tách nguồn dùng cho corpus từng phần, nguồn chỉ tham
  khảo nội dung và bản scan chỉ đối chiếu. Trích đoạn/URL/revision phải khớp hồ sơ
  đã duyệt trước khi engine được phép so sánh.
- Đợt kỹ thuật đã qua 245 unit tests, build/typecheck và diff 36/36 ca từng phần;
  kiểm tra mã 4 ảnh khớp. Những kết quả này không đóng gate xuất xứ hay corpus
  hoàn chỉnh; xem `../dev/source-registry.md`.
- Không nhân thêm ca cùng công thức để gọi là pilot lá số độc lập. Giữ 36 ca từng
  phần / 218 trường; đợt này không thêm đáp án từ engine hoặc mở sao mới.
- Bộ kiểm tra có thể phát hiện hồ sơ bị thay đổi; không xác minh độ đúng dự báo,
  nguồn lịch sử hay tính trung thực của người viết metadata bằng thuật toán.

## Bước tiếp theo và ranh giới nghiệm thu

Gói B hiện tại thay phần Công việc ghép dữ kiện với bài tập bằng kết nối biểu
tượng chính tinh theo vai trò cung, phụ tinh chỉ bổ sung. Bản đọc, căn cứ và gợi
ý thực hành được tách riêng. Phạm vi và kết quả tại
`../dev/reading-brief-contract.md`. Đây không phải quy tắc tổ
hợp cổ được kiểm chứng hoặc luận nghề nghiệp chắc chắn; hai chủ đề còn lại chưa
được nâng cấp tương đương. Không đóng A3, C hoặc D bằng thay đổi biên tập này.

Đợt kế tiếp trên baseline `0958a68` củng cố B bằng nội dung v6: bài tập riêng theo
ba chủ đề và trạng thái hai cặp hiện hữu, hành động ở đoạn đọc đầu trên mobile.
Không mở C/D; chưa đóng gate rubric toàn bản đọc. Xem
contract ReadingBrief và chiến lược test hiện hành.

Ưu tiên nguồn/corpus A để mở từng nhóm C có điều kiện; tiếp tục hoàn thiện B bằng
tri thức đã duyệt. Không chuyển sang D chỉ vì test kỹ thuật qua. Hồ sơ ứng viên lá
số công bố phải đi qua hợp đồng tiếp nhận trong `../dev/calculation-spec.md`.

Mobile >90 ổn định vẫn là đầu việc chất lượng song song, chưa đạt. Gói Công việc
có sửa giao diện/bundle nhưng chưa đo Lighthouse; không dùng số lịch sử để xác
nhận bản mới. Bằng chứng đợt A được lưu trong
`../dev/source-registry.md`; mọi thay đổi hoàn tất phải commit/push theo RULE_BASE.
