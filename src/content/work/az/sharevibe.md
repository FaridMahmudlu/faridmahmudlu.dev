---
title: ShareVibe — kafelər üçün QR əsaslı sosial platforma
description: ShareVibe Farid Mahmudlunun React, TypeScript və Firebase ilə qurduğu, rol əsaslı girişli və möhkəmləndirilmiş hostinqli çox-tenantlı kafe platformasıdır.
headline: Qonaqlar masadakı QR kodu oxudur, foto paylaşır və kampaniya mükafatları qazanır — hər kafe isə öz müstəqil iş məkanını idarə edir.
---

## Kontekst

Kafelər qonaqların təcrübəni paylaşmasını istəyir; qonaqlar isə bunun üçün səbəb. ShareVibe masa QR kodunu brendləşdirilmiş, masaya xüsusi axına çevirir. 2026-cı ilin aprelində həmtəsisçisi oldum və onu full-stack developer kimi qurdum.

## Nə qurdum

- **Çox-tenantlı model.** Hər kafe öz qalereyası, QR axını, mövzusu və kampaniyası olan müstəqil iş məkanıdır.
- **Masaya xüsusi qonaq axınları** — QR linkindən müəyyən edilir: media yükləmə, izah əlavə etmə, bəyənmə və paylaşma.
- **Kampaniya məntiqi** — paylaşım hədəfinə çatanda mükafat göstərir.
- **Sahib və admin paneli** — brendinq, kampaniyalar və media axınının idarəsi üçün.

## Mühəndislik qeydləri

- **Giriş verilənlər bazasında tətbiq olunur.** Firestore və Storage təhlükəsizlik qaydaları vahid giriş siyahısından generasiya olunur, ona görə klient yoxlamaları ilə server qaydaları bir-birindən ayrıla bilmir.
- **Rol əsaslı giriş** kafe sahiblərini super-adminlərdən ayırır; idarəetmə ekranları təsdiqlənmiş Google hesabı tələb edir.
- **Möhkəmləndirilmiş hostinq.** Nginx arxasında HTTPS, statik fayllar üçün uzunmüddətli keşləmə və təhlükəsizlik başlıqları ilə VDS deploy-u hazırladım.

## Stack

React 19, TypeScript, Vite, Firebase Authentication, Cloud Firestore, Firebase Storage və Nginx.
