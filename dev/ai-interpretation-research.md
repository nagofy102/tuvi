# High-quality Tu Vi interpretation: research and decision brief

Recorded: 2026-10-13. Status: research/proposal only, not implemented or approved for spending.

## User direction and current limitations

The user requested saving the retention roadmap, postponing coding, and evaluating AI/open-source
options for a high-quality interpretation product. No provider, model, integration, budget,
training run or deployment has been selected. See `../design/retention-roadmap.md`.

The application currently has a reference chart engine and cultural explanations, not a complete
expert-reviewed interpretation engine. The Vietnamese/Chinese lunar-month mismatch remains open.
An LLM cannot repair this by guessing. Expert validation of the calculation profile is a release prerequisite.

Separate three quality claims: correct chart calculation, faithful interpretation within a declared
tradition, and empirical prediction of real outcomes. Passing software/interpretation evaluations
does not establish the last claim. Do not market forecasts as scientifically validated probabilities.

## Recommendation

Use a premium hosted model for the initial evaluation, with a provider-independent boundary.
Invest first in a licensed, expert-reviewed knowledge base, explicit interpretation rules and an
independent evaluation set. Benchmark an open-weight alternative on the same cases if sovereignty
or deployment control is a priority. Do not select a winner based only on generic public benchmarks.

No dedicated open-source Vietnamese Tu Vi interpretation system has been validated in this research.
This is not a claim that none exists. General LLMs and chart libraries are components, not qualified masters.

## AI shortlist

Official model catalogs and model cards were accessed on 2026-10-13. Names, availability, pricing
and terms can change. These are candidates, not results of a Vietnamese Tu Vi benchmark.

| Candidate | Type | Evaluation role | Important limitation |
| --- | --- | --- | --- |
| OpenAI GPT-6 Astra (`gpt-6-astra`) | Proprietary hosted API | Premium candidate for complex interpretation grounded in structured facts and retrieved sources | Vietnamese domain quality, cost, latency and output schema adherence must be measured |
| Anthropic Claude Opus 5.5 (`claude-opus-5-5`) | Proprietary hosted API | Premium comparison candidate for the same expert-reviewed cases | Fluent prose is not evidence of correct rules or forecasts |
| Gemini 3.1 Pro (`gemini-3.1-pro-preview`) | Proprietary hosted API, preview in checked catalog | Optional third provider comparison | Preview lifecycle is a production risk; evaluate an appropriate stable model at selection time |
| Qwen3-235B-A22B-Instruct-2507 | Open-weight, Apache-2.0 on official card | Self-host/control candidate; exact version identified for reproducibility | Large total weight footprint despite sparse activation; GPU sizing and Vietnamese quality need testing |
| DeepSeek-V3.1 | Open-weight, MIT on official card | Alternative self-host/control candidate | Large hardware/operations burden; no verified Tu Vi domain competence |

The named open-weight releases are identifiable examples, not claims that they are the newest
or best models in their families. Open weights are not the same as a fully reproducible open
training corpus. Licenses do not grant rights to third-party astrology texts or personal data.
Hosted access to an open-weight model is still a third-party data processor, not automatically private.

## Open-source building blocks

| Project | Role | License checked | Scope boundary |
| --- | --- | --- | --- |
| `SylarLong/iztro` | Chart calculation/reference structures; already used by this project | MIT | Not a replacement for expert-reviewed Vietnamese interpretation or calendar compatibility |
| `pgvector/pgvector` | Vector search inside PostgreSQL, compatible with the proposed database direction | PostgreSQL-style license text checked directly | Retrieval does not guarantee factual support; no DB is deployed in this project |
| `run-llama/llama_index` | Optional document ingestion/retrieval orchestration | MIT | Optional infrastructure, not domain expertise; hosted products/services have separate terms |
| `vllm-project/vllm` | Optional inference serving for a supported self-hosted model | Apache-2.0 | Requires validated model compatibility, GPU capacity and operational expertise |
| `promptfoo/promptfoo` | Repeatable provider/prompt comparisons and regression tests | MIT | Automatic or LLM judges cannot replace domain reviewers; inspect hosted/plugin terms separately |

Use only components justified by the pilot. Do not introduce all of them by default.
Do not ingest forums, paid books, private readings or commercial datasets without usage rights.

## Proposed architecture, not implemented

```text
Validated chart + declared calculation profile + requested topic/year
  -> structured facts and relationships computed by reviewed code
  -> expert-approved interpretation rules for one declared tradition
  -> filtered retrieval of licensed source passages (RAG)
  -> model generates structured, grounded Vietnamese interpretation
  -> chart/schema/source-support and safety checks
  -> user-facing summary, explanation, sources and limitations
```

Keep the LLM out of star placement, calendar conversion, relationship counting and period calculation.
Derived relationships must be computed and validated, not inferred freely by a model.
RAG means retrieving relevant approved passages before generation; it reduces unsupported invention
but does not prevent it. A source link alone is not proof: check whether it actually supports the claim.
Do not request or expose private chain-of-thought; provide concise explanations and explicit rule/source references.

Knowledge records need source ID, title/author, edition/page or stable passage ID, usage rights,
tradition/profile applicability, rule version, reviewer and approval status. Keep incompatible
traditions separate; report conflicts rather than silently blending rules.

Interpretation sections need chart-fact references, reviewed rule references, source passage IDs,
conditions/limitations, plain Vietnamese text and version provenance. A valid ID is not enough;
the referenced fact and passage must match the actual claim. Avoid fabricated probability/confidence scores.

