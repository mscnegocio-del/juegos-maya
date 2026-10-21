# SPEC-008 — Colorear: elegir un dibujo y pintarlo
Estado: implementada
> Aprobada por el usuario en el chat el 2026-10-21.

## Qué
Al entrar a Pintar, Maya ve una galería de dibujos en líneas (como un libro de colorear) más una hoja en
blanco. Elige uno y lo pinta a su gusto: tocando una zona se rellena de color, o con el dedo a pincel libre.

## Criterios de aceptación
- [x] Galería con miniaturas grandes (≥ 140 px): **hoja en blanco** + 12 dibujos de contorno grueso en
  `assets/js/colorear.js` (vaca, perro, gato Michi, pez, mariposa, flor, casa, sol, auto, globos, estrella, pastel). La voz
  dice el nombre al tocarlo
- [x] **Balde (por defecto):** tocar dentro de una zona la rellena con el color elegido (relleno por zonas,
  sin salirse de las líneas), con un pequeño "plop" y animación
- [x] **Pincel:** pintar libre con el dedo; las líneas negras del dibujo quedan siempre por encima
- [x] **Brillos/estrellitas** (modo actual) y **goma** se mantienen; botón deshacer (↶) para el último paso
- [x] Paleta de 10 colores grandes (incluye marrón, negro y piel) y 3 grosores de pincel con dibujos claros
- [x] Botón casita: en el editor vuelve a la galería (guardando); en la galería vuelve al menú.
  Se usa un solo botón en lugar de dos para no confundir a una niña de 3 años
- [x] **Guardar:** al salir, el dibujo pintado se guarda en el dispositivo y aparece en la galería con su color
  (se puede seguir pintando o empezar de cero)
- [x] Al terminar (botón ✓): el dibujo cobra vida (se mueve, el animal hace su sonido real si lo tiene) y confeti
- [x] Multitáctil, funciona sin conexión, smoke test (rellenar una zona y pintar libre) sin errores

## Fuera de alcance
- Subir fotos o dibujos propios desde el dispositivo
- Imprimir o compartir
- Plantillas descargadas de internet (todos los dibujos son propios)

## Notas técnicas
- Relleno por zonas: cada dibujo define sus regiones como `<path data-zona>` en SVG (relleno exacto,
  sin algoritmo de pixeles); el pincel libre va en un `<canvas>` entre el fondo y las líneas
- Guardado en `localStorage` como JSON (colores por zona + PNG del canvas de 800×800)
- Contornos: cada zona oculta con `<mask>` el tramo de borde tapado por las zonas siguientes (solo se ven las líneas visibles)
- Verificado: relleno de 4 zonas, pincel bajo las líneas, deshacer (trazo y zona), goma por toque, guardar/reabrir, miniatura con colores
