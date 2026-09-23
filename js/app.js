// js/app.js
// Inner Weather: breathe, name what's here, set an intention, and (if you like) send it
// to someone as an invitation to check in too.

import { APP_NAME } from "./config.js";
import { ATLAS } from "./data/atlas.js";
import { PLACES, INSIGHTS, SHARE } from "./data/insights.js";
import { createWheel, placeOf, tint } from "./wheel.js";
import { logo } from "./logo.js";
import { createBreath } from "./breath.js";
import * as store from "./storage.js";

const app = document.getElementById("app");
const live = document.getElementById("live");

// ---------- helpers ----------
function h(tag, attrs = {}, ...children) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") n.className = v;
    else if (k === "style" && typeof v === "object") {
      for (const [prop, val] of Object.entries(v)) {
        if (prop.startsWith("--")) n.style.setProperty(prop, val);
        else n.style[prop] = val;
      }
    }
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2).toLowerCase(), v);
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return n;
}

const ICONS = {
  journal: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h10.5A1.5 1.5 0 0 1 18 5v15.5H7A2 2 0 0 1 5 18.5v-13a2 2 0 0 1 1-1.73"/><path d="M5 18.5A2 2 0 0 1 7 16.5h11"/><path d="M9 7.5h5"/></svg>',
  info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".6" fill="currentColor"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6 8.5 12l6 6"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2"/></svg>',
  share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4M8 8l4-4 4 4"/><path d="M6 12v6.5A1.5 1.5 0 0 0 7.5 20h9a1.5 1.5 0 0 0 1.5-1.5V12"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12.5 4 4 8-9"/></svg>'
};

// Append children, skipping null/false (native append would print "null").
function add(parent, ...kids) {
  for (const k of kids.flat()) if (k != null && k !== false) parent.append(k);
  return parent;
}

function icon(name) {
  const s = h("span", { class: "icon" });
  s.innerHTML = ICONS[name];
  return s;
}

function iconButton(name, label, onClick, extra = "") {
  return h("button", { class: `icon-btn ${extra}`, type: "button", "aria-label": label, title: label, onClick }, icon(name));
}

function announce(text) {
  live.textContent = "";
  requestAnimationFrame(() => { live.textContent = text; });
}

function feelingName(key) {
  return ATLAS[key]?.name || key;
}

function placePhrase(place) {
  return `${place.lead} ${place.rest}`;
}

function chip(key) {
  const place = placeOf(key);
  return h("span", { class: "feeling-chip", style: { "--chip": place ? place.color : "#ccc" } },
    h("span", { class: "chip-dot" }), feelingName(key));
}

const MAX_FEELINGS = 3;

function chips(keys) {
  return h("div", { class: "chip-row" }, keys.map((k) => chip(k)));
}

function listWords(words) {
  if (words.length <= 1) return words[0] || "";
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
}

function entryFeelings(e) {
  const list = Array.isArray(e.feelings) ? e.feelings : e.feeling ? [e.feeling] : [];
  return list.filter((k) => ATLAS[k]);
}

function resetFlow() {
  Object.assign(flow, { intention: "", note: "", key: null, placeId: null, selected: [], focus: null });
}

