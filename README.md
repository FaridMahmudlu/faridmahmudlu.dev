# faridmahmudlu.dev

Personal portfolio of **Farid Mahmudlu** — full-stack & AI software developer, Budapest.
Trilingual (EN / AZ / HU), fully static, scroll-driven WebGL2 storytelling, strict security headers.

**Concept — “Signal Path”.** One particle signal travels down the page through the six layers of a
product — Data → Auth & Security → Backend → Interface → Intelligence → Production. A GPU particle
system morphs into a different formation for each layer (tables and relations, an armillary lock,
server slabs, a browser and a phone, a MediaPipe hand skeleton, a globe of edge arcs), then converges
into a single point at the contact section.

## Stack

| Concern     | Choice                                                                                  |
| ----------- | --------------------------------------------------------------------------------------- |
| Framework   | Astro 7 (static output, zero framework JS)                                              |
| 3D          | Hand-written WebGL2 renderer (no three.js): one draw call, formations in a float texture, generated in a Web Worker |
| Motion      | Lenis (desktop smooth wheel), IntersectionObserver reveals, CSS transitions             |
| Type        | Archivo (variable width) + Martian Mono — self-hosted, full AZ/HU glyph coverage        |
| Hosting     | Cloudflare Workers static assets (free tier)                                            |
| OG images   | Satori + sharp, generated at build time for every page and language                     |

## Commands

```bash
pnpm install          # install (pnpm refuses package versions younger than 7 days)
pnpm dev              # local dev server — note: CSP headers are NOT applied in dev
pnpm check            # TypeScript / Astro diagnostics
pnpm build            # static build into dist/
pnpm audit:dist       # post-build audit: CSP-safety, SEO tags, hreflang, links, sitemap
pnpm verify           # check + build + audit (run before every deploy)
pnpm preview          # serve dist/ with Cloudflare's runtime + real _headers (wrangler dev)
pnpm run deploy       # verify, then wrangler deploy ("pnpm deploy" without "run" is a different, built-in pnpm command)
```

## Project structure

```
src/
  data/profile.ts           single source of truth for personal facts, links, skills
  data/work.ts              language-independent facts for every project
  i18n/dictionaries/*.ts    all UI copy (en is the source; az/hu must match its shape)
  i18n/routes.ts            route table: localised slugs, canonicals, hreflang, sitemap
  content/work/<lang>/*.md  case-study prose
  content/legal/<lang>/*.md privacy, legal notice, terms, accessibility, security
  pages/[...path].astro     generates every HTML page from the route table
  pages/og/[...slug].png.ts OG images
  pages/{robots,sitemap,llms,llms-full,manifest}…  SEO / GEO endpoints
  pages/.well-known/security.txt.ts
  scripts/main.ts           progressive enhancement entry (no innerHTML, no inline styles)
  scripts/signal/*          WebGL engine, shaders, formations, worker
public/_headers             CSP, HSTS, isolation headers, caching
scripts/                    asset generators + dist audit
```

## Editing content

- **Facts** (email, links, education, skills): `src/data/profile.ts`.
- **A new project**: add it to `src/data/work.ts`, add a summary to `work.summaries` in all three
  dictionaries, and create `src/content/work/{en,az,hu}/<slug>.md`. The build fails if a language is missing.
- **Copy**: `src/i18n/dictionaries/{en,az,hu}.ts`. TypeScript enforces identical structure.
- **Legal pages**: edit the Markdown and bump `updated:`. Keep the privacy policy in sync with reality —
  if you add any third-party service (analytics, embeds, forms), it must be documented there and allowed
  in the CSP.
- **Contact email**: `profile.email` in `src/data/profile.ts`. It is never written to HTML in plain text.

### Regenerating assets

```bash
node scripts/generate-icons.mjs        # favicon.ico / PNG icons from public/favicon.svg
python scripts/make-og-fonts.py        # static TTFs for OG images (needs fonttools, brotli)
node scripts/build-cv.mjs              # public CV → public/cv/farid-mahmudlu-cv.pdf (no phone number)
```

