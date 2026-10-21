# SPEC-001 — Animales v2: ilustraciones SVG y sonidos reales
Estado: aprobada
> Aprobada por el usuario en el chat el 2026-10-21 («Sí, empieza con Animales en SVG y sonidos reales»).
> Los criterios se redactaron después: revisarlos con el usuario si algo cambia el alcance.

## Qué
Reemplazar los emojis del juego Animales por ilustraciones propias con un estilo uniforme, y la voz que
imita el sonido por grabaciones reales, para que se vea y suene igual en cualquier dispositivo y con más calidad.

## Criterios de aceptación
- [x] 12 sonidos reales CC0, igualados en volumen, en `assets/sonidos/animales/` y con créditos en CREDITOS.md
- [ ] 12 animales como SVG inline con un estilo uniforme (misma paleta, grosor de trazo y proporciones)
- [ ] Al tocar un animal suena su MP3 real sin demora perceptible y el animal se anima (boca u orejas) mientras suena
- [ ] Al terminar el sonido, la voz dice el nombre ("¡La vaca!")
- [ ] Tocar otro animal corta el sonido anterior (sin superposiciones)
- [ ] Animación en reposo sutil (parpadeo) desactivada con `prefers-reduced-motion`
- [ ] Si el MP3 falla, la voz dice "La vaca hace muuu" (comportamiento v1). Sin `speechSynthesis` el juego sigue funcionando
- [ ] Página completa (HTML + audio) ≤ 300 KB
- [ ] `tools/smoke.mjs` sin errores; capturas revisadas a 390 px y en escritorio
- [ ] El usuario lo prueba en un celular o tablet real (sonido + voz)

## Fuera de alcance
- Llama y mono (reemplazados por elefante y gallo, ver decisions.md)
- Modo pregunta "¿Dónde está la vaca?" (posible spec futura)
- Música de fondo
- Pasar los otros juegos a SVG (backlog)

## Notas técnicas
- Animales: vaca, perro, gato, chancho, gallina, gallo, oveja, pato, caballo, león, rana, elefante
- Estilo sugerido: cabezas frontales tipo kawaii, con grupos `<g class="ojos">`, `<g class="boca">`, `<g class="orejas">` para animar con CSS
- Audio: precargar con `fetch` + `decodeAudioData` en el `AudioContext` de common.js (menor latencia, sobre todo en iOS).
  Desbloquear el contexto en el primer toque. Guardar la fuente activa para poder detenerla
- Si se agrega una función de audio reutilizable (`Juegos.sonar(url)`), va en common.js y se documenta en architecture.md
