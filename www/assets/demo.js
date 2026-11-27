/* Demo: hero switcher and the photo-led tint. ?hero=mosaic|citrus|teal|sun&tint=auto|wash|bloom|off&bloom=1|2|3|4
   auto = the bloom where a photo has open page beside it, the page wash where it has none (full bleed, phones). */
(() => {
  const root = document.documentElement;
  const form = document.querySelector('[data-demo]');
  const q = new URLSearchParams(location.search);
  const state = { hero: q.get('hero') || 'mosaic', tint: q.get('tint') || 'wash' };
  root.dataset.bloom = q.get('bloom') || '4';

  // Colours per key photo, from its sampled hue (h) and chroma (c).
  const hosts = [...document.querySelectorAll('[data-tint]')];
  hosts.forEach((el) => {
    const [h, c] = el.dataset.tint.split(' ').map(Number);
    el.style.setProperty('--bh', h); el.style.setProperty('--bc', c);
    // which side of the photo has open page (the text column): the travelling bloom heads that way
    const side = () => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--side', r.left + r.width / 2 > innerWidth / 2 ? -1 : 1);
      el.classList.toggle('is-open', r.width > 0 && r.width < innerWidth * 0.7); // room beside it for the bloom to travel into
    };
    side(); addEventListener('resize', () => { side(); paint(); });
    el.wash = `oklch(94.5% ${Math.min(0.010 + c * 0.05, 0.02).toFixed(3)} ${h})`;
  });

  let active = null;
  const seen = new Map();
  const paint = () => {
    hosts.forEach((el) => el.classList.toggle('is-tinted', el === active));
    const wash = state.tint === 'wash' || (state.tint === 'auto' && !active?.classList.contains('is-open'));
    if (wash && active) root.style.setProperty('--color-paper', active.wash);
    else root.style.removeProperty('--color-paper');
  };
  // The key photo filling most of the middle band of the screen leads the colour.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? seen.set(e.target, e.intersectionRect.height) : seen.delete(e.target)));
    let best = null, most = 0;
    seen.forEach((h, el) => { if (h > most) { most = h; best = el; } });
    if (best !== active) { active = best; paint(); }
  }, { rootMargin: '-22% 0px -22% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
  hosts.forEach((el) => io.observe(el));

  const apply = () => {
    document.querySelectorAll('[data-hero]').forEach((s) => { s.hidden = s.dataset.hero !== state.hero; });
    dispatchEvent(new Event('resize'));
    root.dataset.tintMode = state.tint;
    paint();
    const u = new URL(location.href);
    u.searchParams.set('hero', state.hero); u.searchParams.set('tint', state.tint);
    history.replaceState(null, '', u);
  };
  if (matchMedia('(max-width: 40rem)').matches) form.querySelector('details').open = false; // phones: start folded away
  form.hero.value = state.hero; form.tint.value = state.tint;
  form.addEventListener('change', (e) => { state[e.target.name] = e.target.value; apply(); });
  apply();
})();
