# PROJECT-STATE

| Field | Value |
|---|---|
| Audit date | 2026-10-01 |
| Method | Full read of the tree and `git log` |
| Processes started | None |
| Browser opened | No |
| `[HIGH]` | A fact in a file, or a measurement run without starting the app |
| `[MED]` | A conclusion that follows from those files and was not executed |
| `[LOW]` | Not observed; do not quiz it as a fact |

| Tag | Meaning |
|---|---|
| done | The behavior exists on a closed path in this repo |
| partial | Some of the behavior exists; a required piece is missing or unwired |
| broken | The path exists and cannot do what the surrounding code or copy says |
| planned | A comment, spec, or example describes it; the working path does not |
| absent | No implementation |

## Identity

| Field | Value | Confidence |
|---|---|---|
| Name | NeuralNFT | [HIGH] `src/components/Header.tsx`, `server/contracts/NeuralNFT.sol` |
| Package name | Root `package.json` name is still `ai-nft-platform` | [HIGH] `package.json` |
| HTML title | `AI-Generated NFT Art Platform` | [HIGH] `index.html` |
| Repository | `tobidontplay/NeuralNFT` | [HIGH] `project.yaml`, `git remote` |
| Owner | GitHub account `tobidontplay` | [HIGH] `AGENTS.md` |
| Visibility | Public | [HIGH] `AGENTS.md` |
| Purpose in docs | AI art gallery and NFT mint UI | [HIGH] `AGENTS.md`, `specs/project-brief.md` |
| Commits on HEAD | 4 | [HIGH] `git rev-list --count HEAD` |
| HEAD | `b9c7ea2` 2026-09-26, Ariadne docs merge | [HIGH] `git log` |
| Last product-code commit | `b118aef` 2025-05-03, rename ArtifyNFT to NeuralNFT | [HIGH] `git log` |
| First commit | `a550cfa` 2025-05-03, initial platform | [HIGH] `git log` |
| Stale identity line | `AGENTS.md` §1 still says two commits and a last commit of 2025-05-03 | [HIGH] `AGENTS.md` |
| Disk hog | `server/ai/models/stylegan_model/weights.bin` is 53,140,480 bytes | [HIGH] filesystem |
| Bolt origin | Template `bolt-vite-react-ts` | [HIGH] `.bolt/config.json` |

## Stack

| Layer | Choice | Declared version | Confidence |
|---|---|---|---|
| Client language | TypeScript, React function components | `typescript` ^5.5.3, `react` ^18.3.1 | [HIGH] `package.json` |
| Client bundler | Vite | `vite` ^5.4.2 | [HIGH] `package.json`, `vite.config.ts` |
| Client routing | `react-router-dom` `BrowserRouter` | ^6.22.3 | [HIGH] `package.json`, `src/App.tsx` |
| Client styling | Tailwind CSS via PostCSS | `tailwindcss` ^3.4.1 | [HIGH] `tailwind.config.js`, `src/index.css` |
| Icons | `lucide-react` | ^0.344.0 | [HIGH] `package.json` |
| Client lint | ESLint 9 flat config, typescript-eslint | `eslint` ^9.9.1 | [HIGH] `eslint.config.js` |
| API | Express, two entry files | `express` ^5.1.0 in `server/package.json` | [HIGH] |
| API language | `server/server.js` is CommonJS JavaScript; `server/src` is TypeScript | server `typescript` ^5.8.3 | [HIGH] |
| Chain library | ethers | ^5.7.2, lockfile resolved `5.7.2` | [HIGH] `server/package-lock.json` |
| Contract | Solidity ERC-721 | `pragma solidity ^0.8.4` | [HIGH] `server/contracts/NeuralNFT.sol` |
| Contract libs | OpenZeppelin ERC721URIStorage, Counters, Ownable, ReentrancyGuard | `@openzeppelin/contracts` ^4.9.3 | [HIGH] `server/package.json` |
| Contract tool | Hardhat | `hardhat` ^2.23.0, `solidity: "0.8.4"` | [HIGH] `server/hardhat.config.js` |
| Numeric model | TensorFlow.js Node | `@tensorflow/tfjs-node` ^4.22.0 | [HIGH] `server/package.json`, `server/ai/model.js` |
| Image canvas | `canvas` | ^3.1.0 | [HIGH] `server/ai/model.js` |
| Database | None | — | [HIGH] no driver imports |
| Tests | None in tree; server script exits 1 | `server/package.json` `"test"` | [HIGH] |
| CI | None | `project.yaml` `github.ci: null`; no workflow files | [HIGH] |
| Client port | Unset in `vite.config.ts` | Vite's own default is not written in this repo | [HIGH] `project.yaml` `port: null` |

