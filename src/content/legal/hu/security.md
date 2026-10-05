---
title: Biztonsági szabályzat
description: Hogyan jelents be sérülékenységet a faridmahmudlu.dev oldalon, mi tartozik a hatókörbe, a jóhiszemű kutatás védelme, és hogyan van megerősítve a weboldal.
updated: 2026-10-05
---

## Sérülékenység bejelentése

Ha úgy gondolod, hogy biztonsági hibát találtál a weboldalon, írj nekem e-mailt **„Security”** tárgysorral. Írd le a problémát, a reprodukálás lépéseit, a lehetséges hatását, és ha lehet, csatolj proof of conceptet. Kérlek, ne küldj más személyek személyes adatait.

Az RFC 9116 szerinti, gépi feldolgozásra alkalmas kapcsolattartási fájl a [/.well-known/security.txt](/.well-known/security.txt) címen érhető el.

## Hatókör

**Hatókörbe tartozik:** a `faridmahmudlu.dev` weboldal, beleértve a HTTP-válaszfejléceit és a konfigurációját.

**Nem tartozik a hatókörbe:**

- harmadik fél szolgáltatásai, például a Cloudflare, a GitHub, a LinkedIn vagy a Google — kérlek, közvetlenül nekik jelezd;
- a portfólióban szereplő termékek — fordulj a csapatukhoz (ha bizonytalan vagy, írj nekem, és továbbítom a bejelentést);
- túlterheléses (DoS) vagy volumetrikus tesztelés, spam és social engineering;
- automatizált szkennerek jelentései bizonyított hatás nélkül;
- hiányzó „best practice” fejlécek vagy beállítások gyakorlati kihasználhatóság nélkül.

## Jóhiszemű kutatás védelme

Ha jóhiszeműen jársz el és betartod ezt a szabályzatot, a kutatásodat engedélyezettnek tekintem, és nem indítok jogi lépéseket. Kérlek:

- csak a hiba bemutatásához szükséges minimális adathoz férj hozzá;
- ne rontsd a weboldal működését más látogatók számára;
- adj észszerű időt a javításra — általában 90 napot — a nyilvános közzététel előtt.

## Mire számíthatsz

Igyekszem öt munkanapon belül visszaigazolni a bejelentéseket, és a megoldásig tájékoztatni. Az engedélyeddel szívesen feltüntetem a neved. Mivel ez személyes weboldal, fizetős bug bounty program nincs.

## Hogyan van megerősítve a weboldal

- **Statikus felépítés:** nincs szerveroldali kód, adatbázis, űrlap vagy felhasználói fiók.
- **Szigorú Content Security Policy:** nincs inline szkript vagy stílus, nincs `eval`, a Trusted Types kötelező, a keretbe ágyazás tiltott.
- **Átviteli biztonság:** kizárólag HTTPS, HSTS preloaddal; maga a `.dev` legfelső szintű domain is szerepel a HSTS preload listán.
- **Izolációs fejlécek:** `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-Content-Type-Options` és szigorú `Permissions-Policy`.
- **Minimális harmadik fél:** a betűtípusok és szkriptek saját tárhelyen vannak; az egyetlen külső szkript a Cloudflare sütimentes analitikai szkriptje.
- **Ellátási lánc:** a függőségek pontos verzióra rögzítettek, az új kiadások pedig csak hétnapos várakozási idő után kerülnek telepítésre.
- **Adatvédelem:** a weboldalnak nincsenek saját sütijei, és az e-mail-cím soha nem jelenik meg nyílt szövegként a HTML-ben.
