/* ==========================================================================
   NAV · menú hamburguesa (mobile) y resaltado de la sección visible
   ========================================================================== */

function initNav() {
  const burger = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  function closeMenu() {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

/* Marca como activo el enlace de la sección que está en pantalla */
function initScrollSpy() {
  if (!('IntersectionObserver' in window)) return;

  const links = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  ['inicio', 'sobre-mi', 'jugar', 'proyectos', 'contacto']
    .forEach(id => observer.observe(document.getElementById(id)));
}
