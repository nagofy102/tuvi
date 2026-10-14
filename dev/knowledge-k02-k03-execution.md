# HV-K02/K03 — Knowledge development execution

Ngày lập kế hoạch: 14/10/2026 (Asia/Saigon). Baseline: `origin/main@cfdc9b8`.
Product Owner đã nghiệm thu K01 ở mức khảo sát và cho phép bắt đầu nghiên cứu K02,
K03A và K03B. Không nguồn, rule hay fixture nào được tự động nâng thành production.

Trạng thái tích hợp: ba task đã hoàn thành nghiên cứu; kết quả và blocker được tổng
hợp tại `../design/knowledge-k02-k03-report.md`, chờ Product Owner review.

## Dependency và thứ tự tích hợp

`K01 → (K02A || K03A) → K03B review → K04 rule extraction/reasoning`.

- K02A tạo reference plan, profile comparison và các observation có thể tái lập.
  Golden fixture chỉ được tạo khi expected value có derivation và nguồn độc lập đủ điều kiện.
- K03A tìm passage Quan Lộc/Công việc có locator rồi chuẩn hóa candidate rule. Thiếu
  điều kiện hoặc ngoại lệ phải `blocked`, không suy từ mô tả biểu tượng thành hành vi.
- K03B thiết kế ontology file-based. Graph example chỉ dùng record K03A đã trích xuất
  hoặc gắn `structural-mock`; không tạo edge/trọng số phỏng đoán.
- BA/Research phải bàn giao rule specification trước khi DEV được phép triển khai reasoning.

## Phân công worktree và ownership

| Task    | Vai trò                           | Branch / worktree                                              | File sở hữu độc quyền                                                                                                                                                      |
| ------- | --------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HV-K02A | QA, BA, DEV research              | `task/hv-k02-calculation-verification` / `/workspace/tuvi-k02` | `test/calculation-reference-plan.md`, `test/calculation-reference-fixtures.schema.json`, `test/calculation-k02-observations.json`, `dev/calculation-k02-sandbox-report.md` |
| HV-K03A | BA, AI Research, Tử Vi specialist | `task/hv-k03a-domain-extraction` / `/workspace/tuvi-k03a`      | `dev/knowledge-career-passages.json`, `dev/knowledge-career-rules-candidate.json`, `dev/knowledge-k03a-career-report.md`, `test/knowledge-k03a-rule-cases.json`            |
| HV-K03B | Architect, BA                     | `task/hv-k03b-ontology-prototype` / `/workspace/tuvi-k03b`     | `dev/knowledge-ontology.md`, `dev/knowledge-ontology.schema.json`, `dev/knowledge-ontology-examples.json`, `test/knowledge-ontology-cases.json`                            |

PM sở hữu tích hợp, cập nhật README/status và push `origin/main`. Task branch không
được sửa `src/`, registry dùng chung, prompt chung hoặc file của task khác.

## Tiêu chí nghiệm thu

### K02A — Calculation Verification

1. Rà HKO về quyền sử dụng, timezone, lịch quy ước và phạm vi so sánh với
   `nam-phai-chinese-lunar-v1`; HKO chỉ giữ `candidate` nếu chưa đủ điều kiện.
2. Khảo sát `doanguyen/lasotuvi@0.1.2` trong sandbox tạm, sau license/dependency/
   safety review; không cài vào production hoặc thay lockfile.
3. Giữ `@dqcai/vn-lunar` blocked và `1985-03-21` unresolved; mô tả phép tính,
   profile và dữ liệu cần thêm, không chọn theo đa số.
4. Có inventory required fields, mismatch taxonomy, independence declaration và
   vector cho tháng nhuận, 29/30 âm, 23:00–01:00, timezone boundary.
5. Mọi kết quả thực chạy có command/version/input/output; observation không được
   gọi là golden. Target 100% chỉ áp dụng cho required fields đã admit cùng profile.

### K03A — Domain Knowledge Extraction

1. Nghiên cứu thực tế nguồn Quan Lộc/Công việc; mỗi passage có source ID, edition/
   revision, locator, quyền truy cập, nguyên văn giới hạn, bản dịch/paraphrase tách biệt.
2. Mỗi candidate rule có profile, premises, conditions, exclusions, exceptions,
   counter-evidence, cross-palace relation, status và proposed test case.
3. Không coi website consensus là chân lý; cùng textual lineage không tính độc lập.
4. Nếu không tìm được passage hợp pháp đủ chi tiết, báo `blocked` cùng truy vấn và
   nguồn đã kiểm tra; không điền rule giả để đạt số lượng.

### K03B — Ontology Prototype

1. Tách `ChartFact`, `DomainKnowledge` và `InferenceTrace`; biểu diễn provenance,
   revision, profile, dispute, exception và fail-closed state.
2. Schema file-based từ chối field lạ, dangling reference và edge sai loại.
3. Trả lời competency questions trong prompt F; không chọn graph database.
4. Không có weight tự đặt. Mọi example thật truy về artifact K03A; ví dụ còn lại
   phải gắn `structural-mock` và bị cấm dùng làm production knowledge.

## Integration gates

- PM kiểm tra diff/file ownership, JSON Schema, reference integrity và license notes.
- QA chạy các validator có thể tái lập, `prettier --check` và `git diff --check`.
- Kết quả thiếu bằng chứng vẫn có thể nghiệm thu như một blocker được chứng minh.
- Rule production, calculation profile change, paid source và golden admission đều
  phải trình Product Owner; task session không có quyền tự duyệt.

## Blocker và nguồn trả phí

Hiện chưa có đề xuất mua nguồn cụ thể. Chỉ trình PO khi một ấn bản xác định có
bibliographic identity, sample/table of contents chứng minh liên quan trực tiếp,
điều khoản cho phép nghiên cứu nội bộ và không có bản hợp pháp miễn phí tương đương.
Các blocker ban đầu: quyền tái sử dụng bảng HKO, profile của `lasotuvi`, thiếu
passage Quan Lộc có locator và bất đồng lịch ngày 21/03/1985.
