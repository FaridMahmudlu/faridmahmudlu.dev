import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { DEFAULT_LOCALE, LOCALES, LOCALE_META } from '../i18n/config';
import { allPages, alternatesFor, pathFor } from '../i18n/routes';
import { abs } from '../lib/seo';
import { BUILD_DATE } from '../lib/build';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  const legal = await getCollection('legal');
  const legalUpdated = new Map(legal.map((e) => [e.id, e.data.updated]));

  const urls = allPages().flatMap((page) => {
    const links = [
      ...alternatesFor(page).map(
        (alt) => `    <xhtml:link rel="alternate" hreflang="${LOCALE_META[alt.locale].tag}" href="${esc(abs(alt.path))}"/>`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(pathFor(page, DEFAULT_LOCALE)))}"/>`,
    ].join('\n');
    return LOCALES.map((locale) => {
      const lastmod = page.type === 'legal' ? (legalUpdated.get(`${locale}/${page.id}`) ?? BUILD_DATE) : BUILD_DATE;
      const priority = page.type === 'home' ? '1.0' : page.type === 'work' ? '0.8' : '0.3';
      return [
        '  <url>',
        `    <loc>${esc(abs(pathFor(page, locale)))}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <priority>${priority}</priority>`,
        links,
        '  </url>',
      ].join('\n');
    });
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
