# SPEC-015 — Álbum de stickers
Estado: borrador
> Depende de SPEC-012. Puede unirse con el álbum de SPEC-007 (Michi). Origen: plan-mejoras-juegos-maya.md.

## Qué
Un álbum compartido entre juegos donde se pegan los stickers que Maya gana al completar niveles. Da un sentido
concreto al avance guardado (no números) y es una pantalla nueva del menú.

## Criterios de aceptación
- [ ] Nueva tarjeta "Álbum" en el menú (`juegos/album/index.html`, con `.btn-casa` y los tags de manifest)
- [ ] Al completar un nivel en cualquier juego con niveles, aparece el sticker ganado con animación y voz
  ("¡Ganaste un sticker de pato!") y se guarda en `Juegos.progreso`
- [ ] El álbum muestra páginas por juego; los stickers aún no ganados se ven como silueta suave (nunca como "falta")
- [ ] Tocar un sticker lo anima y dice su nombre (y el sonido del animal si lo tiene)
- [ ] Al menos 24 stickers propios en SVG (`dibujos.js` o un `stickers.js` aparte si pesa mucho)
- [ ] Funciona sin internet; smoke test que gana un sticker y lo ve en el álbum

## Fuera de alcance
- Comprar, intercambiar o compartir stickers; stickers que se pierden
- Fotos reales

## Notas técnicas
- Pregunta abierta: ¿el premio se ve solo como sticker, también como estrella en la tarjeta del menú, o ambos?
