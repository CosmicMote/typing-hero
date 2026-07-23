const ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
];

const FINGER = {
  q: 'pinky', a: 'pinky', z: 'pinky',
  w: 'ring', s: 'ring', x: 'ring',
  e: 'middle', d: 'middle', c: 'middle',
  r: 'index', f: 'index', v: 'index', t: 'index', g: 'index', b: 'index',
  y: 'index', h: 'index', n: 'index', u: 'index', j: 'index', m: 'index',
  i: 'middle', k: 'middle', ',': 'middle',
  o: 'ring', l: 'ring', '.': 'ring',
  p: 'pinky', ';': 'pinky', '/': 'pinky',
};

export function buildKeyboard(container) {
  container.innerHTML = '';
  ROWS.forEach((row, i) => {
    const rowEl = document.createElement('div');
    rowEl.className = `kb-row kb-row-${i}`;
    row.forEach((key) => {
      const keyEl = document.createElement('div');
      keyEl.className = `kb-key finger-${FINGER[key]}`;
      keyEl.dataset.key = key;
      keyEl.textContent = key;
      rowEl.appendChild(keyEl);
    });
    container.appendChild(rowEl);
  });
}

export function updateKeyboard(container, { unlocked = [], newKeys = [], nextKey = null } = {}) {
  const unlockedSet = new Set(unlocked);
  const newSet = new Set(newKeys);
  container.querySelectorAll('.kb-key').forEach((el) => {
    const key = el.dataset.key;
    el.classList.toggle('locked', !unlockedSet.has(key));
    el.classList.toggle('new-key', newSet.has(key));
    el.classList.toggle('active-target', key === nextKey);
  });
}
