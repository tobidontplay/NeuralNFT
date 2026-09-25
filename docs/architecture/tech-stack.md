# Tech Stack
| Layer | Choice | Where |
|---|---|---|
| Client | React, Vite, react-router-dom | package.json, src/ |
| API | Express in two layouts | server/server.js, server/src/ |
| Chain | Solidity, Hardhat, ethers in the modular server | server/contracts, server/src/controllers/nft.controller.ts |

Root package.json dependencies seen in the audit are lucide-react, react, react-dom, and react-router-dom. The server has its own package.json.
