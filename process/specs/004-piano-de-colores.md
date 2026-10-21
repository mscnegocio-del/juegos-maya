# SPEC-004 — Juego "Piano de colores"
Estado: borrador

## Qué
Un piano de 7 teclas gigantes, cada una de un color y con un animal. Al tocar una tecla suena su nota y
la voz dice el color. No hay objetivo ni respuesta incorrecta: es para explorar música y colores libremente.

## Criterios de aceptación
- [ ] Nueva carpeta `juegos/piano/` y tarjeta en el menú (sexta tarjeta: completa la fila de 2 y de 3 columnas)
- [ ] 7 teclas con los colores de `Juegos.COLORES` (escala do-re-mi-fa-sol-la-si), en horizontal en tablet
  y en vertical en celular. Todas ≥ 72 px
- [ ] Cada tecla tiene encima un animal SVG pequeño (reutilizando los dibujos de Animales) que salta al sonar
- [ ] Al tocar: la nota suena al instante (Web Audio, timbre suave tipo xilófono) y la tecla se hunde e ilumina
- [ ] La voz dice el color ("¡rojo!") sin cortar la nota. Si se toca rápido, solo se dice el último color
- [ ] Multitáctil: dos dedos tocan dos notas a la vez
- [ ] Botón "canción" (🎵): toca sola "Estrellita" iluminando las teclas, y Maya puede seguirla. Tocar cualquier tecla la detiene
- [ ] Respeta `prefers-reduced-motion`. Funciona sin conexión (se agrega solo al `sw.js`)
- [ ] Caso agregado en `tools/smoke.mjs`, sin errores, y capturas revisadas a 390 px y en escritorio

## Fuera de alcance
- Grabar o reproducir lo que toca Maya
- Más de una canción (se puede agregar después)
- Sonidos de instrumentos reales en MP3: las notas son sintetizadas

## Notas técnicas
- Mover los dibujos SVG de animales a `assets/js/dibujos.js` para compartirlos entre Animales y Piano (depende de SPEC-005)
- Nota: oscilador `triangle` + envolvente corta (ataque 5 ms, caída ~0.8 s) con `Juegos.tono` o una variante nueva en common.js
