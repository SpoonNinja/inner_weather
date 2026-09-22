// js/storage.js
// Settings and entry history, all in localStorage. Everything is wrapped in
// try/catch so the app still works in private browsing or with storage blocked.

const SETTINGS_KEY = "iw.v1.settings";
const ENTRIES_KEY = "iw.v1.entries";
const MAX_ENTRIES = 2000;

function safeParse(json, fallback) {
  try {
    const value = JSON.parse(json);
    return value == null ? fallback : value;
  } catch {
    return fallback;
  }
}

export function storageAvailable() {
  try {
    const k = "__iw_test__";
    localStorage.setItem(k, "1");
    localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return safeParse(raw, defaultSettings());
  } catch {
    return defaultSettings();
  }
}

function defaultSettings() {
  return { theme: "system", usualContext: null, lastContext: null, seenPrivacyNote: false };
}

export function saveSettings(patch) {
  try {
    const current = getSettings();
    const next = { ...current, ...patch };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    return next;
  } catch {
    return { ...defaultSettings(), ...patch };
  }
}

export function getEntries() {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY);
    return safeParse(raw, []);
  } catch {
    return [];
  }
}

export function addEntry(entry) {
  try {
    const entries = getEntries();
    entries.unshift(entry);
    if (entries.length > MAX_ENTRIES) entries.length = MAX_ENTRIES;
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

export function deleteEntry(id) {
  try {
    const entries = getEntries().filter((e) => e.id !== id);
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

export function deleteAllEntries() {
  try {
    localStorage.removeItem(ENTRIES_KEY);
    return true;
  } catch {
    return false;
  }
}

export function importEntries(entries) {
  try {
    if (!Array.isArray(entries)) return false;
    const existing = getEntries();
    const ids = new Set(existing.map((e) => e.id));
    const merged = existing.concat(entries.filter((e) => e && e.id && !ids.has(e.id)));
    merged.sort((a, b) => new Date(b.ts) - new Date(a.ts));
    if (merged.length > MAX_ENTRIES) merged.length = MAX_ENTRIES;
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(merged));
    return true;
  } catch {
    return false;
  }
}

export function exportJSON() {
  return JSON.stringify(getEntries(), null, 2);
}

export function exportCSV() {
  const entries = getEntries();
  const cols = ["id", "ts", "mode", "context", "contextLabel", "energy", "feelings", "weather", "note", "intention"];
  const rows = [cols.join(",")];
  for (const e of entries) {
    const feelings = (e.feelings || []).map((f) => f.label).join("; ");
    const row = [
      e.id, e.ts, e.mode, e.context, e.contextLabel, e.energy ?? "",
      feelings, e.weather, e.note || "", e.intention || ""
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`);
    rows.push(row.join(","));
  }
  return rows.join("\n");
}

export function makeId() {
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
