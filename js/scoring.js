export class Scoring {
  constructor() {
    this.total = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.startLevel();
  }

  startLevel() {
    this.levelWordsTyped = 0;
    this.levelCorrect = 0;
    this.levelTotalKeys = 0;
    this.levelStart = performance.now();
    this.levelScore = 0;
  }

  resetAll() {
    this.total = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.startLevel();
  }

  registerKeystroke(correct) {
    this.levelTotalKeys++;
    if (correct) this.levelCorrect++;
  }

  breakStreak() {
    this.streak = 0;
  }

  completeWord(length, timeFraction, hadMistake) {
    const base = length * 10;
    const speedBonus = hadMistake ? 0 : Math.round(length * 5 * timeFraction);
    const multiplier = 1 + Math.min(this.streak, 10) * 0.1;
    const points = Math.round((base + speedBonus) * multiplier);

    this.total += points;
    this.levelScore += points;
    this.levelWordsTyped++;

    if (hadMistake) {
      this.streak = 0;
    } else {
      this.streak++;
      this.bestStreak = Math.max(this.bestStreak, this.streak);
    }

    return points;
  }

  get accuracy() {
    if (this.levelTotalKeys === 0) return 100;
    return Math.round((this.levelCorrect / this.levelTotalKeys) * 100);
  }

  get wpm() {
    const minutes = (performance.now() - this.levelStart) / 60000;
    if (minutes <= 0 || this.levelWordsTyped === 0) return 0;
    return Math.round(this.levelWordsTyped / minutes);
  }
}
