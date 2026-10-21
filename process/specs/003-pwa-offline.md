# SPEC-003 — PWA instalable y offline
Estado: implementada
> Aprobada por el usuario en el chat el 2026-10-21.

## Qué
Poder "instalar" los juegos en la tablet o el celular (ícono en la pantalla de inicio, pantalla completa) y que
funcionen sin internet, por ejemplo en un viaje.

## Criterios de aceptación
- [x] `manifest.webmanifest` con nombre "Juegos de Maya", íconos 192/512 px (SVG/PNG propios), `display: fullscreen`
  y `start_url`/`scope` relativos (compatibles con la subruta `/juegos-maya/`)
- [x] Service worker que precachea el menú, todos los juegos, common.js, base.css y los sonidos
- [x] Con el modo avión activado, después de una visita, el menú y todos los juegos abren y suenan
- [x] Al publicar una versión nueva, se actualiza sola (caché versionada; la vieja se borra)
- [x] La fuente Baloo 2 se sirve localmente o hay una alternativa aceptable sin conexión
- [x] Instalable: Chromium no reporta errores de instalabilidad (`Page.getInstallabilityErrors` vacío).
  Lighthouse ya no tiene categoría PWA, así que se usa el chequeo equivalente de Chrome

## Fuera de alcance
- Publicar en Play Store o App Store
- Notificaciones push

## Notas técnicas
- Verificado sirviendo el sitio bajo `/juegos-maya/`: modo avión → menú, 5 juegos, fuente y MP3 cargan (200);
  al cambiar un archivo y regenerar, la caché `maya-<hash>` vieja se reemplaza por la nueva
- Falta probar la instalación en el dispositivo real del usuario (no es criterio, pero conviene)
- Ojo con la lista de precache: cada juego nuevo debe agregarse (o generarse con un script)
- La voz (`speechSynthesis`) depende del sistema operativo; en general funciona sin conexión con las voces locales
