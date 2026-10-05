---
title: Məxfilik siyasəti
description: faridmahmudlu.dev fərdi məlumatları necə emal edir — kuki və reklam izləyiciləri yoxdur, kukisiz statistika, server log-ları, e-poçt və GDPR üzrə hüquqlarınız.
updated: 2026-10-05
---

Bu siyasət **faridmahmudlu.dev** saytına (“sayt”) daxil olarkən fərdi məlumatların necə emal edildiyini izah edir. Sənəd Aİ-nin 2016/679 saylı Qaydasına (Ümumi Məlumatların Qorunması Qaydası, “GDPR”) və Macarıstanın informasiya öz müqəddəratını təyinetmə hüququ və informasiya azadlığı haqqında 2011-ci il CXII saylı Qanununa (“Info Qanunu”) uyğun hazırlanıb.

## Qısa xülasə

- Bu sayt analitika, reklam və ya fərdiləşdirmə üçün **heç bir kuki qoymur** və lokal yaddaşdan istifadə etmir.
- **Reklam şəbəkələri, sosial media pikselləri, fingerprinting və üçüncü tərəf yerləşdirmələri yoxdur.**
- Şriftlər və skriptlər **saytın öz serverində saxlanılır** — brauzeriniz Google Fonts və ya digər CDN-lərə müraciət etmir.
- Ziyarətçi statistikası **ümumiləşdirilmiş və kukisizdir**.
- Mənə e-poçt yazsanız, mesajınız **yalnız cavab vermək üçün** istifadə olunur.

## Məsul şəxs

Nəzarətçi Budapeştdə (Macarıstan) yaşayan fiziki şəxs **Farid Mahmudlu**-dur. Əlaqə e-poçt ünvanı bu səhifənin sonunda və ana səhifənin əlaqə bölməsində göstərilib. Tələb olunmadığı üçün məlumatların qorunması üzrə inspektor (DPO) təyin edilməyib (GDPR-in 37-ci maddəsi).

## Nə emal olunur, nə üçün və hansı hüquqi əsasla

### 1. Saytın çatdırılması və qorunması

Səhifəni açdığınız zaman brauzeriniz hostinq provayderinə zəruri texniki məlumatları ötürür: IP ünvanı, sorğunun tarixi və vaxtı, sorğulanan URL, yönləndirən səhifə, user-agent sətri (brauzer və əməliyyat sistemi), cavab statusu və ötürülən məlumatın həcmi.

- **Məqsəd:** saytı çatdırmaq, sabit və təhlükəsiz saxlamaq, xidmətdən imtina (DoS) hücumları və ya zərərli botlar kimi sui-istifadə hallarını aşkar edib qarşısını almaq.
- **Hüquqi əsas:** GDPR-in 6(1)(f) maddəsi — təhlükəsiz və etibarlı sayt idarə etməkdə qanuni marağım.
- **Saxlama müddəti:** bu məlumatlar mənim adımdan Cloudflare tərəfindən emal olunur və yalnız Cloudflare siyasətlərində müəyyən edilmiş qısa müddət ərzində saxlanılır. Mən xam giriş log-larını almıram və bu məlumatları digər mənbələrlə birləşdirmirəm.

Saytı qorumaq üçün Cloudflare yalnız insanları avtomatlaşdırılmış trafikdən ayırmaq lazım olduqda və ya təhlükəsizlik yoxlamasından sonra **ciddi zəruri təhlükəsizlik kukiləri** (məsələn, `__cf_bm` və ya `cf_clearance`) qoya bilər. Bu kukilər sizi saytlar arasında izləmir. Onlar ePrivacy Direktivinin 5(3) maddəsinə (Macarıstanda elektron rabitə haqqında 2003-cü il C saylı Qanunun 155(4)-cü bəndi ilə tətbiq olunur) əsasən razılıq tələbindən azaddır. Hüquqi əsas: GDPR-in 6(1)(f) maddəsi.

### 2. Ziyarətçi statistikası

Hansı səhifələrin oxunduğunu və nə qədər sürətlə yükləndiyini anlamaq üçün **Cloudflare Web Analytics**-dən istifadə edirəm. O, kuki və ya lokal yaddaşdan istifadə etmir və ziyarətçiləri IP ünvanı, user-agent və ya digər məlumatlar vasitəsilə fingerprinting etmir. Toplanan məlumatlar ümumiləşdirilmişdir: səhifə yolu, yönləndirən mənbə, brauzer, əməliyyat sistemi və cihaz növü, ölkə (IP ünvanından müəyyən edilir; IP ünvanı analitika məhsulunda saxlanılmır) və Core Web Vitals kimi performans göstəriciləri.

- **Məqsəd:** kontenti və performansı yaxşılaşdırmaq.
- **Hüquqi əsas:** GDPR-in 6(1)(f) maddəsi — saytın necə istifadə edildiyini ümumiləşdirilmiş şəkildə anlamaqda qanuni marağım.

### 3. Mənimlə e-poçt vasitəsilə əlaqə

Mənə e-poçt yazsanız, e-poçt ünvanınızı, adınızı, mesajın məzmununu və metadatasını emal edirəm.

- **Məqsəd:** sorğunuza cavab vermək.
- **Hüquqi əsas:** mesajınız müqavilə bağlanmazdan əvvəlki addımlara aid olduqda (məsələn, iş və ya layihə təklifi) GDPR-in 6(1)(b) maddəsi; digər hallarda GDPR-in 6(1)(f) maddəsi — mənə ünvanlanmış mesajlara cavab verməkdə qanuni marağım.
- **Saxlama müddəti:** yazışmanın tələb etdiyi müddət ərzində; qanunla daha uzun saxlama tələb olunmursa, son yazışmadan ən gec iki il sonra silinir.
- **Çatdırılma:** bu saytdakı ünvana göndərilən mesajlar onları saxlamayan Cloudflare Email Routing vasitəsilə Google (Gmail) tərəfindən host edilən poçt qutuma yönləndirilir və orada saxlanılır.

