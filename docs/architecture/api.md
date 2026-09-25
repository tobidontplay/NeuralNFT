# API
Two servers. server/src/routes has art.routes.ts, nft.routes.ts, and wallet.routes.ts. Controllers include generate, list, mint. server/server.js is a second implementation with in-memory arrays. Paths were not copied line by line. Do not treat both as live.

| Method | Path | Purpose |
|---|---|---|
| * | server/src/routes/art.routes.ts | Generate and list art. Exact paths not transcribed. |
| * | server/src/routes/nft.routes.ts | Mint and list NFTs. Exact paths not transcribed. |
| * | server/server.js | Parallel in-memory API. Port fallback 5000. |
