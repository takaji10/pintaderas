# Translation QC report — *Pintaderas of El Museo Canario* (English translation)

Consolidated QC report for the bilingual digital edition. Synthesised from the five per-page fix
logs in `research_notes/Translation QC Pintaderas edition/` (ch1, ch2, ch3, ch4–ch5, misc pages),
produced under the method in `qc-prompt.md`. One follow-up verification (inline-script parse
check on all ten pages) was run fresh for this report; everything else reports the logs' own
recorded results.

---

## 1. Scope & method

**Pages covered** — all ten pages of the site: `index.html`, `preliminares.html`, `ch1.html` …
`ch5.html`, `anexo.html`, `bibliografia.html`, `placas.html`.

**Method** (per `qc-prompt.md`, applied identically on every page):

- **Alignment.** Block-by-block ES↔EN alignment: Spanish in `lang-es` blocks / `l-es` spans,
  English in `lang-en` blocks / `l-en` spans, paired in the same order and matched by section id
  (`…-es-N` ↔ `…-en-N`). UI strings align as adjacent `l-es`/`l-en` span pairs. On heavily
  edited pages (ch3) the aligned extraction was segment-numbered; on `anexo.html` the EN block
  runs at a known EN = ES − 1 positional offset. Footnote text and its reference `title="…"`
  tooltip were treated as one unit and kept in sync.
- **What was checked.** Five passes over every aligned unit:
  1. **Fidelity** — omissions, additions, dropped/introduced negations, modality (the Spanish's
     hedges *probable / quizás / puede que / debió de* must survive), tense and chronology,
     singular/plural and number errors (inventory numbers, counts, years, catalogue numbers),
     wrong referents.
  2. **Topic/context** — the highest-value check: is the English actually talking about the same
     thing as the Spanish? Wrong-action procedural descriptions, entity mix-ups (El Museo
     Canario vs Cueva Pintada vs named individuals), copy-paste leftovers, technical terms
     rendered with their everyday meaning.
  3. **Grammar & register** — formal academic British English matching the original's tone;
     colloquial renderings elevated, calques repaired.
  4. **Terminology** — project conventions enforced (`pintadera(s)` never translated; *matriz* →
     matrix; *campo* → field; *incisión/excisión/impresión* → incision/excision/impression;
     *registro* → inventory no.; *antiguos canarios* → ancient Canarians; institution names keep
     Spanish form), with neighbouring pages sampled to pick the site-dominant rendering.
  5. **Typography** — punctuation, dashes, question marks, italics conventions.
- **Hard constraints honoured throughout.** Spanish text untouched (byte-identical where
  asserted, verified programmatically); markup structure untouched — tag names, attributes,
  `id`s, `href`s, classes, `fnref`/`n-…` footnote anchors, the language-toggle machinery, HTML
  entities; no re-paragraphing; the only permitted edits were English-side text nodes and
  English-side `title="…"` tooltip attributes. One deliberate exception, logged on ch3: **+14
  `<em>` pairs added on the English side** to implement the site convention that every mention
  of *pintadera* is italicised.
- **Fix threshold.** Fixes applied at ≥ ~85 % confidence; anything less certain was left in the
  file untouched and logged as FLAGGED with both candidate readings.

---

## 2. Headline numbers

| Page / file | Units checked | Fixes applied | Flagged |
|---|---|---|---|
| ch1.html | 138 aligned units (78 ¶s, 6 captions, 27 footnotes, 27 tooltips) | 55 replacements (52 log entries) | 7 |
| ch2.html | ~90 units (incl. 4 tables, 9 notes + 9 tooltips) | 6 | 3 |
| ch3.html | 262 aligned segments (incl. 73 notes) + 73 tooltip spot-checks | 195 replacements (161 log entries, 14 adding `<em>`) | 6 |
| ch4.html | 79 units (49 ¶s, 6 captions, 24 footnotes, tooltips) | 40 | 2 (+1 convention note) |
| ch5.html | 26 units (21 ¶s, 2 captions, 3 footnotes, tooltips) | 39 | 1 (+2 convention notes) |
| index.html | 43 (37 span pairs + 6 ¶s) | 0 | 1 (informational) |
| preliminares.html | 40 (24 span pairs + 16 abbreviation entries) | 0 | 0 |
| bibliografia.html | 213 entries | 0 | 0 |
| anexo.html | 48 items — all 19 tables cell by cell | 1 | 0 |
| placas.html | 152 items (149 figure cards, 77 full fichas row by row) | 13 replacements (10 log entries) | 3 |
| **Total** | | **349 replacements / 309 log entries** | **23 (+3 convention notes)** |

