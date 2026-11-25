// Page logic: language, drawing two qualities, assessment, suggestion, export.
"use strict";
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var params = new URLSearchParams(window.location.search);

  var state = {
    lang: initialLang(),
    drawn: [],
    relation: null,
    texts: { support: "", conflict: "", neutral: "", decision: "" },
    rejected: [],          // second qualities drawn again in this round
    preferTradeoffs: initialPrefer(),
    name: "",
    suggestionOpen: false
  };
  // Teacher mode (?teacher): the suggestion is available at once.
  // Otherwise it appears only after an own assessment with a reason of some length.
  var teacher = params.has("teacher");
  var MIN_OWN_TEXT = 40;
  var wheel;

  function initialLang() {
    var p = params.get("lang");
    if (p === "de" || p === "en") return p;
    try {
      var s = window.localStorage.getItem("qw.lang");
      if (s === "de" || s === "en") return s;
    } catch (e) { /* storage not available */ }
    return (navigator.language || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en";
  }

  function initialPrefer() {
    try { return window.localStorage.getItem("qw.prefer") !== "off"; } catch (e) { return true; }
  }

  function t(key, vars) { return QW.t(state.lang, key, vars); }

  function wheelItems() {
    var shade = false, lastCat = null;
    return QW.qualities.map(function (q) {
      var cat = QW.categoryById[q.cat];
      shade = q.cat === lastCat ? !shade : false;
      lastCat = q.cat;
      return { id: q.id, cat: q.cat, label: q.name[state.lang], color: cat.color, text: cat.text, shade: shade };
    });
  }

  // ---------- language ----------
  function setLang(lang) {
    state.lang = lang;
    try { window.localStorage.setItem("qw.lang", lang); } catch (e) { /* ignore */ }
    document.documentElement.lang = lang;
    document.title = t("pageTitle");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    $("wheel").setAttribute("aria-label", t("wheelLabel"));
    renderSoundButton();
    ["support", "conflict", "neutral"].forEach(function (f) {
      $("text-" + f).placeholder = t("placeholder");
    });
    $("text-decision").placeholder = t("placeholder_decision");
    if (wheel) wheel.setLabels(wheelItems());
    renderLegend();
    renderAll();
  }

  // ---------- rendering ----------
  function renderSoundButton() {
    var on = QW.sound.isEnabled(), b = $("sound");
    b.setAttribute("aria-pressed", String(on));
    b.textContent = (on ? "\uD83D\uDD0A " : "\uD83D\uDD07 ") + t(on ? "soundOn" : "soundOff");
  }

  function renderLegend() {
    var box = $("legend");
    box.innerHTML = "";
    QW.categories.forEach(function (c) {
      var li = document.createElement("li");
      var dot = document.createElement("span");
      dot.className = "dot";
      dot.style.background = c.color;
      li.appendChild(dot);
      li.appendChild(document.createTextNode(c.id + " " + c.name[state.lang]));
      box.appendChild(li);
    });
  }

  function renderCard(i) {
    var el = $("card-" + i), id = state.drawn[i];
    el.innerHTML = "";
    var head = document.createElement("div");
    head.className = "card-head";
    if (!id) {
      el.className = "card empty";
      head.textContent = t("slot", { n: i + 1 });
      el.appendChild(head);
      var p = document.createElement("p");
      p.className = "empty-text";
      p.textContent = t("slotEmpty");
      el.appendChild(p);
      return;
    }
    var q = QW.qualityById[id], cat = QW.categoryById[q.cat];
    el.className = "card";
    head.style.background = cat.color;
    head.style.color = cat.text;
    head.textContent = t("slot", { n: i + 1 }) + " · " + cat.id + " " + cat.name[state.lang];
    el.appendChild(head);

    var body = document.createElement("div");
    body.className = "card-body";
    var h = document.createElement("h3");
    var num = document.createElement("span");
    num.className = "num";
    num.textContent = q.id;
    h.appendChild(num);
    h.appendChild(document.createTextNode(" " + q.name[state.lang]));
    body.appendChild(h);
    if (state.lang === "de" && q.name.de !== q.name.en) {
      var en = document.createElement("p");
      en.className = "alt-name";
      en.textContent = q.name.en;
      body.appendChild(en);
    }
    var d = document.createElement("p");
    d.textContent = q.desc[state.lang];
    body.appendChild(d);
    var sc = document.createElement("div");
    sc.className = "scenario";
    var sh = document.createElement("h4");
    sh.textContent = t("scenario");
    sc.appendChild(sh);
    var dl = document.createElement("dl");
    ["context", "stimulus", "response", "measure"].forEach(function (k) {
      var dt = document.createElement("dt");
      dt.textContent = t("sc_" + k);
      var dd = document.createElement("dd");
      dd.textContent = q.scenario[k][state.lang];
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    sc.appendChild(dl);
    body.appendChild(sc);
    var det = document.createElement("details");
    var sum = document.createElement("summary");
    sum.textContent = t("aboutCategory") + " " + cat.name[state.lang];
    det.appendChild(sum);
    var cd = document.createElement("p");
    cd.textContent = cat.desc[state.lang];
    det.appendChild(cd);
    body.appendChild(det);
    el.appendChild(body);
  }

  function renderWheelControls() {
    var n = state.drawn.length, spin = $("spin");
    spin.disabled = n >= 2 || wheel.spinning;
    spin.textContent = wheel.spinning ? t("spinning") : n === 0 ? t("spin1") : n === 1 ? t("spin2") : t("spinDone");
    $("reset").disabled = wheel.spinning || n === 0;
    $("redraw").hidden = n < 2;
    $("redraw").disabled = wheel.spinning;
    $("prefer").checked = state.preferTradeoffs;
    $("wheel-status").textContent = n === 0 ? t("statusStart") : n === 1 ? t("statusOne") : t("statusTwo");
  }

  function renderAssessment() {
    var ready = state.drawn.length === 2;
    $("assess").classList.toggle("locked", !ready);
    $("assess-hint").textContent = ready ? t("assessHint") : t("assessLocked");
    document.querySelectorAll("#rel-group button").forEach(function (b) {
      var r = b.getAttribute("data-rel");
      b.querySelector(".rel-label").textContent = t("rel_" + r);
      b.setAttribute("aria-checked", String(state.relation === r));
      b.disabled = !ready;
    });
    var active = state.relation ? QW.relationFields[state.relation] : [];
    ["support", "conflict", "neutral"].forEach(function (f) {
      var wrap = $("field-" + f);
      wrap.hidden = active.indexOf(f) < 0;
      var key = "field_" + f + (state.relation === "both" ? "_both" : "");
      wrap.querySelector(".field-label").textContent = t(key);
      var ta = $("text-" + f);
      if (ta.value !== state.texts[f]) ta.value = state.texts[f];
      ta.disabled = !ready;
    });
    var dec = $("field-decision");
    dec.hidden = !state.relation;
    if (state.relation) dec.querySelector(".field-label").textContent = t("decision_" + state.relation);
    if ($("text-decision").value !== state.texts.decision) $("text-decision").value = state.texts.decision;
    $("text-decision").disabled = !ready;
    $("name").disabled = !ready;
    $("export").disabled = !ready;
    $("copy").disabled = !ready;
    $("copy").hidden = !(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write);
    renderSuggestion();
  }

  // An own assessment exists: a relation is chosen and its text fields hold enough text.
  function ownAssessmentDone() {
    if (!state.relation) return false;
    var len = QW.relationFields[state.relation].reduce(function (n, f) { return n + state.texts[f].trim().length; }, 0);
    return len >= MIN_OWN_TEXT;
  }

  function renderSuggestion() {
    var box = $("suggestion"), btn = $("suggest");
    var ready = state.drawn.length === 2 && (teacher || ownAssessmentDone());
    btn.hidden = !ready;
    btn.textContent = state.suggestionOpen ? t("hideSuggestion") : t("showSuggestion");
    btn.setAttribute("aria-expanded", String(state.suggestionOpen && ready));
    box.hidden = !(state.suggestionOpen && ready);
    if (box.hidden) return;
    box.innerHTML = "";
    var s = QW.suggestions[QW.pairKey(state.drawn[0], state.drawn[1])];
    var h = document.createElement("h4");
    h.textContent = t("suggestionTitle");
    box.appendChild(h);
    var pair = document.createElement("p");
    pair.className = "sugg-pair";
    pair.textContent = state.drawn.map(function (id) {
      return id + " " + QW.qualityById[id].name[state.lang];
    }).join("  ×  ");
    box.appendChild(pair);
    if (!s) {
      var p = document.createElement("p");
      p.textContent = t("suggestionNone");
      box.appendChild(p);
      return;
    }
    var r = QW.relations[s.rel];
    var rel = document.createElement("p");
    rel.className = "sugg-rel";
    rel.style.color = r.color;
    rel.textContent = r.symbol + "  " + t("rel_" + s.rel);
    box.appendChild(rel);
    QW.relationFields[s.rel].forEach(function (f) {
      var p = document.createElement("p");
      var b = document.createElement("strong");
      b.textContent = t(s.rel === "both" ? "label_" + f : "label_neutral") + ": ";
      p.appendChild(b);
      p.appendChild(document.createTextNode(s[f][state.lang]));
      box.appendChild(p);
    });
    if (s.decision) {
      var dp = document.createElement("p");
      dp.className = "sugg-decision";
      var db = document.createElement("strong");
      db.textContent = t("label_decision") + ": ";
      dp.appendChild(db);
      dp.appendChild(document.createTextNode(s.decision[state.lang]));
      box.appendChild(dp);
    }
    var note = document.createElement("p");
    note.className = "note";
    note.textContent = t("suggestionNote");
    box.appendChild(note);
  }

  function renderAll() {
    renderCard(0);
    renderCard(1);
    renderWheelControls();
    renderAssessment();
  }

  // ---------- actions ----------
  // Weight of a candidate for the second draw: with "prefer trade-offs", pairs whose suggestion is a
  // conflict (or both) come four times as often as neutral pairs, supporting pairs twice as often.
  var WEIGHTS = { conflict: 4, both: 4, support: 2, neutral: 1 };
  function weightOf(first, id) {
    if (!state.preferTradeoffs || !first) return 1;
    var s = QW.suggestions[QW.pairKey(first, id)];
    return s ? WEIGHTS[s.rel] : 1;
  }

  function pickRandom(pool, first) {
    var weights = pool.map(function (id) { return weightOf(first, id); });
    var total = weights.reduce(function (a, b) { return a + b; }, 0);
    var r = QW.random() * total;
    for (var i = 0; i < pool.length; i++) {
      r -= weights[i];
      if (r < 0) return pool[i];
    }
    return pool[pool.length - 1];
  }

  function spin() {
    if (wheel.spinning || state.drawn.length >= 2) return;
    QW.sound.unlock();
    var first = state.drawn[0];
    var pool = QW.qualities.map(function (q) { return q.id; }).filter(function (id) {
      return state.drawn.indexOf(id) < 0 && state.rejected.indexOf(id) < 0;
    });
    if (!pool.length) {           // everything rejected: allow all again
      state.rejected = [];
      pool = QW.qualities.map(function (q) { return q.id; }).filter(function (id) { return id !== first; });
    }
    var id = pickRandom(pool, first);
    wheel.spinTo(id, function (won) {
      state.drawn.push(won);
      wheel.drawn = state.drawn.slice();
      wheel.draw();
      renderAll();
      $("card-" + (state.drawn.length - 1)).classList.add("arrived");
    });
    renderWheelControls();
  }

  // Draws the second quality again (for example after a neutral pair); the first one stays.
  function redrawSecond() {
    if (wheel.spinning || state.drawn.length !== 2) return;
    state.rejected.push(state.drawn.pop());
    state.relation = null;
    state.texts = { support: "", conflict: "", neutral: "", decision: "" };
    state.suggestionOpen = false;
    wheel.drawn = state.drawn.slice();
    wheel.highlight = null;
    renderAll();
    spin();
  }

  function reset() {
    if (wheel.spinning) return;
    state.drawn = [];
    state.relation = null;
    state.texts = { support: "", conflict: "", neutral: "", decision: "" };
    state.rejected = [];
    state.suggestionOpen = false;
    wheel.drawn = [];
    wheel.highlight = null;
    wheel.draw();
    renderAll();
  }

  function exportPng() {
    var canvas = QW.renderResult(state);
    canvas.toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = QW.fileName(state);
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    }, "image/png");
  }

  function copyPng() {
    var canvas = QW.renderResult(state);
    var blobPromise = new Promise(function (resolve) { canvas.toBlob(resolve, "image/png"); });
    navigator.clipboard.write([new window.ClipboardItem({ "image/png": blobPromise })])
      .then(function () { flash(t("copied")); })
      .catch(function () { flash(t("copyFailed")); });
  }

  function flash(msg) {
    var el = $("flash");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(flash.timer);
    flash.timer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  // ---------- wiring ----------
  function init() {
    wheel = new QW.Wheel($("wheel"), wheelItems());
    $("spin").addEventListener("click", spin);
    $("wheel").addEventListener("click", spin);
    $("reset").addEventListener("click", reset);
    $("redraw").addEventListener("click", redrawSecond);
    $("prefer").addEventListener("change", function (e) {
      state.preferTradeoffs = e.target.checked;
      try { window.localStorage.setItem("qw.prefer", e.target.checked ? "on" : "off"); } catch (err) { /* ignore */ }
    });
    $("sound").addEventListener("click", function () {
      QW.sound.setEnabled(!QW.sound.isEnabled());
      renderSoundButton();
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
    document.querySelectorAll("#rel-group button").forEach(function (b) {
      b.addEventListener("click", function () {
        state.relation = b.getAttribute("data-rel");
        renderAssessment();
        var first = QW.relationFields[state.relation][0];
        $("text-" + first).focus();
      });
    });
    ["support", "conflict", "neutral", "decision"].forEach(function (f) {
      $("text-" + f).addEventListener("input", function (e) {
        state.texts[f] = e.target.value;
        renderSuggestion();
      });
    });
    $("name").addEventListener("input", function (e) { state.name = e.target.value; });
    $("export").addEventListener("click", exportPng);
    $("copy").addEventListener("click", copyPng);
    $("suggest").addEventListener("click", function () {
      state.suggestionOpen = !state.suggestionOpen;
      renderSuggestion();
    });
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { wheel.resize(); }, 120);
    });

    // ?pick=3.2.2,3.6.1 draws the two qualities directly (for teaching and tests)
    var pick = (params.get("pick") || "").split(",").filter(function (id) { return QW.qualityById[id]; });
    if (pick.length === 2 && pick[0] !== pick[1]) {
      state.drawn = pick;
      wheel.drawn = pick.slice();
      wheel.rot = -(wheel.indexOfId(pick[1]) + 0.5) * wheel.segAngle();
      wheel.highlight = pick[1];
    }
    var rel = params.get("rel");
    if (state.drawn.length === 2 && QW.relations[rel]) state.relation = rel;
    if (teacher && state.drawn.length === 2 && params.has("suggest")) state.suggestionOpen = true;
    setLang(state.lang);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
