---
title: Calisiyo — YKS study-planning SaaS
description: How Farid Mahmudlu co-builds Calisiyo, a study SaaS for Turkey’s YKS exam, with Next.js, Supabase Realtime, OAuth/PKCE, PostHog, Sentry and Playwright.
headline: A production-oriented study SaaS for students preparing for Turkey’s YKS university entrance exam — planning, focus and review in one place.
---

## Context

Students preparing for the YKS juggle subjects, mock exams and revision schedules across notebooks, spreadsheets and several apps. Calisiyo brings planning, focused study and review into one product. I co-founded it in August 2026 and work on it as a full-stack developer.

## What I built

- **Study flows** in Next.js and React: planning, a Pomodoro timer, goals, a resource library, mock-exam tracking and spaced review.
- **Data and auth on Supabase**: a PostgreSQL schema evolved through migrations and triggers, Realtime updates, and private storage policies for user files.
- **Authentication** with OAuth and PKCE.
- **Web push** notifications to bring students back to their plan.

## Engineering notes

- **Consistency in the database.** Migrations and triggers keep related data consistent at the source, instead of asking every screen to reconcile it.
- **Observability from day one.** PostHog (product analytics) and Sentry (error monitoring) are part of the product, not an afterthought.
- **Validated journeys.** Critical flows are checked end-to-end with Playwright.

## Status

Live at [calisiyo.com.tr](https://calisiyo.com.tr/) and in active development.