## Components

| Component | Responsibility | Location | Called by the client? | Confidence |
|---|---|---|---|---|
| App shell | Wallet provider, router, header, footer, four routes | `src/App.tsx` | Yes, it is the client | [HIGH] |
| Header | Nav and mock wallet button | `src/components/Header.tsx` | Yes | [HIGH] |
| Footer | Portfolio blurb and link lists | `src/components/Footer.tsx` | Yes | [HIGH] |
| Home | Marketing sections and stock images | `src/pages/HomePage.tsx` | Route `/` | [HIGH] |
| Create | Parameter form and preview | `src/pages/CreatePage.tsx`, `src/components/ArtGenerator/` | Route `/create` | [HIGH] |
| Gallery | Search, filters, cards | `src/components/Gallery/Gallery.tsx` | Route `/gallery` | [HIGH] |
| My NFTs | Grid or list of two mock tokens | `src/components/NFT/NFTCollection.tsx` | Route `/my-nfts` | [HIGH] |
| Wallet context | Random address and balance in React state | `src/context/WalletContext.tsx` | Yes | [HIGH] |
| Client art math | SVG string to a base64 data URL | `src/utils/artGenerator.ts` | Yes, via `src/utils/mockData.ts` | [HIGH] |
| Client fixtures | Five stock artworks, two NFTs, style lists | `src/utils/mockData.ts` | Yes | [HIGH] |
| Express monolith | In-memory API plus chain mint | `server/server.js` | No `fetch` in `src/` | [HIGH] |
| Chain adapter | ethers v5 contract calls on `http://localhost:8545` | `server/blockchain/contractInteraction.js` | Only from `server/server.js` | [HIGH] |
| Model service | Loads `stylegan_model` and writes a PNG | `server/ai/service.js`, `server/ai/model.js` | Only from `server/server.js` | [HIGH] |
| Express modules | Routes, controllers, services | `server/src/` | No `fetch` in `src/` | [HIGH] |
| Second SVG copy | Same generator, Node `Buffer` base64 | `server/src/utils/artGenerator.ts` | Only the TypeScript art service | [HIGH] |
| Contract | Mint, list, buy, royalty, platform fee | `server/contracts/NeuralNFT.sol` | JS adapter calls `mintNFT` only | [HIGH] |
| Deploy script | Deploys and writes `contractData/` | `server/scripts/deploy.js` | Not wired to a root script | [HIGH] |
| Artifact | ABI and bytecode named `NeuralNFT` | `server/contractData/NeuralNFT.json` | Read by the JS adapter | [HIGH] |
| Address file | `{"NeuralNFT":"0x5FbDB2315678afecb367f032d93F642f64180aa3"}` | `server/contractData/contract-address.json` | Read by the JS adapter | [HIGH] |

## Capabilities

