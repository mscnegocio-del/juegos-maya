# Estado actual — Juegos de Maya
> Última actualización: 2026-10-21

## 🎯 Foco actual
- SPEC-001 Animales v2: implementada salvo la prueba en un dispositivo real (la hace el usuario)
- SPEC-002 Contar hasta 5: implementada

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

## ⚠️ Decisiones de esta sesión (detalle en process/decisions.md)
- HTML/CSS/JS puro sin build; Canva descartado (no hay Pro); gráficos con SVG propios
- Sonidos: solo CC0 de Freesound. La llama pasa a elefante y el mono a gallo
- Videos (premios, canciones): se propuso HyperFrames en vez de Remotion. **Pendiente de que el usuario confirme**

## 🔴 Bloqueantes
- Ninguno para desarrollar
- Publicar requiere una acción del usuario: llevar la rama a `main` y activar Settings → Pages → Source: GitHub Actions
- La voz y los sonidos no se han probado en un dispositivo real (en Chromium headless no se escuchan)

## 📌 Próximos pasos (próxima sesión)
1. Que el usuario pruebe Animales en celular/tablet. Si va bien, marcar SPEC-001 como `implementada`
2. Pedir aprobación de SPEC-003 (PWA offline). El menú tiene 5 tarjetas: la última queda sola en la fila; un 6.º juego lo completa
3. Backlog: pasar Globos, Colores y el menú a SVG con el mismo estilo
