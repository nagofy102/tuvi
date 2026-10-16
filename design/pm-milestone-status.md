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

HV-K12 (15/10) nâng dataset từ 54 lên 65 statement, phủ research meaning cho
13/13 concept và 8/8 relation đã catalog. Bằng chứng thứ cấp cho thấy hệ hiện đại
liệt kê Phụ Mẫu và gọi `相貌` là bí danh, đồng thời phân biệt văn bản Đạo Tạng 1607
với Tử Vi lưu hành; tuy nhiên các claim này chưa đủ nguồn sơ cấp để xác nhận hệ
phái/profile. Vì vậy meaning cung vẫn 11/12 dị bản `disputed`, profile-compatible
và production-eligible đều bằng 0. Xem `../dev/knowledge-k12-coverage.md`.

HV-K13 (15/10) bổ sung 12 contextual statement có điều kiện, phủ cả sáu nhóm
sao–cung, sao–trạng thái, sao–sao, cung–cung, Tứ Hóa và vận hạn. Bằng chứng đến
từ sáu passage đã đọc trực tiếp trong hai volume cùng lineage `紫微斗數全書`, nên
không tạo xác nhận độc lập hoặc tương thích Nam phái. Geometry, state lookup,
Can-to-Tứ-Hóa, an hạn và precedence vẫn unresolved; 0 statement được phép dùng
production. Xem `../dev/knowledge-k13-coverage.md`.

HV-K14 Checkpoint 1 (15/10) đã kiểm kê 3 PDF / 1.022 trang vừa được PO thêm tại
`9cf5668`: hai sách có cấu trúc chương rõ và một tập luận năm 2009 thiếu trang
thư mục/phương pháp. Cả ba có text layer, nhưng _Tử Vi Tổng Hợp_ xuất text VNI
lỗi mã; edition, lineage và quyền xử lý/tái phân phối đều chưa xác minh. Đã lập
Coverage Map, batch/QA và pilot đa sách; chưa trích xuất statement hay đổi registry.
Dừng chờ PO duyệt Checkpoint 2 và phạm vi quyền tại
`../dev/knowledge-k14-book-discovery.md`.

HV-K14 Checkpoint 2 (15/10) đã đọc và đối chiếu trực quan 23 trang pilot trong
ba PDF: 6 trang Tân Biên, 14 trang Tổng Hợp và 3 trang Tự Xem 2009 làm negative
control. Dataset pilot phân loại 6 ACCEPT AS RESEARCH, 2 MERGE, 2 REVIEW và 2
REJECT; 12/12 có locator, nhưng 0 candidate được xác nhận tương thích profile hay
đủ điều kiện production. Chuyển VNI chỉ dùng hỗ trợ đọc và mọi locator Tổng Hợp
được so ảnh trang; Tự Xem bị loại khỏi KB vì thiếu thư mục/phương pháp và chứa
claim cá nhân rủi ro. Dừng trước Checkpoint 3; xem
`../dev/knowledge-k14-book-discovery.md` và
`../dev/knowledge-k14-book-pilot.json`.

HV-K14 Checkpoint 3 batch 1 (16/10) đã xử lý thêm 40 trang không trùng pilot:
Tân Biên 34–51 và Tổng Hợp 61–82. Acquisition Ledger hiện gán trạng thái cho
toàn bộ page ranges của hai sách chính; lũy kế đã đọc thực chất 63/1.022 trang.
Batch tạo 9 ACCEPT AS RESEARCH, 4 MERGE, 6 REVIEW và 2 REJECT; không candidate
nào được nâng thành profile-compatible hoặc production-eligible. VNI vẫn chỉ là
công cụ điều hướng, ảnh PDF là chuẩn QA. Dừng trước batch 2 để PO duyệt; xem
`../dev/knowledge-k14-book-discovery.md` và
`../dev/knowledge-k14-acquisition.json`.

HV-K14-C batch 2 (16/10) đã xử lý thêm 34 trang theo ledger có kiểm soát:
Tân Biên 52–75 và Tổng Hợp 83–92. Lũy kế đọc thực chất là 97/1.022 trang;
Batch 2 thêm 2 ACCEPT AS RESEARCH, 2 REVIEW và 2 REJECT. Đóng góp chính là
giới hạn có nguồn cho việc dùng Âm dương–Ngũ hành với nhiều sao và bất đồng
Tuần/Triệt; không có statement nào được nâng thành profile-compatible hoặc
production-eligible. VNI của Tổng Hợp vẫn chỉ được dùng để điều hướng và mỗi
locator giữ lại đã so ảnh PDF. Xem `../dev/knowledge-k14-book-discovery.md` và
`../dev/knowledge-k14-acquisition.json`.

HV-K14-C batch 3 (16/10) đã hoàn tất giới hạn checkpoint tự chủ với 27 trang:
Tân Biên 76–93 và Tổng Hợp 93–101. Lũy kế đọc thực chất là 124/1.022 trang;
Batch 3 có 1 ACCEPT AS RESEARCH, 2 MERGE, 1 REVIEW và 1 REJECT. Kết quả giữ
được cấu trúc điều kiện trong nguồn và giới hạn phương pháp cho trường hợp
Mệnh/Thân vô chính tinh, nhưng không chuẩn hóa Thân, Tuần/Triệt, sao lưu hoặc
hình học profile. Không có thay đổi runtime, calculation, UI hoặc trạng thái
production.

