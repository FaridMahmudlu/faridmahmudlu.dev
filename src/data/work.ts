/**
 * Language-independent facts about each piece of work. Localised prose lives
 * in src/content/work/<locale>/<slug>.md and is validated against this list.
 */
export type WorkKind = 'product' | 'project';
export type Layer = 'data' | 'auth' | 'backend' | 'interface' | 'ai' | 'production';

export interface WorkItem {
  slug: string;
  name: string;
  kind: WorkKind;
  /** Overrides the role derived from `kind` (e.g. a product founded alone). */
  role?: 'founder';
  /** ISO year-month. `end: null` means ongoing. */
  start: string;
  end: string | null;
  stack: string[];
  live?: string;
  repo?: string;
  /** Layer whose particle formation represents this work on its case-study page. */
  layer: Layer;
  /** schema.org type that best describes the artefact. */
  schemaType: 'SoftwareApplication' | 'WebApplication' | 'MobileApplication' | 'SoftwareSourceCode';
  applicationCategory?: string;
}

export const work: WorkItem[] = [
  {
    slug: 'hushplan',
    name: 'Hushplan',
    kind: 'product',
    role: 'founder',
    start: '2026-09',
    end: null,
    stack: ['Flutter', 'Dart', 'Riverpod', 'Next.js 16', 'Supabase', 'PostgreSQL / RLS', 'pgTAP', 'Edge Functions', 'FCM', 'Cloudflare Turnstile'],
    live: 'https://hushplan.app/',
    layer: 'auth',
    schemaType: 'MobileApplication',
    applicationCategory: 'LifestyleApplication',
  },
  {
    slug: 'calisiyo',
    name: 'Calisiyo',
    kind: 'product',
    start: '2026-08',
    end: null,
    stack: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'Realtime', 'OAuth / PKCE', 'PostHog', 'Sentry', 'Web Push', 'Playwright'],
    live: 'https://calisiyo.com.tr/',
    layer: 'production',
    schemaType: 'WebApplication',
    applicationCategory: 'EducationalApplication',
  },
  {
    slug: 'parabola',
    name: 'Parabola',
    kind: 'product',
    start: '2026-07',
    end: '2026-08',
    stack: ['Java 17', 'Spring Boot', 'Spring Security', 'JWT', 'JPA', 'PostgreSQL', 'OpenAPI', 'React'],
    live: 'https://parabolafrontend.vercel.app/',
    layer: 'backend',
    schemaType: 'WebApplication',
    applicationCategory: 'ShoppingApplication',
  },
  {
    slug: 'sharevibe',
    name: 'ShareVibe',
    kind: 'product',
    start: '2026-04',
    end: '2026-06',
    stack: ['React', 'TypeScript', 'Vite', 'Firebase Auth', 'Firestore', 'Firebase Storage', 'Security Rules', 'Nginx'],
    live: 'https://share-vibe-fawn.vercel.app/',
    repo: 'https://github.com/FaridMahmudlu/share-vibe',
    layer: 'auth',
    schemaType: 'WebApplication',
    applicationCategory: 'SocialNetworkingApplication',
  },
  {
    slug: 'avalabs',
    name: 'Avalabs',
    kind: 'product',
    start: '2026-02',
    end: '2026-06',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'Clerk', 'FFmpeg', 'Whisper', 'GPT', 'Gemini', 'Claude'],
    live: 'https://avalabs-website-1.vercel.app/',
    layer: 'ai',
    schemaType: 'WebApplication',
    applicationCategory: 'BusinessApplication',
  },
  {
    slug: 'stockflow',
    name: 'StockFlow',
    kind: 'project',
    start: '2026-07',
    end: null,
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'Expo', 'React Native', 'Socket.IO', 'JWT / Passport', 'bcrypt'],
    repo: 'https://github.com/FaridMahmudlu/stockflow',
    layer: 'data',
    schemaType: 'MobileApplication',
    applicationCategory: 'BusinessApplication',
  },
  {
    slug: 'canvasflow',
    name: 'CanvasFlow',
    kind: 'project',
    start: '2026-09',
    end: null,
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Supabase', 'Auth.js', 'AES-256-GCM', 'Web Push'],
    live: 'https://canvas-flow-nine.vercel.app/',
    repo: 'https://github.com/FaridMahmudlu/canvas-flow',
    layer: 'auth',
    schemaType: 'WebApplication',
    applicationCategory: 'EducationalApplication',
  },
  {
    slug: 'quickscript-ai',
    name: 'QuickScript AI',
    kind: 'project',
    start: '2025-12',
    end: '2026-02',
    stack: ['Node.js', 'Express', 'OpenRouter', 'Llama 4', 'Vanilla JS'],
    repo: 'https://github.com/FaridMahmudlu/quickscript-ai',
    layer: 'ai',
    schemaType: 'WebApplication',
    applicationCategory: 'MultimediaApplication',
  },
  {
    slug: 'hand-tracking',
    name: 'Real-Time Hand Tracking',
    kind: 'project',
    start: '2025-11',
    end: '2025-12',
    stack: ['C++20', 'MediaPipe', 'OpenCV', 'OpenGL', 'SDL2', 'Python'],
    repo: 'https://github.com/FaridMahmudlu/Hand-tracking-project',
    layer: 'ai',
    schemaType: 'SoftwareSourceCode',
  },
];

export const workBySlug = (slug: string) => work.find((w) => w.slug === slug);
export const roleKey = (w: WorkItem) => w.role ?? w.kind;
export const products = work.filter((w) => w.kind === 'product');
export const projects = work.filter((w) => w.kind === 'project');

/** Smaller experiments listed without a dedicated page. */
export const additionalWork = [
  { name: 'RepRecord', key: 'reprecord', repo: 'https://github.com/FaridMahmudlu/RepRecord', stack: ['Python', 'Telegram Bot API', 'PostgreSQL', 'Matplotlib'] },
  { name: 'Mockwise', key: 'mockwise', repo: 'https://github.com/FaridMahmudlu/Mockwise', live: 'https://mockwise-pi.vercel.app/', stack: ['TypeScript', 'AI'] },
  { name: 'TriCharge', key: 'tricharge', repo: 'https://github.com/FaridMahmudlu/tricharge-ecommerce', stack: ['React', 'Express', 'Supabase', 'Stripe', 'JWT'] },
  { name: 'Cookly', key: 'cookly', repo: 'https://github.com/FaridMahmudlu/cookly-app', live: 'https://cookly-app-delta.vercel.app/', stack: ['TypeScript', 'AI'] },
  { name: 'Last Flame', key: 'lastflame', repo: 'https://github.com/FaridMahmudlu/last-flame-hackathon', live: 'https://last-flame-hackathon.vercel.app/', stack: ['TypeScript', 'Multiplayer'] },
] as const;

export type AdditionalKey = (typeof additionalWork)[number]['key'];
