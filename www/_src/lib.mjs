// Shared layout and helpers for the Aktan Misr static site.
// Pages are plain functions returning { path, lang, title, description, body, ... }.
// Run: node www/_src/build.mjs  (writes HTML into www/)

export const SITE = 'https://www.sehely.com';
export const STAGING = process.env.STAGING !== '0'; // noindex until the relaunch is approved
// Path prefix when served from a subfolder (e.g. GitHub Pages: BASE=/aktan-misr-prototypes/www). Empty at the domain root.
export const BASE = (process.env.BASE || '').replace(/\/$/, '');
const withBase = (html) => !BASE ? html : html.replace(/\b(href|src|srcset|imagesrcset)="([^"]*)"/g, (m, a, v) => `${a}="${v.replace(/(^|,\s*)\/(?!\/)/g, `$1${BASE}/`)}"`);

// Stand-in photographs (Unsplash licence, self-hosted). Replace with the mill's own shoot.
export const PHOTOS = {
  'towels-shelf': { w: 1600, h: 2406, by: 'Florencia Simonini', u: 'florenciasimonini' },
  monogram: { w: 1600, h: 1067, by: 'Antonio Araújo', u: 'antonioaaaraujo' },
  'white-stack': { w: 1600, h: 1067, by: 'Mads Leif Hansen', u: 'mads_leif_hansen' },
  bathrobes: { w: 1600, h: 2400, by: 'Grace Anne Fully', u: 'graceannefully' },
  kitchen: { w: 1600, h: 1280, by: 'Hudson Crafted', u: 'hudsoncrafted' },
  'striped-sea': { w: 1600, h: 2400, by: 'Philipp Hubert', u: 'philipphubert' },
  'striped-stack': { w: 1600, h: 2322, by: 'Setyaki', u: 'setyaki' },
  colours: { w: 1600, h: 1021, by: 'Candelarms', u: 'candelarms' },
  'dyed-rolls': { w: 1600, h: 1067, by: 'Lensyfoxography', u: 'lensyfoxography' },
  looms: { w: 1600, h: 900, by: 'Ryo Harianto', u: 'ryohariantoo' },
  'loom-threads': { w: 1600, h: 1061, by: 'Bergstrand', u: 'bergstrand' },
  yarn: { w: 1600, h: 2400, by: 'Atmos', u: '___atmos' },
  sewing: { w: 1600, h: 1067, by: 'Equal Stock', u: 'equalstock' },
  finishing: { w: 1600, h: 755, by: 'Lalit Kumar', u: 'klalit' },
};

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// A picture in a slot. `brief` names the real shot that replaces the stand-in.
export function pic(page, name, alt, brief, { cls = 'ph', eager = false, pos = '' } = {}) {
  const p = PHOTOS[name];
  if (!p) throw new Error('unknown photo ' + name);
  page.photos.add(name);
  const sizes = cls.includes('bleed') ? '100vw' : '(min-width: 90rem) 660px, (min-width: 60rem) 45vw, 100vw';
  return `<div class="${cls}" data-slot="${esc(name)}" data-alt="${esc(brief)}"><img src="/img/${name}-1600.webp" srcset="/img/${name}-800.webp 800w, /img/${name}-1600.webp 1600w" sizes="${sizes}" width="${p.w}" height="${p.h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}${pos ? ` style="object-position:${pos}"` : ''}></div>`;
}

export const fill = (t) => `<span class="fill">${esc(t)}</span>`;

const NAV = {
  en: [
    ['/private-label/', 'Private label'], ['/products/', 'Products'], ['/hotels/', 'Hotels'],
    ['/manufacturing/', 'Manufacturing'], ['/quality/', 'Quality'], ['/about/', 'About'],
  ],
  ar: [
    ['/ar/private-label/', 'العلامة الخاصة'], ['/ar/#products', 'المنتجات'], ['/ar/#mill', 'المصنع'],
  ],
};

