import { MIN_FACTOR, MAX_FACTOR } from './difficulty.js';

const STORAGE_KEY = 'typingHeroSave';

const DEFAULT_SAVE = {
  highestLevelUnlocked: 1,
  highScore: 0,
  muted: false,
  difficultyFactor: 1,
};

export function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SAVE };
    return sanitize({ ...DEFAULT_SAVE, ...JSON.parse(raw) });
  } catch {
    return { ...DEFAULT_SAVE };
  }
}

// localStorage is state outside our control - a browser extension, manual
// editing in devtools, or a future save-format change could all leave it
// holding something other than a valid level number, so it's sanitized here
// rather than trusted by the code that consumes it.
function sanitize(save) {
  const highestLevelUnlocked = Number.isInteger(save.highestLevelUnlocked) && save.highestLevelUnlocked >= 1
    ? save.highestLevelUnlocked
    : DEFAULT_SAVE.highestLevelUnlocked;
  const highScore = Number.isFinite(save.highScore) && save.highScore >= 0
    ? save.highScore
    : DEFAULT_SAVE.highScore;
  const muted = typeof save.muted === 'boolean' ? save.muted : DEFAULT_SAVE.muted;
  const difficultyFactor = Number.isFinite(save.difficultyFactor)
    && save.difficultyFactor >= MIN_FACTOR && save.difficultyFactor <= MAX_FACTOR
    ? save.difficultyFactor
    : DEFAULT_SAVE.difficultyFactor;
  return { highestLevelUnlocked, highScore, muted, difficultyFactor };
}

export function saveSave(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private browsing, etc.) - progress just won't persist
  }
}
