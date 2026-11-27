// Demo of the home page with the mill's own photographs: hero options and the photo-led tint.
// Run: node www/_src/demo.mjs  → www/demo/index.html (not in the sitemap; staging pages are noindex).
// The panel at the bottom switches hero (?hero=mosaic|citrus|teal|sun) and tint (?tint=wash|bloom|off).
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, real, newPage } from './lib.mjs';
import { FAMILIES, famHref, quoteCta, evidenceRows } from './pages-en.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = newPage({ path: '/demo/', lang: 'en', nav: '/', title: 'Demo: hero and photo tint | Aktan Misr',
  description: 'Internal demo of the home page with the mill’s own photographs.', css: ['/assets/demo.css'], scripts: ['/assets/demo.js'] });

const heroText = (k) => `<div class="hero__text">
      <h1 id="hero-h-${k}">Egyptian towel manufacturer for your label</h1>
      <p class="lead">Towels and bathrobes woven, dyed and finished for your brand since 1956.</p>
      <div class="hero__actions">${quoteCta('buyer=private-label')}<a class="link" href="/private-label/">How private label works</a></div>
    </div>`;
const heroSizes = '(min-width: 90rem) 760px, (min-width: 60rem) 52vw, 100vw';

// (b) one product close-up, three candidates
const CLOSE = {
  citrus: ['kitchen-orange-citrus', 'An orange terry kitchen towel with a woven band of citrus slices, beside a rolled red towel', '50% 70%', 'Jacquard band, woven in'],
  teal: ['bath-teal-dots', 'A folded teal bath towel with a band of woven dots', '40% 50%', 'Dobby band, dyed to match'],
  sun: ['beach-sun-closeup', 'Close-up of a velour beach towel printed with an orange sun on pink', '50% 40%', 'Velour, printed in colour'],
};
const closeHero = (key, first) => {
  const [name, alt, pos, cap] = CLOSE[key];
  return `<section class="hero hero--close" data-hero="${key}" aria-labelledby="hero-h-${key}"${first ? '' : ' hidden'}>
  <div class="container grid">
    ${heroText(key)}
    <div class="hero__pic">
      ${real(name, alt, { eager: first, pos, sizes: heroSizes, tint: true })}
      <p class="caption"><span>${cap}</span><span>100% Egyptian cotton</span></p>
    </div>
  </div>
</section>`;
};

// (a) the range in three photographs; one tint for the group (the teal the robe and towel share)
const mosaicHero = (first) => `<section class="hero hero--mosaic" data-hero="mosaic" aria-labelledby="hero-h-mosaic"${first ? '' : ' hidden'}>
  <div class="container grid">
    ${heroText('mosaic')}
    <div class="hero__mosaic" data-tint="200 0.065">
      ${real('robe-couple-sofa', 'A couple in matching teal striped bathrobes on a white sofa', { cls: 'm m1', eager: first, pos: '50% 30%', sizes: '(min-width: 60rem) 28vw, 50vw' })}
      ${real('bath-teal-dots', 'A folded teal bath towel with a band of woven dots', { cls: 'm m2', eager: first, sizes: '(min-width: 60rem) 24vw, 50vw' })}
      ${real('stock-hotel-spa', 'Plush white hotel towels folded in a stack, close up', { cls: 'm m3', eager: first, pos: '50% 50%', sizes: '(min-width: 60rem) 24vw, 50vw' })}
    </div>
  </div>
</section>`;

// Each family gets one of the mill's own photographs (the hotel set is the one stock-looking shot we keep).
const FAM_PHOTO = {
  'bath-towels': ['bath-blue-jacquard', 'Royal blue jacquard bath towels hanging on a rail and folded in a stack', '50% 60%'],
  bathrobes: ['robe-woman-bed', 'A woman in an orange check hooded bathrobe sitting on a bed', '50% 35%'],
  'hotel-towels': ['stock-hotel-jacquard', 'White hotel towels with a woven border, folded in a stack', '50% 50%'],
  'kitchen-towels': ['kitchen-green-check', 'Green check and jacquard kitchen towels on a wooden box', '50% 50%'],
  'beach-towels': ['beach-green-chair', 'A green printed velour beach towel over a poolside chair', '50% 45%'],
  pareo: ['pareo-red-rail', 'A red and white striped pareo hanging on a pool railing', '60% 50%'],
};

