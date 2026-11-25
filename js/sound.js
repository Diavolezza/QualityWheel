// Sounds of the wheel, made with the Web Audio API (no audio files):
// a short click for every segment that passes the pointer, a soft bell when the wheel stops.
"use strict";
window.QW = window.QW || {};

QW.sound = (function () {
  var ctx = null, master = null, noise = null, lastTick = 0;
  var enabled = true;
  try { enabled = window.localStorage.getItem("qw.sound") !== "off"; } catch (e) { /* ignore */ }

  function makeNoise(c) {
    var b = c.createBuffer(1, Math.round(c.sampleRate * 0.04), c.sampleRate);
    var d = b.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  // One click: a short wooden "tock" (pitch falling quickly) plus a bit of noise for the attack.
  function playTick(c, out, noiseBuf, when) {
    var osc = c.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1700, when);
    osc.frequency.exponentialRampToValueAtTime(600, when + 0.03);
    var og = c.createGain();
    og.gain.setValueAtTime(0.0001, when);
    og.gain.exponentialRampToValueAtTime(0.5, when + 0.002);
    og.gain.exponentialRampToValueAtTime(0.0001, when + 0.045);
    osc.connect(og);
    og.connect(out);
    osc.start(when);
    osc.stop(when + 0.05);

    var src = c.createBufferSource();
    src.buffer = noiseBuf;
    var hp = c.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1500;
    var ng = c.createGain();
    ng.gain.setValueAtTime(0.0001, when);
    ng.gain.exponentialRampToValueAtTime(0.33, when + 0.001);
    ng.gain.exponentialRampToValueAtTime(0.0001, when + 0.018);
    src.connect(hp);
    hp.connect(ng);
    ng.connect(out);
    src.start(when);
    src.stop(when + 0.02);
  }

  function playBell(c, out, when) {
    [880, 1320].forEach(function (f, i) {
      var osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      var g = c.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(i === 0 ? 0.5 : 0.2, when + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 0.8);
      osc.connect(g);
      g.connect(out);
      osc.start(when);
      osc.stop(when + 0.85);
    });
  }

  // Browsers allow audio only after a user gesture: call unlock() inside a click handler.
  function unlock() {
    if (!enabled) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.8;
      master.connect(ctx.destination);
      noise = makeNoise(ctx);
    }
    if (ctx.state !== "running" && ctx.resume) ctx.resume();
    // iOS unlocks audio only when a sound starts inside the gesture: play one silent sample.
    var silent = ctx.createBufferSource();
    silent.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    silent.connect(ctx.destination);
    silent.start(0);
  }

  function tick() {
    if (!enabled || !ctx || ctx.state !== "running") return;
    var now = ctx.currentTime;
    if (now - lastTick < 0.03) return;   // at full speed the clicks would merge into a buzz
    lastTick = now;
    playTick(ctx, master, noise, now);
  }

  function stop() {
    if (!enabled || !ctx || ctx.state !== "running") return;
    playBell(ctx, master, ctx.currentTime + 0.02);
  }

  function setEnabled(on) {
    enabled = on;
    try { window.localStorage.setItem("qw.sound", on ? "on" : "off"); } catch (e) { /* ignore */ }
    if (on) unlock();
  }

  return {
    unlock: unlock, tick: tick, stop: stop, setEnabled: setEnabled,
    isEnabled: function () { return enabled; },
    state: function () { return ctx ? ctx.state : "none"; },
    // for tests: render sounds into an offline context
    _playTick: playTick, _playBell: playBell, _makeNoise: makeNoise
  };
})();
