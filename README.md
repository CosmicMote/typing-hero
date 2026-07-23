# Typing Hero

A browser game that teaches touch typing from scratch. Words fall out of a
blue sky toward a skyline of buildings — type a word before it lands to
destroy it, or it destroys a building. Lose all the buildings and the game
ends.

The game assumes zero prior typing skill. It starts with single home-row
letters falling slowly and, over 16 levels, gradually unlocks the rest of
the keyboard in small groups while words get longer and fall faster.

## Features

- **16-level curriculum** that introduces keys in small groups (home row →
  easy reaches → rest of the top row → bottom row), each new-key level
  holding word length/speed/difficulty steady so only the keyboard changes.
- **Color-coded finger-guide keyboard** docked under the play area, showing
  which finger belongs on which key and pulsing the next key you need.
- **Scoring** based on word length, typing speed, and a combo streak.
- **Progress saved locally** (highest level reached, high score, mute
  setting) so a player can pick up where they left off.
- Plain HTML/CSS/JS — no build step, no dependencies, no backend.

## Project structure

```
index.html          Screens (title, level intro, game, level complete, game over)
css/style.css        Styling, sky/keyboard visuals
js/
  main.js            Boot + game loop
  game.js             Game state machine, input handling, rendering
  levels.js           The 16-level difficulty curve
  words.js            Word bank + per-level word selection
  fallingWord.js      Falling word model
  building.js         Building model
  scoring.js          Score/streak/accuracy/WPM calculation
  keyboard.js          On-screen finger-guide keyboard
  audio.js             WebAudio sound effects
  storage.js            localStorage save/load
```

## Running locally (no Docker)

It's a static site, so any static file server works:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly in a
browser also works.

## Running with Docker

### Build the image

```bash
docker build -t typing-hero .
```

### Run a container

```bash
docker run -d --restart unless-stopped -p 8080:80 --name typing-hero typing-hero
```

Then open `http://localhost:8080`.

### Stop and remove the container

```bash
docker stop typing-hero
docker rm typing-hero
```
