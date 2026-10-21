# SPEC-006 — Mascota virtual: el gato de Maya (núcleo)
Estado: borrador

## Qué
Un gato propio (original, no Talking Tom) que vive en el juego, con todas las interacciones del género
"mascota virtual" adaptadas a 3 años: tocarlo, darle de comer, bañarlo, llevarlo al baño, dormirlo y verlo
feliz. Sin micrófono y sin repetir la voz. Sin monedas, compras, anuncios ni castigos.

## Personaje
- Gato original en SVG (estilo de `dibujos.js`): cuerpo entero de frente, color a elegir por el usuario
  (propuesta: gris con manchas blancas). Nombre: **Michi** (confirmado por el usuario el 2026-10-21)
- Piezas animables por separado: ojos (parpadeo, cerrados, felices ^^), boca (sonrisa, abierta, lengua),
  orejas, cola (se mueve siempre), patas, panza, bigotes, mejillas (se sonrojan)
- Respira en reposo, mira hacia donde toca Maya, bosteza si pasa mucho tiempo sin tocarlo

## Criterios de aceptación — reacciones al tocar (sin micrófono)
- [ ] Cabeza: cierra los ojos y ronronea (sonido CC0 de ronroneo)
- [ ] Panza: se ríe con cosquillas y se retuerce
- [ ] Nariz: estornuda (cómico)
- [ ] Cola: salta sorprendido y luego se ríe
- [ ] Patas: levanta la pata y la saluda
- [ ] Mejillas: se sonroja y da un besito (corazones)
- [ ] Deslizar el dedo sobre el lomo: lo acaricia, ronronea más fuerte y salen corazones
- [ ] Tocar muchas veces seguidas: se marea un ratito (estrellitas) y vuelve a estar feliz (nunca se enoja ni llora)
- [ ] Cada reacción tiene animación + sonido real CC0 (maullido, risa, estornudo, ronroneo) y frase corta de voz
  ("¡Jiji, cosquillas!"), sin repetir lo que dice nadie

## Criterios de aceptación — cuidados (4 cuartos, se pasa con flechas grandes o deslizando)
- [ ] **Cocina:** plato con 6 comidas SVG (pescado, leche, manzana, galleta, queso, zanahoria); se arrastra
  al gato y la come mordisco a mordisco; dice si le gusta ("¡Mmm!") o pone cara graciosa con la zanahoria
- [ ] **Baño:** frotar con esponja hace espuma y burbujas; botón de ducha enjuaga; toalla lo seca (se sacude)
- [ ] **Baño (inodoro/bacinica):** llevarlo cuando lo pide (icono); al terminar, aplauso y lavado de manos
- [ ] **Dormitorio:** tocar la lámpara apaga la luz, el gato se acuesta, cierra los ojos, salen "zzz" y
  suena una canción de cuna suave; tocar la lámpara otra vez lo despierta estirándose
- [ ] 4 necesidades con iconos grandes (hambre, limpieza, baño, sueño) que bajan muy despacio y se llenan al
  cuidarlo. Si una baja, el gato lo pide con un gesto (se toca la panza, bosteza…) — **nunca** enferma, llora
  ni se pone triste de forma que angustie
- [ ] Al cuidar bien (todas llenas), el gato baila y hay confeti

## Criterios de aceptación — técnicos
- [ ] `juegos/gato/` y tarjeta en el menú. Estado guardado en `localStorage` (necesidades, ropa, nombre); si
  no hay almacenamiento, empieza siempre contento
- [ ] Sonidos CC0 de Freesound procesados con `tools/sonidos/` y registrados en CREDITOS.md
- [ ] Funciona sin internet, a 60 fps en tablet media, respeta `prefers-reduced-motion`
- [ ] Smoke test con un caso por cuarto; capturas revisadas en celular y tablet

## Fuera de alcance (prohibido por diseño)
- Micrófono, grabar o repetir la voz de Maya
- Monedas, tienda, compras, anuncios, temporizadores que obliguen a volver, notificaciones
- Que la mascota se enferme, se escape o "muera"
- Copiar el personaje, nombre, voz o diseño de Talking Tom u otra marca

## Notas técnicas
- Personaje grande: SVG propio en `assets/js/dibujos.js` (o `gato.js` si supera ~15 KB)
- Interacciones de arrastrar con Pointer Events; detección de zonas por `<g>` con `data-zona`
- Continúa en SPEC-007 (ropa, minijuegos y crecimiento)
