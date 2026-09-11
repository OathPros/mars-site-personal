# AI Solutions at York prototype

A Vite, React and TypeScript prototype for York's AI solution development process.

## Local setup

Requires a current Node.js release and npm.

```bash
npm ci
npm run dev
```

The development URL is printed by Vite. Hash-based routes preserve static-host deployment compatibility.

## Checks and build

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

`dist/` is the deployable static output. Browser-created records are stored in IndexedDB and are not submitted to York University.

Architecture and governance notes are in the repository-level `docs/` directory.
