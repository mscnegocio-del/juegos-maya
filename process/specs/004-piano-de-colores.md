# SPEC-004 — Juego "Piano de colores"
Estado: implementada
> Aprobada por el usuario en el chat el 2026-10-21 («continúa con el spec 004»).

## Qué
Un piano de 7 teclas gigantes, cada una de un color y con un animal. Al tocar una tecla suena su nota y
la voz dice el color. No hay objetivo ni respuesta incorrecta: es para explorar música y colores libremente.

## Criterios de aceptación
- [x] Nueva carpeta `juegos/piano/` y tarjeta en el menú (sexta tarjeta: completa la fila de 2 y de 3 columnas)
- [x] 7 teclas con los colores de `Juegos.COLORES` (escala do-re-mi-fa-sol-la-si), en horizontal en tablet
  y en vertical en celular. Todas ≥ 72 px
- [x] Cada tecla tiene encima un animal SVG pequeño (de `dibujos.js`: vaca, león, pato, rana, elefante, gato, chancho) que salta al sonar
- [x] Al tocar: la nota suena al instante (Web Audio, timbre suave tipo xilófono) y la tecla se hunde e ilumina
- [x] La voz dice el color ("¡rojo!") sin cortar la nota. Si se toca rápido, solo se dice el último color
- [x] Multitáctil: dos dedos tocan dos notas a la vez
- [x] Botón "canción" (🎵): toca sola "Estrellita" iluminando las teclas, y Maya puede seguirla. Tocar cualquier tecla la detiene
- [x] Respeta `prefers-reduced-motion`. Funciona sin conexión (se agrega solo al `sw.js`)
- [x] Caso agregado en `tools/smoke.mjs`, sin errores, y capturas revisadas a 390 px y en escritorio

## Fuera de alcance
- Grabar o reproducir lo que toca Maya
- Más de una canción (se puede agregar después)
- Sonidos de instrumentos reales en MP3: las notas son sintetizadas

## Notas técnicas
- Notas con `Juegos.nota(freq)` (nuevo en common.js): triangle + armónico ×4 suave, ataque 5 ms, caída 0.9 s
- Verificado: 3 toques rápidos → 3 notas y la voz dice solo el último color; dos dedos (CDP touch) → 2 notas a la vez;
  la canción ilumina teclas y un toque la detiene
