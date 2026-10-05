---
title: Hushplan — hər kəsin büdcəsinə uyğun qrup planları
description: Hushplan qrupun birgə plan qurmasına imkan verir, hər kəsin xərc limiti isə şəxsi qalır. Farid Mahmudlu onu Flutter, Next.js və Supabase ilə təsis edib və qurub.
headline: Hər kəs şəxsi xərc limiti təyin edir; qrup yalnız hansı seçimlərin uyğun olduğunu görür — kimin nə qədər xərcləyə biləcəyini yox.
---

## Kontekst

Qrup planları adətən bir narahat sualda ilişib qalır: hər kəs nə qədər xərcləyə bilər? Hushplan bu sualı aradan qaldırır. Hər üzv plan üçün şəxsi limit təyin edir, qrup isə yalnız uyğun seçimləri görür. Hushplan-ı 2026-cı ilin sentyabrında təsis etdim və təkbaşına qurdum — verilənlər bazası sxemindən mağaza səhifəsinə qədər.

## Nə qurdum

- **Flutter tətbiqi** — Android üçün (iOS-a hazır), Riverpod və go_router ilə; dəvət linkləri, istənilən brauzerdən qoşulma, plan görünüşü və hüquqi səhifələr üçün **Next.js 16 saytı**.
- **Aİ-də Supabase backend-i** (Frankfurt): row-level security ilə PostgreSQL, məxfiliyi qoruyan RPC funksiyaları, Realtime, məkan axtarışı və FCM üzərindən push bildirişləri üçün Edge Functions.
- **Plan funksiyaları:** tarix səsvermələri, ümumi xərcin bölünməsi, gizli yoxlamalar (quiet checks), iştirak təsdiqi, reaksiyalar, xatırlatmalı qərar müddətləri və anonim xatırlatmalar.
- **Yeddi dil və 36 valyuta**; hər məbləğ tam ədəd kimi ən kiçik pul vahidində saxlanılır.

## Strukturca məxfilik

- Limitlər və gizli yoxlama cavabları API-nin açmadığı sxemdə saxlanılır. Klientlər yalnız üzvlüyü yoxlayan və heç vaxt başqasının limitini qaytarmayan funksiyalar vasitəsilə yazır.
- Qrup göstəriciləri yalnız ən azı dörd nəfər limit təyin etdikdən sonra görünür və aşağı yuvarlaqlaşdırılır. Gizli yoxlamanın nəticəsi yalnız soruşulan hər kəs cavab verdikdən sonra dərc olunur.
- Plan bitdikdən sonra şəxsi məlumatlar avtomatik silinir. Android-də limit ekranı tətbiqdaxili klaviaturadan istifadə edir və ekran görüntüsünü bloklayır.
- Hər məxfilik qaydası pgTAP testləri ilə əhatə olunub. Qonaqlar Cloudflare Turnstile ilə qorunur və hesablarını yerində Google hesabına çevirə bilirlər.

## Buraxılış

- Hər ekran hər dildə altı ekran ölçüsündə və iki mətn miqyasında test olunur.
- Hər push-da CI işləyir, planlaşdırılmış iş axını hər gün verilənlər bazasının şifrələnmiş ehtiyat nüsxəsini çıxarır, sayt isə nonce əsaslı Content Security Policy göndərir.
- 1.0 versiyası Google Play internal testing-dədir; sayt [hushplan.app](https://hushplan.app/) ünvanında canlıdır.
