// Builds the CV as a print-ready A4 PDF from the site's own data, rendered by
// headless Chrome (real, selectable, ATS-readable text and live links).
//
//   node scripts/build-cv.mjs
//       → public/cv/farid-mahmudlu-cv.pdf   (public version, no phone number)
//
//   CV_PHONE="+36 …" node scripts/build-cv.mjs --private "<output.pdf>"
//       → private version with the phone number, for direct applications.
//
// The phone number is read from the environment only, so it never enters the repository.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { profile, skills, SITE_HOST } from '../src/data/profile.ts';
import { work, additionalWork } from '../src/data/work.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const privateIndex = args.indexOf('--private');
const isPrivate = privateIndex !== -1;
const phone = process.env.CV_PHONE?.trim();

if (isPrivate && !phone) throw new Error('Set CV_PHONE for the private version.');
const output = isPrivate
  ? resolve(args[privateIndex + 1] ?? 'Farid_Mahmudlu_CV.pdf')
  : join(ROOT, 'public', 'cv', 'farid-mahmudlu-cv.pdf');

/* ───────────── Content ───────────── */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = (v) => {
  const [y, m] = v.split('-').map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : String(y);
};
const period = (w) => `${month(w.start)} – ${w.end ? month(w.end) : 'Present'}`;
const byslug = Object.fromEntries(work.map((w) => [w.slug, w]));
const host = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const email = `${profile.email.user}@${profile.email.domain}`;

const experience = [
  {
    slug: 'hushplan',
    role: 'Founder & Full-Stack Developer',
    bullets: [
      'Founded and solely built a privacy-first group-planning product (Flutter app + Next.js 16 website) where members set private spending limits and the group sees only which options fit.',
      'EU-hosted Supabase/PostgreSQL backend with RLS, a non-exposed private schema and membership-checked SECURITY DEFINER RPCs; every privacy rule covered by pgTAP tests.',
      'Shipped v1.0 to Google Play internal testing: FCM push, 7 languages, 36 currencies, Cloudflare Turnstile, CI and daily encrypted backups.',
    ],
  },
  {
    slug: 'calisiyo',
    role: 'Co-Founder & Full-Stack Developer',
    bullets: [
      'Co-building a YKS study SaaS: Next.js/React flows for planning, Pomodoro, goals, resources, mock-exam tracking and spaced review.',
      'Supabase data and auth with Realtime, migrations/triggers, private storage policies and OAuth/PKCE; PostHog, Sentry, web push and Playwright.',
    ],
  },
  {
    slug: 'parabola',
    role: 'Co-Founder & Full-Stack Developer',
    bullets: [
      'Owned backend/database, then frontend delivery, for a live recommendation-based fashion marketplace; supported launch and the first store onboarding.',
      'Java 17/Spring Boot services (Spring Security, JWT, JPA, PostgreSQL, OpenAPI) incl. a fit engine that scores body-profile compatibility and recommends sizes.',
    ],
  },
  {
    slug: 'sharevibe',
    role: 'Co-Founder & Full-Stack Developer',
    bullets: [
      'Multi-tenant, QR-based cafe social platform: table-specific guest flows, media sharing, campaign rewards and independent owner workspaces.',
      'React/TypeScript + Firebase Auth/Firestore/Storage with generated security rules and role-based access; VDS/Nginx deployment with HTTPS and security headers.',
    ],
  },
  {
    slug: 'avalabs',
    role: 'Co-Founder & Full-Stack Developer',
    bullets: [
      'Led the entire technical build of an AI social-media intelligence product: frontend, backend, database, auth, Instagram integration and AI orchestration.',
      'Multimodal pipeline — FFmpeg frame/audio extraction, Whisper transcription and selectable GPT/Gemini/Claude analysis (Next.js, Prisma, Supabase, Clerk).',
    ],
  },
];

