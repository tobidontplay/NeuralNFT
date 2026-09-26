# System Architecture Overview
## 1. Purpose
AI art gallery and NFT mint UI. A Vite client, an Express server, and a Solidity contract are all in the tree. Two server layouts exist.
## 2. High-Level Diagram
```mermaid
graph TD
    Client[src/pages] --> Vite\n    Client --> Express[server/server.js or server/src]\n    Express --> Contract[server/contracts/NeuralNFT.sol]
```
## 3. Components
| Component | Responsibility | Tech | Location |
|---|---|---|---|
| Pages | Home, create, gallery, my NFTs | React Router | src/pages/ |
| Generator | Parameter form and display | React | src/components/ArtGenerator/ |
| Express legacy | Single server.js with in-memory arrays | Express | server/server.js |
| Express modules | Routes, controllers, services | Express, TypeScript | server/src/ |
| Contract | NeuralNFT.sol plus Hardhat config | Solidity | server/contracts/, server/hardhat.config.js |
## 4. Data Flow
1. Vite serves the React pages. WalletContext is the client wallet holder.
2. server/server.js listens on PORT or 5000 and keeps generatedArtworks, nfts, and nftTransactions in memory.
3. server/src repeats art, nft, and wallet routes as modules. This pass does not choose a winner.
## 5. Key Decisions
- project.yaml runs the root dev script, which is the client. See ADR 001.
- Port is null because the client port is not configured. The 5000 fallback belongs to server.js only.
## 6. Future Considerations
- Delete or archive one server layout once you know which one boots in production. This pass did not delete it.
- Add tests before naming a test command.
