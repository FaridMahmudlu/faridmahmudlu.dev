---
title: CanvasFlow — titkosított Canvas LMS-szinkron
description: A CanvasFlow közel valós időben szinkronizál bármely Canvas LMS-fiókot, AES-256-GCM-mel titkosítja a tokeneket, és azonnali web push értesítést küld.
headline: Adatvédelem-központú tanulmányi irányítópult, amely bármely egyetem Canvas LMS-éhez csatlakozik, titkosítva tartja a hallgatói tokeneket, és azonnal jelzi a változásokat.
---

## Háttér

Az ELTE és sok más egyetem hallgatói a Canvas LMS-ben élnek, de az értesítései lassúak és szétszórtak. A CanvasFlow nyílt forráskódú vezérlőközpont, amely bármely Canvas-intézménnyel működik.

## Amit építettem

- **Több egyetem támogatása.** A felhasználók a saját Canvas URL-jüket és személyes hozzáférési tokenjüket csatlakoztatják.
- **Tokenbiztonság.** A tokenek AES-256-GCM-mel titkosítva tárolódnak (véletlen 96 bites IV, 128 bites hitelesítési címke), és soha nem jutnak el a böngészőig.
- **Adaptív szinkronizációs motor**, amely kiolvassa a Canvas rate-limit fejléceit, 60 és 180 másodperces intervallumok között vált, és HTTP 429 esetén visszalép.
- **Serverless-biztos futás:** 40 másodperces időkeret-védelem és automatikusan lejáró zárolások tartják a futásokat a platformkorlátokon belül.
- **Eseményvezérelt Web Push (VAPID)** új, feloldott vagy átütemezett feladatokhoz és rögzített jegyekhez, idempotens ütemezéssel.
- **Megerősítés:** csúszóablakos rate limiting a hitelesítési útvonalakon, open-redirect elleni védelem és időzítésbiztos titokellenőrzés a cron-endpointokon.

## Mérnöki jegyzetek

- **Tesztelve, ahol számít.** 51 unit- és integrációs teszt fedi le a tokentitkosítást, a hitelesítés biztonságát, a throttlingot, a félév-felismerést és a feladatprioritást.

## Állapot

Nyílt forráskódú (MIT licenc); 2026 szeptembere óta fejlesztés alatt.
