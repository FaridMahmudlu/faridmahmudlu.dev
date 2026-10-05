---
title: Avalabs — AI sosial media analitikası
description: Avalabs Instagram kontentini multimodal AI pipeline ilə analiz edir. Farid Mahmudlu verilənlər bazasından model orkestrasiyasına qədər bütün texniki işə rəhbərlik edib.
headline: Sosial kontenti izləyən, dinləyən və oxuyan, sonra isə seçdiyiniz modellə nəyin işlədiyini izah edən AI məhsulu.
---

## Kontekst

Kreatorlar və brendlər videonu heç kimin əl ilə analiz edə bilməyəcəyi sürətlə paylaşır. Avalabs Instagram kontentini strukturlaşdırılmış nəticələrə çevirir. 2026-cı ilin fevralında həmtəsisçisi oldum və bütün texniki icraya rəhbərlik etdim.

## Nə qurdum

- **Bütün məhsul:** frontend, backend, verilənlər bazası, autentifikasiya və Instagram inteqrasiyası.
- **Multimodal analiz pipeline-ı.** FFmpeg video kadrlarını və səsi çıxarır, Whisper nitqi transkripsiya edir, nəticə isə Instagram konteksti ilə birlikdə analiz olunur.
- **Model orkestrasiyası** — seçilə bilən provayderlərlə (GPT, Gemini və ya Claude), vahid interfeys arxasında.

## Mühəndislik qeydləri

- **Prompt deyil, pipeline.** Çıxarma, transkripsiya və analiz aydın giriş və çıxışları olan ayrı mərhələlərdir, ona görə xətanı konkret bir addıma qədər izləmək olur.
- **Provayderdən asılı olmayan dizayn.** Analiz modelini dəyişmək yenidən yazmaq deyil, sadəcə seçimdir.

## Stack

Next.js, TypeScript, Prisma, Supabase, Clerk, FFmpeg, Whisper, OpenAI GPT, Google Gemini və Anthropic Claude.
