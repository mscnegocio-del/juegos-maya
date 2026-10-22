# SPEC-017 — Colorear 2.0: hoja nueva, herramientas mágicas, más dibujos, niveles y galería al azar
Estado: aprobada
> Aprobada por el usuario en el chat el 2026-10-22; se implementa por partes (1 arreglos y galería, 2 herramientas,
> 3 láminas, 4 niveles y stickers).
> Depende de SPEC-008 (Pintar actual), SPEC-012 (progreso), SPEC-015 (álbum) y SPEC-016 (GSAP).
> Origen: pedido del usuario (2026-10-22) tras probarlo Maya ("no se puede despintar y volver a pintar") y revisión
> de apps de colorear para 2–6 años en 2026 (sin anuncios, brillitos, pincel mágico, sellos, dibujos que se animan,
> trazar punteado, página sorpresa del día).

## Qué
Que Maya pueda limpiar y volver a pintar sin ayuda, tenga herramientas más divertidas, muchos más dibujos que
aparecen en orden distinto cada vez, niveles que crecen con ella y stickers por terminar láminas.

## Criterios de aceptación

### Arreglos (lo que Maya notó)
- [ ] Botón grande **"hoja nueva"** (escoba): deja el dibujo en blanco con animación de barrido y voz ("¡Hoja nueva!")
- [ ] La hoja nueva **se puede deshacer** con un toque (por si la tocó sin querer)
- [ ] Antes de limpiar, la versión pintada se **guarda como copia en la galería** ("mis dibujos"), así nunca se pierde
- [ ] Al abrir un dibujo ya pintado, se ofrecen dos opciones con dibujos y voz: **seguir pintando** o **empezar en blanco**
- [ ] **Goma más visible**: ícono grande y claro; al elegirla dice "¡Goma! Toca o frota para despintar"; un toque
  despinta la zona, frotar borra el pincel
- [ ] **Deshacer** sigue disponible y además se puede mantener presionado para deshacer varios pasos seguidos

### Galería al azar
- [ ] **Cada vez que se entra a Colorear, los dibujos de la galería aparecen en orden aleatorio**
- [ ] La hoja en blanco y "mis dibujos" quedan siempre en el mismo lugar (al inicio) para que Maya los encuentre
- [ ] El **dibujo sorpresa del día** va primero, envuelto como regalo: al tocarlo se "desenvuelve" con animación

### Herramientas nuevas
- [ ] **Pincel arcoíris**: cambia de color mientras se pinta
- [ ] **Brillitos**: relleno o trazo con destellos que se mueven suavemente
- [ ] **Sellos**: tocar para pegar estrellitas, corazones, huellitas de gato, flores, el pato y Michi
  (grandes, con un "pop" y sonido)
- [ ] **Pincel mágico**: el trazo queda solo dentro de la zona donde empezó (nunca se sale de las líneas)
- [ ] Paleta con más colores (los 7 de siempre + celeste, café, negro, blanco, gris y rosado clarito) sin achicar
  los botones (≥ 72 px; desplazable o en dos filas)

### Más dibujos (SVG propios con zonas, como hoy)
- [ ] Al menos **24 láminas nuevas** en temas: **mar** (pez, pulpo, ballena, tortuga), **vehículos** (auto, bus, avión,
  barco, tren), **comida** (helado, torta, fruta), **la casa de Michi** (Michi, ovillo, cama), **naturaleza** (árbol,
  sol con nubes, arcoíris, mariposa) y **los animales del juego** que aún no estén
- [ ] Cada lámina indica su dificultad: pocas zonas grandes (fácil), más zonas (media), detalles (difícil)

### Niveles (con `Juegos.progreso`, juego "pintar")
- [ ] **Nivel 1:** láminas fáciles (pocas zonas grandes)
- [ ] **Nivel 2:** aparecen las de dificultad media
- [ ] **Nivel 3:** "**pinta como el modelo**": se ve una mini versión coloreada; si se parece, festejo extra (nunca obliga)
- [ ] **Nivel 4:** **trazar** sobre líneas punteadas gruesas antes de colorear (prepara para escribir)
- [ ] Terminar una lámina ("listo") cuenta como acierto; no hay fallos (colorear nunca se "pierde")
- [ ] Las láminas de niveles superiores ya están disponibles desde el inicio en la galería; el nivel solo cambia
  cuáles se proponen primero y si aparece el modelo o el punteado
- [ ] Desde el rincón de papá se puede elegir el nivel (ya existe)

### Premios y "cobra vida"
- [ ] Nueva página **"Pintar"** en el álbum con 12 stickers; terminar láminas los va dando
- [ ] Al terminar, el dibujo **cobra vida con movimiento propio** según el tema (el pez nada, el avión vuela, la
  mariposa aletea, el auto avanza, Michi maúlla) además del sonido del animal si lo tiene

### Siempre
- [ ] Todo se dice en voz alta; sin anuncios, sin tiempo límite, sin castigos; respeta `prefers-reduced-motion`
- [ ] Funciona sin internet; lo pintado y "mis dibujos" se guardan en el dispositivo
- [ ] Smoke test: hoja nueva + deshacer, goma, cada herramienta nueva, orden aleatorio distinto en dos entradas,
  sorpresa del día, un caso por nivel y sticker al terminar

## Fuera de alcance
- Fotos reales o subir imágenes propias
- Compartir en redes, cuentas o nube
- Imágenes de ChatGPT para las láminas (necesitan zonas SVG separadas para rellenar)
- Colorear por números con cifras escritas (Maya aún no lee números)

## Notas técnicas
- Láminas en `colorear.js` (como hoy); si pesa mucho, dividir por tema y cargar al abrir la galería
- Orden aleatorio con `Juegos.mezclar()` al pintar la galería; "sorpresa del día" elegida con la fecha (misma todo el día)
- "Mis dibujos": copias en `localStorage` (máx. 20; las más antiguas se borran avisando con voz)
- Pincel mágico: recortar el trazo del canvas con la forma de la zona (`clip`) tomada del SVG
- Puede implementarse por partes: 1) arreglos + galería al azar, 2) herramientas, 3) dibujos, 4) niveles y premios
