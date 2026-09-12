/* Loop — step sequencer */

const $ = (s, r = document) => r.querySelector(s);

/* Config */
const STEPS = 16;
const STORAGE_KEY = 'loop.pattern.v1';
const THEME_KEY = 'loop.theme.v1';

const ROWS = [
  { id: 'kick',  name: 'Kick',  color: 'var(--kick)',  play: (t) => playKick(t)  },
  { id: 'snare', name: 'Snare', color: 'var(--snare)', play: (t) => playSnare(t) },
  { id: 'hat',   name: 'Hat',   color: 'var(--hat)',   play: (t) => playHat(t)   },
  { id: 'blip',  name: 'Blip',  color: 'var(--blip)',  play: (t) => playBlip(t)  },
];

const PRESETS = {
  basic: [
    [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
  ],
  techno: [
    [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    [0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1],
    [0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0],
  ],
  lofi: [
    [1,0,0,0, 0,0,0,0, 1,0,0,1, 0,0,0,0],
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1],
    [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
    [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,1,0],
  ],
  house: [
    [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
    [0,0,0,1, 0,0,0,0, 0,1,0,0, 0,0,0,1],
  ],
  trap: [
    [1,0,0,0, 0,0,0,1, 0,0,1,0, 0,0,0,0],
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
    [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0],
  ],
  empty: [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
  ],
};

/* State */
let pattern = clonePattern(PRESETS.basic);
let stepButtons = [];   // stepButtons[row][col]
let isPlaying = false;
let currentStep = 0;
let prevStep = -1;
let nextNoteTime = 0;
let timerId = null;
let bpm = 110;

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;

/* Audio */
let audioCtx = null;
let masterGain = null;
let noiseBuffer = null;

function initAudio() {
  if (audioCtx) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  audioCtx = new Ctx();

  masterGain = audioCtx.createGain();
  masterGain.gain.value = parseInt($('#volRange').value, 10) / 100;
  masterGain.connect(audioCtx.destination);

  // 1 second of white noise, reused for snare + hat
  const len = Math.floor(audioCtx.sampleRate);
  noiseBuffer = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
}

function playKick(time) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.setValueAtTime(160, time);
  osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.4);
  gain.gain.setValueAtTime(1.0, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + 0.45);
}

function playSnare(time) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  const nFilter = audioCtx.createBiquadFilter();
  nFilter.type = 'highpass';
  nFilter.frequency.value = 1200;
  const nGain = audioCtx.createGain();
  nGain.gain.setValueAtTime(0.65, time);
  nGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
  noise.connect(nFilter);
  nFilter.connect(nGain);
  nGain.connect(masterGain);
  noise.start(time);
  noise.stop(time + 0.2);

  const osc = audioCtx.createOscillator();
  const oGain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, time);
  osc.frequency.exponentialRampToValueAtTime(100, time + 0.08);
  oGain.gain.setValueAtTime(0.45, time);
  oGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
  osc.connect(oGain);
  oGain.connect(masterGain);
  osc.start(time);
  osc.stop(time + 0.12);
}

function playHat(time) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 8000;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.3, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  noise.start(time);
  noise.stop(time + 0.06);
}

function playBlip(time) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(660, time);
  gain.gain.setValueAtTime(0.14, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + 0.18);
}

/* Scheduler */
function nextNote() {
  const secondsPerBeat = 60 / bpm;
  nextNoteTime += 0.25 * secondsPerBeat;      // 16th notes
  currentStep = (currentStep + 1) % STEPS;
}

function scheduleNote(step, time) {
  for (let r = 0; r < ROWS.length; r++) {
    if (pattern[r][step]) ROWS[r].play(time);
  }
  const delay = Math.max(0, (time - audioCtx.currentTime) * 1000);
  setTimeout(() => { if (isPlaying) setPlayhead(step); }, delay);
}

function scheduler() {
  while (nextNoteTime < audioCtx.currentTime + SCHEDULE_AHEAD_S) {
    scheduleNote(currentStep, nextNoteTime);
    nextNote();
  }
  timerId = setTimeout(scheduler, LOOKAHEAD_MS);
}

/* Transport controls */
const playBtn = $('#playBtn');

function start() {
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  isPlaying = true;
  currentStep = 0;
  nextNoteTime = audioCtx.currentTime + 0.05;
  scheduler();
  updatePlayButton();
}

function stop() {
  isPlaying = false;
  clearTimeout(timerId);
  setPlayhead(-1);
  updatePlayButton();
}

function updatePlayButton() {
  const label = $('#playLabel');
  const playIcon = playBtn.querySelector('.icon-play');
  const stopIcon = playBtn.querySelector('.icon-stop');
  if (isPlaying) {
    label.textContent = 'Stop';
    playIcon.style.display = 'none';
    stopIcon.style.display = '';
    playBtn.classList.add('playing');
  } else {
    label.textContent = 'Play';
    playIcon.style.display = '';
    stopIcon.style.display = 'none';
    playBtn.classList.remove('playing');
  }
}

