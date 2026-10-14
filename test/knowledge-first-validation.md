# HV-K00 — Knowledge-first validation framework

Ngày: 14/10/2026. Đây là khung nghiệm thu đề xuất, chưa phải kết quả kiểm thử.

## Hai scorecard độc lập

### Calculation profile

Đơn vị so sánh là một trường bắt buộc của một chart case dưới cùng exact profile.

```text
field agreement = matched required fields / comparable required fields
release gate = 100%, với 0 mismatch chưa phân loại
```

`non-comparable` chỉ hợp lệ khi profile/input/options khác và phải nêu lý do; không
được loại mismatch cùng profile khỏi mẫu số. Báo cáo theo field family và case, gồm
calendar, Mệnh–Thân/cung, stars, transformations và provenance metadata. Partial
fixtures không được tính như complete charts.

### Interpretation agreement

Đơn vị là structured claim đã chuẩn hóa, không phải câu văn. Khuyến nghị primary
metric là macro-average trên claim family để family nhiều dữ liệu không lấn át;
micro-average báo kèm. Mẫu số chỉ gồm claim pairs cùng profile/topic/scope và có đủ
evidence để so sánh.

```text
agreement_i = agreed comparable claims / all comparable claims in family i
macro agreement = mean(agreement_i)
research target >= 80%, kèm sample size và confidence interval
```

`compatible-partial` phải báo riêng, không mặc định tính full agree. `different-profile`,
`non-comparable`, `missing` không nằm trong denominator nhưng luôn phải công bố số
lượng. Contradiction nằm trong denominator. Cùng source family không tạo independent vote.

Ngưỡng 80% không tự approve claim; publication vẫn cần provenance, rule admission,
conflict policy và PO gate. Không diễn giải metric là độ chính xác dự báo.

## Gate theo mốc

| Gate | Điều kiện tối thiểu                                                                    |
| ---- | -------------------------------------------------------------------------------------- |
| K01  | source/edition/passage resolve; rights và family rõ; dangling refs = 0                 |
| K02  | test profile pinned; expected độc lập; required fields 100%; mismatch triage đầy đủ    |
| K03  | competency questions pass; chart/domain/trace tách biệt; version/profile representable |
| K04  | rule predicates/exclusions/source trace 100%; unsupported inference rejected           |
| K05  | fired/rejected/conflicted trace tái lập; unresolved conflict fail-closed               |
| K06  | one approved slice end-to-end; no claim without admitted evidence; regression pass     |
| K07  | protocol approved; denominator/exclusions/CI công bố; ≥80% chỉ trên comparable claims  |

## Kiểm tra chống tự xác nhận và hallucination

1. **Oracle independence:** expected không do system under test sinh; fork lineage được
   nhận diện.
2. **Quote-to-rule audit:** reviewer đối chiếu quote/locator với từng premise và scope.
3. **Mutation:** sửa passage, predicate, profile, field hoặc source family phải làm
   validator/test fail đúng loại.
4. **Conflict injection:** hai rule đối nghịch không resolver phải thành unresolved,
   không sinh claim.
5. **Evidence removal:** thiếu passage/source/revision phải fail-closed.
6. **Swap/distinction:** hai SignalSet đã admit không tự nhận cùng claim nếu predicates
   khác; synthetic inputs chỉ kiểm tra software selection, không làm oracle Tử Vi.
7. **Generic/advice removal:** luận điểm vẫn mang nghĩa miền sau khi bỏ lời khuyên;
   câu áp dụng đại trà bị đánh dấu editorial failure.
8. **Reproducibility:** pin repository/source/profile versions, canonical input và
   artifact hash; rerun cho semantic output như nhau.

## Báo cáo bất đồng

Mỗi mismatch/disagreement cần ID, layer, profile, input/claim key, expected/observed,
nguồn và revision, source/implementation family, category, suspected cause, owner,
status và resolution evidence. Category tối thiểu: implementation defect, source
variant, profile mismatch, extraction defect, insufficient evidence, rights blocked,
unresolved domain conflict.

QA không được sửa expected để làm test qua nếu chưa có change record và review.
