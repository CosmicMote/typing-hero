// Adaptive difficulty: nudges level pace based on how the previous level
// went, so a level that was barely survived doesn't hand the player the
// same fixed jump in fall speed as one that was aced. The letter curriculum
// in levels.js (which keys are unlocked when) is never touched by this -
// only the fall-speed knob flexes.

export const MIN_FACTOR = 0.75;
export const MAX_FACTOR = 1.3;

// How much one level's result moves the stored factor. Kept low so a single
// unusually good/bad level nudges the pace rather than whiplashing it -
// difficulty drifts with a trend across several levels instead.
const SMOOTHING = 0.3;

// The performanceScore (see below) that should leave difficulty unchanged.
// Below it the next level gets gentler; above it, harder.
const BASELINE_SCORE = 0.7;

// Lives remaining is the more direct "how close to failing" signal - a
// level can be aced on accuracy while still nearly wiping out the
// buildings because the player was too slow - so it's weighted higher.
const LIVES_WEIGHT = 0.6;
const ACCURACY_WEIGHT = 0.4;

export function performanceScore(accuracyPct, livesFraction) {
  return LIVES_WEIGHT * livesFraction + ACCURACY_WEIGHT * (accuracyPct / 100);
}

function targetFactor(score) {
  if (score >= BASELINE_SCORE) {
    const t = (score - BASELINE_SCORE) / (1 - BASELINE_SCORE);
    return 1 + t * (MAX_FACTOR - 1);
  }
  const t = (BASELINE_SCORE - score) / BASELINE_SCORE;
  return 1 - t * (1 - MIN_FACTOR);
}

export function nextDifficultyFactor(currentFactor, accuracyPct, livesFraction) {
  const target = targetFactor(performanceScore(accuracyPct, livesFraction));
  const next = currentFactor + (target - currentFactor) * SMOOTHING;
  return Math.min(MAX_FACTOR, Math.max(MIN_FACTOR, next));
}

export function effectiveFallMs(baseFallMs, difficultyFactor) {
  return baseFallMs / difficultyFactor;
}
