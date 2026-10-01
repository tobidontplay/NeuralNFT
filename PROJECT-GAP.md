# PROJECT-GAP

Audit date: 2026-10-01. Every row is one capability from `PROJECT-STATE.md`. "Gap" is the missing piece that keeps the status from being `done`. This audit did not start a server, so a boot failure is inferred where the table says so.

## Gap table

| ID | Status | What exists | Gap | What would make it done | Confidence |
|---|---|---|---|---|---|
| cap-client-routes | done | Four routes in `src/App.tsx` | No unmatched route. A bad path renders an empty `<main>`. | A `*` route, or an explicit decision that an empty main is acceptable. The four named routes themselves are present. | [HIGH] |
| cap-client-home | done | Static sections in `HomePage.tsx` | Copy describes a trained model, Ethereum, and cloud GPUs. The page does not implement them. The page as a page is complete. | Either change the sentences to match the SVG demo, or implement the things the sentences name. | [HIGH] |
| cap-client-wallet | partial | Connect, disconnect on desktop, a balance number | Address is not 20 bytes. Balance is random. No browser wallet. Mobile has no disconnect. State dies on full page load. | A spec that either documents the mock as the product, or replaces it with a real provider and stores the address the mint will use. | [HIGH] |
| cap-client-generate | partial | Style, color, and complexity change the SVG. A title is generated. | `theme` does not change shapes or colors. The preview says generation takes 15–30 seconds; the function returns on the next microtask. Nothing is saved. | Theme affects the picture, or the control is labeled as title-only. Persistence is a separate capability. | [HIGH] |
| cap-client-gallery | partial | Search and three filters over five cards, plus an empty-filter message | Data is `mockArtworks`. Images are remote stock photos, not generated SVG. Mint on a card does not update `minted` on the shared array except a local boolean. | Gallery reads the same store Create writes, or a chosen API. | [HIGH] |
| cap-client-mint | broken | Button, 3 second wait, success panel with token id and hash | The NFT object is not inserted into `mockNFTs`. Owner is `0x1a2b3c4d5e6f`. No API call. "View in My Collection" therefore cannot show the new token. | One store: the object the button creates is the object My NFTs renders, for `wallet.address`. | [HIGH] |
| cap-client-collection | broken | Connect gate, grid, list, two mock tokens, prices | Any connected address sees the same two tokens. List, cancel, and transfer do nothing. The empty state cannot appear. The Etherscan control is `href="#"`. | Collection filters by the connected address and is updated by mint. Buttons call a handler or they are removed. | [HIGH] |
| cap-api-js | partial | Art, mint, list, owner, balance, health, uploads | Client never calls it. `startServer` exits unless Hardhat on port 8545 and the model both initialize. Log line reads `blockchain.contractAddress`, which is not exported. Both this file and `server/src` want port 5000. | Owner picks this file. Client calls it. A node is running. The log uses the address the module already loaded. | [HIGH] code; [LOW] whether 8545 is open |
| cap-api-ts | broken | A larger route list: upload, save, list, buy, history, gas, verify | `import { isAddress } from 'ethers'` does not match ethers 5.7.2 type exports (`utils` is exported; `isAddress` is not). Mint writes a random id. Balance, gas, history, and verify are random or constant. `dotenv` is loaded from `server/.env` by `env.ts`; `server.js` does not load dotenv at all. | Owner picks this file, fixes the import to `ethers.utils.isAddress`, and replaces the stubs that should be real. Until the import typechecks, the route list is not a server. | [HIGH] types; [MED] boot not executed |
| cap-contract | partial | `NeuralNFT.sol`, Hardhat config, committed ABI, address file | No deploy transcript. No Hardhat test. Compile was not run. `mintNFT` is public and records `msg.sender` as creator, so a server-signed mint pays royalties to the server account. | A spec names the network. A deploy log is committed beside a new address. A test calls mint, list, and buy. | [HIGH] source; [LOW] compile and liveness |
| cap-marketplace | partial | Solidity list, cancel, buy, fees. TypeScript service mutates RAM. UI labels exist. | UI buttons have no `onClick`. `server.js` never calls `listNFTForSale` or `buyNFT`. The TypeScript buy does not move ETH. The chain helper's owner scan calls `_tokenIds()`, which is not in the ABI. | One implementation: UI event, API route, and contract call agree, or the buttons are removed until that exists. | [HIGH] |
| cap-ai-model | broken | `weights.bin` (53,140,480 bytes), `model.json`, a class named `StyleGANGenerator` | The network is dense layers 128→256→512→1024→12288. There is no `fit` and no dataset. `server.js` also contains an unused weaker SVG function. The client uses a third SVG copy and never loads this model. | Call it a random decoder, or replace it with a model this repo can train or can cite. Point one generator at the client. | [HIGH] shape; [MED] weight file provenance |
| cap-metadata | absent | A comment in `server.js` says production would use IPFS. `ipfs-http-client` is a dependency. | Mint writes a relative `/uploads/` path. No code constructs an `ipfs://` CID. Wallets outside this machine cannot resolve that path. | A spec chooses IPFS, a data URL, or an absolute URL, and the mint handler writes that string. | [HIGH] |
| cap-persistence | absent | Comments say to replace arrays with a database | Art, NFTs, and sales live in module arrays. A restart empties them. A chain mint from `server.js` could exist on Hardhat after the array is gone. | One source of truth named in a spec: chain events, a database, or an explicit session-only demo. | [HIGH] |
| cap-auth | broken | Request bodies include `signature`. A verify route exists. | The mint controller does not check `signature`. `verifySignature` returns `true`. `server.js` mint takes any `walletAddress` and sends the transaction from the first Hardhat account. | Verify the signature before a state change, or delete the parameter so the API does not look authenticated. | [HIGH] |
| cap-tests | absent | `server` test script exits 1 on purpose. Hardhat `paths.tests` points at a missing directory. | No file asserts a route, a component, or a contract function. `docs/verification.md` has no data row. | One test the owner can run, then a matching `project.yaml` test line and a verification row. | [HIGH] |
| cap-deploy | absent | Hardhat deploy script writes `contractData/` when someone runs it | No CI. No root start for the API. `deployment.md` mentions `neural-nft.vercel.app`; `README.md` does not link it. This audit did not request that host. | A chosen host, a recorded URL, and a contract address from a log. | [HIGH] repo; [LOW] the URL |

