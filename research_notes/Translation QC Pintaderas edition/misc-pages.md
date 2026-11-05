# Translation QC fix log — misc pages (index, preliminares, bibliografia, anexo, placas)

Method: `qc-prompt.md` (block-by-block ES↔EN alignment; five checks: fidelity, topic/context,
grammar, terminology, typography). Spanish untouched; only English-side text nodes edited.
Structural sanity check after editing: counts of `lang-block`, `l-es`/`l-en` spans, `<p>`, `<a`,
`<sup>`, `<table>`, `<figure>`, `<details>` per page unchanged vs git HEAD — verified OK for all
five pages.

---

## index.html

- `file`: index.html
- `where`: #taller workshop, motif-picker buttons (37 `title` attributes)
- `category`: terminology
- `was`: `title="Registro 29619"` … `title="Registro 7838"` (tooltips read "Registro N" in both languages)
- `now`: unchanged — FLAGGED (informational)
- `why`: "registro" should be "inventory no." in English (project convention), but these tooltips are
  language-neutral shared markup (no `l-es`/`l-en` pair), which the hard constraints forbid editing.
- `confidence`: flagged (uncertain — needs either a markup exemption or paired `title` attributes)

All other English strings checked and correct: hero title/subtitle, 5 chapter-card titles and
subtitles, "Photographic annex" card, workshop labels (Frieze mode / Smooth the clay / Fire the
piece), workshop description and hint, fan-edition footer disclaimer. Fidelity verified against the
Spanish; terminology conventions respected (`pintaderas` untranslated, "pre-Hispanic", "matrices").

**index.html — paragraphs/strings checked: 37 l-es/l-en pairs + 6 `<p>` blocks. Fixes applied: 0. Items flagged: 1 (informational).**

---

## preliminares.html

No changes. Checked: page title, credits `<dl>` (Edita→Publisher, Textos→Texts, Fotografías→
Photographs, Corrección→Copy editing, Diseño→Design, ISBN row), affiliations note, "Abbreviations"
heading and intro, and all 8+8 archive-sigla entries in the `lang-es`/`lang-en` blocks. Archive
names are intentionally kept in Spanish form after the "Archive of El Museo Canario" gloss
(institution names keep Spanish form per convention); the Spanish source's own inconsistent
capitalisation ("Colección documental" vs "Colección Documental") was left as is — Spanish is
authoritative. Numbers (ISBN, Depósito Legal) match.

**preliminares.html — items checked: 24 l-es/l-en pairs + 16 abbreviation entries. Fixes applied: 0. Items flagged: 0.**

---

## bibliografia.html

No changes. The EN block carries a translator's note ("bibliographical and archival entries are kept
in their original language") and then mirrors the Spanish entries verbatim. Verified by
programmatic paragraph-by-paragraph diff of the two blocks: all 211 entries (48 archival + 163
bibliographic, incl. the two section headings) are byte-identical except the two intended translated
headings (`ARCHIVAL SOURCES`, `BIBLIOGRAPHIC SOURCES`) and the translator's note paragraph.
Publisher names, years, page ranges, issue numbers therefore cannot have drifted.

**bibliografia.html — entries checked: 213 aligned items. Fixes applied: 0. Items flagged: 0.**

---

## anexo.html

- `file`: anexo.html
- `where`: shared page-toc nav inside the `lang-es` block, `page-toc-title` span pair
- `category`: terminology
- `was`: `<span class="l-es">Índice de tablas</span><span class="l-en">Table of contents</span>`
- `now`: `<span class="l-es">Índice de tablas</span><span class="l-en">Index of tables</span>`
- `why`: the nav is an index of the annex's 16 tables; "Table of contents" misdescribes it (topic
  drift toward the generic "índice" rendering used on chapter pages).
- `confidence`: fixed (high)

Everything else verified cell by cell against the Spanish tables (programmatic alignment of all 19
tables + 13 paragraphs + 16 table titles, EN = ES−1 positional offset):

- All numeric cells, counts, totals in parentheses "(76) … (2)", "(60) … (9)" and percentage-free
  conclusion paragraphs: digit sequences identical ES↔EN — zero numeric mismatches.
