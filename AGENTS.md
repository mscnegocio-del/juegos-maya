# AGENTS.md — Juegos de Maya v0.2
> Generado: 2026-10-21

Juegos web educativos para una niña de 3 años (Maya), con un menú principal, publicados en GitHub Pages.

## Stack técnico
- Frontend: HTML + CSS + JavaScript puro (sin framework, sin build). Fuente Baloo 2 local (`assets/fuentes/`)
- PWA: `manifest.webmanifest` + `sw.js` (instalable, funciona sin internet)
- Audio: Web Audio API (efectos sintéticos) + MP3 CC0 en `assets/sonidos/` + `speechSynthesis` (voz es)
- Gráficos: SVG propios en `assets/js/dibujos.js` (sin emojis en la interfaz)
- DB: no aplica
- Deploy: GitHub Pages vía GitHub Actions (`.github/workflows/pages.yml`) en cada push a `main`
- URL: https://mscnegocio-del.github.io/juegos-maya/ (subruta → rutas siempre relativas)

## Comandos
- Instalar: no hay dependencias
- Desarrollo: `python3 -m http.server 8000` → http://localhost:8000
- Test (smoke): `python3 -m http.server 8765 &` y `npm i --no-save playwright@1 && node tools/smoke.mjs`
  (en la nube de Claude Code: `CHROMIUM=/opt/pw-browsers/chromium node tools/smoke.mjs`)
- Offline/PWA: `python3 tools/actualizar-sw.py` tras cambiar cualquier archivo del sitio (regenera `sw.js`;
  el workflow de Pages también lo corre). NUNCA editar `sw.js` a mano (plantilla: `tools/sw.plantilla.js`)
- Sonidos: `tools/sonidos/{buscar,bajar,procesar}.py` (requiere ffmpeg) → ver process/architecture.md

## Convenciones obligatorias
- Cada juego vive en `juegos/<nombre>/index.html`, autocontenido, e incluye
  `../../assets/css/base.css`, `../../assets/js/common.js` y el botón `.btn-casa` (volver al menú)
- Todo juego nuevo se agrega como tarjeta en `index.html` y copia del `<head>` de otro juego los tags de manifest/íconos
- Dibujos: reutilizar o agregar en `assets/js/dibujos.js` (nunca SVG duplicado en un juego); no usar emojis en la interfaz
- Reutilizar `Juegos.decir()`, `Juegos.fiesta()`, `Juegos.pop()`, `Juegos.azar()`… antes de crear utilidades nuevas
- Nombres de variables/funciones y textos en español; comentarios breves solo donde aporten el "por qué"
- Diseño para 3 años: nada depende de leer (todo se dice en voz alta), objetivos táctiles grandes (≥ 72 px),
  respuesta inmediata a cada toque, sin "perder" ni castigos, sin temporizadores que presionen,
  respetar `prefers-reduced-motion`
- Colores desde las variables de `:root` en base.css
- NUNCA rutas absolutas (`/assets/...`): Pages sirve el sitio bajo `/juegos-maya/`
- NUNCA usar assets sin licencia clara: solo propios o CC0; registrar cada sonido en `assets/sonidos/CREDITOS.md`
- NUNCA subir fotos reales de Maya ni de la familia: el repo y el sitio son públicos
- NUNCA agregar librerías/CDN externos: todo debe funcionar sin internet (registrar excepciones en decisions.md)
- NUNCA versionar credenciales ni .env
- Commits en español, descriptivos (qué y por qué)

## Specs (spec-driven liviano)
- No codificar features sin spec en estado `aprobada` en `process/specs/`
- Si no existe spec: redactarla como `borrador` y DETENERSE a esperar aprobación del usuario
- Solo el usuario cambia una spec a `aprobada`. El agente solo puede marcarla `implementada`,
  y únicamente cuando todos sus criterios de aceptación están verificados
- Exentos de spec: hotfixes (documentar luego en decisions.md), spikes en rama aparte sin merge,
  cambios triviales (textos, estilos, renombres)

## Reglas de sesión
- Inicio: leer memory.md y la spec de la tarea en curso
- Cierre (obligatorio, antes de terminar):
  1. Actualizar estado de tareas en process/tasks.md
  2. Actualizar memory.md (resumen de sesión, bloqueantes, próximos pasos)
  3. Registrar decisiones nuevas en process/decisions.md
- Antes de dar algo por terminado: correr `tools/smoke.mjs` y revisar las capturas
- Para contexto profundo → ver process/ (rutas abajo)

## Contexto profundo → process/
- Arquitectura: process/architecture.md
- Tareas/Sprint: process/tasks.md
- Decisiones: process/decisions.md
- Specs: process/specs/
- Historial: process/history.md

## Estado actual → memory.md
