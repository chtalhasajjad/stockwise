/**
 * StockWise service worker - full offline support.
 * Bump CACHE_VERSION on every deploy so users get the new files.
 */
const CACHE_VERSION = 'stockwise-v4';

const PAGES = ['/', '/index.html', '/eoq.html', '/reorder-point.html', '/safety-stock.html', '/inventory-turnover.html'];
const ASSETS = [
  '/styles.css', '/script.js', '/manifest.json', '/icon.svg',
  '/pwa-192x192.png', '/pwa-512x512.png', '/pwa-maskable-512x512.png', '/apple-touch-icon.png',
  '/fonts/plus-jakarta-sans-latin-600-normal.woff2', '/fonts/plus-jakarta-sans-latin-700-normal.woff2',
  '/fonts/public-sans-latin-400-normal.woff2', '/fonts/public-sans-latin-500-normal.woff2',
  '/fonts/public-sans-latin-600-normal.woff2', '/fonts/public-sans-latin-700-normal.woff2',
  '/fonts/ibm-plex-mono-latin-500-normal.woff2', '/fonts/ibm-plex-mono-latin-600-normal.woff2',
  '/fonts/ibm-plex-mono-latin-700-normal.woff2'
];

// Cloudflare Pages redirects /eoq.html -> /eoq. A "redirected" response can't be served to a
// navigation, so rebuild it as a plain response before caching/serving.
async function clean(res) {
  if (!res.redirected) return res;
  const body = await res.blob();
  return new Response(body, { status: res.status, statusText: res.statusText, headers: res.headers });
}

// Store every page under all URL spellings: /eoq.html, /eoq, /index.html, /
function keysFor(pathname) {
  const keys = new Set([pathname]);
  if (pathname.endsWith('.html')) keys.add(pathname.slice(0, -5));
  else if (pathname !== '/' && !pathname.includes('.')) keys.add(pathname + '.html');
  if (pathname === '/index.html') keys.add('/');
  if (pathname === '/') keys.add('/index.html');
  return [...keys];
}

async function put(cache, pathname, res) {
  const r = await clean(res);
  for (const k of keysFor(pathname)) await cache.put(new Request(k), r.clone());
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    for (const p of PAGES.concat(ASSETS)) {
      try {
        const res = await fetch(p, { cache: 'reload' });
        if (res.ok) await put(cache, p, res);
      } catch (_) { /* skip, runtime caching will pick it up */ }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((n) => n !== CACHE_VERSION).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Page navigations: network first (fresh), cache fallback (offline)
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_VERSION);
      try {
        const res = await fetch(req);
        if (res.ok) put(cache, url.pathname, res.clone()).catch(() => {});
        return await clean(res);
      } catch (_) {
        for (const k of keysFor(url.pathname)) {
          const hit = await cache.match(k);
          if (hit) return hit;
        }
        return (await cache.match('/index.html')) || Response.error();
      }
    })());
    return;
  }

  // Static assets: cache first, refresh in background
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_VERSION);
    const hit = await cache.match(req, { ignoreSearch: true });
    const refresh = fetch(req).then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    });
    if (hit) { refresh.catch(() => {}); return hit; }
    try { return await refresh; } catch (_) { return Response.error(); }
  })());
});