### 4. CV-nin yüklənməsi

CV statik PDF faylıdır. Onun yüklənməsi yalnız 1-ci bölmədə təsvir olunan texniki məlumatları yaradır. İctimai versiyada telefon nömrəm yoxdur.

## Alıcılar və emal edənlər

- **Cloudflare, Inc.**, 101 Townsend St., San Francisco, CA 94107, ABŞ — hostinq, kontent çatdırılması, təhlükəsizlik, veb analitika və e-poçt yönləndirməsi; Aİ Standart Müqavilə Şərtlərini ehtiva edən məlumat emalı müqaviləsi əsasında.
- **Google** — mənə göndərməyi seçdiyiniz mesajlar üçün e-poçt hostinqi (Gmail).

Fərdi məlumatlar heç vaxt satılmır, icarəyə verilmir və reklam məqsədilə paylaşılmır.

## AİZ-dən kənara ötürmə

Cloudflare və Google qlobal infrastruktur idarə edir, ona görə məlumatlar Avropa İqtisadi Zonasından kənarda, o cümlədən ABŞ-da emal oluna bilər. Belə ötürmələr sertifikatlı şirkətlər üçün Avropa Komissiyasının Aİ–ABŞ Məlumat Məxfiliyi Çərçivəsinə dair adekvatlıq qərarına (GDPR-in 45-ci maddəsi) və/və ya Standart Müqavilə Şərtlərinə (GDPR-in 46(2)(c) maddəsi) əsaslanır.

## Xarici keçidlər

Bu saytda GitHub, LinkedIn və üzərində işlədiyim məhsulların saytlarına keçidlər var. Burada gəzərkən həmin xidmətlərdən heç nə yüklənmir — yerləşdirilmiş vidjetlər və sosial plaginlər yoxdur. Keçidə daxil olduqdan sonra həmin saytın məxfilik siyasəti tətbiq olunur. Saytın referrer siyasətinə görə təyinat saytı yalnız `faridmahmudlu.dev`-dən gəldiyinizi bilir, hansı səhifədən gəldiyinizi yox.

## Kukilər və lokal yaddaş

1-ci bölmədə təsvir olunan ciddi zəruri təhlükəsizlik kukiləri istisna olmaqla, bu sayt kuki qoymur və `localStorage`, `sessionStorage` və ya `IndexedDB` istifadə etmir. Bu səbəbdən kuki banneri yoxdur.

## Hüquqlarınız

GDPR-ə əsasən aşağıdakı hüquqlara maliksiniz:

- fərdi məlumatlarınıza çıxış (15-ci maddə);
- yanlış məlumatların düzəldilməsi (16-cı maddə);
- məlumatlarınızın silinməsi (17-ci maddə);
- emalın məhdudlaşdırılması (18-ci maddə);
- məlumatlarınızı daşına bilən formatda almaq (20-ci maddə);
- qanuni maraqlara əsaslanan emala istənilən vaxt **etiraz etmək** (21-ci maddə).

Bu hüquqlardan istifadə etmək üçün mənə e-poçt yazın. Əsassız gecikmə olmadan və ən gec bir ay ərzində cavab verəcəyəm (GDPR-in 12(3) maddəsi). Nəzərə alın ki, əlavə məlumat təqdim etməsəniz, adətən texniki və ya statistik məlumatlar əsasında ayrı-ayrı ziyarətçiləri müəyyən edə bilmirəm (GDPR-in 11-ci maddəsi).

## Şikayət və hüquqi müdafiə vasitələri

Macarıstanın nəzarət orqanına şikayət edə bilərsiniz:

**Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)** — Milli Məlumatların Qorunması və İnformasiya Azadlığı Orqanı
Ünvan: 1055 Budapest, Falk Miksa utca 9–11, Macarıstan
Poçt ünvanı: 1363 Budapest, Pf. 9.
Telefon: +36 1 391 1400 · E-poçt: ugyfelszolgalat@naih.hu · Sayt: [naih.hu](https://naih.hu)

Həmçinin Aİ-də daimi yaşayış və ya iş yerinizin nəzarət orqanına müraciət edə, yaxud məhkəməyə iddia qaldıra bilərsiniz. Macarıstanda belə işlər regional məhkəmənin (törvényszék) səlahiyyətinə aiddir; yaşayış yerinizin məhkəməsini seçə bilərsiniz.

## Avtomatlaşdırılmış qərarlar və uşaqlar

GDPR-in 22-ci maddəsi mənasında avtomatlaşdırılmış qərar qəbulu və ya profilləşdirmə həyata keçirilmir. Bu sayt 16 yaşdan kiçik uşaqlara yönəlməyib.

## Təhlükəsizlik

Sayt statikdir və yalnız HTTPS üzərindən təqdim olunur. Ciddi Content Security Policy və HSTS istifadə edir; Cloudflare analitika skriptindən başqa üçüncü tərəf skripti yoxdur. Toplanan məlumatlar zəruri minimumda saxlanılır. Ətraflı məlumat [təhlükəsizlik siyasəti](/az/tehlukesizlik/) səhifəsindədir.

## Dəyişikliklər

Bu siyasət saytın məlumat təcrübələri dəyişdikdə yenilənir. Yuxarıdakı tarix son redaktəni göstərir.
