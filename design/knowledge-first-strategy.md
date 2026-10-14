# HV-K00 — Knowledge-First Strategy Reset

Ngày: 14/10/2026 (Asia/Bangkok). Trạng thái: **HV-K00 APPROVED; K01 AUTHORIZED**.
Đây là chiến lược đã được Product Owner duyệt; không phải xác nhận chuyên môn.

## Executive summary

Huyền Vi tạm dừng R07B, mở rộng UI và AI Writer. Trọng tâm mới là tạo chuỗi bằng
chứng kiểm thử được từ nguồn đến luận điểm: nguồn → đoạn dẫn → đơn vị tri thức →
quy tắc → trace suy luận → ReadingBrief. Kiến trúc hiện tại đã có profile tính toán,
source/passage ID, validator fail-closed và giao diện evidence; các phần này được giữ.

Điểm nghẽn không phải thiếu template mà là thiếu: registry nguồn đủ chuẩn thư mục,
quy tắc an sao đối chiếu độc lập, ontology có version, quy tắc liên kết có điều kiện
và phương pháp đo bất đồng. Coverage `ready` 12/960 chỉ là chỉ báo phạm vi rule hiện
có, không phải lý do để nối thêm nghĩa sao.

Hai chuẩn nghiệm thu độc lập:

- **Chart Calculation — 100% theo profile:** mọi trường bắt buộc phải khớp bộ tham
  chiếu đã xác định cho cùng profile; mismatch phải được phân loại, không được bỏ qua.
- **Interpretation — đồng thuận thử nghiệm ≥80%:** đo trên claim có thể so sánh giữa
  nhiều nguồn độc lập; không đo độ giống câu chữ hay độ đúng dự báo đời sống.

## Đối chiếu hiện trạng

### Có thể tái sử dụng

| Tài sản                                  | Giá trị tái sử dụng                                | Giới hạn cần giữ                                                          |
| ---------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| `ChartResult` + provenance/profile       | lớp chart facts và tái lập đầu ra                  | chưa phải chứng nhận profile Nam Phái độc lập                             |
| `source-registry.json`, passage/rule IDs | hạt giống provenance                               | metadata/quyền sử dụng và kiểm chứng chéo còn thiếu                       |
| `ReadingBriefV1` + strict validator      | biên xuất bản, evidence/claim trace, fail-closed   | không phải mô hình knowledge graph                                        |
| Claim registry                           | cổng nội dung đã duyệt                             | không dùng làm nơi chứa tri thức miền                                     |
| Corpus từng phần + differential audit    | mẫu thiết kế fixture, mutation và báo cáo mismatch | không có complete golden chart; engine không được làm oracle cho chính nó |
| R06 coverage grid                        | baseline tái lập cho phạm vi đọc                   | dữ liệu tổng hợp, không đại diện dân số hay độ đúng Tử Vi                 |
| UI evidence/insufficient state           | bề mặt tiêu thụ kết quả an toàn                    | tạm thời không mở rộng UI                                                 |

### Khoảng trống

1. Source Registry chưa chuẩn hóa đầy đủ ấn bản, hệ phái, locator ổn định, quyền sử
   dụng, độc lập nguồn, độ tin cậy và lịch sử review.
2. Chưa có inventory bao phủ lịch, cung, chính/phụ tinh, Tứ Hóa, trạng thái, quan hệ,
   ngoại lệ và dị bản theo calculation/rule profile.
3. `KnowledgeRule` hiện là danh sách phẳng; chưa biểu diễn premises, exclusions,
   scope, counter-evidence, conflict set và trạng thái vòng đời.
4. Chưa có bộ tham chiếu calculation độc lập đủ trường và ca biên để đạt 100% theo
   profile. Website đối thủ mới chỉ là observation, không phải oracle.
5. Chưa có chuẩn hóa claim và protocol đánh giá đồng thuận ≥80%; chưa xác định mẫu
   số, independence, non-comparable và confidence interval.
6. Chưa có inference trace ghi rule được kích hoạt, bị loại, xung đột và lý do.
7. Chưa có chính sách bản quyền/robots/ToS theo từng nguồn trước thu thập nội dung.

## Kiến trúc mục tiêu

