# AGENTS.md

## Commands

- Install: `pnpm install` (pnpm 10; `minimumReleaseAge` blocks versions < 7 days old — do not relax it)
- Verify everything (run before finishing any change): `pnpm verify` → `astro check` + `astro build` + `node scripts/audit-dist.mjs`
- Preview with production headers/CSP: `pnpm preview` (wrangler dev on http://127.0.0.1:8788, serves `dist/`)
- `pnpm dev` does not apply `public/_headers`; test CSP-sensitive changes with `pnpm build && pnpm preview`.

## Hard rules

- No inline `<script>` (except `application/ld+json`), no `<style>` elements, no `style="…"` attributes,
  no `on*=` handlers, no `innerHTML`/`insertAdjacentHTML`. The audit fails the build otherwise.
- Dynamic styles only via `el.style.setProperty()`; DOM via `createElement`/`textContent`.
- Every page must exist in all three locales (en, az, hu). Routes come from `src/i18n/routes.ts` only.
- Facts live in `src/data/profile.ts` / `src/data/work.ts`; copy lives in `src/i18n/dictionaries/*`.
  Only state facts that are backed by the CV or the GitHub repositories.
- New third-party origins require both a CSP change (`public/_headers`) and a privacy-policy update in all languages.
- On Windows, do not edit files with PowerShell `Set-Content` (adds a BOM / re-encodes); use an editor or Node/Python.
- The GitHub repository is **public**. Commit with the noreply address
  (`git -c user.email=133771075+FaridMahmudlu@users.noreply.github.com commit …`) and never commit the
  phone number, private email, `.env*` files or the private CV. `main` is protected against force-push/deletion.
- CV: `node scripts/build-cv.mjs` regenerates the public PDF; the private copy is built with `CV_PHONE` set
  in the environment and written outside the repository (see README).

## Architecture notes

- WebGL: `src/scripts/signal/engine.ts` (raw WebGL2). Formations are generated in
  `formations.worker.ts` and uploaded per formation into one RGBA32F texture; the vertex shader
  morphs between two formations with a per-particle stagger. Scroll position → `stageAt()` in `main.ts`.
- Sections opt into the 3D story with `data-formation="<id>"` (ids in `src/scripts/signal/ids.ts`)
  and into the HUD with `data-chapter` / `data-chapter-label`.
- OG images: `src/pages/og/[...slug].png.ts` (Satori needs the merged TTFs in `src/assets/og-fonts/`).
