// js/breath.js
// A guided breath: in for 4, hold for 2, out for 6. A soft orb grows and settles,
// halos ripple behind it, and a thin ring traces each full breath.

const PHASES = [
  { key: "in", word: "Breathe in", secs: 4, scale: 0.9 },
  { key: "hold", word: "Hold", secs: 2, scale: 0.9 },
  { key: "out", word: "Breathe out", secs: 6, scale: 0.6 }
];
const CYCLE_SECS = PHASES.reduce((n, p) => n + p.secs, 0);
const RING_R = 148;
const RING_LEN = 2 * Math.PI * RING_R;

function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function createBreath({ cycles = 3, onDone } = {}) {
  const el = document.createElement("div");
  el.className = "breath is-idle";
  el.innerHTML = `
    <div class="breath-stage">
      <svg class="breath-ring" viewBox="-160 -160 320 320" aria-hidden="true">
        <circle class="ring-track" r="${RING_R}" />
        <circle class="ring-progress" r="${RING_R}" transform="rotate(-90)"
          stroke-dasharray="${RING_LEN}" stroke-dashoffset="${RING_LEN}" />
      </svg>
      <div class="breath-halo halo-3"></div>
      <div class="breath-halo halo-2"></div>
      <div class="breath-halo halo-1"></div>
      <div class="breath-orb"><div class="orb-glow"></div></div>
      <div class="orb-text" aria-live="polite">
        <span class="breath-word"></span>
        <span class="breath-count"></span>
      </div>
    </div>
    <div class="breath-dots" aria-hidden="true">
      ${Array.from({ length: cycles }, () => '<span class="breath-dot"></span>').join("")}
    </div>`;

  const orb = el.querySelector(".breath-orb");
  const halos = el.querySelectorAll(".breath-halo");
  const ring = el.querySelector(".ring-progress");
  const word = el.querySelector(".breath-word");
  const count = el.querySelector(".breath-count");
  const dots = el.querySelectorAll(".breath-dot");
  let timers = [];
  let stopped = false;

  function later(fn, ms) {
    const id = setTimeout(() => { if (!stopped) fn(); }, ms);
    timers.push(id);
  }

  function setWord(text) {
    word.classList.add("is-swapping");
    later(() => {
      word.textContent = text;
      word.classList.remove("is-swapping");
    }, 180);
  }

  function setScale(scale, secs) {
    const ease = "cubic-bezier(0.45, 0, 0.55, 1)";
    if (reduced()) return;
    orb.style.transition = `transform ${secs}s ${ease}`;
    orb.style.transform = `scale(${scale})`;
    halos.forEach((h, i) => {
      h.style.transition = `transform ${secs}s ${ease} ${i * 0.18}s, opacity ${secs}s ${ease}`;
      h.style.transform = `scale(${scale * (1.12 + i * 0.14)})`;
      h.style.opacity = scale >= 0.9 ? String(0.55 - i * 0.14) : "0.12";
    });
  }

  function runRing() {
    ring.style.transition = "none";
    ring.style.strokeDashoffset = String(RING_LEN);
    ring.getBoundingClientRect();
    ring.style.transition = `stroke-dashoffset ${CYCLE_SECS}s linear`;
    ring.style.strokeDashoffset = "0";
  }

  function runPhase(cycle, phaseIndex) {
    const phase = PHASES[phaseIndex];
    el.dataset.phase = phase.key;
    setWord(phase.word);
    setScale(phase.scale, phase.secs);
    for (let s = 0; s < phase.secs; s++) {
      later(() => { count.textContent = String(phase.secs - s); }, s * 1000);
    }
    later(() => {
      if (phaseIndex < PHASES.length - 1) {
        runPhase(cycle, phaseIndex + 1);
      } else {
        dots[cycle].classList.add("is-done");
        if (cycle + 1 < cycles) runCycle(cycle + 1);
        else finish();
      }
    }, phase.secs * 1000);
  }

  function runCycle(cycle) {
    dots.forEach((d, i) => d.classList.toggle("is-current", i === cycle));
    runRing();
    runPhase(cycle, 0);
  }

  function finish() {
    el.dataset.phase = "done";
    count.textContent = "";
    setWord("Good");
    setScale(0.78, 2);
    later(() => onDone && onDone(), 1600);
  }

  return {
    el,
    start() {
      stopped = false;
      el.classList.remove("is-idle");
      el.classList.add("is-running");
      runCycle(0);
    },
    stop() {
      stopped = true;
      timers.forEach(clearTimeout);
      timers = [];
    }
  };
}
