// js/app.js
// Hash router and screen rendering for Inner Weather.

import { APP_NAME, APP_TAGLINE } from "./config.js";
import { CORES, WHEEL, WORDS } from "./data/wheel.js";
import { ATLAS, GROUPS } from "./data/atlas.js";
import { CONTEXTS, WEATHER, ENERGY_LEVELS, BODY_CHIPS, DEEPER_PROMPTS } from "./data/contexts.js";
import { createWheel, renderMiniWheel } from "./wheel.js";
import { computeWeather, labelFor, colorFor } from "./weather.js";
import * as storage from "./storage.js";
import { shareCheckIn } from "./share.js";

const app = document.getElementById("app");
const liveRegion = document.getElementById("live-region");

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  }
  for (const child of [].concat(children)) {
    if (child == null) continue;
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}

function announce(msg) {
  if (liveRegion) liveRegion.textContent = msg;
}

// ---- in-progress check-in state ----
function freshState() {
  return {
    mode: "full", // "full" | "quick"
    context: null,
    contextLabel: null,
    energy: null,
    body: [],
    selections: [], // {key, source}
    intensities: {}, // key -> 1..3
    note: "",
    deeper: { body: "", backstory: "", behavior: "", biography: "" },
    intention: ""
  };
}
let state = freshState();
try {
  const saved = sessionStorage.getItem("iw.inprogress");
  if (saved) state = { ...freshState(), ...JSON.parse(saved) };
} catch {}

function persistState() {
  try { sessionStorage.setItem("iw.inprogress", JSON.stringify(state)); } catch {}
}

function clearState() {
  state = freshState();
  try { sessionStorage.removeItem("iw.inprogress"); } catch {}
}

// ---- theme ----
function applyTheme() {
  const settings = storage.getSettings();
  const root = document.documentElement;
  if (settings.theme === "light") root.setAttribute("data-theme", "light");
  else if (settings.theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
}

// ---- router ----
const routes = {
  "": screenHome,
  "/": screenHome,
  "/checkin": screenCheckin,
  "/history": screenHistory,
  "/explore": screenExplore,
  "/about": screenAbout
};

function parseHash() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, query] = raw.split("?");
  const params = new URLSearchParams(query || "");
  return { path: path || "/", params };
}

function navigate(path) {
  location.hash = path;
}

