const CACHE_VERSION = 'v3';
const RUNTIME_CACHE = `i3rbly-runtime-${CACHE_VERSION}`;
const ASSET_CACHE = `i3rbly-assets-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(ASSET_CACHE).then((cache) => cache.addAll([
    '/manifest.json',
    '/logo.png'
  ])));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => {
      if (![RUNTIME_CACHE, ASSET_CACHE].includes(key)) {
        return caches.delete(key);
      }
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;


  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;


  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put('/', fresh.clone());
        return fresh;
      } catch (err) {
        const cached = await caches.match('/');
        return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
      }
    })());
    return;
  }


  if (url.pathname.startsWith('/assets/') || /\.(png|jpg|jpeg|svg|gif|webp|ico|css|woff2?|ttf)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(ASSET_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
 
      if (response.ok && response.type === 'basic') {
        cache.put(request, response.clone());
      }
      return response;
    })());
    return;
  }
});
