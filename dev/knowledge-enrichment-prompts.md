# HV-K00 — Execution prompts for knowledge enrichment

Các prompt dưới đây là task briefs độc lập, đủ nhỏ cho một Codex session. Mỗi task
phải đọc governance hiện hành, kiểm tra Git và dừng tại gate nêu rõ; không lặp lại
Master Prompt. Không task nào tự nâng trạng thái rule thành approved.

## Thứ tự và dependency

`K01A || K01B → K01C → (K02A || K03A) → K04A → K04B/K05A → K06A → K07A`.
K02A được phép thiết kế trước K03A nhưng fixture chỉ được admit sau K01C. K04A cần
ontology sample; K06A cần calculation facts và reasoning trace đã được kiểm chứng.

## Prompt A — HV-K01A Source Discovery & Book Inventory

**Role:** `[AI_RESEARCH][BA]`. **Objective:** lập inventory nguồn sách/tài liệu cho
calculation core và chủ đề Công việc; không trích xuất rule hoàn chỉnh.

Nghiên cứu catalogue thư viện quốc gia/đại học, Google Books/Internet Archive nếu
quyền truy cập hợp lệ, trang NXB/tác giả và bibliography hiện có trong repository.
Với mỗi nguồn ghi title, author/editor, edition, publisher/year, language, school
claim, stable locator, access date, rights/license, source family, phạm vi hỗ trợ,
chất lượng scan/OCR và confidence rationale.

Không dùng snippet tìm kiếm làm passage; không tải hoặc chép toàn văn trái phép;
không suy ra hệ phái từ tiêu đề; không gộp các bản in khi chưa chứng minh cùng ấn bản.

Artifacts: `dev/knowledge-source-inventory.md` và candidate records theo schema nháp
trong `dev/knowledge-source-inventory.json`. Acceptance: mọi record có locator,
rights state, family và `candidate`; nguồn thiếu metadata được `blocked`; kiểm tra
chéo tối thiểu hai catalogue cho identity khi có thể. Dừng khi đạt 15 nguồn đủ
metadata hoặc đã ghi rõ vì sao không đạt; không bắt đầu trích xuất rule.

Dependency: K00 approval. Stop: **WAITING FOR SOURCE INVENTORY REVIEW**.

## Prompt B — HV-K01B Competitor & Open-source Calculation Survey

**Role:** `[AI_RESEARCH][DEV][QA]`. **Objective:** khảo sát engine/site để nhận diện
profile và vector đối chiếu, không chọn oracle.

Nguồn: website đối thủ đã được PO nêu, GitHub/repository công khai, package registry,
README/docs/tests/license và commit/tag cụ thể. Kiểm tra robots.txt/ToS trước automation.
Ghi input fields/options, timezone/calendar/leap/Tý defaults, output fields, engine
dependency/fork lineage, license, version, reproducibility và access date.

Không scrape hàng loạt; không sao chép nội dung luận giải; không coi hai wrapper của
cùng engine là hai nguồn độc lập; không sửa engine hiện tại.

Artifacts: `dev/calculation-implementation-survey.md`, `test/calculation-observation-vectors.json`
chỉ chứa dữ liệu tổng hợp/phi cá nhân và provenance. Acceptance: ít nhất 3 family
được phân loại hoặc báo blocker; mỗi observation pin input/options/output/timestamp;
khác profile được đánh dấu non-comparable. Dừng trước khi tạo expected golden.

Dependency: K00 approval. Stop: **WAITING FOR INDEPENDENCE REVIEW**.

## Prompt C — HV-K01C Source Registry & Provenance Contract

**Role:** `[ARCHITECT][BA][QA]`. **Objective:** khóa schema và lifecycle nguồn trước
khi ingest tri thức.

Đầu vào: K01A/B, source registry hiện tại, ReadingBrief provenance. Thiết kế `Source`,
`Edition`, `Passage`, `SourceFamily`, `ReviewEvent`, rights/access, locator, checksum,
language, school/profile claims, status và supersession. Quy định immutable IDs,
version/revision resolution, citation minimum và candidate→approved transitions.

Không migrate production, không thay ReadingBrief, không bịa checksum/revision.

Artifacts: `dev/knowledge-provenance-contract.md`, JSON Schema proposal và test plan
`test/knowledge-provenance-test-plan.md`. Acceptance: round-trip examples, unknown
field rejection, dangling passage/source detection, same-family detection, disputed
state, rights-blocked state; mapping tương thích với source/passage IDs hiện có.

Dependency: reviewed samples from K01A/B. Stop: **CONTRACT REVIEW REQUIRED**.

## Prompt D — HV-K04A Structured Rule Extraction Pilot

**Role:** `[BA][AI_RESEARCH][QA]`. **Objective:** trích xuất tối đa 10 rule units từ
2–3 passage đã admit cho một vertical slice, chứng minh quy trình chống hallucination.

Mỗi unit gồm ruleId/version, premises, exact predicates, conclusion scope, exclusions,
exceptions, counter-evidence, profile, topic, passage IDs, literal quote/locator,
translation/paraphrase separation, source family, status và reviewer note.

Không ghép ý từ nhiều nguồn thành rule nếu không ghi synthesis; không nâng mô tả biểu
tượng thành hành vi/kết quả; không approve; thiếu condition thì `blocked`.

Artifacts: `dev/knowledge-rule-pilot.json`, `dev/knowledge-rule-pilot.md`, mutation
cases trong `test/knowledge-rule-pilot-cases.json`. Acceptance: 100% field-level
traceability; double-entry comparison giữa quote và normalized rule; mọi inference
vượt passage bị reject; disagreement tạo record riêng. Dừng ở tối đa 10 units.

