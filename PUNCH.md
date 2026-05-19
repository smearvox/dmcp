# DoomCaptcha Punchlist

## New Challenge Types

- [x] **Patience Test** — Hold button for exactly 5.00s. Target secretly shifts each attempt. Always off by milliseconds.
- [x] **Color Match** — Stroop effect: color name in wrong ink color + swatches. Whichever interpretation you pick, the other was "correct."
- [x] **Audio Transcription** — Two overlapping words via speech synthesis, type what you hear. Whatever you type, the other word was correct.
- [x] **Terms of Service** — Scrollable legalese wall, "I Agree" disabled until you scroll to bottom. Last 20px is unreachable via scroll-snap trick. Button never enables. 30s timer.
- [x] **Jigsaw Piece** — 4x4 color grid with missing piece, 4 candidates all subtly wrong (rotated 2deg, shifted 1px, brightness +3%). Fails with sub-pixel alignment error message.
- [x] **Typing Speed** — Type a sentence in 10s where l/I/1 are visually identical in monospace. Typo = instant fail. Correct = "typing pattern indicates automated input."
