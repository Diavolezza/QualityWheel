// Draws the result (two qualities and the assessment) on a canvas and returns it as PNG.
"use strict";
window.QW = window.QW || {};

QW.FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

QW.wrapText = function (ctx, text, maxWidth) {
  var lines = [];
  String(text || "").split(/\n/).forEach(function (para) {
    var words = para.split(/\s+/).filter(Boolean), line = "";
    if (!words.length) { lines.push(""); return; }
    words.forEach(function (w) {
      var test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    });
    lines.push(line);
  });
  return lines;
};

// state: { lang, drawn: [id, id], relation, texts: {support, conflict, neutral}, name }
QW.renderResult = function (state) {
  var lang = state.lang, t = function (k, v) { return QW.t(lang, k, v); };
  var W = 1600, pad = 64, gap = 96, colW = (W - 2 * pad - gap) / 2;
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var scale = 1;

  function font(weight, size, style) {
    return (style ? style + " " : "") + weight + " " + size + "px " + QW.FONT;
  }

  // ---- measure ----
  function cardLayout(q) {
    var cat = QW.categoryById[q.cat];
    ctx.font = font(700, 38);
    var titleLines = QW.wrapText(ctx, q.id + "  " + q.name[lang], colW - 64);
    ctx.font = font(400, 26);
    var descLines = QW.wrapText(ctx, q.desc[lang], colW - 64);
    ctx.font = font(400, 24, "italic");
    var exLines = QW.wrapText(ctx, q.example[lang], colW - 64);
    var h = 64 + 28 + titleLines.length * 46 + 16 + descLines.length * 36 + 22 + 32 + exLines.length * 34 + 32;
    return { q: q, cat: cat, titleLines: titleLines, descLines: descLines, exLines: exLines, h: h };
  }
  ctx.font = font(400, 26);
  var cards = state.drawn.map(function (id) { return cardLayout(QW.qualityById[id]); });
  var cardH = Math.max(cards[0].h, cards[1].h);

  var rel = state.relation;
  var blocks = [];
  if (rel) {
    QW.relationFields[rel].forEach(function (f) {
      var txt = (state.texts[f] || "").trim();
      ctx.font = font(400, 28);
      blocks.push({ field: f, lines: txt ? QW.wrapText(ctx, txt, W - 2 * pad - 80) : ["–"] });
    });
  }
  var assessH = 48 + 56 + 20;
  blocks.forEach(function (b) { assessH += 40 + b.lines.length * 40 + 18; });
  assessH += 22;

  var headH = 140;
  var H = pad + headH + cardH + 48 + assessH + 70 + pad / 2;
  canvas.width = W * scale;
  canvas.height = H * scale;
  ctx.scale(scale, scale);

  // ---- draw ----
  ctx.fillStyle = "#f6f5f2";
  ctx.fillRect(0, 0, W, H);

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.fillStyle = "#1f2328";
  ctx.font = font(800, 46);
  ctx.fillText(t("title"), pad, pad + 40);
  ctx.fillStyle = "#59606b";
  ctx.font = font(400, 24);
  ctx.fillText("ISO/IEC 25010:2023", pad, pad + 80);
  if (state.name && state.name.trim()) {
    ctx.textAlign = "right";
    ctx.fillStyle = "#1f2328";
    ctx.font = font(600, 28);
    ctx.fillText(state.name.trim(), W - pad, pad + 40);
    ctx.textAlign = "left";
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  var top = pad + headH;
  cards.forEach(function (c, i) {
    var x = pad + i * (colW + gap), y = top;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.12)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 4;
    roundRect(x, y, colW, cardH, 18);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.restore();
    // colour strip with the characteristic
    ctx.save();
    roundRect(x, y, colW, cardH, 18);
    ctx.clip();
    ctx.fillStyle = c.cat.color;
    ctx.fillRect(x, y, colW, 64);
    ctx.restore();
    ctx.fillStyle = c.cat.text;
    ctx.font = font(700, 24);
    ctx.fillText(t("slot", { n: i + 1 }) + "  ·  " + c.cat.id + " " + c.cat.name[lang], x + 32, y + 41);

    var yy = y + 64 + 28 + 36;
    ctx.fillStyle = "#1f2328";
    ctx.font = font(700, 38);
    c.titleLines.forEach(function (l) { ctx.fillText(l, x + 32, yy); yy += 46; });
    yy += 16 - 46 + 36;
    ctx.fillStyle = "#30363d";
    ctx.font = font(400, 26);
    c.descLines.forEach(function (l) { ctx.fillText(l, x + 32, yy); yy += 36; });
    yy += 22;
    ctx.fillStyle = c.cat.color === "#F9A825" ? "#8a5d00" : c.cat.color;
    ctx.font = font(700, 22);
    ctx.fillText(t("example").toUpperCase(), x + 32, yy);
    yy += 34;
    ctx.fillStyle = "#4a515b";
    ctx.font = font(400, 24, "italic");
    c.exLines.forEach(function (l) { ctx.fillText(l, x + 32, yy); yy += 34; });
  });

  // relation symbol between the cards
  var r = rel ? QW.relations[rel] : { symbol: "?", color: "#9aa0a6" };
  var sx = pad + colW + gap / 2, sy = top + cardH / 2;
  ctx.beginPath();
  ctx.arc(sx, sy, 38, 0, 2 * Math.PI);
  ctx.fillStyle = r.color;
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#f6f5f2";
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = font(800, 46);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(r.symbol, sx, sy + 2);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // assessment
  var ay = top + cardH + 48;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.12)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 4;
  roundRect(pad, ay, W - 2 * pad, assessH, 18);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();
  ctx.save();
  roundRect(pad, ay, W - 2 * pad, assessH, 18);
  ctx.clip();
  ctx.fillStyle = r.color;
  ctx.fillRect(pad, ay, 12, assessH);
  ctx.restore();

  var ax = pad + 48, yy2 = ay + 56;
  ctx.fillStyle = "#59606b";
  ctx.font = font(700, 22);
  ctx.fillText(t("exportAssessment").toUpperCase(), ax, yy2);
  yy2 += 52;
  ctx.fillStyle = r.color;
  ctx.font = font(800, 40);
  ctx.fillText(rel ? r.symbol + "  " + t("rel_" + rel) : t("rel_none"), ax, yy2);
  yy2 += 20;
  blocks.forEach(function (b) {
    yy2 += 40;
    ctx.fillStyle = rel !== "both" ? "#59606b" : b.field === "support" ? QW.relations.support.color
      : b.field === "conflict" ? QW.relations.conflict.color : "#59606b";
    ctx.font = font(700, 24);
    ctx.fillText(t(rel === "both" ? "label_" + b.field : "label_neutral"), ax, yy2);
    ctx.fillStyle = "#1f2328";
    ctx.font = font(400, 28);
    b.lines.forEach(function (l) { yy2 += 40; ctx.fillText(l, ax, yy2); });
    yy2 += 18;
  });

  // footer
  ctx.fillStyle = "#7b828c";
  ctx.font = font(400, 20);
  ctx.fillText(t("footer"), pad, H - pad / 2 - 14);
  return canvas;
};

QW.fileName = function (state) {
  return "quality-wheel_" + state.drawn[0] + "_" + state.drawn[1] + ".png";
};
