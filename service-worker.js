/* Cooperata PWA Service Worker
 * Estrategia: stale-while-revalidate para HTML, manifest, icons e assets locais
 */
const CACHE_VERSION = 'cooperata-pwa-v1';
const CACHE_NAME = CACHE_VERSION;

const ASSETS = [
  './index.html',
  './simulador-pessoal.html',
  './simulador-refinanciamento.html',
  './simulador-construcao.html',
  './simulador-carro.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isSameOrigin(req) {
  try { return new URL(req.url).origin === self.location.origin; } catch (_) { return false; }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !isSameOrigin(req)) return; // deixa passar

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    const fetchPromise = fetch(req)
      .then((res) => {
        // somente cacheia respostas 200 OK básicas
        if (res && res.ok && (res.type === 'basic' || res.type === 'opaque')) {
          cache.put(req, res.clone()).catch(() => {});
        }
        return res;
      })
      .catch(() => undefined);

    // stale-while-revalidate
    if (cached) return cached;
    const network = await fetchPromise;
    if (network) return network;

    // Fallback de navegação offline para index
    if (req.mode === 'navigate') {
      const fallback = await cache.match('./index.html');
      if (fallback) return fallback;
    }
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  })());
});

