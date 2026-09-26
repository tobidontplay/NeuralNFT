---
id: feat-001
title: "Art gallery client"
status: Done
stage: implemented
target_stage: verified
final_result: "The Vite app lets a visitor open home, create, gallery, and my NFTs pages."
acceptance:
  - "src/pages has HomePage, CreatePage, GalleryPage, and MyNFTsPage."
  - "ArtGenerator, Gallery, and NFTCollection components exist."
  - "WalletContext holds the client wallet state."
validation:
  tests: unknown
  manual: unknown
  user_opinion: unknown
  verified_by: null
---

# Feature Spec: Art gallery client
- Status: Done
- Owner: NeuralNFT
- Linked ADRs: none yet
- Linked AI Log Entries: [docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md](../../docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md)
## 1. Objective
The Vite app lets a visitor open home, create, gallery, and my NFTs pages.
## 2. Requirements
### Functional
- src/pages has HomePage, CreatePage, GalleryPage, and MyNFTsPage.
- ArtGenerator, Gallery, and NFTCollection components exist.
- WalletContext holds the client wallet state.
### Non-Functional
- No root test script.
## 3. Technical Plan
- Affected Files: src/pages, src/components, src/context/WalletContext.tsx
- Data Model Changes: Client calls a server or uses utils/artGenerator.ts. The split was not fully traced.
- API Changes: Whatever the pages fetch. Not transcribed.
- Steps:
  1. Route the four pages.
  2. Generate or request art.
  3. Show the gallery.
## 4. Verification Plan
No tests. Manual: npm run dev. Not run in this pass.
## 5. Content Angle
Hook: the client is one package.json, and the API is a second tree the dev script does not start.
## 6. Open Questions
- Does the create page call server.js, server/src, or the local util?
