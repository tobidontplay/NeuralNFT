# PROJECT-TEACH

Teaching notes for NeuralNFT. Audit date: 2026-10-01. Every claim names a file. If a sentence would require a running process, it is marked as not executed. Servers were not started. The browser was not opened.

## Mental model

NeuralNFT is one repository and three programs that share vocabulary.

1. The **client** is a Vite React app in `src/`. `npm run dev` at the repo root starts this program only (`package.json`, ADR 001). It can show four pages, invent a wallet, draw an SVG, and pretend to mint.
2. The **monolith API** is `server/server.js`. It keeps art and NFTs in arrays. On startup it demands a Hardhat node and a TensorFlow.js model. If either init returns false, it calls `process.exit(1)`.
3. The **modular API** is `server/src/index.ts`. It looks like a finished REST app (upload, list, buy, gas, signatures). The implementations are in-memory fakes, and the route files import `isAddress` from `ethers` in a form that ethers 5.7.2's published types do not export.

The **contract** is a fourth artifact, `server/contracts/NeuralNFT.sol`. It is an ERC-721 token with a small marketplace. The client never talks to it. The monolith talks to it only if startup succeeds. The modular API does not call it; the real calls are comments in `server/src/services/nft.service.ts`.

The homepage says the product is an AI model trained on millions of images, minted on Ethereum, running in the cloud (`src/pages/HomePage.tsx`). The functions underneath are a random SVG, a random string address, and a four-layer dense network that this repo never trains. Read the function before you repeat the headline. That is the senior move in this repo.

A useful picture:

```text
Browser (src/)
  pages, mock wallet, SVG data URL, mock mint
  |
  |  no fetch()
  v
nothing

server/server.js                server/src/index.ts
  RAM arrays                      different RAM arrays
  Hardhat mint if :8545 is up     random token ids
  TensorFlow PNG                  SVG data URL
        |                               |
        v                               v
NeuralNFT.sol                     not called
  only if the monolith booted
```

## Architecture

### Client

`src/main.tsx` mounts `App` in React strict mode. `App` wraps the tree in `WalletProvider`, then `BrowserRouter`. Routes:

| Path | Page | Child that does the work |
|---|---|---|
| `/` | `HomePage` | Buttons call `navigate` |
| `/create` | `CreatePage` | `ArtGenerator` |
| `/gallery` | `GalleryPage` | `Gallery` |
| `/my-nfts` | `MyNFTsPage` | `NFTCollection` |

There is no catch-all route. An unknown path still shows the header and footer, with an empty main.

State lives in React `useState` and one context. There is no Redux, no React Query, and no `localStorage`. A full page load, including the footer's `<a href>` links, resets the wallet.

### Two servers on purpose

The 2026-09-26 onboard found both servers and wrote ADR 001: the monitor runs the client, and neither server is deleted. `CASE-STUDY.md` says the author would rather have deleted one server before the second was written. Both statements are in the repo. They are not a contradiction if you keep the scope straight: the onboard was not allowed to pick, and the product still needs a pick.

`server/package.json` scripts:

| Script | What it starts |
|---|---|
| `dev` | `nodemon --exec ts-node src/index.ts` (modular) |
| `server` | `nodemon server.js` (monolith) |
| `start` | `node dist/index.js` (modular, after `tsc`) |
| `test` | Prints an error and exits 1 |

The root `package.json` has `dev`, `build`, `lint`, and `preview`. None of them start Express.

### Contract

`NeuralNFT` extends OpenZeppelin `ERC721URIStorage`, `Ownable`, and `ReentrancyGuard`. The constructor names the token `NeuralNFT` and the symbol `NNFT`.

| Function | Who may call it | What it writes |
|---|---|---|
| `mintNFT(recipient, tokenURI)` | Anyone | Next token id, URI, creator = `msg.sender` |
| `listForSale(tokenId, price)` | Current owner, price > 0 | Price in wei and a for-sale flag |
| `removeFromSale(tokenId)` | Current owner | Clears the flag; does not emit an event |
| `buyNFT(tokenId)` | A buyer who is not the seller, with `msg.value` at least the price | Transfers the token, pays creator royalty, platform fee, and seller |

Royalty and platform fee default to 250 basis points. A basis point is 0.01 percent, so 250 is 2.5 percent. Each setter rejects a value above 1000 (10 percent). On a sale, royalty is zero when the seller is the creator. The platform fee is still taken. The remainder goes to the seller. Extra ETH is refunded.

