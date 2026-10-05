import type { Dictionary } from './en';

export const hu: Dictionary = {
  meta: {
    siteName: 'Farid Mahmudlu',
    homeTitle: 'Farid Mahmudlu — Full-Stack és AI szoftverfejlesztő, Budapest',
    homeDescription:
      'Farid Mahmudlu budapesti full-stack és AI szoftverfejlesztő, az ELTE informatikahallgatója — a Hushplan alapítója és négy szoftvertermék társalapítója.',
    titleSuffix: ' — Farid Mahmudlu',
    jobTitle: 'Full-Stack és AI szoftverfejlesztő',
  },
  a11y: {
    skip: 'Ugrás a tartalomra',
    menu: 'Menü',
    close: 'Menü bezárása',
    mainNav: 'Fő navigáció',
    language: 'Nyelv kiválasztása',
    breadcrumb: 'Morzsamenü',
    external: '(új lapon nyílik meg)',
    pauseMotion: 'Animáció szüneteltetése',
    playMotion: 'Animáció folytatása',
    sections: 'Az oldal szakaszai',
    home: 'Farid Mahmudlu — kezdőlap',
  },
  nav: { process: 'Módszer', work: 'Munkák', log: 'Napló', faq: 'GYIK', contact: 'Kapcsolat' },
  hero: {
    kicker: 'Full-stack és AI szoftverfejlesztő',
    statement:
      'Szoftvertermékeket építek az elejétől a végéig — az adatmodelltől és a hitelesítéstől a felületig, az AI-folyamatig és az éles telepítésig.',
    meta: [
      ['Helyszín', 'Budapest, HU'],
      ['Tanulmányok', 'CS BSc · ELTE'],
      ['Kiadva', '5 termék 2026-ban'],
      ['Most', 'Hushplan · Calisiyo'],
    ],
    scroll: 'Görgess — kövesd a jelet',
  },
  origin: {
    kicker: 'Kezdet',
    title: 'Egy ember, a kérés teljes útja.',
    body: [
      'Az Eötvös Loránd Tudományegyetemen tanulok informatikát Budapesten. 2026-ban öt szoftverterméket alapítottam vagy társalapítottam, és mindegyikben én feleltem azokért a részekért, amelyeken a legtöbb csapatban többen osztoznak: séma, hitelesítés, szolgáltatások, felület, AI-integrációk és telepítés.',
      'Minden felhasználói kérés végighalad ezeken a rétegeken. Kövesd a jelet lefelé az oldalon — mindegyiken áthalad.',
    ],
    stats: [
      { value: '5', label: 'alapított vagy társalapított termék 2026-ban' },
      { value: '6', label: 'teljes egészében vitt réteg' },
      { value: '8', label: 'programozási nyelv' },
      { value: '5', label: 'beszélt nyelv' },
    ],
  },
  layers: {
    data: {
      index: 'L01',
      name: 'Adat',
      title: 'Előbb a séma, aztán a képernyő.',
      lead: 'A legtöbb termékhiba valójában későn felszínre kerülő adathiba. A modellel kezdek — megszorításokkal, tranzakciókkal és migrációkkal, amelyek lehetetlenné teszik az érvénytelen állapotok tárolását.',
      evidence: [
        {
          project: 'StockFlow',
          text: 'A készletmódosítások izolált PostgreSQL-tranzakciókban futnak, és minden készletváltozás ugyanabban a tranzakcióban írja meg az audit-napló bejegyzését.',
        },
        {
          project: 'Calisiyo',
          text: 'Supabase-séma migrációkkal, triggerekkel és Realtime-mal a tanulási tervek, célok, próbavizsga-követés és térközös ismétlés mögött.',
        },
        {
          project: 'Parabola',
          text: 'JPA / PostgreSQL tartománymodell felhasználókhoz, testprofilokhoz és ruhadarabokhoz, amely a méretajánló motort táplálja.',
        },
      ],
      spec: [
        ['Motorok', 'PostgreSQL · Supabase · Firestore'],
        ['Elérés', 'Prisma · JPA'],
        ['Minták', 'Atomi tranzakciók · audit-naplók · migrációk · triggerek'],
      ],
    },
    auth: {
      index: 'L02',
      name: 'Hitelesítés és biztonság',
      title: 'A bizalom réteg, nem funkció.',
      lead: 'A hozzáférési szabályok oda tartoznak, ahol az adat él — nem csak a felületre. Először az adatbázisban és az API-ban érvényesítem őket, aztán a kliens ezt tükrözi.',
      evidence: [
        {
          project: 'Hushplan',
          text: 'A privát költési limitek olyan Postgres-sémában élnek, amelyet az API soha nem tesz elérhetővé, csak tagságot ellenőrző függvényeken át — minden adatvédelmi szabályt pgTAP-tesztek fednek le.',
        },
        {
          project: 'ShareVibe',
          text: 'Egyetlen hozzáférési listából generált Firestore- és Storage-biztonsági szabályok, kávézónként külön tulajdonosi és adminisztrátori szerepkörökkel.',
        },
        {
          project: 'StockFlow',
          text: 'JWT / Passport hitelesítés, bcrypt-hashelés és háromszintű RBAC — admin, menedzser, munkatárs — az API-ban és a felületen.',
        },
        {
          project: 'CanvasFlow',
          text: 'Harmadik féltől származó API-tokenek AES-256-GCM-mel titkosítva tárolva — soha nem kerülnek a böngészőbe.',
        },
      ],
      spec: [
        ['Identitás', 'OAuth 2.0 / PKCE · JWT · Clerk · Auth.js · Firebase Auth'],
        ['Jogosultság', 'RLS · RBAC · biztonsági szabályok · tárolási szabályzatok · Spring Security'],
        ['Megerősítés', 'AES-256-GCM · bcrypt · rate limiting · biztonsági fejlécek'],
      ],
    },
    backend: {
      index: 'L03',
      name: 'Backend',
      title: 'Unalmas szolgáltatások — szándékosan.',
      lead: 'Kiszámítható API-k explicit szerződésekkel, valós idő ott, ahol tényleg számít, és könnyen tesztelhető, könnyen átlátható üzleti logika.',
      evidence: [
        {
          project: 'Parabola',
          text: 'OpenAPI-val dokumentált Java 17 / Spring Boot szolgáltatások, köztük egy illeszkedési motor, amely pontozza a testprofil-kompatibilitást és ruhaméretet ajánl.',
        },
        {
          project: 'StockFlow',
          text: 'NestJS backend, amely Socket.IO-n keresztül valós időben közvetíti a készletmozgásokat minden csatlakozott kliensnek.',
        },
        {
          project: 'CanvasFlow',
          text: 'Szinkronizációs motor, amely kiolvassa a Canvas LMS rate-limit fejléceit, és a kvóta alatt maradva igazítja a lekérdezési intervallumot, időkeret-védelemmel a serverless korlátokhoz.',
        },
      ],
      spec: [
        ['Futtatókörnyezetek', 'Node.js · Java 17 · Python'],
        ['Keretrendszerek', 'NestJS · Express · Spring Boot'],
        ['Interfészek', 'REST · OpenAPI · Socket.IO · webhookok'],
      ],
    },
    interface: {
      index: 'L04',
      name: 'Felület',
      title: 'Ahol a rendszer találkozik az emberrel.',
      lead: 'A felület az egyetlen réteg, amelyet a felhasználó valaha lát. React, Next.js és React Native segítségével építem — gyorsan, akadálymentesen, és őszintén a betöltési és hibaállapotokban.',
      evidence: [
        {
          project: 'Calisiyo',
          text: 'Next.js folyamatok tanulástervezéshez, Pomodoróhoz, célokhoz, forrásokhoz, próbavizsga-követéshez és térközös ismétléshez.',
        },
        {
          project: 'ShareVibe',
          text: 'QR-alapú, asztalhoz kötött vendégfolyamatok: a vendégek médiát töltenek fel, reagálnak, és kampányjutalmakat oldanak fel.',
        },
        {
          project: 'StockFlow',
          text: 'Expo / React Native alkalmazás swipe-navigációval és memoizált listákkal, 1000+ elemre tervezve.',
        },
        {
          project: 'Hushplan',
          text: 'Hétnyelvű Flutter-alkalmazás, hat képernyőméreten és két szövegméretben tesztelve, hogy egyetlen képernyő se csússzon szét.',
        },
      ],
      spec: [
        ['Web', 'React · Next.js · Vite · Tailwind CSS'],
        ['Mobil', 'Flutter · React Native · Expo'],
        ['Állapot', 'Redux Toolkit · Zustand'],
      ],
    },
    ai: {
      index: 'L05',
      name: 'Intelligencia',
      title: 'A modellek komponensek, nem varázslat.',
      lead: 'Az AI-modelleket úgy kezelem, mint bármely más függőséget: típusos bemenetek, strukturált kimenetek, cserélhető szolgáltatók — és köréjük egy folyamat, amelyet valóban tudok debugolni.',
      evidence: [
        {
          project: 'Avalabs',
          text: 'Multimodális folyamat: az FFmpeg képkockákat és hangot nyer ki, a Whisper átírja, a GPT, a Gemini vagy a Claude pedig Instagram-kontextussal elemzi az eredményt.',
        },
        {
          project: 'Hand Tracking',
          text: 'Alacsony késleltetésű MediaPipe + OpenCV kézkövetés One Euro szűréssel, gesztusvezérelt OpenGL-részecskékkel — az oldalon látható részecskék elődje.',
        },
        {
          project: 'QuickScript AI',
          text: 'Strukturált rövid videós forgatókönyvek hat nyelven, hangnem- és platformbeállításokkal.',
        },
      ],
      spec: [
        ['Modellek', 'OpenAI · Whisper · Gemini · Claude · OpenRouter'],
        ['Média és látás', 'FFmpeg · MediaPipe · OpenCV'],
        ['Minták', 'Strukturált kimenetek · szolgáltatóváltás · multimodális folyamatok'],
      ],
    },
    production: {
      index: 'L06',
      name: 'Éles üzem',
      title: 'A kiadás is funkció.',
      lead: 'Az a kód, amely nincs telepítve, még nem létezik. Az utolsó mérföld is az enyém: hosting, HTTPS, gyorsítótárazás, monitorozás, és a tesztek, amelyek minden kiadást védenek.',
      evidence: [
        {
          project: 'ShareVibe',
          text: 'Éles telepítés VDS-en, Nginx mögött, HTTPS-sel, gyorsítótárazással és biztonsági fejlécekkel.',
        },
        {
          project: 'Calisiyo',
          text: 'PostHog-analitika, Sentry-hibafigyelés, web push és Playwright end-to-end validáció.',
        },
        {
          project: 'Parabola',
          text: 'Közreműködés a nyilvános indulásban és a csapat első ruhaüzletének bevonásában.',
        },
        {
          project: 'Hushplan',
          text: 'Az 1.0-s verzió a Google Play belső tesztelésében; CI minden pushnál és napi titkosított adatbázis-mentés.',
        },
      ],
      spec: [
        ['Hosting', 'Vercel · VDS / Nginx · Docker'],
        ['Megfigyelhetőség', 'Sentry · PostHog'],
        ['Minőség', 'Playwright · unit- és integrációs tesztek'],
      ],
    },
  },
  work: {
    kicker: 'Kiadva',
    title: 'Termékek és projektek',
    lead: 'Öt 2026-ban alapított vagy társalapított termék — mindegyik az elejétől a végéig felépítve — és a köréjük épülő projektek.',
    productsLabel: 'Alapított és társalapított termékek',
    projectsLabel: 'Válogatott projektek',
    moreLabel: 'További kísérletek',
    present: 'jelenleg',
    caseStudy: 'Esettanulmány',
    live: 'Élő',
    code: 'Kód',
    roles: {
      founder: 'Alapító és full-stack fejlesztő',
      product: 'Társalapító és full-stack fejlesztő',
      project: 'Full-stack fejlesztő',
    },
    summaries: {
      hushplan: 'Csoportos tervek, amelyek mindenki költségvetésébe beleférnek — privát költési limitekkel.',
      calisiyo: 'Tanulástervező SaaS a török YKS egyetemi felvételi vizsgához.',
      parabola: 'Ajánlásalapú divatpiactér méretillesztő motorral.',
      sharevibe: 'Több bérlős, QR-alapú közösségi platform kávézóknak.',
      avalabs: 'AI-alapú közösségimédia-elemzés Instagram-tartalmakhoz.',
      stockflow: 'Készletkezelő rendszer atomi tranzakciókkal és mobilalkalmazással.',
      canvasflow: 'Titkosított, közel valós idejű Canvas LMS-szinkron hallgatóknak.',
      'quickscript-ai': 'AI-forgatókönyv-generátor TikTokra, Reelsre és Shortsra.',
      'hand-tracking': 'Valós idejű kézkövetés GPU-részecskeeffektekkel.',
    },
    additional: {
      reprecord: 'Telegram-bot edzésnaplózáshoz és fejlődési grafikonokhoz.',
      mockwise: 'AI által generált termékmockupok.',
      tricharge: 'E-kereskedelmi platform Stripe-fizetéssel és JWT-hitelesítéssel.',
      cookly: 'Személyre szabott receptgenerálás AI-jal.',
      lastflame: 'Kooperatív szabadulós játék 2–4 játékosnak, hackathonon készült.',
    },
  },
  toolkit: {
    kicker: 'Eszköztár',
    title: 'A teljes stack, minden része.',
    groups: {
      languages: 'Nyelvek',
      frontend: 'Frontend / Mobil',
      backend: 'Backend / Adat',
      ai: 'AI / Rendszerek',
    },
  },
  log: {
    kicker: 'Napló',
    title: 'Idővonal',
    entries: [
      { date: '2026-10', text: 'A Hushplan 1.0 bekerült a Google Play belső tesztelésébe.' },
      { date: '2026-09', text: 'Megalapítottam a Hushplant, egy adatvédelem-központú csoportos tervezőalkalmazást. Elindítottam a CanvasFlow-t.' },
      { date: '2026-08', text: 'Társalapítója lettem a Calisiyónak, egy YKS-vizsgára felkészítő tanulástervező SaaS-nak.' },
      { date: '2026-07', text: 'Társalapítója lettem a Parabolának. Elindítottam a StockFlow-t. Megszereztem a Google AI Essentials tanúsítványt.' },
      { date: '2026-04', text: 'Társalapítója lettem a ShareVibe-nak, egy QR-alapú közösségi platformnak kávézók számára.' },
      { date: '2026-02', text: 'Társalapítója lettem az Avalabsnek, és vezettem a teljes technikai megvalósítást.' },
      { date: '2025-12', text: 'Megépítettem a QuickScript AI-t, egy többnyelvű rövidvideós forgatókönyv-generátort.' },
      { date: '2025-11', text: 'Valós idejű kézkövetést építettem MediaPipe, OpenCV és OpenGL segítségével.' },
      { date: '2025', text: 'Megkezdtem a Computer Science BSc képzést az ELTE-n, Budapesten.' },
    ],
    educationTitle: 'Tanulmányok',
    education: 'Computer Science BSc — Eötvös Loránd Tudományegyetem (ELTE)',
    educationPeriod: '2025 — várhatóan 2028',
    certTitle: 'Tanúsítvány',
    languagesTitle: 'Nyelvek',
    levels: { native: 'Anyanyelv' },
    languageNames: {
      az: 'Azerbajdzsáni',
      tr: 'Török',
      en: 'Angol',
      ru: 'Orosz',
      hu: 'Magyar',
    },
  },
  faq: {
    kicker: 'GYIK',
    title: 'Gyors válaszok',
    items: [
      {
        q: 'Ki Farid Mahmudlu?',
        a: 'Farid Mahmudlu budapesti full-stack és AI szoftverfejlesztő, az Eötvös Loránd Tudományegyetem (ELTE) Computer Science BSc hallgatója, várható végzése 2028. 2026-ban megalapította a Hushplant, és négy szoftvertermék — az Avalabs, a ShareVibe, a Parabola és a Calisiyo — társalapítója lett; mindegyiket az elejétől a végéig felépítette.',
      },
      {
        q: 'Mit épít Farid?',
        a: 'Webes és mobilos termékeket az adatbázistól felfelé: adatmodelleket és hitelesítést, backend-szolgáltatásokat, React, Next.js, React Native és Flutter felületeket, AI-folyamatokat olyan modellekkel, mint a GPT, a Gemini, a Claude és a Whisper, valamint éles telepítést monitorozással.',
      },
      {
        q: 'Milyen technológiákkal dolgozik?',
        a: 'Főként TypeScript, React, Next.js, React Native, Flutter, Node.js, NestJS, Spring Boot, PostgreSQL, Supabase, Prisma és Firebase. AI-hoz és médiához: OpenAI, Whisper, Gemini, Claude, OpenRouter, FFmpeg, MediaPipe és OpenCV.',
      },
      {
        q: 'Milyen termékeket alapított?',
        a: 'Megalapította a Hushplant (adatvédelem-központú csoportos tervezés, 2026 — folyamatban), és társalapítója az alábbiaknak: Avalabs (AI-alapú közösségimédia-elemzés, 2026), ShareVibe (QR-alapú közösségi platform kávézóknak, 2026), Parabola (ajánlásalapú divatpiactér, 2026) és Calisiyo (tanulástervező SaaS a YKS-vizsgához, 2026 — folyamatban).',
      },
      {
        q: 'Hol él, és milyen nyelveken beszél?',
        a: 'Budapesten él. Azerbajdzsáni (anyanyelv), török (C1), angol (B2), orosz (A1) és magyar (A1) nyelven beszél.',
      },
      {
        q: 'Hogyan lehet felvenni vele a kapcsolatot?',
        a: 'E-mailben — a cím az oldal kapcsolat szakaszában található — vagy LinkedInen. A nyilvános kódja a GitHubon érhető el.',
      },
    ],
  },
  contact: {
    kicker: 'Kapcsolat',
    title: 'Nyiss csatornát.',
    lead: 'Állásajánlat, együttműködés vagy egy termék, amelynek egyetlen felelős kell az elejétől a végéig — e-mailben érsz el a leggyorsabban.',
    emailLabel: 'E-mail',
    copy: 'Másolás',
    copied: 'Másolva',
    cv: 'Önéletrajz letöltése (PDF)',
    elsewhere: 'Máshol',
  },
  footer: {
    rights: 'Minden jog fenntartva.',
    legalTitle: 'Jogi információk',
    legal: {
      privacy: 'Adatkezelési tájékoztató',
      'legal-notice': 'Impresszum',
      terms: 'Felhasználási feltételek',
      accessibility: 'Akadálymentesség',
      security: 'Biztonság',
    },
    privacyNote: 'Nincs süti. Nincs hirdetési követés. Nincs ujjlenyomat-azonosítás.',
    backToTop: 'Vissza a tetejére',
  },
  case: {
    work: 'Munkák',
    founder: 'Alapított termék',
    product: 'Társalapított termék',
    project: 'Projekt',
    role: 'Szerep',
    period: 'Időszak',
    stack: 'Stack',
    links: 'Linkek',
    next: 'Következő',
    all: 'Összes munka',
    layer: 'Fő réteg',
  },
  legal: {
    updated: 'Utolsó frissítés',
    toc: 'Ezen az oldalon',
    back: 'Vissza a kezdőlapra',
  },
  notFound: {
    title: 'Elveszett a jel.',
    body: 'Ez az oldal nem létezik, vagy elköltözött.',
    home: 'Vissza a kezdőlapra',
  },
  hud: { signal: 'Jel' },
};
