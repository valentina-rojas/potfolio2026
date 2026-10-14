/* ==========================================================================
   EFFECTS · aparición de los elementos al hacer scroll
   (los estilos están en css/motion.css, clases .rv y .rv.in)
   ========================================================================== */

function initReveal() {
  const targets = document.querySelectorAll('.pol, .mid, .chip, .sh, .screen, .contact, .pc');
  targets.forEach(el => el.classList.add('rv'));

  // Pequeño retraso escalonado en etiquetas y polaroid
  document.querySelectorAll('.chip').forEach((el, i) => el.style.setProperty('--d', i * .07 + 's'));
  document.querySelectorAll('.pol').forEach((el, i) => el.style.setProperty('--d', i * .15 + 's'));

  // Sin soporte: se muestran todos de una
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  targets.forEach(el => observer.observe(el));
}