function baseUrl() {
  return location.origin + location.pathname;
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- state ----------
const flow = {
  screen: "welcome", // welcome | wheel | feeling | closer | intention | done
  key: null,
  from: null, // screen we came from, for back buttons
  intention: "",
  note: "",
  selected: [], // confirmed feelings, in the order they were picked
  focus: null, // which selected feeling the intention screen is showing
  entryId: null,
  placeId: null
};

let invite = null; // { from, feel }
let breath = null;
let wheel = null;

function readInvite() {
  const q = location.hash.split("?")[1];
  if (!q) return;
  const params = new URLSearchParams(q);
  const feels = (params.get("feel") || "").split(",").filter((k) => ATLAS[k]).slice(0, MAX_FEELINGS);
  if (feels.length) {
    invite = { feels, from: (params.get("from") || "").slice(0, 40) };
    try { sessionStorage.setItem("iw.invite", JSON.stringify(invite)); } catch {}
  }
}

function restoreInvite() {
  if (invite) return;
  try {
    const raw = sessionStorage.getItem("iw.invite");
    if (raw) {
      const saved = JSON.parse(raw);
      const feels = (saved.feels || [saved.feel]).filter((k) => ATLAS[k]);
      if (feels.length) invite = { feels, from: saved.from || "" };
    }
  } catch {}
}

// ---------- routing ----------
function route() {
  const path = location.hash.replace(/^#/, "").split("?")[0] || "/";
  if (path === "/journal") return renderPage(journalScreen());
  if (path === "/about") return renderPage(aboutScreen());
  renderFlow();
}

function go(screen, patch = {}) {
  Object.assign(flow, patch, { screen });
  if (location.hash.startsWith("#/journal") || location.hash.startsWith("#/about")) {
    location.hash = "#/";
    return;
  }
  renderFlow();
}

function renderPage(content, { bare = false } = {}) {
  if (breath && flow.screen !== "welcome") { breath.stop(); breath = null; }
  app.textContent = "";
  const shell = h("div", { class: `shell ${bare ? "is-bare" : ""}` }, topbar(), h("main", { class: "screen", id: "main" }, content));
  app.appendChild(shell);
  requestAnimationFrame(() => shell.querySelector(".screen").classList.add("is-in"));
  window.scrollTo({ top: 0 });
}

function topbar() {
  const onFlow = !location.hash.startsWith("#/journal") && !location.hash.startsWith("#/about");
  const mark = logo(30, "logo wordmark-logo");
  return h("header", { class: "topbar" },
    h("button", {
      class: "wordmark", type: "button", "aria-label": `${APP_NAME}, start over`,
      onClick: () => { resetFlow(); go("welcome"); }
    }, mark, h("span", {}, APP_NAME)),
    h("nav", { class: "topbar-actions" },
      iconButton("journal", "Journal", () => { location.hash = "#/journal"; }, onFlow ? "" : (location.hash.startsWith("#/journal") ? "is-active" : "")),
      iconButton("info", "About", () => { location.hash = "#/about"; }, location.hash.startsWith("#/about") ? "is-active" : "")
    )
  );
}

function renderFlow() {
  const screens = { welcome: welcomeScreen, wheel: wheelScreen, feeling: feelingScreen, closer: closerScreen, intention: intentionScreen, done: doneScreen };
  const fn = screens[flow.screen] || welcomeScreen;
  if (flow.screen !== "welcome" && breath) { breath.stop(); breath = null; }
  renderPage(fn(), { bare: flow.screen === "welcome" });
}

// ---------- welcome + breath ----------
function welcomeScreen() {
  breath && breath.stop();
  breath = createBreath({ cycles: 3, onDone: () => afterBreath() });
  const wrap = h("section", { class: "welcome" });

  if (invite) {
    const place = placeOf(invite.feels[0]);
    wrap.appendChild(h("div", { class: "invite-card", style: { "--chip": place.color } },
      h("p", { class: "eyebrow" }, invite.from ? `${invite.from} checked in` : "Someone checked in"),
      h("p", { class: "invite-feeling" }, (() => {
        const t = listWords(invite.feels.map((k) => (SHARE[k] ? SHARE[k][0] : feelingName(k).toLowerCase())));
        return `Feeling ${t}`;
      })()),
      h("p", { class: "invite-note" }, `${invite.from || "They"} would love to know how you're doing. Take a minute, then send yours back.`)
    ));
  }

  const intro = h("div", { class: "welcome-copy" },
    h("h1", { class: "display" }, "Take a breath before anything else."),
    h("p", { class: "lede" }, "Three slow breaths with me. Then we'll put a name to what you're feeling.")
  );
  const skip = h("button", { class: "text-btn skip-btn", type: "button", onClick: () => afterBreath() }, "Skip");
  const begin = h("button", {
    class: "btn btn-primary", type: "button",
    onClick: () => {
      wrap.classList.add("is-breathing");
      breath.start();
    }
  }, "Begin");

  add(wrap, 
    intro,
    h("div", { class: "breath-slot" }, breath.el),
    h("div", { class: "welcome-foot" },
      h("div", { class: "welcome-actions" }, begin),
      h("div", { class: "breathing-actions" }, skip))
  );
  return wrap;
}

function afterBreath() {
  if (breath) { breath.stop(); breath = null; }
  const main = document.querySelector(".welcome");
  if (main && !reducedMotion()) {
    main.classList.add("is-leaving");
    setTimeout(() => go("wheel"), 420);
  } else {
    go("wheel");
  }
}

// ---------- wheel ----------
function wheelScreen() {
  const wrap = h("section", { class: "wheel-screen" });
  const title = h("h1", { class: "title" }, "What's here right now?");
  const sub = h("p", { class: "lede" }, "Start with where you are, then find the word that fits.");
  const back = h("button", { class: "back-link", type: "button", hidden: true, onClick: () => wheel.showOverview() }, icon("back"), "All places");

  wheel = createWheel({
    onPick: (key) => go("feeling", { key, from: "wheel", placeId: wheel.place ? wheel.place.id : null }),
    onViewChange: (place) => {
      back.hidden = !place;
      sub.textContent = place ? "Which of these is closest?" : "Start with where you are, then find the word that fits.";
      if (place) announce(`${placePhrase(place)}. ${place.items.length} feelings.`);
    }
  });

  let tray = null;
  if (flow.selected.length) {
    title.textContent = flow.selected.length >= MAX_FEELINGS ? "That's plenty." : "What else is here?";
    tray = h("div", { class: "tray" },
      h("div", { class: "tray-top" },
        h("p", { class: "eyebrow" }, "Named so far"),
        h("button", { class: "text-btn tray-go", type: "button", onClick: () => go("intention", { focus: flow.selected[0] }) }, "Continue", icon("arrow"))
      ),
      h("div", { class: "chip-row" }, flow.selected.map((k) =>
        h("span", { class: "chip-wrap" }, chip(k),
          h("button", {
            class: "chip-x", type: "button", "aria-label": `Remove ${feelingName(k)}`,
            onClick: () => { flow.selected = flow.selected.filter((x) => x !== k); renderFlow(); }
          }, icon("close")))))
    );
  }

  add(wrap, h("div", { class: "screen-head" }, title, sub), tray, h("div", { class: "wheel-frame" }, back, wheel.el), searchBlock());
  requestAnimationFrame(() => {
    wheel.mount();
    if (flow.placeId) {
      const p = PLACES.find((x) => x.id === flow.placeId);
      if (p) { wheel.showPlace(p); }
    }
  });
  return wrap;
}

function searchBlock() {
  const results = h("div", { class: "search-results", role: "list" });
  const input = h("input", {
    class: "search-input", type: "search", placeholder: "Search 89 feelings", "aria-label": "Search feelings",
    autocomplete: "off", spellcheck: "false"
  });
  const box = h("div", { class: "search", hidden: true }, h("div", { class: "search-field" }, icon("search"), input), results);
  const toggle = h("button", {
    class: "text-btn search-toggle", type: "button",
    onClick: () => { toggle.hidden = true; box.hidden = false; input.focus(); }
  }, icon("search"), "Know the word? Search for it");

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    results.textContent = "";
    if (!q) return;
    const hits = Object.entries(ATLAS)
      .filter(([, a]) => a.name.toLowerCase().includes(q) || (a.feel && a.feel.toLowerCase().includes(q)))
      .slice(0, 8);
    if (!hits.length) {
      results.appendChild(h("p", { class: "muted small" }, "Nothing by that name. Try the wheel above."));
      return;
    }
    hits.forEach(([key]) => {
      results.appendChild(h("button", { class: "search-hit", type: "button", role: "listitem", onClick: () => go("feeling", { key, from: "wheel" }) },
        chip(key), h("span", { class: "hit-place" }, placeOf(key).rest)));
    });
  });
  return h("div", { class: "search-wrap" }, toggle, box);
}

