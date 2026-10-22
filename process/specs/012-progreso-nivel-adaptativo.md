# SPEC-012 — Progreso guardado y nivel adaptativo compartido (`Juegos.progreso`)
Estado: aprobada
> Aprobada por el usuario en el chat el 2026-10-22.
> Base de SPEC-013, SPEC-014 y SPEC-015. Origen: plan-mejoras-juegos-maya.md.

## Qué
Una utilidad común en `common.js` para que cada juego recuerde el nivel de Maya y suba o baje la dificultad solo,
sin que ella "pierda" nunca. Hoy cada juego empieza de cero (salvo Pintar y Michi, que guardan a su manera).

## Criterios de aceptación
- [ ] API en `common.js`:
  `Juegos.progreso.leer(juego)` → `{ nivel, aciertos, racha, stickers: [] }` (valores por defecto si no hay nada),
  `Juegos.progreso.guardar(juego, datos)`, `Juegos.progreso.acierto(juego)` y `Juegos.progreso.fallo(juego)`,
  que devuelven `{ nivel, subio, bajo }`
- [ ] Regla de nivel: sube tras **5 aciertos seguidos** o **80 % de aciertos en las últimas 10 rondas**; baja un nivel
  en silencio tras **3 fallos seguidos**; nunca baja de 1 ni pasa del máximo que declare cada juego
- [ ] Una sola clave `maya.progreso` con un objeto por juego; toda lectura y escritura dentro de `try/catch`
  (si el almacenamiento falla, el juego funciona igual empezando en nivel 1)
- [ ] Al subir de nivel: `Juegos.fiesta()` y la voz lo celebra ("¡Subiste de nivel!"); al bajar no se dice nada
- [ ] **Rincón de papá:** mantener presionado 3 s en una esquina del menú abre un panel (no visible para Maya) para
  reiniciar el progreso o elegir el nivel de cada juego
- [ ] Michi y Pintar siguen usando sus claves actuales (no se migran en esta spec)
- [ ] Smoke test: un caso que simula aciertos y fallos y comprueba subir/bajar y el guardado tras recargar

## Fuera de alcance
- Cuentas, nube o sincronizar entre dispositivos
- Puntajes visibles, números o rankings para Maya

## Notas técnicas
- iOS/Safari puede borrar el almacenamiento de sitios web no usados por un tiempo; la app **instalada** suele estar
  exenta. Probar en el dispositivo real y anotarlo en memory.md
- Cada juego declara `{ maxNivel }` al iniciar; la regla vive en un solo lugar
