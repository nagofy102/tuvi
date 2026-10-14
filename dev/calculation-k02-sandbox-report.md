# HV-K02A — HKO and `lasotuvi` sandbox report

Ngày thực hiện: 14/10/2026. Phạm vi chỉ nghiên cứu, không sửa production.

## HKO: access, rights and calculation fit

### Tài nguyên đã truy cập

| Locator                                               | Kết quả                                           | Digest/Revision                   |
| ----------------------------------------------------- | ------------------------------------------------- | --------------------------------- |
| `https://www.hko.gov.hk/en/gts/time/conversion.htm`   | HTTP 200; annual PDFs 1901–2100                   | page revision hiển thị 10/01/2025 |
| `.../calendar/pdf/files/1985e.pdf`                    | HTTP 200; bảng 1985 một trang                     | SHA-256 `fd8c0c...41eb6`          |
| `https://www.hko.gov.hk/en/gts/time/calendarinfo.htm` | HTTP 200; mô tả lịch âm-dương, sóc và tháng nhuận | SHA-256 `9e5e3f...6cb`            |
| HKO Open Data index + DATA.GOV.HK dataset             | HTTP 200                                          | dataset xác nhận API/CSV          |
| HKO Open Data API documentation                       | HTTP 200; v1.15, Sep 2025                         | SHA-256 `1b9957...e32`            |
| DATA.GOV.HK Terms                                     | HTTP 200; v1.2, 26/05/2025                        | SHA-256 `c901a8...de0`            |

DATA.GOV.HK Terms cho phép browse/download/distribute/reproduce Data cho mục đích
thương mại và phi thương mại nếu tuân thủ điều khoản, nêu rõ nguồn, thừa nhận quyền
sở hữu và attribution phù hợp; dữ liệu là “AS IS”. Đây không phải xác nhận độ đúng.
Riêng PDF tài liệu API ghi không được sao chép toàn bộ/một phần khi chưa có phép
HKO; dự án chỉ ghi citation, revision và paraphrase giới hạn, không nhập tài liệu.

### Convention/profile finding

- HKO gọi đây là Chinese Agricultural Calendar/Nongli, một lịch âm-dương; tháng
  bắt đầu tại sóc và tháng nhuận phát sinh để điều hòa năm chí tuyến.
- Trang conversion cảnh báo một số sóc/tiết khí tương lai gần nửa đêm có thể làm
  ngày lệch một ngày. Điều này củng cố nhu cầu pin timezone/convention.
- API contract chỉ nhận `date=YYYY-MM-DD`, không có timezone parameter và tài liệu
  đã xem không phát biểu timezone basis. Không được tự suy luận UTC+8 chỉ vì HKO ở
  Hong Kong.
- Bảng 1985 quan sát `1985-03-21 → day 1, second lunar month` (không ghi leap).
  API 2023 quan sát `03-21 → 二月三十`, `03-22 → 閏二月初一`, `04-19 → 閏二月廿九`,
  `04-20 → 三月初一`.
- API hiện chỉ chấp nhận current year đến current year + 2; request 1985 trả
  `Not Available`. Historical PDF, không phải API, là locator cho ca 1985.

Kết luận: HKO được giữ là `candidate` cho calendar field family. Chưa đủ để admit
expected cho Huyền Vi vì timezone, astronomical implementation/revision và exact
compatibility với `nam-phai-chinese-lunar-v1` chưa khóa. HKO không hỗ trợ an sao.

## `doanguyen/lasotuvi@0.1.2`: isolated sandbox

### License, dependency and safety review

- Clone tạm `/tmp`, pin commit `ace8379a3ea033674e8a9096f5b98a9e2041eace`.
- Root `LICENSE` là MIT, copyright 2016 doanguyen. `setup.py` khai package 0.1.2;
  `lasotuvi.__version__` lại ghi 1.0.1, nên version metadata nội bộ không nhất quán.
- Dependencies pin rất cũ: `ephem==3.7.6.0`, `pytest==3.5.0`, `mypy==0.580`,
  `typed-ast==1.1.0` và các package 2017–2018. Không cài dependency nào.
