---
title: CanvasFlow — şifrələnmiş Canvas LMS sinxronizasiyası
description: CanvasFlow istənilən Canvas LMS hesabını real vaxta yaxın sinxronlaşdırır, tokenləri AES-256-GCM ilə şifrələyir və anında web push göndərir.
headline: İstənilən universitetin Canvas LMS-inə qoşulan, tələbə tokenlərini şifrəli saxlayan və dəyişiklikləri baş verən kimi göndərən, məxfiliyi önə çəkən akademik panel.
---

## Kontekst

ELTE-də və bir çox digər universitetdə tələbələr Canvas LMS-də yaşayır, amma onun bildirişləri gec və dağınıqdır. CanvasFlow istənilən Canvas institutu ilə işləyən açıq mənbəli idarəetmə mərkəzidir.

## Nə qurdum

- **Çoxuniversitetli dəstək.** İstifadəçilər öz Canvas URL-lərini və şəxsi giriş tokenlərini qoşur.
- **Token təhlükəsizliyi.** Tokenlər AES-256-GCM ilə (təsadüfi 96-bit IV, 128-bit autentifikasiya teqləri) şifrələnmiş saxlanılır və heç vaxt brauzerə çatmır.
- **Adaptiv sinxronizasiya mühərriki** — Canvas rate-limit başlıqlarını oxuyur, 60 və 180 saniyəlik intervallar arasında keçir, HTTP 429-da geri çəkilir.
- **Serverless üçün təhlükəsiz icra:** 40 saniyəlik vaxt büdcəsi qoruyucusu və avtomatik bitən kilidlər icranı platforma limitləri daxilində saxlayır.
- **Hadisəyə əsaslanan Web Push (VAPID)** — yeni, açılmış və ya vaxtı dəyişdirilmiş tapşırıqlar və qiymətlər üçün, idempotent planlaşdırma ilə.
- **Möhkəmləndirmə:** autentifikasiya route-larında sliding-window rate limiting, open-redirect qorunması və cron endpoint-lərində timing-safe sirr yoxlaması.

## Mühəndislik qeydləri

- **Vacib yerlərdə test.** 51 unit və inteqrasiya testi token şifrələməsini, autentifikasiya təhlükəsizliyini, throttling-i, semestr təhlilini və tapşırıq prioritetini əhatə edir.

## Status

MIT lisenziyası ilə açıq mənbəlidir; 2026-cı ilin sentyabrından inkişafdadır.
