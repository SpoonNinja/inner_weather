// js/wheel.js
// The "places we go" wheel. Overview shows all 13 places and their feelings.
// Tapping a place opens a focused wheel with just that place's feelings, large enough to read.

import { PLACES } from "./data/insights.js";
import { ATLAS } from "./data/atlas.js";

const NS = "http://www.w3.org/2000/svg";
const INK = "#2A2521";
const TOTAL = PLACES.reduce((n, p) => n + p.items.length, 0);

function polar(r, deg) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r * Math.cos(a), r * Math.sin(a)];
}

function arcPath(r0, r1, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0;
  const [x0, y0] = polar(r1, a0);
  const [x1, y1] = polar(r1, a1);
  const [x2, y2] = polar(r0, a1);
  const [x3, y3] = polar(r0, a0);
  return `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
}

function node(tag, attrs = {}) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

export function tint(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c) => Math.round(c + (255 - c) * amount);
  const r = mix(n >> 16), g = mix((n >> 8) & 255), b = mix(n & 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function wrap(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Radial label: reads outward on the right half, flipped on the left so it is never upside down.
function radialLabel({ text, r0, r1, a0, a1, max, min, weight, pad = 12, className = "" }) {
  const mid = (((a0 + a1) / 2) % 360 + 360) % 360;
  const rm = (r0 + r1) / 2;
  const radialLen = r1 - r0 - pad * 2;
  const arcWidth = (2 * Math.PI * rm * (a1 - a0)) / 360 - 3;
  let fs = max;
  let lines = [text];
  for (; fs >= min; fs -= 0.5) {
    const perLine = Math.max(4, Math.floor(radialLen / (fs * 0.56)));
    lines = wrap(text, perLine);
    const longest = Math.max(...lines.map((l) => l.length));
    const fitsRadial = longest * fs * 0.56 <= radialLen;
    const fitsArc = lines.length * fs * 1.12 <= arcWidth;
    if (fitsRadial && fitsArc) break;
  }
  fs = Math.max(fs, min);
  const [x, y] = polar(rm, mid);
  let rot = mid - 90;
  if (mid > 180) rot += 180;
  const t = node("text", {
    transform: `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${rot.toFixed(2)})`,
    "text-anchor": "middle",
    "font-size": fs,
    "font-weight": weight,
    fill: INK,
    class: `wheel-label ${className}`
  });
  const lh = fs * 1.12;
  lines.forEach((l, i) => {
    const ts = node("tspan", { x: 0, dy: i === 0 ? (-(lines.length - 1) / 2) * lh + fs * 0.35 : lh });
    ts.textContent = l;
    t.appendChild(ts);
  });
  return t;
}

function segment({ d, fill, label, ariaLabel, onActivate, className = "" }) {
  const g = node("g", { class: `seg ${className}`, role: "button", tabindex: "0", "aria-label": ariaLabel });
  g.appendChild(node("path", { d, fill, class: "seg-fill" }));
  if (label) g.appendChild(label);
  g.addEventListener("click", onActivate);
  g.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
    }
  });
  return g;
}

function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function createWheel({ onPick, onViewChange }) {
  const root = document.createElement("div");
  root.className = "wheel";
  const svg = node("svg", { viewBox: "-300 -300 600 600", class: "wheel-svg", role: "group", "aria-label": "Places we go wheel" });
  root.appendChild(svg);
  let current = null;

  function paintOverview() {
    svg.textContent = "";
    const step = 360 / TOTAL;
    let a = -(PLACES[0].items.length * step) / 2;
    const wide = root.getBoundingClientRect().width >= 520;

    for (const place of PLACES) {
      const a0 = a;
      const a1 = a + place.items.length * step;
      svg.appendChild(segment({
        d: arcPath(78, 176, a0, a1),
        fill: place.color,
        className: "seg-place",
        label: radialLabel({ text: place.label, r0: 78, r1: 176, a0, a1, max: 12.5, min: 8, weight: 700 }),
        ariaLabel: `${place.lead} ${place.rest}`,
        onActivate: () => showPlace(place)
      }));
      place.items.forEach((key, i) => {
        const b0 = a0 + i * step;
        const b1 = b0 + step;
        const name = ATLAS[key].name;
        svg.appendChild(segment({
          d: arcPath(176, 298, b0, b1),
          fill: tint(place.color, 0.42),
          className: "seg-item",
          label: radialLabel({ text: name, r0: 176, r1: 298, a0: b0, a1: b1, max: 10.5, min: 6.5, weight: 500, pad: 8 }),
          ariaLabel: `${name}, ${place.lead.toLowerCase()} ${place.rest}`,
          onActivate: () => (wide ? onPick(key) : showPlace(place))
        }));
      });
      a = a1;
    }

    const center = node("g", { class: "wheel-center", "aria-hidden": "true" });
    center.appendChild(node("circle", { r: 76, class: "center-disc" }));
    const t = node("text", { "text-anchor": "middle", class: "center-title" });
    ["Places we go", "when"].forEach((line, i) => {
      const ts = node("tspan", { x: 0, dy: i === 0 ? -4 : 26 });
      ts.textContent = line;
      t.appendChild(ts);
    });
    center.appendChild(t);
    svg.appendChild(center);
  }

  function paintPlace(place) {
    svg.textContent = "";
    const n = place.items.length;
    const step = 360 / n;
    const offset = -step / 2;
    place.items.forEach((key, i) => {
      const a0 = offset + i * step;
      const a1 = a0 + step;
      const name = ATLAS[key].name;
      svg.appendChild(segment({
        d: arcPath(104, 298, a0, a1),
        fill: i % 2 ? tint(place.color, 0.28) : tint(place.color, 0.4),
        className: "seg-item seg-focus",
        label: radialLabel({ text: name, r0: 104, r1: 298, a0, a1, max: 21, min: 11, weight: 600, pad: 16 }),
        ariaLabel: name,
        onActivate: () => onPick(key)
      }));
    });

    const center = segment({
      d: arcPath(0.01, 100, 0, 359.99),
      fill: place.color,
      className: "wheel-center focus-center",
      ariaLabel: "Back to all places",
      onActivate: () => showOverview()
    });
    const lead = node("text", { "text-anchor": "middle", class: "center-lead", y: -30 });
    lead.textContent = place.lead.toUpperCase();
    center.appendChild(lead);
    const lines = wrap(place.rest, 13);
    const t = node("text", { "text-anchor": "middle", class: "center-rest" });
    const lh = 21;
    const startY = lines.length === 1 ? 10 : lines.length === 2 ? 0 : -8;
    lines.forEach((l, i) => {
      const ts = node("tspan", { x: 0, y: startY + i * lh });
      ts.textContent = l;
      t.appendChild(ts);
    });
    center.appendChild(t);
    svg.appendChild(center);
  }

  function transition(paint) {
    if (reduced() || !svg.childNodes.length) {
      paint();
      return;
    }
    svg.classList.add("is-leaving");
    setTimeout(() => {
      paint();
      svg.classList.remove("is-leaving");
      svg.classList.add("is-entering");
      requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.remove("is-entering")));
    }, 180);
  }

  function showOverview() {
    current = null;
    transition(paintOverview);
    onViewChange && onViewChange(null);
  }

  function showPlace(place) {
    current = place;
    transition(() => paintPlace(place));
    onViewChange && onViewChange(place);
  }

  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && current) showOverview();
  });

  return {
    el: root,
    mount() {
      if (current) paintPlace(current);
      else paintOverview();
    },
    showOverview,
    showPlace,
    get place() { return current; }
  };
}

export function placeOf(key) {
  return PLACES.find((p) => p.items.includes(key));
}

// A small, label-free wheel for decoration (welcome screen, icon).
export function miniWheel(size = 120) {
  const svg = node("svg", { viewBox: "-300 -300 600 600", width: size, height: size, class: "mini-wheel", "aria-hidden": "true" });
  const step = 360 / TOTAL;
  let a = -(PLACES[0].items.length * step) / 2;
  for (const place of PLACES) {
    const a1 = a + place.items.length * step;
    svg.appendChild(node("path", { d: arcPath(90, 180, a, a1), fill: place.color, class: "mini-seg" }));
    svg.appendChild(node("path", { d: arcPath(180, 298, a, a1), fill: tint(place.color, 0.42), class: "mini-seg" }));
    a = a1;
  }
  return svg;
}
