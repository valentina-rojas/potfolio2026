/* ==========================================================================
   GAME · minijuego de saltos (espacio, clic o toque)
   Depende de: i18n.js (tr) para los textos del marcador
   ========================================================================== */

function initGame() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const hint = document.getElementById('hint');
  const modal = document.getElementById('modal');
  const style = getComputedStyle(document.documentElement);

  const W = canvas.width, H = canvas.height;
  const GROUND = H - 36;

  /* Ajustes de dificultad */
  const GRAVITY = .8;
  const JUMP = -15;
  const START_SPEED = 4.2;
  const COLORS = { player: '#a22a0f', eye: '#111', obstacles: ['#747400', '#115f78'] };

  let player, obstacles, speed, score, over, ticks;
  let best = 0;
  let started = false;

  function reset() {
    player = { y: GROUND - 34, v: 0, s: 34 };
    obstacles = [];
    speed = START_SPEED;
    score = 0;
    over = false;
    ticks = 0;
  }
  reset();

  function jump() {
    if (!started) { started = true; hint.hidden = true; }
    if (over) { reset(); return; }
    if (player.y >= GROUND - player.s) player.v = JUMP;   // sólo salta si está en el piso
  }

  canvas.addEventListener('pointerdown', jump);
  window.addEventListener('keydown', e => {
    const focused = document.activeElement === document.body || document.activeElement === canvas;
    if (e.code === 'Space' && !modal.open && focused) {
      e.preventDefault();
      jump();
    }
  });

  function update() {
    ticks++;
    player.v += GRAVITY;
    player.y += player.v;
    if (player.y > GROUND - player.s) { player.y = GROUND - player.s; player.v = 0; }

    // Nuevo obstáculo: cada vez más seguido, pero con un mínimo de separación
    if (ticks % Math.max(62, 104 - Math.floor(score / 50)) === 0) {
      obstacles.push({ x: W, w: 24, h: 22 + Math.random() * 24 });
    }
    obstacles.forEach(o => { o.x -= speed; });
    obstacles = obstacles.filter(o => o.x > -40);

    score++;
    speed = START_SPEED + score / 360;

    // Colisión (con un poco de margen a favor de quien juega)
    obstacles.forEach(o => {
      const hit = 64 < o.x + o.w - 3
        && 60 + player.s - 5 > o.x + 3
        && player.y + player.s - 4 > GROUND - o.h;
      if (hit) { over = true; best = Math.max(best, score); }
    });
  }

  function draw() {
    const ink = style.getPropertyValue('--ink').trim();
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = ink;
    ctx.fillRect(0, GROUND, W, 3);

    obstacles.forEach((o, i) => {
      ctx.fillStyle = COLORS.obstacles[i % 2];
      ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
    });

    ctx.fillStyle = COLORS.player;
    ctx.fillRect(60, player.y, player.s, player.s);
    ctx.fillStyle = COLORS.eye;
    ctx.fillRect(81, player.y + 9, 6, 6);

    ctx.fillStyle = ink;
    ctx.font = '700 20px "Space Mono",monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${tr('pts')} ${Math.floor(score / 10)}  ${tr('best')} ${Math.floor(best / 10)}`, 16, 28);

    if (over) {
      ctx.textAlign = 'center';
      ctx.font = '700 34px "Pixelify Sans",monospace';
      ctx.fillText(tr('over'), W / 2, H / 2);
    }
  }

  function frame() {
    if (started && !over) update();
    draw();
    requestAnimationFrame(frame);
  }
  frame();
}