Chính sách điều phối HV-K14-C sau batch 3 thay checkpoint chờ PO bằng vòng tự
tiếp tục khi kết quả là `NORMAL`; vấn đề VNI/OCR, dị bản hoặc candidate `REVIEW`
là `RECOVERABLE` và phải được cô lập trong ledger. Chỉ vấn đề quyền, provenance,
toàn vẹn dữ liệu, contract/runtime hoặc không còn phần việc an toàn mới là
`BLOCKING` cần PO. Batch 4 (16/10) đã áp dụng chính sách này, đọc thêm 30 trang
Tân Biên 94–123. Lũy kế là 154/1.022 trang; có 1 MERGE, 1 REVIEW (Khôi/Việt
chưa có identity/phép an theo profile) và 1 REJECT cho nhóm lời luận trực tiếp.
QA ledger/hash/locator/ID/format qua; không thay runtime, calculation, UI hay
trạng thái production. Vòng tiếp theo tiếp tục Tổng Hợp theo visual QA bắt buộc.

HV-K14-C batch 5 (16/10) tiếp tục tự động trên Tổng Hợp 108–128 (21 trang),
lũy kế 175/1.022 trang. Batch thêm 1 ACCEPT AS RESEARCH (giới hạn phương pháp
do tác giả nêu), 1 MERGE, 1 REVIEW cho thứ bậc hạn chưa tương thích profile và
1 REJECT cho các kết luận cá nhân trực tiếp. VNI vẫn được kiểm bằng ảnh PDF;
đây là `RECOVERABLE`, đã cô lập trong ledger, không là blocker. Không thay
runtime, calculation, UI hay trạng thái production.

HV-K14-C batch 6 (16/10) đọc thêm Tân Biên 124–157 (34 trang), nâng lũy kế
lên 209/1.022 trang. Ba batch tự động 4–6 đã xử lý 85 trang, tạo 1 ACCEPT AS
RESEARCH, 3 MERGE, 3 REVIEW và 3 REJECT. Kết quả chỉ bổ sung provenance/phương
pháp có giới hạn; không có rule dự đoán dùng được, profile-compatible hay
production-eligible. Không có blocker về quyền/provenance/schema/ledger; session
dừng có kiểm soát vì context budget sau checkpoint, với queue kế tiếp Tổng Hợp
129–149 và resume checkpoint đã lưu.

HV-K14-C batch 7 (16/10) áp dụng Knowledge Yield Optimization trên Tổng Hợp
129–149 (21 trang), nâng lũy kế lên 230/1.022 trang. Batch chỉ có 2 MERGE cho
provenance/phương pháp đa yếu tố và 1 REJECT cho lời luận phân hạng, ngoại hình,
tình dục trực tiếp; không tạo tri thức luận đoán thực chất mới. Đây là tín hiệu
bão hòa của nhóm nội dung này, nên queue tự chuyển breadth-first sang Quan Lộc
Tân Biên sau khi xác minh ranh giới mục. VNI vẫn là `RECOVERABLE` qua visual QA;
không có blocker và không thay runtime, calculation, UI hay trạng thái production.

HV-K14-C batch 8 (16/10) hoàn tất Quan Lộc Tân Biên 161–167 (7 trang), lũy kế
237/1.022 trang. Giữ 1 MERGE cho cấu trúc đa yếu tố ở cung Quan Lộc, 1 REVIEW
cho Vô Chính diệu phụ thuộc hình học/ngoại lệ chưa tương thích profile và 1 REJECT
cho catalog nghề nghiệp/chức vị trực tiếp. Do yield thấp và rủi ro profile, queue
tự chuyển sang lát cắt cung không phải Quan Lộc trong 168–224. Không có blocker,
không thay runtime, calculation, UI hay trạng thái production.

HV-K14-C batch 9 (16/10) đọc và QA lại từ nguồn Tân Biên 168–173, hoàn tất cung
Nô Bộc và nâng lũy kế hai sách chính lên 240/719 trang (243/1.022 nếu tính ba
trang control). Batch giữ 1 ACCEPT AS RESEARCH cho phương pháp kết hợp Mệnh–Nô
Bộc, 2 REVIEW cho Vô Chính diệu/xung chiếu và ngoại lệ Tuần–Triệt, cùng 1 REJECT
cho lời luận xã hội/giới/tình dục trực tiếp. Range 174–224 đã được chia đúng ranh
giới sáu cung còn lại; điểm tiếp tục là Thiên Di 174–180. Không thay runtime,
calculation, UI, profile hoặc trạng thái production.

HV-K14-C batch 10 (16/10) hoàn tất Thiên Di Tân Biên 174–180, nâng lũy kế hai
sách chính lên 247/719 trang (250/1.022 gồm control). Batch giữ 1 ACCEPT AS
RESEARCH cho quan hệ Mệnh–Thiên Di, 1 REVIEW substantive cho dị bản Thiên
Cơ–Thái Âm theo Dần/Thân, 1 REVIEW cho Vô Chính diệu/xung chiếu và 1 REJECT
cho dự đoán đi lại, tai nạn, tử vong, giới/tình dục. Điểm tiếp tục là Tật Ách
181–189; không thay runtime, calculation, UI, profile hoặc production status.

HV-K14-C batch 11 (16/10) hoàn tất Tật Ách 181–189, nâng lũy kế hai sách chính
lên 256/719 trang. Batch giữ 1 ACCEPT AS RESEARCH cho dependency Mệnh–Thân–Phúc
Đức và cơ chế cứu giải/tác họa, 1 REVIEW cho ngoại lệ mất/đảo vai trò cứu giải,
cùng 1 REJECT cho toàn bộ dự đoán y tế, tai nạn và tử vong. Điểm tiếp tục là
Tài Bạch 190–197; không thay runtime, calculation, UI, profile hoặc production.

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
