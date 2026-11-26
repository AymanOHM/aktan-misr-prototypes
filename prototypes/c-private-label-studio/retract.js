/* Banner over a retracting bar: the bar slides up when scrolling down, returns on scroll up or on focus. */
(() => {
  const top = document.querySelector('[data-retract]');
  if (!top) return;
  let last = scrollY, ticking = false;
  const update = () => {
    const y = scrollY;
    const menuOpen = top.querySelector('[aria-expanded="true"]');
    top.classList.toggle('is-retracted', y > last && y > 240 && !menuOpen);
    last = y;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  top.addEventListener('focusin', () => top.classList.remove('is-retracted'));
})();
