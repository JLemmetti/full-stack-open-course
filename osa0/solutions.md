# Tehtävät

## 0.4: uusi muistiinpano

Tee vastaavanlainen kaavio, joka kuvaa, mitä tapahtuu tilanteessa, jossa käyttäjä luo uuden muistiinpanon ollessaan sivulla https://studies.cs.helsinki.fi/exampleapp/notes eli kirjoittaa tekstikenttään jotain ja painaa nappia tallenna.

Kirjoita tarvittaessa palvelimella tai selaimessa tapahtuvat operaatiot sopivina kommentteina kaavion sekaan.

```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note<br>Payload: "note=New+note"
  Note left of server: router.post('/new_note') nappaa kutsun
  Note left of server: formatNote-funktio muotoilee uuden note-objektin kutsun bodysta ja ajan hetkestä
  Note left of server: createNote-funktio tallentaa uuden noten notes-taulukkoon
  Note left of server: Serveri lähettää selaimelle uudelleenohjauspyynnön (302) polkuun /notes
  server-->>-browser: HTML document (/notes)
  Note right of browser: Selain lataa sivun uusiksi päivittyneillä muistiinpanoilla
```

## 0.5: Single Page App

Tee kaavio tilanteesta, jossa käyttäjä menee selaimella osoitteeseen https://studies.cs.helsinki.fi/exampleapp/spa eli muistiinpanojen Single Page App-versioon

```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa
  Note left of server: router.get('/spa') nappaa kutsun ja palauttaa selaimelle sivun HTML-pohjan
  server-->>-browser: HTML document (notes_spa)
  Note right of browser: Selain lataa assetit
  browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  server-->>-browser: CSS-tiedosto
  browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  server-->>-browser: JS-tiedosto
  Note right of browser: Selain suorittaa spa.js-tiedoston
  Note right of browser: JS lataa muistiinpanot polusta /exampleapp/data.json ja rakentaa niistä<br> listan redrawNotes-funktiossa
  Note right of browser: redrawNotes puskee rakennetun listan notes -id:llä varustettuun diviin sivulla
  Note right of browser: window.onload -event handlerissa lomakkeen normaali lähetys<br> estetään ( e.preventDefault() ) ja sille lisätään uusi onsubmit -käsittelijä
```

## 0.6: Uusi muistiinpano

Tee kaavio tilanteesta, jossa käyttäjä luo uuden muistiinpanon single page ‑versiossa.

```mermaid
sequenceDiagram
  participant browser
  participant server

  Note right of browser: Käyttäjä painaa "Save"
  Note right of browser: Lomakkeen form.onsubmit -käsittelijä nappaa eventin ja rakentaa note-objektin<br> käyttäjän syötteestä ja ajanhetkestä
  Note right of browser: Käsittelijä: <br>- lisää uuden muistiinpanon notes-taulukon perään <br>- Tyhjentää input-kentän<br>- Piirtää Notes-listan uusiksi (redrawNotes())<br>- Lähettää uuden muistiinpanon serverille (sendToServer(note))
  browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa<br>Payload: {content: "Viesti...", date: "2024-01-04T08:21:15.392Z"}
  Note left of server: router.post('/new_note_spa') nappaa kutsun
  Note left of server: formatNote-funktio muotoilee uuden note-objektin kutsun bodysta ja ajan hetkestä
  Note left of server: createNote-funktio tallentaa uuden noten notes-taulukkoon
  Note left of server: Serveri lähettää selaimelle HTTP-statuskoodin
  server-->>-browser: 201: note created
  Note right of browser: Selain logittaa serverin viestin: "note created"

```
