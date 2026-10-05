---
title: Avalabs — AI social-media intelligence
description: Avalabs analyses Instagram content with a multimodal AI pipeline. Farid Mahmudlu led its entire technical build, from the database to model orchestration.
headline: An AI product that watches, listens to and reads social content — then explains what is working, with the model of your choice.
---

## Context

Creators and brands publish video faster than anyone can analyse it by hand. Avalabs turns Instagram content into structured insight. I co-founded it in February 2026 and led the entire technical implementation.

## What I built

- **The whole product surface:** frontend, backend, database, authentication and the Instagram integration.
- **A multimodal analysis pipeline.** FFmpeg extracts video frames and audio, Whisper transcribes speech, and the result is analysed together with Instagram context.
- **Model orchestration** with selectable providers — GPT, Gemini or Claude — behind one interface.

## Engineering notes

- **A pipeline, not a prompt.** Extraction, transcription and analysis are separate stages with clear inputs and outputs, so failures can be traced to a single step.
- **Provider-agnostic by design.** Switching the analysis model is a choice, not a rewrite.

## Stack

Next.js, TypeScript, Prisma, Supabase, Clerk, FFmpeg, Whisper, OpenAI GPT, Google Gemini and Anthropic Claude.
