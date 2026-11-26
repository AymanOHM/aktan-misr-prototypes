import { pic, fill, pageHead, newPage, SITE, esc } from './lib.mjs';

// Product families: facts from sehely.com and the Heimtextil listings; unknowns are fills.
export const FAMILIES = [
  { slug: 'bath-towels', name: 'Bath and face towels', weaves: 'Terry, velour, dobby and jacquard borders', for: 'Retail brands, hotels', photo: 'colours', alt: 'Stacks of folded towels in red, pink, cream and brown on shelves', brief: 'Your own: bath towels in three colourways, folded, plain backdrop',
    lead: 'Face and bath towels in 100% Egyptian cotton, yarn- or piece-dyed, with your border or logo.',
    spec: [['Sizes', fill('size list')], ['Weight', fill('g/m² range')], ['Weaves', 'Terry, velour, dobby, jacquard border'], ['Dyeing', 'Yarn-dyed or piece-dyed, in our own dye house'], ['Minimum order', fill('MOQ per design and colour')]] },
  { slug: 'bathrobes', name: 'Bathrobes', weaves: 'Terry, velour, jacquard terry', for: 'Retail brands, hotels, spas', photo: 'bathrobes', alt: 'Two white terry bathrobes hanging on hooks in a bathroom', brief: 'Your own: shawl-collar and kimono robes on a plain wall',
    lead: 'Bathrobes in terry, velour or jacquard terry, made to your design and label.',
    spec: [['Styles', fill('styles offered')], ['Sizes', fill('size run')], ['Weight', fill('g/m² range')], ['Weaves', 'Terry, velour, jacquard terry'], ['Minimum order', fill('MOQ per style and colour')]] },
  { slug: 'hotel-towels', name: 'Hotel towels', weaves: 'Terry, double-stitched hems', for: 'Hotels, spas, distributors', photo: 'white-stack', alt: 'A stack of clean white towels', brief: 'Your own: white hotel towels with a dobby border, stacked',
    href: '/hotels/' },
  { slug: 'kitchen-towels', name: 'Kitchen towels', weaves: 'Waffle, terry and flat', for: 'Retail brands', photo: 'kitchen', alt: 'A blue and white striped cotton kitchen towel under a bowl of blueberries', brief: 'Your own: kitchen towel sets, banded, on a table',
    lead: 'Waffle, terry and flat-woven kitchen towels in your colours and design.',
    spec: [['Sizes', fill('size list')], ['Weaves', 'Waffle, terry, flat'], ['Packing', fill('sets and bands')], ['Minimum order', fill('MOQ per design')]] },
  { slug: 'beach-towels', name: 'Beach towels', weaves: fill('weaves to confirm'), for: 'Retail brands, resorts', photo: 'striped-stack', alt: 'Navy and white striped terry towels folded in a stack', brief: 'Your own: beach towels in summer colours, rolled',
    lead: 'Thin, fast-drying Egyptian cotton terry in strong colours.',
    spec: [['Sizes', fill('size list')], ['Weight', fill('g/m² range')], ['Weaves', fill('weaves to confirm')], ['Minimum order', fill('MOQ per design')]] },
  { slug: 'pareo', name: 'Pareo', weaves: 'Dobby and jacquard', for: 'Retail brands, resorts', photo: 'striped-sea', alt: 'A striped flat-woven cotton towel laid on rocks by the sea', brief: 'Your own: pareo with fringed ends, hung or folded',
    lead: 'Dobby and jacquard pareo with fringed ends.',
    spec: [['Sizes', fill('size list')], ['Weaves', 'Dobby, jacquard'], ['Finish', fill('fringe and hem options')], ['Minimum order', fill('MOQ per design')]] },
];
const famHref = (f) => f.href || `/products/${f.slug}/`;

const ORG = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Aktan Misr Textile & Dyeing S.A.E.', alternateName: ['Sehely Textile & Dyeing', 'Sehely Textile'],
  url: SITE + '/', logo: SITE + '/assets/mark.png', foundingDate: '1956',
  address: { '@type': 'PostalAddress', streetAddress: 'Industrial Zone', addressLocality: 'El-Mahalla El-Kubra', postalCode: '31911', addressCountry: 'EG' },
  sameAs: ['https://www.linkedin.com/company/aktan-misr-textile-dyeing-s-a-e-sehely-textile-dyeing/', 'https://www.facebook.com/sehely'],
};

const quoteCta = (q, label = 'Request a quote') => `<a class="btn btn--solid" href="/quote/${q ? '?' + q : ''}">${label}</a>`;