// ---------- feeling ----------
function careNote(level) {
  if (level !== "strong") return null;
  return h("aside", { class: "care" },
    h("p", {}, "You don't have to carry this alone. In the US, you can call or text ",
      h("a", { href: "tel:988" }, "988"), " anytime to talk with someone. Elsewhere, ",
      h("a", { href: "https://findahelpline.com", target: "_blank", rel: "noopener" }, "findahelpline.com"),
      " lists free, confidential support near you. If you're in danger right now, contact local emergency services."));
}

function feelingHeader(key) {
  const place = placeOf(key);
  return h("div", { class: "feeling-head", style: { "--chip": place.color, "--chip-soft": tint(place.color, 0.55) } },
    h("p", { class: "eyebrow place-eyebrow" }, h("span", { class: "chip-dot" }), placePhrase(place)),
    h("h1", { class: "feeling-name" }, feelingName(key))
  );
}

function backBar(label, onClick) {
  return h("div", { class: "back-bar" }, h("button", { class: "back-link", type: "button", onClick }, icon("back"), label));
}

function feelingScreen() {
  const key = flow.key;
  const a = ATLAS[key];
  const place = placeOf(key);
  const wrap = h("section", { class: "feeling-screen", style: { "--chip": place.color } });
  const others = flow.selected.filter((k) => k !== key);
  const canAddMore = others.length + 1 < MAX_FEELINGS;
  const confirm = () => { if (!flow.selected.includes(key)) flow.selected = [...flow.selected, key]; };

  // Optional space to explore the feeling in your own words.
  const note = h("textarea", {
    class: "explore-field", id: "explore", rows: 5, maxlength: 2000,
    placeholder: "What's behind it? Where do you feel it? What is it pulling you toward?"
  });
  note.value = flow.note || "";
  note.addEventListener("input", () => {
    flow.note = note.value;
    note.style.height = "auto";
    note.style.height = `${Math.max(140, note.scrollHeight + 2)}px`;
  });
  const explorePanel = h("div", { class: "explore-panel", hidden: !flow.note },
    h("label", { class: "section-title field-label", for: "explore" }, "In your own words"),
    note,
    h("p", { class: "muted small explore-hint" }, "Just for you. It's saved to your journal, never shared.")
  );
  const exploreToggle = h("button", {
    class: "explore-toggle", type: "button", hidden: !!flow.note,
    onClick: () => { exploreToggle.hidden = true; explorePanel.hidden = false; note.focus(); }
  }, icon("plus"), h("span", {}, "Explore it a little more"), h("span", { class: "muted small" }, "optional"));

  add(wrap, 
    backBar("Back to the wheel", () => go("wheel", { placeId: place.id })),
    feelingHeader(key),
    h("p", { class: "meaning" }, a.meaning),
    a.kind === "experience" ? h("p", { class: "muted small kind-note" }, "Not an emotion exactly, but something that shapes how we feel.") : null,
    h("blockquote", { class: "ask" }, a.ask),
    careNote(a.care),
    h("div", { class: "explore" }, exploreToggle, explorePanel),
    h("div", { class: "decision" },
      others.length ? h("div", { class: "decision-others" }, h("span", { class: "muted small" }, "Also named:"), chips(others)) : null,
      h("p", { class: "decision-q" }, "Does this sound like what you're feeling?"),
      h("button", { class: "btn btn-primary", type: "button", onClick: () => { confirm(); go("intention", { focus: flow.selected[0] }); } }, "Yes, that's it"),
      canAddMore ? h("button", { class: "btn btn-soft", type: "button", onClick: () => { confirm(); go("wheel", { placeId: null }); } }, icon("plus"), "Yes, and there's more") : null,
      h("button", { class: "btn btn-quiet", type: "button", onClick: () => go("closer") }, "Not quite")
    )
  );
  return wrap;
}

