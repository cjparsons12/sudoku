# Sudoku

A mobile-first Sudoku game in a single, self-contained HTML file. No build step, no dependencies, no tracking.

## Play

Open `index.html` in any modern browser, or host the folder on any static site host (GitHub Pages, Netlify, Vercel, etc.).

## Install on your phone

This is a **progressive web app (PWA)**. Host the folder over HTTPS, open it on your phone, then use the browser's **Add to Home Screen** / **Install app** action. You get a real app icon, a fullscreen window, and offline play after the first load.

For this repo, the easiest route is GitHub Pages:

1. Push `main` to GitHub, then go to **Settings → Pages → Build and deployment**.
2. Set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
3. Open `https://cjparsons12.github.io/sudoku/` on your phone.
4. Install it:
   - **iPhone/iPad (Safari):** Share button → **Add to Home Screen**.
   - **Android (Chrome):** ⋮ menu → **Install app** (or **Add to Home screen**).

Any static HTTPS host works the same way (Netlify, Vercel, Cloudflare Pages). Service workers require HTTPS: opening the local `file://` copy, or serving it over plain HTTP on your LAN, lets you play but won't make it installable or available offline. To try it locally first, run `python3 -m http.server 8000` and visit `http://localhost:8000` on that machine.

The installability pieces are `manifest.webmanifest`, `sw.js`, and the `icon-*.png` files; `index.html` links the manifest and registers the service worker.

## Features

- Randomly generated puzzles with a guaranteed unique solution
- Easy, Medium, Hard, and Expert difficulties
- Responsive layout designed for phones and tablets, with a landscape layout
- Dark and light themes
- Selecting a filled cell highlights every matching number, plus its row, column, and 3×3 box
- Separate **Enter** and **Notes** number pads
- Entry-pad digits gray out once all nine of that number are correctly placed
- Mistake checking with a mistake counter
- Timer
- Undo, erase, and hint actions
- Automatic save and resume using `localStorage`
- Keyboard support:
  - Arrow keys move the selection
  - `1`–`9` enter a number
  - `Shift` + `1`–`9` toggle a pencil note
  - `Backspace` / `Delete` erase
  - `U` undo
  - `H` hint

## Notes

The puzzle generator creates a completed grid with randomized backtracking, then removes cells while verifying that the puzzle still has exactly one solution. Puzzles are saved locally in the browser between visits.
