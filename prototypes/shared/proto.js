/* Aktan Misr prototypes: shared behaviour (menu, language demo, filters, dialogs, tabs, quote form).
   Every feature degrades: without script, menus are open lists, all products and panels show,
   and the form is a plain form that names where it would send. */
document.documentElement.classList.add('js');

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
    matchMedia('(min-width: 60rem)').addEventListener('change', (m) => { if (m.matches) set(false); });
  });

  /* Language switcher: Arabic is a working right-to-left demo; IT, FR and DE show where they live. */
  const KEY = 'aktan-proto-lang';
  const notes = {
    en: '',
    ar: 'Arabic demo: navigation, hero and quote form switch to right to left. Draft translation, to be reviewed by a native writer.',
    it: 'Italiano is planned for launch. This prototype keeps English text.',
    fr: 'Français is planned for launch. This prototype keeps English text.',
    de: 'Deutsch is planned for launch. This prototype keeps English text.'
  };
  const setLang = (lang, announce) => {
    const html = document.documentElement;
    const ar = lang === 'ar';
    html.lang = ar ? 'ar' : 'en';
    html.dir = ar ? 'rtl' : 'ltr';
    $$('[data-ar]').forEach((el) => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = ar ? el.dataset.ar : el.dataset.en;
    });
    $$('[data-ar-label]').forEach((el) => {
      if (el.dataset.enLabel === undefined) el.dataset.enLabel = el.getAttribute('aria-label') || '';
      el.setAttribute('aria-label', ar ? el.dataset.arLabel : el.dataset.enLabel);
    });
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$("[data-lang-status]").forEach((s) => { s.lang = "en"; s.dir = "ltr"; if (announce) s.textContent = notes[lang] || ""; });
    try { localStorage.setItem(KEY, lang); } catch (e) { /* storage blocked */ }
  };
  $$('[data-lang]').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang, true)));
  let saved = 'en';
  try { saved = localStorage.getItem(KEY) || 'en'; } catch (e) { /* storage blocked */ }
  setLang(saved, false);

  /* Product filters: a form of radio groups; items carry data-tags. */
  $$('form[data-filter]').forEach((form) => {
    const items = $$(form.dataset.filter);
    const out = form.querySelector('[data-filter-count]');
    const empty = document.querySelector('[data-filter-empty]');
    const apply = () => {
      const groups = {};
      for (const [k, v] of new FormData(form)) (groups[k] ||= []).push(v);
      let n = 0;
      items.forEach((it) => {
        const tags = (it.dataset.tags || '').split(' ');
        const ok = Object.values(groups).every((vals) => vals.includes('all') || vals.some((v) => tags.includes(v)));
        it.hidden = !ok;
        if (ok) n += 1;
      });
      if (out) out.textContent = `${n} of ${items.length} product families shown`;
      if (empty) empty.hidden = n !== 0;
    };
    const params = new URLSearchParams(location.search);
    params.forEach((v, k) => {
      const r = form.querySelector(`input[name="${CSS.escape(k)}"][value="${CSS.escape(v)}"]`);
      if (r) r.checked = true;
    });
    form.addEventListener('change', apply);
    form.addEventListener('reset', () => setTimeout(apply));
    apply();
  });

  /* Product detail dialogs */
  $$('[data-open]').forEach((b) => b.addEventListener('click', () => {
    const d = document.getElementById(b.dataset.open);
    if (!d) return;
    d.opener = b;
    d.showModal();
  }));
  $$('dialog').forEach((d) => {
    d.addEventListener('close', () => { if (d.opener) d.opener.focus(); });
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
  });

  /* Tabs (switcher). Without script every panel shows in order. */
  $$('[role="tablist"]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    const select = (t) => tabs.forEach((x) => {
      const on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      const p = document.getElementById(x.getAttribute('aria-controls'));
      if (p) p.hidden = !on;
    });
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1, Home: -i, End: tabs.length - 1 - i }[e.key];
        if (step === undefined) return;
        const dir = document.documentElement.dir === 'rtl' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') ? -1 : 1;
        const next = tabs[(i + step * dir + tabs.length) % tabs.length];
        next.focus();
        select(next);
        e.preventDefault();
      });
    });
    select(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0]);
  });

  /* Quote form: validates, preselects ?product=, and never claims to have sent. */
  $$('form[data-rfq]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    const params = new URLSearchParams(location.search);
    params.getAll('product').forEach((p) => {
      const box = form.querySelector(`input[name="product"][value="${CSS.escape(p)}"]`);
      if (box) box.checked = true;
    });
    const showError = (el, msg) => {
      const id = el.getAttribute('aria-describedby');
      const err = id && document.getElementById(id.split(' ')[0]);
      if (err) err.textContent = msg;
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const bad = [];
      $$('fieldset[data-required-group]', form).forEach((g) => {
        const ok = $$('input:checked', g).length > 0;
        g.setAttribute('aria-invalid', String(!ok));
        showError(g, ok ? '' : g.dataset.msg);
        if (!ok) bad.push(g.querySelector("input"));
      });
      $$('input, select, textarea', form).forEach((f) => {
        if (!f.willValidate || f.closest('fieldset[data-required-group]')) return;
        const ok = f.checkValidity();
        f.setAttribute('aria-invalid', String(!ok));
        showError(f, ok ? '' : (f.dataset.msg || f.validationMessage));
        if (!ok) bad.push(f);
      });
      const first = bad.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))[0];
      if (first) {
        status.textContent = document.documentElement.lang === 'ar'
          ? 'بعض البيانات ناقصة. راجع الحقول المحددة.'
          : 'Some details are missing. Check the marked fields.';
        first.focus();
        return;
      }
      if (!form.dataset.endpoint) {
        status.textContent = document.documentElement.lang === 'ar'
          ? 'لم يتم إرسال أي شيء: هذا النموذج التجريبي غير متصل بعد.'
          : 'Nothing was sent: this prototype form is not connected yet. On the live site it goes to export sales.';
        return;
      }
      const btn = form.querySelector('[type="submit"]');
      btn.setAttribute('aria-busy', 'true');
      fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form) })
        .then((r) => { status.textContent = r.ok ? 'Request received. Export sales will reply by email.' : 'That did not go through. Try again in a minute.'; })
        .catch(() => { status.textContent = 'That did not go through. Try again in a minute.'; })
        .finally(() => btn.removeAttribute('aria-busy'));
    });
  });

  /* Image slots: drop a stand-in that fails to load so the wash never shows a broken icon. */
  $$('[data-slot] img').forEach((i) => {
    if (i.complete && !i.naturalWidth) i.remove();
    else i.addEventListener('error', () => i.remove(), { once: true });
  });
})();
