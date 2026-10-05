---
title: ShareVibe — QR-based social platform for cafes
description: ShareVibe is a multi-tenant, QR-based cafe social platform built by Farid Mahmudlu with React, TypeScript and Firebase, with role-based access and hardened hosting.
headline: Guests scan a QR code at their table, share photos and unlock campaign rewards — while every cafe runs its own independent workspace.
---

## Context

Cafes want guests to share the experience; guests want a reason to. ShareVibe turns a table QR code into a branded, table-specific flow. I co-founded it in April 2026 and built it as a full-stack developer.

## What I built

- **A multi-tenant model.** Each cafe is an independent workspace with its own gallery, QR flow, theme and campaign.
- **Table-specific guest flows** resolved from the QR link: upload, caption, like and share media.
- **Campaign logic** that shows a reward once a sharing goal is reached.
- **An owner and admin panel** to manage branding, campaigns and the media feed.

## Engineering notes

- **Access enforced in the database.** Firestore and Storage security rules are generated from a single access list, so client-side checks and server-side rules cannot drift apart.
- **Role-based access** separates cafe owners from super-admins; management screens require a verified Google account.
- **Hardened hosting.** I prepared a VDS deployment behind Nginx with HTTPS, long-lived caching for static assets and security headers.

## Stack

React 19, TypeScript, Vite, Firebase Authentication, Cloud Firestore, Firebase Storage and Nginx.
