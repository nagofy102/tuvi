# HV-R07A — Thiết kế mở rộng quy tắc luận Công việc

Ngày: 14/10/2026 (UTC). Baseline: `b9a740861eaf6577b39a4fa0d00ac4b487bcb0d1`
(`origin/main`). Vai trò: PM/BA/Tử Vi specialist AI. Đây là thiết kế để Product
Owner duyệt, không phải quy tắc production, chứng nhận Nam phái độc lập hay kết quả
dự báo.

## Quyết định đề xuất

R07B nên nghiên cứu/duyệt **hai cấu trúc một chính tinh** trước. Nhánh Quan Lộc vô
chính diệu có coverage lớn nhất nhưng phải giữ `BLOCKED`: nguồn hiện có chỉ xác định
tên 12 cung, tiền đề biểu tượng từng sao và nguyên tắc không luận đồng loạt; chưa có
passage/rule đã duyệt về cách lấy sao hội chiếu để luận Quan Lộc vô chính diệu.

| ID     | Cấu trúc chính tinh trực tiếp Mệnh / Quan / Nô |            R06 liên quan | Đánh giá nguồn                                                                         | Quyết định              |
| ------ | ---------------------------------------------- | -----------------------: | -------------------------------------------------------------------------------------- | ----------------------- |
| R07-C0 | bất kỳ / Quan không chính tinh / bất kỳ        |         158/960 (16,46%) | thiếu quy tắc vô chính diệu, cung mượn, hội chiếu và loại trừ                          | **BLOCKED**             |
| R07-C1 | Thiên Phủ / Thiên Tướng / Thiên Lương          | Quan Thiên Tướng: 48/960 | đủ passage biểu tượng và rule nối biên tập; chưa có quy tắc liên cung cổ được xác minh | đề nghị duyệt mẫu trước |
| R07-C2 | Thiên Đồng / Thiên Cơ / Tử Vi + Thiên Phủ      |    Quan Thiên Cơ: 48/960 | đủ passage biểu tượng và rule nối biên tập; chưa có resolver cho tín hiệu căng nhau    | đề nghị duyệt sau C1    |

Các số R06 là phân bố lưới tổng hợp, không phải phân bố dân số. C1/C2 được chọn vì
tạo hai trọng tâm khác A1 và khác nhau về ý nghĩa; không nhằm tối đa coverage.

## Nguồn và điều kiện

Nguồn chung được phép dùng đúng phạm vi hiện tại:

- `classical-stars-vol1`, revision Wikisource `7913704`, passages
  `principal-1`, `principal-2`, `principal-5`, `principal-7`, `principal-11`,
  `principal-12` tùy ứng viên;
- `classical-context-vol1`, revision `7913704`, passage `context-not-uniform`;
- `classical-layout-vol2`, revision `1963110`, passage `layout-palaces`;
- rules `symbol-*` tương ứng, `career-cross-palace` và `palace-context` tại
  source revision đang được ReadingBrief ghim ở commit `17ac243...`.

`symbol-*` chỉ là từ điển biểu tượng. `career-cross-palace` là quy tắc biên tập
hiện đại, không phải tổ hợp cổ. Vì vậy mọi câu dưới chỉ đặt các lớp nghĩa cạnh nhau;
không suy năng lực, tính cách, nghề, hoàn cảnh hay kết quả thực tế.

### R07-C0 — Quan Lộc vô chính diệu

- Eligibility nghiên cứu: Quan Lộc không có chính tinh trực tiếp; vẫn phải giữ
  nguyên sao ở cung gốc và xác định đầy đủ Mệnh, Quan, Nô, tam phương/đối cung.
- Chưa đủ rule/passage để admission. Không được hiểu “vô chính diệu” là không có
  sao, thiếu năng lực hoặc bất lợi.
- Từ chối `ready` trong mọi trường hợp hiện tại. Cần bổ sung passage Nam phái đã
  đối chiếu về cung mượn/hội chiếu, thứ tự ưu tiên, miếu vượng/Tứ Hóa, sát–cát tinh
  và trường hợp loại trừ; sau đó mới soạn connecting rule.
- Nguy cơ: mượn sao đối cung như tọa thủ; bỏ qua phụ tinh; biến sự vắng mặt thành
  phán đoán; tạo kết luận trái chiều mà chưa có resolver.

### R07-C1 — Thiên Phủ / Thiên Tướng / Thiên Lương

- Eligibility đề xuất: đúng ba cung trực tiếp lần lượt có chính tinh
  `Mệnh=[Thiên Phủ]`, `Quan Lộc=[Thiên Tướng]`, `Nô Bộc=[Thiên Lương]`; không có
  chính tinh bổ sung; report qua `direct-career`; metadata/evidence khớp chart;
  không dùng transformation, brightness, phụ tinh, cách cục hay vận hạn để luận.