const projectsList = [
  {
    slug: 'canvasflow',
    text: 'Open-source Canvas LMS command centre: AES-256-GCM token encryption, rate-limit-adaptive sync, VAPID web push and 51 unit/integration tests (Next.js, Prisma, Supabase).',
  },
  {
    slug: 'stockflow',
    text: 'NestJS + Prisma/PostgreSQL and Expo React Native: atomic inventory transactions with audit logs, 3-role RBAC, JWT/Passport, Socket.IO real-time and EAS builds.',
  },
  {
    slug: 'quickscript-ai',
    text: 'Node.js/Express + OpenRouter short-form script generator: Hook → Body → CTA output, 6 languages, tone and platform controls.',
  },
  {
    slug: 'hand-tracking',
    text: 'MediaPipe/OpenCV hand tracking (Python prototype, C++20 build) with One Euro filtering, driving OpenGL particle effects.',
  },
];

const additionalNotes = {
  reprecord: 'Telegram workout tracking + progress charts',
  mockwise: 'AI product mockups',
  tricharge: 'React/Node/Supabase/Stripe e-commerce',
  cookly: 'personalised recipe generation',
  lastflame: 'co-op hackathon game',
};

const languageNames = { az: 'Azerbaijani', tr: 'Turkish', en: 'English', ru: 'Russian', hu: 'Hungarian' };

/* ───────────── Markup ───────────── */
const link = (href, text = host(href)) => `<a href="${esc(href)}">${esc(text)}</a>`;
const fontUrl = (pkg, file) => pathToFileURL(join(ROOT, 'node_modules', '@fontsource-variable', pkg, 'files', file)).href;

const contact = [
  ...(isPrivate ? [link(`tel:${phone.replace(/\s+/g, '')}`, phone)] : []),
  link(`mailto:${email}`, email),
  link(`https://${SITE_HOST}/`, SITE_HOST),
  link(profile.links.github),
  link(profile.links.linkedin),
].join('<span class="sep">|</span>');

