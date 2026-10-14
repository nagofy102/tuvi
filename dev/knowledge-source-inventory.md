# HV-K01A — Source discovery and book inventory

Ngày nghiên cứu: 14/10/2026 (Asia/Bangkok). Trạng thái:
**WAITING FOR SOURCE INVENTORY REVIEW**.

## Kết quả ngắn

Đợt K01A đăng ký **12 nguồn ứng viên**: 3 tài nguyên thuộc cùng dòng văn bản
`紫微斗數全書`, 2 nguồn lịch pháp công khai và 7 biểu ghi sách tiếng Việt. Đây là
inventory thực tế sau khi mở locator/API; không phải danh sách mong muốn. Không nguồn
nào được nâng thành `approved-for-implementation`, không passage/rule mới được tạo.

Mục tiêu 15 nguồn không đạt vì tìm kiếm có kiểm soát chỉ tìm được 12 record đủ locator,
rights state và family để lưu trung thực. Google Books API trả HTTP 429; Library of
Congress endpoint trả nội dung không parse được trong môi trường; không dùng snippet
tìm kiếm hoặc tự điền metadata để bù số lượng.

| Nhóm                              | Số lượng | Giá trị hiện tại                                            | Giới hạn chính                                                               |
| --------------------------------- | -------: | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Classical transcription/facsimile |        3 | Calculation, sao, biểu tượng, cách cục ở mức nguồn ứng viên | Cùng textual lineage; edition/authorship và school chưa xác minh             |
| Lịch pháp công khai               |        2 | HKO có bảng 1901–2100; USNO cho nền phương pháp             | Không định nghĩa Tử Vi; profile/timezone phải được khóa trước so sánh        |
| Catalogue sách Việt               |        7 | Mở rộng inventory calculation và luận Công việc/toàn cục    | Chỉ metadata; không có passage/page locator, rights phần lớn chưa rõ/hạn chế |

JSON chuẩn hóa nằm tại `knowledge-source-inventory.json` và tuân theo schema v0.1
của K01C-Lite. Hai file này độc lập với registry runtime và registry K01C; PM phải
review trước khi quyết định ingest.

## Nguồn đã truy cập thực tế

### 1. Dòng `紫微斗數全書`

- Mở pinned revision Wikisource quyển một (`oldid=7913704`) và quyển hai
  (`oldid=1963110`); MediaWiki API đều trả HTTP 200.
- Mở Internet Archive metadata API của item `20260506_20260506_1217`; record có ARK
  `ark:/13960/s23vzp6g9w0`, facsimile, OCR và metadata ghi bảy quyển/1600.
- Không coi ba record là ba nguồn độc lập. Wikisource và facsimile cùng
  `sourceFamilyId=zwds-quanshu-textual-lineage-unresolved`; metadata ngày/tác giả
  của Archive do uploader cung cấp nên item bị `blocked` cho đến khi có catalogue
  độc lập và rights review.

### 2. Nguồn lịch pháp

- Hong Kong Observatory: trang `Gregorian-Lunar Calendar Conversion Table` trả HTTP
  200, công khai link PDF từng năm 1901–2100; PDF 2026 cũng mở được. Nguồn có tiềm
  năng cho K02 nhưng chưa phải oracle cho profile Trung Quốc nếu chưa khóa timezone,
  convention và quyền ingest.
- United States Naval Observatory: `Introduction to Calendars` trả HTTP 200 và có
  mục Chinese Calendar ở mức tổng quan. Đây là nguồn phương pháp độc lập, không đủ
  chi tiết làm expected conversion và không liên quan đến an sao.

### 3. Catalogue sách tiếng Việt

Đã mở Open Library edition API và author API cho bảy record:

| Edition       | Tựa/creator theo catalogue                        | NXB/năm                               | Provenance import        |
| ------------- | ------------------------------------------------- | ------------------------------------- | ------------------------ |
| `OL18177187M` | _Tu vi dau so phu giai_ / Van Trinh Thái          | Dainamco, 1974                        | Talis MARC               |
| `OL61948348M` | _Tʾư vi đʾâu số phú giʾai_ / Thái Vân Trình       | Đất Việt, 1974, 274 tr.               | Harvard MARC             |
| `OL61732989M` | _Tử-vi dẩu số_ / Đằng Thái Thứ Lang Vân           | Đại Nam, 1981, 352 tr.                | Harvard MARC             |
| `OL27107461M` | _Tử vi đẩu số_ / Nguyễn Mạnh Bảo                  | Đại Nam, không rõ năm, 242 tr.        | SFPL MARC                |
| `OL27216707M` | _Tử vi đẩu số_ / Vũ Mê Linh                       | Hồng Đức, 2012, 295 tr.               | SFPL MARC                |
| `OL62187182M` | _Tʾư vi đʾâu số toàn thư_ / Trần Đoàn, Vũ Tài Lục | Ngân Hà thư xã, không rõ năm, 341 tr. | Harvard MARC             |
| `OL24558052M` | _Tử-vi lý-số dẫn-giải_ / Nguyễn Thế Tạo           | Tử vi Nhân Quang, 2004                | Library of Congress MARC |

