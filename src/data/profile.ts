/**
 * Single source of truth for personal facts. Everything that appears in the
 * UI, JSON-LD, llms.txt and legal pages is derived from here, so the entity
 * description stays identical for search engines and AI answer engines.
 */
export const SITE_URL = 'https://faridmahmudlu.dev';
export const SITE_HOST = 'faridmahmudlu.dev';

export const profile = {
  name: 'Farid Mahmudlu',
  givenName: 'Farid',
  familyName: 'Mahmudlu',
  initials: 'FM',
  /**
   * Split so the address never appears verbatim in the static HTML.
   * Delivered by Cloudflare Email Routing (see README → DNS hardening).
   */
  email: { user: 'hello', domain: 'faridmahmudlu.dev' },
  location: {
    city: 'Budapest',
    country: 'Hungary',
    countryCode: 'HU',
    timeZone: 'Europe/Budapest',
    lat: 47.4979,
    lng: 19.0402,
  },
  links: {
    github: 'https://github.com/FaridMahmudlu',
    linkedin: 'https://www.linkedin.com/in/farid-mahmudluu/',
  },
  githubHandle: 'FaridMahmudlu',
  linkedinHandle: 'farid-mahmudluu',
  education: {
    school: 'Eötvös Loránd University (ELTE)',
    schoolShort: 'ELTE',
    schoolUrl: 'https://www.elte.hu/en/',
    schoolWiki: 'https://en.wikipedia.org/wiki/E%C3%B6tv%C3%B6s_Lor%C3%A1nd_University',
    degree: 'BSc in Computer Science',
    start: 2025,
    expectedEnd: 2028,
  },
  certifications: [{ name: 'Google AI Essentials', issuer: 'Google', date: '2026-07' }],
  spokenLanguages: [
    { code: 'az', level: 'native' },
    { code: 'tr', level: 'C1' },
    { code: 'en', level: 'B2' },
    { code: 'ru', level: 'A1' },
    { code: 'hu', level: 'A1' },
  ],
  cv: '/cv/farid-mahmudlu-cv.pdf',
} as const;

export const emailAddress = () => `${profile.email.user}@${profile.email.domain}`;

export const skills = {
  languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Dart', 'C', 'C++', 'C#'],
  frontend: ['React', 'Next.js', 'React Native', 'Expo', 'Flutter', 'Vite', 'Tailwind CSS', 'Redux Toolkit'],
  backend: [
    'Node.js',
    'Express',
    'NestJS',
    'Spring Boot',
    'PostgreSQL',
    'Supabase',
    'Prisma',
    'Firebase / Firestore',
    'JPA',
    'pgTAP',
  ],
  ai: [
    'OpenAI',
    'Whisper',
    'Gemini',
    'Claude',
    'OpenRouter',
    'FFmpeg',
    'MediaPipe',
    'OpenCV',
    'Socket.IO',
    'JWT / OAuth',
    'Docker',
    'Playwright',
    'Sentry',
    'PostHog',
  ],
} as const;

export type SkillGroup = keyof typeof skills;
