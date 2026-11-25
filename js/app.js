// Page logic: language, drawing two qualities, assessment, suggestion, export.
"use strict";
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var params = new URLSearchParams(window.location.search);

  var state = {
    lang: initialLang(),
    drawn: [],
    relation: null,
    texts: { support: "", conflict: "", neutral: "" },
    name: "",
    suggestionOpen: false
  };
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
    var ex = document.createElement("p");
    ex.className = "example";
    var exl = document.createElement("strong");
    exl.textContent = t("example") + ": ";
    ex.appendChild(exl);
    ex.appendChild(document.createTextNode(q.example[state.lang]));
    body.appendChild(ex);
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
    $("name").disabled = !ready;
    $("export").disabled = !ready;
    $("copy").disabled = !ready;
    $("suggest").disabled = !ready;
    $("copy").hidden = !(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write);
    renderSuggestion();
  }

  function renderSuggestion() {
    var box = $("suggestion"), btn = $("suggest");
    var ready = state.drawn.length === 2;
    btn.textContent = state.suggestionOpen ? t("hideSuggestion") : t("showSuggestion");
    btn.setAttribute("aria-expanded", String(state.suggestionOpen && ready));
    box.hidden = !(state.suggestionOpen && ready);
    if (box.hidden) return;
    box.innerHTML = "";
    var s = QW.suggestions[QW.pairKey(state.drawn[0], state.drawn[1])];
    var h = document.createElement("h4");
    h.textContent = t("suggestionTitle");
    box.appendChild(h);
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
    var note = document.createElement("p");
    note.className = "note";
    note.textContent = t("suggestionNote");
    box.appendChild(note);
    var adopt = document.createElement("button");
    adopt.type = "button";
    adopt.className = "ghost small";
    adopt.textContent = t("adopt");
    adopt.addEventListener("click", function () { adoptSuggestion(s); });
    box.appendChild(adopt);
  }

  function renderAll() {
    renderCard(0);
    renderCard(1);
    renderWheelControls();
    renderAssessment();
  }

  // ---------- actions ----------
  function spin() {
    if (wheel.spinning || state.drawn.length >= 2) return;
    QW.sound.unlock();
    var pool = QW.qualities.map(function (q) { return q.id; })
      .filter(function (id) { return state.drawn.indexOf(id) < 0; });
    var id = pool[Math.floor(QW.random() * pool.length)];
    wheel.spinTo(id, function (won) {
      state.drawn.push(won);
      wheel.drawn = state.drawn.slice();
      wheel.draw();
      renderAll();
      $("card-" + (state.drawn.length - 1)).classList.add("arrived");
    });
    renderWheelControls();
  }

  function reset() {
    if (wheel.spinning) return;
    state.drawn = [];
    state.relation = null;
    state.texts = { support: "", conflict: "", neutral: "" };
    state.suggestionOpen = false;
    wheel.drawn = [];
    wheel.highlight = null;
    wheel.draw();
    renderAll();
  }

  function hasOwnText() {
    return Object.keys(state.texts).some(function (k) { return state.texts[k].trim() !== ""; });
  }

  function adoptSuggestion(s) {
    if ((state.relation || hasOwnText()) && !window.confirm(t("adoptConfirm"))) return;
    state.relation = s.rel;
    state.texts = { support: "", conflict: "", neutral: "" };
    QW.relationFields[s.rel].forEach(function (f) { state.texts[f] = s[f][state.lang]; });
    renderAssessment();
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
    ["support", "conflict", "neutral"].forEach(function (f) {
      $("text-" + f).addEventListener("input", function (e) { state.texts[f] = e.target.value; });
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
    if (state.drawn.length === 2 && params.has("suggest")) state.suggestionOpen = true;
    setLang(state.lang);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
