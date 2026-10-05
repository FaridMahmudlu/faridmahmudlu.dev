---
title: Parabola — divatpiactér méretillesztő motorral
description: A Parabola ajánlásalapú divatpiactér. Farid Mahmudlu építette a Java 17 / Spring Boot backendjét, benne a ruhaméretet ajánló illeszkedési motorral.
headline: Ajánlásalapú divatpiactér, amelynek backendje pontozza, mennyire illik egy ruhadarab egy adott testprofilhoz — és méretet ajánl.
---

## Háttér

Az online divatban a rossz méret az egyik leggyakoribb visszaküldési ok. A Parabola minden vásárló testprofilja alapján ajánl ruhadarabokat — és a megfelelő méretet. 2026 júliusában lettem a társalapítója; a backend- és adatbázis-fejlesztés az enyém volt, később a frontend szállításába is bekapcsolódtam.

## Amit építettem

- **Szolgáltatások** Java 17-ben és Spring Bootban, Spring Security és JWT védelemmel.
- **Tartománymodell** JPA-ban és PostgreSQL-ben felhasználókhoz, testprofilokhoz és ruhadarabokhoz.
- **Illeszkedési motor**, amely minden ruhadarabnál pontozza a felhasználó/testprofil kompatibilitását, és méretet ajánl.
- **OpenAPI-dokumentáció**, amely egyértelmű szerződést ad a frontend számára.
- **Frontend-funkciók** az élő piactérhez, miután a backend elkészült.

## Mérnöki jegyzetek

- **Szerződés először.** Az OpenAPI-val dokumentált API lehetővé tette, hogy a frontend a backenddel párhuzamosan haladjon.
- **Biztonság minden kérésnél.** A Spring Securityn keresztüli állapotmentes JWT-hitelesítés egyszerűen skálázhatóvá és átláthatóvá teszi az API-t.

## Eredmény

A Parabola élesben elindult. Közreműködtem a nyilvános indulásban és a csapat első ruhaüzletének bevonásában.
