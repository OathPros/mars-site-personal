import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base so the built assets resolve correctly no matter what
  // subpath GitHub Pages serves the site from (e.g. /<repo-name>/).
  base: './',
})
