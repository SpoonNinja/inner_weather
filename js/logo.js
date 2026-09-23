// js/logo.js
// The Inner Weather mark: a calm profile with a little weather inside.
// Kept to three shapes so it still reads at favicon size.

const MARK = `
  <path d="M40 110 C 40 102 39 97 36 92 C 22 80 18 54 30 37 C 42 20 70 15 86 29 C 94 37 97 47 95 56 L 103 69 C 104.5 71.5 103 73 100.5 73 L 96 73 C 97 79 96 87 88 88.5 C 82 89.5 78 94 78 110" fill="var(--logo-fill)" stroke="var(--logo-blue)" stroke-width="7"/>
  <circle cx="54" cy="47" r="14" fill="#F4BE4F"/>
  <path d="M45 76 h26 a9 9 0 0 0 0 -18 a12 12 0 0 0 -23 -1.5 a9.5 9.5 0 0 0 -3 19.5 z" fill="#8EA3C2" stroke="var(--logo-fill)" stroke-width="3.5"/>`;

export function logo(size = 32, className = "logo") {
  const wrap = document.createElement("span");
  wrap.className = className;
  wrap.innerHTML = `<svg viewBox="0 0 120 120" width="${size}" height="${size}" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${MARK}</svg>`;
  return wrap;
}