function render() {
  applyTheme();
  const { path, params } = parseHash();
  const fn = routes[path] || screenHome;
  app.innerHTML = "";
  app.appendChild(topbar());
  app.appendChild(fn(params));
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", render);

function topbar() {
  const bar = el("div", { class: "topbar" }, [
    el("span", { class: "app-name" }, APP_NAME),
    el("div", {}, [
      el("button", { class: "icon-btn", "aria-label": "History", onclick: () => navigate("/history") }, "\u{1F553}"),
      el("button", { class: "icon-btn", "aria-label": "Explore feelings", onclick: () => navigate("/explore") }, "\u{1F30A}"),
      el("button", { class: "icon-btn", "aria-label": "About", onclick: () => navigate("/about") }, "ℹ")
    ])
  ]);
  return bar;
}

// ---------------- HOME ----------------
function screenHome() {
  const wrap = el("div");
  wrap.appendChild(el("h1", { class: "headline" }, "What's the weather inside?"));
  wrap.appendChild(el("p", { class: "subline" }, "A short pause to name what you're feeling before what's next."));

  wrap.appendChild(el("button", {
    class: "btn btn-primary",
    onclick: () => { clearState(); state.mode = "full"; navigate("/checkin"); }
  }, "Check in"));
  wrap.appendChild(el("button", {
    class: "btn btn-secondary",
    onclick: () => { clearState(); state.mode = "quick"; navigate("/checkin"); }
  }, "Quick check-in"));

  const miniWrap = el("div", { style: "display:flex;justify-content:center;margin:16px 0;" });
  wrap.appendChild(miniWrap);
  renderMiniWheel(miniWrap);

  const entries = storage.getEntries();
  if (entries.length) {
    const last = entries[0];
    const names = (last.feelings || []).map((f) => f.label).join(", ");
    const when = new Date(last.ts).toLocaleString(undefined, { weekday: "long", hour: "numeric", minute: "2-digit" });
    wrap.appendChild(el("p", { class: "small" }, `Last time: ${names} · ${when}.`));
  }

  const settings = storage.getSettings();
  if (!settings.seenPrivacyNote) {
    const note = el("div", { class: "callout" }, [
      "Everything you enter stays on this device. Nothing is sent anywhere. ",
      el("button", { class: "btn-link", onclick: (e) => { storage.saveSettings({ seenPrivacyNote: true }); e.target.closest(".callout").remove(); } }, "Got it")
    ]);
    wrap.appendChild(note);
  }
  return wrap;
}

// ---------------- CHECKIN FLOW ----------------
const FULL_STEPS = ["context", "breathe", "energy", "wheel", "understand", "deeper", "intention", "done"];
const QUICK_STEPS = ["context", "wheel", "intention", "done"];

function stepsFor() { return state.mode === "quick" ? QUICK_STEPS : FULL_STEPS; }

function screenCheckin(params) {
  if (params.get("context")) {
    const ctx = CONTEXTS.find((c) => c.id === params.get("context"));
    if (ctx) { state.context = ctx.id; state.contextLabel = ctx.label; }
  }
  if (params.get("mode")) state.mode = params.get("mode") === "quick" ? "quick" : "full";

  if (!state.step) state.step = stepsFor()[0];
  const steps = stepsFor();
  if (!steps.includes(state.step)) state.step = steps[0];

  const wrap = el("div");
  wrap.appendChild(dots(steps, state.step));

  const stepFns = {
    context: stepContext, breathe: stepBreathe, energy: stepEnergy,
    wheel: stepWheel, understand: stepUnderstand, deeper: stepDeeper,
    intention: stepIntention, done: stepDone
  };
  wrap.appendChild(stepFns[state.step]());
  return wrap;
}

function dots(steps, current) {
  const row = el("div", { class: "dots" });
  steps.forEach((s) => row.appendChild(el("span", { class: "dot" + (s === current ? " active" : "") })));
  return row;
}

function goStep(delta) {
  const steps = stepsFor();
  const idx = steps.indexOf(state.step);
  const next = steps[idx + delta];
  if (next) { state.step = next; persistState(); render(); }
}

function navRow({ backDisabled, onSkip, skipLabel } = {}) {
  const row = el("div", {});
  if (!backDisabled) {
    row.appendChild(el("button", { class: "btn-link", onclick: () => goStep(-1) }, "Back"));
  }
  if (onSkip) {
    row.appendChild(el("button", { class: "btn-link", onclick: onSkip }, skipLabel || "Skip"));
  }
  return row;
}

function stepContext() {
  const wrap = el("div");
  wrap.appendChild(el("h2", { class: "step-title" }, "What are you about to do?"));
  const grid = el("div", { class: "chip-grid" });
  CONTEXTS.forEach((c) => {
    const selected = state.context === c.id;
    grid.appendChild(el("button", {
      class: "chip" + (selected ? " selected" : ""),
      onclick: () => { state.context = c.id; state.contextLabel = c.label; persistState(); render(); }
    }, c.label));
  });
  wrap.appendChild(grid);

  const remember = el("label", { class: "small", style: "display:flex;gap:8px;align-items:center;margin-bottom:16px;" }, [
    el("input", {
      type: "checkbox",
      checked: storage.getSettings().usualContext === state.context ? "checked" : null,
      onchange: (e) => storage.saveSettings({ usualContext: e.target.checked ? state.context : null })
    }),
    "Remember this as my usual."
  ]);
  wrap.appendChild(remember);

  wrap.appendChild(el("button", {
    class: "btn btn-primary",
    disabled: state.context ? null : "disabled",
    onclick: () => {
      storage.saveSettings({ lastContext: state.context });
      goStep(1);
    }
  }, "Continue"));
  wrap.appendChild(navRow({ backDisabled: true }));
  return wrap;
}

function stepBreathe() {
  const wrap = el("div");
  wrap.appendChild(el("h2", { class: "step-title" }, "Breathe"));
  const circle = el("div", { class: "breathe-circle" });
  const caption = el("p", { class: "small", style: "text-align:center;" }, "No need to fix anything. Just arrive.");
  wrap.appendChild(circle);
  wrap.appendChild(caption);

  const continueBtn = el("button", { class: "btn btn-primary", style: "display:none;", onclick: () => goStep(1) }, "Continue");

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cycle = 0;
  let phase = "in";
  function tick() {
    if (reduced) {
      caption.textContent = phase === "in" ? "Breathe in" : "Breathe out";
    } else {
      circle.style.transitionDuration = phase === "in" ? "4s" : "6s";
      circle.style.transform = phase === "in" ? "scale(1.4)" : "scale(1)";
    }
    const delay = phase === "in" ? 4000 : 6000;
    setTimeout(() => {
      if (!wrap.isConnected) return;
      if (phase === "in") { phase = "out"; tick(); }
      else {
        cycle++;
        if (cycle >= 3) { continueBtn.style.display = "block"; return; }
        phase = "in"; tick();
      }
    }, delay);
  }
  tick();

  wrap.appendChild(continueBtn);
  wrap.appendChild(navRow({ onSkip: () => goStep(1) }));
  return wrap;
}

function stepEnergy() {
  const wrap = el("div");
  wrap.appendChild(el("h2", { class: "step-title" }, "How's your energy?"));
  const grid = el("div", { class: "energy-grid" });
  ENERGY_LEVELS.forEach((lvl) => {
    grid.appendChild(el("button", {
      class: "chip" + (state.energy === lvl.value ? " selected" : ""),
      onclick: () => { state.energy = lvl.value; persistState(); render(); }
    }, lvl.label));
  });
  wrap.appendChild(grid);

  wrap.appendChild(el("p", {}, "Anything you notice in your body?"));
  const bodyGrid = el("div", { class: "chip-grid" });
  BODY_CHIPS.forEach((chip) => {
    const selected = state.body.includes(chip);
    bodyGrid.appendChild(el("button", {
      class: "chip" + (selected ? " selected" : ""),
      onclick: () => {
        state.body = selected ? state.body.filter((b) => b !== chip) : state.body.concat(chip);
        persistState(); render();
      }
    }, chip));
  });
  wrap.appendChild(bodyGrid);
  wrap.appendChild(el("p", { class: "small" }, "Noticing is enough. You don't have to know why."));

  wrap.appendChild(el("button", {
    class: "btn btn-primary",
    disabled: state.energy ? null : "disabled",
    onclick: () => goStep(1)
  }, "Continue"));
  wrap.appendChild(navRow({ onSkip: () => goStep(1) }));
  return wrap;
}

function allSearchable() {
  const items = [];
  for (const key of Object.keys(WORDS)) {
    items.push({ key, source: "wheel", label: WORDS[key].label });
  }
  for (const key of Object.keys(ATLAS)) {
    if (ATLAS[key].feel) items.push({ key, source: "atlas", label: ATLAS[key].name, feel: ATLAS[key].feel });
  }
  return items;
}

function stepWheel() {
  const wrap = el("div");
  wrap.appendChild(el("h2", { class: "step-title" }, "What's here right now?"));
  wrap.appendChild(el("p", { class: "helper" }, "Tap a color, then find the closest word. Pick up to three. More than one can be true."));

  const searchWrap = el("div", { style: "margin-bottom:12px;" });
  const searchInput = el("input", { class: "field", type: "text", placeholder: "Search for a feeling." });
  const resultsWrap = el("div", { class: "chip-grid" });
  searchWrap.appendChild(searchInput);
  searchWrap.appendChild(resultsWrap);
  wrap.appendChild(searchWrap);

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    resultsWrap.innerHTML = "";
    if (!q) return;
    const items = allSearchable().filter((it) =>
      it.label.toLowerCase().includes(q) || (it.feel && it.feel.toLowerCase().includes(q))
    ).slice(0, 12);
    items.forEach((it) => {
      const color = colorFor(it);
      const chip = el("button", { class: "chip", style: `background:${color};border-color:${color};color:#1D2733;` }, it.label);
      chip.addEventListener("click", () => { toggleSelection(it.key, it.source); render(); });
      resultsWrap.appendChild(chip);
    });
  });

  let listView = false;
  const toggleBtn = el("button", { class: "btn-link" }, "List view");
  wrap.appendChild(toggleBtn);

  const bodyWrap = el("div");
  wrap.appendChild(bodyWrap);

  function selectionSet() {
    return new Set(state.selections.filter((s) => s.source === "wheel").map((s) => s.key));
  }

  function toggleSelection(key, source) {
    const idx = state.selections.findIndex((s) => s.key === key && s.source === source);
    if (idx >= 0) {
      state.selections.splice(idx, 1);
      announce(`${labelFor({ key, source })} removed.`);
    } else {
      if (state.selections.length >= 3) {
        const tray = document.querySelector(".tray");
        if (tray) {
          tray.classList.add("shake");
          setTimeout(() => tray.classList.remove("shake"), 300);
        }
        announce("Three is plenty. Remove one to swap.");
        return;
      }
      state.selections.push({ key, source });
      announce(`${labelFor({ key, source })} selected. ${state.selections.length} of 3.`);
    }
    persistState();
  }

  function renderWheelArea() {
    bodyWrap.innerHTML = "";
    if (listView) {
      bodyWrap.appendChild(renderListView(toggleSelection, selectionSet()));
    } else {
      const { el: wheelEl } = createWheel({
        selection: selectionSet(),
        onToggle: (key) => { toggleSelection(key, "wheel"); renderWheelArea(); renderTray(); updateContinue(); },
        announce
      });
      bodyWrap.appendChild(wheelEl);
    }
  }
  toggleBtn.addEventListener("click", () => {
    listView = !listView;
    toggleBtn.textContent = listView ? "Wheel view" : "List view";
    renderWheelArea();
  });

  renderWheelArea();

  const trayWrap = el("div", { class: "tray" });
  wrap.appendChild(trayWrap);
  function renderTray() {
    trayWrap.innerHTML = "";
    state.selections.forEach((sel) => {
      const color = colorFor(sel);
      const pill = el("span", { class: "pill", style: `background:${color};` }, [
        labelFor(sel),
        el("button", { onclick: () => { toggleSelection(sel.key, sel.source); renderWheelArea(); renderTray(); updateContinue(); } }, "×")
      ]);
      trayWrap.appendChild(pill);
    });
  }
  renderTray();

  const nudge = el("p", { class: "small" });
  wrap.appendChild(nudge);
  function updateNudge() {
    const onlyCore = state.selections.length > 0 && state.selections.every((s) => s.source === "wheel" && CORES.some((c) => c.id === s.key));
    nudge.textContent = onlyCore ? "Want to get more specific? Tap the color again to see more words." : "";
  }
  updateNudge();

  const continueBtn = el("button", { class: "btn btn-primary" }, "Continue");
  wrap.appendChild(continueBtn);
  function updateContinue() {
    continueBtn.disabled = state.selections.length === 0;
    updateNudge();
  }
  updateContinue();
  continueBtn.addEventListener("click", () => goStep(1));

  wrap.appendChild(navRow());
  return wrap;
}

