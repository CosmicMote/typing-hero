// Master word bank. The pool for any given level is derived at runtime by
// filtering to words that use only that level's unlocked letters and fall
// within its length range - so this list does not need to be hand-split by
// level, it just needs to be varied enough for the filter to find matches.
export const WORD_LIST = [
  // home-row-only words (levels 1-3 depend heavily on these)
  'ah', 'as', 'ha',
  'ads', 'ash', 'dad', 'fad', 'gag', 'gal', 'had', 'has', 'jag', 'lad', 'sad', 'sag', 'gas', 'lag',
  'alas', 'dads', 'dash', 'fads', 'flag', 'gags', 'gala', 'gash', 'glad', 'hags', 'half', 'hall',
  'jags', 'lags', 'lash', 'sags',
  'salad', 'shall', 'flask', 'glass',
  'salads', 'flasks',

  // short general words
  'ant', 'arm', 'art', 'bag', 'bat', 'bed', 'big', 'bit', 'box', 'boy', 'bug', 'bus', 'but',
  'cap', 'car', 'cat', 'cow', 'cry', 'cup', 'cut', 'day', 'dog', 'dry', 'ear', 'eat', 'egg',
  'end', 'eye', 'fan', 'far', 'fat', 'fit', 'fly', 'fog', 'fox', 'fun', 'gym', 'hat', 'hen',
  'hip', 'hot', 'ice', 'ink', 'jar', 'jaw', 'jet', 'job', 'joy', 'jug', 'key', 'kid', 'lap',
  'law', 'leg', 'let', 'lip', 'log', 'low', 'man', 'map', 'mix', 'mud', 'mug', 'net', 'new',
  'nut', 'oak', 'off', 'oil', 'owl', 'pen', 'pet', 'pig', 'pin', 'pop', 'rat', 'red', 'rib',
  'rig', 'rip', 'run', 'saw', 'sea', 'set', 'sit', 'six', 'sky', 'sly', 'sun', 'tag', 'tan',
  'tap', 'tea', 'ten', 'the', 'tie', 'tip', 'top', 'toy', 'try', 'van', 'war', 'wet', 'why',
  'win', 'wit', 'yes', 'zip', 'zoo',

  // 4-6 letter words
  'able', 'area', 'aunt', 'back', 'bake', 'ball', 'band', 'bank', 'bath', 'bear', 'beat',
  'bell', 'belt', 'bend', 'best', 'bike', 'bird', 'blue', 'boat', 'body', 'boil', 'bold',
  'bolt', 'bone', 'book', 'boot', 'born', 'boss', 'bowl', 'calm', 'camp', 'card', 'care',
  'cart', 'cash', 'cave', 'chat', 'chip', 'city', 'clap', 'claw', 'clay', 'club', 'clue',
  'coal', 'coat', 'code', 'coin', 'cold', 'cook', 'cool', 'cork', 'corn', 'cost', 'crab',
  'crop', 'cube', 'cure', 'curl', 'dark', 'dawn', 'deal', 'dear', 'deep', 'deer', 'desk',
  'dial', 'dice', 'dirt', 'dish', 'dive', 'dock', 'doll', 'door', 'dove', 'draw', 'drop',
  'drum', 'dust', 'duty', 'each', 'earn', 'easy', 'echo', 'edge', 'epic', 'even', 'ever',
  'exit', 'face', 'fact', 'fade', 'fail', 'fair', 'fall', 'farm', 'fast', 'fear', 'feed',
  'feel', 'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'fish', 'fist', 'five',
  'flat', 'flow', 'foam', 'fold', 'folk', 'food', 'fool', 'foot', 'form', 'fort', 'four',
  'free', 'frog', 'fuel', 'full', 'fund', 'gain', 'game', 'gate', 'gaze', 'gear', 'gift',
  'girl', 'glow', 'glue', 'goal', 'goat', 'gold', 'golf', 'good', 'gown', 'grab', 'gray',
  'grew', 'grey', 'grid', 'grim', 'grip', 'grow', 'gulf', 'gulp', 'hair', 'halt', 'hand',
  'hang', 'hard', 'harm', 'hate', 'have', 'hawk', 'haze', 'head', 'heal', 'heap', 'hear',
  'heat', 'heel', 'help', 'herb', 'herd', 'here', 'hero', 'hide', 'high', 'hill', 'hint',
  'hire', 'hold', 'hole', 'holy', 'home', 'hood', 'hoof', 'hook', 'hope', 'horn', 'hose',
  'host', 'hour', 'huge', 'hull', 'hunt', 'hurt', 'icon', 'idea', 'idle', 'inch', 'iron',
  'item', 'jail', 'join', 'joke', 'jolt', 'jump', 'jury', 'just', 'keep', 'kick', 'kind',
  'king', 'kiss', 'kite', 'knee', 'knot', 'lace', 'lack', 'lady', 'lake', 'lamb', 'lamp',
  'land', 'lane', 'last', 'late', 'lawn', 'lead', 'leaf', 'lean', 'leap', 'left', 'lend',
  'less', 'life', 'lift', 'like', 'limb', 'lime', 'line', 'link', 'lion', 'list', 'live',
  'load', 'loaf', 'loan', 'lock', 'loft', 'logo', 'lone', 'long', 'look', 'loop', 'lord',
  'lose', 'loss', 'lost', 'loud', 'love', 'luck', 'lump', 'lung', 'made', 'mail', 'main',
  'make', 'male', 'mall', 'many', 'mark', 'mask', 'mass', 'mast', 'meal', 'mean', 'meat',
  'meet', 'melt', 'mend', 'mild', 'mile', 'milk', 'mill', 'mind', 'mine', 'mint', 'miss',
  'mist', 'mode', 'mold', 'mole', 'mood', 'moon', 'more', 'moss', 'most', 'moth', 'move',
  'much', 'mule', 'must', 'myth', 'nail', 'name', 'navy', 'near', 'neat', 'neck', 'need',
  'nest', 'news', 'next', 'nice', 'nine', 'node', 'none', 'noon', 'nose', 'note', 'oath',
  'obey', 'odor', 'okay', 'once', 'only', 'open', 'oral', 'over', 'pace', 'pack', 'page',
  'pain', 'pair', 'pale', 'palm', 'park', 'part', 'pass', 'past', 'path', 'pave', 'peak',
  'pear', 'peel', 'peer', 'pest', 'pick', 'pier', 'pile', 'pill', 'pine', 'pink', 'pipe',
  'plan', 'play', 'plot', 'plow', 'plug', 'plum', 'plus', 'poem', 'poet', 'pole', 'pond',
  'pool', 'poor', 'pork', 'port', 'pose', 'post', 'pour', 'pray', 'prep', 'prey', 'pull',
  'pulp', 'pump', 'pure', 'push', 'race', 'rack', 'rage', 'raid', 'rail', 'rain', 'rank',
  'rare', 'rash', 'rate', 'read', 'real', 'reef', 'reel', 'rely', 'rent', 'rest', 'rice',
  'rich', 'ride', 'ring', 'ripe', 'rise', 'risk', 'road', 'roam', 'roar', 'robe', 'rock',
  'rode', 'role', 'roll', 'roof', 'room', 'root', 'rope', 'rose', 'rude', 'ruin', 'rule',
  'rush', 'rust', 'sack', 'safe', 'sail', 'salt', 'same', 'sand', 'sane', 'save', 'scan',
  'seal', 'seam', 'seat', 'seed', 'seek', 'seem', 'seen', 'self', 'sell', 'send', 'sent',
  'ship', 'shoe', 'shop', 'shot', 'show', 'shut', 'sick', 'side', 'sign', 'silk', 'sing',
  'sink', 'site', 'size', 'skin', 'skip', 'slam', 'slap', 'slid', 'slip', 'slot', 'slow',
  'snap', 'snow', 'soak', 'soap', 'sock', 'sofa', 'soft', 'soil', 'sold', 'sole', 'some',
  'song', 'soon', 'sore', 'sort', 'soul', 'soup', 'sour', 'spin', 'spit', 'spot', 'spun',
  'spur', 'star', 'stay', 'stem', 'step', 'stew', 'stir', 'stop', 'such', 'suit', 'sung',
  'sure', 'swam', 'swan', 'swap', 'swim', 'tack', 'tail', 'take', 'tale', 'talk', 'tall',
  'tank', 'tape', 'task', 'team', 'tear', 'tell', 'tend', 'tent', 'term', 'test', 'text',
  'than', 'that', 'them', 'then', 'they', 'thin', 'this', 'thus', 'tide', 'tidy', 'tile',
  'till', 'time', 'tint', 'tiny', 'tire', 'toad', 'told', 'toll', 'tone', 'took', 'tool',
  'tour', 'town', 'trap', 'tray', 'tree', 'trim', 'trip', 'true', 'tube', 'tune', 'turn',
  'twin', 'ugly', 'unit', 'upon', 'urge', 'used', 'user', 'vain', 'vase', 'vast', 'veil',
  'vein', 'verb', 'very', 'vest', 'view', 'vine', 'void', 'vote', 'wage', 'wait', 'wake',
  'walk', 'wall', 'want', 'ward', 'warm', 'warn', 'wash', 'wave', 'weak', 'wear', 'week',
  'well', 'went', 'west', 'what', 'when', 'whip', 'wide', 'wife', 'wild', 'will', 'wind',
  'wine', 'wing', 'wipe', 'wire', 'wise', 'wish', 'with', 'wolf', 'wood', 'wool', 'word',
  'wore', 'work', 'worm', 'worn', 'wrap', 'yard', 'yarn', 'yawn', 'year', 'yell', 'your',
  'zero', 'zone',

  // longer words (7-10 letters, for later levels)
  'greasy', 'guitar', 'history', 'outside', 'letter', 'garage', 'seagull', 'flowers',
  'father', 'sister', 'wiggle', 'juggle', 'giraffe', 'settle', 'kettle', 'riddle', 'puddle',
  'turtle', 'little', 'purple', 'yellow', 'orange', 'potato', 'quiet', 'delight', 'outrage',
  'grateful', 'argue', 'quarter', 'attitude', 'hesitate', 'yesterday', 'straight',
  'surgery', 'outfit', 'assist', 'steady', 'greater', 'thunder', 'monster', 'blanket',
  'chicken', 'kitchen', 'morning', 'evening', 'weekend', 'holiday', 'journey', 'diamond',
  'mountain', 'building', 'elephant', 'dinosaur', 'sandwich', 'umbrella', 'triangle',
  'calendar', 'notebook', 'backpack', 'sunshine', 'rainbow', 'thousand', 'strength',
  'champion', 'treasure', 'universe', 'exercise', 'favorite', 'birthday', 'vacation',
];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function wordsForLevel(level) {
  if (level.mode === 'letters') {
    const letters = level.letterKeys.split('');
    const pool = [];
    while (pool.length < level.wordCount) {
      pool.push(...shuffle([...letters]));
    }
    return pool.slice(0, level.wordCount);
  }

  const allowed = new Set(level.letterKeys.split(''));
  const candidates = WORD_LIST.filter((w) => (
    w.length >= level.minLen &&
    w.length <= level.maxLen &&
    [...w].every((ch) => allowed.has(ch))
  ));

  if (candidates.length === 0) {
    throw new Error(`No words available for level ${level.id}`);
  }

  const shuffled = shuffle([...candidates]);
  const picks = [];
  let i = 0;
  while (picks.length < level.wordCount) {
    if (i > 0 && i % shuffled.length === 0) shuffle(shuffled);
    picks.push(shuffled[i % shuffled.length]);
    i++;
  }
  return picks;
}
