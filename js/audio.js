let ctx = null;
let muted = false;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, duration, type = 'sine', gainValue = 0.15, delay = 0) {
  if (muted) return;
  const audioCtx = getCtx();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const start = audioCtx.currentTime + delay;
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export function setMuted(value) {
  muted = value;
}

export function isMuted() {
  return muted;
}

export function playCorrect() {
  tone(720, 0.08, 'sine', 0.12);
}

export function playWrong() {
  tone(140, 0.15, 'sawtooth', 0.1);
}

export function playWordDestroy() {
  tone(520, 0.07, 'triangle', 0.15);
  tone(940, 0.09, 'triangle', 0.12, 0.05);
}

export function playBuildingHit() {
  tone(120, 0.3, 'square', 0.16);
  tone(80, 0.35, 'sawtooth', 0.14, 0.05);
}

export function playLevelUp() {
  tone(523, 0.12, 'sine', 0.15, 0);
  tone(659, 0.12, 'sine', 0.15, 0.12);
  tone(784, 0.2, 'sine', 0.15, 0.24);
}

export function playGameOver() {
  tone(300, 0.2, 'sawtooth', 0.14, 0);
  tone(220, 0.2, 'sawtooth', 0.14, 0.2);
  tone(150, 0.4, 'sawtooth', 0.14, 0.4);
}