function renderListView(toggleSelection, selectionSet) {
  const wrap = el("div");
  CORES.forEach((core) => {
    const details = el("details", { style: "margin-bottom:8px;" });
    const summary = el("summary", { style: `cursor:pointer;padding:8px;border-radius:8px;background:${core.core};color:#1D2733;font-weight:700;` }, core.label);
    details.appendChild(summary);
    WHEEL[core.id].forEach((mid) => {
      const midBlock = el("div", { style: "padding:8px 0 8px 12px;" });
      const midSelected = selectionSet.has(mid.key);
      midBlock.appendChild(el("button", {
        class: "chip" + (midSelected ? " selected" : ""),
        style: `background:${core.mid};border-color:${core.mid};margin-bottom:6px;`,
        onclick: () => { toggleSelection(mid.key, "wheel"); render(); }
      }, WORDS[mid.key]?.label || mid.key));
      const outerRow = el("div", { class: "chip-grid" });
      mid.outer.forEach((outerKey) => {
        const sel = selectionSet.has(outerKey);
        outerRow.appendChild(el("button", {
          class: "chip" + (sel ? " selected" : ""),
          style: `background:${core.mid};border-color:${core.mid};`,
          onclick: () => { toggleSelection(outerKey, "wheel"); render(); }
        }, WORDS[outerKey]?.label || outerKey));
      });
      midBlock.appendChild(outerRow);
      details.appendChild(midBlock);
    });
    wrap.appendChild(details);
  });
  return wrap;
}