| ID | Capability | Status | Evidence | Confidence |
|---|---|---|---|---|
| cap-client-routes | Four client pages | done | `src/App.tsx` routes `/`, `/create`, `/gallery`, `/my-nfts` | [HIGH] |
| cap-client-home | Home marketing page | done | `src/pages/HomePage.tsx` renders without a server | [HIGH] |
| cap-client-wallet | Wallet connect | partial | `WalletContext.tsx` waits 1.5s and stores a random string; no `window.ethereum` | [HIGH] |
| cap-client-generate | Art generation in the browser | partial | `generateArt` builds an SVG data URL; `theme` changes the title only | [HIGH] |
| cap-client-gallery | Searchable gallery | partial | Filters `mockArtworks` (five Pexels URLs), not an API | [HIGH] |
| cap-client-mint | Mint from Create or Gallery | broken | `mintNFT` in `mockData.ts` resolves a local object; `mockNFTs` is unchanged | [HIGH] |
| cap-client-collection | My NFTs for the connected wallet | broken | `NFTCollection.tsx` always reads `mockNFTs`; list, cancel, and transfer have no handlers | [HIGH] |
| cap-api-js | `server/server.js` HTTP API | partial | Routes exist; `startServer` calls `process.exit(1)` unless chain init and model init both return true; client never calls them | [HIGH] |
| cap-api-ts | `server/src` HTTP API | broken | Routes exist; `isAddress` is imported from `ethers` and ethers 5.7.2 types do not export that name | [HIGH] type mismatch; [MED] process exit, not executed |
| cap-contract | ERC-721 contract in the tree | partial | `NeuralNFT.sol` and a compiled artifact exist; this audit did not compile or deploy | [HIGH] files; [LOW] current chain liveness |
| cap-marketplace | List, cancel, buy | partial | Contract functions exist; TypeScript service edits an array; UI buttons do nothing; `server.js` has no list or buy route | [HIGH] |
| cap-ai-model | Trained generative model | broken | `StyleGANGenerator` is four dense layers; `model.js` never calls `fit`; the client does not use it | [HIGH] architecture; [MED] whether `weights.bin` was trained outside this repo |
| cap-metadata | Public token metadata | absent | `server.js` writes `tokenURI` as `/uploads/metadata-<id>.json`; `ipfs-http-client` is never imported | [HIGH] |
| cap-persistence | Durable art and NFT records | absent | Arrays in the Node process and in React state | [HIGH] |
| cap-auth | Wallet signature checks | broken | `nft.controller.ts` accepts `signature` and does not read it; `verifySignature` returns `true` | [HIGH] |
| cap-tests | Automated tests | absent | No `*.test.*` or `*.spec.*`; `server/test` is missing; root has no test script | [HIGH] |
| cap-deploy | Hosted app and live contract | absent | No workflow file; `docs/architecture/deployment.md` names a Vercel URL the current `README.md` does not link | [HIGH] docs; [LOW] whether that URL responds |

## Endpoints

| Note | Evidence | Confidence |
|---|---|---|
| The client calls none of the rows below | No `fetch` in `src/` | [HIGH] |

| Server | Method | Path | What the handler does | Status | Confidence |
|---|---|---|---|---|---|
| `server/server.js` | POST | `/api/art/generate` | Validates style, color scheme, complexity, theme; calls `aiService.generateArt`; pushes RAM | partial | [HIGH] |
| `server/server.js` | GET | `/api/art` | Returns the RAM array | partial | [HIGH] |
| `server/server.js` | GET | `/api/art/parameters` | Returns style, color, and theme lists | partial | [HIGH] |
| `server/server.js` | GET | `/api/art/:id` | One RAM artwork or 404 | partial | [HIGH] |
| `server/server.js` | POST | `/api/nft/mint` | Requires `artId` and `walletAddress`; writes metadata JSON; calls `blockchain.mintNFT` | partial | [HIGH] |
| `server/server.js` | GET | `/api/nft` | Returns the RAM NFT array | partial | [HIGH] |
| `server/server.js` | GET | `/api/nft/owner/:address` | Filters the RAM array by owner string | partial | [HIGH] |
| `server/server.js` | GET | `/api/wallet/balance/:address` | `provider.getBalance` on localhost:8545 | partial | [HIGH] |
| `server/server.js` | GET | `/health` | `{status:'ok'}` | partial | [HIGH] |
| `server/server.js` | GET | `/uploads/*` | Static files | partial | [HIGH] |
| `server/src` | POST | `/api/art/generate` | SVG data URL via `art.service.ts` | broken | [HIGH] import graph |
| `server/src` | GET | `/api/art` | RAM array in `art.service.ts` | broken | [HIGH] import graph |
| `server/src` | GET | `/api/art/:id` | One RAM artwork; no `/parameters` route, so that id 404s | broken | [HIGH] |
| `server/src` | POST | `/api/art/upload` | Multer image, 10MB, then RAM | broken | [HIGH] |
| `server/src` | POST | `/api/art/save` | Writes a data URL to `uploads/` as `.png` bytes | broken | [HIGH] |
| `server/src` | POST | `/api/nft/mint` | Random `tokenId`; ignores `signature` | broken | [HIGH] |
| `server/src` | GET | `/api/nft` | RAM array | broken | [HIGH] |
| `server/src` | GET | `/api/nft/owner/:address` | `isAddress`, then RAM filter | broken | [HIGH] |
| `server/src` | GET | `/api/nft/:tokenId` | RAM lookup | broken | [HIGH] |
| `server/src` | POST | `/api/nft/:tokenId/list` | Sets `price` and `forSale` in RAM; checks owner string | broken | [HIGH] |
| `server/src` | POST | `/api/nft/:tokenId/buy` | Changes `owner` in RAM; no payment | broken | [HIGH] |
| `server/src` | GET | `/api/nft/:tokenId/history` | RAM transactions | broken | [HIGH] |
| `server/src` | GET | `/api/wallet/balance/:address` | Random number 0–10 | broken | [HIGH] |
| `server/src` | GET | `/api/wallet/transactions/:address` | Five random rows | broken | [HIGH] |
| `server/src` | POST | `/api/wallet/verify` | Always `isValid: true` | broken | [HIGH] |
| `server/src` | GET | `/api/wallet/gas-price` | Random gwei-like numbers | broken | [HIGH] |
| `server/src` | GET | `/health` | `{status:'ok'}` | broken | [HIGH] import graph |
| Contract | call | `mintNFT(recipient, tokenURI)` | Public; creator stored is `msg.sender` | partial | [HIGH] |
| Contract | call | `listForSale`, `removeFromSale`, `buyNFT` | Owner checks; buy is `nonReentrant` and payable | partial | [HIGH] |
| Contract | call | `isForSale`, `getPrice`, `getCreator` | Views | partial | [HIGH] |
| Contract | call | `setRoyaltyPercentage`, `setPlatformFeePercentage` | `onlyOwner`, max 1000 basis points | partial | [HIGH] |

