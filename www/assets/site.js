/* Aktan Misr site behaviour. Everything degrades: without script the menu is an open list
   and the quote form is a plain form. */
(() => {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

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
    const items = $$(sel).filter((el) => el.getBoundingClientRect().top > innerHeight * 0.9);
    items.forEach((el) => {
      const sibs = [...el.parentElement.children].filter((c) => items.includes(c));
      el.style.setProperty('--i', String(Math.min(sibs.indexOf(el), 5)));
      el.classList.add('reveal');
    });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
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
