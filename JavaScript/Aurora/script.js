/* ============================================================
   Aurora — script.js
   ============================================================ */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const root = document.documentElement;
const dpr  = Math.min(window.devicePixelRatio || 1, 2);

/* ============================================================
   1. THEME
   ============================================================ */
const themeToggle = $('#themeToggle');
const savedTheme  = localStorage.getItem('aurora.theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('aurora.theme', next);
  updateParticleColors();
});

/* ============================================================
   2. DATE CHIP
   ============================================================ */
$('#dateChip').textContent = new Date().toLocaleDateString(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
});

/* ============================================================
   3. TOAST
   ============================================================ */
const toastEl = $('#toast');
let toastTimer = null;

function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

/* ============================================================
   4. PARTICLE CONSTELLATION BACKGROUND
   ============================================================ */
const bgCanvas = $('#bg-canvas');
const bgCtx    = bgCanvas.getContext('2d');

let W = 0, H = 0;
let particles = [];
const pointer = { x: -9999, y: -9999 };
let dotRGB = '150, 140, 255';
let lineRGB = '124, 92, 255';

function updateParticleColors() {
  const styles = getComputedStyle(root);
  dotRGB  = styles.getPropertyValue('--dot').trim() || '150, 140, 255';
  lineRGB = root.getAttribute('data-theme') === 'light' ? '90, 70, 190' : '124, 92, 255';
}

function sizeBackground() {
  W = bgCanvas.width  = Math.floor(innerWidth  * dpr);
  H = bgCanvas.height = Math.floor(innerHeight * dpr);
  bgCanvas.style.width  = innerWidth  + 'px';
  bgCanvas.style.height = innerHeight + 'px';
  buildParticles();
}

function buildParticles() {
  const count = Math.min(120, Math.max(28, Math.floor((innerWidth * innerHeight) / 16000)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.26 * dpr,
    vy: (Math.random() - 0.5) * 0.26 * dpr,
    r: (Math.random() * 1.5 + 0.6) * dpr
  }));
}

function drawBackground() {
  bgCtx.clearRect(0, 0, W, H);

  const linkDist = 132 * dpr;
  const repelDist = 150 * dpr;

  // Move
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    // Gentle pointer repulsion
    const dx = p.x - pointer.x;
    const dy = p.y - pointer.y;
    const dist = Math.hypot(dx, dy);
    if (dist < repelDist && dist > 0.001) {
      const force = (1 - dist / repelDist) * 0.85;
      p.x += (dx / dist) * force * dpr;
      p.y += (dy / dist) * force * dpr;
    }

    // Wrap around edges
    if (p.x < -20) p.x = W + 20;
    if (p.x > W + 20) p.x = -20;
    if (p.y < -20) p.y = H + 20;
    if (p.y > H + 20) p.y = -20;
  }

  // Connective lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < linkDist * linkDist) {
        const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.34;
        bgCtx.strokeStyle = `rgba(${lineRGB}, ${alpha})`;
        bgCtx.lineWidth = 1 * dpr;
        bgCtx.beginPath();
        bgCtx.moveTo(a.x, a.y);
        bgCtx.lineTo(b.x, b.y);
        bgCtx.stroke();
      }
    }
  }

  // Dots
  for (const p of particles) {
    bgCtx.fillStyle = `rgba(${dotRGB}, 0.72)`;
    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    bgCtx.fill();
  }

  requestAnimationFrame(drawBackground);
}

window.addEventListener('resize', () => {
  sizeBackground();
  sizeConfetti();
});

updateParticleColors();
sizeBackground();
drawBackground();

/* ============================================================
   5. CURSOR GLOW
   ============================================================ */
const cursorGlow = $('#cursorGlow');
let glowX = innerWidth / 2, glowY = innerHeight / 2;
let targetX = glowX, targetY = glowY;

window.addEventListener('pointermove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
  pointer.x = e.clientX * dpr;
  pointer.y = e.clientY * dpr;
  document.body.classList.add('has-pointer');
});

window.addEventListener('pointerleave', () => {
  document.body.classList.remove('has-pointer');
  pointer.x = -9999;
  pointer.y = -9999;
});

(function animateGlow() {
  glowX += (targetX - glowX) * 0.12;
  glowY += (targetY - glowY) * 0.12;
  cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
  requestAnimationFrame(animateGlow);
})();

/* ============================================================
   6. CONFETTI
   ============================================================ */
const confettiCanvas = $('#confetti');
const cctx = confettiCanvas.getContext('2d');
let confettiParts = [];
let confettiRunning = false;

const CONFETTI_COLORS = ['#7c5cff', '#22d3ee', '#ff5c8a', '#ffd166', '#5b8cff', '#4ade80'];

function sizeConfetti() {
  confettiCanvas.width  = Math.floor(innerWidth  * dpr);
  confettiCanvas.height = Math.floor(innerHeight * dpr);
  confettiCanvas.style.width  = innerWidth  + 'px';
  confettiCanvas.style.height = innerHeight + 'px';
}

