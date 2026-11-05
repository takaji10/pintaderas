# Translation QC Fix Log — ch2.html

- **file:** ch2.html
- **method:** qc-prompt.md (alignment by section id / block position; five checks; ES authoritative)
- **date:** 2026-11-04

## Fixes applied

- **file:** ch2.html
- **where:** sec-ch2-en-3 (§2.3.2 Incision), ¶9 — vessel-motif list
- **category:** terminology
- **was:** "triangles and concentric circles (inventory nos. 365 and 647), concentric circles and a square (inventory no. 515)"
- **now:** "triangles and concentric circumferences (inventory nos. 365 and 647), concentric circumferences and a square (inventory no. 515)"
- **why:** ES "triángulos y circunferencias concéntricas" / "circunferencias concéntricas y cuadrado"; the page consistently distinguishes *circunferencia* (circumference) from *círculo* (circle — kept as "circles" later in the same sentence for registros 278, 3770, 240).
- **confidence:** fixed (high)

- **file:** ch2.html
- **where:** sec-ch2-en-2 (§2.2), ¶11 — nail impressions paragraph
- **category:** grammar
- **was:** "in some case their presence is very abundant"
- **now:** "in some cases their presence is very abundant"
- **why:** ES "en algún caso su presencia es muy abundante" — English requires the plural in this idiom.
- **confidence:** fixed (high)

- **file:** ch2.html
- **where:** sec-ch2-en-3 (§2.3.3 Impression), ¶4 — quadrangular-tendency passage
- **category:** grammar
- **was:** "that is pressed repeated times in one and the same place"
- **now:** "that is pressed repeatedly in one and the same place"
- **why:** ES "que se presiona repetidas veces" — "repeated times" is not idiomatic English.
- **confidence:** fixed (high)

- **file:** ch2.html
- **where:** sec-ch2-en-3 (§2.3.2), ¶10 — guiding incisions paragraph
- **category:** fidelity
- **was:** "when these are traced in an exclusively ad hoc manner to guide the practice of another technique"
- **now:** "when these are traced exclusively in order to guide the practice of another technique"
- **why:** ES "cuando éstas se trazan de modo exclusivo para guiar la práctica de otra técnica" — "ad hoc" is added content not present in the Spanish; "de modo exclusivo" = "exclusively".
- **confidence:** fixed (high)

- **file:** ch2.html
- **where:** sec-ch2-en-3 (§2.3.3), ¶14 — lateral impressions paragraph
- **category:** grammar
- **was:** "on bodies of rectangular shape (inventory no. 3163) or square one (inventory no. 3097)"
- **now:** "on bodies of rectangular shape (inventory no. 3163) or a square one (inventory no. 3097)"
- **why:** Missing article; also avoids the misreading "square one" (= starting again).
- **confidence:** fixed (high)

- **file:** ch2.html
- **where:** sec-ch2-en-2 (§2.2), ¶16 — burnishing paragraph
- **category:** fidelity
- **was:** "With all this, the piece must undergo further hours of drying"
- **now:** "Even so, the piece must undergo further hours of drying"
- **why:** ES "Con todo, la pieza deberá someterse a más horas de secado…" — concessive connective ("for all that"), not "in view of the foregoing"; "With all this" is a calque that misdirects the logic.
- **confidence:** fixed (high)

## Flagged (no change made)

- **file:** ch2.html
- **where:** sec-ch2-en-2 (§2.2), ¶1, mid-paragraph
- **category:** grammar / register
- **was:** "Saving exceptions, the rectangular and square shapes tend to correspond to the first type"
- **now (candidates):** (a) leave as is — "saving exceptions" is archaic-but-valid English mirroring ES "Salvo excepciones"; (b) "Save for exceptions, …"
- **why:** Legitimate but dated idiom; meaning is faithful, so left untouched pending a style decision.
- **confidence:** flagged (uncertain — stylistic, not semantic)