- All `[dibujo: …]` cells correctly rendered `[drawing: …]`.
- "Untranslated" cells are legitimate cognates/place names (Circular, Triangular, Rectangular,
  Biojival, Diagonal, Indeterminable, Agüimes, Gáldar, Telde, Artenara, Arucas, Santa Lucía, La
  Aldea de San Nicolás…).
- Controlled vocabulary consistent throughout: excised/incised/impressed motifs; "Of angular/rounded
  section"; "Triangles/Rhombi opposed at the apex"; "Concentric …"; "No provenance"; "Undetermined
  (fragment)"; "guide lines/impressions". "Circunferencia(s)" → "Circumference(s)" but
  "circunferencias concéntricas" → "Concentric circles" — matches the source's own collocational
  usage; not an error.
- Known Spanish-side typos left untouched per constraints: "De tendencia elítica" (Tabla 2.14),
  translated correctly as "Of elliptical tendency".

**anexo.html — items checked: 48 aligned items (16 table titles, 13 paragraphs, 19 tables — every
cell). Fixes applied: 1. Items flagged: 0.**

---

## placas.html

Alignment: both lang blocks contain 152 identically ordered items (intro ¶, 2 section headings, 149
figure cards). All 149 `data-reg` keys and caption numbers match ES↔EN ("Registro N" →
"Inventory no. N"); all 135 "Se menciona en … Capítulo N (k)" refs correctly rendered "Mentioned in
… Chapter N (k)"; 77 full fichas compared row by row (Dimensions / Description & technique /
Provenance / History / Bibliography) — every dimension, inventory number, chronology, provenance
and citation number matches; the three decorative techniques are consistently "incised / excised /
impressed", never swapped.

### Fixes applied

1. `file`: placas.html — `where`: fig reg 3049, Description & technique — `category`: topic
   `was`: "…over the excised angle and triangle- and laterales mayores, as well as burnished areas."
   `now`: "…over the excised angle and triangle- and the larger sides, as well as burnished areas."
   `why`: ES "y laterales mayores" was left untranslated in the EN ficha.
   `confidence`: fixed (high)

2. `file`: placas.html — `where`: fig reg 3163, Description & technique — `category`: topic
   `was`: "…on three sides and of angular section on one side menor, as well as burnished areas."
   `now`: "…on three sides and of angular section on a short side, as well as burnished areas."
   `why`: ES "en un lateral menor" — "menor" left untranslated; matches the page's own "short side"
   renderings (regs 3144, 3189, 3229).
   `confidence`: fixed (high)

3. `file`: placas.html — `where`: fig reg 3175, Description & technique — `category`: topic
   `was`: "…over the excised straight line-, laterales and back, as well as generalised burnishing."
   `now`: "…over the excised straight line-, sides and back, as well as generalised burnishing."
   `why`: ES "-, laterales y dorso" — "laterales" left untranslated.
   `confidence`: fixed (high)

4. `file`: placas.html — `where`: fig reg 3189, Description & technique — `category`: topic
   `was`: "…red ochre on the field and one side menor, as well as burnished areas."
   `now`: "…red ochre on the field and the short side, as well as burnished areas."
   `why`: ES "almagre en el campo y lateral menor" — "menor" left untranslated.
   `confidence`: fixed (high)