function burstConfetti() {
  const originX = confettiCanvas.width / 2;
  const originY = confettiCanvas.height * 0.42;

  for (let i = 0; i < 110; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 7 + 3) * dpr;
    confettiParts.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3 * dpr,
      w: (Math.random() * 7 + 5) * dpr,
      h: (Math.random() * 5 + 4) * dpr,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.28,
      life: 1,
      color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0]
    });
  }

  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(confettiLoop);
  }
}

function confettiLoop() {
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (const p of confettiParts) {
    p.vy += 0.16 * dpr;
    p.vx *= 0.995;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 0.007;

    cctx.save();
    cctx.globalAlpha = Math.max(p.life, 0);
    cctx.translate(p.x, p.y);
    cctx.rotate(p.rot);
    cctx.fillStyle = p.color;
    cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cctx.restore();
  }

  confettiParts = confettiParts.filter(
    (p) => p.life > 0 && p.y < confettiCanvas.height + 80
  );

  if (confettiParts.length) {
    requestAnimationFrame(confettiLoop);
  } else {
    confettiRunning = false;
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

sizeConfetti();

/* ============================================================
   7. TASK STATE
   ============================================================ */
const STORAGE_KEY = 'aurora.tasks';

let tasks = [];
try {
  const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (Array.isArray(raw)) tasks = raw;
} catch (err) {
  tasks = [];
}

let currentFilter = 'all';
let lastPct = 0;

const taskList   = $('#taskList');
const taskForm   = $('#taskForm');
const taskInput  = $('#taskInput');
const emptyState = $('#emptyState');

const ringFill  = $('#ringFill');
const ringPct   = $('#ringPct');
const statTotal = $('#statTotal');
const statActive = $('#statActive');
const statDone  = $('#statDone');

const RING_CIRCUMFERENCE = 2 * Math.PI * 52; // r = 52

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* ============================================================
   8. RENDER
   ============================================================ */
function render() {
  const visible = tasks.filter((t) => {
    if (currentFilter === 'active') return !t.done;
    if (currentFilter === 'done')   return t.done;
    return true;
  });

  taskList.innerHTML = '';

  for (const task of visible) {
    const li = document.createElement('li');
    li.className = 'task' + (task.done ? ' done' : '');
    li.dataset.id = task.id;

    // Check button
    const check = document.createElement('button');
    check.type = 'button';
    check.className = 'check';
    check.setAttribute('aria-label', task.done ? 'Mark as active' : 'Mark as done');
    check.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" ' +
      'stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

    // Text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    // Delete button
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'del';
    del.setAttribute('aria-label', 'Delete task');
    del.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>';

    li.append(check, span, del);
    taskList.appendChild(li);
  }

  emptyState.classList.toggle('show', visible.length === 0);
  updateStats();
}

/* ============================================================
   9. STATS + RING
   ============================================================ */
function bump(el) {
  el.classList.remove('bump');
  void el.offsetWidth; // reflow to restart animation
  el.classList.add('bump');
}

function updateStats() {
  const total = tasks.length;
  const done  = tasks.filter((t) => t.done).length;
  const active = total - done;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  if (statTotal.textContent !== String(total)) {
    statTotal.textContent = total;
    bump(statTotal);
  }
  if (statActive.textContent !== String(active)) {
    statActive.textContent = active;
    bump(statActive);
  }
  if (statDone.textContent !== String(done)) {
    statDone.textContent = done;
    bump(statDone);
  }

  ringPct.textContent = pct + '%';
  ringFill.style.strokeDasharray = RING_CIRCUMFERENCE.toFixed(2);
  ringFill.style.strokeDashoffset = (RING_CIRCUMFERENCE * (1 - pct / 100)).toFixed(2);

  // Celebrate reaching 100%
  if (pct === 100 && lastPct < 100 && total > 0) {
    burstConfetti();
    toast('🎉 All tasks complete — amazing!');
  }
  lastPct = pct;
}

/* ============================================================
   10. EVENTS
   ============================================================ */

// Add task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }

  tasks.unshift({ id: uid(), text, done: false, createdAt: Date.now() });
  taskInput.value = '';
  save();
  render();

  // Animate the newest item in
  const first = taskList.querySelector('.task');
  if (first) first.classList.add('enter');

  toast('Task added');
});

// Toggle / delete (event delegation)
taskList.addEventListener('click', (e) => {
  const li = e.target.closest('.task');
  if (!li) return;
  const id = li.dataset.id;
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  if (e.target.closest('.check')) {
    task.done = !task.done;
    save();
    render();
    return;
  }

  if (e.target.closest('.del')) {
    li.classList.add('leaving');
    setTimeout(() => {
      tasks = tasks.filter((t) => t.id !== id);
      save();
      render();
      toast('Task removed');
    }, 260);
  }
});

// Filters
$$('.filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    $$('.filter').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

// Clear completed
$('#clearDone').addEventListener('click', () => {
  const doneCount = tasks.filter((t) => t.done).length;
  if (doneCount === 0) {
    toast('Nothing to clear');
    return;
  }
  tasks = tasks.filter((t) => !t.done);
  save();
  render();
  toast(`Cleared ${doneCount} task${doneCount > 1 ? 's' : ''}`);
});

// Keyboard shortcut: focus input with "/"
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== taskInput) {
    e.preventDefault();
    taskInput.focus();
  }
});

/* ============================================================
   11. BOOT
   ============================================================ */
render();