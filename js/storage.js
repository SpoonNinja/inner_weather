// js/storage.js
// Everything lives in this browser. Every call is guarded so the app still works
// when storage is blocked (private browsing, strict settings).

const SETTINGS_KEY = "iw.v2.settings";
const ENTRIES_KEY = "iw.v2.entries";
const MAX_ENTRIES = 1000;

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const value = JSON.parse(raw);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function getSettings() {
  return { name: "", ...read(SETTINGS_KEY, {}) };
}

export function saveSettings(patch) {
  const next = { ...getSettings(), ...patch };
  write(SETTINGS_KEY, next);
  return next;
}

export function getEntries() {
  const list = read(ENTRIES_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function addEntry(entry) {
  const list = getEntries();
  list.unshift(entry);
  if (list.length > MAX_ENTRIES) list.length = MAX_ENTRIES;
  return write(ENTRIES_KEY, list);
}

export function updateEntry(id, patch) {
  const list = getEntries().map((e) => (e.id === id ? { ...e, ...patch } : e));
  return write(ENTRIES_KEY, list);
}

export function clearEntries() {
  try {
    localStorage.removeItem(ENTRIES_KEY);
    return true;
  } catch {
    return false;
  }
}

export function makeId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
