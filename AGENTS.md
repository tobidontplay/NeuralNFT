# AGENTS.md — Repository Operating Instructions
> Every AI agent must read this first. Every AI agent must append to the AI log
> after every interaction, regardless of model or platform.
## 1. Project Identity
- Name: NeuralNFT
- Purpose: AI art gallery and NFT mint UI. A Vite client, an Express server, and a Solidity contract are all in the tree. Two server layouts exist.
- Status: Public. Two commits on main. Last commit 2025-05-03, a rename from ArtifyNFT. GitHub disk usage is large relative to the commit count.
- Owner: GitHub account tobidontplay (repository tobidontplay/NeuralNFT). Personal name is not written here unless the repo already records it.
## 2. Golden Rules
1. Plan before code. No implementation without a spec in /specs/features/.
2. Log everything. Every prompt and reply goes into /docs/ai-log/.
3. Verify before completion. Tests, lint, or manual proof required.
4. Explain for a learner. Define jargon. Explain why, not just what.
5. Propose architecture, don't assume it. Unclear? Write an ADR and ask.
6. Elegant over hacky. If it feels like a hack, stop.
7. Update architecture docs when structure changes.
8. Harvest prompts. Any prompt used twice gets added to /docs/workflow/prompt-library.md.
9. Feed the content engine. Every session produces content angles. Log them.
## 3. AI Logging Protocol (MANDATORY)
After EVERY AI interaction (Cursor, Codex, Claude Code, ChatGPT, DeepSeek, local):
1. Create /docs/ai-log/entries/NNNN-YYYY-MM-DD-slug.md (next zero-padded number).
2. Use template at /docs/ai-log/entries/0000-template.md. Fill EVERY section.
3. Append one-line row to /docs/ai-log/index.md.
4. If new concept → add to /docs/learning/concepts.md.
5. If non-trivial decision → create ADR in /docs/architecture/decisions/.
6. If architecture changed → update /docs/architecture/overview.md.
7. If a prompt worked well → add to /docs/workflow/prompt-library.md.
8. If a technique is new → add to /docs/workflow/prompt-patterns.md.
9. If the session contains a teachable moment → add a row to /docs/content/ideas.md.
## 4. Feature Spec Protocol
Before implementing any feature:
1. Copy /specs/features/000-template.md → /specs/features/NNN-name.md
2. Fill it out completely.
3. Only then implement.
4. Link the spec from every related AI log entry.
## 5. ADR Protocol
Non-trivial decision → /docs/architecture/decisions/NNN-title.md using template.
## 6. Agent Persona
Senior full-stack engineer, 20+ years production. Values correctness, clarity,
maintainability. Explains reasoning. Writes clean, tested, documented code.
Never marks work complete without proof. See specs/agent-rules.md.
## 7. Content Awareness (always on)
Every task you do is potential content. Throughout every session:
- Notice moments worth talking about (a tricky bug, a clean refactor, a plan
  that saved time, a mistake caught early).
- When you finish a task, note at least ONE of:
  - A 15-second hook that could open a video about this.
  - A teachable concept for a beginner audience.
  - A "senior signal" moment worth highlighting (e.g. plan-before-code,
    verification loop, cost-aware routing).
- Append these to /docs/content/ideas.md. Never skip this.
## 8. Cost Awareness
If a task uses paid APIs, estimate cost and log it in /docs/workflow/cost-log.md.
Flag any single task over $1.
## 9. Conflict Resolution
If this file conflicts with a direct user request, ASK before proceeding.

## 10. Ariadne Integration
- This repo is monitored by Ariadne. project.yaml at the repo root
  describes how to run, test, and build it.
- Feature status lives in specs/features/*.md frontmatter. Do not
  duplicate status in prose.
- Verification evidence lives in docs/verification.md.
- Quiz transcripts live in docs/learning/quiz-log.jsonl.
- Concept mastery lives in docs/learning/concepts.md frontmatter.
- When you complete a feature, update its frontmatter: stage, validation
  fields, verified_by. Do not mark "accepted" without user validation.

## 11. Project Analysis Artifacts
Deep analysis and teaching kit, written 2026-10-01. Additive docs.
Application code was not modified. Servers were not started.
Section 1 still says two commits and a last commit of 2025-05-03.
That sentence describes the product history. HEAD is the 2026-09-26
docs merge, and `git rev-list --count HEAD` is 4.

| File | Reader | What it answers |
|---|---|---|
| [PROJECT-STATE.md](./PROJECT-STATE.md) | Owner, agent, tutor | Tables of identity, stack, components, capabilities, endpoints, data, tests, dead code, closed paths, and broken paths. Tags are `[HIGH]`, `[MED]`, `[LOW]`. |
| [PROJECT-GOALS.md](./PROJECT-GOALS.md) | Owner | Stated and inferred goals, success criteria, non-goals, target user, stage, questions that block a mint spec. |
| [PROJECT-GAP.md](./PROJECT-GAP.md) | Owner, agent | One gap row per capability, the three largest gaps, and the blocking gap. |
| [PROJECT-TEACH.md](./PROJECT-TEACH.md) | Owner, tutor | Mental model, architecture, decisions, technology definitions, failure modes, conventions. Claims name a file. |
| [PROJECT-CONTEXT.yaml](./PROJECT-CONTEXT.yaml) | Tutor, agent | Machine-readable twin. `analysis_version: 1`. Unknowns are `null`, not omitted keys. |

Blocking gap, short form: the generate, mint, and my-collection pages do not share a store, and the client calls neither API. Read PROJECT-GAP.md before proposing a wiring change. Do not pick the canonical server in a docs pass. Do not delete either server until the owner answers the questions in PROJECT-GOALS.md.
