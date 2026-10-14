/* ==========================================================================
   PROJECTS · tarjetas de proyectos y filtros
   Depende de: data/projects.js, i18n.js (tr, localize)
   ========================================================================== */

/* Dibuja las tarjetas en #list respetando el filtro activo */
function renderProjects(asNew) {
  const active = document.querySelector('.filters button[aria-pressed="true"]');
  const filter = active ? active.dataset.f : 'all';

  const cards = PROJECTS.map((raw, i) => {
    const p = localize(raw);
    const hidden = filter !== 'all' && p.categories.split(' ').indexOf(filter) < 0 ? ' hidden' : '';
    const cover = p.images
      ? `<img src="${p.images[0]}" alt="${tr('cover')} ${p.title}">`
      : `<div class="art ${p.placeholder[0]}"></div>`;

    return `<article class="pc${asNew ? ' rv in' : ''} ${p.theme}"${hidden} data-c="${p.categories}">`
      + `<span class="tab mono">✦ ${tr('proj')} 0${i + 1}</span>`
      + `<div class="pb">`
      +   `<div><span class="mono">● ${p.period}</span><h3>${p.title}</h3><p>${p.summary}</p>`
      +   `<button data-i="${i}">${tr('view')} ↗</button></div>`
      +   `<div class="pimg" data-i="${i}"><i class="tape tape--left"></i><i class="tape tape--right"></i>${cover}</div>`
      + `</div></article>`;
  }).join('');

  document.getElementById('list').innerHTML = cards;
}

/* Botones de filtro (Todos / Unity / Phaser / Web) */
function initFilters() {
  const buttons = document.querySelectorAll('.filters button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.setAttribute('aria-pressed', b === button));

      document.querySelectorAll('.pc').forEach(card => {
        const show = button.dataset.f === 'all'
          || card.dataset.c.split(' ').indexOf(button.dataset.f) > -1;
        card.hidden = !show;
        if (show) {                       // reinicia la animación de aparición
          card.classList.remove('pop');
          void card.offsetWidth;
          card.classList.add('pop');
        }
      });
    });
  });
}
