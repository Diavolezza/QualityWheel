// Checks the catalogue and the suggestions: node tools/check-data.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const sandbox = {};
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const f of ["js/data.js", "js/suggestions.js", "js/i18n.js"]) {
  vm.runInContext(readFileSync(new URL(f, root), "utf8"), sandbox, { filename: f });
}
const QW = sandbox.window.QW;
const errors = [];
const langs = ["en", "de"];
const fail = (msg) => errors.push(msg);

if (QW.categories.length !== 9) fail(`expected 9 characteristics, found ${QW.categories.length}`);
if (QW.qualities.length !== 40) fail(`expected 40 subcharacteristics, found ${QW.qualities.length}`);

const ids = new Set();
for (const q of QW.qualities) {
  if (ids.has(q.id)) fail(`duplicate id ${q.id}`);
  ids.add(q.id);
  if (!QW.categoryById[q.cat]) fail(`${q.id}: unknown characteristic ${q.cat}`);
  for (const field of ["name", "desc", "example"]) {
    for (const l of langs) if (!q[field] || !q[field][l]) fail(`${q.id}: missing ${field}.${l}`);
  }
}
for (const c of QW.categories) {
  for (const l of langs) if (!c.name[l] || !c.desc[l]) fail(`${c.id}: missing text in ${l}`);
}

const fields = { support: ["support"], neutral: ["neutral"], conflict: ["conflict"], both: ["support", "conflict"] };
let count = 0;
for (const [key, s] of Object.entries(QW.suggestions)) {
  count++;
  const [a, b] = key.split("|");
  if (!ids.has(a) || !ids.has(b)) fail(`suggestion ${key}: unknown id`);
  if (a === b) fail(`suggestion ${key}: same id twice`);
  if (QW.pairKey(a, b) !== key) fail(`suggestion ${key}: ids not in numeric order`);
  if (!fields[s.rel]) { fail(`suggestion ${key}: unknown relation ${s.rel}`); continue; }
  for (const f of fields[s.rel]) for (const l of langs) if (!s[f] || !s[f][l]) fail(`suggestion ${key}: missing ${f}.${l}`);
  for (const f of ["support", "conflict", "neutral"]) {
    if (s[f] && !fields[s.rel].includes(f)) fail(`suggestion ${key}: text ${f} does not fit relation ${s.rel}`);
  }
}

for (const l of langs) {
  for (const k of Object.keys(QW.strings.en)) if (!QW.strings[l][k]) fail(`ui text ${k} missing in ${l}`);
}

const all = readFileSync(new URL("js/data.js", root), "utf8") + readFileSync(new URL("js/suggestions.js", root), "utf8");
if (/CO2/.test(all)) fail("write CO₂ with a subscript 2");

const pairs = (40 * 39) / 2;
console.log(`${QW.qualities.length} subcharacteristics, ${count} of ${pairs} pairs with a suggestion`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("ok");
