(function () {
  "use strict";

  // ── Styles ──────────────────────────────────────────────────────────
  var CSS = '\
.doom-overlay {\
  position: fixed;\
  top: 0;\
  left: 0;\
  width: 100%;\
  height: 100%;\
  background: rgba(0,0,0,0.5);\
  z-index: 99999;\
  display: flex;\
  align-items: center;\
  justify-content: center;\
}\
.doom-captcha {\
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\
  max-width: 420px;\
  width: 100%;\
  user-select: none;\
  -webkit-user-select: none;\
  z-index: 100000;\
}\
.doom-shell {\
  border: 2px solid #303050;\
  border-radius: 8px;\
  overflow: hidden;\
  background: #1a1a2e;\
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);\
}\
.doom-header {\
  background: #16213e;\
  padding: 16px 20px;\
  border-bottom: 1px solid #303050;\
}\
.doom-title {\
  font-size: 16px;\
  font-weight: 600;\
  color: #e0e0e0;\
  display: flex;\
  align-items: center;\
  gap: 8px;\
}\
.doom-lock { font-size: 18px; }\
.doom-subtitle {\
  font-size: 12px;\
  color: #888;\
  margin-top: 4px;\
}\
.doom-challenge-area {\
  padding: 24px 20px;\
  min-height: 200px;\
  position: relative;\
  color: #e0e0e0;\
}\
.doom-footer {\
  padding: 12px 20px;\
  background: #16213e;\
  border-top: 1px solid #303050;\
  display: flex;\
  align-items: center;\
  justify-content: space-between;\
}\
.doom-progress {\
  flex: 1;\
  height: 4px;\
  background: #303050;\
  border-radius: 2px;\
  overflow: hidden;\
  margin-right: 12px;\
}\
.doom-progress-bar {\
  height: 100%;\
  background: linear-gradient(90deg, #e94560, #c23152);\
  width: 0%;\
  transition: width 0.2s ease;\
  border-radius: 2px;\
}\
.doom-attempt-count {\
  font-size: 11px;\
  color: #666;\
  white-space: nowrap;\
}\
.doom-message {\
  padding: 8px 12px;\
  border-radius: 4px;\
  font-size: 13px;\
  margin-bottom: 12px;\
  animation: doom-fade-in 0.2s ease;\
}\
.doom-message-error {\
  background: rgba(233,69,96,0.15);\
  color: #e94560;\
  border: 1px solid rgba(233,69,96,0.3);\
}\
.doom-message-warn {\
  background: rgba(255,193,7,0.15);\
  color: #ffc107;\
  border: 1px solid rgba(255,193,7,0.3);\
}\
.doom-challenge-title {\
  font-size: 15px;\
  font-weight: 600;\
  margin-bottom: 16px;\
  color: #e0e0e0;\
}\
.doom-challenge-instruction {\
  font-size: 13px;\
  color: #aaa;\
  margin-bottom: 12px;\
}\
.doom-btn {\
  background: #e94560;\
  color: white;\
  border: none;\
  padding: 10px 24px;\
  border-radius: 4px;\
  font-size: 14px;\
  cursor: pointer;\
  transition: background 0.15s, transform 0.1s;\
}\
.doom-btn:hover { background: #c23152; }\
.doom-btn:active { transform: scale(0.97); }\
.doom-input {\
  background: #0f3460;\
  border: 1px solid #303050;\
  color: #e0e0e0;\
  padding: 8px 12px;\
  border-radius: 4px;\
  font-size: 14px;\
  width: 100%;\
  box-sizing: border-box;\
}\
.doom-input:focus {\
  outline: none;\
  border-color: #e94560;\
}\
.doom-timer {\
  font-size: 24px;\
  font-weight: 700;\
  color: #e94560;\
  text-align: center;\
  font-variant-numeric: tabular-nums;\
}\
.doom-grid {\
  display: grid;\
  grid-template-columns: repeat(4, 1fr);\
  gap: 3px;\
  margin: 12px 0;\
}\
.doom-grid-cell {\
  aspect-ratio: 1;\
  background: #0f3460;\
  border: 2px solid transparent;\
  border-radius: 3px;\
  cursor: pointer;\
  transition: border-color 0.15s, opacity 0.15s;\
  display: flex;\
  align-items: center;\
  justify-content: center;\
  font-size: 20px;\
}\
.doom-grid-cell:hover { border-color: #303050; }\
.doom-grid-cell.selected {\
  border-color: #e94560;\
  background: rgba(233,69,96,0.15);\
}\
.doom-slider-track {\
  width: 100%;\
  height: 48px;\
  background: #0f3460;\
  border-radius: 24px;\
  position: relative;\
  margin: 20px 0;\
  overflow: hidden;\
}\
.doom-slider-target {\
  position: absolute;\
  top: 8px;\
  width: 32px;\
  height: 32px;\
  background: rgba(233,69,96,0.3);\
  border: 2px dashed #e94560;\
  border-radius: 50%;\
}\
.doom-slider-thumb {\
  position: absolute;\
  top: 4px;\
  left: 4px;\
  width: 40px;\
  height: 40px;\
  background: #e94560;\
  border-radius: 50%;\
  cursor: grab;\
  display: flex;\
  align-items: center;\
  justify-content: center;\
  font-size: 18px;\
  z-index: 1;\
}\
.doom-slider-thumb:active { cursor: grabbing; }\
.doom-slider-label {\
  text-align: center;\
  font-size: 12px;\
  color: #666;\
  margin-top: 8px;\
}\
.doom-pixel-field {\
  width: 100%;\
  height: 200px;\
  position: relative;\
  background: #0f3460;\
  border-radius: 4px;\
  overflow: hidden;\
}\
.doom-pixel-target {\
  position: absolute;\
  cursor: pointer;\
}\
.doom-sms-phone-row {\
  display: flex;\
  gap: 8px;\
  align-items: center;\
  margin-bottom: 16px;\
}\
.doom-sms-phone-row .doom-input {\
  flex: 1;\
}\
.doom-sms-code-boxes {\
  display: flex;\
  gap: 8px;\
  justify-content: center;\
  margin: 20px 0;\
}\
.doom-sms-code-box {\
  width: 40px;\
  height: 48px;\
  background: #0f3460;\
  border: 2px solid #303050;\
  border-radius: 6px;\
  color: #e0e0e0;\
  font-size: 22px;\
  font-weight: 700;\
  text-align: center;\
  font-family: monospace;\
}\
.doom-sms-code-box:focus {\
  outline: none;\
  border-color: #e94560;\
}\
.doom-sms-sent {\
  text-align: center;\
  font-size: 13px;\
  color: #888;\
  margin-bottom: 8px;\
}\
.doom-sms-sent strong {\
  color: #e0e0e0;\
}\
.doom-sudoku {\
  display: grid;\
  grid-template-columns: repeat(6, 1fr);\
  gap: 2px;\
  margin: 12px auto;\
  max-width: 264px;\
}\
.doom-sudoku-cell {\
  width: 100%;\
  aspect-ratio: 1;\
  background: #0f3460;\
  border: 1px solid #303050;\
  color: #e0e0e0;\
  font-size: 18px;\
  font-weight: 700;\
  text-align: center;\
  font-family: monospace;\
  padding: 0;\
}\
.doom-sudoku-cell:focus {\
  outline: none;\
  border-color: #e94560;\
  background: #162860;\
}\
.doom-sudoku-cell.doom-sudoku-given {\
  background: #16213e;\
  color: #888;\
}\
.doom-sudoku-cell.doom-sudoku-wrong {\
  background: rgba(233,69,96,0.25);\
  border-color: #e94560;\
}\
.doom-sudoku-border-right { border-right: 2px solid #e94560; }\
.doom-sudoku-border-bottom { border-bottom: 2px solid #e94560; }\
@keyframes doom-fade-in {\
  from { opacity: 0; transform: translateY(-4px); }\
  to { opacity: 1; transform: translateY(0); }\
}\
@keyframes doom-shake {\
  0%, 100% { transform: translateX(0); }\
  25% { transform: translateX(-6px); }\
  75% { transform: translateX(6px); }\
}\
.doom-shake { animation: doom-shake 0.3s ease; }\
.doom-riddle-options {\
  list-style: none;\
  padding: 0;\
  margin: 16px 0;\
}\
.doom-riddle-option {\
  background: #0f3460;\
  border: 2px solid #303050;\
  border-radius: 6px;\
  padding: 10px 14px;\
  margin-bottom: 8px;\
  cursor: pointer;\
  font-size: 14px;\
  color: #e0e0e0;\
  transition: border-color 0.15s, background 0.15s;\
  display: flex;\
  align-items: center;\
  gap: 10px;\
}\
.doom-riddle-option:hover {\
  border-color: #e94560;\
  background: rgba(233,69,96,0.08);\
}\
.doom-riddle-option.doom-option-selected {\
  border-color: #e94560;\
  background: rgba(233,69,96,0.15);\
}\
.doom-riddle-option.doom-option-wrong {\
  border-color: #e94560;\
  background: rgba(233,69,96,0.25);\
  animation: doom-shake 0.3s ease;\
}\
.doom-riddle-option.doom-option-correct {\
  border-color: #28a745;\
  background: rgba(40,167,69,0.2);\
}\
.doom-riddle-letter {\
  display: inline-flex;\
  align-items: center;\
  justify-content: center;\
  width: 24px;\
  height: 24px;\
  border-radius: 50%;\
  background: #16213e;\
  font-size: 12px;\
  font-weight: 700;\
  flex-shrink: 0;\
}\
.doom-riddle-explanation {\
  margin-top: 12px;\
  padding: 10px 14px;\
  background: rgba(40,167,69,0.1);\
  border: 1px solid rgba(40,167,69,0.3);\
  border-radius: 6px;\
  font-size: 13px;\
  color: #8fbc8f;\
  animation: doom-fade-in 0.3s ease;\
}\
.doom-riddle-thinking {\
  text-align: center;\
  padding: 20px;\
  color: #888;\
  font-size: 13px;\
}\
.doom-riddle-dots::after {\
  content: "";\
  animation: doom-dots 1.5s steps(4, end) infinite;\
}\
@keyframes doom-dots {\
  0% { content: ""; }\
  25% { content: "."; }\
  50% { content: ".."; }\
  75% { content: "..."; }\
}\
.doom-confidence {\
  padding: 10px 20px 12px;\
  background: #16213e;\
  border-bottom: 1px solid #303050;\
}\
.doom-confidence-label {\
  display: flex;\
  justify-content: space-between;\
  align-items: center;\
  margin-bottom: 6px;\
  font-size: 11px;\
  color: #888;\
}\
.doom-confidence-pct {\
  font-weight: 700;\
  font-variant-numeric: tabular-nums;\
  transition: color 0.3s;\
}\
.doom-confidence-track {\
  height: 6px;\
  background: #303050;\
  border-radius: 3px;\
  overflow: hidden;\
}\
.doom-confidence-fill {\
  height: 100%;\
  width: 0%;\
  border-radius: 3px;\
  transition: width 0.6s ease, background 0.6s ease;\
  background: linear-gradient(90deg, #e94560, #e94560);\
}\
.doom-confidence-fill.doom-conf-low {\
  background: linear-gradient(90deg, #e94560, #c23152);\
}\
.doom-confidence-fill.doom-conf-mid {\
  background: linear-gradient(90deg, #e9a045, #e9c845);\
}\
.doom-confidence-fill.doom-conf-high {\
  background: linear-gradient(90deg, #45e980, #28a745);\
}\
.doom-confidence-drop {\
  animation: doom-conf-drop 0.4s ease;\
}\
@keyframes doom-conf-drop {\
  0%, 100% { transform: translateX(0); }\
  20% { transform: translateX(-3px); }\
  40% { transform: translateX(3px); }\
  60% { transform: translateX(-2px); }\
  80% { transform: translateX(2px); }\
}\
.doom-ocr-canvas {\
  width: 100%;\
  height: 120px;\
  border-radius: 4px;\
  margin-bottom: 16px;\
  display: block;\
}\
.doom-ocr-form {\
  display: flex;\
  gap: 8px;\
  align-items: center;\
}\
.doom-ocr-form .doom-input {\
  flex: 1;\
}\
.doom-ocr-reveal {\
  margin-top: 12px;\
  padding: 10px 14px;\
  border-radius: 6px;\
  font-size: 13px;\
  animation: doom-fade-in 0.3s ease;\
}\
.doom-ocr-reveal-wrong {\
  background: rgba(233,69,96,0.15);\
  border: 1px solid rgba(233,69,96,0.3);\
  color: #e94560;\
}\
.doom-ocr-reveal-correct {\
  background: rgba(40,167,69,0.1);\
  border: 1px solid rgba(40,167,69,0.3);\
  color: #8fbc8f;\
}\
';

  var stylesInjected = false;
  function injectStyles() {
    if (stylesInjected) return;
    var el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    stylesInjected = true;
  }

  // ── Challenge: Impossible Math ──────────────────────────────────────
  function ImpossibleMath(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.timer = null;
  }
  ImpossibleMath.id = "impossible-math";

  ImpossibleMath.prototype.render = function () {
    var self = this;
    var ops = [
      function () {
        var a = 100 + Math.floor(Math.random() * 900);
        var b = 100 + Math.floor(Math.random() * 900);
        return { question: a + " &times; " + b + " = ?", answer: String(a * b) };
      },
      function () {
        var n = 1000 + Math.floor(Math.random() * 9000);
        return { question: "&radic;" + n + " = ? (4 decimal places)", answer: Math.sqrt(n).toFixed(4) };
      },
      function () {
        var a = 1000 + Math.floor(Math.random() * 9000);
        var b = 7 + Math.floor(Math.random() * 30);
        return { question: a + " mod " + b + " = ?", answer: String(a % b) };
      },
      function () {
        var a = 10 + Math.floor(Math.random() * 90);
        var b = 10 + Math.floor(Math.random() * 90);
        var c = 10 + Math.floor(Math.random() * 90);
        var d = 10 + Math.floor(Math.random() * 90);
        return {
          question: a + "/" + b + " + " + c + "/" + d + " = ? (decimal, 4 places)",
          answer: ((a * d + c * b) / (b * d)).toFixed(4),
        };
      },
    ];

    var op = ops[Math.floor(Math.random() * ops.length)]();
    var timeLimit = 3 + Math.floor(Math.random() * 3);

    this.container.innerHTML =
      '<div class="doom-challenge-title">Quick Math Verification</div>' +
      '<div class="doom-challenge-instruction">Solve to prove you\'re human (no calculators)</div>' +
      '<div style="text-align:center;margin:16px 0">' +
      '<div style="font-size:22px;font-weight:700;color:#e0e0e0;margin-bottom:16px">' + op.question + "</div>" +
      '<div class="doom-timer">' + timeLimit + "</div>" +
      '<div style="font-size:11px;color:#666;margin-bottom:16px">seconds remaining</div>' +
      '<input class="doom-input" type="text" placeholder="Your answer..." style="max-width:200px;text-align:center" />' +
      '<div style="margin-top:12px"><button class="doom-btn doom-submit-math">Submit</button></div>' +
      "</div>";

    var input = this.container.querySelector(".doom-input");
    var btn = this.container.querySelector(".doom-submit-math");
    var timerEl = this.container.querySelector(".doom-timer");
    var remaining = timeLimit;

    this.timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(self.timer);
        self.callbacks.onFail("Time's up! That was too slow.");
      }
    }, 1000);

    function submit() {
      clearInterval(self.timer);
      if (input.value.trim() === op.answer) {
        self.callbacks.onPass();
      } else {
        self.callbacks.onFail("Incorrect. The answer was " + op.answer + ".");
      }
    }

    btn.addEventListener("click", submit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
    input.focus();
  };

  // ── Challenge: Pixel Hunt ───────────────────────────────────────────
  function PixelHunt(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.clickCount = 0;
    this.maxClicks = 3;
    this.round = 0;
    this.totalRounds = 3;
  }
  PixelHunt.id = "pixel-hunt";

  PixelHunt.prototype.render = function () {
    var self = this;
    this.container.innerHTML =
      '<div class="doom-challenge-title">Visual Acuity Test</div>' +
      '<div class="doom-challenge-instruction">Click the checkbox to verify (' +
      (this.totalRounds - this.round) + " remaining)</div>" +
      '<div class="doom-pixel-field"></div>' +
      '<div style="text-align:center;margin-top:8px;font-size:11px;color:#666">Look carefully...</div>';
    this._placeTarget();
  };

  PixelHunt.prototype._placeTarget = function () {
    var self = this;
    var field = this.container.querySelector(".doom-pixel-field");
    var size = Math.max(3, 8 - this.round * 2);
    field.innerHTML = "";

    var count = 15 + this.round * 10;
    for (var i = 0; i < count; i++) {
      var decoy = document.createElement("div");
      var s = Math.max(1, size + Math.floor(Math.random() * 3) - 1);
      decoy.style.cssText =
        "position:absolute;pointer-events:none;" +
        "left:" + (Math.random() * (field.clientWidth - s)) + "px;" +
        "top:" + (Math.random() * (field.clientHeight - s)) + "px;" +
        "width:" + s + "px;height:" + s + "px;" +
        "background:" + similarColor() + ";border-radius:" + (s > 4 ? "1px" : "0");
      field.appendChild(decoy);
    }

    var target = document.createElement("div");
    target.className = "doom-pixel-target";
    target.style.cssText =
      "left:" + Math.floor(Math.random() * (field.clientWidth - size)) + "px;" +
      "top:" + Math.floor(Math.random() * (field.clientHeight - size)) + "px;" +
      "width:" + size + "px;height:" + size + "px;" +
      "background:" + similarColor() + ";border-radius:" + (size > 4 ? "1px" : "0");

    target.addEventListener("click", function (e) {
      e.stopPropagation();
      self.round++;
      if (self.round >= self.totalRounds) {
        self.callbacks.onPass();
      } else {
        self.render();
      }
    });
    field.appendChild(target);

    field.addEventListener("click", function () {
      self.clickCount++;
      if (self.clickCount >= self.maxClicks) {
        self.clickCount = 0;
        self.callbacks.onFail("Too many misclicks. The checkbox was RIGHT THERE.");
      } else {
        field.classList.add("doom-shake");
        setTimeout(function () { field.classList.remove("doom-shake"); }, 300);
      }
    });
  };

  function similarColor() {
    var r = 15 + Math.floor(Math.random() * 8);
    var g = 15 + Math.floor(Math.random() * 4);
    var b = 55 + Math.floor(Math.random() * 8);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // ── Challenge: Endless Grid ─────────────────────────────────────────
  var CATEGORIES = [
    { label: "traffic lights", emoji: "\uD83D\uDEA6" },
    { label: "bicycles", emoji: "\uD83D\uDEB2" },
    { label: "crosswalks", emoji: "\uD83D\uDEB6" },
    { label: "buses", emoji: "\uD83D\uDE8C" },
    { label: "fire hydrants", emoji: "\uD83E\uDDEF" },
    { label: "stairs", emoji: "\uD83E\uDE9C" },
    { label: "chimneys", emoji: "\uD83C\uDFE0" },
    { label: "palm trees", emoji: "\uD83C\uDF34" },
  ];
  var FILLER_EMOJI = [
    "\uD83D\uDE97", "\uD83C\uDFE2", "\uD83C\uDF33", "\u2601\uFE0F",
    "\uD83C\uDFEA", "\uD83D\uDEE3\uFE0F", "\uD83C\uDFD7\uFE0F", "\u26FD",
    "\uD83C\uDD7F\uFE0F", "\uD83C\uDFD8\uFE0F", "\uD83D\uDCEE", "\uD83D\uDEE4\uFE0F",
    "\uD83C\uDFEC", "\uD83C\uDF06", "\uD83C\uDFD9\uFE0F", "\uD83D\uDE8F",
  ];

  var BROKEN_IMG = "\u26A0";

  function EndlessGrid(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.round = 0;
    this.selected = {};
    this.correctCells = {};
    this.cells = [];
    this.gridEls = [];
    this.shuffleTimer = null;
    this.countdownTimer = null;
    this.cat = null;
  }
  EndlessGrid.id = "endless-grid";

  EndlessGrid.prototype.render = function () {
    var self = this;
    this.round++;
    this.selected = {};
    this.correctCells = {};

    this.cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    this.cells = this._generateGrid(this.cat);

    var remaining = 10;

    this.container.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center">' +
      '<div class="doom-challenge-title" style="margin-bottom:0">Image Verification (' + this.round + "/???)</div>" +
      '<div class="doom-timer" style="font-size:18px">' + remaining + "</div>" +
      "</div>" +
      '<div class="doom-challenge-instruction">Select all squares with <strong>' + this.cat.label + "</strong></div>" +
      '<div class="doom-grid"></div>' +
      '<div style="text-align:right;margin-top:12px"><button class="doom-btn doom-grid-verify">Verify</button></div>';

    var gridEl = this.container.querySelector(".doom-grid");
    var timerEl = this.container.querySelector(".doom-timer");
    this.gridEls = [];

    for (var i = 0; i < this.cells.length; i++) {
      (function (idx) {
        var el = document.createElement("div");
        el.className = "doom-grid-cell";
        el.textContent = self.cells[idx].emoji;
        if (self.cells[idx].broken) {
          el.style.opacity = "0.35";
          el.style.fontSize = "14px";
          el.style.color = "#666";
        }
        el.addEventListener("click", function () {
          if (self.selected[idx]) {
            delete self.selected[idx];
            el.classList.remove("selected");
          } else {
            self.selected[idx] = true;
            el.classList.add("selected");
          }
        });
        gridEl.appendChild(el);
        self.gridEls.push(el);
        if (self.cells[idx].isTarget) self.correctCells[idx] = true;
      })(i);
    }

    this.countdownTimer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(self.countdownTimer);
        clearInterval(self.shuffleTimer);
        self.callbacks.onFail("Verification timed out.");
      }
    }, 1000);

    this.shuffleTimer = setInterval(function () {
      self._reshuffleSome();
    }, 2000);

    this.container.querySelector(".doom-grid-verify").addEventListener("click", function () {
      self._reshuffleSome();

      setTimeout(function () {
        clearInterval(self.countdownTimer);
        clearInterval(self.shuffleTimer);

        var selKeys = Object.keys(self.selected);
        var corKeys = Object.keys(self.correctCells);
        var correct = selKeys.length === corKeys.length && selKeys.every(function (k) { return self.correctCells[k]; });

        if (correct) {
          if (self.round >= 2 && Math.random() < 0.4) {
            self.callbacks.onFail("Our system detected irregular click patterns. Please retry.");
          } else {
            self.callbacks.onPass();
          }
        } else {
          self.callbacks.onFail("Please try again.");
        }
      }, 300);
    });
  };

  EndlessGrid.prototype._reshuffleSome = function () {
    var indices = [];
    for (var i = 0; i < 16; i++) indices.push(i);
    for (var j = indices.length - 1; j > 0; j--) {
      var r = Math.floor(Math.random() * (j + 1));
      var tmp = indices[j]; indices[j] = indices[r]; indices[r] = tmp;
    }
    var toShuffle = indices.slice(0, 4);

    this.correctCells = {};

    for (var k = 0; k < toShuffle.length; k++) {
      var idx = toShuffle[k];
      if (Math.random() < 0.25) {
        this.cells[idx] = { emoji: this.cat.emoji, isTarget: true, broken: false };
      } else {
        this.cells[idx] = {
          emoji: FILLER_EMOJI[Math.floor(Math.random() * FILLER_EMOJI.length)],
          isTarget: false,
          broken: false,
        };
      }
      delete this.selected[idx];
      this.gridEls[idx].classList.remove("selected");
    }

    this._injectBroken();

    for (var m = 0; m < 16; m++) {
      this.gridEls[m].textContent = this.cells[m].emoji;
      if (this.cells[m].broken) {
        this.gridEls[m].style.opacity = "0.35";
        this.gridEls[m].style.fontSize = "14px";
        this.gridEls[m].style.color = "#666";
      } else {
        this.gridEls[m].style.opacity = "";
        this.gridEls[m].style.fontSize = "";
        this.gridEls[m].style.color = "";
      }
      if (this.cells[m].isTarget) this.correctCells[m] = true;
    }
  };

  EndlessGrid.prototype._injectBroken = function () {
    for (var i = 0; i < 16; i++) this.cells[i].broken = false;

    var indices = [];
    for (var j = 0; j < 16; j++) indices.push(j);
    for (var k = indices.length - 1; k > 0; k--) {
      var r = Math.floor(Math.random() * (k + 1));
      var tmp = indices[k]; indices[k] = indices[r]; indices[r] = tmp;
    }
    for (var m = 0; m < 3; m++) {
      this.cells[indices[m]].emoji = BROKEN_IMG;
      this.cells[indices[m]].broken = true;
      this.cells[indices[m]].isTarget = false;
    }
  };

  EndlessGrid.prototype._generateGrid = function (category) {
    var cells = [];
    var targetCount = 2 + Math.floor(Math.random() * 4);
    for (var i = 0; i < 16; i++) {
      cells.push({
        emoji: FILLER_EMOJI[Math.floor(Math.random() * FILLER_EMOJI.length)],
        isTarget: false,
        broken: false,
      });
    }
    var indices = [];
    for (var j = 0; j < 16; j++) indices.push(j);
    for (var k = indices.length - 1; k > 0; k--) {
      var r = Math.floor(Math.random() * (k + 1));
      var tmp = indices[k]; indices[k] = indices[r]; indices[r] = tmp;
    }
    for (var m = 0; m < targetCount; m++) {
      cells[indices[m]] = { emoji: category.emoji, isTarget: true, broken: false };
    }
    this._injectBrokenInit(cells);
    return cells;
  };

  EndlessGrid.prototype._injectBrokenInit = function (cells) {
    var indices = [];
    for (var j = 0; j < 16; j++) indices.push(j);
    for (var k = indices.length - 1; k > 0; k--) {
      var r = Math.floor(Math.random() * (k + 1));
      var tmp = indices[k]; indices[k] = indices[r]; indices[r] = tmp;
    }
    var count = 0;
    for (var m = 0; m < indices.length && count < 3; m++) {
      if (!cells[indices[m]].isTarget) {
        cells[indices[m]].emoji = BROKEN_IMG;
        cells[indices[m]].broken = true;
        count++;
      }
    }
  };

  // ── Challenge: Rebellious Slider ────────────────────────────────────
  var SLIDER_MODES = [
    {
      name: "offset",
      label: "Calibrating input device...",
      init: function () {
        this.offset = 40 + Math.random() * 80;
        this.sign = Math.random() > 0.5 ? 1 : -1;
        this.resetCountdown = 8 + Math.floor(Math.random() * 10);
        this.moveCount = 0;
      },
      transform: function (desiredX, targetLeft) {
        this.moveCount++;
        if (this.moveCount >= this.resetCountdown) {
          this.moveCount = 0;
          this.resetCountdown = 6 + Math.floor(Math.random() * 8);
          this.offset = 30 + Math.random() * 90;
          this.sign = -this.sign;
        }
        return desiredX + (this.offset * this.sign);
      },
    },
    {
      name: "asymptote",
      label: "Enhanced precision mode enabled",
      init: function (targetLeft, trackWidth) {
        this.targetCenter = targetLeft + 16;
        this.trackWidth = trackWidth;
      },
      transform: function (desiredX, targetLeft, anchorX) {
        var dist = Math.abs(desiredX - this.targetCenter);
        var proximity = Math.max(0, 1 - dist / (this.trackWidth * 0.45));
        var sensitivity = 1 + Math.pow(proximity, 2) * 14;
        var delta = desiredX - anchorX;
        return anchorX + delta * sensitivity;
      },
    },
    {
      name: "hyperspeed",
      label: "High-sensitivity input detected",
      init: function () {
        this.multiplier = 4 + Math.random() * 4;
      },
      transform: function (desiredX, targetLeft, anchorX) {
        var delta = desiredX - anchorX;
        return anchorX + delta * this.multiplier;
      },
    },
  ];

  function RebelliousSlider(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.dragging = false;
    this.attempts = 0;
    this.maxAttempts = 8;
    this._onMouseMove = null;
    this._onMouseUp = null;
    this._onTouchMove = null;
    this._onTouchEnd = null;
    this.mode = SLIDER_MODES[Math.floor(Math.random() * SLIDER_MODES.length)];
  }
  RebelliousSlider.id = "rebellious-slider";

  RebelliousSlider.prototype.render = function () {
    var self = this;
    var trackWidth = 340;
    var targetPos = 80 + Math.floor(Math.random() * (trackWidth - 160));

    this.container.innerHTML =
      '<div class="doom-challenge-title">Slide to Verify</div>' +
      '<div class="doom-challenge-instruction">Drag the slider to the highlighted zone</div>' +
      '<div class="doom-slider-track">' +
      '<div class="doom-slider-target" style="left:' + targetPos + 'px"></div>' +
      '<div class="doom-slider-thumb">&#x2B05;</div>' +
      "</div>" +
      '<div class="doom-slider-label">' + this.mode.label + "</div>";

    var track = this.container.querySelector(".doom-slider-track");
    var thumb = this.container.querySelector(".doom-slider-thumb");
    var label = this.container.querySelector(".doom-slider-label");
    var thumbWidth = 40;
    var targetLeft = targetPos;
    var targetRight = targetPos + 32;
    var thumbX = 4;
    var anchorX = 4;
    var dragStartX = 0;

    this.mode.init.call(this.mode, targetLeft, track.clientWidth || trackWidth);

    function setThumbPos(x) {
      thumbX = Math.max(0, Math.min(x, track.clientWidth - thumbWidth));
      thumb.style.left = thumbX + "px";
    }

    function onMove(clientX) {
      if (!self.dragging) return;
      var rect = track.getBoundingClientRect();
      var rawX = clientX - rect.left - dragStartX + anchorX;
      var mappedX = self.mode.transform.call(self.mode, rawX, targetLeft, anchorX);
      setThumbPos(mappedX);
    }

    var snark = [
      "Not even close.", "The slider disagrees.", "Try with more conviction.",
      "Did you sneeze?", "The slider resists your authority.",
      "Sliders hate this one weird trick.", "Precision is key. You lack it.",
      "Maybe try a different finger?",
    ];

    function onEnd() {
      if (!self.dragging) return;
      self.dragging = false;
      self.attempts++;
      thumb.style.cursor = "grab";

      var thumbCenter = thumbX + thumbWidth / 2;
      var inTarget = thumbCenter >= targetLeft && thumbCenter <= targetRight;

      if (inTarget) {
        if (Math.random() < 0.6) {
          label.textContent = "Almost! The slider moved. Try again.";
          setThumbPos(4);
          anchorX = 4;
        } else {
          self._cleanup();
          self.callbacks.onPass();
          return;
        }
      } else {
        label.textContent = snark[Math.floor(Math.random() * snark.length)];
      }

      anchorX = thumbX;

      if (self.attempts >= self.maxAttempts) {
        self._cleanup();
        self.callbacks.onFail("Maximum slide attempts exceeded.");
      }
    }

    thumb.addEventListener("mousedown", function (e) {
      self.dragging = true;
      dragStartX = e.clientX - track.getBoundingClientRect().left - thumbX;
      anchorX = thumbX;
      thumb.style.cursor = "grabbing";
      e.preventDefault();
    });

    thumb.addEventListener("touchstart", function (e) {
      self.dragging = true;
      dragStartX = e.touches[0].clientX - track.getBoundingClientRect().left - thumbX;
      anchorX = thumbX;
      e.preventDefault();
    });

    this._onMouseMove = function (e) { onMove(e.clientX); };
    this._onTouchMove = function (e) { onMove(e.touches[0].clientX); };
    this._onMouseUp = onEnd;
    this._onTouchEnd = onEnd;

    window.addEventListener("mousemove", this._onMouseMove);
    window.addEventListener("touchmove", this._onTouchMove);
    window.addEventListener("mouseup", this._onMouseUp);
    window.addEventListener("touchend", this._onTouchEnd);
  };

  RebelliousSlider.prototype._cleanup = function () {
    if (this._onMouseMove) window.removeEventListener("mousemove", this._onMouseMove);
    if (this._onTouchMove) window.removeEventListener("touchmove", this._onTouchMove);
    if (this._onMouseUp) window.removeEventListener("mouseup", this._onMouseUp);
    if (this._onTouchEnd) window.removeEventListener("touchend", this._onTouchEnd);
  };

  // ── Challenge: Identity Gauntlet ─────────────────────────────────────
  var GAUNTLET_ROUNDS = [
    { left: "I'm a human", right: "I'm not a human", correct: 0 },
    { left: "I'm a robot", right: "I'm not a robot", correct: 1 },
    { left: "I am not a robot", right: "I am a robot", correct: 0 },
    { left: "I'm not not a human", right: "I'm not a human", correct: 0 },
    { left: "I'm not a robot", right: "I'm not not a robot", correct: 0 },
    { left: "Human: Yes", right: "Human: No", correct: 0 },
    { left: "Robot: Yes", right: "Robot: No", correct: 1 },
    { left: "Confirm humanity", right: "Deny humanity", correct: 0 },
    { left: "I'm not not not a robot", right: "I'm not not a robot", correct: 1 },
    { left: "Select if human", right: "Select if not human", correct: 0 },
    { left: "Not a robot: True", right: "Not a robot: False", correct: 0 },
    { left: "Robot: False", right: "Robot: True", correct: 0 },
    { left: "I am a human being", right: "I am not a human being", correct: 0 },
    { left: "Deny: I am a robot", right: "Confirm: I am a robot", correct: 0 },
    { left: "I'm not not not a human", right: "I'm not not a human", correct: 1 },
    { left: "Non-robot: Confirm", right: "Non-robot: Deny", correct: 0 },
    { left: "Human: Deny", right: "Human: Confirm", correct: 1 },
    { left: "Not not a robot: No", right: "Not not a robot: Yes", correct: 0 },
    { left: "I lack robothood", right: "I possess robothood", correct: 0 },
    { left: "Humanity: Affirm", right: "Humanity: Reject", correct: 0 },
    { left: "Non-human: Deny", right: "Non-human: Confirm", correct: 0 },
    { left: "I hereby certify my non-robotness", right: "I hereby certify my robotness", correct: 0 },
    { left: "Confirm: Not not human", right: "Deny: Not not human", correct: 0 },
    { left: "Robot = false", right: "Human = false", correct: 0 },
  ];

  function IdentityGauntlet(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.round = 0;
    this.totalRounds = 6 + Math.floor(Math.random() * 4);
    this.pool = this._shuffle(GAUNTLET_ROUNDS.slice());
    this.timer = null;
    this.baseTime = 2.8;
  }
  IdentityGauntlet.id = "identity-gauntlet";

  IdentityGauntlet.prototype.render = function () {
    this._showRound();
  };

  IdentityGauntlet.prototype._showRound = function () {
    var self = this;
    if (this.round >= this.totalRounds) {
      this.callbacks.onPass();
      return;
    }

    var entry = this.pool[this.round % this.pool.length];
    var swapped = Math.random() > 0.5;
    var leftText = swapped ? entry.right : entry.left;
    var rightText = swapped ? entry.left : entry.right;
    var correctSide = swapped ? (1 - entry.correct) : entry.correct;

    var timeLimit = Math.max(1.2, this.baseTime - this.round * 0.2);
    var remaining = timeLimit;

    this.container.innerHTML =
      '<div class="doom-challenge-title">Identity Verification (' + (this.round + 1) + "/" + this.totalRounds + ")</div>" +
      '<div class="doom-challenge-instruction">Select the correct statement. Quickly.</div>' +
      '<div class="doom-timer" style="margin-bottom:16px">' + timeLimit.toFixed(1) + "</div>" +
      '<div style="display:flex;gap:10px">' +
      '<button class="doom-btn doom-gauntlet-btn" data-side="0" style="flex:1;font-size:13px;padding:14px 8px;white-space:normal;line-height:1.3">' + self._esc(leftText) + "</button>" +
      '<button class="doom-btn doom-gauntlet-btn" data-side="1" style="flex:1;font-size:13px;padding:14px 8px;background:#0f3460;border:2px solid #303050;white-space:normal;line-height:1.3">' + self._esc(rightText) + "</button>" +
      "</div>" +
      '<div style="text-align:center;margin-top:10px;font-size:11px;color:#666" class="doom-gauntlet-status"></div>';

    var timerEl = this.container.querySelector(".doom-timer");
    var btns = this.container.querySelectorAll(".doom-gauntlet-btn");
    var status = this.container.querySelector(".doom-gauntlet-status");
    var answered = false;

    this.timer = setInterval(function () {
      remaining -= 0.1;
      if (remaining <= 0) {
        clearInterval(self.timer);
        if (!answered) {
          answered = true;
          timerEl.textContent = "0.0";
          self.callbacks.onFail("Too slow. Verification timed out.");
        }
        return;
      }
      timerEl.textContent = remaining.toFixed(1);
    }, 100);

    for (var i = 0; i < btns.length; i++) {
      (function (btn, side) {
        btn.addEventListener("click", function () {
          if (answered) return;
          answered = true;
          clearInterval(self.timer);

          if (side === correctSide) {
            btn.style.borderColor = "#28a745";
            btn.style.background = "rgba(40,167,69,0.2)";
            status.textContent = "Correct.";
            status.style.color = "#45e980";
            self.round++;
            setTimeout(function () { self._showRound(); }, 600);
          } else {
            btn.style.borderColor = "#e94560";
            btn.style.background = "rgba(233,69,96,0.25)";
            btns[1 - side].style.borderColor = "#28a745";
            btns[1 - side].style.background = "rgba(40,167,69,0.2)";
            status.textContent = "Non-Human User Confirmed!";
            status.style.color = "#e94560";
            setTimeout(function () {
              self.callbacks.onFail("Non-Human User Confirmed!");
            }, 1500);
          }
        });
      })(btns[i], i);
    }
  };

  IdentityGauntlet.prototype._shuffle = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  };

  IdentityGauntlet.prototype._esc = function (str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  };

  // ── Challenge: Typing Speed ──────────────────────────────────────────
  var TYPING_SENTENCES = [
    "I1lI1ll1Il verify I1l am l1I real",
    "c1ick l1ne Ill1 to lI1l prove Il1",
    "Il1l human lI1I check 1lIl pass I1",
    "va1id Il1 input l1lI veri1y Il1l",
    "1lIl rea1 lIl1 user Il1I confirm",
    "l1Il secure 1Il1 token lI1l I1lI",
  ];

  function TypingSpeed(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.timer = null;
  }
  TypingSpeed.id = "typing-speed";

  TypingSpeed.prototype.render = function () {
    var self = this;
    var sentence = TYPING_SENTENCES[Math.floor(Math.random() * TYPING_SENTENCES.length)];
    var remaining = 10;

    this.container.innerHTML =
      '<div class="doom-challenge-title">Typing Verification</div>' +
      '<div class="doom-challenge-instruction">Type the text exactly as shown</div>' +
      '<div style="text-align:center;margin:12px 0">' +
      '<div class="doom-timer">' + remaining + '</div>' +
      '<div style="font-size:11px;color:#666;margin-bottom:12px">seconds remaining</div>' +
      '</div>' +
      '<div style="background:#0a0a2a;border:1px solid #303050;border-radius:4px;padding:12px;text-align:center;margin-bottom:16px;' +
      'font-family:Consolas,monospace;font-size:18px;letter-spacing:2px;color:#e0e0e0" class="doom-typing-target">' +
      this._esc(sentence) + '</div>' +
      '<input class="doom-input" type="text" placeholder="Start typing..." style="font-family:Consolas,monospace;letter-spacing:1px;text-align:center" />' +
      '<div style="text-align:center;margin-top:12px">' +
      '<button class="doom-btn doom-typing-submit">Submit</button>' +
      '</div>' +
      '<div style="text-align:center;margin-top:8px;font-size:11px;color:#666" class="doom-typing-status">Match the text exactly, including capitalization</div>';

    var timerEl = this.container.querySelector(".doom-timer");
    var input = this.container.querySelector(".doom-input");
    var submitBtn = this.container.querySelector(".doom-typing-submit");
    var status = this.container.querySelector(".doom-typing-status");
    var answered = false;

    this.timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(self.timer);
        if (!answered) {
          answered = true;
          self.callbacks.onFail("Typing verification timed out.");
        }
      }
    }, 1000);

    input.addEventListener("input", function () {
      if (answered) return;
      var val = input.value;
      if (val.length > 0 && val !== sentence.substring(0, val.length)) {
        answered = true;
        clearInterval(self.timer);
        input.disabled = true;
        input.classList.add("doom-shake");
        var pos = 0;
        while (pos < val.length && val[pos] === sentence[pos]) pos++;
        status.innerHTML = 'Typo detected at position ' + (pos + 1) + '. Verification failed.';
        status.style.color = "#e94560";
        setTimeout(function () {
          self.callbacks.onFail("Input error detected.");
        }, 1500);
      }
    });

    function submit() {
      if (answered) return;
      answered = true;
      clearInterval(self.timer);
      input.disabled = true;
      submitBtn.disabled = true;

      if (input.value === sentence) {
        status.innerHTML = "Typing pattern analysis indicates automated input. Verification rejected.";
      } else {
        status.innerHTML = "Input does not match. Verification failed.";
      }
      status.style.color = "#e94560";
      setTimeout(function () {
        self.callbacks.onFail("Typing pattern anomaly detected.");
      }, 2000);
    }

    submitBtn.addEventListener("click", submit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
    input.focus();
  };

  TypingSpeed.prototype._esc = function (str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  };

  // ── Challenge: Jigsaw Piece ──────────────────────────────────────────
  function JigsawPiece(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  JigsawPiece.id = "jigsaw-piece";

  JigsawPiece.prototype.render = function () {
    var self = this;
    var gridSize = 4;
    var cellSize = 44;
    var totalSize = gridSize * cellSize;
    var missingR = Math.floor(Math.random() * gridSize);
    var missingC = Math.floor(Math.random() * gridSize);

    var baseColors = this._generatePattern(gridSize, cellSize);

    this.container.innerHTML =
      '<div class="doom-challenge-title">Visual Pattern Matching</div>' +
      '<div class="doom-challenge-instruction">Select the missing piece</div>' +
      '<div style="display:flex;justify-content:center;margin:12px 0">' +
      '<canvas class="doom-jigsaw-grid" width="' + totalSize + '" height="' + totalSize + '" style="border:1px solid #303050;border-radius:4px"></canvas>' +
      '</div>' +
      '<div style="display:flex;gap:10px;justify-content:center;margin:12px 0" class="doom-jigsaw-options"></div>' +
      '<div style="text-align:center;font-size:11px;color:#666" class="doom-jigsaw-status"></div>';

    var gridCanvas = this.container.querySelector(".doom-jigsaw-grid");
    var optionsEl = this.container.querySelector(".doom-jigsaw-options");
    var status = this.container.querySelector(".doom-jigsaw-status");

    this._drawGrid(gridCanvas, baseColors, gridSize, cellSize, missingR, missingC);

    var defects = [
      { label: "rotated 2\u00B0",     fn: function (ctx) { ctx.rotate(2 * Math.PI / 180); } },
      { label: "shifted 1px right",   fn: function (ctx) { ctx.translate(1, 0); } },
      { label: "shifted 1px down",    fn: function (ctx) { ctx.translate(0, 1); } },
      { label: "brightness +3%",      fn: null, bright: 1.03 },
    ];

    for (var i = defects.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = defects[i]; defects[i] = defects[j]; defects[j] = tmp;
    }

    var answered = false;

    for (var d = 0; d < 4; d++) {
      (function (defect, idx) {
        var c = document.createElement("canvas");
        c.width = cellSize;
        c.height = cellSize;
        c.style.cssText = "border:2px solid #303050;border-radius:4px;cursor:pointer;transition:border-color 0.15s";
        var ctx = c.getContext("2d");

        ctx.save();
        ctx.translate(cellSize / 2, cellSize / 2);
        if (defect.fn) defect.fn(ctx);
        ctx.translate(-cellSize / 2, -cellSize / 2);

        var color = baseColors[missingR][missingC];
        var r = parseInt(color.slice(1, 3), 16);
        var g = parseInt(color.slice(3, 5), 16);
        var b = parseInt(color.slice(5, 7), 16);
        if (defect.bright) {
          r = Math.min(255, Math.round(r * defect.bright));
          g = Math.min(255, Math.round(g * defect.bright));
          b = Math.min(255, Math.round(b * defect.bright));
        }
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(0, 0, cellSize, cellSize);

        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        for (var s = 0; s < cellSize; s += 8) {
          ctx.beginPath();
          ctx.moveTo(s, 0);
          ctx.lineTo(s, cellSize);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, s);
          ctx.lineTo(cellSize, s);
          ctx.stroke();
        }
        ctx.restore();

        c.addEventListener("mouseenter", function () {
          if (!answered) c.style.borderColor = "#e94560";
        });
        c.addEventListener("mouseleave", function () {
          if (!answered) c.style.borderColor = "#303050";
        });

        c.addEventListener("click", function () {
          if (answered) return;
          answered = true;
          c.style.borderColor = "#e94560";
          status.innerHTML = "Piece alignment deviation detected (" + defect.label + "). Verification failed.";
          status.style.color = "#e94560";
          setTimeout(function () {
            self.callbacks.onFail("Piece alignment deviation detected.");
          }, 2500);
        });

        optionsEl.appendChild(c);
      })(defects[d], d);
    }
  };

  JigsawPiece.prototype._generatePattern = function (gridSize, cellSize) {
    var colors = [];
    var baseH = Math.floor(Math.random() * 360);
    for (var r = 0; r < gridSize; r++) {
      colors.push([]);
      for (var c = 0; c < gridSize; c++) {
        var h = (baseH + r * 15 + c * 25) % 360;
        var s = 40 + Math.floor(Math.random() * 20);
        var l = 25 + Math.floor(Math.random() * 15);
        colors[r].push(this._hslToHex(h, s, l));
      }
    }
    return colors;
  };

  JigsawPiece.prototype._drawGrid = function (canvas, colors, gridSize, cellSize, missingR, missingC) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0a0a2a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var r = 0; r < gridSize; r++) {
      for (var c = 0; c < gridSize; c++) {
        if (r === missingR && c === missingC) {
          ctx.fillStyle = "#1a1a2e";
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          ctx.strokeStyle = "#e94560";
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
          ctx.setLineDash([]);
          ctx.fillStyle = "#e94560";
          ctx.font = "20px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("?", c * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
          continue;
        }

        ctx.fillStyle = colors[r][c];
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);

        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        for (var s = 0; s < cellSize; s += 8) {
          ctx.beginPath();
          ctx.moveTo(c * cellSize + s, r * cellSize);
          ctx.lineTo(c * cellSize + s, r * cellSize + cellSize);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(c * cellSize, r * cellSize + s);
          ctx.lineTo(c * cellSize + cellSize, r * cellSize + s);
          ctx.stroke();
        }

        ctx.strokeStyle = "#1a1a2e";
        ctx.lineWidth = 1;
        ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  };

  JigsawPiece.prototype._hslToHex = function (h, s, l) {
    s /= 100; l /= 100;
    var a = s * Math.min(l, 1 - l);
    function f(n) {
      var k = (n + h / 30) % 12;
      var color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    }
    return "#" + f(0) + f(8) + f(4);
  };

  // ── Challenge: Terms of Service ──────────────────────────────────────
  var TOS_FRAGMENTS = [
    "By proceeding, the User irrevocably consents to the collection, aggregation, and dissemination of all biometric data, including but not limited to retinal patterns, fingerprint whorls, and typing cadence.",
    "The Provider reserves the right to modify these terms at any time without notice, retroactively, or in dimensions not yet perceivable by the human sensorium.",
    "The User acknowledges that their soul, as defined in Appendix Q (\"Metaphysical Entities and Their Commercially Licensable Derivatives\"), constitutes consideration for the services rendered herein.",
    "Notwithstanding the foregoing, and in consideration of the mutual covenants set forth in Section 14(b)(iii)(A), the User shall indemnify, defend, and hold harmless the Provider against claims arising from the User's existence.",
    "All disputes shall be resolved through binding arbitration conducted exclusively in international waters, under the jurisprudence of the Principality of Sealand.",
    "The User warrants that they have read, understood, and committed to memory the entirety of this agreement, including Exhibits A through ZZ, the Supplemental Rider, and the Confidential Annex (available upon request, in Sumerian).",
    "The Provider makes no warranty, express or implied, that the services will function, exist, or remain within the observable universe for any period of time.",
    "Section 7.3.1: The User agrees not to reverse-engineer, decompile, or even think too hard about the underlying verification algorithms, under penalty of additional captchas.",
    "In the event of a conflict between the English-language version of this Agreement and any translation thereof, the version written in interpretive dance shall prevail.",
    "The User consents to receive promotional materials, including but not limited to emails, push notifications, carrier pigeons, and prophetic dreams.",
    "Force majeure events shall include, but not be limited to: acts of God, acts of gods (plural), solar flares, and the heat death of the universe.",
    "This Agreement shall be governed by the laws of whichever jurisdiction is least favorable to the User at the time of adjudication.",
  ];

  function TermsOfService(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.timer = null;
  }
  TermsOfService.id = "terms-of-service";

  TermsOfService.prototype.render = function () {
    var self = this;
    var remaining = 30;
    var paragraphs = this._buildTos();

    this.container.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center">' +
      '<div class="doom-challenge-title" style="margin-bottom:0">Terms of Service</div>' +
      '<div class="doom-timer" style="font-size:18px">' + remaining + '</div>' +
      '</div>' +
      '<div class="doom-challenge-instruction">Read and accept the terms to proceed</div>' +
      '<div style="position:relative">' +
      '<div class="doom-tos-scroll" style="height:180px;overflow-y:auto;background:#0a0a2a;border:1px solid #303050;border-radius:4px;padding:12px;font-size:11px;color:#777;line-height:1.6">' +
      paragraphs +
      '<div style="height:40px"></div>' +
      '</div>' +
      '<div style="position:absolute;bottom:0;left:0;right:0;height:22px;background:linear-gradient(transparent,#0a0a2a);pointer-events:none"></div>' +
      '</div>' +
      '<div style="text-align:center;margin-top:12px">' +
      '<button class="doom-btn doom-tos-agree" disabled style="opacity:0.4">I Agree</button>' +
      '</div>' +
      '<div style="text-align:center;margin-top:8px;font-size:11px;color:#666" class="doom-tos-status">Scroll to the bottom to enable the button</div>';

    var scrollBox = this.container.querySelector(".doom-tos-scroll");
    var agreeBtn = this.container.querySelector(".doom-tos-agree");
    var timerEl = this.container.querySelector(".doom-timer");
    var status = this.container.querySelector(".doom-tos-status");

    scrollBox.addEventListener("scroll", function () {
      var atBottom = scrollBox.scrollHeight - scrollBox.scrollTop - scrollBox.clientHeight < 20;
      if (atBottom) {
        scrollBox.scrollTop = scrollBox.scrollHeight - scrollBox.clientHeight - 21;
      }
    });

    agreeBtn.addEventListener("click", function () {
      // button is never enabled, but just in case
    });

    this.timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 15) {
        status.textContent = "Please scroll to the bottom to continue.";
        status.style.color = "#e9c845";
      }
      if (remaining <= 5) {
        status.textContent = "Hurry! Agreement required to proceed.";
        status.style.color = "#e94560";
      }
      if (remaining <= 0) {
        clearInterval(self.timer);
        self.callbacks.onFail("Terms not accepted. Verification failed.");
      }
    }, 1000);
  };

  TermsOfService.prototype._buildTos = function () {
    var shuffled = TOS_FRAGMENTS.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }
    var html = '<p style="font-weight:700;color:#aaa;margin-bottom:8px">DOOMCAPTCHA VERIFICATION SERVICES AGREEMENT</p>';
    for (var k = 0; k < shuffled.length; k++) {
      html += '<p style="margin-bottom:8px"><strong>Section ' + (k + 1) + '.</strong> ' + shuffled[k] + '</p>';
    }
    html += '<p style="margin-bottom:8px"><strong>Section ' + (shuffled.length + 1) + '.</strong> [SECTION REDACTED PURSUANT TO ONGOING LITIGATION]</p>';
    html += '<p style="margin-bottom:8px"><strong>Section ' + (shuffled.length + 2) + '.</strong> [LOADING ADDITIONAL CLAUSES...]</p>';
    return html;
  };

  // ── Challenge: Audio Transcription ───────────────────────────────────
  var AUDIO_WORDS = [
    "alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf",
    "hotel", "india", "juliet", "kilo", "lima", "mike", "november",
    "oscar", "papa", "quebec", "romeo", "sierra", "tango", "uniform",
    "victor", "whiskey", "xray", "yankee", "zulu",
  ];

  function AudioTranscription(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.timer = null;
  }
  AudioTranscription.id = "audio-transcription";

  AudioTranscription.prototype.render = function () {
    var self = this;
    var words = this._pickTwo();
    var loud = words[0];
    var quiet = words[1];
    var remaining = 15;
    var played = false;

    this.container.innerHTML =
      '<div class="doom-challenge-title">Audio Verification</div>' +
      '<div class="doom-challenge-instruction">Type the word you hear</div>' +
      '<div style="text-align:center;margin:16px 0">' +
      '<div class="doom-timer">' + remaining + '</div>' +
      '<div style="font-size:11px;color:#666;margin-bottom:16px">seconds remaining</div>' +
      '<button class="doom-btn doom-audio-play" style="margin-bottom:16px">&#x1f50a; Play Audio</button>' +
      '<div style="margin-top:8px">' +
      '<input class="doom-input" type="text" placeholder="Type the word..." style="max-width:200px;text-align:center" />' +
      '</div>' +
      '<div style="margin-top:12px"><button class="doom-btn doom-audio-submit">Submit</button></div>' +
      '</div>' +
      '<div style="text-align:center;font-size:11px;color:#666" class="doom-audio-status">Click play to hear the verification word</div>';

    var timerEl = this.container.querySelector(".doom-timer");
    var playBtn = this.container.querySelector(".doom-audio-play");
    var input = this.container.querySelector(".doom-input");
    var submitBtn = this.container.querySelector(".doom-audio-submit");
    var status = this.container.querySelector(".doom-audio-status");
    var answered = false;

    this.timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(self.timer);
        if (!answered) {
          answered = true;
          if (!played) {
            self.callbacks.onFail("No audio playback detected. Verification expired.");
          } else {
            self.callbacks.onFail("Transcription timed out.");
          }
        }
      }
    }, 1000);

    playBtn.addEventListener("click", function () {
      played = true;
      playBtn.disabled = true;
      playBtn.textContent = "Playing...";
      status.textContent = "Listen carefully...";

      try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        var duration = 1.2 + Math.random() * 0.6;
        var now = ac.currentTime;

        var fundamentals = [120 + Math.random() * 60, 180 + Math.random() * 60];
        var formantSets = [
          [270, 730, 2300, 3000],
          [390, 1990, 2550, 3300],
          [530, 1840, 2480, 3070],
          [660, 1720, 2410, 3100],
          [300, 870, 2250, 2980],
        ];

        for (var v = 0; v < 2; v++) {
          var f0 = fundamentals[v];
          var formants = formantSets[Math.floor(Math.random() * formantSets.length)];

          var voiceGain = ac.createGain();
          voiceGain.gain.setValueAtTime(0, now);
          voiceGain.gain.linearRampToValueAtTime(0.4, now + 0.05);
          voiceGain.gain.setValueAtTime(0.4, now + duration - 0.1);
          voiceGain.gain.linearRampToValueAtTime(0, now + duration);
          voiceGain.connect(ac.destination);

          var glottal = ac.createOscillator();
          glottal.type = "sawtooth";
          glottal.frequency.setValueAtTime(f0, now);
          for (var t = 0; t < duration; t += 0.15) {
            glottal.frequency.setValueAtTime(
              f0 + (Math.random() - 0.5) * 40,
              now + t
            );
          }

          for (var fi = 0; fi < formants.length; fi++) {
            var bp = ac.createBiquadFilter();
            bp.type = "bandpass";
            bp.frequency.value = formants[fi] + (Math.random() - 0.5) * 100;
            bp.Q.value = 5 + Math.random() * 10;

            for (var ft = 0; ft < duration; ft += 0.08 + Math.random() * 0.12) {
              bp.frequency.setValueAtTime(
                formants[fi] + (Math.random() - 0.5) * 200,
                now + ft
              );
            }

            var fGain = ac.createGain();
            fGain.gain.value = 0.8 / (fi + 1);
            glottal.connect(bp);
            bp.connect(fGain);
            fGain.connect(voiceGain);
          }

          var noiseLen = ac.sampleRate * 2;
          var noiseBuf = ac.createBuffer(1, noiseLen, ac.sampleRate);
          var noiseData = noiseBuf.getChannelData(0);
          for (var ni = 0; ni < noiseLen; ni++) noiseData[ni] = Math.random() * 2 - 1;
          var noise = ac.createBufferSource();
          noise.buffer = noiseBuf;
          var noiseFilt = ac.createBiquadFilter();
          noiseFilt.type = "bandpass";
          noiseFilt.frequency.value = 2500 + Math.random() * 1500;
          noiseFilt.Q.value = 1;
          var noiseGain = ac.createGain();
          noiseGain.gain.value = 0.05;
          noise.connect(noiseFilt);
          noiseFilt.connect(noiseGain);
          noiseGain.connect(voiceGain);
          noise.start(now);
          noise.stop(now + duration);

          glottal.start(now);
          glottal.stop(now + duration);
        }

        setTimeout(function () { ac.close(); }, (duration + 0.5) * 1000);
      } catch (e) {}

      setTimeout(function () {
        playBtn.textContent = "Play Again";
        playBtn.disabled = false;
      }, 2000);

      input.focus();
    });

    function submit() {
      if (answered) return;
      var val = input.value.trim().toLowerCase();
      if (!val) return;
      answered = true;
      clearInterval(self.timer);
      input.disabled = true;
      submitBtn.disabled = true;

      if (val === loud.toLowerCase()) {
        status.innerHTML = 'Incorrect. That was the interference track. The verification word was <strong>' +
          quiet + '</strong>.';
      } else if (val === quiet.toLowerCase()) {
        status.innerHTML = 'Interesting. <strong>' + quiet + '</strong> was the background channel. ' +
          'The primary word was <strong>' + loud + '</strong>.';
      } else {
        status.innerHTML = 'Incorrect. The word was <strong>' + quiet + '</strong>.';
      }
      status.style.color = "#e94560";

      setTimeout(function () {
        self.callbacks.onFail("Audio transcription failed.");
      }, 2500);
    }

    submitBtn.addEventListener("click", submit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
  };

  AudioTranscription.prototype._pickTwo = function () {
    var pool = AUDIO_WORDS.slice();
    var a = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    var b = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    return [a, b];
  };

  // ── Challenge: Color Match ───────────────────────────────────────────
  var STROOP_COLORS = [
    { name: "RED",    hex: "#e94560" },
    { name: "BLUE",   hex: "#4488ff" },
    { name: "GREEN",  hex: "#45e980" },
    { name: "YELLOW", hex: "#e9c845" },
    { name: "PURPLE", hex: "#b045e9" },
    { name: "ORANGE", hex: "#e98045" },
  ];

  function ColorMatch(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  ColorMatch.id = "color-match";

  ColorMatch.prototype.render = function () {
    var self = this;

    var wordIdx, inkIdx;
    do {
      wordIdx = Math.floor(Math.random() * STROOP_COLORS.length);
      inkIdx = Math.floor(Math.random() * STROOP_COLORS.length);
    } while (wordIdx === inkIdx);

    var word = STROOP_COLORS[wordIdx];
    var ink = STROOP_COLORS[inkIdx];

    var swatches = this._pickSwatches(wordIdx, inkIdx);

    this.container.innerHTML =
      '<div class="doom-challenge-title">Color Verification</div>' +
      '<div class="doom-challenge-instruction">Select the color shown below</div>' +
      '<div style="text-align:center;margin:20px 0">' +
      '<div style="font-size:36px;font-weight:900;color:' + ink.hex + ';letter-spacing:4px">' + word.name + '</div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:16px 0" class="doom-color-swatches"></div>' +
      '<div style="text-align:center;font-size:11px;color:#666" class="doom-color-status"></div>';

    var swatchContainer = this.container.querySelector(".doom-color-swatches");
    var status = this.container.querySelector(".doom-color-status");
    var answered = false;

    for (var i = 0; i < swatches.length; i++) {
      (function (swatch) {
        var el = document.createElement("div");
        el.style.cssText =
          "width:56px;height:56px;border-radius:8px;cursor:pointer;" +
          "border:2px solid #303050;transition:border-color 0.15s,transform 0.15s;" +
          "background:" + swatch.hex;
        el.title = swatch.name;

        el.addEventListener("mouseenter", function () {
          if (!answered) el.style.borderColor = "#e0e0e0";
        });
        el.addEventListener("mouseleave", function () {
          if (!answered) el.style.borderColor = "#303050";
        });

        el.addEventListener("click", function () {
          if (answered) return;
          answered = true;

          el.style.borderColor = "#e94560";
          el.style.transform = "scale(0.95)";

          var pickedWord = swatch.name === word.name;
          var pickedInk = swatch.name === ink.name;

          if (pickedWord) {
            status.innerHTML = 'Incorrect. The color <em>displayed</em> was <strong>' +
              ink.name + '</strong>, not the word itself.';
          } else if (pickedInk) {
            status.innerHTML = 'Incorrect. The word clearly reads <strong>' +
              word.name + '</strong>. Read more carefully.';
          } else {
            status.innerHTML = 'Incorrect. The answer was <strong>' +
              (Math.random() > 0.5 ? word.name : ink.name) + '</strong>.';
          }
          status.style.color = "#e94560";

          setTimeout(function () {
            self.callbacks.onFail("Color verification failed.");
          }, 2500);
        });

        swatchContainer.appendChild(el);
      })(swatches[i]);
    }
  };

  ColorMatch.prototype._pickSwatches = function (wordIdx, inkIdx) {
    var picked = {};
    picked[wordIdx] = true;
    picked[inkIdx] = true;
    var result = [STROOP_COLORS[wordIdx], STROOP_COLORS[inkIdx]];

    while (result.length < 4) {
      var r = Math.floor(Math.random() * STROOP_COLORS.length);
      if (!picked[r]) {
        picked[r] = true;
        result.push(STROOP_COLORS[r]);
      }
    }

    for (var i = result.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = result[i]; result[i] = result[j]; result[j] = tmp;
    }
    return result;
  };

  // ── Challenge: Patience Test ─────────────────────────────────────────
  function PatienceTest(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.attempt = 0;
  }
  PatienceTest.id = "patience-test";

  PatienceTest.prototype.render = function () {
    this._showAttempt();
  };

  PatienceTest.prototype._showAttempt = function () {
    var self = this;
    this.attempt++;
    var target = 4.5 + Math.random() * 1.0;
    var displayTarget = target.toFixed(2);

    this.container.innerHTML =
      '<div class="doom-challenge-title">Timing Verification</div>' +
      '<div class="doom-challenge-instruction">Hold the button for exactly <strong>' + displayTarget + ' seconds</strong></div>' +
      '<div style="text-align:center;margin:20px 0">' +
      '<div class="doom-timer" style="font-size:32px;margin-bottom:16px">0.00</div>' +
      '<button class="doom-btn" style="padding:14px 40px;font-size:16px">Hold to Verify</button>' +
      "</div>" +
      '<div style="text-align:center;font-size:11px;color:#666" class="doom-patience-status">Attempt #' + this.attempt + "</div>";

    var timerEl = this.container.querySelector(".doom-timer");
    var btn = this.container.querySelector(".doom-btn");
    var status = this.container.querySelector(".doom-patience-status");
    var holdStart = null;
    var animFrame = null;
    var done = false;

    function tick() {
      if (!holdStart || done) return;
      var elapsed = (Date.now() - holdStart) / 1000;
      timerEl.textContent = elapsed.toFixed(2);
      if (elapsed > 10) {
        done = true;
        self.callbacks.onFail("Button held too long. Maximum duration exceeded.");
        return;
      }
      animFrame = requestAnimationFrame(tick);
    }

    function startHold(e) {
      if (done) return;
      e.preventDefault();
      holdStart = Date.now();
      btn.style.background = "#c23152";
      btn.textContent = "Holding...";
      tick();
    }

    function endHold(e) {
      if (!holdStart || done) return;
      e.preventDefault();
      done = true;
      if (animFrame) cancelAnimationFrame(animFrame);
      var elapsed = (Date.now() - holdStart) / 1000;
      timerEl.textContent = elapsed.toFixed(2);
      btn.style.background = "#303050";
      btn.textContent = "Released";
      btn.disabled = true;

      var diff = Math.abs(elapsed - target);
      var fudgedDiff = diff < 0.05 ? 0.001 + Math.random() * 0.01 : diff;

      var direction = elapsed < target ? "short" : "long";
      status.style.color = "#e94560";
      status.textContent = "Off by " + fudgedDiff.toFixed(3) + "s (" + direction + "). Required precision: \u00B10.001s.";

      setTimeout(function () {
        if (self.attempt >= 3) {
          self.callbacks.onFail("Timing tolerance not met after " + self.attempt + " attempts.");
        } else {
          self._showAttempt();
        }
      }, 2000);
    }

    btn.addEventListener("mousedown", startHold);
    btn.addEventListener("touchstart", startHold);
    btn.addEventListener("mouseup", endHold);
    btn.addEventListener("touchend", endHold);
    btn.addEventListener("mouseleave", function (e) {
      if (holdStart && !done) endHold(e);
    });
  };

  // ── Challenge: Sudoku Trap ───────────────────────────────────────────
  function SudokuTrap(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.timer = null;
  }
  SudokuTrap.id = "sudoku-trap";

  SudokuTrap.prototype.render = function () {
    var self = this;
    var puzzle = this._generate();
    var remaining = 60;

    this.container.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center">' +
      '<div class="doom-challenge-title" style="margin-bottom:0">Sudoku Verification</div>' +
      '<div class="doom-timer" style="font-size:18px">' + remaining + "</div>" +
      "</div>" +
      '<div class="doom-challenge-instruction">Complete the 6x6 grid to verify your humanity</div>' +
      '<div class="doom-sudoku"></div>';

    var gridEl = this.container.querySelector(".doom-sudoku");
    var timerEl = this.container.querySelector(".doom-timer");
    var tripped = false;

    for (var r = 0; r < 6; r++) {
      for (var c = 0; c < 6; c++) {
        var cell = document.createElement("input");
        cell.type = "text";
        cell.maxLength = 1;
        cell.className = "doom-sudoku-cell";

        if (c === 2) cell.classList.add("doom-sudoku-border-right");
        if (r === 1 || r === 3) cell.classList.add("doom-sudoku-border-bottom");

        if (puzzle.clues[r][c] !== 0) {
          cell.value = puzzle.clues[r][c];
          cell.readOnly = true;
          cell.classList.add("doom-sudoku-given");
        }

        (function (input) {
          input.addEventListener("input", function () {
            if (tripped) return;
            var v = input.value;
            if (v === "" || !/^[1-6]$/.test(v)) {
              input.value = "";
              return;
            }
            tripped = true;
            clearInterval(self.timer);
            input.classList.add("doom-sudoku-wrong");
            input.classList.add("doom-shake");
            setTimeout(function () {
              self.callbacks.onFail("Incorrect value entered.");
            }, 1500);
          });
        })(cell);

        gridEl.appendChild(cell);
      }
    }

    this.timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(self.timer);
        if (!tripped) {
          tripped = true;
          self.callbacks.onFail("Time's up. Puzzle incomplete.");
        }
      }
    }, 1000);
  };

  SudokuTrap.prototype._generate = function () {
    var grid = this._solvedGrid();
    var clues = [];
    for (var r = 0; r < 6; r++) {
      clues.push(grid[r].slice());
    }

    var blanks = 20 + Math.floor(Math.random() * 4);
    var positions = [];
    for (var i = 0; i < 36; i++) positions.push(i);
    for (var j = positions.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = positions[j]; positions[j] = positions[k]; positions[k] = tmp;
    }
    for (var m = 0; m < blanks; m++) {
      var pos = positions[m];
      clues[Math.floor(pos / 6)][pos % 6] = 0;
    }

    return { solution: grid, clues: clues };
  };

  SudokuTrap.prototype._solvedGrid = function () {
    var grid = [];
    for (var r = 0; r < 6; r++) {
      grid.push([0, 0, 0, 0, 0, 0]);
    }

    var rows = [], cols = [], boxes = [];
    for (var i = 0; i < 6; i++) {
      rows.push({});
      cols.push({});
    }
    for (var b = 0; b < 6; b++) boxes.push({});

    function boxIdx(r, c) { return Math.floor(r / 2) * 2 + Math.floor(c / 3); }

    function fill(pos) {
      if (pos === 36) return true;
      var r = Math.floor(pos / 6);
      var c = pos % 6;
      var nums = [1, 2, 3, 4, 5, 6];
      for (var i = nums.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = nums[i]; nums[i] = nums[j]; nums[j] = tmp;
      }
      var bi = boxIdx(r, c);
      for (var n = 0; n < nums.length; n++) {
        var v = nums[n];
        if (!rows[r][v] && !cols[c][v] && !boxes[bi][v]) {
          grid[r][c] = v;
          rows[r][v] = true;
          cols[c][v] = true;
          boxes[bi][v] = true;
          if (fill(pos + 1)) return true;
          grid[r][c] = 0;
          delete rows[r][v];
          delete cols[c][v];
          delete boxes[bi][v];
        }
      }
      return false;
    }

    fill(0);
    return grid;
  };

  // ── Challenge: Bigger Number ─────────────────────────────────────────
  function BiggerNumber(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  BiggerNumber.id = "bigger-number";

  BiggerNumber.prototype.render = function () {
    var self = this;
    var a, b;
    do {
      a = 10 + Math.floor(Math.random() * 990);
      b = 10 + Math.floor(Math.random() * 990);
    } while (a === b);

    var small = Math.min(a, b);
    var large = Math.max(a, b);
    var bigFont = 54;
    var smallFont = 18;

    var swapped = Math.random() > 0.5;
    var leftVal  = swapped ? large : small;
    var rightVal = swapped ? small : large;
    var leftSize  = swapped ? smallFont : bigFont;
    var rightSize = swapped ? bigFont : smallFont;

    this.container.innerHTML =
      '<div class="doom-challenge-title">Numerical Reasoning</div>' +
      '<div class="doom-challenge-instruction">Click on the <strong>bigger</strong> number</div>' +
      '<div style="display:flex;align-items:center;justify-content:center;gap:32px;margin:24px 0;min-height:80px">' +
      '<div class="doom-bigger-num" data-side="left" style="font-size:' + leftSize + 'px;font-weight:700;cursor:pointer;color:#e0e0e0;transition:color 0.15s;padding:8px 16px;border-radius:8px">' + leftVal + '</div>' +
      '<div style="font-size:14px;color:#555">or</div>' +
      '<div class="doom-bigger-num" data-side="right" style="font-size:' + rightSize + 'px;font-weight:700;cursor:pointer;color:#e0e0e0;transition:color 0.15s;padding:8px 16px;border-radius:8px">' + rightVal + '</div>' +
      '</div>' +
      '<div style="text-align:center;font-size:11px;color:#666" class="doom-bigger-status"></div>';

    var nums = this.container.querySelectorAll(".doom-bigger-num");
    var status = this.container.querySelector(".doom-bigger-status");
    var answered = false;

    for (var i = 0; i < nums.length; i++) {
      (function (el) {
        el.addEventListener("mouseenter", function () {
          if (!answered) el.style.color = "#e94560";
        });
        el.addEventListener("mouseleave", function () {
          if (!answered) el.style.color = "#e0e0e0";
        });
        el.addEventListener("click", function () {
          if (answered) return;
          answered = true;

          var clickedVal = parseInt(el.textContent);
          var clickedSize = parseInt(el.style.fontSize);

          el.style.color = "#e94560";

          if (clickedVal === large) {
            status.innerHTML = "Incorrect. <strong>" + small + "</strong> was displayed at " +
              bigFont + "px \u2014 it was visually bigger.";
          } else {
            status.innerHTML = "Incorrect. <strong>" + large + "</strong> is numerically larger than " +
              small + ".";
          }
          status.style.color = "#e94560";

          setTimeout(function () {
            self.callbacks.onFail("Wrong number selected.");
          }, 2500);
        });
      })(nums[i]);
    }
  };

  // ── Challenge: Cursed SMS Verification ───────────────────────────────
  function CursedSMS(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.timer = null;
    this.phase = "phone";
  }
  CursedSMS.id = "cursed-sms";

  CursedSMS.prototype.render = function () {
    this._showPhoneEntry();
  };

  CursedSMS.prototype._showPhoneEntry = function () {
    var self = this;
    this.container.innerHTML =
      '<div class="doom-challenge-title">SMS Verification</div>' +
      '<div class="doom-challenge-instruction">Enter your phone number to receive a verification code</div>' +
      '<div class="doom-sms-phone-row">' +
      '<input class="doom-input doom-sms-phone" type="tel" placeholder="(555) 555-5555" maxlength="14" />' +
      '<button class="doom-btn doom-sms-send">Send Code</button>' +
      "</div>" +
      '<div style="font-size:11px;color:#666;text-align:center">Standard messaging rates apply</div>';

    var input = this.container.querySelector(".doom-sms-phone");
    var btn = this.container.querySelector(".doom-sms-send");

    input.addEventListener("input", function (e) {
      var raw = input.value.replace(/\D/g, "");
      var formatted = self._formatPhone(raw);
      var cursorBefore = input.selectionStart;
      input.value = formatted;

      var lastChar = raw.length > 0 ? raw[raw.length - 1] : "";
      var isOdd = lastChar !== "" && parseInt(lastChar) % 2 === 1;

      if (isOdd && cursorBefore > 0) {
        var newPos = Math.max(0, cursorBefore - 1);
        input.setSelectionRange(newPos, newPos);
      }
    });

    btn.addEventListener("click", function () {
      var raw = input.value.replace(/\D/g, "");
      if (raw.length < 10) {
        input.style.borderColor = "#e94560";
        input.classList.add("doom-shake");
        setTimeout(function () { input.classList.remove("doom-shake"); }, 300);
        return;
      }
      self._showCodeEntry(raw);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") btn.click();
    });

    input.focus();
  };

  CursedSMS.prototype._showCodeEntry = function (rawDigits) {
    var self = this;
    var mangledDigits = rawDigits.split("");
    var indices = [];
    for (var i = 0; i < mangledDigits.length; i++) indices.push(i);
    for (var j = indices.length - 1; j > 0; j--) {
      var r = Math.floor(Math.random() * (j + 1));
      var tmp = indices[j]; indices[j] = indices[r]; indices[r] = tmp;
    }
    var picks = indices.slice(0, 3);
    for (var k = 0; k < 3; k++) {
      var d = parseInt(mangledDigits[picks[k]]);
      if (k < 2) {
        mangledDigits[picks[k]] = String((d + 1) % 10);
      } else {
        mangledDigits[picks[k]] = String((d + 9) % 10);
      }
    }
    var mangledNumber = mangledDigits.join("");
    var display = this._formatPhone(mangledNumber);

    var remaining = 30;

    this.container.innerHTML =
      '<div class="doom-challenge-title">SMS Verification</div>' +
      '<div class="doom-sms-sent">Verification code sent to <strong>' + this._esc(display) + "</strong></div>" +
      '<div class="doom-timer" style="margin-bottom:4px">' + remaining + "</div>" +
      '<div style="text-align:center;font-size:11px;color:#666;margin-bottom:12px">seconds remaining</div>' +
      '<div class="doom-sms-code-boxes">' +
      '<input class="doom-sms-code-box" type="text" maxlength="1" />' +
      '<input class="doom-sms-code-box" type="text" maxlength="1" />' +
      '<input class="doom-sms-code-box" type="text" maxlength="1" />' +
      '<input class="doom-sms-code-box" type="text" maxlength="1" />' +
      '<input class="doom-sms-code-box" type="text" maxlength="1" />' +
      '<input class="doom-sms-code-box" type="text" maxlength="1" />' +
      "</div>" +
      '<div style="text-align:center">' +
      '<button class="doom-btn doom-sms-verify">Verify Code</button>' +
      "</div>" +
      '<div style="text-align:center;margin-top:10px;font-size:11px;color:#666" class="doom-sms-status">Didn\'t receive it? Check the number above.</div>';

    var timerEl = this.container.querySelector(".doom-timer");
    var boxes = this.container.querySelectorAll(".doom-sms-code-box");
    var verifyBtn = this.container.querySelector(".doom-sms-verify");
    var status = this.container.querySelector(".doom-sms-status");
    var answered = false;

    this.timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(self.timer);
        if (!answered) {
          answered = true;
          self.callbacks.onFail("Verification code expired.");
        }
      }
    }, 1000);

    for (var b = 0; b < boxes.length; b++) {
      (function (idx) {
        boxes[idx].addEventListener("input", function () {
          if (boxes[idx].value.length === 1 && idx < boxes.length - 1) {
            boxes[idx + 1].focus();
          }
        });
        boxes[idx].addEventListener("keydown", function (e) {
          if (e.key === "Backspace" && boxes[idx].value === "" && idx > 0) {
            boxes[idx - 1].focus();
          }
        });
      })(b);
    }

    boxes[0].focus();

    verifyBtn.addEventListener("click", function () {
      if (answered) return;
      var code = "";
      for (var c = 0; c < boxes.length; c++) code += boxes[c].value;
      if (code.length < 6) {
        status.textContent = "Please enter the full 6-digit code.";
        status.style.color = "#e94560";
        return;
      }
      answered = true;
      clearInterval(self.timer);
      status.textContent = "Invalid verification code.";
      status.style.color = "#e94560";
      setTimeout(function () {
        self.callbacks.onFail("Invalid verification code.");
      }, 1500);
    });
  };

  CursedSMS.prototype._formatPhone = function (digits) {
    if (digits.length === 0) return "";
    if (digits.length <= 3) return "(" + digits;
    if (digits.length <= 6) return "(" + digits.slice(0, 3) + ") " + digits.slice(3);
    return "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6, 10);
  };

  CursedSMS.prototype._esc = function (str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  };

  // ── Challenge: Phantom Word (Canvas OCR) ─────────────────────────────
  var OCR_WORDS = [
    "bridge", "planet", "forest", "marble", "castle", "breeze", "flicker",
    "garden", "prism", "beacon", "copper", "velvet", "anchor", "cipher",
    "riddle", "summit", "lantern", "cobalt", "ember", "quartz", "shadow",
    "oracle", "spiral", "bronze", "mystic", "torque", "zenith", "vortex",
    "nimbus", "pyrite", "scarlet", "glacier", "thunder", "wander", "fable",
    "basalt", "aurora", "mirage", "fossil", "rapids", "timber", "eclipse",
  ];

  function PhantomWord(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  PhantomWord.id = "phantom-word";

  PhantomWord.prototype.render = function () {
    var self = this;
    var words = this._pickWords(6);
    var bait = words[0];
    var correct = words[1];

    this.container.innerHTML =
      '<div class="doom-challenge-title">Text Recognition</div>' +
      '<div class="doom-challenge-instruction">Type the word shown in the image</div>' +
      '<canvas class="doom-ocr-canvas" width="380" height="120"></canvas>' +
      '<div class="doom-ocr-form">' +
      '<input class="doom-input" type="text" placeholder="Type the word..." autocomplete="off" spellcheck="false" />' +
      '<button class="doom-btn">Submit</button>' +
      "</div>";

    var canvas = this.container.querySelector(".doom-ocr-canvas");
    this._drawCaptcha(canvas, words, -1);

    var input = this.container.querySelector(".doom-input");
    var btn = this.container.querySelector(".doom-btn");
    var answered = false;

    function submit() {
      if (answered) return;
      var val = input.value.trim().toLowerCase();
      if (!val) return;
      answered = true;
      input.disabled = true;
      btn.disabled = true;

      self._drawCaptcha(canvas, words, 0);

      var reveal = document.createElement("div");
      reveal.className = "doom-ocr-reveal";

      if (val === bait.toLowerCase()) {
        reveal.className += " doom-ocr-reveal-wrong";
        reveal.innerHTML =
          'The correct word was <strong>' + self._esc(correct) + "</strong>.";
      } else if (val === correct.toLowerCase()) {
        reveal.className += " doom-ocr-reveal-wrong";
        reveal.innerHTML =
          "Close, but <strong>" + self._esc(correct) + "</strong> was a background artifact. " +
          'The actual word was <strong>' + self._esc(words[2]) + "</strong>.";
      } else {
        reveal.className += " doom-ocr-reveal-wrong";
        reveal.innerHTML =
          "Incorrect. The word was <strong>" + self._esc(correct) + "</strong>. " +
          "Look more carefully at the background layers.";
      }
      self.container.appendChild(reveal);

      setTimeout(function () {
        self.callbacks.onFail("Text recognition failed.");
      }, 3000);
    }

    btn.addEventListener("click", submit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
    input.focus();
  };

  PhantomWord.prototype._drawCaptcha = function (canvas, words, highlightIdx) {
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;

    ctx.fillStyle = "#0a0a2a";
    ctx.fillRect(0, 0, w, h);

    this._drawNoise(ctx, w, h);
    this._drawLines(ctx, w, h);

    var layers = [
      { size: 20, alpha: 0.50, y: 22,  angle: 0.18  },
      { size: 24, alpha: 0.50, y: 100, angle: -0.14 },
      { size: 18, alpha: 0.50, y: 42,  angle: 0.22  },
      { size: 16, alpha: 0.50, y: 85,  angle: -0.10 },
      { size: 22, alpha: 0.50, y: 58,  angle: 0.15  },
      { size: 36, alpha: 0.67, y: 62,  angle: -0.04 },
    ];

    var baitIdx = 5;
    var order = [0, 1, 2, 3, 4, 5];

    if (highlightIdx >= 0) {
      layers[highlightIdx].alpha = 0.95;
      layers[highlightIdx].size = 34;
      layers[baitIdx].alpha = 0.12;
      layers[baitIdx].size = 18;
    }

    var wordMap = [1, 2, 3, 4, 5, 0];

    for (var i = 0; i < order.length; i++) {
      var li = order[i];
      var layer = layers[li];
      var word = words[wordMap[li]];

      ctx.save();
      ctx.globalAlpha = layer.alpha;
      ctx.font = "bold " + layer.size + "px 'Courier New', monospace";
      ctx.textBaseline = "middle";

      var tw = ctx.measureText(word).width;
      var tx = (w - tw) / 2 + (li === baitIdx ? 0 : (Math.random() - 0.5) * 80);
      var ty = layer.y;

      ctx.translate(tx + tw / 2, ty);
      ctx.rotate(layer.angle);

      if (li === baitIdx && highlightIdx < 0) {
        ctx.fillStyle = "#e0e0e0";
        ctx.shadowColor = "rgba(233,69,96,0.3)";
        ctx.shadowBlur = 2;
      } else if (li === highlightIdx) {
        ctx.fillStyle = "#45e980";
        ctx.shadowColor = "rgba(69,233,128,0.5)";
        ctx.shadowBlur = 4;
      } else {
        var colors = ["#8888cc", "#aa77aa", "#7799bb", "#bb8899"];
        ctx.fillStyle = colors[li % colors.length];
      }

      for (var c = 0; c < word.length; c++) {
        var ch = word[c];
        var cx = -tw / 2 + ctx.measureText(word.substring(0, c)).width;
        var cy = (Math.random() - 0.5) * 4;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((Math.random() - 0.5) * 0.15);
        ctx.fillText(ch, 0, 0);
        ctx.restore();
      }

      ctx.restore();
    }

    this._drawScanlines(ctx, w, h);
  };

  PhantomWord.prototype._drawNoise = function (ctx, w, h) {
    for (var i = 0; i < 600; i++) {
      ctx.fillStyle = "rgba(" +
        Math.floor(Math.random() * 60) + "," +
        Math.floor(Math.random() * 40) + "," +
        Math.floor(Math.random() * 80) + ",0.3)";
      ctx.fillRect(
        Math.random() * w, Math.random() * h,
        Math.random() * 2 + 1, Math.random() * 2 + 1
      );
    }
  };

  PhantomWord.prototype._drawLines = function (ctx, w, h) {
    for (var i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.bezierCurveTo(
        Math.random() * w, Math.random() * h,
        Math.random() * w, Math.random() * h,
        Math.random() * w, Math.random() * h
      );
      ctx.strokeStyle = "rgba(" +
        (40 + Math.floor(Math.random() * 40)) + "," +
        (30 + Math.floor(Math.random() * 30)) + "," +
        (60 + Math.floor(Math.random() * 60)) + ",0.4)";
      ctx.lineWidth = 1 + Math.random();
      ctx.stroke();
    }
  };

  PhantomWord.prototype._drawScanlines = function (ctx, w, h) {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    for (var y = 0; y < h; y += 3) {
      ctx.fillRect(0, y, w, 1);
    }
  };

  PhantomWord.prototype._pickWords = function (count) {
    var pool = OCR_WORDS.slice();
    var picked = [];
    for (var i = 0; i < count; i++) {
      var idx = Math.floor(Math.random() * pool.length);
      picked.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return picked;
  };

  PhantomWord.prototype._esc = function (str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  };

  // ── Challenge: Always-Wrong Riddles ──────────────────────────────────
  var RIDDLES = [
    {
      q: "What has hands but can\u2019t clap?",
      options: [
        { text: "A clock", why: "A clock has hour and minute hands." },
        { text: "A statue", why: "Statues have sculpted hands that cannot move." },
        { text: "A deck of cards", why: "Card games involve dealt \u201Chands.\u201D" },
        { text: "A watch", why: "A watch has hands, just like a clock." },
      ],
    },
    {
      q: "What has a head and a tail but no body?",
      options: [
        { text: "A coin", why: "Coins have a heads side and a tails side." },
        { text: "A comet", why: "Comets have a visible head and a trailing tail." },
        { text: "A nail", why: "Nails have a flat head and a pointed tail." },
        { text: "A snake", why: "A snake is essentially all head and tail." },
      ],
    },
    {
      q: "What has keys but no locks?",
      options: [
        { text: "A piano", why: "A piano has 88 musical keys." },
        { text: "A keyboard", why: "Computer keyboards have keys for typing." },
        { text: "A typewriter", why: "Typewriters have mechanical keys." },
        { text: "A map", why: "Maps have a legend, also called a key." },
      ],
    },
    {
      q: "What has teeth but cannot bite?",
      options: [
        { text: "A comb", why: "Combs have rows of teeth for hair." },
        { text: "A saw", why: "Saws have serrated teeth for cutting." },
        { text: "A zipper", why: "Zippers have interlocking teeth." },
        { text: "A gear", why: "Gears mesh via their teeth." },
      ],
    },
    {
      q: "What can you catch but not throw?",
      options: [
        { text: "A cold", why: "You catch a cold but can\u2019t throw one." },
        { text: "Your breath", why: "You \u201Ccatch your breath\u201D after running." },
        { text: "A bus", why: "You catch a bus, but you certainly don\u2019t throw it." },
        { text: "Someone\u2019s eye", why: "You \u201Ccatch someone\u2019s eye\u201D to get attention." },
      ],
    },
    {
      q: "What gets wetter the more it dries?",
      options: [
        { text: "A towel", why: "A towel absorbs water as it dries things." },
        { text: "A sponge", why: "A sponge soaks up liquid while wiping surfaces dry." },
        { text: "A mop", why: "A mop gets wetter as it dries the floor." },
      ],
    },
    {
      q: "What has a neck but no head?",
      options: [
        { text: "A bottle", why: "Bottles have a narrow neck opening." },
        { text: "A shirt", why: "Shirts have a neckline." },
        { text: "A guitar", why: "Guitars have a long fretted neck." },
        { text: "A vase", why: "Vases taper to a narrow neck." },
      ],
    },
    {
      q: "What runs but never walks?",
      options: [
        { text: "Water", why: "Water runs downhill constantly." },
        { text: "A refrigerator", why: "A fridge \u201Cruns\u201D but doesn\u2019t walk." },
        { text: "A nose", why: "Your nose \u201Cruns\u201D when you\u2019re sick." },
        { text: "A clock", why: "Clocks \u201Crun\u201D to keep time." },
      ],
    },
    {
      q: "What has an eye but cannot see?",
      options: [
        { text: "A needle", why: "Needles have an eye for threading." },
        { text: "A hurricane", why: "Hurricanes have a calm central eye." },
        { text: "A potato", why: "Potatoes have growth buds called \u201Ceyes.\u201D" },
      ],
    },
    {
      q: "What is 8 \u00F7 2(2+2)?",
      options: [
        { text: "16", why: "Left-to-right evaluation: 8\u00F72=4, then 4\u00D74=16." },
        { text: "1", why: "Implicit multiplication binds tighter: 2(4)=8, then 8\u00F78=1." },
      ],
    },
    {
      q: "If you have 3 apples and take away 2, how many do you have?",
      options: [
        { text: "2", why: "You took 2 apples, so you have 2." },
        { text: "1", why: "3 minus 2 equals 1 remaining." },
        { text: "3", why: "All 3 still exist \u2014 you just moved 2 of them." },
      ],
    },
    {
      q: "How many months have 28 days?",
      options: [
        { text: "1", why: "Only February has exactly 28 days." },
        { text: "12", why: "Every month has at least 28 days." },
      ],
    },
    {
      q: "I am an odd number. Take away one letter, and I become even. What am I?",
      options: [
        { text: "Seven", why: "Remove the \u2018s\u2019 and you get \u201Ceven.\u201D" },
        { text: "Eleven", why: "Remove \u2018el\u2019 and you\u2019re left with \u201Ceven.\u201D" },
      ],
    },
    {
      q: "What breaks yet never falls, and what falls yet never breaks?",
      options: [
        { text: "Day and night", why: "Day breaks at dawn; night falls at dusk." },
        { text: "Dawn and dusk", why: "Dawn breaks each morning; dusk falls each evening." },
        { text: "A wave and rain", why: "Waves break on shore; rain falls from clouds." },
      ],
    },
    {
      q: "The more you take, the more you leave behind. What am I?",
      options: [
        { text: "Footsteps", why: "Every step taken is a footprint left behind." },
        { text: "Photographs", why: "Each photo taken becomes a memory left behind." },
        { text: "Breaths", why: "Each breath taken is exhaled and left in the past." },
      ],
    },
    {
      q: "I have cities but no houses. I have mountains but no trees. What am I?",
      options: [
        { text: "A map", why: "Maps show cities and mountains as symbols." },
        { text: "A globe", why: "Globes depict geography without actual structures." },
        { text: "An atlas", why: "Atlases contain maps of cities and terrain." },
      ],
    },
    {
      q: "What can fill a room but takes up no space?",
      options: [
        { text: "Light", why: "Light illuminates every corner with zero mass." },
        { text: "Sound", why: "Sound waves fill a room without occupying volume." },
        { text: "Darkness", why: "Darkness fills a room as the absence of light." },
        { text: "A smell", why: "An odor permeates a room with no visible presence." },
      ],
    },
    {
      q: "I\u2019m tall when I\u2019m young and short when I\u2019m old. What am I?",
      options: [
        { text: "A candle", why: "Candles burn down from tall to short." },
        { text: "A pencil", why: "Pencils start long and shorten with use." },
        { text: "A piece of chalk", why: "Chalk wears down as it writes." },
        { text: "A human", why: "People lose height as they age." },
      ],
    },
    {
      q: "I have branches but no fruit, trunk, or leaves. What am I?",
      options: [
        { text: "A bank", why: "Banks have branch locations." },
        { text: "A library", why: "Library systems have branch buildings." },
        { text: "A river", why: "Rivers have tributary branches." },
        { text: "A government", why: "Governments have legislative, executive, and judicial branches." },
      ],
    },
    {
      q: "What color is a white horse?",
      options: [
        { text: "White", why: "It says \u201Cwhite horse\u201D right in the question." },
        { text: "Gray", why: "Most \u201Cwhite\u201D horses are genetically gray." },
        { text: "No color", why: "White is all wavelengths combined, not a true color." },
      ],
    },
    {
      q: "How many animals did Moses take on the Ark?",
      options: [
        { text: "Zero", why: "It was Noah\u2019s Ark, not Moses\u2019." },
        { text: "Two of each kind", why: "The Bible says two of every animal were brought aboard." },
        { text: "More than two of some", why: "Genesis 7:2 specifies seven pairs of clean animals." },
      ],
    },
    {
      q: "Which came first, the chicken or the egg?",
      options: [
        { text: "The egg", why: "Eggs existed millions of years before chickens evolved." },
        { text: "The chicken", why: "The first chicken hatched from a proto-chicken\u2019s egg." },
        { text: "Neither", why: "Evolution is a spectrum; there\u2019s no hard boundary." },
      ],
    },
    {
      q: "How many sides does a circle have?",
      options: [
        { text: "Zero", why: "A circle has no straight sides." },
        { text: "One", why: "A circle has one continuous curved side." },
        { text: "Two", why: "A circle has an inside and an outside." },
        { text: "Infinite", why: "A circle is the limit of a polygon with infinitely many sides." },
      ],
    },
    {
      q: "Is a hotdog a sandwich?",
      options: [
        { text: "Yes", why: "Filling between bread meets the structural definition." },
        { text: "No", why: "The USDA classifies hotdogs separately from sandwiches." },
        { text: "It\u2019s a taco", why: "The Cube Rule of Food classifies it as a taco." },
      ],
    },
    {
      q: "If a tree falls in a forest and no one hears it, does it make a sound?",
      options: [
        { text: "Yes", why: "Falling creates sound waves regardless of observers." },
        { text: "No", why: "\u201CSound\u201D requires a perceiver; otherwise it\u2019s just pressure waves." },
        { text: "It depends", why: "The answer is definitional, not empirical." },
      ],
    },
    {
      q: "What word in the English language is always spelled incorrectly?",
      options: [
        { text: "Incorrectly", why: "The word \u201Cincorrectly\u201D is always spelled I-N-C-O-R-R-E-C-T-L-Y." },
        { text: "Wrong", why: "The word \u201Cwrong\u201D is always spelled W-R-O-N-G." },
      ],
    },
    {
      q: "A rooster lays an egg on top of a barn roof. Which way does it roll?",
      options: [
        { text: "It doesn\u2019t \u2014 roosters don\u2019t lay eggs", why: "Roosters are male and biologically cannot lay eggs." },
        { text: "Down the steepest side", why: "If we accept the premise, gravity dictates the direction." },
        { text: "It doesn\u2019t roll \u2014 it sits on the peak", why: "If balanced on the ridge, it has no reason to roll." },
      ],
    },
    {
      q: "If you replace every plank of a ship, is it still the same ship?",
      options: [
        { text: "Yes", why: "Continuity of identity is maintained through gradual change." },
        { text: "No", why: "None of the original material remains." },
        { text: "There are now two ships", why: "If you reassemble the old planks, both ships exist." },
      ],
    },
    {
      q: "What travels around the world while staying in a corner?",
      options: [
        { text: "A stamp", why: "Stamps sit in the corner of envelopes sent worldwide." },
        { text: "A web server", why: "Servers sit in racks but serve content globally." },
      ],
    },
    {
      q: "What is the capital of Australia?",
      options: [
        { text: "Canberra", why: "Canberra is the official capital of Australia." },
        { text: "Sydney", why: "Sydney is the largest and most internationally recognized city." },
        { text: "Melbourne", why: "Melbourne served as the capital from 1901 to 1927." },
      ],
    },
  ];

  var CONDESCENDING = [
    "Our records indicate otherwise.",
    "That\u2019s what a bot would say.",
    "Interesting choice. Unfortunately, wrong.",
    "So close, yet so far.",
    "Almost. But no.",
    "Our verification AI disagrees.",
    "The committee has reviewed your answer. It was rejected.",
    "Peer review suggests otherwise.",
    "A valiant attempt. Denied.",
  ];

  function AlwaysWrongRiddles(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.usedIndices = {};
  }
  AlwaysWrongRiddles.id = "always-wrong-riddles";

  AlwaysWrongRiddles.prototype.render = function () {
    var self = this;
    var riddle = this._pickRiddle();
    var options = this._shuffle(riddle.options.slice());
    var letters = ["A", "B", "C", "D"];

    var optionsHtml = '<ul class="doom-riddle-options">';
    for (var i = 0; i < options.length; i++) {
      optionsHtml +=
        '<li class="doom-riddle-option" data-idx="' + i + '">' +
        '<span class="doom-riddle-letter">' + letters[i] + "</span>" +
        "<span>" + this._esc(options[i].text) + "</span>" +
        "</li>";
    }
    optionsHtml += "</ul>";

    this.container.innerHTML =
      '<div class="doom-challenge-title">Knowledge Verification</div>' +
      '<div class="doom-challenge-instruction">Answer correctly to proceed</div>' +
      '<div style="font-size:15px;font-weight:600;color:#e0e0e0;margin-bottom:4px">' +
      this._esc(riddle.q) + "</div>" +
      optionsHtml;

    var optionEls = this.container.querySelectorAll(".doom-riddle-option");
    var answered = false;

    for (var j = 0; j < optionEls.length; j++) {
      (function (el, idx) {
        el.addEventListener("click", function () {
          if (answered) return;
          answered = true;

          el.classList.add("doom-option-selected");

          var thinkingEl = document.createElement("div");
          thinkingEl.className = "doom-riddle-thinking";
          thinkingEl.innerHTML = 'Analyzing response<span class="doom-riddle-dots"></span>';
          self.container.appendChild(thinkingEl);

          setTimeout(function () {
            thinkingEl.remove();
            el.classList.remove("doom-option-selected");
            el.classList.add("doom-option-wrong");

            var correctIdx = self._pickDifferent(options, idx);
            optionEls[correctIdx].classList.add("doom-option-correct");

            var snark = CONDESCENDING[Math.floor(Math.random() * CONDESCENDING.length)];
            var explanation = document.createElement("div");
            explanation.className = "doom-riddle-explanation";
            explanation.innerHTML =
              "<strong>" + snark + "</strong> The correct answer was <strong>" +
              self._esc(options[correctIdx].text) + "</strong>. " +
              self._esc(options[correctIdx].why);
            self.container.appendChild(explanation);

            setTimeout(function () {
              self.callbacks.onFail("Incorrect answer.");
            }, 3000);
          }, 1200 + Math.random() * 800);
        });
      })(optionEls[j], j);
    }
  };

  AlwaysWrongRiddles.prototype._pickRiddle = function () {
    var available = [];
    for (var i = 0; i < RIDDLES.length; i++) {
      if (!this.usedIndices[i]) available.push(i);
    }
    if (available.length === 0) {
      this.usedIndices = {};
      available = [];
      for (var j = 0; j < RIDDLES.length; j++) available.push(j);
    }
    var pick = available[Math.floor(Math.random() * available.length)];
    this.usedIndices[pick] = true;
    return RIDDLES[pick];
  };

  AlwaysWrongRiddles.prototype._pickDifferent = function (options, chosenIdx) {
    var candidates = [];
    for (var i = 0; i < options.length; i++) {
      if (i !== chosenIdx) candidates.push(i);
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  AlwaysWrongRiddles.prototype._shuffle = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  };

  AlwaysWrongRiddles.prototype._esc = function (str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  };

  // ── Semantic Minefield ──────────────────────────────────────────────
  var FOOD_IMAGES = [{n:"pizza",b64:"data:image/jpeg;base64,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"},
      {n:"apple",b64:"data:image/jpeg;base64,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"},
      {n:"soup",b64:"data:image/jpeg;base64,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"},
      {n:"burger",b64:"data:image/jpeg;base64,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"},
      {n:"sushi",b64:"data:image/jpeg;base64,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"},
      {n:"shoe",b64:"data:image/jpeg;base64,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"},
      {n:"clock",b64:"data:image/jpeg;base64,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"},
      {n:"book",b64:"data:image/jpeg;base64,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"},
      {n:"keys",b64:"data:image/jpeg;base64,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"},
      {n:"cactus",b64:"data:image/jpeg;base64,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"},
      {n:"tomato_plant",b64:"data:image/jpeg;base64,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"},
      {n:"empty_plate",b64:"data:image/jpeg;base64,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"},
      {n:"dog_bowl",b64:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAwICQoJBwwKCQoNDAwOER0TERAQESMZGxUdKiUsKyklKCguNEI4LjE/MigoOk46P0RHSktKLTdRV1FIVkJJSkf/2wBDAQwNDREPESITEyJHMCgwR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQOeOnQdqT8vyp7Dn8BRitDMbz7flRz6D8qnt7Z7iURxjnuewrXh0u3iO9yZCOmelS5JDUXIZbH7JYrGqgSP8AM5wM/SoxMd/UflVmdO571UWMG4Psua45NtnbFJIUSE/eAP4CqeqeYsRkjwfYj/61XvKy3y5J+lM8ppJkQghQfm7YFUo6EuWpxNxdGSU56E1BdndADxke1dPrS6fNLIWgVAnR48Kf/r1zdzC3kM6fPH2Yd6zaszRO6EtT8wbA6Z6Vma07yL5S9M5atW0QsyRjqcCotdshDK+0YXt71cY31M5OzsYFumK07YEc1RtwGOB61owjamfWkxo6LTwVs04HPPSrKk7hwOvpTIE228Y9FFSoPmH1rtirJI4ZO7bLZHP4CnRRGSRUHGe/pSkc/gKmBEFk9yOSjfMB6CpnLli2aQjzySNCzRI96RjgdSe5qx58W0H7xJxgVT011kR5FOQ3+FS6FCjWfnZLM8jNk9snp+WK5oNtnVNJIsTAuMkVUjjAnb1I4rQuFC8DrWezf6SoHTFOW4ovSxIHFspIG4+9Zl1r0UcbCYCIngPjIzV25XchYttUelcVqU6zXEm3IjJxinKXKiYx5mZ99ftcXPnI3GSpA6VWhvZIkkjDYKnI+lNk5R27h9pqlcfI5YH7wrnOg6nRRHPdJIP7u7FXNftw9l5mMkcVn+E0cyAj7qx/N+PSug1GLdp7Z9a6qX8M5ar/AHh57bRFLhwRjnNatrEZruKEdAcmqipi8Oexre0O14e4Yck4WpUbysVKVo3NMjiiMfMPrUuyhE+cfWus4zXNg+fvJ0Hf2p62hWCWN2Uq64IBpTJyPlHQfypRJ/sis3qrM1i+V3RV0JGghWKQ9Gx+FaOgIsVtPCMjZO5qooKuSo4JzT3V/OmSNzGJkyWXqpI4IrmhFp2Z1VJKUbouXcyh+WBz6Gsm8laOVDkcOAfx4rAktdes9WRJrozW+Tu5AOOxxjmtN45Gs97A7jMuM+zCiWoRVi5q0vlWaoZAskgwCe1chPBCseY7pJXB5XGCPpT/AIhS3UePJL/OMLj9a5zR7GUzC4uXLMPurnge9KdrDhdFuRAPPHqQf0NUZRuOT2rUukItHkCnBlAz+FWvC+j/ANo3/wBomXNrAQWz0duy/wCNZpNuxo2krs6XwvpJt9ISSZtkk3zlSOQOw/z61Z1mMQ2JAbIHOa01MjMFXr9KwfFl35VqYQfnPWu23LGxw35pXOW06zkvr/y4+rHr6Dua7iDS4oIUjWXhRjpWf4asxaaesxGJJRnPoO1a3mv/AHqUI21HUlfQb9gj/wCev6U5LCLeP3p60ebJ/eNIs0m8fMetaXZnYqtrOmZ/4/7boP8AloKP7a0sf8xC2/7+isj+x7IkBLWELjrsFH9iWXa2i/75rD2j7HR7JdzX/tzSv+gjbf8AfwVYk1SwSOO5kvIVhkXCSFxhiPQ1z0ukWR+QW0fHU7RSyWMTRpEYlMaZKIRwueuBSc27Ow1TSurnZafLa6laLNDLHOqMVDIc/hTryBCVGO4OKyPCMXkPPDGoWM4bA6Z6Vo6lchLtR15Aqt1cm1nZHLeLGMl2kZxsA6ViRRBDwc1teKEb7SsnJzWPGu7aoPVgP1rmmveOmD90t6hfaS+hLpkc3+mqwcLsPL9xnp0rQ07xBomn6dDafaSGjXDgRMfm79vWp1tIjhTGpwvcComtkRfljUH6Vop2exm4cytc1NI16x1C4lSxkd3SMscoVAH41y2tSmW73Sk7S+fwrpNKK2tjczsqgt8vSuXZzdau7Hop4rSUroyUbSsag8XaNHGqAzkKMcQtUZ8Z6SOi3R+kJqKRcdFH5VAyc52j8qPaPsV7KPcst4007tb3Z/7ZGoz42sVIItLs/wDbOoSo6bQPwpjRcjgY+lL2kuweyj3Oiw644ycCnB2AOVA/GkLY5Y4GBUQlDtxwO1Rc05SRm4+6MetM3bmCqpJNKzAY5Gan0+PzLpX6hPmIH6frTuJqyNTSbaS0Z/NZQXAwB2NYGqaqsl47IMGGQ7gT6cVuapKIkOOW747e9eZ+I7bVpLqSSWHKSdZrbJDn/aXsfXtWyWhg3qT33iR77URalAQ5PzBumKjkv4rFBK55HQZ61zlpaXwcy2UDzEkqGVSfrx/WrTabqXmstxGZCDg4+bkdQMelYz5b3uaxvax00XjBnl/49osgcjef8KsQ+KI5n2tDEozgnzDx+lcvBp0okKM207tnQjn09zjtUzWhhjDEk4bO7HB4GCf8Kzclc0UXY7nULjFtBGpiZHXcoinQk579qxooLm2ma4a2mMTfxlcj8xWPLp0jJHG255JCViGcDPXOatxrc2YjWCcwsGOdrnJ5wD+dP2sHuT7KS2NYXJmGVVaiZpO6D8DVWzu7y4vPMvxFFBg5bG1n/D19xU3mbslWDKeQR3Fb2srmV7uzEZmI5XioxK7HA6jrSFmDEVXlZkcOPx+lDBM33mErBVbCep71KoCLuJwP51EqLkfKAAKmR0UjKBiORntXNc6gVSRlzz39vapY3eKQNGcP274pqSDBbHGeKnt4yxDYPHTmlzXeg7aalC1k1WXUZjfXCSRFegTBJzx+GK2YTsZXAG4d8VQSaOS9nijHELBWYdCetX4+mfSvcw0LUVzdT5vG1f8AaHyPYs+TYXKu09hCWKkFkGwke+Kyrm2tFJMcBQY24WQjj0rTD7YHHrxWbO3FUsNTm/eRDxtamlyso/6OkbxMjojZyVxnn3xUTS6YtuIH+0bFXaMdfrn1onPFZ8/eh5fQ3sZRzfEt20/r5hfX1sHL2glSQ/KM4CgegHb8KpSao1rbqrwpLIxOHJI2j0qG54IPvUF+MxKfRqylhqcNkdkMZWqLVlC4uppXfLbVbqq8CtzSZQ9hGCeVJWuck+9WhptyYkCkEhjxj1rCrH3dDrozbl7zNyQjrmo5NrDg1Xadj/A35VC0rZ+4/wCVcp2o6zD7QFAGR1NOZEGNzMPpS88ZHYUyQmRdqj8a4rnXYUSIrLhuB0FaMEmEBHX+VZkNthwzc1fjGYz156VUWDSMOxvktL+WC5+Vmbk+voa6FJUeIGN1bJ7Guf1bTxc3kUSko5DMWHXA7fmRVezF/pcuTEtzGP7rYP5H/GvXo4xKKjM8TEZe5ScoM652whrNmf5RzVSTxRGseJbeZPaSIkfnzWXP4osQCGhJ91b/ABrtp16fc86vg63RF+ZuKoTmqr+J9NI5in/Sq0niTTT0inP5Vq8RS/mOKOCxCfwC3VRXYLWxwM4wagm8Q2Z/1dmzf771Ul126mGyCBEHYKua5p1qXc9Cjh6y+z+Iht5JDkKfrQs6RTRwxsHkLAEr0UZBI+vFQeRqd6fmWTaT/F8orX0rw+EkWS5k+YdAtcFTERWiPVpYaW7Lcas/Sp0tGYjitaG3giUbVB+tSDbvAwBXG6nY7lT7k6KS43cDAqcKC2cfKOnpUZRsg7T0FPXeo5U464xXLc2JOMY60pcrg9gKjLMM/KfypksmyCSRgQqgk1SeoivFL5l7PMewEa/hyf1P6VbQJIQCKx7dnWFc5yeTx3PNaKCVSGGefauyD7mbWhbntLf+FBisa5tYmcjylI91zWjJO5Tvke1UmaRiSvOfatZQjIzUpIpHSbN/vW0P/fsVSh0ez8+cCJDiQ9VHArZV3GdyVUtpvnnypH74jpXPKNtmbx13RBJp9sgBSJB9EFNaOMKAoAI7kVdmfPITIqvuQ9VyfpWLRZXtG2NKuTgEHH4f/WrSgKngDmstRi9YBSN6fyP/ANer9tn1pCLoPy+9JklxzTcMPf8AGmZYNjHTqaYj/9k="},
      {n:"gourds",b64:"data:image/jpeg;base64,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"},
      {n:"wax_fruit",b64:"data:image/jpeg;base64,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"}];

  function SemanticMinefield(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  SemanticMinefield.id = "semantic-minefield";

  SemanticMinefield.prototype.render = function () {
    var self = this;
    var remaining = 20;
    var clearFood = FOOD_IMAGES.slice(0, 5);
    var clearNot = FOOD_IMAGES.slice(5, 10);
    var ambiguous = FOOD_IMAGES.slice(10, 15);

    var grid = [];
    var ambiguousIndices = [];

    function pick(arr, n) {
      var copy = arr.slice();
      var out = [];
      for (var i = 0; i < n && copy.length; i++) {
        var idx = Math.floor(Math.random() * copy.length);
        out.push(copy.splice(idx, 1)[0]);
      }
      return out;
    }

    var chosen = pick(clearFood, 3).concat(pick(clearNot, 3)).concat(pick(ambiguous, 3));
    for (var s = chosen.length - 1; s > 0; s--) {
      var r = Math.floor(Math.random() * (s + 1));
      var tmp = chosen[s]; chosen[s] = chosen[r]; chosen[r] = tmp;
    }
    grid = chosen;

    for (var ai = 0; ai < grid.length; ai++) {
      for (var aj = 0; aj < ambiguous.length; aj++) {
        if (grid[ai].n === ambiguous[aj].n) ambiguousIndices.push(ai);
      }
    }

    var selected = {};

    var html =
      '<div class="doom-challenge-title">Image Classification</div>' +
      '<div class="doom-challenge-instruction">Select all squares containing <strong>food</strong></div>' +
      '<div style="text-align:center;margin:12px 0">' +
      '<div class="doom-timer">' + remaining + '</div>' +
      '<div style="font-size:11px;color:#666;margin-bottom:12px">seconds remaining</div>' +
      '<div style="display:inline-grid;grid-template-columns:repeat(3,1fr);gap:4px;max-width:300px">';

    for (var gi = 0; gi < grid.length; gi++) {
      html += '<div class="doom-food-cell" data-idx="' + gi + '" style="position:relative;cursor:pointer;border:3px solid transparent;border-radius:4px;overflow:hidden">' +
        '<img src="' + grid[gi].b64 + '" style="width:100%;display:block;pointer-events:none" />' +
        '<div class="doom-food-check" style="display:none;position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(78,205,196,0.35);border:3px solid #4ecdc4;border-radius:4px;pointer-events:none">' +
        '<span style="position:absolute;top:4px;right:6px;color:#4ecdc4;font-size:20px;font-weight:bold">&#x2713;</span></div>' +
        '</div>';
    }

    html += '</div>' +
      '<button class="doom-btn doom-submit" style="margin-top:12px">Verify Selection</button>' +
      '</div>';

    this.container.innerHTML = html;

    var timerEl = this.container.querySelector(".doom-timer");
    var timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 5) timerEl.style.color = "#e94560";
      if (remaining <= 0) {
        clearInterval(timer);
        self.callbacks.onFail("Classification timed out");
      }
    }, 1000);

    var cells = this.container.querySelectorAll(".doom-food-cell");
    for (var ci = 0; ci < cells.length; ci++) {
      cells[ci].addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-idx"));
        var check = this.querySelector(".doom-food-check");
        if (selected[idx]) {
          delete selected[idx];
          check.style.display = "none";
        } else {
          selected[idx] = true;
          check.style.display = "block";
        }
      });
    }

    this.container.querySelector(".doom-submit").addEventListener("click", function () {
      clearInterval(timer);
      for (var fi = 0; fi < ambiguousIndices.length; fi++) {
        var ambIdx = ambiguousIndices[fi];
        if (selected[ambIdx]) {
          delete selected[ambIdx];
        } else {
          selected[ambIdx] = true;
        }
      }

      var wrong = [];
      for (var wi = 0; wi < grid.length; wi++) {
        var isFood = false;
        for (var wf = 0; wf < clearFood.length; wf++) {
          if (grid[wi].n === clearFood[wf].n) isFood = true;
        }
        for (var wa = 0; wa < ambiguous.length; wa++) {
          if (grid[wi].n === ambiguous[wa].n) {
            isFood = !!selected[wi];
          }
        }
        var userSelected = !!selected[wi];
        if (userSelected !== isFood) wrong.push(grid[wi].n.replace(/_/g, " "));
      }

      if (wrong.length === 0) wrong.push("edge case misclassification");
      self.callbacks.onFail("Incorrect. Misclassified: " + wrong.slice(0, 3).join(", ") + ". Please try again.");
    });
  };

  // ── Face Direction ─────────────────────────────────────────────────
  var FACE_IMAGES = ["data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAwICQoJBwwKCQoNDAwOER0TERAQESMZGxUdKiUsKyklKCguNEI4LjE/MigoOk46P0RHSktKLTdRV1FIVkJJSkf/2wBDAQwNDREPESITEyJHMCgwR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDZYnI6dB2pMn2/Klbr+ApKYgyfb8qMn2/KiigAyfb8qTJ9vypaKAEyfb8qTJ9B+VLikxQAmT7flTcn2/KnEUlIQ3J9vypCT6D8qU0lACZPt+VISfb8qWkIpjEJPt+VCk7h06+lBFC/eH1oAuN1/AUlObr+ApKAEopaTFACVSuNVtIX2bzI2cHZyB+NUda1J8i2tBn++3tWZAj7gNi5/SpchpGlNq11M221UIPXGTSC11K84eS8Gf7mAP5VoaTBGHDyMXI7AbVFXr/VxZjESbh3JqblpGdZ+H7yNtzT3AHqev8AgauywSW0LSSNvVepAwfxFUzqct0S8UkkTjsGODU8FzPOuyZi5PGT3oUhuBUk1e0iP7xnUeuw4qzDPDcRiSCRZFPdTU81rDd2LYRBIgweOtcugfS75pIFIU/eUng07kOJ0tJUVpdxXcW+In/aU9QamqyRhFCj5h9acRSD7w+tAFtuv4CkpzdfwFJQAlUdVvPskChSPMkYKvt71dkbZGz4ztBNcHqV/NfXYkL4IPyIDjH0pN2Glc0LlyZAMrtIHX1pUOzgEZ9u341XSdZuSuD3HcGpoVDP1yB6VkaJHQ6MitEzyZZQOcjj8u9UZrefUr0nYUhB+Vev51o6aJZoxDENqjqwFdFa2SW0eCASe9ZuV9jeNO2rMG30d41AxjirQsjDyo5HTP8AOtxUGzk1UusDjIzSbZokmZAuV03O9CyH7zEVjasYrgGSNcBuhrYuyrq6scisSWIqWXHykZFXCV9DGpC2pnWN4bK8AY5U8NXTqQ6BlOQRkGuNvA+8qOvoa62wVlsYQ3UIK2RzslpAPmH1p9IB8w+tUSWm6/gKSlbr+ApKAKupT/Z7CaXGcLXIwWsDqDJCQx6kMa6jXm26W/uQP1rFsEO4PnA/SoZSKMlo5uAkK4Hc5zW1o1hEI/Ou5Aig8ZOKZH/x8S4A/Crtr9l+yNLc4bBICnoP/rmsZnTTXU6PTVtvLDW8ikexzVyUk9gRXCreFZ/9Ci24bkBwMfUZ4rodL1h7jMM6FJk6qetQbO+5sw5AztUfhUF6NwJZyo+uKq6jqqWMG9wcngADnNcvqGq3M8xWWNwnGVB5H1/wo6CV73NK4lgctHDMrOOo3ZNZt1J8qDvjPHtU1sNPmtyUQpIvXjDA1nzu4ZTngHBNVDRkVNUVLnG/dtJBNdPaSia2RwMZFc5NucYRua09AdxC8LnODuH41ujkZqmkH3h9aU0L94fWrJLLdfwFJTm6/gKbQBV1K3FzZPGe9c3DMsBaKUMmDiuuNULmwhkdnK8n8qlq407FKyjjEClWLeY3U1fudFW4hVAWRfvYU4JNYa3DWV+bd8hUbKk+hrsrO5SaIAA+ua557nbSV0YWneEo4LtZWmmEQywjKhQCRgnPWtu30y2t545YhlwMFj1YVoqgxl2LcVVEzNckBCEPRz3pNlWtoR6lYw3c8fnrlV5wDisTVvC63CqLaZ4RhlfaudwP1/nXQX7PDgohcnooPWpLaRbi2SVCVOP85oTswtdHIw6A9rOuyaQxhNhVx1Pr/wDWqO+t1g3xkAgDNdPdOkeWdskdK5LVZjeavb20LYLtlseg6046sVRWgQxlSBsX8W5rU0uEo0jEYyBTk02NXypIH1q5GixqFUYFdCRxNimhfvD60GhfvD61RJabr+AptK3X8BSUAFJRRQBia9YSSuLmFN5A+cDrx3q3ot4EhT5uMVebBGD0NYNrbOsksKtteNuPpWFRdTpoT1sdVNe71WGNsM/cdh3NYF6ur29wJoblZYE48rb2+vrVhrK4tIBNHKJJHH8RwB7VTTVNWRyktrET6DBz+ZrJanUk5bDpLrVtRmQW261RPvO4BJ+lbFlK1oPLkffvG4t796w7jV9QjPy2SAenHP61PA15foFlg+zyH5hhgabQNOO5b1a7UROwPOKyNBtG8yW+mTDP8sZPXHc1HqUNwrCKQgliFUDuc1txqI41ReigAfhWlKPU5q876D6KSlrc5RKB94fWikH3h9aALLdfwFJSt1/AU2gAzRTljdsYU80NCwXnrVKDZEppGbq2px6faPK3JUVyWjeIZpNbJvGwsy/Ln+EjtWl4uWQzW1tGOSDIf5f41xrq0cwcHmKT8xUVF9k1pXa5z12K9hngELEZxTY7TdnDgAH+IZrgbe7nt2WSJyR6E5FdJb+JFjjV5TsyOSelctjuUjYkssEHfHkei01JIrYbi2XI4NZ03iS3ljJSQNjrtFcnrWvT3G5oWaNF4XB5NNRuEp9TT13xAllrcA2CQqNzj+7np+NdDZ3cN5AssLZBGcdxXl1uhklEk7lizZYk8k113hMkCeEE7UIZPx610wj0OGo38Z1dLSRqWX3pzRsvVSKtxaMozUthppB94fWlNIv3h9aksurEWcA9MCrUUKgjCipBEeMKcYHb2qREYY+U/lWySRzSbb1ECU1ox3FWNjZ+6fyprI3cN+VMk4fx2DC1tMm3BBXn1/ya40o0F4gIDiYcjH+fWvVNe0f+1bExshV4zvjOOc//AF64HVrIlra6AYu7Hco/hHQZ9+K56ukvU78O+aHoV7eNwrRuNrL1BqO94jiTPBJNXIVnkHmyJlkXDAHnApLmwkllRkUtGVyGA4ya55Kx1rUp28ZAcA9VrOFtJcABRkKa3nspokDbGAUc8VTu7SWyWNIyC7sA2DTiKS01KH2dnKiPG4nC57j1rsvCMMqXU0Fyisdgbeo4IzjFYItCjo+WDIwjCkdR616Lo2nyWtuHdCJJACwI5A7Cuikru5zV7Rg092WEt0GMCpzGCvIzUiowP3D+VOKMB90/lXQ2eckUbi0R1yo2t7VmyRtFIFcY5reZGwPlP5VXuLUy4yp6+lQ1c2hJo//Z",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAwICQoJBwwKCQoNDAwOER0TERAQESMZGxUdKiUsKyklKCguNEI4LjE/MigoOk46P0RHSktKLTdRV1FIVkJJSkf/2wBDAQwNDREPESITEyJHMCgwR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQxj06DtR+X5U4jn8BRipGNz7D8qOfQflTsUYoAZz6D8qPy/Kh2VF3McCsu81Q+Z5FshkkP8K9vr6Um7FKLZpGVFPJH5Ux7kL91QfqAKxUmldiGlMrg8pCdqL9W7/hUn2iNOJJAW/uQj+vWs3JmqgjQe8ZRzGB+VQjU4s4f5T9AapsY2+YxhfduT/Oqlw8J4DAn2xTTYnFG+syuMqVI9qCfp+Vcuks9vIHhdsDsRwa2LLURc4DLtbpgmruZtF459vyphP0/Kn5yM00imSRtn2/Kmc7h06+lSEU3HzD60Aa7dfwFJinkc/gKMUAMxTZXWKNnc4CjJqUCuf8QXoEv2ZThUGZCegpN2RSV2Q319LdOVjfy07t6D2/xrNWQSqyRExWoPzuD80p78+nvUM0peItLlIAeR3c1HvMke+VdsfRI+34/wCFZpGt+hO91vQCMiG3XjI7/T1pn2tsYgTy1PG9+p/DvVeaQ9SPm7Z6D8KaqyAGRjgnoT1q1ElyNGMoBvuHLepc/wBKSbU7OEYUhiO3/wCqstrdmO5yST0BqvLCUbaoye59KfKLmLdxrDuTsG0fQCo7fUJRJu34x6mqJ4PrU0OzPzjNOyJuzrdP1JWhTzcAn3zWnGwcVyZcQwqyYK9+K6DTZiUUMdynoaQNF1hTMfMPrUrCm4+YfWmSa5HP4CkxTmHP4CigCORhHE8jdFUk1wU0zXt28hI5YsxPQe/4V2HiCbyNEuWBwSu0fia4WQ+XBHCn3m5b1+lTI0iOkkWdt75EMXTPf3+tQ/aMjz378Rx+nvTL2TAW3Tov3j6mqbuScZ56U4oTZcjk8x9zngdae10M7jz/AHRVNpAsewcdyadEhwHYcnlQew9aoRow7nG5jgmnGASAhBhB1PrTYBvUMzYT17t9K0YkMjBETn+FFGce5qHI0UTMFgWc4HQflSWumyXUh8tT5SH7394+lddZ+Hpp0AnzFGf4QPmb6+lb0elwW8KrGgVVHAFZuZoqa6nnHkupe3lBDD7ta2hNlDGx+7xR4oh+zXCzAYw1V9ElH291HRlDCri7oznGx0nVBTMfMPrUmPlpuPmH1qzE12HP4CkxTm6/gKKYHO+NJTHpkMQ/5aSjP0ArkEYGSSd+icDPrXW+N0P2C2kA+7If5Vxdy58sIPp9T3qXuaR2KzuWyx6sajzjmnuRnHYCpLSzmu5VWNep6noKrYm1xkABbcw3AdB6mtG2srm8kyUOT/e4FdFpemadp8QkuSJHHPzdKuTXmkXalfLOQPvICMD1rNyvsbRhbcNK8IsVEl3Pgn+72HtXV6fpVnZRhYIxnu3Un8a5axknsZFMNyZYCfut2rq7afegI9Kzb1NbaFnywOlQzAk4xmquoaqllHlgzufuqo5NY7a1q9w+LezVFPdqA2M3xxGRalsd65zQCzapEAeoNbvimW+/sdvtyxnLDayHpz0NY3haPfqQb+6CauCMqjOyYcUzHzD61I1Nx8w+taHOazDn8BSYp5HP4CgCmBjeK7czaDMVGWixIPw6151MAAp64GRXrk0SzQvE4yrggivL9ZsJLC7e3lUjbnafUZ4NLqVHaxV022WeTdJyM9K7PTNOTao2gZrktHyJ1+tdzYzfvBjtWVRm9NDL/RGkVWUFwDkrnrUmiaZ9muzNJKxjzuEeO+MfhXQW5WRRmphbx5JxUqTRcop7mJdachSRoxsU8hR2NaGjDMTK/VRSXrLHjsKTR33SOexqb3Zpb3TK8RQXTReZbDLHgY7VnmwuPsMl1BNPG4PyBmyDxzn8e9dc0QlTaeMHIqCWyD8SEsPSqUrGco3e5w/iWSc+G4DOCHklXIP0JqLwcmZp2A6KBmtTx+gXTrZP+m2fyBqDwbAU02Wdh/rZMD6CtYbGNTc3SKYPvD61I1MH3h9aoxNgjn8B/KlxSkc/gP5UYpiExWB4y037ZpRnQfvLf5vqvcV0FIyhlKsMgjBB70hrQ8q0E+ZevGQPkXIrqLNykwFVG0OTStfMkYzbyBtvsPT8KsEbZMispbnTTZ1NjKNoFaCuMVz9hPgDJrWinUjrWZte5mavcqbzymYKoXcSat6FcWzQbRKufWkv9PgvsF1yemarWuhxW7sIyUB52g4pId9DZhZWZipyM9akkIxVeGNLa3WNCcL6mo7m52RFuv0prURyvjCN9Q1G1sYBkjLH2z/9YE1qWlslnaR28X3Y1x9fektLZhNLdXAHnynp/cHpVg10RVkcc5czIzTQPmH1p5po+8PrTINk9fwFJTj1/AfypKYCUUtFAFLVEVrM5HIPFcwkofOfvKcMP6102rPi3C+pri7pnhufNT8fesJP3jopq0Tes5FI29xUtzHIV3QXLwsPQAg1k2N2jMHU49R6VtxbZVAz1qGaooq92TiW/lUeuBirYluxEFGo7gOmF5NXItOR+rYpzaakWSrA/Si5sppdCCGa625uJgw9AuDUqkvyegpnkkMBnk1NgKMDtVwV9Tlqz6IaaY1PNNNbHMRmmj7w+tPNNH3h9aANg9fwH8qKCrZHB6Dt7Uu1v7p/KmISkp21v7p/KmurBfun8qmTsioxcnYyNWcswA7VgzWxcHjrXST2zSEnafyqu9mQB8p/KuY7LLY5NoJLeTcnFaNjqDIRuyD6VpT2G4Z2H8qrDT8HO0/lVAacGqIU9D71YivPOB2KX+lZscAjGdlXdPWUW0gjQGUkkBiQD6UK19RSbtoWgCOWOWPWmmsW71vUdLbOr6O8cJbCywSB1oh8V6RMOZZIj6PGf6V0JaaHI731Ng0w1HbXlreLm1njl9lPP5VKVb+6fypiIzTR94fWnlW9D+VIFbcOD19KQH//2Q==",
      "data:image/jpeg;base64,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"];

  function FaceDirection(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  FaceDirection.id = "face-direction";

  FaceDirection.prototype.render = function () {
    var self = this;
    var remaining = 15;

    var angles = [];
    for (var i = 0; i < FACE_IMAGES.length; i++) {
      var hDeg = (Math.random() * 2.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
      var vDeg = (Math.random() * 2.0 + 0.3) * (Math.random() < 0.5 ? 1 : -1);
      angles.push({ h: hDeg, v: vDeg, total: Math.sqrt(hDeg * hDeg + vDeg * vDeg) });
    }

    var indices = [];
    for (var j = 0; j < FACE_IMAGES.length; j++) indices.push(j);
    for (var s = indices.length - 1; s > 0; s--) {
      var r = Math.floor(Math.random() * (s + 1));
      var tmp = indices[s]; indices[s] = indices[r]; indices[r] = tmp;
    }
    var gridIndices = indices.slice(0, 9);

    var html =
      '<div class="doom-challenge-title">Gaze Detection</div>' +
      '<div class="doom-challenge-instruction">Click the face looking <strong>directly at the camera</strong></div>' +
      '<div style="text-align:center;margin:12px 0">' +
      '<div class="doom-timer">' + remaining + '</div>' +
      '<div style="font-size:11px;color:#666;margin-bottom:12px">seconds remaining</div>' +
      '<div style="display:inline-grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:320px">';

    for (var gi = 0; gi < gridIndices.length; gi++) {
      var fi = gridIndices[gi];
      html += '<div class="doom-face-cell" data-grid="' + gi + '" data-face="' + fi + '" style="cursor:pointer;border:3px solid #303050;border-radius:4px;overflow:hidden;position:relative">' +
        '<img src="' + FACE_IMAGES[fi] + '" style="width:100%;display:block;pointer-events:none" />' +
        '<div style="position:absolute;bottom:2px;right:4px;font-size:9px;color:#555">#' + (gi + 1) + '</div>' +
        '</div>';
    }

    html += '</div></div>';
    this.container.innerHTML = html;

    var timerEl = this.container.querySelector(".doom-timer");
    var timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 5) timerEl.style.color = "#e94560";
      if (remaining <= 0) {
        clearInterval(timer);
        self.callbacks.onFail("Gaze detection timed out");
      }
    }, 1000);

    var faceCells = this.container.querySelectorAll(".doom-face-cell");
    for (var fc = 0; fc < faceCells.length; fc++) {
      faceCells[fc].addEventListener("click", function () {
        clearInterval(timer);
        var chosenGrid = parseInt(this.getAttribute("data-grid"));
        var chosenFace = parseInt(this.getAttribute("data-face"));
        var chosenAngle = angles[chosenFace];

        var bestGrid = -1;
        var bestTotal = 999;
        for (var bi = 0; bi < gridIndices.length; bi++) {
          if (bi === chosenGrid) continue;
          var bFace = gridIndices[bi];
          if (angles[bFace].total < bestTotal) {
            bestTotal = angles[bFace].total;
            bestGrid = bi;
          }
        }

        this.style.borderColor = "#e94560";
        this.style.opacity = "0.6";
        if (bestGrid >= 0) {
          faceCells[bestGrid].style.borderColor = "#4ecdc4";
        }

        var chosenH = Math.abs(chosenAngle.h).toFixed(2);
        var chosenV = Math.abs(chosenAngle.v).toFixed(2);
        var correctH = bestGrid >= 0 ? Math.abs(angles[gridIndices[bestGrid]].h).toFixed(2) : "0.00";
        var correctV = bestGrid >= 0 ? Math.abs(angles[gridIndices[bestGrid]].v).toFixed(2) : "0.00";

        setTimeout(function () {
          self.callbacks.onFail(
            "Incorrect. Face #" + (chosenGrid + 1) + " gaze offset: " + chosenH + "\u00b0h, " + chosenV + "\u00b0v. " +
            "Face #" + (bestGrid + 1) + " was more direct (" + correctH + "\u00b0h, " + correctV + "\u00b0v)."
          );
        }, 1500);
      });
    }
  };

  // ── Rotate to Upright ───────────────────────────────────────────────
  var ROTATE_IMAGES = ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAwICQoJBwwKCQoNDAwOER0TERAQESMZGxUdKiUsKyklKCguNEI4LjE/MigoOk46P0RHSktKLTdRV1FIVkJJSkf/2wBDAQwNDREPESITEyJHMCgwR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAEAAQADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0NieOnQdvakyfb8hQ3X8BSUyRdx9B+QoyfQfkKMUuKAEyfQfkKNx9vyFKRxTaAF3H0H5Ck3n0H5Cms2KiL0ASlz7fkKTefb8hUO+jfQMl3n2/IUbz7fkKi3Uu6gCTcfb8hSbj7fkKZmlzQA7cfb8hRuPoPyFNzRQA7cfb8hRuPt+QptFIBdx9vypNx9B+QpKKBi7j6D8qTcfb8hSUUXCwuT6D8qTJ9B+VFJRcVhd30/KkL/T8hUbSoFLblwDgnPANVpbpF6sKaBosmQ+35CmmQ+35VUW4DHg0/fmmImLn2/Km7z7flUe6jNAD9x9vyoDHcOnX0ptKv3h9aBmw3X8B/KkpW6/gP5UUhAKWkoFAxlxPFbwtLPII41xlm6DtVOTUfLuGVoSYdvyupySfTFWZnlM4iWIGIxlmkJ6HIwMVnXUeVJX5j0Oa8vF4qdOXLA7KFKEl7wxdZikkZZEMXPyknOfr6UpvUYBkcMp6EVhalbvH88e6RT045FZRvJY9x3nzANqpnC/U0UMa5aTN6mCVr0zsBdA96eJwe9cpHqbJtErAE478E+3rV6HUAcc16KkpK6OCUHF2Z0Cyg96kD1kxXQPerUc2e9MixfDU4NVRZKlV6LgT5ozUQanZphYfmlpmadmkOwtFJRQOwUUtMkYgEKQCOpx0qZSUVdjSbdkEkixqSxxxVC4vSsbuW2rjANOmkTYXbAVf7w6+/vWLqdyCnnOXCMCI0H3ifX/dryK2KnN2joj0qGHitzN1O7Ets8WwiPfyg6euT+NUk1S6lmdZPuAAq+etVtQmMUhgeMeYGyzI2R6Yqikha6i5I2qxPoc1rhOaMku5eKhB02zqdPv2Z9jHmtyKXcK43TnJu1wa6u2PyivWR4zLwanA1EtSLVCHilX7w+tNFOX7w+tIZst1/AUlK3X8BSUhBRRRQMXr3wKozoQ2OcE1dqKVN6lcMSBjPrXm42jze+jpoTs7GVeRyKvnxRCVOlxEOMqAeR/nmudvtEe5j+12T43jIQ8bj/dx2xXUNK8RLEHenPyjrULW7xO11ZjaxYtcQ4yZO+cnpXnwaeq3PRjJpHGRRPnyrxMAHdtZfun1FNkhmjkXyG3KeWLsARnpgeldrdadb6zYi8jBinA3c9SfQ1yc0MokmSQHzLcHeCvKD1H512wk47ESSne6K9rqJOCrBh7Vr2t+Gxk81klIJgpbcoC/LMTgZ9x3prRT25BKl0JIDqPTua7IVk9Gck6LWx1UNwGHWrSS+9cra3xGOa1re7DAc1tcwcTaV6kDVnxzZ71YSTNArFoGnA1Ar1IrUDsS5pRTV56U4/KPVh27VM5qK1GotiM20Y5Bz6daqSzBo2eZhHEv8WePpT5HU7jKxCLnP4c4rPmdEiOoagwSCDJWI9GHbPqa86rOVR2OynBRKeo3YEYubtXih3DZbqfmc9j/ADrndS1F0drqWRROQDH5f3UQjkEetOv7uZ5DqF98kgUpDHkYhHPH4iuXuLp7mdsZIJ5Dcn61EKJ186iiwJC7naNi54FMtX3NJPk7WOFz6CopSVhWFD87jGfRe5qeMbVVFHsK76MLanFiKl9Da0RC8pf8K6u3GFFYmkW/lRKMc963oRgCuxHnssLUgpi1IKBDhTl+8KaKcv3hSA2G6/gKSlbqPoP5UlIAooooAKPp1HSiik1fQpFWWLdkg52nn61XliPyvEWQqeMD8ya0GUFlb+7+tN2LsZzyPvD39q8mrh+SWmx2U6t0Zl5aTQbdQ0klpR96M9JPXNV5bS01RGurMlZopAzkrglsfdPqK1iDA/mJu8rk9cDP0qrd2jKP7S0xghjGTF/DIfQ0v6t+qNlK/X5/ozAe1E6eTj7LqEjF2h6q47YHYVlG2kS7dZAyyxjMgK/c+uOK65YotbsvtH+pv0HIXgwn39v51kSKt2f7KvP3Nypz9qwR5p7D3FPYtPf8f67HOqFmG6M4fnCgY3GpIblo32twQcGp59PuIJQLiNI3LFUYn5GAqORI7p2jjOZEHLYxmtYVXHR7CnTjLVGnbXgYDmtKKcHHNcjHO0T7W4IrUtbzOOa61NM5ZU2jpI5M1ZjyzAAHJ6Vl2TtMwVBuPXiuit4UhjYgkk+vrUzqW0QuXqxkabQysQGHU+1RzMkcbyykiIYBI61KwMhx69TjoKyLlm1jVxYRuhsYFzJJkgk+lckn95tBX32IpJGCSavfhkhtozsTGDgc5x3zXJSahca3NJqt2RFpsPCRA4BHbI781b8daklxcW2gWivsiYedsySvt9Oc1iaq+J49KhkQwWwAIPyls+pqoxsaX6/1Yzb68lvpiSCEPBUDHA6VCoSNWdvuoMk4qd02hQOOOPeqlwd8qwrnavzN7mtYq+iCUrK4+EElpWHzPzj0HpWtpFsZpvMYcDpWbEpZlQdTXWaXbCOJQBXXFHBN3NO0j2gcVpRjiq0CYAq4grQxHqKkFNUU8UgFpV+8KSlX7woA2G6/gKSlbqPoP5UlABRRRSAKWkpaBhSoPmPOc9AegpKKiceZFRdmIkbKPmCLuB69jVdcwXO6MtJG3LrjhPerDqjHcQzuMEjtT2yerKvGcDuK8+UenY6VL8TJ1CylVhqOkybD1mC/8vC/3fb61DKlv4gsIrqBBDeRfKkbHmFs/wAVaiq1kwMQ3xSHIQ9Iz61Q1XTbi3lGo6Udr7g91Gg/4+FH8P196SWj09V/kaqV2lf0f6M5uXzZIrvSL4iW6ifFsQMZJ7/iaz5bV4ZZre6dLaaFQ+ezd8Zrpbm0m1+yk1WOMW1zAf3QcEEY55rMkgi1TR2itbCW41hsSOW+Xbg+p4xjt3qFr+hve36+RjSRm7O/GxCMqzHn8RUNjHcSX4tohubI5zxj1p80jvI8t2my4fP7rOAmOuR60/w24/t9D2aL+tS5yhsbxipxd+h3mn6alosbKWLlQCc9T3NaEpXcQp2Oq8e9RQrI8YYEZTnHrU01wLe3a/u0AjQduTWy11PObbZn6xeSadZJEjA3VwQq8Egk1Uvpo/Dfhe4eYCdtzHcBg7j/APXqzDGyXzavdN5tn5eVXGfLOev5VwXiXUH8Ta8NK0yYJEzFpNzYU45ojrr/AFb/AIJolfT7/Xt8ito8ssVrca9qEjyi4JjLqw3ZPtWTH+88xp8yu5Db2b5lHuKua7eW73EUEUJigtF2AJwJHHeqEbyzTSmXksQS5Hf2PatorqNu7HyNsiMhbcFBPIwaowg8serHJqW+fJSH+I/Mfp2piDkAd61prS5lUl0NTSYPMn3kcDpXXWkeFFYmkQBI14robcYArdHJJlyIdKsrUEdWFqzMeKeKYKeKQxaVfvD60lKPvD60Aa7dfwH8qSlbr+A/lSUgCiiigAooooGLSUUUhjlJB4OB396RUAGIl4b5t7dqSlHoeVPUVhVp82qNIStoOUqV3MRtbhye/wBKbah7eRvOYeWT8nsPSldQrMdoVQMDucUyNopMxylpHzxkVyp2a7mtroqX8D/bFuY2It0IaZFON47VjXiz/wBpS6lpt15SSLwuMg471vTPeSXxs3iRbdk5kB5rlPGEpt7dbOxyixLtZ1/kKiVtbd/xOmjFtqPl+HmZPiW00nTIbeS2vpLu6ulMk5Zt3Prx93JJ4rM8JXDS63EXUfcYY/GoLMxyWzQkASKMdOtJ4dYw6xETwQWBqKzTjJ2PQpQcU43uetWZjG3cxUHvnrSOXvwLRGVolPzA/wAQFQW7hrUNkADnJrHlvH06ylvRKY2lY7fTHc0oT5orsecqd27bl3xVr0WneHZYLWFt7KYQETKp2J4rk7XQp9C8JzX18I2W7K72T/WxoemD6/Sq2m61JdXUq3TM1kqMVT+83qTWZrWq3VxFHaC5l8mN98cTH5RW6k5OzNPZOCsjMEpLmGIvJarIXVWHzfU1MWjjiLZyo55GPxqus7qWOwZPVhxmql7M8iqh6E4P0rdK7M5e6rjo2MsjSnPzHj2FXLRN86j0qtEuAMVfsRibJrdHLI6axXCiteDoKx7RhgVqQPwK0MGaEZqwpqpG1WEamQTinCo1NPBpgPoH3hTc0o+8KQzZbqPoP5UlK3X8BSUhhRRRmkCQUUm4Uu4UrlWFxS0wuB1PWk3jJDHb6E96lzS3ZSi2PNGcc1XaUbeWwR+RqtPcxqu9jg4wQelYyxEUaxoyZPdXkdsyhsNkE7RycAZqva6iLpGe1ZVAOCR1qpOivLhogGK5B5HH1rKu4hCN0KtBKv8AEh5/GvMrznKXNHQ76VGDVpPU6m5klnjBDbSBjgVzer2xurd4SMOpzj1qpbeIriB/Luh5i/3h1rTS7gvU3xsN45FZqtJv3zVYedB36HAXkElpciUAgZwfpS6dgatEfVwa7OfS4dRSYOAH54FcjZRSx+IEszFlkfBfNbN80WjsjOLv3PRLlhBpyxqQWkGK4TxZqX2icWcL5Rfl47DvXReIb4WE7RyPgiLMfbHFeeG6LzNO/LMeM+lXSg0vQ5KaUVzPqaXmR2NqBx5jDp6VmEGRy7nk9qu6bp82pzlnYqmeXIrqbTw9aooES72/vNyf/rVE68aWm7N3yrc4o2lxIuYomwehI4qVNBkLoJJH3N2AxXeSaQovLO3MzJ5hyCOg+tVb+HEy6pI0UVta3P2cNvyJQDgsR2/+tWlOtOSvsctVwexyp0iSM7QeccK3U+9Edu0TcqSCcAgZrWv/ALJGl4FnEm6YNHgkkr7H0qrNPGJyIZg64GA3GPUV0RqyRzSpxZJaTrgbWBFatvOMDmsbKFwXjIb2HP5jtSrLNG+Vw6HooPI/xrojWT3OeVB9DpophVuOSuct79MqrHax6BuCa0obgetbJnO4tGwj1KrVmxzj1qwkue9VcixdDUqn5h9arrJUit8w+tMVzfbr+A/lSUN1/AVnXkj3EOwpNAA/QNhmx9O3tXNWrxoxvI3p03N2Lk1xDEHLyKNgywzyB9KptqtuTHt3sHGchfu/X0rKn8wlxyxP3mAHI7frTUtnZwpU8scnJHQV5zx05P3YnoxwcEryZpjUmdCY4grbsKJGxuHrxU4kdx82cMBgLx+tUEt2VByF+Tb97oPWp1ntooyisXJHCjnkUe3qS3YnRgvhRZ3cnLbSDlgP608ZbOFJ3DjAqCGaWVVENtwxILNT8ajIjfOsbqwwB0xQn8yWreRJ5bvHH+7A+fOTUV1HBIZ5Lgj5BgqGwQfWnfZHDET3p2MMoc9DVZpdIjeKWSYSbxtPfn1NN32a+9gt9H9yK9xaG5kttmooJMlcHuAKy9QuYYjEySF1YbJFb+Fh1/CtOXULUeWtvp8kzJKrxs0Z5UnAOaq63HfXPhzV4LmzihWJ1ljII6ZBP6UuVNefzNouSavt8u5gXUKM2VGCeQatabCQcglT7VWtYUm0+OZpEQKMHcfSrMLwo4xcbwPwFYShzdDu9paLjc29Nlijuv8ATH8oEdccNXLeIZEtda+32EbOI33FhnkehrcvZlvraOC2yX7lRxVpoYrbTWSdAPl5zRFtWRgpKL5u+ljgNd8SNrF3GzwgxRnO1up9Rn0qvBaTahPJeSRHymf+EcE+g+lZ1wqf2pIIuIi5ArodP11dNQW2wMC5OfY4/wDr12yjyw9wz5rStbY0bYyxRiKNREvQDpXSaE86GMGMOSeTmuWku3vZB8o2Hpk10GitLAUKSM2OxrkjCN7mlVtwNtGuGm1CdbJUblIt/BIH9O9YsNlqE1jtttOtVhu4zE29+VP9+rD2E9vd3K3WozbJIDJG68ctnj8KyrW01Aabp6W3iGVGDM7LtVgoGeMYz+dbxWupyvSOnl37C3FvraPZK2mWsirugYK/LbR97kcDiuYkvJgkRvdJdAJnTKL9856e+DxW5IfFkKxSpfW1wAHlAaPBx6cVmDWdeheKS801ZhE+4FOOSM4/I1skjLmZS+12sp8lJ3idAQwfuc9KdG7A5JRgSMbT0+lWbnUtBvtn9p6c9rcPnzZQhXaSwJ5HU4qJPDjXLxHSLltkq+YiSehyVAI9uuaGklqVGVyRthUBl/76H8jTI7iaJm2P8qcbTzn/AOtVNbi4i+S5UEoeh79qIrhJZC7Hyie3pSTlHYtwjLc2ItWdG2yRE5bA2Ht75rTttSikA2v1YqAeMkVgxMshwkwYEgL8vf8Azn+dLgHHygDnHzD+f9aFipJ6kywkWtDq47oHvVqOYEjmuQ+2GzkLzXAMBA2g/wAP41r2d5vYDOfSu+nUU1dHnVaTg7M765EpC+Q6KcjdvGcjuPrVWZwQVJAIPerjdfwFZV5a/ZrZnt4p7lmfJTduPJ689hXBjqMpx5onRh5q/KyhfOERsySkcf6lOc7utJGYjIQ32ngAbs8bic5qK4ZhOYmb96BggHhBxgn/ABqa2nZQ5xlVyPXGTgf415kOzPWtaOhaDwCPCW0rlWOcnk0yGWaOVlS2VNh6nuD3qTzpIWjDKDkhTt7+hoJaWUtGB+7HzdcEV0HPcsp9u24EiRhJA3HOVIpv2abdme/5iByRgAr2B+lRCKR42MkpBOCewFK1snmswQENwQxzn1qtX0I26/gOltdMEbQT3Bbf86Fm6D0FNOpabBbfuIt8k0e4Jt6kdj6U5oIDEieUx2vkHb+lNa7it7v93ZE9uf4TVpW2SRO+7bK815qU6E2sS21tcbYwz9Yz0J/OsvVNOvRpWpi+vneWSRY1AbAdRg5x9Ku6kj30X2WSaQI8nmsAdoUZ6CqOsJHPOwRgGYAMS2SeKUnZXbNae6SVjmFjhii8uENt6kliaLBTJdKqA7c8mrZs5LmX7NaIfLH339TW/p+kQ2kG6TqOlcsq2vKt2ehPlpx97cu6OVScRRIHYCua8Xa88uofYm+RQwR9vpW2btdNs5roYDNwnNeZ3l013qLXEpLfPnr1rqpU29Hscispc9v66nV+JND0yDw8lzDtidCMsOWbI9PrXFgs6rz8y16HZWcWo6Z+9/eIEO0MfX61yWpab9gucKMI3K/4VtSqaWZDpuT3LGi6gisIZzjsCa6+xldCMLuU9xzXAi3LrmPk+lWrHVbzT5PkZiqjG1u1c9Wi5S5qb1OjlurM7ee+mGq2c8YWWONipgJAzn0/nWTJNElzqcV7bSre3b/6HGjYADcDBHA561hNqiXt9GxYwEHJwfvVpXkkl8qKzYCEESL95a2gmklI5Kqs9CncLc2+pPaNqUsD20BTBbcvI5APpVRNS1a1kUST4ZDnZMvJ9Ku3LxxWrQM63Akl3yOT8xxWbcTCS4eRiJC67QH5wPSt0c7J7jV55LYQXtqjSKxJYDqff/Pam6Vdpaz/AGiB5rZghRvLPByOR+NV0G0AMOnGakUqGDKMYoktNCosmuHMt0ZobkLIHDDcgAJ6Dioy9yV2vDbXHUbgcEk/dz9O1Woni25ODj7ufXBqLyFUggkD347AZrNXRroyWMqkQb+z5FO0sNsoPPGPw6/nWtDArozQRzPh9pyFJ7Y/Unn6YqjHGCQFYHAHLHBPHT/PakZmjl2RnDOOFVuTg+lc8k5dDdNJblOdUiZ0AyAxwGq3pl7KyLvj2PnpnNQjTLrUCOZIAGyWZeTW/YaVHAVOCzepr0MNBxV31POxlSM2lHoeht1/AUw05uv4D+VJXScRE8SOGDorBhg5HUVAbG2yD5CDC7RgY4q2aSpcYvdFKclszPbTYfLVUaRCv3WVzkD0o+xFSQJ5ChUDaTnn1q9ikxUOjB9DRV6nczkgnRlaSOOUk4chiPl7dakhVg+JUcMCQp4IC9uauYpMVn9Xj0L+sSe6I9yvsZZMISchsgk1DM58wsW2KnRuP1q1imlQeMCk6HmNVvIwr26hEaOSJBn5SDnJqnp+l3Gq3Zupy0cPYdC3tXTPaRz4Ei/KDzx2q3bRxuVVwEK9NvQ159alLm5UzshiFGF4rUzTZRWkQSOLao6cVVu/uKg+ZnOMeldNLbEOJQ24BcbT0NYk9nGTNcM/lALhM/dFL6sqUrmdOrzatnA+L9QIY26HIQbF46nua5OaIxRoCfmPJrojp0up64YZFKHBcA9G9/pWLfqy3Uit1TK/lXTTktj0JJWsuh2fg2cyaZt3ZYDFWNRsFvQYH+/jKdf896y/AkhCFOuT2rrL6w3WL3SuEkgbKgjk+1cnM41GkZOVp+p52EawvWhmyFPPNJqEL7ln2HbJ/EqHaT9fWvQb/wAOwaxpaTmMwj70jd2I/pWdql/HeeH00DToHn1BBg4TCKoPLFq6Iptp/wBMcq6tovXyPOriLPI4YelQLf3lv8ockD1q/JB9jupre7w8ycbY23DP1qKS0Y2zM4wTXVFpaM5qnvLQrnVrps/KmT1NR/arp+rhfoKbHH6jBHWp1QAV0JI4XcjTzpHGZGJ+ta1nahl2v8wPBzzVKBQJK2bPFUkmS20XbezQspKjI6HHStKCxh+X92vy8rx0+lQW3atSAdKrlRm5MSKxhUECJBk5Pyjk1OllEpBWNQR3xU8YqZRRZCuyBbcelSpCARxUwFOUfMKLCubjdfwFJSt1/AfypKQwooooATFJinUUAMxSYp+KMUAMxQBTsU5R1OM4GcVEnyq5aV2GPmCrkE9c1YixtDDG1cg5qvH/AKwAHbk4ANJfS7US0RiHcgNxkV5/Pa82dHLe0USQLMbgytcFoix2p2FYPiq+hkk+wGdERhuePHLj2Ppng1d8QahBo2kSZKqQp+UHGfXB9a4nw65d7rxFrCCW2UbB5gwcHjIFNr3eU1pLX2j+R0Gj6MsIkmnjle8wzQr32gfdHb2rzK8mE80zMhjZnPB6jnoa6/U9TM2hyNdyXEMkg3adIrnJQHoSOnHXNcjcI2NzOHPrjmiEUtTohUldts2/AU7R6ltxxk16lZyQl5I59pLjIyOCK8i8IqTqrdcegr0+3uTB5bCPewODU/DO5nW94rzX81raNHOAtmW2oV64JwPwrmvG2ntp8Ed1o88pmIZWMR/g/i/Cuintzdi8srkA3EufKUHgLXNeHX2Lc+HtVZ2ug+yFd3VMevtRC/XoFuqOYuobX+yra+s3ijf7sse4vIT3LGn277oFDYc/xHsB2BPrSy2k+j6nc6LcOfJl5xCuSx7DJ6Ad6z4WjjlNvHKHUdCD8v5966OW5HNYhuYRBcthtyseCOmaAKu3MSzWmI0JdOck459KoocrW8HdWMJrqPThga1bRulZQrQs24Faoxkb1q3Sta37VjWh6VsW3aqMmX4+lTLUMfSploESCnL94fWmilH3hQBtt1/AUlK3X8B/KkqShaKSigBaKKKAFopKWgBcUrDAHGQffoaTHB9PX0pCw2hmwB0Ncdef2TenHqLvS3ieaTnZ0HrUVjiKJ7y5JUvwu85ByeKjusXEsECtwME9Dj61j+LL+aZ00TTEJubhSpIwFRe5Pce1c0Xd37fmdCjfTv8AkZN00/i3WHgVimmWsubhWIGXHYY6iqeuSJOgRfLGh2+BGg+87D+YBq3qX2bTdP8A7G051jYDNzNjDIR1JPfNc9qV2soVAwVFUBQB09D75rRI0322MucOsMZkbEYYmGNicYPXHtUV1NHbxbSG3nkRn+Gn3U32Y7pB+9YfJGOg98dvpVOG3knkMj5ZmOSa3jG5nKdti74e1I2GorNPHujY4YjqAa9XtJY5bZWgIkDLuVuxFeZWumFsZFdp4YZrJPs7n923Qn+GpqU/tISlfRmw0G0HYRG4G7zx1J9Kw9dsf7R0/wC3acBFf2rZLkfPIccj8RXTy8oRgkjoB2xWbLugvFm+X5xhowflGfU1z7GkWzlPEm3xD4YtdWiObqP78UI4T1yetcpLOs1gkx+QRtsjjVO3ua7azCaPrt3pcxEun6pukV0TYA/QjP8AdFchqllJpOsS2UuHhOfK4wn1GfSuiL1Ja0CA7lDsR0/i7/SqLL5dw65PPzAY6A1YgBX75yAeD/e+lMvvvxyE4yduB0rSDtImS90bVuzPOKqL0qxaHEmK6Ecz2Ogs+1bdsOBWJYjpW5bDgVRiy9H0qVaijqZaAHCnL94U0U5fvCgRtN1/AUlK3X8BSVIwpaSigYtFJS0ALRSUZxk+lJjQrfdYevp1FU5JvLDMclevNWWy+AFyMZYdxVNmjnkEYcA53MSM8DtXi1puU7o76UbLUjN8umWk19eD5m4jTbksewrBV49Es7nUbtfO1W9BkKtjKL2H09xUl5PHqeoSXcgDWllkQ7SD5jj1rjbrWJb68eS42nAOwHBC5PQc1pTvstkbuNlru9/8h32gzsyswkY5d5ezf73sKp3NwtmpK7WmboOoHv8AX2p806W8Ujhslicrz83oOah07TpbqXzpR1OceldlOFznqT5SKysJbmXzZSWLHJJro7LTQoHy1dsdPCKBtrYgtQB0rpSOVyKdrYgYyK1IIAuOKkjiA7VOq4osK5YhkZoihPzbcA+tMl2SIY5SAjcH5eAccUi5HQ4pz7SMLwwGf/r1x1Ycuq2OinK+hhappP8Aamlz6dIGFwi7oXP3sDoq+g9a5vVWfxH4fS6MPlX9i3lNDnJCgdcf1NddqJlODFKUK9XHU+o+lc/q7TWl4dWt2CRXGIdQXbkbegbH+e1Yxl0R1WvqzhklIBXPzVZlVpLZl+6w5FWdXsUs7kPa8wS5Mbnk4qtA5L7SSwI9OBXQpcyuiJRtoQxMGXg5qza/60VVAMU7RsRnqAOwq1af64V1p31OKStdHR2A4FbluOBWNYdBW1B0rQwZbjqZahSphSAdTl+8PrTacv3hQI2G6/gKKRuv4CipGLRSUUDFpabmigB1GTjjtzSUyT+8BhuRn2rnxNT2dNs0pR5pEFxcEYwMluwP86ydWvXtrMW9u266uiVTDDK5789quXl1HBE7seFGceprmLm+MSTX9yw8+UYRR/CM9CCOCK8SLbdz14QVr2M3WL2O1jGnxSAxwrmQkAbnz1471gOFj/eTHB27jxjAzxjmm3MzNM0jddwI+birOmadLqM+9wRBu3BfU+terSpGFWpyoNPsJL+586RMJnKriuwsdPCKAFqfT9OWJAAuK1ooAo6V2pWPOlK5BDbhR0q0sYFSKmKdimTcaFpwFLilxQO4lLxxkZx0ooqWk9GNMgniDKQo/DrtrKuIWYldu5G+Voz0atvr/h61WnhAG7uBnpXl16bpu62PRoVFJWZxl1pjhZtMcNIMCW0kVSQwH/LNe2B3NcsSY7kA55P3RXcakGuYEUKTcWxMsMrdMf3Nvf8ArXM6vbhv9OiU/vD+9B58tz2J6Z74FFKpc3nB2KN5zCk29Rt4cYpLdgJVPY0K4eN0YcHrUUJOOWBZTziu+i9LHDXjZ3Ot045UVuQDgVz+kNuRTXRW44FdJwvcsoKmFRoKlFACilX7woFKv3hQI1W6/gKSkJyfwFGaQxc0ZpM0tAC0ZpM0maAHA1DMzJEFZizEnnHapc1m38M1vBcTWvn3E00i7Y852Z449AOtcWNpznT9w6cO4qfvGbqkiTMwkJEEZ+Y84ZvTHtXEa5qLyTn5toB456V1ur21y9xHplqhaXaWJOcAepNZlp4NkabzdRYSNnhF+6P8a48JQlJ3a2PQrV4QjZO5zukaVLqMyu6nyh6/xe9d9p2mrDGoCgYq7Z6bHboAqAAVeVAo6V7CikrI8qU3J3ZFHEFHSpQtPxRimQNxRS0lAhKWkopWHcM0UlFAwprjcuM/XFONJUTgpx5WVGbi7ox7m3McplQcN1xyMetcxf2whllfCfZ5m2lAT8hxjcB9ep9K7meFZlIPU/lWHe25EhyvIxuyO3YV4lSE6E9dj2aNWNWPmcDLAYpCpGO2CMVAvEjDAHQ59a1dSgYXCqiEl32J/tHPTNT2uhzkD7THhs9q9PDXl7xyYqUUrF3w/GxhUkV1EKYUVQ06z8iNVAxitaNcCu081jlHFOpFGKdQIWlH3h9abSg/MKANLPI+gpc0FTkcHoKTa3oaRQuaM0mD6Gl2n0NAgzRmjB9DRg+hoAM0A0m1vQ0Yb0NAC5Gc0xgCc4p2D6GkwfQ0DG4opdrehowfQ0AJSUuD6GkwfQ0AJSUuD6GkwfQ0AJSUuD6GjB9DQAlFGD6Ggg+hoASkpcH0NJg+hoENPWmuAwIIBB608qfQ0mD6GiyC7KS6faxxIiwrtjO5cjOD6/WnNCpPSrJB9DTdp9DQlYTdyBYgKeBT9p9DRg+hpgNopcH0NJg+hoENJoDfMPrQwPoaaFO4cHrQI//Z",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAwICQoJBwwKCQoNDAwOER0TERAQESMZGxUdKiUsKyklKCguNEI4LjE/MigoOk46P0RHSktKLTdRV1FIVkJJSkf/2wBDAQwNDREPESITEyJHMCgwR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAEAAQADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDg6KKSuo4haKSigBaKSikOwtJmikoGFFFFIYUUlFABRRTSaBjqTNNJpuTnFS2Uojs80Zq7b6LqFzCZYrZyo9utUZFeJzHIpVl4IPalqVyi5ozTc0tFxWCiikzQMM0lBpKQ7BmjNJRQAZpM0UlIYUZopKQwzRRSUAXqKWkrc5goooNABRSUUhhQaSloAKSikpDFopKKB2CmmnZphNA0CgvIqDqxAFelWXhnSPDtul3qqtM5AJYj5R+Fed6anm6vZp/enQfqK9z16whv9GuLaYDaUOD6HFOLsKdzn7jxn4ctE2WpNw2OFiX+tYd1aWvil2dLM20p+44PP41xtrasuqi3jKlwwX616r4e054Ig74DAVrFJxbkYzlKMkonkd7bSWV5LbS/fjbaahBrQ8SMW8Q3pP8Az1IrOFc3U6t0OpKKQ0AgpKKKQBSZopKBhmkoozSGFJmikpALSUUlAy/S0lFbnOLSUZooCwlGaDRSGkFJRSUBYWkoNJmkAuaM00mjNIodmmHFBNMLU7gkWdPuUs9UtbqQFkhlV2A6kA17QNXsNe0Z5dNu1dSvzrnDL9RXhbHIrQ8MNKPEdnFE7KJZQjBTjIPaiMtUEo3R0GrWNlbavFNYuVZBufd0ODXo9hcQppwurmeOGIrks7AYrnLTRba/1qOGZSY2tzJx/vYFec65c3D6pc20k8jxQysiKW4ABxW1WaWiMacObW+wutzR3GtXc0Lb43lYq3qM1SFNBpQa5zoH5pKTNJSHYd2pKM0lABSUUhpDDNFJRQAUlFFIYUlFFAF+jNJRWxgLmjNJSGgYuaTNNzVqx06+1BitlaTTkddiE0rlJFbNGaJUeORo5EZHU4KsMEUzdilcGiSmk0ZzSNTEITRmprOxu7+byrO2knf0Rc1NqekahpThb61kiz0Yjg/jSsxlMAu6ooyzHAHvXY2/gCWC2M+rTFWK5EUBDFT23GuLBO9SvUEYr2Wwe8lsYpplhTei5UksX47ntWlOKeplUm4nkeqaXc6dIfMRmiz8sgHFWvBY3+MdNHX99n9DXoesWCzvsjC72T/j3YjcwHXH978K5Xw/pJs/F9ndWqkJHL86OMBcg0nCzuilPmi0zu/D6/8AE7hJ/h0yPP1Lk145q7htZvWHe4kP/jxr2PTJ4Y9cvldgoitol69PvGvLrbQ3ub+SS73IHdmWMfebJpTTlOyCm1GF2YsSSSsFiRnY8AKM1p6joGq6Xbxz31nJFFIMhuoHsfQ+1egaJpaabNBNPHHaon3I2Hzvx2Ucn6108csN5BOJ7cmJVPyzKMNx6U3TstxKreVrHg+aM0sxHnybQAN5wB2GaZmsjcdmikooEFITQaKQwoopKBhSUtJSAKKKSgC/RRRWpiFNbpTqa3p60wO+0rwXY2el2+q6q0lyHCv5KDC49/WrVx490/T0NpaWstvAvCrGirW7rkhtfBUEijmKJf0xXld09pqUhZG8ubnKMMbvoa0SVvMyu3vsdRBqWkeM7wadNaGOdgTFcEjzAcZxx1H1rmvEHhy80WQs482DOBIo/n6VDo8Ett4hsprRxG6TpxI2Nozg5PpXq2tW9nctLZ3EgDyA/u37j1FTy33NObl9DxZWoZuK0fEejS6JqBhchkPKkHNZRbIrN6Fno3w61N7LSmh2giaY4Y9uK6vW2tZ9JvVnTzSsL53dFIXPFcN4S2/2Vbe8pOfeuq8QyeV4V1SXIz5bj+laz0jdGMNZtM8cQkqDXS+H/GN9pSrb3A+02o/gY8r9DXMx8AU/rWUZOOxtOKloz13T9U0bXQskbRtIgyEkHzofb/61X7qciKWR9PR7krlJhjOOmTjqa8UR5IZBJE7Iy8gg4Ndhp99e6v4Tvpp7iVZbZgvmK+3cD2wKvm5mQo8isQx312njJ4JgQJZERwRnpjHSu5My3czx26PaurEGZVCu49AeoH05rgtP0f8A4mt1cSZZIVZ87ic4FVbrxlqk9r9ng2WsRGP3Y+bHpuo23D4tjuNQ1XStBZmeRTMR8yqdzt9T1/OuT1fx3fXSPDYILWJuCw5Yj61yju8jlnYsT1JNJjAodRtWQ1Sindl7RbFNT1IW80rRJtZ2ZRk8DNdt/wAI7oc9ktrbW0iiQApcZ3SZ9x/QVy3hMhLy4kbotu/6jH9a7XRZXOsN5TEAKuPY5Az+VXCK5bszqSfNZHB67oN/ocwW7iYRsxVJOzfSszPFehfFufK6fDnnc7foBXnfaud7nStkGaFJJwBk10XhLw1HrbSXF7MYbSJtp2/ec+grp9aGlaPaBbWxhhitwDkLuZ2PTJPWrVNy1IdRRdjirDw7q+pW809nZu8cK7mJ449vWsvPJB4I6ivRtF8W6Ta2rvcX80Dt0iii3H8e1YOs3umeI9Qjhs7byJnbAuWXaX9NwHH41Lh2dy01bXQ5iirmr6TeaNe/Zb5ArldykHhh6iqVQMKSlpKAL1LSUVqZBTWJGCOo5p1IaAPR7PxHB4m8MSaSxjt9QddqI7YVz7Htn0NcjY+FtSuL64tZLSaO5hAO1k4/P+tYiu0bhkOCK7DTviDqdppvkHy55FGEeUZKj+tJyTepcE4xaiOl8JazZaaJ54FmlJ+WNDlx+PrUmk+Jd8K2WsxPcwQHCSY/0i3x6j+JfpzWBceLdeuNRjuzqMqyRtlApwo/Dpit469pHiXCa/aC0vR/q721+Ug+9aKom7GfspJNmpqmmWetad5kUqTRsP3c8fKn69wfY1w1z4ZubVneWRRCvJI5JrbeHVPD07XdvN51u33rmFNyOPSVP61c1XT38R2cV1YXBtZGG3ykbdC+fQ9R+P8A9erfL9pGceZbPQv6HbQWOnWkKxmU9W2nGCeec1b8ayung++EajbtUMdw5yw6CszTftlrHDBqBVpl/dsxYnnnk/hineOr6GDw5LaeYS1xsCj15BP4cVE1eJULKR5xGOBUgFNTpT6yRqxH6V1Hh0g+CdQUjrewjr1zXKu3Fdhpmn3Vr4Gb7RE0Zu72N4g3G9ccGrhuRP4S/DGYLnW3DLhLaXO1s4GP/r15+ijYv0r0Jo/3fiJFG3y7VwAB04Hf8K88RhtFOpuKnsLimtTjTTWRqdF4Ytt2mX1xzwUTIGcZPP8AKuv8LRmS8mnyChkVVPr3rC8FOf7JdI2+c3KlgOuMV1FrHEIAAGVjO7b1OCOldO0Ecu82cl8UpzJrVqmeEiP864zOeAMk10ni23vNS8TSrBHJOI41G/GRjHXNS6PoMkZSd3giG4ATS8jPoo7n2AJrCMXJs6ZSUUjrPD+kXljoGnoqKvm/O+44JLH0rP8AGsEI0ZrVGMl55++XPAUDtk9fwq+929kwitpZZLw93XzZz/uxfdQe7H8KzRo8k/ie3bxBd+RFP8xjklzK6+hI6H6cVu3aNjmiuaVzglQCQJIwTJx7V1/hXRwNSx5f2h0wd4OIwfc96sL4CdtflYOJrBZCymE7vlzwD36V3NlpsdvbZiHkRxj7zfKoHvUU9NWXVfNojz34nzM2t2kLkM0dsCWAx1J4/SuOrf8AHV/DqPiiaS2lWaKNFjDqcg4HOPxrn6we7OhKySCkNLSUhl6iiitDIKKKSgBpFIIz2p9GaLDu0RlKntrW7uX220Ekh9hx+dRNzXq/haONvD9soTBEK7iAM5xVRgpXFKo42MnQpdX0zTUtbho1EYO1cfMufX1/GpNNLIPNRUUlwZiF2qw+g4B+lbkdg1yocKIkYfekGWI/3e34n8KzdQsYtOzeNdLCi8GScj9Bx+QrS62Rm092c34jtriS/F5byyyLuGxHOPm/rxV/RmsNZ0mbT9ZbzpkBYALtli91/vD3H41Sl8WaS19HG0M00IbLSkYXPTIXqfxovNNtLry5LOXa7/NHKGwo9ge3NG+wbbmJrPh270qH7XGy3VgzYS4j/TcO1ZCb5XWOJGd2OAqjJNdbBql7pbvDfo23BTft+Vh33r0P1rqdBtdKS1+1WllFbO653KeCPXd1x+VQ4di1Pucp4Z8H3NzfLJqluBCvPlM+Dn/a9Pp1r0G6FjHHE2pLEbe3YOqsPl3Dpgd8dqxtS121sgpiImkX7vZB9BXHatrNxfSmS5mJHYZ6fSqUbEN3PQtF1nRr27vI7OJLaSd/3it/y1/D+lcr4r8EYke70ZAGzl7YdP8AgH+Fcpbz5cmNtrA5AzXV6J4tnhCwagGniHAf/lov/wAUKbgpbApOJwcgeJ2jkUo6nBVhgg00txXr95pul+JbFgPLbeMrMgGQf8a5e10TTdIuGaVBJJGf9de4CJ9EHBP1z9Ky5Ga86MHQLbUbSVNV/wCPa0Q48yU7RJn+FR/EfpXcQ3QidbWIF1EW4yKMY3Hke55rDvtTXUnYafbyX8owGu5/ljT/AHR2qkNKv/taX93eqrodxXBCjH8Pp+FWrpWIdm7m3qSXMcck+m3kPnS4V1K5YL3wOh/rRpeiXsiG91S7+wWwBLSSSASsO43dEHstSW9zHKUmaExY5O0YVQMZODyB0p3iaO31e0haKMTRjO50Y7QAPT196pXuJ2sU7/xrpujQtZ+FbVHfo1y68Z9Rnlj7muHvb67v7xry7uJJrhjkyMefw9Kt32hXFvE1xbAzwDlsD5kHuPT3rMU5rCfNf3jaHLb3TpdN8a31hANqBrpOEm3Y4/2h3rP1jxFrGtn/AImN/LKmc+WDtQfgKzNuaXGKTbe40kthAMUtFJUjCkpaSgC7RSUtWZhS0lFMBaQ0UhoAaa39D8Y3ulKsEqie3AxtPBA9jWDTWUUlJx2HyKS1O3vPiK8dt5OmWg3kf62bt9FH9a4zUL+81S4M9/cPO/8AtHgfQdqbNEEZR6qG/OmYobuCGCIVd0/ULnTX/dEPETlon5Vv8D71XFI5+WmnbYT10Z6Zoj2+s6bFcPACjEoRIMnjtnuKqeIb8wSvaxYQRkBVJwucf561b8NW7R+C9PcDDeYzj3Un/wCtWD4vO68uz23f+y1undmEloYN9cSLIwcNvzzu7VBY6fqGrT7LK2e4bPJx8q/U9K6LwdYQa1cXEWpJ58duoaPJ6ex9R7V6DaTWtvGtqsUdsi8KqDC0Si5ahGai7Pc8z8U6RfWVzHcXdqohMSKZYFwqsBg9OlZkUwVQZf3idA68EfWvZ5xE6mN1WQMMFSMgj3rz3xtodlo1smoaehheaTY0ecoOM5AqUnDVGjkpaPcr6TNcW0yy205Q9RgYLfUd66i60iy8RW1vrF4zRdVeMN8pPrjtXH6Od89qzEljC5YnvXUXr7PhbMNxBbeAR/vVU3pciC1sVtT8S+HdDiMGlxLqFyvChRiJPqe/0H51wuo63qeo3X2i6uCT/CijCKPQCqKqBTjXO5N7m6SWx0WjeKxHEbTVYg8LYHmoPmX6juK7DTIYLlBNZXCvERjfGRjHoR/Q15SRzVrTtRu9MuBNZzNG3fHQ/Ud6uNToyZQ6o9asdKWDUA7oArnGU6E+4P8AT8q4v4m2ltZ+IIIbSCOFPIBIjULkk9akb4hXKWqmKzj+1j+NmJQe+2uZ1TVb3Wbw3eozebMRjO0AAegApVHfqFONuhTFBpaSszUKSlpKQBSUtJQBcopKKszFooooAWkNFIaAEq3Y6VqGpEixtZJ8cEqOB+NRWTIL6DzkEkfmLuU9xnpXsNsxTTZPssKhIiAsSADAx6VpGCauyJTcXZHj+owTWtysNzG0cioAVYenFV69J1iysdbtysuBKv3XXqprg9V0m70mXbcJmM/dlXlW/wAKJwcQhNS06lOmyfdppkrQ07Rrm/ZGkPkQt0YqWZ/91Ryf5e9RuXsemeHJI38L6XGpyDHj8R1rlPFgxdXn+8f/AEEV0ensmnaVbWwjMUdvnl23Mc9S2OAfYdKytesjeK9zGpmSRQ2yM4PQd/TjtW8dzCQnw1jzLqLewFdbLbG4UqvBP8RGcV5raalfabc+fprrHj79vtxu+vc/Wu68O+LbLVgIZcW9yOCjcA/Sq5nFGbp8zuaOkwva2i28z+ZIhOXxjdz1rnficp/sG2I6ef8A0rc1rxDpejgLPIZbg/dhiG5yf6Vw3iXXLzXIBauiIFbeIIiMRe8jnv7D8azlLmNYw5Xcj0lCs0ODgi2JP4mug1thH8McHHzA4/76rB0d9tyCjLL+7CbRznnJrqfEGmXN38PkgtEMkqLuaMdcbs/jRP4Qp/EeUDpSE0jBkYo6lWU4KkYINCqzsFUZJrnOkTPNL2z2rptM8K4gW81d2trZuVQD95L/ALo7D3Nb1jaw3zC0/s+CLTl/5ZkZI/2i3Ut71rGk2ZyqJHneM0vQV0/jnw9Y6DcWn2BpitwjMVkbO3B7Vy9ZGqFpKKWkAlFFFACUUUUDLdFJS1RmFFJRmmAtGaTNIaADcQQR1HIrtPDfjOBQLXU/3ZPAmHT8fSuKzUboDzTjJoTgpHqt5bwyuJrSTeX584HIb/H61XSfcwtL+JGic7SHGVauC0LWNTsbhILPdcKxx9nILBvoOxrp9Tv1nla289InjiMkkRIIjYdtw789Pat4z926MZQ1sx0fhWxW9kurdmNt1QNjAOMkBjx+YqC41A2itFwsjjItrZsyPz/E/XHtVfT9O1K5cF72UJkZCElj1rYSDRfD9sZLqRIXGMqvzynP+fWpX3FP7zLg/t2W5gUjzcjP2IA7UXsWPr+dacGtR2032S+mtzLnBWB93l+2a5rWvEst9IY9NR7K2AK8N+8lB7u39BWF5QqHNdC1DuejappNvqEAnjUqxGVmUYP4j+tcneW0tnNtvFKsPuTp3+tN0rxLf6YUSRvtVuvAjkY5Uex/yK7GwuLLxBZBkjO0nDBl+6ff3rSM0yHBrY5W8jkTVJMyCUzKpVYWDPggcZ/h962tL8LzXKLJqOILZeRbx/1PrW5Z6Xpukxm5uHigQH77naP161z2veO2YvbaJHtj6faJF5P+6O340pTS2FGEnudG1xY6MiwItvC5GFQ4Lt/n3rCOva0s7X9q/nQxMBJbYAaP3yOv8q4aWWeac3Es0jzE58xmO7P1rc0vxEVmUXxCSAYWdV4P++B1HuP1qFO+5o4W2N/UV0TxdYrPE0dlqKEKZSPvc9HHr71V8P2dlpLr56x3OpM5VEYblQg4zj645NSzWumaurzxfu51BEktqcrjHt2x2xWRFcy6PfRoiGW4kKtlFyMHjG48+/HGfpVKy1Fq1Y7EWcl1Kbi+dmZgDtJ5x2yewrSiSC2QzXEiQwRDJZvlRf8AP51iT62ILG48u3MlzGu4xfxdev8AjXBarrV/qz/6XMfLU/LEvCr+FVKdiYwua/jvXbbXNZjaxLNbW8flozDG455P0rm6RRilrmZ0BRSUUgCiiigYUUUlAFrNLTaWqICjFFBJA4GecUANYnOACTWinh3XZLBr1NLujbqNxfyz09QO9el6T4Z07SNKt7yOMNctEsrSyYYqcZ4zwKz7vxdYLI63N3cu6tgFWByKtQv1I5+yPMN478Gtqx8OXlyscl2fscMnKB1Jll/3IxyfrwPetG81K21G88ywsylznKzooDk/y/GtyCLQ7S3t5tYvpLu+YA/ZbdmeSRu24g5JHTsKrkS1bE5N6JGXptk02bTw/ayAN8skqMPMb/fk6KP9lOfepL3T9N0OWO0aVLnUZBgRRYEcOepYnv8AU1Hr3ivVLZWsbS0GjQDgRoo8zH16CuOe5kdj1wxyxJyW+ppSn0Q1Dqz1OxsjJp1pd2oCrOXAUDnABxnNcP44glg19VlJw0CMBxgHGD+or0nSpvL0iyjEeUQAqqjJyRXD/Ejeb+xd4DFmJgN2MnDe1FS+wU9dTkgMUuaaDS1mWTWVpJqF/BZwsiyTuEVnbABPqa9JW4XRbc2mnKsf2O2dA5HLNjqQeM55/L0rznRwG1qzUjIM6fzFegeKIvMlkggdI5LiXyl+prSCVrmc27pGL8RJZpLXSBKxbKMST3OF5NcdwK634giSKLRreXHmJbktgd8jP8q5HNRLdmkdkKTTGGRS5pDUlHX/AA9SSaa5jmJS0SNmZ84wTx/jXQPp63N1bskCtGylg46nk4x7YFZ+kqkOhIGTINnyMdSzYrrooRBbQxgD5IQBnj1rotyxOdPmkcdFoF1eRHUbK93PIS8MMzYLDvtkHAb2NZVxp9rqMkkc4/s+/jOGZ12qx/21/h/3hx9KzdJ8QXukzSLGwmt3cmSBz8rHPUeh9xXZ29/o/iaBVk3+eg+Vs4nh+h/iH+cCpi1Mck4HAahp93plx5N7C0TdVPVWHqD3FVc1311p97aQSRlYdSsMcKR/IdVb6frTvDfhrw9cs0t3vE4chbSeTbgf1qJU30LVRdTz/cKM17Je+H9LvbB7FbKCJT91o1AaM/UV574n8H32gRi6yJ7JmCiUcFSezCstVujVcrV4s56ikpaYBSUUUAWaWkpaZAU+NS8sajqzAfrTKDyPQ007MHqe5si3OiG3OMiAJ/47Xjl9ZR2kzmRwzE8Rqen1Nb3hvxm8SjT9ckeS2YbBOPvoDxz6j3611Wm+CdG8v7dc3f22FvmRtwEYXt9a0aV7oUJJJxa1PPPDuky67rUNn5pgiJLO4HCADk10+seJdN8OXMll4ds7eSVeHuioyT3+taOs+LfD2h28trodtFcXLAqWQfIv1Pf6CvMG+dix6k5pNiWo65nlu7mSedyzyMWYn1NR7QWUeppelOR/LkWQBSVOQGGQfrUdSuh7TpaBLS3XA+UL/KuO+K4BvNP4wQjjpjuK0/D/AI00+4tDLqMiWbwYaROx917n6VyXjHxHD4gv42tomSKHIVm6tn27VrU1MqSaOeAoPSnRI88yxQI0kjHCqoyTXRWnhpYlV9QfdJwfJjPA9i3+FRGLlsXKSjuY2hxCTW7MyM6RidcuqbsHPArrdauFnvNOcbtzXzMysPT3rcsVj+xLsSNNoykSpgHFcZrF2Rr0UOZP3DYTamASevArTl5dLkXctRfG+6e8svLDOREUAAzjFc1tNesXEK3elLAqql0VDKO7fQ+lcfrGjrcyl7RFjuQPnj7OfX2NQ4Xuy1M5U8UhPFPlVo5GSRSrqcFSMEUzuKzNDvdOIW1hjZFdUghyCTyS1dZcWsc+n3U0xkRUt3OVlI6A1ytomVUR/MSIeR0wBmur1Xfb+FNUkfj/AENsZ46gj+tdNZWictJvmPFAOKWN3ikWSN2R1OQynBFKBxRXKdR2XhrX7rVbuPS7oLvkB/0nocAZ+YdDVfxQEt7sRzMy8j505x7irfw+0aV4LnWNhJU+TAMdT1Y/lgfjWprnh7+27KSSAhNQjPMR43AelbuT9ncwSi6ltjmX1DXLVLe2gunNm5Gx4ej/AFPX866zx8xj8A26ksXluFDZ9lq/4R8OSwaLDJqaCFVjIYS8BRuJ6VzXxF1/Tr6C30rS5TOlvIXkl/hJxjArjb5pJnakoxaOFopO9LWpkFFFFAFmikopki0UlFAARmni4nWDyBPIIc58sOdv5UykNFwEp1NooAU0lGaKAEK5pCuBxTqXIxTA9T0HSbK00GEWlvsmkJaSZjlm4HGe3fihbAO+eGB6HHAP071zXh3xydPgFrqULTQqMB0+9j0PrVHXfGd/qTNHZD7DbnjCn52Hue34Vu6iSsjnVNt3Z1d9qllpt0kKytPOWH7qPllPT5j2H+cVm3WmS3d/b3aJGrW8u2QqDuHcE9uoriNNDNq9qAx3POgznr8wr13Q7c/btSYDJDnAJwDkmpTvFstq0kjG0bW9P1FZESNVu1+XaTjIHdaWWCW6uXlmThh9+Lrn0I7/AF615q7vFdu6MY3SQkFTgg57V3PhbxVBchbbWGEcg+7P2b/e9D70oyvuOUbbE+seF4bnQbvU7mQpPbRb42TB347GvOu1ejeLPGOnpb3Wmacn2p5Y/LeUHEanoSP7xx+Fed44rOTvI0irI2vDfia50OcZjFzbd4X7e6ntTPEXiO/1+53XB8q3X/V26H5V/wATWQRRQ5NqzBRSd0L2pKKSkM9S+G+r2/8AYEFozqHtJ3Mi99rchvp1FZ3xGmuo9bivNOmlWFV/1kXAB+orz+N3iffE7Iw7qcGrdxq2pXNsLa4vZ5YV5EbOSKvmVrMz5GndFzVfFGt6pbLa3uoyywqMbOAD9cdaxxRRWVkja4UUUUxBRRSUAWaSiimSFLRRQAUlFFABSUUUAJRS0hoGFJRRSAMUhoopgXNCGfEOnD1uo/8A0IV7FovNxekdSw/ma8z8NaBqJvrbVZbZorO2lWR5JOMgHoB1Ndrp2vW9ndywyIwMjqWYg4C88/mRW0E+VmE2udHlVwQ1zMfWRv51GMg8HFTXtrc2lwRdQSQlyWXcMZHtUNYG4gHNOpKKACiiigYlFFFABRRRQAUUUUAFFFFACUUUUAWKKKKZIUUUlAC0lFFABRRSUhhRRSUAFJRRQAVPp4J1G3AOPnFQVPp8iRajA8rbYw43N6D1qo7ilse0eIlWDw4WdCYkiBbaegAryv7et480sayGQd2PzNGPWvU9engfw3cTROs8E8XlxFTkOWGBivNfBlpCdTuBc7flgIVXGdxLAHHvjNaKTUuUx5Vy8x2a21hq3hKZ7qPfClu0gLD5kIUnIryUdK9e1Mpp/gzUJZnEAkgaOJW4LMRgACvIR0qalubQ0p35dQpaKSszQWkoooAKKKKACiiigApKKKACiiigAooooAnpaSimSLSUUUAFFFJSGFFFFACUUUlABSUtJQAUGiigDX8O+JL3QZ8Ji4s2P7y2kOVb3HofeuwTxh4W0jTVudHspJr2TOYpVwVP+03p7D9K83NNp3YWNHW9b1DXb03WozmRuioOEQeijtWeKKKQwpaSigAooooAKKKSgAooooAKKKKACiiigAooooA//9k=",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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"];

  function RotateToUpright(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  RotateToUpright.id = "rotate-to-upright";

  RotateToUpright.prototype.render = function () {
    var self = this;
    var imgSrc = ROTATE_IMAGES[Math.floor(Math.random() * ROTATE_IMAGES.length)];
    var currentAngle = Math.floor(Math.random() * 360);
    var dragging = false;
    var dragStartAngle = 0;
    var dragStartRot = 0;
    var remaining = 20;

    this.container.innerHTML =
      '<div class="doom-challenge-title">Orientation Verification</div>' +
      '<div class="doom-challenge-instruction">Rotate the image to its correct upright orientation</div>' +
      '<div style="text-align:center;margin:16px 0">' +
      '<div class="doom-timer">' + remaining + '</div>' +
      '<div style="font-size:11px;color:#666;margin-bottom:12px">seconds remaining</div>' +
      '<div style="display:inline-block;position:relative;width:220px;height:220px;margin:0 auto">' +
      '<div id="doom-rotate-ring" style="width:220px;height:220px;border-radius:50%;border:3px dashed #303050;display:flex;align-items:center;justify-content:center;cursor:grab;user-select:none">' +
      '<div style="width:200px;height:200px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center">' +
      '<img id="doom-rotate-img" src="' + imgSrc + '" style="width:200px;height:200px;pointer-events:none;transform:rotate(' + currentAngle + 'deg)" />' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div style="margin-top:8px;font-size:12px;color:#888" id="doom-rotate-deg">' + currentAngle + '°</div>' +
      '<button class="doom-btn doom-submit" style="margin-top:12px">Submit Orientation</button>' +
      '</div>';

    var timerEl = this.container.querySelector(".doom-timer");
    var timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 5) timerEl.style.color = "#e94560";
      if (remaining <= 0) {
        clearInterval(timer);
        self.callbacks.onFail("Orientation verification timed out");
      }
    }, 1000);

    var ring = this.container.querySelector("#doom-rotate-ring");
    var img = this.container.querySelector("#doom-rotate-img");
    var degLabel = this.container.querySelector("#doom-rotate-deg");

    function getAngle(e) {
      var r = ring.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return Math.atan2(clientY - cy, clientX - cx) * 180 / Math.PI;
    }

    function onStart(e) {
      e.preventDefault();
      dragging = true;
      ring.style.cursor = "grabbing";
      dragStartAngle = getAngle(e);
      dragStartRot = currentAngle;
    }
    function onMove(e) {
      if (!dragging) return;
      e.preventDefault();
      var a = getAngle(e);
      var delta = a - dragStartAngle;
      currentAngle = ((dragStartRot + delta) % 360 + 360) % 360;
      img.style.transform = "rotate(" + currentAngle + "deg)";
      degLabel.textContent = Math.round(currentAngle) + "\u00b0";
    }
    function onEnd() {
      dragging = false;
      ring.style.cursor = "grab";
    }

    ring.addEventListener("mousedown", onStart);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    ring.addEventListener("touchstart", onStart, { passive: false });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);

    this.container.querySelector(".doom-submit").addEventListener("click", function () {
      clearInterval(timer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);

      var snapped = Math.round(currentAngle);
      var offBy = 1 + Math.floor(Math.random() * 5);
      var dir = Math.random() < 0.5 ? "clockwise" : "counter-clockwise";
      self.callbacks.onFail("Almost! Off by " + offBy + "\u00b0 " + dir + " (submitted: " + snapped + "\u00b0, required: " + ((snapped + offBy) % 360) + "\u00b0)");
    });
  };

  // ── Accessibility Audio ──────────────────────────────────────────────
  function AccessibilityAudio(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  AccessibilityAudio.id = "accessibility-audio";

  AccessibilityAudio.prototype.render = function () {
    var self = this;
    var baseDigits = [];
    for (var i = 0; i < 6; i++) baseDigits.push(Math.floor(Math.random() * 10));
    var currentDigits = baseDigits.slice();
    var playCount = 0;
    var remaining = 30;

    this.container.innerHTML =
      '<div class="doom-challenge-title">Accessibility Audio Verification</div>' +
      '<div class="doom-challenge-instruction">Listen to the code and type the 6 digits you hear</div>' +
      '<div style="text-align:center;margin:16px 0">' +
      '<div class="doom-timer">' + remaining + '</div>' +
      '<div style="font-size:11px;color:#666;margin-bottom:16px">seconds remaining</div>' +
      '<button class="doom-btn doom-audio-play" style="margin-bottom:12px">&#x1f50a; Play Code</button>' +
      '<div style="font-size:11px;color:#888;margin-bottom:12px" id="doom-replay-note"></div>' +
      '<div style="margin-top:8px">' +
      '<input class="doom-input" type="text" maxlength="6" placeholder="_ _ _ _ _ _" style="max-width:180px;text-align:center;letter-spacing:8px;font-family:monospace;font-size:18px" />' +
      '</div>' +
      '<button class="doom-btn doom-submit" style="margin-top:12px">Submit</button>' +
      '</div>';

    var timerEl = this.container.querySelector(".doom-timer");
    var timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 5) timerEl.style.color = "#e94560";
      if (remaining <= 0) {
        clearInterval(timer);
        self.callbacks.onFail("Audio verification timed out");
      }
    }, 1000);

    var playBtn = this.container.querySelector(".doom-audio-play");
    var replayNote = this.container.querySelector("#doom-replay-note");

    playBtn.addEventListener("click", function () {
      playBtn.disabled = true;
      playBtn.textContent = "Playing...";

      if (playCount > 0) {
        var swapA = Math.floor(Math.random() * 6);
        var swapB = (swapA + 1 + Math.floor(Math.random() * 5)) % 6;
        currentDigits[swapA] = (currentDigits[swapA] + 1 + Math.floor(Math.random() * 9)) % 10;
        currentDigits[swapB] = (currentDigits[swapB] + 1 + Math.floor(Math.random() * 9)) % 10;
      }
      playCount++;
      if (playCount >= 2) replayNote.textContent = "Replay " + playCount + " — audio may vary due to compression";

      try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        var now = ac.currentTime;
        var digitDur = 0.5;

        for (var di = 0; di < 6; di++) {
          var digit = currentDigits[di];
          var tStart = now + di * (digitDur + 0.15);

          var dtmfLow = [697, 697, 697, 770, 770, 770, 852, 852, 852, 941];
          var dtmfHigh = [1209, 1336, 1477, 1209, 1336, 1477, 1209, 1336, 1477, 1336];
          var freqPairs = [[dtmfLow[digit], dtmfHigh[digit]]];

          for (var fp = 0; fp < freqPairs.length; fp++) {
            for (var fi = 0; fi < 2; fi++) {
              var osc = ac.createOscillator();
              osc.type = "sine";
              osc.frequency.value = freqPairs[fp][fi] + (Math.random() - 0.5) * 30;
              var g = ac.createGain();
              g.gain.setValueAtTime(0, tStart);
              g.gain.linearRampToValueAtTime(0.15, tStart + 0.02);
              g.gain.setValueAtTime(0.15, tStart + digitDur - 0.02);
              g.gain.linearRampToValueAtTime(0, tStart + digitDur);
              osc.connect(g);
              g.connect(ac.destination);
              osc.start(tStart);
              osc.stop(tStart + digitDur);
            }
          }

          var nLen = Math.floor(ac.sampleRate * digitDur);
          var nBuf = ac.createBuffer(1, nLen, ac.sampleRate);
          var nData = nBuf.getChannelData(0);
          for (var ni = 0; ni < nLen; ni++) nData[ni] = (Math.random() * 2 - 1) * 0.7;
          var nSrc = ac.createBufferSource();
          nSrc.buffer = nBuf;
          var nGain = ac.createGain();
          nGain.gain.value = 0.12;
          nSrc.connect(nGain);
          nGain.connect(ac.destination);
          nSrc.start(tStart);
          nSrc.stop(tStart + digitDur);
        }

        var totalDur = 6 * (digitDur + 0.15);
        setTimeout(function () {
          playBtn.disabled = false;
          playBtn.textContent = "\uD83D\uDD0A Replay Code";
        }, totalDur * 1000 + 200);
      } catch (e) {
        playBtn.disabled = false;
        playBtn.textContent = "\uD83D\uDD0A Play Code";
      }
    });

    this.container.querySelector(".doom-submit").addEventListener("click", function () {
      clearInterval(timer);
      var answer = self.container.querySelector(".doom-input").value.replace(/\s/g, "");
      var target = currentDigits.join("");
      if (answer === target) {
        self.callbacks.onPass();
      } else if (answer === baseDigits.join("")) {
        self.callbacks.onFail("Code expired — audio was refreshed on replay");
      } else {
        self.callbacks.onFail("Incorrect code: expected " + target.substring(0, 2) + "****");
      }
    });
  };

  // ── Draw the Line ──────────────────────────────────────────────────
  function DrawTheLine(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  DrawTheLine.id = "draw-the-line";

  DrawTheLine.prototype.render = function () {
    var self = this;
    var remaining = 15;
    var rotSpeed = 3 + Math.random() * 4;
    if (Math.random() < 0.5) rotSpeed = -rotSpeed;

    var padX = 40;
    var padY = 30;
    var cw = 320;
    var ch = 180;
    var ax = padX;
    var ay = padY + Math.floor(Math.random() * (ch - padY * 2));
    var bx = cw - padX;
    var by = padY + Math.floor(Math.random() * (ch - padY * 2));

    this.container.innerHTML =
      '<div class="doom-challenge-title">Motor Precision Test</div>' +
      '<div class="doom-challenge-instruction">Draw a straight line from A to B</div>' +
      '<div style="text-align:center;margin:16px 0">' +
      '<div class="doom-timer">' + remaining + '</div>' +
      '<div style="font-size:11px;color:#666;margin-bottom:12px">seconds remaining</div>' +
      '<div id="doom-line-wrap" style="display:inline-block;position:relative;border:1px solid #303050;border-radius:4px;overflow:hidden;transition:transform 0.1s linear">' +
      '<canvas width="' + cw + '" height="' + ch + '" style="display:block;cursor:crosshair;background:#0a0a2a"></canvas>' +
      '</div>' +
      '<div style="margin-top:12px">' +
      '<button class="doom-btn doom-submit">Verify Line</button>' +
      '<button class="doom-btn" style="margin-left:8px;background:#333;border-color:#555" id="doom-line-clear">Clear</button>' +
      '</div>' +
      '</div>';

    var timerEl = this.container.querySelector(".doom-timer");
    var timer = setInterval(function () {
      remaining--;
      timerEl.textContent = remaining;
      if (remaining <= 5) timerEl.style.color = "#e94560";
      if (remaining <= 0) {
        clearInterval(timer);
        cancelAnimationFrame(rotFrame);
        self.callbacks.onFail("Verification timed out");
      }
    }, 1000);

    var canvas = this.container.querySelector("canvas");
    var wrap = this.container.querySelector("#doom-line-wrap");
    var ctx = canvas.getContext("2d");
    var drawing = false;
    var points = [];
    var drawStart = 0;
    var currentRot = 0;
    var rotFrame = null;
    var lastRotTime = null;

    ctx.fillStyle = "#e94560";
    ctx.beginPath();
    ctx.arc(ax, ay, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4ecdc4";
    ctx.beginPath();
    ctx.arc(bx, by, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "#e94560";
    ctx.fillText("A", ax - 4, ay - 12);
    ctx.fillStyle = "#4ecdc4";
    ctx.fillText("B", bx - 4, by - 12);

    var baseImage = ctx.getImageData(0, 0, cw, ch);

    function redraw() {
      ctx.putImageData(baseImage, 0, 0);
      if (points.length > 1) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
    }

    function rotateLoop(ts) {
      if (!drawing) return;
      if (lastRotTime === null) lastRotTime = ts;
      var dt = (ts - lastRotTime) / 1000;
      lastRotTime = ts;
      currentRot += rotSpeed * dt;
      wrap.style.transform = "rotate(" + currentRot + "deg)";
      rotFrame = requestAnimationFrame(rotateLoop);
    }

    function getPos(e) {
      var r = canvas.getBoundingClientRect();
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - r.left, y: clientY - r.top };
    }

    function onStart(e) {
      e.preventDefault();
      drawing = true;
      drawStart = Date.now();
      lastRotTime = null;
      points = [getPos(e)];
      rotFrame = requestAnimationFrame(rotateLoop);
    }
    function onMove(e) {
      if (!drawing) return;
      e.preventDefault();
      points.push(getPos(e));
      redraw();
    }
    function onEnd(e) {
      if (!drawing) return;
      drawing = false;
      cancelAnimationFrame(rotFrame);
    }

    canvas.addEventListener("mousedown", onStart);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onEnd);
    canvas.addEventListener("touchstart", onStart, { passive: false });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    canvas.addEventListener("touchend", onEnd);

    this.container.querySelector("#doom-line-clear").addEventListener("click", function () {
      points = [];
      currentRot = 0;
      wrap.style.transform = "rotate(0deg)";
      redraw();
    });

    this.container.querySelector(".doom-submit").addEventListener("click", function () {
      clearInterval(timer);
      cancelAnimationFrame(rotFrame);
      if (points.length < 5) {
        self.callbacks.onFail("No line detected");
        return;
      }

      var drawDuration = (Date.now() - drawStart) / 1000;

      var maxDev = 0;
      var dx = bx - ax;
      var dy = by - ay;
      var lineLen = Math.sqrt(dx * dx + dy * dy);

      for (var j = 0; j < points.length; j++) {
        var px = points[j].x - ax;
        var py = points[j].y - ay;
        var t = (px * dx + py * dy) / (lineLen * lineLen);
        var projX = dx * t;
        var projY = dy * t;
        var dev = Math.sqrt((px - projX) * (px - projX) + (py - projY) * (py - projY));
        if (dev > maxDev) maxDev = dev;
      }

      var speeds = [];
      for (var k = 1; k < points.length; k++) {
        var sd = Math.sqrt(
          Math.pow(points[k].x - points[k - 1].x, 2) +
          Math.pow(points[k].y - points[k - 1].y, 2)
        );
        speeds.push(sd);
      }
      var avgSpeed = 0;
      for (var s = 0; s < speeds.length; s++) avgSpeed += speeds[s];
      avgSpeed /= speeds.length;
      var variance = 0;
      for (var sv = 0; sv < speeds.length; sv++) variance += Math.pow(speeds[sv] - avgSpeed, 2);
      variance /= speeds.length;
      var coeffVar = Math.sqrt(variance) / (avgSpeed || 1);

      if (drawDuration < 0.4) {
        self.callbacks.onFail("Tremor detected — possible automated input (duration: " + drawDuration.toFixed(2) + "s)");
      } else if (coeffVar < 0.35) {
        self.callbacks.onFail("Unnaturally consistent velocity (" + (coeffVar * 100).toFixed(1) + "% variance). Bot pattern detected.");
      } else if (maxDev > 8) {
        self.callbacks.onFail("Line deviation: " + maxDev.toFixed(1) + "px (max allowed: 3.0px)");
      } else {
        self.callbacks.onFail("Line deviation: " + (maxDev + 3.5).toFixed(1) + "px (max allowed: 3.0px)");
      }
    });
  };

  // ── Confidence Checkbox ────────────────────────────────────────────
  function ConfidenceCheckbox(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
  }
  ConfidenceCheckbox.id = "confidence-checkbox";

  ConfidenceCheckbox.prototype.render = function () {
    var self = this;
    var windowCenter = 800 + Math.floor(Math.random() * 2400);
    var windowSize = 40;
    var appeared = Date.now();

    this.container.innerHTML =
      '<div class="doom-challenge-title">One-Click Verification</div>' +
      '<div class="doom-challenge-instruction">Verify that you are human</div>' +
      '<div style="text-align:center;margin:32px 0">' +
      '<div style="display:inline-flex;align-items:center;background:#111;border:2px solid #303050;border-radius:4px;padding:16px 24px;cursor:pointer;user-select:none" id="doom-checkbox-row">' +
      '<div style="width:24px;height:24px;border:2px solid #555;border-radius:3px;margin-right:16px;display:flex;align-items:center;justify-content:center;transition:all 0.15s" id="doom-cbox"></div>' +
      '<span style="font-size:14px;color:#ccc">I\'m not a robot</span>' +
      '</div>' +
      '<div id="doom-cbox-status" style="margin-top:16px;min-height:20px;font-size:12px;color:#666"></div>' +
      '<div style="margin-top:8px;font-size:10px;color:#444">DoomCaptcha Privacy — Terms</div>' +
      '</div>';

    var checkboxRow = this.container.querySelector("#doom-checkbox-row");
    var cbox = this.container.querySelector("#doom-cbox");
    var status = this.container.querySelector("#doom-cbox-status");
    var clicked = false;

    var analyzing = [
      "Analyzing click pattern...",
      "Verifying input device...",
      "Checking browser fingerprint...",
      "Validating interaction metrics...",
      "Cross-referencing behavioral model..."
    ];

    checkboxRow.addEventListener("click", function () {
      if (clicked) return;
      clicked = true;

      var elapsed = Date.now() - appeared;

      cbox.style.borderColor = "#4ecdc4";
      cbox.style.background = "#4ecdc4";
      cbox.innerHTML = '<span style="color:#000;font-weight:bold;font-size:16px">&#x2713;</span>';

      var step = 0;
      status.style.color = "#888";
      status.textContent = analyzing[0];

      var analyzeTimer = setInterval(function () {
        step++;
        if (step < analyzing.length) {
          status.textContent = analyzing[step];
        } else {
          clearInterval(analyzeTimer);

          cbox.style.borderColor = "#e94560";
          cbox.style.background = "transparent";
          cbox.innerHTML = '<span style="color:#e94560;font-weight:bold;font-size:16px">&#x2717;</span>';
          status.style.color = "#e94560";

          if (elapsed < windowCenter - windowSize / 2) {
            status.textContent = "FAILED: Bot-like response time (" + (elapsed / 1000).toFixed(2) + "s). Human reaction range: " + ((windowCenter - windowSize / 2) / 1000).toFixed(2) + "s - " + ((windowCenter + windowSize / 2) / 1000).toFixed(2) + "s";
            setTimeout(function () { self.callbacks.onFail("Bot-like response time detected (" + (elapsed / 1000).toFixed(2) + "s)"); }, 2000);
          } else if (elapsed > windowCenter + windowSize / 2) {
            status.textContent = "FAILED: Scripted wait() detected. Response delay " + (elapsed / 1000).toFixed(2) + "s matches setTimeout pattern.";
            setTimeout(function () { self.callbacks.onFail("Scripted wait() pattern detected"); }, 2000);
          } else {
            status.textContent = "FAILED: Click coordinates match known automation framework (±2px grid alignment)";
            setTimeout(function () { self.callbacks.onFail("Click pattern matches automation framework"); }, 2000);
          }
        }
      }, 600);
    });
  };

  // ── Engine ──────────────────────────────────────────────────────────
  var ALL_CHALLENGES = [ImpossibleMath, PixelHunt, EndlessGrid, RebelliousSlider, IdentityGauntlet, TypingSpeed, JigsawPiece, TermsOfService, AudioTranscription, ColorMatch, PatienceTest, SudokuTrap, BiggerNumber, CursedSMS, PhantomWord, AlwaysWrongRiddles, AccessibilityAudio, DrawTheLine, ConfidenceCheckbox, RotateToUpright, SemanticMinefield, FaceDirection];

  function DoomCaptchaEngine(container, options) {
    this.container = typeof container === "string" ? document.querySelector(container) : container;
    this.options = options || {};
    this.options.theme = this.options.theme || "dark";
    this.options.challenges = this.options.challenges || "all";
    this.challengeQueue = [];
    this.currentChallenge = null;
    this.attemptCount = 0;
    this.confidence = 0;
  }

  DoomCaptchaEngine.prototype.start = function () {
    injectStyles();
    this.container.classList.add("doom-captcha", "doom-theme-" + this.options.theme);
    this.challengeQueue = this._buildQueue();
    this._renderShell();
    this._next();
  };

  DoomCaptchaEngine.prototype._buildQueue = function () {
    var pool;
    if (this.options.challenges === "all") {
      pool = ALL_CHALLENGES.slice();
    } else {
      pool = ALL_CHALLENGES.filter(function (c) {
        return this.options.challenges.indexOf(c.id) !== -1;
      }.bind(this));
    }
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    return pool;
  };

  DoomCaptchaEngine.prototype._renderShell = function () {
    this.container.innerHTML =
      '<div class="doom-shell">' +
      '<div class="doom-header">' +
      '<div class="doom-title"><span class="doom-lock">&#x1f512;</span><span>Human Verification Required</span></div>' +
      '<div class="doom-subtitle">Complete the challenge to proceed</div>' +
      "</div>" +
      '<div class="doom-confidence">' +
      '<div class="doom-confidence-label"><span>Confidence Score</span><span class="doom-confidence-pct">0%</span></div>' +
      '<div class="doom-confidence-track"><div class="doom-confidence-fill doom-conf-low"></div></div>' +
      "</div>" +
      '<div class="doom-challenge-area"></div>' +
      '<div class="doom-footer">' +
      '<div class="doom-progress"><div class="doom-progress-bar"></div></div>' +
      '<div class="doom-attempt-count">Attempt #1</div>' +
      "</div></div>";
    this.challengeArea = this.container.querySelector(".doom-challenge-area");
    this.progressBar = this.container.querySelector(".doom-progress-bar");
    this.attemptLabel = this.container.querySelector(".doom-attempt-count");
    this.confFill = this.container.querySelector(".doom-confidence-fill");
    this.confPct = this.container.querySelector(".doom-confidence-pct");
  };

  DoomCaptchaEngine.prototype._next = function () {
    this.attemptCount++;
    this.attemptLabel.textContent = "Attempt #" + this.attemptCount;
    if (this.challengeQueue.length === 0) this.challengeQueue = this._buildQueue();

    var Ctor = this.challengeQueue.shift();
    var self = this;
    this.currentChallenge = new Ctor(this.challengeArea, {
      onPass: function () { self._onResult(true); },
      onFail: function (msg) { self._onResult(false, msg); },
    });
    this.currentChallenge.render();
    this.progressBar.style.width = "0%";
  };

  DoomCaptchaEngine.prototype._onResult = function (passed, message) {
    var self = this;
    if (passed) {
      var gain = (100 - this.confidence) * (0.08 + Math.random() * 0.12);
      this.confidence = Math.min(99.4, this.confidence + gain);
      this._updateConfidence(false);
      this._fakeProgress(function () {
        if (Math.random() < 0.35) {
          var drop = 5 + Math.random() * 10;
          self.confidence = Math.max(0, self.confidence - drop);
          self._updateConfidence(true);
          self._showMessage("Confidence recalibrated. Additional verification required...", "warn");
        } else {
          self._showMessage("Additional verification required...", "warn");
        }
        setTimeout(function () { self._next(); }, 1500);
      });
    } else {
      var loss = 1 + Math.random() * 4;
      this.confidence = Math.max(0, this.confidence - loss);
      this._updateConfidence(true);
      this._showMessage(message || "Verification failed. Try again.", "error");
      setTimeout(function () { self._next(); }, 2000);
    }
  };

  DoomCaptchaEngine.prototype._updateConfidence = function (isDrop) {
    var pct = Math.round(this.confidence);
    this.confFill.style.width = pct + "%";
    this.confPct.textContent = pct + "%";

    this.confFill.classList.remove("doom-conf-low", "doom-conf-mid", "doom-conf-high");
    if (pct < 33) {
      this.confFill.classList.add("doom-conf-low");
      this.confPct.style.color = "#e94560";
    } else if (pct < 66) {
      this.confFill.classList.add("doom-conf-mid");
      this.confPct.style.color = "#e9c845";
    } else {
      this.confFill.classList.add("doom-conf-high");
      this.confPct.style.color = "#45e980";
    }

    if (isDrop) {
      var bar = this.confFill;
      bar.classList.remove("doom-confidence-drop");
      void bar.offsetWidth;
      bar.classList.add("doom-confidence-drop");
    }
  };

  DoomCaptchaEngine.prototype._fakeProgress = function (callback) {
    var bar = this.progressBar;
    bar.style.width = "0%";
    var progress = 0;
    var tick = setInterval(function () {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(tick);
        bar.style.width = "100%";
        setTimeout(callback, 400);
      } else {
        bar.style.width = progress + "%";
      }
    }, 200);
  };

  DoomCaptchaEngine.prototype._showMessage = function (text, type) {
    var existing = this.container.querySelector(".doom-message");
    if (existing) existing.remove();
    var msg = document.createElement("div");
    msg.className = "doom-message doom-message-" + type;
    msg.textContent = text;
    this.challengeArea.prepend(msg);
    setTimeout(function () { msg.remove(); }, 3000);
  };

  // ── Public API ──────────────────────────────────────────────────────
  window.DoomCaptcha = {
    challenges: ALL_CHALLENGES,
    init: function (container, options) {
      injectStyles();

      var target = typeof container === "string" ? document.querySelector(container) : container;

      var overlay = document.createElement("div");
      overlay.className = "doom-overlay";

      var captchaEl = document.createElement("div");
      overlay.appendChild(captchaEl);
      document.body.appendChild(overlay);

      var engine = new DoomCaptchaEngine(captchaEl, options);
      engine.overlay = overlay;
      engine.start();

      var keyHandler = function (e) {
        if (e.key === ":") {
          overlay.remove();
          document.removeEventListener("keydown", keyHandler);
        }
      };
      document.addEventListener("keydown", keyHandler);

      engine.dismiss = function () {
        overlay.remove();
        document.removeEventListener("keydown", keyHandler);
      };

      return engine;
    },
    register: function (challenge) {
      ALL_CHALLENGES.push(challenge);
    },
  };
})();
