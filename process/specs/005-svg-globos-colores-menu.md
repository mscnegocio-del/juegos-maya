# SPEC-005 — Globos, Colores y el menú con dibujos SVG
Estado: implementada
> Aprobada por el usuario en el chat el 2026-10-21.

## Qué
Unificar el estilo visual: reemplazar los emojis del menú y los gráficos simples de Globos y Colores por SVG
propios con el mismo estilo que Animales y Contar (trazo `#3b2a4a` de 5 px, caritas tipo kawaii).

## Criterios de aceptación
- [x] Los dibujos compartidos (piezas `svg()`, `ojos()`, `boca()`, animales y objetos) se mueven a `assets/js/dibujos.js`,
  y Animales y Contar los usan sin cambiar cómo se ven (comparación píxel a píxel: 0 bytes distintos fuera de la casita)
- [x] Menú: cada tarjeta muestra un dibujo SVG en lugar del emoji (globo, vaca, paleta, crayón, manzana) que se mueve
  al pasar o tocar. No queda ningún emoji en el menú
- [x] Globos: los globos son SVG con carita y brillo, con el mismo trazo. Al reventar sale una explosión de
  partículas de su color. Siguen diciendo el color
- [x] Colores: los círculos pasan a ser objetos con carita (globo, pelota, flor…) del color pedido. El acierto
  hace que el objeto sonría o salte, y el error solo lo mueve (sin castigo, como hoy)
- [x] Mismo comportamiento de juego que hoy (voz, dificultad, confeti)
- [x] Botón casita: el ícono 🏠 pasa a SVG propio en todas las páginas
- [x] Peso: ninguna página aumenta más de 30 KB (máx. +16 KB; `dibujos.js` pesa 14.6 KB, 4 KB con gzip, y se cachea). Funciona sin conexión
- [x] `tools/smoke.mjs` sin errores. Capturas revisadas a 390 px y en escritorio, incluido el menú

## Fuera de alcance
- Pintar (su interfaz ya son colores sólidos; solo cambia la casita)
- Cambiar la mecánica de cualquier juego
- Sonidos nuevos (backlog: "sonidos reales en otros juegos")

## Notas técnicas
- Hacer SPEC-005 antes de SPEC-004: así el piano reutiliza `dibujos.js` desde el principio
- Las clases animables (`.ojos`, `.boca`, `.boca-abierta`, `.sonando`) pasan a `base.css`
