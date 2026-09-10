# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Deployment

The site is deployed to GitHub Pages by `.github/workflows/deploy-pages.yml`
whenever a commit reaches `main`. The workflow builds this project and includes
the repository-level `CNAME` in the artifact. A successful deployment is
available at <https://lukegagliardi.ca/>.

The compiled site is also checked in at the repository root. This fallback is
intentional: it keeps the site working when the repository's Pages source is
configured as `main` / `(root)` instead of GitHub Actions. After changing the
app, refresh the fallback from the repository root with:

```sh
cd mars-site
npm run build:pages-fallback
```

The publishing script reuses `mars-site/public/yorku-logo.png` rather than
duplicating that binary file at the repository root.