// ---------- not quite ----------
function firstSentence(text) {
  const m = text.match(/^.*?[.?!](\s|$)/);
  return m ? m[0].trim() : text;
}

function closerScreen() {
  const key = flow.key;
  const a = ATLAS[key];
  const near = INSIGHTS[key].near;
  const wrap = h("section", { class: "closer-screen" });
  add(wrap, 
    backBar(feelingName(key), () => go("feeling")),
    h("div", { class: "screen-head" },
      h("h1", { class: "title" }, "Let's look a little closer."),
      h("p", { class: "lede" }, `These sit close to ${feelingName(key).toLowerCase()}. Notice which one your body agrees with.`)
    ),
    a.compare ? h("aside", { class: "compare-note" }, h("p", { class: "eyebrow" }, "Easy to mix up"), h("p", {}, a.compare)) : null,
    h("div", { class: "near-list" }, near.map((k) => {
      const place = placeOf(k);
      return h("button", { class: "near-card", type: "button", style: { "--chip": place.color }, onClick: () => go("feeling", { key: k }) },
        h("span", { class: "near-bar" }),
        h("span", { class: "near-body" },
          h("span", { class: "near-name" }, feelingName(k)),
          h("span", { class: "near-text" }, firstSentence(ATLAS[k].meaning))
        ),
        icon("arrow"));
    })),
    h("div", { class: "closer-foot" },
      h("p", { class: "muted small" }, "None of these? That's okay. Feelings are hard to name."),
      h("button", { class: "btn btn-quiet", type: "button", onClick: () => go("wheel", { placeId: null }) }, "Look around the whole wheel")
    )
  );
  return wrap;
}