p.body = `
${mosaicHero(true)}
${closeHero('citrus', false)}
${closeHero('teal', false)}
${closeHero('sun', false)}

<section aria-labelledby="pl-h">
  <div class="container split">
    ${real('kitchen-hanging-trio', 'Three printed tea towels hanging on a rail above a stack of folded towels', { pos: '50% 40%', tint: true })}
    <div>
      <h2 id="pl-h">Your brand, made in our mill</h2>
      <p class="lead">Importers and retail brands send us a brief. We weave, dye, finish and pack it under their name.</p>
      <dl class="ruled" style="margin-top: var(--space-xl)">
        <div><dt>Design</dt><dd>Your artwork, drawn for our jacquard looms</dd></div>
        <div><dt>Colour</dt><dd>Matched in our own dye house</dd></div>
        <div><dt>Label and packing</dt><dd>Your labels, bands and cartons</dd></div>
      </dl>
      <div class="actions"><a class="link" href="/private-label/">How private label works</a></div>
    </div>
  </div>
</section>

<section aria-labelledby="mill-h">
  <div class="container">
    <div class="head head--split"><h2 id="mill-h">What one mill controls</h2><p class="lead">Weaving, dyeing, finishing and packing happen under one roof in El-Mahalla El-Kubra.</p></div>
    <ol class="steps" style="--n: 4">
      <li><h3>Weaving</h3><p>Terry, velour, waffle, dobby and jacquard.</p></li>
      <li><h3>Dyeing</h3><p>Yarn- or piece-dyed in our own dye house.</p></li>
      <li><h3>Finishing</h3><p>Cut, hemmed and double stitched.</p></li>
      <li><h3>Packing</h3><p>Inspected and packed for export.</p></li>
    </ol>
    <p style="margin-top: var(--space-xl)"><a class="link" href="/manufacturing/">See how it is made</a></p>
  </div>
</section>

<section aria-labelledby="range-h">
  <div class="container">
    <div class="head head--split"><h2 id="range-h">Six families to start from</h2><p class="lead">Each one takes your design, colour and label.</p></div>
    <div class="families">
      ${FAMILIES.map((f) => { const [n, alt, pos] = FAM_PHOTO[f.slug]; return `<a href="${famHref(f)}">${real(n, alt, { pos, sizes: '(min-width: 90rem) 440px, (min-width: 60rem) 30vw, (min-width: 40rem) 50vw, 100vw' })}<h3>${f.name}</h3><p>${f.weaves}</p></a>`; }).join('\n      ')}
    </div>
  </div>
</section>

<section class="bleed" aria-label="Beach towels by the pool">
  ${real('beach-lounger-flame', 'A flame-coloured velour beach towel draped over a white sun lounger by a pool', { cls: 'ph-bleed', pos: '50% 55%', sizes: '100vw', tint: true })}
  <div class="container"><div class="plate"><p>Woven, dyed and finished in El‑Mahalla El‑Kubra.</p><small>About 10 tons of finished goods a day.</small></div></div>
</section>

<section aria-labelledby="ev-h">
  <div class="container">
    <div class="head head--split"><h2 id="ev-h">The evidence buyers ask for</h2><p class="lead">What we can show today, and what we are preparing to publish.</p></div>
    ${evidenceRows(false)}
    <p style="margin-top: var(--space-lg)"><a class="link" href="/quality/">Quality and evidence</a></p>
  </div>
</section>

<section aria-labelledby="buyers-h">
  <div class="container">
    <div class="head"><h2 id="buyers-h">Also for hotels and distributors</h2></div>
    <div class="buyers">
      <article>${real('stock-hotel-bedside', 'White hotel towels with soap laid on a made bed', { pos: '50% 60%' })}<h3>Hotels and spas</h3><p>White or house-colour towels and robes, double stitched for laundering.</p><a class="link" href="/hotels/">Hotel towels</a></article>
      <article>${real('fair-stand-shelves', 'Shelves of folded towels at the Aktan Misr trade-fair stand', { pos: '50% 50%' })}<h3>Distributors</h3><p>Catalogue lines or your own, in volume, from one mill.</p><a class="link" href="/distributors/">For distributors</a></article>
    </div>
  </div>
</section>

<section aria-labelledby="year-h">
  <div class="container year">
    <p class="year__num" aria-hidden="true">1956</p>
    <div><h2 id="year-h" class="visually-hidden">Since 1956</h2><p>Weaving in El‑Mahalla El‑Kubra since 1956, known for decades as Sehely Textile.</p><a class="link" href="/about/">About the mill</a></div>
  </div>
</section>

<form class="demo-panel" aria-label="Demo options" data-demo><details open><summary>Demo options</summary>
  <fieldset><legend>Hero</legend>
    <label><input type="radio" name="hero" value="mosaic" checked><span>Range mosaic</span></label>
    <label><input type="radio" name="hero" value="citrus"><span>Citrus</span></label>
    <label><input type="radio" name="hero" value="teal"><span>Teal dots</span></label>
    <label><input type="radio" name="hero" value="sun"><span>Sun</span></label>
  </fieldset>
  <fieldset><legend>Photo tint</legend>
    <label><input type="radio" name="tint" value="auto"><span>Bloom + wash</span></label>
    <label><input type="radio" name="tint" value="wash" checked><span>Page wash</span></label>
    <label><input type="radio" name="tint" value="bloom"><span>Bloom</span></label>
    <label><input type="radio" name="tint" value="off"><span>Off</span></label>
  </fieldset>
</details></form>`;

const file = join(root, 'demo', 'index.html');
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, render(p));
console.log('wrote', file);
