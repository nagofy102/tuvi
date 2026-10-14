# HV-K00 — Execution prompts for knowledge enrichment

Các prompt dưới đây là task briefs độc lập, đủ nhỏ cho một Codex session. Mỗi task
phải đọc governance hiện hành, kiểm tra Git và dừng tại gate nêu rõ; không lặp lại
Master Prompt. Không task nào tự nâng trạng thái rule thành approved.

## Trạng thái sau HV-K01

PO đã duyệt K01 ngày 14/10/2026 và cho phép mở ba task giới hạn: K02A calculation
verification, K03A domain extraction cho Quan Lộc/Công việc và K03B ontology
prototype. Phân công/ownership/cổng tích hợp nằm tại `knowledge-k02-k03-execution.md`.
Các prompt dưới đây được giữ làm chuẩn gốc; task briefs thực thi đã điều chỉnh nằm
ở cuối tài liệu này.

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

Dependency: K00 approved + K01C-Lite contract. Paid sources require a separate PO
decision. Stop: **WAITING FOR SOURCE INVENTORY REVIEW**.

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

Dependency: K00 approved + K01C-Lite contract. Capture actual observations; a site
consensus is never an oracle. Stop: **WAITING FOR INDEPENDENCE REVIEW**.

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

## Task brief thực thi — HV-K02B Calendar disagreement and full-chart independence

**Role:** `[QA][BA][DEV_RESEARCH]`. Pin astronomical/calendar sources, algorithm
revisions, timezone and civil-date policy to reproduce `1985-03-21`; screen a
full-chart family for license, lineage and exact-profile compatibility. Separate
event observations from calendar conventions and profile choices.

Do not choose by website count, run blocked `@dqcai/vn-lunar`, change production,
or admit golden values. Artifacts and ownership are defined in
`knowledge-k02b-k04a-execution.md`. Stop when the mechanism is reproducible and
independence search is documented, even if the result remains blocked.

## Task brief thực thi — HV-K03A2 Deep career methodology extraction

**Role:** `[BA][AI_RESEARCH][TU_VI_SPECIALIST]`. Research lawful, pinned passages
for Mệnh–Thân, Di–Tài–Quan and cross-palace conditions/exceptions/conflicts. Every
candidate rule must retain source family, profile, predicates, refusal behavior and
proposed structural tests.

Do not infer behavior/outcome, treat same-lineage volumes as independent, or approve
a rule. Stop with explicit gaps when vocabulary/profile or a second family is absent.

## Task brief thực thi — HV-K04A Methodology evaluator prototype

**Role:** `[ARCHITECT][DEV][QA]`. Prototype conditions, exclusions, missing evidence,
conflict and inference trace for only the two named K03A method candidates. Verify
K03B ontology fit and deterministic fail-closed outcomes.

Do not add a reader-facing claim, weight, runtime, `src/` change or lifecycle approval.
If methodology rules cannot be represented without a claim, record the contract gap
instead of changing shared ontology. Stop: **PO ONTOLOGY DECISION REQUIRED**.

## Task brief thực thi — HV-K02A Calculation Verification

**Role:** `[QA][BA][DEV_RESEARCH]`. Dùng K01 registry, inventory và implementation
survey. Rà HKO về quyền/timezone/convention/profile; chạy khảo sát `lasotuvi` trong
sandbox tạm sau license/dependency/safety check; giữ dqcai blocked và bất đồng
`1985-03-21` unresolved. Thiết kế reference plan/schema và chỉ lưu observation thực.

Không sửa `src/`, dependency/lockfile production, calculation profile hay gọi
observation là golden. Artifact/ownership và acceptance theo
`knowledge-k02-k03-execution.md`. Dừng: **CALCULATION REFERENCE REVIEW REQUIRED**.

## Task brief thực thi — HV-K03A Career Domain Extraction

**Role:** `[BA][AI_RESEARCH][TU_VI_SPECIALIST]`. Tìm nguồn Quan Lộc/Công việc hợp
pháp có passage locator; ưu tiên điều kiện, ngoại lệ và Mệnh–Quan–Nô. Ghi nguyên văn
giới hạn, translation/paraphrase, source lineage và candidate rule có proposed test.

Không dùng snippet làm passage, không sao chép hàng loạt, không nâng symbolism thành
hành vi/kết quả, không approve rule. Nếu thiếu căn cứ, lưu blocker thay vì sáng tác.
Artifact/ownership và acceptance theo execution plan. Dừng:
**DOMAIN PASSAGE/RULE REVIEW REQUIRED**.

## Task brief thực thi — HV-K03B Ontology Prototype

**Role:** `[ARCHITECT][BA]`. Dựa trên K01C schema và chỉ các record K03A có thật;
thiết kế file-based graph schema tách chart facts/domain knowledge/inference trace,
provenance/profile/dispute/exception và fail-closed. Ví dụ chưa có input K03A phải
gắn `structural-mock` và không được coi là domain knowledge.

Không chọn vendor, không tạo weight/edge Tử Vi phỏng đoán, không sửa runtime.
Artifact/ownership và acceptance theo execution plan. Dừng:
**ONTOLOGY REVIEW REQUIRED**.
