// js/weather.js
// Pure function: selected feelings + energy answer -> a weather key.
// No DOM, no storage, so it is easy to test on its own.

import { CORES, WHEEL, WORDS } from "./data/wheel.js";
import { ATLAS } from "./data/atlas.js";

// Find which core family a wheel word key belongs to (core, middle, or outer).
export function familyOfWheelWord(key) {
  if (CORES.some((c) => c.id === key)) return key;
  for (const core of CORES) {
    for (const mid of WHEEL[core.id]) {
      if (mid.key === key) return core.id;
      if (mid.outer.includes(key)) return core.id;
    }
  }
  return null;
}

export function coreOf(familyId) {
  return CORES.find((c) => c.id === familyId) || null;
}

// A selection is { key, source: "wheel"|"atlas" }.
function pleasantnessValue(selection) {
  let family = null;
  if (selection.source === "wheel") {
    family = familyOfWheelWord(selection.key);
  } else {
    const entry = ATLAS[selection.key];
    if (entry) family = entry.family;
  }
  if (selection.source === "atlas" && (selection.key === "bittersweetness" || selection.key === "nostalgia")) {
    return 0;
  }
  if (family === "happy") return 1;
  if (family === "surprised") return 0;
  if (family) return -1;
  return 0;
}

function energyBand(energyAnswer, firstSelection) {
  if (energyAnswer != null) {
    if (energyAnswer <= 2) return "low";
    if (energyAnswer === 3) return "mid";
    return "high";
  }
  // Fall back to the first selected feeling's core energy.
  let family = null;
  if (firstSelection) {
    if (firstSelection.source === "wheel") family = familyOfWheelWord(firstSelection.key);
    else {
      const entry = ATLAS[firstSelection.key];
      if (entry) family = entry.family;
    }
  }
  const core = coreOf(family);
  if (!core) return "mid";
  if (core.energy === "low") return "low";
  if (core.energy === "high") return "high";
  return "mid";
}

function isFearfulOrAngry(selection) {
  let family = null;
  if (selection.source === "wheel") family = familyOfWheelWord(selection.key);
  else {
    const entry = ATLAS[selection.key];
    if (entry) family = entry.family;
  }
  return family === "fearful" || family === "angry";
}

/**
 * @param {Array<{key:string, source:"wheel"|"atlas"}>} selections
 * @param {number|null} energyAnswer 1-5, or null if skipped
 * @returns {"charged"|"heavy"|"settled"|"bright"|"mixed"}
 */
export function computeWeather(selections, energyAnswer) {
  if (!selections || selections.length === 0) return "mixed";
  const values = selections.map(pleasantnessValue);
  const hasPositive = values.some((v) => v === 1);
  const hasNegative = values.some((v) => v === -1);
  let pleasantness;
  if (hasPositive && hasNegative) {
    pleasantness = "mixed";
  } else {
    const sum = values.reduce((a, b) => a + b, 0);
    pleasantness = sum > 0 ? "pleasant" : sum < 0 ? "unpleasant" : "mixed";
  }

  if (pleasantness === "mixed") return "mixed";

  const band = energyBand(energyAnswer, selections[0]);

  if (band === "mid") {
    if (pleasantness === "pleasant") return "settled";
    const anyFearfulOrAngry = selections.some(isFearfulOrAngry);
    return anyFearfulOrAngry ? "charged" : "heavy";
  }
  if (pleasantness === "unpleasant" && band === "high") return "charged";
  if (pleasantness === "unpleasant" && band === "low") return "heavy";
  if (pleasantness === "pleasant" && band === "low") return "settled";
  if (pleasantness === "pleasant" && band === "high") return "bright";
  return "mixed";
}

export function labelFor(selection) {
  if (selection.source === "wheel") {
    const w = WORDS[selection.key];
    return w ? w.label : selection.key;
  }
  const a = ATLAS[selection.key];
  return a ? a.name : selection.key;
}

export function colorFor(selection) {
  let family = null;
  if (selection.source === "wheel") family = familyOfWheelWord(selection.key);
  else {
    const entry = ATLAS[selection.key];
    if (entry) family = entry.family;
  }
  const core = coreOf(family);
  return core ? core.core : "#8F8F8F";
}
