---
id: feat-002
title: "Mint API and contract"
status: In Progress
stage: in_progress
target_stage: verified
final_result: "An Express API and a Solidity contract are in the repo. Which server boots, and whether the contract is deployed, is unconfirmed."
acceptance:
  - "server/contracts/NeuralNFT.sol exists."
  - "server/src can mint through nft.controller.ts."
  - "server/server.js keeps NFTs in memory and listens on PORT or 5000."
validation:
  tests: unknown
  manual: unknown
  user_opinion: unknown
  verified_by: null
---

# Feature Spec: Mint API and contract
- Status: In Progress
- Owner: NeuralNFT
- Linked ADRs: docs/architecture/decisions/001-client-dev-script.md
- Linked AI Log Entries: [docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md](../../docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md)
## 1. Objective
An Express API and a Solidity contract are in the repo. Which server boots, and whether the contract is deployed, is unconfirmed.
## 2. Requirements
### Functional
- server/contracts/NeuralNFT.sol exists.
- server/src can mint through nft.controller.ts.
- server/server.js keeps NFTs in memory and listens on PORT or 5000.
### Non-Functional
- In-memory rows are not a chain.
- No private key belongs in git.
## 3. Technical Plan
- Affected Files: server/server.js, server/src, server/contracts/NeuralNFT.sol
- Data Model Changes: Memory arrays and, if deployed, the contract. Address not confirmed.
- API Changes: Art, NFT, and wallet routes in server/src. Parallel handlers in server.js.
- Steps:
  1. Choose one server.
  2. Point the client at it.
  3. Deploy only with a recorded address.
## 4. Verification Plan
No root tests. Hardhat tests were not found in the file list. Manual boot was not run.
## 5. Content Angle
Hook: two servers means the docs must refuse to pick one.
## 6. Open Questions
- Which file do you run in production?
- Is the contract deployed, and on which network?