function evidenceRows(full) {
  const rows = [
    ['Fibre', '100% Egyptian cotton, all products', 'ok', 'Confirmed by the mill'],
    ['Egyptian cotton licence', fill('licence document'), 'todo', 'To publish'],
    ['Colour fastness', `Tested in our own dye house; ${fill('test standard and results')}`, 'todo', 'To publish'],
    ['Wash durability', fill('tested wash cycles'), 'todo', 'To publish'],
    ['Certifications', fill('certifications actually held'), 'todo', 'To publish'],
    ['Capacity', 'About 10 tons of finished goods a day', 'ok', 'Stated by the mill'],
  ];
  const use = full ? rows : rows.filter((r) => ['Fibre', 'Colour fastness', 'Certifications', 'Capacity'].includes(r[0]));
  return `<table class="evidence"><caption class="visually-hidden">What we can show buyers, and what is still to publish</caption>
<thead><tr><th scope="col">Item</th><th scope="col">What we can show</th><th scope="col">Status</th></tr></thead>
<tbody>${use.map(([a, b, s, l]) => `<tr><th scope="row">${a}</th><td>${b}</td><td><span class="status status--${s}">${l}</span></td></tr>`).join('')}</tbody></table>`;
}

export function pages() {
  const out = [];

  // ---------------- HOME ----------------
  {
    const p = newPage({ path: '/', lang: 'en', nav: '/', title: 'Egyptian Towel Manufacturer for Private Label | Aktan Misr',
      description: 'Egyptian towel manufacturer in El-Mahalla El-Kubra since 1956. Private-label towels and bathrobes in 100% Egyptian cotton, woven, dyed and finished in our own mill.',
      alternates: { ar: '/ar/' }, ld: ORG, preload: 'monogram' });
    p.body = `
<section class="hero" aria-labelledby="hero-h" style="padding-top: var(--space-2xl)">
  <div class="container grid">
    <div class="hero__text">
      <h1 id="hero-h">Egyptian towel manufacturer for your label</h1>
      <p class="lead">Towels and bathrobes woven, dyed and finished for your brand since 1956.</p>
      <div class="hero__actions">${quoteCta('buyer=private-label')}<a class="link" href="/private-label/">How private label works</a></div>
    </div>
    <div class="hero__pic">
      ${pic(p, 'monogram', 'Folded grey terry towels, the top one embroidered with a monogram and a sewn-in label', 'Your own: a private-label towel set with a client-style woven label and jacquard logo, studio light', { eager: true })}
      <p class="caption"><span>Your design, colour and label</span><span>100% Egyptian cotton</span></p>
    </div>
  </div>
</section>

<section aria-labelledby="pl-h">
  <div class="container split">
    ${pic(p, 'towels-shelf', 'Folded terry towels in mauve and grey on a wooden shelf', 'Your own: a finished private-label order, folded and banded, ready to pack')}
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
      ${FAMILIES.map((f) => `<a href="${famHref(f)}">${pic(p, f.photo, f.alt, f.brief)}<h3>${f.name}</h3><p>${f.weaves}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="bleed" aria-label="The mill">
  ${pic(p, 'looms', 'Rows of industrial looms in a textile mill', 'Your own: the loom hall at El-Mahalla El-Kubra, wide, working', { cls: 'ph-bleed' })}
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
      <article>${pic(p, 'white-stack', 'A stack of clean white terry towels', 'Your own: white hotel towels on a housekeeping trolley')}<h3>Hotels and spas</h3><p>White or house-colour towels and robes, double stitched for laundering.</p><a class="link" href="/hotels/">Hotel towels</a></article>
      <article>${pic(p, 'dyed-rolls', 'Rolled towels in blue and green, stacked', 'Your own: banded bundles and cartons ready to ship')}<h3>Distributors</h3><p>Catalogue lines or your own, in volume, from one mill.</p><a class="link" href="/distributors/">For distributors</a></article>
    </div>
  </div>
</section>

<section aria-labelledby="year-h">
  <div class="container year">
    <p class="year__num" aria-hidden="true">1956</p>
    <div><h2 id="year-h" class="visually-hidden">Since 1956</h2><p>Weaving in El‑Mahalla El‑Kubra since 1956, known for decades as Sehely Textile.</p><a class="link" href="/about/">About the mill</a></div>
  </div>
</section>`;
    out.push(p);
  }

  // ---------------- PRIVATE LABEL ----------------
  {
    const p = newPage({ path: '/private-label/', lang: 'en', nav: '/private-label/', title: 'Egyptian Cotton Private Label Towels | Aktan Misr',
      description: 'Private-label towels and bathrobes in 100% Egyptian cotton from a vertical mill in Egypt: your design, colour, label and packing. See how it works and request a quote.',
      alternates: { ar: '/ar/private-label/' }, crumbs: [['Home', '/'], ['Private label', '/private-label/']] });
    p.body = `${pageHead('Egyptian cotton towels under your label', 'Towels and bathrobes made to your brief, woven, dyed and packed in our own mill.', p.crumbs)}

<section class="s-s" aria-labelledby="how-h">
  <div class="container">
    <div class="head head--split"><h2 id="how-h">How private label works</h2><p class="lead">From your brief to a packed container, in six steps.</p></div>
    <ol class="steps" style="--n: 3">
      <li><h3>Brief</h3><p>Product, size, weight, colour, quantity and market.</p></li>
      <li><h3>Design</h3><p>Our graphic department draws your artwork for the jacquard looms.</p></li>
      <li><h3>Lab dip and sample</h3><p>Your shade matched in our dye house; sample in ${fill('sample lead time')}.</p></li>
      <li><h3>Approval</h3><p>You approve the sample, shade and label before production.</p></li>
      <li><h3>Production</h3><p>Woven, dyed and finished in one mill; lead time ${fill('production lead time')}.</p></li>
      <li><h3>Label, pack and ship</h3><p>Your labels, bands and cartons; shipped for export.</p></li>
    </ol>
    <p style="margin-top: var(--space-xl)">${quoteCta('buyer=private-label', 'Send us your brief')}</p>
  </div>
</section>

<section aria-labelledby="spec-h">
  <div class="container split">
    <div>
      <h2 id="spec-h">What you can specify</h2>
      <p class="lead">Every line is yours to set. Dashed items are details we are confirming.</p>
      <dl class="ruled" style="margin-top: var(--space-xl)">
        <div><dt>Products</dt><dd>Bath and face towels, bathrobes, kitchen and beach towels, pareo</dd></div>
        <div><dt>Weave</dt><dd>Terry, velour, waffle, flat, dobby, jacquard</dd></div>
        <div><dt>Weight</dt><dd>${fill('g/m² range per product')}</dd></div>
        <div><dt>Colour</dt><dd>White, or dyed to your reference shade</dd></div>
        <div><dt>Design</dt><dd>Your logo or pattern woven in jacquard</dd></div>
        <div><dt>Label and packing</dt><dd>${fill('label, band and carton options')}</dd></div>
        <div><dt>Minimum order</dt><dd>${fill('MOQ per design and colour')}</dd></div>
      </dl>
      <div class="actions">${quoteCta('buyer=private-label', 'Start a private-label quote')}<a class="link" href="/catalogue/">Catalogue</a></div>
    </div>
    ${pic(p, 'monogram', 'Folded grey terry towels with an embroidered monogram and a sewn-in label', 'Your own: close-up of a woven client label and jacquard logo on a towel')}
  </div>
</section>

<section aria-labelledby="ev-h">
  <div class="container">
    <div class="head head--split"><h2 id="ev-h">Evidence for your compliance file</h2><p class="lead">What we can show today, and what we are preparing to publish.</p></div>
    ${evidenceRows(false)}
    <p style="margin-top: var(--space-lg)"><a class="link" href="/quality/">Quality and evidence</a></p>
  </div>
</section>

<section aria-labelledby="faq-h">
  <div class="container split" style="align-items: start">
    <div><h2 id="faq-h">Questions brands ask first</h2></div>
    <div class="faq">
      <details><summary>What is your minimum order?</summary><div><p>${fill('MOQ per design and colour')}</p></div></details>
      <details><summary>Can you weave our logo into the towel?</summary><div><p>Yes. Our graphic department redraws your artwork for the jacquard looms, as a border or an all-over design.</p></div></details>
      <details><summary>How do you match our colour?</summary><div><p>Send a reference shade. We dye a lab dip in our own dye house for your approval before production.</p></div></details>
      <details><summary>Is it really Egyptian cotton?</summary><div><p>All our products are 100% Egyptian cotton. ${fill('licence or supplier certificates to publish')}</p></div></details>
      <details><summary>Which markets do you ship to?</summary><div><p>Italy, the United Kingdom, France, Spain, Greece, Australia and Morocco, among others. ${fill('full market list')}</p></div></details>
    </div>
  </div>
</section>
`;
    out.push(p);
  }

  // ---------------- PRODUCTS ----------------
  {
    const p = newPage({ path: '/products/', lang: 'en', nav: '/products/', title: 'Egyptian Cotton Towels and Bathrobes: the Range | Aktan Misr',
      description: 'Six families of 100% Egyptian cotton terry: bath and face towels, bathrobes, hotel, kitchen and beach towels, and pareo. Each made to your design, colour and label.',
      crumbs: [['Home', '/'], ['Products', '/products/']] });
    p.body = `${pageHead('Six families, one cotton', 'Every family is 100% Egyptian cotton and takes your design, colour and label.', p.crumbs)}
<section class="s-s" aria-labelledby="fam-h">
  <div class="container">
    <h2 id="fam-h" class="visually-hidden">Product families</h2>
    <div class="families">
      ${FAMILIES.map((f) => `<a href="${famHref(f)}">${pic(p, f.photo, f.alt, f.brief)}<h3>${f.name}</h3><p>${f.weaves}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>
<section aria-labelledby="cmp-h">
  <div class="container">
    <div class="head"><h2 id="cmp-h">Compare and specify</h2></div>
    <table class="range"><caption class="visually-hidden">Product families with weaves and buyers</caption>
      <thead><tr><th scope="col">Family</th><th scope="col">Weaves</th><th scope="col">For</th><th scope="col"><span class="visually-hidden">Action</span></th></tr></thead>
      <tbody>${FAMILIES.map((f) => `<tr><th scope="row"><a href="${famHref(f)}">${f.name}</a></th><td>${f.weaves}</td><td>${f.for}</td><td><a class="link" href="/quote/?product=${f.slug}">Specify<span class="visually-hidden"> ${f.name.toLowerCase()}</span></a></td></tr>`).join('')}</tbody>
    </table>
  </div>
</section>`;
    out.push(p);
  }

  // ---------------- PRODUCT DETAIL PAGES ----------------
  for (const f of FAMILIES.filter((x) => !x.href)) {
    const p = newPage({ path: `/products/${f.slug}/`, lang: 'en', nav: '/products/', title: `${f.name} in Egyptian Cotton, Private Label | Aktan Misr`,
      description: `${f.lead} Made to your design, colour and label by a vertical mill in El-Mahalla El-Kubra.`,
      crumbs: [['Home', '/'], ['Products', '/products/'], [f.name, `/products/${f.slug}/`]] });
    p.body = `${pageHead(f.name, f.lead, p.crumbs)}
<section class="s-s" aria-labelledby="sp-h">
  <div class="container split">
    ${pic(p, f.photo, f.alt, f.brief)}
    <div>
      <h2 id="sp-h">Specification</h2>
      <dl class="ruled" style="margin-top: var(--space-lg)">
        <div><dt>Fibre</dt><dd>100% Egyptian cotton</dd></div>
        ${f.spec.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n        ')}
      </dl>
      <div class="actions">${quoteCta('product=' + f.slug, `Request a quote for ${f.name.toLowerCase()}`)}<a class="link" href="/private-label/">How private label works</a></div>
    </div>
  </div>
</section>
<section aria-labelledby="more-h">
  <div class="container">
    <div class="head"><h2 id="more-h">Other families</h2></div>
    <div class="families">
      ${FAMILIES.filter((x) => x !== f).slice(0, 3).map((x) => `<a href="${famHref(x)}">${pic(p, x.photo, x.alt, x.brief)}<h3>${x.name}</h3><p>${x.weaves}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>`;
    out.push(p);
  }

  // ---------------- HOTELS ----------------
  {
    const p = newPage({ path: '/hotels/', lang: 'en', nav: '/hotels/', title: 'Hotel Towels Supplier in Egypt, 100% Egyptian Cotton | Aktan Misr',
      description: 'Hotel towels and bathrobes in 100% Egyptian cotton, white or dyed to your house colours, double stitched for laundering. Direct from a mill in El-Mahalla El-Kubra.',
      crumbs: [['Home', '/'], ['Hotels', '/hotels/']] });
    p.body = `${pageHead('Hotel towels from the mill', 'White or house-colour towels and robes, double stitched to last through laundering.', p.crumbs)}
<section class="s-s" aria-labelledby="ht-h">
  <div class="container split">
    ${pic(p, 'white-stack', 'A stack of clean white terry towels', 'Your own: white hotel towels with a dobby border, stacked on a trolley')}
    <div>
      <h2 id="ht-h">What hotels specify</h2>
      <dl class="ruled" style="margin-top: var(--space-lg)">
        <div><dt>Fibre</dt><dd>100% Egyptian cotton</dd></div>
        <div><dt>Colour</dt><dd>White, or dyed to your house colours</dd></div>
        <div><dt>Make</dt><dd>Double-stitched hems; dobby or jacquard border with your logo</dd></div>
        <div><dt>Items</dt><dd>Towels and bathrobes; ${fill('hotel item and size list')}</dd></div>
        <div><dt>Weight</dt><dd>${fill('g/m² range for hotel lines')}</dd></div>
        <div><dt>Wash durability</dt><dd>${fill('tested wash cycles')}</dd></div>
        <div><dt>Minimum order</dt><dd>${fill('MOQ per item')}</dd></div>
      </dl>
      <div class="actions">${quoteCta('buyer=hotel&product=hotel-towels', 'Request a hotel quote')}</div>
    </div>
  </div>
</section>
<section aria-labelledby="hfaq-h">
  <div class="container split" style="align-items: start">
    <div><h2 id="hfaq-h">Questions hotels ask</h2></div>
    <div class="faq">
      <details><summary>Will a reorder match the first delivery?</summary><div><p>Weaving, dyeing and finishing happen in one mill, so shade and construction are controlled in one place. ${fill('how specs and lab dips are kept for reorders')}</p></div></details>
      <details><summary>Can you add our logo?</summary><div><p>Yes, woven as a jacquard or dobby border.</p></div></details>
      <details><summary>Do you supply through a local distributor?</summary><div><p>${fill('direct and distributor supply, by market')}</p></div></details>
    </div>
  </div>
</section>`;
    out.push(p);
  }

  // ---------------- DISTRIBUTORS ----------------
  {
    const p = newPage({ path: '/distributors/', lang: 'en', nav: '', title: 'Wholesale Egyptian Cotton Towels for Distributors | Aktan Misr',
      description: 'Wholesale Egyptian cotton towels, bathrobes, kitchen and beach towels for distributors: catalogue lines or your own, in volume, from one mill in Egypt.',
      crumbs: [['Home', '/'], ['Distributors', '/distributors/']] });
    p.body = `${pageHead('Wholesale towels for distributors', 'Catalogue lines or your own, in volume, from one mill.', p.crumbs)}
<section class="s-s" aria-labelledby="ds-h">
  <div class="container split">
    ${pic(p, 'dyed-rolls', 'Rolled towels in blue and green, stacked', 'Your own: palletised cartons and banded towel bundles in the warehouse')}
    <div>
      <h2 id="ds-h">What distributors get</h2>
      <dl class="ruled" style="margin-top: var(--space-lg)">
        <div><dt>Range</dt><dd>Six families across bath, hotel, kitchen and beach</dd></div>
        <div><dt>Lines</dt><dd>Our catalogue designs, or your own</dd></div>
        <div><dt>Volume</dt><dd>About 10 tons of finished goods a day across the mill</dd></div>
        <div><dt>Lead time</dt><dd>${fill('lead time for catalogue lines')}</dd></div>
        <div><dt>Terms</dt><dd>${fill('payment and delivery terms')}</dd></div>
      </dl>
      <div class="actions">${quoteCta('buyer=distributor', 'Request a distributor quote')}<a class="link" href="/catalogue/">Catalogue</a></div>
    </div>
  </div>
</section>`;
    out.push(p);
  }

  // ---------------- MANUFACTURING ----------------
  {
    const p = newPage({ path: '/manufacturing/', lang: 'en', nav: '/manufacturing/', title: 'Egyptian Towel Factory: How Our Towels Are Made | Aktan Misr',
      description: 'From yarn to packed carton in one mill in El-Mahalla El-Kubra: weaving and jacquard design, our own dye house, finishing and inspection.',
      crumbs: [['Home', '/'], ['Manufacturing', '/manufacturing/']] });
    const stage = (n, img, alt, brief, h, text, facts, flip) => `
<section class="stage${n === 1 ? ' s-s' : ''}" aria-labelledby="m${n}-h">
  <div class="container split${flip ? ' split--flip' : ''}">
    ${pic(p, img, alt, brief)}
    <div><h2 id="m${n}-h">${h}</h2><p class="lead">${text}</p>${facts ? `<dl class="ruled" style="margin-top: var(--space-xl)">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}</div>
  </div>
</section>`;
    p.body = `${pageHead('From yarn to packed carton, in one mill', 'Weaving, dyeing, finishing and packing all happen in El-Mahalla El-Kubra.', p.crumbs)}
${stage(1, 'yarn', 'Cones of cream cotton yarn stacked together', 'Your own: Egyptian cotton yarn cones in the yarn store', 'Yarn', '100% Egyptian cotton yarn, prepared for the warp.', [['Yarn counts', fill('to confirm')]], false)}
${stage(2, 'loom-threads', 'Close-up of warp threads on an industrial loom', 'Your own: a jacquard loom weaving a border, close', 'Design and weaving', 'Our graphic department draws your design for the jacquard looms.', [['Looms', fill('number and type of looms')], ['Weaves', 'Terry, velour, waffle, flat, dobby, jacquard']], true)}
${stage(3, 'dyed-rolls', 'Rolled towels in deep blue and green', 'Your own: the dye house, a dyeing machine and lab-dip bench', 'Dyeing', 'Shade and fastness are set in our own dye house, beside the looms.', [['Dye house', 'About 11,000 m²'], ['Methods', 'Yarn-dyed and piece-dyed']], false)}
${stage(4, 'sewing', 'Workers hemming towels at sewing tables in a textile workshop', 'Your own: the finishing hall, hemming and labelling', 'Finishing', 'Cut, hemmed and double stitched; labels sewn in to your spec.', null, true)}
${stage(5, 'finishing', 'Industrial textile finishing machinery in a large hall', 'Your own: inspection tables and the packing line', 'Inspection and packing', 'Inspected and packed for export: about 10 tons of finished goods a day.', [['Inspection method', fill('to confirm')]], false)}`;
    out.push(p);
  }

  // ---------------- QUALITY ----------------
  {
    const p = newPage({ path: '/quality/', lang: 'en', nav: '/quality/', title: 'Quality and Evidence: Egyptian Cotton Towels | Aktan Misr',
      description: 'The evidence buyers ask for: Egyptian cotton, colour fastness, wash durability, certifications and capacity, with what is confirmed and what is still to publish.',
      crumbs: [['Home', '/'], ['Quality', '/quality/']] });
    p.body = `${pageHead('The evidence buyers ask for', 'What we can show today, and what we are preparing to publish. We list nothing we cannot back.', p.crumbs)}
<section class="s-s" aria-labelledby="evq-h">
  <div class="container">
    <h2 id="evq-h" class="visually-hidden">Evidence</h2>
    ${evidenceRows(true)}
    <p style="margin-top: var(--space-xl)">Need a document for your compliance file? <a class="link" href="/quote/?buyer=private-label">Ask export sales</a></p>
  </div>
</section>`;
    out.push(p);
  }

  // ---------------- ABOUT ----------------
  {
    const p = newPage({ path: '/about/', lang: 'en', nav: '/about/', title: 'About Aktan Misr, previously Sehely Textile, since 1956',
      description: 'Aktan Misr Textile & Dyeing, known for decades as Sehely Textile, has woven towels in El-Mahalla El-Kubra since 1956 and exports to Europe, the Gulf and beyond.',
      crumbs: [['Home', '/'], ['About', '/about/']] });
    p.body = `${pageHead('A towel mill in El-Mahalla El-Kubra since 1956', 'Known for decades as Sehely Textile; today Aktan Misr Textile &amp; Dyeing S.A.E.', p.crumbs)}
<section class="s-s" aria-labelledby="hist-h">
  <div class="container year">
    <p class="year__num" aria-hidden="true">1956</p>
    <div class="prose">
      <h2 id="hist-h" class="visually-hidden">History</h2>
      <p>The mill began weaving in El-Mahalla El-Kubra, Egypt's textile city, in 1956. ${fill('founding story, family generations')}</p>
      <p>Today it weaves, dyes and finishes towels, bathrobes and pareo for export, about 10 tons of finished goods a day.</p>
      <p>It ships to buyers in Italy, the United Kingdom, France, Spain, Greece, Australia and Morocco, among others. ${fill('full market list')}</p>
      <p>It exhibited at Heimtextil, Frankfurt, in 2025 and 2026.</p>
    </div>
  </div>
</section>`;
    out.push(p);
  }

  // ---------------- CATALOGUE ----------------
  {
    const p = newPage({ path: '/catalogue/', lang: 'en', nav: '', title: 'Towel Catalogue (PDF) | Aktan Misr',
      description: 'Download the Aktan Misr catalogue: every towel, bathrobe and pareo family with sizes, weights and weaves, in 100% Egyptian cotton.',
      crumbs: [['Home', '/'], ['Catalogue', '/catalogue/']] });
    p.body = `${pageHead('The catalogue', 'Every family with sizes, weights and weaves in one file. No form to fill in.', p.crumbs)}
<section class="s-s" aria-labelledby="dl-h">
  <div class="container"><div class="cat">${pic(p, 'colours', 'Folded towels in many colours on shelves', 'Your own: the catalogue cover, or the range laid out flat')}<div><h2 id="dl-h">Aktan Misr catalogue</h2><p>${fill('PDF to supply, with its size and date')}</p><div class="actions" style="justify-content: flex-start; margin-top: var(--space-lg)"><button class="btn" type="button" disabled>Download the PDF</button>${quoteCta('')}</div></div></div></div>
</section>`;
    out.push(p);
  }

  // ---------------- QUOTE ----------------
  {
    const p = newPage({ path: '/quote/', lang: 'en', nav: '/quote/', title: 'Request a Quote | Aktan Misr', description: 'Build a specification for towels, bathrobes or pareo in 100% Egyptian cotton and send it to export sales.',
      alternates: { ar: '/ar/quote/' }, crumbs: [['Home', '/'], ['Request a quote', '/quote/']] });
    p.body = `${pageHead('Request a quote', 'Choose what you need; the specification fills in as you go. Export sales replies by email.', p.crumbs)}
<section class="s-s" aria-label="Quote request">
  <div class="container quote">
    ${quoteForm('en')}
  </div>
</section>`;
    out.push(p);
  }

  // ---------------- CONTACT ----------------
  {
    const p = newPage({ path: '/contact/', lang: 'en', nav: '', title: 'Contact Aktan Misr, El-Mahalla El-Kubra, Egypt', description: 'Contact Aktan Misr Textile & Dyeing export sales: address in El-Mahalla El-Kubra, email and WhatsApp.',
      crumbs: [['Home', '/'], ['Contact', '/contact/']] });
    p.body = `${pageHead('Contact', 'For prices and samples, the quote form reaches export sales fastest.', p.crumbs)}
<section class="s-s" aria-labelledby="ct-h">
  <div class="container split" style="align-items: start">
    <div><h2 id="ct-h">Export sales</h2><div class="actions">${quoteCta('')}</div></div>
    <dl class="ruled">
      <div><dt>Address</dt><dd>Industrial Zone, El-Mahalla El-Kubra 31911, Egypt</dd></div>
      <div><dt>Email</dt><dd>${fill('export sales email')}</dd></div>
      <div><dt>WhatsApp</dt><dd>${fill('one WhatsApp number')}</dd></div>
      <div><dt>Hours</dt><dd>${fill('office hours, Cairo time')}</dd></div>
      <div><dt>Mill visits</dt><dd>${fill('visit policy')}</dd></div>
    </dl>
  </div>
</section>`;
    out.push(p);
  }

  // ---------------- PRIVACY ----------------
  {
    const p = newPage({ path: '/privacy/', lang: 'en', nav: '', title: 'Privacy | Aktan Misr', description: 'How Aktan Misr handles the details you send through the quote form.', crumbs: [['Home', '/'], ['Privacy', '/privacy/']] });
    p.body = `${pageHead('Privacy', 'Draft for review before launch.', p.crumbs)}
<section class="s-s"><div class="container prose">
  <p>${fill('Privacy notice to be written and approved by the company before launch: controller details, what the quote form collects, why, how long it is kept, who receives it, and how to ask for deletion.')}</p>
</div></section>`;
    out.push(p);
  }

  // ---------------- 404 ----------------
  {
    const p = newPage({ path: '/404.html', lang: 'en', nav: '', title: 'Page not found | Aktan Misr', description: 'This page does not exist.' });
    p.body = `${pageHead('This page is not here', 'It may have moved when the site was rebuilt.')}
<section class="s-s"><div class="container"><p><a class="link" href="/">Home</a> <a class="link" href="/products/" style="margin-inline-start: var(--space-lg)">Products</a> <a class="link" href="/quote/" style="margin-inline-start: var(--space-lg)">Request a quote</a></p></div></section>`;
    out.push(p);
  }

  return out;
}

// The spec-builder quote form (C's structure). Works without script as a plain form.
export function quoteForm(lang) {
  const ar = lang === 'ar';
  const L = ar ? {
    s1: 'ما الذي تحتاجه', buyer: 'نوع المشتري', pl: 'علامة خاصة', hotel: 'فندق أو منتجع', dist: 'موزع أو تاجر جملة',
    product: 'المنتج', weave: 'النسيج', colour: 'اللون', white: 'أبيض', dyed: 'مصبوغ حسب درجتك', multi: 'عدة ألوان',
    branding: 'العلامة والتغليف', woven: 'ملصق منسوج', jac: 'شعار جاكار', emb: 'تطريز', pack: 'تغليفك الخاص',
    qty: 'الكمية لكل تصميم', qtyHint: 'قطع تقريبية', when: 'موعد التسليم المطلوب', market: 'بلد البيع',
    s2: 'بياناتك', name: 'الاسم', company: 'الشركة', email: 'البريد الإلكتروني', phone: 'الهاتف أو واتساب (اختياري)', msg: 'ملاحظات (اختياري)',
    consent: 'أوافق على أن يستخدم قسم التصدير هذه البيانات للرد على طلبي.', send: 'أرسل المواصفات',
    sheet: 'مواصفاتك', sheetHint: 'تمتلئ أثناء الاختيار.', choose: 'اختر',
    required: 'هذا الحقل مطلوب.', emailBad: 'أدخل بريداً إلكترونياً صحيحاً.', notSent: 'لم يُرسل شيء: النموذج غير متصل بعد. سيتم ربطه عند الإطلاق.',
    fix: 'بعض البيانات ناقصة. راجع الحقول المحددة.',
  } : {
    s1: 'What you need', buyer: 'You are', pl: 'A brand (private label)', hotel: 'A hotel or resort', dist: 'A distributor or wholesaler',
    product: 'Products', weave: 'Weave', colour: 'Colour', white: 'White', dyed: 'Dyed to your shade', multi: 'Several colours',
    branding: 'Label and packing', woven: 'Woven label', jac: 'Jacquard logo', emb: 'Embroidery', pack: 'Your own packaging',
    qty: 'Quantity per design', qtyHint: 'Approximate pieces', when: 'Delivery wanted by', market: 'Country you sell in',
    s2: 'Your details', name: 'Name', company: 'Company', email: 'Work email', phone: 'Phone or WhatsApp (optional)', msg: 'Anything else (optional)',
    consent: 'I agree that export sales may use these details to reply to my request.', send: 'Send the specification',
    sheet: 'Your specification', sheetHint: 'Fills in as you choose.', choose: 'Choose',
    required: 'This field is required.', emailBad: 'Enter a valid email address.', notSent: 'Nothing was sent: this form is not connected yet. It will be wired to export sales at launch.',
    fix: 'Some details are missing. Check the marked fields.',
  };
  const PRODUCTS = ar
    ? [['bath-towels', 'فوط حمام ووجه'], ['bathrobes', 'برانس'], ['hotel-towels', 'فوط فنادق'], ['kitchen-towels', 'فوط مطبخ'], ['beach-towels', 'فوط شاطئ'], ['pareo', 'باريو']]
    : FAMILIES.map((f) => [f.slug, f.name]);
  const WEAVES = ar ? [['terry', 'تيري'], ['velour', 'قطيفة'], ['waffle', 'وافل'], ['dobby', 'دوبي'], ['jacquard', 'جاكار']] : [['terry', 'Terry'], ['velour', 'Velour'], ['waffle', 'Waffle'], ['dobby', 'Dobby'], ['jacquard', 'Jacquard']];
  const chips = (name, items, type = 'checkbox') => `<div class="chips">${items.map(([v, l], i) => `<input type="${type}" id="${name}-${v}" name="${name}" value="${v}"><label for="${name}-${v}">${l}</label>`).join('')}</div>`;
  const qtys = ar ? ['أقل من 1,000', '1,000–5,000', '5,000–20,000', 'أكثر من 20,000'] : ['Under 1,000', '1,000–5,000', '5,000–20,000', 'Over 20,000'];
  return `<form class="form" data-quote novalidate action="#" method="post" aria-describedby="form-status"
  data-msg-required="${L.required}" data-msg-email="${L.emailBad}" data-msg-notsent="${L.notSent}" data-msg-fix="${L.fix}">
  <h2>${L.s1}</h2>
  <fieldset class="full" data-required id="fs-buyer"><legend>${L.buyer}</legend>${chips('buyer', [['private-label', L.pl], ['hotel', L.hotel], ['distributor', L.dist]], 'radio')}<p class="error" id="err-buyer"></p></fieldset>
  <fieldset class="full" data-required id="fs-product"><legend>${L.product}</legend>${chips('product', PRODUCTS)}<p class="error" id="err-product"></p></fieldset>
  <fieldset class="full"><legend>${L.weave}</legend>${chips('weave', WEAVES)}</fieldset>
  <fieldset class="full"><legend>${L.colour}</legend>${chips('colour', [['white', L.white], ['dyed', L.dyed], ['multi', L.multi]], 'radio')}</fieldset>
  <fieldset class="full"><legend>${L.branding}</legend>${chips('branding', [['woven-label', L.woven], ['jacquard-logo', L.jac], ['embroidery', L.emb], ['own-packaging', L.pack]])}</fieldset>
  <div class="field"><label for="qty">${L.qty}</label><select id="qty" name="quantity"><option value="">${L.choose}</option>${qtys.map((q) => `<option>${q}</option>`).join('')}</select><p class="hint">${L.qtyHint}</p></div>
  <div class="field"><label for="when">${L.when}</label><input id="when" name="delivery" type="month"><p class="error"></p></div>
  <div class="field full"><label for="market">${L.market}</label><input id="market" name="market" autocomplete="country-name"><p class="error"></p></div>
  <h2>${L.s2}</h2>
  <div class="field"><label for="name">${L.name}</label><input id="name" name="name" autocomplete="name" required aria-describedby="err-name"><p class="error" id="err-name"></p></div>
  <div class="field"><label for="company">${L.company}</label><input id="company" name="company" autocomplete="organization" required aria-describedby="err-company"><p class="error" id="err-company"></p></div>
  <div class="field"><label for="email">${L.email}</label><input id="email" name="email" type="email" autocomplete="email" required aria-describedby="err-email" dir="ltr"><p class="error" id="err-email"></p></div>
  <div class="field"><label for="phone">${L.phone}</label><input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr"><p class="error"></p></div>
  <div class="field full"><label for="msg">${L.msg}</label><textarea id="msg" name="message"></textarea></div>
  <div class="full"><label class="consent"><input type="checkbox" name="consent" required id="consent" aria-describedby="err-consent"><span>${L.consent}</span></label><p class="error" id="err-consent"></p></div>
  <div class="full form-actions"><button class="btn btn--solid" type="submit">${L.send}</button><p class="form-status" id="form-status" role="status"></p></div>
</form>
<aside class="sheet" aria-labelledby="sheet-h">
  <h2 id="sheet-h">${L.sheet}</h2>
  <dl data-sheet>
    <div><dt>${L.buyer}</dt><dd data-for="buyer"></dd></div>
    <div><dt>${L.product}</dt><dd data-for="product"></dd></div>
    <div><dt>${L.weave}</dt><dd data-for="weave"></dd></div>
    <div><dt>${L.colour}</dt><dd data-for="colour"></dd></div>
    <div><dt>${L.branding}</dt><dd data-for="branding"></dd></div>
    <div><dt>${L.qty}</dt><dd data-for="quantity"></dd></div>
    <div><dt>${L.when}</dt><dd data-for="delivery"></dd></div>
    <div><dt>${L.market}</dt><dd data-for="market"></dd></div>
  </dl>
  <p class="hint">${L.sheetHint}</p>
</aside>`;
}
