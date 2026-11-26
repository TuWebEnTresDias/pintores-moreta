document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('#menuToggle');
  const nav = document.querySelector('#mainNav');
  const mobileMenu = window.matchMedia('(max-width: 800px)');

  if (!header || !toggle || !nav) return;

  nav.inert = mobileMenu.matches;

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    nav.inert = mobileMenu.matches && !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
    if (open) nav.querySelector('a')?.focus();
  };

  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  mobileMenu.addEventListener('change', (event) => {
    if (!event.matches) setMenu(false);
    else nav.inert = true;
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
});
