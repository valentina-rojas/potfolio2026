/* ==========================================================================
   MAIN · punto de entrada: inicia cada módulo en orden
   Los scripts se cargan con "defer" (ver index.html), así que el DOM ya existe.
   ========================================================================== */

applyLanguage(false);   // textos + tarjetas de proyectos (i18n.js / projects.js)
initLanguageToggle();   // botón ES / EN (i18n.js)
initNav();              // menú hamburguesa (nav.js)
initModal();            // ventana de proyecto (modal.js)
initFilters();          // filtros de proyectos (projects.js)
initReveal();           // aparición al hacer scroll (effects.js)
initScrollSpy();        // enlace activo del menú (nav.js)
initGame();             // minijuego (game.js)
