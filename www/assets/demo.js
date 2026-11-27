/* Demo: hero switcher and the photo-led tint. ?hero=mosaic|citrus|teal|sun&tint=wash|bloom|off */
(() => {
  const root = document.documentElement;
  const form = document.querySelector('[data-demo]');
  const q = new URLSearchParams(location.search);
  const state = { hero: q.get('hero') || 'mosaic', tint: q.get('tint') || 'wash' };

  // Colours per key photo, from its sampled hue (h) and chroma (c).
  const hosts = [...document.querySelectorAll('[data-tint]')];
  hosts.forEach((el) => {
    const [h, c] = el.dataset.tint.split(' ').map(Number);
    el.style.setProperty('--bloom', `oklch(80% ${Math.min(c * 1.1, 0.14).toFixed(3)} ${h} / 0.75)`);
    el.style.setProperty('--bloom-2', `oklch(86% ${Math.min(c * 0.8, 0.11).toFixed(3)} ${(h + 16) % 360} / 0.6)`);
    el.wash = `oklch(94.5% ${Math.min(0.010 + c * 0.05, 0.02).toFixed(3)} ${h})`;
  });

  let active = null;
  const seen = new Map();
  const paint = () => {
    hosts.forEach((el) => el.classList.toggle('is-tinted', el === active));
    if (state.tint === 'wash' && active) root.style.setProperty('--color-paper', active.wash);
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
