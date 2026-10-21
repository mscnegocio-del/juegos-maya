// Plantilla del service worker. NO editar sw.js a mano: se genera con tools/actualizar-sw.py
const VERSION = "maya-__VERSION__";
const ARCHIVOS = __ARCHIVOS__;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

// Al activar una versión nueva se borran las cachés anteriores
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Primero la caché (funciona sin internet); si no está, se pide a la red
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))
  );
});
