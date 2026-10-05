---
title: StockFlow — atomik tranzaksiyalı inventar sistemi
description: StockFlow NestJS + Prisma/PostgreSQL backend-i Expo React Native tətbiqi ilə birləşdirir — atomik stok dəyişiklikləri, audit log, 3 rollu RBAC və real vaxt.
headline: Verilənlər bazasının yeganə həqiqət mənbəyi olduğu inventar — hər stok dəyişikliyi atomikdir, audit olunur və real vaxtda yayımlanır.
---

## Kontekst

İnventar xətaları race condition-lardan və izlənilməyən dəyişikliklərdən yaranır. StockFlow bir qayda üzərində qurulub: stok səviyyəsi həmin tranzaksiyada yazılmış audit-log qeydi olmadan heç vaxt dəyişmir.

## Nə qurdum

- **NestJS backend** — Prisma və PostgreSQL ilə.
- **Atomik dəyişikliklər.** Artırma, azaltma və transfer izolyasiya olunmuş tranzaksiyalarda icra olunur və hər biri əməliyyatı edən istifadəçiyə bağlı audit-log qeydi yaradır.
- **Təhlükəsizlik:** JWT və Passport autentifikasiyası, bcrypt ilə parol heşləmə və endpoint-lər ilə UI boyunca tətbiq olunan üç rol — admin, menecer və işçi.
- **Real vaxt fəaliyyət** — Socket.IO üzərindən, həmçinin kimin nəyi, harada və nə qədər dəyişdiyini göstərən bildirişlər.
- **Expo / React Native tətbiqi** (Expo Router, Zustand, Reanimated) — swipe naviqasiyası və 1000+ element üçün nəzərdə tutulmuş memo-laşdırılmış siyahılarla.
- **İşə hazır:** Expo EAS ilə Android build-ləri və deploy monitorinqi üçün ictimai health-check endpoint-i (`/api/v1/health`).

## Mühəndislik qeydləri

- **Yeganə həqiqət mənbəyi.** Klient yalnız server vəziyyətini əks etdirir; stoku heç vaxt özü hesablamır.
- **Strukturca audit oluna bilən.** Log eyni tranzaksiyanın içində yazıldığı üçün stoku səssizcə dəyişən heç bir kod yolu yoxdur.

## Status

2026-cı ilin iyulundan “Supply Changer” işçi adı ilə aktiv inkişafdadır.
