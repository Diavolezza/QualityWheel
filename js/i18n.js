// Texts of the user interface in English and German.
"use strict";
window.QW = window.QW || {};

QW.strings = {
  en: {
    pageTitle: "Quality Wheel – ISO/IEC 25010",
    title: "Quality Wheel",
    subtitle: "Draw two qualities from ISO/IEC 25010:2023 and assess how they relate to each other.",
    spin1: "Draw quality 1",
    spin2: "Draw quality 2",
    spinDone: "Both qualities drawn",
    spinning: "The wheel is turning …",
    newRound: "New round",
    soundOn: "Sound on",
    soundOff: "Sound off",
    statusStart: "Spin the wheel to draw the first quality.",
    statusOne: "Quality 1 is drawn. It is greyed out on the wheel and cannot come again.",
    statusTwo: "Both qualities are drawn. Now assess how they relate.",
    wheelLabel: "Wheel with the 40 subcharacteristics of ISO/IEC 25010:2023",
    legend: "Characteristics",
    slot: "Quality {n}",
    slotEmpty: "Not drawn yet – spin the wheel.",
    example: "Example",
    aboutCategory: "About the characteristic",
    assessment: "Your assessment",
    assessHint: "How do the two qualities relate to each other?",
    assessLocked: "Draw two qualities first.",
    rel_support: "Support each other",
    rel_neutral: "Neutral",
    rel_conflict: "Conflict",
    rel_both: "Both",
    rel_none: "Not assessed yet",
    field_support: "Why do they support each other? Reason or example",
    field_support_both: "Where do they support each other? Example",
    field_conflict: "Why do they conflict? Reason or example",
    field_conflict_both: "Where do they conflict? Example",
    field_neutral: "Why is there hardly a link between them?",
    placeholder: "One or two sentences are enough.",
    nameLabel: "Name or group (optional)",
    exportPng: "Save as image",
    copyPng: "Copy image",
    copied: "Image copied.",
    copyFailed: "Copying is not possible in this browser – please use “Save as image”.",
    showSuggestion: "Compare with a suggestion",
    hideSuggestion: "Hide suggestion",
    suggestionTitle: "Suggestion",
    suggestionNone: "There is no suggestion for this pair yet. So far, all pairs with a subcharacteristic of 3.2 Performance efficiency, 3.6 Security or 3.7 Maintainability are covered.",
    suggestionNote: "A suggestion, not the one right answer – the assessment depends on the context of the system.",
    label_support: "Support",
    label_conflict: "Conflict",
    label_neutral: "Reason",
    exportAssessment: "Assessment",
    footer: "Names and clause numbers from ISO/IEC 25010:2023. Descriptions and examples in our own words and extended for teaching.",
    source: "Source code on GitHub"
  },
  de: {
    pageTitle: "Qualitäts-Glücksrad – ISO/IEC 25010",
    title: "Qualitäts-Glücksrad",
    subtitle: "Zieh zwei Qualitäten aus ISO/IEC 25010:2023 und bewerte, wie sie zueinander stehen.",
    spin1: "1. Qualität ziehen",
    spin2: "2. Qualität ziehen",
    spinDone: "Beide Qualitäten gezogen",
    spinning: "Das Rad dreht sich …",
    newRound: "Neue Runde",
    soundOn: "Ton an",
    soundOff: "Ton aus",
    statusStart: "Dreh das Rad, um die erste Qualität zu ziehen.",
    statusOne: "Die 1. Qualität ist gezogen. Sie ist auf dem Rad ausgegraut und kommt nicht noch einmal.",
    statusTwo: "Beide Qualitäten sind gezogen. Bewerte jetzt, wie sie zueinander stehen.",
    wheelLabel: "Glücksrad mit den 40 Unterqualitäten aus ISO/IEC 25010:2023",
    legend: "Oberkategorien",
    slot: "{n}. Qualität",
    slotEmpty: "Noch nicht gezogen – dreh das Rad.",
    example: "Beispiel",
    aboutCategory: "Zur Oberkategorie",
    assessment: "Deine Einschätzung",
    assessHint: "Wie verhalten sich die beiden Qualitäten zueinander?",
    assessLocked: "Zieh zuerst zwei Qualitäten.",
    rel_support: "Unterstützen sich",
    rel_neutral: "Neutral",
    rel_conflict: "Widersprechen sich",
    rel_both: "Beides",
    rel_none: "Noch nicht bewertet",
    field_support: "Warum unterstützen sie sich? Begründung oder Beispiel",
    field_support_both: "Wo unterstützen sie sich? Beispiel",
    field_conflict: "Warum widersprechen sie sich? Begründung oder Beispiel",
    field_conflict_both: "Wo widersprechen sie sich? Beispiel",
    field_neutral: "Warum haben sie kaum etwas miteinander zu tun?",
    placeholder: "Ein, zwei Sätze genügen.",
    nameLabel: "Name oder Gruppe (optional)",
    exportPng: "Als Bild speichern",
    copyPng: "Bild kopieren",
    copied: "Bild kopiert.",
    copyFailed: "Kopieren geht in diesem Browser nicht – bitte „Als Bild speichern“ verwenden.",
    showSuggestion: "Mit Vorschlag vergleichen",
    hideSuggestion: "Vorschlag ausblenden",
    suggestionTitle: "Vorschlag",
    suggestionNone: "Für dieses Paar gibt es noch keinen Vorschlag. Bisher sind alle Paare mit einer Unterqualität von 3.2 Performance-Effizienz, 3.6 Security oder 3.7 Wartbarkeit bewertet.",
    suggestionNote: "Ein Vorschlag, keine Musterlösung – die Bewertung hängt vom Kontext des Systems ab.",
    label_support: "Unterstützung",
    label_conflict: "Widerspruch",
    label_neutral: "Begründung",
    exportAssessment: "Einschätzung",
    footer: "Namen und Nummern aus ISO/IEC 25010:2023. Beschreibungen und Beispiele in eigenen Worten und für die Lehre ergänzt.",
    source: "Quellcode auf GitHub"
  }
};

// Symbol and colour of each kind of relation (shared by the page and the exported image).
QW.relations = {
  support:  { symbol: "+", color: "#2E7D32" },
  neutral:  { symbol: "○", color: "#616161" },
  conflict: { symbol: "−", color: "#C62828" },
  both:     { symbol: "±", color: "#B26A00" }
};
QW.relationOrder = ["support", "neutral", "conflict", "both"];
// Which text fields belong to which relation.
QW.relationFields = {
  support: ["support"],
  neutral: ["neutral"],
  conflict: ["conflict"],
  both: ["support", "conflict"]
};

QW.t = function (lang, key, vars) {
  var s = (QW.strings[lang] && QW.strings[lang][key]) || QW.strings.en[key] || key;
  if (vars) Object.keys(vars).forEach(function (k) { s = s.replace("{" + k + "}", vars[k]); });
  return s;
};
