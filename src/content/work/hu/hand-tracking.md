---
title: Valós idejű kézkövetés GPU-részecskékkel
description: Alacsony késleltetésű kézkövető rendszer MediaPipe és OpenCV alapokon, One Euro szűréssel és gesztusvezérelt OpenGL-részecskeeffektekkel.
headline: Egy webkamerával valós időben követett kéz, amely részecskék mezejét vezényli — ez a projekt áll az oldal részecskéi mögött.
---

## Háttér

Meg akartam érteni egy valós idejű gépi látórendszer teljes körét — rögzítés, inferencia, simítás és renderelés — egyetlen képkocka időkeretén belül.

## Amit építettem

- **Alacsony késleltetésű rögzítés**, amely mindig a legfrissebb kamerakockát dolgozza fel.
- **MediaPipe Hands inferencia** opcionális GPU-delegálttal és CPU-tartalékkal.
- **One Euro szűrés** és megbízhatóságfüggő pózstabilizálás, amely késleltetés nélkül szünteti meg a remegést.
- **Gesztusvezérelt effektek** moduláris effektrendszeren, részecske-poolinggal a stabil képkockaidőkért.
- **Képernyős overlay**, amely mutatja az FPS-t, az inferencia- és renderidőt, a felismert gesztust és annak megbízhatóságát.

## Stack

Prototípus Pythonnal, MediaPipe-pal és OpenCV-vel. A repository implementációja C++20, MediaPipe Tasks, OpenCV, SDL2, OpenGL 3.3, GLEW és CMake.

## Ezen az oldalon

A részecskemező, amelyen végiggörgettél, ennek a projektnek a leszármazottja. Az L05 réteg keze a MediaPipe 21 pontos kéztopológiájára épül — ugyanarra a csontvázra, amelyet a követő is használ.
