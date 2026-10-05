---
title: ShareVibe — QR-alapú közösségi platform kávézóknak
description: A ShareVibe több bérlős, QR-alapú kávézós közösségi platform, amelyet Farid Mahmudlu React, TypeScript és Firebase segítségével épített, szerepkör-alapú hozzáféréssel.
headline: A vendégek beolvassák az asztalon lévő QR-kódot, fotót osztanak meg és kampányjutalmakat oldanak fel — minden kávézó pedig saját, független munkaterületet kezel.
---

## Háttér

A kávézók szeretnék, ha a vendégek megosztanák az élményt; a vendégeknek ehhez ok kell. A ShareVibe az asztali QR-kódot márkázott, asztalhoz kötött folyamattá alakítja. 2026 áprilisában lettem a társalapítója, és full-stack fejlesztőként építettem fel.

## Amit építettem

- **Több bérlős modell.** Minden kávézó független munkaterület saját galériával, QR-folyamattal, témával és kampánnyal.
- **Asztalhoz kötött vendégfolyamatok**, amelyeket a QR-link azonosít: média feltöltése, felirat, kedvelés és megosztás.
- **Kampánylogika**, amely jutalmat mutat, amikor a megosztási cél teljesül.
- **Tulajdonosi és adminisztrátori panel** a márkázás, a kampányok és a médiafolyam kezeléséhez.

## Mérnöki jegyzetek

- **Hozzáférés az adatbázisban érvényesítve.** A Firestore- és Storage-biztonsági szabályok egyetlen hozzáférési listából generálódnak, így a kliensoldali ellenőrzések és a szerveroldali szabályok nem csúszhatnak szét.
- **Szerepkör-alapú hozzáférés** választja el a kávézótulajdonosokat a szuperadminisztrátoroktól; a kezelőfelületekhez ellenőrzött Google-fiók szükséges.
- **Megerősített hosting.** VDS-telepítést készítettem elő Nginx mögött, HTTPS-sel, a statikus fájlok hosszú távú gyorsítótárazásával és biztonsági fejlécekkel.

## Stack

React 19, TypeScript, Vite, Firebase Authentication, Cloud Firestore, Firebase Storage és Nginx.