`server/blockchain/contractInteraction.js` loads the ABI from `server/contractData/NeuralNFT.json` and the address from `contract-address.json`. The address in that file is `0x5FbDB2315678afecb367f032d93F642f64180aa3`. That value is the address Hardhat's first account gets for its first contract. The file proves someone saved that string. It does not prove a node is serving code at that address today. This audit did not open port 8545. Liveness is `[LOW]`.

The adapter's mint uses the first Hardhat account as the signer. In the Solidity function, the creator is `msg.sender`, which would be that account, not the `recipient` argument. A royalty later would pay the server's account.

`getNFTsByOwner` calls `artifyNFTContract._tokenIds()`. The Solidity field is `Counters.Counter private _tokenIds`. The committed ABI has no `_tokenIds` entry. The method is also unused by any route. It is dead and, if called, it does not match the ABI.

The variable is still named `artifyNFTContract` after the 2025-05-03 rename. The contract file, the artifact, and the address key were renamed. The JavaScript binding was not.

### Data flow that actually runs in the client

1. `ParameterInput` edits `ArtGenerationParams`.
2. `generateArt` in `src/utils/mockData.ts` calls `generateArtSVG` and `svgToDataURL`.
3. The image is a `data:image/svg+xml;base64,...` URL. A data URL is the file contents embedded in the address, so the browser does not need a server to show it.
4. `mintNFT` waits 3 seconds and returns a random token id, a random hash, and the owner `0x1a2b3c4d5e6f`.
5. `GeneratedArtDisplay` stores that object in component state and offers a link to `/my-nfts`.
6. `NFTCollection` ignores it and maps `mockNFTs`.

That is the whole mint loop. It is closed as a user interface and open as a system.

## Key decisions

| Decision | Where it is recorded | What it forces |
|---|---|---|
| Root `npm run dev` starts Vite, not Express | ADR 001, `project.yaml` | A green monitor can still have a dead API |
| Neither server was deleted | `CASE-STUDY.md`, overview | Docs must say which file they mean |
| Client generation is local SVG | `src/utils/artGenerator.ts` is what `ArtGenerator` imports | Create works with the API stopped |
| Marketplace fees live in the token contract | `NeuralNFT.sol` | There is no second marketplace contract to deploy |
| In-memory arrays stand in for a database | Comments in both servers | A restart is an empty gallery |
| Feature stage lives in frontmatter | `AGENTS.md` §10 | feat-001 `implemented` does not mean a human verified it |
| Port in `project.yaml` is null | ADR 001 | Do not treat the server's `5000` fallback as the Vite port |

Decisions the code made without an ADR:

| Behavior | Evidence | Why it matters |
|---|---|---|
| Mock wallet instead of a browser extension | `WalletContext.tsx` | The demo needs no extension and proves no ownership |
| Public `mintNFT` with no payment | `NeuralNFT.sol` | Supply is unlimited and the caller pays only gas |
| CORS origin fixed to `http://localhost:5173` | Both servers | A Vite port other than 5173 would be rejected by the browser if the client ever called the API |
| `server.js` does not call `dotenv` | The file's imports | `server/.env` does not configure the monolith |
| Modular env path is `server/.env` | `server/src/config/env.ts` resolves `../../.env` from `server/src/config` and from `server/dist/config` | The example file `server/.env.example` is the right place to copy from for the modular server |

## Technologies

Plain definitions, tied to this repo.

