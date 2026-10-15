# HV-R07B — Khóa văn mẫu mở rộng luận Công việc

Ngày: 14/10/2026 (UTC). Baseline: `4bd3c78045bac18348886a323f6c5dcbd7aa3d60`
(`origin/main`). Trạng thái: **TẠM DỪNG BỞI HV-K00 KNOWLEDGE-FIRST RESET**.
Văn mẫu chưa được Product Owner duyệt để triển khai; R07B không tiếp tục trong khi
K00 chờ review.

Tài liệu này là cổng nội dung của R07B. Hai mẫu chỉ tổng hợp lớp nghĩa biểu tượng
đã có trong nguồn và rule biên tập hiện hành; chúng không chứng nhận quy tắc Nam
phái độc lập, không suy năng lực, hành vi, nghề nghiệp hoặc kết quả thực tế. Chưa
được đổi template sang `user-approved` và chưa được đưa vào runtime.

## Văn mẫu cần duyệt

### C1 — Phối hợp, trách nhiệm và gìn giữ

**Kết luận:** Trong lá số của bạn, công việc đặt trọng tâm vào sự phối hợp và
trách nhiệm.

**Insight — Nền gìn giữ:** Gìn giữ nguồn lực và kinh nghiệm là hai lớp nghĩa đi
cùng trọng tâm ấy, không phải lời khẳng định về chức vụ hay thành quả.

Không có insight thứ hai: nguồn hiện tại không cho phép tách “gìn giữ” hoặc “bảo
trợ” thành một nhận định cá nhân độc lập.

### C2 — Suy xét, thích nghi và tín hiệu được giữ song song

**Kết luận:** Trong lá số của bạn, công việc đặt trọng tâm vào sự suy xét và thích
nghi.

**Insight — Các lớp nghĩa song song:** Các lớp nghĩa đi cùng là hài hòa, điều phối
và gìn giữ nguồn lực; chúng được đặt cạnh trọng tâm thích nghi, chưa dùng để kết
luận một xu hướng duy nhất.

Không có insight thứ hai: dự án chưa có conflict rule được duyệt để hòa giải hoặc
xếp hạng các lớp nghĩa suy xét, thích nghi, hài hòa, điều phối và gìn giữ.

## Truy vết từng câu

Mọi predicate dưới đây phải khớp chính xác trên cung gốc. Không được dùng sao hội
chiếu, phụ tinh, độ sáng, Tứ Hóa, cách cục hoặc vận hạn để làm predicate thay thế.

| Câu                   | Claim dự kiến                                                      | Exact predicates                                                                                                                   | Rules                                                                       | Passages / sources                                                                                                                                                 | Phạm vi được phép                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1 kết luận           | `r07-c1-conclusion`                                                | `Mệnh=[Thiên Phủ]`; `Quan Lộc=[Thiên Tướng]`; `Nô Bộc=[Thiên Lương]`; không có chính tinh bổ sung; `career-synthesis-gate=true`    | `symbol-11`, `career-cross-palace`, `palace-context`                        | `principal-11` / `classical-stars-vol1`; `layout-palaces` / `classical-layout-vol2`; `context-not-uniform` / `classical-context-vol1`                              | Chỉ nêu trọng tâm phối hợp–trách nhiệm của biểu tượng Thiên Tướng tại Quan Lộc trong cấu trúc đủ cổng tổng hợp.                                    |
| C1 insight, mệnh đề 1 | `r07-c1-integrated`                                                | cùng bộ predicate C1                                                                                                               | `symbol-7`, `symbol-12`, `career-cross-palace`, `palace-context`            | `principal-7`, `principal-12` / `classical-stars-vol1`; `layout-palaces` / `classical-layout-vol2`; `context-not-uniform` / `classical-context-vol1`               | Đặt lớp nghĩa gìn giữ/phân bổ của Thiên Phủ tại Mệnh và kinh nghiệm của Thiên Lương tại Nô Bộc bên cạnh trọng tâm; không nói chúng gây ra hành vi. |
| C1 insight, mệnh đề 2 | không tạo claim mới; limitation cố định của cùng template          | cùng bộ predicate C1                                                                                                               | `palace-context`                                                            | `context-not-uniform` / `classical-context-vol1`                                                                                                                   | Chặn nâng cấp biểu tượng thành năng lực hoặc thành quả.                                                                                            |
| C2 kết luận           | `r07-c2-conclusion`                                                | `Mệnh=[Thiên Đồng]`; `Quan Lộc=[Thiên Cơ]`; `Nô Bộc=[Tử Vi, Thiên Phủ]`; không có chính tinh bổ sung; `career-synthesis-gate=true` | `symbol-2`, `career-cross-palace`, `palace-context`                         | `principal-2` / `classical-stars-vol1`; `layout-palaces` / `classical-layout-vol2`; `context-not-uniform` / `classical-context-vol1`                               | Chỉ nêu lớp nghĩa suy xét–thích nghi của Thiên Cơ tại Quan Lộc trong cấu trúc đủ cổng tổng hợp.                                                    |
| C2 insight, mệnh đề 1 | `r07-c2-integrated`                                                | cùng bộ predicate C2                                                                                                               | `symbol-1`, `symbol-5`, `symbol-7`, `career-cross-palace`, `palace-context` | `principal-1`, `principal-5`, `principal-7` / `classical-stars-vol1`; `layout-palaces` / `classical-layout-vol2`; `context-not-uniform` / `classical-context-vol1` | Đặt hài hòa của Thiên Đồng bên cạnh điều phối của Tử Vi và gìn giữ/phân bổ của Thiên Phủ.                                                          |
| C2 insight, mệnh đề 2 | không tạo claim mới; trạng thái conflict cố định của cùng template | cùng bộ predicate C2; `conflictResolution=null`                                                                                    | `palace-context`                                                            | `context-not-uniform` / `classical-context-vol1`                                                                                                                   | Giữ các tín hiệu song song; cấm tự hòa giải, xếp hạng hoặc suy thành hành vi cá nhân.                                                              |

