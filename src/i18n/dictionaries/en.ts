export const en = {
  meta: {
    siteName: 'Farid Mahmudlu',
    homeTitle: 'Farid Mahmudlu — Full-Stack & AI Software Developer, Budapest',
    homeDescription:
      'Farid Mahmudlu is a full-stack & AI software developer in Budapest and a CS student at ELTE — founder of Hushplan and co-founder of four software products.',
    titleSuffix: ' — Farid Mahmudlu',
    jobTitle: 'Full-Stack & AI Software Developer',
  },
  a11y: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close menu',
    mainNav: 'Main navigation',
    language: 'Choose language',
    breadcrumb: 'Breadcrumb',
    external: '(opens in a new tab)',
    pauseMotion: 'Pause motion',
    playMotion: 'Resume motion',
    sections: 'Page sections',
    home: 'Farid Mahmudlu — home',
  },
  nav: { process: 'Process', work: 'Work', log: 'Log', faq: 'FAQ', contact: 'Contact' },
  hero: {
    kicker: 'Full-stack & AI software developer',
    statement:
      'I build software products end-to-end — from the data model and auth to the interface, the AI pipeline and the production deploy.',
    meta: [
      ['Based in', 'Budapest, HU'],
      ['Studying', 'CS BSc · ELTE'],
      ['Shipped', '5 products in 2026'],
      ['Now', 'Hushplan · Calisiyo'],
    ],
    scroll: 'Scroll — follow the signal',
  },
  origin: {
    kicker: 'Origin',
    title: 'One person, the whole request path.',
    body: [
      'I study Computer Science at Eötvös Loránd University in Budapest. In 2026 I founded or co-founded five software products, and in each of them I owned the parts most teams split across several people: schema, auth, services, interface, AI integrations and the deploy.',
      'Every request a user makes travels through all of those layers. Follow the signal down this page — it passes through each one.',
    ],
    stats: [
      { value: '5', label: 'products founded or co-founded in 2026' },
      { value: '6', label: 'layers owned end-to-end' },
      { value: '8', label: 'programming languages' },
      { value: '5', label: 'spoken languages' },
    ],
  },
  layers: {
    data: {
      index: 'L01',
      name: 'Data',
      title: 'Schemas before screens.',
      lead: 'Most product bugs are data bugs that surface late. I start with the model — constraints, transactions and migrations that make invalid states impossible to store.',
      evidence: [
        {
          project: 'StockFlow',
          text: 'Inventory mutations run in isolated PostgreSQL transactions, and every stock change writes its audit-log entry inside the same transaction.',
        },
        {
          project: 'Calisiyo',
          text: 'Supabase schema with migrations, triggers and Realtime behind study plans, goals, mock-exam tracking and spaced review.',
        },
        {
          project: 'Parabola',
          text: 'JPA / PostgreSQL domain model for users, body profiles and garments that feeds the size-recommendation engine.',
        },
      ],
      spec: [
        ['Engines', 'PostgreSQL · Supabase · Firestore'],
        ['Access', 'Prisma · JPA'],
        ['Patterns', 'Atomic transactions · audit logs · migrations · triggers'],
      ],
    },
    auth: {
      index: 'L02',
      name: 'Auth & Security',
      title: 'Trust is a layer, not a feature.',
      lead: 'Access rules belong where the data lives, not only in the UI. I enforce them in the database and the API first, then make the client reflect them.',
      evidence: [
        {
          project: 'Hushplan',
          text: 'Private spending limits live in a Postgres schema the API never exposes, reached only through membership-checked functions — every privacy rule covered by pgTAP tests.',
        },
        {
          project: 'ShareVibe',
          text: 'Firestore and Storage security rules generated from a single access list, with separate owner and admin roles per cafe workspace.',
        },
        {
          project: 'StockFlow',
          text: 'JWT / Passport authentication, bcrypt hashing and three-role RBAC — admin, manager, staff — across API and UI.',
        },
        {
          project: 'CanvasFlow',
          text: 'Third-party API tokens encrypted at rest with AES-256-GCM and never sent to the browser.',
        },
      ],
      spec: [
        ['Identity', 'OAuth 2.0 / PKCE · JWT · Clerk · Auth.js · Firebase Auth'],
        ['Authorization', 'RLS · RBAC · security rules · storage policies · Spring Security'],
        ['Hardening', 'AES-256-GCM · bcrypt · rate limiting · security headers'],
      ],
    },
    backend: {
      index: 'L03',
      name: 'Backend',
      title: 'Boring services, on purpose.',
      lead: 'Predictable APIs with explicit contracts, real-time where it actually matters, and business logic that is easy to test and easy to reason about.',
      evidence: [
        {
          project: 'Parabola',
          text: 'Java 17 / Spring Boot services documented with OpenAPI, including a fit engine that scores body-profile compatibility and recommends a garment size.',
        },
        {
          project: 'StockFlow',
          text: 'NestJS backend that broadcasts stock activity to every connected client in real time over Socket.IO.',
        },
        {
          project: 'CanvasFlow',
          text: 'Sync engine that reads Canvas LMS rate-limit headers and adapts its polling interval to stay under quota, with a time-budget guard for serverless limits.',
        },
      ],
      spec: [
        ['Runtimes', 'Node.js · Java 17 · Python'],
        ['Frameworks', 'NestJS · Express · Spring Boot'],
        ['Interfaces', 'REST · OpenAPI · Socket.IO · webhooks'],
      ],
    },
    interface: {
      index: 'L04',
      name: 'Interface',
      title: 'Where the system meets a person.',
      lead: 'The interface is the only layer users ever see. I build it in React, Next.js and React Native — fast, accessible, and honest about loading and error states.',
      evidence: [
        {
          project: 'Calisiyo',
          text: 'Next.js flows for study planning, Pomodoro, goals, resources, mock-exam tracking and spaced review.',
        },
        {
          project: 'ShareVibe',
          text: 'QR-based, table-specific guest flows where guests upload and react to media and unlock campaign rewards.',
        },
        {
          project: 'StockFlow',
          text: 'Expo / React Native app with swipe navigation and memoised lists built for 1,000+ items.',
        },
        {
          project: 'Hushplan',
          text: 'Flutter app in seven languages, tested on six screen sizes at two text scales so no screen ever overflows.',
        },
      ],
      spec: [
        ['Web', 'React · Next.js · Vite · Tailwind CSS'],
        ['Mobile', 'Flutter · React Native · Expo'],
        ['State', 'Redux Toolkit · Zustand'],
      ],
    },
    ai: {
      index: 'L05',
      name: 'Intelligence',
      title: 'Models are components, not magic.',
      lead: 'I treat AI models like any other dependency: typed inputs, structured outputs, swappable providers — and a pipeline around them that I can actually debug.',
      evidence: [
        {
          project: 'Avalabs',
          text: 'Multimodal pipeline: FFmpeg extracts frames and audio, Whisper transcribes, and GPT, Gemini or Claude analyse the result with Instagram context.',
        },
        {
          project: 'Hand Tracking',
          text: 'Low-latency MediaPipe + OpenCV hand tracking with One Euro filtering, driving gesture-based OpenGL particles — the ancestor of the particles on this page.',
        },
        {
          project: 'QuickScript AI',
          text: 'Structured short-form video scripts in six languages, with tone and platform controls.',
        },
      ],
      spec: [
        ['Models', 'OpenAI · Whisper · Gemini · Claude · OpenRouter'],
        ['Media & vision', 'FFmpeg · MediaPipe · OpenCV'],
        ['Patterns', 'Structured outputs · provider switching · multimodal pipelines'],
      ],
    },
    production: {
      index: 'L06',
      name: 'Production',
      title: 'Shipped is a feature.',
      lead: 'Code that is not deployed does not exist yet. I own the last mile: hosting, HTTPS, caching, monitoring and the tests that guard every release.',
      evidence: [
        {
          project: 'ShareVibe',
          text: 'Production deployment on a VDS behind Nginx, with HTTPS, caching and security headers.',
        },
        {
          project: 'Calisiyo',
          text: 'PostHog analytics, Sentry error monitoring, web push and Playwright end-to-end validation.',
        },
        {
          project: 'Parabola',
          text: 'Supported the public launch and the team’s first clothing-store onboarding.',
        },
        {
          project: 'Hushplan',
          text: 'Version 1.0 in Google Play internal testing, CI on every push and daily encrypted database backups.',
        },
      ],
      spec: [
        ['Hosting', 'Vercel · VDS / Nginx · Docker'],
        ['Observability', 'Sentry · PostHog'],
        ['Quality', 'Playwright · unit & integration tests'],
      ],
    },
  },
  work: {
    kicker: 'Shipped',
    title: 'Products & projects',
    lead: 'Five products founded or co-founded in 2026 — each built end-to-end — and the projects around them.',
    productsLabel: 'Founded & co-founded products',
    projectsLabel: 'Selected projects',
    moreLabel: 'More experiments',
    present: 'present',
    caseStudy: 'Case study',
    live: 'Live',
    code: 'Code',
    roles: {
      founder: 'Founder & full-stack developer',
      product: 'Co-founder & full-stack developer',
      project: 'Full-stack developer',
    },
    summaries: {
      hushplan: 'Group plans that fit everyone’s budget, with private spending limits.',
      calisiyo: 'Study-planning SaaS for Turkey’s YKS university entrance exam.',
      parabola: 'Recommendation-based fashion marketplace with a size-fit engine.',
      sharevibe: 'Multi-tenant, QR-based social platform for cafes.',
      avalabs: 'AI social-media intelligence for Instagram content.',
      stockflow: 'Inventory system with atomic transactions and a mobile app.',
      canvasflow: 'Encrypted, near-real-time Canvas LMS sync for students.',
      'quickscript-ai': 'AI script generator for TikTok, Reels and Shorts.',
      'hand-tracking': 'Real-time hand tracking driving GPU particle effects.',
    } as Record<string, string>,
    additional: {
      reprecord: 'Telegram bot for workout logging and progress charts.',
      mockwise: 'AI-generated product mockups.',
      tricharge: 'E-commerce platform with Stripe payments and JWT auth.',
      cookly: 'Personalised recipe generation with AI.',
      lastflame: 'Cooperative escape game for 2–4 players, built at a hackathon.',
    },
  },
  toolkit: {
    kicker: 'Toolkit',
    title: 'The stack, all of it.',
    groups: {
      languages: 'Languages',
      frontend: 'Frontend / Mobile',
      backend: 'Backend / Data',
      ai: 'AI / Systems',
    },
  },
  log: {
    kicker: 'Log',
    title: 'Timeline',
    entries: [
      { date: '2026-10', text: 'Released Hushplan 1.0 to Google Play internal testing.' },
      { date: '2026-09', text: 'Founded Hushplan, a privacy-first group-planning app. Started CanvasFlow.' },
      { date: '2026-08', text: 'Co-founded Calisiyo, a study-planning SaaS for the YKS exam.' },
      { date: '2026-07', text: 'Co-founded Parabola. Started StockFlow. Earned Google AI Essentials.' },
      { date: '2026-04', text: 'Co-founded ShareVibe, a QR-based social platform for cafes.' },
      { date: '2026-02', text: 'Co-founded Avalabs and led its entire technical implementation.' },
      { date: '2025-12', text: 'Built QuickScript AI, a multilingual short-form script generator.' },
      { date: '2025-11', text: 'Built real-time hand tracking with MediaPipe, OpenCV and OpenGL.' },
      { date: '2025', text: 'Started a BSc in Computer Science at ELTE, Budapest.' },
    ],
    educationTitle: 'Education',
    education: 'BSc in Computer Science — Eötvös Loránd University (ELTE)',
    educationPeriod: '2025 — expected 2028',
    certTitle: 'Certification',
    languagesTitle: 'Languages',
    levels: { native: 'Native' } as Record<string, string>,
    languageNames: {
      az: 'Azerbaijani',
      tr: 'Turkish',
      en: 'English',
      ru: 'Russian',
      hu: 'Hungarian',
    } as Record<string, string>,
  },
  faq: {
    kicker: 'FAQ',
    title: 'Quick answers',
    items: [
      {
        q: 'Who is Farid Mahmudlu?',
        a: 'Farid Mahmudlu is a full-stack and AI software developer based in Budapest, Hungary, and a Computer Science BSc student at Eötvös Loránd University (ELTE), expected to graduate in 2028. In 2026 he founded Hushplan and co-founded four software products — Avalabs, ShareVibe, Parabola and Calisiyo — and built each of them end-to-end.',
      },
      {
        q: 'What does Farid build?',
        a: 'Web and mobile products from the database up: data models and authentication, backend services, React, Next.js, React Native and Flutter interfaces, AI pipelines using models such as GPT, Gemini, Claude and Whisper, and production deployment with monitoring.',
      },
      {
        q: 'Which technologies does he work with?',
        a: 'Mainly TypeScript, React, Next.js, React Native, Flutter, Node.js, NestJS, Spring Boot, PostgreSQL, Supabase, Prisma and Firebase. For AI and media: OpenAI, Whisper, Gemini, Claude, OpenRouter, FFmpeg, MediaPipe and OpenCV.',
      },
      {
        q: 'Which products has he founded?',
        a: 'He founded Hushplan (privacy-first group planning, 2026 — ongoing) and co-founded Avalabs (AI social-media intelligence, 2026), ShareVibe (QR-based social platform for cafes, 2026), Parabola (recommendation-based fashion marketplace, 2026) and Calisiyo (study-planning SaaS for the YKS exam, 2026 — ongoing).',
      },
      {
        q: 'Where is he based, and which languages does he speak?',
        a: 'He is based in Budapest, Hungary. He speaks Azerbaijani (native), Turkish (C1), English (B2), Russian (A1) and Hungarian (A1).',
      },
      {
        q: 'How can I get in touch?',
        a: 'By email — the address is in the contact section of this page — or via LinkedIn. His public code is on GitHub.',
      },
    ],
  },
  contact: {
    kicker: 'Contact',
    title: 'Open a channel.',
    lead: 'Roles, collaborations, or a product that needs one person to own it end-to-end — email is the fastest way to reach me.',
    emailLabel: 'Email',
    copy: 'Copy',
    copied: 'Copied',
    cv: 'Download CV (PDF)',
    elsewhere: 'Elsewhere',
  },
  footer: {
    rights: 'All rights reserved.',
    legalTitle: 'Legal',
    legal: {
      privacy: 'Privacy policy',
      'legal-notice': 'Legal notice',
      terms: 'Terms of use',
      accessibility: 'Accessibility',
      security: 'Security',
    },
    privacyNote: 'No cookies. No ad trackers. No fingerprinting.',
    backToTop: 'Back to top',
  },
  case: {
    work: 'Work',
    founder: 'Founded product',
    product: 'Co-founded product',
    project: 'Project',
    role: 'Role',
    period: 'Period',
    stack: 'Stack',
    links: 'Links',
    next: 'Next',
    all: 'All work',
    layer: 'Primary layer',
  },
  legal: {
    updated: 'Last updated',
    toc: 'On this page',
    back: 'Back to the homepage',
  },
  notFound: {
    title: 'Signal lost.',
    body: 'This page does not exist, or it has moved.',
    home: 'Back to the homepage',
  },
  hud: { signal: 'Signal' },
};

export type Dictionary = typeof en;
