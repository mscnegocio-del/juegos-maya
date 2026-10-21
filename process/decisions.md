# Decisiones técnicas — Juegos de Maya

| Decisión | Fecha | Alternativas descartadas | Razón | Spec |
|----------|-------|--------------------------|-------|------|
| HTML/CSS/JS puro, sin build, un juego por carpeta | 2026-10-21 | React/Vite, Phaser | Pages lo sirve tal cual; juegos simples no necesitan motor; cero dependencias | — |
| Voz con `speechSynthesis` (es-PE si existe) | 2026-10-21 | Grabar voces en MP3 | Sin archivos por cada frase; cualquier texto nuevo se dice al instante | — |
| Sin "perder": el error mueve el elemento y la voz repite la consigna | 2026-10-21 | Sonido de error, vidas, puntaje negativo | Edad de 3 años: la frustración corta el juego | — |
| Deploy con GitHub Actions desde `main` | 2026-10-21 | Pages desde rama `gh-pages` | Despliegue automático en cada push, sin rama extra | — |
| Canva descartado | 2026-10-21 | Canva (generate-image) | El usuario no tiene Canva Pro | — |
| Gráficos: SVG propios inline | 2026-10-21 | Emojis del sistema, OpenMoji, Fluent Emoji | Estilo uniforme, se ven igual en todo dispositivo, animables por partes, livianos. OpenMoji exige atribución; Fluent Emoji (MIT) queda como apoyo rápido | SPEC-001 |
| Sonidos solo CC0 de Freesound (vista previa HQ mp3) | 2026-10-21 | Pixabay, Wikimedia Commons, Kenney | Pixabay bloquea (403); Wikimedia con licencias que exigen atribución; Kenney no tiene animales | SPEC-001 |
| Llama → elefante; mono → gallo | 2026-10-21 | Mantener llama y mono | La llama no tiene un sonido reconocible; los monos CC0 eran ruidosos o gritos agresivos | SPEC-001 |
| Normalización: ~-17 dB medio, limitador, máx. 2.6 s, MP3 mono 80 kbps | 2026-10-21 | Dejar originales | Volúmenes muy distintos (caballo -28 dB, gato 0 dB pico) podían asustar; peso total 160 KB | SPEC-001 |
| Videos con HyperFrames en vez de Remotion (**propuesta, falta confirmar**) | 2026-10-21 | Remotion (React) | HTML puro, igual que los juegos, así que se reutilizan estilos y personajes. Solo se usaría uno de los dos | — |
