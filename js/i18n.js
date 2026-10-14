/* ==========================================================================
   i18n · idioma actual, traducción de textos y botón ES / EN
   Depende de: data/translations.js, projects.js (renderProjects)
   ========================================================================== */

let currentLang = 'es';
try {
  currentLang = localStorage.getItem('lang') === 'en' ? 'en' : 'es';
} catch (e) { /* localStorage no disponible: queda en español */ }

/* Devuelve el texto de interfaz en el idioma actual */
function tr(key) {
  return TRANSLATIONS[currentLang][key];
}

/* Devuelve el proyecto con los textos en el idioma actual */
function localize(project) {
  return currentLang === 'en' && project.en
    ? Object.assign({}, project, project.en)
    : project;
}

/* Aplica el idioma a todo el documento.
   rerenderAsNew = true cuando el cambio lo hace la persona (las tarjetas
   se vuelven a dibujar ya visibles, sin repetir la animación de entrada). */
function applyLanguage(rerenderAsNew) {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = tr(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', tr(el.dataset.i18nAria));
  });

  const button = document.getElementById('lang');
  button.textContent = tr('lbl');
  button.setAttribute('aria-label', tr('switch'));
  button.title = tr('switch');

  renderProjects(rerenderAsNew);
}

function initLanguageToggle() {
  document.getElementById('lang').addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('lang', currentLang); } catch (e) {}
    applyLanguage(true);
  });
}
