// Plantilla del service worker. NO editar sw.js a mano: se genera con tools/actualizar-sw.py
const VERSION = "maya-61f644f695";
const ARCHIVOS = [
  "./",
  "juegos/album/",
  "juegos/animales/",
  "juegos/colores/",
  "juegos/contar/",
  "juegos/gato/",
  "juegos/globos/",
  "juegos/piano/",
  "juegos/pintar/",
  "index.html",
  "manifest.webmanifest",
  "assets/css/base.css",
  "assets/fuentes/baloo2-latin.woff2",
  "assets/iconos/icono-180.png",
  "assets/iconos/icono-192.png",
  "assets/iconos/icono-512.png",
  "assets/iconos/icono.svg",
  "assets/img/casa/banera.webp",
  "assets/img/casa/fondo-bano.webp",
  "assets/img/casa/fondo-sala.webp",
  "assets/img/casa/inodoro.webp",
  "assets/img/casa/lavamanos.webp",
  "assets/img/michi/banera-gato.webp",
  "assets/img/michi/base.webp",
  "assets/img/michi/boca.webp",
  "assets/img/michi/esfuerzo.webp",
  "assets/img/michi/feliz.webp",
  "assets/img/michi/lavarse.webp",
  "assets/img/michi/mojado.webp",
  "assets/img/michi/riendo.webp",
  "assets/img/michi/saltando.webp",
  "assets/img/michi/satisfecho.webp",
  "assets/img/michi/sorprendido.webp",
  "assets/js/colorear.js",
  "assets/js/common.js",
  "assets/js/dibujos.js",
  "assets/js/michi-casa.js",
  "assets/js/michi.js",
  "assets/js/stickers.js",
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
  "assets/sonidos/michi/estornudo.mp3",
  "assets/sonidos/michi/ronroneo.mp3",
  "assets/vendor/gsap/gsap.min.js",
  "juegos/album/index.html",
  "juegos/animales/index.html",
  "juegos/colores/index.html",
  "juegos/contar/index.html",
  "juegos/gato/index.html",
  "juegos/globos/index.html",
  "juegos/piano/index.html",
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
