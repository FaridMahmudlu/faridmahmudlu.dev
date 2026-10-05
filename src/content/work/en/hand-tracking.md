---
title: Real-time hand tracking with GPU particles
description: A low-latency hand-tracking system built with MediaPipe and OpenCV, with One Euro filtering and gesture-driven OpenGL particle effects.
headline: A hand, tracked from a webcam in real time, conducting a field of particles — the project behind the particles on this site.
---

## Context

I wanted to understand the full loop of a real-time vision system — capture, inference, smoothing and rendering — inside a single frame budget.

## What I built

- **Low-latency capture** that always processes the latest camera frame.
- **MediaPipe Hands inference** with an optional GPU delegate and a CPU fallback.
- **One Euro filtering** and confidence-aware pose stabilisation to remove jitter without adding lag.
- **Gesture-driven effects** on a modular effect system, with particle pooling for stable frame times.
- **An on-screen overlay** showing FPS, inference time, render time, the detected gesture and its confidence.

## Stack

Prototyped with Python, MediaPipe and OpenCV. The repository implementation uses C++20, MediaPipe Tasks, OpenCV, SDL2, OpenGL 3.3, GLEW and CMake.

## On this site

The particle field you scrolled through is a descendant of this project. The hand in layer L05 is built on MediaPipe’s 21-landmark hand topology — the same skeleton the tracker follows.