| Note | Evidence | Confidence |
|---|---|---|
| Both servers default `PORT` to 5000 | `server/server.js`, `server/src/config/env.ts` | [HIGH] |

## External Dependencies

| Dependency | Where it is named | Used by code? | Confidence |
|---|---|---|---|
| Pexels image URLs | `HomePage.tsx`, `mockData.ts` | Yes, as `<img src>` | [HIGH] names; [LOW] URLs still return bytes |
| Vite default dev origin `http://localhost:5173` | CORS in both servers | Assumed, not set in `vite.config.ts` | [HIGH] |
| Hardhat JSON-RPC `http://localhost:8545` | `contractInteraction.js` | Required for `server.js` to stay up | [HIGH] |
| Hardhat chain id 1337 | `server/hardhat.config.js` | Config only | [HIGH] |
| OpenZeppelin contracts | `NeuralNFT.sol` imports | Required to compile; compile not run | [HIGH] import; [LOW] compile result |
| TensorFlow.js native backend and `canvas` | `server/ai/model.js` | Required for `server.js` model init | [HIGH] import; [LOW] native addon loads |
| ethers 5.7.2 | `server/package-lock.json` | JS adapter uses v5 `ethers.providers` and `ethers.utils` | [HIGH] |
| ipfs-http-client, jimp, sharp | `server/package.json` | No import in `server/**/*.js` or `server/**/*.ts` | [HIGH] |
| OpenAI images URL | `server/.env.example`, `server/src/config/env.ts` | Example and default only; no live `axios` call | [HIGH] |
| Alchemy mainnet URL | `server/.env.example` | Example text; `server.js` ignores it | [HIGH] |
| `neural-nft.vercel.app` | `docs/architecture/deployment.md` | Not in `README.md`; not requested | [LOW] |

## Data Model

| Store | Entity | Fields that exist in code | Lifetime | Confidence |
|---|---|---|---|---|
| React state | `WalletState` | `connected`, `address`, `balance` | Until refresh | [HIGH] `src/types/types.ts` |
| React state | `GeneratedArt` | `id`, `imageUrl`, `title`, `params`, `created`, `minted` | Create page only, until refresh | [HIGH] |
| React state | `NFT` | `id`, `tokenId`, `artId`, `owner`, `price`, `forSale`, `created`, `transactionHash` | Returned to the mint panel only | [HIGH] |
| Module constant | `mockArtworks`, `mockNFTs` | Same shapes, Pexels URLs, owners `0x1a2b3c4d5e6f` | Fixed for the session | [HIGH] `src/utils/mockData.ts` |
| `server.js` RAM | `generatedArtworks`, `nfts`, `nftTransactions` | Same shapes plus tx `type` | Until that process exits | [HIGH] |
| `server/src` RAM | Separate arrays in `art.service.ts` and `nft.service.ts` | Same shapes; `NFTTransaction.type` is `mint`, `transfer`, or `sale` | Until that process exits | [HIGH] |
| Disk | PNG and metadata JSON | Under `server/uploads/`, created at runtime | Files can outlive the RAM arrays | [HIGH] code; directory not in git |
| Chain mappings | token id to price, for-sale flag, creator | `NeuralNFT.sol` | For as long as that chain's state lasts | [HIGH] source |
| Env defaults | RPC, contract, private key | Zero address and 64 zero hex digits if unset | `server/src/config/env.ts` | [HIGH] |
| Shared params | `ArtGenerationParams` | `style`, `colorScheme`, `complexity` from 0 to 1, `theme` | `src/types/types.ts` and `server/src/models/art.model.ts` | [HIGH] |
| Database schema | None | No driver and no table definition | Repo search | [HIGH] |

