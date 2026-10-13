# Project working instructions

At the start of every work session, read the complete `RULE_BASE.md` from this
repository's root before planning or changing files. Read its current contents even
when a previous conversation or summary already contains the rules; do not rely on
remembered copies. This required session-start read is an exception to the rule
against rescanning unchanged files.

`RULE_BASE.md` is the canonical project rule file for roles, language, accessibility,
and code-quality conventions. Keep it in the checkout alongside `AGENTS.md`;
do not create duplicate rule files in `design/`, `dev/`, or `test/`.
Use a role prefix such as `[DEV]`, `[PM]`, `[BA]`, or `[QA]` in user-facing responses.

## Session continuity

- Inspect `git status`, relevant diffs, and recent commits before editing. Preserve existing work.
- Read `design/README.md`, `dev/README.md`, and `test/README.md` for current scope and handoffs; follow their links for the task at hand.
- Update the affected folder's status, decisions, actual checks, and next action after material work.
- Keep architecture and code in English; product copy and domain requirements in Vietnamese.
- The user's latest product specification takes precedence over older palette choices in `RULE_BASE.md`.
- Application source belongs in `src/`; the three management folders hold specifications and evidence.
- Use the current checkout. Do not create a Git worktree unless explicitly requested.

## Truthful implementation

- Distinguish planned, implemented, and verified functionality. Never call a specification a running feature.
- Do not invent star-placement rules, lunar conversions, fortune percentages, AI responses, or test results.
- Version calculation rules and cite reviewed domain references. Unverified profiles cannot generate production charts.
- Isolate sample chart data and label it visibly as demonstration data before the real engine exists.
- Do not index personal charts or include names/birth dates in analytics, logs, public URLs, or OpenGraph images by default.
- Record unresolved domain choices and defects in the relevant management folder.
