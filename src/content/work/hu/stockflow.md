---
title: StockFlow — készletkezelés atomi tranzakciókkal
description: A StockFlow NestJS + Prisma/PostgreSQL backendet és Expo React Native alkalmazást kombinál — atomi készletmódosítások, audit-napló, háromszintű RBAC, valós idő.
headline: Készletkezelés, ahol az adatbázis az egyetlen igazságforrás — minden készletváltozás atomi, auditált és valós időben közvetített.
---

## Háttér

A készlethibák versenyhelyzetekből és nyomon nem követett módosításokból fakadnak. A StockFlow egyetlen szabályra épül: a készletszint soha nem változik az ugyanabban a tranzakcióban megírt audit-napló bejegyzés nélkül.

## Amit építettem

- **NestJS backend** Prismával és PostgreSQL-lel.
- **Atomi módosítások.** A növelés, csökkentés és áthelyezés izolált tranzakciókban fut, és mindegyik a műveletet végző felhasználóhoz kötött audit-napló bejegyzést hoz létre.
- **Biztonság:** JWT és Passport hitelesítés, bcrypt jelszó-hashelés és három szerepkör — admin, menedzser, munkatárs — az endpointokban és a felületen egyaránt.
- **Valós idejű aktivitás** Socket.IO-n keresztül, valamint értesítések arról, ki, mit, hol és mennyivel változtatott.
- **Expo / React Native alkalmazás** (Expo Router, Zustand, Reanimated) swipe-navigációval és 1000+ elemre tervezett memoizált listákkal.
- **Üzemkész:** Android-buildek Expo EAS-szel és nyilvános health-check endpoint (`/api/v1/health`) a telepítés figyeléséhez.

## Mérnöki jegyzetek

- **Egyetlen igazságforrás.** A kliens csak tükrözi a szerver állapotát; a készletet soha nem számolja ki maga.
- **Felépítéséből adódóan auditálható.** Mivel a napló ugyanabban a tranzakcióban íródik, nincs olyan kódút, amely csendben módosítaná a készletet.

## Állapot

2026 júliusa óta aktív fejlesztés alatt, „Supply Changer” munkanéven.
