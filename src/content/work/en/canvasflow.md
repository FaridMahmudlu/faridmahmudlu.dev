---
title: CanvasFlow — encrypted Canvas LMS sync for students
description: CanvasFlow syncs any Canvas LMS account in near real time, encrypts tokens with AES-256-GCM and sends instant web push alerts. Built with Next.js, Prisma, Supabase.
headline: A privacy-first academic dashboard that connects to any university’s Canvas LMS, keeps student tokens encrypted and pushes changes the moment they happen.
---

## Context

Students at ELTE and many other universities live in Canvas LMS, but its notifications are slow and scattered. CanvasFlow is an open-source command centre that works with any Canvas institution.

## What I built

- **Multi-university support.** Users connect their own Canvas URL and personal access token.
- **Token security.** Tokens are encrypted at rest with AES-256-GCM (random 96-bit IVs, 128-bit authentication tags) and never reach the browser.
- **An adaptive sync engine** that reads Canvas rate-limit headers and moves between 60- and 180-second intervals, backing off on HTTP 429.
- **Serverless-safe execution:** a 40-second time-budget guard and auto-expiring locks keep runs inside platform limits.
- **Event-driven Web Push (VAPID)** for new, unlocked or rescheduled tasks and posted grades, with idempotent scheduling.
- **Hardening:** sliding-window rate limiting on auth routes, open-redirect protection and timing-safe secret checks on cron endpoints.

## Engineering notes

- **Tested where it matters.** 51 unit and integration tests cover token encryption, auth security, throttling, semester parsing and task priority.

## Status

Open source under the MIT licence; in development since September 2026.
