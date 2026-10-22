# SPEC-012 — Progreso guardado y nivel adaptativo compartido (`Juegos.progreso`)
Estado: implementada
> Aprobada por el usuario en el chat el 2026-10-22.
> Base de SPEC-013, SPEC-014 y SPEC-015. Origen: plan-mejoras-juegos-maya.md.

## Qué
Una utilidad común en `common.js` para que cada juego recuerde el nivel de Maya y suba o baje la dificultad solo,
sin que ella "pierda" nunca. Hoy cada juego empieza de cero (salvo Pintar y Michi, que guardan a su manera).

## Criterios de aceptación
- [x] API en `common.js`:
  `Juegos.progreso.leer(juego)` → `{ nivel, aciertos, racha, stickers: [] }` (más `max`, `fallos`, `ultimas`) (valores por defecto si no hay nada),
  `Juegos.progreso.guardar(juego, datos)`, `Juegos.progreso.acierto(juego)` y `Juegos.progreso.fallo(juego)`,
  que devuelven `{ nivel, subio, bajo }`
- [x] Regla de nivel: sube tras **5 aciertos seguidos** o **80 % de aciertos en las últimas 10 rondas**; baja un nivel
  en silencio tras **3 fallos seguidos**; nunca baja de 1 ni pasa del máximo que declare cada juego
- [x] Una sola clave `maya.progreso` con un objeto por juego; toda lectura y escritura dentro de `try/catch`
  (si el almacenamiento falla, el juego funciona igual empezando en nivel 1)
- [x] Al subir de nivel: `Juegos.fiesta()` y la voz lo celebra ("¡Subiste de nivel!"); al bajar no se dice nada
- [x] **Rincón de papá:** mantener presionado 3 s en una esquina del menú abre un panel (no visible para Maya) para
  reiniciar el progreso o elegir el nivel de cada juego
- [x] Michi y Pintar siguen usando sus claves actuales (no se migran en esta spec)
- [x] Smoke test: un caso que simula aciertos y fallos y comprueba subir/bajar y el guardado tras recargar

## Fuera de alcance
- Cuentas, nube o sincronizar entre dispositivos
- Puntajes visibles, números o rankings para Maya

## Notas técnicas
- iOS/Safari puede borrar el almacenamiento de sitios web no usados por un tiempo; la app **instalada** suele estar
  exenta. Probar en el dispositivo real y anotarlo en memory.md
- Cada juego declara `{ maxNivel }` al iniciar; la regla vive en un solo lugar

## Implementación (2026-10-22)
- `common.js`: `Juegos.progreso.{leer, guardar, configurar, acierto, fallo, reiniciar, juegos}`; si el almacenamiento
  falla, el progreso vive en memoria mientras la página esté abierta (probado con `localStorage` bloqueado)
- `configurar(juego, { maxNivel })` devuelve el nivel guardado; cada nivel nuevo reinicia racha, fallos y últimas 10
- Menú: `#rincon` (esquina superior derecha, mantener 3 s) abre el panel con −/+, reiniciar por juego y "reiniciar todo"
  con doble confirmación
- Smoke test: comprueba subir con 5 seguidos, subir por 80 %, tope de nivel, bajar tras 3 fallos, guardado al recargar,
  apertura del rincón y "reiniciar todo"
- Pendiente fuera de los criterios: probar en iOS que la app instalada conserve el progreso
