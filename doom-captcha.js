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
          voiceGain.gain.linearRampToValueAtTime(0.12, now + 0.05);
          voiceGain.gain.setValueAtTime(0.12, now + duration - 0.1);
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
            fGain.gain.value = 0.3 / (fi + 1);
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
          noiseGain.gain.value = 0.015;
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

  // ── Engine ──────────────────────────────────────────────────────────
  var ALL_CHALLENGES = [ImpossibleMath, PixelHunt, EndlessGrid, RebelliousSlider, IdentityGauntlet, TypingSpeed, JigsawPiece, TermsOfService, AudioTranscription, ColorMatch, PatienceTest, SudokuTrap, BiggerNumber, CursedSMS, PhantomWord, AlwaysWrongRiddles];

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
