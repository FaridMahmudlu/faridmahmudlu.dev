// Post-build audit: security (CSP-safety), SEO and link integrity checks
// over everything in dist/. Exits non-zero on any failure.
//   pnpm build && pnpm audit:dist
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const SITE = 'https://faridmahmudlu.dev';
const LOCALES = ['en', 'az', 'hu'];
const errors = [];
const warnings = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const urlOf = (file) => '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '');

const resolves = (href) => {
  const path = decodeURIComponent(href.split('#')[0].split('?')[0]);
  if (path === '' || path === '/') return existsSync(join(DIST, 'index.html'));
  const target = join(DIST, path);
  return (
    (existsSync(target) && statSync(target).isFile()) ||
    existsSync(join(target, 'index.html')) ||
    existsSync(`${target.replace(/[\\/]$/, '')}.html`)
  );
};

const titles = new Map();
const descriptions = new Map();
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

for (const file of html) {
  const src = readFileSync(file, 'utf8');
  const url = urlOf(file);
  const isError = /404/.test(url);

  // ── Security: nothing a strict CSP would block ──
  for (const tag of src.match(/<script\b[^>]*>/g) ?? []) {
    const type = attr(tag, 'type');
    if (!attr(tag, 'src') && type !== 'application/ld+json') fail(url, `inline executable script: ${tag}`);
  }
  if (/<style[\s>]/.test(src)) fail(url, 'inline <style> element');
  if (/\sstyle="/.test(src)) fail(url, 'inline style attribute');
  if (/\son[a-z]+="/i.test(src)) fail(url, 'inline event handler attribute');
  if (/href="javascript:/i.test(src)) fail(url, 'javascript: URL');
  if (/[\w.+-]+@(?:faridmahmudlu\.dev|gmail\.com)/i.test(src)) fail(url, 'plain-text personal email address in HTML');
  for (const a of src.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? []) {
    if (!/rel="[^"]*noopener/.test(a)) fail(url, `target=_blank without rel=noopener: ${a}`);
  }

  // ── Structure & SEO ──
  const lang = src.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
  if (!lang) fail(url, 'missing <html lang>');
  const h1s = (src.match(/<h1\b/g) ?? []).length;
  if (h1s !== 1) fail(url, `expected exactly one <h1>, found ${h1s}`);
  const title = src.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(url, 'missing <title>');
  const desc = src.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(url, 'missing meta description');

  for (const block of src.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? []) {
    try {
      JSON.parse(block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, ''));
    } catch (e) {
      fail(url, `invalid JSON-LD: ${e.message}`);
    }
  }

  if (!isError) {
    if (title) {
      if (titles.has(title)) fail(url, `duplicate <title> with ${titles.get(title)}`);
      titles.set(title, url);
      if (title.length > 70) warn(url, `long <title> (${title.length} chars)`);
    }
    if (desc) {
      if (descriptions.has(desc)) fail(url, `duplicate description with ${descriptions.get(desc)}`);
      descriptions.set(desc, url);
      if (desc.length < 70 || desc.length > 170) warn(url, `description length ${desc.length}`);
    }
    const canonical = src.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== `${SITE}${url}`) fail(url, `canonical mismatch: ${canonical}`);
    for (const l of [...LOCALES, 'x-default']) {
      if (!src.includes(`hreflang="${l}"`)) fail(url, `missing hreflang ${l}`);
    }
    for (const prop of ['og:title', 'og:description', 'og:image', 'og:url']) {
      if (!src.includes(`property="${prop}"`)) fail(url, `missing ${prop}`);
    }
    const og = src.match(/property="og:image" content="([^"]+)"/)?.[1];
    if (og && !resolves(og.replace(SITE, ''))) fail(url, `og:image not generated: ${og}`);
  }

  // ── Internal links and assets ──
  for (const m of src.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    if (m[1].startsWith('//')) continue;
    if (!resolves(m[1])) fail(url, `broken internal link: ${m[1]}`);
  }
  for (const m of src.matchAll(/hreflang="[^"]+" href="([^"]+)"/g)) {
    if (!resolves(m[1].replace(SITE, ''))) fail(url, `hreflang target missing: ${m[1]}`);
  }
}

// ── Sitemap ──
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) if (!resolves(loc.replace(SITE, ''))) fail('sitemap.xml', `missing page ${loc}`);
const indexable = html.filter((f) => !/404/.test(f)).length;
if (locs.length !== indexable) fail('sitemap.xml', `${locs.length} URLs for ${indexable} indexable pages`);

// ── Well-known & headers ──
const headers = readFileSync(join(DIST, '_headers'), 'utf8');
for (const h of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy', 'Cross-Origin-Opener-Policy']) {
  if (!headers.includes(`${h}:`)) fail('_headers', `missing ${h}`);
}
const csp = headers.match(/^\s*Content-Security-Policy: (.+)$/m)?.[1] ?? '';
if (/unsafe-inline|unsafe-eval|\*/.test(csp)) fail('_headers', 'CSP allows unsafe-inline, unsafe-eval or wildcards');
if (!/frame-ancestors 'none'/.test(csp) || !/object-src 'none'/.test(csp)) fail('_headers', 'CSP missing frame-ancestors/object-src none');
const securityTxt = readFileSync(join(DIST, '.well-known', 'security.txt'), 'utf8');
const expires = securityTxt.match(/^Expires: (.+)$/m)?.[1];
if (!expires || new Date(expires) <= new Date()) fail('security.txt', 'Expires missing or in the past');
for (const f of ['robots.txt', 'llms.txt', 'llms-full.txt', 'manifest.webmanifest', 'favicon.ico', 'favicon.svg', 'favicon-96x96.png', 'icon-192.png', 'apple-touch-icon.png', 'humans.txt', 'cv/farid-mahmudlu-cv.pdf']) {
  if (!existsSync(join(DIST, f))) fail(f, 'missing');
}

for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  FAIL  ${e}`);
console.log(`\naudit: ${html.length} HTML files, ${locs.length} sitemap URLs — ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
