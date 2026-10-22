# SPEC-014 — Colores con niveles
Estado: borrador
> Depende de SPEC-012 (y de SPEC-015 para los stickers). Origen: plan-mejoras-juegos-maya.md.

## Qué
Hoy Colores tiene 7 colores, pasa de 2 a 3 opciones a los 3 aciertos y no guarda nada. Se propone una escalera de
niveles con una sola variable nueva por nivel.

## Criterios de aceptación
- [ ] Nivel 1: 2 opciones (actual)
- [ ] Nivel 2: 3 y luego 4 opciones
- [ ] Nivel 3: colores nuevos: celeste, café, negro, blanco y gris (agregados a `:root` si hace falta)
- [ ] Nivel 4: objetos distintos mezclados en la misma ronda (el color se reconoce aunque cambie la forma)
- [ ] Nivel 5: color + objeto: "¿Dónde está la **estrella** azul?"
- [ ] Nivel 6: claro / oscuro: "azul clarito" y "azul oscuro"
- [ ] Nivel 7: clasificar: arrastrar objetos a cajas del mismo color
- [ ] Nivel 8: mezclar colores (azul + amarillo = verde) con animación de pintura
- [ ] Extra opcional: "Trae algo rojo de la casa" (fuera de la pantalla); papá confirma con un toque
- [ ] Error: la opción tocada se mueve suave y la voz repite la consigna; nunca hay castigo
- [ ] Niveles de 5–8 rondas con celebración y sticker; avance con `Juegos.progreso`; smoke test por nivel

## Fuera de alcance
- Escribir o leer nombres de colores (todo es por voz)

## Notas técnicas
- Los objetos salen de `dibujos.js`; si falta alguno se agrega allí (nunca SVG duplicado en el juego)