## The three biggest gaps

### 1. The visitor loop does not share a store

Create can mint. My NFTs can list tokens. Those two functions do not read or write the same array, and neither calls Express or `NeuralNFT.sol`. The success panel is a local React state update. The collection is a constant. Until one store sits behind both pages, the product sentence "mint it, then see it in your collection" is false. This is the blocking gap below.

### 2. Two APIs disagree, and the client uses neither

`server/server.js` tries to mint on Hardhat and to draw with TensorFlow. `server/src` mints with `Math.random`, verifies every signature, and imports an ethers name version 5.7.2 does not export. Both listen on port 5000 if they start. ADR 001 correctly refuses to pick a winner for the monitor. The product still needs a winner before a client call is a responsible change. Wiring the client to both, or to a guessed one, would freeze the wrong mint.

### 3. Nothing durable is proven

There is no database, no test, and no verification row. The model file is not a StyleGAN training run. The token URI is a path on the API machine. The committed contract address is a file, not a receipt this audit replayed. A reviewer cannot tell a demo that worked once from a demo that only compiles as text.

## Blocking gap

**The generate → mint → my collection loop has no shared source of truth.**

`src/utils/mockData.ts` `mintNFT` resolves a new object and returns it. `src/components/NFT/NFTCollection.tsx` renders `mockNFTs` and never receives that object. `src/` never calls `/api/nft/mint`. Choosing a server, deploying the contract, fixing `isAddress`, or training a model does not close this loop. Those are the next gaps, and they stay blocked on this one plus the owner's answer to which server is real (`PROJECT-GOALS.md` question 1).

A tutor can mark an answer wrong if it says the blocking gap is "no tests" or "the model is fake." Those are large. They are not what stops the button labeled "View in My Collection" from showing the token the previous button just created.
