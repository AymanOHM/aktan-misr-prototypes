# Design review: run plan

Run order, model and `/clear` points. Paste each phase's prompt into a fresh session.

| Phase | Model | Before it | Output |
|---|---|---|---|
| 1. Critique | Opus (`/model opus`) | `/clear` | `design-critique.md` |
| 2. Decide | Opus | none (same session) | decisions added to `design-critique.md` |
| 3. Build | Sonnet (`/model sonnet`) | `/clear` | commits on the branch |
| 4. Check | Opus | `/clear` | screenshots and a short pass/fail list |

Why: phases 1, 2 and 4 are taste and judgment, where the stronger model is worth the cost. Phase 3 carries out decisions already written down, so Sonnet is enough and the file holds the context the clear throws away.

---

## Phase 1 prompt (after `/clear`, on Opus)

```
Use the design:design-critique skill to give a hard, honest design review of the Aktan Misr site in this repo. The question to answer: does this look AI-generated or template-made, and do its features add clutter instead of originality and taste? The bar is a site a design-literate buyer would call tasteful and particular to this mill.

Context:
- Aktan Misr (formerly Sehely) is an Egyptian cotton towel mill selling B2B for export: bath, hotel, kitchen and beach towels, bathrobes, pareo. Visitors are importers, retail brands, hotels. The goal is a quote request.
- Static site in www/, built from www/_src (lib.mjs layout, pages-en.mjs, pages-ar.mjs, demo.mjs). English and Arabic (RTL). CSS in www/assets/ (styles.css, phone.css, scroll.css, demo.css); behaviour in www/assets/site.js.
- Current choices: terracotta and teal colour with one teal band and a terracotta footer; Sentient serif with Hanken Grotesk (Noto Naskh / IBM Plex Sans Arabic); the mill's own photographs plus some Unsplash stand-ins on /manufacturing/; a scroll-held "mill chapter" on the home page; a photo-led tint halo behind key photos; /demo/ compares hero options.
- styles.css has "Hallmark · waive" comments: deliberate exceptions to a design rule set. Treat them as claims to judge, not as settled.
- Fill-in placeholders (span.fill) are deliberate content gaps. Ignore them as copy, but judge how they look.

Task:
1. Build: BASE=/aktan-misr-prototypes/www node www/_src/build.mjs && BASE=/aktan-misr-prototypes/www node www/_src/demo.mjs
2. Serve the repo root on a local port and take screenshots with the pre-installed Playwright (deviceScaleFactor 1) of: home, /products/, one product page, /manufacturing/, /quote/, /ar/, and /demo/. Take each at 1440x900 and on an iPhone 13. Full page, and scroll through the mill chapter in steps. Look at every screenshot before you judge.
3. Judge each of these, with the screenshot or file:line that shows it:
   - AI-generated tells: generic hero formula, symmetric card grids, gradient or halo effects for their own sake, uniform rounded cards, stock-looking copy rhythm, effects every template uses.
   - Features that add clutter: for each effect (mill chapter, tint halo, reveal motion, colour band, mosaic hero), say whether it earns its place for a towel buyer, and what is left if it is removed.
   - Originality: what here could only belong to this mill (the weave, the dye house, Egyptian cotton, the trade-fair stand), and where the site misses a chance to show it.
   - Craft: type scale and rhythm, spacing, image cropping and the mix of real and stand-in photos, colour use, Arabic typesetting and RTL mirroring, mobile.
4. Give the strongest case for keeping the current direction, then your verdict.

Constraints: read and screenshot only. Change no site files in this phase. Keep product facts and copy as they are; you may comment on tone.

Output: write design-critique.md at the repo root:
- Verdict in three sentences: is it tasteful, does it read as AI-made, the one change that matters most.
- Findings ranked by impact. Each: what, where (page and file:line), why it hurts, the fix, size (S/M/L).
- Cut / keep / change list for every effect named above.
- What you did not check.
Then stop and show me the verdict and top five findings.

Done when: design-critique.md exists, every finding points to a screenshot or file:line, and each named effect has a cut, keep or change call.
```

## Phase 2 (same session, Opus)

Go through the findings with Claude. Ask it to grill you on each cut or change: what it costs and the strongest case against your leaning. Have it write your decisions into a "Decisions" section at the end of `design-critique.md`, each as one line with the files it touches. Commit and push the file.

## Phase 3 prompt (after `/clear`, on Sonnet)

```
Carry out the "Decisions" section of design-critique.md on the Aktan Misr site, one decision per commit.

Scope: www/_src/*.mjs and www/assets/*. Rebuild after each change with BASE=/aktan-misr-prototypes/www node www/_src/build.mjs && BASE=/aktan-misr-prototypes/www node www/_src/demo.mjs, and commit the rebuilt HTML with the source.

Constraints: make only the listed decisions; no extra features or refactors. Keep EN and AR in step, and keep RTL working. Keep text contrast at 4.5:1 or above. Respect prefers-reduced-motion. Stop and ask before deleting photographs, adding dependencies or fonts, or changing product facts.

Verify: node --check www/assets/site.js; the build ends with "built 21 pages" (or the new count, if a decision changes pages); screenshot each changed page at 1440x900 and iPhone 13 and look at it. Show me the output and list each decision as done, or skipped with the reason. Push to the current branch.
```

## Phase 4 prompt (after `/clear`, on Opus)

```
Check the design changes on this branch against design-critique.md. Rebuild, serve and screenshot the same pages and sizes as the critique did. For each decision, say pass or fail with the screenshot. Then answer again: does the site still read as AI-made anywhere? List what is left, ranked. Change no files; write the result at the end of design-critique.md under "Check".
```
