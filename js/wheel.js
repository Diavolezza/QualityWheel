// The wheel: 40 segments in the order of the standard, coloured by characteristic.
// The pointer sits on the right (angle 0). Angles grow clockwise, as on a canvas.
"use strict";
window.QW = window.QW || {};

QW.Wheel = function (canvas, items) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.items = items;                 // [{ id, label, color, text }]
  this.rot = -Math.PI / 2 + 0.0001;   // the first segment starts at the top
  this.drawn = [];                    // ids already drawn, in order
  this.highlight = null;              // id of the segment that just won
  this.spinning = false;
  this.size = 0;
  this.resize();
};

QW.Wheel.prototype.segAngle = function () {
  return (2 * Math.PI) / this.items.length;
};

QW.Wheel.prototype.setLabels = function (items) {
  this.items = items;
  this.draw();
};

QW.Wheel.prototype.resize = function () {
  var css = this.canvas.getBoundingClientRect().width || 520;
  var dpr = window.devicePixelRatio || 1;
  this.size = css;
  this.canvas.width = Math.round(css * dpr);
  this.canvas.height = Math.round(css * dpr);
  this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  this.draw();
};

// Index of the segment under the pointer for a given rotation.
QW.Wheel.prototype.indexAt = function (rot) {
  var seg = this.segAngle();
  var a = (((-rot) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return Math.floor(a / seg) % this.items.length;
};

QW.Wheel.prototype.draw = function () {
  var ctx = this.ctx, n = this.items.length, seg = this.segAngle();
  var s = this.size, cx = s / 2 - 6, cy = s / 2, R = s / 2 - 37;
  var inner = R * 0.24;
  ctx.clearRect(0, 0, s, s);

  // shadow ring
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, R + 6, 0, 2 * Math.PI);
  ctx.fillStyle = "#2b2f36";
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  ctx.fill();
  ctx.restore();

  for (var i = 0; i < n; i++) {
    var it = this.items[i];
    var a0 = this.rot + i * seg, a1 = a0 + seg;
    var used = this.drawn.indexOf(it.id) >= 0;
    var hi = this.highlight === it.id;
    var rr = hi ? R + 4 : R;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, rr, a0, a1);
    ctx.closePath();
    var fill = used && !hi ? "#d7d7d7" : it.color;
    ctx.fillStyle = fill;
    ctx.fill();
    // alternate a light veil inside a characteristic, so neighbouring segments stay distinguishable
    if (!used && it.shade) {
      ctx.fillStyle = "rgba(255,255,255,0.13)";
      ctx.fill();
    }
    ctx.lineWidth = hi ? 3 : 1;
    ctx.strokeStyle = hi ? "#ffffff" : "rgba(255,255,255,0.75)";
    ctx.stroke();

    // label along the radius, right-aligned at the rim
    var mid = a0 + seg / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(mid);
    var maxLen = rr - 12 - inner - 8;
    var fs = Math.max(7, Math.min(12.5, s / 44));
    ctx.font = "600 " + fs + "px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
    while (ctx.measureText(it.label).width > maxLen && fs > 6.5) {
      fs -= 0.5;
      ctx.font = "600 " + fs + "px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
    }
    ctx.fillStyle = used && !hi ? "#7a7a7a" : it.text;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(it.label, rr - 12, 0.5);
    ctx.restore();
  }

  // outer boundaries between characteristics
  ctx.save();
  ctx.strokeStyle = "#2b2f36";
  ctx.lineWidth = 2.5;
  for (var j = 0; j < n; j++) {
    var prev = this.items[(j - 1 + n) % n];
    if (prev.cat !== this.items[j].cat) {
      var a = this.rot + j * seg;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.stroke();
    }
  }
  ctx.restore();

  // numbers 1 and 2 on drawn segments
  for (var k = 0; k < this.drawn.length; k++) {
    var idx = this.indexOfId(this.drawn[k]);
    if (idx < 0 || this.drawn[k] === this.highlight) continue;   // the pointer marks the current one
    var am = this.rot + idx * seg + seg / 2;
    var br = R + 18;
    var bx = cx + Math.cos(am) * br, by = cy + Math.sin(am) * br;
    ctx.beginPath();
    ctx.arc(bx, by, 11, 0, 2 * Math.PI);
    ctx.fillStyle = this.items[idx].color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.fillStyle = this.items[idx].text;
    ctx.font = "700 12px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(k + 1), bx, by + 0.5);
  }

  // hub
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#2b2f36";
  ctx.stroke();
  ctx.fillStyle = "#2b2f36";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 " + Math.round(inner * 0.26) + "px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ISO/IEC", cx, cy - inner * 0.17);
  ctx.fillText("25010", cx, cy + inner * 0.17);

  // pointer on the right, pointing to the left
  var px = cx + R + 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(px - 16, cy);
  ctx.lineTo(px + 18, cy - 15);
  ctx.lineTo(px + 18, cy + 15);
  ctx.closePath();
  ctx.fillStyle = "#2b2f36";
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 6;
  ctx.fill();
  ctx.restore();
  ctx.beginPath();
  ctx.moveTo(px - 10, cy);
  ctx.lineTo(px + 13, cy - 9.5);
  ctx.lineTo(px + 13, cy + 9.5);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();
};

QW.Wheel.prototype.indexOfId = function (id) {
  for (var i = 0; i < this.items.length; i++) if (this.items[i].id === id) return i;
  return -1;
};

// Turns the wheel so that the segment with the given id stops under the pointer.
QW.Wheel.prototype.spinTo = function (id, done) {
  var self = this, seg = this.segAngle(), idx = this.indexOfId(id);
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var frac = 0.2 + QW.random() * 0.6;            // never stop right on a border
  var target = -(idx + frac) * seg;
  var start = this.rot;
  var delta = (((target - start) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  var turns = reduced ? 0 : 5 + Math.floor(QW.random() * 3);
  var end = start + delta + turns * 2 * Math.PI;
  var duration = reduced ? 400 : 4200 + QW.random() * 1200;
  var t0 = null;
  this.spinning = true;
  this.highlight = null;
  function ease(t) { return 1 - Math.pow(1 - t, 4); }
  function frame(ts) {
    if (t0 === null) t0 = ts;
    var t = Math.min(1, (ts - t0) / duration);
    self.rot = start + (end - start) * ease(t);
    self.draw();
    if (t < 1) {
      window.requestAnimationFrame(frame);
    } else {
      self.rot = end % (2 * Math.PI);
      self.spinning = false;
      self.highlight = id;
      self.draw();
      if (done) done(id);
    }
  }
  window.requestAnimationFrame(frame);
};

// Uniform random number in [0, 1), from the crypto API where available.
QW.random = function () {
  if (window.crypto && window.crypto.getRandomValues) {
    var a = new Uint32Array(1);
    window.crypto.getRandomValues(a);
    return a[0] / 4294967296;
  }
  return Math.random();
};
