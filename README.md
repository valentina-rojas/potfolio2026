# Portfolio · Valentina Rojas

Portfolio web de desarrolladora de videojuegos. Es un sitio **estático** (HTML + CSS + JavaScript, sin dependencias ni paso de compilación): se puede abrir directo o subir a cualquier hosting.

- Hoja de cuaderno con renglones sobre fondo cuadriculado
- Menú con hamburguesa en celular y selector de idioma **ES / EN**
- Minijuego de saltos
- Proyectos con filtros y ventana de detalle con galería
- Animaciones suaves (se desactivan si el sistema pide "reducir movimiento")

## Cómo verlo

Hacé doble clic en `index.html`. Si querés probarlo con un servidor local:

```bash
# desde esta carpeta
python3 -m http.server 8000
# y abrí http://localhost:8000
```

## Estructura

```
portfolio/
├── index.html                 Estructura de la página (secciones, menú, ventana de proyecto)
├── README.md
│
├── css/                       Estilos, uno por componente (se cargan en este orden)
│   ├── base.css               Paleta (variables), reset, tipografías base
│   ├── layout.css             Hoja central, secciones, títulos, separadores, pie
│   ├── components.css         Cinta adhesiva e imágenes de reemplazo
│   ├── nav.css                Menú, botón de idioma, hamburguesa
│   ├── hero.css               Inicio: nombre, sticker, estado
│   ├── about.css              Sobre mí: polaroid y etiquetas
│   ├── game.css               Pantalla del minijuego
│   ├── projects.css           Filtros y tarjetas de proyectos
│   ├── modal.css              Ventana de proyecto y galería
│   ├── contact.css            Hablemos y lista de enlaces
│   └── motion.css             Animaciones y transiciones (va último)
│
├── js/
│   ├── boot.js                Marca la página como "con JS" (se carga en el <head>)
│   ├── data/
│   │   ├── projects.js        ★ Datos de los proyectos (textos, fechas, links, imágenes)
│   │   └── translations.js    ★ Textos de la interfaz en español e inglés
│   ├── i18n.js                Idioma actual, traducción y botón ES / EN
│   ├── projects.js            Dibuja las tarjetas y maneja los filtros
│   ├── modal.js               Ventana de proyecto y galería de imágenes
│   ├── nav.js                 Menú hamburguesa y resaltado de la sección visible
│   ├── effects.js             Aparición de elementos al hacer scroll
│   ├── game.js                Minijuego
│   └── main.js                Punto de entrada: inicia todo en orden
│
└── assets/
    ├── favicon.svg
    └── img/
        ├── about/valentina.jpg            Ilustración de la polaroid
        └── projects/<slug>/01.jpg …       Fotos de cada proyecto (la 01 es la portada)
```

Los archivos marcados con ★ son los que más vas a tocar.

## Cómo editar

**Agregar un proyecto**
1. Creá la carpeta `assets/img/projects/<slug>/` y poné las imágenes como `01.jpg`, `02.jpg`… (la primera es la portada).
2. En `js/data/projects.js`, copiá un bloque de la lista y cambiá los datos:

| Campo | Para qué sirve |
|---|---|
| `slug` | Nombre de la carpeta de imágenes |
| `title` | Título |
| `period` | Fecha corta de la tarjeta (ej. `"may – nov 2025"`) |
| `categories` | Filtros a los que pertenece, separados por espacio (`unity`, `phaser`, `web`) |
| `theme` | Color de la tarjeta: `k1` … `k6` (ver `css/projects.css`) |
| `summary` | Frase corta de la tarjeta |
| `meta` | Línea de fechas y tecnologías de la ventana |
| `role` | Tu rol (primera etiqueta de la ventana; `""` para ocultarlo) |
| `description` | Descripción completa |
| `tags` | Etiquetas de la ventana |
| `links` | Lista de `["texto", "url"]` |
| `images` | Lista de rutas de imágenes |
| `portrait` | Poné `true` si las capturas son verticales (celular) |
| `en` | Los mismos campos en inglés (sólo los que cambian) |

El orden de la lista es el orden en la página. Si agregás una categoría nueva, sumá su botón en `index.html` (`<div class="filters">`).

**Cambiar un texto de la interfaz** → `js/data/translations.js` (cada clave tiene versión `es` y `en`). En el HTML se enlazan con `data-i18n="clave"`.

**Cambiar colores** → variables al principio de `css/base.css` (`--desk`, `--paper`, `--ink`, `--y`, …). Los colores de las tarjetas están en `css/projects.css`.

**Cambiar enlaces de contacto** → lista `clist` en `index.html`.

**Dificultad del juego** → constantes al principio de `js/game.js` (`GRAVITY`, `JUMP`, `START_SPEED`).

## Publicarlo

Es una carpeta de archivos estáticos, sirve cualquiera de estas opciones:

- **Netlify**: arrastrá la carpeta `portfolio/` a https://app.netlify.com/drop
- **GitHub Pages**: subí el contenido a un repositorio y activá Pages en *Settings → Pages*
- **Vercel / Cloudflare Pages**: importá el repositorio, sin comando de build y con la raíz como carpeta de salida

## Notas

- Las tipografías (Inter, Pixelify Sans, Space Mono y Patrick Hand) se cargan desde Google Fonts, así que hace falta internet para verlas. Si querés que funcione sin conexión, descargalas y cambiá el `<link>` del `<head>` por reglas `@font-face` en `css/base.css`.
- El idioma elegido se guarda en el navegador (`localStorage`).
- Los scripts son clásicos (sin módulos ES), por eso el sitio también funciona abriéndolo con doble clic.
- Las capturas están comprimidas en JPG (~1,5 MB en total).
