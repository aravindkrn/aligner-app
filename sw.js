const CACHE_NAME = 'aligner-journey-v2';
const ASSETS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS.filter(a => !a.includes('icon') || false))));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => cached))
  );
});

// Handle notification click actions
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  if (e.action === 'confirm') {
    e.waitUntil(clients.openWindow('./index.html'));
  } else if (e.action === 'snooze') {
    // Snooze handled by app polling
  } else {
    e.waitUntil(clients.openWindow('./index.html'));
  }
});
