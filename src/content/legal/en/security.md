---
title: Security policy
description: How to report a vulnerability in faridmahmudlu.dev, what is in scope, safe-harbour terms for good-faith research, and how the website is hardened.
updated: 2026-10-05
---

## Reporting a vulnerability

If you believe you have found a security issue on this website, please email me with the subject line **“Security”**. Include a description of the issue, the steps to reproduce it, its potential impact and, if possible, a proof of concept. Please do not include other people’s personal data.

A machine-readable contact file is published at [/.well-known/security.txt](/.well-known/security.txt) in line with RFC 9116.

## Scope

**In scope:** the website at `faridmahmudlu.dev`, including its HTTP response headers and configuration.

**Out of scope:**

- third-party services such as Cloudflare, GitHub, LinkedIn or Google — please report to them directly;
- the products listed in the portfolio — please contact their teams (if you are unsure, email me and I will forward your report);
- denial-of-service or volumetric testing, spam and social engineering;
- reports from automated scanners without a demonstrated impact;
- missing best-practice headers or settings without a practical exploit.

## Safe harbour

If you act in good faith and follow this policy, I will consider your research authorised and will not pursue legal action. Please:

- access only the minimum data needed to demonstrate the issue;
- avoid degrading the website for other visitors;
- give me reasonable time to fix the issue — normally 90 days — before disclosing it publicly.

## What to expect

I aim to acknowledge reports within five business days and to keep you informed until the issue is resolved. With your permission, I will gladly credit you. This is a personal website, so there is no paid bug bounty.

## How this website is hardened

- **Static by design:** no server-side code, database, forms or user accounts.
- **Strict Content Security Policy:** no inline scripts or styles, no `eval`, Trusted Types enforced, framing disabled.
- **Transport security:** HTTPS only, HSTS with preload; the `.dev` top-level domain is itself HSTS-preloaded.
- **Isolation headers:** `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-Content-Type-Options` and a restrictive `Permissions-Policy`.
- **Minimal third parties:** fonts and scripts are self-hosted; the only external script is Cloudflare’s cookieless analytics beacon.
- **Supply chain:** dependencies are pinned to exact versions, and new releases are installed only after a seven-day waiting period.
- **Privacy:** no cookies of its own, and the email address is never published in plain text in the HTML.
