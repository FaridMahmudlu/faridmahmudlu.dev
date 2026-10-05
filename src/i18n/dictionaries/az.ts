import type { Dictionary } from './en';

export const az: Dictionary = {
  meta: {
    siteName: 'Farid Mahmudlu',
    homeTitle: 'Farid Mahmudlu — Full-Stack və AI Proqram Tərtibatçısı, Budapeşt',
    homeDescription:
      'Farid Mahmudlu Budapeştdə full-stack və AI proqram tərtibatçısı, ELTE-də Kompüter Elmləri tələbəsidir — Hushplan-ın təsisçisi və dörd məhsulun həmtəsisçisi.',
    titleSuffix: ' — Farid Mahmudlu',
    jobTitle: 'Full-Stack və AI Proqram Tərtibatçısı',
  },
  a11y: {
    skip: 'Məzmuna keç',
    menu: 'Menyu',
    close: 'Menyunu bağla',
    mainNav: 'Əsas naviqasiya',
    language: 'Dil seçin',
    breadcrumb: 'Naviqasiya yolu',
    external: '(yeni pəncərədə açılır)',
    pauseMotion: 'Animasiyanı dayandır',
    playMotion: 'Animasiyanı davam etdir',
    sections: 'Səhifə bölmələri',
    home: 'Farid Mahmudlu — ana səhifə',
  },
  nav: { process: 'Yanaşma', work: 'İşlər', log: 'Xronologiya', faq: 'Suallar', contact: 'Əlaqə' },
  hero: {
    kicker: 'Full-stack və AI proqram tərtibatçısı',
    statement:
      'Proqram məhsullarını başdan-sona qururam — data modeli və autentifikasiyadan interfeysə, AI pipeline-a və production deploy-a qədər.',
    meta: [
      ['Məkan', 'Budapeşt, HU'],
      ['Təhsil', 'CS BSc · ELTE'],
      ['Buraxılış', '2026-da 5 məhsul'],
      ['İndi', 'Hushplan · Calisiyo'],
    ],
    scroll: 'Aşağı sürüşdürün — siqnalı izləyin',
  },
  origin: {
    kicker: 'Başlanğıc',
    title: 'Bir nəfər, sorğunun bütün yolu.',
    body: [
      'Budapeştdə, Eötvös Loránd Universitetində Kompüter Elmləri üzrə təhsil alıram. 2026-cı ildə beş proqram məhsulu təsis etdim və ya onların həmtəsisçisi oldum; hər birində komandaların adətən bir neçə nəfər arasında böldüyü hissələrə özüm cavabdeh idim: sxem, autentifikasiya, servislər, interfeys, AI inteqrasiyaları və deploy.',
      'İstifadəçinin hər sorğusu bu qatların hamısından keçir. Səhifə boyunca siqnalı izləyin — o, hər birindən keçir.',
    ],
    stats: [
      { value: '5', label: '2026-da təsis etdiyim və ya həmtəsisçisi olduğum məhsul' },
      { value: '6', label: 'başdan-sona idarə etdiyim qat' },
      { value: '8', label: 'proqramlaşdırma dili' },
      { value: '5', label: 'danışdığım dil' },
    ],
  },
  layers: {
    data: {
      index: 'L01',
      name: 'Data',
      title: 'Əvvəl sxem, sonra ekran.',
      lead: 'Məhsuldakı xətaların çoxu gec üzə çıxan data xətalarıdır. Mən modeldən başlayıram — yanlış vəziyyətin bazaya yazılmasını qeyri-mümkün edən məhdudiyyətlər, tranzaksiyalar və miqrasiyalarla.',
      evidence: [
        {
          project: 'StockFlow',
          text: 'İnventar dəyişiklikləri izolyasiya olunmuş PostgreSQL tranzaksiyalarında icra olunur və hər stok dəyişikliyi audit-log qeydini həmin tranzaksiyanın içində yazır.',
        },
        {
          project: 'Calisiyo',
          text: 'Təhsil planları, hədəflər, sınaq imtahanı izləmə və aralıqlı təkrar üçün miqrasiyalar, trigger-lər və Realtime ilə Supabase sxemi.',
        },
        {
          project: 'Parabola',
          text: 'Ölçü tövsiyə mühərrikini qidalandıran istifadəçi, bədən profili və geyim üçün JPA / PostgreSQL domen modeli.',
        },
      ],
      spec: [
        ['Mühərriklər', 'PostgreSQL · Supabase · Firestore'],
        ['Giriş', 'Prisma · JPA'],
        ['Pattern-lər', 'Atomik tranzaksiyalar · audit log-lar · miqrasiyalar · trigger-lər'],
      ],
    },
    auth: {
      index: 'L02',
      name: 'Autentifikasiya və Təhlükəsizlik',
      title: 'Etibar funksiya deyil, qatdır.',
      lead: 'Giriş qaydaları yalnız interfeysdə deyil, datanın yaşadığı yerdə olmalıdır. Onları əvvəlcə verilənlər bazasında və API-də tətbiq edirəm, sonra klientdə əks etdirirəm.',
      evidence: [
        {
          project: 'Hushplan',
          text: 'Şəxsi xərc limitləri API-nin heç vaxt açmadığı Postgres sxemində saxlanılır, yalnız üzvlüyü yoxlayan funksiyalarla əlçatandır — hər məxfilik qaydası pgTAP testləri ilə əhatə olunub.',
        },
        {
          project: 'ShareVibe',
          text: 'Vahid giriş siyahısından generasiya olunan Firestore və Storage təhlükəsizlik qaydaları; hər kafe məkanı üçün ayrıca sahib və admin rolları.',
        },
        {
          project: 'StockFlow',
          text: 'JWT / Passport autentifikasiyası, bcrypt heşləmə və API ilə UI boyunca üç rollu RBAC — admin, menecer, işçi.',
        },
        {
          project: 'CanvasFlow',
          text: 'Üçüncü tərəf API tokenləri AES-256-GCM ilə şifrələnmiş şəkildə saxlanılır və heç vaxt brauzerə göndərilmir.',
        },
      ],
      spec: [
        ['Kimlik', 'OAuth 2.0 / PKCE · JWT · Clerk · Auth.js · Firebase Auth'],
        ['Avtorizasiya', 'RLS · RBAC · təhlükəsizlik qaydaları · storage siyasətləri · Spring Security'],
        ['Möhkəmləndirmə', 'AES-256-GCM · bcrypt · rate limiting · təhlükəsizlik başlıqları'],
      ],
    },
    backend: {
      index: 'L03',
      name: 'Backend',
      title: 'Darıxdırıcı servislər — qəsdən.',
      lead: 'Açıq müqaviləli, proqnozlaşdırıla bilən API-lər, həqiqətən lazım olan yerdə real-time və test etməsi, başa düşməsi asan biznes məntiqi.',
      evidence: [
        {
          project: 'Parabola',
          text: 'OpenAPI ilə sənədləşdirilmiş Java 17 / Spring Boot servisləri, o cümlədən bədən profilinin uyğunluğunu qiymətləndirib geyim ölçüsü tövsiyə edən fit mühərriki.',
        },
        {
          project: 'StockFlow',
          text: 'Stok fəaliyyətini Socket.IO üzərindən bütün qoşulmuş klientlərə real vaxtda yayımlayan NestJS backend.',
        },
        {
          project: 'CanvasFlow',
          text: 'Canvas LMS-in rate-limit başlıqlarını oxuyub kvotanı aşmamaq üçün sorğu intervalını uyğunlaşdıran, serverless limitləri üçün vaxt büdcəsi qoruyucusu olan sinxronizasiya mühərriki.',
        },
      ],
      spec: [
        ['Runtime-lar', 'Node.js · Java 17 · Python'],
        ['Framework-lər', 'NestJS · Express · Spring Boot'],
        ['İnterfeyslər', 'REST · OpenAPI · Socket.IO · webhook-lar'],
      ],
    },
    interface: {
      index: 'L04',
      name: 'İnterfeys',
      title: 'Sistemin insanla görüşdüyü yer.',
      lead: 'İnterfeys istifadəçinin gördüyü yeganə qatdır. Onu React, Next.js və React Native ilə qururam — sürətli, əlçatan və yüklənmə ilə xəta vəziyyətlərində dürüst.',
      evidence: [
        {
          project: 'Calisiyo',
          text: 'Təhsil planlaması, Pomodoro, hədəflər, resurslar, sınaq imtahanı izləmə və aralıqlı təkrar üçün Next.js axınları.',
        },
        {
          project: 'ShareVibe',
          text: 'QR əsaslı, masaya xüsusi qonaq axınları: qonaqlar media yükləyir, reaksiya verir və kampaniya mükafatları qazanır.',
        },
        {
          project: 'StockFlow',
          text: '1000+ elementlik siyahılar üçün qurulmuş, swipe naviqasiyalı və memo-laşdırılmış siyahılı Expo / React Native tətbiqi.',
        },
        {
          project: 'Hushplan',
          text: 'Yeddi dildə Flutter tətbiqi: heç bir ekran daşmasın deyə altı ekran ölçüsündə və iki mətn miqyasında test olunur.',
        },
      ],
      spec: [
        ['Veb', 'React · Next.js · Vite · Tailwind CSS'],
        ['Mobil', 'Flutter · React Native · Expo'],
        ['State', 'Redux Toolkit · Zustand'],
      ],
    },
    ai: {
      index: 'L05',
      name: 'İntellekt',
      title: 'Modellər sehr deyil, komponentdir.',
      lead: 'AI modellərinə hər hansı digər asılılıq kimi yanaşıram: tipli girişlər, strukturlaşdırılmış çıxışlar, dəyişdirilə bilən provayderlər — və ətrafında həqiqətən debug edə bildiyim pipeline.',
      evidence: [
        {
          project: 'Avalabs',
          text: 'Multimodal pipeline: FFmpeg kadrları və səsi çıxarır, Whisper transkripsiya edir, GPT, Gemini və ya Claude nəticəni Instagram konteksti ilə analiz edir.',
        },
        {
          project: 'Hand Tracking',
          text: 'One Euro filtrasiyası ilə aşağı gecikməli MediaPipe + OpenCV əl izləmə və jestlərlə idarə olunan OpenGL partikülləri — bu səhifədəki partikülların sələfi.',
        },
        {
          project: 'QuickScript AI',
          text: 'Ton və platforma idarəetməsi ilə altı dildə strukturlaşdırılmış qısa video ssenariləri.',
        },
      ],
      spec: [
        ['Modellər', 'OpenAI · Whisper · Gemini · Claude · OpenRouter'],
        ['Media və görmə', 'FFmpeg · MediaPipe · OpenCV'],
        ['Pattern-lər', 'Strukturlaşdırılmış çıxışlar · provayder dəyişmə · multimodal pipeline-lar'],
      ],
    },
    production: {
      index: 'L06',
      name: 'Production',
      title: 'Buraxılış da bir funksiyadır.',
      lead: 'Deploy olunmamış kod hələ mövcud deyil. Son mərhələyə də mən cavabdehəm: hostinq, HTTPS, keşləmə, monitorinq və hər buraxılışı qoruyan testlər.',
      evidence: [
        {
          project: 'ShareVibe',
          text: 'Nginx arxasında VDS-də HTTPS, keşləmə və təhlükəsizlik başlıqları ilə production deploy.',
        },
        {
          project: 'Calisiyo',
          text: 'PostHog analitikası, Sentry xəta monitorinqi, web push və Playwright end-to-end yoxlaması.',
        },
        {
          project: 'Parabola',
          text: 'İctimai buraxılışa və komandanın ilk geyim mağazasının platformaya qoşulmasına dəstək.',
        },
        {
          project: 'Hushplan',
          text: '1.0 versiyası Google Play internal testing-də; hər push-da CI və hər gün şifrələnmiş verilənlər bazası ehtiyat nüsxəsi.',
        },
      ],
      spec: [
        ['Hostinq', 'Vercel · VDS / Nginx · Docker'],
        ['Müşahidə', 'Sentry · PostHog'],
        ['Keyfiyyət', 'Playwright · unit və inteqrasiya testləri'],
      ],
    },
  },
  work: {
    kicker: 'Buraxılanlar',
    title: 'Məhsullar və layihələr',
    lead: '2026-da təsis etdiyim və ya həmtəsisçisi olduğum beş məhsul — hər biri başdan-sona qurulub — və onların ətrafındakı layihələr.',
    productsLabel: 'Təsis etdiyim və həmtəsisçisi olduğum məhsullar',
    projectsLabel: 'Seçilmiş layihələr',
    moreLabel: 'Digər təcrübələr',
    present: 'indi',
    caseStudy: 'Keys təhlili',
    live: 'Canlı',
    code: 'Kod',
    roles: {
      founder: 'Təsisçi və full-stack developer',
      product: 'Həmtəsisçi və full-stack developer',
      project: 'Full-stack developer',
    },
    summaries: {
      hushplan: 'Şəxsi xərc limitləri ilə hər kəsin büdcəsinə uyğun qrup planları.',
      calisiyo: 'Türkiyənin YKS universitet qəbul imtahanı üçün təhsil planlaşdırma SaaS-ı.',
      parabola: 'Ölçü uyğunluq mühərriki olan, tövsiyə əsaslı moda marketpleysi.',
      sharevibe: 'Kafelər üçün çox-tenantlı, QR əsaslı sosial platforma.',
      avalabs: 'Instagram kontenti üçün AI sosial media analitikası.',
      stockflow: 'Atomik tranzaksiyalı və mobil tətbiqli inventar sistemi.',
      canvasflow: 'Tələbələr üçün şifrələnmiş, real vaxta yaxın Canvas LMS sinxronizasiyası.',
      'quickscript-ai': 'TikTok, Reels və Shorts üçün AI ssenari generatoru.',
      'hand-tracking': 'GPU partikül effektlərini idarə edən real vaxt əl izləmə.',
    },
    additional: {
      reprecord: 'Məşq qeydləri və irəliləyiş qrafikləri üçün Telegram botu.',
      mockwise: 'AI ilə generasiya olunan məhsul mokapları.',
      tricharge: 'Stripe ödənişləri və JWT autentifikasiyası olan e-ticarət platforması.',
      cookly: 'AI ilə fərdiləşdirilmiş resept generasiyası.',
      lastflame: 'Hakatonda qurulmuş, 2–4 oyunçu üçün kooperativ qaçış oyunu.',
    },
  },
  toolkit: {
    kicker: 'Alətlər',
    title: 'Bütün stack, tam şəkildə.',
    groups: {
      languages: 'Dillər',
      frontend: 'Frontend / Mobil',
      backend: 'Backend / Data',
      ai: 'AI / Sistemlər',
    },
  },
  log: {
    kicker: 'Xronologiya',
    title: 'Zaman xətti',
    entries: [
      { date: '2026-10', text: 'Hushplan 1.0-ı Google Play internal testing-ə buraxdım.' },
      { date: '2026-09', text: 'Məxfiliyi önə çəkən qrup planlaşdırma tətbiqi Hushplan-ı təsis etdim. CanvasFlow üzərində işə başladım.' },
      { date: '2026-08', text: 'YKS imtahanı üçün təhsil planlaşdırma SaaS-ı olan Calisiyo-nun həmtəsisçisi oldum.' },
      { date: '2026-07', text: 'Parabola-nın həmtəsisçisi oldum. StockFlow-a başladım. Google AI Essentials sertifikatını aldım.' },
      { date: '2026-04', text: 'Kafelər üçün QR əsaslı sosial platforma olan ShareVibe-ın həmtəsisçisi oldum.' },
      { date: '2026-02', text: 'Avalabs-ın həmtəsisçisi oldum və onun bütün texniki icrasına rəhbərlik etdim.' },
      { date: '2025-12', text: 'Çoxdilli qısa video ssenari generatoru olan QuickScript AI-ı qurdum.' },
      { date: '2025-11', text: 'MediaPipe, OpenCV və OpenGL ilə real vaxt əl izləmə sistemi qurdum.' },
      { date: '2025', text: 'Budapeştdə, ELTE-də Kompüter Elmləri üzrə bakalavr təhsilinə başladım.' },
    ],
    educationTitle: 'Təhsil',
    education: 'Kompüter Elmləri üzrə bakalavr (BSc) — Eötvös Loránd Universiteti (ELTE)',
    educationPeriod: '2025 — gözlənilən 2028',
    certTitle: 'Sertifikat',
    languagesTitle: 'Dillər',
    levels: { native: 'Ana dili' },
    languageNames: {
      az: 'Azərbaycan dili',
      tr: 'Türk dili',
      en: 'İngilis dili',
      ru: 'Rus dili',
      hu: 'Macar dili',
    },
  },
  faq: {
    kicker: 'Suallar',
    title: 'Qısa cavablar',
    items: [
      {
        q: 'Farid Mahmudlu kimdir?',
        a: 'Farid Mahmudlu Budapeştdə (Macarıstan) yaşayan full-stack və AI proqram tərtibatçısı, Eötvös Loránd Universitetinin (ELTE) Kompüter Elmləri üzrə bakalavr tələbəsidir; məzuniyyəti 2028-ci ildə gözlənilir. 2026-cı ildə Hushplan-ı təsis edib və dörd proqram məhsulunun — Avalabs, ShareVibe, Parabola və Calisiyo — həmtəsisçisi olub; hər birini başdan-sona qurub.',
      },
      {
        q: 'Farid nə qurur?',
        a: 'Verilənlər bazasından başlayaraq veb və mobil məhsullar: data modelləri və autentifikasiya, backend servisləri, React, Next.js, React Native və Flutter interfeysləri, GPT, Gemini, Claude və Whisper kimi modellərlə AI pipeline-ları, həmçinin monitorinqlə production deploy.',
      },
      {
        q: 'Hansı texnologiyalarla işləyir?',
        a: 'Əsasən TypeScript, React, Next.js, React Native, Flutter, Node.js, NestJS, Spring Boot, PostgreSQL, Supabase, Prisma və Firebase. AI və media üçün: OpenAI, Whisper, Gemini, Claude, OpenRouter, FFmpeg, MediaPipe və OpenCV.',
      },
      {
        q: 'Hansı məhsulları təsis edib?',
        a: 'Hushplan-ı (məxfiliyi önə çəkən qrup planlaşdırma, 2026 — davam edir) təsis edib, həmçinin Avalabs (AI sosial media analitikası, 2026), ShareVibe (kafelər üçün QR əsaslı sosial platforma, 2026), Parabola (tövsiyə əsaslı moda marketpleysi, 2026) və Calisiyo (YKS imtahanı üçün təhsil planlaşdırma SaaS-ı, 2026 — davam edir) məhsullarının həmtəsisçisidir.',
      },
      {
        q: 'Harada yaşayır və hansı dilləri bilir?',
        a: 'Budapeştdə, Macarıstanda yaşayır. Azərbaycan (ana dili), türk (C1), ingilis (B2), rus (A1) və macar (A1) dillərində danışır.',
      },
      {
        q: 'Onunla necə əlaqə saxlamaq olar?',
        a: 'E-poçtla — ünvan bu səhifənin əlaqə bölməsindədir — və ya LinkedIn vasitəsilə. Açıq kodu GitHub-dadır.',
      },
    ],
  },
  contact: {
    kicker: 'Əlaqə',
    title: 'Kanal açın.',
    lead: 'Vakansiya, əməkdaşlıq və ya başdan-sona bir nəfərin sahiblənməli olduğu məhsul — mənə çatmağın ən sürətli yolu e-poçtdur.',
    emailLabel: 'E-poçt',
    copy: 'Kopyala',
    copied: 'Kopyalandı',
    cv: 'CV-ni yüklə (PDF)',
    elsewhere: 'Digər platformalar',
  },
  footer: {
    rights: 'Bütün hüquqlar qorunur.',
    legalTitle: 'Hüquqi',
    legal: {
      privacy: 'Məxfilik siyasəti',
      'legal-notice': 'Hüquqi məlumat',
      terms: 'İstifadə şərtləri',
      accessibility: 'Əlçatanlıq',
      security: 'Təhlükəsizlik',
    },
    privacyNote: 'Kuki yoxdur. Reklam izləyiciləri yoxdur. Fingerprinting yoxdur.',
    backToTop: 'Yuxarı qayıt',
  },
  case: {
    work: 'İşlər',
    founder: 'Təsis etdiyim məhsul',
    product: 'Həmtəsisçisi olduğum məhsul',
    project: 'Layihə',
    role: 'Rol',
    period: 'Dövr',
    stack: 'Stack',
    links: 'Keçidlər',
    next: 'Növbəti',
    all: 'Bütün işlər',
    layer: 'Əsas qat',
  },
  legal: {
    updated: 'Son yenilənmə',
    toc: 'Bu səhifədə',
    back: 'Ana səhifəyə qayıt',
  },
  notFound: {
    title: 'Siqnal itdi.',
    body: 'Bu səhifə mövcud deyil və ya köçürülüb.',
    home: 'Ana səhifəyə qayıt',
  },
  hud: { signal: 'Siqnal' },
};