Dependencies: K01C + K03A ontology sample. Stop: **BA/PO RULE REVIEW REQUIRED**.

## Prompt E — HV-K02A Calculation Reference & Differential Test Design

**Role:** `[QA][BA][DEV]`. **Objective:** thiết kế bộ kiểm thử 100% theo calculation
profile, chưa sửa engine.

Bao phủ conversion, leap month, timezone/day boundary/Tý, Mệnh–Thân, 12 cung, chính
tinh, phụ tinh/Tứ Hóa trong phạm vi profile và metadata dùng cho luận giải. Nguồn
expected phải là passage/bảng/worked chart hoặc implementation family độc lập đã
được K01C admit; ghi derivation thủ công và trường chưa biết.

Không dùng engine hiện tại sinh expected; không bỏ mismatch; không so khác profile
như cùng oracle; không gọi partial fixture là complete chart.

Artifacts: `test/calculation-reference-plan.md`, schema fixture đề xuất, coverage
matrix và mismatch taxonomy. Acceptance: field inventory/mẫu số rõ; vectors cho
29/30 âm, nhuận, 23:00–01:00, timezone boundary; independence declaration; target
100% nghĩa là 0 mismatch trên các trường bắt buộc đã admit, không phải 100% toàn
bộ Tử Vi. Dừng trước code sửa engine.

Dependencies: K01C; uses K01B observations. Stop: **REFERENCE PLAN REVIEW REQUIRED**.

## Prompt F — HV-K03A Ontology & Knowledge Graph Design

**Role:** `[ARCHITECT][BA][DEV]`. **Objective:** thiết kế ontology trung lập công nghệ
từ competency questions, không chọn graph DB.

Competency questions tối thiểu: sao ở cung nào theo chart; quan hệ tam phương/tứ
chính nào; rule nào áp dụng dưới profile nào; passage nào hỗ trợ; rule nào xung đột;
vì sao claim được phép hoặc bị loại. Thiết kế entity/relation, direction/cardinality,
temporal/version scope, identity, provenance và validation constraints.

Không mã hóa trọng số tùy ý; không biến edge chart thành rule luận; không hòa giải
trường phái; không benchmark giả.

Artifacts: `dev/knowledge-ontology.md`, machine-readable schema proposal và 3 graph
examples chỉ dùng facts/rules đã tồn tại hoặc ghi rõ structural mock. Acceptance:
trả lời được competency questions; tách chart/domain/trace; represent disputed and
profile-specific edges; có migration mapping từ model hiện tại và tiêu chí đánh giá
file/relational/property graph/RDF. Dừng trước chọn vendor.

Dependency: K01C, sample K02 facts. Stop: **ONTOLOGY REVIEW REQUIRED**.

## Prompt G — HV-K04B/K05A Rule Matrix, Conflict & Trace Specification

**Role:** `[BA][ARCHITECT][QA]`. **Objective:** đặc tả evaluator xác định cho rule
pilot, gồm condition, exclusion, priority, conflict và inference trace; gộp K04B với
K05A vì cùng một truth table, không tạo content UI.

Đầu vào: K04A units + K03 ontology. Mỗi evaluation phải ghi candidate, predicate
results, missing evidence, fired/rejected, conflict set và allowed claim kind.
Conflict policy mặc định: khác profile → non-comparable; contradiction chưa có
resolver → unresolved/fail-closed; specificity chỉ thắng khi có rule nguồn hóa.

Không tự đặt weight/priority; không dùng số nguồn như chân lý; không fallback generic.

Artifacts: `dev/rule-matrix-prototype.md`, truth tables và `test/rule-matrix-cases.json`.
Acceptance: positive/negative/missing/contradictory cases; deterministic replay;
all outputs trace to exact rule/passage; unsupported claim absent. Dừng trước runtime.

Dependencies: K03A + reviewed K04A. Stop: **REASONING MODEL REVIEW REQUIRED**.

## Prompt H — HV-K07A Interpretation Agreement Protocol

**Role:** `[QA][BA][RESEARCH_METHODS]`. **Objective:** định nghĩa phép đo đồng thuận
thử nghiệm ≥80% trên structured claims; không đánh giá dự báo đời sống.

Chuẩn hóa unit: topic, claimKind, subject, predicate, polarity, scope, conditions,
profile và evidence. Phân loại pair: agree, compatible-partial, contradict,
different-profile, non-comparable, missing. Đề xuất macro theo claim family, báo
thêm micro; công bố denominator, exclusions, weights, source-family independence,
double-coding và adjudication. Dùng bootstrap CI hoặc Wilson CI phù hợp; không biến
80% thành approval tự động.

Không dùng lexical similarity làm agreement; không coi cùng nguồn sao chép là độc
lập; không fabricate claims/charts.

Artifacts: `test/interpretation-agreement-protocol.md`, coding schema, 5–10 structural
examples có nhãn mock nếu chưa có corpus. Acceptance: formula và worked arithmetic,
inter-rater procedure, Swap/Generic/Evidence tests, distinction/disagreement report,
rule để claim thiếu nguồn không publish dù KPI đạt. Dừng trước chạy KPI chính thức.

Dependencies: K01C; final validation requires K04/K06 corpus. Stop: **PROTOCOL APPROVAL REQUIRED**.

## K06A — Chỉ tạo sau khi các gate trước đạt

K06A không được chạy từ tài liệu này. PM chỉ soạn task implementation sau khi PO
duyệt một vertical slice có: chart fields đạt K02 gate, rule units được duyệt, conflict
policy, inference trace, fixtures độc lập và publication boundary. AI Writer/fine-tune,
API, persistence, graph database và UI expansion vẫn ngoài scope.
