# SPEC-014 — Colores con niveles
Estado: implementada
> Aprobada por el usuario en el chat el 2026-10-22.
> Depende de SPEC-012 (y de SPEC-015 para los stickers). Origen: plan-mejoras-juegos-maya.md.

## Qué
Hoy Colores tiene 7 colores, pasa de 2 a 3 opciones a los 3 aciertos y no guarda nada. Se propone una escalera de
niveles con una sola variable nueva por nivel.

## Criterios de aceptación
- [x] Nivel 1: 2 opciones (actual)
- [x] Nivel 2: 3 y luego 4 opciones
- [x] Nivel 3: colores nuevos: celeste, café, negro, blanco y gris (agregados a `:root` si hace falta)
- [x] Nivel 4: objetos distintos mezclados en la misma ronda (el color se reconoce aunque cambie la forma)
- [x] Nivel 5: color + objeto: "¿Dónde está la **estrella** azul?"
- [x] Nivel 6: claro / oscuro: "azul clarito" y "azul oscuro"
- [x] Nivel 7: clasificar: arrastrar objetos a cajas del mismo color
- [x] Nivel 8: mezclar colores (azul + amarillo = verde) con animación de pintura
- [x] Extra opcional: "Trae algo rojo de la casa" (fuera de la pantalla); papá confirma con un toque
- [x] Error: la opción tocada se mueve suave y la voz repite la consigna; nunca hay castigo
- [x] Niveles de 5–8 rondas con celebración y sticker; avance con `Juegos.progreso`; smoke test por nivel

## Fuera de alcance
- Escribir o leer nombres de colores (todo es por voz)

## Notas técnicas
- Los objetos salen de `dibujos.js`; si falta alguno se agrega allí (nunca SVG duplicado en el juego)

## Implementación (2026-10-22)
- Rondas: niveles 1–6 eligen la opción pedida; 7 arrastra 4–6 objetos a 2–3 cajas; 8 toca dos botes, la pintura se mezcla
  en el tazón ("¡azul y amarillo hacen verde!") y luego busca el color que salió (4 mezclas)
- Nivel 2 pasa de 3 a 4 opciones tras 2 rondas bien; nivel 7 pasa de 2 a 3 cajas igual
- Colores nuevos y tonos clarito/oscuro definidos en el juego (no en `:root`: solo los usa Colores)
- Extra "¡Trae algo rojo de la casa!": desde el nivel 3, cada 8 rondas; un botón verde grande confirma y no cuenta para el nivel
- Ronda con a lo sumo 1 error = acierto; stickers de la página Colores del álbum
