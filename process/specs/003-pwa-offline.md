# SPEC-003 — PWA instalable y offline
Estado: borrador

## Qué
Poder "instalar" los juegos en la tablet o el celular (ícono en la pantalla de inicio, pantalla completa) y que
funcionen sin internet, por ejemplo en un viaje.

## Criterios de aceptación
- [ ] `manifest.webmanifest` con nombre "Juegos de Maya", íconos 192/512 px (SVG/PNG propios), `display: fullscreen`
  y `start_url`/`scope` relativos (compatibles con la subruta `/juegos-maya/`)
- [ ] Service worker que precachea el menú, todos los juegos, common.js, base.css y los sonidos
- [ ] Con el modo avión activado, después de una visita, el menú y todos los juegos abren y suenan
- [ ] Al publicar una versión nueva, se actualiza sola (caché versionada; la vieja se borra)
- [ ] La fuente Baloo 2 se sirve localmente o hay una alternativa aceptable sin conexión
- [ ] Lighthouse: la sección "Installable" pasa

## Fuera de alcance
- Publicar en Play Store o App Store
- Notificaciones push

## Notas técnicas
- Ojo con la lista de precache: cada juego nuevo debe agregarse (o generarse con un script)
- La voz (`speechSynthesis`) depende del sistema operativo; en general funciona sin conexión con las voces locales
