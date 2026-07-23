let idCounter = 0;

export class FallingWord {
  constructor(text, x, fallMs) {
    this.id = ++idCounter;
    this.text = text;
    this.x = x;
    this.y = -30;
    this.typedIndex = 0;
    this.fallMs = fallMs;
    this.elapsed = 0;
    this.targeted = false;
    this.landed = false;
    this.destroyed = false;
    this.hadMistake = false;
    this.mistakeFlashUntil = 0;
  }

  update(dt, groundY) {
    this.elapsed += dt;
    const progress = Math.min(this.elapsed / this.fallMs, 1);
    this.y = -30 + progress * (groundY + 30);
    if (progress >= 1) {
      this.landed = true;
    }
  }

  get isComplete() {
    return this.typedIndex >= this.text.length;
  }

  get timeFraction() {
    return Math.max(0, 1 - this.elapsed / this.fallMs);
  }
}