| Term | Meaning here | Where you can see it |
|---|---|---|
| Vite | Dev server and bundler for the React app. This config only registers the React plugin and excludes `lucide-react` from dependency optimization. | `vite.config.ts` |
| React context | A way to pass the wallet to any component without each page taking a prop. `useWallet` reads it. | `src/context/WalletContext.tsx` |
| Tailwind | Utility class names (`bg-gray-900`, `md:grid-cols-3`) instead of a separate stylesheet. `src/index.css` is three `@tailwind` lines. | `tailwind.config.js` |
| Data URL | An image address that contains the image. The client builds one from SVG text with `btoa`. The Node copy uses `Buffer`. | `src/utils/artGenerator.ts`, `server/src/utils/artGenerator.ts` |
| Express | HTTP library. Version 5 is declared. Both apps use `cors`, `helmet`, `morgan`, and `express.json()`. | `server/package.json` |
| CORS | The browser blocks a page on one origin from calling an API on another unless the API allows it. Both servers allow `http://localhost:5173` with credentials. | `server/server.js`, `server/src/index.ts` |
| Helmet | Sets safer HTTP headers. It is enabled. It is not authentication. | Both servers |
| ERC-721 | The Ethereum token standard for a unique asset. Each token has an owner and a `tokenURI` string that should point at metadata. | `NeuralNFT.sol` |
| `tokenURI` | The string a wallet fetches to find the name, image, and traits. This repo's monolith stores a relative uploads path. | `server/server.js` mint handler |
| Wei | The smallest ETH unit. The contract's `listForSale` expects wei. The JS helper converts with `ethers.utils.parseEther`. | `contractInteraction.js` |
| Basis points | Hundredths of a percent. 250 means 2.5%. The division in `buyNFT` is `/ 10000`. | `NeuralNFT.sol` |
| Reentrancy | A callee calls back into the contract before the first call finishes. `buyNFT` uses OpenZeppelin's `nonReentrant` guard. | `NeuralNFT.sol` |
| Hardhat | Local Ethereum toolkit. Configures Solidity 0.8.4, chain id 1337, and a localhost URL. | `server/hardhat.config.js` |
| ethers v5 | The library in the lockfile (`5.7.2`). The monolith uses `ethers.providers.JsonRpcProvider` and `ethers.utils.parseEther`, which are v5 names. | `contractInteraction.js` |
| `isAddress` import | The modular controllers write `import { isAddress } from 'ethers'`. The published `ethers@5.7.2` `lib/index.d.ts` exports `utils`, not a top-level `isAddress`. `ethers.utils.isAddress` is the v5 spelling. | Controllers; types checked against unpkg `ethers@5.7.2/lib/index.d.ts` |
| IPFS | A content-addressed file network. The comment in `server.js` wants it. The package `ipfs-http-client` is unused. | `server/package.json` |
| TensorFlow.js | Runs a tensor graph in Node. This repo builds a sequential dense model and, if `model.json` exists, loads it. | `server/ai/model.js` |
| StyleGAN | A real research architecture (mapping network, style blocks, a discriminator). This class is four `dense` layers ending in 64×64×3 numbers. The name is the class name, not the architecture. | `server/ai/model.js` |
| In-memory store | Arrays that live inside one Node process. They are empty after a restart. They are not shared between the two servers. | `server.js`, `art.service.ts`, `nft.service.ts` |
| Frontmatter | The YAML block between `---` at the top of a feature spec. Ariadne reads `stage` from there. Prose status can drift; the frontmatter is the contract. | `specs/features/001-art-gallery-ui.md` |

## Failure modes

Each row is a way a careful reader still gets the repo wrong.

| Mode | What you might believe | What the file does | Confidence |
|---|---|---|---|
| Headline trust | The home page's three technology cards are implemented | They are marketing paragraphs | [HIGH] |
| Mint success | "NFT Minted Successfully" means a transaction | `mintNFT` uses `setTimeout` and `Math.random` | [HIGH] |
| My collection | The connected address owns the two cards | `mockNFTs` is constant and the owner string is fixed | [HIGH] |
| Address looks short | The UI ellipsis hid the middle | Node samples of the same expression were length 15, and `substring(38)` is empty | [HIGH] measured; UI not opened `[LOW]` |
| Either server is the backend | The client has a base URL somewhere | No `fetch` in `src/` | [HIGH] |
| `server.js` is a normal API you can curl | Starting the file always listens | `startServer` exits when init returns false | [HIGH] code; port 8545 not probed `[LOW]` |
| The modular server is the safer one because it is TypeScript | It typechecks under its lockfile | The `isAddress` import does not match ethers 5.7.2 types | [HIGH] types; process not started `[MED]` |
| `weights.bin` is a trained GAN | The folder is named `stylegan_model` and the file is 51MB | No `fit`, no dataset, dense layers only. The weight bytes might still be non-default; this repo has no training script to prove that | [HIGH] architecture; [MED] provenance |
| The address file means the contract is deployed | The JSON has an address | No deploy log in git; node not queried | [HIGH] file; [LOW] liveness |
| Signature field means the caller proved the wallet | The JSON accepts `signature` | Mint ignores it; verify returns `true` | [HIGH] |
| Gallery mint without a wallet sends you to Create | `ArtCard` contains that `navigate` | The button is disabled when disconnected, so the branch does not run | [HIGH] |
| Theme is a visual control | The form has a Theme dropdown | `generateArtSVG` never reads `params.theme` | [HIGH] |
| Both servers can run for a full demo | They are both in the tree | Both default to port 5000 | [HIGH] |
| Footer navigation is client routing | The header uses `navigate` | The footer uses `<a href>`, which reloads the document | [HIGH] |
| `group-hover` shows the NFT title on the image | The class is in the overlay | The card root has no `group` class, so the overlay opacity stays 0 | [HIGH] code; pixels not opened `[LOW]` |
| Env example configures `server.js` | `server/.env.example` exists | `server.js` never calls `dotenv` | [HIGH] |
| Zero private key is only a comment | The example says `your-private-key-here` | `env.ts` defaults `PRIVATE_KEY` to 64 zeros if the variable is unset. Current services do not pass it to a signer because those lines are comments | [HIGH] default exists; [MED] it is only dangerous if those comments are uncommented |
| feat-001 `status: Done` means verified | The body says Done | Frontmatter `verified_by` is null and validation fields are `unknown` | [HIGH] |
| `AGENTS.md` commit count | "Two commits on main" | `git rev-list` is 4; product files last changed 2025-05-03; HEAD is the 2026-09-26 docs merge | [HIGH] |