```text
Versioned Source Registry
  -> reviewed Source Passages
  -> Domain Knowledge Units + disagreements
Verified Input + Calculation Profile
  -> Chart Facts + field-level provenance
Chart Facts + Domain Knowledge Units
  -> Rule Matrix / deterministic reasoner
  -> Inference Trace (fired, rejected, conflicted, unresolved)
  -> Evidence-backed Claims
  -> ReadingBrief + Grounding Validator
  -> UI
```

Ba lớp không được trộn:

1. **Chart facts:** giá trị engine sinh, profile/version, rule áp dụng và nguồn đối
   chiếu từng trường.
2. **Domain knowledge:** entity/relation/rule có nguồn, phạm vi, ngoại lệ, hệ phái,
   trạng thái và version.
3. **Inference trace:** snapshot bất biến của input facts, rule candidates, kết quả
   predicate, conflict, rejection và claim được phép.

### Ontology tối thiểu

- Entity: `Palace`, `Star`, `StarState`, `Stem`, `Branch`, `Transformation`,
  `Configuration`, `Topic`, `CalculationProfile`, `RuleProfile`, `Source`, `Passage`.
- Chart relation: `LOCATED_IN`, `BODY_ATTACHED_TO`, `TRANSFORMS_TO`, `OPPOSES`,
  `TRINES_WITH`, `SAME_AXIS_AS`, kèm profile/version.
- Knowledge relation: `SUPPORTS_CLAIM_KIND`, `MODIFIES`, `EXCLUDES`, `CONFLICTS_WITH`,
  `REQUIRES`, `SOURCED_BY`, `APPLIES_UNDER_PROFILE`.
- Không lưu trọng số số học nếu chưa có phương pháp và bằng chứng. `confidence` phải
  mô tả trạng thái evidence, không giả làm xác suất đúng.

MVP nên bắt đầu bằng JSON/TypeScript schema và evaluator thuần xác định; graph DB chỉ
được chọn sau benchmark truy vấn, versioning và vận hành. Neo4j/Drools không phải mặc định.

### Vòng đời đơn vị tri thức

`candidate → source-backed → cross-implementation-agreement → approved-for-implementation`

Nhánh thay thế: `disputed` khi nguồn/profile mâu thuẫn; `blocked` khi thiếu locator,
quyền sử dụng, điều kiện hoặc test. Chuyển trạng thái cần reviewer, timestamp, lý do,
source revisions và artifact kiểm tra. `source-backed` không đồng nghĩa đúng độc lập.

## Roadmap theo phụ thuộc

| Mốc  | Mục tiêu                                  | Phụ thuộc               | Exit gate                                       | Độ khó/rủi ro          |
| ---- | ----------------------------------------- | ----------------------- | ----------------------------------------------- | ---------------------- |
| K01A | inventory sách/tài liệu và legal metadata | K00 duyệt               | registry candidates, không nội dung mồ côi      | M / cao về quyền       |
| K01B | đối thủ + OSS engine survey               | K00 duyệt               | ma trận profile/license/independence            | M / cao về tương thích |
| K01C | Source Registry/provenance contract       | K01A/B sample           | schema + state transitions + validation plan    | M / vừa                |
| K02  | calculation reference/differential design | K01C                    | field matrix, edge vectors, mismatch taxonomy   | H / rất cao            |
| K03  | ontology/graph design                     | K01C, sample K02        | competency questions + versioned schema         | H / cao                |
| K04  | extraction + Rule Matrix prototype spec   | K01C/K03                | rule units có condition/exclusion/conflict      | H / rất cao            |
| K05  | conflict/evidence/inference trace         | K04                     | deterministic conflict outcomes và trace schema | H / rất cao            |
| K06  | knowledge-driven interpretation prototype | K02/K05, PO duyệt slice | một vertical slice end-to-end, fail-closed      | H / cao                |
| K07  | agreement/quality evaluation              | K01–K06                 | protocol chạy được; ≥80% báo đúng mẫu số        | H / rất cao            |

K01A, K01B có thể chạy song song sau khi PO duyệt danh mục nguồn. K03 chỉ dùng mẫu
đã qua K01C; K02 có thể thiết kế song song nhưng không gọi fixture là golden trước
khi provenance đạt gate. K06 không bắt đầu trước khi một vertical slice có nguồn,
rule, ngoại lệ, test và approval.

## Danh mục nguồn cần khảo sát