- Static `rg` trên Python source không thấy `subprocess`, `os.system`, `Popen`,
  `eval`, `exec`, network/socket, pickle/marshal hoặc `shell=True`. Đây là bounded
  pattern scan, không phải security certification.
- Import trực tiếp local source bằng Python 3.12.14 phát SyntaxWarning do dùng `is`
  với integer, nhưng calendar và full-chart call hoàn tất. Không sửa source clone.

### Reproducible execution

Đã gọi trực tiếp `Lich_HND.S2L` và `App.lapDiaBan` với synthetic inputs. Không dùng
tên/ngày sinh cá nhân, không có network trong lúc thực thi module.

- `2000-08-29`, `gioSinh=6`, male, UTC+7: âm `1/8/2000` thường; Mệnh Thìn,
  Thân Dần; full 12-palace/major-star snapshot lưu trong observations.
- `1985-03-21`: HND UTC+7 trả `1/2/1985` nhuận, UTC+8 trả `1/2/1985` thường.
- `2023-03-21/22/04-19/04-20` ở UTC+7 và +8 lần lượt trả 30/2 thường,
  1/2 nhuận, 29/2 nhuận, 1/3 thường.
- Bounded scan 1950–2026 tìm thấy timezone divergence; ví dụ đầu tiên quan sát
  `1950-08-13`: UTC+7 là 1/7, UTC+8 là 30/6. Đây chỉ là probe, không expected.

### Domain/profile blockers

1. Repository không khai rõ Nam/Bắc phái hoặc exact calculation profile.
2. `lapDiaBan` nhận `thangNhuan` từ converter nhưng không sử dụng cờ này khi dựng
   địa bàn. Hai tháng cùng số có thể bị hợp nhất về chart input.
3. `gioSinh` là index địa chi 1–12, không phải civil datetime; không có logic đủ để
   kiểm thử ranh giới 22:59/23:00/00:00/01:00 hay rollover ngày.
4. Source comment nêu HND/Meeus và một số sách/rule rời rạc nhưng chưa đủ provenance
   để xác nhận toàn bộ thuật toán hay profile tương thích.
5. Tests import `pytest`; môi trường không có pytest và dependency pin cũ không được
   phép cài. Lệnh test thực trả `No module named pytest`. Direct smoke script pass.

Kết luận: đây là implementation family hữu ích để phát hiện khác biệt và khảo sát
code, nhưng **không phải oracle** và chưa comparable với production full-chart.

## Bất đồng `1985-03-21`

| Observation      | Kết quả    |
| ---------------- | ---------- |
| HKO annual table | 1/2 thường |
| HND UTC+7        | 1/2 nhuận  |
| HND UTC+8        | 1/2 thường |
| K01 6tail family | 1/2 thường |

Sự khác nhau của chính HND theo timezone cho thấy “đa số implementation” không phải
cách giải quyết. HKO chưa công bố timezone basis trong locator đã xem; 6tail và HKO
cũng chưa được chứng minh cùng astronomical/profile rules. Trạng thái tiếp tục là
`unresolved-domain-conflict`; không tạo golden fixture và không đổi production.

## `@dqcai/vn-lunar`

Không chạy lại hoặc dùng làm family độc lập. Trạng thái giữ `blocked` vì license
discrepancy và algorithm lineage chưa được xác minh, đúng quyết định Product Owner.

## Commands/checks thực chạy

- `curl -L --fail` các locator HKO/DATA.GOV.HK nêu trên; HTTP 200.
- `pdftotext -layout` cho annual table/API documentation; đọc bounded locators.
- `git clone`, checkout exact commit, inspect LICENSE/setup/dependencies/source.
- `rg` bounded unsafe-pattern scan.
- Direct Python 3.12 calls cho HND conversion/full chart: pass với SyntaxWarning.
- `python3 -m pytest ...`: không chạy được vì sandbox không có pytest; không cài.

Không có dependency/lockfile/source production nào thay đổi.
