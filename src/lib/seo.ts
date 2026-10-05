import { LOCALES, LOCALE_META, type Locale } from '../i18n/config';
import { t } from '../i18n';
import { pathFor, pageKey, type PageRef } from '../i18n/routes';
import { SITE_URL, profile, skills } from '../data/profile';
import { products, type WorkItem } from '../data/work';

export const abs = (path: string) => new URL(path, SITE_URL).href;
export const ogImageFor = (page: PageRef, locale: Locale) => abs(`/og/${locale}/${pageKey(page)}.png`);

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLd = Record<string, unknown>;

const LANGUAGE_NAMES_EN: Record<string, string> = {
  az: 'Azerbaijani',
  tr: 'Turkish',
  en: 'English',
  ru: 'Russian',
  hu: 'Hungarian',
};

export function personNode(locale: Locale): JsonLd {
  const d = t(locale);
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    alternateName: 'Fərid Mahmudlu',
    givenName: profile.givenName,
    familyName: profile.familyName,
    url: `${SITE_URL}/`,
    image: abs('/og/en/home.png'),
    jobTitle: d.meta.jobTitle,
    description: d.faq.items[0]?.a,
    homeLocation: {
      '@type': 'Place',
      name: `${profile.location.city}, ${profile.location.country}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.location.city,
        addressCountry: profile.location.countryCode,
      },
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Eötvös Loránd University',
      alternateName: 'ELTE',
      url: profile.education.schoolUrl,
      sameAs: profile.education.schoolWiki,
    },
    hasCredential: profile.certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      dateCreated: c.date,
    })),
    knowsAbout: [
      'Full-stack web development',
      'Mobile app development',
      'Artificial intelligence integration',
      'Software architecture',
      'Authentication and authorization',
      'Database design',
      ...skills.languages,
      ...skills.frontend,
      ...skills.backend,
      ...skills.ai,
    ],
    knowsLanguage: profile.spokenLanguages.map((l) => ({
      '@type': 'Language',
      name: LANGUAGE_NAMES_EN[l.code],
      alternateName: l.code,
    })),
    sameAs: [profile.links.github, profile.links.linkedin],
  };
}

export function websiteNode(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: profile.name,
    description: t('en').meta.homeDescription,
    inLanguage: LOCALES.map((l) => LOCALE_META[l].tag),
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
    copyrightHolder: { '@id': PERSON_ID },
  };
}

function organizationNodes(locale: Locale): JsonLd[] {
  const d = t(locale);
  return products.map((p) => ({
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org-${p.slug}`,
    name: p.name,
    description: d.work.summaries[p.slug],
    ...(p.live ? { url: p.live } : {}),
    foundingDate: p.start,
    founder: { '@id': PERSON_ID },
  }));
}

interface PageNodeInput {
  page: PageRef;
  locale: Locale;
  title: string;
  description: string;
  modified: string;
}

function webPageNode({ page, locale, title, description, modified }: PageNodeInput, type: string): JsonLd {
  const url = abs(pathFor(page, locale));
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: LOCALE_META[locale].tag,
    isPartOf: { '@id': WEBSITE_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: ogImageFor(page, locale), width: 1200, height: 630 },
    dateModified: modified,
  };
}

function breadcrumbs(locale: Locale, trail: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
    inLanguage: LOCALE_META[locale].tag,
  };
}

export function homeGraph(input: Omit<PageNodeInput, 'page'>): JsonLd {
  const page: PageRef = { type: 'home' };
  const d = t(input.locale);
  const pageNode = webPageNode({ ...input, page }, 'ProfilePage');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...pageNode, mainEntity: { '@id': PERSON_ID }, about: { '@id': PERSON_ID }, dateCreated: '2026-10-05' },
      personNode(input.locale),
      websiteNode(),
      ...organizationNodes(input.locale),
      {
        '@type': 'FAQPage',
        '@id': `${pageNode.url as string}#faq`,
        inLanguage: LOCALE_META[input.locale].tag,
        isPartOf: { '@id': pageNode['@id'] },
        mainEntity: d.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

export function workGraph(input: Omit<PageNodeInput, 'page'>, item: WorkItem): JsonLd {
  const page: PageRef = { type: 'work', slug: item.slug };
  const d = t(input.locale);
  const pageNode = webPageNode({ ...input, page }, 'WebPage');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...pageNode,
        about: { '@id': `${pageNode.url as string}#work` },
        author: { '@id': PERSON_ID },
        breadcrumb: breadcrumbs(input.locale, [
          { name: profile.name, path: pathFor({ type: 'home' }, input.locale) },
          { name: d.case.work, path: `${pathFor({ type: 'home' }, input.locale)}#work` },
          { name: item.name, path: pathFor(page, input.locale) },
        ]),
      },
      {
        '@type': 'CreativeWork',
        '@id': `${pageNode.url as string}#work`,
        additionalType: `https://schema.org/${item.schemaType}`,
        name: item.name,
        description: d.work.summaries[item.slug],
        creator: { '@id': PERSON_ID },
        dateCreated: item.start,
        keywords: item.stack.join(', '),
        ...(item.live ? { url: item.live } : {}),
        ...(item.repo ? { sameAs: item.repo } : {}),
        ...(item.kind === 'product' ? { producer: { '@id': `${SITE_URL}/#org-${item.slug}` } } : {}),
      },
      personNode(input.locale),
      websiteNode(),
    ],
  };
}

export function legalGraph(input: PageNodeInput): JsonLd {
  const pageNode = webPageNode(input, 'WebPage');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...pageNode,
        author: { '@id': PERSON_ID },
        breadcrumb: breadcrumbs(input.locale, [
          { name: profile.name, path: pathFor({ type: 'home' }, input.locale) },
          { name: input.title, path: pathFor(input.page, input.locale) },
        ]),
      },
      websiteNode(),
      { '@type': 'Person', '@id': PERSON_ID, name: profile.name, url: `${SITE_URL}/` },
    ],
  };
}

/** Serialise JSON-LD safely for embedding inside a <script> element. */
export const serializeJsonLd = (data: JsonLd) =>
  JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
