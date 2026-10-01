# PROJECT-GOALS

Audit date: 2026-10-01. Stated goals are sentences the repo already makes. Inferred goals are what the code and the docs are reaching for. This file does not add a new product goal.

## Stage

| Lens | Stage | Why |
|---|---|---|
| Product | Prototype / portfolio shell | Footer says the site is for portfolio purposes. The pages render from local data. The mint does not leave the browser. |
| feat-001 Art gallery client | `implemented` in frontmatter | Pages, generator, gallery, and `WalletContext` exist. `validation.tests`, `manual`, and `user_opinion` are `unknown`. `verified_by` is null. |
| feat-002 Mint API and contract | `in_progress` | The spec says which server boots, and whether the contract is deployed, is unconfirmed. |
| Docs | Onboarded 2026-09-26 | `project.yaml`, specs, and the architecture notes exist. The verification table has no data row. |
| Product code | Frozen since 2025-05-03 | The rename commit is the last change to application files. HEAD `b9c7ea2` is a docs merge. |

A senior description of the stage: the gallery is a clickable shell, and the mint is a sketch that was never joined to that shell.

## Target user

| User | Source | What they can do today |
|---|---|---|
| A visitor with a wallet | `specs/project-brief.md` | They can click Connect Wallet. The address is a random 15-character string, not an Ethereum account. |
| A developer running the client | `specs/project-brief.md`, ADR 001 | `npm run dev` at the repo root starts Vite only. The API is a second process the root script does not start. |
| The owner presenting a portfolio | `src/components/Footer.tsx` "Created for portfolio purposes." | They can show four pages. They cannot show a token that survives a refresh. |
| A future agent or tutor | `AGENTS.md`, this kit | They can read the tree without guessing which file is live. |

The homepage's visitor, who mints on Ethereum with a cloud model, is the user the copy describes. The code serves the developer who is demoing the shell.

## Stated goals

| ID | Goal | Where it is stated | Success criterion already written |
|---|---|---|---|
| g-visitor-loop | A visitor generates art, browses a gallery, and mints | `specs/project-brief.md` Vision | Client pages render: home, create, gallery, my NFTs |
| g-one-server | One Express entry is the server; the other is marked unused | `specs/project-brief.md` Success Criteria | The unused one is marked, not deleted in the onboard |
| g-real-address | A deployed contract address is copied from a real deploy log | `specs/project-brief.md` Success Criteria | Address written down from deploy output |
| g-contract-file | The contract of record is `server/contracts/NeuralNFT.sol` | `specs/project-brief.md` | The file exists |
| g-monitor | Ariadne can run, test, and build from `project.yaml` | `AGENTS.md` §10, ADR 001 | `run` is `npm run dev`; `test` is explicitly unknown; `port` is null |
| g-no-fake-tests | Do not invent a test command | `specs/project-brief.md` Out of Scope, `TODO.md` | `project.yaml` test line stays a TODO until a test exists |
| g-keep-both | Do not delete either server in a docs pass | `CASE-STUDY.md`, `docs/architecture/overview.md` | Both trees still present |
| g-no-mainnet-claim | Do not claim the contract is on mainnet | `specs/project-brief.md` Out of Scope | This kit does not make that claim |

The three checkboxes in the project brief are still unchecked. `[HIGH]`

## Inferred goals

These are not written as goals. They are what the extra code is for. Treat them as hypotheses until the owner answers the questions below.