Open Library cộng với provenance MARC của Harvard/SFPL/LOC cung cấp hai lớp metadata
cho một số record, nhưng chưa được ghi là “hai catalogue độc lập đã cross-check” vì
catalogue nguồn chưa được mở trực tiếp. Hai record “phú giải” có tựa gần nhau nhưng
creator/NXB khác; không gộp chúng khi chưa đối chiếu bản vật lý.

## Coverage tri thức ở mức inventory

- **Tổng quan:** classical records dự kiến chạm an cung, chính/phụ tinh, biến hóa,
  biểu tượng, cách cục và vận; catalogue Việt bổ sung các đầu mối luận giải và worked
  chart. Đây chỉ là `knowledgeScopes` theo mô tả/tựa và lịch sử repository, không xác
  nhận nội dung từng trang.
- **Calculation core:** quyển hai Wikisource là đầu mối rule có locator; HKO là family
  lịch độc lập; facsimile dùng collation sau khi giải quyết identity. Chưa có family
  thứ hai đủ rule an Mệnh–Thân/chính tinh để đạt yêu cầu đối chiếu trọng yếu.
- **Công việc:** chưa có passage hợp pháp có locator về Quan Lộc, liên cung hoặc điều
  kiện/ngoại lệ. Catalogue sách không được biến thành quy tắc. Vì vậy K04 slice Công
  việc vẫn `blocked` ở tầng nội dung dù inventory đã rộng hơn.

## Quyền, truy cập và chất lượng

- Wikisource được ghi open-license cho đóng góp biên tập, nhưng quyền/status của văn
  bản nền vẫn cần đánh giá theo jurisdiction; chỉ cho phép minimal quotation có review.
- Internet Archive không hiển thị license trong metadata item: không phân phối scan
  hoặc OCR. OCR Tesseract không được coi là nguyên văn chuẩn.
- HKO/USNO được truy cập miễn phí, nhưng inventory ghi rights `unknown` để tránh suy
  diễn public access thành quyền ingest/reuse.
- Các ấn bản 2004/2012 được đánh dấu `restricted` và `blocked`; nếu cần mua/mượn,
  phải xin PO duyệt. Các record catalogue khác chỉ cho discovery, không phải passage.

## Bất đồng và chống hallucination

1. Không suy hệ phái Nam Phái từ tên tác phẩm, cách repository cũ dùng hoặc metadata
   catalogue; tất cả school claim liên quan vẫn `unverified`.
2. Không dùng metadata uploader Archive để xác nhận tác giả/1600/edition.
3. Không coi volume, scan và transcription cùng tác phẩm là independent votes.
4. Không dùng Open Library search result, Google snippet hoặc OCR làm passage.
5. Không suy phạm vi “Công việc” thành claim nếu chưa có đoạn nguồn, điều kiện và
   profile; catalogue chỉ tạo đường dẫn nghiên cứu tiếp.

## Đề xuất review và dependency tiếp theo

1. PM/BA review 12 records; chỉ merge record đủ identity/rights vào registry K01C.
2. K01B xác định implementation family và profile của engine/site độc lập; kết quả
   không tự nâng bất kỳ book candidate nào.
3. Trước K02, xác nhận HKO convention/timezone và quyền dùng bảng làm fixture.
4. Trước rule extraction cho Công việc, cần quyền truy cập hợp pháp ít nhất một ấn
   bản có mục lục/trang Quan Lộc và một family độc lập để đối chiếu.
5. K01 dừng để Product Owner review; không mở K02/K03 từ artifact này.

## Kiểm tra có thể tái lập

- HTTP: `curl -L` giới hạn tới các locator/API được liệt kê; trạng thái quan sát đã
  ghi trong từng record.
- JSON: parse, source ID uniqueness, target reference và required metadata checks.
- Repository: Prettier và `git diff --check` phải qua trước commit.
