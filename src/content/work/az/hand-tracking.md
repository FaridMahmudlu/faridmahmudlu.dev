---
title: GPU partikülləri ilə real vaxt əl izləmə
description: MediaPipe və OpenCV ilə qurulmuş, One Euro filtrasiyası və jestlərlə idarə olunan OpenGL partikül effektləri olan aşağı gecikməli əl izləmə sistemi.
headline: Vebkameradan real vaxtda izlənilən əl partikül sahəsini idarə edir — bu saytdakı partikülların arxasındakı layihə.
---

## Kontekst

Real vaxt görmə sisteminin tam dövrəsini — çəkiliş, inference, hamarlaşdırma və render — bir kadr büdcəsi daxilində başa düşmək istəyirdim.

## Nə qurdum

- **Aşağı gecikməli çəkiliş** — həmişə ən son kamera kadrını emal edir.
- **MediaPipe Hands inference** — istəyə bağlı GPU delegate və CPU ehtiyatı ilə.
- **One Euro filtrasiyası** və etibar səviyyəsinə əsaslanan poz stabilləşdirməsi — gecikmə əlavə etmədən titrəməni aradan qaldırır.
- **Jestlərlə idarə olunan effektlər** — modul effekt sistemi üzərində, sabit kadr vaxtları üçün partikül pooling ilə.
- **Ekran üzərində panel** — FPS, inference vaxtı, render vaxtı, aşkarlanan jest və onun etibar səviyyəsi.

## Stack

Python, MediaPipe və OpenCV ilə prototiplənib. Repozitoriyadakı icra C++20, MediaPipe Tasks, OpenCV, SDL2, OpenGL 3.3, GLEW və CMake istifadə edir.

## Bu saytda

Aşağı sürüşdürdüyünüz partikül sahəsi bu layihənin davamçısıdır. L05 qatındakı əl MediaPipe-ın 21 nöqtəli əl topologiyası üzərində qurulub — izləyicinin izlədiyi eyni skelet.