| ID | Inferred goal | Evidence | If it is wrong |
|---|---|---|---|
| g-portfolio-demo | Show AI, chain, and a UI in one repo for a class or a hiring review | Footer portfolio sentence; homepage "three key technologies"; Bolt prompt asking for a production-worthy page | A real product would have deleted the mock once the API existed |
| g-local-hardhat | Demo mint against a local chain, not a public network | `contractInteraction.js` hardcodes `http://localhost:8545`; Hardhat `chainId` 1337; address file is the usual first Hardhat contract address | The `.env.example` Alchemy mainnet URL would be the real intent, and it is unused by `server.js` |
| g-svg-demo | Let Create work with no server and no GPU | The client generator never calls the network | The TensorFlow path in `server/ai/model.js` would be the one the UI should call |
| g-market | A tiny marketplace with royalties and a platform fee | `listForSale`, `buyNFT`, 250 basis points each in `NeuralNFT.sol` | The UI buttons would stay decorative on purpose |
| g-learn-by-scaffold | Keep the "in production this would…" comments as a study guide | Repeated comments in `server/src/services/*.ts` | Those comments are leftover generator text, not a syllabus |

## Success criteria

| Criterion | Stated or inferred | Met? | Evidence |
|---|---|---|---|
| Home, create, gallery, and my NFTs exist as routes | Stated | Code yes; not clicked this audit | `src/App.tsx` |
| One Express entry is chosen and the other marked unused | Stated | No | ADR 001 refuses to choose; both still look active |
| Contract address recorded from a deploy log | Stated | No | `contract-address.json` exists, but nothing in git is a deploy transcript, and this audit did not deploy |
| A mint on Create appears on My NFTs for the connected address | Inferred from the buttons | No | `mintNFT` does not push `mockNFTs`; owner is hardcoded |
| The client calls the chosen API | Inferred from `TODO.md` "Next" | No | No `fetch` in `src/` |
| A token URI can be opened by a wallet | Inferred from the metadata comment in `server.js` | No | URI is `/uploads/metadata-<uuid>.json` |
| Tests exist for mint and for the contract | Stated as someday in `TODO.md` | No | No test files |
| A monitor that only runs `npm run dev` shows the API | Explicitly not a goal | No, and ADR 001 accepts that | ADR 001 consequences |

## Non-goals

| Non-goal | Why it is out of scope | Source |
|---|---|---|
| Claiming mainnet deployment | Not verified; `.env.example` is a placeholder | `specs/project-brief.md` |
| Inventing `npm test` at the root | A passing monitor must not depend on a script that does not exist | `project.yaml`, brief |
| Deleting a server inside a documentation pass | The onboard and this audit are additive | `CASE-STUDY.md`, this task |
| Choosing the canonical server inside this audit | The owner has not answered `TODO.md` | `TODO.md` |
| A database, IPFS pinning, or OpenAI image calls | Dependencies and example URLs only | `server/package.json`, `server/.env.example` |
| MetaMask or WalletConnect | No `window.ethereum` in `src/` | `src/context/WalletContext.tsx` |
| Editing application code in this pass | The task forbids it | This task |

## Questions for the user

Answer these before any feature spec that wires the mint. Each one changes which file is allowed to stay.

1. Which process should a visitor's browser call: `server/server.js`, `server/src/index.ts`, or neither (the SVG mock is the product)?
2. Is the chain supposed to be Hardhat on `localhost:8545`, or a public network? The committed address `0x5FbDB2315678afecb367f032d93F642f64180aa3` is the address Hardhat gives the first contract from the first account. This audit did not ask a node if that address has code.
3. Should Create keep drawing SVG in the browser so the portfolio works offline? If yes, `server/ai/model.js` is an experiment, not the generator.
4. Is `neural-nft.vercel.app` a deploy you still use? `docs/architecture/deployment.md` says the portfolio README links it. The current `README.md` does not. This audit did not request the URL.
5. Who has to believe the demo: a class, a hiring manager, or someone who pays gas? Those three audiences forgive different mocks.
6. Should feat-002 stay `in_progress` until question 1 is answered? The spec's own frontmatter says the boot path is unconfirmed.
7. After question 1, may a later change delete or archive the other server? `CASE-STUDY.md` wishes that had happened earlier. `AGENTS.md` says to ask before a docs rule and a direct request disagree; deleting code needs an explicit yes.
8. Should Connect Wallet stay a mock until a spec names MetaMask, or is the mock the finished wallet for this portfolio?
