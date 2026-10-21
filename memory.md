# Estado actual — Juegos de Maya
> Última actualización: 2026-10-21

## 🎯 Foco actual
- SPEC-001 Animales v2: implementada (el usuario la probó en un dispositivo real)
- SPEC-002 Contar hasta 5: implementada
- SPEC-003 PWA offline: implementada (falta probar la instalación en el dispositivo del usuario)

## ✅ Hecho en esta sesión
- Base del sitio: menú (`index.html`, 2 columnas en celular) + 4 juegos: Globos, Animales (emojis + voz),
  Colores y Pintar. Smoke test sin errores en Chromium a 390 px
- Workflow de GitHub Pages (despliega desde `main`)
- 12 sonidos reales CC0 de Freesound recortados, con volumen igualado y en MP3
  (`assets/sonidos/animales/`, 160 KB en total). Créditos en `assets/sonidos/CREDITOS.md`
- Scripts reutilizables de sonido (`tools/sonidos/`) y smoke test (`tools/smoke.mjs`)
- Harness creado (AGENTS.md, memory.md, process/)
- SPEC-001: 12 animales dibujados en SVG (parpadean; boca y orejas se mueven mientras suenan), audio real
  con `Juegos.sonar()` en common.js (precarga, corta el anterior, voz con el nombre al terminar y respaldo con voz)
- SPEC-002: juego Contar (`juegos/contar/`), tarjeta en el menú y caso en el smoke test
- Publicado en GitHub Pages: el sitio en vivo es instalable y abre sin conexión (verificado con Chromium)
- SPEC-003: manifest, ícono (la vaca), fuente local, `sw.js` generado por `tools/actualizar-sw.py` (también en CI)

## ⚠️ Decisiones de esta sesión (detalle en process/decisions.md)
- HTML/CSS/JS puro sin build; Canva descartado (no hay Pro); gráficos con SVG propios
- Sonidos: solo CC0 de Freesound. La llama pasa a elefante y el mono a gallo
- Videos (premios, canciones): se propuso HyperFrames en vez de Remotion. **Pendiente de que el usuario confirme**

## 🔴 Bloqueantes
- Ninguno para desarrollar
- Contar (SPEC-002) aún no se ha probado en un dispositivo real

## 📌 Próximos pasos (próxima sesión)
1. Que el usuario pruebe Contar en un dispositivo real
2. Que el usuario instale la app desde https://mscnegocio-del.github.io/juegos-maya/ y la pruebe en modo avión
3. Revisar y aprobar SPEC-005 (SVG en Globos, Colores y menú) y SPEC-004 (Piano de colores). Orden sugerido: primero 005