function stepUnderstand() {
  const wrap = el("div");
  wrap.appendChild(el("h2", { class: "step-title" }, "Understand"));
  const track = el("div", { style: "display:flex;overflow-x:auto;gap:16px;scroll-snap-type:x mandatory;padding-bottom:8px;" });

  state.selections.forEach((sel) => {
    const card = el("div", { class: "card", style: "min-width:280px;scroll-snap-align:start;" });
    const color = colorFor(sel);
    card.appendChild(el("div", { style: `background:${color};color:#1D2733;padding:12px 16px;border-radius:12px;font-weight:800;font-size:20px;margin:-20px -20px 16px;` }, labelFor(sel)));

    if (sel.source === "wheel") {
      const w = WORDS[sel.key];
      if (w?.means) card.appendChild(el("p", {}, w.means));
      if (w?.tip) card.appendChild(el("div", { class: "callout" }, w.tip));

      card.appendChild(el("p", { class: "small" }, "How strong?"));
      const strengthRow = el("div", { class: "chip-grid" });
      [[1, "A little"], [2, "Quite a bit"], [3, "Very"]].forEach(([val, label]) => {
        strengthRow.appendChild(el("button", {
          class: "chip" + (state.intensities[sel.key] === val ? " selected" : ""),
          onclick: () => { state.intensities[sel.key] = val; persistState(); render(); }
        }, label));
      });
      card.appendChild(strengthRow);

      const atlasKeys = w?.atlas || [];
      renderAtlasSection(card, atlasKeys, sel.key);
      if (w?.care) card.appendChild(careCallout(w.care));
    } else {
      const a = ATLAS[sel.key];
      if (a) {
        card.appendChild(el("h3", {}, `Going deeper: ${a.name}`));
        card.appendChild(el("p", {}, a.meaning));
        if (a.compare) card.appendChild(el("p", {}, [el("strong", {}, "Easy to mix up: "), a.compare]));
        card.appendChild(el("p", { class: "accent" }, a.ask));
        if (a.try) card.appendChild(el("p", {}, [el("strong", {}, "Something to try: "), a.try]));
        if (a.care) card.appendChild(careCallout(a.care));
      }
    }
    track.appendChild(card);
  });
  wrap.appendChild(track);

  wrap.appendChild(el("label", { class: "small" }, "Anything you want to add? (optional)"));
  const noteField = el("textarea", { class: "field", maxlength: "280", rows: "1" });
  noteField.value = state.note || "";
  noteField.addEventListener("input", () => { state.note = noteField.value; persistState(); });
  wrap.appendChild(noteField);

  wrap.appendChild(el("button", { class: "btn btn-primary", onclick: () => goStep(1) }, "Continue"));
  wrap.appendChild(navRow());
  return wrap;
}