5. `file`: placas.html — `where`: fig reg 3189, Description & technique — `category`: typography
   `was`: "…that served to guide the work on the field . The pintadera…"
   `now`: "…that served to guide the work on the field. The pintadera…"
   `why`: stray space before the full stop (the ES's own stray space need not be mirrored).
   `confidence`: fixed (high)

6. `file`: placas.html — `where`: fig reg 42902, History — `category`: grammar
   `was`: "…in which there were documented, at the least, part of a stone structure…"
   `now`: "…in which there were documented, at least, part of a stone structure…"
   `why`: ES "se documentan, al menos," — "at the least" is not idiomatic English.
   `confidence`: fixed (high)

7. `file`: placas.html — `where`: figs regs 3092, 3097, 3102, Provenance (3 occurrences) —
   `category`: typography
   `was`: "¿Agüimes?, Gran Canaria."
   `now`: "Agüimes?, Gran Canaria."
   `why`: the Spanish opening question mark ¿ is never used in English; the EN block itself adapts
   elsewhere (reg 3114 History renders "¿1977?" as "?1977?").
   `confidence`: fixed (high)

8. `file`: placas.html — `where`: figs regs 3123, 3172, Provenance (2 occurrences) —
   `category`: fidelity
   `was`: "El Carril o El Pocillo, Montaña Cardones, Arucas, Gran Canaria."
   `now`: "El Carril or El Pocillo, Montaña Cardones, Arucas, Gran Canaria."
   `why`: ES "o" ("or", two toponym variants) was left untranslated; toponyms themselves stay Spanish.
   `confidence`: fixed (high)

9. `file`: placas.html — `where`: fig reg 3080, Description & technique — `category`: fidelity
   `was`: "The field is defined by an excised circle, an excised circle and triangular impressions."
   `now`: "The field is defined by an excised circle, an excised circumference and triangular impressions."
   `why`: ES distinguishes "círculo exciso, circunferencia excisa" (two different motifs); rendering
   both as "an excised circle" reads as an accidental duplication. "Circumference" is the rendering
   used for singular "circunferencia" in anexo.html.
   `confidence`: fixed (high for the fix itself; see FLAG 2 below on the page-wide convention)

10. `file`: placas.html — `where`: "Perforación" process-plate caption — `category`: grammar
    `was`: "Perforation: a hole drilled through the piece, probably to hang it up."
    `now`: "Perforation: a hole drilled through the piece, probably for suspension."
    `why`: ES "probablemente para su suspensión" — the colloquial "to hang it up" is below the
    original's register; the prompt requires elevating such renderings.
    `confidence`: fixed (high)

### Flags (not changed)

- FLAG 1 — `file`: placas.html — `where`: fig reg 3089, Bibliography — `category`: typography
  `was`/`now`: "pp. 1-72, ¿nº 746?." kept as is. `why`: the Spanish doubt mark "¿nº 746?" sits
  inside a bibliographic citation that the EN deliberately keeps in Spanish form (like all ficha
  citations), so adapting it to "no. 746?" would make the citation typographically mixed; option B
  is to normalise it since it is an annotation, not part of the cited title. `confidence`: flagged
  (uncertain — human decision).

- FLAG 2 — `file`: placas.html — `category`: terminology (page-wide)
  The EN block renders "circunferencia" as "circle" throughout (e.g. reg 3053 "circunferencia
  excisa" → "excised circle"; regs 3077, 3087 "circunferencia incisa" → "incised circle";
  "circunferencias concéntricas" → "concentric circles"), which collides with "círculo" → "circle".
  anexo.html keeps the distinction (singular "Circumference" ×10). Fix 9 resolves only the one place
  where the collision is nonsensical (reg 3080). A human decision is needed: either accept
  "circle" for circunferencia across placas (with 3080 as an exception) or switch all singular
  "circunferencia" instances in placas to "circumference". `confidence`: flagged (systemic).

- FLAG 3 (informational) — `file`: placas.html — EN mention-pills link to chapter tops
  (`href="ch2.html"`) while ES pills link to the ES anchors (`ch2.html#reg-ch2-es-N`). Pre-existing,
  deliberate-looking (EN has no `reg-ch2-en-*` anchors to target), and `href`s are protected markup,
  so left untouched.

- Also verified correct: guillemets «Details» in the intro match accepted EN-side site practice
  (ch4.html uses «…» in English tooltips); the ES-side typo in the `data-reg="Excesión"` attribute
  and ES caption "Excesión" (for "excisión") is Spanish/attribute markup — untouched; EN caption
  correctly reads "Excision".

**placas.html — items checked: 152 aligned items per block (149 figure cards incl. 77 full museum
fichas, every ficha row compared). Fixes applied: 13 replacements (10 log entries). Items flagged: 3.**

---

## Totals

| Page | Items checked | Fixes applied | Flagged |
|---|---|---|---|
| index.html | 37 span pairs + 6 ¶ | 0 | 1 (informational) |
| preliminares.html | 24 span pairs + 16 entries | 0 | 0 |
| bibliografia.html | 213 entries | 0 | 0 |
| anexo.html | 48 items / all table cells | 1 | 0 |
| placas.html | 152 items / 77 fichas | 13 (10 entries) | 3 |

Needs human decision: (1) FLAG 1 "¿nº 746?" typography inside a Spanish-form citation;
(2) FLAG 2 page-wide circle/circumference convention in placas.html; (3) index.html shared
"Registro N" tooltips (would need paired EN tooltip markup to fix); (4) optionally, whether EN
mention-pills should gain EN-target anchors.

---

## Resolution pass (maintainer decisions applied)

Date: 2026-11-05. Scope: placas.html (edits), anexo.html / preliminares.html / bibliografia.html
(verification + systemic sweeps only — no text edits). Spanish untouched everywhere; only EN-side
text nodes modified. Files edited this pass: **placas.html only**.

### Item 21 — reg 3089 bibliography annotation

- `file`: placas.html — `where`: fig reg 3089, Bibliography row (EN ficha) — `category`: typography
- `was`: `pp. 1-72, ¿nº 746?.` — `now`: `pp. 1-72, no. 746?.`
- `why`: resolves FLAG 1 — it is an annotation, not part of the cited title (citations keep their
  Spanish form, so `nº` stays inside the citation itself); the Spanish opening doubt mark ¿ is not
  used in English. Applied on the EN side only; ES `¿nº 746?.` untouched.
- `confidence`: fixed (high)

### Item 22 — círculo / circunferencia unification in placas.html

Decision applied: circunferencia → "circumference(s)", círculo → "circle" (site-wide convention,
matching ch2's 1:1 usage). Every instance verified against its ES counterpart in the per-record
ficha pair before changing; all 16 instances below are ES "circunferencia(s)" (the only genuine ES
"círculo" on the page is reg 3080, untouched). "circular impression(s)" / "circular field" (ES
"impresión circular", "campo circular") deliberately NOT touched.

- reg 3053: ES "circunferencia excisa" → EN was "an excised circle" now "an excised circumference"
  (Description & technique)
- reg 3053: ES "circunferencias concéntricas incisas" → EN was "incised concentric circles" now
  "incised concentric circumferences" (Description & technique)
- reg 3053: ES "sobre circunferencia excisa" → EN was "-over the excised circle-" now
  "-over the excised circumference-" (Description & technique)
- reg 3062: ES "circunferencias concéntricas incisas" → EN was "incised concentric circles" now
  "incised concentric circumferences"
- reg 3062: ES "circunferencias incisas" → EN was "incised circles" now "incised circumferences"
- reg 3063: ES "circunferencias concéntricas incisas" → EN was "incised concentric circles" now
  "incised concentric circumferences"
- reg 3064: ES "circunferencias concéntricas incisas" → EN was "incised concentric circles" now
  "incised concentric circumferences"
- reg 3071: ES "circunferencias concéntricas incisas" → EN was "incised concentric circles" now
  "incised concentric circumferences"
- reg 3077: ES "circunferencia incisa" → EN was "an incised circle" now "an incised circumference"
- reg 3079: ES "circunferencias incisas" → EN was "incised circles" now "incised circumferences"
- reg 3081: ES "circunferencia incisa" → EN was "an incised circle" now "an incised circumference"
- reg 3087: ES "circunferencia incisa" → EN was "an incised circle" now "an incised circumference"
- reg 3089: ES "circunferencias concéntricas incisas" → EN was "incised concentric circles" now
  "incised concentric circumferences"
- reg 3125: ES "circunferencias concéntricas incisas" → EN was "incised concentric circles" now
  "incised concentric circumferences"
- reg 3126: ES "circunferencias incisas" → EN was "incised circles" now "incised circumferences"
- reg 3128: ES "circunferencias concéntricas incisas" → EN was "incised concentric circles" now
  "incised concentric circumferences"

Total: 16 replacements in 13 records (3053 ×3, 3062 ×2, one each in 3063, 3064, 3071, 3077, 3079,
3081, 3087, 3089, 3125, 3126, 3128). Resolves FLAG 2.

- reg 3080: verified and kept — "an excised circle, an excised circumference" correctly mirrors
  ES "círculo exciso, circunferencia excisa" (first-pass fix 9); no further change.
- anexo.html: confirmed unchanged and correct — Circumference(s) for circunferencia(s); the fixed
  table collocation "circunferencias concéntricas" → "Concentric circles" remains as documented in
  the first pass (collocational usage; maintainer instructed no changes there). Observation only:
  ch2.html prose renders the same collocation as "concentric circumferences", so the two pages
  differ on this one collocation — left as is per instruction.
- ch2.html: confirmed as the convention source — 8/8 circunferencia → "circumference(s)" (incl.
  "concentric circumferences"), 4/4 círculo → "circle(s)". No changes needed or made.

### Systemic sweeps (EN side of the four files; text nodes + EN-side title attributes)

- **A. Calque blacklist** — scanned placas, anexo, preliminares, bibliografia for: "in attention
  to", "in function of", "gives place to", "one assists to", "found situated", "makes impossible
  to", "allowed to + infinitive", "it has been opted to", "the years 60/70/80/90", "Facing this".
  Result: **0 hits in all four files** — nothing to repair. (preliminares and bibliografia EN
  blocks carry no running prose beyond the translator's note, which is clean.)
- **B. "archaeological interventions"** — 0 occurrences of "intervention(s)" in any of the four
  files; no decision required. Logged as verified-absent.
- **C. Literal asterisks in EN title attributes** — verified **0** in all four files (no title
  attributes contain `*`). For completeness: text-node asterisks found in placas EN (reg
  "Indeterminable*", "*An exceptional piece…") and preliminares EN (affiliation marks */**) were
  checked against the Spanish and are mirrored footnote/affiliation markers from the source —
  legitimate, left in place.
- **D. "stamp"/"seal" as nouns** — 0 hits in EN text of all four files (pintaderas convention
  already respected). No changes.

### Explicitly not touched (per instructions)

- index.html (tooltips fixed centrally), all mention-pill `href="chN.html…"` attributes (item 23
  handled centrally later), `<span class="plate-cap">Registro N</span>` captions (shared markup),
  and the ES-side "Excesión"/`data-reg="Excesión"` typo (Spanish/attribute markup).

### Verification results (vs git HEAD, all four files)

- Structural counts identical to HEAD for placas.html, anexo.html, preliminares.html,
  bibliografia.html: `<p>`, `<a>`, `<sup>`, `<span class="l-es">`, `<span class="l-en">`,
  `lang-block` divs, `<table>`, `<figure>`, `<details>`, `data-reg`, `mention-pill`, `plate-cap` —
  all unchanged (placas: 149 plate-card figures per block, 148 distinct regs + process figs).
- placas.html lang-es block: **byte-identical to HEAD** — Spanish untouched by this pass (and by
  the first pass).
- title attributes in all four files: none exist, hence unchanged; `alt`/`src` and `href` differ
  from HEAD only by the pre-existing site-wide asset bump `?v=66` → `?v=67` (present before this
  pass; not a QC change). No mention-pill or other href touched.
- Word-level diff of placas.html vs HEAD decomposes exactly into: the `?v=` bump + the 12
  first-pass EN fixes already logged above + the 16 circumference edits + item 21 of this pass.
  No other differences. Entities preserved (only ASCII word substitutions plus removal of the
  single `¿` in the reg 3089 EN annotation). anexo.html's only non-bump delta vs HEAD remains the
  first-pass "Index of tables" fix.

**Resolution pass totals: placas.html 17 text changes (item 21 ×1 + item 22 ×16); sweeps A–D:
0 further changes across all four files; anexo/preliminares/bibliografia: 0 edits. FLAG 1 and
FLAG 2 from the first pass are now closed; remaining open items: index.html shared "Registro N"
tooltips (central fix) and mention-pill EN anchors (item 23, central fix).**
