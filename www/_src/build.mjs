// Build the static site: node www/_src/build.mjs
// Output: www/<path>/index.html, sitemap.xml, robots.txt, _redirects (old sehely.com URLs).
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, SITE, STAGING } from './lib.mjs';
import { pages as en } from './pages-en.mjs';
import { pages as ar } from './pages-ar.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const all = [...en(), ...ar()];

for (const p of all) {
  const file = p.path.endsWith('.html') ? join(root, p.path) : join(root, p.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(p));
}

const urls = all.filter((p) => !p.path.endsWith('.html') && p.path !== '/privacy/');
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((p) => `  <url><loc>${SITE}${p.path}</loc>${Object.keys(p.alternates || {}).length ? `\n    <xhtml:link rel="alternate" hreflang="${p.lang}" href="${SITE}${p.path}"/>${Object.entries(p.alternates).map(([l, h]) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${h}"/>`).join('')}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${p.lang === 'en' ? p.path : p.alternates.en}"/>\n  ` : ''}</url>`).join('\n')}
</urlset>
`);

writeFileSync(join(root, 'robots.txt'), STAGING ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

// 301 map from the old WordPress URLs (Netlify/Cloudflare Pages _redirects format; query-string rules need host support).
writeFileSync(join(root, '_redirects'), `# Old sehely.com WordPress URLs -> new pages (301)
/ page_id=12 /about/ 301
/ page_id=14 /about/ 301
/ page_id=16 /about/ 301
/ page_id=24 /about/ 301
/ page_id=22 /contact/ 301
/ post_type=job /about/ 301
/ cat=3 /about/ 301
/ post_type=product /products/ 301
/ product=hotel-towels /hotels/ 301
/ product=bath-towel1 /products/bath-towels/ 301
/ product=bath-robe1 /products/bathrobes/ 301
/ product=beach-towels1 /products/beach-towels/ 301
/ product=kitchen-towels1 /products/kitchen-towels/ 301
/ product=pareo /products/pareo/ 301
`);

console.log(`built ${all.length} pages (staging: ${STAGING})`);