function careCallout(level) {
  if (level === "strong") {
    return el("div", { class: "callout strong" }, [
      "You don't have to carry this alone. If you're in the US, you can call or text ",
      el("a", { href: "tel:988" }, "988"),
      " anytime to talk with someone (",
      el("a", { href: "sms:988" }, "text"),
      "). Elsewhere, ",
      el("a", { href: "https://findahelpline.com", target: "_blank", rel: "noopener" }, "findahelpline.com"),
      " lists free, confidential support near you. If you're in danger right now, contact local emergency services."
    ]);
  }
  return el("div", { class: "callout" }, "If this has been sitting with you for a while, talking to someone you trust, or to a counselor or doctor, can really help.");
}

function renderAtlasSection(card, atlasKeys, wordKey) {
  const sectionWrap = el("div");
  card.appendChild(sectionWrap);
  let activeKey = atlasKeys[0];

  function renderActive() {
    sectionWrap.innerHTML = "";
    const a = ATLAS[activeKey];
    if (!a) return;
    sectionWrap.appendChild(el("h3", {}, `Going deeper: ${a.name}`));
    sectionWrap.appendChild(el("p", {}, a.meaning));
    if (a.compare) sectionWrap.appendChild(el("p", {}, [el("strong", {}, "Easy to mix up: "), a.compare]));
    sectionWrap.appendChild(el("p", { class: "accent" }, a.ask));
    if (a.try) sectionWrap.appendChild(el("p", {}, [el("strong", {}, "Something to try: "), a.try]));
    if (atlasKeys.length > 1) {
      const related = el("div", { class: "chip-grid" });
      atlasKeys.filter((k) => k !== activeKey).forEach((k) => {
        related.appendChild(el("button", {
          class: "chip",
          onclick: () => { activeKey = k; renderActive(); }
        }, `Related: ${ATLAS[k]?.name || k}`));
      });
      sectionWrap.appendChild(related);
    }
    if (a.care) sectionWrap.appendChild(careCallout(a.care));
  }
  if (activeKey) renderActive();
}

function stepDeeper() {
  const wrap = el("div");
  const ctx = CONTEXTS.find((c) => c.id === state.context);
  const details = el("details", { open: ctx?.deeperOpen ? "open" : null });
  details.appendChild(el("summary", { style: "cursor:pointer;font-weight:700;padding:8px 0;" }, "Go deeper (optional)"));
  DEEPER_PROMPTS.forEach((p) => {
    const field = el("div", { style: "margin:12px 0;" });
    field.appendChild(el("label", { class: "small" }, p.prompt));
    const input = el("textarea", { class: "field", maxlength: "280", rows: "1" });
    input.value = state.deeper[p.id] || "";
    input.addEventListener("input", () => { state.deeper[p.id] = input.value; persistState(); });
    field.appendChild(input);
    details.appendChild(field);
  });
  wrap.appendChild(details);
  wrap.appendChild(el("button", { class: "btn btn-primary", onclick: () => goStep(1) }, "Continue"));
  wrap.appendChild(navRow({ onSkip: () => goStep(1) }));
  return wrap;
}