`[LOW]` items this audit will not defend in a quiz as observed facts:

| Claim | Why it stays low |
|---|---|
| Hardhat compiles `NeuralNFT.sol` against OpenZeppelin 4.9.3 | Not compiled |
| `tfjs-node` and `canvas` load `weights.bin` on this machine | Not started |
| Pexels URLs still return images | Not requested |
| `neural-nft.vercel.app` responds | Named only in `docs/architecture/deployment.md`; not requested |
| A node currently has code at `0x5FbDB2315678afecb367f032d93F642f64180aa3` | Not queried |
| Express 5's error middleware behaves as the comments expect | Not booted |
| The browser paints the broken favicon, the short address, or the missing hover overlay | Files support the prediction; the UI was not opened |

## Conventions

| Convention | What to copy if you add code later | Evidence |
|---|---|---|
| API envelope | `{ success: true, data }` or `{ success: false, message }` with 400, 404, or 500 | Both servers |
| Client components | Function components, Tailwind on the element, icons from `lucide-react` | `src/components/` |
| Dark shell | `bg-gray-900 text-white` on the app root | `src/App.tsx` |
| Types | `ArtGenerationParams`, `GeneratedArt`, `NFT` duplicated in `src/types/types.ts` and `server/src/models/` | Both files |
| Titles | The same adjective and noun lists are copied in `mockData.ts`, `server.js`, and `art.service.ts` | Three copies |
| Specs before features | New behavior needs `specs/features/NNN-name.md` first | `AGENTS.md` §4 |
| Do not mark a feature accepted | `verified_by` stays null until a person says so | `AGENTS.md` §10 |
| Comments that say "in production" | They mark a mock. They are not a promise that the production path exists | `server/src/services/` |

## Open questions

A tutor can ask these. The repo does not answer them.

| Question | Why the files are silent |
|---|---|
| Which server is canonical? | ADR 001 and `TODO.md` leave it open |
| Is the SVG demo the product? | The client is wired to SVG; the monolith is wired to TensorFlow; nobody wrote "this one is the demo" |
| Was `weights.bin` trained outside the repo? | No training log, no `fit`, and the bytes are opaque |
| Is the contract address live? | A JSON file is not a receipt |
| Is there a public website? | `deployment.md` names one URL; `README.md` does not; nobody fetched it in this audit |
| Should the mock wallet remain? | It is the only wallet, and no spec says "replace it" |
| Who is the audience for the portfolio? | The footer says portfolio; it does not say class versus hiring |

## Accurate sentences

Sentences the owner can say out loud because a file backs them.

| Sentence | File |
|---|---|
| The root dev script starts the Vite client and does not start the API. | `package.json`, ADR 001 |
| The create page draws an SVG in the browser and encodes it as a data URL. | `src/utils/artGenerator.ts` |
| The mint button on that page waits three seconds and returns a random token id. | `src/utils/mockData.ts` |
| My NFTs renders two hardcoded tokens and does not read the mint result. | `src/components/NFT/NFTCollection.tsx` |
| There are two Express apps, and `src/` calls neither. | `server/server.js`, `server/src/index.ts`, no `fetch` under `src/` |
| The Solidity file is an ERC-721 with list, buy, a 2.5% royalty, and a 2.5% platform fee. | `server/contracts/NeuralNFT.sol` |
| The network class is named StyleGAN and implemented as four dense layers, with no `fit` call in the repo. | `server/ai/model.js` |
| There are no tests, and the verification log has no data row. | `docs/verification.md`, both package files |
| feat-001 is marked implemented and has not been verified by a person in the frontmatter. | `specs/features/001-art-gallery-ui.md` |
| feat-002 is in progress because the boot path and the deploy are unconfirmed. | `specs/features/002-mint-api-and-contract.md` |
