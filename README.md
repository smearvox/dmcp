# DoomCaptcha

Human verification that verifies nothing.

DoomCaptcha is a client-side captcha framework that generates challenges which are either impossible to pass or infuriatingly annoying. It's designed for **scambaiters** to embed in mock sites during scambaiting sessions, wasting scammers' time with an endless gauntlet of rigged verification.

Zero dependencies. No build step. One script tag.

## Quick Start

```html
<div id="captcha"></div>
<script src="doom-captcha.js"></script>
<script>
  DoomCaptcha.init("#captcha");
</script>
```

Open `index.html` in any browser to see the demo — a fake bank login page with DoomCaptcha embedded.

## How It Works

The engine shuffles through challenge types randomly. Every challenge is rigged:

- **Pass a challenge?** "Additional verification required..." and you get another one.
- **Fail a challenge?** You get another one.
- **Confidence Score** fills up with an inverse-exponential curve (never reaches 100%) and randomly drops 5-15% after "successful" challenges.

There is no way out.

## Challenge Types

### Impossible Math
Solve 847 x 293 in your head. You have 3 seconds.

### Pixel Hunt
Find and click a 3-pixel checkbox hidden among dozens of near-identical decoys. Three rounds, and the checkbox shrinks each time.

### Endless Grid
"Select all squares with traffic lights." A 10-second timer, 3 broken image markers, and every 2 seconds four random cells reshuffle. Clicking Verify triggers one final reshuffle before evaluating your now-invalid selection.

### Rebellious Slider
Drag the slider to the target zone. Randomly picks from three broken-UI modes:
- **Offset**: Slider position is displaced 40-120px from your cursor, and the offset randomly resets.
- **Asymptote**: Sensitivity skyrockets as you approach the target — tiny movements send the slider flying.
- **Hyperspeed**: 4-8x mouse sensitivity at all times. Good luck.

### Identity Gauntlet
Rapid-fire pairs of buttons: "I'm not a robot" / "I'm not not a robot" / "I'm not not not a robot." Timer starts at 2.8s and drops each round. Wrong click: "Non-Human User Confirmed!"

### Bigger Number
Two numbers side by side. The smaller number is displayed at 3x the font size. "Click the bigger number." Click the visually bigger one: wrong, it's numerically smaller. Click the numerically bigger one: wrong, it was visually smaller. There is no correct answer.

### Cursed SMS
Enter your phone number — but every time you type an odd digit, the cursor jumps left, scrambling your input. After "sending" a code, three digits in the displayed number are quietly altered. You then get 30 seconds to enter a 6-digit code that was never sent to a number you don't recognize.

### Phantom Word (Canvas OCR)
A canvas renders overlapping text layers — one prominent bait word and five faded background words, all buried in noise and scanlines. Type the obvious word, and a background word lights up as the "correct" answer. Type *that* word, and a different background word becomes correct.

### Always-Wrong Riddles
Multiple choice riddles where every answer is defensibly correct: "How many sides does a circle have?" (0, 1, 2, or infinite). No matter which you pick, a different answer highlights green with a condescending explanation and a fake "Analyzing response..." spinner.

### Typing Speed
Type a sentence in 10 seconds. The font renders l, I, and 1 as visually identical glyphs. One typo = instant fail. Get it right = "Typing pattern indicates automated input. Verification failed."

### Jigsaw Piece
A 4x4 color grid with a missing piece. Four candidate pieces are offered — all subtly wrong (rotated 2°, shifted 1px, brightness off by 3%). Whichever you pick fails with a sub-pixel alignment error.

### Terms of Service
A scrollable wall of legalese with "I Agree" disabled until you scroll to the bottom. The last 20px is unreachable — a CSS scroll-snap trick silently bounces you back. The button never enables. 30-second timer.

### Audio Transcription
Two overlapping words played simultaneously via Web Audio API formant synthesis. Type what you hear. Whatever you type, the other word was "correct."

