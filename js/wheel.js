// js/wheel.js
// The SVG feelings wheel: Overview (all families) and Focus (one family), plus a mini
// non-interactive version for the home screen.

import { CORES, WHEEL, WORDS } from "./data/wheel.js";

const SVG_NS = "http://www.w3.org/2000/svg";

function polar(r, deg) {
  const a = (deg - 90) * (Math.PI / 180);
  return [r * Math.cos(a), r * Math.sin(a)];
}

function arcPath(r0, r1, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0;
  const [x0, y0] = polar(r1, a0);
  const [x1, y1] = polar(r1, a1);
  const [x2, y2] = polar(r0, a1);
  const [x3, y3] = polar(r0, a0);
  if (r0 === 0) return `M0 0 L${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} Z`;
  return `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
}

function svgEl(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function reducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// selection = Set of keys (wheel word keys, including core ids)
export function createWheel({ selection, onToggle, announce }) {
  let view = "overview"; // "overview" | { family: id }
  const root = document.createElement("div");
  root.className = "wheel-root";
  const svg = svgEl("svg", { viewBox: "-300 -300 600 600", role: "group", "aria-label": "Feelings wheel" });
  root.appendChild(svg);

  function labelSize(ring) {
    if (ring === "core") return 15;
    if (ring === "middle") return 12;
    return 10;
  }

  function addSegment({ r0, r1, a0, a1, fill, key, ring, text, ariaLabel, forceLabel }) {
    const mid = (a0 + a1) / 2;
    const g = svgEl("g", {
      role: "button",
      tabindex: "0",
      "aria-pressed": selection.has(key) ? "true" : "false",
      "aria-label": ariaLabel,
      "data-key": key
    });
    const path = svgEl("path", { d: arcPath(r0, r1, a0, a1), fill, stroke: "var(--bg)", "stroke-width": "1.5" });
    g.appendChild(path);

    if (selection.has(key)) {
      const outline = svgEl("path", {
        d: arcPath(r0, r1, a0, a1),
        fill: "none",
        stroke: "#1D2733",
        "stroke-width": "3"
      });
      g.appendChild(outline);
    }

    const narrow = root.clientWidth && root.clientWidth < 560;
    const showLabel = forceLabel || ring !== "outer" || !narrow;
    if (showLabel && text) {
      const rmid = (r0 + r1) / 2;
      let [lx, ly] = polar(rmid, mid);
      let rotate = mid;
      if (mid > 180 && mid < 360) rotate += 180;
      const t = svgEl("text", {
        x: lx, y: ly,
        transform: `rotate(${rotate}, ${lx}, ${ly})`,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "font-size": labelSize(ring),
        "font-weight": selection.has(key) ? 800 : 600,
        fill: "#1D2733",
        "font-family": "Nunito, sans-serif",
        style: "pointer-events:none"
      });
      t.textContent = text;
      g.appendChild(t);
    }

    function toggle() {
      onToggle(key);
    }
    g.addEventListener("click", (e) => {
      if (ring !== "core-center") toggle();
    });
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
    svg.appendChild(g);
    return g;
  }

  function renderOverview() {
    svg.innerHTML = "";
    const totalLeaves = 82;
    let leafIndex = 0;
    const leafAngle = 360 / totalLeaves;

    // Precompute leaf counts per core.
    for (const core of CORES) {
      const mids = WHEEL[core.id];
      const leavesInCore = mids.length * 2;
      const startAngle = leafIndex * leafAngle;
      const endAngle = (leafIndex + leavesInCore) * leafAngle;

      // core ring
      addSegment({
        r0: 44, r1: 120, a0: startAngle, a1: endAngle, fill: core.core,
        key: core.id, ring: "core", text: core.label,
        ariaLabel: `${core.label} family`
      });

      // outer ring uses full white ring if any selection in family
      let midLeaf = leafIndex;
      for (const mid of mids) {
        const midStart = midLeaf * leafAngle;
        const midEnd = (midLeaf + 2) * leafAngle;
        addSegment({
          r0: 120, r1: 205, a0: midStart, a1: midEnd, fill: core.mid,
          key: mid.key, ring: "middle", text: WORDS[mid.key]?.label || mid.key,
          ariaLabel: `${WORDS[mid.key]?.label || mid.key}, ${core.label} family`
        });
        mid.outer.forEach((outerKey, i) => {
          const oStart = (midLeaf + i) * leafAngle;
          const oEnd = (midLeaf + i + 1) * leafAngle;
          addSegment({
            r0: 205, r1: 298, a0: oStart, a1: oEnd, fill: core.mid,
            key: outerKey, ring: "outer", text: WORDS[outerKey]?.label || outerKey,
            ariaLabel: `${WORDS[outerKey]?.label || outerKey}, ${core.label} family`
          });
        });
        midLeaf += 2;
      }
      leafIndex += leavesInCore;
    }

    // center prompt
    const center = svgEl("g", { "aria-hidden": "true" });
    const c = svgEl("circle", { cx: 0, cy: 0, r: 44, fill: "var(--surface)" });
    const t = svgEl("text", {
      x: 0, y: 0, "text-anchor": "middle", "dominant-baseline": "middle",
      "font-size": 13, "font-family": "Nunito, sans-serif", fill: "var(--text)"
    });
    t.textContent = "Tap a color";
    center.appendChild(c);
    center.appendChild(t);
    svg.appendChild(center);

    // click on core segment -> focus view. Re-bind since addSegment's toggle
    // selects the core word; we want core taps to open focus instead unless already
    // has multiple leaves selected. We attach a second listener with capture.
    svg.querySelectorAll('g[data-key]').forEach((g) => {
      const key = g.getAttribute("data-key");
      const core = CORES.find((c) => c.id === key);
      if (core) {
        g.addEventListener("click", (e) => {
          e.stopImmediatePropagation();
          openFocus(core.id);
        }, true);
        g.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopImmediatePropagation();
            e.preventDefault();
            openFocus(core.id);
          }
        }, true);
      }
    });
  }

  function renderFocus(familyId) {
    svg.innerHTML = "";
    const core = CORES.find((c) => c.id === familyId);
    const mids = WHEEL[familyId];
    const leaves = mids.length * 2;
    const leafAngle = 360 / leaves;

    let leafIndex = 0;
    for (const mid of mids) {
      const midStart = leafIndex * leafAngle;
      const midEnd = (leafIndex + 2) * leafAngle;
      addSegment({
        r0: 44, r1: 205, a0: midStart, a1: midEnd, fill: core.mid,
        key: mid.key, ring: "middle", text: WORDS[mid.key]?.label || mid.key,
        ariaLabel: `${WORDS[mid.key]?.label || mid.key}`
      });
      mid.outer.forEach((outerKey, i) => {
        const oStart = (leafIndex + i) * leafAngle;
        const oEnd = (leafIndex + i + 1) * leafAngle;
        addSegment({
          r0: 205, r1: 298, a0: oStart, a1: oEnd, fill: core.mid,
          key: outerKey, ring: "outer", text: WORDS[outerKey]?.label || outerKey,
          ariaLabel: `${WORDS[outerKey]?.label || outerKey}`, forceLabel: true
        });
      });
      leafIndex += 2;
    }

    // center = core word
    const g = svgEl("g", {
      role: "button", tabindex: "0",
      "aria-pressed": selection.has(core.id) ? "true" : "false",
      "aria-label": `${core.label} (select the core feeling)`,
      "data-key": core.id
    });
    const c = svgEl("path", { d: arcPath(0, 44, 0, 360), fill: core.core });
    g.appendChild(c);
    const t = svgEl("text", {
      x: 0, y: 0, "text-anchor": "middle", "dominant-baseline": "middle",
      "font-size": 15, "font-weight": 700, fill: "#1D2733", "font-family": "Nunito, sans-serif"
    });
    t.textContent = core.label;
    g.appendChild(t);
    g.addEventListener("click", () => onToggle(core.id));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(core.id); }
    });
    svg.appendChild(g);

    // Back button
    const back = document.createElement("button");
    back.type = "button";
    back.className = "btn-link wheel-back";
    back.textContent = "All colors";
    back.addEventListener("click", () => openOverview());
    root.querySelectorAll(".wheel-back").forEach((b) => b.remove());
    root.appendChild(back);
  }

  function openFocus(familyId) {
    view = { family: familyId };
    render();
  }
  function openOverview() {
    view = "overview";
    render();
  }

  function render() {
    root.querySelectorAll(".wheel-back").forEach((b) => b.remove());
    if (view === "overview") renderOverview();
    else renderFocus(view.family);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && view !== "overview" && root.isConnected) openOverview();
  });

  render();

  return {
    el: root,
    rerender: render,
    isOverview: () => view === "overview"
  };
}

export function renderMiniWheel(container) {
  container.innerHTML = "";
  const svg = svgEl("svg", { viewBox: "-300 -300 600 600", "aria-hidden": "true", class: "mini-wheel" });
  const totalLeaves = 82;
  const leafAngle = 360 / totalLeaves;
  let leafIndex = 0;
  for (const core of CORES) {
    const mids = WHEEL[core.id];
    const leavesInCore = mids.length * 2;
    const startAngle = leafIndex * leafAngle;
    const endAngle = (leafIndex + leavesInCore) * leafAngle;
    svg.appendChild(svgEl("path", { d: arcPath(44, 120, startAngle, endAngle), fill: core.core, stroke: "var(--bg)", "stroke-width": 1.5 }));
    let midLeaf = leafIndex;
    for (const mid of mids) {
      svg.appendChild(svgEl("path", { d: arcPath(120, 205, midLeaf * leafAngle, (midLeaf + 2) * leafAngle), fill: core.mid, stroke: "var(--bg)", "stroke-width": 1.5 }));
      mid.outer.forEach((_, i) => {
        svg.appendChild(svgEl("path", { d: arcPath(205, 298, (midLeaf + i) * leafAngle, (midLeaf + i + 1) * leafAngle), fill: core.mid, stroke: "var(--bg)", "stroke-width": 1.5 }));
      });
      midLeaf += 2;
    }
    leafIndex += leavesInCore;
  }
  container.appendChild(svg);
  if (!reducedMotion()) {
    svg.style.animation = "spin 120s linear infinite";
  }
  return svg;
}
