export const HOME_KEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const STAGE_1 = ['e', 'i', 'r', 'u'];       // easy index/middle reaches
const STAGE_2 = ['t', 'y', 'w'];             // more index + one ring reach
const STAGE_3 = ['o', 'q', 'p'];             // ring + pinky reaches - completes top row
const STAGE_4 = ['v', 'b', 'n', 'm'];        // easy index-finger bottom-row keys
const STAGE_5 = ['z', 'x', 'c'];             // pinky/ring/middle - completes the alphabet

function cum(...groups) {
  return groups.flat();
}

// Difficulty ramps on one axis at a time wherever possible: a level that
// introduces new keys holds word length / fall speed / concurrent words
// steady so the only new challenge is finding the keys; a level that adds
// length, speed, or a new concurrent word keeps the key set unchanged.
export const LEVELS = [
  {
    id: 1, mode: 'letters',
    letterKeys: cum(HOME_KEYS).join(''), newKeys: [...HOME_KEYS],
    minLen: 1, maxLen: 1, fallMs: 9000, maxConcurrent: 1, wordCount: 14,
  },
  {
    id: 2,
    letterKeys: cum(HOME_KEYS).join(''), newKeys: [],
    minLen: 2, maxLen: 4, fallMs: 8600, maxConcurrent: 1, wordCount: 12,
  },
  {
    id: 3,
    letterKeys: cum(HOME_KEYS).join(''), newKeys: [],
    minLen: 3, maxLen: 5, fallMs: 8200, maxConcurrent: 1, wordCount: 14,
  },
  {
    id: 4,
    letterKeys: cum(HOME_KEYS).join(''), newKeys: [],
    minLen: 3, maxLen: 5, fallMs: 8000, maxConcurrent: 2, wordCount: 16,
  },
  {
    id: 5,
    letterKeys: cum(HOME_KEYS, STAGE_1).join(''), newKeys: [...STAGE_1],
    minLen: 3, maxLen: 5, fallMs: 8000, maxConcurrent: 2, wordCount: 16,
  },
  {
    id: 6,
    letterKeys: cum(HOME_KEYS, STAGE_1).join(''), newKeys: [],
    minLen: 4, maxLen: 6, fallMs: 7600, maxConcurrent: 2, wordCount: 16,
  },
  {
    id: 7,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2).join(''), newKeys: [...STAGE_2],
    minLen: 4, maxLen: 6, fallMs: 7600, maxConcurrent: 2, wordCount: 18,
  },
  {
    id: 8,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2).join(''), newKeys: [],
    minLen: 5, maxLen: 7, fallMs: 7200, maxConcurrent: 2, wordCount: 18,
  },
  {
    id: 9,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2, STAGE_3).join(''), newKeys: [...STAGE_3],
    minLen: 5, maxLen: 7, fallMs: 7200, maxConcurrent: 2, wordCount: 18,
  },
  {
    id: 10,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2, STAGE_3).join(''), newKeys: [],
    minLen: 5, maxLen: 7, fallMs: 6800, maxConcurrent: 3, wordCount: 18,
  },
  {
    id: 11,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2, STAGE_3, STAGE_4).join(''), newKeys: [...STAGE_4],
    minLen: 5, maxLen: 7, fallMs: 6800, maxConcurrent: 3, wordCount: 20,
  },
  {
    id: 12,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2, STAGE_3, STAGE_4).join(''), newKeys: [],
    minLen: 5, maxLen: 8, fallMs: 6400, maxConcurrent: 3, wordCount: 20,
  },
  {
    id: 13,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2, STAGE_3, STAGE_4, STAGE_5).join(''), newKeys: [...STAGE_5],
    minLen: 5, maxLen: 8, fallMs: 6400, maxConcurrent: 3, wordCount: 20,
  },
  {
    id: 14,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2, STAGE_3, STAGE_4, STAGE_5).join(''), newKeys: [],
    minLen: 6, maxLen: 8, fallMs: 6000, maxConcurrent: 3, wordCount: 20,
  },
  {
    id: 15,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2, STAGE_3, STAGE_4, STAGE_5).join(''), newKeys: [],
    minLen: 6, maxLen: 9, fallMs: 5500, maxConcurrent: 3, wordCount: 22,
  },
  {
    id: 16,
    letterKeys: cum(HOME_KEYS, STAGE_1, STAGE_2, STAGE_3, STAGE_4, STAGE_5).join(''), newKeys: [],
    minLen: 7, maxLen: 10, fallMs: 5200, maxConcurrent: 4, wordCount: 22,
  },
];