function stepIntention() {
  const wrap = el("div");
  const weather = computeWeather(state.selections, state.energy);
  state.weather = weather;
  const w = WEATHER[weather];

  const gradientColors = state.selections.map(colorFor);
  const pillBg = gradientColors.length > 1
    ? `linear-gradient(90deg, ${gradientColors.join(",")})`
    : (gradientColors[0] || "#8F8F8F");

  wrap.appendChild(el("div", { class: "pill", style: `background:${pillBg};margin-bottom:16px;` }, `Your inner weather: ${w.label}.`));

  const ctx = CONTEXTS.find((c) => c.id === state.context) || CONTEXTS[CONTEXTS.length - 1];
  wrap.appendChild(el("p", {}, [el("strong", {}, "One idea: "), ctx.approach[weather]]));

  wrap.appendChild(el("label", { class: "step-title", style: "display:block;font-size:18px;" }, ctx.intention));
  const field = el("textarea", { class: "field", maxlength: "200", rows: "2", placeholder: ctx.placeholder });
  field.value = state.intention || "";
  field.addEventListener("input", () => { state.intention = field.value; persistState(); });
  wrap.appendChild(field);

  wrap.appendChild(el("button", { class: "btn btn-primary", onclick: () => goStep(1) }, "Done"));
  wrap.appendChild(navRow());
  return wrap;
}

function stepDone() {
  const wrap = el("div");
  const card = el("div", { class: "card" });
  const ctx = CONTEXTS.find((c) => c.id === state.context);
  const when = new Date().toLocaleDateString(undefined, { weekday: "long" });
  const partOfDay = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening";
  card.appendChild(el("p", { class: "small" }, `${when} ${partOfDay}, ${ctx?.before || "just checking in"}.`));

  const pillsRow = el("div", { class: "chip-grid" });
  state.selections.forEach((sel) => {
    const color = colorFor(sel);
    const intensity = state.intensities[sel.key];
    pillsRow.appendChild(el("span", { class: "pill", style: `background:${color};` }, labelFor(sel) + (intensity ? " " + "●".repeat(intensity) : "")));
  });
  card.appendChild(pillsRow);
  if (state.intention) card.appendChild(el("p", {}, `I'll: ${state.intention}`));
  wrap.appendChild(card);

  if (!storage.storageAvailable()) {
    wrap.appendChild(el("p", { class: "small" }, "History can't be saved in this browser mode."));
  }

  const status = el("p", { class: "small" });
  wrap.appendChild(status);

  function buildEntry() {
    return {
      id: storage.makeId(),
      ts: new Date().toISOString(),
      mode: state.mode,
      context: state.context,
      contextLabel: state.contextLabel,
      energy: state.energy,
      body: state.body,
      feelings: state.selections.map((sel) => ({
        key: sel.key, source: sel.source, label: labelFor(sel), intensity: state.intensities[sel.key] ?? null
      })),
      weather: state.weather,
      note: state.note,
      deeper: state.deeper,
      intention: state.intention
    };
  }

  wrap.appendChild(el("button", {
    class: "btn btn-primary",
    onclick: () => {
      storage.addEntry(buildEntry());
      status.textContent = "Saved on this device";
      setTimeout(() => { clearState(); navigate("/"); }, 1500);
    }
  }, "Save"));

  wrap.appendChild(el("button", {
    class: "btn btn-secondary",
    onclick: async () => {
      const labels = state.selections.map((s) => labelFor(s));
      const result = await shareCheckIn(labels, state.intention);
      status.textContent = result === "copied" ? "Copied." : result === "shared" ? "Shared." : "Could not share.";
    }
  }, "Share"));

  wrap.appendChild(el("button", { class: "btn-link", onclick: () => { clearState(); navigate("/"); } }, "Don't save"));

  const closers = [
    "Feelings are weather, not verdicts.",
    "You noticed. That's the practice.",
    "Go gently.",
    "Now you know what you're bringing with you."
  ];
  wrap.appendChild(el("p", { class: "accent", style: "text-align:center;margin-top:20px;" }, closers[Math.floor(Math.random() * closers.length)]));

  return wrap;
}

