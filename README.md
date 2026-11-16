# Helena Šiklová – mobilní fyzioterapie Praha-západ

Statický web (bez build kroku). Nasazení: Vercel – stačí propojit repozitář, výstupní složka je kořen.

## Struktura

- `index.html` – hlavní stránka (všechny texty)
- `ochrana-osobnich-udaju.html` – zásady ochrany osobních údajů
- `styles.css` – vzhled (barvy a písmo jsou nahoře v `:root`)
- `main.js` – menu, animace při scrollu, formulář
- `img/` – fotografie
- `robots.txt` – zatím zakazuje indexování (web je v režimu náhledu)

## Lokální náhled

```bash
python3 -m http.server 8000
```

Pak otevřít http://localhost:8000.

## Před ostrým spuštěním

- V `main.js` doplnit `EMAIL` – do té doby formulář objednávku nikam neodesílá.
- Povolit indexování: upravit `robots.txt` a odstranit `<meta name="robots" content="noindex, nofollow">` v `index.html`.
- Po změně domény upravit absolutní adresy obrázku (`og:image`, JSON-LD) v `index.html`.
