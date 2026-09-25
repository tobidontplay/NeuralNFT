# ADR 001: Root dev script starts the Vite client
- Date: 2026-09-25
- Status: Accepted
## Context
The repo contains a client and two server entry points. Ariadne needs one run command. Guessing a node command for server.js would ignore package.json.
## Decision
project.yaml run is npm run dev, the root script. The server is documented and not selected as the run command. Port is null.
## Consequences
- Positive: The command matches the manifest.
- Negative: A monitor that only runs npm run dev will not show the API.
- Neutral: You can change the run line after you pick an entry point.
## Alternatives Considered
- Alternative A: run: node server/server.js. Rejected because the root manifest does not say that, and a second server exists.
- Alternative B: Pick server/src as canonical without reading a start script. Rejected because no root script points at it.
