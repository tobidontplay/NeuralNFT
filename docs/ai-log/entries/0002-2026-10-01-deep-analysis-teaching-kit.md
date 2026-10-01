# Entry 0002 — Deep analysis and teaching kit
- Date: 2026-10-01 19:32
- Agent: Cursor
- Model: Grok 4.7
- Session Goal: Write a layered documentation kit that audits NeuralNFT for the owner, a future agent, and a tutor.
- Duration: one cloud-agent session
## Prompt(s) Sent
> 1. TASK: Deep analysis and teaching kit for one project.
>
> You are a senior engineer performing a full audit of a single codebase.
> Your output is not application code. It is a layered documentation kit for three readers: the owner (CS student learning to sound senior), a future AI agent, and a Tutor who will quiz from these docs.
>
> The repo is NeuralNFT at the repository root (GitHub tobidontplay/NeuralNFT).
>
> Produce five files at the repo root. Additive docs only. Do not modify application code. Allowed: create PROJECT-STATE.md, PROJECT-GOALS.md, PROJECT-GAP.md, PROJECT-TEACH.md, PROJECT-CONTEXT.yaml; append Project Analysis Artifacts section to AGENTS.md; create ai-log entry and update index.
>
> READ FIRST (do not skim): every file; git log --oneline -100; specs/, docs/, README, CHANGELOG, CASE-STUDY, TODO if present.
>
> FILE 1 PROJECT-STATE.md — tables only: Identity, Stack, Components, Capabilities (done|partial|broken|planned|absent), Endpoints, External Dependencies, Data Model, Tests, Dead code, What works E2E, What is broken. Mark [HIGH]/[MED]/[LOW].
> FILE 2 PROJECT-GOALS.md — stated/inferred goals, success criteria, non-goals, target user, stage, questions for user.
> FILE 3 PROJECT-GAP.md — gap table for every capability; three biggest gaps; blocking gap.
> FILE 4 PROJECT-TEACH.md — mental model, architecture, key decisions, technologies, failure modes, conventions, open questions; defendable claims only.
> FILE 5 PROJECT-CONTEXT.yaml — exact Ariadne schema (project, purpose, stage, maturity, last_analysis, confidence, analysis_version:1, goals, capabilities, stack, architecture, risks, decisions, open_questions, roadmap, links, teaching_hooks). null not missing.
> STEP 6 append AGENTS.md Project Analysis Artifacts section.
> STEP 7 ai-log entry from template.
> DO NOT modify app code, delete, reorganize, add deps, start servers, touch Ariadne.
> DONE: PR commit "docs: deep analysis and teaching kit for NeuralNFT". Final report with line counts, what it is, 3 gaps, blocking gap, [LOW] claims, questions, defend paragraph.
## Reply Summary
> Read the client, both Express trees, the contract, the specs, and the four-commit history. Wrote five root docs plus an AGENTS.md section. No application file was edited. No server was started.
>
> The client mint and My NFTs do not share a store. `src/` has no `fetch`. `server/server.js` and `server/src` are different mints on port 5000. The class named StyleGAN is four dense layers and never calls `fit`.
>
> Files: PROJECT-STATE.md, PROJECT-GOALS.md, PROJECT-GAP.md, PROJECT-TEACH.md, PROJECT-CONTEXT.yaml, AGENTS.md, this entry, docs/ai-log/index.md, docs/content/ideas.md.
## Full Reply / Key Excerpts
> NeuralNFT is one repository and three programs that share vocabulary. The root dev script starts Vite only. The create page draws an SVG data URL and, after three seconds, returns a random token whose owner is the constant `0x1a2b3c4d5e6f`. My NFTs renders `mockNFTs` and never receives that object.
>
> The monolith exits unless Hardhat on port 8545 and the TensorFlow model both initialize. The modular routes import `isAddress` from `ethers`. The locked package is ethers 5.7.2, and its published `lib/index.d.ts` exports `utils`, not `isAddress`. That boot was not executed.
>
> Blocking gap: the generate, mint, and collection pages have no shared source of truth. Tests, the fake model, and the server choice are the next gaps. They do not make "View in My Collection" show a token the array never stored.
>
> `[LOW]` and not defended as observed: contract compile, native TensorFlow and canvas load, Pexels bytes, the Vercel URL, liveness of `0x5FbDB2315678afecb367f032d93F642f64180aa3`, Express 5 middleware at runtime, and browser pixels.
## Considerations
- The task forbids application edits, server starts, and Ariadne file edits. `project.yaml`, feature frontmatter, `docs/verification.md`, and `docs/learning/concepts.md` were left alone.
- AGENTS.md §7 requires a content-ideas row. That file is docs, not Ariadne state, so one row was appended.
- `docs/architecture/deployment.md` names `neural-nft.vercel.app`. The current README does not link it. The URL was not requested.
- ethers 5.7.2 types were checked at `https://unpkg.com/ethers@5.7.2/lib/index.d.ts`. The modular server was not started.
- Mock address length was measured with a Node one-liner of the same expression. Twenty samples were length 15. The UI was not opened.
- A wrong dotenv-path theory was dropped after counting directories: `server/src/config/env.ts` resolves `../../.env` to `server/.env` for both ts-node and `dist`.
## Alternatives Considered
- Alternative A: Mark the modular server `partial` because the route list is large. Rejected because the `isAddress` import is on the startup import graph and does not match the locked types.
- Alternative B: Call `weights.bin` proven random. Rejected because the bytes are opaque. The defendable claim is the architecture and the missing `fit`, with provenance at medium confidence.
- Alternative C: Name "no tests" as the blocking gap. Rejected because a test would not put the minted object into `mockNFTs`.
## Learning Notes (For the Human)
- Concept introduced: a closed user-interface loop can still be an open system. The success panel and the next page do not share state.
- Why it matters: a portfolio sentence about minting is only true if the collection reads the object the button wrote. File presence is not that proof.
- Where to read more: PROJECT-TEACH.md mental model, PROJECT-GAP.md blocking gap, `src/utils/mockData.ts`, `src/components/NFT/NFTCollection.tsx`.
## Content Angles
> At least one. This feeds /docs/content/ideas.md.
- Type: teaching
- Idea: three programs in one repo, and the mint button's success panel is invisible to the next page
- Hook: The button says the NFT minted. The next page has never heard of it.
## Files Changed
- PROJECT-STATE.md — capability and endpoint tables from a full read
- PROJECT-GOALS.md — stated goals, inferred goals, questions for the owner
- PROJECT-GAP.md — one gap per capability, three largest, blocking gap
- PROJECT-TEACH.md — mental model and failure modes with file citations
- PROJECT-CONTEXT.yaml — analysis_version 1, nulls explicit
- AGENTS.md — section 11, Project Analysis Artifacts
- docs/ai-log/entries/0002-2026-10-01-deep-analysis-teaching-kit.md — this entry
- docs/ai-log/index.md — index row
- docs/content/ideas.md — one teaching row
## Verification
> No servers. No browser. No app-code diff.
> YAML parsed with a Ruby YAML load.
> Address-length expression sampled in Node (20 of 20 were length 15).
> ethers 5.7.2 `lib/index.d.ts` fetched from unpkg; `isAddress` is not a root export.
> `git diff` limited to the files listed above.
## Follow-ups / Open Questions
- [ ] Which server should the browser call, or is the SVG mock the product?
- [ ] Is the chain Hardhat localhost, and is `0x5FbDB2315678afecb367f032d93F642f64180aa3` live?
- [ ] Should the TensorFlow file stay an experiment beside the SVG demo?
- [ ] Is `neural-nft.vercel.app` a deploy to document?
- [ ] Who is the portfolio audience?
- [ ] Should feat-002 stay in_progress until a server is chosen?
- [ ] May the unused server be deleted later?
- [ ] Is the mock wallet finished?
