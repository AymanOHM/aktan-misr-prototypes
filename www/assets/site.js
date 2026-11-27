/* Aktan Misr site behaviour. Everything degrades: without script the menu is an open list
   and the quote form is a plain form. */
(() => {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* The mill chapter (assets/scroll.css). On wide, tall screens without reduced motion the band becomes a held stage.
     Scroll progress is eased toward its target every frame (a short glide, so a wheel notch never jolts the photo)
     and written out as custom properties. Progress s runs from -0.25 to steps - 0.75; step i is centred on s = i. */
  const chapter = document.querySelector('[data-chapter]');
  if (chapter && 'IntersectionObserver' in window) {
    const mq = matchMedia('(min-width: 60rem) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)');
    const steps = $$('.steps li', chapter), pics = $$('.chapter__pics > [data-photo]', chapter), rail = $$('.chapter__rail i', chapter);
    const bar = document.querySelector('.bar');
    const N = steps.length, SPAN = N - 0.5, UNIT = 70; // svh of scroll per unit of progress
    const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const ease = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
    let cur = null, raf = 0, last = 0, near = false;
    const target = () => {
      const r = chapter.getBoundingClientRect(), barH = bar ? bar.offsetHeight : 0, vh = innerHeight;
      const held = Math.max(1, r.height - (vh - barH));
      return { inn: clamp((vh - r.top) / (vh - barH)), s: -0.25 + clamp((barH - r.top) / held) * SPAN };
    };
    const paint = ({ inn, s }) => {
      chapter.style.setProperty('--in', inn.toFixed(4));
      steps.forEach((li, i) => {
        const d = s - i;
        li.style.setProperty('--v', (1 - ease(0.3, 0.56, Math.abs(d))).toFixed(4));
        li.style.setProperty('--d', clamp(-d * 2, -1, 1).toFixed(3));
        // each rail segment fills across its own step's stretch of scroll
        const lo = i ? i - 0.5 : -0.25, hi = i < N - 1 ? i + 0.5 : N - 0.75;
        if (rail[i]) rail[i].style.setProperty('--f', clamp((s - lo) / (hi - lo)).toFixed(4));
      });
      pics.forEach((el, i) => {
        if (i) el.style.setProperty('--w', ease(i - 0.8, i - 0.2, s).toFixed(4));
        el.style.setProperty('--k', clamp((s - i + 1) / 2.5).toFixed(4));
      });
    };
    const tick = (t) => {
      const goal = target(), dt = last ? Math.min(64, t - last) : 16; last = t;
      const a = 1 - Math.exp(-dt / 140);
      cur = cur ? { inn: cur.inn + (goal.inn - cur.inn) * a, s: cur.s + (goal.s - cur.s) * a } : goal;
      paint(cur);
      const settled = Math.abs(goal.s - cur.s) < 5e-4 && Math.abs(goal.inn - cur.inn) < 5e-4;
      raf = (near || !settled) && chapter.classList.contains('is-live') ? requestAnimationFrame(tick) : 0;
      if (!raf) last = 0;
    };
    const wake = () => { if (!raf && chapter.classList.contains('is-live')) raf = requestAnimationFrame(tick); };
    new IntersectionObserver(([e]) => { near = e.isIntersecting; wake(); }, { rootMargin: '50% 0px' }).observe(chapter);
    const fit = () => { if (bar) chapter.style.setProperty('--bar-h', bar.offsetHeight + 'px'); };
    const setLive = () => {
      chapter.classList.toggle('is-live', mq.matches);
      chapter.style.setProperty('--track', SPAN * UNIT + 'svh');
      fit(); cur = null;
      if (mq.matches) { paint(target()); wake(); }
    };
    setLive();
    mq.addEventListener('change', setLive);
    addEventListener('resize', fit, { passive: true });
  }

  /* Mobile menu */
  $$('[data-menu-toggle]').forEach((tog) => {
    const menu = document.getElementById(tog.getAttribute('aria-controls'));
    if (!menu) return;
    const set = (open) => { tog.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); };
    tog.addEventListener('click', () => set(tog.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && tog.getAttribute('aria-expanded') === 'true') { set(false); tog.focus(); }
    });
    matchMedia('(min-width: 75.01rem)').addEventListener('change', (m) => { if (m.matches) set(false); });
  });

  /* The one reveal: blocks below the fold rise in once. Skipped for reduced motion. */
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const sel = '.head, .split > *, .steps li, .families > *, .buyers > *, .year > *, .evidence, .range, .faq, .cat, .plate';
    const items = $$(sel).filter((el) => !el.closest('.chapter.is-live') && el.getBoundingClientRect().top > innerHeight * 0.9);
    items.forEach((el) => {
      const sibs = [...el.parentElement.children].filter((c) => items.includes(c));
      el.style.setProperty('--i', String(sibs.indexOf(el) % 3));
      el.classList.add('reveal');
    });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    items.forEach((el) => io.observe(el));
  }

  /* Photo-led tint: the key photo filling most of the middle of the screen gets its halo.
     .is-open = there is page beside it (sideways halo); otherwise the CSS splashes vertically. */
  const hosts = $$('[data-tint]');
  if (hosts.length && 'IntersectionObserver' in window) {
    let active = null;
    const seen = new Map();
    const paint = () => {
      hosts.forEach((el) => el.classList.toggle('is-tinted', el === active));
    };
    const measure = () => hosts.forEach((el) => {
      const w = el.getBoundingClientRect().width;
      el.classList.toggle('is-open', w > 0 && w < innerWidth * 0.7);
    });
    hosts.forEach((el) => {
      const [h, c] = el.dataset.tint.split(' ').map(Number);
      el.style.setProperty('--bh', h); el.style.setProperty('--bc', c);
    });
    measure();
    addEventListener('resize', () => { measure(); paint(); });
    const tio = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.set(e.target, e.intersectionRect.height) : seen.delete(e.target)));
      let best = null, most = 0;
      seen.forEach((h, el) => { if (h > most) { most = h; best = el; } });
      if (best !== active) { active = best; paint(); }
    }, { rootMargin: '-22% 0px -22% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
    hosts.forEach((el) => tio.observe(el));
  }

  /* Quote form: prefill, live specification sheet, validation */
  const form = document.querySelector('form[data-quote]');
  if (!form) return;
  const sheet = document.querySelector('[data-sheet]');
  const status = form.querySelector('.form-status');
  const msg = form.dataset;

  const params = new URLSearchParams(location.search);
  ['buyer', 'product'].forEach((k) => {
    const v = params.get(k);
    if (!v) return;
    const input = form.querySelector(`input[name="${k}"][value="${CSS.escape(v)}"]`);
    if (input) input.checked = true;
  });

  const labelFor = (input) => { const l = form.querySelector(`label[for="${input.id}"]`); return l ? l.textContent.trim() : input.value; };
  const update = () => {
    if (!sheet) return;
    $$('dd[data-for]', sheet).forEach((dd) => {
      const name = dd.dataset.for;
      const checked = $$(`input[name="${name}"]:checked`, form);
      let text = '';
      if (checked.length) text = checked.map(labelFor).join(', ');
      else {
        const el = form.elements[name];
        if (el && el.tagName === 'SELECT') text = el.value ? el.options[el.selectedIndex].text : '';
        else if (el && 'value' in el) text = el.value.trim();
      }
      if (dd.textContent !== text) {
        dd.textContent = text;
        dd.classList.toggle('changed', false);
        void dd.offsetWidth; // restart the flash
        dd.classList.toggle('changed', Boolean(text));
      }
    });
  };
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  update();

  const setError = (target, errEl, text) => {
    if (target) target.setAttribute('aria-invalid', text ? 'true' : 'false');
    if (errEl) errEl.textContent = text || '';
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let first = null;
    // required chip groups
    $$('fieldset[data-required]', form).forEach((fs) => {
      const ok = $$('input:checked', fs).length > 0;
      setError(fs, fs.querySelector('.error'), ok ? '' : msg.msgRequired);
      if (!ok && !first) first = fs.querySelector('input');
    });
    // required fields, in document order
    $$('input[required], select[required], textarea[required]', form).forEach((el) => {
      let text = '';
      if (el.type === 'checkbox') text = el.checked ? '' : msg.msgRequired;
      else if (!el.value.trim()) text = msg.msgRequired;
      else if (el.type === 'email' && !el.validity.valid) text = msg.msgEmail;
      const err = document.getElementById(el.getAttribute('aria-describedby'));
      setError(el, err, text);
      if (text && !first) first = el;
    });
    if (first) {
      status.textContent = msg.msgFix;
      first.focus();
      return;
    }
    status.textContent = msg.msgNotsent;
  });
})();
