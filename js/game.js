import { LEVELS } from './levels.js';
import { wordsForLevel } from './words.js';
import { FallingWord } from './fallingWord.js';
import { createBuildings } from './building.js';
import { Scoring } from './scoring.js';
import { buildKeyboard, updateKeyboard } from './keyboard.js';
import { loadSave, saveSave } from './storage.js';
import {
  setMuted, isMuted,
  playCorrect, playWrong, playWordDestroy,
  playBuildingHit, playLevelUp, playGameOver,
} from './audio.js';

const NUM_BUILDINGS = 5;
const SPAWN_MARGIN = 40;

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.groundY = this.height - 30;

    this.save = loadSave();
    setMuted(this.save.muted);

    this.levelIndex = 0;
    this.currentLevel = null;
    this.state = 'title';
    this.lastTimestamp = null;

    this.words = [];
    this.particles = [];
    this.buildings = [];
    this.target = null;
    this.spawnQueue = [];
    this.spawnTimer = 0;
    this.spawnIntervalMs = 1000;
    this.campaignComplete = false;

    this.scoring = new Scoring();

    this.cacheDom();
    this.bindEvents();
    buildKeyboard(this.introKeyboardEl);
    buildKeyboard(this.gameKeyboardEl);
    this.updateTitleScreen();
  }

  cacheDom() {
    this.screens = {
      title: document.getElementById('screen-title'),
      levelIntro: document.getElementById('screen-level-intro'),
      game: document.getElementById('screen-game'),
      levelComplete: document.getElementById('screen-level-complete'),
      gameOver: document.getElementById('screen-game-over'),
    };
    this.hudEl = document.getElementById('hud');
    this.hudLevelEl = document.getElementById('hud-level');
    this.hudScoreEl = document.getElementById('hud-score');
    this.hudStreakEl = document.getElementById('hud-streak');
    this.hudBuildingsEl = document.getElementById('hud-buildings');
    this.muteBtn = document.getElementById('mute-btn');

    this.continueInfoEl = document.getElementById('continue-info');
    this.btnStart = document.getElementById('btn-start');
    this.btnRestartCampaign = document.getElementById('btn-restart-campaign');

    this.introTitleEl = document.getElementById('intro-level-title');
    this.introMessageEl = document.getElementById('intro-message');
    this.introKeyboardEl = document.getElementById('intro-keyboard');
    this.btnBeginLevel = document.getElementById('btn-begin-level');

    this.gameKeyboardEl = document.getElementById('keyboard-guide');

    this.completeTitleEl = document.getElementById('complete-title');
    this.completeStatsEl = document.getElementById('complete-stats');
    this.btnNextLevel = document.getElementById('btn-next-level');

    this.gameoverStatsEl = document.getElementById('gameover-stats');
    this.btnRetryLevel = document.getElementById('btn-retry-level');
    this.btnRestartFromGameOver = document.getElementById('btn-restart-from-gameover');
  }

  bindEvents() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    this.btnStart.addEventListener('click', () => this.startFromTitle());
    this.btnRestartCampaign.addEventListener('click', () => {
      this.levelIndex = 0;
      this.scoring.resetAll();
      this.goToLevelIntro();
    });
    this.btnBeginLevel.addEventListener('click', () => this.startLevel());
    this.btnNextLevel.addEventListener('click', () => {
      this.levelIndex = this.campaignComplete ? 0 : this.levelIndex + 1;
      if (this.campaignComplete) this.scoring.resetAll();
      this.goToLevelIntro();
    });
    this.btnRetryLevel.addEventListener('click', () => this.goToLevelIntro());
    this.btnRestartFromGameOver.addEventListener('click', () => {
      this.levelIndex = 0;
      this.scoring.resetAll();
      this.goToLevelIntro();
    });

    this.muteBtn.addEventListener('click', () => {
      const next = !isMuted();
      setMuted(next);
      this.save.muted = next;
      saveSave(this.save);
      this.muteBtn.textContent = next ? '🔇' : '🔊';
    });
    this.muteBtn.textContent = isMuted() ? '🔇' : '🔊';
  }

  showScreen(name) {
    for (const el of Object.values(this.screens)) el.classList.remove('active');
    this.screens[name].classList.add('active');
    this.hudEl.classList.toggle('hidden', name !== 'game');
  }

  updateTitleScreen() {
    const { highestLevelUnlocked, highScore } = this.save;
    const displayLevel = Math.min(highestLevelUnlocked, LEVELS.length);
    if (highestLevelUnlocked > 1 || highScore > 0) {
      this.continueInfoEl.textContent = `Level ${displayLevel} unlocked · High score ${highScore}`;
      this.btnRestartCampaign.classList.remove('hidden');
    } else {
      this.continueInfoEl.textContent = '';
      this.btnRestartCampaign.classList.add('hidden');
    }
  }

  startFromTitle() {
    this.levelIndex = Math.min(this.save.highestLevelUnlocked, LEVELS.length) - 1;
    this.goToLevelIntro();
  }

  goToLevelIntro() {
    this.state = 'levelIntro';
    const level = LEVELS[this.levelIndex];
    this.currentLevel = level;

    this.introTitleEl.textContent = `Level ${level.id}`;
    if (level.newKeys.length > 0) {
      this.introMessageEl.textContent =
        `New keys: ${level.newKeys.join(' ').toUpperCase()} — find them highlighted below before you start.`;
    } else {
      this.introMessageEl.textContent = 'Same keys as last time — but words are longer and fall faster.';
    }
    updateKeyboard(this.introKeyboardEl, {
      unlocked: level.letterKeys.split(''),
      newKeys: level.newKeys,
    });

    this.showScreen('levelIntro');
  }

  startLevel() {
    const level = this.currentLevel;
    this.words = [];
    this.particles = [];
    this.target = null;
    this.buildings = createBuildings(this.width, NUM_BUILDINGS);
    this.scoring.startLevel();
    this.spawnQueue = wordsForLevel(level);
    this.spawnIntervalMs = level.fallMs / (level.maxConcurrent + 0.5);
    this.spawnTimer = this.spawnIntervalMs; // spawn the first word immediately, not after a full interval
    this.lastTimestamp = null;

    this.state = 'playing';
    this.showScreen('game');
    updateKeyboard(this.gameKeyboardEl, { unlocked: level.letterKeys.split(''), nextKey: null });
    this.updateHud();
  }

  updateHud() {
    this.hudLevelEl.textContent = this.currentLevel.id;
    this.hudScoreEl.textContent = this.scoring.total;
    this.hudStreakEl.textContent = this.scoring.streak;
    this.hudBuildingsEl.textContent = this.buildings.filter((b) => b.alive).length;
  }

  updateGameKeyboardHighlight() {
    const nextKey = this.target ? this.target.text[this.target.typedIndex] : null;
    updateKeyboard(this.gameKeyboardEl, {
      unlocked: this.currentLevel.letterKeys.split(''),
      nextKey,
    });
  }

  // ---------- input ----------

  handleKeydown(e) {
    if (this.state === 'title') { this.startFromTitle(); return; }
    if (this.state === 'levelIntro') { this.startLevel(); return; }
    if (this.state !== 'playing') return;

    if (e.key.length !== 1) return;
    const key = e.key.toLowerCase();
    if (!/^[a-z]$/.test(key)) return;
    e.preventDefault();

    if (this.target) {
      this.tryTypeOnTarget(key);
    } else {
      this.tryAcquireTarget(key);
    }
  }

  tryAcquireTarget(key) {
    const candidates = this.words.filter((w) => !w.destroyed && !w.landed && w.text[0] === key);
    if (candidates.length === 0) return;

    candidates.sort((a, b) => (b.elapsed / b.fallMs) - (a.elapsed / a.fallMs));
    const word = candidates[0];
    word.targeted = true;
    this.target = word;
    word.typedIndex = 1;
    this.scoring.registerKeystroke(true);
    playCorrect();

    if (word.isComplete) {
      this.finishWord(word);
    } else {
      this.updateGameKeyboardHighlight();
    }
  }

  tryTypeOnTarget(key) {
    const word = this.target;
    const expected = word.text[word.typedIndex];
    if (key === expected) {
      word.typedIndex++;
      this.scoring.registerKeystroke(true);
      playCorrect();
      if (word.isComplete) {
        this.finishWord(word);
      } else {
        this.updateGameKeyboardHighlight();
      }
    } else {
      word.mistakeFlashUntil = performance.now() + 200;
      word.hadMistake = true;
      this.scoring.registerKeystroke(false);
      this.scoring.breakStreak();
      playWrong();
    }
  }

  finishWord(word) {
    this.scoring.completeWord(word.text.length, word.timeFraction, word.hadMistake);
    this.spawnParticles(word.x, word.y, '#ffd166');
    playWordDestroy();
    word.destroyed = true;
    this.target = null;
    this.updateHud();
    this.updateGameKeyboardHighlight();
  }

  // ---------- update loop ----------

  update(timestamp) {
    if (this.lastTimestamp == null) this.lastTimestamp = timestamp;
    const dt = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (this.state !== 'playing') return;

    const level = this.currentLevel;

    this.spawnTimer += dt;
    while (
      this.spawnTimer >= this.spawnIntervalMs &&
      this.spawnQueue.length > 0 &&
      this.activeWordCount() < level.maxConcurrent
    ) {
      this.spawnTimer -= this.spawnIntervalMs;
      this.spawnWord();
    }

    for (const word of this.words) {
      if (word.destroyed) continue;
      word.update(dt, this.groundY);
      if (word.landed) this.handleLanding(word);
    }
    this.words = this.words.filter((w) => !w.destroyed);

    for (const b of this.buildings) b.update(dt);

    this.particles.forEach((p) => {
      p.x += p.vx * (dt / 16);
      p.y += p.vy * (dt / 16);
      p.vy += 0.15 * (dt / 16);
      p.life -= dt;
    });
    this.particles = this.particles.filter((p) => p.life > 0);

    if (this.state === 'playing' && this.buildings.every((b) => !b.alive)) {
      this.gameOver();
      return;
    }

    if (this.state === 'playing' && this.spawnQueue.length === 0 && this.words.length === 0) {
      this.completeLevel();
    }
  }

  activeWordCount() {
    return this.words.filter((w) => !w.destroyed && !w.landed).length;
  }

  spawnWord() {
    const text = this.spawnQueue.shift();
    const x = SPAWN_MARGIN + Math.random() * (this.width - SPAWN_MARGIN * 2);
    this.words.push(new FallingWord(text, x, this.currentLevel.fallMs));
  }

  handleLanding(word) {
    word.destroyed = true;
    if (this.target === word) {
      this.target = null;
      this.updateGameKeyboardHighlight();
    }

    const alive = this.buildings.filter((b) => b.alive);
    if (alive.length === 0) return;

    const slotWidth = this.width / this.buildings.length;
    const slotIndex = Math.min(this.buildings.length - 1, Math.floor(word.x / slotWidth));
    let target = this.buildings[slotIndex];
    if (!target.alive) {
      target = alive.reduce((closest, b) => (
        Math.abs(b.x - word.x) < Math.abs(closest.x - word.x) ? b : closest
      ), alive[0]);
    }
    target.hit();
    playBuildingHit();
    this.spawnParticles(word.x, this.groundY, '#e63946', 18);
    this.scoring.breakStreak();
    this.updateHud();
  }

  spawnParticles(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      this.particles.push({
        x, y, color,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 350 + Math.random() * 250,
        maxLife: 600,
        size: 2 + Math.random() * 3,
      });
    }
  }

  // ---------- transitions ----------

  completeLevel() {
    this.state = 'levelComplete';
    playLevelUp();

    const nextIndex = this.levelIndex + 1;
    this.campaignComplete = nextIndex >= LEVELS.length;

    this.save.highestLevelUnlocked = Math.max(
      this.save.highestLevelUnlocked,
      Math.min(nextIndex + 1, LEVELS.length),
    );
    this.save.highScore = Math.max(this.save.highScore, this.scoring.total);
    saveSave(this.save);

    this.completeTitleEl.textContent = this.campaignComplete
      ? 'Campaign Complete!'
      : 'Level Complete!';
    this.btnNextLevel.textContent = this.campaignComplete ? 'Play Again' : 'Continue';

    this.completeStatsEl.innerHTML = `
      <div class="stat-row"><span>Score this level</span><strong>${this.scoring.levelScore}</strong></div>
      <div class="stat-row"><span>Total score</span><strong>${this.scoring.total}</strong></div>
      <div class="stat-row"><span>Accuracy</span><strong>${this.scoring.accuracy}%</strong></div>
      <div class="stat-row"><span>Speed</span><strong>${this.scoring.wpm} WPM</strong></div>
      <div class="stat-row"><span>Best streak</span><strong>${this.scoring.bestStreak}</strong></div>
    `;

    this.showScreen('levelComplete');
  }

  gameOver() {
    this.state = 'gameOver';
    playGameOver();

    this.save.highScore = Math.max(this.save.highScore, this.scoring.total);
    saveSave(this.save);

    this.gameoverStatsEl.innerHTML = `
      <div class="stat-row"><span>Total score</span><strong>${this.scoring.total}</strong></div>
      <div class="stat-row"><span>Reached</span><strong>Level ${this.currentLevel.id}</strong></div>
      <div class="stat-row"><span>Accuracy this level</span><strong>${this.scoring.accuracy}%</strong></div>
    `;

    this.showScreen('gameOver');
  }

  // ---------- render ----------

  render() {
    if (this.state !== 'playing') return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    for (const b of this.buildings) this.drawBuilding(b);
    for (const w of this.words) this.drawWord(w);
    for (const p of this.particles) this.drawParticle(p);
  }

  drawBuilding(b) {
    if (b.height <= 0) return;
    const ctx = this.ctx;
    const baseY = this.height - 10;
    const top = baseY - b.height;

    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, top, b.width, b.height);

    ctx.fillStyle = 'rgba(255,240,180,0.85)';
    const winSize = 8;
    const gap = 7;
    for (let wy = top + 10; wy < baseY - 10; wy += winSize + gap) {
      for (let wx = b.x + 8; wx < b.x + b.width - 8; wx += winSize + gap) {
        ctx.fillRect(wx, wy, winSize, winSize);
      }
    }
  }

  drawWord(w) {
    const ctx = this.ctx;
    const fontSize = 24;
    ctx.font = `bold ${fontSize}px 'Trebuchet MS', sans-serif`;
    const textWidth = ctx.measureText(w.text).width;
    const paddingX = 12;
    const paddingY = 8;
    const boxW = textWidth + paddingX * 2;
    const boxH = fontSize + paddingY * 2;

    const flashing = performance.now() < w.mistakeFlashUntil;
    ctx.fillStyle = flashing
      ? 'rgba(230,57,70,0.9)'
      : w.targeted ? 'rgba(42,157,143,0.9)' : 'rgba(255,255,255,0.9)';
    this.roundRect(w.x - boxW / 2, w.y - boxH / 2, boxW, boxH, 10);
    ctx.fill();

    if (w.targeted) {
      ctx.strokeStyle = '#1d3557';
      ctx.lineWidth = 2;
      this.roundRect(w.x - boxW / 2, w.y - boxH / 2, boxW, boxH, 10);
      ctx.stroke();
    }

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    let cx = w.x - textWidth / 2;
    for (let i = 0; i < w.text.length; i++) {
      const ch = w.text[i];
      ctx.fillStyle = i < w.typedIndex ? '#ffffff' : (w.targeted ? '#0d1b2a' : '#1d3557');
      ctx.fillText(ch, cx, w.y + 1);
      cx += ctx.measureText(ch).width;
    }
  }

  drawParticle(p) {
    const ctx = this.ctx;
    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  roundRect(x, y, w, h, r) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}
