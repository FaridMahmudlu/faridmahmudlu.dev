import type { APIRoute, GetStaticPaths } from 'astro';
import { getEntry } from 'astro:content';
import { LOCALES, type Locale } from '../../i18n/config';
import { t } from '../../i18n';
import { allPages, pageKey, type PageRef } from '../../i18n/routes';
import { workBySlug } from '../../data/work';
import { renderOg } from '../../lib/og';

export const getStaticPaths = (() =>
  allPages().flatMap((page) =>
    LOCALES.map((locale) => ({ params: { slug: `${locale}/${pageKey(page)}` }, props: { page, locale } })),
  )) satisfies GetStaticPaths;

const hash = (s: string) => [...s].reduce((a, ch) => (Math.imul(a, 31) + ch.charCodeAt(0)) >>> 0, 7);

export const GET: APIRoute<{ page: PageRef; locale: Locale }> = async ({ props }) => {
  const { page, locale } = props;
  const d = t(locale);
  let kicker = d.meta.jobTitle;
  let title = d.meta.siteName;
  let subtitle = d.hero.statement;

  if (page.type === 'work') {
    const item = workBySlug(page.slug)!;
    const layer = d.layers[item.layer];
    kicker = `${d.work.caseStudy} · ${layer.index} ${layer.name}`;
    title = item.name;
    subtitle = d.work.summaries[item.slug] ?? subtitle;
  } else if (page.type === 'legal') {
    const entry = await getEntry('legal', `${locale}/${page.id}`);
    kicker = d.footer.legalTitle;
    title = entry?.data.title ?? d.footer.legal[page.id];
    subtitle = entry?.data.description ?? subtitle;
  }

  const png = await renderOg({ kicker, title, subtitle, seed: hash(`${locale}/${pageKey(page)}`) });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
