/* VibeLift service worker — offline-first PWA.
   Bump CACHE_VERSION on any release to invalidate old caches. */
const CACHE_VERSION = 'vibelift-v2';
const CORE_CACHE = CACHE_VERSION + '-core';
const RUNTIME_CACHE = CACHE_VERSION + '-runtime';

/* Boot-critical shell. The app cannot start without these, so they are
   precached at install. CDN scripts are cached best-effort (a single
   network hiccup must not fail the whole install). */
const CORE_LOCAL = [
  './',
  './index.html',
  './manifest.json',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/logo.png'
];
const CORE_CDN = [
  'https://unpkg.com/react@18.2.0/umd/react.development.js',
  'https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone@7.23.5/babel.min.js',
  'https://unpkg.com/@supabase/supabase-js@2.49.4/dist/umd/supabase.js',
  'https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE_CACHE);
    await cache.addAll(CORE_LOCAL);
    // CDN: cache individually so one failure does not abort install.
    await Promise.allSettled(CORE_CDN.map(async url => {
      try {
        const res = await fetch(url, { mode: 'no-cors' });
        if (res) await cache.put(url, res);
      } catch (e) { /* runtime fetch will pick it up later */ }
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k !== CORE_CACHE && k !== RUNTIME_CACHE) return caches.delete(k);
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Never cache Supabase / API calls (added in Phase 2B) — always network.
  if (url.hostname.endsWith('.supabase.co') || url.pathname.startsWith('/api/')) return;

  // Navigation (the page itself): network-first so updates ship, cache fallback offline.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CORE_CACHE);
        cache.put('./index.html', fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match('./index.html');
        return cached || Response.error();
      }
    })());
    return;
  }

  // Everything else (assets, CDN scripts, fonts): cache-first, populate on miss.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(req, res.clone());
      return res;
    } catch (e) {
      return cached || Response.error();
    }
  })());
});