Zero-fix pages are not clean-by-omission: `bibliografia.html` was verified by a programmatic
paragraph-by-paragraph diff (all 211 entries byte-identical to the Spanish apart from the two
intended translated headings and the translator's note), `anexo.html` was checked cell by cell
with **zero numeric mismatches**, and `placas.html` had every `data-reg` key, caption number and
ficha row compared.

---

## 3. Fixes by category

### (a) Fidelity / meaning

Meaning-level errors: dropped or shifted modality, wrong tense, added content, unparseable
syntax that destroyed the author's point.

| Page / section | ES evidence | EN before | EN after |
|---|---|---|---|
| ch1, intro ¶6 | "desde luego" | "Concerns which, needless to say, we cannot pass over" | "…which, of course, we cannot pass over" |
| ch2, §2.2 ¶16 | "Con todo, la pieza deberá…" (concessive) | "With all this, the piece must undergo further hours of drying" | "Even so, the piece must undergo…" |
| ch3, §3.1 [22] | "la que debió de formar parte de aquel lote" (deduction) | "that formed part of that lot" | "…that **must have** formed part of that lot" |
| ch1, fn 9 (+ tooltip) | ES note 9 reads "esos sellos servían para pintarse o tatuarse" — no qualifier | "those seals **of artistic designs** served for painting or tattooing oneself" | qualifier deleted (it exists only in the longer quote in note 12 — an addition on the EN side) |
| ch2, §2.3.2 ¶10 | "se trazan de modo exclusivo para guiar…" | "traced in an exclusively **ad hoc** manner to guide…" | "traced exclusively in order to guide…" (added content removed) |
| ch5, ¶13 | "si hoy sabemos X, desconocemos Y" (contrast, not condition) | "And **if** today we know what it could mean… we are ignorant of" | "And **while** today we know… we are unaware of" |
| ch3, §3.3 [123] | "no fue el único cargo oficial" (the office-holder) | "was not the only official post" | "was not the only person to hold an official post" |
| ch3, §3.1 [22] | "en la misma jurisdicción de Gáldar" | "in the very jurisdiction of Gáldar" | "in that same jurisdiction of Gáldar" |
| ch3, §3.5 [183] | "cuanto menos, no funerario" | "at how much less, not funerary" | "at the very least, not funerary" |

### (b) Topic & false-friend errors — the English talking about the wrong thing

The most consequential group: plausible English describing a different action, agent, or sense.

| Page / section | ES evidence | EN before | EN after |
|---|---|---|---|
| ch3, §3.2 [85–87] | "al directivo / los directivos" — footnote {41} confirms Juan del Río Ayala was a *vocal* (board member); the museum's director is Chil | "the **director** of El Museo Canario Juan del Río Ayala"; "the **directors** Tomás Arroyo…"; "almost all the directors" | "board member(s)" ×3 — entity mix-up repaired |
| ch1, §1.1 ¶9 | "sensiblemente menor" | "the quantity will be **sensibly** smaller" | "…will be **appreciably** smaller" |
| ch1, fn 12 | "labores de roturación" (ploughing) | "during **clearing labours**, the finding… took place" | "during **ploughing work**…" (double calque) |
| ch1, fn 18 (+ tooltip) | "anecdóticamente" = as a minor point | "**Anecdotally**, the most damaging agents…" | "**As a curiosity**, the most damaging agents…" (EN "anecdotally" = based on anecdotal evidence — meaning-changing) |
| ch3, §3.5 [157] | "da lugar a" | "**gives place** to an intensification" | "**gives rise** to an intensification" |
| ch3, §3.5 [168]/[169] | "aporte" | "the **apport** of soils" / "an apport of foreign soils" | "**input** of soils" ("apport" is not English) |
| ch3, §3.5 [182] | "un espacio de fines cultuales" | "a space of **cult ends**" | "a space with a **cultic purpose**" (misread of *fines*) |
| ch4, ¶8 | "harían fortuna" (of an idea) | "would **make a fortune** and would be adopted" | "would **catch on** and be adopted" |
| ch5, fn n-ch5-3 | "se terminan **guisando**" (ceramics: kiln-firing) | "end up being **finished off** in order to be used" | "end up being **fired** so as to be used" — technical content restored |
| placas, reg 3080 | "círculo exciso, **circunferencia** excisa" (two different motifs) | "an excised circle, an excised circle and triangular impressions" (reads as accidental duplication) | "…an excised circle, an excised **circumference**…" |
| placas, regs 3049/3163/3175/3189 | "laterales mayores", "lateral menor", "laterales" | Spanish words left untranslated in the EN fichas ("triangle- and *laterales mayores*", "one side *menor*") | "the larger sides", "a/the short side", "sides" |
| ch1, fn 7 | "este comestible" (bread) | "usually employed to mark this **comestible**" | "…this **foodstuff**" |

### (c) Grammar & calque repairs

The largest group by count (ch3 alone contributed well over a hundred). Recurring calques:

| Page / section | ES evidence | EN before | EN after |
|---|---|---|---|
| ch3, ×6 sites ([63], [64], [66], [67], [119], [126]…) | "permitieron identificar / recuperar / evincir" | "**allowed to** identify only four stone houses" (etc.) | "**made it possible to** identify…" |
| ch3, §3.1 [23] | "la descripción física que de las mismas hace el comisario de Las Palmas" | "the physical description **that of the same makes the commissioner** of Las Palmas" (unparseable) | "the physical description **that the commissioner of Las Palmas makes of them**" |
| ch3, §3.1 [67] | "el inventario que de los fondos del museo elaborara… Pérez de Barradas" | "the inventory that of the holdings of the museum elaborated the archaeologist…" (unparseable) | "the inventory that the archaeologist… elaborated of the holdings of the museum" |
| ch1, §1.1 ¶12 & §1.3 ¶1 | "se ha optado por" | "**it has been opted** to discard / to order them" | "**the decision has been taken** to…" |
| ch3, §3.4 [130]/§3.5 [158] | "en su seno / en el seno de" | "the creation **in its bosom** / in the bosom of El Museo Canario" | "**within** it / **within** El Museo Canario" |
| ch4, ¶18 (Marcy) | "se recurre al empleo de sellos de madera" | "**recourse is had to** the use of wooden seals" | "**use is made of** wooden seals" |
| ch1, §1.3 ¶3/¶5; ch5 ¶8 | "en atención a" | "**in attention to** the place of provenance" / "…aesthetic criteria" | "**according to** the place of provenance" / "**in view of**… / **out of regard for** aesthetic criteria" |
| ch4, ¶13 (Marcy 1940) | narrative future "representará… girará" | "**will** represent a milestone… **will** remain in force up to our days" | "**would** represent… would remain in force **up to the present day**" |
| ch3, ×6 ([33], [34], [39], [40]) | "a finales de los años 60/80" | "at the end of the **years 60**", "from the **years 80** onward" | "at the end of the **1960s**", "from the **1980s** onward" |
| ch3, §3.3 [122] | "Informado El Museo Canario, las obras quedaron paralizadas" | "**Informed El Museo Canario**, the works remained paralysed" (dangling participle reverses the agent) | "**Once El Museo Canario was informed**, the works were brought to a halt" |
| ch3, §3.4 [151] | "no podemos asociar ninguna" | "we cannot associate **none** of the referred pieces" (double negative reverses the sense) | "we cannot associate **any** of the referred pieces" |
| ch5, ¶3 | "contar con" | "counting **on** a corpus of information" | "**having at our disposal** a corpus of information" |
| ch3, §3.5 [110]/[165] | "traerse a colación" | "must be **brought to collocation**" | "must be **mentioned**" |

### (d) Terminology standardisation

| Page / section | ES evidence | EN before | EN after |
|---|---|---|---|
| ch3, whole chapter, 14 sites | "sellos" meaning the objects | "stamps" / "seals" as nouns ("the remaining stamps of Tirajana", "the seal appeared at the foot of a wall"…) | *pintaderas* (italicised), per the site-wide convention that the word is never translated; quoted archival passages keep "seals" |
| ch3, §3.1 [55] | "números de registro" | "the registration numbers 3083, 3090 and 3111" | "the **inventory nos.** 3083, 3090 and 3111" |
| ch2, §2.3.2 ¶9 | "circunferencias concéntricas" vs "círculos" (page distinguishes the two terms) | "triangles and concentric **circles** (nos. 365 and 647)…" | "triangles and concentric **circumferences**…" — *círculo* kept as "circles" later in the same sentence |
| ch3, 5 sites | "donativos" | "**donatives**" | "**donations**" |
| ch3, note [196] + tooltip {7} | "académico de número" | "member (academician of number)" | "member (**full academician**)" |
| ch4, ¶39 | "de carácter comunitario" | "deposits of a **communitarian** character" (political-philosophy sense) | "of a **communal** character" |
| ch5, ¶3 | "trabajos arqueológicos" | "archaeological **works**" (reads as publications) | "archaeological **fieldwork**" |
| ch4, ¶28 | "temática" | "the subject **matters** of their designs" | "the **subject matter**" (uncountable, per convention) |
| ch1, Fig 1.6 caption + fn 4 | "divulgativo" | "**divulgative**" (non-standard calque) | "**outreach**" — wording choice flagged, see §4 |

### (e) Typography

| Page / section | ES evidence | EN before | EN after |
|---|---|---|---|
| ch3, TOC [6] + heading [154] | "PRINCIPIOS DEL XXI" | "THE BEGINNINGS OF THE 21ST" (×2) | "THE BEGINNING OF THE 21ST" |
| ch4, Fig 4.3 caption | — | "Sebastián Jiménez Sánchez**,** (on the left)" | "Sebastián Jiménez Sánchez (on the left)" |
| placas, regs 3092/3097/3102 | "¿Agüimes?" | "**¿**Agüimes?" (Spanish opening question mark) | "Agüimes?" (matches the page's own "?1977?" adaptation) |
| placas, reg 3189 | — | "…guide the work on the field **.** The pintadera…" | stray space before the full stop removed |
| ch3, §3.1 [72] | "–dada la asociación… aborigen–." (paired dashes) | closing dash dropped on the EN side | "…and the aboriginal population **—.**" restored, mirroring the site's "—," pattern |
| ch5, ¶11 | "Tales señas, quizás mejor blasones" | "Such signs**,** perhaps better**,** blazons, would also be…" | "Such signs**, or perhaps better blazons,** would also be…" (comma split broke the apposition) |

---

## 4. Items flagged for human decision

Complete consolidated list across all five logs. In every case the file was **not** changed; the
two candidate readings and the source of the uncertainty are given. Ordered by page.

**From ch1.html**

1. **"grafía canaria"** (intro ¶3 + footnote 2). Candidates: (a) "Canarian script" [current],
   (b) "Canarian graphic symbols/inscriptions". ES "la pintadera y la grafía canarias" may mean
   the aboriginal script/signs or the graphic motif; both readings are defensible.
2. **"pese a que se cualifique al objeto"** (intro ¶22). Candidates: (a) keep the literal "despite
   the fact that the object is qualified", (b) "even when a qualifier is added to the object".
   The Spanish is itself elliptical; the literal English is opaque.
3. **"not few will be the occasions…"** (§1.3 ¶5). Candidates: (a) keep the inversion, which
   mirrors ES word order and is grammatical, (b) "there will be no shortage of occasions…".
   Deliberate stylistic choice left open.
4. **"inventories 127"** (§1.1 ¶3, low impact). Candidates: (a) keep — "to inventory" as a verb is
   acceptable formal usage matching "inventaría 127", (b) "records 127".
5. **"each pintadera stars in a particular history"** (§1.1 ¶9, low impact). Candidates: (a) keep
   "stars in" — defensible and readable, (b) "is the protagonist of" (more sober rendering of
   "protagoniza").
6. **Footnote 13: "the 94 pintaderas coming from a draft and origin of this footnote"**
   (n-ch1-13). Candidates: (a) keep, (b) "…originating in the draft that is the source of this
   footnote". The ES "procedentes de un borrador y origen de esta nota al pie" is itself opaque;
   the EN mirrors it.
7. **"divulgativo" → "outreach"** (from fixes 10/51, wording choice). "Outreach" is currently used
   only on ch1 (Fig 1.6 caption, fn 4); alternative is "popularising". Needs confirming as the
   site-wide rendering before other pages are touched.

**From ch2.html**

8. **Matrix numbers 3128 vs 3123 in note n-ch2-3.** The ES note names matrices "3123 and 3135" at
   the start but "las matrices 3128 y 3135" at the end; the EN reproduces both faithfully. The
   inconsistency is in the published Spanish itself. Candidates: (a) check against the print PDF
   — if the book reads 3123 in both places, an erratum is needed and the EN could then be
   harmonised; (b) if the book genuinely differs, leave both. Cannot be resolved unilaterally.
9. **"Saving exceptions, the rectangular and square shapes tend to…"** (§2.2 ¶1). Candidates:
   (a) leave as is — archaic-but-valid English mirroring "Salvo excepciones", (b) "Save for
   exceptions, …". Stylistic, not semantic.
10. **Technological-sequence table, row "Excision, incision and impression"** (§2.2). Candidates:
    (a) keep the literal mirror of "Se practican a las horas de secado / Se practica al día o días
    de secado", (b) "practised some hours into drying / one or more days into drying". The
    English is stilted but tracks a compressed Spanish table cell; the print PDF's table wording
    is the tiebreaker.

**From ch3.html**

11. **"el auxiliar de preparador interino"** (§3.2 [85]). Candidates: (a) "the interim assistant
    preparator José Naranjo Suárez" [current], (b) "auxiliary to the preparator (interim)".
    Ambiguous whether *interino* modifies the post or the helper role.
12. **"los autores de la construcción naval"** (§3.3 [122]). Candidates: (a) keep the literal
    "the authors of the naval construction" — the ES's own odd phrasing, (b) freer "the builders
    of the navy barracks", which clarifies but departs from the source.
13. **"…a Catálogo… (1944) that were found deposited in two rooms"** (§3.2 [95]). In the ES the
    relative clause "que se encontraban depositados" agrees with the *objects* (masc. pl.), not
    with the Catálogo; the EN inherits the same ambiguity. Candidates: keep mirroring the source
    vs resolve in favour of the objects.
14. **"At his death, in 1868, the holdings of the cabinet pass into the hands of… Diego Lebrun"**
    (§3.1 [53]). Internally inconsistent with the 1884 Bethencourt inventory mentioned just
    before — but the ES says exactly the same. Likely an erratum in the printed book; candidates:
    leave as sourced vs check the print and log an erratum.
15. **Inventory number "31045"** (§3.1 [56], among "3123, 31045 and 3172"). Looks like a
    typographical slip for 3145, but inventory numbers must match the source exactly. Needs
    checking against the printed edition.
16. **"Miguel Pardilla y Moreno" (Fig 3.3 caption) vs "Miguel Padilla y Moreno" (body)**. The ES
    shows the same discrepancy between its own caption and body text; the EN mirrors both. The
    printed edition should be checked for the correct surname.

**From ch4.html**

17. **Pellicer's date metaphors** (¶36). "considerably rejuvenating … the first arrivals" /
    "considerably aged the dates" keep the author's own metaphors ("rejuveneciendo…",
    "envejecían… las datas"). Idiomatic English would be "bringing the first arrivals
    considerably forward" / "pushing the dates back". Candidates: keep the consistent metaphor
    pair vs plain dates wording.
18. **Referent of "esta interpretación que originariamente él mismo le habría comunicado"**
    (¶4 + fn 1). Ambiguous who communicated to whom; the EN mirrors the ambiguity deliberately.
    Word order was fixed; the referent cannot be decided without external evidence.

**From ch5.html**

19. **"villanos"** (¶12). Kept in Spanish inside quotes, matching the ES. English readers will not
    know it means commoners. Candidates: (a) leave, (b) add a bracketed gloss "villanos
    [commoners]" (as done for "grabar [to engrave]" in ch4 fn 3). Also needs a site-wide policy
    for "villanos" on other pages.

**From the misc pages**

20. **index.html shared "Registro N" tooltips** (37 motif-picker buttons). "Registro" should be
    "inventory no." in English per convention, but these tooltips are language-neutral shared
    markup with no `l-es`/`l-en` pair, which the hard constraints forbid editing. Needs either a
    markup exemption or paired `title` attributes.
21. **placas FLAG 1 — "pp. 1-72, ¿nº 746?."** (reg 3089, Bibliography). Candidates: (a) keep — the
    citation is deliberately kept in Spanish form like all ficha citations, so adapting the
    question mark would make it typographically mixed; (b) normalise to "no. 746?" since it is an
    annotation, not part of the cited title.
22. **placas FLAG 2 — page-wide círculo/circunferencia convention.** The EN block renders
    "circunferencia" as "circle" throughout (regs 3053, 3077, 3087…), colliding with
    "círculo" → "circle"; anexo.html keeps the distinction ("Circumference" ×10 for the
    singular). Fix 9 resolved only the one place where the collision is nonsensical (reg 3080).
    Candidates: (a) accept "circle" for *circunferencia* across placas, with 3080 as a logged
    exception, (b) switch all singular *circunferencia* instances in placas to "circumference".
23. **placas FLAG 3 (informational) — mention-pill anchor language mismatch.** EN mention-pills
    link to chapter tops (`href="ch2.html"`) while ES pills link to the ES anchors
    (`ch2.html#reg-ch2-es-N`); EN has no `reg-ch2-en-*` anchors to target. Pre-existing and
    deliberate-looking; `href`s are protected markup. Optional decision: add EN-target anchors
    so EN pills can deep-link like the ES ones.

Items 7 ("outreach"), 8, 15, 16, 14 are the ones where a print-PDF/publisher check is the
deciding evidence; items 20, 22, 23 and the systemic notes in §5 are site-wide policy calls.

---

## 5. Systemic observations

Site-wide patterns worth fixing once, globally, rather than page by page:

- **Tooltip truncation policy.** EN (and ES) footnote tooltips are hard-truncated with "…",
  in one case mid-word ("since it was preferab…"). Matches the ES truncation policy, so it was
  left untouched, but a truncation-at-word-boundary rule in the tooltip script would be strictly
  better. Needs a one-line script decision (ch1 F7).
- **"archaeological interventions" calque.** "Intervenciones arqueológicas" is rendered
  "archaeological interventions" — 29 occurrences across pages. "Excavations"/"fieldwork" would
  be more idiomatic but would break cross-page consistency; kept everywhere pending a single
  global rename decision (ch5 note).
- **Literal asterisks in EN tooltips.** Some EN `title=""` attributes carry markup-style italics
  as literal asterisks ("*pintaderas*", "*mirlado*"), which display as asterisks; ES tooltips
  carry no italics. Untouched as an apparent site-wide convention — candidate for one global
  sweep (ch4 note).
- **círculo / circunferencia rendering split.** ch2 and anexo.html preserve the distinction
  (*circunferencia* → "circumference", *círculo* → "circle"); placas.html flattens both to
  "circle" except the one repaired spot (reg 3080). Whichever way the human decision in item 22
  goes, it should be applied as one page-wide (and then site-wide) rule, not case by case.
- **Mention-pill anchor language mismatch.** See item 23: if EN deep-links are wanted, the fix is
  to generate `reg-*-en-*` anchor targets and repoint the EN pills once, in the pill template.
- **"divulgativo" rendering.** "Outreach" exists only on ch1 so far; if confirmed (item 7), a
  global find-and-replace should bring other pages in line before any new page re-introduces
  "divulgative".
- **"Registro N" in shared (non-paired) markup.** index.html's 37 motif-picker tooltips are the
  only place the *registro* convention cannot be applied under current constraints; a paired-title
  pattern would fix it permanently.
- **Recalcitrant calques kept for consistency.** "insular framework" (*marco insular*),
  "emitters/receivers", "ex profeso", "destined" (*destinadas*), "en el seno de" → within was
  fixed on ch3 but similar constructions elsewhere may survive; a second global pass against a
  published calque blacklist (in attention to, in function of, gives place to, one assists to,
  found situated, makes impossible to, allowed to + inf., it has been opted to, years 80, con
  seguridad → with certainty, Facing this → By contrast) would mop up stragglers cheaply — every
  one of these was found and fixed at least twice across different pages.
- **Sellos/stamps leakage.** ch3 was the only page where "stamps/seals" survived as a noun for
  the objects in running text (14 instances, all fixed); ch4 uses "stamp" only as a verb. A grep
  for `"stamp"`/`"seal"` as nouns across all pages would confirm the convention holds site-wide.
- **Tooltip–note sync.** Several fixes had to be applied twice (note text + its reference
  tooltip). Any future bulk edit should always touch both; a diff check comparing note text to
  its tooltip prefix would catch future drift.

- **Spanish-side errata found (for the publisher, not for this repo):** matrix 3128/3123 (ch2 n-3);
  death date 1868 vs 1884 inventory (ch3 §3.1 [53]); Pardilla/Padilla (ch3 Fig 3.3);
  "De tendencia elítica" (anexo Tabla 2.14 — correctly translated
  as "elliptical"); `data-reg="Excesión"` and the ES caption "Excesión" for *excisión* (placas —
  attribute/markup, untouched; EN caption correctly reads "Excision").
  (Removed from this list after verification: "31045" — it is a genuine museum
  inventory number, evidenced by the archive photo `assets/museum/31045.jpg`
  in this repository.)

---

## 7. Resolution pass (all flagged items + systemic cleanups)

Every flagged item was subsequently resolved by maintainer decision and every
systemic observation actioned. Per-item outcomes:

**Fixed (English edited):**

| Item | Resolution |
|---|---|
| 1 grafía canaria | → "Canarian graphic symbols" (both sites + fn-2 tooltip) |
| 2 se cualifique al objeto | → "even when a qualifier is added to the object" |
| 3 not few will be the occasions | → "there will be no shortage of occasions…" |
| 4 inventories 127 | → "records 127" |
| 5 stars in a particular history | → "is the protagonist of a particular history" |
| 6 fn 13 draft/origin | → "originating in the draft that is the source of this footnote" |
| 9 Saving exceptions | → "Exceptions aside, …" |
| 10 drying table cells | → "practised some hours into drying / one or more days into drying" |
| 11 auxiliar de preparador interino | → "the acting assistant preparator José Naranjo Suárez" |
| 13 Catálogo relative clause | → resolved to the pieces: "…; the pieces were found deposited in two rooms…" |
| 19 villanos | → glossed "villanos [commoners]" (ch5 ¶12) |
| 21 ¿nº 746?. | → "no. 746?." |
| 22 círculo/circunferencia | → site-wide rule enforced; 16 placas fixes across regs 3053–3128, verified per record |

**Resolved as documented keeps (no file change possible without the print edition; ES is authoritative):**

| Item | Decision |
|---|---|
| 8 matrix 3128/3123 (ch2 n-3) | EN mirrors ES; publisher erratum |
| 12 autores de la construcción naval | literal kept — the freer reading would invent facts |
| 14 death date 1868 vs 1884 inventory | EN mirrors ES; publisher erratum |
| 16 Pardilla/Padilla | EN mirrors ES (caption/body differ in ES too); publisher erratum |
| 17 Pellicer date metaphors | author's metaphor pair kept — deliberate and consistent |
| 18 "esta interpretación…" referent | ambiguity mirrored; undecidable without external evidence |

**Resolved with evidence:**

| Item | Decision |
|---|---|
| 7 divulgativo | "outreach" confirmed site-wide; no stragglers remain |
| 15 inventory "31045" | genuine inventory number — archive photo `assets/museum/31045.jpg` exists; kept |

**Systemic cleanups actioned:**

| Pattern | Action |
|---|---|
| Tooltip truncation mid-word | 53 EN tooltips re-truncated at word boundaries from their (fixed) note texts; 3 stale tooltips that no longer matched their reworded notes regenerated; n-ch3-70's note calque ("when are elaborated") fixed and its tooltip re-synced |
| Literal asterisks in EN tooltips | 48 asterisk pairs removed (ch1 18, ch2 6, ch3 17, ch4 7); meaningful table markers (`Smoothing*`, `Bruñido**`) kept |
| "archaeological interventions" | resolved per context: 13 → "excavation(s)"; 3 kept as the heritage-administration umbrella term (logged individually) |
| Calque blacklist second pass | stragglers fixed (ch3 "allowed to" ×2, ch1 "been opted for"); final grep: **zero hits site-wide** for the full blacklist |
| stamp/seal nouns | ch1 5, ch4 30 (incl. footnotes/tooltips), ch3/ch5 verified clean; quoted citations and verbs keep stamp/seal |
| Item 20 shared "Registro N" tooltips | index.html's 35 motif-picker tooltips → bilingual "Registro / inventory no. N" (language-neutral, no markup change) |
| Item 23 mention-pill anchors | EN blocks of ch1/ch2/ch3 received 141 mirrored `id="reg-chN-en-N"` anchors (1:1 with the ES anchors, order-verified); all 137 EN mention-pills in placas.html repointed to deep-link like the ES ones |

**Verification of the resolution pass:** Spanish segments byte-identical to
git HEAD on all ten pages (after line-ending and cache-version normalisation;
anexo's sole segment delta is the logged TOC-title fix); tag counts unchanged
except the documented em additions (ch3 +14, ch4 +24 italics) and the +141
deliberate `reg-mention` anchor spans; all inline scripts parse; calque
blacklist grep clean.

---

## 6. Verification

Structural-integrity results as recorded in the logs (the prompt's sanity check: only text
content may differ):

- **ch2.html** — after editing: `lang-block` = 2, `l-es`/`l-en` spans = 18/18, `<p>` = 199,
  `<sup>` = 18 — all unchanged; only text nodes modified. All figure numbers (fig. 2.1–2.8),
  inventory/registro numbers in running text, tooltips, notes and all four table cells checked
  number-by-number against the Spanish: no discrepancies.
- **ch3.html** — Spanish side verified **byte-identical** to the original programmatically;
  counts of `lang-block` (2), `l-es`/`l-en` (18/18), `<p>`, `<sup>` (144), `<a>`, and all
  `fnref`/`n-ch3-*` anchors unchanged. Only markup change is the intentional +14 `<em>` pairs
  (English-side *pintadera* italics convention).
- **ch4/ch5.html** — tag counts verified unchanged and balanced on both pages. One edit on ch4
  was applied in error (accidental deletion of ", a date" in the O.G.S. Crawford paragraph) and
  **reverted in the immediately following edit**; that paragraph's net content is unchanged apart
  from the intended "archaeological evidence" fix.
- **misc pages** — counts of `lang-block`, `l-es`/`l-en` spans, `<p>`, `<a`, `<sup>`, `<table>`,
  `<figure>`, `<details>` per page unchanged vs git HEAD for all five pages. bibliografia.html:
  211 entries byte-identical by programmatic diff. anexo.html: all numeric cells and totals
  digit-identical ES↔EN (zero mismatches). placas.html: all 149 `data-reg` keys, caption numbers,
  all 135 "Mentioned in… Chapter N (k)" refs, and 77 full fichas row by row all match; the three
  decorative techniques are consistently "incised / excised / impressed", never swapped.
- **Inline scripts (checked fresh for this report).** All ten pages' inline `<script>` blocks
  were extracted and syntax-checked (Node `new Function`): **10/10 pages parse, 0 failures** —
  the language-toggle and page scripts are unaffected by the QC edits, as expected since only
  English text nodes and English `title` attributes were touched.
