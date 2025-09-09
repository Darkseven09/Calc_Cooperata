const CACHE = 'coop-sim-v1';
const ASSETS = [
  './linhas-de-credito-unificado.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    try { await cache.addAll(ASSETS); } catch (e) {}
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const resp = await fetch(req);
      const copy = resp.clone();
      const cache = await caches.open(CACHE);
      cache.put(req, copy).catch(()=>{});
      return resp;
    } catch (err) {
      return cached || Response.error();
    }
  })());
});