The CV is generated from `src/data/*` plus the CV wording in `scripts/build-cv.mjs`, and printed by
headless Chrome. A private copy with the phone number is built outside the repository — the number is
only ever read from an environment variable:

```powershell
$env:CV_PHONE = "+36 …"; node scripts/build-cv.mjs --private "$HOME\Desktop\Farid_Mahmudlu_CV.pdf"; Remove-Item Env:CV_PHONE
```

## Security model

- The build emits **no inline scripts, inline styles or event-handler attributes** (`pnpm audit:dist`
  fails if any appear), so the CSP in `public/_headers` needs no `'unsafe-inline'`, hashes or nonces.
- Trusted Types are enforced. The only policy, `signal-worker`, accepts same-origin URLs for the
  formation Web Worker.
- Never use `style="…"`, `<style>` in Markdown, `set:html` with untrusted data, or `innerHTML` in scripts.
  Set dynamic styles via `element.style.setProperty()` (CSSOM is allowed by CSP).
- Adding a third-party resource requires a CSP change in `public/_headers` **and** a privacy-policy update.

## Deploying to Cloudflare (free)

1. Create a Cloudflare account and **add `faridmahmudlu.dev` as a zone**; at your registrar, replace
   the nameservers with the two Cloudflare gives you.
2. Deploy from your machine:
   ```bash
   pnpm exec wrangler login
   pnpm run deploy
   ```
   `wrangler.jsonc` binds the Worker to the apex domain as a custom domain (certificate is automatic).
   Alternatively connect the GitHub repository in *Workers & Pages → Create → Import a repository*,
   with build command `pnpm build` and deploy command `npx wrangler deploy`.
3. **www → apex**: *Rules → Redirect Rules → Create* — “Redirect from WWW to root”, 301, preserve query
   string. Add a proxied `AAAA www 100::` record so the rule can fire.

### Dashboard checklist

| Setting | Value | Why |
| --- | --- | --- |
| SSL/TLS → Edge Certificates → Always Use HTTPS | On | |
| Minimum TLS version | 1.2 · TLS 1.3 On | |
| HSTS (dashboard) | **Off** | HSTS is already sent by `_headers`; avoid conflicting values |
| Speed → Rocket Loader | **Off** | injects inline scripts — breaks the CSP |
| Scrape Shield → Email Address Obfuscation | **Off** | injects an inline script; the site already obfuscates the email |
| Web Analytics | **On** (automatic setup) | cookieless; documented in the privacy policy |
| AI Crawl Control / Bots → Block AI bots | **Off** | GEO: AI answer engines must be able to read the site |
| Managed robots.txt | **Off** | so the site’s own `robots.txt` (and AI allow-list) is served |
| Bot Fight Mode | Optional | may set the strictly necessary `__cf_bm` cookie (already disclosed) |

### DNS hardening

| Record | Value | Purpose |
| --- | --- | --- |
| DNSSEC | Enable in *DNS → Settings*, then add the DS record at the registrar | signed DNS |
| `CAA @` | `0 issue "letsencrypt.org"` and `0 issue "pki.goog"` | restrict certificate issuers (Cloudflare adds its own CAs automatically) |
| `CAA @` | `0 iodef "mailto:<your address>"` | mis-issuance reports |

**Email on the domain.** The site publishes `hello@faridmahmudlu.dev`, delivered by Cloudflare
**Email Routing** (free): *Email → Email Routing → Get started*, create `hello`, forward it to your
Gmail and confirm the verification email. Email Routing adds its MX and SPF records automatically.
Then add `TXT _dmarc "v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s"` so nobody can send mail as the
domain. (Without Email Routing, mail to the published address bounces.)

`.dev` is on the HSTS preload list at the TLD level, so browsers only ever connect over HTTPS.

## After the first deploy

- Submit `https://faridmahmudlu.dev/sitemap.xml` in Google Search Console and Bing Webmaster Tools
  (Bing also feeds ChatGPT search and Copilot).
- Check headers at securityheaders.com and the CSP at csp-evaluator.withgoogle.com.
- Validate structured data with the Rich Results Test and validator.schema.org.
- Redeploy at least every ~10 months — `security.txt` carries an `Expires` date set at build time.