## Tests

| Check | Command in repo | Result this audit | Confidence |
|---|---|---|---|
| Root tests | No script | Not run; nothing to run | [HIGH] |
| Server tests | `npm test` prints an error and exits 1 | Not run; script is that message | [HIGH] `server/package.json` |
| Hardhat tests | `paths.tests` is `./test` | Directory does not exist | [HIGH] |
| Lint | Root `npm run lint` | Not run | [MED] unused imports are visible |
| Client build | `npm run build` | Not run | [LOW] |
| Either server boot | `server` scripts `dev`, `server`, `start` | Not run | [LOW] |
| Contract compile | Hardhat compile via `server/scripts/deploy.js` | Not run | [LOW] |
| Verification log | `docs/verification.md` | Header row only, no evidence | [HIGH] |
| Feature validation | feat-001 and feat-002 frontmatter | `tests`, `manual`, `user_opinion` are `unknown`; `verified_by` is null | [HIGH] |

## Dead code

| Item | Location | Why it is dead | Confidence |
|---|---|---|---|
| `generateMockSVG`, `svgToDataURL` | `server/server.js` | Defined, never called; generate uses `aiService` | [HIGH] |
| `generatedArtworks` in the controller | `server/src/controllers/art.controller.ts` | Declared, never read; the service has the real array | [HIGH] |
| `deleteArtwork` | `server/src/services/art.service.ts` | Exported, no route | [HIGH] |
| `mockNFTContractABI` | `server/src/services/nft.service.ts` | Never passed to a contract; the commented mint name is `mint`, the Solidity function is `mintNFT` | [HIGH] |
| `listNFTForSale`, `buyNFT`, `getNFTsByOwner` | `server/blockchain/contractInteraction.js` | Exported, no route calls them | [HIGH] |
| `User` icon import | `src/components/Header.tsx` | Imported, never used | [HIGH] |
| `axios` import | `art.controller.ts`, `art.service.ts` | Import only; the HTTP call is a comment | [HIGH] |
| `ethers` value import | `nft.controller.ts`, `wallet.controller.ts`, `nft.service.ts`, `wallet.service.ts` | Used in comments or not at all | [HIGH] |
| `isAddress` import | `wallet.service.ts` | Imported, never called in that file | [HIGH] |
| Empty-collection branch | `NFTCollection.tsx` | `mockNFTs.length` is 2, so the branch does not render | [HIGH] |
| `navigate('/create')` when minting without a wallet | `ArtCard.tsx` | Button is `disabled` when the wallet is disconnected, so the branch does not run | [HIGH] |
| `ipfs-http-client`, `jimp`, `sharp` | `server/package.json` | No source import | [HIGH] |
| `server/package.json` `"main": "index.js"` | `server/package.json` | That file is not in the tree; scripts point at `src/index.ts` and `server.js` | [HIGH] |
| Favicon `/vite.svg` | `index.html` | No `public/` directory and no svg in the repo | [HIGH] file missing; [LOW] browser icon chrome |

## What works E2E

| Term | Meaning |
|---|---|
| Closed | The code path does not need another process |
| Executed this audit | No row in this section was clicked |

