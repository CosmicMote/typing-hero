export class Building {
  constructor(x, width, baseHeight, color) {
    this.x = x;
    this.width = width;
    this.baseHeight = baseHeight;
    this.height = baseHeight;
    this.color = color;
    this.alive = true;
    this.destroying = false;
    this.destroyProgress = 0;
  }

  hit() {
    if (!this.alive || this.destroying) return;
    this.destroying = true;
  }

  update(dt) {
    if (this.destroying && this.destroyProgress < 1) {
      this.destroyProgress = Math.min(1, this.destroyProgress + dt / 500);
      this.height = this.baseHeight * (1 - this.destroyProgress);
      if (this.destroyProgress >= 1) {
        this.alive = false;
        this.destroying = false;
      }
    }
  }
}

export function createBuildings(width, count) {
  const margin = 20;
  const usable = width - margin * 2;
  const slotWidth = usable / count;
  const palette = ['#5b6b8c', '#6d5b8c', '#4f7d7d', '#7d5b5b', '#5b7d5f', '#7d6f4f'];
  const buildings = [];
  for (let i = 0; i < count; i++) {
    const bw = slotWidth * 0.7;
    const bx = margin + i * slotWidth + (slotWidth - bw) / 2;
    const bh = 100 + Math.random() * 80;
    buildings.push(new Building(bx, bw, bh, palette[i % palette.length]));
  }
  return buildings;
}
