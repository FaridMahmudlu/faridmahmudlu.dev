---
title: Avalabs — AI-alapú közösségimédia-elemzés
description: Az Avalabs multimodális AI-folyamattal elemzi az Instagram-tartalmakat. Farid Mahmudlu vezette a teljes technikai megvalósítást az adatbázistól a modellek vezényléséig.
headline: AI-termék, amely nézi, hallgatja és olvassa a közösségi tartalmakat — majd a választott modellel elmagyarázza, mi működik.
---

## Háttér

Az alkotók és márkák gyorsabban publikálnak videót, mint ahogy bárki kézzel elemezni tudná. Az Avalabs az Instagram-tartalmakat strukturált felismerésekké alakítja. 2026 februárjában lettem a társalapítója, és én vezettem a teljes technikai megvalósítást.

## Amit építettem

- **A teljes termék:** frontend, backend, adatbázis, hitelesítés és az Instagram-integráció.
- **Multimodális elemzőfolyamat.** Az FFmpeg képkockákat és hangot nyer ki a videóból, a Whisper átírja a beszédet, az eredményt pedig az Instagram-kontextussal együtt elemezzük.
- **Modellvezénylés** választható szolgáltatókkal — GPT, Gemini vagy Claude — egyetlen interfész mögött.

## Mérnöki jegyzetek

- **Folyamat, nem prompt.** A kinyerés, az átírás és az elemzés külön szakaszok egyértelmű bemenettel és kimenettel, így a hibák egyetlen lépésig visszakövethetők.
- **Szolgáltatófüggetlen tervezés.** Az elemzőmodell cseréje választás kérdése, nem újraírásé.

## Stack

Next.js, TypeScript, Prisma, Supabase, Clerk, FFmpeg, Whisper, OpenAI GPT, Google Gemini és Anthropic Claude.