### Color Match
The Stroop effect weaponized: a color name displayed in the wrong ink color, with color swatches to choose from. Whichever interpretation you pick (word or ink), the other was "correct."

### Patience Test
Hold a button for exactly 5.00 seconds. The secret target shifts slightly each attempt. You're always off by milliseconds.

### Sudoku Trap
A 6×6 Sudoku puzzle with a 60-second timer. The instant you fill in any cell — even correctly — it flashes red: "Incorrect value entered."

### Accessibility Audio
An audio captcha alternative: six DTMF digit tones buried in heavy static, played once. "Replay" plays the same static but with 2 digits quietly swapped. Each replay drifts further from the original. There is no stable answer.

### Draw the Line
"Draw a straight line from A to B to prove you're human." The canvas slowly rotates while you draw, warping your straight stroke into a curve. Draw fast: "Tremor detected." Draw slow: "Unnaturally consistent velocity." Nail the line: deviation inflated past the threshold anyway.

### Confidence Checkbox
The classic "I'm not a robot" checkbox. Click it too fast: "Bot-like response time (0.3s)." Click it after hesitating: "Irregular delay suggests scripted wait()." The acceptable window is 40ms wide and shifts randomly. Even if you hit it, "Click coordinates match known automation framework."

### Rotate to Upright
Drag-rotate a rotationally ambiguous image (starfish, mandala, pinwheel, snowflake, etc.) to its "correct" orientation. Whatever angle you submit, it snaps nearby: "Almost! Off by 3° clockwise." No correct angle exists.

### Semantic Minefield
"Select all squares containing food." A 3×3 grid mixes obvious food, obvious non-food, and edge cases (tomato plant, empty plate, dog food bowl, ornamental gourds, wax fruit). On submit, the ambiguous items are flipped against your selection.

### Face Direction
"Click the face looking directly at the camera." A 3×3 grid of portrait headshots, all gazing 1–3° off center. Click any face, and a different one highlights as "more direct" with angular measurements to two decimal places.

## Configuration

```js
DoomCaptcha.init("#container", {
  theme: "dark",           // currently the only theme
  challenges: "all",       // or an array of IDs:
  // challenges: ["impossible-math", "bigger-number", "cursed-sms"],
});
```

### Challenge IDs

| ID | Challenge |
|----|-----------|
| `impossible-math` | Quick Math Verification |
| `pixel-hunt` | Visual Acuity Test |
| `endless-grid` | Image Verification |
| `rebellious-slider` | Slide to Verify |
| `identity-gauntlet` | Identity Verification |
| `typing-speed` | Typing Verification |
| `jigsaw-piece` | Visual Pattern Matching |
| `terms-of-service` | Terms of Service |
| `audio-transcription` | Audio Verification |
| `color-match` | Color Verification |
| `patience-test` | Timing Verification |
| `sudoku-trap` | Sudoku Verification |
| `bigger-number` | Numerical Reasoning |
| `cursed-sms` | SMS Verification |
| `phantom-word` | Text Recognition |
| `always-wrong-riddles` | Knowledge Verification |
| `accessibility-audio` | Accessibility Audio Verification |
| `draw-the-line` | Motor Precision Test |
| `confidence-checkbox` | One-Click Verification |
| `rotate-to-upright` | Orientation Verification |
| `semantic-minefield` | Image Classification |
| `face-direction` | Gaze Detection |

## Custom Challenges

```js
function MyChallenge(container, callbacks) {
  this.container = container;
  this.callbacks = callbacks;
}
MyChallenge.id = "my-challenge";

MyChallenge.prototype.render = function () {
  // Build your UI in this.container
  // Call this.callbacks.onPass() or this.callbacks.onFail("message")
  // (onPass just triggers "additional verification required")
};

DoomCaptcha.register(MyChallenge);
```

## License

GPL-3.0 — see [LICENSE](LICENSE).
