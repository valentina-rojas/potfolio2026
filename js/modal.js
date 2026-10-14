/* ==========================================================================
   MODAL · ventana de proyecto con galería (imagen grande + miniaturas)
   Depende de: data/projects.js, i18n.js (tr, localize)
   ========================================================================== */

let galleryMain = null;     // imagen grande
let galleryThumbs = null;   // columna de miniaturas

/* La columna de miniaturas no puede ser más alta que la imagen grande */
function fitGalleryThumbs() {
  if (!galleryThumbs) return;
  galleryThumbs.style.maxHeight = innerWidth > 640 ? galleryMain.clientHeight + 'px' : '';
}

function buildGallery(p) {
  const box = document.getElementById('modal-gallery');
  const images = p.images || [];

  // Proyecto sin fotos: imagen de reemplazo
  if (!images.length) {
    galleryThumbs = null;
    box.className = 'gal solo';
    box.innerHTML = `<div class="art ${p.placeholder[0]}"></div>`;
    return;
  }

  box.className = 'gal' + (images.length < 2 ? ' solo' : '') + (p.portrait ? ' pt' : '');
  box.innerHTML = '<img class="main" alt="">' + (images.length > 1 ? '<div class="th"></div>' : '');
  galleryMain = box.querySelector('.main');
  galleryThumbs = box.querySelector('.th');

  function select(n) {
    galleryMain.classList.remove('sw');
    void galleryMain.offsetWidth;                 // reinicia el fundido
    galleryMain.classList.add('sw');
    galleryMain.src = images[n];
    galleryMain.alt = `${p.title} — ${tr('image')} ${n + 1}`;
    if (galleryThumbs) {
      Array.from(galleryThumbs.children).forEach((b, k) => b.setAttribute('aria-current', k === n));
    }
  }

  if (galleryThumbs) {
    images.forEach((src, n) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.setAttribute('aria-label', `${tr('viewImage')} ${n + 1}`);
      thumb.innerHTML = `<img src="${src}" alt="">`;
      thumb.addEventListener('click', () => select(n));
      galleryThumbs.appendChild(thumb);
    });
  }

  galleryMain.onload = fitGalleryThumbs;
  select(0);
}

function openProject(index) {
  const p = localize(PROJECTS[index]);
  const modal = document.getElementById('modal');

  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-meta').textContent = p.meta;
  document.getElementById('modal-description').textContent = p.description;
  document.getElementById('modal-tags').innerHTML =
    (p.role ? [p.role] : []).concat(p.tags).map(tag => `<i>${tag}</i>`).join('');
  buildGallery(p);
  document.getElementById('modal-links').innerHTML =
    p.links.map(l => `<a href="${l[1]}" target="_blank" rel="noopener">${l[0]} →</a>`).join('');

  modal.scrollTop = 0;
  modal.showModal();
  fitGalleryThumbs();
}

function initModal() {
  const modal = document.getElementById('modal');

  // Abrir: clic en el botón o en la foto de cualquier tarjeta
  document.getElementById('list').addEventListener('click', e => {
    const target = e.target.closest('[data-i]');
    if (target) openProject(+target.dataset.i);
  });

  // Cerrar: botón ×, clic afuera o tecla Esc (la maneja <dialog>)
  document.getElementById('modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

  window.addEventListener('resize', fitGalleryThumbs);
}