- **file:** ch2.html
- **where:** Notes to Chapter 2, note n-ch2-3 (EN line mirrors ES)
- **category:** fidelity (source issue, not translation error)
- **was:** ES note names matrices "3123 and 3135" at the start but "las matrices 3128 y 3135" at the end; EN reproduces both faithfully.
- **now:** no change (Spanish must not be altered)
- **why:** The internal inconsistency (3128 vs 3123) exists in the published Spanish itself; the English cannot resolve it unilaterally.
- **confidence:** flagged — **needs human decision** (check against the print PDF; if the book reads 3123 in both places, the ES would need a publisher's erratum, and EN could then be harmonised).

- **file:** ch2.html
- **where:** sec-ch2-en-2 (§2.2), technological-sequence table, row "Excision, incision and impression"
- **category:** fidelity / register
- **was:** "They are practised at hours of drying" / "It is practised at a day or days of drying"
- **now (candidates):** (a) keep the literal mirror of ES "Se practican a las horas de secado" / "Se practica al día o días de secado"; (b) "They are practised some hours into drying" / "It is practised one or more days into drying"
- **why:** The English is stilted but tracks a compressed Spanish table cell; without seeing the print PDF's table wording, the safer reading is unclear.
- **confidence:** flagged (uncertain)

## Verification

- Structural sanity check after edits: `lang-block` = 2, `l-es`/`l-en` spans = 18/18, `<p>` = 199, `<sup>` = 18 — unchanged; only text nodes were modified. No Spanish text, tags, ids, hrefs or anchors touched.
- All figure numbers (fig. 2.1–2.8), all inventory/registro numbers in the running text, tooltips, notes and all four tables were checked number-by-number against the Spanish: no discrepancies found.

## Page count

- Paragraphs/blocks checked: ~90 aligned paragraph units (incl. 6 figure label groups, 4 tables × all cells, 10 conclusion items, 9 footnotes + 9 tooltips)
- Fixes applied: **6** (terminology 1 · grammar 3 · fidelity 2)
- Items flagged: **3** (1 human decision required: matrix 3128/3123 in note 3)

---

## Resolution pass (2026-11-05)

Maintainer's decisions on the first-pass flags, plus systemic sweeps A–D (EN side only; Spanish untouched).

### Flag resolutions

1. **Item 8 — note n-ch2-3, matrix numbers 3128 vs 3123 — DECISION, no change.** The EN mirrors the ES exactly; the 3128/3123 inconsistency is in the published Spanish ("las matrices 3123 y 3135" → "las matrices 3128 y 3135" within the same note) and cannot be resolved without the print. **Log as documented decision + publisher erratum** (erratum to be raised with El Museo Canario; EN will follow any future ES correction).
2. **Item 9 — sec-ch2-en-2 (§2.2), ¶1 — grammar/register — fixed.**
   - was: "Saving exceptions, the rectangular and square shapes tend to correspond to the first type"
   - now: "Exceptions aside, the rectangular and square shapes tend to correspond to the first type"
   - why: faithful to ES "Salvo excepciones" and natural English; resolves the first-pass stylistic flag.
3. **Item 10 — sec-ch2-en-2 (§2.2), technological-sequence table, row "Excision, incision and impression" — fidelity/register — fixed (2 cells).**
   - was: `<td>They are practised at hours of drying</td>` → now: `<td>They are practised some hours into drying</td>`
   - was: `<td>It is practised at a day or days of drying</td>` → now: `<td>It is practised one or more days into drying</td>`
   - why: ES "Se practican a las horas de secado" / "Se practica al día o días de secado" mean the techniques are executed some hours / one or more days *into* the drying; table structure untouched (resolves the first-pass table flag, option (b)).

### Sweep A — calque blacklist

- No hits. All blacklist patterns ("in attention to", "in function of", "gives place to", "one assists to", "found situated", "makes impossible to", "allowed to + infinitive", "it has been opted to", "the years 60/70/80/90", "Facing this") searched in the EN side: **0 stragglers** (the first pass had already cleared ch2).

### Sweep B — "archaeological interventions"

- N/A for ch2: 0 occurrences.

### Sweep C — literal asterisks in EN title attributes

- **6 title attributes de-asterisked** (fixed, high): fnref-ch2-3 (`*pintaderas*`→`pintaderas`), fnref-ch2-5 (`*pintadera*`), fnref-ch2-6 (`*pintaderas*`), fnref-ch2-7 (`(*acabado grosero*)`, `*Diccionario de materiales cerámicos*`), fnref-ch2-8 (`*almagre*`), fnref-ch2-9 (`(*lateral*)`).
- why: the asterisks are literal markdown-style italics markers that render as raw characters in tooltips; the ES-side titles carry no asterisks, so the EN now matches.
- NOT touched: the genuine table footnote markers `Smoothing*` / `Burnishing**` / `** Let it be recalled…` in the EN table cell/paragraph — they mirror the ES `Alisado*` / `Bruñido**` / `** Recuérdese…` and are meaningful reference marks.

### Sweep D — "stamp"/"seal" as nouns for the objects

- **0 changes.** All remaining "stamp" hits in ch2 are verbs ("stamping", "stamped", "it stamps … impressions") or UI asset paths (`assets/stamps/…`); no noun use for the objects. No "seal" hits.

### Verification

- Structural counts vs git HEAD, unchanged: `<p>` 199, `<p ` 67, `<a ` 42, `<sup>` 18, `lang-block` 2, `l-es`/`l-en` 18/18, `fnref` 36, `id="n-` 18, `title="` 18; `<em>` delta 0.
- Spanish side (l-es spans + lang-es blocks) byte-identical to git HEAD: **verified (SHA-256 match)**.
- Asterisked EN title attributes: 6 → 0. Non-title asterisks: 10 (all genuine table footnote markers, unchanged).
- Line endings (CRLF) and UTF-8 no-BOM encoding preserved; only EN text nodes and EN `title="…"` values modified.

### Resolution-pass count

- Fixes applied: **4 string changes** (items 9, 10 ×2) + **6 title attributes** de-asterisked.
- Documented decisions, no change: **1** (item 8, matrix 3128/3123 — publisher erratum).
- Sweep A 0 · Sweep B 0 (N/A) · Sweep C 6 · Sweep D 0.
