// @ts-check
import { defineConfig } from 'astro/config';

// Fully static output. Every script and stylesheet is emitted as an external,
// content-hashed file so the HTTP Content-Security-Policy (public/_headers)
// can stay strict: no 'unsafe-inline', no hashes, no nonces.
export default defineConfig({
  site: 'https://faridmahmudlu.dev',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  devToolbar: { enabled: false },
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    assets: '_astro',
  },
  markdown: {
    // Shiki emits inline style attributes, which a strict CSP would block.
    syntaxHighlight: false,
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      sourcemap: false,
    },
  },
});
