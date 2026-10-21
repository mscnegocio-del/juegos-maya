# Estado actual — Juegos de Maya
> Última actualización: 2026-10-21

## 🎯 Foco actual
- SPEC-001 Animales v2: implementada (el usuario la probó en un dispositivo real)
- SPEC-002 Contar hasta 5: implementada
- SPEC-003 PWA offline: implementada (falta probar la instalación en el dispositivo del usuario)
- SPEC-005 SVG en Globos, Colores y menú: implementada y publicada (PR #2)
- SPEC-004 Piano de colores: implementada y publicada (PR #3)
- SPEC-008 Colorear con galería: implementada (falta publicar y probar en dispositivo)
- SPEC-006 Michi: implementado y verificado salvo la risa real (sintetizada). SPEC-007 en borrador

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
- SPEC-005: `dibujos.js` compartido; menú, Globos (partículas al reventar), Colores (objetos con carita) y casita en SVG
- SPEC-004: `juegos/piano/` (7 teclas con animales, notas con `Juegos.nota`, multitáctil, canción Estrellita), sexta tarjeta del menú
- SPEC-008: Pintar con galería de 12 dibujos en líneas + hoja en blanco, balde por zonas, pincel, estrellitas, goma, deshacer, guardado y "cobra vida"
- SPEC-006: Michi (`juegos/gato/`), reacciones, 4 cuartos, necesidades, detalles visuales (iris, collar con cascabel, rayas)
- Publicado en GitHub Pages: el sitio en vivo es instalable y abre sin conexión (verificado con Chromium)
- SPEC-003: manifest, ícono (la vaca), fuente local, `sw.js` generado por `tools/actualizar-sw.py` (también en CI)

## ⚠️ Decisiones de esta sesión (detalle en process/decisions.md)
- HTML/CSS/JS puro sin build; Canva descartado (no hay Pro); gráficos con SVG propios
- Sonidos: solo CC0 de Freesound. La llama pasa a elefante y el mono a gallo
- Videos (premios, canciones): se propuso HyperFrames en vez de Remotion. **Pendiente de que el usuario confirme**

## 🔴 Bloqueantes
- Ninguno para desarrollar
- Freesound responde 403 a este servidor y Commons limita la API: sonidos nuevos pueden tardar
- Contar (SPEC-002) aún no se ha probado en un dispositivo real

## 📌 Próximos pasos (próxima sesión)
1. Que el usuario pruebe Contar en un dispositivo real
2. Que el usuario instale la app desde https://mscnegocio-del.github.io/juegos-maya/ y la pruebe en modo avión
3. Publicar SPEC-008 (PR hacia main) y que el usuario pruebe Piano y Colorear en la tablet
4. Conseguir una risa CC0 real para Michi (cerrar SPEC-006) y aprobar SPEC-007 (ropa, minijuegos)
5. Ideas del backlog: ¿Quién se esconde?, Memoria de 4 cartas, sonidos reales en Globos