- Rules/passages: `symbol-7`/`principal-7` (gìn giữ, phân bổ nguồn lực),
  `symbol-11`/`principal-11` (phối hợp, trách nhiệm),
  `symbol-12`/`principal-12` (bảo trợ, kinh nghiệm), cùng
  `career-cross-palace`, `palace-context`, `layout-palaces`,
  `context-not-uniform`.
- Giới hạn: chỉ kết luận trọng tâm biểu tượng; không nói bạn giỏi quản lý, công bằng,
  làm lãnh đạo, có người nâng đỡ hoặc thành công.
- Từ chối: thiếu/mismatch passage; có thêm/bớt chính tinh; chart/report không khớp;
  template chưa được Product Owner duyệt; xuất hiện tín hiệu cần diễn giải mà
  matrix chưa có resolver.
- Nguy cơ đối nghịch: “gìn giữ” có thể căng với nhu cầu thay đổi do sao/phụ tinh
  khác; “bảo trợ” không mặc nhiên hỗ trợ “phối hợp”. Chưa được phép hòa giải.

### R07-C2 — Thiên Đồng / Thiên Cơ / Tử Vi + Thiên Phủ

- Eligibility đề xuất: đúng ba cung trực tiếp lần lượt có chính tinh
  `Mệnh=[Thiên Đồng]`, `Quan Lộc=[Thiên Cơ]`,
  `Nô Bộc=[Tử Vi, Thiên Phủ]`; các cổng metadata, evidence và phạm vi giống C1.
- Rules/passages: `symbol-5`/`principal-5` (hài hòa, nghỉ ngơi),
  `symbol-2`/`principal-2` (suy xét, thích nghi),
  `symbol-1`/`principal-1` (điều phối), `symbol-7`/`principal-7` (gìn giữ,
  phân bổ), cùng hai rule nối và hai passage chung nêu trên.
- Giới hạn: không nói bạn linh hoạt, thông minh, ngại thay đổi, biết điều phối hoặc
  có quyền lực; không suy cơ chế làm việc ngoài lớp nghĩa biểu tượng.
- Từ chối: như C1; đặc biệt từ chối nếu muốn diễn giải “thích nghi” đối lập với
  “an ổn/gìn giữ” thành hành vi cá nhân khi chưa có conflict rule.
- Nguy cơ đối nghịch: thay đổi phương án, nhu cầu ổn định và gìn giữ nguồn lực có
  thể tạo nhiều cách đọc. Mẫu chỉ nêu thế cân bằng, không quyết định bên nào thắng.

## Mẫu Style A chờ duyệt

Các mẫu sau là **structural mock** dựa trên SignalSet tổng hợp do engine sinh, không
phải lá số chuẩn độc lập. Chưa tạo template `approved`.

### Mẫu C1 — một insight

**Kết luận (`r07-c1-conclusion`):** Trong lá số của bạn, chủ đề công việc quy tụ ở
việc phối hợp trách nhiệm, đặt trên nền gìn giữ nguồn lực và tham chiếu kinh nghiệm.

**Insight (`r07-c1-integrated`), “Phối hợp trên nền ổn định”:** Với bạn, lớp nghĩa
nổi bật của công việc là sự phối hợp có trách nhiệm; gìn giữ nguồn lực và kinh
nghiệm là hai bối cảnh đi cùng, không phải lời khẳng định về chức vụ hay thành quả.

Hai câu cùng phụ thuộc `symbol-7`, `symbol-11`, `symbol-12`,
`career-cross-palace`, `palace-context`; passages `principal-7`, `principal-11`,
`principal-12`, `layout-palaces`, `context-not-uniform`. Deduplication identity đề
xuất: `career:coordination-stewardship-experience:menh7:quan11:no12`. Không thêm
insight thứ hai vì chưa có một suy luận độc lập.

### Mẫu C2 — một insight

**Kết luận (`r07-c2-conclusion`):** Trong lá số của bạn, công việc nổi bật ở thế
cân bằng giữa tìm phương án thích nghi, giữ nhịp hài hòa và tổ chức nguồn lực.

**Insight (`r07-c2-integrated`), “Thích nghi và giữ nền”:** Với bạn, lớp nghĩa công
việc đặt việc suy xét phương án bên cạnh nhu cầu hài hòa, điều phối và gìn giữ;
bản đọc chưa đủ căn cứ để biến thế cân bằng này thành một thói quen thực tế.