// ---------- intention ----------
function intentionScreen() {
  if (!flow.selected.length && flow.key) flow.selected = [flow.key];
  const key = flow.selected.includes(flow.focus) ? flow.focus : flow.selected[0];
  const ins = INSIGHTS[key];
  const place = placeOf(key);
  const wrap = h("section", { class: "intention-screen", style: { "--chip": place.color, "--chip-soft": tint(place.color, 0.6) } });

  const field = h("textarea", {
    class: "intention-field", id: "intention", rows: 3, maxlength: 240,
    placeholder: "For the rest of today, I want to..."
  });
  field.value = flow.intention || "";
  const cards = [];
  field.addEventListener("input", () => {
    flow.intention = field.value;
    cards.forEach((c) => c.classList.toggle("is-chosen", c.dataset.idea === field.value));
  });

  const ideas = h("div", { class: "idea-list" }, ins.ideas.map((idea) => {
    const card = h("button", {
      class: "idea", type: "button", "data-idea": idea, "aria-label": `Use: ${idea}`,
      onClick: () => {
        field.value = idea;
        flow.intention = idea;
        cards.forEach((c) => c.classList.toggle("is-chosen", c === card));
        field.focus();
        field.setSelectionRange(field.value.length, field.value.length);
      }
    }, h("span", { class: "idea-text" }, idea), h("span", { class: "idea-icon" }, icon("plus"), icon("check")));
    cards.push(card);
    return card;
  }));

  add(wrap, 
    backBar(flow.selected.length > 1 ? "Back to the wheel" : feelingName(key), () =>
      flow.selected.length > 1 ? go("wheel", { placeId: null }) : go("feeling", { key })),
    flow.selected.length > 1 ? h("div", { class: "focus-tabs", role: "tablist", "aria-label": "Your feelings" },
      flow.selected.map((k) => h("button", {
        class: `focus-tab ${k === key ? "is-active" : ""}`, type: "button", role: "tab",
        "aria-selected": k === key ? "true" : "false", style: { "--chip": placeOf(k).color },
        onClick: () => { if (k !== key) go("intention", { focus: k }); }
      }, h("span", { class: "chip-dot" }), feelingName(k)))) : null,
    h("div", { class: "signal-card" },
      h("p", { class: "eyebrow" }, h("span", { class: "chip-dot" }), `What ${feelingName(key).toLowerCase()} may be telling you`),
      h("p", { class: "signal" }, ins.signal)
    ),
    h("h2", { class: "section-title" }, "A few ways to respond"),
    h("p", { class: "muted small section-sub" }, "Tap one to start from it, or write your own."),
    ideas,
    h("label", { class: "section-title field-label", for: "intention" }, "Your intention"),
    field,
    h("div", { class: "sticky-actions" },
      h("button", { class: "btn btn-primary", type: "button", onClick: () => finish() }, "Set my intention"),
      h("button", { class: "text-btn", type: "button", onClick: () => { flow.intention = ""; finish(); } }, "Skip for now")
    )
  );
  return wrap;
}

function finish() {
  const entry = {
    id: store.makeId(),
    ts: new Date().toISOString(),
    feelings: [...flow.selected],
    intention: (flow.intention || "").trim(),
    note: (flow.note || "").trim(),
    replyTo: invite ? invite.from || "someone" : null
  };
  store.addEntry(entry);
  go("done", { entryId: entry.id });
}

// ---------- done + share ----------
const CLOSERS = [
  "Feelings are weather, not verdicts.",
  "You noticed. That's the practice.",
  "Go gently.",
  "Now you know what you're bringing with you."
];

