(() => {
  const canvas = document.getElementById('black-hole-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const TAU = Math.PI * 2;

  const state = {
    active: false,
    opacity: 0,
    holdUntil: 0,
    timer: 0,
    raf: 0,
    last: 0,
    lastDraw: 0,
    x: 0.18,
    y: 0.2,
    size: 0.07,
    tilt: -0.3,
    seed: 0
  };

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function scheduleNext(delay) {
    clearTimeout(state.timer);
    state.timer = window.setTimeout(activate, delay);
  }

  function activate(holdMs) {
    clearTimeout(state.timer);
    state.timer = 0;

    if (document.hidden) {
      scheduleNext(20000);
      return;
    }

    state.active = true;
    state.opacity = 0;
    state.holdUntil = performance.now() + (
      Number.isFinite(holdMs) ? holdMs : 18000 + Math.random() * 17000
    );
    const mobile = window.innerWidth < 600;

    if (mobile) {
      state.x = 0.72 + Math.random() * 0.16;
      state.y = 0.22 + Math.random() * 0.12;
      state.size = 0.04 + Math.random() * 0.02;
    } else {
      state.x = 0.2 + Math.random() * 0.2;
      state.y = 0.09 + Math.random() * 0.07;
      state.size = 0.052 + Math.random() * 0.038;
    }
    state.tilt = -0.38 + Math.random() * 0.18;
    state.seed = Math.random() * TAU;

    canvas.hidden = false;
    state.last = performance.now();
    state.lastDraw = 0;
    start();
  }

  function finish() {
    state.active = false;
    state.opacity = 0;
    canvas.hidden = true;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stop();
    scheduleNext(120000 + Math.random() * 180000);
  }

  function start() {
    if (state.raf) return;
    state.last = performance.now();
    state.raf = requestAnimationFrame(loop);
  }

  function stop() {
    if (!state.raf) return;
    cancelAnimationFrame(state.raf);
    state.raf = 0;
  }

  function loop(now) {
    state.raf = 0;

    const dt = Math.min(0.05, (now - state.last) / 1000);
    state.last = now;

    if (state.active && now >= state.holdUntil) state.active = false;

    const target = state.active ? 1 : 0;
    const speed = state.active ? 0.85 : 0.9;
    state.opacity += (target - state.opacity) * Math.min(1, dt * speed);

    if (!state.active && state.opacity < 0.012) {
      finish();
      return;
    }

    if (now - state.lastDraw >= 33) {
      state.lastDraw = now;
      draw(now);
    }

    state.raf = requestAnimationFrame(loop);
  }

  function drawLensArcs(cx, cy, radius, time) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = Math.max(0.8, radius * 0.012);

    for (let index = 0; index < 5; index += 1) {
      const start = state.seed + index * 1.9 + time * 0.015;
      const distance = radius * (2.2 + 0.35 * Math.sin(start * 1.3));
      const alpha = 0.04 + 0.03 * (0.5 + 0.5 * Math.sin(time * 0.25 + index));

      ctx.strokeStyle = `rgba(175, 205, 255, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(0, 0, distance, start, start + 0.22);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawDisk(cx, cy, radius, time, front) {
    const width = window.innerWidth;

    ctx.save();

    if (front) {
      const band = radius * 0.8;
      ctx.beginPath();
      ctx.rect(0, cy - radius * 0.15, width, band);
      ctx.clip();
      ctx.globalAlpha *= 0.8;
    }

    ctx.translate(cx, cy);
    ctx.rotate(state.tilt);
    ctx.scale(1, 0.26);
    ctx.globalCompositeOperation = 'lighter';

    const inner = radius;
    const outer = radius * 3.9;
    const gradient = ctx.createRadialGradient(0, 0, inner, 0, 0, outer);

    gradient.addColorStop(0, 'rgba(255, 245, 230, 0)');
    gradient.addColorStop(0.025, 'rgba(255, 245, 230, 0.95)');
    gradient.addColorStop(0.1, 'rgba(255, 215, 160, 0.82)');
    gradient.addColorStop(0.24, 'rgba(255, 175, 95, 0.55)');
    gradient.addColorStop(0.46, 'rgba(240, 120, 55, 0.26)');
    gradient.addColorStop(0.72, 'rgba(170, 60, 30, 0.1)');
    gradient.addColorStop(1, 'rgba(80, 20, 10, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, outer, 0, TAU);
    ctx.fill();

    if (typeof ctx.createConicGradient === 'function') {
      const sheen = ctx.createConicGradient(time * 0.06 + state.seed, 0, 0);

      sheen.addColorStop(0, 'rgba(255, 190, 120, 0)');
      sheen.addColorStop(0.12, 'rgba(255, 220, 180, 0.18)');
      sheen.addColorStop(0.24, 'rgba(255, 160, 90, 0)');
      sheen.addColorStop(0.48, 'rgba(255, 210, 160, 0.14)');
      sheen.addColorStop(0.66, 'rgba(255, 140, 70, 0)');
      sheen.addColorStop(0.82, 'rgba(255, 235, 205, 0.2)');
      sheen.addColorStop(1, 'rgba(255, 190, 120, 0)');

      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, outer, 0, TAU);
      ctx.arc(0, 0, inner, 0, TAU, true);
      ctx.clip();
      ctx.fillStyle = sheen;
      ctx.fillRect(-outer, -outer, outer * 2, outer * 2);
      ctx.restore();
    }

    for (let index = 0; index < 4; index += 1) {
      const angle = time * 0.09 + state.seed + index * 1.57;
      const distance = radius * (1.8 + 0.55 * Math.sin(time * 0.18 + index * 1.7));
      const hx = Math.cos(angle) * distance;
      const hy = Math.sin(angle) * distance;
      const spot = radius * (0.16 + 0.07 * Math.sin(time * 0.27 + index));
      const hot = ctx.createRadialGradient(hx, hy, 0, hx, hy, spot * 2.5);

      hot.addColorStop(0, 'rgba(255, 250, 235, 0.95)');
      hot.addColorStop(0.3, 'rgba(255, 205, 130, 0.45)');
      hot.addColorStop(1, 'rgba(255, 120, 40, 0)');

      ctx.fillStyle = hot;
      ctx.beginPath();
      ctx.arc(hx, hy, spot * 2.5, 0, TAU);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawCore(cx, cy, radius) {
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.88, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.96, 'rgba(0, 0, 0, 0.98)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, TAU);
    ctx.fill();

    ctx.restore();
  }

  function drawRing(cx, cy, radius) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = 'rgba(255, 244, 225, 0.92)';
    ctx.lineWidth = Math.max(1.2, radius * 0.022);
    ctx.shadowColor = 'rgba(255, 195, 125, 0.85)';
    ctx.shadowBlur = radius * 0.13;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.015, 0, TAU);
    ctx.stroke();

    ctx.rotate(state.tilt * 0.35);

    const arc = ctx.createLinearGradient(-radius, 0, radius, 0);
    arc.addColorStop(0, 'rgba(255, 200, 140, 0)');
    arc.addColorStop(0.5, 'rgba(255, 240, 215, 0.55)');
    arc.addColorStop(1, 'rgba(255, 200, 140, 0)');

    ctx.strokeStyle = arc;
    ctx.lineWidth = Math.max(1.6, radius * 0.04);
    ctx.shadowBlur = radius * 0.1;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.11, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();

    ctx.restore();
  }

  function draw(now) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cx = state.x * width;
    const cy = state.y * height;
    const radius = Math.max(32, Math.min(100, Math.min(width, height) * state.size));
    const time = now / 1000;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalAlpha = state.opacity;
    ctx.globalCompositeOperation = 'source-over';

    const halo = ctx.createRadialGradient(cx, cy, radius * 1.05, cx, cy, radius * 4.6);
    halo.addColorStop(0, 'rgba(0, 0, 0, 0.62)');
    halo.addColorStop(0.32, 'rgba(0, 0, 0, 0.38)');
    halo.addColorStop(0.62, 'rgba(0, 0, 0, 0.14)');
    halo.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 4.6, 0, TAU);
    ctx.fill();

    ctx.globalCompositeOperation = 'lighter';

    const glow = ctx.createRadialGradient(cx, cy, radius * 1.4, cx, cy, radius * 4.4);
    glow.addColorStop(0, 'rgba(255, 170, 90, 0.1)');
    glow.addColorStop(0.35, 'rgba(255, 140, 70, 0.05)');
    glow.addColorStop(0.7, 'rgba(120, 150, 255, 0.025)');
    glow.addColorStop(1, 'rgba(120, 150, 255, 0)');

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 4.4, 0, TAU);
    ctx.fill();

    drawDisk(cx, cy, radius, time, false);
    drawLensArcs(cx, cy, radius, time);
    drawCore(cx, cy, radius);
    drawDisk(cx, cy, radius, time, true);
    drawRing(cx, cy, radius);

    ctx.restore();
  }

  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
      return;
    }

    if (state.active || state.opacity > 0.012) {
      state.last = performance.now();
      start();
    }
  });

  window.addEventListener('cosmic:black-hole', (event) => {
    const hold = event && event.detail ? Number(event.detail.hold) : NaN;
    activate(Number.isFinite(hold) ? hold : undefined);
  });

  if (Math.random() < 0.35) {
    scheduleNext(3000 + Math.random() * 4500);
  } else {
    scheduleNext(60000 + Math.random() * 90000);
  }
})();