// ---------------- HISTORY ----------------
function screenHistory() {
  const wrap = el("div");
  wrap.appendChild(el("h1", { class: "step-title" }, "History"));
  const entries = storage.getEntries();

  if (!entries.length) {
    wrap.appendChild(el("p", { class: "small" }, "No check-ins yet. Your history lives only on this device."));
    return wrap;
  }

  // 30-day panel
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = entries.filter((e) => new Date(e.ts).getTime() >= cutoff);
  const counts = {};
  recent.forEach((e) => (e.feelings || []).forEach((f) => { counts[f.label] = (counts[f.label] || 0) + 1; }));
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (top.length) {
    const panel = el("div", { class: "card" });
    panel.appendChild(el("p", { class: "small" }, "Last 30 days"));
    panel.appendChild(el("p", {}, `Most named: ${top.map(([k, v]) => `${k} (${v})`).join(", ")}.`));
    wrap.appendChild(panel);
  }

  const groups = {};
  entries.forEach((e) => {
    const d = new Date(e.ts);
    const now = new Date();
    let label;
    const diffDays = Math.floor((now.setHours(0,0,0,0) - new Date(d).setHours(0,0,0,0)) / 86400000);
    if (diffDays === 0) label = "Today";
    else if (diffDays === 1) label = "Yesterday";
    else label = new Date(e.ts).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    groups[label] = groups[label] || [];
    groups[label].push(e);
  });

  Object.entries(groups).forEach(([label, list]) => {
    wrap.appendChild(el("h3", { class: "small" }, label));
    list.forEach((entry) => wrap.appendChild(historyRow(entry)));
  });

  const footer = el("div", { class: "footer-actions" });
  footer.appendChild(el("button", { class: "btn-link", onclick: () => downloadFile("inner-weather-export.json", storage.exportJSON(), "application/json") }, "Export (JSON)"));
  footer.appendChild(el("button", { class: "btn-link", onclick: () => downloadFile("inner-weather-export.csv", storage.exportCSV(), "text/csv") }, "Export (CSV)"));

  const importInput = el("input", { type: "file", accept: "application/json", style: "display:none;" });
  importInput.addEventListener("change", async () => {
    const file = importInput.files[0];
    if (!file) return;
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      storage.importEntries(data);
      render();
    } catch {}
  });
  footer.appendChild(el("button", { class: "btn-link", onclick: () => importInput.click() }, "Import"));
  footer.appendChild(importInput);

  const confirmWrap = el("div");
  footer.appendChild(el("button", {
    class: "btn-link",
    onclick: () => {
      confirmWrap.innerHTML = "";
      confirmWrap.appendChild(el("div", { class: "callout" }, [
        "Delete everything? This can't be undone. ",
        el("button", { class: "btn-link", onclick: () => { storage.deleteAllEntries(); render(); } }, "Yes, delete everything"),
        " ",
        el("button", { class: "btn-link", onclick: () => { confirmWrap.innerHTML = ""; } }, "Cancel")
      ]));
    }
  }, "Delete everything"));
  wrap.appendChild(footer);
  wrap.appendChild(confirmWrap);

  return wrap;
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function historyRow(entry) {
  const row = el("div", { class: "history-row" });
  const time = new Date(entry.ts).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  const pillsRow = el("div", { class: "chip-grid", style: "margin-bottom:4px;" });
  (entry.feelings || []).forEach((f) => {
    const color = colorFor({ key: f.key, source: f.source });
    pillsRow.appendChild(el("span", { class: "pill", style: `background:${color};` }, f.label));
  });
  row.appendChild(el("div", { class: "small" }, `${time} · ${entry.contextLabel || ""}`));
  row.appendChild(pillsRow);

  const details = el("div", { style: "display:none;" });
  if (entry.note) details.appendChild(el("p", {}, entry.note));
  if (entry.intention) details.appendChild(el("p", {}, `I'll: ${entry.intention}`));
  details.appendChild(el("button", { class: "btn-link", onclick: () => { storage.deleteEntry(entry.id); render(); } }, "Delete"));
  row.appendChild(details);

  row.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") return;
    details.style.display = details.style.display === "none" ? "block" : "none";
  });
  return row;
}