| Flow | Closed in code? | What a click would use | Executed this audit | Confidence |
|---|---|---|---|---|
| Open `/` and read the home page | Yes | React and Tailwind only | No | [HIGH] path; [LOW] pixels |
| Open `/create`, `/gallery`, `/my-nfts` | Yes | Router only | No | [HIGH] path |
| Connect and disconnect on desktop | Yes | `WalletContext` timer and random string | No | [HIGH] path |
| Change style, color, complexity, theme and generate | Yes | Local SVG; theme affects the title string | No | [HIGH] path |
| Search and filter the five gallery cards | Yes | `mockArtworks` | No | [HIGH] path |
| Mint button shows a success panel after 3 seconds | Yes | `setTimeout` in `mintNFT` | No | [HIGH] path |
| My NFTs shows two cards after connect | Yes | Constant `mockNFTs`, any connected address | No | [HIGH] path |
| Generate on `server.js`, mint on the contract, see it in the UI | No | No client call, and `server.js` exits without Hardhat and the model | No | [HIGH] |
| Generate on `server/src` and mint a real token | No | Service returns a random id; client does not call it | No | [HIGH] |

## What is broken

| Issue | Where | Why it fails the promise next to it | Severity | Confidence |
|---|---|---|---|---|
| Create, mint, and My NFTs do not share state | `mockData.ts`, `GeneratedArtDisplay.tsx`, `NFTCollection.tsx` | Mint returns a new object; the collection reads a constant | [HIGH] | [HIGH] |
| Minted owner is not the connected wallet | `mockData.ts` `owner: '0x1a2b3c4d5e6f'` | The success panel and the collection disagree with `WalletContext` | [HIGH] | [HIGH] |
| Mock address is 15 characters | `WalletContext.tsx` `Math.random().toString(16).substring(2, 42)` | 20 samples in Node were all length 15; header `substring(38)` is empty | [HIGH] | [HIGH] measured |
| Collection actions do nothing | `NFTCard.tsx`, `NFTCollection.tsx` | List, cancel, transfer, and the Etherscan `<a href="#">` have no behavior | [HIGH] | [HIGH] |
| Mobile connect has no disconnect | `Header.tsx` | The connected mobile block shows the address and balance only | [MED] | [HIGH] |
| Footer links drop React state | `Footer.tsx` | `<a href="/">` and siblings do a full load; social and legal `href` are `#` | [MED] | [HIGH] |
| Home and gallery copy overclaim the stack | `HomePage.tsx` | "millions of images", Ethereum, and cloud GPUs are not in the client functions | [HIGH] | [HIGH] |
| Theme does not change pixels | `src/utils/artGenerator.ts` | `theme` is not read; color and style are | [MED] | [HIGH] |
| Spinner copy says 15–30 seconds | `GeneratedArtDisplay.tsx` | `generateArt` has no delay | [LOW] | [HIGH] |
| Hover title overlay | `NFTCard.tsx` | Uses `group-hover` and the card root has no `group` class | [LOW] | [HIGH] |
| `server.js` refuses to listen | `server/server.js` `startServer` | Exits when blockchain init or AI init returns false | [HIGH] | [HIGH] code; [LOW] this machine's port 8545 |
| Startup log reads a missing export | `server.js` prints `blockchain.contractAddress` | `module.exports` has no `contractAddress` | [MED] | [HIGH] |
| Token URI is a server path | `server/server.js` mint | `/uploads/metadata-....json` is not an `ipfs://` or absolute URL | [HIGH] | [HIGH] |
| Chain creator is the server signer | `contractInteraction.js` uses the first Hardhat account; Solidity stores `msg.sender` | Royalties would pay that account, not the `recipient` | [HIGH] | [HIGH] source |
| Owner scan calls a private counter | `getNFTsByOwner` calls `_tokenIds()` | ABI has no `_tokenIds`; the Solidity field is `private` | [HIGH] | [HIGH] |
| Modular server imports `isAddress` from ethers 5.7.2 | `nft.controller.ts`, `wallet.controller.ts`, `wallet.service.ts` | Published `ethers@5.7.2` `lib/index.d.ts` exports `utils`, not `isAddress` | [HIGH] | [HIGH] types; [MED] boot not executed |
| Signature gate is a stub | `wallet.service.ts` | `verifySignature` returns `true` | [HIGH] | [HIGH] |
| Two APIs, one port, zero client | Both servers and `src/` | They cannot be the same product until one is chosen and called | [HIGH] | [HIGH] |
| Untrained network named StyleGAN | `server/ai/model.js` | Dense 128→256→512→1024→12288; no `fit`; no dataset | [HIGH] | [HIGH] shape; [MED] weight provenance |
| No tests and an empty verification log | `docs/verification.md`, both `package.json` files | Nothing in git proves a boot or a mint | [HIGH] | [HIGH] |
