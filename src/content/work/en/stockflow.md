---
title: StockFlow — inventory with atomic transactions
description: StockFlow pairs a NestJS + Prisma/PostgreSQL backend with an Expo React Native app — atomic stock mutations, audit logs, 3-role RBAC and real-time activity.
headline: Inventory where the database is the single source of truth — every stock change is atomic, audited and broadcast in real time.
---

## Context

Inventory errors come from race conditions and untracked edits. StockFlow is built around one rule: stock levels never change without an audit-log entry written in the same transaction.

## What I built

- **A NestJS backend** with Prisma and PostgreSQL.
- **Atomic mutations.** Increases, decreases and transfers run in isolated transactions, each producing an audit-log entry linked to the acting user.
- **Security:** JWT and Passport authentication, bcrypt password hashing and three roles — admin, manager and staff — enforced across endpoints and the UI.
- **Real-time activity** over Socket.IO, plus activity notifications that show who changed what, where and by how much.
- **An Expo / React Native app** (Expo Router, Zustand, Reanimated) with swipe navigation and memoised lists designed for 1,000+ items.
- **Ready to run:** Android builds through Expo EAS and a public health-check endpoint (`/api/v1/health`) for deployment monitoring.

## Engineering notes

- **Single source of truth.** The client only reflects server state; it never computes stock itself.
- **Auditable by construction.** Because the log is written inside the same transaction, there is no code path that changes stock silently.

## Status

In active development since July 2026, under the working name “Supply Changer”.
