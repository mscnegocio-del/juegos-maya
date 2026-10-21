# SPEC-016 — Animación de interfaz con GSAP (menú, transiciones y premios)
Estado: borrador
> Requiere aprobar la excepción a "NUNCA librerías/CDN externos" (decisions.md: GSAP en `assets/vendor/`).
> Origen: plan-mejoras-juegos-maya.md.

## Qué
Dar a la interfaz la sensación de las apps de tienda: rebotes con resorte, *squash & stretch*, entradas
escalonadas y celebraciones más vistosas, sin cambiar la mecánica de los juegos.

## Criterios de aceptación
- [ ] GSAP (núcleo, licencia gratuita vigente) guardado en `assets/vendor/gsap/` con su versión y licencia; nunca CDN
- [ ] Menú: las tarjetas entran escalonadas con rebote; al tocar una se aplasta y estira antes de abrir el juego
- [ ] Transición suave al entrar y al volver al menú (sin bloquear el toque más de 300 ms)
- [ ] `Juegos.fiesta()` y `Juegos.pop()` usan GSAP para confeti y estallidos más ricos, con la misma firma
  (los juegos no cambian)
- [ ] Premio de nivel (SPEC-012/015): animación de sticker que vuela al álbum
- [ ] Con `prefers-reduced-motion` todo se reduce a un fundido corto
- [ ] Si `gsap` no carga, todo sigue funcionando con las animaciones CSS actuales (degradación elegante)
- [ ] Peso añadido medido (núcleo ≈ 70 KB sin comprimir, aprox.) y precacheado por `sw.js`; smoke test sin errores

## Fuera de alcance
- Reescribir los juegos con GSAP; plugins que no hagan falta
- Phaser y Lottie (quedan como ideas para juegos futuros)

## Notas técnicas
- Se puede trabajar en paralelo a SPEC-011 porque no necesita imágenes nuevas
- Comprobar la licencia de GSAP al momento de descargar y copiarla junto al archivo