// The first feeling sets the tone; every feeling appears in the list.
function shareMessage(keys, replying, link) {
  const words = keys.map((k) => (SHARE[k] ? SHARE[k][0] : feelingName(k).toLowerCase()));
  const line = (SHARE[keys[0]] ? SHARE[keys[0]][1] : "I'm feeling {f} right now. How are you feeling?").replace("{f}", listWords(words));
  const opener = replying ? "Checking in back." : "Just checking in.";
  const body = `${opener} ${line}`;
  if (!link) return body;
  const cta = replying ? "Here's the link if you want to check in again:" : "Check in here and send yours back:";
  return `${body}\n\n${cta}\n${link}`;
}

function doneScreen() {
  const keys = flow.selected.length ? flow.selected : [flow.key];
  const key = keys[0];
  const place = placeOf(key);
  const intention = (flow.intention || "").trim();
  const settings = store.getSettings();
  const replying = !!invite;

  const nameField = h("input", {
    class: "name-input", type: "text", maxlength: 40, autocomplete: "given-name",
    placeholder: "Your first name", value: settings.name || "", "aria-label": "Your first name"
  });
  const status = h("p", { class: "share-status", role: "status" });

  async function share() {
    const name = nameField.value.trim();
    store.saveSettings({ name });
    const params = new URLSearchParams({ ...(name ? { from: name } : {}), feel: keys.join(",") });
    const link = `${baseUrl()}#/?${params.toString()}`;
    const text = shareMessage(keys, replying, link);
    try {
      if (navigator.share) {
        await navigator.share({ text });
        status.textContent = "Sent.";
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = "Copied. Paste it into a message.";
    } catch {
      status.textContent = "Couldn't copy automatically. Here's the link: " + link;
    }
  }

  const shareTitle = replying && invite.from ? `Send yours back to ${invite.from}` : "Share how you're doing";
  const shareSub = replying
    ? "They'll see what you landed on, with a link to check in again."
    : "Send it to someone you love. The link invites them to check in and send theirs back.";

  const wrap = h("section", { class: "done-screen", style: { "--chip": place.color, "--chip-soft": tint(place.color, 0.55) } });
  add(wrap, 
    h("div", { class: "summary" },
      h("div", { class: "summary-mark" }, logo(64)),
      h("p", { class: "eyebrow" }, new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })),
      h("h1", { class: "display done-title" }, "You named it."),
      h("div", { class: "summary-feeling" }, chips(keys)),
      h("p", { class: "share-preview" }, shareMessage(keys, replying, null)),
      intention ? h("p", { class: "summary-intention" }, h("span", { class: "eyebrow" }, "Intention"), h("span", { class: "intention-text" }, intention)) : null,
      h("p", { class: "muted small" }, "Saved to your journal on this device.")
    ),
    h("div", { class: "share-card" },
      h("h2", { class: "section-title" }, shareTitle),
      h("p", { class: "muted small" }, shareSub),
      h("div", { class: "share-row" },
        nameField,
        h("button", { class: "btn btn-primary btn-share", type: "button", onClick: share }, icon("share"), "Send")
      ),
      status
    ),
    h("p", { class: "closer-line" }, CLOSERS[Math.floor(Math.random() * CLOSERS.length)]),
    h("button", {
      class: "text-btn center", type: "button",
      onClick: () => {
        invite = null;
        try { sessionStorage.removeItem("iw.invite"); } catch {}
        resetFlow();
        go("welcome");
      }
    }, "Done")
  );
  return wrap;
}