playBtn.addEventListener('click', () => isPlaying ? stop() : start());

/* Playhead */
function setPlayhead(step) {
  if (prevStep === step) return;
  if (prevStep >= 0) {
    for (let r = 0; r < ROWS.length; r++) {
      stepButtons[r][prevStep].classList.remove('playing');
    }
  }
  if (step >= 0) {
    for (let r = 0; r < ROWS.length; r++) {
      stepButtons[r][step].classList.add('playing');
    }
  }
  prevStep = step;
}

/* Grid build */
const rowsEl = $('#rows');
const beatsEl = $('#beats');

function buildBeats() {
  beatsEl.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const d = document.createElement('div');
    d.className = 'beat-num';
    d.textContent = String(i + 1);
    beatsEl.appendChild(d);
  }
}

function buildGrid() {
  rowsEl.innerHTML = '';
  stepButtons = [];

  ROWS.forEach((row, r) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'sequencer-row';
    rowEl.style.setProperty('--row-color', row.color);

    const label = document.createElement('div');
    label.className = 'row-label';
    const dot = document.createElement('span');
    dot.className = 'row-dot';
    const name = document.createElement('span');
    name.className = 'row-name';
    name.textContent = row.name;
    label.append(dot, name);

    const stepsEl = document.createElement('div');
    stepsEl.className = 'row-steps';

    const rowBtns = [];
    for (let c = 0; c < STEPS; c++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'step' + (c % 4 === 0 ? ' beat-start' : '');
      btn.setAttribute('aria-label', `${row.name} step ${c + 1}`);
      btn.setAttribute('aria-pressed', String(!!pattern[r][c]));
      if (pattern[r][c]) btn.classList.add('on');
      btn.addEventListener('click', () => toggleStep(r, c));
      stepsEl.appendChild(btn);
      rowBtns.push(btn);
    }
    stepButtons.push(rowBtns);

    rowEl.append(label, stepsEl);
    rowsEl.appendChild(rowEl);
  });
}

function toggleStep(r, c) {
  pattern[r][c] = !pattern[r][c];
  const btn = stepButtons[r][c];
  btn.classList.toggle('on', pattern[r][c]);
  btn.setAttribute('aria-pressed', String(pattern[r][c]));
  savePattern();

  // instant audio preview if not playing
  if (!isPlaying) {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (pattern[r][c]) ROWS[r].play(audioCtx.currentTime);
  }
}

/* Persistence */
function clonePattern(p) {
  return p.map(row => row.map(Boolean));
}

function savePattern() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pattern));
  } catch (e) { /* ignore quota errors */ }
}

function loadPattern() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      Array.isArray(raw) &&
      raw.length === ROWS.length &&
      raw.every(row => Array.isArray(row) && row.length === STEPS)
    ) {
      return raw.map(row => row.map(Boolean));
    }
  } catch (e) { /* fall through */ }
  return null;
}

/* Presets */
document.querySelectorAll('.preset').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.preset;
    const preset = PRESETS[key];
    if (!preset) return;
    pattern = clonePattern(preset);
    buildGrid();
    savePattern();
    toast(`Loaded "${btn.textContent}"`);
  });
});

/* Clear */
$('#clearBtn').addEventListener('click', () => {
  pattern = clonePattern(PRESETS.empty);
  buildGrid();
  savePattern();
  toast('Pattern cleared');
});

/* Sliders */
const bpmRange = $('#bpmRange');
const bpmValue = $('#bpmValue');
const volRange = $('#volRange');
const volValue = $('#volValue');

bpmRange.addEventListener('input', () => {
  bpm = parseInt(bpmRange.value, 10);
  bpmValue.innerHTML = `${bpm} <small>BPM</small>`;
});

volRange.addEventListener('input', () => {
  const v = parseInt(volRange.value, 10);
  volValue.innerHTML = `${v} <small>%</small>`;
  if (masterGain) masterGain.gain.value = v / 100;
});

/* Theme */
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
});

/* Keyboard */
document.addEventListener('keydown', (e) => {
  if (e.code !== 'Space' || e.repeat) return;
  const tag = document.activeElement?.tagName;
  if (tag === 'BUTTON' || tag === 'INPUT') return;
  e.preventDefault();
  isPlaying ? stop() : start();
});

/* Toast */
const toastEl = $('#toast');
let toastTimer = null;

function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

/* Boot */
(function boot() {
  const saved = loadPattern();
  if (saved) pattern = saved;
  buildBeats();
  buildGrid();
  updatePlayButton();
})();