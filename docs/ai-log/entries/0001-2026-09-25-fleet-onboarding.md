# Entry 0001 — Ariadne fleet onboarding
- Date: 2026-09-25
- Agent: Cursor
- Model: Grok 4.7
- Session Goal: Ariadne fleet onboarding audit
- Duration: one cloud-agent session [INFERRED — confirm]
## Prompt(s) Sent
> 1. Prompt 14, "Bring every repo I own up to Ariadne spec", in the Cursor session Ariadne fleet onboarding: https://cursor.com/agents/bc-070798fa-8ccf-4bc1-b378-dc4ab2d08bb6
> 2. Follow-up in the same session: "good job, now make all the repos ariadne ready".
>
> The prompt text lives in that session. There is no separate public gist URL.
## Reply Summary
Vite client, two Express trees, a Solidity contract, no root tests, no configured Vite port, main last touched 2025-05-03.

Added the Prompt 1 governance scaffold where it was missing, filled architecture, the project brief, the case study, and feature specs from the tree (Prompt 1b), then added Ariadne files: project.yaml, TODO.md, docs/verification.md, docs/learning/quiz-log.jsonl, and an upgraded concepts table. Feature specs carry frontmatter. No application code was edited.
## Full Reply / Key Excerpts
This repo's structure before the pass: structure_status none. No root README..
After the pass the Ariadne contract is present: a root project.yaml, a verification log with an empty table, quiz-log schema, and feature frontmatter capped at stage `implemented`.
Run command recorded as npm run dev  # [INFERRED — confirm] this starts the Vite client only. The API is a different process.. Test command recorded as "TODO: confirm — no tests detected"  # no test script and no test files were found in the root package.. Port recorded as None.
## Considerations
- project.yaml exists so a monitor can start, test, and build this repo without reading the README. A README that says "npm i && npm run dev" is not a contract.
- docs/verification.md exists so "done" means tests, a manual check, and a user opinion, each recorded. A feature spec with Status: Done is not that record.
- Feature frontmatter exists so stage and validation are machine-readable. Prose status lines drift. The body of each spec was kept.
- Run stays the manifest script. The 5000 fallback is documented beside a null port.
## Alternatives Considered
- Alternative A: one shared project.yaml for the whole GitHub account. Rejected because run, test, port, and watch directories differ per repo, and a monitor that guesses the wrong command will mark a healthy repo as down.
- Alternative B: a database instead of frontmatter. Rejected because the spec file in git is the review surface, and Ariadne can read a checkout without operating a second store. A database would also hide status from anyone reading the pull request.
## Learning Notes (For the Human)
- Concept introduced: a fleet contract. Same file names in every repo, different values, no invented test commands.
- Why it matters: a junior dev copying one README across repos ships a monitor that runs `npm test` in a repo that has no tests, then reports failure as a product bug.
- Where to read more: project.yaml in this repo, docs/verification.md, and specs/features/*.md frontmatter.
## Content Angles
> At least one. This feeds /docs/content/ideas.md.
- Type: teaching
- Idea: auditing an entire GitHub fleet with an AI agent
- Hook: auditing an entire GitHub fleet with an AI agent
## Files Changed
- docs/ai-log/README.md
- docs/ai-log/entries/0000-template.md
- docs/ai-watch/models.md
- docs/ai-watch/news-log.md
- docs/ai-watch/techniques.md
- docs/architecture/decisions/000-template.md
- docs/content/scripts/000-template.md
- docs/learning/learning-path.md
- docs/workflow/cost-log.md
- docs/workflow/prompt-library.md
- docs/workflow/prompt-patterns.md
- docs/workflow/tools.md
- specs/agent-rules.md
- specs/features/000-template.md
- AGENTS.md
- CASE-STUDY.md
- CHANGELOG.md
- docs/architecture/overview.md
- docs/architecture/api.md
- docs/architecture/data-model.md
- docs/architecture/security.md
- docs/architecture/deployment.md
- docs/architecture/tech-stack.md
- docs/architecture/decisions/001-client-dev-script.md
- specs/project-brief.md
- specs/features/001-art-gallery-ui.md
- specs/features/002-mint-api-and-contract.md
- docs/learning/concepts.md
- docs/learning/questions.md
- docs/learning/lessons-learned.md
- docs/learning/weekly-review.md
- docs/content/ideas.md
- docs/learning/learning-path.md (append)
- project.yaml
- TODO.md
- docs/verification.md
- docs/learning/quiz-log.jsonl
- docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md
- docs/ai-log/index.md
## Verification
structure verified; run commands pending user confirmation
## Follow-ups / Open Questions
- [ ] Confirm stage of feat-002.
- [ ] Canonical server unknown.
- [ ] Deploy address unknown.
- [ ] No tests.
