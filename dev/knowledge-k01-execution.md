# HV-K01 — Execution ownership and integration plan

Ngày 14/10/2026. Coordinator/integration owner: PM main thread.
Baseline chung: `e7c4f0fa902d173992948af8acaae5f53fb75c8a`.
Hai task đã hoàn tất và được PM tích hợp sau ownership/evidence review; các worktree
được giữ nguyên cho tới khi Product Owner review K01.

## Worktree assignments

| Task            | Role                   | Branch                          | Worktree               | Exclusive files                                                                         |
| --------------- | ---------------------- | ------------------------------- | ---------------------- | --------------------------------------------------------------------------------------- |
| K01A            | AI Research + BA       | `task/hv-k01a-source-inventory` | `/workspace/tuvi-k01a` | `dev/knowledge-source-inventory.md`, `dev/knowledge-source-inventory.json`              |
| K01B            | AI Research + DEV + QA | `task/hv-k01b-engine-survey`    | `/workspace/tuvi-k01b` | `dev/calculation-implementation-survey.md`, `test/calculation-observation-vectors.json` |
| K01 integration | PM                     | `work`                          | `/workspace/tuvi`      | shared registry/schema, READMEs and integration report only                             |

Không task nào được sửa `src/`, registry/schema chung, R07B, UI hoặc AI Writer.
Task branch không push; PM review, cherry-pick theo thứ tự và là người duy nhất push
`origin/main`.

Task commits nhận từ worktree: K01A `8c982b48...`; K01B `bd514d95...` và correction
`1143037d...`. Integration commits có SHA khác do cherry-pick và được ghi trong Git.

## Shared contract

Hai task dùng `knowledge-source-registry.schema.json` làm từ điển field tối thiểu,
nhưng lưu candidate trong artifact riêng. Không candidate nào tự động được merge vào
`knowledge-source-registry.json`, đổi trạng thái hoặc làm oracle. Nếu thiếu field,
task ghi blocker trong report; chỉ PM mới đề xuất contract revision.

## Acceptance

### K01A

- Nghiên cứu nguồn thực tế, ưu tiên miễn phí/hợp pháp; nguồn trả phí chỉ ghi blocked.
- Bao phủ inventory tổng quan, đào sâu calculation core và Công việc.
- Mỗi record có bibliographic origin, scope, school claim state, access observation,
  rights/reuse, family/independence, status và verification limits.
- Không dùng search snippet làm passage; không bịa author/edition; cross-check hai
  catalogue khi khả thi.
- JSON parse/ID uniqueness và format/diff check qua; task commit sạch.

### K01B

- Quan sát thực tế website đối thủ và OSS engine/repository/package; tối thiểu ba
  family hoặc báo blocker có bằng chứng.
- Ghi version/commit, license, dependency/lineage, input/options/output, profile
  disclosure, access/ToS/robots và reproducibility khi quan sát được.
- Chỉ dùng dữ liệu tổng hợp phi cá nhân; không scrape/copy nội dung luận giải.
- Observation không được gọi là golden expected; khác profile là non-comparable.
- JSON parse/ID uniqueness và format/diff check qua; task commit sạch.

## Integration dependencies

1. PM review từng source: URL/access, metadata, rights, family và giới hạn.
2. QA kiểm tra duplicate/cross-family, dangling ID và claim vượt bằng chứng.
3. Cherry-pick K01A và K01B chỉ khi file ownership sạch; thứ tự không tạo semantic
   dependency vì artifacts độc lập.
4. PM cập nhật shared registry chỉ với record đạt contract; blocked/candidate vẫn
   có thể nằm trong inventory nhưng không được admit.
5. Chạy format, JSON invariant, source audit hiện hữu và `git diff --check`.
6. Tạo báo cáo K01; dừng Product Owner review. Không mở K02/K03.

## Stop conditions

- Rights/ToS không rõ cho automation: dừng automation, chỉ ghi metadata công khai.
- Không xác định lineage/profile: ghi `unknown`/`non-comparable`, không tự hòa giải.
- Source yêu cầu thanh toán: không mua, chuyển `blocked-pending-po`.
- Candidate đòi sửa shared contract: báo PM; không tự sửa schema.
- K01 chỉ kết thúc sau review tích hợp; K02/K03 vẫn blocked.
