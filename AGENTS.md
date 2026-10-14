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
- Use the current checkout for single-session work.
- For approved parallel implementation, use one isolated Git
  worktree and task branch per editing session.
- Do not create, delete, or reassign worktrees without
  an approved task assignment.

## Truthful implementation

- Distinguish planned, implemented, and verified functionality. Never call a specification a running feature.
- Do not invent star-placement rules, lunar conversions, fortune percentages, AI responses, or test results.
- Version calculation rules and cite reviewed domain references. Unverified profiles cannot generate production charts.
- Isolate sample chart data and label it visibly as demonstration data before the real engine exists.
- Do not index personal charts or include names/birth dates in analytics, logs, public URLs, or OpenGraph images by default.
- Record unresolved domain choices and defects in the relevant management folder.

## Parallel Codex session governance

### Coordinator
- The main thread is PM and integration owner.
- PM approves task scope, dependencies, ownership,
  shared contracts, and integration order.
- BA and Tu Vi specialist remain domain responsibilities;
  they do not automatically require separate chat sessions.

### Session isolation
- Each editing session uses its assigned worktree
  and task branch.
- Never edit another session's worktree.
- Never share a writable working directory across
  concurrent editing sessions.
- Read the complete RULE_BASE.md at session start.
- Follow all required orientation and handoff reads.

### Task assignment
Each parallel task must define:
- Task ID and objective
- Assigned role and branch
- Worktree location
- Allowed files or modules
- Dependencies and approved contracts
- Acceptance criteria and required checks
- Integration owner

### Ownership
- One active owner per writable file or shared artifact.
- Shared schemas, calculation rules, and public API
  contracts require PM approval before modification.
- If a task requires an unowned or conflicting file,
  stop and request reassignment.
- Do not silently expand scope.

### Integration
- Implementation sessions commit only to task branches.
- Only PM may integrate changes into main.
- Only PM may push origin/main.
- Task branches may be pushed only when authorized.
- QA verifies the integrated result before final push.
- Preserve unrelated and uncommitted work.

### Handoff
At task completion, report:
- Task ID, branch, commit SHA
- Files changed
- Tests executed and actual results
- Contract changes, if any
- Known risks and blockers
- Integration readiness

### Context efficiency
- Do not repeatedly scan unchanged files.
- Required session-start reads remain mandatory.
- Read task-relevant code and specifications only.
- Use approved contracts instead of re-deriving them.
- Avoid repeating large files or prior decisions.
- Record durable outcomes in design/, dev/, or test/.
- Keep completion reports concise.
