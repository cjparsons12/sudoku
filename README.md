# Sudoku

A mobile-first Sudoku game in a single, self-contained HTML file. No build step, no dependencies, no tracking.

## Play

Open `index.html` in any modern browser, or host the folder on any static site host (GitHub Pages, Netlify, Vercel, etc.).

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
