# SPEC-016 — Animación de interfaz con GSAP (menú, transiciones y premios)
Estado: aprobada
> Aprobada por el usuario en el chat el 2026-10-22.
> Requiere aprobar la excepción a "NUNCA librerías/CDN externos" (decisions.md: GSAP en `assets/vendor/`).
> Origen: plan-mejoras-juegos-maya.md.

## Qué
Dar a la interfaz la sensación de las apps de tienda: rebotes con resorte, *squash & stretch*, entradas
escalonadas y celebraciones más vistosas, sin cambiar la mecánica de los juegos.

## Criterios de aceptación
- [x] GSAP (núcleo, licencia gratuita vigente) guardado en `assets/vendor/gsap/` con su versión y licencia; nunca CDN
- [x] Menú: las tarjetas entran escalonadas con rebote; al tocar una se aplasta y estira antes de abrir el juego
- [x] Transición suave al entrar y al volver al menú (sin bloquear el toque más de 300 ms)
- [x] `Juegos.fiesta()` y `Juegos.pop()` usan GSAP para confeti y estallidos más ricos, con la misma firma
  (los juegos no cambian)
- [ ] Premio de nivel (SPEC-012/015): animación de sticker que vuela al álbum
  (hecho `Juegos.premio(html, destino)`; falta usarlo cuando existan los niveles y el álbum)
- [x] Con `prefers-reduced-motion` todo se reduce a un fundido corto
- [x] Si `gsap` no carga, todo sigue funcionando con las animaciones CSS actuales (degradación elegante)
- [x] Peso añadido medido (núcleo 3.15.0: 72,9 KB sin comprimir) y precacheado por `sw.js`; smoke test sin errores

## Fuera de alcance
- Reescribir los juegos con GSAP; plugins que no hagan falta
- Phaser y Lottie (quedan como ideas para juegos futuros)

## Notas técnicas
- Se puede trabajar en paralelo a SPEC-011 porque no necesita imágenes nuevas
- Comprobar la licencia de GSAP al momento de descargar y copiarla junto al archivo

## Implementación (2026-10-22)
- `assets/vendor/gsap/gsap.min.js` 3.15.0 + `LICENCIA.md`; cada página lo carga antes de `common.js`
- `common.js`: confeti con física (sale disparado, cae aleteando), `Juegos.pop(el)` opcional con chispitas,
  `Juegos.rebotar(el)` (squash & stretch), `Juegos.premio(html, destino)`, `Juegos.irA(url)` y fundidos de entrada/salida
- Menú: letras que caen rebotando, tarjetas en cascada, saltito de invitación cada 3,5 s, ícono de Michi con su imagen
