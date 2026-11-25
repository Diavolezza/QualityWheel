// Sounds of the wheel, made with the Web Audio API (no audio files):
// a short click for every segment that passes the pointer, a soft bell when the wheel stops.
"use strict";
window.QW = window.QW || {};

QW.sound = (function () {
  var ctx = null, noise = null, lastTick = 0;
  var enabled = true;
  try { enabled = window.localStorage.getItem("qw.sound") !== "off"; } catch (e) { /* ignore */ }

  // Browsers allow audio only after a user gesture: call unlock() in a click handler.
  function unlock() {
    if (!enabled) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx) {
      ctx = new AC();
      // 30 ms of white noise, reused for every click
      noise = ctx.createBuffer(1, Math.round(ctx.sampleRate * 0.03), ctx.sampleRate);
      var d = noise.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
  }

  function tick() {
    if (!enabled || !ctx) return;
    var now = ctx.currentTime;
    if (now - lastTick < 0.018) return;   // at full speed the clicks would merge into a hiss
    lastTick = now;
    var src = ctx.createBufferSource();
    src.buffer = noise;
    var band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 2400 + Math.random() * 400;
    band.Q.value = 1.4;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.55, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);
    src.connect(band).connect(gain).connect(ctx.destination);
    src.start(now);
    src.stop(now + 0.03);
  }

  function stop() {
    if (!enabled || !ctx) return;
    var now = ctx.currentTime;
    [880, 1320].forEach(function (f, i) {
      var osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      var gain = ctx.createGain();
      var peak = i === 0 ? 0.18 : 0.07;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.75);
    });
  }

  function setEnabled(on) {
    enabled = on;
    try { window.localStorage.setItem("qw.sound", on ? "on" : "off"); } catch (e) { /* ignore */ }
    if (on) unlock();
  }

  return {
    unlock: unlock, tick: tick, stop: stop, setEnabled: setEnabled,
    isEnabled: function () { return enabled; }
  };
})();
