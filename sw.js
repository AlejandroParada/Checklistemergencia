const CACHE_NAME = "checklist-emergencia-v32";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=32",
  "./manifest.json",
  "./app.js?v=32",
  "./data/checklist.js?v=32",
  "./data/ui.js?v=32",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon-180.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isAppShell(url) {
  const path = url.pathname;
  return (
    path.endsWith(".js") ||
    path.endsWith(".css") ||
    path.endsWith(".json") ||
    path.endsWith("/") ||
    path.endsWith("/index.html") ||
    path.endsWith("/sw.js")
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (request.mode === "navigate" || isAppShell(url)) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              const key =
                request.mode === "navigate" ? "./index.html" : request;
              cache.put(key, copy);
            });
          }
          return networkResponse;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match("./index.html"))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(request, networkResponse.clone())
            );
          }
          return networkResponse;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