Hai câu cùng phụ thuộc `symbol-1`, `symbol-2`, `symbol-5`, `symbol-7`,
`career-cross-palace`, `palace-context`; passages `principal-1`, `principal-2`,
`principal-5`, `principal-7`, `layout-palaces`, `context-not-uniform`.
Deduplication identity đề xuất:
`career:adaptation-harmony-stewardship:menh5:quan2:no1-7`. Không thêm insight thứ
hai vì chưa có conflict rule để tách một kết luận khác.

### Mẫu C0 — trạng thái từ chối

**Thông báo, không phải substantive claim:** Chưa đủ căn cứ để luận chủ đề Công
việc khi Quan Lộc không có chính tinh trực tiếp. Hệ thống không mượn sao từ cung
khác hoặc tạo lời khuyên thay thế khi quy tắc liên hệ chưa được duyệt.

Mẫu này không có claim ID/evidence claim vì không đưa ra nhận định về người đọc;
validation reason đề xuất là `insufficient-context` (dùng enum hiện có).

## SignalSet và Swap Test tương lai

Hai input dưới thuộc đúng lưới R06, không có tên hay dữ liệu người thật. Chúng chỉ
là fixture regression của engine hiện tại, không phải oracle Tử Vi:

| Fixture            | Input tổng hợp                                                    | Tín hiệu quan sát                                    | Lựa chọn kỳ vọng sau khi duyệt |
| ------------------ | ----------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------ |
| `r07-c1-synthetic` | nam, dương lịch 15/02/1950 00:00; `split_at_15`; `next_day_at_23` | Mệnh Thiên Phủ; Quan Thiên Tướng; Nô Thiên Lương     | chỉ C1                         |
| `r07-c2-synthetic` | nam, dương lịch 15/09/1958 00:00; cùng policy                     | Mệnh Thiên Đồng; Quan Thiên Cơ; Nô Tử Vi + Thiên Phủ | chỉ C2                         |

Swap Test tương lai chỉ đạt khi cả hai template đã được duyệt và grounded: hoán đổi
C1/C2 phải làm predicate fail; kết luận phải khác về trọng tâm “phối hợp–gìn giữ”
so với “thích nghi–hài hòa–giữ nền”, không chỉ khác tên sao. Nếu output an sao đổi,
dừng và điều tra version drift; không sửa fixture âm thầm.

## Thứ tự R07B và tiêu chí nghiệm thu

1. Product Owner duyệt, sửa hoặc loại văn C1/C2; BA kiểm tra từng câu và giới hạn.
2. Chỉ triển khai C1 trước: exact predicates, template draft mới, evidence resolver,
   positive/negative/missing-evidence/dedup tests. Chạy QA rồi mới mở C2.
3. C2 cần thêm test tín hiệu căng nhau; nếu chưa có conflict policy, giữ đúng câu
   “thế cân bằng” hoặc trả insufficient, không tự chọn một phía.
4. Chạy lại coverage 960 ca và Swap Test sau tích hợp. Coverage chỉ là chỉ số quan
   sát, không phải tiêu chí duyệt quy tắc.
5. C0 vẫn BLOCKED cho đến khi có source passage và connecting rule riêng được duyệt.

R07B đạt khi mỗi claim resolve đúng rule/passage/signal, unknown hoặc chưa duyệt
template fail-closed, hai fixture chọn khác template, hoán đổi fail, thiếu evidence
không sinh claim, không có giả định đời thực và UI giữ được trạng thái thiếu căn cứ.
Không được tuyên bố xác minh Tử Vi độc lập từ các test này.

## Kiểm tra đã thực hiện và rủi ro mở

- Đọc và đối chiếu R06, ReadingBrief v1, claim registry, `knowledge.ts` và
  `catalog.ts`; không thêm nguồn mới.
- Chạy scan tạm trên lưới tổng hợp để lấy hai fixture nêu trên. Scan in đủ ba cấu
  trúc nhưng vượt timeout mặc định 5 giây (hoàn tất khoảng 6,4 giây), nên **không
  ghi nhận là test pass**; file tạm đã xóa.
- Chưa chạy schema/unit/E2E vì task chỉ sửa tài liệu và không đổi runtime.
- Rủi ro lớn nhất: nguồn hiện tại chứng minh tiền đề biểu tượng, không chứng minh
  quy tắc liên cung Nam phái. C1/C2 chỉ đủ để duyệt sản phẩm ở phạm vi
  `editorial-symbolic`; nếu Product Owner yêu cầu “quy tắc chuyên môn đã xác minh”,
  cả hai phải chuyển `BLOCKED` chờ nghiên cứu nguồn bổ sung.

Trạng thái: **WAITING FOR PRODUCT OWNER REVIEW**. Không khởi động R07B.
