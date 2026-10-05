---
title: Təhlükəsizlik siyasəti
description: faridmahmudlu.dev saytında zəifliyi necə bildirmək olar, əhatə dairəsi, vicdanlı araşdırmalar üçün təhlükəsiz liman şərtləri və saytın necə möhkəmləndirildiyi.
updated: 2026-10-05
---

## Zəifliyin bildirilməsi

Bu saytda təhlükəsizlik problemi tapdığınızı düşünürsünüzsə, mövzu sətrində **“Security”** yazaraq mənə e-poçt göndərin. Problemin təsvirini, onu təkrarlamaq üçün addımları, mümkün təsirini və imkan varsa, konsepsiya sübutunu (PoC) əlavə edin. Zəhmət olmasa, başqa şəxslərin fərdi məlumatlarını daxil etməyin.

RFC 9116-ya uyğun maşın tərəfindən oxuna bilən əlaqə faylı [/.well-known/security.txt](/.well-known/security.txt) ünvanında dərc olunub.

## Əhatə dairəsi

**Əhatəyə daxildir:** `faridmahmudlu.dev` saytı, o cümlədən onun HTTP cavab başlıqları və konfiqurasiyası.

**Əhatəyə daxil deyil:**

- Cloudflare, GitHub, LinkedIn və ya Google kimi üçüncü tərəf xidmətləri — zəhmət olmasa, birbaşa onlara bildirin;
- portfolioda göstərilən məhsullar — onların komandaları ilə əlaqə saxlayın (əmin deyilsinizsə, mənə yazın, hesabatınızı yönləndirəcəyəm);
- xidmətdən imtina (DoS) və ya həcmli yüklənmə testləri, spam və sosial mühəndislik;
- nümayiş etdirilmiş təsiri olmayan avtomatik skaner hesabatları;
- praktik istismarı olmayan çatışmayan “best practice” başlıqları və ya parametrləri.

## Təhlükəsiz liman

Vicdanla hərəkət edib bu siyasətə əməl etsəniz, araşdırmanızı icazəli hesab edəcəyəm və hüquqi addım atmayacağam. Zəhmət olmasa:

- problemi nümayiş etdirmək üçün yalnız minimum zəruri məlumata daxil olun;
- digər ziyarətçilər üçün saytın işini pisləşdirməyin;
- problemi ictimai açıqlamazdan əvvəl düzəltməyim üçün mənə ağlabatan vaxt verin — adətən 90 gün.

## Nə gözləməli

Hesabatları beş iş günü ərzində təsdiqləməyə və problem həll olunana qədər sizi məlumatlandırmağa çalışıram. İcazənizlə adınızı məmnuniyyətlə qeyd edəcəyəm. Bu şəxsi sayt olduğu üçün ödənişli bug bounty proqramı yoxdur.

## Sayt necə möhkəmləndirilib

- **Statik dizayn:** server tərəfi kodu, verilənlər bazası, formalar və istifadəçi hesabları yoxdur.
- **Ciddi Content Security Policy:** inline skript və ya stil yoxdur, `eval` yoxdur, Trusted Types tətbiq olunur, freymlərə yerləşdirmə qadağandır.
- **Nəqliyyat təhlükəsizliyi:** yalnız HTTPS, preload ilə HSTS; `.dev` yuxarı səviyyəli domeninin özü də HSTS preload siyahısındadır.
- **İzolyasiya başlıqları:** `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-Content-Type-Options` və məhdudlaşdırıcı `Permissions-Policy`.
- **Minimal üçüncü tərəflər:** şriftlər və skriptlər saytın öz serverindədir; yeganə xarici skript Cloudflare-in kukisiz analitika skriptidir.
- **Təchizat zənciri:** asılılıqlar dəqiq versiyalara bərkidilib və yeni buraxılışlar yalnız yeddi günlük gözləmə müddətindən sonra quraşdırılır.
- **Məxfilik:** saytın öz kukiləri yoxdur və e-poçt ünvanı HTML-də heç vaxt açıq mətnlə dərc olunmur.
