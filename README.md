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
| `bigger-number` | Numerical Reasoning |
| `cursed-sms` | SMS Verification |
| `phantom-word` | Text Recognition |
| `always-wrong-riddles` | Knowledge Verification |

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
