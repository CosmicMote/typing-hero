import { Game } from './game.js';

const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);

function loop(timestamp) {
  game.update(timestamp);
  game.render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
