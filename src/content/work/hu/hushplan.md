---
title: Hushplan — csoportos tervek privát költési limittel
description: A Hushplannel a csoport együtt tervez, miközben mindenki költési limitje privát marad. Farid Mahmudlu alapította és építette Flutterrel, Next.js-szel és Supabase-zel.
headline: Mindenki megad egy privát költési limitet; a csoport csak azt látja, mely lehetőségek férnek bele — azt soha, ki mennyit költhet.
---

## Háttér

A csoportos tervek gyakran egyetlen kínos kérdésen akadnak el: ki mennyit tud költeni? A Hushplan ezt a kérdést szünteti meg. Minden tag privát limitet állít be egy tervhez, a csoport pedig csak azt látja, mely lehetőségek férnek bele. A Hushplant 2026 szeptemberében alapítottam, és egyedül építettem fel — az adatbázissémától az áruházi oldalig.

## Amit építettem

- **Flutter-alkalmazás** Androidra (iOS-re felkészítve) Riverpoddal és go_routerrel, valamint **Next.js 16 weboldal** a meghívó linkekhez, a bármely böngészőből való csatlakozáshoz, a tervnézethez és a jogi oldalakhoz.
- **Supabase backend az EU-ban** (Frankfurt): PostgreSQL row-level securityvel, adatvédelmet megőrző RPC-függvények, Realtime, valamint Edge Functions a helykereséshez és az FCM-en keresztüli push értesítésekhez.
- **Tervfunkciók:** dátumszavazás, közös költség felosztása, csendes egyeztetések (quiet checks), részvételi visszajelzés, reakciók, döntési határidők emlékeztetőkkel és névtelen noszogatás.
- **Hét nyelv és 36 pénznem**; minden összeg egész számként, a legkisebb pénzegységben tárolódik.

## Adatvédelem a felépítésből adódóan

- A limitek és a csendes egyeztetések válaszai olyan sémában élnek, amelyet az API nem tesz elérhetővé. A kliensek csak tagságot ellenőrző függvényeken keresztül írnak, amelyek soha nem adják vissza más limitjét.
- A csoportos számok csak akkor jelennek meg, ha legalább négyen beállították a limitjüket, és lefelé kerekítve. Egy csendes egyeztetés eredménye csak akkor jelenik meg, ha minden megkérdezett válaszolt.
- A terv lezárulta után a privát adatok automatikusan törlődnek. Androidon a limitképernyő alkalmazáson belüli billentyűzetet használ, és tiltja a képernyőképeket.
- Minden adatvédelmi szabályt pgTAP-tesztek fednek le. A vendégeket a Cloudflare Turnstile védi, és helyben Google-fiókra válthatnak.

## Kiadás

- Minden képernyőt minden nyelven hat képernyőméreten és két szövegméretben tesztelünk.
- Minden pushnál CI fut, egy ütemezett munkafolyamat naponta titkosított adatbázis-mentést készít, a weboldal pedig nonce-alapú Content Security Policyt küld.
- Az 1.0-s verzió a Google Play belső tesztelésében van; a weboldal élesben elérhető: [hushplan.app](https://hushplan.app/).
