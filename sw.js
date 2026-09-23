// sw.js: offline support. Bump CACHE when you ship changes.
const CACHE = "iw-v3";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest", "./css/styles.css",
  "./js/app.js", "./js/config.js", "./js/wheel.js", "./js/breath.js", "./js/storage.js", "./js/logo.js",
  "./js/data/atlas.js", "./js/data/insights.js", "./icons/icon.svg",
  "./fonts/fraunces.woff2", "./fonts/fraunces-italic.woff2", "./fonts/inter.woff2"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.origin === location.origin) {
    // Network first so updates show up, falling back to cache offline.
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
    );
  } else if (url.hostname.endsWith("googleapis.com") || url.hostname.endsWith("gstatic.com")) {
    e.respondWith(
      caches.open(CACHE).then((c) => c.match(e.request).then((hit) => {
        const net = fetch(e.request).then((res) => { c.put(e.request, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }))
    );
  }
});
