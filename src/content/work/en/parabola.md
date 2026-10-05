---
title: Parabola — fashion marketplace with a size-fit engine
description: Parabola is a recommendation-based fashion marketplace. Farid Mahmudlu built its Java 17 / Spring Boot backend, including a fit engine that recommends sizes.
headline: A recommendation-based fashion marketplace whose backend scores how well a garment fits a specific body profile — and recommends the size.
---

## Context

In online fashion, a wrong size is one of the most common reasons for a return. Parabola recommends garments — and the right size — based on each shopper’s body profile. I co-founded it in July 2026, owned backend and database development, and later expanded into frontend delivery.

## What I built

- **Services** in Java 17 and Spring Boot, secured with Spring Security and JWT.
- **A domain model** in JPA and PostgreSQL for users, body profiles and garments.
- **A fit engine** that scores user/body-profile compatibility for each garment and recommends a size.
- **OpenAPI documentation** for the API, giving the frontend a clear contract to build against.
- **Frontend features** for the live marketplace once the backend was in place.

## Engineering notes

- **Contract-first.** Documenting the API with OpenAPI let frontend work move in parallel with the backend.
- **Security on every request.** Stateless JWT authentication through Spring Security keeps the API simple to scale and reason about.

## Outcome

Parabola went live. I supported the public launch and the team’s first clothing-store onboarding.
