# Tareas — Juegos de Maya
> Fuente de verdad del estado de tareas.

## Sprint 1 — Base y publicación
| # | Tarea | Spec | Estado |
|---|-------|------|--------|
| 1 | Menú principal con tarjetas, voz al tocar, 2 columnas en celular | — (previo al harness) | hecho |
| 2 | Juego Globos (reventar, voz con el color, confeti cada 10) | — (previo al harness) | hecho |
| 3 | Juego Animales v1 (emojis + voz "la vaca hace muuu") | — (previo al harness) | hecho |
| 4 | Juego Colores ("¿dónde está el rojo?", de 2 a 3 opciones, sin castigo) | — (previo al harness) | hecho |
| 5 | Juego Pintar (multitáctil, 7 colores, estrellitas, esponja) | — (previo al harness) | hecho |
| 6 | Utilidades comunes `common.js` + `base.css` | — | hecho |
| 7 | Workflow GitHub Pages | — | hecho |
| 8 | Llevar la rama a `main` y activar Pages (PR #1 mergeado; rama por defecto = main) | — | hecho |
| 9 | Probar voz y sonidos en celular/tablet real | — | hecho (Animales confirmado por el usuario) |

## Sprint 2 — Calidad visual y sonora
| # | Tarea | Spec | Estado |
|---|-------|------|--------|
| 1 | Conseguir 12 sonidos reales CC0, procesarlos y documentar créditos | SPEC-001 | hecho |
| 2 | Scripts reutilizables de sonido y smoke test en `tools/` | SPEC-001 | hecho |
| 3 | Dibujar 12 animales en SVG inline (estilo uniforme, partes animables) | SPEC-001 | hecho |
| 4 | Integrar audio real en Animales (precarga, sin solapes, voz al terminar) | SPEC-001 | hecho |
| 5 | Verificar SPEC-001 (smoke, capturas y dispositivo real) | SPEC-001 | hecho |
| 7 | PWA instalable y offline (manifest, íconos, fuente local, service worker generado) | SPEC-003 | hecho |
| 8 | Globos, Colores, menú y casita con SVG propios; `dibujos.js` compartido | SPEC-005 | hecho |
| 9 | Juego Piano de colores (7 teclas, animales, multitáctil, canción Estrellita) | SPEC-004 | hecho |
| 10 | Colorear: galería de 12 dibujos, balde por zonas, pincel, goma, deshacer, guardado, "cobra vida" | SPEC-008 | hecho |
| 11 | Michi, mascota virtual: reacciones, 4 cuartos, necesidades, detalles visuales | SPEC-006 | hecho (falta risa real) |
| 12 | Michi con imágenes (10 poses), fondos de sala y baño, barra inferior, escenas del baño (inodoro, lavamanos, bañera, dientes) | SPEC-009/010 | hecho (parte 1) |
| 13 | GSAP en la interfaz: menú animado, transiciones, confeti con física, rebote y premio | SPEC-016 | hecho (falta usar el premio en niveles) |
| 14 | Progreso guardado y nivel adaptativo (`Juegos.progreso`) + rincón de papá en el menú | SPEC-012 | hecho |
| 15 | Álbum de stickers (24 stickers, página por juego, premio al completar nivel) | SPEC-015 | hecho |
| 6 | Juego Contar hasta 5 (manzanas, estrellas, flores, pelotas; voz cuenta; dificultad progresiva) | SPEC-002 | hecho |

## Backlog (priorizado)
| # | Idea | Spec | Estado |
|---|------|------|--------|
| 1 | Michi parte 2: mesa de cocina con 3 platos, dormitorio con cama y mantita, juguetes en la bañera (faltan imágenes) | SPEC-009/010 | aprobada |
| 2 | Mascota virtual: ropa, minijuegos, crecimiento y álbum | SPEC-007 | borrador |
| 2a | Michi por capas animado con Rive (spike en rama aparte; faltan las capas del usuario) | SPEC-011 | borrador |
| 2c | Globos con 6 niveles (color, cantidad, tamaño, sorpresas) | SPEC-013 | borrador |
| 2d | Colores con 8 niveles (más opciones, colores nuevos, claro/oscuro, clasificar, mezclar) | SPEC-014 | borrador |
| 2g | Juegos nuevos: patrones, ¿qué falta?, conceptos espaciales, emociones con Michi, trazar caminos, letras M-A-Y-A, números 1–10 | — | idea |
| 4 | Sonidos reales en otros juegos (pop de globo, aplausos de premio) | — | idea |
| 6 | Memoria de 4 cartas (2 pares) | — | idea |
| 7 | Vestir al osito (arrastrar gorro, lentes, bufanda) | — | idea |
| 8 | Rompecabezas de 2 o 4 piezas (con ilustraciones, sin fotos reales) | — | idea |
| 9 | ¿Quién se esconde? (tocar arbustos, permanencia de objeto) | — | idea |
| 10 | Sombras: unir el animal con su silueta | — | idea |
| 11 | Bañar al perrito / lavar platos (frotar con el dedo) | — | idea |
| 12 | Videos de premio y canciones con HyperFrames (falta confirmar la herramienta) | — | idea |
| 13 | Instalar el plugin frontend-design y aplicarlo a la interfaz | — | idea |
