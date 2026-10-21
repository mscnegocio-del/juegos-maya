# SPEC-002 — Juego "Contar hasta 5"
Estado: borrador

## Qué
Un juego para empezar a contar: aparecen de 1 a 5 objetos (manzanas, estrellas…). Maya los toca uno por uno
y la voz cuenta en voz alta. Al tocar el último, la voz dice el total y hay celebración.

## Criterios de aceptación
- [ ] Nueva carpeta `juegos/contar/` y su tarjeta en el menú
- [ ] Cada ronda muestra N objetos grandes (N entre 1 y 3 al inicio; sube hasta 5 tras varias rondas completas)
- [ ] Cada objeto tocado se marca (salta o cambia) y la voz dice el número siguiente ("uno", "dos"…)
- [ ] Un objeto ya tocado no vuelve a contar
- [ ] Al completar: la voz dice "¡Cinco manzanas!" (total + nombre), `Juegos.fiesta()` y nueva ronda
- [ ] Objetos dibujados en SVG con el mismo estilo de SPEC-001
- [ ] Smoke test agregado en `tools/smoke.mjs` y sin errores

## Fuera de alcance
- Escribir o reconocer números (la niña no lee)
- Sumas o restas
- Contar más allá de 5
