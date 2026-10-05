import { DEFAULT_LOCALE, LOCALES, type Locale } from './config';
import { work } from '../data/work';

/**
 * Route table. Every public HTML page is declared here once, with a localised
 * slug per language. Canonicals, hreflang alternates, the sitemap and the
 * language switcher are all derived from this table, so they can never drift.
 */
export const LEGAL_PAGES = ['privacy', 'legal-notice', 'terms', 'accessibility', 'security'] as const;
export type LegalId = (typeof LEGAL_PAGES)[number];

export type PageRef =
  | { type: 'home' }
  | { type: 'work'; slug: string }
  | { type: 'legal'; id: LegalId };

const WORK_SEGMENT: Record<Locale, string> = { en: 'work', az: 'layiheler', hu: 'projektek' };

const LEGAL_SLUGS: Record<LegalId, Record<Locale, string>> = {
  privacy: { en: 'privacy', az: 'mexfilik', hu: 'adatvedelem' },
  'legal-notice': { en: 'legal-notice', az: 'huquqi-melumat', hu: 'impresszum' },
  terms: { en: 'terms', az: 'istifade-sertleri', hu: 'felhasznalasi-feltetelek' },
  accessibility: { en: 'accessibility', az: 'elcatanliq', hu: 'akadalymentesseg' },
  security: { en: 'security', az: 'tehlukesizlik', hu: 'biztonsag' },
};

const segmentsFor = (page: PageRef, locale: Locale): string[] => {
  switch (page.type) {
    case 'home':
      return [];
    case 'work':
      return [WORK_SEGMENT[locale], page.slug];
    case 'legal':
      return [LEGAL_SLUGS[page.id][locale]];
  }
};

/** Root-relative path with trailing slash, e.g. `/az/layiheler/calisiyo/`. */
export function pathFor(page: PageRef, locale: Locale): string {
  const parts = [...(locale === DEFAULT_LOCALE ? [] : [locale]), ...segmentsFor(page, locale)];
  return parts.length ? `/${parts.join('/')}/` : '/';
}

export const homePath = (locale: Locale, hash?: string) =>
  `${pathFor({ type: 'home' }, locale)}${hash ? `#${hash}` : ''}`;

export function alternatesFor(page: PageRef) {
  return LOCALES.map((locale) => ({ locale, path: pathFor(page, locale) }));
}

export function allPages(): PageRef[] {
  return [
    { type: 'home' },
    ...work.map((w) => ({ type: 'work', slug: w.slug }) as const),
    ...LEGAL_PAGES.map((id) => ({ type: 'legal', id }) as const),
  ];
}

export const pageKey = (page: PageRef) =>
  page.type === 'home' ? 'home' : page.type === 'work' ? `work/${page.slug}` : `legal/${page.id}`;
