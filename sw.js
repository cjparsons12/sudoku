/* Service worker: keep the game available offline after the first visit. */

const CACHE_NAME = 'sudoku-static-v1';

function scopeURL(path) {
  return new URL(path, self.registration.scope).toString();
}

const INDEX_URL = scopeURL('index.html');

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([
        scopeURL('./'),
        INDEX_URL,
        scopeURL('manifest.webmanifest'),
        scopeURL('icon.svg'),
        scopeURL('icon-192.png'),
        scopeURL('icon-512.png'),
        scopeURL('icon-maskable-512.png')
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  // Pages: prefer the latest version, fall back to the cached game offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(INDEX_URL, copy));
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match(request)) || (await cache.match(INDEX_URL)) || Response.error();
        })
    );
    return;
  }

  // Static assets: cache first, then fetch and store on a miss.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
