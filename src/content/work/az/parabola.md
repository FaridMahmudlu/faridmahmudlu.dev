---
title: Parabola — ölçü uyğunluq mühərrikli moda marketpleysi
description: Parabola tövsiyə əsaslı moda marketpleysidir. Farid Mahmudlu onun Java 17 / Spring Boot backend-ini, o cümlədən ölçü tövsiyə edən fit mühərrikini qurub.
headline: Backend-i geyimin konkret bədən profilinə nə qədər uyğun olduğunu qiymətləndirən və ölçünü tövsiyə edən, tövsiyə əsaslı moda marketpleysi.
---

## Kontekst

Onlayn modada səhv ölçü geri qaytarmaların ən çox rast gəlinən səbəblərindəndir. Parabola hər alıcının bədən profilinə əsasən geyim — və düzgün ölçü — tövsiyə edir. 2026-cı ilin iyulunda həmtəsisçisi oldum, backend və verilənlər bazası inkişafına cavabdeh idim, sonra frontend-ə də keçdim.

## Nə qurdum

- **Servislər** — Java 17 və Spring Boot ilə, Spring Security və JWT ilə qorunan.
- **Domen modeli** — istifadəçilər, bədən profilləri və geyimlər üçün JPA və PostgreSQL-də.
- **Fit mühərriki** — hər geyim üçün istifadəçi/bədən profili uyğunluğunu qiymətləndirir və ölçü tövsiyə edir.
- **OpenAPI sənədləri** — frontend-ə qurulmaq üçün aydın müqavilə verir.
- **Frontend funksiyaları** — backend hazır olandan sonra canlı marketpleys üçün.

## Mühəndislik qeydləri

- **Əvvəl müqavilə.** API-nin OpenAPI ilə sənədləşdirilməsi frontend işinin backend ilə paralel getməsinə imkan verdi.
- **Hər sorğuda təhlükəsizlik.** Spring Security üzərindən stateless JWT autentifikasiyası API-ni miqyaslamağı və başa düşməyi sadə saxlayır.

## Nəticə

Parabola canlı yayıma çıxdı. İctimai buraxılışa və komandanın ilk geyim mağazasının platformaya qoşulmasına dəstək verdim.