1. Sách/ấn bản Tử Vi cổ điển và hiện đại: thư mục quốc gia/đại học, bản in có thông
   tin tác giả–NXB–năm–trang; ghi rõ hệ phái/dị bản và quyền trích dẫn.
2. Tài liệu lịch pháp: tiêu chuẩn/thuật toán có version cho dương–âm, sóc/khí, múi
   giờ, nhuận và ranh giới ngày; tách lịch pháp khỏi quy tắc an sao.
3. Open-source: repository, commit/tag, license, dependency calendar, calculation
   defaults, test corpus và mức độc lập giữa các fork.
4. Website đối chiếu: input/options/output quan sát được, profile công bố, ngày truy
   cập, ToS/robots và khả năng tái lập. Không scrape hàng loạt khi chưa được phép.
5. Worked charts/bảng an sao có nguồn xuất bản: chỉ nhập phần có locator và suy dẫn
   độc lập; không dùng output engine hiện tại làm expected.
6. Nguồn nghiên cứu phương pháp: provenance, knowledge graph, rule engine và
   inter-rater/agreement metrics; đây là nguồn phương pháp, không phải nguồn Tử Vi.

## Vai trò và quyền quyết định

- **PM:** khóa scope/slice, ownership, dependency, chi phí, approval gate; không tự
  duyệt quy tắc miền.
- **BA:** chuẩn hóa thuật ngữ, claim, condition/exclusion, profile và disagreement.
- **AI Research:** discovery, bibliography, license/ToS check, trích dẫn có locator;
  không tổng hợp thiếu nguồn thành “quy tắc”.
- **DEV/Architect:** schema, importer/validator, evaluator và reproducibility; không
  quyết định ý nghĩa Tử Vi.
- **QA:** oracle independence, mutation/differential tests, mismatch taxonomy,
  agreement protocol và audit trail.
- **Product Owner:** duyệt profile/phạm vi nguồn, chính sách publish disputed claim,
  ngân sách/quyền truy cập và từng vertical slice trước implementation.

## Quyết định Product Owner đã duyệt

1. Inventory toàn bộ Tử Vi ở mức tổng quan; calculation core và Công việc là hai
   nhánh nghiên cứu sâu đầu tiên.
2. Sách, tài liệu, mã nguồn và website đều được dùng để nghiên cứu. Rule production
   cần nguồn kiểm chứng được; đồng thuận đối thủ không tự chứng minh đúng.
3. Dị bản lưu theo calculation/rule profile. Có một profile mặc định; bất đồng chưa
   giải quyết phải fail-closed.
4. Phép tính trọng yếu đối chiếu ít nhất hai source/implementation family độc lập
   khi khả thi; thiếu family thứ hai phải ghi chưa xác minh.
5. Dùng file-based schema có khả năng biểu diễn graph; chưa triển khai graph database.
6. Ưu tiên nguồn miễn phí, hợp pháp; mọi nguồn trả phí phải xin duyệt riêng.
7. KPI ≥80% dùng macro theo claim family; báo thêm micro, sample size và breakdown
   bất đồng. KPI không tự cho phép xuất bản claim thiếu nguồn.

## Rủi ro và kiểm soát

- **Nguồn cùng phả hệ giả độc lập:** ghi `sourceFamilyId`/`implementationFamilyId`.
- **Bản quyền:** chỉ lưu metadata/locator và trích đoạn tối thiểu được phép; review ToS.
- **Profile drift:** mọi fact/rule/fixture pin version; không so khác profile như lỗi.
- **Graph complexity:** competency questions trước công nghệ; không đưa mọi thứ vào graph.
- **Hallucination khi trích xuất:** double-entry với quote/locator, schema validation,
  reviewer đối chiếu nguyên văn; thiếu bằng chứng thì `blocked`.
- **KPI gaming:** công bố mẫu số, exclusions, non-comparable, CI và disagreement;
  không tăng coverage bằng claim yếu.
- **Chi phí:** cao nhất ở mua/đọc nguồn, chuẩn hóa dị bản và dựng oracle; code schema
  thấp hơn nhưng không thay thế được nghiên cứu.

## Điều kiện dừng K00

K00 đã được PO duyệt. K01C-Lite được phép khóa contract nguồn, sau đó K01A/K01B có
thể nghiên cứu song song. Không sửa `src/`, không mở K02/K03 hoặc approve rule trước
khi Product Owner đánh giá kết quả K01.
