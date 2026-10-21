// Plantilla del service worker. NO editar sw.js a mano: se genera con tools/actualizar-sw.py
const VERSION = "maya-03484941c7";
const ARCHIVOS = [
  "./",
  "juegos/animales/",
  "juegos/colores/",
  "juegos/contar/",
  "juegos/globos/",
  "juegos/pintar/",
  "index.html",
  "manifest.webmanifest",
  "assets/css/base.css",
  "assets/fuentes/baloo2-latin.woff2",
  "assets/iconos/icono-180.png",
  "assets/iconos/icono-192.png",
  "assets/iconos/icono-512.png",
  "assets/iconos/icono.svg",
  "assets/js/common.js",
  "assets/sonidos/animales/caballo.mp3",
  "assets/sonidos/animales/chancho.mp3",
  "assets/sonidos/animales/elefante.mp3",
  "assets/sonidos/animales/gallina.mp3",
  "assets/sonidos/animales/gallo.mp3",
  "assets/sonidos/animales/gato.mp3",
  "assets/sonidos/animales/leon.mp3",
  "assets/sonidos/animales/oveja.mp3",
  "assets/sonidos/animales/pato.mp3",
  "assets/sonidos/animales/perro.mp3",
  "assets/sonidos/animales/rana.mp3",
  "assets/sonidos/animales/vaca.mp3",
  "juegos/animales/index.html",
  "juegos/colores/index.html",
  "juegos/contar/index.html",
  "juegos/globos/index.html",
  "juegos/pintar/index.html"
];

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
