# VibeLift — Vežba "u toku" (partial exercise + resume)

**Datum:** 2026-06-11
**Fajl koji se menja:** `index.html` (root — ne `website/index.html`)

## Problem

1. Korisnik želi da završi vežbu ranije i pređe na drugu, ali da se prvoj može vratiti i dovršiti je.
2. Ako ne otvori app u ~5 min (telefon ubije karticu u pozadini), nedovršeni setovi nestaju i mora ispočetka.
3. Nema vizuelne oznake da je vežba "delimično odrađena".

Sva tri se rešavaju jednom promenom: nedovršena vežba postaje pravo stanje koje se odmah snima i kome se može vratiti.

## Tri stanja vežbe u treningu

- **Nije počela** — nije u `current.exercises` (kao i sad).
- **U toku (`status: 'partial'`)** — ima bar jedan set, korisnik je nije označio kao gotovu.
- **Gotova (`status: 'done'`)** — korisnik je ručno označio kao završenu (zelena kvačica, kao i sad).

## Model podataka

Svaka stavka u `current.exercises` dobija polja za nastavak:

```js
{
  ...exercise,          // id, name, group, gl, eq, img, ...
  sets: [...],          // odrađeni setovi
  status: 'partial' | 'done',
  totalSets,            // planirani broj setova
  weightType,           // 'free' | 'barbell' | 'bodyweight'
  warmup                // 'done' | 'skipped' | 'pending'
}
```

- Stavka se kreira tek kad se odradi **prvi set** (nema praznih "u toku" vežbi).
- `fittrack_log_state` (poseban privremeni zapis vezan za jednu vežbu) se **uklanja**. Bio je uzrok gubitka posle 5 min. Sve ide u `current`, koji se već snima u `fittrack_current` na svaku promenu (`useEffect` na `current`).

## Ponašanje — Log screen

- **Complete Set N** — beleži set i **odmah ga upisuje u `current`** (status `partial`). Ovo je ključno za snimanje u realnom vremenu.
- **Strelica nazad** — više NE briše setove. Samo izlazi; vežba ostaje `partial` u `current`.
- **"Stop Early & Save"** → preimenuje se u **"Pauza, vraćam se"** — sačuva kao `partial` i izađe.
- **"Mark Exercise Complete"** — označi vežbu kao `done` (radi i pre svih planiranih setova).
- **Nastavak:** kad se tapne vežba koja je `partial`, Log screen se inicijalizuje iz sačuvane stavke:
  - `doneSets` = sačuvani `sets`
  - `currentSet` = `sets.length + 1`
  - `warmup` = sačuvan (pretpostavka `done` ako već ima setova)
  - `weightType`, `totalSets` = sačuvani
  - Polja za težinu/reps se popunjavaju iz **poslednjeg sačuvanog seta** te vežbe (pogodnost; plate picker kreće prazan — korisnik ponovo izabere ploče za sledeći set).

Napomena (van obima): tačno pamćenje plate konfiguracije i `barType` između pauza nije u ovom obimu — vraća se na unos po setu. Dovoljno za traženi tok.

## Ponašanje — lista vežbi (group-select i group-detail)

Umesto jedne `completedIds` liste, App računa:
- `doneIds` — vežbe sa `status: 'done'`
- `partialMap` — `{ exerciseId: brojSetova }` za `status: 'partial'`

Render po stavci:
- **Gotova** — zelena kvačica (kao i sad).
- **U toku** — neon-zeleni bedž **"N seta · u toku"** sa malom tačkicom (N = broj odrađenih setova). Boja `var(--pink)` (#c8f235), tamni tekst.
- **Nije počela** — bez oznake.

## Kraj treninga

`finishWorkout` čuva sve vežbe (i `partial` i `done`); odrađeni setovi se broje normalno. Bez dodatnog pitanja. (Opciono: `partial` se pri snimanju tretira kao `done` u istoriji — istorija ne razlikuje stanja.)

## Izmene u kodu (pregled)

1. **`completeSet` (LogScreen)** — posle dodavanja seta pozove novi callback `onSetLogged(exerciseEntry)` ka App-u, koji upiše/ažurira vežbu u `current` sa `status: 'partial'`.
2. **`handleBack` (LogScreen)** — ukloniti brisanje; samo `onBack()`.
3. **`finish` (LogScreen)** — `onComplete` postavlja `status: 'done'`. "Stop Early" koristi `onSetLogged` pa izlaz (ostaje `partial`).
4. **Init `useEffect` (LogScreen)** — ako postoji `partial` stavka za ovu vežbu, restauriraj iz nje umesto iz `fittrack_log_state`.
5. **Ukloniti** oba `fittrack_log_state` `useEffect`-a (čuvanje i restauraciju) i `removeItem` pozive.
6. **App** — `completeExercise` → `status:'done'`; novi `setPartial(ex)` → `status:'partial'`; izračunati `doneIds` i `partialMap`; proslediti ih group ekranima.
7. **GroupSelectScreen / GroupDetailScreen** — render bedža "u toku" iz `partialMap`; kvačica iz `doneIds`.

## Rizik i sigurnost

Promena dira centralni tok logovanja. Pre izmena: napraviti backup kopiju `index.html`. Posle: testirati ceo tok (počni set, izađi nazad, vrati se, dovrši; završi trening) lokalno pre push-a na Vercel.

## Van obima (ne radimo sad)

- Pamćenje tačne plate/EZ-bar konfiguracije između pauza.
- Cardio, Core ilustracije, onboarding spotlight (zasebni zadaci).