Revision nguồn và rule phải được runtime ghim theo ReadingBrief contract; bảng này
không tạo revision mới. Mỗi `symbol-*` phải resolve cả passage sao tương ứng lẫn
`context-not-uniform`, không chỉ các ID duy nhất hiển thị trong bảng.

## Định danh và điều kiện khóa sau duyệt

| Cấu trúc | Template dự kiến                                      | Deduplication identity                                         |
| -------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| C1       | một conclusion và một insight cùng semantic inference | `career:coordination-stewardship-experience:menh7:quan11:no12` |
| C2       | một conclusion và một insight cùng semantic inference | `career:adaptation-harmony-stewardship:menh5:quan2:no1-7`      |

Sau khi Product Owner duyệt **nguyên văn**, DEV mới được tạo immutable template
version và approval record cho đúng text, predicate, rules, passages, sources và
deduplication identity này. Sửa bất kỳ thành phần nào phải quay lại cổng duyệt.

## Kế hoạch triển khai sau duyệt — chưa thực hiện

1. C1: thêm exact predicates, evidence resolution, registry record; kiểm tra
   positive, negative, thiếu evidence, thêm/bớt chính tinh và revision mismatch.
2. C2: làm sau C1; ngoài các kiểm tra trên phải xác nhận `conflictResolution=null`
   giữ fail-closed và không tự sinh lời hòa giải.
3. Chạy Swap Test bằng hai SignalSet tổng hợp đã ghi tại R07A. Fixture chỉ kiểm tra
   selection deterministic và khác biệt ý nghĩa, không phải oracle Tử Vi.
4. Chạy lại đúng lưới 960 ca R06, báo cáo cả mẫu số, lý do loại và coverage trước/
   sau. Coverage không phải tiêu chí để nới predicate hoặc nguồn.
5. Giữ nguyên A1, UI, privacy và các nhánh ngoài phạm vi. Quan Lộc vô chính diệu
   tiếp tục `BLOCKED`.

## Cổng nghiệm thu R07B

- Chỉ đúng exact signature chọn đúng template; mọi mismatch hoặc thiếu evidence
  trả trạng thái thiếu căn cứ, không fallback sang A1/C1/C2 khác.
- Mỗi claim resolve đủ rule, passage, source và matched signal; không có unknown
  field, free-text interpolation hoặc template chưa duyệt.
- C1/C2 cho hai kết luận khác nhau về ý nghĩa; Swap Test không chỉ thay tên sao.
- C2 không tự quyết định tín hiệu nào thắng và không tạo câu về hành vi thực tế.
- Không có insight trùng semantic key; một insight là kết quả hợp lệ.
- Báo cáo coverage phân biệt selection kỹ thuật với xác minh chuyên môn độc lập.

## Quyết định Product Owner cần trả lời

Duyệt hoặc yêu cầu sửa nguyên văn bốn đoạn **Kết luận/Insight** ở trên. Cho đến khi
có xác nhận, R07B implementation là **BLOCKED BY CONTENT APPROVAL**.
