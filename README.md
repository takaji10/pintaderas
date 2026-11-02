# Pintaderas of El Museo Canario — interactive digital edition

An interactive, bilingual (Spanish / English) static website publishing
**"Pintaderas de El Museo Canario"** (M.ª del Carmen Cruz de Mercadal, Teresa
Delgado Darias & Javier Velasco Vázquez, El Museo Canario, Las Palmas de Gran
Canaria, 2013) — the catalogue and study of the 214 ceramic stamps
(*pintaderas*) of pre-Hispanic Gran Canaria.

**Live site:** https://takaji10.github.io/pintaderas/

## Features

- Full text of the book, all 5 chapters, bibliography, statistical annex and
  the 178 photographic plates
- Bilingual ES/EN toggle on every page (preference remembered)
- 135 footnotes preserved with hover tooltips and anchor links
- Lightbox image viewer; searchable plate gallery (by inventory number)
- "Pintadera workshop": a canvas where you compose your own stamped patterns
  with the motifs from the book's typology
- Ambient stamping animation in the hero; geometric ornament system derived
  from the book's motif tables
- Palette drawn from the artefacts: fired clay, red ochre, charcoal, sand

## Tech

Static Jekyll site (no theme dependencies). Pages are generated offline from
the bilingual Markdown transcription and served by GitHub Pages.

```
jekyll build   # or just push — GitHub Pages builds automatically
```

## Copyright

Book text and images © El Museo Canario, 2013. Authors: M.ª del Carmen Cruz de
Mercadal, Teresa Delgado Darias, Javier Velasco Vázquez. This site is a digital
reading edition made for personal/scholarly use; all content belongs to its
authors and institution.
