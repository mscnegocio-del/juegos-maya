# Spike — Pintar con láminas en imagen y regiones automáticas (prueba de concepto)
> 2026-10-22. Prototipo en `prototipos/pintar-regiones/` (no lo carga el sitio ni `sw.js`). **No migra las 39 láminas ni toca `juegos/pintar/`.**
> Pendiente: que el usuario valide el prototipo y apruebe una spec de migración.

## Qué se probó
Una lámina de contornos en PNG (1024×1024, 52 KB; es la tortuga actual rasterizada con línea gruesa, no ilustración final) con
detección de regiones por relleno (4 vecinos), relleno por toque, contornos encima, y todas las herramientas del editor.

## Identificadores de región entre sesiones
- Misma imagen ⇒ mismos números: el etiquetado recorre la imagen en orden de lectura (determinista). Se guarda también una **firma**
  (`regiones útiles:suma de áreas`).
- Cada color se guarda como `[id, x, y, color]` con un **punto semilla** dentro de la región. Si la firma no coincide (la imagen cambió),
  el color se busca por su punto semilla. Probado cortando la lámina con una línea: 3 de 3 colores recolocados.
- Regiones que se parten al cambiar la imagen: el color queda en la mitad que contiene la semilla. Si la semilla cae sobre una línea nueva, se pierde.

## Migración de colores de las láminas antiguas (zonas SVG 0..n)
- Cada región nueva vota por la zona vieja (la de más arriba) que cubre una muestra de sus píxeles. Resultado con la lámina de prueba
  (misma geometría): **100 % de coincidencia** (359/359 puntos).
- **Límite:** solo funciona si la ilustración nueva calca la geometría vieja. Con una ilustración distinta no hay correspondencia: lo pintado
  de la versión SVG no se puede trasladar. Propuesta: clave nueva `maya.colorear2.<id>`, las pinturas viejas quedan intactas y "mis dibujos"
  viejos se siguen viendo con el motor antiguo.

## Resultados (25 pruebas, 0 errores de consola)
Detección y estabilidad, toque táctil, relleno sin salirse (0 píxeles fuera), contornos visibles (150 puntos, 0 aclarados), sin halo blanco,
toque sobre la línea gruesa, pincel, goma (arrastrar y un toque), estrellitas, sellos, arcoíris, brillitos, pincel mágico (0 px fuera de la
región), deshacer, guardar/cargar (colores y trazo), imagen modificada, migración, huecos de 5 px cerrados.

## Rendimiento (Chromium táctil, CPU estrangulada; ms, promedio / máximo)
| CPU | análisis (una vez) | relleno por toque | máscara mágico | mover pincel | deshacer | guardar |
|---|---|---|---|---|---|---|
| 1× | 220 | 2 / 10 | 4 | 0,7 / 34 | 2 / 5 | 41 |
| 4× | 850 | 6 / 39 | 16 | 1,5 / 30 | 3 / 7 | 164 |
| 6× | 1260 | 6 / 31 | 37 | 3 / 70 | 6 / 13 | 319 |
Memoria JS medida ~3 MB (más 4 MB por cada paso de deshacer del canvas; límite de 12 pasos).

## Limitaciones y herramientas que no se conservan tal cual
1. **Nivel 4 "trazar sobre el punteado"**: hoy muestrea la geometría SVG (`getTotalLength`). Con imagen hay que muestrear los píxeles de línea
   (esqueleto); es viable pero no se hizo.
2. **Nivel 3 "modelo"**: hoy se pinta con colores fijos por zona; con imágenes cada lámina necesita su versión coloreada (puede salir del mismo
   ChatGPT) o una paleta por región.
3. **Galería y miniaturas, stickers y "mis dibujos"**: usan `svgCompleto()`; pasarían a miniaturas en canvas/imagen.
4. **Hoja en blanco**: no tiene regiones; sigue con el motor de canvas actual.
5. **Huecos en el contorno**: se cierran los de hasta ~6 px; uno de 13 px deja escapar el color (la región se une con la vecina). Hay que pedir líneas
   cerradas y revisar cada lámina.
6. **Regiones diminutas** (< 60 px) no se pueden pintar; con cierre de huecos las regiones muy finas (< ~7 px de ancho) desaparecen.
7. **Análisis al abrir**: 0,2 s en un celular normal y hasta 1,3 s con CPU 6× más lenta; conviene mostrar un "cargando" breve o precalcular.
8. **Guardar** codifica WebP del canvas (hasta 0,3 s a CPU lenta): hacerlo en un momento ocioso, no en cada toque.
9. **Memoria**: canvas a 1024 pesa 4 MB por paso de deshacer; se limita a 12 pasos.
10. La lámina de prueba **no es la ilustración final**: la calidad real depende de las imágenes que genere ChatGPT (línea gruesa y cerrada, 5–15 regiones).