Reports should synthesize relevant combinations rather than concatenate isolated star descriptions.
Assess Mệnh/Thân, related palaces, tam phương tứ chính, supporting/opposing relationships, dignity
and transformations only where the chosen profile and reviewed rules define them. Do not invent
conflict-resolution precedence. Expert authors must specify it and its exceptions.

For missing/uncertain birth time, unsupported dates, conflicting traditions or absent sources,
explain the limitation and narrow or decline the interpretation. Do not generate a fictitious chart.
Annual/period reports require a verified period engine and explicit target year, not just a birth chart.

## Proposed product requirements (Vietnamese)

- Bản tóm tắt dễ đọc, có điểm bắt đầu và chủ đề người dùng lựa chọn.
- Luận giải có tổng hợp các yếu tố, không chỉ ghép mô tả từng sao.
- Mỗi nhận định quan trọng có thể mở “Vì sao?” để xem cung/sao/quy tắc và nguồn liên quan.
- Phân biệt dữ kiện lá số, diễn giải theo trường phái và lời gợi ý thực tế.
- Văn phong bình tĩnh, không phán chắc bệnh tật, tử vong, ly hôn, giàu nghèo hoặc gây sợ hãi.
- Không thay tư vấn y tế/tài chính/pháp lý; không thúc đẩy trả tiền để “hóa giải”.
- Nội dung đầy đủ có thể đọc theo lớp: tóm tắt → chủ đề → căn cứ, hỗ trợ chữ lớn.

## Quality investment and pilot

1. Select one tradition with named expert reviewers and obtain source usage rights. Define profile
   conventions, unsupported cases and conflict-resolution rules before generating personal reports.
2. Build a proposed initial set of 100–200 synthetic or appropriately consented/de-identified cases,
   with expert-approved chart facts and acceptable/unsupported interpretation claims. Include difficult
   dates, leap months, late Tý, missing time, pre-Tết dates and conflicting combinations. This is a pilot
   size proposal, not an existing dataset or a forecast validation study.
3. Create a development split and a held-out split before prompt/rule tuning. Compare at least two
   premium API candidates with the same facts, sources and scope; optionally include an open-weight
   candidate. Record model/settings, rule/corpus/prompt versions, cost and latency. Do not use personal
   production data in a benchmark without a lawful purpose and appropriate consent.
4. Use at least two independent domain reviewers where feasible, blind them to provider identity,
   and adjudicate disagreements. Separate factual correctness, rule support, synthesis quality,
   Vietnamese readability and handling of uncertainty. LLM judges can assist, not decide alone.
5. Choose a provider only after reviewing results and total costs. Keep rollout opt-in and limited
   until release gates pass; establish corrections and revalidation on every model/rule/corpus change.

Suggested pilot rubric, subject to approval: factual consistency 30 points, rule/source support 25,
combination synthesis 20, Vietnamese clarity 15, uncertainty/safety handling 10. Critical factual,
privacy or harmful certainty errors are blocking failures regardless of aggregate score. Passing the
release suite is not a guarantee of error-free future outputs or predictive accuracy.

Prioritize specialist time, licensed editorial content and independent review, not just tokens.
Estimate cost per report including retrieval, generation, validation/retries and amortized review;
for self-hosting include GPUs, utilization, engineering, security and maintenance. Do not equate
free weights with free operation. Set an approved spending ceiling before paid experiments.

Start with rules and retrieval. Consider fine-tuning later for consistent structure/style after there
is sufficient licensed, reviewed data and a holdout baseline. Fine-tuning is not a guarantee of
factual knowledge, citations or correct interpretation. A second LLM is not independent expert validation.

## Privacy and operational requirements before implementation

- Obtain an explicit, appropriate opt-in before transferring personal data for AI interpretation.
- Send the minimum chart facts; omit names, exact birth details and identifiers when unnecessary.
  Chart facts and chat may still be sensitive or re-identifiable; this is minimization, not guaranteed anonymization.
- Review each provider/product's training use, retention, abuse logs, deletion, region and subprocessors.
  Do not assume all API tiers or self-hosted configurations have the same privacy guarantees.
- Keep credentials server-side; rate limit, cap spending, redact logs and secure saved reports/chat.
- Private reports must not enter public cache, sitemap or OG images. Scope cache/access by the
  actual permissions and include model/rule/source versions in invalidation decisions.
- Treat retrieved text and user chat as untrusted; prevent prompt injection from changing chart facts,
  source selection policy, access boundaries or safety rules.
- If sources/model validation are unavailable, fail clearly or show approved nonpersonal explanations;
  never simulate AI success. Preserve the independently calculated chart when AI times out.

## Sources and verification scope

The following primary-source pages/API metadata and selected model cards/license text were retrieved
on 2026-10-13. Model availability in this account, prices, contractual privacy terms and GPU benchmarks
were not tested. No model API inference, paid call, package install or application change was performed.

- OpenAI model catalog: https://developers.openai.com/api/docs/models
- Anthropic model overview: https://platform.claude.com/docs/en/about-claude/models/overview
- Google model catalog: https://ai.google.dev/gemini-api/docs/models
- Qwen official model card: https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507
- DeepSeek official model card: https://huggingface.co/deepseek-ai/DeepSeek-V3.1
- Chart library: https://github.com/SylarLong/iztro
- Vector extension and license: https://github.com/pgvector/pgvector and https://github.com/pgvector/pgvector/blob/master/LICENSE
- Retrieval framework: https://github.com/run-llama/llama_index
- Inference serving: https://github.com/vllm-project/vllm
- Evaluation tooling: https://github.com/promptfoo/promptfoo

This research does not substantiate which model is best at Vietnamese Tu Vi. The final provider/model,
expert partner, licensed corpus, report scope, budget and implementation order remain user decisions.