// ---------------- EXPLORE ----------------
function screenExplore() {
  const wrap = el("div");
  wrap.appendChild(el("h1", { class: "step-title" }, "Explore feelings"));
  const search = el("input", { class: "field", type: "text", placeholder: "Search feelings", style: "margin-bottom:16px;" });
  wrap.appendChild(search);

  const listWrap = el("div");
  wrap.appendChild(listWrap);

  function renderList(query) {
    listWrap.innerHTML = "";
    const q = (query || "").toLowerCase();
    GROUPS.forEach((group) => {
      const entries = Object.entries(ATLAS).filter(([, a]) => a.group === group.id)
        .filter(([, a]) => !q || a.name.toLowerCase().includes(q) || a.meaning.toLowerCase().includes(q));
      if (!entries.length) return;
      const details = el("details", { open: q ? "open" : null, style: "margin-bottom:12px;" });
      details.appendChild(el("summary", { style: "cursor:pointer;font-weight:700;padding:8px 0;" }, group.title));
      entries.forEach(([key, a]) => {
        const color = colorFor({ key, source: "atlas" });
        const card = el("div", { class: "card" });
        card.appendChild(el("div", { style: "display:flex;align-items:center;gap:8px;margin-bottom:8px;" }, [
          el("span", { style: `width:10px;height:10px;border-radius:50%;background:${color};display:inline-block;` }),
          el("strong", {}, a.name),
          a.kind === "experience" ? el("span", { class: "small" }, " Not an emotion, but shapes them.") : null
        ]));
        card.appendChild(el("p", {}, a.meaning));
        if (a.compare) card.appendChild(el("p", { class: "small" }, [el("strong", {}, "Compare: "), a.compare]));
        card.appendChild(el("p", { class: "accent" }, a.ask));
        details.appendChild(card);
      });
      listWrap.appendChild(details);
    });
  }
  renderList("");
  search.addEventListener("input", () => renderList(search.value));
  return wrap;
}

// ---------------- ABOUT ----------------
function screenAbout() {
  const wrap = el("div");
  wrap.appendChild(el("h1", { class: "step-title" }, "About"));
  wrap.appendChild(el("p", {}, "Inner Weather is a one-to-three-minute pause to notice what you are feeling before whatever comes next. It is data, not a gate: name what is here, then choose the version of the next thing that fits."));
  wrap.appendChild(el("p", {}, "Having precise words for feelings makes them easier to work with, not stronger. More than one feeling can be true at once, and feelings pass like weather. You still go outside, you just dress for it."));

  wrap.appendChild(el("h3", {}, "Add it to your home screen"));
  wrap.appendChild(el("p", { class: "small" }, "iPhone: tap Share, then Add to Home Screen. Android: open the browser menu, then Install app."));
  wrap.appendChild(el("p", { class: "small" }, "You can also make shortcuts to a specific context, for example a link ending in #/checkin?context=anytime&mode=quick."));

  wrap.appendChild(el("h3", {}, "Privacy"));
  wrap.appendChild(el("p", { class: "small" }, "Everything stays on your device. There are no accounts and no tracking. Clearing your browser data deletes your history, so export it from the History screen if you want a backup."));

  wrap.appendChild(el("h3", {}, "Credits"));
  wrap.appendChild(el("p", { class: "small" }, [
    "The feeling groups and ideas in this app are inspired by Atlas of the Heart by Brené Brown (Random House, 2021). All descriptions here are written in our own words. This app is not affiliated with or endorsed by Brené Brown or her publisher. If these ideas help you, the book goes much deeper: ",
    el("a", { href: "https://brenebrown.com/book/atlas-of-the-heart", target: "_blank", rel: "noopener" }, "brenebrown.com/book/atlas-of-the-heart")
  ]));
  wrap.appendChild(el("p", { class: "small" }, "The feelings wheel is adapted from the widely shared emotion wheel attributed to Geoffrey Roberts, which builds on Gloria Willcox's Feeling Wheel."));
  wrap.appendChild(el("p", { class: "small" }, "Inner Weather is a reflection tool, not therapy or medical advice."));

  wrap.appendChild(el("h3", {}, "Need support now?"));
  wrap.appendChild(careCallout("strong"));

  const themeRow = el("div", { class: "link-row" });
  themeRow.appendChild(el("span", { class: "small" }, "Theme"));
  const settings = storage.getSettings();
  const themeBtn = el("button", { class: "chip" }, settings.theme === "system" ? "System" : settings.theme === "light" ? "Light" : "Dark");
  themeBtn.addEventListener("click", () => {
    const order = ["system", "light", "dark"];
    const next = order[(order.indexOf(storage.getSettings().theme) + 1) % order.length];
    storage.saveSettings({ theme: next });
    render();
  });
  themeRow.appendChild(themeBtn);
  wrap.appendChild(themeRow);

  return wrap;
}

// ---------------- init ----------------
applyTheme();
render();

// service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
