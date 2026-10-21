# Estado actual — Juegos de Maya
> Última actualización: 2026-10-21

## 🎯 Foco actual
- SPEC-001 Animales v2 (SVG + sonidos reales). Los sonidos ya están listos. Falta dibujar los 12 SVG
  e integrar el audio en `juegos/animales/index.html`

## ✅ Hecho en esta sesión
- Base del sitio: menú (`index.html`, 2 columnas en celular) + 4 juegos: Globos, Animales (emojis + voz),
  Colores y Pintar. Smoke test sin errores en Chromium a 390 px
- Workflow de GitHub Pages (despliega desde `main`)
- 12 sonidos reales CC0 de Freesound recortados, con volumen igualado y en MP3
  (`assets/sonidos/animales/`, 160 KB en total). Créditos en `assets/sonidos/CREDITOS.md`
- Scripts reutilizables de sonido (`tools/sonidos/`) y smoke test (`tools/smoke.mjs`)
- Harness creado (AGENTS.md, memory.md, process/)

## ⚠️ Decisiones de esta sesión (detalle en process/decisions.md)
- HTML/CSS/JS puro sin build; Canva descartado (no hay Pro); gráficos con SVG propios
- Sonidos: solo CC0 de Freesound. La llama pasa a elefante y el mono a gallo
- Videos (premios, canciones): se propuso HyperFrames en vez de Remotion. **Pendiente de que el usuario confirme**

## 🔴 Bloqueantes
- Ninguno para desarrollar
- Publicar requiere una acción del usuario: llevar la rama a `main` y activar Settings → Pages → Source: GitHub Actions
- La voz y los sonidos no se han probado en un dispositivo real (en Chromium headless no se escuchan)

## 📌 Próximos pasos (próxima sesión)
1. SPEC-001: dibujar los 12 animales en SVG inline, con estilo uniforme y partes animables (ojos, boca, orejas)
2. SPEC-001: integrar los MP3 (precarga, cortar el sonido anterior, voz con el nombre al terminar)
3. Correr `tools/smoke.mjs`, revisar capturas y pedir al usuario que pruebe en celular/tablet
4. Proponer al usuario aprobar SPEC-002 (Contar hasta 5) o SPEC-003 (PWA offline)