const T = {
  en: { skip: 'Skip to content', menu: 'Menu', quote: 'Request a quote', home: 'Aktan Misr Textile and Dyeing, home', sub: 'Textile &amp; Dyeing, previously Sehely',
    stage: 'Staging build with stand-in photographs and marked placeholders. Not the live site.',
    statement: 'Write to export sales about <a href="/quote/">your next order</a>.',
    photos: 'Stand-in photographs', photoNote: 'to be replaced by photographs of the mill', unsplash: 'on Unsplash' },
  ar: { skip: 'انتقل إلى المحتوى', menu: 'القائمة', quote: 'اطلب عرض سعر', home: 'أكتان مصر للنسيج والصباغة، الصفحة الرئيسية', sub: 'للنسيج والصباغة ش.م.م | سهيلي للنسيج سابقاً',
    stage: 'نسخة تجريبية بصور مؤقتة ونصوص ناقصة محددة. ليست الموقع الفعلي. الترجمة مسودة تحتاج مراجعة.',
    statement: 'راسل قسم التصدير بشأن <a href="/ar/quote/">طلبيتك القادمة</a>.',
    photos: 'صور مؤقتة', photoNote: 'تُستبدل بصور المصنع', unsplash: 'على Unsplash' },
};

function header(page) {
  const t = T[page.lang];
  const navItems = NAV[page.lang].map(([href, label]) => `<a href="${href}"${page.nav === href ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ');
  const alt = page.alternates || {};
  const langs = page.lang === 'en'
    ? `<span class="langs"><a aria-current="true" href="${page.path}">EN</a><a lang="ar" hreflang="ar" href="${alt.ar || '/ar/'}">عربي</a></span>`
    : `<span class="langs"><a lang="en" hreflang="en" href="${alt.en || '/'}">EN</a><a aria-current="true" href="${page.path}">عربي</a></span>`;
  const homeHref = page.lang === 'ar' ? '/ar/' : '/';
  const quoteHref = page.lang === 'ar' ? '/ar/quote/' : '/quote/';
  return `<a class="skip" href="#main">${t.skip}</a>
${STAGING ? `<div class="stage-note" role="note"><div class="container"><span>${t.stage}</span></div></div>` : ''}
<header class="bar">
  <div class="container">
    <a class="wordmark" href="${homeHref}" aria-label="${t.home}">
      <img src="/assets/mark.png" width="140" height="128" alt="">
      <span class="wordmark-name"><b class="wordmark-text">${page.lang === 'ar' ? 'أكتان مصر' : 'AKTAN MISR'}</b><span>${t.sub}</span></span>
    </a>
    <button class="menu-toggle" type="button" data-menu-toggle aria-controls="site-nav" aria-expanded="false">${t.menu}</button>
    <nav id="site-nav" aria-label="${page.lang === 'ar' ? 'الرئيسية' : 'Main'}">
      ${navItems}
      ${langs}
      <a class="btn btn--solid" href="${quoteHref}"${page.nav === quoteHref ? ' aria-current="page"' : ''}>${t.quote}</a>
    </nav>
  </div>
</header>`;
}

function footer(page) {
  const t = T[page.lang];
  const credits = [...page.photos].map((n) => { const p = PHOTOS[n]; return `<a href="https://unsplash.com/@${p.u}">${esc(p.by)}</a>`; }).join(', ');
  const en = page.lang === 'en';
  return `<footer class="foot">
  <div class="container">
    <p class="foot__statement">${t.statement}</p>
    <div class="foot__grid">
      <div>
        <p><b>${en ? 'Aktan Misr Textile &amp; Dyeing S.A.E.' : 'أكتان مصر للنسيج والصباغة ش.م.م'}</b><br>${en ? 'Previously Sehely Textile &amp; Dyeing' : 'سهيلي للنسيج والصباغة سابقاً'}</p>
        <address>${en ? 'Industrial Zone, El-Mahalla El-Kubra 31911, Egypt' : 'المنطقة الصناعية، المحلة الكبرى 31911، مصر'}<br>${fill(en ? 'export sales email' : 'بريد قسم التصدير')}<br>${fill(en ? 'WhatsApp number' : 'رقم واتساب')}</address>
      </div>
      ${en ? `<div><h2>Buyers</h2><ul><li><a href="/private-label/">Private label</a></li><li><a href="/hotels/">Hotels</a></li><li><a href="/distributors/">Distributors</a></li></ul></div>
      <div><h2>The mill</h2><ul><li><a href="/manufacturing/">Manufacturing</a></li><li><a href="/quality/">Quality</a></li><li><a href="/about/">About</a></li></ul></div>
      <div><h2>Range</h2><ul><li><a href="/products/">Products</a></li><li><a href="/catalogue/">Catalogue</a></li><li><a href="/quote/">Request a quote</a></li></ul></div>
      <div><h2>Company</h2><ul><li><a href="/contact/">Contact</a></li><li><a href="/privacy/">Privacy</a></li><li><a href="https://www.linkedin.com/company/aktan-misr-textile-dyeing-s-a-e-sehely-textile-dyeing/">LinkedIn</a></li></ul></div>`
      : `<div><h2>الصفحات</h2><ul><li><a href="/ar/private-label/">العلامة الخاصة</a></li><li><a href="/ar/quote/">اطلب عرض سعر</a></li><li><a href="/" lang="en">English site</a></li></ul></div>`}
    </div>
    ${credits ? `<p class="credits">${t.photos} (${t.photoNote}): ${credits} ${t.unsplash}.</p>` : ''}
  </div>
</footer>`;
}

export function render(page) { return withBase(renderRaw(page)); }
function renderRaw(page) {
  const url = SITE + page.path;
  const alt = page.alternates || {};
  const hreflang = Object.keys(alt).length
    ? [`<link rel="alternate" hreflang="${page.lang}" href="${url}">`, ...Object.entries(alt).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${SITE + p}">`), `<link rel="alternate" hreflang="x-default" href="${SITE + (page.lang === 'en' ? page.path : alt.en)}">`].join('\n')
    : '';
  const fonts = page.lang === 'ar'
    ? '<link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400&family=IBM+Plex+Sans+Arabic:wght@400&display=swap" rel="stylesheet">'
    : '<link href="https://api.fontshare.com/v2/css?f[]=sentient@300,400&display=swap" rel="stylesheet">\n<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400&display=swap" rel="stylesheet">';
  const crumbsLd = page.crumbs ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: page.crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + path })) } : null;
  const ld = [page.ld, crumbsLd].filter(Boolean).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const body = page.body; // body is built before header/footer so photo credits are known
  return `<!doctype html>
<html lang="${page.lang}" dir="${page.lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${STAGING ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
${hreflang}
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<link rel="icon" href="/assets/mark.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
${page.preload ? `<link rel="preload" as="image" type="image/webp" imagesrcset="/img/${page.preload}-800.webp 800w, /img/${page.preload}-1600.webp 1600w" imagesizes="(min-width: 90rem) 660px, (min-width: 60rem) 45vw, 100vw">\n` : ''}<link rel="stylesheet" href="/assets/styles.css">
<script>document.documentElement.classList.add('js');</script>
${ld}
</head>
<body>
${header(page)}
<main id="main">
${body}
</main>
${footer(page)}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

export function pageHead(h1, lead, crumbs) {
  const c = crumbs ? `<nav class="crumbs" aria-label="${crumbs[0][0] === 'Home' ? 'Breadcrumb' : 'مسار التنقل'}"><ol>${crumbs.map(([n, p], i) => `<li>${i === crumbs.length - 1 ? `<span aria-current="page">${esc(n)}</span>` : `<a href="${p}">${esc(n)}</a>`}</li>`).join('')}</ol></nav>` : '';
  return `<div class="page-head"><div class="container grid">${c}<h1>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></div>`;
}

export function newPage(o) { return { photos: new Set(), alternates: {}, ...o }; }
