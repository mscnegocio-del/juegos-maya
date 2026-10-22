# Ilustraciones del Rompecabezas — qué hay y qué falta

Una imagen por cuadro, **horizontal 3:2 (1536×1024)**, WebP (o PNG), ≤ 250 KB cada una. Nombre = `id` del catálogo
(`assets/js/rompecabezas-catalogo.js`). Con que el archivo exista, el juego lo usa solo; no hay que tocar código.

**Zona segura:** el personaje centrado, ocupando ~55 % del alto y ~60 % del ancho. El tablero recorta los bordes según el
nivel (2×2, 3×2, 5×2, 4×3, 4×4) sin deformar la imagen, y un personaje muy grande o descentrado se cortaría.

## Estado
| Carpeta | Archivo | Estado |
|---|---|---|
| (ya existe) | `assets/img/michi/feliz.webp` | ✅ |
| `dinosaurios/` | `trex.webp` `trice.webp` `bronto.webp` `estego.webp` | ❌ falta |
| `dinosaurios/` | `rapto.webp` `anqui.webp` `ptero.webp` `espino.webp` | ❌ falta |

Los 12 animales y los 7 cuadros de colorear siguen siendo dibujos por código (provisionales) hasta que haya ilustraciones.
Para agregarlos: poner la imagen en `assets/img/rompecabezas/animales/<id>.webp` y una línea en el catálogo.

## Prompt base (pégalo en ChatGPT al inicio del chat y manda las 8 una por una en el MISMO chat)
> Ilustración infantil con apariencia de **juguete 3D de vinilo suave** de un **dinosaurio bebé adorable**, para un juego
> educativo de preescolares (3 años). Volúmenes muy redondeados, cabeza grande, ojos grandes brillantes y expresivos,
> sonrisa amable, piel suave con textura sutil, colores **pastel con acentos vivos**. Iluminación suave de estudio con
> sombra suave en el suelo. Fondo sencillo y limpio: paisaje pastel desenfocado (cielo claro, colinas suaves, un pequeño
> volcán lejano). **Sin contornos negros, sin texto, sin figuras geométricas planas, no estilo icono.** Personaje de frente
> o 3/4, **centrado, ocupando el 55 % del alto**, con espacio alrededor. **Formato horizontal 3:2, 1536×1024.**
> Mantén exactamente el mismo estilo, iluminación, proporciones y paisaje para toda la serie.

Después, una por una (cambia solo esta línea):
1. `trex` — tiranosaurio rex bebé, verde menta, panza crema, bracitos pequeños.
2. `trice` — tricerátops bebé, azul cielo, gola naranja durazno, tres cuernitos cortos y redondeados.
3. `bronto` — braquiosaurio bebé, verde lima suave, cuello largo y curvo, manchitas.
4. `estego` — estegosaurio bebé, naranja durazno, placas rosadas redondeadas en el lomo.
5. `rapto` — velociraptor bebé, coral con rayitas, cola larga, sin garras afiladas (aspecto tierno).
6. `anqui` — anquilosaurio bebé, marrón arena, coraza con bultitos redondeados y cola con maza pequeña.
7. `ptero` — pterodáctilo bebé volando con las alas abiertas, lila, cresta pequeña, mirando de frente.
8. `espino` — espinosaurio bebé, turquesa, vela rosada en el lomo, hocico corto y sonriente.

Reglas: sin dientes grandes ni expresión feroz; nada oscuro; todas con la misma luz y el mismo paisaje.
Al convertir a WebP (por ejemplo con squoosh.app) conserva 1536×1024.
