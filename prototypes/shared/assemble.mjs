// usage: node assemble.mjs <dir> <headerSelectorStart> <headerEnd> <footerStart> <footerEnd>
import fs from 'node:fs'; import path from 'node:path';
const [dir, hs, he, fs_, fe] = process.argv.slice(2);
const idx = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const cut = (s, a, b) => { const i = s.indexOf(a); const j = s.indexOf(b, i); return s.slice(i, j + b.length); };
const sub = (h) => h.replace(/href="#([\w-]+)"/g, 'href="index.html#$1"');
const header = sub(cut(idx, hs, he)), footer = sub(cut(idx, fs_, fe));
for (const f of fs.readdirSync(dir).filter((f) => f.startsWith('src-'))) {
  const out = f.replace(/^src-/, '');
  let h = fs.readFileSync(path.join(dir, f), 'utf8');
  let hd = header.replace(new RegExp(`href="${out}"`), `href="${out}" aria-current="page"`);
  h = h.replace('{{HEADER}}', hd).replace('{{FOOTER}}', footer)
       .replace(/aria-label="Close">✕<\/button>/g, '>Close</button>');
  fs.writeFileSync(path.join(dir, out), h);
  console.log('wrote', out);
}