const entry = (title, w, role, body) => `
  <article class="entry">
    <header>
      <h3>${esc(title)}${role ? ` <span class="role">— ${esc(role)}</span>` : ''}</h3>
      <span class="meta">${w.live ? `${link(w.live)} · ` : w.repo ? `${link(w.repo, 'GitHub')} · ` : ''}${esc(period(w))}</span>
    </header>
    ${body}
  </article>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Farid Mahmudlu — Full-Stack &amp; AI Software Developer — CV</title>
<meta name="author" content="Farid Mahmudlu">
<style>
  @font-face { font-family: 'Archivo CV'; font-weight: 100 900; font-stretch: 62% 125%; src: url('${fontUrl('archivo', 'archivo-latin-wdth-normal.woff2')}') format('woff2'); unicode-range: U+0000-00FF, U+2000-206F, U+2190-21FF; }
  @font-face { font-family: 'Archivo CV'; font-weight: 100 900; font-stretch: 62% 125%; src: url('${fontUrl('archivo', 'archivo-latin-ext-wdth-normal.woff2')}') format('woff2'); unicode-range: U+0100-024F; }
  @page { size: A4; margin: 10mm 12mm 9mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: 'Archivo CV', Arial, sans-serif; font-size: 8.4pt; line-height: 1.34; color: #16171a; }
  a { color: inherit; text-decoration: none; }
  .top { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 2.4mm; border-bottom: 0.6pt solid #16171a; }
  h1 { font-size: 21pt; font-stretch: 112%; font-weight: 650; letter-spacing: -0.03em; line-height: 1; }
  h1 i { display: inline-block; width: 6pt; height: 6pt; background: #ff5a1f; margin-left: 4pt; vertical-align: 3pt; }
  .title { margin-top: 1.4mm; font-size: 9.6pt; font-weight: 520; color: #3c3e43; }
  .contact { margin-top: 2mm; font-size: 7.8pt; color: #3c3e43; }
  .contact a { white-space: nowrap; }
  .sep { color: #b4b6ba; margin: 0 3.5pt; }
  .summary { margin-top: 2.4mm; font-size: 8.7pt; color: #26282c; }
  section { margin-top: 2.7mm; }
  h2 { display: flex; align-items: center; gap: 5pt; font-size: 8pt; font-weight: 650; letter-spacing: 0.12em; text-transform: uppercase; color: #16171a; padding-bottom: 1mm; margin-bottom: 1.6mm; border-bottom: 0.4pt solid #d5d6d9; }
  h2::before { content: ''; width: 4.5pt; height: 4.5pt; background: #ff5a1f; flex: none; }
  .entry { margin-bottom: 1.7mm; break-inside: avoid; }
  .entry header { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
  h3 { font-size: 9.1pt; font-weight: 650; }
  .role { font-weight: 450; color: #3c3e43; }
  .meta { font-size: 7.8pt; color: #5b5d62; white-space: nowrap; }
  ul { margin-top: 0.6mm; padding-left: 9pt; }
  li { margin-top: 0.35mm; }
  li::marker { color: #ff5a1f; }
  .project p { margin-top: 0.4mm; color: #26282c; }
  .grid { display: grid; grid-template-columns: 30mm 1fr; row-gap: 0.9mm; column-gap: 4mm; }
  .grid dt { font-weight: 650; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
  .muted { color: #5b5d62; }
</style>
</head>
<body>
  <div class="top">
    <div>
      <h1>${esc(profile.name)}<i></i></h1>
      <p class="title">Full-Stack &amp; AI Software Developer<span class="sep">|</span>Computer Science BSc @ ELTE<span class="sep">|</span>${esc(`${profile.location.city}, ${profile.location.country}`)}</p>
      <p class="contact">${contact}</p>
    </div>
  </div>

  <p class="summary">Product-focused Computer Science student who founded one and co-founded four software products in 2026, building each end-to-end — data models, authentication and backend architecture, web and mobile interfaces, AI integrations and production deployment.</p>

  <section>
    <h2>Founding &amp; engineering experience</h2>
    ${experience
      .map((e) => {
        const w = byslug[e.slug];
        return entry(w.name, w, e.role, `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`);
      })
      .join('')}
  </section>

  <section>
    <h2>Selected technical projects</h2>
    ${projectsList
      .map((p) => {
        const w = byslug[p.slug];
        return `<div class="project">${entry(w.name, w, '', `<p>${esc(p.text)}</p>`)}</div>`;
      })
      .join('')}
    <p class="muted"><strong>Additional:</strong> ${additionalWork.map((a) => `${esc(a.name)} — ${esc(additionalNotes[a.key])}`).join('<span class="sep">|</span>')}</p>
  </section>

  <section>
    <h2>Technical skills</h2>
    <dl class="grid">
      <dt>Languages</dt><dd>${esc(skills.languages.join(', '))}</dd>
      <dt>Frontend / Mobile</dt><dd>${esc(skills.frontend.join(', '))}</dd>
      <dt>Backend / Data</dt><dd>${esc(skills.backend.join(', '))}</dd>
      <dt>AI / Systems</dt><dd>${esc(skills.ai.join(', '))}</dd>
    </dl>
  </section>

  <div class="two">
    <section>
      <h2>Education</h2>
      <p><strong>${esc(profile.education.school)}</strong></p>
      <p>${esc(profile.education.degree)} <span class="muted">· ${profile.education.start} – expected ${profile.education.expectedEnd}</span></p>
    </section>
    <section>
      <h2>Certification &amp; languages</h2>
      <p>${profile.certifications.map((c) => `<strong>${esc(c.name)}</strong> — ${esc(c.issuer)}, ${esc(month(c.date))}`).join('<br>')}</p>
      <p>${profile.spokenLanguages.map((l) => `${languageNames[l.code]} (${l.level === 'native' ? 'Native' : l.level})`).join('<span class="sep">|</span>')}</p>
    </section>
  </div>
</body>
</html>`;

/* ───────────── Render ───────────── */
const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = chromeCandidates.find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome/Edge not found — set CHROME_PATH.');

const workDir = join(tmpdir(), `cv-${process.pid}`);
mkdirSync(workDir, { recursive: true });
const htmlFile = join(workDir, 'cv.html');
writeFileSync(htmlFile, html, 'utf8');
mkdirSync(dirname(output), { recursive: true });

try {
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--allow-file-access-from-files',
      `--user-data-dir=${join(workDir, 'profile')}`,
      '--no-pdf-header-footer',
      '--virtual-time-budget=4000',
      `--print-to-pdf=${output}`,
      pathToFileURL(htmlFile).href,
    ],
    { stdio: 'ignore' },
  );
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

if (!existsSync(output)) throw new Error('PDF was not produced.');
console.log(`CV written: ${output}${isPrivate ? ' (private, includes phone)' : ' (public, no phone)'}`);
