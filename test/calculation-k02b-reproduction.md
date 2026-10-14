# HV-K02B — Reproduction log

Ngày chạy: 14/10/2026. Worktree: `task/hv-k02b-calculation-disagreement`.

## Phạm vi

Log này chỉ tái lập observation cho bất đồng ngày `1985-03-21` và rà ứng viên
full-chart. Không output nào là golden fixture, không xác nhận profile Nam phái và
không thay đổi production. Input đều là ngày tổng hợp, không phải hồ sơ cá nhân.

## 1. JPL Horizons: mốc thiên văn

Nguồn: [Horizons API](https://ssd-api.jpl.nasa.gov/doc/horizons.html), API response
ghi version 1.2 và ephemeris DE441. Query Sun=`10`, Moon=`301`, center địa tâm
`500@399`, `QUANTITIES=31` (apparent observer ecliptic longitude), bước 10 phút.

```bash
for window in '1985-03-20 1985-03-22' '1985-04-19 1985-04-21'; do
  set -- $window
  for body in 10 301; do
    curl -L --fail --silent --show-error \
      "https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND=%27${body}%27&OBJ_DATA=%27NO%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27OBSERVER%27&CENTER=%27500@399%27&START_TIME=%27${1}%27&STOP_TIME=%27${2}%27&STEP_SIZE=%2710%20m%27&QUANTITIES=%2731%27&CSV_FORMAT=%27YES%27"
  done
done
```

Script Python 3.12 chỉ dùng standard library: parse các dòng giữa `$$SOE`/`$$EOE`,
unwrap kinh độ qua 360°, nội suy tuyến tính trong đúng hai mẫu 10 phút kẹp mốc.
Hiệu Moon−Sun được chuẩn hóa về `[-180, 180)` rồi nội suy qua 0°.

Kết quả thực chạy:

```text
March Sun 0°:       [16:10 359.9974123°, 16:20 0.0043123°]
                     -> 1985-03-20 16:13:45.017 UTC
March conjunction:  [11:50 -0.0661256°, 12:00 0.0099102°]
                     -> 1985-03-21 11:58:41.798 UTC
April Sun 30°:      [03:20 29.9960685°, 03:30 30.0028501°]
                     -> 1985-04-20 03:25:47.838 UTC
April conjunction:  [05:20 -0.0147325°, 05:30 0.0603834°]
                     -> 1985-04-20 05:21:57.678 UTC
```

Civil-date conversion by adding fixed offsets:

| Event             | UTC+7          | UTC+8          |
| ----------------- | -------------- | -------------- |
| March Sun 0°      | 20/03 23:13:45 | 21/03 00:13:45 |
| March conjunction | 21/03 18:58:42 | 21/03 19:58:42 |
| April Sun 30°     | 20/04 10:25:48 | 20/04 11:25:48 |
| April conjunction | 20/04 12:21:58 | 20/04 13:21:58 |

SHA-256 raw responses được ghi trong JSON. Nội suy là derivation nghiên cứu có
khoảng kẹp 10 phút, không được gọi là event-time oracle. Trang API không nêu giấy
phép tái sử dụng dữ liệu; artifact chỉ giữ metadata/kết quả dẫn xuất và citation,
chờ rights review nếu muốn lưu raw response lâu dài.

## 2. Cross-check công khai

```bash
curl -L --fail --silent \
  https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/1985e.pdf -o 1985e.pdf
pdftotext -layout 1985e.pdf 1985e.txt
curl -L --fail --silent \
  https://www.hko.gov.hk/en/gts/time/calendarinfo.htm -o calendarinfo.htm
curl -L --fail --silent \
  https://www.hko.gov.hk/en/gts/time/conversion.htm -o conversion.htm
curl -L --fail --silent \
  https://astropixels.com/ephemeris/phasescat/phases1901.html -o phases1901.html
```

- HKO 1985: 21/03 là ngày 1 tháng 2 thường; xuân phân ghi ngày 21/03; 20/04
  là ngày 1 tháng 3 và Corn Rain ngày 20/04.
- HKO giải thích tháng bắt đầu ở new moon và lưu ý gần nửa đêm có thể làm ngày
  conversion lệch một ngày, nhưng locator đã xem không khóa timezone hoặc thuật
  toán gán tháng nhuận đầy đủ.
- AstroPixels ghi new moon `21 Mar 11:59 UTC` và `20 Apr 05:22 UTC`, khớp JPL
  đến phút hiển thị. Đây chỉ là family corroboration cho thời điểm sóc, không cho
  đánh số tháng hoặc an sao; trang có copyright nên chỉ citation, không copy bulk.

## 3. HND probe và phân loại mismatch

Pinned reference: `doanguyen/lasotuvi@ace8379a3ea033674e8a9096f5b98a9e2041eace`,
MIT. Không cài dependencies.

```bash
PYTHONPATH=<sandbox>/lasotuvi python3 - <<'PY'
from lasotuvi.Lich_HND import S2L
print(S2L(21, 3, 1985, 7))
print(S2L(21, 3, 1985, 8))
PY
```

Output thực: UTC+7 `[1, 2, 1985, 1]`; UTC+8 `[1, 2, 1985, 0]`.

`Lich_HND.py` lấy solar-longitude sector tại ranh giới ngày dân dụng và làm tròn
new moon theo timezone. Dữ liệu JPL chứng minh xuân phân đổi civil date giữa hai
offset, nên khác biệt này được phân loại `profile-mismatch / timezone-civil-date-
boundary`, chưa phải `implementation-defect`. Cần rule chuẩn chính thức để kết
luận cách gán principal term khi event/new moon sát cùng ngày.

Nguồn chính thức đã xác định nhưng chưa trích full text tự động:
[GB/T 33661-2017 — 农历的编算和颁行](https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=E107EA4DE9725EDF819F33C60A44B296),
trạng thái hiện hành, ban hành 12/05/2017, hiệu lực 01/09/2017,主管/归口 中国科学院.
Trang có nút preview/download nhưng request không có browser session bị redirect
về metadata. Cần review thủ công hợp lệ trước khi trích điều khoản; không bypass.

## 4. Full-chart family screening

Các clone chỉ vào thư mục tạm, không cài package và không đưa mã vào repository:

```bash
git clone --depth 1 https://github.com/nmhaaa3218/TuViMCP.git
git clone --depth 1 https://github.com/Renhuai123/ziwei-doushu.git
git clone --depth 1 https://github.com/thaylinh/tuvi-api.git
```

| Candidate            | Revision      | License quan sát               | Kết quả                                                                                    |
| -------------------- | ------------- | ------------------------------ | ------------------------------------------------------------------------------------------ |
| TuViMCP              | `039b2270...` | Apache-2.0                     | Không độc lập: `_engine` là lineage ansaotuvi/lasotuvi; similarity 0.92–0.96 ở ba file lõi |
| Renhuai ziwei-doushu | `f106f6bb...` | MIT code; content tách license | Không độc lập: `algorithm.ts` ghi dựa trên iztro và dependency có iztro/lunar-javascript   |
| thaylinh tuvi-api    | `f736ac47...` | Không thấy license             | Blocked: engine tự ghi tham khảo iztro + lasotuvi; lineage/rights/profile chưa đủ          |

Không ứng viên nào được chạy như oracle hoặc lưu output full-chart. Chưa tìm thấy
family vừa độc lập với iztro/lasotuvi, vừa công bố exact profile tương thích
`nam-phai-chinese-lunar-v1`. `@dqcai/vn-lunar` không được chạy và tiếp tục blocked.

## Kiểm tra artifact

Chạy sau khi tạo file:

```bash
python3 -m json.tool test/calculation-k02b-observations.json >/dev/null
npx prettier --check dev/calculation-k02b-disagreement-report.md \
  test/calculation-k02b-reproduction.md test/calculation-k02b-observations.json
git diff --check
```
