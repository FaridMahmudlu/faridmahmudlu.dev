---
title: Calisiyo — YKS üçün təhsil planlaşdırma SaaS-ı
description: Farid Mahmudlu Türkiyənin YKS imtahanı üçün Calisiyo SaaS-ını Next.js, Supabase Realtime, OAuth/PKCE, PostHog, Sentry və Playwright ilə birgə qurur.
headline: Türkiyənin YKS universitet qəbul imtahanına hazırlaşan tələbələr üçün production yönümlü təhsil SaaS-ı — planlaşdırma, fokus və təkrar bir yerdə.
---

## Kontekst

YKS-yə hazırlaşan tələbələr fənləri, sınaq imtahanlarını və təkrar cədvəllərini dəftərlər, cədvəllər və bir neçə tətbiq arasında idarə edir. Calisiyo planlaşdırmanı, fokuslu dərsi və təkrarı bir məhsulda birləşdirir. 2026-cı ilin avqustunda onun həmtəsisçisi oldum və full-stack developer kimi üzərində işləyirəm.

## Nə qurdum

- **Təhsil axınları** — Next.js və React ilə: planlaşdırma, Pomodoro taymeri, hədəflər, resurs kitabxanası, sınaq imtahanı izləmə və aralıqlı təkrar.
- **Supabase üzərində data və autentifikasiya**: miqrasiyalar və trigger-lərlə inkişaf etdirilən PostgreSQL sxemi, Realtime yeniləmələr və istifadəçi faylları üçün private storage siyasətləri.
- **Autentifikasiya** — OAuth və PKCE ilə.
- **Web push** bildirişləri — tələbələri planlarına qaytarmaq üçün.

## Mühəndislik qeydləri

- **Ardıcıllıq verilənlər bazasında.** Miqrasiyalar və trigger-lər əlaqəli datanı mənbədə ardıcıl saxlayır; hər ekranın bunu ayrıca uzlaşdırmasına ehtiyac qalmır.
- **İlk gündən müşahidə.** PostHog (məhsul analitikası) və Sentry (xəta monitorinqi) sonradan əlavə edilmiş deyil, məhsulun bir hissəsidir.
- **Yoxlanılmış axınlar.** Kritik istifadəçi yolları Playwright ilə end-to-end yoxlanılır.

## Status

[calisiyo.com.tr](https://calisiyo.com.tr/) ünvanında canlıdır və aktiv inkişaf mərhələsindədir.
