---
title: Hushplan — group plans that fit everyone’s budget
description: Hushplan lets a group plan together while everyone keeps a private spending limit. Founded and built end-to-end by Farid Mahmudlu with Flutter, Next.js and Supabase.
headline: Everyone sets a private spending limit; the group only sees which options fit — never who can spend what.
---

## Context

Group plans stall on one awkward question: how much can everyone spend? Hushplan removes it. Each member sets a private limit for a plan, and the group only sees which options fit. I founded Hushplan in September 2026 and built it on my own — from the database schema to the store listing.

## What I built

- **A Flutter app** for Android (iOS-ready) with Riverpod and go_router, and a **Next.js 16 website** for invite links, joining from any browser, the plan view and the legal pages.
- **A Supabase backend in the EU** (Frankfurt): PostgreSQL with row-level security, privacy-preserving RPC functions, Realtime, and Edge Functions for place search and push notifications over FCM.
- **Plan features:** date polls, split totals, quiet checks, RSVPs, reactions, decide-by deadlines with reminders and anonymous nudges.
- **Seven languages and 36 currencies**, with every amount stored as integer minor units.

## Privacy by construction

- Limits and quiet-check answers live in a schema the API does not expose. Clients write only through functions that validate membership and never return another person’s limit.
- Group figures appear only once at least four people have set a limit, and they are rounded down. A quiet check’s result is published only after everyone asked has answered.
- Private data is deleted automatically after a plan ends. On Android, the limit screen uses an in-app keypad and blocks screenshots.
- Every privacy rule is covered by pgTAP tests. Guests are protected by Cloudflare Turnstile and can upgrade to a Google account in place.

## Shipping

- Every screen is tested at six screen sizes and two text scales, in every language.
- CI runs on every push, a scheduled workflow takes daily encrypted database backups, and the website sends a nonce-based Content Security Policy.
- Version 1.0 is in Google Play internal testing; the website is live at [hushplan.app](https://hushplan.app/).
