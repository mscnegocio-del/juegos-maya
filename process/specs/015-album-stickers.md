# SPEC-015 — Álbum de stickers
Estado: implementada
> Aprobada por el usuario en el chat el 2026-10-22 ("Empieza con spec 15").
> Depende de SPEC-012. Puede unirse con el álbum de SPEC-007 (Michi). Origen: plan-mejoras-juegos-maya.md.

## Qué
Un álbum compartido entre juegos donde se pegan los stickers que Maya gana al completar niveles. Da un sentido
concreto al avance guardado (no números) y es una pantalla nueva del menú.

## Criterios de aceptación
- [x] Nueva tarjeta "Álbum" en el menú (`juegos/album/index.html`, con `.btn-casa` y los tags de manifest)
- [x] Al completar un nivel en cualquier juego con niveles, aparece el sticker ganado con animación y voz
  ("¡Ganaste un sticker de pato!") y se guarda en `Juegos.progreso`
- [x] El álbum muestra páginas por juego; los stickers aún no ganados se ven como silueta suave (nunca como "falta")
- [x] Tocar un sticker lo anima y dice su nombre (y el sonido del animal si lo tiene)
- [x] Al menos 24 stickers propios en SVG (`dibujos.js` o un `stickers.js` aparte si pesa mucho)
- [x] Funciona sin internet; smoke test que gana un sticker y lo ve en el álbum

## Fuera de alcance
- Comprar, intercambiar o compartir stickers; stickers que se pierden
- Fotos reales

## Notas técnicas
- Pregunta abierta: ¿el premio se ve solo como sticker, también como estrella en la tarjeta del menú, o ambos?

## Implementación (2026-10-22)
- `assets/js/stickers.js`: 24 stickers en 2 páginas (Globos: 12 animales con su sonido; Colores: 12 objetos de colores),
  reutilizando dibujos de `dibujos.js`. `Stickers.ganar(juego)` da el siguiente que falta y lo hace volar a la casita
- `Juegos.progreso.acierto` premia cada nivel completado (también el último) si la página cargó `stickers.js`
- `juegos/album/`: hoja de 12 huecos, siluetas suaves, tocar = rebote + sonido + nombre; pestañas, flechas (tablet) y deslizar
- Los stickers solo se ganan cuando Globos (SPEC-013) y Colores (SPEC-014) usen niveles
