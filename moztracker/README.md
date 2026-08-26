# Moz Tracker

**Will Morrissey actually show up?**

A standalone browser app tracking the next 5 upcoming Morrissey concerts, each with a statistically dubious cancellation risk percentage.

Live at: **https://klm-snyk.github.io/moztracker/**

---

## What it does

- Lists the next 5 confirmed Morrissey shows (date, venue, city/country)
- Calculates a cancellation risk % per show based on:
  - Base rate (~35%, reflecting his documented history)
  - Days until the show
  - Geographic region (Scandinavian shows score better; US shows score worse)
  - Back-to-back show fatigue
- Displays a **Moz-o-meter** — overall tour vibe and average cancel risk
- Cycling slideshow of concert photos (Wikimedia Commons, CC licensed) as background

## Updating show data

Show data lives in `shows.json`, not inline in `index.html`. On load, the page
fetches that file, drops any show whose date has already passed, sorts by
date, and displays the next 5 — so you don't need to prune old shows by hand,
only add new ones as they're announced. Keeping a buffer of more than 5
upcoming shows in the file means it keeps working correctly for a while
without edits.

Each entry in `shows.json` takes:

```json
{
  "date": "YYYY-MM-DD",
  "venue": "Venue Name",
  "city": "City",
  "country": "Country",
  "flag": "🇺🇸",
  "riskFactors": [
    { "label": "Some context", "type": "good" },
    { "label": "Some concern", "type": "bad" },
    { "label": "Neutral note", "type": "neutral" }
  ]
}
```

`riskFactors` chips are the only hand-curated part — everything else (day
countdown, risk %, Moz-o-meter mood, filtering/sorting) is computed
automatically by `index.html`.

Note: because the page now fetches `shows.json`, opening `index.html`
directly from disk (`file://`) will fail due to browser CORS restrictions on
local fetches. Test locally with a simple server instead, e.g.
`python3 -m http.server` from this folder, then visit
`http://localhost:8000`. It works fine as-is once deployed to GitHub Pages.

## Tech

Pure HTML/CSS/JS + one JSON data file — no build step, no dependencies beyond
Google Fonts.

## Photo credits

Concert photos sourced from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Morrissey) under Creative Commons licences.
