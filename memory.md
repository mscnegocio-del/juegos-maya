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
- SPEC-009/010 (aprobadas): parte 1 hecha — Michi con las imágenes de ChatGPT, sala y baño ilustrados, barra inferior
  y las 4 escenas del baño. Falta parte 2 (mesa de cocina, dormitorio, juguetes en la bañera)

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
- Michi con imágenes: 10 poses en `assets/img/michi/` (marco común 661x760; la cara cambia según la clase de estado),
  muebles y fondos en `assets/img/casa/`, capa invisible con zonas tocables y barro; escenas en `#capa`
- SPEC-003: manifest, ícono (la vaca), fuente local, `sw.js` generado por `tools/actualizar-sw.py` (también en CI)

- SPEC-012 **implementada**: `Juegos.progreso` en common.js (clave `maya.progreso`) y rincón de papá (mantener 3 s la esquina
  superior derecha del menú). Ningún juego lo usa todavía: lo usarán Globos (013), Colores (014) y el álbum (015)
- SPEC-015 **implementada**: álbum (`juegos/album/`, tarjeta en el menú) y `stickers.js`
- SPEC-013 **implementada**: Globos con 6 niveles; ya da stickers de la página Globos
- SPEC-014 **implementada**: Colores con 8 niveles (clasificar, mezclar pinturas, "trae algo de la casa")
- SPEC-017 **implementada** (Colorear 2.0): hoja nueva, mis dibujos, galería al azar, herramientas mágicas, 39 láminas,
  4 niveles (modelo y trazar) y página Pintar en el álbum
- SPEC-016 aprobada; 011 sigue en borrador
- SPEC-016 hecha: GSAP 3.15.0 en `assets/vendor/`, menú animado, transiciones, confeti con física, `Juegos.rebotar/premio/irA`.
  Solo falta usar `Juegos.premio` cuando existan niveles (012) y álbum (015)

## ⚠️ Decisiones de esta sesión (detalle en process/decisions.md)
- HTML/CSS/JS puro sin build; Canva descartado (no hay Pro); gráficos con SVG propios
- Sonidos: solo CC0 de Freesound. La llama pasa a elefante y el mono a gallo
- Michi usa imágenes webp generadas por el usuario (ChatGPT); el SVG queda para íconos, cocina y dormitorio
- Videos (premios, canciones): se propuso HyperFrames en vez de Remotion. **Pendiente de que el usuario confirme**

## 🔴 Bloqueantes
- Ninguno para desarrollar
- Freesound responde 403 a este servidor y Commons limita la API: sonidos nuevos pueden tardar
- Contar (SPEC-002) aún no se ha probado en un dispositivo real

## 📌 Próximos pasos (próxima sesión)
0. Menú animado: prototipo en `prototipos/menu-animado.html` APROBADO por el usuario; falta pasarlo a `index.html`
   (hay un parche listo en el scratchpad de la sesión; si se perdió, rehacerlo desde el prototipo). Orden aleatorio de juegos incluido
0b. SPEC-018 Rompecabezas IMPLEMENTADO con las 8 ilustraciones de dinosaurios. Siguiente: ilustrar los 12 animales y más temas con el mismo
   prompt (fondo distinto cada uno). Menú animado (prototipos/menu-animado.html): aprobado pero sin aplicar al `index.html`.
0c. Que Maya pruebe Colorear 2.0, Globos y Colores en el dispositivo; también 011 y Rive. Los juegos con niveles deben cargar `stickers.js`.
   Probar en iOS que la app instalada conserve el progreso.
   Preguntas abiertas: ¿orden entre niveles y juegos nuevos?
   ¿Premio como sticker, estrella en el menú o ambos?
1. Que el usuario pruebe Contar en un dispositivo real
2. Que el usuario instale la app desde https://mscnegocio-del.github.io/juegos-maya/ y la pruebe en modo avión
3. Michi parte 2: pedir al usuario imágenes nuevas (fondo de cocina y dormitorio, mesa con mantel, cama de gato,
   Michi comiendo y durmiendo). Que apruebe el nuevo criterio de peso de SPEC-009 (1,5 MB de imágenes)
4. Conseguir una risa CC0 real para Michi (cerrar SPEC-006) y aprobar SPEC-007 (ropa, minijuegos)
5. Ideas del backlog: ¿Quién se esconde?, Memoria de 4 cartas, sonidos reales en Globos
