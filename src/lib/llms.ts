import { getCollection } from 'astro:content';
import { t, formatPeriod } from '../i18n';
import { LOCALES, LOCALE_META } from '../i18n/config';
import { homePath, LEGAL_PAGES, pathFor } from '../i18n/routes';
import { SITE_URL, profile, skills } from '../data/profile';
import { additionalWork, products, projects, roleKey, work } from '../data/work';
import type { Layer } from '../data/work';
import { abs } from './seo';
import { BUILD_DATE } from './build';

const LAYERS: Layer[] = ['data', 'auth', 'backend', 'interface', 'ai', 'production'];
const LANGUAGE_NAMES: Record<string, string> = {
  az: 'Azerbaijani',
  tr: 'Turkish',
  en: 'English',
  ru: 'Russian',
  hu: 'Hungarian',
};

function facts() {
  const d = t('en');
  return [
    `- Name: ${profile.name} (Azerbaijani spelling: Fərid Mahmudlu)`,
    `- Role: ${d.meta.jobTitle}`,
    `- Based in: ${profile.location.city}, ${profile.location.country}`,
    `- Education: ${profile.education.degree}, ${profile.education.school}, ${profile.education.start} – expected ${profile.education.expectedEnd}`,
    `- Founded in 2026: ${products.filter((p) => p.role === 'founder').map((p) => p.name).join(', ')}`,
    `- Co-founded in 2026: ${products.filter((p) => p.role !== 'founder').map((p) => p.name).join(', ')}`,
    `- Certification: ${profile.certifications.map((c) => `${c.name} (${c.issuer}, ${c.date})`).join('; ')}`,
    `- Spoken languages: ${profile.spokenLanguages.map((l) => `${LANGUAGE_NAMES[l.code]} (${l.level === 'native' ? 'native' : l.level})`).join(', ')}`,
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    `- Contact: email address in the contact section — ${SITE_URL}/#contact`,
  ].join('\n');
}

export function llmsIndex(): string {
  const d = t('en');
  const line = (name: string, url: string, note: string) => `- [${name}](${url}): ${note}`;
  return [
    `# ${profile.name}`,
    '',
    `> ${d.faq.items[0]!.a}`,
    '',
    facts(),
    '',
    '## Profile',
    '',
    ...LOCALES.map((l) =>
      line(`Homepage (${LOCALE_META[l].name})`, abs(homePath(l)), l === 'en' ? 'story of the six layers he builds, work index, timeline, FAQ and contact' : `same content in ${LOCALE_META[l].name}`),
    ),
    '',
    '## Case studies',
    '',
    ...work.map((w) => line(w.name, abs(pathFor({ type: 'work', slug: w.slug }, 'en')), `${d.work.summaries[w.slug]} (${formatPeriod(w.start, w.end, 'en')})`)),
    '',
    '## Optional',
    '',
    line('Full text for language models', `${SITE_URL}/llms-full.txt`, 'every page of the site as Markdown in one file'),
    ...LEGAL_PAGES.map((id) => line(d.footer.legal[id], abs(pathFor({ type: 'legal', id }, 'en')), 'legal information')),
    '',
  ].join('\n');
}

export async function llmsFull(): Promise<string> {
  const d = t('en');
  const entries = await getCollection('work', (e) => e.id.startsWith('en/'));
  const bodies = new Map(entries.map((e) => [e.id.slice(3), e]));
  const out: string[] = [
    `# ${profile.name} — ${d.meta.jobTitle}`,
    '',
    `Source: ${SITE_URL}/ · Generated: ${BUILD_DATE} · Languages available: English, Azerbaijani (${SITE_URL}/az/), Hungarian (${SITE_URL}/hu/)`,
    '',
    `> ${d.faq.items[0]!.a}`,
    '',
    '## Key facts',
    '',
    facts(),
    '',
    '## Approach',
    '',
    d.hero.statement,
    '',
    ...d.origin.body,
    '',
  ];

  for (const key of LAYERS) {
    const layer = d.layers[key];
    out.push(`## ${layer.index} — ${layer.name}: ${layer.title}`, '', layer.lead, '');
    for (const e of layer.evidence) out.push(`- **${e.project}:** ${e.text}`);
    out.push('', ...layer.spec.map(([k, v]) => `- ${k}: ${v}`), '');
  }

  out.push('## Work', '');
  for (const group of [
    { label: d.work.productsLabel, items: products },
    { label: d.work.projectsLabel, items: projects },
  ]) {
    out.push(`### ${group.label}`, '');
    for (const w of group.items) {
      const entry = bodies.get(w.slug);
      out.push(
        `#### ${w.name}`,
        '',
        `- Summary: ${d.work.summaries[w.slug]}`,
        `- Role: ${d.work.roles[roleKey(w)]}`,
        `- Period: ${formatPeriod(w.start, w.end, 'en')}`,
        `- Stack: ${w.stack.join(', ')}`,
        ...(w.live ? [`- Live: ${w.live}`] : []),
        ...(w.repo ? [`- Code: ${w.repo}`] : []),
        `- Case study: ${abs(pathFor({ type: 'work', slug: w.slug }, 'en'))}`,
        '',
        entry?.data.headline ?? '',
        '',
        (entry?.body ?? '').replace(/^## /gm, '##### ').trim(),
        '',
      );
    }
  }
  out.push(`### ${d.work.moreLabel}`, '');
  for (const a of additionalWork) out.push(`- **${a.name}** — ${d.work.additional[a.key]} (${a.stack.join(', ')}) — ${a.repo}`);
  out.push('');

  out.push('## Toolkit', '');
  for (const [group, list] of Object.entries(skills)) {
    out.push(`- ${d.toolkit.groups[group as keyof typeof skills]}: ${list.join(', ')}`);
  }
  out.push('', '## Timeline', '');
  for (const e of d.log.entries) out.push(`- ${e.date}: ${e.text}`);
  out.push('', '## Frequently asked questions', '');
  for (const item of d.faq.items) out.push(`### ${item.q}`, '', item.a, '');
  out.push('## Contact', '', d.contact.lead, '', `- Email: see ${SITE_URL}/#contact`, `- LinkedIn: ${profile.links.linkedin}`, `- GitHub: ${profile.links.github}`, '');
  return out.join('\n');
}
