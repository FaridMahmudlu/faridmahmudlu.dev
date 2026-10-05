---
title: Calisiyo — tanulástervező SaaS a YKS-vizsgához
description: Farid Mahmudlu társalapítóként építi a Calisiyót, a YKS-vizsgára felkészítő SaaS-t — Next.js, Supabase Realtime, OAuth/PKCE, PostHog, Sentry, Playwright.
headline: Éles üzemre tervezett tanulási SaaS a török YKS egyetemi felvételire készülő diákoknak — tervezés, fókusz és ismétlés egy helyen.
---

## Háttér

A YKS-re készülő diákok füzetek, táblázatok és több alkalmazás között zsonglőrködnek a tantárgyakkal, próbavizsgákkal és ismétlési tervekkel. A Calisiyo egyetlen termékbe hozza a tervezést, a fókuszált tanulást és az ismétlést. 2026 augusztusában lettem a társalapítója, és full-stack fejlesztőként dolgozom rajta.

## Amit építettem

- **Tanulási folyamatok** Next.js-ben és Reactben: tervezés, Pomodoro-időzítő, célok, forráskönyvtár, próbavizsga-követés és térközös ismétlés.
- **Adat és hitelesítés Supabase-en**: migrációkkal és triggerekkel fejlesztett PostgreSQL-séma, Realtime frissítések és privát tárolási szabályzatok a felhasználói fájlokhoz.
- **Hitelesítés** OAuth-tal és PKCE-vel.
- **Web push** értesítések, hogy a diákok visszataláljanak a tervükhöz.

## Mérnöki jegyzetek

- **Konzisztencia az adatbázisban.** A migrációk és triggerek a forrásnál tartják konzisztensen az összefüggő adatokat, így egyetlen képernyőnek sem kell utólag összefésülnie őket.
- **Megfigyelhetőség az első naptól.** A PostHog (termékanalitika) és a Sentry (hibafigyelés) a termék része, nem utólagos kiegészítés.
- **Validált folyamatok.** A kritikus felhasználói utakat Playwright ellenőrzi end-to-end.

## Állapot

Élesben elérhető a [calisiyo.com.tr](https://calisiyo.com.tr/) címen, aktív fejlesztés alatt.