// ---------- journal ----------
function dayLabel(date) {
  const d = new Date(date); d.setHours(0, 0, 0, 0);
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const diff = Math.round((t - d) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return new Date(date).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

function journalScreen() {
  const entries = store.getEntries().filter((e) => entryFeelings(e).length);
  const wrap = h("section", { class: "journal-screen" });
  add(wrap, 
    backBar("Back", () => { location.hash = "#/"; }),
    h("div", { class: "screen-head" },
      h("h1", { class: "title" }, "Journal"),
      h("p", { class: "lede" }, "Your check-ins live only on this device.")
    )
  );

  if (!entries.length) {
    wrap.appendChild(h("div", { class: "empty" }, logo(80), h("p", {}, "Nothing here yet. Your first check-in will show up here.")));
    return wrap;
  }

  // Most named in the last 30 days
  const cutoff = Date.now() - 30 * 86400000;
  const counts = {};
  entries.filter((e) => new Date(e.ts) >= cutoff).forEach((e) => entryFeelings(e).forEach((k) => { counts[k] = (counts[k] || 0) + 1; }));
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (top.length) {
    wrap.appendChild(h("div", { class: "pattern" },
      h("p", { class: "eyebrow" }, "Most named, last 30 days"),
      h("div", { class: "pattern-row" }, top.map(([k, n]) => h("span", { class: "pattern-item" }, chip(k), h("span", { class: "pattern-count" }, `${n}`))))
    ));
  }

  let lastDay = null;
  const list = h("div", { class: "journal-list" });
  entries.forEach((e) => {
    const day = dayLabel(e.ts);
    if (day !== lastDay) {
      list.appendChild(h("h2", { class: "day-label" }, day));
      lastDay = day;
    }
    const feels = entryFeelings(e);
    list.appendChild(h("article", { class: "entry" },
      h("div", { class: "entry-top" },
        chips(feels),
        h("time", { class: "entry-time", datetime: e.ts }, new Date(e.ts).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }))
      ),
      e.intention ? h("p", { class: "entry-intention" }, e.intention) : null,
      e.note ? h("details", { class: "entry-note" }, h("summary", {}, "Reflection"), h("p", {}, e.note)) : null,
      e.replyTo ? h("p", { class: "muted small" }, `In reply to ${e.replyTo}`) : null
    ));
  });
  wrap.appendChild(list);

  const confirm = h("div", { class: "confirm", hidden: true },
    h("p", {}, "Clear every check-in on this device? This can't be undone."),
    h("div", { class: "confirm-row" },
      h("button", { class: "btn btn-danger", type: "button", onClick: () => { store.clearEntries(); route(); } }, "Clear journal"),
      h("button", { class: "btn btn-quiet", type: "button", onClick: () => { confirm.hidden = true; clearBtn.hidden = false; } }, "Keep it")
    ));
  const clearBtn = h("button", { class: "text-btn muted", type: "button", onClick: () => { confirm.hidden = false; clearBtn.hidden = true; } }, "Clear journal");
  add(wrap, h("div", { class: "journal-foot" }, clearBtn, confirm));
  return wrap;
}

// ---------- about ----------
function aboutScreen() {
  const wrap = h("section", { class: "about-screen prose" });
  add(wrap, 
    backBar("Back", () => { location.hash = "#/"; }),
    h("h1", { class: "title" }, "About"),
    h("p", { class: "lede" }, "A one-minute pause to notice what you're feeling before whatever comes next."),
    h("p", {}, "Having precise words for feelings makes them easier to work with, not bigger. So Inner Weather does three small things: slows your breathing, helps you find the word, and asks what you want to do with it."),
    h("h2", {}, "Keep it close"),
    h("p", {}, "On iPhone, tap Share, then Add to Home Screen. On Android, open the browser menu and choose Install app. It works offline after the first visit."),
    h("h2", {}, "Privacy"),
    h("p", {}, "Everything stays on your device. No accounts, no tracking. When you share, you choose who gets the message. Clearing your browser data clears your journal."),
    h("h2", {}, "Credits"),
    h("p", {}, "The places and feelings here are inspired by ",
      h("a", { href: "https://brenebrown.com/book/atlas-of-the-heart/", target: "_blank", rel: "noopener" }, "Atlas of the Heart"),
      " by Brené Brown (Random House, 2021). Every description is written in our own words. This app is not affiliated with or endorsed by Brené Brown or her publisher. If these ideas help you, the book goes much deeper."),
    h("p", { class: "muted" }, "Inner Weather is a reflection tool, not therapy or medical advice."),
    h("h2", { id: "support" }, "Need support now?"),
    careNote("strong")
  );
  return wrap;
}

// ---------- boot ----------
readInvite();
restoreInvite();
window.addEventListener("hashchange", route);
route();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const sw = reg.installing;
        sw && sw.addEventListener("statechange", () => {
          if (sw.state === "installed" && navigator.serviceWorker.controller) showUpdate();
        });
      });
    }).catch(() => {});
  });
}

function showUpdate() {
  if (document.querySelector(".update-toast")) return;
  document.body.appendChild(h("div", { class: "update-toast", role: "status" },
    h("span", {}, "A new version is ready."),
    h("button", { class: "text-btn", type: "button", onClick: () => location.reload() }, "Refresh")));
}
